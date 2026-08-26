'use strict';

/** Capas 1200×630 — Amyr + Tamara Klink (Legado). */
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
  <ellipse cx="980" cy="120" rx="220" ry="140" fill="rgba(212,175,55,0.12)"/>
  <ellipse cx="160" cy="520" rx="260" ry="160" fill="rgba(0,0,0,0.18)"/>
  <path d="M80 480 Q300 420 520 470 T980 450" fill="none" stroke="rgba(223,194,98,0.35)" stroke-width="3"/>
  <text x="80" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4af37" letter-spacing="6">${opts.eyebrow}</text>
  <text x="80" y="290" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#fef9d7">${opts.title}</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(244,237,216,0.88)">${opts.sub}</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(
    coverSvg({
      c1: '#0c1a24',
      c2: '#1a3040',
      c3: '#2a2818',
      eyebrow: 'LEGADO · CAP. 7',
      title: 'Amyr Klink',
      sub: 'navegador · planeamento · caminho'
    }),
    'imagens/inspecoes/amyr-klink-cover.jpg'
  );
  await jpegFromSvg(
    coverSvg({
      c1: '#0a1820',
      c2: '#163040',
      c3: '#243028',
      eyebrow: 'LEGADO · CAP. 8 · JUNTO DO PAI',
      title: 'Tamara Klink',
      sub: 'Ártico · Passagem Noroeste · legado vivo'
    }),
    'imagens/inspecoes/tamara-klink-cover.jpg'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
