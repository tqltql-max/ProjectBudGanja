'use strict';

/** Capa 1200×630 — bode (Palavras). Caprino, não adega. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/bode-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140c"/>
      <stop offset="50%" stop-color="#2a1c10"/>
      <stop offset="100%" stop-color="#0c0906"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(196,140,70,0.24)"/>
      <stop offset="100%" stop-color="rgba(196,140,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="230" fill="url(#glow)"/>
  <path d="M470 210 Q520 120 560 210" fill="none" stroke="rgba(232,200,140,0.55)" stroke-width="4"/>
  <path d="M730 210 Q680 120 640 210" fill="none" stroke="rgba(232,200,140,0.55)" stroke-width="4"/>
  <text x="600" y="84" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e2c15a" letter-spacing="3">PALAVRAS · CAPRINO · EXPIATÓRIO × GÍRIA</text>
  <text x="600" y="278" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4ebe0">bode</text>
  <text x="600" y="348" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,210,170,0.95)">cabra · expiatório · ≠ adega (ES)</text>
  <text x="600" y="498" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c4a070">animal ≠ mau humor</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e2c15a">preguiça · pato · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
