const CATEGORIES = {
  pesquisa: { label: 'Pesquisas', listPage: '/biblioteca/pesquisas/' },
  equipamento: { label: 'Equipamentos', listPage: '/equipamentos/' },
  inspecao: { label: 'Inspeções', listPage: '/biblioteca/inspecoes/' }
};

const ALLOWED = Object.keys(CATEGORIES);

function normalizeCategory(value, fallback) {
  if (ALLOWED.includes(value)) return value;
  return fallback || 'pesquisa';
}

function getCategoryMeta(category) {
  return CATEGORIES[normalizeCategory(category)] || CATEGORIES.pesquisa;
}

module.exports = { CATEGORIES, ALLOWED, normalizeCategory, getCategoryMeta };
