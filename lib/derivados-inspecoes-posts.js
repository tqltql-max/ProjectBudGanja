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
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const lairYt = 'https://www.youtube.com/@DrLairRibeiroOficiall';
  const lairParte4 =
    'https://lairribeiro.com.br/parte-4-inflamacoes-cronica-causada-por-carboidratos/';
  const lairHits = '/content/channels/lair-sugar-hits.json';
  const vSugar = 'UfPawBg7vXc';
  const vFructose = 'rVS2M4wuseE';
  const vSweeteners = 'oGhMcYmy-C4';
  const vTruth = '9S7mDGA_gCo';
  const vShort = 'ZvPCoIR26ns';
  const vHangout = 'VItTyNMP_xg';

  const body = `## Escopo

Inspeção editorial e documental da **cana-de-açúcar** (*Saccharum officinarum* L.) — resgatar a **origem botânica** e o papel histórico da planta, e distinguir a espécie do **açúcar refinado** e dos ultraprocessados açucarados associados a dano à saúde quando o consumo é excessivo. Cruza com a divulgação pública do [Dr. Lair Ribeiro](${lair}) (açúcar / frutose / diabesidade), sem fundir eixos.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em fontes históricas e de saúde pública (FAO/origem agrícola, OMS sobre açúcares livres) e varredura do canal [@DrLairRibeiroOficiall](${lairYt}) (887 vídeos catalogados; hits em [\`lair-sugar-hits.json\`](${lairHits})). **Não é aconselhamento médico.** A planta não é o vilão; o foco é a **transformação industrial** e o padrão de consumo moderno. Indexar Lair ≠ endossar claims clínicos. Sem afiliação com a indústria açucareira, o portal ou o canal.

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

## Cruzamento com divulgação — Dr. Lair Ribeiro

O laboratório varreu o canal oficial [@DrLairRibeiroOficiall](${lairYt}) (\`UCk9mgpQVdJ5oKQWkM1UPBaQ\`): **887** títulos na aba Vídeos + buscas por açúcar, cana, frutose, diabetes, insulina, refrigerante, adoçante, etc. Achados filtrados: [\`content/channels/lair-sugar-hits.json\`](${lairHits}) (**38** hits temáticos; **nenhum** título nomeia explicitamente «cana-de-açúcar» como objecto — o elo botânico aparece no **portal**).

### Portal — sacarose e cana (texto verificável)

No artigo *[Paradigma das gorduras… Parte 4: inflamações crónicas causadas por carboidratos](${lairParte4})* (2020), o ecossistema Lair define a **sacarose** como «açúcar branco de mesa» **proveniente da cana-de-açúcar ou da beterraba**, e associa consumo elevado de açúcares (em especial **frutose** / sacarose) a obesidade, diabetes tipo 2, esteatose e síndrome metabólica — narrativa de **divulgação**, não guideline OMS.

| Fonte portal | Elo com esta ficha |
|--------------|-------------------|
| [Parte 4 — carboidratos / açúcares](${lairParte4}) | Nomeia cana como origem da sacarose de mesa; risco no **açúcar processado**, alinhável a H1/H2 acima |
| PDF do artigo (portal) | Mesma tese; figuras sobre glicose–frutose–sacarose |

### Vídeos-âncora no canal (açúcar / frutose / diabesidade)

| Tema | Título | ID |
|------|--------|-----|
| Açúcar | Truths about Sugar | \`${vSugar}\` |
| Açúcar + adoçantes | Sugar and Sweeteners \| Dr. Lair Ribeiro | \`${vSweeteners}\` |
| Açúcar + adoçantes | The truth about sweeteners and sugars | \`${vTruth}\` |
| Frutose | Fructose the unknown poison | \`${vFructose}\` |
| Short (PT) | Comer açúcar faz morrer mais cedo… | \`${vShort}\` |
| Diabesidade (alto alcance) | Diabetes e Obesidade \| Hangout | \`${vHangout}\` |

@youtube ${vSugar}

> **Leitura BudGanja:** Lair enfatiza **frutose / sacarose / diabesidade** como eixo metabólico; a ficha da cana enfatiza **planta ≠ produto** + **OMS (açúcares livres)**. Os dois eixos **complementam-se** no hub: origem botânica aqui · divulgação clínica-popular em [Lair](${lair}). **Não** tratar o canal como protocolo nem como substituto da OMS.

## Avaliação BudGanja

### Forças desta ficha
- Separa origem botânica de produto industrial.
- Liga história colonial/agrária do Brasil ao tema contemporâneo de saúde pública.
- Cruza OMS com varredura verificável do canal Lair (IDs + portal).
- Abre a série **Derivados de risco** com critérios claros para próximas espécies (ex.: tabaco).

### Limites honestos
- Não substitui nutricionista, médico ou guidelines clínicos individuais.
- Não inventa causalidade para cada doença crônica — aponta o consenso de saúde pública sobre açúcares livres.
- Não cobre toda a cadeia (etanol combustível, cachaça, etc.) — recorte: **açúcar como adoçante industrial**.
- A varredura Lair filtra por **título**; claims dentro de vídeos sem palavra-chave no título podem escapar.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Divulgação · açúcar / diabesidade | [Dr. Lair Ribeiro](${lair}) |
| Catálogo de plantas medicinais (outro eixo) | [Plantas](/plantas/) |
| Artigo científico (método peer-reviewed) | [Inspeções · Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |
| Hub desta série | [Inspeções · Derivados](${hub}) |
| Hits da varredura | [\`lair-sugar-hits.json\`](${lairHits}) |
| Literacia canábica (não confundir eixos) | [Curso UNIFESP](/biblioteca/unifesp/) |

## Como repetir o método

1. Identificar nome científico e família.  
2. Mapear origem geográfica e chegada ao Brasil (ou território relevante).  
3. Separar usos tradicionais da planta vs produto industrial dominante.  
4. Cruzar com orientação de saúde pública (OMS/órgãos oficiais) sobre o **derivado**, não sobre a espécie em abstracto.  
5. Se houver divulgação popular no tema: varrer canal (títulos) + textos do portal; declarar indexar ≠ endossar.  
6. Declarar limites e independência.

## Status

**Aprovado como ficha fundadora da série Derivados de risco** — cana-de-açúcar documentada na origem; alerta centrado no açúcar refinado / açúcares livres em excesso; cruzamento com divulgação Lair (portal + vídeos) registado.

[▶ Todas as inspeções · Derivados](${hub}) · [OMS — sugars](${who}) · [Lair](${lair})
`;

  const contentEn = `## Scope

Editorial inspection of **sugarcane** (*Saccharum officinarum* L.) — botanical origin vs **refined sugar** / free sugars. Crosses [Dr. Lair Ribeiro](${lair}) outreach on sugar/fructose/diabesity after a full channel title scan (887 videos).

> **Method note:** WHO free-sugars guidance + Lair portal/channel audit. **Not medical advice.** Indexing ≠ endorsement. The plant is not the villain.

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

## Cross-link — Dr. Lair Ribeiro

Channel scan: 887 titles; hits in [\`lair-sugar-hits.json\`](${lairHits}). Portal [Part 4 — carbohydrates](${lairParte4}) names **sugarcane** (or beet) as the source of table **sucrose** and frames excess sugar/fructose as metabolic risk. Anchor videos: Truths about Sugar (\`${vSugar}\`), Fructose the unknown poison (\`${vFructose}\`), Sugar and Sweeteners (\`${vSweeteners}\`). Full sheet: [Lair](${lair}).

@youtube ${vSugar}

## Status

**Approved as founding Risk-derivatives sheet** — with OMS + Lair divulgation cross-link.

[▶ Derivatives](${hub}) · [Lair](${lair})
`;

  const contentEs = `## Alcance

Inspección editorial de la **caña de azúcar** (*Saccharum officinarum* L.) — origen botánico frente al **azúcar refinado**. Cruza con la divulgación del [Dr. Lair Ribeiro](${lair}) (azúcar / fructosa / diabesidad) tras barrido del canal (887 vídeos).

> **Nota metodológica:** OMS (azúcares libres) + auditoría del portal/canal Lair. **No es consejo médico.** Indexar ≠ respaldar. La planta no es el villano.

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

## Cruce — Dr. Lair Ribeiro

Barrido del canal: 887 títulos; hits en [\`lair-sugar-hits.json\`](${lairHits}). El portal [Parte 4 — carbohidratos](${lairParte4}) nombra la **caña** (o remolacha) como origen de la **sacarosa** de mesa. Vídeos ancla: Truths about Sugar (\`${vSugar}\`), Fructose the unknown poison (\`${vFructose}\`). Ficha: [Lair](${lair}).

@youtube ${vSugar}

## Estado

**Aprobada como ficha fundadora de Derivados de riesgo** — con cruce OMS + divulgación Lair.

[▶ Derivados](${hub}) · [Lair](${lair})
`;

  return { body, contentEn, contentEs };
}

function buildCanaDeAcucarPost() {
  const { body, contentEn, contentEs } = buildCanaDeAcucarBodies();
  return derivadoPost({
    title: 'Inspeção: Cana-de-açúcar — origem da planta, açúcar refinado e cruzamento Lair',
    titleEn: 'Inspection: Sugarcane — plant origin, refined sugar and Lair cross-link',
    titleEs: 'Inspección: Caña de azúcar — origen, azúcar refinado y cruce con Lair',
    excerpt:
      'Derivados de risco: origem da cana, OMS (açúcares livres) e cruzamento com a divulgação do Dr. Lair Ribeiro — portal (sacarose da cana) + varredura de 887 vídeos do canal (açúcar, frutose, diabesidade).',
    excerptEn:
      'Risk derivatives: sugarcane origin, WHO free sugars, and a cross-link to Dr. Lair Ribeiro — portal (table sucrose from cane) + scan of 887 channel videos (sugar, fructose, diabesity).',
    excerptEs:
      'Derivados de riesgo: origen de la caña, OMS (azúcares libres) y cruce con el Dr. Lair Ribeiro — portal (sacarosa de caña) + barrido de 887 vídeos del canal (azúcar, fructosa, diabesidad).',
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
