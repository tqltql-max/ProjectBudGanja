'use strict';

/**
 * Inspeção Palavras · Maria
 * Pedido 1: inspeção da palavra for e maria.
 * Pedido 2: cruze para maria.
 *
 * Aterra em Maria. For é a partícula que aponta.
 * EN for ≈ PT para (destino / beneficiário). O segundo pedido já falava a tradução.
 * Homógrafo PT for (futuro do conjuntivo de ser/ir) = outra árvore.
 * Cola cortada: for + Maria ≠ formaria.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/maria-palavra-cover.jpg';
const WIKT_MARIA = 'https://pt.wiktionary.org/wiki/Maria';
const WIKT_MARIA_EN = 'https://en.wiktionary.org/wiki/Maria#Portuguese';
const WIKT_MIRYAM = 'https://en.wiktionary.org/wiki/Miriam#English';
const WIKT_FOR_EN = 'https://en.wiktionary.org/wiki/for';
const WIKT_FOR_PT = 'https://pt.wiktionary.org/wiki/for';
const WIKT_PARA = 'https://pt.wiktionary.org/wiki/para';
const WIKT_POR = 'https://pt.wiktionary.org/wiki/por';
const WIKT_FORMARIA = 'https://pt.wiktionary.org/wiki/formaria';
const WIKT_SER = 'https://pt.wiktionary.org/wiki/ser';
const WIKI_MARIA = 'https://pt.wikipedia.org/wiki/Maria';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem' || p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Maria.
Não é a planta.
Não é o condicional formaria.
É o nome.

Miryam no hebraico.
Maria no latim.
A boca brasileira
guarda o mesmo vocábulo.

For aponta.
Em inglês: for Maria.
Em português: para Maria.
O pedido já dizia o destino.

O for de quando eu for
é outra árvore.
Ser e ir no conjuntivo.
Homógrafo, não pai.

Valeu !!!
o nome no sítio
e a partícula a apontar.`;
}

function poemEn() {
  return `Maria.
It is not the plant.
It is not the conditional formaria.
It is the name.

Miryam in Hebrew.
Maria in Latin.
The Brazilian mouth
keeps the same word.

For points.
In English: for Maria.
In Portuguese: para Maria.
The request already named the destination.

The for of quando eu for
is another tree.
Ser and ir in the subjunctive.
A homograph, not a parent.

Valeu !!!
the name in place
and the particle pointing.`;
}

function poemEs() {
  return `Maria.
No es la planta.
No es el condicional formaria.
Es el nombre.

Miryam en hebreo.
Maria en latín.
La boca brasileña
guarda el mismo vocablo.

For apunta.
En inglés: for Maria.
En portugués: para Maria.
El pedido ya decía el destino.

El for de quando eu for
es otro árbol.
Ser e ir en el subjuntivo.
Homógrafo, no padre.

¡Valeu !!!
el nombre en su sitio
y la partícula apuntando.`;
}

function buildMariaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-maria.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const dona = '/posts/post-inspecao-personagem-dona-maria.html';
  const marijuana = '/posts/post-inspecao-palavra-marijuana.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const nossa = '/posts/post-inspecao-expressao-nossa-senhora-ambulancia-sirene-jesus-cristo.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Maria](${self})** — o **nome próprio**. Pedido de campo: *inspeção da palavra for e maria*. Eco: *cruze para maria*.

O lab **aterra no destino**. O **objecto** é o vocábulo *Maria*. O **cruzamento** é **for** — a partícula inglesa de destino / beneficiário, cuja irmã portuguesa viva é **para**. O segundo pedido já falava a tradução: cruzar **para** Maria. [A orelha](${orelhaCola}) pode colar *for* + *Maria* em *formaria*; o [étimo](${etimo}) **corta**. O *for* português (*quando eu for*) é **homógrafo**, outra árvore — [conjugação](${conjugacao}) de *ser* / *ir*. Objecto = o **nome**. Não é hagiografia. Não é a planta. Não é a personagem [Dona Maria](${dona}) (ficha à parte). Não é o condicional de *formar*.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · Maria](${WIKT_MARIA}), EN [*Maria*](${WIKT_MARIA_EN}), [*Miriam*](${WIKT_MIRYAM}), EN [*for*](${WIKT_FOR_EN}), PT [*for*](${WIKT_FOR_PT}), [*para*](${WIKT_PARA}), [*por*](${WIKT_POR}), [*formaria*](${WIKT_FORMARIA}), [*ser*](${WIKT_SER}), [Maria (WP)](${WIKI_MARIA}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ sermão, ≠ biografia de santa, ≠ ficha de [marijuana](${marijuana}).** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Maria* / *maria* / *Miriam* / *Miryam* / *for Maria* / *para Maria* / *for* / *formaria* / *Ave Maria*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Maria** |
| Classe | Nome próprio feminino (também antropónimo comum BR) |
| Étimo (trabalho) | Hebr. מִרְיָם *Miryam* → gr. Μαρία / Μαριάμ → lat. *Maria* → PT **Maria** — confiança da **rota**: **alta**; do **miolo hebraico**: **média-baixa** (em disputa) |
| Cruzamento | **for** (EN) ≈ **para** (PT) — a partícula que **aponta** ao nome |
| Homógrafo cortado | PT *for* — futuro do conjuntivo de *ser* / *ir* |
| Cola cortada | *formaria* — condicional de *formar* (lat. *fōrmāre*) |
| Tipo BudGanja | Palavra — nome × partícula de destino |
| Não é | [Marijuana](${marijuana}) · [Dona Maria](${dona}) · catecismo · *formaria* |
| Data | ${inspected} |
| Fonte | [Maria](${WIKT_MARIA}) |

**O que é o objecto:** o **nome** que o português herda do latim *Maria*, do grego, do hebraico *Miryam*. No Brasil é antropónimo frequentíssimo; também vocativo, invocação e peça de [respeito](${respeito}). Nesta ficha o lab nomeia o **vocábulo**, não administra fé nem funde pessoa, planta e personagem.

## 2. O cruzamento — *for* aponta **para** Maria

Pedido de campo: *for e maria*; depois *cruze **para** maria*. O lab **cruza** e **não funde**.

| Peça | Forma | Origem | Ofício nesta ficha |
|------|-------|--------|---------------------|
| **Nome** | *Maria* | hebr. *Miryam* → lat. *Maria* | O **destino** — o objecto |
| **Partícula EN** | *for* | OE *for* ← germ. *furi* / *fura* «diante, a favor de» | Aponta o beneficiário / o destino |
| **Irmã PT** | *para* | ant. *pera* ← lat. *per ad* «através até» | O pedido já a usou: *cruze **para*** |
| **Homógrafo PT** | *for* | lat. *fuerō* (fut. perfeito de *esse*) + analogia de *īre* | *quando eu for* — **outra árvore** |
| **Cola** | *formaria* | *formar* + *-ia* ← lat. *fōrmāre* | A orelha junta; o étimo **corta** |
| **Sala cortada** | *por* | lat. *prō* | Causa / meio / troca — **não** é *for* EN |
| **Sala cortada** | \`for\` (código) | a mesma partícula EN no laço | Outro ofício da sala inglesa |
| **Sala cortada** | [marijuana](${marijuana}) | hisp. *marihuana*; folclore María + Juana | **Não** é o étimo do nome |

**H-cruzamento:** a [relação](${relacao}) pedida é de **ofício**: a preposição **aponta**. *For Maria* = *para Maria* = o nome como destino / dedicatória. **Não** é genealogia.  
**H-para:** o eco *cruze para maria* traduz o inglês *for* sem o lab inventar o calco. *Para* ≠ *por*.  
**H-orelha:** [a orelha](${orelhaCola}) cola *forMaria* em *formaria*. A cola ensina o corte: duas árvores, um sopro.

## 3. *Maria* — Miryam → Maria

A rota é estável. O miolo hebraico **não**.

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Hebr. מִרְיָם** *Miryam* | Nome feminino bíblico (irmã de Moisés) | Alta o nome; **aberta** a etimologia interna |
| **Egípcio *mrj*** «amado» | Hipótese frequente (via Egipto) | **Média** — hipótese de trabalho, não fecho |
| **«Amargura» / *mar*** | Folk / midrash (mar amargo) | **Baixa** como étimo; viva como leitura cultural |
| **Grego Μαρία / Μαριάμ** | Transliteração | Alta |
| **Latim *Maria*** | Forma ocidental estável | Alta |
| **PT / ES / IT *Maria*** | Herança latina | Alta |
| **EN *Mary* / *Maria*** | *Mary* é a via inglesa; *Maria* reentra como forma latina / romance | Alta |

**H-rota:** PT *Maria* < lat. *Maria* < gr. < hebr. *Miryam* — **alta**.  
**H-miolo:** o lab **não fecha** «amada» nem «amarga». Nomear o debate ≠ baptizar um pai.  
**H-vocativo:** no BR, *Maria* é nome, tratamento e, em algumas bocas, invocação. Esta ficha cobre o **vocábulo**. A fé fica na sala da pessoa; o lab não a administra. Ver [Nossa Senhora…](${nossa}) e [jesusamado](${jesusamado}) — **expressões**, outras fichas.

## 4. *for* — três salas, um grafema

O mesmo desenho *for* abre **três** portas. O lab **não** as funde.

| Sala | Língua | Étimo | Ofício |
|------|--------|-------|--------|
| **A. Preposição** | EN | germ. *furi* / OE *for* | Destino, benefício, duração, causa larga — *for Maria* |
| **B. Conjuntivo** | PT | lat. *fuerō* / *īre* | Futuro do conjuntivo de *ser* e de *ir* — *se for* / *quando eu for* |
| **C. Laço** | código | a sala A no interpretador | \`for (…)\` — repetir enquanto; **não** é o nome |

Cognatos da sala A: al. *für*, nl. *voor*, din. *for*. A sala B vive na [conjugação](${conjugacao}): *for, fores, for, formos, fordes, forem*. Mesma forma para *ser* e *ir* — o português **juntou** os dois verbos neste tempo. O [latim](${latim}) ainda os distinguia (*fuerō* × *ierō*).

**H-ser-ir:** *quando eu for* pode ser «quando eu **existir / estiver**» ou «quando eu **for (a algum sítio)**». O contexto corta; o grafema não.  
**H-código:** o \`for\` do programa é a sala A a trabalhar em laço. Outro ofício; mesma peça inglesa.

## 5. *para* × *por* × *formaria*

| Forma | Étimo | Ofício | Corte |
|-------|-------|--------|-------|
| **para** | *pera* ← *per ad* | Destino, finalidade, beneficiário | Irmã PT de EN *for* |
| **por** | lat. *prō* | Causa, meio, troca, agente | **Não** traduz *for Maria* |
| **formaria** | *formar* + *-ia* ← *fōrmāre* | Condicional: «eu/ele formaria» | Cola de orelha com *for*+*Maria* |
| **forma / fôrma** | lat. *fōrma* | Figura / molde | Outra sala; não esta ficha |

**H-para-por:** *um presente **para** Maria* (beneficiário) ≠ *um presente **por** Maria* (troca / em nome de). O inglês *for* cobre os dois em parte; o português **corta**. Nesta ficha o cruzamento é o **para**.  
**H-formaria:** a boca junta. O papel escreve *formar* + desinência. Não há *Maria* no étimo de *formaria*.

## 6. O que a boca faz

| Camada BR | Leitura | Sala |
|-----------|---------|------|
| **Maria** | Nome de mulher; antropónimo comum | Esta ficha |
| **Dona Maria** | Matriarca do lab — [personagem](${dona}) | Outra ficha; elo com [mãe](${mae}) |
| **Ave Maria** | Oração / interjeição | Uso do nome; **não** étimo; não administrar fé |
| **for Maria** | Dedicatória EN | Cruzamento — sala A |
| **para Maria** | O mesmo ofício em PT | Cruzamento — irmã |
| **quando eu for** | Conjuntivo | Sala B — [conjugação](${conjugacao}) |
| **formaria** | «Eu formaria» | Cola cortada |
| **marijuana / María Juana** | Folclore do nome da planta | [Marijuana](${marijuana}) · [maconha](${maconha}) — **outras** rotas |

**H-planta:** a orelha ouve *Maria* dentro de *marijuana*. O lab já fichou essa arma de pânico e xenofobia. **Não** puxar o antropónimo para a planta nem a planta para o antropónimo.  
**H-dona:** [Dona Maria](${dona}) **usa** o nome; não o define. Honrar a personagem ≠ fundir lema e conto.

## 7. Hipóteses

**H1:** PT *Maria* < lat. *Maria* < gr. Μαρία / Μαριάμ < hebr. *Miryam* — alta a rota.  
**H2:** o étimo interno de *Miryam* permanece **aberto** — alta o corte; média-baixa qualquer pai único.  
**H3:** o cruzamento *for* × *Maria* é de **ofício** (apontar / dedicar), não de sangue — alta.  
**H4:** EN *for* ≈ PT *para* neste pedido; *por* é outra árvore (*prō*) — alta.  
**H5:** PT *for* (conjuntivo) < *fuerō* / *īre* — alta; homógrafo da sala A.  
**H6:** *formaria* **não** é composto de *for* + *Maria* — alta.  
**H7:** [marijuana](${marijuana}) e [Dona Maria](${dona}) são salas vizinhas, não étimos — alta.  
**H8:** Ave Maria / Nossa Senhora são **usos** do nome; esta ficha não é rito — alta.  
**H9:** o \`for\` do código é a sala A noutro ofício — alta.  
**H10:** o lab alumia com [verdade](${verdade}): o nome no sítio; a partícula a apontar.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **for + Maria** | Uma só palavra (*formaria*) | Partícula + nome; a cola é de orelha |
| **for** | Um só vocábulo | Três salas: EN prep. · PT conjuntivo · laço de código |
| **para** | Sinónimo frouxo de *por* | Destino / finalidade — irmã de EN *for* aqui |
| **Maria** | A planta / a santa / a personagem | O **antropónimo**; as outras são salas |
| **Miryam** | «Amarga» fechada | Nome hebraico; miolo **em disputa** |
| **Ave Maria** | Étimo do nome | Uso / invocação — outra sala |
| **Dona Maria** | O lema desta ficha | Personagem [Vida](${vidaHub}) — [ficha irmã](${dona}) |

## 9. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *Maria* como *Miryam* → lat. *Maria* |
| Bom | Cruzar com *for* / *para* sem fundir partícula e nome |
| Bom | Cortar *formaria*, *por*, o conjuntivo e o laço de código nas suas salas |
| Bom | Ligar [Dona Maria](${dona}) e [mãe](${mae}) sem as fazer étimo |
| Bom | Deixar o miolo hebraico **aberto** |
| Mau | Ensinar que *Maria* «vem de» marijuana |
| Mau | Ficha de santo, de parto ou de cultivo |
| Mau | Fundir *quando eu for* com *for Maria* |
| Mau | Fechar «amada» ou «amarga» como pai único |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=maria)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Dona Maria](${dona}) · [mãe](${mae}) · [Vida](${vida}) | Quem **usa** o nome no lab — não o define |
| [Marijuana](${marijuana}) · [maconha](${maconha}) | Outra rota; folclore María Juana **cortado** aqui |
| [Nossa Senhora…](${nossa}) · [jesusamado](${jesusamado}) | Expressões — uso do sagrado, outras fichas |
| [Conjugação](${conjugacao}) · [latim](${latim}) | A sala B de *for* (*ser* / *ir*) |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Rota × miolo aberto |
| [Relação](${relacao}) · [orelha cola](${orelhaCola}) | Apontar × colar |
| [Respeito](${respeito}) · [verdade](${verdade}) · [gesto](${gesto}) | Nomear sem administrar fé |
| [Guia](${guia}) · [Palavras](${hub}) | Índice |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é hagiografia, novena nem biografia de pessoa real fora do quadro [Dona Maria](${dona}).  
- Não fecha o étimo interno de *Miryam*.  
- Não é a ficha de [marijuana](${marijuana}) nem tutorial de \`for\` em código.  
- *Para* e *por* ficam mapeados; não esgotam a preposição portuguesa.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **Maria** fichada como hebr. *Miryam* → lat. *Maria* (rota alta; miolo aberto). Cruzada com **for** (EN *for* ≈ PT *para*: a partícula aponta). Homógrafo PT *for* (*ser* / *ir*) cortado na classe. Cola *formaria* cortada. [Marijuana](${marijuana}) e [Dona Maria](${dona}) em salas vizinhas. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Dona Maria](${dona}) · [▶ Mãe](${mae}) · [▶ Conjugação](${conjugacao}) · [▶ Marijuana](${marijuana}) · [▶ Poema Vida](/vida/#poema=maria) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[Maria](${self})** — the **given name**. Field request: *the words for and maria*. Echo: *cross toward maria*.

The lab **lands on the destination**. The **object** is *Maria*. The **crossing** is English **for** — the particle of beneficiary / destination, whose living Portuguese sister is **para**. The second request already spoke the translation: cross **to** Maria. The [ear](${orelhaCola}) may glue *for* + *Maria* into *formaria*; the [etymon](${etimo}) **cuts**. Portuguese *for* (*quando eu for*) is a **homograph**, another tree — [conjugação](${conjugacao}) of *ser* / *ir*. Not hagiography. Not the plant. Not [Dona Maria](${dona}) (another sheet).

> Sources: [Maria](${WIKT_MARIA}), [*Miriam*](${WIKT_MIRYAM}), [*for*](${WIKT_FOR_EN}), PT [*for*](${WIKT_FOR_PT}), [*para*](${WIKT_PARA}), [*formaria*](${WIKT_FORMARIA}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Two pieces

| Piece | Form | Origin | Office |
|-------|------|--------|--------|
| **Name** | *Maria* | Heb. *Miryam* → Lat. *Maria* | The **destination** |
| **Particle** | EN *for* ≈ PT *para* | Gmc *furi* / Lat. *per ad* | It **points** |
| **Homograph** | PT *for* | Lat. *fuerō* / *īre* | Future subjunctive of *ser* / *ir* |
| **Glue cut** | *formaria* | *fōrmāre* + *-ia* | Conditional of *formar* — not *for*+*Maria* |
| **Cut rooms** | *por* · [marijuana](${marijuana}) · Ave Maria as rite | *prō* · plant folk · invocation | Other sheets |

The inner Hebrew of *Miryam* stays **open** (beloved / bitter / other). The path Heb → Gk → Lat → PT is **high**.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *Maria* < *Miryam*. Crossed with *for* / *para*. Homograph and glue cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Maria](${self})** — el **nombre propio**. Pedido: *las palabras for y maria*. Eco: *cruza hacia maria*.

El lab **aterra en el destino**. El **objeto** es *Maria*. El **cruce** es el inglés **for** — partícula de beneficiario / destino, cuya hermana portuguesa viva es **para**. El segundo pedido ya decía la traducción: cruzar **hacia** Maria. El [oído](${orelhaCola}) puede pegar *for* + *Maria* en *formaria*; el [étimo](${etimo}) **corta**. El *for* portugués (*quando eu for*) es **homógrafo**, otro árbol — [conjugação](${conjugacao}). No es hagiografía. No es la planta. No es [Dona Maria](${dona}).

> Fuentes: [Maria](${WIKT_MARIA}), [*Miriam*](${WIKT_MIRYAM}), [*for*](${WIKT_FOR_EN}), PT [*for*](${WIKT_FOR_PT}), [*para*](${WIKT_PARA}), [*formaria*](${WIKT_FORMARIA}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Dos piezas

| Pieza | Forma | Origen | Oficio |
|-------|-------|--------|--------|
| **Nombre** | *Maria* | hebr. *Miryam* → lat. *Maria* | El **destino** |
| **Partícula** | EN *for* ≈ PT *para* | germ. *furi* / lat. *per ad* | **Apunta** |
| **Homógrafo** | PT *for* | lat. *fuerō* / *īre* | Subjuntivo futuro de *ser* / *ir* |
| **Cola cortada** | *formaria* | *fōrmāre* + *-ia* | Condicional de *formar* |
| **Salas cortadas** | *por* · [marijuana](${marijuana}) · Ave Maria como rito | *prō* · folclore de la planta · invocación | Otras fichas |

El meollo hebreo de *Miryam* queda **abierto**. La ruta hebr. → gr. → lat. → PT es **alta**.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *Maria* < *Miryam*. Cruzada con *for* / *para*. Homógrafo y cola cortados. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMariaPost() {
  const { body, contentEn, contentEs } = buildMariaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-maria', 313);
  return makePalavra({
    title: 'Inspeção: Maria — Miryam; cruzada com for (para)',
    titleEn: 'Inspection: Maria — Miryam; crossed with for (para)',
    titleEs: 'Inspección: Maria — Miryam; cruzada con for (para)',
    excerpt:
      'Palavras: Maria (hebr. Miryam → lat. Maria) × for (EN for ≈ PT para — a partícula aponta); ≠ for conjuntivo ≠ formaria ≠ marijuana; Valeu !!!',
    excerptEn:
      'Words: Maria (Heb. Miryam → Lat. Maria) × for (EN for ≈ PT para — the particle points); ≠ subjunctive for ≠ formaria ≠ marijuana; Valeu !!!',
    excerptEs:
      'Palabras: Maria (hebr. Miryam → lat. Maria) × for (EN for ≈ PT para — la partícula apunta); ≠ for conjuntivo ≠ formaria ≠ marijuana; ¡Valeu !!!',
    slug: 'inspecao-palavra-maria',
    date: '2026-08-24T12:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Maria · for · para',
    coverImage: COVER,
    sourceUrl: WIKT_MARIA,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMariaPost,
  buildMariaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_MARIA,
  WIKT_FOR_EN,
  WIKT_FOR_PT,
  WIKT_PARA,
  WIKT_MIRYAM,
  WIKT_FORMARIA
};
