'use strict';

/** Capa 1200×630 — palavra pato (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pato-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1f2d"/>
      <stop offset="45%" stop-color="#1a3a4a"/>
      <stop offset="100%" stop-color="#0a1418"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(80,160,190,0.18)"/>
      <stop offset="100%" stop-color="rgba(20,60,80,0.35)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="900" cy="480" rx="320" ry="90" fill="url(#water)"/>
  <ellipse cx="880" cy="470" rx="260" ry="40" fill="none" stroke="rgba(180,220,230,0.2)" stroke-width="2"/>
  <ellipse cx="860" cy="400" rx="70" ry="38" fill="rgba(230,200,120,0.55)"/>
  <ellipse cx="900" cy="385" rx="28" ry="22" fill="rgba(230,200,120,0.65)"/>
  <path d="M920 378 Q955 365 970 390" fill="none" stroke="rgba(255,210,100,0.7)" stroke-width="5" stroke-linecap="round"/>
  <circle cx="908" cy="380" r="4" fill="rgba(20,30,40,0.8)"/>
  <path d="M790 410 Q820 395 850 408" fill="none" stroke="rgba(230,200,120,0.35)" stroke-width="8" stroke-linecap="round"/>
  <circle cx="220" cy="120" r="100" fill="rgba(255,255,255,0.03)"/>
  <text x="600" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9ec9d4" letter-spacing="8">PALAVRAS · ÁGUA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f2fafc">pato</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5dce4">ave · culpa · tucupi</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
