'use strict';

/**
 * Inspeção Palavras · escravidão
 * Eixos: escravo + -idão · sclavus · cana / engenho ·
 * obrigado (obligare) noutra sala · cativeiro legalizado × art. 149 ·
 * Valeu !!!
 * Dois eixos, duas frases: cativeiro/lei numa sala; reconhecimento noutra.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/escravidao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/escravid%C3%A3o';
const WIKT_ESCRAVO = 'https://pt.wiktionary.org/wiki/escravo';
const WIKT_SCLAVUS = 'https://en.wiktionary.org/wiki/sclavus';
const WIKI = 'https://pt.wikipedia.org/wiki/Escravid%C3%A3o';
const WIKI_BR = 'https://pt.wikipedia.org/wiki/Escravid%C3%A3o_no_Brasil';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildEscravidaoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-escravidao.html';
  const gratidao = '/posts/post-inspecao-palavra-gratidao.html';
  const obrigado = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const leiAurea = 'https://pt.wikipedia.org/wiki/Lei_%C3%81urea';
  const cp149 = 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm';
  const guia = '/guia/palavras.html';
  const hdEscravo = '/posts/post-inspecao-palavra-hd-escravo.html';

  const body = `## Escopo

Inspeção da palavra **[escravidão](${self})**. Nomeia o **sistema que trata pessoas como propriedade**. No Brasil isso passou pelos engenhos da [cana](${cana}).

Há dois eixos nesta ficha. **Não cabem na mesma frase.**

1. O vocábulo do **cativeiro** (étimo, lei da época, lei de agora).  
2. O vocábulo da **[qualidade de ser grato](${gratidao})** e a fórmula **[obrigado](${obrigado})**.

O rascunho anterior meteu os dois eixos num só sopro. Isso [buguei](${buguei}).

O corte tem nome: [a orelha cola o que a boca juntou](${orelhaCola}). Esta ficha fecha com **dois eixos em frases separadas**.

> Fontes: [Wikcionário · escravidão](${WIKT}), [escravo](${WIKT_ESCRAVO}), lat. [*sclavus*](${WIKT_SCLAVUS}), [Wikipédia](${WIKI}), [escravidão no Brasil](${WIKI_BR}), [Lei Áurea](${leiAurea}), [CP art. 149](${cp149}). **Ficha de palavra ≠ tratado de história.** Sem afiliação política.

## 1. O que a palavra é

| Campo | Valor |
|-------|-------|
| Palavra | **escravidão** |
| Classe | Substantivo feminino |
| Forma | *escravo* + **-idão** |
| Étimo de *escravo* | lat. med. *sclavus* — primeiro «eslavo»; depois «pessoa escravizada» — confiança: **alta** no percurso |
| Não é | lat. *servus* (isso dá **servidão**) |
| Tipo | Palavra — cativeiro × lei da época × lei de agora |
| Elos de sistema | [cana](${cana}) · [maconha](${maconha}) (diáspora) · [legal](${legal}) · [ilegal](${ilegal}) |
| Elos de ofício | [verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) · [buguei](${buguei}) · [orelha cola](${orelhaCola}) |
| Data | ${inspected} |

**Em uma frase:** escravidão é o nome do **cativeiro que a lei permitiu**.

## 2. Três tempos da lei

| Tempo | O que a lei fazia | Palavra certa nesta ficha |
|-------|-------------------|---------------------------|
| Colónia / Império (até 1888) | **Permitia** o cativeiro | **cativeiro legalizado** — não [ilegal](${ilegal}) |
| 13 maio 1888 | [Lei Áurea](${leiAurea}) extingue o instituto | A instituição cai; o vocábulo fica |
| Hoje | [CP art. 149](${cp149}): reduzir alguém a condição análoga à de escravo | Figura penal **de agora** |

Quem cola o cativeiro colonial na figura penal de 2026 **funde tempos**. Quem recusa o [art. 149](${cp149}) **apaga** a lei vigente. Os dois erros são o mesmo: um tempo só.

## 3. Origem, directo

1. Em latim clássico, o cativo era sobretudo *servus* → PT **servo / servidão**.  
2. Na Idade Média europeia, *sclavus* (eslavo) passou a nomear também quem era escravizado.  
3. Daí PT **escravo** → **escravidão**.  
4. Espanhol *esclavo / esclavitud*, francês *esclave / esclavage*, inglês *slave* — mesma via, não o mesmo país.

O Brasil **não inventou** a palavra. Usou-a no **tráfico atlântico** e nos engenhos.

## 4. Cana, engenho, diáspora

A [cana](${cana}) não é o cativeiro. O **engenho com trabalho forçado** é.

A [maconha](${maconha}) viaja na **diáspora africana**. Nomear escravidão é o chão histórico dessa viagem — sem transformar a palavra da planta em insulto, e sem suavizar o cativeiro.

## 5. Sala à parte — [gratidão](${gratidao}) e [obrigado](${obrigado})

Fala de **dois vocábulos de reconhecimento**.

| Palavra | Étimo | O que faz |
|---------|-------|-----------|
| **[obrigado](${obrigado})** | *obligare* «ligar, atar» | Fórmula viva: «fico ligado ao gesto» |
| **[gratidão](${gratidao})** | *grātus* + *-idão* | Nome da qualidade de quem reconhece o bem |

A ficha de [Gratidão!](${obrigado}) já aponta *obligare* e a memória da cana. **Apontar a vizinhança do étimo não troca o objecto.** Quem agradece **reconhece um gesto**. O objecto desta página é outro.

O [respeito](${respeito}) pede duas frases, não uma cola.

## 6. O que não fazer

| Armadilha | Corte |
|-----------|-------|
| Juntar reconhecimento e figura penal num só sopro | Recusado. [A orelha cola o que a boca juntou](${orelhaCola}). |
| «O engenho era [ilegal](${ilegal})» | Falso no eixo da lei da época. Era instituto. |
| «Então o engenho era inofensivo» | Falso. Legalizado ≠ inofensivo. |
| «Obrigado vem desta palavra, então não se diz» | Falso. Vem de *obligare*. |
| Usar «escravo» como piada ou gíria de trabalho | Recusado. |
| Jargão ATA «HD escravo» | Outra sala: [HD escravo](${hdEscravo}) — jumper Device 1, não metáfora. |
| Ficha = história completa do Brasil | Não. Aqui cabe o **vocábulo**. |

## 7. Rede

| Recurso | Papel |
|---------|-------|
| [A orelha cola o que a boca juntou](${orelhaCola}) | O ofício: duas frases |
| [Buguei](${buguei}) | O glitch quando a boca junta |
| [Legal](${legal}) · [ilegal](${ilegal}) · [proibição](${proibicao}) | Prateleira da lei — não fundir tempos |
| [Cana](${cana}) | Engenho |
| [HD escravo](${hdEscravo}) | Jargão ATA — outra sala |
| [Maconha](${maconha}) | Diáspora |
| [Obrigado](${obrigado}) · [gratidão](${gratidao}) | Sala à parte — reconhecimento |
| [Verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) | Nomear sem fundir |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Valeu !!!](${mantra}) | Fecho de ofício |

## Status

**Aprovado** — **escravidão** fichada: *sclavus* + *-idão*; cativeiro legalizado até 1888; [art. 149](${cp149}) à parte, noutro tempo; reconhecimento em secção própria. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ A orelha cola](${orelhaCola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **escravidão** names the **system that treats people as property**. In Brazil that ran through [sugarcane](${cana}) mills.

Two axes. **They do not share a sentence.**

1. The word for **bondage** (etymon, law then, law now).  
2. The words for **thanks** — [gratidão](${gratidao}) and [obrigado](${obrigado}).

A draft glued them in one breath. That [buguei](${buguei}).

The cut has a name: [the ear glues what the mouth joined](${orelhaCola}). This sheet closes with **two axes in separate sentences**.

## Object

| Field | Value |
|-------|-------|
| Word | **escravidão** |
| Form | *escravo* + **-idão** |
| Etymon | Med. Lat. *sclavus* |
| Date | ${inspected} |

**One line:** this word names bondage the law allowed.

Until 1888 it was a **legal institution**. Today [CP art. 149](${cp149}) is a **separate** clause, another time.

Recognition lives in [its own sheet](${gratidao}).

## Status

**Approved** — two rooms, two sentences.

[▶ Words](${hub}) · [▶ The ear glues](${orelhaCola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**escravidão** nombra el **sistema que trata personas como propiedad**. En Brasil pasó por los ingenios de [caña](${cana}).

Dos ejes. **No caben en la misma frase.**

1. El vocablo del **cautiverio**.  
2. Los vocablos del **reconocimiento** — [gratidão](${gratidao}) y [obrigado](${obrigado}).

Un borrador los pegó en un soplo. Eso [buguei](${buguei}).

El corte tiene nombre: [el oído pega lo que la boca juntó](${orelhaCola}). Esta ficha cierra con **dos ejes en frases separadas**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **escravidão** |
| Forma | *escravo* + **-idão** |
| Étimo | Lat. med. *sclavus* |
| Fecha | ${inspected} |

**En una frase:** esta palabra nombra el cautiverio que la ley permitió.

Hasta 1888 era **instituto**. Hoy el [art. 149](${cp149}) es **otra** cláusula, otro tiempo.

El reconocimiento vive en [su ficha](${gratidao}).

## Estado

**Aprobada** — dos salas, dos frases.

[▶ Palabras](${hub}) · [▶ El oído pega](${orelhaCola}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildEscravidaoPost() {
  const { body, contentEn, contentEs, wiki } = buildEscravidaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-escravidao', 207);
  const post = makePalavra({
    title: 'Inspeção: Escravidão — o nome do cativeiro',
    titleEn: 'Inspection: Escravidão — the name of bondage',
    titleEs: 'Inspección: Escravidão — el nombre del cautiverio',
    excerpt:
      'Palavras: escravidão (sclavus + -idão) — cativeiro legalizado, cana, diáspora; reconhecimento em sala à parte; Valeu !!!',
    excerptEn:
      'Words: escravidão (sclavus + -idão) — legalized bondage, cane, diaspora; thanks in another room; Valeu !!!',
    excerptEs:
      'Palabras: escravidão (sclavus + -idão) — cautiverio legalizado, caña, diáspora; reconocimiento en otra sala; ¡Valeu !!!',
    slug: 'inspecao-palavra-escravidao',
    date: '2026-08-22T06:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Escravidão · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = {
  buildEscravidaoPost,
  buildEscravidaoBodies
};
