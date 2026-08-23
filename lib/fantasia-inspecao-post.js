'use strict';

/**
 * Inspeção Palavras · fantasia
 * Pedido: Inepçao de Fantasia.
 * Eixos: gr. phantasía · faculdade de imaginar · ≠ fantástico (adj./elogio)
 * ≠ fantasioso (pessoa/ideia) · ≠ fantasma · ≠ roupa de carnaval · ≠ filme Disney.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/fantasia-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/fantasia';
const WIKT_EL = 'https://en.wiktionary.org/wiki/%CF%86%CE%B1%CE%BD%CF%84%CE%B1%CF%83%CE%AF%CE%B1#Ancient_Greek';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Fantasia.
Não é o uau do adjectivo.
Não é a roupa sozinha.
Não é o filme da orquestra.

É o nome da faculdade:
ver o que ainda não está.

Carnaval veste.
Disney orquestra.
O adjectivo elogia.

A sala desta ficha
é a imaginação com nome —
grego phantasía —
aparência que a mente faz.

Valeu !!!
inventar com rasto,
sem fundir o fato.`;
}

function poemEn() {
  return `Fantasia.
Not the adjective’s wow.
Not the costume alone.
Not the orchestra film.

It is the faculty’s name:
to see what is not yet there.

Carnival dresses it.
Disney scores it.
The adjective praises.

This sheet’s room
is imagination with a name —
Greek phantasía —
an appearance the mind makes.

Valeu !!!
invent with a trail,
without gluing the costume.`;
}

function poemEs() {
  return `Fantasia.
No es el guau del adjetivo.
No es el disfraz solo.
No es la película de la orquesta.

Es el nombre de la facultad:
ver lo que aún no está.

Carnaval la viste.
Disney la orquesta.
El adjetivo elogia.

La sala de esta ficha
es la imaginación con nombre —
griego phantasía —
apariencia que la mente hace.

¡Valeu !!!
inventar con rastro,
sin fundir el traje.`;
}

function buildFantasiaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-fantasia.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const fantasioso = '/posts/post-inspecao-palavra-fantasioso.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const lampada = '/posts/post-inspecao-palavra-lampada.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[fantasia](${self})**. Pedido de campo: *Inepçao de Fantasia* → **inspeção de fantasia**. Objecto: o **substantivo** — a **faculdade de imaginar** (gr. *phantasía*) e os ofícios BR do mesmo nome. **Não** é a ficha de [fantástico](${fantastico}) (adjectivo / elogio «fantástico!»). **Não** é a ficha de [fantasioso](${fantasioso}) (pessoa ou ideia *cheia de* fantasia).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fantasia](${WIKT}), [phantasía](${WIKT_EL}). **Ficha ≠ manual de «como fantasiar», ≠ tratado do género fantasy, ≠ crítica ao Carnaval, ≠ resenha Disney.** Sem afiliação a estúdios. Tom: uma faculdade; as salas ao lado.

**Gatilho:** *Inepçao de Fantasia* / *fantasia* / depois de [fantástico](${fantastico}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fantasia** |
| Classe | Substantivo feminino |
| Étimo | Gr. *phantasía* «aparição, imaginação, representação» → lat. *phantasia* → PT **fantasia** — confiança: **alta** |
| Família | *fantasiar* · [fantasioso](${fantasioso}) · [fantástico](${fantastico}) · *fantasma* (mesmo tronco, **outra** palavra) |
| Tipo BudGanja | Palavra — faculdade × vestimenta × género × elogio colado |
| Data | ${inspected} |

**Objecto:** o nome da **capacidade de fazer aparecer** o que ainda não está no facto. No lab: [criatividade](${criatividade}) com rasto; [verdade](${verdade}) não é inimiga da fantasia — corta o que a orelha cola.

## 2. Salas (cortar, não fundir)

| Sala | O que é | O que **não** é esta ficha |
|------|---------|----------------------------|
| **Faculdade** | Imaginar / representar | O núcleo |
| **[Fantástico](${fantastico})** | Adjectivo + elogio BR «fantástico!» | Irmã — o **uau**, não o nome |
| **[Fantasioso](${fantasioso})** | Cheio de fantasia (pessoa/ideia) | Irmã — o **sujeito**, não a faculdade |
| **Fantasma** | Aparição / espírito (mesmo *phan-*) | Outro vocábulo |
| **Roupa / Carnaval** | Fato, máscara, «ir de fantasia» | Uso BR forte; **não** esgota o étimo |
| **Filme Disney (1940)** | *Fantasia* — orquestra animada | Homónimo de título |
| **Género** | Literatura/arte «fantástica» | Mapa em [fantástico](${fantastico}) e [Alice](${alice}) |
| **Forma musical** | *Fantasia* (peça livre) | Sala erudita à parte |
| **Desejo / lâmpada** | Pedir sem rasto | [lâmpada](${lampada}) · [abracadabra](${abracadabra}) |

[A orelha cola](${orelha}) *fantasia* em *fantástico* e em *fato de Carnaval*. O étimo **corta**: primeiro a **mente faz uma aparência**; o vestido e o elogio vêm depois.

## 3. Hipóteses

**H1:** *fantasia* = *phantasía* — imaginação / aparência mental.  
**H2:** no BR, a mesma palavra veste o corpo (Carnaval) sem apagar a faculdade.  
**H3:** [fantástico](${fantastico}) elogia; **fantasia** nomeia a oficina.  
**H4:** fantasia **boa** = inventar com [gesto](${gesto}) e [verdade](${verdade}).  
**H5:** fantasia **má** = substitui o facto («já imaginei, está feito»).  
**H6:** *Inepçao* = inspeção — o campo chegou com lapso; a ficha corrige o ofício, não zomba da boca.

## 4. Escala de vizinhos (não sinónimos)

| Palavra | Ofício |
|---------|--------|
| **fantasia** | A faculdade / o mundo imaginado / o fato |
| [fantástico](${fantastico}) | «Uau» + género |
| [fantasioso](${fantasioso}) | Quem (ou o quê) está cheio disso |
| [incrível](${incrivel}) | Fora do crível / elogio dilatado |
| [genial](${genial}) | Engenho com rasto |
| [maravilhoso](${maravilhoso}) · [fabuloso](${fabuloso}) | Assombro / «de conto» |

## 5. Poema

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não ensina a «viver na lua».  
- Não inspeciona o filme Disney nem o desfile.  
- Não funde *fantasia* com *mentira*. Mentira é outro ofício: faltar à [verdade](${verdade}).

## Status

**Aprovado** — **fantasia** fichada como **substantivo** (faculdade *phantasía*); salas cortadas (elogio, pessoa, roupa, filme, génio). Fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Fantástico](${fantastico}) · [▶ Fantasioso](${fantasioso}) · [▶ Criatividade](${criatividade}) · [▶ Valeu !!!](${mantra}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[fantasia](${self})** — the **noun**: faculty of imagining (Gk. *phantasía*). Field slip: *Inepçao de Fantasia*. Not the [fantástico](${fantastico}) sheet (adjective / “awesome!”). Not [fantasioso](${fantasioso}) (a person full of fancy).

Carnival costume, Disney’s *Fantasia*, musical fantasia, and *fantasma* (ghost) are **other rooms**.

\`\`\`poem
${poemEn()}
\`\`\`

**Approved.** [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Fantástico](${fantastico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[fantasia](${self})** — el **sustantivo**: facultad de imaginar (gr. *phantasía*). Pedido: *Inepçao de Fantasia*. No es la ficha de [fantástico](${fantastico}) (adjetivo / «¡fantástico!»). No es [fantasioso](${fantasioso}).

El disfraz de carnaval, la película Disney, la forma musical y *fantasma* son **otras salas**.

\`\`\`poem
${poemEs()}
\`\`\`

**Aprobado.** [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Fantástico](${fantastico}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildFantasiaPost() {
  const { body, contentEn, contentEs, wiki } = buildFantasiaBodies();
  return makePalavra({
    title: 'Inspeção: Fantasia — a faculdade; ≠ fantástico ≠ roupa ≠ filme',
    titleEn: 'Inspection: Fantasia — the faculty; ≠ fantástico ≠ costume ≠ film',
    titleEs: 'Inspección: Fantasia — la facultad; ≠ fantástico ≠ disfraz ≠ película',
    excerpt:
      'Palavras: fantasia — gr. phantasía; substantivo da imaginação; ≠ elogio fantástico ≠ fantasioso ≠ Carnaval ≠ Disney; Valeu !!!',
    excerptEn:
      'Words: fantasia — Gk. phantasía; the noun of imagining; ≠ praise fantástico ≠ fantasioso ≠ Carnival ≠ Disney; Valeu !!!',
    excerptEs:
      'Palabras: fantasia — gr. phantasía; el sustantivo de imaginar; ≠ elogio fantástico ≠ fantasioso ≠ Carnaval ≠ Disney; ¡Valeu !!!',
    slug: 'inspecao-palavra-fantasia',
    date: '2026-08-23T19:45:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-fantasia', 288),
    seriesLabel: 'Fantasia · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildFantasiaPost, buildFantasiaBodies, poemPt, poemEn, poemEs };
