'use strict';

/**
 * Injeta inspeção + i18n do canal Paulinho o LOKO (+ Modder).
 * Uso: node scripts/upsert-canal-paulinho-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPaulinhoCanalPost } = require('../lib/paulinho-canal-inspecao-post.js');

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
  const afterZangado = posts.findIndex((p) => p.slug === 'inspecao-canal-zangado');
  if (afterZangado >= 0) {
    posts.splice(afterZangado + 1, 0, post);
    console.log('Inserido', post.slug, 'após canal Zangado');
    return;
  }
  const afterAleff = posts.findIndex((p) => p.slug === 'inspecao-figura-aleff');
  if (afterAleff >= 0) {
    posts.splice(afterAleff + 1, 0, post);
    console.log('Inserido', post.slug, 'após figura Aleff');
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
  const post = buildPaulinhoCanalPost();
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
    const sugId = 'canal-paulinho';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Paulinho o LOKO — canal GTA RP, Anti-RP e raiz Modder',
      titleEn: 'Paulinho o LOKO — GTA RP channel, Anti-RP and Modder root',
      titleEs: 'Paulinho o LOKO — canal GTA RP, Anti-RP y raíz Modder',
      tipo: 'canal',
      priority: 2,
      status: 'feita',
      why:
        'Canais: @PaulinhoLOKOoficial + Modder (UC57…) — arquivo Games; distinto da ficha de pessoa Aleff.',
      whyEn:
        'Channels: @PaulinhoLOKOoficial + Modder (UC57…) — Games archive; distinct from Aleff person sheet.',
      whyEs:
        'Canales: @PaulinhoLOKOoficial + Modder (UC57…) — archivo Games; distinto de la ficha de persona Aleff.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'canal-paulinho',
      sources: [
        'https://www.youtube.com/@PaulinhoLOKOoficial',
        'https://www.youtube.com/channel/UC57rWqVJ7yGluT4cGrgfkgg',
        'https://pt.wikipedia.org/wiki/Paulinho_o_Loko',
        '/posts/post-inspecao-figura-aleff.html',
        '/jogos/aleff/',
        '/videos/?channel=paulinho'
      ],
      notes: 'Pessoa ≠ canal. Ficção de jogo ≠ manual de crime. Modder = raiz 2015.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);

    const aleffIdx = items.findIndex((x) => x.id === 'figura-aleff');
    if (aleffIdx >= 0) {
      const p = items[aleffIdx];
      const sources = Array.isArray(p.sources) ? p.sources.slice() : [];
      if (!sources.includes(href)) sources.push(href);
      items[aleffIdx] = Object.assign({}, p, { sources });
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (canal-paulinho)');
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
