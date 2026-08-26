'use strict';

/**
 * Inspeção Palavras · étimo
 * Gr. ἔτυμον «sentido verdadeiro» · a peça ≠ o ofício (etimologia)
 * Espécime de campo: lat. āctiō ← agere («fazer, impulsionar») = étimo de ação
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/etimo-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/%C3%A9timo';
const WIKI_ETYMON = 'https://en.wiktionary.org/wiki/etymon';
const WIKI_GREEK = 'https://en.wiktionary.org/wiki/%E1%BC%94%CF%84%CF%85%CE%BC%CE%BF%CE%BD#Ancient_Greek';
const WIKI_ACTIO = 'https://en.wiktionary.org/wiki/actio#Latin';
const WIKI_AGERE = 'https://en.wiktionary.org/wiki/ago#Latin';

function buildEtimoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[étimo](${self})** — a **peça** da origem (gr. *étymon*, «sentido verdadeiro»). Pedido de campo: *inspeções Étimo: latim āctiō ← agere («fazer, impulsionar»)*. Esta ficha cobre o **objecto** (o vocábulo *étimo*), o corte com **[etimologia](${etimologia})** (o ofício), e o **espécime vivo**: o étimo de **[ação](${acao})** é lat. *āctiō* ← *agere* («fazer, impulsionar»). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · étimo](${WIKI}), gr. [*ἔτυμον*](${WIKI_GREEK}), EN [*etymon*](${WIKI_ETYMON}), lat. [*āctiō*](${WIKI_ACTIO}), [*agere*](${WIKI_AGERE}). **Ficha ≠ dicionário etimológico completo.** O étimo de *étimo* é grego; *āctiō* ← *agere* é o étimo de [ação](${acao}), não desta palavra. Tom: [verdade](${verdade}).

**Gatilho:** *étimo* / *etimo* / *etymon* / *āctiō ← agere* → lema **étimo**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **étimo** (plural **étimos**) |
| Grafia irmã | **etimo** (sem acento) · EN **etymon** |
| Classe | Substantivo masculino |
| Étimo (desta palavra) | Gr. *ἔτυμον* (*étymon*) «sentido verdadeiro» ← *ἔτυμος* (*étymos*) «verdadeiro» — confiança: **alta** |
| Espécime de campo | [ação](${acao}): lat. *āctiō* ← *agere* («fazer, impulsionar») — confiança: **alta** |
| Família | [etimologia](${etimologia}) · *etimológico* · *etimologista* |
| Tipo BudGanja | Palavra — a **peça**; o ofício fica na ficha [etimologia](${etimologia}) |
| Elo mínimo | **[etimologia](${etimologia})** — o ofício que procura o étimo |
| Elo espécime | **[ação](${acao})** · [gesto](${gesto}) |
| Elo método | [verdade](${verdade}) · [língua portuguesa](${lingua}) · [Valeu !!!](${mantra}) |
| Fonte | [Wikcionário · étimo](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia a **origem rastreável** de uma palavra (ou a melhor hipótese, com grau de confiança). Não é a história que «encaixa demais». Não é o estudo — o estudo chama-se [etimologia](${etimologia}).

## 2. Hipóteses e método

**H1:** *étimo* herda *étymos* — **verdadeiro**, não folclore.  
**H2:** o **étimo** é a peça; a **[etimologia](${etimologia})** é o ofício que a procura.  
**H3:** o pedido de campo aponta um **espécime**, não o étimo desta palavra: *āctiō* ← *agere* («fazer, impulsionar») é o étimo de [ação](${acao}).  
**H4:** [Valeu !!!](${mantra}) = nomear a peça certa, na ficha certa.

Passos: (1) étimo da palavra *étimo*; (2) corte peça × ofício; (3) espécime *agere*; (4) cortes; (5) rede; (6) limites.

## 3. Origens (da palavra *étimo*)

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Gr. *ἔτυμον* (*étymon*) | O sentido verdadeiro de uma palavra — a peça | Alta |
| Gr. *ἔτυμος* (*étymos*) | Verdadeiro, real, autêntico — elo com [verdade](${verdade}) | Alta |
| Lat. culto *etymon* | Empréstimo do grego | Alta |
| PT *étimo* | Via latim / romance culto | Alta |
| EN *etymon* | Cognato culto, não étimo do português | Alta (paralelo) |

**Veredicto etimológico:** origem **grega** fechada (*étymos* → *étymon* → étimo). O que o campo pediu (*āctiō* ← *agere*) é **outro** étimo — o de [ação](${acao}).

## 4. Espécime: *āctiō* ← *agere* («fazer, impulsionar»)

Pedido de campo, ficha de [ação](${acao}):

| Peça | Valor |
|------|-------|
| Palavra inspecionada | **[ação](${acao})** / **acção** |
| Étimo (trabalho) | Lat. *āctiō, -ōnis* ← *agere* / *āctus* |
| Gloss | «fazer, impulsionar» |
| Confiança | **Alta** |
| Família | *ato* / *acto* · *actor* · *ativo* · *agência* · *reagente* · *transação* |
| O que **não** é | Étimo de *étimo* (esse é grego) · [gesto](${gesto}) (unidade mínima) · ações da bolsa |

**Como ler o espécime:** *agere* é o verbo («fazer, impulsionar, conduzir»); *āctiō* é o nome do feito; [ação](${acao}) herda o nome. O [gesto](${gesto}) é o acto concreto da mão; a ação **nomeia a cadeia**.

## 5. Étimo ≠ etimologia ≠ popular

| Termo | Papel | Exemplo |
|-------|-------|---------|
| **[Étimo](${self})** | A peça — origem rastreável (ou a melhor hipótese) | *āctiō* ← *agere* para [ação](${acao}) |
| **[Etimologia](${etimologia})** | O ofício de procurar essa peça | Esta série Palavras |
| **Etimologia popular** | História **falsa** que encaixa demais | *cara+alho* — [trocadilho](${trocadilho}) |
| **[Aglutinação](${aglutinacao})** | Solda gramatical que **é** origem | *planalto* = plano+alto |
| **[Polimorfismo](${polimorfismo})** | Muitas formas do mesmo — outro mapa | Não é étimo |

**Regra:** o étimo **informa**; o uso vivo decide o ofício de hoje. Saber que [ação](${acao}) vem de *agere* não manda na bolsa nem no filme — só corta as salas.

## 6. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Peça** | «qual é o étimo?» | Esta ficha + tabela Origens de cada palavra |
| **Ofício** | «qual é a etimologia?» | [etimologia](${etimologia}) |
| **Espécime** | *āctiō* ← *agere* | [ação](${acao}) — «fazer, impulsionar» |
| **Confiança** | alta / média / em disputa | [maconha](${maconha}) marca disputa; *agere* fecha |
| **Fechar** | Depois de nomear a peça | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear o **étimo** para **não fundir a peça com o ofício** — *étymos* à vista; espécime *agere* na ficha [ação](${acao}); popular cortado.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[etimologia](${etimologia})** | O ofício — irmã desta ficha |
| **[ação](${acao})** | Espécime: *āctiō* ← *agere* («fazer, impulsionar») |
| [gesto](${gesto}) | Unidade mínima do fazer — corte da ficha ação |
| [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) · [polimorfismo](${polimorfismo}) | Popular · solda verdadeira · outro mapa |
| [maconha](${maconha}) | Étimo em disputa — o método quando não fecha |
| [verdade](${verdade}) · [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | *Étymos* = verdadeiro; catálogo |
| [Valeu !!!](${mantra}) | Nomear a peça certa, hoje |

### Como ler

1. Entrar pela **peça** (esta ficha) ou pelo **ofício** ([etimologia](${etimologia})).  
2. Se vier *āctiō* ← *agere*, ir a **[ação](${acao})** — é o espécime, não o étimo de *étimo*.  
3. Se vier *cara+alho*, ir a [trocadilho](${trocadilho}) — popular ≠ étimo.  
4. Fechar com [Valeu !!!](${mantra}).  
5. Voltar ao [hub](${hubAll}).

## 8. Limites

- Não inventaria todos os étimos do catálogo — cada palavra tem a sua tabela.  
- Não é curso de linguística histórica.  
- *āctiō* ← *agere* não substitui a ficha [ação](${acao}).  
- Étimo em disputa marca-se; não se fecha à força.

## Status

**Aprovado** — **étimo** fichado como **peça** (gr. *étymon*); ofício em [etimologia](${etimologia}); espécime **[ação](${acao})**: lat. *āctiō* ← *agere* («fazer, impulsionar»); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Ação](${acao}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **étimo** (etymon) — the **piece**: a word’s traceable origin (or the best hypothesis). Field request: *Étimo: Latin āctiō ← agere (“to do, to drive”)*. Covers **object**, the cut with **[etimologia](${etimologia})** (the craft), and the **specimen**: the etymon of **[ação](${acao})** is Lat. *āctiō* ← *agere*. Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · étimo](${WIKI}), Gk. [*étymon*](${WIKI_GREEK}), Lat. [*āctiō*](${WIKI_ACTIO}). The etymon of *étimo* is Greek; *āctiō* ← *agere* is the etymon of [ação](${acao}), not of this word.

## Object

| Field | Value |
|-------|-------|
| Word | **étimo** / EN **etymon** |
| Etymon (this word) | Gk. *étymon* “true sense” ← *étymos* “true” (high confidence) |
| Specimen | [ação](${acao}): Lat. *āctiō* ← *agere* (“to do, to drive”) |
| Cut | piece ≠ [etimologia](${etimologia}) ≠ folk etymology |
| Date | ${inspected} |

**Cut:** the **étimo** is the piece; **etimologia** is the craft. *āctiō* ← *agere* belongs on the [ação](${acao}) sheet.

## Status

**Approved** — piece named; craft on [etimologia](${etimologia}); specimen *agere* on [ação](${acao}).

[▶ Words](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Ação](${acao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **étimo** — la **pieza**: el origen rastreable (o la mejor hipótesis). Pedido de campo: *Étimo: latín āctiō ← agere («hacer, impulsar»)*. Cubre **objeto**, el corte con **[etimologia](${etimologia})** (el oficio) y el **espécimen**: el étimo de **[ação](${acao})** es lat. *āctiō* ← *agere*. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · étimo](${WIKI}), gr. [*étymon*](${WIKI_GREEK}), lat. [*āctiō*](${WIKI_ACTIO}). El étimo de *étimo* es griego; *āctiō* ← *agere* es el étimo de [ação](${acao}), no de esta palabra.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **étimo** / EN **etymon** |
| Étimo (esta palabra) | Gr. *étymon* «sentido verdadero» ← *étymos* «verdadero» (confianza alta) |
| Espécimen | [ação](${acao}): lat. *āctiō* ← *agere* («hacer, impulsar») |
| Corte | pieza ≠ [etimologia](${etimologia}) ≠ etimología popular |
| Fecha | ${inspected} |

**Corte:** el **étimo** es la pieza; la **etimologia** es el oficio. *āctiō* ← *agere* vive en la ficha [ação](${acao}).

## Estado

**Aprobada** — pieza nombrada; oficio en [etimologia](${etimologia}); espécimen *agere* en [ação](${acao}).

[▶ Palabras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Ação](${acao}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildEtimoPost() {
  const { body, contentEn, contentEs, wiki } = buildEtimoBodies();
  let seriesOrder = 292;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-etimo');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts
          .filter((p) => p.series === 'palavras-origem')
          .map((p) => p.seriesOrder)
          .filter((n) => typeof n === 'number')
      );
      const max = taken.size ? Math.max(...taken) : 291;
      seriesOrder = max + 1;
    }
  } catch (_) {
    /* keep 292 */
  }

  return makePalavra({
    title: 'Inspeção: Étimo — a peça da origem (āctiō ← agere)',
    titleEn: 'Inspection: Étimo — the origin piece (āctiō ← agere)',
    titleEs: 'Inspección: Étimo — la pieza del origen (āctiō ← agere)',
    excerpt:
      'Palavras: «étimo» (gr. étymon) — a peça ≠ etimologia; espécime ação: lat. āctiō ← agere («fazer, impulsionar»); Valeu !!!',
    excerptEn:
      'Words: “étimo” (Gk. étymon) — the piece ≠ etymology; specimen ação: Lat. āctiō ← agere (“to do, to drive”); Valeu !!!',
    excerptEs:
      'Palabras: «étimo» (gr. étymon) — la pieza ≠ etimología; espécimen ação: lat. āctiō ← agere («hacer, impulsar»); ¡Valeu !!!',
    slug: 'inspecao-palavra-etimo',
    date: '2026-08-24T10:36:00.000Z',
    seriesOrder,
    seriesLabel: 'Étimo · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEtimoPost,
  buildEtimoBodies
};
