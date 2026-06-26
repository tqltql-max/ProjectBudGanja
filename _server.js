const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { createContentStore } = require('./_content.js');
const { renderMarkdown } = require('./_markdown.js');
const { publishStaticAssets } = require('./_publish.js');
const { createFsStore } = require('./lib/store-fs.js');
const { handleApiRequest } = require('./lib/api-handler.js');
const { buildPostHtml } = require('./lib/posts-service.js');
const { parseCookies } = require('./lib/utils.js');
const { SESSION_COOKIE } = require('./lib/auth-service.js');

const ROOT = path.resolve(__dirname);
const contentStore = createContentStore(ROOT);
const fsStore = createFsStore(ROOT);
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

const SESSIONS_FILE = path.join(ROOT, 'content', 'sessions.json');
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
  if (['.js', '.css'].includes(ext)) return 'public, max-age=31536000, immutable';
  if (['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico'].includes(ext)) return 'public, max-age=31536000, immutable';
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
    const normalized = posts.map((p) => {
      const np = Object.assign({}, p);
      np.title = String(np.title || '').trim();
      np.excerpt = np.excerpt || '';
      np.content_raw = np.content_raw || '';
      np.format = np.format || 'markdown';
      np.date = np.date || new Date().toISOString();
      if (np.published === undefined) np.published = true;
      if (!np.category) np.category = 'pesquisa';
      if (!np.slug) np.slug = slugify(np.title || (np.filename || 'post').replace(/^post-|-\.html$/g, ''));
      if (!np.filename) {
        if (np.url && String(np.url).startsWith('/')) np.filename = String(np.url).slice(1);
        else if (np.url) np.filename = String(np.url);
        else np.filename = `post-${np.slug}.html`;
      }
      np.url = np.filename;
      return np;
    });
    if (JSON.stringify(posts) !== JSON.stringify(normalized)) writePosts(normalized);
    normalized.forEach((p) => {
      const fp = path.join(ROOT, p.filename);
      if (fs.existsSync(fp)) writePostFile(fp, p);
    });
  } catch (e) { /* ignore */ }
}

normalizePostsOnStartup();
try { publishStaticAssets(ROOT); } catch (e) { /* ignore */ }

function isAuthenticatedSync(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[SESSION_COOKIE];
  if (!token) return false;
  try {
    const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8') || '{}');
    const session = data[token];
    return !!(session && session.expiresAt > Date.now());
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
  res.writeHead(302, { Location: location });
  res.end();
}

function setSecurityHeaders(res) {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https://i.ytimg.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-src https://www.youtube-nocookie.com https://www.youtube.com");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
}

function buildPostCardHtml(p) {
  const title = escapeHtml(p.title || '');
  const excerpt = escapeHtml(p.excerpt || '');
  const date = escapeHtml(formatDatePtBR(p.date));
  const href = escapeHtml(p.url || p.filename || '#');
  const cover = p.coverImage
    ? `<img src="${escapeHtml(p.coverImage)}" alt="" class="post-card-cover" loading="lazy">`
    : '';
  return `<div class="card post-card"><a href="${href}" style="text-decoration:none;color:inherit;">${cover}<h3>${title}</h3><p>${excerpt}</p><span class="post-card-date">${date}</span></a></div>`;
}

function buildPostsCardsHtml(category) {
  const posts = category ? getPublicPosts(category) : getPublicPosts();
  if (!posts.length) {
    return '<p class="empty-message">Nenhuma publicação ainda.</p>';
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
  if (filename === 'pesquisas.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- POSTS_PLACEHOLDER -->', 'pesquisa');
  } else if (filename === 'equipamentos.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', 'equipamento');
  } else if (filename === 'inspecoes.html') {
    transform = (body) => injectPostsPlaceholder(body, '<!-- INSPECTION_POSTS_PLACEHOLDER -->', 'inspecao');
  }

  const html = contentStore.renderManagedPage(filename, transform);
  if (!html) return false;

  setSecurityHeaders(res);
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
    setSecurityHeaders(res);

    const lastModified = stats.mtime.toUTCString();
    const etag = `${stats.size}-${Date.parse(stats.mtime)}`;
    if (req.headers['if-none-match'] === etag || req.headers['if-modified-since'] === lastModified) {
      res.writeHead(304);
      res.end();
      return;
    }

    res.setHeader('Cache-Control', getCacheControl(ext));
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
  try {
    const raw = req.url.split('?')[0] || '/';
    const url = decodeURIComponent(raw);

    if (url.startsWith('/api/')) {
      const queryStr = (req.url.split('?')[1] || '');
      const sendApi = (body) => handleApiRequest({
        method: req.method,
        path: url,
        headers: req.headers,
        body: body || '',
        query: queryStr
      }, { store: fsStore, root: ROOT, fsFallback: ROOT }).then((response) => {
        setSecurityHeaders(res);
        Object.entries(response.headers || {}).forEach(([k, v]) => res.setHeader(k, v));
        res.writeHead(response.status);
        res.end(response.body);
      }).catch(() => {
        setSecurityHeaders(res);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'server error' }));
      });

      if (req.method === 'GET' || req.method === 'DELETE' || req.method === 'HEAD') {
        return sendApi('');
      }
      return collectBody(req, url === '/api/upload' ? MAX_UPLOAD_BYTES : MAX_BODY_BYTES).then(sendApi).catch(() => {
        setSecurityHeaders(res);
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'body too large' }));
      });
    }

    let staticPath = url;
    if (staticPath === '/') staticPath = '/index.html';

    if (staticPath === '/admin.html' && !isAuthenticatedSync(req)) {
      return resRedirect(res, '/login.html');
    }

    const pageFile = staticPath.startsWith('/') ? staticPath.slice(1) : staticPath;
    if (contentStore.isManagedPage(pageFile)) {
      if (!serveManagedHtml(res, pageFile)) {
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
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
  console.log('Admin login: http://localhost:' + PORT + '/login.html');
});
