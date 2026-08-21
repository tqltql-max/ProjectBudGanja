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
    const id = v.category || 'outros';
    counts[id] = (counts[id] || 0) + 1;
  });
  return CATEGORIES.filter((c) => counts[c.id]).map((c) =>
    Object.assign({}, c, { channel: 'hopejoy', count: counts[c.id] })
  );
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  seriesOptionsFromVideos
};
