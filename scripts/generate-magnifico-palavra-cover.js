'use strict';

/** Capa 1200×630 — palavra magnífico (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/magnifico-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#1a2228"/>
      <stop offset="100%" stop-color="#0b0e12"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="46%">
      <stop offset="0%" stop-color="rgba(212,175,95,0.36)"/>
      <stop offset="55%" stop-color="rgba(140,150,120,0.12)"/>
      <stop offset="100%" stop-color="rgba(212,175,95,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="220" r="270" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4af5f" letter-spacing="5">PALAVRAS · MAGNIFICUS × ELOGIO BR</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="88" font-weight="700" fill="#fff8e8">magnífico</text>
  <text x="600" y="378" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,200,170,0.95)" letter-spacing="2">magnus · magnificent · grandeza com rasto</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4b8a0">mafianioddpo → magnífico · faça o melhor</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4af5f">legal · genial · fabuloso · maravilhoso</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
