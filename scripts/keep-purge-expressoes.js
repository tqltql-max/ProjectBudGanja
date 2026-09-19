'use strict';

/**
 * Mantém só expressões de valor (carne de vaca, vingança, mantra, veneno/açúcar)
 * e apaga as restantes de posts.json, SQL, HTML e i18n.
 * Uso: node scripts/keep-purge-expressoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const { isExpressaoInspecaoPost } = require('../lib/posts-service.js');
const { publishStaticAssets } = require('../lib/publish-static.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const POEMAS_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

const KEEP = new Set([
  'inspecao-expressao-virou-carne-de-vaca',
  'inspecao-expressao-vinganca-mata-alma-envenena',
  'inspecao-expressao-faca-o-melhor',
  'inspecao-expressao-veneno-forma-de-acucar'
]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function unlinkRetry(file) {
  for (let i = 0; i < 6; i += 1) {
    try {
      if (fs.existsSync(file)) fs.unlinkSync(file);
      return;
    } catch (e) {
      if (i === 5) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80 * (i + 1));
    }
  }
}

function isKeptExpressao(p) {
  return KEEP.has(String(p && p.slug));
}

function run(script) {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts', script)], {
    cwd: ROOT,
    stdio: 'inherit'
  });
}

async function syncSql(nextPosts) {
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
      await store.setPosts(nextPosts);
      console.log('SQL: posts actualizados', nextPosts.length);
      return;
    } catch (e) {
      last = e;
      console.warn('SQL retry', i + 1, e && e.message);
      await sleep(400 * (i + 1));
    }
  }
  if (last) throw last;
}

function pruneSugestoes(sug) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const next = items.filter((it) => {
    if (!it || it.tipo !== 'expressao') return true;
    const href = String(it.href || it.url || it.postUrl || '');
    const slug = String(it.slug || it.postSlug || it.id || '');
    return [...KEEP].some(
      (k) => href.indexOf(k) !== -1 || slug.indexOf(k) !== -1 || slug === k.replace(/^inspecao-/, '')
    );
  });
  sug.items = next;
  return items.length - next.length;
}

function prunePoemas(poemas) {
  const poems = Array.isArray(poemas.poems) ? poemas.poems : [];
  let n = 0;
  poems.forEach((p) => {
    const href = String(p.inspectionHref || '');
    if (!/inspecao-expressao-/.test(href)) return;
    const keep = [...KEEP].some((k) => href.indexOf(k) !== -1);
    if (!keep) {
      delete p.inspectionHref;
      n += 1;
    }
  });
  return n;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8') || '[]');
  const drop = posts.filter((p) => isExpressaoInspecaoPost(p) && !isKeptExpressao(p));
  const keepList = posts.filter((p) => !isExpressaoInspecaoPost(p) || isKeptExpressao(p));
  keepList.forEach((p) => {
    if (isKeptExpressao(p)) p.published = true;
  });

  drop.forEach((p) => {
    const file = path.join(ROOT, String(p.filename || 'posts/post-' + p.slug + '.html').replace(/^\//, ''));
    unlinkRetry(file);
  });
  console.log('HTML apagados', drop.length);

  writeFileRetrySync(POSTS_FILE, JSON.stringify(keepList, null, 2) + '\n', 'utf8');
  console.log('posts.json:', keepList.length, 'mantidas', [...KEEP].join(', '));

  if (fs.existsSync(I18N_FILE)) {
    const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8') || '{}');
    let n = 0;
    drop.forEach((p) => {
      if (i18n[p.slug]) {
        delete i18n[p.slug];
        n += 1;
      }
    });
    writeFileRetrySync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
    console.log('post-i18n removidos', n);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8') || '{}');
    const n = pruneSugestoes(sug);
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('sugestões expressao removidas', n);
  }

  if (fs.existsSync(POEMAS_FILE)) {
    const poemas = JSON.parse(fs.readFileSync(POEMAS_FILE, 'utf8') || '{}');
    const n = prunePoemas(poemas);
    writeFileRetrySync(POEMAS_FILE, JSON.stringify(poemas, null, 2) + '\n', 'utf8');
    console.log('poemas Vida sem ficha apagada', n);
  }

  await syncSql(keepList);
  publishStaticAssets(ROOT);
  run('sync-ferramentas-nav.js');
  run('build-search-index.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
