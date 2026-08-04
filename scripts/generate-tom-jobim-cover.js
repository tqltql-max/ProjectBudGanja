'use strict';

/** Capa 1200×630 — Tom Jobim (Pessoas · dedicatória origami). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tom-jobim-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#0c1824"/>
      <stop offset="45%" stop-color="#1a3a4a"/>
      <stop offset="100%" stop-color="#0a1018"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(80,160,180,0.35)"/>
      <stop offset="100%" stop-color="rgba(20,60,80,0.2)"/>
    </linearGradient>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(245,240,230,0.95)"/>
      <stop offset="100%" stop-color="rgba(210,200,180,0.8)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M0 420 Q200 380 400 420 T800 410 T1200 430 L1200 630 L0 630 Z" fill="url(#sea)"/>
  <path d="M720 200 L860 160 L920 280 L780 320 Z" fill="url(#paper)" stroke="rgba(180,170,150,0.5)" stroke-width="1.5"/>
  <path d="M780 320 L860 160 L900 200 L820 340 Z" fill="rgba(230,220,200,0.7)" stroke="rgba(160,150,130,0.4)" stroke-width="1"/>
  <path d="M820 340 L900 200 L940 240 L860 380 Z" fill="rgba(200,190,170,0.55)"/>
  <circle cx="320" cy="280" r="8" fill="rgba(255,220,120,0.5)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8ec4d4" letter-spacing="5">PESSOAS · BOSSA · DEDICATÓRIA</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f0f6f8">Tom Jobim</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#b8d0d8">Adoro origami · dobrar com cuidado · Águas de Março</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
