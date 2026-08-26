'use strict';

/** Capa 1200×630 — Artes · O Alquimista (Paulo Coelho). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/o-alquimista-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1018"/>
      <stop offset="38%" stop-color="#4a2a18"/>
      <stop offset="72%" stop-color="#c47828"/>
      <stop offset="100%" stop-color="#2a1810"/>
    </linearGradient>
    <radialGradient id="sun" cx="72%" cy="28%" r="28%">
      <stop offset="0%" stop-color="rgba(255,210,90,0.55)"/>
      <stop offset="100%" stop-color="rgba(255,210,90,0)"/>
    </radialGradient>
    <linearGradient id="dune" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(230,170,80,0.55)"/>
      <stop offset="100%" stop-color="rgba(90,50,20,0.35)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="170" r="160" fill="url(#sun)"/>
  <!-- pyramids -->
  <polygon points="720,390 820,210 920,390" fill="rgba(40,28,22,0.55)" stroke="rgba(240,200,120,0.35)" stroke-width="2"/>
  <polygon points="820,390 900,250 980,390" fill="rgba(30,20,16,0.45)" stroke="rgba(240,200,120,0.22)" stroke-width="2"/>
  <!-- dunes -->
  <path d="M0 470 Q220 400 480 455 T1200 440 L1200 630 L0 630 Z" fill="url(#dune)"/>
  <path d="M0 520 Q300 470 620 530 T1200 510 L1200 630 L0 630 Z" fill="rgba(80,42,18,0.35)"/>
  <!-- staff -->
  <line x1="280" y1="250" x2="310" y2="430" stroke="rgba(240,210,150,0.55)" stroke-width="6" stroke-linecap="round"/>
  <circle cx="274" cy="236" r="10" fill="none" stroke="rgba(240,210,150,0.6)" stroke-width="3"/>
  <!-- coin -->
  <circle cx="200" cy="340" r="36" fill="rgba(230,180,60,0.45)" stroke="rgba(255,220,120,0.7)" stroke-width="2"/>
  <text x="200" y="348" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="rgba(80,40,10,0.75)">☉</text>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#f0d090" letter-spacing="8">ARTES · LIVRO</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#f8f0e0">O Alquimista</text>
  <text x="600" y="590" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#e8d4b0">Paulo Coelho · 1988</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
