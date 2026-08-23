'use strict';

/** Capa 1200×630 — Artes · Girassol (Cidade Negra). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/girassol-cidade-negra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="42%" stop-color="#3d2a0c"/>
      <stop offset="78%" stop-color="#c9a227"/>
      <stop offset="100%" stop-color="#f4e08a"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="38%" r="28%">
      <stop offset="0%" stop-color="#f6e27a"/>
      <stop offset="55%" stop-color="#e8b84a"/>
      <stop offset="100%" stop-color="rgba(200,140,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="118" fill="url(#sun)"/>
  <circle cx="600" cy="240" r="48" fill="#5c3a12"/>
  <g fill="#e8c040" opacity="0.92">
    <ellipse cx="600" cy="118" rx="18" ry="52"/>
    <ellipse cx="600" cy="362" rx="18" ry="52"/>
    <ellipse cx="478" cy="240" rx="52" ry="18"/>
    <ellipse cx="722" cy="240" rx="52" ry="18"/>
    <ellipse cx="512" cy="152" rx="22" ry="48" transform="rotate(-40 512 152)"/>
    <ellipse cx="688" cy="152" rx="22" ry="48" transform="rotate(40 688 152)"/>
    <ellipse cx="512" cy="328" rx="22" ry="48" transform="rotate(40 512 328)"/>
    <ellipse cx="688" cy="328" rx="22" ry="48" transform="rotate(-40 688 328)"/>
  </g>
  <path d="M600 288 L600 520" fill="none" stroke="#2a4a20" stroke-width="10"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f6e27a" letter-spacing="4">ARTES · CANÇÃO 2002 · LETRA</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4f8e8">Girassol</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#f0e4c8">Cidade Negra · girasol amamareco</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(244,240,210,0.85)">virar para o sol</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
