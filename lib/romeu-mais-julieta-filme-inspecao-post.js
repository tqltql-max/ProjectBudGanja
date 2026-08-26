'use strict';

/**
 * Artes · cinema «Romeu + Julieta» (Baz Luhrmann, 1996).
 * Filme primeiro neste recorte; a peça é ficha irmã.
 * Elenco âncora: Leonardo DiCaprio (Romeu) · Claire Danes (Julieta).
 * Não é biografia do actor; não romantiza o desfecho.
 */

const { artePost } = require('./artes-inspecoes-posts.js');

const YT_ID = '8VOAxzgq42A';

function buildRomeuMaisJulietaFilmeBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Romeu_%2B_Julieta';
  const wikiEn = 'https://en.wikipedia.org/wiki/Romeo_%2B_Juliet_(1996_film)';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const peca = '/posts/post-inspecao-arte-romeu-e-julieta.html';
  const shake = '/posts/post-inspecao-figura-william-shakespeare.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const luhrmann = '/posts/post-inspecao-figura-baz-luhrmann.html';
  const dicaprio = '/posts/post-inspecao-figura-leonardo-dicaprio.html';
  const filo = '/posts/post-inspecao-filmografia-leonardo-dicaprio.html';

  const body = `## Escopo

Inspeção editorial do filme **«Romeo + Juliet»** — no Brasil, **Romeu + Julieta** (**1996**). Realização de **[Baz Luhrmann](${luhrmann})**; argumento de Luhrmann e **Craig Pearce**. Romeu no ecrã: **Leonardo DiCaprio**. Julieta: **Claire Danes**. O **início de tudo** continua a ser a [peça](${peca}) de [Shakespeare](${shake}). Este recorte é a **adaptação de cinema**: mesmos versos, outra cidade — **Verona Beach**.

Pedido de campo: *linka o filme de Leonardo DiCaprio sobre Romeu e Julieta*. A ficha honra o pedido e **separa** objectos: a [peça](${peca}) não é o filme; [DiCaprio](${dicaprio}) (pessoa) e a [filmografia](${filo}) não são esta obra.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Romeu + Julieta](${wiki}), [EN](${wikiEn}), trailer (${yt}). Crédito: Shakespeare (peça) / Luhrmann / Pearce / 20th Century Fox / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Adaptação ≠ manual do desfecho, ≠ biografia do actor, ≠ protocolo de armas.** Quando a leitura apertar, [Vida](${vida}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Romeu + Julieta** |
| Título original | *William Shakespeare's Romeo + Juliet* |
| PT | Romeu e Julieta (título de Portugal) |
| Ano | **1996** (estreia EUA **1 nov.**; Brasil **10 jan. 1997**) |
| Realização | **[Baz Luhrmann](${luhrmann})** |
| Argumento | [Luhrmann](${luhrmann}) · Craig Pearce — a partir da [peça](${peca}) |
| Elenco âncora | **[Leonardo DiCaprio](${dicaprio})** (Romeu) · **Claire Danes** (Julieta) |
| Outros (contexto) | John Leguizamo (Tebaldo) · Harold Perrineau (Mercúcio) · Pete Postlethwaite (Frei Lourenço) · Paul Sorvino · Paul Rudd (Paris) |
| Palco fílmico | **Verona Beach** — casas como impérios; o verso permanece |
| Tipo BudGanja | Arte — **filme 1996**; génese na [peça](${peca}) |
| Elo irmão | [Romeu e Julieta](${peca}) — a tragédia no papel/palco |
| Elo Pessoas | [Shakespeare](${shake}) — autor da peça · [Luhrmann](${luhrmann}) — ofício do plano · [DiCaprio](${dicaprio}) — ofício no ecrã |
| Elo Palavras | [nó](${no}) · [etimologia](${etimologia}) · [coração](${coracao}) · [gesto](${gesto}) · [caminho](${caminho}) · [língua portuguesa](${lingua}) · [Valeu !!!](${mantra}) |
| Trailer | [YouTube](${yt}) |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o filme **traduz o palco em ecrã** — o [gesto](${gesto}) muda (praia, baile, noticiário); o [nó](${no}) das casas **não**.  
**H2:** o **+** do título (*Romeo + Juliet*) é marca de Luhrmann; no BR **Romeu + Julieta** ≠ [Romeu e Julieta](${peca}) (peça). O sinal não apaga o «e».  
**H3:** [DiCaprio](${dicaprio}) é **ofício de actor** neste Romeu — par de método com [Keanu](${keanu}) em [The Matrix](${matrix}): presença no ecrã, ficha da **obra** à parte. A lista de títulos fica na [filmografia](${filo}).  
**H4:** «Sword» gravado na arma: o **nome** da espada cola no objecto novo — prima da [etimologia](${etimologia}) / *What’s in a name?* da [peça](${peca}). Não é ficha de armamento.  
**H5:** o desfecho **não** se glamouriza. Literatura no ecrã ≠ conselho.

## O início de tudo — génese do filme

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Texto | [Peça](${peca}) de [Shakespeare](${shake}) — diálogos em verso, em inglês |
| **1996** | Luhrmann / Pearce: Verona Beach, Fox, ~120 min |
| Elenco | DiCaprio escolhido cedo para Romeu; Danes como Julieta após testes |
| Som | Trilha pop/rock dos 90 (*Kissing You*, *Lovefool*, etc.) — **afterlife musical**, não origem da tragédia |
| Recepção | Êxito de bilheteira; Urso de Prata de actor (DiCaprio, Berlim 1997) — contexto, não pedestal |

> **Hierarquia BudGanja:** sem a [peça](${peca}), não há este filme a inspecionar. Zeffirelli (1968) e *West Side Story* continuam **memória**, sem ficha nesta entrega.

## A adaptação (síntese)

- Mesmo [coração](${coracao}) atravessando o apelido; outro [caminho](${caminho}) visual.  
- Noticiário no prólogo: o coro vira ecrã — a [verdade](${verdade}) da rua entra como telejornal.  
- O **+** no cartaz é o recorte Luhrmann; a [peça](${peca}) fica com o **e**.  
- DiCaprio / Danes: corpos do [gesto](${gesto}) desta versão — **não** substituem o texto.

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Verona Beach | Palco mudado; [nó](${no}) das casas igual |
| Verso no ecrã | [Língua](${lingua}) de origem + dublagem/legendas BR — outro palco |
| Romeu + Julieta | Título-marca ≠ título da [peça](${peca}) |
| DiCaprio | [Pessoa](${dicaprio}) do Romeu de 1996 — catálogo em [Filmografias](${filo}) |
| Espada no nome | Rótulo que viaja de objecto — elo [etimologia](${etimologia}) |

## Elo com a peça e com o autor

| Recurso | Papel |
|---------|-------|
| [Romeu e Julieta](${peca}) | Peça — o nome é o nó; abrir **primeiro** se o interesse for o texto |
| [Shakespeare](${shake}) | Pessoa — ofício da palavra em palco |
| [Luhrmann](${luhrmann}) | Pessoa — ofício de palco no ecrã; Red Curtain |
| [DiCaprio](${dicaprio}) | Pessoa — ofício de presença no ecrã |
| [Filmografia · DiCaprio](${filo}) | Catálogo de títulos — série Filmografias |
| Esta ficha | Filme 1996 — o plano; DiCaprio/Danes no ecrã |

## Limites

- **Ficha ≠ biografia.** A pessoa está em [DiCaprio](${dicaprio}); a lista, na [filmografia](${filo}). Claire Danes sem ficha nesta entrega. O realizador está em [Luhrmann](${luhrmann}).  
- **Ficha ≠ manual do desfecho.** Sem glamourizar morte.  
- Sem inventário de outras adaptações (Zeffirelli, ballet, Broadway).  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovada na série Artes** — *Romeu + Julieta* (1996) como **filme**; génese na [peça](${peca}); autor em [Shakespeare](${shake}); realização em [Luhrmann](${luhrmann}); Romeu de ecrã em [DiCaprio](${dicaprio}).

[▶ Artes](${hub}) · [▶ Peça](${peca}) · [▶ Luhrmann](${luhrmann}) · [▶ DiCaprio](${dicaprio}) · [▶ Filmografia](${filo}) · [▶ Shakespeare](${shake}) · [▶ Trailer](${yt}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **Romeo + Juliet** (1996), directed by **Baz Luhrmann**. Romeo on screen: **Leonardo DiCaprio**; Juliet: **Claire Danes**. The **start of everything** is still [Shakespeare’s play](${peca}). This sheet is the **film**: same verse, new city — Verona Beach.

> Independent audit. [Wikipedia](${wikiEn}). Adaptation ≠ protocol, ≠ actor biography. If it hurts, [Vida](${vida}).

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Romeo + Juliet** · BR **Romeu + Julieta** |
| Year | **1996** |
| Cast anchor | Leonardo DiCaprio · Claire Danes |
| Sister sheet | [the play](${peca}) |
| Date | ${inspected} |

## Status

**Approved in Arts** — 1996 film linked; play and author remain separate sheets.

[▶ Play](${peca}) · [▶ Shakespeare](${shake}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Romeo + Juliet** (1996), dirección de **Baz Luhrmann**. Romeu en pantalla: **Leonardo DiCaprio**; Julieta: **Claire Danes**. El **inicio de todo** sigue siendo la [pieza](${peca}). Esta ficha es el **filme**: mismos versos, otra ciudad — Verona Beach.

> Auditoría independiente. [Wikipedia](${wiki}). Adaptación ≠ protocolo, ≠ biografía del actor. Si aprieta, [Vida](${vida}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Romeu + Julieta** · *Romeo + Juliet* |
| Año | **1996** |
| Elenco | Leonardo DiCaprio · Claire Danes |
| Ficha hermana | [la pieza](${peca}) |
| Fecha | ${inspected} |

## Estado

**Aprobada en Artes** — filme de 1996 enlazado; pieza y autor en fichas aparte.

[▶ Pieza](${peca}) · [▶ Shakespeare](${shake}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRomeuMaisJulietaFilmePost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildRomeuMaisJulietaFilmeBodies();
  return artePost({
    title: 'Inspeção: Romeu + Julieta (1996) — o filme de Luhrmann e DiCaprio',
    titleEn: 'Inspection: Romeo + Juliet (1996) — Luhrmann and DiCaprio’s film',
    titleEs: 'Inspección: Romeo + Julieta (1996) — el filme de Luhrmann y DiCaprio',
    excerpt:
      'Artes: Romeu + Julieta (1996, Baz Luhrmann) — Leonardo DiCaprio e Claire Danes; mesmos versos, Verona Beach. Peça e autor em fichas irmãs. Literatura no ecrã, não protocolo.',
    excerptEn:
      'Arts: Romeo + Juliet (1996, Baz Luhrmann) — Leonardo DiCaprio and Claire Danes; same verse, Verona Beach. Play and author on sister sheets. Screen literature, not a protocol.',
    excerptEs:
      'Artes: Romeu + Julieta (1996, Baz Luhrmann) — Leonardo DiCaprio y Claire Danes; mismos versos, Verona Beach. Pieza y autor en fichas hermanas. Literatura en pantalla, no protocolo.',
    slug: 'inspecao-filme-romeu-mais-julieta',
    date: '2026-08-22T03:30:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'Romeu + Julieta · filme 1996',
    coverImage: '/imagens/inspecoes/romeu-mais-julieta-filme-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  YT_ID,
  buildRomeuMaisJulietaFilmePost,
  buildRomeuMaisJulietaFilmeBodies
};
