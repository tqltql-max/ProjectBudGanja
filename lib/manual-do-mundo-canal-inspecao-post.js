'use strict';

/**
 * Inspeção Canais · Manual do Mundo (@manualdomundo).
 * Destaque editorial: Manual Maker. Pessoa ≠ canal: Iberê Thenório.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./manual-do-mundo-categories.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'manualdomundo.json'), 'utf8')
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
    series: opts.series || 'canal-manual-do-mundo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Manual do Mundo · Canais',
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
  return String(title || '')
    .replace(/\[/g, '\\[')
    .replace(/\|/g, ' ');
}

function pickSeed(videos) {
  const list = videos || [];
  return (
    list.find((v) => v.category === 'maker' && /arduino/i.test(v.title || '')) ||
    list.find((v) => v.category === 'maker') ||
    list.find((v) => /pasta de dente de elefante/i.test(v.title || '')) ||
    list.find((v) => v.category === 'recorde') ||
    list.find((v) => v.category === 'experiencia') ||
    list[0] || { id: '', title: 'Manual do Mundo' }
  );
}

function catTable(ch) {
  const counts = {};
  (ch.videos || []).forEach((v) => {
    const id = v.category || 'outros';
    counts[id] = (counts[id] || 0) + 1;
  });
  const rows = CATEGORIES.filter((c) => counts[c.id])
    .map((c) => {
      const mark = c.id === 'maker' ? ' **(destaque)**' : '';
      return '| **' + c.label + '**' + mark + ' | ' + counts[c.id] + ' |';
    })
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

function buildManualDoMundoCanalBodies(ch) {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=manualdomundo';
  const makerHub = '/videos/?channel=manualdomundo&series=maker';
  const makerFicha = '/posts/post-inspecao-manual-maker.html';
  const ibere = '/posts/post-inspecao-ibere-thenorio.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const crianca = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const slivki = '/posts/post-inspecao-canal-slivki.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiCanal = 'https://pt.wikipedia.org/wiki/Manual_do_Mundo';
  const site = 'https://www.manualdomundo.com.br';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Manual do Mundo';
  const handle = ch.handle || '@manualdomundo';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@manualdomundo';
  const channelId = ch.channelId || 'UCzBTlYfHYMwVEru4hmLM8hg';
  const makerN = (ch.videos || []).filter((v) => v.category === 'maker').length;
  const makerList = meritSamples(ch, 'maker', 8);
  const exp = meritSamples(ch, 'experiencia', 4);
  const rec = meritSamples(ch, 'recorde', 4);

  const body = `## Escopo

Inspeção **[especial](${especial})** do canal **[${name}](${channelUrl})** (${handle}) — arquivo brasileiro de **ciência, experiências e ofício maker** no ecrã. O recorte BudGanja **destaca o [Manual Maker](${makerFicha})**: aulas de Arduino, impressão 3D e corte a laser **no mesmo canal** — não é loja nem canal à parte. A pessoa cofundadora é **[Iberê Thenório](${ibere})**. **Pessoa ≠ canal. Maker ≠ loja.**

> **Nota metodológica:** auditoria independente. Catálogo em [Vídeos · Manual do Mundo](${videosHub}) (**${count}** vídeos; filtro [Manual Maker](${makerHub}): **${makerN}**). Fontes: [canal](${channelUrl}), [Wikipédia · Manual do Mundo](${wikiCanal}), [site](${site}). Crédito: Manual do Mundo / Iberê Thenório e Mariana Fulfaro — **sem afiliação**. Catalogar ≠ endosso de cada experiência (há [risco](${risco}) de palco: explosão, electricidade, química). Ficha ≠ protocolo de laboratório nem guia de «faz em casa». **manualmaker.com.br** (loja alheia) **não** é este projecto.

## Destaque — Manual Maker

O laboratório **não** trata o Maker como mais um recorte de «como fazer». É a **formação prática** deste arquivo: Arduino, 3D, laser, cultura maker. Ficha própria: **[Manual Maker](${makerFicha})**.

${makerList || '_—_'}

**H-destaque:** o Maker tira o canal do palco de recorde e põe-no no mapa de **ofício** — [respeito](${respeito}) ao trabalho de quem ensina a construir, não só a explodir. Distinto de [MovReCam](${movrecam}) (extensão académica) e de [Slivki](${slivki}) (experiência visual EN).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| URL | [${channelUrl}](${channelUrl}) |
| Recorte | Canal **PT-BR** — ciência e tecnologia no ecrã; cofundado em 2008 |
| Missão (leitura BudGanja) | ${ch.mission || 'Ciência e tecnologia em português, no ecrã. Destaque: Manual Maker. Pessoa ≠ canal.'} |
| Itens no catálogo | **${count}** |
| Destaque | [Manual Maker](${makerFicha}) · **${makerN}** vídeos |
| Pessoa | [Iberê Thenório](${ibere}) — **pessoa ≠ canal** |
| Site | [${site}](${site}) |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **ciência / maker** · Canais · inspeção [especial](${especial}) |
| Elo Palavras | [especial](${especial}) · [respeito](${respeito}) · [risco](${risco}) · [verdade](${verdade}) · [Toda criança nasce cientista](${crianca}) |
| Hub vídeos | [Vídeos · Manual do Mundo](${videosHub}) · [filtro Maker](${makerHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito **especial** deste recorte **não** é só o volume de experiências — é o [Manual Maker](${makerFicha}) como ofício ensinável.  
**H2:** experiências, recordes e «como fazer» são o **corpo** histórico do canal; o Maker é o **foco** desta inspeção.  
**H3:** pasta de dente de elefante e torres de palito são **títulos de ecrã** — [verdade](${verdade}) de palco, não paper.  
**H4:** o canal **não** entra no mesmo contrato que [MovReCam](${movrecam}) (aula UNIFESP) nem [Slivki](${slivki}) (life hack EN).  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte é nomear o Maker **sem** apagar o [risco](${risco}) das demos.

## Mérito — o que o canal faz (além do destaque)

| Formato | Porquê conta |
|---------|----------------|
| **Manual Maker** | Aulas de Arduino, 3D, laser — literacia de ofício, não unboxing |
| **Experiências** | Química e física no ecrã — entretenimento ≠ protocolo de lab |
| **Recordes** | Guinness, «maior do mundo», palco — arquivo de feito, não laudo |
| **Como fazer** | Passo a passo — ofício caseiro; [risco](${risco}) fica à vista |
| **Explicações** | Porquê / como funciona — literacia, não paper |
| **Cortes** | Recortes curtos do arquivo — satélite, não o núcleo |
| **Canal / bastidores** | Iberê, Mari, inscritos — voz do projecto, não a ficha de pessoa |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

### Amostra · Experiências

${exp || '_—_'}

### Amostra · Recordes

${rec || '_—_'}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || '—'}\` |
| Nota | Porta de entrada; o Maker filtra-se em [Vídeos · Maker](${makerHub}) |

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Iberê Thenório](${ibere}) | **Pessoa** — jornalista, cofundador; esta página é o canal |
| [Manual Maker](${makerFicha}) | **Destaque** — curso no mesmo canal, não loja |
| [especial](${especial}) | Esta entrega: inspeção especial de canal + pessoa + ofício |
| [Toda criança nasce cientista](${crianca}) | Elo de vocação — ecrã de ciência BR |
| [MovReCam](${movrecam}) | Outro arquivo de ciência; extensão ≠ palco de experiências |

## Como usar no site

1. Abrir o destaque: [Vídeos · Manual Maker](${makerHub}).  
2. Ler a [ficha do Maker](${makerFicha}) e a [ficha de Iberê](${ibere}).  
3. Só depois, se quiseres o arquivo geral, [Vídeos · Manual do Mundo](${videosHub}).  
4. Cruzar com [risco](${risco}) (demos) e [Toda criança nasce cientista](${crianca}).  
5. Fechar com [Valeu !!!](${mantra}).

## Status

**Aprovado** — canal **${name}** (${handle}) documentado como inspeção **[especial](${especial})**; ${count} vídeos classificados; **destaque [Manual Maker](${makerFicha})** (${makerN} peças). Pessoa ≠ canal. Maker ≠ loja. Indexar ≠ endosso de cada experiência.

[▶ Vídeos · Maker](${makerHub}) · [▶ Manual Maker](${makerFicha}) · [▶ Iberê](${ibere}) · [▶ Canal](${videosHub}) · [▶ Canais](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**[Special](${especial})** inspection of **[${name}](${channelUrl})** (${handle}) — Brazilian science-and-tech archive. The BudGanja cut **highlights [Manual Maker](${makerFicha})** (Arduino, 3D, laser — same channel, not a shop). Person sheet: **[Iberê Thenório](${ibere})**. Catalog: [Videos](${videosHub}) (**${count}**); Maker filter: [series=maker](${makerHub}) (**${makerN}**). Cataloguing ≠ endorsement of every demo.

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Status

**Approved** — special channel sheet; Maker is the craft highlight; person ≠ channel.

[▶ Maker](${makerHub}) · [▶ Person](${ibere})
`;

  const contentEs = `## Alcance

Inspección **[especial](${especial})** de **[${name}](${channelUrl})** (${handle}) — archivo BR de ciencia y tecnología. El recorte BudGanja **destaca [Manual Maker](${makerFicha})** (Arduino, 3D, láser — el mismo canal, no una tienda). Persona: **[Iberê Thenório](${ibere})**. Catálogo: [Vídeos](${videosHub}) (**${count}**); filtro Maker: [series=maker](${makerHub}) (**${makerN}**). Indexar ≠ respaldar cada demo.

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Estado

**Aprobada** — ficha especial de canal; Maker es el ofício; persona ≠ canal.

[▶ Maker](${makerHub}) · [▶ Persona](${ibere})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: channelUrl, count };
}

function buildManualDoMundoCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildManualDoMundoCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 19;
  return artePost({
    title: 'Inspeção: canal Manual do Mundo — ciência no ecrã e o Manual Maker',
    titleEn: 'Inspection: Manual do Mundo channel — science on screen and Manual Maker',
    titleEs: 'Inspección: canal Manual do Mundo — ciencia en pantalla y Manual Maker',
    excerpt:
      'Canais (especial): Manual do Mundo (@manualdomundo) — arquivo BR de ciência e experiências; destaque Manual Maker (Arduino, 3D, laser). Pessoa ≠ canal. Hub /videos/?channel=manualdomundo&series=maker.',
    excerptEn:
      'Channels (special): Manual do Mundo (@manualdomundo) — BR science archive; highlight Manual Maker (Arduino, 3D, laser). Person ≠ channel. Hub /videos/?channel=manualdomundo&series=maker.',
    excerptEs:
      'Canales (especial): Manual do Mundo (@manualdomundo) — archivo BR de ciencia; destaque Manual Maker (Arduino, 3D, láser). Persona ≠ canal. Hub /videos/?channel=manualdomundo&series=maker.',
    slug: 'inspecao-canal-manual-do-mundo',
    date: '2026-08-21T17:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Manual do Mundo · Canais',
    coverImage: '/imagens/inspecoes/manual-do-mundo-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildManualDoMundoCanalPost,
  buildManualDoMundoCanalBodies,
  loadCatalog
};
