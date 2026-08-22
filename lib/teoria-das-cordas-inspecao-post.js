'use strict';

/**
 * Inspeção Palavras · teoria das cordas
 * Eixos: física teórica · calque de string theory · metáfora χορδή ·
 * ≠ objecto corda · ≠ nó · ≠ misticismo de «vibração»
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/teoria-das-cordas-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Teoria_das_cordas';
const WIKI_EN = 'https://en.wikipedia.org/wiki/String_theory';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildTeoriaDasCordasBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const orfeu = '/posts/post-inspecao-palavra-orfeu.html';
  const afinar = '/posts/post-inspecao-palavra-afinar.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const cientista = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const manual = '/posts/post-inspecao-canal-manual-do-mundo.html';
  const guia = '/guia/palavras.html';
  const radio = '/radio/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do sintagma **[teoria das cordas](${self})** — calque português de *string theory*. É um **programa de investigação** em física teórica: modela o que a física de partículas trata como **pontos** como **cordas unidimensionais a vibrar**. Pedido de campo: *teoria das cordas* ao lado do objecto [corda](${corda}). O lab **separa**: o fio que se ata no cultivo não é o objecto desta ficha.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Teoria das cordas](${WIKI}), [String theory](${WIKI_EN}). **Ficha ≠ curso de física, ≠ prova experimental, ≠ manual de amarração.** A metáfora musical (χορδή) é o **nome**; a matemática é o **ofício**. Sem afiliação a institutos nem a divulgação mística. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Sintagma | **teoria das cordas** |
| Classe | Locução substantiva (física) |
| Calque | EN *string theory* → PT *teoria das cordas* / *teoria de cordas* |
| Étimo das peças | *teoria* ← gr. θεωρία *theōría* «contemplação / inspeção»; *corda* ← lat. *chorda* ← gr. χορδή — confiança: **alta** nas peças; o composto é tradução de ofício |
| Tipo BudGanja | Palavra-conceito — física teórica × metáfora musical × ≠ objecto |
| Não é | [corda](${corda}) (fio) · [nó](${no}) (laço) · partitura · dogma |
| Elos lab | [tónos](${tonos}) · [orfeu](${orfeu}) · [pattern](${pattern}) · [etimologia](${etimologia}) · [verdade](${verdade}) |
| Fonte | [Teoria das cordas](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **mapa matemático** que tenta ler partículas e gravidade no mesmo vocabulário — a **vibração** de uma corda, não o cabo do [cultivo](/cultivo/).

## 2. Três cordas (não misturar)

| Forma | Ofício | Confiança |
|-------|--------|-----------|
| **[Corda](${corda})** objecto | Fio / cabo / χορδή de instrumento no mundo das mãos | Alta |
| **Corda musical** | A mesma raiz: tensão, tom, harmónico — [tónos](${tonos}) é a **tensão**; χορδή é o **fio**; a lira de [Orfeu](${orfeu}) é o instrumento | Alta (metáfora-fonte) |
| **Corda da física** | Objecto teórico 1D; modos de vibração ↔ espécies de partícula | Alta no **nome**; a teoria em si é **programa**, não facto fechado |
| **[Nó](${no})** | Laço **na** corda-objecto | Alta — **não** é esta ficha (teoria de nós é outro mapa) |

**H1:** o ouvido cola *corda* e *teoria das cordas*; o lab descola.  
**H2:** a física **emprestou** a corda da música — o [pattern](${pattern}) é harmónico, não hortícola.  
**H3:** «está tudo a vibrar» na fala pop **não** prova a teoria; é slogan. O ofício pede equação e [verdade](${verdade}) experimental — o método de [toda criança nasce cientista](${cientista}).

## 3. Mapa mínimo (o que a teoria propõe)

| Camada | Leitura de ofício | Confiança |
|--------|-------------------|-----------|
| **Objecto** | Em vez de ponto sem tamanho, um **filamento** 1D (corda aberta ou fechada) | Alta (definição do programa) |
| **Modos** | Cada modo de vibração comporta-se como uma partícula diferente (fotão, electrão, gravitão…) — analogia de ofício com [polimorfismo](${polimorfismo}) (**mesmo** objecto, **várias** formas); **não** é o termo da biologia | Alta no discurso da teoria |
| **Unificação** | Candidata a juntar **mecânica quântica** (o muito pequeno) e **relatividade geral** (gravidade / [tempo](${tempo})-espaço) | Alta como **objectivo**; média como **êxito comprovado** |
| **Dimensões extra** | Superstring: em geral **10** dimensões do espaço-tempo (9+1); M-teoria: **11**. As extra estariam **compactadas** — pequenas demais para o olhar do dia | Alta no formalismo; **não observadas** à escala humana |
| **Supersimetria** | Muitas versões pedem parceiros super-simétricos das partículas conhecidas | Alta no modelo; **não confirmada** nos aceleradores até à data desta ficha |
| **Status empírico** | Sem previsão única testada à energia acessível; há um **landscape** de vacua possíveis | Alta (limite honesto) |

**Veredicto de ofício:** mapa **rico** e **aberto**. Não é mentira; também **não** é facto de laboratório fechado. O [gesto](${gesto}) certo é ler o programa **como programa**.

## 4. História breve (marcos públicos)

| Marco | Leitura |
|-------|---------|
| **1968** | Gabriele Veneziano — amplitude dual (hádrones); ainda não se chamava «teoria das cordas» |
| **c. 1970** | Nambu, Susskind, Nielsen — a amplitude como **corda** relativista |
| **1974** | Scherk & Schwarz — a corda também descreve **gravidade** (gravitão) |
| **1984** | Green & Schwarz — cancelamento de anomalias; 1.ª revolução das supercordas |
| **1995** | Edward Witten — **M-teoria** (2.ª revolução); as cinco supercordas + 11D |
| **séc. XXI** | Landscape, AdS/CFT (Maldacena), crítica e defesa públicas — o debate continua |

A [língua portuguesa](${lingua}) recebeu o nome pronto: *string* → *corda*. O calque é fiel à metáfora, não à prova — ofício de [etimologia](${etimologia}).

## 5. Armadilhas de divulgação

| Slogan | Correção lab |
|--------|----------------|
| «A teoria das cordas está provada» | **Não.** É investigação activa; falta teste decisivo à nossa escala |
| «A teoria das cordas é lixo» | Também **não** é o veredicto desta ficha — é matemática com objectivo físico, com críticas sérias (testabilidade, landscape) |
| «Tudo é vibração, logo é cordas» | Confunde **metáfora** com **modelo**. [Fogo](${fogo}), [luz](${luz}), [sol](${sol}) e [eletrizante](${eletrizante}) no lab são ofício, não prova de supercorda |
| «Dimensões extra = planos místicos» | Compactação geométrica ≠ espiritualismo. [The Matrix](${matrix}) é parábola de escolha — **não** compactação de Calabi–Yau |
| «É a mesma [corda](${corda}) do objecto» | Homónimos de raiz; **ofícios distintos** |
| «Teoria dos nós» | Topologia do [nó](${no}) — **outro** mapa |

**H-risco:** o [risco](${risco}) aqui é **autoridade emprestada** — usar o nome da física para fechar conversa no cultivo, na fé ou no marketing.

## 6. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Corda](${corda}) | O **fio** das mãos; irmã lexical, não o objecto teórico |
| [Cinta](${cinta}) · [desatar](${desatar}) · [nó](${no}) | Cluster do objecto — laço, faixa, soltar; **não** compactação |
| [Tónos](${tonos}) | Grego τόνος — **tensão / tom** da corda; χορδή é o fio, *tónos* é o aperto que faz soar |
| [Afinar](${afinar}) | O **gesto** na cravelha: apertar a corda musical até o tom — ofício das mãos, não supercorda |
| [Orfeu](${orfeu}) | A **lira** — metáfora musical que a física emprestou; [Rádio](${radio}) toca, não prova supercorda |
| [Etimologia](${etimologia}) | O calque *string theory* → *teoria das cordas* |
| [Polimorfismo](${polimorfismo}) | Analogia: **mesma** corda, **vários** modos/partículas — outro ofício (bio/código) |
| [Pattern](${pattern}) | A teoria **é** um pattern matemático — molde, não dogma |
| [Tempo](${tempo}) | Espaço-tempo; kairós do lab ≠ dimensão compacta |
| [Sol](${sol}) · [luz](${luz}) · [fogo](${fogo}) · [eletrizante](${eletrizante}) | Fenómenos do mundo (fotão, calor, carga); a teoria **pretende** incluí-los — sem slogan |
| [Toda criança nasce cientista](${cientista}) | Método: perguntar o que está **testado** |
| [Manual do Mundo](${manual}) | Divulgação de ciência com ofício — distinto de misticismo de vibração |
| [The Matrix](${matrix}) | Camadas / escolha no pop — **não** são as 10D da supercorda |
| [Verdade](${verdade}) · [gesto](${gesto}) | Distinguir modelo, metáfora e facto |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | O calque *teoria das cordas* |
| [Valeu !!!](${mantra}) | Fechar com o mapa certo: nome grande ≠ prova grande |

## 7. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Física / divulgação séria** | Bom: nomear o programa com os limites |
| **Metáfora musical** | Bom se se declara metáfora |
| **«A planta vibra em cordas»** | Mau: mistura cultivo e slogan |
| **Confundir com o objecto [corda](${corda})** | Mau: o ouvido cola; a ficha descola |

**Finalidade-mãe:** guardar o **nome** e o **limite**. A teoria das cordas inspecciona o muito pequeno com uma metáfora de instrumento; o laboratório BudGanja inspecciona palavras e plantas com [verdade](${verdade}) à vista.

## Hipóteses (síntese)

**H1:** *teoria das cordas* = calque de *string theory* — programa de unificação, não o objecto [corda](${corda}).  
**H2:** a metáfora χορδή / harmónico é o **baptismo**; a evidência empírica ainda **não** fechou o caso.  
**H3:** dimensões extra e supersimetria são peças do formalismo, não cartões do catálogo [Objetos](/objetos/).  
**H4:** divulgação pop que transforma vibração em dogma é [risco](${risco}) de nome.  
**H5:** fecho = [Valeu !!!](${mantra}) — inspecionar o **programa** sem fingir que já é **facto**.

## Limites

- Não é aula de relatividade, QFT nem compactação.  
- Não arbitra a disputa académica (cordas × gravidade quântica em laços × outros programas).  
- Não lista partículas nem Lagrangianos.  
- A [corda](${corda}) objecto e o [nó](${no}) ficam nas fichas deles.

## Status

**Aprovado** — **teoria das cordas** fichada como conceito de física (*string theory*); distinta do objecto [corda](${corda}); metáfora musical declarada; estatuto empírico **aberto**. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Corda](${corda}) · [▶ Afinar](${afinar}) · [▶ Tónos](${tonos}) · [▶ Orfeu](${orfeu}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **teoria das cordas** — calque of English *string theory*. A **research program** in theoretical physics: particles as **vibrating one-dimensional strings**, not points. Distinct from the [corda](${corda}) object (rope). Close: [Valeu !!!](${mantra}).

> Independent audit. Sources: [String theory](${WIKI_EN}), [PT](${WIKI}). **Not a physics course, not experimental proof, not a tying manual.** The musical metaphor (χορδή) is the **name**; the math is the **craft**.

## 1. Object

| Field | Value |
|-------|-------|
| Phrase | **teoria das cordas** / *string theory* |
| Lab type | Concept — theoretical physics × musical metaphor × ≠ rope |
| Not | [corda](${corda}) (rope) · [nó](${no}) (knot) · mysticism |
| Status | Active program; **no** unique test at accessible energy |
| Date | ${inspected} |

**Craft reading:** a rich **map**, still **open**. Extra dimensions and supersymmetry belong to the formalism — they are not cards in the [Objects](/objetos/) catalog.

## Status

**Approved** — string theory filed as physics concept; rope object stays on its own sheet.

[▶ Words](${hub}) · [▶ Corda](${corda}) · [▶ Tónos](${tonos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **teoria das cordas** — calco de *string theory*. Un **programa de investigación** en física teórica: partículas como **cuerdas unidimensionales que vibran**, no puntos. Distinta del objeto [corda](${corda}) (cuerda). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. Fuentes: [Teoría de cuerdas](${WIKI}), [EN](${WIKI_EN}). **No es curso de física ni prueba experimental.** La metáfora musical (χορδή) es el **nombre**; la matemática es el **oficio**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Sintagma | **teoria das cordas** / *string theory* |
| Tipo lab | Concepto — física teórica × metáfora musical × ≠ cuerda-objeto |
| No es | [corda](${corda}) · [nó](${no}) · misticismo |
| Estado | Programa activo; **sin** test único a energía accesible |
| Fecha | ${inspected} |

**Lectura de oficio:** mapa **rico** y **abierto**. Dimensiones extra y supersimetría son del formalismo — no fichas del catálogo [Objetos](/objetos/).

## Estado

**Aprobada** — teoría de cuerdas fichada como concepto de física; el objeto cuerda queda en su ficha.

[▶ Palabras](${hub}) · [▶ Corda](${corda}) · [▶ Tónos](${tonos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTeoriaDasCordasPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildTeoriaDasCordasBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-teoria-das-cordas', 176);
  return makePalavra({
    title: 'Inspeção: Teoria das cordas — a física, não o fio',
    titleEn: 'Inspection: String theory — the physics, not the rope',
    titleEs: 'Inspección: Teoría de cuerdas — la física, no el hilo',
    excerpt:
      'Palavras: «teoria das cordas» — calque de *string theory*; partículas como cordas a vibrar; ≠ objecto corda; programa aberto; Valeu !!!',
    excerptEn:
      'Words: “teoria das cordas” — calque of *string theory*; particles as vibrating strings; ≠ rope object; open program; Valeu !!!',
    excerptEs:
      'Palabras: «teoria das cordas» — calco de *string theory*; partículas como cuerdas que vibran; ≠ objeto cuerda; programa abierto; ¡Valeu !!!',
    slug: 'inspecao-palavra-teoria-das-cordas',
    date: '2026-08-22T05:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Teoria das cordas · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildTeoriaDasCordasPost, buildTeoriaDasCordasBodies };
