'use strict';

/**
 * Inspeção Palavras · pariu (parir / lat. pariō)
 * Eixos: lat. pariō «dar à luz» · parto · figurado ·
 * elo puta / puta que pariu · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPariuBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const puta = '/posts/post-inspecao-palavra-puta.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wiktionary.org/wiki/parir';
  const wikiLa = 'https://en.wiktionary.org/wiki/pario#Latin';

  const body = `## Escopo

Inspeção editorial de **pariu** — pretérito de *parir* («dar à luz»). Por baixo: latim **pariō** («eu dou à luz / faço nascer») — a forma que o pedido «Pario» apontava. Sozinho é verbo de nascimento; no composto [puta que pariu](${pqp}) vira peça de explosão oral. Esta ficha separa o **parto** do **palavrão**.

> **Nota metodológica:** fontes [parir](${wiki}), [pariō (latim)](${wikiLa}). **Ficha ≠ obstetrícia.** Cruzamento com [puta](${puta}) e [PQP](${pqp}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma fichada | **pariu** (3.ª p. pret. ind. de *parir*) |
| Lema | **parir** |
| Latim | **pariō, parere** — «dar à luz; produzir» ([pariō](${wikiLa})) |
| Tipo BudGanja | Palavra — nascimento × figurado × peça de PQP |
| Elo | [puta](${puta}) · [puta que pariu](${pqp}) · [vida](${vida}) |
| Fonte | [Wiktionary · parir](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o **gesto verbal do nascimento** — literal (parto) ou figurado (parir uma ideia). No PQP, o verbo perde o berço e vira **sopro**.

## 2. Pariō → parir → pariu

| Forma | Ofício | Nota |
|-------|--------|------|
| **pariō** (LA) | «Eu paro / faço nascer» | Pedido «Pario» = esta raiz |
| **parir** | Dar à luz (esp. animais; também humano em registo) | Verbo |
| **pariu** | «Deu à luz» (pretérito) | Peça da expressão |
| **parir ideia** | Figurado — engendrar | Ofício criativo |
| **no PQP** | Não descreve parto real | Ver [expressão](${pqp}) |

**H1:** *pariu* = nascimento dito no passado.  
**H2:** no palavrão, o sentido literal **cede** ao afecto.  
**H3:** separar lema e explosão é ofício de [verdade](${verdade}).

## 3. Sentidos — camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Parto** | Expulsar / dar à luz | Alta |
| **Figurado** | Produzir, engendrar | Alta |
| **Peça de PQP** | Motor da interjeição | Alta (uso BR) |
| **Ofício lab** | Nomear origem sem confundir com insulto | Alta (mapa BudGanja) |

## 4. Rede

| Ficha | Relação |
|-------|---------|
| [Puta](${puta}) | Outra peça do composto |
| [Puta que pariu](${pqp}) | Onde *pariu* explode |
| [Vida](${vida}) · [caminho](${caminho}) | Nascer / seguir |
| [Gesto](${gesto}) · [língua portuguesa](${lingua}) | Como a boca faz |
| [Faça o melhor!](${mantra}) | Depois do sopro |

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **ao nascer de novo no ofício**, hoje |
| Anti-armadilha | Confundir *pariu* só com palavrão = apagar o parto / o *pariō* |
| Par vivo | [puta](${puta}) · [pqp](${pqp}) · [vida](${vida}) |

**Veredicto:** Faça o melhor **também ao lembrar o berço da palavra**. *Pariō* é nascimento; PQP é pressão — os dois cabem no lab se nomeados com clareza.

## Limites

- Não é manual de parto.  
- Não reduz *parir* ao palavrão.  
- Grafia «pario» no pedido = latim *pariō* / oral *pariu*.

## Status

**Aprovado** — **pariu** fichado: *pariō* → *parir* → peça de [puta que pariu](${pqp}).

[▶ Palavras](${hub}) · [▶ Puta](${puta}) · [▶ Puta que pariu](${pqp}) · [▶ Vida](${vida}) · [▶ Faça o melhor!](${mantra}) · [▶ Todas](${hubAll})
`;

  const contentEn = `## Scope

Editorial inspection of **pariu** (from *parir*, “to give birth”) and Latin **pariō**. Literal birth vs. piece of [puta que pariu](${pqp}). Links [puta](${puta}), [vida](${vida}), [Do your best!](${mantra}).

> Method note: [parir](${wiki}) · [pariō](${wikiLa}). Not obstetrics.

## 1. Object

| Field | Value |
|-------|-------|
| Form | **pariu** |
| Latin | **pariō** |
| Links | [puta](${puta}) · [PQP](${pqp}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Do your best!

Best possible **when naming the cradle of the word**, today.

## Status

**Approved** — birth verb · PQP piece · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **pariu** (*parir*) y latín **pariō**. Parto literal vs. pieza de [puta que pariu](${pqp}). Vínculos [puta](${puta}), [vida](${vida}), [¡Haz lo mejor!](${mantra}).

> Nota: [parir](${wiki}) · [pariō](${wikiLa}). No es obstetricia.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Forma | **pariu** |
| Latín | **pariō** |
| Vínculos | [puta](${puta}) · [PQP](${pqp}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Haz lo mejor!

Lo mejor posible **al nombrar la cuna de la palabra**, hoy.

## Estado

**Aprobado** — verbo de nacimiento · pieza PQP · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPariuPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPariuBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 105;
  return makePalavra({
    title: 'Inspeção: Pariu — do latim pariō ao sopro do palavrão',
    titleEn: 'Inspection: Pariu — from Latin pariō to the swear breath',
    titleEs: 'Inspección: Pariu — del latín pariō al soplo del taco',
    excerpt:
      'Palavras: «pariu» — lat. pariō / parir; parto e peça de puta que pariu; elos puta, vida; Faça o melhor!',
    excerptEn:
      'Words: “pariu” — Lat. pariō / parir; birth and piece of puta que pariu; links puta, vida; Do your best!',
    excerptEs:
      'Palabras: «pariu» — lat. pariō / parir; parto y pieza de puta que pariu; vínculos puta, vida; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-pariu',
    date: '2026-08-03T21:35:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Pariu · palavra',
    coverImage: '/imagens/inspecoes/pariu-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildPariuPost, buildPariuBodies };
