'use strict';

/**
 * Injeta palavra «coelho» + actualiza caminho e Alice (elos cruzados).
 * Uso: node scripts/upsert-palavra-coelho-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildCoelhoPost,
  buildCaminhoPost
} = require('../lib/palavras-inspecoes-posts.js');
const {
  buildAliceNoPaisDasMaravilhasPost
} = require('../lib/artes-inspecoes-posts.js');

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
  const coelho = buildCoelhoPost();
  const caminho = buildCaminhoPost();
  const alice = buildAliceNoPaisDasMaravilhasPost();
  const built = [coelho, caminho, alice];

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
      id: 'palavra-coelho',
      title: 'Coelho — a palavra da toca e da entrada na investigação',
      titleEn: 'Coelho — the word of the burrow and entry into inquiry',
      titleEs: 'Coelho — la palabra de la madriguera y la entrada a la investigación',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «coelho» — Coelho Branco, buraco do coelho; elos Alice, caminho, passar e Matrix.',
      whyEn: 'Words: “coelho” — White Rabbit, rabbit hole; links Alice, caminho, passar and Matrix.',
      whyEs: 'Palabras: «coelho» — Conejo Blanco, agujero; vínculos Alice, caminho, passar y Matrix.',
      suggestedSlug: coelho.slug,
      doneHref: '/posts/post-' + coelho.slug + '.html',
      seriesHint: 'palavras-origem',
      sources: [
        '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-palavra-passar.html'
      ],
      notes: 'Metáfora literária ≠ protocolo; não entra no mapa duplo sentido.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-coelho)');
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
