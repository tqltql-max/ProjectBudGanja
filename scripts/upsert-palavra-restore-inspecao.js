'use strict';

/**
 * Injeta a família restore × back × backup × up.
 * Uso: node scripts/upsert-palavra-restore-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRestorePost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_RESTORE,
  WIKT_BACK,
  WIKT_BACKUP,
  WIKT_UP
} = require('../lib/restore-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-restore.html';

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
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
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
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    restore: { tone: "craft", category: "Ofício", mundane: "EN — pôr de pé de novo (lat. restaurāre); cruzado com back, backup e up.", gloss: "Lat. restaurāre × germ. bæc (back) × backup (back+up) × germ. upp (up); quatro salas, um circuito; Restoure = lapso; ≠ restore back; ≠ restaurante; Valeu !!!", href: "' +
    HREF +
    '", en: "restore", es: "restaurar", fr: "restaurer", it: "ripristinare", de: "wiederherstellen", el: "επαναφέρω", la: "restaurare", yo: "dá padà", sw: "rejesha", gez: "ʼanbəra", nl: "herstellen", pl: "przywrócić", ru: "восстановить", uk: "відновити", zh: "恢复", ja: "復元", ko: "복원", ar: "استعادة", he: "שחזר", hi: "पुनर्स्थापित", tr: "geri yükle", sv: "återställ", da: "gendan", no: "gjenopprett", fi: "palauta", cs: "obnovit", ro: "restaurează", hu: "visszaállít", ca: "restaura", gl: "restaurar", eu: "berrezarri", gn: "mbojevy", qu: "kutichiy", eo: "restarigi", vi: "khôi phục", id: "pulihkan", th: "กู้คืน", hr: "vrati", sk: "obnoviť", ga: "athchóirigh", cy: "adfer", ha: "maido", am: "መመለስ", fa: "بازیابی", bn: "পুনরুদ্ধার", zu: "buyisela" },\n';
  gloss = replaceOrInsertAfter(gloss, 'restore', main, 'backspace');
  const aliases = [
    [
      'restoure',
      '    restoure: { gloss: "Lapso de campo de restore (eco de restauro); ver restore.", href: "' +
        HREF +
        '", en: "Restoure (slip for restore)", es: "Restoure (lapsus)" },\n'
    ],
    [
      'restaurar',
      '    restaurar: { gloss: "Irmã PT de restore ← lat. restaurāre; pôr de pé de novo; ≠ restaurante; ver restore.", href: "' +
        HREF +
        '", en: "to restore", es: "restaurar" },\n'
    ],
    [
      'restauro',
      '    restauro: { gloss: "Nome PT da mesma árvore — arte / ofício de reparar; ≠ backup informático; ver restore.", href: "' +
        HREF +
        '", en: "restoration (craft)", es: "restauración" },\n'
    ],
    [
      '"restore back"',
      '    "restore back": { gloss: "Tautologia — restore já traz o regresso; cortar; ver restore.", href: "' +
        HREF +
        '", en: "restore back (tautology)", es: "restore back (tautología)" },\n'
    ],
    [
      'back',
      '    back: { tone: "craft", category: "Léxico", mundane: "EN — costas, trás, regresso (germ. bæc).", gloss: "Germ. bæc «costas» → regresso; cruzado com restore / backup / up; ≠ backspace; Valeu !!!", href: "' +
        HREF +
        '", en: "back", es: "espalda / atrás / volver", fr: "dos / retour", it: "schiena / indietro", de: "Rücken / zurück", el: "πλάτη / πίσω", la: "tergum / retro", yo: "ẹ̀yìn", sw: "mgongo / rudi", gez: "dǝhr", nl: "rug / terug", pl: "plecy / wstecz", ru: "спина / назад", uk: "спина / назад", zh: "背 / 回", ja: "背 / 戻る", ko: "등 / 뒤로", ar: "ظهر / رجوع", he: "גב / חזרה", hi: "पीठ / वापस", tr: "sırt / geri", sv: "rygg / tillbaka", da: "ryg / tilbage", no: "rygg / tilbake", fi: "selkä / takaisin", cs: "záda / zpět", ro: "spate / înapoi", hu: "hát / vissza", ca: "esquena / enrere", gl: "costas / atrás", eu: "bizkar / atzera", gn: "atukupe / jey", qu: "wasa / kutiy", eo: "dorso / reen", vi: "lưng / lại", id: "punggung / kembali", th: "หลัง / กลับ", hr: "leđa / natrag", sk: "chrbát / späť", ga: "droim / ar ais", cy: "cefn / yn ôl", ha: "baya", am: "ጀርባ", fa: "پشت / باز", bn: "পিঠ / ফিরে", zu: "umhlane / emuva" },\n'
    ],
    [
      'backup',
      '    backup: { tone: "craft", category: "Ofício", mundane: "EN — reserva por trás (back + up); cópia de segurança.", gloss: "Composto back+up «apoiar por trás» → cópia; cruzado com restore; ≠ Save Game ≠ backspace; Valeu !!!", href: "' +
        HREF +
        '", en: "backup", es: "copia de seguridad", fr: "sauvegarde", it: "backup / copia di riserva", de: "Sicherung", el: "αντίγραφο ασφαλείας", la: "exemplar tutum", yo: "àwòrán ìdáàbòbò", sw: "chelezo", gez: "backup", nl: "back-up", pl: "kopia zapasowa", ru: "резервная копия", uk: "резервна копія", zh: "备份", ja: "バックアップ", ko: "백업", ar: "نسخة احتياطية", he: "גיבוי", hi: "बैकअप", tr: "yedek", sv: "säkerhetskopia", da: "sikkerhedskopi", no: "sikkerhetskopi", fi: "varmuuskopio", cs: "záloha", ro: "copie de rezervă", hu: "mentés", ca: "còpia de seguretat", gl: "copia de seguridade", eu: "babeskopia", gn: "mongu\'e ñangareko", qu: "waqaychaq kopia", eo: "sekurkopio", vi: "sao lưu", id: "cadangan", th: "สำรอง", hr: "sigurnosna kopija", sk: "záloha", ga: "cúltaca", cy: "copi wrth gefn", ha: "bayan gida", am: "ምትኬ", fa: "پشتیبان", bn: "ব্যাকআপ", zu: "isipele" },\n'
    ],
    [
      '"back up"',
      '    "back up": { gloss: "Verbo do composto — copiar / apoiar / recuar o carro; ver backup.", href: "' +
        HREF +
        '", en: "to back up", es: "hacer backup / apoyar / dar marcha atrás" },\n'
    ],
    [
      '"cópia de segurança"',
      '    "cópia de segurança": { gloss: "Irmã PT de backup — a reserva; ver restore.", href: "' +
        HREF +
        '", en: "security copy / backup", es: "copia de seguridad" },\n'
    ],
    [
      'up',
      '    up: { tone: "craft", category: "Léxico", mundane: "EN — para cima, completar, estar no ar (germ. upp).", gloss: "Germ. upp — vector; cruzado com back / backup / restore; upar = outra sala; Valeu !!!", href: "' +
        HREF +
        '", en: "up", es: "arriba / en el aire", fr: "en haut / en ligne", it: "su / online", de: "hoch / online", el: "πάνω", la: "sursum", yo: "sókè", sw: "juu", gez: "läʻǝl", nl: "omhoog", pl: "w górę", ru: "вверх", uk: "вгору", zh: "上", ja: "上", ko: "위", ar: "فوق", he: "למעלה", hi: "ऊपर", tr: "yukarı", sv: "upp", da: "op", no: "opp", fi: "ylös", cs: "nahoru", ro: "sus", hu: "fel", ca: "amunt", gl: "arriba", eu: "gora", gn: "ygasá", qu: "hanaq", eo: "supren", vi: "lên", id: "naik", th: "ขึ้น", hr: "gore", sk: "hore", ga: "suas", cy: "i fyny", ha: "sama", am: "ላይ", fa: "بالا", bn: "উপরে", zu: "phezulu" },\n'
    ],
    [
      'upar',
      '    upar: { gloss: "Calco BR de level up / upload — outra sala de up; ≠ restore; ver restore.", href: "' +
        HREF +
        '", en: "to level up (BR slang)", es: "upar / subir de nivel" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'restore');
  }
  return gloss;
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-restore-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRestorePost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-restore',
        title: 'Restore — pôr de pé; cruzado com Back, Backup e Up',
        titleEn: 'Restore — set back on its feet; crossed with Back, Backup and Up',
        titleEs: 'Restore — poner de pie; cruzado con Back, Backup y Up',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: restore (lat. restaurāre) × back (germ. bæc) × backup (back+up) × up (germ. upp) — quatro salas, um circuito; Restoure = lapso.',
        whyEn: 'Words: restore (Lat. restaurāre) × back × backup × up — four rooms, one circuit; Restoure = slip.',
        whyEs: 'Palabras: restore (lat. restaurāre) × back × backup × up — cuatro salas, un circuito; Restoure = lapsus.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_RESTORE,
          WIKT_BACK,
          WIKT_BACKUP,
          WIKT_UP,
          'https://en.wiktionary.org/wiki/restauro#Latin',
          'https://pt.wiktionary.org/wiki/restaurar',
          '/posts/post-inspecao-palavra-backspace.html',
          '/posts/post-inspecao-palavra-save-game.html',
          '/posts/post-inspecao-palavra-commitar.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — restore × back × backup × up; Restoure lido; restore back cortado.'
      },
      ['palavra-backspace', 'palavra-save-game', 'palavra-upsert']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'restore',
        word: 'restore',
        simple:
          'EN lat. restaurāre — pôr de pé de novo. Cruzado com back (germ. bæc), backup (back+up) e up (germ. upp): quatro salas, um circuito. Restoure = lapso. ≠ restore back. ≠ restaurante. Valeu !!!',
        simpleEn:
          'EN Lat. restaurāre — set back on its feet. Crossed with back (Gmc bæc), backup (back+up) and up (Gmc upp): four rooms, one circuit. Restoure = slip. ≠ restore back. ≠ restaurant. Valeu !!!',
        simpleEs:
          'EN lat. restaurāre — poner de pie otra vez. Cruzado con back (germ. bæc), backup (back+up) y up (germ. upp): cuatro salas, un circuito. Restoure = lapsus. ≠ restore back. ≠ restaurante. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Restore vem do francês antigo restorer, do latim restaurāre: reconstruir, reparar, pôr de pé de novo. A irmã portuguesa é restaurar / restauro. Restaurante é a mesma árvore (o sítio que restaura o corpo) com outro ofício. Restoure é lapso de campo. Restore back é tautologia: o regresso já está no verbo latino.',
        curiosities:
          'Backup é composto germânico (back + up, apoiar por trás) que no séc. XX vira cópia de segurança. Restore sem backup é milagre; backup sem restore testado é papel. Upar (jogo) é outra sala de up. Backspace apaga; não guarda a reserva.',
        historyEn:
          'Restore comes from Old French restorer, Latin restaurāre: rebuild, repair, set on its feet again. Portuguese restaurar is the native sister. Restaurant is the same tree (the place that restores the body) with another office. Restoure is a field slip. Restore back is a tautology.',
        curiositiesEn:
          'Backup is a Germanic compound (back + up, support from behind) that in the 20th century becomes the spare copy. Restore without backup is a miracle; backup without a tested restore is paper. Upar (games) is another room of up. Backspace erases; it does not keep the spare.',
        historyEs:
          'Restore viene del francés antiguo restorer, latín restaurāre: reconstruir, reparar, poner de pie. Restaurar es la hermana portuguesa. Restaurante es el mismo árbol con otro oficio. Restoure es lapsus. Restore back es tautología.',
        curiositiesEs:
          'Backup es compuesto germánico (back + up) que en el s. XX vira copia de seguridad. Restore sin backup es milagro; backup sin restore ensayado es papel. Upar es otra sala de up. Backspace borra; no guarda la reserva.'
      },
      ['backspace', 'save-game', 'upsert']
    );
    upsertItem(
      items,
      {
        id: 'back',
        word: 'back',
        simple:
          'EN germ. bæc — costas, trás, regresso. Cruzado com restore, backup e up. ≠ backspace. Valeu !!!',
        simpleEn:
          'EN Gmc bæc — the back, the rear, the return. Crossed with restore, backup and up. ≠ backspace. Valeu !!!',
        simpleEs:
          'EN germ. bæc — espalda, atrás, regreso. Cruzado con restore, backup y up. ≠ backspace. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['restore']
    );
    upsertItem(
      items,
      {
        id: 'backup',
        word: 'backup',
        simple:
          'EN back + up — apoiar por trás; cópia de segurança. Cruzado com restore. ≠ Save Game. Valeu !!!',
        simpleEn:
          'EN back + up — support from behind; spare copy. Crossed with restore. ≠ Save Game. Valeu !!!',
        simpleEs:
          'EN back + up — sostener por detrás; copia de seguridad. Cruzado con restore. ≠ Save Game. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['restore', 'back']
    );
    upsertItem(
      items,
      {
        id: 'up',
        word: 'up',
        simple:
          'EN germ. upp — para cima, completar, estar no ar. Cruzado com back, backup e restore. Upar = outra sala. Valeu !!!',
        simpleEn:
          'EN Gmc upp — upward, complete, online. Crossed with back, backup and restore. Upar = another room. Valeu !!!',
        simpleEs:
          'EN germ. upp — arriba, completar, en el aire. Cruzado con back, backup y restore. Upar = otra sala. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['restore', 'backup']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    let last;
    for (let i = 0; i < 8; i += 1) {
      try {
        fs.writeFileSync(GLOSS_FILE, gloss);
        last = null;
        break;
      } catch (e) {
        last = e;
        await sleep(300 * (i + 1));
      }
    }
    if (last) throw last;
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'restore',
      slug: 'restore',
      title: 'Restore',
      titleEn: 'Restore',
      titleEs: 'Restore',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja — pôr de pé de novo; cruzado com back, backup e up; Restoure = lapso; Valeu !!!',
      teaserEn:
        'BudGanja echo — set back on its feet; crossed with back, backup and up; Restoure = slip; Valeu !!!',
      teaserEs:
        'Eco BudGanja — poner de pie otra vez; cruzado con back, backup y up; Restoure = lapsus; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'restore', 'back', 'backup', 'up']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
