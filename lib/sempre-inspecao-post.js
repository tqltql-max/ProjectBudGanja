'use strict';

/**
 * Inspeção Palavras · sempre
 * Eixos: objeto (lat. semper) · duração · «sempre» × «já» ·
 * prosseguir · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSempreBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const prosseguir = '/posts/post-inspecao-palavra-prosseguir.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/sempre';
  const wikiLat = 'https://en.wiktionary.org/wiki/semper';

  const body = `## Escopo

Inspeção editorial da palavra **sempre** — advérbio do português do Brasil que marca **duração sem falha aparente** («em todo o tempo») e, no uso vivo, também **hábito**, **promessa** e **exagero afectivo**. Esta ficha cobre o **objeto** (latim *semper*), o contraste com [já](${ja}), o elo com [prosseguir](${prosseguir}) e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sempre](${wiki}), [semper (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ juramento eterno nem estatística.** Tom: Inspetor BudGanja — *sempre* como palavra **quente**, inspecionada com [verdade](${verdade}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sempre** |
| Classe | Advérbio |
| Étimo (trabalho) | Latim *semper* («sempre, em todo o tempo») → PT *sempre* — confiança: **alta** |
| Família | *para sempre* · *quase sempre* · *nem sempre* · *desde sempre* · *sempiterno* (erudito) |
| Cognatos | esp. *siempre* · it. *sempre* · fr. *toujours* (paralelo) · ing. *always* · lat. *semper* |
| Tipo BudGanja | Palavra — duração × hábito × promessa inspecionável |
| Elo tempo | [já](${ja}) · [passar](${passar}) · [prosseguir](${prosseguir}) |
| Elo ofício | [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) · [esperança](${esperanca}) |
| Elo corte | [pular](${pular}) · [interruptor](${interruptor}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · sempre](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o advérbio que nomeia a **permanência** («está sempre aí»), o **hábito** («sempre faço assim») e, às vezes, a **hipérbole afectiva** («eu sempre te amei»). No laboratório: palavra forte — pede [verdade](${verdade}) para não virar dogma oco.

## 2. Sempre × já × prosseguir

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **sempre** | Em todo o tempo / de hábito | Duração e repetição |
| **[já](${ja})** | Agora / conclusão | Instantâneo — aperta o momento |
| **[prosseguir](${prosseguir})** | Continuar adiante | Movimento; *sempre* pode sustentar o prosseguir — ou congelá-lo em slogan |
| **nem sempre** | Negação parcial | Fresta de [verdade](${verdade}) — evita absoluto falso |
| **para sempre** | Promessa / horizonte | Elo [esperança](${esperanca}) — inspecionar se há [gesto](${gesto}) |

**H1:** objeto = *semper* → *sempre* (romance; alta confiança).  
**H2:** no BR, *sempre* oscila entre **facto habitual** e **exagero afectivo** — a ficha deve distinguir.  
**H3:** *sempre* sem [gesto](${gesto}) vira cartão; com [caminho](${caminho}), vira combustível para [prosseguir](${prosseguir}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Duração total** | Em todo o tempo | Alta |
| **Hábito** | De costume / repetido | Alta (uso vivo) |
| **Promessa** | «Para sempre» | Alta–média |
| **Hipérbole** | «Sempre» = «muito / demais» | Alta (armadilha afectiva) |
| **Risco de dogma** | «Sempre foi assim» fecha inspeção | Alta |
| **Ofício lab** | Manter o [diário](${diario}), o cultivo, a ficha — constância com método | Média–alta |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *sempre* |
|-------|----------------------|
| [Já](${ja}) | Agora × duração — tensam juntos |
| [Prosseguir](${prosseguir}) | Continuar; *sempre* pode ser o chão da continuidade |
| [Passar](${passar}) · [caminho](${caminho}) | Tempo que atravessa × via onde se fica |
| [Pular](${pular}) · [interruptor](${interruptor}) | Quebrar o «sempre» — omitir ou cortar |
| [Esperança](${esperanca}) | «Para sempre» olha o horizonte; esperança abre fresta |
| [Verdade](${verdade}) · [gesto](${gesto}) | Prova do sempre — ou desmonte da hipérbole |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Hábito** | «Sempre acordo cedo» | Inspecionar se é facto ou pose |
| **Presença** | «Está sempre comigo» | Quente — com [verdade](${verdade}) |
| **Promessa** | «Para sempre» | Elo [esperança](${esperanca}) + [gesto](${gesto}) |
| **Dogma** | «Sempre foi assim» | Armadilha — abrir [caminho](${caminho}) |
| **Negação útil** | «Nem sempre» | Fresta honesta |
| **Ofício** | Constância no projecto | [Prosseguir](${prosseguir}) + [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** nomear o **sempre** para **durar com ofício** — constância viva, não absoluto que mente.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**; o *sempre* constrói-se de [já](${ja}) em [já](${ja}) |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sempre» sem inspeção = dogma · «nem sempre» + [gesto](${gesto}) = maturidade |
| Par tempo | [já](${ja}) · [prosseguir](${prosseguir}) · [passar](${passar}) |
| Par afectivo | [esperança](${esperanca}) · [verdade](${verdade}) |

**Veredicto:** Faça o melhor **sempre que puder** — e inspecione o *sempre*. Absoluto sem [gesto](${gesto}) = cartão; constância com método = chão para [prosseguir](${prosseguir}).

## Hipóteses (síntese)

**H1:** objeto = *semper* → *sempre* (alta confiança).  
**H2:** hábito ≠ hipérbole ≠ dogma — três usos, uma palavra.  
**H3:** elos = [já](${ja}) · [prosseguir](${prosseguir}) · [caminho](${caminho}) · [verdade](${verdade}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com constância viva.

## Limites

- Não é juramento jurídico nem garantia eterna.  
- «Sempre» afectivo pode ser amor — ou pressão. Inspecionar o tom.  
- Constância ≠ nunca [pular](${pular}) / nunca [interromper](${interruptor}).

## Status

**Aprovado** — **sempre** fichado: objeto (*semper*), hábito × promessa × dogma, rede tempo e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Já](${ja}) · [▶ Prosseguir](${prosseguir}) · [▶ Caminho](${caminho}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sempre** (always) — duration, habit, promise, and affective hyperbole in Brazilian Portuguese. Covers **object** (Lat. *semper*), contrast with [já](${ja}), link to [prosseguir](${prosseguir}), and [Do your best!](${mantra}).

> Method note: [Wiktionary · sempre](${wiki}), [semper](${wikiLat}). Not an eternal vow. Warm lab tone.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **sempre** |
| Etymon | Lat. *semper* → PT *sempre* — high confidence |
| Lab type | Duration × habit × inspectable promise |
| Links | [já](${ja}) · [prosseguir](${prosseguir}) · [caminho](${caminho}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. always × already × proceed

**sempre** = throughout time / habit. **já** = now. **prosseguir** = keep going. “nem sempre” opens truth; “para sempre” needs gesture.

## 3. Do your best!

Best possible **today** — *sempre* is built from many *já*. Absolute without [gesto](${gesto}) = postcard; constancy with method = ground to [prosseguir](${prosseguir}).

## Status

**Approved** — object · habit×promise×dogma · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Já](${ja}) · [▶ Prosseguir](${prosseguir}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sempre** (siempre) — duración, hábito, promesa e hipérbole afectiva en el portugués de Brasil. Cubre **objeto** (lat. *semper*), contraste con [já](${ja}), vínculo con [prosseguir](${prosseguir}) y [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · sempre](${wiki}), [semper](${wikiLat}). No es juramento eterno.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sempre** |
| Étimo | Lat. *semper* → PT *sempre* |
| Tipo lab | Duración × hábito × promesa inspeccionable |
| Vínculos | [já](${ja}) · [prosseguir](${prosseguir}) · [caminho](${caminho}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. siempre × ya × proseguir

**sempre** = en todo tiempo / hábito. **já** = ahora. **prosseguir** = seguir adelante.

## 3. ¡Haz lo mejor!

Lo mejor posible **hoy** — el *sempre* se construye de muchos *já*. Absoluto sin [gesto](${gesto}) = postal; constancia con método = suelo para [prosseguir](${prosseguir}).

## Estado

**Aprobada** — objeto · hábito×promesa×dogma · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Já](${ja}) · [▶ Prosseguir](${prosseguir}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSemprePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildSempreBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 87;
  return makePalavra({
    title: 'Inspeção: Sempre — duração, hábito e Faça o melhor!',
    titleEn: 'Inspection: Sempre — duration, habit and Do your best!',
    titleEs: 'Inspección: Sempre — duración, hábito y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «sempre» (lat. *semper*) — duração × hábito × promessa BR; elos já, prosseguir, caminho; Faça o melhor!',
    excerptEn:
      'Words: “sempre” (Lat. *semper*) — duration × habit × promise in BR; links já, prosseguir, caminho; Do your best!',
    excerptEs:
      'Palabras: «sempre» (lat. *semper*) — duración × hábito × promesa BR; vínculos já, prosseguir, caminho; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-sempre',
    date: '2026-08-03T15:25:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Sempre · palavra',
    coverImage: '/imagens/inspecoes/sempre-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSemprePost,
  buildSempreBodies
};
