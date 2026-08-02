'use strict';

/**
 * Upsert da pesquisa-laboratório «Ofício sob roubo e proibição» + léxico no Guia.
 * Uso: node scripts/upsert-pesquisa-oficio-roubo-proibicao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildPesquisaOficioRouboProibicaoPost,
  GUIA_OFICIO_ROUBO_PROIBICAO_ITEMS
} = require('../lib/pesquisa-oficio-roubo-proibicao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = Object.assign({}, posts[idx], post);
  else posts.unshift(post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const post = buildPesquisaOficioRouboProibicaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  if (!Array.isArray(guia.items)) guia.items = [];

  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    const after = posts.findIndex((p) => p.slug === 'pesquisa-molecula-ao-lixo');
    if (after >= 0) posts.splice(after + 1, 0, post);
    else posts.unshift(post);
    console.log('Inserido', post.slug);
  }

  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };

  let added = 0;
  let updated = 0;
  for (const item of GUIA_OFICIO_ROUBO_PROIBICAO_ITEMS) {
    const gi = guia.items.findIndex((x) => x.id === item.id);
    if (gi >= 0) {
      guia.items[gi] = Object.assign({}, guia.items[gi], item);
      updated += 1;
    } else {
      guia.items.push(item);
      added += 1;
    }
  }

  guia.items.sort((a, b) =>
    String(a.word || '').localeCompare(String(b.word || ''), 'pt', { sensitivity: 'base' })
  );
  guia.updatedAt = new Date().toISOString();

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(
    'OK: pesquisa',
    post.slug,
    '| guia +' + added + ' ~' + updated + ' | total',
    guia.items.length
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
