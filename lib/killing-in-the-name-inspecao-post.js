'use strict';

/**
 * Artes · canção «Killing in the Name» (Rage Against the Machine, 1992).
 * Cruzamento com O Início / tanques de guerra / proibição / raiva nomeada.
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

const YT_ID = 'bWXazVhlyxQ';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Killing_in_the_Name';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Rage_Against_the_Machine_(album)';

/** Eco poético do laboratório — não é letra da RATM. */
function poemKillingInTheNamePt() {
  return `Killing in the Name.
Não pedimos a letra emprestada —
pedimos o ofício de ouvir
quando matam em nome de alguma coisa
e chamam isso de ordem.

Rage Against the Machine.
Há máquina de guerra —
tanque, lista, proibição —
que avança e esmaga.
Há máquina biológica —
folha de leque, dossel, luz —
que espalha e partilha.

A raiva tem ofício.
Nomeada, inspeciona.
Armada em vingança,
envenena a alma.
O laboratório não confunde os dois.

Não montamos tanque.
Não matamos no nome.
Plantamos à beira.
Contamos gotas.
Chamamos a Vida pelo nome verdadeiro:
ficar —
e dizer não
à máquina que pede sangue
como se fosse lei.

Valeu !!!

Porque toda vez que alguém permanece
sem matar em nome de ninguém,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um nós onde antes só havia blindagem.`;
}

function poemKillingInTheNameEn() {
  return `Killing in the Name.
We do not borrow the lyric —
we ask for the craft of listening
when they kill in the name of something
and call it order.

Rage Against the Machine.
There is a war machine —
tank, list, prohibition —
that advances and crushes.
There is a biological machine —
fan leaf, canopy, light —
that spreads and shares.

Anger has a craft.
Named, it inspects.
Armed as revenge,
it poisons the soul.
The laboratory does not confuse the two.

We do not build a tank.
We do not kill in the name.
We plant at the edge.
We count drops.
We call Vida by its true name:
stay —
and say no
to the machine that asks for blood
as if it were law.

Valeu !!!

Because every time someone remains
without killing in anyone’s name,
the universe grows a little:
one more verse,
one more canopy,
a we where once there was only armor.`;
}

function poemKillingInTheNameEs() {
  return `Killing in the Name.
No pedimos prestada la letra —
pedimos el oficio de oír
cuando matan en nombre de algo
y lo llaman orden.

Rage Against the Machine.
Hay máquina de guerra —
tanque, lista, prohibición —
que avanza y aplasta.
Hay máquina biológica —
hoja de abanico, dosel, luz —
que reparte y comparte.

La rabia tiene oficio.
Nombrada, inspecciona.
Armada en venganza,
envenena el alma.
El laboratorio no confunde las dos.

No montamos tanque.
No matamos en el nombre.
Sembramos a la orilla.
Contamos gotas.
Llamamos a Vida por su nombre verdadero:
quedarse —
y decir no
a la máquina que pide sangre
como si fuera ley.

¡Valeu !!!

Porque cada vez que alguien permanece
sin matar en nombre de nadie,
el universo crece un poco:
un verso más,
un dosel más,
un nosotros donde antes solo había blindaje.`;
}

function buildKillingInTheNameBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const oInicio = '/posts/post-inspecao-arte-o-inicio.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const oficio = '/posts/post-pesquisa-oficio-roubo-proibicao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-raiva-venom-vida-divertida.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemKillingInTheNamePt();

  const body = `## Escopo

Inspeção editorial da canção **«Killing in the Name»** — **Rage Against the Machine** (álbum homónimo, 1992). O **início de tudo** é a **obra musical**: single de estreia (2 nov. 1992), faixa do disco (6 nov. 1992), protesto contra brutalidade policial e violência legitimada «no nome» de uma ordem. No laboratório BudGanja, a canção conversa com [O Início](${oInicio}) (tanques × dossel), com [proibição](${proibicao}) e com a [raiva](${raiva}) **nomeada** — sem confundir raiva com [vingança](${vinganca}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Killing in the Name](${WIKI}), [álbum](${WIKI_ALBUM}). Crédito: Zack de la Rocha, Tom Morello, Tim Commerford, Brad Wilk / Epic. **Sem afiliação**. **Não** é manifesto de violência: inspeciona o **grito contra a máquina** que mata com legitimidade. Videoclipe oficial como referência da **obra**, não como canal YouTube objecto. Distinto de [Send Me On My Way](${sendMe}) / [Só os Loucos Sabem](${loucos}) (outras artes da casa).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Killing in the Name** |
| Artista | **Rage Against the Machine** |
| Meio | Canção / single (rap metal · funk metal · alternative metal) |
| Single | **2 nov. 1992** (Epic) |
| Álbum | *Rage Against the Machine* — **6 nov. 1992** |
| Autoria | Zack de la Rocha · Tom Morello · Tim Commerford · Brad Wilk |
| Produção | GGGarth (Garth Richardson) + banda |
| Motivo histórico | Protesto — brutalidade policial (eco Rodney King / LA 1992) |
| Tipo BudGanja | Arte — **canção primeiro**; eco no mapa Vida / proibição |
| Elo O Início | [O Início](${oInicio}) — tanque × dossel / máquina de guerra × biologia |
| Elo Palavras / aviso | [raiva](${raiva}) · [proibição](${proibicao}) · [risco](${risco}) · [vingança…](${vinganca}) |
| Elo ofício | [Valeu !!!](${mantra}) · [pesquisa ofício / roubo / proibição](${oficio}) |
| Fonte | [Wikipedia](${WIKI}) · [clipe](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1992** — LA, Epic, drop-D, letra de recusa — antes de qualquer meme ou playlist.  
**H2:** *Rage Against the Machine* nomeia a **máquina** (Estado / força / ordem que mata «no nome»); o lab cruza com a «máquina biológica» de [O Início](${oInicio}) — biologia ≠ tanque.  
**H3:** [raiva](${raiva}) nomeada = literacia; raiva armada em [vingança](${vinganca}) = veneno — a canção inspeciona a primeira sem absolver a segunda.  
**H4:** [proibição](${proibicao}) também «mata no nome» (lista, guerra às plantas); o ofício responde com método, não com canhão ([ofício](${oficio})).

Passos: origem da canção → tese → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1991** | Demo tape da banda — sete faixas antecipam o disco. |
| **Abr–mai 1992** | Gravação (Sound City / Van Nuys e outros estúdios CA). |
| **2 nov. 1992** | Single **Killing in the Name**. |
| **6 nov. 1992** | Álbum *Rage Against the Machine* (Epic). |
| Contexto | Eco do caso **Rodney King** e dos motins de LA (1992) — violência policial e raiva pública. |
| Forma | Riff drop-D (Morello); voz/letra (de la Rocha); sem samples/teclados no disco. |
| Afterlife | UK #25 (1993); Christmas #1 UK **2009** (campanha anti–X Factor); ≥1B streams Spotify (2025, relatório público). |

> **Hierarquia:** sem o single/álbum de **1992**, não há canção a inspecionar. Playlist e meme são descendentes.

## A obra (síntese)

- Rap metal / rock político dos 90: guitarra como arma rítmica, letra como protesto repetido até o limite.  
- Tese da letra (leitura pública): denunciar quem **mata em nome** de autoridade / raça / ordem — e a recusa («fuck you, I won’t do what you tell me»).  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** do grito e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Killing *in the name* | Violência com **legenda** institucional — nome que autoriza o golpe |
| Rage Against the Machine | Raiva **contra a máquina** (sistema), não cultivo de ódio ao vizinho |
| Máquina | Em [O Início](${oInicio}): tanque = esmagar; dossel = partilhar luz |
| Repetição / recusa | Ofício de **não obedecer** ao que pede sangue como lei |
| Afterlife 2009 / streams | Memória colectiva — eco, não origem |

## Cruzamento: máquina de guerra × máquina biológica

| Rage / Killing | BudGanja |
|----------------|----------|
| Máquina que mata no nome | [Proibição](${proibicao}) / lista / guerra à planta |
| Tanque / força | Verso em [O Início](${oInicio}) — blindagem × dossel |
| Rage (fogo) | [Raiva](${raiva}) nomeada · [cruzamento Raiva×Venom×Vida](${cruzamento}) |
| Revenge trap | [A vingança nunca é plena…](${vinganca}) — não beber o rancor |
| Recusa | [Valeu !!!](${mantra}) — ofício sem matar no nome |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da RATM.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=killing-in-the-name)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [O Início](${oInicio}) | Tanques × dossel · máquina biológica |
| [raiva](${raiva}) · [vingança…](${vinganca}) · [cruzamento](${cruzamento}) | Fogo nomeado ≠ veneno |
| [proibição](${proibicao}) · [ofício](${oficio}) · [risco](${risco}) | Máquina que «mata no nome» da ordem |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais da casa |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1992 + cruzamento com O Início / tanques / proibição / raiva nomeada.

[▶ Clipe](${YT}) · [▶ O Início](${oInicio}) · [▶ Poema Vida](${vida}#poema=killing-in-the-name) · [▶ Raiva](${raiva}) · [▶ Proibição](${proibicao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“Killing in the Name”** — **Rage Against the Machine** (1992). Song first: debut single / self-titled album, protest against violence done **in the name** of order. Crosses [O Início](${oInicio}) (tanks × canopy), [prohibition](${proibicao}), and named [anger](${raiva}) — not [revenge](${vinganca}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Not a call to violence — inspection of the cry against the killing machine.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemKillingInTheNameEn()}
\`\`\`

[▶ Vida](${vida}#poema=killing-in-the-name) · [▶ O Início](${oInicio})

## Status

**Approved** — 1992 song + BudGanja map (machine of war vs biological canopy).
`;

  const contentEs = `## Alcance

Inspección de **«Killing in the Name»** — **Rage Against the Machine** (1992). Canción primero: single / álbum, protesta contra la violencia **en el nombre** del orden. Cruza [O Início](${oInicio}) (tanques × dosel), [prohibición](${proibicao}) y [rabia](${raiva}) nombrada — no [venganza](${vinganca}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. No es llamado a la violencia — inspección del grito contra la máquina que mata.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemKillingInTheNameEs()}
\`\`\`

[▶ Vida](${vida}#poema=killing-in-the-name) · [▶ O Início](${oInicio})

## Estado

**Aprobada** — canción 1992 + mapa BudGanja (máquina de guerra × dosel biológico).
`;

  return { body, contentEn, contentEs };
}

