'use strict';

/**
 * Inspeção Palavras · mitologia
 * Eixos: gr. mythos + lógos · ofício de contar os deuses · lema do hub /mitologia/ ·
 * ≠ teologia ≠ magia ≠ ídolo · Anúbis na sala do Egito · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mitologia-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/mitologia';
const WIKT_EN = 'https://en.wiktionary.org/wiki/mythology';
const WIKT_MYTHOS = 'https://en.wiktionary.org/wiki/%CE%BC%E1%BF%A6%CE%B8%CE%BF%CF%82#Ancient_Greek';
const WIKI = 'https://pt.wikipedia.org/wiki/Mitologia';

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
  return `Mitologia.
Não é o altar.
É o ofício de contar
o deus que o povo nomeou.

Mythos é o relato.
Lógos é o nome do saber.
Juntos, a palavra que o lab
põe no catálogo.

Há o chacal.
Há a lira.
Há a balança.
Há o céu que se nomeia.

Não é teologia inteira.
Não é magia solta.
É a sala onde o ofício
olha o que o mito faz.

Valeu !!!
com o deus certo
e sem culto de ficha.`;
}

function poemEn() {
  return `Mythology.
It is not the altar.
It is the craft of telling
the god a people named.

Mythos is the tale.
Lógos is the name of that knowing.
Together, the word the lab
puts in the catalog.

There is the jackal.
There is the lyre.
There is the scale.
There is the sky that gets named.

It is not all of theology.
It is not loose magic.
It is the room where craft
looks at what the myth does.

Valeu !!!
with the right god
and no cult of the sheet.`;
}

function poemEs() {
  return `Mitología.
No es el altar.
Es el oficio de contar
al dios que el pueblo nombró.

Mythos es el relato.
Lógos es el nombre de ese saber.
Juntos, la palabra que el lab
pone en el catálogo.

Hay el chacal.
Hay la lira.
Hay la balanza.
Hay el cielo que se nombra.

No es teología entera.
No es magia suelta.
Es la sala donde el oficio
mira lo que el mito hace.

¡Valeu !!!
con el dios cierto
y sin culto de ficha.`;
}

function buildMitologiaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-mitologia.html';
  const cat = '/mitologia/';
  const anubis = '/posts/post-inspecao-palavra-anubis.html';
  const orfeu = '/posts/post-inspecao-palavra-orfeu.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const diabo = '/posts/post-inspecao-palavra-diabo.html';
  const nectar = '/posts/post-inspecao-expressao-nectar-dos-deuses.html';
  const astrologia = '/guia/astrologia.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[mitologia](${self})** — gr. *mŷthos* («relato, fábula, o que se conta») + *lógos* («discurso / estudo»). Pedido de campo: *página dedicada a mitologia* + *inspeção em Anúbis, algum deus*.

Duas salas, um sopro. Esta ficha é o **lema**. A página dedicada é o catálogo **[Mitologia](${cat})**. O recorte de um deus (chacal, balança, Duat) cabe na irmã **[Anúbis](${anubis})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mitologia](${WIKT}), [mythology](${WIKT_EN}), gr. [*mŷthos*](${WIKT_MYTHOS}), [Wikipédia](${WIKI}). **Ficha ≠ tratado teológico, ≠ guia de magia, ≠ culto, ≠ enciclopédia de todos os panteões.** Série [Palavras](${hub}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *mitologia* / *mito* / *deuses* / *panteão* / *algum deus*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **mitologia** (PT) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | gr. μῦθος *mŷthos* «relato» + λόγος *lógos* — via lat. cient. *mythologia* — confiança: **alta** |
| Cognatos | esp. *mitología* · fr. *mythologie* · ing. *mythology* · it. *mitologia* |
| Tipo BudGanja | Palavra — lema do catálogo [Mitologia](${cat}) |
| Não é | teologia · magia · [ídolo](${idolo}) · [Deus](${deus}) (vocábulo latino) · [diabo](${diabo}) |
| Data | ${inspected} |
| Fonte | [mitologia](${WIKT}) |

**O que é o objecto:** o nome do **ofício de contar os deuses**. No lab, *mitologia* junta o relato que um povo nomeou com o método que o inspeciona. Sem [respeito](${respeito}) vira altar; com [ídolo](${idolo}), vira pedestal.

## 2. Mythos × mito × teologia × magia

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **mŷthos** | Relato grego | O que se conta; raiz desta palavra |
| **mitologia** | Estudo / sistema desses relatos | Esta ficha e o [hub](${cat}) |
| **mito** | Uma história pontual | Peça; não o sistema |
| **teologia** | Discurso sobre o divino (fé viva) | Vizinha; outra sala |
| **[Deus](${deus})** | Vocábulo latino (céu / Uno) | Palavra; não um deus do catálogo |
| **[ídolo](${idolo})** | Imagem / pessoa admirada | Altar possível; o lema recusa o culto da ficha |

**H1:** *mitologia* PT = *mŷthos* + *lógos* — alta.  
**H2:** no BudGanja, o lema abre o [catálogo](${cat}), não um templo.  
**H3:** «algum deus» no pedido de campo é o recorte: inspecionar **um** nome (hoje [Anúbis](${anubis})), não fundir todos os panteões.

## 3. Sopro de campo — as salas

| Sopro | Sala |
|-------|------|
| **mitologia** (lema) | Esta ficha |
| **[Mitologia](${cat})** (página) | Catálogo dedicado — Egito, Grécia, léxico, céu |
| **[Anúbis](${anubis})** | Primeiro deus — jnpw / chacal / balança |
| **[Orfeu](${orfeu})** | Mitónimo grego — lira; ≠ Morpheus |
| **[néctar dos deuses](${nectar})** | Expressão — mito × hipérbole de gosto |
| **[Deus](${deus})** | Vocábulo latino — **não** fundir com Anúbis |
| **[Astrologia](${astrologia})** | Céu nomeado × céu visto — sala irmã, não o mesmo ofício |

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Mitologia = religião = magia | Ofício de contar e inspecionar relatos |
| **Altar** | Fichar um deus = adorá-lo | [Respeito](${respeito}) ao nome; [ídolo](${idolo}) noutra sala |
| **Panteão único** | Todos os deuses são o mesmo | Cada nome tem ficha; hoje [Anúbis](${anubis}) |
| **Céu** | Mitologia = horóscopo | [Astrologia](${astrologia}) é o céu nomeado; esta sala é o relato |

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *mitologia* como ofício e apontar o deus certo |
| Bom | Mandar Anúbis para [Anúbis](${anubis}), o céu para [Astrologia](${astrologia}) |
| Bom | Distinguir [Deus](${deus}) (vocábulo) de «um deus» (figura de relato) |
| Mau | Culto da ficha no lugar do lema |
| Mau | Tutorial de invocação disfarçado de vocábulo |
| Mau | Fundir Egito, Grécia e teologia cristã num só altar |

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=mitologia)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mitologia](${cat}) | Página dedicada — o catálogo |
| [Anúbis](${anubis}) | Fundadora de deus; jnpw / chacal |
| [Orfeu](${orfeu}) · [néctar dos deuses](${nectar}) | Grécia já fichada |
| [Deus](${deus}) · [ídolo](${idolo}) · [diabo](${diabo}) | Léxico — salas cortadas |
| [Astrologia](${astrologia}) | Céu — sala irmã |
| [Verdade](${verdade}) · [caminho](${caminho}) · [língua](${lingua}) · [respeito](${respeito}) | Ofício |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é história das religiões nem egiptologia completa.  
- Não endossa culto, magia ou invocação.  
- Anúbis não se inspeciona aqui — vai à [Anúbis](${anubis}).  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **mitologia** fichada como *mŷthos* + *lógos*; lema do catálogo [Mitologia](${cat}); salas cortadas (teologia, magia, ídolo, vocábulo Deus). Primeiro deus: [Anúbis](${anubis}). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Catálogo](${cat}) · [▶ Anúbis](${anubis}) · [▶ Poema Vida](/vida/#poema=mitologia) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **mitologia** — Gr. *mŷthos* + *lógos*. Field request: a **dedicated mythology page** plus an inspection of **Anubis, some god**.

This sheet is the **lemma**. The dedicated page is the **[Mitologia](${cat})** catalog. The jackal-god (scale, Duat) belongs on **[Anúbis](${anubis})**.

Not a temple. Not magic. Not [Deus](${deus}) (the Latin word). Sister sky: [astrology](${astrologia}).

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Lemma of [Mitologia](${cat}). First god: [Anúbis](${anubis}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **mitologia** — gr. *mŷthos* + *lógos*. Pedido: una **página dedicada a mitología** e inspección de **Anubis, algún dios**.

Esta ficha es el **lema**. La página dedicada es el catálogo **[Mitologia](${cat})**. El dios chacal (balanza, Duat) va a **[Anúbis](${anubis})**.

No es templo. No es magia. No es [Deus](${deus}) (el vocablo latino). Cielo hermano: [astrología](${astrologia}).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Lema de [Mitologia](${cat}). Primer dios: [Anúbis](${anubis}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMitologiaPost() {
  const { body, contentEn, contentEs } = buildMitologiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-mitologia', 312);
  return makePalavra({
    title: 'Inspeção: Mitologia — mŷthos + lógos; lema do catálogo; ≠ teologia ≠ magia',
    titleEn: 'Inspection: Mitologia — mŷthos + lógos; catalog lemma; ≠ theology ≠ magic',
    titleEs: 'Inspección: Mitologia — mŷthos + lógos; lema del catálogo; ≠ teología ≠ magia',
    excerpt:
      'Palavras: mitologia (mŷthos + lógos) — ofício de contar os deuses; lema de /mitologia/; Anúbis noutra sala; Valeu !!!',
    excerptEn:
      'Words: mitologia (mŷthos + lógos) — craft of telling the gods; lemma of /mitologia/; Anubis in another room; Valeu !!!',
    excerptEs:
      'Palabras: mitologia (mŷthos + lógos) — oficio de contar a los dioses; lema de /mitologia/; Anubis en otra sala; ¡Valeu !!!',
    slug: 'inspecao-palavra-mitologia',
    date: '2026-08-24T13:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Mitologia · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMitologiaPost,
  buildMitologiaBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  COVER
};
