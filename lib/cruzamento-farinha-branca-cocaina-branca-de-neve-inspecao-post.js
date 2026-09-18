'use strict';

/**
 * Inspeção-cruzamento: farinha branca × cocaína × Branca de Neve — riscos à saúde.
 * Objecto = o mapa das «brancas» (pó, conto, gíria), não receita nem protocolo.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
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

function buildCruzamentoFarinhaBrancaCocainaNeveBodies() {
  const inspected = '2026-09-17';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const trigo = '/posts/post-inspecao-planta-trigo.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const soja = '/posts/post-inspecao-planta-soja.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const coisas = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const droga = '/posts/post-inspecao-palavra-droga.html';
  const entorp = '/posts/post-inspecao-palavra-entorpecente-narcotico.html';
  const craque = '/posts/post-inspecao-palavra-craque.html';
  const nappo = '/posts/post-inspecao-solange-nappo.html';
  const cebrid = '/posts/post-inspecao-cebrid.html';
  const henman = '/posts/post-inspecao-figura-anthony-henman.html';
  const diamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const disney = '/posts/post-inspecao-canal-disneyjr.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const wieser = '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html';

  const body = `## Escopo

Inspeção editorial do **cruzamento** **farinha branca × cocaína × Branca de Neve** no eixo de **[riscos](${risco}) à saúde**. O objecto **não** é uma substância só nem um filme só: é o **mapa das brancas** — o pó da prateleira, o pó da gíria e o conto que vende a brancura como inocência.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem protocolo de uso.** Farinha branca **não** é cocaína: a semelhança é de **cor, refino e história de «pureza»**, não de química. A ficha **não** ensina extração, preparação nem consumo. Folha de coca (*Erythroxylum*) ≠ cloridrato. Trigo integral ≠ farinha refinada. Conto dos Grimm ≠ gíria de rua. Sem afiliação Disney, indústria alimentar ou tráfico.

Pergunta-guia: *quando o branco parece limpo, o que o laboratório inspeciona — o grão, o alcalóide ou a maçã do conto?*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Cruzamento das brancas** — mapa, não obra única |
| Eixo 1 | [Trigo](${trigo}) (*Triticum*) → [Glúten / farinha](${gluten}) — farinha **branca** refinada |
| Eixo 2 | Cocaína — derivado industrial da folha de coca; gíria **neve** / **branca** / **Branca de Neve** |
| Eixo 3 | **Branca de Neve** — conto (Grimm) e adaptação Disney; maçã que parece oferta |
| Tipo BudGanja | Artes — inspeção-cruzamento × produtos nocivos × [risco](${risco}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o laboratório já separa **planta / grão / folha** do **isolado branco** — [trigo](${trigo}) → [farinha](${gluten}); cana → [açúcar](${cana}); soja → [isolado](${soja}); folha de coca → cocaína ([Henman](${henman}) / *Mama Coca*: coca indígena ≠ indústria da cocaína).  
**H2:** a **orelha cola** «farinha branca», «neve» e «Branca de Neve»; o ofício é **cortar** a homofonia — literacia, não colapso.  
**H3:** o conto da Branca de Neve (maçã bela, veneno dentro) é a **parábola**: o branco que parece seguro pode ser o presente que adoece. Disney [empacota](${disney}) o conto; [os ricos transformam](${ricos}) o folclore e o grão.  
**H4:** os **riscos à saúde** ficam em **colunas separadas** — ultraprocessado de farinha ([Hall 2019](${hall})) ≠ dependência/cardiovascular da cocaína ([CEBRID](${cebrid}) / [Nappo](${nappo})). Misturar as colunas seria mentir.

Passos:

1. Nomear as três brancas sem as fundir.  
2. Ler o refino (extrair → branquear → vender).  
3. Ler o conto (Grimm / Disney) como mapa, não como dose.  
4. Tabelar riscos à saúde **por eixo**.  
5. Declarar o que esta ficha **não** é.

## As três brancas — o que cada uma é

| Branca | O que é | O que não é | Ficha |
|--------|---------|-------------|-------|
| **Farinha branca** | [Trigo](${trigo}) (*Triticum*) com farelo e gérmen removidos; veículo quotidiano do [glúten](${gluten}) em pão industrial, bolacha, massa | Não é cocaína; não é o grão integral | [Trigo](${trigo}) · [Glúten / farinha](${gluten}) · [Barriga de Trigo](${barriga}) · [Wieser 2020](${wieser}) |
| **Cocaína** | Alcalóide isolado da folha de *Erythroxylum coca* — estimulante, substância controlada; na rua também **neve**, **branca**, às vezes **Branca de Neve** | Não é a folha de coca mascada/chá andino; não é farinha | [droga](${droga}) · [entorpecente](${entorp}) · [craque](${craque}) · [Nappo](${nappo}) · [Henman](${henman}) |
| **Branca de Neve** | Conto (irmãos Grimm, séc. XIX) e filme Disney (1937): a menina «branca como a neve»; a rainha oferece a **maçã** bela e envenenada | Não é substância; não é manual. A gíria que rouba o nome é **código**, não o conto | [Alice](${alice}) (outro conto Disney de «coma-me») · [Disney Jr.](${disney}) |

## Refino — como os ricos transformam o verde em branco

Mesmo ciclo da [História das Coisas](${coisas}): extrair → fazer → vender → descartar o custo no corpo.

| Etapa | Farinha | Coca (folha → pó) | Conto |
|-------|---------|-------------------|-------|
| Matéria | Grão de trigo | Folha de coca (uso tradicional andino ≠ este eixo) | Conto oral / Grimm |
| Transformação | Moagem + refino: tira fibra, branqueia | Isolado industrial — **não descrito aqui** | Disney 1937: cor, canção, merchandising |
| Produto «branco» | Farinha de prateleira, pão fofo | Pó / gíria neve | Pele «branca como a neve»; maçã reluzente |
| Quem lucra | Indústria de ultraprocessados | Mercado ilícito + a máquina que inventou o isolado | Estúdio / marca |
| Quem paga | Intestino, glicemia, hábito | Coração, sono, dependência, polícia/saúde pública | Infância no ecrã; a metáfora fica no corpo |

Frase-mapa: [Como os ricos transformam as coisas](${ricos}).

## Branca de Neve — a maçã que parece oferta

No conto, a rainha **disfarça o veneno de presente**. A maçã é vermelha e brilhante; a vítima é a figura da inocência branca.

Leitura BudGanja (literacia, não alegoria clínica):

- O **branco** do nome promete limpeza.  
- O **presente** da prateleira (pão fofo, pó «puro», desenho fofo) pede a mesma inspeção que a maçã.  
- [Alice](${alice}) já avisou: «Eat Me» / «Drink Me» no livro são **metáfora**; aqui a maçã também.  
- [Disney Jr.](${disney}) e o [ecrã × crianças](${celular}) entram como **embalagem** do conto — não como ficha de substância.

A gíria que chama a cocaína de **Branca de Neve** ou **neve** **rouba o conto**. O laboratório devolve o conto ao ofício de inspeção: *parece branco; pergunta o que foi extraído.*

## Riscos à saúde — colunas separadas

**Não** somar as linhas. Cada eixo tem a sua prova.

| Eixo | Riscos que o laboratório nomeia | Limite da evidência |
|------|--------------------------------|---------------------|
| Farinha branca / [glúten](${gluten}) | Matriz ultraprocessada ([Hall 2019](${hall})); fibra retirada; carga glicémica; eixos clínicos **celíaca / sensibilidade / alergia ao trigo** — sob orientação profissional | Trigo integral **não** explica sozinho a obesidade populacional ([Wieser](${wieser})); Davis/[Barriga de Trigo](${barriga}) é discurso a auditar |
| Cocaína | Estimulante: coração, pressão, sono, ansiedade, dependência; preparação fumada entra na ficha [craque](${craque}) **sem** método. Saúde colectiva: [CEBRID](${cebrid}), [Nappo](${nappo}) | Esta ficha **não** posologia, **não** redução de danos passo a passo, **não** comparação «farinha = cocaína» como facto químico |
| Branca de Neve (conto / ecrã) | Risco **simbólico e de infância**: a beleza do presente; tempo de ecrã; merchandising que normaliza «branco = seguro» | Não é toxicologia do desenho. Veneno da maçã = **enredo**, não ficha de planta |

Irmã de prateleira: [açúcar branco da cana](${cana}) — outro isolado branco da mesma família de refino.

## O que esta inspeção recusa

- Receita, extração, corte, dose ou via de uso de cocaína.  
- Dizer que pão é droga no sentido penal ou farmacológico.  
- Romantizar folha de coca **ou** romantizar o pó.  
- Usar o conto para assustar crianças sem literacia: o ofício é **nomear o disfarce**.

## Elos

| Ficha | Papel |
|-------|-------|
| [Glúten / farinha](${gluten}) | Farinha branca na série produtos nocivos |
| [Soja](${soja}) | Outro isolado branco/industrial vs feijão |
| [Cana / açúcar](${cana}) | Açúcar branco — irmã de refino |
| [Craque](${craque}) | Homofonia crack × craque; preparação de cocaína **nomeada**, não ensinada |
| [Henman](${henman}) · [Diamba Sarabamba](${diamba}) | Coca indígena vs indústria da cocaína |
| [Nappo](${nappo}) · [CEBRID](${cebrid}) | Pesquisa pública crack / cocaína / cannabis |
| [Como os ricos transformam](${ricos}) | Ciclo extrair–fazer–vender |
| [Alice](${alice}) · [Disney Jr.](${disney}) | Conto / embalagem Disney; «coma-me» literário |

## Status

**Publicado** — cruzamento das brancas (2026-09-17). Veredicto: a orelha cola farinha, neve e conto; o laboratório **separa** química, gíria e parábola — e mantém o [risco](${risco}) à saúde em colunas.

[▶ Glúten / farinha](${gluten}) · [▶ Risco](${risco}) · [▶ Craque](${craque}) · [▶ Ricos](${ricos}) · [▶ Artes](${hub})`;

  const contentEn = `## Scope

Editorial **cross-map**: **white flour × cocaine × Snow White** on the **[health-risk](${risco})** axis. The object is the map of “whites” — shelf powder, slang powder and the tale that sells whiteness as innocence.

> **Not medical advice. Not a use protocol.** White flour **is not** cocaine. The likeness is **colour, refining and a “purity” story**, not chemistry. This sheet **does not** teach extraction, preparation or use. Coca leaf ≠ cocaine hydrochloride. Whole wheat ≠ refined flour. Grimm tale ≠ street slang.

## The three whites

| White | What it is | What it is not |
|-------|------------|----------------|
| **White flour** | Refined wheat; daily vehicle of [gluten](${gluten}) | Not cocaine; not the whole grain |
| **Cocaine** | Isolated alkaloid; slang **snow** / **white** / sometimes **Snow White** | Not the Andean leaf; not flour |
| **Snow White** | Grimm tale + Disney 1937; the beautiful poisoned apple | Not a substance. Slang that steals the name is a **code** |

## Refining

Same cycle as [The Story of Stuff](${coisas}): extract → make → sell → dump the cost on the body. Phrase-map: [How the rich transform things](${ricos}). Grain, leaf and folk tale all get **whitened** for the shelf or the screen.

## Health risks — separate columns

| Axis | What the lab names | Limit |
|------|--------------------|-------|
| White flour / [gluten](${gluten}) | Ultra-processed matrix ([Hall 2019](${hall})); fibre stripped; celiac / sensitivity axes | Whole wheat is not the sole obesity villain ([Wieser](${wieser})) |
| Cocaine | Stimulant: heart, sleep, dependence; smoked prep named on [craque](${craque}) **without** method. Public health: [CEBRID](${cebrid}) / [Nappo](${nappo}) | No dose, no how-to, no “flour = cocaine” as chemistry |
| Snow White (tale / screen) | Symbolic and childhood risk: the gift that looks safe; [Disney Jr.](${disney}) packaging | The apple’s poison is **plot**, not a plant sheet |

Sibling white: [cane sugar](${cana}).

## Status

**Published** — cross-map of the whites (2026-09-17). The ear glues flour, snow and the tale; the lab **cuts** chemistry, slang and parable apart.

[▶ Gluten / flour](${gluten}) · [▶ Risk](${risco}) · [▶ Arts](${hub})`;

  const contentEs = `## Alcance

**Cruce** editorial: **harina blanca × cocaína × Blancanieves** en el eje de **[riesgos](${risco}) para la salud**. El objeto es el mapa de las «blancas» — el polvo del estante, el polvo de la jerga y el cuento que vende la blancura como inocencia.

> **No es consejo médico ni protocolo de uso.** La harina blanca **no** es cocaína. El parecido es **color, refinado e historia de «pureza»**, no química. Esta ficha **no** enseña extracción ni consumo.

## Las tres blancas

| Blanca | Qué es | Qué no es |
|--------|--------|-----------|
| **Harina blanca** | Trigo refinado; vehículo del [gluten](${gluten}) | No es cocaína; no es el grano integral |
| **Cocaína** | Alcaloide aislado; jerga **nieve** / **blanca** / a veces **Blancanieves** | No es la hoja andina; no es harina |
| **Blancanieves** | Cuento Grimm + Disney 1937; la manzana bella y envenenada | No es sustancia. La jerga que roba el nombre es **código** |

## Refinado

Mismo ciclo de [La Historia de las Cosas](${coisas}): extraer → hacer → vender → descargar el costo en el cuerpo. [Cómo los ricos transforman las cosas](${ricos}).

## Riesgos — columnas separadas

| Eje | Lo que nombra el laboratorio | Límite |
|-----|------------------------------|--------|
| Harina / [gluten](${gluten}) | Matriz ultraprocesada ([Hall 2019](${hall})); fibra retirada | El trigo integral no explica solo la obesidad ([Wieser](${wieser})) |
| Cocaína | Estimulante: corazón, sueño, dependencia; [craque](${craque}) nombra sin método. [CEBRID](${cebrid}) / [Nappo](${nappo}) | Sin dosis, sin receta, sin «harina = cocaína» como química |
| Blancanieves | Riesgo simbólico e infancia: el regalo que parece seguro; [Disney Jr.](${disney}) | El veneno de la manzana es **trama** |

Hermana blanca: [azúcar de caña](${cana}).

## Estado

**Publicado** — cruce de las blancas (2026-09-17).

[▶ Gluten / harina](${gluten}) · [▶ Riesgo](${risco}) · [▶ Artes](${hub})`;

  return { body, contentEn, contentEs };
}

function buildCruzamentoFarinhaBrancaCocainaNevePost() {
  const { body, contentEn, contentEs } = buildCruzamentoFarinhaBrancaCocainaNeveBodies();
  return artePost({
    title:
      'Inspeção: Cruzamento — farinha branca, cocaína e Branca de Neve (riscos à saúde)',
    titleEn:
      'Inspection: Cross-map — white flour, cocaine and Snow White (health risks)',
    titleEs:
      'Inspección: Cruce — harina blanca, cocaína y Blancanieves (riesgos para la salud)',
    excerpt:
      'Artes · cruzamento: farinha branca × cocaína × Branca de Neve — o branco do refino, a gíria «neve» e a maçã do conto; riscos à saúde em colunas, sem colapsar comida e droga.',
    excerptEn:
      'Arts · cross-map: white flour × cocaine × Snow White — refined white, slang “snow” and the tale’s apple; health risks in separate columns, without collapsing food and drug.',
    excerptEs:
      'Artes · cruce: harina blanca × cocaína × Blancanieves — el blanco del refinado, la jerga «nieve» y la manzana del cuento; riesgos en columnas, sin colapsar comida y droga.',
    slug: 'inspecao-cruzamento-farinha-branca-cocaina-branca-de-neve',
    date: '2026-09-17T22:50:00.000Z',
    seriesOrder: 14,
    seriesLabel: 'Cruzamento · brancas',
    coverImage: '/imagens/inspecoes/cruzamento-farinha-branca-neve-cover.jpg',
    sourceUrl: '/posts/post-inspecao-derivado-gluten.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCruzamentoFarinhaBrancaCocainaNevePost,
  buildCruzamentoFarinhaBrancaCocainaNeveBodies
};
