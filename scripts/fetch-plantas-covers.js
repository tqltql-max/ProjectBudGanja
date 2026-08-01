'use strict';

/**
 * Baixa fotos públicas (Wikipedia / Wikimedia Commons) para cada planta do catálogo,
 * gera capas 1200×630 e grava o campo `cover` em content/plantas.json.
 *
 * Uso: node scripts/fetch-plantas-covers.js
 *      node scripts/fetch-plantas-covers.js --only=babosa,camomila
 *      node scripts/fetch-plantas-covers.js --force
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const UA = 'InspetorBudGanjaBot/1.0 (https://inspetorbudganja.com.br; plant covers; contact tql.tql@gmail.com)';
const OUT_DIR = path.join(ROOT, 'imagens', 'plantas');
const SRC_DIR = path.join(ROOT, 'imagens', 'plantas', '_src');
const CATALOG = path.join(ROOT, 'content', 'plantas.json');

/** Overrides quando o binomial do catálogo é ambíguo ou não resolve bem na Wikipedia. */
const QUERY_OVERRIDES = {
  babosa: ['Aloe vera'],
  camomila: ['Matricaria chamomilla', 'Matricaria recutita'],
  'capim-limao': ['Cymbopogon citratus'],
  carqueja: ['Baccharis trimera'],
  cavalinha: ['Equisetum arvense'],
  'erva-cidreira': ['Lippia alba'],
  'espinheira-santa': ['Maytenus ilicifolia'],
  guaco: ['Mikania glomerata'],
  hortela: ['Mentha spicata'],
  boldo: ['Plectranthus barbatus', 'Coleus barbatus'],
  melissa: ['Melissa officinalis'],
  alecrim: ['Salvia rosmarinus', 'Rosmarinus officinalis'],
  gengibre: ['Zingiber officinale'],
  curcuma: ['Curcuma longa'],
  'unha-de-gato': ['Uncaria tomentosa'],
  sucupira: ['Pterodon emarginatus'],
  copaiba: ['Copaifera langsdorffii'],
  andiroba: ['Carapa guianensis'],
  jambu: ['Acmella oleracea'],
  mulungu: ['Erythrina mulungu', 'Erythrina verna'],
  maracuja: ['Passiflora incarnata'],
  calendula: ['Calendula officinalis'],
  barbatimao: ['Stryphnodendron adstringens'],
  jaborandi: ['Pilocarpus microphyllus'],
  ipecacuanha: ['Carapichea ipecacuanha'],
  pfaffia: ['Pfaffia glomerata'],
  aroeira: ['Schinus terebinthifolia'],
  quina: ['Cinchona officinalis', 'Cinchona pubescens'],
  'cannabis-sativa': ['Cannabis sativa'],
  abacate: ['Persea americana'],
  coco: ['Cocos nucifera'],
  laranja: ['Citrus sinensis', 'Orange (fruit)'],
  acai: ['Euterpe oleracea'],
  manga: ['Mangifera indica'],
  banana: ['Banana', 'Musa acuminata'],
  maca: ['Malus domestica', 'Apple'],
  abacaxi: ['Ananas comosus', 'Pineapple'],
  goiaba: ['Psidium guajava'],
  cacau: ['Theobroma cacao'],
  uva: ['Vitis vinifera', 'Grape'],
  morango: ['Fragaria × ananassa', 'Strawberry'],
  'maracuja-fruta': ['Passiflora edulis']
};

function parseArgs(argv) {
  const out = { force: false, only: null };
  argv.forEach((arg) => {
    if (arg === '--force') out.force = true;
    if (arg.startsWith('--only=')) {
      out.only = new Set(
        arg
          .slice(7)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }
  });
  return out;
}

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': UA,
            Accept: '*/*'
          }
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 8) {
            const next = new URL(res.headers.location, url).href;
            res.resume();
            return fetchBuffer(next, redirects + 1).then(resolve, reject);
          }
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => {
            resolve({
              status: res.statusCode || 0,
              body: Buffer.concat(chunks),
              type: String(res.headers['content-type'] || '')
            });
          });
        }
      )
      .on('error', reject);
  });
}

async function fetchJson(url) {
  const res = await fetchBuffer(url);
  if (res.status !== 200) throw new Error('HTTP ' + res.status + ' ' + url);
  return JSON.parse(res.body.toString('utf8'));
}

function wikiTitleCandidates(name) {
  const cleaned = String(name || '')
    .replace(/\s+/g, ' ')
    .replace(/\s*(Mill\.|L\.|Mart\.|Sims|Borkh\.|Duchesne|Merr\.|Osbeck).*$/i, '')
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim();
  const noHybrid = cleaned.replace(/×\s*/g, '').trim();
  const underscored = cleaned.replace(/\s+/g, '_');
  const underscoredNoHybrid = noHybrid.replace(/\s+/g, '_');
  return [...new Set([cleaned, noHybrid, underscored, underscoredNoHybrid].filter(Boolean))];
}

