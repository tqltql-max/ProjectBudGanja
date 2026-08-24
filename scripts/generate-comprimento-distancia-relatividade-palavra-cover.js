'use strict';

/** Capa 1200×630 — comprimento × distância × relatividade (Palavras). Vara, vão, cone de luz. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/comprimento-distancia-relatividade-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="45%" stop-color="#101828"/>
      <stop offset="100%" stop-color="#1a1420"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(120,180,230,0.22)"/>
      <stop offset="100%" stop-color="rgba(7,11,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="620" cy="260" rx="420" ry="210" fill="url(#glow)"/>
  <!-- light cone -->
  <path d="M 600 92 L 250 430 L 950 430 Z" fill="none" stroke="rgba(210,230,255,0.28)" stroke-width="2"/>
  <line x1="600" y1="92" x2="600" y2="500" stroke="rgba(180,200,230,0.35)" stroke-width="1.5" stroke-dasharray="5 6"/>
  <!-- proper rod -->
  <rect x="220" y="468" width="420" height="14" rx="7" fill="rgba(230,200,120,0.92)"/>
  <!-- contracted rod -->
  <rect x="220" y="428" width="248" height="14" rx="7" fill="rgba(230,200,120,0.55)"/>
  <path d="M 478 435 L 508 428 L 478 442 Z" fill="rgba(230,200,120,0.7)"/>
  <!-- distance dots -->
  <circle cx="820" cy="360" r="7" fill="rgba(140,210,230,0.95)"/>
  <circle cx="1020" cy="360" r="7" fill="rgba(140,210,230,0.95)"/>
  <line x1="828" y1="360" x2="1012" y2="360" stroke="rgba(140,210,230,0.85)" stroke-width="2" stroke-dasharray="7 6"/>
  <text x="600" y="54" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#9bb8d4" letter-spacing="3.5">PALAVRAS · COMPLĒRE · DISTĀRE · RELĀTUS</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4efe4">comprimento</text>
  <text x="600" y="258" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" font-weight="700" fill="#c8d8ea">distância · relatividade</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,180,0.95)">o metro não é absoluto · c não muda de ofício</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(180,190,210,0.88)">≠ cumprimento ≠ relativismo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
