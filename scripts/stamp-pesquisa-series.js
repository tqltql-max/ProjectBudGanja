'use strict';

/**
 * Idempotent: marca series conhecidas em posts de pesquisa
 * (guias de ferramenta vs laboratório) em posts.json e na store SQL.
 */
const path = require('path');
const fs = require('fs');
const { ROOT } = require('../lib/paths.js');
const { stampKnownPesquisaSeries } = require('../lib/pesquisa-origin.js');

function stampPostsJson() {
  const file = path.join(ROOT, 'posts.json');
  if (!fs.existsSync(file)) return false;
  const posts = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  const { posts: next, changed } = stampKnownPesquisaSeries(posts);
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(next, null, 2) + '\n', 'utf8');
    console.log('stamp-pesquisa-series: posts.json actualizado');
  } else {
    console.log('stamp-pesquisa-series: posts.json sem alterações');
  }
  return changed;
}

async function stampSqlStore() {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return false;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return false;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  const { posts: next, changed } = stampKnownPesquisaSeries(posts);
  if (changed) {
    await store.setPosts(next);
    console.log('stamp-pesquisa-series: SQL store actualizado');
  } else {
    console.log('stamp-pesquisa-series: SQL store sem alterações');
  }
  return changed;
}

async function main() {
  stampPostsJson();
  try {
    await stampSqlStore();
  } catch (e) {
    console.warn('stamp-pesquisa-series: store:', e.message);
  }
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
