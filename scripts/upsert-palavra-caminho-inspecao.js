'use strict';

/**
 * Injeta palavra «caminho» + actualiza passar e Send Me On My Way (elos).
 * Uso: node scripts/upsert-palavra-caminho-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildCaminhoPost,
  buildPassarPost
} = require('../lib/palavras-inspecoes-posts.js');
const { buildSendMeOnMyWayPost } = require('../lib/artes-inspecoes-posts.js');

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

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  const caminho = buildCaminhoPost();
  const passar = buildPassarPost();
  const sendMe = buildSendMeOnMyWayPost();
  const built = [caminho, passar, sendMe];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'palavra-caminho',
      title: 'Caminho — a palavra que liga o laboratório BudGanja',
      titleEn: 'Caminho — the word that links the BudGanja lab',
      titleEs: 'Caminho — la palabra que une el laboratorio BudGanja',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: hub lexical «caminho» — relaciona passar, Send Me, Heródoto, Artes, cultivo e inspeções.',
      whyEn: 'Words: lexical hub “caminho” — links passar, Send Me, Herodotus, Arts, cultivation and inspections.',
      whyEs: 'Palabras: hub léxico «caminho» — relaciona passar, Send Me, Heródoto, Artes, cultivo e inspecciones.',
      suggestedSlug: caminho.slug,
      doneHref: '/posts/post-' + caminho.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [
        '/posts/post-inspecao-palavra-passar.html',
        '/posts/post-inspecao-arte-send-me-on-my-way.html',
        '/posts/post-inspecao-figura-herodoto.html'
      ],
      notes: 'Hub do projecto; não confundir com guia de cultivo.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-caminho)');
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  built.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
