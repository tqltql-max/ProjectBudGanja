'use strict';

/**
 * Inspeção Artes · cinema: O Magnata (2007).
 * Johnny Araújo / roteiro Chorão — skate, rock e preço × valor.
 * Obra primeiro; biografia em Pessoas.
 */

const fs = require('fs');
const path = require('path');

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildOMagnataBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const wiki = 'https://pt.wikipedia.org/wiki/O_Magnata';
  const gullane = 'https://www.gullane.com.br/projetos/o-magnata';
  const g1 =
    'https://g1.globo.com/Noticias/Cinema/0,,MUL181847-7086,00-FILME+DE+CHORAO+ARRISCA+SER+BOM+MAS+ESTRAGA+NO+FINAL.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do filme **«O Magnata»** (**2007**) — drama brasileiro de **Johnny Araújo**, com **roteiro de [Chorão](${chorao})**. O **início de tudo** é a **obra no ecrã**: um jovem rico, ícone de rock e skate, que conhece o **preço** de tudo e desconhece o **valor**. A biografia do letrista fica em [Pessoas](${chorao}); aqui inspeciona-se o **longa**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · O Magnata](${wiki}), [Gullane · projecto](${gullane}), crítica [G1](${g1}). Crédito: Chorão / Johnny Araújo / Gullane / Green Goes / Miravista / Teleimage / Buena Vista / elenco — **sem afiliação**. **Obra ≠ pessoa.** **Ficha ≠ apologia de excesso nem sermão.** Não romantiza dependência. Distinto de Canais (YouTube) e da ficha Pessoas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **O Magnata** |
