'use strict';

/**
 * Temas do canal @poderosobagual (personagem Todo Poderoso Bagual · GTA RP).
 * Só pelo título. Ficção de jogo ≠ manual de crime.
 */

const CATEGORIES = [
  { id: 'bope', label: 'BOPE', labelEn: 'BOPE', labelEs: 'BOPE' },
  { id: 'policia', label: 'Polícia de servidor', labelEn: 'Server police', labelEs: 'Policía de servidor' },
  { id: 'capital-city', label: 'Capital City', labelEn: 'Capital City', labelEs: 'Capital City' },
  { id: 'rp', label: 'GTA RP', labelEn: 'GTA RP', labelEs: 'GTA RP' },
  { id: 'clips', label: 'Bagual Clips', labelEn: 'Bagual Clips', labelEs: 'Bagual Clips' },
  { id: 'outros', label: 'Outros', labelEn: 'Other', labelEs: 'Otros' }
];

const TESTS = {
  bope: (t) => /\bbope\b|\bbpe\b|batalh[aã]o/i.test(t),
  policia: (t) =>
    /pol[ií]cia|pm\b|fuga|fugi|persegui[cç]|helic[oó]ptero|pris[aã]o|viatura|blitz|abordag|contingente/i.test(
      t
    ),
  'capital-city': (t) => /capital\s*city|capitalcity|\bcidade\b|copa\s*capital/i.test(t),
  rp: (t) => /gta|roleplay|\brp\b|fivem|five\s*m/i.test(t),
  clips: (t) => /bagual\s*clips|\[bagual/i.test(t)
};

const ORDER = ['bope', 'policia', 'capital-city', 'rp', 'clips', 'outros'];

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
  return CATEGORIES.filter((c) => counts[c.id]).map((c) =>
    Object.assign({}, c, { channel: 'bagual', count: counts[c.id] })
  );
}

function stampCatalog(catalog) {
  const videos = (catalog.videos || []).map((v, index) =>
    Object.assign({}, v, {
      category: categorizeTitle(v.title),
      pageIndex: index
    })
  );
  return Object.assign({}, catalog, {
    channelName: catalog.channelName || 'Todo Poderoso Bagual',
    kickUrl: catalog.kickUrl || 'https://kick.com/poderosobagual',
    kickHandle: catalog.kickHandle || 'poderosobagual',
    mission:
      catalog.mission ||
      'Personagem Todo Poderoso Bagual — BOPE no GTA RP (Capital City). Arquivo YouTube; live no Kick. No BudGanja entra na página GTA RP. Sem afiliação. Personagem ≠ pessoa. Ficção de jogo ≠ manual de crime.',
    videoCount: videos.length,
    categories: seriesOptionsFromVideos(videos),
    videos
  });
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  seriesOptionsFromVideos,
  stampCatalog
};
