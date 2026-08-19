'use strict';

/**
 * Inspeções educacionais do catálogo /fungos/.
 * Série: fungos-catalogo → tipagem hub 'fungo'.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { localizedFungoFields } = require('./fungos-i18n.js');
const { renderFungoNotes, getFungoNoteMeta } = require('./fungos-notas-inspecao.js');

function loadFungosCatalog() {
  const file = path.join(ROOT, 'content', 'fungos.json');
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data.fungi) ? data.fungi : [];
  } catch (e) {
    return [];
  }
}

function bulletList(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return '- —';
  return list.map((item) => '- ' + String(item)).join('\n');
}

function coverForFungo(fungo) {
  const cover = fungo && fungo.cover ? String(fungo.cover).trim() : '';
  if (!cover) return 'imagens/og-default.jpg';
  return cover.replace(/^\//, '');
}

function buildBody(fungo, loc) {
  const f = localizedFungoFields(fungo, loc);
  const slug = fungo.slug;
  const fichaUrl = '/fungos/' + slug + '/';
  const inspected = '2026-08-19';
  const hubHref = '/biblioteca/inspecoes/#inspecoes-fungos';
  const notes = renderFungoNotes(slug, loc);

  if (loc === 'en') {
    const unifesp = fungo.relatedUnifesp
      ? `\n## UNIFESP link\n\nThis species is marked as related to the lab's UNIFESP extension track. See the [UNIFESP hub](/biblioteca/unifesp/) and the [course inspection](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
      : '';
    return `## Scope

Educational inspection of **${f.nomePopular}** (*${fungo.nomeCientifico || '—'}*) from the Inspetor BudGanja **fungi** catalog. This report restates the public sheet with a verifiable lab method — it is **not** a clinical protocol, **not** a cultivation guide and **does not replace** professional advice.

> **Method note:** independent BudGanja audit based on the catalog entry at [${fichaUrl}](${fichaUrl}). Educational content only.

## Inspected object

| Field | Value |
|-------|-------|
| Common name | **${f.nomePopular}** |
| Scientific name | *${fungo.nomeCientifico || '—'}* |
| Family | ${fungo.familia || '—'} |
| Kingdom | Fungi |
| Catalog slug | \`${slug}\` |
| Inspection date | ${inspected} |

## Summary

${f.summary || '—'}

## Parts / characters of office

${bulletList(f.partsUsed)}

## Traditional and formative context (catalog)

${bulletList(f.traditionalUses)}

## Cautions

${f.cautions || 'Educational content. Does not replace professional advice.'}
${notes}${unifesp}
## Catalog sheet

Full page: [${f.nomePopular}](${fichaUrl})

## Hub

Return to [Fungus inspections](${hubHref}).
`;
  }

  if (loc === 'es') {
    const unifesp = fungo.relatedUnifesp
      ? `\n## Vínculo UNIFESP\n\nEsta especie está marcada como relacionada con el eje de extensión UNIFESP del laboratorio. Ver el [hub UNIFESP](/biblioteca/unifesp/) y la [inspección del curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
      : '';
    return `## Alcance

Inspección educativa de **${f.nomePopular}** (*${fungo.nomeCientifico || '—'}*) del catálogo de **hongos** del Inspetor BudGanja. Este informe reúne la ficha pública con método verificable — **no** es protocolo clínico, **no** es guía de cultivo y **no sustituye** orientación profesional.

> **Nota metodológica:** auditoría independiente BudGanja a partir de la ficha en [${fichaUrl}](${fichaUrl}). Solo contenido educativo.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre popular | **${f.nomePopular}** |
| Nombre científico | *${fungo.nomeCientifico || '—'}* |
| Familia | ${fungo.familia || '—'} |
| Reino | Fungi |
| Slug del catálogo | \`${slug}\` |
| Fecha de inspección | ${inspected} |

## Resumen

${f.summary || '—'}

## Partes / caracteres de oficio

${bulletList(f.partsUsed)}

## Contexto tradicional y formativo (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Contenido educativo. No sustituye orientación profesional.'}
${notes}${unifesp}
## Ficha del catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Volver a [Inspecciones de hongos](${hubHref}).
`;
  }

  const unifesp = fungo.relatedUnifesp
    ? `\n## Ligação UNIFESP\n\nEsta espécie está marcada como relacionada ao eixo de extensão UNIFESP do laboratório. Ver o [hub UNIFESP](/biblioteca/unifesp/) e a [inspeção do curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
    : '';

  return `## Escopo

Inspeção educacional do **fungo** **${f.nomePopular}** (*${fungo.nomeCientifico || '—'}*) a partir do catálogo de fungos do Inspetor BudGanja. Este relatório reúne a ficha pública com o método verificável do laboratório — **não** é protocolo clínico, **não** é guia de cultivo e **não substitui** orientação profissional.

> **Nota metodológica:** auditoria independente BudGanja com base na ficha em [${fichaUrl}](${fichaUrl}). Conteúdo apenas educacional.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **${f.nomePopular}** |
| Nome científico | *${fungo.nomeCientifico || '—'}* |
| Família | ${fungo.familia || '—'} |
| Reino | Fungi |
| Categoria no hub | Fungos |
| Slug no catálogo | \`${slug}\` |
| Data da inspeção | ${inspected} |

## Resumo

${f.summary || '—'}

## Partes / caracteres de ofício

${bulletList(f.partsUsed)}

## Contexto tradicional e formativo (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Conteúdo educacional. Não substitui orientação profissional.'}
${notes}${unifesp}
## Ficha do catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Voltar às [inspeções de fungos](${hubHref}).
`;
}

function buildFungoInspecaoPost(fungo, seriesOrder) {
  if (!fungo || !fungo.slug) {
    throw new Error('fungo sem slug');
  }
  const order = seriesOrder == null ? 1 : Number(seriesOrder);
  const pt = localizedFungoFields(fungo, 'pt-BR');
  const en = localizedFungoFields(fungo, 'en');
  const es = localizedFungoFields(fungo, 'es');
  const fichaUrl = '/fungos/' + fungo.slug + '/';
  const metaPt = getFungoNoteMeta(fungo.slug, 'pt-BR');
  const metaEn = getFungoNoteMeta(fungo.slug, 'en');
  const metaEs = getFungoNoteMeta(fungo.slug, 'es');
  const sci = fungo.nomeCientifico || '—';

  return {
    title: metaPt && metaPt.titleSuffix
      ? 'Inspeção: Fungo — ' + pt.nomePopular + ' — ' + metaPt.titleSuffix
      : 'Inspeção: Fungo — ' + pt.nomePopular,
    titleEn: metaEn && metaEn.titleSuffix
      ? 'Inspection: Fungus — ' + en.nomePopular + ' — ' + metaEn.titleSuffix
      : 'Inspection: Fungus — ' + en.nomePopular,
    titleEs: metaEs && metaEs.titleSuffix
      ? 'Inspección: Hongo — ' + es.nomePopular + ' — ' + metaEs.titleSuffix
      : 'Inspección: Hongo — ' + es.nomePopular,
    excerpt:
      (metaPt && metaPt.excerpt) ||
      'Relatório educacional de ' + pt.nomePopular + ' (*' + sci + ').',
    excerptEn:
      (metaEn && metaEn.excerpt) ||
      'Educational report on ' + en.nomePopular + ' (*' + sci + ').',
    excerptEs:
      (metaEs && metaEs.excerpt) ||
      'Informe educativo sobre ' + es.nomePopular + ' (*' + sci + ').',
    slug: 'inspecao-fungo-' + fungo.slug,
    date: '2026-08-19T16:00:00.000Z',
    coverImage: '/' + coverForFungo(fungo).replace(/^\//, ''),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'fungos-catalogo',
    seriesOrder: order,
    seriesLabel: pt.nomePopular + ' · fungo',
    sourceUrl: fichaUrl,
    content_raw: buildBody(fungo, 'pt-BR'),
    contentEn: buildBody(fungo, 'en'),
    contentEs: buildBody(fungo, 'es')
  };
}

function buildAllFungosInspecoesPosts() {
  const fungi = loadFungosCatalog();
  return fungi.map((fungo, i) => buildFungoInspecaoPost(fungo, i + 1));
}

module.exports = {
  buildFungoInspecaoPost,
  buildAllFungosInspecoesPosts
};
