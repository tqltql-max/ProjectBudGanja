'use strict';

const { jsonResponse, redirectResponse } = require('./_helpers.js');
const { mergeGuiaInspecoesPosts } = require('../merge-guia-inspecoes.js');
const {
  getPublicPosts,
  toPublicFeedItem,
  createPost,
  updatePost,
  deletePost
} = require('../posts-service.js');
const { getAdminSession } = require('../admin-access.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, root, exportStaticFiles, triggerRebuild } = ctx;

  if (url === '/api/posts' && method === 'GET') {
    const queryStr = ctx.req.query || '';
    const categoryParam = queryStr ? new URLSearchParams(queryStr).get('category') : null;
    const posts = mergeGuiaInspecoesPosts(await store.getPosts());
    const session = await getAdminSession(store, cookie);
    if (session) {
      // Admin sees full records (incl. drafts), but category=? must still filter —
      // otherwise hubs like /biblioteca/pesquisas/ mix inspeções into pesquisas.
      let adminList = posts;
      if (categoryParam) {
        adminList = adminList.filter((p) => (p.category || 'pesquisa') === categoryParam);
      }
      return jsonResponse(200, adminList);
    }
    const list = getPublicPosts(posts, categoryParam || null).map(toPublicFeedItem);
    return jsonResponse(200, list);
  }

  if (url === '/api/posts' && method === 'POST') {
    const session = await getAdminSession(store, cookie);
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
      const posts = mergeGuiaInspecoesPosts(await store.getPosts());
      const post = posts.find((p) => p.slug === slug);
      if (!post || post.published === false) {
        const session = await getAdminSession(store, cookie);
        if (!session) return jsonResponse(404, { error: 'post not found' });
      }
      const found = posts.find((p) => p.slug === slug);
      if (!found) return jsonResponse(404, { error: 'post not found' });
      const session = await getAdminSession(store, cookie);
      if (!session && found.published === false) return jsonResponse(404, { error: 'post not found' });
      return jsonResponse(200, found);
    }
    if (method === 'PUT') {
      const session = await getAdminSession(store, cookie);
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
      const session = await getAdminSession(store, cookie);
      if (!session) return jsonResponse(401, { error: 'authentication required' });
      const result = await deletePost(store, slug);
      if (result.ok && root) await exportStaticFiles(root, store);
      if (result.ok) await triggerRebuild();
      return jsonResponse(result.status || 500, result.ok ? { ok: true } : { error: result.error });
    }
    return jsonResponse(405, { error: 'method not allowed' });
  }

  return null;
}

module.exports = { match };
