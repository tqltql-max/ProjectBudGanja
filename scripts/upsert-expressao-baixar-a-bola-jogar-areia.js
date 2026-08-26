'use strict';

/**
 * Injeta o par de pátio «baixar a bola» × «jogar areia».
 * Uso: node scripts/upsert-expressao-baixar-a-bola-jogar-areia.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildBaixarABolaPost } = require('../lib/baixar-a-bola-inspecao-post.js');
const { buildJogarAreiaPost } = require('../lib/jogar-areia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF_BOLA = '/posts/post-inspecao-expressao-baixar-a-bola.html';
const HREF_AREIA = '/posts/post-inspecao-expressao-jogar-areia.html';

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

function insertAfterNeedle(gloss, needle, block) {
  const idx = gloss.indexOf(needle);
  if (idx < 0) return null;
  const end = gloss.indexOf('\n', idx);
  if (end < 0) return null;
  return gloss.slice(0, end + 1) + block + gloss.slice(end + 1);
}

function langsBola() {
  return 'en: "tone it down / take it down a notch", es: "bajar los humos / bajar el tono", fr: "baisser le ton / rabattre le caquet", it: "abbassare la cresta", de: "einen Gang runterschalten", el: "katevaso tous tonous", la: "fastum deponere", yo: "sọ igberaga kalẹ", sw: "shusha kiburi", gez: "baixar a bola", nl: "een toontje lager zingen", pl: "spusc airy", ru: "sbit spec", uk: "prybity pykhu", zh: "lian dian", ja: "kibi wo sagaru", ko: "gi sejukida", ar: "khaffif al-ghurur", he: "lehorid et ha-nose", hi: "akad utaro", tr: "hava indirmek", sv: "tona ned", da: "tone ned", no: "tone ned", fi: "laske kierroksia", cs: "uber plyn", ro: "lasa nasul jos", hu: "vedd egy kicsit vissza", ca: "abaixar els fums", gl: "baixar os foles", eu: "harrokeria jaitsi", gn: "mboguejy pe yvate", qu: "urinay", eo: "malaltigi la tonon", vi: "ha giong", id: "turunkan nada", th: "ลดท่า", hr: "spusti loptu", sk: "uber plyn", ga: "isir an ton", cy: "gostwng y bel", ha: "sauke girman kai", am: "ትዕቢት አውርድ", fa: "bad bekhoshan", bn: "অহংকার নামাও", zu: "yehlisa ibhola"';
}

function langsAreia() {
  return 'en: "throw sand / throw a wrench in the works", es: "echar arena / poner palos en la rueda", fr: "jeter du sable / mettre des batons dans les roues", it: "mettere i bastoni fra le ruote", de: "Sand ins Getriebe streuen", el: "richno ammo", la: "arenam inicere", yo: "sọ iyanrìn", sw: "tupa mchanga", gez: "jogar areia", nl: "zand in de machine strooien", pl: "sypac piasek", ru: "sypat pesok", uk: "sypaty pisok", zh: "chan sha", ja: "suna wo maku", ko: "moreo deonneunda", ar: "yarmi al-raml", he: "lizrok chol", hi: "ret phenkna", tr: "kum atmak", sv: "kasta sand", da: "kaste sand", no: "kaste sand", fi: "heittaa hiekkaa", cs: "sypat pisek", ro: "arunca nisip", hu: "homokot szorni", ca: "tirar sorra", gl: "botar area", eu: "hondarra bota", gn: "mbojere yvyku i", qu: "aqu wikchuy", eo: "jeti sablon", vi: "nem cat", id: "lempar pasir", th: "โยนทราย", hr: "bacati pijesak", sk: "sypat piesok", ga: "gaineamh a chaitheamh", cy: "taflu tywod", ha: "jefa yashi", am: "አሸዋ ውርውር", fa: "shen rikhtan", bn: "বালি ছোঁড়া", zu: "phonsa isihlabathi"';
}

function patchGlossary(gloss) {
  const bolaMain =
    '    "baixar a bola": { tone: "craft", category: "Pátio", mundane: "Descer o orgulho, o ritmo ou a pretensão; a bola volta ao chão.", gloss: "Baixar + a + bola — altitude que desce; ≠ humilhar ≠ bola pra frente ≠ pisar na bola ≠ jogar areia; Valeu !!!", href: "' +
    HREF_BOLA +
    '", ' +
    langsBola() +
    ' },\n';
  const bolaAliases =
    '    "baixa a bola": { gloss: "Imperativo oral — ver baixar a bola.", href: "' +
    HREF_BOLA +
    '", en: "tone it down (oral)", es: "baja los humos" },\n' +
    '    "baixa a bolinha": { gloss: "Diminutivo oral — ver baixar a bola.", href: "' +
    HREF_BOLA +
    '", en: "take it down a notch (oral)", es: "baja el tonito" },\n' +
    '    "abaixar a bola": { gloss: "Variante com a- — mesma sala que baixar a bola.", href: "' +
    HREF_BOLA +
    '", en: "tone it down", es: "bajar los humos" },\n' +
    '    "baixar a bolinha": { gloss: "Diminutivo — ver baixar a bola.", href: "' +
    HREF_BOLA +
    '", en: "take it down a notch", es: "bajar el tonito" },\n';
  const areiaMain =
    '    "jogar areia": { tone: "caution", category: "Pátio", mundane: "Atrapalhar, sabotar ou desanimar o plano alheio; grão na engrenagem.", gloss: "Jogar + areia — atrito no jogo alheio; ≠ sabotagem-manual ≠ ventilador ≠ praia ≠ baixar a bola; Valeu !!!", href: "' +
    HREF_AREIA +
    '", ' +
    langsAreia() +
    ' },\n';
  const areiaAliases =
    '    "jogar areia nos planos": { gloss: "Variante de pátio — ver jogar areia.", href: "' +
    HREF_AREIA +
    '", en: "throw sand on the plans", es: "echar arena a los planes" },\n' +
    '    "botar areia": { gloss: "Variante oral — ver jogar areia.", href: "' +
    HREF_AREIA +
    '", en: "put sand (in the works)", es: "poner arena" },\n' +
    '    "jogar areia no ventilador": { gloss: "Sala irmã — espalhar escândalo; não é a âncora jogar areia.", href: "' +
    HREF_AREIA +
    '", en: "throw sand in the fan / air dirty laundry", es: "echar arena al ventilador" },\n' +
    '    "atirar areia": { gloss: "Variante — ver jogar areia; ≠ areia nos olhos como briga.", href: "' +
    HREF_AREIA +
    '", en: "throw sand", es: "tirar arena" },\n';

  if (!gloss.includes('"baixar a bola":')) {
    const afterMao = insertAfterNeedle(gloss, '    "meter a mão na consciência": { gloss:', bolaMain + bolaAliases);
    gloss = afterMao || gloss;
    if (!gloss.includes('"baixar a bola":')) {
      console.warn('Aviso: glossário — inserção baixar a bola falhou');
    }
  }
  if (!gloss.includes('"jogar areia":')) {
    const afterBola = insertAfterNeedle(gloss, '    "baixar a bolinha": { gloss:', areiaMain + areiaAliases);
    gloss = afterBola || gloss;
    if (!gloss.includes('"jogar areia":')) {
      console.warn('Aviso: glossário — inserção jogar areia falhou');
    }
  }
  return gloss;
}

function upsertSug(sug, post, spec) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === spec.id);
  const entry = Object.assign(
    {
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      suggestedSlug: post.slug,
      doneHref: spec.href,
      seriesHint: 'expressoes-ditados',
      sources: spec.sources,
      notes: 'Cap. ' + post.seriesOrder + ' — ' + spec.notes
    },
    spec.fields,
    { id: spec.id }
  );
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterIds) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  for (const script of ['generate-baixar-a-bola-cover.js', 'generate-jogar-areia-cover.js']) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], { cwd: ROOT, stdio: 'inherit' });
    } catch (e) {
      console.warn('Aviso capa ' + script + ':', e.message);
    }
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const postBola = stampFiles(buildBaixarABolaPost());
  upsertPost(posts, postBola);
  await writeJsonRetry(POSTS_FILE, posts);
  const postAreia = stampFiles(buildJogarAreiaPost());
  if (Number(postAreia.seriesOrder) === Number(postBola.seriesOrder)) {
    postAreia.seriesOrder = Number(postBola.seriesOrder) + 1;
  }
  upsertPost(posts, postAreia);
  writeHtml(postBola);
  writeHtml(postAreia);
  writeI18n(i18n, postBola);
  writeI18n(i18n, postAreia);

  upsertSug(sug, postBola, {
    id: 'expressao-baixar-a-bola',
    href: HREF_BOLA,
    notes: 'pátio × altitude; irmã de jogar areia.',
    sources: [
      postBola.sourceUrl,
      'https://pt.wiktionary.org/wiki/bola',
      HREF_AREIA,
      '/posts/post-inspecao-palavra-respeito.html',
      '/posts/post-inspecao-palavra-gesto.html'
    ],
    fields: {
      title: 'Baixar a bola — o orgulho que desce ao chão',
      titleEn: 'Baixar a bola — pride that comes down to the ground',
      titleEs: 'Baixar a bola — el orgullo que baja al suelo',
      why: 'Expressões: baixar a bola — descer o orgulho / o ritmo; ≠ humilhar ≠ bola pra frente ≠ pisar na bola; irmã de jogar areia; Valeu !!!',
      whyEn: 'Sayings: baixar a bola — lower the pride / the pace; ≠ humiliation ≠ ball-forward; sister of jogar areia; Valeu !!!',
      whyEs: 'Dichos: baixar a bola — bajar el orgullo / el ritmo; ≠ humillar ≠ bola pra frente; hermana de jogar areia; ¡Valeu !!!'
    }
  });
  upsertSug(sug, postAreia, {
    id: 'expressao-jogar-areia',
    href: HREF_AREIA,
    notes: 'pátio × atrito; irmã de baixar a bola.',
    sources: [
      postAreia.sourceUrl,
      'https://pt.wiktionary.org/wiki/areia',
      HREF_BOLA,
      '/posts/post-inspecao-palavra-respeito.html',
      '/posts/post-inspecao-palavra-risco.html'
    ],
    fields: {
      title: 'Jogar areia — o grão no jogo alheio',
      titleEn: 'Jogar areia — grit in someone else’s game',
      titleEs: 'Jogar areia — el grano en el juego ajeno',
      why: 'Expressões: jogar areia — atrapalhar o plano alheio; ≠ sabotagem-manual ≠ ventilador ≠ praia; irmã de baixar a bola; Valeu !!!',
      whyEn: 'Sayings: jogar areia — hinder someone else’s plan; ≠ sabotage how-to ≠ fan ≠ beach; sister of baixar a bola; Valeu !!!',
      whyEs: 'Dichos: jogar areia — estorbar el plan ajeno; ≠ manual de sabotaje ≠ ventilador ≠ playa; hermana de baixar a bola; ¡Valeu !!!'
    }
  });

  upsertGuia(
    guia,
    {
      id: 'baixar-a-bola',
      word: 'baixar a bola',
      group: 'lexico',
      fromTitle: false,
      href: HREF_BOLA,
      simple: 'Locução BR — descer o orgulho / o ritmo; ≠ humilhar ≠ bola pra frente ≠ pisar na bola; Valeu !!!',
      simpleEn: 'BR saying — lower the pride / the pace; ≠ humiliation ≠ ball-forward; Valeu !!!',
      simpleEs: 'Dicho BR — bajar el orgullo / el ritmo; ≠ humillar ≠ bola pra frente; ¡Valeu !!!',
      history:
        'Baixar (lat. bassus «baixo») + a + bola (lat. bulla). Pedido de campo 2026-08-24: expressões populares baixar a bola e jogar areia.',
      curiosities:
        'Imagem de futebol (bola alta perde o controlo). Irmã invertida de jogar areia (altitude própria × grão no jogo alheio).',
      historyEn:
        'Portuguese baixar (Lat. bassus “low”) + a + bola (Lat. bulla). Field request 2026-08-24: inspect baixar a bola and jogar areia.',
      curiositiesEn:
        'Football image (a high ball loses control). Inverse sister of jogar areia (own altitude × grit in the other’s game).',
      historyEs:
        'Baixar (lat. bassus «bajo») + a + bola (lat. bulla). Pedido de campo 2026-08-24: expresiones populares baixar a bola y jogar areia.',
      curiositiesEs:
        'Imagen de fútbol (pelota alta pierde el control). Hermana invertida de jogar areia (altitud propia × grano en el juego ajeno).'
    },
    ['meter-a-mao']
  );
  upsertGuia(
    guia,
    {
      id: 'jogar-areia',
      word: 'jogar areia',
      group: 'lexico',
      fromTitle: false,
      href: HREF_AREIA,
      simple: 'Locução BR — atrapalhar o plano alheio; ≠ sabotagem-manual ≠ ventilador ≠ praia; Valeu !!!',
      simpleEn: 'BR saying — hinder someone else’s plan; ≠ sabotage how-to ≠ fan ≠ beach; Valeu !!!',
      simpleEs: 'Dicho BR — estorbar el plan ajeno; ≠ manual de sabotaje ≠ ventilador ≠ playa; ¡Valeu !!!',
      history:
        'Jogar (lat. iocare «brincar / lançar») + areia (lat. arena). Pedido de campo 2026-08-24: expressões populares baixar a bola e jogar areia.',
      curiosities:
        'Imagem: areia na engrenagem. Sala irmã: jogar areia no ventilador (escândalo). Irmã invertida de baixar a bola.',
      historyEn:
        'Portuguese jogar (Lat. iocare “to play / to throw”) + areia (Lat. arena). Field request 2026-08-24: inspect baixar a bola and jogar areia.',
      curiositiesEn:
        'Image: sand in the gearbox. Sister room: sand in the fan (scandal). Inverse sister of baixar a bola.',
      historyEs:
        'Jogar (lat. iocare «jugar / lanzar») + areia (lat. arena). Pedido de campo 2026-08-24: expresiones populares baixar a bola y jogar areia.',
      curiositiesEs:
        'Imagen: arena en el engranaje. Sala hermana: arena en el ventilador (escándalo). Hermana invertida de baixar a bola.'
    },
    ['baixar-a-bola']
  );

  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (baixar a bola × jogar areia)');
  }

  for (const post of [postBola, postAreia]) {
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', postBola.title, '· Cap.', postBola.seriesOrder);
  console.log('OK:', postAreia.title, '· Cap.', postAreia.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
