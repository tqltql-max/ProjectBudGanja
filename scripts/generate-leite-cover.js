'use strict';

/** Capa 1200×630 — leite e derivados (hub lácteo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/leite-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0e1c28"/>
      <stop offset="48%" stop-color="#1a3344"/>
      <stop offset="100%" stop-color="#122018"/>
    </linearGradient>
    <radialGradient id="glow" cx="74%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(236,228,210,0.32)"/>
      <stop offset="100%" stop-color="rgba(236,228,210,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <ellipse cx="880" cy="300" rx="70" ry="90" fill="rgba(245,238,220,0.18)" stroke="rgba(245,238,220,0.45)" stroke-width="3"/>
  <ellipse cx="880" cy="248" rx="38" ry="14" fill="rgba(245,238,220,0.22)"/>
  <rect x="848" y="378" width="64" height="90" rx="8" fill="rgba(245,238,220,0.12)" stroke="rgba(245,238,220,0.35)" stroke-width="2"/>
  <ellipse cx="880" cy="478" rx="52" ry="12" fill="rgba(40,70,80,0.45)"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c8dce8" letter-spacing="7">PRODUTOS NOCIVOS · BOS TAURUS</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f7f1e4">leite e derivados</text>
  <text x="600" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8e4dc">ordenha · queijo · iogurte · pó · caseína · prateleira</text>
  <text x="600" y="432" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#a8c0c8">da ordenha à prateleira e o mal à saúde</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
