'use strict';

/** Capas 1200×630 — Tanzânia e Taz Manaia. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const ITEMS = [
  {
    file: 'tanzania-palavra-cover.jpg',
    kicker: 'PALAVRAS · PAIS · RELACAO',
    title: 'Tanzania',
    sub: 'Tan + Zan + -ia · 1964 · Taz',
    line: 'pais ≠ Tasmania ≠ Taz-Mania',
    foot: 'Taz Manaia · Uhuru na Umoja · faca o melhor',
    a: '#0a1a14',
    b: '#163428',
    c: '#081018',
    glow: 'rgba(210,170,60,0.32)',
    gold: '#e0c060',
    cream: '#f4ecd4',
    muted: '#c8d4b8'
  },
  {
    file: 'taz-manaia-palavra-cover.jpg',
    kicker: 'PALAVRAS · LAPSO · MANAIA',
    title: 'Taz Manaia',
    sub: 'Taz-Mania · Taz · manaia',
    line: 'persona de teclado ≠ biografia ≠ pais',
    foot: 'relacao com Tanzania · respeitar o manaia',
    a: '#101018',
    b: '#1c2430',
    c: '#0c1014',
    glow: 'rgba(50,170,150,0.30)',
    gold: '#7ec8b0',
    cream: '#e8f4ee',
    muted: '#b0c8c0'
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
