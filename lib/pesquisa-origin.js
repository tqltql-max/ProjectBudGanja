'use strict';

/** Séries usadas para organizar pesquisas públicas (sem nova coluna). */
const SERIES_LAB = 'pesquisa-laboratorio';
const SERIES_COMMUNITY = 'pesquisa-comunidade';
const SERIES_TOOL_GUIDE = 'guia-ferramenta';

const KNOWN_SERIES = {
  'guia-calculadora-super-solo': { series: SERIES_TOOL_GUIDE, seriesLabel: 'Guia de ferramenta' },
  'guia-calculadora-luximetro': { series: SERIES_TOOL_GUIDE, seriesLabel: 'Guia de ferramenta' },
  'otimizacao-propagacao-vegetal': { series: SERIES_LAB, seriesLabel: 'Laboratório' }
};

function isGuiaFerramenta(post) {
  if (!post) return false;
  const series = String(post.series || '');
  if (series === SERIES_TOOL_GUIDE) return true;
  return /^guia-calculadora-/i.test(String(post.slug || ''));
}

function isPesquisaComunidade(post) {
  return String((post && post.series) || '') === SERIES_COMMUNITY;
}

/** Legado sem series → laboratório. Guias ficam de fora. */
function isPesquisaLaboratorio(post) {
  if (!post || isGuiaFerramenta(post) || isPesquisaComunidade(post)) return false;
  const series = String(post.series || '');
  return !series || series === SERIES_LAB || series.indexOf('pesquisa-') === 0;
}

function applyKnownPesquisaSeries(post) {
  if (!post || !post.slug) return post;
  const known = KNOWN_SERIES[post.slug];
  if (!known) return post;
  if (post.series && String(post.series).trim()) return post;
  return Object.assign({}, post, {
    series: known.series,
    seriesLabel: known.seriesLabel
  });
}

function stampKnownPesquisaSeries(posts) {
  if (!Array.isArray(posts)) return { posts: [], changed: false };
  let changed = false;
  const next = posts.map(function (p) {
    const stamped = applyKnownPesquisaSeries(p);
    if (stamped !== p && (stamped.series !== p.series || stamped.seriesLabel !== p.seriesLabel)) {
      changed = true;
    }
    return stamped;
  });
  return { posts: next, changed };
}

/** Lista pública de pesquisas: todos os posts da categoria (inclui guias de ferramenta). */
function filterPesquisasForPublicList(posts) {
  return posts || [];
}

module.exports = {
  SERIES_LAB,
  SERIES_COMMUNITY,
  SERIES_TOOL_GUIDE,
  KNOWN_SERIES,
  isGuiaFerramenta,
  isPesquisaComunidade,
  isPesquisaLaboratorio,
  applyKnownPesquisaSeries,
  stampKnownPesquisaSeries,
  filterPesquisasForPublicList
};
