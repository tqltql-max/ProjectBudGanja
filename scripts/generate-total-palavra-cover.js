'use strict';

/** Capa 1200×630 — palavra total (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/total-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1410"/>
      <stop offset="45%" stop-color="#122018"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(120,220,160,0.26)"/>
      <stop offset="50%" stop-color="rgba(80,160,120,0.12)"/>
      <stop offset="100%" stop-color="rgba(120,220,160,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(140,210,170,0)"/>
      <stop offset="50%" stop-color="rgba(140,210,170,0.55)"/>
      <stop offset="100%" stop-color="rgba(140,210,170,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <rect x="380" y="318" width="440" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#8ed4a8" letter-spacing="5">PALAVRAS · TŌTUS × ACORDO</text>
  <text x="600" y="295" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="86" font-weight="700" fill="#eef8f0">total</text>
  <text x="600" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(190,230,200,0.95)" letter-spacing="1">tōtus · completo · «total!» no BR</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8dcc4">inteiro · soma · fecho com verdade</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8ed4a8">legal · fantástico · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
