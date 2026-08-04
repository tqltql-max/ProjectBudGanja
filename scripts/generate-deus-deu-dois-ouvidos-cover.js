'use strict';

/** Capa 1200×630 — Deus deu dois ouvidos e uma boca (Expressões). Tipografia pouvi → ouvidos. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/deus-deu-dois-ouvidos-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1418"/>
      <stop offset="50%" stop-color="#182028"/>
      <stop offset="100%" stop-color="#080c10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="50%">
      <stop offset="0%" stop-color="rgba(160,190,200,0.22)"/>
      <stop offset="100%" stop-color="rgba(160,190,200,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="270" fill="url(#glow)"/>
  <text x="600" y="80" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9fc0c8" letter-spacing="4">EXPRESSÕES · ESCUTA × PROPORÇÃO</text>
  <text x="600" y="175" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(170,190,195,0.45)" text-decoration="line-through">dois pouvi</text>
  <text x="600" y="255" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#eef4f6">Deus deu dois ouvidos</text>
  <text x="600" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#eef4f6">e uma boca</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,225,230,0.95)">ouvir 2× · falar 1×</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#8fb0b8">ofício da conversa — sem sermão</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#9fc0c8">Deus abençoe · mensagem · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
