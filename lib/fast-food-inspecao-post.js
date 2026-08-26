'use strict';

/**
 * Palavras · fast food
 * Empréstimo EN; comida rápida / ultraprocessado.
 * Pedido: inspeçãoeme fastfoods. Elos: caminhão, Thunderstruck (instante).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/fast-food-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/fast_food';
const WIKI = 'https://pt.wikipedia.org/wiki/Fast-food';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 340) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildFastFoodBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-fast-food.html';
  const song = '/posts/post-inspecao-arte-thunderstruck.html';
  const trovao = '/posts/post-inspecao-palavra-trovao.html';
  const caminhao = '/posts/post-inspecao-palavra-caminhao.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const galinha = '/posts/post-inspecao-derivado-galinha.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const alimentar = '/posts/post-inspecao-palavra-alimentar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da locução **[fast food](${self})** — empréstimo do inglês (*fast* + *food*): refeição **rápida**, em geral de cadeia, drive-thru ou [caminhão](${caminhao})-cozinha. Pedido: *inspeçãoeme fastfoods*. Cruzamento de campo com [Thunderstruck](${song}) / [trovão](${trovao}): o **instante** — o riff parte; o balcão também promete «já». Isso é **metáfora de relógio**, não patrocínio da banda.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fast food](${WIKT}), [Wikipédia · Fast-food](${WIKI}). **Ficha ≠ cardápio, ≠ ranking de marcas, ≠ dieta.** Sem afiliação a cadeias. Elos de [risco](${risco}) alimentar: [derivados](${derivados}) (ex. [galinha ultraprocessada](${galinha})). Documentário *Super Size Me* fica como **sugestão irmã**, não âncora.

## Objecto

| Campo | Valor |
|-------|-------|
| Forma | **fast food** · *fast-food* · *fastfoods* (pedido) |
| PT | comida rápida |
| Classe | Locução / empréstimo |
| Étimo | EN *fast* «rápido» + *food* «comida» |
| Tipo | Palavra — velocidade da refeição × ultraprocessado |
| Elo estrada | [caminhão](${caminhao}) — food truck / entrega |
| Elo instante | [trovão](${trovao}) · [Thunderstruck](${song}) — metáfora, não contrato |
| Data | ${inspected} |

**H1:** o nome promete **tempo**, não nutrição.  
**H2:** no lab, fast food cruza [alimentar](${alimentar}) e derivados — inspecionar o **processo**, não o logo.  
**H3:** o trovão da canção **não** vende hambúrguer nesta ficha.

## Veredicto

**Aprovado** — **fast food** = o instante no balcão. Distinto do [trovão](${trovao}) no céu e do riff em [Thunderstruck](${song}). Fecho: [Valeu !!!](${mantra}) **sem Super Size de ofício**.

[▶ Palavras](${hub}) · [▶ Caminhão](${caminhao}) · [▶ Derivados](${derivados}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Loan **fast food** — speed of the meal, usually a chain or truck kitchen. Metaphor of the instant with [Thunderstruck](${song}); not a brand deal. Risk layer: ultraprocessed [derivados](${derivados}).

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Préstamo **fast food** — velocidad de la comida. Metáfora del instante con [Thunderstruck](${song}); no es patrocinio. Capa de riesgo: [derivados](${derivados}).

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildFastFoodPost() {
  const { body, contentEn, contentEs, wiki } = buildFastFoodBodies();
  return makePalavra({
    title: 'Inspeção: Fast food — o instante no balcão',
    titleEn: 'Inspection: Fast food — the instant at the counter',
    titleEs: 'Inspección: Fast food — el instante en el mostrador',
    excerpt:
      'Palavras: fast food — comida rápida / ultraprocessado; ≠ patrocínio AC/DC; elo caminhão; Valeu !!!',
    excerptEn:
      'Words: fast food — quick meal / ultraprocessed; ≠ AC/DC ad; truck link; Valeu !!!',
    excerptEs:
      'Palabras: fast food — comida rápida; ≠ anuncio AC/DC; camión; ¡Valeu !!!',
    slug: 'inspecao-palavra-fast-food',
    date: '2026-08-23T16:02:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-fast-food', 266),
    seriesLabel: 'Fast food · instante',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildFastFoodPost, buildFastFoodBodies };
