const { renderMarkdown } = require('../_markdown.js');
const { slugify, escapeHtml, formatDatePtBR } = require('./utils.js');
const { normalizeCategory, getCategoryMeta } = require('./categories.js');

function uniqueSlug(title, posts) {
  let base = slugify(title);
  let slug = base;
  let n = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = base + '-' + n;
    n += 1;
  }
  return slug;
}

function normalizePosts(posts) {
  return (posts || []).map((p) => {
    const np = Object.assign({}, p);
    np.title = String(np.title || '').trim();
    np.excerpt = np.excerpt || '';
    np.content_raw = np.content_raw || '';
    np.format = np.format || 'markdown';
    np.date = np.date || new Date().toISOString();
    if (np.published === undefined) np.published = true;
    if (!np.category) np.category = 'pesquisa';
    if (!np.slug) np.slug = slugify(np.title || (np.filename || 'post').replace(/^post-|-\.html$/g, ''));
    if (!np.filename) {
      if (np.url && String(np.url).startsWith('/')) np.filename = String(np.url).slice(1);
      else if (np.url) np.filename = String(np.url);
      else np.filename = `post-${np.slug}.html`;
    }
    np.url = np.filename;
    return np;
  });
}

function getPublicPosts(posts, category) {
  let list = (posts || []).filter((p) => p.published !== false);
  if (category) list = list.filter((p) => (p.category || 'pesquisa') === category);
  return list;
}

function toPublicFeedItem(p) {
  return {
    title: p.title,
    excerpt: p.excerpt || '',
    slug: p.slug,
    url: p.url || p.filename,
    date: p.date,
    filename: p.filename,
    coverImage: p.coverImage || '',
    category: p.category || 'pesquisa'
  };
}

function processContent(content, format) {
  if (format === 'markdown') return renderMarkdown(content);
  return content;
}

function buildPostHtml(post) {
  const title = post.title || '';
  const safe = escapeHtml(title);
  const excerpt = escapeHtml(post.excerpt || '');
  const dateLabel = formatDatePtBR(post.date);
  const bodyHtml = processContent(post.content_raw || post.content || '', post.format || 'markdown');
  const slug = escapeHtml(post.slug || '');
  const meta = getCategoryMeta(post.category);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${excerpt}">
<meta property="og:title" content="${safe} | Inspetor BudGanja">
<meta property="og:description" content="${excerpt}">
<meta property="og:type" content="article">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#27ae60">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="BudGanja">
<link rel="stylesheet" href="style.css">
<title>${safe} | Inspetor BudGanja</title>
</head>
<body data-page="pesquisa" data-post-slug="${slug}">
<div id="site-header"></div>
<main id="main-content" class="relatorio-container conteudo">
<a href="${meta.listPage}" class="voltar-link">&larr; Voltar para ${meta.label}</a>
<h1>${safe}</h1>
<div class="meta-info">Publicado em ${dateLabel}</div>
<div class="post-content">${bodyHtml}</div>
</main>
<div id="site-footer"></div>
<script src="js/layout.js"></script>
</body>
</html>`;
}

function buildPostCardHtml(p) {
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(p.coverImage)}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  return `<div class="card post-card"><a href="${href}">${cover}<h3>${title}</h3><p>${excerpt}</p><span class="post-card-date">${date}</span></a></div>`;
}

function buildPostsCardsHtml(posts, category) {
  const list = getPublicPosts(posts, category);
  if (!list.length) return '<p class="empty-message">Nenhuma publicação ainda.</p>';
  return list.map(buildPostCardHtml).join('');
}

async function createPost(store, payload) {
  const title = (payload.title || '').trim();
  const excerpt = (payload.excerpt || '').trim();
  const content = payload.content || '';
  const format = payload.format === 'html' ? 'html' : 'markdown';
  const published = payload.published !== false;
  const coverImage = String(payload.coverImage || '').trim();
  const category = normalizeCategory(payload.category, 'pesquisa');
  if (!title || !content) return { error: 'title and content required', status: 400 };

  const posts = normalizePosts(await store.getPosts());
  const slug = uniqueSlug(title, posts);
  const filename = `post-${slug}.html`;
  const meta = {
    title, excerpt, slug, filename, url: filename,
    date: new Date().toISOString(),
    content_raw: content, format, published, coverImage, category
  };

  posts.unshift(meta);
  await store.setPosts(posts);
  return { ok: true, url: meta.url, slug: meta.slug, status: 201, posts };
}

async function updatePost(store, slug, payload) {
  const posts = normalizePosts(await store.getPosts());
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { error: 'post not found', status: 404 };

  const existing = posts[idx];
  const title = (payload.title || '').trim();
  const excerpt = (payload.excerpt || '').trim();
  const content = payload.content || '';
  const format = payload.format === 'html' ? 'html' : 'markdown';
  const published = payload.published !== undefined ? payload.published !== false : existing.published !== false;
  const coverImage = payload.coverImage != null ? String(payload.coverImage).trim() : (existing.coverImage || '');
  const category = normalizeCategory(payload.category, existing.category || 'pesquisa');
  if (!title || !content) return { error: 'title and content required', status: 400 };

  const updated = Object.assign({}, existing, {
    title, excerpt, content_raw: content, format, published, coverImage, category
  });
  posts[idx] = updated;
  await store.setPosts(posts);
  return { ok: true, url: existing.url, slug: existing.slug, status: 200, posts };
}

async function deletePost(store, slug) {
  const posts = normalizePosts(await store.getPosts());
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { error: 'post not found', status: 404 };
  posts.splice(idx, 1);
  await store.setPosts(posts);
  return { ok: true, status: 200, posts };
}

module.exports = {
  normalizePosts,
  getPublicPosts,
  toPublicFeedItem,
  buildPostHtml,
  buildPostsCardsHtml,
  buildPostCardHtml,
  createPost,
  updatePost,
  deletePost
};
