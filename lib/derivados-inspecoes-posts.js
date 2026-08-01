'use strict';

/**
 * Inspeções «Derivados de risco»: origem botânica de plantas transformadas
 * em produtos industriais associados a dano à saúde.
 * Série: plantas-derivados-risco — tipagem no hub → 'derivado'.
 *
 * Método BudGanja: não demonizar a planta; documentar origem, uso tradicional
 * e o desvio industrial (refinação, ultraprocessamento, consumo excessivo).
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
    series: 'plantas-derivados-risco',
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

function buildCanaDeAcucarBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const who =
    'https://www.who.int/news-room/fact-sheets/detail/sugars-and-dental-caries';
  const whoGuideline =
    'https://www.who.int/publications/i/item/9789241549028';

  const body = `## Escopo

Inspeção editorial e documental da **cana-de-açúcar** (*Saccharum officinarum* L.) — resgatar a **origem botânica** e o papel histórico da planta, e distinguir a espécie do **açúcar refinado** e dos ultraprocessados açucarados associados a dano à saúde quando o consumo é excessivo.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em fontes históricas e de saúde pública (FAO/origem agrícola, OMS sobre açúcares livres). **Não é aconselhamento médico.** A planta não é o vilão; o foco é a **transformação industrial** e o padrão de consumo moderno. Sem afiliação com a indústria açucareira ou com qualquer marca.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Cana-de-açúcar** |
| Nome científico | *Saccharum officinarum* L. |
| Família | Poaceae (gramíneas) |
| Tipo BudGanja | Derivado de risco — planta → produto industrial |
| Produto de risco em foco | Açúcar refinado / açúcares livres em ultraprocessados |
| Data da inspeção | ${inspected} |

## Origem botânica (resgatar a planta)

A cana-de-açúcar é uma gramínea tropical perene, cultivada pelo caule rico em sacarose. A domesticação remonta à **Nova Guiné / Sudeste Asiático**; a cultura espalhou-se pela Índia e pelo mundo islâmico medieval antes de chegar à Europa e, com a expansão colonial, às Américas.

No **Brasil**, a cana tornou-se eixo económico desde o século XVI (engenhos, escravidão e ciclo do açúcar) — uma das plantas mais marcantes da história agrária do país. O caldo, o melaço e usos artesanais fazem parte da cultura alimentar; o problema moderno não é a existência da planta, e sim a escala de **refinação** e a presença omnipresente de **açúcares livres** em bebidas e alimentos ultraprocessados.

## Da planta ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Planta | Colheita do colmo; sacarose natural no caldo | Baixo — alimento/cultura, contexto tradicional |
| Processamento | Moagem, clarificação, cristalização | Intermediário — concentra açúcar |
| Refinação industrial | Açúcar branco/cristal de alta pureza | Elevado quando o consumo diário explode |
| Ultraprocessados | Refrigerantes, snacks, doces industriais | Elevado — açúcares livres + densidade calórica |

**Hipótese BudGanja (H1):** a literacia botânica (conhecer a origem) ajuda a separar **planta e território** de **produto industrial**.  
**H2:** o dano à saúde discute-se sobretudo no eixo **açúcares livres + dose + frequência**, não no facto de a cana existir.  
**H3:** documentar a origem brasileira da cana evita o erro de tratar o açúcar como «química abstracta» sem história.

## O que a saúde pública destaca (açúcares livres)

A **OMS** recomenda limitar os **açúcares livres** (monossacáridos e dissacáridos adicionados a alimentos/bebidas, e açúcares naturais do mel, xaropes e sumos) — tipicamente a menos de **10%** da energia diária, com benefício adicional abaixo de **5%** em alguns desfechos (ex.: cárie dentária). Consumo elevado associa-se a:

- cárie dentária;
- excesso de energia e risco de ganho de peso;
- padrões alimentares pobres em fibra e micronutrientes quando o ultraprocessado substitui comida real.

Fontes de partida (não exaustivo): [OMS — sugars and dental caries](${who}) · [Guideline: Sugars intake for adults and children (WHO, 2015)](${whoGuideline}).

**Veredicto editorial:** a cana merece crédito como planta e como capítulo da história brasileira; o **açúcar refinado em excesso** merece alerta — com método, sem moralismo vazio.

## Avaliação BudGanja

### Forças desta ficha
- Separa origem botânica de produto industrial.
- Liga história colonial/agrária do Brasil ao tema contemporâneo de saúde pública.
- Abre a série **Derivados de risco** com critérios claros para próximas espécies (ex.: tabaco).

### Limites honestos
- Não substitui nutricionista, médico ou guidelines clínicos individuais.
- Não inventa causalidade para cada doença crônica — aponta o consenso de saúde pública sobre açúcares livres.
- Não cobre toda a cadeia (etanol combustível, cachaça, etc.) — recorte: **açúcar como adoçante industrial**.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Catálogo de plantas medicinais (outro eixo) | [Plantas](/plantas/) |
| Artigo científico (método peer-reviewed) | [Inspeções · Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |
| Hub desta série | [Inspeções · Derivados](${hub}) |
| Literacia canábica (não confundir eixos) | [Curso UNIFESP](/biblioteca/unifesp/) |

## Como repetir o método

1. Identificar nome científico e família.  
2. Mapear origem geográfica e chegada ao Brasil (ou território relevante).  
3. Separar usos tradicionais da planta vs produto industrial dominante.  
4. Cruzar com orientação de saúde pública (OMS/órgãos oficiais) sobre o **derivado**, não sobre a espécie em abstracto.  
5. Declarar limites e independência.

## Status

**Aprovado como ficha fundadora da série Derivados de risco** — cana-de-açúcar documentada na origem; alerta centrado no açúcar refinado / açúcares livres em excesso.

[▶ Todas as inspeções · Derivados](${hub}) · [OMS — sugars](${who})
`;

  const contentEn = `## Scope

Editorial inspection of **sugarcane** (*Saccharum officinarum* L.) — recover the **botanical origin** and historical role of the plant, and distinguish the species from **refined sugar** and sugar-sweetened ultra-processed foods linked to health harm when intake is excessive.

> **Method note:** independent BudGanja audit based on agricultural history and public-health sources (WHO free sugars). **Not medical advice.** The plant is not the villain; the focus is **industrial transformation** and modern consumption patterns.

## Inspected object

| Field | Value |
|-------|-------|
| Common name | **Sugarcane** |
| Scientific name | *Saccharum officinarum* L. |
| Family | Poaceae |
| BudGanja type | Risk derivative — plant → industrial product |
| Risk product in focus | Refined sugar / free sugars in ultra-processed foods |
| Inspection date | ${inspected} |

## Botanical origin

Sugarcane is a tropical perennial grass grown for sucrose-rich stems. Domestication traces to **New Guinea / Southeast Asia**, then India and the medieval Islamic world, Europe, and — with colonial expansion — the Americas.

In **Brazil**, cane became an economic axis from the 16th century (mills, slavery, the sugar cycle). Juice, molasses and artisanal uses are part of food culture; the modern problem is not the plant’s existence, but the scale of **refining** and the ubiquity of **free sugars** in drinks and ultra-processed foods.

## From plant to risk product

| Stage | What happens | Editorial risk |
|-------|--------------|----------------|
| Plant | Stem harvest; natural sucrose in juice | Low — food/culture, traditional context |
| Processing | Milling, clarification, crystallization | Intermediate — concentrates sugar |
| Industrial refining | High-purity white/crystal sugar | High when daily intake explodes |
| Ultra-processed foods | Soft drinks, snacks, industrial sweets | High — free sugars + calorie density |

## What public health highlights

WHO guidance limits **free sugars** — typically under **10%** of daily energy, with additional benefit below **5%** for some outcomes (e.g. dental caries). High intake is linked to dental caries, excess energy/weight gain, and poor diet quality when ultra-processed foods displace real food.

Sources: [WHO — sugars and dental caries](${who}) · [WHO sugars guideline (2015)](${whoGuideline}).

## Status

**Approved as founding sheet of the Risk derivatives series** — sugarcane documented at origin; alert centered on refined sugar / free sugars in excess.

[▶ All inspections · Derivatives](${hub})
`;

  const contentEs = `## Alcance

Inspección editorial de la **caña de azúcar** (*Saccharum officinarum* L.) — recuperar el **origen botánico** y el papel histórico de la planta, y distinguir la especie del **azúcar refinado** y de los ultraprocesados azucarados asociados a daño a la salud cuando el consumo es excesivo.

> **Nota metodológica:** auditoría independiente de Inspetor BudGanja con fuentes de historia agrícola y salud pública (OMS, azúcares libres). **No es consejo médico.** La planta no es el villano; el foco es la **transformación industrial** y el patrón moderno de consumo.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre popular | **Caña de azúcar** |
| Nombre científico | *Saccharum officinarum* L. |
| Familia | Poaceae |
| Tipo BudGanja | Derivado de riesgo — planta → producto industrial |
| Producto de riesgo | Azúcar refinado / azúcares libres en ultraprocesados |
| Fecha de la inspección | ${inspected} |

## Origen botánico

La caña es una gramínea tropical perenne. La domesticación remonta a **Nueva Guinea / Sudeste Asiático**; llegó a las Américas con la expansión colonial. En **Brasil**, fue eje económico desde el siglo XVI. El problema moderno no es la planta, sino la escala de **refinación** y los **azúcares libres** en ultraprocesados.

## De la planta al producto de riesgo

| Etapa | Qué ocurre | Riesgo editorial |
|-------|------------|------------------|
| Planta | Cosecha del tallo; sacarosa natural | Bajo — comida/cultura |
| Procesamiento | Molienda y cristalización | Intermedio |
| Refinación industrial | Azúcar de alta pureza | Alto si la dosis diaria explota |
| Ultraprocesados | Refrescos, snacks, dulces | Alto |

## Salud pública

La OMS recomienda limitar los **azúcares libres** (p. ej. menos del **10%** de la energía diaria). El exceso se asocia a caries, exceso energético y dietas pobres cuando el ultraprocesado sustituye comida real.

## Estado

**Aprobada como ficha fundadora de la serie Derivados de riesgo**.

[▶ Todas las inspecciones · Derivados](${hub})
`;

  return { body, contentEn, contentEs };
}

function buildCanaDeAcucarPost() {
  const { body, contentEn, contentEs } = buildCanaDeAcucarBodies();
  return derivadoPost({
    title: 'Inspeção: Cana-de-açúcar — origem da planta e açúcar refinado',
    titleEn: 'Inspection: Sugarcane — plant origin and refined sugar',
    titleEs: 'Inspección: Caña de azúcar — origen de la planta y azúcar refinado',
    excerpt:
      'Ficha fundadora da série Derivados de risco: origem botânica de *Saccharum officinarum*, história no Brasil e alerta sobre açúcares livres / açúcar refinado em excesso — sem demonizar a planta.',
    excerptEn:
      'Founding sheet of the Risk derivatives series: botanical origin of *Saccharum officinarum*, history in Brazil, and alert on free sugars / refined sugar in excess — without demonizing the plant.',
    excerptEs:
      'Ficha fundadora de la serie Derivados de riesgo: origen botánico de *Saccharum officinarum*, historia en Brasil y alerta sobre azúcares libres / azúcar refinado en exceso — sin demonizar la planta.',
    slug: 'inspecao-derivado-cana-de-acucar',
    date: '2026-08-01T04:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Cana-de-açúcar · derivado',
    coverImage: '/imagens/inspecoes/cana-de-acucar-cover.jpg',
    sourceUrl: 'https://www.who.int/publications/i/item/9789241549028',
    body,
    contentEn,
    contentEs
  });
}

const DERIVADOS_INSPECOES_POSTS = [buildCanaDeAcucarPost()];

module.exports = {
  DERIVADOS_INSPECOES_POSTS,
  buildCanaDeAcucarPost,
  buildCanaDeAcucarBodies
};
