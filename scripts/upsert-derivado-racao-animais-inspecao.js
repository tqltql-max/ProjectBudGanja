'use strict';

/**
 * Injeta o hub Ração para animais (Produtos nocivos).
 * Uso: node scripts/upsert-derivado-racao-animais-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildRacaoAnimaisPost, SLUG } = require('../lib/racao-animais-inspecao-post.js');
const { buildAnimalInspecaoPost, loadAnimaisCatalog } = require('../lib/animais-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const ANIMAIS_FILE = path.join(ROOT, 'content', 'animais.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-derivado-racao.html';

const ANIMAL_SLUGS = ['cao', 'gato', 'cavalo', 'vaca', 'galinha', 'porco', 'peixe-tilapia', 'codorna'];

const RACAO_LINK = {
  href: HREF,
  label: 'Inspeção: Ração para animais — do saco industrial ao comedouro',
  labelEn: 'Inspection: Animal feed — from the industrial bag to the bowl',
  labelEs: 'Inspección: Pienso para animales — del saco industrial al comedero'
};

function upsertPost(posts, post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + post.filename;
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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.unshift(entry);
}

function upsertGuiaWord(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => x.id === 'leite');
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
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

function prependRelated(animal, link) {
  const links = Array.isArray(animal.relatedInspections) ? animal.relatedInspections.slice() : [];
  const without = links.filter((x) => x && x.href !== link.href);
  animal.relatedInspections = [link].concat(without);
}

async function main() {
  const post = buildRacaoAnimaisPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'derivado-racao',
      title: 'Ração para animais — do saco industrial ao comedouro',
      titleEn: 'Animal feed — from the industrial bag to the bowl',
      titleEs: 'Pienso para animales — del saco industrial al comedero',
      tipo: 'derivado',
      priority: 1,
      status: 'feita',
      why: 'Hub Produtos nocivos: ração / pet food — kibble, petiscos e concentrado pecuário; distinto do animal e do que o humano come.',
      whyEn: 'Harmful-products hub: animal feed / pet food — kibble, treats and livestock concentrate; distinct from the animal and from human food.',
      whyEs: 'Hub Productos nocivos: pienso / pet food — kibble, snacks y concentrado pecuario; distinto del animal y de lo que come el humano.',
      suggestedSlug: SLUG,
      doneHref: HREF,
      seriesHint: 'animais-derivados-risco',
      sources: [
        '/animais/',
        '/animais/cao/',
        '/animais/gato/',
        'https://pt.wikipedia.org/wiki/Ra%C3%A7%C3%A3o_animal',
        'https://en.wikipedia.org/wiki/Pet_food'
      ],
      notes: 'Hub do comedouro industrial; não fundir com fichas de animal nem com nugget/embutido/leite.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(ANIMAIS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(ANIMAIS_FILE, 'utf8'));
    const animals = Array.isArray(catalog.animals) ? catalog.animals : [];
    ANIMAL_SLUGS.forEach((slug) => {
      const animal = animals.find((a) => a && a.slug === slug);
      if (!animal) return;
      prependRelated(animal, RACAO_LINK);
      console.log('Elo relatedInspections em animais.json →', slug);
    });
    catalog.updatedAt = new Date().toISOString();
    fs.writeFileSync(ANIMAIS_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const words = Array.isArray(guia.items) ? guia.items : [];
    upsertGuiaWord(words, {
      id: 'racao',
      word: 'Ração',
      simple:
        'Porção medida que virou categoria industrial — no site, hub de pet food e concentrado pecuário (kibble, petiscos, granja).',
      simpleEn:
        'Measured portion that became an industrial category — on the site, hub of pet food and livestock concentrate (kibble, treats, barn feed).',
      simpleEs:
        'Porción medida que viró categoría industrial — en el sitio, hub de pet food y concentrado pecuario (kibble, snacks, granja).',
      group: 'tecnico',
      fromTitle: true,
      href: HREF,
      history:
        'Ração vem do latim ratio (medida, porção, conta). O vocábulo nomeia a ração de combate, o racionamento e, no Brasil, o alimento industrial para animais.',
      curiosities:
        'O laboratório corta três salas: o animal, o saco, e o que o humano come do animal. Premium no saco é marketing, não ensaio.',
      historyEn:
        'Portuguese ração comes from Latin ratio (measure, portion, account). The word names combat rations, rationing and, in Brazil, industrial animal feed.',
      curiositiesEn:
        'The lab cuts three rooms: the animal, the bag, and what humans eat from the animal. Premium on the sack is marketing, not a trial.',
      historyEs:
        'Ração viene del latín ratio (medida, porción, cuenta). El vocablo nombra la ración de combate, el racionamiento y, en Brasil, el pienso industrial.',
      curiositiesEs:
        'El laboratorio corta tres salas: el animal, el saco, y lo que el humano come del animal. Premium en el saco es marketing, no ensayo.'
    });
    guia.items = words;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de Palavras actualizado (ração)');
  }

  const catalogAnimals = loadAnimaisCatalog();
  ANIMAL_SLUGS.forEach((slug) => {
    const animal = catalogAnimals.find((a) => a && a.slug === slug);
    if (!animal) return;
    const existing = posts.find((p) => p.slug === 'inspecao-animal-' + slug);
    const order = existing && typeof existing.seriesOrder === 'number' ? existing.seriesOrder : 1;
    const animalPost = buildAnimalInspecaoPost(animal, order);
    animalPost.seriesOrder = order;
    upsertPost(posts, animalPost);
    writeHtml(animalPost);
  });

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  writeHtml(post);

  try {
    execFileSync('node', [path.join(ROOT, 'scripts', 'sync-ferramentas-nav.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso sync nav:', e.message);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
