'use strict';

/**
 * Artes · tragédia «Romeu e Julieta» (Shakespeare).
 * Peça primeiro; autor em Pessoas. Tese: o nome é o nó das casas.
 * Não romantiza o desfecho; literatura, não protocolo.
 */

const { artePost } = require('./artes-inspecoes-posts.js');

function buildRomeuEJulietaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Romeu_e_Julieta';
  const wikiEn = 'https://en.wikipedia.org/wiki/Romeo_and_Juliet';
  const shake = '/posts/post-inspecao-figura-william-shakespeare.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const alquimista = '/posts/post-inspecao-arte-o-alquimista.html';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const gibson = '/posts/post-inspecao-figura-mel-gibson.html';
  const filme = '/posts/post-inspecao-filme-romeu-mais-julieta.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da tragédia **«Romeu e Julieta»** (*Romeo and Juliet*) — peça de **[William Shakespeare](${shake})**, escrita provavelmente em **1591–1596**, quarto Q1 em **1597**, Q2 em **1599**, texto do [Fólio](https://pt.wikipedia.org/wiki/First_Folio) em **1623**. O **início de tudo** é a **obra**: Verona, duas casas, dois nomes, um [nó](${no}) que o [coração](${coracao}) não escolheu. A biografia do autor fica em [Shakespeare](${shake}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Romeu e Julieta](${wiki}), [EN](${wikiEn}). Crédito: Shakespeare / domínio público. Sem afiliação com encenações, cinema ou o Globe. **Não confundir** com Canais nem com [Legado](${legado}). A peça é **literatura**: o laboratório **não** a trata como protocolo de fuga, de veneno nem de desfecho. Quando a dor do texto pedir companhia, aponta [Vida](${vida}). Sem citações longas da edição protegida de um tradutor contemporâneo — o argumento é público; a tradução de bolso pode não ser.

