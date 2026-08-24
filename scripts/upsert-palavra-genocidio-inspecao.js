'use strict';

/**
 * Injeta a palavra genocídio (génos + -cīdium; Lemkin 1944).
 * Uso: node scripts/upsert-palavra-genocidio-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildGenocidioPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  WIKT_EN,
  ONU,
  LEI
} = require('../lib/genocidio-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-genocidio.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const langs =
    'en: "genocide", es: "genocidio", fr: "génocide", it: "genocidio", de: "Völkermord", el: "γενοκτονία", la: "genocidium", yo: "ìparun ẹ̀yà", sw: "mauaji ya kimbari", gez: "ሕዝብ ምጥፋእ", nl: "genocide", pl: "ludobójstwo", ru: "геноцид", uk: "геноцид", zh: "种族灭绝", ja: "ジェノサイド", ko: "집단학살", ar: "إبادة جماعية", he: "רצח עם", hi: "नरसंहार", tr: "soykırım", sv: "folkmord", da: "folkedrab", no: "folkemord", fi: "kansanmurha", cs: "genocida", ro: "genocid", hu: "népirtás", ca: "genocidi", gl: "xenocidio", eu: "genozidio", gn: "ava ñembojehe\'a", qu: "runa wañuchiy", eo: "genocido", vi: "diệt chủng", id: "genosida", th: "การฆ่าล้างเผ่าพันธุ์", hr: "genocid", sk: "genocída", ga: "cionocíd", cy: "hil-laddiad", ha: "kisan kare dangi", am: "የዘር ማጥፋት", fa: "نسل‌کشی", bn: "গোত্রহত্যা", zu: "ukubulawa kwesizwe"';
  const main =
    '    genocídio: { tone: "caution", category: "Léxico", mundane: "Crime de destruir um grupo nacional, étnico, racial ou religioso como tal.", gloss: "Gr. génos + lat. -cīdium (Lemkin 1944) — Convenção 1948 · Lei 2.889/1956; ≠ guerra ≠ massacre ≠ escravidão; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'genocídio', main, 'escravidão');
  const aliases = [
    [
      'genocidio',
      '    genocidio: { gloss: "Grafia sem acento de genocídio — ver ficha.", href: "' +
        HREF +
        '", en: "genocide", es: "genocidio" },\n'
    ],
    [
      'genocide',
      '    genocide: { gloss: "EN de genocídio — Lemkin 1944; ver ficha.", href: "' +
        HREF +
        '", en: "genocide", es: "genocidio" },\n'
    ],
    [
      'genocida',
      '    genocida: { gloss: "Agente do crime — quem pratica / é acusado; ver genocídio.", href: "' +
        HREF +
        '", en: "genocidaire / perpetrator of genocide", es: "genocida" },\n'
    ],
    [
      'génocide',
      '    génocide: { gloss: "FR de genocídio — via da palavra até ao PT; ver ficha.", href: "' +
        HREF +
        '", en: "genocide (FR)", es: "genocidio" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'genocídio');
  }
  return gloss;
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-genocidio-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildGenocidioPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-genocidio',
        title: 'Genocídio — destruir um grupo como grupo',
        titleEn: 'Genocídio — destroying a group as a group',
        titleEs: 'Genocídio — destruir un grupo como grupo',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: genocídio (génos + -cīdium; Lemkin 1944) — Convenção 1948 · Lei 2.889/1956; ≠ guerra ≠ massacre ≠ escravidão.',
        whyEn: 'Words: genocídio (génos + -cīdium; Lemkin 1944) — 1948 Convention; ≠ war ≠ massacre ≠ slavery.',
        whyEs: 'Palabras: genocídio (génos + -cīdium; Lemkin 1944) — Convención 1948; ≠ guerra ≠ masacre ≠ esclavitud.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_EN,
          ONU,
          LEI,
          '/posts/post-inspecao-palavra-escravidao.html',
          '/posts/post-inspecao-palavra-perseguicao.html',
          '/posts/post-inspecao-palavra-guerra-do-paraguai.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — ficha de vocábulo, não tribunal; sem inventário de casos.'
      },
      ['palavra-escravidao', 'palavra-perseguicao', 'palavra-preso']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'genocidio',
        word: 'genocídio',
        simple:
          'Gr. génos + lat. -cīdium (Lemkin 1944) — destruir um grupo nacional, étnico, racial ou religioso como tal. Convenção 1948 · Lei 2.889/1956. ≠ guerra ≠ massacre ≠ escravidão. Valeu !!!',
        simpleEn:
          'Gk. génos + Lat. -cīdium (Lemkin 1944) — destroying a national, ethnical, racial or religious group as such. 1948 Convention. ≠ war ≠ massacre ≠ slavery. Valeu !!!',
        simpleEs:
          'Gr. génos + lat. -cīdium (Lemkin 1944) — destruir un grupo nacional, étnico, racial o religioso como tal. Convención 1948. ≠ guerra ≠ masacre ≠ esclavitud. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'A palavra é de 1944 (Raphael Lemkin: grego génos + latim -cīdium). A Convenção da ONU (1948) e a Lei brasileira 2.889/1956 fixam o teste jurídico: intenção de destruir um grupo protegido como tal. O crime é antigo; o nome é novo.',
        curiosities:
          'Guerra, massacre, homicídio, escravidão e perseguição são salas vizinhas, não sinónimos. No Brasil a palavra também viaja na política (juventude negra, povos indígenas, drogas) — uso, não sentença. O laboratório recusa inventário de casos.',
        historyEn:
          'The word is from 1944 (Raphael Lemkin: Greek génos + Latin -cīdium). The 1948 UN Convention and Brazil’s Law 2.889/1956 fix the legal test: intent to destroy a protected group as such. The crime is old; the name is new.',
        curiositiesEn:
          'War, massacre, homicide, slavery and persecution are neighbouring rooms, not synonyms. In Brazil the word also travels in politics — usage, not a verdict. The lab refuses a case inventory.',
        historyEs:
          'La palabra es de 1944 (Raphael Lemkin: griego génos + latín -cīdium). La Convención de la ONU (1948) y la Ley brasileña 2.889/1956 fijan el test jurídico. El crimen es antiguo; el nombre es nuevo.',
        curiositiesEs:
          'Guerra, masacre, homicidio, esclavitud y persecución son salas vecinas, no sinónimos. En Brasil la palabra también viaja en la política — uso, no sentencia. El laboratorio rehúsa inventario de casos.'
      },
      ['escravidao', 'perseguicao', 'preso']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'genocidio',
      slug: 'genocidio',
      title: 'Genocídio',
      titleEn: 'Genocídio',
      titleEs: 'Genocídio',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — palavra nova para um crime antigo; grupo como grupo; Valeu !!!',
      teaserEn: 'BudGanja echo — a new word for an old crime; group as group; Valeu !!!',
      teaserEs: 'Eco BudGanja — palabra nueva para un crimen antiguo; grupo como grupo; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'genocidio', 'respeito', 'verdade']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
