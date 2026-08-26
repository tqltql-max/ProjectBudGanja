'use strict';

/**
 * Artes · canção «Suspicious Minds» (Elvis Presley, 1969).
 * Génese: Mark James (1968, Scepter). Voz da versão âncora: Elvis.
 * Pedido de campo: inspeção da música do Elvis (Spotify).
 * Rádio = adaptação — não génese.
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

/** Áudio oficial público (ElvisPresleyVEVO). */
const YT_ID = 'RxOBOhRECoo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_VIDEO_ID = 'WrMGGouem3c';
const YT_VIDEO = 'https://www.youtube.com/watch?v=' + YT_VIDEO_ID;
const WIKI = 'https://en.wikipedia.org/wiki/Suspicious_Minds';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/From_Elvis_in_Memphis';
const WIKI_ELVIS = 'https://en.wikipedia.org/wiki/Elvis_Presley';
const WIKI_JAMES = 'https://en.wikipedia.org/wiki/Mark_James_(songwriter)';
const SITE = 'https://www.elvisthemusic.com/music/suspicious-minds/';
const SPOTIFY = 'https://open.spotify.com/track/1H5IfYyIIAlgDX8zguUzns';
const VEVO_CH = 'https://www.youtube.com/@ElvisPresleyVEVO';

function poemSuspiciousMindsPt() {
  return `Suspicious Minds.
Não pedimos a letra emprestada —
pedimos o ofício de olhar a mente
quando a suspeita vira armadilha
e chama isso de cuidado.

Elvis.
Há pulga atrás da orelha —
curiosidade, inspeção, luz —
que pede gesto e verdade.
Há mente suspeita —
armadilha, sono, recusa —
que não deixa o sonho ter chão.

Mark James escreveu.
Chips Moman produziu.
Elvis cantou a versão que o mundo ouviu.
O laboratório não confunde os três:
génese 1968, voz 1969, mito depois.

Não ficamos presos na armadilha.
Não fingimos que a dúvida é laudo.
Plantamos à beira.
Contamos gotas.
Chamamos a Vida pelo nome verdadeiro:
ver —
sem construir o sonho em cima da suspeita.

Valeu !!!

Porque toda vez que alguém inspeciona
sem virar acusação,
o universo cresce um pouco:
um verso a mais,
uma orelha a mais,
um nós onde antes só havia armadilha.`;
}

function poemSuspiciousMindsEn() {
  return `Suspicious Minds.
We do not borrow the lyric —
we ask for the craft of looking at the mind
when suspicion becomes a trap
and calls that care.

Elvis.
There is a flea behind the ear —
curiosity, inspection, light —
that asks for gesture and truth.
There is a suspicious mind —
trap, sleep, refusal —
that will not let the dream have ground.

Mark James wrote it.
Chips Moman produced it.
Elvis sang the version the world heard.
The laboratory does not confuse the three:
1968 genesis, 1969 voice, myth afterwards.

We do not stay caught in the trap.
We do not pretend doubt is a verdict.
We plant at the edge.
We count drops.
We call Vida by its true name:
see —
without building the dream on suspicion.

Valeu !!!

Because every time someone inspects
without turning into accusation,
the universe grows a little:
one more verse,
one more ear,
a we where once there was only a trap.`;
}

function poemSuspiciousMindsEs() {
  return `Suspicious Minds.
No pedimos prestada la letra —
pedimos el oficio de mirar la mente
cuando la sospecha se vuelve trampa
y llama a eso cuidado.

Elvis.
Hay pulga detrás de la oreja —
curiosidad, inspección, luz —
que pide gesto y verdad.
Hay mente sospechosa —
trampa, sueño, negativa —
que no deja que el sueño tenga suelo.

Mark James la escribió.
Chips Moman la produjo.
Elvis cantó la versión que el mundo oyó.
El laboratorio no confunde las tres:
génesis 1968, voz 1969, mito después.

No nos quedamos presos en la trampa.
No fingimos que la duda es veredicto.
Plantamos a la orilla.
Contamos gotas.
Llamamos a Vida por su nombre verdadero:
ver —
sin construir el sueño encima de la sospecha.

¡Valeu !!!

Porque cada vez que alguien inspecciona
sin volverse acusación,
el universo crece un poco:
un verso más,
una oreja más,
un nosotros donde antes solo había trampa.`;
}

function buildSuspiciousMindsBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const radio = '/radio/';
  const vevo = '/posts/post-inspecao-canal-vevo.html';
  const megamente = '/posts/post-inspecao-desenho-megamente.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const sonhar = '/posts/post-inspecao-palavra-sonhar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const desatar = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const backDoor = '/posts/post-inspecao-arte-back-door-man.html';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemSuspiciousMindsPt();

  const body = `## Escopo

Inspeção editorial da canção **«Suspicious Minds»** na versão **Elvis Presley** — gravada de madrugada em **23 jan. 1969** (American Sound Studio, Memphis), single RCA **26 ago. 1969**. O **início de tudo** é a **obra**: **Mark James** escreve e grava primeiro (**1968**, Scepter); **Chips Moman** produz; Elvis canta a versão que o laboratório inspeciona a pedido de campo ([Spotify](${SPOTIFY})). No BudGanja o título conversa com [verdade](${verdade}) (ver sem inventar), com [orelha](${orelha}) (pulga atrás — curiosidade ≠ armadilha) e com [sonhar](${sonhar}) (o sonho precisa de chão, não de suspeita). A [BudGanja Radio](${radio}) entra **depois**, como **eco funcional**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Suspicious Minds](${WIKI}), [álbum / sessões Memphis](${WIKI_ALBUM}), [página oficial](${SITE}). Crédito: Mark James / Elvis Presley / RCA · American Sound (Chips Moman). **Sem afiliação**. **Não** é biografia de Elvis (série Pessoas) nem ficha do filme *Elvis* (Luhrmann, 2022). Distinto de *A Little Less Conversation* (JXL), clipe **junto** de [Megamente](${megamente}) — **outra** canção. Áudio [ElvisPresleyVEVO](${YT}) como referência da **obra**, não como canal YouTube objecto. **Ficha ≠ letra integral.**

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Suspicious Minds** |
| Artista (versão âncora) | **Elvis Presley** |
| Autoria | **Mark James** (1968) |
| Produção | **Chips Moman** (American Sound Studio, Memphis) |
| Génese | Gravação de James / Scepter — **1968** (sem hit de gráfico) |
| Sessão Elvis | **23 jan. 1969**, 4h–7h — Memphis; overdubs posteriores (incl. fade Las Vegas, ago. 1969) |
| Single | RCA Victor — **26 ago. 1969** |
| Pico | Billboard Hot 100 **n.º 1** (semana de **1 nov. 1969**) — último n.º 1 de Elvis nos EUA, nas fontes |
| Meio | Canção / single (soul · pop · rock de Memphis) |
| Tipo BudGanja | Arte — **canção primeiro**; rádio e Spotify como adaptação / transporte |
| Elo Palavras | [verdade](${verdade}) · [orelha](${orelha}) · [sonhar](${sonhar}) · [nó](${no}) / [desatar o nó](${desatar}) |
| Elo ofício | [gesto](${gesto}) · [risco](${risco}) · [Valeu !!!](${mantra}) |
| Elo distinto | [Megamente](${megamente}) — *A Little Less Conversation* (JXL) é **outra** faixa Elvis |
| Transporte | [Spotify](${SPOTIFY}) · [ElvisPresleyVEVO](${VEVO_CH}) · [canal VEVO](${vevo}) |
| Fonte | [Wikipedia](${WIKI}) · [áudio oficial](${YT}) · [elvisthemusic.com](${SITE}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1968** — Mark James, Memphis, Scepter — antes de Elvis, playlist ou meme.  
**H2:** a versão âncora é **1969** (Elvis / Moman): sem essa sessão de madrugada não há a faixa que o campo pediu.  
**H3:** *suspicious minds* nomeia a **suspeita que prende**; o lab cruza com [verdade](${verdade}) e [orelha](${orelha}) — pulga atrás é curiosidade de ofício; mente suspeita é armadilha.  
**H4:** o sonho da letra (leitura cultural, **sem** colar verso) pede chão: ver [sonhar](${sonhar}). Não se constrói método em cima da acusação.  
**H5:** a armadilha da faixa conversa com [nó](${no}) / [desatar o nó](${desatar}) — preso × inspecionar o laço.  
**H6:** *A Little Less Conversation* em [Megamente](${megamente}) é **outro** objecto Elvis (remix JXL / palco do Metro Man). Esta ficha é **Suspicious Minds**.  
**H7:** Fine Young Cannibals (1986) e o filme *Elvis* (2022) são **afterlife**, não génese.

Passos: origem da canção → tese → Elvis 1969 → rádio → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1968** | **Mark James** escreve em Memphis (pedido de Chips Moman para o American Sound). Motivo público: relação em que a **suspeita** prende os três — **tese**, não transcrição da letra. |
| Gravação James | Scepter Records; Moman produz; **não** entra nas paradas — génese **sem** hit. |
| **23 jan. 1969** | Elvis grava de madrugada (4h–7h) no American Sound. James **não** entra na sala (não queria «azarar» a faixa). |
| Arranjo | Guitarra (Reggie Young), baixo, órgão, cordas, metais; mudança de compassos no bridge; coro. Donna Jean Godchaux nos backing vocals, nas fontes. |
| Disputa de editora | Hill & Range pede metade da edição; Moman recusa; Elvis **insiste** em gravar — a obra passa. |
| Fade | Felton Jarvis acrescenta o **falso fade-out** (~3:36) e o regresso — «cicatriz» para Moman; marca pública do single. |
| **26 ago. 1969** | Single RCA; primeiro ao vivo em Las Vegas **31 jul. 1969**. |
| **1 nov. 1969** | Billboard Hot 100 **n.º 1** — último n.º 1 de Elvis nos EUA (fontes). Grammy Hall of Fame **1999**. |
| Afterlife | Fine Young Cannibals (1986); memória no filme *Elvis* (Luhrmann, 2022) — **fila**, sem ficha aqui. |
| Afterlife rádio | Faixa pública permitida (áudio oficial ElvisPresleyVEVO) na [BudGanja Radio](${radio}). |

> **Hierarquia:** sem Mark James **1968**, não há canção. Sem Elvis **1969**, não há a versão que o campo pediu. Spotify, VEVO, rádio e filme são descendentes.

## A obra (síntese)

- Soul / pop de Memphis do começo de 1969: o mesmo ciclo de sessões que alimenta *From Elvis in Memphis* — o single **não** estava no LP original; entra depois em edições legado.  
- Tese pública (leitura cultural, **sem** colar letra): a suspeita prende; o sonho não assenta em mente que já acusou.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (ver × suspeitar) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Mentes suspeitas | Suspeita que prende ≠ [inspeção](${inspecoes}) que nomeia |
| Pulga na orelha | [Orelha](${orelha}) — curiosidade leve; **não** é a armadilha da faixa |
| Sonho sem chão | [Sonhar](${sonhar}) pede [verdade](${verdade}), não acusação |
| Armadilha / *trap* | [Nó](${no}) · [desatar o nó](${desatar}) — preso × abrir o laço |
| Fade que volta | O single **não** acaba quando parece — o ofício também regressa |
| Afterlife rádio | Adaptação no laboratório — ver secção abaixo |

## Cruzamento: suspeita × inspeção × orelha

| Suspicious Minds | BudGanja |
|------------------|----------|
| Suspeita que prende | [Verdade](${verdade}) — ver sem tragá-la a acusação |
| Pulga / dúvida | [Orelha](${orelha}) — curiosidade de ofício, não laudo |
| Sonho | [Sonhar](${sonhar}) — precisa de chão |
| Armadilha | [Nó](${no}) / [desatar](${desatar}) |
| Outra faixa Elvis | [Megamente](${megamente}) — *A Little Less Conversation* (JXL) |
| Recusa sem acusar | [Valeu !!!](${mantra}) · [gesto](${gesto}) · [vida](${vidaPalavra}) |

## Distinto: *A Little Less Conversation*

O site **já** usa Elvis no palco de [Megamente](${megamente}) — remix JXL de *A Little Less Conversation*. **Não** é esta canção. *Suspicious Minds* (1969) é a ficha de **Arte** da obra Memphis; o JXL é **eco de banda sonora** dum desenho. O laboratório não funde as duas.

## Uso no laboratório — rádio

O site **não** substitui a origem. A [BudGanja Radio](${radio}) recebe a **faixa pública permitida** (áudio oficial [ElvisPresleyVEVO](${YT})). Papel: **adaptação**, não génese. Pedido de campo: [Spotify](${SPOTIFY}) — transporte de escuta; o player da casa usa o áudio VEVO oficial.

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Critério | Áudio oficial público — ElvisPresleyVEVO |
| Referência | [YouTube · Official Audio](${YT}) · [Spotify](${SPOTIFY}) |
| Videoclipe (memória) | [Official Music Video](${YT_VIDEO}) — **não** substitui o áudio da rádio |
| Papel nesta inspeção | **Eco funcional** — ouvir no lab, não origem da canção |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Mark James / Elvis.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=suspicious-minds)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [verdade](${verdade}) · [orelha](${orelha}) · [sonhar](${sonhar}) | Ver × pulga × sonho com chão |
| [nó](${no}) · [desatar o nó](${desatar}) | Armadilha × abrir o laço |
| [gesto](${gesto}) · [risco](${risco}) · [Valeu !!!](${mantra}) | Ofício sem acusação |
| [Megamente](${megamente}) | **Outra** faixa Elvis (JXL) — não fundir |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) · [Back Door Man](${backDoor}) | Outras artes musicais na casa |
| [Rádio](${radio}) · [VEVO](${vevo}) | Eco secundário · transporte oficial |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção (James 1968 → Elvis 1969) + suspeita × inspeção + rádio como adaptação.

[▶ Áudio oficial](${YT}) · [▶ Spotify](${SPOTIFY}) · [▶ Rádio](${radio}) · [▶ Poema Vida](${vida}#poema=suspicious-minds) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“Suspicious Minds”** in the **Elvis Presley** version — recorded at dawn on **23 Jan 1969** (American Sound Studio, Memphis), RCA single **26 Aug 1969**. Song first: **Mark James** writes and records it (**1968**, Scepter); **Chips Moman** produces; Elvis sings the version the field asked for ([Spotify](${SPOTIFY})). Crosses [verdade](${verdade}), [orelha](${orelha}) (curiosity ≠ trap) and [sonhar](${sonhar}). [BudGanja Radio](${radio}) follows as a **functional echo**.

> Method note: [Wikipedia](${WIKI}), [Memphis sessions](${WIKI_ALBUM}), [official page](${SITE}). Credit: Mark James / Elvis Presley / RCA. No affiliation. Distinct from *A Little Less Conversation* (JXL) beside [Megamind](${megamente}). **Sheet ≠ full lyric.**

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemSuspiciousMindsEn()}
\`\`\`

[▶ Vida](${vida}#poema=suspicious-minds) · [▶ Radio](${radio}) · [▶ Spotify](${SPOTIFY})

## Status

**Approved** — 1968 genesis + 1969 Elvis version + suspicion × inspection + radio as adaptation.
`;

  const contentEs = `## Alcance

Inspección de **«Suspicious Minds»** en la versión **Elvis Presley** — grabada de madrugada el **23 ene. 1969** (American Sound Studio, Memphis), single RCA **26 ago. 1969**. Canción primero: **Mark James** la escribe y graba (**1968**, Scepter); **Chips Moman** produce; Elvis canta la versión que pidió el campo ([Spotify](${SPOTIFY})). Cruza [verdade](${verdade}), [orelha](${orelha}) y [sonhar](${sonhar}). [BudGanja Radio](${radio}) entra después, como **eco funcional**.

> Nota: [Wikipedia](${WIKI}), [sesiones Memphis](${WIKI_ALBUM}), [página oficial](${SITE}). Crédito: Mark James / Elvis Presley / RCA. Sin afiliación. Distinta de *A Little Less Conversation* (JXL) junto a [Megamente](${megamente}). **Ficha ≠ letra íntegra.**

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemSuspiciousMindsEs()}
\`\`\`

[▶ Vida](${vida}#poema=suspicious-minds) · [▶ Radio](${radio}) · [▶ Spotify](${SPOTIFY})

## Estado

**Aprobada** — génesis 1968 + versión Elvis 1969 + sospecha × inspección + radio como adaptación.
`;

  return { body, contentEn, contentEs };
}

