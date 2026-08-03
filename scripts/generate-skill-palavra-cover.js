'use strict';

/** Capa 1200×630 — skill (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/skill-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12160e"/>
      <stop offset="45%" stop-color="#1a2214"/>
      <stop offset="100%" stop-color="#0c100a"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(160,190,90,0.24)"/>
      <stop offset="100%" stop-color="rgba(160,190,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="580" cy="230" r="240" fill="url(#glow)"/>
  <text x="600" y="85" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#b8d070" letter-spacing="3">PALAVRAS · EMPRÉSTIMO · CRAFT</text>
  <text x="600" y="255" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#eef6d8">skill</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,220,160,0.95)">habilidade · ofício · rasto</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8d8a0">skgll → skill · sem badge vazio</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#b8d070">anti-LinkedIn · faça o melhor neste craft</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
