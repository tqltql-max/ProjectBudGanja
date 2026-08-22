'use strict';

/**
 * Inspeção Palavras · nó
 * Eixos: lat. nodus · laço na corda · nó da haste ·
 * ≠ corda · ≠ codorna · elo desatar / desastre / ufa
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/no-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/n%C3%B3';
const WIKT_LA = 'https://en.wiktionary.org/wiki/nodus#Latin';

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

function buildNoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const codorna = '/posts/post-inspecao-animal-codorna.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const objetos = '/objetos/';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[nó](${self})** — o **laço** que aperta na [corda](${corda}), o **cruzamento** que segura, e o **nó da haste** na planta. Pedido de campo: *Nó* · expressão **[nó na vida!](${noVida})**. Esta ficha é o **objecto lexical**. O gesto de soltar vai a **[desatar](${desatar})** e a **[desatar o nó](${desatarNo})**. O suspiro depois: **[ufa](${ufa})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · nó](${WIKT}), lat. [nodus](${WIKT_LA}). **Ficha ≠ manual de nós náuticos, ≠ protocolo clínico, ≠ cena de força.** Elos: [corda](${corda}) (objecto) · [codorna](${codorna}) (ave — **outro** étimo; ouvido de [trocadilho](${trocadilho})) · [conexão](${conexao}) (*nectere* / nexo, vizinha). Fecho: [Faça o melhor!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **nó** |
| Classe | Substantivo masculino |
| Étimo | lat. *nodus* «laço, nó, protuberância» — confiança: **alta** |
| Família | *anudar* · *desnudar* (outro ofício) · *nódulo* · *nodo* (grafia técnica) · *node* (EN) |
| Cognatos | esp. *nudo* · fr. *nœud* · it. *nodo* · ing. *knot* / *node* |
| Tipo BudGanja | Palavra — laço × cruzamento × aperto |
| Não é | [corda](${corda}) · [codorna](${codorna}) · [desastre](${desastre}) |
| Elo | [desatar](${desatar}) · [nó na vida!](${noVida}) · [desatar o nó](${desatarNo}) · [cinta](${cinta}) · [vida](${vida}) |
| Data | ${inspected} |

**O que é o objecto:** o ponto onde a [corda](${corda}) **cruza e segura**. Sem corda, o nó não tem suporte; sem [gesto](${gesto}), o nó não se faz nem se solta.

## 2. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Laço** | Amarração na corda, no fio, no cadarço | Alta |
| **Aperto** | O que trava o [caminho](${caminho}) até [desatar](${desatar}) | Alta |
| **Botânica** | Nó da haste / gomo | Alta (uso agrário) |
| **Rede** | Nó = ponto de [conexão](${conexao}) (grafo, mapa) | Alta no técnico |
| **Figura** | [Nó na vida!](${noVida}) — o laço no arco da [vida](${vida}) | Alta (oralidade BR) |

**H1:** *nó* < *nodus* — laço e protuberância.  
**H2:** o objecto do nó é a [corda](${corda}); a ave [codorna](${codorna}) só **soa** perto.  
**H3:** o ofício do lab não é apertar mais — é nomear o laço e, depois, [desatar o nó](${desatarNo}).

## 3. O que não é

| Forma | Ofício | Distinção |
|-------|--------|-----------|
| **[corda](${corda})** | Objecto / fio | Onde o nó mora |
| **[codorna](${codorna})** | Ave (*Coturnix*) | Ouvido de [trocadilho](${trocadilho}) — **não** é o fio |
| **[desastre](${desastre})** | Má estrela / catástrofe | ≠ «nó mal desatado»; étimo *astro* |
| **[cinta](${cinta})** | Faixa que cinge | Irmã de suporte; outro objecto |

## 4. Faça o melhor!

Nomear o **nó** com [verdade](${verdade}). Não fingir que a [vida](${vida}) não tem laço. O próximo gesto: **[desatar](${desatar})**. O fecho vivo: [Faça o melhor!](${mantra}) — e, se o peito soltar, **[ufa](${ufa})**.

## Status

**Aprovado** — **nó** fichado: *nodus*; mora na [corda](${corda}); figura em [nó na vida!](${noVida}); solta-se em [desatar o nó](${desatarNo}).

[▶ Palavras](${hub}) · [▶ Corda](${corda}) · [▶ Desatar](${desatar}) · [▶ Nó na vida!](${noVida}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **nó** (knot) from Latin *nodus* — the crossing that holds on a [corda](${corda}) (rope). Figure: [nó na vida!](${noVida}). Craft of release: [desatar o nó](${desatarNo}). Not [codorna](${codorna}) (quail). Close: [Do your best!](${mantra}).

## Status

**Approved** — knot named; rope is the object; untying is the next gesture.

[▶ Words](${hub}) · [▶ Corda](${corda}) · [▶ Untie](${desatar}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

**Nó** (nudo) del lat. *nodus* — el cruce que sujeta en la [corda](${corda}). Figura: [nó na vida!](${noVida}). Oficio de soltar: [desatar o nó](${desatarNo}). No es [codorna](${codorna}). Cierre: [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobado** — nudo nombrado; la cuerda es el objeto; desatar es el gesto siguiente.

[▶ Palabras](${hub}) · [▶ Corda](${corda}) · [▶ Desatar](${desatar}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildNoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildNoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-no', 174);
  return makePalavra({
    title: 'Inspeção: Nó — o laço na corda, antes de desatar',
    titleEn: 'Inspection: Nó — the knot on the rope, before untying',
    titleEs: 'Inspección: Nó — el nudo en la cuerda, antes de desatar',
    excerpt:
      'Palavras: «nó» (lat. *nodus*) — laço na corda e na vida; ≠ corda ≠ codorna; elos desatar / desastre / ufa; Faça o melhor!',
    excerptEn:
      'Words: “nó” (Lat. *nodus*) — knot on the rope and in life; ≠ rope ≠ quail; links untying / disaster / phew; Do your best!',
    excerptEs:
      'Palabras: «nó» (lat. *nodus*) — nudo en la cuerda y en la vida; ≠ cuerda ≠ codorniz; vínculos desatar / desastre / ufa; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-no',
    date: '2026-08-22T03:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Nó · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildNoPost, buildNoBodies };
