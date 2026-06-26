const fs = require('fs');
const path = require('path');

const PAGE_REGISTRY = [
  { file: 'index.html', label: 'Início' },
  { file: 'inspecoes.html', label: 'Inspeções' },
  { file: 'sobre.html', label: 'Sobre' },
  { file: 'contato.html', label: 'Contato' },
  { file: 'equipamentos.html', label: 'Equipamentos' },
  { file: 'pesquisas.html', label: 'Pesquisas' },
  { file: 'calculadoras.html', label: 'Calculadoras' },
  { file: 'luximetro.html', label: 'Luxímetro' },
  { file: 'manual-clonadora.html', label: 'Manual: Clonadora' },
  { file: 'manual-hidrocloradora.html', label: 'Manual: Hidrocloradora' },
  { file: 'pesquisa-substratos.html', label: 'Pesquisa: Substratos' }
];

const DEFAULT_SITE = {
  siteName: 'Inspetor BudGanja',
  footerText: '© 2026 Inspetor BudGanja. Conteúdo educacional.',
  nav: [
    { label: 'Inspeções', href: 'inspecoes.html' },
    { label: 'Pesquisas', href: 'pesquisas.html' },
    { label: 'Equipamentos', href: 'equipamentos.html' },
    { label: 'Calculadoras', href: 'calculadoras.html' },
    { label: 'Sobre', href: 'sobre.html' },
    { label: 'Contato', href: 'contato.html' }
  ]
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function createContentStore(root) {
  const contentDir = path.join(root, 'content');
  const pagesPath = path.join(contentDir, 'pages.json');
  const sitePath = path.join(contentDir, 'site.json');

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  function readPagesStore() {
    try {
      return JSON.parse(fs.readFileSync(pagesPath, 'utf8') || '{}');
    } catch (e) {
      return {};
    }
  }

  function writePagesStore(pages) {
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  }

  function readSite() {
    try {
      const data = JSON.parse(fs.readFileSync(sitePath, 'utf8') || '{}');
      return Object.assign({}, DEFAULT_SITE, data, {
        nav: data.nav || DEFAULT_SITE.nav
      });
    } catch (e) {
      return Object.assign({}, DEFAULT_SITE);
    }
  }

  function writeSite(site) {
    fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf8');
  }

  function extractPageFromHtml(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
    const ogType = html.match(/<meta\s+property="og:type"\s+content="([^"]*)"/i);
    const dataPage = html.match(/<body[^>]*\sdata-page="([^"]*)"/i);

    const headerMarker = '<div id="site-header"></div>';
    const footerMarker = '<div id="site-footer"></div>';
    const hi = html.indexOf(headerMarker);
    const fi = html.indexOf(footerMarker);
    let body = '';
    if (hi >= 0 && fi > hi) {
      body = html.slice(hi + headerMarker.length, fi).trim();
    }

    let scripts = '';
    const layoutScript = '<script src="js/layout.js"></script>';
    const li = html.indexOf(layoutScript);
    if (li >= 0) {
      const afterLayout = html.slice(li + layoutScript.length);
      const bodyEnd = afterLayout.indexOf('</body>');
      if (bodyEnd > 0) {
        scripts = afterLayout.slice(0, bodyEnd).trim();
      }
    }

    let headExtra = '';
    const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      let head = headMatch[1];
      head = head.replace(/<meta\s+charset="UTF-8"\s*\/?>/gi, '');
      head = head.replace(/<meta\s+name="description"[^>]*>/gi, '');
      head = head.replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '');
      head = head.replace(/<meta\s+name="theme-color"[^>]*>/gi, '');
      head = head.replace(/<meta\s+name="apple-mobile-web-app-capable"[^>]*>/gi, '');
      head = head.replace(/<meta\s+name="apple-mobile-web-app-status-bar-style"[^>]*>/gi, '');
      head = head.replace(/<meta\s+name="apple-mobile-web-app-title"[^>]*>/gi, '');
      head = head.replace(/<link rel="icon"[^>]*>/gi, '');
      head = head.replace(/<link rel="manifest"[^>]*>/gi, '');
      head = head.replace(/<link rel="stylesheet" href="style\.css"\s*\/?>/gi, '');
      head = head.replace(/<title>[\s\S]*?<\/title>/i, '');
      head = head.replace(/<meta\s+name="viewport"\s+content="width=device-width, initial-scale=1\.0"\s*\/?>/gi, '');
      headExtra = head.trim();
    }

    return {
      title: titleMatch ? titleMatch[1].trim() : '',
      metaDescription: metaDesc ? metaDesc[1] : '',
      ogTitle: ogTitle ? ogTitle[1] : '',
      ogDescription: ogDesc ? ogDesc[1] : '',
      ogType: ogType ? ogType[1] : 'website',
      dataPage: dataPage ? dataPage[1] : 'page',
      headExtra,
      body,
      scripts
    };
  }

  function buildHtmlFromPage(page) {
    const ogType = page.ogType || 'website';
    let scriptsBlock = page.scripts ? '\n    ' + page.scripts + '\n' : '';
    if (page.id === 'pesquisas.html' && !/posts\.js/.test(page.scripts || '')) {
      scriptsBlock += '\n    <script src="js/posts.js"></script>\n';
    }
    if (page.id === 'equipamentos.html' && !/posts\.js/.test(page.scripts || '')) {
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

  function writePageHtmlFile(page) {
    const html = buildHtmlFromPage(page);
    fs.writeFileSync(path.join(root, page.id), html, 'utf8');
  }

  function migratePagesIfNeeded() {
    if (fs.existsSync(pagesPath)) return;

    const pages = {};
    for (const entry of PAGE_REGISTRY) {
      const fp = path.join(root, entry.file);
      if (!fs.existsSync(fp)) continue;
      const extracted = extractPageFromHtml(fp);
      pages[entry.file] = Object.assign({
        id: entry.file,
        label: entry.label,
        updatedAt: new Date().toISOString()
      }, extracted);
    }
    writePagesStore(pages);
  }

  function migrateSiteIfNeeded() {
    if (fs.existsSync(sitePath)) return;
    writeSite(DEFAULT_SITE);
  }

  function listPagesMeta() {
    const pages = readPagesStore();
    return PAGE_REGISTRY
      .filter((entry) => pages[entry.file])
      .map((entry) => {
        const p = pages[entry.file];
        return {
          id: entry.file,
          label: entry.label,
          title: p.title,
          updatedAt: p.updatedAt
        };
      });
  }

  function getPage(id) {
    const pages = readPagesStore();
    return pages[id] || null;
  }

  function updatePage(id, payload) {
    if (!PAGE_REGISTRY.some((p) => p.file === id)) {
      return { error: 'page not found', status: 404 };
    }

    const pages = readPagesStore();
    const existing = pages[id];
    if (!existing) {
      return { error: 'page not found', status: 404 };
    }

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
    writePagesStore(pages);
    writePageHtmlFile(updated);
    return { ok: true, page: updated, status: 200 };
  }

  function isManagedPage(filename) {
    return PAGE_REGISTRY.some((p) => p.file === filename);
  }

  function renderManagedPage(filename, bodyTransform) {
    const page = getPage(filename);
    if (!page) return null;
    const rendered = Object.assign({}, page);
    if (bodyTransform) {
      rendered.body = bodyTransform(rendered.body || '');
    }
    return buildHtmlFromPage(rendered);
  }

  migratePagesIfNeeded();
  migrateSiteIfNeeded();

  return {
    PAGE_REGISTRY,
    readSite,
    writeSite,
    listPagesMeta,
    getPage,
    updatePage,
    isManagedPage,
    renderManagedPage,
    buildHtmlFromPage
  };
}

module.exports = { createContentStore, PAGE_REGISTRY, DEFAULT_SITE };
