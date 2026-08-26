'use strict';

/** Capa 1200×630 — interruptor (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/interruptor-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e14"/>
      <stop offset="45%" stop-color="#1a2030"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
    <radialGradient id="glow" cx="62%" cy="42%" r="45%">
      <stop offset="0%" stop-color="rgba(255,220,100,0.4)"/>
      <stop offset="50%" stop-color="rgba(200,150,40,0.14)"/>
      <stop offset="100%" stop-color="rgba(40,30,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="760" cy="260" rx="260" ry="180" fill="url(#glow)"/>
  <rect x="520" y="200" width="160" height="240" rx="18" fill="rgba(40,48,60,0.95)" stroke="rgba(200,210,220,0.35)" stroke-width="3"/>
  <rect x="555" y="250" width="90" height="70" rx="10" fill="rgba(240,220,120,0.85)"/>
  <rect x="555" y="330" width="90" height="70" rx="10" fill="rgba(30,36,48,0.9)" stroke="rgba(160,170,180,0.4)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e0c878" letter-spacing="4">PALAVRAS · LIGAR · CORTAR</text>
  <text x="600" y="170" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#fff8e0">interruptor</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.95)">interrumpere · interrupção · clique</text>
  <text x="600" y="555" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0b870">faça o melhor com a mão no clique</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
