#!/usr/bin/env node
/**
 * insta-conectar.js — conexão da conta Instagram com a IA (fluxo por link).
 *
 * Fluxo: a IA gera o link de autorização → você clica e autoriza → a IA troca
 * o código por um token long-lived (~60 dias) → publica por você.
 *
 * Uso:
 *   node --env-file=.env scripts/insta-conectar.js conectar [--loopback] [--port 8787]
 *   node --env-file=.env scripts/insta-conectar.js trocar "<CODE-OU-URL-COMPLETA>"
 *   node --env-file=.env scripts/insta-conectar.js renovar
 *   node --env-file=.env scripts/insta-conectar.js status
 *   node --env-file=.env scripts/insta-conectar.js desconectar
 *
 * Exige no .env: META_APP_ID, META_APP_SECRET (e opcional: META_REDIRECT_URI,
 * META_API_VERSION). Setup completo: docs/automacao-meta-setup.md.
 *
 * Segurança:
 *   - O token fica em .local/insta-auth.json (permissão 600, fora do git).
 *   - O token NUNCA é impresso completo no terminal.
 *   - Validação de state (CSRF) no fluxo OAuth.
 */
const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');

const API_VERSION = process.env.META_API_VERSION || 'v23.0';
const GRAPH = `https://graph.facebook.com/${API_VERSION}`;
const DIALOG = `https://www.facebook.com/${API_VERSION}/dialog/oauth`;
const SCOPES = [
  'instagram_basic',
  'instagram_content_publish',
  'instagram_manage_comments',
  'instagram_manage_insights',
];

const DIR = path.join(__dirname, '..', '.local');
const AUTH_FILE = path.join(DIR, 'insta-auth.json');
const PENDING_FILE = path.join(DIR, 'insta-pending.json');

// ---------- utilitários ----------
function lerJson(p, dft = {}) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return dft; }
}
function salvarJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
  try { fs.chmodSync(p, 0o600); } catch {}
}
function mask(t) { return t ? t.slice(0, 6) + '…' + t.slice(-4) : '(vazio)'; }
function agora() { return new Date().toISOString(); }
function diasAte(iso) { return Math.floor((new Date(iso) - Date.now()) / 86400000); }
function erro(msg, extra) { console.error('✗ ' + msg); if (extra) console.error(extra); process.exit(1); }

function config() {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri = process.env.META_REDIRECT_URI || 'http://localhost:8787/callback';
  if (!appId) erro('META_APP_ID não definido. Configure o .env — veja .env.example e docs/automacao-meta-setup.md.');
  if (!appSecret) erro('META_APP_SECRET não definido. Configure o .env — veja .env.example e docs/automacao-meta-setup.md.');
  return { appId, appSecret, redirectUri };
}

async function apiGet(caminho, params = {}) {
  const url = new URL(`${GRAPH}/${caminho}`);
  url.search = new URLSearchParams(params);
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(JSON.stringify(data.error || data).slice(0, 600));
  return data;
}

// ---------- conectar ----------
async function conectar(opts) {
  const { appId, redirectUri } = config();
  const state = crypto.randomBytes(16).toString('hex');
  salvarJson(PENDING_FILE, { state, criado_em: agora() });

  const url = new URL(DIALOG);
  url.search = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    state,
    scope: SCOPES.join(','),
    response_type: 'code',
  });

  console.log('== CONECTAR INSTAGRAM ==');
  console.log('1. Abra este link no navegador (logado na conta do Instagram que quer conectar):\n');
  console.log('   ' + url.toString() + '\n');
  console.log('2. Autorize o app e escolha a conta Instagram Business/Creator.');

  if (opts.loopback) {
    await servidorLoopback(redirectUri, opts.port);
  } else {
    console.log('3. Depois de autorizar, o navegador vai tentar abrir a URL de retorno.');
    console.log('   Copie a URL COMPLETA da barra de endereço (contém ?code=...) e rode:\n');
    console.log('   node --env-file=.env scripts/insta-conectar.js trocar "<URL-COMPLETA>"\n');
  }
}

function servidorLoopback(redirectUri, portForcado) {
  const porta = portForcado || new URL(redirectUri).port || '8787';
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, `http://localhost:${porta}`);
      if (u.pathname === '/callback') {
        res.end('✓ Autorizado! Pode fechar esta aba e voltar ao terminal.');
        server.close();
        const code = u.searchParams.get('code');
        const state = u.searchParams.get('state');
        if (!code) { console.error('✗ Nenhum code na URL de retorno.'); process.exit(1); }
        trocar(code, state);
      } else {
        res.end('OK');
      }
    });
    server.listen(porta, () => {
      console.log(`3. Aguardando a autorização em http://localhost:${porta}/callback ...`);
      resolve();
    });
  });
}

