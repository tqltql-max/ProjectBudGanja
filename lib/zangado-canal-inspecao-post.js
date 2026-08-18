'use strict';

/**
 * Inspeção Canais · Zangado — crítica gamer BR, sagas e primeira meia hora.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CATEGORIES } = require('./zangado-categories.js');

function loadCatalog() {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(ROOT, 'content', 'channels', 'zangadoreview.json'), 'utf8')
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
    series: opts.series || 'canal-zangado',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Zangado · Canais',
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

function pickSeed(videos) {
  const list = videos || [];
  const preferPart1 = (re) =>
    list.find((v) => re.test(v.title || '') && /parte?\s*1\b|part\s*1\b/i.test(v.title || '')) ||
    list.find((v) => re.test(v.title || ''));
  const seed =
    preferPart1(/saga.{0,40}pok[eé]mon|pok[eé]mon.{0,40}saga/i) ||
    preferPart1(/saga.{0,40}resident\s*evil|resident\s*evil.{0,40}saga/i) ||
    list.find((v) => /primeira\s+meia[\s-]*hora/i.test(v.title || '')) ||
    list.find((v) => /vale\s+ou\s+n[aã]o\s+a?\s*pena/i.test(v.title || '')) ||
    list[0];
  return seed || { id: '', title: 'Zangado' };
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
    .map((v) => '- [' + String(v.title).replace(/\[/g, '\\[') + '](https://www.youtube.com/watch?v=' + v.id + ')')
    .join('\n');
}

function buildZangadoBodies(ch) {
  const inspected = '2026-08-17';
  const hub = '/biblioteca/inspecoes/#inspecoes-canais';
  const games = '/jogos/?canal=zangado';
  const videosHub = '/videos/?channel=zangado';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const uol =
    'https://www.uol.com.br/start/listas/e-ae-10-fatos-sobre-zangado-um-dos-maiores-youtubers-do-brasil.htm';
  const seed = pickSeed(ch.videos);
  const yt = seed.id ? 'https://www.youtube.com/watch?v=' + seed.id : ch.channelUrl;
  const count = ch.videoCount || (ch.videos || []).length;
  const sagas = meritSamples(ch, 'sagas', 6);
  const reviews = meritSamples(ch, 'vale-a-pena', 5);
  const meia = meritSamples(ch, 'primeira-meia-hora', 5);

  const body = `## Escopo

Inspeção editorial do canal **[${ch.channelName || 'Zangado'}](${ch.channelUrl})** (${ch.handle || '@zangadoreview'}) — voz gamer brasileira desde **2006**. Thiago, que pede para o chamarem de Zangado, **não mostra o rosto**: máscara no ecrã, ofício na voz. No laboratório BudGanja entra na página **[Games](${games})** como o crítico de método — sagas, «vale ou não vale a pena» e a **primeira meia hora** — distinto do recorte de sessão do Paulinho o LOKO.

> **Nota metodológica:** auditoria independente. Catálogo espelhado em [Games · Zangado](${games}) (**${count}** vídeos classificados pelos formatos do próprio canal). Fontes: [canal YouTube](${ch.channelUrl}), [UOL Start · 10 factos (2016)](${uol}). Crédito: Thiago / Zangado — **sem afiliação**. Ficha ≠ endosso de compra nem walkthrough. **Ficção de jogo ≠ manual de crime.**

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Canal | **${ch.channelName || 'Zangado'}** (${ch.handle || '@zangadoreview'}) |
| Channel ID | \`${ch.channelId || 'UCuVIWETFdxzwlHEHMbhm2_w'}\` |
| URL | [${ch.channelUrl}](${ch.channelUrl}) |
| Desde | **11 mai. 2006** — um dos pioneiros do YouTube gamer BR |
| Missão (leitura BudGanja) | ${ch.mission || 'Reviews, sagas e primeira meia hora com método'} |
| Itens no catálogo | **${count}** |
| Vídeo âncora | [${seed.title || '—'}](${yt}) |
| Tipo BudGanja | Canal — **crítica gamer** · Games · mérito de ofício |
| Elo Games | [Caderno GTA 6](${gta6}) · página [Games](${games}) |
| Elo Palavras | [skill](${skill}) — craft, não badge |
| Hub vídeos | [Vídeos · Zangado](${videosHub}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o mérito do Zangado **não** é gritar mais alto nem collab: é **explicar o jogo** — história da franquia, primeira meia hora, veredicto de compra.  
**H2:** as séries históricas (**Sagas**, **Vale ou não vale a pena**, **Primeira meia hora**) são o núcleo; o resto (bate-papo, shorts, nerd extra) é satélite.  
**H3:** no BudGanja o canal vive em [Games](${games}), filtrável por esses formatos — crédito visível, sem confundir com GTA RP.  
**H4:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte possível *deste* crítico *neste* ecrã.

## Mérito — o que ele faz bem

O laboratório **classifica** o arquivo pelos formatos que o próprio canal inventou e sustentou. Não é taxonomia inventada: é o ofício.

| Formato | Porquê conta |
|---------|----------------|
| **Sagas** | História de franquias (Pokémon, Resident Evil, …) — literacia de série, não clip de hype |
| **Vale ou não vale a pena** | Review com critério: vale a compra ou não. Crítica, não unboxing eterno |
| **Primeira meia hora** | Primeiro contacto honesto — o jogo ainda não «abriu o mapa» |
| **Não vale a pena** | Veredicto negativo sem rodeio — o reverso da mesma honestidade |
| **Trilogias / demos / unboxing** | Recortes menores do mesmo método |
| **Bate-papo** | Comunidade (Tio Zangado) — voz, não máscara de influencer |
| **Nerd extra** | Filme, anime, HQ — o mesmo critério fora do pad |
| **Lives & reacts** | State of Play e conversa ao vivo |
| **Listas** | Mais esperados / melhores do ano — curadoria, não hype vazio |
| **Gameplay / lançamentos** | Cobertura do que está a sair, com plataforma à vista |

### Catálogo classificado (${count} vídeos)

| Formato | Vídeos |
|---------|--------|
${catTable(ch)}

${sagas ? '### Amostra · Sagas\n\n' + sagas : ''}

${reviews ? '### Amostra · Vale ou não vale a pena\n\n' + reviews : ''}

${meia ? '### Amostra · Primeira meia hora\n\n' + meia : ''}

## Vídeo âncora (embed)

@youtube ${seed.id || ''}

| Campo | Valor |
|-------|-------|
| Título | ${seed.title || '—'} |
| ID | \`${seed.id || ''}\` |
| Nota | Entrada para o ofício (saga / meia hora / review); o resto filtra-se em [Games](${games}) |

## Como usar no site

1. Abrir [Games · Zangado](${games}).  
2. Filtrar pelo formato (Sagas, Vale ou não vale a pena, Primeira meia hora…).  
3. Cruzar com o [caderno GTA 6](${gta6}) quando o objecto for cidade / hype, não review.  
4. Fechar com [Faça o melhor!](${mantra}).

## Status

**Aprovado** — canal **Zangado** documentado como hub de **crítica gamer** no BudGanja; ${count} vídeos classificados pelos formatos de mérito; âncora «${String(seed.title || '').replace(/\|/g, ' ')}».

[▶ Games · Zangado](${games}) · [▶ Vídeos](${videosHub}) · [▶ GTA 6](${gta6}) · [▶ Canais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[${ch.channelName || 'Zangado'}](${ch.channelUrl})** (${ch.handle || '@zangadoreview'}) — Brazilian game-critic voice since **2006**. No face on camera; craft in the voice. Lives on [Games](${games}) (${count} videos tagged by his own formats: sagas, worth-playing reviews, first half hour).

Anchor: **${seed.title || 'Zangado'}** — @youtube ${seed.id || ''}

## Status

**Approved** — Zangado as game-critique channel; credit due.

[▶ Games](${games})
`;

  const contentEs = `## Alcance

Inspección de **[${ch.channelName || 'Zangado'}](${ch.channelUrl})** (${ch.handle || '@zangadoreview'}) — voz crítica gamer de Brasil desde **2006**. Sin rostro en cámara; oficio en la voz. Vive en [Games](${games}) (${count} vídeos por sus formatos: sagas, ¿vale la pena?, primera media hora).

Ancla: **${seed.title || 'Zangado'}** — @youtube ${seed.id || ''}

## Estado

**Aprobada** — Zangado como canal de crítica; crédito debido.

[▶ Games](${games})
`;

  return { body, contentEn, contentEs, seedId: seed.id || '', wiki: ch.channelUrl, count };
}

function buildZangadoCanalPost(seriesOrder) {
  const ch = loadCatalog();
  const { body, contentEn, contentEs, seedId, wiki, count } = buildZangadoBodies(ch);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 14;
  return artePost({
    title: 'Inspeção: canal Zangado — crítica gamer, sagas e primeira meia hora',
    titleEn: 'Inspection: Zangado channel — game critique, sagas and first half hour',
    titleEs: 'Inspección: canal Zangado — crítica gamer, sagas y primera media hora',
    excerpt:
      'Canais: Zangado (@zangadoreview) — crítico gamer BR desde 2006; sagas, vale ou não vale a pena e primeira meia hora; catálogo na página Games.',
    excerptEn:
      'Channels: Zangado (@zangadoreview) — Brazilian game critic since 2006; sagas, worth-playing reviews and first half hour; catalog on the Games page.',
    excerptEs:
      'Canales: Zangado (@zangadoreview) — crítico gamer BR desde 2006; sagas, ¿vale la pena? y primera media hora; catálogo en Games.',
    slug: 'inspecao-canal-zangado',
    date: '2026-08-17T23:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Zangado · Canais',
    coverImage: '/imagens/inspecoes/zangado-canal-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    videoCount: count,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildZangadoCanalPost,
  buildZangadoBodies,
  loadCatalog
};
