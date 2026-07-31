const { renderMarkdown } = require('./markdown-render.js');
const { buildEmptyStateHtml } = require('./empty-state.js');
const { slugify, escapeHtml, formatDatePtBR } = require('./utils.js');
const { normalizeCategory, getCategoryMeta } = require('./categories.js');
const { ASSET_VERSION } = require('./asset-version.js');
const { sortPublicPosts } = require('./merge-guia-inspecoes.js');

let _eventBus = null;
function getEventBus() {
  if (!_eventBus) {
    try { _eventBus = require('./admin-event-bus.js'); } catch (e) { _eventBus = { emit: () => {} }; }
  }
  return _eventBus;
}

function emitStatsChange(store) {
  try {
    store.getPosts().then((posts) => {
      const total = posts.length;
      const published = posts.filter((p) => p.published !== false).length;
      const byCategory = {};
      posts.forEach((p) => { const c = p.category || 'pesquisa'; byCategory[c] = (byCategory[c] || 0) + 1; });
      getEventBus().emit('stats', { total, published, drafts: total - published, byCategory });
    }).catch(() => {});
  } catch (e) { /* ignorar */ }
}

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
      else np.filename = `posts/post-${np.slug}.html`;
    }
    if (np.filename && /^post-[^/]+\.html$/i.test(np.filename)) {
      np.filename = 'posts/' + np.filename;
    }
    np.url = '/' + String(np.filename).replace(/^\/+/, '');
    return np;
  });
}

function getPublicPosts(posts, category) {
  let list = (posts || []).filter((p) => p.published !== false);
  if (category) list = list.filter((p) => (p.category || 'pesquisa') === category);
  return sortPublicPosts(list);
}

function toPublicFeedItem(p) {
  return {
    title: p.title,
    excerpt: p.excerpt || '',
    excerptEn: p.excerptEn || p.excerpt_en || '',
    excerptEs: p.excerptEs || p.excerpt_es || '',
    slug: p.slug,
    url: p.url || p.filename,
    date: p.date,
    filename: p.filename,
    coverImage: rootRelativeAsset(p.coverImage || ''),
    category: p.category || 'pesquisa',
    series: p.series || '',
    seriesOrder: p.seriesOrder != null ? p.seriesOrder : null,
    seriesLabel: p.seriesLabel || ''
  };
}

function processContent(content, format) {
  if (format === 'markdown') return renderMarkdown(content);
  return content;
}

