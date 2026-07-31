'use strict';

/**
 * Gera capa editorial 1200×630 da inspeção CEBRID.
 * Uso: node scripts/generate-cebrid-cover.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    throw new Error('sharp em falta — npm install');
  }

  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  if (!fs.existsSync(heroPath)) {
    throw new Error('imagens/background-hero.png em falta');
  }

  const outDir = path.join(ROOT, 'imagens', 'inspecoes');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'cebrid-cover.jpg');

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.52, saturation: 0.88 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.28)"/>
      <stop offset="48%" stop-color="rgba(8,10,9,0.58)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.86)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="150" width="8" height="320" fill="#d4af37"/>
  <text x="120" y="210" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#d4af37" letter-spacing="6">FORMAÇÃO · UNIFESP</text>
  <text x="120" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="800" fill="#fff8e0">CEBRID</text>
  <text x="120" y="365" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#d7d7d7">Centro · informação · medicina canabinoide</text>
  <text x="120" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#b8b8b8">Instituto Professor Elisaldo Carlini</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);

  const size = fs.statSync(outPath).size;
  console.log('OK:', path.relative(ROOT, outPath), '(' + Math.round(size / 1024) + ' KB)');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
