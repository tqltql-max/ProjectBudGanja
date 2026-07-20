'use strict';

const crypto = require('crypto');
const { getCultivoForUser } = require('./cultivo-user-service.js');
const {
  getUserById,
  publicUserView,
  COMMUNITY_TERMS_VERSION,
  userHasAcceptedCommunityTerms,
  acceptCommunityTerms
} = require('./user-auth-service.js');

const MAX_CAPTION = 500;
const MAX_COMMENT = 1000;
const COMMENT_RATE_WINDOW_MS = 60 * 1000;
const COMMENT_RATE_MAX = 8;
const PLANT_ID_RATE_WINDOW_MS = 60 * 60 * 1000;
const PLANT_ID_RATE_MAX = 8;
const commentRateMap = new Map();
const plantIdRateMap = new Map();
const KIND_DIARY = 'diary';
const KIND_PLANT_ID = 'plant_id';

function newId(prefix) {
  return prefix + Date.now().toString(36) + crypto.randomBytes(4).toString('hex');
}

function isPhotoUrl(url) {
  const u = String(url || '').trim();
  if (!u.startsWith('/uploads/')) return false;
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(u)) return false;
  return true;
}

function idsMatch(a, b) {
  const x = String(a || '').trim();
  const y = String(b || '').trim();
  if (!x || !y) return false;
  if (x === y) return true;
  return x.slice(0, 24) === y.slice(0, 24);
}

function findGrowAndEntry(state, growId, entryId) {
  const logs = state && Array.isArray(state.growLogs) ? state.growLogs : [];
  const grow = logs.find((item) => idsMatch(item.id, growId)) || null;
  if (!grow) return { grow: null, entry: null };
  const entries = Array.isArray(grow.entries) ? grow.entries : [];
  const entry = entries.find((item) => idsMatch(item.id, entryId)) || null;
  return { grow, entry };
}

function entryHasPhoto(entry, photoUrl) {
  const photos = Array.isArray(entry && entry.photos) ? entry.photos : [];
  const target = String(photoUrl || '').trim();
  return photos.some((p) => {
    const url = typeof p === 'string' ? p : (p && (p.url || p.src)) || '';
    return String(url).trim() === target;
  });
}

function publicPostView(post) {
  if (!post) return null;
  const kind = post.kind === KIND_PLANT_ID ? KIND_PLANT_ID : KIND_DIARY;
  return {
    id: post.id,
    photoUrl: post.photoUrl,
    caption: post.caption || '',
    phase: post.phase || '',
    helpRequest: !!post.helpRequest,
    kind: kind,
    createdAt: post.createdAt,
    commentCount: post.commentCount != null ? Number(post.commentCount) : 0,
    author: {
      name: post.authorName || 'Cultivador',
      username: post.authorUsername || '',
      picture: post.authorPicture || ''
    }
  };
}

