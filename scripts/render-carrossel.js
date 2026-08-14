#!/usr/bin/env node
/**
 * render-carrossel.js — template padrão de render HTML → PNG 1080x1350.
 * As skills /carrossel e /publicar-tema copiam este arquivo para a pasta
 * do conteúdo (como render.js) e executam:
 *
 *   NODE_PATH="<pasta-com-node_modules>" node render.js
 *
 * Dependência: playwright instalado (ver tools/render-lib ou scripts/README.md)
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = process.argv[2] || process.cwd();
  const html = path.join(dir, 'carrossel.html');
  if (!fs.existsSync(html)) { console.error('carrossel.html não encontrado em', dir); process.exit(1); }

  const outDir = path.join(dir, 'instagram');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('file://' + html);
  await page.waitForTimeout(500);

  const slides = await page.$$('.slide');
  console.log(`Renderizando ${slides.length} slides em 1080x1350...`);

  for (let i = 0; i < slides.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await slides[i].screenshot({ path: path.join(outDir, `slide-${num}.png`) });
    console.log(`✓ slide-${num}.png`);
  }

  await browser.close();
  console.log('Pronto.');
})().catch((e) => { console.error(e); process.exit(1); });
