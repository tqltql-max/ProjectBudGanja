'use strict';

/**
 * Inspeção Palavras · desatar
 * Eixos: des- + atar · soltar o nó · ≠ desastre ·
 * elo expressão desatar o nó
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/desatar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/desatar';
const WIKT_ATAR = 'https://pt.wiktionary.org/wiki/atar';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildDesatarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-desatar.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do verbo **[desatar](${self})** — **des-** + **atar**: desfazer o que estava preso. Pedido de campo: *Desatar* e a expressão **[desatar o nó](${desatarNo})**. Esta ficha é o **verbo**. O laço é o [nó](${no}); o fio é a [corda](${corda}). O ouvido cola *desatar* em **[desastre](${desastre})** — o lab **separa** ([etimologia](${etimologia})).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · desatar](${WIKT}), [atar](${WIKT_ATAR}). **Ficha ≠ terapia, ≠ protocolo de crise.** Depois do gesto: **[ufa](${ufa})**. Fecho: [Faça o melhor!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **desatar** |
| Classe | Verbo |
| Étimo | prefixo *des-* (reversão) + *atar* ← lat. *aptāre* «ajustar / prender» — confiança: **alta** |
| Família | *atar* · *atado* · *desatado* · *desate* |
| Cognatos | esp. *desatar* · fr. *détacher* (paralelo) · ing. *untie* / *unbind* |
| Tipo BudGanja | Palavra — gesto de soltar |
| Não é | [desastre](${desastre}) (*dis-* + *astro*) |
| Elo | [nó](${no}) · [corda](${corda}) · [desatar o nó](${desatarNo}) · [gesto](${gesto}) |
| Data | ${inspected} |

**O que é o objecto:** o **verbo** de desfazer o aperto. Sem [nó](${no}) nomeado, desatar vira sopro vazio. Sem [gesto](${gesto}), o laço fica.

## 2. Desatar × desastre

| Forma | Étimo | Ofício |
|-------|-------|--------|
| **desatar** | *des-* + *atar* | Soltar o que estava preso |
| **[desastre](${desastre})** | *dis-* + *astrum* (má estrela) | Catástrofe — **outro** avô |
| **desatado** | particípio / adjectivo | Solto; também «sem freio» (uso vivo) |

**H1:** desatar é **reversão de atar** — ofício na [corda](${corda}).  
**H2:** *desastre* **não** é «desatar mal»; é má estrela. O ouvido mente; a [etimologia](${etimologia}) não.  
**H3:** [desatar o nó](${desatarNo}) é o ditado do ofício — antes que o aperto da [vida](${vida}) seja vivido como [desastre](${desastre}).

## 3. Usos

| Uso | Leitura |
|-----|---------|
| **Literal** | Soltar o [nó](${no}) na [corda](${corda}) |
| **Língua** | «Desatar a língua» — começar a falar |
| **Choro** | «Desatar a chorar» — o peito solta |
| **Ditado** | [Desatar o nó](${desatarNo}) — resolver o laço da [vida](${vida}) |

## 4. Faça o melhor!

[Desatar](${self}) com [verdade](${verdade}): puxar o fio certo, não cortar a [vida](${vida}). Depois do laço solto: **[ufa](${ufa})** — e, se couber o sorriso BR, [legal](${legal}) (gíria). Ofício: [Faça o melhor!](${mantra}) neste [caminho](${caminho}).

## Status

**Aprovado** — **desatar** fichado: *des-* + *atar*; ≠ [desastre](${desastre}); ditado [desatar o nó](${desatarNo}).

[▶ Palavras](${hub}) · [▶ Nó](${no}) · [▶ Desastre](${desastre}) · [▶ Desatar o nó](${desatarNo}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **desatar** (to untie) = *des-* + *atar*. Not [desastre](${desastre}) (ill-starred). Saying: [desatar o nó](${desatarNo}). After the gesture: [ufa](${ufa}). Close: [Do your best!](${mantra}).

## Status

**Approved** — untying is reversal of tying; disaster is another etymon.

[▶ Words](${hub}) · [▶ Knot](${no}) · [▶ Disaster](${desastre}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

**Desatar** = *des-* + *atar*. No es [desastre](${desastre}) (mala estrella). Dicho: [desatar o nó](${desatarNo}). Después: [ufa](${ufa}). Cierre: [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobado** — desatar es revertir el atar; desastre es otro étimo.

[▶ Palabras](${hub}) · [▶ Nó](${no}) · [▶ Desastre](${desastre}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildDesatarPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDesatarBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-desatar', 176);
  return makePalavra({
    title: 'Inspeção: Desatar — soltar o nó, sem virar desastre',
    titleEn: 'Inspection: Desatar — untie the knot, without turning it into disaster',
    titleEs: 'Inspección: Desatar — soltar el nudo, sin volverse desastre',
    excerpt:
      'Palavras: «desatar» (*des-* + *atar*) — gesto de soltar o nó; ≠ desastre (*astro*); ditado desatar o nó; ufa no fim; Faça o melhor!',
    excerptEn:
      'Words: “desatar” (*des-* + *atar*) — untying the knot; ≠ disaster (*star*); saying desatar o nó; phew at the end; Do your best!',
    excerptEs:
      'Palabras: «desatar» (*des-* + *atar*) — soltar el nudo; ≠ desastre (*astro*); dicho desatar o nó; ufa al final; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-desatar',
    date: '2026-08-22T03:14:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Desatar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildDesatarPost, buildDesatarBodies };
