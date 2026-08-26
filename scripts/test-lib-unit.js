'use strict';

/**
 * Testes unitários leves — merge de inspeções e calculadoras (sem servidor).
 * Uso: npm run test:lib
 */

const { mergeGuiaInspecoesPosts, sortPublicPosts, GUIA_INSPECOES_POSTS } = require('../lib/merge-guia-inspecoes.js');
const { CHANNEL_INSPECOES_POSTS } = require('../lib/channel-inspecoes-posts.js');
const { CALCULADORAS, getCalculadoraUrl } = require('../lib/calculadoras-registry.js');
const { getPublicPosts, getAdminListedPosts } = require('../lib/posts-service.js');
const { ROOT } = require('../lib/paths.js');
const fs = require('fs');
const path = require('path');

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
assert('merge inclui inspeção canal oficial', merged.some((p) => p.slug === 'inspecao-canal-inspetorbudganja'));
assert('merge mantém ventilação', merged.some((p) => p.slug === 'inspecao-ventilacao-tenda'));
assert('merge não duplica slugs', merged.length === new Set(merged.map((p) => p.slug)).size);

const inspecoes = sortPublicPosts(merged.filter((p) => p.category === 'inspecao'));
const firstGuia = inspecoes.find((p) => p.slug === 'inspecao-cultivo-inicio');
assert('seriesOrder guia #1', firstGuia && firstGuia.seriesOrder === 1);
const jardim = inspecoes.find((p) => p.slug === 'inspecao-canal-jardimhg');
assert('Jardim HG seriesOrder 10', jardim && jardim.seriesOrder === 10);
const canalOficial = inspecoes.find((p) => p.slug === 'inspecao-canal-inspetorbudganja');
assert('canal oficial seriesOrder 3', canalOficial && canalOficial.seriesOrder === 3);

const jardimCatalog = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'content/channels/jardimhg.json'), 'utf8'));
assert('Jardim HG catálogo >= 30 vídeos', (jardimCatalog.videoCount || jardimCatalog.videos?.length || 0) >= 30);

assert('7 posts guia', GUIA_INSPECOES_POSTS.length === 7);
assert('2 inspeções de canal', CHANNEL_INSPECOES_POSTS.length === 2);
assert('posts guia têm @youtube ou body', GUIA_INSPECOES_POSTS.every((p) => /@youtube\s+\S+/.test(p.content_raw || '')));

const { buildVideoObjectJson } = require('../lib/inspecao-post-extras.js');
const sample = GUIA_INSPECOES_POSTS[0];
const videoLd = buildVideoObjectJson(sample, sample.coverImage);
assert('VideoObject no guia #1', videoLd && videoLd['@type'] === 'VideoObject' && videoLd.embedUrl);
assert('guia #1 tem excerpt EN', !!sample.excerptEn);

const { publishStaticAssets } = require('../lib/publish-static.js');
publishStaticAssets(ROOT);
const feed = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'posts-public.json'), 'utf8'));
assert('posts-public sem inspeções', feed.every((p) => p.category !== 'inspecao'));
assert('posts-public coverImage absoluto', !feed.some((p) => p.coverImage && !p.coverImage.startsWith('/') && !/^https?:/i.test(p.coverImage)));

const publicList = getPublicPosts(merged);
assert('getPublicPosts exclui inspeções', publicList.every((p) => p.category !== 'inspecao'));
assert('getPublicPosts inspecao vazio', getPublicPosts(merged, 'inspecao').length === 0);
const adminInspecoes = getAdminListedPosts(merged, 'inspecao');
assert('getAdminListedPosts inspecao inclui', adminInspecoes.length > 0);
assert('getAdminListedPosts inspecao só inspeções', adminInspecoes.every((p) => p.category === 'inspecao'));

const publicPages = ['index.html', 'info/sobre.html', 'cultivo/index.html', 'videos/index.html', 'loja/index.html'];
const inspectionHref = /\/biblioteca\/inspecoes|\/posts\/post-inspecao-|\/guia\/cultivo-basico/;
publicPages.forEach((file) => {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  assert(file + ' sem link a inspeções', !inspectionHref.test(html));
});
assert('posts.js CTA público sem inspeções', !inspectionHref.test(fs.readFileSync(path.join(ROOT, 'js/posts.js'), 'utf8')));
assert('loja-catalog sem href de inspeções', !inspectionHref.test(fs.readFileSync(path.join(ROOT, 'lib/loja-catalog.js'), 'utf8')));

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
