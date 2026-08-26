'use strict';

/**
 * Artes · canção «Vira-Vira» (Mamonas Assassinas, 1995).
 * Spotify: álbum 1995 (2XGRcNVv7uJozHCRLl7SG8) — não a compilação do filme 2023.
 * Par de Pelados em Santos: o outro clipe; sátira do género (vira), não de um povo.
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

const YT_ID = '1WjI3DLOk4c';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/2XGRcNVv7uJozHCRLl7SG8';
const WIKI = 'https://pt.wikipedia.org/wiki/Vira-Vira';
const WIKI_ALBUM = 'https://pt.wikipedia.org/wiki/Mamonas_Assassinas_(%C3%A1lbum)';
const WIKI_BAND = 'https://pt.wikipedia.org/wiki/Mamonas_Assassinas';

/** Eco poético do laboratório — não é letra dos Mamonas. */
function poemViraViraPt() {
  return `Vira-Vira.
Não pedimos a letra emprestada —
pedimos o ofício de virar
sem transformar um povo em piada
nem o primeiro clipe em relíquia.

Mamonas. Dinho. Júlio.
Houve um vira que já dançava noutro palco
e um rock de Guarulhos que aprendeu o passo.
Houve um clipe com pouco dinheiro —
Rasec ao fundo, a avó a reconhecer.
Houve quem esperasse processo
e encontrou amizade.

O laboratório conhece essa viragem.
Alegria que não esmaga o vizinho.
Género primeiro — vira, Arrebita, ofício.
Piada de palco ≠ protocolo de humilhação.
Par de Brasília amarela: outro clipe, mesma banda.
A queda fica na ficha irmã —
ou não.
Aqui vira-se o passo, não o céu.

Valeu !!!

Porque toda vez que alguém parodia um género
e deixa o povo de pé
em vez de transformar a dança em alvo,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um vira
onde ainda cabe Portugal
sem ser palco de venda.`;
}

function poemViraViraEn() {
  return `Vira-Vira.
We do not borrow the lyric —
we ask for the craft of turning
without turning a people into a joke
or the first clip into a relic.

Mamonas. Dinho. Júlio.
There was a vira that already danced on another stage
and a Guarulhos rock that learned the step.
There was a clip with little money —
Rasec in the back, a grandmother recognising him.
There were those who expected a lawsuit
and found friendship.

The laboratory knows that turn.
Joy that does not crush the neighbour.
Genre first — vira, Arrebita, craft.
A stage joke ≠ a protocol of humiliation.
Pair of the yellow Brasília: another clip, same band.
The fall stays on the sister sheet —
or not.
Here the step turns, not the sky.

Valeu !!!

Because every time someone parodies a genre
and leaves the people standing
instead of turning the dance into a target,
the universe grows a little:
one more verse,
one more canopy,
a vira
where Portugal still fits
without being a sales stage.`;
}

function poemViraViraEs() {
  return `Vira-Vira.
No pedimos prestada la letra —
pedimos el oficio de virar
sin transformar a un pueblo en chiste
ni el primer videoclip en reliquia.

Mamonas. Dinho. Júlio.
Hubo un vira que ya bailaba en otro escenario
y un rock de Guarulhos que aprendió el paso.
Hubo un clip con poco dinero —
Rasec al fondo, la abuela reconociéndolo.
Hubo quien esperaba un juicio
y encontró amistad.

El laboratorio conoce ese giro.
Alegría que no aplasta al vecino.
Género primero — vira, Arrebita, oficio.
Chiste de escenario ≠ protocolo de humillación.
Par de la Brasília amarilla: otro clip, misma banda.
La caída queda en la ficha hermana —
o no.
Aquí gira el paso, no el cielo.

¡Valeu !!!

Porque cada vez que alguien parodia un género
y deja al pueblo de pie
en vez de transformar el baile en blanco,
el universo crece un poco:
un verso más,
un dosel más,
un vira
donde aún cabe Portugal
sin ser escenario de venta.`;
}

function buildViraViraBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const pelados = '/posts/post-inspecao-arte-pelados-em-santos.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const middle = '/posts/post-inspecao-arte-the-middle.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemViraViraPt();

  const body = `## Escopo

Inspeção editorial da canção **«Vira-Vira»** — **Mamonas Assassinas** (álbum homónimo, **1995**; EMI; produção **Rick Bonadio**). O **início de tudo** é a **obra musical**: rock cômico curto (~2:21) que parodia o **vira** português — género e palco de **Roberto Leal** (*Arrebita*, *Na Casa da Mariquinha*), não um povo a esmagar. No laboratório BudGanja, a faixa conversa com [alegria](${alegria}) (rir do ofício), com [língua portuguesa](${lingua}) (o passo cruza o Atlântico sem apagar o vizinho) e com [respeito](${respeito}) — Leal leu **homenagem**, não processo. Par de [Pelados em Santos](${pelados}): o **outro** dos dois clipes da banda; o primeiro, com poucos recursos. A ficha é da **canção**. O acidente de **2 jun. 1996** fica na ficha irmã — *sabiam e cairam no lugar certo* — **ou não**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Vira-Vira](${WIKI}), [álbum](${WIKI_ALBUM}), [Mamonas Assassinas](${WIKI_BAND}). Crédito: **Dinho** e **Júlio Rasec** — EMI / Universal. **Sem afiliação**. Referência de áudio: [Spotify · álbum 1995](${SPOTIFY}) (\`2XGRcNVv7uJozHCRLl7SG8\`) — **obra**, não a compilação do filme 2023. Eco audiovisual: [clipe / VEVO](${YT}) (\`${YT_ID}\`) — © 1995 EMI Records Brasil. Esta ficha **não** é biografia da banda nem necrológio. O laboratório **não** reproduz a letra integral (direitos). **Não** trata a canção como protocolo de humilhação de portugueses nem de mulheres. A sátira é do **género** (vira) e de um palco de humor; a piada de palco (Costinha) é **ancestral da letra**, não o objecto.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Vira-Vira** |
| Artista | **Mamonas Assassinas** (Guarulhos) |
| Meio | Canção / single (rock cômico · vira · hard rock) |
| Álbum / single | Álbum *Mamonas Assassinas* — **23 jun. 1995**; single **ago. 1995** |
| Autoria | **Dinho** · **Júlio Rasec** |
| Produção | **Rick Bonadio** |
| Duração citada | ~2:21–2:24 |
| Referência musical | Género **vira**; *Arrebita* / *Na Casa da Mariquinha* (Roberto Leal, anos 1970) |
| Clipe | **Primeiro** da banda — poucos recursos; Rasec «ao fundo» (relato à avó). Par audiovisual de [Pelados em Santos](${pelados}) |
| Rádio 1995 | 2.ª mais tocada no Brasil (sínteses citadas) |
| Tipo BudGanja | Arte — **canção primeiro**; o vira como génese, não como alvo de povo |
| Elo Palavras | [alegria](${alegria}) · [legal](${legal}) · [respeito](${respeito}) · [criatividade](${criatividade}) · [língua portuguesa](${lingua}) · [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) |
| Elo Artes (par) | [Pelados em Santos](${pelados}) · [How Bizarre](${howBizarre}) · [Só os Loucos Sabem](${loucos}) · [The Middle](${middle}) · [All Right Now](${allRight}) · contraste [Under Pressure](${under}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify 1995](${SPOTIFY}) · [clipe VEVO](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1995** — vira + demo cômica + EMI — antes do filme 2023 e das relançagens.  
**H2:** a sátira é do **género** (vira / Leal), não de um povo. [respeito](${respeito}) e [legal](${legal}): Leal recusou processar; leu que a faixa o levou a outra geração.  
**H3:** o **primeiro clipe** é ofício com pouco dinheiro — par de [Pelados em Santos](${pelados}) (Brasília amarela, auge). Dois clipes; dois gestos.  
**H4:** a letra ancora-se numa piada de palco (Costinha). A ficha **não** reproduz o chiste nem o trata como protocolo. Distinto de [Paraguai](${paraguai}) na ficha irmã: punchline de consumo ≠ país. Aqui: passo português ≠ alvo.  
**H5:** afterlife (Leal *A Festa Ainda Pode Ser Bonita*, filme 2023) é **descendente**. A queda de 1996 fica em [Pelados em Santos](${pelados}): *lugar certo* **ou não**. Esta ficha vira o passo, não o céu.

Passos: origem da canção → tese (parodiar o género sem esmagar o vizinho) → clipe primeiro → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Vira (folclore)** | Dança e canção portuguesas. Sem o género, não há paródia a inspecionar. |
| **Roberto Leal, anos 1970** | *Arrebita*, *Na Casa da Mariquinha* — palco que a faixa nomeia por melodia e ofício. |
| **Demo / EMI 1995** | *Vira-Vira* na demo com *Pelados* e *Robocop Gay*. Álbum **23 jun. 1995**; single **agosto**. |
| **Clipe primeiro** | Poucos recursos; o auge audiovisual é [Pelados em Santos](${pelados}). |
| **Leal** | Em entrevista: esperavam processo; ele leu convite à nova geração e amizade. Afterlife: *A Festa Ainda Pode Ser Bonita*. |
| **2 jun. 1996** | Contexto — ficha irmã [Pelados em Santos](${pelados}). **Ou não.** |

> **Hierarquia:** sem o vira e o álbum **1995**, não há canção a inspecionar. Spotify, VEVO e o filme são descendentes.

## A obra (síntese)

- Rock cômico curto (~2:21): passo de vira no palco BR.  
- Tese pública: paródia de um **género** e de um palco de humor.  
- Tese BudGanja: [alegria](${alegria}) que não transforma Portugal em alvo nem a mulher da piada em protocolo.  
- O laboratório **não** reproduz a letra (direitos); inspeciona o **método**.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Vira / Leal | Género e palco — [criatividade](${criatividade}) · [gesto](${gesto}) |
| Clipe precário | Ofício com pouco — par de [Pelados em Santos](${pelados}) |
| Recusa de processo | [legal](${legal}) · [respeito](${respeito}) — Leal leu homenagem |
| Piada de palco | Ancestral da letra — **não** o objecto; não se reproduz |
| Língua / Atlântico | [língua portuguesa](${lingua}) · [caminho](${caminho}) — o passo cruza sem apagar |
| Afterlife Leal / filme | Descendentes — a origem continua 1995 |
| Queda 1996 | [Pelados em Santos](${pelados}) — **ou não** |

## Cruzamento: paródia × inspeção

| Mamonas / Vira-Vira | BudGanja |
|---------------------|----------|
| Parodiar o vira | Inspeção que **nomeia o género** sem humilhar o povo |
| Primeiro clipe | Ofício visível com pouco — não relíquia |
| Leal amigo, não processo | [respeito](${respeito}) · [legal](${legal}) |
| Dois clipes | Par de [Pelados em Santos](${pelados}) |
| Costinha | Fonte da letra ≠ protocolo da ficha |
| Rock cômico brasileiro | Série [Artes](${hub}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra dos Mamonas Assassinas nem de Dinho.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=vira-vira)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [alegria](${alegria}) · [respeito](${respeito}) · [legal](${legal}) | Riso / vizinho / recusa de processo |
| [língua portuguesa](${lingua}) · [gesto](${gesto}) · [caminho](${caminho}) | Passo que cruza |
| [verdade](${verdade}) · [passar](${passar}) · [esperança](${esperanca}) | Afterlife — a queda na ficha irmã |
| [Pelados em Santos](${pelados}) | Par — outro clipe; *ou não* |
| [How Bizarre](${howBizarre}) · [Só os Loucos Sabem](${loucos}) · [The Middle](${middle}) · [All Right Now](${allRight}) | Pares |
| [Under Pressure](${under}) | Contraste — aperto que esmaga × virar sem esmagar |
| [Valeu !!!](${mantra}) · [vida](${vidaPalavra}) | Ofício |
| [Rádio](${radio}) | Eco secundário |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1995 (Mamonas Assassinas / EMI) + cruzamento com alegria / respeito / língua: parodiar o **vira** sem esmagar o vizinho; par de [Pelados em Santos](${pelados}). Referência de áudio: Spotify do álbum 1995.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe VEVO](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=vira-vira) · [▶ Pelados em Santos](${pelados}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Vira-Vira"** — **Mamonas Assassinas** (self-titled album, **1995**; EMI; **Rick Bonadio**). Song first: short comedy rock that parodies the Portuguese **vira** — a **genre** and Roberto Leal’s stage, not a people to crush. Crosses [joy](${alegria}), [Portuguese](${lingua}) and [respect](${respeito}). Pair with [Pelados em Santos](${pelados}): the band’s **other** clip; this one first, with little money. The **2 Jun 1996** crash stays on the sister sheet — **or not**. Requested audio: [Spotify · 1995 album](${SPOTIFY}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Clip: [VEVO](${YT}). This sheet is **not** a biography or an obituary. The lab does **not** reproduce the full lyric and does **not** treat the song as a protocol for humiliating Portuguese people or women.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemViraViraEn()}
\`\`\`

[▶ Vida](${vida}#poema=vira-vira) · [▶ Pelados em Santos](${pelados}) · [▶ Respect](${respeito})

## Status

**Approved** — 1995 Mamonas song + BudGanja map (parody the genre without crushing the neighbour). Requested audio: Spotify.
`;

  const contentEs = `## Alcance

Inspección de **«Vira-Vira»** — **Mamonas Assassinas** (álbum homónimo, **1995**; EMI; **Rick Bonadio**). Canción primero: rock cómico corto que parodia el **vira** portugués — un **género** y el escenario de Roberto Leal, no un pueblo a aplastar. Cruza [alegría](${alegria}), [lengua portuguesa](${lingua}) y [respeto](${respeito}). Par de [Pelados em Santos](${pelados}): el **otro** videoclip; este el primero, con pocos recursos. El accidente del **2 jun. 1996** queda en la ficha hermana — **o no**. Audio: [Spotify · álbum 1995](${SPOTIFY}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Videoclip: [VEVO](${YT}). Esta ficha **no** es biografía ni necrológico. El laboratorio **no** reproduce la letra íntegra ni trata la canción como protocolo de humillación.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemViraViraEs()}
\`\`\`

[▶ Vida](${vida}#poema=vira-vira) · [▶ Pelados em Santos](${pelados}) · [▶ Respeto](${respeito})

## Estado

**Aprobada** — canción Mamonas 1995 + mapa BudGanja (parodiar el género sin aplastar al vecino). Audio pedido: Spotify.
`;

  return { body, contentEn, contentEs };
}

