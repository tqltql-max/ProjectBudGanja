'use strict';

/** Capa 1200×630 — cola / colar (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cola-colar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140c0c"/>
      <stop offset="48%" stop-color="#1c1410"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="42%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.20)"/>
      <stop offset="55%" stop-color="rgba(180,70,50,0.10)"/>
      <stop offset="100%" stop-color="rgba(20,12,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="520" cy="280" rx="280" ry="200" fill="url(#glow)"/>
  <!-- kite diamond -->
  <path d="M520 150 L640 280 L520 410 L400 280 Z" fill="none" stroke="rgba(223,194,98,0.85)" stroke-width="6" stroke-linejoin="round"/>
  <path d="M520 150 L520 410" fill="none" stroke="rgba(223,194,98,0.35)" stroke-width="2"/>
  <path d="M400 280 L640 280" fill="none" stroke="rgba(223,194,98,0.35)" stroke-width="2"/>
  <!-- tail -->
  <path d="M520 410 C510 450 540 470 520 510 C500 545 530 560 520 590" fill="none" stroke="rgba(200,160,90,0.55)" stroke-width="3" stroke-linecap="round"/>
  <!-- cutting line across the frame -->
  <line x1="80" y1="200" x2="1120" y2="360" stroke="rgba(232,120,90,0.55)" stroke-width="3"/>
  <!-- P stamp -->
  <circle cx="900" cy="230" r="54" fill="none" stroke="rgba(232,120,90,0.9)" stroke-width="4"/>
  <text x="900" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#e8785a">P</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="5">PALAVRAS · COLANTE · CORTANTE</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4efe6">cola · colar</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">cerol · pipa · linha · Brasil com P de Perigo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
