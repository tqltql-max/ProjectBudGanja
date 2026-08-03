'use strict';

/** Capa 1200×630 — EXIT (Palavras · salvação / saída). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/exit-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1410"/>
      <stop offset="40%" stop-color="#162018"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="62%" cy="42%" r="40%">
      <stop offset="0%" stop-color="rgba(210,180,90,0.28)"/>
      <stop offset="55%" stop-color="rgba(124,179,66,0.12)"/>
      <stop offset="100%" stop-color="rgba(124,179,66,0)"/>
    </radialGradient>
    <linearGradient id="door" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(232,210,140,0.55)"/>
      <stop offset="100%" stop-color="rgba(124,179,66,0.35)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="720" cy="260" r="220" fill="url(#glow)"/>
  <!-- doorway / limiar -->
  <rect x="620" y="150" width="160" height="280" rx="6" fill="none" stroke="rgba(232,210,140,0.75)" stroke-width="8"/>
  <rect x="640" y="175" width="120" height="230" fill="url(#door)" opacity="0.55"/>
  <circle cx="740" cy="290" r="7" fill="rgba(232,210,140,0.9)"/>
  <!-- path lines toward door -->
  <g stroke="rgba(124,179,66,0.45)" stroke-width="3" stroke-linecap="round" fill="none">
    <path d="M280 420 C380 400, 480 360, 620 300"/>
    <path d="M300 460 C420 430, 520 380, 640 340"/>
  </g>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · SAÍDA · SALVAÇÃO</text>
  <text x="380" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6" letter-spacing="8">EXIT</text>
  <text x="380" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,220,160,0.95)">exīre · exitus · limiar</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8d8a0">essa é a salvação — sair do aperto</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#b8d070">ofício · caminho · alma · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
