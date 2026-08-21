'use strict';

/**
 * Injeta inspeção especial: pessoa + canal Richard Rasmussen Selvagem.
 * Uso: node scripts/upsert-canal-richard-rasmussen-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { stampCatalog } = require('../lib/rasmussen-categories.js');
const { saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { buildRasmussenCanalPost } = require('../lib/richard-rasmussen-canal-inspecao-post.js');
const { buildRasmussenPessoaPost } = require('../lib/richard-rasmussen-inspecao-post.js');
const { buildSelvagemPost } = require('../lib/selvagem-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'richardrasmussenselvagem.json');

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

function stampExistingCatalog() {
  if (!fs.existsSync(CATALOG_FILE)) return;
  const raw = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  const stamped = stampCatalog(raw);
  saveCatalog('richardrasmussenselvagem', stamped);
  console.log('Catálogo carimbado:', stamped.videoCount, 'vídeos');
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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-richard-rasmussen-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  stampExistingCatalog();

  const pessoa = buildRasmussenPessoaPost();
  const canal = buildRasmussenCanalPost();
  const selvagem = buildSelvagemPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, pessoa);
  upsertPost(posts, canal);
  upsertPost(posts, selvagem);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, pessoa);
  writeI18n(i18n, canal);
  writeI18n(i18n, selvagem);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'richard-rasmussen',
      title: 'Richard Rasmussen — ofício selvagem no ecrã BR',
      titleEn: 'Richard Rasmussen — wild craft on Brazilian screens',
      titleEs: 'Richard Rasmussen — oficio salvaje en la pantalla BR',
      tipo: 'pessoa',
      priority: 1,
      status: 'feita',
      why: 'Legado Cap. 10 — biólogo CRBio; TV + YouTube; pessoa ≠ canal; limites públicos.',
      whyEn: 'Legacy Cap. 10 — CRBio biologist; TV + YouTube; person ≠ channel; public limits.',
      whyEs: 'Legado Cap. 10 — biólogo CRBio; TV + YouTube; persona ≠ canal; límites públicos.',
      suggestedSlug: pessoa.slug,
      doneHref: '/posts/post-' + pessoa.slug + '.html',
      seriesHint: 'legado-pessoas',
      sources: [
        'https://pt.wikipedia.org/wiki/Richard_Rasmussen',
        'https://www.youtube.com/@RichardRasmussenSelvagem',
        '/posts/post-inspecao-palavra-selvagem.html'
      ],
      notes: 'Inspeção especial: pessoa + canal. Indexar ≠ endosso político.'
    });
    upsertSug(items, {
      id: 'canal-richard-rasmussen',
      title: 'Richard Rasmussen Selvagem — arquivo YouTube de fauna',
      titleEn: 'Richard Rasmussen Selvagem — YouTube wildlife archive',
      titleEs: 'Richard Rasmussen Selvagem — archivo YouTube de fauna',
      tipo: 'canal',
      priority: 1,
      status: 'feita',
      why: 'Canais: @RichardRasmussenSelvagem — expedições, serpentes, biomas; hub /videos/?channel=rasmussen.',
      whyEn: 'Channels: @RichardRasmussenSelvagem — expeditions, snakes, biomes; hub /videos/?channel=rasmussen.',
      whyEs: 'Canales: @RichardRasmussenSelvagem — expediciones, serpientes, biomas; hub /videos/?channel=rasmussen.',
      suggestedSlug: canal.slug,
      doneHref: '/posts/post-' + canal.slug + '.html',
      seriesHint: 'canal-richard-rasmussen',
      sources: [
        'https://www.youtube.com/@RichardRasmussenSelvagem',
        '/posts/post-inspecao-richard-rasmussen.html',
        '/videos/?channel=rasmussen'
      ],
      notes: 'Pessoa ≠ canal. Catalogar ≠ endosso. Lista classificada na ficha do canal.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (richard-rasmussen)');
  }

  for (const post of [pessoa, canal, selvagem]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', pessoa.title);
  console.log('OK:', canal.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
