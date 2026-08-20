'use strict';

/**
 * Artes · canção «Bitter Sweet Symphony» (The Verve, 1997).
 * Urban Hymns → sample Oldham / The Last Time → disputa 1997 →
 * créditos devolvidos a Ashcroft em 2019.
 * Elos BudGanja: vida / legal / caminho / esperança —
 * o doce e o amargo no mesmo pulso; Rockin'1000 como afterlife colectivo.
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

const YT_ID = 'iE_CGC8LGUQ';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_OFFICIAL = 'https://www.youtube.com/watch?v=1lyu1KKwC74';
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/57iDDD9N9tTWe75x6qhStw';
const WIKI = 'https://en.wikipedia.org/wiki/Bitter_Sweet_Symphony';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Urban_Hymns';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/The_Verve';
const ROCKIN = 'https://www.rockin1000.com/';

function poemBitterSweetSymphonyPt() {
  return `Bitter Sweet Symphony.
Não pedimos a letra emprestada —
pedimos o ofício de ouvir
o doce e o amargo no mesmo pulso.

The Verve. Ashcroft. Urban Hymns.
Houve um loop de cordas que o século memorizou —
um sample, um processo, um nome que mudou de dono
e voltou à mesa em 2019.
Houve rua em Hoxton,
houve mil músicos em Cesena
a tocar o mesmo pulso sem pedir o solo.
Houve a pergunta que o laboratório também faz:
como ficar humano
quando a conta aperta
e a vida ainda pede música.

O laboratório conhece esse gosto.
Inspeção que custa e ainda assim floresce.
Planta que espera o ar certo.
Dia doce-amargo —
nem só mel, nem só fel.
E ainda assim: ficar.
Dar o passo sem vender o peito.
Chamar a Vida pelo nome verdadeiro:
caminho —
sem transformar o dinheiro em dono,
sem beber o rancor como se fosse justiça.

Faça o melhor!

Porque toda vez que alguém mede o amargo
e ainda assim deixa o doce no pulso
em vez de esmagar,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde mil ofícios cabem no mesmo acorde.`;
}

function poemBitterSweetSymphonyEn() {
  return `Bitter Sweet Symphony.
We do not borrow the lyric —
we ask for the craft of hearing
sweet and bitter in the same pulse.

The Verve. Ashcroft. Urban Hymns.
There was a string loop the century memorised —
a sample, a lawsuit, a name that changed owner
and came back to the table in 2019.
There was a street in Hoxton,
there were a thousand musicians in Cesena
playing the same pulse without asking for a solo.
There was the question the laboratory also asks:
how to stay human
when the bill tightens
and life still asks for music.

The laboratory knows that taste.
An inspection that costs and still blooms.
A plant waiting for the right air.
A bittersweet day —
not only honey, not only gall.
And still: stay.
Take the step without selling the chest.
Call Vida by its true name:
path —
without turning money into an owner,
without drinking the grudge as if it were justice.

Do your best!

Because every time someone measures the bitter
and still leaves the sweet in the pulse
instead of crushing,
the universe grows a little:
one more verse,
one more canopy,
a street where a thousand crafts fit the same chord.`;
}

function poemBitterSweetSymphonyEs() {
  return `Bitter Sweet Symphony.
No pedimos prestada la letra —
pedimos el oficio de oír
lo dulce y lo amargo en el mismo pulso.

The Verve. Ashcroft. Urban Hymns.
Hubo un loop de cuerdas que el siglo memorizó —
un sample, un proceso, un nombre que cambió de dueño
y volvió a la mesa en 2019.
Hubo calle en Hoxton,
hubo mil músicos en Cesena
tocando el mismo pulso sin pedir el solo.
Hubo la pregunta que el laboratorio también hace:
cómo seguir siendo humano
cuando la cuenta aprieta
y la vida aún pide música.

El laboratorio conoce ese gusto.
Inspección que cuesta y aun así florece.
Planta que espera el aire justo.
Día agridulce —
ni solo miel, ni solo hiel.
Y aun así: quedarse.
Dar el paso sin vender el pecho.
Llamar a Vida por su nombre verdadero:
camino —
sin transformar el dinero en dueño,
sin beber el rencor como si fuera justicia.

¡Haz lo mejor!

Porque cada vez que alguien mide lo amargo
y aún deja lo dulce en el pulso
en vez de aplastar,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde mil oficios caben en el mismo acorde.`;
}

function buildBitterSweetSymphonyBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const breath = '/posts/post-inspecao-arte-every-breath-you-take.html';
  const middle = '/posts/post-inspecao-arte-the-middle.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemBitterSweetSymphonyPt();

  const body = `## Escopo

Inspeção editorial da canção **«Bitter Sweet Symphony»** — **The Verve** (álbum *[Urban Hymns](${WIKI_ALBUM})*, 1997; single **16 jun. 1997**, Hut / Virgin). O **início de tudo** é a **obra musical**: loop de cordas a partir do arranjo orquestral de *The Last Time* (Andrew Oldham Orchestra, 1965/66), voz de **Richard Ashcroft**, parede de som britpop. No laboratório BudGanja, «bitter sweet» conversa com [vida](${vidaPalavra}) (o gosto misto do dia), com [legal](${legal}) (créditos, sample, devolução de 2019) e com [caminho](${caminho}) — o pulso que continua depois da conta. Distinto de [Under Pressure](${under}) (o aperto que esmaga) e par de [Every Breath You Take](${breath}) (outro hino que o século ouviu ao contrário). A referência audiovisual pedida é o [Rockin'1000](${YT}) (Cesena, 2016 / upload 2019) — **afterlife colectivo**, não génese.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Bitter Sweet Symphony](${WIKI}), [Urban Hymns](${WIKI_ALBUM}), [The Verve](${WIKI_BAND}). Crédito: Richard Ashcroft / The Verve — Hut · Virgin / Universal. **Sem afiliação**. Referência pedida: [Rockin'1000 That's Live](${YT}) (\`${YT_ID}\`) — **cover ao vivo**, não o objecto primário. Obra: [Spotify · remaster 2016](${SPOTIFY}). Clipe âncora da génese: [Walter Stern / Hoxton](${YT_OFFICIAL}). Esta ficha **não** é biografia de Ashcroft (Pessoas) nem inspeção do canal Rockin'1000 (Canais). O laboratório **não** reproduz a letra integral (direitos).

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Bitter Sweet Symphony** |
| Artista | **The Verve** (Wigan) — voz **Richard Ashcroft** |
| Meio | Canção / single (britpop · alternative · chamber-pop) |
| Single | **16 jun. 1997** (Hut / Virgin) |
| Álbum | *Urban Hymns* — **29 set. 1997** |
| Gravação | **1997** — Olympic Studios, Londres |
| Autoria (génese) | **Richard Ashcroft** (letra / composição da obra); sample de arranjo **David Whitaker** sobre *The Last Time* (Jagger/Richards) via Andrew Oldham Orchestra |
| Produção | **Youth** · The Verve |
| Cordas | **Wil Malone** (arranjo no estúdio; ~24 músicos) |
| Formação citada | Richard Ashcroft · Nick McCabe · Simon Jones · Peter Salisbury (+ Simon Tong no ciclo *Urban Hymns*) |
| Picos citados | UK Singles **#2** · US Billboard Hot 100 **#12** |
| Tipo BudGanja | Arte — **canção primeiro** (1997); Rockin'1000 e clipe Hoxton como descendentes |
| Elo Palavras | [vida](${vidaPalavra}) · [legal](${legal}) · [caminho](${caminho}) · [passar](${passar}) · [esperança](${esperanca}) · [coração](${coracao}) · [já](${ja}) · [verdade](${verdade}) · [gesto](${gesto}) · [emoção](${emocao}) |
| Elo Artes (par) | [Every Breath You Take](${breath}) · [The Middle](${middle}) · [Under Pressure](${under}) · [All Right Now](${allRight}) · [How Bizarre](${howBizarre}) · [Send Me On My Way](${sendMe}) · contraste [Killing in the Name](${killing}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [Spotify](${SPOTIFY}) · [Rockin'1000](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1997** — Olympic, *Urban Hymns*, Ashcroft / Youth / Malone — antes de Nike, Rockin'1000 ou playlist 90s.  
**H2:** «**bitter sweet**» é literacia do **gosto misto** — cruza [vida](${vidaPalavra}) e [esperança](${esperanca}): o dia tem fel e tem mel; o laboratório mede os dois.  
**H3:** a disputa do sample (ABKCO / Klein, 1997) e a **devolução de créditos em 2019** (Jagger, Richards, Klein filho) é **tese [legal](${legal})**, não fofoca: o ofício pode ser roubado e, raro, **devolvido**.  
**H4:** o [Rockin'1000](${YT}) (Cesena 2016) é **afterlife colectivo** — mil ofícios no mesmo acorde; não substitui a obra. Distinto de [Under Pressure](${under}) (aperto quotidiano) e par de [Every Breath You Take](${breath}) (hino mal lido). Contraste [Killing in the Name](${killing}): raiva nomeada × amargo nomeado sem tanque.

Passos: origem da canção → tese → disputa / devolução → afterlife Rockin'1000 → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Sample | Quatro compassos da versão orquestral de *The Last Time* (Andrew Oldham Orchestra; cordas de **David Whitaker**). Ashcroft trata o loop como hip-hop de ouro: torcer, não imitar. |
| Cordas no estúdio | **Wil Malone** expande o motivo — «tough», não poético. Sem as cordas de Olympic, Youth diz que Ashcroft só se excitou com a faixa *depois*. |
| **16 jun. 1997** | Single Hut/Virgin — #2 UK; entra no mapa mainstream antes do LP. |
| **29 set. 1997** | *Urban Hymns* — a faixa ancora o disco que define o britpop tardio. |
| Clipe | **Walter Stern**, 11 jun. 1997 — Ashcroft a atravessar a calçada de **Hoxton** (Londres), a bater em passantes. **Obra audiovisual** da génese; distinta do Rockin'1000. |
| Disputa 1997 | Virgin limpou o master (Decca); **não** a composição (ABKCO / Allen Klein). Processo: créditos passam a Jagger–Richards; Ashcroft perde royalties. |
| Afterlife comercial | Anúncio Nike (1998) contra a política da banda — Virgin detinha sync. **Memória jurídica**, não origem. |
| **2019** | Jagger, Richards e ABKCO **devolvem** créditos e royalties a Ashcroft (Ivor Novello). O laboratório lê: [legal](${legal}) como ofício que pode **reparar**. |
| Rockin'1000 | Cesena 2016; upload oficial **20 mai. 2019** — mil músicos, a mesma sinfonia. **Descendente**; a origem continua 1997. |

> **Hierarquia:** sem *Urban Hymns* / single de **jun. 1997**, não há canção a inspecionar. Spotify, Topic, clipe Hoxton, Nike e Rockin'1000 são descendentes. A ficha **não** substitui a vida de Ashcroft nem o canal Rockin'1000.

## A obra (síntese)

- Britpop / chamber-pop: beat lento, loop de violinos, voz que nomeia o gosto misto da vida urbana.  
- Tese pública: a vida é **doce-amarga** — conta, rua, pulso que não pára.  
- Tese BudGanja da **génese**: o sample vira parede de som; o século memoriza o pulso; o [legal](${legal}) tenta ficar com o nome — e, em 2019, **devolve**.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (ouvir o amargo sem apagar o doce) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Bitter **sweet** | Gosto misto — [vida](${vidaPalavra}) · [emoção](${emocao}) sem escolher só o mel |
| Rua / conta | Cruza [caminho](${caminho}) · [já](${ja}) — o passo é *agora*, mesmo quando aperta |
| Sample / créditos | [legal](${legal}) · [verdade](${verdade}) — nomear quem escreveu; 2019 como reparação |
| Cordas / pulso | [coração](${coracao}) — o que se mede no peito e na orquestra |
| Hoxton / clipe | Olhar a rua sem a transformar em palco de ódio |
| Rockin'1000 | [gesto](${gesto}) colectivo — mil ofícios, um acorde; afterlife, não génese |
| Par Police | [Every Breath You Take](${breath}) — outro hino que o século ouviu ao contrário |
| Contraste RATM | [Killing…](${killing}) = recusa armada; aqui = ficar no gosto misto |

## Cruzamento: doce × amargo

| The Verve | BudGanja |
|-----------|----------|
| Loop de cordas 1997 | Inspeção que nasce na mesa — sample torcido, não cópia |
| Disputa ABKCO | [legal](${legal}) como conta — o ofício pode ser tomado |
| Devolução 2019 | [esperança](${esperanca}) rastreável — raro, mas documentado |
| Ashcroft na calçada | [caminho](${caminho}) · [passar](${passar}) — atravessar sem pedir licença ao mapa |
| Rockin'1000 / Cesena | Afterlife colectivo — a origem continua Wigan / Olympic |
| Britpop de 1997 | Série [Artes](${hub}) ao lado de [Under Pressure](${under}) / [How Bizarre](${howBizarre}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da Verve nem de Ashcroft.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=bitter-sweet-symphony)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [vida](${vidaPalavra}) · [esperança](${esperanca}) · [coração](${coracao}) | Léxico do gosto misto / pulso / cuidado |
| [legal](${legal}) · [verdade](${verdade}) · [Faça o melhor!](${mantra}) | Ofício dos créditos e da reparação |
| [caminho](${caminho}) · [passar](${passar}) · [já](${ja}) · [gesto](${gesto}) | Percurso, presente, partilha |
| [Every Breath You Take](${breath}) · [The Middle](${middle}) | Pares da mesma fila de escuta |
| [Under Pressure](${under}) · [All Right Now](${allRight}) · [How Bizarre](${howBizarre}) | Aperto / agora / estranheza |
| [Killing in the Name](${killing}) · [Send Me On My Way](${sendMe}) · [Só os Loucos Sabem](${loucos}) | Contraste e outras artes musicais |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1997 (The Verve / *Urban Hymns*) + cruzamento com vida / legal / caminho e eco poético: ouvir o doce e o amargo no mesmo pulso. Referência audiovisual pedida: Rockin'1000 (afterlife colectivo).

[▶ Rockin'1000](${YT}) · [▶ Clipe Hoxton](${YT_OFFICIAL}) · [▶ Spotify](${SPOTIFY}) · [▶ Poema Vida](${vida}#poema=bitter-sweet-symphony) · [▶ Legal](${legal}) · [▶ Vida](${vidaPalavra}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Bitter Sweet Symphony"** — **The Verve** (*Urban Hymns*, 1997; single **16 Jun 1997**). Song first: Olympic Studios, Ashcroft / Youth / Malone; a string loop from the Andrew Oldham Orchestra version of *The Last Time*. Crosses [life](${vidaPalavra}), [legal](${legal}) and [path](${caminho}). The requested audiovisual is [Rockin'1000](${YT}) (Cesena 2016) — **collective afterlife**, not genesis. Rights returned to Ashcroft in **2019**. Distinct from [Under Pressure](${under}); pair with [Every Breath You Take](${breath}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Requested reference: [Rockin'1000](${YT}). Work: [Spotify](${SPOTIFY}). This sheet is **not** an Ashcroft biography or a Rockin'1000 channel inspection. The lab does **not** reproduce the full lyric.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemBitterSweetSymphonyEn()}
\`\`\`

[▶ Vida](${vida}#poema=bitter-sweet-symphony) · [▶ Legal](${legal}) · [▶ Life](${vidaPalavra})

## Status

**Approved** — 1997 Verve song + BudGanja map (hear sweet and bitter in the same pulse). Requested audiovisual: Rockin'1000.
`;

  const contentEs = `## Alcance

Inspección de **«Bitter Sweet Symphony»** — **The Verve** (*Urban Hymns*, 1997; single **16 jun. 1997**). Canción primero: Olympic Studios, Ashcroft / Youth / Malone; un loop de cuerdas de la versión orquestal de *The Last Time*. Cruza [vida](${vidaPalavra}), [legal](${legal}) y [camino](${caminho}). La referencia audiovisual pedida es [Rockin'1000](${YT}) (Cesena 2016) — **afterlife colectivo**, no génesis. Créditos devueltos a Ashcroft en **2019**. Distinto de [Under Pressure](${under}); par de [Every Breath You Take](${breath}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Referencia pedida: [Rockin'1000](${YT}). Obra: [Spotify](${SPOTIFY}). Esta ficha **no** es biografía de Ashcroft ni inspección del canal. El laboratorio **no** reproduce la letra íntegra.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemBitterSweetSymphonyEs()}
\`\`\`

[▶ Vida](${vida}#poema=bitter-sweet-symphony) · [▶ Legal](${legal}) · [▶ Vida](${vidaPalavra})

## Estado

**Aprobada** — canción Verve 1997 + mapa BudGanja (oír lo dulce y lo amargo en el mismo pulso). Audiovisual pedido: Rockin'1000.
`;

  return { body, contentEn, contentEs };
}

function buildBitterSweetSymphonyPost() {
  const { body, contentEn, contentEs } = buildBitterSweetSymphonyBodies();
  return artePost({
    title: 'Inspeção: Bitter Sweet Symphony — The Verve e o ofício do doce-amargo',
    titleEn: 'Inspection: Bitter Sweet Symphony — The Verve and the craft of the bittersweet',
    titleEs: 'Inspección: Bitter Sweet Symphony — The Verve y el oficio de lo agridulce',
    excerpt:
      'Artes · canção 1997: The Verve — Bitter Sweet Symphony (*Urban Hymns*); elo BudGanja com vida, legal e caminho — o doce e o amargo no mesmo pulso; Rockin\'1000 como afterlife colectivo.',
    excerptEn:
      'Arts · 1997 song: The Verve — Bitter Sweet Symphony (Urban Hymns); BudGanja link to life, legal and path — sweet and bitter in the same pulse; Rockin\'1000 as collective afterlife.',
    excerptEs:
      'Artes · canción 1997: The Verve — Bitter Sweet Symphony (Urban Hymns); vínculo BudGanja con vida, legal y camino — lo dulce y lo amargo en el mismo pulso; Rockin\'1000 como afterlife colectivo.',
    slug: 'inspecao-arte-bitter-sweet-symphony',
    date: '2026-08-20T13:30:00.000Z',
    seriesOrder: 59,
    seriesLabel: 'Bitter Sweet Symphony · Artes',
    coverImage: '/imagens/inspecoes/bitter-sweet-symphony-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBitterSweetSymphonyPost,
  buildBitterSweetSymphonyBodies,
  poemBitterSweetSymphonyPt,
  poemBitterSweetSymphonyEn,
  poemBitterSweetSymphonyEs,
  YT_ID,
  YT,
  YT_OFFICIAL,
  YT_MUSIC,
  SPOTIFY,
  WIKI,
  ROCKIN
};
