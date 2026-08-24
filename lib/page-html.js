const { escapeHtml, escapeAttr } = require('./utils.js');

function readAssetVersion() {
  const modPath = require.resolve('./asset-version.js');
  delete require.cache[modPath];
  return require('./asset-version.js').ASSET_VERSION;
}

function sanitizeHeadExtra(head) {
  if (!head) return '';
  let cleaned = head;
  cleaned = cleaned.replace(/<meta\s+charset="UTF-8"\s*\/?>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="viewport"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="description"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="theme-color"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="apple-mobile-web-app-capable"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="apple-mobile-web-app-status-bar-style"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<meta\s+name="apple-mobile-web-app-title"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link\s+rel="(?:icon|shortcut icon)"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link\s+rel="apple-touch-icon"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link\s+rel="manifest"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<link\s+rel="stylesheet"[^>]*>/gi, '');
  cleaned = cleaned.replace(/<title>[\s\S]*?<\/title>/gi, '');
  cleaned = cleaned.replace(/<script>\(function\(\)\{var t=localStorage[^<]*<\/script>/gi, '');
  return cleaned.trim();
}

function buildIconHeadLinks(assetVersion) {
  const v = String(assetVersion || '').trim();
  // URLs com .v{N}. no nome — Cloudflare ainda serve /imagens/icon-192.png antigo (oval verde, immutable).
  return `    <link rel="icon" href="/imagens/favicon-32.v${v}.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.v${v}.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.v${v}.png" sizes="16x16" type="image/png">
    <link rel="icon" href="/imagens/icon-192.v${v}.png" sizes="192x192" type="image/png">
    <link rel="shortcut icon" href="/favicon.v${v}.ico" sizes="any">
    <link rel="icon" href="/favicon.v${v}.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${v}.png">
    <link rel="manifest" href="/manifest.json?v=${v}">`;
}

function normalizePageScripts(scripts, pageId) {
  const assetVersion = readAssetVersion();
  let scriptsBlock = scripts ? '\n    ' + scripts + '\n' : '';
  scriptsBlock = scriptsBlock
    .replace(/src="js\//g, 'src="/js/')
    .replace(/href="css\//g, 'href="/css/')
    .replace(/((?:src|href)=")(\/(?:js|css)\/[^"?#]+\.(?:js|css))(?:\?v=[^"#]*)?(")/g,
      (m, pre, asset, post) => pre + asset + '?v=' + assetVersion + post);

  if (pageId === 'index.html' && !/home\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/home.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'biblioteca/pesquisas/index.html' && !/posts\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/posts.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'equipamentos/index.html' && !/posts\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/posts.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'biblioteca/inspecoes/index.html' && !/posts\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/posts.js?v=' + assetVersion + '"></script>\n';
  }
  return scriptsBlock;
}

function siteBaseUrl() {
  return String(process.env.SITE_URL || process.env.URL || 'https://inspetorbudganja.com.br').replace(/\/$/, '');
}

function pageOgImage(page) {
  if (page && page.ogImage) return page.ogImage;
  const id = String((page && page.id) || '');
  const dataPage = String((page && page.dataPage) || '');
  if (dataPage === 'vida' || id === 'vida/index.html' || id === 'index.html') {
    return '/imagens/vida/equipe.jpg';
  }
  if (id === 'guia/astrologia.html' || dataPage === 'guia-astrologia') {
    return '/imagens/inspecoes/astrologia-cover.jpg';
  }
  return '/imagens/og-default.jpg';
}

/** WhatsApp/Facebook exigem URL absoluta HTTPS; evita o hero PNG (~10MB). */
function absoluteOgImage(value) {
  const raw = String(value || '').trim();
  const fallback = '/imagens/og-default.jpg';
  let path = raw || fallback;
  // Hero completo é demasiado pesado para previews de partilha.
  if (/\/imagens\/background-hero\.(png|svg|jpg|jpeg|webp|avif)/i.test(path)) {
    path = fallback;
  }
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('//')) return 'https:' + path;
  if (!path.startsWith('/')) path = '/' + path;
  return siteBaseUrl() + path;
}

function pageCanonicalUrl(page) {
  const id = String((page && page.id) || '').replace(/\\/g, '/');
  if (!id || id === 'index.html') return siteBaseUrl() + '/';
  let urlPath = '/' + id.replace(/\.html$/i, '');
  if (urlPath.endsWith('/index')) urlPath = urlPath.slice(0, -'/index'.length) + '/';
  else if (!urlPath.endsWith('/')) {
    // ficheiros .html soltos mantêm .html no canonical público quando aplicável
    if (/\.html$/i.test(id) && !/\/index\.html$/i.test(id)) {
      urlPath = '/' + id;
    }
  }
  return siteBaseUrl() + urlPath;
}

function extraPageStylesheets(page, assetVersion) {
  const id = String((page && page.id) || '');
  const dataPage = String((page && page.dataPage) || '');
  const links = [];
  if (dataPage === 'cadernos-engenharia' || id === 'biblioteca/cadernos/index.html') {
    links.push(
      `    <link rel="stylesheet" href="/css/pages/cadernos-engenharia.css?v=${assetVersion}">`
    );
  }
  return links.length ? links.join('\n') + '\n' : '';
}

function buildHtmlFromPage(page) {
  const assetVersion = readAssetVersion();
  const ogType = page.ogType || 'website';
  const scriptsBlock = normalizePageScripts(page.scripts, page.id);
  const headExtraBlock = page.headExtra ? '    ' + page.headExtra + '\n' : '';
  const pageCssBlock = extraPageStylesheets(page, assetVersion);
  const hasCustomViewport = page.headExtra && /name="viewport"/i.test(page.headExtra);
  const viewportMeta = hasCustomViewport
    ? ''
    : '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';

  const ogTitle = page.ogTitle || page.title || '';
  const ogDescription = page.ogDescription || page.metaDescription || '';
  const ogImageAbs = absoluteOgImage(pageOgImage(page));
  const ogUrl = pageCanonicalUrl(page);
  const ogMime = /\.png(?:$|[?#])/i.test(ogImageAbs)
    ? 'image/png'
    : /\.webp(?:$|[?#])/i.test(ogImageAbs)
      ? 'image/webp'
      : 'image/jpeg';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
${viewportMeta}    <meta name="description" content="${escapeAttr(page.metaDescription || '')}">
    <meta property="og:title" content="${escapeAttr(ogTitle)}">
    <meta property="og:description" content="${escapeAttr(ogDescription)}">
    <meta property="og:type" content="${escapeAttr(ogType)}">
    <meta property="og:url" content="${escapeAttr(ogUrl)}">
    <meta property="og:image" content="${escapeAttr(ogImageAbs)}">
    <meta property="og:image:secure_url" content="${escapeAttr(ogImageAbs)}">
    <meta property="og:image:type" content="${escapeAttr(ogMime)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(ogTitle)}">
    <meta name="twitter:description" content="${escapeAttr(ogDescription)}">
    <meta name="twitter:image" content="${escapeAttr(ogImageAbs)}">
    <link rel="canonical" href="${escapeAttr(ogUrl)}">
${buildIconHeadLinks(assetVersion)}
    <meta name="theme-color" content="#0a2230">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
    <link rel="stylesheet" href="/css/style.css?v=${assetVersion}">
${pageCssBlock}${headExtraBlock}    <title>${escapeHtml(page.title || '')}</title>
</head>
<body data-page="${escapeAttr(page.dataPage || 'page')}">
    <div id="site-header"></div>

    ${page.body || ''}

    <div id="site-footer"></div>
    <script src="/js/i18n-data.js?v=${assetVersion}"></script>
    <script src="/js/i18n.js?v=${assetVersion}"></script>
    <script src="/js/ferramentas-nav-data.js?v=${assetVersion}"></script>
    <script src="/js/layout.js?v=${assetVersion}"></script>${scriptsBlock}
</body>
</html>`;
}

module.exports = { sanitizeHeadExtra, buildIconHeadLinks, buildHtmlFromPage, normalizePageScripts };
