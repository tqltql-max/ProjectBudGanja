'use strict';

/** Capas 1200×630 — Divertida Mente (Artes) + emoções (Palavras). */
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

function filmSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2040"/>
      <stop offset="40%" stop-color="#2a3a28"/>
      <stop offset="100%" stop-color="#3a2040"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="220" cy="180" r="70" fill="#f5d76e" opacity="0.85"/>
  <circle cx="400" cy="200" r="55" fill="#6eb5e0" opacity="0.85"/>
  <circle cx="560" cy="170" r="50" fill="#e07070" opacity="0.85"/>
  <circle cx="700" cy="210" r="48" fill="#9b7ed9" opacity="0.85"/>
  <circle cx="840" cy="180" r="52" fill="#7bc96f" opacity="0.85"/>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c8d8ff" letter-spacing="6">ARTES · PIXAR 2015</text>
  <text x="600" y="440" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f8fbff">Divertida Mente</text>
  <text x="600" y="510" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8e4f0">as emoções da Riley · todas importam</text>
</svg>`;
}

function wordSvg(label, sub, c1, c2) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="160" fill="rgba(255,255,255,0.08)"/>
  <circle cx="160" cy="520" r="200" fill="rgba(0,0,0,0.12)"/>
  <text x="600" y="180" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.75)" letter-spacing="8">PALAVRAS · RILEY</text>
  <text x="600" y="320" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#ffffff">${label}</text>
  <text x="600" y="400" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.88)">${sub}</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(filmSvg(), 'imagens/inspecoes/divertida-mente-cover.jpg');
  await jpegFromSvg(
    wordSvg('emoção', 'hub das cinco · Divertida Mente', '#243048', '#1a2838'),
    'imagens/inspecoes/emocao-palavra-cover.jpg'
  );
  await jpegFromSvg(
    wordSvg('alegria', 'amarelo · bem-estar partilhado', '#c9a227', '#8a6a12'),
    'imagens/inspecoes/alegria-palavra-cover.jpg'
  );
  await jpegFromSvg(
    wordSvg('tristeza', 'azul · pedir ajuda também é cuidar', '#3a6ea5', '#1e3a5f'),
    'imagens/inspecoes/tristeza-palavra-cover.jpg'
  );
  await jpegFromSvg(
    wordSvg('raiva', 'vermelho · limite e indignação', '#a83232', '#5c1818'),
    'imagens/inspecoes/raiva-palavra-cover.jpg'
  );
  await jpegFromSvg(
    wordSvg('medo', 'roxo · vigilância que protege', '#6b4ea2', '#2e2048'),
    'imagens/inspecoes/medo-palavra-cover.jpg'
  );
  await jpegFromSvg(
    wordSvg('nojinho', 'verde · aversão com ofício', '#4f8f3a', '#243f1a'),
    'imagens/inspecoes/nojinho-palavra-cover.jpg'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
