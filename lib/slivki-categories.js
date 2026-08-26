'use strict';

/**
 * Temas do canal Slivki Show (@slivkishowen).
 * Só pelo título. Destaque editorial: Aranha Rodrigo (saltadora).
 * Aranha ≠ inseto.
 */

const CATEGORIES = [
  {
    id: 'rodrigo',
    label: 'Aranha Rodrigo',
    labelEn: 'Rodrigo the spider',
    labelEs: 'Araña Rodrigo'
  },
  {
    id: 'cookie',
    label: 'Cookie (gato)',
    labelEn: 'Cookie (cat)',
    labelEs: 'Cookie (gato)'
  },
  {
    id: 'terrario',
    label: 'Terrários',
    labelEn: 'Terrariums',
    labelEs: 'Terrarios'
  },
  {
    id: 'aves',
    label: 'Ninhos e aves',
    labelEn: 'Nests and birds',
    labelEs: 'Nidos y aves'
  },
  {
    id: 'floresta',
    label: 'Floresta e rações',
    labelEn: 'Forest and rations',
    labelEs: 'Bosque y raciones'
  },
  {
    id: 'experiencias',
    label: 'Experiências visuais',
    labelEn: 'Visual experiments',
    labelEs: 'Experimentos visuales'
  },
  {
    id: 'gadgets',
    label: 'Gadgets / AliExpress',
    labelEn: 'Gadgets / AliExpress',
    labelEs: 'Gadgets / AliExpress'
  },
  {
    id: 'comida',
    label: 'Comida e bebidas',
    labelEn: 'Food and drinks',
    labelEs: 'Comida y bebidas'
  },
  {
    id: 'lifehacks',
    label: 'Life hacks',
    labelEn: 'Life hacks',
    labelEs: 'Life hacks'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  rodrigo: (t) => /rodrigo|smartest spider|\bspiders?\b/i.test(t),
  cookie: (t) => /\bcookie\b|cooky.?the.?cat|cookie-cat/i.test(t),
  terrario: (t) => /terrarium/i.test(t),
  aves: (t) => /\bnest\b|chicks?|hatch|mother bird|\bbirds?\b/i.test(t),
  floresta: (t) =>
    /\bmre\b|ration pack|combat ration|field ration|1 day in|24 hours in (a )?forest|in the woods|in the forrest|in forest/i.test(
      t
    ),
  experiencias: (t) =>
    /experiment|electricity|must not try|not allowed to repeat|sparkles|gasoline|firecracker|under water|wireless speaker|slingshot|bomber/i.test(
      t
    ),
  gadgets: (t) => /aliexpress|ali express|\bgadgets?\b/i.test(t),
  comida: (t) => /coca-?cola|\bcola\b|melons?|mangos?|\bfood\b|snowman/i.test(t),
  lifehacks: (t) => /life.?hacks?|lifehacks?|tricks from russia/i.test(t)
};

const ORDER = [
  'rodrigo',
  'cookie',
  'terrario',
  'aves',
  'floresta',
  'experiencias',
  'gadgets',
  'comida',
  'lifehacks',
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
    channel: 'slivki',
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
      'Arquivo EN de experiências visuais, life hacks e fauna de ecrã. Destaque: Aranha Rodrigo (saltadora). Aranha ≠ inseto. Catalogar ≠ endosso de cada experiência.',
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
