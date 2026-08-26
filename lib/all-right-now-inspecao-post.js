'use strict';

/**
 * Artes · canção «All Right Now» (Free, 1970).
 * Génese após gig vazio em Durham → consolação no presente;
 * elos BudGanja: já / legal / esperança / Valeu !!!
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

const YT_ID = '7cQ4jNDRTOo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/1gcESexgftSuLuML57Y69q';
const WIKI = 'https://en.wikipedia.org/wiki/All_Right_Now';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Fire_and_Water_(Free_album)';
const WIKI_FREE = 'https://en.wikipedia.org/wiki/Free_(band)';

/** Eco poético do laboratório — não é letra da Free. */
function poemAllRightNowPt() {
  return `All Right Now.
Não pedimos a letra emprestada —
pedimos o ofício de sair do camarim
depois do silêncio.

Free.
Houve sala quase vazia —
passos no palco,
aplauso que morreu cedo demais.
Houve uma frase que nasceu ali:
está tudo bem —
agora.

Geneo não mora neste agora.
O génio da lâmpada pede desejo sem rasto.
All — o tudo — pede a mão visível:
está bem
agora.

O laboratório conhece esse agora.
Inspeção que falha.
Planta que espera.
Dia que parece gelo.
E ainda assim: ficar.
Contar gotas.
Chamar a Vida pelo nome verdadeiro:
já —
sem adiar o cuidado
para um amanhã que nunca inspeciona.

Valeu !!!

Porque toda vez que alguém respira
depois do silêncio
e diz que ainda pode estar bem,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
um agora onde antes só havia vazio.`;
}

function poemAllRightNowEn() {
  return `All Right Now.
We do not borrow the lyric —
we ask for the craft of leaving the dressing room
after the silence.

Free.
There was a nearly empty room —
footsteps on stage,
applause that died too soon.
There was a line born right there:
it’s all right —
now.

Geneo does not live in this now.
The genie of the lamp asks for a wish without a trail.
All — the whole — asks for the visible hand:
it is all right
now.

The laboratory knows that now.
An inspection that fails.
A plant that waits.
A day that feels like ice.
And still: stay.
Count drops.
Call Vida by its true name:
already —
without postponing care
to a tomorrow that never inspects.

Valeu !!!

Because every time someone breathes
after the silence
and says it can still be all right,
the universe grows a little:
one more verse,
one more canopy,
a now where once there was only emptiness.`;
}

function poemAllRightNowEs() {
  return `All Right Now.
No pedimos prestada la letra —
pedimos el oficio de salir del camerino
después del silencio.

Free.
Hubo sala casi vacía —
pasos en el escenario,
aplauso que murió demasiado pronto.
Hubo una frase nacida allí:
está bien —
ahora.

Geneo no vive en este ahora.
El genio de la lámpara pide deseo sin rastro.
All — el todo — pide la mano visible:
está bien
ahora.

El laboratorio conoce ese ahora.
Inspección que falla.
Planta que espera.
Día que parece hielo.
Y aun así: quedarse.
Contar gotas.
Llamar a Vida por su nombre verdadero:
ya —
sin aplazar el cuidado
a un mañana que nunca inspecciona.

¡Valeu !!!

Porque cada vez que alguien respira
después del silencio
y dice que aún puede estar bien,
el universo crece un poco:
un verso más,
un dosel más,
un ahora donde antes solo había vacío.`;
}

function buildAllRightNowBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemAllRightNowPt();

  const body = `## Escopo

Inspeção editorial da canção **«All Right Now»** — **[Free](${WIKI_FREE})** (álbum *[Fire and Water](${WIKI_ALBUM})*, 1970). Pedido de campo: [Spotify](${SPOTIFY}) · letra · música · canção · **produtor** · **compositor** · **todas as palavras** do título. O **início de tudo** é a **obra musical**: rocker nascido num camarim após um concerto mal recebido em **Durham** (Inglaterra), single de **15 mai. 1970**, autoria de **Andy Fraser** e **Paul Rodgers**, produção da **própria Free**, solo de Paul Kossoff. No laboratório, a frase conversa com [tudo](${tudo}) / *todos* (**All**), [legal](${legal}) (**Right** = estar bem, não o lado direito), [já](${ja}) (**Now**). **Geneo** (génio da lâmpada) **não** mora neste agora — ver [genial](${genial}) / [abracadabra](${abracadabra}). Sem copiar a letra da Free.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · All Right Now](${WIKI}), [álbum Fire and Water](${WIKI_ALBUM}), [banda Free](${WIKI_FREE}). Crédito: Andy Fraser, Paul Rodgers / Island. **Sem afiliação**. Áudio: [Spotify](${SPOTIFY}) · [Free - Topic](${YT}) (\`${YT_ID}\`) — **obra**, não canal YouTube como objecto. Distinto de [Send Me On My Way](${sendMe}) / [Só os Loucos Sabem](${loucos}). **Ficha ≠ cifra, ≠ letra integral.**

@youtube ${YT_ID}

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **All Right Now** |
| Artista | **Free** (Inglaterra) |
| Meio | Canção / single (hard rock · blues-rock) |
| Single | **15 mai. 1970** (Island) — B-side *Mouthful of Grass* |
| Álbum | *Fire and Water* — **1970** |
| Gravação | Jan. 1970 — Trident / Island, Londres |
| Autoria / compositor | **Andy Fraser** · **Paul Rodgers** (BMI / créditos públicos) |
| Produção | A **banda Free** — não um produtor-estrela à parte |
| Selo | Island (Chris Blackwell fundou o selo; **não** é o compositor) |
| Formação | Paul Rodgers (voz) · Paul Kossoff (guitarra) · Andy Fraser (baixo, piano) · Simon Kirke (bateria) |
| Remix citado | Bob Clearmountain (**1991**) — mistura posterior, **não** a génese 1970 |
| Duração citada | ~4:14 (single) · ~5:31 (álbum / [Spotify](${SPOTIFY})) |
| Picos citados | UK Singles **#2** · US Billboard Hot 100 **#4** (1970) |
| Tipo BudGanja | Arte — **canção primeiro**; léxico do título; eco Vida |
| Elo Palavras | [tudo](${tudo}) · [legal](${legal}) · [já](${ja}) · [esperança](${esperanca}) · [gesto](${gesto}) · [emoção](${emocao}) · [genial](${genial}) (corte Geneo) |
| Elo Artes (par) | [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) · contraste [Killing in the Name](${killing}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [áudio Topic](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1970** — Durham, camarim, frase de consolação, *Fire and Water* — antes de qualquer cover, remix ou playlist.  
**H2:** «all right **now**» é literacia do **presente** — cruza [já](${ja}) e [legal](${legal}): estar bem *agora*, sem adiar o ofício.  
**H3:** a letra de encontro na rua é **memória cultural** da época; o laboratório prioriza a **génese do rocker após o silêncio** (Kirke / Fraser) como parábola de recomeço.  
**H4:** consolação ≠ raiva armada — par útil com [Killing in the Name](${killing}): duas máquinas de rock, dois ofícios (ficar bem agora × recusar matar no nome).

**H5:** compositor ≠ produtor ≠ selo ≠ remixer — Fraser/Rodgers escrevem; a Free produz; Island edita; Clearmountain (1991) é afterlife.  
**H6:** «todas as palavras» = o **título público** (All · Right · Now) + o nome **Free**; **não** a letra verso a verso (direitos).  
**H7:** [Geneo](${genial}) (oral do génio da lâmpada) é **atalho sem rasto**; *All Right Now* é ofício **depois do silêncio** — ver poema [Todos](${vida}#poema=todos).

Passos: origem da canção → créditos → léxico do título → tese → cruzamentos BudGanja → eco poético → status.

## Compositor × produtor × selo

| Papel | Quem | O que **não** é |
|-------|------|-----------------|
| **Compositores** | Andy Fraser (riff / coro no camarim) · Paul Rodgers (versos) | Kossoff **não** assina a autoria pública; o solo é **interpretação** |
| **Produtor** | **Free** (a banda) | Não confundir com Chris Blackwell (selo) nem com Clearmountain (remix 1991) |
| **Selo / edição** | Island Records | Casa que publica; não escreve o riff |
| **Letra** | Obra protegida | O lab **não** transcreve; inspeciona o **título** e a **génese** |

## Todas as palavras do título

Pedido: *inspeção de todas palavras*. Objecto: o **lema** — três vocábulos EN + o nome da banda. Sem copiar versos.

| Palavra | PT no lab | Ficha | Corte |
|---------|-----------|-------|-------|
| **All** | [tudo](${tudo}) / *todos* | inteireza, não inventário | ≠ Geneo a conceder «tudo» por desejo |
| **Right** | [legal](${legal}) (gíria: estar bem / certo) | estado após o silêncio | ≠ lado direito · ≠ direitos jurídicos como âncora desta faixa |
| **Now** | [já](${ja}) / agora | o presente que não adia | ≠ «amanhã a lâmpada resolve» |
| **Free** | a **banda** (1968–73) | [WP](${WIKI_FREE}) | ≠ adjectivo *free* / *grátis* como âncora |

**Letra (método, sem transcrição):** tese pública da época = encontro / convite / refrão de consolação. Tese BudGanja da **génese** = a frase nasce no camarim **depois do vazio**. O poema do lab fala com isso; **não** substitui a obra.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Durham (pré-single)** | Após gig frio / sala vazia: Simon Kirke descreve o silêncio no camarim; Andy Fraser canta «All right now…» e escreve o rocker em minutos — Paul Rodgers traz a letra. |
| Função | Precisavam de um **fecho de show** uptempo — blues médio não bastava para aguentar o palco. |
| **Jan. 1970** | Gravação em Londres (Trident / Island). |
| **15 mai. 1970** | Single Island — hit que define a Free no mapa mainstream. |
| **1970** | Álbum *Fire and Water* — versão mais longa no disco. |
| Formação clássica | Rodgers · Kossoff · Fraser · Kirke — quatro adolescentes/quase-vintes no hard rock britânico. |
| Afterlife | Remix Clearmountain (1991); covers e rádio clássica — **memória**, não origem. |

> **Hierarquia:** sem o camarim de Durham e o single de **1970**, não há canção a inspecionar. Covers e Topic YouTube são descendentes.

## A obra (síntese)

- Hard rock / blues-rock britânico: riff aberto, refrão coral, solo de Kossoff como assinatura.  
- Tese pública da letra: encontro na rua, convite, tensão e refrão de consolação no presente.  
- Tese BudGanja da **génese**: a frase nasce como **consolação após o vazio** — está tudo bem *agora*.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** do recomeço, os **créditos** e as **três palavras** do título.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| All right **now** | Presente inspecionável — ver [já](${ja}) |
| Consolação no camarim | Depois do silêncio: [esperança](${esperanca}) sem negação do falhanço |
| «Está bem» / slang | Cruza [legal](${legal}) — estado, não marketing |
| Rocker de fecho | Ofício de **sair do palco** ainda capaz de continuar — [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Letra de conquista | Afterlife cultural dos 70 — **não** protocolo do laboratório |
| Contraste RATM | [Killing…](${killing}) = recusa armada; Free = respirar e ficar |

## Cruzamento: silêncio × presente

| Free / All Right Now | BudGanja |
|----------------------|----------|
| Sala vazia / passos no palco | Inspeção que «não aplaude» — dia difícil no lab |
| Frase no camarim | [já](${ja}) — o cuidado não espera o público |
| Está tudo bem *agora* | [legal](${legal}) · [esperança](${esperanca}) |
| Rocker que fecha o show | [Valeu !!!](${mantra}) — ofício diário |
| Hard rock de 1970 | Série [Artes](${hub}) ao lado de [Send Me…](${sendMe}) / [Loucos](${loucos}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da Free.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=all-right-now)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [já](${ja}) · [legal](${legal}) · [tudo](${tudo}) · [esperança](${esperanca}) | Now · Right · All |
| [gesto](${gesto}) · [emoção](${emocao}) · [Valeu !!!](${mantra}) | Ofício após o silêncio |
| [genial](${genial}) · [abracadabra](${abracadabra}) | Corte: Geneo / lâmpada ≠ este agora |
| [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Outras artes musicais da casa |
| [Killing in the Name](${killing}) | Contraste — raiva nomeada × consolação no agora |
| [Spotify](${SPOTIFY}) · [Rádio](${radio}) | Faixa · eco secundário |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) · [poema Todos](${vida}#poema=todos) | Mapa |

## Status

**Aprovado** — canção 1970 (Free): compositor Fraser/Rodgers · produtor a banda · [Spotify](${SPOTIFY}) · léxico All/Right/Now · Geneo cortado do agora.

[▶ Spotify](${SPOTIFY}) · [▶ Áudio](${YT}) · [▶ Poema Vida](${vida}#poema=all-right-now) · [▶ Todos](${vida}#poema=todos) · [▶ Tudo](${tudo}) · [▶ Já](${ja}) · [▶ Legal](${legal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"All Right Now"** — **Free** (*Fire and Water*, 1970). Song first: rocker born in a dressing room after a cold gig in **Durham**, UK single **15 May 1970**, Fraser / Rodgers with Kossoff’s solo. Crosses [já](${ja}) (the present), [legal](${legal}) (being all right), and [hope](${esperanca}) after silence — without romanticizing the street lyric or confusing consolation with [Killing in the Name](${killing}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Audiovisual reference: [Free - Topic](${YT}).

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemAllRightNowEn()}
\`\`\`

[▶ Vida](${vida}#poema=all-right-now) · [▶ Já](${ja}) · [▶ Legal](${legal})

## Status

**Approved** — 1970 Free song + BudGanja map (present tense after silence).
`;

  const contentEs = `## Alcance

Inspección de **«All Right Now»** — **Free** (*Fire and Water*, 1970). Canción primero: rocker nacido en un camerino tras un concierto frío en **Durham**, single **15 may. 1970**, Fraser / Rodgers con el solo de Kossoff. Cruza [já](${ja}) (el presente), [legal](${legal}) (estar bien) y [esperanza](${esperanca}) después del silencio — sin romantizar la letra de calle ni confundir consuelo con [Killing in the Name](${killing}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia: [Free - Topic](${YT}).

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemAllRightNowEs()}
\`\`\`

[▶ Vida](${vida}#poema=all-right-now) · [▶ Já](${ja}) · [▶ Legal](${legal})

## Estado

**Aprobada** — canción Free 1970 + mapa BudGanja (presente tras el silencio).
`;

  return { body, contentEn, contentEs };
}

