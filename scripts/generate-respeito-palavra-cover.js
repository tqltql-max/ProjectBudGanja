'use strict';

/** Capa 1200×630 — respeito (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/respeito-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1412"/>
      <stop offset="45%" stop-color="#1a2e28"/>
      <stop offset="100%" stop-color="#0a1010"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="50%">
      <stop offset="0%" stop-color="rgba(120,180,150,0.35)"/>
      <stop offset="55%" stop-color="rgba(60,120,100,0.14)"/>
      <stop offset="100%" stop-color="rgba(30,60,50,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="320" rx="320" ry="210" fill="url(#glow)"/>
  <circle cx="520" cy="300" r="42" fill="none" stroke="rgba(200,230,210,0.45)" stroke-width="2.5"/>
  <circle cx="680" cy="300" r="42" fill="none" stroke="rgba(200,230,210,0.45)" stroke-width="2.5"/>
  <path d="M562 300 C590 270 610 270 638 300" fill="none" stroke="rgba(180,220,200,0.4)" stroke-width="2"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8fc4a8" letter-spacing="4">PALAVRAS · RESPECTUS · OLHAR</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#e8f5ee">respeito</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,235,220,0.95)">olhar de novo · prática · sem sermão</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#9ec4b0">faça o melhor com respeito</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8fc4a8">verdade · gesto · convívio</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
