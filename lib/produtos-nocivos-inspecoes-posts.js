'use strict';

/**
 * Produtos nocivos — proteínas e matrizes industriais associadas a dano quando
 * o consumo é inadequado (caseína/leite, glúten/trigo).
 * Tipagem hub: 'derivado' (chip Produtos nocivos).
 */

function nocivoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || '/imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series,
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel,
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildCaseinaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const vaca = '/animais/vaca/';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';

  const body = `## Escopo

Inspeção editorial do **leite bovino** e da **caseína** — a proteína dominante do leite — como **produto nocivo ao organismo** quando o padrão de consumo, a genética da proteína e o ultraprocessamento lácteo se cruzam de forma desfavorável. Cruza com a ficha da [vaca / boi](${vaca}) e com a inspeção-irmã do [glúten](${gluten}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. **Não é aconselhamento médico nem nutricional.** O animal e o leite fresco tradicional não são «vilões absolutos»; o foco é a **caseína industrial**, a dose e as hipóteses de inflamação documentadas na literatura de divulgação e clínica (com limites de evidência). Sem afiliação com a indústria láctea.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Caseína** (leite bovino) |
| Origem animal | *Bos taurus* — [ficha da vaca](${vaca}) |
| Tipo BudGanja | Produto nocivo — proteína animal → matriz industrial |
| Produto de risco em foco | Caseína (em especial β-caseína A1) + laticínios ultraprocessados |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |

## O que é a caseína

A **caseína** representa cerca de **80%** das proteínas do leite de vaca (o restante é sobretudo **soro / whey**). No queijo, iogurte, leite em pó, suplementos e muitos ultraprocessados, a caseína é concentrada, aquecida, misturada a aditivos ou isolada como ingrediente industrial (caseinato de sódio, caseinato de cálcio, proteína do leite).

| Forma | Onde aparece | Leitura BudGanja |
|-------|--------------|------------------|
| Leite fresco / artesanal | Consumo tradicional, contexto cultural | Não demonizar a origem |
| Queijos e iogurtes pouco processados | Matriz alimentar densa em proteína | Dose e tolerância individual |
| Caseinatos / isolados | Embutidos, «barras», shakes, ultraprocessados | Elevado — proteína industrial + rótulo longo |
| Laticínios ultraprocessados | Sobremesas, bebidas lácteas adoçadas | Elevado — caseína + açúcar + aditivos |

## Caseína A1, BCM-7 e inflamação (limites da evidência)

A β-caseína existe em variantes genéticas (**A1** e **A2**, entre outras). A variante **A1**, comum em muitas raças leiteiras industriais, pode libertar o peptídeo **BCM-7** (beta-casomorfin-7) durante a digestão. Hipóteses de divulgação e parte da literatura associam BCM-7 a:

- maior permeabilidade intestinal em contextos sensíveis;
- sinais de inflamação de baixo grau;
- desconforto digestivo que **não** se explica só por intolerância à **lactose**.

**Limites:** a evidência humana é **heterogénea** e não substitui diagnóstico. Intolerância à lactose (açúcar do leite) ≠ sensibilidade à caseína (proteína). Doença celíaca e alergia IgE ao leite são eixos clínicos distintos. O laboratório enquadra isto como **literacia de rótulo e de origem**, não como protocolo clínico.

**H1:** separar **leite / cultura** de **caseína industrial em dose alta**.  
**H2:** quem reage ao leite pode estar a reagir a lactose, a caseína, a ambos — ou a ultraprocessados lácteos.  
**H3:** a série **Produtos nocivos** agrupa caseína e [glúten](${gluten}) como proteínas estruturais de matrizes industriais que merecem inspeção, sem moralismo vazio.

## Do animal ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Vaca / leite fresco | Ordenha, consumo tradicional | Baixo — contexto e dose |
| Processamento lácteo | Pasteurização, queijo, iogurte | Intermediário |
| Isolados e caseinatos | Extração industrial da proteína | Elevado em ultraprocessados |
| Prateleira ultraprocessada | Bebidas lácteas, snacks, «proteína» de marketing | Elevado — caseína + açúcar/aditivos |

## O que observar nos rótulos

- «proteína do leite», «caseinato de sódio/cálcio», «sólidos lácteos»;
- bebidas lácteas com açúcar, xaropes e aroma;
- suplementos e barras com caseína isolada em gramagens altas;
- alegações de «leite saudável» que escondem ultraprocessamento.

## Cruzamento — glúten (série irmã)

A **caseína** e o **glúten** são proteínas estruturais densas, abundantes em dietas modernas industrializadas. Em pessoas sensíveis, ambas entram na conversa de inflamação e permeabilidade intestinal — eixos distintos, mas vizinhos na categoria **Produtos nocivos**. Ver: [Inspeção: Glúten](${gluten}).

## Ficha do animal

Origem no catálogo: [Vaca / boi (*Bos taurus*)](${vaca})

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. caseína |
| Veredicto editorial | O leite tradicional merece contexto; a **caseína industrial em excesso** e os laticínios ultraprocessados merecem alerta — com método, sem pânico. |

## Hub

Voltar a [Produtos nocivos](${hub}) e ao [catálogo de animais](/animais/).
`;

  const contentEn = `## Scope

Editorial inspection of **cow's milk** and **casein** — the dominant milk protein — as a **product harmful to the body** when intake pattern, protein genetics and ultra-processed dairy collide. Cross-links the [cattle sheet](${vaca}) and the sibling [gluten](${gluten}) inspection.

> **Method note:** independent BudGanja audit. **Not medical or dietary advice.** The animal and traditional fresh milk are not absolute villains; the focus is **industrial casein**, dose and inflammation hypotheses with evidence limits.

## Inspected object

| Field | Value |
|-------|-------|
| Popular name | **Casein** (cow's milk) |
| Animal origin | *Bos taurus* — [cattle sheet](${vaca}) |
| BudGanja type | Harmful product — animal protein → industrial matrix |
| Risk focus | Casein (esp. A1 β-casein) + ultra-processed dairy |
| Series | Harmful products |
| Inspection date | ${inspected} |

## What casein is

Casein is about **80%** of cow's milk protein (the rest is mainly whey). In cheese, yogurt, milk powder, supplements and many ultra-processed foods, casein is concentrated, heated, mixed with additives or isolated as an industrial ingredient (sodium/calcium caseinate).

## A1 casein, BCM-7 and inflammation (evidence limits)

β-casein has genetic variants (**A1** / **A2**). A1, common in industrial dairy breeds, may release **BCM-7** during digestion. Outreach and parts of the literature link BCM-7 to low-grade inflammation and gut discomfort that is **not** only lactose intolerance.

**Limits:** human evidence is **heterogeneous**. Lactose intolerance ≠ casein sensitivity. This is **label and origin literacy**, not a clinical protocol.

## Labels to watch

- «milk protein», «sodium/calcium caseinate», «dairy solids»;
- sweetened dairy drinks and high-dose casein bars/shakes;
- marketing that hides ultra-processing.

## Sibling — gluten

Casein and [gluten](${gluten}) are dense structural proteins abundant in industrial diets — distinct axes, same **Harmful products** category.

## Hub

Return to [Harmful products](${hub}) and the [animals catalog](/animais/).
`;

  const contentEs = `## Alcance

Inspección editorial de la **leche de vaca** y la **caseína** — proteína dominante de la leche — como **producto nocivo para el organismo** cuando dosis, genética proteica y lácteos ultraprocesados se cruzan. Cruza con la [ficha de la vaca](${vaca}) y la inspección hermana del [gluten](${gluten}).

> **Nota metodológica:** auditoría independiente BudGanja. **No es consejo médico ni nutricional.** El animal y la leche fresca tradicional no son villanos absolutos; el foco es la **caseína industrial**, la dosis y las hipótesis de inflamación con límites de evidencia.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Caseína** (leche bovina) |
| Origen animal | *Bos taurus* — [ficha](${vaca}) |
| Tipo BudGanja | Producto nocivo — proteína animal → matriz industrial |
| Producto de riesgo | Caseína (esp. β-caseína A1) + lácteos ultraprocesados |
| Serie | Productos nocivos |
| Fecha | ${inspected} |

## Qué es la caseína

La caseína es cerca del **80%** de las proteínas de la leche de vaca. En queso, yogur, leche en polvo, suplementos y ultraprocesados se concentra o se aísla (caseinato de sodio/calcio).

## Caseína A1, BCM-7 e inflamación (límites)

La β-caseína A1 puede liberar **BCM-7** en la digestión. Hipótesis de divulgación asocian BCM-7 a inflamación de bajo grado y malestar digestivo que **no** es solo intolerancia a la lactosa.

**Límites:** evidencia humana heterogénea. Intolerancia a la lactosa ≠ sensibilidad a la caseína. Esto es **alfabetización de etiqueta**, no protocolo clínico.

## Etiquetas a observar

- «proteína de la leche», «caseinato», «sólidos lácteos»;
- bebidas lácteas azucaradas y barras con caseína aislada;
- marketing que oculta ultraprocesamiento.

## Hermana — gluten

Caseína y [gluten](${gluten}) son proteínas estructurales densas de dietas industriales — ejes distintos, misma categoría **Productos nocivos**.

## Hub

Volver a [Productos nocivos](${hub}) y al [catálogo de animales](/animais/).
`;

  return { body, contentEn, contentEs };
}

function buildGlutenBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';

  const body = `## Escopo

Inspeção editorial do **glúten** — complexo proteico do trigo (*Triticum* spp.) e cereais relacionados — como **produto nocivo ao organismo** em contextos de doença celíaca, sensibilidade e ultraprocessados de farinha. Cruza com a inspeção-irmã da [caseína](${caseina}) e com a [cana / açúcares livres](${cana}).

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico.** O trigo como cultura agrícola não é o vilão absoluto; o foco é o **glúten em matrizes industriais**, a dose e os eixos clínicos reais (celíaca vs sensibilidade vs alergia).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Glúten** |
| Origem botânica | Trigo (*Triticum aestivum* e afins); também cevada, centeio |
| Tipo BudGanja | Produto nocivo — proteína vegetal → matriz industrial |
| Produto de risco em foco | Glúten em farinhas refinadas e ultraprocessados |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |

## O que é o glúten

O **glúten** é a rede de proteínas (gliadinas + gluteninas) que dá elasticidade à massa. Em pão artesanal e culinária tradicional tem papel cultural; em ultraprocessados (pães industriais, snacks, «proteína de trigo», emulsões) torna-se proteína omnipresente e concentrada.

| Contexto | Leitura BudGanja |
|----------|------------------|
| Doença celíaca | Eixo clínico — exclusão de glúten sob orientação profissional |
| Sensibilidade não celíaca | Sintomas digestivos/extra-digestivos relatados; diagnóstico diferencial |
| Alergia ao trigo | Eixo IgE distinto |
| Ultraprocessados de farinha | Elevado — glúten + açúcar + aditivos (ver também [cana](${cana})) |

## Do cereal ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Grão / cultura | Trigo como alimento histórico | Baixo — contexto tradicional |
| Farinha refinada | Remoção de fibra; concentração de glúten relativo | Intermediário |
| Ultraprocessados | Snacks, pães industriais, «gluten» como aditivo | Elevado |

**H1:** literacia botânica/alimentar separa **cereal** de **farinha industrial**.  
**H2:** celíaca é eixo clínico; ultraprocessado de trigo é eixo de dose e matriz.  
**H3:** [caseína](${caseina}) e glúten partilham a categoria **Produtos nocivos** como proteínas estruturais densas da dieta moderna.

## O que observar nos rótulos

- trigo, farinha de trigo, glúten de trigo, proteína vegetal hidrolisada;
- «sem glúten» industrial que troca glúten por amidos e açúcares;
- snacks e pães com lista longa de aditivos.

## Cruzamento — caseína

Ver [Inspeção: Caseína / leite](${caseina}) — proteína animal irmã na mesma categoria.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. glúten |
| Veredicto editorial | O trigo tradicional merece contexto; o **glúten em ultraprocessados** e os eixos clínicos (celíaca) merecem alerta — com método. |

## Hub

Voltar a [Produtos nocivos](${hub}).
`;

  const contentEn = `## Scope

Editorial inspection of **gluten** — the wheat protein complex — as a **harmful product** in celiac disease, sensitivity and ultra-processed flour matrices. Cross-links [casein](${caseina}) and [sugarcane / free sugars](${cana}).

> **Method note:** independent BudGanja audit. **Not medical advice.** Wheat as a crop is not an absolute villain; the focus is **gluten in industrial matrices** and real clinical axes.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Gluten** |
| Botanical origin | Wheat (*Triticum* spp.); also barley, rye |
| Series | Harmful products |
| Inspection date | ${inspected} |

## What gluten is

Gluten (gliadins + glutenins) gives dough elasticity. In traditional bread it is cultural; in ultra-processed foods it becomes an omnipresent industrial protein.

## From grain to risk product

| Stage | Editorial risk |
|-------|----------------|
| Grain / culture | Low |
| Refined flour | Intermediate |
| Ultra-processed | High — gluten + sugars + additives |

## Sibling — casein

See [Casein / milk inspection](${caseina}).

## Hub

Return to [Harmful products](${hub}).
`;

  const contentEs = `## Alcance

Inspección editorial del **gluten** — complejo proteico del trigo — como **producto nocivo** en celiaquía, sensibilidad y matrices de harina ultraprocesada. Cruza con [caseína](${caseina}) y [caña / azúcares libres](${cana}).

> **Nota metodológica:** auditoría independiente BudGanja. **No es consejo médico.** El trigo como cultivo no es villano absoluto; el foco es el **gluten en matrices industriales**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Gluten** |
| Origen | Trigo (*Triticum* spp.); también cebada, centeno |
| Serie | Productos nocivos |
| Fecha | ${inspected} |

## Qué es el gluten

El gluten (gliadinas + gluteninas) da elasticidad a la masa. En pan tradicional es cultural; en ultraprocesados es proteína industrial omnipresente.

## Hermana — caseína

Ver [Inspección: Caseína / leche](${caseina}).

## Hub

Volver a [Productos nocivos](${hub}).
`;

  return { body, contentEn, contentEs };
}

