'use strict';

/** Capa 1200×630 — Disney Jr. Brasil (Canais · desenhos). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/disneyjr-canal-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a0a40"/>
      <stop offset="45%" stop-color="#0e3a68"/>
      <stop offset="100%" stop-color="#0a5848"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="40%">
      <stop offset="0%" stop-color="rgba(255,210,90,0.4)"/>
      <stop offset="100%" stop-color="rgba(20,20,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="180" rx="200" ry="140" fill="url(#glow)"/>
  <circle cx="280" cy="420" r="90" fill="rgba(80,200,230,0.2)"/>
  <circle cx="340" cy="380" r="50" fill="rgba(120,220,180,0.18)"/>
  <path d="M80 520 C280 460, 480 560, 680 500 C880 440, 1080 540, 1200 500" fill="none" stroke="rgba(160,230,255,0.35)" stroke-width="5"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8d8ff" letter-spacing="4">CANAIS · DESENHOS · DISNEY JR.</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4f8ff">Disney Jr. Brasil</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,245,255,0.92)">@disneyjrbr · Aqui no mar · Moana</text>
  <text x="600" y="550" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#9ad4c8">desenhos · oceano · literacia lúdica</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
