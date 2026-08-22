'use strict';

/**
 * Inspeção Expressões · meudeusdoceu (SUBSTITUÍDA)
 * Nome lab antigo — ofício migrado para jesusudavi.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildMeudeusdoceuBodies() {
  const nova = '/posts/post-inspecao-expressao-jesusudavi.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';

  const body = `## Substituição lab

A forma lab **meudeusdoceu** foi **substituída** por **[jesusudavi](${nova})**.

| Campo | Valor |
|-------|-------|
| Nome antigo | **meudeusdoceu** |
| Nome lab actual | **[jesusudavi](${nova})** |
| Forma legível | meu Deus do céu |
| Ofício | Assombro alto — espanto / incredulidade |
| Irmã de tom | [jesusamado](${jesusamado}) |

**Lê a ficha canónica:** [jesusudavi — assombro alto](${nova}).

Esta página fica como **ponte** para links antigos — não é a ficha activa Cap. 4.

[▶ jesusudavi](${nova}) · [▶ jesusamado](${jesusamado}) · [▶ Expressões](${hub})
`;

  const contentEn = `## Lab substitution

The lab form **meudeusdoceu** was **replaced** by **[jesusudavi](${nova})**.

Readable form remains *meu Deus do céu* (high awe). Canonical sheet: [jesusudavi](${nova}).

[▶ jesusudavi](${nova}) · [▶ jesusamado](${jesusamado})
`;

  const contentEs = `## Sustitución lab

La forma lab **meudeusdoceu** fue **sustituida** por **[jesusudavi](${nova})**.

Forma legible: *meu Deus do céu*. Ficha canónica: [jesusudavi](${nova}).

[▶ jesusudavi](${nova}) · [▶ jesusamado](${jesusamado})
`;

  return { body, contentEn, contentEs };
}

function buildMeudeusdoceuPost() {
  const { body, contentEn, contentEs } = buildMeudeusdoceuBodies();
  return expressaoPost({
    title: 'Inspeção: meudeusdoceu — substituída por jesusudavi',
    titleEn: 'Inspection: meudeusdoceu — replaced by jesusudavi',
    titleEs: 'Inspección: meudeusdoceu — sustituida por jesusudavi',
    excerpt:
      'Expressões: meudeusdoceu — nome lab antigo; ofício migrado para jesusudavi (meu Deus do céu / assombro alto).',
    excerptEn:
      'Sayings: meudeusdoceu — old lab name; office moved to jesusudavi (meu Deus do céu / high awe).',
    excerptEs:
      'Dichos: meudeusdoceu — nombre lab antiguo; oficio migrado a jesusudavi (meu Deus do céu / asombro alto).',
    slug: 'inspecao-expressao-meudeusdoceu',
    date: '2026-08-03T17:30:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'meudeusdoceu · substituída',
    coverImage: '/imagens/inspecoes/jesusudavi-cover.jpg',
    sourceUrl: '/posts/post-inspecao-expressao-jesusudavi.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMeudeusdoceuPost,
  buildMeudeusdoceuBodies
};
