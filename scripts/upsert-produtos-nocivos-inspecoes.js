'use strict';

/**
 * Injeta caseína + glúten na série Produtos nocivos (hub chip derivados).
 * Uso: node scripts/upsert-produtos-nocivos-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildLeitePost,
  buildCaseinaPost,
  buildGlutenPost,
  buildChocolatePost,
  buildAnaliseDanosVideosPost
} = require('../lib/produtos-nocivos-inspecoes-posts.js');

const { writeFileRetrySync } = require('../lib/fs-write-retry.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
  }
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

async function syncSql(built) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  built.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', built.length, 'posts');
}

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function writeHtml(post) {
  if (!post) return;
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

async function main() {
  const built = [
    buildLeitePost(),
    buildCaseinaPost(),
    buildGlutenPost(),
    buildChocolatePost(),
    buildAnaliseDanosVideosPost()
  ];

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  built.forEach((post) => upsertPost(posts, post));
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  built.forEach((post) => writeI18n(i18n, post));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  writeHtml(built.find((p) => p.slug === 'inspecao-derivado-leite'));
  writeHtml(built.find((p) => p.slug === 'inspecao-derivado-caseina'));
  writeHtml(built.find((p) => p.slug === 'inspecao-derivado-gluten'));

  try {
    const { publishStaticAssets } = require('../lib/publish-static.js');
    publishStaticAssets(ROOT);
    console.log('posts-public.json actualizado');
  } catch (e) {
    console.warn('Aviso publishStatic:', e && e.message ? e.message : e);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'derivado-leite',
      title: 'Leite e derivados — da ordenha à prateleira e o mal à saúde',
      titleEn: 'Milk and derivatives — from milking to the shelf and harm to health',
      titleEs: 'Leche y derivados — del ordeño al estante y el daño a la salud',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Pesquisa completa: hub leite e derivados × 9.798 vídeos. Irmão da caseína; distinto da carne processada da vaca.',
      whyEn: 'Full research: milk-and-derivatives hub × 9,798 videos. Sibling of casein; distinct from processed cattle meat.',
      whyEs: 'Investigación completa: hub leche y derivados × 9.798 vídeos. Hermana de la caseína.',
      suggestedSlug: 'inspecao-derivado-leite',
      doneHref: '/posts/post-inspecao-derivado-leite.html',
      seriesHint: 'animais-derivados-risco'
    });
    upsertSug(items, {
      id: 'derivado-caseina',
      title: 'Caseína — a cola do leite e o mal à saúde',
      titleEn: 'Casein — milk’s glue and harm to health',
      titleEs: 'Caseína — la cola de la leche y el daño a la salud',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Pesquisa completa: caseína × saúde × 9.798 vídeos (0 títulos com a palavra caseína; Lair leite/lactose, Manual cola de leite).',
      whyEn: 'Full research: casein × health × 9,798 videos (0 titles name casein; Lair milk/lactose, Manual milk glue).',
      whyEs: 'Investigación completa: caseína × salud × 9.798 vídeos (0 títulos nombran caseína).',
      suggestedSlug: 'inspecao-derivado-caseina',
      doneHref: '/posts/post-inspecao-derivado-caseina.html',
      seriesHint: 'animais-derivados-risco'
    });
    upsertSug(items, {
      id: 'derivado-gluten',
      title: 'Glúten — a cola invisível e o mal à saúde',
      titleEn: 'Gluten — the invisible glue and harm to health',
      titleEs: 'Gluten — la cola invisible y el daño a la salud',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Pesquisa completa: glúten × saúde × 9.798 vídeos (Davis, Lair, Manual do Mundo).',
      whyEn: 'Full research: gluten × health × 9,798 videos (Davis, Lair, Manual do Mundo).',
      whyEs: 'Investigación completa: gluten × salud × 9.798 vídeos (Davis, Lair, Manual do Mundo).',
      suggestedSlug: 'inspecao-derivado-gluten',
      doneHref: '/posts/post-inspecao-derivado-gluten.html',
      seriesHint: 'plantas-derivados-risco'
    });
    upsertSug(items, {
      id: 'derivado-chocolate',
      title: 'Chocolate industrial — cacau, açúcar, farinha e leite',
      titleEn: 'Industrial chocolate — cacao, sugar, flour and milk',
      titleEs: 'Chocolate industrial — cacao, azúcar, harina y leche',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Hub Produtos nocivos: chocolate junta cacau, açúcar, farinha/glúten e caseína.',
      whyEn: 'Harmful-products hub: chocolate joins cacao, sugar, flour/gluten and casein.',
      whyEs: 'Hub Productos nocivos: el chocolate junta cacao, azúcar, harina/gluten y caseína.',
      suggestedSlug: 'inspecao-derivado-chocolate',
      doneHref: '/posts/post-inspecao-derivado-chocolate.html',
      seriesHint: 'plantas-derivados-risco'
    });
    upsertSug(items, {
      id: 'derivado-analise-danos-videos',
      title: 'Análise: danos × vídeos catalogados',
      titleEn: 'Analysis: harms × catalogued videos',
      titleEs: 'Análisis: daños × vídeos catalogados',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Cruzar danos da rede Produtos nocivos com o acervo de vídeos do projecto.',
      whyEn: 'Cross harmful-product harms with the project video archive.',
      whyEs: 'Cruzar daños de Productos nocivos con el acervo de vídeos del proyecto.',
      suggestedSlug: 'inspecao-derivado-analise-danos-videos',
      doneHref: '/posts/post-inspecao-derivado-analise-danos-videos.html',
      seriesHint: 'plantas-derivados-risco'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'leite',
      word: 'Leite',
      simple:
        'Do latim lac, lactis: fluido da ordenha e família de derivados. Pesquisa — da ordenha à prateleira e o mal à saúde — cruzada com os vídeos do projecto. Não é dieta prescrita.',
      simpleEn:
        'From Latin lac, lactis: milking fluid and derivative family. Research — from milking to the shelf and harm to health — crossed with project videos. Not a prescribed diet.',
      simpleEs:
        'Del latín lac, lactis: fluido del ordeño y familia de derivados. Investigación — del ordeño al estante y el daño a la salud — cruzada con los vídeos. No es dieta prescrita.',
      group: 'tecnico',
      fromTitle: true,
      href: '/posts/post-inspecao-derivado-leite.html'
    };
    const gi = items.findIndex((x) => x.id === 'leite' || x.word === 'Leite');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'lei-11-343' || x.id === 'caseina');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (leite)');
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(catalog.animals) ? catalog.animals : [];
    const vaca = animals.find((a) => a && a.slug === 'vaca');
    if (vaca) {
      vaca.relatedInspections = [
        {
          href: '/posts/post-inspecao-expressao-virou-carne-de-vaca.html',
          label: 'Inspeção: Virou carne de vaca — ficou comum pra nós',
          labelEn: 'Inspection: Virou carne de vaca — it became ordinary for us',
          labelEs: 'Inspección: Virou carne de vaca — se volvió común para nosotros'
        },
        {
          href: '/posts/post-inspecao-derivado-leite.html',
          label: 'Inspeção: Leite e derivados — da ordenha à prateleira e o mal à saúde',
          labelEn: 'Inspection: Milk and derivatives — from milking to the shelf and harm to health',
          labelEs: 'Inspección: Leche y derivados — del ordeño al estante y el daño a la salud'
        },
        {
          href: '/posts/post-inspecao-derivado-caseina.html',
          label: 'Inspeção: Caseína — a cola do leite e o mal à saúde',
          labelEn: 'Inspection: Casein — milk’s glue and harm to health',
          labelEs: 'Inspección: Caseína — la cola de la leche y el daño a la salud'
        },
        {
          href: '/posts/post-inspecao-derivado-vaca.html',
          label: 'Inspeção: Derivados da vaca — carnes processadas e laticínios industriais',
          labelEn: 'Inspection: Cattle derivatives — processed meats and industrial dairy',
          labelEs: 'Inspección: Derivados de la vaca — carnes procesadas y lácteos industriales'
        }
      ];
      catalog.updatedAt = new Date().toISOString();
      fs.writeFileSync(ANIMAIS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em animais.json → vaca');
    }
  }

  if (fs.existsSync(PLANTAS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
    const plants = Array.isArray(catalog.plants) ? catalog.plants : [];
    const cacau = plants.find((p) => p && p.slug === 'cacau');
    if (cacau) {
      cacau.relatedInspections = [
        {
          href: '/posts/post-inspecao-derivado-chocolate.html',
          label: 'Inspeção: Chocolate industrial — cacau, açúcar, farinha e leite',
          labelEn: 'Inspection: Industrial chocolate — cacao, sugar, flour and milk',
          labelEs: 'Inspección: Chocolate industrial — cacao, azúcar, harina y leche'
        },
        {
          href: '/posts/post-inspecao-derivado-cana-de-acucar.html',
          label: 'Inspeção: Cana-de-açúcar / açúcares livres',
          labelEn: 'Inspection: Sugarcane / free sugars',
          labelEs: 'Inspección: Caña de azúcar / azúcares libres'
        },
        {
          href: '/posts/post-inspecao-derivado-gluten.html',
          label: 'Inspeção: Glúten / farinha',
          labelEn: 'Inspection: Gluten / flour',
          labelEs: 'Inspección: Gluten / harina'
        },
        {
          href: '/posts/post-inspecao-derivado-leite.html',
          label: 'Inspeção: Leite e derivados',
          labelEn: 'Inspection: Milk and derivatives',
          labelEs: 'Inspección: Leche y derivados'
        },
        {
          href: '/posts/post-inspecao-derivado-caseina.html',
          label: 'Inspeção: Caseína / cola do leite',
          labelEn: 'Inspection: Casein / milk’s glue',
          labelEs: 'Inspección: Caseína / cola de la leche'
        }
      ];
      cacau.cautions =
        'Fruto fresco e amêndoa merecem contexto. Chocolate industrial, achocolatados e snacks com açúcar, farinha e leite entram na série Produtos nocivos (hub chocolate). Conteúdo educacional — não substitui orientação profissional.';
      catalog.updatedAt = new Date().toISOString();
      fs.writeFileSync(PLANTAS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em plantas.json → cacau');
    }
  }

  try {
    await syncSql(built);
  } catch (e) {
    console.warn('SQL sync avisou:', e && e.message ? e.message : e);
  }

  console.log('OK: produtos nocivos —', built.map((p) => p.slug).join(', '));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
