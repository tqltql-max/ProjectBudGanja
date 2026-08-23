'use strict';

/** Capa 1200×630 — perda total (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/perda-total-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#161210"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="430" y="248" width="340" height="90" rx="10" fill="none" stroke="rgba(216,176,112,0.55)" stroke-width="3"/>
  <line x1="430" y1="293" x2="770" y2="293" stroke="rgba(200,80,60,0.85)" stroke-width="6"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.2">EXPRESSÕES · SINISTRO · ≠ USUAL ≠ PT ≠ URNA ≠ LULA</text>
  <text x="600" y="175" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4eee4">perda total</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">Toral come o t · o usual só amassa</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">a baixa é do bem · não da pessoa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
