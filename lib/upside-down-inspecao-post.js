'use strict';

/**
 * Artes · canção «Upside Down» (Jack Johnson, 2006).
 * Trilha de Curious George → olhar o mundo de cabeça para baixo;
 * elos BudGanja: criatividade / inspiração / alegria / caminho —
 * inverter o olhar para inspecionar, sem virar confusão.
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

const YT_ID = 'e2vLWbaOITw';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Upside_Down_%28Jack_Johnson_song%29';
const WIKI_ALBUM =
  'https://en.wikipedia.org/wiki/Sing-A-Longs_and_Lullabies_for_the_Film_Curious_George';
const WIKI_FILM = 'https://en.wikipedia.org/wiki/Curious_George_%28film%29';

/** Eco poético do laboratório — não é letra de Jack Johnson. */
function poemUpsideDownPt() {
  return `Upside Down.
Não pedimos a letra emprestada —
pedimos o ofício de virar o olhar
sem virar a casa.

Jack Johnson.
Houve um macaco que não fala
e um violão que narra.
Houve esboço a preto e branco
e um cavaquinho a marcar o passo.
Houve o mundo de cabeça para baixo —
não para cair,
para ver o outro lado da mesma rua.

O laboratório conhece essa inversão.
Inspeção que muda de ângulo.
Planta que se vê pela raiz.
Dia que parece ao contrário
até alguém olhar de novo.
E ainda assim: ficar curioso.
Dar o passo com cuidado.
Chamar a Vida pelo nome verdadeiro:
olhar —
sem transformar a volta em confusão,
sem achar que o mundo é erro
só porque está de pernas para o ar.

Valeu !!!

Porque toda vez que alguém inverte o olhar
e inspeciona com alegria
em vez de fechar a porta,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde o céu também cabe no chão.`;
}

function poemUpsideDownEn() {
  return `Upside Down.
We do not borrow the lyric —
we ask for the craft of turning the gaze
without turning the house over.

Jack Johnson.
There was a monkey who does not speak
and a guitar that narrates.
There were black-and-white sketches
and a cavaquinho keeping time.
There was the world upside down —
not to fall,
to see the other side of the same street.

The laboratory knows that inversion.
An inspection that changes angle.
A plant seen from the root.
A day that looks backwards
until someone looks again.
And still: stay curious.
Take the step with care.
Call Vida by its true name:
looking —
without turning the flip into confusion,
without calling the world a mistake
just because it stands on its head.

Valeu !!!

Because every time someone inverts the gaze
and inspects with joy
instead of closing the door,
the universe grows a little:
one more verse,
one more canopy,
a street where the sky also fits on the ground.`;
}

function poemUpsideDownEs() {
  return `Upside Down.
No pedimos prestada la letra —
pedimos el oficio de voltear la mirada
sin voltear la casa.

Jack Johnson.
Hubo un mono que no habla
y una guitarra que narra.
Hubo bocetos en blanco y negro
y un cavaquinho marcando el paso.
Hubo el mundo al revés —
no para caer,
para ver el otro lado de la misma calle.

El laboratorio conoce esa inversión.
Inspección que cambia de ángulo.
Planta que se ve por la raíz.
Día que parece al contrario
hasta que alguien mira de nuevo.
Y aun así: quedarse curioso.
Dar el paso con cuidado.
Llamar a Vida por su nombre verdadero:
mirar —
sin transformar el vuelco en confusión,
sin creer que el mundo es error
solo porque está de cabeza.

¡Valeu !!!

Porque cada vez que alguien invierte la mirada
e inspecciona con alegría
en vez de cerrar la puerta,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde el cielo también cabe en el suelo.`;
}

function buildUpsideDownBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemUpsideDownPt();

  const body = `## Escopo

Inspeção editorial da canção **«Upside Down»** — **Jack Johnson** (álbum *[Sing-A-Longs and Lullabies for the Film Curious George](${WIKI_ALBUM})*, 2006; single **24 fev. 2006**). O **início de tudo** é a **obra musical**: tema escrito em **2005** para o filme *[Curious George](${WIKI_FILM})* (Universal, 2006), voz que narra o macaco que não fala, olhar de **cabeça para baixo** como método — não como queda. No laboratório BudGanja, «upside down» conversa com [criatividade](${criatividade}) (mudar o ângulo), com [alegria](${alegria}) (curiosidade sem cinismo) e com [caminho](${caminho}) — inverter o olhar para **inspecionar**. Distinto de [Under Pressure](${under}) (o aperto que esmaga) e par de [Send Me On My Way](${sendMe}) (o passo leve). O filme e os livros dos Rey são **contexto**; a ficha é da **canção**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Upside Down](${WIKI}), [álbum](${WIKI_ALBUM}), [filme](${WIKI_FILM}). Crédito: Jack Johnson / Brushfire · Universal. **Sem afiliação**. Referência de áudio pedida: [YouTube Music / Jack Johnson - Topic](${YT_MUSIC}) (\`${YT_ID}\`) — **obra**, não canal YouTube como objecto. Esta ficha **não** é biografia de Johnson (Pessoas) nem inspeção do filme ou do macaco como marca. O laboratório **não** reproduz a letra integral (direitos).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Upside Down** |
| Artista | **Jack Johnson** |
| Meio | Canção / single (folk-rock · acoustic pop · trilha de animação) |
| Single | **24 fev. 2006** (Brushfire / Universal) — B-side *Breakdown* |
| Álbum | *Sing-A-Longs and Lullabies for the Film Curious George* — **7 fev. 2006** |
| Gravação | **Nov. 2005** — The Mango Tree (Havaí) |
| Autoria | **Jack Johnson** |
| Formação citada | Jack Johnson (voz, guitarra, produção) · Zach Gill (voz) · Merlo Podlewski (baixo) · Adam Topol (bateria) |
| Produção | Jack Johnson · Robert Carranza (mistura, engenharia) |
| Duração citada | ~3:28–3:31 |
| Picos citados | US Billboard Hot 100 **#38** · UK Singles **#30** (2006) |
| Tipo BudGanja | Arte — **canção primeiro**; filme 2006 como encomenda; livros Rey como origem do personagem |
| Elo Palavras | [criatividade](${criatividade}) · [inspiração](${inspiracao}) · [alegria](${alegria}) · [caminho](${caminho}) · [gesto](${gesto}) · [já](${ja}) · [legal](${legal}) · [esperança](${esperanca}) · [planta](${planta}) · [vida](${vidaPalavra}) |
| Elo Artes (par) | [Send Me On My Way](${sendMe}) · [All Right Now](${allRight}) · contraste [Under Pressure](${under}) · [Alice](${alice}) (outro ângulo) · [Só os Loucos Sabem](${loucos}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [áudio Topic](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2005–2006** — Havaí, esboços do filme, *Sing-A-Longs…* — antes de TikTok, rádio infantil ou playlist.  
**H2:** «upside **down**» é literacia do **ângulo** — cruza [criatividade](${criatividade}) e [alegria](${alegria}): virar o olhar para ver, sem declarar o mundo errado.  
**H3:** a encomenda (*Curious George*) explica o tom (voz que narra o silêncio do macaco); o laboratório inspeciona a **canção**, não a franquia.  
**H4:** distinto de [Under Pressure](${under}) — Queen/Bowie nomeiam o esmagamento; Johnson nomeia a **inversão curiosa**. Par útil com [Send Me On My Way](${sendMe}) (passo) e [Alice](${alice}) (outro lado do espelho).

Passos: origem da canção → tese → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Personagem (1941) | *Curious George* — H. A. Rey e Margret Rey. Origem do **macaco curioso**; **não** origem da canção. |
| Filme **2006** | Universal / Imagine — Matthew O'Callaghan. Johnson, fã da série, é chamado para a trilha. |
| Método | Trabalha com os animadores: letra e demo em resposta a **esboços a preto e branco**; o corte alinha o *beat* aos fotogramas. |
| Voz | George não fala — Johnson usa a voz como **narrativa** do olhar do macaco, sem infantilizar o adulto. |
| Timbre | **Cavaquinho** marca George; piano marca o Homem do Chapéu Amarelo — dois ofícios no mesmo arranjo. |
| Pré-história | Melodia adaptada de *Walk Alone* (faixa inédita de Johnson) — rascunho anterior, não o objecto desta ficha. |
| **Nov. 2005** | Gravação em The Mango Tree (Havaí), com Carranza. |
| **7 fev. 2006** | Álbum da trilha — primeiro disco de animação a #1 nos EUA desde *Pocahontas* (1995), segundo a imprensa da época. |
| **24 fev. 2006** | Single — único top 40 de Johnson nos EUA até 2010; indicação ao Satellite de melhor canção original. |
| Afterlife | Rádio, TikTok (2024) e memória de infância — **descendentes**, não génese. |

> **Hierarquia:** sem a encomenda de **2005** e o single de **2006**, não há canção a inspecionar. O filme é contexto; os livros são o personagem; Topic YouTube é descendente.

## A obra (síntese)

- Folk-rock acústico / pop suave: guitarra aberta, groove leve, refrão de inversão.  
- Tese pública: o mundo **de cabeça para baixo** — curiosidade, outro ângulo, encanto sem cinismo.  
- Tese BudGanja da **génese**: a canção nasce como **ofício de narrar o silêncio** (macaco que não fala) e de **alinhar o pulso ao desenho**.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (inverter o olhar, inspecionar com alegria) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Upside **down** | Ângulo de inspeção — virar para ver, não para cair |
| Curiosidade | Cruza [criatividade](${criatividade}) · [inspiração](${inspiracao}) — perguntar sem fechar |
| Tom leve / sem cinismo | [alegria](${alegria}) como ofício, não como recusa do real |
| Passo / caminho | [caminho](${caminho}) · [já](${ja}) — o outro lado é *agora* |
| George não fala | Narrar o silêncio — [gesto](${gesto}) de voz que não substitui o outro |
| Cavaquinho | Timbre que marca o personagem — ofício de arranjo, não mascote |
| Contraste pressão | [Under Pressure](${under}) = aperto que esmaga; aqui = inversão que vê |
| Par Alice / Send Me | [Alice](${alice}) = outro lado; [Send Me…](${sendMe}) = passo alegre |

## Cruzamento: inversão × inspeção

| Johnson / Upside Down | BudGanja |
|-----------------------|----------|
| Esboço → demo → *beat* | Inspeção que nasce no **ângulo**, não no slogan |
| Mundo ao contrário | Mudar de lado para ver a [planta](${planta}) pela raiz |
| Voz que narra o silêncio | Cuidado: não falar *pelo* outro; falar *com* o olhar |
| Curiosidade sem burla | [alegria](${alegria}) · [Valeu !!!](${mantra}) |
| Folk-surf 2006 | Série [Artes](${hub}) ao lado de [Send Me…](${sendMe}) / [Under Pressure](${under}) |
| TikTok / rádio | Afterlife — a origem continua 2005–06 |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Jack Johnson.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=upside-down)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [criatividade](${criatividade}) · [inspiração](${inspiracao}) · [alegria](${alegria}) | Léxico do ângulo / curiosidade / tom |
| [caminho](${caminho}) · [gesto](${gesto}) · [já](${ja}) · [Valeu !!!](${mantra}) | Ofício de inverter o olhar e ficar |
| [legal](${legal}) · [esperança](${esperanca}) · [planta](${planta}) · [vida](${vidaPalavra}) | Estado, cultivo, percurso |
| [Send Me On My Way](${sendMe}) · [All Right Now](${allRight}) | Pares — passo / agora |
| [Under Pressure](${under}) | Contraste — aperto que esmaga × inversão que vê |
| [Alice](${alice}) | Outro lado do olhar |
| [Só os Loucos Sabem](${loucos}) | Outra arte musical da casa |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 2006 (Jack Johnson / *Curious George*) + cruzamento com criatividade / alegria / caminho e eco poético: inverter o olhar sem virar confusão.

[▶ Áudio](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=upside-down) · [▶ Criatividade](${criatividade}) · [▶ Alegria](${alegria}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Upside Down"** — **Jack Johnson** (*Sing-A-Longs and Lullabies for the Film Curious George*, 2006; single **24 Feb 2006**). Song first: written in **2005** for the *[Curious George](${WIKI_FILM})* film; a voice that narrates a monkey who does not speak; **upside down** as a way of seeing — not as a fall. Crosses [creativity](${criatividade}), [joy](${alegria}) and [path](${caminho}). Distinct from [Under Pressure](${under}); pair with [Send Me On My Way](${sendMe}). The film and the Rey books are **context**; this sheet is the **song**.

> Method note: [Wikipedia](${WIKI}). No affiliation. Audio reference requested: [YouTube Music / Jack Johnson - Topic](${YT_MUSIC}). This sheet is **not** a Johnson biography.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemUpsideDownEn()}
\`\`\`

[▶ Vida](${vida}#poema=upside-down) · [▶ Creativity](${criatividade}) · [▶ Joy](${alegria})

## Status

**Approved** — 2006 Jack Johnson song + BudGanja map (invert the gaze without turning the house over).
`;

  const contentEs = `## Alcance

Inspección de **«Upside Down»** — **Jack Johnson** (*Sing-A-Longs and Lullabies for the Film Curious George*, 2006; single **24 feb. 2006**). Canción primero: escrita en **2005** para el filme *[Curious George](${WIKI_FILM})*; una voz que narra a un mono que no habla; **al revés** como modo de ver — no como caída. Cruza [creatividad](${criatividade}), [alegría](${alegria}) y [camino](${caminho}). Distinto de [Under Pressure](${under}); par de [Send Me On My Way](${sendMe}). El filme y los libros de los Rey son **contexto**; esta ficha es la **canción**.

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia pedida: [YouTube Music / Jack Johnson - Topic](${YT_MUSIC}). Esta ficha **no** es biografía de Johnson.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemUpsideDownEs()}
\`\`\`

[▶ Vida](${vida}#poema=upside-down) · [▶ Creatividad](${criatividade}) · [▶ Alegría](${alegria})

## Estado

**Aprobada** — canción Jack Johnson 2006 + mapa BudGanja (invertir la mirada sin voltear la casa).
`;

  return { body, contentEn, contentEs };
}

