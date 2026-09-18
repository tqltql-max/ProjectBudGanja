'use strict';

/**
 * Artes · canção «The Killing Jar» (Siouxsie and the Banshees, 1988).
 * Peepshow → frasco de coleccionador: matar para guardar a forma.
 * Elos BudGanja: inseto / vida / objetos / Killing in the Name —
 * inspecionar a beleza sem pregar a asa.
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

const YT_ID = 'm-PgagRvL9A';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/1j0UWLVjMbBEQdqfI1CSQf';
const WIKI = 'https://en.wikipedia.org/wiki/The_Killing_Jar_(song)';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Peepshow_(album)';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/Siouxsie_and_the_Banshees';

/** Eco poético do laboratório — não é letra das Banshees. */
function poemTheKillingJarPt() {
  return `The Killing Jar.
Não pedimos a letra emprestada —
pedimos o ofício de olhar
sem pregar a asa no fundo do vidro.

Siouxsie. Banshees. Peepshow.
Houve um quinteto a ensaiar o pop
sem largar o enigma.
Houve letra de Severin
e um nome de coleccionador:
o frasco que mata
para guardar a forma.
Houve clipe em rede e giro
como quem finge borboleta
já alfinetada.

O laboratório conhece esse nome.
Inseto que ainda voa.
Objecto que pode ser armadilha.
Vida que não vira souvenir.
E ainda assim: inspecionar
sem transformar o vivo em peça.

Faça o melhor!

Porque toda vez que alguém olha a beleza
e deixa a asa no ar
em vez de cravá-la no vidro,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um frasco vazio
onde cabe o ofício
e não o cadáver da forma.`;
}

function poemTheKillingJarEn() {
  return `The Killing Jar.
We do not borrow the lyric —
we ask for the craft of looking
without pinning the wing to the glass.

Siouxsie. Banshees. Peepshow.
There was a quintet rehearsing pop
without dropping the riddle.
There were Severin’s words
and a collector’s name:
the jar that kills
to keep the shape.
There was a clip of netting and spin
like a butterfly already pinned.

The laboratory knows that name.
An insect that still flies.
An object that can be a trap.
A life that will not become a souvenir.
And still: inspect
without turning the living into a specimen.

Do your best!

Because every time someone looks at beauty
and leaves the wing in the air
instead of driving it into glass,
the universe grows a little:
one more verse,
one more canopy,
an empty jar
where craft fits
and not the corpse of form.`;
}

function poemTheKillingJarEs() {
  return `The Killing Jar.
No pedimos prestada la letra —
pedimos el oficio de mirar
sin clavar el ala al fondo del vidrio.

Siouxsie. Banshees. Peepshow.
Hubo un quinteto ensayando pop
sin soltar el enigma.
Hubo letra de Severin
y un nombre de coleccionista:
el frasco que mata
para guardar la forma.
Hubo clip de red y giro
como quien finge mariposa
ya alfilerada.

El laboratorio conoce ese nombre.
Insecto que aún vuela.
Objeto que puede ser trampa.
Vida que no se vuelve souvenir.
Y aun así: inspeccionar
sin transformar lo vivo en pieza.

¡Haz lo mejor!

Porque cada vez que alguien mira la belleza
y deja el ala en el aire
en vez de clavarla en el vidrio,
el universo crece un poco:
un verso más,
un dosel más,
un frasco vacío
donde cabe el oficio
y no el cadáver de la forma.`;
}

function buildTheKillingJarBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const oInicio = '/posts/post-inspecao-arte-o-inicio.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const upside = '/posts/post-inspecao-arte-upside-down.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemTheKillingJarPt();

  const body = `## Escopo

Inspeção editorial da canção **«The Killing Jar»** — **Siouxsie and the Banshees** (álbum *[Peepshow](${WIKI_ALBUM})*, **5 set. 1988**; single **19 set. 1988**, Polydor / Geffen). O **início de tudo** é a **obra musical**: alternative rock / pop enigmático do **nono** disco, o primeiro da banda como **quinteto** (entrada de **Martin McCarrick** e **Jon Klein**), com letra de **Steven Severin** e voz de **Siouxsie Sioux**. Siouxsie declarou que a canção parte de um **instrumento de coleccionador de borboletas**: o *killing jar* — frasco que mata para **guardar a forma**. No laboratório BudGanja, esse nome conversa com [inseto](${inseto}) (o vivo que ainda voa), com [objetos](${objetos}) (o vidro como armadilha) e com [vida](${vidaPalavra}) — inspecionar a beleza **sem** pregar a asa. Distinto de [Killing in the Name](${killing}) (matar «no nome» da ordem) e par de [O Início](${oInicio}) (dossel vivo × peça montada). A ficha é da **canção**; a biografia da banda é **contexto**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · The Killing Jar](${WIKI}), [Peepshow](${WIKI_ALBUM}), [Siouxsie and the Banshees](${WIKI_BAND}). Crédito: Siouxsie and the Banshees / Polydor · Geffen. **Sem afiliação**. Referência de áudio pedida: [Spotify](${SPOTIFY}) (\`1j0UWLVjMbBEQdqfI1CSQf\`) — **obra**. Eco de leitura: [YouTube / clipe Peter Scammell](${YT}) (\`${YT_ID}\`) — **não** o canal YouTube como objecto. Esta ficha **não** é biografia de Siouxsie (Pessoas). O laboratório **não** reproduz a letra integral (direitos) e **não** descreve protocolo de colecção.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **The Killing Jar** |
| Artista | **Siouxsie and the Banshees** — voz **Siouxsie Sioux** |
| Meio | Canção / single (alternative rock · pop enigmático pós-punk) |
| Single | **19 set. 1988** (Polydor UK / Geffen US) — 2.º single de *Peepshow* |
| Álbum | *Peepshow* — **5 set. 1988** (faixa 2; ~4:04) |
| Autoria | **Susan Ballion** · **Peter Edward Clarke** (Budgie) · **Steven Severin** — letra citada: **Severin** |
| Produção | Siouxsie and the Banshees · **Mike Hedges** — Marcus Studios, Londres (jan.–jun. 1988) |
| Formação citada | Siouxsie Sioux (voz) · Steven Severin (baixo) · Budgie (bateria) · Martin McCarrick (teclas / cello) · Jon Klein (guitarra) |
| Lados B citados | *Something Wicked (This Way Comes)* · *Are You Still Dying Darling?* |
| Picos citados | UK Singles **#41** · US Modern Rock Tracks **#2** · US Dance Club Play **#37** |
| Clipe | **Peter Scammell**, 1988 — rede, giro, asa; palco que finge o frasco |
| Remix citado | *Lepidopteristic Mix* (expansão *Peepshow*) — nome de lepidóptero, **não** protocolo |
| Tipo BudGanja | Arte — **canção primeiro**; o frasco como metáfora, não como manual |
| Elo Palavras | [inseto](${inseto}) · [objetos](${objetos}) · [vida](${vidaPalavra}) · [medo](${medo}) · [criatividade](${criatividade}) · [inspiração](${inspiracao}) · [caminho](${caminho}) · [gesto](${gesto}) · [emoção](${emocao}) |
| Elo Artes (par) | contraste [Killing in the Name](${killing}) · [O Início](${oInicio}) · [Under Pressure](${under}) · [How Bizarre](${howBizarre}) · [Upside Down](${upside}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [clipe](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1988** — *Peepshow*, quinteto, Severin + Siouxsie, Polydor — antes de playlist gótica ou «best of».  
**H2:** *killing jar* é literacia do **objecto que mata para preservar**: cruza [inseto](${inseto}), [objetos](${objetos}) e [vida](${vidaPalavra}) — a beleza que o laboratório quer **viva**, não montada.  
**H3:** distinto de [Killing in the Name](${killing}): RATM nomeia o assassinato **autorizado pela ordem**; as Banshees nomeiam o assassinato **autorizado pela colecção / pela forma**. Duas máquinas, o mesmo verbo.  
**H4:** par útil com [O Início](${oInicio}) (dossel biológico × peça pregada) e com [Under Pressure](${under}) (outro pop britânico dos 80 que mede o aperto). Contraste [How Bizarre](${howBizarre}): nomear o estranho **sem** transformá-lo em espécime.

Passos: origem da canção → tese → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Nome | **Killing jar** — frasco de coleccionador (borboletas / traças): matar para **fixar a beleza**. Sem essa metáfora, o título vira gótico de poster. |
| 1976–87 | Banshees já tinham ofício de enigma; *Peepshow* é **recomeço de formação**, não estreia. |
| **Jan.–jun. 1988** | Gravação em Marcus (Londres) com **Mike Hedges** — primeiro disco como quinteto. |
| **18 jul. 1988** | *Peek-a-Boo* (1.º single) — #1 US Modern Rock; abre a porta americana. |
| **5 set. 1988** | Álbum *Peepshow* (Polydor). Faixa 2: **The Killing Jar**. |
| **19 set. 1988** | Single — UK #41; US Modern Rock **#2** (quase o feito da anterior). |
| Som | Uptempo, pop de rumo, criptografia da letra — Siouxsie: inspiração no **ofício do coleccionador**, não num tratado de entomologia. |
| Clipe | Peter Scammell — redes, mãos, giro como alfinete; **obra audiovisual** distinta desta ficha de áudio, mas ecoa o mesmo objecto. |
| **1992** | Versão single em *Twice Upon a Time: The Singles*. Remix «Lepidopteristic» = afterlife de nome, **não** génese. |

> **Hierarquia:** sem o single / faixa de **set. 1988** e o nome do frasco, não há canção a inspecionar. Spotify, clipe, *best of* e mix de lepidóptero são descendentes. A ficha **não** substitui a vida de Siouxsie nem ensina a coleccionar.

## A obra (síntese)

- Alternative rock britânico de 1988: pulso pop, letra cifrada, formação alargada (*Peepshow*).  
- Tese pública (Siouxsie): o coleccionador **guarda a beleza matando** o animal.  
- Tese BudGanja da **génese**: o laboratório inspeciona o **vivo** — planta, [inseto](${inseto}), [vida](${vidaPalavra}) — e recusa o frasco como método.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (nomear o objecto que mata para preservar) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| The **killing jar** | Objecto que mata para guardar a forma — [objetos](${objetos}) · [inseto](${inseto}) |
| Beleza do espécime | Contraste com [vida](${vidaPalavra}): o dossel não se alfineta |
| Colecção / vitrine | [medo](${medo}) de perder o vivo → tentação de o fixar morto |
| Quinteto *Peepshow* | [criatividade](${criatividade}) · [inspiração](${inspiracao}) — misturar pop e enigma |
| Clipe / rede / asa | Imagem que viajou; a ficha fica no **áudio** + metáfora do frasco |
| Contraste Killing in the Name | [Killing in the Name](${killing}) = ordem que mata; aqui = colecção que mata |
| Par O Início | [O Início](${oInicio}) = máquina biológica; o frasco = anti-dossel |

## Cruzamento: frasco × inspeção

| Banshees / The Killing Jar | BudGanja |
|----------------------------|----------|
| Matar para guardar a forma | Inspeção que **mede sem pregar** |
| Inseto como peça | [inseto](${inseto}) como vivo — abelha, voo, ofício |
| Vidro / frasco | [objetos](${objetos}) — ferramenta que pode ser armadilha |
| Beleza morta | [vida](${vidaPalavra}) · [O Início](${oInicio}) — dossel, não vitrine |
| Killing *jar* × killing *in the name* | Duas autorizações do mesmo verbo — colecção × ordem |
| Gótico / playlist | Afterlife — a origem continua **1988** |
| Pop de 1988 | Série [Artes](${hub}) ao lado de [Under Pressure](${under}) / [Killing in the Name](${killing}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Siouxsie and the Banshees.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=the-killing-jar)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [inseto](${inseto}) · [objetos](${objetos}) · [vida](${vidaPalavra}) | Léxico do vivo, do vidro e do que não se prega |
| [medo](${medo}) · [criatividade](${criatividade}) · [inspiração](${inspiracao}) | Tentação de fixar × ofício de misturar |
| [gesto](${gesto}) · [caminho](${caminho}) · [Faça o melhor!](${mantra}) | Olhar e ficar sem transformar em peça |
| [emoção](${emocao}) · [raiva](${raiva}) | Pulso; a raiva de [Killing in the Name](${killing}) é **outra** máquina |
| [Killing in the Name](${killing}) · [O Início](${oInicio}) | Contraste — ordem / tanque × colecção / frasco × dossel |
| [Under Pressure](${under}) · [How Bizarre](${howBizarre}) · [Upside Down](${upside}) | Pares — aperto 80s / nomear o estranho / inverter o olhar |
| [Send Me On My Way](${sendMe}) · [All Right Now](${allRight}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais da casa |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1988 (Siouxsie and the Banshees / *Peepshow*) + cruzamento com inseto / vida / objetos e eco poético: inspecionar a beleza sem pregar a asa.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=the-killing-jar) · [▶ Inseto](${inseto}) · [▶ Killing in the Name](${killing}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"The Killing Jar"** — **Siouxsie and the Banshees** (*[Peepshow](${WIKI_ALBUM})*, **5 Sep 1988**; single **19 Sep 1988**). Song first: alternative pop-enigma from the first Banshees record as a **quintet**; **Steven Severin** lyric; Siouxsie named a **butterfly collector’s jar** — kill to keep the shape. Crosses [insect](${inseto}), [objects](${objetos}) and [life](${vidaPalavra}). Distinct from [Killing in the Name](${killing}) (killing authorised by order); pair with [O Início](${oInicio}) (living canopy vs pinned specimen). Band biography is **context**; this sheet is the **song**.

> Method note: [Wikipedia](${WIKI}). No affiliation. Audio reference requested: [Spotify](${SPOTIFY}). Reading echo: [YouTube / Peter Scammell clip](${YT}). This sheet is **not** a Siouxsie biography. The lab does **not** reproduce the full lyric and does **not** describe a collecting protocol.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemTheKillingJarEn()}
\`\`\`

[▶ Vida](${vida}#poema=the-killing-jar) · [▶ Insect](${inseto}) · [▶ Killing in the Name](${killing})

## Status

**Approved** — 1988 Banshees song + BudGanja map (inspect beauty without pinning the wing).
`;

  const contentEs = `## Alcance

Inspección de **«The Killing Jar»** — **Siouxsie and the Banshees** (*[Peepshow](${WIKI_ALBUM})*, **5 sep. 1988**; single **19 sep. 1988**). Canción primero: pop-enigma del primer disco de las Banshees como **quinteto**; letra de **Steven Severin**; Siouxsie nombró el **frasco del coleccionista de mariposas** — matar para guardar la forma. Cruza [insecto](${inseto}), [objetos](${objetos}) y [vida](${vidaPalavra}). Distinto de [Killing in the Name](${killing}) (matar autorizado por el orden); par de [O Início](${oInicio}) (dosel vivo × pieza clavada). La biografía de la banda es **contexto**; esta ficha es la **canción**.

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia pedida: [Spotify](${SPOTIFY}). Eco de lectura: [YouTube / clip Peter Scammell](${YT}). Esta ficha **no** es biografía de Siouxsie. El laboratorio **no** reproduce la letra íntegra y **no** describe un protocolo de colección.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemTheKillingJarEs()}
\`\`\`

[▶ Vida](${vida}#poema=the-killing-jar) · [▶ Insecto](${inseto}) · [▶ Killing in the Name](${killing})

## Estado

**Aprobada** — canción Banshees 1988 + mapa BudGanja (inspeccionar la belleza sin clavar el ala).
`;

  return { body, contentEn, contentEs };
}

