'use strict';

/** Capa 1200×630 — palavra olho (Palavras): oculus × zaroio. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/olho-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1014"/>
      <stop offset="50%" stop-color="#1a2220"/>
      <stop offset="100%" stop-color="#12100c"/>
    </linearGradient>
    <radialGradient id="irisL" cx="50%" cy="48%" r="55%">
      <stop offset="0%" stop-color="rgba(70,140,150,0.85)"/>
      <stop offset="55%" stop-color="rgba(30,70,80,0.7)"/>
      <stop offset="100%" stop-color="rgba(12,18,20,0.2)"/>
    </radialGradient>
    <radialGradient id="irisR" cx="62%" cy="42%" r="55%">
      <stop offset="0%" stop-color="rgba(180,140,70,0.8)"/>
      <stop offset="55%" stop-color="rgba(90,60,30,0.65)"/>
      <stop offset="100%" stop-color="rgba(18,14,10,0.2)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="268" rx="118" ry="72" fill="none" stroke="rgba(220,210,180,0.55)" stroke-width="4"/>
  <ellipse cx="380" cy="268" rx="70" ry="70" fill="url(#irisL)"/>
  <circle cx="380" cy="268" r="26" fill="#0a0c0e"/>
  <circle cx="392" cy="256" r="8" fill="rgba(240,240,230,0.55)"/>
  <ellipse cx="820" cy="268" rx="118" ry="72" fill="none" stroke="rgba(220,200,150,0.55)" stroke-width="4"/>
  <ellipse cx="820" cy="268" rx="70" ry="70" fill="url(#irisR)"/>
  <circle cx="856" cy="248" r="26" fill="#0a0c0e"/>
  <circle cx="868" cy="236" r="8" fill="rgba(240,230,200,0.5)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8c090" letter-spacing="5">PALAVRAS · OCULUS · × ZAROIO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f4f0e4">olho</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,180,0.95)">zaroio · zarolho · o olho que não alinha</text>
  <text x="600" y="534" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.85)">lh → i · ≠ eye · ≠ xingo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
