'use strict';

/**
 * Inspeção Expressões · mindinho
 * Parlenda dos cinco dedos da MÃO.
 * Pedido: Mindinho · seu vizinhio · Pai de todos · FUra bolo · Mat Piolho
 * Relação de orelha: mundinho · mudinho.
 * Gatilho de campo anterior: contato com objeto escada · dedo do pé esquerdo · dor
 *   — não fundir parlenda da mão com o acidente do pé.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mindinho-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/mindinho';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Mindinho.
A orelha ouviu mundinho.
Ouviu mudinho.
Três sopros.
Três salas.

Este é o mais miúdo.
Este é o vizinho.
Este é o pai de todos.
Este fura o bolo.
Este mata o piolho.

Não é o pé.
Não é o mundinho.
Não é a mudinha.
É a mão que a parlenda conta
um dedo de cada vez.

Valeu !!!
no mindinho,
sem colar o mundo no dedo.`;
}

function poemEn() {
  return `Mindinho.
The ear heard mundinho.
Heard mudinho.
Three breaths.
Three rooms.

This is the smallest.
This is the neighbour.
This is the father of all.
This one pokes the cake.
This one kills the louse.

It is not the toe.
It is not the little world.
It is not the seedling.
It is the hand the rhyme counts
one finger at a time.

Valeu !!!
on the pinky,
without gluing the world to the digit.`;
}

function poemEs() {
  return `Mindinho.
La oreja oyó mundinho.
Oyó mudinho.
Tres soplos.
Tres salas.

Este es el más chico.
Este es el vecino.
Este es el padre de todos.
Este hurga el bolo.
Este mata el piojo.

No es el pie.
No es el mundito.
No es la plantita.
Es la mano que la rima cuenta
un dedo cada vez.

Valeu !!!
en el meñique,
sin pegar el mundo al dedo.`;
}

function buildMindinhoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-expressao-mindinho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const mudinha = '/posts/post-inspecao-palavra-mudinha.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const secos = '/posts/post-inspecao-expressao-secos-e-molhados.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiMundo = 'https://pt.wiktionary.org/wiki/mundo';
  const wikiMudo = 'https://pt.wiktionary.org/wiki/mudo';
  const wikiMiudo = 'https://pt.wiktionary.org/wiki/miúdo';
  const ciber = 'https://ciberduvidas.iscte-iul.pt/consultorio/perguntas/os-nomes-dos-dedos-da-mao-em-linguagem-popular-de-portugal/28959';

  const body = `## Escopo

Inspeção editorial da expressão **«[mindinho](${self})»** — o **mais miúdo** da [mão](${maos}) e, em cadeia, a **parlenda** que nomeia os cinco dedos. Pedido de campo: *Mindinho* · *seu vizinhio* · *Pai de todos* · *FUra bolo* · *Mat Piolho*, com relação a **Mundinho** e **Mudinho**.

[A orelha cola](${orelhaCola}) *mindinho* em *mundinho* e *mudinho*. O étimo **corta**.

Gatilho anterior do mesmo sopro: *bpm dia* · *contato com objeto escada* · *dedo do pé esquerto* · *dor*. A parlenda é da **mão**. O contato é do **pé**. Duas salas.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mindinho](${WIKI}) (lat. *minutínu* ← *minūtus* / [miúdo](${wikiMiudo})), [mundo](${wikiMundo}), [mudo](${wikiMudo}), [Ciberdúvidas · nomes populares dos dedos](${ciber}). **Ficha ≠ protocolo clínico, ≠ CAT, ≠ receita de bolo, ≠ manual de piolho, ≠ teologia do Pai.** Tom: [gesto](${gesto}) que conta a mão; [verdade](${verdade}) do étimo.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Âncora | **mindinho** (também: *dedo mindinho*) |
| Classe | Parlenda / lengalenga + nome popular do dedo mínimo |
| Étimo (trabalho) | Lat. *minutínu* ← *minūtus* («miúdo») — confiança **alta** (Wikcionário) |
| Variante | *minguinho* (de *mínimo* / *mingo* + *-inho*) — mesma sala, outra porta |
| Tipo BudGanja | Expressão — conta os cinco; o étimo guarda o miúdo |
| Elo mão | [mãos](${maos}) · [esquerdo](${esquerdo}) · [gesto](${gesto}) |
| Elo cola | [A orelha cola](${orelhaCola}) · **mundinho** · **mudinho** · [mudinha](${mudinha}) |
| Elo campo | [objetos](${objetos}) (escada) · [risco](${risco}) · [gesso](${gesso}) · [sinais](${sinais}) (dor) · [em pé](${emPe}) |
| Fonte | [mindinho](${WIKI}) · [Ciberdúvidas](${ciber}) |
| Data | ${inspected} |

**Objecto:** a fórmula viva que **toca** a mão, um dedo de cada vez. Não é anatomia de atlas. Não é o [mundo](${wikiMundo}) pequeno. Não é a [mudinha](${mudinha}).

## 2. A parlenda — cinco nomes, cinco ofícios

Forma canónica de trabalho (BR, com variantes PT):

> Dedo **mindinho**, seu **vizinho**, **pai de todos**, **fura-bolo**, **mata-piolho**.

| Pedido de campo | Forma canónica | Dedo (atlas) | Ofício da parlenda |
|-----------------|----------------|--------------|---------------------|
| *Mindinho* | **mindinho** | mínimo / auricular | o mais miúdo |
| *seu vizinhio* | **seu vizinho** | anelar | o que mora ao lado do miúdo |
| *Pai de todos* | **pai de todos** | médio | o maior (*maior de todos* / *maioral*) |
| *FUra bolo* | **fura-bolo** | indicador | o que fura o bolo |
| *Mat Piolho* | **mata-piolho** | polegar | o que esmaga o piolho (também *cata-piolho*) |

**H1:** a cadeia começa no mindinho e acaba no polegar — da borda miúda para o forte.  
**H2:** *vizinhio* não é lema; é orelha / teclado. Canónico: **vizinho**.  
**H3:** *Mat Piolho* lê-se **mata-piolho** (faltou o *a*; o hífen é ofício de composto).  
**H4:** *pai de todos* nesta ficha é o **dedo médio**, não o Pai teológico.  
**H5:** a parlenda é da **mão**. *This little piggy* (EN) conta o **pé**. Não fundir.

## 3. Mindinho × mundinho × mudinho

A boca junta. A orelha cola. O étimo abre três salas.

| Forma | O que a orelha ouve | O que **é** | Étimo (trabalho) |
|-------|---------------------|-------------|------------------|
| **mindinho** | o miúdo da parlenda | dedo mínimo da [mão](${maos}) | *minutínu* / [miúdo](${wikiMiudo}) |
| **mundinho** | quase o mesmo sopro | diminutivo de **mundo** — o mundo pequeno | lat. *mundus* + *-inho* |
| **mudinho** | ainda o mesmo sopro | (A) lapso de *mindinho* (cai o *n*); (B) diminutivo de *mudo*; (C) cola com [mudinha](${mudinha}) | (A) orelha · (B) lat. *mutus* · (C) *muda* / planta jovem |

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Som** | mindinho = mundinho = mudinho | Três lemas; a cola é da [orelha](${orelhaCola}) |
| **Mundinho** | outro nome do dedo | O **mundo** no grau diminuto — outra ficha se o mundo chegar sozinho |
| **Mudinho** | planta / silêncio / dedo | Lapso **ou** *mudo* **ou** cola da [mudinha](${mudinha}) — não fundir as três |
| **Mudinha** | o mesmo *mud-* | Planta jovem do Inverno — [ficha própria](${mudinha}) |
| **Pé / escada / dor** | o mindinho do pé | Contato com [objeto](${objetos}) (escada) no **pé** [esquerdo](${esquerdo}); a parlenda não trata o pé |

**H6:** *mundinho* guarda o *n* do *mundo*. *mindinho* guarda o *n* do *miúdo*. *mudinho* perde um *n* — por isso a orelha hesita.  
**H7:** o laboratório **relaciona** (pedido de campo) e **corta** (étimo). Relacionar ≠ fundir.

## 4. O que a parlenda não é

| Não é | Porquê |
|-------|--------|
| Atlas clínico | mínimo, anelar, médio, indicador, polegar são outra nomenclatura — convivem; não apagam os nomes vivos |
| Acidente do pé | *contato com objeto escada* · *dedo do pé esquerdo* · *dor* = [risco](${risco}) / [sinal](${sinais}) do corpo; ≠ lengalenga |
| [Gesso](${gesso}) | imobilizar o quebrado ≠ nomear o miúdo |
| Teologia | *pai de todos* aqui é o dedo do meio |
| Bula de piolho | *mata-piolho* é o **nome** do polegar na brincadeira, não receita |
| O mundo | *mundinho* fica na sala do *mundus* |

## 5. No laboratório

A [mão](${maos}) conta-se para o [gesto](${gesto}): teclar, misturar o seco primeiro ([secos e molhados](${secos})), subir a escada [em pé](${emPe}) sem dar o pé ao [objeto](${objetos}). O mindinho da **mão** não paga a conta do mindinho do **pé**.

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 6. Valeu !!!

O melhor **hoje** é guardar os cinco nomes **e** a cola: mindinho não é mundinho; mundinho não é mudinho; mudinho não é [mudinha](${mudinha}). [Valeu !!!](${mantra}) — a orelha ouviu; o étimo cortou.

## 7. Estado

**Aprovada** — parlenda fichada; lapsus *vizinhio* / *Mat Piolho* / *FUra* documentados; relação **mundinho** × **mudinho** cortada; gatilho do pé/escada separado da mão.

[▶ Expressões](${hub}) · [▶ Orelha cola](${orelhaCola}) · [▶ Mãos](${maos}) · [▶ Esquerdo](${esquerdo}) · [▶ Mudinha](${mudinha}) · [▶ Objetos](${objetos}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[mindinho](${self})”** — the smallest finger of the [hand](${maos}) and the **nursery rhyme** that names all five. Field: *Mindinho* · *seu vizinhio* · *Pai de todos* · *FUra bolo* · *Mat Piolho*, related to **Mundinho** and **Mudinho**.

[The ear glues](${orelhaCola}) *mindinho* to *mundinho* and *mudinho*. The etymon **cuts**.

Earlier in the same breath: ladder · left toe · pain. The rhyme is the **hand**. The contact is the **foot**. Two rooms.

> Not a clinical protocol, not a cake recipe, not theology, not a lice manual.

## Object

| Field | Value |
|-------|-------|
| Anchor | **mindinho** ← Lat. *minutínu* / *minūtus* (“tiny”) — **high** confidence |
| Chain | mindinho → neighbour → father of all → cake-poker → louse-killer |
| Glue | **mundinho** = little *mundo* (Lat. *mundus*); **mudinho** = slip / mute diminutive / glue with [mudinha](${mudinha}) |
| Not | the toe; [mudinha](${mudinha}); God the Father; English “this little piggy” (toes) |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** five names, three rooms. [Valeu !!!](${mantra}).

[▶ Sayings](${hub}) · [▶ Ear glue](${orelhaCola}) · [▶ Hands](${maos}) · [▶ Mudinha](${mudinha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[mindinho](${self})»** — el dedo más chico de la [mano](${maos}) y la **rima** que nombra los cinco. Pedido: *Mindinho* · *seu vizinhio* · *Pai de todos* · *FUra bolo* · *Mat Piolho*, relación con **Mundinho** y **Mudinho**.

[La oreja pega](${orelhaCola}) *mindinho* a *mundinho* y *mudinho*. El étimo **corta**.

Antes, en el mismo soplo: escalera · dedo del pie izquierdo · dolor. La rima es de la **mano**. El contacto es del **pie**. Dos salas.

> No es protocolo clínico, ni receta, ni teología, ni manual de piojos.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **mindinho** ← lat. *minutínu* / *minūtus* («menudo») — confianza **alta** |
| Cadena | mindinho → vecino → padre de todos → fura-bolo → mata-piolho |
| Cola | **mundinho** = *mundo* chico (lat. *mundus*); **mudinho** = lapsus / diminutivo de *mudo* / cola con [mudinha](${mudinha}) |
| No es | el pie; [mudinha](${mudinha}); el Padre teológico; “this little piggy” (dedos del pie) |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** cinco nombres, tres salas. [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Oreja pega](${orelhaCola}) · [▶ Manos](${maos}) · [▶ Mudinha](${mudinha}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildMindinhoPost() {
  const { body, contentEn, contentEs, wiki } = buildMindinhoBodies();
  const seriesOrder = pickOrder('inspecao-expressao-mindinho', 30);
  return expressaoPost({
    title: 'Inspeção: mindinho — a parlenda dos cinco, mundinho e mudinho',
    titleEn: 'Inspection: mindinho — the five-finger rhyme, mundinho and mudinho',
    titleEs: 'Inspección: mindinho — la rima de los cinco, mundinho y mudinho',
    excerpt:
      'Expressões: mindinho (minutínu) — parlenda da mão; vizinhio→vizinho; mundinho≠mudinho; ≠ pé; Valeu !!!',
    excerptEn:
      'Sayings: mindinho (minutínu) — hand rhyme; vizinhio→vizinho; mundinho≠mudinho; ≠ toe; Valeu !!!',
    excerptEs:
      'Dichos: mindinho (minutínu) — rima de la mano; vizinhio→vizinho; mundinho≠mudinho; ≠ pie; ¡Valeu !!!',
    slug: 'inspecao-expressao-mindinho',
    date: '2026-08-23T12:25:00.000Z',
    seriesOrder,
    seriesLabel: 'mindinho · parlenda',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMindinhoPost,
  buildMindinhoBodies,
  poemPt,
  poemEn,
  poemEs
};
