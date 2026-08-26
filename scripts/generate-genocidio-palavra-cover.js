'use strict';

/** Capa 1200×630 — genocídio (Palavras). Peso, sem imagem de dano. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/genocidio-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="48%" stop-color="#16141c"/>
      <stop offset="100%" stop-color="#1c1814"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(160,140,120,0.16)"/>
      <stop offset="100%" stop-color="rgba(160,140,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="300" ry="200" fill="url(#glow)"/>
  <circle cx="600" cy="248" r="118" fill="none" stroke="rgba(200,180,160,0.38)" stroke-width="3"/>
  <path d="M 692 200 A 118 118 0 0 1 718 268" fill="none" stroke="rgba(12,10,14,0.95)" stroke-width="28"/>
  <circle cx="600" cy="248" r="8" fill="rgba(220,200,180,0.55)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b49a" letter-spacing="4">PALAVRAS · GÉNOS · -CÍDIO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="62" font-weight="700" fill="#f4ebe0">genocídio</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,196,0.95)">Lemkin 1944 · grupo como grupo</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,180,160,0.9)">Convenção 1948 · ≠ guerra · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
