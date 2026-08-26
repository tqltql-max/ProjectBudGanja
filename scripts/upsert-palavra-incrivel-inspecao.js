'use strict';

/**
 * Actualiza a palavra incrível (cruzada com acreditar / fé).
 * Uso: node scripts/upsert-palavra-incrivel-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildIncrivelPost } = require('../lib/incrivel-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-incrivel.html';
const INAC_HREF = '/posts/post-inspecao-palavra-inacreditavel.html';
const AMOR_FE_HREF = '/posts/post-inspecao-arte-amor-e-fe.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 12) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      const tmp = file + '.tmp-' + process.pid;
      fs.writeFileSync(tmp, payload, 'utf8');
      fs.renameSync(tmp, file);
      return;
    } catch (e) {
      last = e;
      try {
        fs.writeFileSync(file, payload, 'utf8');
        return;
      } catch (e2) {
        last = e2;
      }
      await sleep(300 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

async function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPostHtml(normalized);
  await writeJsonRetry(out, html);
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

const INCRIVEL_BLOCK =
  '    incrivel: { tone: "warm", category: "Léxico", mundane: "Adjectivo / uau BR — o que não cabe no crível.", gloss: "Lat. incredibilis ← credere; cruza com acreditar (mesmo tronco) e fé (fides, outro étimo); ≠ inacreditável; Valeu !!!", href: "' +
  HREF +
  '", en: "incredible / unbelievable", es: "increíble", fr: "incroyable", it: "incredibile", de: "unglaublich", el: "απίστευτος", la: "incredibilis", yo: "àìgbàgbọ́", sw: "asiyeaminika", gez: "ዘኢይትአመን", nl: "ongelooflijk", pl: "niesamowity", ru: "невероятный", uk: "неймовірний", zh: "不可思议的", ja: "信じられない", ko: "믿을 수 없는", ar: "لا يصدق", he: "מדהים", hi: "अविश्वसनीय", tr: "inanılmaz", sv: "otrolig", da: "utrolig", no: "utrolig", fi: "uskomaton", cs: "neuvěřitelný", ro: "incredibil", hu: "hihetetlen", ca: "increïble", gl: "incríbel", eu: "sinestezina", gn: "ndaikatúiva jerovia", qu: "mana iñinapaq", eo: "nekredebla", vi: "không thể tin được", id: "luar biasa", th: "เหลือเชื่อ", hr: "nevjerojatan", sk: "neuveriteľný", ga: "dochreidte", cy: "anhygoel", ha: "abin mamaki", am: "የማይታመን", fa: "باورنکردنی", bn: "অবিশ্বাস্য", zu: "okungakholeki" },\n';

const EXTRA_BLOCK =
  '    incrivelmente: { gloss: "Advérbio de incrível — grau / intensificador; ver ficha incrível.", href: "' +
  HREF +
  '", en: "incredibly", es: "increíblemente" },\n' +
  '    incredibilis: { gloss: "Étimo latino de incrível — in- + credibilis ← credere; ver ficha.", href: "' +
  HREF +
  '", en: "incredibilis (Lat.)", es: "incredibilis" },\n' +
  '    acreditar: { tone: "craft", category: "Léxico", mundane: "Verbo — dar crédito / crer num objecto.", gloss: "Lat. credere (a- + creditar); mesmo tronco de incrível; ≠ fé (fides); Valeu !!!", href: "' +
  HREF +
  '", en: "to believe / to credit", es: "acreditar", fr: "croire / accréditer", it: "credere", de: "glauben", el: "πιστεύω", la: "credere", yo: "gbàgbọ́", sw: "kuamini", gez: "አመነ", nl: "geloven", pl: "wierzyć", ru: "верить", uk: "вірити", zh: "相信", ja: "信じる", ko: "믿다", ar: "يصدق", he: "להאמין", hi: "विश्वास करना", tr: "inanmak", sv: "tro", da: "tro", no: "tro", fi: "uskoa", cs: "věřit", ro: "a crede", hu: "hinni", ca: "creure", gl: "acreditar", eu: "sinetsi", gn: "jerovia", qu: "iñiy", eo: "kredi", vi: "tin", id: "percaya", th: "เชื่อ", hr: "vjerovati", sk: "veriť", ga: "creid", cy: "credu", ha: "yi imani", am: "ማመን", fa: "باور کردن", bn: "বিশ্বাস করা", zu: "ukukholwa" },\n' +
  '    crer: { gloss: "Via curta de credere — mesmo tronco de incrível / acreditar; ≠ fé (fides).", href: "' +
  HREF +
  '", en: "to believe", es: "creer" },\n' +
  '    "fé": { tone: "warm", category: "Léxico", mundane: "Confiança / lealdade / fé religiosa.", gloss: "Lat. fides — outro étimo que credere; cruza com incrível no peito, não no étimo; canção Amor e Fé; Valeu !!!", href: "' +
  AMOR_FE_HREF +
  '", en: "faith", es: "fe", fr: "foi", it: "fede", de: "Glaube", el: "πίστη", la: "fides", yo: "ìgbàgbọ́", sw: "imani", gez: "ሃይማኖት", nl: "geloof", pl: "wiara", ru: "вера", uk: "віра", zh: "信仰", ja: "信仰", ko: "신앙", ar: "إيمان", he: "אמונה", hi: "विश्वास", tr: "iman", sv: "tro", da: "tro", no: "tro", fi: "usko", cs: "víra", ro: "credință", hu: "hit", ca: "fe", gl: "fe", eu: "fede", gn: "jerovia", qu: "iñiy", eo: "fido", vi: "đức tin", id: "iman", th: "ศรัทธา", hr: "vjera", sk: "viera", ga: "creideamh", cy: "ffydd", ha: "bangaskiya", am: "እምነት", fa: "ایمان", bn: "বিশ্বাস", zu: "ukukholwa" },\n' +
  '    fe: { gloss: "Grafia sem acento de fé — lat. fides; cruzamento na ficha incrível; canção Amor e Fé.", href: "' +
  AMOR_FE_HREF +
  '", en: "faith (unaccented)", es: "fe" },\n' +
  '    fides: { gloss: "Étimo latino de fé — confiança / lealdade; ≠ credere (acreditar / incrível).", href: "' +
  AMOR_FE_HREF +
  '", en: "fides (Lat. faith)", es: "fides" },\n' +
  '    credere: { gloss: "Étimo latino de crer / acreditar / incrível — dar crédito; ≠ fides.", href: "' +
  HREF +
  '", en: "credere (Lat. to believe)", es: "credere" },\n';

function replaceIncrivelStub(gloss) {
  const re = new RegExp('    incrivel:\\s*\\{[\\s\\S]*?' + ZU_TAIL.source);
  if (!re.test(gloss)) return null;
  return gloss.replace(re, INCRIVEL_BLOCK);
}

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function hasKey(gloss, key) {
  return new RegExp('\\n    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':').test(gloss);
}

function patchGlossary(gloss) {
  let out = gloss;
  const replaced = replaceIncrivelStub(out);
  if (replaced) out = replaced;
  else if (!out.includes('href: "' + HREF + '"')) {
    const inserted = insertAfterKey(out, 'inacreditavel', INCRIVEL_BLOCK);
    if (inserted) out = inserted;
    else console.warn('Aviso: glossário — incrivel não inserido');
  }
  if (!hasKey(out, 'acreditar')) {
    const extra = insertAfterKey(out, 'incrivel', EXTRA_BLOCK);
    if (extra) out = extra;
    else console.warn('Aviso: glossário — acreditar/fé não inseridos');
  }
  return out;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-incrivel';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Incrível — incredibilis, cruzado com acreditar e fé',
    titleEn: 'Incrível — incredibilis, crossed with acreditar and fé',
    titleEs: 'Incrível — incredibilis, cruzado con acreditar y fé',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: incrível (lat. incredibilis ← credere) — incredulidade e elogio BR; cruza com acreditar (mesmo tronco) e fé (fides); Valeu !!!',
    whyEn: 'Words: incrível (Lat. incredibilis ← credere) — unbelief and BR praise; crosses with acreditar (same trunk) and fé (fides); Valeu !!!',
    whyEs: 'Palabras: incrível (lat. incredibilis ← credere) — incredulidad y elogio BR; cruza con acreditar y fé (fides); ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://en.wiktionary.org/wiki/incredibilis',
      'https://pt.wiktionary.org/wiki/acreditar',
      'https://pt.wiktionary.org/wiki/f%C3%A9',
      INAC_HREF,
      AMOR_FE_HREF,
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes:
      'Cap. ' +
      post.seriesOrder +
      ' — credere × fides; incrível não funde com fé; irmão inacreditável.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'incrivel',
    word: 'incrível',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Lat. incredibilis ← credere — inacreditável e elogio BR «uau»; cruza com acreditar (mesmo tronco) e fé (fides, outro étimo); Valeu !!!',
    simpleEn:
      'Lat. incredibilis ← credere — unbelievable and BR praise “wow”; crosses with acreditar (same trunk) and fé (fides, other etymon); Valeu !!!',
    simpleEs:
      'Lat. incredibilis ← credere — inacreditável y elogio BR «uau»; cruza con acreditar (mismo tronco) y fé (fides, otro étimo); ¡Valeu !!!',
    history:
      'Incrível vem do latim incredibilis (in- + credibilis ← credere). No laboratório cruza com acreditar (mesmo tronco) e com fé (fides): o peito pode segurar o não-crível, mas os étimos não se fundem.',
    curiosities:
      'O in- marca o limite do crédito, não apaga o ofício. «É incrível, logo é verdade» é falácia. Irmão: inacreditável (via acreditar). Fecho: Valeu !!!',
    historyEn:
      'Portuguese incrível comes from Latin incredibilis (in- + credibilis ← credere). In the lab it crosses with acreditar (same trunk) and fé (fides): the chest may hold the unbelievable, but the etymons do not fuse.',
    curiositiesEn:
      'The in- marks the limit of credit; it does not erase craft. “It is incredible, therefore true” is a fallacy. Sibling: inacreditável. Close: Valeu !!!',
    historyEs:
      'Increíble viene del latín incredibilis (in- + credibilis ← credere). En el laboratorio cruza con acreditar (mismo tronco) y fé (fides): el pecho puede sujetar lo no creíble, pero los étimos no se fusionan.',
    curiositiesEs:
      'El in- marca el límite del crédito, no apaga el oficio. «Es incrível, luego es verdad» es falacia. Hermano: inacreditável. Cierre: ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'inacreditavel');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-incrivel-palavra-cover.js')], {
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

  const post = stampFiles(buildIncrivelPost());
  upsertPost(posts, post);
  await writeHtml(post);
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
    console.log('Glossário actualizado (incrível × acreditar / fé)');
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
