'use strict';

/** Capa 1200×630 — Artes · Back Door Man (The Doors). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/back-door-man-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0610"/>
      <stop offset="42%" stop-color="#1a0c18"/>
      <stop offset="100%" stop-color="#2a1408"/>
    </linearGradient>
    <radialGradient id="glow" cx="28%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(220,160,70,0.32)"/>
      <stop offset="100%" stop-color="rgba(220,160,70,0)"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(200,140,50,0.5)"/>
      <stop offset="100%" stop-color="rgba(200,140,50,0.05)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="340" cy="300" r="230" fill="url(#glow)"/>
  <rect x="210" y="90" width="260" height="460" rx="8" fill="#12080e" stroke="rgba(220,180,90,0.55)" stroke-width="4"/>
  <rect x="230" y="112" width="220" height="200" fill="rgba(40,16,20,0.9)" stroke="rgba(180,120,50,0.35)" stroke-width="2"/>
  <rect x="230" y="328" width="220" height="200" fill="rgba(24,10,16,0.95)" stroke="rgba(180,120,50,0.25)" stroke-width="2"/>
  <circle cx="428" cy="328" r="14" fill="none" stroke="rgba(230,190,90,0.75)" stroke-width="3"/>
  <circle cx="428" cy="328" r="5" fill="rgba(230,190,90,0.85)"/>
  <ellipse cx="340" cy="250" rx="42" ry="70" fill="rgba(8,4,8,0.85)"/>
  <path d="M0 630 L420 0 L510 0 L90 630 Z" fill="url(#gold)"/>
  <rect x="720" y="168" width="300" height="26" fill="rgba(200,140,50,0.8)"/>
  <rect x="760" y="226" width="260" height="16" fill="rgba(160,90,40,0.5)"/>
  <rect x="800" y="274" width="220" height="12" fill="rgba(120,60,30,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e0c070" letter-spacing="6">ARTES · BLUES 1960 · DOORS 1967</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f4e8c8">Back Door Man</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d0b080">The Doors · Jim Morrison · porta de trás</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
