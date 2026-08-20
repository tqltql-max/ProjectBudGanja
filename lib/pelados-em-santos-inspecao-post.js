'use strict';

/**
 * Artes · canção «Pelados em Santos» (Mamonas Assassinas, 1995).
 * Spotify pedido: 2iJpjciYl8vfQbb543b5Pb.
 * Elos BudGanja: alegria / língua / objectos (Brasília amarela) /
 * «sabiam de tudo e cairam no lugar certo — ou não»: afterlife, sem veredicto.
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

const YT_ID = 'Nz7101ulkK0';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/2iJpjciYl8vfQbb543b5Pb';
const WIKI = 'https://pt.wikipedia.org/wiki/Pelados_em_Santos';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Pelados_em_Santos';
const WIKI_BAND = 'https://pt.wikipedia.org/wiki/Mamonas_Assassinas';

/** Eco poético do laboratório — não é letra dos Mamonas. */
function poemPeladosEmSantosPt() {
  return `Pelados em Santos.
Não pedimos a letra emprestada —
pedimos o ofício de rir
sem transformar o morto em piada
nem o litoral em palco de venda.

Mamonas. Dinho. Guarulhos.
Houve uma banda que se chamava Utopia
e aprendeu que o grave também inspeciona.
Houve uma Brasília amarela de portas abertas —
objecto primeiro, pose depois.
Houve inglês torto, oxente e brega no mesmo refrão,
como quem mistura substrato
sem fingir que é só uma língua.

O laboratório conhece essa mistura.
Alegria que não esmaga.
Objecto que viaja — carro, costa, nome de cidade.
Paraguai de punchline ≠ país da ficha.
Dizem que sabiam de tudo
e cairam no lugar certo.
Ou não.
A ficha não fecha o céu.
E ainda assim: ficar.
Dar o verso sem pedir o corpo de volta.
Chamar a Vida pelo nome verdadeiro:
verdade —
rir do ofício
sem fingir que o acidente foi um plano
nem que foi só azar sem resto.

Faça o melhor!

Porque toda vez que alguém ri
e deixa a pergunta aberta
em vez de transformar a queda em destino
ou em zombaria,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma Brasília amarela
onde ainda cabe Santos
sem ser túmulo.`;
}

function poemPeladosEmSantosEn() {
  return `Pelados em Santos.
We do not borrow the lyric —
we ask for the craft of laughing
without turning the dead into a joke
or the coast into a sales stage.

Mamonas. Dinho. Guarulhos.
There was a band once called Utopia
that learned the punchline also inspects.
There was a yellow Brasília with open doors —
object first, pose later.
There was crooked English, oxente and kitsch in the same chorus,
the way one mixes substrate
without pretending there is only one tongue.

The laboratory knows that mix.
Joy that does not crush.
An object that travels — car, coast, city name.
Paraguay as punchline ≠ the country on the sheet.
They say they knew it all
and fell in the right place.
Or not.
The sheet does not close the sky.
And still: stay.
Give the verse without asking the body back.
Call Vida by its true name:
truth —
laugh at the craft
without pretending the crash was a plan
or that it was only luck with no remainder.

Do your best!

Because every time someone laughs
and leaves the question open
instead of turning the fall into destiny
or into mockery,
the universe grows a little:
one more verse,
one more canopy,
a yellow Brasília
where Santos still fits
without being a tomb.`;
}

