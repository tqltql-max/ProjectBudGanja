'use strict';

/** Capa 1200×630 — palavra backspace (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/backspace-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#141018"/>
      <stop offset="50%" stop-color="#1a1614"/>
      <stop offset="100%" stop-color="#0c1012"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="40%" r="42%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.20)"/>
      <stop offset="55%" stop-color="rgba(180,80,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="260" r="250" fill="url(#glow)"/>
  <!-- key silhouette -->
  <rect x="380" y="210" width="440" height="140" rx="22" fill="rgba(30,34,36,0.95)" stroke="rgba(223,194,98,0.75)" stroke-width="6"/>
  <text x="520" y="295" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700" fill="#f4efe6">⌫</text>
  <text x="680" y="290" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="#dfc262" letter-spacing="2">BACKSPACE</text>
  <!-- fading letters being erased -->
  <text x="420" y="400" font-family="Georgia, Times New Roman, serif" font-size="26" fill="rgba(200,184,160,0.55)">e r r o</text>
  <text x="520" y="400" font-family="Georgia, Times New Roman, serif" font-size="26" fill="rgba(200,184,160,0.28)">r</text>
  <text x="545" y="400" font-family="Georgia, Times New Roman, serif" font-size="26" fill="rgba(180,80,70,0.55)">·</text>
  <text x="570" y="400" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(200,184,160,0.35)">tudo de ruim?</text>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="7">PALAVRAS · INVENÇÃO / APAGAR</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">backspace</text>
  <text x="600" y="555" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">back + space · tecla · verdade · ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
