'use strict';

/** Capas 1200×630 — Moçambique e isqueiro BIC. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const ITEMS = [
  {
    file: 'mocambique-palavra-cover.jpg',
    kicker: 'PALAVRAS · PAIS · TONOS',
    title: 'Mocambique',
    sub: 'Mozambique · Msumbiji · Biq',
    line: 'pais ≠ isqueiro BIC ≠ so a ilha',
    foot: 'tonos em BI · esqueiro biq · faca o melhor',
    a: '#061820',
    b: '#0c3040',
    c: '#041018',
    glow: 'rgba(40,180,170,0.28)',
    gold: '#7ec8b8',
    cream: '#e8f4f0',
    muted: '#b8d8c8'
  },
  {
    file: 'isqueiro-bic-palavra-cover.jpg',
    kicker: 'PALAVRAS · OBJECTO · TONOS',
    title: 'isqueiro BIC',
    sub: 'isca + -eiro · 1973 · 42 N',
    line: 'utensilio ≠ pais Mocambique ≠ escada',
    foot: 'esqueiro biq · fogo · faca o melhor',
    a: '#1a0c08',
    b: '#2a140c',
    c: '#0e0806',
    glow: 'rgba(255,140,40,0.40)',
    gold: '#f0a050',
    cream: '#ffe8c8',
    muted: '#d8a070'
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
      <stop offset="50%" stop-color="${it.b}"/>
      <stop offset="100%" stop-color="${it.c}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="44%">
      <stop offset="0%" stop-color="${it.glow}"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="220" r="250" fill="url(#glow)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="${it.gold}" letter-spacing="3">${it.kicker}</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="${it.cream}">${it.title}</text>
  <text x="600" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(232,220,180,0.95)">${it.sub}</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="${it.muted}">${it.line}</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="${it.gold}">${it.foot}</text>
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
