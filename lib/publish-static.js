const fs = require('fs');
const path = require('path');
const { mergeGuiaInspecoesPosts } = require('./merge-guia-inspecoes.js');
const {
  getPublicPosts,
  toPublicFeedItem,
  buildPostsCardsHtml
} = require('./posts-service.js');

function readPostsFrom(root) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, 'posts.json'), 'utf8') || '[]');
    return mergeGuiaInspecoesPosts(raw);
  } catch (e) {
    return mergeGuiaInspecoesPosts([]);
  }
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
    const nextBody = injectPlaceholder(page.body, t.placeholder, cards);
    if (nextBody !== page.body) {
      page.body = nextBody;
      page.updatedAt = new Date().toISOString();
    }
    pages[t.id] = page;
  }

  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  return feed;
}

module.exports = { publishStaticAssets, readPostsFrom, getPublicPosts, toPublicFeedItem };
