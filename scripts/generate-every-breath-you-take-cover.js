'use strict';

/** Capa 1200×630 — Artes · Every Breath You Take (The Police). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/every-breath-you-take-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0c"/>
      <stop offset="55%" stop-color="#1a1e24"/>
      <stop offset="100%" stop-color="#2a2420"/>
    </linearGradient>
    <radialGradient id="eye" cx="50%" cy="42%" r="28%">
      <stop offset="0%" stop-color="rgba(220,230,240,0.28)"/>
      <stop offset="100%" stop-color="rgba(220,230,240,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="268" r="210" fill="url(#eye)"/>
  <ellipse cx="600" cy="268" rx="168" ry="78" fill="none" stroke="rgba(230,236,242,0.55)" stroke-width="4"/>
  <ellipse cx="600" cy="268" rx="118" ry="54" fill="none" stroke="rgba(180,196,210,0.4)" stroke-width="3"/>
  <circle cx="600" cy="268" r="36" fill="#0c1014"/>
  <circle cx="612" cy="256" r="10" fill="rgba(240,246,252,0.85)"/>
  <path d="M120 520 L280 470 L440 500 L600 430 L760 490 L920 410 L1080 470" fill="none" stroke="rgba(180,196,210,0.25)" stroke-width="2"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c8d4de" letter-spacing="6">ARTES · CANÇÃO 1983</text>
  <text x="600" y="518" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="38" font-weight="700" fill="#f4f8fc">Every Breath You Take</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c5d0da">The Police · Synchronicity · olhar sem possuir</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
