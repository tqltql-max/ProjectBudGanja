'use strict';

/**
 * Inspeção Palavras · deplorar
 * Lat. dēplōrāre ← dē- + plōrāre — lastimar / condenar o que se perdeu ou é indigno.
 * Par de ofício com vomitar: chorar o que ficou × largar o que não fica.
 * ≠ náusea clínica; ≠ mesmo étimo de vomitare.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/deplorar-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/deplorar';

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

function buildDeplorarBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-deplorar.html';
  const vomitar = '/posts/post-inspecao-palavra-vomitar.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiLa = 'https://en.wiktionary.org/wiki/deploro#Latin';
  const wikiPloro = 'https://en.wiktionary.org/wiki/ploro#Latin';
  const wikiEn = 'https://en.wiktionary.org/wiki/deplore';
  const wikiAdj = 'https://pt.wiktionary.org/wiki/deplor%C3%A1vel';

  const body = `## Escopo

Inspeção editorial da palavra **[deplorar](${self})** — verbo (lat. *dēplōrāre* ← *dē-* + *plōrāre* «chorar, clamar»). Pedido de campo: relacionar com **[vomitar](${vomitar})**. Aqui o gesto é **lastimar / condenar o que se perdeu ou é indigno** — luto × juízo — **sem** fundir com êmese nem com o étimo de *vomitare*.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · deplorar](${WIKI}), [dēplōrō](${wikiLa}), [plōrō](${wikiPloro}), [deplore](${wikiEn}), [deplorável](${wikiAdj}). **Ficha ≠ protocolo clínico, ≠ púlpito, ≠ licença para despejar juízo no rasto.** Tom: literacia; [respeito](${respeito}) ao luto e ao [gesto](${gesto}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **deplorar** |
| Classe | Verbo transitivo |
| Étimo (trabalho) | Lat. *plōrāre* «chorar, clamar» → *dēplōrāre* «chorar de todo / dar por perdido» → PT **deplorar** — confiança **alta** |
| Família | *deplorável* · *deploração* · *implorar* · *explorar* (primo *ex-* + *plōrāre*) · EN *deplore* · ES *deplorar* |
| Tipo BudGanja | Palavra — luto × juízo × par [vomitar](${vomitar}) |
| Elo par | [vomitar](${vomitar}) — largar o que não fica (corpo / rasto); **não** a mesma raiz |
| Elo tríade | [tónos](${tonos}) (segurar) · [vomitar](${vomitar}) (largar) · [commitar](${commitar}) (gravar) — deplorar **não** substitui o largo |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [Valeu !!!](${mantra}) |
| Fonte | [deplorar](${WIKI}) |
| Data | ${inspected} |

**Objeto:** o vocábulo de **chorar o que já não se guarda** ou **condenar o que ficou indigno**. No lab: lastimar **não** é filtrar; filtrar é [vomitar](${vomitar}) o que não deve ir ao [commitar](${commitar}).

## 2. Hipóteses e método

**H1:** *deplorar* no PT é herdado latino (*dēplōrāre*) — não gíria recente.  
**H2:** *plōrāre* é clamor / choro; o prefixo *dē-* intensifica («de todo») e, em latim clássico, também «dar por perdido».  
**H3:** o par com [vomitar](${vomitar}) é de **ofício**, não de étimo: uma boca larga matéria; a outra clama o dano.  
**H4:** *deplorável* é o adjectivo irmão — qualidade do objecto lastimado; ≠ «dá náusea» como diagnóstico.  
**H5:** *implorar* e *explorar* partilham *plōrāre*; **não** partilham *vomere*.

Passos: étimo → ofícios (luto / juízo / lab) → par vomitar → limites.

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **1. Luto** | Lastimar o que se perdeu | Protocolo de luto nesta ficha |
| **2. Juízo** | Condenar o indigno com [verdade](${verdade}) | Púlpito / despejo moral no rasto |
| **3. Par [vomitar](${vomitar})** | Náusea moral *parece* êmese | Mesma raiz; êmese clínica; «deplorável = vómito» |
| **4. Ofício lab** | Nomear o dano **depois** de filtrar | Substituir o largo por queixa: deplorar o ruído e [commitar](${commitar}) o mesmo ruído |

**H6:** [tónos](${tonos}) que não se nomeia vira explosão; explosão sem [vomitar](${vomitar}) vira [deplorar](${self}) em loop — lastima e guarda o veneno.

## 4. Par vomitar × deplorar

| Peça | Gesto | Mau uso |
|------|-------|---------|
| **[vomitar](${vomitar})** | Largar o que não fica | Dump / purga vazia / juízo vomitado |
| **[deplorar](${self})** | Lastimar ou condenar o que ficou / se perdeu | Queixa sem filtro; náusea colada a êmese |
| **[commitar](${commitar})** | Gravar o que fica | Commitar o lamento (ruído de púlpito) |

**Leitura:** as duas boca **rejeitam**. Só [vomitar](${vomitar}) **expulsa do rasto**. Deplorar pode ficar no texto como juízo útil — ou como veneno que ninguém largou.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Primo de vomitar** | Mesma família | Étimos distintos: *plōrāre* × *vomere* |
| **Náusea moral** | «Deplorável dá vontade de vomitar» | Metáfora; a ficha [vomitar](${vomitar}) é o verbo de largar |
| **Choro só** | Fraqueza | Clamor latino — *plōrāre* também é grito |
| **Explorar** | Outro mundo | Primo *ex-* + *plōrāre* (clamar para sondar) — **não** misturar nesta ficha |

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear o dano** | Luto, censura, pesar | Esta ficha |
| **Não confundir com êmese** | Corpo ≠ juízo | Elo nítido com [vomitar](${vomitar}) |
| **Filtrar antes** | Lastimar o que já saiu | [tónos](${tonos}) → [vomitar](${vomitar}) → [commitar](${commitar}); deplorar **depois**, se o dano merece nome |
| **Fechar** | Depois do clamor, o acto | [Valeu !!!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[vomitar](${vomitar})** | Par de ofício — largar ≠ lastimar |
| **[tónos](${tonos})** · **[commitar](${commitar})** | Tríade: tensão → filtro → rasto; deplorar não é o meio |
| [verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) | Juízo com método |
| [língua portuguesa](${lingua}) · [Valeu !!!](${mantra}) · [Guia](${guia}) · [Vida](${vida}) | Índice e fecho |

## Limites

- Não é aconselhamento médico, obstétrico ou psiquiátrico.  
- Não incentiva vómito, purga nem «limpeza» moral de marketing.  
- Não trata *deplorável* como sinónimo clínico de náusea.  
- Grafia *deplorar* = o objecto; *deplorável* = o adjectivo irmão.

## Veredicto

**Aprovado na série Palavras** — *deplorar* fichado como **lastimar / condenar** (luto × juízo); par [vomitar](${vomitar}) por ofício, **não** por étimo; tríade [tónos](${tonos}) · [vomitar](${vomitar}) · [commitar](${commitar}) intacta; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Vomitar](${vomitar}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[deplorar](${self})** (Lat. *dēplōrāre* ← *dē-* + *plōrāre*, to weep / cry out). Field request: relate it to **[vomitar](${vomitar})**. The gesture is **lament / censure what is lost or unworthy** — grief × judgement — without fusing it with emesis or with the etymon of *vomitare*.

> Independent audit. **Sheet ≠ clinical protocol, pulpit, or licence to dump judgement into the trace.**

## Object

| Field | Value |
|-------|-------|
| Word | **deplorar** |
| Etymon | Lat. *plōrāre* → *dēplōrāre* → PT **deplorar** — **high** confidence |
| Pair | [vomitar](${vomitar}) — release what must not stay; **not** the same root |
| Links | [tónos](${tonos}) · [commitar](${commitar}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Offices (keep apart)

1. **Grief** — lament what is lost; not a protocol here.  
2. **Judgement** — censure the unworthy with [truth](${verdade}); not a moral dump.  
3. **Pair with [vomitar](${vomitar})** — moral nausea *looks like* emesis; it is not the same etymon.  
4. **Lab office** — name the damage **after** filtering; do not replace [vomitar](${vomitar}) with complaint.

**Pair:** [vomitar](${vomitar}) expels from the trace; **deplorar** can stay as useful judgement — or as poison nobody released.

**Verdict:** lament is not the middle of the triad; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Vomitar](${vomitar}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[deplorar](${self})** (lat. *dēplōrāre* ← *dē-* + *plōrāre*, llorar / clamar). Pedido: relacionarlo con **[vomitar](${vomitar})**. El gesto es **lamentar / condenar lo perdido o indigno** — duelo × juicio — sin fusionarlo con emesis ni con el étimo de *vomitare*.

> Auditoría independiente. **Ficha ≠ protocolo clínico, púlpito ni licencia para volcar juicio en el rastro.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **deplorar** |
| Étimo | Lat. *plōrāre* → *dēplōrāre* → PT **deplorar** — confianza **alta** |
| Par | [vomitar](${vomitar}) — soltar lo que no queda; **no** la misma raíz |
| Vínculos | [tónos](${tonos}) · [commitar](${commitar}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Oficios (separar)

1. **Duelo** — lamentar lo perdido; no hay protocolo aquí.  
2. **Juicio** — condenar lo indigno con [verdad](${verdade}); no un volcado moral.  
3. **Par con [vomitar](${vomitar})** — la náusea moral *parece* emesis; no es el mismo étimo.  
4. **Oficio lab** — nombrar el daño **después** de filtrar; no sustituir [vomitar](${vomitar}) por queja.

**Par:** [vomitar](${vomitar}) expulsa del rastro; **deplorar** puede quedar como juicio útil — o como veneno que nadie soltó.

**Veredicto:** lamentar no es el medio de la tríada; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Vomitar](${vomitar}) · [▶ Tónos](${tonos}) · [▶ Commitar](${commitar}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildDeplorarPost() {
  const { body, contentEn, contentEs, wiki } = buildDeplorarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-deplorar', 244);
  return makePalavra({
    title: 'Inspeção: Deplorar — lastimar o dano; não é o mesmo que vomitar',
    titleEn: 'Inspection: Deplorar — lament the damage; it is not the same as vomitar',
    titleEs: 'Inspección: Deplorar — lamentar el daño; no es lo mismo que vomitar',
    excerpt:
      'Palavras: «deplorar» (lat. dēplōrāre ← plōrāre) — luto × juízo; par vomitar por ofício, não por étimo; Valeu !!!',
    excerptEn:
      'Words: “deplorar” (Lat. dēplōrāre ← plōrāre) — grief × judgement; pair with vomitar by office, not etymon; Valeu !!!',
    excerptEs:
      'Palabras: «deplorar» (lat. dēplōrāre ← plōrāre) — duelo × juicio; par con vomitar por oficio, no por étimo; ¡Valeu !!!',
    slug: 'inspecao-palavra-deplorar',
    date: '2026-08-23T04:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Deplorar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildDeplorarPost, buildDeplorarBodies };
