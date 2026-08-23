'use strict';

/**
 * Inspeção Palavras · Ufa!!!
 * Sopro de alívio. Pedido: trocar aff por ufa; Ufa!!!; que alívio.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ufa-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/ufa';

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

function buildUfaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-ufa.html';
  const alivio = '/posts/post-inspecao-palavra-alivio.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const boa = '/posts/post-inspecao-palavra-boa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = valeu;

  const body = `## Escopo

Inspeção da interjeição **[Ufa!!!](${self})** — o **sopro de [alívio](${alivio})** no português do Brasil. Pedidos de campo: *trocar aff por ufa* · **Ufa!!!** · **que alívio**.

**Ufa!!!** é o grito. **Que alívio** é a frase que o **nomeia**. [Alívio](${alivio}) é o vocábulo (*alleviāre* — tornar leve). Três peças, uma sala.

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · ufa](${WIKT}), ficha [alívio](${alivio}), oralidade BR. **Ficha ≠ terapia.** Catalogar o sopro ≠ ridicularizar quem alivia. Pedido: o âncora deste sopro é **ufa**, não o enfado.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **ufa** |
| Grito de ofício | **Ufa!!!** — o mesmo calor gráfico de [Valeu !!!](${mantra}) / [Boa!!!](${boa}) |
| Locução incluída | **que alívio** — a frase que diz o que o sopro fez |
| Vocábulo irmão | **[alívio](${alivio})** — o **nome** (*levis*); ufa é o **ar** |
| Classe | Interjeição |
| Étimo | Onomatopeia / sopro — confiança: **alta no uso**; baixa em étimo erudito |
| Tipo BudGanja | Palavra — alívio depois do aperto |
| Elo cluster | [desatar](${desatar}) · [desatar o nó](${desatarNo}) · [nó na vida!](${noVida}) |
| Fonte | [ufa](${WIKT}) |
| Data | ${inspected} |

**Objecto:** o ar que sai quando o laço cede. No lab: termómetro de **alívio**. **Que alívio** põe o nome no sopro.

## 2. Ufa!!! × que alívio × alívio

| Forma | Ofício |
|-------|--------|
| **Ufa!!!** | Sopro — o peito confirma que o peso baixou |
| **que alívio** | Frase — nomeia o sopro em português |
| **[alívio](${alivio})** | Vocábulo — *ad-* + *levis*; não é o cervídeo que a orelha cola |

**H1:** **Ufa!!!** marca **depois**.  
**H2:** **que alívio** é a mesma sala, em palavras.  
**H3:** ufa bom = o [gesto](${gesto}) de [desatar](${desatar}) aconteceu; o peito confirma.  
**H4:** ufa mau = festejar o sopro e deixar a [corda](${corda}) outra vez em laço.  
**H5:** **Ufa!!!** depois de [fiz meu melhor](${faca}) = o peito confirma o ofício **já feito** — não apaga o rasto.

## 3. Sequência do cluster

[Nó na vida!](${noVida}) → [desatar o nó](${desatarNo}) → **Ufa!!!** / **que alívio** → [legal](${legal}) (gíria, se couber) → [Valeu !!!](${mantra}) · [Boa!!!](${boa}).

Não inverter: ufa **antes** de desatar é pose. Ufa **no lugar** de desatar é sopro vazio.

## 4. Valeu !!!

O sopro é permitido. O ofício continua na [vida](${vida}). [Valeu !!!](${mantra}) **depois** do Ufa!!! — não em vez do Ufa!!!.

## Status

**Aprovado** — **Ufa!!!** fichada: sopro de [alívio](${alivio}); locução **que alívio**; fecho do cluster [desatar o nó](${desatarNo}).

[▶ Palavras](${hub}) · [▶ Alívio](${alivio}) · [▶ Desatar o nó](${desatarNo}) · [▶ Boa!!!](${boa}) · [▶ Valeu !!!](${mantra}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Field: **replace aff with ufa**. Brazilian **Ufa!!!** (phew) — the puff of [alívio](${alivio}) (relief). Included phrase: **que alívio**. After [desatar o nó](${desatarNo}). Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Cry | **Ufa!!!** |
| Phrase | **que alívio** — names the puff |
| Word | [alívio](${alivio}) — *levis*; ufa is the air |
| Date | ${inspected} |

**Verdict:** puff + name. Then [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Alívio](${alivio}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Pedido: **cambiar aff por ufa**. **¡Ufa!!!** — el soplo de [alívio](${alivio}). Frase incluida: **que alívio**. Después de [desatar o nó](${desatarNo}). Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Grito | **¡Ufa!!!** |
| Frase | **que alívio** — nombra el soplo |
| Palabra | [alívio](${alivio}) — *levis*; ufa es el aire |
| Fecha | ${inspected} |

**Veredicto:** soplo + nombre. Luego [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Alívio](${alivio}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildUfaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildUfaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-ufa', 178);
  return makePalavra({
    title: 'Inspeção: Ufa!!! — o sopro, que alívio',
    titleEn: 'Inspection: Ufa!!! — the puff, que alívio',
    titleEs: 'Inspección: ¡Ufa!!! — el soplo, que alívio',
    excerpt:
      'Palavras: Ufa!!! — sopro de alívio; locução que alívio; vocábulo alívio; Valeu !!!',
    excerptEn:
      'Words: Ufa!!! — puff of relief; phrase que alívio; word alívio; Valeu !!!',
    excerptEs:
      'Palabras: ¡Ufa!!! — soplo de alivio; locución que alívio; vocablo alívio; ¡Valeu !!!',
    slug: 'inspecao-palavra-ufa',
    date: '2026-08-23T13:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Ufa!!! · que alívio',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildUfaPost, buildUfaBodies };
