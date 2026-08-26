'use strict';

/** Mapa calculadora → guia de uso (posts com series guia-ferramenta). */
const CALCULADORA_GUIAS = {
  luximetro: {
    postSlug: 'guia-calculadora-luximetro',
    title: 'Luxímetro: Guia de Uso'
  },
  'super-solo': {
    postSlug: 'guia-calculadora-super-solo',
    title: 'Super Solo: Guia de Uso'
  }
};

function getGuiaForCalc(calcSlug) {
  return CALCULADORA_GUIAS[calcSlug] || null;
}

function getGuiaPostUrl(calcSlug) {
  const guia = getGuiaForCalc(calcSlug);
  if (!guia) return null;
  return '/posts/post-' + guia.postSlug + '.html';
}

module.exports = {
  CALCULADORA_GUIAS,
  getGuiaForCalc,
  getGuiaPostUrl
};
