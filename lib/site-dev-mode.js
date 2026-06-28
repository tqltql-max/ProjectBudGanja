'use strict';

const fs = require('fs');
const path = require('path');
const { applySecurityHeaders } = require('./security-headers.js');

const DEV_PAGE = 'em-desenvolvimento.html';

const PUBLIC_HTML = new Set([
  'em-desenvolvimento.html',
  'login.html',
  'entrar.html'
]);

const PUBLIC_API = new Set([
  '/api/login',
  '/api/logout',
  '/api/me'
]);

const PUBLIC_STATIC_PREFIXES = [
  '/css/',
  '/js/',
  '/imagens/',
  '/favicon.svg',
  '/manifest.json',
  '/robots.txt'
];

function isDevModeEnabled() {
  const raw = String(process.env.SITE_DEV_MODE || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

function isPublicStaticPath(urlPath) {
  if (PUBLIC_STATIC_PREFIXES.some(function (prefix) { return urlPath === prefix || urlPath.startsWith(prefix); })) {
    return true;
  }
  return urlPath === '/version.json' || urlPath === '/sw.js';
}

function isPublicHtml(pageFile) {
  return PUBLIC_HTML.has(String(pageFile || '').replace(/\\/g, '/').toLowerCase());
}

function isPublicApi(url) {
  if (PUBLIC_API.has(url)) return true;
  if (String(url || '').startsWith('/api/auth/')) return true;
  return false;
}

function shouldBlockForDevMode(req, url, pageFile, isAdmin) {
  if (!isDevModeEnabled() || isAdmin) return false;
  if (url.startsWith('/api/')) return !isPublicApi(url);
  if (pageFile.endsWith('.html') || pageFile === 'index.html' || !path.extname(pageFile)) {
    return !isPublicHtml(pageFile);
  }
  return !isPublicStaticPath(url);
}

function serveDevModePage(res, req, root) {
  const filePath = path.join(root, DEV_PAGE);
  let html = '';
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Em desenvolvimento</title></head><body><h1>Site em desenvolvimento</h1><p>Volte em breve.</p></body></html>';
  }

  applySecurityHeaders(res, req && req.headers, { noStore: true, noIndex: true });
  res.writeHead(503, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Retry-After': '3600'
  });
  res.end(html);
}

function serveDevModeApi(res, req) {
  applySecurityHeaders(res, req && req.headers);
  res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    error: 'Site em desenvolvimento. Volte em breve.',
    devMode: true
  }));
}

module.exports = {
  DEV_PAGE,
  isDevModeEnabled,
  isPublicStaticPath,
  isPublicHtml,
  isPublicApi,
  shouldBlockForDevMode,
  serveDevModePage,
  serveDevModeApi
};