function buildKillingInTheNamePost() {
  const { body, contentEn, contentEs } = buildKillingInTheNameBodies();
  return artePost({
    title:
      'Inspeção: Killing in the Name — Rage Against the Machine e a máquina que mata no nome',
    titleEn:
      'Inspection: Killing in the Name — Rage Against the Machine and the machine that kills in the name',
    titleEs:
      'Inspección: Killing in the Name — Rage Against the Machine y la máquina que mata en el nombre',
    excerpt:
      'Artes · canção 1992: RATM — matar no nome da ordem × raiva nomeada; elo com O Início (tanques × dossel) e proibição.',
    excerptEn:
      'Arts · 1992 song: RATM — killing in the name of order × named rage; link to O Início (tanks × canopy) and prohibition.',
    excerptEs:
      'Artes · canción 1992: RATM — matar en el nombre del orden × rabia nombrada; vínculo con O Início (tanques × dosel) y prohibición.',
    slug: 'inspecao-arte-killing-in-the-name',
    date: '2026-08-04T19:00:00.000Z',
    seriesOrder: 48,
    seriesLabel: 'Killing in the Name · Artes',
    coverImage: '/imagens/inspecoes/killing-in-the-name-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildKillingInTheNamePost,
  buildKillingInTheNameBodies,
  poemKillingInTheNamePt,
  poemKillingInTheNameEn,
  poemKillingInTheNameEs,
  YT_ID,
  YT,
  WIKI
};
