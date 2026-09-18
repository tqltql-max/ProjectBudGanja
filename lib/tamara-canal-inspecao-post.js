'use strict';

/**
 * Inspeção Canais · Tamara Klink — arquivo YouTube @TamaraKlink.
 * Pessoa (legado) ≠ canal (vídeos). Indexar ≠ endossar.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES, categorizeTitle } = require('./tamara-categories.js');
const { FAMILY_SERIES, familyTagsFromTitle } = require('./klink-family.js');

const QNA_ID = 'V3GSlr5sp7c';
const QNA_TITLE = 'Q&A · Bom dia, Inverno';

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'tamaraklink.json'), 'utf8')
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
    series: opts.series || 'canal-tamaraklink',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Tamara Klink · Canais',
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
  return String(title || '').replace(/\[/g, '\\[');
}

function videoLine(v) {
  return '- [' + mdTitle(v.title) + '](https://www.youtube.com/watch?v=' + v.id + ')';
}

function videosByCategory(ch) {
  const groups = {};
  (ch.videos || []).forEach((v) => {
    const id = v.category || categorizeTitle(v.title);
    if (!groups[id]) groups[id] = [];
    groups[id].push(v);
  });
  return groups;
}

function catTable(groups) {
  const rows = CATEGORIES.filter((c) => (groups[c.id] || []).length)
    .map((c) => '| **' + c.label + '** | ' + groups[c.id].length + ' |')
    .join('\n');
  return rows || '| — | 0 |';
}

function fullLists(groups) {
  return CATEGORIES.filter((c) => (groups[c.id] || []).length)
    .map((c) => {
      const lines = groups[c.id].map(videoLine).join('\n');
      return '### ' + c.label + ' (' + groups[c.id].length + ')\n\n' + lines;
    })
    .join('\n\n');
}

function familyLists(ch) {
  const buckets = {};
  FAMILY_SERIES.forEach((c) => {
    buckets[c.id] = [];
  });
  (ch.videos || []).forEach((v) => {
    familyTagsFromTitle(v.title).forEach((id) => {
      if (!buckets[id]) buckets[id] = [];
      buckets[id].push(v);
    });
  });
  return FAMILY_SERIES.filter((c) => (buckets[c.id] || []).length)
    .map((c) => {
      const lines = buckets[c.id].map(videoLine).join('\n');
      return '### ' + c.label + ' (' + buckets[c.id].length + ')\n\n' + lines;
    })
    .join('\n\n');
}

function paiCatalogList() {
  try {
    const pai = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'amyrklinkoficial.json'), 'utf8')
    );
    return {
      count: pai.videoCount || (pai.videos || []).length,
      list: (pai.videos || []).map(videoLine).join('\n')
    };
  } catch (e) {
    return { count: 0, list: '' };
  }
}

function pickSeed(videos) {
  const list = videos || [];
  return (
    list.find((v) => v.id === 'LEdJ7WrMu1Y') ||
    list.find((v) => /noroeste|northwest\s*passage/i.test(v.title || '')) ||
    list.find((v) => /atl[aâ]ntico em solit/i.test(v.title || '')) ||
    list[0] || { id: '', title: 'Tamara Klink' }
  );
}

function buildTamaraCanalBodies(ch) {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=tamara';
  const pessoa = '/posts/post-inspecao-tamara-klink.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const amyrCanal = '/posts/post-inspecao-canal-amyrklink.html';
  const paiHub = '/videos/?channel=amyr';
  const inverno = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const solitario = '/posts/post-inspecao-palavra-solitario.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/vida/';
  const qna = 'https://www.youtube.com/watch?v=' + QNA_ID;
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const groups = videosByCategory(ch);
  const familyBlock = familyLists(ch);
  const paiCat = paiCatalogList();

  const body = `## Escopo

Inspeção editorial do canal **[${ch.channelName || 'Tamara Klink'}](${ch.channelUrl})** (${ch.handle || '@TamaraKlink'}) — arquivo público de travessias, ofício náutico e léxico. No laboratório BudGanja entra como **hub de Canais · vídeos**, **junto da família** que os títulos nomeiam. A ficha de **pessoa / legado** continua em [Tamara Klink](${pessoa}) (Cap. 8, junto do [pai](${amyr})).

> **Nota metodológica:** auditoria independente. Catálogo em [Vídeos · Tamara](${videosHub}) (**${count}** itens dela; o filtro junta o canal do pai). Crédito: Tamara Klink — **sem afiliação**. Catalogar ≠ endosso. **Pessoa ≠ canal.** Não se inventa vida privada. Avó **Ana Francesca** nomeou o barco *Sardinha* (fontes públicas). Âncora já usada no laboratório: [Q&A · Bom dia, Inverno](${qna}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${ch.channelName || 'Tamara Klink'}** (${ch.handle || '@TamaraKlink'}) |
| Channel ID | \`${ch.channelId || 'UCEmA3ihgSq4BQL3slf3v7Qw'}\` |
| URL | [${ch.channelUrl || 'https://www.youtube.com/@TamaraKlink'}](${ch.channelUrl || 'https://www.youtube.com/@TamaraKlink'}) |
| Missão (leitura BudGanja) | ${ch.mission || 'Velejo, inverno e escrevo — arquivo público de travessias, ofício e léxico.'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora (canal) | [${mdTitle(seed.title || '—')}](${yt}) |
| Q&A do laboratório | [${QNA_TITLE}](${qna}) |
| Tipo BudGanja | Canal — **vídeos** · Artes / Vida · distinto da ficha de pessoa |
| Pai (canal, visto junto) | [Amyr Klink](${amyrCanal}) — **${paiCat.count}** vídeos em [Vídeos · Amyr](${paiHub}) |
| Avó / barco | **Ana Francesca** nomeou o *Sardinha* |
| Mãe / irmãs | Marina Bandeira Klink; gémea Laura; irmã Marina Helena — só quando o título as nomeia |
| Elo obra | [*Bom dia, Inverno*](${inverno}) |
| Elo Palavras | [mar](${mar}) · [navegar](${navegar}) · [caminho](${caminho}) · [solitário](${solitario}) · [risco](${risco}) |
| Hub vídeos | [Vídeos · Tamara](${videosHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o canal documenta **ofício** (barco, rota, gelo, léxico) — não substitui a ficha de legado.  
**H2:** a família entra **quando o vídeo a nomeia**; o *Sardinha* é crédito da avó Ana Francesca.  
**H3:** o canal [Amyr](${amyrCanal}) fica **ao lado**; em [Tamara](${videosHub}) os vídeos do pai aparecem juntos.  
**H4:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte possível *deste* arquivo *neste* laboratório, com [Vida](${vida}).

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Tamara Klink](${pessoa}) | Pessoa / legado — feitos, livros, mérito. **Não** é esta página |
| [Amyr Klink](${amyr}) | Pai · Cap. 7 — continuidade de ofício, não fusão de pessoas |
| [Canal Amyr](${amyrCanal}) | Arquivo YouTube do pai — **junto** em [Vídeos · Tamara](${videosHub}) |
| [*Bom dia, Inverno*](${inverno}) | Livro da invernagem — irmão editorial do arquivo de gelo |
| [mar](${mar}) · [navegar](${navegar}) · [caminho](${caminho}) | Léxico que o canal torna visível |

## Família nos títulos

Só o que o **título** público nomeia. Avó Ana Francesca: nome do *Sardinha*.

${familyBlock || '_Nenhuma menção familiar nos títulos actuais._'}

## Pai — catálogo @amyrklinkoficial (${paiCat.count} vídeos)

Ficha do canal: [Amyr Klink · Canais](${amyrCanal}). No hub, estes itens entram com os da Tamara.

${paiCat.list || '_Correr `node scripts/build-amyr-klink-catalog.js`._'}

## Catálogo classificado (${count} vídeos)

Temas só pelo **título** público. Indexar ≠ endossar.

| Tema | Vídeos |
|------|--------|
${catTable(groups)}

## Arquivo completo

Lista integral do canal, agrupada por tema. Cada linha é um vídeo — não uma ficha de pessoa.

${fullLists(groups)}

## Vídeo âncora do canal (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title || '—')} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o arquivo de travessias; filtrar o resto em [Vídeos · Tamara](${videosHub}) |

## Q&A do laboratório (embed)

Já usado nas fichas de [*Bom dia, Inverno*](${inverno}) e no léxico do gelo. Pode não aparecer na grelha \`/videos\` do canal se o YouTube o listar fora da página de uploads.

@youtube ${QNA_ID}

| Campo | Valor |
|-------|-------|
| Título | ${QNA_TITLE} |
| ID | \`${QNA_ID}\` |
| URL | [${qna}](${qna}) |

## Como usar no site

1. Abrir [Vídeos · Tamara](${videosHub}).  
2. Filtrar por tema (Noroeste, Ártico, invernagem, léxico, barco…).  
3. Quando o **título** nomear família: \`familia-avo\` (Sardinha / vovó), \`familia-pai\`, \`familia-mae\`, \`familia-irmas\` — só o que o ecrã escreve, sem inventar vida privada.  
4. Ler a ficha de [pessoa](${pessoa}) quando o objecto for legado, não ecrã.  
5. Cruzar com [*Bom dia, Inverno*](${inverno}) e o [Q&A](${qna}).  
6. Fechar com [Faça o melhor!](${mantra}) e [Vida](${vida}).

## Status

**Aprovado** — canal **Tamara Klink** documentado como hub de **vídeos** no BudGanja; ${count} uploads classificados por tema; âncora de canal «${mdTitle(seed.title || '')}»; âncora de laboratório [Q&A · Bom dia, Inverno](${qna}). Distinto da ficha de [pessoa](${pessoa}).

[▶ Vídeos · Tamara](${videosHub}) · [▶ Tamara · legado](${pessoa}) · [▶ Bom dia, Inverno](${inverno}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${ch.channelName || 'Tamara Klink'}](${ch.channelUrl})** (${ch.handle || '@TamaraKlink'}) — public archive of crossings, craft and lexicon. Lives on [Videos · Tamara](${videosHub}) (${count} uploads tagged by title theme). Distinct from the **person / legacy** sheet [Tamara Klink](${pessoa}).

Lab Q&A already in use: **${QNA_TITLE}** — @youtube ${QNA_ID}

Channel seed: **${mdTitle(seed.title || 'Tamara Klink')}** — @youtube ${seed.id || ''}

> Independent audit. Cataloguing ≠ endorsement. Person ≠ channel. No private life invented.

## Status

**Approved** — Tamara Klink as video channel; ${count} titles listed by theme; sister sheet [Tamara · legacy](${pessoa}).

[▶ Videos](${videosHub}) · [▶ Person](${pessoa})
`;

  const contentEs = `## Alcance

Inspección de **[${ch.channelName || 'Tamara Klink'}](${ch.channelUrl})** (${ch.handle || '@TamaraKlink'}) — archivo público de travesías, oficio y léxico. Vive en [Videos · Tamara](${videosHub}) (${count} subidas por tema de título). Distinta de la ficha de **persona / legado** [Tamara Klink](${pessoa}).

Q&A del laboratorio: **${QNA_TITLE}** — @youtube ${QNA_ID}

Ancla del canal: **${mdTitle(seed.title || 'Tamara Klink')}** — @youtube ${seed.id || ''}

> Auditoría independiente. Catalogar ≠ respaldo. Persona ≠ canal. No se inventa vida privada.

## Estado

**Aprobada** — Tamara Klink como canal de vídeos; ${count} títulos por tema; hermana [Tamara · legado](${pessoa}).

[▶ Videos](${videosHub}) · [▶ Persona](${pessoa})
`;

  return { body, contentEn, contentEs, seedId: seed.id || QNA_ID, wiki: ch.channelUrl, count };
}

function buildTamaraCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildTamaraCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 13;
  return artePost({
    title: 'Inspeção: canal Tamara Klink — arquivo de travessias e léxico',
    titleEn: 'Inspection: Tamara Klink channel — archive of crossings and lexicon',
    titleEs: 'Inspección: canal Tamara Klink — archivo de travesías y léxico',
    excerpt:
      'Canais: Tamara Klink (@TamaraKlink) — catálogo YouTube; avó Ana Francesca nomeou o Sardinha; pai Amyr junto no hub.',
    excerptEn:
      'Channels: Tamara Klink (@TamaraKlink) — YouTube catalog; grandmother Ana Francesca named Sardinha; father Amyr beside her in the hub.',
    excerptEs:
      'Canales: Tamara Klink (@TamaraKlink) — catálogo YouTube; la abuela Ana Francesca nombró el Sardinha; el padre Amyr junto en el hub.',
    slug: 'inspecao-canal-tamaraklink',
    date: '2026-08-18T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Tamara Klink · Canais',
    coverImage: 'imagens/inspecoes/tamara-klink-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTamaraCanalPost,
  buildTamaraCanalBodies,
  loadCatalog
};
