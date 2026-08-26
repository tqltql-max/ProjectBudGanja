'use strict';

/** Capa 1200×630 — Artes · The Middle (Jimmy Eat World). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/the-middle-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a0e18"/>
      <stop offset="40%" stop-color="#7a2e2a"/>
      <stop offset="78%" stop-color="#e08a3c"/>
      <stop offset="100%" stop-color="#f4d078"/>
    </linearGradient>
    <radialGradient id="sun" cx="78%" cy="22%" r="34%">
      <stop offset="0%" stop-color="rgba(255,220,120,0.7)"/>
      <stop offset="100%" stop-color="rgba(255,220,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="940" cy="140" r="210" fill="url(#sun)"/>
  <path d="M0 430 L420 310 L780 360 L1200 240 L1200 630 L0 630 Z" fill="rgba(12,10,16,0.28)"/>
  <path d="M0 470 L600 390 L1200 310" fill="none" stroke="rgba(255,244,220,0.55)" stroke-width="8"/>
  <path d="M0 490 L600 410 L1200 330" fill="none" stroke="rgba(255,244,220,0.2)" stroke-width="3" stroke-dasharray="14 18"/>
  <circle cx="600" cy="400" r="16" fill="#f4f8fc"/>
  <circle cx="600" cy="400" r="28" fill="none" stroke="rgba(244,248,252,0.55)" stroke-width="3"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f6e27a" letter-spacing="6">ARTES · CANÇÃO 2001</text>
  <text x="600" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4f8fc">The Middle</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#f0e4c8">Jimmy Eat World · Bleed American · não se apagar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
