const fs = require('fs');
const path = require('path');
const { buildEmptyStateHtml } = require('./empty-state.js');
const { mergeGuiaInspecoesPosts, sortPublicPosts } = require('./merge-guia-inspecoes.js');

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function rootRelativeAsset(value) {
  const raw = String(value || '').trim();
  if (!raw || /^(?:https?:)?\/\//i.test(raw) || raw.startsWith('/') || raw.startsWith('data:')) return raw;
  return '/' + raw.replace(/^\/+/, '');
}

function readPostsFrom(root) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, 'posts.json'), 'utf8') || '[]');
    return mergeGuiaInspecoesPosts(raw);
  } catch (e) {
    return mergeGuiaInspecoesPosts([]);
  }
}

function getPublicPosts(posts, category) {
  let list = posts.filter((p) => p.published !== false);
  if (category) {
    list = list.filter((p) => (p.category || 'pesquisa') === category);
  }
  return sortPublicPosts(list);
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

function buildPostCardHtml(p) {
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(rootRelativeAsset(p.coverImage))}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  return `<div class="card post-card" data-post-slug="${escapeHtml(p.slug || '')}"><a href="${href}" style="text-decoration:none;color:inherit;">${cover}<h3>${title}</h3><p>${excerpt}</p><span class="post-card-date">${date}</span></a></div>`;
}

function buildPostsCardsHtml(posts, category) {
  const list = getPublicPosts(posts, category);
  if (!list.length) {
    return buildEmptyStateHtml(category);
  }
  return list.map(buildPostCardHtml).join('');
}

function injectPlaceholder(body, placeholder, cards) {
  if (body.includes(placeholder)) {
    return body.replace(placeholder, cards);
  }
  return body;
}

function publishStaticAssets(root) {
  const posts = readPostsFrom(root);
  const feed = getPublicPosts(posts).map(toPublicFeedItem);
  fs.writeFileSync(path.join(root, 'posts-public.json'), JSON.stringify(feed, null, 2), 'utf8');

  const pagesPath = path.join(root, 'content', 'pages.json');
  if (!fs.existsSync(pagesPath)) return feed;

  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

  const targets = [
    { id: 'biblioteca/inspecoes/index.html', placeholder: '<!-- INSPECTION_POSTS_PLACEHOLDER -->', category: 'inspecao' },
    { id: 'biblioteca/pesquisas/index.html', placeholder: '<!-- POSTS_PLACEHOLDER -->', category: 'pesquisa' },
    { id: 'equipamentos/index.html', placeholder: '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', category: 'equipamento' }
  ];

  for (const t of targets) {
    if (!pages[t.id]) continue;
    const cards = buildPostsCardsHtml(posts, t.category);
    const page = pages[t.id];
    page.body = injectPlaceholder(page.body, t.placeholder, cards);
    page.updatedAt = new Date().toISOString();
    pages[t.id] = page;
  }

  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  return feed;
}

module.exports = { publishStaticAssets, readPostsFrom, getPublicPosts, toPublicFeedItem };
