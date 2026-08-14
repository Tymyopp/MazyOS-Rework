#!/usr/bin/env node
/**
 * telemetria.js — registro LOCAL e OPT-IN de uso das skills.
 *
 * NÃO envia nada pra internet. Apenas anexa uma linha JSON ao arquivo
 * .local/uso.jsonl (ignorado pelo git) pra o dono ver quais skills usa mais
 * e decidir o que priorizar.
 *
 * Ativação: na primeira vez que uma skill for usada, o agente pergunta se
 * quer registrar. Ou ative manualmente:
 *   node scripts/telemetria.js ativar
 *   node scripts/telemetria.js registrar carrossel
 *   node scripts/telemetria.js relatorio
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', '.local');
const ARQ = path.join(DIR, 'uso.jsonl');
const CONFIG = path.join(DIR, 'telemetria.json');

function ativo() {
  try { return JSON.parse(fs.readFileSync(CONFIG, 'utf8')).ativo === true; }
  catch { return false; }
}

function relatorio() {
  if (!fs.existsSync(ARQ)) { console.log('Nenhum uso registrado ainda.'); return; }
  const contagem = {};
  for (const linha of fs.readFileSync(ARQ, 'utf8').trim().split('\n')) {
    try {
      const e = JSON.parse(linha);
      contagem[e.skill] = (contagem[e.skill] || 0) + 1;
    } catch {}
  }
  console.log('Uso por skill (local, anônimo):');
  for (const [s, n] of Object.entries(contagem).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${n.toString().padStart(3)}  ${s}`);
  }
}

const cmd = process.argv[2];
const arg = process.argv[3];

if (cmd === 'ativar') {
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(CONFIG, JSON.stringify({ ativo: true, ativado_em: new Date().toISOString() }, null, 2));
  console.log('✓ Telemetria local ativada (registra em .local/uso.jsonl — nunca sai da máquina).');
} else if (cmd === 'desativar') {
  fs.writeFileSync(CONFIG, JSON.stringify({ ativo: false }, null, 2));
  console.log('✓ Telemetria desativada.');
} else if (cmd === 'registrar' && arg) {
  if (!ativo()) { process.exit(0); }
  fs.mkdirSync(DIR, { recursive: true });
  fs.appendFileSync(ARQ, JSON.stringify({ skill: arg, data: new Date().toISOString().slice(0, 10) }) + '\n');
} else if (cmd === 'relatorio') {
  relatorio();
} else {
  console.log('Uso: node scripts/telemetria.js [ativar|desativar|registrar <skill>|relatorio]');
}
