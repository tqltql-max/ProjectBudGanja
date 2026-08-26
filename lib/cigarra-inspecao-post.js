'use strict';

/**
 * Inspeção Palavras · cigarra
 * Insecto (Cicadidae). Pedido: relação com cigarro · inseto.
 * Lapso: inseito → inseto.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cigarra-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cigarra';
const WIKI = 'https://pt.wikipedia.org/wiki/Cigarra';
const WIKT_LA = 'https://en.wiktionary.org/wiki/cicada#Latin';

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
  return `Cigarra.
Não pede filtro.
Pede tronco, sol, tempo.

O canto não é fumo.
O corpo não é rolo.
Quem cola cigarro
ouve o verão torto.

Valeu !!!
com o insecto no sítio,
sem acender o que só canta.`;
}

function buildCigarraBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-cigarra.html';
  const cigarro = '/posts/post-inspecao-palavra-cigarro.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';

  const body = `## Escopo

Inspeção editorial da palavra **[cigarra](${self})** — o **[inseto](${inseto})** da família Cicadidae, famoso pelo **canto** de verão / [sol](${sol}). Pedido de campo: *relação com inseto cigarra* (lapso *inseito*) a partir de **[cigarro](${cigarro})**. Objecto: o **bicho que canta** — não o rolo de tabaco.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cigarra](${WIKT}), [Wikipédia · Cigarra](${WIKI}), lat. [*cicada*](${WIKT_LA}). **Ficha ≠ guia de captura, ≠ entomologia completa.** *Inseito* → **inseto**. Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cigarra** |
| Classe | Substantivo feminino |
| Ser | [Inseto](${inseto}) hemíptero — Cicadidae |
| Étimo (trabalho) | Lat. *cicāda* → iberorromance *cigarra* — confiança: **alta** |
| Tipo BudGanja | Palavra — vida miúda × canto × orelha com [cigarro](${cigarro}) |
| O que **não** é | [Cigarro](${cigarro}) (produto) · charuto · «praga» automática |
| Elo | [inseto](${inseto}) · [animal](${animal}) · [abelha](${abelha}) · [Joaninha](${joaninha}) |
| Fonte | [cigarra](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o insecto do **canto**. A cola *cigarro* / *cigarra* é grafia na [orelha](${orelha}) ([a orelha cola…](${orelhaCola})); o ofício do bicho é outro.

## 2. Relação com cigarro

| Parece | É |
|--------|---|
| A mesma palavra | **Não** — *o* × *a*; produto × [inseto](${inseto}) |
| Mesmo étimo fechado | **Não** — *cigarra* < *cicada* está sólida; *cigarro* é **disputado** (ver ficha [cigarro](${cigarro})) |
| Hipótese de forma | O **charuto** (não o cigarette BR) «parece» o corpo da cigarra — hipótese **para o esp. cigarro**, não para o insecto |

**H1:** *cigarra* = *cicada* (alta).  
**H2:** a orelha BR cola *cigarro*; o lab **corta**.  
**H3:** o canto é o ofício do bicho — não fumo.  
**H4:** *inseito* é lapso de [inseto](${inseto}).

## 3. Vida breve

A cigarra passa anos no solo como ninfa e emerge para cantar (os machos, na regra clássica). No lab: literacia de [animal](${animal}) / [inseto](${inseto}) — **não** protocolo de criação.

| Camada | Leitura |
|--------|---------|
| **Verão** | Canto associado a calor e [sol](${sol}) |
| **Cultura** | Provérbio / fábula da cigarra e da formiga — outra sala (aviso de ofício, não esta âncora) |
| **Ecologia** | Peça da teia; não «só barulho» |

## 4. Rede

| Ficha | Papel |
|-------|-------|
| [Cigarro](${cigarro}) | A cola — produto, não irmão biológico |
| [Orelha](${orelha}) · [orelha cola](${orelhaCola}) | Onde o canto entra e a grafia funde |
| [Inseto](${inseto}) | Classe (*insectum*) |
| [Abelha](${abelha}) · [Joaninha](${joaninha}) | Outros insetos do lab |
| Hub [Animais](${animais}) | Casa dos seres |

## 5. Limites

- Sem captura, colecção ou veneno.  
- A fábula da formiga fica **nota**, não âncora.

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **cigarra** = o [inseto](${inseto}) que canta; [cigarro](${cigarro}) fica na outra ficha. [Valeu !!!](${mantra}) **com o verão no sítio**.

[▶ Palavras](${hub}) · [▶ Cigarro](${cigarro}) · [▶ Orelha](${orelha}) · [▶ Inseto](${inseto}) · [▶ Animal](${animal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Cigarra** is the **cicada** ([insect](${inseto})), Latin *cicada*. It is **not** [cigarro](${cigarro}) (BR cigarette). Ear-trap of one letter. *Inseito* → inseto.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Cigarra** es el **insecto** ([inseto](${inseto})), lat. *cicada*. **No** es [cigarro](${cigarro}). Trampa de oído. *Inseito* → inseto.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCigarraPost() {
  const { body, contentEn, contentEs, wiki } = buildCigarraBodies();
  return makePalavra({
    title: 'Inspeção: Cigarra — o inseto que canta, não o cigarro',
    titleEn: 'Inspection: Cigarra — the insect that sings, not the cigarette',
    titleEs: 'Inspección: Cigarra — el insecto que canta, no el cigarro',
    excerpt:
      'Palavras: cigarra (inseto, lat. cicada) ≠ cigarro; inseito → inseto; Valeu !!!',
    excerptEn:
      'Words: cigarra (cicada) ≠ cigarro; inseito → inseto; Valeu !!!',
    excerptEs:
      'Palabras: cigarra (insecto) ≠ cigarro; inseito → inseto; ¡Valeu !!!',
    slug: 'inspecao-palavra-cigarra',
    date: '2026-08-23T16:42:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-cigarra', 271),
    seriesLabel: 'Cigarra · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCigarraPost, buildCigarraBodies };
