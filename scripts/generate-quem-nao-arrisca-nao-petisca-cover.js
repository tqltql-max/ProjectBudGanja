'use strict';

/** Capa 1200×630 — que não arrisca não petisca (Expressões · ditado do bocado). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/quem-nao-arrisca-nao-petisca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1610"/>
      <stop offset="48%" stop-color="#2a2014"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(232,170,70,0.36)"/>
      <stop offset="100%" stop-color="rgba(18,12,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="820" cy="250" rx="300" ry="190" fill="url(#glow)"/>
  <path d="M160 420 C 220 280, 340 240, 430 310 C 490 360, 470 470, 380 500 C 280 534, 170 500, 160 420 Z" fill="rgba(90,60,28,0.55)" stroke="rgba(232,196,120,0.55)" stroke-width="4"/>
  <circle cx="390" cy="360" r="18" fill="rgba(232,180,80,0.9)"/>
  <path d="M210 390 L 248 348 L 270 372" fill="none" stroke="rgba(240,210,150,0.7)" stroke-width="6" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e0b070" letter-spacing="3">EXPRESSÕES · DITADO DO BOCADO · INDEX · ≠ APOSTA</text>
  <text x="600" y="228" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff6e8">que não arrisca</text>
  <text x="600" y="286" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff6e8">não petisca</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,190,0.95)">quem = âncora · que = boca de campo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c090">risco com mapa · gosto de quem chegou</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e0b070">Valeu !!! fica no fecho · o ditado vai à index</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
