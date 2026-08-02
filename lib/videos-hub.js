'use strict';

/**
 * Hub unificado de vídeos para /videos/ — Inspetor + canais parceiros + divulgação (Lair).
 * Expõe só campos públicos (sem e-mails dos catálogos de canal).
 */

const fs = require('fs');
const path = require('path');
const {
  THEME_RULES: LAIR_THEME_RULES,
  EXTRA_VIDEOS: LAIR_EXTRA_VIDEOS,
  categorizeLairVideos
} = require('./lair-video-themes.js');
const {
  THEME_RULES: DAVIS_THEME_RULES,
  categorizeDavisVideos
} = require('./davis-video-themes.js');
const {
  professorsForTitle,
  professorSeriesOptions,
  writeMovrecamProfessorsJson
} = require('./movrecam-professor-series.js');

const XIV_START = new Date('2026-06-16T00:00:00Z');

/** Ordem de exibição no hub: MovReCam → CANABinALL → Inspetor → Lair → Davis. */
const CHANNEL_META = [
  {
    id: 'movrecam',
    label: 'MovReCam',
    seriesAliases: ['canal-movrecam', 'movrecam'],
    inspectionUrl: '/posts/post-inspecao-canal-movrecam.html',
    catalogRel: path.join('content', 'channels', 'movrecam.json')
  },
  {
    id: 'canabinall',
    label: 'CANABinALL',
    seriesAliases: ['canal-canabinall', 'canabinall'],
    inspectionUrl: '/posts/post-inspecao-canal-canabinall.html',
    catalogRel: path.join('content', 'channels', 'canabinall.json')
  },
  {
    id: 'inspetor',
    label: 'Inspetor BudGanja',
    seriesAliases: ['canal-inspetor', 'inspetor', 'inspetor-budganja'],
    inspectionUrl: null,
    source: 'youtube-feed'
  },
  {
    id: 'lair',
    label: 'Dr. Lair Ribeiro',
    seriesAliases: [
      'canal-lair',
      'lair',
      'dr-lair',
      'drlair',
      'lair-ribeiro',
      'drlairribeiro',
      'drlairribeirooficiall',
      'divulgacao-lair'
    ],
    inspectionUrl: '/posts/post-inspecao-divulgacao-lair-ribeiro.html',
    catalogRel: path.join('content', 'channels', 'drlairribeirooficiall.json'),
    source: 'lair-catalog'
  },
  {
    id: 'davis',
    label: 'William Davis, MD',
    seriesAliases: [
      'canal-davis',
      'davis',
      'william-davis',
      'williamdavis',
      'williamdavismd',
      'wheat-belly',
      'dr-davis'
    ],
    inspectionUrl: '/posts/post-inspecao-figura-william-davis.html',
    catalogRel: path.join('content', 'channels', 'williamdavismd.json')
  }
];

/** Temas transversais (UI usa i18n; labels pt são fallback no hub). */
const TOPIC_OPTIONS = [
  { id: 'cultivo', label: 'Cultivo' },
  { id: 'unifesp', label: 'Aulas UNIFESP' },
  { id: 'saude', label: 'Saúde e usos' },
  { id: 'plantas', label: 'Plantas' },
  { id: 'ciencia', label: 'Ciência' }
];

const TOPIC_ORDER = TOPIC_OPTIONS.map((t) => t.id);

const TOPIC_RULES = [
  {
    id: 'cultivo',
    re: /cultivo|solo\b|nutri(?:ente|ção|cao)|flora[cç]|clona|propaga|org[aâ]nico|plantio|arquitetura|vegetat|estaca|hidro/i
  },
  {
    id: 'unifesp',
    re: /\baula\b|xiv|unifesp|curso|lecture|lesson|\bclass\b|temporada/i
  },
  {
    id: 'saude',
    re: /sa[uú]de|alzheimer|odonto|medicinal|aplica[cç]|cl[ií]nic|paciente|doen[cç]|a[cç][uú]car|frutose|ado[cç]ante|diabet|obesidad|insulina|gl[uú]ten|l[aá]cteo|case[ií]na|tire[oó]ide|colesterol|inflama|longevid|envelhec|gordura|hidrata|[aá]gua\b|horm[oô]n|imun|cora[cç][aã]o|cardio|sono\b|stress|estresse|metab[oó]lic|jejum|vitamina|magn[eé]sio/i
  },
  {
    id: 'plantas',
    re: /plantas?\s*sagradas|fitoter|erva\b|cannabis|canabi|maconha|thc|\bcbd\b|coco\b|abacate/i
  },
  {
    id: 'ciencia',
    re: /ci[eê]ncia|endocanab|receptor|farmac|extra[cç]|neur[oô]|epifania/i
  }
];

