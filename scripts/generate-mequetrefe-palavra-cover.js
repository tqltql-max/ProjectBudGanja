'use strict';

/**
 * Capa 1200×630 — Mequetrefe (Palavras).
 * Paleta de brechó: sépia, ouro velho, uma peça na arara.
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mequetrefe-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140c"/>
      <stop offset="48%" stop-color="#2a1c12"/>
      <stop offset="100%" stop-color="#0e0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(196,150,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(196,150,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="260" fill="url(#glow)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e2c15a" letter-spacing="3.2">PALAVRAS · PORTA PALAVRA #5 · TODAS NESTA PÁGINA</text>
  <text x="600" y="252" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe4">Mequetrefe</text>
  <text x="600" y="322" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,220,180,0.95)">jururu · pinimba · cooper · lorota · brechó</text>
  <text x="600" y="458" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c890">o dicionário é um brechó</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e2c15a">Gregorio · Porta dos Fundos · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
