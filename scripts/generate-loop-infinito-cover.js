'use strict';

/** Capa 1200×630 — loop infinito (Expressões) + loop (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function writeCover(outRel, title, subtitle, kind) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const eyebrow = kind === 'palavra' ? 'PALAVRAS · LAÇO · VOLTA' : 'EXPRESSÕES · PATTERN · SEM SAÍDA';
  const infMark = kind === 'palavra' ? '' : `<text x="600" y="318" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" fill="rgba(220,200,120,0.95)">∞</text>`;

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="55%" stop-color="#141820"/>
      <stop offset="100%" stop-color="#10140c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="44%" r="40%">
      <stop offset="0%" stop-color="rgba(200,170,80,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,16,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="280" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M 430 300 C 430 210 520 210 600 300 C 680 390 770 390 770 300 C 770 210 680 210 600 300 C 520 390 430 390 430 300" fill="none" stroke="rgba(170,210,160,0.9)" stroke-width="9" stroke-linecap="round"/>
  ${infMark}
  <text x="600" y="64" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">${eyebrow}</text>
  <text x="600" y="545" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" font-weight="700" fill="#f4f0e4">${title}</text>
  <text x="600" y="588" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(210,230,220,0.9)">${subtitle}</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await writeCover(
    'imagens/inspecoes/loop-infinito-cover.jpg',
    'loop infinito',
    'o pattern que não sai · ando, indo, vindo, voltando',
    'expressao'
  );
  await writeCover(
    'imagens/inspecoes/loop-palavra-cover.jpg',
    'loop',
    'laço que regressa · ainda não é o infinito',
    'palavra'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
