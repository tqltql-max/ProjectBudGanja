'use strict';

/**
 * Artes · canção «Under Pressure» (Queen + David Bowie, 1981).
 * Jam em Montreux → single que nomeia o aperto da vida moderna;
 * elos BudGanja: coração / medo / esperança / Valeu !!!
 * — medir a pressão sem esmagar o peito.
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

const YT_ID = 'BaxnrepwXck';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Under_Pressure';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/Under_Pressure';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Hot_Space';

/** Eco poético do laboratório — não é letra de Queen / Bowie. */
function poemUnderPressurePt() {
  return `Under Pressure.
Não pedimos a letra emprestada —
pedimos o ofício de medir a pressão
sem esmagar o peito.

Queen. Bowie.
Houve um estúdio em Montreux —
dois ofícios na mesma mesa,
um baixo que ficou no pulso do século.
Houve rua, houve aperto,
houve a pergunta que o laboratório também faz:
como ficar humano
quando o mundo aperta.

O laboratório conhece essa pressão.
Inspeção que aperta o prazo.
Planta que espera o ar certo.
Dia que parece demasiado cheio.
E ainda assim: ficar.
Dar cuidado uma vez mais.
Chamar a Vida pelo nome verdadeiro:
coração —
sem transformar o aperto em tanque,
sem beber o rancor como se fosse justiça.

Valeu !!!

Porque toda vez que alguém mede a pressão
e responde com cuidado
em vez de esmagar,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde ainda cabe ficar.`;
}

function poemUnderPressureEn() {
  return `Under Pressure.
We do not borrow the lyric —
we ask for the craft of measuring pressure
without crushing the chest.

Queen. Bowie.
There was a studio in Montreux —
two crafts at the same table,
a bassline that stayed in the century’s pulse.
There was a street, there was a squeeze,
there was the question the laboratory also asks:
how to stay human
when the world tightens.

The laboratory knows that pressure.
An inspection that tightens the deadline.
A plant waiting for the right air.
A day that feels too full.
And still: stay.
Give care one more time.
Call Vida by its true name:
heart —
without turning the squeeze into a tank,
without drinking the grudge as if it were justice.

Valeu !!!

Because every time someone measures the pressure
and answers with care
instead of crushing,
the universe grows a little:
one more verse,
one more canopy,
a street where there is still room to stay.`;
}

function poemUnderPressureEs() {
  return `Under Pressure.
No pedimos prestada la letra —
pedimos el oficio de medir la presión
sin aplastar el pecho.

Queen. Bowie.
Hubo un estudio en Montreux —
dos oficios en la misma mesa,
un bajo que se quedó en el pulso del siglo.
Hubo calle, hubo aprieto,
hubo la pregunta que el laboratorio también hace:
cómo seguir siendo humano
cuando el mundo aprieta.

El laboratorio conoce esa presión.
Inspección que aprieta el plazo.
Planta que espera el aire justo.
Día que parece demasiado lleno.
Y aun así: quedarse.
Dar cuidado una vez más.
Llamar a Vida por su nombre verdadero:
corazón —
sin transformar el aprieto en tanque,
sin beber el rencor como si fuera justicia.

¡Valeu !!!

Porque cada vez que alguien mide la presión
y responde con cuidado
en vez de aplastar,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde aún cabe quedarse.`;
}

function buildUnderPressureBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemUnderPressurePt();

  const body = `## Escopo

Inspeção editorial da canção **«Under Pressure»** — **Queen** com **David Bowie** (álbum *[Hot Space](${WIKI_ALBUM})*, 1982; single **26 out. 1981**). O **início de tudo** é a **obra musical**: jam de Julho de **1981** nos **Mountain Studios** (Montreux), baixo que ficou no pulso pop, dueto que nomeia o **aperto** da vida moderna. No laboratório BudGanja, «under pressure» conversa com [coração](${coracao}) (o pulso que se mede), com [medo](${medo}) (o terror de saber o mundo) e com [esperança](${esperanca}) — responder ao aperto com **cuidado**, não com tanque. Distinto de [Killing in the Name](${killing}) (raiva nomeada) e par de [All Right Now](${allRight}) (o agora depois do silêncio).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Under Pressure](${WIKI}), [PT](${WIKI_PT}), [álbum Hot Space](${WIKI_ALBUM}). Crédito: Queen / David Bowie — Raincloud / Mainman / EMI. **Sem afiliação**. Referência de áudio pedida: [YouTube Music / Queen - Topic](${YT_MUSIC}) (\`${YT_ID}\`) — **obra**, não canal YouTube como objecto. Esta ficha **não** é biografia de Freddie Mercury nem de Bowie (Pessoas). O laboratório **não** reproduz a letra integral (direitos).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Under Pressure** |
| Artistas | **Queen** + **David Bowie** |
| Meio | Canção / single (rock · art-pop · funk-rock de *Hot Space*) |
| Single | **26 out. 1981** (EMI) — B-side *Soul Brother* |
| Álbum | *Hot Space* — **21 mai. 1982** |
| Gravação | **Jul. 1981** — Mountain Studios, **Montreux** (Suíça) |
| Autoria | Queen (Mercury, May, Taylor, Deacon) + **David Bowie** |
| Formação citada | Freddie Mercury (voz, piano) · David Bowie (voz, teclados, sax) · Brian May (guitarra) · John Deacon (baixo) · Roger Taylor (bateria) |
| Produção | Queen · David Bowie |
| Picos citados | UK Singles **#1** · US Billboard Hot 100 **#29** (1981–82) |
| Tipo BudGanja | Arte — **canção primeiro**; eco no mapa Vida / léxico do aperto e do cuidado |
| Elo Palavras | [coração](${coracao}) · [medo](${medo}) · [esperança](${esperanca}) · [alma](${alma}) · [emoção](${emocao}) · [gesto](${gesto}) · [já](${ja}) · [legal](${legal}) · [caminho](${caminho}) · [verdade](${verdade}) · [vida](${vidaPalavra}) |
| Elo Artes (par) | [All Right Now](${allRight}) · contraste [Killing in the Name](${killing}) · [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [áudio Topic](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1981** — Montreux, jam, *Hot Space* — antes de qualquer sample, cover, filme ou playlist.  
**H2:** «under **pressure**» é literacia do **aperto** — cruza [medo](${medo}) e [coração](${coracao}): nomear a força que esmaga, sem a romantizar nem a transformar em tanque.  
**H3:** a resposta pública da obra (cuidado / amor / última dança) é **tese cultural**, não manual clínico; o laboratório traduz: **medir a pressão e ficar humano**.  
**H4:** distinto de [Killing in the Name](${killing}) — RATM nomeia a raiva contra a máquina; Queen/Bowie nomeiam o **esmagamento quotidiano** e pedem cuidado. Par útil com [All Right Now](${allRight}): um é consolação *depois* do silêncio; o outro é o aperto *durante* a vida.

Passos: origem da canção → tese → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Jul. 1981 · Montreux** | Queen gravava *Hot Space* nos Mountain Studios; Bowie estava na cidade. A sessão vira **jam** — a canção nasce na mesa, não no marketing. |
| Função | Dueto de dois ofícios: o palco-Queen e o art-pop-Bowie no **mesmo pulso**. |
| Baixo | Linha de baixo que o século memorizou — pulso da faixa; crédito de autoria **colectivo** (Queen + Bowie). O laboratório inspeciona o **ofício do groove**, não a guerra de ego. |
| **26 out. 1981** | Single EMI — #1 no Reino Unido; entra no mapa mainstream antes do LP. |
| **21 mai. 1982** | Álbum *Hot Space* — a faixa ancora um disco que o público recebeu de forma mista; a canção ficou. |
| Videoclipe | Montagem de arquivo (David Mallet) — rua, aperto, noticiário; **obra audiovisual** distinta desta ficha de áudio. |
| Afterlife | Sample em *Ice Ice Baby* (1990) e disputa de créditos — **memória jurídica**, não origem. Covers, rádio clássica, cinema: descendentes. |

> **Hierarquia:** sem a jam de **Montreux 1981** e o single de Outubro, não há canção a inspecionar. Topic YouTube, YouTube Music e samples são descendentes.

## A obra (síntese)

- Rock / art-pop do início dos 80: groove de baixo, piano, vocais entrelaçados (Mercury × Bowie), clímax coral.  
- Tese pública: o **aperto** da vida moderna — rua, medo, pedido de cuidado em vez de esmagar.  
- Tese BudGanja da **génese**: dois ofícios medem a mesma pressão e escolhem **ficar humanos** — [gesto](${gesto}) de dueto, não solo de conquista.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (nomear o aperto, responder com cuidado) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Under **pressure** | Força que esmaga — medir, não virar tanque |
| Terror de saber o mundo | Cruza [medo](${medo}) · [verdade](${verdade}) — olhar sem negar |
| Rua / pessoas | Cuidado público; não estigma, não [raiva](${raiva}) como protocolo |
| Pulso / baixo | [coração](${coracao}) — o que se mede no peito e no groove |
| Pedido de cuidado | [esperança](${esperanca}) · [alma](${alma}) · [Valeu !!!](${mantra}) |
| Presente apertado | Cruza [já](${ja}) — o aperto é *agora*; [legal](${legal}) = estar bem *apesar* |
| Contraste RATM | [Killing…](${killing}) = recusa armada; Under Pressure = não esmagar |
| Par Free | [All Right Now](${allRight}) = consolação após o vazio; aqui = aperto *durante* |

## Cruzamento: aperto × cuidado

| Queen / Bowie | BudGanja |
|---------------|----------|
| Jam em Montreux | Inspeção que nasce na mesa — dois ofícios, um pulso |
| Baixo no centro | Medir o [coração](${coracao}) antes de discursar |
| Rua e noticiário do clipe | O laboratório vê a rua; não a usa como palco de ódio |
| Aperto da vida moderna | [medo](${medo}) nomeado; [esperança](${esperanca}) como ofício |
| Dueto (não duelo) | [gesto](${gesto}) de partilha — ver [Valeu !!!](${mantra}) |
| Sample / disputa 1990 | Afterlife jurídico — a origem continua 1981 |
| Rock de 1981 | Série [Artes](${hub}) ao lado de [All Right Now](${allRight}) / [Killing…](${killing}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Queen nem de Bowie.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=under-pressure)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [coração](${coracao}) · [medo](${medo}) · [esperança](${esperanca}) | Léxico do pulso / aperto / cuidado |
| [alma](${alma}) · [emoção](${emocao}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) | Ofício de responder sem esmagar |
| [já](${ja}) · [legal](${legal}) · [caminho](${caminho}) · [verdade](${verdade}) · [vida](${vidaPalavra}) | Presente, estado, percurso |
| [All Right Now](${allRight}) | Par — agora depois do silêncio × aperto durante a vida |
| [Killing in the Name](${killing}) | Contraste — raiva nomeada × cuidado sob pressão |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais da casa |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1981 (Queen + Bowie) + cruzamento com coração / medo / esperança e eco poético: medir a pressão sem esmagar.

[▶ Áudio](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=under-pressure) · [▶ Coração](${coracao}) · [▶ Medo](${medo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Under Pressure"** — **Queen** with **David Bowie** (*Hot Space*, 1982; single **26 Oct 1981**). Song first: July **1981** jam at **Mountain Studios**, Montreux; a bassline that stayed in the pop pulse; a duet that names modern life's **squeeze**. Crosses [heart](${coracao}), [fear](${medo}) and [hope](${esperanca}) — answer pressure with **care**, not a tank. Distinct from [Killing in the Name](${killing}); pair with [All Right Now](${allRight}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Audio reference requested: [YouTube Music / Queen - Topic](${YT_MUSIC}). This sheet is **not** a Freddie or Bowie biography.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemUnderPressureEn()}
\`\`\`

[▶ Vida](${vida}#poema=under-pressure) · [▶ Heart](${coracao}) · [▶ Fear](${medo})

## Status

**Approved** — 1981 Queen/Bowie song + BudGanja map (measure the pressure without crushing).
`;

  const contentEs = `## Alcance

Inspección de **«Under Pressure»** — **Queen** con **David Bowie** (*Hot Space*, 1982; single **26 oct. 1981**). Canción primero: jam de julio de **1981** en **Mountain Studios**, Montreux; un bajo que se quedó en el pulso pop; un dueto que nombra el **aprieto** de la vida moderna. Cruza [corazón](${coracao}), [miedo](${medo}) y [esperanza](${esperanca}) — responder a la presión con **cuidado**, no con tanque. Distinto de [Killing in the Name](${killing}); par de [All Right Now](${allRight}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia pedida: [YouTube Music / Queen - Topic](${YT_MUSIC}). Esta ficha **no** es biografía de Freddie ni de Bowie.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemUnderPressureEs()}
\`\`\`

[▶ Vida](${vida}#poema=under-pressure) · [▶ Corazón](${coracao}) · [▶ Miedo](${medo})

## Estado

**Aprobada** — canción Queen/Bowie 1981 + mapa BudGanja (medir la presión sin aplastar).
`;

  return { body, contentEn, contentEs };
}

