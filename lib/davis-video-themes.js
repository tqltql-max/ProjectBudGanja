'use strict';

/**
 * Categorização temática do acervo YouTube William Davis, MD.
 * Cada vídeo cai numa única categoria (primeira regra que casa).
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'williamdavismd.json');
const THEMES_OUT = path.join(ROOT, 'content', 'channels', 'davis-video-themes.json');

const THEME_RULES = [
  {
    id: 'trigo-gluten',
    label: 'Trigo, glúten e grãos',
    labelEn: 'Wheat, gluten and grains',
    labelEs: 'Trigo, gluten y granos',
    re: /wheat|gluten|gl[uú]ten|grain|trigo|amylopectin|wheat\s*belly|grain.?free|cheat\s*day|food\s*intoleranc|seeds?\s*of\s*grasses|corn(?:starch|meal|syrup)?\b|are\s*you\s*a\s*cow/i
  },
  {
    id: 'microbioma',
    label: 'Microbioma, intestino e SIBO',
    labelEn: 'Microbiome, gut and SIBO',
    labelEs: 'Microbioma, intestino y SIBO',
    re: /microbiome|microbioma|gut\b|sibo|reuteri|yogurt|yoghurt|endotoxem|bloating|ferment|kefir|super\s*gut|bacteriocin|intestinal|prebiotic|probiotic|histamine|oxalate|lectin|subtilis|h\.?\s*pylori|sauerkraut|constipation|bowel|skin\s*health|gut.?skin|boulardii|microbe/i
  },
  {
    id: 'coracao',
    label: 'Coração, colesterol e lipoproteínas',
    labelEn: 'Heart, cholesterol and lipoproteins',
    labelEs: 'Corazón, colesterol y lipoproteínas',
    re: /heart|cardio|cholesterol|lipoprotein|statin|calcium\s*score|ct\s*heart|aortic|blood\s*pressure|ldl|hdl|triglycer|coronary|vascular|microplastic|atrial|fibrillation|cardiac|sudden\s*cardiac/i
  },
  {
    id: 'diabetes-peso',
    label: 'Diabetes, peso e metabolismo',
    labelEn: 'Diabetes, weight and metabolism',
    labelEs: 'Diabetes, peso y metabolismo',
    re: /diabet|insulin|weight|obes|metabolic|skinny|lose\s*weight|blood\s*sugar|glycemi|visceral|cgm|glucose\s*monitor|ketotic|keto\b|fasting|mct\s*oil|fatty\s*liver|body\s*fat|hungrier/i
  },
  {
    id: 'tireoide-hormonios',
    label: 'Tireoide, iodo e hormônios',
    labelEn: 'Thyroid, iodine and hormones',
    labelEs: 'Tiroides, yodo y hormonas',
    re: /thyroid|tire[oó]ide|iodine|iodo|hormon|estrogen|testoster|levothyroxine|menopaus|cortisol|\bpcos\b|feel\s*cold/i
  },
  {
    id: 'cerebro',
    label: 'Cérebro, humor e eixo intestino-cérebro',
    labelEn: 'Brain, mood and gut-brain axis',
    labelEs: 'Cerebro, ánimo y eje intestino-cerebro',
    re: /brain|parkinson|alzheimer|dement|mood|anger|hatred|resentment|frustration|gut.?brain|social\s*isolation|anxiety|depress|sleep|insomni|nootropic|neurotrophic|vision|blue\s*light/i
  },
  {
    id: 'suplementos',
    label: 'Vitaminas, magnésio e suplementos',
    labelEn: 'Vitamins, magnesium and supplements',
    labelEs: 'Vitaminas, magnesio y suplementos',
    re: /vitamin|magnesium|magn[eé]sio|collagen|supplement|nutrient|omega|fish\s*oil|blood\s*tests?|lab\s*tests?|direct.?to.?consumer/i
  },
  {
    id: 'nutricao',
    label: 'Nutrição, alimentos e dieta',
    labelEn: 'Nutrition, foods and diet',
    labelEs: 'Nutrición, alimentos y dieta',
    re: /diet|avocado|bacon|fruit|vegetable|recipe|food\b|eating|sugar|oil\b|fat\b|protein|carb|meal|snack|salt|fiber|fibre|guardrails?\s*of\s*diet|dietary\s*blunder/i
  },
  {
    id: 'undoctored',
    label: 'Undoctored e crítica ao sistema de saúde',
    labelEn: 'Undoctored and healthcare critique',
    labelEs: 'Undoctored y crítica al sistema de salud',
    re: /undoctored|unpatient|health\s*coach|healthcare|seeing\s*a\s*doctor|doctors?\s*claim|health\s*care\s*has\s*failed|smarter\s*than\s*your\s*doctor|before\s*seeing\s*a\s*doctor|dentist|don'?t\s*count\s*on\s*your\s*doctor|biggest\s*threat/i
  },
  {
    id: 'programas',
    label: 'Livros, webinars e programas Infinite Health',
    labelEn: 'Books, webinars and Infinite Health programs',
    labelEs: 'Libros, webinars y programas Infinite Health',
    re: /webinar|cruise|super\s*body|infinite\s*health|program|blueprint|announcing|join\s*our|new\s*book|revised/i
  },
  {
    id: 'entrevistas',
    label: 'Entrevistas, lives e podcasts',
    labelEn: 'Interviews, lives and podcasts',
    labelEs: 'Entrevistas, lives y podcasts',
    re: /\binterview\b|\blive\b|podcast|q\s*&\s*a|hangout|conversation\s*with/i
  },
  {
    id: 'outros',
    label: 'Outros temas de divulgação',
    labelEn: 'Other outreach topics',
    labelEs: 'Otros temas de divulgación',
    re: null
  }
];

function escapeMdTitle(title) {
  return String(title || '').replace(/\[/g, '\\[').replace(/\|/g, '\\|');
}

function videoMd(v) {
  const title = escapeMdTitle(v.title || v.id);
  return '[' + title + '](https://www.youtube.com/watch?v=' + v.id + ')';
}

function loadCatalog() {
  if (!fs.existsSync(CATALOG_FILE)) {
    return { videos: [], videoCount: 0, channelId: '', handle: '', inspectedAt: '' };
  }
  return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
}

function normalizeVideo(v) {
  return {
    id: v.id,
    title: v.title || v.id,
    url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
    views: v.views || '',
    publishedRelative: v.publishedRelative || '',
    published: v.published || ''
  };
}

function assignTheme(title) {
  for (const rule of THEME_RULES) {
    if (!rule.re) continue;
    if (rule.re.test(title || '')) return rule.id;
  }
  return 'outros';
}

function categorizeDavisVideos(opts) {
  opts = opts || {};
  const catalog = opts.catalog || loadCatalog();
  const byId = new Map();

  (catalog.videos || []).forEach((v) => {
    if (!v || !v.id) return;
    byId.set(v.id, normalizeVideo(v));
  });

  const buckets = {};
  THEME_RULES.forEach((r) => {
    buckets[r.id] = [];
  });

  const videos = Array.from(byId.values()).sort((a, b) =>
    String(a.title).localeCompare(String(b.title), 'en')
  );

  videos.forEach((v) => {
    const themeId = assignTheme(v.title);
    buckets[themeId].push(Object.assign({}, v, { themeId }));
  });

  const themes = THEME_RULES.map((r) => ({
    id: r.id,
    label: r.label,
    labelEn: r.labelEn,
    labelEs: r.labelEs,
    count: buckets[r.id].length,
    videos: buckets[r.id]
  })).filter((t) => t.count > 0 || t.id === 'trigo-gluten');

  return {
    channelId: catalog.channelId || 'UCZp4ONYOXZkf92UxxNnAiKQ',
    handle: catalog.handle || '@williamdavismd',
    catalogVideoCount:
      catalog.videoCount != null ? catalog.videoCount : (catalog.videos || []).length,
    categorizedCount: videos.length,
    method:
      'Classificação exclusiva por palavras-chave no título do canal William Davis, MD (@williamdavismd).',
    categorizedAt: new Date().toISOString(),
    themes
  };
}

function writeThemesJson(doc) {
  const out = {
    channelId: doc.channelId,
    handle: doc.handle,
    catalogVideoCount: doc.catalogVideoCount,
    categorizedCount: doc.categorizedCount,
    method: doc.method,
    categorizedAt: doc.categorizedAt,
    summary: doc.themes.map((t) => ({ id: t.id, label: t.label, count: t.count })),
    themes: doc.themes.map((t) => ({
      id: t.id,
      label: t.label,
      labelEn: t.labelEn,
      labelEs: t.labelEs,
      count: t.count,
      videos: t.videos.map((v) => ({
        id: v.id,
        title: v.title,
        url: v.url,
        views: v.views || undefined
      }))
    }))
  };
  fs.writeFileSync(THEMES_OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
  return THEMES_OUT;
}

function buildThemeSummaryTable(themes) {
  const rows = themes.map((t) => '| ' + t.label + ' | **' + t.count + '** |').join('\n');
  return (
    '| Tema | Vídeos |\n|------|--------|\n' +
    rows +
    '\n| **Total categorizado** | **' +
    themes.reduce((n, t) => n + t.count, 0) +
    '** |'
  );
}

function buildThemeSectionsMd(themes, perThemeLimit) {
  const limit = perThemeLimit == null ? Infinity : perThemeLimit;
  return themes
    .map((t) => {
      const list = t.videos.slice(0, limit);
      const rows = list
        .map((v, i) => {
          const views = v.views || '—';
          return '| ' + (i + 1) + ' | ' + videoMd(v) + ' | ' + views + ' |';
        })
        .join('\n');
      const more =
        t.videos.length > list.length
          ? '\n\n_…mais ' +
            (t.videos.length - list.length) +
            ' em [`davis-video-themes.json`](/content/channels/davis-video-themes.json)._'
          : '';
      return (
        '### ' +
        t.label +
        ' (' +
        t.count +
        ')\n\n| # | Vídeo | Views |\n|---|-------|-------|\n' +
        (rows || '| — | — | — |') +
        more
      );
    })
    .join('\n\n');
}

function buildDavisCatalogMarkdown(opts) {
  opts = opts || {};
  const doc = opts.doc || categorizeDavisVideos();
  const themesPath = '/content/channels/davis-video-themes.json';
  const catalogPath = '/content/channels/williamdavismd.json';
  const sections = buildThemeSectionsMd(doc.themes, Infinity);

  return `## Catálogo temático do canal (${doc.categorizedCount} vídeos)

Classificação **exclusiva** por palavras-chave no título do canal [William Davis, MD](https://www.youtube.com/@williamdavismd). Cada vídeo aparece numa só categoria. JSON auditável: [\`davis-video-themes.json\`](${themesPath}) · catálogo bruto: [\`williamdavismd.json\`](${catalogPath}).

> **Nota:** indexar ≠ endossar. A categorização organiza o acervo para pesquisa editorial; **não** valida claims clínicos. O acervo entra na aba [/videos/?channel=davis](/videos/?channel=davis).

### Resumo por tema

${buildThemeSummaryTable(doc.themes)}

${sections}
`;
}

function buildDavisCatalogSummaryI18n(lang, doc) {
  const themes = doc.themes || [];
  const total = themes.reduce((n, t) => n + t.count, 0);
  const labelKey = lang === 'es' ? 'labelEs' : lang === 'en' ? 'labelEn' : 'label';
  const rows = themes
    .map((t) => '| ' + (t[labelKey] || t.label) + ' | **' + t.count + '** |')
    .join('\n');
  if (lang === 'en') {
    return `## Thematic catalog (${total} videos)

Exclusive title-keyword classification of the full [@williamdavismd](https://www.youtube.com/@williamdavismd) archive. Audit JSON: [\`davis-video-themes.json\`](/content/channels/davis-video-themes.json). Full per-theme lists are in the Portuguese sheet and JSON (indexing ≠ endorsement). Filter: [/videos/?channel=davis](/videos/?channel=davis).

| Theme | Videos |
|-------|--------|
${rows}
| **Total** | **${total}** |
`;
  }
  return `## Catálogo temático (${total} vídeos)

Clasificación exclusiva por palabras clave en el título de [@williamdavismd](https://www.youtube.com/@williamdavismd). JSON: [\`davis-video-themes.json\`](/content/channels/davis-video-themes.json). Listas completas en la ficha PT y en el JSON (indexar ≠ respaldar). Filtro: [/videos/?channel=davis](/videos/?channel=davis).

| Tema | Vídeos |
|------|--------|
${rows}
| **Total** | **${total}** |
`;
}

module.exports = {
  THEME_RULES,
  CATALOG_FILE,
  THEMES_OUT,
  categorizeDavisVideos,
  writeThemesJson,
  buildDavisCatalogMarkdown,
  buildDavisCatalogSummaryI18n,
  loadCatalog
};
