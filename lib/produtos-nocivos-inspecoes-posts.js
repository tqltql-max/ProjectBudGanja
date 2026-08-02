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
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';

  const body = `## Escopo

Inspeção editorial do **leite bovino** e da **caseína** — a proteína dominante do leite — como **produto nocivo ao organismo** quando o padrão de consumo, a genética da proteína e o ultraprocessamento lácteo se cruzam de forma desfavorável. Cruza com a ficha da [vaca / boi](${vaca}), com o [glúten](${gluten}) e com o hub [chocolate industrial](${chocolate}) (leite em pó / caseinatos em barras e bombons).

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

## Cruzamento — glúten e chocolate (série irmã)

A **caseína** e o **glúten** são proteínas estruturais densas, abundantes em dietas modernas industrializadas. Em pessoas sensíveis, ambas entram na conversa de inflamação e permeabilidade intestinal — eixos distintos, mas vizinhos na categoria **Produtos nocivos**. Ver: [Inspeção: Glúten](${gluten}).

No [chocolate industrial](${chocolate}), a caseína aparece como **leite em pó / sólidos lácteos** somada a **açúcar** e, em bolachas/recheios, a **farinha** — a mesma rede de produtos nocivos.

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
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';

  const body = `## Escopo

Inspeção editorial do **glúten** — complexo proteico do trigo (*Triticum* spp.) e cereais relacionados — como **produto nocivo ao organismo** em contextos de doença celíaca, sensibilidade e ultraprocessados de **farinha**. Cruza com a [caseína](${caseina}), a [cana / açúcar](${cana}) e o hub [chocolate industrial](${chocolate}) (farinha em bolachas, wafers e massas adoçadas). Discurso cultural popular: [*Barriga de Trigo*](${barriga}) / [William Davis](${davis}).

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico.** O trigo como cultura agrícola não é o vilão absoluto; o foco é o **glúten em matrizes industriais**, a dose e os eixos clínicos reais (celíaca vs sensibilidade vs alergia). O livro de Davis é **discurso** a auditar — não substitui esta ficha de produto.

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

## Cruzamento — caseína, açúcar, chocolate e Barriga de Trigo

| Elo | Ficha |
|-----|-------|
| Caseína / leite | [Inspeção: Caseína](${caseina}) |
| Açúcar / cana | [Inspeção: Cana-de-açúcar](${cana}) |
| Farinha + açúcar + cacau | [Inspeção: Chocolate industrial](${chocolate}) |
| Livro *Wheat Belly* | [Inspeção: Barriga de Trigo](${barriga}) |
| Autor | [Inspeção: William Davis](${davis}) |

A **farinha** refinada é o veículo quotidiano do glúten; no chocolate de prateleira e nas bolachas recheadas ela junta-se ao açúcar e, muitas vezes, ao leite. O best-seller [Barriga de Trigo](${barriga}) popularizou a tese do trigo moderno como motor de gordura visceral — com limites de evidência declarados nessa ficha.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. glúten / farinha |
| Veredicto editorial | O trigo tradicional merece contexto; o **glúten em farinhas ultraprocessadas** e os eixos clínicos (celíaca) merecem alerta — com método. |

## Hub

Voltar a [Produtos nocivos](${hub}).
`;

  const contentEn = `## Scope

Editorial inspection of **gluten** — the wheat protein complex — as a **harmful product** in celiac disease, sensitivity and ultra-processed **flour** matrices. Cross-links [casein](${caseina}), [sugarcane / free sugars](${cana}), [industrial chocolate](${chocolate}), and the cultural book [Wheat Belly](${barriga}) / [William Davis](${davis}).

> **Method note:** independent BudGanja audit. **Not medical advice.** Wheat as a crop is not an absolute villain; the focus is **gluten in industrial matrices** and real clinical axes. Davis’s book is discourse to audit — it does not replace this product sheet.

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

function buildChocolateBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const cacau = '/plantas/cacau/';
  const cacauInsp = '/posts/post-inspecao-planta-cacau.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const palavras = '/guia/palavras.html';
  const inspetor = '/posts/post-inspecao-personagem-inspetor.html';
  const droga = '/posts/post-inspecao-palavra-droga.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const nojinho = '/posts/post-inspecao-palavra-nojinho.html';
  const cannabis = '/posts/post-inspecao-palavra-cannabis.html';
  const artBrouns = '/posts/post-inspecao-artigo-brouns-trigo-obesidade-2013.html';
  const artWieser = '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html';
  const artHall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const artCasein = '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html';
  const artWho = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const hubArtigos = '/biblioteca/inspecoes/#inspecoes-artigos';

  const body = `## Escopo

Inspeção editorial do **chocolate industrial** como **matriz ultraprocessada** que junta — no mesmo produto ou na mesma prateleira — **cacau**, **açúcar**, **farinha / trigo / glúten**, **leite / caseína** e, no discurso cultural, as teses de [*Barriga de Trigo*](${barriga}) / [William Davis](${davis}). É o hub BudGanja que **relaciona tudo o que há deles** na categoria [Produtos nocivos](${hub}) — e liga ao [Guia de Palavras](${palavras}) quando o marketing e o léxico entram na inspeção.

> **Nota metodológica:** auditoria independente. **Não é aconselhamento médico.** O [cacau](${cacau}) (*Theobroma cacao*) como planta/amêndoa tradicional **não** é o vilão; o foco é o **chocolate de fábrica** (açúcar refinado, leite em pó, emulsificantes, farinhas em snacks). Indexar Davis/Lair ≠ endossar cada claim. Sem afiliação com a indústria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Chocolate industrial** (matriz) |
| Origem vegetal | [Cacau](${cacau}) — *Theobroma cacao* L. |
| Tipo BudGanja | Produto nocivo — matriz industrial (vários elos) |
| Elos de risco | Açúcar · Farinha/glúten/trigo · Leite/caseína · Aditivos · Discurso (Davis/Lair) |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |

## Rede completa — tudo o que se relaciona aqui

| Elo | O que entra no chocolate / snacks | Ficha BudGanja |
|-----|-----------------------------------|----------------|
| **Cacau** | Amêndoa, liquor, manteiga, cacau em pó | [Planta · Cacau](${cacau}) · [Inspeção do fruto](${cacauInsp}) |
| **Açúcar** | Sacarose, xaropes, maltodextrina | [Cana / açúcares livres](${cana}) · [Lair](${lair}) |
| **Farinha / trigo** | Bolachas, wafers, croissants, coberturas | [Glúten / farinha](${gluten}) |
| **Trigo moderno (discurso)** | Volume barato + tese «barriga» | [*Barriga de Trigo*](${barriga}) · [William Davis](${davis}) |
| **Leite** | Leite em pó, sólidos lácteos, caseinatos | [Caseína](${caseina}) |
| **Aditivos** | Lecitina, aromas, gorduras baratas | Rótulo — dose e ultraprocessamento |
| **Acervo de vídeos** | Quase só Lair neste eixo; amargo elogiado ≠ snack açucarado | [Análise danos × vídeos](${analise}) |

**H1:** literacia de rótulo separa **amêndoa / cacau alto teor** de **barra açucarada de prateleira**.  
**H2:** bolacha «de chocolate» é muitas vezes **trigo/farinha + açúcar + gordura** com perfume de cacau — o mesmo eixo de [glúten](${gluten}) e de [*Barriga de Trigo*](${barriga}).  
**H3:** a mesma rede (açúcar ↔ farinha ↔ leite ↔ cacau) aparece em sobremesas, cereais e snacks infantis.  
**H4:** o chocolate é o sítio onde o laboratório **vê juntos** os produtos nocivos — e onde o marketing usa [emoção](${emocao}) / [alegria](${alegria}) para vender a matriz.

## Do cacau ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Fruto / amêndoa | Cultura mesoamericana-amazónica; usos tradicionais | Baixo — contexto e dose |
| Liquor / manteiga de cacau | Processamento culinário | Intermediário |
| Chocolate ao leite / branco industrial | Açúcar + leite + pouco cacau | Elevado |
| Snacks e bolachas «chocolate» | Farinha de **trigo** + açúcar + gordura + aroma | Elevado — rede completa (Davis aplica-se aqui) |
| Coberturas e recheios | Xaropes, gorduras baratas, pouco cacau real | Elevado |

## Cacau — resgatar a planta

Ver a ficha [Cacau](${cacau}) e a [inspeção do fruto](${cacauInsp}): a planta merece contexto cultural e botânico. O desvio industrial documenta-se **aqui**, na [cana](${cana}) e na [análise de vídeos](${analise}) (poucos títulos; elogiam o **amargo**, não o snack).

| Forma | Leitura BudGanja |
|-------|------------------|
| Nibs / cacau 70–100% pouco aditivado | Mais próximo da amêndoa; ainda assim dose |
| Chocolate amargo com lista curta | Intermediário — verificar açúcar |
| Chocolate ao leite / branco | Elevado — açúcar + [caseína](${caseina}) |
| Achocolatado, bombons, snacks | Elevado — matriz ultraprocessada |

## Açúcar — o elo metabólico

O açúcar do chocolate industrial é o mesmo eixo da [cana-de-açúcar](${cana}) (açúcares livres, OMS) e da varredura do [Dr. Lair Ribeiro](${lair}). Sem açúcar (ou com xaropes equivalentes), a maior parte do chocolate de massa não existiria como snack quotidiano.

## Farinha, trigo e Barriga de Trigo

Quando o «chocolate» vem em **bolacha, wafer, bolo ou cereal**, o eixo passa a ser [glúten / farinha refinada](${gluten}) + açúcar + (muitas vezes) leite. A farinha **não** é detalhe: é o volume barato da matriz — o mesmo **trigo moderno** que [William Davis](${davis}) ataca em [*Barriga de Trigo*](${barriga}) (amilopectina A, glicemia, gordura visceral).

| Situação | O que inspeccionar |
|----------|-------------------|
| Barra ao leite sem farinha | Açúcar + caseína (Davis menos directo) |
| Bolacha / wafer «de chocolate» | **Trigo + açúcar + gordura** — elo Davis + glúten |
| Cereal / granola chocolate | Farinha/açúcares + marketing de «energia» |
| «Sem glúten» chocolate snack | Troca farinha por amidos — ainda ultraprocessado ([glúten](${gluten}) já alerta) |

BudGanja **não** adopta a frase máxima do discurso popular sobre o trigo: usa Davis como **discurso cultural** e a ficha [glúten](${gluten}) como eixo de método (celíaca vs matriz industrial).

## Leite — o elo da caseína

Chocolate ao leite, recheios e «creme» de prateleira concentram [caseína](${caseina}) e sólidos lácteos. Quem inspecciona o leite industrial deve olhar também para as barras e snacks — e para o eixo Lair trigo/leite.

## Léxico catalogado — palavras que o chocolate activa

O [Guia de Palavras](${palavras}) e as fichas **Palavras** ajudam a ler o rótulo e o anúncio — não só a química.

| Palavra | Como entra no chocolate | Ficha |
|---------|-------------------------|-------|
| [Inspeção](${inspetor}) / Inspetor | Método: olhar rótulo, dose e rede — não só a embalagem | [Inspetor](${inspetor}) · [Guia](${palavras}) |
| [Caminho](${caminho}) | Do cacau à prateleira: planta → fábrica → snack | [caminho](${caminho}) |
| [Passar](${passar}) | O que **passa** no rótulo (açúcar à frente) e o que **se passou** na industrialização | [passar](${passar}) |
| [Droga](${droga}) | Do «remédio»/conforto ao ilícito no senso comum — paralelo: do cacau medicinal-cultural ao snack viciante de marketing | [droga](${droga}) |
| [Erva](${erva}) | Cacau não é «erva» botânica no sentido de erva daninha; o eufemismo popular de erva/cannabis lembra como o léxico **desliza** | [erva](${erva}) · [cannabis](${cannabis}) |
| [Emoção](${emocao}) / [Alegria](${alegria}) | Marketing: «recompensa», festa, conforto — vende matriz, não amêndoa | [emoção](${emocao}) · [alegria](${alegria}) |
| [Medo](${medo}) / [Nojinho](${nojinho}) | Medo de engordar / nojo a «química» — também usados para vender «versão light» ultraprocessada | [medo](${medo}) · [nojinho](${nojinho}) |
| [Produtos nocivos](${hub}) | Categoria-mãe desta ficha | Hub |
| Fitoterapia / Laboratório | Cacau tradicional ≠ protocolo clínico; laboratório documenta limites | [Guia de Palavras](${palavras}) |

## O que observar nos rótulos

1. **Ordem dos ingredientes** — açúcar ou farinha à frente do cacau = matriz doce, não «fruta».  
2. **% de cacau** — quanto mais baixo, mais espaço para açúcar/leite/gordura.  
3. **Leite em pó / soro / caseinato** — elo directo com [caseína](${caseina}).  
4. **Farinha de trigo** em wafers e bolachas — elo com [glúten](${gluten}) e [*Barriga de Trigo*](${barriga}).  
5. **Gorduras vegetais** baratas no lugar de manteiga de cacau.  
6. **Alegações** («energia», «antioxidante», «alegria») que não apagam ultraprocessamento.  
7. **«Sem glúten»** — verificar se trocou trigo por amidos de alto índice glicémico.

## Artigos científicos inspeccionados (âncoras)

| Artigo | Elo no chocolate | Ficha |
|--------|------------------|-------|
| Brouns et al. 2013 — trigo e obesidade | Contraponto a Davis / bolacha de trigo | [Brouns](${artBrouns}) |
| Wieser et al. 2020 — duas faces do trigo | WRDs vs. marketing anti-trigo | [Wieser](${artWieser}) |
| Hall et al. 2019 — ultraprocessados (RCT) | Matriz de fábrica ↑ kcal e peso | [Hall](${artHall}) |
| Brooke-Taylor et al. 2017 — A1/A2 | Leite / caseína no ao leite | [Brooke-Taylor](${artCasein}) |
| OMS 2015 — açúcares livres | Sacarose e xaropes no rótulo | [OMS](${artWho}) |

Hub: [Artigos científicos](${hubArtigos}).

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. chocolate (hub completo) |
| Veredicto editorial | O cacau tradicional merece contexto; o **chocolate industrial** é a matriz que **junta** açúcar, farinha/trigo, leite e discurso — inspeccionar a rede, as palavras, os **artigos** e o rótulo, não só a barra. |

## Hub

[Produtos nocivos](${hub}) · [Cacau](${cacau}) · [Açúcar](${cana}) · [Glúten](${gluten}) · [Caseína](${caseina}) · [*Barriga de Trigo*](${barriga}) · [Davis](${davis}) · [Lair](${lair}) · [Análise × vídeos](${analise}) · [Artigos](${hubArtigos}) · [Palavras](${palavras})
`;

  const contentEn = `## Scope

Editorial inspection of **industrial chocolate** as an ultra-processed matrix joining **cacao**, **sugar**, **wheat flour/gluten**, **milk/casein**, and the cultural thesis of [Wheat Belly](${barriga}) / [William Davis](${davis}). Hub under [Harmful products](${hub}); lexicon via the [Words Guide](${palavras}).

> **Method note:** independent audit. **Not medical advice.** [Cacao](${cacau}) as a plant is not the villain; factory chocolate is. Indexing Davis/Lair ≠ endorsing every claim.

## Full relation network

| Link | BudGanja sheet |
|------|----------------|
| Cacao | [Plant](${cacau}) · [Fruit inspection](${cacauInsp}) |
| Sugar | [Sugarcane / free sugars](${cana}) · [Lair](${lair}) |
| Flour / gluten / wheat | [Gluten](${gluten}) · [Wheat Belly](${barriga}) · [Davis](${davis}) |
| Milk / casein | [Casein](${caseina}) |
| Video archive | [Harms × videos](${analise}) |

## Wheat Belly applies here

Chocolate **cookies/wafers** are often wheat + sugar + fat with cacao perfume — the same modern-wheat axis Davis attacks. BudGanja keeps celiac as the clinical gluten axis and treats Davis as cultural discourse.

## Catalogued words (marketing + method)

| Word | Role on the shelf |
|------|-------------------|
| [Path](${caminho}) / [Pass](${passar}) | Bean → factory → snack; what “passes” on the label |
| [Drug](${droga}) | Comfort → habit narrative (lexical parallel, not pharmacology) |
| [Emotion](${emocao}) / [Joy](${alegria}) | Packaging sells feeling, not the bean |
| [Fear](${medo}) / [Disgust](${nojinho}) | Also used to sell “light” ultra-processed versions |

## Scientific articles

[Brouns 2013](${artBrouns}) · [Wieser 2020](${artWieser}) · [Hall 2019](${artHall}) · [Brooke-Taylor 2017](${artCasein}) · [WHO sugars 2015](${artWho}) · [Articles hub](${hubArtigos})

## Status

**Published** — Harmful products · full chocolate hub.

[▶ Harmful products](${hub}) · [Wheat Belly](${barriga}) · [Articles](${hubArtigos}) · [Words](${palavras})
`;

  const contentEs = `## Alcance

Inspección editorial del **chocolate industrial** como matriz ultraprocesada que junta **cacao**, **azúcar**, **harina/trigo/gluten**, **leche/caseína** y la tesis cultural de [Barriga de Trigo](${barriga}) / [William Davis](${davis}). Hub bajo [Productos nocivos](${hub}); léxico en la [Guía de Palabras](${palavras}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** El [cacao](${cacau}) como planta no es el villano. Indexar Davis/Lair ≠ respaldar cada claim.

## Red completa

| Eje | Ficha BudGanja |
|-----|----------------|
| Cacao | [Planta](${cacau}) · [Inspección](${cacauInsp}) |
| Azúcar | [Caña](${cana}) · [Lair](${lair}) |
| Harina / gluten / trigo | [Gluten](${gluten}) · [Barriga de Trigo](${barriga}) · [Davis](${davis}) |
| Leche / caseína | [Caseína](${caseina}) |
| Vídeos | [Daños × vídeos](${analise}) |

## Barriga de Trigo aplica aquí

Galletas/wafers «de chocolate» suelen ser trigo + azúcar + grasa con perfume de cacao — el mismo eje del trigo moderno. BudGanja mantiene la celiaquía como eje clínico del gluten y trata a Davis como discurso cultural.

## Palabras catalogadas

| Palabra | Rol |
|---------|-----|
| [Camino](${caminho}) / [Pasar](${passar}) | Del grano al snack; lo que «pasa» en la etiqueta |
| [Droga](${droga}) | Del consuelo al hábito en el léxico (paralelo, no farmacología) |
| [Emoción](${emocao}) / [Alegría](${alegria}) | El marketing vende sentimiento |
| [Miedo](${medo}) / [Asco](${nojinho}) | También venden versiones «light» ultraprocesadas |

## Artículos científicos

[Brouns 2013](${artBrouns}) · [Wieser 2020](${artWieser}) · [Hall 2019](${artHall}) · [Brooke-Taylor 2017](${artCasein}) · [OMS 2015](${artWho}) · [Hub artículos](${hubArtigos})

## Estado

**Publicada** — Productos nocivos · hub chocolate completo.

[▶ Productos nocivos](${hub}) · [Barriga de Trigo](${barriga}) · [Artículos](${hubArtigos}) · [Palabras](${palavras})
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
    title: 'Inspeção: Glúten / farinha — trigo e proteína nociva ao organismo',
    titleEn: 'Inspection: Gluten / flour — wheat and a protein harmful to the body',
    titleEs: 'Inspección: Gluten / harina — trigo y proteína nociva para el organismo',
    excerpt:
      'Produtos nocivos: glúten e farinha de trigo — celíaca, sensibilidade e ultraprocessados versus cereal tradicional. Elo com caseína, açúcar e chocolate industrial.',
    excerptEn:
      'Harmful products: wheat gluten and flour — celiac disease, sensitivity and ultra-processed foods versus traditional grain. Links casein, sugar and industrial chocolate.',
    excerptEs:
      'Productos nocivos: gluten y harina de trigo — celiaquía, sensibilidad y ultraprocesados frente al cereal tradicional. Vínculo con caseína, azúcar y chocolate industrial.',
    slug: 'inspecao-derivado-gluten',
    date: '2026-08-02T04:15:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 4,
    seriesLabel: 'Glúten / farinha · nocivo',
    coverImage: '/imagens/inspecoes/gluten-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Gl%C3%BAten',
    body,
    contentEn,
    contentEs
  });
}

function buildChocolatePost() {
  const { body, contentEn, contentEs } = buildChocolateBodies();
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  return nocivoPost({
    title: 'Inspeção: Chocolate industrial — cacau, açúcar, farinha e leite',
    titleEn: 'Inspection: Industrial chocolate — cacao, sugar, flour and milk',
    titleEs: 'Inspección: Chocolate industrial — cacao, azúcar, harina y leche',
    excerpt:
      'Produtos nocivos: chocolate industrial como matriz que junta cacau, açúcar, farinha/trigo/glúten, leite/caseína, Barriga de Trigo (Davis) e o léxico catalogado — hub que relaciona tudo.',
    excerptEn:
      'Harmful products: industrial chocolate as a matrix joining cacao, sugar, flour/wheat/gluten, milk/casein, Wheat Belly (Davis) and the catalogued lexicon — the hub that relates everything.',
    excerptEs:
      'Productos nocivos: chocolate industrial como matriz que junta cacao, azúcar, harina/trigo/gluten, leche/caseína, Barriga de Trigo (Davis) y el léxico catalogado — hub que relaciona todo.',
    slug: 'inspecao-derivado-chocolate',
    date: '2026-08-02T05:30:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 5,
    seriesLabel: 'Chocolate · nocivo',
    coverImage: '/imagens/inspecoes/chocolate-cover.jpg',
    sourceUrl: '/plantas/cacau/',
    body:
      body.trimEnd() +
      `\n\n## Análise cruzada com o acervo de vídeos\n\nVer [Análise: danos × vídeos catalogados](${analise}) — onde o discurso audiovisual do projecto sustenta (ou não) esta rede.\n`,
    contentEn:
      contentEn.trimEnd() +
      `\n\n## Cross-analysis with the video archive\n\nSee [Analysis: harms × catalogued videos](${analise}).\n`,
    contentEs:
      contentEs.trimEnd() +
      `\n\n## Análisis cruzado con el acervo de vídeos\n\nVer [Análisis: daños × vídeos catalogados](${analise}).\n`
  });
}

function buildAnaliseDanosVideosBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const themes = '/content/channels/lair-video-themes.json';
  const sugarHits = '/content/channels/lair-sugar-hits.json';
  const vSugar = 'UfPawBg7vXc';
  const vFructose = 'rVS2M4wuseE';
  const vSweeteners = 'oGhMcYmy-C4';
  const vGluten = '2qYo3wMHbT0';
  const vGlutenLactose = 'yLOG0fcqYs0';
  const vLeite = 'cID3nNJsgm4';
  const vOleo = 'Z2tvpY8GraE';
  const vChoc = 'g_-gnOKRWhg';

  const body = `## Escopo

Análise editorial que **cruza os danos** da rede **Produtos nocivos** (açúcar, farinha/glúten, leite/caseína, chocolate industrial, óleos) com os **vídeos catalogados em todo o projecto** — Lair, MovReCam, CANABinALL e Inspetor BudGanja.

> **Nota metodológica:** auditoria independente. Classificação por **título** (\`lair-video-themes.json\`, \`lair-sugar-hits.json\`, catálogos \`content/channels/\`). **Não é aconselhamento médico.** **Indexar ≠ endossar.** O discurso Lair é divulgação; as fichas BudGanja (OMS, celíaca, caseína A1) são a camada de método. Sem afiliação com os canais.

## Universo do acervo (vídeos únicos)

| Canal | Vídeos | Papel neste eixo |
|-------|--------|------------------|
| Dr. Lair Ribeiro Oficial | **888** | Quase todo o discurso alimentar / dano metabólico |
| MovReCam | **285** | Cultivo / UNIFESP / cannabis — quase sem açúcar·glúten·leite |
| CANABinALL | **139** | Divulgação científica cannabis — eixo alimentar residual |
| Inspetor BudGanja | **6** | Ainda sem série própria de produtos nocivos em vídeo |
| **Total único** | **~1318** | |

**Achado principal:** o peso do eixo «produtos nocivos» **não** segue o hub de vídeos do site (MovReCam/CANABinALL) — segue o **Lair**.

## Produto → danos no discurso → vídeos → ficha

| Produto | Danos / hipóteses no discurso | Vídeos no catálogo | Ficha BudGanja |
|---------|-------------------------------|--------------------|----------------|
| **Açúcar / frutose / adoçantes** | Açúcares livres (OMS na ficha); diabesidade; frutose; adoçantes e desejo por doce | **10** no tema Lair · **38** hits na varredura (\`lair-sugar-hits.json\`: 20 diabetes/insulina, 16 metabólico) | [Cana](${cana}) · [Lair](${lair}) |
| **Farinha / glúten** | Malefícios do trigo; hipersensibilidade; custo glúten+lactose; celíaca (eixo clínico na ficha) | **14** no bucket trigo·glúten·leite | [Glúten / farinha](${gluten}) |
| **Leite / caseína** | «Mito do leite»; lactose; contraste com leite materno; A1/BCM-7 na ficha (pouco nomeado nos títulos) | Mesmo bucket de **14** | [Caseína](${caseina}) |
| **Chocolate industrial** | Na ficha: matriz açúcar+farinha+leite. Nos vídeos: chocolate **amargo** elogiado | Só **3** títulos claros (pró-amargo) | [Chocolate](${chocolate}) |
| **Óleos / gorduras** | «Veneno do coração»; colesterol; vs «gorduras boas» / coco (claims controversos) | **39** no tema óleos/gorduras | Coco derivado · falta ficha óleo/margarina |
| **Diabetes / metabolismo** | Diabesidade, insulina, glicose | **30** vídeos no tema | Cruza [cana](${cana}) + Lair |
| **Inflamação / intestino** | Inflamação crónica; intestino «segundo cérebro» | **10** inflamação Lair (+ neuroinflamação CANABinALL) | Ponte com [caseína](${caseina}) / [glúten](${gluten}) |
| **Coração** | Doença cardíaca, eixo cérebro-coração | **14** | Cruza óleos + açúcar |

## Temas Lair com mais massa neste eixo

Dados de [\`lair-video-themes.json\`](${themes}):

| Tema | Vídeos |
|------|--------|
| Óleos / gorduras / coco | 39 |
| Diabetes / obesidade / metabolismo | 30 |
| Imunidade / doença (eixo amplo) | 28 |
| Trigo · glúten · laticínios | 14 |
| Coração / cardiologia | 14 |
| Açúcar · frutose · adoçantes | 10 |
| Inflamação / dor | 10 |

Varredura açúcar — tags em [\`lair-sugar-hits.json\`](${sugarHits}) (**38** hits): diabetes/insulina **20** · metabólico **16** · açúcar **2** · adoçante **2** · refrigerante **1**.

## Vídeos âncora (verificáveis)

| Eixo | Título | ID |
|------|--------|-----|
| Açúcar | Truths about Sugar | \`${vSugar}\` |
| Frutose | Fructose the unknown poison | \`${vFructose}\` |
| Adoçantes | Sugar and Sweeteners | \`${vSweeteners}\` |
| Glúten | Effect of gluten on health | \`${vGluten}\` |
| Glúten + lactose | GLÚTEN E LACTOSE e o custo para o seu corpo | \`${vGlutenLactose}\` |
| Leite | O mito do leite | \`${vLeite}\` |
| Óleo / coração | Óleo para cozinhar O veneno do coração | \`${vOleo}\` |
| Chocolate amargo (pró) | POR QUE INGERIR CHOCOLATE AMARGO? | \`${vChoc}\` |

@youtube ${vSugar}

@youtube ${vGluten}

## O que o acervo sustenta bem

1. **Açúcar / frutose / adoçantes / diabesidade** — volume e âncoras claros; alinhado com [cana](${cana}) e OMS na ficha.  
2. **Glúten + leite como par** — vários títulos nomeiam o cruzamento (útil para a série).  
3. **Óleos de cozinha e coração** — discurso denso; falta ficha «óleo/margarina» no site.  
4. **Inflamação / intestino** — ponte mecanística para [caseína](${caseina}) e [glúten](${gluten}).

## O que o acervo NÃO cobre bem

1. **Chocolate industrial açucarado** — os poucos vídeos elogiam o **amargo**; o hub [chocolate](${chocolate}) descreve a matriz ultraprocessada — desalinhamento título↔ficha.  
2. **MovReCam / CANABinALL / Inspetor** — sem trilha alimentar; o hub \`/videos\` não representa este eixo.  
3. **Caseína A1 / BCM-7** — conceito da ficha; títulos falam «leite» e «lactose», quase nunca «caseína».  
4. **Claims fortes** (glicose/cancro, óleo de coco) — manter fronteira divulgação ≠ Legado UNIFESP.

## Veredicto editorial

Para a rede **chocolate · açúcar · farinha · leite**, o projecto já tem fichas com método; o vídeo que as alimenta é **quase só Lair**, com ênfase em açúcar/metabolismo e glúten/leite. O próximo ganho no site é publicar fichas de **refrigerante**, **adoçantes** e **óleos refinados** — onde o catálogo Lair já tem massa — e **não** esperar MovReCam/CANABinALL para este eixo.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — análise cruzada Produtos nocivos × acervo de vídeos |
| Data | ${inspected} |
| Método | Títulos + JSON de temas/hits; sem transcrição integral |

[▶ Produtos nocivos](${hub}) · [Chocolate](${chocolate}) · [Cana](${cana}) · [Glúten](${gluten}) · [Caseína](${caseina}) · [Lair](${lair})
`;

  const contentEn = `## Scope

Editorial analysis crossing **harms** in the Harmful products network (sugar, flour/gluten, milk/casein, industrial chocolate, oils) with **all catalogued project videos**.

> **Method note:** title-based classification. **Not medical advice.** Indexing ≠ endorsement. Lair is outreach; BudGanja sheets are the method layer.

## Universe

| Channel | Videos | Role |
|---------|--------|------|
| Dr. Lair Ribeiro | **888** | Nearly all food-harm discourse |
| MovReCam | **285** | Cannabis/training — little sugar/gluten/milk |
| CANABinALL | **139** | Scientific cannabis outreach |
| Inspetor | **6** | No harmful-products video series yet |
| **Unique total** | **~1318** | |

**Main finding:** this axis follows **Lair**, not the site video hub.

## Product → harms → videos → sheet

| Product | Video signal | Sheet |
|---------|--------------|-------|
| Sugar / fructose / sweeteners | Strong (38 sugar hits; 30 diabetes theme) | [Sugarcane](${cana}) · [Lair](${lair}) |
| Flour / gluten | Strong (14 wheat/dairy bucket) | [Gluten](${gluten}) |
| Milk / casein | Medium (milk/lactose titles; rarely “casein”) | [Casein](${caseina}) |
| Industrial chocolate | Weak — 3 titles praise **dark** chocolate | [Chocolate](${chocolate}) |
| Oils / fats | High volume (39) | Coconut derivative; soy/margarine sheet missing |

## Verdict

Sheets exist with method; supporting video is almost only Lair. Next site gains: **soft drinks**, **sweeteners**, **refined oils** — where Lair already has mass.

[▶ Harmful products](${hub})
`;

  const contentEs = `## Alcance

Análisis editorial que cruza **daños** de la red Productos nocivos con los **vídeos catalogados** del proyecto.

> **Nota metodológica:** clasificación por título. **No es consejo médico.** Indexar ≠ respaldar.

## Universo

| Canal | Vídeos | Papel |
|-------|--------|-------|
| Dr. Lair Ribeiro | **888** | Casi todo el discurso alimentario de daño |
| MovReCam | **285** | Cannabis/formación — poco azúcar/gluten/leche |
| CANABinALL | **139** | Divulgación científica cannabis |
| Inspetor | **6** | Sin serie propia de productos nocivos en vídeo |
| **Total único** | **~1318** | |

**Hallazgo:** este eje sigue a **Lair**, no al hub de vídeos del sitio.

## Veredicto

Las fichas ya tienen método; el vídeo de apoyo es casi solo Lair. Próximo paso: **refresco**, **edulcorantes** y **aceites refinados**.

[▶ Productos nocivos](${hub})
`;

  return { body, contentEn, contentEs };
}

