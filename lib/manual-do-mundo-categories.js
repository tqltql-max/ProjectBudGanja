'use strict';

/**
 * Temas do canal Manual do Mundo (@manualdomundo).
 * Só pelo título. Destaque editorial: Manual Maker.
 */

const CATEGORIES = [
  {
    id: 'maker',
    label: 'Manual Maker',
    labelEn: 'Manual Maker',
    labelEs: 'Manual Maker'
  },
  {
    id: 'recorde',
    label: 'Recordes',
    labelEn: 'Records',
    labelEs: 'Récords'
  },
  {
    id: 'experiencia',
    label: 'Experiências',
    labelEn: 'Experiments',
    labelEs: 'Experimentos'
  },
  {
    id: 'como-fazer',
    label: 'Como fazer',
    labelEn: 'How to',
    labelEs: 'Cómo hacer'
  },
  {
    id: 'fisica',
    label: 'Física e electricidade',
    labelEn: 'Physics and electricity',
    labelEs: 'Física y electricidad'
  },
  {
    id: 'robotica',
    label: 'Robótica',
    labelEn: 'Robotics',
    labelEs: 'Robótica'
  },
  {
    id: 'comida',
    label: 'Comida e receitas',
    labelEn: 'Food and recipes',
    labelEs: 'Comida y recetas'
  },
  {
    id: 'tecnologia',
    label: 'Tecnologia',
    labelEn: 'Technology',
    labelEs: 'Tecnología'
  },
  {
    id: 'explicacao',
    label: 'Porquê / como funciona',
    labelEn: 'Why / how it works',
    labelEs: 'Por qué / cómo funciona'
  },
  {
    id: 'desafio',
    label: 'Desafios',
    labelEn: 'Challenges',
    labelEs: 'Desafíos'
  },
  {
    id: 'magica',
    label: 'Mágicas e truques',
    labelEn: 'Magic and tricks',
    labelEs: 'Magia y trucos'
  },
  {
    id: 'feira',
    label: 'Feira de ciências',
    labelEn: 'Science fair',
    labelEs: 'Feria de ciencias'
  },
  {
    id: 'cortes',
    label: 'Cortes',
    labelEn: 'Clips',
    labelEs: 'Cortes'
  },
  {
    id: 'canal',
    label: 'Canal e bastidores',
    labelEn: 'Channel and behind the scenes',
    labelEs: 'Canal y bastidores'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  maker: (t) =>
    /#?manual\s*maker|arduino|impressora\s*3d|corte a laser|cultura maker|\besp32\b|\bcnc\b|solda|protoboard|impress[aã]o 3d/i.test(
      t
    ),
  recorde: (t) => /recorde|guinness|maior .+ do mundo|pasta de dente de elefante|palitos? de sorvete/i.test(t),
  experiencia: (t) =>
    /experi[eê]nci|experimento|reação qu[ií]mica|nitrog[eê]nio|gelo seco|elefante|mentos/i.test(t),
  'como-fazer': (t) =>
    /como fazer|fa[cç]a voc[eê] mesmo|\bdiy\b|passo a passo|projetos? para fazer|fazer em casa|hand spinner/i.test(
      t
    ),
  fisica: (t) =>
    /f[ií]sica|eletricidade|eletromagn|[ií]m[aã]|levita[cç]|v[aá]cuo|press[aã]o|gravidade|in[eé]rcia/i.test(
      t
    ),
  robotica: (t) => /rob[oô]|rob[oó]tica|servo\b|aut[oô]nom/i.test(t),
  comida: (t) =>
    /receita|comida|chocolate|bolo|pizza|churrasco|ovo\b|hamb[uú]rguer|sorvete|coca|refrigerante/i.test(
      t
    ),
  tecnologia: (t) =>
    /celular|iphone|android|computador|drone|c[aâ]mera|intelig[eê]ncia artificial|\bia\b|internet|wifi|sat[eé]lite/i.test(
      t
    ),
  explicacao: (t) => /por que|porquê|o que [eé]|o que significa|como funciona|de onde vem/i.test(t),
  desafio: (t) => /desafio|challenge|\bvs\b|versus|aguenta|consegue/i.test(t),
  magica: (t) => /m[aá]gica|truque|ilusion/i.test(t),
  feira: (t) => /feira de ci[eê]ncias|febrace|ci[eê]ncia na escola/i.test(t),
  cortes: (t) => /cortes do manual|\| cortes/i.test(t),
  canal: (t) =>
    /draw my life|bastidores|iber[eê]|mari fulfaro|manual do mundo completa|inscritos|placa/i.test(t)
};

const ORDER = [
  'maker',
  'recorde',
  'feira',
  'robotica',
  'experiencia',
  'fisica',
  'como-fazer',
  'tecnologia',
  'comida',
  'desafio',
  'magica',
  'explicacao',
  'cortes',
  'canal',
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

function seriesOptionsFromVideos(videos) {
  const counts = {};
  (videos || []).forEach((v) => {
    const id = v.category || categorizeTitle(v.title);
    counts[id] = (counts[id] || 0) + 1;
  });
  return CATEGORIES.filter((c) => counts[c.id]).map((c) => ({
    id: c.id,
    channel: 'manualdomundo',
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
      'Ciência e tecnologia em português, no ecrã. Destaque: Manual Maker. Pessoa ≠ canal. Catalogar ≠ endosso.',
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
  seriesOptionsFromVideos,
  stampCatalog
};
