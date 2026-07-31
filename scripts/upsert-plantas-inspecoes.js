'use strict';

/**
 * Injeta / actualiza as inspeções de plantas medicinais em posts.json (+ overlay i18n + SQL).
 * Uso: node scripts/upsert-plantas-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildAllPlantasInspecoesPosts } = require('../lib/plantas-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');

function mergePost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    return 'updated';
  }
  posts.push(post);
  return 'inserted';
}

async function syncSql(builtPosts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  let n = 0;
  builtPosts.forEach((post) => {
    mergePost(posts, post);
    n += 1;
  });
  await store.setPosts(posts);
  console.log('SQL store actualizado:', n, 'inspeções de plantas');
}

async function main() {
  const built = buildAllPlantasInspecoesPosts();
  if (!built.length) {
    throw new Error('Nenhuma planta em content/plantas.json');
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  let inserted = 0;
  let updated = 0;
  built.forEach((post) => {
    const action = mergePost(posts, post);
    if (action === 'inserted') inserted += 1;
    else updated += 1;
  });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  let i18n = {};
  try {
    i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  } catch (e) {
    i18n = {};
  }
  built.forEach((post) => {
    i18n[post.slug] = {
      titleEn: post.titleEn,
      titleEs: post.titleEs,
      excerptEn: post.excerptEn,
      excerptEs: post.excerptEs,
      contentEn: post.contentEn,
      contentEs: post.contentEs
    };
  });
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(
    'OK: plantas-medicinais —',
    built.length,
    'inspeções (',
    inserted,
    'novas,',
    updated,
    'actualizadas)'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