/** Tema Lair → tópico transversal do hub (quando o regex do título falha). */
const LAIR_THEME_TOPICS = {
  cannabis: ['plantas', 'saude'],
  acucar: ['saude'],
  'gluten-leite': ['saude'],
  diabetes: ['saude'],
  cerebro: ['saude', 'ciencia'],
  coracao: ['saude'],
  inflamacao: ['saude'],
  hormonios: ['saude'],
  longevidade: ['saude'],
  agua: ['saude'],
  oleos: ['saude', 'plantas'],
  nutricao: ['saude'],
  exercicio: ['saude'],
  sono: ['saude'],
  imunidade: ['saude'],
  autoajuda: [],
  lives: [],
  trailers: [],
  outros: []
};

/** Tema Davis → tópico transversal do hub. */
const DAVIS_THEME_TOPICS = {
  'trigo-gluten': ['saude'],
  microbioma: ['saude', 'ciencia'],
  coracao: ['saude'],
  'diabetes-peso': ['saude'],
  'tireoide-hormonios': ['saude'],
  cerebro: ['saude', 'ciencia'],
  suplementos: ['saude'],
  nutricao: ['saude'],
  undoctored: ['saude'],
  programas: [],
  entrevistas: [],
  outros: []
};

function approxIsoFromRelative(rel, nowMs) {
  const s = String(rel || '')
    .trim()
    .toLowerCase();
  if (!s) return '';
  const now = typeof nowMs === 'number' ? nowMs : Date.now();
  const match = s.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s+ago/);
  if (match) {
    const n = Number(match[1]);
    const unit = match[2];
    const ms =
      unit === 'second'
        ? n * 1000
        : unit === 'minute'
          ? n * 60 * 1000
          : unit === 'hour'
            ? n * 3600 * 1000
            : unit === 'day'
              ? n * 86400 * 1000
              : unit === 'week'
                ? n * 7 * 86400 * 1000
                : unit === 'month'
                  ? n * 30.44 * 86400 * 1000
                  : n * 365.25 * 86400 * 1000;
    return new Date(now - ms).toISOString();
  }
  if (/^(a|an)\s+year\s+ago/.test(s)) return new Date(now - 365.25 * 86400 * 1000).toISOString();
  if (/^(a|an)\s+month\s+ago/.test(s)) return new Date(now - 30.44 * 86400 * 1000).toISOString();
  if (/^(a|an)\s+week\s+ago/.test(s)) return new Date(now - 7 * 86400 * 1000).toISOString();
  if (/^(a|an)\s+day\s+ago/.test(s)) return new Date(now - 86400 * 1000).toISOString();
  return '';
}

function buildLairThemeById() {
  const map = new Map();
  try {
    const doc = categorizeLairVideos();
    (doc.themes || []).forEach((theme) => {
      (theme.videos || []).forEach((v) => {
        if (v && v.id) map.set(v.id, theme.id);
      });
    });
  } catch (e) {
    /* catálogo Lair opcional no build */
  }
  return map;
}

