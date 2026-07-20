'use strict';

/**
 * Gera um post de inspeção genérico a partir de um catálogo de canal YouTube.
 */

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function escapeMdTitle(title) {
  return String(title || '').replace(/\[/g, '\\[');
}

function videoMd(v) {
  const title = escapeMdTitle(v.title || v.id);
  return '[' + title + '](https://www.youtube.com/watch?v=' + v.id + ')';
}

function seriesIdFromSlug(slug) {
  return 'canal-' + String(slug || '').replace(/^canal-/, '');
}

function postSlugFromChannelSlug(slug) {
  return 'inspecao-canal-' + String(slug || '').replace(/^inspecao-canal-/, '');
}

function pickThemes(videos) {
  const themes = {
    'Cultivo e setup': /cultivo|setup|indoor|outdoor|tenda|led|grow/i,
    'Nutrição e substrato': /nutri|solo|substrato|fertiliz|ec|ppm|coco/i,
    'Propagação': /clon|estaca|germin|semente|propag/i,
    'Floração e colheita': /flora|colheita|secar|trichom|hash/i,
    'Genética e reviews': /genét|strain|review|breeder|semente/i,
    'Comunidade e lives': /live|bate.?papo|pergunta|comunidade|inscrit/i
  };
  const blocks = [];
  Object.entries(themes).forEach(([name, re]) => {
    const list = videos.filter((v) => re.test(v.title || ''));
    if (!list.length) return;
    const sample = list.slice(0, 8).map((v) => '- ' + videoMd(v)).join('\n');
    blocks.push('### ' + name + '\n\n' + sample);
  });
  return blocks.join('\n\n');
}

function catalogSampleRows(videos, limit) {
  const n = limit || 25;
  return videos
    .slice(0, n)
    .map((v, i) => {
      const date = v.published ? String(v.published).slice(0, 10) : '—';
      const views = v.views || '—';
      return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + date + ' | ' + views + ' |';
    })
    .join('\n');
}

function buildChannelInspectionBody(catalog) {
  const ch = catalog || {};
  const videos = ch.videos || [];
  const count = ch.videoCount != null ? ch.videoCount : videos.length;
  const inspected = (ch.inspectedAt || new Date().toISOString()).slice(0, 10);
  const themeBlocks = pickThemes(videos);
  const sample = catalogSampleRows(videos, 25);
  const moreNote =
    count > 25
      ? '\n\n_Mostrando 25 de ' + count + ' vídeos catalogados. Catálogo completo em `content/channels/`._'
      : '';

  return `## Escopo

Inspeção editorial e técnica do **canal de referência** [${ch.channelName || ch.handle}](${ch.channelUrl}) (${ch.handle}) — auditoria do acervo público, com inventário via página de uploads e feed RSS.

> **Nota metodológica:** inspeção produzida pelo laboratório Inspetor BudGanja de forma **independente**. O conteúdo audiovisual pertence ao criador do canal. Fonte: ${ch.channelUrl}.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | [${ch.channelName || ch.handle}](${ch.channelUrl}) |
| Handle | ${ch.handle || '—'} |
| ID YouTube | \`${ch.channelId || '—'}\` |
| Vídeos catalogados | **${count}** |
| Data da inspeção | ${inspected} |
| Fonte | ${ch.channelUrl} |

## Hipóteses e método

- **H1:** O catálogo público permite avaliar foco editorial e utilidade prática para cultivadores.
- **H2:** A amostragem temática por título indica a cobertura do canal sem substituir visualização integral.
- **Método:** (1) inventário YouTube (/videos + RSS); (2) classificação por palavras-chave nos títulos; (3) registo de amostra do catálogo; (4) recomendações ao cultivador.

## Perfil editorial (achados)

1. **Volume catalogado:** ${count} vídeos identificados nesta passagem.
2. **Identidade:** canal ${ch.handle || ch.channelName} no YouTube.
3. **Utilidade:** cruzar temas do canal com as [inspeções do guia](/biblioteca/inspecoes/#inspecoes-guia) e [calculadoras](/calculadoras/) do laboratório.

${themeBlocks ? '## Mapa temático (amostra)\\n\\n' + themeBlocks : ''}

## Amostra do catálogo (${Math.min(25, count)} vídeos)

| # | Vídeo | Data | Views |
|---|-------|------|-------|
${sample || '| — | — | — | — |'}${moreNote}

## Créditos e transparência

- **Conteúdo audiovisual** © criador do canal — [${ch.channelName || ch.handle}](${ch.channelUrl})
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** orientar cultivadores — não constitui endosso comercial

## Status

**Registado para revisão** — catálogo sincronizado em ${inspected}. Validar achados editoriais antes de tratar como referência definitiva.

[▶ Abrir canal](${ch.channelUrl}) · [Todas as inspeções](/biblioteca/inspecoes/)
`;
}

/**
 * @param {object} catalog
 * @param {{ slug?: string, seriesOrder?: number, published?: boolean }} opts
 */
function buildChannelInspectionPost(catalog, opts) {
  opts = opts || {};
  const ch = catalog || {};
  const channelSlug = opts.slug || String(ch.handle || '')
    .replace(/^@/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const series = seriesIdFromSlug(channelSlug);
  const postSlug = postSlugFromChannelSlug(channelSlug);
  const videos = ch.videos || [];
  const count = ch.videoCount != null ? ch.videoCount : videos.length;
  const refVideo = videos[0];
  const videoId = refVideo && refVideo.id ? refVideo.id : '';
  const name = ch.channelName || ch.handle || channelSlug;
  const handle = ch.handle || '@' + channelSlug;

  return {
    title: 'Inspeção: Canal ' + name + ' (' + handle + ')',
    excerpt:
      'Auditoria editorial do canal ' +
      name +
      ' — ' +
      count +
      ' vídeos catalogados, com mapeamento temático e créditos ao criador.',
    slug: postSlug,
    date: ch.inspectedAt || new Date().toISOString(),
    coverImage: videoId ? ytThumb(videoId) : '',
    category: 'inspecao',
    format: 'markdown',
    published: opts.published === true,
    series,
    seriesOrder: opts.seriesOrder != null ? Number(opts.seriesOrder) : 20,
    seriesLabel: 'Canal ' + name,
    videoId: videoId || undefined,
    content_raw: buildChannelInspectionBody(ch),
    content: buildChannelInspectionBody(ch)
  };
}

module.exports = {
  buildChannelInspectionPost,
  buildChannelInspectionBody,
  seriesIdFromSlug,
  postSlugFromChannelSlug,
  ytThumb
};
