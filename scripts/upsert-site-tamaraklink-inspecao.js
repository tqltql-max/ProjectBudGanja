'use strict';

/**
 * Injeta / actualiza a inspeção do site oficial tamaraklink.com.
 * Uso: node scripts/upsert-site-tamaraklink-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildTamaraklinkSiteInspecaoPost
} = require('../lib/tamaraklink-site-inspecao-post.js');

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
  const afterPessoa = posts.findIndex((p) => p.slug === 'inspecao-tamara-klink');
  if (afterPessoa >= 0) {
    posts.splice(afterPessoa + 1, 0, post);
    console.log('Inserido', post.slug, 'após inspecao-tamara-klink');
    return;
  }
  const afterCanal = posts.findIndex((p) => p.slug === 'inspecao-canal-tamaraklink');
  if (afterCanal >= 0) {
    posts.splice(afterCanal + 1, 0, post);
    console.log('Inserido', post.slug, 'após canal Tamara');
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
  const post = buildTamaraklinkSiteInspecaoPost();
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
    const sugId = 'site-tamaraklink';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'tamaraklink.com — carta náutica digital do Ártico',
      titleEn: 'tamaraklink.com — digital nautical chart of the Arctic',
      titleEs: 'tamaraklink.com — carta náutica digital del Ártico',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why:
        'Site oficial: mapa de expedições, Lectures, tracking PredictWind — distinto da ficha de pessoa e do canal YouTube.',
      whyEn:
        'Official site: expedition map, Lectures, PredictWind tracking — distinct from person sheet and YouTube channel.',
      whyEs:
        'Sitio oficial: mapa de expediciones, Lectures, tracking PredictWind — distinto de la ficha de persona y del canal de YouTube.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'legado-pessoas',
      sources: [
        'https://www.tamaraklink.com/',
        'https://www.tamaraklink.com/items-1',
        'https://www.tamaraklink.com/lectures-2',
        'https://www.tamaraklink.com/contact',
        '/posts/post-inspecao-tamara-klink.html',
        '/posts/post-inspecao-canal-tamaraklink.html'
      ],
      notes: 'Site ≠ pessoa ≠ canal. Indexar ≠ endosso.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);

    const pessoaIdx = items.findIndex((x) => x.id === 'pessoa-tamara-klink');
    if (pessoaIdx >= 0) {
      const p = items[pessoaIdx];
      const sources = Array.isArray(p.sources) ? p.sources.slice() : [];
      if (!sources.includes(href)) sources.push(href);
      items[pessoaIdx] = Object.assign({}, p, { sources });
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (site-tamaraklink)');
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
