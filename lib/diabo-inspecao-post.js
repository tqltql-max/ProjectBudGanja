'use strict';

/**
 * Inspeção Palavras · diabo
 * Eixos: lat. diabolus ← gr. diábolos · Daibo (lapso) ·
 * Diablo (ES / jogo / monte) · giaua (vizinho oral) ·
 * ≠ diamba · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/diabo-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/diabo';
const WIKT_DIABOLOS = 'https://en.wiktionary.org/wiki/διάβολος#Ancient_Greek';
const WIKI_MT = 'https://en.wikipedia.org/wiki/Mount_Diablo';

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

function buildDiaboBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const jogo = '/posts/post-inspecao-jogo-diablo.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const cadernos = '/jogos/cadernos/';

  const body = `## Escopo

Inspeção editorial da palavra **diabo** — o **acusador** do étimo grego, o **nome popular** do adversário no português, e o **som** que a boca cola em **Daibo**, **Diablo** e **giaua**. Esta ficha cobre o **objecto linguístico**. O jogo Blizzard fica no [caderno Diablo](${jogo}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · diabo](${wiktSafe()}), [diábolos](${WIKT_DIABOLOS}), [Mount Diablo](${WIKI_MT}). **Ficha ≠ tratado de teologia nem de occultismo.** Jogo ≠ culto. [Diamba](${diamba}) é **outra** palavra (cognato afro-brasileiro da planta). Sem afiliação.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **diabo** (pl. *diabos*) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | lat. *diabolus* ← gr. *diábolos* («caluniador / acusador», de *diabállein*: lançar através) — confiança: **alta** |
| Pedido de campo | *Daibo* · *Diablo* · *parece giaua* |
| Tipo BudGanja | Palavra — acusador × marca de jogo × lapso oral |
| Elo jogo | [Caderno Diablo](${jogo}) — franquia 1997; génese do título também no [monte californiano](${WIKI_MT}) |
| Elo que **não** é | [diamba](${diamba}) — planta / vocábulo bantu |
| Elo afecto | [medo](${medo}) · [risco](${risco}) · [verdade](${verdade}) |
| Elo oral (Deus) | [jesusamado](${jesusamado}) · [meudeusdoceu](${meudeus}) · [filho de Deus](${filho}) — **outra sala** |
| Fonte | [Wikcionário](${wiktSafe()}) |
| Data | ${inspected} |

## O que a orelha cola — e o étimo corta

Pedido: inspecionar *Daibo* e **relacionar** o que **parece** *giaua*. Método da [relação](${relacao}): o **entre** não funde os mapas.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Daibo** | Nome próprio / marca | Lapso / teclado de **diabo** |
| **diabo** | O «mau» absoluto | Palavra PT ← *diábolos* (acusar / caluniar) |
| **Diablo** | O mesmo diabo, em maiúsculas | (1) espanhol = diabo · (2) [jogo](${jogo}) · (3) [Mount Diablo](${WIKI_MT}), Califórnia — Brevik cita o **monte** na génese do título |
| **giaua** | Iavé / Yahweh / um nome sagrado | Vizinho **oral** no campo teológico — **não** étimo de diabo nem do jogo |
| **[diamba](${diamba})** | O mesmo som *dia-* | Cognato afro-brasileiro da cannabis — **outra ficha** |

**H1:** *diabo* < *diábolos* — quem **acusa / calunia** (alta).  
**H2:** *Diablo* no ecrã **parece** o diabo espanhol; a génese do título, segundo Brevik, passa pelo **monte**. Duas camadas; não fundir.  
**H3:** *giaua* cola-se a **Iavé** no ouvido religioso; o laboratório **não** troca o Nome pelo adversário nem pelo loot.  
**H4:** *diamba* e *diabo* partilham sílaba; a [orelha cola](/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html), o étimo corta.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Acusador** | Étimo grego — calúnia / acusação | Alta |
| **Adversário popular** | «O diabo» na fala, no medo, no ditado | Alta (uso vivo) |
| **Espanhol *diablo*** | Cognato; título do jogo | Alta |
| **Monte** | Topónimo californiano (espanhol colonial) | Alta (geografia) |
| **Teologia** | Satanás / Iavé — debate de fé | Fora do ofício desta ficha — só [relação](${relacao}) de vizinhança |
| **Jogo** | Lord of Terror no ecrã | Alta — objecto no [caderno](${jogo}) |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Separar palavra, monte, jogo e Nome |
| Mau | Fazer da ficha sermão ou convite occultista |
| Mau | Colar [diamba](${diamba}) em diabo porque «soa igual» |
| Mau | Transformar o caderno em tutorial de farm ilegal ou cheat |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* palavra *hoje*.

## Status

**Aprovado na série Palavras** — *Daibo* lido como **diabo**; *Diablo* no [caderno de jogo](${jogo}); *giaua* como vizinho oral, não étimo.

[▶ Palavras](${hub}) · [▶ Caderno Diablo](${jogo}) · [▶ Diamba](${diamba}) · [▶ Cadernos](${cadernos}) · [Wikcionário](${wiktSafe()})
`;

  function wiktSafe() {
    return WIKT;
  }

  const contentEn = `## Scope

Editorial inspection of Portuguese **diabo** (devil) — Greek *diábolos* (slanderer / accuser). Field request: *Daibo*, *Diablo*, and something that **sounds like** *giaua*. The Blizzard game lives on the [Diablo notebook](${jogo}).

> **Method note:** [Wiktionary](${WIKT}). **Not** a theology tract. [Diamba](${diamba}) is another word (Afro-Brazilian cannabis cognate).

## Object

| Field | Value |
|-------|-------|
| Word | **diabo** |
| Etymon | Lat. *diabolus* ← Gr. *diábolos* |
| Game link | [Diablo notebook](${jogo}) — title also from [Mount Diablo](${WIKI_MT}) (Brevik) |
| Oral neighbor | *giaua* ≈ Yahweh / Iavé — **not** the etymon |
| Date | ${inspected} |

## What the ear glues

*Daibo* = slip for **diabo**. *Diablo* = Spanish cognate + game + California mountain. *giaua* = theological neighbor. *diamba* = plant word. Cut the maps. [Valeu !!!](${mantra})

## Status

**Approved in Words** — game on [the notebook](${jogo}).
`;

  const contentEs = `## Alcance

Inspección de **diabo** — gr. *diábolos* (calumniador / acusador). Pedido de campo: *Daibo*, *Diablo* y lo que **parece** *giaua*. El juego está en el [cuaderno Diablo](${jogo}).

> **Nota:** [Wikcionario](${WIKT}). **No** es tratado teológico. [Diamba](${diamba}) es otra palabra.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **diabo** |
| Étimo | Lat. *diabolus* ← gr. *diábolos* |
| Juego | [Cuaderno Diablo](${jogo}) — el título también pasa por [Mount Diablo](${WIKI_MT}) |
| Vecino oral | *giaua* ≈ Iavé — **no** es el étimo |
| Fecha | ${inspected} |

## La oreja pega

*Daibo* = lapsus de **diabo**. *Diablo* = cognado ES + juego + monte. *giaua* = vecino teológico. *diamba* = planta. Cortar los mapas. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — el juego en [el cuaderno](${jogo}).
`;

  return { body, contentEn, contentEs };
}

function buildDiaboPost() {
  const { body, contentEn, contentEs } = buildDiaboBodies();
  const seriesOrder = pickOrder('inspecao-palavra-diabo', 220);
  return makePalavra({
    title: 'Inspeção: Diabo — Daibo, Diablo e o que parece giaua',
    titleEn: 'Inspection: Diabo — Daibo, Diablo, and what sounds like giaua',
    titleEs: 'Inspección: Diabo — Daibo, Diablo y lo que parece giaua',
    excerpt:
      'Palavras: diabo ← diábolos (acusador); Daibo é lapso; Diablo é ES + jogo + monte; giaua é vizinho oral, não étimo; ≠ diamba; Valeu !!!',
    excerptEn:
      'Words: diabo ← diábolos (accuser); Daibo is a slip; Diablo is Spanish + game + mountain; giaua is an oral neighbor, not the etymon; ≠ diamba; Valeu !!!',
    excerptEs:
      'Palabras: diabo ← diábolos (acusador); Daibo es lapsus; Diablo es ES + juego + monte; giaua es vecino oral, no étimo; ≠ diamba; ¡Valeu !!!',
    slug: 'inspecao-palavra-diabo',
    date: '2026-08-22T17:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Diabo · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDiaboPost,
  buildDiaboBodies
};
