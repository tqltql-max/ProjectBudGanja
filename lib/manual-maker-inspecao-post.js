'use strict';

/**
 * Inspeção · Manual Maker — série de ofício no @manualdomundo.
 * Maker ≠ loja. Série ≠ canal à parte.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'manualdomundo.json'), 'utf8')
    );
  } catch (e) {
    return { videos: [], videoCount: 0 };
  }
}

function mdTitle(title) {
  return String(title || '')
    .replace(/\[/g, '\\[')
    .replace(/\|/g, ' ');
}

function makerVideos(ch) {
  return (ch.videos || []).filter((v) => v.category === 'maker');
}

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
    series: opts.series || 'formacao-academica',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Manual Maker · ofício',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.videoCount != null) post.videoCount = opts.videoCount;
  return post;
}

function buildManualMakerBodies(ch) {
  const inspected = '2026-08-21';
  const canal = '/posts/post-inspecao-canal-manual-do-mundo.html';
  const ibere = '/posts/post-inspecao-ibere-thenorio.html';
  const videos = '/videos/?channel=manualdomundo&series=maker';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Manual_do_Mundo';
  const site = 'https://www.manualdomundo.com.br';
  const list = makerVideos(ch);
  const seed =
    list.find((v) => /arduino/i.test(v.title || '')) ||
    list[0] || { id: '', title: 'Manual Maker' };
  const count = list.length;
  const amostra = list
    .slice(0, 12)
    .map((v) => '- [' + mdTitle(v.title) + '](https://www.youtube.com/watch?v=' + v.id + ')')
    .join('\n');

  const body = `## Escopo

Inspeção editorial do **Manual Maker** — série de **ofício** (Arduino, impressão 3D, corte a laser, cultura maker) **dentro** do canal [Manual do Mundo](${canal}) (@manualdomundo). Esta ficha é o **destaque** da inspeção [especial](${especial}) desse arquivo: o curso, não a loja. **Maker ≠ canal à parte. Maker ≠ [manualmaker.com.br](https://manualmaker.com.br)** (loja alheia). Pessoa cofundadora: [Iberê Thenório](${ibere}).

> **Nota metodológica:** auditoria independente. Catálogo filtrado em [Vídeos · Maker](${videos}) (**${count}** peças classificadas pelo título). Fontes: [canal](https://www.youtube.com/@manualdomundo), [Wikipédia](${wiki}), [site](${site}). Crédito: Manual do Mundo — **sem afiliação**. Ficha ≠ protocolo de solda, nem manual de CNC, nem merch. Catalogar ≠ endosso de cada aula.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Manual Maker** (#ManualMaker) |
| Onde vive | Mesmo canal YouTube do [Manual do Mundo](${canal}) |
| Ofício | Arduino · impressão 3D · corte a laser · cultura maker |
| Peças no recorte | **${count}** |
| Vídeo âncora | [${mdTitle(seed.title)}](https://www.youtube.com/watch?v=${seed.id || ''}) |
| Pessoa | [Iberê Thenório](${ibere}) — **pessoa ≠ série** |
| Não é | Loja homónima · canal separado · extensão UNIFESP |
| Elo BudGanja | [especial](${especial}) · [respeito](${respeito}) · [risco](${risco}) · formação de ofício |
| Data | ${inspected} |

## Por que esta inspeção existe

O palco do Manual do Mundo é famoso por experiências e recordes. O Maker é o recorte que **ensina a construir**. Sem esta ficha, o arquivo afogava o ofício no clickbait de explosão. Com ela, o laboratório **olha de novo**: Arduino e laser são o destaque, não um extra.

## Mérito

| Peça | Porquê conta |
|------|----------------|
| **Arduino** | Microcontrolador no ecrã BR — literacia de circuito, não unboxing |
| **Impressão 3D** | Fabrico digital acessível — ofício, não catálogo de loja |
| **Corte a laser** | Ferramenta de oficina — [risco](${risco}) à vista |
| **Aulas numeradas** | Sequência ensinável — vizinha de [MovReCam](${movrecam}) no *espírito* de curso, **não** no contrato UNIFESP |

### Amostra do recorte

${amostra || '_—_'}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || '—'}\` |
| Nota | Porta do Maker; a série completa filtra-se em [Vídeos · Maker](${videos}) |

## Limites

- **Não é diploma** nem curso acreditado. É arquivo de ecrã.
- **Não é** a loja *manualmaker.com.br*.
- Solda, laser e 220 V pedem [risco](${risco}) — a ficha **não** substitui EPI nem professor no sítio.
- [Verdade](${verdade}) de aula YouTube ≠ paper de engenharia.

## Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Canal](${canal}) | Arquivo completo — esta página é o recorte |
| [Iberê](${ibere}) | Pessoa — não a série |
| [MovReCam](${movrecam}) | Outro curso no lab; extensão ≠ Maker de palco |
| [Valeu !!!](${mantra}) | Fecho de ofício |

## Status

**Aprovado como destaque** — Manual Maker · ofício no @manualdomundo; **${count}** vídeos. Série ≠ loja. Série ≠ canal à parte.

[▶ Vídeos · Maker](${videos}) · [▶ Canal](${canal}) · [▶ Iberê](${ibere}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Manual Maker** — Arduino / 3D / laser craft series **on** the [Manual do Mundo](${canal}) channel (not a separate channel, not the unrelated shop manualmaker.com.br). **${count}** title-tagged videos. Person: [Iberê Thenório](${ibere}).

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Status

**Approved as highlight** — craft series, not a shop.

[▶ Videos](${videos}) · [▶ Channel](${canal})
`;

  const contentEs = `## Alcance

Inspección de **Manual Maker** — serie de oficio (Arduino, 3D, láser) **en** el canal [Manual do Mundo](${canal}) (no es otro canal ni la tienda ajena manualmaker.com.br). **${count}** vídeos. Persona: [Iberê Thenório](${ibere}).

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Estado

**Aprobada como destaque** — oficio, no tienda.

[▶ Vídeos](${videos}) · [▶ Canal](${canal})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', count };
}

function buildManualMakerPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, count } = buildManualMakerBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 40;
  return artePost({
    title: 'Inspeção: Manual Maker — ofício Arduino, 3D e laser no Manual do Mundo',
    titleEn: 'Inspection: Manual Maker — Arduino, 3D and laser craft on Manual do Mundo',
    titleEs: 'Inspección: Manual Maker — oficio Arduino, 3D y láser en Manual do Mundo',
    excerpt:
      'Formação (destaque): Manual Maker — Arduino, impressão 3D e corte a laser no @manualdomundo; série ≠ loja; série ≠ canal à parte. Hub /videos/?channel=manualdomundo&series=maker.',
    excerptEn:
      'Training (highlight): Manual Maker — Arduino, 3D print and laser on @manualdomundo; series ≠ shop; series ≠ separate channel. Hub /videos/?channel=manualdomundo&series=maker.',
    excerptEs:
      'Formación (destaque): Manual Maker — Arduino, 3D y láser en @manualdomundo; serie ≠ tienda; serie ≠ otro canal. Hub /videos/?channel=manualdomundo&series=maker.',
    slug: 'inspecao-manual-maker',
    date: '2026-08-21T17:08:00.000Z',
    seriesOrder: order,
    coverImage: '/imagens/inspecoes/manual-maker-cover.jpg',
    sourceUrl: 'https://www.youtube.com/@manualdomundo',
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildManualMakerPost,
  buildManualMakerBodies,
  loadCatalog
};
