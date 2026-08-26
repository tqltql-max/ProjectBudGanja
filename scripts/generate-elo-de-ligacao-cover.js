'use strict';

/** Capa 1200×630 — elo de ligação × lemniscata (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/elo-de-ligacao-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a121c"/>
      <stop offset="48%" stop-color="#142028"/>
      <stop offset="100%" stop-color="#0c1412"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(180,160,90,0.22)"/>
      <stop offset="55%" stop-color="rgba(70,140,130,0.12)"/>
      <stop offset="100%" stop-color="rgba(10,18,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="380" ry="210" fill="url(#glow)"/>
  <path d="M 360 300 C 360 200 500 200 600 300 C 700 400 840 400 840 300 C 840 200 700 200 600 300 C 500 400 360 400 360 300" fill="none" stroke="rgba(220,200,130,0.85)" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="600" cy="300" rx="28" ry="18" fill="none" stroke="rgba(160,220,200,0.9)" stroke-width="5" transform="rotate(-28 600 300)"/>
  <ellipse cx="600" cy="300" rx="28" ry="18" fill="none" stroke="rgba(220,200,130,0.7)" stroke-width="4" transform="rotate(28 600 300)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b878" letter-spacing="4">EXPRESSÕES · LEMNISCATA · CRUZAMENTO</text>
  <text x="600" y="490" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4f0e4">elo de ligação</text>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,230,220,0.95)">simbuklo → símbolo do infinito</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#90c8b8">∞ deitado · 8 em pé · o anel que junta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
