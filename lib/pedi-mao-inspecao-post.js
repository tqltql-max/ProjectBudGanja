'use strict';

/**
 * Inspeção Palavras · pedi a mão (pedido «pedimao»)
 * Eixos: pedir + mão · ajuda («uma mão») · pedido de compromisso ·
 * elos gesto / mãos L-R · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPediMaoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiMao = 'https://pt.wiktionary.org/wiki/m%C3%A3o';
  const wikiPedir = 'https://pt.wiktionary.org/wiki/pedir';

  const body = `## Escopo

Inspeção editorial da locução **pedi a mão** (pedido oral/escrito «pedimao») — forma viva de **pedir + mão**: (1) **pedir uma mão** = pedir **ajuda**; (2) **pedir a mão** (de alguém) = pedido tradicional de **compromisso** / casamento. Esta ficha cobre o **objeto**, os dois eixos, a rede com [mãos](${maos}) e [gesto](${gesto}), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mão](${wikiMao}), [pedir](${wikiPedir}), ficha [mão esquerda × direita](${maos}), série [Palavras](${hub}). **Ficha ≠ manual de etiqueta nupcial nem terapia de casal.** Tom: Inspetor BudGanja — *pedi a mão* é [gesto](${gesto}) de **pedir com a mão aberta**, não de agarrar. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma | **pedi a mão** / **pedir a mão** / **pedir uma mão** (colado: *pedimao*) |
| Classe | Locução verbal (pedir + mão) |
| Étimo (trabalho) | *pedir* (lat. *petere*) + *mão* (lat. *manus*) — confiança: **alta** |
| Família | *mão* · *pedir* · *pedido* · *dar uma mão* · *mão amiga* |
| Paralelos | esp. *pedir la mano* / *echar una mano* · fr. *demander la main* / *donner un coup de main* · ing. *ask for her/his hand* / *lend a hand* |
| Tipo BudGanja | Palavra / locução — pedido × ajuda × compromisso |
| Elo ofício | [mãos](${maos}) · [gesto](${gesto}) · [sugestão](${sugestao}) · [caminho](${caminho}) |
| Elo vivo | [coração](${coracao}) · [alma](${alma}) · [respeito](${respeito}) · [verdade](${verdade}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) · [risco](${risco}) |
| Fonte | [Wikcionário · mão](${wikiMao}) |
| Data | ${inspected} |

**O que é o objeto:** o acto de **pedir envolvendo a mão** — seja a mão que **ajuda**, seja a mão que **une** um compromisso. No lab: pedir com [respeito](${respeito}); receber com [verdade](${verdade}).

## 2. Pedi uma mão × pedi a mão × mãos L/R

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **pedir uma mão / dá uma mão** | Ajuda prática | Uso vivo BR muito frequente |
| **pedir a mão (de alguém)** | Pedido de compromisso (tradição) | Outro registo — ceremonial / afectivo |
| **[mãos L × R](${maos})** | Instrumento do gesto | Esquerda apoia, direita executa — complementaridade |
| **[gesto](${gesto})** | Acto mínimo | Pedir também é gesto |
| **[sugestão](${sugestao})** | Proposta | Pedido ≠ ordem |

**H1:** *pedi a mão* = *pedir* + *mão* — ajuda ou compromisso conforme o artigo (*uma* / *a*) e o contexto.  
**H2:** no ofício, «pedir uma mão» é virtude de [respeito](${respeito}) — ninguém cultiva sozinho.  
**H3:** «pedir a mão» afectivo exige [verdade](${verdade}) e consentimento — não é conquista de objecto.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ajuda** | «Me dá uma mão aqui?» | Alta (BR oral) |
| **Compromisso** | Pedir a mão em casamento (tradição) | Alta (léxico cultural) |
| **Colaboração lab** | Pedir mão no cultivo / na ficha | Alta (mapa BudGanja) |
| **Forma colada** | *pedimao* | Alta (pedido do utilizador) |
| **Armadilha** | Pedir mão e depois não dar a própria | Alta (anti-ofício) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *pedi a mão* |
|-------|--------------------------|
| [Mãos L/R](${maos}) · [gesto](${gesto}) | Corpo do pedido |
| [Sugestão](${sugestao}) | Propor / pedir sem impor |
| [Respeito](${respeito}) · [verdade](${verdade}) | Como se pede e como se responde |
| [Coração](${coracao}) · [alma](${alma}) | Quando o pedido toca o íntimo |
| [Caminho](${caminho}) · [risco](${risco}) | Compromisso = passo com peso |
| Hub [Vida](${vida}) | Onde se pede e se fica |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Me dá uma mão?»** | Ajuda imediata | Ofício colaborativo |
| **«Pedi a mão dela/dele»** | Compromisso | [Verdade](${verdade}) + [respeito](${respeito}) |
| **«Pedi mão e ninguém veio»** | Solidão prática | Inspecionar a rede — e oferecer a própria |
| **Forma *pedimao*** | Digitação / oral colado | Canónica: **pedi a mão** / **pedir uma mão** |
| **Ofício lab** | Pedir revisão, rega, presença | [Valeu !!!](${mantra}) em conjunto |

**Finalidade-mãe:** nomear **pedi a mão** para **pedir com ofício** — ajuda ou compromisso, sempre com mão aberta.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **ao pedir e ao dar a mão**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Pedir mão = fraqueza» = falso · «pedir e oferecer» = ofício |
| Par vivo | [mãos](${maos}) · [gesto](${gesto}) · [respeito](${respeito}) · [alma](${alma}) |

**Veredicto:** Valeu !!! **com a mão pedida e a mão dada**. Pedimao sem [respeito](${respeito}) = agarrar; pedimao com ofício = ponte.

## Hipóteses (síntese)

**H1:** objeto = pedir + mão (ajuda / compromisso).  
**H2:** artigo e contexto decidem o eixo.  
**H3:** elos = [mãos](${maos}) · [gesto](${gesto}) · [respeito](${respeito}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é guia de noivado.  
- Pedir ajuda ≠ dever de ninguém específico sem acordo.  
- Compromisso exige resposta livre.

## Status

**Aprovado** — **pedi a mão** (*pedimao*) fichado: ajuda × compromisso, rede com mãos/gesto e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Mãos](${maos}) · [▶ Gesto](${gesto}) · [▶ Respeito](${respeito}) · [▶ Alma](${alma}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **pedi a mão** (user spelling “pedimao”) — *pedir* + *mão*: (1) ask for **help** (“uma mão”); (2) traditional **proposal** (“a mão” of someone). Links [mãos](${maos}), [gesto](${gesto}), [respeito](${respeito}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · mão](${wikiMao}), [pedir](${wikiPedir}). Not wedding etiquette. Asking with an open hand, not grabbing.

## 1. Object

| Field | Value |
|-------|-------|
| Form | **pedi a mão** / **pedir uma mão** |
| Etymon | *pedir* + *mão* (Lat. *petere* + *manus*) |
| Lab type | Request × help × commitment |
| Links | [mãos](${maos}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **when asking and when giving a hand**, today.

## Status

**Approved** — help · commitment · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Mãos](${maos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **pedi a mão** (pedido «pedimao») — *pedir* + *mão*: (1) pedir **ayuda** («uma mão»); (2) pedido tradicional de **compromiso**. Vínculos [mãos](${maos}), [gesto](${gesto}), [respeito](${respeito}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · mão](${wikiMao}), [pedir](${wikiPedir}). No es etiqueta nupcial. Pedir con la mano abierta.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Forma | **pedi a mão** / **pedir uma mão** |
| Étimo | *pedir* + *mão* |
| Tipo lab | Pedido × ayuda × compromiso |
| Vínculos | [mãos](${maos}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **al pedir y al dar la mano**, hoy.

## Estado

**Aprobada** — ayuda · compromiso · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Mãos](${maos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiMao };
}

function buildPediMaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPediMaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 101;
  return makePalavra({
    title: 'Inspeção: Pedi a mão — ajuda, pedido e gesto aberto',
    titleEn: 'Inspection: Pedi a mão — help, asking and open gesture',
    titleEs: 'Inspección: Pedi a mão — ayuda, pedido y gesto abierto',
    excerpt:
      'Palavras: «pedi a mão» (*pedimao*) — pedir ajuda ou compromisso; elos mãos, gesto, respeito; Valeu !!!',
    excerptEn:
      'Words: “pedi a mão” (*pedimao*) — ask for help or commitment; links hands, gesture, respect; Valeu !!!',
    excerptEs:
      'Palabras: «pedi a mão» (*pedimao*) — pedir ayuda o compromiso; vínculos manos, gesto, respeto; ¡Valeu !!!',
    slug: 'inspecao-palavra-pedi-mao',
    date: '2026-08-03T19:05:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Pedi a mão · palavra',
    coverImage: '/imagens/inspecoes/pedi-mao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPediMaoPost,
  buildPediMaoBodies
};
