'use strict';

/**
 * Artes · cinema: Transformers — brinquedo 1984 → filme 1986 → live-action 2007+.
 * Hierarquia: linha Hasbro/Takara primeiro; 2007 como entrada live-action;
 * ciclo Bay, Bumblebee e Transformers One como ecos / continuações.
 */

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

const YT_ID = 'CbX_SIz_9fk';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Transformers_(filme_de_2007)';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Transformers_(2007_film)';
const WIKI_SERIES = 'https://en.wikipedia.org/wiki/Transformers_(film_series)';
const WIKI_FRANQUIA = 'https://en.wikipedia.org/wiki/Transformers_(franchise)';
const WIKI_1986 = 'https://en.wikipedia.org/wiki/The_Transformers:_The_Movie';

function buildTransformersBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const coisas = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amorFe = '/posts/post-inspecao-arte-amor-e-fe.html';

  const body = `## Escopo

Inspeção editorial dos **filmes Transformers** — com recorte principal no **cinema live-action de 2007** (realização de **Michael Bay**; Paramount / DreamWorks / Hasbro) e mapa da **franquia no ecrã**. O **início de tudo** não é Bay: é a **linha de brinquedos** Hasbro + Takara (**1984**) e o desenho *The Transformers*. O **primeiro filme** é o animado **The Transformers: The Movie** (**1986**). Sem o brinquedo, não há Autobot no ecrã; sem 2007, não há esta entrada Hollywood inspecionada aqui.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · filme 2007](${WIKI}), [Wikipedia (EN) 2007](${WIKI_EN}), [série de filmes](${WIKI_SERIES}), [franquia](${WIKI_FRANQUIA}), [filme 1986](${WIKI_1986}), trailer Paramount (${YT}). Crédito: Hasbro / Takara / Paramount / DreamWorks / Bay / elenco e vozes — **sem afiliação**. **Não confundir** com Canais (YouTube) nem com [Legado](${legado}) canábico. Guerra Autobot/Decepticon, AllSpark e «forma que muda» são **figuras narrativas**. O laboratório **não** romantiza guerra, militarismo nem consumo de substâncias. Ficção de robots ≠ manual de combate. Indexar ≠ endosso da marca.

Esta ficha é Artes · **cinema / franquia**. Brinquedo e desenho entram como **génese**. Sequências Bay, *Bumblebee*, *Rise of the Beasts* e *Transformers One* entram como **mapa** — não substituem a entrada de 2007.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Recorte principal | **Transformers** (2007) — entrada live-action |
| Título original | *Transformers* |
| Ano âncora | **2007** (estreia Seul 10 jun.; EUA **3 jul.**) |
| Realização (2007) | **Michael Bay** |
| Argumento (2007) | Roberto Orci · Alex Kurtzman (história: John Rogers, Orci, Kurtzman) |
| Produção | Lorenzo di Bonaventura · Tom DeSanto · Don Murphy · Ian Bryce · exec. **Steven Spielberg** |
| Música | **Steve Jablonsky** |
| Duração | 143 min |
| Produção / distribuição | Paramount · DreamWorks · Hasbro · di Bonaventura Pictures |
| Elenco âncora | Shia LaBeouf (Sam) · Megan Fox (Mikaela) · Josh Duhamel · Tyrese Gibson · John Turturro · Jon Voight |
| Vozes âncora | **Peter Cullen** (Optimus Prime) · Hugo Weaving (Megatron) |
| Génese cultural | Brinquedos **Hasbro / Takara** (1984) + desenho Sunbow |
| Primeiro cinema | *The Transformers: The Movie* (**1986**, animação) |
| Tipo BudGanja | Arte — **brinquedo primeiro**; **filme 2007** como entrada live-action; resto = mapa |
| Elo Palavras | [objetos](${objetos}) · [caminho](${caminho}) · [respeito](${respeito}) · [gesto](${gesto}) · [criatividade](${criatividade}) |
| Elo Artes | [The Matrix](${matrix}) · [Venom](${venom}) · [DeLorean](${delorean}) · [História das Coisas](${coisas}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Fonte | [filme 2007 PT](${WIKI}) · [EN](${WIKI_EN}) · [série](${WIKI_SERIES}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **objecto que muda de forma** — o brinquedo 1984 e o lema *more than meets the eye* — antes da bilheteira de 2007.  
**H2:** no ecrã, a **entrada live-action** é **2007** (Bay / LaBeouf / Cullen). O ciclo Bay (2009–2017) é **eco**. *Bumblebee* (2018) e a linha seguinte são **outra continuidade** (reset suave), não «o mesmo filme alongado».  
**H3:** duas formas, um ser — parábola de [objetos](${objetos}) que escondem ofício: o carro **é** o robot; inspecionar o que o quotidiano disfarça. Par leve com [Venom](${venom}) (duas vozes / um corpo) e com [DeLorean](${delorean}) (o carro como camada), **sem** fundir obras.  
**H4:** a guerra no ecrã é **ficção de facções**. A colaboração do filme de 2007 com forças armadas dos EUA e com a General Motors é **facto de produção** — o laboratório **não** a transforma em doutrina.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte *desta* franquia *neste* mapa, sem pretender esgotar cada sequela.

Passos: génese (brinquedo / 1986) → entrada 2007 → mapa dos filmes → tese → elos → status.

## O início de tudo — brinquedo, desenho, primeiro filme

Fontes: [franquia](${WIKI_FRANQUIA}) · [1986](${WIKI_1986}) · [2007](${WIKI_EN}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Takara / Diaclone · Micro Change** | Peças japonesas de veículos e cassetes que **mudam de forma** — o gesto existe antes do nome inglês. |
| **1984** | Hasbro lança **The Transformers** nos EUA; desenho Sunbow; banda sonora e slogan *more than meets the eye*. Sem isto, não há Optimus cultural. |
| **Peter Cullen** | Voz de Optimus no desenho; **regressa** em 2007. Pessoa e ofício — não só «o robot». |
| **8 ago. 1986** | *The Transformers: The Movie* — **primeiro cinema**. Optimus morre; Unicron (voz: **Orson Welles**, um dos últimos trabalhos). G1 no ecrã, não Bay. |
| **2003–04** | Don Murphy / Tom DeSanto desenvolvem o live-action; Spielberg entra; Orci e Kurtzman escrevem. |
| **10 jun. / 3 jul. 2007** | Estreia Seul / EUA. ~**US$ 709,7 milhões**; 5.º filme de 2007 em receita mundial. |
| Produção 2007 | Forças armadas dos EUA e GM cedem veículos — **facto**; não é tese moral desta ficha. |
| Sequelas Bay | 2009 · 2011 · 2014 · 2017 — **ecos** do recorte 2007. |
| **2018–24** | *Bumblebee* (Travis Knight) = reset tonal; *Rise of the Beasts* (2023); *Transformers One* (2024, animação, origem Orion Pax / D-16). |

> **Hierarquia BudGanja:** brinquedo 1984 → filme 1986 → live-action 2007. Sem o objecto que transforma, o ecrã não tem o que inspecionar. Spotify / trailers / sequelas são descendentes.

## Mapa dos filmes (o que o pedido pede)

O utilizador pediu **os filmes**. O laboratório **nomeia** o ciclo — e **fixa** 2007 como entrada live-action.

| Filme | Ano | Realização | Papel nesta ficha |
|-------|-----|------------|-------------------|
| *The Transformers: The Movie* | **1986** | Nelson Shin | **Primeiro cinema** (G1); génese no ecrã |
| *Transformers* | **2007** | Michael Bay | **Entrada live-action** — recorte principal |
| *Revenge of the Fallen* | **2009** | Michael Bay | Eco Bayverse |
| *Dark of the Moon* | **2011** | Michael Bay | Eco Bayverse |
| *Age of Extinction* | **2014** | Michael Bay | Eco (Mark Wahlberg) |
| *The Last Knight* | **2017** | Michael Bay | Eco; recepção e bilheteira mais fracas |
| *Bumblebee* | **2018** | Travis Knight | Reset suave; outra continuidade |
| *Rise of the Beasts* | **2023** | Steven Caple Jr. | Continuidade pós-*Bumblebee* (Maximals) |
| *Transformers One* | **2024** | Josh Cooley | Origem animada (Orion / D-16) — **eco de génese**, não substitui 1984 |

Remakes, séries TV posteriores e jogos ficam **fora** do recorte (salvo o facto de a marca viver em vários meios).

## A obra de 2007 (síntese)

- Sam Witwicky herda uns óculos com coordenadas; Autobots e Decepticons procuram o **AllSpark** na Terra.  
- Bumblebee disfarça-se de Camaro; Optimus pede ajuda humana; Megatron é libertado na barragem.  
- Tom: acção + comédia de adolescente + espectáculo de efeitos. O laboratório guarda a **pergunta da forma** (*o que este objecto ainda é?*), não a estética da explosão.  
- Impacto: bilheteira forte; quatro prémios VES; nomeações Oscar (efeitos / som); franquia Paramount.

## Tese cultural BudGanja

| Tema nos filmes | Tradução editorial |
|-----------------|-------------------|
| *More than meets the eye* | Inspecionar o [objecto](${objetos}) — há ofício por baixo do disfarce |
| Alt-mode / robot | Duas formas, um ser — par cultural leve com [Venom](${venom}) («nós»), obras distintas |
| Carro que escolhe o condutor | [Gesto](${gesto}) + máquina; par com [DeLorean](${delorean}) (carro real vs camada de ficção) |
| Autobot × Decepticon | Facções de ficção — **não** manual de guerra |
| AllSpark / origem da vida | Mito de fábrica; o laboratório não o adopta como cosmologia |
| Brinquedo → ecrã → merchandising | Ciclo das [coisas](${coisas}) — extrair / fazer / vender; [como os ricos transformam](${ricos}) |
| Cullen / 1984 → 2007 | [Respeito](${respeito}) ao ofício da voz — pessoa, não só personagem |
| Bayhem vs *Bumblebee* | Dois tons da mesma marca; o método **data** cada entrada |

O laboratório **não** adopta Cybertron: usa a franquia como parábola de **inspecionar o que se apresenta como coisa inerte** — e de **não** transformar guerra de brinquedo em doutrina.

## Elo com outras Artes

| Recurso | Papel |
|---------|-------|
| [The Matrix](${matrix}) | Máquina e disfarce do real — outra pergunta, outra génese |
| [Venom](${venom}) | Coabitação de formas / vozes — par, não fusão |
| [DeLorean](${delorean}) | Objecto-carro primeiro; ficção como camada |
| [A História das Coisas](${coisas}) | Plástico, linha de montagem, descarte — o brinquedo também é coisa |
| [Amor e Fé](${amorFe}) | Outra ficha Artes do mesmo dia — canção; **não** trilha dos filmes |
| [Faça o melhor!](${mantra}) | O melhor *deste* mapa, sem fingir que cada sequela foi vista como génese |
| Hub [Artes](${hub}) · [Palavras](${palavras}) | Filme ≠ brinquedo ≠ biografia de Bay |

## Vídeo de referência (embed)

Trailer oficial Paramount do filme de **2007** — a entrada live-action.

| Campo | Valor |
|-------|-------|
| Título | Transformers \\| Official Trailer \\| Paramount Movies |
| ID | \`${YT_ID}\` |
| URL | [${YT}](${YT}) |
| Nota | Embed da **entrada 2007**; a génese continua a ser o [brinquedo / franquia](${WIKI_FRANQUIA}) |

@youtube ${YT_ID}

## Limites

- Não é walkthrough, ranking IMDb nem guia de «ordem para maratonar».  
- Não se inventa vida privada do elenco.  
- Colaboração militar e product placement: **facto de produção**, não sermão.  
- Distinto do [Legado](${legado}) canábico.  
- *Transformers One* e *Bumblebee* não apagam 1984 nem 2007.

## Como repetir o método

1. Quando a marca for brinquedo + desenho + filmes, **priorizar a génese do objecto**.  
2. Escolher a **entrada cinematográfica** (aqui: 2007 live-action; 1986 como primeiro ecrã).  
3. Mapear sequelas como ecos / continuações, sem fingir que são a origem.  
4. Declarar tese útil ao laboratório (forma, objecto, respeito ao ofício) — sem forçar elo canábico.  
5. Slug \`inspecao-filme-…\`.

## Status

**Aprovado na série Artes** — Transformers documentado com hierarquia **brinquedo 1984 → filme 1986 → live-action 2007**; ciclo Bay e reset 2018–24 como mapa; guerra e merchandising como facto, não como doutrina.

[▶ Trailer 2007](${YT}) · [▶ Wikipédia 2007](${WIKI}) · [▶ Série de filmes](${WIKI_SERIES}) · [▶ Objectos](${objetos}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **Transformers films**. The **main cut** is the **2007 live-action entry** (Michael Bay; Paramount / DreamWorks / Hasbro). Cultural origin is earlier: **Hasbro / Takara toys (1984)** and the Sunbow cartoon. First cinema: **The Transformers: The Movie (1986)**. Hierarchy: **toy → 1986 animation → 2007 live-action**. Bay sequels, *Bumblebee*, *Rise of the Beasts* and *Transformers One* are a **map**, not a substitute for 2007.

> Method note: [Wikipedia · 2007 film](${WIKI_EN}); [film series](${WIKI_SERIES}); [franchise](${WIKI_FRANQUIA}). Credit: Hasbro / Paramount / Bay. No affiliation. Autobot/Decepticon war is **fiction** — not a combat manual. US military / GM production support is **production fact**, not doctrine.

## Inspected object

| Field | Value |
|-------|-------|
| Anchor | **Transformers** (2007) |
| Director | **Michael Bay** |
| Voice craft | **Peter Cullen** (Optimus, from 1984) |
| BudGanja type | Art — **toy first**; **2007** as live-action entry |
| Date | ${inspected} |

## Film map

1986 animation (first screen) → 2007 Bay (live-action entry) → 2009–2017 Bay echoes → 2018 *Bumblebee* (soft reboot) → 2023 *Rise of the Beasts* → 2024 *Transformers One* (animated origin).

## Lab thesis

*More than meets the eye*: inspect the [object](${objetos}) that hides a second form. Two shapes, one being — light pair with [Venom](${venom}), distinct works. War on screen ≠ protocol. Merchandising sits near [The Story of Stuff](${coisas}).

@youtube ${YT_ID}

## Status

**Approved in Arts** — 1984 toy → 1986 film → 2007 live-action hierarchy; later titles as map.
`;

  const contentEs = `## Alcance

Inspección editorial de los **filmes Transformers**. El **recorte principal** es la **entrada live-action de 2007** (Michael Bay; Paramount / DreamWorks / Hasbro). El origen cultural es anterior: **juguetes Hasbro / Takara (1984)** y el dibujo Sunbow. Primer cine: **The Transformers: The Movie (1986)**. Jerarquía: **juguete → animación 1986 → live-action 2007**. Las secuelas Bay, *Bumblebee*, *Rise of the Beasts* y *Transformers One* son **mapa**, no sustituto de 2007.

> Nota: [Wikipedia · 2007](${WIKI_EN}); [serie](${WIKI_SERIES}). Sin afiliación. La guerra Autobot/Decepticon es **ficción** — no un manual. El apoyo militar / GM es **hecho de producción**, no doctrina.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Transformers** (2007) |
| Dirección | **Michael Bay** |
| Voz | **Peter Cullen** (Optimus, desde 1984) |
| Tipo BudGanja | Arte — **juguete primero**; **2007** como entrada live-action |
| Fecha | ${inspected} |

@youtube ${YT_ID}

## Estado

**Aprobada en Artes** — juguete 1984 → filme 1986 → live-action 2007; el resto como mapa.
`;

  return { body, contentEn, contentEs, ytId: YT_ID, wiki: WIKI };
}

