'use strict';

/** Capa 1200×630 — Todo Poderoso Bagual (Canais · GTA RP). CRT de canal, não terra de pessoa. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/bagual-canal-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1008"/>
      <stop offset="55%" stop-color="#12180c"/>
      <stop offset="100%" stop-color="#1a1408"/>
    </linearGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(200,170,80,0.08)"/>
      <stop offset="100%" stop-color="rgba(200,170,80,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#scan)"/>
  <g opacity="0.2" fill="none" stroke="#c8aa50" stroke-width="2">
    <circle cx="980" cy="280" r="70"/>
    <circle cx="980" cy="280" r="42"/>
    <path d="M980 210 L980 350 M910 280 L1050 280"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e6c86a" letter-spacing="5">CANAIS · GTA RP</text>
  <text x="80" y="240" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f3e7c0">TODO PODEROSO</text>
  <text x="80" y="330" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#ffe9a0">BAGUAL</text>
  <text x="80" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(230,220,180,0.92)">personagem BOPE · arquivo de servidor</text>
  <text x="80" y="500" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#e6c86a">bope · capital city · bagual clips · gta rp</text>
  <text x="80" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8aa50">@poderosobagual · Kick · personagem ≠ pessoa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
