'use strict';

const fs = require('fs');
const path = require('path');
const {
  leftoverPosts,
  LEFTOVER_META,
  WORD_DONE
} = require('../lib/fila-restante-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
  fs.writeFileSync(path.join(ROOT, normalized.filename), buildPostHtml(normalized), 'utf8');
  console.log('HTML', normalized.filename);
}
function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = Object.assign({}, posts[idx], post);
  else posts.unshift(post);
  console.log(idx >= 0 ? 'Actualizado' : 'Inserido', post.slug);
}

async function covers() {
  const sharp = require('sharp');
  const hero = path.join(ROOT, 'imagens', 'background-hero.png');
  for (const meta of LEFTOVER_META) {
    const file =
      meta.slug === 'inspecao-derivado-tabaco'
        ? 'tabaco-derivado-cover.jpg'
        : meta.slug === 'inspecao-figura-teophrasto'
          ? 'teofrasto-cover.jpg'
          : 'pharmacon-cover.jpg';
    const out = path.join(ROOT, 'imagens', 'inspecoes', file);
    const base = await sharp(hero)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.5, saturation: 0.9 })
      .toBuffer();
    const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="rgba(8,14,10,0.6)"/>
      <text x="600" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="#e8ffe8">${meta.coverTitle}</text>
      <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial" font-size="22" fill="#d0e0d0">${meta.coverSub}</text>
    </svg>`);
    await sharp(base).composite([{ input: overlay }]).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', file);
  }
}

async function main() {
  try {
    await covers();
  } catch (e) {
    console.warn('capas', e.message);
  }
  const built = leftoverPosts().map(stampFiles);
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const p of built) upsertPost(posts, p);
  await writeJsonRetry(POSTS_FILE, posts);
  for (const p of built) writeHtml(p);
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const p of built) {
    i18n[p.slug] = {
      titleEn: p.titleEn,
      titleEs: p.titleEs,
      excerptEn: p.excerptEn,
      excerptEs: p.excerptEs,
      contentEn: p.contentEn,
      contentEs: p.contentEs
    };
  }
  await writeJsonRetry(I18N_FILE, i18n);

  const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
  const items = sug.items || [];
  for (const meta of LEFTOVER_META) {
    const si = items.findIndex((x) => x.id === meta.sugId);
    const href = '/posts/post-' + meta.slug + '.html';
    const patch = { status: 'feita', suggestedSlug: meta.slug, doneHref: href };
    if (si >= 0) items[si] = Object.assign({}, items[si], patch);
  }
  for (const [id, info] of Object.entries(WORD_DONE)) {
    const si = items.findIndex((x) => x.id === id);
    const href = '/posts/post-' + info.slug + '.html';
    const patch = {
      status: 'feita',
      suggestedSlug: info.slug,
      doneHref: href,
      notes: info.note
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], patch);
  }
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  console.log('OK fila restante + palavras conjuntas');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