function buildCaseinaPost() {
  const { body, contentEn, contentEs } = buildCaseinaBodies();
  return nocivoPost({
    title: 'Inspeção: Caseína — leite bovino e proteína nociva ao organismo',
    titleEn: 'Inspection: Casein — cow’s milk and a protein harmful to the body',
    titleEs: 'Inspección: Caseína — leche bovina y proteína nociva para el organismo',
    excerpt:
      'Produtos nocivos: caseína do leite (*Bos taurus*) — A1/BCM-7, inflamação (limites de evidência) e laticínios ultraprocessados versus leite tradicional. Elo com glúten e ficha da vaca.',
    excerptEn:
      'Harmful products: milk casein (*Bos taurus*) — A1/BCM-7, inflammation (evidence limits) and ultra-processed dairy versus traditional milk. Links gluten and the cattle sheet.',
    excerptEs:
      'Productos nocivos: caseína de la leche (*Bos taurus*) — A1/BCM-7, inflamación (límites) y lácteos ultraprocesados frente a leche tradicional. Vínculo con gluten y ficha de la vaca.',
    slug: 'inspecao-derivado-caseina',
    date: '2026-08-02T04:10:00.000Z',
    series: 'animais-derivados-risco',
    seriesOrder: 1,
    seriesLabel: 'Caseína · nocivo',
    coverImage: '/imagens/inspecoes/caseina-cover.jpg',
    sourceUrl: '/animais/vaca/',
    body,
    contentEn,
    contentEs
  });
}

