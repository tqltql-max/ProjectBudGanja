'use strict';

/**
 * Injeta a expressão «que não arrisca não petisca».
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
    '    "que não arrisca não petisca": { tone: "craft", category: "Ditado", mundane: "Provérbio BR — sem risco não há gosto / ganho.", gloss: "Voz viva de quem não arrisca não petisca; index no lugar de Valeu !!!; arriscar × petiscar; ≠ aposta; Valeu !!! fica no fecho", href: "' +
    HREF +
    '", en: "nothing ventured, nothing gained", es: "quien no arriesga no pica", fr: "qui ne risque rien n a rien", it: "chi non risica non rosica", de: "wer nicht wagt, der nicht gewinnt", el: "όποιος δεν ρισκάρει", la: "qui non audet nihil gustat", yo: "ẹni tí kò dánwò", sw: "asiyehatarisha", gez: "ዘኢዴልወ", nl: "wie niet waagt", pl: "kto nie ryzykuje", ru: "кто не рискует", uk: "хто не ризикує", zh: "不入虎穴", ja: "虎穴に入らずんば", ko: "호랑이 굴", ar: "من لا يخاطر", he: "מי שלא מסתכן", hi: "जो जोखिम नहीं लेता", tr: "risk almayan", sv: "den som inte vågar", da: "den der ikke vover", no: "den som ikke våger", fi: "joka ei uskalla", cs: "kdo neriskuje", ro: "cine nu riscă", hu: "aki nem mer", ca: "qui no s arrisca", gl: "quen non arrisca", eu: "ausartzen ez dena", gn: "ojepy\'ỹiva", qu: "mana osasqa", eo: "kiu ne riskas", vi: "không liều", id: "siapa tidak berani", th: "ไม่เสี่ยง", hr: "tko ne riskira", sk: "kto neriskuje", ga: "an té nach dtéann", cy: "pwy na fentro", ha: "wanda bai yi hadari ba", am: "ያልደፈረ", fa: "آن که ریسک نکند", bn: "যে ঝুঁকি নেয় না", zu: "ongazama" },\n';
  const aliases =
    '    "quem não arrisca não petisca": { gloss: "Forma âncora do ditado — ver que não arrisca não petisca.", href: "' +
    HREF +
    '", en: "nothing ventured, nothing gained", es: "quien no arriesga no pica" },\n' +
    '    petisca: { gloss: "3.ª de petiscar — o bocado do ditado; ver que não arrisca não petisca.", href: "' +
    HREF +
    '", en: "nibbles / tastes", es: "pica / prueba" },\n' +
    '    arrisca: { gloss: "3.ª de arriscar — o mapa do ditado; ver risco e que não arrisca não petisca.", href: "' +
    HREF +
    '", en: "risks", es: "arriesga" },\n';

  if (gloss.includes('"que não arrisca não petisca":')) {
    return gloss;
  }
  const afterValeu = insertAfterKey(gloss, 'valeu', mainLine + aliases);
  if (afterValeu) return afterValeu;
  const afterPartiu = insertAfterKey(gloss, 'partiu', mainLine + aliases);
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
    title: 'que não arrisca não petisca — o ditado do bocado',
    titleEn: 'que não arrisca não petisca — the nibble proverb',
    titleEs: 'que não arrisca não petisca — el dicho del bocado',
    tipo: 'expressao',
    priority: 1,
    status: 'feita',
    why: 'Expressões: que não arrisca não petisca — voz viva / index no lugar de Valeu !!!; âncora quem…; ≠ aposta; Valeu !!!',
    whyEn: 'Sayings: que não arrisca não petisca — living voice / index instead of Valeu !!!; anchor quem…; ≠ gamble; Valeu !!!',
    whyEs: 'Dichos: que não arrisca não petisca — voz viva / index en lugar de Valeu !!!; ancla quem…; ≠ apuesta; ¡Valeu !!!',
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
    notes: 'Cap. ' + post.seriesOrder + ' — mantra visível da index; Valeu !!! permanece fecho das fichas.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'quem-nao-arrisca-nao-petisca',
    word: 'que não arrisca não petisca',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Ditado BR — voz viva que não arrisca não petisca; âncora quem…; index no lugar de Valeu !!!; ≠ aposta; Valeu !!! fica no fecho',
    simpleEn:
      'BR proverb — living que não arrisca não petisca; anchor quem…; index instead of Valeu !!!; ≠ gamble; Valeu !!! stays as close',
    simpleEs:
      'Dicho BR — voz viva que não arrisca não petisca; ancla quem…; index en lugar de Valeu !!!; ≠ apuesta; Valeu !!! sigue de cierre',
    history:
      'Pedido de campo 2026-08-24: expressão que não arrisca não petisca; e mudar Valeu !!! da página index para este ditado. Forma plena quem; boca de campo que.',
    curiosities:
      'Petiscar = bocado, não banquete. Arriscar = mapa, não salto vazio. Valeu !!! não é apagado — sai da index visível e fica no fecho das fichas.',
    historyEn:
      'Field request 2026-08-24: saying que não arrisca não petisca; and swap Valeu !!! on the index for this ditado. Full form quem; field mouth que.',
    curiositiesEn:
      'Petiscar = a nibble, not a feast. Arriscar = a map, not an empty leap. Valeu !!! is not erased — it leaves the visible index and stays as the sheet close.',
    historyEs:
      'Pedido de campo 2026-08-24: dicho que não arrisca não petisca; y cambiar Valeu !!! de la index por este dicho. Forma plena quem; boca de campo que.',
    curiositiesEs:
      'Petiscar = bocado, no banquete. Arriscar = mapa, no salto vacío. Valeu !!! no se borra — sale de la index visible y sigue como cierre de ficha.'
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
    console.log('Glossário actualizado (que não arrisca não petisca)');
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
