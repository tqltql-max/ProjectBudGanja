'use strict';

/**
 * Injeta caseína + glúten na série Produtos nocivos (hub chip derivados).
 * Uso: node scripts/upsert-produtos-nocivos-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildCaseinaPost,
  buildGlutenPost
} = require('../lib/produtos-nocivos-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');

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
  const built = [buildCaseinaPost(), buildGlutenPost()];

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
      id: 'derivado-caseina',
      title: 'Caseína — leite bovino e proteína nociva',
      titleEn: 'Casein — cow’s milk and harmful protein',
      titleEs: 'Caseína — leche bovina y proteína nociva',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Produto nocivo: caseína / leite — A1, BCM-7 e ultraprocessados lácteos.',
      whyEn: 'Harmful product: casein / milk — A1, BCM-7 and ultra-processed dairy.',
      whyEs: 'Producto nocivo: caseína / leche — A1, BCM-7 y lácteos ultraprocesados.',
      suggestedSlug: 'inspecao-derivado-caseina',
      doneHref: '/posts/post-inspecao-derivado-caseina.html',
      seriesHint: 'animais-derivados-risco'
    });
    upsertSug(items, {
      id: 'derivado-gluten',
      title: 'Glúten — trigo e proteína nociva',
      titleEn: 'Gluten — wheat and harmful protein',
      titleEs: 'Gluten — trigo y proteína nociva',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Produto nocivo: glúten — celíaca, sensibilidade e ultraprocessados de farinha.',
      whyEn: 'Harmful product: gluten — celiac, sensitivity and ultra-processed flour.',
      whyEs: 'Producto nocivo: gluten — celiaquía, sensibilidad y ultraprocesados de harina.',
      suggestedSlug: 'inspecao-derivado-gluten',
      doneHref: '/posts/post-inspecao-derivado-gluten.html',
      seriesHint: 'plantas-derivados-risco'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(catalog.animals) ? catalog.animals : [];
    const vaca = animals.find((a) => a && a.slug === 'vaca');
    if (vaca) {
      vaca.relatedInspections = [
        {
          href: '/posts/post-inspecao-derivado-caseina.html',
          label: 'Inspeção: Caseína — leite bovino e proteína nociva ao organismo',
          labelEn: 'Inspection: Casein — cow’s milk and a protein harmful to the body',
          labelEs: 'Inspección: Caseína — leche bovina y proteína nociva para el organismo'
        },
        {
          href: '/posts/post-inspecao-derivado-vaca.html',
          label: 'Inspeção: Derivados da vaca — carnes processadas e laticínios industriais',
          labelEn: 'Inspection: Cattle derivatives — processed meats and industrial dairy',
          labelEs: 'Inspección: Derivados de la vaca — carnes procesadas y lácteos industriales'
        }
      ];
      catalog.updatedAt = new Date().toISOString();
      fs.writeFileSync(ANIMAIS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em animais.json → vaca');
    }
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('SQL sync avisou:', e && e.message ? e.message : e);
  }

  console.log('OK: produtos nocivos —', built.map((p) => p.slug).join(', '));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
