'use strict';

const { GUIA_INSPECOES_POSTS } = require('./guia-inspecoes-posts.js');
const { CHANNEL_INSPECOES_POSTS } = require('./channel-inspecoes-posts.js');

function sortPublicPosts(list) {
  return list.slice().sort((a, b) => {
    const soA = a.seriesOrder != null ? Number(a.seriesOrder) : 999;
    const soB = b.seriesOrder != null ? Number(b.seriesOrder) : 999;
    if (soA !== soB) return soA - soB;
    return new Date(b.date) - new Date(a.date);
  });
}

function mergeGuiaInspecoesPosts(posts) {
  const { normalizePosts } = require('./posts-service.js');
  const extra = GUIA_INSPECOES_POSTS.concat(CHANNEL_INSPECOES_POSTS);
  const slugs = new Set(extra.map((p) => p.slug));
  const base = (posts || []).filter((p) => !slugs.has(p.slug));
  return normalizePosts(base.concat(extra));
}

module.exports = { mergeGuiaInspecoesPosts, sortPublicPosts, GUIA_INSPECOES_POSTS, CHANNEL_INSPECOES_POSTS };
