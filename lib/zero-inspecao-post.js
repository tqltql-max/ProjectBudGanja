'use strict';

/**
 * Inspeção Palavras · zero / 0
 * Matemática: identidade da soma; absorvente da multiplicação.
 * Pedido de campo: 0 · não é dezena da Mega-Sena (01–60).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/zero-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/zero';
const WIKI = 'https://pt.wikipedia.org/wiki/0_(n%C3%BAmero)';

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

function buildZeroBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-zero.html';
  const mega = '/posts/post-inspecao-palavra-mega-sena.html';
  const catorze = '/posts/post-inspecao-palavra-catorze.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do número **[0](${self})** — vocábulo **zero**. Pedido de campo: *0*, na sequência matemática (7 · 8 · 13 · 14 · 21) e ao lado da [Mega-Sena](${mega}). Objecto: o **cardinal nulo**, o **ofício na conta** e o corte: **zero não é dezena da urna** (01–60).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · zero](${WIKT}), [0 (número)](${WIKI}). **Ficha ≠ aula de cálculo, ≠ dica de loteria, ≠ insulto.** Dividir por zero é **indefinido** — nomeamos o facto; não abrimos tutorial. Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **zero** · algarismo **0** |
| Classe | Numeral cardinal / algarismo |
| Étimo (trabalho) | Ár. *ṣifr* «vazio» → it./cast. *zero* → PT *zero* — confiança **alta** |
| Aritmética | **a + 0 = a** (identidade da soma) · **a × 0 = 0** (absorvente) |
| Não é | Primo · composto (isso pede inteiro > 1) · dezena da [Mega-Sena](${mega}) |
| Olho cola | Letra **O** / **o** — outro glifo |
| Tipo BudGanja | Palavra-número — o vazio que **conta** |
| Elo | [Mega-Sena](${mega}) · [catorze / 14](${catorze}) · [três](${tres}) · [verdade](${verdade}) |
| Data | ${inspected} |

**Objecto:** o número que diz **nenhum**. Sem ele a posição decimal não segura o 10 nem o 101.

## 2. Matemática

**H1:** zero é **quantidade nula**, não «falta de número».  
**H2:** somar zero **não muda**; multiplicar por zero **apaga** o outro factor.  
**H3:** **a ÷ 0** não tem valor no conjunto dos reais que o lab usa aqui — é corte, não truque.  
**H4:** na [Mega-Sena](${mega}) as dezenas vão de **01 a 60**. O **0** sozinho **não entra** no globo. Quem marca «00» por pose está fora da modalidade.

| Afirmação comum | Correção |
|-----------------|----------|
| «Zero não existe» | Existe: é o cardinal do conjunto vazio |
| «Zero é dezena da Mega» | Não. 01–60; ver [Mega-Sena](${mega}) |
| «O e 0 são iguais» | Glifos vizinhos; ofícios distintos |
| «Dividir por zero dá infinito» | Em aritmética escolar é **indefinido**; ∞ é outra sala ([lemniscata](/posts/post-inspecao-palavra-lemniscata.html)) |

## 3. Usos no português do Brasil

| Uso | Bom × mau no lab |
|-----|------------------|
| Conta / medida | Bom: nomear o nulo com [verdade](${verdade}) |
| «Deu zero» (nota) | Medida; não é xingamento nesta ficha |
| Loteria | Mau: inventar 0 na cartela da Mega |

## Veredicto

**Aprovado** — **0** fichado como cardinal nulo. Na Mega, **não joga**. Fecho: [Valeu !!!](${mantra}) **com** o zero no sítio certo da conta.

[▶ Palavras](${hub}) · [▶ Mega-Sena](${mega}) · [▶ 14](${catorze}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

The number **0** / Portuguese **zero**. Additive identity; multiplication by zero wipes the other factor. **Not** a Mega-Sena dezena (01–60). Division by zero is **undefined** here — not a trick. Letter **O** is another glyph.

**Approved.** [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Mega-Sena](${mega}) · [▶ 14](${catorze})
`;

  const contentEs = `## Alcance

El número **0** / **zero**. Identidad de la suma; multiplicar por cero apaga el otro factor. **No** es decena de la Mega-Sena (01–60). Dividir por cero es **indefinido**. La letra **O** es otro glifo.

**Aprobado.** [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Mega-Sena](${mega}) · [▶ 14](${catorze})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildZeroPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildZeroBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-zero', 264);
  return makePalavra({
    title: 'Inspeção: 0 — zero, o nulo que conta',
    titleEn: 'Inspection: 0 — zero, the null that still counts',
    titleEs: 'Inspección: 0 — zero, el nulo que cuenta',
    excerpt:
      'Palavras: 0 / zero — identidade da soma; ×0 apaga; ≠ dezena da Mega-Sena (01–60); ≠ letra O; Valeu !!!',
    excerptEn:
      'Words: 0 / zero — additive identity; ×0 wipes; not a Mega-Sena number; ≠ letter O; Valeu !!!',
    excerptEs:
      'Palabras: 0 / zero — identidad de la suma; ×0 borra; no es decena de la Mega-Sena; ≠ letra O; ¡Valeu !!!',
    slug: 'inspecao-palavra-zero',
    date: '2026-08-23T13:45:00.000Z',
    published: false,
    seriesOrder: order,
    seriesLabel: '0 · zero · nulo',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildZeroPost, buildZeroBodies };
