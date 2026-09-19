'use strict';

/**
 * Despublica todas as inspeções da série Expressões (expressoes-ditados /
 * inspecao-expressao-*). Mantém os HTML no disco.
 * Uso: node scripts/unpublish-expressoes-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const { isExpressaoInspecaoPost } = require('../lib/posts-service.js');
const { publishStaticAssets } = require('../lib/publish-static.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function unpublishList(posts) {
  let n = 0;
  posts.forEach((p) => {
    if (!isExpressaoInspecaoPost(p)) return;
    if (p.published !== false) n += 1;
    p.published = false;
  });
  return n;
}

async function syncSql(postsFromFile) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;

  const { createSqlStore } = require('../lib/store-sql.js');
  let last;
  for (let i = 0; i < 6; i += 1) {
    try {
      const store = await createSqlStore(ROOT);
      const posts = await store.getPosts();
      const n = unpublishList(posts);
      await store.setPosts(posts);
      console.log('SQL: despublicadas', n, 'expressões (de', posts.length, 'posts)');
      return;
    } catch (e) {
      last = e;
      console.warn('SQL retry', i + 1, e && e.message);
      await sleep(400 * (i + 1));
    }
  }
  if (last) throw last;
  void postsFromFile;
}

function run(script) {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', script)], {
    cwd: ROOT,
    stdio: 'inherit'
  });
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8') || '[]');
  const total = posts.filter(isExpressaoInspecaoPost).length;
  const n = unpublishList(posts);
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  console.log('posts.json: despublicadas', n, 'de', total, 'expressões');

  await syncSql(posts);
  publishStaticAssets(ROOT);
  console.log('posts-public.json actualizado');
  run('sync-ferramentas-nav.js');
  run('build-search-index.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
