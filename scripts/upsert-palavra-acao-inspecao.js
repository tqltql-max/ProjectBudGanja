'use strict';

/**
 * Injeta a palavra ação / acção.
 * Uso: node scripts/upsert-palavra-acao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildAcaoPost } = require('../lib/acao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-acao.html';

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
  if (gloss.includes('href: "' + HREF + '"')) return gloss;
  const block =
    '    ação: { tone: "craft", category: "Ofício", mundane: "O fazer nomeado — passar à ação.", gloss: "Lat. āctiō ← agere; grafia acção (PT); gesto ≠ ação ≠ ações da bolsa; Valeu !!!", href: "' +
    HREF +
    '", en: "action", es: "acción", fr: "action", it: "azione", de: "Handlung / Aktion", el: "πράξη", la: "actio", yo: "ìṣe", sw: "hatua", gez: "gəbr", nl: "actie", pl: "działanie", ru: "действие", uk: "дія", zh: "行动", ja: "行動", ko: "행동", ar: "فعل", he: "פעולה", hi: "कार्रवाई", tr: "eylem", sv: "handling", da: "handling", no: "handling", fi: "toiminta", cs: "akce", ro: "acțiune", hu: "cselekvés", ca: "acció", gl: "acción", eu: "ekintza", gn: "jeporeka", qu: "ruway", eo: "ago", vi: "hành động", id: "tindakan", th: "การกระทำ", hr: "akcija", sk: "akcia", ga: "gníomh", cy: "gweithred", ha: "aiki", am: "ድርጊት", fa: "کنش", bn: "কাজ", zu: "isenzo" },\n' +
    '    acao: { gloss: "Grafia sem acento de ação — lat. āctiō; ver ficha ação.", href: "' +
    HREF +
    '", en: "action", es: "acción" },\n' +
    '    acção: { gloss: "Grafia PT tradicional de ação — o ct latino; mesma ficha.", href: "' +
    HREF +
    '", en: "action (EU spelling)", es: "acción (grafía PT)" },\n' +
    '    ações: { gloss: "Plural de ação — feitos, ou papéis da bolsa (outra sala); ver ficha.", href: "' +
    HREF +
    '", en: "actions / shares", es: "acciones" },\n';

  const inserted = insertAfterKey(gloss, 'gesto', block);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após gesto falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-acao';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Ação — o fazer nomeado, o gesto e as outras salas',
    titleEn: 'Ação — named doing, the gesture, and the other rooms',
    titleEs: 'Ação — el hacer nombrado, el gesto y las otras salas',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: ação / acção (lat. āctiō ← agere) — ofício; gesto ≠ ação ≠ ações da bolsa; Valeu !!!',
    whyEn: 'Words: ação / acção (Lat. āctiō ← agere) — craft; gesture ≠ action ≠ stock shares; Valeu !!!',
    whyEs: 'Palabras: ação / acção (lat. āctiō ← agere) — oficio; gesto ≠ acción ≠ acciones de bolsa; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://en.wiktionary.org/wiki/actio#Latin',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-caminho.html',
      '/posts/post-inspecao-expressao-meter-marcha.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — ofício × juízo × bolsa × filme; gesto é a unidade mínima.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'acao',
    word: 'Ação',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Lat. āctiō ← agere — o fazer nomeado; grafia acção (PT); gesto ≠ ação ≠ ações da bolsa; Valeu !!!',
    simpleEn:
      'Lat. āctiō ← agere — named doing; EU spelling acção; gesture ≠ action ≠ stock shares; Valeu !!!',
    simpleEs:
      'Lat. āctiō ← agere — el hacer nombrado; grafía acção (PT); gesto ≠ acción ≠ acciones de bolsa; ¡Valeu !!!',
    history:
      'Ação vem do latim āctiō (← agere, fazer). No Brasil e no AO90 cai o ct (ação); em Portugal tradicional escreve-se acção. O laboratório corta as salas: ofício, juízo, bolsa e filme.',
    curiosities:
      'O gesto é a unidade mínima; a ação nomeia a cadeia. Comprar ações não é passar à ação. Fecho: Valeu !!!',
    historyEn:
      'Portuguese ação comes from Latin āctiō (← agere, to do). Brazil and AO90 drop the ct; traditional European Portuguese keeps acção. The lab cuts rooms: craft, lawsuit, shares and film.',
    curiositiesEn:
      'The gesture is the minimal unit; action names the chain. Buying shares is not taking action. Close: Valeu !!!',
    historyEs:
      'Ação viene del latín āctiō (← agere, hacer). Brasil y AO90 sueltan el ct; el PT tradicional guarda acção. El laboratorio corta salas: oficio, juicio, bolsa y cine.',
    curiositiesEs:
      'El gesto es la unidad mínima; la acción nombra la cadena. Comprar acciones no es pasar a la acción. Cierre: Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'gesto' || x.word === 'Gesto');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-acao-palavra-cover.js')], {
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

  const post = stampFiles(buildAcaoPost());
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
    console.log('Glossário actualizado (ação)');
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
