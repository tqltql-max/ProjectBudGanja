'use strict';

/**
 * Histórias / temas do canal Paulinho o LOKO — só pelo título (entretenimento / GTA).
 * Ficção de jogo ≠ manual de crime.
 */

const CATEGORIES = [
  { id: 'modo-historia', label: 'Modo história', labelEn: 'Story mode', labelEs: 'Modo historia' },
  { id: 'traidores', label: 'Traidores & seita', labelEn: 'Traitors & cult', labelEs: 'Traidores y secta' },
  { id: 'prefeito', label: 'Prefeito', labelEn: 'Mayor', labelEs: 'Alcalde' },
  { id: 'anti-rp', label: 'Anti-RP', labelEn: 'Anti-RP', labelEs: 'Anti-RP' },
  { id: 'golpes-troll', label: 'Golpes & troll', labelEn: 'Scams & trolling', labelEs: 'Estafas y troleo' },
  { id: 'policia', label: 'Polícia & fugas', labelEn: 'Cops & chases', labelEs: 'Policía y fugas' },
  { id: 'ban-kick', label: 'Ban & kick', labelEn: 'Ban & kick', labelEs: 'Ban y kick' },
  { id: 'corridas', label: 'Corridas', labelEn: 'Races', labelEs: 'Carreras' },
  { id: 'modder-clips', label: 'Modder Clips', labelEn: 'Modder Clips', labelEs: 'Modder Clips' },
  { id: 'vida-real', label: 'Vida real', labelEn: 'Real life', labelEs: 'Vida real' },
  { id: 'gta-rp', label: 'GTA RP', labelEn: 'GTA RP', labelEs: 'GTA RP' },
  { id: 'outros', label: 'Outros', labelEn: 'Other', labelEs: 'Otros' }
];

const TESTS = {
  'modo-historia': (t) => /modo\s*hist[oó]ria|gta\s*5.*hist[oó]ria|hist[oó]ria.*gta\s*5|story\s*mode/i.test(t),
  traidores: (t) => /traid[oa]|seita|chip que controla|invas[aã]o na mans[aã]o/i.test(t),
  prefeito: (t) => /prefeito/i.test(t),
  'anti-rp': (t) => /anti\s*[-]?\s*rp|anti\s*roleplay|antirp/i.test(t),
  'golpes-troll': (t) => /troll|trolagem|trollagem|golpe|pegadinha|fingi ser|luquet4\s*fake/i.test(t),
  policia: (t) => /pol[ií]cia|pm\b|fuga|fugi|persegui[cç]|helic[oó]ptero|prf|pris[aã]o|batalh[aã]o|ex[eé]rcito/i.test(t),
  'ban-kick': (t) => /\bban\b|bani|banido|kick|kitei|kickado|advert[eê]ncia/i.test(t),
  corridas: (t) => /corrida|monte chiliad|montanha gigante/i.test(t),
  'modder-clips': (t) => /modder\s*clips/i.test(t),
  'vida-real': (t) => /vida real|react|rea[cç][aã]o|reagindo|\bvlog\b/i.test(t),
  'gta-rp': (t) => /gta|roleplay|\brp\b|fivem|cidad[ea]/i.test(t)
};

const ORDER = [
  'modo-historia',
  'traidores',
  'prefeito',
  'anti-rp',
  'golpes-troll',
  'policia',
  'ban-kick',
  'corridas',
  'modder-clips',
  'vida-real',
  'gta-rp',
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
    channel: 'paulinho',
    label: c.label,
    labelEn: c.labelEn,
    labelEs: c.labelEs,
    count: counts[c.id]
  }));
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
  next.channelName = 'Paulinho o LOKO';
  next.kickUrl = catalog.kickUrl || 'https://kick.com/paulinholokobr';
  next.kickHandle = catalog.kickHandle || 'PaulinhoLOKObr';
  next.mission =
    catalog.mission ||
    'Canal de entretenimento GTA RP / Anti-RP. No BudGanja entra na página Games — ficção de jogo, não manual de crime.';
  next.videoCount = videos.length;
  next.categories = seriesOptionsFromVideos(videos);
  next.videos = videos;
  return next;
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  categoryMeta,
  seriesOptionsFromVideos,
  stampCatalog
};
