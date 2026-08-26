'use strict';

/**
 * Inspeção Palavras · tecnologia
 * Eixos: gr. tékhnē + lógos · ofício dos aparelhos · lema do hub /tecnologia/ ·
 * ≠ técnica ≠ ciência ≠ ídolo · HD escravo na sala de hardware · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/tecnologia-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/tecnologia';
const WIKT_EN = 'https://en.wiktionary.org/wiki/technology';
const WIKT_TEKHNE = 'https://en.wiktionary.org/wiki/%CF%84%CE%AD%CF%87%CE%BD%CE%B7#Ancient_Greek';
const WIKI = 'https://pt.wikipedia.org/wiki/Tecnologia';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Tecnologia.
Não é o ídolo da caixa.
É o ofício do aparelho
e do método que o faz andar.

Tékhnē é a mão que sabe.
Lógos é o nome do saber.
Juntos, a palavra que o lab
põe no catálogo.

Há o disco.
Há a linha.
Há o script.
Há o gesto de ligar.

Não é ciência inteira.
Não é técnica solta.
É a sala onde o ofício
olha o que a máquina faz.

Valeu !!!
com o aparelho certo
e sem culto de marca.`;
}

function poemEn() {
  return `Technology.
It is not the idol of the box.
It is the craft of the device
and of the method that makes it run.

Tékhnē is the hand that knows.
Lógos is the name of that knowing.
Together, the word the lab
puts in the catalog.

There is the disk.
There is the line.
There is the script.
There is the gesture of switching on.

It is not all of science.
It is not a loose technique.
It is the room where craft
looks at what the machine does.

Valeu !!!
with the right device
and no brand cult.`;
}

function poemEs() {
  return `Tecnología.
No es el ídolo de la caja.
Es el oficio del aparato
y del método que lo hace andar.

Tékhnē es la mano que sabe.
Lógos es el nombre de ese saber.
Juntos, la palabra que el lab
pone en el catálogo.

Hay el disco.
Hay la línea.
Hay el script.
Hay el gesto de encender.

No es ciencia entera.
No es técnica suelta.
Es la sala donde el oficio
mira lo que la máquina hace.

¡Valeu !!!
con el aparato cierto
y sin culto de marca.`;
}

function buildTecnologiaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-tecnologia.html';
  const cat = '/tecnologia/';
  const hd = '/posts/post-inspecao-palavra-hd-escravo.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const objetosHub = '/objetos/';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const jobs = '/posts/post-inspecao-palavra-jobs.html';
  const steve = '/posts/post-inspecao-figura-steve-jobs.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const profanar = '/posts/post-inspecao-palavra-profanar.html';

  const body = `## Escopo

Inspeção editorial da palavra **[tecnologia](${self})** — gr. *tékhnē* («arte, ofício, saber-fazer») + *lógos* («discurso / estudo»). Pedido de campo: *inspeção em HD slayr escravo tecnologia* + *página dedicada a tecnologia*.

Duas salas, um sopro. Esta ficha é o **lema**. A página dedicada é o catálogo **[Tecnologia](${cat})**. O recorte de hardware (disco rígido, jumper ATA, smash *slayr*) cabe na irmã **[HD escravo](${hd})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · tecnologia](${WIKT}), [technology](${WIKT_EN}), gr. [*tékhnē*](${WIKT_TEKHNE}), [Wikipédia](${WIKI}). **Ficha ≠ história da informática, ≠ catálogo de marcas, ≠ culto de gadget.** Série [Palavras](${hub}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *tecnologia* / *tech* / *alta tecnologia* / *escravo da tecnologia* (metáfora — cortar).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **tecnologia** (PT) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | gr. τέχνη *tékhnē* «ofício / saber-fazer» + λόγος *lógos* — via lat. cient. *technologia* — confiança: **alta** |
| Cognatos | esp. *tecnología* · fr. *technologie* · ing. *technology* · it. *tecnologia* |
| Tipo BudGanja | Palavra — lema do catálogo [Tecnologia](${cat}) |
| Não é | [técnica](${skill}) solta · ciência inteira · [ídolo](${idolo}) de marca · [escravidão](${escravidao}) |
| Data | ${inspected} |
| Fonte | [tecnologia](${WIKT}) |

**O que é o objecto:** o nome do **ofício dos aparelhos e métodos**. No lab, *tecnologia* junta o que a mão sabe fazer com o que a máquina executa. Sem [objecto](${objetos}) claro, vira névoa de catálogo; com [ídolo](${idolo}), vira altar.

## 2. Tékhnē × técnica × ciência × skill

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **tékhnē** | Saber-fazer grego | Mão + método; raiz desta palavra |
| **tecnologia** | Estudo / sistema desse ofício | Esta ficha e o [hub](${cat}) |
| **técnica** | Procedimento pontual | Peça; não o sistema |
| **ciência** | Método de conhecer | Vizinha; não sinónimo |
| **[skill](${skill})** | Habilidade treinável (germânico) | Prima de oficina; outra árvore |
| **[objetos](${objetos})** | O que fica diante | A coisa; tecnologia é o ofício sobre a coisa |

**H1:** *tecnologia* PT = *tékhnē* + *lógos* — alta.  
**H2:** no BudGanja, o lema abre o [catálogo](${cat}), não um culto.  
**H3:** «escravo da tecnologia» é metáfora frouxa — a sala da [escravidão](${escravidao}) é outra; o jumper ATA é a [HD escravo](${hd}).

## 3. Sopro de campo — as salas

| Sopro | Sala |
|-------|------|
| **tecnologia** (lema) | Esta ficha |
| **[Tecnologia](${cat})** (página) | Catálogo dedicado — hardware, rede, software, pessoas |
| **[HD escravo](${hd})** | Jumper ATA / smash *slayr* — hardware |
| **«escravo da tecnologia»** | Metáfora de hábito — **não** fundir com [escravidão](${escravidao}) nem com o jumper |
| **alta tecnologia do filho** | Eco do conto Vida (Dona Maria) — equilíbrio terra × aparelho |
| **[Jobs](${jobs}) / [Steve Jobs](${steve})** | Pessoa e vocábulo — ídolo × ofício |
| **[celular](${celular})** | Aparelho quotidiano e risco |

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Tecnologia = telemóvel = progresso | Ofício de aparelhos e métodos |
| **Marca** | Tecnologia = Apple / Xiaomi | Marcas têm fichas; o lema não é altar |
| **Metáfora** | «Escravo da tecnologia» = diagnóstico | Cola perigosa; cortar as salas |
| **Objectos** | Tecnologia = pilha de coisas | [Objetos](${objetosHub}) é o catálogo da *coisa*; este é o do *ofício* |

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *tecnologia* como ofício e apontar o aparelho certo |
| Bom | Mandar hardware para [HD escravo](${hd}), objectos para [Objetos](${objetosHub}) |
| Bom | [Ligar / desligar](${ligar}) e [interruptor](${interruptor}) como gestos, não como moral |
| Mau | Culto de marca no lugar do lema |
| Mau | Fundir metáfora «escravo da tech» com [escravidão](${escravidao}) |
| Mau | Tutorial de montagem disfarçado de vocábulo |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=tecnologia)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tecnologia](${cat}) | Página dedicada — o catálogo |
| [HD escravo](${hd}) | Fundadora de hardware; smash *slayr* |
| [Objetos](${objetos}) · [hub Objetos](${objetosHub}) | A coisa diante; outro catálogo |
| [Skill](${skill}) | Prima germânica do saber-fazer |
| [Jobs](${jobs}) · [Steve Jobs](${steve}) · [ídolo](${idolo}) | Pessoa × culto |
| [Celular](${celular}) · [interruptor](${interruptor}) · [ligar](${ligar}) | Aparelhos e gestos |
| [Escravidão](${escravidao}) | Sala humana — não fundir |
| [Verdade](${verdade}) · [gesto](${gesto}) · [caminho](${caminho}) · [língua](${lingua}) | Ofício |
| [Profanar](${profanar}) | Cluster *pro-*: programação (*grámma*) ≠ profanar (*fānum*); esta ficha é o lema da *tékhnē* |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é história da revolução industrial nem da informática.  
- Não endossa marca.  
- O jumper ATA não se inspeciona aqui — vai à [HD escravo](${hd}).  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **tecnologia** fichada como *tékhnē* + *lógos*; lema do catálogo [Tecnologia](${cat}); salas cortadas (técnica, ciência, ídolo, escravidão, jumper). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Catálogo](${cat}) · [▶ HD escravo](${hd}) · [▶ Poema Vida](/vida/#poema=tecnologia) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **tecnologia** — Gr. *tékhnē* + *lógos*. Field request: *HD slayr escravo tecnologia* plus a **dedicated technology page**.

This sheet is the **lemma**. The dedicated page is the **[Tecnologia](${cat})** catalog. Hard-disk jumper jargon (*slayr* → slave) belongs on **[HD escravo](${hd})**.

Not a brand altar. Not [slavery](${escravidao}). Sister catalog: [objects](${objetosHub}).

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Lemma of [Tecnologia](${cat}). Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **tecnologia** — gr. *tékhnē* + *lógos*. Pedido: *HD slayr escravo tecnologia* y una **página dedicada a tecnología**.

Esta ficha es el **lema**. La página dedicada es el catálogo **[Tecnologia](${cat})**. El jargón del jumper ATA (*slayr* → slave) va a **[HD escravo](${hd})**.

No es altar de marca. No es [esclavitud](${escravidao}). Catálogo hermano: [objetos](${objetosHub}).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Lema de [Tecnologia](${cat}). Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildTecnologiaPost() {
  const { body, contentEn, contentEs } = buildTecnologiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-tecnologia', 310);
  return makePalavra({
    title: 'Inspeção: Tecnologia — tékhnē + lógos; lema do catálogo; ≠ ídolo ≠ escravidão',
    titleEn: 'Inspection: Tecnologia — tékhnē + lógos; catalog lemma; ≠ idol ≠ slavery',
    titleEs: 'Inspección: Tecnologia — tékhnē + lógos; lema del catálogo; ≠ ídolo ≠ esclavitud',
    excerpt:
      'Palavras: tecnologia (tékhnē + lógos) — ofício dos aparelhos; lema de /tecnologia/; HD escravo noutra sala; Valeu !!!',
    excerptEn:
      'Words: tecnologia (tékhnē + lógos) — craft of devices; lemma of /tecnologia/; HD slave in another room; Valeu !!!',
    excerptEs:
      'Palabras: tecnologia (tékhnē + lógos) — oficio de aparatos; lema de /tecnologia/; HD esclavo en otra sala; ¡Valeu !!!',
    slug: 'inspecao-palavra-tecnologia',
    date: '2026-08-24T12:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Tecnologia · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTecnologiaPost,
  buildTecnologiaBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  COVER
};
