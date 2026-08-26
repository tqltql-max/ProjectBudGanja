'use strict';

/**
 * Injeta a palavra «chegou» / «chegar» na série Palavras.
 * Uso: node scripts/upsert-palavra-chegou-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildChegouPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/chegou-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-chegou.html';

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

function langsChegar() {
  return 'en: "to arrive", es: "llegar", fr: "arriver", it: "arrivare", de: "ankommen", el: "ftano", la: "plicare", yo: "de", sw: "kufika", gez: "baṣḥä", nl: "aankomen", pl: "przybyc", ru: "pribyt", uk: "prybuty", zh: "daoda", ja: "tsuku", ko: "dodaha", ar: "yasel", he: "leagia", hi: "pahunchna", tr: "varmak", sv: "ankomma", da: "ankomme", no: "ankomme", fi: "saapua", cs: "prijet", ro: "a ajunge", hu: "megerkezni", ca: "arribar", gl: "chegar", eu: "heldu", gn: "guahẽ", qu: "chayay", eo: "alveni", vi: "den", id: "tiba", th: "thueng", hr: "stici", sk: "prist", ga: "teacht", cy: "cyrraedd", ha: "isa", am: "መድረስ", fa: "residan", bn: "pouchano", zu: "fika"';
}

function patchGlossary(gloss) {
  const chegouLine =
    '    chegou: { tone: "craft", category: "Léxico", mundane: "Pretérito de chegar — o instante em que o caminho já dobrou o limiar.", gloss: "Chegou ← chegar ← lat. plicāre (pl- → ch-); Chegou = pretérito de campo; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; Valeu !!!", href: "' +
    HREF +
    '", en: "arrived", es: "llegó", fr: "est arrivé", it: "arrivò", de: "kam an", el: "eftase", la: "plicavit", yo: "de", sw: "alifika", gez: "baṣḥä", nl: "kwam aan", pl: "przybyl", ru: "pribyl", uk: "pryibuv", zh: "daole", ja: "tsuita", ko: "dodathaessda", ar: "wasal", he: "higiya", hi: "pahuncha", tr: "vardi", sv: "ankom", da: "ankom", no: "ankom", fi: "saapui", cs: "prijel", ro: "a ajuns", hu: "megerkezett", ca: "va arribar", gl: "chegou", eu: "heldu da", gn: "oguahẽ", qu: "chayarqan", eo: "alvenis", vi: "da den", id: "tiba", th: "ma laew", hr: "stigo", sk: "prisiel", ga: "thainig", cy: "cyrhaeddodd", ha: "ya iso", am: "ደረሰ", fa: "resid", bn: "pouchlo", zu: "ufikile" },\n';
  const chegarLine =
    '    chegar: { tone: "craft", category: "Léxico", mundane: "Dobrar o caminho até o limiar; no pátio também chega! (basta).", gloss: "Lat. plicāre — pl- → ch-; forma de campo chegou; ≠ cheio (plēnus) ≠ cheiro ≠ Enter; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsChegar() +
    ' },\n';

  gloss = replaceOrInsertAfter(gloss, 'chegou', chegouLine, 'ficar');
  gloss = replaceOrInsertAfter(gloss, 'chegar', chegarLine, 'chegou');

  const aliases = [
    [
      'chegaram',
      '    chegaram: { gloss: "Plural do pretérito — ver chegou.", href: "' +
        HREF +
        '", en: "they arrived", es: "llegaron" },\n'
    ],
    [
      'chega',
      '    chega: { gloss: "Imperativo / presente — chega! = o suficiente chegou; ver chegou.", href: "' +
        HREF +
        '", en: "enough! / arrives", es: "¡basta! / llega" },\n'
    ],
    [
      'chegada',
      '    chegada: { gloss: "Substantivo — o nome do evento; a âncora do pedido é o pretérito chegou.", href: "' +
        HREF +
        '", en: "arrival", es: "llegada" },\n'
    ],
    [
      'cheio',
      '    cheio: { gloss: "Corte — lat. plēnus (pl- → ch-), outra árvore; não é chegou / plicāre.", href: "' +
        HREF +
        '", en: "full (other etymon)", es: "lleno (otro étimo)" },\n'
    ],
    [
      'cheiro',
      '    cheiro: { gloss: "Corte — odor (via flagrāre); a orelha cola em chegou; o étimo corta.", href: "' +
        HREF +
        '", en: "smell (other etymon)", es: "olor (otro étimo)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'chegou');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-chegou-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildChegouPost());
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
        id: 'palavra-chegou',
        title: 'Chegou — pretérito de chegar; lat. plicāre',
        titleEn: 'Chegou — preterite of chegar; Lat. plicāre',
        titleEs: 'Chegou — pretérito de chegar; lat. plicāre',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: chegou ← chegar ← lat. plicāre (pl- → ch-); Chegou = pretérito de campo; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; Valeu !!!',
        whyEn: 'Words: chegou ← chegar ← Lat. plicāre (pl- → ch-); Chegou = field preterite; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; Valeu !!!',
        whyEs: 'Palabras: chegou ← chegar ← lat. plicāre (pl- → ch-); Chegou = pretérito de campo; ≠ cheio ≠ cheiro ≠ GPS ≠ Enter; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          'https://en.wiktionary.org/wiki/plico#Latin',
          '/posts/post-inspecao-palavra-caminho.html',
          '/posts/post-inspecao-palavra-enter.html',
          '/posts/post-inspecao-palavra-ficar.html',
          '/posts/post-inspecao-expressao-meter-marcha.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Chegou; lema chegar; cortes cheio/cheiro.'
      },
      ['palavra-feio', 'palavra-caminho', 'palavra-enter', 'palavra-ficar']
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
        id: 'chegou',
        word: 'chegou',
        simple:
          'Pretérito de chegar ← lat. plicāre (pl- → ch-). ≠ cheio ≠ cheiro ≠ GPS ≠ Enter. Valeu !!!',
        simpleEn:
          'Preterite of chegar ← Lat. plicāre (pl- → ch-). ≠ cheio ≠ cheiro ≠ GPS ≠ Enter. Valeu !!!',
        simpleEs:
          'Pretérito de chegar ← lat. plicāre (pl- → ch-). ≠ cheio ≠ cheiro ≠ GPS ≠ Enter. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do latim plicāre «dobrar». O português palataliza pl- → ch- (chegar); o espanhol faz ll- (llegar). Pedido de campo 2026-08-26: inpecao da palabra Chegou.',
        curiosities:
          'A orelha cola chegou em cheio (plēnus) e cheiro (flagrāre) — três che- de árvores distintas. Chega! é o mesmo verbo no limite. Ficar é o inverso. Ficha ≠ GPS.',
        historyEn:
          'From Latin plicāre “to fold”. Portuguese palatalizes pl- → ch- (chegar); Spanish makes ll- (llegar). Field 2026-08-26: inspect Chegou.',
        curiositiesEn:
          'The ear glues chegou to cheio (plēnus) and cheiro (flagrāre) — three che- from distinct trees. Chega! is the same verb at the limit. Ficar is the inverse. Sheet ≠ GPS.',
        historyEs:
          'Del latín plicāre «plegar». El portugués palataliza pl- → ch- (chegar); el español hace ll- (llegar). Pedido 2026-08-26: inspección de Chegou.',
        curiositiesEs:
          'El oído pega chegou con cheio (plēnus) y cheiro (flagrāre) — tres che- de árboles distintos. ¡Chega! es el mismo verbo en el límite. Ficar es el inverso. Ficha ≠ GPS.'
      },
      ['feio', 'caminho', 'enter', 'ficar']
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
      id: 'chegou',
      slug: 'chegou',
      title: 'Chegou',
      titleEn: 'Chegou',
      titleEs: 'Chegou',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — plicāre; ≠ cheio ≠ cheiro ≠ GPS; Valeu !!!',
      teaserEn: 'BudGanja echo — plicāre; ≠ cheio ≠ cheiro ≠ GPS; Valeu !!!',
      teaserEs: 'Eco BudGanja — plicāre; ≠ cheio ≠ cheiro ≠ GPS; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'chegou', 'chegar', 'plicare', 'palavra']
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
