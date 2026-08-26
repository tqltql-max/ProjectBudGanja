'use strict';

/** Capa 1200×630 — palavra risco (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/risco-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e141c"/>
      <stop offset="40%" stop-color="#1a2430"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="38%" r="34%">
      <stop offset="0%" stop-color="rgba(232,168,72,0.32)"/>
      <stop offset="100%" stop-color="rgba(232,168,72,0)"/>
    </radialGradient>
    <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(160,200,230,0.18)"/>
      <stop offset="100%" stop-color="rgba(160,200,230,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="920" cy="220" r="210" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="220" fill="url(#ice)"/>
  <!-- horizon / ice line -->
  <path d="M0 310 L280 295 L520 318 L780 288 L1200 305" fill="none" stroke="rgba(180,210,235,0.35)" stroke-width="3"/>
  <!-- calculated path / dashed risk line -->
  <path d="M160 480 Q340 360 520 440 T880 400" fill="none" stroke="rgba(232,168,72,0.55)" stroke-width="4" stroke-dasharray="14 10" stroke-linecap="round"/>
  <!-- pencil stroke (risco gráfico) -->
  <path d="M200 200 L380 165" fill="none" stroke="rgba(230,236,245,0.55)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="200" cy="200" r="5" fill="rgba(232,168,72,0.9)"/>
  <!-- small boat silhouette -->
  <path d="M760 420 L820 420 L840 445 L740 445 Z" fill="rgba(120,150,175,0.45)"/>
  <path d="M790 390 L790 420" stroke="rgba(200,220,235,0.5)" stroke-width="3"/>
  <text x="600" y="140" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c9d8e8" letter-spacing="8">PALAVRAS · RISCHIO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f7fbff">risco</text>
  <text x="600" y="375" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">perigo calculado · traço · método</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
