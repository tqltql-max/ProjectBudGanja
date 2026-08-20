'use strict';

/**
 * Injeta figura Steve Jobs na série Pessoas.
 * Uso: node scripts/upsert-figura-steve-jobs-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSteveJobsPost } = require('../lib/steve-jobs-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  const post = buildSteveJobsPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'figura-steve-jobs';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Steve Jobs — ofício, limite em casa e o mito do celular aos 18',
      titleEn: 'Steve Jobs — craft, home limit, and the phone-at-18 myth',
      titleEs: 'Steve Jobs — oficio, límite en casa y el mito del móvil a los 18',
      tipo: 'pessoas',
      priority: 2,
      status: 'feita',
      why: 'Pessoas: Steve Jobs; fala NYT 2010/2014 (iPad + limite em casa) ≠ «celular aos 18»; elos palavra Jobs, ídolo, celular-crianças.',
      whyEn: 'People: Steve Jobs; NYT 2010/2014 (iPad + home limit) ≠ “phone at 18”; links word Jobs, ídolo, kids-phone sheet.',
      whyEs: 'Personas: Steve Jobs; NYT 2010/2014 (iPad + límite en casa) ≠ «móvil a los 18»; vínculos palabra Jobs, ídolo, ficha celular.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        'https://www.nytimes.com/2014/09/11/fashion/steve-jobs-apple-was-a-low-tech-parent.html',
        '/posts/post-inspecao-palavra-jobs.html',
        '/posts/post-inspecao-palavra-idolo.html',
        '/posts/post-inspecao-celular-riscos-saude-criancas.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — «18» é meme; facto = limite em casa / iPad 2010; Eve ~13 na morte do pai.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (figura-steve-jobs)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'steve-jobs',
      word: 'Steve Jobs',
      simple:
        'Pessoa (1955–2011): ofício Apple; limite de tech em casa (iPad 2010). O «celular só aos 18» é meme — não a citação documentada.',
      simpleEn:
        'Person (1955–2011): Apple craft; home tech limit (iPad 2010). “Phone only after 18” is a meme — not the documented quote.',
      simpleEs:
        'Persona (1955–2011): oficio Apple; límite de tech en casa (iPad 2010). «Móvil solo a los 18» es meme — no la cita documentada.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'Steve Jobs' || x.word === 'Stivem Jobs'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'jobs' || x.id === 'idolo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Steve Jobs)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryJobs =
      '    "steve jobs": { tone: "caution", category: "Pessoa", mundane: "Steven Paul Jobs (1955–2011) — Apple; limite de tech em casa.", gloss: "Fala documentada: iPad ainda não (2010) e limite em casa — não «celular aos 18». Elo palavra Jobs.", href: "/posts/post-inspecao-figura-steve-jobs.html", en: "Steve Jobs", es: "Steve Jobs", fr: "Steve Jobs", it: "Steve Jobs", de: "Steve Jobs", el: "Steve Jobs", la: "Stephanus Jobs", yo: "Steve Jobs", sw: "Steve Jobs", gez: "Steve Jobs", nl: "Steve Jobs", pl: "Steve Jobs", ru: "Steve Jobs", uk: "Steve Jobs", zh: "Steve Jobs", ja: "Steve Jobs", ko: "Steve Jobs", ar: "Steve Jobs", he: "Steve Jobs", hi: "Steve Jobs", tr: "Steve Jobs", sv: "Steve Jobs", da: "Steve Jobs", no: "Steve Jobs", fi: "Steve Jobs", cs: "Steve Jobs", ro: "Steve Jobs", hu: "Steve Jobs", ca: "Steve Jobs", gl: "Steve Jobs", eu: "Steve Jobs", gn: "Steve Jobs", qu: "Steve Jobs", eo: "Steve Jobs", vi: "Steve Jobs", id: "Steve Jobs", th: "Steve Jobs", hr: "Steve Jobs", sk: "Steve Jobs", ga: "Steve Jobs", cy: "Steve Jobs", ha: "Steve Jobs", am: "Steve Jobs", fa: "Steve Jobs", bn: "Steve Jobs", zu: "Steve Jobs" },\n' +
      '    stivem: { gloss: "Grafia oral / lapso de Steve Jobs — ver ficha de pessoa.", href: "/posts/post-inspecao-figura-steve-jobs.html", en: "misspelling of Steve Jobs", es: "lapsus de Steve Jobs" },\n' +
      '    "stivem jobs": { gloss: "Grafia oral / lapso de Steve Jobs — ver ficha de pessoa.", href: "/posts/post-inspecao-figura-steve-jobs.html", en: "misspelling of Steve Jobs", es: "lapsus de Steve Jobs" },\n';
    if (/"steve jobs":\s*\{/.test(gloss)) {
      console.log('Glossário já tinha steve jobs');
    } else {
      const reJobs = /(jobs:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reJobs.test(gloss)) {
        gloss = gloss.replace(reJobs, '$1' + entryJobs);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (steve jobs · após jobs)');
      } else {
        const reSkill = /(skill:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
        if (reSkill.test(gloss)) {
          gloss = gloss.replace(reSkill, '$1' + entryJobs);
          fs.writeFileSync(glossPath, gloss);
          console.log('Glossário actualizado (steve jobs · após skill)');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    }
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