function buildSuspiciousMindsPost() {
  const { body, contentEn, contentEs } = buildSuspiciousMindsBodies();
  const seriesOrder = pickOrder('inspecao-arte-suspicious-minds', 93);
  return artePost({
    title: 'Inspeção: Suspicious Minds — Elvis, a suspeita e o ofício de ver',
    titleEn: 'Inspection: Suspicious Minds — Elvis, suspicion and the craft of seeing',
    titleEs: 'Inspección: Suspicious Minds — Elvis, la sospecha y el oficio de ver',
    excerpt:
      'Artes · canção: Mark James 1968 → Elvis 1969 (Memphis); mentes suspeitas × verdade/orelha; rádio como adaptação.',
    excerptEn:
      'Arts · song: Mark James 1968 → Elvis 1969 (Memphis); suspicious minds × truth/ear; radio as adaptation.',
    excerptEs:
      'Artes · canción: Mark James 1968 → Elvis 1969 (Memphis); mentes sospechosas × verdad/oreja; radio como adaptación.',
    slug: 'inspecao-arte-suspicious-minds',
    date: '2026-08-24T14:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Suspicious Minds · Artes',
    coverImage: '/imagens/inspecoes/suspicious-minds-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSuspiciousMindsPost,
  buildSuspiciousMindsBodies,
  poemSuspiciousMindsPt,
  poemSuspiciousMindsEn,
  poemSuspiciousMindsEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_ALBUM,
  SITE,
  SPOTIFY
};
