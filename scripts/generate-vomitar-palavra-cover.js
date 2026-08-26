'use strict';

/** Capa 1200×630 — vomitar (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vomitar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1612"/>
      <stop offset="50%" stop-color="#121c16"/>
      <stop offset="100%" stop-color="#080c0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(120,170,90,0.28)"/>
      <stop offset="100%" stop-color="rgba(120,170,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="240" rx="370" ry="190" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#a8c878" letter-spacing="3">PALAVRAS · LAT. VOMITARE · LARGAR</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#e8f4d8">vomitar</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8d8b0">o que não fica</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(210,230,190,0.95)">corpo · metáfora · mito XIV</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b0c890">depois do tónos · antes do commit</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#a8c878">faça o melhor sem despejar o rasto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