function buildViraViraPost() {
  const { body, contentEn, contentEs } = buildViraViraBodies();
  return artePost({
    title: 'Inspeção: Vira-Vira — Mamonas e o ofício de virar sem esmagar',
    titleEn: 'Inspection: Vira-Vira — Mamonas and the craft of turning without crushing',
    titleEs: 'Inspección: Vira-Vira — Mamonas y el oficio de virar sin aplastar',
    excerpt:
      'Artes · canção 1995: Mamonas Assassinas — Vira-Vira; paródia do género (vira), não de um povo. Par de Pelados em Santos: o outro clipe.',
    excerptEn:
      'Arts · 1995 song: Mamonas Assassinas — Vira-Vira; parody of the genre (vira), not of a people. Pair with Pelados em Santos: the other clip.',
    excerptEs:
      'Artes · canción 1995: Mamonas Assassinas — Vira-Vira; parodia del género (vira), no de un pueblo. Par de Pelados em Santos: el otro videoclip.',
    slug: 'inspecao-arte-vira-vira',
    date: '2026-08-20T17:00:00.000Z',
    seriesOrder: 63,
    seriesLabel: 'Vira-Vira · Artes',
    coverImage: '/imagens/inspecoes/vira-vira-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildViraViraPost,
  buildViraViraBodies,
  poemViraViraPt,
  poemViraViraEn,
  poemViraViraEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
