'use strict';

/** Capa 1200×630 — isotônico (iso- + tônico). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/isotonico-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1418"/>
      <stop offset="50%" stop-color="#102028"/>
      <stop offset="100%" stop-color="#0a0e10"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(90,180,200,0.28)"/>
      <stop offset="100%" stop-color="rgba(90,180,200,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="240" rx="360" ry="190" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec8d4" letter-spacing="3">PALAVRAS · ISO- + TÔNICO · TENSÃO IGUAL</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" fill="#b8d0d8">iso-  +  tônico</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#e8f6f8">isotônico</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,236,0.95)">osmose · músculo · gôndola</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#a8d0d8">≠ chá · ≠ sílaba · ≠ água tónica</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#8ec8d4">faça o melhor depois da etiqueta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
