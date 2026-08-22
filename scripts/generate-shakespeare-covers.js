'use strict';

/** Capas 1200×630 — Shakespeare cluster + Luhrmann + DiCaprio + filmografia. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');
const { YT_ID } = require('../lib/romeu-mais-julieta-filme-inspecao-post.js');

function assetsDir() {
  return path.join(
    process.env.USERPROFILE || 'C:\\Users\\tiago',
    '.cursor',
    'projects',
    'c-Users-tiago-Desktop-ProjectBudGanja',
    'assets'
  );
}

function findDossierSrc(pattern, label) {
  const dir = assetsDir();
  if (!fs.existsSync(dir)) throw new Error('Pasta assets não encontrada: ' + dir);
  const hit = fs.readdirSync(dir).find((n) => pattern.test(n));
  if (!hit) throw new Error(label + ' não encontrado em ' + dir);
  return path.join(dir, hit);
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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

async function ytThumb(id) {
  try {
    return await fetchBuffer('https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg');
  } catch (e) {
    return fetchBuffer('https://i.ytimg.com/vi/' + id + '/hqdefault.jpg');
  }
}

async function writeCover(srcBuf, outName, kicker, title, line) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens', 'inspecoes', outName);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const base = await sharp(srcBuf)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.88, saturation: 0.92 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(6,10,18,0.10)"/>
      <stop offset="52%" stop-color="rgba(6,10,18,0.08)"/>
      <stop offset="100%" stop-color="rgba(6,10,18,0.82)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="6">${kicker}</text>
  <text x="600" y="555" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="34" font-weight="700" fill="#fff8e0">${title}</text>
  <text x="600" y="598" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8b8a0">${line}</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function dossierCover(src, outName, kicker, title, line) {
  await writeCover(fs.readFileSync(src), outName, kicker, title, line);
}

async function main() {
  await dossierCover(
    findDossierSrc(/Dossi.*Shakespeare|Shakespeare-f37620ef/i, 'Dossiê holográfico de Shakespeare'),
    'shakespeare-figura-cover.jpg',
    'PESSOAS · OFÍCIO DA PALAVRA',
    'William Shakespeare',
    '1564–1616 · capa = dossiê holográfico de campo'
  );
  await dossierCover(
    findDossierSrc(/Romeu_e_Julieta-d9451d8b|Romeu_e_Julieta/i, 'Dossiê holográfico de Romeu e Julieta'),
    'romeu-e-julieta-cover.jpg',
    'ARTES · PEÇA',
    'Romeu e Julieta',
    'Verona · capa = dossiê holográfico de campo'
  );

  const thumb = await ytThumb(YT_ID);
  await writeCover(
    thumb,
    'romeu-mais-julieta-filme-cover.jpg',
    'ARTES · CINEMA 1996',
    'Romeu + Julieta',
    'Luhrmann · DiCaprio · Danes · Verona Beach'
  );
  await writeCover(
    thumb,
    'baz-luhrmann-cover.jpg',
    'PESSOAS · RED CURTAIN',
    'Baz Luhrmann',
    'ofício de palco no ecrã · âncora 1996'
  );
  await writeCover(
    thumb,
    'leonardo-dicaprio-cover.jpg',
    'PESSOAS · OFÍCIO DE ECRÃ',
    'Leonardo DiCaprio',
    'pessoa ≠ catálogo ≠ uma obra'
  );
  await writeCover(
    thumb,
    'dicaprio-filmografia-cover.jpg',
    'FILMOGRAFIAS · FICHA 1',
    'DiCaprio · catálogo',
    'inauguração do tipo · lista ≠ trinta filmes'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
