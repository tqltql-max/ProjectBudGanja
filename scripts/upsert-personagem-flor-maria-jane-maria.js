'use strict';

/**
 * Capa + ficha Vida · Flor Maria Jane Maria (canal Joana e Maria).
 * Uso: node scripts/upsert-personagem-flor-maria-jane-maria.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { ROOT } = require('../lib/paths.js');
const {
  poemPt,
  poemEn,
  poemEs,
  FLOR_SLUG,
  FLOR_HREF
} = require('../lib/flor-maria-jane-maria-personagem-inspecao-post.js');

const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = FLOR_HREF;

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
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('    ' + esc + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterEsc = afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const afterRe = new RegExp('(    ' + afterEsc + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)');
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    "flor maria jane maria": { tone: "craft", category: "Personagem", mundane: "Flor do canal Joana e Maria no laboratório Vida.", gloss: "Personagem Vida — contacto visível do par Joana (folha) + Dona Maria (solo); Jane = Joana em inglês; Maria Jane / Mary Jane = outra sala (gíria); Valeu !!!", href: "' +
    HREF +
    '", en: "Flor Maria Jane Maria", es: "Flor Maria Jane Maria" },\n';
  gloss = replaceOrInsertAfter(gloss, '"flor maria jane maria"', main, 'maria');
  const alias =
    '    "maria jane": { gloss: "Gíria EN Mary Jane (cannabis) × eco do nome no canal Joana e Maria — personagem noutra ficha; não fundir.", href: "' +
    HREF +
    '", en: "Mary Jane (slang) / character echo", es: "Mary Jane (jerga) / eco del personaje" },\n';
  gloss = replaceOrInsertAfter(gloss, '"maria jane"', alias, '"flor maria jane maria"');
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-vida-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  execFileSync(process.execPath, [path.join(__dirname, 'upsert-vida-contos.js')], {
    cwd: ROOT,
    stdio: 'inherit'
  });

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'personagem-flor-maria-jane-maria',
        title: 'Vida — Flor Maria Jane Maria, contacto do canal Joana e Maria',
        titleEn: 'Vida — Flor Maria Jane Maria, contact of the Joana and Maria channel',
        titleEs: 'Vida — Flor Maria Jane Maria, contacto del canal Joana e Maria',
        tipo: 'personagem',
        priority: 1,
        status: 'feita',
        why: 'Pedido de campo: contato com Flor Maria Jane Maria, personagem do canal Joana e Maria. Jane = Joana EN; Maria Jane = outra sala.',
        whyEn: 'Field request: contact with Flor Maria Jane Maria, character of the Joana and Maria channel. Jane = Joana EN; Maria Jane = another room.',
        whyEs: 'Pedido de campo: contacto con Flor Maria Jane Maria, personaje del canal Joana e Maria. Jane = Juana EN; Maria Jane = otra sala.',
        suggestedSlug: FLOR_SLUG,
        doneHref: HREF,
        seriesHint: 'vida-contos',
        sources: [
          HREF,
          '/vida/',
          '/posts/post-inspecao-personagem-joaninha-joana.html',
          '/posts/post-inspecao-personagem-dona-maria.html',
          '/posts/post-inspecao-palavra-flor.html',
          '/posts/post-inspecao-palavra-maria.html'
        ],
        notes: 'Canal = par Joana + Dona Maria. Ficha ≠ receita de floração ≠ tutorial de gíria Mary Jane.'
      },
      ['conto-vida-laboratorio']
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
        id: 'flor-maria-jane-maria',
        word: 'Flor Maria Jane Maria',
        simple:
          'Personagem Vida — flor do canal Joana e Maria (folha + solo). Jane = Joana em inglês. Maria Jane / Mary Jane = outra sala. Valeu !!!',
        simpleEn:
          'Vida character — flower of the Joana and Maria channel (leaf + soil). Jane = Joana in English. Maria Jane / Mary Jane = another room. Valeu !!!',
        simpleEs:
          'Personaje Vida — flor del canal Joana e Maria (hoja + suelo). Jane = Juana en inglés. Maria Jane / Mary Jane = otra sala. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Pedido de campo: contato com Flor Maria Jane Maria, personagem do canal Joana e Maria. O laboratório lê o canal como o par Joaninha Joana + Dona Maria; a flor é o contacto visível.',
        curiosities:
          'Jane traduz Joana. Maria Jane cola na orelha como Mary Jane (gíria EN da cannabis) — sala do catálogo da planta, não desta ficha. Nome ≠ planta (ver Maria). Flor ≠ receita (ver flor).',
        historyEn:
          'Field request: contact with Flor Maria Jane Maria, character of the Joana and Maria channel. The lab reads the channel as Ladybug Joana + Dona Maria; the flower is the visible contact.',
        curiositiesEn:
          'Jane translates Joana. Maria Jane sounds like Mary Jane (EN cannabis slang) — plant catalog room, not this sheet. Name ≠ plant (see Maria). Flower ≠ recipe (see flor).',
        historyEs:
          'Pedido de campo: contacto con Flor Maria Jane Maria, personaje del canal Joana e Maria. El laboratorio lee el canal como el par Mariquita Juana + Doña María; la flor es el contacto visible.',
        curiositiesEs:
          'Jane traduce a Juana. Maria Jane suena a Mary Jane (jerga EN) — sala del catálogo de la planta, no de esta ficha. Nombre ≠ planta. Flor ≠ receta.'
      },
      ['maria', 'flor']
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
      id: 'flor-maria-jane-maria',
      slug: 'flor-maria-jane-maria',
      title: 'Flor Maria Jane Maria',
      titleEn: 'Flor Maria Jane Maria',
      titleEs: 'Flor Maria Jane Maria',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a flor do canal Joana e Maria; Valeu !!!',
      teaserEn: 'BudGanja echo — the flower of the Joana and Maria channel; Valeu !!!',
      teaserEs: 'Eco BudGanja — la flor del canal Joana e Maria; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'flor', 'maria', 'joana', 'personagem']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const flor = posts.find((p) => p.slug === FLOR_SLUG);
  if (flor) {
    const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
    i18n[flor.slug] = {
      titleEn: flor.titleEn,
      titleEs: flor.titleEs,
      excerptEn: flor.excerptEn,
      excerptEs: flor.excerptEs,
      contentEn: flor.contentEn,
      contentEs: flor.contentEs
    };
    await writeJsonRetry(I18N_FILE, i18n);
  }

  console.log('OK:', HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