function buildGlutenPost() {
  const { body, contentEn, contentEs } = buildGlutenBodies();
  return nocivoPost({
    title: 'Inspeção: Glúten — trigo e proteína nociva ao organismo',
    titleEn: 'Inspection: Gluten — wheat and a protein harmful to the body',
    titleEs: 'Inspección: Gluten — trigo y proteína nociva para el organismo',
    excerpt:
      'Produtos nocivos: glúten do trigo — celíaca, sensibilidade e ultraprocessados de farinha versus cereal tradicional. Elo com caseína e açúcares livres.',
    excerptEn:
      'Harmful products: wheat gluten — celiac disease, sensitivity and ultra-processed flour versus traditional grain. Links casein and free sugars.',
    excerptEs:
      'Productos nocivos: gluten del trigo — celiaquía, sensibilidad y ultraprocesados de harina frente al cereal tradicional. Vínculo con caseína y azúcares libres.',
    slug: 'inspecao-derivado-gluten',
    date: '2026-08-02T04:15:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 4,
    seriesLabel: 'Glúten · nocivo',
    coverImage: '/imagens/inspecoes/gluten-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Gl%C3%BAten',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCaseinaPost,
  buildGlutenPost,
  buildCaseinaBodies,
  buildGlutenBodies,
  PRODUTOS_NOCIVOS_POSTS: [buildCaseinaPost(), buildGlutenPost()]
};
