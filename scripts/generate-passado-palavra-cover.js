'use strict';

/** Capa 1200×630 — passado (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/passado-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14110e"/>
      <stop offset="45%" stop-color="#1c1814"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="42%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(196,160,110,0.22)"/>
      <stop offset="100%" stop-color="rgba(196,160,110,0)"/>
    </radialGradient>
    <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(180,140,90,0.05)"/>
      <stop offset="50%" stop-color="rgba(210,170,110,0.35)"/>
      <stop offset="100%" stop-color="rgba(180,140,90,0.05)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="480" cy="240" r="280" fill="url(#glow)"/>
  <rect x="180" y="380" width="840" height="3" fill="url(#trail)"/>
  <text x="600" y="85" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b896" letter-spacing="3">PALAVRAS · DE PASSAR · TEMPO DECORRIDO</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4ebe0">passado</text>
  <text x="600" y="345" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,210,180,0.95)">memória · história · ≠ futuro sozinho</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4a070">rasto que se inspeciona</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#d4b896">passar · memorável · verdade · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
