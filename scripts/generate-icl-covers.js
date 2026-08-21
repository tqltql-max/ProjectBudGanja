'use strict';

/** Capas 1200×630 — ICL Cursos + canal YouTube. Índigo / oiro (saber), não verde de cultivo. */
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

function coverSvg(opts) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${opts.c1}"/>
      <stop offset="55%" stop-color="${opts.c2}"/>
      <stop offset="100%" stop-color="${opts.c3}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="1000" cy="80" rx="260" ry="160" fill="rgba(232,196,92,0.10)"/>
  <ellipse cx="160" cy="560" rx="280" ry="170" fill="rgba(0,0,0,0.28)"/>
  <g opacity="0.22" fill="none" stroke="#e8c45c" stroke-width="2">
    <rect x="920" y="380" width="90" height="120" rx="4"/>
    <rect x="1018" y="360" width="90" height="140" rx="4"/>
    <rect x="1116" y="400" width="70" height="100" rx="4"/>
    <circle cx="1080" cy="160" r="54"/>
  </g>
  <text x="80" y="88" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e8c45c" letter-spacing="5">${opts.eyebrow}</text>
  <text x="80" y="270" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#fff8e8">${opts.title}</text>
  <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="rgba(230,220,190,0.92)">${opts.sub}</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4b48a">${opts.foot}</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(
    coverSvg({
      c1: '#0c1018',
      c2: '#161c2e',
      c3: '#1a1420',
      eyebrow: 'FORMAÇÃO · CURSOS',
      title: 'ICL Cursos',
      sub: 'Instituto Conhecimento Liberta · assinatura',
      foot: 'icl.com.br · cursos ≠ canal · 2020'
    }),
    'imagens/inspecoes/icl-cursos-cover.jpg'
  );
  await jpegFromSvg(
    coverSvg({
      c1: '#0a0e16',
      c2: '#12182a',
      c3: '#1c1524',
      eyebrow: 'CANAIS · YOUTUBE',
      title: 'ICL',
      sub: 'jornalismo ao vivo · arquivo de ecrã',
      foot: '@institutoconhecimentoliberta · cursos ≠ canal'
    }),
    'imagens/inspecoes/icl-canal-cover.jpg'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
