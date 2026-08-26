'use strict';

/**
 * Inspeção Palavras · eminente
 * Eixos: lat. eminens ← ēminēre (ē- «para fora» + minēre «saltar») ·
 * sobressai × iminente (imminēre «pairar sobre») ·
 * a orelha cola; o étimo corta · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/eminente-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/eminente';
const WIKT_IMI = 'https://pt.wiktionary.org/wiki/iminente';
const WIKT_LA = 'https://en.wiktionary.org/wiki/eminens#Latin';
const WIKT_EMINEO = 'https://en.wiktionary.org/wiki/emineo#Latin';
const WIKT_IMMINENS = 'https://en.wiktionary.org/wiki/imminens#Latin';

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

function buildEminenteBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-eminente.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const magnifico = '/posts/post-inspecao-palavra-magnifico.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const memoravel = '/posts/post-inspecao-palavra-memoravel.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const cultivo = '/cultivo/';

  const body = `## Escopo

Inspeção editorial da palavra **[eminente](${self})** — adjetivo: o que **sobressai**. Pedido de campo: *inspeção na palavra eminente*. [A orelha cola](${orelhaCola}) **eminente** em **iminente**. O étimo **corta**: um **está acima**; o outro **está a cair em cima**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · eminente](${WIKT}), [iminente](${WIKT_IMI}), lat. [*eminens*](${WIKT_LA}) / [*ēmineō*](${WIKT_EMINEO}), [*imminens*](${WIKT_IMMINENS}). **Ficha ≠ ranking de pessoas, ≠ sermão, ≠ manual de desapropriação.** Série [Palavras](${hub}). Sem afiliação académica.

**Gatilho:** *eminente* / *iminente* / *proeminente* — três prefixos no mesmo tronco *minēre*; **três ofícios**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **eminente** (pl. *eminentes*) |
| Classe | Adjetivo (comum aos dois géneros) |
| Étimo (trabalho) | lat. *eminens*, part. pres. de *ēminēre* — *ē-* («para fora») + *minēre* («saltar, projectar») — confiança: **alta** |
| Família | *eminência* · *eminentemente* · *proeminente* · ing. *eminent* · esp. *eminente* · fr. *éminent* |
| Tipo BudGanja | Palavra — sobressai × par ilusório *iminente* × ofício |
| Não é | **iminente** (lat. *imminens* — o que **paira** / está a chegar) · [ídolo](${idolo}) · [magnífico](${magnifico}) |
| Elo método | [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) · [língua portuguesa](${lingua}) |
| Elo elogio | [especial](${especial}) · [genial](${genial}) · [memorável](${memoravel}) · [legal](${legal}) |
| Elo corte | [risco](${risco}) · [tempo](${tempo}) — casa de *iminente*, não desta ficha |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que diz «isto / esta pessoa **está acima do comum**» — qualidade, ofício, relevo. Não diz «está **quase a acontecer**».

## O que a orelha cola — e o étimo corta

O Wikcionário já manda **confrontar** *iminente*. No BR a sílaba inicial reduz: *e-* e *i-* soam quase iguais. A boca junta; o laboratório separa.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **eminente** | «O que está a chegar» | *ē-* + *minēre* — **salta para fora**; sobressai |
| **iminente** | O mesmo adjetivo | *in-* + *minēre* — **paira sobre**; [tempo](${tempo}) curto, [risco](${risco}) à vista |
| **proeminente** | Sinónimo exacto | *pro-* + *minēre* — **salta para a frente** (nariz, relevo, figura) |
| ing. *eminent* | Tradução directa | O mesmo *eminens* |
| ing. *imminent* | Homófono BR | Conserva o **mm** de *imminens*; o PT *iminente* perdeu um *m* |

**Truque de ofício (não é étimo):** **E**minente anda com **E**xcelente; **I**minente anda com **I**mediatamente.

**H1:** *eminente* < *eminens* < *ēminēre* — estar **saliente** (alta).  
**H2:** *iminente* < *imminens* < *imminēre* — estar **a impender** (alta). Mesmo tronco *minēre*; prefixo troca o ofício.  
**H3:** [a orelha cola](${orelhaCola}) o par; o [étimo](${etimologia}) e a [verdade](${verdade}) cortam.  
**H4:** no lab, «pessoa eminente» pede [respeito](${respeito}) com rasto; «perigo eminente» é **erro** — o perigo que chega é **iminente**.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Qualidade / ofício** | «jurista eminente», «contribuição eminente» — acima do comum | Alta |
| **Relevo / altura** | O que se destaca no campo (mais raro no BR oral; *proeminente* cobre o físico) | Alta (latim); média no uso BR |
| **Título** | *Sua Eminência* — tratamento de cardeal (*eminência*) | Alta noutro mapa — citar, não fundir |
| **Direito** | *domínio eminente* (poder do Estado sobre o bem; ing. *eminent domain*) — no BR vive mais como **desapropriação** | Média (termo jurídico; não é esta ficha) |
| **Elogio lab** | Distinto de [genial](${genial}) (engenho) e de [memorável](${memoravel}) (rasto): *eminente* marca **relevo duradouro** | Média–alta (mapa lab) |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | «ficha eminente» = relevo **com** [gesto](${gesto}) rastreável |
| Bom | Cortar *perigo eminente* → **perigo iminente** |
| Bom | No [cultivo](${cultivo}), «colheita **iminente**» = a semana está a chegar — não «colheita eminente» |
| Mau | Trocar as duas por semelhança de ouvido |
| Mau | Pedestal oco: chamar eminente sem [verdade](${verdade}) = bajulação de [ídolo](${idolo}) |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* palavra *hoje*: deixar sobressair o que **salta para fora**; não colar o que **paira**.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método do corte |
| [Especial](${especial}) · [Genial](${genial}) · [Magnífico](${magnifico}) · [Memorável](${memoravel}) | Escala de relevo / elogio |
| [Risco](${risco}) · [Tempo](${tempo}) | Casa de *iminente* |
| [Ídolo](${idolo}) · [Respeito](${respeito}) | Pedestal × ofício |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo BR |
| [Valeu !!!](${mantra}) | Depois do corte |

## Limites

- Não inventaria «pessoas eminentes».  
- Não ensina desapropriação nem liturgia cardinalícia.  
- *Iminente* fica **cortado nesta ficha**; não ganha página própria ainda.  
- Truque E/I = mnemónica de ofício, não étimo.

## Status

**Aprovado na série Palavras** — *eminente* fichado como *ēminēre* (sobressai); [a orelha cola](${orelhaCola}) *iminente*; o étimo corta.

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ A orelha cola…](${orelhaCola}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **eminente** — adjective: that which **stands out**. Field request: *inspection of the word eminente*. [The ear glues](${orelhaCola}) **eminente** to **iminente**. The etymon **cuts**: one **stands above**; the other **hangs over**.

> **Method note:** [Wiktionary · eminente](${WIKT}), Lat. [*eminens*](${WIKT_LA}) / [*ēmineō*](${WIKT_EMINEO}), [*imminens*](${WIKT_IMMINENS}). **Not** a ranking of people. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **eminente** |
| Etymon | Lat. *eminens* ← *ēminēre* (*ē-* “out” + *minēre* “to jut”) |
| Not | **iminente** (Lat. *imminens* — about to happen) · [ídolo](${idolo}) |
| Method | [etymology](${etimologia}) · [the ear glues…](${orelhaCola}) |
| Date | ${inspected} |

**Craft trick (not etymon):** **E**minente walks with **E**xcellent; **I**minente walks with **I**mmediately. English *imminent* keeps the **mm** of *imminens*; Portuguese *iminente* dropped one *m*. [Valeu !!!](${mantra})

## Status

**Approved in Words** — stands out (*ēminēre*); ear-glue to *iminente* cut.

[▶ Words](${hub}) · [▶ Etymology](${etimologia}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **eminente** — adjetivo: lo que **sobresale**. Pedido: *inspección de la palabra eminente*. [El oído pega](${orelhaCola}) **eminente** a **iminente**. El étimo **corta**: uno **está arriba**; el otro **se echa encima**.

> **Nota:** [Wikcionario · eminente](${WIKT}), lat. [*eminens*](${WIKT_LA}). **No** es ranking de personas. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **eminente** |
| Étimo | Lat. *eminens* ← *ēminēre* (*ē-* «hacia fuera» + *minēre* «saltar») |
| No es | **iminente** (lat. *imminens* — a punto de ocurrir) · [ídolo](${idolo}) |
| Método | [etimología](${etimologia}) · [el oído pega…](${orelhaCola}) |
| Fecha | ${inspected} |

**Truco de oficio (no étimo):** **E**minente anda con **E**xcelente; **I**minente anda con **I**mediatamente. El inglés *imminent* guarda la **mm** de *imminens*; el PT *iminente* perdió una *m*. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — sobresale (*ēminēre*); cola de oído con *iminente* cortada.

[▶ Palabras](${hub}) · [▶ Etimología](${etimologia}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildEminentePost() {
  const { body, contentEn, contentEs } = buildEminenteBodies();
  const seriesOrder = pickOrder('inspecao-palavra-eminente', 230);
  return makePalavra({
    title: 'Inspeção: Eminente — sobressai; a orelha cola iminente',
    titleEn: 'Inspection: Eminente — stands out; the ear glues iminente',
    titleEs: 'Inspección: Eminente — sobresale; el oído pega iminente',
    excerpt:
      'Palavras: eminente ← lat. eminens / ēminēre (salta para fora) — ≠ iminente (imminēre, paira); a orelha cola, o étimo corta; Valeu !!!',
    excerptEn:
      'Words: eminente ← Lat. eminens / ēminēre (juts out) — ≠ iminente (imminēre, hangs over); the ear glues, the etymon cuts; Valeu !!!',
    excerptEs:
      'Palabras: eminente ← lat. eminens / ēminēre (salta hacia fuera) — ≠ iminente (imminēre, se echa encima); el oído pega, el étimo corta; ¡Valeu !!!',
    slug: 'inspecao-palavra-eminente',
    date: '2026-08-22T17:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Eminente · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEminentePost,
  buildEminenteBodies
};
