'use strict';

/** Registo central das calculadoras — usado pelo gerador de páginas, sitemap e busca. */
const CALCULADORA_CATEGORIES = ['Ambiente', 'Substrato', 'Nutrição', 'Energia'];

const CULTIVO_LAB_URL = '/calculadoras/cultivo-lab.html';

const CALCULADORAS = [
  {
    slug: 'cultivo-lab',
    title: 'Super Calculadora de Cultivo',
    shortTitle: 'Super Calc',
    tileLabel: 'Super Calc',
    description: 'VPD, DLI, pH, EC, diluição, volume de vaso, W/m² e energia numa só ferramenta — modos em botões como calculadora científica.',
    category: 'Ambiente',
    featured: true,
    customPage: true,
    dataPage: 'calculadora-cultivo-lab',
    keywords: 'super calculadora cultivo vpd dli ph ec'
  },
  {
    slug: 'luximetro',
    title: 'Luxímetro (Câmera)',
    shortTitle: 'Luxímetro',
    description: 'Meça a intensidade luminosa em tempo real usando a câmera do celular. Estime PPFD e lux.',
    category: 'Ambiente',
    featured: true,
    customPage: true,
    keywords: 'luxímetro ppfd luz câmera'
  },
  {
    slug: 'super-solo',
    title: 'Calculadora de Super Solo',
    shortTitle: 'Super Solo',
    tileLabel: 'Solo',
    description: 'Calcule dosagens de amendments (gramas e ml) para super solo orgânico a partir do volume de substrato.',
    category: 'Substrato',
    dataPage: 'calculadora-super-solo',
    script: 'super-solo.js',
    keywords: 'super solo substrato orgânico'
  }
];

function getCalculadoraBySlug(slug) {
  return CALCULADORAS.find((c) => c.slug === slug) || null;
}

function getCultivoLabModeUrl(mode) {
  if (!mode) return CULTIVO_LAB_URL;
  return CULTIVO_LAB_URL + '?mode=' + encodeURIComponent(mode);
}

function getCalculadoraUrl(calc) {
  if (calc.customPage && calc.slug === 'luximetro') {
    return '/calculadoras/luximetro.html';
  }
  if (calc.customPage && calc.slug === 'cultivo-lab') {
    return CULTIVO_LAB_URL;
  }
  return '/calculadoras/' + calc.slug + '.html';
}

module.exports = {
  CALCULADORA_CATEGORIES,
  CALCULADORAS,
  CULTIVO_LAB_URL,
  getCalculadoraBySlug,
  getCalculadoraUrl,
  getCultivoLabModeUrl
};
