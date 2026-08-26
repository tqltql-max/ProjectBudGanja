'use strict';

/**
 * Injeta palavra «simbiose» na série Palavras.
 * Uso: node scripts/upsert-palavra-simbiose-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSimbiosePost } = require('../lib/palavras-inspecoes-posts.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(guia, entry) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'sintetico');
    if (after >= 0) items.splice(after, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
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

async function main() {
  const simbiose = buildSimbiosePost();
  const built = [simbiose];

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
      id: 'palavra-simbiose',
      title: 'Simbiose — a palavra do viver juntos',
      titleEn: 'Simbiose — the word for living together',
      titleEs: 'Simbiose — la palabra del vivir juntos',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «simbiose» (*syn* + *bíōsis*) — biologia, solo vivo e metáfora (Venom / «nós»).',
      whyEn: 'Words: “simbiose” (*syn* + *bíōsis*) — biology, living soil, and metaphor (Venom / “we”).',
      whyEs: 'Palabras: «simbiose» (*syn* + *bíōsis*) — biología, suelo vivo y metáfora (Venom / «nosotros»).',
      suggestedSlug: simbiose.slug,
      doneHref: '/posts/post-' + simbiose.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [
        '/plantas/',
        '/guia/cultivo-basico.html',
        '/posts/post-inspecao-filme-venom.html',
        '/posts/post-inspecao-palavra-animal.html'
      ],
      notes: 'Palavra ≠ tratado de ecologia; metáfora cultural é camada, não definição.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-simbiose)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(guia, {
      id: 'simbiose',
      word: 'Simbiose',
      simple:
        'Viver juntos (*syn* + *bíos*) — relação entre organismos; no senso comum vira «os dois ganham»; no site, elo de solo vivo, plantas e metáfora cultural (Venom).',
      simpleEn:
        'Living together (*syn* + *bíos*) — relation between organisms; in common speech often “both win”; on the site, living soil, plants and cultural metaphor (Venom).',
      simpleEs:
        'Vivir juntos (*syn* + *bíos*) — relación entre organismos; en el habla común suele ser «los dos ganan»; en el sitio, suelo vivo, plantas y metáfora cultural (Venom).',
      group: 'lexico',
      fromTitle: false,
      href: '/posts/post-inspecao-palavra-simbiose.html'
    });
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (simbiose)');
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
