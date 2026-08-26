'use strict';

/** Capa 1200×630 — esperança (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/esperanca-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="45%" stop-color="#1a2830"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="58%" r="50%">
      <stop offset="0%" stop-color="rgba(240,190,90,0.38)"/>
      <stop offset="45%" stop-color="rgba(180,120,50,0.16)"/>
      <stop offset="100%" stop-color="rgba(60,40,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="360" rx="320" ry="210" fill="url(#glow)"/>
  <circle cx="600" cy="250" r="46" fill="none" stroke="rgba(255,210,120,0.55)" stroke-width="3"/>
  <path d="M600 296 L600 420" stroke="rgba(255,210,120,0.35)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c878" letter-spacing="4">PALAVRAS · FRESTAS · ÂNIMO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#fff4d8">esperança</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,180,0.95)">spēs · afecto vivo · espera com ofício</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d8b878">faça o melhor com a fresta</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e8c878">alegria · medo · caminho · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
