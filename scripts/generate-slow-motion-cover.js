'use strict';

/** Capa 1200×630 — Expressões · slow motion. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/slow-motion-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="50%" stop-color="#121c24"/>
      <stop offset="100%" stop-color="#1a1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="46%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(220,170,70,0.26)"/>
      <stop offset="70%" stop-color="rgba(40,70,80,0.08)"/>
      <stop offset="100%" stop-color="rgba(10,16,20,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(220,180,90,0)"/>
      <stop offset="50%" stop-color="rgba(220,180,90,0.55)"/>
      <stop offset="100%" stop-color="rgba(220,180,90,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="560" cy="230" rx="360" ry="180" fill="url(#glow)"/>
  <rect x="210" y="168" width="92" height="118" fill="none" stroke="rgba(230,210,150,0.28)" stroke-width="2"/>
  <rect x="322" y="158" width="108" height="138" fill="none" stroke="rgba(230,210,150,0.40)" stroke-width="2"/>
  <rect x="454" y="148" width="128" height="158" fill="none" stroke="rgba(230,210,150,0.62)" stroke-width="3"/>
  <rect x="608" y="158" width="108" height="138" fill="none" stroke="rgba(230,210,150,0.40)" stroke-width="2"/>
  <rect x="740" y="168" width="92" height="118" fill="none" stroke="rgba(230,210,150,0.28)" stroke-width="2"/>
  <path d="M200 420 C340 360, 500 460, 680 340 C820 250, 960 390, 1080 300" fill="none" stroke="rgba(220,180,90,0.32)" stroke-width="3"/>
  <rect x="200" y="448" width="800" height="2" fill="url(#bar)"/>
  <text x="600" y="76" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8c078" letter-spacing="4">EXPRESSÕES · ECRÃ · GESTO ESTICADO</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f6f0e0">slow motion</text>
  <text x="600" y="498" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(236,226,200,0.95)">motion  ≠  emotion  ·  ≠  time-lapse</text>
  <text x="600" y="556" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#d8c078">câmera lenta · o relógio não para</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
