'use strict';

/**
 * Inspeção Expressões · néctar dos deuses
 * Hipérbole / mito · gr. néktar · ≠ suco de gôndola ·
 * gatilho Deusus · palavra irmã néctar · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/nectar-dos-deuses-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/n%C3%A9ctar';
const WIKI_AMB = 'https://pt.wikipedia.org/wiki/Ambrosia';

function pickExprOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Néctar dos deuses.
Não é a caixa da gôndola.
É o copo que a boca empresta
quando o gosto atravessa o dia
e parece demais para um mortal.

Na flor, o néctar é trabalho de abelha.
No mito, é o que os olímpicos bebem.
No português vivo, é hipérbole:
este café, este mel, este gole
que a gente não quer explicar.

Deusus é teclado.
Deuses é o coro.
A ficha não serve Olimpo em copo descartável.

Valeu !!!
pelo gole nomeado
sem fingir que a caixa é o mito.`;
}

function buildNectarDosDeusesBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPal = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-nectar-dos-deuses.html';
  const palavra = '/posts/post-inspecao-palavra-nectar.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const fruto = '/posts/post-inspecao-palavra-fruto.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poema = poemPt();

  const body = `## Escopo

Inspeção editorial da expressão **«[néctar dos deuses](${self})»**. Pedido de campo: *Nectar dos Deusus*. Peça [néctar](${palavra}) + **dos deuses**. No grego, νέκταρ já era a **bebida dos deuses** (par da [ambrosia](${WIKI_AMB}), comida). No português vivo, a locução é **hipérbole de gosto** — café, mel, um gole que «não é deste mundo». A palavra da flor fica na [ficha néctar](${palavra}).

> **Nota metodológica:** auditoria independente. Fontes: [néctar](${WIKT}), [ambrosia](${WIKI_AMB}). **Ficha ≠ teologia, ≠ marca de suco, ≠ receita.** Respeito ao mito como literatura; sem culto. Sem afiliação comercial.

**Gatilho:** *Nectar dos Deusus* / *nectar dos deuses* → **néctar dos deuses**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **néctar dos deuses** |
| Tipo | Locução — mito grego × hipérbole BR |
| Peças | [néctar](${palavra}) + *dos deuses* |
| Par mítico | Ambrosia (comida) × néctar (bebida) |
| Não é | Caixa «néctar» da gôndola · injetar (*Inectar*) · culto |
| Elo | [abelha](${abelha}) · [fruto](${fruto}) · [língua portuguesa](${lingua}) |
| Data | ${inspected} |

**O que é o objecto:** o **elogio em forma de Olimpo**. [A orelha cola](${orelhaCola}) o suco da flor, o suco da prateleira e os deuses. Duas frases: a flor nutre a [abelha](${abelha}). A locução nomeia o **demasiado bom**.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **néctar dos deuses** | Nome de produto | Hipérbole / herança do mito |
| **néctar (gôndola)** | O mesmo copo | [Derivado](${derivados}) adoçado — **não** esta expressão |
| **[néctar](${palavra})** | Esta ficha | A **palavra** — suco da flor |
| **Deusus** | Terceiro deus | Teclado de *deuses* |
| **Inectar** | Variante da expressão | Lapso de **injetar** — outra sala |

**H1:** a locução = mito + gosto.  
**H2:** a caixa na prateleira **empresta** a palavra; não herda o Olimpo.  
**H3:** *Deusus* não é étimo.

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Elogiar um gole sem vender caixa |
| Bom | Separar [néctar](${palavra}) (flor) desta fala |
| Mau | Transformar mito em rótulo |
| Mau | Fundir com injeção porque *Inectar* |

### Poema de ofício

\`\`\`
${poema}
\`\`\`

Fecho: [Valeu !!!](${mantra}) — o mito na boca; a flor na palavra; [respeito](${respeito}) ao gosto sem [verdade](${verdade}) de marketing.

## Status

**Aprovada na série Expressões** — *néctar dos deuses* ≠ suco de gôndola ≠ ficha da flor.

[▶ Expressões](${hub}) · [▶ Néctar](${palavra}) · [▶ Abelha](${abelha}) · [▶ Palavras](${hubPal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the saying **“néctar dos deuses”** (nectar of the gods). Field: *Nectar dos Deusus*. Greek *néktar* was already the gods’ drink (with [ambrosia](${WIKI_AMB})). In living Portuguese it is **taste hyperbole**. The flower-word lives on [néctar](${palavra}).

> Not theology. Not a juice brand.

## Object

| Field | Value |
|-------|-------|
| Saying | **néctar dos deuses** |
| Slip | *Deusus* → deuses |
| Not | carton nectar · inject |
| Date | ${inspected} |

[Valeu !!!](${mantra})

## Status

**Approved in Sayings** — myth/hyperbole ≠ supermarket nectar.
`;

  const contentEs = `## Alcance

Inspección de **«néctar dos deuses»**. Pedido: *Nectar dos Deusus*. El griego *néktar* ya era la bebida de los dioses. En portugués vivo es **hipérbole de gusto**. La palabra de la flor: [néctar](${palavra}).

> No es teología ni marca de jugo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **néctar dos deuses** |
| Lapsus | *Deusus* → deuses |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Expresiones** — mito/hipérbole ≠ néctar de góndola.
`;

  return { body, contentEn, contentEs };
}

function buildNectarDosDeusesPost() {
  const { body, contentEn, contentEs } = buildNectarDosDeusesBodies();
  const seriesOrder = pickExprOrder('inspecao-expressao-nectar-dos-deuses', 48);
  return expressaoPost({
    title: 'Inspeção: néctar dos deuses — o mito, a hipérbole, e o gatilho Deusus',
    titleEn: 'Inspection: nectar of the gods — the myth, the hyperbole, and the slip Deusus',
    titleEs: 'Inspección: néctar de los dioses — el mito, la hipérbole, y el lapsus Deusus',
    excerpt:
      'Expressões: néctar dos deuses — mito grego × hipérbole de gosto; ≠ suco de gôndola; peça néctar à parte; Valeu !!!',
    excerptEn:
      'Sayings: nectar of the gods — Greek myth × taste hyperbole; ≠ juice carton; word néctar on its own sheet; Valeu !!!',
    excerptEs:
      'Dichos: néctar de los dioses — mito griego × hipérbole; ≠ néctar de caja; palabra néctar aparte; ¡Valeu !!!',
    slug: 'inspecao-expressao-nectar-dos-deuses',
    date: '2026-08-22T18:42:00.000Z',
    seriesOrder,
    seriesLabel: 'néctar dos deuses · expressão',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNectarDosDeusesPost,
  buildNectarDosDeusesBodies
};
