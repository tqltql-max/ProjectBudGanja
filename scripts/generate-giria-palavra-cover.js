'use strict';

/** Capa 1200×630 — palavra gíria (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/giria-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1418"/>
      <stop offset="48%" stop-color="#122028"/>
      <stop offset="100%" stop-color="#080c0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="52%">
      <stop offset="0%" stop-color="rgba(120,190,200,0.28)"/>
      <stop offset="55%" stop-color="rgba(40,80,90,0.10)"/>
      <stop offset="100%" stop-color="rgba(20,30,35,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(140,200,210,0)"/>
      <stop offset="50%" stop-color="rgba(140,200,210,0.55)"/>
      <stop offset="100%" stop-color="rgba(140,200,210,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <ellipse cx="600" cy="268" rx="72" ry="40" fill="none" stroke="rgba(180,220,230,0.35)" stroke-width="3"/>
  <ellipse cx="600" cy="268" rx="28" ry="16" fill="rgba(180,220,230,0.18)"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9fd4dc" letter-spacing="4">PALAVRAS · FALA DE GRUPO · SALA DAS GÍRIAS</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#eef8fa">gíria</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,230,235,0.95)">a orelha cola girino · o animal da poça</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#8ec4cc">γυρῖνος · anival gerino</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9fd4dc">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
