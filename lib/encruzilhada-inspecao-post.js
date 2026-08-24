'use strict';

/**
 * Inspeção Palavras · encruzilhada
 * en- + cruz + -ilhada — o sítio da cruz, onde as estradas se encontram.
 * Distinta da estrada (leito) e do cruzamento com Jesus Cristo (ficha irmã).
 * Pedido de campo: «encruziliada».
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/encruzilhada-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/encruzilhada';
const WIKT_CRUZ = 'https://pt.wiktionary.org/wiki/cruz';
const WIKT_CRUX = 'https://en.wiktionary.org/wiki/crux#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Encruzilhada';

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

function poemPt() {
  return `Encruzilhada.
En + cruz + ilhada.
O sítio da cruz.

Duas estradas
deixam de ser uma.
O X pede escolha.

Não é o leito.
É o encontro dos leitos.
O automóvel chega.
A bateria ainda pulsa.
O rumo não vem de fábrica.

A cruz de madeira
não é esta palavra.
O cruzamento lê as duas
sem fundir o asfalto com o madeiro.

Valeu !!!
parar no X
antes de meter marcha.`;
}

function poemEn() {
  return `Encruzilhada.
En + cruz + ilhada.
The place of the cross.

Two roads
stop being one.
The X asks for a choice.

It is not the bed.
It is where beds meet.
The car arrives.
The battery still pulses.
The heading does not come from the factory.

The wooden cross
is not this word.
The crossing reads both
without fusing asphalt and timber.

Valeu !!!
stop at the X
before putting it in gear.`;
}

function poemEs() {
  return `Encruzilhada.
En + cruz + ilhada.
El sitio de la cruz.

Dos estradas
dejan de ser una.
La X pide elección.

No es el lecho.
Es el encuentro de los lechos.
El automóvil llega.
La batería aún pulsa.
El rumbo no viene de fábrica.

La cruz de madera
no es esta palabra.
El cruce lee las dos
sin fusionar asfalto y madero.

¡Valeu !!!
parar en la X
antes de meter marcha.`;
}

function buildEncruzilhadaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-encruzilhada.html';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const automovel = '/posts/post-inspecao-palavra-automovel.html';
  const bateria = '/posts/post-inspecao-palavra-bateria.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mapa = '/posts/post-inspecao-palavra-mapa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const cruzarBracos = '/posts/post-inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const parabola = '/posts/post-inspecao-palavra-parabola.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[encruzilhada](${self})** — *en-* + *cruz* + *-ilhada*: o **sítio da cruz**, onde duas ou mais [estradas](${estrada}) se encontram. Pedido de campo: *encruziliada* → forma canónica **encruzilhada**. Esta ficha é o **X do leito**; o [caminho](${caminho}) continua método; a [estrada](${estrada}) é cada braço; o cruzamento com **Jesus Cristo** (madeiro, «Eu sou o [caminho](${caminho})») vive na [ficha-cruzamento](${cruzamento}) — **sem** fundir asfalto com teologia.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · encruzilhada](${WIKT}), [cruz](${WIKT_CRUZ}), lat. [*crux*](${WIKT_CRUX}), [Wikipédia](${WIKI}). **Ficha ≠ catecismo, ≠ tratado de religião afro-brasileira, ≠ código de trânsito.** No Brasil, *encruzilhada* também nomeia um lugar de culto (Exu / Pomba Gira): esta ficha **nomeia** essa camada e **corta** a fusão com Jesus Cristo — o [cruzamento](${cruzamento}) declara o mesmo corte. Sem proselitismo. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **encruzilhada** (plural *encruzilhadas*) |
| Gatilho de campo | *encruziliada* — orelha / teclado; lema com **lh** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | *en-* + *cruz* (lat. *crux*) + *-ilhada* (lugar) — «lugar da cruz / das vias cruzadas» — confiança: **alta** |
| Família | *cruz* · *cruzar* · *cruzamento* · *encruzilhar* |
| Cognatos / mapa | esp. *encrucijada* · fr. *carrefour* (outra árvore: *quadrifurcus*) · ing. *crossroads* (calco transparente) |
| Tipo BudGanja | Palavra — X da [estrada](${estrada}) × escolha × [gesto](${gesto}) |
| Não é | a [estrada](${estrada}) (um braço) · o madeiro de Jesus (ficha-[cruzamento](${cruzamento})) · [cruzar os braços](${cruzarBracos}) (outro ofício do corpo) |
| Elo viagem | [automóvel](${automovel}) · [bateria](${bateria}) — chegam ao X |
| Elo ofício | [caminho](${caminho}) · [mapa](${mapa}) · [risco](${risco}) · [verdade](${verdade}) · [relação](${relacao}) |
| Fonte | [encruzilhada](${WIKT}) · [cruz](${WIKT_CRUZ}) |
| Data | ${inspected} |

**O que é o objecto:** o **ponto** onde os leitos se cruzam e a viagem **deixa de ser uma**. No lab: a [estrada](${estrada}) leva; a encruzilhada **pede escolha**. O [automóvel](${automovel}) pode chegar com [bateria](${bateria}) cheia e ainda assim errar o rumo.

## 2. Encruzilhada × estrada × cruz × cruzamento

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[estrada](${estrada})** | O leito (*strata*) | Um braço do X |
| **encruzilhada** | O sítio da *cruz* das vias | O X |
| **cruz** (madeiro / glifo) | Lat. *crux* — o mesmo avô | Objecto / sinal; não é automaticamente Jesus |
| **cruzamento** (trânsito) | Encontro de vias / semáforo | Quase sinónimo civil; no lab também nomeia a [ficha irmã](${cruzamento}) |
| **[caminho](${caminho})** | Método | Pode atravessar o X sem ser o X |
| **carrefour** | Fr. quatro furcas | Outra árvore; mesmo ofício de lugar |

**H1:** *encruzilhada* = lugar da *cruz* das vias (alta).  
**H2:** o madeiro de Gólgota e o X do asfalto **partilham o avô** *crux* — o laboratório **relaciona** e **não funde**.  
**H3:** «estar numa encruzilhada» = decisão; o [automóvel](${automovel}) parado no X ainda precisa de [gesto](${gesto}).  
**H4:** a camada afro-brasileira da encruzilhada é **cultura viva**; não é esta ficha quem a ensina, nem quem a cola em Jesus.

\`\`\`poem
${poemPt()}
\`\`\`

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Geografia / via** | Cruzamento de [estradas](${estrada}) | Alta |
| **Decisão** | «Estar numa encruzilhada» | Alta (figurado) |
| **Glifo** | O X / a cruz no [mapa](${mapa}) | Alta |
| **Afro-brasileira** | Lugar de entidade / oferenda | Alta como **facto cultural**; **fora** do eixo Jesus desta série |
| **Ofício lab** | O ponto em que o [caminho](${caminho}) pede escolha antes de [meter marcha](/posts/post-inspecao-expressao-meter-marcha.html) | Alta |

## 4. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [estrada](${estrada}) · [automóvel](${automovel}) · [bateria](${bateria}) | Leito, máquina, pulso que chegam ao X |
| [Cruzamento · Jesus Cristo](${cruzamento}) | O pedido de cruzar — madeiro ≠ asfalto |
| [caminho](${caminho}) · [mapa](${mapa}) · [parábola](${parabola}) | Método, pano, história que compara |
| [filho de deus](${filho}) | Expressão — título × oralidade; **não** esta palavra |
| [cruzar os braços](${cruzarBracos}) | Outro *cruzar* — corpo, não via |
| [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) · [língua portuguesa](${lingua}) | Escolha, custo, nomear, solo |
| [Vida](${vida}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) | Fecho |

## 5. O que esta ficha não é

- **Não** é aula de geometria de intersecções nem de sinalização.  
- **Não** é catecismo nem homilia: Jesus Cristo está no [cruzamento](${cruzamento}).  
- **Não** é tratado de Candomblé / Umbanda — a camada é nomeada e **não** fundida.  
- **Não** funde *encruzilhada* com [estrada](${estrada}) (o X não é o braço).  
- Grafia *encruziliada* fica como gatilho, não como lema.

## 6. Veredicto

**Aprovado** — **encruzilhada** fichada como *en-* + *cruz* + *-ilhada* (sítio da cruz das vias); distinta da [estrada](${estrada}); o madeiro e o asfalto partilham *crux* **sem** fusão; Jesus Cristo na [ficha-cruzamento](${cruzamento}). [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

[▶ Palavras](${hub}) · [▶ Estrada](${estrada}) · [▶ Automóvel](${automovel}) · [▶ Bateria](${bateria}) · [▶ Cruzamento](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[encruzilhada](${self})** — *en-* + *cruz* + *-ilhada*: the **place of the cross**, where two or more [estradas](${estrada}) meet. Field spelling *encruziliada* → canonical **encruzilhada**. This sheet is the **X of the bed**; Jesus Christ lives on the [cross sheet](${cruzamento}) — asphalt is **not** fused with the timber.

> Independent audit. [encruzilhada](${WIKT}), Lat. [*crux*](${WIKT_CRUX}). **Not a catechism, not an Afro-Brazilian treatise.** The Brazilian religious crossroads layer is **named** and **cut** from the Jesus axis. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **encruzilhada** — crossroads |
| Etymon | *en-* + *cruz* (Lat. *crux*) + place suffix — high |
| Not | the [road](${estrada}) (one arm) · the timber (see [cross](${cruzamento})) |
| Date | ${inspected} |

**H1:** the X is where beds meet; the road is one arm.  
**H2:** Golgotha’s timber and the asphalt X share grandfather *crux* — relate, do not fuse.  
**H3:** a full [battery](${bateria}) still does not choose the heading.

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** — encruzilhada as the place of the crossed ways; Jesus Christ on the [cross sheet](${cruzamento}). [Valeu !!!](${mantra})

[▶ Estrada](${estrada}) · [▶ Cross](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[encruzilhada](${self})** — *en-* + *cruz* + *-ilhada*: el **sitio de la cruz**, donde dos o más [estradas](${estrada}) se encuentran. Grafía *encruziliada* → canónica **encruzilhada**. Esta ficha es la **X del lecho**; Jesucristo vive en el [cruce](${cruzamento}) — asfalto **no** se fusiona con el madero.

> Auditoría independiente. [encruzilhada](${WIKT}). **Ficha ≠ catecismo.** La capa afrobrasileña se **nombra** y se **corta** del eje Jesús. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **encruzilhada** — encrucijada |
| Étimo | *en-* + *cruz* (lat. *crux*) — alta |
| Fecha | ${inspected} |

**H1:** la X es el encuentro; la estrada es un brazo.  
**H2:** el madero y el asfalto comparten *crux* — relacionar, no fusionar.  
**H3:** la [bateria](${bateria}) llena no elige el rumbo.

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobada** — encruzilhada como sitio de las vías cruzadas; Jesucristo en el [cruce](${cruzamento}). [¡Valeu !!!](${mantra})

[▶ Estrada](${estrada}) · [▶ Cruce](${cruzamento}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildEncruzilhadaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEncruzilhadaBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-encruzilhada', 203);
  return makePalavra({
    title: 'Inspeção: Encruzilhada — o sítio da cruz das vias',
    titleEn: 'Inspection: Encruzilhada — the place of the crossed ways',
    titleEs: 'Inspección: Encruzilhada — el sitio de la cruz de las vías',
    excerpt:
      'Palavras: encruzilhada (en- + cruz + -ilhada) — o X da estrada; gatilho encruziliada; ≠ leito ≠ madeiro; cruzamento Jesus Cristo; Valeu !!!',
    excerptEn:
      'Words: encruzilhada (en- + cruz + -ilhada) — the road’s X; trigger encruziliada; ≠ bed ≠ timber; Jesus Christ cross; Valeu !!!',
    excerptEs:
      'Palabras: encruzilhada (en- + cruz + -ilhada) — la X de la estrada; gatillo encruziliada; ≠ lecho ≠ madero; cruce Jesucristo; ¡Valeu !!!',
    slug: 'inspecao-palavra-encruzilhada',
    date: '2026-08-24T16:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Encruzilhada · crux',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEncruzilhadaPost,
  buildEncruzilhadaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_CRUZ,
  WIKT_CRUX
};
