'use strict';

/** Capa 1200×630 — palavra gesso (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/gesso-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#161410"/>
      <stop offset="50%" stop-color="#1a1814"/>
      <stop offset="100%" stop-color="#0c0b09"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(230,220,200,0.36)"/>
      <stop offset="58%" stop-color="rgba(120,110,90,0.10)"/>
      <stop offset="100%" stop-color="rgba(40,35,28,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(220,210,180,0)"/>
      <stop offset="50%" stop-color="rgba(220,210,180,0.62)"/>
      <stop offset="100%" stop-color="rgba(220,210,180,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <rect x="470" y="168" width="260" height="118" rx="18" fill="rgba(245,240,228,0.16)" stroke="rgba(245,240,228,0.35)" stroke-width="2"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d8c8a0" letter-spacing="4">PALAVRAS · ΓΎΨΟΣ · GE- CORTA</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#fff8ee">gesso</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">≠ geologia · quebrado → ingessado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8b898">braço direito · gatilho ingessadado</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d8c8a0">o molde segura o ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
