'use strict';

/**
 * Inspeção Canais · Paulinho o LOKO (@PaulinhoLOKOoficial)
 * + canal de origem Modder (UC57rWqVJ7yGluT4cGrgfkgg).
 * Pessoa (Aleff) ≠ canal (arquivo Games). Ficção de jogo ≠ manual de crime.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./paulinho-categories.js');

const MODDER_CHANNEL_ID = 'UC57rWqVJ7yGluT4cGrgfkgg';
const MODDER_URL = 'https://www.youtube.com/channel/' + MODDER_CHANNEL_ID;
const OFFICIAL_HANDLE = '@PaulinhoLOKOoficial';
const OFFICIAL_URL = 'https://www.youtube.com/@PaulinhoLOKOoficial';
const WIKI = 'https://pt.wikipedia.org/wiki/Paulinho_o_Loko';
const COVER = '/imagens/inspecoes/aleff-cover.jpg';

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'paulinholoko.json'), 'utf8')
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
    series: opts.series || 'canal-paulinho',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Paulinho o LOKO · Canais',
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
    list.find((v) => v.category === 'modo-historia') ||
    list.find((v) => v.category === 'anti-rp') ||
    list.find((v) => /modo\s*hist[oó]ria/i.test(v.title || '')) ||
    list.find((v) => /anti\s*[-]?\s*rp/i.test(v.title || '')) ||
    list[0] || { id: '', title: 'Paulinho o LOKO' }
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

function buildPaulinhoCanalBodies(ch) {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const games = '/jogos/aleff/';
  const gamesHub = '/jogos/?canal=paulinho';
  const videosHub = '/videos/?channel=paulinho';
  const pessoa = '/posts/post-inspecao-figura-aleff.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : OFFICIAL_URL;
  const count = ch.videoCount || (ch.videos || []).length;
  const channelId = ch.channelId || 'UC7hvsI7ZjjwbFs2TUDpCUDA';
  const channelUrl = ch.channelUrl || OFFICIAL_URL;
  const handle = ch.handle || OFFICIAL_HANDLE;
  const name = ch.channelName || 'Paulinho o LOKO';

  const anti = meritSamples(ch, 'anti-rp', 5);
  const golpes = meritSamples(ch, 'golpes-troll', 5);
  const policia = meritSamples(ch, 'policia', 5);
  const gta = meritSamples(ch, 'gta-rp', 5);
  const historia = meritSamples(ch, 'modo-historia', 3);
  const vida = meritSamples(ch, 'vida-real', 3);

  const body = `## Escopo

Inspeção editorial **do canal YouTube** **[${name}](${channelUrl})** (${handle}) — arquivo público de entretenimento em **GTA RP / Anti-RP**, com **${count}** vídeos classificados no laboratório. O objecto aqui **não é a pessoa** (isso vive na ficha de [Aleff](${pessoa}) / Aliffe de Machado): é o **ecossistema de canais** — o oficial actual e o **Modder** de origem — e o modo como o BudGanja os indexa em [Games](${games}).

> **Nota metodológica:** auditoria independente. Catálogo espelhado em [Games · Aleff / Paulinho](${games}) (**${count}** vídeos). Fontes: [canal oficial](${channelUrl}), [canal Modder (origem)](${MODDER_URL}), [Wikipédia · Paulinho o Loko](${WIKI}). Crédito: Aliffe Henrique de Carvalho / Aleff / Paulinho o LOKO — **sem afiliação**. Indexar ≠ endossar. **Ficção de jogo ≠ manual de crime.** Banimentos, trotes e «golpes» no título são **performance de servidor / humor de ecrã**, não receita para a rua.

![Paulinho o LOKO — capa editorial BudGanja](${COVER})

*Capa editorial do laboratório — a pessoa detalha-se em [Aleff](${pessoa}); aqui inspeciona-se o **canal**. *

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal principal | **${name}** (${handle}) |
| Channel ID (oficial) | \`${channelId}\` |
| URL oficial | [${channelUrl}](${channelUrl}) |
| Canal de origem | **Modder** — [\`${MODDER_CHANNEL_ID}\`](${MODDER_URL}) |
| Desde (público) | **2015** — início adolescente no Modder; GTA V + trotes |
| Marco RP | **16 jun. 2020** — primeiro vídeo em servidor de roleplay (GTA V) |
| Missão (leitura BudGanja) | ${ch.mission || 'Entretenimento GTA RP / Anti-RP — ficção de jogo, não manual de crime'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **arquivo Games** · mérito de ofício de ecrã |
| Distinção | **Canal ≠ pessoa** ([Aleff](${pessoa})) · **≠ crítica** ([Zangado](${zangado})) |
| Elo Games | [Games · Aleff](${games}) · filtro [canal=paulinho](${gamesHub}) |
| Hub vídeos | [Vídeos · Paulinho](${videosHub}) |
| Elo Palavras | [skill](${skill}) · [respeito](${respeito}) · [caminho](${caminho}) · [ídolo](${idolo}) |
| Data | ${inspected} |

## Por que esta inspeção existe

O laboratório já honra **Aleff** como [pessoa](${pessoa}) e já espelha o arquivo em [Games](${games}). Faltava a **ficha de canal** — o mesmo gesto que fizemos para [Zangado](${zangado}) e Tamara: documentar o **objecto YouTube** com mérito, limites e mapa.

Os dois URLs pedidos entram juntos:

1. **[@PaulinhoLOKOoficial](${OFFICIAL_URL})** — canal principal actual (ID \`${channelId}\`), onde vive o catálogo BudGanja.  
2. **[Modder](${MODDER_URL})** (\`${MODDER_CHANNEL_ID}\`) — canal de origem / marca histórica «Modder»; o solo.to e a Wikipédia ligam-no ao começo (2015). No lab, **Modder** é raiz; **Paulinho o LOKO** é o tronco público.

## Hipóteses e método

- **H1:** o mérito do canal **não** é «ser o maior» — é sustentar um **arquivo de histórias de servidor** (Anti-RP, trotes, fugas, prefeito) com voz reconhecível.  
- **H2:** o par **Modder → Paulinho o LOKO** é [caminho](${caminho}) de marca: o rapaz que começou a tentar vira o canal que a comunidade chama pelo apelido.  
- **H3:** no BudGanja, **pessoa** e **canal** não se fundem — [Aleff](${pessoa}) guarda o nome; esta ficha guarda o arquivo.  
- **H4:** o contraste com [Zangado](${zangado}) é complementar: um é **crítica de método**; o outro é **performance / narrativa de RP**.  
- **H5:** fecho = [respeito](${respeito}) + [Faça o melhor!](${mantra}) — indexar com cuidado, sem glória de crime nem redução a persona.  
- **Método:** (1) objectos YouTube; (2) cronologia pública; (3) taxonomia do catálogo; (4) amostras; (5) como usar no site; (6) status.

## Cronologia pública (síntese verificável)

| Período | Marco |
|---------|-------|
| **2015** | Início no YouTube no canal **Modder** — primeiro vídeo *GTA V*; também trotes |
| **13 jul. 2018** | Mostra o rosto pela primeira vez (vídeo no shopping) — [gesto](${gesto}) de presença |
| **16 jun. 2020** | Primeiro vídeo em servidor de **roleplay** no GTA V |
| **2021** | Passa a streamer na Twitch (além do YouTube) |
| **2 set. 2022** | Entra na organização **Fluxo** |
| **Jan. 2024** | Anuncia saída da Fluxo |
| **Actual** | Canal oficial [${handle}](${channelUrl}) com catálogo BudGanja de **${count}** vídeos |

## Dois canais, um ofício

| Canal | ID | Papel na inspeção |
|-------|-----|-------------------|
| **Paulinho o LOKO** (oficial) | \`${channelId}\` | Arquivo principal · catálogo Games · ${count} vídeos |
| **Modder** (origem) | \`${MODDER_CHANNEL_ID}\` | Raiz 2015 · marca histórica · clips / legado «Modder Clips» no título |

A categoria **Modder Clips** no catálogo (${(ch.categories || []).find((c) => c.id === 'modder-clips')?.count || 0} itens) ecoa o nome de origem mesmo quando o upload está no canal oficial — memória de marca dentro do arquivo.

## Mérito — o que o canal faz bem

O laboratório **classifica** o arquivo pelos temas que os títulos declaram. Não é taxonomia policial: é mapa de **entretenimento de servidor**.

| Formato | Porquê conta |
|---------|----------------|
| **GTA RP** | Núcleo quantitativo — cidade, personagem, sessão |
| **Anti-RP** | Ruptura consciente das regras do servidor — humor de caos, não tutorial de rua |
| **Golpes & troll** | Pegadinhas e personagens fake — performance cómica |
| **Polícia & fugas** | Perseguição, PM, helicóptero — tensão de jogo |
| **Prefeito / Traidores & seita** | Arcos de história recorrentes no RP |
| **Ban & kick** | Metajogo do servidor (advertências, exclusões) — ficção administrativa |
| **Modo história** | GTA V single-player — emoção fora do RP |
| **Vida real** | React / vlog — ponte pessoa↔ecrã (sem substituir a [ficha Aleff](${pessoa})) |
| **Corridas / Modder Clips** | Recortes menores do mesmo universo |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

${historia ? '### Amostra · Modo história\n\n' + historia + '\n' : ''}
${anti ? '### Amostra · Anti-RP\n\n' + anti + '\n' : ''}
${golpes ? '### Amostra · Golpes & troll\n\n' + golpes + '\n' : ''}
${policia ? '### Amostra · Polícia & fugas\n\n' + policia + '\n' : ''}
${gta ? '### Amostra · GTA RP\n\n' + gta + '\n' : ''}
${vida ? '### Amostra · Vida real\n\n' + vida + '\n' : ''}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o ofício (história / Anti-RP / RP); o resto filtra-se em [Games](${games}) |

## Canal ≠ pessoa ≠ crítica

| Confusão | Correcção BudGanja |
|----------|-------------------|
| «A inspeção do canal é a biografia» | Biografia = [Aleff](${pessoa}). Canal = **este** arquivo |
| «É o mesmo que o Zangado» | [Zangado](${zangado}) = crítica. Paulinho = **performance / RP** |
| «Indexar = endossar crime» | **Ficção de jogo ≠ manual de crime.** Títulos de «golpe» são humor de servidor |
| «Modder é outro criador» | Modder é a **raiz** do mesmo ofício ([canal](${MODDER_URL})) |
| «É ídolo do lab» | [Ídolo](${idolo}) avisa: admirar o feito, não entregar a mão |

## Como usar no site

1. Abrir [Games · Aleff / Paulinho](${games}) ou [filtro canal=paulinho](${gamesHub}).  
2. Filtrar pelo tema (Anti-RP, Polícia, Prefeito, GTA RP…).  
3. Cruzar com a [ficha da pessoa](${pessoa}) quando o interesse for **Aleff**, não o clip.  
4. Cruzar com [Zangado](${zangado}) / [GTA 6](${gta6}) quando o interesse for crítica ou cidade, não RP.  
5. Fechar com [respeito](${respeito}) e [Faça o melhor!](${mantra}).

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Pessoa | [Aleff](${pessoa}) |
| Canal (esta ficha) | Arquivo YouTube oficial + Modder |
| Arquivo jogável | [Games](${games}) · [Vídeos](${videosHub}) |
| Contraste crítico | [Zangado](${zangado}) |
| Cidade / hype | [Caderno GTA 6](${gta6}) |
| Léxico | [skill](${skill}) · [caminho](${caminho}) · [gesto](${gesto}) · [fabuloso](${fabuloso}) · [incrível](${incrivel}) |

## Créditos e referências

**Todo o mérito de criação, humor e persistência no ecrã pertence a Aliffe / Aleff / Paulinho o LOKO.** Esta inspeção apenas documenta canais públicos.

- [${handle}](${channelUrl}) · ID \`${channelId}\`  
- [Modder (origem)](${MODDER_URL}) · ID \`${MODDER_CHANNEL_ID}\`  
- [Wikipédia · Paulinho o Loko](${WIKI})  
- [Games](${games}) · [Pessoa Aleff](${pessoa}) · [Zangado](${zangado})

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como arquivo Games de referência** — canal **${name}** (${count} vídeos) + raiz **Modder** documentados; distinto da [pessoa](${pessoa}) e da [crítica Zangado](${zangado}). Âncora «${mdTitle(seed.title)}».

[▶ Games](${games}) · [▶ Oficial](${channelUrl}) · [▶ Modder](${MODDER_URL}) · [▶ Aleff](${pessoa}) · [▶ Zangado](${zangado}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **YouTube channel** **[${name}](${channelUrl})** (${handle}) — public GTA RP / Anti-RP entertainment archive (**${count}** videos in the lab catalog). Object is **not** the person ([Aleff](${pessoa})): it is the **channel ecosystem** — current official + origin **Modder**.

> Independent audit. Catalog on [Games](${games}). Sources: [official](${channelUrl}), [Modder](${MODDER_URL}), [Wikipedia](${WIKI}). **No affiliation**. Indexing ≠ endorsement. **Game fiction ≠ crime manual.**

## Inspected subject

| Field | Value |
|-------|-------|
| Main channel | **${name}** (${handle}) · \`${channelId}\` |
| Origin channel | **Modder** · [\`${MODDER_CHANNEL_ID}\`](${MODDER_URL}) |
| Catalog size | **${count}** |
| Anchor | [${mdTitle(seed.title)}](${yt}) |
| Distinction | **Channel ≠ person** · **≠ critique** ([Zangado](${zangado})) |
| Date | ${inspected} |

## Two channels, one craft

**Modder (2015)** is the root; **Paulinho o LOKO** is the public trunk. Catalog themes: GTA RP, Anti-RP, scams & trolling, cops & chases, mayor / traitors arcs, bans, story mode, real-life reacts.

@youtube ${seed.id || ''}

## Status

**Approved with highest merit as a Games archive reference** — official channel + Modder root; distinct from [person](${pessoa}) and [Zangado](${zangado}).

[▶ Games](${games}) · [▶ Official](${channelUrl}) · [▶ Modder](${MODDER_URL}) · [▶ Aleff](${pessoa})
`;

  const contentEs = `## Alcance

Inspección editorial del **canal de YouTube** **[${name}](${channelUrl})** (${handle}) — archivo público de entretenimiento GTA RP / Anti-RP (**${count}** vídeos). El objeto **no es** la persona ([Aleff](${pessoa})): es el **ecosistema de canales** — oficial actual + origen **Modder**.

> Auditoría independiente. Catálogo en [Games](${games}). Fuentes: [oficial](${channelUrl}), [Modder](${MODDER_URL}), [Wikipedia](${WIKI}). **Sin afiliación**. Indexar ≠ respaldar. **Ficción de juego ≠ manual de crimen.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Canal principal | **${name}** (${handle}) · \`${channelId}\` |
| Canal de origen | **Modder** · [\`${MODDER_CHANNEL_ID}\`](${MODDER_URL}) |
| Catálogo | **${count}** |
| Ancla | [${mdTitle(seed.title)}](${yt}) |
| Distinción | **Canal ≠ persona** · **≠ crítica** ([Zangado](${zangado})) |
| Fecha | ${inspected} |

## Dos canales, un oficio

**Modder (2015)** es la raíz; **Paulinho o LOKO** es el tronco público. Temas: GTA RP, Anti-RP, troleos, policía, alcalde / traidores, bans, modo historia, vida real.

@youtube ${seed.id || ''}

## Estado

**Aprobado con mérito máximo como archivo Games de referencia** — canal oficial + raíz Modder; distinto de [persona](${pessoa}) y [Zangado](${zangado}).

[▶ Games](${games}) · [▶ Oficial](${channelUrl}) · [▶ Modder](${MODDER_URL}) · [▶ Aleff](${pessoa})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: channelUrl, count };
}

function buildPaulinhoCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildPaulinhoCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 15;
  return artePost({
    title: 'Inspeção: canal Paulinho o LOKO — arquivo GTA RP, Anti-RP e raiz Modder',
    titleEn: 'Inspection: Paulinho o LOKO channel — GTA RP archive, Anti-RP and Modder root',
    titleEs: 'Inspección: canal Paulinho o LOKO — archivo GTA RP, Anti-RP y raíz Modder',
    excerpt:
      'Canais: @PaulinhoLOKOoficial + Modder (origem) — arquivo Games de GTA RP / Anti-RP; distinto da ficha de pessoa Aleff e da crítica Zangado.',
    excerptEn:
      'Channels: @PaulinhoLOKOoficial + Modder (origin) — Games archive of GTA RP / Anti-RP; distinct from Aleff person sheet and Zangado critique.',
    excerptEs:
      'Canales: @PaulinhoLOKOoficial + Modder (origen) — archivo Games de GTA RP / Anti-RP; distinto de la ficha de persona Aleff y de la crítica Zangado.',
    slug: 'inspecao-canal-paulinho',
    date: '2026-08-18T20:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Paulinho o LOKO · Canais',
    coverImage: COVER.replace(/^\//, ''),
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPaulinhoCanalPost,
  buildPaulinhoCanalBodies,
  loadCatalog,
  MODDER_CHANNEL_ID,
  MODDER_URL
};
