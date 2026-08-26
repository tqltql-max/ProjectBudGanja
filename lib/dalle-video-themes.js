'use strict';

/**
 * Categorização temática do acervo YouTube Dr. Samuel Dalle Laste.
 * Cada vídeo cai numa única categoria (primeira regra que casa).
 * Séries numeradas (DICA, VERÃO, PERGUNTE, Olá Pessoal) agrupam os «iguais demais».
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const CATALOG_FILE = path.join(ROOT, 'content', 'channels', 'drsamueldallelaste.json');
const THEMES_OUT = path.join(ROOT, 'content', 'channels', 'dalle-video-themes.json');

const THEME_RULES = [
  {
    id: 'cannabis-plantas',
    label: 'Cannabis, PANC e plantas',
    labelEn: 'Cannabis, wild greens and plants',
    labelEs: 'Cannabis, PANC y plantas',
    re: /cannabis|canabi|maconha|\bthc\b|\bcbd\b|endocanab|pancs?\b|ora.?pro.?n[oó]bis|fitoter[aá]p|fitoqu[ií]m|plantas?\s+(naturais|milenar|aliment|podem)|o que as plantas|sucupira|c[uú]rcuma|pr[oó]polis|boswellia|spirulina|chlorella/i
  },
  {
    id: 'dicas',
    label: 'DICA # e VERÃO # (série curta)',
    labelEn: 'TIP # and SUMMER # (short series)',
    labelEs: 'TIP # y VERANO # (serie corta)',
    re: /\[\s*dica\s*#\d+|dica\s*#\d+|ver[aã]o\s*#\d+/i
  },
  {
    id: 'pergunte',
    label: 'Pergunte ao Dr. Samuel',
    labelEn: 'Ask Dr. Samuel',
    labelEs: 'Pregunte al Dr. Samuel',
    re: /pergunte ao dr\.?\s*samuel/i
  },
  {
    id: 'podcasts',
    label: 'Olá Pessoal e podcasts',
    labelEn: 'Olá Pessoal and podcasts',
    labelEs: 'Olá Pessoal y podcasts',
    re: /ol[aá],?\s*pessoal|\bpodcast\b/i
  },
  {
    id: 'jejum-ceto',
    label: 'Jejum e cetogênica',
    labelEn: 'Fasting and ketogenic diet',
    labelEs: 'Ayuno y cetogénica',
    re: /jejum|intermitente|cetog[eê]nic|low.?carb|lowcarb|cetose|\bceto\b|\bomad\b/i
  },
  {
    id: 'intestino',
    label: 'Intestino, SIBO e digestão',
    labelEn: 'Gut, SIBO and digestion',
    labelEs: 'Intestino, SIBO y digestión',
    re: /intestino|sibo|disbiose|microbiota|microbiom|leaky\s*gut|permeabil|constipa[cç]|pris[aã]o de ventre|diarr[eé]ia|diverticul|p[oó]lipos?|fodmap|incha[cç]o|gases\b|kombucha|probi[oó]tic|prebi[oó]tic|p[oó]s.?bi[oó]tic|refluxo|h[eé]rnia|digestiv|disabsort|gastrite|h\.?\s*pylori|apendicit|coc[oô]|fezes|est[oô]mago|ves[ií]cula|parasita|cisticercose/i
  },
  {
    id: 'hormonios-eixos',
    label: 'Hormônios, tireoide e eixos',
    labelEn: 'Hormones, thyroid and axes',
    labelEs: 'Hormonas, tiroides y ejes',
    re: /horm[oô]nio|tire[oó]ide|testoster|estrog[eê]n|progester|menopausa|andropausa|cortisol|\bpcos\b|\bsop\b|hashimoto|hipotire|hipertire|tdpm|implantes? hormon|contraceptivo hormon|predomin[aâ]ncia estrog|\bdhea\b|\bshbg\b|insufici[eê]ncia adrenal|disruptor|end[oó]crin|\biodo\b|endometriose/i
  },
  {
    id: 'saude-sexual',
    label: 'Saúde sexual, próstata e fertilidade',
    labelEn: 'Sexual health, prostate and fertility',
    labelEs: 'Salud sexual, próstata y fertilidad',
    re: /p[eê]nis|ere[cç][aã]o|ejacula[cç]|masturba[cç]|peyronie|libido|impot[eê]ncia|pr[oó]stata|fertilidade|engravidar|menstrual|\btpm\b|orgasmo|contraceptivo|corrimento|gravidez|gesta[cç]|epigen[eé]tica gestacional|tadalafila/i
  },
  {
    id: 'sono-descanso',
    label: 'Sono e descanso',
    labelEn: 'Sleep and rest',
    labelEs: 'Sueño y descanso',
    re: /sono\b|ins[oô]nia|dormir|melatonina|apneia|soneca|despertador|burnout/i
  },
  {
    id: 'vitaminas-minerais',
    label: 'Vitaminas, minerais e suplementos',
    labelEn: 'Vitamins, minerals and supplements',
    labelEs: 'Vitaminas, minerales y suplementos',
    re: /vitamina|magn[eé]sio|zinco|ferro\b|[oô]mega|omega.?3|suplemento|ortomolecular|coenzima|\bq10\b|\bb12\b|folato|sel[eê]nio|\bpqq\b|pirrolo|berberina|creatina|whey|col[aá]geno|glutamina|\bbcaa\b|\bnac\b|resveratrol|\btcm\b|\bmct\b|beta.?alanina|levedo|polifen[oó]is|antioxidante|multivitam|ferritina|escorbuto/i
  },
  {
    id: 'exames',
    label: 'Exames e leitura de laudos',
    labelEn: 'Labs and reading results',
    labelEs: 'Análisis y lectura de informes',
    re: /exame|hemograma|leucograma|ecografia|ultrasson|gl[oó]bulos|laborator|valores de refer[eê]ncia|ureia|hemat[uú]ria|doação de sangue/i
  },
  {
    id: 'farmacos',
    label: 'Fármacos (Ozempic, estatinas, etc.)',
    labelEn: 'Drugs (Ozempic, statins, etc.)',
    labelEs: 'Fármacos (Ozempic, estatinas, etc.)',
    re: /ozempic|mounjaro|semaglut|liraglut|estatina|captopril|corticoide|paracetamol|deca.?durabolin|oxandrolona|\btpc\b|terapia p[oó]s.?ciclo/i
  },
  {
    id: 'coracao-vasos',
    label: 'Coração, pressão e vasos',
    labelEn: 'Heart, blood pressure and vessels',
    labelEs: 'Corazón, presión y vasos',
    re: /cora[cç][aã]o|infarto|colesterol|press[aã]o|hipertens|cardio|\bavc\b|derrame|ateroscler|triglicer|varizes|insulina.*ganley/i
  },
  {
    id: 'diabetes-peso',
    label: 'Diabetes, peso e fígado',
    labelEn: 'Diabetes, weight and liver',
    labelEs: 'Diabetes, peso e hígado',
    re: /diabet|glicose|glicemia|obes[oa]|emagrec|perder peso|gordura (no |abdominal|visceral)|esteatose|f[ií]gado|metabolismo|barriga|lipedema|s[ií]ndrome metab[oó]lica|bari[aá]tric|imc\b|composi[cç][aã]o corporal|efeito plat[oô]|epoc\b|acantose/i
  },
  {
    id: 'cerebro-humor',
    label: 'Cérebro, humor e dor',
    labelEn: 'Brain, mood and pain',
    labelEs: 'Cerebro, ánimo y dolor',
    re: /c[eé]rebro|alzheimer|dem[eê]ncia|parkinson|ansiedade|depress[aã]o|humor|mem[oó]ria|leaky\s*brain|tdah|autismo|dopamina|neuropatia|enxaqueca|cefal|fibromialgia|serotonina|sa[uú]de mental|poda neural|estresse\b|impulsos/i
  },
  {
    id: 'inflamacao-imune',
    label: 'Inflamação, imunidade e infecção',
    labelEn: 'Inflammation, immunity and infection',
    labelEs: 'Inflamación, inmunidad e infección',
    re: /inflama[cç]|autoimune|artrite|corpo inflamado|estresse oxidativo|imunid|gripe|resfriado|amigdal|garganta|pigarro|febre|infec[cç][aã]o|cranberry|v[ií]rus|bact[eé]ria|vacina|\bhiv\b|\baids\b|\bpep\b|leptospirose|c[aâ]ncer|tumor|oncolog|asma|bronquite|alergia|al[eé]rgic|rinite|mofo|aftas|gota\b|[aá]cido [uú]rico/i
  },
  {
    id: 'alcool-tabaco',
    label: 'Álcool, tabaco e vape',
    labelEn: 'Alcohol, tobacco and vape',
    labelEs: 'Alcohol, tabaco y vape',
    re: /[aá]lcool|parar de beber|bebe?r? socialmente|fumante|\bvape\b|cigarro|embutidos e fumantes/i
  },
  {
    id: 'pele',
    label: 'Pele, cabelo e estética',
    labelEn: 'Skin, hair and aesthetics',
    labelEs: 'Piel, cabello y estética',
    re: /pele|acne|ruga|cabelo|unha|psor[ií]ase|celulite|saburra/i
  },
  {
    id: 'longevidade',
    label: 'Longevidade e hormese',
    labelEn: 'Longevity and hormesis',
    labelEs: 'Longevidad y hormesis',
    re: /longevidade|envelhec|rejuvenesc|anti.?aging|hormese|tel[oô]mero|idade biol|viver 100|ikigai|wim hof/i
  },
  {
    id: 'exercicio-performance',
    label: 'Exercício e performance',
    labelEn: 'Exercise and performance',
    labelEs: 'Ejercicio y rendimiento',
    re: /exerc[ií]cio|treino|m[uú]sculo|sedentar|caminh|muscula[cç]|hipertrofia|performance|cristiano ronaldo|calistenia|academia|overtraining|atividade f[ií]sica|c[aâ]imbra|massa muscular|exercinas/i
  },
  {
    id: 'nutricao-alimentos',
    label: 'Nutrição e alimentos',
    labelEn: 'Nutrition and foods',
    labelEs: 'Nutrición y alimentos',
    re: /aliment|dieta|nutri[cç]|a[cç][uú]car|gl[uú]ten|leite|case[ií]na|frutose|azeite|ovo\b|carne|prote[ií]na|carboidrato|castanha|gr[aã]os|antinutri|vegetais|comer menos|produtos prote|tomate|a[cç]a[ií]|ma[cç][aã]|lim[aã]o|caf[eé]|cafe[ií]na|chocolate|[oó]leo de coco|refrigerante|aspartame|glutamato|acrilamida|gordura saturada|manteiga|ghee|mel\b|beterraba|vinagre|energ[eé]ticos?|org[aâ]nicos|panela|solanina|gordura marrom/i
  },
  {
    id: 'medicina-integrativa',
    label: 'Medicina integrativa e crítica ao sistema',
    labelEn: 'Integrative medicine and system critique',
    labelEs: 'Medicina integrativa y crítica al sistema',
    re: /medicina (alternativa|integrativa|funcional|preventiva|alop[aá]tica)|al[eé]m dos rem[eé]dios|protocolo coimbra|doen[cç]as n[aã]o existem|consulta com o dr\.?\s*samuel|consulta no sus/i
  },
  {
    id: 'habitos',
    label: 'Hábitos, convites e mudança',
    labelEn: 'Habits, invitations and change',
    labelEs: 'Hábitos, invitaciones y cambio',
    re: /mudan[cç]a de h[aá]bito|convite|resgatar? (da |sua )?sa[uú]de|h[aá]bitos de sa[uú]de|tr[eê]s h[aá]bitos|4 pilares|me ajude a te ajudar/i
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

function categorizeDalleVideos(opts) {
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
    String(a.title).localeCompare(String(b.title), 'pt')
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
  })).filter((t) => t.count > 0 || t.id === 'cannabis-plantas');

  return {
    channelId: catalog.channelId || 'UCQ-mdo78ry4nzEZ2HdafajQ',
    handle: catalog.handle || '@DrSamuelDalleLaste',
    catalogVideoCount:
      catalog.videoCount != null ? catalog.videoCount : (catalog.videos || []).length,
    categorizedCount: videos.length,
    method:
      'Classificação exclusiva por palavras-chave no título do canal Dr. Samuel Dalle Laste (@DrSamuelDalleLaste). Séries numeradas (DICA, VERÃO, PERGUNTE, Olá Pessoal) agrupam os vídeos iguais demais.',
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
            ' em [`dalle-video-themes.json`](/content/channels/dalle-video-themes.json)._'
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

function buildDalleCatalogMarkdown(opts) {
  opts = opts || {};
  const doc = opts.doc || categorizeDalleVideos();
  const themesPath = '/content/channels/dalle-video-themes.json';
  const catalogPath = '/content/channels/drsamueldallelaste.json';
  const sections = buildThemeSectionsMd(doc.themes, Infinity);

  return `## Catálogo temático do canal (${doc.categorizedCount} vídeos)

Classificação **exclusiva** por palavras-chave no título do canal [Dr. Samuel Dalle Laste](https://www.youtube.com/@DrSamuelDalleLaste). Cada vídeo aparece numa só categoria. As séries numeradas (**DICA #**, **VERÃO #**, **Pergunte ao Dr. Samuel**, **Olá Pessoal**) agrupam os vídeos iguais demais. JSON auditável: [\`dalle-video-themes.json\`](${themesPath}) · catálogo bruto: [\`drsamueldallelaste.json\`](${catalogPath}).

> **Nota:** indexar ≠ endossar. A categorização organiza o acervo para pesquisa editorial; **não** valida claims clínicos nem medicina integrativa. O acervo entra na aba [/videos/?channel=dallelaste](/videos/?channel=dallelaste).

### Resumo por tema

${buildThemeSummaryTable(doc.themes)}

${sections}
`;
}

function buildDalleCatalogSummaryI18n(lang, doc) {
  const themes = doc.themes || [];
  const total = themes.reduce((n, t) => n + t.count, 0);
  const labelKey = lang === 'es' ? 'labelEs' : lang === 'en' ? 'labelEn' : 'label';
  const rows = themes
    .map((t) => '| ' + (t[labelKey] || t.label) + ' | **' + t.count + '** |')
    .join('\n');
  if (lang === 'en') {
    return `## Thematic catalog (${total} videos)

Exclusive title-keyword classification of the full [@DrSamuelDalleLaste](https://www.youtube.com/@DrSamuelDalleLaste) archive. Numbered series (TIP #, SUMMER #, Ask Dr. Samuel, Olá Pessoal) group the look-alike videos. Audit JSON: [\`dalle-video-themes.json\`](/content/channels/dalle-video-themes.json). Full per-theme lists are in the Portuguese sheet and JSON (indexing ≠ endorsement). Filter: [/videos/?channel=dallelaste](/videos/?channel=dallelaste).

| Theme | Videos |
|-------|--------|
${rows}
| **Total** | **${total}** |
`;
  }
  return `## Catálogo temático (${total} vídeos)

Clasificación exclusiva por palabras clave en el título de [@DrSamuelDalleLaste](https://www.youtube.com/@DrSamuelDalleLaste). Las series numeradas (TIP #, VERANO #, Pregunte al Dr. Samuel, Olá Pessoal) agrupan los vídeos demasiado iguales. JSON: [\`dalle-video-themes.json\`](/content/channels/dalle-video-themes.json). Listas completas en la ficha PT y en el JSON (indexar ≠ respaldar). Filtro: [/videos/?channel=dallelaste](/videos/?channel=dallelaste).

| Tema | Vídeos |
|------|--------|
${rows}
| **Total** | **${total}** |
`;
}

/** Destaque no hub /videos/?channel=dallelaste — um parágrafo, modelo caderno. */
const FEATURED_VIDEO_ID = '0xo5Maa-x7E';
const FEATURED_VIDEO_TITLE = 'O que realmente PREVINE INFARTO (comece hoje!)';

