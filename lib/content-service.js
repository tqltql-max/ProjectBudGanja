const { PAGE_REGISTRY, DEFAULT_SITE } = require('./content-store.js');
const { buildHtmlFromPage } = require('./page-html.js');
const { buildPostsCardsHtml } = require('./posts-service.js');

function injectPlaceholder(body, placeholder, cards) {
  if (body.includes(placeholder)) return body.replace(placeholder, cards);
  return body;
}

async function readPagesFromStore(store, fsFallback) {
  if (store.getPages) {
    const pages = await store.getPages();
    if (pages) return pages;
  }
  if (fsFallback) {
    try {
      const fs = require('fs');
      const path = require('path');
      return JSON.parse(fs.readFileSync(path.join(fsFallback, 'content', 'pages.json'), 'utf8'));
    } catch (e) { /* ignore */ }
  }
  return {};
}

async function readSiteFromStore(store, fsFallback) {
  if (store.getSite) {
    const site = await store.getSite();
    if (site) return Object.assign({}, DEFAULT_SITE, site);
  }
  if (fsFallback) {
    try {
      const fs = require('fs');
      const path = require('path');
      const data = JSON.parse(fs.readFileSync(path.join(fsFallback, 'content', 'site.json'), 'utf8'));
      return Object.assign({}, DEFAULT_SITE, data);
    } catch (e) { /* ignore */ }
  }
  return Object.assign({}, DEFAULT_SITE);
}

async function listPagesMeta(store, fsFallback) {
  const pages = await readPagesFromStore(store, fsFallback);
  return PAGE_REGISTRY.map((entry) => {
    const page = pages[entry.file];
    return {
      id: entry.file,
      label: entry.label,
      title: page ? page.title : entry.label,
      updatedAt: page ? page.updatedAt : null
    };
  });
}

async function getPage(store, id, fsFallback) {
  const pages = await readPagesFromStore(store, fsFallback);
  return pages[id] || null;
}

async function updatePage(store, id, payload, fsFallback) {
  if (!PAGE_REGISTRY.some((p) => p.file === id)) {
    return { error: 'page not found', status: 404 };
  }
  const pages = await readPagesFromStore(store, fsFallback);
  const existing = pages[id];
  if (!existing) return { error: 'page not found', status: 404 };

  const updated = Object.assign({}, existing, {
    title: (payload.title != null ? String(payload.title) : existing.title).trim(),
    metaDescription: payload.metaDescription != null ? String(payload.metaDescription) : existing.metaDescription,
    ogTitle: payload.ogTitle != null ? String(payload.ogTitle) : existing.ogTitle,
    ogDescription: payload.ogDescription != null ? String(payload.ogDescription) : existing.ogDescription,
    ogType: payload.ogType != null ? String(payload.ogType) : existing.ogType,
    body: payload.body != null ? String(payload.body) : existing.body,
    scripts: payload.scripts != null ? String(payload.scripts) : existing.scripts,
    headExtra: payload.headExtra != null ? String(payload.headExtra) : existing.headExtra,
    updatedAt: new Date().toISOString()
  });

  pages[id] = updated;
  await store.setPages(pages);
  return { ok: true, page: updated, status: 200, pages };
}

async function writeSite(store, payload, fsFallback) {
  const current = await readSiteFromStore(store, fsFallback);
  const updated = Object.assign({}, current, payload, { updatedAt: new Date().toISOString() });
  await store.setSite(updated);
  return { ok: true, site: updated, status: 200 };
}

function renderManagedPage(page, posts, pageId) {
  const rendered = Object.assign({}, page);
  if (posts && pageId === 'biblioteca/pesquisas/index.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'pesquisa'));
  } else if (posts && pageId === 'equipamentos/index.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'equipamento'));
  } else if (posts && pageId === 'biblioteca/inspecoes/index.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- INSPECTION_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'inspecao'));
  }
  return buildHtmlFromPage(rendered);
}

module.exports = {
  PAGE_REGISTRY,
  DEFAULT_SITE,
  buildHtmlFromPage,
  injectPlaceholder,
  readPagesFromStore,
  readSiteFromStore,
  listPagesMeta,
  getPage,
  updatePage,
  writeSite,
  renderManagedPage
};