Pedido de campo: *Romeu e Julieta inspeção* + **foto** — o **dossiê holográfico da peça** entra como **capa desta ficha**. O dossiê do autor fica na capa de [Shakespeare](${shake}). Arte de campo, **não** fonte. Elo de ecrã: o filme de **Leonardo DiCaprio** — [Romeu + Julieta (1996)](${filme}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Romeu e Julieta** |
| Título EN | *Romeo and Juliet* |
| Autor | [William Shakespeare](${shake}) — biografia em Pessoas |
| Género | Tragédia (duas casas de Verona) |
| Génese | c. 1591–1596; Q1 **1597** («bad quarto»); Q2 **1599**; Fólio **1623** |
| Fonte anterior (contexto) | Poema de Arthur Brooke, *The Tragical History of Romeus and Juliet* (1562) — e novelle italianas; Shakespeare **refaz**, não inventa o enredo do zero |
| Tipo BudGanja | Arte — **peça primeiro**; autor em Pessoas |
| Elo Pessoas | [Shakespeare](${shake}) |
| Elo cinema | [Romeu + Julieta (1996)](${filme}) — Luhrmann · DiCaprio · Danes |
| Elo Palavras | [nó](${no}) · [nó na vida!](${noVida}) · [desatar o nó](${desatarNo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [Faça o melhor!](${mantra}) |
| Tese-âncora | *What’s in a name?* — o **nome** (Montague / Capulet) é o laço; a pessoa não é o apelido |
| Capa | Dossiê holográfico da **peça** — **arte, não fonte** |
| Fonte de partida | [Wikipédia · Romeu e Julieta](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **texto** — duas casas atadas por um [nó](${no}) de **nome**, não de substância.  
**H2:** «O que há num nome?» é prima da [etimologia](${etimologia}): perguntar se o rótulo é a coisa. Julieta nomeia a roseira; o lab nomeia o vocábulo.  
**H3:** [nó na vida!](${noVida}) é a figura viva do aperto; [desatar o nó](${desatarNo}) é o ofício que a peça **não** alcança a tempo — leitura editorial, **não** spoiler de método.  
**H4:** o desfecho trágico **não** se glamouriza. Literatura ≠ conselho.  
**H5:** traduções BR (Onestaldo de Pennafort, Millôr, e outras) são **palco da [língua portuguesa](${lingua})** — contexto, sem eleger uma edição.

## O início de tudo — génese da peça

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Enredo anterior | Brooke (1562) e a linha italiana — Shakespeare herda o **nó das casas** e reescreve o verso |
| c. 1595 | Datacão habitual da composição (intervalo 1591–1596 nas fontes) |
| **1597** | Q1 — texto curto / «bad quarto»; memória de palco, não edição crítica |
| **1599** | Q2 — texto mais pleno, base das edições modernas |
| **1623** | First Folio — guarda a peça no conjunto das Comédias, Histórias e Tragédias |
| Palco | Globe e companhia — afterlife começa no madeira, não no cartaz de cinema |

> **Hierarquia BudGanja:** sem a peça, não há ficha. O filme [Romeu + Julieta (1996)](${filme}) (Luhrmann / DiCaprio) tem **ficha própria**. Zeffirelli (1968) e *West Side Story* continuam **memória**, sem ficha nesta entrega.

## A obra (síntese)

- Verona: **Montagues** e **Capulets** — duas casas, um ódio herdado.  
- Romeu (Montague) e Julieta (Capulet) encontram-se; o [coração](${coracao}) cruza o apelido.  
- A pergunta da janela / «varanda»: o que vale o **nome** se a rosa cheira igual? — tesouro para a série Palavras.  
- Frade, carta que não chega, relógio que falha: o [caminho](${caminho}) da reconciliação chega **tarde**.  
- Desfecho: tragédia das casas — o laboratório lê o **custo do nó**, não ensina o gesto final. [Vida](${vida}) se a leitura apertar.

## Tese cultural BudGanja

| Tema na peça | Tradução editorial |
|--------------|-------------------|
| Apelido | [nó](${no}) herdado — Montague / Capulet como laço social, não essência |
| «What’s in a name?» | [Etimologia](${etimologia}) viva: o rótulo ≠ a coisa |
| Duas casas | [Nó na vida!](${noVida}) — aperto que não se escolheu |
| Carta / tempo | [Caminho](${caminho}) que falha — ofício de [desatar o nó](${desatarNo}) que a trama não cumpre a tempo |
| Palco | [Gesto](${gesto}) + verso — a palavra **actua** |
| Tradução BR | [Língua portuguesa](${lingua}) — Romeu, não só Romeo |

## Elo com Pessoas

Abrir [Shakespeare](${shake}) para o **autor e o ofício**. Esta ficha se o interesse for a **peça**.

| Recurso | Papel |
|---------|-------|
| [Shakespeare](${shake}) | Pessoa — Globe, Fólio, ofício da palavra |
| Hub [Pessoas](${pessoas}) | Biografias; não fundir com Artes |
| [Mel Gibson](${gibson}) | NIDA: *Romeo and Juliet* com Judy Davis — afterlife de actor, contexto |
| [O Alquimista](${alquimista}) · [O Dia do Curinga](${curinga}) | Outros **livros/obras primeiro**; aqui é **peça** |
| [Romeu + Julieta (1996)](${filme}) | Filme — Verona Beach; DiCaprio no ecrã |

## Afterlife (memória, não origem)

- Cinema âncora: [Romeu + Julieta (1996)](${filme}) — Baz Luhrmann; **Leonardo DiCaprio** (Romeu) e Claire Danes (Julieta).  
- Zeffirelli (1968) — cartaz, **sem** ficha nesta entrega.  
- *West Side Story* — outra cidade, outro nó étnico/territorial; **obra distinta**.  
- Palco escolar e companhias BR — a peça **vive** em [língua portuguesa](${lingua}).  
- Dois dossiês de campo: o de [Shakespeare](${shake}) é capa da **pessoa**; o desta ficha é capa da **peça**. Não fundir.

## Capa — o que o dossiê é e não é

O cartaz de campo mostra retrato, casas Montequio / Capuleto, linha do tempo e um painel «análise com IA». O laboratório **usa a imagem como capa**. Declara:

- génese, Verona e Brooke: **consenso** das fontes wiki, não do cartaz;  
- [Romeu + Julieta (1996)](${filme}): **ficha própria** (Luhrmann / DiCaprio); Zeffirelli, ballet e Broadway: **memória**;  
- «sentimento 98%» / análise por IA: **não** entram como prova;  
- o dossiê do autor (Hamlet, Globe, sonetos) fica na ficha [Shakespeare](${shake}).

## Limites

- **Ficha ≠ manual do desfecho.** Sem glamourizar morte.  
- Sem inventário de encenações.  
- Sem protocolar «como as casas se reconciliam» na vida real — isso é [desatar o nó](${desatarNo}) + [Faça o melhor!](${mantra}).  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovada na série Artes** — *Romeu e Julieta* primeiro; autor em [Shakespeare](${shake}). Tese: o nome é o [nó](${no}); a pessoa não é o apelido. Capa: dossiê holográfico da peça (arte, não fonte).

[▶ Artes](${hub}) · [▶ Shakespeare](${shake}) · [▶ Filme 1996](${filme}) · [▶ Nó](${no}) · [▶ Etimologia](${etimologia}) · [▶ Faça o melhor!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of the tragedy **Romeo and Juliet** — a play by [William Shakespeare](${shake}), likely written 1591–1596; Q1 1597, Q2 1599, Folio 1623. The **start of everything** is the **work**: Verona, two houses, two names, a [knot](${no}) the [heart](${coracao}) did not choose. The author’s life is in [Shakespeare](${shake}) (People).

> Independent audit. [Wikipedia](${wikiEn}). Public domain. **Literature, not a protocol.** If the text hurts, see [Vida](${vida}).

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Romeo and Juliet** · BR **Romeu e Julieta** |
| Author | [Shakespeare](${shake}) |
| Thesis | *What’s in a name?* — the **name** is the knot; the person is not the surname |
| Words | [knot](${no}) · [etymology](${etimologia}) · [heart](${coracao}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Status

**Approved in the Arts series** — play first; author in [Shakespeare](${shake}).

[▶ Arts](${hub}) · [▶ Shakespeare](${shake}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la tragedia **Romeo y Julieta** (*Romeu e Julieta*) — pieza de [William Shakespeare](${shake}), escrita hacia 1591–1596; Q1 1597, Q2 1599, Folio 1623. El **inicio de todo** es la **obra**: Verona, dos casas, dos nombres, un [nó](${no}) que el [coração](${coracao}) no eligió. La biografía está en [Shakespeare](${shake}).

> Auditoría independiente. [Wikipedia](${wiki}). Dominio público. **Literatura, no protocolo.** Si el texto aprieta, [Vida](${vida}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Romeu e Julieta** · *Romeo and Juliet* |
| Autor | [Shakespeare](${shake}) |
| Tesis | *What’s in a name?* — el **nombre** es el nudo; la persona no es el apellido |
| Palabras | [nó](${no}) · [etimologia](${etimologia}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Estado

**Aprobada en la serie Artes** — pieza primero; autor en [Shakespeare](${shake}).

[▶ Artes](${hub}) · [▶ Shakespeare](${shake}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRomeuEJulietaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildRomeuEJulietaBodies();
  return artePost({
    title: 'Inspeção: Romeu e Julieta — o nome é o nó das casas',
    titleEn: 'Inspection: Romeo and Juliet — the name is the knot of the houses',
    titleEs: 'Inspección: Romeo y Julieta — el nombre es el nudo de las casas',
    excerpt:
      'Artes: Romeu e Julieta (Shakespeare) — tragédia de Verona; o apelido é o nó, a pessoa não é o nome. Autor em Pessoas. Literatura, não protocolo. Faça o melhor!',
    excerptEn:
      'Arts: Romeo and Juliet (Shakespeare) — Verona tragedy; the surname is the knot, the person is not the name. Author in People. Literature, not a protocol. Do your best!',
    excerptEs:
      'Artes: Romeu e Julieta (Shakespeare) — tragedia de Verona; el apellido es el nudo, la persona no es el nombre. Autor en Personas. Literatura, no protocolo. ¡Haz lo mejor!',
    slug: 'inspecao-arte-romeu-e-julieta',
    date: '2026-08-22T03:21:00.000Z',
    seriesOrder: seriesOrder,
    seriesLabel: 'Romeu e Julieta · Artes',
    coverImage: '/imagens/inspecoes/romeu-e-julieta-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRomeuEJulietaPost,
  buildRomeuEJulietaBodies
};
