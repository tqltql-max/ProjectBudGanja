'use strict';

/**
 * Injeta inspeção + i18n do canal Tamara Klink.
 * Uso: node scripts/upsert-canal-tamaraklink-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { stampCatalog } = require('../lib/tamara-categories.js');
const { saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { buildTamaraCanalPost } = require('../lib/tamara-canal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'tamaraklink.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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

function stampExistingCatalog() {
  if (!fs.existsSync(CATALOG_FILE)) return;
  const raw = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  const stamped = stampCatalog(raw);
  saveCatalog('tamaraklink', stamped);
  console.log('Catálogo carimbado:', stamped.videoCount, 'vídeos');
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
  stampExistingCatalog();

  const post = buildTamaraCanalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'canal-tamaraklink';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Tamara Klink — arquivo YouTube de travessias e léxico',
      titleEn: 'Tamara Klink — YouTube archive of crossings and lexicon',
      titleEs: 'Tamara Klink — archivo YouTube de travesías y léxico',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why: 'Canais: @TamaraKlink — 140 vídeos; distinto da ficha de legado; hub /videos/?channel=tamara.',
      whyEn: 'Channels: @TamaraKlink — 140 videos; distinct from the legacy sheet; hub /videos/?channel=tamara.',
      whyEs: 'Canales: @TamaraKlink — 140 vídeos; distinta de la ficha de legado; hub /videos/?channel=tamara.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'canal-tamaraklink',
      sources: [
        'https://www.youtube.com/@TamaraKlink',
        'https://www.youtube.com/watch?v=V3GSlr5sp7c',
        '/posts/post-inspecao-tamara-klink.html',
        '/videos/?channel=tamara'
      ],
      notes: 'Pessoa ≠ canal. Indexar ≠ endosso. Lista integral na ficha do canal.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (canal-tamaraklink)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
