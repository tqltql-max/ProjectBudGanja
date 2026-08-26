'use strict';

/** Capa 1200×630 — meneia (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/meneia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141018"/>
      <stop offset="45%" stop-color="#1c1624"/>
      <stop offset="100%" stop-color="#10141c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="rgba(210,160,120,0.28)"/>
      <stop offset="55%" stop-color="rgba(160,120,100,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="340" rx="340" ry="210" fill="url(#glow)"/>
  <path d="M420 380 C480 280, 540 420, 600 320 C660 220, 720 400, 780 300"
        fill="none" stroke="rgba(230,190,150,0.55)" stroke-width="4" stroke-linecap="round"/>
  <path d="M440 400 C500 310, 560 430, 620 340 C680 250, 740 410, 800 320"
        fill="none" stroke="rgba(200,160,130,0.28)" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="600" cy="320" r="7" fill="rgba(240,210,170,0.85)"/>
  <circle cx="480" cy="360" r="4" fill="rgba(220,180,140,0.55)"/>
  <circle cx="720" cy="300" r="4" fill="rgba(220,180,140,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d8b898" letter-spacing="4">PALAVRAS · MENEAR · MÃO · BALANÇO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ebe2">Meneia</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,220,200,0.9)">corpo · ritmo · manear ← mão</text>
  <text x="600" y="546" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8a888">gesto com balanço</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#988878">gesto · mãos · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
