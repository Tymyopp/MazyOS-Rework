#!/usr/bin/env node
/**
 * postar-facebook.js — publica um carrossel no Facebook (Meta Graph API).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Uso: node --env-file=.env scripts/postar-facebook.js <slug> [caminho-legenda.md]
 * Exige no .env: META_PAGE_ACCESS_TOKEN, META_PAGE_ID, SITE_URL
 */
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.META_PAGE_ID;
const SITE_URL = process.env.SITE_URL;
const slug = process.argv[2];
const legendaPath = process.argv[3] || 'legenda.md';

if (!TOKEN || !PAGE_ID || !SITE_URL || !slug) {
  console.error('Uso: node --env-file=.env scripts/postar-facebook.js <slug> [legenda]');
  console.error('Exige no .env: META_PAGE_ACCESS_TOKEN, META_PAGE_ID, SITE_URL');
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
  const conteudoDir = 'marketing/conteudo';
  const dirs = fs.readdirSync(conteudoDir).filter((d) => d.startsWith(slug));
  if (!dirs.length) { console.error(`Nenhuma pasta do carrossel para "${slug}"`); process.exit(1); }
  const dir = path.join(conteudoDir, dirs.sort().pop());

  const slides = fs.readdirSync(path.join(dir, 'instagram'))
    .filter((f) => /^slide-\d+\.png$/.test(f)).sort();
  if (!slides.length) { console.error('Nenhum slide encontrado'); process.exit(1); }

  const message = fs.existsSync(legendaPath)
    ? fs.readFileSync(legendaPath, 'utf8').slice(0, 5000) : '';

  console.log(`→ ${slides.length} fotos para a página ${PAGE_ID}...`);

  // Sobe cada foto como foto publicada no feed (a primeira leva o texto)
  const photoIds = [];
  for (let i = 0; i < slides.length; i++) {
    const url = `${SITE_URL}/img/posts/${slug}/${slides[i]}`;
    const body = { url, published: 'false' };
    if (i === 0 && message) body.message = message;
    const r = await api(`${PAGE_ID}/photos`, body);
    photoIds.push(r.id);
    console.log(`  ✓ foto ${slides[i]} → ${r.id}`);
  }

  // Monta o post multi-foto
  const post = await api(`${PAGE_ID}/feed`, {
    message,
    attached_media: photoIds.map((id) => ({ media_fbid: id })).map((m) => JSON.stringify(m)).join(','),
  });
  console.log(`✓ PUBLICADO — id do post: ${post.id}`);
})().catch((e) => { console.error(e); process.exit(1); });
