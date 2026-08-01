'use strict';

/** Capas 1200×630 — série Vida (contos familiares). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { PERSONAGENS } = require('../lib/vida-contos-posts.js');

async function jpegFromSvg(svg, outRel) {
  const sharp = require('sharp');
  const out = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

function hubSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2410"/>
      <stop offset="45%" stop-color="#2a3a18"/>
      <stop offset="100%" stop-color="#3a3020"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="220" rx="380" ry="180" fill="url(#glow)"/>
  <circle cx="200" cy="480" r="90" fill="#5a8f3a" opacity="0.45"/>
  <circle cx="280" cy="500" r="70" fill="#3d6b28" opacity="0.5"/>
  <circle cx="980" cy="460" r="100" fill="#8a7020" opacity="0.35"/>
  <circle cx="600" cy="200" r="28" fill="#c9a227"/>
  <ellipse cx="600" cy="270" rx="12" ry="40" fill="#6b9e3e"/>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#c8d8a8" letter-spacing="8">VIDA · CONTO FAMILIAR</text>
  <text x="600" y="440" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#fef9d7">O Laboratório e a Sementinha</text>
  <text x="600" y="510" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8e4c8">ciência · natureza · amizade</text>
</svg>`;
}

function charSvg(label, sub, c1, c2, accent) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1000" cy="100" r="180" fill="${accent}" opacity="0.12"/>
  <circle cx="140" cy="520" r="200" fill="rgba(0,0,0,0.15)"/>
  <circle cx="600" cy="200" r="48" fill="${accent}" opacity="0.85"/>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="rgba(255,255,255,0.7)" letter-spacing="8">VIDA · PERSONAGEM</text>
  <text x="600" y="390" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#ffffff">${label}</text>
  <text x="600" y="460" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(255,255,255,0.88)">${sub}</text>
</svg>`;
}

async function main() {
  await jpegFromSvg(hubSvg(), 'imagens/inspecoes/vida-laboratorio-cover.jpg');
  const labels = {
    'inspecao-personagem-inspetor': ['O Inspetor', 'detetive botânico'],
    'inspecao-personagem-dona-maria': ['Dona Maria', 'mestra do solo'],
    'inspecao-personagem-dj-brisa': ['DJ Brisa', 'voz da harmonia'],
    'inspecao-personagem-joaninha-joana': ['Joaninha Joana', 'guardiã biológica'],
    'inspecao-personagem-three-little-birds': ['Three Little Birds', 'esquadrão da alegria']
  };
  for (const p of PERSONAGENS) {
    const [label, sub] = labels[p.slug] || [p.nome, ''];
    await jpegFromSvg(
      charSvg(label, sub, p.color1, p.color2, p.accent),
      p.coverImage
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
