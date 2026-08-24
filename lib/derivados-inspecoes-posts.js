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
| Chocolate industrial (açúcar + cacau + farinha + leite) | [Inspeção: Chocolate](/posts/post-inspecao-derivado-chocolate.html) |
| Farinha / glúten | [Inspeção: Glúten](/posts/post-inspecao-derivado-gluten.html) |
| Caseína / leite | [Inspeção: Caseína](/posts/post-inspecao-derivado-caseina.html) · [Leite e laticínios](/posts/post-inspecao-derivado-leite.html) |
| Planta · cacau | [Cacau](/plantas/cacau/) |
| Catálogo de plantas medicinais (outro eixo) | [Plantas](/plantas/) |
| Artigo científico (método peer-reviewed) | [Inspeções · Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |
| Hub desta série | [Inspeções · Produtos nocivos](${hub}) |
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

function buildAbacateDerivadoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const planta = '/posts/post-inspecao-planta-abacate.html';
  const ficha = '/plantas/abacate/';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const who =
    'https://www.who.int/news-room/fact-sheets/detail/sugars-and-dental-caries';
  const whoUp =
    'https://www.who.int/news-room/questions-and-answers/item/ultra-processed-foods';
  const wiki = 'https://pt.wikipedia.org/wiki/Abacate';
  const anvisaAdd =
    'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/aditivos-alimentares';

  const body = `## Escopo

Inspeção editorial e **química** dos **derivados industriais do abacate** (*Persea americana* Mill.) — resgatar a planta e a polpa inteira, e auditar o que acontece quando o fruto vira **óleo refinado, guacamole de prateleira, sobremesas, batidos e «snacks de abacate»** com **açúcar**, xaropes e **aditivos químicos**. Cruza com a ficha botânica [Abacate (planta)](${planta}) e com [Cana-de-açúcar / açúcares livres](${cana}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes de partida: [ficha /plantas/abacate/](${ficha}), [Wikipédia · Abacate](${wiki}), orientações OMS sobre [açúcares livres](${who}) e debate sobre [ultraprocessados](${whoUp}), enquadramento brasileiro de [aditivos alimentares (Anvisa)](${anvisaAdd}). **Não é aconselhamento médico nem análise de uma marca concreta.** A planta não é o vilão; o foco é a **matriz alimentar transformada** (açúcar + aditivos + dose). Sem afiliação com a indústria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Planta de origem | **Abacate** (*Persea americana*) — [inspeção planta](${planta}) |
| Tipo BudGanja | Derivado de risco — fruto → produto industrial |
| Produtos em foco | Óleo (refinado), guacamole/pasta industrial, sobremesas e bebidas açucaradas «de abacate», snacks ultraprocessados |
| Riscos químicos em foco | Açúcares livres + aditivos (conservantes, emulsionantes, acidulantes, aromas, espessantes) |
| Data da inspeção | ${inspected} |

## Hipóteses (método BudGanja)

**H1:** a polpa madura inteira é quimicamente distinta de um ultraprocessado que **usa** abacate (ou aroma de abacate) como marketing.  
**H2:** o dano discute-se no eixo **açúcar + densidade energética + aditivos de formulação + frequência**, não no facto de o abacate existir.  
**H3:** literacia de rótulo (lista de ingredientes / INNs / funções) é a ferramenta repetível desta série.

## Da planta ao derivado — mapa químico

| Etapa | O que é | Química / risco editorial |
|-------|---------|---------------------------|
| Fruto inteiro (polpa) | Alimento | MUFA (oleico), fibra, K, E, carotenóides; PPO escurece ao cortar; **persina** nas folhas/caroço (não comer) — ver [planta](${planta}) |
| Guacamole fresco caseiro | Polpa + limão/sal/cebola | Baixo processamento; ácido cítrico natural atrasa PPO |
| Óleo virgem / prensado a frio | Extracção lipídica | Concentra lípidos; perfil depende do processo; uso culinário/cosmético |
| Óleo refinado | Desgomagem, neutralização, desodorização | Perde voláteis/fenólicos; mais estável para fritura — já é **derivado industrial** |
| Pasta/guacamole de prateleira | Polpa + água + ácidos + conservantes ± açúcar/amidos | Matriz ultraprocessada possível — ler rótulo |
| Batido / sobremesa / gelado «de abacate» | Polpa + **açúcar**/xarope + emulsionantes + aromas | Eixo crítico desta ficha: **açúcar + química de formulação** |
| Snack «avocado» ultraprocessado | Pode ter pouco abacate real | Marketing verde ≠ composição |

## Química da polpa (baseline) vs matriz industrial

### Baseline — fruto (resumo)

| Classe | Marcadores |
|--------|------------|
| Lípidos | Ácido oleico (MUFA) dominante; palmítico; linoleico |
| Açúcares | Relativamente baixos na polpa crua face a frutas doces |
| Protecção / cor | Polifenóis; escurecimento enzimático (**PPO**) |
| Alerta botânico | **Persina** (folhas, caroço, casca) — toxicidade em animais |

### O que a indústria acrescenta (funções químicas)

Lista **educacional** de funções comuns em pastas, molhos e sobremesas — não inventário de uma marca:

| Função | Exemplos típicos (rótulo / INN) | Nota BudGanja |
|--------|----------------------------------|---------------|
| Doçura / energia | Açúcar, glicose, frutose, xarope de glicose-frutose, maltodextrina | Cruza [cana / açúcares livres](${cana}); dose e frequência |
| Acidulante / antioxidante | Ácido cítrico (E330), ácido ascórbico (E300) | Atrasam oxidação/PPO; uso técnico frequente |
| Conservante | Sorbato de potássio (E202), benzoato de sódio (E211) | Estendem vida de prateleira; avaliar no contexto da dieta total |
| Quelante | EDTA dissódico cálcico (quando autorizado) | Controla metais que aceleram oxidação |
| Emulsionante | Lecitina, mono- e diglicéridos (E471), etc. | Estabilizam água–óleo em pastas e gelados |
| Espessante / estabilizante | Goma xantana, amidos modificados, pectina | Textura e syneresis; elevam ultraprocessamento |
| Aroma / cor | Aromas (naturais/artificiais), clorofilas / corantes | Podem mascarar baixa % de abacate real |
| Sal | Cloreto de sódio | Em pastas salgadas — sódio da dieta |

**Combinação de risco (tese editorial):** quando **açúcar (ou xarope)** entra na mesma matriz que emulsionantes + aromas + conservantes, o produto deixa de ser «abacate com um pouco de tempero» e aproxima-se de um **ultraprocessado** — mesmo que a embalagem mostre um fruto verde.

## Riscos à saúde — enquadramento (não protocolo clínico)

| Eixo | O que o laboratório regista |
|------|----------------------------|
| Açúcares livres | OMS: limitar açúcares livres (ex. abaixo de 10% da energia; benefício adicional abaixo de 5% em alguns desfechos). Batidos e sobremesas «saudáveis» podem ultrapassar isso num único copo. |
| Densidade energética | Óleo + açúcar + gordura da polpa = kcal concentradas; fácil comer sem saciedade de comida inteira |
| Sódio | Pastas industriais salgadas — somar ao resto do dia |
| Substituição alimentar | Trocar fruta/hortícola inteira por snack ultraprocessado «avocado flavour» |
| Persina / não-polpa | Continua válida a cautela da [ficha planta](${planta}) — caroço/folhas ≠ «superalimento caseiro» |
| Aditivos | A maioria autorizada tem limites de uso; o problema editorial é o **padrão de consumo** + a **matriz** (açúcar×aditivos), não o pânico a um único E-número |

**Veredicto editorial:** o abacate merece crédito como fruto e como capítulo indígena/mesoamericano; o **derivado açucarado e aditivado** merece leitura de rótulo e alerta de dose — com método, sem demonizar a árvore.

## Como inspeccionar um rótulo (procedimento repetível)

1. Procurar **% de abacate** ou posição na lista de ingredientes (ordem = quantidade).  
2. Procurar **açúcar / xaropes / maltodextrina** — somar com [eixo cana](${cana}).  
3. Listar aditivos por **função** (conservante, emulsionante, aroma…).  
4. Comparar com guacamole fresco: polpa + limão + sal ± hortícolas.  
5. Status: alimento inteiro / processado culinário / ultraprocessado industrial.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [Abacate — planta](${planta}) | Etimo *āhuacatl*, química da polpa, persina |
| [Cana-de-açúcar](${cana}) | Açúcares livres e refinação |
| Hub [Derivados](${hub}) | Série planta → produto de risco |
| [Anvisa — aditivos](${anvisaAdd}) | Enquadramento regulatório BR |

## Como repetir o método

1. Separar planta / fruto inteiro de derivado industrial.  
2. Mapear etapas de transformação.  
3. Tabelar classes químicas (açúcar × aditivos × lípidos).  
4. Ligar a OMS (açúcares) e a literacia de rótulo.  
5. Slug \`inspecao-derivado-…\`.

## Status

**Aprovado na série Derivados de risco** — abacate documentado como fruto (crédito) e como matriz industrial quando se cruzam **açúcar e aditivos químicos**.

[▶ Derivados](${hub}) · [▶ Planta Abacate](${planta}) · [▶ Cana](${cana})
`;

  const contentEn = `## Scope

Editorial and **chemical** inspection of **industrial avocado derivatives** (*Persea americana*) — credit the whole fruit, audit oils, shelf guacamole, desserts and drinks where **sugar**, syrups and **chemical additives** reshape the matrix. Cross-links: [Avocado plant sheet](${planta}), [Sugarcane / free sugars](${cana}).

> **Method note:** independent BudGanja audit. Starting points: plant catalog, Wikipedia, WHO free sugars / ultra-processed debate, Anvisa additives framing. **Not medical advice.** Not a brand lab test. Plant ≠ villain; focus is **transformed food matrix**.

## Inspected object

| Field | Value |
|-------|-------|
| Origin plant | Avocado — [plant inspection](${planta}) |
| BudGanja type | Risk derivative — fruit → industrial product |
| Focus | Refined oil, industrial guacamole/spreads, sugary avocado drinks/desserts, ultra-processed snacks |
| Chemical focus | Free sugars + additives (preservatives, emulsifiers, acidulants, flavours, thickeners) |
| Date | ${inspected} |

## Hypotheses

**H1:** whole ripe pulp ≠ ultra-processed “avocado” marketing matrix.  
**H2:** risk axis = **sugar + energy density + formulation additives + frequency**.  
**H3:** label literacy is the repeatable tool.

## Chemistry map (summary)

| Stage | Notes |
|-------|-------|
| Whole pulp | MUFA (oleic), fibre, K, E; PPO browning; persin in leaves/seed |
| Fresh guacamole | Low process; lemon acid slows PPO |
| Virgin / refined oil | Lipid concentrate; refining removes volatiles |
| Shelf paste / dessert / shake | Often sugar + emulsifiers + preservatives + flavours |

## Additive functions (educational)

Sugar / HFCS / maltodextrin · citric/ascorbic acids · sorbate/benzoate · EDTA (where allowed) · lecithin / E471 · xanthan / modified starches · flavours/colours · salt — see Portuguese sheet for full table. Cross [sugarcane](${cana}).

## Health framing

WHO free-sugars limits; energy density of oil+sugar matrices; sodium in savoury pastes; don’t eat leaves/seed (persin). **Editorial verdict:** credit the fruit; alert on sugary additive-laden derivatives.

## Status

**Approved in Risk derivatives** — avocado as fruit vs industrial sugar×additives matrix.

[▶ Derivatives](${hub}) · [▶ Plant](${planta}) · [▶ Sugarcane](${cana})
`;

  const contentEs = `## Alcance

Inspección editorial y **química** de **derivados industriales del aguacate** (*Persea americana*) — rescatar el fruto entero y auditar aceites, guacamole de estantería, postres y batidos con **azúcar** y **aditivos**. Cruces: [planta](${planta}), [caña / azúcares libres](${cana}).

> **Nota metodológica:** auditoría independiente. No es consejo médico ni análisis de una marca. La planta no es el villano; el foco es la **matriz transformada**.

## Objeto

| Campo | Valor |
|-------|-------|
| Planta | Aguacate — [inspección planta](${planta}) |
| Tipo | Derivado de riesgo |
| Foco | Aceite refinado, pastas industriales, postres/bebidas azucaradas, snacks ultraprocesados |
| Química | Azúcares libres + aditivos |
| Fecha | ${inspected} |

## Hipótesis

**H1:** pulpa entera ≠ ultraprocesado con marketing verde.  
**H2:** riesgo = **azúcar + densidad energética + aditivos + frecuencia**.  
**H3:** leer la etiqueta es el método repetible.

## Mapa (resumen)

Pulpa: MUFA, fibra, persina en hoja/hueso. Industrial: azúcar, emulsionantes, conservantes, aromas — ver tabla completa en la ficha PT. Cruce [caña](${cana}).

## Estado

**Aprobada en Derivados de riesgo**.

[▶ Derivados](${hub}) · [▶ Planta](${planta}) · [▶ Caña](${cana})
`;

  return { body, contentEn, contentEs };
}

