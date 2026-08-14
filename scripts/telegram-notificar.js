#!/usr/bin/env node
/**
 * telegram-notificar.js — notificações via bot do Telegram (inspirado no The-Notifier do The-ALL).
 * Sem dependências externas (fetch nativo).
 *
 * Uso:
 *   node --env-file=.env scripts/telegram-notificar.js "mensagem" [--nivel info|alerta|sucesso]
 *   node --env-file=.env scripts/telegram-notificar.js --teste
 *
 * Env: TELEGRAM_BOT_TOKEN (do BotFather) · TELEGRAM_CHAT_ID (seu chat — ou grupo/canal)
 *   Obter CHAT_ID: mande /start pro bot e rode --teste (ou use @userinfobot)
 */
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const ICONES = { info: 'ℹ️', alerta: '⚠️', sucesso: '✅', erro: '❌' };

if (!TOKEN || !CHAT_ID) {
  console.error('TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID obrigatórios no .env (BotFather → /newbot)');
  process.exit(1);
}

async function enviar(texto) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: texto, disable_web_page_preview: true }),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    console.error('✗ Telegram: ' + JSON.stringify(data).slice(0, 300));
    process.exit(1);
  }
  return data.result;
}

(async () => {
  const args = process.argv.slice(2);
  if (args.includes('--teste')) {
    await enviar(`${ICONES.sucesso} *MazyOS conectado ao Telegram!*\nNotificações funcionando.`);
    console.log('✓ Mensagem de teste enviada!');
    return;
  }
  const texto = args.find((a) => !a.startsWith('--'));
  const nivel = (() => {
    const i = args.indexOf('--nivel');
    return i >= 0 && args[i + 1] ? args[i + 1] : 'info';
  })();
  if (!texto) { console.error('Uso: telegram-notificar.js "mensagem" [--nivel info|alerta|sucesso|erro]'); process.exit(1); }
  const icon = ICONES[nivel] || ICONES.info;
  const r = await enviar(`${icon} ${texto}`);
  console.log(`✓ Notificação enviada (message_id: ${r.message_id})`);
})().catch((e) => { console.error('✗ ' + e.message); process.exit(1); });
