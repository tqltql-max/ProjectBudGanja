'use strict';

/**
 * Injeta a palavra oito / 8.
 * Uso: node scripts/upsert-palavra-oito-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildOitoPost } = require('../lib/oito-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-oito.html';

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss) {
  if (gloss.includes('oito:') && gloss.includes('href: "' + HREF + '"')) return gloss;
  const block =
    '    oito: { tone: "craft", category: "Número", mundane: "Cardinal 8; na fita, o oito em pé da lemniscata.", gloss: "Lat. octō — 8; em pé = caminho; ∞ deitado; cruzamento = elo; * (Shift+8) ≠ infinito; Valeu !!!", href: "' +
    HREF +
    '", en: "eight", es: "ocho", fr: "huit", it: "otto", de: "acht", el: "οκτώ", la: "octo", yo: "ẹ̀jọ", sw: "nane", gez: "sämmənt", nl: "acht", pl: "osiem", ru: "восемь", uk: "вісім", zh: "八", ja: "八", ko: "여덟", ar: "ثمانية", he: "שמונה", hi: "आठ", tr: "sekiz", sv: "åtta", da: "otte", no: "åtte", fi: "kahdeksan", cs: "osm", ro: "opt", hu: "nyolc", ca: "vuit", gl: "oito", eu: "zortzi", gn: "po", qu: "pusaq", eo: "ok", vi: "tám", id: "delapan", th: "แปด", hr: "osam", sk: "osem", ga: "ocht", cy: "wyth", ha: "takwas", am: "ስምንት", fa: "هشت", bn: "আট", zu: "isishiyagalombili" },\n' +
    '    "8": { gloss: "Algarismo de oito — oito em pé da lemniscata; ver ficha oito.", href: "' +
    HREF +
    '", en: "8", es: "8" },\n' +
    '    asterisco: { gloss: "Gr. asteriskos — estrelinha; Shift+8; ≠ símbolo do infinito; ver oito.", href: "' +
    HREF +
    '", en: "asterisk", es: "asterisco" },\n' +
    '    "*": { gloss: "Asterisco (Shift+8) — outra sala do oito; ≠ ∞; ver oito.", href: "' +
    HREF +
    '", en: "asterisk", es: "asterisco" },\n';

  const inserted = insertAfterKey(gloss, 'três', block);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após três falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-oito';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Oito — o 8 em pé, o ∞ e o * que não é elo',
    titleEn: 'Oito — standing 8, ∞, and the * that is not the link',
    titleEs: 'Oito — el 8 de pie, el ∞ y el * que no es eslabón',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: oito / 8 (octō); oito em pé da lemniscata; * = Shift+8, outra sala; elo no cruzamento.',
    whyEn: 'Words: oito / 8 (octō); standing lemniscate; * = Shift+8, other room; link at the crossing.',
    whyEs: 'Palabras: oito / 8 (octō); ocho de pie; * = Shift+8, otra sala; eslabón en el cruce.',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-expressao-em-pe.html',
      '/posts/post-inspecao-expressao-elo-de-ligacao.html',
      '/posts/post-inspecao-palavra-lemniscata.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — cardinal × postura; asterisco cortado.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'oito',
    word: 'Oito',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Lat. octō — cardinal 8; na fita, oito em pé; ∞ deitado; cruzamento = elo; * (Shift+8) é asterisco, outra sala; Valeu !!!',
    simpleEn:
      'Lat. octō — cardinal 8; on the ribbon, standing eight; lying ∞; crossing = link; * (Shift+8) is asterisk; Valeu !!!',
    simpleEs:
      'Lat. octō — cardinal 8; en la cinta, ocho de pie; ∞ acostado; cruce = eslabón; * (Shift+8) es asterisco; ¡Valeu !!!',
    history:
      'Oito vem do latim octō. No laboratório o 8 é também a lemniscata em pé: cima fala com baixo. O asterisco mora na mesma tecla e não é o símbolo do infinito.',
    curiosities:
      'simbuklo → símbolo; Shift+8 → *; o cruzamento da fita fica na ficha elo de ligação.',
    historyEn:
      'Portuguese oito comes from Latin octō. In the lab the 8 is also the lemniscate stood up. The asterisk shares the key and is not the infinity symbol.',
    curiositiesEn:
      'simbuklo → symbol; Shift+8 → *; the ribbon crossing lives on the connecting-link sheet.',
    historyEs:
      'Oito viene del latín octō. En el laboratorio el 8 es también la lemniscata de pie. El asterisco comparte tecla y no es el infinito.',
    curiositiesEs:
      'simbuklo → símbolo; Shift+8 → *; el cruce de la cinta está en la ficha elo de ligação.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'tres' || x.word === 'Três');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-oito-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildOitoPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (oito)');
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
