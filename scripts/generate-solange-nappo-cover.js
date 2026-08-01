'use strict';

/**
 * Gera capa 1200×630 + retrato da Profa. Solange Nappo a partir de
 * imagens/inspecoes/_src/cebrid-solange.png (foto pública da equipe CEBRID).
 * Uso: node scripts/generate-solange-nappo-cover.js
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

  const src = path.join(ROOT, 'imagens', 'inspecoes', '_src', 'cebrid-solange.png');
  if (!fs.existsSync(src)) {
    throw new Error('fonte em falta: imagens/inspecoes/_src/cebrid-solange.png');
  }

  const outDir = path.join(ROOT, 'imagens', 'inspecoes');
  fs.mkdirSync(outDir, { recursive: true });
  const coverOut = path.join(outDir, 'solange-nappo-cover.jpg');
  const portraitOut = path.join(outDir, 'solange-nappo-portrait.jpg');

  const base = await sharp(src)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.82, saturation: 0.95 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.12)"/>
      <stop offset="45%" stop-color="rgba(8,10,9,0.35)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.88)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="360" width="8" height="180" fill="#d4af37"/>
  <text x="120" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="5">LEGADO · CEBRID / UNIFESP</text>
  <text x="120" y="475" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="800" fill="#fff8e0">Profa. Solange Nappo</text>
  <text x="120" y="525" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">Continuidade do CEBRID após Carlini</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(coverOut);

  await sharp(src)
    .rotate()
    .resize(900, 900, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(portraitOut);

  console.log('OK:', path.relative(ROOT, coverOut), '(' + Math.round(fs.statSync(coverOut).size / 1024) + ' KB)');
  console.log('OK:', path.relative(ROOT, portraitOut), '(' + Math.round(fs.statSync(portraitOut).size / 1024) + ' KB)');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
