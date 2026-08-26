'use strict';

/** Capa 1200×630 — Palavras · chegou (lat. plicāre; ≠ cheio ≠ cheiro). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/chegou-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12180e"/>
      <stop offset="50%" stop-color="#1c2416"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="44%">
      <stop offset="0%" stop-color="rgba(196,158,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(10,16,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="250" rx="280" ry="160" fill="url(#glow)"/>
  <path d="M80 430 C 220 410, 360 390, 520 370 C 640 356, 740 330, 820 280" fill="none" stroke="rgba(180,150,90,0.55)" stroke-width="8" stroke-linecap="round"/>
  <path d="M80 448 C 230 428, 380 408, 530 388" fill="none" stroke="rgba(90,70,40,0.45)" stroke-width="4"/>
  <rect x="800" y="168" width="22" height="210" rx="3" fill="rgba(196,158,108,0.88)"/>
  <path d="M822 178 L 940 178 L 940 358 L 822 358 Z" fill="rgba(40,48,36,0.85)" stroke="rgba(220,190,130,0.55)" stroke-width="3"/>
  <circle cx="918" cy="268" r="8" fill="rgba(220,180,90,0.9)"/>
  <ellipse cx="300" cy="418" rx="18" ry="8" fill="rgba(160,130,70,0.5)"/>
  <ellipse cx="420" cy="400" rx="16" ry="7" fill="rgba(160,130,70,0.4)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b070" letter-spacing="2.0">PALAVRAS · PLICĀRE · ≠ CHEIO ≠ CHEIRO ≠ GPS ≠ ENTER</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4eee4">chegou</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">pretérito de chegar · pl- → ch-</text>
  <text x="600" y="572" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">lapso: inpecao / palabra · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
