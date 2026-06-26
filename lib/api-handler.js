const fs = require('fs');
const path = require('path');
const {
  normalizePosts,
  getPublicPosts,
  toPublicFeedItem,
  buildPostHtml,
  createPost,
  updatePost,
  deletePost
} = require('./posts-service.js');
const {
  getSession,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  checkCredentials
} = require('./auth-service.js');
const {
  readSiteFromStore,
  listPagesMeta,
  getPage,
  updatePage,
  writeSite,
  renderManagedPage,
  injectPlaceholder,
  buildHtmlFromPage,
  PAGE_REGISTRY
} = require('./content-service.js');
const { buildPostsCardsHtml } = require('./posts-service.js');

const MAX_BODY_BYTES = 2 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 6 * 1024 * 1024;

async function triggerRebuild() {
  const hook = process.env.NETLIFY_BUILD_HOOK || process.env.BUILD_HOOK_URL;
  if (!hook) return;
  try {
    await fetch(hook, { method: 'POST' });
  } catch (e) { /* ignore */ }
}

function jsonResponse(status, obj, extraHeaders) {
  return {
    status,
    headers: Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {}),
    body: JSON.stringify(obj)
  };
}

function parseBody(raw, isBase64) {
  if (!raw) return '';
  if (isBase64) return Buffer.from(raw, 'base64').toString('utf8');
  return raw;
}

