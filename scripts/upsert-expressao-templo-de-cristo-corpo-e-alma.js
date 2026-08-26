'use strict';

/**
 * Injeta expressão «o templo de Cristo, corpo e alma».
 * Uso: node scripts/upsert-expressao-templo-de-cristo-corpo-e-alma.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildTemploDeCristoCorpoEAlmaPost
} = require('../lib/templo-de-cristo-corpo-e-alma-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug && p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const draft = buildTemploDeCristoCorpoEAlmaPost();
  const free = nextFreeSeriesOrder(posts, draft.seriesOrder, draft.slug);
  const post =
    free !== draft.seriesOrder
      ? buildTemploDeCristoCorpoEAlmaPost(free)
      : draft;

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-templo-de-cristo-corpo-e-alma';
    const si = items.findIndex(
      (x) =>
        x.id === sugId ||
        /templo de cristo|corpo e alma/i.test(String(x.title || ''))
    );
    const entry = {
      id: sugId,
      title: 'o templo de Cristo, corpo e alma — morada, inteireza e ofício',
      titleEn: 'the temple of Christ, body and soul — dwelling, wholeness and craft',
      titleEs: 'el templo de Cristo, cuerpo y alma — morada, entereza y oficio',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: templo · Cristo · corpo e alma — morada, nome e inteireza; sem catecismo; anti-vergonha do corpo.',
      whyEn: 'Sayings: temple · Christ · body and soul — dwelling, name and wholeness; no catechism; no shaming the body.',
      whyEs: 'Dichos: templo · Cristo · cuerpo y alma — morada, nombre y entereza; sin catecismo; sin vergüenza del cuerpo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        'https://pt.wiktionary.org/wiki/templo',
        '/posts/post-inspecao-palavra-alma.html',
        '/posts/post-inspecao-expressao-filho-de-deus.html',
        '/posts/post-inspecao-expressao-deus-abencoe.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. Expressões — fórmula de morada × inteireza; tipografia caixa alta → canónica com vírgula.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-templo-de-cristo-corpo-e-alma)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'templo-de-cristo-corpo-e-alma',
      word: 'o templo de Cristo, corpo e alma',
      simple:
        'Expressão — morada, Cristo e inteireza (corpo + alma); mapa cultural sem catecismo; não usar o templo para envergonhar o corpo; depois Valeu !!!',
      simpleEn:
        'Saying — dwelling, Christ and wholeness (body + soul); cultural map, no catechism; temple is not a weapon against the body; then Valeu !!!',
      simpleEs:
        'Expresión — morada, Cristo y entereza (cuerpo + alma); mapa cultural sin catecismo; el templo no es arma contra el cuerpo; luego ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'filho-de-deus' || x.id === 'deus-abencoe'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (templo de Cristo, corpo e alma)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const hrefJson = href;
    const main = `    "o templo de cristo, corpo e alma": { tone: "warm", category: "Morada", mundane: "Fórmula — templo, Cristo, pessoa inteira.", gloss: "Morada × inteireza — corpo e alma sem fender; ficha ≠ catecismo; depois Valeu !!!", href: "${hrefJson}", en: "the temple of Christ, body and soul", es: "el templo de Cristo, cuerpo y alma", fr: "le temple du Christ, corps et âme", it: "il tempio di Cristo, corpo e anima", de: "der Tempel Christi, Leib und Seele", el: "ο ναός του Χριστού, σώμα και ψυχή", la: "templum Christi, corpus et anima", yo: "tẹmpili Kristi, ara àti ọkàn", sw: "hekalu la Kristo, mwili na roho", gez: "täqäddäs betä Krəstos", nl: "de tempel van Christus, lichaam en ziel", pl: "świątynia Chrystusa, ciało i dusza", ru: "храм Христа, тело и душа", uk: "храм Христа, тіло і душа", zh: "基督的殿，身心", ja: "キリストの神殿、身と魂", ko: "그리스도의 성전, 몸과 영혼", ar: "هيكل المسيح، جسدا وروحا", he: "מקדש המשיח, גוף ונפש", hi: "मसीह का मंदिर, तन और मन", tr: "Mesih'in tapınağı, beden ve ruh", sv: "Kristi tempel, kropp och själ", da: "Kristi tempel, krop og sjæl", no: "Kristi tempel, kropp og sjel", fi: "Kristuksen temppeli, ruumis ja sielu", cs: "chrám Kristův, tělo i duše", ro: "templul lui Hristos, trup și suflet", hu: "Krisztus temploma, test és lélek", ca: "el temple de Crist, cos i ànima", gl: "o templo de Cristo, corpo e alma", eu: "Kristo tenplua, gorputz eta arima", gn: "Tupã ra'y óga, tete ha ãnga", qu: "Cristopa templun, cuerponwan almanwan", eo: "templo de Kristo, korpo kaj animo", vi: "đền thờ Chúa Kitô, xác và hồn", id: "bait Kristus, tubuh dan jiwa", th: "พระวิหารของพระคริสต์ กายและจิต", hr: "hram Kristov, tijelo i duša", sk: "chrám Kristov, telo a duša", ga: "teampall Chríost, corp agus anam", cy: "teml Crist, corff ac enaid", ha: "haikali na Kristi, jiki da rai", am: "የክርስቶስ መቅደስ፣ ሥጋና ነፍስ", fa: "معبد مسیح، تن و جان", bn: "খ্রিস্টের মন্দির, দেহ ও আত্মা", zu: "ithempeli likaKristu, umzimba nomphefumulo" },`;
    const aliasCorpoAlma = `    "corpo e alma": { tone: "warm", category: "Inteireza", mundane: "Locução — por inteiro, com tudo.", gloss: "Inteireza da pessoa — ver «o templo de Cristo, corpo e alma»; não partir corpo × alma.", href: "${hrefJson}", en: "body and soul", es: "cuerpo y alma", fr: "corps et âme", it: "corpo e anima", de: "Leib und Seele", el: "σώμα και ψυχή", la: "corpus et anima", yo: "ara àti ọkàn", sw: "mwili na roho", gez: "śəga wa-näfs", nl: "lichaam en ziel", pl: "ciało i dusza", ru: "тело и душа", uk: "тіло і душа", zh: "身心", ja: "身と魂", ko: "몸과 영혼", ar: "جسدا وروحا", he: "גוף ונפש", hi: "तन और मन", tr: "beden ve ruh", sv: "kropp och själ", da: "krop og sjæl", no: "kropp og sjel", fi: "ruumis ja sielu", cs: "tělo i duše", ro: "trup și suflet", hu: "test és lélek", ca: "cos i ànima", gl: "corpo e alma", eu: "gorputz eta arima", gn: "tete ha ãnga", qu: "cuerponwan almanwan", eo: "korpo kaj animo", vi: "xác và hồn", id: "tubuh dan jiwa", th: "กายและจิต", hr: "tijelo i duša", sk: "telo a duša", ga: "corp agus anam", cy: "corff ac enaid", ha: "jiki da rai", am: "ሥጋና ነፍስ", fa: "تن و جان", bn: "দেহ ও আত্মা", zu: "umzimba nomphefumulo" },`;
    const aliasTemplo = `    "templo de cristo": { gloss: "Peça da fórmula — ver «o templo de Cristo, corpo e alma».", href: "${hrefJson}", en: "temple of Christ", es: "templo de Cristo" },`;
    const aliasTemploWord = `    templo: { gloss: "Lat. templum — recinto / morada; na fórmula com Cristo, corpo e alma; ficha ≠ catecismo.", href: "${hrefJson}", en: "temple", es: "templo", fr: "temple", it: "tempio", de: "Tempel", el: "ναός", la: "templum", yo: "tẹmpili", sw: "hekalu", gez: "täqäddäs bet", nl: "tempel", pl: "świątynia", ru: "храм", uk: "храм", zh: "殿", ja: "神殿", ko: "성전", ar: "هيكل", he: "מקדש", hi: "मंदिर", tr: "tapınak", sv: "tempel", da: "tempel", no: "tempel", fi: "temppeli", cs: "chrám", ro: "templu", hu: "templom", ca: "temple", gl: "templo", eu: "tenplu", gn: "óga tuicha", qu: "templo", eo: "templo", vi: "đền", id: "bait", th: "วิหาร", hr: "hram", sk: "chrám", ga: "teampall", cy: "teml", ha: "haikali", am: "መቅደስ", fa: "معبد", bn: "মন্দির", zu: "ithempeli" },`;
    const corpoRich = `    corpo: { gloss: "Lat. corpus — corpo da pessoa; na fórmula «corpo e alma» = inteireza, não desprezo; ver templo de Cristo.", href: "${hrefJson}", en: "body", es: "cuerpo", fr: "corps", it: "corpo", de: "Körper", el: "σώμα", la: "corpus", yo: "ara", sw: "mwili", gez: "śəga", nl: "lichaam", pl: "ciało", ru: "тело", uk: "тіло", zh: "身体", ja: "体", ko: "몸", ar: "جسم", he: "גוף", hi: "शरीर", tr: "beden", sv: "kropp", da: "krop", no: "kropp", fi: "ruumis", cs: "tělo", ro: "corp", hu: "test", ca: "cos", gl: "corpo", eu: "gorputz", gn: "tete", qu: "cuerpo", eo: "korpo", vi: "cơ thể", id: "tubuh", th: "ร่างกาย", hr: "tijelo", sk: "telo", ga: "corp", cy: "corff", ha: "jiki", am: "አካል", fa: "بدن", bn: "শরীর", zu: "umzimba" },`;

    const afterFilho = /("filho de deus":\s*\{[\s\S]*?\},)/;
    if (/"o templo de cristo, corpo e alma":\s*\{/.test(gloss)) {
      gloss = gloss.replace(
        /    "o templo de cristo, corpo e alma":\s*\{[\s\S]*?\},/,
        main
      );
      console.log('Glossário: fórmula actualizada');
    } else if (afterFilho.test(gloss)) {
      gloss = gloss.replace(afterFilho, '$1\n' + main);
      console.log('Glossário: fórmula após filho de deus');
    } else {
      console.warn('Aviso: glossário — ponto de inserção da fórmula não encontrado');
    }

    const extras = [
      [
        /"corpo e alma":\s*\{/,
        /    "corpo e alma":\s*\{[\s\S]*?\},/,
        aliasCorpoAlma,
        'corpo e alma',
        /("o templo de cristo, corpo e alma":\s*\{[\s\S]*?\},)/
      ],
      [
        /"templo de cristo":\s*\{/,
        /    "templo de cristo":\s*\{[\s\S]*?\},/,
        aliasTemplo,
        'templo de cristo',
        /("corpo e alma":\s*\{[\s\S]*?\},)/
      ],
      [
        /    templo: \{/,
        /    templo: \{[\s\S]*?\},/,
        aliasTemploWord,
        'templo',
        /("templo de cristo":\s*\{[\s\S]*?\},)/
      ]
    ];
    for (const [hasRe, replaceRe, entry, label, afterRe] of extras) {
      if (hasRe.test(gloss)) {
        gloss = gloss.replace(replaceRe, entry);
        console.log('Glossário:', label, 'actualizado');
      } else if (afterRe.test(gloss)) {
        gloss = gloss.replace(afterRe, '$1\n' + entry);
        console.log('Glossário:', label, 'inserido');
      } else {
        console.warn('Aviso: glossário —', label, 'não inserido');
      }
    }

    if (/    corpo: \{[\s\S]*?\},/.test(gloss)) {
      gloss = gloss.replace(/    corpo: \{[\s\S]*?\},/, corpoRich);
      console.log('Glossário: corpo enriquecido');
    }

    fs.writeFileSync(glossPath, gloss);
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
