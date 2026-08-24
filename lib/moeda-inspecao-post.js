'use strict';

/**
 * Inspeção Palavras / objecto · moeda
 * Pedido: relação mola × moela × moeda.
 * Eixos: lat. monēta ← Juno Moneta ← monēre (avisar) ·
 * disco cunhado × unidade de valor ·
 * ≠ mola (mollis) ≠ moela (*molēlla) ≠ peso (moeda-peso) ·
 * catálogo Objectos · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/moeda-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/moeda';
const WIKT_EN = 'https://en.wiktionary.org/wiki/moeda';
const WIKT_MONETA = 'https://en.wiktionary.org/wiki/moneta#Latin';
const WIKT_MONERE = 'https://en.wiktionary.org/wiki/moneo#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Moeda';
const WIKI_JUNO = 'https://pt.wikipedia.org/wiki/Juno_(mitologia)';
const WIKI_MINT = 'https://pt.wikipedia.org/wiki/Casa_da_Moeda';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildMoedaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-moeda.html';
  const mola = '/posts/post-inspecao-palavra-mola.html';
  const moela = '/posts/post-inspecao-palavra-moela.html';
  const mula = '/posts/post-inspecao-animal-mula.html';
  const balancar = '/posts/post-inspecao-palavra-balancar.html';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const galinha = '/posts/post-inspecao-animal-galinha.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [moeda](${self})** — o **disco cunhado** e o nome da **unidade de valor**. Pedido de campo: [relação](${relacao}) **mola · moela · moeda**. A orelha cola as três (*mo-*); o lab **separa**. *Moeda* vem do latim *monēta*: primeiro o epíteto de **Juno Moneta** («a que avisa», de *monēre*), depois o **templo** no Capitólio onde se cunhava, depois a **peça**. A [mola](${mola}) é *mollis*. A [moela](${moela}) é a mózinha (*molēlla*). Esta ficha entra no catálogo [Objectos](${objetos}) como **coisa**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · moeda](${WIKT}), [EN](${WIKT_EN}), lat. [*monēta*](${WIKT_MONETA}), [*moneō*](${WIKT_MONERE}), [WP · moeda](${WIKI}), [Juno](${WIKI_JUNO}), [casa da moeda](${WIKI_MINT}). **Ficha ≠ consultoria financeira, ≠ numismática de catálogo, ≠ câmbio, ≠ aposta.** Sem afiliação bancária nem de casa da moeda. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *moeda* / *moedas* / *monetário* → esta ficha. *mola* → [objecto](${mola}). *moela* → [órgão](${moela}). *peso* (moeda) → outra sala na ficha [balançar](${balancar}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **moeda** — disco metálico cunhado; também a **unidade** (real, euro…) e, por extensão, o **dinheiro** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *monēta* ← *Monēta* (Juno) ← *monēre* «avisar / recordar» — confiança: **alta** |
| Família verdadeira | *monetário* · *monetizar* · casa da **moeda** · esp. *moneda* · it. *moneta* · fr. *monnaie* · en. *money* / *mint* |
| Não é | [mola](${mola}) (*mollis*) · [moela](${moela}) (*molēlla*) · [mula](${mula}) · *peso* como dieta |
| Tipo BudGanja | Objecto — cunho × aviso × valor |
| Catálogo | [Objectos](${objetos}) · lema [objetos](${objetosLema}) |
| Elo do trio | [mola](${mola}) · [moela](${moela}) — orelha, não sangue |
| Fonte | [moeda](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um disco (em regra metal) com **marca de autoridade** — o cunho transforma metal em **valor declarado**. No lab: a moeda **não** é mola nem moela; é **aviso que circula** (o nome da deusa) feito **peça**.

## 2. O trio de orelha (o pedido)

| Forma | Étimo | Ofício | Sangue com moeda |
|-------|-------|--------|------------------|
| **[mola](${mola})** | it. *molla* ← *mollis* | Peça que cede e volta | **Não** |
| **[moela](${moela})** | *molēlla* ← lat. *mola* (mó) | Moinho da [galinha](${galinha}) | **Não** — um *l* / um *d* |
| **moeda** | lat. *monēta* ← *monēre* | Disco / unidade — esta ficha | **Sim** (consigo) |
| **money / mint** | a mesma *monēta* | EN: dinheiro / casa da moeda | **Sim** — irmãos |
| **peso** (moeda) | lat. *pensum* | Unidade que pesa — ficha [balançar](${balancar}) | **Não** — outra sala já cortada |

**H1:** a [relação](${relacao}) pedida é de **orelha** no trio; de **sangue** só na casa de Juno Moneta.  
**H2:** *moela* / *moeda* é [trocadilho](${trocadilho}) mínimo (*l* / *d*) — petisco × disco.  
**H3:** o folk «paga a moela com a moeda» é **uso** de mercado, não étimo.  
**H4:** *monēre* (avisar) sobrevive em *admoestar*, *premonição*, *monumento* — família do aviso, não do moinho.

## 3. Juno Moneta — o aviso que virou peça

Três camadas do étimo — sem romance de templo:

| Camada | O que **é** |
|--------|-------------|
| **Deusa** | *Monēta* = «a que avisa» (*monēre*); epíteto de Juno |
| **Sítio** | Templo no Capitólio; gansos do aviso; depois **oficina de cunho** |
| **Peça** | O produto da oficina toma o nome do sítio: *monēta* → **moeda** |

O lab não precisa da lenda dos gansos para o ofício: o percurso **aviso → templo → cunho → disco** basta. A [relação](${relacao}) com mola e moela **não** passa por Juno: passa pela **boca** (*mo-*).

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Moela** | Quase a mesma palavra | Órgão-moinho; esta ficha é cunho |
| **Mola** | Mesmo *mo-* | Peça elástica |
| **Mó** | Moer valor? | Pedra de moinho — sangue da [moela](${moela}), não desta |
| **Peso** | Toda moeda «pesa» | A unidade *peso* é [balançar](${balancar}); outra árvore |
| **Notas** | Papel = moeda | Extensão: a **unidade**; o objecto desta ficha é o **disco** |
| **Colecção** | Catálogo prova o étimo | Sem afiliação numismática |

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Disco** | «uma moeda de um real» | Bom: o objecto |
| **Unidade** | «a moeda do país» | Bom: o sistema; mau: aula de câmbio |
| **Dinheiro** | «não tenho moeda» | Extensão viva |
| **Trio** | *mola, moela, moeda* | Bom no [trocadilho](${trocadilho}); mau como étimo único |
| **Bar** | «moela por uma moeda» | Uso; não sangue |
| **Cunhar** | «cunhar moeda» / sentido figura | Bom se se nomeia a figura |

**Finalidade-mãe:** nomear a **moeda** para inspecionar o **disco que avisa valor**, e cruzar com [mola](${mola}) e [moela](${moela}) **sem** colar peça nem órgão no cunho.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Disco cunhado — catálogo [Objectos](${objetos}) |
| Trio | [Mola](${mola}) · [moela](${moela}) · **moeda** |
| Aviso | *monēre* — a deusa no nome |
| Peso | [Balançar](${balancar}) — a moeda *peso* é outra sala |
| Método | [Relação](${relacao}) · [trocadilho](${trocadilho}) · [étimo](${etimo}) |
| Mantra | [Valeu !!!](${mantra}) — o melhor **nesta** peça, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **moeda** é *monēta* (aviso → cunho); **mola** é *mollis*; **moela** é mózinha. A orelha junta; Juno não moí.

## Hipóteses (síntese)

**H1:** *moeda* < lat. *monēta* < *monēre* — alta.  
**H2:** sem sangue com [mola](${mola}) nem [moela](${moela}).  
**H3:** a [relação](${relacao}) pedida = orelha + [trocadilho](${trocadilho}) *l*/*d* com a [moela](${moela}).  
**H4:** *peso* (unidade) ≠ esta árvore — ver [balançar](${balancar}).  
**H5:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mola](${mola}) | A peça — orelha cola |
| [Moela](${moela}) | O órgão — orelha cola; *l* / *d* |
| [Galinha](${galinha}) | A ave da moela — não desta peça |
| [Balançar](${balancar}) | *Peso* (moeda) já cortado da dieta |
| [Objectos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Trocadilho](${trocadilho}) · [relação](${relacao}) | O jogo e o *entre* |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Tesoura |
| [Gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) | Cunhar sem fundir |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é consultoria, câmbio, investimento nem catálogo para coleccionador.  
- Não é história completa de Juno nem manual de casa da moeda.  
- Papel-moeda e crédito são **extensões** da unidade; o objecto âncora é o disco.  
- Sem afiliação ao Banco Central nem a casas de numismática.

