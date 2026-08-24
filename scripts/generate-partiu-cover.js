'use strict';

/** Capa 1200×630 — Partiu!!! (Expressões · derivação de Valeu !!!). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/partiu-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="50%" stop-color="#241810"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="62%" cy="48%" r="46%">
      <stop offset="0%" stop-color="rgba(230,160,70,0.34)"/>
      <stop offset="100%" stop-color="rgba(20,12,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="760" cy="300" rx="280" ry="180" fill="url(#glow)"/>
  <rect x="168" y="168" width="18" height="300" rx="6" fill="rgba(90,70,48,0.95)"/>
  <path d="M186 168 C 318 210, 318 426, 186 468" fill="none" stroke="rgba(232,196,120,0.72)" stroke-width="8" stroke-linecap="round"/>
  <circle cx="268" cy="318" r="10" fill="rgba(232,180,80,0.95)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e0b070" letter-spacing="3.2">EXPRESSÕES · DERIVAÇÃO DE VALEU !!! · ≠ TAMARA ≠ PARIU ≠ FUI</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#fff6e8">Partiu!!!</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(240,220,190,0.95)">partir → partiu · a porta, não o gelo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c090">valer deu valeu · partir deu partiu</text>
  <text x="600" y="552" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e0b070">convite e saída · Valeu !!! fica</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
