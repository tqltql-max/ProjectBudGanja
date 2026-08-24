'use strict';

/** Capa 1200×630 — Maria × for / para (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/maria-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1018"/>
      <stop offset="48%" stop-color="#141c22"/>
      <stop offset="100%" stop-color="#1a1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="68%" cy="42%" r="44%">
      <stop offset="0%" stop-color="rgba(210,180,120,0.28)"/>
      <stop offset="100%" stop-color="rgba(10,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="820" cy="250" rx="300" ry="190" fill="url(#glow)"/>
  <text x="210" y="268" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="rgba(180,200,210,0.95)">for</text>
  <text x="210" y="312" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(160,180,190,0.85)">para</text>
  <line x1="310" y1="250" x2="520" y2="250" stroke="rgba(230,200,120,0.9)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="520,250 488,232 488,268" fill="rgba(230,200,120,0.95)"/>
  <text x="820" y="278" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="86" font-weight="700" fill="#f4efe4">Maria</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">PALAVRAS · MIRYAM · × FOR / PARA</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,180,0.95)">o nome · a partícula aponta · ≠ formaria</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ por · ≠ marijuana · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
