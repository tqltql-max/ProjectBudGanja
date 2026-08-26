'use strict';

/** Capa 1200×630 — incineradora (objecto). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/incineradora-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0c0e"/>
      <stop offset="48%" stop-color="#161210"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="58%" r="38%">
      <stop offset="0%" stop-color="rgba(220,90,30,0.38)"/>
      <stop offset="45%" stop-color="rgba(160,70,20,0.16)"/>
      <stop offset="100%" stop-color="rgba(20,20,20,0)"/>
    </radialGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a4048"/>
      <stop offset="100%" stop-color="#1a1e24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="520" cy="390" rx="260" ry="140" fill="url(#glow)"/>
  <rect x="390" y="268" width="220" height="168" rx="6" fill="url(#steel)" stroke="#6a7078" stroke-width="3"/>
  <rect x="430" y="176" width="52" height="96" fill="#2a3038" stroke="#6a7078" stroke-width="3"/>
  <rect x="518" y="210" width="36" height="62" fill="#2a3038" stroke="#6a7078" stroke-width="2"/>
  <path d="M448 168 C456 148 456 128 448 110" fill="none" stroke="rgba(180,180,180,0.35)" stroke-width="8"/>
  <path d="M468 166 C480 144 482 122 472 98" fill="none" stroke="rgba(160,160,160,0.22)" stroke-width="6"/>
  <ellipse cx="500" cy="330" rx="48" ry="28" fill="rgba(240,110,30,0.55)"/>
  <ellipse cx="500" cy="326" rx="22" ry="14" fill="rgba(255,200,80,0.7)"/>
  <ellipse cx="500" cy="448" rx="90" ry="16" fill="rgba(90,80,70,0.55)"/>
  <circle cx="470" cy="444" r="5" fill="rgba(140,130,120,0.7)"/>
  <circle cx="500" cy="448" r="4" fill="rgba(120,110,100,0.65)"/>
  <circle cx="528" cy="444" r="3" fill="rgba(100,95,90,0.6)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4a070" letter-spacing="3.2">OBJECTO · IN- + CINIS · REDUZIR A CINZA</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4ead0">incineradora</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,140,60,0.95)">câmara · chama · cinza</text>
  <text x="600" y="588" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#9ad4c8">≠ cinzeiro · ≠ fogueira · ≠ away · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
