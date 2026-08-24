'use strict';

/** Capa 1200×630 — Don't Show Again × não mostrar de novo (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/dont-show-again-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1016"/>
      <stop offset="50%" stop-color="#121c24"/>
      <stop offset="100%" stop-color="#1a2830"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(90,170,190,0.28)"/>
      <stop offset="55%" stop-color="rgba(200,170,90,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,16,22,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(154,212,200,0)"/>
      <stop offset="50%" stop-color="rgba(154,212,200,0.55)"/>
      <stop offset="100%" stop-color="rgba(154,212,200,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="380" ry="200" fill="url(#glow)"/>

  <rect x="330" y="118" width="540" height="236" rx="18" fill="rgba(8,14,20,0.72)" stroke="rgba(160,232,220,0.55)" stroke-width="2"/>
  <rect x="330" y="118" width="540" height="44" rx="18" fill="rgba(20,36,44,0.95)"/>
  <rect x="330" y="148" width="540" height="14" fill="rgba(20,36,44,0.95)"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ad4c8" letter-spacing="3.2">AVISO</text>

  <rect x="368" y="194" width="28" height="28" rx="5" fill="none" stroke="rgba(232,213,163,0.95)" stroke-width="3"/>
  <path d="M374 208 l6 7 l14 -16" fill="none" stroke="rgba(154,212,200,0.95)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="412" y="216" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#f2f7f4">Don't Show Again</text>
  <text x="412" y="248" font-family="Georgia, Times New Roman, serif" font-size="20" fill="rgba(210,200,170,0.95)">não mostrar de novo</text>

  <ellipse cx="792" cy="288" rx="26" ry="16" fill="none" stroke="rgba(232,213,163,0.7)" stroke-width="2.5"/>
  <circle cx="792" cy="288" r="7" fill="rgba(232,213,163,0.85)"/>
  <path d="M762 268 q30 44 60 0" fill="none" stroke="rgba(232,120,90,0.85)" stroke-width="3" stroke-linecap="round"/>

  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec8c4" letter-spacing="3.2">EXPRESSÕES · EN × PT · CAIXA DE DIÁLOGO</text>
  <rect x="280" y="392" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="458" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff6e8">Don't Show Again</text>
  <text x="600" y="508" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="rgba(210,200,170,0.95)">não mostrar de novo</text>
  <text x="600" y="556" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(170,200,196,0.92)">show = olhar · mostrar = avisar · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
