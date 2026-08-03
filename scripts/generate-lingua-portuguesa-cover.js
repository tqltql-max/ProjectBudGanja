'use strict';

/** Capa 1200×630 — língua portuguesa (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lingua-portuguesa-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="50%" stop-color="#141a22"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#009c3b"/>
      <stop offset="50%" stop-color="#ffdf00"/>
      <stop offset="100%" stop-color="#002776"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="42%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.22)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#stripe)"/>
  <circle cx="600" cy="240" r="240" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="4">PALAVRAS · ORIGINALIDADE · TEMPO</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#fff8e0">língua portuguesa</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,210,220,0.95)">latim · travessia · BR · digital</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="26" fill="#c8b8a0">faça o melhor nesta língua</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#dfc262">mudança ≠ decadência · caminho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
