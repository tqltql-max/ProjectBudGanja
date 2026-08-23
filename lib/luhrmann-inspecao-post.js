'use strict';

/**
 * Pessoas · Baz Luhrmann.
 * Ofício: cinema-teatro (Red Curtain). Elo principal: Romeu + Julieta (1996).
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildLuhrmannBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Baz_Luhrmann';
  const wikiEn = 'https://en.wikipedia.org/wiki/Baz_Luhrmann';
  const filme = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
  const peca = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const shake = '/posts/post-inspecao-figura-william-shakespeare.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const gibson = '/posts/post-inspecao-figura-mel-gibson.html';
  const curtis = '/posts/post-inspecao-figura-richard-curtis.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const dicaprio = '/posts/post-inspecao-figura-leonardo-dicaprio.html';
  const filo = '/posts/post-inspecao-filmografia-leonardo-dicaprio.html';

  const body = `## Escopo

Inspeção editorial e documental de **Mark Anthony «Baz» Luhrmann** (Sydney, 17 set. **1962**) — cineasta, argumentista e produtor australiano. O recorte BudGanja **não** é pedestal de «autor-estrela» nem inventário de tapete vermelho: é a **pessoa e o ofício** de **juntar palco e ecrã** (o que ele chama *Red Curtain*) — com elo principal no filme [Romeu + Julieta (1996)](${filme}). A [peça](${peca}) e [Shakespeare](${shake}) ficam em fichas **separadas**.

Pedido de campo: *inspecione Luhrmann*. A ficha honra o pedido **depois** da peça e do filme.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Baz Luhrmann](${wiki}), [EN](${wikiEn}). Sem afiliação com Fox, Bazmark ou a RSC. Distinto do [Legado](${legado}) canábico. Sem vida privada inventada. Catherine Martin entra como **ofício de design** (colaboração de palco/ecrã), não como dossiê conjugal. *Moulin Rouge!*, *O Grande Gatsby* e *Elvis* são **contexto de carreira**, sem ficha nesta entrega.

Esta ficha é o elo **Pessoas × Artes (cinema-teatro)** — par da inspeção [Romeu + Julieta (1996)](${filme}). Pares de ofício: [Mel Gibson](${gibson}) (realizar) · [Richard Curtis](${curtis}) (escrever/realizar) · [Shakespeare](${shake}) (o verso que Luhrmann **não** escreveu).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Mark Anthony Luhrmann** · conhecido como **Baz** |
| Nascimento | 17 set. 1962, Sydney, Austrália |
| Terra / formação | Herons Creek (infância) · **NIDA** (Sydney) — teatro antes do plano |
| Ofícios | Realizador · argumentista · produtor |
| Método (marca) | **Red Curtain** — teatro + cinema + cultura pop; cada filme da tríade tem um **dispositivo** (dança / verso / canção) |
| Obra-âncora BudGanja | [Romeu + Julieta (1996)](${filme}) |
| Trilogia (contexto) | *Strictly Ballroom* (1992) · [Romeu + Julieta](${filme}) · *Moulin Rouge!* (2001) |
| Outras marcas (contexto) | *Australia* (2008) · *The Great Gatsby* (2013) · *Elvis* (2022) · *La bohème* (ópera / palco) |
| Colaboração de ofício | **Catherine Martin** (cenário / figurino) · **Craig Pearce** (argumento) |
| Tipo BudGanja | Pessoa — **ofício de palco no ecrã** × Artes |
| Elo principal | [Romeu + Julieta (1996)](${filme}) — o filme; a [peça](${peca}) é irmã |
| Elo Palavras | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [coração](${coracao}) · [verdade](${verdade}) · [etimologia](${etimologia}) · [nó](${no}) · [Valeu !!!](${mantra}) |
| Par Pessoas | [Gibson](${gibson}) · [Curtis](${curtis}) · [Shakespeare](${shake}) · [DiCaprio](${dicaprio}) |
| Fonte de partida | [Wikipédia · Baz Luhrmann](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Luhrmann é o **ofício da cortina** — o espectador **sabe** que está num palco de cinema; o [gesto](${gesto}) é teatro filmado, não realismo de relatório.  
**H2:** [Romeu + Julieta (1996)](${filme}) é o **elo de obra**; a tese da adaptação (mesmo verso, outra cidade) fica **lá**.  
**H3:** o **+** do cartaz é [skill](${skill}) de recorte, não étimo da [peça](${peca}).  
**H4:** apelido **Baz**: tradição de alcunha (Basil Brush, nas fontes) — curiosidade de nome, **não** centro; a [etimologia](${etimologia}) do ofício está no palco, não na raposa de TV.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* pessoa *neste* ofício.

## Quem é (síntese verificável)

- Nasce em Sydney (1962); infância em Herons Creek; mãe professora de dança de salão; pai com cinema de povoação — palco e ecrã **em casa**, nas fontes.  
- Formação teatral; **NIDA**; colabora cedo com **Craig Pearce**.  
- Palco primeiro (incluindo *Strictly Ballroom* como peça, 1980s) → filme **1992**.  
- **1996:** [Romeu + Julieta](${filme}) — Verona Beach; BAFTA de realização e de argumento adaptado (1998, nas fontes).  
- **2001:** *Moulin Rouge!* fecha a tríade da cortina vermelha.  
- Depois: *Australia*, *Gatsby*, *Elvis* — **fila**, sem teses duplicadas aqui.

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Red Curtain | Declara o artifício — o [gesto](${gesto}) não finge ser documento |
| Dispositivo da tríade | Dança (*Ballroom*) · verso shakespeareano ([filme 1996](${filme})) · canção (*Moulin Rouge!*) |
| Palco → ecrã | NIDA / ópera / musical: o [caminho](${caminho}) não abandona o teatro |
| + no título | Marca de recorte — ≠ «e» da [peça](${peca}) |
| Design | Martin no figurino/cenário — [skill](${skill}) de casa, não ficha desta pessoa |

## Elo com Artes

| Recurso | Papel |
|---------|-------|
| [Romeu + Julieta (1996)](${filme}) | Filme-âncora — Luhrmann realiza; [DiCaprio](${dicaprio})/Danes no ecrã |
| [Romeu e Julieta](${peca}) | Peça — [Shakespeare](${shake}); o [nó](${no}) das casas |
| Hub [Artes](${artes}) | Obras; não fundir com biografia |
| *Moulin Rouge!* · *Gatsby* · *Elvis* | Contexto — **fila** |

> Abrir primeiro o [filme](${filme}) se o interesse for Verona Beach; a [peça](${peca}) se for o texto; esta ficha se for o **ofício** de quem puxou a cortina.

## Limites

- Não inventaria a filmografia.  
- Sem vida privada inventada.  
- Sem ficha de Catherine Martin ou Craig Pearce nesta entrega. O Romeu de ecrã está em [DiCaprio](${dicaprio}); a lista de títulos, na [filmografia](${filo}).  
- Distinto do [Legado](${legado}) canábico.  
- NIDA também aparece em [Mel Gibson](${gibson}) — mesmo conservatório, **outra** ficha, outro ofício.

## Status

**Aprovado na série Pessoas** — Baz Luhrmann · ofício de palco no ecrã · elo principal em [Romeu + Julieta (1996)](${filme}).

[▶ Pessoas](${hub}) · [▶ Filme 1996](${filme}) · [▶ DiCaprio](${dicaprio}) · [▶ Filmografia](${filo}) · [▶ Peça](${peca}) · [▶ Shakespeare](${shake}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **Mark Anthony “Baz” Luhrmann** (b. 17 Sep 1962, Sydney). Craft of **joining stage and screen** (*Red Curtain*) — not a red-carpet pedestal. Primary Arts link: [Romeo + Juliet (1996)](${filme}). The [play](${peca}) and [Shakespeare](${shake}) stay **separate**.

> Independent audit. [Wikipedia](${wikiEn}). No invented private life. *Moulin Rouge!*, *Gatsby* and *Elvis* are career context, without sheets in this delivery.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Baz Luhrmann** (Mark Anthony) |
| Craft | Director · writer · producer |
| Method | Red Curtain — theatre + cinema + pop |
| Anchor | [Romeo + Juliet (1996)](${filme}) |
| Date | ${inspected} |

## Status

**Approved in People** — stage-on-screen craft; primary film [Romeo + Juliet (1996)](${filme}).

[▶ People](${hub}) · [▶ 1996 film](${filme}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Mark Anthony «Baz» Luhrmann** (n. 17 sep. 1962, Sídney). Oficio de **juntar escenario y pantalla** (*Red Curtain*) — no pedestal de alfombra roja. Vínculo principal: [Romeu + Julieta (1996)](${filme}). La [pieza](${peca}) y [Shakespeare](${shake}) quedan **aparte**.

> Auditoría independiente. [Wikipedia](${wiki}). Sin vida privada inventada. *Moulin Rouge!*, *Gatsby* y *Elvis* son contexto, sin ficha en esta entrega.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Baz Luhrmann** (Mark Anthony) |
| Oficio | Realizador · guionista · productor |
| Método | Red Curtain — teatro + cine + pop |
| Ancla | [Romeu + Julieta (1996)](${filme}) |
| Fecha | ${inspected} |

## Estado

**Aprobado en Personas** — oficio de escenario en pantalla; filme [Romeu + Julieta (1996)](${filme}).

[▶ Personas](${hub}) · [▶ Filme 1996](${filme}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLuhrmannPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLuhrmannBodies();
  return figuraPost({
    title: 'Inspeção: Baz Luhrmann — ofício de palco no ecrã',
    titleEn: 'Inspection: Baz Luhrmann — the craft of stage on screen',
    titleEs: 'Inspección: Baz Luhrmann — el oficio de escenario en pantalla',
    excerpt:
      'Pessoas × Artes: Baz Luhrmann (n. 1962) — cinema-teatro (Red Curtain); elo principal em Romeu + Julieta (1996). Peça e Shakespeare em fichas irmãs.',
    excerptEn:
      'People × Arts: Baz Luhrmann (b. 1962) — theatre-cinema (Red Curtain); primary link to Romeo + Juliet (1996). Play and Shakespeare on sister sheets.',
    excerptEs:
      'Personas × Artes: Baz Luhrmann (n. 1962) — cine-teatro (Red Curtain); vínculo principal en Romeu + Julieta (1996). Pieza y Shakespeare en fichas hermanas.',
    slug: 'inspecao-figura-baz-luhrmann',
    date: '2026-08-22T03:35:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'Luhrmann · pessoa',
    coverImage: '/imagens/inspecoes/baz-luhrmann-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLuhrmannPost,
  buildLuhrmannBodies
};
