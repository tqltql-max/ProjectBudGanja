'use strict';

/** Capa 1200×630 — Xiaomi (Palavras). *xioomi* → Xiaomi. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/xiaomi-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1008"/>
      <stop offset="48%" stop-color="#24180c"/>
      <stop offset="100%" stop-color="#0e0a06"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(232,120,40,0.28)"/>
      <stop offset="100%" stop-color="rgba(232,120,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="230" r="260" fill="url(#glow)"/>
  <rect x="528" y="348" width="64" height="118" rx="10" fill="none" stroke="rgba(232,160,90,0.45)" stroke-width="2.5"/>
  <rect x="538" y="358" width="44" height="78" rx="4" fill="none" stroke="rgba(232,160,90,0.28)" stroke-width="1.5"/>
  <circle cx="430" cy="430" r="7" fill="rgba(210,140,50,0.7)"/>
  <circle cx="455" cy="448" r="5" fill="rgba(190,120,40,0.55)"/>
  <circle cx="412" cy="452" r="4.5" fill="rgba(200,130,45,0.5)"/>
  <ellipse cx="442" cy="468" rx="9" ry="5" fill="rgba(180,110,35,0.45)"/>
  <circle cx="760" cy="428" r="7" fill="rgba(210,140,50,0.7)"/>
  <circle cx="738" cy="448" r="5" fill="rgba(190,120,40,0.55)"/>
  <circle cx="782" cy="450" r="4.5" fill="rgba(200,130,45,0.5)"/>
  <ellipse cx="752" cy="468" rx="9" ry="5" fill="rgba(180,110,35,0.45)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e88828" letter-spacing="3">PALAVRAS · MARCA · MILHETO</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe4">Xiaomi</text>
  <text x="600" y="322" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,200,150,0.95)">小米 · milheto · xioomi → Xiaomi</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8b070">grafia certa · sem pedestal</text>
  <text x="600" y="588" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e88828">Jobs · objetos · faça o melhor neste aparelho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