function poemPeladosEmSantosEs() {
  return `Pelados em Santos.
No pedimos prestada la letra —
pedimos el oficio de reír
sin transformar al muerto en chiste
ni el litoral en escenario de venta.

Mamonas. Dinho. Guarulhos.
Hubo una banda que se llamaba Utopia
y aprendió que el chiste también inspecciona.
Hubo una Brasília amarilla de puertas abiertas —
objeto primero, pose después.
Hubo inglés torcido, oxente y brega en el mismo estribillo,
como quien mezcla sustrato
sin fingir que hay una sola lengua.

El laboratorio conoce esa mezcla.
Alegría que no aplasta.
Objeto que viaja — auto, costa, nombre de ciudad.
Paraguay de punchline ≠ el país de la ficha.
Dicen que lo sabían todo
y cayeron en el lugar justo.
O no.
La ficha no cierra el cielo.
Y aun así: quedarse.
Dar el verso sin pedir el cuerpo de vuelta.
Llamar a Vida por su nombre verdadero:
verdad —
reír del oficio
sin fingir que el accidente fue un plan
ni que fue solo azar sin resto.

¡Haz lo mejor!

Porque cada vez que alguien ríe
y deja la pregunta abierta
en vez de transformar la caída en destino
o en burla,
el universo crece un poco:
un verso más,
un dosel más,
una Brasília amarilla
donde aún cabe Santos
sin ser tumba.`;
}

function buildPeladosEmSantosBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const vira = '/posts/post-inspecao-arte-vira-vira.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const middle = '/posts/post-inspecao-arte-the-middle.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const objetos = '/objetos/';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
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
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemPeladosEmSantosPt();

  const body = `## Escopo

Inspeção editorial da canção **«Pelados em Santos»** — **Mamonas Assassinas** (álbum homónimo, **1995**; EMI; produção **Rick Bonadio**). O **início de tudo** é a **obra musical**: rock cômico de **Guarulhos** que mistura brega, inglês torto, *oxente* nordestino e pop-rock — e nomeia uma **Brasília amarela** como objecto de ostentação falhada. No laboratório BudGanja, a faixa conversa com [alegria](${alegria}) (rir sem esmagar), com [língua portuguesa](${lingua}) (várias falas no mesmo refrão) e com [Objetos](${objetos}) — o carro primeiro; a pose depois. Distinto de [How Bizarre](${howBizarre}) (1995 também: nomear o estranho sem zombaria) e par de [Só os Loucos Sabem](${loucos}) (outro ofício brasileiro; Bonadio no mapa, não na mesma banda). A ficha é da **canção**. O acidente de **2 jun. 1996** é **contexto**. A leitura popular — *sabiam de tudo e cairam no lugar certo* — fica em tensão com o **ou não**: [verdade](${verdade}) sem fechar o céu.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Pelados em Santos](${WIKI}), [EN](${WIKI_EN}), [Mamonas Assassinas](${WIKI_BAND}). Crédito: **Dinho** (Alecsander Alves Leite) — EMI / Universal. **Sem afiliação**. Referência de áudio pedida: [Spotify](${SPOTIFY}) (\`2iJpjciYl8vfQbb543b5Pb\`) — **obra**. Eco audiovisual: [clipe oficial / VEVO](${YT}) (\`${YT_ID}\`) — © 1995 EMI Records Brasil. Esta ficha **não** é biografia da banda (Pessoas) nem necrológio. O laboratório **não** reproduz a letra integral (direitos). **Não** trata a canção como convite a humilhar quem recusa o convite. **Não** transforma o acidente em destino comprovado nem em azar sem resto.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Pelados em Santos** |
| Artista | **Mamonas Assassinas** (Guarulhos) |
| Meio | Canção / single (rock cômico · pop-rock · brega) |
| Álbum / single | Álbum *Mamonas Assassinas* — **1995** (EMI); single **jul. 1995** |
| Autoria | **Dinho** (Alecsander Alves) |
| Produção | **Rick Bonadio** («Creuzebek») · Rodrigo Castanho (demo) |
| Formação citada | Dinho (voz) · Bento Hinoto (guitarra) · Júlio Rasec (teclados) · Samuel Reoli (baixo) · Sérgio Reoli (bateria) |
| Duração citada | ~3:21–3:23 |
| Antepassado | *Mina (Minha Pitchulinha)* — Utopia; Praia Grande / Vila Caiçara (fim de 1991, relatos de família) |
| Clipe | João Elias Jr., **out. 1995** — Brasília amarela; modelo Nereide Nogueira; um dos **dois** clipes da banda (com [Vira-Vira](${vira})) |
| Tipo BudGanja | Arte — **canção primeiro**; o carro e o litoral como génese, não como relíquia |
| Elo Palavras | [alegria](${alegria}) · [legal](${legal}) · [criatividade](${criatividade}) · [língua portuguesa](${lingua}) · [caminho](${caminho}) · [passar](${passar}) · [verdade](${verdade}) · [esperança](${esperanca}) · [gesto](${gesto}) · [vida](${vidaPalavra}) · [Paraguai](${paraguai}) |
| Elo Objetos | [Objetos](${objetos}) · [DeLorean](${delorean}) — outro carro nomeado; aqui a Brasília |
| Elo Artes (par) | [Vira-Vira](${vira}) · [How Bizarre](${howBizarre}) · [Só os Loucos Sabem](${loucos}) · [The Middle](${middle}) · [All Right Now](${allRight}) · contraste [Under Pressure](${under}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [clipe VEVO](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1991–95** — Praia Grande / *Pitchulinha* → demo cômica → EMI — antes do filme de 2023, da marca póstuma ou da playlist «anos 90».  
**H2:** o **humor** é ofício: cruza [alegria](${alegria}) e [legal](${legal}) — rir da ostentação falhada, **não** rir de quem já não responde.  
**H3:** a **Brasília amarela** é [objecto](${objetos}) inspeccionável (carro real no clipe) — par de [DeLorean](${delorean}): máquina nomeada, pose depois.  
**H4:** «Paraguai» no refrão é **punchline de viagem/consumo**, distinto da ficha [Paraguai](${paraguai}) (país). A mistura de falas é [língua portuguesa](${lingua}) viva, não erro a corrigir. Distinto de [How Bizarre](${howBizarre}) (1995: nomear o estranho sem cinismo). Par de [Só os Loucos Sabem](${loucos}): outro palco BR; Bonadio no mapa CBJr, aqui no disco dos Mamonas.  
**H5:** a leitura *sabiam de tudo e cairam no lugar certo* é **afterlife cultural**, não génese da canção. O laboratório guarda o **ou não**: [verdade](${verdade}) sem fechar o céu; [passar](${passar}) sem transformar a queda em plano. Nem destino comprovado, nem azar sem resto.

Passos: origem da canção → tese (rir do ofício) → queda em tensão → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Utopia (1989–)** | Bento Hinoto + irmãos Reoli; Dinho e Júlio entram depois. Repertório «sério» e covers (Titãs). Sem a viragem cômica, não há Mamonas a inspecionar. |
| **Fim de 1991** | Relatos de família (Grace Kellen Alves / Jorge Santana): letra de Dinho em **Praia Grande** (Vila Caiçara), em homenagem a um primo e ao brega de Reginaldo Rossi. Santos entra depois — cidade mais conhecida. |
| **Demo / Bonadio** | Dinho pede a noite no estúdio para faixas de churrasco. Bonadio e Castanho ouvem potencial e pedem **rock + letra cômica**. O grupo muda o nome. |
| **Título** | *Mina (Minha Pitchulinha)* → **Pelados em Santos**. Demo com *Robocop Gay* e *Vira-Vira* → EMI (Rafael Ramos insiste junto ao pai, João Augusto). |
| **1995** | Álbum homónimo; a faixa entre as mais tocadas do ano no Brasil (3.ª, sínteses). Disco de diamante citado para o álbum (>3 milhões). |
| **Out. 1995** | Clipe — Brasília amarela, bancos de oncinha, Nereide Nogueira. **Obra audiovisual**; a ficha fica no **áudio**. |
| **2 jun. 1996** | Acidente aéreo — os cinco. Afterlife (coletâneas, filme 2023, marca): **descendentes**. Leitura popular: *sabiam de tudo / cairam no lugar certo*. **Ou não.** A ficha não decide o céu. |

> **Hierarquia:** sem *Pitchulinha* / demo e o álbum **1995**, não há canção a inspecionar. Spotify, VEVO e o filme são descendentes. A ficha **não** substitui a vida da banda nem pede o corpo de volta.

## A obra (síntese)

- Rock cômico curto (~3:22): riff de rádio, refrão que o país decorou, tese de **ostentação que não convence**.  
- Tese pública: o narrador oferece carro, viagem e marca; a outra pessoa recusa. O riso está no **descompasso**, não no corpo.  
- Tese BudGanja da **génese**: [alegria](${alegria}) como método — misturar falas e objectos sem transformar o litoral em túmulo nem o [Paraguai](${paraguai}) em souvenir de guerra.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (rir do ofício) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Brasília amarela | [Objetos](${objetos}) · [DeLorean](${delorean}) — carro nomeado, pose depois |
| Santos / Praia Grande | [caminho](${caminho}) — o litoral como palco; a cidade do título é escolha de mapa |
| Inglês / oxente / brega | [língua portuguesa](${lingua}) · [criatividade](${criatividade}) — mistura como ofício |
| Recusa do convite | [legal](${legal}) · [gesto](${gesto}) — quem diz não também inspeciona |
| Punchline Paraguai | Distinto de [Paraguai](${paraguai}) (país) — consumo × ficha geográfica |
| Humor 1995 | [alegria](${alegria}) sem necrológio — o riso cabe **antes** do acidente |
| Sabiam / cairam | Afterlife — [verdade](${verdade}) · [passar](${passar}) · [esperança](${esperanca}): *lugar certo* **ou não** |
| Par How Bizarre | [How Bizarre](${howBizarre}) = nomear o estranho; aqui = rir da ostentação |
| Par CBJr / Bonadio | [Só os Loucos Sabem](${loucos}) — outro palco; mesmo produtor no mapa brasileiro |

## Cruzamento: humor × inspeção

| Mamonas / Pelados em Santos | BudGanja |
|-----------------------------|----------|
| Rir da ostentação falhada | Inspeção que **nomeia o descompasso** sem humilhar o recusado |
| Brasília no clipe | Objecto no catálogo — não relíquia de acidente |
| Várias falas no refrão | [língua portuguesa](${lingua}) viva |
| Utopia → Mamonas | Viragem de ofício — o grave também mede |
| Afterlife / filme 2023 | Descendentes — a origem continua 1995 |
| Sabiam de tudo / lugar certo | Leitura que o país guarda — **ou não**; a inspeção não fecha |
| Rock cômico brasileiro | Série [Artes](${hub}) ao lado de [How Bizarre](${howBizarre}) / [Só os Loucos…](${loucos}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra dos Mamonas Assassinas nem de Dinho.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=pelados-em-santos)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [alegria](${alegria}) · [legal](${legal}) · [criatividade](${criatividade}) | Léxico do riso / estado / mistura |
| [língua portuguesa](${lingua}) · [caminho](${caminho}) · [gesto](${gesto}) | Fala, litoral, recusa |
| [verdade](${verdade}) · [passar](${passar}) · [esperança](${esperanca}) | Sabiam / cairam — **ou não** |
| [Objetos](${objetos}) · [DeLorean](${delorean}) | Carro nomeado |
| [Paraguai](${paraguai}) | País da ficha ≠ punchline de viagem |
| [Vira-Vira](${vira}) · [How Bizarre](${howBizarre}) · [Só os Loucos Sabem](${loucos}) · [The Middle](${middle}) · [All Right Now](${allRight}) | Pares 1995 / palco BR / agora |
| [Under Pressure](${under}) | Contraste — aperto que esmaga × riso que não esmaga |
| [Faça o melhor!](${mantra}) · [vida](${vidaPalavra}) | Ofício, percurso |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1995 (Mamonas Assassinas / EMI) + cruzamento com alegria / língua / objectos e eco poético: rir do ofício; *sabiam e cairam no lugar certo — ou não*. Referência de áudio pedida: Spotify.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe VEVO](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=pelados-em-santos) · [▶ Objetos](${objetos}) · [▶ Verdade](${verdade}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Pelados em Santos"** — **Mamonas Assassinas** (self-titled album, **1995**; EMI; **Rick Bonadio**). Song first: Guarulhos comedy rock that names a **yellow Brasília** as a failed-ostentation object. Crosses [joy](${alegria}), [Portuguese](${lingua}) and [Objects](${objetos}). Distinct from [How Bizarre](${howBizarre}) (also 1995). Pair with [Só os Loucos Sabem](${loucos}). The **2 Jun 1996** crash is **context**. Folk reading: *they knew it all and fell in the right place* — **or not**. The sheet does not close the sky. Requested audio: [Spotify](${SPOTIFY}).

> Method note: [Wikipedia](${WIKI_EN}). No affiliation. Clip: [official VEVO](${YT}). This sheet is **not** a band biography or an obituary. The lab does **not** reproduce the full lyric.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemPeladosEmSantosEn()}
\`\`\`

[▶ Vida](${vida}#poema=pelados-em-santos) · [▶ Objects](${objetos}) · [▶ Joy](${alegria})

## Status

**Approved** — 1995 Mamonas song + BudGanja map (laugh at the craft; *they knew and fell in the right place — or not*). Requested audio: Spotify.
`;

  const contentEs = `## Alcance

Inspección de **«Pelados em Santos»** — **Mamonas Assassinas** (álbum homónimo, **1995**; EMI; **Rick Bonadio**). Canción primero: rock cómico de Guarulhos que nombra una **Brasília amarilla** como objeto de ostentación fallida. Cruza [alegría](${alegria}), [lengua portuguesa](${lingua}) y [Objetos](${objetos}). Distinto de [How Bizarre](${howBizarre}) (también 1995). Par de [Só os Loucos Sabem](${loucos}). El accidente del **2 jun. 1996** es **contexto**. Lectura popular: *lo sabían todo y cayeron en el lugar justo* — **o no**. La ficha no cierra el cielo. Audio pedido: [Spotify](${SPOTIFY}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Videoclip: [VEVO oficial](${YT}). Esta ficha **no** es biografía ni necrológico. El laboratorio **no** reproduce la letra íntegra.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemPeladosEmSantosEs()}
\`\`\`

[▶ Vida](${vida}#poema=pelados-em-santos) · [▶ Objetos](${objetos}) · [▶ Alegría](${alegria})

## Estado

**Aprobada** — canción Mamonas 1995 + mapa BudGanja (reír del oficio; *lo sabían y cayeron en el lugar justo — o no*). Audio pedido: Spotify.
`;

  return { body, contentEn, contentEs };
}

