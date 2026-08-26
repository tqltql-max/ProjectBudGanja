'use strict';

/** Capa 1200×630 — Horizonte Geográfico (Artes). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/horizonte-geografico-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12181c"/>
      <stop offset="55%" stop-color="#1a2420"/>
      <stop offset="100%" stop-color="#0c1410"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="42%" r="28%">
      <stop offset="0%" stop-color="rgba(220,150,50,0.45)"/>
      <stop offset="100%" stop-color="rgba(12,16,14,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <ellipse cx="600" cy="280" rx="340" ry="120" fill="url(#sun)"/>
  <line x1="80" y1="310" x2="1120" y2="310" stroke="rgba(216,176,112,0.85)" stroke-width="3"/>
  <circle cx="600" cy="268" r="18" fill="rgba(230,170,70,0.95)"/>
  <path d="M260 430 C280 360, 310 340, 330 430" fill="none" stroke="rgba(90,140,80,0.9)" stroke-width="8" stroke-linecap="round"/>
  <path d="M840 430 C860 350, 900 330, 920 430" fill="none" stroke="rgba(70,120,70,0.9)" stroke-width="8" stroke-linecap="round"/>
  <path d="M300 430 L300 310" stroke="rgba(120,90,50,0.7)" stroke-width="5"/>
  <path d="M890 430 L890 305" stroke="rgba(120,90,50,0.7)" stroke-width="5"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.2">ARTES · REVISTA · AMYR NO CONSELHO · ≠ NG ≠ MANCUSO</text>
  <text x="600" y="175" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f4eee4">Horizonte Geográfico</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">revolução das plantas · guerra entre plantas</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">Orizonte come o H · o mapa encontra o ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
