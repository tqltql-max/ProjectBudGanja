'use strict';

/**
 * Artes · canção «Back Door Man» (The Doors, 1967).
 * Génese: Willie Dixon / Howlin' Wolf (1960).
 * Voz da versão rock: Jim Morrison. Nome da banda ≠ génese da faixa.
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
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'artes-cultura').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

/** Áudio oficial público (The Doors · Topic / Rhino–Elektra). */
const YT_ID = 'WTwNzhLvRGs';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Back_Door_Man';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/The_Doors_%28album%29';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/The_Doors';
const WIKI_JIM = 'https://en.wikipedia.org/wiki/Jim_Morrison';
const WIKI_DIXON = 'https://en.wikipedia.org/wiki/Willie_Dixon';
const WIKI_WOLF = 'https://en.wikipedia.org/wiki/Howlin%27_Wolf';
const WIKI_HUXLEY = 'https://en.wikipedia.org/wiki/The_Doors_of_Perception';
const SPOTIFY = 'https://open.spotify.com/track/03By6gD02qhtvIQiK8KidK';

function poemBackDoorManPt() {
  return `Back Door Man.
Não pedimos a letra emprestada —
pedimos o ofício de olhar a porta
quando alguém entra por trás
e chama isso de caminho.

The Doors.
Há porta da frente —
maçaneta, inspeção, luz —
que pede gesto e verdade.
Há porta de trás —
noite, gíria, proibição —
que pede silêncio e rasto.

Willie Dixon escreveu.
Howlin' Wolf gravou.
Jim cantou a versão que o rock ouviu.
O laboratório não confunde os três:
génese blues, voz 1967, mito depois.

Não entramos pela porta de trás.
Não arrombamos a da frente.
Plantamos à beira.
Contamos gotas.
Chamamos a Vida pelo nome verdadeiro:
passar —
pela porta que se pode nomear.

Valeu !!!

Porque toda vez que alguém abre
sem esconder a mão,
o universo cresce um pouco:
um verso a mais,
um vão a mais,
um nós onde antes só havia fundo de casa.`;
}

function poemBackDoorManEn() {
  return `Back Door Man.
We do not borrow the lyric —
we ask for the craft of looking at the door
when someone comes in from behind
and calls that a path.

The Doors.
There is a front door —
doorknob, inspection, light —
that asks for gesture and truth.
There is a back door —
night, slang, prohibition —
that asks for silence and a trail.

Willie Dixon wrote it.
Howlin' Wolf recorded it.
Jim sang the version rock heard.
The laboratory does not confuse the three:
blues genesis, 1967 voice, myth afterwards.

We do not enter by the back door.
We do not break down the front.
We plant at the edge.
We count drops.
We call Vida by its true name:
pass —
through the door that can be named.

Valeu !!!

Because every time someone opens
without hiding the hand,
the universe grows a little:
one more verse,
one more opening,
a we where once there was only the back of the house.`;
}

function poemBackDoorManEs() {
  return `Back Door Man.
No pedimos prestada la letra —
pedimos el oficio de mirar la puerta
cuando alguien entra por detrás
y llama a eso camino.

The Doors.
Hay puerta de delante —
pomo, inspección, luz —
que pide gesto y verdad.
Hay puerta de atrás —
noche, jerga, prohibición —
que pide silencio y rastro.

Willie Dixon la escribió.
Howlin' Wolf la grabó.
Jim cantó la versión que el rock oyó.
El laboratorio no confunde las tres:
génesis blues, voz 1967, mito después.

No entramos por la puerta de atrás.
No derribamos la de delante.
Plantamos a la orilla.
Contamos gotas.
Llamamos a Vida por su nombre verdadero:
pasar —
por la puerta que se puede nombrar.

¡Valeu !!!

Porque cada vez que alguien abre
sin esconder la mano,
el universo crece un poco:
un verso más,
un vano más,
un nosotros donde antes solo había el fondo de la casa.`;
}

function buildBackDoorManBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const wakeUp = '/posts/post-inspecao-arte-wake-up.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const macaneta = '/posts/post-inspecao-palavra-macaneta.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const meterMao = '/posts/post-inspecao-expressao-meter-a-mao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemBackDoorManPt();

  const body = `## Escopo

Inspeção editorial da canção **«Back Door Man»** na versão **The Doors** — álbum homónimo, **4 jan. 1967**, lado B faixa 1 (faixa **7**). O **início de tudo** é o **blues**: **Willie Dixon** escreve; **Howlin' Wolf** grava (**1960**, Chess). A versão que o laboratório inspeciona a pedido de campo (*The Doors, Jim, música Back Door Man*) é a **capa rock de 1967**: voz de **Jim Morrison**, teclado de Ray Manzarek, guitarra de Robby Krieger, bateria de John Densmore, produção Paul A. Rothchild (Sunset Sound, **22 set. 1966**). O nome da banda ([The Doors](${WIKI_BAND}) ← Huxley / Blake, *portas da percepção*) é **outro** objecto — limiar de ver; a faixa é o **limiar de entrar por trás**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Back Door Man](${WIKI}), [álbum](${WIKI_ALBUM}), [banda](${WIKI_BAND}), [Jim Morrison](${WIKI_JIM}). Crédito da obra: **Willie Dixon** / Chess · Elektra (versão Doors). **Sem afiliação**. **Ficha ≠ letra integral** (direitos). **Não** é biografia: Jim fica como **voz da versão 1967**; uma ficha [Pessoas](${pessoas}) seria outro recorte. **Não** celebra o adultério da [gíria](${giria}) blues: inspeciona a **porta de trás** como metáfora de entrada não nomeada. Distinto de [All Right Now](${allRight}) (outro rock de limiar) e de [Wake Up](${wakeUp}) (outro verbo). Áudio oficial (Rhino/Elektra · Topic) como referência da **obra**, não como canal YouTube objecto.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Back Door Man** |
| Autoria | **Willie Dixon** |
| Génese gravada | **Howlin' Wolf** — **1960** (Chess) |
| Versão inspeccionada | **The Doors** — *The Doors*, **4 jan. 1967** (Elektra) · faixa **7** |
| Voz 1967 | **Jim Morrison** (1943–1971) |
| Formação | Ray Manzarek · Robby Krieger · John Densmore |
| Produção | Paul A. Rothchild · engenharia Bruce Botnick |
| Gravação | **22 set. 1966** — Sunset Sound Recorders (tarde) |
| Duração citada | ~3:32 |
| Meio | Blues → blues rock / psychedelic blues (capa 1967) |
| Tipo BudGanja | Arte — **canção primeiro**; Jim e a banda como elenco da versão |
| Elo porta | [maçaneta](${macaneta}) · [caminho](${caminho}) · [passar](${passar}) · [gesto](${gesto}) |
| Elo fala / aviso | [gíria](${giria}) · [noite](${noite}) · [luz](${luz}) · [proibição](${proibicao}) · [risco](${risco}) |
| Elo ofício | [meter a mão](${meterMao}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo rádio | [BudGanja Radio](${radio}) — adaptação; transporte [VEVO](${vevo}) / Topic |
| Fonte | [Wikipedia](${WIKI}) · [áudio oficial](${YT}) · [Spotify](${SPOTIFY}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese blues 1960** (Dixon / Wolf) — Chicago, Chess, gíria do Sul — antes do rock de LA.  
**H2:** a versão **The Doors 1967** é a **obra pedida** (Jim na voz); é **capa**, não autoria. Sem Dixon não há faixa a inspecionar.  
**H3:** *back door man*, na [gíria](${giria}) blues, nomeia quem entra pela **porta de trás** (relação extra-conjugal, no léxico do Sul dos EUA). O laboratório **não** cola a letra e **não** adopta o enredo: traduz o **limiar não oficial**.  
**H4:** [proibição](${proibicao}) também empurra para a porta de trás; o ofício responde com [maçaneta](${macaneta}) e [verdade](${verdade}) — [passar](${passar}) pela porta que se pode nomear.  
**H5:** o nome **The Doors** (Huxley, *The Doors of Perception*, 1954 ← Blake) é **porta da percepção**; *Back Door Man* é **porta de trás**. A ficha **não** funde os dois limiares.  
**H6:** Jim é **voz**, não génese. Mito (Paris, 27 Club, «Lizard King») é **afterlife** — fora do recorte desta canção.

Passos: génese blues → The Doors 1967 / Jim → tese da porta → rádio → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Willie Dixon** | Autor — blues de Chicago; [ficha pública](${WIKI_DIXON}). |
| **1960** | Howlin' Wolf grava *Back Door Man* (Chess) — [génese sonora](${WIKI_WOLF}). |
| Gíria | *Back door man*: quem entra pela porta de trás da casa — [gíria](${giria}) do Sul; **não** étimo da banda. |
| **1964** | John Hammond Jr. (*Big City Blues*) — Krieger apresenta esta adaptação à banda. |
| **1965** | The Doors formam-se em Los Angeles. Nome: [Huxley](${WIKI_HUXLEY}) / Blake — **outra** porta. |
| **22 set. 1966** | Gravação da capa no Sunset Sound (sessão da tarde). |
| **4 jan. 1967** | Álbum *The Doors* (Elektra) — **Back Door Man** abre o lado B. |
| **1970** | Afterlife ao vivo: medley em *Absolutely Live* — memória, não origem. |

> **Hierarquia:** sem Dixon/Wolf **1960**, não há canção. Sem o disco de **1967**, não há a versão Jim/Doors a inspecionar. Playlist, Topic e rádio são descendentes.

## The Doors — a banda (elenco, não génese da faixa)

A banda **não** escreveu *Back Door Man*. Escreveu o **gesto** da capa: blues de Chicago passado pelo órgão de Manzarek, o rasgo de Krieger, o pulso de Densmore e a voz de Morrison. O **nome** The Doors aponta para *The Doors of Perception* (Huxley, 1954) e para Blake («if the doors of perception were cleansed…»). Nesta ficha: **portas da percepção** = ver; **back door** = entrar sem ser visto. Dois ofícios. Não fundir.

## Jim — a voz da versão 1967

**James Douglas Morrison** (8 dez. 1943 – 3 jul. 1971) é o **vocalista** da capa. Leitura BudGanja: **voz primeiro**, biografia depois. Esta inspeção **não** substitui uma ficha [Pessoas](${pessoas}): não fecha causa da morte, não adopta o culto, não cola diários. O que cabe aqui: Jim **canta** o homem da porta de trás; o laboratório **inspecciona** a porta.

## A obra (síntese)

- Blues de Dixon (1960) → capa The Doors (1967): blues rock / psychedelic blues, ~3:32.  
- Tese pública da [gíria](${giria}) (leitura cultural, **sem** colar letra): o homem que não usa a porta da frente.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método do limiar** e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Back *door* | Porta de trás = entrada **não nomeada** — ver [maçaneta](${macaneta}) · [passar](${passar}) |
| *Man* da gíria | Papel no blues do Sul; **não** biografia de Jim |
| Porta da frente | Inspeção, [luz](${luz}), [gesto](${gesto}), [verdade](${verdade}) |
| Porta de trás | [Noite](${noite}), rasto, [proibição](${proibicao}) que empurra para o fundo |
| The Doors (nome) | Huxley / Blake — **outra** porta (percepção) |
| Jim 1967 | Voz da capa — elenco, não autoria |
| Afterlife | Ao vivo 1970, streams, mito — eco, não génese |

## Cruzamento: porta de trás × porta da frente

| Back Door Man | BudGanja |
|---------------|----------|
| Entrar por trás | [Proibição](${proibicao}) empurra para o rasto; o ofício pede [verdade](${verdade}) |
| Porta / limiar | [Maçaneta](${macaneta}) · [caminho](${caminho}) · [passar](${passar}) |
| Gíria do Sul | [Gíria](${giria}) — fala de grupo; **não** receita |
| Noite / fundo | [Noite](${noite}) × [luz](${luz}) — ver o vão antes de entrar |
| Mão escondida | [Meter a mão](${meterMao}) no ofício ≠ esconder a mão |
| Recusa do arrombamento | [Risco](${risco}) · [Valeu !!!](${mantra}) — abrir sem arrombar |

## Uso no laboratório — rádio

O site **não** substitui a origem. A [BudGanja Radio](${radio}) pode receber a faixa como **eco funcional** (áudio oficial The Doors / Elektra · Topic). Papel: **adaptação**, não génese. Transporte: [VEVO](${vevo}) / Topic da obra.

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Critério | Áudio oficial público da versão 1967 |
| Referência | [YouTube · Official Audio](${YT}) |
| Papel nesta inspeção | **Eco funcional** — ouvir no lab, não origem da canção |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Dixon nem dos Doors.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=back-door-man)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Maçaneta](${macaneta}) · [caminho](${caminho}) · [passar](${passar}) · [gesto](${gesto}) | Porta da frente — limiar nomeado |
| [Gíria](${giria}) · [noite](${noite}) · [luz](${luz}) | Fala do blues × ciclo do vão |
| [Proibição](${proibicao}) · [risco](${risco}) · [verdade](${verdade}) | Porta de trás forçada × ofício |
| [Meter a mão](${meterMao}) · [Valeu !!!](${mantra}) | Mão no ofício, não mão escondida |
| [All Right Now](${allRight}) · [Wake Up](${wakeUp}) · [Killing in the Name](${killing}) | Outras artes musicais da casa |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Caminho / recomeço — outro verbo |
| [Rádio](${radio}) · [VEVO](${vevo}) | Eco secundário · transporte oficial |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) · [Pessoas](${pessoas}) | Mapa (Jim ≠ ficha Pessoas) |

## Status

**Aprovado** — inspeção da canção: génese Dixon/Wolf 1960 + capa The Doors 1967 (Jim na voz) + tese da porta de trás × porta da frente.

[▶ Áudio oficial](${YT}) · [▶ Rádio](${radio}) · [▶ Maçaneta](${macaneta}) · [▶ Poema Vida](${vida}#poema=back-door-man) · [▶ Gíria](${giria}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“Back Door Man”** in the **The Doors** version (*The Doors*, **4 Jan 1967**, track 7). Song first: **Willie Dixon** wrote it; **Howlin' Wolf** recorded it (**1960**). The 1967 cover is the field request (*The Doors, Jim, Back Door Man*): **Jim Morrison** on vocals. Band name (Huxley / Blake) is **another** door.

> Method note: [Wikipedia](${WIKI}). Credit: Willie Dixon / Chess · Elektra. No affiliation. **Sheet ≠ full lyric.** Jim here = **voice of the 1967 cover**, not a People biography. Does not celebrate the blues slang plot — inspects the **unofficial threshold**.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemBackDoorManEn()}
\`\`\`

[▶ Vida](${vida}#poema=back-door-man) · [▶ Maçaneta](${macaneta}) · [▶ Radio](${radio})

## Status

**Approved** — 1960 blues genesis + 1967 Doors cover (Jim on vocals) + back door × front door.
`;

  const contentEs = `## Alcance

Inspección de **«Back Door Man»** en la versión **The Doors** (*The Doors*, **4 ene. 1967**, pista 7). Canción primero: **Willie Dixon** la escribe; **Howlin' Wolf** la graba (**1960**). La tapa de 1967 es el pedido de campo (*The Doors, Jim, Back Door Man*): **Jim Morrison** a la voz. El nombre de la banda (Huxley / Blake) es **otra** puerta.

> Nota: [Wikipedia](${WIKI}). Crédito: Willie Dixon / Chess · Elektra. Sin afiliación. **Ficha ≠ letra íntegra.** Jim aquí = **voz de la tapa 1967**, no biografía en Personas. No celebra el enredo de la jerga: inspecciona el **umbral no oficial**.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemBackDoorManEs()}
\`\`\`

[▶ Vida](${vida}#poema=back-door-man) · [▶ Maçaneta](${macaneta}) · [▶ Radio](${radio})

## Estado

**Aprobada** — génesis blues 1960 + tapa The Doors 1967 (Jim a la voz) + puerta de atrás × puerta de delante.
`;

  return { body, contentEn, contentEs };
}

