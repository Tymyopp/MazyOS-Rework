#!/usr/bin/env node
/**
 * whatsapp-openwa.js — cliente REST do gateway OpenWA (https://github.com/rmyndharis/OpenWA).
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Uso:
 *   node --env-file=.env scripts/whatsapp-openwa.js criar-sessao <nome> [--engine wwjs|baileys]
 *   node --env-file=.env scripts/whatsapp-openwa.js qr <nome> [--salvar wa-qr.png]
 *   node --env-file=.env scripts/whatsapp-openwa.js status [nome]
 *   node --env-file=.env scripts/whatsapp-openwa.js listar
 *   node --env-file=.env scripts/whatsapp-openwa.js enviar <nome> <numero> "<mensagem>"
 *   node --env-file=.env scripts/whatsapp-openwa.js apagar <nome>
 *
 * Env: OPENWA_URL (padrão http://localhost:2785) · OPENWA_API_KEY (obrigatória)
 * Docs do gateway: docs/openwa-integracao.md (MazyOS)
 */
const fs = require('fs');

const BASE = (process.env.OPENWA_URL || 'http://localhost:2785').replace(/\/$/, '');
const KEY = process.env.OPENWA_API_KEY;

if (!KEY) {
  console.error('OPENWA_API_KEY não definida no .env (veja docs/openwa-integracao.md)');
  process.exit(1);
}

async function api(method, caminho, body) {
  const res = await fetch(`${BASE}${caminho}`, {
    method,
    headers: {
      'X-API-Key': KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`✗ HTTP ${res.status} em ${method} ${caminho}: ${JSON.stringify(data.message || data).slice(0, 300)}`);
    process.exit(1);
  }
  return data;
}

async function acharSessao(nome) {
  const lista = await api('GET', '/api/sessions');
  const s = (Array.isArray(lista) ? lista : []).find((x) => x.name === nome || x.id === nome);
  if (!s) {
    console.error(`Sessão "${nome}" não encontrada. Liste com: listar`);
    process.exit(1);
  }
  return s;
}

(async () => {
  const cmd = process.argv[2];
  const args = process.argv.slice(3);
  const pega = (flag) => { const i = args.indexOf(flag); return i >= 0 && args[i + 1] ? args[i + 1] : null; };
  const nome = args.find((a) => !a.startsWith('--'));

  switch (cmd) {
    case 'criar-sessao': {
      if (!nome) { console.error('Uso: criar-sessao <nome> [--engine wwjs|baileys]'); process.exit(1); }
      const engine = pega('--engine') || 'wwjs';
      const s = await api('POST', '/api/sessions', { name: nome, config: { engine } });
      console.log(`✓ Sessão "${s.name}" criada (${s.id}) — engine: ${engine}`);
      console.log('Agora rode: qr ' + nome + ' --salvar wa-qr.png  (e escaneie)');
      break;
    }
    case 'qr': {
      if (!nome) { console.error('Uso: qr <nome> [--salvar wa-qr.png]'); process.exit(1); }
      const s = await acharSessao(nome);
      if (s.status === 'ready') { console.log(`✓ Sessão "${nome}" já está conectada (ready).`); break; }
      try { await api('POST', `/api/sessions/${s.id}/start`); } catch {}
      const r = await api('GET', `/api/sessions/${s.id}/qr`);
      const dataUrl = r.qr || (r.data && r.data.qr) || '';
      if (!dataUrl) { console.log('QR ainda não disponível (status: ' + s.status + ') — tente de novo em 3s.'); break; }
      const b64 = dataUrl.replace(/^data:image\/png;base64,/, '');
      const destino = pega('--salvar') || 'wa-qr.png';
      fs.writeFileSync(destino, Buffer.from(b64, 'base64'));
      console.log(`✓ QR salvo em ${destino} — escaneie no WhatsApp (Aparelhos conectados → Conectar um aparelho).`);
      console.log('⚠ O QR expira em ~20s — reexecute o comando se necessário.');
      break;
    }
    case 'status': {
      if (nome) {
        const s = await acharSessao(nome);
        console.log(`${s.name} → ${s.status}${s.phone ? ' · ' + s.phone : ''}${s.pushName ? ' · ' + s.pushName : ''}`);
      } else {
        const lista = await api('GET', '/api/sessions');
        if (!lista.length) { console.log('Nenhuma sessão.'); break; }
        for (const s of lista) console.log(`${s.name} → ${s.status}${s.phone ? ' · ' + s.phone : ''}`);
      }
      break;
    }
    case 'listar':
      (await api('GET', '/api/sessions')).forEach((s) => console.log(`${s.name} (${s.id}) → ${s.status}`));
      break;
    case 'enviar': {
      const numero = args[1];
      const mensagem = args.slice(2).join(' ').replace(/^"|"$/g, '');
      if (!nome || !numero || !mensagem) { console.error('Uso: enviar <nome> <numero> "<mensagem>"'); process.exit(1); }
      const s = await acharSessao(nome);
      if (s.status !== 'ready') { console.error(`Sessão "${nome}" não está ready (${s.status}).`); process.exit(1); }
      const chatId = numero.replace(/\D/g, '') + '@c.us';
      const r = await api('POST', `/api/sessions/${s.id}/messages/send-text`, { chatId, text: mensagem });
      console.log(`✓ Mensagem enviada (messageId: ${r.messageId})`);
      break;
    }
    case 'apagar': {
      if (!nome) { console.error('Uso: apagar <nome>'); process.exit(1); }
      const s = await acharSessao(nome);
      await api('DELETE', `/api/sessions/${s.id}`);
      console.log(`✓ Sessão "${nome}" apagada.`);
      break;
    }
    default:
      console.log(`whatsapp-openwa.js — cliente do gateway OpenWA

Uso:
  criar-sessao <nome> [--engine wwjs|baileys]
  qr <nome> [--salvar wa-qr.png]
  status [nome]
  listar
  enviar <nome> <numero> "<mensagem>"
  apagar <nome>

Env: OPENWA_URL (padrão http://localhost:2785) · OPENWA_API_KEY`);
  }
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
