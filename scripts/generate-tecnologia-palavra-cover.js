'use strict';

/** Capa 1200×630 — tecnologia (Palavras · lema do catálogo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tecnologia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#061018"/>
      <stop offset="48%" stop-color="#0c2430"/>
      <stop offset="100%" stop-color="#08222c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(72,201,232,0.28)"/>
      <stop offset="55%" stop-color="rgba(90,170,190,0.10)"/>
      <stop offset="100%" stop-color="rgba(8,20,28,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="360" ry="200" fill="url(#glow)"/>
  <circle cx="600" cy="230" r="78" fill="none" stroke="rgba(72,201,232,0.45)" stroke-width="3"/>
  <circle cx="600" cy="230" r="48" fill="none" stroke="rgba(232,213,163,0.35)" stroke-width="2"/>
  <circle cx="600" cy="230" r="18" fill="rgba(72,201,232,0.35)"/>
  <rect x="430" y="218" width="40" height="8" fill="rgba(154,212,200,0.45)"/>
  <rect x="730" y="218" width="40" height="8" fill="rgba(154,212,200,0.45)"/>
  <rect x="592" y="140" width="16" height="40" fill="rgba(154,212,200,0.35)"/>
  <rect x="592" y="280" width="16" height="40" fill="rgba(154,212,200,0.35)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4c8" letter-spacing="4">PALAVRAS · TEKHNE · LOGOS</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#e8fff8">tecnologia</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,230,230,0.95)">oficio dos aparelhos · catalogo /tecnologia/</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#b8a070">≠ idolo · ≠ escravidao · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
