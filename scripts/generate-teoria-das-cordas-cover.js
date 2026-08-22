'use strict';

/** Capa 1200×630 — teoria das cordas (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/teoria-das-cordas-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c18"/>
      <stop offset="45%" stop-color="#121428"/>
      <stop offset="100%" stop-color="#0c101c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(140,120,220,0.28)"/>
      <stop offset="50%" stop-color="rgba(80,90,180,0.12)"/>
      <stop offset="100%" stop-color="rgba(10,12,24,0)"/>
    </radialGradient>
    <linearGradient id="str" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(210,190,120,0.15)"/>
      <stop offset="50%" stop-color="rgba(236,214,140,0.95)"/>
      <stop offset="100%" stop-color="rgba(210,190,120,0.15)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="380" ry="210" fill="url(#glow)"/>
  <circle cx="220" cy="120" r="1.8" fill="rgba(200,210,240,0.55)"/>
  <circle cx="340" cy="90" r="1.4" fill="rgba(200,210,240,0.4)"/>
  <circle cx="980" cy="140" r="1.6" fill="rgba(200,210,240,0.5)"/>
  <circle cx="1080" cy="220" r="1.3" fill="rgba(200,210,240,0.35)"/>
  <circle cx="160" cy="400" r="1.5" fill="rgba(200,210,240,0.4)"/>
  <circle cx="1040" cy="480" r="1.4" fill="rgba(200,210,240,0.4)"/>
  <path d="M80 268 C200 268, 280 188, 400 248 S560 328, 680 248 S860 168, 980 248 S1100 328, 1140 268" fill="none" stroke="rgba(120,140,210,0.22)" stroke-width="2"/>
  <path d="M80 288 C200 288, 280 208, 400 268 S560 348, 680 268 S860 188, 980 268 S1100 348, 1140 288" fill="none" stroke="rgba(160,140,220,0.18)" stroke-width="2"/>
  <path d="M80 278 C200 278, 280 198, 400 258 S560 338, 680 258 S860 178, 980 258 S1100 338, 1140 278" fill="none" stroke="url(#str)" stroke-width="5" stroke-linecap="round"/>
  <circle cx="400" cy="258" r="5" fill="#f0e0a8"/>
  <circle cx="680" cy="258" r="5" fill="#f0e0a8"/>
  <circle cx="980" cy="258" r="4" fill="#d8c890"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#b8b0d8" letter-spacing="4">PALAVRAS · FÍSICA · STRING THEORY</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f2eef8">Teoria das cordas</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,214,236,0.9)">a física, não o fio · χορδή</text>
  <text x="600" y="536" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b8d8">programa aberto · ≠ objecto corda</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8890b0">Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
