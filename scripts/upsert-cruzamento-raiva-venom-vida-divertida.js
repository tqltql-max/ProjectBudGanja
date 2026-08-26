'use strict';

/**
 * Injeta inspeção-cruzamento Raiva × Emoção × Venom × Vida × Divertida Mente.
 * Uso: node scripts/upsert-cruzamento-raiva-venom-vida-divertida.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildCruzamentoRaivaVenomVidaDivertidaPost
} = require('../lib/cruzamento-raiva-venom-vida-divertida-inspecao-post.js');

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

async function main() {
  const post = buildCruzamentoRaivaVenomVidaDivertidaPost();
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
    const sugId = 'cruzamento-raiva-venom-vida-divertida';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cruzamento — Raiva, Emoção, Venom e Vida no mapa de Divertida Mente',
      titleEn: 'Cross-map — Anger, Emotion, Venom and Vida through Inside Out',
      titleEs: 'Cruce — Rabia, Emoción, Venom y Vida en el mapa de Divertida Mente',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · cruzamento: Raiva × Emoção × Venom × Vida com os cinco sentimentos de Divertida Mente.',
      whyEn: 'Arts · cross-map: Anger × Emotion × Venom × Vida with Inside Out’s five feelings.',
      whyEs: 'Artes · cruce: Rabia × Emoción × Venom × Vida con los cinco sentimientos de Divertida Mente.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        '/posts/post-inspecao-filme-divertida-mente.html',
        '/posts/post-inspecao-palavra-raiva.html',
        '/posts/post-inspecao-palavra-emocao.html',
        '/posts/post-inspecao-filme-venom.html',
        '/vida/',
        '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
      ],
      notes: 'Mapa emocional: ofício vs veneno; rede Divertida Mente + Vida.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (cruzamento-raiva-venom-vida-divertida)');
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
