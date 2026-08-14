#!/usr/bin/env node
/**
 * insta-insights.js — métricas de engajamento do Instagram (Graph API).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Lê o token de .local/insta-auth.json (criado pelo /conectar-instagram) ou
 * de META_PAGE_ACCESS_TOKEN no .env; renova automaticamente se faltar <7 dias.
 *
 * Uso:
 *   node --env-file=.env scripts/insta-insights.js resumo [dias]     → insights da conta (padrão 7 dias)
 *   node --env-file=.env scripts/insta-insights.js posts [limite]    → últimos posts com métricas
 *   node --env-file=.env scripts/insta-insights.js seguir            → tendência seguidores (últimos 30d)
 */
const fs = require('fs');
const path = require('path');

const API = 'https://graph.facebook.com/v23.0';
const AUTH_FILE = path.join(__dirname, '..', '.local', 'insta-auth.json');

function lerAuth() {
  try { return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8')); } catch { return null; }
}
const auth = lerAuth();
let TOKEN = auth && auth.access_token ? auth.access_token : process.env.META_PAGE_ACCESS_TOKEN;
let IG_ID = auth && auth.ig_user_id ? auth.ig_user_id : process.env.META_IG_USER_ID;

if (!TOKEN || !IG_ID) {
  console.error('Conecte o Instagram antes: /conectar-instagram (ou META_PAGE_ACCESS_TOKEN + META_IG_USER_ID no .env)');
  process.exit(1);
}

async function api(caminho, params = {}) {
  const url = new URL(`${API}/${caminho}`);
  url.search = new URLSearchParams({ access_token: TOKEN, ...params });
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(JSON.stringify(data.error || data).slice(0, 400));
  return data;
}

async function renovarSePreciso() {
  if (!auth || !auth.expires_at) return;
  const dias = Math.floor((new Date(auth.expires_at) - Date.now()) / 86400000);
  if (dias >= 7) return;
  try {
    const url = new URL(`${API}/oauth/access_token`);
    url.search = new URLSearchParams({ grant_type: 'ig_refresh_token', access_token: TOKEN });
    const res = await fetch(url);
    const d = await res.json();
    if (!d.access_token) throw new Error('sem access_token');
    auth.access_token = d.access_token;
    auth.expires_at = new Date(Date.now() + (d.expires_in || 5184000) * 1000).toISOString();
    fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2));
    TOKEN = d.access_token;
    console.log('→ token renovado');
  } catch (e) {
    console.error('⚠ falha ao renovar token: ' + e.message);
  }
}

function fmt(n) {
  if (n === null || n === undefined) return '—';
  return Number(n).toLocaleString('pt-BR');
}
function pct(cur, ant) {
  if (ant === null || ant === undefined || !ant) return '';
  const d = ((cur - ant) / ant) * 100;
  return ` (${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%)`;
}

(async () => {
  await renovarSePreciso();
  const cmd = process.argv[2] || 'resumo';
  const n = Number(process.argv[3]) || 7;

  if (cmd === 'seguir') {
    const d = await api(`${IG_ID}/insights`, {
      metric: 'follower_count',
      period: 'day',
      since: new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10),
      until: new Date().toISOString().slice(0, 10),
    });
    const pts = (d.data?.[0]?.values || []).map((v) => v.value);
    if (!pts.length) { console.log('Sem dados de seguidores no período.'); return; }
    const ini = pts[0], fim = pts[pts.length - 1];
    console.log('== TENDÊNCIA DE SEGUIDORES (30 dias) ==');
    console.log(`  ${fmt(ini)} → ${fmt(fim)}${pct(fim, ini)}`);
    return;
  }

  if (cmd === 'posts') {
    const limite = process.argv[3] || 10;
    const d = await api(`${IG_ID}/media`, {
      fields: 'id,media_type,caption,timestamp,like_count,comments_count,permalink,thumbnail_url',
      limit: limite,
    });
    const posts = d.data || [];
    if (!posts.length) { console.log('Nenhum post encontrado.'); return; }
    console.log(`== ÚLTIMOS ${posts.length} POSTS ==`);
    for (const p of posts) {
      const data = String(p.timestamp || '').slice(0, 10);
      const leg = (p.caption || '').replace(/\n/g, ' ').slice(0, 45);
      console.log(`  [${data}] ${p.media_type} · ❤ ${fmt(p.like_count)} · 💬 ${fmt(p.comments_count)} · ${leg}`);
    }
    return;
  }

  // resumo (padrão): métricas da conta no período
  const since = new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
  const until = new Date().toISOString().slice(0, 10);

  const d = await api(`${IG_ID}/insights`, {
    metric: 'reach,impressions,profile_views,accounts_engaged',
    period: 'day',
    since, until,
  });

  console.log(`== INSIGHTS DO INSTAGRAM — últimos ${n} dias (@${auth?.ig_username || IG_ID}) ==`);
  for (const m of d.data || []) {
    const values = (m.values || []).map((v) => v.value).filter((v) => v !== null && v !== undefined);
    if (!values.length) { console.log(`  ${m.name}: sem dados no período`); continue; }
    const soma = values.reduce((a, b) => a + b, 0);
    const media = soma / values.length;
    console.log(`  ${m.name}: total ${fmt(soma)} · média/dia ${fmt(Math.round(media))} · pico ${fmt(Math.max(...values))}`);
  }
  console.log('');
  console.log('Post mais recente:');
  try {
    const med = await api(`${IG_ID}/media`, { fields: 'id,media_type,like_count,comments_count,permalink', limit: 1 });
    const p = med.data?.[0];
    if (p) console.log(`  ${p.media_type} · ❤ ${fmt(p.like_count)} · 💬 ${fmt(p.comments_count)} · ${p.permalink}`);
  } catch { console.log('  (sem acesso a posts)'); }
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
