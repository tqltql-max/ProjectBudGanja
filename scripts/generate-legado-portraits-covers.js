'use strict';

/**
 * Gera capas 1200×630 com retratos públicos:
 * - Eliana Rodrigues (CEE/UNIFESP)
 * - Gabrielle Dainezi (portal UNIFESP / CannaPortugal)
 * - CEBRID (retrato institucional Carlini — equipe CEBRID)
 *
 * Uso: node scripts/generate-legado-portraits-covers.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    throw new Error('sharp em falta — npm install');
  }

  const srcDir = path.join(ROOT, 'imagens', 'inspecoes', '_src');
  const outDir = path.join(ROOT, 'imagens', 'inspecoes');
  fs.mkdirSync(outDir, { recursive: true });

  async function coverFromPortrait(opts) {
    const src = path.join(srcDir, opts.src);
    if (!fs.existsSync(src)) throw new Error('fonte em falta: ' + opts.src);

    const meta = await sharp(src).metadata();
    const w = meta.width || 1;
    const h = meta.height || 1;

    let extract = null;
    if (opts.crop) {
      const left = Math.max(0, Math.round(w * opts.crop.left));
      const top = Math.max(0, Math.round(h * opts.crop.top));
      const width = Math.min(w - left, Math.round(w * opts.crop.width));
      const height = Math.min(h - top, Math.round(h * opts.crop.height));
      extract = { left, top, width, height };
    }

    let pipeline = sharp(src).rotate();
    if (extract) pipeline = pipeline.extract(extract);

    const base = await pipeline
      .resize(1200, 630, { fit: 'cover', position: opts.position || 'attention' })
      .modulate({ brightness: opts.brightness != null ? opts.brightness : 0.78, saturation: 0.92 })
      .toBuffer();

    const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.12)"/>
      <stop offset="45%" stop-color="rgba(8,10,9,0.35)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.88)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="360" width="8" height="180" fill="#d4af37"/>
  <text x="120" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="5">${opts.eyebrow}</text>
  <text x="120" y="475" font-family="Segoe UI, Arial, sans-serif" font-size="${opts.titleSize || 46}" font-weight="800" fill="#fff8e0">${opts.title}</text>
  <text x="120" y="525" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">${opts.subtitle}</text>
</svg>`);

    const outPath = path.join(outDir, opts.out);
    await sharp(base)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toFile(outPath);

    // Retrato limpo (corpo do artigo) — sem tipografia
    if (opts.portraitOut) {
      let p = sharp(src).rotate();
      if (extract) p = p.extract(extract);
      await p
        .resize(900, 900, { fit: 'cover', position: opts.position || 'attention' })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(path.join(outDir, opts.portraitOut));
    }

    const size = fs.statSync(outPath).size;
    console.log('OK:', path.relative(ROOT, outPath), '(' + Math.round(size / 1024) + ' KB)');
  }

  // Eliana — foto oficial CEE (trabalho de campo); foco no rosto/torso
  await coverFromPortrait({
    src: 'eliana-cee.jpg',
    out: 'eliana-rodrigues-cover.jpg',
    portraitOut: 'eliana-rodrigues-portrait.jpg',
    eyebrow: 'LEGADO · CEE / UNIFESP',
    title: 'Profa. Dra. Eliana Rodrigues',
    subtitle: 'CEE · SIEX · CANABinALL',
    titleSize: 42,
    crop: { left: 0.22, top: 0.0, width: 0.55, height: 0.55 },
    position: 'top',
    brightness: 0.86
  });

  // Gabrielle — portal UNIFESP (entrega CannaPortugal); foco no rosto + prémio
  await coverFromPortrait({
    src: 'gabrielle-premio1.png',
    out: 'gabrielle-dainezi-cover.jpg',
    portraitOut: 'gabrielle-dainezi-portrait.jpg',
    eyebrow: 'LEGADO · CURSO UNIFESP',
    title: 'Gabrielle Dainezi',
    subtitle: 'Coordenação · CannaPortugal 2025',
    titleSize: 48,
    crop: { left: 0.02, top: 0.0, width: 0.48, height: 0.72 },
    position: 'top',
    brightness: 0.84
  });

  // CEBRID — retrato institucional do fundador (página equipe CEBRID)
  // Cover composto: fundo escuro + retrato à direita (evita corte do rosto no 1200×630)
  {
    const src = path.join(srcDir, 'cebrid-carlini.png');
    const portraitOut = path.join(outDir, 'cebrid-portrait.jpg');
    const coverOut = path.join(outDir, 'cebrid-cover.jpg');

    await sharp(src)
      .rotate()
      .resize(900, 900, { fit: 'cover', position: 'north' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(portraitOut);

    const portraitBuf = await sharp(src)
      .rotate()
      .resize(560, 630, { fit: 'cover', position: 'north' })
      .modulate({ brightness: 0.9, saturation: 0.95 })
      .toBuffer();

    const canvas = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 14, g: 18, b: 16 }
      }
    })
      .jpeg()
      .toBuffer();

    const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(14,18,16,0)"/>
      <stop offset="55%" stop-color="rgba(14,18,16,0)"/>
      <stop offset="100%" stop-color="rgba(14,18,16,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <rect x="80" y="200" width="8" height="240" fill="#d4af37"/>
  <text x="120" y="260" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="5">FORMAÇÃO · UNIFESP</text>
  <text x="120" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="800" fill="#fff8e0">CEBRID</text>
  <text x="120" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#d7d7d7">Instituto Professor Elisaldo Carlini</text>
  <text x="120" y="455" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#b8b8b8">Centro · informação · medicina canabinoide</text>
</svg>`);

    await sharp(canvas)
      .composite([
        { input: portraitBuf, top: 0, left: 640 },
        { input: overlay, top: 0, left: 0 }
      ])
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toFile(coverOut);

    console.log('OK:', path.relative(ROOT, coverOut), '(' + Math.round(fs.statSync(coverOut).size / 1024) + ' KB)');
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
