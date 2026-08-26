'use strict';

/**
 * Formatos / méritos do canal Zangado (@zangadoreview).
 * Só pelo título. Crédito ao ofício: crítica, sagas e primeira meia hora — não hype de collab.
 */

const CATEGORIES = [
  { id: 'sagas', label: 'Sagas', labelEn: 'Sagas', labelEs: 'Sagas' },
  { id: 'vale-a-pena', label: 'Vale ou não a pena', labelEn: 'Worth playing?', labelEs: '¿Vale la pena?' },
  { id: 'primeira-meia-hora', label: 'Primeira meia hora', labelEn: 'First half hour', labelEs: 'Primera media hora' },
  { id: 'nao-vale', label: 'Não vale a pena', labelEn: 'Not worth playing', labelEs: 'No vale la pena' },
  { id: 'trilogias', label: 'Trilogias', labelEn: 'Trilogies', labelEs: 'Trilogías' },
  { id: 'demo', label: 'Demos', labelEn: 'Demos', labelEs: 'Demos' },
  { id: 'unboxing', label: 'Unboxing', labelEn: 'Unboxing', labelEs: 'Unboxing' },
  { id: 'bate-papo', label: 'Bate-papo', labelEn: 'Chat', labelEs: 'Charla' },
  { id: 'lives', label: 'Lives & reacts', labelEn: 'Lives & reacts', labelEs: 'Lives y reacts' },
  { id: 'minuto', label: '1 minuto', labelEn: '1 minute', labelEs: '1 minuto' },
  { id: 'nerd-extra', label: 'Nerd extra', labelEn: 'Nerd extra', labelEs: 'Nerd extra' },
  { id: 'retrospectiva', label: 'Anos depois', labelEn: 'Years later', labelEs: 'Años después' },
  { id: 'listas', label: 'Listas', labelEn: 'Lists', labelEs: 'Listas' },
  { id: 'gameplay', label: 'Gameplay', labelEn: 'Gameplay', labelEs: 'Gameplay' },
  { id: 'especiais', label: 'Especiais', labelEn: 'Specials', labelEs: 'Especiales' },
  { id: 'outros', label: 'Outros', labelEn: 'Other', labelEs: 'Otros' }
];

const TESTS = {
  'bate-papo': (t) => /bate[\s-]*papo|tio\s*zangado/i.test(t),
  lives: (t) => /\blive\b|react\b|state of play/i.test(t),
  minuto: (t) =>
    /#shorts|\bshorts\b|in\s*1\s*minute|em\s*1\s*minuto|em\s*um\s*minuto|everything about .{0,80} in 1/i.test(
      t
    ),
  sagas: (t) =>
    /\bsagas?\b|a\s+saga\s+(de|do|da)|hist[oó]ria\s+(completa\s+)?(da|de|do)\s+(franquia|s[eé]rie)|franquia\s+completa|evolution of\b|evolu[cç][aã]o (de|do|da|of)/i.test(
      t
    ),
  trilogias: (t) => /trilogia/i.test(t),
  'nao-vale': (t) =>
    (!/vale\s+ou\s+n[aã]o/i.test(t) && /n[aã]o\s+vale\s+a\s+pena|n[aã]o\s+compre/i.test(t)) ||
    /not worth playing/i.test(t),
  'vale-a-pena': (t) =>
    /vale\s+ou\s+n[aã]o(\s+a)?\s+(vale|pena)|vale\s+a\s+pena|is it (still\s+)?worth (playing|it|buying)|worth it or not|an[aá]lise completa|\breview\b/i.test(
      t
    ),
  'nerd-extra': (t) =>
    /worth watching|filme|cinema|\banime\b|\bhqs?\b|quadrinhos|mang[aá]|livro|\bs[eé]ries?\b(?!\s*(de\s+games|gamer))|netflix|marvel|dc comics|desenhos/i.test(
      t
    ),
  unboxing: (t) => /unboxing|\bunbox\b/i.test(t),
  demo: (t) => /\bdemos?\b|jogando a demo|playing the demo/i.test(t),
  retrospectiva: (t) =>
    /years later|anos depois|retrospectiva|\d+\s+(years|anos)\s+(later|depois)/i.test(t),
  'primeira-meia-hora': (t) =>
    /primeira\s+meia[\s-]*hora|first\s+half[\s-]*hour|meia[\s-]*hora\s+(de|do)/i.test(t),
  listas: (t) =>
    /mais esperados|most anticipated|melhores jogos|best (mobile )?games? of|top\s*\d+/i.test(t),
  especiais: (t) =>
    /\bespecial(is)?\b|special( edition| feature)?\s*:|\bvlog\b|behind the scenes|bastidores|ind[uú]stria|comunidade gamer|why do you play|what happened|do you waste time/i.test(
      t
    ),
  gameplay: (t) =>
    /gameplay|jogando|completoz|completez|como jogar|first\s+(hour|look)|impress[oõ]es|lan[cç]amento|preview|\[4k\]|\(pc\)|\(playstation|\(ps5|\(xbox|\(nintendo/i.test(
      t
    )
};

const ORDER = [
  'bate-papo',
  'lives',
  'minuto',
  'sagas',
  'trilogias',
  'vale-a-pena',
  'nao-vale',
  'nerd-extra',
  'unboxing',
  'demo',
  'retrospectiva',
  'primeira-meia-hora',
  'listas',
  'especiais',
  'gameplay',
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
    channel: 'zangado',
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
  next.channelName = 'Zangado';
  next.mission =
    catalog.mission ||
    'Canal 100% gamer — reviews, sagas e primeira meia hora com método. No BudGanja entra na página Games. Crédito: Thiago / Zangado — sem afiliação.';
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
