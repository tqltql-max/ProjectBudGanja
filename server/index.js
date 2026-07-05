require('../lib/load-env.js');
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { createContentStore } = require('../lib/content-store.js');
const { renderMarkdown } = require('../lib/markdown-render.js');
const { publishStaticAssets } = require('../lib/publish-static.js');
const { createAppStore } = require('../lib/create-store.js');
const { handleApiRequest } = require('../lib/api-handler.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
const { buildEmptyStateHtml } = require('../lib/empty-state.js');
const { applySecurityHeaders } = require('../lib/security-headers.js');
const { hasAdminAccess } = require('../lib/admin-access.js');
const { isBlockedStaticPath, isProtectedHtml } = require('../lib/static-security.js');
const {
  isDevModeEnabled,
  shouldBlockForDevMode,
  serveDevModePage,
  serveDevModeApi
} = require('../lib/site-dev-mode.js');
const { auditStartupSecurity } = require('../lib/startup-security.js');
const { ROOT } = require('../lib/paths.js');
const contentStore = createContentStore(ROOT);
let appStore = null;
const PORT = process.env.PORT || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json'
};

const MAX_BODY_BYTES = 2 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 6 * 1024 * 1024;

const POSTS_META = path.join(ROOT, 'posts.json');
const UPLOADS_DIR = path.join(ROOT, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  try { fs.mkdirSync(UPLOADS_DIR); } catch (e) { /* ignore */ }
}

function isCompressible(ext) {
  return ['.html', '.js', '.css', '.json', '.svg', '.txt', '.webmanifest'].includes(ext);
}

function getCacheControl(ext) {
  if (ext === '.html') return 'no-cache';
  if (['.js', '.css', '.json', '.webmanifest'].includes(ext)) return 'no-cache';
  if (['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico'].includes(ext)) return 'public, max-age=86400';
  return 'public, max-age=3600';
}

function readPosts() {
  try { return JSON.parse(fs.readFileSync(POSTS_META, 'utf8') || '[]'); } catch (e) { return []; }
}

function writePosts(posts) {
  fs.writeFileSync(POSTS_META, JSON.stringify(posts, null, 2), 'utf8');
  try { publishStaticAssets(ROOT); } catch (e) { /* ignore */ }
}

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function slugify(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';
}

function uniqueSlug(title, posts) {
  let base = slugify(title);
  let slug = base;
  let n = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = base + '-' + n;
    n += 1;
  }
  return slug;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function processContent(content, format) {
  if (format === 'markdown') return renderMarkdown(content);
  return content;
}

function writePostFile(filepath, post) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, buildPostHtml(post), 'utf8');
}

function getPublicPosts(category) {
  let posts = readPosts().filter((p) => p.published !== false);
  if (category) {
    posts = posts.filter((p) => (p.category || 'pesquisa') === category);
  }
  return posts;
}

function normalizePostsOnStartup() {
  try {
    const posts = readPosts() || [];
    const normalized = normalizePosts(posts);
    if (JSON.stringify(posts) !== JSON.stringify(normalized)) writePosts(normalized);
    normalized.forEach((p) => {
      const fp = path.join(ROOT, p.filename);
      if (fs.existsSync(fp)) writePostFile(fp, p);
    });
  } catch (e) { /* ignore */ }
}

normalizePostsOnStartup();
try { publishStaticAssets(ROOT); } catch (e) { /* ignore */ }

async function isAdminAuthenticated(req) {
  if (!appStore) return false;
  try {
    return await hasAdminAccess(appStore, req.headers.cookie);
  } catch (e) {
    return false;
  }
}

