'use strict';

/**
 * Inspeção Palavras · Orfeu
 * Eixos: nome / mitónimo · Ὀρφεύς (étimo incerto) · mito da lira ·
 * Orfeu da Conceição / Orfeu Negro · ≠ Morpheus / Morfeu (Matrix) ·
 * Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildOrfeuBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const jobim = '/posts/post-inspecao-figura-tom-jobim.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const radio = '/radio/';
  const teoriaCordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiOrfeu = 'https://pt.wiktionary.org/wiki/Orfeu';
  const wikiOrpheus = 'https://en.wiktionary.org/wiki/Orpheus';
  const wikiMyth = 'https://pt.wikipedia.org/wiki/Orfeu';
  const wikiMorpheus = 'https://en.wiktionary.org/wiki/Morpheus';
  const wikiMorfeu = 'https://pt.wikipedia.org/wiki/Morfeu';

  const body = `## Escopo

Inspeção editorial do **nome Orfeu** — antropónimo e mitónimo no português, via lat. *Orpheus*, via gr. **Ὀρφεύς** (*Orpheús*). Pedido de campo: relacionar com **Morpheus** de [The Matrix](${matrix}).

O lab fiche o **vocábulo**. Não reescreve a teogonia grega, nem duplica a ficha de [Tom Jobim](${jobim}) (*Orfeu da Conceição* / *Orfeu Negro*). O mito e o cinema BR entram como **camadas**. O Matrix entra como **contraste de ouvido** — não como o mesmo étimo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · Orfeu](${wikiOrfeu}), [Orpheus](${wikiOrpheus}), [Wikipédia · Orfeu](${wikiMyth}), [Morpheus](${wikiMorpheus}), [Morfeu](${wikiMorfeu}), ficha [The Matrix](${matrix}). **Ficha ≠ biografia de uma pessoa viva, nem manual de descer ao Hades.** Sem afiliação com Warner Bros. / Wachowski. **Não fundir Orfeu com Morpheus / Morfeu.**

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Orfeu** (nome próprio; mitónimo) |
| Classe | Antropónimo masculino no PT; forma culta do gr. Ὀρφεύς |
| Via | PT **Orfeu** ← lat. *Orpheus* ← gr. **Ὀρφεύς** |
| Tipo BudGanja | Palavra — nome × mito × ouvido Matrix |
| Elo pedido | [Morpheus / Matrix](${matrix}) — **cola de ouvido**, não de étimo |
| Elo BR | [Tom Jobim](${jobim}) — *Orfeu da Conceição* → *Orfeu Negro* (1959) |
| ≠ | **Morpheus** (Matrix) · **Morfeu** (Ovídio, μορφή) · *Orfeo* (ES/IT) · *Orphée* (FR / Cocteau) |
| Fonte | [Wikcionário · Orfeu](${wikiOrfeu}) |
| Data | ${inspected} |

**O que é o objeto:** o **nome**. Quem canta, quem desce, quem olha para trás — isso é **camada**. O veredicto desta ficha é lexical: **Orfeu ≠ Morpheus**.

## 2. Camadas — sem fundir

| Camada | Leitura | Confiança | Ofício |
|--------|---------|-----------|--------|
| **Nome PT** | Orfeu — forma portuguesa do mitónimo | Alta (uso) | Objecto desta ficha |
| **Gr. Ὀρφεύς** | Etimo **incerto**. Hipótese PIE *h₃órbʰos* (órfão) / eco de *ὀρφανός*; Fulgentius «melhor voz» = **improvável** | Média (debate) | Mapear dúvida; não fechar romance etimológico |
| **Mito** | Músico, lira, descida ao Hades por **Eurídice**, o olhar para trás | Alta (tradição) | Camada — não veredicto sobre pessoa viva |
| **BR** | Vinicius, *Orfeu da Conceição* → filme *Orfeu Negro* (1959); depois *Orfeu* (Cacá Diegues, 1999) | Alta | Elo em [Jobim](${jobim}) — **não** segunda biografia |
| **Morpheus / Matrix** | Personagem de Laurence Fishburne; acorda Neo; pílula; «o que é real?» | Alta (obra 1999) | **Contraste** — ver § 3 |
| **Morfeu (Ovídio)** | Gk. **Μορφεύς** ← **μορφή** *morphē* = forma / figura — o sonho que dá forma | Alta | Pai **onomástico** do Morpheus do filme; **não** pai de Orfeu |

**H1:** em PT, **Orfeu** é o nome do músico do mito — e, no Brasil, o nome que Vinicius pôs no morro.  
**H2:** o étimo grego de Ὀρφεύς fica **aberto**; o lab não adopta «órfão» nem «voz» como destino da ficha.  
**H3:** **Orfeu** e **Morpheus** colam no ouvido (*Orpheus / Morpheus*; em PT ainda *Orfeu / Morfeu*). O étimo **não cola**. Matrix mapeia melhor o **sonho que dá forma** (Ovídio) do que a lira de Eurídice.

## 3. Orfeu × Morpheus (Matrix)

Pedido explícito: relacionar com o Morpheus de [The Matrix](${matrix}) (1999, Wachowski). Laurence Fishburne chama-se **Morpheus** no filme — não Orfeu. O actor [Keanu Reeves](${keanu}) é Neo; fica em Pessoas, **secundário**.

| | **Orfeu** | **Morpheus** (Matrix) |
|--|-----------|------------------------|
| Grafia PT / EN | Orfeu / Orpheus | Morpheus (EN no filme); **Morfeu** no mito latino |
| Grego | **Ὀρφεύς** *Orpheús* | **Μορφεύς** *Morpheús* |
| Etimo | Incerto (não é *morphē*) | **μορφή** *morphē* = forma, figura |
| Ofício no relato | Cantar até o inferno ouvir; olhar para trás | Acordar o eleito; oferecer a pílula; perguntar o que é real |
| Ficha âncora | Esta (Palavras) | [The Matrix](${matrix}) (Artes) |
| Cola | Ouvido: *Or-feu* / *Mor-pheus* | Ouvido: o *M-* a mais muda o objecto |

**Veredicto cola:** o *M-* inicial não é enfeite. **Morpheus** herda **Morfeu** — o que *dá forma* ao sonho. **Orfeu** herda o músico que desce. Fundir os dois é erro de laboratório: soa parecido, **não é o mesmo nome**.

Eco temático **opcional** (não fundir enredos):

| Eco | Limite |
|-----|--------|
| Descida (Hades) × simulação (Matrix) | Analogia de **passagem** — não o mesmo mapa |
| Olhar para trás × tomar a pílula | Escolha de ver / não ver — [verdade](${verdade}) |
| Lira × despertar | Música move; inspeção **verifica** |
| [Alice](${alice}) (sonho / toca) | Outro buraco; outro método |

O laboratório **não** adopta a cosmologia do filme nem a teologia do Hades. Usa os dois como **parábolas de escolha** — e separa os nomes.

## 4. Distinções duras

| Isto | Não é isto |
|------|------------|
| **Orfeu** | **Morpheus** (Matrix) |
| **Orfeu** | **Morfeu** (deus do sonho, Ovídio) |
| **Orfeu** | *Orfeo* / *Orphée* (outras línguas / Cocteau) — mesmo mito, outra ficha se um dia existir |
| *Orfeu da Conceição* / *Orfeu Negro* | Enciclopédia do mito grego |
| [Jobim](${jobim}) | Esta ficha (Jobim é a **pessoa**; Orfeu é o **nome**) |
| Pílula vermelha / azul | Conselho farmacológico — metáfora de [escolha](${caminho}) |

## 5. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [The Matrix](${matrix}) | Morpheus no filme — contraste pedido |
| [Keanu Reeves](${keanu}) | Neo; elo Pessoas, não origem do nome Orfeu |
| [Tom Jobim](${jobim}) | *Orfeu da Conceição* / *Orfeu Negro* — elo BR |
| [Verdade](${verdade}) · [caminho](${caminho}) | Ver vs voltar atrás |
| [Alice](${alice}) | Sonho / toca — outro método |
| [Rádio](${radio}) · [Artes](${artes}) · [Pessoas](${pessoas}) | Mapa |
| [Teoria das cordas](${teoriaCordas}) | A física **emprestou** a lira (χορδή); o mito não prova supercorda |
| [Guia de palavras](${guia}) | Entrada **Orfeu** |
| [Valeu !!!](${mantra}) | Fecho |

## Status

**Aprovada** — Orfeu fichado como **nome**; mito e *Orfeu Negro* são camadas; **Morpheus do Matrix é primo do ouvido, não do étimo.** [Valeu !!!](${mantra})

[▶ Palavras](${hub}) · [▶ Matrix](${matrix}) · [▶ Jobim](${jobim}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **name Orfeu** (PT) / **Orpheus** — via Lat. *Orpheus*, Gk. **Ὀρφεύς**. Field request: relate it to **Morpheus** in [The Matrix](${matrix}).

This sheet inspects the **word**. It is not a myth encyclopedia and not a second [Jobim](${jobim}) biography (*Black Orpheus*). Matrix enters as an **ear contrast**, not the same etymon.

> Independent audit. Sources: [Wiktionary · Orpheus](${wikiOrpheus}), [Morpheus](${wikiMorpheus}), [The Matrix](${matrix}). **Do not merge Orfeu / Orpheus with Morpheus.**

## Object

| Field | Value |
|-------|-------|
| Word | **Orfeu** (PT given name / mythonym) |
| Path | PT Orfeu ← Lat. *Orpheus* ← Gk. **Ὀρφεύς** |
| Greek etymon | **Uncertain** (orphan hypothesis = not a verdict) |
| Requested link | [Matrix Morpheus](${matrix}) — **phonetic glue**, not etymon |
| ≠ | Morpheus (film) · Ovid’s Morpheus (*morphē* = form) · *Orfeo* / *Orphée* |

## Orfeu × Morpheus (Matrix)

| | **Orfeu / Orpheus** | **Morpheus** (Matrix) |
|--|---------------------|------------------------|
| Greek | **Ὀρφεύς** | **Μορφεύς** |
| Etymon | Uncertain — **not** *morphē* | **μορφή** *morphē* = form / shape |
| Role | Lyre; descent for Eurydice; looking back | Wakes Neo; the pill; “what is real?” |
| Sheet | This one (Words) | [The Matrix](${matrix}) (Arts) |

**Verdict:** the extra **M-** changes the object. Morpheus inherits Ovid’s dream-shaper. Orpheus inherits the musician who descends. They sound like cousins; they are **not** the same name.

Optional echo only (do not merge plots): underworld vs simulation; looking back vs taking the pill. The lab uses both as **choice parables**, not cosmologies.

## Status

**Approved** — Orfeu filed as a **name**; *Black Orpheus* is a layer; Matrix Morpheus is a cousin of the **ear**, not of the etymon. [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Matrix](${matrix}) · [▶ Jobim](${jobim})
`;

  const contentEs = `## Alcance

Inspección editorial del **nombre Orfeu** (PT) / **Orfeo** — vía lat. *Orpheus*, gr. **Ὀρφεύς**. Pedido de campo: relacionarlo con **Morpheus** de [The Matrix](${matrix}).

Esta ficha inspecciona la **palabra**. No es enciclopedia del mito ni segunda biografía de [Jobim](${jobim}) (*Orfeu Negro*). Matrix entra como **contraste de oído**, no como el mismo étimo.

> Auditoría independiente. Fuentes: [Wiktionary · Orpheus](${wikiOrpheus}), [Morpheus](${wikiMorpheus}), [The Matrix](${matrix}). **No fusionar Orfeu / Orfeo con Morpheus.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **Orfeu** (antropónimo / mitónimo PT) |
| Vía | PT Orfeu ← lat. *Orpheus* ← gr. **Ὀρφεύς** |
| Étimo griego | **Incerto** (hipótesis «huérfano» = no veredicto) |
| Vínculo pedido | [Morpheus / Matrix](${matrix}) — **pegamento de oído**, no de étimo |
| ≠ | Morpheus (filme) · Morfeo (Ovidio, *morphē* = forma) · *Orfeo* / *Orphée* |

## Orfeu × Morpheus (Matrix)

| | **Orfeu / Orfeo** | **Morpheus** (Matrix) |
|--|-------------------|------------------------|
| Griego | **Ὀρφεύς** | **Μορφεύς** |
| Étimo | Incerto — **no** es *morphē* | **μορφή** *morphē* = forma / figura |
| Oficio | Lira; descenso por Eurídice; mirar atrás | Despierta a Neo; la píldora; «¿qué es real?» |
| Ficha | Esta (Palabras) | [The Matrix](${matrix}) (Artes) |

**Veredicto:** la **M-** extra cambia el objeto. Morpheus hereda al dador de forma del sueño (Ovidio). Orfeo hereda al músico que desciende. Suenan primos; **no son el mismo nombre**.

Eco opcional (no fusionar tramas): inframundo × simulación; mirar atrás × tomar la píldora. El laboratorio usa ambos como **parábolas de elección**.

## Estado

**Aprobada** — Orfeu fichado como **nombre**; *Orfeu Negro* es capa; el Morpheus de Matrix es primo del **oído**, no del étimo. [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Matrix](${matrix}) · [▶ Jobim](${jobim})
`;

  return { body, contentEn, contentEs, wiki: wikiOrfeu };
}

function buildOrfeuPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildOrfeuBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 180;
  return makePalavra({
    title: 'Inspeção: Orfeu — o nome, a lira e o Morpheus que não é ele',
    titleEn: 'Inspection: Orfeu — the name, the lyre, and the Morpheus he is not',
    titleEs: 'Inspección: Orfeu — el nombre, la lira y el Morpheus que no es él',
    excerpt:
      'Palavras: «Orfeu» (gr. Ὀρφεύς, étimo incerto) — mito da lira e Eurídice; no BR, Orfeu da Conceição / Orfeu Negro; cola de ouvido com Morpheus do Matrix, não de étimo (Morfeu ← morphē); Valeu !!!',
    excerptEn:
      'Words: “Orfeu” / Orpheus (Gk. Ὀρφεύς, uncertain etymon) — lyre and Eurydice; in BR, Black Orpheus; ear-glue with Matrix Morpheus, not the same etymon (Morpheus ← morphē); Valeu !!!',
    excerptEs:
      'Palabras: «Orfeu» (gr. Ὀρφεύς, étimo incerto) — lira y Eurídice; en BR, Orfeu Negro; pegamento de oído con Morpheus de Matrix, no el mismo étimo (Morfeo ← morphē); ¡Valeu !!!',
    slug: 'inspecao-palavra-orfeu',
    date: '2026-08-22T05:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Orfeu · palavra',
    coverImage: '/imagens/inspecoes/orfeu-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOrfeuPost,
  buildOrfeuBodies
};
