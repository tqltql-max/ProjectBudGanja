'use strict';

/** Capa 1200×630 — daninha (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/daninha-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0e1410"/>
      <stop offset="50%" stop-color="#1a2818"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="40%" cy="55%" r="50%">
      <stop offset="0%" stop-color="rgba(140,180,80,0.28)"/>
      <stop offset="55%" stop-color="rgba(80,120,50,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,40,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="480" cy="340" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M200 480 Q280 200 360 420 Q420 280 500 450 Q560 320 640 470" fill="none" stroke="rgba(160,200,100,0.45)" stroke-width="3"/>
  <circle cx="320" cy="300" r="8" fill="rgba(180,220,120,0.7)"/>
  <circle cx="480" cy="360" r="6" fill="rgba(160,200,100,0.6)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c878" letter-spacing="4">PALAVRAS · JUÍZO · CULTIVO</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0ffe0">daninha</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,240,190,0.95)">dano + -inha · planta · conflito de lugar</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d090">faça o melhor com o juízo certo</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8c878">planta · cultivo · selvagem · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
