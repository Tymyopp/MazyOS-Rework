#!/usr/bin/env node
/**
 * gerar-imagem.js — gera uma imagem via OpenAI (DALL-E 3) e salva em PNG.
 * Sem dependências externas (fetch nativo do Node 20+).
 *
 * Uso: node --env-file=.env scripts/gerar-imagem.js "PROMPT" "saida.png"
 * Exige no .env: OPENAI_API_KEY
 */
const fs = require('fs');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const prompt = process.argv[2];
const saida = process.argv[3];

if (!OPENAI_API_KEY || !prompt || !saida) {
  console.error('Uso: node --env-file=.env scripts/gerar-imagem.js "PROMPT" "saida.png"');
  console.error('Exige OPENAI_API_KEY no .env');
  process.exit(1);
}

(async () => {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.data?.[0]?.b64_json) {
    console.error('Erro OpenAI:', JSON.stringify(data.error || data).slice(0, 500));
    process.exit(1);
  }

  fs.writeFileSync(saida, Buffer.from(data.data[0].b64_json, 'base64'));
  console.log(`✓ imagem salva em ${saida}`);
})().catch((e) => { console.error(e); process.exit(1); });
