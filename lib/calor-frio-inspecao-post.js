'use strict';

/**
 * Inspeção Palavras · calor × frio
 * Lat. calor / calēre × frīgus / frīgidus — qualidade térmica, não fonte nem estação.
 * Par: fogo/sol (fonte) × gelo/inverno (estado/estação).
 * ≠ caloria (unidade); ≠ incêndio (evento).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/calor-frio-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/calor';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildCalorFrioBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const calc = '/calculadoras/cultivo-lab.html';
  const self = '/posts/post-inspecao-palavra-calor-frio.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const incendio = '/posts/post-inspecao-palavra-incendio.html';
  const tenda = '/posts/post-inspecao-palavra-tenda.html';
  const exaustor = '/posts/post-inspecao-palavra-exaustor.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const neve = '/posts/post-inspecao-palavra-neve.html';
  const pipoca = '/posts/post-inspecao-palavra-pipoca.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const elza = '/posts/post-inspecao-desenho-elza-frozen.html';
  const wikiFrio = 'https://pt.wiktionary.org/wiki/frio';
  const wikiLatCalor = 'https://en.wiktionary.org/wiki/calor#Latin';
  const wikiLatFrigus = 'https://en.wiktionary.org/wiki/frigus#Latin';
  const wikiCaloria = 'https://pt.wiktionary.org/wiki/caloria';

  const body = `## Escopo

Inspeção editorial do par **[calor](${self})** × **[frio](${self})** — as **qualidades térmicas** do português (lat. *calor* / *calēre* «estar quente» × *frīgus* / *frīgidus* «frio, geada»). Pedido de campo: *calor/frio*. Esta ficha cobre o **étimo**, a **distinção com as fontes e os estados** ([fogo](${fogo}), [sol](${sol}), [gelo](${gelo}), [inverno](${inverno})), o ofício da [tenda](${tenda}) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · calor](${WIKI}), [frio](${wikiFrio}), [calor (lat.)](${wikiLatCalor}), [frīgus](${wikiLatFrigus}), [caloria](${wikiCaloria}). **Ficha ≠ termómetro clínico, ≠ manual de climatização, ≠ dieta.** Tom: medir; [verdade](${verdade}) do grau, não da pose.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Par | **calor** × **frio** |
| Classe | Substantivos (também adj. *frio* / *quente*) |
| Étimo (trabalho) | Lat. *calor, calōris* ← *calēre*; lat. *frīgus* / *frīgidus* → PT *frio* — confiança **alta** |
| Família calor | *quente* · *aquecer* · *cálido* · *caldeira* · *caloria* (prima — ofício distinto) |
| Família frio | *esfriar* · *friagem* · *refrigerar* · *frigorífico* — **não** *gelo* (*gelū* / *glaciēs*) |
| Tipo BudGanja | Palavra — qualidade térmica × par de ofício |
| Elo fonte | [fogo](${fogo}) · [sol](${sol}) · [luz](${luz}) — quem **produz**; calor/frio é o que se **sente / mede** |
| Elo estado | [gelo](${gelo}) · [neve](${neve}) · [água](${agua}) — matéria; frio não é gelo |
| Elo estação | [inverno](${inverno}) · [Bom dia, Inverno](${bomDia}) — época; frio não é estação |
| Elo tenda | [tenda](${tenda}) · [exaustor](${exaustor}) · [incêndio](${incendio}) · [Super Calc](${calc}) (VPD) |
| Elo ofício | [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Fonte | [calor](${WIKI}) · [frio](${wikiFrio}) |
| Data | ${inspected} |

**Objeto:** o par que nomeia o **grau**. Sem ele, [fogo](${fogo}) fica só chama e [gelo](${gelo}) só bloco. O laboratório inspeciona **quente e frio no mesmo termómetro**.

## 2. Hipóteses e método

**H1:** *calor* herda lat. *calor* ← *calēre* — «estar quente»; alta confiança.  
**H2:** *frio* herda lat. *frīgidus* / *frīgus* — qualidade e, no PT, também substantivo («o frio»).  
**H3:** *quente* (adj.) é o par vivo de *frio* (adj.); *calor* é o substantivo âncora do lado quente.  
**H4:** *gelo* / *gelar* vêm de outra raiz (*gelū*, *glaciēs*) — estado da [água](${agua}), não sinónimo de frio.  
**H5:** *caloria* partilha o étimo *calor* e **não** partilha o ofício: unidade de energia (comida / física), não a qualidade que a [tenda](${tenda}) acumula.

Passos: étimo → o que **não** é → ofícios lab → limites.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **[Fogo](${fogo})** | «Calor = fogo» | Fonte / elemento (*focus*); calor é o **efeito** medido |
| **[Sol](${sol})** | «Calor = astro» | Fonte natural; a qualidade chega depois da luz |
| **[Incêndio](${incendio})** | «Muito calor» | Evento descontrolado — não o vocábulo do grau |
| **[Gelo](${gelo})** | «Frio = gelo» | Água sólida; frio existe sem bloco |
| **[Inverno](${inverno})** | «Frio = estação» | Época; há inverno sem geada e frio em junho |
| **Caloria** | «Mesma palavra» | Prima etimológica; unidade — **não** esta ficha |
| **[Elza](${elza})** | Gelo de desenho | Artes; o ofício térmico da tenda não é o palácio |

## 4. Ofícios no laboratório

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **1. Qualidade** | Nomear o grau (quente / frio) | Confundir com fonte ou estação |
| **2. [Tenda](${tenda})** | Recinto que **fecha** calor; [exaustor](${exaustor}) tira | Tenda ≠ cofre; calor fechado é [risco](${risco}) |
| **3. Medida** | VPD / temperatura na [Super Calc](${calc}); [cultivo](${cultivo}) | «Está quente» sem número |
| **4. Transformação** | [Pipoca](${pipoca}) — milho→calor→estouro | Calor como magia, sem ofício |
| **5. Invernagem** | Cumprimentar o [frio](${self}) em [Bom dia, Inverno](${bomDia}) | Romantizar o isolamento; fundir com [gelo](${gelo}) |

**H6:** no indoor, a [luz](${luz}) que não se ventila vira calor; calor que não se nomeia vira [incêndio](${incendio}) no mapa. O [exaustor](${exaustor}) é o gesto de **esfriar com ofício**.

## 5. Par — dois pólos, um termómetro

| Peça | Gesto | Mau uso |
|------|-------|---------|
| **calor** | Nomear o quente; aquecer com medida | «Quanto mais, melhor»; ignorar a tenda |
| **frio** | Nomear o frio; esfriar / ventilar | «Frio = gelo»; parar o cultivo por medo da estação |
| **[água](${agua})** | Media: ferve e congela | Usar água como sinónimo de frio |

**Leitura:** o par **não** é guerra de elementos. É o mesmo eixo com dois nomes. [Valeu !!!](${mantra}) mede os dois.

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| Nomear | «Que calor» / «que frio» | Grau da tenda, do solo, da estufa |
| Alertar | Queimadura / hipotermia (clínica **fora** desta ficha) | [Risco](${risco}) de calor fechado × frio que trava a raiz |
| Transformar | Cozinha, [pipoca](${pipoca}), cura | Decarboxilação é química — **não** fundir aqui |
| Acolher | [Inverno](${inverno}) como época | [Bom dia, Inverno](${bomDia}) cumprimenta o frio sem pose |

## 7. Valeu !!!

O melhor grau **hoje** — o que se **mede**, não o que se aguentar. Calor sem [exaustor](${exaustor}) é [risco](${risco}); frio sem [verdade](${verdade}) vira desculpa para não ficar. [Valeu !!!](${mantra}) com o termómetro à vista.

## 8. Estado

**Aprovado** — calor × frio fichados como **qualidade térmica**; elos [fogo](${fogo}), [gelo](${gelo}), [tenda](${tenda}), [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Fogo](${fogo}) · [▶ Gelo](${gelo}) · [▶ Tenda](${tenda}) · [▶ Inverno](${inverno}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the pair **[calor](${self})** × **[frio](${self})** — Portuguese **thermal qualities** (Lat. *calor* / *calēre* × *frīgus* / *frīgidus*). Field request: *calor/frio*. Covers etymon, the cut against **sources and states** ([fogo](${fogo}), [sol](${sol}), [gelo](${gelo}), [inverno](${inverno})), tent craft, and [Valeu !!!](${mantra}).

> Independent audit. **Sheet ≠ clinical thermometer, HVAC manual, or diet.** Measure the degree; do not pose.

## Object

| Field | Value |
|-------|-------|
| Pair | **calor** × **frio** |
| Etymon | Lat. *calor* ← *calēre*; Lat. *frīgidus* / *frīgus* → PT *frio* — **high** confidence |
| Not | [fogo](${fogo}) (source) · [gelo](${gelo}) (ice, other root) · [inverno](${inverno}) (season) · *caloria* (unit) |
| Tent | [tenda](${tenda}) · [exaustor](${exaustor}) · [Super Calc](${calc}) (VPD) |
| Date | ${inspected} |

**Object:** the pair that names the **degree**. Fire is the source; ice is solid water; winter is a season. Heat and cold are what you **feel and measure**.

## Offices (keep apart)

1. **Quality** — name hot / cold; do not mix with source or season.  
2. **[Tent](${tenda})** — closes heat; [exaustor](${exaustor}) takes it out; closed heat is [risk](${risco}).  
3. **Measure** — VPD / temperature in [Super Calc](${calc}); «it's hot» without a number is pose.  
4. **Change** — [pipoca](${pipoca}) needs heat with craft.  
5. **Overwintering** — [Bom dia, Inverno](${bomDia}) greets the cold; [Elza](${elza}) is Arts, not the tent.

**Pair:** one thermometer, two names. [Água](${agua}) boils and freezes — it is not a synonym of cold.

**Verdict:** the best degree is the one you **measure**. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Fogo](${fogo}) · [▶ Gelo](${gelo}) · [▶ Tenda](${tenda}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del par **[calor](${self})** × **[frio](${self})** — **cualidades térmicas** del portugués (lat. *calor* / *calēre* × *frīgus* / *frīgidus*). Pedido: *calor/frio*. Cubre el étimo, el corte con **fuentes y estados** ([fogo](${fogo}), [sol](${sol}), [gelo](${gelo}), [inverno](${inverno})), el oficio de la [tenda](${tenda}) y [¡Valeu !!!](${mantra}).

> Auditoría independiente. **Ficha ≠ termómetro clínico, manual de clima ni dieta.** Medir el grado; no posar.

## Objeto

| Campo | Valor |
|-------|-------|
| Par | **calor** × **frio** |
| Étimo | Lat. *calor* ← *calēre*; lat. *frīgidus* / *frīgus* → PT *frio* — confianza **alta** |
| No es | [fogo](${fogo}) (fuente) · [gelo](${gelo}) (hielo, otra raíz) · [inverno](${inverno}) (estación) · *caloria* (unidad) |
| Carpa | [tenda](${tenda}) · [exaustor](${exaustor}) · [Super Calc](${calc}) (VPD) |
| Fecha | ${inspected} |

**Objeto:** el par que nombra el **grado**. El fuego es la fuente; el hielo es agua sólida; el invierno es época. Calor y frío se **sienten y se miden**.

## Oficios (separar)

1. **Cualidad** — nombrar lo caliente / lo frío; no mezclar con fuente ni estación.  
2. **[Tenda](${tenda})** — cierra calor; el [exaustor](${exaustor}) lo saca; calor cerrado es [riesgo](${risco}).  
3. **Medida** — VPD / temperatura en [Super Calc](${calc}); «está caliente» sin número es pose.  
4. **Cambio** — [pipoca](${pipoca}) pide calor con oficio.  
5. **Invernada** — [Bom dia, Inverno](${bomDia}) saluda el frío; [Elza](${elza}) es Artes, no la carpa.

**Par:** un termómetro, dos nombres. El [agua](${agua}) hierve y se congela — no es sinónimo de frío.

**Veredicto:** el mejor grado es el que se **mide**. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Fogo](${fogo}) · [▶ Gelo](${gelo}) · [▶ Tenda](${tenda}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildCalorFrioPost() {
  const { body, contentEn, contentEs, wiki } = buildCalorFrioBodies();
  const seriesOrder = pickOrder('inspecao-palavra-calor-frio', 260);
  return makePalavra({
    title: 'Inspeção: Calor × Frio — qualidade térmica, não fogo nem gelo',
    titleEn: 'Inspection: Calor × Frio — thermal quality, not fire or ice',
    titleEs: 'Inspección: Calor × Frio — cualidad térmica, no fuego ni hielo',
    excerpt:
      'Palavras: «calor» × «frio» (lat. calor / frīgus) — grau medido; ≠ fogo ≠ gelo ≠ inverno ≠ caloria; Valeu !!!',
    excerptEn:
      'Words: “calor” × “frio” (Lat. calor / frīgus) — measured degree; ≠ fire ≠ ice ≠ winter ≠ calorie; Valeu !!!',
    excerptEs:
      'Palabras: «calor» × «frio» (lat. calor / frīgus) — grado medido; ≠ fuego ≠ hielo ≠ invierno ≠ caloria; ¡Valeu !!!',
    slug: 'inspecao-palavra-calor-frio',
    date: '2026-08-23T06:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Calor × Frio · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCalorFrioPost, buildCalorFrioBodies };
