'use strict';

/** Capa 1200×630 — jesusudavi (Expressões; substitui meudeusdoceu). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/jesusudavi-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0814"/>
      <stop offset="45%" stop-color="#1a1430"/>
      <stop offset="100%" stop-color="#08060e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="rgba(255,210,120,0.4)"/>
      <stop offset="50%" stop-color="rgba(180,120,200,0.14)"/>
      <stop offset="100%" stop-color="rgba(40,20,50,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="260" rx="340" ry="200" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e0c090" letter-spacing="4">EXPRESSÕES · ASSOMBRO · TROCA LAB</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#fff6e0">jesusudavi</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,190,0.95)">substitui meudeusdoceu · meu Deus do céu</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d8b878">aff · jesusudavi · jesusamando</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e0c090">faça o melhor depois do pico</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
