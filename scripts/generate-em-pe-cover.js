'use strict';

/** Capa 1200×630 — em pé (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/em-pe-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1412"/>
      <stop offset="55%" stop-color="#102018"/>
      <stop offset="100%" stop-color="#0c1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(80,190,150,0.32)"/>
      <stop offset="100%" stop-color="rgba(10,16,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="270" rx="260" ry="210" fill="url(#glow)"/>
  <path d="M 600 90 C 490 90 490 230 600 315 C 710 400 710 540 600 540 C 490 540 490 400 600 315 C 710 230 710 90 600 90" fill="none" stroke="rgba(150,230,190,0.95)" stroke-width="12" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#90c8b8" letter-spacing="4">EXPRESSÕES · POSTURA · CORPO</text>
  <text x="600" y="585" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f4f0e4">em pé</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
