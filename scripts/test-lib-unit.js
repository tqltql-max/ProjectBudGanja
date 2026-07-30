'use strict';

/**
 * Testes unitários leves — merge de inspeções e calculadoras (sem servidor).
 * Uso: npm run test:lib
 */

const { mergeGuiaInspecoesPosts, sortPublicPosts, GUIA_INSPECOES_POSTS, REMOVED_INSPECAO_SLUGS } = require('../lib/merge-guia-inspecoes.js');
const { CHANNEL_INSPECOES_POSTS } = require('../lib/channel-inspecoes-posts.js');
const { CALCULADORAS, getCalculadoraUrl } = require('../lib/calculadoras-registry.js');
const { ROOT } = require('../lib/paths.js');

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('  OK  ' + name);
  } else {
    failed += 1;
    console.error(' FAIL ' + name + (detail ? ' — ' + detail : ''));
  }
}

console.log('=== Testes unitários (lib) ===\n');

const base = [
  { slug: 'inspecao-ventilacao-tenda', title: 'Ventilação', category: 'inspecao', published: true, seriesOrder: 20 },
  {
    slug: 'inspecao-canal-jardimhg',
    title: 'Removido',
    category: 'inspecao',
    published: true,
    series: 'canal-jardimhg'
  },
  {
    slug: 'inspecao-cultivo-inicio',
    title: 'Início (removido)',
    category: 'inspecao',
    published: true,
    series: 'guia-cultivo-basico',
    seriesOrder: 1
  },
  {
    slug: 'inspecao-canal-inspetorbudganja',
    title: 'Canal oficial (removido)',
    category: 'inspecao',
    published: true,
    series: 'canal-inspetorbudganja',
    seriesOrder: 3
  },
  {
    slug: 'inspecao-canal-plantamemo',
    title: 'Plantamemo (removido)',
    category: 'inspecao',
    published: true,
    series: 'canal-plantamemo',
    seriesOrder: 4
  },
  {
    slug: 'inspecao-canal-movrecam',
    title: 'MovReCam',
    category: 'inspecao',
    published: true,
    series: 'canal-movrecam',
    seriesOrder: 11
  }
];
const merged = mergeGuiaInspecoesPosts(base);

assert('merge filtra Jardim HG removido', !merged.some((p) => p.slug === 'inspecao-canal-jardimhg'));
assert('merge filtra guia de cultivo', !merged.some((p) => p.slug === 'inspecao-cultivo-inicio'));
assert('merge filtra série guia-cultivo-basico', !merged.some((p) => p.series === 'guia-cultivo-basico'));
assert('merge filtra Inspetor BudGanja', !merged.some((p) => p.slug === 'inspecao-canal-inspetorbudganja'));
assert('merge filtra Plantamemo', !merged.some((p) => p.slug === 'inspecao-canal-plantamemo'));
assert('merge mantém ventilação', merged.some((p) => p.slug === 'inspecao-ventilacao-tenda'));
assert('merge mantém MovReCam', merged.some((p) => p.slug === 'inspecao-canal-movrecam'));
assert('merge não duplica slugs', merged.length === new Set(merged.map((p) => p.slug)).size);

const inspecoes = sortPublicPosts(merged.filter((p) => p.category === 'inspecao'));
const movrecam = inspecoes.find((p) => p.slug === 'inspecao-canal-movrecam');
assert('MovReCam seriesOrder 11', movrecam && movrecam.seriesOrder === 11);

assert('posts guia builtin vazios', GUIA_INSPECOES_POSTS.length === 0);
assert('slugs guia em REMOVED', REMOVED_INSPECAO_SLUGS.has('inspecao-cultivo-inicio'));
assert('slugs canal oficial em REMOVED', REMOVED_INSPECAO_SLUGS.has('inspecao-canal-inspetorbudganja'));
assert('slugs Plantamemo em REMOVED', REMOVED_INSPECAO_SLUGS.has('inspecao-canal-plantamemo'));
assert('slugs BioBizz em REMOVED', REMOVED_INSPECAO_SLUGS.has('inspecao-insumo-biobizz'));
assert('slugs Flora Urbana em REMOVED', REMOVED_INSPECAO_SLUGS.has('inspecao-loja-floraurbana'));
assert('2 inspeções de canal (builtin)', CHANNEL_INSPECOES_POSTS.length === 2);
assert('builtin sem Jardim HG', !CHANNEL_INSPECOES_POSTS.some((p) => /jardimhg/i.test(p.slug || '')));
assert('builtin sem Inspetor BudGanja', !CHANNEL_INSPECOES_POSTS.some((p) => p.slug === 'inspecao-canal-inspetorbudganja'));
assert('builtin sem Plantamemo', !CHANNEL_INSPECOES_POSTS.some((p) => p.slug === 'inspecao-canal-plantamemo'));
assert('builtin inclui MovReCam', CHANNEL_INSPECOES_POSTS.some((p) => p.slug === 'inspecao-canal-movrecam'));
assert('builtin inclui CANABinALL', CHANNEL_INSPECOES_POSTS.some((p) => p.slug === 'inspecao-canal-canabinall'));

const { buildVideoObjectJson } = require('../lib/inspecao-post-extras.js');
const sample = CHANNEL_INSPECOES_POSTS[0];
const videoLd = buildVideoObjectJson(sample, sample.coverImage);
assert('VideoObject no canal #1', !videoLd || (videoLd['@type'] === 'VideoObject' && videoLd.embedUrl));

const { publishStaticAssets } = require('../lib/publish-static.js');
publishStaticAssets(ROOT);
const feed = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'posts-public.json'), 'utf8'));
assert(
  'posts-public sem canais removidos',
  !feed.some(
    (p) =>
      p.series === 'guia-cultivo-basico' ||
      p.series === 'canal-inspetorbudganja' ||
      p.series === 'canal-plantamemo' ||
      p.slug === 'inspecao-cultivo-inicio' ||
      p.slug === 'inspecao-canal-inspetorbudganja' ||
      p.slug === 'inspecao-canal-plantamemo'
  )
);
assert('posts-public coverImage absoluto', !feed.some((p) => p.coverImage && !p.coverImage.startsWith('/') && !/^https?:/i.test(p.coverImage)));

assert('calculadoras registry', CALCULADORAS.length === 3);
const cultivoLab = CALCULADORAS.find((c) => c.slug === 'cultivo-lab');
assert('cultivo-lab featured', cultivoLab && cultivoLab.featured === true);
assert('cultivo-lab URL custom', getCalculadoraUrl(cultivoLab) === '/calculadoras/cultivo-lab.html');
CALCULADORAS.forEach((c) => {
  const url = getCalculadoraUrl(c);
  assert('URL ' + c.slug, url.startsWith('/calculadoras/') && url.endsWith('.html'));
});

console.log('\n=== Resultado: ' + passed + ' OK, ' + failed + ' falhas ===');
process.exit(failed ? 1 : 0);
