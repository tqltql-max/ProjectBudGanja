'use strict';

/** Capa 1200×630 — palavra sucção (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/succao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="48%" stop-color="#182028"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(80,140,170,0.36)"/>
      <stop offset="100%" stop-color="rgba(20,30,40,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(154,212,200,0)"/>
      <stop offset="50%" stop-color="rgba(154,212,200,0.5)"/>
      <stop offset="100%" stop-color="rgba(154,212,200,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="420" cy="300" rx="280" ry="180" fill="url(#glow)"/>
  <path d="M720 210 Q 880 300 720 390" fill="none" stroke="rgba(154,212,200,0.45)" stroke-width="3"/>
  <path d="M760 230 Q 900 300 760 370" fill="none" stroke="rgba(200,170,90,0.35)" stroke-width="2"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4c8" letter-spacing="4">PALAVRAS · SŪGERE · PUXAR PARA DENTRO</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#fff6e8">sucção</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,200,170,0.95)">suctio · ≠ açúcar · primo suco</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c8a070">cruzamento: sangue · sanguessuga</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9ad4c8">Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
