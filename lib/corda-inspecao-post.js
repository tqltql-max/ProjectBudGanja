'use strict';

/**
 * Inspeção Palavras · corda (objecto)
 * Eixos: lat. chorda / gr. χορδή · fio que recebe o nó ·
 * ≠ cinta · ≠ codorna · catálogo /objetos/
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/corda-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/corda';
const WIKT_LA = 'https://en.wiktionary.org/wiki/chorda#Latin';

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

function buildCordaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-corda.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const codorna = '/posts/post-inspecao-animal-codorna.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const teoriaCordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const cultivo = '/cultivo/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra-objecto **[corda](${self})** — o **fio** / **cabo** onde mora o [nó](${no}). Pedido de campo: *objeto Corda* ao lado da ave [codorna](${codorna}). Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa**. O ouvido mistura *corda* e *codorna*; o lab **separa**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · corda](${WIKT}), lat. [chorda](${WIKT_LA}) ← gr. χορδή. **Ficha ≠ manual de amarração, ≠ protocolo de força, ≠ partitura.** Irmã de suporte: [cinta](${cinta}) (faixa — outro objecto). Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **corda** |
| Classe | Substantivo feminino |
| Étimo | lat. *chorda* ← gr. χορδή «tripa / corda de instrumento» — confiança: **alta** |
| Família | *cordão* · *encordoar* · *acorde* (vizinho: *chord*) · *cordel* |
| Cognatos | esp. *cuerda* · fr. *corde* · it. *corda* · ing. *cord* / *chord* |
| Tipo BudGanja | Palavra-objecto — fio × suporte × música |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | [nó](${no}) (o laço) · [codorna](${codorna}) (ave) · [cinta](${cinta}) (faixa) · [teoria das cordas](${teoriaCordas}) (física) |
| Data | ${inspected} |

**O que é o objecto:** o **fio** que se pode atar e [desatar](${desatar}). No [cultivo](${cultivo}), vizinha da [cinta](${cinta}) que tutora a [planta](${planta}) — sem estrangular.

## 2. Corda × codorna × cinta

| Forma | Étimo | Ofício |
|-------|-------|--------|
| **corda** | *chorda* / χορδή | Fio, cabo, corda de viola |
| **[codorna](${codorna})** | lat. *coturnīx* | Ave — ficha [animal](${animal}) |
| **[cinta](${cinta})** | *cingere* | Faixa que cinge — outro objecto |
| **[nó](${no})** | *nodus* | Laço **na** corda |
| **[teoria das cordas](${teoriaCordas})** | calque de *string theory* | Física teórica — **não** este objecto |

**H1:** a corda é o suporte; o [nó](${no}) é o acontecimento no suporte.  
**H2:** *corda* / *codorna* é vizinhança de [trocadilho](${trocadilho}) — o ouvido cola; o étimo não.  
**H3:** apertar a planta com corda sem folga é falha de [gesto](${gesto}) — a [cinta](${cinta}) já avisou.  
**H4:** [teoria das cordas](${teoriaCordas}) empresta o **nome** (χορδή); o ofício é outro mapa.

## 3. Usos no lab

| Uso | Leitura |
|-----|---------|
| **Amarração** | Segurar com [verdade](${verdade}): folga, não estrangulo |
| **Música** | Corda de instrumento — mesmo avô grego; baptismo da [teoria das cordas](${teoriaCordas}) |
| **Figura** | Corda da [vida](${noVida}) — o fio; o aperto é o [nó](${no}) |
| **Soltar** | [Desatar o nó](${desatarNo}) — ofício no objecto |

## 4. Valeu !!!

Inspecionar a **corda** antes de culpar o [nó](${no}). Não confundir com [codorna](${codorna}). Não deixar o aperto virar [desastre](${desastre}) por falta de [desatar](${desatar}). Depois: **[ufa](${ufa})** e [Valeu !!!](${mantra}).

## Status

**Aprovado** — **corda** fichada como objecto (*chorda*); mora no catálogo [Objetos](${objetos}); recebe o [nó](${no}); ≠ [codorna](${codorna}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Nó](${no}) · [▶ Teoria das cordas](${teoriaCordas}) · [▶ Codorna](${codorna}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **corda** (rope/cord) from Latin *chorda* / Greek χορδή — the **object** that holds a [nó](${no}) (knot). Not [codorna](${codorna}) (quail). Not [string theory](${teoriaCordas}). Catalog: [Objetos](${objetos}). Close: [Valeu !!!](${mantra}).

## Status

**Approved** — rope as thing; knot lives on it; quail is another etymon.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Knot](${no}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Corda** (cuerda) del lat. *chorda* / gr. χορδή — el **objeto** donde vive el [nó](${no}). No es [codorna](${codorna}). No es la [teoría de cuerdas](${teoriaCordas}). Catálogo: [Objetos](${objetos}). Cierre: [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — cuerda como cosa; el nudo vive en ella; la codorniz es otro étimo.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Nó](${no}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCordaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCordaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-corda', 175);
  return makePalavra({
    title: 'Inspeção: Corda — o objecto onde mora o nó',
    titleEn: 'Inspection: Corda — the object where the knot lives',
    titleEs: 'Inspección: Corda — el objeto donde vive el nudo',
    excerpt:
      'Palavras-objecto: «corda» (lat. *chorda*) — fio que recebe o nó; ≠ cinta ≠ codorna; catálogo Objetos; Valeu !!!',
    excerptEn:
      'Object-word: “corda” (Lat. *chorda*) — rope that takes the knot; ≠ tape ≠ quail; Objects catalog; Valeu !!!',
    excerptEs:
      'Palabra-objeto: «corda» (lat. *chorda*) — cuerda que recibe el nudo; ≠ cinta ≠ codorniz; catálogo Objetos; ¡Valeu !!!',
    slug: 'inspecao-palavra-corda',
    date: '2026-08-22T03:12:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Corda · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCordaPost, buildCordaBodies };