## Status

**Aprovado** — **moeda** fichada como **objecto** (*monēta* ← *monēre*); catálogo [Objectos](${objetos}); [relação](${relacao}) de orelha com [mola](${mola}) e [moela](${moela}) — **sem** fundir étimos. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objectos](${objetos}) · [▶ Mola](${mola}) · [▶ Moela](${moela}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **moeda** — the **struck disc** and the **currency unit**. Field request: [relação](${relacao}) **mola · moela · moeda**. The ear glues the three; the lab **splits** them. *Moeda* < Lat. *monēta* (Juno Moneta, *monēre* “to warn”) → temple mint → coin. The [spring](${mola}) is *mollis*. The [gizzard](${moela}) is *molēlla*. Catalog: [Objectos](${objetos}). Close: [Valeu !!!](${mantra}).

> Independent audit. [moeda](${WIKT_EN}), [*monēta*](${WIKT_MONETA}). Not financial advice. Not a collector catalogue.

## Object

| Field | Value |
|-------|-------|
| Thing | Struck metal disc; also the unit of value |
| Etymon | Lat. *monēta* ← *monēre* |
| Not | [spring](${mola}) · [gizzard](${moela}) · *peso* as diet ([balançar](${balancar})) |
| Catalog | [Objectos](${objetos}) |

**H1:** requested [relação](${relacao}) = ear on the trio; blood only in the Moneta house.  
**H2:** *moela* / *moeda* is a one-phoneme pun (*l* / *d*).

## Status

**Approved** — **moeda** as thing (*monēta*); [mola](${mola}) as spring; [moela](${moela}) as little mill.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Portugués **moeda** — el **disco acuñado** y la **unidad**. Pedido: [relación](${relacao}) **mola · moela · moeda**. El oído pega; el lab **separa**. *Moeda* < lat. *monēta* (Juno Moneta, *monēre* «avisar»). El [muelle](${mola}) es *mollis*. La [molleja](${moela}) es *molēlla*. Catálogo: [Objectos](${objetos}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [moeda](${WIKT}), [*monēta*](${WIKT_MONETA}). No es consejo financiero.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Disco metálico acuñado; también la unidad |
| Étimo | lat. *monēta* ← *monēre* |
| No es | [muelle](${mola}) · [molleja](${moela}) · *peso* dieta |
| Catálogo | [Objectos](${objetos}) |

**H1:** la relación pedida es de oído; la sangre es solo Moneta.  
**H2:** *moela* / *moeda* es trocadilho de un fonema (*l* / *d*).

## Estado

**Aprobada** — **moeda** como cosa (*monēta*); [mola](${mola}) como muelle; [moela](${moela}) como molinito.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildMoedaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMoedaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-moeda', 201);
  const post = makePalavra({
    title: 'Inspeção: Moeda — o disco que avisa valor (≠ mola ≠ moela)',
    titleEn: 'Inspection: Moeda — the disc that warns value (≠ spring ≠ gizzard)',
    titleEs: 'Inspección: Moeda — el disco que avisa valor (≠ muelle ≠ molleja)',
    excerpt:
      'Objecto: moeda (lat. monēta ← monēre) — cunho e unidade; ≠ mola (*mollis*) ≠ moela (*molēlla*); trio de orelha; catálogo Objectos; Valeu !!!',
    excerptEn:
      'Object: moeda (Lat. monēta ← monēre) — mint and unit; ≠ spring ≠ gizzard; ear trio; Objects catalog; Valeu !!!',
    excerptEs:
      'Objeto: moeda (lat. monēta ← monēre) — cuño y unidad; ≠ muelle ≠ molleja; trío de oído; catálogo Objetos; ¡Valeu !!!',
    slug: 'inspecao-palavra-moeda',
    date: '2026-08-24T14:12:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Moeda · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.content_raw = post.content_raw || body;
  post.excerpt = post.excerpt;
  post.seriesOrder = post.seriesOrder;
  post.seriesLabel = post.seriesLabel;
  return post;
}

module.exports = { buildMoedaPost, buildMoedaBodies, COVER, WIKT, WIKI };
