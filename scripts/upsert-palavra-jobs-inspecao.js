'use strict';

/**
 * Injeta palavra «Jobs» na série Palavras.
 * Uso: node scripts/upsert-palavra-jobs-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildJobsPost } = require('../lib/jobs-inspecao-post.js');

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
  const post = buildJobsPost();
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
    const sugId = 'palavra-jobs';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Jobs — trabalhos EN, nome próprio e ofício sem pedestal',
      titleEn: 'Jobs — EN work, proper name, craft without a pedestal',
      titleEs: 'Jobs — trabajos EN, nombre propio y oficio sin pedestal',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Jobs — EN jobs (trabalhos) × Steve Jobs no BR; anti-culto de fundador; elos skill/ídolo/criatividade; Faça o melhor!',
      whyEn: 'Words: Jobs — EN jobs (work) × Steve Jobs in BR; anti-founder cult; links skill/ídolo/criatividade; Do your best!',
      whyEs: 'Palabras: Jobs — EN jobs (trabajos) × Steve Jobs en BR; anti-culto de fundador; vínculos skill/ídolo/criatividade; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/job',
        'https://pt.wikipedia.org/wiki/Steve_Jobs',
        '/posts/post-inspecao-palavra-skill.html',
        '/posts/post-inspecao-palavra-idolo.html',
        '/posts/post-inspecao-palavra-criatividade.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — jobs EN × Jobs BR; ficha ≠ biografia; anti-pedestal; elos skill/ídolo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-jobs)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'jobs',
      word: 'Jobs',
      simple:
        'EN jobs (trabalhos) × nome próprio no BR (Steve Jobs); ofício sem pedestal; elos skill e ídolo; Faça o melhor!',
      simpleEn:
        'EN jobs (work) × proper name in BR (Steve Jobs); craft without a pedestal; links skill and ídolo; Do your best!',
      simpleEs:
        'EN jobs (trabajos) × nombre propio en BR (Steve Jobs); oficio sin pedestal; vínculos skill e ídolo; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'Jobs' || x.word === 'jobs'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'skill' || x.id === 'idolo' || x.id === 'genial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Jobs)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entry =
      '    jobs: { tone: "caution", category: "Ofício", mundane: "EN jobs = trabalhos; no BR, atalho de Steve Jobs.", gloss: "Camadas: emprego × nome próprio × culto de fundador; elos skill/ídolo; sem pedestal; Faça o melhor!", href: "/posts/post-inspecao-palavra-jobs.html", en: "jobs / Jobs", es: "trabajos / Jobs", fr: "emplois / Jobs", it: "lavori / Jobs", de: "Jobs (Arbeit / Name)", el: "δουλειές / Jobs", la: "opera / Jobs", yo: "iṣẹ́ / Jobs", sw: "kazi / Jobs", gez: "sǝra / Jobs", nl: "banen / Jobs", pl: "prace / Jobs", ru: "работы / Jobs", uk: "роботи / Jobs", zh: "工作 / Jobs", ja: "仕事 / Jobs", ko: "일자리 / Jobs", ar: "وظائف / Jobs", he: "עבודות / Jobs", hi: "नौकरियाँ / Jobs", tr: "işler / Jobs", sv: "jobb / Jobs", da: "jobs / Jobs", no: "jobber / Jobs", fi: "työt / Jobs", cs: "práce / Jobs", ro: "joburi / Jobs", hu: "munkák / Jobs", ca: "feines / Jobs", gl: "traballos / Jobs", eu: "lanak / Jobs", gn: "mba\'apo / Jobs", qu: "llamk\'aykuna / Jobs", eo: "laboroj / Jobs", vi: "việc làm / Jobs", id: "pekerjaan / Jobs", th: "งาน / Jobs", hr: "poslovi / Jobs", sk: "práce / Jobs", ga: "poist / Jobs", cy: "swyddi / Jobs", ha: "ayyuka / Jobs", am: "ስራዎች / Jobs", fa: "شغل‌ها / Jobs", bn: "চাকরি / Jobs", zu: "imisebenzi / Jobs" },\n';
    if (/jobs:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    jobs:\s*\{[\s\S]*?\},/, entry.trimEnd().replace(/,$/, '') + ',');
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (jobs · existente)');
    } else {
      const reSkill = /(skill:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSkill.test(gloss)) {
        gloss = gloss.replace(reSkill, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (jobs · após skill)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
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
