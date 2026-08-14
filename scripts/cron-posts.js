#!/usr/bin/env node
/**
 * cron-posts.js — publica sozinho o que o calendário marca como "agendado" para hoje.
 * Nível 3 de automação: roda via cron/n8n — sem intervenção humana.
 *
 * Canais suportados:
 *   instagram → postar-instagram.js (carrossel/imagem/reel/story)
 *   tiktok    → postar-tiktok.js (vídeo)
 *   facebook  → postar-facebook.js (carrossel)
 *   whatsapp  → whatsapp-openwa.js (mensagem para contato — formato "tema" = número)
 *   linkedin  → requer MCP (/postar-linkedin) — avisa e mantém "agendado"
 *   youtube   → requer MCP (/postar-youtube) — avisa e mantém "agendado"
 *
 * Uso:
 *   node --env-file=.env scripts/cron-posts.js            → publica agendados de HOJE
 *   node --env-file=.env scripts/cron-posts.js --data 2026-08-20
 *   node --env-file=.env scripts/cron-posts.js --lista    → só lista (não publica)
 *
 * Formato esperado no calendário (marketing/calendario/calendario.md):
 *   | Data | Canal | Formato | Tema | Status |
 *   | seg 20/08 | Instagram | carrossel | slug-da-pasta | agendado |
 *   | seg 20/08 | WhatsApp | mensagem | 5588999999999 | agendado |   ← tema = número
 *
 * Depois de publicar, marca o item como "publicado" (edita a linha).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CAL = path.join(__dirname, '..', 'marketing', 'calendario', 'calendario.md');

function hoje() {
  const d = new Date();
  return { iso: d.toISOString().slice(0, 10), dia: String(d.getDate()).padStart(2, '0'), mes: String(d.getMonth() + 1).padStart(2, '0') };
}

function linhaData(linha, h) {
  const m = linha.match(/(\d{2})\/(\d{2})/);
  if (m) return `${h.iso.slice(0, 4)}-${m[2]}-${m[1]}`;
  const m2 = linha.match(/(\d{4}-\d{2}-\d{2})/);
  return m2 ? m2[1] : null;
}

// Mapa de canais → script de publicação
const CANAIS = [
  { match: (c) => c.includes('instagram'), script: 'postar-instagram.js', args: (item) => [`"${item.tema}"`] },
  { match: (c) => c.includes('tiktok'), script: 'postar-tiktok.js', args: (item) => [`"${item.tema}"`] },
  { match: (c) => c.includes('facebook'), script: 'postar-facebook.js', args: (item) => [`"${item.tema}"`] },
  {
    match: (c) => c.includes('whatsapp'),
    script: 'whatsapp-openwa.js',
    args: (item, sessao) => {
      // tema = número (ou "nome:numero"); sessão = OPENWA_SESSAO no .env ou "mazyos-negocio"
      const partes = String(item.tema).split(':');
      const numero = partes.length > 1 ? partes[1] : partes[0];
      return ['enviar', sessao || 'mazyos-negocio', numero.replace(/\D/g, ''), `"${item.formato || 'Mensagem do MazyOS'}"`];
    },
    requer: () => process.env.OPENWA_URL && process.env.OPENWA_API_KEY,
  },
];

// Canais que dependem de MCP (não automatizáveis sem ele) — avisam e mantêm "agendado"
const MCP_ONLY = [
  { match: (c) => c.includes('linkedin'), nome: 'LinkedIn', skill: '/postar-linkedin' },
  { match: (c) => c.includes('youtube'), nome: 'YouTube', skill: '/postar-youtube' },
];

function publicar(item, sessao) {
  const canal = (item.canal || '').toLowerCase();
  const rota = CANAIS.find((r) => r.match(canal));
  if (!rota) return { ok: false, motivo: `canal "${item.canal}" sem script (use instagram/tiktok/facebook/whatsapp)` };

  if (rota.requer && !rota.requer()) {
    return { ok: false, motivo: `${canal} requer OpenWA configurado (.env OPENWA_URL/API_KEY)` };
  }
  try {
    const args = rota.args(item, sessao).join(' ');
    const cmd = `node --env-file=.env scripts/${rota.script} ${args}`;
    const out = execSync(cmd, { cwd: path.join(__dirname, '..'), encoding: 'utf8', timeout: 180000 });
    console.log(`  ✓ ${canal}: ${item.tema}\n${out.split('\n').slice(-2).join('\n')}`);
    return { ok: true };
  } catch (e) {
    return { ok: false, motivo: String(e.stderr || e.message).slice(0, 300) };
  }
}

(async () => {
  if (!fs.existsSync(CAL)) { console.error(`Calendário não encontrado: ${CAL}`); process.exit(1); }
  const args = process.argv.slice(2);
  const soLista = args.includes('--lista');
  const h = hoje();
  const alvo = (() => {
    const i = args.indexOf('--data');
    return i >= 0 && args[i + 1] ? args[i + 1] : h.iso;
  })();
  const sessao = process.env.OPENWA_SESSAO;

  const linhas = fs.readFileSync(CAL, 'utf8').split('\n');
  const pendentes = [];
  for (const linha of linhas) {
    if (!linha.trim().startsWith('|')) continue;
    const cols = linha.split('|').map((c) => c.trim());
    if (cols.length < 6) continue;
    const [ , data, canal, formato, tema, status ] = cols;
    if ((status || '').toLowerCase() !== 'agendado') continue;
    const d = linhaData(linha, h);
    if (d === alvo) pendentes.push({ data, canal, formato, tema, linha });
  }

  if (!pendentes.length) { console.log(`Nada agendado para ${alvo}.`); return; }

  console.log(`== Cron de posts — ${alvo} ==`);
  if (soLista) {
    pendentes.forEach((p) => console.log(`  • ${p.data} ${p.canal} ${p.formato} — ${p.tema}`));
    return;
  }

  let ok = 0;
  const novas = [];
  for (const p of pendentes) {
    const canalL = (p.canal || '').toLowerCase();
    const mcp = MCP_ONLY.find((m) => m.match(canalL));
    if (mcp) {
      console.log(`→ ${mcp.nome}: "${p.tema}" — requer MCP (${mcp.skill}) — mantido como agendado`);
      novas.push(p.linha);
      continue;
    }
    console.log(`→ ${p.canal} ${p.formato}: ${p.tema}`);
    const r = publicar(p, sessao);
    if (r.ok) {
      ok++;
      novas.push(p.linha.replace(/\|\s*agendado\s*\|/i, '| publicado |'));
    } else {
      console.error(`  ✗ ${r.motivo}`);
      novas.push(p.linha);
    }
  }
  // Reescreve o calendário com os status atualizados
  let out = [];
  for (const linha of linhas) {
    const pend = pendentes.find((p) => p.linha === linha);
    out.push(pend ? novas[pendentes.indexOf(pend)] : linha);
  }
  fs.writeFileSync(CAL, out.join('\n'));
  console.log(`\nResumo: ${ok}/${pendentes.length} publicados. Calendário atualizado.`);
  const pendentesMCP = pendentes.filter((p) => MCP_ONLY.some((m) => m.match((p.canal || '').toLowerCase()))).length;
  if (pendentesMCP) console.log(`Nota: ${pendentesMCP} item(ns) de LinkedIn/YouTube exigem MCP — agende via /postar-linkedin ou /postar-youtube.`);
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
