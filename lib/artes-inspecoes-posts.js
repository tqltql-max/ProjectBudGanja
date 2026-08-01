'use strict';

/**
 * Inspeções «Artes»: filmes, séries, música, artes visuais e obras culturais
 * ligadas a plantas, linguagem ou ao ecossistema inspecionado.
 * Série: artes-cultura — tipagem no hub → 'arte'.
 *
 * Método: obra (título, ano, meio) → representação / tese cultural →
 * elos com Plantas / Palavras / Pessoas quando couber —
 * sem confundir com Canais (YouTube) nem com biografia em Pessoas.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

/** Posts publicados desta série — preenchidos via upsert quando houver ficha. */
const ARTES_INSPECOES_POSTS = [];

module.exports = {
  ARTES_INSPECOES_POSTS,
  artePost
};
