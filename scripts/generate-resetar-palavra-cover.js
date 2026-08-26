'use strict';

/** Capa 1200×630 — Palavras · resetar (pedido Reseta). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/resetar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="52%" stop-color="#1a2220"/>
      <stop offset="100%" stop-color="#0a0e10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(80,180,140,0.28)"/>
      <stop offset="100%" stop-color="rgba(10,14,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="320" ry="160" fill="url(#glow)"/>
  <path d="M520 168 A 110 110 0 1 1 520 332" fill="none" stroke="rgba(140,220,180,0.85)" stroke-width="14" stroke-linecap="round"/>
  <path d="M508 150 L520 168 L538 152" fill="none" stroke="rgba(232,244,220,0.95)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="630" cy="250" r="8" fill="#e8f4dc"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7ec8a8" letter-spacing="2.4">PALAVRAS · RE- + SET · ≠ RECEITA ≠ RECETA ≠ RESTORE</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">Reseta</text>
  <text x="600" y="492" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0c8b8">âncora resetar · forma de campo</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9aa89c">voltar ao começo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
