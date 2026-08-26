'use strict';

/**
 * Injeta expressão «Deus deu dois ouvidos e uma boca».
 * Uso: node scripts/upsert-expressao-deus-deu-dois-ouvidos.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDeusDeuDoisOuvidosPost
} = require('../lib/deus-deu-dois-ouvidos-inspecao-post.js');

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
  const post = buildDeusDeuDoisOuvidosPost();
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
    const sugId = 'expressao-deus-deu-dois-ouvidos';
    const si = items.findIndex(
      (x) =>
        x.id === sugId ||
        x.id === 'expressao-deus-deu-dois-pouvi' ||
        /dois ouvidos|dois pouvi/i.test(String(x.title || ''))
    );
    const entry = {
      id: sugId,
      title:
        'Deus deu dois ouvidos e uma boca — proporção, escuta e tipografia pouvi',
      titleEn:
        'Deus deu dois ouvidos e uma boca — proportion, listening and tipography pouvi',
      titleEs:
        'Deus deu dois ouvidos e uma boca — proporción, escucha y tipografía pouvi',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: Deus deu dois ouvidos e uma boca — ouvir 2× / falar 1×; tipografia dois pouvi → dois ouvidos; sem proselitismo.',
      whyEn:
        'Sayings: Deus deu dois ouvidos e uma boca — listen 2× / speak 1×; tipography dois pouvi → dois ouvidos; no proselytizing.',
      whyEs:
        'Dichos: Deus deu dois ouvidos e uma boca — oír 2× / hablar 1×; tipografía dois pouvi → dois ouvidos; sin proselitismo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-deus-abencoe.html',
        '/posts/post-inspecao-expressao-filho-de-deus.html',
        '/posts/post-inspecao-palavra-mensagem.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. 12 Expressões — tipografia dois pouvi → dois ouvidos; ficha ≠ sermão.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-deus-deu-dois-ouvidos)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'deus-deu-dois-ouvidos',
      word: 'Deus deu dois ouvidos e uma boca',
      simple:
        'Expressão — ditado de proporção (ouvir 2× / falar 1×); tipografia dois pouvi → dois ouvidos; respeito à fé cultural, sem proselitismo; depois Valeu !!!',
      simpleEn:
        'Saying — proportion proverb (listen 2× / speak 1×); tipography dois pouvi → dois ouvidos; respect for cultural faith, no proselytizing; then Valeu !!!',
      simpleEs:
        'Expresión — dicho de proporción (oír 2× / hablar 1×); tipografía dois pouvi → dois ouvidos; respeto a la fe cultural, sin proselitismo; luego ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) =>
        x.id === entry.id ||
        x.id === 'deus-deu-dois-pouvi' ||
        /dois ouvidos/i.test(String(x.word || ''))
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'deus-abencoe' ||
          x.id === 'filho-de-deus' ||
          x.id === 'jesusamado'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Deus deu dois ouvidos)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entry = `    "deus deu dois ouvidos e uma boca": { tone: "calm", category: "Escuta", mundane: "Ditado — ouvir em dobro, falar em metade.", gloss: "Proporção oral — tipografia dois pouvi → dois ouvidos; ficha ≠ sermão; depois Valeu !!!", href: "/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html", en: "God gave two ears and one mouth", es: "Dios dio dos oídos y una boca", fr: "Dieu a donné deux oreilles et une bouche", it: "Dio ha dato due orecchie e una bocca", de: "Gott gab zwei Ohren und einen Mund", el: "ο Θεός έδωσε δύο αυτιά και ένα στόμα", la: "Deus duas aures et unum os dedit", yo: "Ọlọ́run fún ni etí méjì àti ẹnu kan", sw: "Mungu alitoa masikio mawili na mdomo mmoja", gez: "ʼƎgziʼabəḥer kəlʼe ʼəznat wa ʼaḥadu ʼaf wahabo", nl: "God gaf twee oren en één mond", pl: "Bóg dał dwoje uszu i jedne usta", ru: "Бог дал два уха и один рот", uk: "Бог дав два вуха і один рот", zh: "上帝给了两只耳朵一张嘴", ja: "神は耳を二つ、口を一つ与えた", ko: "신은 귀 두 개와 입 하나를 주셨다", ar: "الله أعطى أذنين وفما واحدا", he: "אלוהים נתן שני אוזניים ופה אחד", hi: "भगवान ने दो कान और एक मुँह दिया", tr: "Tanrı iki kulak ve bir ağız verdi", sv: "Gud gav två öron och en mun", da: "Gud gav to ører og én mund", no: "Gud ga to ører og én munn", fi: "Jumala antoi kaksi korvaa ja yhden suun", cs: "Bůh dal dvě uši a jedna ústa", ro: "Dumnezeu a dat două urechi și o gură", hu: "Isten két fület és egy szájat adott", ca: "Déu va donar dues orelles i una boca", gl: "Deus deu dúas orellas e unha boca", eu: "Jainkoak bi belarri eta aho bat eman zituen", gn: "Tupã omeʼẽ mokõi nambi ha peteĩ juru", qu: "Diyus iskay rinrita huk simitawan qurqa", eo: "Dio donis du orelojn kaj unu buŝon", vi: "Chúa cho hai tai và một miệng", id: "Tuhan memberi dua telinga dan satu mulut", th: "พระเจ้าประทานหูสองข้างและปากหนึ่ง", hr: "Bog je dao dva uha i jedna usta", sk: "Boh dal dve uši a jedny ústa", ga: "Thug Dia dhá chluas agus béal amháin", cy: "Rhoddodd Duw ddwy glust ac un geg", ha: "Allah ya ba da kunnuwa biyu da baki ɗaya", am: "እግዚአብሔር ሁለት ጆሮና አንድ አፍ ሰጠ", fa: "خدا دو گوش و یک دهان داد", bn: "ঈশ্বর দিয়েছেন দুই কান ও এক মুখ", zu: "UNkulunkulu wanikeza izindlebe ezimbili nomlomo owodwa" },`;
    const alias = `    "dois pouvi": { gloss: "Tipografia / oral truncado → ver «Deus deu dois ouvidos e uma boca» (canónico: ouvidos).", href: "/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html", en: "see Deus deu dois ouvidos…", es: "ver Deus deu dois ouvidos…", fr: "voir Deus deu dois ouvidos…", it: "vedi Deus deu dois ouvidos…", de: "siehe Deus deu dois ouvidos…", el: "βλ. Deus deu dois ouvidos…", la: "vide Deus deu dois ouvidos…", yo: "Deus deu dois ouvidos", sw: "Deus deu dois ouvidos", gez: "Deus deu dois ouvidos", nl: "zie Deus deu dois ouvidos…", pl: "zob. Deus deu dois ouvidos…", ru: "см. Deus deu dois ouvidos…", uk: "див. Deus deu dois ouvidos…", zh: "见 Deus deu dois ouvidos…", ja: "Deus deu dois ouvidos… を参照", ko: "Deus deu dois ouvidos… 참조", ar: "انظر Deus deu dois ouvidos…", he: "ראה Deus deu dois ouvidos…", hi: "Deus deu dois ouvidos… देखें", tr: "Deus deu dois ouvidos… bak", sv: "se Deus deu dois ouvidos…", da: "se Deus deu dois ouvidos…", no: "se Deus deu dois ouvidos…", fi: "ks. Deus deu dois ouvidos…", cs: "viz Deus deu dois ouvidos…", ro: "vezi Deus deu dois ouvidos…", hu: "lásd Deus deu dois ouvidos…", ca: "vegeu Deus deu dois ouvidos…", gl: "ver Deus deu dois ouvidos…", eu: "ikusi Deus deu dois ouvidos…", gn: "Deus deu dois ouvidos", qu: "Deus deu dois ouvidos", eo: "vidu Deus deu dois ouvidos…", vi: "xem Deus deu dois ouvidos…", id: "lihat Deus deu dois ouvidos…", th: "ดู Deus deu dois ouvidos…", hr: "vidi Deus deu dois ouvidos…", sk: "pozri Deus deu dois ouvidos…", ga: "féach Deus deu dois ouvidos…", cy: "gweler Deus deu dois ouvidos…", ha: "duba Deus deu dois ouvidos…", am: "Deus deu dois ouvidos", fa: "Deus deu dois ouvidos", bn: "Deus deu dois ouvidos", zu: "Deus deu dois ouvidos" },`;
    const alias2 = `    "dois ouvidos": { gloss: "Peça do ditado — ver «Deus deu dois ouvidos e uma boca».", href: "/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html", en: "two ears (proverb)", es: "dos oídos (dicho)", fr: "deux oreilles (dicton)", it: "due orecchie (detto)", de: "zwei Ohren (Sprichwort)", el: "δύο αυτιά", la: "duae aures", yo: "etí méjì", sw: "masikio mawili", gez: "kəlʼe ʼəznat", nl: "twee oren", pl: "dwoje uszu", ru: "два уха", uk: "два вуха", zh: "两只耳朵", ja: "二つの耳", ko: "두 귀", ar: "أذنان", he: "שני אוזניים", hi: "दो कान", tr: "iki kulak", sv: "två öron", da: "to ører", no: "to ører", fi: "kaksi korvaa", cs: "dvě uši", ro: "două urechi", hu: "két fül", ca: "dues orelles", gl: "dúas orellas", eu: "bi belarri", gn: "mokõi nambi", qu: "iskay rinri", eo: "du oreloj", vi: "hai tai", id: "dua telinga", th: "สองหู", hr: "dva uha", sk: "dve uši", ga: "dhá chluas", cy: "dwy glust", ha: "kunnuwa biyu", am: "ሁለት ጆሮ", fa: "دو گوش", bn: "দুই কান", zu: "izindlebe ezimbili" },`;

    if (/"deus deu dois ouvidos e uma boca":\s*\{/.test(gloss)) {
      gloss = gloss.replace(
        /    "deus deu dois ouvidos e uma boca":\s*\{[\s\S]*?\},/,
        entry
      );
      console.log('Glossário: deus deu dois ouvidos actualizado');
    } else {
      const re = /("deus abençoe":\s*\{[\s\S]*?\},)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1\n' + entry);
        console.log('Glossário: deus deu dois ouvidos após deus abençoe');
      } else {
        const re2 = /("filho de deus":\s*\{[\s\S]*?\},)/;
        if (re2.test(gloss)) {
          gloss = gloss.replace(re2, '$1\n' + entry);
          console.log('Glossário: deus deu dois ouvidos após filho de deus');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    }
    if (/"dois pouvi":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "dois pouvi":\s*\{[\s\S]*?\},/, alias);
      console.log('Glossário: alias dois pouvi actualizado');
    } else if (/"deus deu dois ouvidos e uma boca":\s*\{/.test(gloss)) {
      gloss = gloss.replace(
        /("deus deu dois ouvidos e uma boca":\s*\{[\s\S]*?\},)/,
        '$1\n' + alias
      );
      console.log('Glossário: alias dois pouvi inserido');
    }
    if (/"dois ouvidos":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "dois ouvidos":\s*\{[\s\S]*?\},/, alias2);
      console.log('Glossário: alias dois ouvidos actualizado');
    } else if (/"dois pouvi":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/("dois pouvi":\s*\{[\s\S]*?\},)/, '$1\n' + alias2);
      console.log('Glossário: alias dois ouvidos inserido');
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
