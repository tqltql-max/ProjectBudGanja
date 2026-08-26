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

/**
 * Vermelhas (danger): category + mundane (dicionário) + gloss (leitura BudGanja).
 * Categorias: Retaliação · Dano à vida · Toxina · Afecto tóxico · Esvaziamento
 */
const AVISO = {
  vingança: fill({
    tone: 'danger',
    category: 'Retaliação',
    mundane: 'Desforra ou castigo a quem ofendeu.',
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
  retaliação: fill({
    tone: 'danger',
    category: 'Retaliação',
    mundane: 'Resposta igual ao dano sofrido; «olho por olho».',
    gloss: 'Conta de «olho por olho» que a frase diz nunca fechar («nunca é plena»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'retaliation', es: 'retaliación', fr: 'représailles', it: 'rappresaglia', de: 'Vergeltung',
    el: 'αντίποινα', la: 'talio'
  }),
  revidar: fill({
    tone: 'danger',
    category: 'Retaliação',
    mundane: 'Responder a um golpe com outro golpe.',
    gloss: 'Devolver o golpe — impulso que a oralidade avisa contra.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to strike back', es: 'devolver el golpe', fr: 'riposter', it: 'rispondere', de: 'zurückschlagen',
    el: 'αντεπιτίθεμαι', la: 'revidere'
  }),
  mata: fill({
    tone: 'danger',
    category: 'Dano à vida',
    mundane: 'Tira a vida; causa a morte.',
    gloss: 'Aqui = esvaziar o centro íntimo (não homicídio literal).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'kills', es: 'mata', fr: 'tue', it: 'uccide', de: 'tötet',
    el: 'σκοτώνει', la: 'necat'
  }),
  matar: fill({
    tone: 'danger',
    category: 'Dano à vida',
    mundane: 'Tirar a vida; causar a morte.',
    gloss: 'Esvaziar / destruir — na frase, o dano interno da vingança.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to kill', es: 'matar', fr: 'tuer', it: 'uccidere', de: 'töten',
    el: 'σκοτώνω', la: 'necare'
  }),
  veneno: fill({
    tone: 'danger',
    category: 'Toxina',
    mundane: 'Substância tóxica que pode matar ou adoecer.',
    gloss: 'Carga afectiva que ocupa o lugar do cuidado — ≠ toxina de planta.',
    href: '/posts/post-inspecao-filme-venom.html',
    en: 'poison', es: 'veneno', fr: 'poison', it: 'veleno', de: 'Gift',
    yo: 'májè', sw: 'sumu', gez: 'mäsäräq', el: 'δηλητήριο', la: 'venenum'
  }),
  envenena: fill({
    tone: 'danger',
    category: 'Toxina',
    mundane: 'Aplica veneno; torna tóxico ou doente.',
    gloss: 'Corrompe por dentro — metáfora de dose que fica no próprio sujeito.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'poisons', es: 'envenena', fr: 'empoisonne', it: 'avvelena', de: 'vergiftet',
    el: 'δηλητηριάζει', la: 'venenat'
  }),
  envenenar: fill({
    tone: 'danger',
    category: 'Toxina',
    mundane: 'Dar ou aplicar veneno; tornar tóxico.',
    gloss: 'Corromper por dentro — dose afectiva, não toxina de planta.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to poison', es: 'envenenar', fr: 'empoisonner', it: 'avvelenare', de: 'vergiften',
    el: 'δηλητηριάζω', la: 'veneno'
  }),
  corromper: fill({
    tone: 'danger',
    category: 'Toxina',
    mundane: 'Estragar; deteriorar moral ou materialmente.',
    gloss: 'Estragar por dentro — segundo dano da frase («envenena»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to corrupt', es: 'corromper', fr: 'corrompre', it: 'corrompere', de: 'korrumpieren',
    el: 'διαφθείρω', la: 'corrumpere'
  }),
  rancor: fill({
    tone: 'danger',
    category: 'Afecto tóxico',
    mundane: 'Ódio ou mágoa guardada contra alguém.',
    gloss: 'Ressentimento guardado; o ditado trata-o como dose auto-ingerida.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'grudge', es: 'rencor', fr: 'rancune', it: 'rancore', de: 'Groll',
    el: 'μνησικακία', la: 'rancor'
  }),
  ressentimento: fill({
    tone: 'danger',
    category: 'Afecto tóxico',
    mundane: 'Mágoa persistente por ofensa recebida.',
    gloss: 'Ferida que continua a actuar depois do facto — nutriente do rancor.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'resentment', es: 'resentimiento', fr: 'ressentiment', it: 'risentimento', de: 'Groll',
    el: 'μνησικακία', la: 'offensa'
  }),
  esvaziar: fill({
    tone: 'danger',
    category: 'Esvaziamento',
    mundane: 'Deixar vazio; retirar o conteúdo.',
    gloss: 'Esvaziar o centro íntimo — primeiro dano da frase («mata a alma»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'to empty', es: 'vaciar', fr: 'vider', it: 'svuotare', de: 'leeren',
    el: 'αδειάζω', la: 'evacuare'
  }),
  alma: fill({
    tone: 'caution',
    category: 'Centro íntimo',
    mundane: 'Princípio vital / centro da pessoa (uso corrente e religioso).',
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
    category: 'Centro íntimo',
    mundane: 'Ânimo, disposição; também sentido religioso.',
    gloss: 'Ânimo / disposição interior afectada pelo rancor.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'spirit', es: 'espíritu', fr: 'esprit', it: 'spirito', de: 'Geist',
    el: 'πνεύμα', la: 'spiritus'
  }),
  justiça: fill({
    tone: 'caution',
    category: 'Promessa moral',
    mundane: 'Dar a cada um o que é devido; equidade.',
    gloss: 'O que a vingança promete e não entrega — usar com precisão.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'justice', es: 'justicia', fr: 'justice', it: 'giustizia', de: 'Gerechtigkeit',
    el: 'δικαιοσύνη', la: 'iustitia'
  }),
  plena: fill({
    tone: 'caution',
    category: 'Promessa moral',
    mundane: 'Completa; cheia; cumprida.',
    gloss: 'Completa / cumprida — na frase: a vingança «nunca é plena».',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'complete', es: 'plena', fr: 'pleine', it: 'piena', de: 'vollständig',
    el: 'πλήρης', la: 'plena'
  }),
  dose: fill({
    tone: 'caution',
    category: 'Metáfora toxicológica',
    mundane: 'Quantidade de remédio ou substância a ingerir.',
    gloss: 'Quantidade que se ingere; metáfora toxicológica do ressentimento.',
    href: '/posts/post-inspecao-filme-venom.html',
    en: 'dose', es: 'dosis', fr: 'dose', it: 'dose', de: 'Dosis',
    el: 'δόση', la: 'dosis'
  }),
  aviso: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Alerta; informação que previne.',
    gloss: 'O que a frase faz ao ouvinte — alerta, não condenação do afecto.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'warning', es: 'aviso', fr: 'avertissement', it: 'avviso', de: 'Warnung',
    el: 'προειδοποίηση', la: 'monitio'
  }),
  ditado: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Frase popular de sabedoria.',
    gloss: 'Sabedoria em circulação (oralidade → TV → meme).',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'saying', es: 'dicho', fr: 'dicton', it: 'detto', de: 'Sprichwort',
    el: 'ρητό', la: 'dictum'
  }),
  ditados: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Frases populares de sabedoria.',
    gloss: 'Sabedoria em circulação (oralidade → TV → meme).',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'sayings', es: 'dichos', fr: 'dictons', it: 'detti', de: 'Sprichwörter',
    el: 'ρητά', la: 'dicta'
  }),
  expressão: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Modo de dizer; frase feita.',
    gloss: 'Unidade da série Expressões e Ditados — frase com método.',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'expression', es: 'expresión', fr: 'expression', it: 'espressione', de: 'Ausdruck',
    el: 'έκφραση', la: 'expressio'
  }),
  expressões: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Modos de dizer; frases feitas.',
    gloss: 'Unidade da série Expressões e Ditados — frase com método.',
    href: '/biblioteca/inspecoes/#inspecoes-expressoes',
    en: 'expressions', es: 'expresiones', fr: 'expressions', it: 'espressioni', de: 'Ausdrücke',
    el: 'εκφράσεις', la: 'expressiones'
  }),
  metáfora: fill({
    tone: 'caution',
    category: 'Literacia',
    mundane: 'Figura que transporta sentido de um domínio para outro.',
    gloss: 'Transporte de sentido (veneno afectivo ≠ toxina botânica).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'metaphor', es: 'metáfora', fr: 'métaphore', it: 'metafora', de: 'Metapher',
    el: 'μεταφορά', la: 'metaphora'
  }),
  oralidade: fill({
    tone: 'caution',
    category: 'Oralidade',
    mundane: 'Comunicação pela fala (não escrita).',
    gloss: 'Circulação por voz, memória e refrão — antes e depois da TV.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
    en: 'orality', es: 'oralidad', fr: 'oralité', it: 'oralità', de: 'Mündlichkeit',
    el: 'προφορικότητα', la: 'oralitas'
  }),
  raiva: fill({
    tone: 'caution',
    category: 'Afecto',
    mundane: 'Ira; indignação forte.',
    gloss: 'Fogo de limite e indignação — emoção com ofício, não vilania.',
    href: '/posts/post-inspecao-palavra-raiva.html',
    en: 'anger', es: 'ira', fr: 'colère', it: 'rabbia', de: 'Wut',
    yo: 'ìbínú', sw: 'hasira', gez: 'mäʿat', el: 'θυμός', la: 'ira'
  }),
  emoção: fill({
    tone: 'caution',
    category: 'Afecto',
    mundane: 'Sentimento ou estado afectivo.',
    gloss: 'Nome do afecto antes da personagem; hub da sala de comando.',
    href: '/posts/post-inspecao-palavra-emocao.html',
    en: 'emotion', es: 'emoción', fr: 'émotion', it: 'emozione', de: 'Emotion',
    yo: 'ìmọ̀lara', sw: 'hisia', gez: 'ḥəlləyo', el: 'συναίσθημα', la: 'emotio'
  })
};

/** Vazio — tudo em AVISO (replace completo da linha). */
const MERGE_META = {};

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
