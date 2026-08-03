'use strict';

/** Capa 1200×630 — deu certo, galera (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/deu-certo-galera-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1a12"/>
      <stop offset="45%" stop-color="#1a2e1c"/>
      <stop offset="100%" stop-color="#0a120c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="50%">
      <stop offset="0%" stop-color="rgba(160,220,140,0.24)"/>
      <stop offset="100%" stop-color="rgba(160,220,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="270" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8d4a0" letter-spacing="4">EXPRESSÕES · CELEBRAÇÃO COLECTIVA</text>
  <text x="600" y="260" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f2fff0">deu certo, galera</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,235,200,0.95)">deucer galerra — acerto partilhado</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0b0">depois da festa — faça o melhor</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8d4a0">aff · buguei · deu certo, galera · genial</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
