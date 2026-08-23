'use strict';

/** Capa 1200×630 — letra L. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/letra-l-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141218"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="380" y="390" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="280" font-weight="700" fill="rgba(230,170,70,0.22)">L</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.2">PALAVRAS · ÉLE · 12.ª · GENIALLLLL → GENIAL · ≠ LULA ≠ LOSS</text>
  <text x="600" y="175" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">letra L</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">a haste · o /l/ · romano 50</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">genialllll estica o elogio · não a letra</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
