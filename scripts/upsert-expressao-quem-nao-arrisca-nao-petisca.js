'use strict';

/**
 * Injeta a expressão «quem não arrisca não petisca».
 * Uso: node scripts/upsert-expressao-quem-nao-arrisca-nao-petisca.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildQuemNaoArriscaNaoPetiscaPost
} = require('../lib/quem-nao-arrisca-nao-petisca-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-quem-nao-arrisca-nao-petisca.html';

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
  const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
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
    '    "quem não arrisca não petisca": { tone: "craft", category: "Ditado", mundane: "Provérbio BR — sem risco não há gosto / ganho.", gloss: "Forma correcta do ditado; voz viva que…; arriscar × petiscar; ≠ aposta; Valeu !!! fica na index", href: "' +
    HREF +
    '", en: "nothing ventured, nothing gained", es: "quien no arriesga no pica", fr: "qui ne risque rien n a rien", it: "chi non risica non rosica", de: "wer nicht wagt, der nicht gewinnt", el: "όποιος δεν ρισκάρει", la: "qui non audet nihil gustat", yo: "ẹni tí kò dánwò", sw: "asiyehatarisha", gez: "ዘኢዴልወ", nl: "wie niet waagt", pl: "kto nie ryzykuje", ru: "кто не рискует", uk: "хто не ризикує", zh: "不入虎穴", ja: "虎穴に入らずんば", ko: "호랑이 굴", ar: "من لا يخاطر", he: "מי שלא מסתכן", hi: "जो जोखिम नहीं लेता", tr: "risk almayan", sv: "den som inte vågar", da: "den der ikke vover", no: "den som ikke våger", fi: "joka ei uskalla", cs: "kdo neriskuje", ro: "cine nu riscă", hu: "aki nem mer", ca: "qui no s arrisca", gl: "quen non arrisca", eu: "ausartzen ez dena", gn: "ojepy\'ỹiva", qu: "mana osasqa", eo: "kiu ne riskas", vi: "không liều", id: "siapa tidak berani", th: "ไม่เสี่ยง", hr: "tko ne riskira", sk: "kto neriskuje", ga: "an té nach dtéann", cy: "pwy na fentro", ha: "wanda bai yi hadari ba", am: "ያልደፈረ", fa: "آن که ریسک نکند", bn: "যে ঝুঁকি নেয় না", zu: "ongazama" },\n';
  const aliases =
    '    "que não arrisca não petisca": { gloss: "Recorte oral — ver quem não arrisca não petisca.", href: "' +
    HREF +
    '", en: "nothing ventured, nothing gained", es: "quien no arriesga no pica" },\n' +
    '    petisca: { gloss: "3.ª de petiscar — o bocado do ditado; ver quem não arrisca não petisca.", href: "' +
    HREF +
    '", en: "nibbles / tastes", es: "pica / prueba" },\n' +
    '    arrisca: { gloss: "3.ª de arriscar — o mapa do ditado; ver risco e quem não arrisca não petisca.", href: "' +
    HREF +
    '", en: "risks", es: "arriesga" },\n';
  const block = mainLine + aliases;
  const existing = /    "que não arrisca não petisca": \{[\s\S]*?\},\r?\n    "quem não arrisca não petisca": \{[\s\S]*?\},\r?\n    petisca: \{[\s\S]*?\},\r?\n    arrisca: \{[\s\S]*?\},\r?\n/;
  const existingAlt = /    "quem não arrisca não petisca": \{[\s\S]*?\},\r?\n    "que não arrisca não petisca": \{[\s\S]*?\},\r?\n    petisca: \{[\s\S]*?\},\r?\n    arrisca: \{[\s\S]*?\},\r?\n/;
  if (existing.test(gloss)) return gloss.replace(existing, block);
  if (existingAlt.test(gloss)) return gloss.replace(existingAlt, block);
  if (gloss.includes('"quem não arrisca não petisca": { tone')) return gloss;
  const afterValeu = insertAfterKey(gloss, 'valeu', block);
  if (afterValeu) return afterValeu;
  const afterPartiu = insertAfterKey(gloss, 'partiu', block);
  if (afterPartiu) return afterPartiu;
  console.warn('Aviso: glossário — inserção após valeu / partiu falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-quem-nao-arrisca-nao-petisca';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'quem não arrisca não petisca — o ditado do bocado',
    titleEn: 'quem não arrisca não petisca — the nibble proverb',
    titleEs: 'quem não arrisca não petisca — el dicho del bocado',
    tipo: 'expressao',
    priority: 1,
    status: 'feita',
    why: 'Expressões: quem não arrisca não petisca — forma correcta; voz viva que…; ≠ aposta; Valeu !!! na index',
    whyEn: 'Sayings: quem não arrisca não petisca — correct form; spoken que…; ≠ gamble; Valeu !!! on the index',
    whyEs: 'Dichos: quem não arrisca não petisca — forma correcta; viva que…; ≠ apuesta; ¡Valeu !!! en la index',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/petiscar',
      '/posts/post-inspecao-palavra-risco.html',
      '/posts/post-inspecao-palavra-valeu.html',
      '/posts/post-inspecao-expressao-faca-o-melhor.html',
      '/'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — forma correcta quem; Valeu !!! volta à index.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'quem-nao-arrisca-nao-petisca',
    word: 'quem não arrisca não petisca',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Ditado BR — forma correcta quem não arrisca não petisca; voz viva que…; ≠ aposta; Valeu !!! fica na index',
    simpleEn:
      'BR proverb — correct form quem não arrisca não petisca; spoken que…; ≠ gamble; Valeu !!! stays on the index',
    simpleEs:
      'Dicho BR — forma correcta quem não arrisca não petisca; viva que…; ≠ apuesta; Valeu !!! sigue en la index',
    history:
      'Pedido de campo: expressão correcta quem não arrisca não petisca. Valeu !!! volta à index; o ditado fica na ficha.',
    curiosities:
      'Petiscar = bocado, não banquete. Arriscar = mapa, não salto vazio. A boca corta o m (que); a ficha ancora quem.',
    historyEn:
      'Field: the correct saying is quem não arrisca não petisca. Valeu !!! returns to the index; the proverb stays on its sheet.',
    curiositiesEn:
      'Petiscar = a nibble, not a feast. Arriscar = a map, not an empty leap. The mouth drops the m (que); the sheet keeps quem.',
    historyEs:
      'Pedido de campo: la forma correcta es quem não arrisca não petisca. Valeu !!! vuelve a la index; el dicho queda en la ficha.',
    curiositiesEs:
      'Petiscar = bocado, no banquete. Arriscar = mapa, no salto vacío. La boca corta la m (que); la ficha ancla quem.'
  };
  const gi = items.findIndex(
    (x) =>
      x.id === entry.id ||
      x.word === entry.word ||
      x.word === 'quem não arrisca não petisca'
  );
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'valeu' || x.id === 'partiu' || x.id === 'faca-o-melhor');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'generate-quem-nao-arrisca-nao-petisca-cover.js')],
      { cwd: ROOT, stdio: 'inherit' }
    );
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildQuemNaoArriscaNaoPetiscaPost());
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
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (quem não arrisca não petisca)');
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
