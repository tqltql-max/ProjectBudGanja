'use strict';

/**
 * Injeta palavra «multitask» / «multitarefa» na série Palavras.
 * Uso: node scripts/upsert-palavra-multitask-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMultitaskPost } = require('../lib/multitask-inspecao-post.js');

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
  const post = buildMultitaskPost();
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
    const sugId = 'palavra-multitask';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Multitask — empréstimo, parece×é e correção de ofício',
      titleEn: 'Multitask — loanword, seems×is and craft correction',
      titleEs: 'Multitask — préstamo, parece×es y corrección de oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: multitask/multitarefa — EN→BR; ≠ fazer tudo bem ao mesmo tempo; uma com método ou paralelo limitado; anti-hype.',
      whyEn: 'Words: multitask/multitarefa — EN→BR; ≠ doing everything well at once; one with method or limited parallel; anti-hype.',
      whyEs: 'Palabras: multitask/multitarefa — EN→BR; ≠ hacerlo todo bien a la vez; una con método o paralelo limitado; anti-hype.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/multitask',
        'https://pt.wiktionary.org/wiki/multitarefa',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-buguei.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. 47 — empréstimo × parece/é × correção anti-hype.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-multitask)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entryMulti = {
      id: 'multitask',
      word: 'multitask',
      simple:
        'Empréstimo EN→BR; parece «tudo bem ao mesmo tempo»; ofício = uma com método ou paralelo com limites; Valeu !!!',
      simpleEn:
        'EN→BR loan; seems “everything well at once”; craft = one with method or limited parallel; Valeu !!!',
      simpleEs:
        'Préstamo EN→BR; parece «todo bien a la vez»; oficio = una con método o paralelo con límites; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const entryTarefa = {
      id: 'multitarefa',
      word: 'multitarefa',
      simple:
        'Forma PT irmã de multitask — mesma correção: não é fazer tudo bem ao mesmo tempo; método e limites.',
      simpleEn:
        'PT sister of multitask — same correction: not doing everything well at once; method and limits.',
      simpleEs:
        'Forma PT hermana de multitask — misma corrección: no es hacerlo todo bien a la vez; método y límites.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    for (const entry of [entryMulti, entryTarefa]) {
      const gi = items.findIndex((x) => x.id === entry.id);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex(
          (x) => x.id === 'buguei' || x.id === 'gesto' || x.id === 'caminho'
        );
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (multitask / multitarefa)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('multitask: {') && !gloss.includes('multitarefa: {')) {
      const re = /(bugar: \{[\s\S]*?zu: "ukubambeka" },\r?\n)/;
      const entry =
        '    multitask: { tone: "caution", category: "Ofício", mundane: "Empréstimo EN — várias tarefas / atenção dividida.", gloss: "Parece tudo bem ao mesmo tempo; ofício = uma com método ou paralelo com limites; anti-hype.", href: "/posts/post-inspecao-palavra-multitask.html", en: "multitask", es: "multitarea", fr: "multitâche", it: "multitasking", de: "Multitasking", el: "πολυδιεργασία", la: "multum negotium", yo: "iṣẹ́ púpọ̀", sw: "kazi nyingi", gez: "ብዙ ሥራ", nl: "multitasken", pl: "wielozadaniowość", ru: "многозадачность", uk: "багатозадачність", zh: "多任务", ja: "マルチタスク", ko: "멀티태스킹", ar: "تعدد المهام", he: "ריבוי משימות", hi: "मल्टीटास्क", tr: "çoklu görev", sv: "multitasking", da: "multitasking", no: "multitasking", fi: "moniajo", cs: "multitasking", ro: "multitasking", hu: "multitasking", ca: "multitasca", gl: "multitarefa", eu: "zeregin anitz", gn: "hembaheta mba\'apo", qu: "achka ruway", eo: "plurtaskado", vi: "đa nhiệm", id: "multitasking", th: "ทำหลายอย่าง", hr: "višezadaćnost", sk: "multitasking", ga: "iltascáil", cy: "aml-dasgu", ha: "ayyuka da yawa", am: "ብዙ ሥራ", fa: "چندوظیفه‌ای", bn: "মাল্টিটাস্ক", zu: "imisebenzi eminingi" },\n' +
        '    multitarefa: { gloss: "Forma PT irmã de multitask — mesma correção de ofício; ver ficha.", href: "/posts/post-inspecao-palavra-multitask.html", en: "multitasking", es: "multitarea", fr: "multitâche", it: "multitasking", de: "Multitasking", el: "πολυδιεργασία", la: "multum negotium", yo: "iṣẹ́ púpọ̀", sw: "kazi nyingi", gez: "ብዙ ሥራ", nl: "multitasking", pl: "wielozadaniowość", ru: "многозадачность", uk: "багатозадачність", zh: "多任务", ja: "マルチタスク", ko: "멀티태스킹", ar: "تعدد المهام", he: "ריבוי משימות", hi: "मल्टीटास्किंग", tr: "çoklu görev", sv: "multitasking", da: "multitasking", no: "multitasking", fi: "moniajo", cs: "multitasking", ro: "multitasking", hu: "multitasking", ca: "multitasca", gl: "multitarefa", eu: "zeregina anitz", gn: "hembaheta mba\'apo", qu: "achka ruway", eo: "plurtaskado", vi: "đa nhiệm", id: "multitasking", th: "หลายงาน", hr: "višezadaćnost", sk: "multitasking", ga: "iltascáil", cy: "aml-dasgu", ha: "ayyuka da yawa", am: "ብዙ ሥራ", fa: "چندوظیفه‌ای", bn: "বহুকাজ", zu: "imisebenzi eminingi" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (multitask / multitarefa)');
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

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
