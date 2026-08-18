'use strict';

/**
 * Injeta / actualiza a inspeção Aleff (série Pessoas — pessoa, não canal).
 * Uso: node scripts/upsert-figura-aleff-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildAliffePost } = require('../lib/aliffe-figura-inspecao-post.js');

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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-aleff-figura-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildAliffePost();
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
    const sugId = 'figura-aleff';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Aleff — Aliffe de Machado, pessoa antes do ecrã',
      titleEn: 'Aleff — Aliffe from Machado, the person before the screen',
      titleEs: 'Aleff — Aliffe de Machado, la persona antes de la pantalla',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas: Aliffe / Aleff — mineiro de Machado; pessoa especial, não persona de ecrã.',
      whyEn: 'People: Aliffe / Aleff — from Machado; a special person, not an on-screen persona.',
      whyEs: 'Personas: Aliffe / Aleff — de Machado; persona especial, no persona de pantalla.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-respeito.html',
        '/posts/post-inspecao-palavra-idolo.html',
        '/jogos/aleff/'
      ],
      notes: 'Pessoa especial. Não reduzir a streamer. Catálogo de jogos é satélite.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-aleff)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'aleff',
      word: 'Aleff',
      simple:
        'Aliffe Henrique de Carvalho (Aleff), de Machado (MG); no site, ficha em Pessoas — a pessoa, não a persona de ecrã.',
      simpleEn:
        'Aliffe Henrique de Carvalho (Aleff), from Machado (MG); on the site, a People sheet — the person, not the on-screen persona.',
      simpleEs:
        'Aliffe Henrique de Carvalho (Aleff), de Machado (MG); en el sitio, ficha en Personas — la persona, no la persona de pantalla.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.id === 'aliffe');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else items.push(entry);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (aleff)');
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
