'use strict';

/**
 * Injeta objecto CD + actividade backup na série Palavras, /objetos/ e /tecnologia/.
 * Uso: node scripts/upsert-cd-backup-tecnologia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const cd = require('../lib/cd-inspecao-post.js');
const backup = require('../lib/backup-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const TEC_FILE = path.join(ROOT, 'content', 'tecnologia.json');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const OBJETOS_FILE = path.join(ROOT, 'objetos', 'index.html');
const HREF_CD = '/posts/post-inspecao-palavra-cd.html';
const HREF_BACKUP = '/posts/post-inspecao-palavra-backup.html';

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

function stampPost(post) {
  const slug = post.slug;
  post.title = post.title || post.title;
  post.excerpt = post.excerpt || post.excerpt;
  post.coverImage = post.coverImage || post.coverImage;
  post.seriesOrder = post.seriesOrder || post.seriesOrder;
  post.seriesLabel = post.seriesLabel || post.seriesLabel;
  post.filename = post.filename || post.filename || 'posts/post-' + slug + '.html';
  post.url = post.url || post.url || '/' + String(post.filename).replace(/^\/+/, '');
  post.content_raw = post.content_raw || post.content_raw;
  post.published = post.published !== false && post.published !== false;
  post.sourceUrl = post.sourceUrl || post.sourceUrl;
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
  stampPost(post);
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
  const cdLine =
    '    cd: { tone: "craft", category: "Objecto", mundane: "Compact Disc — disco óptico de 120 mm que o laser lê.", gloss: "EN Compact Disc; fala cedê; CD-DA / CD-ROM / CD-R; suporte clássico de backup; ≠ certificado de depósito ≠ vinil ≠ DVD; Valeu !!!", href: "' +
    HREF_CD +
    '", en: "CD / compact disc", es: "CD / disco compacto", fr: "CD", it: "CD", de: "CD", el: "CD", la: "discus compactus", yo: "CD", sw: "CD", gez: "CD", nl: "cd", pl: "płyta CD", ru: "компакт-диск", uk: "компакт-диск", zh: "光盘", ja: "CD", ko: "CD", ar: "قرص مضغوط", he: "תקליטור", hi: "सीडी", tr: "CD", sv: "cd", da: "cd", no: "cd", fi: "cd", cs: "cd", ro: "cd", hu: "cd", ca: "cd", gl: "cd", eu: "cd", gn: "CD", qu: "CD", eo: "kd", vi: "đĩa CD", id: "CD", th: "ซีดี", hr: "cd", sk: "cd", ga: "dlúthdhiosca", cy: "disg cryno", ha: "CD", am: "ሲዲ", fa: "سی‌دی", bn: "সিডি", zu: "i-CD" },\n';
  const compactLine =
    '    "compact disc": { gloss: "Nome inglês do CD — ver ficha CD.", href: "' +
    HREF_CD +
    '", en: "compact disc", es: "disco compacto" },\n';
  const cedeLine =
    '    cedê: { gloss: "Fala BR de CD (Compact Disc) — ver ficha CD.", href: "' +
    HREF_CD +
    '", en: "CD (spoken BR)", es: "CD (habla BR)" },\n';
  const cdromLine =
    '    "cd-rom": { gloss: "CD de dados só de leitura — ver CD.", href: "' +
    HREF_CD +
    '", en: "CD-ROM", es: "CD-ROM" },\n';
  const cdrLine =
    '    "cd-r": { gloss: "CD gravável uma vez — suporte clássico de backup; ver CD e backup.", href: "' +
    HREF_CD +
    '", en: "CD-R", es: "CD-R" },\n';
  const backupLine =
    '    backup: { tone: "craft", category: "Ofício", mundane: "Actividade — copiar a reserva (back+up) para poder voltar.", gloss: "Gesto de cópia de segurança; CD é suporte; restore é outra ficha (léxico); smash bakup; ≠ Save Game ≠ backspace; Valeu !!!", href: "' +
    HREF_BACKUP +
    '", en: "backup", es: "copia de seguridad", fr: "sauvegarde", it: "backup", de: "Sicherung", el: "αντίγραφο ασφαλείας", la: "exemplar tutum", yo: "àwòrán ìdáàbòbò", sw: "chelezo", gez: "backup", nl: "back-up", pl: "kopia zapasowa", ru: "резервная копия", uk: "резервна копія", zh: "备份", ja: "バックアップ", ko: "백업", ar: "نسخة احتياطية", he: "גיבוי", hi: "बैकअप", tr: "yedek", sv: "säkerhetskopia", da: "sikkerhedskopi", no: "sikkerhetskopi", fi: "varmuuskopio", cs: "záloha", ro: "copie de rezervă", hu: "mentés", ca: "còpia de seguretat", gl: "copia de seguridade", eu: "babeskopia", gn: "mongu\'e ñangareko", qu: "waqaychaq kopia", eo: "sekurkopio", vi: "sao lưu", id: "cadangan", th: "สำรอง", hr: "sigurnosna kopija", sk: "záloha", ga: "cúltaca", cy: "copi wrth gefn", ha: "bayan gida", am: "ምትኬ", fa: "پشتیبان", bn: "ব্যাকআপ", zu: "isipele" },\n';
  const bakupLine =
    '    bakup: { gloss: "Lapso de campo de backup — ver actividade backup.", href: "' +
    HREF_BACKUP +
    '", en: "bakup (slip for backup)", es: "bakup (lapsus)" },\n';
  const copiaLine =
    '    "cópia de segurança": { gloss: "Irmã PT da actividade backup — a reserva; o CD é um suporte.", href: "' +
    HREF_BACKUP +
    '", en: "security copy / backup", es: "copia de seguridad" },\n';

  gloss = replaceOrInsertAfter(gloss, 'cd', cdLine, 'tecnologia');
  gloss = replaceOrInsertAfter(gloss, '"compact disc"', compactLine, 'cd');
  gloss = replaceOrInsertAfter(gloss, 'cedê', cedeLine, 'cd');
  gloss = replaceOrInsertAfter(gloss, '"cd-rom"', cdromLine, 'cd');
  gloss = replaceOrInsertAfter(gloss, '"cd-r"', cdrLine, 'cd');
  gloss = replaceOrInsertAfter(gloss, 'backup', backupLine, 'restore');
  gloss = replaceOrInsertAfter(gloss, 'bakup', bakupLine, 'backup');
  gloss = replaceOrInsertAfter(gloss, '"cópia de segurança"', copiaLine, 'backup');
  return gloss;
}

function patchObjetosHtml(html) {
  const card =
    '            <a class="objetos-catalog-card" href="' +
    HREF_CD +
    '">\n' +
    '                <span class="objetos-catalog-kicker">Palavras · objecto</span>\n' +
    '                <strong>CD</strong>\n' +
    '                <span>Compact Disc — o disco que o laser lê; suporte clássico de backup.</span>\n' +
    '            </a>\n';
  if (html.includes('post-inspecao-palavra-cd.html')) {
    return html.replace(
      /            <a class="objetos-catalog-card" href="\/posts\/post-inspecao-palavra-cd\.html">[\s\S]*?<\/a>\n/,
      card
    );
  }
  const needle =
    '            <a class="objetos-catalog-card" href="/posts/post-inspecao-palavra-interruptor.html">';
  const i = html.indexOf(needle);
  if (i < 0) {
    console.warn('Aviso: cartão CD — âncora interruptor não encontrada');
    return html;
  }
  const after = html.indexOf('</a>', i);
  if (after < 0) return html;
  return html.slice(0, after + 4) + '\n' + card + html.slice(after + 4);
}

function upsertTecnologia(catalog) {
  const items = Array.isArray(catalog.items) ? catalog.items : [];
  upsertItem(
    items,
    {
      id: 'cd',
      slug: 'cd',
      nome: 'CD',
      nomeEn: 'CD',
      nomeEs: 'CD',
      kicker: 'Hardware · objecto',
      kickerEn: 'Hardware · object',
      kickerEs: 'Hardware · objeto',
      summary: 'Compact Disc — o disco óptico de 120 mm. Suporte clássico da actividade de backup.',
      summaryEn: 'Compact Disc — the 120 mm optical disc. Classic medium of the backup activity.',
      summaryEs: 'Compact Disc — el disco óptico de 120 mm. Soporte clásico de la actividad de backup.',
      category: 'hardware',
      tags: ['cd', 'disco', 'optico', 'backup'],
      href: HREF_CD,
      featured: true
    },
    ['hd-escravo', 'interruptor']
  );
  upsertItem(
    items,
    {
      id: 'backup',
      slug: 'backup',
      nome: 'Backup',
      nomeEn: 'Backup',
      nomeEs: 'Backup',
      kicker: 'Actividade · reserva',
      kickerEn: 'Activity · spare copy',
      kickerEs: 'Actividad · reserva',
      summary: 'O gesto de copiar a reserva — back + up. O CD é um suporte; restore é outra ficha.',
      summaryEn: 'The gesture of copying the spare — back + up. CD is a medium; restore is another sheet.',
      summaryEs: 'El gesto de copiar la reserva — back + up. El CD es un soporte; restore es otra ficha.',
      category: 'atividade',
      tags: ['backup', 'copia', 'cd', 'restore'],
      href: HREF_BACKUP,
      featured: true
    },
    ['restore', 'save-game']
  );
  catalog.items = items;
  catalog.updatedAt = new Date().toISOString();
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

async function syncSql(postsToWrite) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  postsToWrite.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado: cd + backup');
}

async function main() {
  ['generate-cd-objeto-cover.js', 'generate-backup-atividade-cover.js'].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script + ':', e.message);
    }
  });

  const postCd = stampPost(cd.buildCdPost());
  const postBackup = stampPost(backup.buildBackupPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, postCd);
  upsertPost(posts, postBackup);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(postCd);
    writeHtml(postBackup);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, postCd);
  writeI18n(i18n, postBackup);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'objeto-cd',
        title: 'CD — Compact Disc, o objecto que o laser lê',
        titleEn: 'CD — Compact Disc, the object the laser reads',
        titleEs: 'CD — Compact Disc, el objeto que el láser lee',
        tipo: 'objeto',
        priority: 1,
        status: 'feita',
        why: 'Objecto: CD (Compact Disc) — disco óptico 120 mm; suporte clássico de backup; ≠ certificado de depósito ≠ vinil.',
        whyEn: 'Object: CD (Compact Disc) — 120 mm optical disc; classic backup medium; ≠ certificate of deposit ≠ vinyl.',
        whyEs: 'Objeto: CD (Compact Disc) — disco óptico 120 mm; soporte clásico de backup; ≠ certificado de depósito ≠ vinilo.',
        suggestedSlug: postCd.slug,
        doneHref: HREF_CD,
        seriesHint: 'palavras-origem',
        sources: [HREF_CD, HREF_BACKUP, '/tecnologia/', '/objetos/', cd.WIKI_EN, '/posts/post-inspecao-palavra-valeu.html'],
        notes: 'Cap. ' + postCd.seriesOrder + ' — objecto; irmã actividade backup.'
      },
      ['objeto-interruptor', 'palavra-tecnologia']
    );
    upsertItem(
      items,
      {
        id: 'atividade-backup',
        title: 'Backup — a actividade de deixar reserva',
        titleEn: 'Backup — the activity of leaving a spare',
        titleEs: 'Backup — la actividad de dejar reserva',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Actividade: backup (back+up) — copiar a reserva; CD é suporte; restore é ficha lexical; bancada em /tecnologia/.',
        whyEn: 'Activity: backup (back+up) — copy the spare; CD is a medium; restore is the lexical sheet; bench at /tecnologia/.',
        whyEs: 'Actividad: backup (back+up) — copiar la reserva; el CD es soporte; restore es ficha léxica; bancada en /tecnologia/.',
        suggestedSlug: postBackup.slug,
        doneHref: HREF_BACKUP,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_BACKUP,
          HREF_CD,
          '/tecnologia/',
          '/posts/post-inspecao-palavra-restore.html',
          backup.WIKI,
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + postBackup.seriesOrder + ' — actividade; bancada no hub Tecnologia.'
      },
      ['objeto-cd', 'palavra-restore']
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
        id: 'cd',
        word: 'CD',
        simple:
          'Compact Disc — disco óptico de 120 mm que o laser lê. Fala cedê. Suporte clássico de backup. ≠ certificado de depósito ≠ vinil. Valeu !!!',
        simpleEn:
          'Compact Disc — 120 mm optical disc the laser reads. Spoken cedê. Classic backup medium. ≠ certificate of deposit ≠ vinyl. Valeu !!!',
        simpleEs:
          'Compact Disc — disco óptico de 120 mm que el láser lee. Habla cedê. Soporte clásico de backup. ≠ certificado de depósito ≠ vinilo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_CD,
        history:
          'Compact Disc é o nome Philips/Sony (1982, áudio Red Book). O português diz CD / cedê. CD-ROM leva dados; CD-R grava uma vez e foi o sítio caseiro da reserva.',
        curiosities:
          'O disco não é a música nem o backup: é o objecto. Backup sem leitura testada é papel. Certificado de depósito é outra sigla.',
        historyEn:
          'Compact Disc is the Philips/Sony name (1982, Red Book audio). Portuguese says CD / cedê. CD-ROM carries data; CD-R writes once and was the home place of the spare copy.',
        curiositiesEn:
          'The disc is not the music and not the backup: it is the object. Backup without a tested read is paper. Certificate of deposit is another acronym.',
        historyEs:
          'Compact Disc es el nombre Philips/Sony (1982, audio Red Book). El portugués dice CD / cedê. CD-ROM lleva datos; CD-R graba una vez y fue el sitio casero de la reserva.',
        curiositiesEs:
          'El disco no es la música ni el backup: es el objeto. Backup sin lectura ensayada es papel. Certificado de depósito es otra sigla.'
      },
      ['tecnologia', 'hd-escravo']
    );
    upsertItem(
      items,
      {
        id: 'backup',
        word: 'backup',
        simple:
          'Actividade: copiar a reserva (back+up) para poder voltar. O CD é um suporte. Restore é outra ficha. Smash bakup. Valeu !!!',
        simpleEn:
          'Activity: copy the spare (back+up) so you can return. CD is a medium. Restore is another sheet. Slip bakup. Valeu !!!',
        simpleEs:
          'Actividad: copiar la reserva (back+up) para poder volver. El CD es un soporte. Restore es otra ficha. Lapso bakup. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_BACKUP,
        history:
          'Backup junta back (atrás) e up (de pé): apoiar por trás, depois a cópia de segurança na informática do séc. XX. A fala BR empresta o inglês; a irmã nativa é cópia de segurança.',
        curiosities:
          'A bancada em /tecnologia/ mostra original → CD → restore com peças de brinquedo. Não é runbook. Save Game e backspace são outras salas.',
        historyEn:
          'Backup joins back (behind) and up (on its feet): support from behind, then the spare copy in 20th-century computing. Brazilian speech borrows the English; the native sister is cópia de segurança.',
        curiositiesEn:
          'The bench at /tecnologia/ shows original → CD → restore with toy pieces. Not a runbook. Save Game and backspace are other rooms.',
        historyEs:
          'Backup junta back (atrás) y up (de pie): apoyar por detrás, luego la copia de seguridad en la informática del s. XX. El habla BR toma el inglés; la hermana nativa es cópia de segurança.',
        curiositiesEs:
          'La bancada en /tecnologia/ muestra original → CD → restore con piezas de juguete. No es runbook. Save Game y backspace son otras salas.'
      },
      ['restore', 'cd']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(TEC_FILE)) {
    const tec = JSON.parse(fs.readFileSync(TEC_FILE, 'utf8'));
    upsertTecnologia(tec);
    await writeJsonRetry(TEC_FILE, tec);
    console.log('Catálogo Tecnologia actualizado');
  }

  if (fs.existsSync(OBJETOS_FILE)) {
    let html = fs.readFileSync(OBJETOS_FILE, 'utf8');
    html = patchObjetosHtml(html);
    fs.writeFileSync(OBJETOS_FILE, html);
    console.log('Catálogo Objetos actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'cd',
      slug: 'cd',
      title: 'CD',
      titleEn: 'CD',
      titleEs: 'CD',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o disco que o laser lê, sem tutorial de queima; Valeu !!!',
      teaserEn: 'BudGanja echo — the disc the laser reads, without a burning tutorial; Valeu !!!',
      teaserEs: 'Eco BudGanja — el disco que el láser lee, sin tutorial de grabación; ¡Valeu !!!',
      body: cd.poemPt(),
      bodyEn: cd.poemEn(),
      bodyEs: cd.poemEs(),
      inspectionHref: HREF_CD,
      tags: ['poesia', 'vida', 'cd', 'objecto', 'tecnologia']
    });
    upsertVidaPoem(vida, {
      id: 'backup',
      slug: 'backup',
      title: 'Backup',
      titleEn: 'Backup',
      titleEs: 'Backup',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o gesto de deixar reserva, sem milagre de restore; Valeu !!!',
      teaserEn: 'BudGanja echo — the gesture of leaving a spare, without a restore miracle; Valeu !!!',
      teaserEs: 'Eco BudGanja — el gesto de dejar reserva, sin milagro de restore; ¡Valeu !!!',
      body: backup.poemPt(),
      bodyEn: backup.poemEn(),
      bodyEs: backup.poemEs(),
      inspectionHref: HREF_BACKUP,
      tags: ['poesia', 'vida', 'backup', 'atividade', 'tecnologia']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados');
  }

  try {
    await syncSql([postCd, postBackup]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', postCd.title, '| Cap.', postCd.seriesOrder);
  console.log('OK:', postBackup.title, '| Cap.', postBackup.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
