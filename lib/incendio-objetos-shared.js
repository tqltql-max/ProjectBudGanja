'use strict';

/**
 * Elos do cluster «objetos perigosos para controle de incêndio».
 * Marcas (Mars Hydro / Vivosun) × objectos da tenda × fogo / corte.
 */

const fs = require('fs');
const path = require('path');

const LINKS = {
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  hubAll: '/biblioteca/inspecoes/',
  guia: '/guia/palavras.html',
  objetos: '/objetos/',
  cultivo: '/cultivo/',
  vida: '/vida/',
  diario: '/vida/diario/',
  lux: '/calculadoras/luximetro.html',
  vpd: '/calculadoras/cultivo-lab.html?mode=vpd',
  watts: '/calculadoras/cultivo-lab.html?mode=watts-m2',
  mantra: '/posts/post-inspecao-expressao-faca-o-melhor.html',
  poemMantra: '/vida/#poema=faca-o-melhor',
  cluster: '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html',
  marsPalavra: '/posts/post-inspecao-palavra-mars-hydro.html',
  marsEquip: '/posts/post-inspecao-marshydro-brasil.html',
  vivosunPalavra: '/posts/post-inspecao-palavra-vivosun.html',
  vivosunEquip: '/posts/post-inspecao-vivosun.html',
  tenda: '/posts/post-inspecao-palavra-tenda.html',
  extintor: '/posts/post-inspecao-palavra-extintor.html',
  incendio: '/posts/post-inspecao-palavra-incendio.html',
  fonte: '/posts/post-inspecao-palavra-fonte.html',
  extensao: '/posts/post-inspecao-palavra-extensao.html',
  exaustor: '/posts/post-inspecao-palavra-exaustor.html',
  fogo: '/posts/post-inspecao-palavra-fogo.html',
  risco: '/posts/post-inspecao-palavra-risco.html',
  lampada: '/posts/post-inspecao-palavra-lampada.html',
  luz: '/posts/post-inspecao-palavra-luz.html',
  sol: '/posts/post-inspecao-palavra-sol.html',
  mar: '/posts/post-inspecao-palavra-mar.html',
  agua: '/posts/post-inspecao-palavra-agua.html',
  objetosPalavra: '/posts/post-inspecao-palavra-objetos.html',
  interruptor: '/posts/post-inspecao-palavra-interruptor.html',
  ligar: '/posts/post-inspecao-palavra-ligar-desligar.html',
  isqueiro: '/posts/post-inspecao-palavra-isqueiro-bic.html',
  cinzeiro: '/posts/post-inspecao-palavra-cinzeiro.html',
  ventilacao: '/posts/post-inspecao-ventilacao-tenda.html',
  skill: '/posts/post-inspecao-palavra-skill.html',
  gesto: '/posts/post-inspecao-palavra-gesto.html',
  caminho: '/posts/post-inspecao-palavra-caminho.html',
  verdade: '/posts/post-inspecao-palavra-verdade.html',
  idolo: '/posts/post-inspecao-palavra-idolo.html',
  lingua: '/posts/post-inspecao-palavra-lingua-portuguesa.html',
  xiaomi: '/posts/post-inspecao-palavra-xiaomi.html'
};

const DATE = '2026-08-21';
const DATE_ISO = '2026-08-21T18:00:00.000Z';

function pickPalavrasOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') {
      return existing.seriesOrder;
    }
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => p.seriesOrder)
        .filter((n) => typeof n === 'number')
    );
    const max = taken.size ? Math.max(...taken) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function pickVerificacaoOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') {
      return existing.seriesOrder;
    }
    const taken = new Set(
      posts
        .filter((p) => p.series === 'verificacao-equipamento')
        .map((p) => p.seriesOrder)
        .filter((n) => typeof n === 'number')
    );
    while (taken.has(seriesOrder) && seriesOrder < 80) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

module.exports = {
  LINKS,
  DATE,
  DATE_ISO,
  pickPalavrasOrder,
  pickVerificacaoOrder
};
