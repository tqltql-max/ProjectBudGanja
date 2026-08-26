'use strict';

/** Capa 1200×630 — teologia (Palavras · theós + lógos). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/teologia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1218"/>
      <stop offset="48%" stop-color="#14202c"/>
      <stop offset="100%" stop-color="#0a1824"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="46%">
      <stop offset="0%" stop-color="rgba(232,213,163,0.26)"/>
      <stop offset="55%" stop-color="rgba(180,150,80,0.08)"/>
      <stop offset="100%" stop-color="rgba(10,18,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="220" rx="360" ry="190" fill="url(#glow)"/>
  <path d="M470 160 L600 210 L730 160 L730 340 L600 290 L470 340 Z" fill="none" stroke="rgba(232,213,163,0.55)" stroke-width="3"/>
  <line x1="600" y1="210" x2="600" y2="290" stroke="rgba(232,213,163,0.7)" stroke-width="2"/>
  <circle cx="600" cy="148" r="5" fill="rgba(232,213,163,0.85)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8d5a3" letter-spacing="4">PALAVRAS · THEOS · LOGOS</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#f4ead0">teologia</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,180,0.95)">estudo do divino · o nome, nao o pulpito</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c4a86a">≠ mitologia · ≠ catecismo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
