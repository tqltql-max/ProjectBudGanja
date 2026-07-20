'use strict';

const { getCultivoForUser } = require('./cultivo-user-service.js');
const { getUserById } = require('./user-auth-service.js');
const { createPost } = require('./posts-service.js');
const { buildGrowMarkdown, growHasPublishableContent } = require('./cultivo-markdown.js');
const {
  insertCultivoSubmission,
  getCultivoSubmissionById,
  findActiveSubmissionForGrow,
  listCultivoSubmissionsByUser,
  listCultivoSubmissionsAdmin,
  updateCultivoSubmission
} = require('./db/cultivo-submissions-repos.js');

function newSubmissionId() {
  return 'sub' + Date.now() + Math.random().toString(36).slice(2, 6);
}

function findGrowInState(state, growId) {
  const logs = state && Array.isArray(state.growLogs) ? state.growLogs : [];
  return logs.find((item) => item.id === growId) || null;
}

async function submitGrowForPublication(store, userId, payload) {
  const growId = String(payload.growId || '').trim();
  if (!growId) return { ok: false, status: 400, error: 'growId em falta.' };

  const state = await getCultivoForUser(store, userId);
  const log = findGrowInState(state, growId);
  if (!log) return { ok: false, status: 404, error: 'Pesquisa não encontrada.' };

  if (!growHasPublishableContent(log, state)) {
    return {
      ok: false,
      status: 400,
      error: 'Adicione pelo menos um registo no diário ou um roteiro geral (mín. 20 caracteres) antes de submeter.'
    };
  }

  const existing = await store.findActiveCultivoSubmission(userId, growId);
  if (existing && existing.status === 'pending') {
    return { ok: false, status: 409, error: 'Já existe uma submissão em revisão para esta pesquisa.' };
  }
  if (existing && existing.status === 'approved') {
    return { ok: false, status: 409, error: 'Esta pesquisa já foi publicada.', postSlug: existing.postSlug };
  }

  const title = String(payload.title || log.name || 'Pesquisa').trim().slice(0, 120);
  const excerpt = String(payload.excerpt || '').trim().slice(0, 280)
    || ('Pesquisa de cultivo documentada no laboratório — ' + (log.species || log.name || 'diário de campo'));

  const contentMd = buildGrowMarkdown(log, state, { title });
  const now = new Date().toISOString();
  const submission = {
    id: newSubmissionId(),
    userId,
    growId,
    growName: log.name || '',
    status: 'pending',
    title,
    excerpt,
    contentMd,
    reviewerNote: '',
    postSlug: '',
    submittedAt: now,
    reviewedAt: null
  };

  await store.createCultivoSubmission(submission);
  return { ok: true, status: 201, submission: publicSubmissionView(submission) };
}

function publicSubmissionView(row, user) {
  if (!row) return null;
  const authorName = user && (user.profile && user.profile.displayName || user.name) || '';
  return {
    id: row.id,
    growId: row.growId,
    growName: row.growName,
    status: row.status,
    title: row.title,
    excerpt: row.excerpt,
    postSlug: row.postSlug || '',
    postUrl: row.postSlug ? '/posts/post-' + row.postSlug + '.html' : '',
    reviewerNote: row.status === 'rejected' ? (row.reviewerNote || '') : '',
    submittedAt: row.submittedAt,
    reviewedAt: row.reviewedAt,
    authorName: authorName || undefined
  };
}

async function listUserSubmissions(store, userId, growId) {
  const rows = await store.listCultivoSubmissionsByUser(userId, growId || null);
  return rows.map((row) => publicSubmissionView(row));
}

async function listAdminSubmissions(store, status) {
  const rows = await store.listCultivoSubmissionsAdmin(status || null);
  const out = [];
  for (const row of rows) {
    const user = await getUserById(store, row.userId);
    out.push(Object.assign(publicSubmissionView(row, user), {
      userId: row.userId,
      userEmail: user && user.email || ''
    }));
  }
  return out;
}

async function getSubmissionForAdmin(store, id) {
  const row = await store.getCultivoSubmissionById(id);
  if (!row) return null;
  const user = await getUserById(store, row.userId);
  return Object.assign(publicSubmissionView(row, user), {
    userId: row.userId,
    userEmail: user && user.email || '',
    contentMd: row.contentMd
  });
}

async function approveSubmission(store, id, payload, exportStaticFiles, triggerRebuild, root) {
  const row = await store.getCultivoSubmissionById(id);
  if (!row) return { ok: false, status: 404, error: 'Submissão não encontrada.' };
  if (row.status !== 'pending') return { ok: false, status: 409, error: 'Submissão já foi revista.' };

  const title = String((payload && payload.title) || row.title || row.growName).trim();
  const excerpt = String((payload && payload.excerpt) || row.excerpt || '').trim();
  const content = String((payload && payload.content) || row.contentMd || '').trim();
  const published = payload && payload.published === false ? false : true;

  if (!title || !content) {
    return { ok: false, status: 400, error: 'Título e conteúdo são obrigatórios.' };
  }

  const postResult = await createPost(store, {
    title,
    excerpt,
    content,
    format: 'markdown',
    category: 'pesquisa',
    series: 'pesquisa-comunidade',
    seriesLabel: 'Comunidade',
    published,
    coverImage: payload && payload.coverImage ? String(payload.coverImage).trim() : ''
  });

  if (!postResult.ok) {
    return { ok: false, status: postResult.status || 500, error: postResult.error || 'Não foi possível criar a publicação.' };
  }

  if (root && exportStaticFiles) {
    await exportStaticFiles(root, store);
  }
  if (triggerRebuild) await triggerRebuild();

  const now = new Date().toISOString();
  const updated = await store.updateCultivoSubmission(id, {
    status: 'approved',
    title,
    excerpt,
    contentMd: content,
    postSlug: postResult.slug,
    reviewedAt: now,
    reviewerNote: ''
  });

  return {
    ok: true,
    submission: publicSubmissionView(updated),
    post: { slug: postResult.slug, url: postResult.url }
  };
}

async function rejectSubmission(store, id, note) {
  const row = await store.getCultivoSubmissionById(id);
  if (!row) return { ok: false, status: 404, error: 'Submissão não encontrada.' };
  if (row.status !== 'pending') return { ok: false, status: 409, error: 'Submissão já foi revista.' };

  const now = new Date().toISOString();
  const updated = await store.updateCultivoSubmission(id, {
    status: 'rejected',
    reviewerNote: String(note || '').trim().slice(0, 500),
    reviewedAt: now
  });

  return { ok: true, submission: publicSubmissionView(updated) };
}

module.exports = {
  submitGrowForPublication,
  listUserSubmissions,
  listAdminSubmissions,
  getSubmissionForAdmin,
  approveSubmission,
  rejectSubmission,
  publicSubmissionView
};
