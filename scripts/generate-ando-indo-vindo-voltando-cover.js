'use strict';

/** Capa 1200×630 — ando, indo, vindo, voltando (Expressões). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/ando-indo-vindo-voltando-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10140c"/>
      <stop offset="50%" stop-color="#161c14"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(120,180,90,0.26)"/>
      <stop offset="100%" stop-color="rgba(10,16,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="290" rx="280" ry="220" fill="url(#glow)"/>
  <circle cx="600" cy="300" r="168" fill="none" stroke="rgba(170,210,120,0.88)" stroke-width="8"/>
  <path d="M 600 132 L 616 158 L 584 158 Z" fill="rgba(170,210,120,0.92)"/>
  <text x="600" y="64" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">EXPRESSÕES · CICLO ORAL · LOOP</text>
  <text x="600" y="228" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8f0d8">ando</text>
  <text x="748" y="312" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8f0d8">indo</text>
  <text x="600" y="398" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8f0d8">vindo</text>
  <text x="452" y="312" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8f0d8">voltando</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" font-weight="700" fill="#f4f0e4">ando, indo, vindo, voltando</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(210,230,200,0.9)">o ciclo que não pousa · eu ando + três gerúndios</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
