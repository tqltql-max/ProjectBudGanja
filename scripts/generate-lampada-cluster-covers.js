'use strict';

/** Capas 1200×630 — lâmpada, esfregar, desejos, três. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const ITEMS = [
  {
    file: 'lampada-palavra-cover.jpg',
    kicker: 'PALAVRAS · VASO',
    title: 'Lâmpada',
    sub: 'lampada · lampas · vaso',
    line: 'luz ≠ génio ≠ gêmeos',
    foot: 'esfregar · desejos · três · faça o melhor',
    a: '#1a1408',
    b: '#2a2210',
    c: '#0c0a06',
    glow: 'rgba(232,190,80,0.28)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'esfregar-palavra-cover.jpg',
    kicker: 'PALAVRAS · GESTO',
    title: 'Esfregar',
    sub: 'fricare · palma · cue',
    line: 'fricção ≠ clique ≠ ligar',
    foot: 'lâmpada · gesto · interruptor · faça o melhor',
    a: '#1c1210',
    b: '#2a1a14',
    c: '#0c0806',
    glow: 'rgba(200,120,70,0.26)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'desejos-palavra-cover.jpg',
    kicker: 'PALAVRAS · VONTADE',
    title: 'Desejos',
    sub: 'desiderium · pack · apetite',
    line: 'apontar ≠ cumprir ≠ génio',
    foot: 'três · lâmpada · esfregar · faça o melhor',
    a: '#10141c',
    b: '#1a2230',
    c: '#0b0d12',
    glow: 'rgba(180,200,230,0.22)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'tres-palavra-cover.jpg',
    kicker: 'PALAVRAS · QUOTA',
    title: 'Três',
    sub: '3 · tres · trēs',
    line: 'teto de conto ≠ método',
    foot: 'desejos · lâmpada · um gesto hoje',
    a: '#141018',
    b: '#221a28',
    c: '#0a080c',
    glow: 'rgba(210,170,230,0.22)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
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
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="${it.cream}">${it.title}</text>
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
