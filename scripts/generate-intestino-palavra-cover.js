'use strict';

/** Capa 1200×630 — intestino (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/intestino-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14100c"/>
      <stop offset="48%" stop-color="#1c1610"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(210,140,70,0.22)"/>
      <stop offset="100%" stop-color="rgba(210,140,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <!-- inner coil: the tube of within, not anatomy -->
  <path d="M430 250 C430 180, 770 180, 770 250 C770 310, 500 300, 500 360 C500 410, 720 400, 700 455"
        fill="none" stroke="rgba(232,176,110,0.78)" stroke-width="14" stroke-linecap="round"/>
  <path d="M448 250 C448 196, 752 196, 752 250 C752 296, 518 288, 518 360 C518 398, 702 392, 686 448"
        fill="none" stroke="rgba(120,160,140,0.35)" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b896" letter-spacing="3">PALAVRAS · LAT. INTUS · O TUBO DE DENTRO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4ebe0">intestino</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,200,170,0.95)">órgão · interno · ≠ barriga</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4a070">o de dentro que processa</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d4b896">barriga · eCBome · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
