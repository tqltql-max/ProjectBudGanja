'use strict';

/**
 * Injeta palavra «sozna» / sozinha na série Palavras.
 * Uso: node scripts/upsert-palavra-sozna-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSoznaPost } = require('../lib/sozna-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
  }
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-sozna');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildSoznaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-sozna';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sozinho — sozna, sozinha e ofício',
      titleEn: 'Sozinho — sozna, sozinha and craft',
      titleEs: 'Sozinho — sozna, sozinha y oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sozinho (lat. solus + -zinho) — par sozinha; forma oral sozna; ≠ solitário; Valeu !!!',
      whyEn: 'Words: sozinho (Lat. solus + -zinho) — pair sozinha; oral sozna; ≠ solitário; Valeu !!!',
      whyEs: 'Palabras: sozinho (lat. solus + -zinho) — par sozinha; oral sozna; ≠ solitário; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/s%C3%B3',
        '/posts/post-inspecao-palavra-solitario.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — lemma sozinho; par sozinha; forma oral sozna.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-sozna)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entries = [
      {
        id: 'sozinho',
        word: 'sozinho',
        simple:
          'Lat. sōlus + -zinho — estado só (masc.); par sozinha; forma oral sozna; ≠ solitário; Valeu !!! sem vergonha.',
        simpleEn:
          'Lat. sōlus + -zinho — alone (masc.); pair sozinha; oral sozna; ≠ solitário; Valeu !!! without shame.',
        simpleEs:
          'Lat. sōlus + -zinho — solo (masc.); par sozinha; oral sozna; ≠ solitário; Valeu !!! sin vergüenza.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'sozna',
        word: 'sozna',
        simple:
          'Forma oral de sozinho / sozinha (lat. sōlus + -zinho/-zinha) — estado só; ≠ solitário; Valeu !!! sem vergonha.',
        simpleEn:
          'Oral form of sozinho / sozinha (Lat. sōlus + -zinho/-zinha) — alone; ≠ solitário; Valeu !!! without shame.',
        simpleEs:
          'Forma oral de sozinho / sozinha (lat. sōlus + -zinho/-zinha) — solo/sola; ≠ solitário; Valeu !!! sin vergüenza.',
        group: 'lexico',
        fromTitle: false,
        href
      }
    ];
    for (const entry of entries) {
      const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex((x) => x.id === 'solitario' || x.id === 'medo' || x.id === 'sozna');
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (sozna)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    sozna: { gloss: "Forma oral de sozinho / sozinha (lat. sōlus + -zinho/-zinha) — estado só; ≠ solitário; Valeu !!!", href: "/posts/post-inspecao-palavra-sozna.html", en: "alone", es: "solo", fr: "seul", it: "solo", de: "allein", el: "monos", la: "solus", yo: "nikan", sw: "peke", gez: "bahtit", nl: "alleen", pl: "sam", ru: "odin", uk: "odyn", zh: "duzi", ja: "hitori", ko: "honja", ar: "wahid", he: "levad", hi: "akela", tr: "yalniz", sv: "ensam", da: "alene", no: "alene", fi: "yksin", cs: "sam", ro: "singur", hu: "egyedul", ca: "sol", gl: "so", eu: "bakarrik", gn: "ha\'eño", qu: "sapalla", eo: "sola", vi: "mot minh", id: "sendiri", th: "alone", hr: "sam", sk: "sam", ga: "ina aonar", cy: "ar ei ben", ha: "kadai", am: "bahtit", fa: "tanha", bn: "eka", zu: "yedwa" },';
    const sozinhaLine =
      '    sozinha: { gloss: "Lat. sōlus + -zinha — estado só (fem.); forma oral sozna; ≠ solitário; Valeu !!!", href: "/posts/post-inspecao-palavra-sozna.html", en: "alone", es: "sola", fr: "seule", it: "sola", de: "allein", el: "moni", la: "sola", yo: "nikan", sw: "peke", gez: "bahtit", nl: "alleen", pl: "sama", ru: "odna", uk: "odna", zh: "duzi", ja: "hitori", ko: "honja", ar: "wahida", he: "levad", hi: "akeli", tr: "yalniz", sv: "ensam", da: "alene", no: "alene", fi: "yksin", cs: "sama", ro: "singura", hu: "egyedul", ca: "sola", gl: "soa", eu: "bakarrik", gn: "ha\'eño", qu: "sapalla", eo: "sola", vi: "mot minh", id: "sendiri", th: "alone", hr: "sama", sk: "sama", ga: "ina haonar", cy: "ar ei phen", ha: "kadai", am: "bahtit", fa: "tanha", bn: "eka", zu: "wedwa" },';
    const sozinhoLine =
      '    sozinho: { gloss: "Lat. sōlus + -zinho — estado só (masc.); par sozinha; forma oral sozna; ≠ solitário; Valeu !!!", href: "/posts/post-inspecao-palavra-sozna.html", en: "alone", es: "solo", fr: "seul", it: "solo", de: "allein", yo: "nìkan", sw: "peke yake", gez: "baḥtitu", el: "μόνος", la: "solus", nl: "alleen", pl: "sam", ru: "odin", uk: "odyn", zh: "duzi", ja: "hitori", ko: "honja", ar: "wahid", he: "levad", hi: "akela", tr: "yalniz", sv: "ensam", da: "alene", no: "alene", fi: "yksin", cs: "sam", ro: "singur", hu: "egyedul", ca: "sol", gl: "so", eu: "bakarrik", gn: "ha\'eño", qu: "sapalla", eo: "sola", vi: "mot minh", id: "sendiri", th: "alone", hr: "sam", sk: "sam", ga: "ina aonar", cy: "ar ei ben", ha: "kadai", am: "bahtit", fa: "tanha", bn: "eka", zu: "yedwa" },';

    if (/sozna:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    sozna:\s*\{[\s\S]*?\},/, entryLine);
    } else if (/sozinho:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    sozinho:\s*\{[\s\S]*?\},?\r?\n)/, entryLine + '\n$1');
    } else if (/solitario:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    solitario:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryLine + '\n');
    }

    if (/sozinha:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    sozinha:\s*\{[\s\S]*?\},/, sozinhaLine);
    } else {
      gloss = gloss.replace(entryLine, entryLine + '\n' + sozinhaLine);
    }

    if (/sozinho:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    sozinho:\s*\{[\s\S]*?\},/, sozinhoLine);
    } else {
      gloss = gloss.replace(entryLine, sozinhoLine + '\n' + entryLine);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (sozna / sozinha / sozinho)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
