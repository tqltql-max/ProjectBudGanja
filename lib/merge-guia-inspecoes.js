'use strict';

const { GUIA_INSPECOES_POSTS } = require('./guia-inspecoes-posts.js');
const { CHANNEL_INSPECOES_POSTS } = require('./channel-inspecoes-posts.js');
const { EQUIPAMENTO_VERIFICACAO_POSTS } = require('./equipamento-verificacao-posts.js');
const { FORMACAO_INSPECOES_POSTS } = require('./formacao-inspecoes-posts.js');
const { LOJA_INSPECOES_POSTS } = require('./loja-inspecoes-posts.js');
const { INSUMO_INSPECOES_POSTS } = require('./insumo-inspecoes-posts.js');
const { ARTIGOS_INSPECOES_POSTS } = require('./artigos-inspecoes-posts.js');

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
    INSUMO_INSPECOES_POSTS,
    ARTIGOS_INSPECOES_POSTS
  );
}

/**
 * Normaliza a lista da store. Inspeções vivem na store (como as geradas por link);
 * builders deixaram de ser injectados automaticamente.
 * Guia de cultivo e outros slugs removidos são filtrados sempre.
 * Campos i18n (titleEn/Es, excerptEn/Es) dos builders sobrescrevem a store
 * para o cabeçalho traduzido acompanhar o código-fonte.
 */
function mergeGuiaInspecoesPosts(posts) {
  const { normalizePosts } = require('./posts-service.js');
  const { applyPostI18nOverlay } = require('./post-i18n.js');
  const storeList = (posts || []).filter((p) => !isRemovedInspecao(p));
  const builtinBySlug = new Map(
    getBuiltinInspecoesPosts().map((p) => [p.slug, p])
  );
  const enriched = storeList.map((p) => {
    const builtin = builtinBySlug.get(p.slug);
    if (!builtin) return p;
    const out = Object.assign({}, p);
    if (builtin.titleEn) out.titleEn = builtin.titleEn;
    if (builtin.titleEs) out.titleEs = builtin.titleEs;
    if (builtin.excerptEn) out.excerptEn = builtin.excerptEn;
    if (builtin.excerptEs) out.excerptEs = builtin.excerptEs;
    if (builtin.contentEn) out.contentEn = builtin.contentEn;
    if (builtin.contentEs) out.contentEs = builtin.contentEs;
    return out;
  });
  return normalizePosts(applyPostI18nOverlay(enriched));
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
