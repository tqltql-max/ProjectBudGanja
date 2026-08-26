'use strict';

/** Capa 1200×630 — Palavras · bosta (estrume / gíria ≠ Boston). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/bosta-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a120c"/>
      <stop offset="48%" stop-color="#2a1c12"/>
      <stop offset="100%" stop-color="#3a2818"/>
    </linearGradient>
    <radialGradient id="earth" cx="50%" cy="62%" r="42%">
      <stop offset="0%" stop-color="rgba(140,90,40,0.40)"/>
      <stop offset="70%" stop-color="rgba(60,40,22,0.18)"/>
      <stop offset="100%" stop-color="rgba(26,18,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="390" rx="300" ry="140" fill="url(#earth)"/>
  <ellipse cx="560" cy="400" rx="90" ry="40" fill="rgba(90,60,32,0.45)"/>
  <ellipse cx="640" cy="412" rx="70" ry="32" fill="rgba(70,48,28,0.40)"/>
  <ellipse cx="600" cy="378" rx="50" ry="22" fill="rgba(110,78,42,0.35)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c4a070" letter-spacing="3">PALAVRAS · ESTRUME · GÍRIA · ≠ BOSTON</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f0e6d4">bosta</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,196,0.95)">chão ibérico · a orelha cola · o étimo corta</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="#c4a070">nomear o vocábulo · sem arma · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
