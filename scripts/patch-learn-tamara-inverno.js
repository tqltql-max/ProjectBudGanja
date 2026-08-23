/**
 * Injeta o léxico Tamara / Bom dia, Inverno no glossário Aprender
 * (tradução + gloss + href → fichas) e liga palavras profundas usadas no hub.
 *
 * Uso: node scripts/patch-learn-tamara-inverno.js
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

function ficha(slug) {
  return '/posts/post-inspecao-palavra-' + slug + '.html';
}

/** Léxico do gelo + elos profundos do hub Bom dia, Inverno. */
const ENTRIES = {
  barco: fill({
    gloss: 'Embarcação — no universo Tamara é casa, oficina e corpo da invernagem.',
    href: ficha('barco'),
    en: 'boat', es: 'barco', fr: 'bateau', it: 'barca', de: 'Boot',
    el: 'βάρκα', la: 'barca', yo: 'ọkọ̀', sw: 'boti', gez: 'ḥamar'
  }),
  mar: fill({
    gloss: 'Oceano e horizonte — travessia, sal e o mar que congela em Bom dia, Inverno.',
    href: ficha('mar'),
    en: 'sea', es: 'mar', fr: 'mer', it: 'mare', de: 'Meer',
    el: 'θάλασσα', la: 'mare', yo: 'òkun', sw: 'bahari', gez: 'baḥr'
  }),
  gelo: fill({
    gloss: 'Água sólida que prende o barco — matéria da invernagem ártica.',
    href: ficha('gelo'),
    en: 'ice', es: 'hielo', fr: 'glace', it: 'ghiaccio', de: 'Eis',
    el: 'πάγος', la: 'glacies', yo: 'yìnyín', sw: 'barafu', gez: 'bäräd'
  }),
  inverno: fill({
    gloss: 'Estação e título — Bom dia, Inverno: cumprimentar o frio sem romantizar.',
    href: ficha('inverno'),
    en: 'winter', es: 'invierno', fr: 'hiver', it: 'inverno', de: 'Winter',
    el: 'χειμώνας', la: 'hiems', yo: 'ìgbà òtútù', sw: 'baridi', gez: 'käräm'
  }),
  invernagem: fill({
    gloss: 'Permanecer o inverno inteiro no gelo — feito âncora de Tamara; eixo do livro.',
    href: ficha('invernagem'),
    en: 'overwintering', es: 'invernada', fr: 'hivernage', it: 'svernamento', de: 'Überwinterung',
    el: 'διαχείμαση', la: 'hibernatio'
  }),
  navegar: fill({
    gloss: 'Conduzir o barco e a própria rota — ofício Klink; elo com caminho e gesto.',
    href: ficha('navegar'),
    en: 'to sail', es: 'navegar', fr: 'naviguer', it: 'navigare', de: 'segeln',
    el: 'πλέω', la: 'navigare'
  }),
  água: fill({
    gloss: 'Elemento que o balde carrega e o gelo retém — volume e limite na invernagem.',
    href: ficha('agua'),
    en: 'water', es: 'agua', fr: 'eau', it: 'acqua', de: 'Wasser',
    el: 'νερό', la: 'aqua', yo: 'omi', sw: 'maji', gez: 'may'
  }),
  agua: fill({
    gloss: 'Elemento que o balde carrega e o gelo retém — volume e limite na invernagem.',
    href: ficha('agua'),
    en: 'water', es: 'agua', fr: 'eau', it: 'acqua', de: 'Wasser',
    el: 'νερό', la: 'aqua', yo: 'omi', sw: 'maji', gez: 'may'
  }),
  neve: fill({
    gloss: 'Cobertura branca do Ártico — paisagem e ruído branco da narrativa de Tamara.',
    href: ficha('neve'),
    en: 'snow', es: 'nieve', fr: 'neige', it: 'neve', de: 'Schnee',
    el: 'χιόνι', la: 'nix', yo: 'yìnyín', sw: 'theluji', gez: 'bäräd'
  }),
  congelado: fill({
    gloss: 'Estado do mar preso — o barco deixa de passar e passa a ficar (Vida).',
    href: ficha('congelado'),
    en: 'frozen', es: 'congelado', fr: 'gelé', it: 'congelato', de: 'gefroren',
    el: 'παγωμένος', la: 'congelatus'
  }),
  risco: fill({
    tone: 'caution',
    gloss: 'Perigo calculado da travessia e da invernagem — método sem pose.',
    href: ficha('risco'),
    en: 'risk', es: 'riesgo', fr: 'risque', it: 'rischio', de: 'Risiko',
    el: 'κίνδυνος', la: 'periculum'
  }),
  solitário: fill({
    gloss: 'Navegar e invernar sozinha — método, medo e escrita; não isolamento romântico.',
    href: ficha('solitario'),
    en: 'solitary', es: 'solitario', fr: 'solitaire', it: 'solitario', de: 'einsam',
    el: 'μοναχικός', la: 'solitarius'
  }),
  solitario: fill({
    gloss: 'Navegar e invernar sozinha — método, medo e escrita; não isolamento romântico.',
    href: ficha('solitario'),
    en: 'solitary', es: 'solitario', fr: 'solitaire', it: 'solitario', de: 'einsam',
    el: 'μοναχικός', la: 'solitarius'
  }),
  groenlândia: fill({
    gloss: 'Palco da invernagem ártica de Tamara — gelo, animais e o livro.',
    href: ficha('groenlandia'),
    en: 'Greenland', es: 'Groenlandia', fr: 'Groenland', it: 'Groenlandia', de: 'Grönland',
    el: 'Γροιλανδία', la: 'Groenlandia'
  }),
  groenlandia: fill({
    gloss: 'Palco da invernagem ártica de Tamara — gelo, animais e o livro.',
    href: ficha('groenlandia'),
    en: 'Greenland', es: 'Groenlandia', fr: 'Groenland', it: 'Groenlandia', de: 'Grönland',
    el: 'Γροιλανδία', la: 'Groenlandia'
  }),
  anzol: fill({
    gloss: 'Ferramenta de pesca na narrativa — gesto concreto de sobrevivência no gelo.',
    href: ficha('anzol'),
    en: 'hook', es: 'anzuelo', fr: 'hameçon', it: 'amo', de: 'Angelhakens',
    el: 'αγκίστρι', la: 'hamus'
  }),
  livro: fill({
    gloss: 'Objecto e ofício — Bom dia, Inverno: a invernagem vira página.',
    href: ficha('livro'),
    en: 'book', es: 'libro', fr: 'livre', it: 'libro', de: 'Buch',
    el: 'βιβλίο', la: 'liber', yo: 'ìwé', sw: 'kitabu', gez: 'mäṣḥaf'
  }),
  balde: fill({
    gloss: 'Recipiente com asa — volume no cultivo; no Q&A Tamara, utensílio da narrativa ártica.',
    href: ficha('balde'),
    en: 'bucket', es: 'balde', fr: 'seau', it: 'secchio', de: 'Eimer',
    el: 'κουβάς', la: 'situla', yo: 'garawa', sw: 'ndoo', gez: 'qädḥ'
  }),
  caminho: fill({
    gloss: 'Via, método e hub lexical — procura de caminhos próprios (UOL / Tamara).',
    href: ficha('caminho'),
    en: 'path', es: 'camino', fr: 'chemin', it: 'cammino', de: 'Weg',
    el: 'δρόμος', la: 'via', yo: 'ọ̀nà', sw: 'njia', gez: 'fänn'
  }),
  passar: fill({
    gloss: 'Atravessar / o que se passou — e também não poder passar no gelo.',
    href: ficha('passar'),
    en: 'to pass', es: 'pasar', fr: 'passer', it: 'passare', de: 'gehen',
    el: 'περνώ', la: 'transire', yo: 'kojá', sw: 'kupita', gez: 'ḥäläfä'
  }),
  gesto: fill({
    gloss: 'Acto mínimo concreto — regar, escrever, puxar anzol, abraçar o balde.',
    href: ficha('gesto'),
    en: 'gesture', es: 'gesto', fr: 'geste', it: 'gesto', de: 'Geste',
    el: 'χειρονομία', la: 'gestus', yo: 'ìṣe', sw: 'ishara', gez: 'məˈrāḥ'
  }),
  verdade: fill({
    gloss: 'Nomear sem pose — o «não» do pai sem apagar o mérito dele.',
    href: ficha('verdade'),
    en: 'truth', es: 'verdad', fr: 'vérité', it: 'verità', de: 'Wahrheit',
    el: 'αλήθεια', la: 'veritas', yo: 'òtítọ́', sw: 'ukweli', gez: 'ṣədq'
  }),
  medo: fill({
    tone: 'caution',
    gloss: 'Afecto inspecionado sem romantizar — limite real da invernagem solitária.',
    href: ficha('medo'),
    en: 'fear', es: 'miedo', fr: 'peur', it: 'paura', de: 'Angst',
    el: 'φόβος', la: 'timor', yo: 'ẹ̀rù', sw: 'hofu', gez: 'färhat'
  }),
  criatividade: fill({
    gloss: 'Ofício que documenta — a invernagem vira livro; elo com verdade.',
    href: ficha('criatividade'),
    en: 'creativity', es: 'creatividad', fr: 'créativité', it: 'creatività', de: 'Kreativität',
    el: 'δημιουργικότητα', la: 'creativitas'
  }),
  simbiose: fill({
    gloss: 'Viver com o que não é humano — gelo, animais, habitat; sem fundir eixos.',
    href: ficha('simbiose'),
    en: 'symbiosis', es: 'simbiosis', fr: 'symbiose', it: 'simbiosi', de: 'Symbiose',
    el: 'συμβίωση', la: 'symbiosis'
  }),
  animal: fill({
    gloss: 'Ser vivo não humano — raposas, corvos, focas do Q&A Tamara; hub /animais/.',
    href: ficha('animal'),
    en: 'animal', es: 'animal', fr: 'animal', it: 'animale', de: 'Tier',
    el: 'ζώο', la: 'animal', yo: 'ẹranko', sw: 'mnyama', gez: 'ənəs'
  }),
  alegria: fill({
    gloss: 'Emoção de expansão — inspecionada na sala de comando Divertida-mente.',
    href: ficha('alegria'),
    en: 'joy', es: 'alegría', fr: 'joie', it: 'gioia', de: 'Freude',
    el: 'χαρά', la: 'gaudium'
  }),
  tristeza: fill({
    tone: 'caution',
    gloss: 'Emoção de perda e lentidão — inspecionada sem romantizar o isolamento.',
    href: ficha('tristeza'),
    en: 'sadness', es: 'tristeza', fr: 'tristesse', it: 'tristezza', de: 'Trauer',
    el: 'λύπη', la: 'tristitia'
  }),
  nojinho: fill({
    tone: 'caution',
    gloss: 'Limite corporal / asco — elo com enjoo e balde na divulgação Tamara.',
    href: ficha('nojinho'),
    en: 'disgust', es: 'asco', fr: 'dégoût', it: 'disgusto', de: 'Ekel',
    el: 'αηδία', la: 'fastidium'
  }),
  enjoo: fill({
    tone: 'caution',
    gloss: 'Limite corporal na travessia — elo com nojinho e balde em Bom dia, Inverno.',
    href: ficha('nojinho'),
    en: 'seasickness', es: 'mareo', fr: 'mal de mer', it: 'mal di mare', de: 'Seekrankheit',
    el: 'ναυτία', la: 'nausea'
  }),
  coelho: fill({
    gloss: 'Animal-elo do laboratório — habitat e cuidado sem forçar analogia clínica.',
    href: ficha('coelho'),
    en: 'rabbit', es: 'conejo', fr: 'lapin', it: 'coniglio', de: 'Kaninchen',
    el: 'κουνέλι', la: 'cuniculus'
  }),
  fiorde: fill({
    gloss: 'Braço de mar — palco da invernagem: o barco preso no fiorde da Groenlândia.',
    href: ficha('fiorde'),
    en: 'fjord', es: 'fiordo', fr: 'fjord', it: 'fiordo', de: 'Fjord',
    el: 'φιόρδ', la: 'fiordum'
  }),
  fiordo: fill({
    gloss: 'Grafia ES/IT de fiorde — ver ficha.',
    href: ficha('fiorde'),
    en: 'fjord', es: 'fiordo'
  }),
  drone: fill({
    gloss: 'Aeronave da capa — a câmara no céu porque Tamara a mandou; a mão esquerda conduz.',
    href: ficha('drone'),
    en: 'drone', es: 'dron', fr: 'drone', it: 'drone', de: 'Drohne',
    el: 'drone', la: 'drone'
  }),
  dron: fill({
    gloss: 'Grafia ES de drone — ver ficha.',
    href: ficha('drone'),
    en: 'drone', es: 'dron'
  }),
  circular: fill({
    gloss: 'Pedido da autora: empresta, doa, deixa o papel viver — o gelo pede para circular.',
    href: ficha('circular'),
    en: 'to circulate', es: 'circular', fr: 'circuler', it: 'circolare', de: 'zirkulieren',
    el: 'κυκλοφορώ', la: 'circulare'
  }),
  voar: fill({
    gloss: 'Mandar a câmara ao céu — na invernagem a solo, voar faz o retrato.',
    href: ficha('voar'),
    en: 'to fly', es: 'volar', fr: 'voler', it: 'volare', de: 'fliegen',
    el: 'πετώ', la: 'volare'
  }),
  registar: fill({
    gloss: 'Fixar o que aconteceu — capa, diário e livro: voar, ficar, registar.',
    href: ficha('registar'),
    en: 'to record', es: 'registrar', fr: 'enregistrer', it: 'registrare', de: 'aufzeichnen',
    el: 'καταγράφω', la: 'registrare'
  }),
  registrar: fill({
    gloss: 'Grafia BR de registar — ver ficha do gelo.',
    href: ficha('registar'),
    en: 'to record', es: 'registrar'
  }),
  câmara: fill({
    gloss: 'Olho do drone — no gelo não havia fotógrafo; ela sobe a câmara.',
    href: ficha('camara'),
    en: 'camera', es: 'cámara', fr: 'caméra', it: 'camera', de: 'Kamera',
    el: 'κάμερα', la: 'camera'
  }),
  camara: fill({
    gloss: 'Grafia sem acento de câmara — ver ficha.',
    href: ficha('camara'),
    en: 'camera', es: 'cámara'
  }),
  céu: fill({
    gloss: 'Alto da capa — o céu é de onde o drone olha o fiorde.',
    href: ficha('ceu'),
    en: 'sky', es: 'cielo', fr: 'ciel', it: 'cielo', de: 'Himmel',
    el: 'ουρανός', la: 'caelum'
  }),
  ceu: fill({
    gloss: 'Grafia sem acento de céu — ver ficha.',
    href: ficha('ceu'),
    en: 'sky', es: 'cielo'
  }),
  emprestar: fill({
    gloss: 'Primeiro gesto de circular o livro — empresta a quem ainda não leu.',
    href: ficha('emprestar'),
    en: 'to lend', es: 'prestar', fr: 'prêter', it: 'prestare', de: 'leihen',
    el: 'δανείζω', la: 'praestare'
  }),
  doar: fill({
    gloss: 'Segundo gesto de circular — doar o exemplar a uma biblioteca.',
    href: ficha('doar'),
    en: 'to donate', es: 'donar', fr: 'donner', it: 'donare', de: 'spenden',
    el: 'δωρίζω', la: 'donare'
  }),
  estante: fill({
    gloss: 'Onde o livro espera — o gelo pede para circular, não para ficar na estante.',
    href: ficha('estante'),
    en: 'shelf', es: 'estante', fr: 'étagère', it: 'scaffale', de: 'Regal',
    el: 'ράφι', la: 'pluteus'
  }),
  peito: fill({
    gloss: 'Corpo que a invernagem mede — o peito ainda cabe na mão quando o gelo prende o barco.',
    href: ficha('peito'),
    en: 'chest', es: 'pecho', fr: 'poitrine', it: 'petto', de: 'Brust',
    el: 'στήθος', la: 'pectus'
  }),
  mudinha: fill({
    gloss: 'Planta jovem — Bom dia, Inverno entra no laboratório como mudinha da Vida.',
    href: ficha('mudinha'),
    en: 'seedling', es: 'plantita', fr: 'plantule', it: 'piantina', de: 'Setzling',
    el: 'φυτάριο', la: 'plantula'
  }),
  estação: fill({
    gloss: 'Tempo do ciclo — inverno é estação, não fim; inspeciona-se a raiz.',
    href: ficha('estacao'),
    en: 'season', es: 'estación', fr: 'saison', it: 'stagione', de: 'Jahreszeit',
    el: 'εποχή', la: 'statio'
  }),
  estacao: fill({
    gloss: 'Grafia sem cedilha de estação — ver ficha.',
    href: ficha('estacao'),
    en: 'season', es: 'estación'
  }),
  partir: fill({
    gloss: 'A decisão de ir — tríade Tamara no gelo: partir, ficar, escrever.',
    href: ficha('partir'),
    en: 'to leave', es: 'partir', fr: 'partir', it: 'partire', de: 'aufbrechen',
    el: 'φεύγω', la: 'proficisci'
  })
};

function serializeEntry(entry) {
  const keys = Object.keys(entry);
  const parts = keys.map((k) => {
    const v = entry[k];
    if (typeof v === 'string') return k + ': ' + JSON.stringify(v);
    return k + ': ' + JSON.stringify(v);
  });
  return '{ ' + parts.join(', ') + ' }';
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
  for (const [key, entry] of Object.entries(ENTRIES)) {
    const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\n\\s*' + esc + ':\\s*\\{[^\\n]*\\},?');
    if (re.test(src)) {
      src = src.replace(re, '\n    ' + key + ': ' + serializeEntry(entry) + ',');
      updated += 1;
      console.log('updated', key);
    } else {
      src = src.replace(anchor, '\n    ' + key + ': ' + serializeEntry(entry) + ',\n    pet: {');
      inserted += 1;
      console.log('inserted', key);
    }
  }

  fs.writeFileSync(FILE, src);
  console.log('ok →', FILE, '| inserted', inserted, 'updated', updated);
}

main();
