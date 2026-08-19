'use strict';

/**
 * Inspeções educacionais das espécies do catálogo /plantas/.
 * Série: plantas-medicinais → tipagem hub 'planta'.
 * Com hubCategory: "fruto" → série plantas-frutos → tipagem hub 'fruto'.
 */

function isFrutoPlant(plant) {
  return plant && String(plant.hubCategory || '').toLowerCase() === 'fruto';
}

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { localizedPlantFields } = require('./plantas-i18n.js');
const { renderPlantNotes, getPlantNoteMeta } = require('./plantas-notas-inspecao.js');

function loadPlantasCatalog() {
  const file = path.join(ROOT, 'content', 'plantas.json');
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data.plants) ? data.plants : [];
  } catch (e) {
    return [];
  }
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

function relatedScienceMarkdown(plant, loc) {
  if (plant.slug !== 'cannabis-sativa') return '';
  const jama =
    '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const fito = '/posts/post-pesquisa-fitocanabinoides.html';
  if (loc === 'en') {
    return `

## Related lab inspection

Phytocannabinoid catalogue (CBGA mother node, acids/neutrals, THC/CBD/CBG/CBC/CBN, varin series): [Research: Phytocannabinoids](${fito}). For adolescent use and cortical neurodevelopment, see the BudGanja editorial audit of Albaugh et al. (JAMA Psychiatry, 2021): [Adolescent cannabis and neurodevelopment](${jama}).
`;
  }
  if (loc === 'es') {
    return `

## Inspección relacionada

Catálogo de fitocannabinoides (nodo madre CBGA, ácidos/neutros, THC/CBD/CBG/CBC/CBN, serie varin): [Investigación: Fitocannabinoides](${fito}). Sobre uso en adolescentes y neurodesarrollo cortical, ver la auditoría editorial BudGanja de Albaugh et al. (JAMA Psychiatry, 2021): [Cannabis en la adolescencia y neurodesarrollo](${jama}).
`;
  }
  return `

## Inspeção relacionada no laboratório

Catálogo de fitocanabinoides (nó-mãe CBGA, ácidos/neutros, THC/CBD/CBG/CBC/CBN, série varin): [Pesquisa: Fitocanabinoides](${fito}). Sobre uso na adolescência e neurodesenvolvimento cortical, ver a auditoria editorial BudGanja de Albaugh et al. (JAMA Psychiatry, 2021): [Cannabis na adolescência e neurodesenvolvimento](${jama}).
`;
}

/** Notas educacionais (química, usos, etimo) a partir de lib/plantas-notas-inspecao.js */
function plantHealthNotesMarkdown(plant, loc) {
  return renderPlantNotes(plant && plant.slug, loc);
}

function buildBody(plant, loc) {
  const f = localizedPlantFields(plant, loc);
  const slug = plant.slug;
  const fichaUrl = '/plantas/' + slug + '/';
  const inspected = '2026-07-31';
  const fruto = isFrutoPlant(plant);
  const hubHref = fruto
    ? '/biblioteca/inspecoes/#inspecoes-frutos'
    : '/biblioteca/inspecoes/#inspecoes-plantas';

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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
## Catalog sheet

Full plant page: [${f.nomePopular}](${fichaUrl})

## Hub

Return to [${fruto ? 'Fruit inspections' : 'Plant inspections'}](${hubHref}).
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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
## Ficha del catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Volver a [${fruto ? 'Inspecciones de frutos' : 'Inspecciones de plantas'}](${hubHref}).
`;
  }

  const unifesp = plant.relatedUnifesp
    ? `\n## Ligação UNIFESP\n\nEsta espécie está marcada como relacionada ao eixo de extensão UNIFESP do laboratório. Ver o [hub UNIFESP](/biblioteca/unifesp/) e a [inspeção do curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).\n`
    : '';

  return `## Escopo

Inspeção educacional ${fruto ? 'do **fruto**' : 'de'} **${f.nomePopular}** (*${plant.nomeCientifico || '—'}*) a partir do catálogo de plantas do Inspetor BudGanja. Este relatório reúne a ficha pública com o método verificável do laboratório — **não** é protocolo clínico e **não substitui** orientação profissional de saúde.

> **Nota metodológica:** auditoria independente BudGanja com base na ficha em [${fichaUrl}](${fichaUrl}). Conteúdo apenas educacional.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **${f.nomePopular}** |
| Nome científico | *${plant.nomeCientifico || '—'}* |
| Família | ${plant.familia || '—'} |
| Categoria no hub | ${fruto ? 'Frutos' : 'Plantas medicinais'} |
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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
## Ficha do catálogo

Página completa: [${f.nomePopular}](${fichaUrl})

## Hub

Voltar às [${fruto ? 'inspeções de frutos' : 'inspeções de plantas'}](${hubHref}).
`;
}

