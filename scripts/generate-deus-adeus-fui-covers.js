'use strict';

/** Capas 1200×630 — cluster Deus · A Deus!!! · fui */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function writeCover(rel, svg) {
  const sharp = require('sharp');
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

async function main() {
  await writeCover(
    'imagens/inspecoes/deus-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#1a2228"/>
      <stop offset="100%" stop-color="#0a0e10"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(200,180,120,0.28)"/>
      <stop offset="100%" stop-color="rgba(200,180,120,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="240" r="270" fill="url(#glow)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d2be8c" letter-spacing="4">PALAVRAS · LAT. DEUS ← *DYĒUS</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f5f0e4">Deus</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,190,0.95)">vocábulo do céu · ≠ catecismo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a878">respeito à fé — sem sermão</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d2be8c">A Deus!!! · fui · Valeu !!!</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/adeus-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121016"/>
      <stop offset="50%" stop-color="#1c1824"/>
      <stop offset="100%" stop-color="#0a0810"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(180,160,210,0.22)"/>
      <stop offset="100%" stop-color="rgba(180,160,210,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="580" cy="250" r="250" fill="url(#glow)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b8d8" letter-spacing="4">EXPRESSÕES · A + DEUS</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4eef8">A Deus!!!</text>
  <text x="600" y="310" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="rgba(210,200,220,0.85)">adeus</text>
  <text x="600" y="390" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,230,0.95)">encomendar · sair · adieu / adiós</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8a8c8">grito partido × grafia junta</text>
  <text x="600" y="565" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8b8d8">Deus · fui · Valeu !!!</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/fui-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14110e"/>
      <stop offset="45%" stop-color="#1c1814"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <radialGradient id="glow" cx="58%" cy="42%" r="46%">
      <stop offset="0%" stop-color="rgba(196,160,110,0.22)"/>
      <stop offset="100%" stop-color="rgba(196,160,110,0)"/>
    </radialGradient>
    <linearGradient id="trail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(180,140,90,0.05)"/>
      <stop offset="50%" stop-color="rgba(210,170,110,0.4)"/>
      <stop offset="100%" stop-color="rgba(180,140,90,0.05)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="720" cy="240" r="260" fill="url(#glow)"/>
  <rect x="180" y="400" width="840" height="3" fill="url(#trail)"/>
  <text x="600" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4b896" letter-spacing="4">PALAVRAS · FUĪ · IR × SER</text>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4ebe0">fui</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,210,180,0.95)">pretérito · na rua: Fui!</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4a070">o corpo sai da soleira</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#d4b896">Deus · A Deus!!! · Valeu !!!</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
