'use strict';

/** Capa 1200×630 — Palavras · Parkinson (Parkin-son ≠ parque ≠ party). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/parkinson-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="50%" stop-color="#122a28"/>
      <stop offset="100%" stop-color="#1a1810"/>
    </linearGradient>
    <radialGradient id="wheel" cx="78%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(180,140,70,0.22)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0)"/>
    </radialGradient>
    <radialGradient id="name" cx="28%" cy="55%" r="46%">
      <stop offset="0%" stop-color="rgba(50,120,110,0.38)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="360" rx="360" ry="210" fill="url(#name)"/>
  <ellipse cx="920" cy="250" rx="280" ry="190" fill="url(#wheel)"/>
  <circle cx="940" cy="250" r="88" fill="none" stroke="rgba(200,170,110,0.28)" stroke-width="4"/>
  <circle cx="940" cy="250" r="48" fill="none" stroke="rgba(200,170,110,0.18)" stroke-width="2"/>
  <path d="M940 162 L940 338 M852 250 L1028 250 M878 188 L1002 312 M1002 188 L878 312" fill="none" stroke="rgba(200,170,110,0.22)" stroke-width="2"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4b070" letter-spacing="3">PALAVRAS · PARKIN + SON · ≠ PARQUE · ≠ PARTY</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4efe6">Parkinson</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,190,0.95)">filho de Parkin — Parkin é Pedro, não o recinto</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">a orelha lê PARK · o étimo corta</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a09070">epónimo facto · não brinquedo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
