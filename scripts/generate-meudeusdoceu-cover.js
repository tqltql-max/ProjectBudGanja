'use strict';

/** Capa 1200×630 — meudeusdoceu (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/meudeusdoceu-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101820"/>
      <stop offset="50%" stop-color="#182430"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="48%">
      <stop offset="0%" stop-color="rgba(180,210,255,0.22)"/>
      <stop offset="100%" stop-color="rgba(180,210,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="220" r="260" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c4e8" letter-spacing="4">EXPRESSÕES · ASSOMBRO ALTO</text>
  <text x="600" y="275" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f0f4ff">meudeusdoceu</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,220,240,0.95)">meu Deus do céu — num só sopro</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8c8d8">depois do pico — faça o melhor</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8c4e8">aff · meudeusdoceu · jesusamado</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
