'use strict';

/**
 * Injeta inspeção especial: canal Slivki Show + destaque Aranha Rodrigo.
 * Uso: node scripts/upsert-canal-slivki-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { stampCatalog } = require('../lib/slivki-categories.js');
const { saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { buildSlivkiCanalPost } = require('../lib/slivki-canal-inspecao-post.js');
const { buildAranhaRodrigoPost } = require('../lib/aranha-rodrigo-inspecao-post.js');
const { buildInsetoPost } = require('../lib/inseto-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'slivkishowen.json');

function upsertPost(posts, post, afterSlug) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const after = afterSlug ? posts.findIndex((p) => p.slug === afterSlug) : -1;
  if (after >= 0) {
    posts.splice(after + 1, 0, post);
    console.log('Inserido', post.slug, 'após', afterSlug);
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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
  saveCatalog('slivkishowen', stamped);
  const rodrigo = (stamped.videos || []).filter((v) => v.category === 'rodrigo').length;
  console.log('Catálogo carimbado:', stamped.videoCount, 'vídeos · Rodrigo:', rodrigo);
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-slivki-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  stampExistingCatalog();

  const canal = buildSlivkiCanalPost();
  const aranha = buildAranhaRodrigoPost();
  const inseto = buildInsetoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, canal, 'inspecao-canal-icl');
  upsertPost(posts, aranha, 'inspecao-canal-slivki');
  upsertPost(posts, inseto);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, canal);
  writeI18n(i18n, aranha);
  writeI18n(i18n, inseto);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'canal-slivki',
      title: 'Slivki Show — experiências visuais e a Aranha Rodrigo',
      titleEn: 'Slivki Show — visual experiments and Rodrigo the spider',
      titleEs: 'Slivki Show — experimentos visuales y la araña Rodrigo',
      tipo: 'canal',
      priority: 1,
      status: 'feita',
      why: 'Canais (especial): @slivkishowen — life hacks e experiências; destaque Aranha Rodrigo. Aranha ≠ inseto.',
      whyEn: 'Channels (special): @slivkishowen — life hacks and experiments; highlight Rodrigo the jumping spider. Spider ≠ insect.',
      whyEs: 'Canales (especial): @slivkishowen — life hacks y experimentos; destaque araña Rodrigo. Araña ≠ insecto.',
      suggestedSlug: canal.slug,
      doneHref: '/posts/post-' + canal.slug + '.html',
      seriesHint: 'canal-slivki',
      sources: [
        'https://www.youtube.com/@slivkishowen',
        '/posts/post-inspecao-animal-aranha-rodrigo.html',
        '/videos/?channel=slivki&series=rodrigo'
      ],
      notes: 'Inspeção especial: canal + ser nomeado. Recorte EN ≠ arquivo UA/RU. Indexar ≠ endosso.'
    });
    upsertSug(items, {
      id: 'aranha-rodrigo',
      title: 'Aranha Rodrigo — saltadora nomeada do Slivki Show',
      titleEn: 'Rodrigo the spider — named jumping spider on Slivki Show',
      titleEs: 'Araña Rodrigo — saltadora nombrada de Slivki Show',
      tipo: 'animal',
      priority: 1,
      status: 'feita',
      why: 'Destaque: saltadora (Salticidae) com nome próprio; aranha ≠ inseto; série encontro / muda / espelho / vs bosque.',
      whyEn: 'Highlight: named jumping spider (Salticidae); spider ≠ insect; series meet / molt / mirror / vs forest.',
      whyEs: 'Destaque: saltadora (Salticidae) con nombre; araña ≠ insecto; serie encuentro / muda / espejo / vs bosque.',
      suggestedSlug: aranha.slug,
      doneHref: '/posts/post-' + aranha.slug + '.html',
      seriesHint: 'animais-catalogo',
      sources: [
        'https://www.youtube.com/watch?v=VEWy9VgN1cU',
        'https://pt.wikipedia.org/wiki/Salticidae',
        '/posts/post-inspecao-canal-slivki.html'
      ],
      notes: 'Ser ≠ canal. Sem protocolo de maneio. Título «smartest» ≠ paper.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (slivki / rodrigo)');
  }

  for (const post of [canal, aranha, inseto]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', canal.title);
  console.log('OK:', aranha.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
