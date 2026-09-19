'use strict';

/** Capa 1200×630 — o veneno é forma de açúcar (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/veneno-forma-de-acucar-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140c10"/>
      <stop offset="42%" stop-color="#2a1418"/>
      <stop offset="100%" stop-color="#0e1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="38%" r="44%">
      <stop offset="0%" stop-color="rgba(236,220,180,0.32)"/>
      <stop offset="55%" stop-color="rgba(196,70,60,0.14)"/>
      <stop offset="100%" stop-color="rgba(20,12,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="rgba(244,236,214,0.88)">
    <polygon points="920,168 936,196 968,196 942,214 952,246 920,228 888,246 898,214 872,196 904,196"/>
    <polygon points="1048,214 1058,232 1078,232 1062,244 1068,264 1048,252 1028,264 1034,244 1018,232 1038,232"/>
    <polygon points="980,268 992,290 1016,290 996,304 1004,328 980,314 956,328 964,304 944,290 968,290"/>
    <circle cx="890" cy="300" r="4.2"/>
    <circle cx="1072" cy="176" r="3.2"/>
    <circle cx="1010" cy="148" r="2.6"/>
    <circle cx="860" cy="220" r="2.8"/>
  </g>
  <text x="600" y="118" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4b8a0" letter-spacing="6">EXPRESSÕES · FORMA × TALO</text>
  <text x="600" y="286" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f6efe4">o veneno é forma</text>
  <text x="600" y="348" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f0d24a">de açúcar</text>
  <text x="600" y="422" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#dcc8bc">cana · cristal · dose · prateleira</text>
  <text x="600" y="478" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#b89888">a planta não é vilã · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
