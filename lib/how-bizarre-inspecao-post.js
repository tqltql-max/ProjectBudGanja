'use strict';

/**
 * Artes · canção «How Bizarre» (OMC / Pauly Fuemana, 1995).
 * Ōtara → rádio mundial; nomear o estranho sem rir da vida
 * nem entrar em pânico. Elos BudGanja: criatividade / alegria /
 * caminho / legal — inspecionar o bizarro sem apagar o bairro.
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

const YT_ID = 'qceCB4OL-8k';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/46q5BtHso0ECuTKeq70ZhW';
const WIKI = 'https://en.wikipedia.org/wiki/How_Bizarre_%28song%29';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/OMC_%28band%29';
const WIKI_PAULY = 'https://en.wikipedia.org/wiki/Pauly_Fuemana';

/** Eco poético do laboratório — não é letra da OMC. */
function poemHowBizarrePt() {
  return `How Bizarre.
Não pedimos a letra emprestada —
pedimos o ofício de nomear o estranho
sem transformar a vida em piada
nem em pânico.

OMC. Pauly. Ōtara.
Houve um bairro a que chamaram clube de milionários
por ironia —
e um groove que saiu dali sem pedir licença ao mapa.
Houve trompete de mariachi no hip-hop,
Impala a deslizar no clipe,
voz que conta o bizarro
como quem inspeciona a rua:
não para rir do vizinho,
para ver o que o rádio fingia não existir.

O laboratório conhece esse nome.
Dia que não fecha.
Mistura que «não deveria» funcionar.
Caminho que parece torto
até alguém ficar e medir.
E ainda assim: chamar as coisas pelo nome.
Ficar legal com o inexplicável.
Dar o passo sem apagar a origem.

Faça o melhor!

Porque toda vez que alguém nomeia o bizarro
e inspeciona com alegria
em vez de esmagar ou de zombar,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde o estranho também cabe no ofício.`;
}

function poemHowBizarreEn() {
  return `How Bizarre.
We do not borrow the lyric —
we ask for the craft of naming the strange
without turning life into a joke
or into panic.

OMC. Pauly. Ōtara.
There was a suburb they called a millionaires’ club
as irony —
and a groove that left there without asking the map for permission.
There was a mariachi trumpet in the hip-hop,
an Impala sliding through the clip,
a voice that tells the bizarre
the way one inspects a street:
not to laugh at the neighbour,
to see what the radio pretended not to exist.

The laboratory knows that name.
A day that will not close.
A mix that “should not” work.
A path that looks crooked
until someone stays and measures.
And still: call things by their name.
Stay alright with the inexplicable.
Take the step without erasing the origin.

Do your best!

Because every time someone names the bizarre
and inspects with joy
instead of crushing or mocking,
the universe grows a little:
one more verse,
one more canopy,
a street where the strange also fits the craft.`;
}

function poemHowBizarreEs() {
  return `How Bizarre.
No pedimos prestada la letra —
pedimos el oficio de nombrar lo extraño
sin transformar la vida en chiste
ni en pánico.

OMC. Pauly. Ōtara.
Hubo un barrio al que llamaron club de millonarios
por ironía —
y un groove que salió de allí sin pedirle permiso al mapa.
Hubo trompeta de mariachi en el hip-hop,
Impala deslizándose en el clip,
voz que cuenta lo bizarro
como quien inspecciona la calle:
no para reírse del vecino,
para ver lo que la radio fingía que no existía.

El laboratorio conoce ese nombre.
Día que no cierra.
Mezcla que «no debería» funcionar.
Camino que parece torcido
hasta que alguien se queda y mide.
Y aun así: llamar a las cosas por su nombre.
Quedarse legal con lo inexplicable.
Dar el paso sin borrar el origen.

¡Haz lo mejor!

Porque cada vez que alguien nombra lo bizarro
e inspecciona con alegría
en vez de aplastar o de burlarse,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde lo extraño también cabe en el oficio.`;
}

function buildHowBizarreBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const upside = '/posts/post-inspecao-arte-upside-down.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const insana = '/posts/post-inspecao-palavra-insana.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemHowBizarrePt();

  const body = `## Escopo

Inspeção editorial da canção **«How Bizarre»** — **OMC** (Otara Millionaires Club; voz **Pauly Fuemana**, produção e co-autoria **Alan Jansson**; álbum *How Bizarre*, 1996; single **15 dez. 1995**, Huh! / Polydor). O **início de tudo** é a **obra musical**: pop–hip-hop pasifika de **Ōtara** (Auckland) que mistura groove, guitarra «mariachi» e trompete Tex-Mex — e nomeia o **bizarro** da vida sem o transformar em cinismo. No laboratório BudGanja, «how bizarre» conversa com [criatividade](${criatividade}) (mistura que «não deveria» funcionar), com [alegria](${alegria}) (estranheza sem zombaria) e com [caminho](${caminho}) — o bairro que chega à rádio mundial sem apagar a origem. Distinto de [Under Pressure](${under}) (o aperto que esmaga) e par de [Upside Down](${upside}) (outro ângulo sobre o mundo «ao contrário»). A ficha é da **canção**; a biografia de Fuemana e a marca «one-hit wonder» são **contexto**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · How Bizarre](${WIKI}), [OMC](${WIKI_BAND}), [Pauly Fuemana](${WIKI_PAULY}). Crédito: Pauly Fuemana / Alan Jansson — Huh! · Universal Music NZ. **Sem afiliação**. Referência de áudio pedida: [Spotify](${SPOTIFY}) (\`46q5BtHso0ECuTKeq70ZhW\`) — **obra**. Eco de leitura: [YouTube Music / OMC - Topic](${YT_MUSIC}) (\`${YT_ID}\`) — **não** o canal YouTube como objecto. Esta ficha **não** é biografia de Fuemana (Pessoas). O laboratório **não** reproduz a letra integral (direitos).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **How Bizarre** |
| Artista | **OMC** (Otara Millionaires Club) — voz **Pauly Fuemana** |
| Meio | Canção / single (pop · hip-hop · urban pasifika · Tex-Mex) |
| Single | **15 dez. 1995** (Huh! / Polydor) — lead do único álbum |
| Álbum | *How Bizarre* — **1996** |
| Autoria / produção | **Pauly Fuemana** · **Alan Jansson** |
| Formação citada | Pauly Fuemana (voz, face pública) · Alan Jansson (produção, arranjo, co-escrita) · Sina Saipaia / «Zina» (gancho vocal, backing) |
| Duração citada | ~3:43–3:49 |
| Picos citados | NZ / Austrália / Áustria / Canadá / Irlanda **#1** · UK **#5** · US Hot 100 Airplay **#4** · US Pop Airplay **#1** (rádio; sem single comercial nos EUA à época) |
| Clipe | Lee Baker, 1995 — Chevrolet Impala; Ponsonby / Ellerslie (Auckland); orçamento NZ On Air |
| Tipo BudGanja | Arte — **canção primeiro**; Ōtara e o nome irónico como génese, não como folclore |
| Elo Palavras | [criatividade](${criatividade}) · [inspiração](${inspiracao}) · [alegria](${alegria}) · [caminho](${caminho}) · [legal](${legal}) · [incrível](${incrivel}) · [insana](${insana}) · [gesto](${gesto}) · [já](${ja}) · [esperança](${esperanca}) · [vida](${vidaPalavra}) |
| Elo Artes (par) | [Upside Down](${upside}) · [Send Me On My Way](${sendMe}) · [All Right Now](${allRight}) · contraste [Under Pressure](${under}) · [Killing in the Name](${killing}) · [Só os Loucos Sabem](${loucos}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [áudio Topic](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1995** — Huh!, Ōtara, Fuemana + Jansson — antes de TikTok, «one-hit wonder» ou playlist 90s.  
**H2:** «how **bizarre**» é literacia do **estranho** — cruza [alegria](${alegria}) e [legal](${legal}): nomear o inexplicável sem rir da vida nem entrar em pânico.  
**H3:** a mistura (hip-hop + mariachi + voz pasifika) é **método**, não acidente de rádio; o laboratório inspeciona o **ofício da mistura**, não a mascote Impala.  
**H4:** distinto de [Under Pressure](${under}) — Queen/Bowie medem o esmagamento; OMC nomeia o **mundo torto** e segue. Par útil com [Upside Down](${upside}) (inverter o olhar) e [Send Me On My Way](${sendMe}) (passo 90s). Contraste [Killing in the Name](${killing}): raiva nomeada × estranheza nomeada sem tanque.

Passos: origem da canção → tese → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Nome | **Otara Millionaires Club** — ironia sobre **Ōtara**, um dos subúrbios mais pobres de Auckland. Sem a ironia, o nome vira souvenir. |
| 1992–94 | Phil Fuemana funda o projecto; Pauly + Phil em *Proud* (Jansson). Depois o par **Pauly + Alan Jansson** encurta para **OMC**. |
| Origem de Pauly | Ōtara; pai niuense, mãe māori — urban pasifika como ofício, não como exotismo de palco. |
| **15 dez. 1995** | Single Huh! (Simon Grigg) — #1 na NZ **sem vídeo**, 3 semanas; >35 mil cópias no país. |
| Som | Groove proto-electro / hip-hop, guitarra «mariachi», trompete Tex-Mex, backing doce — mistura que a crítica chamou «polynesian pop with a twist». |
| Gancho vocal | Sina Saipaia («Zina» no álbum) — o refrão cantado é parte da **obra**, não adorno. |
| **1996** | Álbum *How Bizarre*; #1 Austrália (5 semanas), Áustria, Canadá, Irlanda; UK #5. |
| EUA 1997 | Só rádio — fora do Hot 100 comercial; **#1** Pop Airplay (primeiro acto neozelandês a #1 numa chart Billboard). Hot 100 Airplay **#4**. |
| Clipe | Lee Baker — Chevrolet Impala 1968, dinheiro, fogo; palco Ponsonby + Ellerslie; ~NZ$7 mil. **Obra audiovisual** distinta desta ficha de áudio. |
| Prémio | Single of the Year — NZ Music Awards **1996**. Nature’s Best 2 (#34). Billboard: entre as 100 maiores pops de **1997**. |
| **31 jan. 2010** | Morte de Fuemana — reentrada NZ #40. Afterlife (TikTok 2021, cinema, anúncios): **descendentes**, não génese. |

> **Hierarquia:** sem o single de **dez. 1995** e o ofício Ōtara/Jansson, não há canção a inspecionar. Spotify, Topic YouTube, clipe e «one-hit wonder» são descendentes. A ficha **não** substitui a vida de Pauly.

## A obra (síntese)

- Pop–hip-hop urbano pasifika: baixo relaxado, trompete, guitarra espanhola, rap/canto de Fuemana, gancho feminino.  
- Tese pública: a vida é **bizarra** — coincidência, rua, swagger, sem tratado filosófico.  
- Tese BudGanja da **génese**: nomear o estranho **a partir do bairro**, com mistura que a rádio global não esperava de Ōtara.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (nomear o bizarro, misturar sem apagar a origem) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| How **bizarre** | Nomear o inexplicável — [incrível](${incrivel}) · [insana](${insana}) sem pânico |
| Ironia Millionaires | Ōtara no nome — não branquear a pobreza nem usá-la como pose |
| Mistura mariachi / hip-hop | [criatividade](${criatividade}) · [inspiração](${inspiracao}) — o «não deveria» como ofício |
| Tom leve / swagger | [alegria](${alegria}) · [legal](${legal}) — estranheza sem cinismo |
| Rua → rádio mundial | [caminho](${caminho}) · [já](${ja}) — o passo sai do bairro *agora* |
| Impala / clipe | Imagem que viajou; a ficha fica no **áudio** |
| Contraste pressão | [Under Pressure](${under}) = aperto que esmaga; aqui = mundo torto nomeado |
| Par Upside Down / Send Me | [Upside Down](${upside}) = inverter o olhar; [Send Me…](${sendMe}) = passo 90s |

## Cruzamento: bizarro × inspeção

| OMC / How Bizarre | BudGanja |
|-------------------|----------|
| Nomear o estranho | Inspeção que **diz o nome** sem zombar nem esmagar |
| Ōtara no selo | Origem visível — não apagar o bairro quando a rádio cresce |
| Mistura «impossível» | [criatividade](${criatividade}) como método, não como acaso |
| Swagger sem tanque | [alegria](${alegria}) · [Faça o melhor!](${mantra}) |
| One-hit / TikTok | Afterlife — a origem continua **1995** |
| Pop de 1995–97 | Série [Artes](${hub}) ao lado de [Upside Down](${upside}) / [Under Pressure](${under}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da OMC nem de Fuemana.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=how-bizarre)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [criatividade](${criatividade}) · [inspiração](${inspiracao}) · [alegria](${alegria}) | Léxico da mistura / tom / estranheza |
| [caminho](${caminho}) · [legal](${legal}) · [incrível](${incrivel}) · [insana](${insana}) | Percurso, estado, nome do inexplicável |
| [gesto](${gesto}) · [já](${ja}) · [Faça o melhor!](${mantra}) | Ofício de nomear e ficar |
| [esperança](${esperanca}) · [emoção](${emocao}) · [vida](${vidaPalavra}) | Estado, pulso, percurso |
| [Upside Down](${upside}) · [Send Me On My Way](${sendMe}) · [All Right Now](${allRight}) | Pares — ângulo / passo / agora |
| [Under Pressure](${under}) | Contraste — aperto que esmaga × bizarro nomeado |
| [Killing in the Name](${killing}) | Contraste — raiva nomeada × estranheza sem tanque |
| [Só os Loucos Sabem](${loucos}) | Outra arte musical da casa |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1995 (OMC / Ōtara) + cruzamento com criatividade / alegria / caminho e eco poético: nomear o bizarro sem apagar o bairro.

[▶ Spotify](${SPOTIFY}) · [▶ Áudio](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=how-bizarre) · [▶ Criatividade](${criatividade}) · [▶ Alegria](${alegria}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"How Bizarre"** — **OMC** (Otara Millionaires Club; **Pauly Fuemana** / **Alan Jansson**; album *How Bizarre*, 1996; single **15 Dec 1995**). Song first: Pasifika pop–hip-hop from **Ōtara** that names life’s **bizarre** without cynicism. Crosses [creativity](${criatividade}), [joy](${alegria}) and [path](${caminho}). Distinct from [Under Pressure](${under}); pair with [Upside Down](${upside}). Fuemana’s biography and the “one-hit wonder” label are **context**; this sheet is the **song**.

> Method note: [Wikipedia](${WIKI}). No affiliation. Audio reference requested: [Spotify](${SPOTIFY}). Reading echo: [YouTube Music / OMC - Topic](${YT_MUSIC}). This sheet is **not** a Fuemana biography. The lab does **not** reproduce the full lyric.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemHowBizarreEn()}
\`\`\`

[▶ Vida](${vida}#poema=how-bizarre) · [▶ Creativity](${criatividade}) · [▶ Joy](${alegria})

## Status

**Approved** — 1995 OMC song + BudGanja map (name the bizarre without erasing the suburb).
`;

  const contentEs = `## Alcance

Inspección de **«How Bizarre»** — **OMC** (Otara Millionaires Club; **Pauly Fuemana** / **Alan Jansson**; álbum *How Bizarre*, 1996; single **15 dic. 1995**). Canción primero: pop–hip-hop pasifika de **Ōtara** que nombra lo **bizarro** de la vida sin cinismo. Cruza [creatividad](${criatividade}), [alegría](${alegria}) y [camino](${caminho}). Distinto de [Under Pressure](${under}); par de [Upside Down](${upside}). La biografía de Fuemana y la etiqueta «one-hit wonder» son **contexto**; esta ficha es la **canción**.

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia pedida: [Spotify](${SPOTIFY}). Eco de lectura: [YouTube Music / OMC - Topic](${YT_MUSIC}). Esta ficha **no** es biografía de Fuemana. El laboratorio **no** reproduce la letra íntegra.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemHowBizarreEs()}
\`\`\`

[▶ Vida](${vida}#poema=how-bizarre) · [▶ Creatividad](${criatividade}) · [▶ Alegría](${alegria})

## Estado

**Aprobada** — canción OMC 1995 + mapa BudGanja (nombrar lo bizarro sin borrar el barrio).
`;

  return { body, contentEn, contentEs };
}

