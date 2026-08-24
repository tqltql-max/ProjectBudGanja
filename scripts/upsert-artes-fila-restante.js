'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  ARTES_FILA_RESTANTE_POSTS,
  ARTES_FILA_RESTANTE_CONFIGS,
  coverFile
} = require('../lib/artes-fila-restante-inspecoes-posts.js');

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
  fs.mkdirSync(path.dirname(path.join(ROOT, normalized.filename)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, normalized.filename), buildPostHtml(normalized), 'utf8');
}
function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = Object.assign({}, posts[idx], post);
  else posts.unshift(post);
  console.log(idx >= 0 ? 'Actualizado' : 'Inserido', post.slug, 'Cap.', post.seriesOrder);
}

async function generateCovers() {
  const sharp = require('sharp');
  const hero = path.join(ROOT, 'imagens', 'background-hero.png');
  fs.mkdirSync(path.join(ROOT, 'imagens', 'inspecoes'), { recursive: true });
  for (const cfg of ARTES_FILA_RESTANTE_CONFIGS) {
    const rel = coverFile(cfg.slug);
    const out = path.join(ROOT, rel);
    const base = await sharp(hero)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.52, saturation: 0.88 })
      .toBuffer();
    const title = String(cfg.coverTitle)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;');
    const sub = String(cfg.coverSub)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;');
    const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="rgba(8,14,10,0.55)"/>
      <text x="600" y="190" text-anchor="middle" font-family="Segoe UI, Arial" font-size="20" fill="#8fbc8f" letter-spacing="6">ARTES</text>
      <text x="600" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="42" fill="#e8ffe8">${title}</text>
      <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial" font-size="22" fill="#d0e0d0">${sub}</text>
    </svg>`);
    await sharp(base).composite([{ input: overlay }]).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
    console.log('OK', rel);
  }
}

async function main() {
  try {
    await generateCovers();
  } catch (e) {
    console.warn('Aviso capas', e.message);
  }
  const built = ARTES_FILA_RESTANTE_POSTS.map(stampFiles);
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const p of built) upsertPost(posts, p);
  await writeJsonRetry(POSTS_FILE, posts);
  for (const p of built) {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('HTML', p.slug, e.message);
    }
  }
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
  for (const cfg of ARTES_FILA_RESTANTE_CONFIGS) {
    const post = built.find((p) => p.slug === cfg.slug);
    const si = items.findIndex((x) => x.id === cfg.sugId);
    const href = '/posts/post-' + cfg.slug + '.html';
    const patch = {
      status: 'feita',
      suggestedSlug: cfg.slug,
      doneHref: href,
      notes: ((si >= 0 && items[si].notes) || '') + ' · Cap. ' + (post && post.seriesOrder)
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], patch);
    else items.push(Object.assign({ id: cfg.sugId, tipo: 'arte', title: cfg.title }, patch));
  }
  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  console.log('OK', built.length, 'artes restantes');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
