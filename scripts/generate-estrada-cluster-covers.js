'use strict';

/** Capas 1200×630 — cluster estrada / automóvel / bateria / encruzilhada / cruzamento Jesus. */
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

const ESTRADA = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2820"/>
      <stop offset="55%" stop-color="#243828"/>
      <stop offset="100%" stop-color="#0e1610"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <polygon points="520,140 680,140 1100,630 100,630" fill="rgba(60,70,62,0.85)"/>
  <polygon points="590,140 610,140 640,630 560,630" fill="rgba(245,220,90,0.35)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">PALAVRAS · STRATA</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4fff8">estrada</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">via calçada · ≠ caminho</text>
</svg>`;

const AUTOMOVEL = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121820"/>
      <stop offset="50%" stop-color="#1c2838"/>
      <stop offset="100%" stop-color="#0a1016"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="470" width="1200" height="160" fill="#2a3034"/>
  <rect x="0" y="548" width="1200" height="10" fill="rgba(245,220,90,0.45)"/>
  <rect x="360" y="330" width="480" height="120" rx="28" fill="#c8d0d8"/>
  <rect x="430" y="280" width="280" height="70" rx="16" fill="#aeb8c2"/>
  <circle cx="470" cy="460" r="42" fill="#1a1a1a"/>
  <circle cx="470" cy="460" r="22" fill="#6a7278"/>
  <circle cx="730" cy="460" r="42" fill="#1a1a1a"/>
  <circle cx="730" cy="460" r="22" fill="#6a7278"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9bb8d4" letter-spacing="8">OBJECTO · AUTO + MÓVEL</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4f8ff">automóvel</text>
  <text x="600" y="268" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8d4e0">move-se a si · gatilho altomovel</text>
</svg>`;

const BATERIA = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a2218"/>
      <stop offset="100%" stop-color="#0c120e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="390" y="210" width="420" height="250" rx="18" fill="#2e3a30" stroke="#8fd4a0" stroke-width="4"/>
  <rect x="470" y="178" width="70" height="36" rx="6" fill="#c4d0c8"/>
  <rect x="660" y="178" width="70" height="36" rx="6" fill="#f0d060"/>
  <text x="505" y="202" text-anchor="middle" font-size="22" font-weight="700" fill="#1a1a1a" font-family="Segoe UI, Arial, sans-serif">−</text>
  <text x="695" y="204" text-anchor="middle" font-size="22" font-weight="700" fill="#1a1a1a" font-family="Segoe UI, Arial, sans-serif">+</text>
  <rect x="430" y="250" width="340" height="28" rx="4" fill="rgba(143,212,160,0.25)"/>
  <rect x="430" y="298" width="280" height="28" rx="4" fill="rgba(143,212,160,0.4)"/>
  <rect x="430" y="346" width="200" height="28" rx="4" fill="rgba(143,212,160,0.7)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#8fd4a0" letter-spacing="8">OBJECTO · PULSO</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4fff8">bateria</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8e0d0">célula · ≠ tambor · ≠ canhão</text>
</svg>`;

const ENCRUZILHADA = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#241810"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <polygon points="540,0 660,0 660,630 540,630" fill="rgba(70,62,50,0.9)"/>
  <polygon points="0,270 1200,270 1200,360 0,360" fill="rgba(70,62,50,0.9)"/>
  <rect x="592" y="0" width="16" height="630" fill="rgba(245,220,90,0.28)"/>
  <rect x="0" y="307" width="1200" height="16" fill="rgba(245,220,90,0.28)"/>
  <circle cx="600" cy="315" r="22" fill="none" stroke="#e8c45a" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#e8c45a" letter-spacing="8">PALAVRAS · CRUX</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f8f0e0">encruzilhada</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d8c8a8">o sítio da cruz das vias</text>
</svg>`;

const CRUZAMENTO = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1428"/>
      <stop offset="45%" stop-color="#2a1830"/>
      <stop offset="100%" stop-color="#0e1018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <polygon points="560,80 640,80 980,630 220,630" fill="rgba(50,48,58,0.85)"/>
  <rect x="430" y="300" width="340" height="70" fill="rgba(50,48,58,0.85)"/>
  <rect x="586" y="120" width="28" height="220" fill="#e8d48a"/>
  <rect x="530" y="170" width="140" height="28" fill="#e8d48a"/>
  <rect x="250" y="430" width="160" height="44" rx="10" fill="#c8d0d8"/>
  <circle cx="280" cy="480" r="14" fill="#1a1a1a"/>
  <circle cx="380" cy="480" r="14" fill="#1a1a1a"/>
  <rect x="820" y="400" width="90" height="70" rx="8" fill="#2e3a30" stroke="#8fd4a0" stroke-width="3"/>
  <rect x="848" y="388" width="14" height="14" fill="#c4d0c8"/>
  <rect x="868" y="388" width="14" height="14" fill="#f0d060"/>
  <text x="600" y="64" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e8d48a" letter-spacing="6">CRUZAMENTO · LEITO × CRUZ</text>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#f8f0e0">estrada × Jesus Cristo</text>
</svg>`;

async function main() {
  await jpegFromSvg(ESTRADA, 'imagens/inspecoes/estrada-palavra-cover.jpg');
  await jpegFromSvg(AUTOMOVEL, 'imagens/inspecoes/automovel-objeto-cover.jpg');
  await jpegFromSvg(BATERIA, 'imagens/inspecoes/bateria-objeto-cover.jpg');
  await jpegFromSvg(ENCRUZILHADA, 'imagens/inspecoes/encruzilhada-palavra-cover.jpg');
  await jpegFromSvg(CRUZAMENTO, 'imagens/inspecoes/estrada-jesus-cristo-cruzamento-cover.jpg');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
