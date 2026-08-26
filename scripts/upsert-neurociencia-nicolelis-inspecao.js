'use strict';

/**
 * Injeta Cap. 2 Neurociências — Homenagem Miguel Nicolelis.
 * Uso: node scripts/upsert-neurociencia-nicolelis-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMiguelNicolelisNeurocienciaPost } = require('../lib/miguel-nicolelis-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function nextNeuroOrder(posts, excludeSlug) {
  const orders = posts
    .filter((p) => p.series === 'neurociencias' && p.slug !== excludeSlug)
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
  const slug = 'inspecao-neurociencia-miguel-nicolelis';
  const existing = posts.find((p) => p.slug === slug);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextNeuroOrder(posts, slug)
    : nextNeuroOrder(posts, slug);
  const post = buildMiguelNicolelisNeurocienciaPost(seriesOrder);

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
    const sugId = 'neurociencia-miguel-nicolelis';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Homenagem: Miguel Nicolelis — interfaces cérebro-máquina',
      titleEn: 'Homage: Miguel Nicolelis — brain-machine interfaces',
      titleEs: 'Homenaje: Miguel Nicolelis — interfaces cerebro-máquina',
      tipo: 'neurociencia',
      priority: 1,
      status: 'feita',
      why: 'Neurociências Cap. 2: homenagem a Nicolelis — ICM, Andar de Novo, pontapé da Copa 2014; elos com endocanabinoidoma e Sidarta.',
      whyEn: 'Neuroscience Cap. 2: homage to Nicolelis — BMI, Walk Again Project, 2014 World Cup kickoff; links to endocannabinoidome and Sidarta.',
      whyEs: 'Neurociencias Cap. 2: homenaje a Nicolelis — ICM, Andar de Novo, saque inicial del Mundial 2014; vínculos con endocannabinoidoma y Sidarta.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'neurociencias',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-neurociencia-endocanabinoidoma.html',
        '/posts/post-inspecao-sidarta-ribeiro.html'
      ],
      notes: 'Cap. 2 da série Neurociências — homenagem documental, não hagiografia.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (neurociencia-miguel-nicolelis)');
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
