'use strict';

/** Capa 1200×630 — palavra mão esquerda / mão direita (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mao-esquerda-direita-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121610"/>
      <stop offset="45%" stop-color="#1a1814"/>
      <stop offset="100%" stop-color="#0e1210"/>
    </linearGradient>
    <radialGradient id="glowL" cx="32%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(120,160,120,0.22)"/>
      <stop offset="100%" stop-color="rgba(120,160,120,0)"/>
    </radialGradient>
    <radialGradient id="glowR" cx="68%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.22)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="380" cy="270" r="220" fill="url(#glowL)"/>
  <circle cx="820" cy="270" r="220" fill="url(#glowR)"/>
  <!-- left hand silhouette (open, supporting) -->
  <ellipse cx="360" cy="280" rx="95" ry="120" fill="rgba(40,48,42,0.92)" stroke="rgba(140,180,140,0.7)" stroke-width="5"/>
  <text x="360" y="295" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="64" fill="rgba(180,210,180,0.85)">✋</text>
  <!-- right hand silhouette (active) -->
  <ellipse cx="840" cy="280" rx="95" ry="120" fill="rgba(48,42,30,0.92)" stroke="rgba(223,194,98,0.75)" stroke-width="5"/>
  <text x="840" y="295" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="64" fill="rgba(223,194,98,0.9)">✍</text>
  <!-- bridge -->
  <line x1="470" y1="280" x2="730" y2="280" stroke="rgba(200,184,160,0.35)" stroke-width="3" stroke-dasharray="8 10"/>
  <text x="600" y="270" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8b8a0">×</text>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · COMPLEMENTARIDADE</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4efe6">mão esquerda / mão direita</text>
  <text x="600" y="535" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">manus · gesto · cultivo · teclado · ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
