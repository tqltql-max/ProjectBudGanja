'use strict';

/** Capa 1200×630 — palavra aff (Palavras · inspeção severa). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/aff-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120e0c"/>
      <stop offset="55%" stop-color="#1a1410"/>
      <stop offset="100%" stop-color="#0a0c0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(196,112,72,0.28)"/>
      <stop offset="100%" stop-color="rgba(196,112,72,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="250" r="230" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · INSPEÇÃO SEVERA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="140" font-weight="700" fill="#f4efe6">aff</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(214,140,96,0.95)" letter-spacing="3">exasperação · termómetro · não é veredicto</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#c8b8a0">aceita o sopro · recusa o fecho sem método</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#dfc262">raiva · verdade · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