function buildBackDoorManPost() {
  const { body, contentEn, contentEs } = buildBackDoorManBodies();
  const seriesOrder = pickOrder('inspecao-arte-back-door-man', 92);
  return artePost({
    title: 'Inspeção: Back Door Man — The Doors, Jim e a porta de trás',
    titleEn: 'Inspection: Back Door Man — The Doors, Jim and the back door',
    titleEs: 'Inspección: Back Door Man — The Doors, Jim y la puerta de atrás',
    excerpt:
      'Artes · canção: Dixon/Wolf 1960 → The Doors 1967 (Jim na voz); gíria da porta de trás × maçaneta/verdade; rádio como adaptação.',
    excerptEn:
      'Arts · song: Dixon/Wolf 1960 → The Doors 1967 (Jim on vocals); back-door slang × doorknob/truth; radio as adaptation.',
    excerptEs:
      'Artes · canción: Dixon/Wolf 1960 → The Doors 1967 (Jim a la voz); jerga de la puerta de atrás × pomo/verdad; radio como adaptación.',
    slug: 'inspecao-arte-back-door-man',
    date: '2026-08-24T13:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Back Door Man · Artes',
    coverImage: '/imagens/inspecoes/back-door-man-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBackDoorManPost,
  buildBackDoorManBodies,
  poemBackDoorManPt,
  poemBackDoorManEn,
  poemBackDoorManEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_ALBUM,
  SPOTIFY
};
