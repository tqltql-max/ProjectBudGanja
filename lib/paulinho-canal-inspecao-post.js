'use strict';

/**
 * Inspeção Canais · Paulinho o LOKO — arquivo GTA RP / Anti-RP.
 * Mesmo molde da ficha Zangado: canal, catálogo, âncora, Games.
 * Pessoa (Aleff) ≠ canal (arquivo). Ficção de jogo ≠ manual de crime.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./paulinho-categories.js');

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
  const preferLong = (id) =>
    list.find((v) => v.category === id && /1\s*hora|hora de/i.test(v.title || '')) ||
    list.find((v) => v.category === id);
  return (
    preferLong('anti-rp') ||
    preferLong('gta-rp') ||
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
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const games = '/jogos/aleff/';
  const videosHub = '/videos/?channel=paulinho';
  const pessoa = '/posts/post-inspecao-figura-aleff.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const total = '/posts/post-inspecao-palavra-total.html';
  const obrigado = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const cadernosEng = '/biblioteca/cadernos/';
  const cadernosJogo = '/jogos/cadernos/';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const name = ch.channelName || 'Paulinho o LOKO';
  const handle = ch.handle || '@PaulinhoLOKOoficial';
  const channelUrl = ch.channelUrl || 'https://www.youtube.com/@PaulinhoLOKOoficial';
  const channelId = ch.channelId || 'UC7hvsI7ZjjwbFs2TUDpCUDA';
  const kickUrl = ch.kickUrl || 'https://kick.com/paulinholokobr';
  const kickHandle = ch.kickHandle || 'PaulinhoLOKObr';
  const anti = meritSamples(ch, 'anti-rp', 6);
  const golpes = meritSamples(ch, 'golpes-troll', 5);
  const policia = meritSamples(ch, 'policia', 5);

  const body = `## Escopo

Inspeção editorial do canal **[${name}](${channelUrl})** (${handle}) — arquivo de entretenimento **GTA RP / Anti-RP** desde **2015**. A **live** está no **[Kick · ${kickHandle}](${kickUrl})**; o YouTube guarda os recortes. No laboratório BudGanja entra na página **[Games](${games})** como performance de servidor — distinto da ficha de **pessoa** do [Aleff](${pessoa}) (Aliffe de Machado) e da ficha de **crítica** do [Zangado](${zangado}).

> **Nota metodológica:** auditoria independente. Catálogo espelhado em [Games · Paulinho](${games}) (**${count}** vídeos classificados pelos temas do próprio canal). Fontes: [canal YouTube](${channelUrl}) · [live Kick](${kickUrl}). Crédito: Paulinho o LOKO / Aleff — **sem afiliação**. Ficha ≠ endosso de crime nem tutorial de rua. **Ficção de jogo ≠ manual de crime.**

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${name}** (${handle}) |
| Channel ID | \`${channelId}\` |
| YouTube | [${channelUrl}](${channelUrl}) — **arquivo** de clips |
| Live | **[Kick · ${kickHandle}](${kickUrl})** — sessão ao vivo (GTA RP / IRL). Destaque BudGanja: o ecrã em directo é aqui. |
| Desde | **2015** — GTA V + trotes; RP a partir de 16 jun. 2020 |
| Missão (leitura BudGanja) | ${ch.mission || 'Entretenimento GTA RP / Anti-RP — ficção de jogo, não manual de crime'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora | [${mdTitle(seed.title)}](${yt}) |
| Tipo BudGanja | Canal — **arquivo GTA RP** · Games · mérito de ofício |
| Elo Games | [Caderno GTA 6](${gta6}) · [Cadernos de jogo](${cadernosJogo}) · página [Games](${games}) |
| Elo Palavras | [skill](${skill}) · [respeito](${respeito}) · [ídolo](${idolo}) · [total](${total}) |
| Elo ofício | [Cadernos de Engenharia](${cadernosEng}) — o engenheiro-arquiteto lê a cidade; ele joga a sessão |
| Hub vídeos | [Vídeos · Paulinho](${videosHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito do canal **não** é «ser o maior» nem collab: é sustentar um **arquivo de histórias de servidor** — Anti-RP, trotes, fugas, prefeito — com voz reconhecível.  
**H2:** os temas de título (**Anti-RP**, **Golpes & troll**, **Polícia & fugas**, **GTA RP**) são o núcleo; o resto (vida real, corridas, Modder Clips) é satélite.  
**H3:** no BudGanja o canal vive em [Games](${games}), filtrável por esses temas — crédito visível, sem fundir com a [pessoa Aleff](${pessoa}) nem com a crítica [Zangado](${zangado}).  
**H4:** **Kick ≠ YouTube.** A live é [PaulinhoLOKObr](${kickUrl}); o YouTube é arquivo. Não tratar clip como sessão.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte possível *deste* arquivo *neste* ecrã.

## Mérito — o que ele faz bem

O laboratório **classifica** o arquivo pelos temas que os títulos declaram. Não é taxonomia policial: é o ofício de entretenimento de servidor.

| Formato | Porquê conta |
|---------|----------------|
| **GTA RP** | Núcleo quantitativo — cidade, personagem, sessão |
| **Anti-RP** | Ruptura consciente das regras do servidor — humor de caos, não tutorial de rua |
| **Golpes & troll** | Pegadinhas e personagens fake — performance cómica |
| **Polícia & fugas** | Perseguição, PM, helicóptero — tensão de jogo |
| **Prefeito / Traidores & seita** | Arcos de história recorrentes no RP |
| **Ban & kick** | Metajogo do servidor — ficção administrativa |
| **Modo história** | GTA V single-player — emoção fora do RP |
| **Vida real / Modder Clips** | Recortes menores do mesmo universo |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

${anti ? '### Amostra · Anti-RP\n\n' + anti : ''}

${golpes ? '### Amostra · Golpes & troll\n\n' + golpes : ''}

${policia ? '### Amostra · Polícia & fugas\n\n' + policia : ''}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${mdTitle(seed.title)} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o ofício (Anti-RP / RP); o resto filtra-se em [Games](${games}) |

## Live (Kick)

O ofício **ao vivo** está em **[${kickUrl}](${kickUrl})** (\`${kickHandle}\`). GTA RP, IRL e sessão longa. O YouTube guarda os recortes classificados em [Games](${games}); o Kick é o ecrã em directo. Sem afiliação. Sem métrica no centro.

## Agradecimento

[Muito obrigado](${obrigado}) — [total](${total}) a ele. No laboratório, [Aleff](${pessoa}) é **herói de ofício** (persistência, humor, cidade no ecrã), não [ídolo](${idolo}) de pedestal. O engenheiro-arquiteto lê a cidade nos [cadernos](${cadernosEng}); ele joga a sessão. Crédito à pessoa. [Faça o melhor!](${mantra})

## Como usar no site

1. Abrir a **[live no Kick](${kickUrl})** quando o objecto for sessão.  
2. Abrir [Games · Paulinho](${games}) para o arquivo YouTube.  
3. Filtrar pelo tema (Anti-RP, Polícia, Prefeito, GTA RP…).  
4. Cruzar com a [ficha da pessoa](${pessoa}) quando o interesse for **Aleff**, não o clip.  
5. Cruzar com o [caderno GTA 6](${gta6}) quando o objecto for cidade / hype, não RP.  
6. Fechar com [Faça o melhor!](${mantra}).

## Status

**Aprovado** — canal **${name}** documentado como hub de **arquivo GTA RP** no BudGanja; live destacada no **[Kick · ${kickHandle}](${kickUrl})**; ${count} vídeos classificados pelos temas de mérito; âncora «${mdTitle(seed.title)}».

[▶ Live · Kick](${kickUrl}) · [▶ Games · Paulinho](${games}) · [▶ Vídeos](${videosHub}) · [▶ GTA 6](${gta6}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${name}](${channelUrl})** (${handle}) — GTA RP / Anti-RP entertainment archive since **2015**. **Live** is on **[Kick · ${kickHandle}](${kickUrl})**; YouTube holds the cuts. Lives on [Games](${games}) (${count} videos tagged by the channel's own themes). Distinct from the **person** sheet for [Aleff](${pessoa}) and from the **critique** sheet for [Zangado](${zangado}).

Anchor: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Thanks

Full thanks to him. In the lab, [Aleff](${pessoa}) is a **hero of the craft**, not an [idol](${idolo}) on a pedestal. The engineer-architect reads the city in the [notebooks](${cadernosEng}); he plays the session. [Do your best!](${mantra})

## Status

**Approved** — Paulinho as Games archive channel; live highlighted on Kick. **Game fiction is not a crime manual.**

[▶ Live · Kick](${kickUrl}) · [▶ Games](${games})
`;

  const contentEs = `## Alcance

Inspección de **[${name}](${channelUrl})** (${handle}) — archivo de entretenimiento GTA RP / Anti-RP desde **2015**. El **directo** está en **[Kick · ${kickHandle}](${kickUrl})**; YouTube guarda los recortes. Vive en [Games](${games}) (${count} vídeos por sus temas). Distinta de la ficha de **persona** de [Aleff](${pessoa}) y de la ficha de **crítica** de [Zangado](${zangado}).

Ancla: **${mdTitle(seed.title)}** — @youtube ${seed.id || ''}

## Agradecimiento

Agradecimiento total a él. En el laboratorio, [Aleff](${pessoa}) es **héroe de oficio**, no [ídolo](${idolo}) de pedestal. El ingeniero-arquitecto lee la ciudad en los [cuadernos](${cadernosEng}); él juega la sesión. [¡Haz lo mejor!](${mantra})

## Estado

**Aprobada** — Paulinho como canal-archivo Games; live destacada en Kick. **Ficción de juego ≠ manual de crimen.**

[▶ Live · Kick](${kickUrl}) · [▶ Games](${games})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: channelUrl, count };
}

function buildPaulinhoCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildPaulinhoCanalBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 15;
  return artePost({
    title: 'Inspeção: canal Paulinho o LOKO — GTA RP, Anti-RP e arquivo de servidor',
    titleEn: 'Inspection: Paulinho o LOKO channel — GTA RP, Anti-RP and server archive',
    titleEs: 'Inspección: canal Paulinho o LOKO — GTA RP, Anti-RP y archivo de servidor',
    excerpt:
      'Canais: Paulinho o LOKO — live no Kick (PaulinhoLOKObr) e arquivo YouTube (@PaulinhoLOKOoficial); GTA RP / Anti-RP; catálogo na página Games.',
    excerptEn:
      'Channels: Paulinho o LOKO — live on Kick (PaulinhoLOKObr) and YouTube archive (@PaulinhoLOKOoficial); GTA RP / Anti-RP; catalog on the Games page.',
    excerptEs:
      'Canales: Paulinho o LOKO — live en Kick (PaulinhoLOKObr) y archivo YouTube (@PaulinhoLOKOoficial); GTA RP / Anti-RP; catálogo en Games.',
    slug: 'inspecao-canal-paulinho',
    date: '2026-08-19T05:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Paulinho o LOKO · Canais',
    coverImage: '/imagens/inspecoes/paulinho-canal-cover.jpg',
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
  loadCatalog
};
