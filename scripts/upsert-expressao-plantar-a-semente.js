'use strict';

/**
 * Injeta a expressão «plantar a semente» / «plantar as sementes».
 * Uso: node scripts/upsert-expressao-plantar-a-semente.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPlantarASementePost } = require('../lib/plantar-a-semente-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-plantar-a-semente.html';

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
    '    "plantar a semente": { tone: "craft", category: "Ofício", mundane: "Fincar a semente na terra; o gesto activo da partida.", gloss: "Plantar + a + semente — a palma entrega; lapso a sementes (artigo × plural); ≠ guia de cultivo ≠ fábrica ≠ foi plantada; Valeu !!!", href: "' +
    HREF +
    '", en: "to plant the seed", es: "plantar la semilla", fr: "planter la graine", it: "piantare il seme", de: "den Samen pflanzen", el: "fytevo to sporos", la: "semen plantare", yo: "gbin irugbin", sw: "panda mbegu", gez: "zarʾ takala", nl: "het zaad planten", pl: "posadzic nasiono", ru: "posadit semia", uk: "posadyty nasinnia", zh: "zhong xia zhongzi", ja: "tane wo ueru", ko: "ssiat simda", ar: "yazra al-bidhra", he: "lita zera", hi: "beej lagana", tr: "tohum ekmek", sv: "plantera froet", da: "plante froet", no: "plante froet", fi: "istuttaa siemen", cs: "zasadit semeno", ro: "a planta samanta", hu: "elultetni a magot", ca: "plantar la llavor", gl: "plantar a semente", eu: "hazi landatu", gn: "ñoty ñemoty", qu: "muhuta tarpuy", eo: "planti la semon", vi: "gieo hat", id: "menanam benih", th: "pluk malet", hr: "posaditi sjeme", sk: "zasadit semeno", ga: "an siol a chur", cy: "plannu r had", ha: "shuka iri", am: "zer metekel", fa: "kashtan dane", bn: "bij ropon", zu: "tshala imbewu" },\n';
  const aliases =
    '    "plantar as sementes": { gloss: "Plural da locução — muitas partidas; ver plantar a semente.", href: "' +
    HREF +
    '", en: "to plant the seeds", es: "plantar las semillas" },\n' +
    '    "plantar a sementes": { gloss: "Lapso de campo — artigo a + plural sementes; âncora plantar a semente.", href: "' +
    HREF +
    '", en: "slip: a + sementes", es: "lapso: a + sementes" },\n' +
    '    "plantar uma semente": { gloss: "Variante indefinida — uma partida entre outras; ver plantar a semente.", href: "' +
    HREF +
    '", en: "to plant a seed", es: "plantar una semilla" },\n' +
    '    plantar: { gloss: "Verbo lat. plantare — fincar / pôr a crescer; locução plantar a semente; palavra planta é o ser vivo.", href: "' +
    HREF +
    '", en: "to plant", es: "plantar", fr: "planter", it: "piantare", de: "pflanzen", el: "fytevo", la: "plantare", yo: "gbin", sw: "panda", gez: "takala", nl: "planten", pl: "sadzic", ru: "sazhat", uk: "sadyty", zh: "zhong", ja: "ueru", ko: "simda", ar: "yazra", he: "lita", hi: "lagana", tr: "dikmek", sv: "plantera", da: "plante", no: "plante", fi: "istuttaa", cs: "sadit", ro: "a planta", hu: "ultetni", ca: "plantar", gl: "plantar", eu: "landatu", gn: "ñoty", qu: "tarpuy", eo: "planti", vi: "trong", id: "menanam", th: "pluk", hr: "saditi", sk: "sadit", ga: "cur", cy: "plannu", ha: "shuka", am: "metekel", fa: "kashtan", bn: "ropon", zu: "tshala" },\n' +
    '    "plantar uma ideia": { gloss: "Metáfora — cita-se; âncora continua a ser plantar a semente na terra.", href: "' +
    HREF +
    '", en: "to plant an idea", es: "plantar una idea" },\n' +
    '    "a semente foi plantada": { gloss: "Resultado / particípio — poema Vida; o gesto activo é plantar a semente.", href: "' +
    HREF +
    '", en: "the seed was planted (result)", es: "la semilla fue plantada (resultado)" },\n';

  if (gloss.includes('"plantar a semente":')) {
    return gloss;
  }
  const afterSemente = insertAfterNeedle(
    gloss,
    '    semente: { gloss: "Partida do arco Vida — no gelo vira mudinha; a semente não grita."',
    mainLine + aliases
  );
  if (afterSemente) return afterSemente;
  const afterPlanta = insertAfterNeedle(
    gloss,
    '    planta: { gloss: "Lat. planta / plantare — ser vivo vegetal;',
    mainLine + aliases
  );
  if (afterPlanta) return afterPlanta;
  console.warn('Aviso: glossário — inserção após semente / planta falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-plantar-a-semente';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Plantar a semente — o gesto que entrega a partida',
    titleEn: 'Plantar a semente — the gesture that delivers the start',
    titleEs: 'Plantar a semente — el gesto que entrega la partida',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: plantar a semente / as sementes — gesto activo; lapso a sementes; ≠ guia de cultivo ≠ fábrica ≠ foi plantada; Valeu !!!',
    whyEn: 'Sayings: plantar a semente / as sementes — active gesture; slip a sementes; ≠ grow guide ≠ factory ≠ was planted; Valeu !!!',
    whyEs: 'Dichos: plantar a semente / as sementes — gesto activo; lapso a sementes; ≠ guía de cultivo ≠ fábrica ≠ fue plantada; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/semente',
      '/posts/post-inspecao-palavra-semente.html',
      '/posts/post-inspecao-palavra-planta.html',
      '/posts/post-inspecao-expressao-meter-a-mao.html',
      '/posts/post-inspecao-palavra-arvore-da-vida.html',
      '/vida/'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — gesto × resultado Vida; lapso a sementes; ficha ≠ guia de cultivo.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'plantar-a-semente',
    word: 'plantar a semente',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Locução BR — fincar a semente na terra (gesto activo); variante as sementes; lapso a sementes; ≠ guia de cultivo ≠ fábrica ≠ foi plantada; Valeu !!!',
    simpleEn:
      'BR saying — set the seed in the soil (active gesture); plural as sementes; slip a sementes; ≠ grow guide ≠ factory ≠ was planted; Valeu !!!',
    simpleEs:
      'Dicho BR — hincar la semilla en la tierra (gesto activo); variante as sementes; lapso a sementes; ≠ guía de cultivo ≠ fábrica ≠ fue plantada; ¡Valeu !!!',
    history:
      'Plantar (lat. plantare «fincar, pôr a crescer») + artigo + semente (lat. sēmen). Pedido de campo 2026-08-26: expressão plantar a sementes.',
    curiosities:
      'Âncora singular a semente; plural as sementes. Lapso: artigo a + plural sementes. Distinto do poema Vida «A semente foi plantada» (resultado). Irmã de meter a mão. Ficha ≠ receita de cultivo.',
    historyEn:
      'Portuguese plantar (Lat. plantare “to set, to make grow”) + article + semente (Lat. sēmen). Field request 2026-08-26: inspect plantar a sementes.',
    curiositiesEn:
      'Anchor singular a semente; plural as sementes. Slip: article a + plural sementes. Distinct from Vida’s “The seed was planted” (result). Sister of meter a mão. Sheet ≠ grow recipe.',
    historyEs:
      'Plantar (lat. plantare «hincar, poner a crecer») + artículo + semente (lat. sēmen). Pedido de campo 2026-08-26: inspección de plantar a sementes.',
    curiositiesEs:
      'Áncora singular a semente; plural as sementes. Lapso: artículo a + plural sementes. Distinto del poema Vida «La semilla fue plantada» (resultado). Hermana de meter a mão. Ficha ≠ receta de cultivo.'
  };
  const verb = {
    id: 'plantar',
    word: 'plantar',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Verbo lat. plantare — fincar / pôr a crescer; locução plantar a semente; a palavra planta é o ser vivo.',
    simpleEn:
      'Verb from Lat. plantare — to set / to make grow; saying plantar a semente; the word planta is the living being.',
    simpleEs:
      'Verbo lat. plantare — hincar / poner a crecer; locución plantar a semente; la palabra planta es el ser vivo.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'semente');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  const vi = items.findIndex((x) => x.id === verb.id);
  if (vi >= 0) items[vi] = Object.assign({}, items[vi], verb);
  else {
    const afterEntry = items.findIndex((x) => x.id === entry.id);
    if (afterEntry >= 0) items.splice(afterEntry + 1, 0, verb);
    else items.push(verb);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-plantar-a-semente-cover.js')], {
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

  const post = stampFiles(buildPlantarASementePost());
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
    console.log('Glossário actualizado (plantar a semente)');
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