function photoOwnedByUser(photoUrl, userId) {
  const uid = String(userId || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  if (!uid) return false;
  return String(photoUrl || '').startsWith('/uploads/cultivo-' + uid + '-');
}

function checkPlantIdRate(userId) {
  const now = Date.now();
  const key = String(userId);
  let bucket = plantIdRateMap.get(key);
  if (!bucket || now - bucket.start > PLANT_ID_RATE_WINDOW_MS) {
    bucket = { start: now, count: 0 };
  }
  bucket.count += 1;
  plantIdRateMap.set(key, bucket);
  return bucket.count <= PLANT_ID_RATE_MAX;
}

function publicCommentView(comment) {
  if (!comment) return null;
  return {
    id: comment.id,
    body: comment.body || '',
    createdAt: comment.createdAt,
    author: {
      name: comment.authorName || 'Cultivador',
      username: comment.authorUsername || '',
      picture: comment.authorPicture || ''
    }
  };
}

function checkCommentRate(userId) {
  const now = Date.now();
  const key = String(userId);
  let bucket = commentRateMap.get(key);
  if (!bucket || now - bucket.start > COMMENT_RATE_WINDOW_MS) {
    bucket = { start: now, count: 0 };
  }
  bucket.count += 1;
  commentRateMap.set(key, bucket);
  return bucket.count <= COMMENT_RATE_MAX;
}

async function requireTerms(store, userId) {
  let user = await getUserById(store, userId);
  if (!user) return { ok: false, status: 401, error: 'authentication required' };
  // Termos já fazem parte do cadastro/login — sincroniza na conta sem pedir de novo na UI.
  if (!userHasAcceptedCommunityTerms(user)) {
    try {
      user = await acceptCommunityTerms(store, userId);
    } catch (e) {
      return { ok: false, status: 500, error: 'Não foi possível actualizar os termos da conta.' };
    }
    if (!user) return { ok: false, status: 404, error: 'utilizador não encontrado' };
  }
  return { ok: true, user };
}

async function getCommunityFeed(store, options) {
  const result = await store.listCommunityFeed(options || {});
  return {
    items: (result.items || []).map(publicPostView),
    nextCursor: result.nextCursor || null
  };
}

async function shareCommunityPost(store, userId, payload) {
  const terms = await requireTerms(store, userId);
  if (!terms.ok) return terms;

  const growId = String(payload && payload.growId || '').trim();
  const entryId = String(payload && payload.entryId || '').trim();
  const photoUrl = String(payload && payload.photoUrl || '').trim();
  const caption = String(payload && payload.caption || '').trim().slice(0, MAX_CAPTION);
  const helpRequest = !!(payload && payload.helpRequest);

  if (!growId || !entryId || !photoUrl) {
    return { ok: false, status: 400, error: 'growId, entryId e photoUrl são obrigatórios.' };
  }
  if (!isPhotoUrl(photoUrl)) {
    return { ok: false, status: 400, error: 'Apenas fotos do diário podem ser partilhadas.' };
  }

  const state = await getCultivoForUser(store, userId);
  const { grow, entry } = findGrowAndEntry(state, growId, entryId);
  if (!grow || !entry) {
    return { ok: false, status: 404, error: 'Registo não encontrado.' };
  }
  if (!entryHasPhoto(entry, photoUrl)) {
    return { ok: false, status: 400, error: 'A foto não pertence a este registo.' };
  }

  const existing = await store.findCommunityPostByEntryPhoto(entryId, photoUrl);
  if (existing) {
    if (existing.status === 'hidden') {
      await store.setCommunityPostStatus(existing.id, 'published');
      const refreshed = await store.getCommunityPostById(existing.id);
      return { ok: true, status: 200, post: publicPostView(refreshed), reused: true };
    }
    return { ok: true, status: 200, post: publicPostView(existing), reused: true };
  }

  const now = new Date().toISOString();
  const post = {
    id: newId('cp'),
    userId,
    growId,
    entryId,
    photoUrl,
    caption: caption || String(entry.text || '').trim().slice(0, MAX_CAPTION),
    phase: String(grow.phase || state.phase || '').trim().slice(0, 40),
    helpRequest,
    kind: KIND_DIARY,
    status: 'published',
    createdAt: now,
    updatedAt: now
  };
  await store.insertCommunityPost(post);
  const saved = await store.getCommunityPostById(post.id);
  return { ok: true, status: 201, post: publicPostView(saved || post) };
}

async function sharePlantIdPost(store, userId, payload) {
  const terms = await requireTerms(store, userId);
  if (!terms.ok) return terms;
  if (!checkPlantIdRate(userId)) {
    return { ok: false, status: 429, error: 'Demasiados pedidos de identificação. Aguarde um pouco.' };
  }

  const photoUrl = String(payload && payload.photoUrl || '').trim();
  const caption = String(payload && payload.caption || '').trim().slice(0, MAX_CAPTION);

  if (!photoUrl) {
    return { ok: false, status: 400, error: 'Envie uma foto da planta.' };
  }
  if (!isPhotoUrl(photoUrl)) {
    return { ok: false, status: 400, error: 'Apenas fotos são aceites (sem vídeo).' };
  }
  if (!photoOwnedByUser(photoUrl, userId)) {
    return { ok: false, status: 400, error: 'A foto tem de ser enviada na sua sessão actual.' };
  }

  const now = new Date().toISOString();
  const post = {
    id: newId('cp'),
    userId,
    growId: '',
    entryId: '',
    photoUrl,
    caption: caption || 'Que planta é essa?',
    phase: 'identificacao',
    helpRequest: true,
    kind: KIND_PLANT_ID,
    status: 'published',
    createdAt: now,
    updatedAt: now
  };
  await store.insertCommunityPost(post);
  const saved = await store.getCommunityPostById(post.id);
  return { ok: true, status: 201, post: publicPostView(saved || post) };
}

async function hideCommunityPost(store, postId, actor) {
  const post = await store.getCommunityPostById(postId);
  if (!post) return { ok: false, status: 404, error: 'Publicação não encontrada.' };
  const isAuthor = actor && actor.userId && actor.userId === post.userId;
  const isAdmin = !!(actor && actor.isAdmin);
  if (!isAuthor && !isAdmin) {
    return { ok: false, status: 403, error: 'Sem permissão.' };
  }
  await store.setCommunityPostStatus(postId, 'hidden');
  return { ok: true };
}

async function listPostComments(store, postId) {
  const post = await store.getCommunityPostById(postId);
  if (!post || post.status !== 'published') {
    return { ok: false, status: 404, error: 'Publicação não encontrada.' };
  }
  const comments = await store.listCommunityComments(postId);
  return { ok: true, comments: comments.map(publicCommentView) };
}

async function addPostComment(store, userId, postId, payload) {
  const terms = await requireTerms(store, userId);
  if (!terms.ok) return terms;
  if (!checkCommentRate(userId)) {
    return { ok: false, status: 429, error: 'Demasiados comentários. Aguarde um minuto.' };
  }
  const post = await store.getCommunityPostById(postId);
  if (!post || post.status !== 'published') {
    return { ok: false, status: 404, error: 'Publicação não encontrada.' };
  }
  const body = String(payload && payload.body || '').trim().slice(0, MAX_COMMENT);
  if (body.length < 2) {
    return { ok: false, status: 400, error: 'Comentário demasiado curto.' };
  }
  const comment = {
    id: newId('cc'),
    postId,
    userId,
    body,
    status: 'published',
    createdAt: new Date().toISOString()
  };
  await store.insertCommunityComment(comment);
  const user = terms.user;
  const view = publicUserView(user);
  return {
    ok: true,
    status: 201,
    comment: {
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt,
      author: {
        name: (view && view.profile && view.profile.displayName) || view.name || 'Cultivador',
        username: (view && view.username) || '',
        picture: (view && view.picture) || ''
      }
    }
  };
}

async function hideCommunityComment(store, commentId) {
  const comment = await store.getCommunityCommentById(commentId);
  if (!comment) return { ok: false, status: 404, error: 'Comentário não encontrado.' };
  await store.setCommunityCommentStatus(commentId, 'hidden');
  return { ok: true };
}

async function listAdminCommunityPosts(store, limit) {
  const rows = await store.listCommunityPostsAdmin(limit);
  return rows.map((post) => Object.assign(publicPostView(post), {
    status: post.status,
    userId: post.userId,
    entryId: post.entryId,
    growId: post.growId
  }));
}

async function acceptUserCommunityTerms(store, userId) {
  const user = await acceptCommunityTerms(store, userId);
  if (!user) return { ok: false, status: 404, error: 'utilizador não encontrado' };
  return { ok: true, user: publicUserView(user), termsVersion: COMMUNITY_TERMS_VERSION };
}

module.exports = {
  COMMUNITY_TERMS_VERSION,
  MAX_CAPTION,
  MAX_COMMENT,
  KIND_DIARY,
  KIND_PLANT_ID,
  getCommunityFeed,
  shareCommunityPost,
  sharePlantIdPost,
  hideCommunityPost,
  listPostComments,
  addPostComment,
  hideCommunityComment,
  listAdminCommunityPosts,
  acceptUserCommunityTerms,
  userHasAcceptedCommunityTerms
};
