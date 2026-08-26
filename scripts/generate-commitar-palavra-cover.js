'use strict';

/** Capa 1200×630 — commitar / comitar (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/commitar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1410"/>
      <stop offset="50%" stop-color="#101a14"/>
      <stop offset="100%" stop-color="#060a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="38%" r="44%">
      <stop offset="0%" stop-color="rgba(80,180,120,0.30)"/>
      <stop offset="100%" stop-color="rgba(80,180,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="230" rx="360" ry="190" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7dcea0" letter-spacing="3">PALAVRAS · GIT · GRAVAR O RASTO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#e8f8ee">commitar</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="26" fill="#b8dcc8">comitar  ≠  cometer</text>
  <text x="600" y="460" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,210,0.95)">snapshot · ≠ push · ≠ PR</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#98d0b0">depois de vomitar o ruído</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#7dcea0">faça o melhor depois do snapshot</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
