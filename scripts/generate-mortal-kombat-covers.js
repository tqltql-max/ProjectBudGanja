'use strict';

/** Capas 1200×630 — Mortal Kombat + palavras do game / HUD. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const JOBS = [
  {
    file: 'mortal-kombat-cover.jpg',
    eyebrow: 'CADERNO DE JOGO · 4',
    title: 'Mortal Kombat',
    sub: 'o fliperama e as palavras do combate',
    foot: '1992 · Midway · sem lista de golpes'
  },
  {
    file: 'fight-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · GRITO',
    title: 'Fight',
    sub: 'abre o round — nao e briga na rua',
    foot: 'elo Round · Mortal Kombat'
  },
  {
    file: 'round-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · RAUND',
    title: 'Round',
    sub: 'a unidade do combate no ecran',
    foot: 'Fight abre · Finish pode fechar'
  },
  {
    file: 'finish-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · AVISO',
    title: 'Finish',
    sub: 'nome do aviso — nao o fim da pessoa',
    foot: 'Finish Him · Acabalo · Fatality e a cena'
  },
  {
    file: 'fatality-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · FATALLITTY',
    title: 'Fatality',
    sub: 'o fecho letal nomeado',
    foot: '1992 · sem comandos'
  },
  {
    file: 'brutality-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · BRUTALITITI',
    title: 'Brutality',
    sub: 'irma da Fatality — outro fecho',
    foot: 'UMK3 · sem inputs'
  },
  {
    file: 'babality-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · BABALITITY',
    title: 'Babality',
    sub: 'satira MK II — o bebe no ecran',
    foot: 'parodia da Fatality · Friendship eco'
  },
  {
    file: 'hp-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · HUD',
    title: 'HP',
    sub: 'hit points — barra, nao a Vida do lab',
    foot: 'vida no HUD · elo mana / energia'
  },
  {
    file: 'mana-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · HUD',
    title: 'Mana',
    sub: 'reserva de magia — contador, nao rito',
    foot: 'MP · distinto de HP'
  },
  {
    file: 'vida-energia-palavra-cover.jpg',
    eyebrow: 'PALAVRAS · HUD',
    title: 'vida × energia',
    sub: 'duas barras · a Vida do laboratorio e outra',
    foot: 'HP · mana · meter'
  }
];

function svgFor(job) {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#120404"/>
      <stop offset="48%" stop-color="#3a0c0c"/>
      <stop offset="100%" stop-color="#1a0808"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="22%" r="42%">
      <stop offset="0%" stop-color="rgba(220,40,40,0.42)"/>
      <stop offset="100%" stop-color="rgba(220,40,40,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="940" cy="120" r="260" fill="url(#glow)"/>
  <rect x="72" y="64" width="10" height="500" fill="rgba(240,200,80,0.4)"/>
  <text x="108" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f0c850" letter-spacing="3">${job.eyebrow}</text>
  <text x="108" y="280" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f8ecec">${job.title}</text>
  <text x="108" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,210,180,0.95)">${job.sub}</text>
  <text x="108" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#f0c850">${job.foot}</text>
  <text x="108" y="568" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="rgba(240,200,80,0.75)">Valeu !!!</text>
</svg>`);
}

async function main() {
  const sharp = require('sharp');
  const dir = path.join(ROOT, 'imagens/inspecoes');
  fs.mkdirSync(dir, { recursive: true });
  for (const job of JOBS) {
    const out = path.join(dir, job.file);
    await sharp(svgFor(job)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
