'use strict';

/**
 * Artes · canção «Wake Up» (Rage Against the Machine, 1992).
 * Irmã de Killing in the Name; eco no fecho de The Matrix (1999);
 * rádio como adaptação — não génese.
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

/** Áudio oficial público (canal Rage Against The Machine). */
const YT_ID = '4lzqUe1Qfec';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Rage_Against_the_Machine_(album)';
const WIKI_MATRIX_OST = 'https://en.wikipedia.org/wiki/The_Matrix:_Music_from_the_Motion_Picture';
const SITE = 'https://www.ratm.com/track/wake-up/';
const SPOTIFY = 'https://open.spotify.com/track/4RMnX40z03gmN3EN7HQHB7';

function poemWakeUpPt() {
  return `Wake Up.
Não pedimos a letra emprestada —
pedimos o ofício de abrir o olho
quando o ecrã pede sono
e chama isso de mundo.

Rage Against the Machine.
Há máquina que adormece —
lista, propaganda, proibição —
e chama o sono de paz.
Há máquina biológica —
folha, dossel, luz —
que acorda para partilhar.

Acordar tem ofício.
Nomeado, inspeciona.
Armado em tanque,
repete a máquina.
O laboratório não confunde os dois.

Não dormimos no nome da ordem.
Não acordamos para matar.
Plantamos à beira.
Contamos gotas.
Chamamos a Vida pelo nome verdadeiro:
ver —
e dizer não
ao sonho que pede sangue
como se fosse chão.

Valeu !!!

Porque toda vez que alguém acorda
sem virar tanque,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um nós onde antes só havia sono.`;
}

function poemWakeUpEn() {
  return `Wake Up.
We do not borrow the lyric —
we ask for the craft of opening the eye
when the screen asks for sleep
and calls that the world.

Rage Against the Machine.
There is a machine that puts to sleep —
list, propaganda, prohibition —
and calls the sleep peace.
There is a biological machine —
leaf, canopy, light —
that wakes in order to share.

Waking has a craft.
Named, it inspects.
Armed as a tank,
it repeats the machine.
The laboratory does not confuse the two.

We do not sleep in the name of order.
We do not wake in order to kill.
We plant at the edge.
We count drops.
We call Vida by its true name:
see —
and say no
to the dream that asks for blood
as if it were ground.

Valeu !!!

Because every time someone wakes
without becoming a tank,
the universe grows a little:
one more verse,
one more canopy,
a we where once there was only sleep.`;
}

function poemWakeUpEs() {
  return `Wake Up.
No pedimos prestada la letra —
pedimos el oficio de abrir el ojo
cuando la pantalla pide sueño
y llama a eso mundo.

Rage Against the Machine.
Hay máquina que adormece —
lista, propaganda, prohibición —
y llama paz al sueño.
Hay máquina biológica —
hoja, dosel, luz —
que despierta para compartir.

Despertar tiene oficio.
Nombrado, inspecciona.
Armado en tanque,
repite la máquina.
El laboratorio no confunde los dos.

No dormimos en el nombre del orden.
No despertamos para matar.
Plantamos a la orilla.
Contamos gotas.
Llamamos a Vida por su nombre verdadero:
ver —
y decir no
al sueño que pide sangre
como si fuera suelo.

¡Valeu !!!

Porque cada vez que alguien despierta
sin volverse tanque,
el universo crece un poco:
un verso más,
un dosel más,
un nosotros donde antes solo había sueño.`;
}

function buildWakeUpBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const oInicio = '/posts/post-inspecao-arte-o-inicio.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const animatrix = '/posts/post-inspecao-desenho-animatrix.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sonhar = '/posts/post-inspecao-palavra-sonhar.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemWakeUpPt();

  const body = `## Escopo

Inspeção editorial da canção **«Wake Up»** — **Rage Against the Machine** (álbum homónimo, **3 nov. 1992**, faixa 7). O **início de tudo** é a **obra musical**: rap metal / funk metal do mesmo disco de [Killing in the Name](${killing}), protesto que nomeia o **acordar** contra a máquina (média, Estado, sono colectivo). No laboratório BudGanja, o título conversa com [sonhar](${sonhar}) (o sono que se apresenta como chão), com [verdade](${verdade}) (ver sem inventar) e com o fecho de [The Matrix](${matrix}) (**1999**) — afterlife cultural, **não** génese da faixa. A [BudGanja Radio](${radio}) entra **depois**, como **eco funcional**.

> **Nota metodológica:** auditoria independente. Fontes: [álbum](${WIKI_ALBUM}), [OST Matrix](${WIKI_MATRIX_OST}), [página oficial da faixa](${SITE}). Crédito: Zack de la Rocha, Tom Morello, Tim Commerford, Brad Wilk / Epic · GGGarth (Garth Richardson). **Sem afiliação**. **Não** é manifesto de violência: inspeciona o **ofício de acordar**. Áudio oficial como referência da **obra**, não como canal YouTube objecto. Distinto de [Killing in the Name](${killing}) (mesmo disco, outro verbo) e do *wake-up* da NASA em [Send Me On My Way](${sendMe}) (Opportunity Sol 21 — **outra** história). **Ficha ≠ letra integral.**

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Wake Up** |
| Artista | **Rage Against the Machine** |
| Meio | Canção / faixa de álbum (rap metal · funk metal · alternative metal) |
| Álbum | *Rage Against the Machine* — **3 nov. 1992** (Epic) · faixa **7** |
| Autoria | Zack de la Rocha · Tom Morello · Tim Commerford · Brad Wilk |
| Produção | GGGarth (Garth Richardson) + banda · mistura Andy Wallace |
| Duração citada | ~6:04 |
| Tipo BudGanja | Arte — **canção primeiro**; rádio e Matrix como afterlife |
| Elo irmã | [Killing in the Name](${killing}) — mesmo disco; matar no nome × acordar |
| Elo cinema | [The Matrix](${matrix}) (1999, fecho / créditos) · [Animatrix](${animatrix}) |
| Elo Palavras | [sonhar](${sonhar}) · [verdade](${verdade}) · [raiva](${raiva}) · [proibição](${proibicao}) · [vida](${vidaPalavra}) |
| Elo ofício | [Valeu !!!](${mantra}) · [risco](${risco}) |
| Elo rádio | [BudGanja Radio](${radio}) — adaptação; transporte [VEVO](${vevo}) |
| Fonte | [álbum](${WIKI_ALBUM}) · [áudio oficial](${YT}) · [ratm.com](${SITE}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1992** — LA, Epic, faixa 7 do disco de estreia — antes de Matrix, playlist ou meme.  
**H2:** *Wake Up* nomeia o **acordar** contra a máquina que adormece (média / ordem / sono); o lab cruza com [sonhar](${sonhar}) e [verdade](${verdade}) — ver o terreno, não beber o sonho como lei.  
**H3:** irmã de [Killing in the Name](${killing}): dois verbos no mesmo disco (matar no nome × acordar). A ficha **não** funde as faixas.  
**H4:** [The Matrix](${matrix}) (1999) é **afterlife** — a canção já existia; o filme empresta o fecho. Sem o disco de 1992 não há faixa a inspecionar.  
**H5:** acordar ≠ tanque. [Raiva](${raiva}) nomeada inspeciona; raiva armada em [vingança](${vinganca}) envenena. O ofício responde com método, não com canhão.  
**H6:** o *wake-up* da NASA / Opportunity em [Send Me On My Way](${sendMe}) é **outro** objecto (Sol 21). Aqui o verbo é o da RATM.

Passos: origem da canção → tese → Matrix como afterlife → rádio → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1991** | Demo da banda — o disco de estreia já se ensaiava. |
| **Abr–mai 1992** | Gravação (Sound City / Van Nuys e outros estúdios CA). |
| **3 nov. 1992** | Álbum *Rage Against the Machine* (Epic) — **Wake Up** é a faixa 7. |
| Forma | Rap / spoken word (de la Rocha); guitarra com interruptor de Tom Morello; baixo e bateria como arma rítmica. |
| Motivo público | Acordar contra máquina mediática / estatal; eco de COINTELPRO e da memória dos 60/70 — **tese histórica**, não transcrição da letra. |
| **1999** | Afterlife: fecho de [The Matrix](${matrix}) e trilha [OST](${WIKI_MATRIX_OST}) — memória colectiva, **não** origem. |
| Afterlife rádio | Primeira faixa pública permitida (áudio oficial) na [BudGanja Radio](${radio}). |

> **Hierarquia:** sem o álbum de **1992**, não há canção a inspecionar. Matrix, OST, Topic YouTube e playlist são descendentes.

## A obra (síntese)

- Rap metal / rock político dos 90: o mesmo ofício de [Killing in the Name](${killing}), outro verbo — **acordar**, não matar no nome.  
- Tese pública da faixa (leitura cultural, **sem** colar letra): recusar o sono que a máquina vende como paz; pedir olhos abertos.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** do acordar e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Wake *up* | Acordar = inspecionar o ecrã — ver [verdade](${verdade}) · [sonhar](${sonhar}) |
| Máquina | Em [O Início](${oInicio}): tanque = esmagar; dossel = partilhar luz |
| Sono colectivo | [Proibição](${proibicao}) também adormece no nome da ordem |
| Raiva nomeada | [Raiva](${raiva}) inspeciona; [vingança](${vinganca}) envenena |
| Afterlife Matrix | Fecho do filme 1999 — eco, não génese |
| Afterlife rádio | Adaptação no laboratório — ver secção abaixo |

## Cruzamento: acordar × matar no nome × dossel

| Wake Up | BudGanja |
|---------|----------|
| Acordar contra a máquina | [Verdade](${verdade}) · [sonhar](${sonhar}) — ver sem tragá-lo o sonho |
| Irmã 1992 | [Killing in the Name](${killing}) — outro verbo, o mesmo disco |
| Máquina de guerra | [Proibição](${proibicao}) / lista / guerra à planta |
| Tanque / força | Verso em [O Início](${oInicio}) — blindagem × dossel |
| Fecho Matrix | [The Matrix](${matrix}) — Neo no telefone; a faixa **já** existia |
| NASA *wake-up* | **Outro** objecto: [Send Me On My Way](${sendMe}) (Opportunity) |
| Recusa sem tanque | [Valeu !!!](${mantra}) · [vida](${vidaPalavra}) — ofício de ficar acordado |

## Afterlife: The Matrix (1999)

A canção **não** nasce no cinema. [The Matrix](${matrix}) (Wachowski, **31 mar. 1999**) usa-a no **fecho** (chamada / créditos) e na [OST](${WIKI_MATRIX_OST}). Hierarquia BudGanja: **1992 primeiro**; 1999 é memória. [Animatrix](${animatrix}) (2003) é o desenho-filho do filme — **não** génese desta faixa.

## Uso no laboratório — rádio

O site **não** substitui a origem. A [BudGanja Radio](${radio}) recebe a **primeira faixa pública permitida** da pesquisa (áudio oficial Rage Against The Machine / Epic). Papel: **adaptação**, não génese. Transporte oficial: [VEVO](${vevo}) / canal da banda.

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Critério | Primeira pesquisa pública permitida — áudio oficial da obra |
| Referência | [YouTube · Official Audio](${YT}) |
| Papel nesta inspeção | **Eco funcional** — ouvir no lab, não origem da canção |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da RATM.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=wake-up)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Killing in the Name](${killing}) | Irmã do disco 1992 — matar no nome × acordar |
| [The Matrix](${matrix}) · [Animatrix](${animatrix}) | Afterlife cinema / desenho — não génese |
| [O Início](${oInicio}) | Tanques × dossel · máquina biológica |
| [sonhar](${sonhar}) · [verdade](${verdade}) · [vida](${vidaPalavra}) | Sono × ver × ficar |
| [raiva](${raiva}) · [vingança…](${vinganca}) · [proibição](${proibicao}) · [risco](${risco}) | Fogo nomeado ≠ veneno; máquina que adormece |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais; NASA *wake-up* ≠ esta faixa |
| [Rádio](${radio}) · [VEVO](${vevo}) | Eco secundário · transporte oficial |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1992 + irmã Killing in the Name + afterlife Matrix + rádio como adaptação.

[▶ Áudio oficial](${YT}) · [▶ Rádio](${radio}) · [▶ Killing in the Name](${killing}) · [▶ The Matrix](${matrix}) · [▶ Poema Vida](${vida}#poema=wake-up) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“Wake Up”** — **Rage Against the Machine** (self-titled album, **3 Nov 1992**, track 7). Song first: same record as [Killing in the Name](${killing}); the verb here is **wake**, not kill in the name. Crosses [sonhar](${sonhar}) (sleep sold as ground), [verdade](${verdade}), and the ending of [The Matrix](${matrix}) (**1999**) as **afterlife**, not genesis. [BudGanja Radio](${radio}) follows as a **functional echo**.

> Method note: [album](${WIKI_ALBUM}), [Matrix OST](${WIKI_MATRIX_OST}), [official track page](${SITE}). No affiliation. Not a call to violence. Distinct from the NASA Opportunity wake-up in [Send Me On My Way](${sendMe}). **Sheet ≠ full lyric.**

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemWakeUpEn()}
\`\`\`

[▶ Vida](${vida}#poema=wake-up) · [▶ Killing in the Name](${killing}) · [▶ The Matrix](${matrix}) · [▶ Radio](${radio})

## Status

**Approved** — 1992 song + sister track + Matrix afterlife + radio as adaptation.
`;

  const contentEs = `## Alcance

Inspección de **«Wake Up»** — **Rage Against the Machine** (álbum homónimo, **3 nov. 1992**, pista 7). Canción primero: el mismo disco que [Killing in the Name](${killing}); el verbo aquí es **despertar**, no matar en el nombre. Cruza [sonhar](${sonhar}), [verdade](${verdade}) y el cierre de [The Matrix](${matrix}) (**1999**) como **afterlife**, no génesis. [BudGanja Radio](${radio}) entra después, como **eco funcional**.

> Nota: [álbum](${WIKI_ALBUM}), [OST Matrix](${WIKI_MATRIX_OST}), [página oficial](${SITE}). Sin afiliación. Distinto del *wake-up* NASA en [Send Me On My Way](${sendMe}). **Ficha ≠ letra íntegra.**

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemWakeUpEs()}
\`\`\`

[▶ Vida](${vida}#poema=wake-up) · [▶ Killing in the Name](${killing}) · [▶ The Matrix](${matrix}) · [▶ Radio](${radio})

## Estado

**Aprobada** — canción 1992 + hermana Killing in the Name + afterlife Matrix + radio como adaptación.
`;

  return { body, contentEn, contentEs };
}

