'use strict';

/** Capa 1200×630 — palavra Árvore da Vida (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/arvore-da-vida-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101810"/>
      <stop offset="50%" stop-color="#1a2418"/>
      <stop offset="100%" stop-color="#0c140e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="rgba(124,179,66,0.28)"/>
      <stop offset="55%" stop-color="rgba(223,194,98,0.12)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="250" r="260" fill="url(#glow)"/>
  <!-- trunk -->
  <path d="M590 420 L610 420 L620 520 L580 520 Z" fill="rgba(120,90,50,0.85)"/>
  <!-- canopy -->
  <ellipse cx="600" cy="300" rx="160" ry="110" fill="rgba(124,179,66,0.55)"/>
  <ellipse cx="540" cy="320" rx="90" ry="70" fill="rgba(90,140,50,0.5)"/>
  <ellipse cx="660" cy="320" rx="90" ry="70" fill="rgba(90,140,50,0.5)"/>
  <ellipse cx="600" cy="250" rx="100" ry="80" fill="rgba(150,200,80,0.45)"/>
  <!-- small seed / seedling marks at base -->
  <circle cx="520" cy="530" r="6" fill="rgba(223,194,98,0.7)"/>
  <path d="M680 535 C678 520 670 510 665 500" fill="none" stroke="rgba(124,179,66,0.85)" stroke-width="3" stroke-linecap="round"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · SEMENTE → MUDINHA → ÁRVORE</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4efe6">Árvore da Vida</text>
  <text x="600" y="550" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">arbor · sombra · ofício · ficar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
