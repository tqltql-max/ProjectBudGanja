'use strict';

const { LOJA_CATALOG } = require('./loja-catalog.js');
const { parseYouTubeId } = require('./youtube.js');

const SERIES_LABELS = {
  'guia-cultivo-basico': 'Guia de Cultivo Básico',
  'canal-jardimhg': 'Canal Jardim HG'
};

const TIPO_LABELS = {
  'conteudo': 'Conteúdo',
  'equipamento': 'Equipamento',
  'pesquisa': 'Pesquisa'
};

const SERIES_LOJA_PROJECT = {
  'guia-cultivo-basico': 'cultivo-indoor'
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function findLojaProject(projectId) {
  if (!projectId || !LOJA_CATALOG.projects) return null;
  return LOJA_CATALOG.projects.find((p) => p && p.id === projectId) || null;
}

function renderLojaMaterialsHtml(projectId, compact) {
  const project = findLojaProject(projectId);
  if (!project || !Array.isArray(project.products) || !project.products.length) return '';

  const listHtml = project.products
    .slice(0, compact ? 4 : project.products.length)
    .map((product) => {
      const link = product.links && product.links[0];
      const buy =
        link && link.href
          ? '<a href="' +
            escapeHtml(link.href) +
            '" class="loja-buy-link" target="_blank" rel="noopener noreferrer sponsored">Comprar <span aria-hidden="true">↗</span></a>'
          : '';
      const optional = product.optional ? ' <span class="loja-product-optional">(opc.)</span>' : '';
      return (
        '<li class="loja-product-row equip-loja-product-row">' +
        '<div class="equip-loja-product-copy">' +
        '<span class="loja-product-name">' +
        escapeHtml(product.name) +
        optional +
        '</span>' +
        (product.role ? '<span class="equip-loja-product-role">' + escapeHtml(product.role) + '</span>' : '') +
        '</div>' +
        buy +
        '</li>'
      );
    })
    .join('');

  const title = compact ? 'Materiais recomendados' : 'Equipamentos verificados (loja parceira)';

  return (
    '<aside class="equip-loja-materials highlight' +
    (compact ? ' equip-loja-materials--compact' : '') +
    '">' +
    '<p class="equip-loja-eyebrow">Loja parceira · ' +
    escapeHtml(project.title) +
    '</p>' +
    '<h3 class="equip-loja-title">' +
    escapeHtml(title) +
    '</h3>' +
    '<ul class="loja-product-list equip-loja-product-list">' +
    listHtml +
    '</ul>' +
    '<div class="equip-loja-footer">' +
    '<a href="/loja/#' +
    escapeHtml(project.id) +
    '" class="botao botao-outline botao-sm">Ver vitrine completa</a>' +
    '</div>' +
    '</aside>'
  );
}

function extractVideoIdFromPost(post) {
  if (post.videoId) return parseYouTubeId(post.videoId);
  const raw = post.content_raw || post.content || '';
  const m = String(raw).match(/@youtube\s+(\S+)/i);
  return m ? parseYouTubeId(m[1]) : null;
}

function buildVideoObjectJson(post, coverImage) {
  const videoId = extractVideoIdFromPost(post);
  if (!videoId) return null;
  const title = post.title || '';
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: post.excerpt || '',
    thumbnailUrl: coverImage || 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg',
    uploadDate: post.date || '',
    embedUrl: 'https://www.youtube.com/embed/' + videoId,
    contentUrl: 'https://www.youtube.com/watch?v=' + videoId
  };
}

function buildSeriesBadgeHtml(post) {
  if (!post.series) return '';
  const label = SERIES_LABELS[post.series] || post.series;
  const order =
    post.seriesOrder != null ? ' · Cap. ' + Number(post.seriesOrder) : '';
  return (
    '<p class="post-series-badge" data-series="' +
    escapeHtml(post.series) +
    '">' +
    escapeHtml(label + order) +
    '</p>'
  );
}

function buildI18nNoteHtml(post) {
  const en = post.excerptEn || post.excerpt_en;
  const es = post.excerptEs || post.excerpt_es;
  if (!en && !es) return '';
  const parts = [];
  if (en) parts.push('<strong>EN:</strong> ' + escapeHtml(en));
  if (es) parts.push('<strong>ES:</strong> ' + escapeHtml(es));
  return (
    '<p class="post-i18n-note" lang="en">' +
    parts.join(' · ') +
    ' <span class="post-i18n-hint">(resumo; artigo completo em português)</span></p>'
  );
}

function appendPostExtras(post, bodyHtml) {
  let html = bodyHtml;
  html += buildSeriesBadgeHtml(post);
  html += buildI18nNoteHtml(post);
  const projectId = SERIES_LOJA_PROJECT[post.series];
  if (projectId) {
    html += renderLojaMaterialsHtml(projectId, true);
  }
  return html;
}

module.exports = {
  SERIES_LABELS,
  buildVideoObjectJson,
  appendPostExtras,
  extractVideoIdFromPost
};
