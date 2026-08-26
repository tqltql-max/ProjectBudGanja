'use strict';

/**
 * Inspeção Expressões · plantar a semente / plantar as sementes
 * Pedido de campo: *expressão plantar a sementes* (artigo singular + nome plural).
 * Gesto activo (plantar) × resultado Vida («A semente foi plantada»).
 * Ficha ≠ guia de cultivo (profundidade, germinação, PPFD).
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/plantar-a-semente-cover.jpg';
const WIKT_PLANTAR = 'https://pt.wiktionary.org/wiki/plantar';
const WIKT_SEMENTE = 'https://pt.wiktionary.org/wiki/semente';
const WIKT_PLANTARE = 'https://en.wiktionary.org/wiki/plantare#Latin';
const WIKT_SEMEN = 'https://en.wiktionary.org/wiki/semen#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n) && n > 0)
    );
    if (!taken.size) return start;
    seriesOrder = Math.max(...taken) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `A palma ainda tinha a semente.
A terra pedia o gesto.
Plantar a semente
é o início — não a flor.

Não é a planta já de pé.
Não é a fábrica.
Não é o guia de profundidade.
É a semente que some da mão
para aparecer no tempo.

A semente — uma.
As sementes — muitas.
A sementes — o artigo e o plural brigam.
A orelha cola; o étimo corta.

«A semente foi plantada»
é o resultado.
Plantar a semente
é ainda a palma aberta.

Valeu !!!
com a semente no chão,
sem pedir flor hoje.`;
}

function poemEn() {
  return `The palm still held the seed.
The soil asked for the gesture.
Plantar a semente
is the beginning — not the flower.

It is not the plant already standing.
It is not the factory.
It is not a depth guide.
It is the seed that leaves the hand
to appear in time.

The seed — one.
The seeds — many.
A sementes — article and plural fight.
The ear glues; the etymon cuts.

“The seed was planted”
is the result.
To plant the seed
is still the open palm.

Valeu !!!
with the seed in the ground,
without asking for flower today.`;
}

function poemEs() {
  return `La palma aún tenía la semilla.
La tierra pedía el gesto.
Plantar a semente
es el inicio — no la flor.

No es la planta ya de pie.
No es la fábrica.
No es la guía de profundidad.
Es la semilla que sale de la mano
para aparecer en el tiempo.

La semilla — una.
Las semillas — muchas.
A sementes — el artículo y el plural pelean.
El oído pega; el étimo corta.

«La semilla fue plantada»
es el resultado.
Plantar la semilla
es aún la palma abierta.

Valeu !!!
con la semilla en el suelo,
sin pedir flor hoy.`;
}

function buildPlantarASementeBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-plantar-a-semente.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const semente = '/posts/post-inspecao-palavra-semente.html';
  const mao = '/posts/post-inspecao-expressao-meter-a-mao.html';
  const arvore = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const inicio = '/posts/post-inspecao-arte-o-inicio.html';
  const vidaLab = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const guiaCultivo = '/guia/cultivo-basico.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[plantar a semente](${self})»** — locução viva: o **[gesto](${gesto})** de **fincar a [semente](${semente})** na terra. Pedido de campo: *expressão plantar a sementes*. [A orelha cola](${orelhaCola}) o artigo **a** (singular) ao nome **sementes** (plural). O [étimo](${etimo}) **corta**: ou **a semente** (uma, a conhecida) ou **as sementes** (muitas). A âncora desta ficha é o **gesto activo** — *plantar*. O poema da Vida **«A semente foi plantada»** é o **resultado** (particípio); não é esta locução.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · plantar](${WIKT_PLANTAR}), [semente](${WIKT_SEMENTE}), lat. [*plantare*](${WIKT_PLANTARE}), [*sēmen*](${WIKT_SEMEN}). **Ficha ≠ guia de cultivo** (sem profundidade, sem tempo de germinação, sem PPFD). Sem afiliação comercial. Tom: [gesto](${gesto}) no [caminho](${caminho}) — a palma entrega; a terra fica.

**Gatilho:** *plantar a sementes* / *plantar a semente* / *plantar as sementes* / *plantar uma semente* → **plantar a semente** (âncora) · **plantar as sementes** (plural). *Plantar uma ideia* → sala **metáfora**, não objecto.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **plantar a semente** |
| Variantes | *plantar as sementes* · *plantar uma semente* · *plantar a sementes* (lapso) · *plantar a semente da…* |
| Classe | Locução verbal |
| Peças | **plantar** (lat. *plantare* «fincar, pôr a crescer») + artigo + **semente** (lat. *sēmen*) |
| Núcleo | Gesto — a palma **entrega** a partida à terra |
| Tipo BudGanja | Expressão — [gesto](${gesto}) × [semente](${semente}) × [planta](${planta}) × [ação](${acao}) |
| O que **não** é | Guia de cultivo · [planta](${planta}) industrial (fábrica) · vocábulo [semente](${semente}) sozinho · «A semente foi plantada» (resultado) · *plantar uma ideia* como âncora |
| Elo | [planta](${planta}) · [semente](${semente}) · [meter a mão](${mao}) · [árvore da vida](${arvore}) · [O Início](${inicio}) · [Vida](${vida}) |
| Fonte | [plantar](${WIKT_PLANTAR}) · [semente](${WIKT_SEMENTE}) |
| Data | ${inspected} |

**Objecto:** o acto de **pôr a semente a crescer**. No laboratório: a palma de [meter a mão](${mao}) encontra a terra; a [semente](${semente}) some; o tempo aparece. Nomeia-se o gesto. **Não** se ensina a receita.

## 2. Hipóteses e método

**H1:** *plantar* herda lat. *plantare* — **fincar / pôr a crescer**; *semente* herda lat. *sēmen* — a partida — confiança **alta**.  
**H2:** a canónica de ofício é o **gesto activo**: a palma ainda tem a semente; a terra ainda pede.  
**H3:** [A orelha cola](${orelhaCola}) *a* + *sementes*. O [étimo](${etimo}) corta: artigo e número **concordam**. Lapso ≠ lema.  
**H4:** **«A semente foi plantada»** (Vida) é particípio / resultado. **Plantar a semente** é o infinitivo / o agora. Relacionar ≠ fundir.  
**H5:** *plantar uma ideia* é metáfora viva — **cita-se**; não é o objecto desta ficha. A âncora é a [semente](${semente}) da terra.  
**H6:** [planta](${planta}) industrial («fábrica») fica na ficha da palavra. Aqui o verbo *plantar* não abre a fábrica.  
**H7:** [cultivo](${cultivo}) e o [guia básico](${guiaCultivo}) são **elos de ofício**. Esta ficha **não** copia profundidade, germinação nem luz.

## 3. Salas (não misturar)

| Sala | Leitura | No lab |
|------|---------|--------|
| **Ofício / literal** | Fincar a semente na terra | Canónica desta ficha |
| **Gramática** | *a semente* × *as sementes* × lapso *a sementes* | Orelha cola; étimo corta |
| **Resultado** | *foi plantada* — a semente já saiu da palma | Poema Vida — **outra sala** |
| **Metáfora** | *plantar uma ideia / uma dúvida / um hábito* | Cita-se; **não** âncora |
| **Ser vivo** | A [planta](${planta}) que pode nascer | Ficha de palavra — elos, não fusão |
| **Fábrica** | *planta* industrial | **Corte** — outra ficha |
| **Guia** | Profundidade, germinação, PPFD | **Corte** — [cultivo](${cultivo}) / [guia](${guiaCultivo}) |
| **Mão** | [Meter a mão](${mao}) na terra | Irmã de ofício — a palma que entrega |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Plantar** | Verbo — fincar no solo (lat. *plantare*) | [Gesto](${gesto}) activo — a palma **entrega**; família de [planta](${planta}) |
| **a / as / uma** | Artigo ou numeral | *a* = a semente **conhecida**; *as* = muitas; *uma* = uma entre outras |
| **Semente / sementes** | Partida do vivo (lat. *sēmen*) | Ficha [semente](${semente}) — o que cabe na palma; no gelo vira mudinha |

**Lapso de campo:** *plantar **a** sementes* — artigo singular + nome plural. Lê-se o calor (a boca já via muitas); escreve-se a concordância.

**≠** *plantar a planta*: outra peça — muda / ser já formado, não a semente.  
**≠** *semear*: irmã próxima (lançar ao lanço); *plantar* **finca** — mais contacto, menos espalhar.

## 5. Gramática do pedido — a × as × a sementes

| Forma | Número | Ofício |
|-------|--------|--------|
| **plantar a semente** | Uma, definida | Âncora — *esta* partida, a da palma |
| **plantar as sementes** | Muitas, definidas | Variante — o canteiro, o saco, o tempo |
| **plantar uma semente** | Uma, indefinida | Irmã — uma entre outras |
| **plantar a sementes** | Artigo e plural **brigam** | Lapso de campo — orelha; não lema |

Três formas boas. Um gatilho. A inspeção honra o pedido **sem** canonizar a briga.

## 6. Gesto × resultado × metáfora

| Locução | Tempo | Ofício |
|---------|-------|--------|
| **[plantar a semente](${self})** | Agora — a palma ainda tem | Gesto activo |
| **A semente foi plantada** | Depois — a terra já fechou | Resultado — [Vida](${vida}) / [laboratório](${vidaLab}) |
| **plantar uma ideia** | Figura | Metáfora — cita-se; a âncora continua a ser a terra |
| **[meter a mão](${mao})** | Contacto | A palma entra; aqui a palma **deixa** a semente |

Quatro salas. O verbo *plantar* une o gesto e o particípio. A metáfora **empresta** a imagem; não substitui o chão.

## 7. O que parece × o que é

| Parece | É |
|--------|---|
| Manual de cultivo | Nome do [gesto](${gesto}) — o [guia](${guiaCultivo}) fica no hub |
| A [planta](${planta}) já de pé | A [semente](${semente}) ainda na palma |
| Sinónimo de «A semente foi plantada» | Infinitivo × particípio — início × já está |
| *Plantar a sementes* como lema | Lapso de concordância — gatilho, não âncora |
| Fábrica / *planta* industrial | Outra sala da palavra [planta](${planta}) |
| Só metáfora (*plantar uma ideia*) | A âncora é o ofício da terra |

## 8. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Plantar a semente com a mão na terra — [meter a mão](${mao}) |
| Bom | Plantar as sementes quando o canteiro pede muitas |
| Bom | Citar *plantar uma ideia* como figura, sem trocar o chão pela frase |
| Bom | Deixar a Vida dizer «foi plantada» **depois** do gesto |
| Mau | Pedir flor no mesmo dia — o poema recusa a pressa |
| Mau | Copiar receita de profundidade / germinação nesta ficha |
| Mau | Fundir semente, planta e fábrica num só vocábulo |

## 9. Limites

- Não ensinamos profundidade, tempo de germinação, fotoperíodo nem PPFD. Isso vive em [cultivo](${cultivo}) e no [guia básico](${guiaCultivo}) — elos, não cópia.  
- Não é monografia da palavra [semente](${semente}) nem da palavra [planta](${planta}).  
- Não é o poema **«A semente foi plantada»** — esse é o fecho da [Vida](${vida}); esta ficha é o **abrir da palma**.  
- [Árvore da vida](${arvore}) é o horizonte possível; a semente **ainda não** é árvore.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **plantar a semente** = o [gesto](${gesto}) que entrega a partida à terra. Variante: **plantar as sementes**. Lapso de campo: *plantar a sementes* (artigo × plural). Distinto de **«A semente foi plantada»** (resultado). Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) **com a semente no chão**, sem pedir flor hoje.

[▶ Expressões](${hub}) · [▶ Semente](${semente}) · [▶ Planta](${planta}) · [▶ Meter a mão](${mao}) · [▶ Árvore da vida](${arvore}) · [▶ O Início](${inicio}) · [▶ Valeu !!!](${valeu}) · [▶ Palavras](${hubPalavras}) · [▶ Plantas](${plantas}) · [▶ Cultivo](${cultivo}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Faça o seu melhor](${faca}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Brazilian saying **«[plantar a semente](${self})»** — the **gesture** of setting a [seed](${semente}) in the soil. Field: *expressão plantar a sementes* (singular article + plural noun). Craft canon: **plantar a semente** (one) / **plantar as sementes** (many). Sister of **[meter a mão](${mao})** (the palm that delivers). Inverse in time of Vida’s **“The seed was planted”** (result, not the act). Cuts: grow-guide numbers, industrial *planta* (factory), metaphor as âncora.

> Independent audit. [plantar](${WIKT_PLANTAR}), [semente](${WIKT_SEMENTE}), Lat. [*plantare*](${WIKT_PLANTARE}), [*sēmen*](${WIKT_SEMEN}). **Not** a cultivation manual (no depth, germ time, or PPFD).

## Object

| Field | Value |
|-------|-------|
| Saying | **plantar a semente** |
| Pieces | *plantar* (Lat. *plantare*) + article + *semente* (Lat. *sēmen*) |
| Lab | Active gesture — the palm still holds the seed |
| Not | Grow recipe · factory · word-sheet [semente](${semente}) alone · “was planted” as âncora |
| Date | ${inspected} |

**H1:** *plantar* = to set to grow; *semente* = the start.  
**H2:** field slip *a sementes* = ear-glue; etymon cuts agreement.  
**H3:** “was planted” is the result; this sheet is the infinitive.  
**H4:** *plantar uma ideia* is metaphor — cited, not the object.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved. Seed in the ground. [Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Sayings](${hub}) · [▶ Seed](${semente}) · [▶ Plant](${planta}) · [▶ Hands-on](${mao}) · [▶ Tree of life](${arvore}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Dicho BR **«[plantar a semente](${self})»** — el **gesto** de hincar la [semilla](${semente}) en la tierra. Pedido: *expressão plantar a sementes* (artículo singular + nombre plural). Canónica: **plantar a semente** (una) / **plantar as sementes** (muchas). Hermana de **[meter a mão](${mao})**. Inverso en el tiempo del poema Vida **«La semilla fue plantada»** (resultado). Cortes: receta de cultivo, *planta* fábrica, metáfora como âncora.

> Auditoría independiente. [plantar](${WIKT_PLANTAR}), [semente](${WIKT_SEMENTE}). **No** es guía de cultivo (sin profundidad, germinación ni PPFD).

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **plantar a semente** |
| Piezas | *plantar* (lat. *plantare*) + artículo + *semente* (lat. *sēmen*) |
| Lab | Gesto activo — la palma aún tiene la semilla |
| No es | Receta de cultivo · fábrica · ficha [semente](${semente}) sola · «fue plantada» como âncora |
| Fecha | ${inspected} |

**H1:** *plantar* = poner a crecer; *semente* = la partida.  
**H2:** *a sementes* = oído; el étimo corta la concordancia.  
**H3:** «fue plantada» es el resultado; esta ficha es el infinitivo.  
**H4:** *plantar una idea* es metáfora — se cita; no es el objeto.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado. Semilla en el suelo. [¡Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Expresiones](${hub}) · [▶ Semilla](${semente}) · [▶ Planta](${planta}) · [▶ Manos a la obra](${mao}) · [▶ Árbol de la vida](${arvore}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_PLANTAR };
}

function buildPlantarASementePost() {
  const { body, contentEn, contentEs, wiki } = buildPlantarASementeBodies();
  return expressaoPost({
    title: 'Inspeção: Plantar a semente — o gesto que entrega a partida',
    titleEn: 'Inspection: Plantar a semente — the gesture that delivers the start',
    titleEs: 'Inspección: Plantar a semente — el gesto que entrega la partida',
    excerpt:
      'Expressões: plantar a semente / as sementes — gesto activo; lapso a sementes; ≠ guia de cultivo ≠ fábrica ≠ «foi plantada»; Valeu !!!',
    excerptEn:
      'Sayings: plantar a semente / as sementes — active gesture; slip a sementes; ≠ grow guide ≠ factory ≠ “was planted”; Valeu !!!',
    excerptEs:
      'Dichos: plantar a semente / as sementes — gesto activo; lapso a sementes; ≠ guía de cultivo ≠ fábrica ≠ «fue plantada»; ¡Valeu !!!',
    slug: 'inspecao-expressao-plantar-a-semente',
    date: '2026-08-26T09:20:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-plantar-a-semente', 45),
    seriesLabel: 'Plantar a semente · gesto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPlantarASementePost,
  buildPlantarASementeBodies,
  poemPt,
  poemEn,
  poemEs
};
