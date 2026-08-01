'use strict';

/**
 * Injeta / actualiza a inspeção de derivados do coco + actualiza planta coco.
 * Uso: node scripts/upsert-derivado-coco-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCocoDerivadoPost } = require('../lib/derivados-inspecoes-posts.js');
const {
  buildPlantaInspecaoPost,
  loadPlantasCatalog
} = require('../lib/plantas-inspecoes-posts.js');

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

async function main() {
  const derivado = buildCocoDerivadoPost();
  const plants = loadPlantasCatalog();
  const cocoPlant = plants.find((p) => p && p.slug === 'coco');
  const plantaPost = cocoPlant
    ? buildPlantaInspecaoPost(
        cocoPlant,
        plants.findIndex((p) => p.slug === 'coco') + 1
      )
    : null;

  const built = [derivado];
  if (plantaPost) built.push(plantaPost);

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'derivado-coco';
    const href = '/posts/post-' + derivado.slug + '.html';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Derivados do coco — açúcar, óleo e química industrial',
      titleEn: 'Coconut derivatives — sugar, oil and industrial chemistry',
      titleEs: 'Derivados del coco — azúcar, aceite y química industrial',
      tipo: 'derivado',
      priority: 2,
      status: 'feita',
      why: 'Derivados de risco: coco inteiro / água fresca vs ultraprocessado adoçado e óleo refinado; mapa químico + elo planta.',
      whyEn: 'Risk derivatives: whole coconut / fresh water vs sweetened ultra-processed and refined oil; chemical map + plant link.',
      whyEs: 'Derivados de riesgo: coco entero / agua fresca vs ultraprocesado endulzado y aceite refinado; mapa químico + vínculo planta.',
      suggestedSlug: derivado.slug,
      doneHref: href,
      seriesHint: 'plantas-derivados-risco',
      sources: [
        derivado.sourceUrl,
        '/posts/post-inspecao-planta-coco.html',
        '/posts/post-inspecao-derivado-cana-de-acucar.html',
        '/posts/post-inspecao-derivado-abacate.html'
      ],
      notes: 'Palmeira ≠ vilã; foco em açúcar × óleo × aditivos × dose.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (derivado-coco)');
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
