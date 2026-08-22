'use strict';

/** Capa 1200×630 — palavra etimologia (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/etimologia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120e08"/>
      <stop offset="50%" stop-color="#1a140c"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(212,175,90,0.32)"/>
      <stop offset="55%" stop-color="rgba(180,140,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(212,175,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="250" r="280" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4af5a" letter-spacing="5">PALAVRAS · ÉTYMON × LÓGOS</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f6edd4">etimologia</text>
  <text x="600" y="368" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,210,160,0.95)" letter-spacing="1">ἔτυμον · λόγος · o sentido verdadeiro</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#e0c888">étimo ≠ etimologia popular · faça o melhor</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d4af5a">trocadilho · aglutinação · polimorfismo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
