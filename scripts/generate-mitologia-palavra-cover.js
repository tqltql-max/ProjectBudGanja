'use strict';

/** Capa 1200×630 — mitologia (Palavras · lema do catálogo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mitologia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120a18"/>
      <stop offset="48%" stop-color="#1c1230"/>
      <stop offset="100%" stop-color="#0e1628"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(232,196,96,0.28)"/>
      <stop offset="55%" stop-color="rgba(180,140,70,0.10)"/>
      <stop offset="100%" stop-color="rgba(12,10,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="230" rx="380" ry="210" fill="url(#glow)"/>
  <rect x="430" y="120" width="28" height="200" fill="rgba(232,196,96,0.22)"/>
  <rect x="742" y="120" width="28" height="200" fill="rgba(232,196,96,0.22)"/>
  <path d="M458 120 L458 90 L742 90 L742 120" fill="none" stroke="rgba(232,196,96,0.45)" stroke-width="4"/>
  <circle cx="520" cy="200" r="4" fill="rgba(232,213,163,0.7)"/>
  <circle cx="680" cy="170" r="3" fill="rgba(232,213,163,0.55)"/>
  <circle cx="600" cy="150" r="5" fill="rgba(232,213,163,0.8)"/>
  <circle cx="640" cy="220" r="3" fill="rgba(232,213,163,0.5)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c460" letter-spacing="4">PALAVRAS · MYTHOS · LOGOS</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#f4ead0">mitologia</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,180,0.95)">oficio de contar os deuses · catalogo /mitologia/</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c4a050">≠ teologia · ≠ magia · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
