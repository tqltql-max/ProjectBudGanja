'use strict';

/**
 * Painel do rodapé: inspeções fáceis de entender para partilhar.
 * Prefere fichas conhecidas (artes, animais, plantas, palavras do dia)
 * em vez das últimas técnicas (artigos, RDC, cluster de incêndio).
 */

const LIMIT = 10;

const PINNED_SLUGS = [
  'inspecao-arte-bom-dia-inverno',
  'inspecao-arte-romeu-e-julieta',
  'inspecao-filme-the-matrix',
  'inspecao-serie-friends',
  'inspecao-serie-chaves-el-chavo',
  'inspecao-arte-o-alquimista',
  'inspecao-arte-santa-ceia',
  'inspecao-arte-under-pressure',
  'inspecao-filme-um-sonho-de-liberdade',
  'inspecao-animal-cao',
  'inspecao-animal-gato',
  'inspecao-animal-abelha',
  'inspecao-animal-galinha',
  'inspecao-planta-hortela',
  'inspecao-planta-camomila',
  'inspecao-planta-babosa',
  'inspecao-planta-morango',
  'inspecao-palavra-vida',
  'inspecao-palavra-agua',
  'inspecao-palavra-sol',
  'inspecao-palavra-coracao',
  'inspecao-expressao-faca-o-melhor',
  'inspecao-expressao-muito-obrigado',
  'inspecao-figura-william-shakespeare',
  'inspecao-tamara-klink',
  'inspecao-amyr-klink',
  'inspecao-personagem-inspetor'
];

const EASY_SERIES = {
  'artes-cultura': 1,
  'animais-catalogo': 1,
  'plantas-medicinais': 1,
  'plantas-frutos': 1,
  'vida-contos': 1,
  'expressoes-ditados': 1,
  'pessoas-historia': 1,
  'legado-pessoas': 1
};

const HARD_SERIES = {
  'artigos-cientificos': 1,
  neurociencias: 1,
  'verificacao-equipamento': 1,
  'formacao-academica': 1,
  'animais-derivados-risco': 1,
  'plantas-derivados-risco': 1,
  'animais-producao': 1,
  'loja-cultivo': 1,
  'loja-dermocosmetico': 1,
  'loja-streaming': 1,
  'insumos-cultivo': 1,
  'fungos-catalogo': 1,
  'pesquisa-laboratorio': 1
};

const EASY_EXPRESSAO = /faca-o-melhor|muito-obrigado|deus-abencoe|deu-certo|a-benca|dois-ouvidos|toda-crianca|desatar-o-no|elo-de-ligacao/;
const JOKE_SLUG = /duasak|eojsof|ausdhua|lista-f/;

const KIND_ORDER = ['arte', 'animal', 'planta', 'palavra', 'expressao', 'pessoa', 'conto', 'fruto'];

function shortTitle(title) {
  return String(title || '')
    .replace(/^Inspe[cç][aã]o:\s*/i, '')
    .replace(/^Inspection:\s*/i, '')
    .replace(/^Inspecci[oó]n:\s*/i, '')
    .replace(/^Divulga[cç][aã]o:\s*/i, '')
    .replace(/^Promotion:\s*/i, '')
    .replace(/^Divulgaci[oó]n:\s*/i, '')
    .replace(/^(Animal|Planta|Fruto|Plant|Fruit)\s+[—–-]\s+/i, '')
    .trim();
}

function kindOf(post) {
  const series = String((post && post.series) || '');
  const slug = String((post && post.slug) || '');
  if (series === 'artes-cultura' || /inspecao-arte-|inspecao-filme-|inspecao-serie-/.test(slug)) return 'arte';
  if (series === 'animais-catalogo' || /inspecao-animal-/.test(slug)) return 'animal';
  if (series === 'plantas-frutos') return 'fruto';
  if (series === 'plantas-medicinais' || /inspecao-planta-/.test(slug)) return 'planta';
  if (series === 'expressoes-ditados' || /inspecao-expressao-/.test(slug)) return 'expressao';
  if (series === 'palavras-origem' || /inspecao-palavra-/.test(slug)) return 'palavra';
  if (series === 'vida-contos' || /inspecao-conto-|inspecao-personagem-/.test(slug)) return 'conto';
  if (series === 'pessoas-historia' || series === 'legado-pessoas' || /inspecao-figura-|inspecao-tamara-|inspecao-amyr-/.test(slug)) {
    return 'pessoa';
  }
  return 'inspecao';
}

function isWeakCover(cover) {
  return !cover || /og-default|background-hero|icon-512|app-icon/i.test(String(cover));
}

function isEasyCandidate(post) {
  const slug = String((post && post.slug) || '');
  const series = String((post && post.series) || '');
  if (!slug || (post.category && post.category !== 'inspecao')) return false;
  if (HARD_SERIES[series]) return false;
  if (JOKE_SLUG.test(slug)) return false;
  if (PINNED_SLUGS.indexOf(slug) >= 0) return true;
  if (series === 'palavras-origem') return false;
  if (series === 'expressoes-ditados' && !EASY_EXPRESSAO.test(slug)) return false;
  if (isWeakCover(post.coverImage)) return false;
  return !!EASY_SERIES[series];
}

function toShareItem(post) {
  const kind = kindOf(post);
  return {
    slug: post.slug,
    url: post.url,
    title: shortTitle(post.title),
    titleEn: shortTitle(post.titleEn || post.title_en || ''),
    titleEs: shortTitle(post.titleEs || post.title_es || ''),
    excerpt: post.excerpt || '',
    excerptEn: post.excerptEn || post.excerpt_en || '',
    excerptEs: post.excerptEs || post.excerpt_es || '',
    coverImage: post.coverImage || '',
    date: post.date || '',
    series: post.series || '',
    kind: kind
  };
}

function pickShareableInspections(posts, limit) {
  const max = Math.max(1, Number(limit) || LIMIT);
  const inspecoes = (posts || []).filter(function (p) {
    return p && p.slug && (p.category || 'inspecao') === 'inspecao';
  });

  const scored = inspecoes.filter(isEasyCandidate).map(function (p) {
    const pinIdx = PINNED_SLUGS.indexOf(p.slug);
    const days = Date.parse(p.date || 0) / 86400000 || 0;
    const score = (pinIdx >= 0 ? 2000 - pinIdx : 0) + days / 40;
    return { p: p, score: score, kind: kindOf(p) };
  });

  scored.sort(function (a, b) {
    return b.score - a.score;
  });

  const picked = [];
  const used = Object.create(null);
  const kindCount = Object.create(null);

  function take(item) {
    if (!item || !item.p || used[item.p.slug]) return;
    used[item.p.slug] = true;
    kindCount[item.kind] = (kindCount[item.kind] || 0) + 1;
    picked.push(item.p);
  }

  KIND_ORDER.forEach(function (kind) {
    if (picked.length >= max) return;
    const hit = scored.find(function (s) {
      return s.kind === kind && !used[s.p.slug];
    });
    if (hit) take(hit);
  });

  scored.forEach(function (s) {
    if (picked.length >= max) return;
    if ((kindCount[s.kind] || 0) >= 2) return;
    take(s);
  });

  scored.forEach(function (s) {
    if (picked.length >= max) return;
    take(s);
  });

  return picked.slice(0, max).map(toShareItem);
}

module.exports = {
  LIMIT,
  PINNED_SLUGS,
  pickShareableInspections,
  shortTitle,
  kindOf
};
