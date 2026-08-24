'use strict';

/** Capa 1200×630 — jogar areia (Expressões · pátio). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/jogar-areia-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a140c"/>
      <stop offset="50%" stop-color="#2a2214"/>
      <stop offset="100%" stop-color="#0e0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="32%" cy="58%" r="46%">
      <stop offset="0%" stop-color="rgba(210,170,80,0.34)"/>
      <stop offset="100%" stop-color="rgba(14,12,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="400" rx="280" ry="170" fill="url(#glow)"/>
  <ellipse cx="360" cy="490" rx="230" ry="36" fill="rgba(120,90,40,0.55)"/>
  <circle cx="290" cy="430" r="5" fill="rgba(220,180,90,0.9)"/>
  <circle cx="330" cy="448" r="4" fill="rgba(200,160,70,0.85)"/>
  <circle cx="370" cy="438" r="6" fill="rgba(230,190,100,0.88)"/>
  <circle cx="410" cy="458" r="3.5" fill="rgba(190,150,70,0.9)"/>
  <circle cx="350" cy="468" r="4.5" fill="rgba(210,170,80,0.86)"/>
  <circle cx="430" cy="430" r="5" fill="rgba(180,140,60,0.88)"/>
  <circle cx="310" cy="470" r="3" fill="rgba(230,200,120,0.8)"/>
  <path d="M250 300 C 280 250, 340 240, 390 280 C 410 296, 398 320, 368 328 C 340 336, 300 320, 270 300 Z" fill="rgba(196,158,108,0.92)"/>
  <path d="M368 328 C 400 300, 450 310, 470 350 C 482 372, 458 390, 428 384 C 400 378, 380 352, 368 328 Z" fill="rgba(176,138,90,0.9)"/>
  <path d="M390 280 C 420 250, 460 268, 448 300" fill="none" stroke="rgba(232,204,150,0.4)" stroke-width="3"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4b878" letter-spacing="2.2">EXPRESSÕES · PÁTIO · ≠ SABOTAGEM-MANUAL ≠ VENTILADOR ≠ PRAIA</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4eee4">jogar areia</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,210,170,0.95)">grão no jogo alheio · o atrito entra</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">irmã de baixar a bola · ≠ ajudar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
