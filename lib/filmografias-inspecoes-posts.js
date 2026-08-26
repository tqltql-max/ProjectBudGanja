'use strict';

/**
 * Inspeções «Filmografias»: catálogo de ofício de ecrã de uma pessoa.
 * Série: filmografias — tipagem no hub → 'filmografia'.
 *
 * Distinto de Pessoas (biografia) e de Artes (uma obra).
 * A inauguração da série é Leonardo DiCaprio.
 */

function filmografiaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'filmografias',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Filmografia',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

module.exports = { filmografiaPost };