| Ano | **2007** (estreia BR **15 nov.**) |
| Realização | **Johnny Araújo** (estreia em longa; vindo de videoclipes, incl. Charlie Brown Jr.) |
| Roteiro | **[Chorão](${chorao})** — colaboração Bráulio Mantovani · Messina Neto · Carlos Cortez · Danilo Gullane |
| Produção | Caio Gullane · Fabiano Gullane · Debora Ivanov · Paulo Ribeiro |
| Coprodução | Green Goes · Miravista · Teleimage |
| Distribuição | Buena Vista International |
| Música | **Charlie Brown Jr.** · colaboração Apollo Nove |
| Fotografia / arte / montagem | André Modugno · Clóvis Bueno · Rodrigo Menecucci |
| Duração | ~100 min (fonte wiki) |
| Orçamento / bilheteira | R$ 5 milhões / R$ 1.141.389 (ANCINE: 67 salas · 149 463 espectadores) |
| Protagonista | Paulo Vilhena (Magnata / André) |
| Elenco âncora | Rosanne Mulholland (Dri) · Maria Luísa Mendonça (Vilma) · Chico Díaz (Ribeiro) · Juliano Cazarré (Cabeça) · Priscila Sol (Rê) · Marcelo Nova (consciência) |
| Meio | Longa-metragem · drama · skate / rock urbano |
| Tipo BudGanja | Arte — **filme 2007 primeiro**; pessoa em [Chorão](${chorao}) |
| Elo Palavras | [ídolo](${idolo}) · [respeito](${respeito}) · [verdade](${verdade}) · [caminho](${caminho}) · [medo](${medo}) · [vida](${vida}) |
| Elo Pessoas | **[Chorão](${chorao})** — roteirista; o filme não o substitui |
| Elo Artes (canção) | [Só os Loucos Sabem](${loucos}) — outra obra; não o longa |
| Fonte | [Wikipédia](${wiki}) · [Gullane](${gullane}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **roteiro de Chorão** e na **estreia de Araújo** — génese 2005–2007 — antes de qualquer leitura biográfica póstuma.  
**H2:** a tese da obra é **preço × valor**: o [ídolo](${idolo}) de rock/skate mede coisas em dinheiro e fama; o laboratório mede [respeito](${respeito}) e [verdade](${verdade}).  
**H3:** skate, banda, grafite ([Os Gêmeos](https://pt.wikipedia.org/wiki/Os_G%C3%AAmeos) em cameo) e trilha CBJr são **representação urbana**; [maconha](${maconha}) entra como **milieu cultural** da geração — **não** como argumento do filme. Não forçar a planta no enredo.  
**H4:** a crítica (G1, Gazeta do Povo) aponta desfecho moralista / cliché; o laboratório **regista** a recepção — não transforma a ficha em defesa nem em linchamento.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* filme *deste* roteiro.

Passos:

1. Fixar a **génese** (roteiro, director, casa produtora, estreia).  
2. Declarar a tese cultural a partir da **obra**.  
3. Separar filme de [biografia](${chorao}) e de [canção](${loucos}).  
4. Mapear elenco / cameos como **textura urbana**, não como lista de famosos.  
5. Status + fila.

## O início de tudo — génese do filme

O roteiro esteve anos no papel. A [Gullane](${gullane}) produz; Johnny Araújo — premiado em clipes, parceiro de Chorão no audiovisual da banda — estreia no longa. Paulo Vilhena aceita o papel a convite do roteirista, antes de ler o texto. Filmagem e pós com orçamento público de **R$ 5 milhões**. Estreia **15 de novembro de 2007**. Em 2008: Los Angeles Brazilian Film Festival e Festival de Cinema Brasileiro de Nova Iorque.

> **Hierarquia BudGanja:** sem o roteiro de [Chorão](${chorao}) e a realização de Araújo, não há filme a inspecionar. A ficha Pessoas é descendente da letra; esta ficha é descendente do **guião**.

## A obra (síntese)

Magnata — lindo, rico, famoso, centro da turma de skate e da banda punk Ideal Stereo — não reconhece limites. A mãe, Vilma, afoga-se em álcool; o pai morreu cedo; Ribeiro, advogado oportunista, aproxima-se da fortuna. Uma **brincadeira perigosa** entre amigos vira pesadelo. Em quatro dias a [vida](${vida}) descontrola. Dri, prima que volta de Nova Iorque para escrever, é o [gesto](${gesto}) de humanizar o egocentrismo — o tempo corre contra.

A consciência do protagonista aparece como «grilo falante» (Marcelo Nova): ironia no ecrã, não manual de ética. O laboratório **não** reconstitui o desfecho cena a cena.

## Tese cultural BudGanja

| Tema na obra | Tradução editorial |
|--------------|-------------------|
| Preço de tudo / valor de nada | [Ídolo](${idolo}) que conta fama; [respeito](${respeito}) que conta ofício |
| Skate + punk + grafite | Representação urbana — textura, não catálogo de marcas |
| Trilha Charlie Brown Jr. | Obra sonora no filme; letra inspecionada noutra ficha ([Só os Loucos Sabem](${loucos})) |
| Mãe, herança, advogado | Família como campo de poder — não fofoca biográfica |
| Brincadeira que vira pesadelo | [Medo](${medo}) das consequências; [caminho](${caminho}) que se estreita |
| Dri / escrita | Outro ofício da palavra — eco do roteirista, sem colar pessoa ao personagem |
| Desfecho criticado | Recepção: G1 elogia direcção e Vilhena, recusa o final; Gazeta lê lição moralista |

O laboratório **não** adopta Magnata como cosmologia nem como retrato disfarçado de Chorão: inspeciona o **filme**. Pessoa ≠ personagem.

## Elenco e cameos — textura, não álbum de figurinhas

| Nome | Papel no ecrã | Nota editorial |
|------|----------------|----------------|
| Paulo Vilhena | Magnata | Protagonista; crítica destacou o desempenho |
| Rosanne Mulholland | Dri | Escrita / possível travessia |
| Maria Luísa Mendonça | Vilma | Mãe; álcool como facto do guião |
| Chico Díaz | Ribeiro | Poder oportunista |
| Juliano Cazarré | Cabeça | Turma do skate |
| Marcelo Nova | Consciência | «Grilo falante» — ironia, não sermão do lab |
| Os Gêmeos · Marcelo D2 · João Gordo · Bob Burnquist · Charlie Brown Jr. · Dead Fish · Tiririca · Marcos Mion… | Participações | Cidade e cena — **não** viram objecto desta ficha |

## Recepção (registo, não veredicto)

Crítica **mista a negativa**: ritmo e visual elogiados para público jovem; desfecho apontado como frágil ou moralista. Prémio FIESP/SESI-SP (4.ª ed.): **melhor montagem** (Rodrigo Menecucci) e **melhor trilha** (Charlie Brown Jr. / Apollo Nove). Bilheteira moderada face ao orçamento.

Araújo declarou o recorte **comercial / adolescente**, não «filme de tese». O laboratório aceita essa honestidade: inspecionar ≠ elevar a cânone.

## Elo com Pessoas e Palavras

| Recurso | Papel |
|---------|-------|
| [Chorão](${chorao}) | Pessoa — letrista / roteirista; **referência**, não substituto da obra |
| [Só os Loucos Sabem](${loucos}) | Artes — canção; outro objecto |
| [Send Me On My Way](${sendMe}) | Par da rádio com a canção CBJr — **não** o filme |
| [maconha](${maconha}) / [Palavras](${palavras}) | Milieu da geração; o filme **não** é ficha da planta |
| Hub [Pessoas](${pessoas}) | Não duplicar biografia aqui |

## Trailer de referência (casa produtora)

O trailer oficial está na página da [Gullane · O Magnata](${gullane}). O laboratório **não** replica o filme nem o site promocional.

## Avaliação BudGanja

### Forças
- Fecha o elo **Artes × Pessoas** anunciado na ficha [Chorão](${chorao}) (*O Magnata*, roteiro 2007).  
- Génese verificável (Gullane, wiki, ANCINE).  
- Tese clara: preço × valor; [ídolo](${idolo}) no ecrã ≠ ofício no laboratório.

### Limites
- Não é walkthrough nem defesa do desfecho.  
- Cameos não ganham ficha própria nesta inspeção.  
- Representação urbana ≠ inventário canábico — não inflacionar o enredo.

## Status

**Aprovado na série Artes** — génese 2007 primeiro; biografia em [Chorão](${chorao}); canção em [Só os Loucos Sabem](${loucos}). [Valeu !!!](${mantra})

[▶ Artes](${hub}) · [▶ Chorão](${chorao}) · [▶ Ídolo](${idolo}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian drama **O Magnata** (**2007**) — directed by **Johnny Araújo**, screenplay by **[Chorão](${chorao})**. The **work on screen** comes first: a rich rock/skate idol who knows **price** and misses **value**. Biography stays on the [People](${chorao}) sheet.

> **Method note:** independent audit. Sources: [Wikipedia](${wiki}), [Gullane](${gullane}), [G1](${g1}). Credit: Chorão / Araújo / Gullane / cast — **no affiliation**. **Work ≠ person.** Does not romanticize addiction.

## Inspected object

| Field | Value |
|-------|-------|
| Work | **O Magnata** (2007) |
| Direction | Johnny Araújo (feature debut) |
| Screenplay | [Chorão](${chorao}) |
| Production | Gullane |
| Lead | Paulo Vilhena |
| BudGanja type | Art — **2007 film first**; person on [Chorão](${chorao}) |
| Word links | [ídolo](${idolo}) · [respeito](${respeito}) · [verdade](${verdade}) · [caminho](${caminho}) |
| Date | ${inspected} |

## Thesis

Price vs value · skate/punk/graffiti as urban texture, not a brand catalogue · CBJr score as another object ([Só os Loucos Sabem](${loucos})) · mixed reviews, moralizing ending noted · [maconha](${maconha}) as generational milieu, **not** the plot. [Valeu !!!](${mantra})

## Status

**Approved in Arts** — 2007 genesis first; biography in [Chorão](${chorao}).

[▶ Arts](${hub}) · [▶ Chorão](${chorao}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección del drama brasileño **O Magnata** (**2007**) — dirección de **Johnny Araújo**, guion de **[Chorão](${chorao})**. Primero la **obra**: un ídolo de rock/skate que conoce el **precio** y desconoce el **valor**. La biografía queda en [Personas](${chorao}).

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia](${wiki}), [Gullane](${gullane}). Crédito: Chorão / Araújo / Gullane / elenco — **sin afiliación**. **Obra ≠ persona.** No romantiza la adicción.

## Objeto

| Campo | Valor |
|-------|-------|
| Obra | **O Magnata** (2007) |
| Dirección | Johnny Araújo |
| Guion | [Chorão](${chorao}) |
| Tipo lab | Arte — **filme 2007 primero**; persona en [Chorão](${chorao}) |
| Vínculos | [ídolo](${idolo}) · [respeito](${respeito}) · [verdade](${verdade}) |
| Fecha | ${inspected} |

## Tesis

Precio × valor · textura urbana (skate/punk/grafiti) · banda sonora CBJr como otro objeto ([Só os Loucos Sabem](${loucos})) · recepción mixta · [maconha](${maconha}) como milieu, **no** argumento. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Artes** — génesis 2007 primero; biografía en [Chorão](${chorao}).

[▶ Artes](${hub}) · [▶ Chorão](${chorao}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs, wiki, gullane };
}

function buildOMagnataPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildOMagnataBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-filme-o-magnata', 84);
  return artePost({
    title: 'Inspeção: O Magnata — o filme de 2007, o roteiro de Chorão e o preço × valor',
    titleEn: 'Inspection: O Magnata — the 2007 film, Chorão’s screenplay, and price vs value',
    titleEs: 'Inspección: O Magnata — el filme de 2007, el guion de Chorão y el precio × valor',
    excerpt:
      'Artes · cinema: O Magnata (2007, Johnny Araújo / roteiro Chorão) — skate, rock e preço × valor; obra primeiro, pessoa na ficha Chorão; Valeu !!!',
    excerptEn:
      'Arts · film: O Magnata (2007, Johnny Araújo / Chorão screenplay) — skate, rock and price vs value; the work first, the person on the Chorão sheet; Valeu !!!',
    excerptEs:
      'Artes · cine: O Magnata (2007, Johnny Araújo / guion de Chorão) — skate, rock y precio × valor; la obra primero, la persona en la ficha Chorão; ¡Valeu !!!',
    slug: 'inspecao-filme-o-magnata',
    date: '2026-08-22T16:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'O Magnata · Artes',
    coverImage: '/imagens/inspecoes/o-magnata-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildOMagnataPost,
  buildOMagnataBodies
};
