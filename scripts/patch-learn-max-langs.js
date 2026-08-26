'use strict';

/**
 * Acrescenta o máximo de línguas ao modo Aprender (Vida).
 * Uso:
 *   node scripts/build-learn-lang-pack.js
 *   node scripts/patch-learn-max-langs.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PACK = path.join(__dirname, 'learn-lang-pack.json');
const GLOSSARY = path.join(ROOT, 'js', 'learn-glossary.js');
const TRANSLATE = path.join(ROOT, 'js', 'learn-translate.js');
const I18N_FILES = [
  path.join(ROOT, 'content', 'i18n', 'pt-BR.json'),
  path.join(ROOT, 'content', 'i18n', 'en.json'),
  path.join(ROOT, 'content', 'i18n', 'es.json')
];

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function main() {
  if (!fs.existsSync(PACK)) {
    require('./build-learn-lang-pack.js');
  }
  const { NEW_LANGS, CORE } = JSON.parse(fs.readFileSync(PACK, 'utf8'));
  const codes = NEW_LANGS.map((x) => x.code);

  // --- glossary ---
  let gSrc = fs.readFileSync(GLOSSARY, 'utf8');
  gSrc = gSrc.replace(
    /Glossário PT →[^\n]+/,
    'Glossário PT → EN/ES/FR/IT/DE/YO/SW/GEZ/EL/LA + ' +
      codes.join('/').toUpperCase() +
      ' para o modo Aprender (palavra a palavra).'
  );

  let patched = 0;
  let fallback = 0;

  gSrc = gSrc.replace(
    /^(\s{4})([a-zàáâãäåæçèéêëìíîïñòóôõöùúûüýÿœ0-9_'-]+):\s*\{\s*((?:[^}]|\}(?!\s*,?\s*$))*)\s*\}/gim,
    (full, indent, key, inner) => {
      if (!/\ben:\s*'/.test(inner)) return full;

      const enM = inner.match(/\ben:\s*'((?:\\'|[^'])*)'/);
      const en = enM ? enM[1] : key;
      const core = CORE[key] || {};

      let next = inner.replace(/,\s*$/, '').trim();
      for (const code of codes) {
        const val = core[code] || en;
        if (core[code]) patched += 1;
        else fallback += 1;
        const re = new RegExp('\\b' + code + ":\\s*'((?:\\\\'|[^'])*)'");
        if (re.test(next)) {
          next = next.replace(re, code + ": '" + esc(val) + "'");
        } else {
          next += ', ' + code + ": '" + esc(val) + "'";
        }
      }
      return indent + key + ': { ' + next + ' }';
    }
  );

  // Replace lang if-chain with generic entry[lang]
  gSrc = gSrc.replace(
    /if \(!entry\) return '';\n(?:\s*if \(lang === '[a-z]+'\) return entry\.[a-z]+ \|\| entry\.en \|\| '';\n)+(\s*)return entry\.en \|\| entry\.es \|\| '';/,
    "if (!entry) return '';\n" +
      "$1if (lang && entry[lang]) return entry[lang];\n" +
      "$1return entry.en || entry.es || '';"
  );

  fs.writeFileSync(GLOSSARY, gSrc, 'utf8');
  console.log('Glossary: core hits', patched, 'EN-fallback slots', fallback);

  // --- learn-translate.js ---
  let tSrc = fs.readFileSync(TRANSLATE, 'utf8');

  const learnLangsObj =
    "{ en: 1, es: 1, fr: 1, it: 1, de: 1, yo: 1, sw: 1, gez: 1, el: 1, la: 1, " +
    codes.map((c) => c + ': 1').join(', ') +
    ' }';
  tSrc = tSrc.replace(
    /var LEARN_LANGS = \{[^}]+\};/,
    'var LEARN_LANGS = ' + learnLangsObj + ';'
  );

  // scrambleCharset: inject new langs before final return
  const scrambleLines = NEW_LANGS.map(
    (l) => "    if (lang === '" + l.code + "') return '" + esc(l.charset) + "';"
  ).join('\n');
  if (!tSrc.includes("if (lang === 'nl')")) {
    tSrc = tSrc.replace(
      /if \(lang === 'la'\) return '[^']*';\n\s*return 'abcdefghijklmnopqrstuvwxyz';/,
      "if (lang === 'la') return 'abcdefghijklmnopqrstuvwxyzæœ';\n" +
        scrambleLines +
        "\n    return 'abcdefghijklmnopqrstuvwxyz';"
    );
  }

  // names map in syncToolbar
  const nameLines = NEW_LANGS.map(
    (l) => "          " + l.code + ": '" + esc(l.name) + "'"
  ).join(',\n');
  tSrc = tSrc.replace(
    /var names = \{[\s\S]*?la: 'Latina'\s*\};/,
    `var names = {
          en: 'English',
          es: 'español',
          fr: 'français',
          it: 'italiano',
          de: 'Deutsch',
          yo: 'Yoruba',
          sw: 'Kiswahili',
          gez: "Ge'ez",
          el: 'Ellenika',
          la: 'Latina',
${nameLines}
        };`
  );

  // toolbar buttons
  const baseBtns = [
    ['', 'Off', 'Off'],
    ['en', 'English', 'EN'],
    ['es', 'Español', 'ES'],
    ['fr', 'Français', 'FR'],
    ['it', 'Italiano', 'IT'],
    ['de', 'Deutsch', 'DE'],
    ['yo', 'Yorùbá', 'YO'],
    ['sw', 'Kiswahili', 'SW'],
    ['gez', 'Geʽez', 'GEZ'],
    ['el', 'Ελληνικά (Grego)', 'EL'],
    ['la', 'Latina (Latim)', 'LA']
  ];
  const allBtns = baseBtns.concat(
    NEW_LANGS.map((l) => [l.code, l.title, l.label])
  );
  const btnHtml = allBtns
    .map((b, i) => {
      const pressed = i === 0 ? 'true' : 'false';
      if (!b[0]) {
        return (
          "'<button type=\"button\" class=\"learn-toolbar-btn\" data-learn-lang=\"\" aria-pressed=\"" +
          pressed +
          '">' +
          b[2] +
          "</button>' +"
        );
      }
      return (
        "'<button type=\"button\" class=\"learn-toolbar-btn\" data-learn-lang=\"" +
        b[0] +
        '" aria-pressed="' +
        pressed +
        '" title="' +
        esc(b[1]) +
        '">' +
        b[2] +
        "</button>' +"
      );
    })
    .join('\n      ');

  tSrc = tSrc.replace(
    /bar\.innerHTML =\s*'<div class="learn-toolbar-row">' \+[\s\S]*?'<\/div>' \+\s*'\<\/div>' \+\s*'<p class="learn-toolbar-hint" data-learn-hint><\/p>';/,
    `bar.innerHTML =
      '<div class="learn-toolbar-row">' +
      '<span class="learn-toolbar-label" data-learn-label></span>' +
      '<div class="learn-toolbar-actions">' +
      ${btnHtml}
      '</div>' +
      '</div>' +
      '<p class="learn-toolbar-hint" data-learn-hint></p>';`
  );

  fs.writeFileSync(TRANSLATE, tSrc, 'utf8');
  console.log('learn-translate.js updated with', codes.length + 10, 'languages');

  // --- i18n hints ---
  const list =
    'EN, ES, FR, IT, DE, YO, SW, GEZ, EL, LA, NL, PL, RU, UK, ZH, JA, KO, AR, HE, HI, TR, SV, DA, NO, FI, CS, RO, HU, CA, GL, EU, GN, QU, EO, VI, ID, TH, HR, SK, GA, CY, HA, AM, FA, BN, ZU';
  const hints = {
    'pt-BR':
      'Escolhe ' +
      list +
      ' — depois passa o rato/dedo por uma palavra de cada vez.',
    en:
      'Choose ' +
      list +
      ' — then pass over one word at a time.',
    es:
      'Elige ' +
      list +
      ' — luego pasa por una palabra a la vez.'
  };
  for (const file of I18N_FILES) {
    const locale = path.basename(file, '.json');
    const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (doc.pages && doc.pages.vida) {
      doc.pages.vida.learnHintOff = hints[locale] || hints.en;
      fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n', 'utf8');
      console.log('i18n', locale, 'hint updated');
    }
  }

  console.log('Done. Total learn langs:', 10 + codes.length);
}

main();