const VIDEO_SUMMARIES = {
  '0xo5Maa-x7E': {
    summary:
      'Samuel lê o infarto como falha da tese LDL/estatina: cita o Get With The Guidelines de 2009 (136.905 internamentos com lípidos nas 24 h — LDL médio 105, 17,6% abaixo de 70, 21,1% já em hipolipemiante, 54,6% com HDL <40, triglicéridos médios 161; no vídeo chama a revista de «Java», os números batem com Sachdeva et al., Am Heart J 2009) e diz que o que realmente previne não é baixar o LDL à força (NNT ~150 no discurso) e sim HDL, triglicérido, farinha, aeróbico e glicação; o caderno guarda o ofício da aula — indexar ≠ endossar, o laboratório não manda parar estatina.',
    summaryEn:
      'Samuel reads heart attack as a failure of the LDL/statin thesis: he cites the 2009 Get With The Guidelines numbers (136,905 admissions with lipids in 24 h — mean LDL 105, 17.6% under 70, 21.1% already on lipid-lowering, 54.6% HDL <40, mean triglycerides 161; on video he says «Java», the figures match Sachdeva et al., Am Heart J 2009) and argues that what really prevents infarction is not forcing LDL down (NNT ~150 in the talk) but HDL, triglycerides, flour, aerobic work and glycation; the notebook keeps the lesson’s craft — indexing ≠ endorsement, the lab does not tell anyone to stop a statin.',
    summaryEs:
      'Samuel lee el infarto como fallo de la tesis LDL/estatina: cita las cifras Get With The Guidelines de 2009 (136.905 ingresos con lípidos en 24 h — LDL medio 105, 17,6% por debajo de 70, 21,1% ya en hipolipemiante, 54,6% con HDL <40, triglicéridos medios 161; en el vídeo dice «Java», los números coinciden con Sachdeva et al., Am Heart J 2009) y afirma que lo que realmente previene no es bajar el LDL a la fuerza (NNT ~150 en el discurso) sino HDL, triglicérido, harina, aeróbico y glicación; el cuaderno guarda el oficio de la clase — indexar ≠ respaldar, el laboratorio no manda parar la estatina.'
  }
};

module.exports = {
  THEME_RULES,
  CATALOG_FILE,
  THEMES_OUT,
  FEATURED_VIDEO_ID,
  FEATURED_VIDEO_TITLE,
  VIDEO_SUMMARIES,
  categorizeDalleVideos,
  writeThemesJson,
  buildDalleCatalogMarkdown,
  buildDalleCatalogSummaryI18n,
  loadCatalog
};
