'use strict';

/**
 * Injeta Amyr Klink (Cap. 7) + Tamara Klink (Cap. 8) em legado-pessoas.
 * Uso: node scripts/upsert-klink-legado-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAmyrKlinkInspecaoPost,
  buildTamaraKlinkInspecaoPost
} = require('../lib/klink-legado-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post, afterSlug) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const after = afterSlug ? posts.findIndex((p) => p.slug === afterSlug) : -1;
  if (after >= 0) {
    posts.splice(after + 1, 0, post);
    console.log('Inserido', post.slug, 'após', afterSlug);
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, built[0], 'inspecao-gabrielle-dainezi');
  upsertPost(posts, built[1], 'inspecao-amyr-klink');
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

async function main() {
  const amyr = buildAmyrKlinkInspecaoPost();
  const tamara = buildTamaraKlinkInspecaoPost();
  const built = [amyr, tamara];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, amyr, 'inspecao-gabrielle-dainezi');
  upsertPost(posts, tamara, 'inspecao-amyr-klink');
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'pessoa-amyr-klink',
      title: 'Amyr Klink — navegador e legado de caminho',
      tipo: 'pessoa',
      priority: 2,
      status: 'feita',
      why: 'Legado Cap. 7 — pai de Tamara; planeamento, risco e ofício náutico brasileiro.',
      suggestedSlug: amyr.slug,
      doneHref: '/posts/post-' + amyr.slug + '.html',
      seriesHint: 'legado-pessoas',
      sources: ['https://pt.wikipedia.org/wiki/Amyr_Klink']
    });
    upsertSug(items, {
      id: 'pessoa-tamara-klink',
      title: 'Tamara Klink — legado vivo no Ártico',
      tipo: 'pessoa',
      priority: 1,
      status: 'feita',
      why: 'Legado Cap. 8 — junto do pai Amyr; Atlântico, Ártico e Passagem Noroeste.',
      suggestedSlug: tamara.slug,
      doneHref: '/posts/post-' + tamara.slug + '.html',
      seriesHint: 'legado-pessoas',
      sources: [
        'https://pt.wikipedia.org/wiki/Tamara_Klink',
        '/posts/post-inspecao-amyr-klink.html'
      ]
    });
    sug.items = items;
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  await syncSql(built);
  console.log('OK — Amyr Cap.7 + Tamara Cap.8');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
