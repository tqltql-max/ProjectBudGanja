'use strict';

/**
 * Injeta os derivados de fruto ainda em ideia + marca sugestões feitas.
 * Uso: node scripts/upsert-frutos-derivados-pendentes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  FRUIT_DERIVADO_CONFIGS,
  buildAllFruitDerivadoPosts
} = require('../lib/frutos-derivados-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTS_FILE = path.join(ROOT, 'content', 'plantas.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function stampFiles(post) {
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
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-frutos-derivados-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const built = buildAllFruitDerivadoPosts().map(stampFiles);
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const post of built) upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  for (const post of built) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const post of built) writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const byId = new Map(FRUIT_DERIVADO_CONFIGS.map((c) => [c.id, c]));
    for (const post of built) {
      const id = String(post.slug).replace(/^inspecao-derivado-/, '');
      const cfg = byId.get(id);
      const sugId = 'derivado-' + id;
      const href = '/posts/post-' + post.slug + '.html';
      const si = items.findIndex((x) => x.id === sugId);
      const entry = {
        id: sugId,
        title: post.title.replace(/^Inspeção:\s*/i, ''),
        titleEn: post.titleEn && String(post.titleEn).replace(/^Inspection:\s*/i, ''),
        titleEs: post.titleEs && String(post.titleEs).replace(/^Inspección:\s*/i, ''),
        tipo: 'derivado',
        priority: 3,
        status: 'feita',
        why:
          'Derivados de risco: ' +
          (cfg ? cfg.namePt : id) +
          ' inteiro vs matriz industrial; mapa químico açúcar × aditivos + elo planta.',
        whyEn:
          'Risk derivatives: whole fruit vs industrial matrix; sugar × additives map + plant link.',
        whyEs:
          'Derivados de riesgo: fruto entero vs matriz industrial; mapa azúcar × aditivos + vínculo planta.',
        suggestedSlug: post.slug,
        doneHref: href,
        seriesHint: 'plantas-derivados-risco',
        sources: [
          post.sourceUrl,
          cfg ? '/posts/post-inspecao-planta-' + cfg.plantSlug + '.html' : undefined,
          '/posts/post-inspecao-derivado-cana-de-acucar.html',
          'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/aditivos-alimentares'
        ].filter(Boolean),
        notes: 'Planta ≠ vilã; foco em açúcar × aditivos × dose. Cap. ' + post.seriesOrder
      };
      if (si >= 0) items[si] = Object.assign({}, items[si], entry);
      else items.push(entry);
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (', built.length, 'derivados de fruto)');
  }

  if (fs.existsSync(PLANTS_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(PLANTS_FILE, 'utf8'));
    const plants = Array.isArray(catalog.plants) ? catalog.plants : [];
    let plantHits = 0;
    for (const post of built) {
      const id = String(post.slug).replace(/^inspecao-derivado-/, '');
      const cfg = FRUIT_DERIVADO_CONFIGS.find((c) => c.id === id);
      if (!cfg) continue;
      const plant = plants.find((p) => p && p.slug === cfg.plantSlug);
      if (!plant) continue;
      const href = '/posts/post-' + post.slug + '.html';
      const list = Array.isArray(plant.relatedInspections) ? plant.relatedInspections : [];
      const already = list.some((x) => x && x.href === href);
      if (!already) {
        list.unshift({
          href: href,
          label: post.title,
          labelEn: post.titleEn,
          labelEs: post.titleEs
        });
        plant.relatedInspections = list;
        plantHits += 1;
      }
    }
    catalog.plants = plants;
    await writeJsonRetry(PLANTS_FILE, catalog);
    console.log('Plantas actualizadas (', plantHits, 'elos novos)');
  }

  console.log('OK:', built.length, 'derivados de fruto');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
