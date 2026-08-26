'use strict';

/** Capa 1200×630 — lua (Palavras): disco cheio, céu, irmã de lūx. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lua-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#070910"/>
      <stop offset="52%" stop-color="#12182a"/>
      <stop offset="100%" stop-color="#1c1830"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="38%" r="34%">
      <stop offset="0%" stop-color="rgba(236,232,214,0.42)"/>
      <stop offset="50%" stop-color="rgba(180,190,220,0.14)"/>
      <stop offset="100%" stop-color="rgba(8,10,18,0)"/>
    </radialGradient>
    <radialGradient id="disc" cx="42%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#f4f0dc"/>
      <stop offset="55%" stop-color="#d8d2b8"/>
      <stop offset="100%" stop-color="#b8b09a"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="820" cy="236" rx="280" ry="220" fill="url(#glow)"/>
  <circle cx="820" cy="236" r="118" fill="url(#disc)"/>
  <circle cx="778" cy="214" r="18" fill="rgba(168,160,140,0.45)"/>
  <circle cx="848" cy="258" r="12" fill="rgba(168,160,140,0.38)"/>
  <circle cx="802" cy="268" r="9" fill="rgba(160,152,132,0.35)"/>
  <circle cx="200" cy="120" r="2" fill="#c8d0e8"/>
  <circle cx="320" cy="88" r="1.5" fill="#a8b4d0"/>
  <circle cx="460" cy="148" r="2" fill="#d0d8f0"/>
  <circle cx="140" cy="210" r="1.5" fill="#b0bcd8"/>
  <circle cx="500" cy="70" r="1.5" fill="#c0c8e0"/>
  <circle cx="1040" cy="380" r="2" fill="#d8e0f4"/>
  <circle cx="1100" cy="110" r="1.5" fill="#a8b4d0"/>
  <circle cx="90" cy="340" r="1.5" fill="#b8c4dc"/>
  <circle cx="380" cy="300" r="1" fill="#9aaccc"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8c0a8" letter-spacing="4">PALAVRAS · LUNA · A LUMINOSA</text>
  <text x="600" y="478" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4f0e4">lua</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,214,196,0.95)">lūna · irmã de lūx · dar à luz</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,184,168,0.9)">≠ moon · ≠ horoscopo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
