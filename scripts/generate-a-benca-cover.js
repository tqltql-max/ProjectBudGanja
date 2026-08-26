'use strict';

/** Capa 1200×630 — a bença (Expressões · pedir · noite · amém). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/a-benca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="45%" stop-color="#1a222c"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(210,190,130,0.28)"/>
      <stop offset="100%" stop-color="rgba(210,190,130,0)"/>
    </radialGradient>
    <radialGradient id="moon" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#f4ead0"/>
      <stop offset="70%" stop-color="#d2be8c"/>
      <stop offset="100%" stop-color="#a89060"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <circle cx="980" cy="120" r="48" fill="url(#moon)"/>
  <circle cx="962" cy="108" r="38" fill="#101418"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d2be8c" letter-spacing="4">EXPRESSÕES · PEDIR BÊNÇÃO · NOITE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f5f0e4">a bença</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,200,0.95)">Deus te abençoe · dorme com Deus · amém</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a878">pedir — receber — deitar — selar</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d2be8c">amem → amém · irmã de Deus abençoe · sem catecismo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
