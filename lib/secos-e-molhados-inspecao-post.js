'use strict';

/**
 * Inspeção Expressões · secos e molhados
 * Pedido de campo: seos e molhados → lapso seos → secos.
 * Locução do armazém BR (mercadoria seca × molhada) e, por extensão, mistura.
 * ≠ banda Secos & Molhados (Artes, ficha própria se chegar).
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/secos-e-molhados-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/seco';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Chegou seos.
A boca comeu o c.
O armazém já sabia o nome:
secos e molhados.

De um lado o saco — farinha, feijão, o que não pinga.
Do outro o vidro — azeite, vinagre, o que molha a prateleira.
A loja junta os dois
sem fingir que são a mesma coisa.

No laboratório o Super Solo pede o mesmo ofício:
mistura o seco primeiro;
só depois a água.
Curar é secar com tempo.
Lavar é molhar com gesto.

Não é a banda.
Não é o armazém como nostalgia.
É o par que não se funde no mesmo saco.

Valeu !!!
com a prateleira certa.`;
}

function poemEn() {
  return `It arrived as seos.
The mouth ate the c.
The warehouse already knew the name:
secos e molhados.

On one side the sack — flour, beans, what does not drip.
On the other the bottle — oil, vinegar, what wets the shelf.
The shop holds both
without pretending they are one.

In the lab Super Solo asks the same craft:
mix the dry first;
only then the water.
Curing is drying with time.
Washing is wetting with a gesture.

It is not the band.
It is not the shop as nostalgia.
It is the pair that does not fuse in the same sack.

Valeu !!!
with the right shelf.`;
}

function poemEs() {
  return `Llegó seos.
La boca se comió la c.
El almacén ya sabía el nombre:
secos e molhados.

De un lado el saco — harina, frijol, lo que no gotea.
Del otro el vidrio — aceite, vinagre, lo que moja el estante.
La tienda junta los dos
sin fingir que son lo mismo.

En el laboratorio el Super Solo pide el mismo oficio:
mezcla lo seco primero;
solo después el agua.
Curar es secar con tiempo.
Lavar es mojar con gesto.

No es la banda.
No es el almacén como nostalgia.
Es el par que no se funde en el mismo saco.

Valeu !!!
con el estante cierto.`;
}

function buildSecosEMolhadosBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-expressao-secos-e-molhados.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const tenda = '/posts/post-inspecao-palavra-tenda.html';
  const superSolo = '/calculadoras/super-solo.html';
  const cultivo = '/guia/cultivo-basico.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiMolhado = 'https://pt.wiktionary.org/wiki/molhado';
  const wikiMolhar = 'https://pt.wiktionary.org/wiki/molhar';
  const wikiSiccus = 'https://en.wiktionary.org/wiki/siccus#Latin';
  const wikiBanda = 'https://pt.wikipedia.org/wiki/Secos_%26_Molhados';

  const body = `## Escopo

Inspeção editorial da expressão **«[secos e molhados](${self})»** — locução do **armazém** brasileiro (mercadoria **seca** × **molhada**) e, por extensão, da **mistura** que junta os dois ofícios sem os fundir. Pedido de campo: *seos e molhados*. O lab lê o lapso **seos** → **secos** (a boca comeu o *c*) e ficheia a forma canónica.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · seco](${WIKI}), [molhado](${wikiMolhado}), [molhar](${wikiMolhar}), [siccus](${wikiSiccus}). **Ficha ≠ catálogo de mercearia, ≠ bula, ≠ a banda [Secos & Molhados](${wikiBanda})** (Artes — ficha própria se chegar). Tom: [gesto](${gesto}) de prateleira; [verdade](${verdade}) do estado (seco × molhado).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **secos e molhados** |
| Gatilho | *seos e molhados* → **secos** (lapso) |
| Classe | Locução (também: par adj. *seco* × *molhado*) |
| Étimo (trabalho) | Lat. *siccus* «seco» → PT *seco*; *molhar* ← lat. tardio *molliare* / *mollis* «mole, húmido» → *molhado* — confiança **alta** |
| Ofício histórico | Armazém / venda que guarda **secos** (saco, grão, farinha) e **molhados** (vidro, azeite, vinagre, conserva) |
| Extensão | Mistura; «de tudo um pouco» — **sem** apagar a distinção |
| Tipo BudGanja | Expressão — prateleira × estado da matéria |
| Elo par térmico | [calor × frio](${calorFrio}) — grau do ar; aqui é **humidade / estado** |
| Elo água | [água](${agua}) · [gelo](${gelo}) · [lavar](${lavar}) · [curar](${curar}) |
| Elo cultivo | [Super Solo](${superSolo}) · [tenda](${tenda}) · [cultivo](${cultivo}) · [objetos](${objetos}) |
| Fonte | [seco](${WIKI}) · [molhado](${wikiMolhado}) |
| Data | ${inspected} |

**Objecto:** o nome da loja que **não** mistura o saco com o vidro no mesmo copo — junta-os **na mesma casa**. No laboratório: secar e molhar são [gestos](${gesto}) distintos.

## 2. Hipóteses e método

**H1:** *seos* não é lema; é orelha / teclado. A forma canónica é **secos**.  
**H2:** *seco* < lat. *siccus* — alta confiança.  
**H3:** *molhado* é particípio de *molhar*; o par vivo é **seco × molhado** (estado), a locução **secos e molhados** é o **armazém** (e a mistura).  
**H4:** a banda *Secos & Molhados* **toma de empréstimo** o nome da loja; não é a origem da locução.  
**H5:** no cultivo, o ofício é o da loja antiga: **não** molhar o saco de amendment como se fosse chá.

Passos: lapso → étimo → loja → lab (Super Solo / cura / tenda) → limites.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **seos** | Palavra nova | Lapso de **secos** |
| **Loja** | Nostalgia de mercearia | Mapa: saco × vidro na mesma casa |
| **Mistura** | «Tudo junto» | Junto **com prateleira**; não fundido |
| **Banda** | A mesma ficha | Homónimo artístico — [Wikipedia](${wikiBanda}); **não** esta inspeção |
| **[Calor × frio](${calorFrio})** | O mesmo par | Temperatura ≠ humidade / estado |
| **[Gelo](${gelo})** | Molhado congelado | Estado da [água](${agua}); outra raiz |

## 4. Ofícios no laboratório

| Ofício | Seco | Molhado |
|--------|------|---------|
| **[Super Solo](${superSolo})** | Amendments secos misturados **antes** | Umedecer **depois** — não o contrário |
| **[Curar](${curar})** | Secar / conservar a colheita | ≠ molhar de novo sem ofício |
| **[Lavar](${lavar})** | O que se tira com água | Gesto de molhar com limite |
| **[Tenda](${tenda})** | Folha que precisa secar | Humidade fechada = outro [risco](/posts/post-inspecao-palavra-risco.html) |
| **[Água](${agua})** | Ausência medida | Presença medida — o molhado **é** água em ofício |

**H6:** secos e molhados no lab **não** é «um pouco de tudo» sem mapa. É o armazém com **duas colunas**.

## 5. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| Nomear a loja | Armazém de secos e molhados | Duas prateleiras: saco × vidro |
| Nomear a mistura | «Tem de tudo» | Mistura **depois** de separar o estado |
| Corrigir o lapso | *seos* → secos | Guardar o gatilho; não promover a grafia |
| Não fundir | Banda ≠ mercearia | Artes ≠ esta ficha |

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 6. Valeu !!!

O melhor da loja **hoje** é a prateleira certa: o seco no saco, o molhado no vidro, a [água](${agua}) com [gesto](${gesto}). [Valeu !!!](${mantra}) — *seos* endereçado, mistura com ofício.

## 7. Estado

**Aprovada** — **secos e molhados** fichada; lapso *seos* documentado; elos [água](${agua}), [curar](${curar}), [Super Solo](${superSolo}), [calor × frio](${calorFrio}), [Valeu !!!](${mantra}). Sem afiliação à banda.

[▶ Expressões](${hub}) · [▶ Água](${agua}) · [▶ Curar](${curar}) · [▶ Calor × frio](${calorFrio}) · [▶ Super Solo](${superSolo}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[secos e molhados](${self})”** — the old **general store** locution (dry goods × wet goods) and, by extension, a mix that **holds both without fusing them**. Field request: *seos e molhados*. The lab reads the slip **seos** → **secos**.

> Independent audit. **Sheet ≠ grocery catalogue, ≠ the band [Secos & Molhados](${wikiBanda})** (Arts — own sheet if it comes).

## Object

| Field | Value |
|-------|-------|
| Saying | **secos e molhados** |
| Slip | *seos* → **secos** |
| Etymon | Lat. *siccus* → *seco*; *molhar* ← *molliare* / *mollis* → *molhado* — **high** confidence |
| Shop | sack (grain, flour) × bottle (oil, vinegar) in the **same house** |
| Lab | [Super Solo](${superSolo}): dry mix first, water after; [curar](${curar}) vs [lavar](${lavar}) |
| Sister pair | [calor × frio](${calorFrio}) is temperature; this is **moisture / state** |
| Date | ${inspected} |

**H1:** *seos* is ear/keyboard, not a lemma.  
**H2:** the band borrowed the shop’s name; it is not the origin.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** the right shelf. [Valeu !!!](${mantra}).

[▶ Sayings](${hub}) · [▶ Água](${agua}) · [▶ Curar](${curar}) · [▶ Calor × frio](${calorFrio}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[secos e molhados](${self})»** — locución del **almacén** (mercancía seca × mojada) y, por extensión, mezcla que **junta sin fundir**. Pedido: *seos e molhados*. El lab lee el lapsus **seos** → **secos**.

> Auditoría independiente. **Ficha ≠ catálogo de ultramarinos, ≠ la banda [Secos & Molhados](${wikiBanda})** (Artes — ficha propia si llega).

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **secos e molhados** |
| Lapsus | *seos* → **secos** |
| Étimo | Lat. *siccus* → *seco*; *molhar* ← *molliare* / *mollis* → *molhado* — confianza **alta** |
| Tienda | saco (grano, harina) × vidrio (aceite, vinagre) en la **misma casa** |
| Lab | [Super Solo](${superSolo}): seco primero, agua después; [curar](${curar}) vs [lavar](${lavar}) |
| Par hermano | [calor × frio](${calorFrio}) es temperatura; aquí es **humedad / estado** |
| Fecha | ${inspected} |

**H1:** *seos* es oído/teclado, no lema.  
**H2:** la banda toma el nombre de la tienda; no es el origen.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** el estante cierto. [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Água](${agua}) · [▶ Curar](${curar}) · [▶ Calor × frio](${calorFrio}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildSecosEMolhadosPost() {
  const { body, contentEn, contentEs, wiki } = buildSecosEMolhadosBodies();
  const seriesOrder = pickOrder('inspecao-expressao-secos-e-molhados', 29);
  return expressaoPost({
    title: 'Inspeção: secos e molhados — o armazém, o lapso seos e as duas prateleiras',
    titleEn: 'Inspection: secos e molhados — the store, the seos slip, and two shelves',
    titleEs: 'Inspección: secos e molhados — el almacén, el lapsus seos y dos estantes',
    excerpt:
      'Expressões: «secos e molhados» (siccus × molliare) — seos→secos; armazém saco×vidro; ≠ banda; Valeu !!!',
    excerptEn:
      'Sayings: “secos e molhados” (siccus × molliare) — seos→secos; sack×bottle store; ≠ the band; Valeu !!!',
    excerptEs:
      'Dichos: «secos e molhados» (siccus × molliare) — seos→secos; almacén saco×vidrio; ≠ la banda; ¡Valeu !!!',
    slug: 'inspecao-expressao-secos-e-molhados',
    date: '2026-08-23T06:55:00.000Z',
    seriesOrder,
    seriesLabel: 'secos e molhados · expressão',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSecosEMolhadosPost,
  buildSecosEMolhadosBodies,
  poemPt,
  poemEn,
  poemEs
};
