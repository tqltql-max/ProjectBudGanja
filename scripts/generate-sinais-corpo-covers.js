'use strict';

/** Capas 1200×630 — cluster sinais do corpo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function svgWrap(inner) {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c141c"/>
      <stop offset="50%" stop-color="#182230"/>
      <stop offset="100%" stop-color="#101018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  ${inner}
</svg>`);
}

const CARDS = [
  {
    file: 'sinais-palavra-cover.jpg',
    inner: `
  <circle cx="280" cy="320" r="14" fill="rgba(255,196,72,0.85)"/>
  <circle cx="360" cy="250" r="10" fill="rgba(140,190,220,0.8)"/>
  <circle cx="360" cy="390" r="12" fill="rgba(90,180,130,0.75)"/>
  <circle cx="430" cy="320" r="9" fill="rgba(220,160,180,0.8)"/>
  <text x="600" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">PALAVRAS · CAMPO DO CORPO</text>
  <text x="720" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f7fbff">sinais</text>
  <text x="720" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d0dce8">barriga · orelha · mama · cabelo · braços na cabeça</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">o campo, não um único sinal</text>`
  },
  {
    file: 'barriga-palavra-cover.jpg',
    inner: `
  <ellipse cx="300" cy="340" rx="110" ry="80" fill="none" stroke="rgba(255,196,72,0.55)" stroke-width="4"/>
  <text x="720" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">SINAIS · SATISFAÇÃO</text>
  <text x="720" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f7fbff">barriga</text>
  <text x="720" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">o bastante · o chega</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">≠ Barriga de Trigo</text>`
  },
  {
    file: 'orelha-palavra-cover.jpg',
    inner: `
  <ellipse cx="300" cy="310" rx="42" ry="70" fill="none" stroke="rgba(180,210,240,0.6)" stroke-width="4"/>
  <circle cx="248" cy="250" r="7" fill="rgba(255,196,72,0.9)"/>
  <text x="720" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">SINAIS · CURIOSIDADE</text>
  <text x="720" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f7fbff">orelha</text>
  <text x="720" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">pulga atrás · curiosidade</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">inspecionar, não sentenciar</text>`
  },
  {
    file: 'mama-palavra-cover.jpg',
    inner: `
  <circle cx="280" cy="310" r="48" fill="none" stroke="rgba(220,160,180,0.55)" stroke-width="4"/>
  <circle cx="280" cy="310" r="10" fill="rgba(255,196,72,0.7)"/>
  <text x="720" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">SINAIS · ALGO FÁCIL</text>
  <text x="720" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f7fbff">mama</text>
  <text x="720" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">teta · o que está à mão</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">≠ mamão · ≠ mãe</text>`
  },
  {
    file: 'cabelo-palavra-cover.jpg',
    inner: `
  <path d="M250 220 Q300 160 350 220 Q370 300 300 380 Q230 300 250 220" fill="none" stroke="rgba(200,180,140,0.65)" stroke-width="4"/>
  <text x="720" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">SINAIS · DEFERÊNCIA</text>
  <text x="720" y="270" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f7fbff">cabelo</text>
  <text x="720" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">deixa com as mulheres</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4d4e4">elas sabem mais · o lab ouve</text>`
  }
];

async function main() {
  const sharp = require('sharp');
  const dir = path.join(ROOT, 'imagens/inspecoes');
  fs.mkdirSync(dir, { recursive: true });
  for (const card of CARDS) {
    const out = path.join(dir, card.file);
    await sharp(svgWrap(card.inner)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
