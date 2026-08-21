'use strict';

/** Capa 1200×630 — plataformas de ensino GOV.BR / MEC. Verde-amarelo institucionais, não verde de cultivo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function jpegFromSvg(svg, outRel) {
  const sharp = require('sharp');
  const out = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

function coverSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071a12"/>
      <stop offset="48%" stop-color="#0c2a22"/>
      <stop offset="100%" stop-color="#102038"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="1020" cy="70" rx="280" ry="170" fill="rgba(255,204,0,0.12)"/>
  <ellipse cx="140" cy="560" rx="300" ry="180" fill="rgba(0,156,59,0.18)"/>
  <g opacity="0.28" fill="none" stroke="#ffcc00" stroke-width="2">
    <rect x="900" y="390" width="86" height="118" rx="4"/>
    <rect x="996" y="368" width="86" height="140" rx="4"/>
    <polygon points="1108,430 1184,474 1108,518" fill="none"/>
    <circle cx="1040" cy="150" r="52"/>
    <path d="M1012 150 h56 M1040 122 v56"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#ffcc00" letter-spacing="5">GOV.BR · FORMAÇÃO</text>
  <text x="80" y="250" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#fff8e8">Ensino público</text>
  <text x="80" y="318" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="600" fill="#c8e6c0">Canal Educação · Idiomas · Livros</text>
  <text x="80" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.92)">MEC · login gov.br · gratuito</text>
  <text x="80" y="530" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">AVAMEC · MEC Enem · 2026</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(coverSvg(), 'imagens/inspecoes/govbr-ensino-cover.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
