'use strict';

/** Capa 1200×630 — incrível (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/incrivel-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="45%" stop-color="#141a28"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="55%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(120,180,220,0.28)"/>
      <stop offset="50%" stop-color="rgba(200,160,90,0.14)"/>
      <stop offset="100%" stop-color="rgba(40,50,70,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(160,200,230,0)"/>
      <stop offset="50%" stop-color="rgba(160,200,230,0.5)"/>
      <stop offset="100%" stop-color="rgba(160,200,230,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="640" cy="260" rx="300" ry="200" fill="url(#glow)"/>
  <rect x="360" y="310" width="480" height="2" fill="url(#bar)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec4e0" letter-spacing="3">PALAVRAS · INCREDIBILIS · DOIS EIXOS</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f0f4fa">incrível</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,220,235,0.95)">inacreditável · elogio BR · escala</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c8d8">faça o melhor sem esvaziar o uau</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#9ec4e0">legal · genial · fantástico</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
