'use strict';

/** Capa 1200×630 — Band-Aid (objecto; lapso bandad). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/band-aid-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14100c"/>
      <stop offset="48%" stop-color="#1c1812"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="44%">
      <stop offset="0%" stop-color="rgba(196,160,96,0.24)"/>
      <stop offset="100%" stop-color="rgba(196,160,96,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="230" rx="340" ry="150" fill="url(#glow)"/>
  <rect x="330" y="168" width="540" height="156" rx="78" fill="#c4a06a"/>
  <rect x="348" y="186" width="504" height="120" rx="60" fill="#d8b888"/>
  <rect x="508" y="198" width="184" height="96" rx="18" fill="#f2ead8"/>
  <rect x="528" y="214" width="144" height="64" rx="10" fill="#e8dcc4"/>
  <line x1="600" y1="226" x2="600" y2="266" stroke="rgba(160,80,64,0.35)" stroke-width="3"/>
  <circle cx="390" cy="246" r="5" fill="rgba(90,60,36,0.28)"/>
  <circle cx="430" cy="246" r="5" fill="rgba(90,60,36,0.28)"/>
  <circle cx="770" cy="246" r="5" fill="rgba(90,60,36,0.28)"/>
  <circle cx="810" cy="246" r="5" fill="rgba(90,60,36,0.28)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b47a" letter-spacing="3.2">OBJECTO · BAND + AID · ≠ ESPARADRAPO ≠ GESSO</text>
  <text x="600" y="420" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4ead0">Band-Aid</text>
  <text x="600" y="486" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">bandad = lapso · cai o i de aid</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c4b49a">faixa + almofada · ≠ bandada · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
