'use strict';

/** Capa 1200×630 — ilegal (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ilegal-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120a0c"/>
      <stop offset="48%" stop-color="#1a1218"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="58%" cy="48%" r="48%">
      <stop offset="0%" stop-color="rgba(160,70,70,0.32)"/>
      <stop offset="55%" stop-color="rgba(100,80,50,0.14)"/>
      <stop offset="100%" stop-color="rgba(40,40,40,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(200,140,90,0)"/>
      <stop offset="50%" stop-color="rgba(200,140,90,0.5)"/>
      <stop offset="100%" stop-color="rgba(200,140,90,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="680" cy="300" rx="320" ry="220" fill="url(#glow)"/>
  <rect x="340" y="300" width="520" height="2" fill="url(#bar)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c88858" letter-spacing="4">PALAVRAS · LEX · ANTÓNIMO</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f2ead8">ilegal</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,200,170,0.95)">in- + legal · fora da lei · clareza</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b89070">faça o melhor com a palavra certa</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c88858">legal · ilícito · lei 11.343</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
