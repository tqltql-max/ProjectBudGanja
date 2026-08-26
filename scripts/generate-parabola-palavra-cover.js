'use strict';

/** Capa 1200×630 — parábola (Palavras). Curva + foco + directriz. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/parabola-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="48%" stop-color="#121c22"/>
      <stop offset="100%" stop-color="#1a1610"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(200,170,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,18,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="380" ry="200" fill="url(#glow)"/>
  <path d="M 140 500 Q 600 70 1060 500" fill="none" stroke="rgba(230,200,120,0.92)" stroke-width="7" stroke-linecap="round"/>
  <line x1="160" y1="548" x2="1040" y2="548" stroke="rgba(160,190,210,0.55)" stroke-width="2" stroke-dasharray="8 7"/>
  <circle cx="600" cy="248" r="8" fill="rgba(240,220,160,0.95)"/>
  <line x1="600" y1="248" x2="600" y2="500" stroke="rgba(230,200,120,0.35)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">PALAVRAS · PARABOLḖ · PARABOLA</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="62" font-weight="700" fill="#f4efe4">parábola</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,180,0.95)">lançar ao lado · narrativa × curva</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">latim e português · ≠ palavra · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
