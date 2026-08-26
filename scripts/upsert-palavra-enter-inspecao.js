'use strict';

/**
 * Injeta a palavra Enter (lat. intrāre) e o par bem-vindos!!!.
 * Uso: node scripts/upsert-palavra-enter-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const enter = require('../lib/enter-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-enter.html';
const HREF_EXIT = '/posts/post-inspecao-palavra-exit.html';

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
  const langs =
    'en: "enter", es: "entrar / Intro", fr: "entrée / Entrée", it: "invio / entrare", de: "Enter / eintreten", el: "enter / εισέρχομαι", la: "intrare", yo: "wọlé", sw: "ingia", gez: "böʾä", nl: "enter / binnengaan", pl: "enter / wejść", ru: "ввод / войти", uk: "enter / увійти", zh: "回车 / 进入", ja: "Enter / 入る", ko: "Enter / 들어가다", ar: "إدخال", he: "Enter / להיכנס", hi: "एंटर", tr: "enter / girmek"';
  const main =
    '    enter: { tone: "craft", category: "Léxico", mundane: "EN — ir para dentro; tecla que confirma o passo.", gloss: "Lat. intrāre; tecla × verbo × limiar; par bem-vindos!!! (bene + venīre); ≠ EXIT ≠ login frio; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'enter', main, 'exit');
  const aliases = [
    [
      'entrar',
      '    entrar: { tone: "craft", category: "Léxico", mundane: "PT nativo de Enter — ir para dentro.", gloss: "Irmã PT de Enter (lat. intrāre); tecla = loan; saudação = bem-vindos!!!; Valeu !!!", href: "' +
        HREF +
        '", en: "to enter", es: "entrar", fr: "entrer", it: "entrare", de: "eintreten", el: "μπαίνω", la: "intrare", yo: "wọlé", sw: "kuingia", gez: "böʾä", nl: "binnengaan", pl: "wejść", ru: "войти", uk: "увійти", zh: "进入", ja: "入る", ko: "들어가다", ar: "دخول", he: "להיכנס", hi: "प्रवेश", tr: "girmek" },\n'
    ],
    [
      '"bem-vindos"',
      '    "bem-vindos": { tone: "craft", category: "Léxico", mundane: "Saudação do limiar — bem + vindos.", gloss: "Lat. bene + venīre; par de Enter (relação de porta, não de sangue); gatilho bem viNDOS!!!; Valeu !!!", href: "' +
        HREF +
        '", en: "welcome (pl.)", es: "bienvenidos" },\n'
    ],
    [
      '"bem-vindo"',
      '    "bem-vindo": { gloss: "Forma singular de bem-vindos — ver Enter.", href: "' +
        HREF +
        '", en: "welcome", es: "bienvenido" },\n'
    ],
    [
      'welcome',
      '    welcome: { gloss: "EN well + come — mesmo desenho de bem-vindo; relação de limiar com Enter, não étimo; ver Enter.", href: "' +
        HREF +
        '", en: "welcome", es: "bienvenido" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'enter');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-enter-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(enter.buildEnterPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);

  try {
    const exitLib = require('../lib/exit-inspecao-post.js');
    const existingExit = posts.find((p) => p.slug === 'inspecao-palavra-exit');
    const exitOrder = existingExit && Number(existingExit.seriesOrder) ? Number(existingExit.seriesOrder) : 106;
    const postExit = stampFiles(exitLib.buildExitPost(exitOrder));
    upsertPost(posts, postExit);
    writeHtml(postExit);
  } catch (e) {
    console.warn('Aviso EXIT HTML:', e.message);
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
        id: 'palavra-enter',
        title: 'Enter — intrāre, a tecla e bem-vindos!!!',
        titleEn: 'Enter — intrāre, the key and bem-vindos!!!',
        titleEs: 'Enter — intrāre, la tecla y bem-vindos!!!',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Enter ← lat. intrāre — tecla × verbo × limiar; relação com bem-vindos!!!; ≠ EXIT ≠ login frio; Valeu !!!',
        whyEn: 'Words: Enter ← Lat. intrāre — key × verb × threshold; relation to bem-vindos!!!; ≠ EXIT ≠ cold login.',
        whyEs: 'Palabras: Enter ← lat. intrāre — tecla × verbo × umbral; relación con bem-vindos!!!; ≠ EXIT ≠ login frío.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          HREF_EXIT,
          enter.WIKT,
          enter.WIKT_PT,
          enter.WIKT_BEM,
          enter.WIKT_WELCOME,
          enter.WIKI_KEY,
          '/posts/post-inspecao-palavra-backspace.html',
          '/posts/post-inspecao-palavra-homepage.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — palavra final inspecionada neste pedido; par bem-vindos!!! (limiar, não sangue).'
      },
      ['palavra-exit', 'palavra-backspace', 'palavra-homepage']
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
        id: 'enter',
        word: 'Enter',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Lat. intrāre — ir para dentro; tecla que confirma o passo. Par de limiar: bem-vindos!!! (bene + venīre). ≠ EXIT ≠ login frio. Valeu !!!',
        simpleEn:
          'Lat. intrāre — to go in; the key that confirms the step. Threshold pair: bem-vindos!!! (bene + venīre). ≠ EXIT ≠ cold login. Valeu !!!',
        simpleEs:
          'Lat. intrāre — ir adentro; tecla que confirma el paso. Par de umbral: bem-vindos!!! (bene + venīre). ≠ EXIT ≠ login frío. ¡Valeu !!!',
        history:
          'Pedido de campo 2026-08-25: inspeção da palavra Enter, relação com bem viNDOS!!!, palavra final inspecionada. Do latim intrāre (intrā «dentro») via francês antigo entrer.',
        curiosities:
          'Bem-vindos e welcome partilham o desenho bem+vir / well+come — não o étimo de enter. A tecla Return era o carro da máquina; o PC fundiu Return e Enter.',
        historyEn:
          'Field 2026-08-25: inspect Enter, relation to bem viNDOS!!!, final inspected word. From Latin intrāre (intrā “inside”) via Old French entrer.',
        curiositiesEn:
          'Bem-vindos and welcome share the well+come drawing — not Enter’s etymon. Return was the typewriter carriage; the PC merged Return and Enter.',
        historyEs:
          'Pedido 2026-08-25: inspección de Enter, relación con bem viNDOS!!!, palabra final inspeccionada. Del latín intrāre (intrā «dentro») vía francés antiguo entrer.',
        curiositiesEs:
          'Bem-vindos y welcome comparten el dibujo bien+venir — no el étimo de enter. Return era el carro de la máquina; el PC fusionó Return y Enter.'
      },
      ['exit', 'backspace', 'homepage']
    );
    upsertItem(
      items,
      {
        id: 'bem-vindos',
        word: 'bem-vindos',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        simple:
          'Bem + vindos (lat. bene + venīre) — saudação do limiar. Par de Enter (relação de porta, não de sangue). Gatilho: bem viNDOS!!!. Valeu !!!',
        simpleEn:
          'Bem + vindos (Lat. bene + venīre) — greeting at the threshold. Pair of Enter (door relation, not blood). Trigger: bem viNDOS!!!. Valeu !!!',
        simpleEs:
          'Bem + vindos (lat. bene + venīre) — saludo del umbral. Par de Enter (relación de puerta, no de sangre). Gatillo: bem viNDOS!!!. ¡Valeu !!!',
        history:
          'Composto português: bem + particípio de vir. Inglês welcome = well + come — o mesmo gesto em duas línguas.',
        curiosities:
          'Hífen obrigatório no escrito (bem-vindo). Os três !!! ecoam Valeu !!!. Vive na ficha Enter, não numa ficha-irmã separada.',
        historyEn:
          'Portuguese compound: bem + participle of vir. English welcome = well + come — the same gesture in two languages.',
        curiositiesEn:
          'Hyphen required in writing (bem-vindo). The three !!! echo Valeu !!!. Lives on the Enter sheet, not a separate sister sheet.',
        historyEs:
          'Compuesto portugués: bem + participio de vir. Inglés welcome = well + come — el mismo gesto en dos lenguas.',
        curiositiesEs:
          'Guion obligatorio en lo escrito (bem-vindo). Los tres !!! ecoan Valeu !!!. Vive en la ficha Enter, no en una ficha hermana.'
      },
      ['enter', 'exit', 'valeu']
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
      id: 'enter',
      slug: 'enter',
      title: 'Enter',
      titleEn: 'Enter',
      titleEs: 'Enter',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — Enter confirma o passo; bem-vindos!!! recebe; ≠ EXIT; Valeu !!!',
      teaserEn: 'BudGanja echo — Enter confirms the step; bem-vindos!!! receives; ≠ EXIT; Valeu !!!',
      teaserEs: 'Eco BudGanja — Enter confirma el paso; ¡bem-vindos!!! recibe; ≠ EXIT; ¡Valeu !!!',
      body: enter.poemPt(),
      bodyEn: enter.poemEn(),
      bodyEs: enter.poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'enter', 'bem-vindos', 'limiar']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
