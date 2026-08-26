'use strict';

/**
 * Injeta / actualiza a inspeção do Prof. Elisaldo Carlini em posts.json (+ overlay i18n + SQL).
 * Uso: node scripts/upsert-elisaldo-carlini-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildElisaldoCarliniInspecaoPost } = require('../lib/pessoas-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');

function mergePost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
    return;
  }
  const afterTicao = posts.findIndex((p) => p.slug === 'inspecao-padre-ticao');
  if (afterTicao >= 0) {
    posts.splice(afterTicao + 1, 0, post);
    console.log('Inserido', post.slug, 'após Padre Ticão');
    return;
  }
  const afterCurso = posts.findIndex((p) => p.slug === 'inspecao-curso-unifesp-cannabis-medicinal');
  if (afterCurso >= 0) {
    posts.splice(afterCurso + 1, 0, post);
    console.log('Inserido', post.slug, 'após curso UNIFESP');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
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
  mergePost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const post = buildElisaldoCarliniInspecaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  mergePost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(
    'OK:',
    post.title,
    '| cover',
    post.coverImage,
    '| content_raw',
    (post.content_raw || '').length,
    '| contentEn',
    (post.contentEn || '').length,
    '| contentEs',
    (post.contentEs || '').length
  );
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
