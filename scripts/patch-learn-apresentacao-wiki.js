'use strict';

/**
 * Injeta/actualiza palavras da apresentação UNIFESP no glossário Aprender:
 * — tradução (EN/ES + fallback)
 * — href para ficha do projecto OU Wikipédia quando ainda não há ficha
 *
 * Uso: node scripts/patch-learn-apresentacao-wiki.js
 */

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

const WIKI = {
  unifesp: fill({
    gloss: 'Universidade Federal de São Paulo — referência externa (Wikipédia).',
    href: 'https://pt.wikipedia.org/wiki/Universidade_Federal_de_S%C3%A3o_Paulo',
    en: 'UNIFESP', es: 'UNIFESP', fr: 'UNIFESP', it: 'UNIFESP', de: 'UNIFESP',
    el: 'UNIFESP', la: 'UNIFESP'
  }),
  universidade: fill({
    gloss: 'Instituição de ensino superior — ver também UNIFESP no laboratório.',
    href: 'https://pt.wikipedia.org/wiki/Universidade',
    en: 'university', es: 'universidad', fr: 'université', it: 'università', de: 'Universität',
    el: 'πανεπιστήμιο', la: 'universitas'
  }),
  extensão: fill({
    gloss: 'Extensão universitária — formação além da graduação formal.',
    href: 'https://pt.wikipedia.org/wiki/Extens%C3%A3o_universit%C3%A1ria',
    en: 'extension', es: 'extensión', fr: 'extension', it: 'estensione', de: 'Extension',
    el: 'επέκταση', la: 'extensio'
  }),
  reitoria: fill({
    gloss: 'Órgão de direção da universidade — pedido institucional da apresentação.',
    href: 'https://pt.wikipedia.org/wiki/Reitoria',
    en: 'rectorate', es: 'rectorado', fr: 'rectorat', it: 'rettorato', de: 'Rektorat',
    el: 'πρυτανεία', la: 'rectoratus'
  }),
  cannabis: fill({
    gloss: 'Género botânico — no laboratório há fichas e inspeções dedicadas.',
    href: 'https://pt.wikipedia.org/wiki/Cannabis',
    en: 'cannabis', es: 'cannabis', fr: 'cannabis', it: 'cannabis', de: 'Cannabis',
    el: 'κάνναβη', la: 'cannabis'
  }),
  medicinal: fill({
    gloss: 'Uso terapêutico responsável — não substitui orientação clínica.',
    href: 'https://pt.wikipedia.org/wiki/Medicina',
    en: 'medicinal', es: 'medicinal', fr: 'médicinal', it: 'medicinale', de: 'medizinisch',
    el: 'φαρμακευτικός', la: 'medicinalis'
  }),
  fitoterápicas: fill({
    gloss: 'Plantas usadas em fitoterapia — catálogo em /plantas/.',
    href: 'https://pt.wikipedia.org/wiki/Fitoterapia',
    en: 'herbal', es: 'fitoterápicas', fr: 'phytothérapeutiques', it: 'fitoterapiche', de: 'phytotherapeutisch',
    el: 'φυτοθεραπευτικά', la: 'phytotherapeuticae'
  }),
  fitoterápica: fill({
    gloss: 'Relativo à fitoterapia — ver catálogo de plantas.',
    href: 'https://pt.wikipedia.org/wiki/Fitoterapia',
    en: 'herbal', es: 'fitoterápica', fr: 'phytothérapeutique', it: 'fitoterapica', de: 'phytotherapeutisch',
    el: 'φυτοθεραπευτικό', la: 'phytotherapeutica'
  }),
  dli: fill({
    gloss: 'Daily Light Integral — dose de luz diária (Wikipédia EN).',
    href: 'https://en.wikipedia.org/wiki/Daily_light_integral',
    en: 'DLI', es: 'DLI', fr: 'DLI', it: 'DLI', de: 'DLI',
    el: 'DLI', la: 'DLI'
  }),
  vpd: fill({
    gloss: 'Défice de pressão de vapor — ferramenta no laboratório.',
    href: '/calculadoras/',
    en: 'VPD', es: 'VPD', fr: 'VPD', it: 'VPD', de: 'VPD',
    el: 'VPD', la: 'VPD'
  }),
  ec: fill({
    gloss: 'Condutividade eléctrica da solução — ver Wikipédia / calculadoras.',
    href: 'https://pt.wikipedia.org/wiki/Condutividade_el%C3%A9trica',
    en: 'EC', es: 'CE', fr: 'CE', it: 'CE', de: 'LF',
    el: 'αγωγιμότητα', la: 'conductivitas'
  }),
  siex: fill({
    gloss: 'Sistema de inscrição da extensão UNIFESP — hub do curso no laboratório.',
    href: '/biblioteca/unifesp/',
    en: 'SIEX', es: 'SIEX', fr: 'SIEX', it: 'SIEX', de: 'SIEX',
    el: 'SIEX', la: 'SIEX'
  }),
  cebrid: fill({
    gloss: 'Centro brasileiro de informações sobre drogas psicotrópicas — ficha no laboratório.',
    href: '/posts/post-inspecao-cebrid.html',
    en: 'CEBRID', es: 'CEBRID', fr: 'CEBRID', it: 'CEBRID', de: 'CEBRID',
    el: 'CEBRID', la: 'CEBRID'
  }),
  automação: fill({
    gloss: 'Controlo automático de processos — elo com CEA / IoT agrícola.',
    href: 'https://pt.wikipedia.org/wiki/Automa%C3%A7%C3%A3o',
    en: 'automation', es: 'automatización', fr: 'automatisation', it: 'automazione', de: 'Automatisierung',
    el: 'αυτοματισμός', la: 'automatizatio'
  }),
  iot: fill({
    gloss: 'Internet das Coisas — sensores e rede no cultivo.',
    href: 'https://pt.wikipedia.org/wiki/Internet_das_coisas',
    en: 'IoT', es: 'IoT', fr: 'IoT', it: 'IoT', de: 'IoT',
    el: 'IoT', la: 'IoT'
  }),
  agrícola: fill({
    gloss: 'Relativo à agricultura — CEA e IoT no perfil do autor.',
    href: 'https://pt.wikipedia.org/wiki/Agricultura',
    en: 'agricultural', es: 'agrícola', fr: 'agricole', it: 'agricolo', de: 'landwirtschaftlich',
    el: 'γεωργικός', la: 'agricola'
  }),
  divulgação: fill({
    gloss: 'Partilha pública de ciência — objectivo da apresentação.',
    href: 'https://pt.wikipedia.org/wiki/Divulga%C3%A7%C3%A3o_cient%C3%ADfica',
    en: 'outreach', es: 'divulgación', fr: 'vulgarisation', it: 'divulgazione', de: 'Öffentlichkeitsarbeit',
    el: 'εκλαΐκευση', la: 'divulgatio'
  }),
  científica: fill({
    gloss: 'Da ciência — divulgação e método verificável.',
    href: 'https://pt.wikipedia.org/wiki/Ci%C3%AAncia',
    en: 'scientific', es: 'científica', fr: 'scientifique', it: 'scientifica', de: 'wissenschaftlich',
    el: 'επιστημονική', la: 'scientifica'
  }),
  inovação: fill({
    gloss: 'Novidade com método — pedido à Reitoria.',
    href: 'https://pt.wikipedia.org/wiki/Inova%C3%A7%C3%A3o',
    en: 'innovation', es: 'innovación', fr: 'innovation', it: 'innovazione', de: 'Innovation',
    el: 'καινοτομία', la: 'innovatio'
  }),
  educacional: fill({
    gloss: 'Com finalidade de ensino — eixo do laboratório.',
    href: 'https://pt.wikipedia.org/wiki/Educa%C3%A7%C3%A3o',
    en: 'educational', es: 'educacional', fr: 'éducatif', it: 'educativo', de: 'pädagogisch',
    el: 'εκπαιδευτικός', la: 'educativus'
  }),
  multilíngue: fill({
    gloss: 'Vários idiomas — PT/EN/ES no site; modo Aprender nas páginas vivas.',
    href: 'https://pt.wikipedia.org/wiki/Multilinguismo',
    en: 'multilingual', es: 'multilingüe', fr: 'multilingue', it: 'multilingue', de: 'mehrsprachig',
    el: 'πολύγλωσσος', la: 'multilinguis'
  }),
  literacia: fill({
    gloss: 'Capacidade de ler e usar informação com critério.',
    href: 'https://pt.wikipedia.org/wiki/Literacia',
    en: 'literacy', es: 'alfabetización', fr: 'littératie', it: 'alfabetizzazione', de: 'Literalität',
    el: 'γραμματισμός', la: 'litteratia'
  }),
  canábica: fill({
    gloss: 'Relativo à cannabis — literacia responsável no laboratório.',
    href: 'https://pt.wikipedia.org/wiki/Cannabis',
    en: 'cannabis-related', es: 'cannábica', fr: 'cannabique', it: 'cannabica', de: 'Cannabis-',
    el: 'κανναβικός', la: 'cannabica'
  }),
  apresentação: fill({
    gloss: 'Este documento vivo — PDF formal + página no estilo Vida.',
    href: '/info/apresentacao-unifesp.html',
    en: 'presentation', es: 'presentación', fr: 'présentation', it: 'presentazione', de: 'Präsentation',
    el: 'παρουσίαση', la: 'praesentatio'
  }),
  reitoria: fill({
    gloss: 'Direção da universidade — destinatária do PDF institucional.',
    href: 'https://pt.wikipedia.org/wiki/Reitoria',
    en: 'rectorate', es: 'rectorado', fr: 'rectorat', it: 'rettorato', de: 'Rektorat',
    el: 'πρυτανεία', la: 'rectoratus'
  }),
  sidarta: fill({
    gloss: 'Sidarta Ribeiro — neurocientista; crédito nas origens (Wikipédia).',
    href: 'https://pt.wikipedia.org/wiki/Sidarta_Ribeiro',
    en: 'Sidarta', es: 'Sidarta', fr: 'Sidarta', it: 'Sidarta', de: 'Sidarta',
    el: 'Sidarta', la: 'Sidarta'
  }),
  ribeiro: fill({
    gloss: 'Ver Sidarta Ribeiro (crédito / Wikipédia).',
    href: 'https://pt.wikipedia.org/wiki/Sidarta_Ribeiro',
    en: 'Ribeiro', es: 'Ribeiro', fr: 'Ribeiro', it: 'Ribeiro', de: 'Ribeiro',
    el: 'Ribeiro', la: 'Ribeiro'
  }),
  carlini: fill({
    gloss: 'Elisaldo Carlini — ficha de legado no laboratório.',
    href: '/posts/post-inspecao-elisaldo-carlini.html',
    en: 'Carlini', es: 'Carlini', fr: 'Carlini', it: 'Carlini', de: 'Carlini',
    el: 'Carlini', la: 'Carlini'
  }),
  ticão: fill({
    gloss: 'Padre Ticão — ficha de legado no laboratório.',
    href: '/posts/post-inspecao-padre-ticao.html',
    en: 'Ticão', es: 'Ticão', fr: 'Ticão', it: 'Ticão', de: 'Ticão',
    el: 'Ticão', la: 'Ticão'
  }),
  platforma: fill({
    gloss: 'Plataforma web pública do laboratório.',
    href: '/',
    en: 'platform', es: 'plataforma', fr: 'plateforme', it: 'piattaforma', de: 'Plattform',
    el: 'πλατφόρμα', la: 'suggestum'
  }),
  plataforma: fill({
    gloss: 'Plataforma web pública do laboratório.',
    href: '/',
    en: 'platform', es: 'plataforma', fr: 'plateforme', it: 'piattaforma', de: 'Plattform',
    el: 'πλατφόρμα', la: 'suggestum'
  }),
  independente: fill({
    gloss: 'Sem afiliação institucional reivindicada — eixo ético da apresentação.',
    href: '/info/sobre.html',
    en: 'independent', es: 'independiente', fr: 'indépendant', it: 'indipendente', de: 'unabhängig',
    el: 'ανεξάρτητος', la: 'independens'
  }),
  transparente: fill({
    gloss: 'Fontes e limites à vista — método BudGanja.',
    href: '/info/sobre.html',
    en: 'transparent', es: 'transparente', fr: 'transparent', it: 'trasparente', de: 'transparent',
    el: 'διαφανής', la: 'perspicuus'
  }),
  verificável: fill({
    gloss: 'Com fontes públicas — crédito a quem merece.',
    href: '/biblioteca/inspecoes/',
    en: 'verifiable', es: 'verificable', fr: 'vérifiable', it: 'verificabile', de: 'überprüfbar',
    el: 'επαληθεύσιμος', la: 'verificabilis'
  }),
  wikipédia: fill({
    gloss: 'Enciclopédia livre — usada para palavras ainda sem ficha no projecto.',
    href: 'https://pt.wikipedia.org/',
    en: 'Wikipedia', es: 'Wikipedia', fr: 'Wikipédia', it: 'Wikipedia', de: 'Wikipedia',
    el: 'Βικιπαίδεια', la: 'Vicipaedia'
  }),
  wikipedia: fill({
    gloss: 'Free encyclopedia — fallback reference for missing project sheets.',
    href: 'https://pt.wikipedia.org/',
    en: 'Wikipedia', es: 'Wikipedia', fr: 'Wikipédia', it: 'Wikipedia', de: 'Wikipedia',
    el: 'Βικιπαίδεια', la: 'Vicipaedia'
  })
};

