'use strict';

/** Capa 1200×630 — óculos (objecto). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/oculos-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1218"/>
      <stop offset="48%" stop-color="#182028"/>
      <stop offset="100%" stop-color="#0a0c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(120,180,200,0.22)"/>
      <stop offset="100%" stop-color="rgba(120,180,200,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="320" ry="160" fill="url(#glow)"/>
  <ellipse cx="455" cy="268" rx="108" ry="64" fill="none" stroke="#c9d4c0" stroke-width="8"/>
  <ellipse cx="745" cy="268" rx="108" ry="64" fill="none" stroke="#c9d4c0" stroke-width="8"/>
  <path d="M563 268 Q600 248 637 268" fill="none" stroke="#e8c547" stroke-width="6"/>
  <line x1="347" y1="268" x2="250" y2="230" stroke="#c9d4c0" stroke-width="7"/>
  <line x1="853" y1="268" x2="950" y2="230" stroke="#c9d4c0" stroke-width="7"/>
  <ellipse cx="455" cy="268" rx="70" ry="40" fill="rgba(80,140,160,0.18)"/>
  <ellipse cx="745" cy="268" rx="70" ry="40" fill="rgba(80,140,160,0.18)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec4d4" letter-spacing="3.2">OBJECTO · OCULUS · DIANTE DO OLHO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4ead0">óculos</text>
  <text x="600" y="492" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(232,197,71,0.95)">lentes · armação · hastes</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec4d4">≠ órgão olho · ≠ contacto · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
