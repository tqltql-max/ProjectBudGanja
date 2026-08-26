'use strict';

/**
 * Injeta inspeções dos canais Tamara + Amyr Klink e liga as fichas de pessoa.
 * Uso: node scripts/upsert-canal-klink-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildTamaraCanalPost } = require('../lib/tamara-canal-inspecao-post.js');
const { buildAmyrCanalPost } = require('../lib/amyr-klink-canal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  const tamara = buildTamaraCanalPost();
  const amyr = buildAmyrCanalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, tamara);
  upsertPost(posts, amyr);

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, tamara);
  writeI18n(i18n, amyr);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'canal-tamaraklink',
      title: 'Tamara Klink — canal, Sardinha e família',
      titleEn: 'Tamara Klink — channel, Sardinha and family',
      titleEs: 'Tamara Klink — canal, Sardinha y familia',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why: 'Canais: @TamaraKlink — catálogo; avó Ana Francesca nomeou o Sardinha; pai Amyr junto.',
      suggestedSlug: tamara.slug,
      doneHref: '/posts/post-' + tamara.slug + '.html',
      seriesHint: 'canal-tamaraklink',
      sources: [
        'https://www.youtube.com/@TamaraKlink',
        '/videos/?channel=tamara',
        '/posts/post-inspecao-tamara-klink.html'
      ]
    });
    upsertSug(items, {
      id: 'canal-amyrklink',
      title: 'Amyr Klink — canal do pai, junto da Tamara',
      titleEn: 'Amyr Klink — father’s channel, next to Tamara',
      titleEs: 'Amyr Klink — canal del padre, junto a Tamara',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why: 'Canais: @amyrklinkoficial — catálogo do pai; no hub junto da Tamara.',
      suggestedSlug: amyr.slug,
      doneHref: '/posts/post-' + amyr.slug + '.html',
      seriesHint: 'canal-amyrklink',
      sources: [
        'https://www.youtube.com/@amyrklinkoficial',
        '/videos/?channel=amyr',
        '/posts/post-inspecao-amyr-klink.html'
      ]
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (canais Klink)');
  }

  try {
    await syncSql(tamara);
    await syncSql(amyr);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', tamara.title);
  console.log('OK:', amyr.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
