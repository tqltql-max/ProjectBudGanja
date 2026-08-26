'use strict';

/**
 * Injeta Cap. 1 Neurociências — Endocanabinoidoma.
 * Uso: node scripts/upsert-neurociencia-endocanabinoidoma-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEndocanabinoidomaNeurocienciaPost } = require('../lib/endocanabinoidoma-neurociencia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function nextNeuroOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'neurociencias')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
  }
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-neurociencia-endocanabinoidoma');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextNeuroOrder(posts)
    : nextNeuroOrder(posts);
  const post = buildEndocanabinoidomaNeurocienciaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'neurociencia-endocanabinoidoma';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Endocanabinoidoma — mapa neurocientífico do ofício',
      titleEn: 'Endocannabinoidome — neuroscience craft map',
      titleEs: 'Endocannabinoidoma — mapa neurocientífico del oficio',
      tipo: 'neurociencia',
      priority: 1,
      status: 'feita',
      why: 'Neurociências Cap. 1: ECS / endocanabinoidoma — mapa de ofício; elos Sidarta/Carlini/Albaugh.',
      whyEn: 'Neuroscience Cap. 1: ECS / endocannabinoidome — craft map; links Sidarta/Carlini/Albaugh.',
      whyEs: 'Neurociencias Cap. 1: ECS / endocannabinoidoma — mapa de oficio; vínculos Sidarta/Carlini/Albaugh.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'neurociencias',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-sidarta-ribeiro.html',
        '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html',
        '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html'
      ],
      notes: 'Abre chip Neurociências no hub.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (neurociencia-endocanabinoidoma)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder, '| série', post.series);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