async function exportStaticFiles(root, store) {
  if (!root) return;
  const posts = normalizePosts(await store.getPosts());
  await store.setPosts(posts);

  const feed = getPublicPosts(posts).map(toPublicFeedItem);
  fs.writeFileSync(path.join(root, 'posts-public.json'), JSON.stringify(feed, null, 2), 'utf8');

  for (const post of posts) {
    if (post.published === false) continue;
    fs.writeFileSync(path.join(root, post.filename), buildPostHtml(post), 'utf8');
  }

  const pages = await store.getPages();
  if (pages) {
    for (const entry of PAGE_REGISTRY) {
      const page = pages[entry.file];
      if (!page) continue;
      let body = page.body || '';
      if (entry.file === 'pesquisas.html') {
        body = injectPlaceholder(body, '<!-- POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'pesquisa'));
      } else if (entry.file === 'equipamentos.html') {
        body = injectPlaceholder(body, '<!-- EQUIPMENT_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'equipamento'));
      } else if (entry.file === 'inspecoes.html') {
        body = injectPlaceholder(body, '<!-- INSPECTION_POSTS_PLACEHOLDER -->', buildPostsCardsHtml(posts, 'inspecao'));
      }
      page.body = body;
      fs.writeFileSync(path.join(root, entry.file), buildHtmlFromPage(page), 'utf8');
    }
    fs.writeFileSync(path.join(root, 'content', 'pages.json'), JSON.stringify(pages, null, 2), 'utf8');
  }

  const site = await store.getSite();
  if (site) {
    fs.writeFileSync(path.join(root, 'content', 'site.json'), JSON.stringify(site, null, 2), 'utf8');
  }
}

async function handleApiRequest(req, options) {
  const store = options.store;
  const root = options.root || null;
  const fsFallback = options.fsFallback || root;
  const method = (req.method || 'GET').toUpperCase();
  const url = req.path || '/';
  const headers = req.headers || {};
  const cookie = headers.cookie || headers.Cookie || '';

  let bodyRaw = '';
  try {
    bodyRaw = parseBody(req.body, req.isBase64Encoded);
    const maxBody = url === '/api/upload' ? MAX_UPLOAD_BYTES : MAX_BODY_BYTES;
    if (bodyRaw.length > maxBody) {
      return jsonResponse(413, { error: url === '/api/upload' ? 'imagem muito grande (máx. ~4 MB)' : 'body too large' });
    }
  } catch (e) {
    return jsonResponse(400, { error: 'invalid body' });
  }

  if (url === '/api/login' && method === 'POST') {
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const username = String(payload.username || '').trim();
      const password = String(payload.password || '');
      if (checkCredentials(username, password)) {
        const token = await createSession(store, username);
        return jsonResponse(200, { ok: true, username }, {
          'Set-Cookie': setSessionCookie(headers, token)
        });
      }
      return jsonResponse(401, { error: 'Credenciais inválidas' });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/logout' && method === 'POST') {
    const session = await getSession(store, cookie);
    await destroySession(store, session && session.token);
    return jsonResponse(200, { ok: true }, { 'Set-Cookie': clearSessionCookie(headers) });
  }

  if (url === '/api/me' && method === 'GET') {
    const session = await getSession(store, cookie);
    if (!session) return jsonResponse(401, { authenticated: false });
    return jsonResponse(200, { authenticated: true, username: session.username });
  }

  if (url === '/api/posts' && method === 'GET') {
    const queryStr = (req.query || '');
    const categoryParam = queryStr ? new URLSearchParams(queryStr).get('category') : null;
    const posts = normalizePosts(await store.getPosts());
    const session = await getSession(store, cookie);
    if (session) return jsonResponse(200, posts);
    const list = getPublicPosts(posts, categoryParam || null).map(toPublicFeedItem);
    return jsonResponse(200, list);
  }

  if (url === '/api/posts' && method === 'POST') {
    const session = await getSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await createPost(store, payload);
      if (result.ok && root) await exportStaticFiles(root, store);
      if (result.ok) await triggerRebuild();
      return jsonResponse(result.status || 500, result.ok ? { ok: true, url: result.url, slug: result.slug } : { error: result.error });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  const postMatch = url.match(/^\/api\/posts\/([^/]+)$/);
  if (postMatch) {
    const slug = decodeURIComponent(postMatch[1]);
    if (method === 'GET') {
      const posts = normalizePosts(await store.getPosts());
      const post = posts.find((p) => p.slug === slug);
      if (!post || post.published === false) {
        const session = await getSession(store, cookie);
        if (!session) return jsonResponse(404, { error: 'post not found' });
      }
      const found = posts.find((p) => p.slug === slug);
      if (!found) return jsonResponse(404, { error: 'post not found' });
      const session = await getSession(store, cookie);
      if (!session && found.published === false) return jsonResponse(404, { error: 'post not found' });
      return jsonResponse(200, found);
    }
    if (method === 'PUT') {
      const session = await getSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      try {
        const payload = JSON.parse(bodyRaw || '{}');
        const result = await updatePost(store, slug, payload);
        if (result.ok && root) await exportStaticFiles(root, store);
        if (result.ok) await triggerRebuild();
        return jsonResponse(result.status || 500, result.ok ? { ok: true, url: result.url, slug: result.slug } : { error: result.error });
      } catch (e) {
        return jsonResponse(400, { error: 'invalid payload' });
      }
    }
    if (method === 'DELETE') {
      const session = await getSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      const result = await deletePost(store, slug);
      if (result.ok && root) await exportStaticFiles(root, store);
      if (result.ok) await triggerRebuild();
      return jsonResponse(result.status || 500, result.ok ? { ok: true } : { error: result.error });
    }
    return jsonResponse(405, { error: 'method not allowed' });
  }

  if (url === '/api/upload' && method === 'POST') {
    const session = await getSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const filename = String(payload.filename || 'image').replace(/[^a-zA-Z0-9\-_.]/g, '_');
      let data = String(payload.data || '');
      if (!data) return jsonResponse(400, { error: 'filename and data required' });
      const m = data.match(/^data:(.+);base64,(.+)$/);
      const b64 = m ? m[2] : data;
      const buf = Buffer.from(b64, 'base64');
      if (buf.length > 5 * 1024 * 1024) return jsonResponse(413, { error: 'file too large' });
      const ext = path.extname(filename) || '.png';
      const base = path.basename(filename, ext);
      const uniqueName = base + '-' + Date.now() + ext;
      const publicUrl = await store.saveUpload(uniqueName, buf);
      return jsonResponse(201, { url: publicUrl });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/site' && method === 'GET') {
    const site = await readSiteFromStore(store, fsFallback);
    return jsonResponse(200, site);
  }

  if (url === '/api/site' && method === 'PUT') {
    const session = await getSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await writeSite(store, payload, fsFallback);
      if (result.ok && root) await exportStaticFiles(root, store);
      if (result.ok) await triggerRebuild();
      return jsonResponse(200, { ok: true, site: result.site });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/pages' && method === 'GET') {
    const session = await getSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const meta = await listPagesMeta(store, fsFallback);
    return jsonResponse(200, meta);
  }

  const pageMatch = url.match(/^\/api\/pages\/([^/]+)$/);
  if (pageMatch) {
    const pageId = decodeURIComponent(pageMatch[1]);
    if (method === 'GET') {
      const session = await getSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      const page = await getPage(store, pageId, fsFallback);
      if (!page) return jsonResponse(404, { error: 'page not found' });
      return jsonResponse(200, page);
    }
    if (method === 'PUT') {
      const session = await getSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      try {
        const payload = JSON.parse(bodyRaw || '{}');
        const result = await updatePage(store, pageId, payload, fsFallback);
        if (result.ok && root) {
          const posts = normalizePosts(await store.getPosts());
          const html = buildHtmlFromPage(result.page);
          if (pageId === 'pesquisas.html' || pageId === 'equipamentos.html' || pageId === 'inspecoes.html') {
            const rendered = renderManagedPage(result.page, posts, pageId);
            fs.writeFileSync(path.join(root, pageId), rendered, 'utf8');
          } else {
            fs.writeFileSync(path.join(root, pageId), html, 'utf8');
          }
          await exportStaticFiles(root, store);
        }
        if (result.ok) await triggerRebuild();
        return jsonResponse(result.status || 500, result.ok ? { ok: true, page: result.page } : { error: result.error });
      } catch (e) {
        return jsonResponse(400, { error: 'invalid payload' });
      }
    }
    return jsonResponse(405, { error: 'method not allowed' });
  }

  return jsonResponse(404, { error: 'not found' });
}

module.exports = { handleApiRequest, exportStaticFiles, triggerRebuild };
