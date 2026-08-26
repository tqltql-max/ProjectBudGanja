'use strict';

/**
 * Catálogo de professores / palestrantes do MovReCam (títulos das aulas).
 * Cada vídeo pode receber várias tags (aulas com dois professores).
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

/** @typedef {{ id: string, label: string, labelEn?: string, labelEs?: string, re: RegExp, inspectionUrl?: string|null }} ProfessorRule */

/** @type {ProfessorRule[]} */
const PROFESSOR_RULES = [
  {
    id: 'eliana',
    label: 'Eliana Rodrigues',
    labelEn: 'Eliana Rodrigues',
    labelEs: 'Eliana Rodrigues',
    re: /eliana\s+rodrigues|prof[ªa.]?\s*eliana|professora\s+eliana|teacher\s+eliana|(?:^|[^\w])eliana(?:[^\w]|$)/i,
    inspectionUrl: '/posts/post-inspecao-eliana-rodrigues.html'
  },
  {
    id: 'gabrielle',
    label: 'Gabrielle Dainezi',
    labelEn: 'Gabrielle Dainezi',
    labelEs: 'Gabrielle Dainezi',
    re: /gabrielle\s+dainezi|gabi\s+dainezi|\bdainezi\b/i,
    inspectionUrl: '/posts/post-inspecao-gabrielle-dainezi.html'
  },
  {
    id: 'sidarta',
    label: 'Sidarta Ribeiro',
    labelEn: 'Sidarta Ribeiro',
    labelEs: 'Sidarta Ribeiro',
    re: /sidarta\s+ribeiro|\bsidarta\b/i,
    inspectionUrl: '/posts/post-inspecao-sidarta-ribeiro.html'
  },
  {
    id: 'padre-ticao',
    label: 'Padre Ticão',
    labelEn: 'Father Ticão',
    labelEs: 'Padre Ticão',
    re: /padre\s+tic[aã]o|(?:^|[^\w])tic[aã]o(?:[^\w]|$)/i,
    inspectionUrl: '/posts/post-inspecao-padre-ticao.html'
  },
  {
    id: 'renata-monteiro',
    label: 'Renata Monteiro',
    re: /renata\s+monteiro/i
  },
  {
    id: 'carolina-nocetti',
    label: 'Carolina Nocetti',
    re: /carolina\s+nocetti/i
  },
  {
    id: 'carolina-marroni',
    label: 'Carolina Marroni',
    re: /carolina\s+marroni|caroline\s+marroni|carol\s+marroni/i
  },
  {
    id: 'paulo-morais',
    label: 'Paulo Morais',
    re: /paulo\s+morais/i
  },
  {
    id: 'eliane-nunes',
    label: 'Eliane Nunes',
    re: /eliane\s+nunes/i
  },
  {
    id: 'wilson-lessa',
    label: 'Wilson Lessa',
    re: /wilson\s+lessa/i
  },
  {
    id: 'jaqueline-guimaraes',
    label: 'Jaqueline Guimarães',
    re: /jaqueline\s+guimar/i
  },
  {
    id: 'nivaldo-vanni',
    label: 'Nivaldo Vanni',
    re: /nivaldo\s+vanni|(?:^|[^\w])nivaldo(?:[^\w]|$)/i
  },
  {
    id: 'luciana-surjus',
    label: 'Luciana Surjus',
    re: /luciana\s+surjus/i
  },
  {
    id: 'paula-toledo',
    label: 'Paula Toledo',
    re: /paula\s+toledo/i
  },
  {
    id: 'rede-reforma',
    label: 'Rede Reforma',
    re: /rede\s+reforma/i
  },
  {
    id: 'anderson-matos',
    label: 'Anderson Matos',
    re: /anderson\s+matos/i
  },
  {
    id: 'denise-pedra',
    label: 'Denise Pedra',
    re: /denise\s+pedra/i
  },
  {
    id: 'lauro-pontes',
    label: 'Lauro Pontes',
    re: /lauro\s+pontes/i
  },
  {
    id: 'aline-mendes',
    label: 'Aline Mendes',
    re: /aline\s+mendes/i
  },
  {
    id: 'aline-goulart',
    label: 'Aline Goulart',
    re: /aline\s+goulart/i
  },
  {
    id: 'leandro-ramires',
    label: 'Leandro Ramires',
    re: /leandro\s+ramires/i
  },
  {
    id: 'guilherme-martins',
    label: 'Guilherme Martins',
    re: /guilherme\s+martins/i
  },
  {
    id: 'helio-mororo',
    label: 'Hélio Mororó',
    re: /h[eé]lio\s+moror/i
  },
  {
    id: 'carol-marroni',
    label: 'Carol Marroni',
    re: /(?:^|[^\w])carol\s+marroni/i
  },
  {
    id: 'kassia-martins',
    label: 'Kassia Martins',
    re: /k[aá]ssia\s+martins/i
  },
  {
    id: 'ana-rouver',
    label: 'Ana Rouver',
    re: /ana\s+rouver/i
  },
  {
    id: 'danilo-massuela',
    label: 'Danilo Massuela',
    re: /danilo\s+massuela/i
  },
  {
    id: 'margarete-mota',
    label: 'Margarete Mota',
    re: /margarete\s+mota/i
  },
  {
    id: 'henrique-freire',
    label: 'Henrique Freire',
    re: /henrique\s+freire/i
  },
  {
    id: 'manoela-hisae',
    label: 'Manoela Hisae',
    re: /manoela\s+hisae/i
  },
  {
    id: 'ian-guedes',
    label: 'Ian Guedes',
    re: /ian\s+guedes/i
  },
  {
    id: 'felipe-de-castro',
    label: 'Felipe de Castro',
    re: /felipe\s+de\s+castro/i
  },
  {
    id: 'kaya-mind',
    label: 'Kaya Mind',
    re: /kaya\s+mind/i
  },
  {
    id: 'thiago-cardoso',
    label: 'Thiago Cardoso',
    re: /thiago\s+cardoso/i
  },
  {
    id: 'maria-eugenia',
    label: 'Maria Eugênia',
    re: /maria\s+eug[eê]nia/i
  },
  {
    id: 'eduardo-perin',
    label: 'Eduardo Perin',
    re: /eduardo\s+perin/i
  },
  {
    id: 'ursula-catarino',
    label: 'Úrsula Catarino',
    re: /[uú]rsula\s+catarino/i
  },
  {
    id: 'jimmy-fardin',
    label: 'Jimmy Fardin',
    re: /jimmy\s+fardin/i
  },
  {
    id: 'claudia-fegadolli',
    label: 'Claudia Fegadolli',
    re: /claudia\s+fegadolli/i
  },
  {
    id: 'pedro-melo',
    label: 'Pedro Melo',
    re: /pedro\s+melo/i
  },
  {
    id: 'hygor-cabral',
    label: 'Hygor Cabral',
    re: /hygor\s+cabral/i
  },
  {
    id: 'gustavo-maia',
    label: 'Gustavo Maia',
    re: /gustavo\s+maia/i
  },
  {
    id: 'monique-prado',
    label: 'Monique Prado',
    re: /monique\s+prado/i
  },
  {
    id: 'raul-thame',
    label: 'Raul Thame',
    re: /raul\s+thame/i
  },
  {
    id: 'andrea-galassi',
    label: 'Andrea Galassi',
    re: /andrea\s+galassi/i
  },
  {
    id: 'angela-aboin',
    label: 'Angela Aboin',
    re: /angela\s+aboin/i
  },
  {
    id: 'keka-richie',
    label: 'Keka Richie',
    re: /keka\s+richie/i
  },
  {
    id: 'janice-isabela',
    label: 'Janice Isabela',
    re: /janice\s+isabela/i
  },
  {
    id: 'robert-lorran',
    label: 'Robert Lorran',
    re: /robert\s+lorran/i
  },
  {
    id: 'bruno-perozzo',
    label: 'Bruno Perozzo',
    re: /bruno\s+perozzo/i
  },
  {
    id: 'fabio-mercante',
    label: 'Fábio Mercante',
    re: /f[aá]bio\s+mercante/i
  },
  {
    id: 'luiz-medina',
    label: 'Luiz Roberto Medina',
    re: /luiz\s+roberto\s+medina|luiz\s+medina/i
  },
  {
    id: 'edson-credidio',
    label: 'Edson Credidio',
    re: /edson\s+credidio/i
  },
  {
    id: 'diogo-oliveira',
    label: 'Diogo de Oliveira Silva',
    re: /diogo\s+de\s+oliveira/i
  },
  {
    id: 'carla-bruniera',
    label: 'Carla Bruniera',
    re: /carla\s+bruniera/i
  },
  {
    id: 'arthur-paes',
    label: 'Arthur Paes Barreto',
    re: /arthur\s+paes/i
  },
  {
    id: 'shiavone',
    label: 'Dr. Shiavone',
    re: /shiavone/i
  },
  {
    id: 'joaquim-daniel',
    label: 'Joaquim Daniel',
    re: /joaquim\s+daniel/i
  }
];