function buildAbacateDerivadoPost() {
  const { body, contentEn, contentEs } = buildAbacateDerivadoBodies();
  return derivadoPost({
    title:
      'Inspeção: Derivados do abacate — açúcar, aditivos e química industrial',
    titleEn:
      'Inspection: Avocado derivatives — sugar, additives and industrial chemistry',
    titleEs:
      'Inspección: Derivados del aguacate — azúcar, aditivos y química industrial',
    excerpt:
      'Derivados de risco: do fruto (*Persea americana*) ao ultraprocessado — óleo, guacamole de prateleira e sobremesas; mapa químico de açúcares livres + aditivos, cruzado com a ficha planta e com a cana.',
    excerptEn:
      'Risk derivatives: from whole avocado to ultra-processed oils, shelf guacamole and desserts — chemical map of free sugars + additives, cross-linked to the plant sheet and sugarcane.',
    excerptEs:
      'Derivados de riesgo: del aguacate entero al ultraprocesado — aceite, guacamole de estantería y postres; mapa químico de azúcares libres + aditivos, cruzado con la ficha planta y la caña.',
    slug: 'inspecao-derivado-abacate',
    date: '2026-08-01T17:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Abacate · derivado',
    coverImage: '/imagens/inspecoes/abacate-derivado-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Abacate',
    body,
    contentEn,
    contentEs
  });
}

function buildCocoDerivadoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const planta = '/posts/post-inspecao-planta-coco.html';
  const ficha = '/plantas/coco/';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const abacate = '/posts/post-inspecao-derivado-abacate.html';
  const who =
    'https://www.who.int/news-room/fact-sheets/detail/sugars-and-dental-caries';
  const whoUp =
    'https://www.who.int/news-room/questions-and-answers/item/ultra-processed-foods';
  const wiki = 'https://pt.wikipedia.org/wiki/Coco';
  const anvisaAdd =
    'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/aditivos-alimentares';

  const body = `## Escopo

Inspeção editorial e **química** dos **derivados industriais do coco** (*Cocos nucifera* L.) — resgatar o **fruto inteiro** (água fresca, polpa) e auditar o que acontece quando vira **água de coco adoçada, leite ultraprocessado, óleo refinado, coco ralado açucarado, sobremesas e snacks** com **açúcar**, xaropes e **aditivos**. Cruza com a ficha botânica [Coco (planta)](${planta}), [Cana-de-açúcar / açúcares livres](${cana}) e a série irmã [Abacate](${abacate}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes de partida: [ficha /plantas/coco/](${ficha}), [Wikipédia · Coco](${wiki}), OMS sobre [açúcares livres](${who}) e [ultraprocessados](${whoUp}), [aditivos Anvisa](${anvisaAdd}). **Não é aconselhamento médico nem análise de uma marca.** A palmeira não é o vilão; o foco é a **matriz transformada** (açúcar + saturação lipídica + aditivos + dose). Sem afiliação com a indústria.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Planta de origem | **Coco** (*Cocos nucifera*) — [inspeção planta](${planta}) |
| Tipo BudGanja | Derivado de risco — fruto → produto industrial |
| Produtos em foco | Água de coco engarrafada/adoçada, leite de coco UHT, óleo refinado / «MCT», coco ralado açucarado, sobremesas e snacks |
| Riscos químicos em foco | Açúcares livres + gordura saturada concentrada + aditivos de formulação |
| Data da inspeção | ${inspected} |

## Hipóteses (método BudGanja)

**H1:** água de coco **fresca no fruto** ≠ bebida industrial com açúcar, aromas e conservantes.  
**H2:** o dano discute-se no eixo **açúcar + densidade energética (óleo) + aditivos + frequência**, não no facto de o coco existir.  
**H3:** literacia de rótulo (% de coco / lista de ingredientes) é a ferramenta repetível — como em [abacate](${abacate}).

## Da planta ao derivado — mapa químico

| Etapa | O que é | Química / risco editorial |
|-------|---------|---------------------------|
| Fruto jovem (água) | Endosperma líquido | Electrólitos + açúcares naturais moderados — [planta](${planta}) |
| Polpa madura | Amêndoa branca | Lípidos (láurico), fibra, energia |
| Água engarrafada «natural» | Pasteurização / filtragem ± gás | Pode ser próxima do fresco — ler rótulo (açúcar = 0?) |
| Água / bebida «de coco» adoçada | Água + **açúcar**/xarope + aromas ± conservantes | Eixo crítico — cruza [cana](${cana}) |
| Leite de coco UHT / «cream» | Emulsão polpa + água ± estabilizantes ± açúcar | Ultraprocessado possível |
| Óleo virgem / prensado | Extracção lipídica | Concentra saturados; uso culinário tradicional |
| Óleo refinado / «MCT» marketing | Refinação + fraccionamento | Derivado industrial; dose e hype ≠ prova clínica |
| Coco ralado açucarado / doce | Polpa + **açúcar** | Matriz doce industrial |
| Snack / barra «coconut» | Pode ter pouco coco real | Marketing tropical ≠ composição |

## Química baseline vs matriz industrial

### Baseline — fruto (resumo)

| Classe | Marcadores |
|--------|------------|
| Água | K, Na, Mg; açúcares naturais (dose no fruto ≠ refrigerante) |
| Polpa / óleo | Ácido **láurico** e outros saturados de cadeia média; mirístico, palmítico |
| Fibra | Polpa fresca / cópra |
| Material | Casca (coir) — não alimentar |

### O que a indústria acrescenta (funções)

| Função | Exemplos típicos | Nota BudGanja |
|--------|------------------|---------------|
| Doçura | Açúcar, glicose, frutose, xaropes, maltodextrina | Cruza [cana](${cana}); um «isotónico de coco» pode ser refrigerante disfarçado |
| Conservante | Sorbato, benzoato, sulfitos (quando aplicável) | Vida de prateleira |
| Emulsionante / estabilizante | Mono- e diglicéridos, gomas, amidos | Leites e cremes UHT |
| Aroma / cor | Aromas «coco», corantes | Mascaram baixa % de coco real |
| Acidulante | Ácido cítrico / ascórbico | Estabilidade |
| Sal | Cloreto de sódio | Em alguns preparados salgados |

**Combinação de risco (tese editorial):** quando **açúcar** entra na mesma matriz que **óleo concentrado** e **aditivos**, o produto deixa de ser «coco do pé» e aproxima-se de um **ultraprocessado tropical** — mesmo com foto de palmeira no rótulo.

## Riscos à saúde — enquadramento

| Eixo | O que o laboratório regista |
|------|----------------------------|
| Açúcares livres | OMS: limitar; bebidas «de coco» adoçadas contam como refrigerante no balanço diário |
| Gordura saturada | Óleo de coco concentrado — dose e contexto (não «superalimento MCT» sem prova) |
| Densidade energética | Óleo + açúcar = kcal fáceis sem a saciedade do fruto inteiro |
| Substituição | Trocar água fresca / polpa por snack ultraprocessado «coconut flavour» |
| Aditivos | Autorizados ≠ inocuidade de padrão de consumo; ler a **matriz** |

**Veredicto editorial:** o coco merece crédito como fruto tropical e capítulo cultural costeiro/afro-brasileiro; o **derivado adoçado, refinado e aditivado** merece leitura de rótulo e alerta de dose — sem demonizar a palmeira.

## Como inspeccionar um rótulo

1. Procurar **% de coco / água de coco** ou posição na lista.  
2. Procurar **açúcar / xaropes** — somar com [eixo cana](${cana}).  
3. Se for óleo: virgem vs refinado; dose na dieta.  
4. Listar aditivos por função.  
5. Comparar com água no fruto ou polpa fresca.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [Coco — planta](${planta}) | Étimo, água, polpa, óleo baseline |
| [Cana-de-açúcar](${cana}) | Açúcares livres |
| [Abacate — derivado](${abacate}) | Método irmão (fruto × ultraprocessado) |
| Hub [Derivados](${hub}) | Série planta → produto de risco |
| [Anvisa — aditivos](${anvisaAdd}) | Enquadramento BR |

## Como repetir o método

1. Separar fruto inteiro de derivado industrial.  
2. Mapear etapas (água → bebida; polpa → leite/óleo/doce).  
3. Tabelar açúcar × lípidos × aditivos.  
4. Ligar OMS + rótulo.  
5. Slug \`inspecao-derivado-…\`.

## Status

**Aprovado na série Derivados de risco** — coco documentado como fruto (crédito) e como matriz industrial quando se cruzam **açúcar, óleo refinado e aditivos**.

[▶ Derivados](${hub}) · [▶ Planta Coco](${planta}) · [▶ Cana](${cana}) · [▶ Abacate](${abacate})
`;

  const contentEn = `## Scope

Editorial and **chemical** inspection of **industrial coconut derivatives** (*Cocos nucifera*) — credit whole fruit (fresh water, pulp), audit sweetened bottled water, UHT milk, refined/MCT oil, sweetened shreds, desserts and snacks. Cross-links: [Coconut plant](${planta}), [Sugarcane](${cana}), [Avocado derivatives](${abacate}).

> **Method note:** independent BudGanja audit. Plant ≠ villain; focus is **transformed matrix** (sugar + saturated lipids + additives + dose). Not medical advice.

## Object

| Field | Value |
|-------|-------|
| Origin plant | Coconut — [plant inspection](${planta}) |
| Focus | Sweetened coconut water, UHT milk, refined oil / MCT marketing, sweetened shreds, snacks |
| Chemical focus | Free sugars + concentrated saturated fat + formulation additives |
| Date | ${inspected} |

## Hypotheses

**H1:** fresh fruit water ≠ sweetened industrial drink.  
**H2:** risk axis = **sugar + energy density + additives + frequency**.  
**H3:** label literacy is the repeatable tool.

## Map (summary)

Fresh water/pulp → bottled water → sweetened drinks → UHT milk → virgin/refined oil → sweetened shreds / snacks. Cross [sugarcane](${cana}).

## Status

**Approved in Risk derivatives** — coconut as fruit vs industrial sugar×oil×additives matrix.

[▶ Derivatives](${hub}) · [▶ Plant](${planta}) · [▶ Sugarcane](${cana})
`;

  const contentEs = `## Alcance

Inspección editorial y **química** de **derivados industriales del coco** (*Cocos nucifera*) — rescatar el fruto entero y auditar agua endulzada, leche UHT, aceite refinado, coco rallado azucarado y snacks. Cruces: [planta](${planta}), [caña](${cana}), [aguacate](${abacate}).

> **Nota metodológica:** la palmera no es el villano; el foco es la **matriz transformada**. No es consejo médico.

## Objeto

| Campo | Valor |
|-------|-------|
| Planta | Coco — [inspección planta](${planta}) |
| Foco | Agua endulzada, leche UHT, aceite refinado/MCT, rallado azucarado, snacks |
| Química | Azúcares libres + grasa saturada + aditivos |
| Fecha | ${inspected} |

## Estado

**Aprobada en Derivados de riesgo**.

[▶ Derivados](${hub}) · [▶ Planta](${planta}) · [▶ Caña](${cana})
`;

  return { body, contentEn, contentEs };
}

