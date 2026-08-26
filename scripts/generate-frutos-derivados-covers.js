'use strict';

/** Capas 1200×630 para inspeções Derivados · frutos em fila. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { FRUIT_DERIVADO_CONFIGS } = require('../lib/frutos-derivados-inspecoes-posts.js');

async function generateOne(sharp, cfg) {
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  const outPath = path.join(
    ROOT,
    'imagens',
    'inspecoes',
    cfg.id + '-derivado-cover.jpg'
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.62, saturation: 0.95 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,14,10,0.25)"/>
      <stop offset="50%" stop-color="rgba(8,14,10,0.55)"/>
      <stop offset="100%" stop-color="rgba(8,14,10,0.9)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="200" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#8fbc8f" letter-spacing="8">DERIVADOS DE RISCO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#e8ffe8">${escapeXml(cfg.namePt)}</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d0e0d0">açúcar · aditivos · química industrial</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(outPath);

  console.log('OK', path.relative(ROOT, outPath), Math.round(fs.statSync(outPath).size / 1024) + 'KB');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function main() {
  const sharp = require('sharp');
  for (const cfg of FRUIT_DERIVADO_CONFIGS) {
    await generateOne(sharp, cfg);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