function collectBody(req, maxBytes) {
  const limit = maxBytes || MAX_BODY_BYTES;
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      body += chunk.toString();
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function resRedirect(res, location) {
  res.writeHead(302, { Location: location, 'Cache-Control': 'no-store' });
  res.end();
}

function legacyRedirectFor(staticPath) {
  if (staticPath === '/calculadoras.html') return '/calculadoras/';
  if (staticPath === '/luximetro.html') return '/calculadoras/luximetro.html';
  if (staticPath === '/equipamentos.html') return '/equipamentos/';
  if (staticPath === '/manual-clonadora.html') return '/equipamentos/manual-clonadora.html';
  if (staticPath === '/manual-hidrocloradora.html') return '/equipamentos/manual-hidrocloradora.html';
  if (staticPath === '/pesquisas.html') return '/biblioteca/pesquisas/';
  if (staticPath === '/inspecoes.html') return '/biblioteca/inspecoes/';
  if (staticPath === '/pesquisa-substratos.html') return '/biblioteca/pesquisas/substratos.html';
  if (staticPath === '/guia-cultivo-basico.html') return '/guia/cultivo-basico.html';
  if (staticPath === '/sorteios.html') return '/sorteios/';
  if (staticPath === '/videos.html') return '/videos/';
  if (staticPath === '/sobre.html') return '/info/sobre.html';
  if (staticPath === '/contato.html') return '/info/contato.html';
  if (staticPath === '/privacidade.html') return '/info/privacidade.html';
  const postMatch = staticPath.match(/^\/(post-[^/]+\.html)$/i);
  if (postMatch) return '/posts/' + postMatch[1];
  return null;
}

function setSecurityHeaders(res, req, options) {
  applySecurityHeaders(res, req && req.headers, options);
}

function buildPostCardHtml(p) {
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(p.coverImage)}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  return `<div class="card post-card" data-post-slug="${escapeHtml(p.slug || '')}"><a href="${href}" style="text-decoration:none;color:inherit;">${cover}<h3>${title}</h3><p>${excerpt}</p><span class="post-card-date">${date}</span></a></div>`;
}

function buildPostsCardsHtml(category) {
  const posts = category ? getPublicPosts(category) : getPublicPosts();
  if (!posts.length) {
    return buildEmptyStateHtml(category);
  }
  return posts.map(buildPostCardHtml).join('');
}

function injectPostsPlaceholder(body, placeholder, category) {
  const cards = buildPostsCardsHtml(category);
  if (body.includes(placeholder)) {
    return body.replace(placeholder, cards);
  }
  return body;
}

function serveManagedHtml(res, filename) {
  let transform = null;
  if (filename === 'biblioteca/pesquisas/index.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- POSTS_PLACEHOLDER -->', 'pesquisa');
  } else if (filename === 'equipamentos/index.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', 'equipamento');
  } else if (filename === 'biblioteca/inspecoes/index.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- INSPECTION_POSTS_PLACEHOLDER -->', 'inspecao');
  }

  const html = contentStore.renderManagedPage(filename, transform);
  if (!html) return false;

  setSecurityHeaders(res, null);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.end(html);
  return true;
}

function serveStatic(req, res, staticPath) {
  const requested = path.normalize(path.join(ROOT, staticPath));
  const rootSep = ROOT.endsWith(path.sep) ? ROOT : ROOT + path.sep;
  if (!(requested === ROOT || requested.startsWith(rootSep))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(requested, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(requested).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    const pageName = path.relative(ROOT, requested).replace(/\\/g, '/');
    const headerOpts = isProtectedHtml(pageName) ? { noStore: true, noIndex: true } : null;
    setSecurityHeaders(res, req, headerOpts);

    const lastModified = stats.mtime.toUTCString();
    const etag = `${stats.size}-${Date.parse(stats.mtime)}`;
    if (req.headers['if-none-match'] === etag || req.headers['if-modified-since'] === lastModified) {
      res.writeHead(304);
      res.end();
      return;
    }

    const neverCache = pageName === 'sw.js'
      || pageName === 'version.json'
      || pageName === 'manifest.json'
      || pageName === 'js/app-version-check.js';
    res.setHeader('Cache-Control', (headerOpts || neverCache) ? 'no-store, no-cache, must-revalidate' : getCacheControl(ext));
    res.setHeader('Last-Modified', lastModified);
    res.setHeader('ETag', etag);
    res.setHeader('Content-Type', contentType);

    const accept = req.headers['accept-encoding'] || '';
    const stream = fs.createReadStream(requested);

    if (/\bgzip\b/.test(accept) && isCompressible(ext)) {
      res.setHeader('Content-Encoding', 'gzip');
      stream.pipe(zlib.createGzip()).pipe(res);
    } else {
      res.setHeader('Content-Length', stats.size);
      stream.pipe(res);
    }

    stream.on('error', () => {
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    });
  });
}

