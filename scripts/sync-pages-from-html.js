const fs = require('fs');
const path = require('path');
const { PAGE_REGISTRY } = require('../lib/content-store.js');
const { sanitizeHeadExtra } = require('../lib/page-html.js');
const { ROOT } = require('../lib/paths.js');

const root = ROOT;
const pagesPath = path.join(root, 'content', 'pages.json');

let pages = {};
if (fs.existsSync(pagesPath)) {
  pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8') || '{}');
}

function extractScriptsAfterLayout(html) {
  const layoutRe = /<script\s+src="(?:\/)?js\/layout\.js(?:\?v=[^"]*)?"><\/script>/i;
  const layoutMatch = html.match(layoutRe);
  if (!layoutMatch) return '';
  const afterLayout = html.slice(html.indexOf(layoutMatch[0]) + layoutMatch[0].length);
  const bodyEnd = afterLayout.indexOf('</body>');
  return bodyEnd > 0 ? afterLayout.slice(0, bodyEnd).trim() : '';
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

  let headExtra = '';
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    headExtra = sanitizeHeadExtra(headMatch[1]);
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
    scripts: extractScriptsAfterLayout(html)
  };
}

const registryFiles = new Set(PAGE_REGISTRY.map((e) => e.file));
const synced = {};

for (const entry of PAGE_REGISTRY) {
  const fp = path.join(root, entry.file);
  if (!fs.existsSync(fp)) {
    console.warn('Skip (ficheiro em falta):', entry.file);
    continue;
  }
  const extracted = extractPageFromHtml(fp);
  const existing = pages[entry.file] || { id: entry.file, label: entry.label };
  synced[entry.file] = Object.assign({}, existing, extracted, {
    id: entry.file,
    label: entry.label,
    updatedAt: new Date().toISOString()
  });
  console.log('Synced', entry.file);
}

if (!fs.existsSync(path.dirname(pagesPath))) {
  fs.mkdirSync(path.dirname(pagesPath), { recursive: true });
}
fs.writeFileSync(pagesPath, JSON.stringify(synced, null, 2), 'utf8');
console.log('pages.json updated (' + Object.keys(synced).length + ' paginas)');
