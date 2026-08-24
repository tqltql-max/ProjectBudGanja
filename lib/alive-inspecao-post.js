'use strict';

/**
 * Artes · canção «Alive» (Pearl Jam, 1991).
 * Génese: instrumental Dollar Short (Gossard) → letra Vedder.
 * Pedido de campo: Spotify 1L94M3KIu7QluZe63g64rv.
 * Rádio: faixa de fecho.
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

/** Videoclipe oficial (PearljamVEVO) — áudio ao vivo RKCNDY, 3 ago. 1991. */
const YT_ID = 'qM0zINtulhM';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/1L94M3KIu7QluZe63g64rv';
const WIKI = 'https://en.wikipedia.org/wiki/Alive_(Pearl_Jam_song)';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Ten_(Pearl_Jam_album)';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/Pearl_Jam';
const SITE = 'https://pearljam.com/music/song/alive';

function poemAlivePt() {
  return `Alive.
Não pedimos a letra emprestada —
pedimos o ofício de ficar
quando o refrão pesa
e a sala o vira em canto.

Pearl Jam.
Há ficar que é fardo —
verdade que chega tarde,
nome que muda no meio da casa.
Há ficar que é ofício —
folha, pulso, luz —
continuar sem transformar a dor em tanque.

Ainda vivo não é slogan.
Nomeado, inspeciona.
Gritado em massa,
pode virar hino.
O laboratório não cola os dois.

Não pedimos a maldição emprestada.
Não vendemos o coro como cura.
Plantamos à beira.
Contamos gotas.
Chamamos a Vida pelo nome verdadeiro:
ficar —
sem matar no nome
e sem dormir no ecrã.

Valeu !!!

Porque toda vez que alguém fica
sem virar máquina,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um nós onde antes só havia peso.`;
}

function poemAliveEn() {
  return `Alive.
We do not borrow the lyric —
we ask for the craft of staying
when the chorus is heavy
and the room turns it into a song.

Pearl Jam.
There is a staying that is a burden —
truth that arrives late,
a name that changes in the middle of the house.
There is a staying that is craft —
leaf, pulse, light —
to continue without turning pain into a tank.

Still alive is not a slogan.
Named, it inspects.
Shouted in a crowd,
it can become an anthem.
The laboratory does not glue the two.

We do not borrow the curse.
We do not sell the chorus as a cure.
We plant at the edge.
We count drops.
We call Vida by its true name:
stay —
without killing in the name
and without sleeping on the screen.

Valeu !!!

Because every time someone stays
without becoming a machine,
the universe grows a little:
one more verse,
one more canopy,
a we where once there was only weight.`;
}

function poemAliveEs() {
  return `Alive.
No pedimos prestada la letra —
pedimos el oficio de quedarse
cuando el estribillo pesa
y la sala lo vuelve canto.

Pearl Jam.
Hay quedarse que es carga —
verdad que llega tarde,
nombre que cambia en medio de la casa.
Hay quedarse que es oficio —
hoja, pulso, luz —
seguir sin convertir el dolor en tanque.

Todavía vivo no es eslogan.
Nombrado, inspecciona.
Gritado en masa,
puede volverse himno.
El laboratorio no pega los dos.

No pedimos prestada la maldición.
No vendemos el coro como cura.
Plantamos a la orilla.
Contamos gotas.
Llamamos a Vida por su nombre verdadero:
quedarse —
sin matar en el nombre
y sin dormir en la pantalla.

¡Valeu !!!

Porque cada vez que alguien se queda
sin volverse máquina,
el universo crece un poco:
un verso más,
un dosel más,
un nosotros donde antes solo había peso.`;
}

function buildAliveBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const radio = '/radio/';
  const wakeUp = '/posts/post-inspecao-arte-wake-up.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const backDoor = '/posts/post-inspecao-arte-back-door-man.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amoVida = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemAlivePt();

  const body = `## Escopo

Inspeção editorial da canção **«Alive»** — **Pearl Jam** (álbum *[Ten](${WIKI_ALBUM})*, **27 ago. 1991**; primeiro single, **7 jul. 1991**). O **início de tudo** é a **obra musical**: instrumental *Dollar Short* de **Stone Gossard**; letra de **Eddie Vedder** sobre uma revelação familiar (semi-autobiográfica, com ficção). Pedido de campo: [Spotify](${SPOTIFY}) (\`1L94M3KIu7QluZe63g64rv\`) — **cópia de escuta**, não génese. No laboratório BudGanja, *still alive* conversa com [vida](${vidaPalavra}) (ficar), com [verdade](${verdade}) (o nome que chega tarde) e com [eu amo a vida](${amoVida}) — **ficar** sem transformar o coro em cura nem em maldição. Distinto de [Wake Up](${wakeUp}) (acordar contra a máquina) e par de [Killing in the Name](${killing}) (outro verbo: matar no nome × continuar vivo). A [BudGanja Radio](${radio}) entra **depois**, como **fecho da playlist**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Alive](${WIKI}), [Ten](${WIKI_ALBUM}), [Pearl Jam](${WIKI_BAND}), [página oficial da faixa](${SITE}). Crédito: Stone Gossard (música) · Eddie Vedder (letra) / Epic · produção Rick Parashar + banda. **Sem afiliação**. **Ficha ≠ letra integral.** **Não** é biografia de Vedder (Pessoas). **Não** descreve trauma como protocolo. O clipe oficial ([PearljamVEVO](${YT})) é **ao vivo** (RKCNDY, Seattle, **3 ago. 1991**, dir. Josh Taft) — áudio do palco, não lip-sync do disco.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Alive** |
| Artista | **Pearl Jam** (Seattle) |
| Meio | Canção / primeiro single (grunge · hard rock) |
| Single | **7 jul. 1991** (Epic; fora dos EUA no lançamento inicial) |
| Álbum | *Ten* — **27 ago. 1991** |
| Instrumental prévio | *Dollar Short* — **Stone Gossard** (ainda Mother Love Bone / demo) |
| Autoria citada | Música: **Gossard** · letra: **Vedder** |
| Produção | **Rick Parashar** + Pearl Jam · London Bridge (Seattle) / Ridge Farm |
| Duração citada | ~5:41 |
| Pedido de campo | [Spotify](${SPOTIFY}) — fonograma de *Ten* |
| Clipe | Oficial ao vivo · [YouTube](${YT}) (\`${YT_ID}\`) |
| Tipo BudGanja | Arte — **canção primeiro**; rádio como **fecho** |
| Elo Palavras | [vida](${vidaPalavra}) · [verdade](${verdade}) · [caminho](${caminho}) · [raiva](${raiva}) |
| Elo Artes | [Wake Up](${wakeUp}) · [Killing in the Name](${killing}) · [Back Door Man](${backDoor}) |
| Elo ofício | [Valeu !!!](${mantra}) · [eu amo a vida](${amoVida}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1990–91** — *Dollar Short*, demo, single, *Ten* — antes de Spotify, meme ou fecho de rádio.  
**H2:** o refrão *I'm still alive* nasceu como **peso** (continuar depois da revelação); a sala o virou **hino**. A ficha nomeia os dois tempos e **não cola**.  
**H3:** [vida](${vidaPalavra}) aqui é **ficar**, não slogan de merch. [Eu amo a vida](${amoVida}) é outra sala — amor nomeado, não o fardo do coro.  
**H4:** [Wake Up](${wakeUp}) acorda; **Alive** fica. Dois verbos, duas fichas.  
**H5:** [Killing in the Name](${killing}) nomeia matar no nome da ordem; aqui o verbo é **continuar vivo** — sem fundir Seattle e Los Angeles.  
**H6:** a [rádio](${radio}) **fecha** a playlist com esta faixa. Fecho ≠ origem.

Passos: génese → tese do refrão → clipe ao vivo × disco → rádio como fecho → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1990** | Gossard escreve o instrumental (*Dollar Short*); fita a procurar voz. |
| **Out. 1990** | A banda (ainda Mookie Blaylock) toca a canção ao vivo. |
| **Jan. 1991** | Demo; depois compilado para a mailing list Mother Love Bone / Soundgarden. |
| **7 jul. 1991** | Primeiro single internacional (não nos EUA no arranque). |
| **3 ago. 1991** | Clipe: concerto RKCNDY, Seattle — Matt Chamberlain na bateria; áudio **ao vivo**. |
| **27 ago. 1991** | *Ten* (Epic) — faixa âncora do disco de estreia. |
| Solo final | **Mike McCready** — acrescento citado no single / disco. |
| Afterlife rádio | Fecho da [BudGanja Radio](${radio}) — adaptação, não génese. |

> **Hierarquia:** sem *Ten* / 1991, não há faixa a inspecionar. Spotify, VEVO e playlist são descendentes.

## A obra (síntese)

- Grunge de Seattle no primeiro disco: riff de Gossard, voz de Vedder, solo longo de McCready.  
- Tese pública (leitura cultural, **sem** colar letra): revelação de paternidade; o refrão como **fardo** que a multidão **reler**. Vedder disse depois que a sala **levantou a maldição**.  
- O laboratório **não** reproduz a letra (direitos); **não** narra o segundo verso como enredo. Inspeciona o **método do ficar**.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| *Still alive* | [Vida](${vidaPalavra}) = ficar — ofício, não merch |
| Verdade tardia | [Verdade](${verdade}) — o nome que chega no meio da casa |
| Peso × hino | A sala pode reler; a ficha **não cola** os dois tempos |
| Ficar ≠ acordar | [Wake Up](${wakeUp}) é outro verbo |
| Ficar ≠ matar no nome | [Killing in the Name](${killing}) — outro ofício |
| Fecho rádio | Última faixa — o laboratório **termina** em ficar |

## Cruzamento: ficar × acordar × matar no nome

| Alive | BudGanja |
|---------|----------|
| Continuar vivo | [Vida](${vidaPalavra}) · [eu amo a vida](${amoVida}) |
| Acordar (outra ficha) | [Wake Up](${wakeUp}) — RATM, 1992 |
| Matar no nome (outra ficha) | [Killing in the Name](${killing}) — outro verbo |
| Porta / limiar | [Back Door Man](${backDoor}) — outra porta, outro blues |
| Caminho | [Caminho](${caminho}) — o riff longo, o solo que não corta cedo |
| Risco | [Risco](${risco}) — peso do refrão; não protocolar trauma |
| Fecho | [Rádio](${radio}) — última faixa da casa |

## Afterlife: o coro da sala

A canção **não** nasce no estádio. O público **reler** o refrão (celebração). Vedder descreveu isso como a sala a **mudar o sentido das palavras**. Hierarquia BudGanja: **1991 primeiro**; o hino de massa é memória, não génese. A ficha **não** vende o coro como terapia.

## Uso no laboratório — rádio (fecho)

O site **não** substitui a origem. A [BudGanja Radio](${radio}) recebe **Alive** como **última faixa** da playlist — fecho, não abertura ([Send Me On My Way](${sendMe}) continua a abrir). Transporte oficial: [VEVO](${vevo}) / PearljamVEVO.

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Papel | **Fecho** da playlist |
| Referência | [YouTube · Official Video](${YT}) |
| Escuta pedida | [Spotify](${SPOTIFY}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra do Pearl Jam.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=alive)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Vida](${vidaPalavra}) · [eu amo a vida](${amoVida}) · [verdade](${verdade}) | Ficar · amar · nomear |
| [Wake Up](${wakeUp}) · [Killing in the Name](${killing}) | Acordar × matar no nome — outros verbos |
| [Back Door Man](${backDoor}) · [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais da casa |
| [Rádio](${radio}) · [VEVO](${vevo}) | Fecho · transporte oficial |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho de ofício |

## Status

**Aprovado** — inspeção da canção 1991 (*Ten*, primeiro single) + tese do refrão (peso × hino) + rádio como **fecho**.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe oficial](${YT}) · [▶ Rádio](${radio}) · [▶ Wake Up](${wakeUp}) · [▶ Poema Vida](${vida}#poema=alive) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“Alive”** — **Pearl Jam** (*[Ten](${WIKI_ALBUM})*, **27 Aug 1991**; first single **7 Jul 1991**). Song first: Gossard’s *Dollar Short*; Vedder’s lyric. Field request: [Spotify](${SPOTIFY}). Crosses [vida](${vidaPalavra}) (staying), [verdade](${verdade}), and [eu amo a vida](${amoVida}). Distinct from [Wake Up](${wakeUp}); pair with [Killing in the Name](${killing}). [BudGanja Radio](${radio}) **closes** the playlist with this track.

> Method note: [Wikipedia](${WIKI}). No affiliation. **Sheet ≠ full lyric.** Official clip is **live** (RKCNDY, 3 Aug 1991).

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemAliveEn()}
\`\`\`

[▶ Vida](${vida}#poema=alive) · [▶ Radio](${radio}) · [▶ Wake Up](${wakeUp})

## Status

**Approved** — 1991 song + chorus as burden then crowd-anthem + radio as closer.
`;

  const contentEs = `## Alcance

Inspección de **«Alive»** — **Pearl Jam** (*[Ten](${WIKI_ALBUM})*, **27 ago. 1991**; primer single **7 jul. 1991**). Canción primero: *Dollar Short* de Gossard; letra de Vedder. Pedido: [Spotify](${SPOTIFY}). Cruza [vida](${vidaPalavra}), [verdade](${verdade}) y [eu amo a vida](${amoVida}). Distinto de [Wake Up](${wakeUp}); par de [Killing in the Name](${killing}). [BudGanja Radio](${radio}) **cierra** la playlist.

> Nota: [Wikipedia](${WIKI}). Sin afiliación. **Ficha ≠ letra íntegra.** El clip oficial es **en vivo** (RKCNDY, 3 ago. 1991).

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemAliveEs()}
\`\`\`

[▶ Vida](${vida}#poema=alive) · [▶ Radio](${radio}) · [▶ Wake Up](${wakeUp})

## Estado

**Aprobada** — canción 1991 + estribillo (carga × himno) + radio como cierre.
`;

  return { body, contentEn, contentEs };
}

