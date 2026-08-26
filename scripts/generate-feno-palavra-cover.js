'use strict';

/** Capa 1200×630 — Palavras · feno (fēnum ≠ pheno). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/feno-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2410"/>
      <stop offset="48%" stop-color="#3a3014"/>
      <stop offset="100%" stop-color="#14180c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(212,176,72,0.32)"/>
      <stop offset="100%" stop-color="rgba(42,36,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="320" ry="160" fill="url(#glow)"/>
  <path d="M360 300 Q420 220 480 300 Q540 220 600 300 Q660 220 720 300 Q780 220 840 300" fill="none" stroke="rgba(232,200,110,0.55)" stroke-width="3"/>
  <path d="M400 340 Q460 270 520 340 Q580 270 640 340 Q700 270 760 340" fill="none" stroke="rgba(196,160,70,0.4)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e2c15a" letter-spacing="3">PALAVRAS · FĒNUM ≠ PHENO · ≠ RAÇÃO</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4efe6">feno</text>
  <text x="600" y="468" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8a0">erva seca · não o fenótipo</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#b8a070">curral · ≠ cheiro de cura · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
