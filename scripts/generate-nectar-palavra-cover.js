'use strict';

/** Capa 1200×630 — Palavras · néctar. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/nectar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="55%" stop-color="#241808"/>
      <stop offset="100%" stop-color="#0e0a06"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(232,180,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(232,180,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#e8b446"/>
  <circle cx="420" cy="280" r="180" fill="url(#glow)"/>
  <ellipse cx="380" cy="250" rx="28" ry="48" fill="none" stroke="#e8b446" stroke-width="4"/>
  <ellipse cx="430" cy="236" rx="22" ry="40" fill="none" stroke="#f4d78c" stroke-width="3"/>
  <circle cx="404" cy="268" r="10" fill="#f4efe6"/>
  <text x="600" y="120" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e8b446" letter-spacing="5">PALAVRAS · ΝΈΚΤΑΡ</text>
  <text x="760" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6">néctar</text>
  <text x="760" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8a0">Nectar / Inectar → a flor</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#e8b446">suco da flor ≠ caixa ≠ injetar · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
