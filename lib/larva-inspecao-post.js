'use strict';

/**
 * Inspeção Palavras · larva
 * Pedido: larva de vulcão → corte: larva (inseto) ≠ lava (vulcão).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/larva-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/larva';
const WIKI = 'https://pt.wikipedia.org/wiki/Larva';
const WIKT_LA = 'https://en.wiktionary.org/wiki/larva#Latin';

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
  return `Larva.
Máscara antiga.
Bicho ainda sem o ofício da asa.

Não é lava.
Não lava a montanha.
Não lava o pé.

Valeu !!!
com o jovem no sítio,
sem cratera no berço.`;
}

function buildLarvaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-larva.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const formiga = '/posts/post-inspecao-palavra-formiga.html';
  const cigarra = '/posts/post-inspecao-palavra-cigarra.html';
  const lavaPe = '/posts/post-inspecao-expressao-formiga-lava-pe.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[larva](${self})** — a **forma jovem** de muitos [insetos](${inseto}) e de outros metazoários. Pedido de campo: *cruzar [lavar](${lavar}) com larva de vulcão*. Gatilho: *larva de vul~c*. [A orelha cola](${orelhaCola}) **larva** / **[lava](${lava})**. O étimo **corta**: não há larva de vulcão; há **lava** de vulcão.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · larva](${WIKT}), [Wikipédia · Larva](${WIKI}), lat. [*lārva*](${WIKT_LA}). **Ficha ≠ manual de criação, ≠ isca, ≠ protocolo de praga.** Sem captura. Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **larva** |
| Classe | Substantivo feminino |
| Ser | Estádio imaturo — o [inseto](${inseto}) **antes** da metamorfose completa (em muitos casos) |
| Étimo (trabalho) | Lat. *lārva* «máscara, espectro, espírito» → depois o bicho «disfarçado» / jovem — confiança: **alta** |
| Tipo BudGanja | Palavra — vida miúda × cola com [lava](${lava}) |
| O que **não** é | [Lava](${lava}) de vulcão · [lavar](${lavar}) · [formiga lava-pé](${lavaPe}) adulta |
| Elo | [inseto](${inseto}) · [formiga](${formiga}) · [cigarra](${cigarra}) (ninfa no solo) · [animal](${animal}) |
| Elo vizinho | Girino — larva de anfíbio (outra sala; não esta âncora) |
| Fonte | [larva](${WIKT}) · [WP](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome do estádio**. Nem todo jovem é larva no sentido estrito (a [formiga](${formiga}) passa por larva + pupa; a [cigarra](${cigarra}) passa anos como **ninfa**). O lab nomeia; a entomologia afina.

## 2. Larva de vulcão — o lapso

| Orelha ouviu | Objecto | Sala |
|--------------|---------|------|
| *larva de vulcão* | Não existe neste mapa | Lapso |
| **[lava](${lava}) de vulcão** | Rocha fundida | Esta correção |
| **larva** | Jovem do [inseto](${inseto}) | Esta ficha |

**H1:** uma letra / um *r* — *larva* × *lava*.  
**H2:** o campo veio de [lavar](${lavar}) + vulcão; a boca juntou **três** salas.  
**H3:** lat. *lārva* (máscara) ≠ lat. *lābēs* (queda) ≠ lat. *lavāre* (lavar).

## 3. Vida breve

A larva come, cresce, muda de pele. Não é «o inseto pequeno para sempre». Sem modo de criação, isca ou veneno nesta ficha.

## 4. Rede

| Ficha | Papel |
|-------|-------|
| [Lava](${lava}) | O par que a orelha cola |
| [Lavar](${lavar}) | O verbo do pedido |
| [Inseto](${inseto}) · [formiga](${formiga}) | Casa do estádio |
| [Formiga lava-pé](${lavaPe}) | Adulto que ferroa — não larva de vulcão |
| [Cigarra](${cigarra}) | Ninfa (outro nome de jovem) |

\`\`\`poem
${poemPt()}
\`\`\`

## Status

**Aprovado** — **larva** = jovem do [inseto](${inseto}); *larva de vulcão* = [lava](${lava}). [Valeu !!!](${mantra}) **com o berço no sítio**.

[▶ Palavras](${hub}) · [▶ Lava](${lava}) · [▶ Lavar](${lavar}) · [▶ Inseto](${inseto}) · [▶ Formiga](${formiga}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Larva** is the immature stage (Lat. *lārva* “mask / ghost”), **not** volcanic [lava](${lava}). Field slip: *larva de vulcão* → **lava de vulcão**.

**Approved.** [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Larva** es el estadio joven (lat. *lārva*), **no** la [lava](${lava}) del volcán. Lapsus: *larva de vulcão* → **lava de vulcão**.

**Aprobado.** [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildLarvaPost() {
  const { body, contentEn, contentEs, wiki } = buildLarvaBodies();
  return makePalavra({
    title: 'Inspeção: Larva — o jovem do inseto, não a lava do vulcão',
    titleEn: 'Inspection: Larva — the insect’s young, not volcano lava',
    titleEs: 'Inspección: Larva — el joven del insecto, no la lava del volcán',
    excerpt:
      'Palavras: larva (lat. lārva) ≠ lava de vulcão; lapso larva de vulcão; Valeu !!!',
    excerptEn:
      'Words: larva (Lat. lārva) ≠ volcanic lava; slip larva de vulcão; Valeu !!!',
    excerptEs:
      'Palabras: larva (lat. lārva) ≠ lava de volcán; lapsus larva de vulcão; ¡Valeu !!!',
    slug: 'inspecao-palavra-larva',
    date: '2026-08-23T16:52:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-larva', 273),
    seriesLabel: 'Larva · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildLarvaPost, buildLarvaBodies };
