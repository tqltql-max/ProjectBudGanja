'use strict';

/** Capa 1200×630 — Artes · Anjos (Pra quem tem fé), O Rappa. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const YT_ID = 'BPbCLtBl_g4';
const OUT = path.join(ROOT, 'imagens/inspecoes/anjos-pra-quem-tem-fe-cover.jpg');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'BudGanjaCover/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error('HTTP ' + res.statusCode + ' ' + url));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function svgOverlay() {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,12,0.25)"/>
      <stop offset="48%" stop-color="rgba(8,10,12,0.55)"/>
      <stop offset="100%" stop-color="rgba(8,10,12,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="3.2">ARTES · O RAPPA · ≠ PÚLPITO ≠ HUNGRIA</text>
  <text x="600" y="420" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff8e0">Anjos (Pra quem tem fé)</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d7d7d7">Nunca Tem Fim... · 2013</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">a locução ficou no pátio · Valeu !!!</text>
</svg>`);
}

function svgFallback() {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12100c"/>
      <stop offset="50%" stop-color="#1c1810"/>
      <stop offset="100%" stop-color="#0a0c0e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="280" ry="120" fill="rgba(196,163,90,0.18)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="3.2">ARTES · O RAPPA · ≠ PÚLPITO ≠ HUNGRIA</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#fff8e0">Anjos (Pra quem tem fé)</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d7d7d7">Nunca Tem Fim... · 2013</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">pra quem tem fé · a vida nunca tem fim</text>
</svg>`);
}

async function main() {
  const sharp = require('sharp');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  try {
    let thumb;
    try {
      thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/maxresdefault.jpg');
    } catch (_) {
      thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/hqdefault.jpg');
    }
    const base = await sharp(thumb)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.72, saturation: 1.05 })
      .toBuffer();
    await sharp(base)
      .composite([{ input: svgOverlay(), top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(OUT);
  } catch (e) {
    console.warn('Aviso miniatura YT:', e.message);
    await sharp(svgFallback()).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  }

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
