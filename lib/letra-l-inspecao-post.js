'use strict';

/**
 * Inspeção Palavras · letra L
 * 12.ª letra do alfabeto latino; nome PT éle.
 * Pedido: inspeção da letra L · genialllll (alongamento).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/letra-l-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/L';
const WIKI = 'https://pt.wikipedia.org/wiki/L';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 340) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `L não é Lula.
L não é loss.
L não é o elogio inteiro.

É a haste.
É o éle.
O genial que se estica
só pede mais L na boca —
o engenho continua o mesmo.

Valeu !!!
com a letra no sítio,
sem baixar pessoa nem partido.`;
}

function buildLetraLBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-letra-l.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const zero = '/posts/post-inspecao-palavra-zero.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const perda = '/posts/post-inspecao-expressao-perda-total.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da **[letra L](${self})** — 12.ª letra do alfabeto latino usado no [português](${lingua}). Nome em PT: **éle**. Pedidos de campo: *inspeção da letra L* · *geniallllllllllllllllllllllllll* (o elogio [genial](${genial}) **esticado** na boca). Objecto: o **glifo** e o **som /l/** — não a pessoa, não o partido, não o sinistro.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · L](${WIKT}), [Wikipédia · L](${WIKI}). **Ficha ≠ cartilha de caligrafia, ≠ campanha, ≠ xingamento.** Sem afiliação política. Tom: uma haste; o resto é orelha.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Letra | **L** · **l** |
| Nome PT | **éle** (também *ele*) |
| Ordem | 12.ª no alfabeto latino |
| Som | Consoante lateral /l/ (e palatal *lh* noutra letra) |
| Romano | **L = 50** — número, não dezena da Mega |
| Tipo BudGanja | Palavra-letra — glifo × fonema × cortes de orelha |
| Alongamento vivo | *GEnial!!!* / *genialllll* = [genial](${genial}) com volume e **L a mais** |
| O que **não** é | Lula (apelido / cefalópode) · EN *left* como âncora · *take an L* · [perda total](${perda}) |
| Elo | [genial](${genial}) · [legal](${legal}) · [esquerdo](${esquerdo}) · [zero](${zero}) (glifo **O** ≠ **0**) |
| Fonte | [L](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** a **haste**. Quem cola L em Lula ou em *loss* está a ler outra sala.

## 2. Genialllll — o L que se estica

No BR oral, repetir a letra alonga o **sopro**, não muda o étimo. *geniallllllllllllllllllllllllll* = o mesmo [genial](${genial}) (engenho + elogio), com o **L** a fazer tempo na boca — primo de *ufa* / *aff* como duração, não como vocábulo novo.

| Parece | É |
|--------|---|
| Palavra nova | A mesma ficha [genial](${genial}) |
| Mais génio | Só mais **ar** no elogio |
| Letra L como âncora do elogio | Aqui o L é **peça**; o elogio vive na ficha genial |

**H1:** L é letra / som.  
**H2:** *éle* é o nome.  
**H3:** romano **L** = cinquenta.  
**H4:** *genialllll* alonga [genial](${genial}); não fundir com esta âncora.  
**H5:** EN *L* = *left* cruza [esquerdo](${esquerdo}) / [mãos](${maos}) — **empréstimo de lado**, não étimo do glifo.  
**H6:** *take an L* (perder) e [perda total](${perda}) são **outras contas**; sem [respeito](${respeito}) vira xingo.

## 3. O que a orelha cola

| Cola | Corte |
|------|-------|
| **Lula** (apelido ou [animal](${animal})/cefalópode) | Nome próprio / molusco — **não** a 12.ª letra |
| **Legal** | Palavra que **começa** por L — ficha [legal](${legal}) |
| **PT / urna** | Cívico — outra sala; esta é o glifo |
| Letra **I** / **1** | Hastes vizinhas; ofícios distintos |
| **0** e **O** | Vizinhos no teclado; ver [zero](${zero}) |

## 4. Limites

- Não ensinamos caligrafia escolar completa.  
- Não transformamos L em campanha nem em «loser».  
- Sem inventar QI na haste.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** — **L** = a 12.ª letra, o **éle**. *Genialllll* volta a [genial](${genial}). Fecho: [Valeu !!!](${mantra}) **com a haste no sítio**, sem baixar gente.

[▶ Palavras](${hub}) · [▶ Genial](${genial}) · [▶ Legal](${legal}) · [▶ Esquerdo](${esquerdo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The letter **L** — 12th in the Latin alphabet; Portuguese name **éle**. Stretched *genialllll* is still [genial](${genial}), not a new word. **Not** Lula, not “take an L”, not a party.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

La letra **L** — 12.ª del alfabeto latino; nombre PT **éle**. *Genialllll* sigue siendo [genial](${genial}). **No** es Lula ni «take an L».

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildLetraLPost() {
  const { body, contentEn, contentEs, wiki } = buildLetraLBodies();
  return makePalavra({
    title: 'Inspeção: Letra L — o éle, a haste, o alongamento',
    titleEn: 'Inspection: Letter L — éle, the stem, the stretch',
    titleEs: 'Inspección: Letra L — el éle, el palo, el alargue',
    excerpt:
      'Palavras: letra L / éle — 12.ª do alfabeto; genialllll = genial esticado; ≠ Lula ≠ loss; Valeu !!!',
    excerptEn:
      'Words: letter L / éle — 12th; genialllll = stretched genial; ≠ Lula ≠ loss; Valeu !!!',
    excerptEs:
      'Palabras: letra L / éle — 12.ª; genialllll = genial estirado; ≠ Lula ≠ loss; ¡Valeu !!!',
    slug: 'inspecao-palavra-letra-l',
    date: '2026-08-23T16:20:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-letra-l', 268),
    seriesLabel: 'Letra L · éle',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildLetraLPost, buildLetraLBodies };
