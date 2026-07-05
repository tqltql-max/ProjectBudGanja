'use strict';

/**
 * Testes unitários leves — merge de inspeções e calculadoras (sem servidor).
 * Uso: npm run test:lib
 */

const { mergeGuiaInspecoesPosts, sortPublicPosts, GUIA_INSPECOES_POSTS } = require('../lib/merge-guia-inspecoes.js');
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

const base = [{ slug: 'inspecao-ventilacao-tenda', title: 'Ventilação', category: 'inspecao', published: true }];
const merged = mergeGuiaInspecoesPosts(base);
const guiaSlugs = GUIA_INSPECOES_POSTS.map((p) => p.slug);
const channelSlugs = CHANNEL_INSPECOES_POSTS.map((p) => p.slug);

assert('merge inclui inspeções guia', guiaSlugs.every((s) => merged.some((p) => p.slug === s)));
assert('merge inclui inspeção Jardim HG', merged.some((p) => p.slug === 'inspecao-canal-jardimhg'));
assert('merge mantém ventilação', merged.some((p) => p.slug === 'inspecao-ventilacao-tenda'));
assert('merge não duplica slugs', merged.length === new Set(merged.map((p) => p.slug)).size);

const inspecoes = sortPublicPosts(merged.filter((p) => p.category === 'inspecao'));
const firstGuia = inspecoes.find((p) => p.slug === 'inspecao-cultivo-inicio');
assert('seriesOrder guia #1', firstGuia && firstGuia.seriesOrder === 1);
const jardim = inspecoes.find((p) => p.slug === 'inspecao-canal-jardimhg');
assert('Jardim HG seriesOrder 10', jardim && jardim.seriesOrder === 10);

const jardimCatalog = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'content/channels/jardimhg.json'), 'utf8'));
assert('Jardim HG catálogo >= 30 vídeos', (jardimCatalog.videoCount || jardimCatalog.videos?.length || 0) >= 30);

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
