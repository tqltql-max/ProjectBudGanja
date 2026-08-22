'use strict';

/**
 * Inspeção Palavras · lemniscata
 * Eixos: lat. lemniscus «fita» · curva em 8 · ≠ ∞ como eternidade ·
 * OCR lemeniscata · posturas em pé × deitado · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/lemniscata-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Lemniscata';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Lemniscate';
const WIKI_INF = 'https://en.wikipedia.org/wiki/Infinity_symbol';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/lemniscus';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 360) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildLemniscataBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-lemniscata.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const emPeDeitado = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[lemniscata](${self})** — a **curva em forma de fita** (oito / ∞). Pedido de campo depois de [elo de ligação](${eloLigacao}): o **nome** da figura. O vocábulo não é o símbolo do infinito nem o conceito de eternidade. É a **peça gráfica e geométrica**. As duas posturas — [em pé e deitado](${emPeDeitado}) — ficam na expressão; a vertical sozinha em [em pé](${emPe}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Lemniscata](${WIKI}), [Lemniscate](${WIKI_EN}), [infinity symbol](${WIKI_INF}), lat. [lemniscus](${WIKT_LAT}). **Ficha ≠ aula de curvas algébricas, ≠ misticismo, ≠ protocolo clínico.** OCR da [aula 8](${aula8}): *lemeniscata* / *lemenescata* → lema **lemniscata**. Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *lemeniscata* / *lemenescata* / *lemniscate* / *oito deitado* → **lemniscata**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **lemniscata** |
| Classe | Substantivo feminino |
| Étimo | lat. *lemniscus* «fita / fita de prémio» ← gr. λημνίσκος *lēmnískos* «fitinha» — confiança: **alta** |
| Par EN | *lemniscate* |
| Tipo BudGanja | Palavra — curva × fita × ≠ eternidade |
| Não é | conceito *infinito* · [nó](${no}) · dose · [tudo](${tudo}) |
| Posturas | [em pé](${emPe}) · [em pé e deitado](${emPeDeitado}) |
| Cruzamento | [elo de ligação](${eloLigacao}) |
| Fonte | [Lemniscata](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome** da curva que parece uma fita atada — dois laços e um encontro. Wallis (1655) desenhou o **glifo** ∞; Bernoulli (1694) estudou uma **curva** com esse ar. O lab **não funde** glifo, curva e eternidade.

## 2. Três objectos (não misturar)

| Forma | Ofício | Confiança |
|-------|--------|-----------|
| **Lemniscata** (esta ficha) | Nome da curva / da figura em fita | Alta |
| **∞ glifo** | Símbolo do infinito (Wallis) | Alta no **nome** do sinal; outro ofício |
| **Infinito** (conceito) | Sem-fim matemático | Alta noutro mapa — [tudo](${tudo}) avisa: não cabe numa ficha |
| **Lemniscata de Bernoulli** | Curva algébrica específica (1694) | Alta como **espécie**; não é toda a figura pop |
| **[Nó](${no})** | Cruzamento que **aperta** | Alta — o encontro da lemniscata **passa**, não prende |

**H1:** *lemniscata* = fita (λημνίσκος), não «eternidade».  
**H2:** o oito deitado **parece** ∞; parecer ≠ ser o conceito.  
**H3:** OCR *lemeniscata* é falha de legenda, não variante culta.

## 3. Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Em pé](${emPe}) | A postura **vertical** — o oito erguido |
| [Em pé e deitado](${emPeDeitado}) | As **duas posturas** da mesma figura (*bodiado* → deitado) |
| [Elo de ligação](${eloLigacao}) | O **cruzamento** das voltas |
| [Cinta](${cinta}) | Fita de ofício das mãos; *lemniscus* é fita de nome |
| [Sinal](${sinal}) · [pattern](${pattern}) | A marca ∞; o molde da curva |
| [Endocanabinoidoma](${ecbome}) · [aula 8](${aula8}) · [UNIFESP](${unifesp}) | Analogia de Kassia: em pé = comunicação — **não** prova |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | λημνίσκος → *lemniscus* → lemniscata |
| [Gesto](${gesto}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) | Rodar a figura sem slogan |

## Hipóteses (síntese)

**H1:** objecto = a curva-fita.  
**H2:** glifo ∞, curva de Bernoulli e conceito *infinito* = três mapas.  
**H3:** posturas = [em pé](${emPe}) / [em pé e deitado](${emPeDeitado}); cruzamento = [elo de ligação](${eloLigacao}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não demonstra equações nem compactação.  
- Não é ficha do SEC — analogia na aula, mapa em [endocanabinoidoma](${ecbome}).  
- Fita de prémio romana (*lemniscus*) ≠ [cinta](${cinta}) de cultivo.

## Status

**Aprovado** — **lemniscata** fichada como nome da curva-fita; distinta do conceito de infinito; OCR endereçado; posturas em [em pé](${emPe}) / [em pé e deitado](${emPeDeitado}).

[▶ Palavras](${hub}) · [▶ Em pé](${emPe}) · [▶ Em pé e deitado](${emPeDeitado}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **[lemniscata](${self})** — the **ribbon-shaped curve** (figure-eight / ∞ look). Not eternity. Postures: [em pé](${emPe}) / [em pé e deitado](${emPeDeitado}). Crossing: [elo de ligação](${eloLigacao}). Close: [Valeu !!!](${mantra}).

> Sources: [Lemniscate](${WIKI_EN}), [lemniscus](${WIKT_LAT}). OCR *lemeniscata* → **lemniscata**.

## Status

**Approved** — curve named; glyph, Bernoulli curve and infinity-concept stay apart.

[▶ Words](${hub}) · [▶ Standing](${emPe}) · [▶ Standing and lying](${emPeDeitado}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**[lemniscata](${self})** — la **curva en forma de cinta** (ocho / ∞). No es eternidad. Posturas: [em pé](${emPe}) / [em pé e deitado](${emPeDeitado}). Cruce: [elo de ligação](${eloLigacao}). Cierre: [¡Valeu !!!](${mantra}).

> Fuentes: [Lemniscata](${WIKI}), [lemniscus](${WIKT_LAT}). OCR *lemeniscata* → **lemniscata**.

## Estado

**Aprobada** — curva nombrada; glifo, curva de Bernoulli y concepto *infinito* quedan aparte.

[▶ Palabras](${hub}) · [▶ De pie](${emPe}) · [▶ De pie y acostada](${emPeDeitado}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildLemniscataPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLemniscataBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-lemniscata', 204);
  return makePalavra({
    title: 'Inspeção: Lemniscata — a fita em oito, não a eternidade',
    titleEn: 'Inspection: Lemniscate — the ribbon in an eight, not eternity',
    titleEs: 'Inspección: Lemniscata — la cinta en ocho, no la eternidad',
    excerpt:
      'Palavras: lemniscata — curva-fita (λημνίσκος); ≠ infinito-conceito; OCR lemeniscata; posturas em pé × deitado; Valeu !!!',
    excerptEn:
      'Words: lemniscata — ribbon-curve (λημνίσκος); ≠ infinity-as-concept; OCR lemeniscata; standing × lying; Valeu !!!',
    excerptEs:
      'Palabras: lemniscata — curva-cinta (λημνίσκος); ≠ infinito-concepto; OCR lemeniscata; de pie × acostada; ¡Valeu !!!',
    slug: 'inspecao-palavra-lemniscata',
    date: '2026-08-22T06:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Lemniscata · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildLemniscataPost, buildLemniscataBodies };
