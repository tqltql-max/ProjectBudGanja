const { PAGE_REGISTRY, DEFAULT_SITE } = require('../_content.js');
const { escapeHtml, escapeAttr } = require('./utils.js');
const { buildPostsCardsHtml } = require('./posts-service.js');

function buildHtmlFromPage(page) {
  const ogType = page.ogType || 'website';
  let scriptsBlock = page.scripts ? '\n    ' + page.scripts + '\n' : '';
  if (page.id === 'pesquisas.html' && !/posts\.js/.test(page.scripts || '')) {
    scriptsBlock += '\n    <script src="js/posts.js"></script>\n';
  }
  if (page.id === 'equipamentos.html' && !/posts\.js/.test(page.scripts || '')) {
    scriptsBlock += '\n    <script src="js/posts.js"></script>\n';
  }
  if (page.id === 'inspecoes.html' && !/posts\.js/.test(page.scripts || '')) {
    scriptsBlock += '\n    <script src="js/posts.js"></script>\n';
  }
  const headExtraBlock = page.headExtra ? '    ' + page.headExtra + '\n' : '';
  const hasCustomViewport = page.headExtra && /name="viewport"/i.test(page.headExtra);
  const viewportMeta = hasCustomViewport
    ? ''
    : '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
${viewportMeta}    <meta name="description" content="${escapeAttr(page.metaDescription || '')}">
    <meta property="og:title" content="${escapeAttr(page.ogTitle || page.title || '')}">
    <meta property="og:description" content="${escapeAttr(page.ogDescription || page.metaDescription || '')}">
    <meta property="og:type" content="${escapeAttr(ogType)}">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#27ae60">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
${headExtraBlock}    <link rel="stylesheet" href="style.css">
    <title>${escapeHtml(page.title || '')}</title>
</head>
<body data-page="${escapeAttr(page.dataPage || 'page')}">
    <div id="site-header"></div>

    ${page.body || ''}

    <div id="site-footer"></div>
    <script src="js/layout.js"></script>${scriptsBlock}
</body>
</html>`;
}

function injectPlaceholder(body, placeholder, cards) {
  if (body.includes(placeholder)) return body.replace(placeholder, cards);
  return body;
}

async function readSiteFromStore(store, fsFallback) {
  let site = await store.getSite();
  if (!site && fsFallback) {
    try {
      site = JSON.parse(require('fs').readFileSync(require('path').join(fsFallback, 'content', 'site.json'), 'utf8'));
    } catch (e) { /* ignore */ }
  }
  return Object.assign({}, DEFAULT_SITE, site || {}, {
    nav: (site && site.nav) || DEFAULT_SITE.nav
  });
}

async function readPagesFromStore(store, fsFallback) {
  let pages = await store.getPages();
  if (!pages && fsFallback) {
    try {
      pages = JSON.parse(require('fs').readFileSync(require('path').join(fsFallback, 'content', 'pages.json'), 'utf8'));
    } catch (e) { /* ignore */ }
  }
  return pages || {};
}

async function listPagesMeta(store, fsFallback) {
  const pages = await readPagesFromStore(store, fsFallback);
  return PAGE_REGISTRY
    .filter((entry) => pages[entry.file])
    .map((entry) => {
      const p = pages[entry.file];
      return { id: entry.file, label: entry.label, title: p.title, updatedAt: p.updatedAt };
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
  const updated = {
    siteName: payload.siteName != null ? String(payload.siteName).trim() : current.siteName,
    footerText: payload.footerText != null ? String(payload.footerText).trim() : current.footerText,
    nav: Array.isArray(payload.nav)
      ? payload.nav.map((item) => ({
        label: String(item.label || '').trim(),
        href: String(item.href || '').trim()
      })).filter((item) => item.label && item.href)
      : current.nav
  };
  await store.setSite(updated);
  return { ok: true, site: updated, status: 200 };
}

function renderManagedPage(page, posts, filename) {
  const rendered = Object.assign({}, page);
  if (filename === 'pesquisas.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'pesquisa'));
  } else if (filename === 'equipamentos.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'equipamento'));
  } else if (filename === 'inspecoes.html') {
    rendered.body = injectPlaceholder(rendered.body || '', '<!-- INSPECTION_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'inspecao'));
  }
  return buildHtmlFromPage(rendered);
}

module.exports = {
  PAGE_REGISTRY,
  DEFAULT_SITE,
  buildHtmlFromPage,
  readSiteFromStore,
  readPagesFromStore,
  listPagesMeta,
  getPage,
  updatePage,
  writeSite,
  renderManagedPage,
  injectPlaceholder
};
