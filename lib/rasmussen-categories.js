'use strict';

/**
 * Temas do canal Richard Rasmussen Selvagem (@RichardRasmussenSelvagem).
 * Só pelo título. Pessoa ≠ canal — a ficha de legado fica em Pessoas.
 */

const CATEGORIES = [
  {
    id: 'recebe',
    label: 'Richard Recebe',
    labelEn: 'Richard Recebe',
    labelEs: 'Richard Recebe'
  },
  {
    id: 'saude',
    label: 'Saúde e alimentação',
    labelEn: 'Health and food',
    labelEs: 'Salud y alimentación'
  },
  {
    id: 'indigena',
    label: 'Povos e caça',
    labelEn: 'Peoples and hunting',
    labelEs: 'Pueblos y caza'
  },
  {
    id: 'expedicao',
    label: 'Expedições',
    labelEn: 'Expeditions',
    labelEs: 'Expediciones'
  },
  {
    id: 'serpentes',
    label: 'Serpentes',
    labelEn: 'Snakes',
    labelEs: 'Serpientes'
  },
  {
    id: 'felinos',
    label: 'Felinos',
    labelEn: 'Big cats',
    labelEs: 'Felinos'
  },
  {
    id: 'caes',
    label: 'Cães e raças',
    labelEn: 'Dogs and breeds',
    labelEs: 'Perros y razas'
  },
  {
    id: 'aves',
    label: 'Aves',
    labelEn: 'Birds',
    labelEs: 'Aves'
  },
  {
    id: 'repteis',
    label: 'Répteis e aquáticos',
    labelEn: 'Reptiles and aquatic',
    labelEs: 'Reptiles y acuáticos'
  },
  {
    id: 'peixes',
    label: 'Peixes e rios',
    labelEn: 'Fish and rivers',
    labelEs: 'Peces y ríos'
  },
  {
    id: 'agro',
    label: 'Campo e gado',
    labelEn: 'Farm and cattle',
    labelEs: 'Campo y ganado'
  },
  {
    id: 'criacao',
    label: 'Criação e ofício',
    labelEn: 'Breeding and craft',
    labelEs: 'Cría y oficio'
  },
  {
    id: 'biomas',
    label: 'Biomas do Brasil',
    labelEn: 'Brazilian biomes',
    labelEs: 'Biomas de Brasil'
  },
  {
    id: 'mundo',
    label: 'Mundo selvagem',
    labelEn: 'Wild world',
    labelEs: 'Mundo salvaje'
  },
  {
    id: 'outros',
    label: 'Outros',
    labelEn: 'Other',
    labelEs: 'Otros'
  }
];

const TESTS = {
  recebe: (t) => /richard recebe|recebendo |recebe #/i.test(t),
  saude: (t) =>
    /sa[uú]de|carne|leite|ovo\b|gordura|metabolismo|vegan|vegetais|mitoc[oô]ndria|refei[cç]|beta oxida|visceral|calcio|c[aá]lcio|\bsal\b|digere/i.test(
      t
    ),
  indigena: (t) => /ind[ií]gen|daldeia|ca[cç]a ind/i.test(t),
  expedicao: (t) =>
    /expedi[cç]|pororoca|madagascar|costa rica|rond[oô]nia|am[eé]rica do norte|bastidores selvagens/i.test(
      t
    ),
  serpentes: (t) =>
    /serpente|cobra|jib[oó]ia|sucuri|cascavel|p[ií]ton|python|naja|of[ií]dio|nariz de porco|\bsnakes?\b|boa constrictor|brazilian boas|🐍/i.test(
      t
    ),
  felinos: (t) =>
    /on[cç]a|jaguar|le[aã]o|\blion\b|tigre|\btiger\b|puma|jaguatirica|leopardo|maine coon|\bcats?\b|gato\b|🐱|🐈|🦁/i.test(
      t
    ),
  caes: (t) =>
    /c[aã]o\b|c[aã]es\b|cachorro|\bdogs?\b|ra[cç]as? de|pit ?bull|pastor alem|zaguate|bully|mastiff|beagle|chihuahua|pomer[aâ]n|griffon|alabai|buldogue|🐶|🐕|🐩/i.test(
      t
    ),
  aves: (t) =>
    /\baves?\b|gavi[aã]o|arara|tucano|urubu|galinha|can[aá]rio|pinguim|penguin|pomb[oa]|ornitolog|🐦|🐤|🐧|🐔|🦋/i.test(
      t
    ),
  repteis: (t) =>
    /jacar[eé]|crocodilo|caiman|alig[aá]tor|lagarto|lagartixa|tartaruga|turtle|tubar[aã]o|shark|camale[aã]o|iguana|🐊|🐢|🦈|🦎/i.test(
      t
    ),
  peixes: (t) => /til[aá]pia|piranha|boto|peixe|\bfish|pesca|fishing|anzol|gente da [aá]gua|🐟|🎣/i.test(t),
  agro: (t) =>
    /boi\b|rodeio|gado|pecu[aá]ria|vaca|fazenda|s[ií]tio|lavoura|agribusiness|eucalipto|eucalyptus|soja|milho|tomate|cavalo|horse|pony|campolina|frisian|fris[aã]o|🐄|🐴|🐎|🚜/i.test(
      t
    ),
  criacao: (t) =>
    /cria[cç][aã]o|criadouro|silvestres?|breeder|santu[aá]rio|sanctuary|elefante|elephant|rinoceronte|rhino|aranha|spider/i.test(
      t
    ),
  biomas: (t) => /amaz[oô]n|pantanal|cerrado|bioma|mata atl[aâ]ntica|transamaz/i.test(t),
  mundo: (t) =>
    /[aá]frica|savana|safari|australia|índia|india|china|am[eé]rica do|costa rica|madagascar/i.test(
      t
    )
};

const ORDER = [
  'recebe',
  'saude',
  'indigena',
  'expedicao',
  'serpentes',
  'felinos',
  'caes',
  'aves',
  'repteis',
  'peixes',
  'agro',
  'criacao',
  'biomas',
  'mundo',
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
    channel: 'rasmussen',
    label: c.label,
    labelEn: c.labelEn,
    labelEs: c.labelEs,
    count: counts[c.id]
  }));
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
      'Biólogo, aventureiro e jornalista — arquivo público de fauna, expedições e ofício selvagem. Pessoa ≠ canal. Sem afiliação.',
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
