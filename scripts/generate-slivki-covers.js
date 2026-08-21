'use strict';

/** Capas 1200×630 — Slivki Show + Aranha Rodrigo. Creme (slivki) e âmbar, não verde de cultivo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function jpegFromSvg(svg, outRel) {
  const sharp = require('sharp');
  const out = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

function canalSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a120c"/>
      <stop offset="55%" stop-color="#2a1c10"/>
      <stop offset="100%" stop-color="#3a2414"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="980" cy="90" rx="240" ry="150" fill="rgba(232,196,92,0.12)"/>
  <ellipse cx="180" cy="540" rx="280" ry="170" fill="rgba(0,0,0,0.28)"/>
  <g opacity="0.32" fill="none" stroke="#e8c45c" stroke-width="2">
    <circle cx="1020" cy="210" r="18"/>
    <path d="M1020 228 C980 280, 940 320, 900 380"/>
    <path d="M1020 228 C1060 280, 1100 320, 1140 380"/>
    <path d="M1004 218 C940 200, 880 170, 820 140"/>
    <path d="M1036 218 C1100 200, 1160 170, 1188 140"/>
    <path d="M1000 200 C930 150, 880 90, 840 40"/>
    <path d="M1040 200 C1110 150, 1160 90, 1190 40"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c45c" letter-spacing="5">CANAIS · ESPECIAL</text>
  <text x="80" y="270" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#fff8e8">Slivki Show</text>
  <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(230,220,190,0.92)">experiências · destaque Aranha Rodrigo</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">@slivkishowen · aranha ≠ inseto</text>
</svg>`;
}

function rodrigoSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120c08"/>
      <stop offset="50%" stop-color="#1c140c"/>
      <stop offset="100%" stop-color="#2a180c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="200" cy="80" rx="220" ry="140" fill="rgba(232,196,92,0.08)"/>
  <g opacity="0.55" fill="none" stroke="#e8c45c" stroke-width="3">
    <ellipse cx="900" cy="300" rx="42" ry="52"/>
    <ellipse cx="900" cy="368" rx="54" ry="38"/>
    <path d="M858 290 C780 220, 700 160, 620 110"/>
    <path d="M848 270 C760 180, 680 100, 620 40"/>
    <path d="M842 320 C740 300, 640 250, 560 200"/>
    <path d="M848 350 C750 380, 650 430, 560 490"/>
    <path d="M942 290 C1020 220, 1100 160, 1180 110"/>
    <path d="M952 270 C1040 180, 1120 100, 1180 40"/>
    <path d="M958 320 C1060 300, 1160 250, 1200 210"/>
    <path d="M952 350 C1050 380, 1150 430, 1200 500"/>
    <circle cx="888" cy="292" r="6" fill="#e8c45c" stroke="none"/>
    <circle cx="912" cy="292" r="6" fill="#e8c45c" stroke="none"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c45c" letter-spacing="5">ANIMAIS · DESTAQUE</text>
  <text x="80" y="250" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#fff8e8">Aranha Rodrigo</text>
  <text x="80" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(230,220,190,0.92)">saltadora · ecrã · nome próprio</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">Salticidae · aranha ≠ inseto · Slivki Show</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(canalSvg(), 'imagens/inspecoes/slivki-canal-cover.jpg');
  await jpegFromSvg(rodrigoSvg(), 'imagens/inspecoes/aranha-rodrigo-cover.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
