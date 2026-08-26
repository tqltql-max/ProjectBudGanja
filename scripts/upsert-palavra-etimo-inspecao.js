'use strict';

/**
 * Injeta a palavra étimo (peça; espécime āctiō ← agere).
 * Uso: node scripts/upsert-palavra-etimo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildEtimoPost } = require('../lib/etimo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-etimo.html';

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

function replaceGlossEntry(gloss, key, line) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, line.trimEnd().replace(/,$/, '') + ',');
}

function patchGlossary(gloss) {
  const main =
    '    étimo: { tone: "craft", category: "Ofício", mundane: "A peça da origem — não o ofício.", gloss: "Gr. étymon; ≠ etimologia; espécime ação: lat. āctiō ← agere («fazer, impulsionar»); Valeu !!!", href: "' +
    HREF +
    '", en: "etymon", es: "étimo", fr: "étymon", it: "etimo", de: "Etymon", el: "έτυμον", la: "etymon", yo: "orísun ọ̀rọ̀", sw: "asili ya neno", gez: "mənbäʾ qal", nl: "etymon", pl: "etymon", ru: "этимон", uk: "етимон", zh: "词源", ja: "語源", ko: "어원", ar: "أثيم", he: "אטימון", hi: "व्युत्पत्ति-मूल", tr: "etimon", sv: "etymon", da: "etymon", no: "etymon", fi: "etymon", cs: "etymon", ro: "etimon", hu: "etimon", ca: "etimon", gl: "etimo", eu: "etimo", gn: "ñe\'e rape", qu: "simi saphi", eo: "etimono", vi: "tu nguyen", id: "etimon", th: "รูปเดิม", hr: "etimon", sk: "etymon", ga: "eitimeon", cy: "etymon", ha: "asalin kalma", am: "ምንጭ ቃል", fa: "ریشه واژه", bn: "মূলশব্দ", zu: "umsuka wegama" },';
  const ascii =
    '    etimo: { gloss: "Grafia sem acento de étimo — a peça da origem; espécime āctiō ← agere na ficha ação.", href: "' +
    HREF +
    '", en: "etymon", es: "étimo" },';
  const en =
    '    etymon: { gloss: "EN de étimo — a peça (origem verdadeira ou melhor hipótese); ≠ etimologia; ver ficha étimo.", href: "' +
    HREF +
    '", en: "etymon", es: "étimo" },';

  let next = replaceGlossEntry(gloss, 'étimo', main);
  if (next) gloss = next;
  else console.warn('Aviso: glossário — substituição de étimo falhou');
  next = replaceGlossEntry(gloss, 'etimo', ascii);
  if (next) gloss = next;
  else console.warn('Aviso: glossário — substituição de etimo falhou');
  next = replaceGlossEntry(gloss, 'etymon', en);
  if (next) gloss = next;
  else console.warn('Aviso: glossário — substituição de etymon falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-etimo';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Étimo — a peça da origem (āctiō ← agere)',
    titleEn: 'Étimo — the origin piece (āctiō ← agere)',
    titleEs: 'Étimo — la pieza del origen (āctiō ← agere)',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: étimo (gr. étymon) — a peça ≠ etimologia; espécime ação: lat. āctiō ← agere («fazer, impulsionar»); Valeu !!!',
    whyEn: 'Words: étimo (Gk. étymon) — the piece ≠ etymology; specimen ação: Lat. āctiō ← agere (“to do, to drive”); Valeu !!!',
    whyEs: 'Palabras: étimo (gr. étymon) — la pieza ≠ etimología; espécimen ação: lat. āctiō ← agere («hacer, impulsar»); ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://en.wiktionary.org/wiki/etymon',
      'https://en.wiktionary.org/wiki/actio#Latin',
      '/posts/post-inspecao-palavra-etimologia.html',
      '/posts/post-inspecao-palavra-acao.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes:
      'Cap. ' +
      post.seriesOrder +
      ' — peça × ofício; espécime āctiō ← agere («fazer, impulsionar») na ficha ação.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'etimo',
    word: 'Étimo',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Gr. étymon — a peça da origem; ≠ etimologia (ofício); espécime ação: lat. āctiō ← agere («fazer, impulsionar»); Valeu !!!',
    simpleEn:
      'Gk. étymon — the origin piece; ≠ etymology (craft); specimen ação: Lat. āctiō ← agere (“to do, to drive”); Valeu !!!',
    simpleEs:
      'Gr. étymon — la pieza del origen; ≠ etimología (oficio); espécimen ação: lat. āctiō ← agere («hacer, impulsar»); ¡Valeu !!!',
    history:
      'Étimo vem do grego étymon (sentido verdadeiro), de étymos (verdadeiro). Não é o ofício — esse é etimologia. O pedido de campo traz um espécime: o étimo de ação é o latim āctiō ← agere («fazer, impulsionar»).',
    curiosities:
      'A orelha pode colar étimo em ação. O lab corta: étimo é a peça; āctiō é o étimo de ação, não de étimo. Fecho: Valeu !!!',
    historyEn:
      'Portuguese étimo comes from Greek étymon (true sense), from étymos (true). It is not the craft — that is etymology. The field request brings a specimen: the etymon of ação is Latin āctiō ← agere (“to do, to drive”).',
    curiositiesEn:
      'The ear may glue étimo to ação. The lab cuts: étimo is the piece; āctiō is the etymon of ação, not of étimo. Close: Valeu !!!',
    historyEs:
      'Étimo viene del griego étymon (sentido verdadero), de étymos (verdadero). No es el oficio — ese es etimología. El pedido de campo trae un espécimen: el étimo de ação es el latín āctiō ← agere («hacer, impulsar»).',
    curiositiesEs:
      'El oído puede pegar étimo en ação. El lab corta: étimo es la pieza; āctiō es el étimo de ação, no de étimo. Cierre: Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'etimologia' || x.word === 'Etimologia');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-etimo-palavra-cover.js')], {
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

  const post = stampFiles(buildEtimoPost());
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
    console.log('Glossário actualizado (étimo)');
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
