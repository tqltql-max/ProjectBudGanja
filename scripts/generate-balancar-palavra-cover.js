'use strict';

/** Capa 1200×630 — Palavras · balançar × balança × peso. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/balancar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141210"/>
      <stop offset="55%" stop-color="#1c1814"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#c4a35a"/>
  <line x1="600" y1="168" x2="600" y2="248" stroke="#c4a35a" stroke-width="5" stroke-linecap="round"/>
  <line x1="430" y1="248" x2="770" y2="248" stroke="#e8d8b0" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="430" cy="300" rx="48" ry="14" fill="none" stroke="#c4a35a" stroke-width="4"/>
  <ellipse cx="770" cy="300" rx="48" ry="14" fill="none" stroke="#c4a35a" stroke-width="4"/>
  <circle cx="430" cy="300" r="10" fill="#d8c090"/>
  <text x="600" y="118" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="700" fill="#c4a35a" letter-spacing="4">PALAVRAS · BILANX × PENDERE</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">balançar</text>
  <text x="600" y="458" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8c0">balança · peso</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4a35a">gesto ≠ instrumento ≠ kg · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
