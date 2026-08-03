'use strict';

/** Capa 1200×630 — palavra fantástico (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/fantastico-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1018"/>
      <stop offset="50%" stop-color="#16122a"/>
      <stop offset="100%" stop-color="#0a0c12"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="45%">
      <stop offset="0%" stop-color="rgba(180,140,255,0.28)"/>
      <stop offset="55%" stop-color="rgba(100,180,220,0.12)"/>
      <stop offset="100%" stop-color="rgba(180,140,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="580" cy="230" r="260" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8a0e8" letter-spacing="5">PALAVRAS · FANTASIA × ELOGIO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4f0ff">fantástico</text>
  <text x="600" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,190,230,0.95)" letter-spacing="1">phantasticus · fantasia · «fantástico!» no BR</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8b8e0">imaginação · elogio com objecto · faça o melhor</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#b8a0e8">legal · genial · maravilhoso</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
