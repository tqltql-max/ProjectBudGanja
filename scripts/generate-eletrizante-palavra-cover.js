'use strict';

/** Capa 1200×630 — palavra eletrizante (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/eletrizante-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1018"/>
      <stop offset="45%" stop-color="#102030"/>
      <stop offset="100%" stop-color="#080c12"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="42%">
      <stop offset="0%" stop-color="rgba(120,200,255,0.38)"/>
      <stop offset="40%" stop-color="rgba(255,220,120,0.16)"/>
      <stop offset="100%" stop-color="rgba(120,200,255,0)"/>
    </radialGradient>
    <linearGradient id="bolt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe9a0"/>
      <stop offset="55%" stop-color="#7ec8ff"/>
      <stop offset="100%" stop-color="#4aa0e8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <path d="M620 120 L540 290 L610 290 L560 480 L720 250 L640 250 Z" fill="url(#bolt)" opacity="0.88"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#7ec8ff" letter-spacing="5">PALAVRAS · CARGA × HYPE BR</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f4fbff">eletrizante</text>
  <text x="600" y="410" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(190,220,240,0.95)" letter-spacing="2">eletro- · show que carrega · electrifying</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4b8a0">eleltrioxsamndo → eletrizante · faça o melhor</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#7ec8ff">fogo · genial · incrível · fabuloso</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
