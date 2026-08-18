'use strict';

/**
 * Temas do canal Amyr Klink (@amyrklinkoficial).
 * Só pelo título. Pessoa ≠ canal — a ficha de legado fica em Pessoas.
 */

const CATEGORIES = [
  {
    id: 'paratii',
    label: 'Paratii e barcos',
    labelEn: 'Paratii and boats',
    labelEs: 'Paratii y barcos'
  },
  {
    id: 'antartida',
    label: 'Antártida e gelo',
    labelEn: 'Antarctica and ice',
    labelEs: 'Antártida y hielo'
  },
  {
    id: 'atlantico',
    label: 'Atlântico e travessias',
    labelEn: 'Atlantic and crossings',
    labelEs: 'Atlántico y travesías'
  },
  {
    id: 'palestra',
    label: 'Palestras',
    labelEn: 'Talks',
    labelEs: 'Charlas'
  },
  {
    id: 'livro',
    label: 'Livros e ofício',
    labelEn: 'Books and craft',
    labelEs: 'Libros y oficio'
  },
  {
    id: 'familia',
    label: 'Família',
    labelEn: 'Family',
    labelEs: 'Familia'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  familia: (t) => /tamara|filha|fam[ií]lia|marina|laura/i.test(t),
  paratii: (t) => /paratii|barco|veleiro|iat\b/i.test(t),
  antartida: (t) => /ant[aá]rti|gelo|polar|invern/i.test(t),
  atlantico: (t) => /atl[aâ]ntic|remo|cem dias|c[eé]u e mar/i.test(t),
  palestra: (t) => /palestra|lecture|talk|entrevista|lideran[cç]|planej/i.test(t),
  livro: (t) => /livro|book|escrev|cem dias/i.test(t)
};

const ORDER = ['familia', 'paratii', 'antartida', 'atlantico', 'palestra', 'livro', 'outros'];

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
  const n = (videos || []).length;
  const familyChip =
    n > 0
      ? [
          {
            id: 'familia-pai',
            channel: 'amyr',
            label: 'Pai · Amyr',
            labelEn: 'Father · Amyr',
            labelEs: 'Padre · Amyr',
            count: n
          }
        ]
      : [];
  return familyChip.concat(
    CATEGORIES.filter((c) => counts[c.id]).map((c) => ({
      id: c.id,
      channel: 'amyr',
      label: c.label,
      labelEn: c.labelEn,
      labelEs: c.labelEs,
      count: counts[c.id]
    }))
  );
}

module.exports = {
  CATEGORIES,
  categorizeTitle,
  categoryMeta,
  seriesOptionsFromVideos
};
