'use strict';

/**
 * Artes · canção «Girassol» (Cidade Negra, 2002).
 * Pedido: girasol amamareco · música · Cidade Negra · letra · página dedicada.
 * Fala viva: girasol (um s) · amamareco (amarelo). Sem letra integral.
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
    filename: opts.filename || 'posts/post-' + opts.slug + '.html',
    url: opts.url || '/posts/post-' + opts.slug + '.html',
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

const YT_ID = 'Kt1MpsQ-jiA';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/0mscBkMFduxGFsFEhTv7du';
const WIKI = 'https://pt.wikipedia.org/wiki/Ac%C3%BAstico_MTV:_Cidade_Negra';
const WIKI_BAND = 'https://pt.wikipedia.org/wiki/Cidade_Negra';
const WIKI_PLANT = 'https://pt.wikipedia.org/wiki/Girassol';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'artes-cultura')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemGirassolPt() {
  return `Girassol.
Não pedimos a letra emprestada —
pedimos o ofício de virar a cara
para o sol
quando a guerra ainda ocupa o peito.

Cidade Negra. Toni. Acústico.
Houve um reggae do Rio
que pôs uma flor amarela
onde o ofício pedia sorrir
em conjunto, não sozinho.
Houve bloco, avenida, tempo —
e o nome da planta
a apontar a luz.

O laboratório conhece essa cor.
Girasol — um s, na boca.
Amamareco — o amarelo que a orelha cola.
Não é ficha de horto.
É a letra a inspecionar:
flor no lugar da guerra,
rosto que acompanha o sol.

Valeu !!!

Porque toda vez que alguém
vira para a luz
sem apagar a rua,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um girassol
que ainda cabe no ofício.`;
}

function poemGirassolEn() {
  return `Sunflower.
We do not borrow the lyric —
we ask for the craft of turning the face
toward the sun
when war still occupies the chest.

Cidade Negra. Toni. Unplugged.
There was a Rio reggae
that set a yellow flower
where the craft asked to smile
together, not alone.
There was a bloco, an avenue, time —
and the plant’s name
pointing at the light.

The laboratory knows that colour.
Girasol — one s, in the mouth.
Amamareco — yellow as the ear glues it.
This is not a garden sheet.
It is the lyric under inspection:
a flower where war sat,
a face that follows the sun.

Valeu !!!

Because every time someone
turns toward the light
without erasing the street,
the universe grows a little:
one more verse,
one more canopy,
a sunflower
that still fits the craft.`;
}

function poemGirassolEs() {
  return `Girasol.
No pedimos prestada la letra —
pedimos el oficio de volver la cara
hacia el sol
cuando la guerra aún ocupa el pecho.

Cidade Negra. Toni. Acústico.
Hubo un reggae de Río
que puso una flor amarilla
donde el oficio pedía sonreír
juntos, no solos.
Hubo bloque, avenida, tiempo —
y el nombre de la planta
apuntando a la luz.

El laboratorio conoce ese color.
Girasol — una s, en la boca.
Amamareco — el amarillo que pega el oído.
No es ficha de huerto.
Es la letra a inspeccionar:
flor en lugar de la guerra,
rostro que sigue al sol.

¡Valeu !!!

Porque cada vez que alguien
se vuelve hacia la luz
sin borrar la calle,
el universo crece un poco:
un verso más,
un dosel más,
un girasol
que aún cabe en el oficio.`;
}

function buildGirassolCidadeNegraBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const sorrir = '/posts/post-inspecao-palavra-sorrir.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const how = '/posts/post-inspecao-arte-how-bizarre.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poema = poemGirassolPt();

  const body = `## Escopo

Inspeção editorial da canção **«Girassol»** — **Cidade Negra** (voz **Toni Garrido**; inédita do [Acústico MTV](${WIKI}), lançado **4 jun. 2002**; gravação **25–26 nov. 2001**, Polo de Cinema e Vídeo, Rio). Pedido de campo: *girasol amamareco* · *musica* · *CIdade Negra* · **inspeção na letra** · **página dedicada**. O **início de tudo** é a **letra e o áudio acústico**: reggae BR que nomeia a [planta](${planta}) girassol e a cor **amarelo** como ofício de virar para o [sol](${sol}).

Fala viva: **girasol** (um *s*) · **amamareco** (o [amarelo](${WIKI_PLANT}) que [a orelha cola](${orelhaCola})). Lema: **Girassol** · **amarelo**. A banda no pedido: **Cidade Negra**.

> **Nota metodológica:** auditoria independente. Fontes: [Acústico MTV](${WIKI}), [Cidade Negra](${WIKI_BAND}), [girassol (planta)](${WIKI_PLANT}). Crédito: **Toni Garrido** · **Da Gama** · **Lazão** · **Bino Farias** · **Pedro Luís** — Sony Music / MTV. **Sem afiliação.** Referência de áudio: [Spotify · Girassol (Acústico)](${SPOTIFY}). Eco de ecrã: [Cidade Negra Oficial · DVD](${YT}) (\`${YT_ID}\`). **Esta ficha não reproduz a letra integral** (direitos). Inspeciona o **mapa da letra**: motivos, não verso a verso. Distinto do horto — a [planta](${planta}) *Helianthus* é **metáfora na canção**, não catálogo botânico. A biografia da banda é **contexto**.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Girassol** (fala: **girasol**) |
| Artista | **Cidade Negra** — voz **Toni Garrido** |
| Meio | Canção · reggae brasileiro · **acústico ao vivo** (álbum de estreia em vídeo) |
| Génese | Inédita do [Acústico MTV](${WIKI}) — **2002** (com *Berlim*) |
| Autoria citada | **Toni Garrido** · **Da Gama** · **Lazão** · **Bino Farias** · **Pedro Luís** |
| Cor viva | **amarelo** — gatilho **amamareco** |
| Tipo BudGanja | Arte — **letra + canção primeiro**; página dedicada desta obra |
| Elo Palavras | [sorrir](${sorrir}) · [sol](${sol}) · [luz](${luz}) · [planta](${planta}) · [alegria](${alegria}) · [gesto](${gesto}) · [coração](${coracao}) · [tempo](${tempo}) · [caminho](${caminho}) · [vida](${vidaPalavra}) |
| Elo Artes | [Só os Loucos Sabem](${loucos}) · [How Bizarre](${how}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wiki álbum](${WIKI}) · [Spotify](${SPOTIFY}) · [DVD](${YT}) |
| Data | ${inspected} |

**O que é o objecto:** a **página desta música** — letra inspeccionada por motivos (flor, cor, [sorrir](${sorrir}), rua, guerra × paz), sem colar o texto protegido.

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2001–2002** — inédita do Acústico MTV — não nas coletâneas posteriores.  
**H2:** a letra **não** é horto: *girassol* é [planta](${planta}) que segue o [sol](${sol}); na canção vira **ofício de virar a cara para a [luz](${luz})**.  
**H3:** **amamareco** = **amarelo** com [a orelha cola](${orelhaCola}) *ama* + *amarelo* / *amareleco*. A cor da flor é o lema.  
**H4:** [sorrir](${sorrir}) na letra é acto **colectivo** (povo / avenida), não pose de cartaz.  
**H5:** fecho = [Valeu !!!](${mantra}) neste ofício de virar para a luz *hoje*.

Passos: génese → mapa da letra (sem citação) → elos → eco poético → status.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| Banda | [Cidade Negra](${WIKI_BAND}) — reggae do Rio; fase Garrido já consolidada (*Sobre Todas as Forças*, *O Erê*, *A Estrada*) |
| **Nov. 2001** | Gravação Acústico MTV (Polo de Cinema e Vídeo) — Liminha · Paul Ralphes |
| **4 jun. 2002** | CD/DVD Sony; faixa de trabalho **Girassol** (inédita, com Pedro Luís) |
| Clipe / DVD | Performance ao vivo — objecto audiovisual **desta** página |
| Afterlife | Compilações *Perfil*, ao vivo 2006 — **descendentes**, não génese |

> **Hierarquia:** sem a inédita do Acústico **2002**, não há esta ficha. Spotify e YouTube são ecos da mesma obra.

## A letra (mapa — sem reproduzir)

O laboratório **não** cola o texto. Lê o **ofício** da letra:

| Motivo | Leitura editorial |
|--------|-------------------|
| **Girassol / girasol** | [Planta](${planta}) que gira com o [sol](${sol}) — metáfora de acompanhar a [luz](${luz}) |
| **Amarelo / amamareco** | Cor da flor; fala viva do pedido de campo |
| **Flor × guerra** | No peito de quem faz a guerra, nasce flor — tese de conversão, **não** manual |
| **Grandeza de menino** | Tempo e dois destinos — [tempo](${tempo}) · [coração](${coracao}) |
| **Rua / bloco / avenida** | Comunidade; ninguém fica só — [caminho](${caminho}) colectivo |
| **[Sorrir](${sorrir})** | O povo [sorri](${sorrir}) — verbo da [alegria](${alegria}) em conjunto; ficha irmã |
| **Não é** | Partitura · cifra · karaoke · letra colada |

## Tese cultural BudGanja

A canção pede **virar para a luz** no mesmo passo em que nomeia a rua. O girassol não foge da avenida: acompanha o [sol](${sol}) *nela*. [Sorrir](${sorrir}) aqui é [gesto](${gesto}) partilhado.

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da Cidade Negra.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=girassol)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Sorrir](${sorrir}) | Palavra da letra — acto colectivo |
| [Sol](${sol}) · [luz](${luz}) · [planta](${planta}) | O que o girassol segue |
| [Alegria](${alegria}) · [gesto](${gesto}) · [coração](${coracao}) | Tom e peito |
| [Tempo](${tempo}) · [caminho](${caminho}) · [vida](${vidaPalavra}) | Destinos e rua |
| [Só os Loucos Sabem](${loucos}) | Outra canção BR da casa |
| [How Bizarre](${how}) | Outra letra inspeccionada (sem colar texto) |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Limites

- **Ficha ≠ letra integral.**  
- Sem protocolar guerra, bloco ou horto.  
- Distinto da página de espécie [girassol](${WIKI_PLANT}) na Wikipédia — aqui a planta é **imagem da canção**.

## Status

**Aprovado** — página dedicada da canção **Girassol** (Cidade Negra, Acústico MTV 2002): inspeção da **letra** por motivos; fala viva *girasol amamareco*; elo [sorrir](${sorrir}).

[▶ Spotify](${SPOTIFY}) · [▶ DVD](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=girassol) · [▶ Sorrir](${sorrir}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Girassol"** — **Cidade Negra** (Toni Garrido; new track on [Acústico MTV](${WIKI}), **4 Jun 2002**). Field: *girasol amamareco* · the **lyric** · a **dedicated page**. Song first. The lab does **not** reproduce the full lyric.

> [Wikipedia](${WIKI}). [Spotify](${SPOTIFY}). [Official DVD clip](${YT}). Plant *Helianthus* is a **metaphor in the song**, not a garden catalog.

@youtube ${YT_ID}

## Lyric map (no quotation)

Sunflower / yellow / smile together / street and bloco / a flower where war sat / turning the face toward [light](${luz}). Living speech: **girasol** · **amamareco** (= yellow). Sister word: [sorrir](${sorrir}).

## Lab poem

\`\`\`poem
${poemGirassolEn()}
\`\`\`

[▶ Vida](${vida}#poema=girassol) · [▶ Smile](${sorrir}) · [▶ Valeu !!!](${mantra})

## Status

**Approved** — dedicated page for Cidade Negra’s **Girassol** (2002); lyric inspected by motifs, not pasted.
`;

  const contentEs = `## Alcance

Inspección de **«Girassol»** — **Cidade Negra** (Toni Garrido; inédita del [Acústico MTV](${WIKI}), **4 jun. 2002**). Pedido: *girasol amamareco* · la **letra** · **página dedicada**. Canción primero. El laboratorio **no** reproduce la letra íntegra.

> [Wikipedia](${WIKI}). [Spotify](${SPOTIFY}). [DVD oficial](${YT}). La planta es **metáfora**, no catálogo.

@youtube ${YT_ID}

## Mapa de la letra (sin cita)

Girasol / amarillo / sonreír juntos / calle y bloque / flor donde estaba la guerra / volver la cara a la [luz](${luz}). Habla viva: **girasol** · **amamareco**. Palabra hermana: [sorrir](${sorrir}).

## Poema del laboratorio

\`\`\`poem
${poemGirassolEs()}
\`\`\`

[▶ Vida](${vida}#poema=girassol) · [▶ Sonreír](${sorrir}) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobada** — página dedicada de **Girassol** (Cidade Negra, 2002); letra por motivos, no pegada.
`;

  return { body, contentEn, contentEs };
}

function buildGirassolCidadeNegraPost() {
  const { body, contentEn, contentEs } = buildGirassolCidadeNegraBodies();
  const seriesOrder = pickOrder('inspecao-arte-girassol', 88);
  return artePost({
    title: 'Inspeção: Girassol — Cidade Negra, a letra e o ofício de virar para o sol',
    titleEn: 'Inspection: Girassol — Cidade Negra, the lyric and the craft of turning toward the sun',
    titleEs: 'Inspección: Girassol — Cidade Negra, la letra y el oficio de volverse hacia el sol',
    excerpt:
      'Artes · canção 2002: Cidade Negra — Girassol (Acústico MTV); letra inspeccionada sem colar o texto; girasol amamareco = girassol amarelo; elo sorrir.',
    excerptEn:
      'Arts · 2002 song: Cidade Negra — Girassol (MTV Unplugged); lyric inspected without pasting the text; living girasol amamareco; link to sorrir.',
    excerptEs:
      'Artes · canción 2002: Cidade Negra — Girassol (Acústico MTV); letra inspeccionada sin pegar el texto; girasol amamareco; vínculo sorrir.',
    slug: 'inspecao-arte-girassol',
    date: '2026-08-23T04:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Girassol · Artes',
    coverImage: '/imagens/inspecoes/girassol-cidade-negra-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGirassolCidadeNegraPost,
  buildGirassolCidadeNegraBodies,
  poemGirassolPt,
  poemGirassolEn,
  poemGirassolEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI,
  WIKI_BAND
};
