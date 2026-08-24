'use strict';

/** Capa 1200×630 — Pessoas · Robson Oliveira (homenagem · família · Boston). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/robson-oliveira-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1612"/>
      <stop offset="45%" stop-color="#163024"/>
      <stop offset="100%" stop-color="#08100c"/>
    </linearGradient>
    <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#009c3b"/>
      <stop offset="50%" stop-color="#ffdf00"/>
      <stop offset="100%" stop-color="#002776"/>
    </linearGradient>
    <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(232,220,150,0.08)"/>
      <stop offset="50%" stop-color="rgba(232,220,150,0.35)"/>
      <stop offset="100%" stop-color="rgba(232,220,150,0.08)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#stripe)"/>

  <!-- finish road -->
  <rect x="180" y="318" width="840" height="10" fill="url(#road)"/>
  <rect x="980" y="292" width="8" height="62" fill="rgba(255,248,224,0.85)"/>
  <rect x="992" y="292" width="8" height="62" fill="rgba(20,20,20,0.55)"/>

  <!-- house (family) -->
  <path d="M210 268 L258 228 L306 268 V318 H210 Z" fill="none" stroke="rgba(232,220,150,0.7)" stroke-width="2.4"/>
  <rect x="238" y="286" width="22" height="32" fill="none" stroke="rgba(232,220,150,0.55)" stroke-width="1.8"/>

  <!-- three runners: two supporting one (abstract silhouettes) -->
  <g fill="none" stroke="rgba(244,250,246,0.88)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M520 250 L528 278 L512 318"/>
    <path d="M528 278 L548 318"/>
    <circle cx="520" cy="238" r="10"/>
    <path d="M528 278 L580 262"/>

    <path d="M580 248 L588 270 L600 318"/>
    <path d="M588 270 L568 318"/>
    <circle cx="572" cy="236" r="10"/>
    <path d="M588 270 L640 262"/>

    <path d="M650 250 L658 278 L642 318"/>
    <path d="M658 278 L678 318"/>
    <circle cx="650" cy="238" r="10"/>
  </g>

  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#ffdf00" letter-spacing="5">PESSOAS × CASA · DOIS SÃO MAIS FORTES</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#fff8e0">Robson Oliveira</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d7e7d4">família · ofício · Boston · homenagem</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,200,190,0.85)">São Bernardo · o tempo em segundo plano</text>
  <text x="600" y="590" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c8be7a">juntos · faça o melhor · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
