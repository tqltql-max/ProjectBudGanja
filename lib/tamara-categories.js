'use strict';

/**
 * Temas do canal Tamara Klink (@TamaraKlink).
 * Só pelo título. Pessoa ≠ canal — a ficha de legado fica em Pessoas.
 */

const CATEGORIES = [
  {
    id: 'noroeste',
    label: 'Passagem Noroeste',
    labelEn: 'Northwest Passage',
    labelEs: 'Paso del Noroeste'
  },
  {
    id: 'artico',
    label: 'Ártico e gelo',
    labelEn: 'Arctic and ice',
    labelEs: 'Ártico y hielo'
  },
  {
    id: 'invernagem',
    label: 'Invernagem e garrafa',
    labelEn: 'Wintering and bottle',
    labelEs: 'Invernada y botella'
  },
  {
    id: 'atlantico',
    label: 'Atlântico e travessias',
    labelEn: 'Atlantic and crossings',
    labelEs: 'Atlántico y travesías'
  },
  {
    id: 'palavras',
    label: 'Léxico trilingue',
    labelEn: 'Trilingual lexicon',
    labelEs: 'Léxico trilingüe'
  },
  {
    id: 'barco',
    label: 'Barco e ofício',
    labelEn: 'Boat and craft',
    labelEs: 'Barco y oficio'
  },
  {
    id: 'arquitetura',
    label: 'Arquitetura naval',
    labelEn: 'Naval architecture',
    labelEs: 'Arquitectura naval'
  },
  {
    id: 'palestra',
    label: 'Palestras e Q&A',
    labelEn: 'Talks and Q&A',
    labelEs: 'Charlas y Q&A'
  },
  {
    id: 'vlog',
    label: 'Vlog e companhia',
    labelEn: 'Vlog and company',
    labelEs: 'Vlog y compañía'
  },
  {
    id: 'saudade',
    label: 'Saudade e distância',
    labelEn: 'Longing and distance',
    labelEs: 'Añoranza y distancia'
  },
  {
    id: 'mar',
    label: 'Mar e navegar',
    labelEn: 'Sea and sailing',
    labelEs: 'Mar y navegar'
  },
  {
    id: 'reflexao',
    label: 'Diário e reflexão',
    labelEn: 'Journal and reflection',
    labelEs: 'Diario y reflexión'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  noroeste: (t) => /noroeste|northwest\s*passage|passagem\s+do\s+noroeste/i.test(t),
  artico: (t) =>
    /[áa]rtico|arctic|gelo|groenl[aâ]ndia|greenland|pack\s*ice|polo|polar|banquisa|icefield|siku|bering|alaska|urso|ant[aá]rtic|iceberg|geleira|glacier|\btara\b/i.test(
      t
    ),
  invernagem: (t) =>
    /invernag|mensagem\s+na\s+garrafa|month\s+\d|m[eê]s\s+\d/i.test(t),
  atlantico: (t) =>
    /atl[aâ]ntic|noruega|norway|fran[cç]a|france|transat|trindade|shackleton|eastbourne|amsterdam|lorient|lisboa|brest|nantes|vit[oó]ria|paraty|cabo\s+frio|stathelle|sweden|su[eé]cia/i.test(
      t
    ),
  palavras: (t) =>
    /[\u{1F1E6}-\u{1F1FF}]{2}/u.test(t) ||
    /\b(pt|fr|en)\b.+\b(pt|fr|en)\b/i.test(t) ||
    /\/\s*(when|from|see you|sailing|wrong|du petit)/i.test(t),
  arquitetura: (t) =>
    /arquitet|architect|engenharia\s+naval|carbon\s*fiber|kayak|dicas\s+klink|como\s+fazer\s+a\s+mala/i.test(
      t
    ),
  palestra: (t) =>
    /palestra|lecture|talk|q\s*&\s*a|perguntas|entrevista|interview|ted\b|inspira[cç]|hashtagsal|mar\s+urbano/i.test(
      t
    ),
  vlog: (t) => /vlog|vov[oó]|v[oó]-vlog|g[eê]meas|anivers[aá]rio|^chegada$/i.test(t),
  saudade: (t) =>
    /saudade|i\s+miss\s+you|sinto\s+sua\s+falta|missing\s+you|i'?m\s+not\s+coming\s+back/i.test(
      t
    ),
  barco: (t) =>
    /barco|sailboat|sardinha|velas?|casco|navegador|paratii|deck|flying\s*boat|joshua\s*slocum|circumnav|foil|moth|aerorig|plywood|shipyard|estaleiro|kitchen-living|female\s+crew|what\s+do\s+you\s+eat|day-to-day\s+on\s+a\s+boat|three\s+ways\s+to\s+sail|leaving\s+port|find\s+the\s+boat|between\s+a\s+boat|how\s+to\s+read\s+a\s+boat|diesel|xixi\s+no\s+balde|you\s+should\s+row|tour\s+of\s+the\s+walls/i.test(
      t
    ),
  mar: (t) =>
    /mar\b|oceano|navega|solo\s+sail|solit[aá]ri|sozinha|praia|woman.{0,24}sail|mulher|ocean\s+regatta|draws\s+someone\s+to\s+the\s+sea|high\s+seas|ondas\s+grandes/i.test(
      t
    ),
  reflexao: (t) =>
    /coragem|medo|risks?|disciplina|limite|liberdade|despedida|farewell|^fim$|visita|thank\s+you|coffee|friends\s+who\s+teach|goat\s+friends|neighbors|lizards|pegar\s+no\s+sono|love\s+of\s+my\s+life|where\s+are\s+we\s+heading|paving\s+over|desistir|miss[oõ]es|journal|di[aá]rio|growing\s+up|dreams\s+and\s+plans|thousand\s+miles|exemplo\s+dos\s+pais|my\s+mom|we\s+arrived|new\s+missions|mergulho|longe\s+juntas|on\s+the\s+road/i.test(
      t
    )
};

const ORDER = [
  'noroeste',
  'artico',
  'invernagem',
  'atlantico',
  'palavras',
  'arquitetura',
  'palestra',
  'vlog',
  'saudade',
  'barco',
  'mar',
  'reflexao',
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
  const themes = CATEGORIES.filter((c) => counts[c.id]).map((c) => ({
    id: c.id,
    channel: 'tamara',
    label: c.label,
    labelEn: c.labelEn,
    labelEs: c.labelEs,
    count: counts[c.id]
  }));
  const { familySeriesOptionsFromVideos } = require('./klink-family.js');
  return themes.concat(familySeriesOptionsFromVideos(videos, 'tamara'));
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
      'Velejo, inverno e escrevo — arquivo público de travessias, ofício e léxico.',
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
