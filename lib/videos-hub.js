'use strict';

/**
 * Hub unificado de vídeos para /videos/ — Inspetor + canais parceiros inspecionados.
 * Expõe só campos públicos (sem e-mails dos catálogos de canal).
 */

const fs = require('fs');
const path = require('path');

const XIV_START = new Date('2026-06-16T00:00:00Z');

/** Ordem de exibição no hub: MovReCam → CANABinALL → Inspetor. */
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
    re: /cultivo|solo\b|nutri|flora[cç]|clona|propaga|org[aâ]nico|plantio|arquitetura|vegetat|estaca|hidro/i
  },
  {
    id: 'unifesp',
    re: /\baula\b|xiv|unifesp|curso|lecture|lesson|\bclass\b|temporada/i
  },
  {
    id: 'saude',
    re: /sa[uú]de|alzheimer|odonto|medicinal|aplica[cç]|cl[ií]nic|paciente|doen[cç]/i
  },
  {
    id: 'plantas',
    re: /plantas?\s*sagradas|fitoter|erva\b|cannabis\s+sativa/i
  },
  {
    id: 'ciencia',
    re: /ci[eê]ncia|endocanab|receptor|farmac|extra[cç]/i
  }
];

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

function seriesFor(channelId, v) {
  const tags = [];
  if (channelId === 'movrecam' && isXivAula(v)) tags.push('xiv');
  if (channelId === 'canabinall') {
    const t = String(v.title || '');
    if (/plantas?\s*sagradas/i.test(t)) tags.push('plantas-sagradas');
    if (/conceitos?\s*b[aá]sicos/i.test(t)) tags.push('conceitos');
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
 */
function topicsFor(channelId, v, overrides) {
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
  return uniqueOrderedTopics(tags);
}

function normalizeVideo(v, channelId, overrides) {
  const id = String(v.id || '').trim();
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
  return {
    id,
    title: v.title || '',
    titleEn: v.titleEn || '',
    titleEs: v.titleEs || '',
    summary: v.summary || '',
    summaryEn: v.summaryEn || '',
    summaryEs: v.summaryEs || '',
    published: v.published || '',
    url: v.url || 'https://www.youtube.com/watch?v=' + id,
    thumb: v.thumb || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
    channel: channelId,
    series: seriesFor(channelId, v),
    topics: topicsFor(channelId, v, overrides)
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

function loadCatalogChannel(root, meta, overrides) {
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
        .map((v) => normalizeVideo(v, meta.id, overrides))
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
  const channels = [];
  const videos = [];
  let updatedAt = new Date().toISOString();

  for (const meta of CHANNEL_META) {
    const loaded =
      meta.source === 'youtube-feed'
        ? loadInspetorVideos(root, options.youtubeFeed, overrides)
        : loadCatalogChannel(root, meta, overrides);

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

  return {
    updatedAt,
    channels,
    videos,
    seriesOptions: [
      {
        id: 'xiv',
        channel: 'movrecam',
        label: 'XIV edição'
      },
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
    ],
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
