'use strict';

/**
 * Inspeção Palavras · AOC (sigla)
 * Eixos: Admiral Overseas Corporation · monitor / objeto electrónico ·
 * ≠ AO90 · o C não é o c de objecto · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/aoc-palavra-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/AOC_International';
const WIKT = 'https://en.wiktionary.org/wiki/AOC';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `AOC.
Admiral Overseas Corporation.
Três letras no monitor —
objeto electrónico
em cima da mesa.

Não é AO90.
O 90 é o ano.
O C da marca
não é o c que o acordo largou.

Valeu !!!
sigla de fábrica,
não de ortografia.`;
}

function poemEn() {
  return `AOC.
Admiral Overseas Corporation.
Three letters on the monitor —
an electronic object
on the desk.

It is not AO90.
90 is the year.
The brand’s C
is not the c the agreement dropped.

Valeu !!!
factory acronym,
not spelling.`;
}

function poemEs() {
  return `AOC.
Admiral Overseas Corporation.
Tres letras en el monitor —
objeto electrónico
sobre la mesa.

No es AO90.
El 90 es el año.
La C de la marca
no es la c que el acuerdo soltó.

¡Valeu !!!
sigla de fábrica,
no de ortografía.`;
}

function buildAocBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-aoc.html';
  const ao90 = '/posts/post-inspecao-palavra-ao90.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da sigla **[AOC](${self})** — **A**dmiral **O**verseas **C**orporation: marca de **monitores** e outros [objetos](${objetos}) electrónicos. Pedido de campo: *relação com a sigla AOC monitor objetos electrónicos*, no mesmo sopro que [AO90](${ao90}). Objecto = as **três letras** e o ofício de **ecrã na mesa**. Não é catálogo de SKU. Não é review. Não é o acordo ortográfico.

> **Nota metodológica:** auditoria independente. Fontes: [AOC International](${WIKI}), [AOC (sigla)](${WIKT}). **Ficha ≠ folheto de hertz, ≠ loja, ≠ endosso.** Sem afiliação comercial. Série [Palavras](${hub}). Tom: o monitor é um **objeto** inspecionável; a sigla não herda o [AO90](${ao90}).

**Gatilho:** *AOC* / *monitor AOC* / *AO90* (quando a orelha cola as duas) / *objetos electrónicos*.

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **AOC** (sigla EN de marca) |
| Expansão (monitor) | **Admiral Overseas Corporation** (1967, Taiwan; depois AOC International / grupo TPV) |
| Ofício nesta ficha | Marca de **monitor** — [objeto](${objetos}) electrónico à frente dos olhos |
| Tipo BudGanja | Palavra — **sigla** de fábrica × irmã colada do [AO90](${ao90}) |
| Não é | [AO90](${ao90}) · vinho AOC (França) · pessoa AOC · 90 Hz |
| Elo objeto | [objetos](${objetos}) · [eletrizante](${eletrizante}) · [interruptor](${interruptor}) · [ligar × desligar](${ligar}) |
| Elo corte | [AO90](${ao90}) · [a orelha cola](${orelha}) |
| Fonte | [AOC International](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **nome de fábrica** que a boca do laboratório encontra no **ecrã**. Três letras. Um objeto electrónico. Não um acordo de 1990.

## Hipóteses e método

**H1:** na sala *monitor*, AOC = *Admiral Overseas Corporation* — alta.  
**H2:** AOC é **homógrafa**: outras salas usam as mesmas três letras (vinho francês *Appellation d'origine contrôlée*; iniciais de pessoa; centros de operações). Esta ficha **ancora o ecrã**. As outras não entram no lema.  
**H3:** [a orelha cola](${orelha}) **AOC** em **[AO90](${ao90})** porque as duas começam por **AO**. Corte: AOC = marca; AO90 = acordo; **90 = ano**, não hertz do painel.  
**H4:** o **C** de AOC é a terceira letra de *Corporation*. O **c** que o [AO90](${ao90}) largou em *objecto* → *objeto* é consoante **muda** do étimo latino. Coincidência de letra, **não** de origem.  
**H5:** o monitor AOC **é** um [objeto](${objetos}) electrónico — isso é ofício da mesa, não prova de parentesco com o acordo.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Forma e variantes

| Forma | Ofício |
|-------|--------|
| **AOC** | Sigla âncora — pedido de campo |
| Admiral Overseas Corporation | Expansão da marca de ecrãs |
| AOC International / TPV | Casa corporativa posterior — nota, não o lema |
| *monitor AOC* | Uso de rua: a sigla **no objeto** |
| Outras AOC | Vinho, pessoa, operações — **outras salas** |

**Veredicto de forma:** o laboratório ficheia **AOC** como sigla de **marca de monitor**. Não funde com [AO90](${ao90}).

## O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **AO + terceira peça** | AOC = AO90 com C no lugar do 90 | Duas siglas; dois ofícios |
| **90 no ecrã** | AO90 = modelo 90 Hz da AOC | 90 do acordo = **1990**; Hz = outra grandeza |
| **Objetos electrónicos** | A marca *é* o [AO90](${ao90}) porque o acordo fala de *objeto* | O acordo grafia a palavra; a marca nomeia o **aparelho** |
| **O C** | O c que «voltou» de *objecto* | Letra de *Corporation*, não restauração do étimo |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Expandir: Admiral Overseas Corporation |
| Bom | Cortar AOC × [AO90](${ao90}); cortar marca × vinho × pessoa |
| Bom | Tratar o monitor como [objeto](${objetos}) da mesa, sem virar loja |
| Mau | Folheto de polegadas / hertz / «melhor ecrã» |
| Mau | Dizer que AOC *é* o acordo, ou que o 90 do acordo é a taxa do painel |
| Mau | Afiliação comercial ou review disfarçada de inspeção |

## AOC × AO90 × objetos electrónicos

| Peça | Gesto |
|------|-------|
| **AOC** | Três letras no **monitor** |
| **[AO90](${ao90})** | Acordo de **1990** — grafia, não fábrica |
| **[objetos](${objetos})** | O lema (*obiectum*) e o aparelho na mesa |
| **[eletrizante](${eletrizante})** · [interruptor](${interruptor}) · [ligar × desligar](${ligar}) | Circuito: carga, clique, estado |
| **[DSL](${dsl})** | Outra sigla de três letras — outro cano, outro ofício |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [AO90](${ao90}) | A irmã que a orelha cola — o **90 é o ano** |
| [Objetos](${objetos}) | O monitor é um objeto; *objeto* escreve-se sem *c* no lab BR |
| [Eletrizante](${eletrizante}) · [interruptor](${interruptor}) · [ligar × desligar](${ligar}) | Família eléctrica do ofício |
| [DSL](${dsl}) | Sigla de cano — não confundir três letras com três letras |
| [Língua portuguesa](${lingua}) | O solo do corte AO90 × AOC |
| [A orelha cola](${orelha}) | Método |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não compara modelos, polegadas nem hertz.  
- Não cobre todas as AOC do mundo (vinho, política, aviação).  
- Sem afiliação com AOC / TPV / Admiral.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **AOC** fichada como sigla (*Admiral Overseas Corporation*); monitor = [objeto](${objetos}) electrónico; irmã colada [AO90](${ao90}).

[▶ Palavras](${hub}) · [▶ AO90](${ao90}) · [▶ Objetos](${objetos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the acronym **AOC** — **Admiral Overseas Corporation**, a brand of **monitors** (electronic [objects](${objetos})). Field request: relation with AOC / electronic objects, in the same breath as [AO90](${ao90}). Not the 1990 spelling agreement. The **C** is from *Corporation*, not the silent *c* dropped from *objecto*. **90 Hz** is another quantity.

## Status

**Approved in Words** — acronym expanded; sister [AO90](${ao90}) is another room.

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la sigla **AOC** — **Admiral Overseas Corporation**, marca de **monitores** ([objetos](${objetos}) electrónicos). Pedido: relación con AOC / objetos electrónicos, en el mismo soplo que [AO90](${ao90}). No es el acuerdo de 1990. La **C** es de *Corporation*, no la *c* muda que el acuerdo soltó en *objecto*. **90 Hz** es otra magnitud.

## Estado

**Aprobada en Palabras** — sigla expandida; hermana [AO90](${ao90}) es otra sala.

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAocPost() {
  const { body, contentEn, contentEs } = buildAocBodies();
  const seriesOrder = pickOrder('inspecao-palavra-aoc', 293);
  return makePalavra({
    title: 'Inspeção: AOC — a sigla do monitor, não do acordo',
    titleEn: 'Inspection: AOC — the monitor acronym, not the agreement',
    titleEs: 'Inspección: AOC — la sigla del monitor, no del acuerdo',
    excerpt:
      'Palavras: AOC = Admiral Overseas Corporation; monitor / objeto electrónico; ≠ AO90; Valeu !!!',
    excerptEn:
      'Words: AOC = Admiral Overseas Corporation; monitor / electronic object; ≠ AO90; Valeu !!!',
    excerptEs:
      'Palabras: AOC = Admiral Overseas Corporation; monitor / objeto electrónico; ≠ AO90; ¡Valeu !!!',
    slug: 'inspecao-palavra-aoc',
    date: '2026-08-24T10:41:00.000Z',
    seriesOrder,
    seriesLabel: 'AOC · sigla',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAocPost,
  buildAocBodies,
  poemPt,
  poemEn,
  poemEs
};
