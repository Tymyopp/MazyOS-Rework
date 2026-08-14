#!/usr/bin/env node
/**
 * postar-tiktok.js — publica vídeo no TikTok (Content Posting API - Direct Post).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Setup único (ver docs/tiktok-setup.md):
 *   1. Conta Business/Creator + TikTok Developer App (sandbox → audit p/ público)
 *   2. Login Kit + Content Posting API com Direct Post
 *   3. Scopes: user.info.basic, video.upload, video.publish (etc.)
 *   4. .env: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_ACCESS_TOKEN,
 *      TIKTOK_OPEN_ID (token obtido pelo fluxo OAuth da TikTok)
 *
 * Uso:
 *   node --env-file=.env scripts/postar-tiktok.js <caminho-ou-url-video> \
 *        --legenda "texto" [--titulo "título"] [--privado]
 *
 * Obs.: sandbox publica apenas posts PRIVADOS. Para posts públicos, o app precisa
 * passar pela auditoria (approval) da TikTok — ver docs/tiktok-setup.md.
 */
const fs = require('fs');
const path = require('path');

const API = 'https://open.tiktokapis.com/v2';
const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
const OPEN_ID = process.env.TIKTOK_OPEN_ID;

const args = process.argv.slice(2);
const video = args.find((a) => !a.startsWith('--'));
const legenda = (() => {
  const i = args.indexOf('--legenda');
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
})();
const titulo = (() => {
  const i = args.indexOf('--titulo');
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
})();
const privado = args.includes('--privado');

if (!CLIENT_KEY || !CLIENT_SECRET || !TOKEN || !OPEN_ID || !video) {
  console.error('Uso: node --env-file=.env scripts/postar-tiktok.js <video.mp4-ou-url> --legenda "texto" [--titulo t] [--privado]');
  console.error('Exige no .env: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_ACCESS_TOKEN, TIKTOK_OPEN_ID');
  console.error('Setup: docs/tiktok-setup.md');
  process.exit(1);
}

async function apiJson(caminho, body) {
  const res = await fetch(`${API}/${caminho}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error).slice(0, 400));
  return data;
}

(async () => {
  // 1. Sobe o vídeo (upload direto)
  console.log('→ Iniciando upload do vídeo...');
  let videoUrl;
  if (video.startsWith('http')) {
    videoUrl = video;
  } else {
    if (!fs.existsSync(video)) { console.error(`Arquivo não encontrado: ${video}`); process.exit(1); }
    const upload = await apiJson('post/publish/video/init/', {
      post_info: {
        title: titulo || legenda || 'Novo vídeo',
        privacy_level: privado ? 'SELF_ONLY' : 'PUBLIC_TO_EVERYONE',
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: fs.statSync(video).size,
        chunk_size: 1048576,
        total_chunk_count: Math.ceil(fs.statSync(video).size / 1048576),
      },
    });
    const uploadUrl = upload.data?.upload_url;
    if (!uploadUrl) throw new Error('sem upload_url na resposta');
    const buf = fs.readFileSync(video);
    const res = await fetch(uploadUrl, { method: 'PUT', body: buf, headers: { 'Content-Type': 'video/mp4' } });
    if (!res.ok) throw new Error(`upload falhou: HTTP ${res.status}`);
    videoUrl = upload.data.video_id;
    console.log('  ✓ vídeo enviado (chunk único)');
  }

  // 2. Publica
  const pub = await apiJson('post/publish/video/init/', {
    post_info: {
      title: titulo || legenda || 'Novo vídeo',
      privacy_level: privado ? 'SELF_ONLY' : 'PUBLIC_TO_EVERYONE',
    },
    source_info: video.startsWith('http')
      ? { source: 'PULL_FROM_URL', video_url: videoUrl }
      : { source: 'FILE_UPLOAD', video_id: videoUrl },
  });

  // 3. Verifica status
  let status = 'PROCESSING';
  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    try {
      const s = await apiJson('post/publish/status/fetch/', {
        publish_id: pub.data.publish_id,
      });
      status = s.data?.status || 'UNKNOWN';
      console.log(`  status: ${status}`);
      if (status === 'PUBLISH_COMPLETE') break;
      if (status === 'FAILED') { console.error('✗ publicação falhou: ' + JSON.stringify(s.data?.fail_reason || '')); process.exit(1); }
    } catch (e) { /* tenta de novo */ }
  }
  console.log(status === 'PUBLISH_COMPLETE' ? '✓ TIKTOK PUBLICADO' : `⚠ status final: ${status} (verifique no app)`);
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
