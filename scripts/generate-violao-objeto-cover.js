'use strict';

/** Capa 1200×630 — violão (objecto). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/violao-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a120c"/>
      <stop offset="48%" stop-color="#2a1c12"/>
      <stop offset="100%" stop-color="#0e0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="46%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(212,175,55,0.28)"/>
      <stop offset="100%" stop-color="rgba(212,175,55,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="560" cy="250" r="250" fill="url(#glow)"/>
  <ellipse cx="430" cy="330" rx="118" ry="148" fill="none" stroke="#c9a227" stroke-width="7"/>
  <ellipse cx="430" cy="330" rx="38" ry="38" fill="none" stroke="#e8c547" stroke-width="5"/>
  <rect x="520" y="302" width="280" height="22" rx="6" fill="#8a6a38"/>
  <rect x="790" y="292" width="28" height="42" rx="4" fill="#d4af37"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8c547" letter-spacing="3">OBJECTO · CATALOGO · CORDAS</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4ead0">violão</text>
  <text x="600" y="268" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,197,71,0.95)">viola + -ão · caixa · braço · boca</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#dfc262">as cordas afinam no objecto</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c9a227">≠ guitarra eléctrica · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
