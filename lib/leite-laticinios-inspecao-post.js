'use strict';

/**
 * Hub Produtos nocivos — leite e laticínios (família do produto).
 * Distinto da ficha Caseína (proteína) e dos derivados da vaca (carnes + lácteo genérico).
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

const SLUG = 'inspecao-derivado-leite';
const COVER = '/imagens/inspecoes/leite-laticinios-cover.jpg';
const DATE = '2026-08-24T11:00:00.000Z';

function buildLeiteLaticiniosBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const vaca = '/animais/vaca/';
  const vacaInsp = '/posts/post-inspecao-animal-vaca.html';
  const vacaDer = '/posts/post-inspecao-derivado-vaca.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const brooke = '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const oms = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const wikiLeite = 'https://pt.wikipedia.org/wiki/Leite';
  const wikiLat = 'https://pt.wikipedia.org/wiki/Latic%C3%ADnio';
  const wikiLac = 'https://pt.wikipedia.org/wiki/Lactose';
  const nova = 'https://www.who.int/news-room/questions-and-answers/item/ultra-processed-foods';

  const body = `## Escopo

Inspeção editorial do **leite** e da família dos **laticínios** — da ordenha à prateleira — como **produto nocivo ao organismo** quando a **dose**, o **processamento** e a **matriz industrial** se cruzam de forma desfavorável. Esta ficha é o **hub da família**: leite fluido, UHT, em pó, queijo, iogurte, manteiga, soro, leite condensado, bebidas lácteas e sorvetes. A proteína isolada fica na [caseína](${caseina}); o animal na [vaca / boi](${vaca}); as carnes processadas nos [derivados da vaca](${vacaDer}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. **Não é aconselhamento médico nem nutricional.** A vaca e o leite fresco tradicional **não** são vilões absolutos; o foco é a **cadeia láctea industrial** (UHT de prateleira, leite em pó, bebidas adoçadas, ultraprocessados) e a literacia de rótulo. Indexar [Lair Ribeiro](${lair}) ≠ endossar cada claim. Sem afiliação com a indústria láctea.

## Não fundir as salas

| Sala | O que inspecciona | Ficha |
|------|-------------------|-------|
| Animal | *Bos taurus* — criação, leite e carne frescos | [Vaca / boi](${vaca}) · [inspeção do animal](${vacaInsp}) |
| Família láctea | Leite + laticínios (esta ficha) | **Aqui** |
| Proteína | Caseína A1/A2, BCM-7, caseinatos | [Caseína](${caseina}) · [Brooke-Taylor 2017](${brooke}) |
| Carnes | Embutidos, processados bovinos | [Derivados da vaca](${vacaDer}) |
| Matriz snack | Leite em pó + açúcar + farinha | [Chocolate industrial](${chocolate}) |

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Leite** e **laticínios** |
| Origem animal | *Bos taurus* — [ficha da vaca](${vaca}) (também cabra/ovelha/búfala na margem) |
| Tipo BudGanja | Produto nocivo — secreção animal → cadeia industrial |
| Produto de risco em foco | Leite UHT/pó + laticínios ultraprocessados (bebidas lácteas, achocolatados, iogurtes adoçados, condensado, requeijão industrial) |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |
| Fontes de partida | [Leite](${wikiLeite}) · [Laticínio](${wikiLat}) · [Lactose](${wikiLac}) · [OMS / ultraprocessados](${nova}) |

## O que é o leite (composição, não moral)

O leite de vaca é sobretudo **água** com **lactose** (açúcar do leite), **gordura**, **caseína** (~80% da proteína), **soro / whey** e minerais (cálcio, fósforo). O laboratório não discute «leite = veneno»; discute **qual leite**, **em que matriz** e **com que dose**.

| Fracção | O que é | Onde aprofundar |
|---------|---------|-----------------|
| Lactose | Dissacarídeo (glicose + galactose) — intolerância ≠ alergia | Esta ficha · [lactose](${wikiLac}) |
| Caseína | Proteína estrutural; variantes A1/A2 | [Caseína](${caseina}) |
| Gordura | Nata, manteiga, queijos gordos — dose | Contexto tradicional vs industrial |
| Soro | Whey — isolados e shakes de marketing | Rótulo + [caseína](${caseina}) (sala irmã) |
| Água / volume | O que a indústria concentra (pó) ou dilui (bebida láctea) | Ultraprocessamento |

**H1:** literacia zootécnica/alimentar separa **ordenha / cultura** de **caixa UHT e leite em pó**.  
**H2:** quem «não tolera leite» pode reagir a **lactose**, a **caseína**, a **ambos** — ou só ao **ultraprocessado adoçado**.  
**H3:** no Brasil a prateleira mistura leite legal (IN/identidade) com **bebida láctea**, achocolatado e iogurte-sobremesa — o nome «leite» no marketing não basta.

## Mapa da família — laticínios

| Produto | O que é | Leitura BudGanja |
|---------|---------|------------------|
| Leite fresco / pasteurizado de curta vida | Ordenha + calor brando; cadeia fria | Baixo a intermédio — contexto e dose |
| Leite UHT / «caixinha» | Ultra-alta temperatura; meses na prateleira | Intermédio — conveniência ≠ leite de tanque |
| Leite em pó / sólidos lácteos | Água retirada; proteína e lactose concentradas | Elevado em snacks, achocolatados, fórmulas |
| Queijo artesanal / pouco processado | Coalho, sal, tempo | Dose e tolerância; não demonizar o ofício |
| Queijo industrial fatiado / processado | Emulsões, sal, aditivos | Intermédio a elevado |
| Iogurte natural / kefir | Fermentação — lactose por vezes reduzida | Contexto; ver açúcar no rótulo |
| Iogurte adoçado / «petit» / sobremesa láctea | Açúcar, aroma, corante | Elevado — [cana](${cana}) + lácteo |
| Manteiga / nata | Gordura láctea | Dose; distinta da bebida láctea |
| Leite condensado / creme de leite doce | Açúcar + sólidos | Elevado — eixo [OMS açúcares livres](${oms}) |
| Bebida láctea / achocolatado | Soro, açúcar, cacau pobre, aroma | Elevado — não é «um copo de leite» |
| Requeijão / cream cheese industriais | Emulsão, sal, amidos | Intermédio a elevado |
| Sorvete / sobremesas geladas | Açúcar + gordura + lácteo + ar | Elevado — matriz [Hall 2019](${hall}) |
| Whey / caseinatos de ginásio | Proteína isolada em dose alta | [Caseína](${caseina}) — rótulo longo |

## Da ordenha à prateleira

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Vaca / ordenha | Secreção do mamífero; leite cru cultural | Baixo — contexto, higiene, dose |
| Pasteurização | Reduz flora; mantém matriz próxima | Intermédio |
| UHT + embalagem asséptica | Meses à temperatura ambiente | Intermédio — padrão BR de prateleira |
| Evaporação / pulverização | Leite em pó, sólidos | Elevado quando entra em ultraprocessados |
| Ultraprocessados lácteos | Açúcar, aromas, soro barato, marketing infantil | Elevado — ver [Hall](${hall}) e [cana](${cana}) |

## Lactose ≠ caseína ≠ açúcar adicionado

Três eixos distintos, muitas vezes fundidos no discurso popular:

1. **Lactose** — açúcar do leite. Intolerância é deficiência de lactase (prevalente em adultos em várias populações). Não é alergia IgE. Iogurte/queijo curado podem ter menos lactose.
2. **Caseína** — proteína. Alergia ao leite (sobretudo em crianças) e hipóteses A1/BCM-7: ficha [caseína](${caseina}) e artigo [Brooke-Taylor](${brooke}). Evidência humana **heterogénea**.
3. **Açúcar adicionado** — o que transforma iogurte e «leite» de caixinha em sobremesa. Mesmo eixo da [cana](${cana}) e da [OMS](${oms}).

O [intestino](${intestino}) processa o que entra: rótulo curto ajuda; slogan «fonte de cálcio» não apaga xarope.

## O que observar nos rótulos (Brasil)

- **Leite** vs **bebida láctea** vs **composto lácteo** — nomes legais diferentes;
- «leite em pó», «sólidos lácteos», «soro de leite», «proteína do leite», caseinatos;
- açúcar / xarope de glicose / maltodextrina no iogurte e no achocolatado;
- lista longa + aroma + corante = ultraprocessado, mesmo com vaca no anúncio;
- alegações «integral», «crescimento», «ossos fortes» que escondem a matriz.

## Cruzamentos — rede Produtos nocivos

| Elo | Papel |
|-----|-------|
| [Vaca / boi](${vaca}) | Origem animal — não o vilão |
| [Caseína](${caseina}) | Proteína dominante; A1/BCM-7 |
| [Chocolate industrial](${chocolate}) | Leite em pó na barra e no bombom |
| [Cana / açúcares livres](${cana}) | Iogurte, condensado, achocolatado |
| [Glúten / farinha](${gluten}) | Bolacha recheada, cereal «de leite» |
| [Lair Ribeiro](${lair}) | Discurso «mito do leite» — indexar ≠ protocolo |
| [Análise danos × vídeos](${analise}) | Onde o acervo fala (ou não) de leite |

**Veredicto editorial:** o leite tradicional e o queijo de ofício merecem contexto cultural; o **leite em pó**, as **bebidas lácteas adoçadas** e os **laticínios ultraprocessados** merecem alerta — com método, sem pânico e sem confundir lactose com caseína.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. leite / laticínios |
| Veredicto | Família láctea inspeccionada como hub; proteína na [caseína](${caseina}); animal na [vaca](${vaca}). |

## Hub

Voltar a [Produtos nocivos](${hub}) e ao [catálogo de animais](/animais/).
`;

  const contentEn = `## Scope

Editorial inspection of **milk** and **dairy** — from milking to the shelf — as a **harmful product** when **dose**, **processing** and the **industrial matrix** collide. This sheet is the **family hub**: fluid milk, UHT, powder, cheese, yogurt, butter, whey, condensed milk, dairy drinks and ice cream. The isolated protein lives in [casein](${caseina}); the animal in [cattle](${vaca}); processed meats in [cattle derivatives](${vacaDer}).

> **Method note:** independent BudGanja audit. **Not medical or dietary advice.** The cow and traditional fresh milk are **not** absolute villains; the focus is the **industrial dairy chain**. Indexing [Lair Ribeiro](${lair}) ≠ endorsing every claim.

## Do not merge rooms

| Room | Sheet |
|------|-------|
| Animal | [Cattle](${vaca}) |
| Dairy family | **This sheet** |
| Protein | [Casein](${caseina}) |
| Meats | [Cattle derivatives](${vacaDer}) |
| Snack matrix | [Industrial chocolate](${chocolate}) |

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Milk** and **dairy** |
| Animal origin | *Bos taurus* — [cattle sheet](${vaca}) |
| Risk focus | UHT/powder milk + ultra-processed dairy |
| Series | Harmful products |
| Inspection date | ${inspected} |

## What milk is

Cow’s milk is mostly **water** plus **lactose**, **fat**, **casein** (~80% of protein), **whey** and minerals. The lab does not argue “milk = poison”; it asks **which milk**, **which matrix**, **which dose**.

**H1:** separate **milking / culture** from **UHT cartons and milk powder**.  
**H2:** “I don’t tolerate milk” may be lactose, casein, both — or only the sweetened ultra-processed drink.  
**H3:** Brazilian shelves mix legal milk with **dairy drinks** and chocolate milks — the word “leite” on the ad is not enough.

## Family map

| Product | BudGanja reading |
|---------|------------------|
| Fresh / short-life pasteurised | Low–intermediate |
| UHT carton | Intermediate — Brazil’s default shelf milk |
| Milk powder / dairy solids | High in snacks and formulas |
| Artisan cheese | Dose and tolerance — do not demonise the craft |
| Sweetened yogurt / dairy dessert | High — [sugarcane](${cana}) + dairy |
| Condensed milk | High — [WHO free sugars](${oms}) |
| Dairy drink / chocolate milk | High — not “a glass of milk” |
| Ice cream | High — [Hall 2019](${hall}) matrix |
| Whey / caseinates | [Casein](${caseina}) |

## Lactose ≠ casein ≠ added sugar

1. **Lactose** — milk sugar; lactase deficiency ≠ IgE allergy.  
2. **Casein** — protein; see [casein](${caseina}) and [Brooke-Taylor 2017](${brooke}). Human evidence **heterogeneous**.  
3. **Added sugar** — what turns yogurt into dessert; same axis as [sugarcane](${cana}).

## Labels to watch (Brazil)

- **Milk** vs **dairy drink** vs **dairy compound**;
- milk powder, dairy solids, whey, caseinates;
- sugar / glucose syrup in yogurt and chocolate milk;
- long lists + flavour = ultra-processed even with a cow in the ad.

## Network

[Cattle](${vaca}) · [Casein](${caseina}) · [Industrial chocolate](${chocolate}) · [Sugarcane](${cana}) · [Gluten](${gluten}) · [Lair](${lair}) · [Harms × videos](${analise})

**Editorial verdict:** traditional milk and craft cheese deserve cultural context; **powder**, **sweetened dairy drinks** and **ultra-processed dairy** deserve an alert — with method, without panic.

## Hub

Return to [Harmful products](${hub}) and the [animals catalog](/animais/).
`;

  const contentEs = `## Alcance

Inspección editorial de la **leche** y los **lácteos** — del ordeño al estante — como **producto nocivo** cuando **dosis**, **procesamiento** y **matriz industrial** se cruzan. Esta ficha es el **hub de la familia**: leche fluida, UHT, en polvo, queso, yogur, mantequilla, suero, condensada, bebidas lácteas y helados. La proteína aislada está en [caseína](${caseina}); el animal en [vaca](${vaca}); las carnes en [derivados de la vaca](${vacaDer}).

> **Nota metodológica:** auditoría independiente BudGanja. **No es consejo médico ni nutricional.** La vaca y la leche fresca tradicional **no** son villanos absolutos; el foco es la **cadena láctea industrial**. Indexar [Lair Ribeiro](${lair}) ≠ respaldar cada claim.

## No fusionar las salas

| Sala | Ficha |
|------|-------|
| Animal | [Vaca](${vaca}) |
| Familia láctea | **Esta ficha** |
| Proteína | [Caseína](${caseina}) |
| Carnes | [Derivados de la vaca](${vacaDer}) |
| Matriz snack | [Chocolate industrial](${chocolate}) |

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Leche** y **lácteos** |
| Origen animal | *Bos taurus* — [ficha](${vaca}) |
| Producto de riesgo | Leche UHT/polvo + lácteos ultraprocesados |
| Serie | Productos nocivos |
| Fecha | ${inspected} |

## Qué es la leche

La leche de vaca es sobre todo **agua** con **lactosa**, **grasa**, **caseína** (~80% de la proteína), **suero** y minerales. El laboratorio no dice «leche = veneno»; pregunta **cuál leche**, **en qué matriz**, **con qué dosis**.

**H1:** separar **ordeño / cultura** de **brik UHT y leche en polvo**.  
**H2:** «no tolero la leche» puede ser lactosa, caseína, ambas — o solo el ultraprocesado azucarado.  
**H3:** en Brasil el estante mezcla leche legal con **bebida láctea** y chocolatadas — el nombre «leite» en el anuncio no basta.

## Mapa de la familia

| Producto | Lectura BudGanja |
|----------|------------------|
| Fresca / pasteurizada de corta vida | Bajo–intermedio |
| UHT | Intermedio — patrón BR de estante |
| Leche en polvo / sólidos lácteos | Alto en snacks y fórmulas |
| Queso artesanal | Dosis y tolerancia — no demonizar el oficio |
| Yogur azucarado / postre lácteo | Alto — [caña](${cana}) + lácteo |
| Leche condensada | Alto — [OMS azúcares libres](${oms}) |
| Bebida láctea / chocolatada | Alto — no es «un vaso de leche» |
| Helado | Alto — matriz [Hall 2019](${hall}) |
| Whey / caseinatos | [Caseína](${caseina}) |

## Lactosa ≠ caseína ≠ azúcar añadido

1. **Lactosa** — azúcar de la leche; déficit de lactasa ≠ alergia IgE.  
2. **Caseína** — proteína; ver [caseína](${caseina}) y [Brooke-Taylor 2017](${brooke}). Evidencia humana **heterogénea**.  
3. **Azúcar añadido** — convierte el yogur en postre; mismo eje que [caña](${cana}).

## Etiquetas a observar (Brasil)

- **Leche** vs **bebida láctea** vs **compuesto lácteo**;
- leche en polvo, sólidos lácteos, suero, caseinatos;
- azúcar / jarabe en yogur y chocolatada;
- lista larga + aroma = ultraprocesado aunque haya vaca en el anuncio.

## Red

[Vaca](${vaca}) · [Caseína](${caseina}) · [Chocolate industrial](${chocolate}) · [Caña](${cana}) · [Gluten](${gluten}) · [Lair](${lair}) · [Daños × vídeos](${analise})

**Veredicto editorial:** la leche tradicional y el queso de oficio merecen contexto; la **leche en polvo**, las **bebidas lácteas azucaradas** y los **lácteos ultraprocesados** merecen alerta — con método, sin pánico.

## Hub

Volver a [Productos nocivos](${hub}) y al [catálogo de animales](/animais/).
`;

  return { body, contentEn, contentEs };
}

function buildLeiteLaticiniosPost() {
  const { body, contentEn, contentEs } = buildLeiteLaticiniosBodies();
  return nocivoPost({
    title: 'Inspeção: Leite e laticínios — da ordenha à prateleira industrial',
    titleEn: 'Inspection: Milk and dairy — from milking to the industrial shelf',
    titleEs: 'Inspección: Leche y lácteos — del ordeño al estante industrial',
    excerpt:
      'Produtos nocivos: leite e laticínios (*Bos taurus*) — UHT, leite em pó, queijo, iogurte adoçado e bebidas lácteas versus leite tradicional. Hub da família; proteína na caseína; animal na vaca.',
    excerptEn:
      'Harmful products: milk and dairy (*Bos taurus*) — UHT, milk powder, cheese, sweetened yogurt and dairy drinks versus traditional milk. Family hub; protein on the casein sheet; animal on the cattle sheet.',
    excerptEs:
      'Productos nocivos: leche y lácteos (*Bos taurus*) — UHT, leche en polvo, queso, yogur azucarado y bebidas lácteas frente a leche tradicional. Hub de la familia; proteína en caseína; animal en la vaca.',
    slug: SLUG,
    date: DATE,
    series: 'animais-derivados-risco',
    seriesOrder: 7,
    seriesLabel: 'Leite / laticínios · nocivo',
    coverImage: COVER,
    sourceUrl: '/animais/vaca/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  SLUG,
  COVER,
  DATE,
  buildLeiteLaticiniosBodies,
  buildLeiteLaticiniosPost
};