function buildCocoDerivadoPost() {
  const { body, contentEn, contentEs } = buildCocoDerivadoBodies();
  return derivadoPost({
    title:
      'Inspeção: Derivados do coco — açúcar, óleo e química industrial',
    titleEn:
      'Inspection: Coconut derivatives — sugar, oil and industrial chemistry',
    titleEs:
      'Inspección: Derivados del coco — azúcar, aceite y química industrial',
    excerpt:
      'Derivados de risco: do fruto (*Cocos nucifera*) ao ultraprocessado — água adoçada, leite UHT, óleo refinado e doces; mapa de açúcares livres + lípidos + aditivos, cruzado com a ficha planta e com a cana.',
    excerptEn:
      'Risk derivatives: from whole coconut to ultra-processed sweetened water, UHT milk, refined oil and sweets — free sugars + lipids + additives, cross-linked to the plant sheet and sugarcane.',
    excerptEs:
      'Derivados de riesgo: del coco entero al ultraprocesado — agua endulzada, leche UHT, aceite refinado y dulces; azúcares libres + lípidos + aditivos, cruzado con la ficha planta y la caña.',
    slug: 'inspecao-derivado-coco',
    date: '2026-08-01T23:45:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Coco · derivado',
    coverImage: '/imagens/inspecoes/coco-derivado-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Coco',
    body,
    contentEn,
    contentEs
  });
}

const DERIVADOS_INSPECOES_POSTS = [
  buildCanaDeAcucarPost(),
  buildAbacateDerivadoPost(),
  buildCocoDerivadoPost()
];

module.exports = {
  derivadoPost,
  DERIVADOS_INSPECOES_POSTS,
  buildCanaDeAcucarPost,
  buildCanaDeAcucarBodies,
  buildAbacateDerivadoPost,
  buildAbacateDerivadoBodies,
  buildCocoDerivadoPost,
  buildCocoDerivadoBodies
};
