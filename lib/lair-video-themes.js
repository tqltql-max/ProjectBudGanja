'use strict';

/**
 * Categorização temática do acervo YouTube Dr. Lair Ribeiro Oficial.
 * Cada vídeo cai numa única categoria (primeira regra que casa),
 * para o total somar o catálogo completo.
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'drlairribeirooficiall.json');
const SUGAR_HITS_FILE = path.join(ROOT, 'content', 'channels', 'lair-sugar-hits.json');
const THEMES_OUT = path.join(ROOT, 'content', 'channels', 'lair-video-themes.json');

/** Vídeos âncora fora da aba /videos (lives / busca). */
const EXTRA_VIDEOS = [
  {
    id: 'S61hC_9hmf8',
    title: 'AO VIVO COM Dr. Lair Ribeiro | A força terapêutica da cannabis',
    url: 'https://www.youtube.com/watch?v=S61hC_9hmf8',
    source: 'anchor-extra'
  }
];

const THEME_RULES = [
  {
    id: 'cannabis',
    label: 'Cannabis e cannabinoides',
    labelEn: 'Cannabis and cannabinoids',
    labelEs: 'Cannabis y cannabinoides',
    re: /cannabis|canabi|canabin|maconha|thc|cbd|endocanab/i
  },
  {
    id: 'acucar',
    label: 'Açúcar, frutose e adoçantes',
    labelEn: 'Sugar, fructose and sweeteners',
    labelEs: 'Azúcar, fructosa y edulcorantes',
    re: /a[cç][uú]car|sugar|frutose|fructose|ado[cç]ante|sweetener|sacarose|glicose|glucose|xarope|mela[cç]o|refrigerante/i
  },
  {
    id: 'gluten-leite',
    label: 'Trigo, glúten e laticínios',
    labelEn: 'Wheat, gluten and dairy',
    labelEs: 'Trigo, gluten y lácteos',
    re: /trigo|gl[uú]ten|gluten|leite|l[aá]cteo|case[ií]na|dairy|milk|wheat|queijo|iogurte/i
  },
  {
    id: 'diabetes',
    label: 'Diabetes, obesidade e metabolismo',
    labelEn: 'Diabetes, obesity and metabolism',
    labelEs: 'Diabetes, obesidad y metabolismo',
    re: /diabet|obesidad|obesidade|insulina|insulin|metab[oó]lic|diabesidade|esteatose|gordura\s*visceral|glicem/i
  },
  {
    id: 'cerebro',
    label: 'Cérebro, memória e neurodegeneração',
    labelEn: 'Brain, memory and neurodegeneration',
    labelEs: 'Cerebro, memoria y neurodegeneración',
    re: /c[eé]rebro|brain|mem[oó]ria|memory|alzheimer|parkinson|dem[eê]ncia|neur[oô]|ansiedade|depress[aã]o|epifania|pasteur/i
  },
  {
    id: 'coracao',
    label: 'Coração e cardiologia',
    labelEn: 'Heart and cardiology',
    labelEs: 'Corazón y cardiología',
    re: /cora[cç][aã]o|heart|cardio|press[aã]o\s*arterial|colesterol|triglicer|infarto|\bavc\b/i
  },
  {
    id: 'inflamacao',
    label: 'Inflamação e dor',
    labelEn: 'Inflammation and pain',
    labelEs: 'Inflamación y dolor',
    re: /inflamm|inflama|dor\b|pain|artrite|artrose|analg[eé]|radicais?\s*livres|oxidativ/i
  },
  {
    id: 'hormonios',
    label: 'Hormônios e tireoide',
    labelEn: 'Hormones and thyroid',
    labelEs: 'Hormonas y tiroides',
    re: /horm[oô]n|tire[oó]ide|thyroid|testoster|estrog[eê]|menopausa|cortisol/i
  },
  {
    id: 'longevidade',
    label: 'Longevidade e envelhecimento',
    labelEn: 'Longevity and aging',
    labelEs: 'Longevidad y envejecimiento',
    re: /longevid|envelhec|aging|velhice|anti.?aging|sarcopenia|immortal|jovem\s*e\s*o\s*velho|ficar\s*velho/i
  },
  {
    id: 'agua',
    label: 'Água e hidratação',
    labelEn: 'Water and hydration',
    labelEs: 'Agua e hidratación',
    re: /[aá]gua|water|hidrata|physiological\s*power\s*of\s*water/i
  },
  {
    id: 'oleos',
    label: 'Óleos, gorduras e coco',
    labelEn: 'Oils, fats and coconut',
    labelEs: 'Aceites, grasas y coco',
    re: /[oó]leo|oil|coco|coconut|gordura|\bfat\b|ômega|omega.?3|azeite|abacate|avocado/i
  },
  {
    id: 'nutricao',
    label: 'Nutrição e alimentação',
    labelEn: 'Nutrition and food',
    labelEs: 'Nutrición y alimentación',
    re: /nutri[cç]|aliment|comida|jejum|fasting|caf[eé]|prote[ií]na|vitamina|mineral|magn[eé]sio|magnesium|dieta|low.?carb|keto|cetog|batata|sol\b|microondas|panelas|rem[eé]dio|medicamento|toxic|t[oó]xic|comida|comer|inha?le/i
  },
  {
    id: 'exercicio',
    label: 'Exercício e músculo',
    labelEn: 'Exercise and muscle',
    labelEs: 'Ejercicio y músculo',
    re: /exerc[ií]c|m[uú]sculo|muscle|treino|workout|caminhada|sedentar/i
  },
  {
    id: 'sono',
    label: 'Sono, stress e ritmo',
    labelEn: 'Sleep, stress and rhythm',
    labelEs: 'Sueño, estrés y ritmo',
    re: /\bsono\b|sleep|ins[oô]nia|stress|estresse|circadian/i
  },
  {
    id: 'imunidade',
    label: 'Imunidade e infecções',
    labelEn: 'Immunity and infections',
    labelEs: 'Inmunidad e infecciones',
    re: /imun|immun|anticorpo|antibod|v[ií]rus|bact[eé]ria|infec[cç]|covid|corona|vacina|oz[oô]nio|cloroquina|doen[cç]a|amalgam|cura|curando/i
  },
  {
    id: 'autoajuda',
    label: 'Autoajuda, PNL e sucesso',
    labelEn: 'Self-help, NLP and success',
    labelEs: 'Autoayuda, PNL y éxito',
    re: /pnl|autoajuda|sucesso|success|h[aá]bito|mente|mindset|programa[cç][aã]o\s*neurol|felicidade|motiva|cren[cç]a|paradigma|amor\s*pr[oó]prio|epifania|const[aâ]ncia|criticado|amigos\s*do\s*bem|diferen[cç]a/i
  },
  {
    id: 'lives',
    label: 'Lives, hangouts e entrevistas',
    labelEn: 'Lives, hangouts and interviews',
    labelEs: 'Lives, hangouts y entrevistas',
    re: /\blive\b|ao\s*vivo|hangout|entrevista|podcast|bate.?papo/i
  },
  {
    id: 'trailers',
    label: 'Trailers e séries numeradas',
    labelEn: 'Trailers and numbered series',
    labelEs: 'Trailers y series numeradas',
    re: /^\d+\s|trailer|parte\s*\d+|cap[ií]tulo/i
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

function loadSugarHitIds() {
  if (!fs.existsSync(SUGAR_HITS_FILE)) return new Set();
  const doc = JSON.parse(fs.readFileSync(SUGAR_HITS_FILE, 'utf8'));
  return new Set((doc.hits || []).map((h) => h.id).filter(Boolean));
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

function assignTheme(title, sugarIds, videoId) {
  if (sugarIds.has(videoId)) {
    const t = String(title || '');
    if (/diabet|obesidad|obesidade|insulina|insulin|metab/i.test(t)) return 'diabetes';
    return 'acucar';
  }
  for (const rule of THEME_RULES) {
    if (!rule.re) continue;
    if (rule.re.test(title || '')) return rule.id;
  }
  return 'outros';
}

function categorizeLairVideos(opts) {
  opts = opts || {};
  const catalog = opts.catalog || loadCatalog();
  const sugarIds = opts.sugarIds || loadSugarHitIds();
  const byId = new Map();

  (catalog.videos || []).forEach((v) => {
    if (!v || !v.id) return;
    byId.set(v.id, normalizeVideo(v));
  });
  EXTRA_VIDEOS.forEach((v) => {
    if (!byId.has(v.id)) byId.set(v.id, normalizeVideo(v));
  });

  const buckets = {};
  THEME_RULES.forEach((r) => {
    buckets[r.id] = [];
  });

  const videos = Array.from(byId.values()).sort((a, b) =>
    String(a.title).localeCompare(String(b.title), 'pt-BR')
  );

  videos.forEach((v) => {
    const themeId = assignTheme(v.title, sugarIds, v.id);
    buckets[themeId].push(Object.assign({}, v, { themeId }));
  });

  const themes = THEME_RULES.map((r) => ({
    id: r.id,
    label: r.label,
    labelEn: r.labelEn,
    labelEs: r.labelEs,
    count: buckets[r.id].length,
    videos: buckets[r.id]
  })).filter((t) => t.count > 0 || t.id === 'cannabis');

  return {
    channelId: catalog.channelId || 'UCk9mgpQVdJ5oKQWkM1UPBaQ',
    handle: catalog.handle || '@DrLairRibeiroOficiall',
    catalogVideoCount: catalog.videoCount != null ? catalog.videoCount : (catalog.videos || []).length,
    categorizedCount: videos.length,
    extraAnchors: EXTRA_VIDEOS.map((v) => v.id),
    method:
      'Classificação exclusiva por palavras-chave no título (+ hits de lair-sugar-hits.json forçam eixo açúcar/diabetes). Âncoras fora da aba /videos entram como extra.',
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
    extraAnchors: doc.extraAnchors,
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
  const rows = themes
    .map((t) => '| ' + t.label + ' | **' + t.count + '** |')
    .join('\n');
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
            ' em [`lair-video-themes.json`](/content/channels/lair-video-themes.json)._'
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

function buildLairCatalogMarkdown(opts) {
  opts = opts || {};
  const doc = opts.doc || categorizeLairVideos();
  const themesPath = '/content/channels/lair-video-themes.json';
  const catalogPath = '/content/channels/drlairribeirooficiall.json';
  const sugarPath = '/content/channels/lair-sugar-hits.json';
  // Lista completa no post — o utilizador pediu categorizar todos.
  const sections = buildThemeSectionsMd(doc.themes, Infinity);

  return `## Catálogo temático do canal (${doc.categorizedCount} vídeos)

Classificação **exclusiva** por palavras-chave no título (e hits de [\`lair-sugar-hits.json\`](${sugarPath})). Cada vídeo aparece numa só categoria — o total deve cobrir o acervo. JSON auditável: [\`lair-video-themes.json\`](${themesPath}) · catálogo bruto: [\`drlairribeirooficiall.json\`](${catalogPath}).

> **Nota:** indexar ≠ endossar. A categorização organiza o acervo para pesquisa editorial; **não** valida claims clínicos. Âncoras fora da aba /videos (ex.: live cannabis \`${(doc.extraAnchors || []).join('`, `')}\`) entram como extra.

### Resumo por tema

${buildThemeSummaryTable(doc.themes)}

${sections}
`;
}

function buildLairCatalogSummaryI18n(lang, doc) {
  const themes = doc.themes || [];
  const total = themes.reduce((n, t) => n + t.count, 0);
  const labelKey = lang === 'es' ? 'labelEs' : lang === 'en' ? 'labelEn' : 'label';
  const rows = themes
    .map((t) => '| ' + (t[labelKey] || t.label) + ' | **' + t.count + '** |')
    .join('\n');
  if (lang === 'en') {
    return `## Thematic catalog (${total} videos)

Exclusive title-keyword classification of the full channel archive. Audit JSON: [\`lair-video-themes.json\`](/content/channels/lair-video-themes.json). Full per-theme lists are in the Portuguese sheet and JSON (indexing ≠ endorsement).

| Theme | Videos |
|-------|--------|
${rows}
| **Total** | **${total}** |
`;
  }
  return `## Catálogo temático (${total} vídeos)

Clasificación exclusiva por palabras clave en el título. JSON: [\`lair-video-themes.json\`](/content/channels/lair-video-themes.json). Listas completas en la ficha PT y en el JSON (indexar ≠ respaldar).

| Tema | Vídeos |
|------|--------|
${rows}
| **Total** | **${total}** |
`;
}

module.exports = {
  THEME_RULES,
  EXTRA_VIDEOS,
  CATALOG_FILE,
  THEMES_OUT,
  categorizeLairVideos,
  writeThemesJson,
  buildLairCatalogMarkdown,
  buildLairCatalogSummaryI18n,
  loadCatalog
};
