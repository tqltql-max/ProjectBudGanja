'use strict';

/**
 * Inspeção Canais · Amyr Klink — ofício do pai, junto do canal da Tamara.
 * Pessoa ≠ canal: legado em post-inspecao-amyr-klink.html.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES, categorizeTitle } = require('./amyr-categories.js');

function loadJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
  } catch (e) {
    return { videos: [] };
  }
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
    series: opts.series || 'canal-amyrklink',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Amyr Klink · Canais',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.videoCount != null) post.videoCount = opts.videoCount;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function mdList(videos) {
  return (videos || [])
    .map((v) => {
      const title = String(v.title || 'Vídeo').replace(/\[/g, '\\[');
      return '- [' + title + '](https://www.youtube.com/watch?v=' + v.id + ')';
    })
    .join('\n');
}

function pickSeed(videos) {
  const list = videos || [];
  return (
    list.find((v) => /paratii/i.test(v.title || '')) ||
    list.find((v) => /palestra|cem dias/i.test(v.title || '')) ||
    list[0] || { id: '', title: 'Amyr Klink' }
  );
}

function buildAmyrCanalBodies() {
  const ch = loadJson(path.join('content', 'channels', 'amyrklinkoficial.json'));
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=amyr';
  const familiaHub = '/videos/?channel=tamara';
  const pessoa = '/posts/post-inspecao-amyr-klink.html';
  const tamaraPessoa = '/posts/post-inspecao-tamara-klink.html';
  const tamaraCanal = '/posts/post-inspecao-canal-tamaraklink.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const seed = pickSeed(ch.videos);
  const count = ch.videoCount || (ch.videos || []).length;

  const byTheme = {};
  CATEGORIES.forEach((c) => {
    byTheme[c.id] = [];
  });
  (ch.videos || []).forEach((v) => {
    const id = categorizeTitle(v.title);
    if (!byTheme[id]) byTheme[id] = [];
    byTheme[id].push(v);
  });
  const themeBlocks = CATEGORIES.filter((c) => (byTheme[c.id] || []).length)
    .map((c) => '#### ' + c.label + ' (' + byTheme[c.id].length + ')\n\n' + mdList(byTheme[c.id]))
    .join('\n\n');

  const body = `## Escopo

Inspeção editorial do canal **[${ch.channelName || 'Amyr Klink'}](${ch.channelUrl || 'https://www.youtube.com/@amyrklinkoficial'})** (${ch.handle || '@amyrklinkoficial'}) — voz pública do navegador. No BudGanja o canal **não substitui** a ficha de pessoa [${pessoa}](${pessoa}): aqui é o **arquivo em vídeo**, colocado **junto** do canal da filha [Tamara](${tamaraCanal}).

> **Nota metodológica:** auditoria independente. Hub: [Vídeos · Amyr](${videosHub}) (${count} itens). Em [Vídeos · Tamara](${familiaHub}) estes vídeos aparecem **no mesmo ecrã** (família Klink). Sem afiliação. Sem inventar vida privada.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${ch.channelName || 'Amyr Klink'}** (${ch.handle || '@amyrklinkoficial'}) |
| Channel ID | \`${ch.channelId || ''}\` |
| URL | [${ch.channelUrl || 'https://www.youtube.com/@amyrklinkoficial'}](${ch.channelUrl || 'https://www.youtube.com/@amyrklinkoficial'}) |
| Itens no hub | **${count}** |
| Ficha pessoa | [Amyr · legado](${pessoa}) |
| Filha (canal) | [Tamara Klink · Canais](${tamaraCanal}) |
| Filha (pessoa) | [Tamara · legado](${tamaraPessoa}) |
| Elo | [caminho](${caminho}) — planeamento e partida |
| Data | ${inspected} |

## Hipóteses e método

**H1:** Amyr tem canal próprio — crédito devido, não sombra da filha.  
**H2:** *Paratii* / palestras / livros são ofício público.  
**H3:** a avó da Tamara (**Ana Francesca**) nomeou o *Sardinha* da filha — isso vive no [canal Tamara](${tamaraCanal}), não se inventa neste canal.  
**H4:** juntos no hub = método de família de ofício, não fusão de pessoas.

## Catálogo (todos os títulos, por tema)

${themeBlocks || '_Catálogo vazio — correr \`node scripts/build-amyr-klink-catalog.js\`._'}

${seed.id ? `## Vídeo âncora (embed)\n\n@youtube ${seed.id}\n` : ''}

## Como usar no site

1. [Vídeos · Amyr](${videosHub}) — só o pai.  
2. [Vídeos · Tamara](${familiaHub}) — filha **e** pai no mesmo filtro.  
3. Pessoa: [${pessoa}](${pessoa}).  
4. [Faça o melhor!](${mantra}).

## Status

**Aprovado** — canal **Amyr Klink** catalogado ao lado da Tamara; pessoa continua no Legado Cap. 7.

[▶ Vídeos Amyr](${videosHub}) · [▶ Vídeos família](${familiaHub}) · [▶ Pessoa Amyr](${pessoa}) · [▶ Canais](${hub})
`;

  const contentEn = `## Scope

Editorial inspection of **[${ch.channelName || 'Amyr Klink'}](${ch.channelUrl || 'https://www.youtube.com/@amyrklinkoficial'})**. Person sheet [${pessoa}](${pessoa}) stays distinct. Videos sit **next to** [Tamara](${tamaraCanal}) in [Videos · Tamara](${familiaHub}).

## Status

**Approved** — Amyr channel catalogued beside his daughter.
`;

  const contentEs = `## Alcance

Inspección de **[${ch.channelName || 'Amyr Klink'}](${ch.channelUrl || 'https://www.youtube.com/@amyrklinkoficial'})**. La ficha de persona [${pessoa}](${pessoa}) sigue aparte. Los vídeos quedan **junto** a [Tamara](${tamaraCanal}) en [Vídeos · Tamara](${familiaHub}).

## Estado

**Aprobado** — canal Amyr catalogado junto a su hija.
`;

  return {
    body,
    contentEn,
    contentEs,
    seedId: seed.id,
    wiki: ch.channelUrl,
    count
  };
}

function buildAmyrCanalPost(seriesOrder) {
  const { body, contentEn, contentEs, seedId, wiki, count } = buildAmyrCanalBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 14;
  return artePost({
    title: 'Inspeção: canal Amyr Klink — ofício do pai, junto da Tamara',
    titleEn: 'Inspection: Amyr Klink channel — father’s craft, next to Tamara',
    titleEs: 'Inspección: canal Amyr Klink — oficio del padre, junto a Tamara',
    excerpt:
      'Canais: Amyr Klink (@amyrklinkoficial) — catálogo YouTube do pai; no hub aparece junto dos vídeos da Tamara.',
    excerptEn:
      'Channels: Amyr Klink (@amyrklinkoficial) — father’s YouTube catalog; in the hub it sits with Tamara’s videos.',
    excerptEs:
      'Canales: Amyr Klink (@amyrklinkoficial) — catálogo YouTube del padre; en el hub aparece junto a Tamara.',
    slug: 'inspecao-canal-amyrklink',
    date: '2026-08-18T08:35:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Amyr Klink · Canais',
    coverImage: '/imagens/inspecoes/amyr-klink-cover.jpg',
    sourceUrl: wiki || 'https://www.youtube.com/@amyrklinkoficial',
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAmyrCanalPost,
  buildAmyrCanalBodies
};
