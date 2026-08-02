/**
 * Injeta palavras de aviso (perigosa / uso cauteloso) no glossário Aprender.
 * Fonte humana: Vida/Palavras-aviso.txt
 *
 * Uso: node scripts/patch-learn-palavras-aviso.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'js', 'learn-glossary.js');

const LANGS = [
  'en', 'es', 'fr', 'it', 'de', 'yo', 'sw', 'gez', 'el', 'la',
  'nl', 'pl', 'ru', 'uk', 'zh', 'ja', 'ko', 'ar', 'he', 'hi', 'tr',
  'sv', 'da', 'no', 'fi', 'cs', 'ro', 'hu', 'ca', 'gl', 'eu', 'gn',
  'qu', 'eo', 'vi', 'id', 'th', 'hr', 'sk', 'ga', 'cy', 'ha', 'am',
  'fa', 'bn', 'zu'
];

function fill(core) {
  const out = Object.assign({}, core);
  const fallback = core.en || core.es || '';
  for (const lang of LANGS) {
    if (out[lang] == null || out[lang] === '') out[lang] = fallback;
  }
  return out;
}

/** Novas entradas + meta (tone/gloss/href). */
const AVISO = {
  vingança: fill({
    tone: 'danger',
    gloss: 'Retaliação que promete equilíbrio e cobra o preço em quem a cultiva.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'revenge', es: 'venganza', fr: 'vengeance', it: 'vendetta', de: 'Rache',
    yo: 'ẹ̀san', sw: 'kisasi', gez: 'bäqqäl', el: 'εκδίκηση', la: 'ultio',
    nl: 'wraak', pl: 'zemsta', ru: 'месть', uk: 'помста', zh: '复仇', ja: '復讐',
    ko: '복수', ar: 'انتقام', he: 'נקמה', hi: 'प्रतिशोध', tr: 'intikam',
    sv: 'hämnd', da: 'hævn', no: 'hevn', fi: 'kosto', cs: 'pomsta', ro: 'răzbunare',
    hu: 'bosszú', ca: 'venjança', gl: 'vinganza', eu: 'mendeku', gn: 'jeike',
    qu: 'kutichiy', eo: 'venĝo', vi: 'báo thù', id: 'balas dendam', th: 'การแก้แค้น',
    hr: 'osveta', sk: 'pomsta', ga: 'díoltas', cy: 'dial', ha: 'ramsawa',
    am: 'beqele', fa: 'entegham', bn: 'প্রতিশোধ', zu: 'impindiselo'
  }),
  envenena: fill({
    tone: 'danger',
    gloss: 'Corrompe por dentro — metáfora de dose que fica no próprio sujeito.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'poisons', es: 'envenena', fr: 'empoisonne', it: 'avvelena', de: 'vergiftet',
    el: 'δηλητηριάζει', la: 'venenat'
  }),
  envenenar: fill({
    tone: 'danger',
    gloss: 'Corromper por dentro — dose afectiva, não toxina de planta.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to poison', es: 'envenenar', fr: 'empoisonner', it: 'avvelenare', de: 'vergiften',
    el: 'δηλητηριάζω', la: 'veneno'
  }),
  mata: fill({
    tone: 'danger',
    gloss: 'Aqui = esvaziar o centro íntimo (não homicídio literal).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'kills', es: 'mata', fr: 'tue', it: 'uccide', de: 'tötet',
    el: 'σκοτώνει', la: 'necat'
  }),
  matar: fill({
    tone: 'danger',
    gloss: 'Esvaziar / destruir — na frase, o dano interno da vingança.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to kill', es: 'matar', fr: 'tuer', it: 'uccidere', de: 'töten',
    el: 'σκοτώνω', la: 'necare'
  }),
  rancor: fill({
    tone: 'danger',
    gloss: 'Ressentimento guardado; o ditado trata-o como dose auto-ingerida.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'grudge', es: 'rencor', fr: 'rancune', it: 'rancore', de: 'Groll',
    el: 'μνησικακία', la: 'rancor'
  }),
  ressentimento: fill({
    tone: 'danger',
    gloss: 'Ferida que continua a actuar depois do facto — nutriente do rancor.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'resentment', es: 'resentimiento', fr: 'ressentiment', it: 'risentimento', de: 'Groll',
    el: 'μνησικακία', la: 'offensa'
  }),
  retaliação: fill({
    tone: 'danger',
    gloss: 'Conta de «olho por olho» que a frase diz nunca fechar («nunca é plena»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'retaliation', es: 'retaliación', fr: 'représailles', it: 'rappresaglia', de: 'Vergeltung',
    el: 'αντίποινα', la: 'talio'
  }),
  revidar: fill({
    tone: 'danger',
    gloss: 'Devolver o golpe — impulso que a oralidade avisa contra.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to strike back', es: 'devolver el golpe', fr: 'riposter', it: 'rispondere', de: 'zurückschlagen',
    el: 'αντεπιτίθεμαι', la: 'revidere'
  }),
  alma: fill({
    tone: 'caution',
    gloss: 'Centro íntimo (paz, carácter, humor de fundo) — não teologia dogmática.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'soul', es: 'alma', fr: 'âme', it: 'anima', de: 'Seele',
    yo: 'ẹ̀mí', sw: 'roho', gez: 'näfs', el: 'ψυχή', la: 'anima',
    nl: 'ziel', pl: 'dusza', ru: 'душа', uk: 'душа', zh: '灵魂', ja: '魂',
    ko: '영혼', ar: 'نفس', he: 'נשמה', hi: 'आत्मा', tr: 'ruh',
    sv: 'själ', da: 'sjæl', no: 'sjel', fi: 'sielu', cs: 'duše', ro: 'suflet',
    hu: 'lélek', ca: 'ànima', gl: 'alma', eu: 'arima', gn: 'ãnga',
    qu: 'anima', eo: 'animo', vi: 'linh hồn', id: 'jiwa', th: 'จิตวิญญาณ',
    hr: 'duša', sk: 'duša', ga: 'anam', cy: 'enaid', ha: 'rai',
    am: 'nefs', fa: 'rooh', bn: 'আত্মা', zu: 'umphefumulo'
  }),
  espírito: fill({
    tone: 'caution',
    gloss: 'Ânimo / disposição interior afectada pelo rancor.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'spirit', es: 'espíritu', fr: 'esprit', it: 'spirito', de: 'Geist',
    el: 'πνεύμα', la: 'spiritus'
  }),
  justiça: fill({
    tone: 'caution',
    gloss: 'O que a vingança promete e não entrega — usar com precisão.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'justice', es: 'justicia', fr: 'justice', it: 'giustizia', de: 'Gerechtigkeit',
    el: 'δικαιοσύνη', la: 'iustitia'
  }),
  plena: fill({
    tone: 'caution',
    gloss: 'Completa / cumprida — na frase: a vingança «nunca é plena».',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'complete', es: 'plena', fr: 'pleine', it: 'piena', de: 'vollständig',
    el: 'πλήρης', la: 'plena'
  }),
  dose: fill({
    tone: 'caution',
    gloss: 'Quantidade que se ingere; metáfora toxicológica do ressentimento.',
    href: '/posts/post-inspecao-filme-venom.html',
    en: 'dose', es: 'dosis', fr: 'dose', it: 'dose', de: 'Dosis',
    el: 'δόση', la: 'dosis'
  }),
  aviso: fill({
    tone: 'caution',
    gloss: 'O que a frase faz ao ouvinte — alerta, não condenação do afecto.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'warning', es: 'aviso', fr: 'avertissement', it: 'avviso', de: 'Warnung',
    el: 'προειδοποίηση', la: 'monitio'
  }),
  ditado: fill({
    tone: 'caution',
    gloss: 'Sabedoria em circulação (oralidade → TV → meme).',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'saying', es: 'dicho', fr: 'dicton', it: 'detto', de: 'Sprichwort',
    el: 'ρητό', la: 'dictum'
  }),
  ditados: fill({
    tone: 'caution',
    gloss: 'Sabedoria em circulação (oralidade → TV → meme).',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'sayings', es: 'dichos', fr: 'dictons', it: 'detti', de: 'Sprichwörter',
    el: 'ρητά', la: 'dicta'
  }),
  expressão: fill({
    tone: 'caution',
    gloss: 'Unidade da série Expressões e Ditados — frase com método.',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'expression', es: 'expresión', fr: 'expression', it: 'espressione', de: 'Ausdruck',
    el: 'έκφραση', la: 'expressio'
  }),
  expressões: fill({
    tone: 'caution',
    gloss: 'Unidade da série Expressões e Ditados — frase com método.',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'expressions', es: 'expresiones', fr: 'expressions', it: 'espressioni', de: 'Ausdrücke',
    el: 'εκφράσεις', la: 'expressiones'
  }),
  metáfora: fill({
    tone: 'caution',
    gloss: 'Transporte de sentido (veneno afectivo ≠ toxina botânica).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'metaphor', es: 'metáfora', fr: 'métaphore', it: 'metafora', de: 'Metapher',
    el: 'μεταφορά', la: 'metaphora'
  }),
  oralidade: fill({
    tone: 'caution',
    gloss: 'Circulação por voz, memória e refrão — antes e depois da TV.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'orality', es: 'oralidad', fr: 'oralité', it: 'oralità', de: 'Mündlichkeit',
    el: 'προφορικότητα', la: 'oralitas'
  }),
  corromper: fill({
    tone: 'danger',
    gloss: 'Estragar por dentro — segundo dano da frase («envenena»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to corrupt', es: 'corromper', fr: 'corrompre', it: 'corrompere', de: 'korrumpieren',
    el: 'διαφθείρω', la: 'corrumpere'
  }),
  esvaziar: fill({
    tone: 'danger',
    gloss: 'Esvaziar o centro íntimo — primeiro dano da frase («mata a alma»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to empty', es: 'vaciar', fr: 'vider', it: 'svuotare', de: 'leeren',
    el: 'αδειάζω', la: 'evacuare'
  })
};

