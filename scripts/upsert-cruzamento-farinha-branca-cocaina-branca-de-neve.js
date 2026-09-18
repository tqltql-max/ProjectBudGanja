'use strict';

/**
 * Injeta cruzamento farinha branca × cocaína × Branca de Neve.
 * Uso: node scripts/upsert-cruzamento-farinha-branca-cocaina-branca-de-neve.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildCruzamentoFarinhaBrancaCocainaNevePost
} = require('../lib/cruzamento-farinha-branca-cocaina-branca-de-neve-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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

async function main() {
  const post = buildCruzamentoFarinhaBrancaCocainaNevePost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'cruzamento-farinha-branca-cocaina-branca-de-neve';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cruzamento — farinha branca, cocaína e Branca de Neve',
      titleEn: 'Cross-map — white flour, cocaine and Snow White',
      titleEs: 'Cruce — harina blanca, cocaína y Blancanieves',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why:
        'Artes · cruzamento: farinha branca × cocaína × Branca de Neve — riscos à saúde em colunas; gíria neve vs conto vs refino.',
      whyEn:
        'Arts · cross-map: white flour × cocaine × Snow White — health risks in columns; slang snow vs tale vs refining.',
      whyEs:
        'Artes · cruce: harina blanca × cocaína × Blancanieves — riesgos en columnas; jerga nieve vs cuento vs refinado.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        '/posts/post-inspecao-derivado-gluten.html',
        '/posts/post-inspecao-palavra-craque.html',
        '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html',
        '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html'
      ],
      notes: 'Pedido 17 set 2026; sem protocolo de cocaína.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
  console.log('href:', href);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
