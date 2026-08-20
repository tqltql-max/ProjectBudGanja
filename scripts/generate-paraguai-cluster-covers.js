'use strict';

/** Capas 1200×630 — Paraguai, Paraguaçu, Guerra do Paraguai, troféus, canhão. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const ITEMS = [
  {
    file: 'paraguai-palavra-cover.jpg',
    kicker: 'PALAVRAS · PAÍS',
    title: 'Paraguai',
    sub: 'Paraguay · Paraguái · PARAGYACYY',
    line: 'país ≠ Paraguaçu ≠ guerra',
    foot: 'guerra · troféus · canhão · faça o melhor',
    a: '#1a1810',
    b: '#2a2418',
    c: '#0c0a06',
    glow: 'rgba(196,160,72,0.26)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'paraguacu-palavra-cover.jpg',
    kicker: 'PALAVRAS · TOPÓNIMO',
    title: 'Paraguaçu',
    sub: 'paraguacu · Tupi · Paulista',
    line: 'lugar BR ≠ país Paraguai',
    foot: 'ESAPP · PARAGYACYY · faça o melhor',
    a: '#121810',
    b: '#1c2818',
    c: '#080c06',
    glow: 'rgba(120,180,90,0.24)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'guerra-do-paraguai-palavra-cover.jpg',
    kicker: 'PALAVRAS · ACONTECIMENTO',
    title: 'Guerra',
    sub: 'do Paraguai · 1864–1870',
    line: 'nome ≠ memória única ≠ Paraguaçu',
    foot: 'Tríplice Aliança · troféus · faça o melhor',
    a: '#1c1010',
    b: '#2a1814',
    c: '#0c0606',
    glow: 'rgba(180,80,50,0.26)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'trofeus-de-guerra-palavra-cover.jpg',
    kicker: 'PALAVRAS · ESPÓLIO',
    title: 'Troféus',
    sub: 'tropaeum · museu · memória',
    line: 'objecto ≠ verdade histórica',
    foot: 'El Cristiano · canhão · faça o melhor',
    a: '#181410',
    b: '#282018',
    c: '#0a0806',
    glow: 'rgba(180,130,70,0.28)',
    gold: '#e2c15a',
    cream: '#f4efe4',
    muted: '#d8c890'
  },
  {
    file: 'canhao-palavra-cover.jpg',
    kicker: 'PALAVRAS · PEÇA',
    title: 'Canhão',
    sub: 'canjão · El Cristiano · MHN',
    line: 'tubo ≠ país ≠ devolução feita',
    foot: 'troféus · guerra · Paraguai · faça o melhor',
    a: '#1a140c',
    b: '#2c2010',
    c: '#0c0804',
    glow: 'rgba(200,140,50,0.30)',
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
