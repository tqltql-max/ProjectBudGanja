'use strict';

/**
 * Inspeções «Derivados de risco» ligados a animais de produção.
 * Slug inspecao-derivado-* → tipagem hub 'derivado' (partilha chip com plantas).
 * Série: animais-derivados-risco.
 *
 * Método: não demonizar o animal; documentar produto fresco vs desvio industrial.
 */

function derivadoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'animais-derivados-risco',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Derivados de risco',
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

function buildBodies(opts) {
  const {
    nome,
    nomeEn,
    nomeEs,
    sci,
    ficha,
    produto,
    produtoEn,
    produtoEs,
    inspected
  } = opts;

  const body = `## Escopo

Inspeção editorial dos **derivados industriais** associados a **${nome}** (*${sci}*) — separar o animal e o produto fresco da **cadeia ultraprocessada** (aditivos, sal, açúcares, nitritos, emulsões e marketing).

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem nutricional.** O animal não é o vilão; o foco é o **desvio industrial** e o padrão de consumo. Ficha do animal: [${nome}](${ficha}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Animal de origem | **${nome}** (*${sci}*) |
| Tipo BudGanja | Derivado de risco — animal → produto industrial |
| Produto de risco em foco | ${produto} |
| Data da inspeção | ${inspected} |

## Do animal ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Animal / produto fresco | Criação e corte/coleta com baixo processamento | Baixo — alimento/cultura, contexto tradicional |
| Processamento | Moagem, cura, emulsão, panificação, adoçamento | Intermediário — concentra sal, gordura, açúcar |
| Ultraprocessados | Nuggets, embutidos industriais, empanados, xaropes | Elevado — aditivos + densidade calórica + dose |

**H1:** literacia zootécnica/alimentar ajuda a separar **animal** de **marca industrial**.  
**H2:** o dano discute-se em **dose + frequência + matriz ultraprocessada**, não na existência do animal.  
**H3:** ligar cada derivado à ficha \`/animais/\` evita tratar o produto como química abstracta sem origem.

## O que observar nos rótulos

- lista de ingredientes longa e códigos de aditivos;
- sal, nitritos/nitratos, açúcares e amidos modificados;
- alegações de marketing que escondem o grau de processamento;
- distância entre o produto fresco da ficha e o item de prateleira.

## Ficha do animal

Origem no catálogo: [${nome}](${ficha})

## Hub

Voltar às [inspeções de derivados](/biblioteca/inspecoes/#inspecoes-derivados) e ao [catálogo de animais](/animais/).
`;

  const contentEn = `## Scope

Editorial inspection of **industrial derivatives** linked to **${nomeEn}** (*${sci}*) — separate the animal and fresh product from the **ultra-processed chain**.

> **Method note:** independent BudGanja audit. **Not medical or dietary advice.** The animal is not the villain; the focus is industrial diversion. Animal sheet: [${nomeEn}](${ficha}).

## Inspected object

| Field | Value |
|-------|-------|
| Source animal | **${nomeEn}** (*${sci}*) |
| BudGanja type | Risk derivative — animal → industrial product |
| Risk product in focus | ${produtoEn} |
| Inspection date | ${inspected} |

## From animal to risk product

| Stage | What happens | Editorial risk |
|-------|--------------|----------------|
| Animal / fresh product | Husbandry and low-processing cut/collection | Low — food/culture |
| Processing | Grinding, curing, emulsion, breading, sweetening | Intermediate |
| Ultra-processed | Nuggets, industrial cured meats, breaded items, syrups | High |

## Catalog sheet

[${nomeEn}](${ficha})

## Hub

Return to [derivative inspections](/biblioteca/inspecoes/#inspecoes-derivados) and the [animals catalog](/animais/).
`;

  const contentEs = `## Alcance

Inspección editorial de **derivados industriales** asociados a **${nomeEs}** (*${sci}*) — separar el animal y el producto fresco de la **cadena ultraprocesada**.

> **Nota metodológica:** auditoría independiente BudGanja. **No es consejo médico ni nutricional.** El animal no es el villano. Ficha: [${nomeEs}](${ficha}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Animal de origen | **${nomeEs}** (*${sci}*) |
| Tipo BudGanja | Derivado de riesgo — animal → producto industrial |
| Producto de riesgo | ${produtoEs} |
| Fecha | ${inspected} |

## Del animal al producto de riesgo

| Etapa | Qué ocurre | Riesgo editorial |
|-------|------------|------------------|
| Animal / fresco | Cría y corte de bajo procesamiento | Bajo |
| Procesamiento | Molido, cura, emulsión, empanado | Intermedio |
| Ultraprocesados | Nuggets, embutidos, empanados, jarabes | Alto |

## Ficha

[${nomeEs}](${ficha})

## Hub

Volver a [derivados](/biblioteca/inspecoes/#inspecoes-derivados) y al [catálogo de animales](/animais/).
`;

  return { body, contentEn, contentEs };
}