function buildPlantaInspecaoPost(plant, seriesOrder) {
  if (!plant || !plant.slug) {
    throw new Error('planta sem slug');
  }
  const order = seriesOrder == null ? 1 : Number(seriesOrder);
  const fruto = isFrutoPlant(plant);
  const pt = localizedPlantFields(plant, 'pt-BR');
  const en = localizedPlantFields(plant, 'en');
  const es = localizedPlantFields(plant, 'es');
  const fichaUrl = '/plantas/' + plant.slug + '/';
  const metaPt = getPlantNoteMeta(plant.slug, 'pt-BR');
  const metaEn = getPlantNoteMeta(plant.slug, 'en');
  const metaEs = getPlantNoteMeta(plant.slug, 'es');
  const sci = plant.nomeCientifico || '—';
  const kindPt = fruto ? 'Fruto' : 'Planta';
  const kindEn = fruto ? 'Fruit' : 'Plant';
  const kindEs = fruto ? 'Fruto' : 'Planta';

  return {
    title: metaPt && metaPt.titleSuffix
      ? 'Inspeção: ' + kindPt + ' — ' + pt.nomePopular + ' — ' + metaPt.titleSuffix
      : 'Inspeção: ' + kindPt + ' — ' + pt.nomePopular,
    titleEn: metaEn && metaEn.titleSuffix
      ? 'Inspection: ' + kindEn + ' — ' + en.nomePopular + ' — ' + metaEn.titleSuffix
      : 'Inspection: ' + kindEn + ' — ' + en.nomePopular,
    titleEs: metaEs && metaEs.titleSuffix
      ? 'Inspección: ' + kindEs + ' — ' + es.nomePopular + ' — ' + metaEs.titleSuffix
      : 'Inspección: ' + kindEs + ' — ' + es.nomePopular,
    excerpt:
      (metaPt && metaPt.excerpt) ||
      'Relatório educacional de ' +
        pt.nomePopular +
        ' (*' +
        sci +
        '): ficha, usos tradicionais, cuidados e ligação ao catálogo BudGanja.',
    excerptEn:
      (metaEn && metaEn.excerpt) ||
      'Educational report on ' +
        en.nomePopular +
        ' (*' +
        sci +
        '): profile, traditional uses, cautions and BudGanja catalog link.',
    excerptEs:
      (metaEs && metaEs.excerpt) ||
      'Informe educativo sobre ' +
        es.nomePopular +
        ' (*' +
        sci +
        '): ficha, usos tradicionales, cuidados y vínculo al catálogo BudGanja.',
    slug: 'inspecao-planta-' + plant.slug,
    date: '2026-07-31T14:00:00.000Z',
    coverImage: coverForPlant(plant),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: fruto ? 'plantas-frutos' : 'plantas-medicinais',
    seriesOrder: order,
    seriesLabel: fruto ? pt.nomePopular + ' · fruto' : pt.nomePopular,
    sourceUrl: fichaUrl,
    content_raw: buildBody(plant, 'pt-BR'),
    contentEn: buildBody(plant, 'en'),
    contentEs: buildBody(plant, 'es')
  };
}

function buildAllPlantasInspecoesPosts() {
  const plants = loadPlantasCatalog();
  let frutoOrder = 0;
  let plantaOrder = 0;
  return plants.map((plant) => {
    const order = isFrutoPlant(plant) ? ++frutoOrder : ++plantaOrder;
    return buildPlantaInspecaoPost(plant, order);
  });
}

module.exports = {
  loadPlantasCatalog,
  buildPlantaInspecaoPost,
  buildAllPlantasInspecoesPosts,
  PLANTAS_INSPECOES_POSTS: buildAllPlantasInspecoesPosts()
};