// ---------- trocar ----------
async function trocar(codeOuUrl, stateFornecido) {
  const { appId, appSecret, redirectUri } = config();

  // Aceita o code puro ou a URL completa de retorno
  let code = codeOuUrl;
  if (codeOuUrl && codeOuUrl.startsWith('http')) {
    const u = new URL(codeOuUrl);
    const c = u.searchParams.get('code');
    const s = u.searchParams.get('state');
    if (!c) erro('A URL informada não contém o parâmetro ?code=. Copie a URL COMPLETA da barra de endereço.');
    code = c;
    if (s) stateFornecido = s;
  }
  if (!code) erro('Falta o code. Uso: trocar "<CODE-OU-URL-COMPLETA>"');

  // CSRF: valida o state gerado na etapa conectar
  const pending = lerJson(PENDING_FILE);
  if (stateFornecido && pending.state && stateFornecido !== pending.state) {
    erro('State inválido (possível ataque CSRF). Rode "conectar" de novo para gerar um link novo.');
  }

  // 1. code → token curto (~1h)
  let d1;
  try {
    d1 = await apiGet('oauth/access_token', {
      client_id: appId, client_secret: appSecret, redirect_uri: redirectUri, code,
    });
  } catch (e) {
    erro('Falha ao trocar o code por token. Confira o redirect_uri registrado no app Meta e que o code não expirou (válido por poucos minutos).', e.message);
  }
  const shortToken = d1.access_token;
  if (!shortToken) erro('Resposta sem access_token.', JSON.stringify(d1));

  // 2. token curto → token long-lived (~60 dias)
  let d2;
  try {
    d2 = await apiGet('oauth/access_token', {
      grant_type: 'fb_exchange_token',
      client_id: appId,
      client_secret: appSecret,
      fb_exchange_token: shortToken,
    });
  } catch (e) {
    erro('Falha ao estender o token para long-lived.', e.message);
  }
  const longToken = d2.access_token;
  if (!longToken) erro('Resposta sem access_token long-lived.', JSON.stringify(d2));

  // 3. Descobre a conta Instagram vinculada (via Página do Facebook)
  let ig = null;
  try {
    const me = await apiGet('me/accounts', {
      fields: 'id,name,instagram_business_account{id,username}',
      access_token: longToken,
    });
    const page = (me.data || []).find((p) => p.instagram_business_account);
    if (page) {
      ig = page.instagram_business_account;
      ig.page_id = page.id;
      ig.page_name = page.name;
    }
  } catch (e) {
    console.warn('⚠ Não foi possível listar páginas: ' + e.message.slice(0, 160));
  }

  const expiresAt = new Date(Date.now() + (d2.expires_in || 5184000) * 1000).toISOString();
  const auth = {
    access_token: longToken,
    expires_at: expiresAt,
    ig_user_id: ig ? ig.id : null,
    ig_username: ig ? ig.username : null,
    page_id: ig ? ig.page_id : null,
    page_name: ig ? ig.page_name : null,
    app_id: appId,
    redirect_uri: redirectUri,
    scopes: SCOPES,
    conectado_em: agora(),
    ultima_renovacao: agora(),
  };
  salvarJson(AUTH_FILE, auth);
  try { fs.rmSync(PENDING_FILE, { force: true }); } catch {}

  console.log('\n✓ CONTA CONECTADA:');
  console.log(`  Instagram: @${auth.ig_username || '?'} (id ${auth.ig_user_id || '?'})`);
  if (auth.page_name) console.log(`  Página FB: ${auth.page_name}`);
  console.log(`  Token: ${mask(longToken)} · expira em ${diasAte(expiresAt)} dias`);
  if (!ig) {
    console.warn('\n⚠ Não encontrei conta Instagram vinculada a uma Página do Facebook.');
    console.warn('  Se sua conta é Creator (sem página), consulte docs/automacao-meta-setup.md');
    console.warn('  para descobrir o IG_USER_ID manualmente e salvá-lo no .env.');
  }
  console.log('\nPronto! Agora é só usar /aprovar-post para publicar carrosséis.');
}

