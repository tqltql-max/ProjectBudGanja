'use strict';

/** Capa 1200×630 — Palavras · cabra × abra (capra ≠ aperīre). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cabra-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="48%" stop-color="#241810"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(196,150,80,0.28)"/>
      <stop offset="100%" stop-color="rgba(16,20,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="420" cy="240" rx="280" ry="160" fill="url(#glow)"/>
  <path d="M330 220 Q380 118 430 220" fill="none" stroke="rgba(232,200,140,0.7)" stroke-width="4"/>
  <path d="M510 220 Q460 118 410 220" fill="none" stroke="rgba(232,200,140,0.7)" stroke-width="4"/>
  <rect x="760" y="168" width="72" height="118" rx="6" fill="none" stroke="rgba(160,196,188,0.82)" stroke-width="3"/>
  <path d="M796 168 L796 286" fill="none" stroke="rgba(160,196,188,0.45)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="3">PALAVRAS · CAPRA ≠ APERĪRE · C+ABRA</text>
  <text x="600" y="390" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe6">cabra × abra</text>
  <text x="600" y="458" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0c8b8">letras dentro · étimos fora</text>
  <text x="600" y="546" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9aa8a0">bode · ≠ abracadabra · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
