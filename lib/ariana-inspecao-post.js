'use strict';

/**
 * Inspeção Palavras · Ariana / Áries
 * Primeiro signo · lat. ariēs (carneiro) · nativos ariano/ariana
 * Corte: ≠ ariano racial (sânsc. ārya)
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ariana-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/ariano';
const WIKI_ARIES = 'https://pt.wiktionary.org/wiki/%C3%81ries';
const WIKI_SIGN = 'https://pt.wikipedia.org/wiki/%C3%81ries_(astrologia)';
const WIKI_LAT = 'https://en.wiktionary.org/wiki/aries#Latin';
const HUB = '/guia/astrologia.html';

function buildArianaBodies() {
  const inspected = '2026-08-24';
  const hubPal = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-ariana.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const lua = '/posts/post-inspecao-palavra-lua.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const alivio = '/posts/post-inspecao-palavra-alivio.html';

  const body = `## Escopo

Inspeção editorial da palavra **[ariana](${self})** e da família **Áries**. Pedido de campo: *inspeção em arianos* — *arianos é o primeiro dos signos?* **Sim:** no zodíaco tropical, **Áries** é o **primeiro** signo (~21 mar. – 20 abr., equinócio de março). A nativa chama-se **ariana**; o nativo, **ariano**; o plural pedido, **arianos**. Página-mãe: **[Astrologia](${HUB})**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ariano](${WIKI}), [Áries](${WIKI_ARIES}), lat. [*ariēs*](${WIKI_LAT}), [Wikipédia · Áries (astrologia)](${WIKI_SIGN}). **Ficha ≠ horóscopo, ≠ mapa natal, ≠ laudo de carácter, ≠ conselho médico.** Sem afiliação a app de signos. Tom: [verdade](${verdade}) do nome, não do destino.

**Gatilho:** *arianos* / *ariana* / *ariano* / *aries* / *áries* / *carneiro* (signo) → lema **ariana** (destaque) + **Áries** (objecto celeste).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Lema destaque | **ariana** (f.) · **ariano** (m.) · plural **arianos** / **arianas** |
| Signo | **Áries** (BR) · **Carneiro** (PT-EU) · lat./ing. **Aries** |
| Classe | Gentílico astrológico (ariana/ariano) · nome próprio do 1.º signo (Áries) |
| Étimo (signo) | Lat. *ariēs, arietis* «carneiro» — confiança: **alta** |
| Ordem | **1.º** do zodíaco tropical — entre Peixes e Touro |
| Tipo BudGanja | Palavra — primeiro signo × nativo × derivações × corte racial |
| Elo céu | **[Astrologia](${HUB})** · [sol](${sol}) · [lua](${lua}) · [luz](${luz}) · [gêmeos](${gemeos}) (3.º) |
| Fonte | [ariano](${WIKI}) · [Áries](${WIKI_ARIES}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo de quem nasce sob o **carneiro que abre o ano tropical** — e o próprio nome do signo. Não é previsão. Não é o homógrafo racial.

## 2. Hipóteses e método

**H1:** **Áries é o primeiro** dos doze no zodíaco tropical (equinócio de março). Pedido *arianos é o primeiro dos signos?* — **sim**, como nativos do 1.º.  
**H2:** *ariana* / *ariano* derivam do signo, não do sânscrito *ārya*.  
**H3:** **ariete**, **arietino**, **Carneiro** (PT-EU) e **Mu de Áries** (desenho) são **outras salas** da mesma raiz *ariēs*, ou cultura.  
**H4:** o homógrafo **ariano** (racial) é **família distinta** — o laboratório corta, não funde.  
**H5:** horóscopo ≠ [verdade](${verdade}) do [gesto](${gesto}). Fecho: [Valeu !!!](${mantra}).

Passos: étimo → ordem do ciclo → derivações → cortes → [Astrologia](${HUB}).

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *ariēs* | Carneiro, macho da ovelha; também máquina de arrombar (ariete) | Alta |
| Signo / constelação | O carneiro no céu; 1.º do ciclo tropical | Alta |
| Nativo *ariano/ariana* | Gentílico do signo (como *leonino*, *pisciano*) | Alta |
| Grafia Áries | BR; acento marca o nome do signo | Alta (uso vivo) |
| Carneiro (PT-EU) | Nome europeu do mesmo signo | Alta |
| Sânsc. *ārya* | «Nobre» → *Aryan* / ariano racial — **outro étimo** | Alta (corte) |

**Veredicto etimológico:** o signo e os nativos vêm de **ariēs**. O homógrafo racial **não**.

## 4. Derivações (mapa)

| Forma | Sala | Nota BudGanja |
|-------|------|----------------|
| **Áries** / Aries | Signo · constelação | Objecto celeste; 1.º |
| **ariana** / ariano | Nativo | Destaque do pedido |
| arianos / arianas | Plural | «Inspeção em arianos» |
| Carneiro | PT-EU do signo · animal | Duas salas: nome vs bicho |
| ariete | Máquina / futebol | Cabeça de carneiro que investe |
| arietino | Adjectivo | Forma de chifre |
| Mu de Áries | [Cavaleiros do Zodíaco](${HUB}#ceu) | 1.ª casa de ouro — desenho, não laudo |
| Ariana (antropónimo) | Nome próprio | Pode vir do signo **ou** de outras vias (Ariadne / Ásia antiga) — não fundir à força |
| ariano (racial) | **Corte** | Sânsc. *ārya* — ficha **não** desenvolve ideologia |

## 5. Primeiro signo ≠ destino

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Arianos é o primeiro dos signos?» | **Sim** — nativos de **Áries**, o 1.º tropical |
| «Sou de Áries, logo sou…» | Horóscopo ≠ [verdade](${verdade}) do feito |
| «Ariano = raça» | Homógrafo. Étimo do signo = *ariēs*; o outro = *ārya* |
| «A primeira casa dos Cavaleiros prova o horóscopo» | O desenho **usa** a ordem do zodíaco; não verifica carácter |
| «Carneiro (animal) é o signo» | O animal é outro ofício; o PT-EU empresta o nome |

O [sol](${sol}) mede o equinócio; a [luz](${luz}) acende no quarto. Nenhuma das duas emite mapa natal.

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Astrologia](${HUB})** | Página dedicada — visor do céu, 12 signos, Google Sky |
| [gêmeos](${gemeos}) | 3.º signo já fichado (*geminus* ≠ *genius*) |
| [sol](${sol}) · [lua](${lua}) · [luz](${luz}) | Astro e claridade — sem horóscopo |
| [língua portuguesa](${lingua}) · [Guia de Palavras](/guia/palavras.html) | Catálogo |
| [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) | Ofício nesta mão |
| [alívio](${alivio}) | O sopro do pedido («que alívio») — outra ficha |

## 7. Limites

- Não é coluna astrológica nem cálculo de carta natal.  
- Não inventaria os 12 deuses, casas ou aspectos.  
- Não desenvolve o lemma racial além do **corte**.  
- Cavaleiros do Zodíaco: sala cultural na [página de Astrologia](${HUB}); não é esta ficha de palavra.

## Status

**Aprovado** — **ariana** / **Áries** fichados: 1.º signo tropical; nativos ariano/ariana/arianos; derivações (ariete, Carneiro, Mu); corte *ārya*; página [Astrologia](${HUB}).

[▶ Astrologia](${HUB}) · [▶ Gêmeos](${gemeos}) · [▶ Luz](${luz}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ariana** / **Áries**. Field request: *is Aries the first sign?* **Yes** — tropical zodiac starts at the March equinox. Natives: **ariano** (m.) / **ariana** (f.). Hub: **[Astrology](${HUB})**. Word sheet ≠ horoscope. Cut: racial homograph *ariano* (Skt. *ārya*) is **another etymon**.

## Object

| Field | Value |
|-------|-------|
| Word | **ariana** / **ariano** · sign **Áries** (Lat. *ariēs*, ram) |
| Order | **1st** tropical sign |
| Date | ${inspected} |

**Approved** — first sign named; derivations mapped; racial homograph cut.

[▶ Astrology](${HUB}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ariana** / **Áries**. ¿Es Aries el primer signo? **Sí** — el zodiaco tropical abre en el equinoccio de marzo. Nativos: **ariano** / **ariana**. Hub: **[Astrología](${HUB})**. Ficha ≠ horóscopo. Corte: el homógrafo racial (*ārya*) es **otro étimo**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **ariana** / **ariano** · signo **Áries** (lat. *ariēs*) |
| Orden | **1.º** signo tropical |
| Fecha | ${inspected} |

**Aprobada** — primer signo nombrado; derivaciones; corte racial.

[▶ Astrología](${HUB}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildArianaPost() {
  const { body, contentEn, contentEs, wiki } = buildArianaBodies();
  let seriesOrder = 292;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-ariana');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.filter((p) => p.series === 'palavras-origem').map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      const max = taken.size ? Math.max(...taken) : 291;
      seriesOrder = max + 1;
    }
  } catch (_) {
    /* keep 292 */
  }

  return makePalavra({
    title: 'Inspeção: Ariana — Áries, o primeiro signo e as derivações',
    titleEn: 'Inspection: Ariana — Aries, the first sign, and the derivations',
    titleEs: 'Inspección: Ariana — Aries, el primer signo y las derivaciones',
    excerpt:
      'Palavras: «ariana» / ariano / Áries — 1.º signo (lat. ariēs); ≠ horóscopo; ≠ ariano racial; página Astrologia; Valeu !!!',
    excerptEn:
      'Words: “ariana” / Aries — 1st tropical sign (Lat. ariēs); ≠ horoscope; ≠ racial homograph; Astrology hub; Valeu !!!',
    excerptEs:
      'Palabras: «ariana» / Áries — 1.º signo (lat. ariēs); ≠ horóscopo; ≠ homógrafo racial; hub Astrología; ¡Valeu !!!',
    slug: 'inspecao-palavra-ariana',
    date: '2026-08-24T12:22:00.000Z',
    seriesOrder,
    seriesLabel: 'Ariana · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildArianaPost,
  buildArianaBodies,
  HUB
};