function buildHowBizarrePost() {
  const { body, contentEn, contentEs } = buildHowBizarreBodies();
  return artePost({
    title: 'Inspeção: How Bizarre — OMC e o ofício de nomear o estranho',
    titleEn: 'Inspection: How Bizarre — OMC and the craft of naming the strange',
    titleEs: 'Inspección: How Bizarre — OMC y el oficio de nombrar lo extraño',
    excerpt:
      'Artes · canção 1995: OMC (Ōtara) — How Bizarre mistura hip-hop e mariachi; elo BudGanja com criatividade, alegria e caminho — nomear o bizarro sem apagar o bairro.',
    excerptEn:
      'Arts · 1995 song: OMC (Ōtara) — How Bizarre mixes hip-hop and mariachi; BudGanja link to creativity, joy and path — name the bizarre without erasing the suburb.',
    excerptEs:
      'Artes · canción 1995: OMC (Ōtara) — How Bizarre mezcla hip-hop y mariachi; vínculo BudGanja con creatividad, alegría y camino — nombrar lo bizarro sin borrar el barrio.',
    slug: 'inspecao-arte-how-bizarre',
    date: '2026-08-19T18:00:00.000Z',
    seriesOrder: 52,
    seriesLabel: 'How Bizarre · Artes',
    coverImage: '/imagens/inspecoes/how-bizarre-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildHowBizarrePost,
  buildHowBizarreBodies,
  poemHowBizarrePt,
  poemHowBizarreEn,
  poemHowBizarreEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
