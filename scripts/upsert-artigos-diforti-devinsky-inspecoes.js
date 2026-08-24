'use strict';

/**
 * Injeta / actualiza Di Forti 2019 (EU-GEI) e Devinsky 2017 (CBD / Dravet).
 * Uso: node scripts/upsert-artigos-diforti-devinsky-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildDiFortiEugeiPsicose2019Post,
  buildDevinskyCbdDravet2017Post,
  buildGobbiCannabisAdolescenciaHumorPost
} = require('../lib/artigos-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

const HREF_DIFORTI = '/posts/post-inspecao-artigo-diforti-eugei-psicose-2019.html';
const HREF_DEVINSKY = '/posts/post-inspecao-artigo-devinsky-cbd-dravet-2017.html';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function hydrate(post) {
  const body = post.content_raw || post.content || '';
  post.content_raw = body;
  post.content = body;
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML', normalized.filename);
}

function upsertPost(posts, post, afterSlug) {
  hydrate(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const after = posts.findIndex((p) => p.slug === afterSlug);
  if (after >= 0) {
    posts.splice(after + 1, 0, post);
    console.log('Inserido', post.slug, 'após', afterSlug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
  }
}

function upsertSugItem(items, item, afterId) {
  const i = items.findIndex((x) => x.id === item.id);
  if (i >= 0) {
    items[i] = Object.assign({}, items[i], item);
    return;
  }
  const after = items.findIndex((x) => x.id === afterId);
  if (after >= 0) items.splice(after, 0, item);
  else items.push(item);
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
  upsertPost(posts, post, 'inspecao-artigo-gobbi-cannabis-adolescencia-humor');
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  for (const script of [
    'generate-artigo-diforti-cover.js',
    'generate-artigo-devinsky-cbd-cover.js'
  ]) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit'
      });
    } catch (e) {
      console.warn('Aviso capa', script + ':', e.message);
    }
  }

  const gobbi = hydrate(buildGobbiCannabisAdolescenciaHumorPost());
  const diforti = hydrate(buildDiFortiEugeiPsicose2019Post());
  const devinsky = hydrate(buildDevinskyCbdDravet2017Post());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  upsertPost(posts, gobbi, 'inspecao-artigo-albaugh-cannabis-neurodesenvolvimento');
  upsertPost(posts, diforti, gobbi.slug);
  upsertPost(posts, devinsky, diforti.slug);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of [gobbi, diforti, devinsky]) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug + ':', e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const post of [gobbi, diforti, devinsky]) {
    i18n[post.slug] = {
      titleEn: post.titleEn,
      titleEs: post.titleEs,
      excerptEn: post.excerptEn,
      excerptEs: post.excerptEs
    };
  }
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];

    upsertSugItem(
      items,
      {
        id: 'artigo-diforti-eugei-2019',
        title: 'Artigo — Cannabis de alta potência e psicose (Di Forti / EU-GEI 2019)',
        titleEn: 'Article — High-potency cannabis and psychosis (Di Forti / EU-GEI 2019)',
        titleEs: 'Artículo — Cannabis de alta potencia y psicosis (Di Forti / EU-GEI 2019)',
        tipo: 'artigo',
        priority: 1,
        status: 'feita',
        why: 'Caso-controlo Lancet Psychiatry: frequência + potência THC × primeiro episódio; elo USP/FAPESP.',
        whyEn: 'Lancet Psychiatry case-control: frequency + THC potency × first-episode psychosis; USP/FAPESP link.',
        whyEs: 'Caso-control Lancet Psychiatry: frecuencia + potencia THC × primer episodio; vínculo USP/FAPESP.',
        suggestedSlug: diforti.slug,
        doneHref: HREF_DIFORTI,
        seriesHint: 'artigos-cientificos',
        sources: [
          'https://doi.org/10.1016/S2215-0366(19)30048-3',
          'https://www.thelancet.com/journals/lanpsy/article/PIIS2215-0366(19)30048-3/fulltext',
          'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6447576/'
        ],
        notes: 'PAF assume causalidade. Caso-controlo ≠ RCT. Não fundir com Devinsky CBD.'
      },
      'artigo-seguinte'
    );

    upsertSugItem(
      items,
      {
        id: 'artigo-devinsky-cbd-dravet-2017',
        title: 'Artigo — CBD oral no síndrome de Dravet (Devinsky 2017)',
        titleEn: 'Article — Oral CBD for Dravet syndrome (Devinsky 2017)',
        titleEs: 'Artículo — CBD oral en el síndrome de Dravet (Devinsky 2017)',
        tipo: 'artigo',
        priority: 1,
        status: 'feita',
        why: 'RCT NEJM de CBD isolado farmacêutico (20 mg/kg/dia) em Dravet resistente — âncora contra óleo de loja.',
        whyEn: 'NEJM RCT of pharmaceutical CBD isolate (20 mg/kg/day) in drug-resistant Dravet — anchor against shop oil.',
        whyEs: 'RCT NEJM de CBD aislado farmacéutico (20 mg/kg/día) en Dravet resistente — ancla contra aceite de tienda.',
        suggestedSlug: devinsky.slug,
        doneHref: HREF_DEVINSKY,
        seriesHint: 'artigos-cientificos',
        sources: [
          'https://doi.org/10.1056/NEJMoa1611618',
          'https://www.nejm.org/doi/full/10.1056/NEJMoa1611618',
          'https://clinicaltrials.gov/study/NCT02091375'
        ],
        notes: 'Isolado ≠ óleo. GW financiou. ≥50 % respondedores NS. Não fundir com Di Forti.'
      },
      'artigo-seguinte'
    );

    const next = items.find((x) => x.id === 'artigo-seguinte');
    if (next) {
      next.status = 'fila';
      next.priority = 3;
      next.tipo = 'artigo';
      next.notes =
        'Di Forti 2019 e Devinsky 2017 fechados. Próximo: escolher DOI (ex. Thiele CBD LGS 2018, ou Marconi meta-análise psicose).';
      next.suggestedSlug = 'inspecao-artigo-';
      delete next.doneHref;
      next.sources = [];
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões: Di Forti + Devinsky feitas; artigo-seguinte permanece na fila');
  }

  for (const post of [diforti, devinsky]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', diforti.title);
  console.log('OK:', devinsky.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
