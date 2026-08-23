'use strict';

/**
 * Artes · desenho «Frozen» / personagem Elza (Disney, 2013).
 * Pedido: Elza de Frozen — o mesmo molde de Megamente + clipes *VEVO junto.
 * Fala viva: Elza. Sem letra integral.
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

const YT_TRAILER = 'TbQm5doF_Uc';
const YT = 'https://www.youtube.com/watch?v=' + YT_TRAILER;
const LET_IT_GO_ID = 'L0MK7qz13bU';
const LET_IT_GO = 'https://www.youtube.com/watch?v=' + LET_IT_GO_ID;
const DISNEY_VEVO = 'https://www.youtube.com/@DisneyMusicVEVO';
const WIKI = 'https://pt.wikipedia.org/wiki/Frozen_%28filme_de_2013%29';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Frozen_%282013_film%29';
const WIKI_ELSA = 'https://pt.wikipedia.org/wiki/Elsa_%28Frozen%29';

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

function poemElzaPt() {
  return `Elza.
Não pedimos a letra emprestada —
pedimos o ofício de não esconder
o que o gelo já sabia fazer
quando o medo pedia porta fechada.

Frozen. Arendelle. Disney.
Houve uma rainha ensinada a ser
a menina certa —
e um inverno que saiu do peito
quando a coroa apertou demais.
Houve uma irmã a bater à porta.
Houve um palácio de gelo
que não é o Ártico da Tamara:
é o ofício de mostrar o poder
sem congelar quem ama.

O laboratório conhece esse frio.
Não é maldição.
É gesto que o medo trancou.
Soltar não é abandonar a cidade —
é deixar o ofício à vista
e voltar a abrir a porta.

Valeu !!!

Porque toda vez que alguém
mostra o gelo sem fechar o reino,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma irmã
que ainda cabe no ofício.`;
}

function poemElzaEn() {
  return `Elsa.
We do not borrow the lyric —
we ask for the craft of not hiding
what the ice already knew how to do
when fear asked for a closed door.

Frozen. Arendelle. Disney.
There was a queen taught to be
the right girl —
and a winter that left the chest
when the crown pressed too hard.
There was a sister at the door.
There was an ice palace
that is not Tamara’s Arctic:
it is the craft of showing power
without freezing who you love.

The laboratory knows that cold.
It is not a curse.
It is a gesture fear locked.
Letting go is not leaving the city —
it is putting the craft in sight
and opening the door again.

Valeu !!!

Because every time someone
shows the ice without shutting the kingdom,
the universe grows a little:
one more verse,
one more canopy,
a sister
that still fits the craft.`;
}

function poemElzaEs() {
  return `Elza.
No pedimos prestada la letra —
pedimos el oficio de no esconder
lo que el hielo ya sabía hacer
cuando el miedo pedía puerta cerrada.

Frozen. Arendelle. Disney.
Hubo una reina enseñada a ser
la niña correcta —
y un invierno que salió del pecho
cuando la corona apretó de más.
Hubo una hermana a la puerta.
Hubo un palacio de hielo
que no es el Ártico de Tamara:
es el oficio de mostrar el poder
sin congelar a quien se ama.

El laboratorio conoce ese frío.
No es maldición.
Es un gesto que el miedo cerró.
Soltar no es abandonar la ciudad —
es dejar el oficio a la vista
y volver a abrir la puerta.

¡Valeu !!!

Porque cada vez que alguien
muestra el hielo sin cerrar el reino,
el universo crece un poco:
un verso más,
un dosel más,
una hermana
que aún cabe en el oficio.`;
}

function buildElzaFrozenBodies() {
  const inspected = '2026-08-23';
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
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const invernagem = '/posts/post-inspecao-palavra-invernagem.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const moana = '/posts/post-inspecao-filme-moana.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const megamente = '/posts/post-inspecao-desenho-megamente.html';
  const disneyJr = '/posts/post-inspecao-canal-disneyjr.html';
  const vevoCanal = '/posts/post-inspecao-canal-vevo.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const radio = '/radio/';
  const poema = poemElzaPt();

  const body = `## Escopo

Inspeção editorial da **Elza** (*Elsa*) no desenho **«Frozen»** (*Frozen: Uma Aventura Congelante*, **2013**) — longa da **Walt Disney Animation**, realização de **Chris Buck** e **Jennifer Lee**. Pedido de campo: *Elza de Frozen* — o **mesmo molde** de [Megamente](${megamente}): **desenho primeiro**, mapa sem colar letra/diálogo, clipes oficiais *VEVO **junto** da ficha. Fala viva: **Elza**. Lema oficial: **Elsa**. O **início de tudo** é a **obra 2013** e a rainha de Arendelle cujo [gelo](${gelo}) o [medo](${medo}) ensinou a esconder. *Frozen 2* (2019) e a canção *Show Yourself* ficam como **eco**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Frozen (2013)](${WIKI}), [Elsa](${WIKI_ELSA}), [Wikipedia (EN)](${WIKI_EN}), trailer ([${YT_TRAILER}](${YT})), clipe [DisneyMusicVEVO · Let It Go](${LET_IT_GO}). Crédito: Disney / Walt Disney Records — **sem afiliação**. **Ficha ≠ protocolo de isolamento, ≠ Ártico real.** O [inverno](${inverno}) da [Tamara](${tamara}) / [*Bom dia, Inverno*](${bomDia}) é **outra ficha** (ofício no gelo vivo). Aqui o gelo é **parábola de poder e porta**. **Não reproduz a letra** de *Let It Go* / *Livre Estou* (direitos). Personagem ≠ pessoa. Distinto de [Disney Jr.](${disneyJr}) (canal de desenhos em PT).

@youtube ${YT_TRAILER}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Personagem | **Elza** (oficial: **Elsa** de Arendelle) |
| Obra | **Frozen** (BR: *Uma Aventura Congelante*) |
| Ano | **2013** (estreia EUA 27 nov.; Brasil 3 jan. 2014) |
| Realização | **Chris Buck** · **Jennifer Lee** |
| Canções | Kristen Anderson-Lopez · Robert Lopez |
| Voz (EN) | **Idina Menzel** (Elsa) · Kristen Bell (Anna) |
| Tipo BudGanja | Arte — **desenho 2013**; a **personagem** como ofício de não esconder o poder |
| ≠ | Página da saga inteira · live-action · merch · [invernagem](${invernagem}) ártica |
| Elo gelo lab | [gelo](${gelo}) · [inverno](${inverno}) · [*Bom dia, Inverno*](${bomDia}) — **par**, não o mesmo objecto |
| Elo Palavras | [medo](${medo}) · [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [vida](${vidaPalavra}) |
| Elo Artes | [Moana](${moana}) · [Divertida Mente](${divertida}) · [Megamente](${megamente}) |
| Elo VEVO | [Canal VEVO](${vevoCanal}) · [DisneyMusicVEVO](${DISNEY_VEVO}) · *Let It Go* |
| Elo canal | [Disney Jr.](${disneyJr}) — desenhos em PT; aqui a **obra 2013** |
| Fonte | [Wiki filme](${WIKI}) · [Wiki Elsa](${WIKI_ELSA}) · [trailer](${YT}) · [Let It Go](${LET_IT_GO}) |
| Data | ${inspected} |

**O que é o objecto:** a **Elza** no desenho — coroa, irmã, porta fechada, [gelo](${gelo}) que o [medo](${medo}) trancou. O laboratório pergunta: soltar o poder é abandonar o reino, ou **abrir a porta** sem congelar quem ama?

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2013** (Buck / Lee / Arendelle) — antes de *Frozen 2*, shorts e parque.  
**H2:** **esconder** o gelo é o [medo](${medo}) a mandar no [gesto](${gesto}); **mostrar** não é vilania — é ofício à vista. Distinto de [Megamente](${megamente}): lá o papel (vilão/herói) é fato; aqui o fato é «menina certa».  
**H3:** *Let It Go* (DisneyMusicVEVO) é **transporte oficial** da tese da personagem — **não** substitui o filme e **não** se cola a letra.  
**H4:** o [inverno](${inverno}) da [Tamara](${tamara}) é gelo **que prende o barco**; o inverno da Elza é gelo **que sai do peito**. Dois ofícios.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* gelo *hoje*.

Passos: génese → mapa (sem letra) → clipes VEVO junto → eco poético → status.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| **2013** | Longa Disney Animation — **origem** desta Elza no ecrã |
| Autoria | Buck · Lee; canções Lopez / Anderson-Lopez |
| Oscar | Canção original (*Let It Go*) — eco industrial, não génese da personagem |
| BR | Título *Uma Aventura Congelante*; fala viva **Elza**; *Livre Estou* = a mesma canção em PT |
| **2019** | *Frozen 2* — **eco** (*Show Yourself*); não abre esta ficha |

> **Hierarquia:** sem *Frozen* **2013**, não há Elza a inspecionar. Clipe VEVO e sequela são descendentes.

## A obra (mapa — sem reproduzir)

O laboratório **não** cola o guião nem a letra. Lê o **ofício** da Elza:

| Motivo | Leitura editorial |
|--------|-------------------|
| **Porta fechada** | [Medo](${medo}) a ensinar a esconder o [gesto](${gesto}) |
| **Coroa / menina certa** | Papel de palco — como o fato de [Megamente](${megamente}), outro recorte |
| **Gelo que sai** | Poder = ofício; maldição é o **fecho** da porta, não a matéria |
| **Irmã à porta** | [Caminho](${caminho}) de volta — Anna pede abertura, não perfeição |
| **Palácio de gelo** | Isolamento que parece segurança |
| **Inverno eterno na cidade** | O medo da rainha vira clima dos outros — [verdade](${verdade}) do custo |
| **Não é** | Letra colada · manual de «largar tudo» · ficha da [invernagem](${invernagem}) |

## Tese cultural BudGanja

Soltar o gelo **não** é abandonar o ofício da cidade. É deixar de fingir que o poder não existe. [Faça o melhor](${faca}) aqui: mostrar sem congelar a irmã.

| Tema no desenho | Tradução editorial |
|-----------------|-------------------|
| Esconder | [Medo](${medo}) no volante |
| Mostrar | [Gesto](${gesto}) à vista |
| Isolar | Palácio — fuga disfarçada de coroa |
| Voltar | Porta outra vez — [vida](${vidaPalavra}) em conjunto |
| Gelo lab | [Gelo](${gelo}) da Tamara prende o barco; o da Elza sai do peito |

## Clipes VEVO junto desta ficha

A [rede VEVO](${vevoCanal}) (família **DisneyMusicVEVO**) é **transporte oficial**. O desenho continua primeiro.

### Canção da personagem (DisneyMusicVEVO)

| Clipe | Canal | Leitura junto da Elza |
|-------|-------|------------------------|
| *Let It Go* (sing-along do filme) | [DisneyMusicVEVO](${LET_IT_GO}) | Mostrar o gelo — **sem** colar o texto; BR *Livre Estou* é a mesma tese em PT |

@youtube ${LET_IT_GO_ID}

> Hierarquia: **Elza 2013** primeiro. O clipe é eco musical licenciado. Sem ficha própria da canção nesta entrega (a personagem basta).

### Já na inspeção do [canal VEVO](${vevoCanal})

| Clipe (ficha) | Por que fica junto |
|---------------|--------------------|
| [Send Me On My Way](${sendMe}) | [Caminho](${caminho}) depois da porta — partir sem abandonar o ofício |
| [Só os Loucos Sabem](${loucos}) | Recomeço: quem fica vê; a Elza volta a abrir |
| [Three Little Birds](${birds}) | Ficar sem pânico — âncora da [Rádio](${radio}) |
| [Megamente](${megamente}) · ElvisPresleyVEVO | Outro desenho com clipe *VEVO **junto** — papel × pessoa |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a Elza; **não** é letra da Disney.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=elza)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Canal VEVO](${vevoCanal}) · [DisneyMusicVEVO](${DISNEY_VEVO}) | Transporte do clipe *Let It Go* |
| [Disney Jr.](${disneyJr}) | Hub de desenhos em PT — irmão de canal, não esta ficha |
| [Moana](${moana}) | Outro desenho Disney de vocação (mar × gelo) |
| [Divertida Mente](${divertida}) | [Medo](${medo}) na sala de comando |
| [Megamente](${megamente}) | Papel de palco × ofício — molde desta entrega |
| [gelo](${gelo}) · [inverno](${inverno}) · [*Bom dia, Inverno*](${bomDia}) · [Tamara](${tamara}) | Gelo **real** / ofício ártico — par, não duplicata |
| [medo](${medo}) · [gesto](${gesto}) · [caminho](${caminho}) · [vida](${vidaPalavra}) | Léxico |
| [Faça o melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |
| Hub [Artes](${hub}) · [Palavras](${palavras}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Limites

- **Ficha ≠ letra integral** (*Let It Go* / *Livre Estou*).  
- Sem protocolar isolamento nem «largar a família».  
- Distinto da [invernagem](${invernagem}) de Tamara.  
- *Frozen 2* = eco.

## Status

**Aprovado** — inspeção da **Elza** no desenho **Frozen** (2013): gelo × [medo](${medo}) × porta; clipe [DisneyMusicVEVO](${LET_IT_GO}) **junto** desta ficha; par [Megamente](${megamente}).

[▶ Trailer](${YT}) · [▶ Let It Go · DisneyMusicVEVO](${LET_IT_GO}) · [▶ Canal VEVO](${vevoCanal}) · [▶ Poema Vida](${vida}#poema=elza) · [▶ Megamente](${megamente}) · [▶ Gelo](${gelo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Elsa** (**Elza** in living PT) in **Frozen** (**2013**, Disney). Same mould as [Megamind](${megamente}): drawing first; no pasted lyric; official *VEVO clip **beside** the sheet. Ice as craft fear locked behind a door — not Tamara’s Arctic.

> [Wikipedia](${WIKI_EN}). [Let It Go · DisneyMusicVEVO](${LET_IT_GO}). No affiliation.

@youtube ${YT_TRAILER}

@youtube ${LET_IT_GO_ID}

## Motif map (no quotation)

Closed door / the “right girl” costume / ice that leaves the chest / sister knocking / palace as isolation / winter that falls on the city.

## Lab poem

\`\`\`poem
${poemElzaEn()}
\`\`\`

[▶ Vida](${vida}#poema=elza) · [▶ VEVO](${vevoCanal}) · [▶ Valeu !!!](${mantra})

## Status

**Approved** — Elsa in Frozen 2013; DisneyMusicVEVO *Let It Go* beside the sheet; no pasted lyric.
`;

  const contentEs = `## Alcance

Inspección de **Elsa** (habla viva **Elza**) en **Frozen** (**2013**, Disney). El mismo molde que [Megamente](${megamente}): dibujo primero; sin pegar la letra; clip *VEVO **junto** a la ficha.

> [Wikipedia](${WIKI_EN}). [Let It Go](${LET_IT_GO}).

@youtube ${YT_TRAILER}

@youtube ${LET_IT_GO_ID}

## Mapa (sin cita)

Puerta cerrada / el traje de niña correcta / hielo que sale del pecho / hermana a la puerta / palacio como aislamiento.

## Poema del laboratorio

\`\`\`poem
${poemElzaEs()}
\`\`\`

[▶ Vida](${vida}#poema=elza) · [▶ VEVO](${vevoCanal}) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobada** — Elza en Frozen 2013; *Let It Go* (DisneyMusicVEVO) junto a la ficha.
`;

  return { body, contentEn, contentEs };
}

function buildElzaFrozenPost() {
  const { body, contentEn, contentEs } = buildElzaFrozenBodies();
  const seriesOrder = pickOrder('inspecao-desenho-elza-frozen', 11);
  return artePost({
    title: 'Inspeção: Elza — Frozen, o gelo e o ofício de não esconder o poder',
    titleEn: 'Inspection: Elsa — Frozen, the ice and the craft of not hiding the power',
    titleEs: 'Inspección: Elza — Frozen, el hielo y el oficio de no esconder el poder',
    excerpt:
      'Artes · desenho 2013: Elza (Frozen / Disney) — gelo × medo × porta; Let It Go no DisneyMusicVEVO junto da ficha; sem colar a letra.',
    excerptEn:
      'Arts · 2013 cartoon: Elsa (Frozen / Disney) — ice × fear × door; Let It Go on DisneyMusicVEVO beside the sheet; no pasted lyric.',
    excerptEs:
      'Artes · dibujo 2013: Elza (Frozen / Disney) — hielo × miedo × puerta; Let It Go en DisneyMusicVEVO junto a la ficha; sin pegar la letra.',
    slug: 'inspecao-desenho-elza-frozen',
    date: '2026-08-23T06:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Elza · Frozen · Artes',
    coverImage: '/imagens/inspecoes/elza-frozen-cover.jpg',
    sourceUrl: WIKI_ELSA,
    videoId: LET_IT_GO_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildElzaFrozenPost,
  buildElzaFrozenBodies,
  poemElzaPt,
  poemElzaEn,
  poemElzaEs,
  LET_IT_GO_ID,
  LET_IT_GO,
  DISNEY_VEVO,
  YT_TRAILER,
  YT,
  WIKI,
  WIKI_EN,
  WIKI_ELSA
};
