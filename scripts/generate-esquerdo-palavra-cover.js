'use strict';

/** Capa 1200×630 — palavra esquerdo (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/esquerdo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101210"/>
      <stop offset="55%" stop-color="#161a16"/>
      <stop offset="100%" stop-color="#0a0c0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="45%" r="45%">
      <stop offset="0%" stop-color="rgba(140,180,120,0.28)"/>
      <stop offset="100%" stop-color="rgba(140,180,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="420" cy="280" r="260" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="4">PALAVRAS · OBJETO · CRIAÇÃO · FINALIDADE</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="88" font-weight="700" fill="#f4efe6">esquerdo</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(180,210,160,0.95)">lado de ofício · anti-estigma · faça o melhor</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8b8a0">nesta mão · hoje · com método</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#dfc262">mãos · gesto · criatividade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
