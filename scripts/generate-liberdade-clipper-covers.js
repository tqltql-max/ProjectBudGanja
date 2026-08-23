'use strict';

/** Capas 1200×630 — liberdade · isqueiro Clipper. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const ITEMS = [
  {
    file: 'liberdade-palavra-cover.jpg',
    kicker: 'PALAVRAS · LĪBERTĀS · SALAS',
    title: 'liberdade',
    sub: 'livre · libre · ≠ bairro ≠ filme ≠ DSL',
    line: 'o nome — todas as salas, nenhuma fundida',
    foot: 'Cantouou · Ufa!!! · Valeu !!!',
    a: '#101418',
    b: '#182028',
    c: '#0c1014',
    glow: 'rgba(200,180,90,0.28)',
    gold: '#d8c070',
    cream: '#f4eee4',
    muted: '#c8b898'
  },
  {
    file: 'isqueiro-clipper-palavra-cover.jpg',
    kicker: 'PALAVRAS · ISQUEIRO · RECARGÁVEL',
    title: 'Clipper',
    sub: 'Flamagas · ≠ cabelo ≠ navio ≠ clipe',
    line: 'irmão do BIC — outra casa, o mesmo género',
    foot: 'isqueiro · fogo · Valeu !!!',
    a: '#0c1810',
    b: '#14241a',
    c: '#08120c',
    glow: 'rgba(80,200,120,0.32)',
    gold: '#8ed8a0',
    cream: '#e8ffe8',
    muted: '#a8d0b0'
  }
];

async function main() {
  const sharp = require('sharp');
  const dir = path.join(ROOT, 'imagens/inspecoes');
  fs.mkdirSync(dir, { recursive: true });

  for (const it of ITEMS) {
    const svg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${it.a}"/>
      <stop offset="55%" stop-color="${it.b}"/>
      <stop offset="100%" stop-color="${it.c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="${it.glow}"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="180" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="${it.gold}" letter-spacing="3">${it.kicker}</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="${it.cream}">${it.title}</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,220,200,0.95)">${it.sub}</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="${it.muted}">${it.line}</text>
  <text x="600" y="545" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="${it.gold}">${it.foot}</text>
</svg>`);
    const out = path.join(dir, it.file);
    await sharp(svg).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
