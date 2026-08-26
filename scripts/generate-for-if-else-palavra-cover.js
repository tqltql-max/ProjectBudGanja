'use strict';

/** Capa 1200×630 — for / if / else (Palavras): aula 0 de programar. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/for-if-else-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1218"/>
      <stop offset="48%" stop-color="#142028"/>
      <stop offset="100%" stop-color="#0a0e12"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="42%" r="50%">
      <stop offset="0%" stop-color="rgba(90,190,210,0.22)"/>
      <stop offset="100%" stop-color="rgba(90,190,210,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="78%" cy="26%" r="34%">
      <stop offset="0%" stop-color="rgba(220,180,90,0.16)"/>
      <stop offset="100%" stop-color="rgba(220,180,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="430" cy="260" r="270" fill="url(#glow)"/>
  <circle cx="920" cy="170" r="180" fill="url(#glow2)"/>
  <rect x="72" y="150" width="268" height="310" rx="8" fill="none" stroke="rgba(120,210,220,0.4)" stroke-width="1.6"/>
  <text x="96" y="192" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(140,220,230,0.78)">if (humido) {</text>
  <text x="114" y="228" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,210,180,0.7)">// nao regar</text>
  <text x="96" y="264" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(140,220,230,0.78)">} else {</text>
  <text x="114" y="300" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(220,190,110,0.78)">// regar</text>
  <text x="96" y="336" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(140,220,230,0.78)">}</text>
  <text x="96" y="384" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(160,210,180,0.55)">for (i=1; i&lt;=4; i++)</text>
  <text x="96" y="420" font-family="Consolas, Courier New, monospace" font-size="15" fill="rgba(140,220,230,0.5)">exit 0</text>
  <text x="640" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec8d4" letter-spacing="3.2">PALAVRAS · AULA 0 · TECNOLOGIA</text>
  <text x="700" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="54" font-weight="700" fill="#eef6f8">for / if / else</text>
  <text x="700" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(200,230,235,0.95)">decidir · o outro caminho · repetir com fim</text>
  <text x="700" y="488" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="21" fill="#a8d0d8">perguntar, escolher, voltar — e parar</text>
  <text x="700" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8ec8d4">script · loop · interruptor · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
