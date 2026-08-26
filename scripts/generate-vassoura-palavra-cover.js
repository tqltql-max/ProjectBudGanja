'use strict';

/** Capa 1200×630 — palavra vassoura (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vassoura-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12100c"/>
      <stop offset="48%" stop-color="#1a2214"/>
      <stop offset="100%" stop-color="#0c1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="46%" r="44%">
      <stop offset="0%" stop-color="rgba(180,150,70,0.22)"/>
      <stop offset="50%" stop-color="rgba(90,140,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,20,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="300" rx="260" ry="200" fill="url(#glow)"/>
  <!-- handle -->
  <path d="M430 470 L760 160" fill="none" stroke="rgba(160,120,70,0.95)" stroke-width="18" stroke-linecap="round"/>
  <path d="M430 470 L760 160" fill="none" stroke="rgba(223,194,98,0.35)" stroke-width="6" stroke-linecap="round"/>
  <!-- bristles -->
  <path d="M400 430 L250 520" fill="none" stroke="rgba(140,110,55,0.85)" stroke-width="7" stroke-linecap="round"/>
  <path d="M415 448 L270 555" fill="none" stroke="rgba(120,95,45,0.8)" stroke-width="7" stroke-linecap="round"/>
  <path d="M430 465 L300 575" fill="none" stroke="rgba(150,118,58,0.85)" stroke-width="7" stroke-linecap="round"/>
  <path d="M445 478 L335 590" fill="none" stroke="rgba(110,88,40,0.8)" stroke-width="6" stroke-linecap="round"/>
  <path d="M412 440 L220 500" fill="none" stroke="rgba(130,100,50,0.75)" stroke-width="6" stroke-linecap="round"/>
  <path d="M428 455 L245 545" fill="none" stroke="rgba(100,80,38,0.7)" stroke-width="5" stroke-linecap="round"/>
  <!-- bind -->
  <ellipse cx="438" cy="455" rx="22" ry="14" transform="rotate(-38 438 455)" fill="none" stroke="rgba(223,194,98,0.7)" stroke-width="4"/>
  <!-- dust -->
  <circle cx="210" cy="560" r="4" fill="rgba(200,180,120,0.35)"/>
  <circle cx="230" cy="575" r="3" fill="rgba(200,180,120,0.28)"/>
  <circle cx="188" cy="548" r="2" fill="rgba(200,180,120,0.3)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · VARRER · OFÍCIO</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">vassoura</text>
  <text x="600" y="590" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">versoria · chão · conto ≠ receita</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
