'use strict';

/** Capa 1200×630 — CD (objecto Compact Disc). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cd-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1016"/>
      <stop offset="48%" stop-color="#152028"/>
      <stop offset="100%" stop-color="#0c1418"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="42%">
      <stop offset="0%" stop-color="rgba(180,210,230,0.28)"/>
      <stop offset="55%" stop-color="rgba(90,160,190,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,16,22,0)"/>
    </radialGradient>
    <radialGradient id="disc" cx="38%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#e8eef2"/>
      <stop offset="35%" stop-color="#9ad4e8"/>
      <stop offset="55%" stop-color="#c9a0d4"/>
      <stop offset="75%" stop-color="#e8c547"/>
      <stop offset="100%" stop-color="#8aa0b0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="248" rx="340" ry="180" fill="url(#glow)"/>
  <circle cx="600" cy="236" r="148" fill="url(#disc)" stroke="rgba(220,230,236,0.65)" stroke-width="4"/>
  <circle cx="600" cy="236" r="118" fill="none" stroke="rgba(20,30,36,0.18)" stroke-width="2"/>
  <circle cx="600" cy="236" r="88" fill="none" stroke="rgba(20,30,36,0.16)" stroke-width="2"/>
  <circle cx="600" cy="236" r="58" fill="none" stroke="rgba(20,30,36,0.14)" stroke-width="2"/>
  <circle cx="600" cy="236" r="28" fill="#1a242c" stroke="rgba(232,213,163,0.55)" stroke-width="3"/>
  <circle cx="600" cy="236" r="10" fill="#0a1014"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ad4c8" letter-spacing="3.4">OBJECTO · COMPACT DISC · 120 MM</text>
  <text x="600" y="448" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ead0">CD</text>
  <text x="600" y="502" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">fosso · laser · cedê</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec4d4">≠ vinil · ≠ depósito · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
