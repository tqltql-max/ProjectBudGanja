'use strict';

/**
 * Injeta a palavra «latim» na série Palavras
 * (latido / cachorro · sala do latim).
 * Uso: node scripts/upsert-palavra-latim-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLatimPost, WIKT } = require('../lib/latim-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-latim.html';

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
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
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
  const latimLine =
    '    latim: { tone: "craft", category: "Língua", mundane: "Língua do Lácio; mãe romance do português.", gloss: "Lat. latīnus ← Latium — a língua; a orelha cola latido (latrāre) no cachorro / cão (canis); sala do latim; Valeu !!!", href: "' +
    HREF +
    '", en: "Latin", es: "latín", fr: "latin", it: "latino", de: "Latein", el: "λατινικά", la: "latinus", yo: "èdè Latini", sw: "Kilatini", gez: "latinawi", nl: "Latijn", pl: "łacina", ru: "латынь", uk: "латина", zh: "拉丁语", ja: "ラテン語", ko: "라틴어", ar: "لاتينية", he: "לטינית", hi: "लातिन", tr: "Latince", sv: "latin", da: "latin", no: "latin", fi: "latina", cs: "latina", ro: "latină", hu: "latin", ca: "llatí", gl: "latín", eu: "latin", gn: "latín", qu: "latin simi", eo: "latino", vi: "tiếng Latinh", id: "Latin", th: "ละติน", hr: "latinski", sk: "latinčina", ga: "Laidin", cy: "Lladin", ha: "Latin", am: "ላቲን", fa: "لاتین", bn: "লাতিন", zu: "isiLatini" },\n';
  const latidoLine =
    '    latido: { gloss: "PT: ladrido ← lat. latrāre; ≠ latim (latīnus). ES latido = batimento. Animal primeiro (cachorro / cão). Corte na sala do latim.", href: "' +
    HREF +
    '", en: "bark (PT); heartbeat (ES)", es: "ladrido (PT); latido (ES corazón)" },\n';
  const latirLine =
    '    latir: { gloss: "Verbo do cão — ladrar ← latrāre; ≠ falar latim. Corte na sala do latim.", href: "' +
    HREF +
    '", en: "to bark (PT); to beat/throb (ES)", es: "ladrar (PT); latir (ES corazón)" },\n';
  const cachorroLine =
    '    cachorro: { gloss: "BR: o cão no dia-a-dia; lat. canis no étimo de cão. Late → latido. ≠ latim. Corte na sala do latim.", href: "' +
    HREF +
    '", en: "dog / puppy", es: "perro / cachorro" },\n';
  const latinoLine =
    '    latino: { gloss: "Adj. de Latium — da língua, da pessoa ou da América; não fundir com latido. Corte na sala do latim.", href: "' +
    HREF +
    '", en: "Latin / Latino", es: "latino" },\n';

  gloss = replaceOrInsertAfter(gloss, 'latim', latimLine, 'grego');
  gloss = replaceOrInsertAfter(gloss, 'latido', latidoLine, 'latim');
  gloss = replaceOrInsertAfter(gloss, 'latir', latirLine, 'latido');
  gloss = replaceOrInsertAfter(gloss, 'cachorro', cachorroLine, 'latir');
  gloss = replaceOrInsertAfter(gloss, 'latino', latinoLine, 'cachorro');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-latim-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildLatimPost());
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
    const sugId = 'palavra-latim';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Latim — língua do Lácio; a orelha cola latido (o cachorro)',
      titleEn: 'Latim — language of Latium; the ear glues latido (the dog)',
      titleEs: 'Latim — lengua del Lacio; el oído pega latido (el perro)',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: latim ← latīnus (Lácio). Latido ← latrāre (ladrido). Cachorro / cão ← canis. Sala do latim.',
      whyEn: 'Words: latim ← latīnus (Latium). Latido ← latrāre (bark). Dog ← canis. Latin room.',
      whyEs: 'Palabras: latim ← latīnus (Lacio). Latido ← latrāre (ladrido). Cachorro / cão ← canis. Sala del latín.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        WIKT,
        'https://pt.wiktionary.org/wiki/latido',
        'https://pt.wiktionary.org/wiki/cachorro',
        '/animais/cao/',
        '/posts/post-inspecao-palavra-animal.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — latīnus × latrāre; animal primeiro.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-latim)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'latim',
        word: 'latim',
        simple:
          'Lat. latīnus ← Latium — a língua do Lácio. A orelha cola latido (latrāre) no cachorro. Sala do latim. Valeu !!!',
        simpleEn:
          'Lat. latīnus ← Latium — the language. The ear glues latido (latrāre) to the dog. Latin room. Valeu !!!',
        simpleEs:
          'Lat. latīnus ← Latium — la lengua del Lacio. El oído pega latido (latrāre) al cachorro. Sala del latín. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Latim vem do latim latīnus, «do Lácio» (Latium), a região de Roma. É a língua-mãe romance do português, não o som do cão.',
        curiosities:
          'A orelha cola latido (latrāre, ladrar) no cachorro / cão (canis). Em espanhol latido é o batimento do coração; em português é o ladrido. Cannabis não vem de canis. Valeu !!!',
        historyEn:
          'Portuguese latim comes from Latin latīnus, “of Latium”, the region of Rome. It is the Romance mother of Portuguese, not the dog’s sound.',
        curiositiesEn:
          'The ear glues latido (latrāre, to bark) to the dog (canis). In Spanish latido is a heartbeat; in Portuguese it is a bark. Cannabis is not from canis. Valeu !!!',
        historyEs:
          'Latim viene del latín latīnus, «del Lacio». Es la lengua madre romance del portugués, no el sonido del perro.',
        curiositiesEs:
          'El oído pega latido (latrāre, ladrar) al cachorro / cão (canis). En español latido es el del corazón; en portugués es el ladrido. Cannabis no viene de canis. ¡Valeu !!!'
      },
      ['lingua-portuguesa', 'etimologia', 'giria']
    );
    upsertItem(
      items,
      {
        id: 'latido',
        word: 'latido',
        simple:
          'PT: ladrido ← lat. latrāre. ≠ latim (latīnus). ES latido = batimento. Cachorro primeiro. Corte na sala do latim. Valeu !!!',
        simpleEn:
          'PT: bark ← Lat. latrāre. ≠ latim (latīnus). ES latido = heartbeat. Dog first. Cut on the Latin sheet. Valeu !!!',
        simpleEs:
          'PT: ladrido ← lat. latrāre. ≠ latim. ES latido = latido del corazón. Animal primero. Corte en la sala del latín. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['latim']
    );
    upsertItem(
      items,
      {
        id: 'cachorro',
        word: 'cachorro',
        simple:
          'BR: o cão no dia-a-dia. Late → latido (latrāre). ≠ latim. Ficha de espécie em Animais / Cão. Corte na sala do latim. Valeu !!!',
        simpleEn:
          'BR everyday dog. Barks → latido (latrāre). ≠ latim. Species sheet under Animals / Dog. Cut on the Latin sheet. Valeu !!!',
        simpleEs:
          'BR: el perro cotidiano. Ladra → latido (latrāre). ≠ latim. Ficha de especie en Animales / Perro. Corte en la sala del latín. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['latido']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (latim · latido · cachorro)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (latim)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
