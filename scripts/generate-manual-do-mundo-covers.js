'use strict';

/** Capas 1200×630 — Manual do Mundo + Iberê + Manual Maker. Azul/âmbar de laboratório, não verde de cultivo. */
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
      <stop offset="0%" stop-color="#0c141c"/>
      <stop offset="55%" stop-color="#122032"/>
      <stop offset="100%" stop-color="#1a2c44"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="980" cy="80" rx="260" ry="160" fill="rgba(90,180,255,0.14)"/>
  <ellipse cx="160" cy="560" rx="280" ry="160" fill="rgba(0,0,0,0.28)"/>
  <g opacity="0.35" fill="none" stroke="#7ec8ff" stroke-width="2">
    <rect x="880" y="220" width="90" height="70" rx="6"/>
    <circle cx="925" cy="255" r="18"/>
    <path d="M925 273 L925 340 M890 300 L960 300"/>
    <path d="M840 180 L880 220 M1010 180 L970 220"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7ec8ff" letter-spacing="5">CANAIS · ESPECIAL</text>
  <text x="80" y="270" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4f8ff">Manual do Mundo</text>
  <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(210,230,255,0.92)">ciência · destaque Manual Maker</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#9bb8d4">@manualdomundo · pessoa ≠ canal</text>
</svg>`;
}

function ibereSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101018"/>
      <stop offset="50%" stop-color="#181828"/>
      <stop offset="100%" stop-color="#24203a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="200" cy="80" rx="220" ry="140" fill="rgba(232,196,92,0.10)"/>
  <ellipse cx="980" cy="520" rx="260" ry="140" fill="rgba(90,180,255,0.10)"/>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c45c" letter-spacing="5">LEGADO · PESSOA</text>
  <text x="80" y="260" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#fff8e8">Iberê Thenório</text>
  <text x="80" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(230,220,190,0.92)">jornalista · cofundador · ecrã de ciência</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">Sorocaba, 1981 · ECA-USP · pessoa ≠ canal</text>
</svg>`;
}

function makerSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14140c"/>
      <stop offset="55%" stop-color="#242018"/>
      <stop offset="100%" stop-color="#3a3020"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g opacity="0.4" fill="none" stroke="#e8c45c" stroke-width="2">
    <rect x="860" y="200" width="220" height="140" rx="8"/>
    <circle cx="910" cy="250" r="14"/>
    <circle cx="970" cy="250" r="14"/>
    <rect x="900" y="290" width="140" height="18" rx="3"/>
    <path d="M820 160 L860 200 M1080 160 L1080 200"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c45c" letter-spacing="5">FORMAÇÃO · DESTAQUE</text>
  <text x="80" y="270" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#fff8e8">Manual Maker</text>
  <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(230,220,190,0.92)">Arduino · 3D · corte a laser</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">série no @manualdomundo · maker ≠ loja</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(canalSvg(), 'imagens/inspecoes/manual-do-mundo-canal-cover.jpg');
  await jpegFromSvg(ibereSvg(), 'imagens/inspecoes/ibere-thenorio-cover.jpg');
  await jpegFromSvg(makerSvg(), 'imagens/inspecoes/manual-maker-cover.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
