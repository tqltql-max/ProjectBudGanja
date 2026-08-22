'use strict';

/**
 * Inspeção Palavras · pedra
 * Eixos: gr. πέτρα / lat. petra · o corpo duro ·
 * Pedro (Πέτρος — o mesmo étimo) · perdão (perdonare — a orelha cola) ·
 * geologia (γῆ) × gesso (γύψος) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/pedra-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/pedra';
const WIKT_LA = 'https://en.wiktionary.org/wiki/petra#Latin';
const WIKT_GR = 'https://en.wiktionary.org/wiki/πέτρα#Ancient_Greek';
const WIKT_PEDRO = 'https://pt.wiktionary.org/wiki/Pedro';
const WIKT_PERDAO = 'https://pt.wiktionary.org/wiki/perdão';

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

function buildPedraBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-pedra.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const jesus = '/posts/post-inspecao-expressao-jesusamando.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const cultivo = '/cultivo/';

  const body = `## Escopo

Inspeção editorial da palavra **[pedra](${self})** — o **corpo duro** mineral. Pedido de campo: *inspeção palavra Pedra*, com elos **Pedro**, **perdão**, **geologia** e irmã **[gesso](${gesso})**. [A orelha cola](${orelhaCola}) *pedra* em *perdão*; o étimo **corta**. *Pedro* não cola: **é o mesmo tronco**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pedra](${WIKT}), lat. [*petra*](${WIKT_LA}), gr. [*πέτρα*](${WIKT_GR}), [Pedro](${WIKT_PEDRO}), [perdão](${WIKT_PERDAO}). **Ficha ≠ manual de fratura, ≠ receita de gíria, ≠ sermão.** Série [Palavras](${hub}). Sem afiliação médica ou eclesial.

**Gatilho:** *pedra* / *Pedro* / *perdão* / *geologia* / *[gesso](${gesso})* — um mineral, um nome, um verbo de dar, uma ciência da terra, um sulfato que vira pasta.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **pedra** (pl. *pedras*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | gr. *πέτρα* → lat. *petra* — confiança: **alta** |
| Família | *pedregulho* · *pedreira* · *empédrar* · *petrificar* · *petróleo* (outro ofício: *óleo de pedra*) · *Pedro* · esp. *piedra* · it. *pietra* · fr. *pierre* |
| Tipo BudGanja | Palavra — mineral × nome × locução × par ilusório *perdão* |
| Não é | **perdão** (lat. *perdonare*) · **[gesso](${gesso})** (gr. *γύψος*) · laudo ósseo |
| Elo método | [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) · [língua portuguesa](${lingua}) |
| Elo corpo / ofício | [gesso](${gesso}) · [gesto](${gesto}) · [risco](${risco}) · [fogo](${fogo}) |
| Elo mapa | [caminho](${caminho}) (*caminho das pedras*) · [cultivo](${cultivo}) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo grego-latino para o **fragmento duro da terra** — e, por figura, o que não cede, o que se atira, o que se pisa.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **pedra** | Qualquer mineral / qualquer dureza | *πέτρα* — corpo compacto; a [geologia](${self}) estuda a casa, não o vocábulo |
| **Pedro** | Homónimo por acaso | gr. *Πέτρος* / lat. *Petrus* — **o mesmo étimo**; o nome **é** a pedra (Mt 16,18: «sobre esta pedra») |
| **perdão** | Prima de *pedra* (PE-) | lat. *perdonare* (*per-* + *donare*, dar de lado a lado) — **outro tronco** |
| **geologia** | Ciência «da pedra» | gr. *γῆ* (terra) + *λόγος* — a terra inteira; a irmã mais estreita é *petrologia* (*πέτρα* + *λόγος*) |
| **[gesso](${gesso})** | Outra pedra | gr. *γύψος* — sulfato que vira pasta; o olho cola **GE-**; o étimo corta |
| **rocha** | Sinónimo exacto | Massa; *pedra* é muitas vezes o **pedaço** — uso vivo, não lei |

**H1:** *pedra* < *petra* < *πέτρα* — mineral (alta).  
**H2:** *Pedro* é o **mesmo** étimo em nome próprio — não é cola de orelha; é punção do texto.  
**H3:** [a orelha cola](${orelhaCola}) *pedra* em *perdão*; o [étimo](${etimologia}) corta. O Evangelho **cruza** os dois no [gesto](${gesto}) «atirar a primeira pedra» — mapa cultural ([jesusamando](${jesus}) · [filho de deus](${filho})), não catequese desta ficha.  
**H4:** *geologia* guarda a pedra; *gesso* trata a pedra que **foi cozida e virou molde**. Irão na [irmã](${gesso}): braço direito, *quebrado*, *ingessado*.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Mineral** | Pedaço duro; pedreira, calçada, seixo | Alta |
| **Figura de dureza** | Coração de pedra; água mole em pedra dura | Alta (locução viva) |
| **Locução de ofício** | *Caminho das pedras* — o percurso difícil; ver [caminho](${caminho}) | Alta |
| **Locução de juízo** | *Atirar a primeira pedra* — acusar primeiro; o corte vivo é o **perdão**, noutro étimo | Alta (uso); o par é cultura, não família latina |
| **Corpo** | Cálculo (*pedra no rim*) — outro mapa clínico; citar, não tratar | Média — não é protocolo |
| **Fogo** | Pedra do [isqueiro](${isqueiro}) — ferrocerium / sílex; atrito, não geologia de calçada | Alta no objecto |
| **Gíria BR** | *Pedra* como nome de substância — **camada lexical**; esta ficha **não** descreve fabrico nem uso | Alta (existe o vocábulo); ofício = recusar a receita |
| **Lab** | No [cultivo](${cultivo}), pedra é drenagem ou estorvo — nomear o facto | Alta (ofício) |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *pedra* × *Pedro* (mesmo étimo) × *perdão* (cola de orelha) |
| Bom | Mandar o braço **quebrado** e o **ingessado** para [gesso](${gesso}) |
| Bom | *Caminho das pedras* aponta [caminho](${caminho}); não esgota a locução nesta página |
| Mau | Fundir *perdão* com *pedra* porque a boca começa em PE- |
| Mau | Usar *pedra* de gíria como se fosse a ficha mineral |
| Mau | Atirar a primeira pedra no hub — o [respeito](${respeito}) e a [verdade](${verdade}) recusam o [gesto](${gesto}) |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* pedra *hoje*: o que **não cede** no chão; o nome **Pedro** que é ela; o **perdão** que a orelha cola e o étimo solta. O braço fica na [irmã](${gesso}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Gesso](${gesso}) | Irmã — γύψος; *quebrado* → *ingessado*; braço direito |
| [Caminho](${caminho}) | *Caminho das pedras* |
| [Fogo](${fogo}) · [isqueiro BIC](${isqueiro}) | Pedra de acender |
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método do corte |
| [Jesusamando](${jesus}) · [filho de deus](${filho}) | Solo da locução da primeira pedra — sem sermão |
| [Risco](${risco}) · [gesto](${gesto}) · [respeito](${respeito}) | Atirar × imobilizar × nomear |
| [Valeu !!!](${mantra}) | Depois do corte |

## Limites

- Não ensina fratura, imobilização nem cálculo renal.  
- Não inventaria espécies minerais nem mapa geológico.  
- *Perdão*, *Pedro* e *geologia* ficam **cortados nesta ficha**; *gesso* ganha **página própria**.  
- Gíria *pedra* = vocábulo indexado, **sem** protocolo.

## Status

**Aprovado na série Palavras** — *pedra* fichada como *πέτρα*; *Pedro* no mesmo tronco; [a orelha cola](${orelhaCola}) *perdão*; o étimo corta; o corpo ingessado vive em [gesso](${gesso}).

[▶ Palavras](${hub}) · [▶ Gesso](${gesso}) · [▶ Etimologia](${etimologia}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **pedra** — the hard mineral body. Field request: *Pedra*, with **Pedro**, **perdão**, **geologia** and sister **[gesso](${gesso})**. [The ear glues](${orelhaCola}) *pedra* to *perdão*; the etymon **cuts**. *Pedro* is not glue: it is the **same** stem.

> **Method note:** [Wiktionary · pedra](${WIKT}), Lat. [*petra*](${WIKT_LA}), Gk. [*πέτρα*](${WIKT_GR}). **Not** a fracture manual. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **pedra** |
| Etymon | Gk. *πέτρα* → Lat. *petra* |
| Same stem | **Pedro** (Gk. *Πέτρος*) — the name *is* the rock |
| Not | **perdão** (Lat. *perdonare*) · **[gesso](${gesso})** (Gk. *γύψος*) |
| Date | ${inspected} |

The Gospel scene “cast the first stone” *crosses* stone and pardon in culture, not in Latin family. The broken **right arm** and *ingessado* live on [gesso](${gesso}). [Valeu !!!](${mantra})

## Status

**Approved in Words** — *πέτρα*; Pedro same trunk; ear-glue to *perdão* cut.

[▶ Words](${hub}) · [▶ Gesso](${gesso}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **pedra** — el cuerpo mineral duro. Pedido: *Pedra*, con **Pedro**, **perdão**, **geologia** e hermana **[gesso](${gesso})**. [El oído pega](${orelhaCola}) *pedra* a *perdão*; el étimo **corta**. *Pedro* no es cola: es el **mismo** tronco.

> **Nota:** [Wikcionario · pedra](${WIKT}), lat. [*petra*](${WIKT_LA}). **No** es manual de fractura. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **pedra** |
| Étimo | Gr. *πέτρα* → lat. *petra* |
| Mismo tronco | **Pedro** (gr. *Πέτρος*) |
| No es | **perdão** (lat. *perdonare*) · **[gesso](${gesso})** (gr. *γύψος*) |
| Fecha | ${inspected} |

«Tirar la primera piedra» cruza piedra y perdón en cultura, no en familia latina. El **brazo derecho** quebrado vive en [gesso](${gesso}). [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *πέτρα*; Pedro mismo tronco; cola de oído con *perdão* cortada.

[▶ Palabras](${hub}) · [▶ Gesso](${gesso}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildPedraPost() {
  const { body, contentEn, contentEs } = buildPedraBodies();
  const seriesOrder = pickOrder('inspecao-palavra-pedra', 240);
  return makePalavra({
    title: 'Inspeção: Pedra — πέτρα; Pedro é o mesmo tronco; a orelha cola perdão',
    titleEn: 'Inspection: Pedra — πέτρα; Pedro is the same stem; the ear glues perdão',
    titleEs: 'Inspección: Pedra — πέτρα; Pedro es el mismo tronco; el oído pega perdão',
    excerpt:
      'Palavras: pedra ← gr. πέτρα / lat. petra — Pedro no mesmo étimo; perdão (perdonare) é cola de orelha; irmã gesso; Valeu !!!',
    excerptEn:
      'Words: pedra ← Gk. πέτρα / Lat. petra — Pedro same etymon; perdão (perdonare) is ear-glue; sister gesso; Valeu !!!',
    excerptEs:
      'Palabras: pedra ← gr. πέτρα / lat. petra — Pedro el mismo étimo; perdão (perdonare) es cola de oído; hermana gesso; ¡Valeu !!!',
    slug: 'inspecao-palavra-pedra',
    date: '2026-08-22T18:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Pedra · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPedraPost,
  buildPedraBodies
};