function buildTransformersPost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildTransformersBodies();
  return artePost({
    title: 'Inspeção: Transformers — os filmes, a forma que muda e o que o objecto esconde',
    titleEn: 'Inspection: Transformers — the films, the changing form and what the object hides',
    titleEs: 'Inspección: Transformers — los filmes, la forma que cambia y lo que el objeto esconde',
    excerpt:
      'Artes · cinema: Transformers — brinquedo Hasbro/Takara 1984, filme 1986 e entrada live-action 2007 (Bay); mapa do ciclo Bay, Bumblebee e Transformers One.',
    excerptEn:
      'Arts · film: Transformers — Hasbro/Takara toy 1984, 1986 movie and 2007 live-action entry (Bay); map of the Bay cycle, Bumblebee and Transformers One.',
    excerptEs:
      'Artes · cine: Transformers — juguete Hasbro/Takara 1984, filme 1986 y entrada live-action 2007 (Bay); mapa del ciclo Bay, Bumblebee y Transformers One.',
    slug: 'inspecao-filme-transformers',
    date: '2026-08-20T15:30:00.000Z',
    seriesOrder: 62,
    seriesLabel: 'Transformers · Artes',
    coverImage: '/imagens/inspecoes/transformers-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTransformersPost,
  buildTransformersBodies,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN,
  WIKI_SERIES
};
