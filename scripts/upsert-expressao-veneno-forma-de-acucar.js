'use strict';

/**
 * Injeta a expressão-poema «O veneno é forma de açúcar».
 * Uso: node scripts/upsert-expressao-veneno-forma-de-acucar.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildVenenoFormaDeAcucarPost
} = require('../lib/veneno-forma-de-acucar-inspecao-post.js');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-veneno-forma-de-acucar.html';
const SLUG = 'inspecao-expressao-veneno-forma-de-acucar';

function nextOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'expressoes-ditados')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max.apply(null, orders) : 0) + 1;
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

function patchGlossary(gloss) {
  const block =
    '    "o veneno é forma de açúcar": { tone: "danger", category: "Expressão", mundane: "O doce da prateleira que já não lembra a planta.", gloss: "Poema-método — o veneno é a forma (refino, açúcar livre), não a cana. Valeu !!!", href: "' +
    HREF +
    '", en: "poison is a form of sugar", es: "el veneno es forma de azúcar" },\n' +
    '    "forma de açúcar": { tone: "caution", category: "Forma", mundane: "O cristal / o pó — não o talo.", gloss: "Núcleo da frase: forma industrial ≠ planta. Ver o veneno é forma de açúcar.", href: "' +
    HREF +
    '", en: "a form of sugar", es: "forma de azúcar" },\n';
  if (/"o veneno é forma de açúcar":\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    "o veneno é forma de açúcar": \{[\s\S]*?\},\r?\n    "forma de açúcar": \{[\s\S]*?\},\r?\n/,
      block
    );
    return gloss;
  }
  if (/    "virou carne de vaca":\s*\{/.test(gloss)) {
    return gloss.replace(/(    "virou carne de vaca":\s*\{)/, block + '$1');
  }
  console.warn('Aviso: glossário — ponto de inserção não encontrado');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-veneno-forma-acucar-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === SLUG);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextOrder(posts)
    : nextOrder(posts);
  const post = stampFiles(buildVenenoFormaDeAcucarPost(seriesOrder));

  upsertPost(posts, post);
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  writeHtml(post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  writeFileRetrySync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('posts-public.json actualizado');
  } catch (e) {
    console.warn('Aviso publishStatic:', e && e.message ? e.message : e);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-veneno-forma-de-acucar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'O veneno é forma de açúcar',
      titleEn: 'Poison is a form of sugar',
      titleEs: 'El veneno es forma de azúcar',
      tipo: 'expressao',
      priority: 1,
      status: 'feita',
      why: 'Poema-método: a cana não é vilã; o veneno é a forma (açúcar livre, prateleira).',
      whyEn: 'Method poem: the cane is not the villain; poison is the form (free sugar, shelf).',
      whyEs: 'Poema-método: la caña no es villana; el veneno es la forma (azúcar libre, estante).',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'expressoes-ditados',
      sources: [
        HREF,
        '/posts/post-inspecao-derivado-cana-de-acucar.html',
        '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — poema Vida veneno-forma-de-acucar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'veneno-forma-de-acucar',
      word: 'o veneno é forma de açúcar',
      simple:
        'Poema-método: a cana não é vilã. O veneno é a forma — pó branco, açúcar livre, prateleira.',
      simpleEn:
        'Method poem: the cane is not the villain. Poison is the form — white powder, free sugar, the shelf.',
      simpleEs:
        'Poema-método: la caña no es villana. El veneno es la forma — polvo blanco, azúcar libre, estante.',
      group: 'lexico',
      href: HREF
    };
    const gi = items.findIndex((x) => x && x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else items.unshift(entry);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    writeFileRetrySync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    const next = patchGlossary(fs.readFileSync(GLOSS_FILE, 'utf8'));
    if (next) {
      writeFileRetrySync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
