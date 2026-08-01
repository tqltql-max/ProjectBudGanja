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

function relatedScienceMarkdown(plant, loc) {
  if (plant.slug !== 'cannabis-sativa') return '';
  const jama =
    '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  if (loc === 'en') {
    return `

## Related lab inspection

For adolescent use and cortical neurodevelopment, see the BudGanja editorial audit of Albaugh et al. (JAMA Psychiatry, 2021): [Adolescent cannabis and neurodevelopment](${jama}).
`;
  }
  if (loc === 'es') {
    return `

## Inspección relacionada

Sobre uso en adolescentes y neurodesarrollo cortical, ver la auditoría editorial BudGanja de Albaugh et al. (JAMA Psychiatry, 2021): [Cannabis en la adolescencia y neurodesarrollo](${jama}).
`;
  }
  return `

## Inspeção relacionada no laboratório

Sobre uso na adolescência e neurodesenvolvimento cortical, ver a auditoria editorial BudGanja de Albaugh et al. (JAMA Psychiatry, 2021): [Cannabis na adolescência e neurodesenvolvimento](${jama}).
`;
}

/** Notas educacionais de saúde — só para espécies com recorte editorial explícito. */
function plantHealthNotesMarkdown(plant, loc) {
  if (plant.slug !== 'curcuma') return '';
  const gengibre = '/posts/post-inspecao-planta-gengibre.html';

  if (loc === 'en') {
    return `

## Names and identity (açafrão-da-terra)

In Brazil the rhizome is widely called **açafrão-da-terra** (and sometimes “Indian saffron”). It is **not** true saffron (*Crocus sativus*). Catalog name: **Turmeric** (*Curcuma longa*, Zingiberaceae) — same family as [ginger](${gengibre}).

## Health benefits (educational context)

BudGanja records **popular and culinary tradition**, not a clinical protocol. Themes often associated with turmeric / açafrão-da-terra:

| Theme | How the lab frames it |
|-------|------------------------|
| Culinary dye and spice | Everyday food use — safest baseline exposure |
| Digestive comfort | Traditional teas and meals after heavy food |
| Anti-inflammatory interest | Popular use + research interest in **curcumin** (rhizome marker) |
| Golden milk / teas | Cultural preparations; dose and bioavailability vary widely |
| Topical pastes (some traditions) | Local cultural practice — not a BudGanja product claim |

**Limits of evidence:** curcumin has been studied for anti-inflammatory and antioxidant pathways, but results depend on preparation, dose and absorption (often low without formulation aids). Food use ≠ high-dose supplements. This sheet **does not diagnose, treat or recommend** diseases or self-medication.

## Related plant in the catalog

Same family (Zingiberaceae): [Ginger](${gengibre}) — another rhizome with traditional digestive use.
`;
  }

  if (loc === 'es') {
    return `

## Nombres e identidad (açafrão-da-terra)

En Brasil el rizoma se llama con frecuencia **açafrão-da-terra** (y a veces «azafrán de la India»). **No** es el azafrán verdadero (*Crocus sativus*). Nombre de catálogo: **Cúrcuma** (*Curcuma longa*, Zingiberaceae) — misma familia que el [jengibre](${gengibre}).

## Beneficios para la salud (contexto educativo)

BudGanja registra la **tradición popular y culinaria**, no un protocolo clínico. Temas frecuentemente asociados a la cúrcuma / açafrão-da-terra:

| Tema | Cómo lo enmarca el laboratorio |
|------|--------------------------------|
| Condimento y colorante | Uso alimentario cotidiano — exposición de base más prudente |
| Confort digestivo | Infusiones y comidas tradicionales |
| Interés antiinflamatorio | Uso popular + interés científico en la **curcumina** |
| Leche dorada / infusiones | Preparaciones culturales; dosis y biodisponibilidad variables |
| Pastas tópicas (algunas tradiciones) | Práctica cultural — no es una afirmación de producto BudGanja |

**Límites de la evidencia:** la curcumina se ha estudiado en vías antiinflamatorias y antioxidantes, pero los resultados dependen de la preparación, la dosis y la absorción. Uso culinario ≠ suplementos concentrados. Esta ficha **no diagnostica, trata ni recomienda** enfermedades ni automedicación.

## Planta relacionada en el catálogo

Misma familia (Zingiberaceae): [Jengibre](${gengibre}).
`;
  }

  return `

## Nomes e identidade (açafrão-da-terra)

No Brasil o rizoma é conhecido sobretudo como **açafrão-da-terra** (e por vezes «açafrão-da-índia»). **Não** é o açafrão verdadeiro (*Crocus sativus*). Nome no catálogo: **Cúrcuma** (*Curcuma longa*, Zingiberaceae) — mesma família do [gengibre](${gengibre}).

## Benefícios à saúde (contexto educacional)

O BudGanja regista a **tradição popular e culinária**, não um protocolo clínico. Temas frequentemente associados à cúrcuma / açafrão-da-terra:

| Tema | Como o laboratório enquadra |
|------|-----------------------------|
| Tempero e corante culinário | Uso alimentar quotidiano — exposição de base mais prudente |
| Conforto digestivo | Chás e refeições tradicionais após comidas pesadas |
| Interesse anti-inflamatório | Uso popular + interesse científico na **curcumina** (marcador do rizoma) |
| Leite dourado / chás | Preparações culturais; dose e biodisponibilidade variam muito |
| Pastas tópicas (algumas tradições) | Prática cultural local — não é alegação de produto BudGanja |

**Limites da evidência:** a curcumina tem sido estudada em vias anti-inflamatórias e antioxidantes, mas os resultados dependem da preparação, da dose e da absorção (muitas vezes baixa sem adjuvantes de formulação). Uso alimentar ≠ suplementos concentrados. Esta ficha **não diagnostica, trata nem recomenda** doenças nem automedicação.

## Planta relacionada no catálogo

Mesma família (Zingiberaceae): [Gengibre](${gengibre}) — outro rizoma com uso digestivo tradicional.
`;
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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
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
${plantHealthNotesMarkdown(plant, loc)}${unifesp}${relatedScienceMarkdown(plant, loc)}
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
  const isCurcuma = plant.slug === 'curcuma';

  return {
    title: isCurcuma
      ? 'Inspeção: Planta — Cúrcuma (açafrão-da-terra) e benefícios à saúde'
      : 'Inspeção: Planta — ' + pt.nomePopular,
    titleEn: isCurcuma
      ? 'Inspection: Plant — Turmeric (açafrão-da-terra) and health benefits'
      : 'Inspection: Plant — ' + en.nomePopular,
    titleEs: isCurcuma
      ? 'Inspección: Planta — Cúrcuma (açafrão-da-terra) y beneficios para la salud'
      : 'Inspección: Planta — ' + es.nomePopular,
    excerpt: isCurcuma
      ? 'Açafrão-da-terra (*Curcuma longa*): ficha, usos tradicionais, benefícios à saúde em contexto educacional (curcumina, digestão, anti-inflamatório) e cuidados — sem protocolo clínico.'
      : 'Relatório educacional de ' +
        pt.nomePopular +
        ' (*' +
        (plant.nomeCientifico || '—') +
        '): ficha, usos tradicionais, cuidados e ligação ao catálogo BudGanja.',
    excerptEn: isCurcuma
      ? 'Açafrão-da-terra / turmeric (*Curcuma longa*): catalog sheet, traditional uses, educational health framing (curcumin, digestion, anti-inflammatory interest) and cautions — not a clinical protocol.'
      : 'Educational report on ' +
        en.nomePopular +
        ' (*' +
        (plant.nomeCientifico || '—') +
        '): profile, traditional uses, cautions and BudGanja catalog link.',
    excerptEs: isCurcuma
      ? 'Açafrão-da-terra / cúrcuma (*Curcuma longa*): ficha, usos tradicionales, beneficios para la salud en contexto educativo (curcumina, digestión, antiinflamatorio) y cuidados — sin protocolo clínico.'
      : 'Informe educativo sobre ' +
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
