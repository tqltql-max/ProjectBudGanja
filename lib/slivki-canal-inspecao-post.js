'use strict';

/**
 * Inspeção Canais · Slivki Show (@slivkishowen) — experiências visuais.
 * Destaque editorial: Aranha Rodrigo. Aranha ≠ inseto.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./slivki-categories.js');

const ORIGIN_ID = 'fLiiQ71CW5I';
const DESTAQUE_ID = 'VEWy9VgN1cU';

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'slivkishowen.json'), 'utf8')
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
    series: opts.series || 'canal-slivki',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Slivki Show · Canais',
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
    list.find((v) => v.id === DESTAQUE_ID) ||
    list.find((v) => v.category === 'rodrigo') ||
    list[0] || { id: DESTAQUE_ID, title: 'RODRIGO THE SPIDER VS WILD FOREST INSECTS' }
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
      const mark = c.id === 'rodrigo' ? ' **(destaque)**' : '';
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

function buildSlivkiCanalBodies(ch) {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const videosHub = '/videos/?channel=slivki';
  const rodrigoHub = '/videos/?channel=slivki&series=rodrigo';
  const aranha = '/posts/post-inspecao-animal-aranha-rodrigo.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const animais = '/animais/';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const rasmussen = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const disney = '/posts/post-inspecao-canal-disneyjr.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiSaltic = 'https://pt.wikipedia.org/wiki/Salticidae';
  const wikiShow = 'https://www.wikidata.org/wiki/Q53678212';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Slivki Show';
  const handle = ch.handle || '@slivkishowen';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@slivkishowen';
  const channelId = ch.channelId || 'UC37D-JTE7-V-L-VIrxzzZpQ';
  const rodrigoN = (ch.videos || []).filter((v) => v.category === 'rodrigo').length;
  const rodrigoList = meritSamples(ch, 'rodrigo', 8);
  const life = meritSamples(ch, 'lifehacks', 4);
  const exp = meritSamples(ch, 'experiencias', 4);

  const body = `## Escopo

Inspeção **[especial](${especial})** do canal **[${name}](${channelUrl})** (${handle}) — arquivo inglês de **experiências visuais, life hacks e fauna de ecrã**. O recorte BudGanja **destaca a [Aranha Rodrigo](${aranha})**: saltadora com nome próprio, série curta e mérito de observação — não um extra entre gadgets. O resto do arquivo classifica-se; **não** afoga o destaque.

> **Nota metodológica:** auditoria independente. Catálogo em [Vídeos · Slivki](${videosHub}) (**${count}** vídeos; filtro [Aranha Rodrigo](${rodrigoHub}): **${rodrigoN}**). Fontes: [canal](${channelUrl}), [Wikidata · SlivkiShow](${wikiShow}), [Salticidae](${wikiSaltic}). Crédito: Slivki Show / Yuriy Yaniv — **sem afiliação**. Catalogar ≠ endosso de cada experiência (algumas dizem *must not try at home*). **Aranha ≠ [inseto](${inseto}).** Ficha ≠ protocolo de terrário nem guia de combate entre artrópodes.

## Destaque — Aranha Rodrigo

O laboratório **não** trata Rodrigo como mais um clipe de *satisfying*. É o **ser nomeado** deste arquivo: saltadora (Salticidae), visão aguda, muda, caça. Ficha própria: **[Aranha Rodrigo](${aranha})**.

| Peça da série | Papel |
|---------------|--------|
| [I BEFRIENDED THE SMARTEST SPIDER IN THE WORLD](https://www.youtube.com/watch?v=${ORIGIN_ID}) | Origem — o encontro (dez. 2025) |
| [SOMETHING HAPPENED TO RODRIGO THE SPIDER](https://www.youtube.com/watch?v=mveQcKNw32I) | Muda — o corpo muda de tamanho; não é «acidente de clickbait» |
| [WHAT WILL HAPPEN IF WE SHOW A MIRROR TO THE SMARTEST SPIDER IN THE WORLD?](https://www.youtube.com/watch?v=OhEmVvedf6I) | Espelho — visão de saltadora; **não** é paper de cognição |
| [RODRIGO THE SPIDER VS WILD FOREST INSECTS](https://www.youtube.com/watch?v=${DESTAQUE_ID}) | **Destaque actual** — caça a insetos do bosque; [respeito](${respeito}) ao predador **e** à presa |

${rodrigoList || '_—_'}

**H-destaque:** o nome **Rodrigo** tira a aranha do medo genérico e põe-na no mapa de [animal](${animal}) — com [risco](${risco}) à vista (veneno, palco, *vs*). Distinta da [Joaninha Joana](${joaninha}) (conto Vida) e do [Rasmussen](${rasmussen}) (fauna de expedição).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| URL | [${channelUrl}](${channelUrl}) |
| Recorte | Canal **EN** — não espelha o arquivo principal UA/RU (@slivkishow) |
| Missão (leitura BudGanja) | ${ch.mission || 'Experiências visuais e life hacks; destaque Aranha Rodrigo. Aranha ≠ inseto.'} |
| Itens no catálogo | **${count}** |
| Destaque | [Aranha Rodrigo](${aranha}) · **${rodrigoN}** vídeos |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **experiências / fauna de ecrã** · Canais · inspeção [especial](${especial}) |
| Elo Palavras | [especial](${especial}) · [animal](${animal}) · [inseto](${inseto}) · [respeito](${respeito}) · [risco](${risco}) · [verdade](${verdade}) |
| Elo seres | [Aranha Rodrigo](${aranha}) · hub [Animais](${animais}) |
| Hub vídeos | [Vídeos · Slivki](${videosHub}) · [filtro Rodrigo](${rodrigoHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito **especial** deste recorte **não** é o volume de life hacks — é a [Aranha Rodrigo](${aranha}) como ser observado.  
**H2:** life hacks e gadgets são o **corpo** histórico do canal; Rodrigo é o **foco** desta inspeção.  
**H3:** *smartest spider in the world* é **título de ecrã**, não veredicto científico — [verdade](${verdade}) de recorde, não de paper.  
**H4:** o canal EN **não** entra no mesmo contrato que [MovReCam](/posts/post-inspecao-canal-movrecam.html) (ciência de extensão) nem [Disney Jr.](${disney}) (desenho).  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte é nomear Rodrigo **sem** romantizar a caça.

## Mérito — o que o canal faz (além do destaque)

| Formato | Porquê conta |
|---------|----------------|
| **Aranha Rodrigo** | Nome, muda, visão, caça — literacia de aracnídeo no ecrã |
| **Life hacks** | Ofício histórico do canal — truques; *must not try* fica no [risco](${risco}) |
| **Experiências visuais** | Electricidade, água, palco — entretenimento ≠ protocolo de lab |
| **Gadgets / AliExpress** | Unboxing e listas — arquivo de objectos, não loja BudGanja |
| **Floresta e rações** | MRE / 24 h no bosque — satélite de sobrevivência de ecrã |
| **Terrários / ninhos** | Outra fauna no vidro — satélite de Rodrigo, não o mesmo ser |
| **Cookie (gato)** | Mascote antigo do projecto Slivki — **não** é esta inspeção |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

### Amostra · Life hacks

${life || '_—_'}

### Amostra · Experiências visuais

${exp || '_—_'}

## Vídeo âncora (embed) — destaque Rodrigo

@youtube ${seed.id || DESTAQUE_ID}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || DESTAQUE_ID}\` |
| Nota | Destaque da [Aranha Rodrigo](${aranha}); a série completa filtra-se em [Vídeos · Rodrigo](${rodrigoHub}) |

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Aranha Rodrigo](${aranha}) | **Destaque** — o ser; esta página é o canal |
| [inseto](${inseto}) | Contraste taxonómico — Rodrigo **não** é inseto; as presas do *vs* é que são |
| [especial](${especial}) | Esta entrega: inspeção especial de canal com ser nomeado |
| [respeito](${respeito}) · [animal](${animal}) | Olhar de novo o aracnídeo — sem nojo de classe nem culto do palco |
| [Rasmussen](${rasmussen}) | Outro arquivo de fauna; expedição ≠ terrário de saltadora |

## Como usar no site

1. Abrir o destaque: [Vídeos · Aranha Rodrigo](${rodrigoHub}).  
2. Ler a [ficha do ser](${aranha}).  
3. Só depois, se quiseres o arquivo geral, [Vídeos · Slivki](${videosHub}).  
4. Cruzar com [inseto](${inseto}) (o que Rodrigo **não** é) e [respeito](${respeito}).  
5. Fechar com [Valeu !!!](${mantra}).

## Status

**Aprovado** — canal **${name}** (${handle}) documentado como inspeção **[especial](${especial})**; ${count} vídeos classificados; **destaque [Aranha Rodrigo](${aranha})** (${rodrigoN} peças; âncora «${mdTitle(seed.title)}»). Aranha ≠ inseto. Indexar ≠ endosso de cada experiência.

[▶ Vídeos · Rodrigo](${rodrigoHub}) · [▶ Aranha Rodrigo](${aranha}) · [▶ Canal](${videosHub}) · [▶ Inseto](${inseto}) · [▶ Canais](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**[Special](${especial})** inspection of **[${name}](${channelUrl})** (${handle}) — English archive of visual experiments and life hacks. The BudGanja cut **highlights [Rodrigo the spider](${aranha})** (jumping spider, named individual). Catalog: [Videos](${videosHub}) (**${count}**); Rodrigo filter: [series=rodrigo](${rodrigoHub}) (**${rodrigoN}**). **Spider ≠ [insect](${inseto}).** Cataloguing ≠ endorsement of every experiment.

Anchor (highlight): **${mdTitle(seed.title)}** — @youtube ${seed.id || DESTAQUE_ID}

## Status

**Approved** — special channel sheet; Rodrigo is the named animal, not a gadget extra.

[▶ Rodrigo](${rodrigoHub}) · [▶ Animal sheet](${aranha})
`;

  const contentEs = `## Alcance

Inspección **[especial](${especial})** de **[${name}](${channelUrl})** (${handle}) — archivo EN de experimentos visuales y life hacks. El recorte BudGanja **destaca a la [araña Rodrigo](${aranha})**. Catálogo: [Vídeos](${videosHub}) (**${count}**); filtro Rodrigo: [series=rodrigo](${rodrigoHub}) (**${rodrigoN}**). **Araña ≠ [insecto](${inseto}).** Indexar ≠ respaldar cada experimento.

Ancla (destaque): **${mdTitle(seed.title)}** — @youtube ${seed.id || DESTAQUE_ID}

## Estado

**Aprobada** — ficha especial de canal; Rodrigo es el animal nombrado, no un extra de gadget.

[▶ Rodrigo](${rodrigoHub}) · [▶ Ficha del animal](${aranha})
`;

  return { body, contentEn, contentEs, seedId: seed.id || DESTAQUE_ID, wiki: channelUrl, count };
}

function buildSlivkiCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildSlivkiCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 18;
  return artePost({
    title: 'Inspeção: canal Slivki Show — experiências visuais e a Aranha Rodrigo',
    titleEn: 'Inspection: Slivki Show channel — visual experiments and Rodrigo the spider',
    titleEs: 'Inspección: canal Slivki Show — experimentos visuales y la araña Rodrigo',
    excerpt:
      'Canais (especial): Slivki Show (@slivkishowen) — arquivo EN de experiências e life hacks; destaque Aranha Rodrigo (saltadora). Aranha ≠ inseto. Hub /videos/?channel=slivki&series=rodrigo.',
    excerptEn:
      'Channels (special): Slivki Show (@slivkishowen) — EN archive of experiments and life hacks; highlight Rodrigo the jumping spider. Spider ≠ insect. Hub /videos/?channel=slivki&series=rodrigo.',
    excerptEs:
      'Canales (especial): Slivki Show (@slivkishowen) — archivo EN de experimentos y life hacks; destaque araña Rodrigo (saltadora). Araña ≠ insecto. Hub /videos/?channel=slivki&series=rodrigo.',
    slug: 'inspecao-canal-slivki',
    date: '2026-08-21T16:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Slivki Show · Canais',
    coverImage: '/imagens/inspecoes/slivki-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSlivkiCanalPost,
  buildSlivkiCanalBodies,
  loadCatalog
};
