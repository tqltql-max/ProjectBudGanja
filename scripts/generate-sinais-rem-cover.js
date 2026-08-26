'use strict';

/** Capa 1200×630 — sinais REM (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sinais-rem-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a121c"/>
      <stop offset="48%" stop-color="#152436"/>
      <stop offset="100%" stop-color="#0e1018"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="38%" r="36%">
      <stop offset="0%" stop-color="rgba(255,196,72,0.22)"/>
      <stop offset="100%" stop-color="rgba(255,196,72,0)"/>
    </radialGradient>
    <radialGradient id="eyeGlow" cx="28%" cy="48%" r="30%">
      <stop offset="0%" stop-color="rgba(120,170,220,0.22)"/>
      <stop offset="100%" stop-color="rgba(120,170,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="220" r="210" fill="url(#glow)"/>
  <circle cx="320" cy="310" r="180" fill="url(#eyeGlow)"/>
  <!-- closed eye + rapid darts -->
  <ellipse cx="300" cy="300" rx="92" ry="38" fill="none" stroke="rgba(180,210,240,0.55)" stroke-width="4"/>
  <path d="M220 300 Q300 268 380 300" fill="none" stroke="rgba(230,240,255,0.75)" stroke-width="3"/>
  <path d="M248 286 L268 272" stroke="rgba(255,210,90,0.8)" stroke-width="3" stroke-linecap="round"/>
  <path d="M300 278 L318 258" stroke="rgba(255,210,90,0.7)" stroke-width="3" stroke-linecap="round"/>
  <path d="M348 286 L372 270" stroke="rgba(255,210,90,0.8)" stroke-width="3" stroke-linecap="round"/>
  <!-- three marks R E M -->
  <circle cx="780" cy="430" r="10" fill="rgba(255,196,72,0.85)"/>
  <circle cx="860" cy="410" r="8" fill="rgba(140,190,220,0.8)"/>
  <circle cx="930" cy="430" r="10" fill="rgba(90,180,130,0.75)"/>
  <text x="600" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">PALAVRAS · SIGNUM · FASE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f7fbff">sinais REM</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">sono × relaxamento · endocanabinoide · modular</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">o campo, não um único sinal</text>
  <text x="600" y="582" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8aa0b8">gesto · nap · peito · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
