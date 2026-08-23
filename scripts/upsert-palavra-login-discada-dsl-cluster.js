'use strict';

/**
 * Cluster Log In · internet discada · DSL · actualiza conexão.
 * Uso: node scripts/upsert-palavra-login-discada-dsl-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLoginPost, poemPt: loginPt, poemEn: loginEn, poemEs: loginEs } = require('../lib/login-inspecao-post.js');
const {
  buildInternetDiscadaPost,
  poemPt: discadaPt,
  poemEn: discadaEn,
  poemEs: discadaEs
} = require('../lib/internet-discada-inspecao-post.js');
const { buildDslPost, poemPt: dslPt, poemEn: dslEn, poemEs: dslEs } = require('../lib/dsl-inspecao-post.js');
const { buildConexaoPost } = require('../lib/conexao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

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

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const loginHref = '/posts/post-inspecao-palavra-login.html';
  const discadaHref = '/posts/post-inspecao-palavra-internet-discada.html';
  const dslHref = '/posts/post-inspecao-palavra-dsl.html';
  const conexaoHref = '/posts/post-inspecao-palavra-conexao.html';

  const loginMain =
    '    login: { tone: "craft", category: "Menu", mundane: "Empréstimo EN — entrar na sessão (log + in).", gloss: "Log In / login; lapso Longin; porta ≠ cano (conexão) ≠ discada ≠ DSL ≠ Save Game; Valeu !!!", href: "' +
    loginHref +
    '", en: "login / log in", es: "inicio de sesión", fr: "connexion", it: "accesso", de: "Anmeldung", el: "σύνδεση", la: "introitus", yo: "wọlé", sw: "ingia", gez: "login", nl: "inloggen", pl: "logowanie", ru: "вход", uk: "вхід", zh: "登录", ja: "ログイン", ko: "로그인", ar: "تسجيل الدخول", he: "כניסה", hi: "लॉग इन", tr: "giriş", sv: "inloggning", da: "log ind", no: "innlogging", fi: "kirjautuminen", cs: "přihlášení", ro: "autentificare", hu: "bejelentkezés", ca: "inici de sessió", gl: "inicio de sesión", eu: "saioa hasi", gn: "keikei", qu: "yaykuy", eo: "ensaluto", vi: "đăng nhập", id: "masuk", th: "เข้าสู่ระบบ", hr: "prijava", sk: "prihlásenie", ga: "logáil isteach", cy: "mewngofnodi", ha: "shiga", am: "ግባ", fa: "ورود", bn: "লগ ইন", zu: "ngena" },\n';

  gloss = replaceOrInsertAfter(gloss, 'login', loginMain, 'homepage');
  const loginAliases = [
    '    "log in": { gloss: "Duas peças do botão — ver login.", href: "' + loginHref + '", en: "log in", es: "iniciar sesión" },\n',
    '    "log-in": { gloss: "Hífen — o mesmo ofício; ver login.", href: "' + loginHref + '", en: "log-in", es: "log-in" },\n',
    '    longin: { gloss: "Lapso de Login — ver Log In.", href: "' + loginHref + '", en: "Longin (slip)", es: "Longin (lapsus)" },\n',
    '    "log out": { gloss: "Sair da sessão — eixo oposto; ver Log In.", href: "' + loginHref + '", en: "log out", es: "cerrar sesión" },\n',
    '    logout: { gloss: "Uma palavra — ver Log In (o inverso).", href: "' + loginHref + '", en: "logout", es: "logout" },\n',
    '    "sign in": { gloss: "Irmã de menu — entrar; ≠ sign up; ver Log In.", href: "' + loginHref + '", en: "sign in", es: "iniciar sesión" },\n'
  ];
  for (const line of loginAliases) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9-]+):/)[1];
    gloss = replaceOrInsertAfter(gloss, key, line, 'login');
  }

  const discadaMain =
    '    "internet discada": { tone: "craft", category: "Rede", mundane: "Acesso dial-up — o cano que telefona e ocupa a voz.", gloss: "Calco de dial-up; smash niocenchcadaro → conexão discada; ≠ DSL ≠ login; Valeu !!!", href: "' +
    discadaHref +
    '", en: "dial-up internet", es: "internet por marcación", fr: "internet par RTC", it: "internet dial-up", de: "Einwahl-Internet", el: "dial-up", la: "interrete vocale", yo: "intanẹẹti alohùn", sw: "intaneti ya simu", gez: "dial-up", nl: "inbelinternet", pl: "internet wdzwaniany", ru: "диалап", uk: "діалап", zh: "拨号上网", ja: "ダイヤルアップ", ko: "다이얼업", ar: "اتصال هاتفي", he: "חיוג", hi: "डायल-अप", tr: "çevirmeli internet", sv: "uppringt internet", da: "opkaldsinternet", no: "oppringt internett", fi: "modeemiyhteys", cs: "vytáčené připojení", ro: "internet dial-up", hu: "betárcsázós net", ca: "internet commutada", gl: "internet discada", eu: "markatze-interneta", gn: "internet ñe\'ẽmbyry", qu: "waqaykuna internet", eo: "telefonreta interreto", vi: "internet quay số", id: "internet dial-up", th: "อินเทอร์เน็ตไดอัลอัป", hr: "dial-up internet", sk: "vytáčané pripojenie", ga: "idirlíon diailithe", cy: "rhyngrwyd deialu", ha: "intanet ta waya", am: "የስልክ ኢንተርኔት", fa: "دیال‌آپ", bn: "ডায়াল-আপ", zu: "i-inthanethi yocingo" },\n';
  gloss = replaceOrInsertAfter(gloss, '"internet discada"', discadaMain, 'login');
  const discadaAliases = [
    '    discada: { gloss: "Oral BR do meio dial-up — ver internet discada.", href: "' + discadaHref + '", en: "dial-up", es: "discada" },\n',
    '    "acesso discado": { gloss: "Nome técnico PT — ver internet discada.", href: "' + discadaHref + '", en: "dial-up access", es: "acceso conmutado" },\n',
    '    "dial-up": { gloss: "Inglês de manual — ver internet discada.", href: "' + discadaHref + '", en: "dial-up", es: "dial-up" },\n',
    '    niocenchcadaro: { gloss: "Smash de conexão discada — ver internet discada.", href: "' + discadaHref + '", en: "keyboard smash", es: "smash de teclado" },\n',
    '    "conexão discada": { gloss: "A conexão neste meio — ver internet discada e conexão.", href: "' + discadaHref + '", en: "dial-up connection", es: "conexión discada" },\n'
  ];
  for (const line of discadaAliases) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9-]+):/)[1];
    gloss = replaceOrInsertAfter(gloss, key, line, '"internet discada"');
  }

  const dslMain =
    '    dsl: { tone: "craft", category: "Sigla", mundane: "Digital Subscriber Line — linha digital de assinante.", gloss: "Sigla EN; cano no cobre sempre no ar; ≠ discada ≠ login ≠ fibra; Valeu !!!", href: "' +
    dslHref +
    '", en: "DSL", es: "DSL", fr: "DSL", it: "DSL", de: "DSL", el: "DSL", la: "DSL", yo: "DSL", sw: "DSL", gez: "DSL", nl: "DSL", pl: "DSL", ru: "DSL", uk: "DSL", zh: "数字用户线路", ja: "DSL", ko: "DSL", ar: "DSL", he: "DSL", hi: "DSL", tr: "DSL", sv: "DSL", da: "DSL", no: "DSL", fi: "DSL", cs: "DSL", ro: "DSL", hu: "DSL", ca: "DSL", gl: "DSL", eu: "DSL", gn: "DSL", qu: "DSL", eo: "DSL", vi: "DSL", id: "DSL", th: "DSL", hr: "DSL", sk: "DSL", ga: "DSL", cy: "DSL", ha: "DSL", am: "DSL", fa: "DSL", bn: "DSL", zu: "i-DSL" },\n';
  gloss = replaceOrInsertAfter(gloss, 'dsl', dslMain, '"internet discada"');
  gloss = replaceOrInsertAfter(
    gloss,
    'adsl',
    '    adsl: { gloss: "ADSL — variante assimétrica da família DSL; ver DSL.", href: "' + dslHref + '", en: "ADSL", es: "ADSL" },\n',
    'dsl'
  );
  gloss = replaceOrInsertAfter(
    gloss,
    '"digital subscriber line"',
    '    "digital subscriber line": { gloss: "Expansão de DSL — ver a sigla.", href: "' + dslHref + '", en: "digital subscriber line", es: "línea de abonado digital" },\n',
    'dsl'
  );

  const conexaoMain =
    '    conexão: { tone: "craft", category: "Léxico", mundane: "Ação / efeito de conectar — grafia com x.", gloss: "Lat. connexio; ≠ conecção ≠ colchão; elos discada / DSL / login; smash niocenchcadaro; Valeu !!!", href: "' +
    conexaoHref +
    '", en: "connection", es: "conexión", fr: "connexion", it: "connessione", de: "Verbindung", el: "σύνδεση", la: "connexio", yo: "ìsopọ̀", sw: "muunganisho", gez: "täsäsäb", nl: "verbinding", pl: "połączenie", ru: "соединение", uk: "з’єднання", zh: "连接", ja: "接続", ko: "연결", ar: "اتصال", he: "חיבור", hi: "कनेक्शन", tr: "bağlantı", sv: "anslutning", da: "forbindelse", no: "tilkobling", fi: "yhteys", cs: "připojení", ro: "conexiune", hu: "kapcsolat", ca: "connexió", gl: "conexión", eu: "konexio", gn: "joaju", qu: "tinkiy", eo: "konekto", vi: "kết nối", id: "koneksi", th: "การเชื่อมต่อ", hr: "veza", sk: "pripojenie", ga: "nasc", cy: "cysylltiad", ha: "haɗi", am: "ግንኙነት", fa: "اتصال", bn: "সংযোগ", zu: "ukuxhumana" },\n';
  gloss = replaceOrInsertAfter(gloss, 'conexão', conexaoMain, 'dsl');
  const conexaoAliases = [
    '    conexao: { gloss: "Sem til — o mesmo lema conexão.", href: "' + conexaoHref + '", en: "conexao", es: "conexión" },\n',
    '    conecção: { gloss: "Erro frequente (ç) — lema conexão (x).", href: "' + conexaoHref + '", en: "misspelling of conexão", es: "conecção (error)" },\n',
    '    conecxao: { gloss: "Lapso c+x — ver conexão.", href: "' + conexaoHref + '", en: "slip for conexão", es: "lapsus de conexão" },\n'
  ];
  for (const line of conexaoAliases) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9çã-]+):/i)[1];
    gloss = replaceOrInsertAfter(gloss, key, line, 'conexão');
  }
  return gloss;
}

const ITEMS = [
  {
    build: buildLoginPost,
    sugId: 'palavra-login',
    sugTitle: 'Log In — a porta da sessão, não o cano',
    why: 'Palavras: Log In / login = log + in; lapso Longin; ≠ conexão ≠ discada ≠ DSL; Valeu !!!',
    guiaId: 'login',
    guiaWord: 'Log In',
    guiaSimple:
      'EN log + in — entrar na sessão. Lapso Longin. Porta ≠ cano (conexão) ≠ discada ≠ DSL ≠ Save Game. Valeu !!!',
    guiaAfter: ['homepage', 'save-game', 'conexao'],
    poem: { id: 'login', title: 'Log In', teaser: 'Duas peças inglesas na porta — Longin; a sessão, não o cano.', pt: loginPt, en: loginEn, es: loginEs, tags: ['poesia', 'vida', 'login', 'porta'] }
  },
  {
    build: buildInternetDiscadaPost,
    sugId: 'palavra-internet-discada',
    sugTitle: 'Internet discada — o cano que telefona',
    why: 'Palavras: internet discada = dial-up; smash niocenchcadaro; ≠ DSL ≠ login; Valeu !!!',
    guiaId: 'internet-discada',
    guiaWord: 'internet discada',
    guiaSimple:
      'Dial-up BR — o cano que disca e ocupa o telefone. Smash niocenchcadaro. ≠ DSL ≠ login. Valeu !!!',
    guiaAfter: ['login', 'conexao'],
    poem: { id: 'internet-discada', title: 'Internet discada', teaser: 'O telefone vira cano — niocenchcadaro; 56k.', pt: discadaPt, en: discadaEn, es: discadaEs, tags: ['poesia', 'vida', 'discada', 'internet'] }
  },
  {
    build: buildDslPost,
    sugId: 'palavra-dsl',
    sugTitle: 'DSL — a sigla do cano que fica',
    why: 'Palavras: DSL = Digital Subscriber Line; ≠ discada ≠ login ≠ fibra; Valeu !!!',
    guiaId: 'dsl',
    guiaWord: 'DSL',
    guiaSimple:
      'Sigla: Digital Subscriber Line. Cano digital no cobre, em regra sempre no ar. ≠ discada ≠ login ≠ fibra. Valeu !!!',
    guiaAfter: ['internet-discada', 'login'],
    poem: { id: 'dsl', title: 'DSL', teaser: 'Três letras no cobre — a linha do assinante, digital.', pt: dslPt, en: dslEn, es: dslEs, tags: ['poesia', 'vida', 'dsl', 'sigla'] }
  },
  {
    build: buildConexaoPost,
    sugId: 'palavra-conexao',
    sugTitle: 'Conexão — conectar + ação (grafia com x)',
    why: 'Palavras: conexão (x) ≠ conecção; lapsos conecxao / niocenchcadaro; elos discada DSL login; Valeu !!!',
    guiaId: 'conexao',
    guiaWord: 'conexão',
    guiaSimple:
      'Lat. connexio — ação de conectar; grafia com x. ≠ conecção ≠ colchão. Elos discada, DSL, Log In. Valeu !!!',
    guiaAfter: ['dsl', 'login', 'link'],
    poem: null
  }
];

function upsertSug(sug, post, cfg) {
  const href = '/posts/post-' + post.slug + '.html';
  upsertItem(
    sug.items || (sug.items = []),
    {
      id: cfg.sugId,
      title: cfg.sugTitle,
      titleEn: cfg.sugTitle,
      titleEs: cfg.sugTitle,
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: cfg.why,
      whyEn: cfg.why,
      whyEs: cfg.why,
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [post.sourceUrl, '/posts/post-inspecao-palavra-conexao.html', '/posts/post-inspecao-palavra-valeu.html'],
      notes: 'Cap. ' + post.seriesOrder + ' — cluster Log In / discada / DSL / conexão.'
    }
  );
}

function upsertGuia(guia, post, cfg) {
  const href = '/posts/post-' + post.slug + '.html';
  upsertItem(
    guia.items || (guia.items = []),
    {
      id: cfg.guiaId,
      word: cfg.guiaWord,
      simple: cfg.guiaSimple,
      simpleEn: cfg.guiaSimple,
      simpleEs: cfg.guiaSimple,
      group: 'lexico',
      fromTitle: false,
      href
    },
    cfg.guiaAfter
  );
}

function nextPalavraOrder(posts, fallback) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max.apply(null, orders) : fallback || 0;
  return max + 1;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-login-discada-dsl-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  for (const cfg of ITEMS) {
    const post = stampFiles(cfg.build());
    const already = posts.find((p) => p.slug === post.slug);
    const taken = new Set(
      posts
        .filter((p) => p.slug !== post.slug && p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    let order =
      already && Number(already.seriesOrder)
        ? Number(already.seriesOrder)
        : nextPalavraOrder(posts, post.seriesOrder);
    while (taken.has(order)) order += 1;
    post.seriesOrder = order;
    upsertPost(posts, post);
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
    writeI18n(i18n, post);
    upsertSug(sug, post, cfg);
    upsertGuia(guia, post, cfg);
    if (cfg.poem) {
      const href = '/posts/post-' + post.slug + '.html';
      upsertVidaPoem(vida, {
        id: cfg.poem.id,
        slug: cfg.poem.id,
        title: cfg.poem.title,
        titleEn: cfg.poem.title,
        titleEs: cfg.poem.title,
        author: 'Laboratório BudGanja',
        authorEn: 'BudGanja Lab',
        authorEs: 'Laboratorio BudGanja',
        teaser: cfg.poem.teaser,
        teaserEn: cfg.poem.teaser,
        teaserEs: cfg.poem.teaser,
        body: cfg.poem.pt(),
        bodyEn: cfg.poem.en(),
        bodyEs: cfg.poem.es(),
        inspectionHref: href,
        tags: cfg.poem.tags
      });
    }
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
    console.log('OK:', post.title, '· Cap.', post.seriesOrder);
  }

  gloss = patchGlossary(gloss);

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

  console.log('Cluster Log In / discada / DSL / conexão actualizado.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