function rootRelativeAsset(value) {
  const raw = String(value || '').trim();
  if (!raw || /^(?:https?:)?\/\//i.test(raw) || raw.startsWith('/') || raw.startsWith('data:')) return raw;
  return '/' + raw.replace(/^\/+/, '');
}

function siteBaseUrl() {
  return String(process.env.SITE_URL || process.env.URL || 'https://inspetorbudganja.com.br').replace(/\/$/, '');
}

/** Absolute URL for OG/Twitter/JSON-LD (external thumbs stay as-is). */
function absoluteAssetUrl(value) {
  const raw = String(value || '').trim();
  if (!raw || /^data:/i.test(raw)) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^\/\//.test(raw)) return 'https:' + raw;
  const path = rootRelativeAsset(raw);
  return siteBaseUrl() + path;
}

function buildPostHtml(post) {
  const { buildVideoObjectJson, appendPostExtras, buildI18nNoteHtml } = require('./inspecao-post-extras.js');
  const title = post.title || '';
  const titleEn = String(post.titleEn || post.title_en || '').trim();
  const titleEs = String(post.titleEs || post.title_es || '').trim();
  const safe = escapeHtml(title);
  const excerpt = escapeHtml(post.excerpt || '');
  const excerptEn = escapeHtml(post.excerptEn || post.excerpt_en || '');
  const excerptEs = escapeHtml(post.excerptEs || post.excerpt_es || '');
  const dateLabel = formatDatePtBR(post.date);
  const dateIso = escapeHtml(String(post.date || '').slice(0, 10));
  let bodyHtml = processContent(post.content_raw || post.content || '', post.format || 'markdown');
  bodyHtml = appendPostExtras(post, bodyHtml);
  const i18nNoteHtml = buildI18nNoteHtml(post) || '';
  const slug = escapeHtml(post.slug || '');
  const meta = getCategoryMeta(post.category);
  const pageType = escapeHtml(post.category || 'pesquisa');
  const categoryKey =
    post.category === 'equipamento'
      ? 'posts.categoryEquipment'
      : post.category === 'inspecao'
        ? 'posts.categoryInspection'
        : 'posts.categoryResearch';

  const coverImage = rootRelativeAsset(post.coverImage || '/imagens/background-hero.png');
  const coverAbs = absoluteAssetUrl(coverImage);
  const coverAbsEsc = escapeHtml(coverAbs);
  const coverRelEsc = escapeHtml(coverImage);
  const coverIsRaster = /\.(jpe?g|png|webp)(?:$|[?#])/i.test(coverImage);
  const coverMime = /\.webp(?:$|[?#])/i.test(coverImage)
    ? 'image/webp'
    : /\.png(?:$|[?#])/i.test(coverImage)
      ? 'image/png'
      : 'image/jpeg';
  const pageUrlAbs = escapeHtml(siteBaseUrl() + (post.url || ('/posts/post-' + (post.slug || '') + '.html')));

  const categoryLabel = escapeHtml(meta.label || '');

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: post.excerpt || '',
    datePublished: post.date || '',
    image: coverAbs,
    author: { '@type': 'Organization', name: 'Inspetor BudGanja' }
  };
  const videoLd = buildVideoObjectJson(post, coverAbs);
  const ldJson = videoLd ? [articleLd, videoLd] : articleLd;

  const coverFigure = coverIsRaster
    ? `<figure class="article-cover">
<img src="${coverRelEsc}" alt="" class="article-cover-img" width="1200" height="630" decoding="async" fetchpriority="high" data-share-image="${coverRelEsc}">
</figure>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${excerpt}">
<meta property="og:title" content="${safe} | Inspetor BudGanja">
<meta property="og:description" content="${excerpt}">
<meta property="og:type" content="article">
<meta property="og:url" content="${pageUrlAbs}">
<meta property="og:image" content="${coverAbsEsc}">
<meta property="og:image:secure_url" content="${coverAbsEsc}">
<meta property="og:image:type" content="${coverMime}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safe}">
<meta name="twitter:description" content="${excerpt}">
<meta name="twitter:image" content="${coverAbsEsc}">
<link rel="canonical" href="${pageUrlAbs}">
<link rel="icon" href="/imagens/icon-192.v${ASSET_VERSION}.png" sizes="192x192" type="image/png">
<link rel="icon" href="/imagens/favicon-48.v${ASSET_VERSION}.png" sizes="48x48" type="image/png">
<link rel="icon" href="/imagens/favicon-32.v${ASSET_VERSION}.png" sizes="32x32" type="image/png">
<link rel="icon" href="/imagens/favicon-16.v${ASSET_VERSION}.png" sizes="16x16" type="image/png">
<link rel="shortcut icon" href="/favicon.v${ASSET_VERSION}.ico" sizes="any">
<link rel="icon" href="/favicon.v${ASSET_VERSION}.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${ASSET_VERSION}.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#a68628">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="BudGanja">
<link rel="stylesheet" href="/css/style.css?v=${ASSET_VERSION}">
<title>${safe} | Inspetor BudGanja</title>
<script type="application/ld+json">${JSON.stringify(ldJson)}</script>
</head>
<body data-page="${pageType}" data-post-slug="${slug}">
<div id="site-header"></div>
<main id="main-content" class="article-page relatorio-container">
<header class="article-header" data-post-header data-excerpt-pt="${excerpt}" data-excerpt-en="${excerptEn}" data-excerpt-es="${excerptEs}">
<a href="${meta.listPage}" class="voltar-link" data-post-back data-category-key="${categoryKey}">&larr; Voltar para ${meta.label}</a>
<p class="article-eyebrow" data-post-category data-category-key="${categoryKey}">${categoryLabel}</p>
<h1 data-post-title data-title-pt="${safe}" data-title-en="${escapeHtml(titleEn)}" data-title-es="${escapeHtml(titleEs)}">${safe}</h1>
<div class="article-share">
<button type="button" class="article-share-btn" data-post-share data-i18n-aria="common.shareAria" aria-label="Compartilhar esta publicação">
<span class="article-share-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg></span>
<span data-i18n="common.share">Compartilhar</span>
</button>
<span class="article-share-feedback" data-post-share-feedback hidden aria-live="polite"></span>
</div>
${i18nNoteHtml}
${coverFigure}
<div class="meta-info" data-post-date data-date-iso="${dateIso}">Publicado em ${dateLabel}</div>
</header>
<div class="post-content">${bodyHtml}</div>
</main>
<div id="site-footer"></div>
<script src="/js/app-version-check.js?v=${ASSET_VERSION}"></script>
<script src="/js/i18n-data.js?v=${ASSET_VERSION}"></script>
<script src="/js/i18n.js?v=${ASSET_VERSION}"></script>
<script src="/js/ferramentas-nav-data.js?v=${ASSET_VERSION}"></script>
<script src="/js/layout.js?v=${ASSET_VERSION}"></script>
<script src="/js/site-features.js?v=${ASSET_VERSION}"></script>
</body>
</html>`;
}

function buildPostCardHtml(p) {
  const { SERIES_LABELS } = require('./inspecao-post-extras.js');
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(rootRelativeAsset(p.coverImage))}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  let badge = '';
  if (p.series) {
    const label = p.seriesLabel || SERIES_LABELS[p.series] || p.series;
    const order = p.seriesOrder != null ? ' · Cap. ' + p.seriesOrder : '';
    badge =
      '<div class="post-card-badges"><span class="post-card-series" data-series="' +
      escapeHtml(p.series) + '">' + escapeHtml(label + order) + '</span></div>';
  }
  const seriesAttr = p.series ? ' data-series="' + escapeHtml(p.series) + '"' : '';
  return (
    '<div class="card post-card" data-post-slug="' + escapeHtml(p.slug || '') + '"' + seriesAttr + '>' +
    '<a href="' + href + '" style="text-decoration:none;color:inherit;">' +
    cover + badge + '<h3>' + title + '</h3><p>' + excerpt + '</p><span class="post-card-date">' + date + '</span></a></div>'
  );
}

function buildPostsCardsHtml(posts, category) {
  const list = getPublicPosts(posts, category);
  if (!list.length) return buildEmptyStateHtml(category);
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
  const series = String(payload.series || '').trim();
  const seriesLabel = String(payload.seriesLabel || '').trim();
  if (!title || !content) return { error: 'title and content required', status: 400 };

  const posts = normalizePosts(await store.getPosts());
  const slug = uniqueSlug(title, posts);
  const filename = `posts/post-${slug}.html`;
  const meta = {
    title, excerpt, slug, filename, url: '/' + filename,
    date: new Date().toISOString(),
    content_raw: content, format, published, coverImage, category, series, seriesLabel
  };

  posts.unshift(meta);
  await store.setPosts(posts);
  emitStatsChange(store);
  getEventBus().emit('post_changed', { action: 'create', slug: meta.slug, title: meta.title, category: meta.category });
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
  const series = payload.series != null ? String(payload.series).trim() : (existing.series || '');
  const seriesLabel = payload.seriesLabel != null ? String(payload.seriesLabel).trim() : (existing.seriesLabel || '');
  if (!title || !content) return { error: 'title and content required', status: 400 };

  const updated = Object.assign({}, existing, {
    title, excerpt, content_raw: content, format, published, coverImage, category, series, seriesLabel
  });
  posts[idx] = updated;
  await store.setPosts(posts);
  emitStatsChange(store);
  getEventBus().emit('post_changed', { action: 'update', slug: existing.slug, title: updated.title, category: updated.category });
  return { ok: true, url: existing.url, slug: existing.slug, status: 200, posts };
}

async function deletePost(store, slug) {
  const posts = normalizePosts(await store.getPosts());
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { error: 'post not found', status: 404 };
  posts.splice(idx, 1);
  await store.setPosts(posts);
  emitStatsChange(store);
  getEventBus().emit('post_changed', { action: 'delete', slug });
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