const inspected = '2026-08-01';

const SPECS = [
  {
    seriesOrder: 2,
    slug: 'inspecao-derivado-galinha',
    seriesLabel: 'Galinha · derivado',
    sourceUrl: '/animais/galinha/',
    nome: 'Galinha',
    nomeEn: 'Chicken',
    nomeEs: 'Gallina / pollo',
    sci: 'Gallus gallus domesticus',
    ficha: '/animais/galinha/',
    produto: 'Nuggets, embutidos e ultraprocessados de frango',
    produtoEn: 'Chicken nuggets, sausages and ultra-processed poultry',
    produtoEs: 'Nuggets, embutidos y ultraprocesados de pollo',
    title: 'Inspeção: Derivados da galinha — ultraprocessados e química industrial',
    titleEn: 'Inspection: Chicken derivatives — ultra-processed foods and industrial chemistry',
    titleEs: 'Inspección: Derivados del pollo — ultraprocesados y química industrial',
    excerpt:
      'Derivados de risco: separar galinha/ovo/carne frescos de nuggets e ultraprocessados industriais de frango.',
    excerptEn:
      'Risk derivatives: separate fresh chicken/egg/meat from industrial nuggets and ultra-processed poultry.',
    excerptEs:
      'Derivados de riesgo: separar pollo/huevo/carne frescos de nuggets y ultraprocesados industriales.'
  },
  {
    seriesOrder: 3,
    slug: 'inspecao-derivado-vaca',
    seriesLabel: 'Vaca · derivado',
    sourceUrl: '/animais/vaca/',
    nome: 'Vaca / boi',
    nomeEn: 'Cattle',
    nomeEs: 'Vaca / buey',
    sci: 'Bos taurus',
    ficha: '/animais/vaca/',
    produto: 'Carnes processadas e laticínios ultraprocessados (ver também caseína)',
    produtoEn: 'Processed meats and ultra-processed dairy (see also casein)',
    produtoEs: 'Carnes procesadas y lácteos ultraprocesados (ver también caseína)',
    title: 'Inspeção: Derivados da vaca — carnes processadas e laticínios industriais',
    titleEn: 'Inspection: Cattle derivatives — processed meats and industrial dairy',
    titleEs: 'Inspección: Derivados de la vaca — carnes procesadas y lácteos industriales',
    excerpt:
      'Produtos nocivos / derivados: bovino fresco versus carnes processadas e laticínios industriais. Elo com a ficha da caseína.',
    excerptEn:
      'Harmful products / derivatives: fresh cattle products versus processed meats and industrial dairy. Links the casein sheet.',
    excerptEs:
      'Productos nocivos / derivados: bovino fresco frente a carnes procesadas y lácteos industriales. Vínculo con la ficha de caseína.'
  },
  {
    seriesOrder: 4,
    slug: 'inspecao-derivado-porco',
    seriesLabel: 'Porco · derivado',
    sourceUrl: '/animais/porco/',
    nome: 'Porco',
    nomeEn: 'Pig',
    nomeEs: 'Cerdo',
    sci: 'Sus scrofa domesticus',
    ficha: '/animais/porco/',
    produto: 'Embutidos industriais (sal, nitritos, ultraprocessamento)',
    produtoEn: 'Industrial cured meats (salt, nitrites, ultra-processing)',
    produtoEs: 'Embutidos industriales (sal, nitritos, ultraprocesamiento)',
    title: 'Inspeção: Derivados do porco — embutidos e química industrial',
    titleEn: 'Inspection: Pork derivatives — cured meats and industrial chemistry',
    titleEs: 'Inspección: Derivados del cerdo — embutidos y química industrial',
    excerpt:
      'Derivados de risco: carne de porco fresca e charcutaria artesanal versus embutidos industriais.',
    excerptEn:
      'Risk derivatives: fresh pork and artisan charcuterie versus industrial cured meats.',
    excerptEs:
      'Derivados de riesgo: cerdo fresco y charcutería artesanal frente a embutidos industriales.'
  },
  {
    seriesOrder: 5,
    slug: 'inspecao-derivado-peixe',
    seriesLabel: 'Tilápia · derivado',
    sourceUrl: '/animais/peixe-tilapia/',
    nome: 'Tilápia',
    nomeEn: 'Tilapia',
    nomeEs: 'Tilapia',
    sci: 'Oreochromis niloticus',
    ficha: '/animais/peixe-tilapia/',
    produto: 'Empanados, sticks e ultraprocessados de peixe',
    produtoEn: 'Breaded fish, sticks and ultra-processed fish products',
    produtoEs: 'Empanados, sticks y ultraprocesados de pescado',
    title: 'Inspeção: Derivados do peixe — empanados e ultraprocessados',
    titleEn: 'Inspection: Fish derivatives — breaded products and ultra-processed foods',
    titleEs: 'Inspección: Derivados del pescado — empanados y ultraprocesados',
    excerpt:
      'Derivados de risco: filé fresco de tilápia versus empanados e ultraprocessados de peixe.',
    excerptEn:
      'Risk derivatives: fresh tilapia fillet versus breaded and ultra-processed fish products.',
    excerptEs:
      'Derivados de riesgo: filete fresco de tilapia frente a empanados y ultraprocesados.'
  },
  {
    seriesOrder: 6,
    slug: 'inspecao-derivado-abelha',
    seriesLabel: 'Abelha · derivado',
    sourceUrl: '/animais/abelha/',
    nome: 'Abelha',
    nomeEn: 'Honey bee',
    nomeEs: 'Abeja',
    sci: 'Apis mellifera',
    ficha: '/animais/abelha/',
    produto: 'Mel adulterado / xaropes e açúcares industriais rotulados como mel',
    produtoEn: 'Adulterated honey / industrial syrups labeled as honey',
    produtoEs: 'Miel adulterada / jarabes industriales etiquetados como miel',
    title: 'Inspeção: Derivados da abelha — mel adulterado e açúcares industriais',
    titleEn: 'Inspection: Bee derivatives — adulterated honey and industrial sugars',
    titleEs: 'Inspección: Derivados de la abeja — miel adulterada y azúcares industriales',
    excerpt:
      'Derivados de risco: mel de qualidade e própolis versus mel adulterado com xaropes industriais.',
    excerptEn:
      'Risk derivatives: quality honey and propolis versus honey adulterated with industrial syrups.',
    excerptEs:
      'Derivados de riesgo: miel de calidad y propóleo frente a miel adulterada con jarabes.'
  }
];

const ANIMAIS_DERIVADOS_INSPECOES_POSTS = SPECS.map((spec) => {
  const bodies = buildBodies(
    Object.assign({ inspected }, spec)
  );
  return derivadoPost({
    title: spec.title,
    titleEn: spec.titleEn,
    titleEs: spec.titleEs,
    excerpt: spec.excerpt,
    excerptEn: spec.excerptEn,
    excerptEs: spec.excerptEs,
    slug: spec.slug,
    date: inspected + 'T22:30:00.000Z',
    seriesOrder: spec.seriesOrder,
    seriesLabel: spec.seriesLabel,
    sourceUrl: spec.sourceUrl,
    body: bodies.body,
    contentEn: bodies.contentEn,
    contentEs: bodies.contentEs
  });
});

module.exports = {
  ANIMAIS_DERIVADOS_INSPECOES_POSTS,
  buildAllAnimaisDerivadosPosts: () => ANIMAIS_DERIVADOS_INSPECOES_POSTS.slice()
};