/** Alias UI: carol-marroni → carolina-marroni (uma série). */
const SERIES_MERGE = {
  'carol-marroni': 'carolina-marroni'
};

function professorsForTitle(title) {
  const t = String(title || '');
  const tags = [];
  const seen = new Set();
  for (let i = 0; i < PROFESSOR_RULES.length; i++) {
    const rule = PROFESSOR_RULES[i];
    if (!rule.re.test(t)) continue;
    const id = SERIES_MERGE[rule.id] || rule.id;
    if (seen.has(id)) continue;
    seen.add(id);
    tags.push(id);
  }
  return tags;
}

function loadMovrecamCatalog(root) {
  const file = path.join(root || ROOT, 'content', 'channels', 'movrecam.json');
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return { videos: [], channelId: '', channelUrl: '', channelName: 'MovReCam' };
  }
}

function categorizeMovrecamProfessors(root) {
  const catalog = loadMovrecamCatalog(root);
  const videos = Array.isArray(catalog.videos) ? catalog.videos : [];
  const byId = new Map();
  PROFESSOR_RULES.forEach((rule) => {
    const id = SERIES_MERGE[rule.id] || rule.id;
    if (byId.has(id)) return;
    byId.set(id, {
      id,
      label: rule.label,
      labelEn: rule.labelEn || rule.label,
      labelEs: rule.labelEs || rule.label,
      inspectionUrl: rule.inspectionUrl || null,
      count: 0,
      videos: []
    });
  });

  let taggedCount = 0;
  videos.forEach((v) => {
    if (!v || !v.id) return;
    const tags = professorsForTitle(v.title);
    if (!tags.length) return;
    taggedCount += 1;
    tags.forEach((id) => {
      const bucket = byId.get(id);
      if (!bucket) return;
      bucket.count += 1;
      bucket.videos.push({
        id: v.id,
        title: v.title || '',
        url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
        published: v.published || undefined
      });
    });
  });

  const professors = Array.from(byId.values())
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'pt-BR'));

  return {
    channelId: catalog.channelId || '',
    channelUrl: catalog.channelUrl || 'https://www.youtube.com/@MovReCam',
    channelName: catalog.channelName || 'MovReCam',
    catalogVideoCount: videos.length,
    taggedVideoCount: taggedCount,
    untaggedVideoCount: Math.max(0, videos.length - taggedCount),
    professorCount: professors.length,
    method:
      'Classificação exclusiva por regex no título do vídeo MovReCam (professores / palestrantes nomeados). Umário vídeo pode ter vários professores.',
    categorizedAt: new Date().toISOString(),
    summary: professors.map((p) => ({
      id: p.id,
      label: p.label,
      count: p.count,
      inspectionUrl: p.inspectionUrl
    })),
    professors
  };
}

function writeMovrecamProfessorsJson(root) {
  const doc = categorizeMovrecamProfessors(root);
  const out = path.join(root || ROOT, 'content', 'channels', 'movrecam-professores.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(doc, null, 2) + '\n', 'utf8');
  return { out, doc };
}

function professorSeriesOptions() {
  const doc = categorizeMovrecamProfessors();
  return doc.professors.map((p) => ({
    id: p.id,
    channel: 'movrecam',
    label: p.label,
    count: p.count
  }));
}

module.exports = {
  PROFESSOR_RULES,
  SERIES_MERGE,
  professorsForTitle,
  categorizeMovrecamProfessors,
  writeMovrecamProfessorsJson,
  professorSeriesOptions
};
