'use strict';

/**
 * Capa 1200×630 — FILMICCA (Lojas / streaming).
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/filmicca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1014"/>
      <stop offset="46%" stop-color="#2a1218"/>
      <stop offset="100%" stop-color="#3d1a14"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="36" y="0" width="28" height="630" fill="#0d080a"/>
  <rect x="1136" y="0" width="28" height="630" fill="#0d080a"/>
  ${[48, 118, 188, 258, 328, 398, 468, 538].map((y) =>
    `<rect x="42" y="${y}" width="16" height="28" rx="3" fill="#c9a227" opacity="0.55"/>
     <rect x="1142" y="${y}" width="16" height="28" rx="3" fill="#c9a227" opacity="0.55"/>`
  ).join('')}
  <rect x="88" y="72" width="1024" height="486" fill="none" stroke="#c9a227" stroke-width="2" opacity="0.4"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c9a227" letter-spacing="5">LOJAS · STREAMING · CURADORIA</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ead8">FILMICCA</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#e8d5b5">do clássico ao contemporâneo · só no Brasil</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c9a227">site ≠ catálogo eterno · indexar ≠ endosso</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#a89070">filmicca.com.br · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
