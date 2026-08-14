#!/usr/bin/env node
/**
 * postar-instagram.js — publica um carrossel no Instagram (Meta Graph API).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Token: lê de `.local/insta-auth.json` (criado pelo /conectar-instagram) ou,
 * na falta, de META_PAGE_ACCESS_TOKEN no .env. Renova automaticamente se
 * faltarem <7 dias para expirar.
 *
 * Pré-requisitos: imagens publicadas em ${SITE_URL}/img/posts/<slug>/slide-XX.png
 * (fluxo do /aprovar-post: deploy do site antes de postar).
 *
 * Uso: node --env-file=.env scripts/postar-instagram.js <slug-ou-caminho> [caminho-legenda.md]
 */
const fs = require('fs');
const path = require('path');

const API = 'https://graph.facebook.com/v23.0';

// ---------- token: .local/insta-auth.json primeiro, .env como fallback ----------
const AUTH_FILE = path.join(__dirname, '..', '.local', 'insta-auth.json');
function lerAuth() {
  try { return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8')); } catch { return null; }
}
const auth = lerAuth();
let TOKEN = auth && auth.access_token ? auth.access_token : process.env.META_PAGE_ACCESS_TOKEN;
let IG_ID = auth && auth.ig_user_id ? auth.ig_user_id : process.env.META_IG_USER_ID;

const SITE_URL = process.env.SITE_URL;
const slug = process.argv[2];
const legendaPath = process.argv[3] || 'legenda.md';

if (!TOKEN || !IG_ID || !SITE_URL || !slug) {
  console.error('Uso: node --env-file=.env scripts/postar-instagram.js <slug> [legenda]');
  console.error('Token: conecte antes com /conectar-instagram (gera .local/insta-auth.json)');
  console.error('  ou defina META_PAGE_ACCESS_TOKEN + META_IG_USER_ID no .env');
  console.error('SITE_URL é obrigatório no .env');
  process.exit(1);
}

async function api(caminho, params) {
  const url = new URL(`${API}/${caminho}`);
  url.search = new URLSearchParams({ access_token: TOKEN, ...params });
  const res = await fetch(url, { method: 'POST' });
  const data = await res.json();
  if (!res.ok || data.error) {
    console.error('Erro Meta:', JSON.stringify(data.error || data).slice(0, 500));
    process.exit(1);
  }
  return data;
}

// Renovação automática do token (se faltar <7 dias)
async function renovarSePreciso() {
  if (!auth || !auth.expires_at) return;
  const dias = Math.floor((new Date(auth.expires_at) - Date.now()) / 86400000);
  if (dias >= 7) return;
  console.log(`→ Token do Instagram expira em ${dias} dia(s) — renovando...`);
  try {
    const url = new URL(`${API}/oauth/access_token`);
    url.search = new URLSearchParams({ grant_type: 'ig_refresh_token', access_token: TOKEN });
    const res = await fetch(url);
    const d = await res.json();
    if (!d.access_token) throw new Error(JSON.stringify(d).slice(0, 300));
    auth.access_token = d.access_token;
    auth.expires_at = new Date(Date.now() + (d.expires_in || 5184000) * 1000).toISOString();
    fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2));
    TOKEN = d.access_token;
    console.log('✓ Token renovado.');
  } catch (e) {
    console.error('⚠ Falha ao renovar token: ' + e.message);
    console.error('  Se expirou, reconecte: /conectar-instagram');
  }
}

(async () => {
  // Aceita slug ("5-erros-bolo") OU caminho completo ("marketing/conteudo/<slug>-<data>")
  let dir;
  if (slug.includes('/')) {
    dir = slug;
  } else {
    const conteudoDir = 'marketing/conteudo';
    if (!fs.existsSync(conteudoDir)) { console.error('Pasta marketing/conteudo não encontrada'); process.exit(1); }
    const dirs = fs.readdirSync(conteudoDir).filter((d) => d.startsWith(slug));
    if (!dirs.length) { console.error(`Nenhuma pasta do carrossel para "${slug}" em marketing/conteudo/`); process.exit(1); }
    dir = path.join(conteudoDir, dirs.sort().pop());
  }
  if (!fs.existsSync(dir)) { console.error(`Pasta não encontrada: ${dir}`); process.exit(1); }

  const slides = fs.readdirSync(path.join(dir, 'instagram'))
    .filter((f) => /^slide-\d+\.png$/.test(f)).sort();
  if (slides.length < 2) { console.error(`Menos de 2 slides em ${dir}/instagram`); process.exit(1); }

  const caption = fs.existsSync(legendaPath)
    ? fs.readFileSync(legendaPath, 'utf8').slice(0, 2200) : '';

  await renovarSePreciso();

  console.log(`→ ${slides.length} slides de ${dir} — publicando no Instagram...`);

  const children = [];
  for (const s of slides) {
    const imgUrl = `${SITE_URL}/img/posts/${slug}/${s}`;
    const r = await api(`${IG_ID}/media`, { image_url: imgUrl, is_carousel_item: 'true' });
    children.push(r.id);
    console.log(`  ✓ container ${s} → ${r.id}`);
  }

  const carousel = await api(`${IG_ID}/media`, {
    media_type: 'CAROUSEL',
    children: children.join(','),
    caption,
  });
  console.log(`  ✓ container do carrossel → ${carousel.id}`);

  const pub = await api(`${IG_ID}/media_publish`, { creation_id: carousel.id });
  console.log(`✓ PUBLICADO — id do post: ${pub.id}`);
})().catch((e) => { console.error(e); process.exit(1); });
