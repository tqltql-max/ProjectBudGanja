'use strict';

/** Capa 1200×630 — Palavras · feio (lat. foedus; ≠ feito ≠ tratado). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/feio-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#18140e"/>
      <stop offset="52%" stop-color="#221c14"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(180,120,50,0.26)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="230" rx="320" ry="150" fill="url(#glow)"/>
  <ellipse cx="600" cy="250" rx="118" ry="148" fill="none" stroke="rgba(210,170,110,0.55)" stroke-width="5"/>
  <path d="M600 102 L612 250 L600 398" fill="none" stroke="rgba(160,110,60,0.7)" stroke-width="3"/>
  <path d="M490 230 Q 560 210, 600 250 Q 640 290, 710 268" fill="none" stroke="rgba(196,150,90,0.45)" stroke-width="4"/>
  <ellipse cx="260" cy="420" rx="90" ry="36" fill="rgba(70,80,90,0.35)"/>
  <path d="M210 400 C 230 370, 260 360, 290 378 C 310 392, 300 420, 270 430 C 240 438, 200 422, 210 400 Z" fill="rgba(90,100,110,0.4)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8a070" letter-spacing="2.2">PALAVRAS · FOEDUS · ≠ FEITO ≠ PATINHO ≠ TEMPO ≠ INSULTO</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4eee4">feio</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">lat. foedus (adjectivo) · não o tratado</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">lapso: Feio / feito · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
