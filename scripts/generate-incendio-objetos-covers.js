'use strict';

/** Capas 1200×630 — cluster incêndio / Mars Hydro / Vivosun / objectos. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function card({ file, kicker, title, sub, foot, glow, glow2 }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#120a0a"/>
      <stop offset="48%" stop-color="#1c1410"/>
      <stop offset="100%" stop-color="#0c1018"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="36%" r="38%">
      <stop offset="0%" stop-color="${glow || 'rgba(255,140,60,0.28)'}"/>
      <stop offset="100%" stop-color="rgba(255,140,60,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="28%" cy="62%" r="32%">
      <stop offset="0%" stop-color="${glow2 || 'rgba(80,160,220,0.18)'}"/>
      <stop offset="100%" stop-color="rgba(80,160,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="860" cy="210" r="220" fill="url(#glow)"/>
  <circle cx="300" cy="400" r="190" fill="url(#glow2)"/>
  <text x="600" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c8b8a8" letter-spacing="6">${kicker}</text>
  <text x="600" y="268" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f7f4ee">${title}</text>
  <text x="600" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8cfc4">${sub}</text>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#c4b8a8">${foot}</text>
  <text x="600" y="582" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8a7a6a">Inspetor BudGanja · Valeu !!!</text>
</svg>`;
}

const JOBS = [
  {
    file: 'objetos-perigosos-incendio-cover.jpg',
    kicker: 'PALAVRAS · OBJECTOS · CORTE',
    title: 'controle de incêndio',
    sub: 'perigo × corte × nome de marca',
    foot: 'tenda · fonte · extensão · extintor'
  },
  {
    file: 'mars-hydro-palavra-cover.jpg',
    kicker: 'PALAVRAS · MARS · HYDRO',
    title: 'Mars Hydro',
    sub: 'Marte + água · rasto marshydrobr',
    foot: 'marca ≠ laudo eléctrico',
    glow: 'rgba(200,80,60,0.32)',
    glow2: 'rgba(60,140,200,0.22)'
  },
  {
    file: 'vivosun-palavra-cover.jpg',
    kicker: 'PALAVRAS · VIVO · SUN',
    title: 'Vivosun',
    sub: 'sol vivo no nome · cabo na tenda',
    foot: 'marca ≠ astro',
    glow: 'rgba(255,196,72,0.30)',
    glow2: 'rgba(80,180,90,0.18)'
  },
  {
    file: 'vivosun-verificacao-cover.jpg',
    kicker: 'VERIFICAÇÃO · CATÁLOGO',
    title: 'Vivosun',
    sub: 'AeroLight · tendas · GrowHub · revenda BR',
    foot: 'cruzar com o laboratório',
    glow: 'rgba(255,196,72,0.26)',
    glow2: 'rgba(80,160,220,0.20)'
  },
  {
    file: 'tenda-palavra-cover.jpg',
    kicker: 'PALAVRAS · TENDERE',
    title: 'tenda',
    sub: 'recinto que fecha o calor',
    foot: 'Mylar ≠ cofre'
  },
  {
    file: 'extintor-palavra-cover.jpg',
    kicker: 'PALAVRAS · EXSTINGUERE',
    title: 'extintor',
    sub: 'o último gesto · coluna controle',
    foot: '≠ teatro do cilindro vermelho'
  },
  {
    file: 'incendio-palavra-cover.jpg',
    kicker: 'PALAVRAS · INCENDIUM',
    title: 'incêndio',
    sub: 'o evento · não o elemento',
    foot: 'fogo (focus) ≠ incêndio'
  },
  {
    file: 'fonte-palavra-cover.jpg',
    kicker: 'PALAVRAS · FONS',
    title: 'fonte',
    sub: 'a nascente que agora é o driver',
    foot: 'ponto cego atrás do painel',
    glow2: 'rgba(80,160,220,0.28)'
  },
  {
    file: 'extensao-palavra-cover.jpg',
    kicker: 'PALAVRAS · EXTENDERE',
    title: 'extensão',
    sub: 'esticar a tomada até à tenda',
    foot: 'buracos ≠ ampere'
  },
  {
    file: 'exaustor-palavra-cover.jpg',
    kicker: 'PALAVRAS · EXHAURĪRE',
    title: 'exaustor',
    sub: 'esgotar o ar · não o motor',
    foot: 'circulação ≠ extração',
    glow2: 'rgba(90,180,200,0.24)'
  }
];

async function main() {
  const sharp = require('sharp');
  const dir = path.join(ROOT, 'imagens/inspecoes');
  fs.mkdirSync(dir, { recursive: true });
  for (const job of JOBS) {
    const out = path.join(dir, job.file);
    const svg = Buffer.from(card(job));
    await sharp(svg).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
