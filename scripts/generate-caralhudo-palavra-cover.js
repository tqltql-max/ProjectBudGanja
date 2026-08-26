'use strict';

/** Capa 1200×630 — caralhudo × cara de alho × cara de olho (olaho). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/caralhudo-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140c10"/>
      <stop offset="48%" stop-color="#1c1410"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="bulb" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#f4efe4"/>
      <stop offset="55%" stop-color="#e4d4b0"/>
      <stop offset="100%" stop-color="#b89a62"/>
    </radialGradient>
    <radialGradient id="iris" cx="42%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#5a8a4a"/>
      <stop offset="55%" stop-color="#1e3a18"/>
      <stop offset="100%" stop-color="#0a1408"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <!-- garlic bulb as face -->
  <ellipse cx="600" cy="318" rx="168" ry="196" fill="url(#bulb)"/>
  <path d="M600 122 C640 168 656 230 656 300 C656 390 632 470 600 514 C568 470 544 390 544 300 C544 230 560 168 600 122 Z" fill="rgba(255,255,255,0.18)"/>
  <path d="M534 210 C560 250 568 320 560 400" fill="none" stroke="rgba(90,70,40,0.28)" stroke-width="3"/>
  <path d="M666 210 C640 250 632 320 640 400" fill="none" stroke="rgba(90,70,40,0.28)" stroke-width="3"/>
  <!-- one huge eye — cara de olho -->
  <ellipse cx="600" cy="292" rx="92" ry="78" fill="#f7f4ee"/>
  <ellipse cx="600" cy="296" rx="58" ry="52" fill="url(#iris)"/>
  <circle cx="600" cy="298" r="22" fill="#0a0c08"/>
  <circle cx="582" cy="282" r="10" fill="rgba(255,255,255,0.85)"/>
  <path d="M508 268 Q600 232 692 268" fill="none" stroke="rgba(40,28,16,0.45)" stroke-width="7" stroke-linecap="round"/>
  <path d="M518 330 Q600 368 682 330" fill="none" stroke="rgba(40,28,16,0.22)" stroke-width="5" stroke-linecap="round"/>
  <!-- small garlic root tuft -->
  <path d="M572 508 Q600 548 628 508" fill="none" stroke="#c9a227" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="56" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c9a227" letter-spacing="5">PALAVRAS · -UDO · CARA DE OLHO / ALHO</text>
  <text x="600" y="108" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4ebe0">caralhudo</text>
  <text x="200" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,220,150,0.7)">cara</text>
  <text x="200" y="332" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#e8d4a0">+ alho</text>
  <text x="1000" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(180,210,170,0.75)">cara</text>
  <text x="1000" y="332" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#b8d4a8">de olho</text>
  <text x="600" y="572" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(230,214,196,0.92)">olaho — a orelha entre olho e alho · Valeu !!!</text>
  <text x="600" y="606" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="rgba(180,160,140,0.7)">caraculum + -udo · a piada não é o pai</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
