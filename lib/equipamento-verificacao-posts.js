'use strict';

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function verificacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || (opts.videoId ? ytThumb(opts.videoId) : 'imagens/background-hero.svg'),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'verificacao-equipamento',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Verificação de equipamentos',
    content_raw: opts.body
  };
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  return post;
}

function buildVentilacaoTendaPost() {
  return verificacaoPost({
    title: 'Inspeção: Sistema de Ventilação da Tenda',
    excerpt:
      'Verificação de fluxo de ar, ruído e trocas térmicas no duto de exaustão e filtro de carvão do laboratório.',
    slug: 'inspecao-ventilacao-tenda',
    date: '2026-06-19T09:30:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Ventilação · laboratório',
    body: `## Escopo

Inspeção do **sistema de ventilação** da tenda principal: exaustor inline, filtro de carvão, duto flexível e entradas passivas.

## Medições

| Ponto | Valor |
|-------|-------|
| Ruído exaustor (1 m) | 46 dB |
| ΔT tenda vs. ambiente | +2,5 °C |
| Renovações estimadas | ~1,2 min⁻¹ |

## Achados

- Duto com curva acentuada reduz fluxo ~15%
- Filtro saturado aumenta ruído em 4 dB vs. filtro novo
- Entrada passiva inferior equilibra pressão negativa

## Recomendações

1. Substituir filtro a cada 6–9 meses de uso contínuo
2. Encurtar duto ou usar cotovelos de raio largo
3. Revisão trimestral documentada no canal

## Status

**Aprovado** — sistema adequado para volume atual da tenda.`
  });
}

const EQUIPAMENTO_VERIFICACAO_POSTS = [buildVentilacaoTendaPost(), buildMarsHydroInspectionPost()];

