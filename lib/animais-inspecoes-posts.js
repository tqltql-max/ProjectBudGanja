'use strict';

/**
 * Inspeções educacionais do catálogo /animais/.
 * Série: animais-catalogo → tipagem hub 'animal'.
 * hubCategory: "producao" → série animais-producao → tipagem hub 'producao'.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { localizedAnimalFields } = require('./animais-i18n.js');
const { isProducaoAnimal } = require('./animais-service.js');

function loadAnimaisCatalog() {
  const file = path.join(ROOT, 'content', 'animais.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return Array.isArray(data.animals) ? data.animals : [];
}

function bulletList(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return '- —';
  return list.map((item) => '- ' + String(item)).join('\n');
}

function coverForAnimal(animal) {
  const cover = animal && animal.cover ? String(animal.cover).trim() : '';
  if (!cover) return 'imagens/og-default.jpg';
  return cover.replace(/^\//, '');
}

function relatedDerivadosMarkdown(animal, loc) {
  const links = Array.isArray(animal.relatedInspections) ? animal.relatedInspections : [];
  if (!links.length) return '';
  if (loc === 'en') {
    return `

## Related risk-derivative inspections

${links.map((r) => `- [${r.labelEn || r.label}](${r.href})`).join('\n')}
`;
  }
  if (loc === 'es') {
    return `

## Inspecciones de derivados de riesgo

${links.map((r) => `- [${r.labelEs || r.label}](${r.href})`).join('\n')}
`;
  }
  return `

## Inspeções de derivados de risco

${links.map((r) => `- [${r.label}](${r.href})`).join('\n')}
`;
}

function buildBody(animal, loc) {
  const f = localizedAnimalFields(animal, loc);
  const slug = animal.slug;
  const fichaUrl = '/animais/' + slug + '/';
  const inspected = '2026-08-01';
  const producao = isProducaoAnimal(animal);
  const hubHref = producao
    ? '/biblioteca/inspecoes/#inspecoes-producao'
    : '/biblioteca/inspecoes/#inspecoes-animais';

  if (loc === 'en') {
    return `## Scope

Educational inspection of **${f.nomePopular}** (*${animal.nomeCientifico || '—'}*) from the Inspetor BudGanja animals catalog. This report restates the public animal sheet with a verifiable lab method — it is **not** a veterinary protocol and **does not replace** professional advice.

> **Method note:** independent BudGanja audit based on the catalog entry at [${fichaUrl}](${fichaUrl}). Educational content only. The animal is not the villain; industrial diversion is documented in linked **risk-derivative** inspections when present.

## Inspected object

| Field | Value |
|-------|-------|
| Common name | **${f.nomePopular}** |
| Scientific name | *${animal.nomeCientifico || '—'}* |
| Family | ${animal.familia || '—'} |
| Axis | ${producao ? 'Production / industry' : 'Companionship'} |
| Catalog slug | \`${slug}\` |
| Inspection date | ${inspected} |

## Summary

${f.summary || '—'}

## Products / parts

${bulletList(f.partsUsed)}

## Husbandry and uses (catalog)

${bulletList(f.traditionalUses)}

## Cautions

${f.cautions || 'Educational content. Does not replace professional advice.'}
${relatedDerivadosMarkdown(animal, loc)}
## Catalog sheet

Full animal page: [${f.nomePopular}](${fichaUrl})

## Hub

Return to [${producao ? 'production-animal inspections' : 'animal inspections'}](${hubHref}).
`;
  }

  if (loc === 'es') {
    return `## Alcance

Inspección educativa de **${f.nomePopular}** (*${animal.nomeCientifico || '—'}*) del catálogo de animales del Inspetor BudGanja. Este informe reúne la ficha pública con método verificable — **no** es un protocolo veterinario y **no sustituye** orientación profesional.

> **Nota metodológica:** auditoría independiente BudGanja a partir de la ficha en [${fichaUrl}](${fichaUrl}). Solo contenido educativo. El animal no es el villano; el desvío industrial se documenta en inspecciones de **derivados de riesgo** enlazadas.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre popular | **${f.nomePopular}** |
| Nombre científico | *${animal.nomeCientifico || '—'}* |
| Familia | ${animal.familia || '—'} |
| Eje | ${producao ? 'Producción / industria' : 'Compañía'} |
| Slug del catálogo | \`${slug}\` |
| Fecha de inspección | ${inspected} |

## Resumen

${f.summary || '—'}

## Productos / partes

${bulletList(f.partsUsed)}

## Cría y usos (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Contenido educativo. No sustituye orientación profesional.'}
${relatedDerivadosMarkdown(animal, loc)}
## Ficha del catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Volver a las [${producao ? 'inspecciones de producción animal' : 'inspecciones de animales'}](${hubHref}).
`;
  }

  return `## Escopo

Inspeção educacional de **${f.nomePopular}** (*${animal.nomeCientifico || '—'}*) a partir do catálogo de animais do Inspetor BudGanja. Este relatório reúne a ficha pública com método verificável do laboratório — **não** é protocolo veterinário e **não substitui** orientação profissional.

> **Nota metodológica:** auditoria independente BudGanja com base na ficha em [${fichaUrl}](${fichaUrl}). Conteúdo apenas educacional. O animal não é o vilão; o desvio industrial documenta-se nas inspeções de **derivados de risco** ligadas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **${f.nomePopular}** |
| Nome científico | *${animal.nomeCientifico || '—'}* |
| Família | ${animal.familia || '—'} |
| Eixo | ${producao ? 'Produção / indústria' : 'Companhia'} |
| Slug no catálogo | \`${slug}\` |
| Data da inspeção | ${inspected} |

## Resumo

${f.summary || '—'}

## Produtos / partes

${bulletList(f.partsUsed)}

## Criação e usos (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Conteúdo educacional. Não substitui orientação profissional.'}
${relatedDerivadosMarkdown(animal, loc)}
## Ficha do catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Voltar às [${producao ? 'inspeções de produção animal' : 'inspeções de animais'}](${hubHref}).
`;
}

function buildAnimalInspecaoPost(animal, seriesOrder) {
  if (!animal || !animal.slug) throw new Error('animal sem slug');
  const order = seriesOrder == null ? 1 : Number(seriesOrder);
  const producao = isProducaoAnimal(animal);
  const pt = localizedAnimalFields(animal, 'pt-BR');
  const en = localizedAnimalFields(animal, 'en');
  const es = localizedAnimalFields(animal, 'es');
  const fichaUrl = '/animais/' + animal.slug + '/';
  const sci = animal.nomeCientifico || '—';
  const kindPt = producao ? 'Produção animal' : 'Animal';
  const kindEn = producao ? 'Animal production' : 'Animal';
  const kindEs = producao ? 'Producción animal' : 'Animal';

  return {
    title: 'Inspeção: ' + kindPt + ' — ' + pt.nomePopular,
    titleEn: 'Inspection: ' + kindEn + ' — ' + en.nomePopular,
    titleEs: 'Inspección: ' + kindEs + ' — ' + es.nomePopular,
    excerpt:
      'Relatório educacional de ' +
      pt.nomePopular +
      ' (*' +
      sci +
      '): ficha, criação/usos, cuidados e ligação aos derivados industriais quando existirem.',
    excerptEn:
      'Educational report on ' +
      en.nomePopular +
      ' (*' +
      sci +
      '): profile, husbandry/uses, cautions and links to industrial derivatives when present.',
    excerptEs:
      'Informe educativo sobre ' +
      es.nomePopular +
      ' (*' +
      sci +
      '): ficha, cría/usos, cuidados y vínculo a derivados industriales cuando existan.',
    slug: 'inspecao-animal-' + animal.slug,
    date: '2026-08-01T22:00:00.000Z',
    coverImage: coverForAnimal(animal),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: producao ? 'animais-producao' : 'animais-catalogo',
    seriesOrder: order,
    seriesLabel: producao ? pt.nomePopular + ' · produção' : pt.nomePopular,
    sourceUrl: fichaUrl,
    content_raw: buildBody(animal, 'pt-BR'),
    contentEn: buildBody(animal, 'en'),
    contentEs: buildBody(animal, 'es')
  };
}

function buildAllAnimaisInspecoesPosts() {
  const animals = loadAnimaisCatalog();
  let prodOrder = 0;
  let catOrder = 0;
  return animals.map((animal) => {
    const order = isProducaoAnimal(animal) ? ++prodOrder : ++catOrder;
    return buildAnimalInspecaoPost(animal, order);
  });
}

module.exports = {
  loadAnimaisCatalog,
  buildAnimalInspecaoPost,
  buildAllAnimaisInspecoesPosts,
  ANIMAIS_INSPECOES_POSTS: buildAllAnimaisInspecoesPosts()
};
