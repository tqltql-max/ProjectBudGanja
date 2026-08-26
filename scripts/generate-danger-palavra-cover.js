'use strict';

/** Capa 1200×630 — Danger × perigo (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/danger-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120a08"/>
      <stop offset="45%" stop-color="#1c100c"/>
      <stop offset="100%" stop-color="#0e0c10"/>
    </linearGradient>
    <pattern id="stripes" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="14" height="28" fill="#1a120c"/>
      <rect x="14" width="14" height="28" fill="#c9a227"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="36" height="630" fill="url(#stripes)"/>
  <rect x="1164" y="0" width="36" height="630" fill="url(#stripes)"/>
  <!-- EN plate -->
  <rect x="88" y="168" width="430" height="268" rx="10" fill="#8b1510"/>
  <rect x="104" y="184" width="398" height="52" rx="4" fill="#6e0f0c"/>
  <text x="303" y="222" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#f4e8d8" letter-spacing="8">DANGER</text>
  <text x="303" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f7efe4">dominus</text>
  <text x="303" y="356" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(244,232,216,0.85)">o poder do senhor</text>
  <!-- PT plate -->
  <rect x="682" y="168" width="430" height="268" rx="10" fill="#c9a227"/>
  <rect x="698" y="184" width="398" height="52" rx="4" fill="#2a220c"/>
  <text x="897" y="222" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#f4e8d8" letter-spacing="8">PERIGO</text>
  <text x="897" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#1a1408">periculum</text>
  <text x="897" y="356" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#2a220c">a prova que se atravessa</text>
  <!-- relation X -->
  <line x1="548" y1="270" x2="652" y2="334" stroke="rgba(244,232,216,0.55)" stroke-width="4" stroke-linecap="round"/>
  <line x1="548" y1="334" x2="652" y2="270" stroke="rgba(244,232,216,0.55)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="600" cy="302" r="22" fill="#120a08" stroke="rgba(244,232,216,0.7)" stroke-width="2"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c9a227" letter-spacing="5">PALAVRAS · RELAÇÃO SEM FUNDIR</text>
  <text x="600" y="508" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4ebe0">Danger × perigo</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(230,214,196,0.92)">equivalentes de placa · avôs distintos · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
