'use strict';

/**
 * Injeta a expressão «meter a mão».
 * Uso: node scripts/upsert-expressao-meter-a-mao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMeterAMaoPost } = require('../lib/meter-a-mao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-meter-a-mao.html';

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

function insertAfterNeedle(gloss, needle, block) {
  const idx = gloss.indexOf(needle);
  if (idx < 0) return null;
  const end = gloss.indexOf('\n', idx);
  if (end < 0) return null;
  return gloss.slice(0, end + 1) + block + gloss.slice(end + 1);
}

function patchGlossary(gloss) {
  const mainLine =
    '    "meter a mão": { tone: "craft", category: "Ofício", mundane: "Pôr a mão dentro; por extensão, mão na massa / contacto com o ofício.", gloss: "Meter + a + mão — o gesto que entra; ≠ furto ≠ toque sem pedido ≠ futebol ≠ pedir a mão; Valeu !!!", href: "' +
    HREF +
    '", en: "put the hand in / get hands-on", es: "meter la mano / manos a la obra", fr: "mettre la main a la pate", it: "mettere mano / mani in pasta", de: "Hand anlegen", el: "bazo to cheri", la: "manum immittere", yo: "fi owo si i", sw: "tia mkono", gez: "ed west", nl: "de hand erin steken", pl: "wlozyc reke", ru: "sunut ruku", uk: "sunuty ruku", zh: "chashou", ja: "te wo ireru", ko: "son neotda", ar: "madd al-yad", he: "lasim yad", hi: "hath lagana", tr: "el atmak", sv: "lagga handen i", da: "laegge haanden i", no: "legge handen i", fi: "pistaa kasi", cs: "strcit ruku", ro: "baga mana", hu: "beletenni a kezet", ca: "ficar la ma", gl: "meter a man", eu: "eskua sartu", gn: "moinge po", qu: "makita churay", eo: "meti la manon", vi: "tho tay vao", id: "masukkan tangan", th: "yuen mue", hr: "gurati ruku", sk: "strcit ruku", ga: "lamh a chur isteach", cy: "rhoi llaw i mewn", ha: "saka hannu", am: "ej masgebat", fa: "dast gozashtan", bn: "hat deoa", zu: "faka isandla" },\n';
  const aliases =
    '    "mete a mão": { gloss: "Imperativo oral — ver meter a mão.", href: "' +
    HREF +
    '", en: "put your hand in (oral)", es: "mete la mano" },\n' +
    '    "meter a mão na massa": { gloss: "Variante de ofício — primeiro contacto com a matéria; ver meter a mão.", href: "' +
    HREF +
    '", en: "get hands dirty / hands-on", es: "manos a la obra" },\n' +
    '    "mão na massa": { gloss: "Família de ofício de meter a mão — fazer em vez de só mandar.", href: "' +
    HREF +
    '", en: "hands-on / hands in the dough", es: "manos a la obra" },\n' +
    '    "meter a mão no bolso": { gloss: "Sala do pagar — ver meter a mão; ≠ furto.", href: "' +
    HREF +
    '", en: "reach into the pocket / pay", es: "meter la mano en el bolsillo" },\n' +
    '    "meter a mão na consciência": { gloss: "Sala moral — examinar-se; ver meter a mão.", href: "' +
    HREF +
    '", en: "search the conscience", es: "meter la mano en la conciencia" },\n';

  if (gloss.includes('"meter a mão":')) {
    return gloss;
  }
  const afterMarcha = insertAfterNeedle(
    gloss,
    '    marcha: { tone: "caution", category: "Passo / caixa"',
    mainLine + aliases
  );
  if (afterMarcha) return afterMarcha;
  const afterMeter = insertAfterNeedle(gloss, '    "meter marcha": { tone: "craft"', mainLine + aliases);
  if (afterMeter) return afterMeter;
  console.warn('Aviso: glossário — inserção após marcha / meter marcha falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-meter-a-mao';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Meter a mão — o gesto que entra no ofício',
    titleEn: 'Meter a mão — the gesture that enters the craft',
    titleEs: 'Meter a mão — el gesto que entra en el oficio',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: meter a mão — contacto com a massa / o ofício; ≠ furto ≠ toque sem consentimento ≠ futebol; Valeu !!!',
    whyEn: 'Sayings: meter a mão — hands-on contact with the craft; ≠ theft ≠ unwanted touch ≠ football; Valeu !!!',
    whyEs: 'Dichos: meter a mão — contacto con la masa / el oficio; ≠ hurto ≠ toque sin consentimiento ≠ fútbol; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/m%C3%A3o',
      '/posts/post-inspecao-expressao-meter-marcha.html',
      '/posts/post-inspecao-palavra-pedi-mao.html',
      '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-respeito.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — ofício × cortes furto/toque/bola; irmã de meter marcha.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'meter-a-mao',
    word: 'meter a mão',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Locução BR — pôr a mão no ofício / mão na massa; ≠ furto ≠ toque sem consentimento ≠ futebol; Valeu !!!',
    simpleEn:
      'BR saying — put the hand into the craft / hands-on; ≠ theft ≠ unwanted touch ≠ football; Valeu !!!',
    simpleEs:
      'Dicho BR — meter la mano en el oficio / manos a la obra; ≠ hurto ≠ toque sin consentimiento ≠ fútbol; ¡Valeu !!!',
    history:
      'Meter (lat. mittere «pôr, enviar») + a + mão (lat. manus). Pedido de campo 2026-08-24: inspeção da expressão meter a mão.',
    curiosities:
      'Irmã de meter marcha (mesmo verbo, outro objecto). Inverso de pedir a mão (abrir a palma × meter a palma). Canónica: mão na massa.',
    historyEn:
      'Portuguese meter (Lat. mittere “to put, to send”) + a + mão (Lat. manus). Field request 2026-08-24: inspect the saying meter a mão.',
    curiositiesEn:
      'Sister of meter marcha (same verb, other object). Inverse of pedir a mão (open the palm × put the palm in). Canon: hands-on.',
    historyEs:
      'Meter (lat. mittere «poner, enviar») + a + mão (lat. manus). Pedido de campo 2026-08-24: inspección de la expresión meter a mão.',
    curiositiesEs:
      'Hermana de meter marcha (mismo verbo, otro objeto). Inverso de pedir a mão (abrir la palma × meter la palma). Canónica: manos a la obra.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'meter-marcha');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-meter-a-mao-cover.js')], {
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

  const post = stampFiles(buildMeterAMaoPost());
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
    console.log('Glossário actualizado (meter a mão)');
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
