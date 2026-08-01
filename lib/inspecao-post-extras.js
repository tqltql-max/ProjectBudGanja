'use strict';

const { parseYouTubeId } = require('./youtube.js');

const SERIES_LABELS = {
  'canal-movrecam': 'Canal MovReCam',
  'canal-canabinall': 'Canal CANABinALL',
  'verificacao-equipamento': 'Verificação de Equipamentos',
  'formacao-academica': 'Extensão académica',
  'loja-cultivo': 'Lojas de cultivo',
  'insumos-cultivo': 'Insumos de cultivo',
  'artigos-cientificos': 'Artigos científicos',
  'legado-pessoas': 'Legado',
  'plantas-derivados-risco': 'Derivados de risco',
  'palavras-origem': 'Palavras',
  'pessoas-historia': 'Pessoas',
  'divulgacao-saude': 'Divulgação',
  'artes-cultura': 'Artes'
};
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
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
  const label = post.seriesLabel || SERIES_LABELS[post.series] || post.series;
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

function buildI18nNoteHtml(post, options) {
  const opts = options || {};
  const hasBodyEn = !!opts.hasBodyEn || !!(post.contentEn || post.content_en);
  const hasBodyEs = !!opts.hasBodyEs || !!(post.contentEs || post.content_es);
  // Com corpo completo EN/ES, a nota de resumo deixa de ser necessária.
  if (hasBodyEn && hasBodyEs) return '';

  const en = String(post.excerptEn || post.excerpt_en || '').trim();
  const es = String(post.excerptEs || post.excerpt_es || '').trim();
  if (!en && !es) return '';
  let html =
    '<aside class="post-i18n-note" data-post-i18n-note data-has-en="' +
    (en ? '1' : '0') +
    '" data-has-es="' +
    (es ? '1' : '0') +
    '" data-has-body-en="' +
    (hasBodyEn ? '1' : '0') +
    '" data-has-body-es="' +
    (hasBodyEs ? '1' : '0') +
    '">';
  if (en) {
    html +=
      '<p class="post-i18n-locale" data-i18n-locale="en" lang="en">' +
      '<span class="post-i18n-label">EN</span> ' +
      escapeHtml(en) +
      '</p>';
  }
  if (es) {
    html +=
      '<p class="post-i18n-locale" data-i18n-locale="es" lang="es" hidden>' +
      '<span class="post-i18n-label">ES</span> ' +
      escapeHtml(es) +
      '</p>';
  }
  html +=
    '<p class="post-i18n-hint" data-i18n="posts.summaryOnly">' +
    '(summary; full article in Portuguese)' +
    '</p></aside>';
  return html;
}

function appendPostExtras(post, bodyHtml) {
  let html = bodyHtml;
  html += buildSeriesBadgeHtml(post);
  // Nota i18n vai no header do artigo (buildPostHtml), não no fim do corpo.
  // Sem blocos comerciais — o projeto não vende nem afilia materiais.
  return html;
}

module.exports = {
  SERIES_LABELS,
  buildVideoObjectJson,
  buildI18nNoteHtml,
  appendPostExtras,
  extractVideoIdFromPost
};