function buildAlivePost() {
  const { body, contentEn, contentEs } = buildAliveBodies();
  const seriesOrder = pickOrder('inspecao-arte-alive', 93);
  return artePost({
    title: 'Inspeção: Alive — Pearl Jam e o ofício de ficar',
    titleEn: 'Inspection: Alive — Pearl Jam and the craft of staying',
    titleEs: 'Inspección: Alive — Pearl Jam y el oficio de quedarse',
    excerpt:
      'Artes · canção 1991: Pearl Jam — Alive (Ten, 1.º single) × vida/verdade; peso do refrão que a sala virou hino; rádio como fecho.',
    excerptEn:
      'Arts · 1991 song: Pearl Jam — Alive (Ten, first single) × life/truth; chorus as burden the room turned into an anthem; radio as closer.',
    excerptEs:
      'Artes · canción 1991: Pearl Jam — Alive (Ten, 1.er single) × vida/verdad; estribillo como carga que la sala volvió himno; radio como cierre.',
    slug: 'inspecao-arte-alive',
    date: '2026-08-24T14:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Alive · Artes',
    coverImage: '/imagens/inspecoes/alive-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAlivePost,
  buildAliveBodies,
  poemAlivePt,
  poemAliveEn,
  poemAliveEs,
  YT_ID,
  YT,
  SPOTIFY,
  WIKI,
  WIKI_ALBUM,
  SITE
};
