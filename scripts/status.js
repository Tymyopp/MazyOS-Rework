#!/usr/bin/env node
/**
 * status.js — painel de status do negócio (inspirado no `theall status` do The-ALL).
 * Mostra num único comando: memória, tarefas, calendário, integrações, KPI e scripts.
 *
 * Uso:
 *   node scripts/status.js              → painel completo
 *   node scripts/status.js --json      → saída JSON (para máquina/n8n)
 *   node scripts/status.js --rapido    → sem chamadas de rede
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function ler(rel) {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { return null; }
}
function contarPendentes() {
  const t = ler('_memoria/tarefas.md') || '';
  return (t.match(/^- \[ \]/gm) || []).length;
}
function contarAgendados() {
  const c = ler('marketing/calendario/calendario.md') || '';
  return (c.match(/\|\s*agendado\s*\|/gi) || []).length;
}
function contarClientes() {
  const c = ler('_memoria/clientes.md') || '';
  // linhas da tabela que têm data (AAAA-MM-DD) = registros reais
  return (c.match(/\|\s*\d{4}-\d{2}-\d{2}\s*\|/g) || []).length;
}
function memoriaPreenchida() {
  const out = {};
  for (const a of ['empresa', 'preferencias', 'estrategia']) {
    const x = ler(`_memoria/${a}.md`) || '';
    // placeholder = campos vazios "**Nome:**" sem valor
    // placeholder = campos sem valor ("**Nome:**" seguido de fim de linha ou de outro **)
    const vazios = (x.match(/\*\*[A-Za-zÀ-ú ]+:\*\*\s*$/gm) || []).length;
    const totais = (x.match(/\*\*[A-Za-zÀ-ú ]+:\*\*/g) || []).length;
    out[a] = totais > 0 && vazios >= totais - 1 ? 'em branco' : 'preenchida';
  }
  return out;
}
function integracoes(env) {
  const out = {};
  out.instagram = env.META_APP_ID && env.META_APP_SECRET ? 'configurada (link OAuth)' : '—';
  const auth = (() => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, '.local/insta-auth.json'), 'utf8')); } catch { return null; } })();
  if (auth && auth.access_token) out.instagram = `conectada (@${auth.ig_username || '?'})`;
  out.whatsapp = env.OPENWA_URL && env.OPENWA_API_KEY ? `configurada (${env.OPENWA_URL})` : '—';
  out.tiktok = env.TIKTOK_CLIENT_KEY ? 'configurada' : '—';
  out.linkedin = env.LINKEDIN_ACCESS_TOKEN ? 'configurada' : '—';
  out.youtube = env.GOOGLE_CLIENT_SECRET_FILE ? 'configurada' : '—';
  return out;
}
function lerEnv() {
  const e = ler('.env');
  if (!e) return {};
  const out = {};
  for (const linha of e.split('\n')) {
    const m = linha.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

(async () => {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const rapido = args.includes('--rapido');
  const env = lerEnv();

  const painel = {
    negocio: (ler('_memoria/empresa.md') || '').split('\n').find((l) => l.startsWith('**Nome:**'))?.replace('**Nome:**', '').trim() || '(não configurado — rode /instalar)',
    memoria: memoriaPreenchida(),
    tarefas_abertas: contarPendentes(),
    agendados: contarAgendados(),
    clientes: contarClientes(),
    integracoes: integracoes(env),
    scripts: fs.readdirSync(path.join(ROOT, 'scripts')).filter((f) => f.endsWith('.js')).length,
    skills: fs.readdirSync(path.join(ROOT, '.claude/skills')).filter((d) => fs.existsSync(path.join(ROOT, '.claude/skills', d, 'SKILL.md'))).length,
  };

  if (json) { console.log(JSON.stringify(painel, null, 2)); return; }

  console.log('=== STATUS DO NEGÓCIO ===');
  console.log(`Negócio:   ${painel.negocio}`);
  console.log(`Memória:   empresa=${painel.memoria.empresa} · preferencias=${painel.memoria.preferencias} · estrategia=${painel.memoria.estrategia}`);
  console.log(`Tarefas:   ${painel.tarefas_abertas} em aberto · Agendados: ${painel.agendados} · Clientes: ${painel.clientes}`);
  console.log('');
  console.log('Integrações:');
  for (const [k, v] of Object.entries(painel.integracoes)) console.log(`  ${k.padEnd(10)} ${v}`);
  console.log('');
  console.log(`Sistema:   ${painel.skills} skills · ${painel.scripts} scripts`);
  if (!rapido) {
    console.log('');
    console.log('Dica: node scripts/check-integracao.js para diagnóstico detalhado de cada integração.');
  }
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
