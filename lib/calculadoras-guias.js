'use strict';

/** Mapa calculadora → publicação de guia de uso (categoria pesquisa). */
const CALCULADORA_GUIAS = {
  luximetro: {
    postSlug: 'guia-calculadora-luximetro',
    title: 'Luxímetro: Guia de Uso'
  },
  vpd: {
    postSlug: 'calculadora-vpd-guia-laboratorio',
    title: 'Calculadora VPD: Guia de Uso'
  },
  dli: {
    postSlug: 'guia-calculadora-dli',
    title: 'Calculadora DLI: Guia de Uso'
  },
  'super-solo': {
    postSlug: 'guia-calculadora-super-solo',
    title: 'Super Solo: Guia de Uso'
  },
  'volume-vaso': {
    postSlug: 'guia-calculadora-volume-vaso',
    title: 'Volume do Vaso: Guia de Uso'
  },
  ec: {
    postSlug: 'guia-calculadora-ec',
    title: 'Calculadora EC: Guia de Uso'
  },
  diluicao: {
    postSlug: 'guia-calculadora-diluicao',
    title: 'Diluição: Guia de Uso'
  },
  ph: {
    postSlug: 'guia-calculadora-ph',
    title: 'Faixa de pH: Guia de Uso'
  },
  energia: {
    postSlug: 'guia-calculadora-energia',
    title: 'Custo de Energia: Guia de Uso'
  },
  'watts-m2': {
    postSlug: 'guia-calculadora-watts-m2',
    title: 'Watts por m²: Guia de Uso'
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
