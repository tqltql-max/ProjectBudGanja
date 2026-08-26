'use strict';

/**
 * Injeta inspeção + i18n do canal Todo Poderoso Bagual.
 * Uso: node scripts/upsert-canal-bagual-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildBagualCanalPost } = require('../lib/bagual-canal-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterPaulinho = posts.findIndex((p) => p.slug === 'inspecao-canal-paulinho');
  if (afterPaulinho >= 0) {
    posts.splice(afterPaulinho + 1, 0, post);
    console.log('Inserido', post.slug, 'após canal Paulinho');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-bagual-canal-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildBagualCanalPost();
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
    const sugId = 'canal-bagual';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Todo Poderoso Bagual — BOPE, Capital City e arquivo GTA RP',
      titleEn: 'Todo Poderoso Bagual — BOPE, Capital City and GTA RP archive',
      titleEs: 'Todo Poderoso Bagual — BOPE, Capital City y archivo GTA RP',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why: 'Canais: live no Kick (poderosobagual) + arquivo YouTube (@poderosobagual) — personagem BOPE no GTA RP; página GTA RP.',
      whyEn: 'Channels: live on Kick (poderosobagual) + YouTube archive (@poderosobagual) — BOPE character in GTA RP; GTA RP page.',
      whyEs: 'Canales: live en Kick (poderosobagual) + archivo YouTube (@poderosobagual) — personaje BOPE en GTA RP; página GTA RP.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'canal-bagual',
      sources: [
        'https://kick.com/poderosobagual',
        'https://www.youtube.com/@poderosobagual',
        'https://www.youtube.com/watch?v=XBJ7zLpZ61k',
        '/jogos/bagual/',
        '/jogos/gtarp/',
        '/jogos/hopejoy/',
        '/posts/post-inspecao-canal-paulinho.html'
      ],
      notes: 'Hub /jogos/bagual/ · live no Kick (poderosobagual) · temas de mérito no catálogo. Personagem ≠ pessoa. Live ≠ arquivo. Ficção de jogo ≠ manual de crime.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (canal-bagual)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '|', href);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
