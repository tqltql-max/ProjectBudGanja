'use strict';

/**
 * Inspeção Palavras · asterisco / *
 * Carácter tipográfico · gr. asteriskos «estrelinha»
 * ≠ Asterix (gaulês) ≠ 8 ≠ ∞ ≠ obelisco
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/asterisco-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/asterisco';
const WIKT_EN = 'https://en.wiktionary.org/wiki/asterisk';
const WIKI = 'https://pt.wikipedia.org/wiki/Asterisco';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => p.seriesOrder)
        .filter((n) => typeof n === 'number')
    );
    seriesOrder = taken.size ? Math.max(...taken) + 1 : start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Asterisco.
Não é o gaulês.
Não é o oito deitado.
Não é a aula a fingir-se tecla.

É a estrelinha da linha:
nota de rodapé,
coringas no código,
ênfase no chat.

Shift+8 abre esta sala.
O 8 em pé fica na ficha oito.
O anel da fita fica no elo.

Valeu !!!
uma estrela de tinta,
sem colar o capacete.`;
}

function poemEn() {
  return `Asterisk.
Not the Gaul.
Not the eight lying down.
Not the lesson pretending to be a key.

It is the little star on the line:
footnote,
wildcard,
chat emphasis.

Shift+8 opens this room.
The standing 8 stays on the eight sheet.
The ribbon’s ring stays on the link.

Valeu !!!
a star of ink,
without gluing on the helmet.`;
}

function poemEs() {
  return `Asterisco.
No es el galo.
No es el ocho acostado.
No es la clase fingiendo ser tecla.

Es la estrellita en la línea:
nota a pie,
comodín,
énfasis en el chat.

Shift+8 abre esta sala.
El 8 de pie queda en la ficha oito.
El anillo de la cinta queda en el eslabón.

¡Valeu !!!
una estrella de tinta,
sin pegar el casco.`;
}

function buildAsteriscoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-asterisco.html';
  const oito = '/posts/post-inspecao-palavra-oito.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const letraX = '/posts/post-inspecao-palavra-letra-x.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const desenho = '/posts/post-inspecao-desenho-asterix-e-obelix.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do carácter **[asterisco](${self})** — o glifo **\\***. Pedido de campo: *inspeção do carácter \\** e, ao lado, o desenho **Asterix e Obelix**. [A orelha cola](${orelha}) *asterisco* em *Asterix*. O ofício **corta**. Objecto desta ficha: a **estrelinha tipográfica**. O desenho fica na ficha [Asterix e Obelix](${desenho}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · asterisco](${WIKT}), [asterisk](${WIKT_EN}), [Wikipédia · Asterisco](${WIKI}). **Ficha ≠ album gaulês, ≠ manual de regex, ≠ símbolo do infinito.** Sem afiliação a editoras. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *carácter \\** / *asterisco* / *asterix* (ouvido) / Shift+8.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **asterisco** |
| Glifo | **\\*** (U+002A ASTERISK) |
| Classe | Substantivo · carácter tipográfico |
| Étimo | Gr. *asterískos* «estrelinha» ← *astḗr* «estrela» — confiança: **alta** |
| Tecla BR | **Shift+8** — mesma tecla do [oito](${oito}), **outro** sinal |
| Tipo BudGanja | Palavra — glifo × ofícios (nota, coringa, ênfase) |
| Não é | [Asterix e Obelix](${desenho}) · [oito](${oito}) em pé · [∞ / elo](${elo}) · obelisco / obelo † |
| Data | ${inspected} |

**O que é o objecto:** a **estrela de tinta** que a linha usa para apontar, multiplicar, coringar ou subir o tom. Não é um guerreiro. Não é o infinito.

## 2. Salas (cortar)

| Sala | O que é | Esta ficha? |
|------|---------|-------------|
| **\\*** asterisco | Glifo U+002A | **Sim** — o núcleo |
| **Asterix** | Gaulês da BD (Goscinny / Uderzo) | **Não** — [desenho](${desenho}) |
| **Obelix** | Companheiro; nome no **obelisco** | **Não** — mesma ficha de desenho |
| **Obelo †** | Marca de crítica textual (irmão antigo do \\*) | Sala vizinha; **não** o glifo \\* |
| **8** | Cardinal · [oito](${oito}) em pé | Mesma tecla; **outro** ofício |
| **∞** | [Lemniscata](${lemniscata}) deitada | [Elo](${elo}) / [em pé](${emPe}) |
| **Wildcard** | Ofício do \\* em código e busca | Uso; não esgota o carácter |

**H1:** *asterisco* = *asterískos*. O nome já diz **estrela pequena**.  
**H2:** Asterix **nasce do nome** do asterisco; o personagem **não é** o carácter.  
**H3:** Obelix nasce do **obelisco** (e do obelo †), par tipográfico antigo — **não** fundir com \\*.  
**H4:** Shift+8 cola o ouvido ao [oito](${oito}); o lab **separa** tecla e glifo.

## 3. Ofícios do *

| Ofício | Leitura lab | Bom × mau |
|--------|-------------|-----------|
| **Nota de rodapé** | Aponta para baixo da página | Bom: rasto · Mau: estrela a tapar o texto |
| **Coringa** | Em busca e em código, «qualquer coisa» | Bom: padrão declarado · Mau: esconder o objecto |
| **Multiplicação** | Sinal de vezes na linha | Bom: conta · Mau: virar lema |
| **Ênfase / spoiler** | Chat e markdown | Bom: tom · Mau: grito sem [sinal](${sinal}) |
| **Censura** | p\\*\\*\\*a | Outro ofício — não é esta ficha a moralizar |

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **\\*** | O gaulês | Glifo |
| **Asterix** | Esta estrela | Personagem — [desenho](${desenho}) |
| **Símbolo do infinito** | Shift+8 = ∞ | [Oito](${oito}) / [lemniscata](${lemniscata}) |
| **Obelix** | Irmão do \\* | Homem + menir; étimo **obelisco** |

## 5. Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Asterix e Obelix](${desenho}) | O **desenho** — nomes colados ao ouvido |
| [Oito](${oito}) | A **tecla** debaixo do Shift |
| [Elo de ligação](${elo}) · [em pé](${emPe}) · [lemniscata](${lemniscata}) | ∞ e 8 em pé — **não** o \\* |
| [Letra X](${letraX}) · [sinal](${sinal}) | Outros glifos / marcas |
| [Língua portuguesa](${lingua}) | Solo do nome |
| [Valeu !!!](${mantra}) | Fechar a estrela sem capacete |

## 6. Poema

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não recenseia todos os usos Unicode (✱ ✺ ⁂). O objecto é o **\\*** comum.  
- Não inspeciona a obra de Goscinny/Uderzo — isso é [desenho](${desenho}).  
- Não é aula de expressões regulares.

## Status

**Aprovado** — **asterisco** / **\\*** fichado como carácter (*asterískos*); [Asterix e Obelix](${desenho}) à parte; tecla [oito](${oito}) cortada. Fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Asterix e Obelix](${desenho}) · [▶ Oito](${oito}) · [▶ Elo de ligação](${elo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the character **asterisk** (**\\***). Field: the glyph **and** the cartoon Asterix & Obelix. The ear glues *asterisco* to *Asterix*. Craft **cuts**. This sheet = the **typographic little star**. The cartoon: [Asterix and Obelix](${desenho}).

> Independent audit. **Not** a Gaul album, **not** the infinity sign. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **asterisco** · **\\*** |
| Path | Gk. *asterískos* “little star” |
| Key | Shift+8 — same key as [eight](${oito}), other sign |
| Cut | [Asterix](${desenho}) · [∞](${elo}) · obelisk |
| Date | ${inspected} |

## Verdict

**Approved** — glyph *asterískos*; cartoon on its own sheet; eight and infinity stay next door.

[▶ Words](${hub}) · [▶ Asterix](${desenho}) · [▶ Eight](${oito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del carácter **asterisco** (**\\***). Pedido: el glifo **y** el dibujo Asterix y Obelix. El oído pega *asterisco* a *Asterix*. El oficio **corta**. Esta ficha = la **estrellita tipográfica**. El dibujo: [Asterix y Obelix](${desenho}).

> Auditoría independiente. **No** es el álbum galo ni el signo de infinito. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **asterisco** · **\\*** |
| Étimo | gr. *asterískos* «estrellita» |
| Tecla | Shift+8 — misma tecla que [oito](${oito}) |
| Corte | [Asterix](${desenho}) · [∞](${elo}) · obelisco |
| Fecha | ${inspected} |

## Veredicto

**Aprobado** — glifo; el dibujo en su ficha; el ocho y el infinito al lado.

[▶ Palabras](${hub}) · [▶ Asterix](${desenho}) · [▶ Oito](${oito}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, poemPt: poemPt(), poemEn: poemEn(), poemEs: poemEs() };
}

function buildAsteriscoPost() {
  const { body, contentEn, contentEs } = buildAsteriscoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-asterisco', 291);
  return makePalavra({
    title: 'Inspeção: Asterisco — o carácter *, não o gaulês',
    titleEn: 'Inspection: Asterisk — the * character, not the Gaul',
    titleEs: 'Inspección: Asterisco — el carácter *, no el galo',
    excerpt:
      'Palavras: asterisco / * (gr. asteriskos) — estrela tipográfica; Shift+8 ≠ oito ≠ ∞; Asterix e Obelix são outra ficha; Valeu !!!',
    excerptEn:
      'Words: asterisk / * (Gk. asteriskos) — typographic star; Shift+8 ≠ eight ≠ ∞; Asterix and Obelix are another sheet; Valeu !!!',
    excerptEs:
      'Palabras: asterisco / * (gr. asteriskos) — estrella tipográfica; Shift+8 ≠ oito ≠ ∞; Asterix y Obelix son otra ficha; ¡Valeu !!!',
    slug: 'inspecao-palavra-asterisco',
    date: '2026-08-24T01:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Asterisco · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAsteriscoPost,
  buildAsteriscoBodies,
  poemPt,
  poemEn,
  poemEs
};
