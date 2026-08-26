'use strict';

/**
 * Temas do canal Instituto Conhecimento Liberta (@institutoconhecimentoliberta).
 * Só pelo título. Cursos (icl.com.br) ≠ canal (jornalismo YouTube).
 */

const CATEGORIES = [
  {
    id: 'noticias',
    label: 'ICL Notícias',
    labelEn: 'ICL News',
    labelEs: 'ICL Noticias'
  },
  {
    id: 'desperta',
    label: 'Desperta ICL',
    labelEn: 'Desperta ICL',
    labelEs: 'Desperta ICL'
  },
  {
    id: 'role',
    label: 'Rolê ICL',
    labelEn: 'Rolê ICL',
    labelEs: 'Rolê ICL'
  },
  {
    id: 'urgente',
    label: 'ICL Urgente',
    labelEn: 'ICL Urgente',
    labelEs: 'ICL Urgente'
  },
  {
    id: 'detalhes',
    label: 'Em Detalhes',
    labelEn: 'Em Detalhes',
    labelEs: 'En Detalles'
  },
  {
    id: 'mercado',
    label: 'Mercado e investimento',
    labelEn: 'Markets and investment',
    labelEs: 'Mercado e inversión'
  },
  {
    id: 'historica',
    label: 'Provocação Histórica',
    labelEn: 'Historical provocation',
    labelEs: 'Provocación histórica'
  },
  {
    id: 'entrevista',
    label: 'Entrevistas',
    labelEn: 'Interviews',
    labelEs: 'Entrevistas'
  },
  {
    id: 'conversar',
    label: 'Precisamos Conversar',
    labelEn: 'Precisamos Conversar',
    labelEs: 'Precisamos Conversar'
  },
  {
    id: 'espiritualidade',
    label: 'Espiritualidade na Ação',
    labelEn: 'Spirituality in action',
    labelEs: 'Espiritualidad en acción'
  },
  {
    id: 'radio',
    label: 'Rádio News',
    labelEn: 'Radio News',
    labelEs: 'Radio News'
  },
  {
    id: 'documentario',
    label: 'Documentários e séries',
    labelEn: 'Documentaries and series',
    labelEs: 'Documentales y series'
  },
  {
    id: 'aula',
    label: 'Aulas e cursos (amostra)',
    labelEn: 'Classes and courses (sample)',
    labelEs: 'Aulas y cursos (muestra)'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  desperta: (t) => /desperta\s*icl|despertaicl|\bdesperta\b|#\d+\s*-\s*desperta|wake up icl/i.test(t),
  role: (t) => /rol[eê]\s*icl|\brol[eê]\b/i.test(t),
  urgente: (t) => /icl\s*urgente|icl urgent/i.test(t),
  detalhes: (t) => /em detalhes/i.test(t),
  mercado: (t) =>
    /mercado e investimento|investidor mestre|empreendedor mestre|icl mercado|icl market/i.test(t),
  historica: (t) =>
    /provoca[cç][aã]o hist[oó]rica|lindener pareto|historical provocation/i.test(t),
  entrevista: (t) =>
    /chico pinheiro entrevista|chico pinheiro interview|entrevista com|entrevista:/i.test(t),
  conversar: (t) => /precisamos conversar/i.test(t),
  espiritualidade: (t) => /espiritualidade na a[cç][aã]o|frei david/i.test(t),
  radio: (t) => /r[aá]dio news|radio news/i.test(t),
  documentario: (t) =>
    /document[aá]rio|s[eé]rie original|icl\+|de quanta terra|\bno alvo\b/i.test(t),
  aula: (t) => /\baula\b|curso livre|p[oó]s-gradua[cç]|palestra/i.test(t),
  noticias: (t) =>
    /icl not[ií]cias|icl n1|icl n2|1[aª]\s*edi[cç]|2[aª]\s*edi[cç]|notici[aá]rio/i.test(t)
};

const ORDER = [
  'desperta',
  'role',
  'urgente',
  'detalhes',
  'mercado',
  'historica',
  'entrevista',
  'conversar',
  'espiritualidade',
  'radio',
  'documentario',
  'aula',
  'noticias',
  'outros'
];

function categorizeTitle(title) {
  const t = String(title || '');
  for (let i = 0; i < ORDER.length; i++) {
    const id = ORDER[i];
    if (id === 'outros') return 'outros';
    if (TESTS[id] && TESTS[id](t)) return id;
  }
  return 'outros';
}

function categoryMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

function seriesOptionsFromVideos(videos) {
  const counts = {};
  (videos || []).forEach((v) => {
    const id = v.category || categorizeTitle(v.title);
    counts[id] = (counts[id] || 0) + 1;
  });
  return CATEGORIES.filter((c) => counts[c.id]).map((c) => ({
    id: c.id,
    channel: 'icl',
    label: c.label,
    labelEn: c.labelEn,
    labelEs: c.labelEs,
    count: counts[c.id]
  }));
}

function stampCatalog(catalog) {
  const videos = (catalog.videos || []).map((v) =>
    Object.assign({}, v, { category: categorizeTitle(v.title) })
  );
  const counts = {};
  videos.forEach((v) => {
    counts[v.category] = (counts[v.category] || 0) + 1;
  });
  return Object.assign({}, catalog, {
    mission:
      catalog.mission ||
      'Instituto Conhecimento Liberta — jornalismo ao vivo no YouTube; cursos na plataforma paga. Cursos ≠ canal. Catalogar ≠ endosso político.',
    videoCount: videos.length,
    categories: CATEGORIES.filter((c) => counts[c.id]).map((c) => ({
      id: c.id,
      label: c.label,
      count: counts[c.id]
    })),
    videos
  });
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  categoryMeta,
  seriesOptionsFromVideos,
  stampCatalog
};
