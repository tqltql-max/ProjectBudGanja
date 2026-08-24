'use strict';

/** Capa 1200×630 — palavra Cool Gelado (derivação de Legal !!!). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cool-gelado-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="42%" stop-color="#0c2838"/>
      <stop offset="100%" stop-color="#061014"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="42%" r="50%">
      <stop offset="0%" stop-color="rgba(120,210,230,0.36)"/>
      <stop offset="50%" stop-color="rgba(70,140,180,0.14)"/>
      <stop offset="100%" stop-color="rgba(20,40,50,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(160,220,230,0)"/>
      <stop offset="50%" stop-color="rgba(180,230,240,0.65)"/>
      <stop offset="100%" stop-color="rgba(160,220,230,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="360" ry="180" fill="url(#glow)"/>
  <rect x="320" y="328" width="560" height="2" fill="url(#bar)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8fd4e8" letter-spacing="4">PALAVRAS · DERIVAÇÃO DE LEGAL !!!</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#eef8fc">cool gelado</text>
  <text x="600" y="390" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8e8f0">Legal! · cool · gelado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ec8d4">gíria ≠ termómetro ≠ lei</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(160,210,220,0.85)">peito · copo · lex · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
