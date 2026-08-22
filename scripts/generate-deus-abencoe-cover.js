'use strict';

/** Capa 1200×630 — Deus abençoe (Expressões). Tipografia Deus Abenço → Deus abençoe. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/deus-abencoe-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#1a2228"/>
      <stop offset="100%" stop-color="#0a0e10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(200,180,120,0.26)"/>
      <stop offset="100%" stop-color="rgba(200,180,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="250" r="260" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d2be8c" letter-spacing="4">EXPRESSÕES · BÊNÇÃO × DESPEDIDA</text>
  <text x="600" y="200" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(190,175,140,0.5)" text-decoration="line-through">Deus Abenço</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f5f0e4">Deus abençoe</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">desejo de bem · saída com calor</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8a878">respeito à fé — sem catecismo</text>
  <text x="600" y="565" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d2be8c">jesusamado · filho de deus · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
