'use strict';

/**
 * Palavras · Vivosun
 * vivo (vivo / vivus) + sun (sol) × objecto eléctrico na tenda.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');
const {
  LINKS: L,
  DATE,
  DATE_ISO,
  pickPalavrasOrder
} = require('./incendio-objetos-shared.js');

const COVER = '/imagens/inspecoes/vivosun-palavra-cover.jpg';
const ABOUT = 'https://vivosun.com/help/about-us';
const STORY = 'https://vivosun.com/en-GB/brand-story';
const SITE = 'https://vivosun.com/';

function buildBodies() {
  const self = L.vivosunPalavra;
  const body = `## Escopo

Inspeção editorial da palavra **[Vivosun](${self})** — marca de indoor (luz, [tenda](${L.tenda}), ventilação, *smart grow*). O pedido de campo: *faça o mesmo para vivosun* (depois de *marshydrobr*). Esta ficha cobre o **composto** (*vivo* + *sun*), o **rasto BR** (revenda, não loja-espelho própria como a Mars), o **choque** («sol vivo» dentro de uma caixa eléctrica) e a **correção**: marca ≠ [controle de incêndio](${L.cluster}). Elos: [sol](${L.sol}), [luz](${L.luz}), [Mars Hydro](${L.marsPalavra}), [catálogo](${L.vivosunEquip}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [About Vivosun](${ABOUT}), [Brand story](${STORY}), [vivosun.com](${SITE}), [vivo (PT)](https://pt.wiktionary.org/wiki/vivo), [sun (EN)](https://en.wiktionary.org/wiki/sun), [sol](${L.sol}). A empresa **não fecha** o nome numa frase única de marketing; o lab lê as **peças** (confiança alta) e o *story* (Los Angeles / Ontario CA, linha desde ~**2009** em HPS, tenda **2014**, LED **2021**, AeroLight Red Dot **2022**) com confiança **alta–média**. **Ficha ≠ review, ≠ ranking, ≠ laudo eléctrico.** Sem afiliação comercial. No Brasil a marca chega por **revendedores** (não por um *vivosun.com.br* oficial inspecionado aqui).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Vivosun** (grafia comercial: também *VIVOSUN*) |
| Rasto BR | *vivo sun* · *vivo-sun* · *vivosum* (teclado) |
| Peças | **vivo** (lat. *vīvus* / PT-ES-IT «vivo») + **sun** (ing. «sol») |
| Leitura lab | **sol vivo** — [luz](${L.luz}) de cultivo como astro portátil |
| Sede pública | Ontario, Califórnia (endereço no *site*); origem de mercado Los Angeles | confiança **alta–média** (*about* / loja) |
| Linha do tempo (marca) | ~2009 HPS → 2014 tenda → 2015 filtro/exaustor → 2021 LED → 2022 GrowHub / AeroLight | confiança **alta** (*brand story*) |
| Tipo BudGanja | Palavra — marca × étimo × objecto eléctrico |
| Elo astro | [sol](${L.sol}) · [luz](${L.luz}) · [lâmpada](${L.lampada}) |
| Elo irmã | [Mars Hydro](${L.marsPalavra}) (*marshydrobr*) |
| Elo perigo | [cluster incêndio](${L.cluster}) · [tenda](${L.tenda}) · [fonte](${L.fonte}) · [exaustor](${L.exaustor}) |
| Catálogo | [Inspeção: Equipamentos Vivosun](${L.vivosunEquip}) |
| Data | ${DATE} |

**O que é o objecto:** não é o AeroLight nem o GrowHub. É o **vocábulo** que cola **vida** e **sol** num único nome inglês-romance. Inspecionar Vivosun = não deixar o *Love Growing Green* comer o étimo, nem o «sol vivo» apagar o driver.

## 2. Peças da palavra (não misturar)

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **vivo** | Lat. *vīvus* «vivo»; PT/ES/IT *vivo* — vida, vigor | Alta |
| **sun** | Inglês *sun* ← germânico; o astro — ficha [sol](${L.sol}) | Alta |
| **Vivosun** | Palavra-valise de marketing: *living sun* / «sol vivo» | Alta (leitura lab) |
| **Logo V** | Folha + gota de água × placa LED (*about* de rebrand) | Alta–média (comunicado da marca) |
| **Mito** | Sol que vive para a planta — slogan, não física | Média (mapa cultural) |
| **Choque útil** | O «sol» da tenda é **watt + [fonte](${L.fonte})** num recinto fechado | Alta (leitura lab) |

**H1:** no BR, Vivosun entra como **atalho de grow shop** (AeroLight, tenda cinzenta), não como astro.  
**H2:** *vivo* não torna o painel um ser vivo — é adjetivo no nome.  
**H3:** *sun* aponta ao [sol](${L.sol}); o [incêndio](${L.incendio}) aponta ao cabo. As duas palavras **não se fundem**.

## 3. Oralidade BR

Inglês *Vivosun* ≈ «váivo-sân». No português: **vivo-sã**, **vivo sun**, **vivosum** (m de teclado).

| Forma | Papel | Leitura lab |
|-------|-------|-------------|
| **Vivosun** | Âncora | Grafia comercial |
| **VIVOSUN** | Caixa alta de marketing | O mesmo objecto |
| *vivosum* | Lapso | Inspeciona-se; não se publica como certa |
| Revenda BR | Grow shops (ex. catálogos públicos) | Camada comercial — **não** é loja-espelho da marca |

**Tese:** *Vivosun* é a marca; *sol vivo* é a leitura lab; *vivosum* é rasto.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| Nome | Sol vivo = planta feliz e fogo impossível | Portmanteau sobre [objectos](${L.objetosPalavra}) eléctricos |
| AeroLight | Ventoinha no painel = clima resolvido | LED + motor no mesmo corpo — dois aquecimentos |
| Smart / app | Automação = segurança | Relé e cabo **continuam** no recinto |
| «Faça o mesmo que a Mars» | Clone de ficha de fã | Mesmo **método**: étimo × vitrine × [cluster](${L.cluster}) |
| Loja BR | «É a Vivosun do Brasil» | **Revenda**; confirmar SKU e tensão (bivolt) no vendedor |

**H-parece:** Vivosun = sol doméstico inofensivo.  
**H-é:** Vivosun = **marca** (*vivo*+*sun*); o ofício é tratar o painel como [lâmpada](${L.lampada}) com [fonte](${L.fonte}) dentro da [tenda](${L.tenda}).

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «É sol vivo, não queima» | [Sol](${L.sol}) de verdade fica a 150 milhões de km; este está a 30 cm do dossel |
| «Red Dot = seguro contra incêndio» | Prémio de **design** ≠ laudo eléctrico |
| «Igual à Mars Hydro» | Irmãs de corredor; nomes e vitrines **distintos** — ver [Mars Hydro](${L.marsPalavra}) |
| «Comprei no grow shop, está inspecionado» | A [verificação](${L.vivosunEquip}) é catálogo, não a tua parede |
| «Faça diferente» | [Faça o melhor!](${L.mantra}) **neste** cabo |

### Ofício correcto

1. Se disser **Vivosun**, saber se fala de **palavra**, de **marca** ou **deste** AeroLight / tenda.  
2. *vivosum* → **Vivosun**.  
3. Tratar como [objectos](${L.objetosPalavra}) do [cluster](${L.cluster}): [fonte](${L.fonte}), [exaustor](${L.exaustor}), [interruptor](${L.interruptor}).  
4. Cruzar a [verificação](${L.vivosunEquip}) com [Luxímetro](${L.lux}) / [VPD](${L.vpd}).  
5. Fechar com [Faça o melhor!](${L.mantra}).

**Veredicto correção:** **Vivosun ≠ astro e ≠ certificado.** *Vivo*+*sun* é nome; o lab inspeciona o watt e o gesto de [desligar](${L.ligar}).

## 6. Rede · Faça o melhor!

| Recurso | Papel |
|---------|-------|
| [Cluster incêndio](${L.cluster}) | Mapa perigo × corte × nome |
| [Catálogo Vivosun](${L.vivosunEquip}) | AeroLight, VS, tendas, GrowHub |
| [Mars Hydro](${L.marsPalavra}) | Irmã (*marshydrobr*) |
| [Sol](${L.sol}) · [luz](${L.luz}) · [lâmpada](${L.lampada}) | O astro no nome |
| [Tenda](${L.tenda}) · [fonte](${L.fonte}) · [exaustor](${L.exaustor}) | Objectos relacionados |
| [Faça o melhor!](${L.mantra}) | Fecho |

## Limites

- Não é lista de preços BR (revenda muda).  
- Não funde Vivosun com Mars Hydro num único SKU.  
- Sem afiliação.

## Status

**Aprovado** — **Vivosun** fichado: *vivo* + *sun* («sol vivo»); rasto BR; anti-pedestal; elo [cluster de incêndio](${L.cluster}); fecho [Faça o melhor!](${L.mantra}).

[▶ Palavras](${L.hub}) · [▶ Cluster incêndio](${L.cluster}) · [▶ Catálogo](${L.vivosunEquip}) · [▶ Mars Hydro](${L.marsPalavra}) · [▶ Faça o melhor!](${L.mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[Vivosun](${self})** — indoor brand (*vivo* + *sun* = living sun). Same method as [Mars Hydro](${L.marsPalavra}). Brand ≠ [fire control](${L.cluster}). In Brazil it arrives through **resellers**, not a first-party .com.br mirror inspected here. Links: [sol](${L.sol}), [catalog](${L.vivosunEquip}), [Do your best!](${L.mantra}).

> Sources: [${STORY}](${STORY}). **Not a SKU review.** Red Dot is design, not an electrical certificate.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Vivosun** · trail *vivosum* |
| Pieces | Lat./PT *vivo* + EN *sun* |
| Timeline | ~2009 HPS · 2014 tent · 2021 LED · 2022 AeroLight |
| Date | ${DATE} |

## 2. Seems vs is

**Seems:** a harmless living sun.  
**Is:** a **portmanteau** on electrical [objects](${L.objetosPalavra}) in a [tent](${L.tenda}).

## 3. BudGanja correction

**Vivosun ≠ star and ≠ fire certificate.** Inspect [fonte](${L.fonte}) and the [switch](${L.interruptor}). Close with [Do your best!](${L.mantra}).

## Status

**Approved** — *vivo* + *sun*; [fire cluster](${L.cluster}); [Do your best!](${L.mantra}).

[▶ Words](${L.hub}) · [▶ Fire cluster](${L.cluster}) · [▶ Catalog](${L.vivosunEquip}) · [▶ Do your best!](${L.mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Vivosun](${self})** — marca indoor (*vivo* + *sun* = sol vivo). Mismo método que [Mars Hydro](${L.marsPalavra}). Marca ≠ [control de incendio](${L.cluster}). En Brasil llega por **revendedores**. Vínculos: [sol](${L.sol}), [catálogo](${L.vivosunEquip}), [¡Haz lo mejor!](${L.mantra}).

> Fuentes: [${STORY}](${STORY}). **No es reseña de SKU.** Red Dot es diseño, no laudo eléctrico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Vivosun** · rastro *vivosum* |
| Piezas | Lat./PT *vivo* + EN *sun* |
| Fecha | ${DATE} |

## 2. Parece × es

**Parece:** un sol vivo inofensivo.  
**Es:** un **portmanteau** sobre [objetos](${L.objetosPalavra}) eléctricos en una [tenda](${L.tenda}).

## 3. Corrección BudGanja

**Vivosun ≠ astro y ≠ certificado de incendio.** Cerrar con [¡Haz lo mejor!](${L.mantra}).

## Estado

**Aprobado** — *vivo* + *sun*; [clúster](${L.cluster}); [¡Haz lo mejor!](${L.mantra}).

[▶ Palabras](${L.hub}) · [▶ Clúster incendio](${L.cluster}) · [▶ Catálogo](${L.vivosunEquip}) · [▶ ¡Haz lo mejor!](${L.mantra})
`;

  return { body, contentEn, contentEs };
}

function buildVivosunPalavraPost() {
  const { body, contentEn, contentEs } = buildBodies();
  const seriesOrder = pickPalavrasOrder('inspecao-palavra-vivosun', 158);
  return makePalavra({
    title: 'Inspeção: Vivosun — sol vivo, marca e o cabo na tenda',
    titleEn: 'Inspection: Vivosun — living sun, brand, and the cable in the tent',
    titleEs: 'Inspección: Vivosun — sol vivo, marca y el cable en la carpa',
    excerpt:
      'Palavras: «Vivosun» (*vivo* + *sun*) — sol vivo no nome; marca ≠ controle de incêndio; elos Mars Hydro, tenda, fonte; Faça o melhor!',
    excerptEn:
      'Words: “Vivosun” (*vivo* + *sun*) — living sun in the name; brand ≠ fire control; Mars Hydro, tent, driver; Do your best!',
    excerptEs:
      'Palabras: «Vivosun» (*vivo* + *sun*) — sol vivo en el nombre; marca ≠ control de incendio; Mars Hydro, carpa, fuente; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-vivosun',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Vivosun · palavra',
    coverImage: COVER,
    sourceUrl: STORY,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildVivosunPalavraPost };
