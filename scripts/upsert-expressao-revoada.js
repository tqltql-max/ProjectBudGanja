'use strict';

/**
 * Injeta a expressão «Revoada».
 * Uso: node scripts/upsert-expressao-revoada.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildRevoadaPost } = require('../lib/revoada-inspecao-post.js');
const { buildRelacaoPost } = require('../lib/relacao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-revoada.html';

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
  if (gloss.includes('revoada:') || gloss.includes('"revoada":')) return gloss;
  const block =
    '    revoada: { tone: "bond", category: "Bando", mundane: "Conjunto de aves que levantam voo juntas; por extensão, vários a partir ao mesmo tempo.", gloss: "re- + voar + -ada — relação do bando no gesto de voar; pássaro / Birds; ≠ voo solo ≠ drone ≠ passar; Valeu !!!", href: "' +
    HREF +
    '", en: "flock taking wing", es: "bandada alzando el vuelo" },\n' +
    '    revoar: { gloss: "Verbo de revoada — voar de novo / em volta / levantar voo em bando.", href: "' +
    HREF +
    '", en: "to take wing (flock)", es: "alzar el vuelo (bandada)" },\n' +
    '    "gesto de voar": { gloss: "Acto mínimo de asa ou braço-asa — ver Revoada; ≠ ficha Tamara voar (câmara).", href: "' +
    HREF +
    '", en: "flying gesture", es: "gesto de volar" },\n' +
    '    pássaro: { gloss: "Ave — lat. passer; nesta rede, animal da revoada; ≠ verbo passar.", href: "' +
    HREF +
    '", en: "bird", es: "pájaro" },\n' +
    '    passaro: { gloss: "Grafia sem acento de pássaro — ver Revoada.", href: "' +
    HREF +
    '", en: "bird", es: "pájaro" },\n' +
    '    birds: { gloss: "EN de pássaros / aves — referente da revoada; ≠ só Three Little Birds.", href: "' +
    HREF +
    '", en: "birds", es: "pájaros" },\n';

  const afterRelacao = insertAfterKey(gloss, 'relação', block);
  if (afterRelacao) return afterRelacao;
  const afterVoar = insertAfterKey(gloss, 'voar', block);
  if (afterVoar) return afterVoar;
  console.warn('Aviso: glossário — inserção após relação/voar falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'expressao-revoada';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Revoada — a relação do bando no gesto de voar',
    titleEn: 'Revoada — the flock’s relation in the flying gesture',
    titleEs: 'Revoada — la relación de la bandada en el gesto de volar',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões: Revoada — bando que levanta voo; relação × pássaro / Birds × gesto de voar; Valeu !!!',
    whyEn: 'Sayings: Revoada — flock taking wing; relation × bird / Birds × flying gesture; Valeu !!!',
    whyEs: 'Dichos: Revoada — bandada alzando el vuelo; relación × pájaro / Birds × gesto de volar; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/revoar',
      'https://pt.wiktionary.org/wiki/voar',
      '/posts/post-inspecao-palavra-relacao.html',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-animal.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — entre do bando; mime ≠ ave ≠ drone.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'revoada',
    word: 'revoada',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      're- + voar + -ada — bando que levanta voo junto; relação × pássaro / Birds × gesto de voar; Valeu !!!',
    simpleEn:
      're- + voar + -ada — flock taking wing together; relation × bird / Birds × flying gesture; Valeu !!!',
    simpleEs:
      're- + voar + -ada — bandada alzando el vuelo; relación × pájaro / Birds × gesto de volar; ¡Valeu !!!',
    history:
      'De revoar (re- + voar, lat. volāre) + sufixo colectivo -ada (como boiada). Nomeia o entre do bando, não o voo a solo.',
    curiosities:
      'Pedido de campo: relação com animal pássaro / Birds e o gesto de voar. Corte: pássaro ≠ passar; mime de braços ≠ ofício da asa; ficha Tamara voar = câmara, não a revoada.',
    historyEn:
      'From revoar (re- + voar, Lat. volāre) + collective -ada. Names the flock’s between, not a solo flight.',
    curiositiesEn:
      'Field request: relation with animal bird / Birds and the flying gesture. Cut: pássaro ≠ passar; arm-mime ≠ wing craft.',
    historyEs:
      'De revoar (re- + voar, lat. volāre) + sufijo colectivo -ada. Nombra el entre de la bandada, no el vuelo a solas.',
    curiositiesEs:
      'Pedido de campo: relación con animal pájaro / Birds y el gesto de volar. Corte: pássaro ≠ passar; mimo de brazos ≠ oficio del ala.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'voar' || x.id === 'relacao' || x.id === 'gesto');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

function keepOrder(posts, slug, builder) {
  const existing = posts.find((p) => p.slug === slug);
  const order =
    existing && typeof existing.seriesOrder === 'number' ? existing.seriesOrder : undefined;
  return builder(order);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-revoada-cover.js')], {
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

  const post = stampFiles(buildRevoadaPost());
  const relacaoPost = stampFiles(keepOrder(posts, 'inspecao-palavra-relacao', buildRelacaoPost));

  upsertPost(posts, post);
  upsertPost(posts, relacaoPost);
  writeHtml(post);
  writeHtml(relacaoPost);
  writeI18n(i18n, post);
  writeI18n(i18n, relacaoPost);
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
    console.log('Glossário actualizado (revoada)');
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