const server = http.createServer((req, res) => {
  (async () => {
  try {
    const raw = req.url.split('?')[0] || '/';
    const url = decodeURIComponent(raw);
    const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().split(':')[0];
    if (host === 'www.inspetorbudganja.com.br') {
      const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      return resRedirect(res, 'https://inspetorbudganja.com.br' + url + qs);
    }

    if (url.startsWith('/api/')) {
      const isAdmin = await isAdminAuthenticated(req);
      if (shouldBlockForDevMode(req, url, '', isAdmin)) {
        return serveDevModeApi(res, req);
      }
      const queryStr = (req.url.split('?')[1] || '');
      const sendApi = (body) => handleApiRequest({
        method: req.method,
        path: url,
        headers: req.headers,
        body: body || '',
        query: queryStr
      }, { store: appStore, root: ROOT, fsFallback: ROOT }).then((response) => {
        setSecurityHeaders(res, req);
        Object.entries(response.headers || {}).forEach(([k, v]) => res.setHeader(k, v));
        (response.setCookies || []).forEach((c) => res.appendHeader('Set-Cookie', c));
        res.writeHead(response.status);
        res.end(response.body);
      }).catch(() => {
        setSecurityHeaders(res, req);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'server error' }));
      });

      if (req.method === 'GET' || req.method === 'DELETE' || req.method === 'HEAD') {
        return sendApi('');
      }
      return collectBody(req, (url === '/api/upload' || url === '/api/admin/update-icons') ? MAX_UPLOAD_BYTES : MAX_BODY_BYTES).then(sendApi).catch(() => {
        setSecurityHeaders(res, req);
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'body too large' }));
      });
    }

    let staticPath = url;
    if (staticPath === '/') staticPath = '/index.html';
    if (staticPath === '/calculadoras') staticPath = '/calculadoras/';
    if (staticPath === '/equipamentos') staticPath = '/equipamentos/';
    if (staticPath === '/sorteios') staticPath = '/sorteios/';
    if (staticPath === '/videos') staticPath = '/videos/';
    if (staticPath === '/biblioteca/pesquisas') staticPath = '/biblioteca/pesquisas/';
    if (staticPath === '/biblioteca/inspecoes') staticPath = '/biblioteca/inspecoes/';
    if (staticPath.endsWith('/')) staticPath += 'index.html';

    const legacyLocation = legacyRedirectFor(url);
    if (legacyLocation) {
      return resRedirect(res, legacyLocation);
    }

    const pageFile = staticPath.startsWith('/') ? staticPath.slice(1) : staticPath;

    const isAdmin = await isAdminAuthenticated(req);
    if (shouldBlockForDevMode(req, url, pageFile, isAdmin)) {
      return serveDevModePage(res, req, ROOT);
    }

    if (isProtectedHtml(pageFile) && !isAdmin) {
      const returnTo = encodeURIComponent(staticPath);
      return resRedirect(res, '/login.html?returnTo=' + returnTo);
    }

    if (isBlockedStaticPath(pageFile)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    if (contentStore.isManagedPage(pageFile)) {
      if (!serveManagedHtml(res, pageFile)) {
        const staticFile = path.join(ROOT, pageFile);
        if (fs.existsSync(staticFile)) {
          serveStatic(req, res, staticPath);
          return;
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      return;
    }

    serveStatic(req, res, staticPath);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
  })();
});

createAppStore({ root: ROOT, netlify: false }).then((store) => {
  appStore = store;
  const backend = store.backend || process.env.STORE_BACKEND || 'sql';
  server.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
    console.log('Admin login: http://localhost:' + PORT + '/login.html');
    console.log('Store backend:', backend);
    if (isDevModeEnabled()) {
      console.log('Modo desenvolvimento ATIVO — visitantes veem tela em construção (admin autenticado passa).');
      console.log('Desative com SITE_DEV_MODE=0 no .env');
    }
    auditStartupSecurity();
  });
}).catch((err) => {
  console.error('Failed to initialize store:', err);
  process.exit(1);
});
