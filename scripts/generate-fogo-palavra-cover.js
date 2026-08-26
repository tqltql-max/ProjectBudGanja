'use strict';

/** Capa 1200×630 — fogo (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/fogo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a0c08"/>
      <stop offset="45%" stop-color="#2a140c"/>
      <stop offset="100%" stop-color="#0e0806"/>
    </linearGradient>
    <radialGradient id="flame" cx="50%" cy="70%" r="50%">
      <stop offset="0%" stop-color="rgba(255,140,40,0.45)"/>
      <stop offset="45%" stop-color="rgba(220,80,20,0.22)"/>
      <stop offset="100%" stop-color="rgba(180,40,10,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="420" rx="280" ry="200" fill="url(#flame)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f0a050" letter-spacing="4">PALAVRAS · FOCUS · MEDIDA</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#ffe8c8">fogo</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,200,160,0.95)">elemento · ardor · cuidado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d8a070">faça o melhor com medida</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#f0a050">água · raiva · cultivo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
