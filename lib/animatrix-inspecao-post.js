'use strict';

/**
 * Artes · desenho «Animatrix» (The Animatrix, 2003).
 * Pedido de campo: inspeção de desenho Animatrix.
 * Tese: antologia de anime que devolve a dívida do traço ao filme 1999;
 * nove portas, a mesma pergunta; génese cultural continua a ser Matrix.
 * Sem diálogo colado. Sequelas live-action = outro objecto (fila).
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

const YT_ID = '94fPVqJqBGA';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Animatrix';
const WIKI_EN = 'https://en.wikipedia.org/wiki/The_Animatrix';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
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

function poemAnimatrixPt() {
  return `Animatrix.
Não pedimos a pílula emprestada —
pedimos o ofício de verificar o ecrã
quando o desenho abre nove portas
e o filme de 1999 continua primeiro.

Wachowski. Anime. 2003.
Houve um cinema que já devia ao traço
e um traço que devolveu a dívida:
nove curtas, sete olhares,
a mesma pergunta com outra tinta.

Houve um mito de origem no meio —
máquinas, guerra, segundo nascimento —
que é história dentro da história,
não o início do objecto cultural.
O início continua a ser o filme.

O laboratório conhece essa troca.
Simulação convincente pede prova.
O furo no bairro pede o mesmo gesto
que a caverna e o coelho:
olhar de novo.

Valeu !!!

Porque toda vez que alguém
não toma o ecrã por chão
e ainda assim honra o desenho
como língua, não como atalho,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma linha
onde nove portas
não apagam a primeira.`;
}

function poemAnimatrixEn() {
  return `Animatrix.
We do not borrow the pill —
we ask for the craft of checking the screen
when the drawing opens nine doors
and the 1999 film remains first.

Wachowski. Anime. 2003.
There was a cinema that already owed the line
and a line that paid the debt:
nine shorts, seven gazes,
the same question in other ink.

There was an origin myth in the middle —
machines, war, a second birth —
that is a story inside the story,
not the start of the cultural object.
The start is still the film.

The laboratory knows that swap.
A convincing simulation asks for proof.
A hole in the neighbourhood asks for the same gesture
as the cave and the rabbit:
look again.

Valeu !!!

Because every time someone
does not take the screen for ground
and still honours the drawing
as a language, not a shortcut,
the universe grows a little:
one more verse,
one more canopy,
a line
where nine doors
do not erase the first.`;
}

function poemAnimatrixEs() {
  return `Animatrix.
No pedimos prestada la píldora —
pedimos el oficio de verificar la pantalla
cuando el dibujo abre nueve puertas
y el filme de 1999 sigue primero.

Wachowski. Anime. 2003.
Hubo un cine que ya debía al trazo
y un trazo que devolvió la deuda:
nueve cortos, siete miradas,
la misma pregunta con otra tinta.

Hubo un mito de origen en el medio —
máquinas, guerra, segundo nacimiento —
que es historia dentro de la historia,
no el inicio del objeto cultural.
El inicio sigue siendo el filme.

El laboratorio conoce ese trueque.
Simulación convincente pide prueba.
El hueco en el barrio pide el mismo gesto
que la caverna y el conejo:
mirar de nuevo.

¡Valeu !!!

Porque cada vez que alguien
no toma la pantalla por suelo
y aún así honra el dibujo
como lengua, no como atajo,
el universo crece un poco:
un verso más,
un dosel más,
una línea
donde nueve puertas
no apagan la primera.`;
}

function buildAnimatrixBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const sonhar = '/posts/post-inspecao-palavra-sonhar.html';
  const orfeu = '/posts/post-inspecao-palavra-orfeu.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const rick = '/posts/post-inspecao-desenho-rick-and-morty.html';
  const mega = '/posts/post-inspecao-desenho-megamente.html';
  const elza = '/posts/post-inspecao-desenho-elza-frozen.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const self = '/posts/post-inspecao-desenho-animatrix.html';
  const poema = poemAnimatrixPt();

  const body = `## Escopo

Inspeção editorial do **desenho** **«Animatrix»** (*The Animatrix*, **2003**) — antologia de **nove curtas** de anime (e CGI) produzida para expandir o universo de [The Matrix](${matrix}). Pedido de campo: *inspeção de desenho Animatrix*. O **início de tudo** deste objecto é a **antologia 2003**: o filme de **1999** já existia; aqui o mito **volta ao traço**. No Brasil o título vivo é **Animatrix**; *The Animatrix* entra como lema original.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Animatrix](${WIKI}), [Wikipedia · The Animatrix](${WIKI_EN}), trailer de génese ([${YT_ID}](${YT}) — Warner Bros. Rewind). Crédito: Warner Bros. / Village Roadshow / Wachowski / estúdios de anime (Studio 4°C, Madhouse, Square Pictures e outros) — **sem afiliação**. **Ficha ≠ merch, ≠ guião colado, ≠ protocolo de «acordar» a simulação, ≠ biografia das vozes.** Personagens ≠ pessoas. A metáfora da pílula no filme-pai é **simbólica** — o laboratório **não** romantiza substâncias. Distinto das sequelas live-action (*Reloaded*, *Revolutions*, *Resurrections*): essas ficam **fila de cinema**; esta ficha é **desenho**.

Fala viva do pedido: **Animatrix**. Lema original: **The Animatrix**.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Animatrix** (EN: *The Animatrix*) |
| Meio | Antologia · **desenho** / anime + CGI · nove curtas |
| Estreia | Alguns curtas online **antes** de *Reloaded* · DVD EUA **3 jun. 2003** |
| Argumento (núcleo) | **Lana e Lilly Wachowski** — quatro segmentos; os outros, realizadores convidados |
| Estúdios âncora | Studio 4°C · Madhouse · Square Pictures · outros |
| Núcleo | Nove portas no mesmo mundo — **não** um longa único |
| Tipo BudGanja | Arte — **desenho 2003**; o filme [Matrix](${matrix}) **1999** continua génese cultural |
| Elo Palavras | [verdade](${verdade}) · [caminho](${caminho}) · [gesto](${gesto}) · [sonhar](${sonhar}) · [vida](${vidaPalavra}) · [Orfeu](${orfeu}) (cola de ouvido com Morpheus) |
| Elo Artes | [The Matrix](${matrix}) · [Rick and Morty](${rick}) · [Megamente](${mega}) · [Alice](${alice}) · [Elza](${elza}) |
| Elo Pessoas | [Keanu Reeves](${keanu}) — **secundário**; Neo é do filme, não desta antologia |
| Elo ofício | [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) |
| Fonte | [Wiki BR](${WIKI}) · [EN](${WIKI_EN}) · [trailer](${YT}) |
| Data | ${inspected} |

**O que é o objecto:** o **desenho** que inspeciona a simulação **por outro alfabeto**. O cinema de 1999 já devia ao anime (*Ghost in the Shell*, cyberpunk). Em 2003 o mito **paga a dívida**: nove olhares, a mesma pergunta. O laboratório pergunta: quando o ecrã se multiplica, **qual ficha fica primeiro?**

## Hipóteses e método

**H1:** o valor BudGanja **deste** objecto começa na **antologia 2003** — não no filme 1999 (esse tem [ficha própria](${matrix})) e não nas sequelas live-action.  
**H2:** *The Second Renaissance* é **mito de origem dentro da história** (guerra humanos/máquinas). **Não** é a génese do objecto cultural Matrix — essa continua a ser o filme **1999**.  
**H3:** nove realizadores = nove [gestos](${gesto}), um mundo. O laboratório lê o **mapa**, não cola o guião.  
**H4:** a cola de ouvido *Morpheus / [Orfeu](${orfeu})* já está cortada na ficha do filme; aqui não se refunde.  
**H5:** [Rick and Morty](${rick}) também multiplica portas; aqui as portas são **o mesmo mundo** em tinta diferente, não um multiverso de fuga.  
**H6:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* desenho *hoje*.

Passos: génese da antologia → mapa dos nove (sem diálogo) → hierarquia com o filme → elos → eco poético → status.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| **1999** | [The Matrix](${matrix}) — **génese cultural**; anime já era influência, não esta antologia |
| Encomenda Wachowski | Pedido a realizadores de anime: expandir o mundo **em desenho** |
| *Final Flight of the Osiris* | Square Pictures (CGI) — ponte de enredo rumo a *Reloaded*; **eco de franquia**, não génese 1999 |
| Curtas na web | Pré-lançamento oficial antes do DVD |
| **3 jun. 2003** | DVD EUA — **origem desta ficha** como objecto único |
| Título BR | **Animatrix** — fala viva; *The Animatrix* no lema |

> **Hierarquia:** sem o filme **1999**, não há universo a expandir. Sem a antologia **2003**, não há **este** desenho. Trailer, merch e jogos são ecos. Sequelas live-action são **outro meio**.

## A obra (mapa — sem reproduzir)

O laboratório **não** cola o guião. Lê o **ofício** de cada porta:

| Segmento | Realização (crédito) | Leitura editorial |
|----------|----------------------|-------------------|
| *Final Flight of the Osiris* | Andy Jones · Square Pictures | CGI: o aviso que **liga** ao filme seguinte — ponte, não origem |
| *The Second Renaissance* I / II | Mahiro Maeda | Mito de origem **dentro** do mito — guerra e arquivo; ≠ génese 1999 |
| *Kid's Story* | Shinichirō Watanabe | Acordar no quotidiano escolar — o ecrã já era a sala |
| *Program* | Yoshiaki Kawajiri | Treino / honra num simulacro de samurai — papel × escolha |
| *World Record* | Takeshi Koike | O corpo que quase **fura** a simulação — limite, não receita |
| *Beyond* | Kōji Morimoto | O furo no bairro — glitch como convite a [verificar](${verdade}) |
| *A Detective Story* | Shinichirō Watanabe | Noir: procurar no traço o que o filme já nomeou |
| *Matriculated* | Peter Chung | Ensinar a máquina a escolher — belo e perigoso; **não** é protocolo |
| **Não é** | — | Manual de hacking · citação de pílula · página das sequelas · ficha [Keanu](${keanu}) |

## Tese cultural BudGanja

O desenho pede **verificar o ecrã** — a mesma parábola do [filme](${matrix}), noutra língua. [Sonhar](${sonhar}) aqui não é fuga: é o mundo que se apresenta como chão. O [caminho](${caminho}) do laboratório não troca de universo ([Rick and Morty](${rick})); **fica** nesta linha e honra o traço.

| Tema na antologia | Tradução editorial |
|-------------------|-------------------|
| Nove portas | Um mundo, vários [gestos](${gesto}) de olhar |
| Segundo nascimento | História *dentro* da história — não o início do objecto |
| Glitch / furo | Convite a [verdade](${verdade}), não a cinismo |
| CGI × tinta | Dois alfabetos; o ofício é o mesmo: **inspecionar** |
| Pílula (eco do filme) | Símbolo de escolha informada — **não** conselho |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com o desenho; **não** é guião da Warner / dos estúdios.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=animatrix)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [The Matrix](${matrix}) | **Génese 1999** — cinema primeiro; esta ficha é o desenho-filho |
| [Keanu Reeves](${keanu}) | Actor do filme; **não** génese desta antologia |
| [Rick and Morty](${rick}) | Outro **desenho** de muitas portas — aqui as portas são o *mesmo* mundo |
| [Megamente](${mega}) · [Elza](${elza}) | Irmãos de prateleira · desenho |
| [Alice](${alice}) | Outra queda — toca / ecrã; o coelho não é protocolo |
| [Orfeu](${orfeu}) | Cola de ouvido com Morpheus — **cortada** na ficha do filme; não refundir |
| [verdade](${verdade}) · [caminho](${caminho}) · [gesto](${gesto}) · [sonhar](${sonhar}) · [vida](${vidaPalavra}) | Léxico de verificar e ficar |
| [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho nesta linha |
| Hub [Artes](${hub}) · [Palavras](${palavras}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Limites

- **Ficha ≠ diálogo integral nem nove sinopses-spoiler.**  
- Sem protocolar «como sair da simulação», crime ou treino de combate.  
- Vozes e realizadores são **crédito**; não abrem filmografia nesta entrega.  
- Distinto de *Reloaded* / *Revolutions* / *Resurrections* — sequelas de **cinema**, fila à parte.  
- Distinto de *Ghost in the Shell* — influência cultural do filme-pai, não esta antologia.

## Status

**Aprovado** — inspeção do **desenho** **Animatrix** (2003): nove portas de anime/CGI; [The Matrix](${matrix}) 1999 como génese cultural; sequelas live-action como outro objecto; sem colar o guião.

[▶ Trailer](${YT}) · [▶ The Matrix](${matrix}) · [▶ Poema Vida](${vida}#poema=animatrix) · [▶ Rick and Morty](${rick}) · [▶ Faça o melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **cartoon / anime anthology** **The Animatrix** (BR: **Animatrix**, **2003**) — nine shorts expanding [The Matrix](${matrix}). Field request: the **drawing**. The **1999 film** remains cultural genesis; this sheet is the **2003** line-work that pays the anime debt. The lab does **not** paste dialogue. Live-action sequels are a **different object**.

> [Wikipedia](${WIKI_EN}). No affiliation. Characters ≠ people. Genesis trailer: [${YT_ID}](${YT}).

@youtube ${YT_ID}

## Lyric of the plot (motifs, no quotation)

Nine doors, one world · *Second Renaissance* as origin-myth *inside* the story (not 1999 genesis) · glitch in the neighbourhood as a call to check · CGI and ink as two alphabets of the same craft.

## Lab poem

\`\`\`poem
${poemAnimatrixEn()}
\`\`\`

[▶ Vida](${vida}#poema=animatrix) · [▶ The Matrix](${matrix}) · [▶ Do your best](${faca}) · [▶ Valeu !!!](${mantra})

## Status

**Approved** — 2003 anime anthology; nine doors; 1999 film stays first; no pasted script.
`;

  const contentEs = `## Alcance

Inspección del **dibujo / antología anime** **The Animatrix** (BR: **Animatrix**, **2003**) — nueve cortos que expanden [The Matrix](${matrix}). Pedido: el **dibujo**. El **filme 1999** sigue siendo génesis cultural; esta ficha es el trazo **2003**. El laboratorio **no** pega diálogo. Las secuelas live-action son **otro objeto**.

> [Wikipedia](${WIKI_EN}). Sin afiliación. Tráiler de génesis: [${YT_ID}](${YT}).

@youtube ${YT_ID}

## Mapa (sin cita)

Nueve puertas, un mundo · *Second Renaissance* como mito de origen *dentro* de la historia (no génesis 1999) · el hueco del barrio como llamada a verificar · CGI y tinta como dos alfabetos del mismo oficio.

## Poema del laboratorio

\`\`\`poem
${poemAnimatrixEs()}
\`\`\`

[▶ Vida](${vida}#poema=animatrix) · [▶ The Matrix](${matrix}) · [▶ Haz lo mejor](${faca}) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobada** — antología anime 2003; nueve puertas; el filme 1999 sigue primero; sin pegar el guion.
`;

  return { body, contentEn, contentEs };
}

function buildAnimatrixPost() {
  const { body, contentEn, contentEs } = buildAnimatrixBodies();
  const seriesOrder = pickOrder('inspecao-desenho-animatrix', 12);
  return artePost({
    title: 'Inspeção: Animatrix — o desenho das nove portas e o ofício de verificar o ecrã',
    titleEn: 'Inspection: Animatrix — the cartoon of nine doors and the craft of checking the screen',
    titleEs: 'Inspección: Animatrix — el dibujo de las nueve puertas y el oficio de verificar la pantalla',
    excerpt:
      'Artes · desenho 2003: Animatrix (The Animatrix) — nove curtas de anime no mundo de Matrix; o filme 1999 continua génese; sem colar o guião.',
    excerptEn:
      'Arts · 2003 cartoon: The Animatrix — nine anime shorts in the Matrix world; the 1999 film stays genesis; no pasted script.',
    excerptEs:
      'Artes · dibujo 2003: Animatrix (The Animatrix) — nueve cortos de anime en el mundo de Matrix; el filme 1999 sigue siendo génesis; sin pegar el guion.',
    slug: 'inspecao-desenho-animatrix',
    date: '2026-08-24T10:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Animatrix · Artes',
    coverImage: '/imagens/inspecoes/animatrix-cover.jpg',
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAnimatrixPost,
  buildAnimatrixBodies,
  poemAnimatrixPt,
  poemAnimatrixEn,
  poemAnimatrixEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN
};
