'use strict';

/**
 * Pesquisa completa — leite e derivados, mal à saúde e o acervo de vídeos.
 * Hub da família láctea (irmão da caseína). Consumido por produtos-nocivos.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function ytLink(id, title) {
  const safe = String(title || id)
    .replace(/\|/g, '/')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')');
  return `[${safe}](https://www.youtube.com/watch?v=${id})`;
}

function loadThemeVideos(rel, themeId) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
    const theme = (data.themes || []).find((t) => t && t.id === themeId);
    return theme && Array.isArray(theme.videos) ? theme.videos : [];
  } catch (e) {
    return [];
  }
}

function mdVideoTable(videos) {
  const rows = videos
    .map((v, i) => `| ${i + 1} | ${ytLink(v.id, v.title)} | ${v.views || '—'} |`)
    .join('\n');
  return `| # | Vídeo | Views |\n|---|-------|-------|\n${rows}`;
}

function buildLeiteBodies() {
  const inspected = '2026-09-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const vaca = '/animais/vaca/';
  const vacaDeriv = '/posts/post-inspecao-derivado-vaca.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const soja = '/posts/post-inspecao-planta-soja.html';
  const trigo = '/posts/post-inspecao-planta-trigo.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const artCasein = '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html';
  const artWho = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const rasmussen = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const videosHub = '/videos/';
  const videosLair = '/videos/?channel=lair&series=gluten-leite';
  const videosDavis = '/videos/?channel=davis';
  const videosMundo = '/videos/?channel=manualdomundo';
  const videosRas = '/videos/?channel=rasmussen';
  const lairJson = '/content/channels/lair-video-themes.json';

  const vLairLeite = 'cID3nNJsgm4';
  const vLairCusto = 'yLOG0fcqYs0';
  const vLairMaterno = 'XaGhsg_2mds';
  const vDavisLactose = 'LGqjlu5p6dc';
  const vDavisDairy = 'ribcYXzfzgQ';
  const vMundoPo = '7n9jjSLZmDU';
  const vMundoWhey = 'd_yjRh1cxZc';
  const vMundoIogurte = 'E3sd344jS_M';
  const vMundoCola = 'SJtQyG-oPZs';
  const vRasMal = '4njQ7vAzK_U';
  const vRasQueijo = 'J9d60PbLbTU';

  const lairVideos = loadThemeVideos('content/channels/lair-video-themes.json', 'gluten-leite');
  const lairTable = lairVideos.length ? mdVideoTable(lairVideos) : '| — | (catálogo Lair indisponível) | — |';
  const lairN = lairVideos.length || 14;

  const body = `## Escopo

Pesquisa editorial completa do **leite** e dos **derivados lácteos** — o fluido da [vaca](${vaca}) (*Bos taurus*) e o que a fábrica faz dele — como **família de produtos nocivos ao organismo** quando a dose, o açúcar, a proteína e o ultraprocessamento se cruzam. Esta ficha é o **hub**: não substitui a [caseína](${caseina}) (a cola) nem os [derivados da vaca](${vacaDeriv}) (carne processada no mesmo animal). Cruza [glúten](${gluten}), [cana / açúcar](${cana}), [chocolate industrial](${chocolate}) e o discurso de [Lair](${lair}), [Davis](${davis}) e [Rasmussen](${rasmussen}).

O título — **da ordenha à prateleira e o mal à saúde** — descreve o caminho: o que sai da vaca não é o que está no saquinho, no shake, no achocolatado ou no «iogurte» de xarope. O mal à saúde **não** é um único diagnóstico.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem nutricional.** O animal e o leite fresco tradicional **não** são vilões absolutos. Leite materno humano ≠ leite de vaca. Indexar Lair/Davis/Rasmussen **≠** endossar cada claim. Fórmula infantil **não** é protocolada aqui. Conteúdo educacional.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Leite e derivados** |
| Título da pesquisa | Da ordenha à prateleira e o mal à saúde |
| Origem animal | [Vaca / boi](${vaca}) (*Bos taurus*); cabra/ovelha entram como parentes, não como esta ficha |
| Família de produtos | Leite fluido, UHT, pó, queijo, iogurte, manteiga, soro/whey, caseinatos, bebidas lácteas |
| Tipo BudGanja | Produto nocivo — fluido animal → matriz industrial (hub) |
| Elos de risco | Lactose · [caseína](${caseina}) · açúcar · gordura · ultraprocessado |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |

## Mapa da família — o que é «derivado»

| Derivado | O que é | Leitura BudGanja | Ficha |
|----------|---------|------------------|-------|
| Leite fresco / ordenha | Fluido, contexto cultural | Baixo — dose e ofício | [Vaca](${vaca}) |
| UHT / longa vida | Calor, prateleira | Intermediário | Esta pesquisa |
| Leite em pó / sólidos lácteos | Água fora, volume de fábrica | Intermediário a elevado | [Chocolate](${chocolate}) |
| Queijo de ofício | Coalho, caseína em rede | Dose | [Caseína](${caseina}) |
| Iogurte de ofício | Fermento | Dose; ≠ «iogurte» de xarope | Davis (fermento) ≠ prateleira |
| Manteiga | Gordura do leite | Dose; vizinho dos óleos | Lair · gorduras |
| Soro / whey | ~20% da proteína; isolado de shake | Elevado em dose de marketing | Esta pesquisa |
| Caseinatos | Cola extraída | Elevado | [Caseína — a cola do leite](${caseina}) |
| Bebida láctea / achocolatado | Leite + [açúcar](${cana}) + aroma | Elevado | [OMS](${artWho}) · [cana](${cana}) |
| Chocolate ao leite | Pó + açúcar + cacau | Elevado — rede | [Chocolate](${chocolate}) |
| «Sem lactose» industrial | Pode manter a proteína | Ler rótulo | [Caseína](${caseina}) |

**H1:** literacia de origem separa **vaca / ordenha** de **marca de prateleira**.  
**H2:** literacia clínica separa **lactose** (açúcar) de **caseína/soro** (proteína) de **alergia IgE**.  
**H3:** literacia de fábrica separa **queijo/iogurte de ofício** de **bebida láctea adoçada**.  
**H4:** esta ficha é o **mapa da família**; a [caseína](${caseina}) é o capítulo da cola.

## Etimologia — leite, laticínio, derivado

**Leite** vem do latim *lac, lactis*. **Laticínio** é o conjunto do que se faz com o leite. **Derivado** no laboratório não é eufemismo de marketing: é o produto **depois** da ordenha — coalho, secagem, isolado, açúcar. A [caseína](${caseina}) (de *caseus*, queijo) é um derivado nomeado; o **whey** é o outro. O [Manual do Mundo](${videosMundo}) mostra o pó, o whey e a cola — literacia visual da família.

## Quatro eixos clínicos (o mal à saúde, com método)

O «mal do leite» funde o fluido, o açúcar, a proteína e o snack. O laboratório **desfunde**.

| Eixo | Onde vive na família | Conduta editorial |
|------|----------------------|-------------------|
| **Intolerância à lactose** | Leite fluido, alguns queijos frescos; menos em queijos longos e iogurtes de ofício | Distinto da proteína — ver [caseína](${caseina}) |
| **Alergia IgE (APLV)** | Caseína e/ou soro em *qualquer* derivado que as traga | Clínico — orientação profissional |
| **A1 / BCM-7** | β-caseína do leite de muitas raças industriais | Hipótese GI — [Brooke-Taylor 2017](${artCasein}) |
| **Matriz ultraprocessada** | Bebida láctea, pó adoçado, chocolate ao leite, shake | [Hall 2019](${hall}) · [OMS](${artWho}) · [cana](${cana}) |

Leite **materno humano** (vários títulos Lair) **não** é derivado de vaca. Indexar o título ≠ fundir as duas leites.

## Da ordenha à prateleira

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Vaca / ordenha | Fluido fresco | Baixo — [ficha da vaca](${vaca}) |
| Pasteurização / UHT | Segurança microbiológica vs sabor/prateleira | Intermediário |
| Queijo / iogurte / manteiga de ofício | Água sai, proteína ou gordura concentra | Dose |
| Pó, caseinatos, whey isolado | A fábrica nomeia o derivado | Elevado em ultraprocessados |
| Bebida láctea + açúcar + aroma | O fluido vira snack | Elevado |
| Bolacha / chocolate «ao leite» | Leite + [farinha](${gluten}) + [açúcar](${cana}) | Elevado — rede completa |

Quem [transforma a prateleira](${ricos}) não inventa a vaca: **seca**, **isola**, **adoça** e **empacota**.

## A armadilha «derivado saudável»

| Situação | O que inspeccionar |
|----------|-------------------|
| «Iogurte» de prateleira | Açúcar à frente do leite; aroma; lista longa |
| Shake / whey | Gramas de proteína isolada ≠ copo de leite |
| Achocolatado / toddynho de matriz | Cacau perfume + açúcar + leite em pó — [chocolate](${chocolate}) |
| Queijo processado / «fatia» | Emulsão, amido, sal |
| A2 / «sem lactose» / «light» | Genética ou açúcar removido **não** apagam ultraprocessamento |
| Carne processada no mesmo animal | Outro eixo — [derivados da vaca](${vacaDeriv}) (embutidos, nitritos) |

## Universo de vídeos — todos os canais do projecto

O hub [Vídeos](${videosHub}) catalogava **9.798** vídeos únicos. A família **leite e derivados** é o mesmo censo da [caseína](${caseina}), lido agora como **mapa de produtos**, não só como cola. **Zero** títulos nomeiam *caseína*; o acervo diz *leite*, *lactose*, *iogurte*, *queijo*, *whey*, *leite em pó*.

| Canal | Vídeos no hub | Sinal lácteo / derivados | Papel neste hub |
|-------|---------------|--------------------------|-----------------|
| [Dr. Lair Ribeiro](${lair}) | **888** | **14** no bucket [gluten-leite](${videosLair}) | Mito do leite, lactose, leite materno, par com glúten |
| [William Davis, MD](${davis}) | **476** | **~20** iogurte *L. reuteri* + 1 lactose + 1 dairy/peso | Derivado **fermentado** (ofício Davis) ≠ iogurte de xarope |
| Manual do Mundo | **2.401** | **5** de literacia: cola, plástico, whey, **leite em pó**, iogurte | Mostra o **derivado** a acontecer |
| [Richard Rasmussen](${rasmussen}) | **1.851** | Ordenha, raças, **queijo**, «o leite faz mal?» | Origem e ofício da quinta |
| Slivki | **416** | 1 iogurte-experiência | Fora do eixo de dano |
| Disney Jr. | **120** | 1 falso (Árvores de Queijo) | Ruído |
| Zangado, Paulinho, MovReCam, Klink, CANABinALL, Inspetor | ~3.246 | **0** | Ausência |
| **Total** | **9.798** | **~63** títulos com palavra-chave láctea | |

**Achado:** o hub de vídeos **não tem série «leite e derivados»**. Tem leite (Lair), fermento (Davis), quinta (Rasmussen) e química do derivado (Manual). Esta ficha junta o mapa. Análise-mãe: [danos × vídeos](${analise}).

## Vídeos âncora (verificáveis)

@youtube ${vLairLeite}

@youtube ${vMundoPo}

@youtube ${vRasMal}

| Eixo | Título | Onde |
|------|--------|------|
| Lair · mito | O mito do leite | \`${vLairLeite}\` |
| Lair · par glúten+lactose | GLÚTEN E LACTOSE e o custo para o seu corpo | \`${vLairCusto}\` |
| Lair · leite materno (≠ vaca) | The Importance of Breast Milk | \`${vLairMaterno}\` |
| Davis · lactose | Lactose Intolerance | \`${vDavisLactose}\` |
| Davis · dairy / peso | Can dairy products block weight loss? | \`${vDavisDairy}\` |
| Manual · leite em pó | Como é FEITO o LEITE EM PÓ | \`${vMundoPo}\` |
| Manual · whey | Como o WHEY PROTEIN é FABRICADO | \`${vMundoWhey}\` |
| Manual · iogurte | A transformação do leite em iogurte | \`${vMundoIogurte}\` |
| Manual · cola (caseína) | Cola de leite | \`${vMundoCola}\` |
| Rasmussen · a pergunta | O LEITE FAZ MAL? | \`${vRasMal}\` |
| Rasmussen · queijo de ofício | O MELHOR QUEIJO DO MUNDO | \`${vRasQueijo}\` |

## Lair — leite no bucket gluten-leite (${lairN})

Mesmo catálogo da [caseína](${caseina}) e do [glúten](${gluten}). **Indexar ≠ endossar.** JSON: [\`lair-video-themes.json\`](${lairJson}).

${lairTable}

Leitura para **esta** ficha: o mito e a lactose falam do **fluido**; o leite materno é **outro leite**; o par com glúten aponta a **prateleira** (pão + queijo, bolacha + recheio).

## Davis, Manual do Mundo e Rasmussen — três ofícios do derivado

| Ofício | O que o acervo mostra | O que esta ficha acrescenta |
|--------|----------------------|-----------------------------|
| Davis · fermento | Iogurte *L. reuteri* / SIBO yogurt | Não é inspeção de caseinato; é microbioma — [Davis](${davis}) · [${videosDavis}](${videosDavis}) |
| Manual · fábrica visível | Pó, whey, cola, iogurte de experiência | O derivado **acontece** na bancada — [${videosMundo}](${videosMundo}) |
| Rasmussen · quinta | Ordenha, raças, queijo, «faz mal?» | Origem — [Rasmussen](${rasmussen}) · [${videosRas}](${videosRas}) |

## Eixos vizinhos

| Eixo | Vídeos / ficha | Por que cola |
|------|----------------|--------------|
| [Caseína](${caseina}) | Pesquisa irmã | A cola da família |
| [Glúten](${gluten}) | 106 Davis + 14 Lair | Pão + queijo; bolacha ao leite |
| [Cana](${cana}) | 10+30 Lair | Bebida láctea adoçada |
| [Chocolate](${chocolate}) | 3 pró-amargo vs snack | Leite em pó na barra |
| [Intestino](${intestino}) | ponte | Lactose e A1 falam de GI |

## O que observar nos rótulos

- ordem: açúcar / xarope à frente do leite = snack, não copo;
- «proteína do leite», caseinato, sólidos lácteos, leite em pó, soro, whey;
- «iogurte» com aroma e amido;
- «sem lactose» que mantém caseína;
- chocolate / bolacha «ao leite» = rede [farinha](${gluten}) + [açúcar](${cana}) + leite;
- nitritos e embutidos = [derivados da vaca](${vacaDeriv}) (carne), não esta ficha.

## Cruzamento — fichas do laboratório

| Elo | Ficha |
|-----|-------|
| Cola da família | [Caseína — a cola do leite](${caseina}) |
| Animal | [Vaca / boi](${vaca}) |
| Carne no mesmo animal | [Virou carne de vaca](/posts/post-inspecao-expressao-virou-carne-de-vaca.html) · [Derivados da vaca](${vacaDeriv}) |
| A outra cola | [Glúten — a cola invisível](${gluten}) |
| Açúcar | [Cana-de-açúcar](${cana}) · [OMS 2015](${artWho}) |
| Snack doce | [Chocolate industrial](${chocolate}) |
| A1 vs A2 | [Brooke-Taylor 2017](${artCasein}) |
| Ultraprocessados | [Hall 2019](${hall}) |
| Prateleira | [Como os ricos transformam as coisas](${ricos}) |
| Soja / trigo na mesma gôndola | [Soja](${soja}) · [Trigo](${trigo}) |
| Vídeos | [Lair](${lair}) · [Davis](${davis}) · [Análise × vídeos](${analise}) |

## Artigos científicos

| Artigo | O que segura neste hub |
|--------|------------------------|
| [Brooke-Taylor 2017](${artCasein}) | A1/A2 no **leite** (queijos/fermentados excluídos da revisão) |
| [Hall 2019](${hall}) | Matriz ultraprocessada — bebidas e snacks lácteos |
| [OMS 2015](${artWho}) | Açúcares livres no achocolatado e no «iogurte» doce |

**Síntese:** o leite fresco merece contexto; a **família de derivados industriais** (pó, caseinato, bebida adoçada, fatia emulsionada) merece alerta. A evidência mais firme de dano **da proteína** está na [caseína](${caseina}) (alergia IgE). O dano **populacional** desta ficha é a **prateleira**: açúcar + volume + rótulo longo. Sem dieta prescrita.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · hub leite e derivados × 9.798 vídeos |
| Veredicto editorial | Da **ordenha** à **prateleira**: o fluido tradicional não é o vilão; o derivado industrial adoçado e isolado é o eixo de dose. Carne processada fica na ficha da [vaca](${vacaDeriv}). A cola detalha-se na [caseína](${caseina}). |
| Vídeos | Lair 14 (leite/lactose) · Davis ~20 (iogurte-fermento) · Manual 5 (pó, whey, cola, iogurte) · Rasmussen (quinta + «faz mal?») · 0 títulos «caseína» |

## Hub

[Produtos nocivos](${hub}) · [Caseína](${caseina}) · [Vaca](${vaca}) · [Vídeos Lair / gluten-leite](${videosLair}) · [Chocolate](${chocolate}) · [Glúten](${gluten}) · [Análise × vídeos](${analise})
`;

  const contentEn = `## Scope

Full editorial research on **milk and dairy derivatives** — the fluid from [cattle](${vaca}) and what the factory makes of it — as a **family of harmful products** when dose, sugar, protein and ultra-processing collide. This sheet is the **hub**: it does not replace [casein](${caseina}) (the glue) or [cattle derivatives](${vacaDeriv}) (processed meat). Cross-links [gluten](${gluten}), [sugarcane](${cana}) and [industrial chocolate](${chocolate}).

> **Method note:** independent BudGanja audit. **Not medical advice.** Fresh traditional milk is not an absolute villain. Human breast milk ≠ cow’s milk. Infant formula is **not** protocolled here.

## The family map

Fresh milk → UHT → powder → craft cheese/yogurt/butter → whey isolate / caseinates → sweetened dairy drinks → milk chocolate. Craft ≠ shelf. Glue chapter: [casein](${caseina}).

## Clinical axes

| Axis | Reading |
|------|---------|
| Lactose intolerance | The **sugar**, not every derivative equally |
| IgE cow’s-milk allergy | Protein in any derivative that carries it |
| A1 / BCM-7 | Hypothesis — [Brooke-Taylor 2017](${artCasein}) |
| Ultra-processed matrix | Powder + sugar + flavour — [Hall 2019](${hall}) · [WHO](${artWho}) |

## All project videos (9,798)

Same census as the [casein](${caseina}) sheet, read as a **product map**: Lair **${lairN}** (milk/lactose) · Davis ~20 (fermented yogurt, not caseinate) · Manual do Mundo 5 (powder, whey, glue, yogurt) · Rasmussen (farm + “is milk harmful?”) · **0** titles name casein · rest by absence.

@youtube ${vLairLeite}

@youtube ${vMundoPo}

@youtube ${vRasMal}

## Status

**Published** — Harmful products · milk-and-derivatives hub (health × 9,798 videos). No prescribed diet.

[Harmful products](${hub}) · [Casein](${caseina}) · [Cattle](${vaca}) · [Lair gluten-dairy](${videosLair})
`;

  const contentEs = `## Alcance

Investigación editorial completa de la **leche y los derivados lácteos** — el fluido de la [vaca](${vaca}) y lo que la fábrica hace de él — como **familia de productos nocivos**. Esta ficha es el **hub**: no sustituye la [caseína](${caseina}) (la cola) ni los [derivados de la vaca](${vacaDeriv}) (carne procesada). Cruza [gluten](${gluten}), [caña](${cana}) y [chocolate industrial](${chocolate}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** La leche fresca tradicional no es villana absoluta. Leche materna humana ≠ leche de vaca.

## Mapa de la familia

Leche fresca → UHT → polvo → queso/yogur/mantequilla de oficio → suero / caseinatos → bebida láctea azucarada → chocolate con leche. Oficio ≠ estante. Capítulo de la cola: [caseína](${caseina}).

## Ejes clínicos

| Eje | Lectura |
|-----|---------|
| Lactosa | El **azúcar** |
| Alergia IgE | Proteína en cualquier derivado que la lleve |
| A1 / BCM-7 | Hipótesis — [Brooke-Taylor 2017](${artCasein}) |
| Matriz ultraprocesada | Polvo + azúcar — [Hall 2019](${hall}) · [OMS](${artWho}) |

## Todos los vídeos (9.798)

Mismo censo que la [caseína](${caseina}), leído como mapa de productos: Lair **${lairN}** · Davis ~20 (yogur fermentado) · Manual do Mundo 5 · Rasmussen · **0** títulos «caseína».

@youtube ${vLairLeite}

@youtube ${vMundoPo}

@youtube ${vRasMal}

## Estado

**Publicada** — Productos nocivos · hub leche y derivados (salud × 9.798 vídeos). Sin dieta prescrita.

[Productos nocivos](${hub}) · [Caseína](${caseina}) · [Vaca](${vaca})
`;

  return { body, contentEn, contentEs };
}

module.exports = { buildLeiteBodies };
