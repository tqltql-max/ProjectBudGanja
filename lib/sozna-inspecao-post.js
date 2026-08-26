'use strict';

/**
 * Inspeção Palavras · sozinho / sozinha / sozna
 * Eixos: lat. sōlus · só + -zinho/-zinha · forma oral sozna ·
 * ≠ solitário · medo · caminho · Vida · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSoznaBodies() {
  const inspected = '2026-08-17';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const solitario = '/posts/post-inspecao-palavra-solitario.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/sozinho';
  const wikiFem = 'https://pt.wiktionary.org/wiki/sozinha';
  const wikiSo = 'https://pt.wiktionary.org/wiki/s%C3%B3';
  const wikiLat = 'https://en.wiktionary.org/wiki/solus#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **sozinho** — o lemma do estado **só** — com o feminino **sozinha** e a forma oral **sozna** (como a palavra chega no teclado, rápida ou sem mapa). No mapa BudGanja: estar **só** não é falha de carácter; é um **estado** (corpo, ofício, noite). Distinto de [solitário](${solitario}) (ficha Tamara / gelo). Esta ficha cobre o **étimo** (lat. *sōlus* → PT *só* + *-zinho/-zinha*), o **par sozinho / sozinha**, a **oralidade sozna** e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sozinho](${wiki}), [sozinha](${wikiFem}), [só](${wikiSo}), [sōlus (EN)](${wikiLat}), [solitário](${solitario}), série [Palavras](${hub}). **Ficha ≠ terapia nem julgamento de quem está só.** Tom: Inspetor BudGanja — sozinho / sozna com ofício ≠ romantizar o buraco.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sozinho** (lemma) · **sozinha** (fem.) · **sozna** (forma oral / teclado) |
| Classe | Adjectivo (também advérbio de modo: «fui sozinho», «fui sozinha») |
| Género | **Sozinho** = masculino; **sozinha** = feminino — a ficha inspeciona **os dois** |
| Étimo (trabalho) | Lat. *sōlus* («só, único») → PT *só* + diminutivo *-zinho/-zinha* — confiança: **alta** |
| Família | *só* · *sozinho* · *sozinha* · *sozidinho* · *a sós* · *solidão* |
| Cognatos | esp. *solo / sola* · fr. *seul / seule* · it. *solo / sola* · ing. *alone* · lat. *solus* |
| Tipo BudGanja | Palavra — estado × género × oralidade × ofício |
| Elo gelo | [solitário](${solitario}) — invernar sozinho / sozinha com método (Tamara) |
| Elo vivo | [medo](${medo}) · [alma](${alma}) · [mãe](${mae}) · [gesto](${gesto}) |
| Elo ofício | [verdade](${verdade}) · [caminho](${caminho}) · [risco](${risco}) · [cultivo](${cultivo}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · sozinho](${wiki}) · [sozinha](${wikiFem}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do estado **sem companhia imediata**. **Sozinho** é a forma de dicionário (masc.). **Sozinha** é o par feminino. **Sozna** é o rasto oral — a mesma palavra sem o *i*, como quem fala. No lab: uma semente também fica quieta; **ninguém cultiva sozinho** no mapa Vida — mas o ofício começa, muitas vezes, *sozinho* / *sozna*.

## 2. Sozinho × sozinha × sozna × solitário

| Papel | Forma | Leitura |
|-------|-------|---------|
| **Lemma** | **sozinho** | Forma dicionarizada (masc.) — objecto central desta ficha |
| **Par** | **sozinha** | Mesmo étimo; feminino — inspecionado, não nota de rodapé |
| **Oral / teclado** | **sozna** | Como a palavra chega — não é erro a envergonhar |
| **Ficha irmã** | [solitário](${solitario}) | Mais literário / gelo Tamara; método, não romance |

**Tese:** *sozinho* é o lemma; *sozinha* é o par; *sozna* é rasto oral. Inspeciona-se o trio; não se ri de quem escreveu *sozna*.

## 3. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Presença** | Sem outra pessoa no quarto / no ofício | Alta |
| **Diminutivo** | *-zinha* amacia o *só* — às vezes carinho, às vezes medo | Alta |
| **Oral BR** | *sozna* · *sozinh* · «tô sozinho nisso» · «tô sozinha nisso» | Alta (uso) |
| **Afecto** | [Medo](${medo}), orgulho, cansaço, «sou ruim nisso» | Alta |
| **Ofício lab** | Começar o gesto mesmo só; pedir mapa sem vergonha | Lab |
| **Vida** | «Ninguém cultiva sozinho» — a ficha não contradiz: o *nós* existe; o *só* também | Lab |

**H1:** *sozinho / sozinha* < *só* + *-zinho/-zinha* < lat. *sōlus* (alta confiança).  
**H2:** *sozna* = forma oral da mesma palavra — objecto válido da série.  
**H3:** [solitário](${solitario}) é irmã, não sinónimo: gelo/método × estado do dia-a-dia.

## 4. Distinções úteis

| Par | Diferença |
|-----|-----------|
| **sozinho / sozinha / sozna** vs **[solitário](${solitario})** | Estado quotidiano / teclado × ficha Tamara (invernar com método) |
| **sozinho / sozinha** vs **solidão** | Adjectivo/estado × substantivo (o nome do vazio) |
| **sozinho** vs **[medo](${medo})** | Estar só × o afecto que às vezes vem com o só |
| **sozinho** vs **[caminho](${caminho})** | Quem anda × a rota (pode-se andar sozinho no caminho certo) |
| **sozinho** vs **[juntos](/posts/post-inspecao-palavra-juntos.html)** | Estado só × estado junto; os [elos](/posts/post-inspecao-expressao-elo-de-ligacao.html) seguram o *nós* |

## 5. Rede BudGanja

| Elo | Papel |
|-----|-------|
| [Solitário](${solitario}) | Irmã — sozinha com método no gelo |
| [Medo](${medo}) · [Risco](${risco}) | O só pode apertar; o mapa reduz pânico |
| [Caminho](${caminho}) · [Gesto](${gesto}) | Ofício mesmo sem plateia |
| [Verdade](${verdade}) · [Alma](${alma}) | Dizer «estou sozinho» / «estou sozna» sem teatro |
| [Mãe](${mae}) · [Vida](${vida}) | Cuidado: ninguém fica no buraco sem nome |
| [Língua portuguesa](${lingua}) | Oralidade é dado, não defeito |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | O melhor **hoje** — inclusive pedir ajuda |

## 6. Valeu !!!

| Campo | Valor |
|-------|-------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, inclusive *sozinho* / *sozna* (um clique, um mapa, um «não sei») |
| Veredicto | Sozinho sem [verdade](${verdade}) = buraco; sozinho com ofício = [caminho](${caminho}) com uma pessoa só, sem vergonha. |

**H4:** fecho = [Valeu !!!](${mantra}) — honrar o só sem romantizar nem abandonar quem escreveu *sozna*.

## Estado

**Aprovado** — **sozinho** fichado; **sozinha** como par; **sozna** como forma oral; irmã de [solitário](${solitario}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Solitário](${solitario}) · [▶ Medo](${medo}) · [▶ Caminho](${caminho}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sozinho** (alone, masculine lemma), feminine **sozinha**, and the oral/typed form **sozna**. Everyday “alone” — not a character flaw. Distinct from [solitário](${solitario}) (Tamara / ice, method).

> Sources: [sozinho](${wiki}), [sozinha](${wikiFem}), [só](${wikiSo}), [sōlus](${wikiLat}). Not therapy. Not shame for the spelling.

## Sozinho × sozinha × sozna × solitário

| Role | Form |
|------|------|
| Dictionary lemma | **sozinho** |
| Feminine pair | **sozinha** — inspected, not a footnote |
| Oral / keyboard | **sozna** — same word, no *i* |
| Sister sheet | [solitário](${solitario}) |

**Thesis:** *sozinho* is the lemma; *sozna* is a valid oral trace, not a joke.

## Etymon

Lat. *sōlus* → PT *só* + diminutive *-zinho / -zinha* — high confidence.

## Valeu !!!

Best **today** — including asking for a map while alone. Alone without [truth](${verdade}) = hole; with craft = [path](${caminho}) for one person, without shame.

## Status

**Approved** — sozinho + sozinha + oral sozna; sister of [solitário](${solitario}).

[▶ Words](${hub}) · [▶ Solitário](${solitario}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sozinho** (solo, lema masculino), el femenino **sozinha** y la forma oral **sozna**. Estado cotidiano — no es fallo de carácter. Distinta de [solitário](${solitario}) (Tamara / hielo, método).

> Fuentes: [sozinho](${wiki}), [sozinha](${wikiFem}), [só](${wikiSo}), [sōlus](${wikiLat}). No es terapia. No se avergüenza la grafía.

## Sozinho × sozinha × sozna × solitário

| Rol | Forma |
|-----|-------|
| Lema | **sozinho** |
| Par femenino | **sozinha** — inspeccionada, no nota al pie |
| Oral / teclado | **sozna** — la misma palabra, sin *i* |
| Ficha hermana | [solitário](${solitario}) |

**Tesis:** *sozinho* es el lema; *sozna* es rastro oral válido, no chiste.

## Étimo

Lat. *sōlus* → PT *só* + diminutivo *-zinho / -zinha*.

## ¡Valeu !!!

Lo mejor **hoy** — incluso pedir mapa estando solo. Solo sin [verdad](${verdade}) = agujero; con oficio = [camino](${caminho}) de una persona, sin vergüenza.

## Estado

**Aprobada** — sozinho + sozinha + sozna oral; hermana de [solitário](${solitario}).

[▶ Palabras](${hub}) · [▶ Solitário](${solitario}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSoznaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildSoznaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 119;
  return makePalavra({
    title: 'Inspeção: Sozinho — sozna, sozinha e ofício',
    titleEn: 'Inspection: Sozinho — sozna, sozinha and craft',
    titleEs: 'Inspección: Sozinho — sozna, sozinha y oficio',
    excerpt:
      'Palavras: **sozinho** (lat. *sōlus* + *-zinho*) — par **sozinha**; forma oral **sozna**; ≠ solitário; Valeu !!!',
    excerptEn:
      'Words: **sozinho** (Lat. *sōlus* + *-zinho*) — pair **sozinha**; oral **sozna**; ≠ solitário; Valeu !!!',
    excerptEs:
      'Palabras: **sozinho** (lat. *sōlus* + *-zinho*) — par **sozinha**; oral **sozna**; ≠ solitário; ¡Valeu !!!',
    slug: 'inspecao-palavra-sozna',
    date: '2026-08-17T23:24:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Sozinho · sozna · sozinha',
    coverImage: '/imagens/inspecoes/sozna-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSoznaPost,
  buildSoznaBodies
};
