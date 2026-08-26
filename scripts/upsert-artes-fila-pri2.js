'use strict';

/**
 * Injeta artes prioridade 2 (livros) + marca sugestões feitas.
 * Uso: node scripts/upsert-artes-fila-pri2.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  ARTES_FILA_PRI2_POSTS,
  ARTES_FILA_PRI2_META
} = require('../lib/artes-fila-pri2-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-artes-fila-pri2-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const built = ARTES_FILA_PRI2_POSTS.map(stampFiles);
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const post of built) upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of built) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const post of built) writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    for (const meta of ARTES_FILA_PRI2_META) {
      const post = built.find((p) => p.slug === meta.slug);
      if (!post) continue;
      const href = '/posts/post-' + post.slug + '.html';
      const si = items.findIndex((x) => x.id === meta.sugId);
      const patch = {
        status: 'feita',
        suggestedSlug: post.slug,
        doneHref: href,
        notes: (si >= 0 && items[si].notes ? items[si].notes + ' · ' : '') + 'Cap. ' + post.seriesOrder
      };
      if (si >= 0) items[si] = Object.assign({}, items[si], patch);
      else items.push(Object.assign({ id: meta.sugId, tipo: 'arte', title: post.title }, patch));
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões artes pri.2 actualizadas');
  }

  console.log('OK:', built.length, 'artes prioridade 2');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
