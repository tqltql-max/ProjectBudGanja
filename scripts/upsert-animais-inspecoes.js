'use strict';

/**
 * Injeta / actualiza inspeções de animais + derivados animais em posts.json (+ i18n + SQL).
 * Uso: node scripts/upsert-animais-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { buildAllAnimaisInspecoesPosts } = require('../lib/animais-inspecoes-posts.js');
const { buildAllAnimaisDerivadosPosts } = require('../lib/animais-derivados-inspecoes-posts.js');

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
  builtPosts.forEach((post) => mergePost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', builtPosts.length, 'inspeções de animais/derivados');
}

async function main() {
  const built = buildAllAnimaisInspecoesPosts().concat(buildAllAnimaisDerivadosPosts());
  if (!built.length) throw new Error('Nenhum animal/derivado gerado');

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
    console.warn('SQL sync avisou:', e && e.message ? e.message : e);
  }

  console.log('Animais/derivados upsert:', inserted, 'inseridos,', updated, 'actualizados (total', built.length + ')');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