async function imageFromWikipediaSummary(title) {
  const url =
    'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_'));
  try {
    const data = await fetchJson(url);
    const src = (data.originalimage && data.originalimage.source) || (data.thumbnail && data.thumbnail.source);
    if (!src || /commons-logo|wiki\.png|disambig/i.test(src)) return null;
    return { url: src, credit: 'Wikipedia · ' + (data.title || title), sourcePage: data.content_urls?.desktop?.page || url };
  } catch {
    return null;
  }
}

async function imageFromWikipediaPageimages(title) {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=1600&titles=' +
    encodeURIComponent(title.replace(/ /g, '_'));
  try {
    const data = await fetchJson(url);
    const pages = (data.query && data.query.pages) || {};
    const page = Object.values(pages)[0];
    if (!page || page.missing != null) return null;
    const src = (page.original && page.original.source) || (page.thumbnail && page.thumbnail.source);
    if (!src || /commons-logo|wiki\.png|disambig/i.test(src)) return null;
    return {
      url: src,
      credit: 'Wikipedia · ' + (page.title || title),
      sourcePage: 'https://en.wikipedia.org/wiki/' + encodeURIComponent((page.title || title).replace(/ /g, '_'))
    };
  } catch {
    return null;
  }
}

async function imageFromCommonsSearch(query) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=1600&gsrsearch=' +
    encodeURIComponent(query);
  try {
    const data = await fetchJson(url);
    const pages = Object.values((data.query && data.query.pages) || {});
    pages.sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const page of pages) {
      const info = page.imageinfo && page.imageinfo[0];
      if (!info) continue;
      if (!/^image\//i.test(info.mime || '')) continue;
      if ((info.size || 0) < 20000) continue;
      const src = info.thumburl || info.url;
      if (!src || /logo|icon|map|diagram|svg|coat of arms/i.test(page.title || '')) continue;
      const artist =
        info.extmetadata &&
        info.extmetadata.Artist &&
        String(info.extmetadata.Artist.value || '').replace(/<[^>]+>/g, '').trim();
      return {
        url: src,
        credit: (artist ? artist + ' · ' : '') + 'Wikimedia Commons · ' + page.title,
        sourcePage: info.descriptionurl || 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title)
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

async function resolveImage(plant) {
  const queries = QUERY_OVERRIDES[plant.slug] || wikiTitleCandidates(plant.nomeCientifico);
  for (const q of queries) {
    for (const title of wikiTitleCandidates(q)) {
      const viaSummary = await imageFromWikipediaSummary(title);
      if (viaSummary) return viaSummary;
      const viaPage = await imageFromWikipediaPageimages(title);
      if (viaPage) return viaPage;
    }
    const viaCommons = await imageFromCommonsSearch(q);
    if (viaCommons) return viaCommons;
  }
  return null;
}

async function makeCover(srcPath, outPath) {
  const sharp = require('sharp');
  const base = await sharp(srcPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.92, saturation: 1.05 })
    .toBuffer();

  const veil = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.08)"/>
      <stop offset="55%" stop-color="rgba(8,10,9,0.18)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#v)"/>
</svg>`);

  await sharp(base)
    .composite([{ input: veil, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    throw new Error('sharp em falta — npm install');
  }
  void sharp;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(SRC_DIR, { recursive: true });

  const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const plants = Array.isArray(catalog.plants) ? catalog.plants : [];
  const credits = {};
  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const plant of plants) {
    if (args.only && !args.only.has(plant.slug)) continue;

    const coverRel = '/imagens/plantas/' + plant.slug + '-cover.jpg';
    const coverAbs = path.join(ROOT, coverRel.replace(/^\//, ''));
    const already = plant.cover && fs.existsSync(path.join(ROOT, String(plant.cover).replace(/^\//, '')));

    if (!args.force && already) {
      console.log('SKIP', plant.slug, '(já tem capa)');
      skipped += 1;
      continue;
    }

    process.stdout.write('… ' + plant.slug + ' — ');
    const found = await resolveImage(plant);
    if (!found) {
      console.log('FALHOU (sem fonte)');
      failed += 1;
      await sleep(250);
      continue;
    }

    const ext = path.extname(new URL(found.url).pathname).toLowerCase() || '.jpg';
    const srcFile = path.join(SRC_DIR, plant.slug + ext);
    const dl = await fetchBuffer(found.url);
    if (dl.status !== 200 || dl.body.length < 8000) {
      console.log('FALHOU download', dl.status, found.url);
      failed += 1;
      await sleep(250);
      continue;
    }
    fs.writeFileSync(srcFile, dl.body);

    try {
      await makeCover(srcFile, coverAbs);
    } catch (e) {
      console.log('FALHOU sharp', e.message || e);
      failed += 1;
      await sleep(250);
      continue;
    }

    plant.cover = coverRel;
    credits[plant.slug] = {
      credit: found.credit,
      source: found.sourcePage,
      downloadedFrom: found.url,
      cover: coverRel
    };
    console.log('OK', path.basename(coverAbs), '(' + Math.round(fs.statSync(coverAbs).size / 1024) + ' KB)');
    ok += 1;
    await sleep(350);
  }

  catalog.updatedAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, 'credits.json'), JSON.stringify(credits, null, 2) + '\n', 'utf8');
  console.log('\nResumo: ok=' + ok + ' skip=' + skipped + ' fail=' + failed);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
