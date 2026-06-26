const fs = require('fs');
const path = require('path');
const { createContentStore } = require('./_content.js');

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

function readPostsFrom(root) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, 'posts.json'), 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function getPublicPosts(posts, category) {
  let list = posts.filter((p) => p.published !== false);
  if (category) {
    list = list.filter((p) => (p.category || 'pesquisa') === category);
  }
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

function buildPostCardHtml(p) {
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(p.coverImage)}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  return `<div class="card post-card"><a href="${href}" style="text-decoration:none;color:inherit;">${cover}<h3>${title}</h3><p>${excerpt}</p><span class="post-card-date">${date}</span></a></div>`;
}

function buildPostsCardsHtml(posts, category) {
  const list = getPublicPosts(posts, category);
  if (!list.length) {
    return '<p class="empty-message">Nenhuma publicação ainda.</p>';
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

  const contentStore = createContentStore(root);
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

  const targets = [
    { id: 'inspecoes.html', placeholder: '<!-- INSPECTION_POSTS_PLACEHOLDER -->', category: 'inspecao' },
    { id: 'pesquisas.html', placeholder: '<!-- POSTS_PLACEHOLDER -->', category: 'pesquisa' },
    { id: 'equipamentos.html', placeholder: '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', category: 'equipamento' }
  ];

  for (const t of targets) {
    if (!pages[t.id]) continue;
    const cards = buildPostsCardsHtml(posts, t.category);
    const page = pages[t.id];
    page.body = injectPlaceholder(page.body, t.placeholder, cards);
    page.updatedAt = new Date().toISOString();
    pages[t.id] = page;
    const html = contentStore.buildHtmlFromPage(page);
    fs.writeFileSync(path.join(root, t.id), html, 'utf8');
  }

  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  return feed;
}

module.exports = { publishStaticAssets, readPostsFrom, getPublicPosts, toPublicFeedItem };
