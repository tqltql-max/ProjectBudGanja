'use strict';

/**
 * Injeta palavra «profanar» (cluster professor / profanação / propagação / programação)
 * na série Palavras e liga ao catálogo Tecnologia.
 * Uso: node scripts/upsert-palavra-profanar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildProfanarPost, poemPt, poemEn, poemEs } = require('../lib/profanar-inspecao-post.js');
const { buildTecnologiaPost } = require('../lib/tecnologia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-profanar.html';

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

function guiaEntry(id, word, simple, simpleEn, simpleEs, history, curiosities, historyEn, curiositiesEn, historyEs, curiositiesEs) {
  return {
    id,
    word,
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple,
    simpleEn,
    simpleEs,
    history,
    curiosities,
    historyEn,
    curiositiesEn,
    historyEs,
    curiositiesEs
  };
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-profanar-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildProfanarPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);

  const postTech = stampFiles(buildTecnologiaPost());
  upsertPost(posts, postTech);
  try {
    writeHtml(postTech);
  } catch (e) {
    console.warn('Aviso HTML tecnologia:', e.message);
  }
  writeI18n(i18n, postTech);

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(
    sugItems,
    {
      id: 'palavra-profanar',
      title: 'Profanar — umbral do templo; professor, propagação, programação',
      titleEn: 'Profanar — temple threshold; professor, propagation, programming',
      titleEs: 'Profanar — umbral del templo; profesor, propagación, programación',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: profanar (lat. pro- + fānum) — fora do templo × violar; professor é outra raiz; propagação = estaca; programação = grámma na sala tecnologia; Faça o seu melhor · Valeu !!!',
      whyEn: 'Words: profanar (Lat. pro- + fānum); professor is another root; programming links to tecnologia.',
      whyEs: 'Palabras: profanar (lat. pro- + fānum); professor es otra raíz; programação liga a tecnologia.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-tecnologia.html',
        '/posts/post-inspecao-palavra-script.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-palavra-valeu.html',
        '/tecnologia/'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — cluster pro-; fānum ≠ fatērī ≠ pangere ≠ grámma.'
    },
    ['palavra-tecnologia', 'palavra-deplorar']
  );
  sug.items = sugItems;

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    guiaEntry(
      'profanar',
      'profanar',
      'Lat. pro- + fānum — fora do templo / tratar como não-sagrado; ≠ professor; Valeu !!!',
      'Lat. pro- + fānum — outside the temple / treat as not-sacred; ≠ professor; Valeu !!!',
      'Lat. pro- + fānum — fuera del templo / tratar como no sagrado; ≠ professor; ¡Valeu !!!',
      'Profanar vem do latim profānāre (pro- + fānum, templo). O sentido antigo é espacial: ficar fora do recinto. O sentido vivo é violar ou baratear o sagrado.',
      'A orelha cola professor. O étimo corta: profitērī (declarar) não é fānum. No lab, trazer ao público com respeito ≠ pisar o recinto.',
      'Portuguese profanar comes from Latin profānāre (pro- + fānum, temple). The old sense is spatial: outside the precinct. The living sense is to violate or cheapen the sacred.',
      'The ear glues professor. The etymon cuts: profitērī (to declare) is not fānum. In the lab, bringing knowledge out with respect ≠ trampling the precinct.',
      'Profanar viene del latín profānāre (pro- + fānum, templo). El sentido antiguo es espacial: fuera del recinto. El sentido vivo es violar o baratear lo sagrado.',
      'El oído pega professor. El étimo corta: profitērī (declarar) no es fānum. En el lab, sacar con respeto ≠ pisar el recinto.'
    ),
    ['tecnologia', 'deplorar']
  );
  upsertItem(
    guiaItems,
    guiaEntry(
      'profanacao',
      'profanação',
      'Nome do acto de profanar — o que se faz ao recinto; mesma árvore de fānum; Valeu !!!',
      'Name of the act of profanar — what is done to the precinct; same fānum tree; Valeu !!!',
      'Nombre del acto de profanar — lo que se hace al recinto; mismo árbol de fānum; ¡Valeu !!!',
      'Profanação é o substantivo de profanar. Não é um templo a menos: é o gesto sobre o sagrado.',
      'No laboratório nomeia o dano quando o sagrado foi usado de troféu — sem púlpito nesta ficha.',
      'Profanação is the noun of profanar. It is not one temple fewer: it is the gesture upon the sacred.',
      'In the lab it names the damage when the sacred was used as a trophy — no pulpit on this sheet.',
      'Profanação es el sustantivo de profanar. No es un templo de menos: es el gesto sobre lo sagrado.',
      'En el laboratorio nombra el daño cuando lo sagrado se usó de trofeo — sin púlpito en esta ficha.'
    ),
    ['profanar']
  );
  upsertItem(
    guiaItems,
    guiaEntry(
      'professor',
      'professor',
      'Lat. profitērī — quem declara o ofício em público; ≠ profanar (fānum); Valeu !!!',
      'Lat. profitērī — one who declares the craft in public; ≠ profanar (fānum); Valeu !!!',
      'Lat. profitērī — quien declara el oficio en público; ≠ profanar (fānum); ¡Valeu !!!',
      'Professor vem de profitērī (pro- + fatērī, confessar / declarar). Profissão e profissional são da mesma árvore.',
      'A orelha cola profanar. O bom ofício professa no umbral; o mau ofício profana. Faça o seu melhor é a regra da porta.',
      'Portuguese professor comes from profitērī (pro- + fatērī, to confess / declare). Profissão and profissional share that tree.',
      'The ear glues profanar. Good craft professes on the threshold; bad craft profanes. Do your best is the door rule.',
      'Professor viene de profitērī (pro- + fatērī, confesar / declarar). Profissão y profissional son del mismo árbol.',
      'El oído pega profanar. El buen oficio profesa en el umbral; el malo profana. Haz tu mejor es la regla de la puerta.'
    ),
    ['profanacao']
  );
  upsertItem(
    guiaItems,
    guiaEntry(
      'propagacao',
      'propagação',
      'Lat. prōpāgāre — estaca / espalhar o vivo; prima propaganda noutro recinto; Valeu !!!',
      'Lat. prōpāgāre — a cutting / spreading what is alive; cousin propaganda elsewhere; Valeu !!!',
      'Lat. prōpāgāre — estaquilla / esparcir lo vivo; prima propaganda en otro recinto; ¡Valeu !!!',
      'Propagação vem de prōpāgāre (pro- + pangere, fixar). No cultivo é a estaca; no discurso, espalhar uma ideia.',
      'Propagar continua a vida. Profanar rompe o recinto. Propaganda (1622) é prima histórica — não é esta ficha.',
      'Propagação comes from prōpāgāre (pro- + pangere, to fix). In growing it is a cutting; in speech, spreading an idea.',
      'To propagate continues life. To profane breaks the precinct. Propaganda (1622) is a historical cousin — not this sheet.',
      'Propagação viene de prōpāgāre (pro- + pangere, fijar). En el cultivo es la estaquilla; en el discurso, esparcir una idea.',
      'Propagar continúa la vida. Profanar rompe el recinto. Propaganda (1622) es prima histórica — no es esta ficha.'
    ),
    ['professor']
  );
  upsertItem(
    guiaItems,
    guiaEntry(
      'programacao',
      'programação',
      'Gr. prógramma — o escrito à frente; ofício do código na sala tecnologia; ≠ profanar; Valeu !!!',
      'Gr. prógramma — writing set in front; craft of code in the technology room; ≠ profanar; Valeu !!!',
      'Gr. prógramma — lo escrito delante; oficio del código en la sala tecnología; ≠ profanar; ¡Valeu !!!',
      'Programação vem do grego prógramma (pró- + grámma). Programa é o aviso/plano; programar é escrever a sequência executável.',
      'Liga ao lema tecnologia (tékhnē + lógos) e à ficha script. Faça o seu melhor = método claro, rasto honesto.',
      'Programação comes from Greek prógramma (pró- + grámma). A programa is the notice/plan; to program is to write the runnable sequence.',
      'It links to the tecnologia lemma (tékhnē + lógos) and the script sheet. Do your best = clear method, honest trace.',
      'Programação viene del griego prógramma (pró- + grámma). Programa es el aviso/plan; programar es escribir la secuencia ejecutable.',
      'Liga al lema tecnologia (tékhnē + lógos) y a la ficha script. Haz tu mejor = método claro, rastro honesto.'
    ),
    ['propagacao', 'tecnologia']
  );
  guia.items = guiaItems;

  if (gloss) {
    const mainLine =
      '    profanar: { tone: "caution", category: "Léxico", mundane: "Verbo — tratar como não-sagrado; umbral do templo (pro- + fānum).", gloss: "Lat. profānāre ← fānum; ≠ professor (profitērī); cluster profanação / propagação / programação; elo tecnologia; Faça o seu melhor · Valeu !!!", href: "' +
      HREF +
      '", en: "to profane / to desecrate", es: "profanar", fr: "profaner", it: "profanare", de: "entweihen", el: "βεβηλώνω", la: "profanare", yo: "bàjẹ́ mímọ́", sw: "kudharau kitakatifu", gez: "profanare", nl: "ontwijden", pl: "profanować", ru: "osквернять", uk: "оскверняти", zh: "亵渎", ja: "冒涜する", ko: "모독하다", ar: "يدنس", he: "לחלל", hi: "अपवित्र करना", tr: "kutsalı bozmak", sv: "vanhelga", da: "vanhellige", no: "vanhellige", fi: "häväistä", cs: "znesvětit", ro: "profana", hu: "meggyaláz", ca: "profanar", gl: "profanar", eu: "profanatu", gn: "profanar", qu: "profanar", eo: "profani", vi: "xúc phạm thánh", id: "menodai", th: "ลบหลู่", hr: "oskvrnuti", sk: "zneuctiť", ga: "sárú naofa", cy: "halogi", ha: "kashin tsarki", am: "መድፈር", fa: "هتک حرمت", bn: "অপবিত্র করা", zu: "ukuhlambalaza" },\n';
    const aliases =
      '    profanacao: { gloss: "Nome do acto — ver profanar; mesma árvore de fānum.", href: "' +
      HREF +
      '", en: "profanation", es: "profanación" },\n' +
      '    "profanação": { gloss: "Grafia com cedilha — ver profanar.", href: "' +
      HREF +
      '", en: "profanation (cedilla)", es: "profanación" },\n' +
      '    profano: { gloss: "Adjectivo / lado de fora do templo — ver profanar; ≠ xingamento automático.", href: "' +
      HREF +
      '", en: "profane / outside the temple", es: "profano" },\n' +
      '    professor: { tone: "craft", category: "Ofício", mundane: "Quem declara o saber em público — lat. profitērī.", gloss: "pro- + fatērī; ≠ fānum / profanar; professa no umbral; Faça o seu melhor · Valeu !!!", href: "' +
      HREF +
      '", en: "teacher / professor", es: "profesor" },\n' +
      '    professora: { gloss: "Forma feminina — ver professor / profanar (corte de étimo).", href: "' +
      HREF +
      '", en: "teacher (f.)", es: "profesora" },\n' +
      '    professar: { gloss: "Declarar o ofício — árvore de profitērī; ≠ profanar.", href: "' +
      HREF +
      '", en: "to profess", es: "profesar" },\n' +
      '    profissao: { gloss: "Sem acento — ofício declarado; árvore de professor, não de fānum.", href: "' +
      HREF +
      '", en: "profession", es: "profesión" },\n' +
      '    "profissão": { gloss: "Ofício declarado (profitērī) — ver professor; ≠ profanar.", href: "' +
      HREF +
      '", en: "profession", es: "profesión" },\n' +
      '    propagacao: { gloss: "Estaca / espalhar o vivo — lat. prōpāgāre; ver profanar.", href: "' +
      HREF +
      '", en: "propagation", es: "propagación" },\n' +
      '    "propagação": { gloss: "Grafia com cedilha — estaca; ≠ profanação.", href: "' +
      HREF +
      '", en: "propagation (cedilla)", es: "propagación" },\n' +
      '    propagar: { gloss: "Verbo de prōpāgāre — continuar o vivo; ≠ profanar.", href: "' +
      HREF +
      '", en: "to propagate", es: "propagar" },\n' +
      '    propaganda: { gloss: "Prima histórica de propagação (1622) — outra sala; ver profanar.", href: "' +
      HREF +
      '", en: "propaganda (historical cousin)", es: "propaganda" },\n' +
      '    programacao: { gloss: "Gr. prógramma — escrito à frente; ofício na sala tecnologia; ≠ profanar.", href: "' +
      HREF +
      '", en: "programming", es: "programación" },\n' +
      '    "programação": { gloss: "Grafia com cedilha — ver profanar / tecnologia.", href: "' +
      HREF +
      '", en: "programming (cedilla)", es: "programación" },\n' +
      '    programar: { gloss: "Escrever o plano executável — grámma; elo tecnologia / script.", href: "' +
      HREF +
      '", en: "to program", es: "programar" },\n' +
      '    programa: { gloss: "Aviso / plano / grade — prógramma; ver programação.", href: "' +
      HREF +
      '", en: "program / schedule", es: "programa" },\n' +
      '    programador: { gloss: "Quem escreve o programa — ofício; ≠ professor por étimo.", href: "' +
      HREF +
      '", en: "programmer", es: "programador" },\n';
    gloss = patchGlossary(gloss, 'profanar', mainLine, aliases, 'tecnologia');
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (profanar · cluster pro-)');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'profanar',
      slug: 'profanar',
      title: 'Profanar',
      titleEn: 'Profanar',
      titleEs: 'Profanar',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — umbral do templo; professor não é a mesma raiz; Valeu !!!',
      teaserEn: 'BudGanja echo — temple threshold; professor is not the same root; Valeu !!!',
      teaserEs: 'Eco BudGanja — umbral del templo; professor no es la misma raíz; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'profanar', 'professor', 'programacao', 'tecnologia']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  for (const p of [post, postTech]) {
    try {
      await syncSql(p);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
