'use strict';

/**
 * Gera variantes leves do banner a partir de imagens/background-hero.png.
 * Preserva a composição e a proporção do PNG (sem crop 5:1).
 * Saídas: WebP/AVIF responsivos + JPEG de fallback.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('../lib/paths.js');

const SRC = path.join(ROOT, 'imagens', 'background-hero.png');
const OUT_DIR = path.join(ROOT, 'imagens');
const WIDTHS = [640, 960, 1400];
const META_PATH = path.join(OUT_DIR, 'background-hero.meta.json');
const PIPELINE_ID = 'png-aspect-inside-v1';

async function loadSharp() {
  try {
    return require('sharp');
  } catch (e) {
    throw new Error('sharp em falta — npm install');
  }
}

function fileHash(filePath) {
  return crypto.createHash('sha1').update(fs.readFileSync(filePath)).digest('hex');
}

function kb(n) {
  return Math.round(n / 1024) + ' KB';
}

async function writeVariant(sharp, pipeline, outPath, encoder) {
  let img = pipeline.clone();
  if (encoder === 'webp') {
    img = img.webp({ quality: 78, effort: 5 });
  } else if (encoder === 'avif') {
    img = img.avif({ quality: 55, effort: 4 });
  } else if (encoder === 'jpeg') {
    img = img.jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:2:0' });
  } else {
    throw new Error('encoder desconhecido: ' + encoder);
  }
  await img.toFile(outPath);
  return fs.statSync(outPath).size;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error('imagens/background-hero.png em falta');
  }

  const sharp = await loadSharp();
  const srcHash = fileHash(SRC);
  const meta = {
    source: 'background-hero.png',
    sourceHash: srcHash.slice(0, 12),
    pipeline: PIPELINE_ID,
    builtAt: new Date().toISOString(),
    widths: WIDTHS,
    files: {}
  };

  if (fs.existsSync(META_PATH)) {
    try {
      const prev = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
      const expected = [
        'background-hero.webp',
        'background-hero-960.webp',
        'background-hero-640.webp',
        'background-hero.avif',
        'background-hero-960.avif',
        'background-hero-640.avif',
        'background-hero.jpg'
      ];
      const allExist = expected.every((name) => fs.existsSync(path.join(OUT_DIR, name)));
      if (
        prev &&
        prev.sourceHash === meta.sourceHash &&
        prev.pipeline === PIPELINE_ID &&
        allExist
      ) {
        console.log('optimize-hero: variantes em dia (hash ' + meta.sourceHash + ', ' + PIPELINE_ID + ')');
        return;
      }
    } catch (e) {
      /* regenerar */
    }
  }

  const info = await sharp(SRC).rotate().metadata();
  const srcW = info.width || 1983;
  const srcH = info.height || 793;
  meta.width = srcW;
  meta.height = srcH;
  meta.aspectRatio = Number((srcW / srcH).toFixed(4));

  console.log(
    'optimize-hero: a gerar a partir de background-hero.png ' +
    srcW + '×' + srcH + ' (' + kb(fs.statSync(SRC).size) + ')…'
  );

  for (const w of WIDTHS) {
    const targetW = Math.min(w, srcW);
    const targetH = Math.max(1, Math.round((srcH * targetW) / srcW));
    const resized = sharp(SRC)
      .rotate()
      .withMetadata({ orientation: undefined })
      .resize(targetW, targetH, {
        fit: 'inside',
        withoutEnlargement: true
      });

    const suffix = w === Math.max(...WIDTHS) ? '' : '-' + w;
    const webpName = 'background-hero' + suffix + '.webp';
    const avifName = 'background-hero' + suffix + '.avif';
    const webpPath = path.join(OUT_DIR, webpName);
    const avifPath = path.join(OUT_DIR, avifName);

    const webpSize = await writeVariant(sharp, resized, webpPath, 'webp');
    console.log('  → ' + webpName + ' (' + targetW + '×' + targetH + ', ' + kb(webpSize) + ')');
    meta.files[webpName] = { width: targetW, height: targetH, bytes: webpSize };

    try {
      const avifSize = await writeVariant(sharp, resized, avifPath, 'avif');
      console.log('  → ' + avifName + ' (' + targetW + '×' + targetH + ', ' + kb(avifSize) + ')');
      meta.files[avifName] = { width: targetW, height: targetH, bytes: avifSize };
    } catch (e) {
      console.warn('  aviso AVIF ' + avifName + ':', e.message);
    }

    if (w === Math.max(...WIDTHS)) {
      const jpgPath = path.join(OUT_DIR, 'background-hero.jpg');
      const jpgSize = await writeVariant(sharp, resized, jpgPath, 'jpeg');
      console.log('  → background-hero.jpg (' + targetW + '×' + targetH + ', ' + kb(jpgSize) + ')');
      meta.files['background-hero.jpg'] = { width: targetW, height: targetH, bytes: jpgSize };
    }
  }

  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + '\n', 'utf8');
  const jpgBytes = meta.files['background-hero.jpg'] && meta.files['background-hero.jpg'].bytes;
  const webpBytes = meta.files['background-hero.webp'] && meta.files['background-hero.webp'].bytes;
  console.log(
    'optimize-hero: PNG ' + kb(fs.statSync(SRC).size) +
    ' → JPEG ' + kb(jpgBytes || 0) +
    ' / WebP ' + kb(webpBytes || 0)
  );
}

main().catch((err) => {
  console.error('optimize-hero:', err.message || err);
  process.exitCode = 1;
});
