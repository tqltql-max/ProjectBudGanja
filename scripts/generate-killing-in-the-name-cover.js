'use strict';

/** Capa 1200×630 — Artes · Killing in the Name (RATM). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/killing-in-the-name-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0%" stop-color="#120808"/>
      <stop offset="50%" stop-color="#2a1010"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="slash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(200,40,40,0.55)"/>
      <stop offset="100%" stop-color="rgba(200,40,40,0.05)"/>
    </linearGradient>
    <radialGradient id="spark" cx="30%" cy="40%" r="35%">
      <stop offset="0%" stop-color="rgba(255,180,60,0.25)"/>
      <stop offset="100%" stop-color="rgba(255,180,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="360" cy="250" r="200" fill="url(#spark)"/>
  <path d="M0 0 L420 630 L520 630 L100 0 Z" fill="url(#slash)"/>
  <path d="M180 420 L280 200 L320 200 L420 420 Z" fill="none" stroke="rgba(240,220,180,0.35)" stroke-width="3"/>
  <rect x="720" y="180" width="320" height="28" fill="rgba(220,50,50,0.85)"/>
  <rect x="760" y="240" width="280" height="18" fill="rgba(180,40,40,0.55)"/>
  <rect x="800" y="290" width="240" height="14" fill="rgba(140,30,30,0.4)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e08070" letter-spacing="6">ARTES · CANÇÃO 1992</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#f4ece8">Killing in the Name</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b0a8">Rage Against the Machine · raiva nomeada · não tanque</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
