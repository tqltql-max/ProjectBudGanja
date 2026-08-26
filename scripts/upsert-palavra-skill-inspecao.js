'use strict';

/**
 * Injeta palavra «skill» na série Palavras.
 * Uso: node scripts/upsert-palavra-skill-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSkillPost } = require('../lib/skill-inspecao-post.js');

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
  const post = buildSkillPost();
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
    const sugId = 'palavra-skill';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Skill — empréstimo EN, habilidade e craft sem LinkedIn',
      titleEn: 'Skill — EN loan, habilidade and craft without LinkedIn',
      titleEs: 'Skill — préstamo EN, habilidade y oficio sin LinkedIn',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: skill — EN→BR; habilidade/craft; anti-badge LinkedIn; elos multitask/genial; tipografia skgll → skill.',
      whyEn: 'Words: skill — EN→BR; habilidade/craft; anti-LinkedIn badge; links multitask/genial; typo skgll → skill.',
      whyEs: 'Palabras: skill — EN→BR; habilidade/oficio; anti-insignia LinkedIn; vínculos multitask/genial; tipografía skgll → skill.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/skill',
        'https://pt.wiktionary.org/wiki/skill',
        '/posts/post-inspecao-palavra-multitask.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — empréstimo EN; habilidade/craft; anti-LinkedIn; elos multitask/genial; skgll → skill.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-skill)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entrySkill = {
      id: 'skill',
      word: 'skill',
      simple:
        'Empréstimo EN→BR; habilidade/craft com rasto; anti-badge LinkedIn; elos multitask e genial; Valeu !!!',
      simpleEn:
        'EN→BR loan; habilidade/craft with a trail; anti-LinkedIn badge; links multitask and genial; Valeu !!!',
      simpleEs:
        'Préstamo EN→BR; habilidade/oficio con rastro; anti-insignia LinkedIn; vínculos multitask y genial; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const entryHab = {
      id: 'habilidade',
      word: 'habilidade',
      simple:
        'Irmã PT de skill — capacidade treinável; no lab preferir rasto ao badge; ver ficha skill.',
      simpleEn:
        'PT sister of skill — trainable capacity; lab prefers trail over badge; see skill sheet.',
      simpleEs:
        'Hermana PT de skill — capacidad entrenable; el lab prefiere rastro a insignia; ver ficha skill.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    for (const entry of [entrySkill, entryHab]) {
      const gi = items.findIndex((x) => x.id === entry.id);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex(
          (x) => x.id === 'multitask' || x.id === 'genial' || x.id === 'gesto'
        );
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (skill / habilidade)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('skill: {')) {
      const re = /(multitarefa: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const entry =
        '    skill: { tone: "caution", category: "Ofício", mundane: "Empréstimo EN — habilidade / saber fazer.", gloss: "EN→BR; craft com rasto; anti-badge LinkedIn; elos multitask/genial; skgll→skill.", href: "/posts/post-inspecao-palavra-skill.html", en: "skill", es: "habilidad / skill", fr: "compétence", it: "abilità", de: "Fertigkeit", el: "δεξιότητα", la: "peritia", yo: "ọgbọ́n", sw: "ustadi", gez: "ṭәbäb", nl: "vaardigheid", pl: "umiejętność", ru: "навык", uk: "навичка", zh: "技能", ja: "スキル", ko: "스킬", ar: "مهارة", he: "מיומנות", hi: "कौशल", tr: "beceri", sv: "färdighet", da: "færdighed", no: "ferdighet", fi: "taito", cs: "dovednost", ro: "abilitate", hu: "készség", ca: "habilitat", gl: "habilidade", eu: "trebetasun", gn: "katupyry", qu: "yachay", eo: "kapablo", vi: "kỹ năng", id: "keterampilan", th: "ทักษะ", hr: "vještina", sk: "zručnosť", ga: "scil", cy: "sgil", ha: "fasaha", am: "ክህሎት", fa: "مهارت", bn: "দক্ষতা", zu: "ikhono" },\n' +
        '    habilidade: { gloss: "Irmã PT de skill — capacidade com rasto; ver ficha skill.", href: "/posts/post-inspecao-palavra-skill.html", en: "ability / skill", es: "habilidad", fr: "habileté", it: "abilità", de: "Fähigkeit", el: "ικανότητα", la: "habilitas", yo: "agbára", sw: "uwezo", gez: "bǝql", nl: "bekwaamheid", pl: "zdolność", ru: "умение", uk: "уміння", zh: "能力", ja: "能力", ko: "능력", ar: "قدرة", he: "יכולת", hi: "योग्यता", tr: "yetenek", sv: "förmåga", da: "evne", no: "evne", fi: "kyky", cs: "schopnost", ro: "abilitate", hu: "képesség", ca: "habilitat", gl: "habilidade", eu: "gaitasun", gn: "ikatupyry", qu: "atiy", eo: "kapablo", vi: "năng lực", id: "kemampuan", th: "ความสามารถ", hr: "sposobnost", sk: "schopnosť", ga: "cumas", cy: "gallu", ha: "iyawa", am: "ችሎታ", fa: "توانایی", bn: "সামর্থ্য", zu: "ikhono" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (skill / habilidade)');
      } else {
        const reMulti = /(multitask: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
        if (reMulti.test(gloss) && !gloss.includes('skill: {')) {
          gloss = gloss.replace(reMulti, '$1' + entry);
          fs.writeFileSync(glossPath, gloss);
          console.log('Glossário actualizado (skill · após multitask)');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    } else {
      console.log('Glossário já tinha skill');
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
