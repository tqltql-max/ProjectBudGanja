'use strict';

/**
 * Inspeção Palavras · vinte e dois / 22
 * Cardinal viginti + duo · 2×11 · palíndromo
 * Pedido de campo: inverter 22 → s2 (coração de chat BR)
 * ≠ Catch-22 ≠ temporada S2 ≠ órgão coração ≠ gêmeos
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/vinte-e-dois-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/vinte';
const WIKT_DOIS = 'https://pt.wiktionary.org/wiki/dois';
const WIKI = 'https://pt.wikipedia.org/wiki/22_(n%C3%BAmero)';
const WIKI_CATCH = 'https://pt.wikipedia.org/wiki/Catch-22';

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

function poemPt() {
  return `Vinte e dois.

Dois dois, ombro com ombro.
Não são gêmeos de nascimento.
São o mesmo traço, repetido.

Contam.
Dois vezes onze.
Par.
De frente e de costas: 22.
O palíndromo não pede sorte.

Não é Catch-22.
O paradoxo mora noutro livro.
Não é a segunda temporada.
S2 de série é outra sala.

Inverte o primeiro dois.
O traço deita-se e vira S.
Fica s2.

s2 não é o órgão.
O órgão chama-se coração.
s2 é o peito do chat:
S e 2 a desenhar um recado
com dois glifos.

O número continua 22.
O ecrã escreve s2.
O afeto passa no recado.
O cardinal fica a contar.

Valeu !!!
vinte e dois em pé,
s2 no recado,
sem fundir o peito no paradoxo.`;
}

function poemEn() {
  return `Twenty-two.

Two twos, shoulder to shoulder.
They are not twins by birth.
They are the same stroke, repeated.

They count.
Two times eleven.
Even.
Front and back: 22.
The palindrome does not ask for luck.

It is not Catch-22.
The paradox lives in another book.
It is not season two.
Series S2 is another room.

Invert the first two.
The stroke lies down and turns S.
It becomes s2.

s2 is not the organ.
The organ is called heart.
s2 is the chat’s chest:
S and 2 drawing a note
with two glyphs.

The number stays 22.
The screen writes s2.
Affection passes in the note.
The cardinal keeps counting.

Valeu !!!
twenty-two standing,
s2 in the note,
without fusing the chest to the paradox.`;
}

function poemEs() {
  return `Veintidós.

Dos doses, hombro con hombro.
No son gemelos de nacimiento.
Son el mismo trazo, repetido.

Cuentan.
Dos veces once.
Par.
De frente y de espaldas: 22.
El palíndromo no pide suerte.

No es Catch-22.
El paradoja vive en otro libro.
No es la segunda temporada.
S2 de serie es otra sala.

Invierte el primer dos.
El trazo se acuesta y vira S.
Queda s2.

s2 no es el órgano.
El órgano se llama corazón.
s2 es el pecho del chat:
S y 2 dibujando un recado
con dos glifos.

El número sigue 22.
La pantalla escribe s2.
El afecto pasa en el recado.
El cardinal sigue contando.

¡Valeu !!!
veintidós de pie,
s2 en el recado,
sin fundir el pecho en la paradoja.`;
}

function buildVinteEDoisBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-vinte-e-dois.html';
  const oito = '/posts/post-inspecao-palavra-oito.html';
  const catorze = '/posts/post-inspecao-palavra-catorze.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const zero = '/posts/post-inspecao-palavra-zero.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const juntos = '/posts/post-inspecao-palavra-juntos.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const upside = '/posts/post-inspecao-arte-upside-down.html';
  const alice = '/posts/post-inspecao-arte-alice-atraves-do-espelho.html';
  const mega = '/posts/post-inspecao-palavra-mega-sena.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const robson = '/posts/post-inspecao-figura-robson-oliveira.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do número **[22](${self})** — vocábulo **vinte e dois**. Pedido de campo: *inspeção no número 22* · *inverter 22 para s2* · *poema sobre esse número*.

Objecto = o **cardinal** e o **gesto gráfico**: o 2 invertido cola no **S**, e **22** vira **s2**. No chat BR, **s2** é o **coração de ecrã** — não o [órgão](${coracao}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · vinte](${WIKT}), [dois](${WIKT_DOIS}), [22 (número)](${WIKI}), [Catch-22](${WIKI_CATCH}). **Ficha ≠ numerologia, ≠ dica de loteria, ≠ resumo do romance de Heller.** A inversão 2→S é **olho / oralidade**, não lei tipográfica universal. Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *22* / *vinte e dois* / *s2* / *S2* / *inverter 22*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **vinte e dois** · algarismo **22** |
| Classe | Numeral cardinal |
| Étimo | Lat. *vīgintī* + *duo* — confiança **alta** |
| Aritmética | **2 × 11** · par · composto · divisores 1, 2, 11, 22 |
| Palíndromo | **22** lê-se igual de frente e de costas |
| Inversão de campo | **22** → **s2** (o primeiro 2 invertido cola no **S**) |
| Chat BR | **s2** / **S2** = coração de ecrã (S + 2 ≈ ♥) |
| Tipo BudGanja | Palavra-número — cardinal × glifo invertido × recado |
| Não é | [Catch-22](${WIKI_CATCH}) · temporada S2 · [coração](${coracao}) órgão · [gêmeos](${gemeos}) |
| Data | ${inspected} |

**O que é o objecto:** o **dois×onze** da fala — e, neste circuito, o **par de dois** que, invertido no primeiro traço, vira o recado **s2**.

## 2. Salas (cortar, não fundir)

| Sala | O que é | O que **não** é esta ficha |
|------|---------|----------------------------|
| **Cardinal 22** | *vīgintī* + *duo* → vinte e dois | O núcleo numeral |
| **Inversão 2 → S** | Gesto gráfico do pedido de campo | Olho; **não** étimo |
| **s2 de chat** | Coração de ecrã BR (MSN / Orkut / recado) | Glifo; **não** o órgão |
| **[Coração](${coracao})** | Órgão · afeto · centro · coragem | A **palavra**; o s2 só recados |
| **Catch-22** | Romance de Joseph Heller (1961) — paradoxo sem saída | **Outro livro** |
| **S2 temporada** | Season 2 / Samsung / linha de metro | Homógrafo do recado |
| **[Gêmeos](${gemeos})** | Lat. *geminus* — par de nascimento | Dois 2s **parecem** par; étimo **outro** |
| **«Dois são mais fortes»** | [Robson](${robson}) — ofício de par | Frase viva; **não** o 22 |
| **Dezena 22** | Na [Mega-Sena](${mega}), uma entre 01–60 | Sem sorte extra |
| **Número-mestre 22** | Folclore numerológico | **Cortado** |

**H1:** *vinte e dois* = *vīgintī* + *duo*. **22** é o mesmo objecto em algarismo.  
**H2:** 22 = **2 × 11**. A factorização é o ofício; a «sorte» não factoriza.  
**H3:** inverter o primeiro **2** cola no **S** → **s2**. Confiança **média** (olho / chat), não dicionário.  
**H4:** **s2** é recado de afeto. [Coração](${coracao}) é o vocábulo do peito. **Não fundir.**  
**H5:** Catch-22 e S2 de série são **homógrafos de ecrã**, não o cardinal.

## 3. O 22 × o s2 × o ♥

| Marca | Traço | Ofício no lab |
|-------|-------|---------------|
| **22** | Dois algarismos 2 | Cardinal · palíndromo · 2×11 |
| **s2** | 2 invertido + 2 | Recado de chat BR |
| **S + 2** | Lóbulo esquerdo + lóbulo direito | O olho lê um ♥ |
| **&lt;3** | Outro glifo de coração | Irmão de ecrã — **outra** peça |
| **♥** | Ideograma | Nem número nem s2 |

O ouvido pediu **inverter 22**. O olho cola o 2 no S. A orelha do chat já usava **s2** como peito. O ofício **corta**: o número continua a contar; o recado continua a namorar; o [coração](${coracao}) continua órgão.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **22** | Número-mestre, sorte, Catch-22 | Cardinal *vīgintī duo* |
| **Dois 2s** | [Gêmeos](${gemeos}) | O mesmo algarismo, duas vezes |
| **Inverter** | Lei da tipografia | Gesto do olho; pedido de campo |
| **s2** | O [coração](${coracao}) | Recado de chat — glifo, não órgão |
| **S2** | Sempre o peito | Também temporada / modelo — **perguntar a sala** |
| **Poema** | Enfeite | Ofício desta ficha — o número **em verso** |

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Oito](${oito}) · [catorze](${catorze}) · [três](${tres}) · [zero](${zero}) | Irmãos cardinais — outro ofício cada |
| [Coração](${coracao}) | O órgão / o afeto — **não** o glifo s2 |
| [Gêmeos](${gemeos}) | Par de nascimento — étimo *geminus*, não *duo* repetido |
| [Juntos](${juntos}) · [relação](${relacao}) | Dois no entre — estado e vínculo, não o 22 |
| [Upside Down](${upside}) · [Alice através do espelho](${alice}) | Inverter o olhar / o ecrã — método, não o algarismo |
| [Mega-Sena](${mega}) | Dezena 22 = uma entre sessenta |
| [Robson](${robson}) | «Dois são mais fortes» — par vivo, outra ficha |
| [Alegria](${alegria}) · [gesto](${gesto}) · [caminho](${caminho}) | Afeto do recado · traço · vai-e-vem |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) | Solo · corte |
| [Valeu !!!](${mantra}) | Fechar no 22 em pé, sem colar o paradoxo |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=vinte-e-dois)

## Limites

- Não ensina numerologia nem «número-mestre».  
- Não resume *Catch-22* nem a temporada S2.  
- A inversão 2→S é **olho de campo**, não norma Unicode.  
- O poema é **criação do laboratório**.

## Status

**Aprovado** — **vinte e dois** / **22** fichado como cardinal (*vīgintī* + *duo*; 2×11); inversão de campo **22 → s2** (coração de chat, ≠ [órgão](${coracao})); Catch-22 e temporada cortados. Poema em [Vida](/vida/#poema=vinte-e-dois). Fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Coração](${coracao}) · [▶ Oito](${oito}) · [▶ Catorze](${catorze}) · [▶ Poema Vida](/vida/#poema=vinte-e-dois) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **vinte e dois** (digit **22**). Field: invert **22** into **s2**. Standing **22** is the cardinal (*vīgintī* + *duo*; **2 × 11**). **s2** is Brazilian chat-heart — not the [organ](${coracao}). **Catch-22** and season **S2** are other rooms.

> Independent audit. Inversion 2→S is **eye / speech**, not a type law. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **vinte e dois** · **22** |
| Path | Lat. *vīgintī* + *duo* |
| Math | **2 × 11** · palindrome |
| Invert | **22** → **s2** (first 2 reads as **S**) |
| Cut | Catch-22 · season S2 · organ [coração](${coracao}) |
| Date | ${inspected} |

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** — cardinal + inverted glyph; chat-heart cut from the organ; paradox stays in Heller’s book.

[▶ Words](${hub}) · [▶ Heart](${coracao}) · [▶ Poem](/vida/#poema=vinte-e-dois) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **vinte e dois** (dígito **22**). Pedido: invertir **22** en **s2**. El **22** de pie es el cardinal (*vīgintī* + *duo*; **2 × 11**). **s2** es el corazón de chat BR — no el [órgano](${coracao}). **Catch-22** y la temporada **S2** son otras salas.

> Auditoría independiente. La inversión 2→S es **ojo / habla**, no ley tipográfica. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **vinte e dois** · **22** |
| Étimo | lat. *vīgintī* + *duo* |
| Matemática | **2 × 11** · palíndromo |
| Inversión | **22** → **s2** (el primer 2 se lee **S**) |
| Corte | Catch-22 · temporada S2 · órgano [coração](${coracao}) |
| Fecha | ${inspected} |

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobado** — cardinal + glifo invertido; corazón de chat cortado del órgano; la paradoja queda en el libro de Heller.

[▶ Palabras](${hub}) · [▶ Corazón](${coracao}) · [▶ Poema](/vida/#poema=vinte-e-dois) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildVinteEDoisPost() {
  const { body, contentEn, contentEs } = buildVinteEDoisBodies();
  const seriesOrder = pickOrder('inspecao-palavra-vinte-e-dois', 292);
  return makePalavra({
    title: 'Inspeção: 22 — vinte e dois; invertido vira s2, o coração do chat',
    titleEn: 'Inspection: 22 — vinte e dois; inverted it becomes s2, the chat heart',
    titleEs: 'Inspección: 22 — vinte e dois; invertido vira s2, el corazón del chat',
    excerpt:
      'Palavras: 22 / vinte e dois — lat. vīgintī + duo; 2×11; inverter o 2 cola no S → s2 (coração de chat ≠ órgão); ≠ Catch-22; Valeu !!!',
    excerptEn:
      'Words: 22 / vinte e dois — Lat. vīgintī + duo; 2×11; invert 2 into S → s2 (chat heart ≠ organ); ≠ Catch-22; Valeu !!!',
    excerptEs:
      'Palabras: 22 / vinte e dois — lat. vīgintī + duo; 2×11; invertir el 2 pega en S → s2 (corazón de chat ≠ órgano); ≠ Catch-22; ¡Valeu !!!',
    slug: 'inspecao-palavra-vinte-e-dois',
    date: '2026-08-24T11:30:00.000Z',
    published: false,
    seriesOrder,
    seriesLabel: '22 · vinte e dois · s2',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVinteEDoisPost,
  buildVinteEDoisBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
