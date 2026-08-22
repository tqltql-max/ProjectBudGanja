'use strict';

/** Capa 1200×630 — afinar (Palavras): violão × passarinho assobiando. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/afinar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16120c"/>
      <stop offset="48%" stop-color="#1e1810"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(226,193,90,0.28)"/>
      <stop offset="100%" stop-color="rgba(226,193,90,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="72%" cy="32%" r="34%">
      <stop offset="0%" stop-color="rgba(180,220,160,0.18)"/>
      <stop offset="100%" stop-color="rgba(180,220,160,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="420" cy="280" r="260" fill="url(#glow)"/>
  <circle cx="860" cy="200" r="180" fill="url(#glow2)"/>
  <ellipse cx="380" cy="360" rx="118" ry="42" fill="none" stroke="#e8c547" stroke-width="3" opacity="0.85"/>
  <line x1="380" y1="318" x2="380" y2="248" stroke="#e8c547" stroke-width="3"/>
  <circle cx="380" cy="236" r="16" fill="none" stroke="#f0d060" stroke-width="2.5"/>
  <path d="M820 168 c28 -22 62 -18 78 8 c12 20 6 44 -16 56 c-14 8 -22 22 -18 38 c4 18 -8 32 -28 34 c-24 2 -42 -16 -46 -38 c-6 -28 4 -52 30 -98z" fill="#c8e0a8" opacity="0.92"/>
  <path d="M868 214 c18 4 32 18 28 32" fill="none" stroke="#1a2214" stroke-width="2"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8c547" letter-spacing="3.2">PALAVRAS · OBJECTO · TOM</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4ecd0">afinar</text>
  <text x="600" y="328" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">violão · passarinho assobiando</text>
  <text x="600" y="488" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d4c48a">corda + cravelha  ·  bico já no tom</text>
  <text x="600" y="552" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e8c547">asoviar = assobiar · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
