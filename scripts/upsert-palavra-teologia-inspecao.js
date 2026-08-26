'use strict';

/**
 * Injeta a palavra «teologia» (gatilho TEologigiA).
 * Uso: node scripts/upsert-palavra-teologia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const teologia = require('../lib/teologia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const MITO_FILE = path.join(ROOT, 'content', 'mitologia.json');
const HREF = '/posts/post-inspecao-palavra-teologia.html';
const HREF_MITO = '/posts/post-inspecao-palavra-mitologia.html';
const HREF_DEUS = '/posts/post-inspecao-palavra-deus.html';

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
  writeFileRetrySync(out, buildPostHtml(normalized), 'utf8');
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
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
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
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    teologia: { tone: "craft", category: "Léxico", mundane: "Estudo / discurso do divino — theós + lógos.", gloss: "Gr. theós + lógos; gatilho TEologigiA; ≠ mitologia ≠ Deus ≠ catecismo; Valeu !!!", href: "' +
    HREF +
    '", en: "theology", es: "teología", fr: "théologie", it: "teologia", de: "Theologie", el: "θεολογία", la: "theologia", yo: "ẹ̀kọ́ ọlọ́run", sw: "theolojia", nl: "theologie", pl: "teologia", ru: "богословие", uk: "богословʼя", zh: "神学", ja: "神学", ko: "신학", ar: "لاهوت", he: "תאולוגיה", hi: "धर्मशास्त्र", tr: "ilahiyat" },\n';
  gloss = replaceOrInsertAfter(gloss, 'teologia', main, 'mitologia');
  const aliases = [
    [
      'theologia',
      '    theologia: { gloss: "Grafia latina / EN culto de teologia — ver teologia.", href: "' +
        HREF +
        '", en: "theology", es: "teología" },\n'
    ],
    [
      'teólogo',
      '    teólogo: { gloss: "Quem estuda teologia — ver teologia.", href: "' +
        HREF +
        '", en: "theologian", es: "teólogo" },\n'
    ],
    [
      'teologica',
      '    teologica: { gloss: "Grafia sem acento de teológica — ver teologia.", href: "' +
        HREF +
        '", en: "theological", es: "teológica" },\n'
    ],
    [
      '"teológica"',
      '    "teológica": { gloss: "Adjectivo de teologia — ver teologia.", href: "' +
        HREF +
        '", en: "theological", es: "teológica" },\n'
    ],
    [
      '"teologigia"',
      '    "teologigia": { gloss: "Boca de campo TEologigiA — ver teologia.", href: "' +
        HREF +
        '", en: "theology (field spelling)", es: "teología (grafía de campo)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'teologia');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-teologia-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(teologia.buildTeologiaPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  try {
    const mitoLib = require('../lib/mitologia-inspecao-post.js');
    const postMito = stampFiles(mitoLib.buildMitologiaPost());
    upsertPost(posts, postMito);
    writeHtml(postMito);
  } catch (e) {
    console.warn('Aviso mitologia HTML:', e.message);
  }
  await writeJsonRetry(POSTS_FILE, posts);
  writeHtml(post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-teologia',
        title: 'Teologia — theós + lógos; estudo do divino',
        titleEn: 'Teologia — theós + lógos; study of the divine',
        titleEs: 'Teologia — theós + lógos; estudio de lo divino',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: teologia (theós + lógos) — gatilho TEologigiA; ≠ mitologia ≠ Deus ≠ catecismo; Valeu !!!',
        whyEn: 'Words: teologia (theós + lógos) — trigger TEologigiA; ≠ mythology ≠ Deus ≠ catechism.',
        whyEs: 'Palabras: teologia (theós + lógos) — gatillo TEologigiA; ≠ mitología ≠ Deus ≠ catecismo.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, HREF_MITO, HREF_DEUS, teologia.WIKT, '/posts/post-inspecao-palavra-valeu.html'],
        notes: 'Cap. ' + post.seriesOrder + ' — estudo do divino; o nome, não o púlpito.'
      },
      ['palavra-mitologia', 'palavra-deus']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'teologia',
        word: 'teologia',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Gr. theós + lógos — o nome do estudo do divino; gatilho TEologigiA; ≠ mitologia ≠ Deus ≠ catecismo; Valeu !!!',
        simpleEn:
          'Gr. theós + lógos — the name of the study of the divine; trigger TEologigiA; ≠ mythology ≠ pulpit.',
        simpleEs:
          'Gr. theós + lógos — el nombre del estudio de lo divino; gatillo TEologigiA; ≠ mitología ≠ púlpito.',
        history:
          'Pedido de campo 2026-08-25: inspeção da palavra e estudo da TEologigiA. Forma âncora teologia; theós + lógos.',
        curiosities:
          '«Estudo da teologia» quase repete o étimo. Irmã mitologia (mythos, não theós). Valeu !!! na index.',
        historyEn:
          'Field 2026-08-25: inspect the word and the study of TEologigiA. Anchor teologia; theós + lógos.',
        curiositiesEn:
          '“Study of theology” almost repeats the etymon. Sister mythology (mythos, not theós).',
        historyEs:
          'Pedido 2026-08-25: inspección de la palabra y el estudio de TEologigiA. Ancla teologia; theós + lógos.',
        curiositiesEs:
          '«Estudio de la teología» casi repite el étimo. Hermana mitología (mythos, no theós).'
      },
      ['mitologia', 'deus']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    writeFileRetrySync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'teologia',
      slug: 'teologia',
      title: 'Teologia',
      titleEn: 'Theology',
      titleEs: 'Teología',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — theós + lógos; o nome do estudo, sem catecismo de ficha; Valeu !!!',
      teaserEn: 'BudGanja echo — theós + lógos; the name of the study, without a catechism of the sheet; Valeu !!!',
      teaserEs: 'Eco BudGanja — theós + lógos; el nombre del estudio, sin catecismo de ficha; ¡Valeu !!!',
      body: teologia.poemPt(),
      bodyEn: teologia.poemEn(),
      bodyEs: teologia.poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'teologia', 'theos']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  if (fs.existsSync(MITO_FILE)) {
    const mito = JSON.parse(fs.readFileSync(MITO_FILE, 'utf8'));
    const items = Array.isArray(mito.items) ? mito.items : [];
    upsertItem(
      items,
      {
        id: 'teologia',
        slug: 'teologia',
        nome: 'Teologia',
        nomeEn: 'Theology',
        nomeEs: 'Teología',
        kicker: 'Léxico · estudo',
        kickerEn: 'Lexicon · study',
        kickerEs: 'Léxico · estudio',
        summary: 'Gr. theós + lógos — o nome do estudo do divino. ≠ mitologia ≠ catecismo.',
        summaryEn: 'Gr. theós + lógos — the name of the study of the divine. ≠ mythology ≠ catechism.',
        summaryEs: 'Gr. theós + lógos — el nombre del estudio de lo divino. ≠ mitología ≠ catecismo.',
        category: 'lexico',
        tags: ['teologia', 'theos', 'lexico'],
        href: HREF
      },
      ['deus', 'mitologia']
    );
    mito.items = items;
    mito.updatedAt = new Date().toISOString();
    await writeJsonRetry(MITO_FILE, mito);
    console.log('Catálogo Mitologia actualizado');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
