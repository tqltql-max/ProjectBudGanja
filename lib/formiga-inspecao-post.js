'use strict';

/**
 * Inspeção Palavras · formiga
 * Pedido: inseto formiga · expressão formiga lava-pé.
 * ≠ tucandeira (preguiça / XIV) ≠ larva de vulcão.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/formiga-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/formiga';
const WIKI = 'https://pt.wikipedia.org/wiki/Formiga';
const WIKT_LA = 'https://en.wiktionary.org/wiki/formica#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Formiga.
Seis patas no chão.
Ofício de formigueiro,
não de cratera.

Lava-pé ferroa o pé.
Tucandeira é outra sala.
A fábula da cigarra espera.

Valeu !!!
com o inseto no sítio,
sem chá, sem ninho virado.`;
}

function buildFormigaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-formiga.html';
  const lavaPe = '/posts/post-inspecao-expressao-formiga-lava-pe.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const larva = '/posts/post-inspecao-palavra-larva.html';
  const cigarra = '/posts/post-inspecao-palavra-cigarra.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const preguica = '/posts/post-inspecao-palavra-preguica.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const animais = '/animais/';
  const xiv = '/biblioteca/unifesp/livro-xiv.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[formiga](${self})** — o **[inseto](${inseto})** da família Formicidae, social, de formigueiro. Pedido de campo: *inseto formiga* · expressão **[formiga lava-pé](${lavaPe})**. Objecto: o **vocábulo e o ser**; a ferroada do lava-pé vai à expressão.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · formiga](${WIKT}), [Wikipédia · Formiga](${WIKI}), lat. [*formīca*](${WIKT_LA}). **Ficha ≠ guia de formigueiro, ≠ veneno, ≠ chá.** A [tucandeira](${preguica}) da aula [XIV](${xiv}) é **outra espécie** (documentada como folk, não receita). Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **formiga** |
| Classe | Substantivo feminino |
| Ser | [Inseto](${inseto}) himenóptero — Formicidae |
| Étimo (trabalho) | Lat. *formīca* → PT *formiga* — confiança: **alta** |
| Tipo BudGanja | Palavra — vida miúda × trabalho × elo [lava-pé](${lavaPe}) |
| O que **não** é | [Lava](${lava}) de vulcão · rito de lava-pés · [cigarra](${cigarra}) da fábula (outra sala) · tucandeira |
| Elo | [inseto](${inseto}) · [larva](${larva}) · [abelha](${abelha}) · [Joaninha](${joaninha}) · [animal](${animal}) |
| Elo expressão | [formiga lava-pé](${lavaPe}) |
| Fonte | [formiga](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome do povo do chão**. A [larva](${larva}) é o berço; a operária é o ofício visível.

## 2. Cortes

| Parece | É |
|--------|---|
| Toda formiga é lava-pé | **Não** — lava-pé = grupo *Solenopsis* (ver [expressão](${lavaPe})) |
| Tucandeira = lava-pé | **Não** — tucandeira / tocandira (*Paraponera*) na [preguiça](${preguica}) / [XIV](${xiv}) |
| Formiga «lava» como [lavar](${lavar}) | **Não** — a água lava; o lava-pé **ferroa** |
| Fábula cigarra × formiga | Aviso de ofício — âncora da [cigarra](${cigarra}), não desta ficha |

**H1:** *formīca* fecha o étimo.  
**H2:** [formiga lava-pé](${lavaPe}) é **nome popular** de um grupo, não sinónimo de toda a família.  
**H3:** a orelha cola [lavar](${lavar}) / [lava](${lava}) / lava-pé; o lab corta três salas.

## 3. Vida breve

Colónia, rainha, operárias, [larva](${larva}) e pupa. No lab: literacia de [animal](${animal}) / [inseto](${inseto}) — **não** protocolo de criação nem de destruição.

## 4. Rede

| Ficha | Papel |
|-------|-------|
| [Formiga lava-pé](${lavaPe}) | A expressão / o grupo *Solenopsis* |
| [Inseto](${inseto}) · [larva](${larva}) | Classe e estádio |
| [Abelha](${abelha}) | Outro himenóptero social do lab |
| [Cigarra](${cigarra}) | A fábula espera noutra sala |
| [Preguiça](${preguica}) | Tucandeira — folk, não chá do lab |
| Hub [Animais](${animais}) | Casa dos seres |

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **formiga** = o [inseto](${inseto}) *formīca*; [lava-pé](${lavaPe}) é o caso do pé. [Valeu !!!](${mantra}) **sem virar o ninho**.

[▶ Palavras](${hub}) · [▶ Formiga lava-pé](${lavaPe}) · [▶ Inseto](${inseto}) · [▶ Larva](${larva}) · [▶ Abelha](${abelha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Formiga** is the **ant** (Lat. *formīca*), an [insect](${inseto}). **[Formiga lava-pé](${lavaPe})** is a folk name for fire ants (*Solenopsis*), not every ant, not volcanic [lava](${lava}), not the verb [lavar](${lavar}).

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Formiga** es la **hormiga** (lat. *formīca*). **[Formiga lava-pé](${lavaPe})** nombra un grupo (*Solenopsis*), no toda la familia, no la [lava](${lava}) ni el verbo [lavar](${lavar}).

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildFormigaPost() {
  const { body, contentEn, contentEs, wiki } = buildFormigaBodies();
  return makePalavra({
    title: 'Inspeção: Formiga — o inseto do chão, não a lava do vulcão',
    titleEn: 'Inspection: Formiga — the ground insect, not volcano lava',
    titleEs: 'Inspección: Formiga — el insecto del suelo, no la lava del volcán',
    excerpt:
      'Palavras: formiga (lat. formīca) ≠ lava-pé (grupo) ≠ tucandeira; Valeu !!!',
    excerptEn:
      'Words: formiga (Lat. formīca) ≠ lava-pé (fire ant group) ≠ tucandeira; Valeu !!!',
    excerptEs:
      'Palabras: formiga (lat. formīca) ≠ lava-pé ≠ tucandeira; ¡Valeu !!!',
    slug: 'inspecao-palavra-formiga',
    date: '2026-08-23T16:54:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-formiga', 274),
    seriesLabel: 'Formiga · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildFormigaPost, buildFormigaBodies };