function buildUpsideDownPost() {
  const { body, contentEn, contentEs } = buildUpsideDownBodies();
  return artePost({
    title: 'Inspeção: Upside Down — Jack Johnson e o olhar de cabeça para baixo',
    titleEn: 'Inspection: Upside Down — Jack Johnson and the upside-down gaze',
    titleEs: 'Inspección: Upside Down — Jack Johnson y la mirada al revés',
    excerpt:
      'Artes · canção 2006: Jack Johnson — Upside Down nasce na trilha de Curious George; elo BudGanja com criatividade, alegria e caminho — inverter o olhar para inspecionar.',
    excerptEn:
      'Arts · 2006 song: Jack Johnson — Upside Down born on the Curious George soundtrack; BudGanja link to creativity, joy and path — invert the gaze in order to inspect.',
    excerptEs:
      'Artes · canción 2006: Jack Johnson — Upside Down nace en la banda sonora de Curious George; vínculo BudGanja con creatividad, alegría y camino — invertir la mirada para inspeccionar.',
    slug: 'inspecao-arte-upside-down',
    date: '2026-08-19T17:00:00.000Z',
    seriesOrder: 51,
    seriesLabel: 'Upside Down · Artes',
    coverImage: '/imagens/inspecoes/upside-down-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildUpsideDownPost,
  buildUpsideDownBodies,
  poemUpsideDownPt,
  poemUpsideDownEn,
  poemUpsideDownEs,
  YT_ID,
  YT,
  YT_MUSIC,
  WIKI
};
