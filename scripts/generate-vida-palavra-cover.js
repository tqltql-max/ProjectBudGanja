'use strict';

/** Capa 1200×630 — vida (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vida-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1410"/>
      <stop offset="45%" stop-color="#122818"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="58%" r="50%">
      <stop offset="0%" stop-color="rgba(90,180,110,0.38)"/>
      <stop offset="55%" stop-color="rgba(40,120,80,0.16)"/>
      <stop offset="100%" stop-color="rgba(20,60,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="350" rx="320" ry="230" fill="url(#glow)"/>
  <circle cx="600" cy="300" r="56" fill="none" stroke="rgba(180,230,190,0.45)" stroke-width="2.5"/>
  <path d="M600 356 L600 420" fill="none" stroke="rgba(180,230,190,0.4)" stroke-width="2.5"/>
  <path d="M600 380 Q560 360 540 390" fill="none" stroke="rgba(160,210,170,0.35)" stroke-width="2"/>
  <path d="M600 380 Q640 360 660 390" fill="none" stroke="rgba(160,210,170,0.35)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8ecf9a" letter-spacing="4">PALAVRAS · VĪTA · ARCO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#e8f8ec">vida</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,235,215,0.95)">facto · tempo · modo · animação</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#9ed4a8">faça o melhor com vida</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ecf9a">alegria · coração · esperança · caminho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