function buildMarsHydroInspectionPost() {
  return verificacaoPost({
    title: 'Inspeção: Equipamentos Mars Hydro Brasil',
    excerpt:
      'Auditoria do catálogo marshydros.com.br — luzes TS/FC/FC-EVO, tendas, ventilação iFresh e kits com envio nacional, com dimensionamento cruzado ao laboratório.',
    excerptEn:
      'Catalog audit of Mars Hydro gear sold in Brazil — LED lines, grow tents, iFresh ventilation and combo kits, cross-checked with BudGanja lab metrics.',
    excerptEs:
      'Auditoría del catálogo Mars Hydro en Brasil — líneas LED, carpas, ventilación iFresh y kits, contrastada con las métricas del laboratorio BudGanja.',
    slug: 'inspecao-marshydro-brasil',
    videoId: '3IS4Gcl3EIk',
    date: '2026-06-28T14:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Mars Hydro Brasil',
    body: `## Escopo

Inspeção documental e técnica do **catálogo Mars Hydro disponível no Brasil** — luzes LED, tendas de cultivo, ventilação iFresh e kits integrados comercializados com envio nacional, preços em real e garantia declarada pelo fabricante.

> **Nota metodológica:** auditoria editorial independente do Inspetor BudGanja sobre fichas técnicas públicas e dimensionamento cruzado com as calculadoras do laboratório. **Sem afiliação comercial** com a Mars Hydro; preços e SKUs podem variar — confirmar sempre no site oficial antes da compra.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | Mars Hydro (fundada 2009) |
| Loja Brasil | [marshydros.com.br](https://marshydros.com.br) |
| Espelho regional | [marshydrobr.com](https://marshydrobr.com) |
| Idioma / moeda | Português (BR) · R$ |
| Logística declarada | Envio do Brasil · frete grátis · valor final sem taxas extras (conforme vitrine) |
| Garantia LED | Até **5 anos** (séries FC / FC-EVO, conforme ficha) |
| Data da inspeção | 2026-06-28 |

## Hipóteses e método

- **H1:** Um ecossistema fechado (luz + tenda + exaustão + controlador) reduz erros de dimensionamento para cultivadores iniciantes no Brasil.
- **H2:** A separação em séries TS (entrada), FC-E (custo-benefício) e FC-EVO (premium Samsung) permite escolha por orçamento sem sacrificar cobertura útil.
- **H3:** Ventilação iFresh com filtro de carvão e controlador iControl aproxima automação de VPD do que o laboratório mede manualmente.
- **Método:** (1) levantamento do catálogo BR em 2026-06-28; (2) agrupamento por família de produto; (3) validação de cobertura LED × volume da tenda; (4) cruzamento com [inspeções de ambiente indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html), [ventilação](/posts/post-inspecao-ventilacao-tenda.html) e [pesquisa em unidade Mars Hydro](/posts/post-otimizacao-propagacao-vegetal.html).

## Linhas de iluminação LED

| Série | Chips / PPE típico | Perfil | Faixa de potência (catálogo BR) |
|-------|-------------------|--------|----------------------------------|
| **TS** | Placa full-spectrum | Entrada, dimmer, daisy-chain | TS600 · TS1000 (150 W) · TSL2000 (300 W) · TSW2000 (300 W) |
| **FC-E** | Bridgelux ≈ 2,8 µmol/J | Barras — custo-benefício, IP65 em modelos maiores | FC-E1500 (150 W) · FC-E3000 (300 W) · FC-E4800 (480 W) |
| **FC / FC-EVO** | Samsung LM301H / EVO ≈ 2,85–3,14 µmol/J | Barras premium, maior PPF | FC1500-EVO · FC3000 · FC-E6500 / FC6500 (tendas 150×150 cm) |

### Achados — iluminação

1. **Cobertura declarada coerente** — ex.: TS1000: veg. 80×80 cm, floração 70×70 cm; FC-E3000: veg. 100×100 cm, floração 80×80 cm.
2. **Formato barra** (FC/FC-E) favorece PPFD uniforme e dissipação vs. placas TS — alinhado com [Calculadora Luxímetro](/calculadoras/luximetro.html) e [Watts/m²](/calculadoras/cultivo-lab.html?mode=watts-m2).
3. **Combos LED + tenda** pré-dimensionados (70×70, 100×100, 120×60 cm) simplificam primeira compra; validar DLI com fotoperíodo real no [diário de cultivo](/cultivo/).

## Tendas de cultivo (Grow Tent)

| Tamanho (cm) | Uso típico | LED recomendado (vitrine) | Ventilação sugerida |
|--------------|------------|---------------------------|---------------------|
| 60×60×140 | Mudas / 1–2 plantas | TS600, TS1000, FC-E1500 | Exaustor 4″ |
| 70×70×160 | 1–3 plantas | TS1000, FC-E1500, FC1500-EVO | Exaustor 4″ |
| 80×80×160 | 2–4 plantas | TS1000, FC-E1500 | Exaustor 4″ |
| 100×100×180 | 2–4 plantas | FC-E3000, FC3000, TSW2000 | Exaustor 4″ |
| 120×60×180 | Linear / 3–4 plantas | TSL2000, FC4000 | Exaustor 4″ |
| 120×120×200 | 4–6 plantas | FC-E4800, FC4800, TS3000 | Exaustor 6″ + filtro 6″ |
| 150×150×200 | 6–8 plantas | FC-E6500, FC6500, TS3000 | Exaustor 6″ + filtro 6″ |

### Achados — tendas

- Tecido **Oxford 1680D** + Mylar **98%** refletivo — padrão adequado para contenção de luz e microclima.
- Estruturas metálicas com carga declarada (88–155 lb) permitem suspender LED + filtro; verificar ponto de ancoragem no laboratório.
- Etiqueta «aumenta PPFD em 25%» refere-se à reflexão interna — não substitui medição real com sensor.

## Ventilação e automação

| Produto | Diâmetro | Fluxo declarado | Ruído | Controlador |
|---------|----------|-----------------|-------|-------------|
| Exaustor inline clássico | 4″ | 205 CFM | ≈ 26,8 dB(A) | Termostato / velocidade |
| Exaustor inline clássico | 6″ | 402 CFM | ≈ 32 dB(A) | Termostato / velocidade |
| **iFresh** inline | 4″ / 6″ | 205 / 402 CFM | <27 / 32 dB(A) | Velocidade + app (com iControl) |
| Kit iFresh + filtro carvão | 4″ / 6″ | — | — | Carvão recarregável |
| **iControl** (sala) | — | — | — | Wi-Fi: luz, ventilação, VPD, estágios |

### Achados — ventilação

1. **4″ para tendas até ~1 m²** e **6″ para 120×120 cm ou superior** — coerente com renovação ≥1 vol/min da [Inspeção: Ventilação da Tenda](/posts/post-inspecao-ventilacao-tenda.html).
2. Filtros de **carvão ativado australiano** em combos — essencial para odor; trocar conforme saturação (6–9 meses uso contínuo).
3. **iControl** integra temperatura, UR e **VPD** — validar setpoints com [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd).
4. Review independente em PT-BR do sistema iFresh no canal [Jardim HG](/posts/post-inspecao-canal-jardimhg.html) (vídeo abaixo).

## Kits e proposta de valor no Brasil

A vitrine brasileira organiza três caminhos de compra:

1. **Componentes avulsos** — LED, tenda ou ventilação separados (upgrade incremental).
2. **Combos LED + tenda** — ex.: FC1500-EVO + 70×70×160 cm; TS1000 + 70×70 (foco iniciantes).
3. **Kits de ventilação inteligente** — iFresh + filtro + iControl 2025 (automação completa).

Promoções por faixa de carrinho (ex.: desconto a cada R$500 / R$1000) e campanhas sazonais aparecem na home — preços da inspeção **não** são cotação fixa.

## Complementaridade com o Inspetor BudGanja

| Necessidade | Ferramenta / registo BudGanja |
|-------------|------------------------------|
| PPFD / DLI alvo | [Calculadora Luxímetro](/calculadoras/luximetro.html) · [Inspeção: Cultivo Indoor](/posts/post-inspecao-cultivo-indoor-ppfd.html) |
| VPD e clima | [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd) · [Termo-higrômetro](/loja/#cultivo-indoor) |
| Potência por área | [Calculadora Watts/m²](/calculadoras/cultivo-lab.html?mode=watts-m2) |
| Propagação / clones | [Pesquisa: propagação vegetal](/posts/post-otimizacao-propagacao-vegetal.html) (unidade experimental Mars Hydro) |
| Registo de ciclos | [Diário de Cultivo](/cultivo/) |

## Vídeo de referência (review iFresh, PT-BR)

Análise de campo do exaustor inteligente Mars Hydro por criador independente:

@youtube 3IS4Gcl3EIk

## Créditos e transparência

- **Catálogo, imagens, preços e garantias** © Mars Hydro — consultar [marshydros.com.br](https://marshydros.com.br).
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente).
- **Vídeo embed:** © Jardim HG — uso via YouTube conforme termos da plataforma.
- **Finalidade:** orientar cultivadores brasileiros no dimensionamento — **não** constitui endosso comercial nem código de desconto do Inspetor BudGanja.

## Status

**Aprovado como referência de equipamento** — linha coerente para cultivo indoor no Brasil, com boa progressão TS → FC-E → FC-EVO e ecossistema iFresh/iControl alinhado às métricas que o laboratório documenta. Recomendado cruzar sempre fichas técnicas com medições reais antes de fechar fotoperíodo e nutrição.

[▶ Ver catálogo Mars Hydro Brasil](https://marshydros.com.br) · [Todas as inspeções](/biblioteca/inspecoes/)`
  });
}

module.exports = {
  EQUIPAMENTO_VERIFICACAO_POSTS,
  buildVentilacaoTendaPost,
  buildMarsHydroInspectionPost
};
