'use strict';

/** Capa 1200×630 — palavra simbiose (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/simbiose-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101820"/>
      <stop offset="45%" stop-color="#1a3a32"/>
      <stop offset="100%" stop-color="#0a1210"/>
    </linearGradient>
    <radialGradient id="glowA" cx="32%" cy="48%" r="28%">
      <stop offset="0%" stop-color="rgba(96,180,140,0.32)"/>
      <stop offset="100%" stop-color="rgba(96,180,140,0)"/>
    </radialGradient>
    <radialGradient id="glowB" cx="68%" cy="52%" r="28%">
      <stop offset="0%" stop-color="rgba(120,160,200,0.28)"/>
      <stop offset="100%" stop-color="rgba(120,160,200,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="380" cy="300" r="190" fill="url(#glowA)"/>
  <circle cx="820" cy="330" r="190" fill="url(#glowB)"/>
  <ellipse cx="520" cy="340" rx="110" ry="70" fill="rgba(244,255,248,0.06)" stroke="rgba(159,212,192,0.35)" stroke-width="3"/>
  <ellipse cx="680" cy="340" rx="110" ry="70" fill="rgba(230,240,255,0.06)" stroke="rgba(160,190,220,0.35)" stroke-width="3"/>
  <path d="M520 340 Q600 280 680 340" fill="none" stroke="rgba(200,230,210,0.35)" stroke-width="4" stroke-linecap="round"/>
  <path d="M520 340 Q600 400 680 340" fill="none" stroke="rgba(180,200,230,0.3)" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">PALAVRAS · VIVER JUNTOS</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4fff8">simbiose</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">syn · bíos · mutualismo · «nós»</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
