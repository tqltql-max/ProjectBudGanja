'use strict';

/**
 * Inspeção Palavras · lava (vulcão)
 * Pedido: cruzar lavar com larva de vulcão → lava de vulcão.
 * ≠ lavar ≠ larva ≠ formiga lava-pé.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/lava-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/lava';
const WIKI = 'https://pt.wikipedia.org/wiki/Lava';
const WIKT_EN = 'https://en.wiktionary.org/wiki/lava';
const WIKT_LABES = 'https://en.wiktionary.org/wiki/labes#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Lava não lava.
Não é água.
É pedra que ainda corre.

Larva não mora na cratera.
Mora no inseto
antes da asa.

Valeu !!!
com o rio de fogo no sítio,
sem banhar o que só queima.`;
}

function buildLavaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-lava.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const larva = '/posts/post-inspecao-palavra-larva.html';
  const formiga = '/posts/post-inspecao-palavra-formiga.html';
  const lavaPe = '/posts/post-inspecao-expressao-formiga-lava-pe.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const pedra = '/posts/post-inspecao-palavra-pedra.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const calor = '/posts/post-inspecao-palavra-calor-frio.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[lava](${self})** — a **rocha fundida** que sai do vulcão. Pedido de campo: *cruzar [lavar](${lavar}) com larva de vulcão*. Gatilho: *larva de vul~c* → **lava de vulcão**. [A orelha cola](${orelhaCola}) *lavar* / *lava* / *larva* / *lava-pé*. O étimo **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · lava](${WIKT}), [Wikipédia · Lava](${WIKI}), [EN lava](${WIKT_EN}), lat. [*lābēs*](${WIKT_LABES}). **Ficha ≠ guia de erupção, ≠ turismo de cratera, ≠ receita de «lava» culinária.** Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **lava** |
| Classe | Substantivo feminino |
| Objecto | Magma à superfície — rio de [pedra](${pedra}) + [fogo](${fogo}) / [calor](${calor}) |
| Étimo (trabalho) | It. *lava* (nápoles / sicília: torrente após chuva, depois o rio do Vesúvio) ← provavelmente lat. *lābēs* «queda, deslizamento» — confiança: **média–alta** |
| Hipótese desacreditada | Ligar a lat. *lavāre* («lavar») porque a chuva «lava» a encosta — **orelha**, não consenso actual |
| Tipo BudGanja | Palavra — terra × [fogo](${fogo}) × cola com [lavar](${lavar}) |
| O que **não** é | [Lavar](${lavar}) (verbo) · [larva](${larva}) (inseto) · [formiga lava-pé](${lavaPe}) · rito de lava-pés |
| Elo | [fogo](${fogo}) · [pedra](${pedra}) · [água](${agua}) (lahar / lama — outro fluxo) · [risco](${risco}) |
| Fonte | [lava](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome da corrente**. Magma é o que está **dentro**; lava é o que **sai**.

## 2. Lavar × lava × larva

| Forma | Ofício | Corte |
|-------|--------|-------|
| **[Lavar](${lavar})** | Limpar com [água](${agua}) | Lat. *lavāre* — **alta** |
| **lava** | Rocha fundida | It. *lava* / *lābēs* — **não** é o verbo |
| **[Larva](${larva})** | Forma jovem do inseto | Lat. *lārva* — máscara / espectro |
| **[Formiga lava-pé](${lavaPe})** | [Formiga](${formiga}) que ferroa o pé | Nome popular — arde como se «lavasse» com fogo |

**H1:** *larva de vulcão* é lapso de **lava de vulcão**.  
**H2:** a orelha funde *lava* e *lavar* porque a torrente «parece» água que lava a montanha — analogia antiga (Serao / Vesúvio), não identidade etimológica fechada.  
**H3:** Wikcionário EN trata a via *lavāre* como **desacreditada**; o lab marca **média** na *lābēs* e **baixa** na via *lavāre*.  
**H4:** a [formiga lava-pé](${lavaPe}) «lava» o pé com **veneno**, não com água nem com magma.

## 3. No mapa elemental

A lava é [pedra](${pedra}) que ainda não assenta + [fogo](${fogo}) que ainda corre. Quando arrefece, vira rocha. Quando a chuva mistura cinza e lama na encosta, o fluxo pode ser **lahar** — outro nome, outra ficha se chegar.

## 4. Rede

| Ficha | Papel |
|-------|-------|
| [Lavar](${lavar}) | O verbo que a orelha cola |
| [Larva](${larva}) | O lapso *larva de vulcão* |
| [Formiga lava-pé](${lavaPe}) | O inseto do pé — não esta cratera |
| [Fogo](${fogo}) · [pedra](${pedra}) | Elementos da corrente |
| [Água](${agua}) | A analogia (torrente) e o par que apaga |

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **lava** = rio de vulcão; *larva de vulcão* = lapso; [lavar](${lavar}) fica na água. [Valeu !!!](${mantra}) **sem banhar a cratera**.

[▶ Palavras](${hub}) · [▶ Lavar](${lavar}) · [▶ Larva](${larva}) · [▶ Formiga lava-pé](${lavaPe}) · [▶ Fogo](${fogo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Lava** is molten rock from a volcano (It. *lava*, likely Lat. *lābēs* “fall”), **not** [lavar](${lavar}) (to wash) and **not** [larva](${larva}). Field slip: *larva de vulcão* → **lava**. Link to [lavare](${lavar}) is a **discredited** folk etymology.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Lava** es roca fundida del volcán (it. *lava*, probablemente lat. *lābēs*), **no** [lavar](${lavar}) ni [larva](${larva}). Lapsus: *larva de vulcão* → **lava**. La vía *lavāre* está **desacreditada**.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildLavaPost() {
  const { body, contentEn, contentEs, wiki } = buildLavaBodies();
  return makePalavra({
    title: 'Inspeção: Lava — o rio do vulcão, não o verbo lavar',
    titleEn: 'Inspection: Lava — the volcano’s river, not the verb lavar',
    titleEs: 'Inspección: Lava — el río del volcán, no el verbo lavar',
    excerpt:
      'Palavras: lava (vulcão) ≠ lavar ≠ larva; larva de vulcão = lapso; Valeu !!!',
    excerptEn:
      'Words: lava (volcano) ≠ lavar ≠ larva; larva de vulcão = slip; Valeu !!!',
    excerptEs:
      'Palabras: lava (volcán) ≠ lavar ≠ larva; larva de vulcão = lapsus; ¡Valeu !!!',
    slug: 'inspecao-palavra-lava',
    date: '2026-08-23T16:50:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-lava', 272),
    seriesLabel: 'Lava · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildLavaPost, buildLavaBodies };
