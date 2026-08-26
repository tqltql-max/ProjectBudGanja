'use strict';

/**
 * Verificação · catálogo Vivosun (revenda BR)
 * Paralelo à inspeção Mars Hydro Brasil — sem afiliação comercial.
 */

const {
  LINKS: L,
  DATE,
  DATE_ISO,
  pickVerificacaoOrder
} = require('./incendio-objetos-shared.js');

function verificacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'verificacao-equipamento',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Verificação de objectos',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const COVER = '/imagens/inspecoes/vivosun-verificacao-cover.jpg';
const SITE = 'https://vivosun.com/';
const STORY = 'https://vivosun.com/en-GB/brand-story';

function buildVivosunVerificacaoBodies() {
  const body = `## Escopo

Inspeção documental do **catálogo Vivosun visível no Brasil** — luzes LED (AeroLight, VS), tendas, ventilação (AeroWave / duto / carvão), controladores GrowHub e kits vendidos por **revenda especializada**, com cruzamento às métricas do laboratório e ao [mapa de objectos perigosos para controle de incêndio](${L.cluster}).

> **Nota metodológica:** auditoria editorial independente. Fontes: [vivosun.com](${SITE}), [brand story](${STORY}), vitrines públicas BR (revenda — SKUs e preços **datados e variáveis**). **Não há loja-espelho oficial inspecionada aqui** (contraste: [Mars Hydro Brasil](${L.marsEquip}) em marshydros.com.br). **Sem afiliação comercial.** Ficha ≠ ranking «melhor que Mars Hydro». Palavra da marca: [Vivosun](${L.vivosunPalavra}).

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | Vivosun (também *VIVOSUN*) — *vivo* + *sun* |
| Sede pública | Ontario, CA (site) · mercado EUA / global |
| Chegada ao BR | **Revenda** (grow shops / e-commerce) — confirmar bivolt 110/220 V |
| Linha do tempo (marca) | ~2009 HPS · 2014 tenda · 2015 filtro/exaustor · 2021 LED · 2022 Smart / AeroLight (Red Dot) |
| Data da inspeção | ${DATE} |

## Hipóteses e método

- **H1:** O ecossistema GrowHub + AeroLight reduz erros de fotoperíodo para iniciantes — **se** o circuito da casa aguentar a soma (LED + ventoinha + [exaustor](${L.exaustor})).
- **H2:** A tenda Vivosun (Oxford / Mylar, tamanhos 60×60 até 150×150 e rectangulares) é **irmã de ofício** da tenda Mars Hydro: recinto, não cofre — ver [tenda](${L.tenda}).
- **H3:** Automação (app) ≠ [controle de incêndio](${L.cluster}).
- **Método:** (1) leitura do catálogo oficial e da revenda BR; (2) agrupamento por família; (3) cruzamento com [Luxímetro](${L.lux}), [VPD](${L.vpd}), [ventilação](${L.ventilacao}); (4) elo lexical [Vivosun](${L.vivosunPalavra}).

## Linhas de iluminação LED

| Família | Perfil (catálogo / revenda) | Notas lab |
|---------|-----------------------------|-----------|
| **AeroLight** (SE / Spectrum Tunable, ~100–200 W) | LED + **ventoinha de circulação no painel**; díodos Samsung / Osram conforme SKU; GrowHub | Dois motores de calor no mesmo corpo — ver [fonte](${L.fonte}) e [exaustor](${L.exaustor}) (circulação ≠ extração) |
| **VS** (ex. VS1500 ~150 W, ~2,8 µmol/J) | Placa / barra com dimmer; Samsung LM301 em fichas de revenda | Cobertura a validar com [Luxímetro](${L.lux}) — *claim* ≠ PPFD no dossel |
| **VSFD** / barras removíveis | Upgrade modular | Daisy-chain: somar watts na [extensão](${L.extensao}) |

### Achados — iluminação

1. AeroLight é o **diferencial de marketing** (Red Dot 2022): ar no dossel **não** substitui o inline que troca o volume da [tenda](${L.tenda}).
2. Espectro «tipo sol» é metáfora — a palavra [sol](${L.sol}) na marca não mede DLI.
3. Combos com GrowHub E25 / E42A aparecem na revenda BR — confirmar **tensão** e compatibilidade do controlador **antes** de empilhar SKUs.

## Tendas de cultivo

Tamanhos recorrentes na revenda BR: 60×60, 80×80, 90×90, 100×100, 120×120, 150×150, rectangulares 120×60, multicâmara. Uso típico alinhado à tabela Mars Hydro (mudas → 6–8 plantas). Tecido e Mylar: **claims** de catálogo; o lab trata a tenda como [objecto](${L.tenda}) que **fecha calor**.

## Ventilação e automação

| Família | Papel | Elo |
|---------|-------|-----|
| Inline + filtro de carvão (linha desde ~2015) | Extração e odor | [Exaustor](${L.exaustor}) · [ventilação](${L.ventilacao}) |
| **AeroWave** (ex. E6 clipe / oscilante) | Circulação; Wi-Fi com GrowHub | Circulação ≠ renovação do volume |
| **GrowHub** (E25, A42/A42A, etc.) | Luz, fluxo, clima via app | Relé e cabo **continuam** objectos do [cluster](${L.cluster}) |

4″ vs 6″: a mesma regra da [inspeção Mars Hydro](${L.marsEquip}) e da [ventilação do lab](${L.ventilacao}) — ~1 m² com 4″; 120×120 cm ou mais com 6″, validar renovação.

## Contraste com Mars Hydro Brasil

| Campo | Mars Hydro | Vivosun |
|-------|------------|---------|
| Palavra | [Mars + Hydro](${L.marsPalavra}) · rasto *marshydrobr* | [vivo + sun](${L.vivosunPalavra}) |
| Loja BR | Espelho [marshydros.com.br](https://marshydros.com.br) | **Revenda** |
| Smart | iFresh / iControl | GrowHub / AeroLight / AeroWave |
| Esta inspeção | Catálogo em real, envio declarado nacional | Catálogo global + vitrine de revenda |

Não é veredicto de «quem ganha». É **dois nomes**, dois caminhos de compra, **o mesmo circuito** na parede.

## Complementaridade com o Inspetor BudGanja

| Necessidade | Recurso |
|-------------|---------|
| Origem da palavra | [Vivosun](${L.vivosunPalavra}) |
| Mapa de incêndio | [Objectos perigosos](${L.cluster}) |
| PPFD / DLI | [Luxímetro](${L.lux}) |
| VPD | [Calculadora VPD](${L.vpd}) |
| Watts / área | [Watts/m²](${L.watts}) |
| Ar da tenda | [Ventilação](${L.ventilacao}) |
| Irmã de corredor | [Mars Hydro Brasil](${L.marsEquip}) |

## Créditos e transparência

- Catálogo, imagens e patentes © Vivosun — consultar [vivosun.com](${SITE}).
- Inspeção: Inspetor BudGanja (laboratório digital independente).
- **Não** constitui endosso nem código de desconto.

## Status

**Aprovado como referência de equipamento (revenda BR)** — linha coerente de tenda + LED + ar + app, com o mesmo aviso do [cluster](${L.cluster}): marca ≠ laudo eléctrico. Cruzar sempre fichas técnicas com medições reais.

[▶ Palavra Vivosun](${L.vivosunPalavra}) · [▶ Cluster incêndio](${L.cluster}) · [▶ Mars Hydro](${L.marsEquip}) · [▶ Catálogo oficial](${SITE}) · [Todas as inspeções](${L.hubAll})
`;

  const contentEn = `## Scope

Documentary inspection of the **Vivosun catalog as seen in Brazil** — AeroLight / VS LEDs, tents, AeroWave ventilation, GrowHub — sold through **resellers** (no first-party .com.br mirror here). Cross-check with lab metrics and the [fire-control object map](${L.cluster}).

> **No commercial affiliation.** Word sheet: [Vivosun](${L.vivosunPalavra}). Sister catalog: [Mars Hydro Brasil](${L.marsEquip}).

## Object

| Field | Value |
|-------|-------|
| Brand | Vivosun (*vivo* + *sun*) |
| Brazil path | Reseller · confirm 110/220 V |
| Date | ${DATE} |

AeroLight puts a circulation fan in the panel — that is **not** tent air exchange ([exaustor](${L.exaustor})). GrowHub automation ≠ fire control. Size fans like the [ventilation sheet](${L.ventilacao}).

## Status

**Approved as equipment reference (BR reseller)** — brand ≠ electrical certificate.

[▶ Word](${L.vivosunPalavra}) · [▶ Fire cluster](${L.cluster}) · [▶ Mars Hydro](${L.marsEquip})
`;

  const contentEs = `## Alcance

Inspección documental del **catálogo Vivosun visible en Brasil** — AeroLight / VS, carpas, AeroWave, GrowHub — por **revenda** (sin espejo .com.br propio aquí). Cruzar con el [mapa de incendio](${L.cluster}).

> **Sin afiliación comercial.** Palabra: [Vivosun](${L.vivosunPalavra}). Hermana: [Mars Hydro Brasil](${L.marsEquip}).

## Objeto

| Campo | Valor |
|-------|-------|
| Marca | Vivosun (*vivo* + *sun*) |
| Brasil | Revenda · confirmar 110/220 V |
| Fecha | ${DATE} |

AeroLight no sustituye la extracción de la [tenda](${L.tenda}). La app no es control de incendio.

## Estado

**Aprobado como referencia de equipo (revenda BR)** — marca ≠ laudo eléctrico.

[▶ Palabra](${L.vivosunPalavra}) · [▶ Clúster](${L.cluster}) · [▶ Mars Hydro](${L.marsEquip})
`;

  return { body, contentEn, contentEs };
}

function buildVivosunVerificacaoPost() {
  const { body, contentEn, contentEs } = buildVivosunVerificacaoBodies();
  const seriesOrder = pickVerificacaoOrder('inspecao-vivosun', 3);
  return verificacaoPost({
    title: 'Inspeção: Equipamentos Vivosun',
    titleEn: 'Inspection: Vivosun equipment',
    titleEs: 'Inspección: equipos Vivosun',
    excerpt:
      'Auditoria do catálogo Vivosun visível no Brasil — AeroLight, tendas, AeroWave e GrowHub por revenda, cruzada ao laboratório e ao mapa de incêndio.',
    excerptEn:
      'Audit of the Vivosun catalog as seen in Brazil — AeroLight, tents, AeroWave and GrowHub via resellers, cross-checked with the lab and the fire map.',
    excerptEs:
      'Auditoría del catálogo Vivosun visible en Brasil — AeroLight, carpas, AeroWave y GrowHub por revenda, cruzada con el laboratorio y el mapa de incendio.',
    slug: 'inspecao-vivosun',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Vivosun',
    coverImage: COVER,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVivosunVerificacaoPost,
  buildVivosunVerificacaoBodies
};