// ---------- renovar ----------
async function renovar() {
  const auth = lerJson(AUTH_FILE);
  if (!auth.access_token) erro('Nenhuma conta conectada. Rode primeiro: conectar');
  const dias = diasAte(auth.expires_at);
  if (dias > 30) {
    console.log(`Token válido por ${dias} dias — não precisa renovar agora.`);
    return;
  }
  console.log(`Token expira em ${dias} dias — renovando...`);
  try {
    const d = await apiGet('oauth/access_token', {
      grant_type: 'ig_refresh_token',
      access_token: auth.access_token,
    });
    if (!d.access_token) throw new Error('resposta sem access_token');
    auth.access_token = d.access_token;
    auth.expires_at = new Date(Date.now() + (d.expires_in || 5184000) * 1000).toISOString();
    auth.ultima_renovacao = agora();
    salvarJson(AUTH_FILE, auth);
    console.log(`✓ Token renovado. Expira em ${diasAte(auth.expires_at)} dias.`);
  } catch (e) {
    console.error('✗ Falha ao renovar: ' + e.message);
    console.error('  Se o token já expirou, reconecte: node --env-file=.env scripts/insta-conectar.js conectar');
    process.exit(1);
  }
}

// ---------- status ----------
async function status() {
  const auth = lerJson(AUTH_FILE);
  if (!auth.access_token) {
    console.log('Nenhuma conta conectada ainda.');
    console.log('Rode: node --env-file=.env scripts/insta-conectar.js conectar');
    return;
  }
  const dias = diasAte(auth.expires_at);
  console.log('== STATUS DA CONEXÃO ==');
  console.log(`  Instagram: @${auth.ig_username || '?'} (id ${auth.ig_user_id || '?'})`);
  console.log(`  Expira em: ${dias} dias (${String(auth.expires_at).slice(0, 10)})${dias <= 7 ? '  ⚠ RENOVE!' : ''}`);
  console.log(`  Última renovação: ${String(auth.ultima_renovacao || auth.conectado_em || '').slice(0, 10)}`);
  console.log(`  App: ${auth.app_id} · scopes: ${(auth.scopes || []).join(', ')}`);
  if (auth.ig_user_id) {
    try {
      const r = await apiGet(auth.ig_user_id, {
        fields: 'id,username,media_count',
        access_token: auth.access_token,
      });
      console.log(`  Validação ao vivo: ✓ @${r.username} (${r.media_count || 0} posts)`);
    } catch (e) {
      console.log(`  Validação ao vivo: ✗ token inválido — ${e.message.slice(0, 140)}`);
      console.log('  Reconecte: node --env-file=.env scripts/insta-conectar.js conectar');
    }
  }
}

// ---------- desconectar ----------
function desconectar() {
  try { fs.rmSync(AUTH_FILE, { force: true }); } catch {}
  try { fs.rmSync(PENDING_FILE, { force: true }); } catch {}
  console.log('✓ Conexão removida. Tokens apagados do .local/.');
}

// ---------- dispatch ----------
const AJUDA = `insta-conectar.js — conexão do Instagram por link

Uso:
  node --env-file=.env scripts/insta-conectar.js conectar [--loopback] [--port 8787]
  node --env-file=.env scripts/insta-conectar.js trocar "<CODE-OU-URL-COMPLETA>"
  node --env-file=.env scripts/insta-conectar.js renovar
  node --env-file=.env scripts/insta-conectar.js status
  node --env-file=.env scripts/insta-conectar.js desconectar

  --loopback   sobe um servidor local que captura o code sozinho (máquina do usuário)
  --port N     porta do servidor loopback (padrão: 8787)

Exige no .env: META_APP_ID, META_APP_SECRET.
Setup completo: docs/automacao-meta-setup.md`;

(async () => {
  const cmd = process.argv[2];
  const args = process.argv.slice(3);
  const opts = {
    loopback: args.includes('--loopback'),
    port: (() => {
      const i = args.indexOf('--port');
      return i >= 0 && args[i + 1] ? Number(args[i + 1]) : null;
    })(),
  };

  switch (cmd) {
    case 'conectar': await conectar(opts); break;
    case 'trocar': await trocar(args[0], args[1]); break;
    case 'renovar': await renovar(); break;
    case 'status': await status(); break;
    case 'desconectar': desconectar(); break;
    default: console.log(AJUDA);
  }
})().catch((e) => { console.error('✗ Erro: ' + e.message); process.exit(1); });
