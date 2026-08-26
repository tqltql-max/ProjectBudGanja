'use strict';

/**
 * Injeta expressão «a bença» (pedir bênção · dorme com Deus · amém).
 * Uso: node scripts/upsert-expressao-a-benca.js
 */

const fs = require('fs');
const path = require('path');
const { buildABencaPost } = require('../lib/a-benca-inspecao-post.js');

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
  const draft = buildABencaPost();
  const free = nextFreeSeriesOrder(posts, draft.seriesOrder, draft.slug);
  const post = free !== draft.seriesOrder ? buildABencaPost(free) : draft;

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-a-benca';
    const si = items.findIndex(
      (x) =>
        x.id === sugId ||
        /a bença|dorme com deus|pedir ben/i.test(String(x.title || ''))
    );
    const entry = {
      id: sugId,
      title: 'a bença — pedir bênção, dorme com Deus e amém',
      titleEn: 'a bença — asking a blessing, sleep with God and amen',
      titleEs: 'a bença — pedir la bendición, duerme con Dios y amén',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: a bença — pedido BR; sequência Deus te abençoe · dorme com Deus · amém; irmã de Deus abençoe; sem catecismo.',
      whyEn: 'Sayings: a bença — BR request; God bless you · sleep with God · amen; sister of Deus abençoe; no catechism.',
      whyEs: 'Dichos: a bença — pedido BR; Dios te bendiga · duerme con Dios · amén; hermana de Deus abençoe; sin catecismo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-deus-abencoe.html',
        '/posts/post-inspecao-palavra-mae.html',
        '/posts/post-inspecao-palavra-noite.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. Expressões — pedir bença ≠ dar Deus abençoe; tipografia amem → amém.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-a-benca)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'a-benca',
      word: 'a bença',
      simple:
        'Expressão — pedido BR de bênção (pai/mãe); sequência Deus te abençoe · dorme com Deus · amém; irmã de Deus abençoe; depois Valeu !!!',
      simpleEn:
        'Saying — BR request for a blessing; sequence God bless you · sleep with God · amen; sister of Deus abençoe; then Valeu !!!',
      simpleEs:
        'Expresión — pedido BR de bendición; secuencia Dios te bendiga · duerme con Dios · amén; hermana de Deus abençoe; luego ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'deus-abencoe' || x.id === 'deus abençoe'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (a bença)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const main = `    "a bença": { tone: "warm", category: "Bênção", mundane: "Pedido oral de bênção (pai/mãe/mais velho).", gloss: "Pedir bença — sequência Deus te abençoe · dorme com Deus · amém; irmã de Deus abençoe; sem catecismo.", href: "${href}", en: "your blessing (request)", es: "la bendición (pedido)", fr: "ta bénédiction (demande)", it: "la benedizione (richiesta)", de: "den Segen (Bitte)", el: "την ευλογία (αίτηση)", la: "benedictio petita", yo: "ìbùkún (ìbéèrè)", sw: "baraka (ombi)", gez: "bərkät", nl: "je zegen (verzoek)", pl: "błogosławieństwo (prośba)", ru: "благословение (просьба)", uk: "благословення (прохання)", zh: "求祝福", ja: "祝福を乞う", ko: "축복을 구하다", ar: "طلب البركة", he: "בקשת ברכה", hi: "आशीर्वाद माँगना", tr: "hayır dua istemek", sv: "välsignelse (begäran)", da: "velsignelse (anmodning)", no: "velsignelse (forespørsel)", fi: "siunaus (pyyntö)", cs: "požehnání (prosba)", ro: "binecuvântare (cerere)", hu: "áldás (kérés)", ca: "la benedicció (petició)", gl: "a bénción (pedido)", eu: "bedeinkazioa (eskaera)", gn: "ñembo'e (jerure)", qu: "bendicion (mañakuy)", eo: "beno (peto)", vi: "xin phép lành", id: "minta berkat", th: "ขอพร", hr: "blagoslov (molba)", sk: "požehnanie (prosba)", ga: "beannacht (iarratas)", cy: "bendith (cais)", ha: "albarka (roko)", am: "በረከት መጠየቅ", fa: "طلب برکت", bn: "আশীর্বাদ চাওয়া", zu: "isibusiso (isicelo)" },`;
    const aliasBenca = `    bença: { gloss: "Oral de bênção — ver «a bença» (pedido).", href: "${href}", en: "blessing (oral)", es: "bendición (oral)" },`;
    const aliasBenca2 = `    benca: { gloss: "Tipografia sem cedilha → ver «a bença».", href: "${href}", en: "see a bença", es: "ver a bença" },`;
    const aliasDorme = `    "dorme com deus": { tone: "warm", category: "Bênção", mundane: "Boa-noite com cuidado.", gloss: "Noite da sequência a bença — deitar sem chantagem; elo noite; depois Valeu !!!", href: "${href}", en: "sleep with God", es: "duerme con Dios", fr: "dors avec Dieu", it: "dormi con Dio", de: "schlafe mit Gott", el: "κοιμήσου με τον Θεό", la: "dormi cum Deo", yo: "sùn pẹ̀lú Ọlọ́run", sw: "lala na Mungu", gez: "nəm ʼƎgziʼabəḥer", nl: "slaap met God", pl: "śpij z Bogiem", ru: "спи с Богом", uk: "спи з Богом", zh: "与上帝同眠", ja: "神とともに眠れ", ko: "하나님과 함께 자라", ar: "نم مع الله", he: "ישן עם אלוהים", hi: "भगवान के साथ सो", tr: "Tanrı ile uyu", sv: "sov med Gud", da: "sov med Gud", no: "sov med Gud", fi: "nuku Jumalan kanssa", cs: "spi s Bohem", ro: "dormi cu Dumnezeu", hu: "aludj Istennel", ca: "dorm amb Déu", gl: "durme con Deus", eu: "lo egin Jainkoarekin", gn: "kera Tupã ndive", qu: "Diyuswan puñuy", eo: "dormu kun Dio", vi: "ngủ cùng Chúa", id: "tidur bersama Tuhan", th: "หลับกับพระเจ้า", hr: "spavaj s Bogom", sk: "spi s Bohom", ga: "codail le Dia", cy: "cysga gyda Duw", ha: "yi barci da Allah", am: "ከእግዚአብሔር ጋር ተኛ", fa: "با خدا بخواب", bn: "ঈশ্বরের সাথে ঘুমাও", zu: "lala noNkulunkulu" },`;
    const aliasAmen = `    amém: { tone: "warm", category: "Bênção", mundane: "Selo de oração — «assim seja».", gloss: "Fecha a sequência a bença; tipografia amem → amém; não é prova de fé.", href: "${href}", en: "amen", es: "amén", fr: "amen", it: "amen", de: "Amen", el: "αμήν", la: "amen", yo: "àmíìn", sw: "amina", gez: "amen", nl: "amen", pl: "amen", ru: "аминь", uk: "амінь", zh: "阿们", ja: "アーメン", ko: "아멘", ar: "آمين", he: "אמן", hi: "आमेन", tr: "amin", sv: "amen", da: "amen", no: "amen", fi: "aamen", cs: "amen", ro: "amin", hu: "ámen", ca: "amén", gl: "amén", eu: "amen", gn: "amén", qu: "amen", eo: "amen", vi: "amen", id: "amin", th: "อาเมน", hr: "amen", sk: "amen", ga: "áiméan", cy: "amen", ha: "amin", am: "አሜን", fa: "آمین", bn: "আমেন", zu: "amen" },`;
    const aliasAmem = `    amem: { gloss: "Tipografia / oral sem acento → ver amém (selo da bença).", href: "${href}", en: "see amém", es: "ver amén" },`;

    const afterAbencoe = /("deus abenço":\s*\{[\s\S]*?\},)/;
    if (/"a bença":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "a bença":\s*\{[\s\S]*?\},/, main);
      console.log('Glossário: a bença actualizado');
    } else if (afterAbencoe.test(gloss)) {
      gloss = gloss.replace(afterAbencoe, '$1\n' + main);
      console.log('Glossário: a bença após deus abenço');
    } else {
      console.warn('Aviso: glossário — ponto de inserção não encontrado');
    }

    const extras = [
      [/"bença":\s*\{[\s\S]*?\},/, /    bença: \{[\s\S]*?\},/, aliasBenca, 'bença', /("a bença":\s*\{[\s\S]*?\},)/],
      [/    benca: \{[\s\S]*?\},/, /    benca: \{[\s\S]*?\},/, aliasBenca2, 'benca', /(    bença: \{[\s\S]*?\},)/],
      [/"dorme com deus":\s*\{[\s\S]*?\},/, /    "dorme com deus": \{[\s\S]*?\},/, aliasDorme, 'dorme com deus', /(    benca: \{[\s\S]*?\},)/],
      [/    amém: \{[\s\S]*?\},/, /    amém: \{[\s\S]*?\},/, aliasAmen, 'amém', /("dorme com deus":\s*\{[\s\S]*?\},)/],
      [/    amem: \{[\s\S]*?\},/, /    amem: \{[\s\S]*?\},/, aliasAmem, 'amem', /(    amém: \{[\s\S]*?\},)/]
    ];
    for (const [hasRe, replaceRe, entry, label, afterRe] of extras) {
      if (hasRe.test(gloss)) {
        gloss = gloss.replace(replaceRe, entry);
        console.log('Glossário:', label, 'actualizado');
      } else if (afterRe.test(gloss)) {
        gloss = gloss.replace(afterRe, '$1\n' + entry);
        console.log('Glossário:', label, 'inserido');
      }
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
