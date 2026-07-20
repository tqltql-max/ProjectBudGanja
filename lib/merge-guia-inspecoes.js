'use strict';

const { GUIA_INSPECOES_POSTS } = require('./guia-inspecoes-posts.js');
const { CHANNEL_INSPECOES_POSTS } = require('./channel-inspecoes-posts.js');
const { EQUIPAMENTO_VERIFICACAO_POSTS } = require('./equipamento-verificacao-posts.js');
const { FORMACAO_INSPECOES_POSTS } = require('./formacao-inspecoes-posts.js');

/** Slugs obsoletos / fundidos noutras inspeções (ex.: curso UNIFESP). */
const REMOVED_INSPECAO_SLUGS = new Set(['inspecao-canal-movrecam']);

function sortPublicPosts(list) {
  return list.slice().sort((a, b) => {
    const soA = a.seriesOrder != null ? Number(a.seriesOrder) : 999;
    const soB = b.seriesOrder != null ? Number(b.seriesOrder) : 999;
    if (soA !== soB) return soA - soB;
    return new Date(b.date) - new Date(a.date);
  });
}

/** Builders históricos — usados só para seed; já não são injectados no merge. */
function getBuiltinInspecoesPosts() {
  return GUIA_INSPECOES_POSTS.concat(
    CHANNEL_INSPECOES_POSTS,
    EQUIPAMENTO_VERIFICACAO_POSTS,
    FORMACAO_INSPECOES_POSTS
  );
}

/**
 * Normaliza a lista da store. Inspeções vivem na store (como as geradas por link);
 * builders deixaram de ser injectados automaticamente.
 */
function mergeGuiaInspecoesPosts(posts) {
  const { normalizePosts } = require('./posts-service.js');
  const storeList = posts || [];
  return normalizePosts(storeList.filter((p) => !REMOVED_INSPECAO_SLUGS.has(p.slug)));
}

module.exports = {
  mergeGuiaInspecoesPosts,
  sortPublicPosts,
  getBuiltinInspecoesPosts,
  REMOVED_INSPECAO_SLUGS,
  GUIA_INSPECOES_POSTS,
  CHANNEL_INSPECOES_POSTS,
  EQUIPAMENTO_VERIFICACAO_POSTS,
  FORMACAO_INSPECOES_POSTS
};
