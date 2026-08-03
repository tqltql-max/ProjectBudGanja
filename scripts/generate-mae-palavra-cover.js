'use strict';

/** Capa 1200×630 — mãe (Palavras). Tipografia fia → mãe. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mae-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#12100e"/>
      <stop offset="45%" stop-color="#1e1814"/>
      <stop offset="100%" stop-color="#0e1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="46%" r="48%">
      <stop offset="0%" stop-color="rgba(210,150,110,0.28)"/>
      <stop offset="55%" stop-color="rgba(160,100,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,20,15,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="300" rx="300" ry="210" fill="url(#glow)"/>
  <circle cx="520" cy="290" r="70" fill="none" stroke="rgba(230,180,140,0.35)" stroke-width="3"/>
  <circle cx="640" cy="310" r="95" fill="none" stroke="rgba(230,180,140,0.22)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8a888" letter-spacing="4">PALAVRAS · ORIGEM · CUIDADO</text>
  <text x="600" y="210" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,170,150,0.55)" text-decoration="line-through">fia</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#f5ebe0">mãe</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,200,0.95)">mater · tipografia fia → mãe</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d0b090">faça o melhor com cuidado</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a89078">Dona Maria · alma · coração · vida</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
