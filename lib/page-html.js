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
  const v = assetVersion ? '?v=' + assetVersion : '';
  // PNG/ICO primeiro (Google ≥48px); SVG por último para não ganhar à aba com arte antiga em cache.
  return `    <link rel="icon" href="/imagens/icon-192.png${v}" sizes="192x192" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.png${v}" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-32.png${v}" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png${v}" sizes="16x16" type="image/png">
    <link rel="shortcut icon" href="/favicon.ico${v}" sizes="any">
    <link rel="icon" href="/favicon.svg${v}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png${v}">
    <link rel="manifest" href="/manifest.json">`;
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
  if (pageId === 'loja/index.html' && !/loja-data\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/loja-data.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'loja/index.html' && !/loja\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/loja.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'loja/index.html' && !/site-features\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/site-features.js?v=' + assetVersion + '"></script>\n';
  }
  if (pageId === 'loja/index.html' && !/loja-order-ui\.js/.test(scriptsBlock)) {
    scriptsBlock += '\n    <script src="/js/loja-order-ui.js?v=' + assetVersion + '"></script>\n';
  }
  const lojaOrderPages = new Set([
    'equipamentos/index.html',
    'equipamentos/clonadora-6-estacas.html',
    'equipamentos/clonadora-12-estacas.html'
  ]);
  if (lojaOrderPages.has(pageId)) {
    if (!/loja-data\.js/.test(scriptsBlock)) {
      scriptsBlock += '\n    <script src="/js/loja-data.js?v=' + assetVersion + '"></script>\n';
    }
    if (!/loja-order-ui\.js/.test(scriptsBlock)) {
      scriptsBlock += '\n    <script src="/js/loja-order-ui.js?v=' + assetVersion + '"></script>\n';
    }
    if (!/loja-order-callout\.js/.test(scriptsBlock)) {
      scriptsBlock += '\n    <script src="/js/loja-order-callout.js?v=' + assetVersion + '"></script>\n';
    }
    if (!/equip-loja-materials\.js/.test(scriptsBlock)) {
      scriptsBlock += '\n    <script src="/js/equip-loja-materials.js?v=' + assetVersion + '"></script>\n';
    }
  }
  return scriptsBlock;
}

function buildHtmlFromPage(page) {
  const assetVersion = readAssetVersion();
  const ogType = page.ogType || 'website';
  const scriptsBlock = normalizePageScripts(page.scripts, page.id);
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
    <meta property="og:image" content="${escapeAttr(page.ogImage || '/imagens/icon-512.png')}">
${buildIconHeadLinks(assetVersion)}
    <meta name="theme-color" content="#3d5c28">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
    <link rel="stylesheet" href="/css/style.css?v=${assetVersion}">
${headExtraBlock}    <title>${escapeHtml(page.title || '')}</title>
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
