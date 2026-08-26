/**
 * Injeta palavras do mantra «Faça o melhor!» no glossário Aprender.
 * Fonte: Vida/Palavras-mantra.txt
 *
 * Uso: node scripts/patch-learn-mantra-faca-o-melhor.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-faca-o-melhor.html';
const HREF_PROIB =
  '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';

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

function serializeEntry(entry) {
  const parts = [];
  for (const [k, v] of Object.entries(entry)) {
    parts.push(`${k}: ${JSON.stringify(v)}`);
  }
  return `{ ${parts.join(', ')} }`;
}

const ENTRIES = {
  roubar: fill({
    tone: 'danger',
    category: 'Apropriação',
    mundane: 'Tirar o que é de outrem.',
    gloss: 'Tomar frase, obra ou crédito do laboratório.',
    href: HREF,
    en: 'to steal', es: 'robar', fr: 'voler', it: 'rubare', de: 'stehlen',
    el: 'κλέβω', la: 'furari'
  }),
  roubo: fill({
    tone: 'danger',
    category: 'Apropriação',
    mundane: 'Acto de tirar o que é de outrem.',
    gloss: 'Apropriação do nome, verso ou projecto BudGanja.',
    href: HREF,
    en: 'theft', es: 'robo', fr: 'vol', it: 'furto', de: 'Diebstahl',
    el: 'κλοπή', la: 'furtum'
  }),
  apropriar: fill({
    tone: 'danger',
    category: 'Apropriação',
    mundane: 'Fazer seu o alheio.',
    gloss: 'Usar o mantra sem o ofício / sem a fonte.',
    href: HREF,
    en: 'to appropriate', es: 'apropiar', fr: 's’approprier', it: 'appropriarsi',
    de: 'aneignen', el: 'ιδιοποιούμαι', la: 'appropriare'
  }),
  proibir: fill({
    tone: 'danger',
    category: 'Silenciamento',
    mundane: 'Impedir por regra ou força.',
    gloss: 'Calar o projecto de inspeção e o mantra.',
    href: HREF_PROIB,
    en: 'to forbid', es: 'prohibir', fr: 'interdire', it: 'proibire', de: 'verbieten',
    el: 'απαγορεύω', la: 'prohibere'
  }),
  silenciar: fill({
    tone: 'danger',
    category: 'Silenciamento',
    mundane: 'Impedir de falar.',
    gloss: 'Fechar a ficha, apagar o verso, negar a origem.',
    href: HREF,
    en: 'to silence', es: 'silenciar', fr: 'faire taire', it: 'silenziare',
    de: 'zum Schweigen bringen', el: 'φιμώνω', la: 'silere'
  }),
  'faça': fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Imperativo de fazer (lat. facere) — realize, produza.',
    gloss: 'Peça do mantra: acto, não pose; nesta mão, hoje. ≠ faca (lâmina).',
    href: HREF,
    en: 'do (imperative)', es: 'haz', fr: 'fais', it: 'fai', de: 'tu',
    el: 'κάνε', la: 'fac'
  }),
  faca: fill({
    tone: 'caution',
    category: 'Objecto',
    mundane: 'Utensílio de corte; lâmina com cabo.',
    gloss: 'Não é o Faça do mantra (ç). Sem ficha própria — a peça do ofício é faça.',
    href: HREF,
    en: 'knife', es: 'cuchillo', fr: 'couteau', it: 'coltello', de: 'Messer',
    el: 'μαχαίρι', la: 'culter'
  }),
  fazer: fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Realizar; produzir (lat. facere).',
    gloss: 'Acto — não pose. No mantra: Faça o melhor; ≠ faca (lâmina).',
    href: HREF,
    en: 'to do', es: 'hacer', fr: 'faire', it: 'fare', de: 'tun',
    el: 'κάνω', la: 'facere'
  }),
  melhor: fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Superior; o mais adequado. Comparativo de bom (lat. melior).',
    gloss: 'O possível honesto nesta mão, hoje — não perfeição alheia.',
    href: HREF,
    en: 'best', es: 'mejor', fr: 'meilleur', it: 'migliore', de: 'beste',
    el: 'καλύτερο', la: 'melius'
  }),
  mantra: fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Frase repetida (religião / motivação).',
    gloss: 'Frase curta que repete ofício no laboratório Vida.',
    href: HREF,
    en: 'mantra', es: 'mantra', fr: 'mantra', it: 'mantra', de: 'Mantra',
    el: 'μάντρα', la: 'mantra'
  }),
  esforço: fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Emprego de força ou atenção.',
    gloss: 'Trabalho honesto do ofício — «fiz o meu melhor».',
    href: HREF,
    en: 'effort', es: 'esfuerzo', fr: 'effort', it: 'sforzo', de: 'Anstrengung',
    el: 'προσπάθεια', la: 'nisus'
  }),
  ofício: fill({
    tone: 'caution',
    category: 'Ofício',
    mundane: 'Profissão; trabalho habitual.',
    gloss: 'Acto concreto (gesto) — inspecionar, cultivar, narrar.',
    href: '/posts/post-inspecao-palavra-gesto.html',
    en: 'craft', es: 'oficio', fr: 'métier', it: 'mestiere', de: 'Handwerk',
    el: 'επάγγελμα', la: 'officium'
  })
};

function main() {
  let src = fs.readFileSync(FILE, 'utf8');
  const anchor = /\n    pet: \{/;
  if (!anchor.test(src)) {
    console.error('anchor pet: not found');
    process.exit(1);
  }

  for (const [key, entry] of Object.entries(ENTRIES)) {
    const re = new RegExp(`\\n\\s*${key}:\\s*\\{[^\\n]*\\},?`);
    if (re.test(src)) {
      src = src.replace(re, `\n    ${key}: ${serializeEntry(entry)},`);
      console.log('updated', key);
    } else {
      src = src.replace(anchor, `\n    ${key}: ${serializeEntry(entry)},\n    pet: {`);
      console.log('inserted', key);
    }
  }

  // Merge tone/gloss/href into existing proibição if present
  if (/\n\s*proibição:\s*\{/.test(src)) {
    const meta = {
      tone: 'danger',
      category: 'Silenciamento',
      mundane: 'Acto de impedir por regra ou força.',
      gloss: 'Camada que cala listas — e, nesta ficha, o projecto de inspeção.',
      href: HREF_PROIB
    };
    src = src.replace(/(\n\s*proibição:\s*)\{/, (_, p1) => {
      const metaStr = Object.entries(meta)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}, `)
        .join('');
      return `${p1}{ ${metaStr}`;
    });
    console.log('merged meta → proibição');
  }

  fs.writeFileSync(FILE, src);
  console.log('ok →', FILE);
}

main();