function buildWakeUpPost() {
  const { body, contentEn, contentEs } = buildWakeUpBodies();
  const seriesOrder = pickOrder('inspecao-arte-wake-up', 91);
  return artePost({
    title: 'Inspeção: Wake Up — Rage Against the Machine e o ofício de acordar',
    titleEn: 'Inspection: Wake Up — Rage Against the Machine and the craft of waking',
    titleEs: 'Inspección: Wake Up — Rage Against the Machine y el oficio de despertar',
    excerpt:
      'Artes · canção 1992: RATM — Wake Up (faixa 7) × sonhar/verdade; irmã de Killing in the Name; afterlife Matrix; rádio como adaptação.',
    excerptEn:
      'Arts · 1992 song: RATM — Wake Up (track 7) × dream/truth; sister of Killing in the Name; Matrix afterlife; radio as adaptation.',
    excerptEs:
      'Artes · canción 1992: RATM — Wake Up (pista 7) × soñar/verdad; hermana de Killing in the Name; afterlife Matrix; radio como adaptación.',
    slug: 'inspecao-arte-wake-up',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Wake Up · Artes',
    coverImage: '/imagens/inspecoes/wake-up-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildWakeUpPost,
  buildWakeUpBodies,
  poemWakeUpPt,
  poemWakeUpEn,
  poemWakeUpEs,
  YT_ID,
  YT,
  WIKI_ALBUM,
  SITE
};
