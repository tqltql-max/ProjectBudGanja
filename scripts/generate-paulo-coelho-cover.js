'use strict';

/** Capa 1200×630 — Pessoas · Paulo Coelho. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/paulo-coelho-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140c"/>
      <stop offset="48%" stop-color="#3a2814"/>
      <stop offset="100%" stop-color="#0f0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="46%" cy="38%" r="40%">
      <stop offset="0%" stop-color="rgba(220,170,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(220,170,70,0)"/>
    </radialGradient>
    <linearGradient id="ink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(240,210,150,0.92)"/>
      <stop offset="100%" stop-color="rgba(150,100,40,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="540" cy="250" r="220" fill="url(#glow)"/>
  <!-- fountain pen -->
  <path d="M390 430 L610 175 L632 198 L430 458 Z" fill="url(#ink)" opacity="0.88"/>
  <path d="M610 175 L648 148 L666 170 L632 198 Z" fill="rgba(245,225,180,0.8)"/>
  <line x1="400" y1="445" x2="720" y2="500" stroke="rgba(230,190,120,0.32)" stroke-width="2"/>
  <!-- compass ring -->
  <circle cx="860" cy="300" r="78" fill="none" stroke="rgba(240,210,150,0.45)" stroke-width="3"/>
  <circle cx="860" cy="300" r="8" fill="rgba(240,210,150,0.7)"/>
  <line x1="860" y1="230" x2="860" y2="370" stroke="rgba(240,210,150,0.4)" stroke-width="2"/>
  <line x1="790" y1="300" x2="930" y2="300" stroke="rgba(240,210,150,0.4)" stroke-width="2"/>
  <polygon points="860,242 872,300 860,288 848,300" fill="rgba(210,80,50,0.75)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e0c080" letter-spacing="7">PESSOAS · OFÍCIO</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f6efe4">Paulo Coelho</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d4c4a4">n. 1947 · O Alquimista</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
