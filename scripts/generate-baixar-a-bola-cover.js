'use strict';

/** Capa 1200×630 — baixar a bola (Expressões · pátio). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/baixar-a-bola-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1a12"/>
      <stop offset="48%" stop-color="#163022"/>
      <stop offset="100%" stop-color="#0a120e"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="62%" r="42%">
      <stop offset="0%" stop-color="rgba(90,180,80,0.32)"/>
      <stop offset="100%" stop-color="rgba(10,16,12,0)"/>
    </radialGradient>
    <radialGradient id="ball" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#f4eee0"/>
      <stop offset="55%" stop-color="#c8b070"/>
      <stop offset="100%" stop-color="#6a5428"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="820" cy="400" rx="280" ry="160" fill="url(#glow)"/>
  <ellipse cx="820" cy="470" rx="220" ry="28" fill="rgba(20,40,24,0.55)"/>
  <circle cx="820" cy="338" r="86" fill="url(#ball)" stroke="rgba(240,230,200,0.45)" stroke-width="3"/>
  <path d="M760 310 C 790 300, 850 300, 880 322" fill="none" stroke="rgba(40,32,16,0.45)" stroke-width="4"/>
  <path d="M748 350 C 790 368, 850 368, 890 348" fill="none" stroke="rgba(40,32,16,0.4)" stroke-width="4"/>
  <path d="M820 252 L 820 292" fill="none" stroke="rgba(180,220,160,0.55)" stroke-width="3" stroke-linecap="round"/>
  <path d="M808 282 L 820 292 L 832 282" fill="none" stroke="rgba(180,220,160,0.55)" stroke-width="3" stroke-linecap="round"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec890" letter-spacing="2.4">EXPRESSÕES · PÁTIO · ≠ HUMILHAR ≠ BOLA PRA FRENTE ≠ PISAR NA BOLA</text>
  <text x="600" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="50" font-weight="700" fill="#f4eee4">baixar a bola</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,230,210,0.95)">orgulho no chão · o ritmo desce</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b8d0a8">irmã de jogar areia · inverso do empinar</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
