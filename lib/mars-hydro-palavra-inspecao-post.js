'use strict';

/**
 * Palavras · Mars Hydro (rasto marshydrobr)
 * Mars (planeta / deus) + Hydro (água) × objecto eléctrico na tenda.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');
const {
  LINKS: L,
  DATE,
  DATE_ISO,
  pickPalavrasOrder
} = require('./incendio-objetos-shared.js');

const COVER = '/imagens/inspecoes/mars-hydro-palavra-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/Mars_(mythology)';
const ABOUT = 'https://marshydrobr.com/mars-hydro-about-us';
const STORE = 'https://marshydros.com.br';
const MIRROR = 'https://marshydrobr.com';

function buildBodies() {
  const self = L.marsPalavra;
  const body = `## Escopo

Inspeção editorial da palavra **[Mars Hydro](${self})** — marca de LED / tendas / ventilação (fundada **2009**, Shenzhen Meizhi Guang Dian). O pedido de campo chegou *marshydrobr*: é o **rasto de domínio** ([marshydrobr.com](${MIRROR})), não a grafia da marca. Esta ficha cobre o **composto lexical** (*Mars* + *Hydro*), o **espelho BR**, o **choque** (nome de água + planeta de guerra em cima de um painel eléctrico) e a **correção**: marca ≠ [controle de incêndio](${L.cluster}). Elos: [mar](${L.mar}), [água](${L.agua}), [Vivosun](${L.vivosunPalavra}), [catálogo Brasil](${L.marsEquip}), [Valeu !!!](${L.mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [About Mars Hydro BR](${ABOUT}), [marshydros.com.br](${STORE}), [marshydrobr.com](${MIRROR}), [Mars (mitologia)](${WIKI}), [Hydro- (EN)](https://en.wiktionary.org/wiki/hydro-), [água](${L.agua}), [mar](${L.mar}). **A marca não publicou um mito oficial fechado do nome** — inspecionamos as **peças da palavra** com confiança alta e o *storytelling* com confiança média. **Ficha ≠ review de SKU, ≠ código de desconto, ≠ laudo eléctrico.** Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Mars Hydro** |
| Rasto BR | *marshydrobr* · [marshydrobr.com](${MIRROR}) · [marshydros.com.br](${STORE}) |
| Peças | **Mars** (lat. *Mārs* — deus / planeta) + **Hydro** (gr. *hýdōr* ὕδωρ «água») |
| Fabricante | Shenzhen Meizhi Guang Dian Limited — 2009 (confiança **alta**, *about*) |
| Camadas | 1) rasto de URL · 2) marca de indoor · 3) planeta / guerra · 4) água / hidroponia |
| Tipo BudGanja | Palavra — marca × étimo × objecto eléctrico |
| Elo elemento | [mar](${L.mar}) · [água](${L.agua}) · [fogo](${L.fogo}) · [sol](${L.sol}) |
| Elo objecto | [cluster incêndio](${L.cluster}) · [tenda](${L.tenda}) · [fonte](${L.fonte}) · [lâmpada](${L.lampada}) |
| Elo irmã | [Vivosun](${L.vivosunPalavra}) (outro nome-sol / nome-vida no mesmo corredor) |
| Catálogo | [Inspeção: Equipamentos Mars Hydro Brasil](${L.marsEquip}) |
| Data | ${DATE} |

**O que é o objecto:** não é a série FC-EVO nem o preço em real. É o **vocábulo** que, no BR, chega primeiro como *marshydrobr* (teclado / URL) e aponta para um **kit de cultivo**. Inspecionar Mars Hydro = não deixar a vitrine comer o étimo, nem o étimo (*água*, *Marte*) romantizar o driver.

## 2. Peças da palavra (não misturar)

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **Mars** | Lat. *Mārs* — deus romano da guerra; planeta vermelho; mês *March* / março (mesmo étimo) | Alta (léxico) |
| **Hydro** | Prefixo internacional ← gr. *hýdōr* «água»; em indoor evoca **hidroponia** | Alta |
| **Mars Hydro** (marca) | Nome comercial inglês sobre fabricante chinês (2009) | Alta (empresa) |
| **marshydrobr** | Domínio / rasto oral-teclado BR («Mars Hydro Brasil») | Alta (uso vivo) |
| **Mito do nome** | Guerra + água + horticultura espacial — leitura lab, **não** comunicado oficial encontrado | Média (hipótese) |
| **Choque útil** | A marca da **luz eléctrica** leva **água** no nome e **Marte** no prefixo | Alta (leitura lab) |

**H1:** no BR, *marshydrobr* entra como **atalho de loja**, não como planeta.  
**H2:** *Hydro* não molha o cabo — é prefixo; [água](${L.agua}) no quadro é o contrário de controle.  
**H3:** o planeta [Marte](${WIKI}) é seco e bélico; a tenda é húmida e eléctrica — o nome **não** inspeciona o circuito.

## 3. Oralidade e domínio BR

*Mars Hydro* em inglês lê-se «márs háidrou». No português do Brasil o ouvido cola: **Mars-ráidro**, **Marisidro**, **marshydrobr** (sem espaços, como URL).

| Forma | Papel | Leitura lab |
|-------|-------|-------------|
| **Mars Hydro** | Âncora | Grafia comercial internacional |
| **marshydrobr** | Rasto de campo / domínio | Inspeciona-se; aponta ao espelho BR |
| **marshydros.com.br** | Loja em real | Vitrine — confirmar SKU lá |
| **Meizhi Guang Dian** | Razão social | Camada jurídica; ≠ romance de Marte |

**Tese:** *Mars Hydro* é a marca; *marshydrobr* é o rasto BR; *Hydro* é água no papel, não no disjuntor.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| URL | «É a Mars Hydro do Brasil, logo oficial e seguro» | Espelho regional de catálogo — ver [verificação](${L.marsEquip}) |
| *Hydro* | Hidroponia / água protege do [fogo](${L.fogo}) | Prefixo grego; o [incêndio](${L.incendio}) indoor é sobretudo **eléctrico** |
| *Mars* | Ciência espacial / força | Deus / planeta no nome; o painel é um [objecto](${L.objetosPalavra}) |
| Kit TS/FC | Ecossistema fechado = zero [risco](${L.risco}) | LED + [tenda](${L.tenda}) + [exaustor](${L.exaustor}) + [fonte](${L.fonte}) no mesmo recinto |
| BudGanja | Ficha de fã / hate | Mapa: étimo × vitrine × [cluster](${L.cluster}) |

**H-parece:** Mars Hydro = água marciana que cuida da planta.  
**H-é:** Mars Hydro = **marca** sobre **Marte + água**; o ofício é dimensionar [luz](${L.luz}) e **não** sobrecarregar a [extensão](${L.extensao}).

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Comprei marshydrobr, está inspecionado» | A [verificação](${L.marsEquip}) é **catálogo**, não laudo da tua casa |
| «Hydro = hidroponia = não pega fogo» | Cultivo em água ≠ cabo molhado; ver [cluster](${L.cluster}) |
| «É a melhor LED» | Esta ficha **não** ranqueia; cruzar [Luxímetro](${L.lux}) |
| «Marte é frio, o LED também» | Dissipador e [fonte](${L.fonte}) aquecem dentro da [tenda](${L.tenda}) |
| «Faça diferente» (anúncio) | [Valeu !!!](${L.mantra}) **neste** circuito |

### Ofício correcto

1. Se disser **Mars Hydro**, saber se fala de **palavra**, de **marca** ou **deste** painel na barra.  
2. *marshydrobr* no teclado → **Mars Hydro** na ficha; URL para confirmar preço.  
3. Tratar o kit como [objectos](${L.objetosPalavra}): [fonte](${L.fonte}), [tenda](${L.tenda}), [interruptor](${L.interruptor}).  
4. Cruzar a [verificação de equipamentos](${L.marsEquip}) com o [mapa de incêndio](${L.cluster}).  
5. Fechar com [Valeu !!!](${L.mantra}).

**Veredicto correção:** **Mars Hydro ≠ certificado de incêndio.** O nome leva *água* e *Marte*; o lab leva o cabo à coluna **perigo** até o [interruptor](${L.interruptor}) estar no sítio.

## 6. Rede · Valeu !!!

| Recurso | Papel |
|---------|-------|
| [Cluster incêndio](${L.cluster}) | Mapa perigo × corte × nome |
| [Catálogo Mars Hydro Brasil](${L.marsEquip}) | Séries TS / FC / iFresh |
| [Vivosun](${L.vivosunPalavra}) | Irmã de corredor (outro nome, mesma tenda) |
| [Mar](${L.mar}) · [água](${L.agua}) | Étimo *Mars* / *Hydro* sem magia |
| [Tenda](${L.tenda}) · [fonte](${L.fonte}) · [extensão](${L.extensao}) | Objectos relacionados |
| [Xiaomi](${L.xiaomi}) | Mesmo método anti-pedestal de marca |
| [Valeu !!!](${L.mantra}) | Fecho |

## Limites

- Não é cotação, garantia nem lista de SKUs (isso vive na [verificação](${L.marsEquip}) e no sítio oficial).  
- Não afirma um «porquê» interno do marketing que a empresa não publicou.  
- Sem afiliação; preços mudam.

## Status

**Aprovado** — **Mars Hydro** fichado (*marshydrobr* → Mars Hydro): *Mars* + *Hydro*; rasto BR; anti-pedestal; elo [cluster de incêndio](${L.cluster}); fecho [Valeu !!!](${L.mantra}).

[▶ Palavras](${L.hub}) · [▶ Cluster incêndio](${L.cluster}) · [▶ Catálogo BR](${L.marsEquip}) · [▶ Vivosun](${L.vivosunPalavra}) · [▶ Valeu !!!](${L.mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[Mars Hydro](${self})** — 2009 Shenzhen LED / tent brand. Field trail *marshydrobr* is the Brazil domain, not the brand spelling. Covers *Mars* + *Hydro*, the BR mirror, and the correction: brand ≠ [fire control](${L.cluster}). Links: [mar](${L.mar}), [água](${L.agua}), [Vivosun](${L.vivosunPalavra}), [Brazil catalog](${L.marsEquip}), [Valeu !!!](${L.mantra}).

> Sources: [${ABOUT}](${ABOUT}). **No closed official name-myth found** — pieces of the word are high confidence; marketing story is medium. **Not a SKU review or electrical certificate.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Mars Hydro** · trail *marshydrobr* |
| Pieces | Lat. *Mārs* + Gr. *hýdōr* “water” |
| Date | ${DATE} |

## 2. Seems vs is

**Seems:** water + Mars = safe grow.  
**Is:** a **brand name** on electrical [objects](${L.objetosPalavra}) in a [tent](${L.tenda}). *Hydro* does not wet the breaker.

## 3. BudGanja correction

**Mars Hydro ≠ fire certificate.** *marshydrobr* → **Mars Hydro**. Inspect [fonte](${L.fonte}), [tenda](${L.tenda}), [interruptor](${L.interruptor}). Close with [Valeu !!!](${L.mantra}).

## Status

**Approved** — *Mars* + *Hydro*; BR trail; [fire cluster](${L.cluster}); [Valeu !!!](${L.mantra}).

[▶ Words](${L.hub}) · [▶ Fire cluster](${L.cluster}) · [▶ Catalog](${L.marsEquip}) · [▶ Valeu !!!](${L.mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Mars Hydro](${self})** — marca 2009 (Shenzhen). El rastro *marshydrobr* es el dominio Brasil, no la grafía. Cubre *Mars* + *Hydro* y la corrección: marca ≠ [control de incendio](${L.cluster}). Vínculos: [mar](${L.mar}), [água](${L.agua}), [Vivosun](${L.vivosunPalavra}), [catálogo](${L.marsEquip}), [¡Valeu !!!](${L.mantra}).

> Fuentes: [${ABOUT}](${ABOUT}). **No hay mito oficial cerrado del nombre.** No es reseña de SKU ni laudo eléctrico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Mars Hydro** · rastro *marshydrobr* |
| Piezas | Lat. *Mārs* + gr. *hýdōr* «agua» |
| Fecha | ${DATE} |

## 2. Parece × es

**Parece:** agua + Marte = cultivo seguro.  
**Es:** un **nombre de marca** sobre [objetos](${L.objetosPalavra}) eléctricos en una [tenda](${L.tenda}).

## 3. Corrección BudGanja

**Mars Hydro ≠ certificado de incendio.** *marshydrobr* → **Mars Hydro**. Cerrar con [¡Valeu !!!](${L.mantra}).

## Estado

**Aprobado** — *Mars* + *Hydro*; rastro BR; [clúster](${L.cluster}); [¡Valeu !!!](${L.mantra}).

[▶ Palabras](${L.hub}) · [▶ Clúster incendio](${L.cluster}) · [▶ Catálogo](${L.marsEquip}) · [▶ ¡Valeu !!!](${L.mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMarsHydroPalavraPost() {
  const { body, contentEn, contentEs } = buildBodies();
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-mars-hydro', 157);
  return makePalavra({
    title: 'Inspeção: Mars Hydro — Marte, água e o rasto marshydrobr',
    titleEn: 'Inspection: Mars Hydro — Mars, water, and the marshydrobr trail',
    titleEs: 'Inspección: Mars Hydro — Marte, agua y el rastro marshydrobr',
    excerpt:
      'Palavras: «Mars Hydro» (*marshydrobr*) — Mārs + hýdōr; marca ≠ controle de incêndio; elos tenda, fonte, Vivosun; Valeu !!!',
    excerptEn:
      'Words: “Mars Hydro” (*marshydrobr*) — Mārs + hýdōr; brand ≠ fire control; tent, driver, Vivosun; Valeu !!!',
    excerptEs:
      'Palabras: «Mars Hydro» (*marshydrobr*) — Mārs + hýdōr; marca ≠ control de incendio; carpa, fuente, Vivosun; ¡Valeu !!!',
    slug: 'inspecao-palavra-mars-hydro',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Mars Hydro · palavra',
    coverImage: COVER,
    sourceUrl: ABOUT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMarsHydroPalavraPost };
