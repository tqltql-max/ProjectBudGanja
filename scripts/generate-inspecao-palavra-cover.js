'use strict';

/** Capa 1200×630 — palavra inspeção (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/inspecao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1418"/>
      <stop offset="48%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#080c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(90,170,190,0.32)"/>
      <stop offset="55%" stop-color="rgba(200,170,90,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,30,36,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(154,212,200,0)"/>
      <stop offset="50%" stop-color="rgba(154,212,200,0.55)"/>
      <stop offset="100%" stop-color="rgba(154,212,200,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="270" rx="380" ry="210" fill="url(#glow)"/>
  <circle cx="600" cy="248" r="72" fill="none" stroke="rgba(232,213,163,0.35)" stroke-width="3"/>
  <circle cx="600" cy="248" r="28" fill="none" stroke="rgba(154,212,200,0.55)" stroke-width="2"/>
  <rect x="280" y="348" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4c8" letter-spacing="4">PALAVRAS · INSPICERE · OLHAR PARA DENTRO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#fff6e8">inspeção</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,200,170,0.95)">in- + specere · o vocábulo, não o hub</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b8a070">≠ incisão · ≠ Inspetor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
