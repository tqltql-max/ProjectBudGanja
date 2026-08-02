'use strict';

/**
 * Injeta / actualiza artigos científicos da rede Produtos nocivos.
 * Uso: node scripts/upsert-artigos-produtos-nocivos.js
 */

const fs = require('fs');
const path = require('path');
const {
  ARTIGOS_PRODUTOS_NOCIVOS_POSTS
} = require('../lib/artigos-produtos-nocivos-inspecoes-posts.js');
const { buildChocolatePost } = require('../lib/produtos-nocivos-inspecoes-posts.js');

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
    const afterAlbaugh = posts.findIndex(
      (p) => p.slug === 'inspecao-artigo-albaugh-cannabis-neurodesenvolvimento'
    );
    if (afterAlbaugh >= 0) {
      posts.splice(afterAlbaugh + 1, 0, post);
      console.log('Inserido', post.slug, 'após Albaugh');
    } else {
      posts.unshift(post);
      console.log('Inserido', post.slug);
    }
  }
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs
  };
  if (post.contentEn) i18n[post.slug].contentEn = post.contentEn;
  if (post.contentEs) i18n[post.slug].contentEs = post.contentEs;
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
  const chocolate = buildChocolatePost();
  const built = ARTIGOS_PRODUTOS_NOCIVOS_POSTS.concat([chocolate]);

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const entries = [
      {
        id: 'artigo-brouns-trigo-2013',
        title: 'Artigo — O trigo engorda e adoece? (Brouns 2013)',
        tipo: 'artigo',
        priority: 2,
        status: 'feita',
        why: 'Contraponto científico a Barriga de Trigo / Davis.',
        suggestedSlug: 'inspecao-artigo-brouns-trigo-obesidade-2013',
        doneHref: '/posts/post-inspecao-artigo-brouns-trigo-obesidade-2013.html',
        seriesHint: 'artigos-cientificos'
      },
      {
        id: 'artigo-wieser-trigo-2020',
        title: 'Artigo — As duas faces do trigo (Wieser 2020)',
        tipo: 'artigo',
        priority: 2,
        status: 'feita',
        why: 'Revisão Front. Nutr. sobre WRDs vs. marketing anti-trigo.',
        suggestedSlug: 'inspecao-artigo-wieser-duas-faces-trigo-2020',
        doneHref: '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html',
        seriesHint: 'artigos-cientificos'
      },
      {
        id: 'artigo-hall-upf-2019',
        title: 'Artigo — Ultraprocessados e peso (Hall 2019)',
        tipo: 'artigo',
        priority: 1,
        status: 'feita',
        why: 'RCT NIH — eixo causal da matriz chocolate industrial.',
        suggestedSlug: 'inspecao-artigo-hall-ultraprocessados-2019',
        doneHref: '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html',
        seriesHint: 'artigos-cientificos'
      },
      {
        id: 'artigo-brooke-taylor-caseina-2017',
        title: 'Artigo — Caseína A1 vs A2 (Brooke-Taylor 2017)',
        tipo: 'artigo',
        priority: 2,
        status: 'feita',
        why: 'Revisão sistemática GI A1/A2 — elo leite/chocolate.',
        suggestedSlug: 'inspecao-artigo-brooke-taylor-caseina-a1-a2-2017',
        doneHref: '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html',
        seriesHint: 'artigos-cientificos'
      },
      {
        id: 'artigo-oms-acucares-2015',
        title: 'Diretriz OMS — Açúcares livres (2015)',
        tipo: 'artigo',
        priority: 1,
        status: 'feita',
        why: 'Norma global <10% / <5% energia — cana e chocolate.',
        suggestedSlug: 'inspecao-artigo-oms-acucares-livres-2015',
        doneHref: '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html',
        seriesHint: 'artigos-cientificos'
      }
    ];
    for (const entry of entries) {
      const si = items.findIndex((x) => x.id === entry.id);
      if (si >= 0) items[si] = Object.assign({}, items[si], entry);
      else items.push(entry);
    }
    const stub = items.findIndex((x) => x.id === 'artigo-seguinte');
    if (stub >= 0) items[stub].status = 'fila';
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (5 artigos)');
  }

  await syncSql(built);
  console.log('OK: artigos produtos nocivos + chocolate actualizado');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
