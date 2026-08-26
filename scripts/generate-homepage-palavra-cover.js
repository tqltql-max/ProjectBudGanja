'use strict';

/** Capa 1200×630 — homepage (Palavras). Home + page; ≠ Homer. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/homepage-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c141c"/>
      <stop offset="48%" stop-color="#122018"/>
      <stop offset="100%" stop-color="#080c0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(80,180,160,0.26)"/>
      <stop offset="100%" stop-color="rgba(80,180,160,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="230" rx="400" ry="210" fill="url(#glow)"/>
  <!-- house -->
  <polygon points="250,268 330,198 410,268" fill="none" stroke="rgba(180,230,210,0.9)" stroke-width="7" stroke-linejoin="round"/>
  <rect x="268" y="268" width="124" height="88" fill="none" stroke="rgba(180,230,210,0.85)" stroke-width="7"/>
  <rect x="314" y="300" width="32" height="56" fill="none" stroke="rgba(180,230,210,0.75)" stroke-width="5"/>
  <!-- page -->
  <rect x="790" y="196" width="118" height="162" rx="6" fill="none" stroke="rgba(232,220,180,0.88)" stroke-width="6"/>
  <line x1="812" y1="236" x2="886" y2="236" stroke="rgba(232,220,180,0.55)" stroke-width="4" stroke-linecap="round"/>
  <line x1="812" y1="268" x2="886" y2="268" stroke="rgba(232,220,180,0.45)" stroke-width="4" stroke-linecap="round"/>
  <line x1="812" y1="300" x2="860" y2="300" stroke="rgba(232,220,180,0.35)" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7ecfc0" letter-spacing="3">PALAVRAS · HOME + PAGE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#e8faf4">homepage</text>
  <text x="600" y="318" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8e0d4">página inicial  ·  a porta da rede</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,220,0.88)">home + page  ·  ≠ Homer  ·  ≠ landing</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,220,0.95)">casinha do browser  ·  index.html  ·  /</text>
  <text x="600" y="572" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#98d4c8">o étimo corta  ·  Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
