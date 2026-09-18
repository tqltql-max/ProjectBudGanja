'use strict';

/**
 * Artes · banda The Rolling Stones (Londres, 1962).
 * Pedido de campo: relação com pedras.
 * Cortes: stone (germânico) ≠ pedra (πέτρα);
 * rolling stone (provérbio / Muddy Waters) ≠ pedreira;
 * rock (género) ≠ rock / rocha (mineral);
 * revista Rolling Stone ≠ a banda.
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

const YT_ID = 'O4irXQhgMqg';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/artist/22bE4uQ6baG2q1KXtnizP1';
const WIKI = 'https://en.wikipedia.org/wiki/The_Rolling_Stones';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/The_Rolling_Stones';
const WIKI_SONG = 'https://en.wikipedia.org/wiki/Rollin%27_Stone';
const WIKI_PROVERB = 'https://en.wikipedia.org/wiki/A_rolling_stone_gathers_no_moss';
const WIKI_MAG = 'https://en.wikipedia.org/wiki/Rolling_Stone';
const WIKT_STONE = 'https://en.wiktionary.org/wiki/stone';
const WIKT_ROLL = 'https://en.wiktionary.org/wiki/roll';
const WIKT_ROCK = 'https://en.wiktionary.org/wiki/rock';

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

function poemRollingStonesPt() {
  return `The Rolling Stones.
Não pedimos a pedreira emprestada —
pedimos o ofício de cortar o nome
sem fundir o mineral com a banda.

Houve um provérbio: a pedra que rola
não junta musgo.
Houve Muddy Waters a cantar o andante.
Houve Londres, 1962, e um disco de blues
onde Brian Jones leu o título
e a banda ficou com o inglês stone —
tronco germânico, não πέτρα.

A orelha cola stones em pedras.
O étimo corta.
Rock de palco é balanço;
rocha é outra casa.
A revista veio depois.
A língua da boca não é o lema.

Faça o melhor!

Porque toda vez que alguém nomeia
a pedra no chão
e a pedra que não pára
sem as misturar,
o universo cresce um pouco:
um corte a mais,
um dossel a mais,
uma rua onde ainda cabe o blues
sem virar geologia.`;
}

function poemRollingStonesEn() {
  return `The Rolling Stones.
We do not borrow the quarry —
we ask for the craft of cutting the name
without fusing the mineral with the band.

There was a proverb: the stone that rolls
gathers no moss.
There was Muddy Waters singing the wanderer.
There was London, 1962, and a blues record
where Brian Jones read the title
and the band kept English stone —
a Germanic stem, not πέτρα.

The ear glues stones to pedras.
The etymon cuts.
Stage rock is sway;
rock as stone is another house.
The magazine came later.
The tongue logo is not the lemma.

Do your best!

Because every time someone names
the stone on the ground
and the stone that will not stay
without mixing them,
the universe grows a little:
one more cut,
one more canopy,
a street where the blues still fits
without turning into geology.`;
}

function poemRollingStonesEs() {
  return `The Rolling Stones.
No pedimos prestada la cantera —
pedimos el oficio de cortar el nombre
sin fundir el mineral con la banda.

Hubo un proverbio: la piedra que rueda
no junta musgo.
Hubo Muddy Waters cantando al andante.
Hubo Londres, 1962, y un disco de blues
donde Brian Jones leyó el título
y la banda se quedó con el stone inglés —
tronco germánico, no πέτρα.

El oído pega stones a pedras.
El étimo corta.
Rock de escenario es balanceo;
roca es otra casa.
La revista vino después.
La lengua del logo no es el lema.

¡Haz lo mejor!

Porque cada vez que alguien nombra
la piedra en el suelo
y la piedra que no para
sin mezclarlas,
el universo crece un poco:
un corte más,
un dosel más,
una calle donde aún cabe el blues
sin volverse geología.`;
}

function buildRollingStonesBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const self = '/posts/post-inspecao-arte-rolling-stones.html';
  const pedra = '/posts/post-inspecao-palavra-pedra.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const papel = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const bitter = '/posts/post-inspecao-arte-bitter-sweet-symphony.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const tosches = '/posts/post-inspecao-figura-nick-tosches.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemRollingStonesPt();

  const body = `## Escopo

Inspeção editorial da banda **[The Rolling Stones](${self})** (Londres, **1962**). Pedido de campo: *inspeção da banda Rolling STONES — relação com pedras*. O **início de tudo** é o **nome**: inglês *stone* (germânico *stān*) numa locução de movimento (*rolling stone*). A ficha irmã **[pedra](${pedra})** guarda o lema português — gr. *πέτρα* / lat. *petra*. [A orelha cola](${orelhaCola}) *Stones* em *pedras*; o [étimo](${etimologia}) **corta**. A banda **não** é clube de geologia; [pedra](${pedra}) **não** é a discografia.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · The Rolling Stones](${WIKI}), [PT](${WIKI_PT}), [Rollin' Stone](${WIKI_SONG}), [provérbio](${WIKI_PROVERB}), [revista](${WIKI_MAG}), [Wiktionary · stone](${WIKT_STONE}), [*roll*](${WIKT_ROLL}), [*rock*](${WIKT_ROCK}). **Sem afiliação**. **Ficha ≠ enciclopédia da discografia, ≠ biografia de Jagger/Richards, ≠ laudo mineral.** O laboratório **não** reproduz letras integrais (direitos) e **não** copia a marca da língua. Porta audiovisual: [lyric video oficial · Paint It, Black](${YT}) (\`${YT_ID}\`) — **obra de 1966**, não o objecto desta página. Catálogo: [Spotify · artista](${SPOTIFY}).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **The Rolling Stones** (também *the Stones*) |
| Meio | Banda — rock and roll / rhythm and blues britânico |
| Génese | **Londres, 1962** — Brian Jones lê o título de Muddy Waters e nomeia o grupo |
| Formação-âncora | Mick Jagger · Keith Richards · Brian Jones · Bill Wyman · Charlie Watts (Watts entra em 1963); Ronnie Wood mais tarde |
| Tipo BudGanja | Arte — **banda / nome primeiro**; tese: *stones* traduz *pedras*, mas **não** é o lema *πέτρα* |
| Elo Palavras | [pedra](${pedra}) · [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) · [língua portuguesa](${lingua}) · [caminho](${caminho}) · [verdade](${verdade}) |
| Elo Artes | [Bitter Sweet Symphony](${bitter}) (*The Last Time* / Oldham) · [All Right Now](${allRight}) · [Under Pressure](${under}) |
| Não é | **[pedra](${pedra})** (lema mineral) · **[gesso](${gesso})** · revista *[Rolling Stone](${WIKI_MAG})* · [papel de enrolar](${papel}) |
| Fonte | [Wikipedia](${WIKI}) · [clipe-porta](${YT}) · [Spotify](${SPOTIFY}) |
| Data | ${inspected} |

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **stone** (EN) | O mesmo étimo de [pedra](${pedra}) | Germânico *stān* / *stainaz* — **mesmo objecto**, **outro tronco**. PT *pedra* = *πέτρα* |
| **rolling stone** | Pedra de pedreira / banda desde sempre | Locução: quem **não assenta** não junta musgo ([provérbio](${WIKI_PROVERB})); depois o blues |
| **Rollin' Stone** | Título da banda | Canção de **[Muddy Waters](${WIKI_SONG})**, **1950** — o andante; Jones lê o disco e **baptiza** o grupo |
| **The Rolling Stones** | Clube de geologia / tradução literal «as pedras que rolam» como ofício mineral | Banda de **1962** que tomou o **inglês** do blues/provérbio — não a [pedra](${pedra}) grega |
| **Stones** (alcunha) | Plural de [pedra](${pedra}) | Hipocorístico da **banda**; o laboratório não funde com o lema |
| **rock** (género) | *Rock* = [pedra](${pedra}) / *rocha* | Verbo *to rock* = **balançar**; *rock and roll* é o **gesto**, não o mineral ([*rock*](${WIKT_ROCK})) |
| **rock** (mineral) | Sinónimo de *stone* | EN *rock* (rocha) ≈ PT *rocha*; [pedra](${pedra}) é muitas vezes o **pedaço** — uso vivo |
| **Rolling Stone** (revista) | A banda impressa | Revista de **1967** ([Jann Wenner](${WIKI_MAG})) — outro objecto; eco em [Tosches](${tosches}) |
| **Like a Rolling Stone** | Génese da banda | Dylan, **1965** — **depois** de 1962; afterlife da locução, não baptismo |
| **rolling** / enrolar | [Papel de enrolar](${papel}) | Outro ofício; o adjectivo da banda é o **rolar da pedra**, não a seda |

**H1:** a relação com [pedras](${pedra}) é de **tradução e figura**, não de família latina. *Stone* e *pedra* apontam o mesmo corpo duro; os étimos **não** se tocam.  
**H2:** o nome da banda nasce na cadeia **provérbio → Muddy Waters 1950 → Londres 1962**. Sem o blues, não há baptismo a inspecionar.  
**H3:** [a orelha cola](${orelhaCola}) *Stones / rock* em *pedras / rocha*; o laboratório separa **género**, **mineral** e **nome**.  
**H4:** a revista, Dylan e o lyric video de *Paint It, Black* são **descendentes ou portas** — a origem do **nome** continua 1950/1962. *The Last Time* (Jagger/Richards via Oldham) vive no elo [Bitter Sweet Symphony](${bitter}) como **sample**, não como esta ficha.

## O início de tudo — génese do nome

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Provérbio | *A rolling stone gathers no moss* — lat. de Erasmo *Saxum volutum non obducitur musco*: quem não pára não junta posses. **Figura de [caminho](${caminho})**, não de pedreira. |
| **1950** | Muddy Waters grava *Rollin' Stone* — o andante do blues. Fonte do título que Jones lê. |
| **1962** | Londres: Jones, Jagger, Richards. O nome cola no **inglês do disco**, não em *πέτρα*. Primeira apresentação pública no Marquee (jul. 1962). |
| **1963** | Charlie Watts na bateria — pulso que o século memoriza; ainda **não** é ficha de pessoa. |
| **1965** | Dylan *Like a Rolling Stone* — a locução já era da banda; Dylan **não** a inventa para eles. |
| **1966** | *Paint It, Black* (*Aftermath*) — porta [O4irXQhgMqg](${YT}). **Canção**; a ficha fica na **banda / nome**. |
| **1967** | Revista *[Rolling Stone](${WIKI_MAG})* — terceiro objecto com o mesmo inglês. [Tosches](${tosches}) escreveu *lá*; isso não funde revista e banda. |
| **1971** | Logótipo da língua (John Pasche) — **marca visual**; ≠ lema [pedra](${pedra}). A ficha **não** reproduz a marca. |
| Afterlife | *Hackney Diamonds*, digressões, samples ([Bitter Sweet…](${bitter})). **Memória**; o baptismo continua 1962. |

> **Hierarquia:** sem o provérbio e sem Muddy Waters, o nome não se explica. Sem 1962, não há banda a fichar. Pedras do chão, gesso, Pedro e perdão ficam na [irmã mineral](${pedra}).

## Relação com pedras — mapa do corte

| Pedido («relação com pedras») | Corte BudGanja |
|-------------------------------|----------------|
| *Stones* = pedras? | **Tradução** do inglês *stone*, sim; **étimo** de [pedra](${pedra}) (*πέτρα*), não |
| A banda estuda minerais? | Não. O nome é **metáfora de quem não assenta** |
| *Rock* cola em *rocha*? | Cola de orelha. O género vem do **balançar**, não da pedreira |
| E *Pedro*? | Mesmo tronco de [pedra](${pedra}) — **outra ficha**; a banda não entra nesse Evangelho |
| E *perdão*? | Cola PE- na ficha [pedra](${pedra}); aqui não há PE- que cole |
| E o [gesso](${gesso})? | Irmã do mineral, não da banda |

## Tese cultural BudGanja

| Tema | Tradução editorial |
|------|-------------------|
| Pedra que rola | [caminho](${caminho}) — não juntar musgo; o laboratório mede o passo, não a pedreira |
| Dois troncos | [etimologia](${etimologia}) · [verdade](${verdade}) — mesmo objecto, duas casas |
| Rock de palco | Gesto de balanço; ≠ *rocha* |
| Blues primeiro | [respeito](${respeito}) — Waters baptiza o título; a banda britânica **lê** |
| Revista / Dylan | Objectos **depois**; não inverter o calendário |
| Sample *The Last Time* | [legal](${legal}) na ficha [Bitter Sweet Symphony](${bitter}) — créditos, não geologia |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com o **nome**; **não** é letra dos Stones, de Waters nem de Dylan.

\`\`\`poem
${poema}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Pedra](${pedra}) | Irmã — *πέτρα*; Pedro; perdão (cola); o mineral desta pergunta |
| [Gesso](${gesso}) | Irmã do mineral — não da banda |
| [A orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Método do corte *Stones* × *pedras* |
| [Caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) | Provérbio, calendário, blues primeiro |
| [Bitter Sweet Symphony](${bitter}) | *The Last Time* / Oldham — sample, não baptismo |
| [All Right Now](${allRight}) · [Under Pressure](${under}) | Outras artes de palco |
| [Nick Tosches](${tosches}) | Escreveu na **revista** *Rolling Stone* — outro objecto |
| [Papel de enrolar](${papel}) | *Rolling* ≠ enrolar |
| [Rádio](${radio}) | Eco secundário |
| [Faça o melhor!](${mantra}) · [Valeu !!!](${valeu}) | Ofício depois do corte |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) | Mapa |

## Limites

- Não inventaria álbuns, turnés nem biografias de cada membro.  
- Não reproduz letras nem a marca da língua.  
- Não trata *pedra* de gíria nem protocolo mineral.  
- *Paint It, Black* é **porta**; canção própria fica para ficha futura, se o campo pedir.  
- Mick, Keith, Watts, Jones, Wood: **pessoas** — não fundir com o nome colectivo.

## Status

**Aprovado na série Artes** — banda 1962 fichada pelo **nome**; relação com [pedras](${pedra}) cortada: tradução do *stone* germânico, não o lema *πέτρα*. Provérbio → Waters → Londres. *Rock* de palco ≠ *rocha*. Revista e Dylan são depois.

[▶ Lyric video](${YT}) · [▶ Spotify](${SPOTIFY}) · [▶ Pedra](${pedra}) · [▶ Bitter Sweet Symphony](${bitter}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[The Rolling Stones](${self})** (London, **1962**). Field request: the band and its relation to Portuguese **pedras** (stones). The object is the **name**: English *stone* (Germanic *stān*) in a motion proverb. Sister sheet **[pedra](${pedra})** keeps Gk. *πέτρα*. [The ear glues](${orelhaCola}) *Stones* to *pedras*; the etymon **cuts**.

> Method note: [Wikipedia](${WIKI}), [proverb](${WIKI_PROVERB}), [Rollin' Stone](${WIKI_SONG}), [magazine](${WIKI_MAG}), [stone](${WIKT_STONE}). No affiliation. **Not** a discography, a geology report, or a Jagger biography. Gate clip: [Paint It, Black lyric video](${YT}). Catalogue: [Spotify](${SPOTIFY}).

@youtube ${YT_ID}

## The cut

| Form | Seems | Is |
|------|-------|-----|
| **stone** | Same stem as [pedra](${pedra}) | Germanic *stān* — same hard body, **other trunk** |
| **The Rolling Stones** | A quarry club | 1962 band named from Muddy Waters / the proverb |
| **rock** (genre) | *Rocha* / [pedra](${pedra}) | Verb *to rock* = to sway |
| **Rolling Stone** (magazine) | The band in print | **1967** — another object ([Tosches](${tosches}) wrote *there*) |

**H1:** relation to [pedras](${pedra}) is **translation and figure**, not the Latin family.  
**H2:** name chain: proverb → Waters **1950** → London **1962**. Dylan (1965) and the magazine (1967) come **after**.

## Lab poem

\`\`\`poem
${poemRollingStonesEn()}
\`\`\`

## Status

**Approved in Arts** — 1962 band filed by the **name**; *stone* ≠ *πέτρα*. [▶ Pedra](${pedra}) · [▶ Clip](${YT})
`;

  const contentEs = `## Alcance

Inspección de **[The Rolling Stones](${self})** (Londres, **1962**). Pedido: la banda y su relación con **pedras**. El objeto es el **nombre**: inglés *stone* (germánico *stān*). La hermana **[pedra](${pedra})** guarda gr. *πέτρα*. [El oído pega](${orelhaCola}) *Stones* a *pedras*; el étimo **corta**.

> Nota: [Wikipedia](${WIKI}), [proverbio](${WIKI_PROVERB}), [Rollin' Stone](${WIKI_SONG}), [revista](${WIKI_MAG}). Sin afiliación. **No** es discografía ni geología. Puerta: [lyric video](${YT}). Catálogo: [Spotify](${SPOTIFY}).

@youtube ${YT_ID}

## El corte

| Forma | Parece | Es |
|-------|--------|-----|
| **stone** | El mismo tronco de [pedra](${pedra}) | Germánico *stān* — mismo cuerpo, **otro tronco** |
| **The Rolling Stones** | Club de cantera | Banda de 1962 bautizada por Muddy Waters / el proverbio |
| **rock** (género) | *Rocha* / [pedra](${pedra}) | Verbo *to rock* = balancear |
| **Rolling Stone** (revista) | La banda impresa | **1967** — otro objeto |

**H1:** la relación con [pedras](${pedra}) es **traducción y figura**, no familia latina.  
**H2:** cadena: proverbio → Waters **1950** → Londres **1962**. Dylan (1965) y la revista (1967) vienen **después**.

## Poema del laboratorio

\`\`\`poem
${poemRollingStonesEs()}
\`\`\`

## Estado

**Aprobada en Artes** — banda 1962 fichada por el **nombre**; *stone* ≠ *πέτρα*. [▶ Pedra](${pedra}) · [▶ Clip](${YT})
`;

  return { body, contentEn, contentEs };
}

function buildRollingStonesPost() {
  const { body, contentEn, contentEs } = buildRollingStonesBodies();
  const seriesOrder = pickOrder('inspecao-arte-rolling-stones', 85);
  return artePost({
    title: 'Inspeção: The Rolling Stones — stone germânico; a orelha cola pedras',
    titleEn: 'Inspection: The Rolling Stones — Germanic stone; the ear glues pedras',
    titleEs: 'Inspección: The Rolling Stones — stone germánico; el oído pega pedras',
    excerpt:
      'Artes · banda 1962: The Rolling Stones — o nome pega o stone inglês (provérbio / Muddy Waters), não o lema πέτρα; rock de palco ≠ rocha; revista ≠ banda; Valeu !!!',
    excerptEn:
      'Arts · 1962 band: The Rolling Stones — the name takes English stone (proverb / Muddy Waters), not the lemma πέτρα; stage rock ≠ rock-as-stone; magazine ≠ band; Valeu !!!',
    excerptEs:
      'Artes · banda 1962: The Rolling Stones — el nombre toma el stone inglés (proverbio / Muddy Waters), no el lema πέτρα; rock de escenario ≠ roca; revista ≠ banda; ¡Valeu !!!',
    slug: 'inspecao-arte-rolling-stones',
    date: '2026-08-23T02:10:00.000Z',
    seriesOrder,
    seriesLabel: 'The Rolling Stones · Artes',
    coverImage: '/imagens/inspecoes/rolling-stones-cover.jpg',
    sourceUrl: WIKI,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRollingStonesPost,
  buildRollingStonesBodies,
  poemRollingStonesPt,
  poemRollingStonesEn,
  poemRollingStonesEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI,
  WIKI_PT,
  WIKI_SONG,
  WIKI_PROVERB,
  WIKI_MAG
};
