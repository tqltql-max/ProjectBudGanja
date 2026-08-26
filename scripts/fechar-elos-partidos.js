'use strict';

/**
 * Fecha elos internos partidos: slug canónico, fichas já escritas, cultivo
 * retirado → ferramenta viva. Sem elos soltos.
 * Uso: node scripts/fechar-elos-partidos.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');

const HREF_REWRITES = [
  [
    '/posts/post-inspecao-expressao-jesusamando.html',
    '/posts/post-inspecao-expressao-jesusamado.html'
  ],
  [
    '/posts/post-inspecao-celular-riscos-criancas.html',
    '/posts/post-inspecao-celular-riscos-saude-criancas.html'
  ],
  [
    '/posts/post-inspecao-cultivo-indoor-ppfd.html',
    '/posts/post-guia-calculadora-luximetro.html'
  ],
  [
    '/posts/post-inspecao-propagacao-clonagem.html',
    '/posts/post-otimizacao-propagacao-vegetal.html'
  ],
  [
    '/posts/post-inspecao-nutricao-cannabis.html',
    '/posts/post-guia-calculadora-super-solo.html'
  ],
  [
    '/posts/post-inspecao-solo-vivo-organico.html',
    '/posts/post-guia-calculadora-super-solo.html'
  ]
];

function rewriteText(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [from, to] of HREF_REWRITES) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

function rewriteValue(v) {
  if (typeof v === 'string') return rewriteText(v);
  if (Array.isArray(v)) return v.map(rewriteValue);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v)) o[k] = rewriteValue(v[k]);
    return o;
  }
  return v;
}

function walkJsLibs() {
  const dir = path.join(ROOT, 'lib');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  let n = 0;
  for (const f of files) {
    const p = path.join(dir, f);
    const raw = fs.readFileSync(p, 'utf8');
    const next = rewriteText(raw);
    if (next !== raw) {
      fs.writeFileSync(p, next, 'utf8');
      n += 1;
      console.log('lib', f);
    }
  }
  return n;
}

function stamp(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function upsert(posts, post) {
  stamp(post);
  const i = posts.findIndex((p) => p.slug === post.slug);
  if (i >= 0) posts[i] = Object.assign({}, posts[i], post);
  else posts.unshift(post);
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
}

function collectBuilders() {
  const list = [];
  const add = (label, fn) => list.push({ label, fn });
  add('especial', () => require('../lib/especial-inspecao-post.js').buildEspecialPost());
  add('cigarra', () => require('../lib/cigarra-inspecao-post.js').buildCigarraPost());
  add('colchao', () => require('../lib/colchao-inspecao-post.js').buildColchaoPost());
  add('boa', () => require('../lib/boa-inspecao-post.js').buildBoaPost());
  add('megamente', () => require('../lib/megamente-inspecao-post.js').buildMegamentePost());
  add('animatrix', () => require('../lib/animatrix-inspecao-post.js').buildAnimatrixPost());
  add('pato', () => require('../lib/pato-inspecao-post.js').buildPatoPost());
  add('letra-l', () => require('../lib/letra-l-inspecao-post.js').buildLetraLPost());
  add('diabo', () => require('../lib/diabo-inspecao-post.js').buildDiaboPost());
  add('diablo', () => require('../lib/diablo-caderno-jogo-post.js').buildDiabloCadernoPost());
  add('ilegal', () => require('../lib/ilegal-inspecao-post.js').buildIlegalPost());
  add('amor-e-fe', () => require('../lib/amor-e-fe-inspecao-post.js').buildAmorEFePost());
  add('killing-jar', () => require('../lib/the-killing-jar-inspecao-post.js').buildTheKillingJarPost());
  add('puta-que-pariu', () => require('../lib/puta-que-pariu-inspecao-post.js').buildPutaQuePariuPost());
  add('puta', () => require('../lib/puta-inspecao-post.js').buildPutaPost());
  add('pariu', () => require('../lib/pariu-inspecao-post.js').buildPariuPost());
  add('cigarro', () => require('../lib/cigarro-inspecao-post.js').buildCigarroPost());
  add('perda-total', () => require('../lib/perda-total-inspecao-post.js').buildPerdaTotalPost());
  add('transformers', () => require('../lib/transformers-filmes-inspecao-post.js').buildTransformersPost());
  return list;
}

function countDangling(posts) {
  const published = posts.filter((p) => p.published !== false);
  const slugs = new Set(published.map((p) => p.slug));
  const dangling = new Set();
  const re = /\/posts\/post-([a-z0-9\-]+)\.html/gi;
  for (const p of published) {
    const text = [p.content_raw, p.contentEn, p.contentEs].filter(Boolean).join('\n');
    let m;
    while ((m = re.exec(text))) {
      const to = m[1];
      if (to !== p.slug && !slugs.has(to)) dangling.add(p.slug + '->' + to);
    }
  }
  return [...dangling];
}

async function main() {
  let posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  posts = rewriteValue(posts);
  console.log('posts.json hrefs reescritos');

  const libs = walkJsLibs();
  console.log('libs tocadas', libs);

  let i18n = fs.existsSync(I18N_FILE)
    ? JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'))
    : {};
  i18n = rewriteValue(i18n);
  console.log('post-i18n.json hrefs reescritos');

  const builders = collectBuilders();
  for (const b of builders) {
    try {
      const post = b.fn();
      if (!post || !post.slug) throw new Error('sem slug');
      upsert(posts, post);
      writeI18n(i18n, post);
      try {
        writeHtml(post);
      } catch (e) {
        console.warn('HTML', b.label, e.message);
      }
      console.log('ficha', b.label, post.slug);
    } catch (e) {
      console.warn('FALHOU', b.label, e && e.message ? e.message : e);
    }
  }

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const left = countDangling(posts);
  console.log('elos partidos restantes', left.length);
  left.slice(0, 40).forEach((x) => console.log(' ', x));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
