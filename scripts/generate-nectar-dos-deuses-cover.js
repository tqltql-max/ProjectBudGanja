'use strict';

/** Capa 1200×630 — Expressões · néctar dos deuses. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/nectar-dos-deuses-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141018"/>
      <stop offset="50%" stop-color="#1c1420"/>
      <stop offset="100%" stop-color="#0a080e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(232,196,96,0.22)"/>
      <stop offset="100%" stop-color="rgba(232,196,96,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="210" fill="url(#glow)"/>
  <polygon points="600,118 618,172 676,172 628,206 646,260 600,226 554,260 572,206 524,172 582,172" fill="none" stroke="#e8c460" stroke-width="3"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c460" letter-spacing="3">EXPRESSÕES · MITO × GOSTO</text>
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4efe6">néctar dos deuses</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d8c8a0">Deusus → deuses</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#e8c460">hipérbole · ≠ caixa · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
