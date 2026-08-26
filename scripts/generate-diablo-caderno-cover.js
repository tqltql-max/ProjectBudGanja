'use strict';

/** Capa 1200×630 — Caderno de jogo 3 · Diablo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/diablo-caderno-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120808"/>
      <stop offset="45%" stop-color="#1c0c0c"/>
      <stop offset="100%" stop-color="#080610"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="28%" r="40%">
      <stop offset="0%" stop-color="rgba(180,40,30,0.38)"/>
      <stop offset="100%" stop-color="rgba(180,40,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="880" cy="160" r="230" fill="url(#glow)"/>
  <rect x="80" y="70" width="9" height="490" fill="rgba(196,163,90,0.35)"/>
  <text x="120" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4a35a" letter-spacing="3">CADERNO DE JOGO · 3</text>
  <text x="120" y="250" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ebe0">Diablo</text>
  <text x="120" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,200,180,0.95)">a masmorra de 1997</text>
  <text x="120" y="430" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c07060">Tristram · Blizzard North · cópia legal</text>
  <text x="120" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4a35a">nome × monte × palavra diabo</text>
  <text x="120" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(196,163,90,0.8)">sem walkthrough · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
