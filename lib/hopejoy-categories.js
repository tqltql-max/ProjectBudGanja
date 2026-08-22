'use strict';

/**
 * Temas do canal @hopejoyoficial (personagem Hope Joy · GTA RP).
 * Só pelo título. Ficção de jogo ≠ manual de crime.
 */

const CATEGORIES = [
  { id: 'jornal', label: 'Jornal da Capital', labelEn: 'Capital newsdesk', labelEs: 'Jornal da Capital' },
  { id: 'capital-city', label: 'Capital City', labelEn: 'Capital City', labelEs: 'Capital City' },
  { id: 'rp', label: 'GTA RP', labelEn: 'GTA RP', labelEs: 'GTA RP' },
  { id: 'outros', label: 'Outros', labelEn: 'Other', labelEs: 'Otros' }
];

const TESTS = {
  jornal: (t) =>
    /jornal|reportag|not[ií]cia|ancora|âncora|diretora|director|plant[aã]o|furo\s+de/i.test(t),
  'capital-city': (t) => /capital\s*city|capitalcity|cidade/i.test(t),
  rp: (t) => /gta|roleplay|\brp\b|fivem/i.test(t)
};

const ORDER = ['jornal', 'capital-city', 'rp', 'outros'];

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
    Object.assign({}, c, { channel: 'hopejoy', count: counts[c.id] })
  );
}

function stampCatalog(catalog) {
  const videos = (catalog.videos || []).map((v, index) =>
    Object.assign({}, v, {
      category: categorizeTitle(v.title),
      pageIndex: index
    })
  );
  const next = Object.assign({}, catalog);
  delete next.videos;
  next.channelName = 'Hope Joy';
  next.kickUrl = catalog.kickUrl || 'https://kick.com/hopejoyoficial';
  next.kickHandle = catalog.kickHandle || 'hopejoyoficial';
  next.mission =
    catalog.mission ||
    'Personagem Hope Joy — Jornal da Capital no GTA RP. Arquivo YouTube; live no Kick. No BudGanja entra na página GTA RP. Sem afiliação. Ficção de jogo ≠ manual de crime.';
  next.videoCount = videos.length;
  next.categories = seriesOptionsFromVideos(videos);
  next.videos = videos;
  return next;
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  seriesOptionsFromVideos,
  stampCatalog
};
