'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const { buildChannelCatalogFromUrl, parseChannelInput } = require('../youtube-channel-catalog.js');
const {
  buildChannelInspectionPost,
  postSlugFromChannelSlug,
  seriesIdFromSlug
} = require('../channel-inspecao-from-catalog.js');
const { createPost, updatePost, normalizePosts } = require('../posts-service.js');

async function nextSeriesSortOrder(store) {
  const all = await store.getSeriesOptions();
  let max = 10;
  all.forEach((s) => {
    const n = Number(s.sortOrder) || 0;
    if (n > max) max = n;
  });
  return max + 1;
}

async function ensureCanalSeries(store, seriesId, seriesLabel, sortOrder) {
  const all = await store.getSeriesOptions();
  const exists = all.some((s) => s.id === seriesId);
  if (exists) return;
  await store.upsertSeriesOption({
    id: seriesId,
    label: seriesLabel,
    category: 'inspecao',
    sortOrder: sortOrder != null ? sortOrder : 20
  });
}

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, root, exportStaticFiles, triggerRebuild } = ctx;

  if (url !== '/api/admin/inspecoes/from-channel' || method !== 'POST') return null;

  const session = await getAdminSession(store, cookie);
  if (!session) return jsonResponse(401, { error: 'authentication required' });

  let payload;
  try {
    payload = JSON.parse(bodyRaw || '{}');
  } catch (e) {
    return jsonResponse(400, { error: 'invalid payload' });
  }

  const sourceUrl = String(payload.url || '').trim();
  const publish = payload.publish === true;
  const parsed = parseChannelInput(sourceUrl);
  if (parsed.error) return jsonResponse(400, { error: parsed.error });

  try {
    const { catalog, slug } = await buildChannelCatalogFromUrl(sourceUrl);
    const seriesOrder = await nextSeriesSortOrder(store);
    const draft = buildChannelInspectionPost(catalog, {
      slug,
      seriesOrder,
      published: publish
    });

    await ensureCanalSeries(store, draft.series, draft.seriesLabel, seriesOrder);

    const posts = normalizePosts(await store.getPosts());
    const existing = posts.find((p) => p.slug === draft.slug);
    let result;
    if (existing) {
      result = await updatePost(store, draft.slug, {
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content_raw,
        format: 'markdown',
        published: publish,
        coverImage: draft.coverImage,
        category: 'inspecao',
        series: draft.series,
        seriesLabel: draft.seriesLabel,
        seriesOrder: draft.seriesOrder,
        videoId: draft.videoId || ''
      });
    } else {
      result = await createPost(store, {
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content_raw,
        format: 'markdown',
        published: publish,
        coverImage: draft.coverImage,
        category: 'inspecao',
        series: draft.series,
        seriesLabel: draft.seriesLabel,
        seriesOrder: draft.seriesOrder,
        slug: draft.slug,
        videoId: draft.videoId || '',
        date: draft.date
      });
    }

    if (!result.ok) {
      return jsonResponse(result.status || 500, { error: result.error || 'falha ao gravar post' });
    }

    if (root && exportStaticFiles) await exportStaticFiles(root, store);
    if (triggerRebuild) await triggerRebuild();

    return jsonResponse(200, {
      ok: true,
      slug: result.slug,
      url: result.url,
      published: publish,
      videoCount: catalog.videoCount || (catalog.videos || []).length,
      series: draft.series,
      channelName: catalog.channelName,
      handle: catalog.handle
    });
  } catch (e) {
    const msg = e && e.message ? e.message : 'falha ao gerar inspeção';
    const status =
      e.code === 'INVALID_URL' || e.code === 'EMPTY_CATALOG' ? 400 : 502;
    return jsonResponse(status, { error: msg });
  }
}

module.exports = {
  match,
  ensureCanalSeries,
  nextSeriesSortOrder,
  postSlugFromChannelSlug,
  seriesIdFromSlug
};
