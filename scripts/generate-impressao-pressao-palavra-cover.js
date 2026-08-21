'use strict';

/** Capa 1200×630 — impressão / pressão (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/impressao-pressao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120c10"/>
      <stop offset="48%" stop-color="#1a1412"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.22)"/>
      <stop offset="55%" stop-color="rgba(180,90,60,0.12)"/>
      <stop offset="100%" stop-color="rgba(18,12,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="460" cy="290" rx="260" ry="190" fill="url(#glow)"/>
  <!-- cooker body -->
  <ellipse cx="460" cy="430" rx="118" ry="22" fill="none" stroke="rgba(223,194,98,0.55)" stroke-width="3"/>
  <path d="M342 250 L342 420 Q342 448 460 448 Q578 448 578 420 L578 250" fill="none" stroke="rgba(232,210,160,0.9)" stroke-width="5"/>
  <!-- lid -->
  <ellipse cx="460" cy="248" rx="128" ry="28" fill="none" stroke="rgba(223,194,98,0.95)" stroke-width="5"/>
  <!-- handles -->
  <path d="M318 300 Q280 300 280 338 Q280 360 318 360" fill="none" stroke="rgba(200,160,90,0.7)" stroke-width="6" stroke-linecap="round"/>
  <path d="M602 300 Q640 300 640 338 Q640 360 602 360" fill="none" stroke="rgba(200,160,90,0.7)" stroke-width="6" stroke-linecap="round"/>
  <!-- weight valve -->
  <rect x="448" y="168" width="24" height="58" rx="4" fill="none" stroke="rgba(232,120,90,0.95)" stroke-width="4"/>
  <ellipse cx="460" cy="164" rx="22" ry="10" fill="none" stroke="rgba(232,120,90,0.95)" stroke-width="4"/>
  <!-- steam -->
  <path d="M430 130 C418 108 438 96 428 78" fill="none" stroke="rgba(232,210,160,0.45)" stroke-width="3" stroke-linecap="round"/>
  <path d="M460 118 C452 94 472 86 464 66" fill="none" stroke="rgba(232,210,160,0.55)" stroke-width="3" stroke-linecap="round"/>
  <path d="M490 130 C502 108 482 96 492 78" fill="none" stroke="rgba(232,210,160,0.45)" stroke-width="3" stroke-linecap="round"/>
  <!-- IN stamp -->
  <circle cx="860" cy="220" r="52" fill="none" stroke="rgba(223,194,98,0.85)" stroke-width="4"/>
  <text x="860" y="232" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" font-weight="700" fill="#dfc262">IN</text>
  <text x="860" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#c8b8a0">impressão</text>
  <!-- P stamp -->
  <circle cx="980" cy="360" r="44" fill="none" stroke="rgba(232,120,90,0.9)" stroke-width="4"/>
  <text x="980" y="376" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#e8785a">P</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="4">PALAVRAS · PREMERE · ESCAPE</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f4efe6">impressão · pressão</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">panela de pressão · válvula de escape</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
