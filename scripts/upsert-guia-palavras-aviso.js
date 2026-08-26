'use strict';

/**
 * Cria o grupo «Palavras de aviso» no Guia e lista as vermelhas (tone: danger).
 * Fonte: Vida/Palavras-aviso.txt
 * Uso: node scripts/upsert-guia-palavras-aviso.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

const GROUP = {
  id: 'aviso',
  label: 'Palavras de aviso',
  labelEn: 'Warning words',
  labelEs: 'Palabras de aviso'
};

const ITEMS = [
  {
    id: 'aviso-vinganca',
    word: 'vingança',
    simple:
      'Aviso vermelho · Retaliação. Comum: desforra. BudGanja: promete equilíbrio e cobra o preço em quem a cultiva.',
    simpleEn:
      'Red warning · Retaliation. Everyday: payback. BudGanja: promises balance and charges the one who grows it.',
    simpleEs:
      'Aviso rojo · Retaliación. Común: desquite. BudGanja: promete equilibrio y cobra el precio en quien la cultiva.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-retaliacao',
    word: 'retaliação',
    simple:
      'Aviso vermelho · Retaliação. Comum: olho por olho. BudGanja: conta que a frase diz nunca fechar («nunca é plena»).',
    simpleEn:
      'Red warning · Retaliation. Everyday: eye for an eye. BudGanja: a bill the saying says never closes.',
    simpleEs:
      'Aviso rojo · Retaliación. Común: ojo por ojo. BudGanja: cuenta que el dicho dice que nunca cierra.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-revidar',
    word: 'revidar',
    simple:
      'Aviso vermelho · Retaliação. Comum: devolver o golpe. BudGanja: impulso que a oralidade avisa contra.',
    simpleEn:
      'Red warning · Retaliation. Everyday: strike back. BudGanja: the impulse orality warns against.',
    simpleEs:
      'Aviso rojo · Retaliación. Común: devolver el golpe. BudGanja: impulso que la oralidad avisa contra.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-matar',
    word: 'matar / mata',
    simple:
      'Aviso vermelho · Dano à vida. Comum: tirar a vida. BudGanja: na frase = esvaziar o centro íntimo, não homicídio literal.',
    simpleEn:
      'Red warning · Harm to life. Everyday: to kill. BudGanja: in the saying = emptying the inner centre, not literal homicide.',
    simpleEs:
      'Aviso rojo · Daño a la vida. Común: quitar la vida. BudGanja: en la frase = vaciar el centro íntimo, no homicidio literal.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-veneno',
    word: 'veneno',
    simple:
      'Aviso vermelho · Toxina. Comum: substância tóxica. BudGanja: carga afectiva no lugar do cuidado — ≠ toxina de planta.',
    simpleEn:
      'Red warning · Toxin. Everyday: poisonous substance. BudGanja: affective load in place of care — ≠ plant toxin.',
    simpleEs:
      'Aviso rojo · Toxina. Común: sustancia tóxica. BudGanja: carga afectiva en lugar del cuidado — ≠ toxina de planta.',
    href: '/posts/post-inspecao-filme-venom.html'
  },
  {
    id: 'aviso-envenenar',
    word: 'envenenar / envenena',
    simple:
      'Aviso vermelho · Toxina. Comum: aplicar veneno. BudGanja: corrompe por dentro — dose que fica no próprio sujeito.',
    simpleEn:
      'Red warning · Toxin. Everyday: to poison. BudGanja: corrupts from within — a dose that stays in the subject.',
    simpleEs:
      'Aviso rojo · Toxina. Común: aplicar veneno. BudGanja: corrompe por dentro — dosis que queda en el propio sujeto.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-corromper',
    word: 'corromper',
    simple:
      'Aviso vermelho · Toxina. Comum: estragar. BudGanja: segundo dano da frase («envenena»).',
    simpleEn:
      'Red warning · Toxin. Everyday: to spoil. BudGanja: the saying’s second harm («envenena»).',
    simpleEs:
      'Aviso rojo · Toxina. Común: estropear. BudGanja: segundo daño de la frase («envenena»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-rancor',
    word: 'rancor',
    simple:
      'Aviso vermelho · Afecto tóxico. Comum: mágoa guardada. BudGanja: o ditado trata-o como dose auto-ingerida.',
    simpleEn:
      'Red warning · Toxic affect. Everyday: a stored grudge. BudGanja: the saying treats it as a self-ingested dose.',
    simpleEs:
      'Aviso rojo · Afecto tóxico. Común: rencor guardado. BudGanja: el dicho lo trata como dosis autoingerida.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-ressentimento',
    word: 'ressentimento',
    simple:
      'Aviso vermelho · Afecto tóxico. Comum: mágoa persistente. BudGanja: ferida que continua a actuar — nutriente do rancor.',
    simpleEn:
      'Red warning · Toxic affect. Everyday: lingering hurt. BudGanja: a wound that keeps acting — fuel for the grudge.',
    simpleEs:
      'Aviso rojo · Afecto tóxico. Común: herida persistente. BudGanja: herida que sigue actuando — nutriente del rencor.',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  },
  {
    id: 'aviso-esvaziar',
    word: 'esvaziar',
    simple:
      'Aviso vermelho · Esvaziamento. Comum: deixar vazio. BudGanja: primeiro dano da frase («mata a alma»).',
    simpleEn:
      'Red warning · Emptying. Everyday: to empty. BudGanja: the saying’s first harm («mata a alma»).',
    simpleEs:
      'Aviso rojo · Vaciado. Común: dejar vacío. BudGanja: primer daño de la frase («mata a alma»).',
    href: '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html'
  }
];

function upsertGroup(groups) {
  const idx = groups.findIndex((g) => g.id === GROUP.id);
  if (idx >= 0) groups[idx] = Object.assign({}, groups[idx], GROUP);
  else groups.push(GROUP);
}

function upsertItem(items, entry) {
  const full = Object.assign({ group: 'aviso', fromTitle: false }, entry);
  const idx = items.findIndex((x) => x.id === full.id);
  if (idx >= 0) items[idx] = Object.assign({}, items[idx], full);
  else items.push(full);
}

function main() {
  const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
  guia.groups = Array.isArray(guia.groups) ? guia.groups : [];
  guia.items = Array.isArray(guia.items) ? guia.items : [];

  upsertGroup(guia.groups);
  ITEMS.forEach((entry) => upsertItem(guia.items, entry));
  guia.updatedAt = new Date().toISOString();

  fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
  console.log('grupo aviso +', ITEMS.length, 'palavras vermelhas →', GUIA_FILE);
}

main();
