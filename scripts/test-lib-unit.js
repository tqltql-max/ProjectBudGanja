'use strict';

/**
 * Testes unitários leves — merge de inspeções e calculadoras (sem servidor).
 * Uso: npm run test:lib
 */

const { mergeGuiaInspecoesPosts, sortPublicPosts, GUIA_INSPECOES_POSTS } = require('../lib/merge-guia-inspecoes.js');
const { CHANNEL_INSPECOES_POSTS } = require('../lib/channel-inspecoes-posts.js');
const { EQUIPAMENTO_VERIFICACAO_POSTS } = require('../lib/equipamento-verificacao-posts.js');
const { FORMACAO_INSPECOES_POSTS } = require('../lib/formacao-inspecoes-posts.js');
const { getPublicPosts, toPublicFeedItem } = require('../lib/posts-service.js');
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

const base = [{ slug: 'inspecao-ventilacao-tenda', title: 'Ventilação', category: 'inspecao', published: true }];
const merged = mergeGuiaInspecoesPosts(base);
const guiaSlugs = GUIA_INSPECOES_POSTS.map((p) => p.slug);
const channelSlugs = CHANNEL_INSPECOES_POSTS.map((p) => p.slug);

assert('merge inclui inspeções guia', guiaSlugs.every((s) => merged.some((p) => p.slug === s)));
assert('merge inclui inspeção Jardim HG', merged.some((p) => p.slug === 'inspecao-canal-jardimhg'));
assert('merge inclui inspeção MovReCam', merged.some((p) => p.slug === 'inspecao-canal-movrecam'));
assert('merge inclui curso UNIFESP', merged.some((p) => p.slug === 'inspecao-curso-unifesp-cannabis-medicinal'));
assert('UNIFESP em formação acadêmica', merged.some((p) => p.slug === 'inspecao-curso-unifesp-cannabis-medicinal' && p.series === 'formacao-academica'));
assert('Mars Hydro em equipamentos', merged.some((p) => p.slug === 'inspecao-marshydro-brasil' && p.series === 'verificacao-equipamento'));
assert('ventilação em equipamentos', merged.some((p) => p.slug === 'inspecao-ventilacao-tenda' && p.series === 'verificacao-equipamento'));
assert('merge não duplica slugs', merged.length === new Set(merged.map((p) => p.slug)).size);

const publicInspec = getPublicPosts(merged)
  .filter((p) => p.category === 'inspecao')
  .map(toPublicFeedItem);
assert('12 inspeções publicadas', publicInspec.length === 12);

const expectedSeries = {
  'inspecao-cultivo-inicio': 'guia-cultivo-basico',
  'inspecao-nutricao-cannabis': 'guia-cultivo-basico',
  'inspecao-solo-vivo-organico': 'guia-cultivo-basico',
  'inspecao-arquitetura-cannabis': 'guia-cultivo-basico',
  'inspecao-ciencia-floracao': 'guia-cultivo-basico',
  'inspecao-propagacao-clonagem': 'guia-cultivo-basico',
  'inspecao-cultivo-indoor-ppfd': 'guia-cultivo-basico',
  'inspecao-canal-jardimhg': 'canal-jardimhg',
  'inspecao-canal-movrecam': 'canal-movrecam',
  'inspecao-ventilacao-tenda': 'verificacao-equipamento',
  'inspecao-marshydro-brasil': 'verificacao-equipamento',
  'inspecao-curso-unifesp-cannabis-medicinal': 'formacao-academica'
};
Object.keys(expectedSeries).forEach((slug) => {
  const post = publicInspec.find((p) => p.slug === slug);
  assert('categoria ' + slug, post && post.series === expectedSeries[slug], post ? post.series : 'em falta');
});

const inspecoes = sortPublicPosts(merged.filter((p) => p.category === 'inspecao'));
const firstGuia = inspecoes.find((p) => p.slug === 'inspecao-cultivo-inicio');
assert('seriesOrder guia #1', firstGuia && firstGuia.seriesOrder === 1);
const jardim = inspecoes.find((p) => p.slug === 'inspecao-canal-jardimhg');
assert('Jardim HG seriesOrder 10', jardim && jardim.seriesOrder === 10);
const movrecam = inspecoes.find((p) => p.slug === 'inspecao-canal-movrecam');
assert('MovReCam seriesOrder 11', movrecam && movrecam.seriesOrder === 11);

const jardimCatalog = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'content/channels/jardimhg.json'), 'utf8'));
assert('Jardim HG catálogo >= 30 vídeos', (jardimCatalog.videoCount || jardimCatalog.videos?.length || 0) >= 30);
const movrecamCatalog = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'content/channels/movrecam.json'), 'utf8'));
assert('MovReCam catálogo >= 100 vídeos', (movrecamCatalog.videoCount || movrecamCatalog.videos?.length || 0) >= 100);
assert('2 posts canais', CHANNEL_INSPECOES_POSTS.length === 2);

assert('2 posts equipamentos', EQUIPAMENTO_VERIFICACAO_POSTS.length === 2);
assert('1 post formação', FORMACAO_INSPECOES_POSTS.length === 1);
assert('7 posts guia', GUIA_INSPECOES_POSTS.length === 7);
assert('posts guia têm @youtube ou body', GUIA_INSPECOES_POSTS.every((p) => /@youtube\s+\S+/.test(p.content_raw || '')));

const { buildVideoObjectJson } = require('../lib/inspecao-post-extras.js');
const sample = GUIA_INSPECOES_POSTS[0];
const videoLd = buildVideoObjectJson(sample, sample.coverImage);
assert('VideoObject no guia #1', videoLd && videoLd['@type'] === 'VideoObject' && videoLd.embedUrl);
assert('guia #1 tem excerpt EN', !!sample.excerptEn);

const { publishStaticAssets } = require('../lib/publish-static.js');
publishStaticAssets(ROOT);
const feed = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'posts-public.json'), 'utf8'));
const guiaFeed = feed.find((p) => p.slug === 'inspecao-cultivo-inicio');
assert('posts-public tem series', guiaFeed && guiaFeed.series === 'guia-cultivo-basico');
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
