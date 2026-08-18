'use strict';

/** Capa 1200×630 — Zangado (Canais · Games). Marca no herói; CRT, não roxo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/zangado-canal-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07110c"/>
      <stop offset="55%" stop-color="#0c1c14"/>
      <stop offset="100%" stop-color="#121008"/>
    </linearGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(110,220,140,0.07)"/>
      <stop offset="100%" stop-color="rgba(110,220,140,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#scan)"/>
  <g opacity="0.22" fill="none" stroke="#6edc8c" stroke-width="2">
    <ellipse cx="930" cy="250" rx="92" ry="110"/>
    <path d="M860 250 Q930 390 1000 250"/>
    <rect x="888" y="210" width="36" height="18" rx="4"/>
    <rect x="936" y="210" width="36" height="18" rx="4"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7dff9a" letter-spacing="5">CANAIS · GAMES</text>
  <text x="80" y="280" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#e8ffe8">ZANGADO</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(200,240,210,0.92)">não tenho rosto, mas tenho voz</text>
  <text x="80" y="480" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ad4a8">sagas · vale ou não vale a pena · primeira meia hora</text>
  <text x="80" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#6edc8c">@zangadoreview · desde 2006 · crédito ao ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
