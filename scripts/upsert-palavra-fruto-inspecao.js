'use strict';

/**
 * Injeta palavra «fruto» na série Palavras.
 * Uso: node scripts/upsert-palavra-fruto-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildFrutoPost } = require('../lib/fruto-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
  }
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug)
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  // Re-read shared files at upsert time (concurrent planta/inseto/vida agents).
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = buildFrutoPost();
  const free = nextFreeSeriesOrder(posts, post.seriesOrder, post.slug);
  if (free !== post.seriesOrder) {
    console.log('seriesOrder ajustado:', post.seriesOrder, '→', free);
    post.seriesOrder = free;
  }

  const wasUpdate = posts.some((p) => p.slug === post.slug);
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-fruto';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Fruto — fructus, frutos e os frutos do trabalho',
      titleEn: 'Fruto — fructus, frutos, and the fruits of labor',
      titleEs: 'Fruto — fructus, frutos y los frutos del trabajo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: fruto (lat. fructus) — órgão botânico, plural frutos, contraste com fruta, figurado «frutos do trabalho»; elos plantas/simbiose.',
      whyEn: 'Words: fruto (Lat. fructus) — botanical organ, plural frutos, contrast with fruta, figurative fruits of labor; plant/simbiose links.',
      whyEs: 'Palabras: fruto (lat. fructus) — órgano botánico, plural frutos, contraste con fruta, figurado frutos del trabajo; vínculos plantas/simbiose.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Fruto',
        '/biblioteca/inspecoes/#inspecoes-frutos',
        '/posts/post-pesquisa-insumos-organicos-vs-industrializados-fruto.html',
        '/posts/post-inspecao-palavra-simbiose.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — lema fruto; plural + figurado; sem duplicar pesquisa/slug de espécie.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-fruto)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fruto',
      word: 'fruto',
      simple:
        'Lat. fructus — órgão botânico, plural frutos, contraste com fruta; figurado «frutos do trabalho»; elos plantas/simbiose.',
      simpleEn:
        'Lat. fructus — botanical organ, plural frutos, contrast with culinary fruta; figurative fruits of labor; plant/simbiose links.',
      simpleEs:
        'Lat. fructus — órgano botánico, plural frutos, contraste con fruta; figurado frutos del trabajo; vínculos plantas/simbiose.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'fruto');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'frutos' || x.id === 'floracao' || x.id === 'simbiose'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    // Keep hub «Frutos» but point notes at palavra sheet when present.
    const hubIdx = items.findIndex((x) => x.id === 'frutos');
    if (hubIdx >= 0 && items[hubIdx]) {
      items[hubIdx] = Object.assign({}, items[hubIdx], {
        simple:
          'Parte da planta que carrega a semente — hub de fichas de frutas; lema lexical em Inspeção: Fruto.',
        simpleEn:
          'The plant part that carries the seed — hub of fruit sheets; lexical lemma in Inspection: Fruto.',
        simpleEs:
          'Parte de la planta que lleva la semilla — hub de fichas de frutas; lema léxico en Inspección: Fruto.'
      });
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fruto)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    fruto: { gloss: "Lat. fructus — órgão botânico; plural frutos; contraste com fruta; figurado «frutos do trabalho».", href: "/posts/post-inspecao-palavra-fruto.html", en: "fruit", es: "fruto", fr: "fruit", it: "frutto", de: "Frucht", el: "καρπός", la: "fructus", yo: "èso", sw: "tunda", gez: "fəre", nl: "vrucht", pl: "owoc", ru: "плод", uk: "плід", zh: "果实", ja: "果実", ko: "열매", ar: "ثمرة", he: "פרי", hi: "फल", tr: "meyve", sv: "frukt", da: "frugt", no: "frukt", fi: "hedelmä", cs: "plod", ro: "fruct", hu: "termés", ca: "fruit", gl: "froito", eu: "fruitu", gn: "yva", qu: "ruru", eo: "frukto", vi: "quả", id: "buah", th: "ผล", hr: "plod", sk: "plod", ga: "toradh", cy: "ffrwyth", ha: "\'ya\'ya", am: "ፍሬ", fa: "میوه", bn: "ফল", zu: "isithelo" },';
    if (/fruto:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    fruto:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (fruto · entrada existente enriquecida)');
    } else {
      console.warn('Aviso: glossário — entrada fruto não encontrada para enriquecer');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(wasUpdate ? 'UPDATED' : 'CREATED', 'Cap.', post.seriesOrder, post.title);
  console.log('URL /posts/post-' + post.slug + '.html');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
