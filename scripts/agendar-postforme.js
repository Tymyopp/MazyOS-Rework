#!/usr/bin/env node
/**
 * agendar-postforme.js — agenda publicações futuras via Post for Me (API).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Uso:
 *   node --env-file=.env scripts/agendar-postforme.js <slug-ou-caminho> --data "2026-08-20T10:00:00-03:00" [--rede instagram] [--conta <id>]
 *   node --env-file=.env scripts/agendar-postforme.js --listar-contas
 *   node --env-file=.env scripts/agendar-postforme.js --listar-agendados
 *   node --env-file=.env scripts/agendar-postforme.js --cancelar <postId>
 *
 * Env: POSTFORME_API_KEY (obrigatória) · POSTFORME_BASE_URL (opcional, padrão https://api.postforme.dev)
 * Docs: docs/agendamento.md (seção Opção B)
 */
const fs = require('fs');
const path = require('path');

const BASE = (process.env.POSTFORME_BASE_URL || 'https://api.postforme.dev').replace(/\/$/, '');
const KEY = process.env.POSTFORME_API_KEY;

if (!KEY) {
  console.error('POSTFORME_API_KEY não definida no .env (ver docs/agendamento.md — Opção B)');
  process.exit(1);
}

async function api(caminho, body) {
  const res = await fetch(`${BASE}${caminho}`, {
    method: 'POST',
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`✗ HTTP ${res.status} em ${caminho}: ${JSON.stringify(data).slice(0, 300)}`);
    process.exit(1);
  }
  return data;
}

async function apiGet(caminho) {
  const res = await fetch(`${BASE}${caminho}`, { headers: { 'x-api-key': KEY } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`✗ HTTP ${res.status} em GET ${caminho}: ${JSON.stringify(data).slice(0, 300)}`);
    process.exit(1);
  }
  return data;
}

function localizarPasta(slug) {
  if (slug.includes('/')) {
    if (!fs.existsSync(slug)) { console.error(`Pasta não encontrada: ${slug}`); process.exit(1); }
    return slug;
  }
  const conteudoDir = 'marketing/conteudo';
  if (!fs.existsSync(conteudoDir)) { console.error('Pasta marketing/conteudo não encontrada'); process.exit(1); }
  const dirs = fs.readdirSync(conteudoDir).filter((d) => d.startsWith(slug));
  if (!dirs.length) { console.error(`Nenhuma pasta do carrossel para "${slug}" em marketing/conteudo/`); process.exit(1); }
  return path.join(conteudoDir, dirs.sort().pop());
}

function lerLegenda(dir) {
  const leg = path.join(dir, 'legenda.md');
  return fs.existsSync(leg) ? fs.readFileSync(leg, 'utf8').slice(0, 2200) : '';
}

function slidesPublicos(dir, slug, siteUrl) {
  const insta = path.join(dir, 'instagram');
  if (!fs.existsSync(insta)) return [];
  return fs.readdirSync(insta)
    .filter((f) => /^slide-\d+\.png$/.test(f)).sort()
    .map((f) => ({ url: `${siteUrl}/img/posts/${slug}/${f}` }));
}

(async () => {
  const args = process.argv.slice(2);
  const pega = (flag) => { const i = args.indexOf(flag); return i >= 0 && args[i + 1] ? args[i + 1] : null; };
  const slug = args.find((a) => !a.startsWith('--'));
  const data = pega('--data');
  const rede = pega('--rede') || 'instagram';
  const conta = pega('--conta');
  const cmd = args[0];

  // Listar contas (para descobrir o ID da conta IG)
  if (cmd === '--listar-contas') {
    const d = await apiGet('/api/accounts');
    const contas = d.accounts || d.data || d;
    (Array.isArray(contas) ? contas : []).forEach((c) => console.log(`${c.id}\t${c.platform || c.type}\t${c.name || c.username || ''}`));
    console.log('Use o ID da conta no --conta');
    return;
  }

  // Listar agendados
  if (cmd === '--listar-agendados') {
    const d = await apiGet('/api/scheduled');
    const lista = d.posts || d.data || d;
    (Array.isArray(lista) ? lista : []).forEach((p) => console.log(`${p.id}\t${p.scheduled_at}\t${p.platform || ''}\t${(p.caption || '').slice(0, 40)}`));
    return;
  }

  // Cancelar
  if (cmd === '--cancelar') {
    const postId = args[1];
    if (!postId) { console.error('Uso: --cancelar <postId>'); process.exit(1); }
    await api(`/api/scheduled/${postId}/cancel`, {});
    console.log(`✓ Agendamento ${postId} cancelado.`);
    return;
  }

  // Agendar (padrão)
  if (!slug || !data) {
    console.error('Uso: agendar-postforme.js <slug-ou-caminho> --data "2026-08-20T10:00:00-03:00" [--rede instagram] [--conta <id>]');
    process.exit(1);
  }
  const SITE_URL = process.env.SITE_URL;
  if (!SITE_URL) { console.error('SITE_URL obrigatória no .env (mídia precisa de URL pública)'); process.exit(1); }

  const dir = localizarPasta(slug);
  const caption = lerLegenda(dir);
  const media = slidesPublicos(dir, slug, SITE_URL);
  if (!media.length) { console.error(`Nenhum slide em ${dir}/instagram — renderize antes (render-carrossel.js)`); process.exit(1); }

  console.log(`→ Agendando "${slug}" para ${data} (${rede})...`);
  const r = await api('/api/schedule', {
    social_accounts: conta ? [conta] : undefined,
    caption,
    media,
    scheduled_at: data,
    platform: rede,
  });
  console.log(`✓ Agendado! ID: ${r.id || r.post_id || JSON.stringify(r).slice(0, 120)}`);
  console.log(`  Data: ${data} · rede: ${rede} · slides: ${media.length}`);
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
