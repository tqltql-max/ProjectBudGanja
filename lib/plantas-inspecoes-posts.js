'use strict';

/**
 * Inspeções educacionais das espécies do catálogo /plantas/.
 * Série: plantas-medicinais — tipagem no hub via resolveInspecaoTipo() → 'planta'.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { localizedPlantFields } = require('./plantas-i18n.js');

function loadPlantasCatalog() {
  const file = path.join(ROOT, 'content', 'plantas.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return Array.isArray(data.plants) ? data.plants : [];
}

function bulletList(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return '- —';
  return list.map((item) => '- ' + String(item)).join('\n');
}

function coverForPlant(plant) {
  const cover = plant && plant.cover ? String(plant.cover).trim() : '';
  if (!cover) return 'imagens/og-default.jpg';
  return cover.replace(/^\//, '');
}

function buildBody(plant, loc) {
  const f = localizedPlantFields(plant, loc);
  const slug = plant.slug;
  const fichaUrl = '/plantas/' + slug + '/';
  const inspected = '2026-07-31';

  if (loc === 'en') {
    const unifesp = plant.relatedUnifesp
      ? `\n## UNIFESP link\n\nThis species is marked as related to the lab's UNIFESP extension track. See the [UNIFESP hub](/biblioteca/unifesp/) and the [course inspection](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
      : '';
    return `## Scope

Educational inspection of **${f.nomePopular}** (*${plant.nomeCientifico || '—'}*) from the Inspetor BudGanja medicinal plants catalog. This report restates the public plant sheet with a verifiable lab method — it is **not** a clinical protocol and **does not replace** professional health advice.

> **Method note:** independent BudGanja audit based on the catalog entry at [${fichaUrl}](${fichaUrl}). Educational content only.

## Inspected object

| Field | Value |
|-------|-------|
| Common name | **${f.nomePopular}** |
| Scientific name | *${plant.nomeCientifico || '—'}* |
| Family | ${plant.familia || '—'} |
| Catalog slug | \`${slug}\` |
| Inspection date | ${inspected} |

## Summary

${f.summary || '—'}

## Parts used

${bulletList(f.partsUsed)}

## Traditional uses (catalog)

${bulletList(f.traditionalUses)}

## Cautions

${f.cautions || 'Educational content. Does not replace professional health advice.'}
${unifesp}
## Catalog sheet

Full plant page: [${f.nomePopular}](${fichaUrl})

## Hub

Return to [Plant inspections](/biblioteca/inspecoes/#inspecoes-plantas).
`;
  }

  if (loc === 'es') {
    const unifesp = plant.relatedUnifesp
      ? `\n## Vínculo UNIFESP\n\nEsta especie está marcada como relacionada con el eje de extensión UNIFESP del laboratorio. Ver el [hub UNIFESP](/biblioteca/unifesp/) y la [inspección del curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
      : '';
    return `## Alcance

Inspección educativa de **${f.nomePopular}** (*${plant.nomeCientifico || '—'}*) del catálogo de plantas medicinales del Inspetor BudGanja. Este informe reúne la ficha pública con método verificable del laboratorio — **no** es un protocolo clínico y **no sustituye** orientación profesional de salud.

> **Nota metodológica:** auditoría independiente BudGanja a partir de la ficha en [${fichaUrl}](${fichaUrl}). Solo contenido educativo.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre popular | **${f.nomePopular}** |
| Nombre científico | *${plant.nomeCientifico || '—'}* |
| Familia | ${plant.familia || '—'} |
| Slug del catálogo | \`${slug}\` |
| Fecha de inspección | ${inspected} |

## Resumen

${f.summary || '—'}

## Partes usadas

${bulletList(f.partsUsed)}

## Usos tradicionales (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Contenido educativo. No sustituye orientación de un profesional de la salud.'}
${unifesp}
## Ficha del catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Volver a [Inspecciones de plantas](/biblioteca/inspecoes/#inspecoes-plantas).
`;
  }

  const unifesp = plant.relatedUnifesp
    ? `\n## Ligação UNIFESP\n\nEsta espécie está marcada como relacionada ao eixo de extensão UNIFESP do laboratório. Ver o [hub UNIFESP](/biblioteca/unifesp/) e a [inspeção do curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
    : '';

  return `## Escopo

Inspeção educacional de **${f.nomePopular}** (*${plant.nomeCientifico || '—'}*) a partir do catálogo de plantas medicinais do Inspetor BudGanja. Este relatório reúne a ficha pública com o método verificável do laboratório — **não** é protocolo clínico e **não substitui** orientação profissional de saúde.

> **Nota metodológica:** auditoria independente BudGanja com base na ficha em [${fichaUrl}](${fichaUrl}). Conteúdo apenas educacional.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **${f.nomePopular}** |
| Nome científico | *${plant.nomeCientifico || '—'}* |
| Família | ${plant.familia || '—'} |
| Slug no catálogo | \`${slug}\` |
| Data da inspeção | ${inspected} |

## Resumo

${f.summary || '—'}

## Partes usadas

${bulletList(f.partsUsed)}

## Usos tradicionais (catálogo)

${bulletList(f.traditionalUses)}

## Cuidados

${f.cautions || 'Conteúdo educacional. Não substitui orientação de profissional de saúde.'}
${unifesp}
## Ficha do catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Voltar às [inspeções de plantas](/biblioteca/inspecoes/#inspecoes-plantas).
`;
}

function buildPlantaInspecaoPost(plant, seriesOrder) {
  if (!plant || !plant.slug) {
    throw new Error('planta sem slug');
  }
  const order = seriesOrder == null ? 1 : Number(seriesOrder);
  const pt = localizedPlantFields(plant, 'pt-BR');
  const en = localizedPlantFields(plant, 'en');
  const es = localizedPlantFields(plant, 'es');
  const fichaUrl = '/plantas/' + plant.slug + '/';

  return {
    title: 'Inspeção: Planta — ' + pt.nomePopular,
    titleEn: 'Inspection: Plant — ' + en.nomePopular,
    titleEs: 'Inspección: Planta — ' + es.nomePopular,
    excerpt:
      'Relatório educacional de ' +
      pt.nomePopular +
      ' (*' +
      (plant.nomeCientifico || '—') +
      '): ficha, usos tradicionais, cuidados e ligação ao catálogo BudGanja.',
    excerptEn:
      'Educational report on ' +
      en.nomePopular +
      ' (*' +
      (plant.nomeCientifico || '—') +
      '): profile, traditional uses, cautions and BudGanja catalog link.',
    excerptEs:
      'Informe educativo sobre ' +
      es.nomePopular +
      ' (*' +
      (plant.nomeCientifico || '—') +
      '): ficha, usos tradicionales, cuidados y vínculo al catálogo BudGanja.',
    slug: 'inspecao-planta-' + plant.slug,
    date: '2026-07-31T14:00:00.000Z',
    coverImage: coverForPlant(plant),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'plantas-medicinais',
    seriesOrder: order,
    seriesLabel: pt.nomePopular,
    sourceUrl: fichaUrl,
    content_raw: buildBody(plant, 'pt-BR'),
    contentEn: buildBody(plant, 'en'),
    contentEs: buildBody(plant, 'es')
  };
}

function buildAllPlantasInspecoesPosts() {
  const plants = loadPlantasCatalog();
  return plants.map((plant, index) => buildPlantaInspecaoPost(plant, index + 1));
}

module.exports = {
  loadPlantasCatalog,
  buildPlantaInspecaoPost,
  buildAllPlantasInspecoesPosts,
  PLANTAS_INSPECOES_POSTS: buildAllPlantasInspecoesPosts()
};
