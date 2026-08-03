'use strict';

/**
 * Injeta / actualiza a inspeção Renato Russo + Legião Urbana (série Pessoas × Palavras).
 * Uso: node scripts/upsert-figura-renato-russo.js
 */

const fs = require('fs');
const path = require('path');
const { buildRenatoRussoPost } = require('../lib/renato-russo-inspecao-post.js');
const { buildMaconhaPost } = require('../lib/palavras-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const PLANTAS_FILE = path.join(ROOT, 'content', 'plantas.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'em índice', idx);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'no início');
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
  const post = buildRenatoRussoPost();
  const maconha = buildMaconhaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  upsertPost(posts, post);
  upsertPost(posts, maconha);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, maconha);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const tempoHref = '/posts/post-inspecao-palavra-tempo.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'figura-renato-russo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Renato Russo — Legião Urbana, letra geracional e série Palavras',
      titleEn: 'Renato Russo — Legião Urbana, generational lyrics and Words series',
      titleEs: 'Renato Russo — Legião Urbana, letra generacional y serie Palabras',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas × Palavras: letrista da Legião Urbana — letra geracional cruzada com a ficha tempo (Tempo Perdido).',
      whyEn: 'People × Words: Legião Urbana lyricist — generational lyrics crossed with the tempo sheet (Tempo Perdido).',
      whyEs: 'Personas × Palabras: letrista de Legião Urbana — letra generacional cruzada con la ficha tempo (Tempo Perdido).',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [post.sourceUrl, tempoHref, '/posts/post-inspecao-palavra-maconha.html'],
      notes: 'Inclui a banda Legião Urbana como laboratório; não romantizar AIDS nem dependência.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else {
      const after = items.findIndex((x) => x.id === 'figura-chorao');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }

    // Ideia irmã: ficha Artes focada só na banda / discografia
    const arteId = 'arte-legiao-urbana';
    const ai = items.findIndex((x) => x.id === arteId);
    if (ai < 0) {
      items.splice(
        items.findIndex((x) => x.id === sugId) + 1,
        0,
        {
          id: arteId,
          title: 'Legião Urbana — discografia e elo com Renato Russo',
          titleEn: 'Legião Urbana — discography and link to Renato Russo',
          titleEs: 'Legião Urbana — discografía y vínculo con Renato Russo',
          tipo: 'arte',
          priority: 3,
          status: 'ideia',
          why: 'Foco na obra/banda (álbuns, formação); biografia do letrista já em Pessoas.',
          whyEn: 'Focus on the band/work (albums, lineup); lyricist bio already in People.',
          whyEs: 'Foco en la obra/banda (álbumes, formación); biografía del letrista ya en Personas.',
          suggestedSlug: 'inspecao-arte-legiao-urbana',
          seriesHint: 'artes-cultura',
          sources: [
            'https://pt.wikipedia.org/wiki/Legi%C3%A3o_Urbana',
            href
          ],
          notes: 'Foco na obra, não na biografia (já em Pessoas).'
        }
      );
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (Renato Russo feita + ideia Legião)');
  }

  if (fs.existsSync(PLANTAS_FILE)) {
    const doc = JSON.parse(fs.readFileSync(PLANTAS_FILE, 'utf8'));
    const list = Array.isArray(doc.plants) ? doc.plants : [];
    const plant = list.find((p) => p && p.slug === 'cannabis-sativa');
    if (plant) {
      const related = Array.isArray(plant.relatedInspections)
        ? plant.relatedInspections.slice()
        : [];
      const ri = related.findIndex((x) => x && x.href === href);
      const link = {
        href,
        label: 'Inspeção: Renato Russo — Legião Urbana, letra geracional e a série Palavras',
        labelEn: 'Inspection: Renato Russo — Legião Urbana, generational lyrics and the Words series',
        labelEs: 'Inspección: Renato Russo — Legião Urbana, letra generacional y la serie Palabras'
      };
      if (ri >= 0) related[ri] = Object.assign({}, related[ri], link);
      else related.push(link);
      plant.relatedInspections = related;
      fs.writeFileSync(PLANTAS_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
      console.log('Elo relatedInspections em plantas.json → cannabis-sativa');
    }
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'renato-russo',
      word: 'Renato Russo',
      simple:
        'Letrista e voz da Legião Urbana (1960–1996); no site, inspeção em Pessoas com elo na ficha tempo (Tempo Perdido).',
      simpleEn:
        'Lyricist and voice of Legião Urbana (1960–1996); on the site, a People inspection linked to the tempo sheet (Tempo Perdido).',
      simpleEs:
        'Letrista y voz de Legião Urbana (1960–1996); en el sitio, inspección en Personas con vínculo en la ficha tempo (Tempo Perdido).',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'chorao' || x.id === 'tempo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (renato-russo)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log(
    'OK:',
    post.title,
    '| content_raw',
    (post.content_raw || '').length,
    'chars'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
