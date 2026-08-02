'use strict';

/**
 * Injeta / actualiza a inspeção Celular · riscos à saúde das crianças em posts.json (+ i18n + SQL).
 * Uso: node scripts/upsert-celular-riscos-criancas-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCelularRiscosCriancasInspecaoPost } = require('../lib/celular-riscos-criancas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function mergePost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
    return;
  }
  const afterMars = posts.findIndex((p) => p.slug === 'inspecao-marshydro-brasil');
  if (afterMars >= 0) {
    posts.splice(afterMars + 1, 0, post);
    console.log('Inserido', post.slug, 'após Mars Hydro');
    return;
  }
  const afterVent = posts.findIndex((p) => p.slug === 'inspecao-ventilacao-tenda');
  if (afterVent >= 0) {
    posts.splice(afterVent + 1, 0, post);
    console.log('Inserido', post.slug, 'após ventilação');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug, 'no início');
}

function markSuggestionDone(post) {
  if (!fs.existsSync(SUG_FILE)) return;
  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const id = 'celular-riscos-saude-criancas';
  const item = {
    id,
    title: 'Celular — riscos para a saúde das crianças',
    titleEn: 'Phone — risks to children’s health',
    titleEs: 'Celular — riesgos para la salud de los niños',
    tipo: 'equipamento',
    priority: 2,
    status: 'feita',
    why: 'Smartphone como equipamento social: riscos infantis, SBP, guia federal 2025 e Lei 15.100.',
    whyEn: 'Smartphone as social equipment: child health risks, SBP, 2025 federal guide and Law 15.100.',
    whyEs: 'Smartphone como equipo social: riesgos infantiles, SBP, guía federal 2025 y Ley 15.100.',
    suggestedSlug: post.slug,
    doneHref: '/posts/post-' + post.slug + '.html',
    seriesHint: 'verificacao-equipamento',
    sources: [
      post.sourceUrl,
      'https://www.sbp.com.br/',
      'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm'
    ].filter(Boolean)
  };
  const idx = (sug.items || []).findIndex((x) => x.id === id || x.suggestedSlug === post.slug);
  if (idx >= 0) {
    sug.items[idx] = Object.assign({}, sug.items[idx], item);
  } else {
    sug.items = sug.items || [];
    sug.items.unshift(item);
  }
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
  console.log('Sugestão marcada como feita:', id);
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
  mergePost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const post = buildCelularRiscosCriancasInspecaoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  mergePost(posts, post);
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

  markSuggestionDone(post);

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| cover', post.coverImage);
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