function serializeEntry(entry) {
  const keys = Object.keys(entry);
  const parts = keys.map((k) => {
    const v = entry[k];
    if (typeof v === 'string') return `${k}: ${JSON.stringify(v)}`;
    return `${k}: ${JSON.stringify(v)}`;
  });
  return `{ ${parts.join(', ')} }`;
}

function main() {
  let src = fs.readFileSync(FILE, 'utf8');
  const anchor = /\n    pet: \{/;
  if (!anchor.test(src)) {
    console.error('anchor pet: not found');
    process.exit(1);
  }

  let inserted = 0;
  let updated = 0;
  for (const [key, entry] of Object.entries(WIKI)) {
    const re = new RegExp(`\\n\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*\\{[^\\n]*\\},?`);
    if (re.test(src)) {
      // Merge href/gloss into existing one-line entries; for multi-line skip to insert-after style
      const multi = new RegExp(
        `\\n(\\s*)${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*\\{([\\s\\S]*?)\\n\\1\\},`
      );
      if (multi.test(src)) {
        src = src.replace(multi, (full, indent, body) => {
          let next = body;
          if (!/href\s*:/.test(next) && entry.href) {
            next = `\n${indent}  href: ${JSON.stringify(entry.href)},` + next;
          }
          if (!/gloss\s*:/.test(next) && entry.gloss) {
            next = `\n${indent}  gloss: ${JSON.stringify(entry.gloss)},` + next;
          }
          return `\n${indent}${key}: {${next}\n${indent}},`;
        });
        updated += 1;
        console.log('merged meta →', key);
      } else {
        src = src.replace(re, `\n    ${key}: ${serializeEntry(entry)},`);
        updated += 1;
        console.log('updated', key);
      }
    } else {
      src = src.replace(anchor, `\n    ${key}: ${serializeEntry(entry)},\n    pet: {`);
      inserted += 1;
      console.log('inserted', key);
    }
  }

  fs.writeFileSync(FILE, src);
  console.log('ok →', FILE, '| inserted', inserted, 'updated', updated);
}

main();
