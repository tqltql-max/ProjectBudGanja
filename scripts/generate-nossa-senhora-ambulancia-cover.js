'use strict';

/** Capa 1200×630 — nossa senhora, ambulância, sirene, Jesus Cristo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/nossa-senhora-ambulancia-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12060c"/>
      <stop offset="50%" stop-color="#0a1020"/>
      <stop offset="100%" stop-color="#08060e"/>
    </linearGradient>
    <radialGradient id="red" cx="28%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(220,40,50,0.45)"/>
      <stop offset="100%" stop-color="rgba(220,40,50,0)"/>
    </radialGradient>
    <radialGradient id="blue" cx="72%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(40,90,220,0.42)"/>
      <stop offset="100%" stop-color="rgba(40,90,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="250" rx="280" ry="190" fill="url(#red)"/>
  <ellipse cx="860" cy="250" rx="280" ry="190" fill="url(#blue)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e0c090" letter-spacing="3">EXPRESSÕES · CÓDIGO VERMELHO ORAL</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff6e0">nossa senhora</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#ffd0d0">ambulância · sirene</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="38" font-weight="700" fill="#d8e8ff">Jesus Cristo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d8b878">céu + SAMU · acima de jesusudavi</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e0c090">faça o melhor depois da sirene</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
