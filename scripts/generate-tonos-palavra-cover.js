'use strict';

/** Capa 1200×630 — tónos / τόνος (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tonos-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16100c"/>
      <stop offset="50%" stop-color="#1a140e"/>
      <stop offset="100%" stop-color="#0a0806"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="48%">
      <stop offset="0%" stop-color="rgba(210,160,60,0.34)"/>
      <stop offset="100%" stop-color="rgba(210,160,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="220" rx="390" ry="200" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b86a" letter-spacing="3">PALAVRAS · GRECO · RAIZ DA TENSÃO</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" fill="#e8d4a0">τόνος</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#fff6e0">tónos</text>
  <text x="600" y="460" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(230,210,160,0.95)">segurar · ≠ mapa PT tônico</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">tríade · vomitar · commitar</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#d4b86a">faça o melhor sem fundir a raiz</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
