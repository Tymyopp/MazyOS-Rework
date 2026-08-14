#!/usr/bin/env node
/**
 * cron-posts.js — publica sozinho o que o calendário marca como "agendado" para hoje.
 * Nível 3 de automação: roda via cron/n8n — sem intervenção humana.
 *
 * Uso:
 *   node --env-file=.env scripts/cron-posts.js            → publica agendados de HOJE
 *   node --env-file=.env scripts/cron-posts.js --data 2026-08-20
 *   node --env-file=.env scripts/cron-posts.js --lista    → só lista (não publica)
 *
 * Formato esperado no calendário (marketing/calendario/calendario.md):
 *   | Data | Canal | Formato | Tema | Status |
 *   | seg 20/08 | Instagram | carrossel | slug-da-pasta | agendado |
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
  // aceita "DD/MM" ou "YYYY-MM-DD"
  const m = linha.match(/(\d{2})\/(\d{2})/);
  if (m) return `${h.iso.slice(0, 4)}-${m[2]}-${m[1]}`;
  const m2 = linha.match(/(\d{4}-\d{2}-\d{2})/);
  return m2 ? m2[1] : null;
}

function publicar(item) {
  // item: { canal, formato, tema, pasta? } — pasta = tema (slug) se existir em marketing/conteudo
  const cmd = [];
  const canal = (item.canal || '').toLowerCase();
  if (canal.includes('instagram')) {
    cmd.push(`node --env-file=.env scripts/postar-instagram.js "${item.tema}"`);
  } else if (canal.includes('tiktok')) {
    cmd.push(`node --env-file=.env scripts/postar-tiktok.js "${item.tema}"`);
  } else if (canal.includes('facebook')) {
    cmd.push(`node --env-file=.env scripts/postar-facebook.js "${item.tema}"`);
  } else {
    console.log(`  ⚠ canal "${item.canal}" sem script — pular (registrar para revisão)`);
    return false;
  }
  try {
    const out = execSync(cmd.join(' && '), { cwd: path.join(__dirname, '..'), encoding: 'utf8', timeout: 120000 });
    console.log(`  ✓ ${canal}: ${item.tema}\n${out.split('\n').slice(-2).join('\n')}`);
    return true;
  } catch (e) {
    console.error(`  ✗ falha ${canal}: ${item.tema} — ${String(e.stderr || e.message).slice(0, 300)}`);
    return false;
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
    console.log(`→ ${p.canal} ${p.formato}: ${p.tema}`);
    const sucesso = publicar(p);
    if (sucesso) {
      ok++;
      novas.push(p.linha.replace(/\|\s*agendado\s*\|/i, '| publicado |'));
    } else {
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
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
