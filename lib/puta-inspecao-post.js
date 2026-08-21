'use strict';

/**
 * Inspeção Palavras · puta
 * Eixos: lat. vulg. putta «menina» · pejorativo · intensificador BR ·
 * elo pariu / puta que pariu · respeito · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPutaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const pariu = '/posts/post-inspecao-palavra-pariu.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wiktionary.org/wiki/puta';

  const body = `## Escopo

Inspeção editorial da palavra **puta** — tabu vivo do português: pejorativo histórico para mulher / prostituta; no Brasil contemporâneo, também **intensificador** («uma puta festa»). Esta ficha cobre o **étimo**, o deslizamento semântico, o uso BR e o cruzamento com [pariu](${pariu}) e a expressão [puta que pariu](${pqp}). Tom: Inspetor BudGanja — **inspecionar a língua sem celebrar o insulto**.

> **Nota metodológica:** auditoria independente. Fontes: Houaiss / Cunha (étimo *putta*), [Wiktionary · puta](${wiki}), estudos de memória lexical (ex. *Puta: uma memória da língua*). **Ficha ≠ licença para ofender.** Trabalho com [respeito](${respeito}) e [verdade](${verdade}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **puta** |
| Classe | Substantivo · adj./intensificador (BR) · interjeição em compostos |
| Étimo (trabalho) | latim vulgar *putta* / *puttus* («menina» / «rapazinho») — confiança: **alta** na hipótese dominante |
| Hipótese rival | lat. *putidus* («fedorento») — menos consensual (Corominas admite as duas) |
| Família | *puto* · *putaria* · *puteiro* · romances (*pute*, *putta*…) |
| Tipo BudGanja | Palavra — tabu × intensificador × ofício |
| Elo composto | [puta que pariu](${pqp}) · [pariu](${pariu}) |
| Elo ofício | [respeito](${respeito}) · [gesto](${gesto}) · [risco](${risco}) · [emoção](${emocao}) |
| Fonte | [Wiktionary · puta](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** um **vocábulo de pressão** — carrega história de estigma sobre o feminino e, no BR, também vira medida de intensidade («puta» = enorme / excelente).

## 2. Do «menina» ao pejorativo ao intensificador

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo *putta*** | Menina / criança (lat. vulg.) | Alta (consenso amplo) |
| **Pejorativo histórico** | Meretriz / insulto a mulher | Alta (uso documentado) |
| **Intensificador BR** | «Puta festa», «puta amigo» — hiperbolizante | Alta (Houaiss) |
| **Insulto dirigido** | Arma contra pessoa | Alta — [risco](${risco}) ético |
| **Composto PQP** | Ver [puta que pariu](${pqp}) | Alta (oralidade BR) |

**H1:** a palavra nasceu sem o insulto moderno — o pejorativo é **deslizamento**.  
**H2:** no BR, coexistir intensificador e insulto exige [gesto](${gesto}) e contexto.  
**H3:** fichar ≠ normalizar violência verbal.

## 3. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Insulto** | Atacar mulher / alguém | Fora do ofício — [respeito](${respeito}) |
| **Intensificador** | «Puta trabalho» = grande | Nomear intensidade sem alvo humano |
| **Interjeição (PQP)** | Explosão emocional | Ver [expressão](${pqp}) |
| **PT *puto*** | Rapaz (PT) / outros sentidos | Não confundir registos |

**Finalidade-mãe:** ver a **história da palavra** para não confundir intensificador com licença de humilhar.

## 4. Rede

| Ficha | Relação |
|-------|---------|
| [Pariu](${pariu}) | Peça do composto · lat. *pariō* |
| [Puta que pariu](${pqp}) | Expressão-mãe deste eixo |
| [Respeito](${respeito}) · [gesto](${gesto}) | Como se fala sem destruir |
| [Raiva](${raiva}) · [emoção](${emocao}) | O peito que explode |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) | Solo e método |
| [Faça o melhor!](${mantra}) | Depois do palavrão — o ofício |

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **também na boca**, hoje |
| Anti-armadilha | «É só gíria» ≠ apaga o estigma · «inspecionar» ≠ repetir o golpe |
| Par vivo | [respeito](${respeito}) · [pqp](${pqp}) · [pariu](${pariu}) |

**Veredicto:** Faça o melhor **ao nomear o tabu**. A palavra pode medir tamanho; não deve medir o valor de uma pessoa.

## Limites

- Não é dicionário erótico.  
- Não ensina a insultar.  
- Intensificador ≠ apagar a história pejorativa.

## Status

**Aprovado** — **puta** fichada: *putta* → pejorativo → intensificador BR; rede com [pariu](${pariu}) e [puta que pariu](${pqp}).

[▶ Palavras](${hub}) · [▶ Pariu](${pariu}) · [▶ Puta que pariu](${pqp}) · [▶ Respeito](${respeito}) · [▶ Faça o melhor!](${mantra}) · [▶ Todas](${hubAll})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **puta** — from Vulgar Latin *putta* (“girl”) to pejorative and Brazilian intensifier (“a puta festa”). Links [pariu](${pariu}), [puta que pariu](${pqp}), [respeito](${respeito}), [Do your best!](${mantra}).

> Method note: inspect language; **do not** celebrate the insult. [Wiktionary](${wiki}).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **puta** |
| Etymon (working) | VL *putta* / *puttus* |
| BR use | Insult · intensifier · compound PQP |
| Date | ${inspected} |

## 2. Do your best!

Best possible **also in speech**, today.

## Status

**Approved** — taboo mapped · intensifier noted · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **puta** — del latín vulgar *putta* («niña») al peyorativo y al intensificador BR. Vínculos [pariu](${pariu}), [puta que pariu](${pqp}), [respeito](${respeito}), [¡Haz lo mejor!](${mantra}).

> Nota: inspeccionar la lengua; **no** celebrar el insulto. [Wiktionary](${wiki}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **puta** |
| Étimo | lat. vulg. *putta* |
| Uso BR | Insulto · intensificador · compuesto PQP |
| Fecha | ${inspected} |

## 2. ¡Haz lo mejor!

Lo mejor posible **también en la boca**, hoy.

## Estado

**Aprobado** — tabú mapeado · intensificador · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPutaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPutaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 104;
  return makePalavra({
    title: 'Inspeção: Puta — de menina a tabu a intensificador',
    titleEn: 'Inspection: Puta — from girl to taboo to intensifier',
    titleEs: 'Inspección: Puta — de niña a tabú a intensificador',
    excerpt:
      'Palavras: «puta» — lat. vulg. putta; pejorativo e intensificador BR; elos pariu, PQP, respeito; Faça o melhor!',
    excerptEn:
      'Words: “puta” — VL putta; pejorative and BR intensifier; links pariu, PQP, respeito; Do your best!',
    excerptEs:
      'Palabras: «puta» — lat. vulg. putta; peyorativo e intensificador BR; vínculos pariu, PQP, respeito; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-puta',
    date: '2026-08-03T21:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Puta · palavra',
    coverImage: '/imagens/inspecoes/puta-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildPutaPost, buildPutaBodies };
