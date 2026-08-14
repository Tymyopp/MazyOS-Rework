#!/usr/bin/env node
/**
 * postar-instagram.js — publica um carrossel no Instagram (Meta Graph API).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Pré-requisitos: imagens publicadas em ${SITE_URL}/img/posts/<slug>/slide-XX.png
 * (fluxo do /aprovar-post: deploy do site antes de postar).
 *
 * Uso: node --env-file=.env scripts/postar-instagram.js <slug> [caminho-legenda.md]
 * Exige no .env: META_PAGE_ACCESS_TOKEN, META_IG_USER_ID, SITE_URL
 */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const IG_ID = process.env.META_IG_USER_ID;
const SITE_URL = process.env.SITE_URL;
const slug = process.argv[2];
const legendaPath = process.argv[3] || 'legenda.md';

if (!TOKEN || !IG_ID || !SITE_URL || !slug) {
  console.error('Uso: node --env-file=.env scripts/postar-instagram.js <slug> [legenda]');
  console.error('Exige no .env: META_PAGE_ACCESS_TOKEN, META_IG_USER_ID, SITE_URL');
  process.exit(1);
}

const API = 'https://graph.facebook.com/v19.0';

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

(async () => {
  // Localiza a pasta do carrossel: marketing/conteudo/<slug>-*
  const conteudoDir = 'marketing/conteudo';
  if (!fs.existsSync(conteudoDir)) { console.error('Pasta marketing/conteudo não encontrada'); process.exit(1); }
  const dirs = fs.readdirSync(conteudoDir).filter((d) => d.startsWith(slug));
  if (!dirs.length) { console.error(`Nenhuma pasta do carrossel para "${slug}" em marketing/conteudo/`); process.exit(1); }
  const dir = path.join(conteudoDir, dirs.sort().pop());

  const slides = fs.readdirSync(path.join(dir, 'instagram'))
    .filter((f) => /^slide-\d+\.png$/.test(f)).sort();
  if (slides.length < 2) { console.error(`Menos de 2 slides em ${dir}/instagram`); process.exit(1); }

  const caption = fs.existsSync(legendaPath)
    ? fs.readFileSync(legendaPath, 'utf8').slice(0, 2200) : '';

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
