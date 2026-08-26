'use strict';

/**
 * Injeta inspeção especial: canal Manual do Mundo + Iberê + Manual Maker.
 * Uso: node scripts/upsert-canal-manual-do-mundo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { stampCatalog } = require('../lib/manual-do-mundo-categories.js');
const { saveCatalog } = require('../lib/youtube-channel-catalog.js');
const { buildManualDoMundoCanalPost } = require('../lib/manual-do-mundo-canal-inspecao-post.js');
const { buildIbereThenorioPost } = require('../lib/ibere-thenorio-inspecao-post.js');
const { buildManualMakerPost } = require('../lib/manual-maker-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'manualdomundo.json');

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
  saveCatalog('manualdomundo', stamped);
  const maker = (stamped.videos || []).filter((v) => v.category === 'maker').length;
  console.log('Catálogo carimbado:', stamped.videoCount, 'vídeos · Maker:', maker);
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  let lastErr;
  for (let i = 0; i < 5; i++) {
    try {
      const store = await createSqlStore(ROOT);
      const posts = await store.getPosts();
      upsertPost(posts, post);
      await store.setPosts(posts);
      console.log('SQL store actualizado:', post.slug);
      return;
    } catch (e) {
      lastErr = e;
      if (!/SQLITE_BUSY|database is locked/i.test(String(e && e.message))) throw e;
      await new Promise((r) => setTimeout(r, 400 * Math.pow(2, i)));
    }
  }
  throw lastErr;
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-manual-do-mundo-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  stampExistingCatalog();

  const canal = buildManualDoMundoCanalPost();
  const ibere = buildIbereThenorioPost();
  const maker = buildManualMakerPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, canal, 'inspecao-canal-slivki');
  upsertPost(posts, ibere, 'inspecao-canal-manual-do-mundo');
  upsertPost(posts, maker, 'inspecao-ibere-thenorio');
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, canal);
  writeI18n(i18n, ibere);
  writeI18n(i18n, maker);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'canal-manual-do-mundo',
      title: 'Manual do Mundo — ciência no ecrã e o Manual Maker',
      titleEn: 'Manual do Mundo — science on screen and Manual Maker',
      titleEs: 'Manual do Mundo — ciencia en pantalla y Manual Maker',
      tipo: 'canal',
      priority: 1,
      status: 'feita',
      why: 'Canais (especial): @manualdomundo — ciência e experiências; destaque Manual Maker. Pessoa ≠ canal.',
      whyEn: 'Channels (special): @manualdomundo — science and experiments; highlight Manual Maker. Person ≠ channel.',
      whyEs: 'Canales (especial): @manualdomundo — ciencia y experimentos; destaque Manual Maker. Persona ≠ canal.',
      suggestedSlug: canal.slug,
      doneHref: '/posts/post-' + canal.slug + '.html',
      seriesHint: 'canal-manual-do-mundo',
      sources: [
        'https://www.youtube.com/@manualdomundo',
        '/posts/post-inspecao-ibere-thenorio.html',
        '/videos/?channel=manualdomundo&series=maker'
      ],
      notes: 'Inspeção especial: canal + pessoa + Maker. Maker ≠ loja. Indexar ≠ endosso.'
    });
    upsertSug(items, {
      id: 'ibere-thenorio',
      title: 'Iberê Thenório — ofício de ciência no ecrã brasileiro',
      titleEn: 'Iberê Thenório — science craft on Brazilian screens',
      titleEs: 'Iberê Thenório — oficio de ciencia en la pantalla brasileña',
      tipo: 'pessoa',
      priority: 1,
      status: 'feita',
      why: 'Legado: jornalista (ECA-USP), cofundador do Manual do Mundo (2008) com Mariana Fulfaro; pessoa ≠ canal.',
      whyEn: 'Legacy: journalist (ECA-USP), co-founder of Manual do Mundo (2008) with Mariana Fulfaro; person ≠ channel.',
      whyEs: 'Legado: periodista (ECA-USP), cofundador de Manual do Mundo (2008) con Mariana Fulfaro; persona ≠ canal.',
      suggestedSlug: ibere.slug,
      doneHref: '/posts/post-' + ibere.slug + '.html',
      seriesHint: 'legado-pessoas',
      sources: [
        'https://pt.wikipedia.org/wiki/Iberê_Thenório',
        '/posts/post-inspecao-canal-manual-do-mundo.html'
      ],
      notes: 'Pessoa ≠ canal. Guinness é recorde de inscritos, não paper.'
    });
    upsertSug(items, {
      id: 'manual-maker',
      title: 'Manual Maker — Arduino, 3D e laser no Manual do Mundo',
      titleEn: 'Manual Maker — Arduino, 3D and laser on Manual do Mundo',
      titleEs: 'Manual Maker — Arduino, 3D y láser en Manual do Mundo',
      tipo: 'formacao',
      priority: 1,
      status: 'feita',
      why: 'Destaque: série de ofício (Arduino, 3D, laser) no mesmo canal; Maker ≠ loja; Maker ≠ canal à parte.',
      whyEn: 'Highlight: craft series (Arduino, 3D, laser) on the same channel; Maker ≠ shop; Maker ≠ separate channel.',
      whyEs: 'Destaque: serie de oficio (Arduino, 3D, láser) en el mismo canal; Maker ≠ tienda; Maker ≠ otro canal.',
      suggestedSlug: maker.slug,
      doneHref: '/posts/post-' + maker.slug + '.html',
      seriesHint: 'formacao-academica',
      sources: [
        'https://www.youtube.com/@manualdomundo',
        '/posts/post-inspecao-canal-manual-do-mundo.html',
        '/videos/?channel=manualdomundo&series=maker'
      ],
      notes: 'Série ≠ loja manualmaker.com.br. Sem protocolo de solda.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (manual do mundo / iberê / maker)');
  }

  for (const post of [canal, ibere, maker]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', canal.title);
  console.log('OK:', ibere.title);
  console.log('OK:', maker.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
