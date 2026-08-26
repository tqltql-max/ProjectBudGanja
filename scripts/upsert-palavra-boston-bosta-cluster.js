'use strict';

/**
 * Injeta Boston × bosta na série Palavras (cruzamento de orelha, étimos cortados).
 * Uso: node scripts/upsert-palavra-boston-bosta-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildBostonPost,
  poemPt: poemBostonPt,
  poemEn: poemBostonEn,
  poemEs: poemBostonEs
} = require('../lib/boston-inspecao-post.js');
const {
  buildBostaPost,
  poemPt: poemBostaPt,
  poemEn: poemBostaEn,
  poemEs: poemBostaEs
} = require('../lib/bosta-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF_BOSTON = '/posts/post-inspecao-palavra-boston.html';
const HREF_BOSTA = '/posts/post-inspecao-palavra-bosta.html';

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
  if (post.content_raw && !post.content_raw) post.content_raw = post.content_raw;
  if (post.coverImage && !post.coverImage) post.coverImage = post.coverImage;
  if (post.excerpt && !post.excerpt) post.excerpt = post.excerpt;
  if (post.excerptEn && !post.excerptEn) post.excerptEn = post.excerptEn;
  if (post.excerptEs && !post.excerptEs) post.excerptEs = post.excerptEs;
  if (post.seriesOrder != null && post.seriesOrder == null) post.seriesOrder = post.seriesOrder;
  if (post.seriesLabel && !post.seriesLabel) post.seriesLabel = post.seriesLabel;
  if (post.sourceUrl && !post.sourceUrl) post.sourceUrl = post.sourceUrl;
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

function langsCity() {
  return 'en: "Boston", es: "Boston", fr: "Boston", it: "Boston", de: "Boston", el: "Βοστώνη", la: "Bostonia", yo: "Boston", sw: "Boston", gez: "Boston", nl: "Boston", pl: "Boston", ru: "Бостон", uk: "Бостон", zh: "波士顿", ja: "ボストン", ko: "보스턴", ar: "بوسطن", he: "בוסטון", hi: "बॉस्टन", tr: "Boston", sv: "Boston", da: "Boston", no: "Boston", fi: "Boston", cs: "Boston", ro: "Boston", hu: "Boston", ca: "Boston", gl: "Boston", eu: "Boston", gn: "Boston", qu: "Boston", eo: "Bostono", vi: "Boston", id: "Boston", th: "บอสตัน", hr: "Boston", sk: "Boston", ga: "Bostún", cy: "Boston", ha: "Boston", am: "ቦስተን", fa: "بوستون", bn: "বস্টন", zu: "iBoston"';
}

function langsDung() {
  return 'en: "dung / crap (slang)", es: "bosta / estiércol", fr: "bouse / merde (arg.)", it: "sterco / merda (gergo)", de: "Mist / Scheiße (ugs.)", el: "κοπριά", la: "stercus", yo: "ìgbẹ́", sw: "mavi", gez: "bosta", nl: "mest / stront", pl: "łajno", ru: "навоз", uk: "гній", zh: "粪", ja: "糞", ko: "똥", ar: "روث", he: "זבל", hi: "गोबर", tr: "gübre / bok", sv: "gödsel", da: "gødning", no: "gjødsel", fi: "lanta", cs: "hnůj", ro: "bălegar", hu: "trágya", ca: "fem", gl: "bosta", eu: "simaur", gn: "kaka", qu: "wanu", eo: "sterko", vi: "phân", id: "kotoran", th: "มูล", hr: "gnoj", sk: "hnoj", ga: "aoileach", cy: "tail", ha: "taki", am: "ፍግ", fa: "پهن", bn: "গোবর", zu: "ubulongwe"';
}

function patchGlossary(gloss) {
  const bostonMain =
    '    boston: { tone: "warm", category: "Cidade", mundane: "Cidade em Massachusetts; o nome veio de Boston, Lincolnshire.", gloss: "St. Botolph’s town (tūn) — a vila de Botolph; ≠ bosta (orelha cola, étimo corta); Valeu !!!", href: "' +
    HREF_BOSTON +
    '", ' +
    langsCity() +
    ' },\n';
  const bostaMain =
    '    bosta: { tone: "caution", category: "Léxico", mundane: "Estrume / fezes; no BR também gíria de desdém.", gloss: "Via esp. bosta (estrume; origem última incerta); gíria BR; ≠ Boston (trocadilho, não étimo); Valeu !!!", href: "' +
    HREF_BOSTA +
    '", ' +
    langsDung() +
    ' },\n';

  gloss = replaceOrInsertAfter(gloss, 'boston', bostonMain, 'mexico');
  if (!/    boston:\s*\{/.test(gloss)) {
    gloss = replaceOrInsertAfter(gloss, 'boston', bostonMain, 'trocadilho');
  }

  const bostonAliases = [
    ['"Boston"', '    "Boston": { gloss: "Maiúscula — o mesmo topónimo; ver boston.", href: "' + HREF_BOSTON + '", en: "Boston", es: "Boston" },\n'],
    ['bostoniano', '    bostoniano: { gloss: "Gentílico — pessoa / cultura de Boston (cidade); ≠ bosta.", href: "' + HREF_BOSTON + '", en: "Bostonian", es: "bostoniano" },\n'],
    ['bostoniana', '    bostoniana: { gloss: "Gentílico feminino — ver Boston (cidade).", href: "' + HREF_BOSTON + '", en: "Bostonian (f.)", es: "bostoniana" },\n'],
    ['botolph', '    botolph: { gloss: "St. Botolph / Botwulf — o santo no nome de Boston; ≠ bosta.", href: "' + HREF_BOSTON + '", en: "Botolph", es: "Botolph" },\n'],
    ['"boston tea party"', '    "boston tea party": { gloss: "1773 — chá no porto; política colonial; ≠ «chá de bosta»; ver Boston.", href: "' + HREF_BOSTON + '", en: "Boston Tea Party", es: "Motín del té de Boston" },\n']
  ];
  for (const [key, line] of bostonAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'boston');
  }

  gloss = replaceOrInsertAfter(gloss, 'bosta', bostaMain, 'boston');
  const bostaAliases = [
    ['bostas', '    bostas: { gloss: "Plural de bosta — o mesmo vocábulo; ≠ Boston.", href: "' + HREF_BOSTA + '", en: "dung (pl.)", es: "bostas" },\n'],
    ['"que bosta"', '    "que bosta": { gloss: "Interjeição BR de desdém — andar da gíria; ver bosta.", href: "' + HREF_BOSTA + '", en: "what crap", es: "qué bosta" },\n'],
    ['"uma bosta"', '    "uma bosta": { gloss: "Juízo BR — coisa má; ≠ a cidade Boston; ver bosta.", href: "' + HREF_BOSTA + '", en: "a piece of crap", es: "una bosta" },\n'],
    ['bosteiro', '    bosteiro: { gloss: "Derivado pejorativo de bosta — ver ficha bosta.", href: "' + HREF_BOSTA + '", en: "pejorative from bosta", es: "bosteiro" },\n']
  ];
  for (const [key, line] of bostaAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'bosta');
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
  for (const script of ['generate-boston-palavra-cover.js', 'generate-bosta-palavra-cover.js']) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const boston = stampFiles(buildBostonPost());
  const bosta = stampFiles(buildBostaPost());
  bosta.seriesOrder = Number(boston.seriesOrder) + 1;
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, boston);
  upsertPost(posts, bosta);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of [boston, bosta]) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, boston);
  writeI18n(i18n, bosta);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-boston',
        title: 'Boston — a vila de Botolph; ≠ bosta',
        titleEn: 'Boston — Botolph’s town; ≠ bosta',
        titleEs: 'Boston — la villa de Botolph; ≠ bosta',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Boston = St. Botolph’s town (tūn); cola de orelha com bosta recusada como étimo; o -on é a vila; Valeu !!!',
        whyEn: 'Words: Boston = St. Botolph’s town (tūn); ear-glue to bosta refused as etymon; the -on is the town.',
        whyEs: 'Palabras: Boston = St. Botolph’s town (tūn); cola de oído con bosta rechazada; la -on es la villa.',
        suggestedSlug: boston.slug,
        doneHref: HREF_BOSTON,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_BOSTON,
          HREF_BOSTA,
          'https://pt.wikipedia.org/wiki/Boston',
          'https://en.wikipedia.org/wiki/Boston,_Lincolnshire',
          '/posts/post-inspecao-palavra-trocadilho.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + boston.seriesOrder + ' — cruzamento Boston × bosta; tūn devolvido à vila.'
      },
      ['palavra-mexico', 'palavra-trocadilho']
    );
    upsertItem(
      items,
      {
        id: 'palavra-bosta',
        title: 'Bosta — estrume e gíria; ≠ Boston',
        titleEn: 'Bosta — dung and slang; ≠ Boston',
        titleEs: 'Bosta — estiércol y jerga; ≠ Boston',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: bosta ← via esp. bosta (estrume; origem última incerta); gíria BR; cola com Boston recusada; Valeu !!!',
        whyEn: 'Words: bosta ← via Sp. bosta (dung; ultimate origin uncertain); BR slang; glue to Boston refused.',
        whyEs: 'Palabras: bosta ← vía esp. bosta (estiércol; origen último incierto); jerga BR; cola con Boston rechazada.',
        suggestedSlug: bosta.slug,
        doneHref: HREF_BOSTA,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_BOSTA,
          HREF_BOSTON,
          'https://pt.wiktionary.org/wiki/bosta',
          '/posts/post-inspecao-palavra-trocadilho.html',
          '/posts/post-inspecao-palavra-giria.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + bosta.seriesOrder + ' — cruzamento bosta × Boston; sem celebrar insulto.'
      },
      ['palavra-boston', 'palavra-giria']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (Boston · bosta)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'boston',
        word: 'Boston',
        simple:
          'St. Botolph’s town (ing. ant. tūn) — a vila de Botolph; Massachusetts herda o nome de Lincolnshire. ≠ bosta (cola de orelha). Valeu !!!',
        simpleEn:
          'St. Botolph’s town (OE tūn) — Botolph’s town; Massachusetts inherits the Lincolnshire name. ≠ bosta (ear glue). Valeu !!!',
        simpleEs:
          'St. Botolph’s town (ing. ant. tūn) — la villa de Botolph; Massachusetts hereda el nombre. ≠ bosta (cola de oído). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_BOSTON,
        history:
          'Boston contrai St. Botolph’s town (OE Botwulfes tūn). A cidade americana (1630) herda o nome da vila de Lincolnshire. O -ton é a vila, não um sufixo de gíria.',
        curiosities:
          'A orelha BR cola Boston em bosta. A piada apaga o -on — precisamente o tūn («vila»). O laboratório devolve a vila. Cruzamento: ficha bosta.',
        historyEn:
          'Boston contracts St. Botolph’s town (OE Botwulfes tūn). The American city (1630) inherits the Lincolnshire name. The -ton is the town, not a slang suffix.',
        curiositiesEn:
          'The Brazilian ear glues Boston to bosta. The joke deletes the -on — exactly the tūn (“town”). The lab puts the town back.',
        historyEs:
          'Boston contrae St. Botolph’s town (OE Botwulfes tūn). La ciudad americana hereda el nombre de Lincolnshire. El -ton es la villa.',
        curiositiesEs:
          'El oído BR pega Boston a bosta. El chiste borra la -on — el tūn («villa»). El laboratorio devuelve la villa.'
      },
      ['mexico', 'trocadilho']
    );
    upsertItem(
      items,
      {
        id: 'bosta',
        word: 'bosta',
        simple:
          'Via esp. bosta — estrume (origem última incerta). No BR também gíria de desdém. ≠ Boston (trocadilho, não étimo). Valeu !!!',
        simpleEn:
          'Via Sp. bosta — dung (ultimate origin uncertain). In BR also slang of disdain. ≠ Boston (pun, not etymon). Valeu !!!',
        simpleEs:
          'Vía esp. bosta — estiércol (origen último incierto). En BR también jerga de desdén. ≠ Boston (trocadilho, no étimo). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_BOSTA,
        history:
          'Português bosta entra pela via espanhola (estrume, sobretudo de gado nas fontes). A origem última é incerta (substrato ibérico em discussão). Não vem de Boston.',
        curiosities:
          'Três andares: matéria, campo (sem receita) e gíria. Cruzar com Boston é etiquetar a cola da orelha, não fundir avôs. merda / esterco / cocô são vizinhos, não o mesmo étimo.',
        historyEn:
          'Portuguese bosta comes via Spanish (dung, often cattle in the sources). The ultimate origin is uncertain. It does not come from Boston.',
        curiositiesEn:
          'Three floors: matter, field (no recipe) and slang. Crossing with Boston labels ear-glue; it does not fuse grandfathers.',
        historyEs:
          'El portugués bosta entra por la vía española (estiércol). El origen último es incierto. No viene de Boston.',
        curiositiesEs:
          'Tres pisos: materia, campo (sin receta) y jerga. Cruzar con Boston etiqueta la cola del oído; no funde abuelos.'
      },
      ['boston', 'giria']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (Boston · bosta)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (Boston · bosta)');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'boston',
      slug: 'boston',
      title: 'Boston',
      titleEn: 'Boston',
      titleEs: 'Boston',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a vila de Botolph; o -on que a piada apaga é a vila; ≠ bosta; Valeu !!!',
      teaserEn: 'BudGanja echo — Botolph’s town; the -on the joke erases is the town; ≠ bosta; Valeu !!!',
      teaserEs: 'Eco BudGanja — la villa de Botolph; la -on que el chiste borra es la villa; ≠ bosta; ¡Valeu !!!',
      body: poemBostonPt(),
      bodyEn: poemBostonEn(),
      bodyEs: poemBostonEs(),
      inspectionHref: HREF_BOSTON,
      tags: ['poesia', 'vida', 'boston', 'cidade', 'trocadilho']
    });
    upsertVidaPoem(vida, {
      id: 'bosta',
      slug: 'bosta',
      title: 'Bosta',
      titleEn: 'Bosta',
      titleEs: 'Bosta',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — estrume e gíria; nomear o vocábulo sem arma e sem colar no mapa; Valeu !!!',
      teaserEn: 'BudGanja echo — dung and slang; name the word without a weapon and without gluing it to the map; Valeu !!!',
      teaserEs: 'Eco BudGanja — estiércol y jerga; nombrar el vocablo sin arma y sin pegarlo al mapa; ¡Valeu !!!',
      body: poemBostaPt(),
      bodyEn: poemBostaEn(),
      bodyEs: poemBostaEs(),
      inspectionHref: HREF_BOSTA,
      tags: ['poesia', 'vida', 'bosta', 'giria', 'trocadilho']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados (Boston · bosta)');
  }

  for (const post of [boston, bosta]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', boston.title, '| Cap.', boston.seriesOrder);
  console.log('OK:', bosta.title, '| Cap.', bosta.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
