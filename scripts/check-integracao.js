#!/usr/bin/env node
/**
 * check-integracao.js — diagnóstico das integrações configuradas.
 * Verifica .env, scripts, tokens e conectividade — e reporta ✓ / ⚠ / ✗ por integração.
 * Sem dependências externas (fetch nativo).
 *
 * Uso:
 *   node scripts/check-integracao.js            → diagnóstico completo
 *   node scripts/check-integracao.js --rapido   → só o essencial (sem chamadas de rede)
 */
const fs = require('fs');
const path = require('path');

const ENV = path.join(__dirname, '..', '.env');
const AUTH = path.join(__dirname, '..', '.local', 'insta-auth.json');

function lerEnv() {
  if (!fs.existsSync(ENV)) return {};
  const out = {};
  for (const linha of fs.readFileSync(ENV, 'utf8').split('\n')) {
    const m = linha.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

function ok(msg) { console.log('  ✓ ' + msg); }
function aviso(msg) { console.log('  ⚠ ' + msg); }
function erro(msg) { console.log('  ✗ ' + msg); }
function tem(v) { return v && v !== ''; }

(async () => {
  const rapido = process.argv.includes('--rapido');
  const env = lerEnv();
  console.log('== CHECK DE INTEGRAÇÕES ==\n');

  // 1. .env
  console.log('[.env]');
  if (Object.keys(env).length === 0) { erro('.env não encontrado — copie .env.example e preencha'); }
  else ok(`.env presente (${Object.keys(env).length} variáveis)`);

  // 2. Instagram
  console.log('\n[Instagram]');
  const auth = (() => { try { return JSON.parse(fs.readFileSync(AUTH, 'utf8')); } catch { return null; } })();
  if (auth && auth.access_token) {
    const dias = Math.floor((new Date(auth.expires_at) - Date.now()) / 86400000);
    ok(`conexão via /conectar-instagram (@${auth.ig_username || '?'}) — expira em ${dias} dias`);
    if (dias <= 7) aviso('token expira em breve — rode: renovar');
  } else if (tem(env.META_PAGE_ACCESS_TOKEN) && tem(env.META_IG_USER_ID)) {
    ok('META_PAGE_ACCESS_TOKEN + META_IG_USER_ID no .env');
  } else {
    erro('sem token — rode /conectar-instagram (ou preencha .env)');
  }
  if (!tem(env.SITE_URL)) aviso('SITE_URL vazia — mídia do Instagram precisa de URL pública');

  // 3. Meta App (para o fluxo por link)
  console.log('\n[Meta App (link OAuth)]');
  if (tem(env.META_APP_ID) && tem(env.META_APP_SECRET)) ok('META_APP_ID + META_APP_SECRET configurados');
  else aviso('sem META_APP_ID/SECRET — fluxo por link indisponível (ver docs/automacao-meta-setup.md)');

  // 4. WhatsApp / OpenWA
  console.log('\n[WhatsApp]');
  if (tem(env.OPENWA_URL) && tem(env.OPENWA_API_KEY)) {
    ok(`OpenWA configurado (${env.OPENWA_URL})`);
    if (!rapido) {
      try {
        const res = await fetch(`${env.OPENWA_URL}/api/sessions`, { headers: { 'X-API-Key': env.OPENWA_API_KEY } });
        if (res.ok) {
          const sessoes = await res.json();
          ok(`gateway responde — ${sessoes.length} sessão(ões)`);
          sessoes.forEach((s) => console.log(`     • ${s.name}: ${s.status}`));
        } else { erro(`gateway respondeu HTTP ${res.status}`); }
      } catch { erro('gateway inacessível — rode scripts/instalar-openwa.sh'); }
    }
  } else if (tem(env.WHATSAPP_TOKEN)) {
    ok('WHATSAPP_TOKEN (Cloud API) presente');
  } else {
    aviso('sem OpenWA nem WHATSAPP_TOKEN — rode /conectar-whatsapp');
  }

  // 5. TikTok
  console.log('\n[TikTok]');
  if (tem(env.TIKTOK_CLIENT_KEY) && tem(env.TIKTOK_ACCESS_TOKEN)) ok('TIKTOK_CLIENT_KEY + ACCESS_TOKEN presentes');
  else aviso('sem credenciais TikTok (ver docs/tiktok-setup.md)');

  // 6. LinkedIn
  console.log('\n[LinkedIn]');
  if (tem(env.LINKEDIN_ACCESS_TOKEN)) ok('LINKEDIN_ACCESS_TOKEN presente');
  else aviso('sem token LinkedIn (ver docs/mcp-catalogo.md)');

  // 7. YouTube
  console.log('\n[YouTube]');
  if (tem(env.GOOGLE_CLIENT_SECRET_FILE) && fs.existsSync(env.GOOGLE_CLIENT_SECRET_FILE)) ok(`client_secret.json em ${env.GOOGLE_CLIENT_SECRET_FILE}`);
  else aviso('sem client_secret.json (ver docs/mcp-catalogo.md)');

  // 8. Agendadores
  console.log('\n[Agendamento]');
  if (tem(env.POSTIZ_URL) && tem(env.POSTIZ_API_KEY)) ok('Postiz configurado');
  if (tem(env.POSTFORME_API_KEY)) ok('Post for Me configurado');
  if (!tem(env.POSTIZ_URL) && !tem(env.POSTFORME_API_KEY)) aviso('nenhum agendador — /agendar-posts exige um (ver docs/agendamento.md)');

  // 9. MCPs (.mcp.json)
  console.log('\n[MCP]');
  const mcp = path.join(__dirname, '..', '.mcp.json');
  if (fs.existsSync(mcp)) {
    const servers = Object.keys(JSON.parse(fs.readFileSync(mcp, 'utf8')).mcpServers || {});
    ok(`.mcp.json ativo com: ${servers.join(', ') || '(nenhum)'}`);
  } else {
    aviso('sem .mcp.json — copie um dos .mcp.example.*.json (ver /conectar-mcp)');
  }

  // 10. Scripts
  console.log('\n[Scripts]');
  const scripts = ['postar-instagram.js','postar-facebook.js','postar-tiktok.js','insta-conectar.js','insta-insights.js','whatsapp-openwa.js','agendar-postforme.js','cron-posts.js'];
  const faltando = scripts.filter((s) => !fs.existsSync(path.join(__dirname, s)));
  if (faltando.length) erro(`faltam: ${faltando.join(', ')}`);
  else ok(`${scripts.length} scripts de integração presentes`);

  console.log('\n== FIM — integrações com ✗ precisam de ação (ver docs/ correspondentes). ==');
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
