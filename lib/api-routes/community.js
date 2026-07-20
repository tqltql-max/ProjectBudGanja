'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const { getUserSession } = require('../user-auth-service.js');
const {
  getCommunityFeed,
  shareCommunityPost,
  sharePlantIdPost,
  hideCommunityPost,
  listPostComments,
  addPostComment,
  hideCommunityComment,
  listAdminCommunityPosts,
  acceptUserCommunityTerms
} = require('../community-service.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw } = ctx;
  const query = ctx.req.query ? new URLSearchParams(ctx.req.query) : new URLSearchParams();

  if (url === '/api/community/feed' && method === 'GET') {
    const cursor = query.get('cursor') || '';
    const limit = query.get('limit') || '20';
    const kind = query.get('kind') || '';
    const feed = await getCommunityFeed(store, { cursor, limit, kind });
    return jsonResponse(200, { ok: true, items: feed.items, nextCursor: feed.nextCursor });
  }

  if (url === '/api/user/community-terms' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const result = await acceptUserCommunityTerms(store, session.userId);
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, {
      ok: true,
      user: result.user,
      termsVersion: result.termsVersion
    });
  }

  if (url === '/api/community/my-shares' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const shares = await store.listCommunityPostsByUser(session.userId);
    return jsonResponse(200, { ok: true, shares });
  }

  if (url === '/api/community/share' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    try {
      const result = await shareCommunityPost(store, session.userId, payload);
      if (!result.ok) {
        return jsonResponse(result.status || 400, {
          error: result.error,
          code: result.code || undefined
        });
      }
      return jsonResponse(result.status || 201, {
        ok: true,
        post: result.post,
        reused: !!result.reused
      });
    } catch (e) {
      console.error('[community/share]', e && e.stack ? e.stack : e);
      const detail = e && e.message ? String(e.message).slice(0, 160) : '';
      return jsonResponse(500, {
        error: detail
          ? ('Não foi possível publicar (' + detail + ').')
          : 'Não foi possível publicar. Tente de novo.'
      });
    }
  }

  if (url === '/api/community/plant-id' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    try {
      const result = await sharePlantIdPost(store, session.userId, payload);
      if (!result.ok) {
        return jsonResponse(result.status || 400, {
          error: result.error,
          code: result.code || undefined
        });
      }
      return jsonResponse(result.status || 201, {
        ok: true,
        post: result.post
      });
    } catch (e) {
      console.error('[community/plant-id]', e && e.stack ? e.stack : e);
      return jsonResponse(500, { error: 'Não foi possível publicar o pedido.' });
    }
  }

  const deleteMatch = url.match(/^\/api\/community\/posts\/([^/]+)$/);
  if (deleteMatch && method === 'DELETE') {
    const session = await getUserSession(store, cookie);
    const admin = await getAdminSession(store, cookie);
    if (!session && !admin) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(deleteMatch[1]);
    const result = await hideCommunityPost(store, id, {
      userId: session && session.userId,
      isAdmin: !!admin
    });
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, { ok: true });
  }

  const commentsMatch = url.match(/^\/api\/community\/posts\/([^/]+)\/comments$/);
  if (commentsMatch && method === 'GET') {
    const id = decodeURIComponent(commentsMatch[1]);
    const result = await listPostComments(store, id);
    if (!result.ok) return jsonResponse(result.status || 404, { error: result.error });
    return jsonResponse(200, { ok: true, comments: result.comments });
  }

  if (commentsMatch && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const id = decodeURIComponent(commentsMatch[1]);
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await addPostComment(store, session.userId, id, payload);
      if (!result.ok) {
        return jsonResponse(result.status || 400, {
          error: result.error,
          code: result.code || undefined
        });
      }
      return jsonResponse(result.status || 201, { ok: true, comment: result.comment });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/admin/community/posts' && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const posts = await listAdminCommunityPosts(store, query.get('limit') || 50);
    return jsonResponse(200, { ok: true, posts });
  }

  const hidePostMatch = url.match(/^\/api\/admin\/community\/posts\/([^/]+)\/hide$/);
  if (hidePostMatch && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(hidePostMatch[1]);
    const result = await hideCommunityPost(store, id, { isAdmin: true });
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, { ok: true });
  }

  const hideCommentMatch = url.match(/^\/api\/admin\/community\/comments\/([^/]+)\/hide$/);
  if (hideCommentMatch && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(hideCommentMatch[1]);
    const result = await hideCommunityComment(store, id);
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, { ok: true });
  }

  return null;
}

module.exports = { match };
