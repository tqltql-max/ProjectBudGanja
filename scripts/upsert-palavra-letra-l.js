'use strict';

/**
 * Injeta a letra L e o alongamento genialllll.
 * Uso: node scripts/upsert-palavra-letra-l.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLetraLPost } = require('../lib/letra-l-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-letra-l.html';
const GENIAL = '/posts/post-inspecao-palavra-genial.html';

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
  const block =
    '    "letra l": { tone: "craft", category: "Alfabeto", mundane: "12.ª letra do alfabeto latino; nome PT éle.", gloss: "Haste /l/; romano 50; genialllll = genial esticado; ≠ Lula ≠ loss; Valeu !!!", href: "' +
    HREF +
    '", en: "letter L", es: "letra L" },\n' +
    '    "éle": { gloss: "Nome PT da letra L — ver letra l.", href: "' +
    HREF +
    '", en: "L (letter name)", es: "ele (nombre de L)" },\n' +
    '    "genial!!!": { gloss: "GEnial!!! — a mesma palavra genial com o peito alto; ver genial.", href: "' +
    GENIAL +
    '", en: "genial!!!", es: "¡genial!" },\n' +
    '    genialllll: { gloss: "Alongamento oral de genial — o L estica o sopro; ver genial (não é letra-âncora).", href: "' +
    GENIAL +
    '", en: "stretched genial", es: "genial alargado" },\n' +
    '    geniaalll: { gloss: "Lapso / alongamento de genial — ver genial.", href: "' +
    GENIAL +
    '", en: "slip of genial", es: "lapsus de genial" },\n';

  if (gloss.includes('"letra l":')) return gloss;
  const inserted = insertAfterKey(gloss, 'genial', block);
  if (inserted) return inserted;
  console.warn('Aviso: glossário — inserção após genial falhou');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-letra-l';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Letra L — o éle, a haste, o alongamento',
    titleEn: 'Letter L — éle, the stem, the stretch',
    titleEs: 'Letra L — el éle, el palo, el alargue',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: letra L / éle; genialllll = genial esticado; ≠ Lula ≠ loss; Valeu !!!',
    whyEn: 'Words: letter L; genialllll = stretched genial; ≠ Lula ≠ loss; Valeu !!!',
    whyEs: 'Palabras: letra L; genialllll = genial estirado; ≠ Lula ≠ loss; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [post.sourceUrl, GENIAL, '/posts/post-inspecao-palavra-legal.html'],
    notes: 'Cap. ' + post.seriesOrder + ' — glifo; alongamento aponta a genial.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'letra-l',
    word: 'letra L',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      '12.ª letra (éle); genialllll estica genial; ≠ Lula ≠ loss; Valeu !!!',
    simpleEn: '12th letter; genialllll stretches genial; ≠ Lula ≠ loss; Valeu !!!',
    simpleEs: '12.ª letra; genialllll estira genial; ≠ Lula ≠ loss; ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'genial' || x.word === 'genial');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-letra-l-cover.js')], {
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

  const post = stampFiles(buildLetraLPost());
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
    console.log('Glossário actualizado (letra L)');
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
