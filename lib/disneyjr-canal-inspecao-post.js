'use strict';

/**
 * Inspeção Canais · Disney Jr. Brasil — desenhos e elo Moana / oceano.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'disneyjrbr.json'), 'utf8')
    );
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
    series: opts.series || 'canal-disneyjr',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Canais',
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

function buildDisneyJrBodies(ch) {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=disneyjr';
  const moana = '/posts/post-inspecao-filme-moana.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const elza = '/posts/post-inspecao-desenho-elza-frozen.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const disneyVevo = 'https://www.youtube.com/@DisneyMusicVEVO';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const seedId = ch.seedVideoId || '0u1w_A8J6Hw';
  const seed =
    (ch.videos || []).find((v) => v.id === seedId) || {
      id: seedId,
      title: 'Aqui no mar | com letra | A Pequena Sereia'
    };
  const yt = 'https://www.youtube.com/watch?v=' + seed.id;
  const count = ch.videoCount || (ch.videos || []).length;
  const oceanHits = (ch.videos || []).filter((v) =>
    /moana|vaiana|sereia|ariel|mar\b|oceano|navega/i.test(v.title || '')
  );

  const body = `## Escopo

Inspeção editorial do canal **[${ch.channelName}](${ch.channelUrl})** (${ch.handle}) — arquivo oficial de **desenhos** Disney Jr. em português. No laboratório BudGanja entra como **hub de Artes · desenho infantil**: músicas com letra, episódios e clipes que conversam com a ficha [Moana](${moana}) (oceano, vocação, ilha) e com o léxico [mar](${mar}) / [navegar](${navegar}) / [caminho](${caminho}).

> **Nota metodológica:** auditoria independente. Catálogo espelhado em [Vídeos · Disney Jr.](${videosHub}) (${count} itens recentes no hub — o canal YouTube tem milhares; o laboratório **não** inventaria tudo). Crédito: Disney Jr. Brasil / The Walt Disney Company — **sem afiliação**. Ficha ≠ guia parental completo nem endosso de marca. Âncora editorial: **«Aqui no mar»** ([Pequena Sereia](${yt})) — desenho clássico do oceano que liga o canal à rede Moana.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${ch.channelName}** (${ch.handle}) |
| Channel ID | \`${ch.channelId}\` |
| URL | [${ch.channelUrl}](${ch.channelUrl}) |
| Missão (leitura BudGanja) | ${ch.mission || 'Desenhos e músicas infantis Disney Jr. em PT'} |
| Itens no hub | **${count}** (recorte recente + âncora) |
| Vídeo âncora | [${seed.title}](${yt}) |
| Tipo BudGanja | Canal — **desenhos** · Artes lúdica · elo Moana |
| Elo Artes | [Moana (2016)](${moana}) · [Elza / Frozen](${elza}) · [Divertida Mente](${divertida}) · [Alice](${alice}) |
| Elo Palavras | [mar](${mar}) · [navegar](${navegar}) · [caminho](${caminho}) |
| Hub vídeos | [Vídeos · Disney Jr.](${videosHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o canal oficial concentra **desenhos** acessíveis em PT — literacia lúdica, não protocolo clínico.  
**H2:** a âncora «Aqui no mar» (Pequena Sereia) e a ficha [Moana](${moana}) partilham o eixo **oceano / coragem / sair da praia segura**.  
**H3:** no hub, séries leves (\`sereia\`, \`moana\`, \`musica\`, …) ajudam a filtrar sem confundir com MovReCam/CANABinALL.  
**H4:** [Elza / Frozen](${elza}) é outro desenho Disney no laboratório — gelo × porta — mas a canção *Let It Go* vive em [DisneyMusicVEVO](${disneyVevo}) / [VEVO](${vevo}), **não** neste canal Jr.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor cuidado possível *nesta* idade e *neste* ecrã, com [Vida](${vida}).

## Relação com os desenhos BudGanja

| Obra / eixo | Papel |
|-------------|-------|
| [Moana](${moana}) | Desenho 2016 — oceano, vocação, ilha; irmã cultural da âncora «Aqui no mar» |
| [Elza / Frozen](${elza}) | Desenho 2013 — gelo × porta; **Jr ≠ VEVO** — *Let It Go* está em [DisneyMusicVEVO](${disneyVevo}) |
| Pequena Sereia (clipe âncora) | Música clássica do mar no canal Jr. |
| [Divertida Mente](${divertida}) | Outra animação Disney/Pixar já inspecionada (emoção) |
| [Alice](${alice}) | Travessia / mapa — par cultural leve |
| [mar](${mar}) · [navegar](${navegar}) | Léxico oceânico do laboratório |

${
  oceanHits.length
    ? '### Títulos oceânicos no recorte do hub\n\n' +
      oceanHits
        .slice(0, 12)
        .map(
          (v) =>
            '- [' +
            String(v.title).replace(/\[/g, '\\[') +
            '](https://www.youtube.com/watch?v=' +
            v.id +
            ')'
        )
        .join('\n')
    : '_Nenhum título oceânico extra além da âncora no recorte actual — actualizar catálogo se surgirem._'
}

## Vídeo âncora (embed)

@youtube ${seed.id}

| Campo | Valor |
|-------|-------|
| Título | ${seed.title} |
| ID | \`${seed.id}\` |
| Nota | Entrada para desenhos × oceano; cruzar com [Moana](${moana}) |

## Como usar no site

1. Abrir [Vídeos · Disney Jr.](${videosHub}).  
2. Filtrar séries (\`sereia\`, \`musica\`, …) quando disponíveis.  
3. Ler a ficha [Moana](${moana}) para a tese artes do oceano; a ficha [Elza](${elza}) para o gelo (canção no [VEVO](${vevo}), não aqui).  
4. Fechar com [Valeu !!!](${mantra}) e [Vida](${vida}).

## Status

**Aprovado** — canal **Disney Jr. Brasil** documentado como hub de **desenhos** no BudGanja; âncora «Aqui no mar»; elos [Moana](${moana}) (mar) e [Elza](${elza}) (gelo; clipe no VEVO).

[▶ Vídeos Disney Jr.](${videosHub}) · [▶ Moana](${moana}) · [▶ Elza](${elza}) · [▶ Mar](${mar}) · [▶ Canais](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${ch.channelName}](${ch.channelUrl})** (${ch.handle}) — official **cartoon** archive in Portuguese. BudGanja hub for Arts · kids animation; links [Moana](${moana}), [Elsa / Frozen](${elza}), [mar](${mar}), [navegar](${navegar}). *Let It Go* lives on DisneyMusicVEVO, not this Jr channel.

Anchor: **“Aqui no mar”** (Little Mermaid) — @youtube ${seed.id}

## Status

**Approved** — Disney Jr. Brasil as desenho channel; sister sheets [Moana](${moana}) and [Elsa](${elza}).

[▶ Videos](${videosHub}) · [▶ Moana](${moana}) · [▶ Elsa](${elza})
`;

  const contentEs = `## Alcance

Inspección de **[${ch.channelName}](${ch.channelUrl})** (${ch.handle}) — archivo oficial de **dibujos** en portugués. Hub BudGanja de Artes · animación infantil; vínculos [Moana](${moana}), [Elza / Frozen](${elza}), [mar](${mar}), [navegar](${navegar}). *Let It Go* vive en DisneyMusicVEVO, no en este canal Jr.

Ancla: **«Aqui no mar»** (La Sirenita) — @youtube ${seed.id}

## Estado

**Aprobada** — Disney Jr. Brasil como canal de desenhos; hermanas [Moana](${moana}) y [Elza](${elza}).

[▶ Videos](${videosHub}) · [▶ Moana](${moana}) · [▶ Elza](${elza})
`;

  return { body, contentEn, contentEs, seedId, wiki: ch.channelUrl, count };
}

function buildDisneyJrCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildDisneyJrBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 12;
  return artePost({
    title: 'Inspeção: canal Disney Jr. Brasil — desenhos e o oceano',
    titleEn: 'Inspection: Disney Jr. Brasil channel — cartoons and the ocean',
    titleEs: 'Inspección: canal Disney Jr. Brasil — dibujos y el océano',
    excerpt:
      'Canais: Disney Jr. Brasil (@disneyjrbr) — desenhos em PT; âncora «Aqui no mar»; elo Moana / mar / navegar.',
    excerptEn:
      'Channels: Disney Jr. Brasil (@disneyjrbr) — PT cartoons; anchor “Aqui no mar”; link Moana / mar / navegar.',
    excerptEs:
      'Canales: Disney Jr. Brasil (@disneyjrbr) — dibujos en PT; ancla «Aqui no mar»; vínculo Moana / mar / navegar.',
    slug: 'inspecao-canal-disneyjr',
    date: '2026-08-03T23:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Disney Jr. · Canais',
    coverImage: '/imagens/inspecoes/disneyjr-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDisneyJrCanalPost,
  buildDisneyJrBodies
};
