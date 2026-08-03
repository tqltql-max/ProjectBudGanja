'use strict';

/** Capa 1200×630 — filho de deus (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/filho-de-deus-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12161c"/>
      <stop offset="50%" stop-color="#1a2230"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(210,190,140,0.24)"/>
      <stop offset="100%" stop-color="rgba(210,190,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="250" fill="url(#glow)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d2be8c" letter-spacing="4">EXPRESSÕES · TÍTULO × DIGNIDADE</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f5f0e4">filho de deus</text>
  <text x="600" y="345" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">título · oralidade · cuidado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8a878">respeito à fé — sem catecismo</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d2be8c">jesusamando · meudeusdoceu · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
