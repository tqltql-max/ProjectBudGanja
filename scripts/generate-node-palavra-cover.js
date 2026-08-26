'use strict';

/** Capa 1200×630 — node × nuds (Palavras). Orelha cola, étimo corta. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/node-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10161c"/>
      <stop offset="50%" stop-color="#161410"/>
      <stop offset="100%" stop-color="#0c0c0c"/>
    </linearGradient>
    <radialGradient id="glowL" cx="32%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(140,190,210,0.22)"/>
      <stop offset="100%" stop-color="rgba(140,190,210,0)"/>
    </radialGradient>
    <radialGradient id="glowR" cx="70%" cy="44%" r="36%">
      <stop offset="0%" stop-color="rgba(210,170,120,0.16)"/>
      <stop offset="100%" stop-color="rgba(210,170,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="360" cy="270" r="200" fill="url(#glowL)"/>
  <circle cx="840" cy="280" r="190" fill="url(#glowR)"/>
  <!-- graph node: circle with three edges -->
  <circle cx="300" cy="268" r="36" fill="none" stroke="rgba(180,220,230,0.9)" stroke-width="8"/>
  <line x1="300" y1="232" x2="300" y2="168" stroke="rgba(180,220,230,0.7)" stroke-width="6" stroke-linecap="round"/>
  <line x1="268" y1="288" x2="210" y2="330" stroke="rgba(180,220,230,0.7)" stroke-width="6" stroke-linecap="round"/>
  <line x1="332" y1="288" x2="390" y2="330" stroke="rgba(180,220,230,0.7)" stroke-width="6" stroke-linecap="round"/>
  <!-- empty outline (not a body): letter gap -->
  <text x="900" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="rgba(210,170,120,0.35)">U</text>
  <line x1="520" y1="200" x2="520" y2="340" stroke="rgba(232,120,90,0.65)" stroke-width="3" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#a8c8d8" letter-spacing="4">PALAVRAS · NODUS × NUDUS · ORELHA COLA</text>
  <text x="360" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#c8e0e8">n<tspan fill="#7ec8e0" font-size="36">o</tspan>dus</text>
  <text x="840" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8d0b0">n<tspan fill="#e8a060" font-size="36">u</tspan>dus</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4efe6">node · nuds</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">uma letra · o étimo corta · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
