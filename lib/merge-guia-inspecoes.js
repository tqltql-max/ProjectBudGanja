'use strict';

const { GUIA_INSPECOES_POSTS } = require('./guia-inspecoes-posts.js');
const { CHANNEL_INSPECOES_POSTS } = require('./channel-inspecoes-posts.js');
const { EQUIPAMENTO_VERIFICACAO_POSTS } = require('./equipamento-verificacao-posts.js');
const { FORMACAO_INSPECOES_POSTS } = require('./formacao-inspecoes-posts.js');
const { LOJA_INSPECOES_POSTS } = require('./loja-inspecoes-posts.js');
const { INSUMO_INSPECOES_POSTS } = require('./insumo-inspecoes-posts.js');
const { ARTIGOS_INSPECOES_POSTS } = require('./artigos-inspecoes-posts.js');
const { PLANTAS_INSPECOES_POSTS } = require('./plantas-inspecoes-posts.js');
const { DERIVADOS_INSPECOES_POSTS } = require('./derivados-inspecoes-posts.js');
const { FRUTOS_DERIVADOS_INSPECOES_POSTS } = require('./frutos-derivados-inspecoes-posts.js');
const { ANIMAIS_INSPECOES_POSTS } = require('./animais-inspecoes-posts.js');
const { ANIMAIS_DERIVADOS_INSPECOES_POSTS } = require('./animais-derivados-inspecoes-posts.js');
const { PALAVRAS_INSPECOES_POSTS } = require('./palavras-inspecoes-posts.js');
const { PESSOAS_HISTORIA_INSPECOES_POSTS } = require('./pessoas-historia-inspecoes-posts.js');
const { DIVULGACAO_INSPECOES_POSTS } = require('./divulgacao-inspecoes-posts.js');
const { ARTES_INSPECOES_POSTS } = require('./artes-inspecoes-posts.js');
const { ARTES_FILA_PRI2_POSTS } = require('./artes-fila-pri2-inspecoes-posts.js');
const { ARTES_FILA_RESTANTE_POSTS } = require('./artes-fila-restante-inspecoes-posts.js');
const { leftoverPosts } = require('./fila-restante-inspecoes-posts.js');
const {
  EXPRESSOES_DITADOS_INSPECOES_POSTS
} = require('./expressoes-ditados-inspecoes-posts.js');

const DROP_SLUG_RE = /celular|patinete/i;

/** Séries de inspeção permitidas (eixo cultivo). */
const KEEP_INSPECAO_SERIES = new Set([
  'animais-catalogo',
  'animais-derivados-risco',
  'animais-producao',
  'fungos-catalogo',
  'plantas-derivados-risco',
  'plantas-frutos',
  'plantas-medicinais',
  'verificacao-equipamento'
]);

/** Slugs obsoletos / removidos do projeto (não voltam no merge nem no build). */
const REMOVED_INSPECAO_SLUGS = new Set([
  'inspecao-arquitetura-cannabis',
  'inspecao-canal-inspetorbudganja',
  'inspecao-canal-jardimhg',
  'inspecao-canal-plantamemo',
  'inspecao-celular-riscos-saude-criancas',
  'inspecao-ciencia-floracao',
  'inspecao-cultivo-indoor-ppfd',
  'inspecao-cultivo-inicio',
  'inspecao-insumo-biobizz',
  'inspecao-loja-floraurbana',
  'inspecao-nutricao-cannabis',
  'inspecao-patinete-eletrico-criancas',
  'inspecao-propagacao-clonagem',
  'inspecao-solo-vivo-organico'
]);

const REMOVED_INSPECAO_SERIES = new Set([
  'artes-cultura',
  'artigos-cientificos',
  'cadernos-jogo',
  'canal-amyrklink',
  'canal-bagual',
  'canal-canabinall',
  'canal-disneyjr',
  'canal-icl',
  'canal-inspetorbudganja',
  'canal-manual-do-mundo',
  'canal-movrecam',
  'canal-paulinho',
  'canal-pharmacon',
  'canal-plantamemo',
  'canal-richard-rasmussen',
  'canal-slivki',
  'canal-tamaraklink',
  'canal-vevo',
  'canal-zangado',
  'divulgacao-saude',
  'expressoes-ditados',
  'filmografias',
  'formacao-academica',
  'guia-cultivo-basico',
  'legado-pessoas',
  'loja-dermocosmetico',
  'loja-streaming',
  'neurociencias',
  'palavras-origem',
  'pessoas-historia',
  'vida-contos'
]);

function isRemovedInspecao(post) {
  if (!post) return false;
  if (REMOVED_INSPECAO_SLUGS.has(post.slug)) return true;
  if (REMOVED_INSPECAO_SERIES.has(post.series)) return true;
  if (post.category === 'inspecao') {
    if (DROP_SLUG_RE.test(String(post.slug || ''))) return true;
    if (post.series && !KEEP_INSPECAO_SERIES.has(post.series)) return true;
  }
  return false;
}

const HOME_PINNED_INSPECAO_SLUGS = [];

function inspecaoPinRank(slug) {
  const i = HOME_PINNED_INSPECAO_SLUGS.indexOf(slug);
  return i === -1 ? 99 : i;
}

function sortPublicPosts(list) {
  return list.slice().sort((a, b) => {
    const aPin = inspecaoPinRank(a && a.slug);
    const bPin = inspecaoPinRank(b && b.slug);
    if (aPin !== bPin) return aPin - bPin;
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
    ARTIGOS_INSPECOES_POSTS,
    PLANTAS_INSPECOES_POSTS,
    DERIVADOS_INSPECOES_POSTS,
    FRUTOS_DERIVADOS_INSPECOES_POSTS,
    ANIMAIS_INSPECOES_POSTS,
    ANIMAIS_DERIVADOS_INSPECOES_POSTS,
    PALAVRAS_INSPECOES_POSTS,
    PESSOAS_HISTORIA_INSPECOES_POSTS,
    DIVULGACAO_INSPECOES_POSTS,
    ARTES_INSPECOES_POSTS,
    ARTES_FILA_PRI2_POSTS,
    ARTES_FILA_RESTANTE_POSTS,
    leftoverPosts(),
    EXPRESSOES_DITADOS_INSPECOES_POSTS
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
  HOME_PINNED_INSPECAO_SLUGS,
  getBuiltinInspecoesPosts,
  KEEP_INSPECAO_SERIES,
  REMOVED_INSPECAO_SLUGS,
  REMOVED_INSPECAO_SERIES,
  GUIA_INSPECOES_POSTS,
  CHANNEL_INSPECOES_POSTS,
  EQUIPAMENTO_VERIFICACAO_POSTS,
  FORMACAO_INSPECOES_POSTS,
  LOJA_INSPECOES_POSTS,
  INSUMO_INSPECOES_POSTS,
  PLANTAS_INSPECOES_POSTS
};