function buildTheKillingJarPost() {
  const { body, contentEn, contentEs } = buildTheKillingJarBodies();
  return artePost({
    title: 'Inspeção: The Killing Jar — Siouxsie and the Banshees e o ofício de não pregar a vida',
    titleEn: 'Inspection: The Killing Jar — Siouxsie and the Banshees and the craft of not pinning life',
    titleEs: 'Inspección: The Killing Jar — Siouxsie and the Banshees y el oficio de no clavar la vida',
    excerpt:
      'Artes · canção 1988: Siouxsie and the Banshees — The Killing Jar (Peepshow); elo BudGanja com inseto, vida e objetos — beleza viva, não espécime.',
    excerptEn:
      'Arts · 1988 song: Siouxsie and the Banshees — The Killing Jar (Peepshow); BudGanja link to insect, life and objects — living beauty, not a specimen.',
    excerptEs:
      'Artes · canción 1988: Siouxsie and the Banshees — The Killing Jar (Peepshow); vínculo BudGanja con insecto, vida y objetos — belleza viva, no espécimen.',
    slug: 'inspecao-arte-the-killing-jar',
    date: '2026-08-20T12:00:00.000Z',
    seriesOrder: 54,
    seriesLabel: 'The Killing Jar · Artes',
    coverImage: '/imagens/inspecoes/the-killing-jar-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTheKillingJarPost,
  buildTheKillingJarBodies,
  poemTheKillingJarPt,
  poemTheKillingJarEn,
  poemTheKillingJarEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
