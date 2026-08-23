'use strict';

/** Capa 1200×630 — meter marcha (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/meter-marcha-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#0c1418"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(220,140,50,0.32)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="420" cy="300" rx="260" ry="170" fill="url(#glow)"/>
  <rect x="330" y="250" width="28" height="140" rx="8" fill="rgba(40,44,48,0.95)" stroke="rgba(200,180,140,0.45)" stroke-width="2"/>
  <circle cx="344" cy="228" r="22" fill="rgba(230,170,70,0.95)"/>
  <path d="M344 250 L344 390" stroke="rgba(230,170,70,0.85)" stroke-width="6" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="2.4">EXPRESSÕES · ENGATAR · ≠ CARNAVAL ≠ RÉ ≠ SENNA</text>
  <text x="600" y="175" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4eee4">meter marcha</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">sair do ponto morto · primeira que pega o peso</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">o ofício engata · o flerte não é manual</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
