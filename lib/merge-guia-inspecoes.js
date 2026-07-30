'use strict';

const { GUIA_INSPECOES_POSTS } = require('./guia-inspecoes-posts.js');
const { CHANNEL_INSPECOES_POSTS } = require('./channel-inspecoes-posts.js');
const { EQUIPAMENTO_VERIFICACAO_POSTS } = require('./equipamento-verificacao-posts.js');
const { FORMACAO_INSPECOES_POSTS } = require('./formacao-inspecoes-posts.js');
const { LOJA_INSPECOES_POSTS } = require('./loja-inspecoes-posts.js');
const { INSUMO_INSPECOES_POSTS } = require('./insumo-inspecoes-posts.js');

/** Slugs obsoletos / removidos do projeto (não voltam no merge nem no build). */
const REMOVED_INSPECAO_SLUGS = new Set([
  'inspecao-canal-jardimhg',
  'inspecao-canal-inspetorbudganja',
  'inspecao-canal-plantamemo',
  'inspecao-cultivo-inicio',
  'inspecao-nutricao-cannabis',
  'inspecao-solo-vivo-organico',
  'inspecao-arquitetura-cannabis',
  'inspecao-ciencia-floracao',
  'inspecao-propagacao-clonagem',
  'inspecao-cultivo-indoor-ppfd',
  'inspecao-insumo-biobizz',
  'inspecao-loja-floraurbana'
]);

const REMOVED_INSPECAO_SERIES = new Set([
  'guia-cultivo-basico',
  'canal-inspetorbudganja',
  'canal-plantamemo'
]);

function isRemovedInspecao(post) {
  if (!post) return false;
  if (REMOVED_INSPECAO_SLUGS.has(post.slug)) return true;
  if (REMOVED_INSPECAO_SERIES.has(post.series)) return true;
  return false;
}

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
  return [].concat(
    CHANNEL_INSPECOES_POSTS,
    EQUIPAMENTO_VERIFICACAO_POSTS,
    FORMACAO_INSPECOES_POSTS,
    LOJA_INSPECOES_POSTS,
    INSUMO_INSPECOES_POSTS
  );
}

/**
 * Normaliza a lista da store. Inspeções vivem na store (como as geradas por link);
 * builders deixaram de ser injectados automaticamente.
 * Guia de cultivo e outros slugs removidos são filtrados sempre.
 */
function mergeGuiaInspecoesPosts(posts) {
  const { normalizePosts } = require('./posts-service.js');
  const storeList = posts || [];
  return normalizePosts(storeList.filter((p) => !isRemovedInspecao(p)));
}

module.exports = {
  mergeGuiaInspecoesPosts,
  sortPublicPosts,
  getBuiltinInspecoesPosts,
  REMOVED_INSPECAO_SLUGS,
  REMOVED_INSPECAO_SERIES,
  GUIA_INSPECOES_POSTS,
  CHANNEL_INSPECOES_POSTS,
  EQUIPAMENTO_VERIFICACAO_POSTS,
  FORMACAO_INSPECOES_POSTS,
  LOJA_INSPECOES_POSTS,
  INSUMO_INSPECOES_POSTS
};
