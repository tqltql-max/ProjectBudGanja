'use strict';

/**
 * Inspeção Palavras · moela
 * Pedido: relação mola × moela × moeda.
 * Eixos: lat. *molēlla ← mola (mó) · moinho da ave ·
 * ≠ mola (mollis) ≠ moeda (monēta) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/moela-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/moela';
const WIKT_EN = 'https://en.wiktionary.org/wiki/moela';
const WIKT_MOLA_LA = 'https://en.wiktionary.org/wiki/mola#Latin';
const WIKT_MOER = 'https://pt.wiktionary.org/wiki/moer';
const WIKI_GIZZARD = 'https://pt.wikipedia.org/wiki/Moela';
const WIKI_MOLLEJA = 'https://es.wikipedia.org/wiki/Molleja';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
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

function buildMoelaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-moela.html';
  const mola = '/posts/post-inspecao-palavra-mola.html';
  const moeda = '/posts/post-inspecao-palavra-moeda.html';
  const mula = '/posts/post-inspecao-animal-mula.html';
  const galinha = '/posts/post-inspecao-animal-galinha.html';
  const galinhaFicha = '/animais/galinha/';
  const derivadoGalinha = '/posts/post-inspecao-derivado-galinha.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[moela](${self})** — o **moinho da ave**. Pedido de campo: [relação](${relacao}) **mola · moela · moeda**. A orelha cola as três (*mo-*); o lab **separa**. A moela entra na família da **mó** (lat. *mola*, pedra de moinho) via o diminutivo hipotético *molēlla* — a **mózinha** que tritura o grão no corpo da [galinha](${galinha}). A [mola](${mola}) (peça elástica) é outra árvore (*mollis*). A [moeda](${moeda}) é outra ainda (*monēta*).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · moela](${WIKT}), [EN](${WIKT_EN}), lat. [*mola*](${WIKT_MOLA_LA}), [moer](${WIKT_MOER}), [WP · moela](${WIKI_GIZZARD}), [molleja (ES)](${WIKI_MOLLEJA}). **Ficha ≠ receita, ≠ protocolo veterinário, ≠ anatomia clínica, ≠ manual de moinho.** Sem afiliação de petisco nem de criação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *moela* / *moelas* → esta ficha. *mola* / *molas* → [objecto](${mola}). *moeda* / *moedas* → [moeda](${moeda}). *mula* → [animal](${mula}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **moela** (f.; pl. *moelas*) |
| Ofício 1 | Órgão — ventrículo muscular que **tritura** o alimento (com grit / pedrinhas) |
| Ofício 2 | Iguaria — petisco de ave, sobretudo [galinha](${galinha}) |
| Ofício 3 | Gíria BR — *apanhar uma moela* = bebedeira (outra sala) |
| Étimo (trabalho) | lat. vulg. *molēlla* «mózinha» ← *mola* «mó» — confiança: **alta na família; o diminutivo é reconstruído** |
| Família verdadeira | **mó** · **moer** · **moinho** · **molar** (dente) · esp. *molleja* |
| Não é | [mola](${mola}) (*mollis*) · [moeda](${moeda}) (*monēta*) · [mula](${mula}) · [intestino](${intestino}) |
| Tipo BudGanja | Palavra — órgão × iguaria × gíria; [relação](${relacao}) de orelha com mola e moeda |
| Elo animal | [Galinha](${galinha}) · [/animais/galinha/](${galinhaFicha}) · [animal](${animal}) |
| Fonte | [moela](${WIKT}) · [órgão (WP)](${WIKI_GIZZARD}) |
| Data | ${inspected} |

**O que é o órgão:** nas aves (e noutros) um saco muscular de paredes grossas — o **moinho vivo**. Sem dentes na boca, a ave **móí** no peito: grit entra, alimento sai triturado rumo ao [intestino](${intestino}). No lab: a moela **não** é mola nem moeda; é **a mó da ave**.

## 2. O trio de orelha (o pedido)

| Forma | Étimo | Ofício | Sangue com moela |
|-------|-------|--------|------------------|
| **[mola](${mola})** | it. *molla* ← *mollis* «mole» | Peça que cede e volta | **Não** — orelha cola |
| **moela** | *molēlla* ← lat. *mola* «mó» | Moinho da ave — esta ficha | **Sim** — neta da pedra |
| **[moeda](${moeda})** | lat. *monēta* ← *monēre* | Disco cunhado / valor | **Não** — cunho ≠ moinho |
| **mó** | lat. *mola* | Pedra de moinho | **Sim** — a avó |
| **moer** | lat. *molere* | Triturar | **Sim** — o ofício |
| **[mula](${mula})** | lat. *mūla* | Animal | **Não** — par da [mola](${mola}) |

**H1:** a [relação](${relacao}) pedida é de **orelha** no trio; de **sangue** só na família da mó.  
**H2:** a ficha [mola](${mola}) já recusava o homónimo latino *mola* (mó). Esta ficha **recolhe** esse homónimo: a moela é a **filha** que a peça elástica não podia ser.  
**H3:** o folk «moela vem de moer» **acerta a família**; o folk «moela = moeda / mola» **erra o sangue**.  
**H4:** *moela* / *moeda* é [trocadilho](${trocadilho}) de um fonema (*l* / *d*).

## 3. Camadas (sem fundir)

| Camada | O que **é** | O que **não** é |
|--------|-------------|-----------------|
| **Órgão** | Ventrículo muscular; grit; trituração | Não é [intestino](${intestino}) |
| **Moinho** | A metáfora do étimo: mózinha no peito | Não transforma a ave em engenho |
| **Iguaria** | Petisco; moela acebolada | O [derivado da galinha](${derivadoGalinha}) industrial é outra sala |
| **Orelha** | *moela* soa *mola* / *moeda* | Não prova parentesco com peça nem cunho |
| **Gíria** | *apanhar uma moela* — embriaguez | **Não** é o étimo da mó; **não** fundir com a conta do bar |
| **Folk do preço** | «moela barata / uma [moeda](${moeda})» | Uso de mercado — não étimo |

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Mola** | Mesmo *mo-* | Peça *mollis*; esta ficha é *mola*-mó |
| **Moeda** | Um *l* / um *d* | Cunho *monēta* |
| **Mula** | Quase *moela* | Animal *mūla* |
| **Estômago** | A moela «é o estômago» | Nas aves: papo + pró-ventrículo + **moela** |
| **Nugget** | A iguaria prova o órgão | O [derivado](${derivadoGalinha}) é outra ficha |

**Finalidade-mãe:** nomear a **moela** para inspecionar o **moinho da ave**, e cruzar com [mola](${mola}) e [moeda](${moeda}) **sem** colar peça nem cunho no órgão.

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Órgão | Moinho da [galinha](${galinha}) — [/animais/galinha/](${galinhaFicha}) |
| Trio | [Mola](${mola}) · **moela** · [moeda](${moeda}) |
| Família da mó | mó · moer · moinho · molar |
| Tubo | [Intestino](${intestino}) — o depois |
| Método | [Relação](${relacao}) · [trocadilho](${trocadilho}) · [étimo](${etimo}) |
| Mantra | [Valeu !!!](${mantra}) |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **moela** é a mózinha (*molēlla*); **mola** é peça (*mollis*); **moeda** é cunho (*monēta*). A orelha junta as três; o sangue só a mó.

## Hipóteses (síntese)

**H1:** *moela* < *molēlla* < lat. *mola* (mó) — alta no traçado; diminutivo reconstruído.  
**H2:** sangue com mó / moer / moinho; **não** com [mola](${mola}) nem [moeda](${moeda}).  
**H3:** a [relação](${relacao}) pedida = orelha no trio + metáfora do moinho no órgão.  
**H4:** gíria da bebedeira = camada; não étimo.  
**H5:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mola](${mola}) | A peça — orelha cola, étimo corta |
| [Moeda](${moeda}) | O cunho — orelha cola, étimo corta |
| [Galinha](${galinha}) · [/animais/galinha/](${galinhaFicha}) | A ave do órgão |
| [Intestino](${intestino}) | O tubo a seguir |
| [Mula](${mula}) | Par da mola — outra sala |
| [Derivado da galinha](${derivadoGalinha}) | Indústria — não o petisco desta ficha |
| [Objectos](${objetos}) · [objetos](${objetosLema}) | A [mola](${mola}) e a [moeda](${moeda}) são coisas; a moela é órgão |
| [Trocadilho](${trocadilho}) · [relação](${relacao}) | O jogo e o *entre* |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Tesoura |
| [Gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) | Triturar sem fundir |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é receita, cardápio, protocolo veterinário nem aula de anatomia comparada.  
- A gíria da bebedeira fica **nomeada** — esta ficha não a ensina.  
- *Molleja* (ES) é cognato de ofício, não fusão com a peça nem com o cunho.

## Status

**Aprovado** — **moela** fichada como **mózinha da ave** (*molēlla* ← *mola*); [relação](${relacao}) de orelha com [mola](${mola}) e [moeda](${moeda}) — **sem** fundir étimos. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Mola](${mola}) · [▶ Moeda](${moeda}) · [▶ Galinha](${galinha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **moela** — the bird’s **little mill** (gizzard). Field request: [relação](${relacao}) **mola · moela · moeda**. The ear glues the three (*mo-*); the lab **splits** them. Moela belongs to the **millstone** family (Lat. *mola* → PT **mó*) via reconstructed *molēlla*. The [spring](${mola}) is *mollis*. The [coin](${moeda}) is *monēta*. Close: [Valeu !!!](${mantra}).

> Independent audit. [moela](${WIKT_EN}), Lat. [*mola*](${WIKT_MOLA_LA}), [gizzard](${WIKI_GIZZARD}). Not a recipe. Not a veterinary protocol.

## Object

| Field | Value |
|-------|-------|
| Thing | Muscular ventricle that **grinds** food (with grit); also a dish; also BR slang for a binge |
| Etymon | Vulg. Lat. *molēlla* ← *mola* “millstone” |
| Blood | **mó** · *moer* · mill · molar tooth |
| Not | [spring](${mola}) (*mollis*) · [coin](${moeda}) (*monēta*) · [mule](${mula}) |
| Animal | [chicken](${galinha}) |

**H1:** requested [relação](${relacao}) = ear on the trio; blood only in the mill family.  
**H2:** the spring sheet refused Lat. *mola* (millstone); this sheet **claims** that homonym.

## Status

**Approved** — **moela** as little mill; [mola](${mola}) as spring; [moeda](${moeda}) as mint.

[▶ Words](${hub}) · [▶ Spring](${mola}) · [▶ Coin](${moeda}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Portugués **moela** — el **molinito** del ave (molleja). Pedido: [relación](${relacao}) **mola · moela · moeda**. El oído pega las tres; el lab **separa**. Moela es familia de la **muela** (lat. *mola*) vía *molēlla*. El [muelle](${mola}) es *mollis*. La [moneda](${moeda}) es *monēta*. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [moela](${WIKT}), [molleja](${WIKI_MOLLEJA}). No es receta. No es protocolo veterinario.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Ventrículo muscular que **muela** el alimento; también guiso; también jerga de borrachera |
| Étimo | lat. vulg. *molēlla* ← *mola* «muela de molino» |
| Sangre | **mó** · moler · molino · molar |
| No es | [muelle](${mola}) · [moneda](${moeda}) · [mula](${mula}) |
| Animal | [gallina](${galinha}) |

**H1:** la relación pedida es de oído en el trío; de sangre solo con la muela.  
**H2:** la ficha del muelle rechazaba el lat. *mola*; esta ficha **recoge** ese homónimo.

## Estado

**Aprobada** — **moela** como molinito; [mola](${mola}) como muelle; [moeda](${moeda}) como cuño.

[▶ Palabras](${hub}) · [▶ Muelle](${mola}) · [▶ Moneda](${moeda}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildMoelaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMoelaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-moela', 200);
  const post = makePalavra({
    title: 'Inspeção: Moela — a mózinha da ave (≠ mola ≠ moeda)',
    titleEn: 'Inspection: Moela — the bird’s little mill (≠ spring ≠ coin)',
    titleEs: 'Inspección: Moela — el molinito del ave (≠ muelle ≠ moneda)',
    excerpt:
      'Palavras: moela (*molēlla* ← mola/mó) — moinho da ave; ≠ mola (*mollis*) ≠ moeda (*monēta*); trio de orelha; galinha; Valeu !!!',
    excerptEn:
      'Words: moela (*molēlla* ← millstone) — bird gizzard; ≠ spring (*mollis*) ≠ coin (*monēta*); ear trio; chicken; Valeu !!!',
    excerptEs:
      'Palabras: moela (*molēlla* ← muela) — molleja; ≠ muelle (*mollis*) ≠ moneda (*monēta*); trío de oído; gallina; ¡Valeu !!!',
    slug: 'inspecao-palavra-moela',
    date: '2026-08-24T14:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Moela · mózinha',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.content_raw = post.content_raw || body;
  post.excerpt = post.excerpt;
  post.seriesOrder = post.seriesOrder;
  post.seriesLabel = post.seriesLabel;
  return post;
}

module.exports = { buildMoelaPost, buildMoelaBodies, COVER, WIKT, WIKI_GIZZARD };
