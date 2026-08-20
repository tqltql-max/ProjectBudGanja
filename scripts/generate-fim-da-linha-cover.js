'use strict';

/** Capa 1200×630 — fim da linha (Expressões · formato confeito casca+chocolate). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function candy(cx, cy, r, fill, highlight) {
  return `
  <ellipse cx="${cx}" cy="${cy + r * 0.12}" rx="${r * 1.02}" ry="${r * 0.92}" fill="rgba(0,0,0,0.35)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.88}" fill="${fill}"/>
  <ellipse cx="${cx - r * 0.28}" cy="${cy - r * 0.32}" rx="${r * 0.32}" ry="${r * 0.18}" fill="${highlight}" opacity="0.55"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.42}" ry="${r * 0.28}" fill="rgba(90,45,20,0.55)"/>`;
}

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/fim-da-linha-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a100c"/>
      <stop offset="45%" stop-color="#2a1810"/>
      <stop offset="100%" stop-color="#0c0806"/>
    </linearGradient>
    <linearGradient id="belt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3a2a18"/>
      <stop offset="50%" stop-color="#5a4030"/>
      <stop offset="100%" stop-color="#2a1810"/>
    </linearGradient>
    <linearGradient id="tape" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c45c2a"/>
      <stop offset="50%" stop-color="#e8a050"/>
      <stop offset="100%" stop-color="#7a3018"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(232,160,80,0.22)"/>
      <stop offset="100%" stop-color="rgba(232,160,80,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="300" r="260" fill="url(#glow)"/>
  <!-- factory line -->
  <rect x="40" y="318" width="1120" height="54" rx="8" fill="url(#belt)"/>
  <rect x="40" y="328" width="1120" height="8" fill="rgba(232,160,80,0.25)"/>
  <g stroke="rgba(20,12,8,0.45)" stroke-width="2">
    <line x1="80" y1="318" x2="80" y2="372"/>
    <line x1="200" y1="318" x2="200" y2="372"/>
    <line x1="320" y1="318" x2="320" y2="372"/>
    <line x1="440" y1="318" x2="440" y2="372"/>
    <line x1="560" y1="318" x2="560" y2="372"/>
    <line x1="680" y1="318" x2="680" y2="372"/>
    <line x1="800" y1="318" x2="800" y2="372"/>
    <line x1="920" y1="318" x2="920" y2="372"/>
    <line x1="1040" y1="318" x2="1040" y2="372"/>
  </g>
  <!-- wrapping tape / fita -->
  <path d="M60 250 C220 210 380 290 540 240 C700 190 820 280 980 230" fill="none" stroke="url(#tape)" stroke-width="10" stroke-linecap="round"/>
  <path d="M60 262 C220 222 380 302 540 252 C700 202 820 292 980 242" fill="none" stroke="rgba(255,220,160,0.25)" stroke-width="3" stroke-linecap="round"/>
  <!-- candies on the line (generic coated chocolate — no brand mark) -->
  ${candy(150, 300, 38, '#c62828', 'rgba(255,200,200,0.9)')}
  ${candy(290, 292, 36, '#f9a825', 'rgba(255,240,180,0.9)')}
  ${candy(430, 304, 37, '#1565c0', 'rgba(180,210,255,0.9)')}
  ${candy(570, 296, 35, '#2e7d32', 'rgba(180,240,180,0.9)')}
  ${candy(710, 302, 36, '#ef6c00', 'rgba(255,220,180,0.9)')}
  ${candy(850, 294, 38, '#6d4c41', 'rgba(230,200,170,0.85)')}
  ${candy(1000, 288, 42, '#d32f2f', 'rgba(255,190,190,0.95)')}
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8a050" letter-spacing="4">EXPRESSÕES · FITA · VIDA · CHOCOLATE</text>
  <text x="600" y="150" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#fff6e8">fim da linha</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,220,190,0.95)">casca = fita · núcleo = vida · esteira = linha</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#d0b080">formato confeito · sem afiliação de marca</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