function buildPeladosEmSantosPost() {
  const { body, contentEn, contentEs } = buildPeladosEmSantosBodies();
  return artePost({
    title: 'Inspeção: Pelados em Santos — Mamonas e o ofício de rir sem esmagar',
    titleEn: 'Inspection: Pelados em Santos — Mamonas and the craft of laughing without crushing',
    titleEs: 'Inspección: Pelados em Santos — Mamonas y el oficio de reír sin aplastar',
    excerpt:
      'Artes · canção 1995: Mamonas Assassinas — Pelados em Santos; elo BudGanja com alegria, língua e objectos. Sabiam de tudo e cairam no lugar certo — ou não.',
    excerptEn:
      'Arts · 1995 song: Mamonas Assassinas — Pelados em Santos; BudGanja link to joy, language and objects. They knew it all and fell in the right place — or not.',
    excerptEs:
      'Artes · canción 1995: Mamonas Assassinas — Pelados em Santos; vínculo BudGanja con alegría, lengua y objetos. Lo sabían todo y cayeron en el lugar justo — o no.',
    slug: 'inspecao-arte-pelados-em-santos',
    date: '2026-08-20T16:00:00.000Z',
    seriesOrder: 62,
    seriesLabel: 'Pelados em Santos · Artes',
    coverImage: '/imagens/inspecoes/pelados-em-santos-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPeladosEmSantosPost,
  buildPeladosEmSantosBodies,
  poemPeladosEmSantosPt,
  poemPeladosEmSantosEn,
  poemPeladosEmSantosEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
