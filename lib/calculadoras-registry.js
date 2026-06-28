'use strict';

/** Registo central das calculadoras — usado pelo gerador de páginas, sitemap e busca. */
const CALCULADORA_CATEGORIES = ['Ambiente', 'Substrato', 'Nutrição', 'Energia'];

const CALCULADORAS = [
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
    slug: 'vpd',
    title: 'Calculadora de VPD',
    shortTitle: 'VPD',
    description: 'Calcule o Déficit de Pressão de Vapor para otimizar o ambiente de cultivo.',
    category: 'Ambiente',
    dataPage: 'calculadora-vpd',
    script: 'vpd.js',
    keywords: 'vpd vapor umidade temperatura'
  },
  {
    slug: 'dli',
    title: 'Calculadora de DLI',
    shortTitle: 'DLI',
    description: 'Calcule o Integral de Luz Diária a partir do PPFD e fotoperíodo.',
    category: 'Ambiente',
    dataPage: 'calculadora-dli',
    script: 'dli.js',
    keywords: 'dli ppfd fotoperíodo luz'
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
  },
  {
    slug: 'volume-vaso',
    title: 'Volume do Vaso',
    shortTitle: 'Volume do Vaso',
    tileLabel: 'Vaso',
    description: 'Calcule o volume em litros a partir das dimensões do vaso.',
    category: 'Substrato',
    dataPage: 'calculadora-volume-vaso',
    script: 'volume-vaso.js',
    keywords: 'vaso volume litros substrato'
  },
  {
    slug: 'ec',
    title: 'Calculadora de EC',
    shortTitle: 'EC',
    description: 'Calcule a Condutividade Elétrica e converta para PPM.',
    category: 'Nutrição',
    dataPage: 'calculadora-ec',
    script: 'ec.js',
    keywords: 'ec condutividade ppm nutrientes'
  },
  {
    slug: 'diluicao',
    title: 'Calculadora de Diluição',
    shortTitle: 'Diluição',
    description: 'Calcule quanto diluir sua solução concentrada.',
    category: 'Nutrição',
    dataPage: 'calculadora-diluicao',
    script: 'diluicao.js',
    keywords: 'diluição ec nutrientes'
  },
  {
    slug: 'ph',
    title: 'Faixa Ideal de pH',
    shortTitle: 'pH',
    description: 'Verifique se o pH da sua solução está na faixa ideal para cada fase e meio de cultivo.',
    category: 'Nutrição',
    dataPage: 'calculadora-ph',
    script: 'ph.js',
    keywords: 'ph solo coco hidroponia'
  },
  {
    slug: 'energia',
    title: 'Custo de Energia',
    shortTitle: 'Custo de Energia',
    tileLabel: 'Energia',
    description: 'Calcule o custo mensal de eletricidade do seu cultivo indoor.',
    category: 'Energia',
    dataPage: 'calculadora-energia',
    script: 'energia.js',
    keywords: 'energia kwh custo luz'
  },
  {
    slug: 'watts-m2',
    title: 'Watts por m²',
    shortTitle: 'Watts por m²',
    tileLabel: 'W/m²',
    description: 'Verifique se a potência luminosa está adequada para a área do seu cultivo.',
    category: 'Energia',
    dataPage: 'calculadora-watts-m2',
    script: 'watts-m2.js',
    keywords: 'watts potência área led'
  }
];

function getCalculadoraBySlug(slug) {
  return CALCULADORAS.find((c) => c.slug === slug) || null;
}

function getCalculadoraUrl(calc) {
  if (calc.customPage && calc.slug === 'luximetro') {
    return '/calculadoras/luximetro.html';
  }
  return '/calculadoras/' + calc.slug + '.html';
}

module.exports = {
  CALCULADORA_CATEGORIES,
  CALCULADORAS,
  getCalculadoraBySlug,
  getCalculadoraUrl
};
