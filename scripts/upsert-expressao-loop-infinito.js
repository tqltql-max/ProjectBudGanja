'use strict';

/**
 * Injeta expressões «ando, indo, vindo, voltando» e «loop infinito»,
 * e a palavra loop.
 * Uso: node scripts/upsert-expressao-loop-infinito.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildAndoIndoVindoVoltandoPost
} = require('../lib/ando-indo-vindo-voltando-inspecao-post.js');
const { buildLoopInfinitoPost } = require('../lib/loop-infinito-inspecao-post.js');
const { buildLoopPost } = require('../lib/loop-inspecao-post.js');
const { buildEmPeEDeitadoPost } = require('../lib/em-pe-e-deitado-inspecao-post.js');
const { buildFimDaLinhaPost } = require('../lib/fim-da-linha-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
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

function keepOrder(posts, slug, builder) {
  const existingOne = posts.find((p) => p.slug === slug);
  const order =
    existingOne && typeof existingOne.seriesOrder === 'number'
      ? existingOne.seriesOrder
      : undefined;
  return builder(order);
}

async function syncSqlAll(posts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store actualizado (lote loop infinito)');
}

function upsertSug(sug, entry) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterIds) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of afterIds || []) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const existingSeq = posts.find(
    (p) => p.slug === 'inspecao-expressao-ando-indo-vindo-voltando'
  );
  const seqOrder = existingSeq
    ? Number(existingSeq.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const seq = buildAndoIndoVindoVoltandoPost(seqOrder);

  const existingInf = posts.find((p) => p.slug === 'inspecao-expressao-loop-infinito');
  const infOrder = existingInf
    ? Number(existingInf.seriesOrder) || nextOrder(posts, 'expressoes-ditados') + 1
    : seqOrder + 1;
  const inf = buildLoopInfinitoPost(infOrder);

  const existingWord = posts.find((p) => p.slug === 'inspecao-palavra-loop');
  const wordOrder = existingWord
    ? Number(existingWord.seriesOrder) || nextOrder(posts, 'palavras-origem')
    : nextOrder(posts, 'palavras-origem');
  const word = buildLoopPost(wordOrder);

  const related = [
    seq,
    inf,
    word,
    keepOrder(posts, 'inspecao-expressao-em-pe-e-deitado', buildEmPeEDeitadoPost),
    keepOrder(posts, 'inspecao-expressao-fim-da-linha', buildFimDaLinhaPost)
  ];

  for (const p of related) upsertPost(posts, p);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const p of related) writeI18n(i18n, p);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const hrefSeq = '/posts/post-' + seq.slug + '.html';
  const hrefInf = '/posts/post-' + inf.slug + '.html';
  const hrefWord = '/posts/post-' + word.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    upsertSug(sug, {
      id: 'expressao-ando-indo-vindo-voltando',
      title: 'ando, indo, vindo, voltando — o ciclo que não pousa',
      titleEn: 'ando, indo, vindo, voltando — the cycle that does not land',
      titleEs: 'ando, indo, vindo, voltando — el ciclo que no aterriza',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: ando, indo, vindo, voltando — ciclo oral; ando = eu ando; par loop infinito; Valeu !!!',
      whyEn: 'Sayings: ando, indo, vindo, voltando — spoken cycle; ando = I walk; pair infinite loop; Valeu !!!',
      whyEs: 'Dichos: ando, indo, vindo, voltando — ciclo oral; ando = yo ando; par loop infinito; ¡Valeu !!!',
      suggestedSlug: seq.slug,
      doneHref: hrefSeq,
      seriesHint: 'expressoes-ditados',
      sources: [
        seq.sourceUrl,
        'https://pt.wiktionary.org/wiki/ir',
        'https://pt.wiktionary.org/wiki/vir',
        'https://pt.wiktionary.org/wiki/voltar',
        hrefInf,
        hrefWord,
        '/posts/post-inspecao-palavra-exit.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + seq.seriesOrder + ' Expressões — sequência oral do loop; ando ≠ andando.'
    });
    upsertSug(sug, {
      id: 'expressao-loop-infinito',
      title: 'loop infinito — o pattern que não sai',
      titleEn: 'loop infinito — the pattern that does not exit',
      titleEs: 'loop infinito — el pattern que no sale',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: loop infinito — processo sem saída; caso oral ando, indo, vindo, voltando; antídoto exit; Valeu !!!',
      whyEn: 'Sayings: loop infinito — process without exit; oral case ando, indo, vindo, voltando; antidote exit; Valeu !!!',
      whyEs: 'Dichos: loop infinito — proceso sin salida; caso oral ando, indo, vindo, voltando; antídoto exit; ¡Valeu !!!',
      suggestedSlug: inf.slug,
      doneHref: hrefInf,
      seriesHint: 'expressoes-ditados',
      sources: [
        inf.sourceUrl,
        'https://en.wiktionary.org/wiki/loop',
        hrefSeq,
        hrefWord,
        '/posts/post-inspecao-palavra-exit.html',
        '/posts/post-inspecao-expressao-fim-da-linha.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + inf.seriesOrder + ' Expressões — pattern sem saída; ≠ glifo ∞.'
    });
    upsertSug(sug, {
      id: 'palavra-loop',
      title: 'loop — o laço que regressa, ainda não é o infinito',
      titleEn: 'loop — the bend that returns, not yet the infinite',
      titleEs: 'loop — el lazo que regresa, aún no es el infinito',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: loop — loan EN, volta que regressa; o sem-saída fica em loop infinito; Valeu !!!',
      whyEn: 'Words: loop — EN loan, returning bend; no-exit case on loop infinito; Valeu !!!',
      whyEs: 'Palabras: loop — préstamo EN, vuelta que regresa; sin-salida en loop infinito; ¡Valeu !!!',
      suggestedSlug: word.slug,
      doneHref: hrefWord,
      seriesHint: 'palavras-origem',
      sources: [
        word.sourceUrl,
        hrefInf,
        hrefSeq,
        '/posts/post-inspecao-palavra-pattern.html',
        '/posts/post-inspecao-palavra-exit.html'
      ],
      notes: 'Cap. ' + word.seriesOrder + ' Palavras — peça EN; infinito na expressão irmã.'
    });
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (loop infinito + sequência + loop)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(
      guia,
      {
        id: 'ando-indo-vindo-voltando',
        word: 'ando, indo, vindo, voltando',
        simple:
          'Locução — ciclo oral que não pousa; ando = eu ando (não gerúndio); par loop infinito. Valeu !!!',
        simpleEn:
          'Locution — spoken cycle that does not land; ando = I walk (not gerund); pair infinite loop. Valeu !!!',
        simpleEs:
          'Locución — ciclo oral que no aterriza; ando = yo ando (no gerundio); par loop infinito. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: hrefSeq,
        history:
          'Ando é a 1.ª pessoa do presente de andar (lat. ambulāre). Indo, vindo e voltando são gerúndios de ir, vir e voltar. A sequência cola um eu conjugado em três processos sem sujeito — por isso não pousa.',
        curiosities:
          'A variante andando, indo, vindo, voltando homogeneíza a morfologia. O laboratório anota e não substitui a forma pedida. O nome do pattern fica em loop infinito; a saída em exit; o limite em fim da linha.',
        historyEn:
          'Ando is the first-person present of andar (Latin ambulāre). Indo, vindo and voltando are gerunds of ir, vir and voltar. The sequence glues a conjugated I onto three subjectless processes — that is why it does not land.',
        curiositiesEn:
          'The variant andando, indo, vindo, voltando homogenizes the morphology. The lab notes it and does not replace the requested form. The pattern name lives on loop infinito; the way out on exit; the limit on fim da linha.',
        historyEs:
          'Ando es la 1.ª persona del presente de andar (lat. ambulāre). Indo, vindo y voltando son gerundios de ir, vir y voltar. La secuencia pega un yo conjugado a tres procesos sin sujeto — por eso no aterriza.',
        curiositiesEs:
          'La variante andando, indo, vindo, voltando homogeneiza la morfología. El laboratorio anota y no sustituye la forma pedida. El nombre del pattern queda en loop infinito; la salida en exit; el límite en fim da linha.'
      },
      ['em-pe-e-deitado', 'fim-da-linha', 'elo-de-ligacao']
    );
    upsertGuia(
      guia,
      {
        id: 'loop-infinito',
        word: 'loop infinito',
        simple:
          'Locução EN+PT — processo sem saída; caso oral ando, indo, vindo, voltando; ≠ glifo ∞; antídoto exit. Valeu !!!',
        simpleEn:
          'EN+PT locution — process without exit; oral case ando, indo, vindo, voltando; ≠ ∞ glyph; antidote exit. Valeu !!!',
        simpleEs:
          'Locución EN+PT — proceso sin salida; caso oral ando, indo, vindo, voltando; ≠ glifo ∞; antídoto exit. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: hrefInf,
        history:
          'Loop é loan inglês (laço / volta que regressa). Infinito vem de infīnītus (in- + fīnis, sem fim). Juntos nomeiam o while sem break — não o desenho ∞ nem a eternidade.',
        curiosities:
          'Três infinitos: o processo (esta ficha), o glifo / lemniscata, o conceito (tudo). Fundi-los é o erro clássico. A máquina aprendeu o hábito connosco.',
        historyEn:
          'Loop is an English loan (a bend that returns). Infinito comes from infīnītus (in- + fīnis, without end). Together they name the while without a break — not the ∞ drawing and not eternity.',
        curiositiesEn:
          'Three infinities: the process (this sheet), the glyph / lemniscate, the concept (tudo). Fusing them is the classic error. The machine learned the habit from us.',
        historyEs:
          'Loop es préstamo inglés (lazo / vuelta que regresa). Infinito viene de infīnītus (in- + fīnis, sin fin). Juntos nombran el while sin break — no el dibujo ∞ ni la eternidad.',
        curiositiesEs:
          'Tres infinitos: el proceso (esta ficha), el glifo / lemniscata, el concepto (tudo). Fundirlos es el error clásico. La máquina aprendió el hábito con nosotros.'
      },
      ['ando-indo-vindo-voltando', 'em-pe-e-deitado']
    );
    upsertGuia(
      guia,
      {
        id: 'loop',
        word: 'loop',
        simple:
          'Palavra — loan EN, laço / volta que regressa; o sem-saída fica em loop infinito. Valeu !!!',
        simpleEn:
          'Word — EN loan, bend that returns; the no-exit case lives on loop infinito. Valeu !!!',
        simpleEs:
          'Palabra — préstamo EN, lazo / vuelta que regresa; el sin-salida queda en loop infinito. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: hrefWord,
        history:
          'Loop entra no português do Brasil pelo inglês (código, áudio, hábito). Vizinhos: laço, ciclo, volta. Nem todo loop é infinito — falta o adjectivo da expressão irmã.',
        curiosities:
          'O glifo ∞ não é sinónimo. A sequência ando, indo, vindo, voltando é o caso oral. A porta chama-se exit.',
        historyEn:
          'Loop enters Brazilian Portuguese from English (code, audio, habit). Neighbours: laço, ciclo, volta. Not every loop is infinite — that adjective lives on the sister expression.',
        curiositiesEn:
          'The ∞ glyph is not a synonym. The sequence ando, indo, vindo, voltando is the oral case. The door is called exit.',
        historyEs:
          'Loop entra en el portugués de Brasil por el inglés (código, audio, hábito). Vecinos: laço, ciclo, volta. No todo loop es infinito — el adjetivo vive en la expresión hermana.',
        curiositiesEs:
          'El glifo ∞ no es sinónimo. La secuencia ando, indo, vindo, voltando es el caso oral. La puerta se llama exit.'
      },
      ['loop-infinito', 'pattern']
    );
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (loop + loop infinito + sequência)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const block =
      '    "ando, indo, vindo, voltando": { tone: "craft", category: "Ciclo", mundane: "Sequência oral de ir e vir que não desembarca.", gloss: "Expressão — ciclo que não pousa; ando = eu ando; par loop infinito; Valeu !!!", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "I walk, going, coming, returning", es: "ando, yendo, viniendo, volviendo", fr: "je marche, allant, venant, revenant", it: "cammino, andando, venendo, tornando", de: "ich gehe, gehend, kommend, zurückkehrend", el: "περπατώ, πηγαίνοντας", la: "ambulo, iens, veniens, rediens" },\n' +
      '    ando: { tone: "craft", category: "Ciclo", mundane: "Eu ando — presente de andar, não gerúndio.", gloss: "Peça — 1.ª pess. de andar; cola em indo/vindo/voltando; ver ando, indo, vindo, voltando.", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "I walk", es: "yo ando" },\n' +
      '    indo: { tone: "craft", category: "Ciclo", mundane: "Gerúndio de ir — movimento para lá.", gloss: "Peça — gerúndio de ir; ver ando, indo, vindo, voltando.", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "going", es: "yendo" },\n' +
      '    vindo: { tone: "craft", category: "Ciclo", mundane: "Gerúndio de vir — movimento para cá.", gloss: "Peça — gerúndio de vir; ver ando, indo, vindo, voltando.", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "coming", es: "viniendo" },\n' +
      '    voltando: { tone: "craft", category: "Ciclo", mundane: "Gerúndio de voltar — a promessa de casa.", gloss: "Peça — gerúndio de voltar; ver ando, indo, vindo, voltando.", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "returning", es: "volviendo" },\n' +
      '    andando: { tone: "craft", category: "Ciclo", mundane: "Gerúndio de andar — variante da sequência.", gloss: "Variante — quatro gerúndios; o lema pede ando (eu ando); ver ando, indo, vindo, voltando.", href: "/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html", en: "walking", es: "andando" },\n' +
      '    "loop infinito": { tone: "caution", category: "Ciclo", mundane: "Repetição sem porta; while sem break.", gloss: "Expressão — processo sem saída; caso oral ando, indo, vindo, voltando; ≠ glifo ∞; antídoto exit; Valeu !!!", href: "/posts/post-inspecao-expressao-loop-infinito.html", en: "infinite loop", es: "bucle infinito", fr: "boucle infinie", it: "ciclo infinito", de: "Endlosschleife", el: "ατέρμων βρόχος", la: "circulus infinitus" },\n' +
      '    "laço infinito": { gloss: "Calco PT de loop infinito — ver ficha canónica.", href: "/posts/post-inspecao-expressao-loop-infinito.html", en: "infinite loop (calque)", es: "lazo infinito" },\n' +
      '    loop: { tone: "craft", category: "Ciclo", mundane: "Laço / volta que regressa; código, áudio, hábito.", gloss: "Loan EN — ciclo que regressa; o sem-saída fica em loop infinito; Valeu !!!", href: "/posts/post-inspecao-palavra-loop.html", en: "loop", es: "bucle / loop", fr: "boucle", it: "loop / ciclo", de: "Schleife", el: "βρόχος", la: "circulus" },\n';

    if (gloss.includes('"ando, indo, vindo, voltando"')) {
      console.log('Glossário: sequência já presente — a actualizar bloco');
    }
    if (!gloss.includes('"ando, indo, vindo, voltando"')) {
      const re = /(    "de pé": \{[\s\S]*?\},)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1\n' + block);
        console.log('Glossário: ciclo inserido após de pé');
      } else {
        const re2 = /(    "em pé": \{[\s\S]*?\},)/;
        if (re2.test(gloss)) {
          gloss = gloss.replace(re2, '$1\n' + block);
          console.log('Glossário: ciclo inserido após em pé');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    } else {
      const keys = [
        ['"ando, indo, vindo, voltando"', block.split('\n')[0] + ','],
      ];
      void keys;
    }
    fs.writeFileSync(glossPath, gloss);
  }

  try {
    await syncSqlAll(posts);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', seq.title, '· Cap.', seq.seriesOrder);
  console.log('OK:', inf.title, '· Cap.', inf.seriesOrder);
  console.log('OK:', word.title, '· Cap.', word.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
