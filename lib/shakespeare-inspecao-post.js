'use strict';

/**
 * Pessoas · William Shakespeare.
 * Elo principal: Romeu e Julieta (série Artes).
 * Capa: dossiê holográfico de campo — arte, não fonte.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildShakespeareBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/William_Shakespeare';
  const wikiEn = 'https://en.wikipedia.org/wiki/William_Shakespeare';
  const folio = 'https://pt.wikipedia.org/wiki/First_Folio';
  const romeu = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const leonardo = '/posts/post-inspecao-figura-leonardo-da-vinci.html';
  const alvares = '/posts/post-inspecao-figura-alvares-de-azevedo.html';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const king = '/posts/post-inspecao-figura-stephen-king.html';
  const gibson = '/posts/post-inspecao-figura-mel-gibson.html';
  const filme = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial e documental de **William Shakespeare** (baptizado em Stratford-upon-Avon, 26 abr. **1564** — morto na mesma vila, 23 abr. **1616**) — poeta, dramaturgo e actor inglês. O recorte BudGanja **não** é enciclopédia do «maior escritor» nem dossiê de conspiração de autoria: é a **pessoa e o ofício** de **fazer a palavra trabalhar em palco** — com elo principal na tragédia [Romeu e Julieta](${romeu}) (série Artes).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · William Shakespeare](${wiki}), [EN](${wikiEn}), [First Folio](${folio}). Sem afiliação com o Globe, o Folger ou a RSC. Distinto do [Legado](${legado}) canábico. A **capa** desta ficha é um **dossiê holográfico de campo** — arte gerada, homenagem visual. **Não** é fonte: números, «análise por IA» e selos do cartaz **não** entram como prova. A biografia fica nas fontes acima. Sem vida privada inventada. Debate de autoria: existe; **não** é o centro.

Esta ficha é o elo **Pessoas × Artes (teatro)** — par da inspeção [Romeu e Julieta](${romeu}). Pares de ofício em Pessoas: [Leonardo](${leonardo}) (olhar até o [gesto](${gesto}) falar) · [Álvares de Azevedo](${alvares}) (verso) · [Jostein Gaarder](${gaarder}) / [Stephen King](${king}) (autor × livro).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **William Shakespeare** |
| Baptismo / morte | 26 abr. 1564 — 23 abr. 1616 (Stratford-upon-Avon; nascimento tradicional: 23 abr.) |
| Ofícios | Poeta · dramaturgo · actor |
| Casa de palco | **Globe Theatre** (1599, Londres) — contexto de ofício, não ficha de edifício |
| Obra-âncora BudGanja | [Romeu e Julieta](${romeu}) — tragédia (série Artes) |
| Outras marcas (contexto) | *Hamlet* · *Macbeth* · *Otelo* · *Rei Lear* · *Sonho de uma noite de verão* · 154 sonetos · [First Folio](${folio}) (1623) |
| Tipo BudGanja | Pessoa — **ofício da palavra em palco** × Artes |
| Elo principal | [Romeu e Julieta](${romeu}) — a peça; o nome como [nó](${no}) |
| Elo Palavras | [etimologia](${etimologia}) · [língua portuguesa](${lingua}) (tradução) · [gesto](${gesto}) · [verdade](${verdade}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [caminho](${caminho}) · [skill](${skill}) · [Valeu !!!](${mantra}) |
| Par Pessoas | [Leonardo](${leonardo}) · [Álvares](${alvares}) · [Gaarder](${gaarder}) |
| Capa | Dossiê holográfico de campo — **arte, não fonte** |
| Fonte de partida | [Wikipédia · William Shakespeare](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Shakespeare é o **ofício** — verso, palco, nome — não o pedestal de «génio inglês».  
**H2:** [Romeu e Julieta](${romeu}) é o **elo de obra**; a tese da peça (o nome que ata duas casas) fica **lá**.  
**H3:** a série [Palavras](${palavras}) é prima metodológica: perguntar de onde veio o nome, como em [etimologia](${etimologia}), sem transformar o Bardo em dicionário.  
**H4:** o dossiê holográfico **serve de foto**; **não** serve de prova.  
**H5:** fecho = [respeito](${verdade}) ao texto + [Valeu !!!](${mantra}) — o melhor recorte *desta* pessoa *neste* ofício.

## Quem foi (síntese verificável)

- Nasce (tradição) e é baptizado em **Stratford-upon-Avon** (1564); casa de João Shakespeare e Mary Arden.  
- Casamento com Anne Hathaway (1582); três filhos — facto biográfico, **não** centro desta ficha.  
- Década de 1590: actor e dramaturgo em Londres; companhia que viria a ser os *King's Men*.  
- **1599:** Globe — casa de madeira e palco, não museu do cartaz.  
- Poesia: *Vénus e Adónis*, *A violação de Lucrécia*; **154 sonetos** (publicados 1609).  
- **1616:** morte em Stratford.  
- **1623:** colegas John Heminges e Henry Condell publicam o [First Folio](${folio}) — *Mr. William Shakespeares Comedies, Histories, & Tragedies* — o gesto que **guarda** as peças. Sem o Fólio, várias tragédias não teriam chegado inteiras.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Palavra em palco | O verso **actua** — [gesto](${gesto}) + [skill](${skill}), não só página |
| Nome | Em [Romeu e Julieta](${romeu}), o apelido é o [nó](${no}) das casas — prima da [etimologia](${etimologia}) |
| Fólio | Arquivo de ofício: guardar o texto é também inspecionar |
| Tradução | No BR a peça vive em [língua portuguesa](${lingua}) — outra ficha, outro palco |
| Capa holográfica | Homenagem visual do lab; a prova fica na wiki e no texto |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [Romeu e Julieta](${romeu}) | Peça-âncora — Verona, dois nomes, um [nó](${no}) |
| [Romeu + Julieta (1996)](${filme}) | Filme — Luhrmann; DiCaprio no ecrã; **não** é a peça |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| *Hamlet* · *Macbeth* · *Otelo* · *Lear* | Contexto de carreira — **fila**, sem ficha nesta entrega |
| [Mel Gibson](${gibson}) | Palco clássico no NIDA (*Romeo and Juliet*) — afterlife de actor, não desta biografia |

> Abrir primeiro [Romeu e Julieta](${romeu}) se o interesse for a **peça**; [Romeu + Julieta (1996)](${filme}) se for o **filme** do DiCaprio; esta ficha se o interesse for o **autor**.

## Capa — o que o dossiê é e não é

O cartaz de campo mostra retrato, Globe, linha do tempo e um painel «análise por IA». O laboratório **usa a imagem como capa**. Declara:

- datas 1564–1616: **consenso** das fontes wiki, não do cartaz;  
- lista de peças no dossiê: **memória cultural**, não inventário fechado;  
- «palavras criadas» / «autoria confirmada»: **não** entram como prova — números de vocabulário variam e o debate de autoria é outro recorte;  
- citação *To be, or not to be*: é de **Hamlet**, não de [Romeu e Julieta](${romeu}) — não misturar teses.

## Limites

- Não inventaria as ~38/39 peças.  
- Sem vida privada inventada.  
- Sem teoria da conspiração de autoria como centro.  
- Distinto do [Legado](${legado}) canábico.  
- A tragédia das casas: literatura — quando a dor pedir companhia, [Vida](${vida}).

## Status

**Aprovado na série Pessoas** — William Shakespeare · ofício da palavra em palco · elo principal em [Romeu e Julieta](${romeu}) (Artes). Capa: dossiê holográfico de campo (arte, não fonte).

[▶ Pessoas](${hub}) · [▶ Romeu e Julieta](${romeu}) · [▶ Filme 1996](${filme}) · [▶ Etimologia](${etimologia}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **William Shakespeare** (baptised 26 Apr 1564 — died 23 Apr 1616, Stratford-upon-Avon). Craft of **making the word work on stage** — not a “greatest writer” poster or an authorship-conspiracy file. Primary Arts link: [Romeo and Juliet](${romeu}).

> Independent audit. [Wikipedia](${wikiEn}) / [PT](${wiki}). The **cover** is a field holographic dossier — generated art, homage. **Not** a source: AI-panel stats on the poster are not evidence. No invented private life. Authorship debate exists; it is **not** the center.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **William Shakespeare** |
| Lived | 1564–1616, Stratford-upon-Avon |
| Craft | Poet · playwright · actor |
| Anchor work | [Romeo and Juliet](${romeu}) (Arts) |
| Other marks (context) | *Hamlet* · *Macbeth* · *Othello* · *King Lear* · 154 sonnets · [First Folio](${folio}) (1623) |
| Words | [etymology](${etimologia}) · [gesture](${gesto}) · [truth](${verdade}) · [heart](${coracao}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Status

**Approved in the People series** — stage-word craft; primary Arts link [Romeo and Juliet](${romeu}). Cover = field art, not a source.

[▶ People](${hub}) · [▶ Romeo and Juliet](${romeu}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **William Shakespeare** (bautizado 26 abr. 1564 — muerto 23 abr. 1616, Stratford-upon-Avon). Oficio de **hacer trabajar la palabra en el escenario** — no póster del «mayor escritor» ni dossier de conspiración de autoría. Vínculo principal: [Romeu e Julieta](${romeu}).

> Auditoría independiente. [Wikipedia](${wiki}) / [EN](${wikiEn}). La **portada** es un dossier holográfico de campo — arte generado, homenaje. **No** es fuente: las cifras del cartel no entran como prueba. Sin vida privada inventada.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **William Shakespeare** |
| Fechas | 1564–1616 |
| Oficio | Poeta · dramaturgo · actor |
| Obra ancla | [Romeu e Julieta](${romeu}) (Artes) |
| Palabras | [etimologia](${etimologia}) · [gesto](${gesto}) · [verdade](${verdade}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Estado

**Aprobado en la serie Personas** — oficio de la palabra en escena; vínculo [Romeu e Julieta](${romeu}). Portada = arte de campo, no fuente.

[▶ Personas](${hub}) · [▶ Romeu e Julieta](${romeu}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildShakespearePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildShakespeareBodies();
  return figuraPost({
    title: 'Inspeção: William Shakespeare — ofício da palavra em palco',
    titleEn: 'Inspection: William Shakespeare — the craft of the word on stage',
    titleEs: 'Inspección: William Shakespeare — el oficio de la palabra en escena',
    excerpt:
      'Pessoas × Artes: William Shakespeare (1564–1616) — poeta, dramaturgo e actor; elo principal em Romeu e Julieta. Capa: dossiê holográfico de campo (arte, não fonte).',
    excerptEn:
      'People × Arts: William Shakespeare (1564–1616) — poet, playwright and actor; primary link to Romeo and Juliet. Cover: field holographic dossier (art, not a source).',
    excerptEs:
      'Personas × Artes: William Shakespeare (1564–1616) — poeta, dramaturgo y actor; vínculo principal en Romeu e Julieta. Portada: dossier holográfico de campo (arte, no fuente).',
    slug: 'inspecao-figura-william-shakespeare',
    date: '2026-08-22T03:20:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'Shakespeare · pessoa',
    coverImage: '/imagens/inspecoes/shakespeare-figura-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildShakespearePost,
  buildShakespeareBodies
};
