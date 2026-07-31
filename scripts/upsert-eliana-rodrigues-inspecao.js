'use strict';

/**
 * Injeta / actualiza a inspeção da Profa. Dra. Eliana Rodrigues em posts.json (+ i18n + SQL).
 * Uso: node scripts/upsert-eliana-rodrigues-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildElianaRodriguesInspecaoPost } = require('../lib/eliana-rodrigues-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function mergePost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
    return;
  }
  const afterNappo = posts.findIndex((p) => p.slug === 'inspecao-solange-nappo');
  if (afterNappo >= 0) {
    posts.splice(afterNappo + 1, 0, post);
    console.log('Inserido', post.slug, 'após Solange Nappo');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
}

function markSuggestionDone(slug) {
  if (!fs.existsSync(SUG_FILE)) return;
  const data = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = data.items || data.suggestions || [];
  const item = items.find((s) => s.id === 'eliana-rodrigues' || s.suggestedSlug === slug);
  if (!item) {
    console.warn('Sugestão eliana-rodrigues não encontrada');
    return;
  }
  item.status = 'feita';
  item.doneHref = '/posts/post-' + slug + '.html';
  fs.writeFileSync(SUG_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Sugestão marcada como feita:', item.id);
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
  const post = buildElianaRodriguesInspecaoPost();
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

  markSuggestionDone(post.slug);

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| cover', post.coverImage);
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
