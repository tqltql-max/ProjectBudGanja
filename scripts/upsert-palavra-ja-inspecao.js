'use strict';

/**
 * Injeta palavra «já» na série Palavras (par com aff).
 * Uso: node scripts/upsert-palavra-ja-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildJaPost, buildAffPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  const ja = buildJaPost();
  const aff = buildAffPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, ja);
  upsertPost(posts, aff);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, ja);
  writeI18n(i18n, aff);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + ja.slug + '.html';
  const affHref = '/posts/post-' + aff.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-ja';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Já — o relógio da frase e o par com aff',
      titleEn: 'Já — the sentence’s clock and the pair with aff',
      titleEs: 'Já — el reloj de la frase y el par con aff',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «já» × «aff» — tempo/urgência e enfado; fecho vazio = ressalva; Faça o melhor.',
      whyEn: 'Words: “já” × “aff” — time/urgency and exasperation; empty close = caveat; Do your best.',
      whyEs: 'Palabras: «já» × «aff» — tiempo/urgencia y hastío; cierre vacío = salvedad; Haz lo mejor.',
      suggestedSlug: ja.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wiktionary.org/wiki/j%C3%A1',
        affHref,
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 29 — par oral aff×já; não confundir com código ja (japonês).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-ja)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'ja',
      word: 'já',
      simple:
        'Latim *iam* — advérbio de tempo/urgência; no BudGanja, par oral com «aff»; fecho vazio («já deu») = ressalva.',
      simpleEn:
        'Latin *iam* — adverb of time/urgency; in BudGanja, oral pair with “aff”; empty close = caveat.',
      simpleEs:
        'Latín *iam* — adverbio de tiempo/urgencia; en BudGanja, par oral con «aff»; cierre vacío = salvedad.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'aff');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (já)');
  }

  try {
    await syncSql([ja, aff]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', ja.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
