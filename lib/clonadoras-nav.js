'use strict';

/** Itens folha — guias / equipamentos separados por capacidade */
const CLONADORA_GUIDE_ITEMS = [
  {
    label: 'Clonadora de 6 estacas',
    tileLabel: '6 estacas',
    href: '/equipamentos/clonadora-6-estacas.html',
    icon: '🌱',
    slug: 'clonadora-6',
    featured: false,
    description: 'Pote de sorvete, bucha de louça e bombinha 24 h.'
  },
  {
    label: 'Clonadora de 12 estacas',
    tileLabel: '12 estacas',
    href: '/equipamentos/clonadora-12-estacas.html',
    icon: '💧',
    slug: 'clonadora-12',
    featured: false,
    description: 'Balde, bomba submersa e kit de microaspersores.'
  }
];

/** Bloco com segundo nível no mega menu (Clonadoras → 6 / 12) */
const CLONADORA_SUBMENU = {
  label: 'Clonadoras',
  tileLabel: 'Clonadoras',
  icon: '🌱',
  slug: 'clonadoras',
  submenu: true,
  children: CLONADORA_GUIDE_ITEMS
};

module.exports = {
  CLONADORA_GUIDE_ITEMS,
  CLONADORA_SUBMENU
};
