'use strict';

/** Capa 1200×630 — script (Palavras): sequência escrita. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/script-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1210"/>
      <stop offset="48%" stop-color="#15201c"/>
      <stop offset="100%" stop-color="#0a0e0c"/>
    </linearGradient>
    <radialGradient id="glow" cx="42%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(120,200,160,0.22)"/>
      <stop offset="100%" stop-color="rgba(120,200,160,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="78%" cy="28%" r="32%">
      <stop offset="0%" stop-color="rgba(220,180,90,0.16)"/>
      <stop offset="100%" stop-color="rgba(220,180,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="480" cy="250" r="260" fill="url(#glow)"/>
  <circle cx="900" cy="180" r="170" fill="url(#glow2)"/>
  <rect x="86" y="168" width="228" height="268" rx="8" fill="none" stroke="rgba(140,210,170,0.38)" stroke-width="1.6"/>
  <text x="118" y="208" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,220,180,0.72)">&gt; scribere</text>
  <text x="118" y="242" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,220,180,0.58)">&gt; sequencia</text>
  <text x="118" y="276" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,220,180,0.72)">&gt; seguir</text>
  <text x="118" y="310" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(220,190,110,0.7)"># ≠ destino</text>
  <text x="118" y="354" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,220,180,0.5)">exit 0</text>
  <path d="M980 210 c8 -40 28 -62 52 -70" fill="none" stroke="#d4c070" stroke-width="2.2" opacity="0.8"/>
  <path d="M1032 140 l18 8 l-6 22 z" fill="#d4c070" opacity="0.85"/>
  <text x="640" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec4a8" letter-spacing="3.2">PALAVRAS · LAT. SCRĪPTUM · SEQUÊNCIA</text>
  <text x="640" y="262" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#eef8f2">script</text>
  <text x="640" y="338" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="rgba(200,230,210,0.95)">escrito · roteiro · código a seguir</text>
  <text x="640" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#a8d4bc">a vida não é o filme — o lab escreve o rasto</text>
  <text x="640" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8ec4a8">pattern · skill · commitar · opsert · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
