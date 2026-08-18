'use strict';

/**
 * Injeta / actualiza a inspeção Rockstar Games (estúdio).
 * Uso: node scripts/upsert-estudio-rockstar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRockstarEstudioInspecaoPost
} = require('../lib/rockstar-estudio-inspecao-post.js');

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
  const beforeGta = posts.findIndex((p) => p.slug === 'inspecao-jogo-gta6');
  if (beforeGta >= 0) {
    posts.splice(beforeGta, 0, post);
    console.log('Inserido', post.slug, 'antes de inspecao-jogo-gta6');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-rockstar-estudio-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildRockstarEstudioInspecaoPost();
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
    const sugId = 'estudio-rockstar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Rockstar Games — estúdio das cidades de ecrã',
      titleEn: 'Rockstar Games — studio of on-screen cities',
      titleEs: 'Rockstar Games — estudio de las ciudades de pantalla',
      tipo: 'jogo',
      priority: 2,
      status: 'feita',
      why:
        'Estúdio/rótulo Take-Two (NY, 1998): rede de studios, GTA/Red Dead — distinto do Caderno GTA 6.',
      whyEn:
        'Take-Two label/studio (NYC, 1998): studio network, GTA/Red Dead — distinct from GTA 6 notebook.',
      whyEs:
        'Sello/estudio Take-Two (NY, 1998): red de studios, GTA/Red Dead — distinto del cuaderno GTA 6.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'cadernos-jogo',
      sources: [
        'https://www.rockstargames.com/',
        'https://pt.wikipedia.org/wiki/Rockstar_Games',
        'https://en.wikipedia.org/wiki/Rockstar_Games',
        '/posts/post-inspecao-jogo-gta6.html',
        '/posts/post-inspecao-canal-paulinho.html',
        '/posts/post-inspecao-canal-zangado.html'
      ],
      notes: 'Estúdio ≠ título. Ficção de crime ≠ manual de crime.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);

    const gtaIdx = items.findIndex((x) => x.id === 'jogo-gta6-caderno-1');
    if (gtaIdx >= 0) {
      const p = items[gtaIdx];
      const sources = Array.isArray(p.sources) ? p.sources.slice() : [];
      if (!sources.includes(href)) sources.push(href);
      items[gtaIdx] = Object.assign({}, p, { sources });
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (estudio-rockstar)');
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
