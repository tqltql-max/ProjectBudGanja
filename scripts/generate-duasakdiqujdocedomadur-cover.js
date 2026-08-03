'use strict';

/** Capa 1200×630 — duasakdiqujdocedomadur (Expressões · Deus ajuda quem cedo madruga). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(
    ROOT,
    'imagens/inspecoes/duasakdiqujdocedomadur-cover.jpg'
  );
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="40%" stop-color="#2a2218"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="52%">
      <stop offset="0%" stop-color="rgba(255,190,90,0.28)"/>
      <stop offset="55%" stop-color="rgba(200,140,60,0.10)"/>
      <stop offset="100%" stop-color="rgba(255,190,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="210" r="280" fill="url(#glow)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8b860" letter-spacing="3">EXPRESSÕES · DITADO · AURORA</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#fff6e8">duasakdiqujdocedomadur</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,220,190,0.95)">Deus ajuda quem cedo madruga</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d0b080">gesto cedo — depois faça o melhor</text>
  <text x="600" y="540" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#e8b860">caminho · gesto · jesusamando · meudeusdoceu</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
