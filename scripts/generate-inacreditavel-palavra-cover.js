'use strict';

/** Capa 1200×630 — palavra inacreditável (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/inacreditavel-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="48%" stop-color="#162028"/>
      <stop offset="100%" stop-color="#0a0e12"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(180,140,70,0.36)"/>
      <stop offset="55%" stop-color="rgba(70,100,120,0.14)"/>
      <stop offset="100%" stop-color="rgba(40,50,60,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(200,170,90,0)"/>
      <stop offset="50%" stop-color="rgba(200,170,90,0.55)"/>
      <stop offset="100%" stop-color="rgba(200,170,90,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="300" rx="380" ry="220" fill="url(#glow)"/>
  <rect x="280" y="330" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8a858" letter-spacing="4">PALAVRAS · BEYOND BELIEF · ELOGIO</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f2ead8">inacreditável</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,200,170,0.95)">in- + acreditável · beyond belief · uau</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8a070">faça o melhor depois do «não acredito»</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8a858">incrível · fabuloso · genial · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
