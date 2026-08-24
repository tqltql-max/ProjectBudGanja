'use strict';

/** Capa 1200×630 — backup (actividade). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/backup-atividade-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#08141c"/>
      <stop offset="50%" stop-color="#102830"/>
      <stop offset="100%" stop-color="#0a1c18"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="44%">
      <stop offset="0%" stop-color="rgba(72,201,160,0.22)"/>
      <stop offset="100%" stop-color="rgba(8,20,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="360" ry="170" fill="url(#glow)"/>
  <rect x="318" y="168" width="150" height="190" rx="10" fill="#1c3038" stroke="#9ad4c8" stroke-width="3"/>
  <rect x="338" y="188" width="110" height="14" rx="3" fill="rgba(154,212,200,0.45)"/>
  <rect x="338" y="214" width="88" height="10" rx="2" fill="rgba(154,212,200,0.28)"/>
  <rect x="338" y="234" width="96" height="10" rx="2" fill="rgba(154,212,200,0.22)"/>
  <text x="393" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#9ad4c8">original</text>
  <path d="M500 260 L678 260" fill="none" stroke="#e8c547" stroke-width="6" marker-end="none"/>
  <polygon points="678,248 708,260 678,272" fill="#e8c547"/>
  <circle cx="790" cy="258" r="78" fill="none" stroke="#c9d4c0" stroke-width="8"/>
  <circle cx="790" cy="258" r="54" fill="none" stroke="rgba(154,212,200,0.35)" stroke-width="4"/>
  <circle cx="790" cy="258" r="16" fill="#1a242c" stroke="#e8c547" stroke-width="3"/>
  <text x="790" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" fill="#e8c547">reserva · CD</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ad4c8" letter-spacing="3.2">ACTIVIDADE · BACK + UP · RESERVA</text>
  <text x="600" y="458" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4ead0">backup</text>
  <text x="600" y="512" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,197,71,0.95)">copiar · provar · poder voltar</text>
  <text x="600" y="562" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec4d4">≠ restore lexical · ≠ save game · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
