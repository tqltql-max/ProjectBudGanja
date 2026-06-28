'use strict';

const {
  CALCULADORAS,
  getCalculadoraUrl
} = require('./calculadoras-registry.js');
const { CLONADORA_SUBMENU } = require('./clonadoras-nav.js');

const CATEGORY_ICONS = {
  Ambiente: '🌡️',
  Substrato: '🪴',
  'Nutrição': '💧',
  Energia: '⚡'
};

const CALC_ICONS = {
  'cultivo-lab': '🧪',
  luximetro: '📷',
  'super-solo': '🪴'
};

function buildFerramentasNavItem() {
  const calcItems = [
    {
      label: 'Todas as calculadoras',
      tileLabel: 'Índice',
      href: '/calculadoras/',
      icon: '🧮',
      slug: 'calculadoras',
      featured: true,
      description: 'Índice com todas as ferramentas numéricas.'
    },
    ...CALCULADORAS.map((calc) => ({
      label: calc.tileLabel || calc.shortTitle,
      href: getCalculadoraUrl(calc),
      icon: CALC_ICONS[calc.slug] || '🧮',
      slug: calc.slug,
      featured: !!calc.featured,
      description: calc.description || ''
    }))
  ];

  const equipItems = [
    {
      label: 'Todos os equipamentos',
      tileLabel: 'Índice',
      href: '/equipamentos/',
      icon: '🛠️',
      slug: 'equipamentos',
      featured: true,
      description: 'Clonadoras caseiras documentadas.'
    },
    CLONADORA_SUBMENU,
    {
      label: 'Loja parceira',
      tileLabel: 'Loja',
      href: '/loja/',
      icon: '🛒',
      slug: 'loja',
      description: 'Materiais usados em campo e no laboratório.'
    }
  ];

  return {
    label: 'Ferramentas',
    mega: true,
    megaCompact: true,
    megaAccordion: true,
    megaHeader: 'Ferramentas',
    megaHeaderHref: '/calculadoras/',
    groups: [
      {
        title: '',
        items: [
          {
            label: 'Calculadoras',
            tileLabel: 'Calculadoras',
            icon: '🧮',
            slug: 'calculadoras-menu',
            submenu: true,
            children: calcItems
          },
          {
            label: 'Equipamentos',
            tileLabel: 'Equipamentos',
            icon: '🛠️',
            slug: 'equipamentos-menu',
            submenu: true,
            children: equipItems
          }
        ]
      }
    ]
  };
}

function mergeFerramentasNav(nav) {
  if (!Array.isArray(nav)) return nav;
  const ferramentas = buildFerramentasNavItem();
  const index = nav.findIndex((item) => item && item.label === 'Ferramentas');
  if (index === -1) return nav.concat([ferramentas]);
  const next = nav.slice();
  next[index] = ferramentas;
  return next;
}

module.exports = {
  buildFerramentasNavItem,
  mergeFerramentasNav,
  CATEGORY_ICONS,
  CALC_ICONS
};
