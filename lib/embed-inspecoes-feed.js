'use strict';

const fs = require('fs');
const path = require('path');

function readInspecoesFeedItems(root) {
  try {
    const all = JSON.parse(fs.readFileSync(path.join(root, 'posts-public.json'), 'utf8') || '[]');
    return all.filter((p) => p.category === 'inspecao');
  } catch (e) {
    return [];
  }
}

function injectInspecoesFeedInHtml(html, items) {
  const json = JSON.stringify(items || []).replace(/</g, '\\u003c');
  const script =
    '<script type="application/json" id="inspecoes-initial-feed">' + json + '</script>';
  if (html.includes('id="inspecoes-initial-feed"')) {
    return html.replace(
      /<script type="application\/json" id="inspecoes-initial-feed">[\s\S]*?<\/script>/,
      script
    );
  }
  if (html.includes('</main>')) {
    return html.replace('</main>', '        ' + script + '\n    </main>');
  }
  return html;
}

function embedInspecoesFeedInPage(root, items) {
  const file = path.join(root, 'biblioteca/inspecoes/index.html');
  if (!fs.existsSync(file)) return false;
  const html = injectInspecoesFeedInHtml(fs.readFileSync(file, 'utf8'), items);
  fs.writeFileSync(file, html, 'utf8');
  return true;
}

function embedInspecoesFeedInPagesJson(root, items) {
  const pagesPath = path.join(root, 'content', 'pages.json');
  if (!fs.existsSync(pagesPath)) return false;
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8') || '{}');
  const key = 'biblioteca/inspecoes/index.html';
  if (!pages[key]) return false;
  pages[key].body = injectInspecoesFeedInHtml(pages[key].body, items);
  pages[key].updatedAt = new Date().toISOString();
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  return true;
}

module.exports = {
  readInspecoesFeedItems,
  injectInspecoesFeedInHtml,
  embedInspecoesFeedInPage,
  embedInspecoesFeedInPagesJson
};
