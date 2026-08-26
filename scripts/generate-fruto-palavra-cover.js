'use strict';

/** Capa 1200×630 — fruto (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/fruto-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1208"/>
      <stop offset="40%" stop-color="#2a1e10"/>
      <stop offset="100%" stop-color="#0e1810"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="52%" r="48%">
      <stop offset="0%" stop-color="rgba(210,140,60,0.38)"/>
      <stop offset="50%" stop-color="rgba(80,140,70,0.16)"/>
      <stop offset="100%" stop-color="rgba(30,50,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="340" rx="300" ry="200" fill="url(#glow)"/>
  <ellipse cx="560" cy="310" rx="70" ry="88" fill="rgba(200,110,40,0.55)" stroke="rgba(240,190,120,0.5)" stroke-width="2"/>
  <ellipse cx="640" cy="300" rx="48" ry="62" fill="rgba(180,70,50,0.5)" stroke="rgba(230,150,120,0.45)" stroke-width="2"/>
  <ellipse cx="700" cy="330" rx="40" ry="52" fill="rgba(90,140,60,0.45)" stroke="rgba(160,200,140,0.4)" stroke-width="2"/>
  <path d="M560 222 C575 200 590 195 600 210" fill="none" stroke="rgba(120,170,90,0.7)" stroke-width="3"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a878" letter-spacing="4">PALAVRAS · FRUCTUS · COLHEITA</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f5ead8">fruto</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,210,180,0.95)">frutos · botânica · frutos do trabalho</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c9a0">faça o melhor com o tempo do fruto</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4a878">planta · simbiose · colheita</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
