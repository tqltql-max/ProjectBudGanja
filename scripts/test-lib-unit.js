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

const { pickShareableInspections, PINNED_SLUGS } = require('../lib/inspecoes-share-feed.js');
const shareFeed = JSON.parse(require('fs').readFileSync(require('path').join(ROOT, 'inspecoes-share.json'), 'utf8'));
assert('inspecoes-share.json tem fichas', Array.isArray(shareFeed) && shareFeed.length >= 6 && shareFeed.length <= 10);
assert(
  'inspecoes-share só inspeções fáceis',
  shareFeed.every((p) => p.slug && p.url && p.kind && p.coverImage)
);
assert(
  'inspecoes-share inclui Bom dia, Inverno ou Romeu',
  shareFeed.some((p) => p.slug === 'inspecao-arte-bom-dia-inverno' || p.slug === 'inspecao-arte-romeu-e-julieta')
);
assert(
  'inspecoes-share sem artigos/RDC',
  !shareFeed.some((p) => /artigo|neurociencia|rdc-|derivado-/.test(p.slug || ''))
);
const picked = pickShareableInspections(feed, 8);
assert('pickShareableInspections 8', picked.length === 8);
assert('PINNED_SLUGS tem artes e animais', PINNED_SLUGS.indexOf('inspecao-animal-cao') >= 0);

assert('calculadoras registry', CALCULADORAS.length === 3);
const cultivoLab = CALCULADORAS.find((c) => c.slug === 'cultivo-lab');
assert('cultivo-lab featured', cultivoLab && cultivoLab.featured === true);
assert('cultivo-lab URL custom', getCalculadoraUrl(cultivoLab) === '/calculadoras/cultivo-lab.html');
CALCULADORAS.forEach((c) => {
  const url = getCalculadoraUrl(c);
  assert('URL ' + c.slug, url.startsWith('/calculadoras/') && url.endsWith('.html'));
});

const { categorizeTitle: catZangado } = require('../lib/zangado-categories.js');
assert('zangado saga', catZangado('A SAGA DE POKEMON') === 'sagas');
assert(
  'zangado vale a pena',
  catZangado("Assassin's Creed Black Flag Resynced : Vale ou Não a Pena Jogar!?") === 'vale-a-pena'
);
assert('zangado meia hora', catZangado('Beast of Reincarnation : A Primeira Meia Hora (PC)[4K]') === 'primeira-meia-hora');
assert('zangado especial', catZangado('Especial Devilman : Go Nagai, Inspirações, Mangás, Games e Mais.') === 'especiais' || catZangado('Especial Devilman : Go Nagai, Inspirações, Mangás, Games e Mais.') === 'nerd-extra');
assert('zangado nao vale', catZangado('MindsEye: NOT Worth Playing!') === 'nao-vale');
assert('zangado bate-papo', catZangado('BATE PAPO COM O TIO ZANGADO!!! #41') === 'bate-papo');

const {
  handleGoogleStart,
  encodeOAuthState,
  decodeOAuthReturnTo,
  verifyOAuthState,
  toNetlifyResponse
} = require('../lib/auth-google-start.js');
const prevGoogleId = process.env.GOOGLE_CLIENT_ID;
const prevGoogleSecret = process.env.GOOGLE_CLIENT_SECRET;
delete process.env.GOOGLE_CLIENT_ID;
delete process.env.GOOGLE_CLIENT_SECRET;
const startMissing = handleGoogleStart({ headers: {}, query: '' });
assert(
  'google/start sem credenciais redireciona para entrar',
  startMissing.statusCode === 302 && String(startMissing.headers.Location).includes('redirect_not_configured')
);
process.env.GOOGLE_CLIENT_ID = 'test-client.apps.googleusercontent.com';
process.env.GOOGLE_CLIENT_SECRET = 'test-secret';
const startOk = handleGoogleStart({
  headers: { host: 'inspetorbudganja.com.br', 'x-forwarded-proto': 'https' },
  query: 'returnTo=/perfil.html'
});
assert(
  'google/start com credenciais vai ao Google',
  startOk.statusCode === 302 && String(startOk.headers.Location).startsWith('https://accounts.google.com/o/oauth2/v2/auth')
);
assert('google/start define cookie de state', Array.isArray(startOk.setCookies) && startOk.setCookies.length === 1);
const netlifyStart = toNetlifyResponse(startOk);
assert(
  'google/start Netlify usa Set-Cookie string',
  typeof netlifyStart.headers['Set-Cookie'] === 'string' && netlifyStart.headers['Set-Cookie'].includes('budganja_oauth_state=')
);
const encoded = encodeOAuthState('/biblioteca/');
assert('oauth state decodifica returnTo', decodeOAuthReturnTo(encoded) === '/biblioteca/');
assert('oauth state rejeita returnTo externo', decodeOAuthReturnTo(encodeOAuthState('https://evil.test')) === '/perfil.html');
assert(
  'oauth state assinado verifica sem cookie',
  verifyOAuthState(encoded) && verifyOAuthState(encoded).returnTo === '/biblioteca/'
);
assert('oauth state forjado falha', verifyOAuthState(encoded.slice(0, -3) + 'xxx') == null);
if (prevGoogleId == null) delete process.env.GOOGLE_CLIENT_ID;
else process.env.GOOGLE_CLIENT_ID = prevGoogleId;
if (prevGoogleSecret == null) delete process.env.GOOGLE_CLIENT_SECRET;
else process.env.GOOGLE_CLIENT_SECRET = prevGoogleSecret;

console.log('\n=== Resultado: ' + passed + ' OK, ' + failed + ' falhas ===');
process.exit(failed ? 1 : 0);