/** Meta a fundir em entradas já existentes. */
const MERGE_META = {
  veneno: {
    tone: 'danger',
    gloss: 'Carga afectiva que ocupa o lugar do cuidado — ≠ toxina de planta.',
    href: '/posts/post-inspecao-filme-venom.html'
  },
  raiva: {
    tone: 'caution',
    gloss: 'Fogo de limite e indignação — emoção com ofício, não vilania.',
    href: '/posts/post-inspecao-palavra-raiva.html'
  },
  emoção: {
    tone: 'caution',
    gloss: 'Nome do afecto antes da personagem; hub da sala de comando.',
    href: '/posts/post-inspecao-palavra-emocao.html'
  }
};

function serializeEntry(obj) {
  const parts = [];
  for (const [k, v] of Object.entries(obj)) {
    parts.push(`${k}: ${JSON.stringify(v)}`);
  }
  return `{ ${parts.join(', ')} }`;
}

function main() {
  let src = fs.readFileSync(FILE, 'utf8');

  // Merge meta into existing keys (veneno, raiva, emoção)
  for (const [key, meta] of Object.entries(MERGE_META)) {
    const re = new RegExp(`(\\n\\s*${key}:\\s*)\\{`);
    if (!re.test(src)) {
      console.warn('missing key for merge:', key);
      continue;
    }
    src = src.replace(re, (_, p1) => {
      const metaStr = Object.entries(meta)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}, `)
        .join('');
      return `${p1}{ ${metaStr}`;
    });
    console.log('merged meta →', key);
  }

  // Insert new entries before `pet:` (right after veneno block area) — find a stable anchor
  const anchor = /\n    pet: \{/;
  if (!anchor.test(src)) {
    console.error('anchor pet: not found');
    process.exit(1);
  }

  const block = Object.entries(AVISO)
    .map(([key, entry]) => `    ${key}: ${serializeEntry(entry)},`)
    .join('\n');

  // Avoid double-insert
  if (src.includes('\n    vingança: {')) {
    console.log('vingança already present — refreshing entries…');
    for (const key of Object.keys(AVISO)) {
      const re = new RegExp(`\\n\\s*${key}:\\s*\\{[^\\n]*\\},?`);
      if (re.test(src)) {
        src = src.replace(re, `\n    ${key}: ${serializeEntry(AVISO[key])},`);
        console.log('updated', key);
      } else {
        // insert near pet
        src = src.replace(anchor, `\n    ${key}: ${serializeEntry(AVISO[key])},\n    pet: {`);
        console.log('inserted', key);
      }
    }
  } else {
    src = src.replace(anchor, `\n${block}\n    pet: {`);
    console.log('inserted', Object.keys(AVISO).length, 'aviso words');
  }

  // Extend public API if missing
  if (!src.includes('toneOf:')) {
    src = src.replace(
      '  function hasInLang(word, lang) {\n    var entry = findEntry(word);\n    if (!entry) return false;\n    if (!lang) return !!(entry.en || entry.es);\n    return !!(entry[lang] && String(entry[lang]).trim());\n  }',
      `  function hasInLang(word, lang) {
    var entry = findEntry(word);
    if (!entry) return false;
    if (!lang) return !!(entry.en || entry.es);
    return !!(entry[lang] && String(entry[lang]).trim());
  }

  function toneOf(word) {
    var entry = findEntry(word);
    return (entry && entry.tone) || '';
  }

  function glossOf(word) {
    var entry = findEntry(word);
    return (entry && entry.gloss) || '';
  }

  function hrefOf(word) {
    var entry = findEntry(word);
    return (entry && entry.href) || '';
  }`
    );
    src = src.replace(
      '    hasInLang: hasInLang,\n    findEntry: findEntry,',
      '    hasInLang: hasInLang,\n    toneOf: toneOf,\n    glossOf: glossOf,\n    hrefOf: hrefOf,\n    findEntry: findEntry,'
    );
    console.log('API: toneOf / glossOf / hrefOf');
  }

  fs.writeFileSync(FILE, src);
  console.log('ok →', FILE);
}

main();
