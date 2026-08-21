'use strict';

/**
 * Inspeção Canais · Richard Rasmussen Selvagem — arquivo de fauna e expedições.
 * Pessoa ≠ canal: legado em post-inspecao-richard-rasmussen.html.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./rasmussen-categories.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'richardrasmussenselvagem.json'), 'utf8')
    );
  } catch (e) {
    return { videos: [], categories: [], videoCount: 0 };
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
    series: opts.series || 'canal-richard-rasmussen',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Richard Rasmussen · Canais',
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

function mdTitle(title) {
  return String(title || '').replace(/\[/g, '\\[').replace(/\|/g, ' ');
}

function pickSeed(videos) {
  const list = videos || [];
  return (
    list.find((v) => /pororoca/i.test(v.title || '') && /amaz/i.test(v.title || '')) ||
    list.find((v) => v.category === 'expedicao') ||
    list.find((v) => v.category === 'serpentes') ||
    list[0] || { id: '', title: 'Richard Rasmussen' }
  );
}

function catTable(ch) {
  const counts = {};
  (ch.videos || []).forEach((v) => {
    const id = v.category || 'outros';
    counts[id] = (counts[id] || 0) + 1;
  });
  const rows = CATEGORIES.filter((c) => counts[c.id])
    .map((c) => '| **' + c.label + '** | ' + counts[c.id] + ' |')
    .join('\n');
  return rows || '| — | 0 |';
}

function meritSamples(ch, id, n) {
  return (ch.videos || [])
    .filter((v) => v.category === id)
    .slice(0, n || 5)
    .map((v) => '- [' + mdTitle(v.title) + '](https://www.youtube.com/watch?v=' + v.id + ')')
    .join('\n');
}

function buildRasmussenCanalBodies(ch) {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=rasmussen';
  const pessoa = '/posts/post-inspecao-richard-rasmussen.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const animais = '/animais/';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Richard_Rasmussen';
  const site = 'https://www.richardrasmussen.com.br';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Richard Rasmussen';
  const handle = ch.handle || '@RichardRasmussenSelvagem';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@RichardRasmussenSelvagem';
  const channelId = ch.channelId || 'UCEPqq1rv7z3psJ-nCTKI2ig';
  const exped = meritSamples(ch, 'expedicao', 6);
  const serp = meritSamples(ch, 'serpentes', 5);
  const caes = meritSamples(ch, 'caes', 5);

  const body = `## Escopo

Inspeção editorial do canal **[${name}](${channelUrl})** (${handle}) — arquivo público de **fauna, expedições e ofício selvagem** desde **2016**. No laboratório BudGanja entra no hub **[Vídeos](${videosHub})** como canal de natureza — distinto da ficha de **pessoa / legado** [${pessoa}](${pessoa}). O handle leva [selvagem](${selvagem}): a palavra do bosque; o ecrã é o arquivo.

> **Nota metodológica:** auditoria independente. Catálogo em [Vídeos · Rasmussen](${videosHub}) (**${count}** vídeos classificados pelos temas dos títulos). Fontes: [canal YouTube](${channelUrl}), [Wikipédia](${wiki}), [site](${site}). Crédito: Richard Rasmussen — **sem afiliação**. Catalogar ≠ endosso de cada tese (nutrição, política, manejo). **Pessoa ≠ canal.** Ficha ≠ protocolo de fauna nem guia de contacto com animal silvestre.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| URL | [${channelUrl}](${channelUrl}) |
| Desde | **2016** — YouTube próprio após a carreira em TV (Record, SBT, Band, NatGeo, Cultura) |
| Missão (leitura BudGanja) | ${ch.mission || 'Arquivo público de fauna, expedições e ofício selvagem. Pessoa ≠ canal.'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **natureza / fauna** · Vídeos · mérito de ofício no ecrã |
| Ficha pessoa | [Richard Rasmussen · legado](${pessoa}) |
| Elo Palavras | [selvagem](${selvagem}) · [especial](${especial}) · [animal](${animal}) · [risco](${risco}) · [verdade](${verdade}) |
| Elo seres | hub [Animais](${animais}) |
| Hub vídeos | [Vídeos · Rasmussen](${videosHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito do canal **não** é o volume nem o clickbait: é **aproximar fauna ao ecrã BR** — expedição, espécie, habitat — com voz reconhecível.  
**H2:** as **expedições** (Amazónia, Pantanal, Madagascar, Costa Rica…) são o núcleo de ofício; raças de cão, agro e saúde são satélites do mesmo arquivo.  
**H3:** no BudGanja o canal vive em [Vídeos](${videosHub}), filtrável por tema — crédito visível, **sem fundir** com a [pessoa](${pessoa}).  
**H4:** [selvagem](${selvagem}) pede **respeito sem romantizar dano** — esta ficha indexa o arquivo; os limites públicos (multas, controvérsias) ficam na ficha de pessoa.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte possível *deste* arquivo *neste* laboratório.

## Mérito — o que o canal faz bem

O laboratório **classifica** o arquivo pelos temas que os títulos declaram. Não é taxonomia de zoológico: é o ofício de divulgação.

| Formato | Porquê conta |
|---------|----------------|
| **Expedições** | Amazónia, Pantanal, Pororoca, Madagascar — o selvagem *no sítio* |
| **Serpentes / felinos / répteis** | Espécie no ecrã — literacia de fauna, não trophy hunt |
| **Cães e raças** | Companheiro domesticado — contraste com [selvagem](${selvagem}) |
| **Peixes e rios** | Água viva — boto, tilápia, pesca; cruzar com [Animais](${animais}) |
| **Biomas do Brasil** | Habitat nomeado — Amazónia, Pantanal, Cerrado |
| **Mundo selvagem** | Fora do BR — África, Costa Rica, santuários |
| **Richard Recebe** | Conversa em casa — satélite de voz, não núcleo de fauna |
| **Saúde e alimentação** | Linha recente (carne, leite, ovo) — **não** é o ofício selvagem; indexa-se à parte |
| **Campo e gado / criação** | Domesticado e criadouro — estado oposto ao selvagem; [risco](${risco}) à vista |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

### Amostra · Expedições

${exped || '_—_'}

### Amostra · Serpentes

${serp || '_—_'}

### Amostra · Cães e raças

${caes || '_—_'}

## Vídeo âncora (embed)

@youtube ${seed.id || 'BQgTqm7KlEY'}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || 'BQgTqm7KlEY'}\` |
| Nota | Entrada para o ofício (expedição / Amazónia); o resto filtra-se em [Vídeos](${videosHub}) |

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Richard Rasmussen](${pessoa}) | Pessoa / legado — carreira, CRBio, limites públicos. **Não** é esta página |
| [selvagem](${selvagem}) | Palavra do bosque — o handle do canal; anti-romantização de dano |
| [especial](${especial}) | Esta entrega é inspeção **especial** de canal: arquivo + pessoa |
| [animal](${animal}) · [Animais](${animais}) | Ser vivo — livre × companheiro / criação |
| [risco](${risco}) · [verdade](${verdade}) | Contacto com fauna e teses públicas pedem mapa, não romance |

## Como usar no site

1. Abrir [Vídeos · Rasmussen](${videosHub}).  
2. Filtrar pelo tema (Expedições, Serpentes, Biomas, Cães…).  
3. Ler a [ficha de pessoa](${pessoa}) quando o objecto for legado e limites, não o clip.  
4. Cruzar com [selvagem](${selvagem}) e o hub [Animais](${animais}).  
5. Fechar com [Faça o melhor!](${mantra}).

## Status

**Aprovado** — canal **${name}** documentado como hub de **natureza / fauna** no BudGanja; ${count} vídeos classificados pelos temas de título; âncora «${mdTitle(seed.title)}». Distinto da ficha de [pessoa](${pessoa}). Indexar ≠ endosso.

[▶ Vídeos · Rasmussen](${videosHub}) · [▶ Pessoa](${pessoa}) · [▶ Selvagem](${selvagem}) · [▶ Animais](${animais}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${name}](${channelUrl})** (${handle}) — public archive of wildlife, expeditions and wild craft since **2016**. Lives on [Videos](${videosHub}) (${count} videos tagged by title themes). Distinct from the **person** sheet [${pessoa}](${pessoa}). Handle carries [selvagem](${selvagem}) (“wild”). Cataloguing ≠ endorsement of every thesis.

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || 'BQgTqm7KlEY'}

## Status

**Approved** — Rasmussen as nature/wildlife channel; credit due; person sheet holds public limits.

[▶ Videos](${videosHub}) · [▶ Person](${pessoa})
`;

  const contentEs = `## Alcance

Inspección de **[${name}](${channelUrl})** (${handle}) — archivo público de fauna, expediciones y oficio salvaje desde **2016**. Vive en [Vídeos](${videosHub}) (${count} vídeos por temas de título). Distinta de la ficha de **persona** [${pessoa}](${pessoa}). El handle lleva [selvagem](${selvagem}). Indexar ≠ respaldar cada tesis.

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || 'BQgTqm7KlEY'}

## Estado

**Aprobada** — Rasmussen como canal de naturaleza/fauna; crédito debido; la ficha de persona guarda los límites públicos.

[▶ Vídeos](${videosHub}) · [▶ Persona](${pessoa})
`;

  return { body, contentEn, contentEs, seedId: seed.id || 'BQgTqm7KlEY', wiki: channelUrl, count };
}

function buildRasmussenCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildRasmussenCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 16;
  return artePost({
    title: 'Inspeção: canal Richard Rasmussen Selvagem — fauna, expedições e o ecrã',
    titleEn: 'Inspection: Richard Rasmussen Selvagem channel — wildlife, expeditions and the screen',
    titleEs: 'Inspección: canal Richard Rasmussen Selvagem — fauna, expediciones y la pantalla',
    excerpt:
      'Canais: Richard Rasmussen (@RichardRasmussenSelvagem) — arquivo YouTube de fauna e expedições desde 2016; hub /videos; distinto da ficha de pessoa.',
    excerptEn:
      'Channels: Richard Rasmussen (@RichardRasmussenSelvagem) — YouTube wildlife and expedition archive since 2016; /videos hub; distinct from the person sheet.',
    excerptEs:
      'Canales: Richard Rasmussen (@RichardRasmussenSelvagem) — archivo YouTube de fauna y expediciones desde 2016; hub /videos; distinto de la ficha de persona.',
    slug: 'inspecao-canal-richard-rasmussen',
    date: '2026-08-21T14:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Richard Rasmussen · Canais',
    coverImage: '/imagens/inspecoes/richard-rasmussen-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRasmussenCanalPost,
  buildRasmussenCanalBodies,
  loadCatalog
};
