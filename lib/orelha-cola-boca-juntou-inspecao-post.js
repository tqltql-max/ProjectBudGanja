'use strict';

/**
 * Inspeção Expressões · A orelha cola o que a boca juntou
 * Ofício do laboratório: a boca junta dois objectos num sopro;
 * a orelha cola — mesmo para negar. Corte: duas frases.
 * Distinto de «orelha cola, étimo corta» (som × origem).
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemOrelhaColaPt() {
  return `A boca junta.
A orelha cola.
Mesmo o «não» ainda pega
o que veio no mesmo sopro.

Um objecto. Ponto.
Outro objecto. Ponto.
Duas salas.
Duas frases.

Valeu !!!`;
}

function poemOrelhaColaEn() {
  return `The mouth joins.
The ear glues.
Even the “no” still sticks
what arrived in one breath.

One object. Stop.
Another object. Stop.
Two rooms.
Two sentences.

Valeu !!!`;
}

function poemOrelhaColaEs() {
  return `La boca junta.
El oído pega.
Hasta el «no» todavía pega
lo que llegó en un soplo.

Un objeto. Punto.
Otro objeto. Punto.
Dos salas.
Dos frases.

¡Valeu !!!`;
}

function buildOrelhaColaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const doisOuvidos = '/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const wiktOrelha = 'https://pt.wiktionary.org/wiki/orelha';
  const wiktBoca = 'https://pt.wiktionary.org/wiki/boca';
  const wiktCola = 'https://pt.wiktionary.org/wiki/cola';

  const body = `## Escopo

Inspeção da expressão **«[a orelha cola o que a boca juntou](${self})»**. Não é ditado antigo de pátio. É **ofício do laboratório**: nomeia o que acontece quando dois objectos entram **no mesmo sopro**.

A [boca](${wiktBoca}) junta. A [orelha](${orelha}) [cola](${cola}). O «não» no meio **não descola**.

O corte desta ficha: **dois eixos, duas frases**.

> Fontes de peças: [orelha](${wiktOrelha}), [boca](${wiktBoca}), [cola](${wiktCola}). Série [Expressões](${hub}). **Ficha de ofício ≠ ditado popular catalogado.** Sem afiliação.

## 1. O que a frase é

| Campo | Valor |
|-------|-------|
| Expressão | **a orelha cola o que a boca juntou** |
| Tipo | Ofício do lab — cola de **frase**, não de étimo |
| Peças | [orelha](${orelha}) · [cola](${cola}) · boca |
| Não é | Ditado de avós · [«Deus deu dois ouvidos»](${doisOuvidos}) · «orelha cola, étimo corta» |
| Caso de campo | [Escravidão](${escravidao}) — dois eixos num só sopro → [buguei](${buguei}) |
| Data | ${inspected} |

**Em uma frase:** o ouvido pega o par que a boca entregou junto.

## 2. Duas colas, duas fichas

| Frase do lab | O que cola | O que corta |
|--------------|------------|-------------|
| **A orelha cola o que a boca juntou** | Dois objectos **na mesma frase** | **Duas frases.** Dois pontos. |
| **A orelha cola; o étimo corta** | Som parecido ([link](${link}) / Klink, colchão / cola) | O **étimo**, noutra sala |

Parecem irmãs. **Não são a mesma tesoura.** Esta página é a tesoura da **frase**. A outra é a tesoura da **origem**.

## 3. Por que o «não» ainda cola

A orelha não lê a lógica primeiro. Lê o **par**.

«X não é Y» ainda põe X ao lado de Y. O ouvido leva os dois.

O [respeito](${respeito}) pede [verdade](${verdade}) sem fundir. O [gesto](${gesto}) da escrita é o ponto final.

## 4. O corte, direito

1. Um eixo. Ponto.  
2. Outro eixo. Ponto.  
3. Se precisa negar, nega **depois**, noutra frase — ou nem junta os nomes.

Foi assim que se fechou [escravidão](${escravidao}): cativeiro numa sala. Reconhecimento noutra.

\`\`\`poem
${poemOrelhaColaPt()}
\`\`\`

## 5. Rede

| Recurso | Papel |
|---------|-------|
| [Cola / colar](${cola}) | A peça «cola» |
| [Orelha](${orelha}) | A peça que pega |
| [Deus deu dois ouvidos](${doisOuvidos}) | Proporção ouvir/falar — outro ofício |
| [Link · Klink](${link}) | A outra tesoura: som × étimo |
| [Escravidão](${escravidao}) | Caso: dois eixos, duas frases |
| [Buguei](${buguei}) | O glitch quando a boca junta |
| [Mensagem](${mensagem}) · [relação](${relacao}) · [língua](${lingua}) | Solo |
| [Guia](${guia}) · [hub](${hubAll}) · [Valeu !!!](${mantra}) | Fecho |

## Status

**Aprovado** — ofício fichado: a boca junta; a orelha cola; o corte é duas frases. [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Escravidão](${escravidao}) · [▶ Cola](${cola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **“[the ear glues what the mouth joined](${self})”**. Not an old yard proverb. It is **lab craft**: it names what happens when two objects enter **one breath**.

The mouth joins. The [ear](${orelha}) [glues](${cola}). A “no” in the middle **does not unstick**.

The cut: **two axes, two sentences**.

## Object

| Field | Value |
|-------|-------|
| Saying | **a orelha cola o que a boca juntou** |
| Type | Lab craft — **phrase** glue, not etymon glue |
| Not | Folklore proverb · [two ears / one mouth](${doisOuvidos}) · “ear glues, etymon cuts” |
| Field case | [Escravidão](${escravidao}) |
| Date | ${inspected} |

**One line:** the ear takes the pair the mouth handed over together.

The sister motto (“ear glues; etymon cuts”) is another pair of scissors. This sheet is the scissors of the **sentence**.

\`\`\`poem
${poemOrelhaColaEn()}
\`\`\`

## Status

**Approved** — mouth joins; ear glues; the cut is two sentences.

[▶ Sayings](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[el oído pega lo que la boca juntó](${self})»**. No es dicho viejo de patio. Es **oficio del laboratorio**: nombra lo que pasa cuando dos objetos entran **en un soplo**.

La boca junta. El [oído](${orelha}) [pega](${cola}). Un «no» en el medio **no despega**.

El corte: **dos ejes, dos frases**.

## Objeto

| Campo | Valor |
|-------|-------|
| Dicho | **a orelha cola o que a boca juntou** |
| Tipo | Oficio del lab — cola de **frase**, no de étimo |
| No es | Dicho de abuelos · [dos oídos / una boca](${doisOuvidos}) · «el oído pega, el étimo corta» |
| Caso | [Escravidão](${escravidao}) |
| Fecha | ${inspected} |

**En una frase:** el oído toma el par que la boca entregó junto.

El lema hermano («el oído pega; el étimo corta») es otra tijera. Esta ficha es la tijera de la **frase**.

\`\`\`poem
${poemOrelhaColaEs()}
\`\`\`

## Estado

**Aprobada** — la boca junta; el oído pega; el corte son dos frases.

[▶ Expresiones](${hub}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wiktOrelha };
}

function buildOrelhaColaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildOrelhaColaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 22;
  return expressaoPost({
    title: 'Inspeção: A orelha cola o que a boca juntou',
    titleEn: 'Inspection: The ear glues what the mouth joined',
    titleEs: 'Inspección: El oído pega lo que la boca juntó',
    excerpt:
      'Expressões: a orelha cola o que a boca juntou — ofício do lab; dois eixos, duas frases; Valeu !!!',
    excerptEn:
      'Sayings: the ear glues what the mouth joined — lab craft; two axes, two sentences; Valeu !!!',
    excerptEs:
      'Dichos: el oído pega lo que la boca juntó — oficio del lab; dos ejes, dos frases; ¡Valeu !!!',
    slug: 'inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou',
    date: '2026-08-22T07:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'orelha cola · expressão',
    coverImage: '/imagens/inspecoes/orelha-cola-boca-juntou-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOrelhaColaPost,
  buildOrelhaColaBodies,
  poemOrelhaColaPt,
  poemOrelhaColaEn,
  poemOrelhaColaEs
};
