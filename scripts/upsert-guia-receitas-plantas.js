'use strict';

/**
 * Injeta / actualiza o guia de receitas de plantas (lote 1).
 * Uso: node scripts/upsert-guia-receitas-plantas.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildGuiaReceitasPlantasPost,
  GUIA_RECEITAS_PLANTAS_ITEMS
} = require('../lib/guia-receitas-plantas-inspecao-post.js');
const { buildGuiaPreparoChaPlantasPost } = require('../lib/guia-preparo-cha-plantas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    const after = posts.findIndex((p) => p.slug === 'inspecao-guia-preparo-cha-plantas');
    if (after >= 0) posts.splice(after + 1, 0, post);
    else posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

async function syncSql(postsToSync) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of postsToSync) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const existing = posts.find((p) => p.slug === 'inspecao-guia-receitas-plantas');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildGuiaReceitasPlantasPost(seriesOrder);
  upsertPost(posts, post);

  const chaExisting = posts.find((p) => p.slug === 'inspecao-guia-preparo-cha-plantas');
  const chaOrder = chaExisting ? Number(chaExisting.seriesOrder) || 91 : 91;
  const chaPost = buildGuiaPreparoChaPlantasPost(chaOrder);
  upsertPost(posts, chaPost);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, chaPost);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'guia-receitas-plantas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Guia — receitas de plantas (lote 1)',
      titleEn: 'Guide — plant recipes (batch 1)',
      titleEs: 'Guía — recetas de plantas (lote 1)',
      tipo: 'guia',
      priority: 2,
      status: 'feita',
      why: 'Oito tisanas de ofício com elos Plantas + manual de chá; Valeu !!!',
      whyEn: 'Eight craft herbal teas linked to Plants + tea manual; Valeu !!!',
      whyEs: 'Ocho tisanas de oficio con vínculos Plantas + manual de té; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [href, '/posts/post-inspecao-guia-preparo-cha-plantas.html', '/plantas/'],
      notes: 'Cap. ' + post.seriesOrder + ' — não é bula; cannabis fora.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (guia-receitas-plantas)');
  }

  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  if (!Array.isArray(guia.items)) guia.items = [];
  let added = 0;
  let updated = 0;
  for (const item of GUIA_RECEITAS_PLANTAS_ITEMS) {
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
  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  console.log('Guia de palavras actualizado (+' + added + ' ~' + updated + ')');

  await syncSql([post, chaPost]);
  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
