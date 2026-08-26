'use strict';

/**
 * Artes · canção «The Middle» (Jimmy Eat World, 2001).
 * Bleed American → Tempe → não te escrevas fora.
 * Elos BudGanja: caminho / já / esperança / legal —
 * ficar no meio da viagem sem se apagar.
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

const YT_ID = 'oKsxPW6i3pM';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_TOPIC = 'https://www.youtube.com/watch?v=rubpIfLPzvU';
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/6GG73Jik4jUlQCkKg9JuGO';
const WIKI = 'https://en.wikipedia.org/wiki/The_Middle_(Jimmy_Eat_World_song)';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Bleed_American';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/Jimmy_Eat_World';

function poemTheMiddlePt() {
  return `The Middle.
Não pedimos a letra emprestada —
pedimos o ofício de não se escrever
fora da própria viagem.

Jimmy Eat World. Adkins. Tempe.
Houve um e-mail de fã que o punk não deixou entrar —
e uma resposta que cabe num refrão:
não precisa deles.
Houve um disco gravado depois do descarte da editora,
um hit que o próprio autor achou «fraco»
porque nasceu depressa.
Houve a pergunta que o laboratório também faz:
como ficar no meio da corrida
sem se apagar para caber na festa.

O laboratório conhece esse meio.
Inspeção que ainda não fechou.
Planta a meio do ciclo.
Dia que pede tempo —
não atalho, não pedestal.
E ainda assim: ficar.
Dar o passo sem se escrever fora.
Chamar a Vida pelo nome verdadeiro:
já —
sem adiar o cuidado
para um amanhã que nunca inspeciona.

Valeu !!!

Porque toda vez que alguém permanece
no meio da viagem
em vez de se apagar para ser aceite,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde ainda cabe chegar
sem pedir licença ao mapa da festa.`;
}

function poemTheMiddleEn() {
  return `The Middle.
We do not borrow the lyric —
we ask for the craft of not writing yourself
out of your own ride.

Jimmy Eat World. Adkins. Tempe.
There was a fan email the punk kids would not let in —
and an answer that fits a chorus:
you do not need them.
There was a record cut after the label dropped the band,
a hit the writer himself called “weak”
because it arrived fast.
There was the question the laboratory also asks:
how to stay in the middle of the run
without erasing yourself to fit the party.

The laboratory knows that middle.
An inspection that has not closed yet.
A plant mid-cycle.
A day that asks for time —
not a shortcut, not a pedestal.
And still: stay.
Take the step without writing yourself off.
Call Vida by its true name:
already —
without postponing care
to a tomorrow that never inspects.

Valeu !!!

Because every time someone remains
in the middle of the ride
instead of erasing themselves to be accepted,
the universe grows a little:
one more verse,
one more canopy,
a street where there is still room to arrive
without asking the party’s map for permission.`;
}

function poemTheMiddleEs() {
  return `The Middle.
No pedimos prestada la letra —
pedimos el oficio de no escribirse
fuera del propio viaje.

Jimmy Eat World. Adkins. Tempe.
Hubo un correo de una fan que el punk no dejó entrar —
y una respuesta que cabe en un estribillo:
no los necesitas.
Hubo un disco grabado después de que el sello los soltara,
un hit que el propio autor halló «débil»
porque nació rápido.
Hubo la pregunta que el laboratorio también hace:
cómo quedarse en medio de la carrera
sin apagarse para caber en la fiesta.

El laboratorio conoce ese medio.
Inspección que aún no cerró.
Planta a mitad de ciclo.
Día que pide tiempo —
no atajo, no pedestal.
Y aun así: quedarse.
Dar el paso sin escribirse fuera.
Llamar a Vida por su nombre verdadero:
ya —
sin aplazar el cuidado
a un mañana que nunca inspecciona.

¡Valeu !!!

Porque cada vez que alguien permanece
en medio del viaje
en vez de apagarse para ser aceptado,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde aún cabe llegar
sin pedirle permiso al mapa de la fiesta.`;
}

function buildTheMiddleBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const upside = '/posts/post-inspecao-arte-upside-down.html';
  const bitter = '/posts/post-inspecao-arte-bitter-sweet-symphony.html';
  const breath = '/posts/post-inspecao-arte-every-breath-you-take.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemTheMiddlePt();

  const body = `## Escopo

Inspeção editorial da canção **«The Middle»** — **Jimmy Eat World** (álbum *[Bleed American](${WIKI_ALBUM})*, 2001; single **out. 2001**, DreamWorks). O **início de tudo** é a **obra musical**: Jim Adkins escreve em casa em **Tempe** (1999), depois do descarte da Capitol; a banda grava com **Mark Trombino**, por conta própria, entre digressões. No laboratório BudGanja, «the middle» conversa com [caminho](${caminho}) (o meio da viagem), com [já](${ja}) (não se escrever fora *agora*) e com [esperança](${esperanca}) — **fica; leva tempo**. Distinto de [Under Pressure](${under}) (aperto que esmaga) e par de [All Right Now](${allRight}) (o agora depois do silêncio). Referência de áudio pedida: [Spotify](${SPOTIFY}) (\`6GG73Jik4jUlQCkKg9JuGO\`).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · The Middle](${WIKI}), [Bleed American](${WIKI_ALBUM}), [Jimmy Eat World](${WIKI_BAND}). Crédito: Jimmy Eat World — DreamWorks / UMG. **Sem afiliação**. Referência pedida: [Spotify](${SPOTIFY}) — **obra**. Eco audiovisual: [clipe 4K / Paul Fedor](${YT}) (\`${YT_ID}\`); leitura Topic: [rubpIfLPzvU](${YT_TOPIC}). Esta ficha **não** é biografia de Adkins (Pessoas) nem inspeção do canal VEVO. O laboratório **não** reproduz a letra integral (direitos).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **The Middle** |
| Artista | **Jimmy Eat World** (Mesa / Tempe, Arizona) |
| Meio | Canção / single (pop-punk · alternative · emo-pop · power pop) |
| Single | **Out. 2001** (DreamWorks) — 2.º single de *Bleed American* |
| Álbum | *Bleed American* — **17 jul. 2001** |
| Escrita | **1999** — casa de Jim Adkins, Tempe; grande parte num só dia |
| Autoria | Jimmy Eat World (letra âncora: **Jim Adkins**) |
| Produção | Jimmy Eat World · **Mark Trombino** |
| Formação citada | Jim Adkins (voz, guitarra) · Tom Linton (guitarra) · Rick Burch (baixo) · Zach Lind (bateria) |
| Duração | ~2:45–2:46 |
| Picos citados | Billboard Modern Rock **#1** · Hot 100 **#5** (único top 40 Hot 100 da banda) · UK **#26** (2002) |
| Clipe | **Paul Fedor** — festa/piscina; extras da Arizona State; rotação MTV / TRL |
| Tipo BudGanja | Arte — **canção primeiro**; o «meio» como ofício de não se apagar |
| Elo Palavras | [caminho](${caminho}) · [já](${ja}) · [tempo](${tempo}) · [esperança](${esperanca}) · [legal](${legal}) · [passar](${passar}) · [alegria](${alegria}) · [coração](${coracao}) · [gesto](${gesto}) · [verdade](${verdade}) · [vida](${vidaPalavra}) |
| Elo Artes (par) | [All Right Now](${allRight}) · [Send Me On My Way](${sendMe}) · [Bitter Sweet Symphony](${bitter}) · [Every Breath You Take](${breath}) · [Upside Down](${upside}) · [How Bizarre](${howBizarre}) · contraste [Under Pressure](${under}) · [Killing in the Name](${killing}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [clipe](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1999–2001** — Tempe, Trombino, *Bleed American* depois da Capitol — antes de TikTok, *Glee* ou «música de superação» genérica.  
**H2:** «the **middle**» é literacia do **meio da viagem** — cruza [caminho](${caminho}) e [tempo](${tempo}): não se escrever fora enquanto o ciclo ainda corre.  
**H3:** o e-mail de fã (AOL, pós-*Static Prevails*) — a rapariga que o círculo punk «não deixou entrar» — é **génese ética**, não merchandising: inclusão como ofício, não como pose.  
**H4:** Adkins e Trombino acharam a faixa «fraca» por nascer depressa. Tese BudGanja: o [já](${ja}) do ofício não precisa de mito de sofrimento. Distinto de [Under Pressure](${under}); par de [All Right Now](${allRight}) (agora) e [Send Me On My Way](${sendMe}) (passo).

Passos: origem da canção → tese do meio → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Pós-Capitol | Depois de *Clarity* (1999), a editora larga a banda. Em vez de dissolver, gravam **por conta própria** com Trombino, entre digressões. |
| **1999 · Tempe** | Adkins em casa: bateria inspirada em Tom Petty (*You Wreck Me*), guitarra, letra num dia. Influência Springsteen no tom directo. |
| E-mail AOL | Fã que os miúdos punk da escola não aceitavam. Adkins responde na canção: não precisa daquele círculo. **Inclusão como método.** |
| Estúdio | Solo de guitarra entra depois (hammer-on / Gillard / Guided by Voices). Lind imita o *feel* Petty na bateria. |
| **17 jul. 2001** | *Bleed American* (DreamWorks). A faixa não era o «hit planeado» — Luke Wood (A&R) também não a viu logo. |
| **Out. 2001** | 2.º single. Rádio modern rock → crossover pop. |
| **2002** | Modern Rock **#1**; Hot 100 **#5**; rádio mais tocada no Canadá nesse ano. SNL (6 abr. 2002). |
| Clipe | Paul Fedor — festa onde todos estão em roupa interior; o rapaz e a rapariga saem vestidos, juntos. Brady Bunch invertido. **Obra audiovisual**; a ficha fica no **áudio**. |
| Afterlife | Pitchfork (top 500 anos 2000); «best song for a bad time» (A.V. Club). Descendentes — a origem continua Tempe 1999. |

> **Hierarquia:** sem a escrita de **1999** e o *Bleed American* de 2001, não há canção a inspecionar. Spotify, VEVO 4K, TRL e TikTok são descendentes. A ficha **não** substitui a vida de Adkins.

## A obra (síntese)

- Power pop / emo-pop curto (~2:45): bateria a correr, refrão que cabe na rádio, tese de **não se apagar**.  
- Tese pública: não te escrevas fora; o círculo que te exclui não é o mapa.  
- Tese BudGanja da **génese**: o meio da viagem é ofício — [tempo](${tempo}) + [já](${ja}) + [Valeu !!!](${mantra}), sem pedir licença à festa.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (ficar no meio sem se apagar) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| The **middle** | Meio da viagem — [caminho](${caminho}) · [passar](${passar}) |
| It just takes some time | [tempo](${tempo}) · [já](${ja}) — o ofício pede duração, não atalho |
| Don't write yourself off | [esperança](${esperanca}) · [vida](${vidaPalavra}) — não se apagar do relatório |
| Inclusão punk | [legal](${legal}) · [alegria](${alegria}) — caber sem se despir para a festa |
| Hit «fácil» | [verdade](${verdade}) — nascer depressa ≠ ser menor |
| Par Free | [All Right Now](${allRight}) = agora depois do silêncio; aqui = meio da corrida |
| Par Rusted Root | [Send Me On My Way](${sendMe}) = passo; aqui = não sair do caminho |
| Contraste pressão | [Under Pressure](${under}) = aperto que esmaga; aqui = ficar no meio |

## Cruzamento: meio × inspeção

| Jimmy Eat World | BudGanja |
|-----------------|----------|
| Não te escrevas fora | Inspeção que **permanece** no ciclo |
| E-mail da fã excluída | Inclusão como ofício — não pose de palco |
| Capitol larga; a banda grava | [gesto](${gesto}) de continuar depois do descarte |
| Hit que o autor achou fraco | [já](${ja}) do ofício — o rápido também inspecciona |
| Festa do clipe | Sair vestido — [legal](${legal}) consigo, sem se apagar |
| Power pop de 2001 | Série [Artes](${hub}) ao lado de [All Right Now](${allRight}) / [How Bizarre](${howBizarre}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Jimmy Eat World nem de Adkins.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=the-middle)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [caminho](${caminho}) · [tempo](${tempo}) · [já](${ja}) · [passar](${passar}) | Léxico do meio da viagem / duração / presente |
| [esperança](${esperanca}) · [legal](${legal}) · [alegria](${alegria}) · [Valeu !!!](${mantra}) | Ficar, caber, ofício |
| [coração](${coracao}) · [gesto](${gesto}) · [verdade](${verdade}) · [vida](${vidaPalavra}) | Peito, passo, mapa |
| [All Right Now](${allRight}) · [Send Me On My Way](${sendMe}) · [Upside Down](${upside}) | Pares — agora / passo / ângulo |
| [Bitter Sweet Symphony](${bitter}) · [Every Breath You Take](${breath}) | Pares da mesma fila de escuta |
| [Under Pressure](${under}) · [Killing in the Name](${killing}) · [How Bizarre](${howBizarre}) · [Só os Loucos Sabem](${loucos}) | Contraste e outras artes |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 2001 (Jimmy Eat World / *Bleed American*) + cruzamento com caminho / já / esperança e eco poético: ficar no meio da viagem sem se apagar. Referência de áudio pedida: Spotify.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe 4K](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=the-middle) · [▶ Caminho](${caminho}) · [▶ Já](${ja}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"The Middle"** — **Jimmy Eat World** (*Bleed American*, 2001; single **Oct 2001**). Song first: Tempe 1999, Adkins at home after Capitol dropped the band; Trombino sessions self-financed. Crosses [path](${caminho}), [já](${ja}) and [hope](${esperanca}) — stay in the middle of the ride; don’t write yourself off. Requested audio: [Spotify](${SPOTIFY}). Distinct from [Under Pressure](${under}); pair with [All Right Now](${allRight}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Clip: [official 4K](${YT}). This sheet is **not** an Adkins biography. The lab does **not** reproduce the full lyric.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemTheMiddleEn()}
\`\`\`

[▶ Vida](${vida}#poema=the-middle) · [▶ Path](${caminho}) · [▶ Já](${ja})

## Status

**Approved** — 2001 Jimmy Eat World song + BudGanja map (stay in the middle without erasing yourself). Requested audio: Spotify.
`;

  const contentEs = `## Alcance

Inspección de **«The Middle»** — **Jimmy Eat World** (*Bleed American*, 2001; single **oct. 2001**). Canción primero: Tempe 1999, Adkins en casa tras el descarte de Capitol; sesiones con Trombino a costa propia. Cruza [camino](${caminho}), [já](${ja}) y [esperanza](${esperanca}) — quedarse en medio del viaje; no escribirse fuera. Audio pedido: [Spotify](${SPOTIFY}). Distinto de [Under Pressure](${under}); par de [All Right Now](${allRight}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Videoclip: [oficial 4K](${YT}). Esta ficha **no** es biografía de Adkins. El laboratorio **no** reproduce la letra íntegra.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemTheMiddleEs()}
\`\`\`

[▶ Vida](${vida}#poema=the-middle) · [▶ Camino](${caminho}) · [▶ Já](${ja})

## Estado

**Aprobada** — canción Jimmy Eat World 2001 + mapa BudGanja (quedarse en el medio sin apagarse). Audio pedido: Spotify.
`;

  return { body, contentEn, contentEs };
}

function buildTheMiddlePost() {
  const { body, contentEn, contentEs } = buildTheMiddleBodies();
  return artePost({
    title: 'Inspeção: The Middle — Jimmy Eat World e o ofício de não se apagar',
    titleEn: 'Inspection: The Middle — Jimmy Eat World and the craft of not writing yourself off',
    titleEs: 'Inspección: The Middle — Jimmy Eat World y el oficio de no apagarse',
    excerpt:
      'Artes · canção 2001: Jimmy Eat World — The Middle (*Bleed American*); elo BudGanja com caminho, já e esperança — ficar no meio da viagem sem se escrever fora.',
    excerptEn:
      'Arts · 2001 song: Jimmy Eat World — The Middle (Bleed American); BudGanja link to path, já and hope — stay in the middle of the ride without writing yourself off.',
    excerptEs:
      'Artes · canción 2001: Jimmy Eat World — The Middle (Bleed American); vínculo BudGanja con camino, já y esperanza — quedarse en medio del viaje sin escribirse fuera.',
    slug: 'inspecao-arte-the-middle',
    date: '2026-08-20T13:50:00.000Z',
    seriesOrder: 61,
    seriesLabel: 'The Middle · Artes',
    coverImage: '/imagens/inspecoes/the-middle-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTheMiddlePost,
  buildTheMiddleBodies,
  poemTheMiddlePt,
  poemTheMiddleEn,
  poemTheMiddleEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
