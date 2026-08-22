'use strict';

/**
 * Inspeção Palavras · alimentar
 * Eixos: lat. alere / alimentum · nutrir × aumentar (lapso ALMENTAR) ·
 * ofício de alimentar a série Palavras · ≠ receita · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/alimentar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/alimentar';
const WIKT_ALIMENTO = 'https://pt.wiktionary.org/wiki/alimento';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildAlimentarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-alimentar.html';
  const fruto = '/posts/post-inspecao-palavra-fruto.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const paraty = '/posts/post-inspecao-palavra-paraty.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const plantas = '/plantas/';
  const vidaHub = '/vida/';

  const palavraHref = palavra;
  const palavraNote = 'Se a ficha-meta da palavra «palavra» ainda não estiver no hub, o ofício fica no [Guia](' + guia + ').';

  const body = `## Escopo

Inspeção editorial da palavra **[alimentar](${self})**. Pedido de campo: *quero almentar as palavras do projeto* · *alimentar*. A boca juntou **aumentar** e **alimentar**. O étimo **corta**. **Alimentar** é nutrir (lat. *alere* / *alimentum*). **Aumentar** é fazer maior. No laboratório, alimentar as [Palavras](${hub}) = **dar de comer ao mapa** (nova ficha, étimo, corte) — não inchar o hub sem objecto.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · alimentar](${WIKT}), [alimento](${WIKT_ALIMENTO}). **Ficha ≠ dieta, ≠ protocolo clínico, ≠ cardápio.** Sem afiliação nutricional.

**Gatilho:** *ALMENTAR* / *almentar* → **alimentar** (não *aumentar*).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **alimentar** |
| Classe | Verbo · também adjetivo (*planta alimentar*) |
| Étimo (trabalho) | Lat. *alimentāre* ← *alimentum* ← *alere* «nutrir, fazer crescer» — confiança: **alta** |
| Família | *alimento* · *alimentação* · *alimentício* · *desalimentar* |
| Tipo BudGanja | Palavra — nutrir × ofício de alimentar o hub |
| Não é | *aumentar* · receita · suplemento |
| Elo vivo | [fruto](${fruto}) · [planta](${planta}) · [Plantas](${plantas}) · [vida](${vida}) |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [sugestão](${sugestao}) · [Guia](${guia}) |
| Data | ${inspected} |

**O que é o objecto:** o verbo de **dar alimento** — ao corpo, à [planta](${planta}), e, neste pedido, à **série Palavras**. [A orelha cola](${orelhaCola}) *almentar* em *aumentar*. O lab alimenta com **ficha**, não com volume vazio.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **alimentar** | Aumentar o site | *alere* — **nutrir** |
| **aumentar** | O mesmo verbo | Lat. *augmentāre* — **fazer maior** — outra sala |
| **ALMENTAR** | Palavra terceira | Lapso: alimentar × aumentar |
| **alimento** | O verbo em nome | O **pão** (substantivo); o verbo é o [gesto](${gesto}) |
| **alimentar o hub** | Spam de páginas | Ofício: cada palavra = objecto + étimo + corte |

**H1:** alimentar = nutrir (*alere*).  
**H2:** aumentar = crescer em quantidade — irmão de ouvido, não de étimo.  
**H3:** alimentar Palavras = [Paraty](${paraty}), remo, o próximo pedido — **uma ficha de cada vez**.  
**H4:** ficha sem [verdade](${verdade}) = comida sem sal.

## Dois ofícios

| Ofício | Onde | Resultado |
|--------|------|-----------|
| **Nutrir** | Corpo, [planta](${planta}), [Vida](${vidaHub}) | Há [fruto](${fruto}) ou sustento |
| **Alimentar o mapa** | [Palavras](${hub}) · [Guia](${guia}) | Há ficha inspeccionável |
| **Aumentar** | Métrica / vaidade | Número sobe; o objecto pode faltar |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Alimentar a série com topónimo, verbo, corte |
| Bom | Nomear o lapso *almentar* |
| Mau | Confundir alimentar com aumentar pageviews |
| Mau | Receita ou dose nesta ficha |

Fecho: [Valeu !!!](${mantra}) — alimentar o que nutre; não inchar o que já está cheio.

## Status

**Aprovado na série Palavras** — *alimentar* ≠ *aumentar*; *ALMENTAR* lido como lapso; ofício de nutrir o hub.

[▶ Palavras](${hub}) · [▶ Guia](${guia}) · [▶ Fruto](${fruto}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **alimentar** (to feed / nourish). Field request: *quero almentar as palavras* · *alimentar*. The ear glues **alimentar** to **aumentar** (to increase). The etymon cuts. *Alimentare* ← *alere* “to nourish.” Feeding the [Words](${hub}) hub = a new inspected object, not empty volume.

> **Method note:** [alimentar](${WIKT}). Not a diet sheet.

## Object

| Field | Value |
|-------|-------|
| Word | **alimentar** |
| Etymon | Lat. *alere* / *alimentum* |
| Slip | *ALMENTAR* → alimentar ≠ aumentar |
| Date | ${inspected} |

[Valeu !!!](${mantra})

## Status

**Approved in Words** — nourish ≠ inflate.
`;

  const contentEs = `## Alcance

Inspección de **alimentar**. Pedido: *almentar las palabras* · *alimentar*. La oreja pega **alimentar** a **aumentar**. El étimo corta. *Alere* = nutrir. Alimentar el hub de [Palabras](${hub}) = ficha con objeto, no hinchar.

> **Nota:** [alimentar](${WIKT}). No es dieta.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **alimentar** |
| Étimo | lat. *alere* |
| Lapsus | *ALMENTAR* → alimentar ≠ aumentar |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — nutrir ≠ inflar.
`;

  return { body, contentEn, contentEs };
}

function buildAlimentarPost() {
  const { body, contentEn, contentEs } = buildAlimentarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-alimentar', 226);
  return makePalavra({
    title: 'Inspeção: Alimentar — nutrir, o hub, e o lapso ALMENTAR',
    titleEn: 'Inspection: Alimentar — to nourish, the hub, and the slip ALMENTAR',
    titleEs: 'Inspección: Alimentar — nutrir, el hub, y el lapsus ALMENTAR',
    excerpt:
      'Palavras: alimentar (lat. alere) ≠ aumentar; ALMENTAR é lapso; ofício de nutrir o hub Palavras; Valeu !!!',
    excerptEn:
      'Words: alimentar (Lat. alere) ≠ aumentar; ALMENTAR is a slip; craft of feeding the Words hub; Valeu !!!',
    excerptEs:
      'Palabras: alimentar (lat. alere) ≠ aumentar; ALMENTAR es lapsus; oficio de nutrir el hub Palabras; ¡Valeu !!!',
    slug: 'inspecao-palavra-alimentar',
    date: '2026-08-22T18:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Alimentar · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAlimentarPost,
  buildAlimentarBodies
};
