'use strict';

/**
 * Injeta / actualiza Alice no País das Maravilhas (Artes · cinema).
 * Uso: node scripts/upsert-filme-alice-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAliceNoPaisDasMaravilhasPost
} = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
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
  const alice = buildAliceNoPaisDasMaravilhasPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  upsertPost(posts, alice);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, alice);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-alice-no-pais-das-maravilhas';
    const href = '/posts/post-' + alice.slug + '.html';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Alice no País das Maravilhas — o livro de Carroll e o buraco do coelho',
      titleEn: 'Alice in Wonderland — Carroll’s book and the rabbit hole',
      titleEs: 'Alicia en el país de las maravillas — el libro de Carroll y la madriguera',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Artes: Alice começa no livro de Lewis Carroll (1865); Disney 1951 como adaptação.',
      whyEn: 'Arts: Alice begins with Lewis Carroll’s book (1865); Disney 1951 as adaptation.',
      whyEs: 'Artes: Alicia empieza en el libro de Lewis Carroll (1865); Disney 1951 como adaptación.',
      suggestedSlug: alice.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        alice.sourceUrl,
        'https://pt.wikipedia.org/wiki/Alice_no_Pa%C3%ADs_das_Maravilhas_(filme_de_1951)',
        'https://www.youtube.com/watch?v=PA-h3-0wheo',
        '/posts/post-inspecao-filme-the-matrix.html',
        '/posts/post-inspecao-palavra-passar.html'
      ],
      notes: 'Livro primeiro (1862–1865); filme = eco; metáforas ≠ protocolo de substâncias.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Alice feita)');
  }

  try {
    await syncSql(alice);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', alice.title, '| cover', alice.coverImage);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
