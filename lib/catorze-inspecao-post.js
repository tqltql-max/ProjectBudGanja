'use strict';

/**
 * Inspeção Palavras · catorze / 14
 * Matemática: 2 × 7; par; composto; ≠ Fibonacci; ≠ primo.
 * Pedido de campo: 14 · elo Mega-Sena (dezena igual às outras).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/catorze-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/catorze';
const WIKI = 'https://pt.wikipedia.org/wiki/14_(n%C3%BAmero)';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 330) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildCatorzeBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-catorze.html';
  const mega = '/posts/post-inspecao-palavra-mega-sena.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const sexta = '/posts/post-inspecao-palavra-sexta-feira-13.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do número **[14](${self})** — vocábulo **catorze** / **quatorze**. Pedido de campo: *14*, a seguir à série matemática (7 · 8 · 13 · 21) e à ficha [Mega-Sena](${mega}). Objecto: o **cardinal**, a **aritmética** (2 × 7) e o corte: **14 não é dezena sortuda**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · catorze](${WIKT}), [14 (número)](${WIKI}). **Ficha ≠ horóscopo, ≠ dica de loteria.** Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **catorze** · algarismo **14** |
| Variante | **quatorze** (também corrente no BR) |
| Classe | Numeral cardinal |
| Étimo | Lat. *quattuordecim* (*quattuor* + *decem*) — confiança **alta** |
| Aritmética | **2 × 7** · par · composto · divisores 1, 2, 7, 14 |
| Não é | Primo · termo de Fibonacci (13 e 21 sim; 14 não) |
| Tipo BudGanja | Palavra-número — matemática × literacia |
| Elo | [Mega-Sena](${mega}) · [três](${tres}) · [sexta-feira 13](${sexta}) (calendário, outra sala) |
| Data | ${inspected} |

## 2. Matemática

**H1:** 14 = **dois setes**. A factorização é o ofício; a «sorte» não factoriza.  
**H2:** 13 é primo e Fibonacci; **14** é o vizinho composto — não herda milagre.  
**H3:** na [Mega-Sena](${mega}) o 14 é **uma** dezena entre 01 e 60. Patrocínio e bolão **não** alteram isso.

| Afirmação comum | Correção |
|-----------------|----------|
| «14 dá sorte» | Cultura; [verdade](${verdade}) do número = 2 × 7 |
| «14 atrasa na Mega» | Falácia do jogador — ver [Mega-Sena](${mega}) |
| «quatorze é outro número» | Mesma quantidade; duas grafias |

## Veredicto

**Aprovado** — **14** fichado como cardinal. Fecho: [Valeu !!!](${mantra}) **sem** fila da lotérica.

[▶ Palavras](${hub}) · [▶ Mega-Sena](${mega}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The number **14** / Portuguese **catorze**. Math: **2 × 7**, even, composite. Not prime, not Fibonacci. In [Mega-Sena](${mega}) it is one dezena among sixty — not luckier.

**Approved.** [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Mega-Sena](${mega})
`;

  const contentEs = `## Alcance

El número **14** / **catorze**. Matemática: **2 × 7**, par, compuesto. No primo, no Fibonacci. En la [Mega-Sena](${mega}) es una decena entre sesenta — no más suertuda.

**Aprobado.** [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Mega-Sena](${mega})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCatorzePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCatorzeBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-catorze', 263);
  return makePalavra({
    title: 'Inspeção: 14 — catorze, dois setes, não é sorte',
    titleEn: 'Inspection: 14 — catorze, two sevens, not luck',
    titleEs: 'Inspección: 14 — catorze, dos sietes, no es suerte',
    excerpt:
      'Palavras: 14 / catorze — 2×7; composto; ≠ Fibonacci ≠ primo; na Mega-Sena é só dezena; Valeu !!!',
    excerptEn:
      'Words: 14 / catorze — 2×7; composite; ≠ Fibonacci ≠ prime; in Mega-Sena just a number; Valeu !!!',
    excerptEs:
      'Palabras: 14 / catorze — 2×7; compuesto; ≠ Fibonacci ≠ primo; en la Mega-Sena solo una decena; ¡Valeu !!!',
    slug: 'inspecao-palavra-catorze',
    date: '2026-08-23T13:41:00.000Z',
    published: false,
    seriesOrder: order,
    seriesLabel: '14 · catorze · 2×7',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCatorzePost, buildCatorzeBodies };