function buildDavisThemeById() {
  const map = new Map();
  try {
    const doc = categorizeDavisVideos();
    (doc.themes || []).forEach((theme) => {
      (theme.videos || []).forEach((v) => {
        if (v && v.id) map.set(v.id, theme.id);
      });
    });
  } catch (e) {
    /* catálogo Davis opcional no build */
  }
  return map;
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function isXivAula(v) {
  const d = v.published ? new Date(v.published) : null;
  if (!d || Number.isNaN(d.getTime()) || d < XIV_START) return false;
  return /\d+ª?\s*Aula|Aula\s+\d+/i.test(String(v.title || ''));
}

function seriesFor(channelId, v, themeById) {
  const tags = [];
  if (channelId === 'movrecam') {
    if (isXivAula(v)) tags.push('xiv');
    const professors = professorsForTitle(v && v.title);
    for (let i = 0; i < professors.length; i++) tags.push(professors[i]);
  }
  if (channelId === 'canabinall') {
    const t = String(v.title || '');
    if (/plantas?\s*sagradas/i.test(t)) tags.push('plantas-sagradas');
    if (/conceitos?\s*b[aá]sicos/i.test(t)) tags.push('conceitos');
  }
  if ((channelId === 'lair' || channelId === 'davis') && themeById) {
    const themeId = themeById.get(String((v && v.id) || ''));
    if (themeId) tags.push(themeId);
  }
  return tags;
}

function uniqueOrderedTopics(list) {
  const seen = new Set();
  const out = [];
  for (let i = 0; i < TOPIC_ORDER.length; i++) {
    const id = TOPIC_ORDER[i];
    if (list.indexOf(id) >= 0 && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  return out;
}

/**
 * Override por id substitui o auto. Sem override: regex no título + inspetor→cultivo.
 * @param {string} channelId
 * @param {{ id?: string, title?: string }} v
 * @param {Record<string, string[]>} [overrides]
 * @param {Map<string, string>} [themeById]
 */
function topicsFor(channelId, v, overrides, themeById) {
  const id = String((v && v.id) || '').trim();
  const map = overrides || {};
  if (id && Object.prototype.hasOwnProperty.call(map, id)) {
    const raw = map[id];
    return uniqueOrderedTopics(Array.isArray(raw) ? raw.map(String) : []);
  }

  const tags = [];
  if (channelId === 'inspetor') tags.push('cultivo');

  const t = String((v && v.title) || '');
  for (let i = 0; i < TOPIC_RULES.length; i++) {
    if (TOPIC_RULES[i].re.test(t)) tags.push(TOPIC_RULES[i].id);
  }

  if (channelId === 'lair' && themeById) {
    const themeId = themeById.get(id);
    const fromTheme = (themeId && LAIR_THEME_TOPICS[themeId]) || [];
    for (let j = 0; j < fromTheme.length; j++) tags.push(fromTheme[j]);
  }
  if (channelId === 'davis' && themeById) {
    const themeId = themeById.get(id);
    const fromTheme = (themeId && DAVIS_THEME_TOPICS[themeId]) || [];
    for (let j = 0; j < fromTheme.length; j++) tags.push(fromTheme[j]);
  }

  return uniqueOrderedTopics(tags);
}

function normalizeVideo(v, channelId, overrides, themeById) {
  const id = String(v.id || '').trim();
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
  const published =
    v.published || approxIsoFromRelative(v.publishedRelative) || '';
  return {
    id,
    title: v.title || '',
    titleEn: v.titleEn || '',
    titleEs: v.titleEs || '',
    summary: v.summary || '',
    summaryEn: v.summaryEn || '',
    summaryEs: v.summaryEs || '',
    published,
    url: v.url || 'https://www.youtube.com/watch?v=' + id,
    thumb: v.thumb || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
    channel: channelId,
    series: seriesFor(channelId, v, themeById),
    topics: topicsFor(channelId, v, overrides, themeById)
  };
}

function sortNewestFirst(list) {
  return list.slice().sort((a, b) => {
    const da = a.published ? new Date(a.published).getTime() : 0;
    const db = b.published ? new Date(b.published).getTime() : 0;
    if (db !== da) return db - da;
    return String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR');
  });
}

function loadInspetorVideos(root, youtubeFeed, overrides) {
  const feed =
    youtubeFeed ||
    readJson(path.join(root, 'content', 'youtube-feed.json'), { videos: [] });
  return {
    channelUrl: feed.channelUrl || 'https://www.youtube.com/@InspetorBudGanja',
    channelName: feed.channelName || 'Inspetor BudGanja',
    videos: (feed.videos || [])
      .map((v) => normalizeVideo(v, 'inspetor', overrides))
      .filter(Boolean)
  };
}

function loadCatalogChannel(root, meta, overrides, themeById) {
  const raw = readJson(path.join(root, meta.catalogRel), null);
  if (!raw) {
    return {
      channelUrl: '',
      channelName: meta.label,
      videos: []
    };
  }
  return {
    channelUrl: raw.channelUrl || '',
    channelName: raw.channelName || meta.label,
    videos: sortNewestFirst(
      (raw.videos || [])
        .map((v) => normalizeVideo(v, meta.id, overrides, themeById))
        .filter(Boolean)
    )
  };
}

function loadLairChannel(root, meta, overrides, themeById) {
  const raw = readJson(path.join(root, meta.catalogRel), null) || {
    videos: [],
    channelUrl: 'https://www.youtube.com/@DrLairRibeiroOficiall',
    channelName: meta.label
  };
  const byId = new Map();
  (raw.videos || []).forEach((v) => {
    if (v && v.id) byId.set(v.id, v);
  });
  LAIR_EXTRA_VIDEOS.forEach((v) => {
    if (v && v.id && !byId.has(v.id)) byId.set(v.id, v);
  });
  return {
    channelUrl: raw.channelUrl || 'https://www.youtube.com/@DrLairRibeiroOficiall',
    channelName: raw.channelName || meta.label,
    videos: sortNewestFirst(
      Array.from(byId.values())
        .map((v) => normalizeVideo(v, meta.id, overrides, themeById))
        .filter(Boolean)
    )
  };
}

/**
 * @param {string} root
 * @param {{ youtubeFeed?: object } } [opts]
 */
function buildVideosHub(root, opts) {
  const options = opts || {};
  const overrides = readJson(
    path.join(root, 'content', 'videos-topic-overrides.json'),
    {}
  );
  const lairThemeById = buildLairThemeById();
  const davisThemeById = buildDavisThemeById();
  const channels = [];
  const videos = [];
  let updatedAt = new Date().toISOString();

  for (const meta of CHANNEL_META) {
    const themeById =
      meta.id === 'lair' ? lairThemeById : meta.id === 'davis' ? davisThemeById : null;
    const loaded =
      meta.source === 'youtube-feed'
        ? loadInspetorVideos(root, options.youtubeFeed, overrides)
        : meta.source === 'lair-catalog'
          ? loadLairChannel(root, meta, overrides, themeById)
          : loadCatalogChannel(root, meta, overrides, themeById);

    if (meta.source === 'youtube-feed' && options.youtubeFeed && options.youtubeFeed.updatedAt) {
      updatedAt = options.youtubeFeed.updatedAt;
    }

    channels.push({
      id: meta.id,
      label: loaded.channelName || meta.label,
      channelUrl: loaded.channelUrl,
      inspectionUrl: meta.inspectionUrl,
      seriesAliases: meta.seriesAliases,
      count: loaded.videos.length
    });
    videos.push.apply(videos, loaded.videos);
  }

  const lairSeriesOptions = LAIR_THEME_RULES.map((rule) => ({
    id: rule.id,
    channel: 'lair',
    label: rule.label
  }));

  const davisSeriesOptions = DAVIS_THEME_RULES.map((rule) => ({
    id: rule.id,
    channel: 'davis',
    label: rule.label
  }));

  try {
    writeMovrecamProfessorsJson(root);
  } catch (e) {
    /* catálogo de professores é auxiliar; hub continua */
  }

  const movrecamProfessorSeries = professorSeriesOptions().map((opt) => ({
    id: opt.id,
    channel: 'movrecam',
    label: opt.label
  }));

  return {
    updatedAt,
    channels,
    videos,
    seriesOptions: [
      {
        id: 'xiv',
        channel: 'movrecam',
        label: 'XIV edição'
      }
    ]
      .concat(movrecamProfessorSeries)
      .concat([
        {
          id: 'conceitos',
          channel: 'canabinall',
          label: 'Conceitos básicos'
        },
        {
          id: 'plantas-sagradas',
          channel: 'canabinall',
          label: 'Plantas Sagradas'
        }
      ])
      .concat(lairSeriesOptions)
      .concat(davisSeriesOptions),
    topicOptions: TOPIC_OPTIONS.slice()
  };
}

function resolveChannelAlias(value) {
  const raw = String(value || '')
    .trim()
    .toLowerCase();
  if (!raw) return '';
  if (raw === 'all' || raw === 'todos') return 'all';
  for (const meta of CHANNEL_META) {
    if (meta.id === raw || (meta.seriesAliases || []).includes(raw)) return meta.id;
  }
  return '';
}

function resolveTopicAlias(value) {
  const raw = String(value || '')
    .trim()
    .toLowerCase();
  if (!raw) return '';
  if (TOPIC_ORDER.indexOf(raw) >= 0) return raw;
  const aliases = {
    'aulas-unifesp': 'unifesp',
    aulas: 'unifesp',
    'saude-e-usos': 'saude',
    saúde: 'saude',
    'saude': 'saude',
    ciência: 'ciencia',
    ciencia: 'ciencia'
  };
  return aliases[raw] || '';
}

module.exports = {
  CHANNEL_META,
  TOPIC_OPTIONS,
  buildVideosHub,
  resolveChannelAlias,
  resolveTopicAlias,
  topicsFor,
  isXivAula
};