function buildAllRightNowPost() {
  const { body, contentEn, contentEs } = buildAllRightNowBodies();
  return artePost({
    title: 'Inspeção: All Right Now — Free e o agora depois do silêncio',
    titleEn: 'Inspection: All Right Now — Free and the now after silence',
    titleEs: 'Inspección: All Right Now — Free y el ahora después del silencio',
    excerpt:
      'Artes · canção 1970: Free — All Right Now nasce no camarim após Durham; elo BudGanja com já, legal e esperança — estar bem agora.',
    excerptEn:
      'Arts · 1970 song: Free — All Right Now born in the dressing room after Durham; BudGanja link to já, legal and hope — all right now.',
    excerptEs:
      'Artes · canción 1970: Free — All Right Now nace en el camerino tras Durham; vínculo BudGanja con já, legal y esperanza — estar bien ahora.',
    slug: 'inspecao-arte-all-right-now',
    date: '2026-08-04T20:00:00.000Z',
    seriesOrder: 49,
    seriesLabel: 'All Right Now · Artes',
    coverImage: '/imagens/inspecoes/all-right-now-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAllRightNowPost,
  buildAllRightNowBodies,
  poemAllRightNowPt,
  poemAllRightNowEn,
  poemAllRightNowEs,
  YT_ID,
  YT,
  SPOTIFY,
  WIKI
};