function buildUnderPressurePost() {
  const { body, contentEn, contentEs } = buildUnderPressureBodies();
  return artePost({
    title: 'Inspeção: Under Pressure — Queen, Bowie e o aperto sem esmagar',
    titleEn: 'Inspection: Under Pressure — Queen, Bowie and the squeeze without crushing',
    titleEs: 'Inspección: Under Pressure — Queen, Bowie y el aprieto sin aplastar',
    excerpt:
      'Artes · canção 1981: Queen + David Bowie — Under Pressure nasce na jam de Montreux; elo BudGanja com coração, medo e esperança — medir o aperto sem esmagar.',
    excerptEn:
      'Arts · 1981 song: Queen + David Bowie — Under Pressure born in the Montreux jam; BudGanja link to heart, fear and hope — measure the squeeze without crushing.',
    excerptEs:
      'Artes · canción 1981: Queen + David Bowie — Under Pressure nace en la jam de Montreux; vínculo BudGanja con corazón, miedo y esperanza — medir el aprieto sin aplastar.',
    slug: 'inspecao-arte-under-pressure',
    date: '2026-08-19T16:00:00.000Z',
    seriesOrder: 50,
    seriesLabel: 'Under Pressure · Artes',
    coverImage: '/imagens/inspecoes/under-pressure-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildUnderPressurePost,
  buildUnderPressureBodies,
  poemUnderPressurePt,
  poemUnderPressureEn,
  poemUnderPressureEs,
  YT_ID,
  YT,
  YT_MUSIC,
  WIKI
};
