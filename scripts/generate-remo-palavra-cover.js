'use strict';

/** Capa 1200×630 — Palavras · remo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/remo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1820"/>
      <stop offset="55%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#c4a35a"/>
  <line x1="180" y1="210" x2="520" y2="470" stroke="#8eb4c8" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="168" cy="198" rx="42" ry="18" fill="none" stroke="#c4a35a" stroke-width="5" transform="rotate(-28 168 198)"/>
  <text x="600" y="130" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c4a35a" letter-spacing="5">PALAVRAS · RĒMUS ≠ REM</text>
  <text x="720" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe6">remo</text>
  <text x="720" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8c0">rEMO → a pá</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#8eb4c8">remar ≠ dormir · barco · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
