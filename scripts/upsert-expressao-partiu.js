'use strict';

/**
 * Injeta a expressão «Partiu!!!» (derivação de Valeu !!!).
 * Uso: node scripts/upsert-expressao-partiu.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPartiuPost } = require('../lib/partiu-inspecao-post.js');
const { buildValeuPost } = require('../lib/valeu-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-partiu.html';

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

function insertAfterKey(gloss, key, block) {
  const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss) {
  const mainLine =
    '    partiu: { tone: "craft", category: "Saída", mundane: "Pretérito de partir; na rua, Partiu!!! — vamos / saí.", gloss: "Derivação de Valeu !!! — partir → partiu + !!!; porta e convite; ≠ Tamara partir ≠ pariu ≠ Fui; Valeu !!!", href: "' +
    HREF +
    '", en: "let’s go / I’m out", es: "vamos / me fui", fr: "on y va / je pars", it: "andiamo / se n’è andato", de: "los / ich bin weg", el: "πάμε", la: "abeamus", yo: "jẹ́ ká lọ", sw: "twende", gez: "nəḥur", nl: "laten we gaan", pl: "chodźmy", ru: "пошли", uk: "ходімо", zh: "走吧", ja: "行こう", ko: "가자", ar: "يلا", he: "יאללה", hi: "चलो", tr: "hadi", sv: "vi kör", da: "lad os gå", no: "la oss gå", fi: "mennään", cs: "jdeme", ro: "hai", hu: "gyerünk", ca: "som-hi", gl: "imos", eu: "goazen", gn: "jajá", qu: "risun", eo: "ni iru", vi: "đi thôi", id: "yuk", th: "ไปกัน", hr: "idemo", sk: "ideme", ga: "anois linn", cy: "awen ni", ha: "mu tafi", am: "እንሂድ", fa: "بزن بریم", bn: "চলো", zu: "asihambe" },\n';
  const aliases =
    '    "Partiu!!!": { gloss: "Grito de ofício — derivação de Valeu !!!; ver partiu.", href: "' +
    HREF +
    '", en: "let’s go!", es: "¡vamos!" },\n' +
    '    "partiu!!!": { gloss: "Mesmo grito em minúsculas — ver partiu.", href: "' +
    HREF +
    '", en: "let’s go!", es: "¡vamos!" },\n' +
    '    "bora partiu": { gloss: "Convite oral — ver Partiu!!!.", href: "' +
    HREF +
    '", en: "come on, let’s go", es: "vamos, vámonos" },\n' +
    '    "partiu praia": { gloss: "Grito com destino — o núcleo continua Partiu!!!; ver partiu.", href: "' +
    HREF +
    '", en: "let’s hit the beach", es: "vamos a la playa" },\n';

  if (gloss.includes('partiu: { tone:')) {
    return gloss;
  }
  const inserted = insertAfterKey(gloss, '"eu amo a vida!!!"', mainLine + aliases);
  if (inserted) return inserted;
  const afterValeu = insertAfterKey(gloss, 'valeu', mainLine + aliases);
  if (afterValeu) return afterValeu;
  console.warn('Aviso: glossário — inserção após eu amo a vida / valeu falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-partiu';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Partiu!!! — derivação de Valeu !!!',
    titleEn: 'Partiu!!! — derivation of Valeu !!!',
    titleEs: 'Partiu!!! — derivación de Valeu !!!',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: Partiu!!! — derivação de Valeu !!!; pretérito de partir virado grito de porta; ≠ Tamara ≠ pariu ≠ Fui; Valeu !!!',
    whyEn: 'Sayings: Partiu!!! — derivation of Valeu !!!; past of partir as door-cry; ≠ Tamara ≠ pariu ≠ Fui; Valeu !!!',
    whyEs: 'Dichos: Partiu!!! — derivación de Valeu !!!; pretérito de partir como grito de puerta; ≠ Tamara ≠ pariu ≠ Fui; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-valeu.html',
      '/posts/post-inspecao-palavra-partir.html',
      '/posts/post-inspecao-palavra-fui.html',
      '/posts/post-inspecao-expressao-adeus.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — molde Valeu !!! (pretérito + !!!); eixo saída/convite.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'partiu',
    word: 'Partiu!!!',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Derivação de Valeu !!! — pretérito de partir virado grito de porta / convite; ≠ Tamara partir ≠ pariu ≠ Fui; Valeu !!!',
    simpleEn:
      'Derivation of Valeu !!! — past of partir as door-cry / let’s go; ≠ Tamara partir ≠ pariu ≠ Fui; Valeu !!!',
    simpleEs:
      'Derivación de Valeu !!! — pretérito de partir como grito de puerta / vamos; ≠ Tamara partir ≠ pariu ≠ Fui; ¡Valeu !!!',
    history:
      'Pedido de campo 2026-08-24: Partiu!!! como derivação de Valeu !!!. Mesmo molde (pretérito 3.ª + três exclamações); eixo saída e convite, não gratidão.',
    curiosities:
      'Não apaga Valeu !!!. Não funde com a palavra partir (tríade Tamara). A orelha cola pariu — corte. Irmãs de porta: Fui! e A Deus!!!.',
    historyEn:
      'Field request 2026-08-24: Partiu!!! as a derivation of Valeu !!!. Same mould (3rd-person past + three exclamation marks); axis is leaving/invite, not thanks.',
    curiositiesEn:
      'Does not erase Valeu !!!. Does not merge with the word partir (Tamara triad). The ear glues pariu — cut. Door sisters: Fui! and A Deus!!!.',
    historyEs:
      'Pedido de campo 2026-08-24: Partiu!!! como derivación de Valeu !!!. Mismo molde (pretérito 3.ª + tres exclamaciones); eje salida y convite, no gratitud.',
    curiositiesEs:
      'No borra Valeu !!!. No funde con la palabra partir (tríada Tamara). El oído pega pariu — corte. Hermanas de puerta: Fui! y A Deus!!!.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word || x.word === 'partiu');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'eu-amo-a-vida' || x.id === 'valeu');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-partiu-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildPartiuPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);

  const valeuExisting = posts.find((p) => p.slug === 'inspecao-palavra-valeu');
  if (valeuExisting) {
    const valeu = stampFiles(buildValeuPost(Number(valeuExisting.seriesOrder) || 89));
    upsertPost(posts, valeu);
    writeHtml(valeu);
    writeI18n(i18n, valeu);
  }

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
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (Partiu!!!)');
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
