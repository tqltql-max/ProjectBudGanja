'use strict';

/**
 * Inspeção Canais · Todo Poderoso Bagual — personagem BOPE / GTA RP.
 * Canal (arquivo) ≠ pessoa. Ficção de jogo ≠ manual de crime.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./bagual-categories.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'poderosobagual.json'), 'utf8')
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
    series: opts.series || 'canal-bagual',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Bagual · Canais',
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
  const prefer = (id, re) =>
    list.find((v) => v.category === id && re && re.test(v.title || '')) ||
    list.find((v) => v.category === id);
  return (
    list.find((v) => v.id === '223XIFPXVSY') ||
    prefer('bope', /resenha|quiz/i) ||
    prefer('bope') ||
    list[0] || { id: '', title: 'Todo Poderoso Bagual' }
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

function buildBagualCanalBodies(ch) {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const games = '/jogos/bagual/';
  const gtarp = '/jogos/gtarp/';
  const hopejoy = '/jogos/hopejoy/';
  const paulinho = '/posts/post-inspecao-canal-paulinho.html';
  const paulinhoGames = '/jogos/aleff/';
  const entrevistaHope =
    'https://www.youtube.com/watch?v=XBJ7zLpZ61k';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const obrigado = '/posts/post-inspecao-palavra-gratidao.html';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Todo Poderoso Bagual';
  const handle = ch.handle || '@poderosobagual';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@poderosobagual';
  const channelId = ch.channelId || 'UCk0Ud8rXiQFCNz4ly-E85bA';
  const kickUrl = ch.kickUrl || 'https://kick.com/poderosobagual';
  const kickHandle = ch.kickHandle || 'poderosobagual';
  const bope = meritSamples(ch, 'bope', 6);
  const capital = meritSamples(ch, 'capital-city', 5);
  const clips = meritSamples(ch, 'clips', 5);

  const body = `## Escopo

Inspeção editorial do canal **[${name}](${channelUrl})** (${handle}) — arquivo de entretenimento da personagem **Todo Poderoso Bagual** no **GTA RP** (servidor Capital City). No ecrã a personagem serve no **BOPE** da Capital; na vida real o crédito público do streamer é **Poderoso Bagual**. A **live** está no **[Kick · ${kickHandle}](${kickUrl})**; o YouTube guarda os recortes (**Bagual Clips**). No laboratório BudGanja entra na página **[GTA RP](${gtarp})** — distinto da ficha de **pessoa** (ainda sem biografia civil) e do arquivo **[Paulinho](${paulinho})**.

> **Nota metodológica:** auditoria independente. Catálogo espelhado em [GTA RP · Bagual](${games}) (**${count}** vídeos classificados pelos temas do próprio canal). Fontes: [canal YouTube](${channelUrl}) · [live Kick](${kickUrl}) · [entrevista Face to Face com Hope Joy](${entrevistaHope}). Crédito: Poderoso Bagual — **sem afiliação**. Ficha ≠ endosso de crime nem tutorial de rua. **Personagem ≠ pessoa. Ficção de jogo ≠ manual de crime.**

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Personagem | **Todo Poderoso Bagual** — BOPE da Capital (ficção de servidor) |
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| YouTube | [${channelUrl}](${channelUrl}) — **arquivo** de clips |
| Live | **[Kick · ${kickHandle}](${kickUrl})** — sessão ao vivo (GTA RP). Destaque BudGanja: o ecrã em directo é aqui. |
| Missão (leitura BudGanja) | ${ch.mission || 'Personagem BOPE no GTA RP — arquivo YouTube; live no Kick. Ficção de jogo ≠ manual de crime.'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Elo no servidor | [Entrevista Face to Face · Hope Joy](${entrevistaHope}) — Bagual do BOPE, episódio 1 |
| Tipo BudGanja | Canal — **arquivo GTA RP** · personagem · mérito de ofício |
| Elo Games | página [GTA RP](${gtarp}) · [Hope Joy](${hopejoy}) · [Paulinho](${paulinhoGames}) · [Caderno GTA 6](${gta6}) |
| Elo Palavras | [skill](${skill}) · [respeito](${respeito}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito do canal **não** é o posto de polícia real nem o ranking: é sustentar um **arquivo da personagem** — BOPE de servidor, Copa Capital, resenha com [Paulinho](${paulinho}) — com voz reconhecível.  
**H2:** os temas de título (**BOPE**, **Capital City**, **Bagual Clips**, **GTA RP**) são o núcleo; «polícia de servidor» é tensão de jogo, não manual de rua.  
**H3:** no BudGanja o canal vive em [GTA RP · Bagual](${games}), filtrável por esses temas — crédito visível, sem fundir com a pessoa atrás do ecrã nem com o arquivo [Paulinho](${paulinho}).  
**H4:** **Kick ≠ YouTube.** A live é [${kickHandle}](${kickUrl}); o YouTube é arquivo de clips. Não tratar recorte como sessão.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte possível *deste* arquivo *neste* ecrã.

## Mérito — o que o arquivo faz bem

O laboratório **classifica** o arquivo pelos temas que os títulos declaram. Não é taxonomia policial: é o ofício de entretenimento de servidor.

| Formato | Porquê conta |
|---------|----------------|
| **BOPE** | Núcleo da personagem — batalhão de ficção, copa, resenha, missão de servidor |
| **Polícia de servidor** | Fugas e perseguições no mapa — tensão de jogo, não tutorial |
| **Capital City** | Cidade do RP onde a personagem existe |
| **GTA RP** | Sessão genérica de roleplay — o mesmo universo sem o posto no título |
| **Bagual Clips** | Marca do arquivo YouTube — recorte da live, não a live |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

${bope ? '### Amostra · BOPE\n\n' + bope : ''}

${capital ? '### Amostra · Capital City\n\n' + capital : ''}

${clips ? '### Amostra · Bagual Clips\n\n' + clips : ''}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o ofício (BOPE / RP); o resto filtra-se em [GTA RP · Bagual](${games}) |

## Live (Kick)

O ofício **ao vivo** está em **[${kickUrl}](${kickUrl})** (\`${kickHandle}\`). GTA RP e sessão longa. O YouTube guarda os recortes classificados em [GTA RP · Bagual](${games}); o Kick é o ecrã em directo. Sem afiliação. Sem métrica no centro.

## Elo · Hope Joy

A [Hope Joy](${hopejoy}) entrevistou a personagem em [Face to Face — Bagual do BOPE, episódio 1](${entrevistaHope}). No laboratório isso **liga** dois arquivos de servidor (jornal e BOPE), não funde as fichas.

## Agradecimento

[Gratidão](${obrigado}) ao ofício no ecrã. Personagem de servidor, crédito ao streamer, sem pedestal. [Valeu !!!](${mantra})

## Como usar no site

1. Abrir a **[live no Kick](${kickUrl})** quando o objecto for sessão.  
2. Abrir [GTA RP · Bagual](${games}) para o arquivo YouTube.  
3. Filtrar pelo tema (BOPE, Capital City, Bagual Clips, GTA RP…).  
4. Cruzar com a [Hope Joy](${hopejoy}) quando o objecto for a entrevista Face to Face.  
5. Cruzar com o [arquivo Paulinho](${paulinho}) quando o recorte for collab de servidor.  
6. Fechar com [Valeu !!!](${mantra}).

## Status

**Aprovado** — canal **${name}** documentado como hub de **arquivo GTA RP** da personagem Todo Poderoso Bagual; live destacada no **[Kick · ${kickHandle}](${kickUrl})**; ${count} vídeos classificados pelos temas de mérito; âncora «${mdTitle(seed.title)}».

[▶ Live · Kick](${kickUrl}) · [▶ GTA RP · Bagual](${games}) · [▶ GTA RP](${gtarp}) · [▶ Hope Joy](${hopejoy}) · [▶ Canais](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${name}](${channelUrl})** (${handle}) — entertainment archive of the **Todo Poderoso Bagual** character in **GTA RP** (Capital City). On screen the character serves in Capital **BOPE**; the public streamer credit is **Poderoso Bagual**. **Live** is on **[Kick · ${kickHandle}](${kickUrl})**; YouTube holds the cuts (**Bagual Clips**). Lives on [GTA RP · Bagual](${games}) (${count} videos tagged by the channel's own themes). Distinct from a **person** sheet (none yet) and from the [Paulinho](${paulinho}) archive.

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Status

**Approved** — Bagual as GTA RP character archive; live highlighted on Kick. **Character is not the person. Game fiction is not a crime manual.**

[▶ Live · Kick](${kickUrl}) · [▶ GTA RP · Bagual](${games})
`;

  const contentEs = `## Alcance

Inspección de **[${name}](${channelUrl})** (${handle}) — archivo de entretenimiento del personaje **Todo Poderoso Bagual** en **GTA RP** (Capital City). En pantalla sirve en el **BOPE** de la Capital; el crédito público del streamer es **Poderoso Bagual**. El **directo** está en **[Kick · ${kickHandle}](${kickUrl})**; YouTube guarda los recortes (**Bagual Clips**). Vive en [GTA RP · Bagual](${games}) (${count} vídeos por sus temas). Distinta de una ficha de **persona** (aún no hay) y del archivo [Paulinho](${paulinho}).

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Estado

**Aprobada** — Bagual como archivo de personaje GTA RP; live destacada en Kick. **Personaje ≠ persona. Ficción de juego ≠ manual de crimen.**

[▶ Live · Kick](${kickUrl}) · [▶ GTA RP · Bagual](${games})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: channelUrl, count };
}

function buildBagualCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildBagualCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 16;
  return artePost({
    title: 'Inspeção: canal Todo Poderoso Bagual — BOPE, Capital City e arquivo GTA RP',
    titleEn: 'Inspection: Todo Poderoso Bagual channel — BOPE, Capital City and GTA RP archive',
    titleEs: 'Inspección: canal Todo Poderoso Bagual — BOPE, Capital City y archivo GTA RP',
    excerpt:
      'Canais: Todo Poderoso Bagual — live no Kick (poderosobagual) e arquivo YouTube (@poderosobagual); personagem de BOPE no GTA RP; catálogo na página GTA RP.',
    excerptEn:
      'Channels: Todo Poderoso Bagual — live on Kick (poderosobagual) and YouTube archive (@poderosobagual); BOPE character in GTA RP; catalog on the GTA RP page.',
    excerptEs:
      'Canales: Todo Poderoso Bagual — live en Kick (poderosobagual) y archivo YouTube (@poderosobagual); personaje de BOPE en GTA RP; catálogo en GTA RP.',
    slug: 'inspecao-canal-bagual',
    date: '2026-08-22T05:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Bagual · Canais',
    coverImage: '/imagens/inspecoes/bagual-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBagualCanalPost,
  buildBagualCanalBodies,
  loadCatalog
};
