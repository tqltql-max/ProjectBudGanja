'use strict';

/**
 * Injeta a palavra «pessoas» na série Palavras (vocábulo × hub × conjugação).
 * Uso: node scripts/upsert-palavra-pessoas-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildPessoasPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/pessoas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-pessoas.html';
const HUB = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';

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

function langsPessoas() {
  return 'en: "people / persons", es: "personas", fr: "personnes / gens", it: "persone", de: "Menschen / Personen", el: "άνθρωποι", la: "persona / homines", yo: "àwọn ènìyàn", sw: "watu", gez: "säbʾ", nl: "mensen", pl: "ludzie / osoby", ru: "люди", uk: "люди", zh: "人们", ja: "人々", ko: "사람들", ar: "أشخاص", he: "אנשים", hi: "लोग", tr: "kişiler / insanlar", sv: "personer / människor", da: "personer / mennesker", no: "personer / mennesker", fi: "ihmiset", cs: "lidé / osoby", ro: "persoane / oameni", hu: "emberek", ca: "persones", gl: "persoas", eu: "pertsonak", gn: "ava kuéra", qu: "runakuna", eo: "personoj", vi: "người", id: "orang", th: "ผู้คน", hr: "ljudi / osobe", sk: "ľudia", ga: "daoine", cy: "pobl", ha: "mutane", am: "ሰዎች", fa: "افراد", bn: "মানুষ", zu: "abantu"';
}

function patchGlossary(gloss) {
  const main =
    '    pessoas: { tone: "craft", category: "Léxico", mundane: "Quem vive; no lab, o nome da série de biografias.", gloss: "Lat. persōna — máscara → alguém; o vocábulo, não o hub; ≠ conjugação (1.ª/2.ª/3.ª); Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsPessoas() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'pessoas', main, 'pessoa');
  const pessoaLine =
    '    pessoa: { tone: "craft", category: "Léxico", mundane: "Alguém que vive — ou, na gramática, o elo do verbo.", gloss: "Humano: ver pessoas (persōna). Gramática 1.ª/2.ª/3.ª: ver conjugação. ≠ hub Pessoas. Valeu !!!", href: "' +
    HREF +
    '", en: "person", es: "persona", fr: "personne", it: "persona", de: "Person", yo: "ènìyàn", sw: "mtu", gez: "säbʾ", el: "πρόσωπο", la: "persona", nl: "persoon", pl: "osoba", ru: "человек / лицо", uk: "особа", zh: "人", ja: "人", ko: "사람", ar: "شخص", he: "אדם", hi: "व्यक्ति", tr: "kişi", sv: "person", da: "person", no: "person", fi: "henkilö", cs: "osoba", ro: "persoană", hu: "személy", ca: "persona", gl: "persoa", eu: "pertsona", gn: "ava", qu: "runa", eo: "persono", vi: "người", id: "orang", th: "บุคคล", hr: "osoba", sk: "osoba", ga: "duine", cy: "person", ha: "mutum", am: "ሰው", fa: "شخص", bn: "ব্যক্তি", zu: "umuntu" },\n';
  gloss = replaceOrInsertAfter(gloss, 'pessoa', pessoaLine, 'pessoas');
  const aliases = [
    [
      'persona',
      '    persona: { gloss: "Latim / EN-ES — máscara, papel ou pessoa; o vocábulo PT está em pessoas.", href: "' +
        HREF +
        '", en: "persona / person", es: "persona" },\n'
    ],
    [
      '"série Pessoas"',
      '    "série Pessoas": { gloss: "Hub de biografias — o lugar; o vocábulo está em pessoas.", href: "' +
        HUB +
        '", en: "People series (hub)", es: "serie Personas (hub)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'pessoas');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-pessoas-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildPessoasPost());
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
        id: 'palavra-pessoas',
        title: 'Pessoas — o vocábulo que nomeia a série',
        titleEn: 'Pessoas — the vocable that names the People series',
        titleEs: 'Pessoas — el vocablo que nombra la serie Personas',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: pessoas ← lat. persōna (máscara → alguém); o vocábulo, não o hub; ≠ conjugação; Valeu !!!',
        whyEn: 'Words: pessoas ← Lat. persōna (mask → someone); the vocable, not the hub; ≠ conjugation; Valeu !!!',
        whyEs: 'Palabras: pessoas ← lat. persōna (máscara → alguien); el vocablo, no el hub; ≠ conjugación; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          HUB,
          '/posts/post-inspecao-palavra-palavra.html',
          '/posts/post-inspecao-palavra-conjugacao.html',
          '/posts/post-inspecao-figura-herodoto.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Pessoas; meta-ficha da série histórica.'
      },
      ['palavra-palavra', 'palavra-conjugacao']
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
        id: 'pessoas',
        word: 'pessoas',
        simple:
          'Lat. persōna — máscara de teatro → alguém. O vocábulo; a série Pessoas é o hub de biografias. ≠ conjugação (1.ª/2.ª/3.ª). Valeu !!!',
        simpleEn:
          'Lat. persōna — stage mask → someone. The vocable; the People series is the biography hub. ≠ conjugation (1st/2nd/3rd). Valeu !!!',
        simpleEs:
          'Lat. persōna — máscara de teatro → alguien. El vocablo; la serie Personas es el hub de biografías. ≠ conjugación (1.ª/2.ª/3.ª). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do latim persōna (máscara, papel) o português herda pessoa / pessoas. No laboratório o plural nomeia também a série de fichas humanas — o vocábulo fica nesta página; as biografias no hub.',
        curiosities:
          'Inglês people vem de populus (povo), não do plural de person. A 1.ª pessoa do verbo vive na ficha conjugação. Heródoto abre a série Pessoas.',
        historyEn:
          'From Latin persōna (mask, role) Portuguese inherits pessoa / pessoas. In the lab the plural also names the human-sheet series — the vocable stays here; biographies on the hub.',
        curiositiesEn:
          'English people comes from populus (a people), not the plural of person. Grammatical 1st person lives on the conjugation sheet. Herodotus opens the People series.',
        historyEs:
          'Del latín persōna (máscara, papel) el portugués hereda pessoa / pessoas. En el laboratorio el plural también nombra la serie de fichas humanas.',
        curiositiesEs:
          'Inglés people viene de populus, no del plural de person. La 1.ª persona del verbo vive en conjugación. Heródoto abre la serie Personas.'
      },
      ['palavra', 'conjugacao', 'etimologia']
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

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'pessoas',
      slug: 'pessoas',
      title: 'Pessoas',
      titleEn: 'Pessoas',
      titleEs: 'Pessoas',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — persōna, máscara → alguém; o vocábulo, não o hub; Valeu !!!',
      teaserEn: 'BudGanja echo — persōna, mask → someone; the vocable, not the hub; Valeu !!!',
      teaserEs: 'Eco BudGanja — persōna, máscara → alguien; el vocablo, no el hub; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'pessoas', 'persona', 'palavra']
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