function buildAnaliseDanosVideosPost() {
  const { body, contentEn, contentEs } = buildAnaliseDanosVideosBodies();
  return nocivoPost({
    title: 'Análise: danos dos produtos nocivos × vídeos catalogados',
    titleEn: 'Analysis: harmful-product harms × catalogued videos',
    titleEs: 'Análisis: daños de productos nocivos × vídeos catalogados',
    excerpt:
      'Onde o acervo de vídeos do projecto sustenta (ou não) a rede açúcar · farinha · leite · chocolate: quase todo o discurso está no Lair; MovReCam/CANABinALL quase não entram neste eixo.',
    excerptEn:
      'Where the project video archive supports (or not) the sugar · flour · milk · chocolate network: almost all discourse is on Lair; MovReCam/CANABinALL barely enter this axis.',
    excerptEs:
      'Dónde el acervo de vídeos del proyecto sostiene (o no) la red azúcar · harina · leche · chocolate: casi todo el discurso está en Lair; MovReCam/CANABinALL casi no entran en este eje.',
    slug: 'inspecao-derivado-analise-danos-videos',
    date: '2026-08-02T04:30:00.000Z',
    series: 'plantas-derivados-risco',
    seriesOrder: 6,
    seriesLabel: 'Análise · danos × vídeos',
    coverImage: '/imagens/inspecoes/analise-danos-videos-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-derivados',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCaseinaPost,
  buildGlutenPost,
  buildChocolatePost,
  buildAnaliseDanosVideosPost,
  buildCaseinaBodies,
  buildGlutenBodies,
  buildChocolateBodies,
  buildAnaliseDanosVideosBodies,
  PRODUTOS_NOCIVOS_POSTS: [
    buildCaseinaPost(),
    buildGlutenPost(),
    buildChocolatePost(),
    buildAnaliseDanosVideosPost()
  ]
};
