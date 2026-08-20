'use strict';

/**
 * Injeta inspeção do Mercado Play (loja / streaming · TV grátis).
 * Uso: node scripts/upsert-loja-mercado-play-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMercadoPlayPost } = require('../lib/mercado-play-loja-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const HREF = '/posts/post-inspecao-loja-mercado-play.html';
const SITE = 'https://play.mercadolivre.com.br/';

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterFilmicca = posts.findIndex((p) => p.slug === 'inspecao-loja-filmicca');
  if (afterFilmicca >= 0) {
    posts.splice(afterFilmicca + 1, 0, post);
    console.log('Inserido', post.slug, 'após FILMICCA');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mercado-play-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildMercadoPlayPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'loja-mercado-play';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Mercado Play — TV grátis do Mercado Livre e filmes legais no player',
      titleEn: 'Mercado Play — Mercado Livre’s free TV and legal films on their player',
      titleEs: 'Mercado Play — la TV gratis de Mercado Livre y filmes legales en su reproductor',
      tipo: 'loja',
      priority: 2,
      status: 'feita',
      why: 'Lojas · streaming: play.mercadolivre.com.br — AVOD 2023; grátis com anúncios ≠ domínio público; indicação datada só no player oficial; aluguel e Max/Globoplay de fora.',
      whyEn: 'Shops · streaming: Mercado Play — 2023 AVOD; free-with-ads ≠ public domain; dated official-player pointers; rental and partner apps out.',
      whyEs: 'Tiendas · streaming: Mercado Play — AVOD 2023; gratis con anuncios ≠ dominio público; indicaciones fechadas al player oficial; alquiler y apps socias fuera.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'loja-streaming',
      sources: [
        SITE,
        'https://play.mercadolivre.com.br/filtrar/filmes',
        'https://play.mercadolivre.com.br/mercado-play-tv',
        'https://play.mercadolivre.com.br/assistir/a-era-do-gelo/5051e6a2251a4028877bda541ffb481e',
        'https://www1.folha.uol.com.br/mercado/2023/08/mercado-livre-lanca-servico-de-streaming-com-filmes-de-graca.shtml',
        '/posts/post-inspecao-loja-filmicca.html',
        '/posts/post-inspecao-palavra-pipoca.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'AVOD ≠ PD. It (2017) na home é aluguel. Catálogo roda.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (loja-mercado-play)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!/mercadoplay:\s*\{/.test(gloss)) {
      const entry =
        '    mercadoplay: { gloss: "Streaming AVOD do Mercado Livre (2023) — TV grátis com anúncios; filmes legais só no player oficial; ≠ domínio público; aluguel e Max/Globoplay de fora; indexar ≠ endosso.", href: "/posts/post-inspecao-loja-mercado-play.html", en: "Mercado Play (free ad-supported streaming)", es: "Mercado Play (streaming gratis con anuncios)" },\n';
      const reFilmicca = /(    filmicca:\s*\{[\s\S]*?\},?\r?\n)/;
      if (reFilmicca.test(gloss)) {
        gloss = gloss.replace(reFilmicca, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (mercadoplay)');
      } else {
        console.warn('Aviso: glossário — ponto filmicca não encontrado para Mercado Play');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '|', HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
