'use strict';

/**
 * Artes · canção «Amor e Fé» (Hungria Hip Hop).
 * Cheiro do Mato (2020, acústico) → single Spotify pedido (2024).
 * Elos BudGanja: coração / esperança / caminho / vida —
 * ficar com amor e fé sem transformar a ficha em púlpito.
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

const YT_ID = 'iZq0u3quAqo';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/6ZEKE3RR5EMhAMTJzjGOB6';
const WIKI = 'https://pt.wikipedia.org/wiki/Hungria_Hip_Hop';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Hungria_Hip_Hop';

function poemAmorEFePt() {
  return `Amor e Fé.
Não pedimos a letra emprestada —
pedimos o ofício de ficar
quando o volume baixa
e a voz ainda canta.

Hungria. Ceilândia. Cidade Ocidental.
Houve um rapper a servir prato na escola
e a gravar o primeiro clipe com câmara de bolso.
Houve um EP que cheirava a mato
e um violão onde o trap aprendeu a respirar.
Houve a pergunta que o laboratório também faz:
como nomear amor e fé
sem transformar o peito em palco de venda
nem a fé em ordem.

O laboratório conhece esse par.
Inspeção que ainda mede a planta
sem a pregar no vidro.
Dia que pede coração —
não atalho, não ostentação.
E ainda assim: ficar.
Dar o verso sem fingir que já chegou.
Chamar a Vida pelo nome verdadeiro:
esperança —
sem adiar o cuidado
para um milagre que nunca inspeciona.

Valeu !!!

Porque toda vez que alguém canta baixo
e deixa o amor no ar
em vez de o vender como capa,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua de Ceilândia
onde ainda cabe fé
sem ser sermão.`;
}

function poemAmorEFeEn() {
  return `Amor e Fé.
We do not borrow the lyric —
we ask for the craft of staying
when the volume drops
and the voice still sings.

Hungria. Ceilândia. Cidade Ocidental.
There was a rapper serving plates at school
and shooting the first clip with a pocket camera.
There was an EP that smelled of the bush
and a guitar where trap learned to breathe.
There was the question the laboratory also asks:
how to name love and faith
without turning the chest into a sales stage
or faith into an order.

The laboratory knows that pair.
An inspection that still measures the plant
without pinning it in glass.
A day that asks for heart —
not a shortcut, not ostentation.
And still: stay.
Give the verse without pretending you have already arrived.
Call Vida by its true name:
hope —
without postponing care
for a miracle that never inspects.

Valeu !!!

Because every time someone sings low
and leaves love in the air
instead of selling it as a cover,
the universe grows a little:
one more verse,
one more canopy,
a Ceilândia street
where faith still fits
without becoming a sermon.`;
}

function poemAmorEFeEs() {
  return `Amor e Fé.
No pedimos prestada la letra —
pedimos el oficio de quedarse
cuando baja el volumen
y la voz aún canta.

Hungria. Ceilândia. Cidade Ocidental.
Hubo un rapero sirviendo platos en la escuela
y grabando el primer clip con cámara de bolsillo.
Hubo un EP que olía a mato
y una guitarra donde el trap aprendió a respirar.
Hubo la pregunta que el laboratorio también hace:
cómo nombrar amor y fe
sin transformar el pecho en escenario de venta
ni la fe en orden.

El laboratorio conoce ese par.
Inspección que aún mide la planta
sin clavarla en el vidrio.
Día que pide corazón —
no atajo, no ostentación.
Y aun así: quedarse.
Dar el verso sin fingir que ya llegó.
Llamar a Vida por su nombre verdadero:
esperanza —
sin aplazar el cuidado
para un milagro que nunca inspecciona.

¡Valeu !!!

Porque cada vez que alguien canta bajo
y deja el amor en el aire
en vez de venderlo como tapa,
el universo crece un poco:
un verso más,
un dosel más,
una calle de Ceilândia
donde aún cabe fe
sin ser sermón.`;
}

function buildAmorEFeBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const deusAbencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const middle = '/posts/post-inspecao-arte-the-middle.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const transformers = '/posts/post-inspecao-filme-transformers.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemAmorEFePt();

  const body = `## Escopo

Inspeção editorial da canção **«Amor e Fé»** — **Hungria Hip Hop** (Gustavo da Hungria Neves; Ceilândia / Cidade Ocidental). O **início de tudo** é a **obra acústica de 2020**: primeiro single do EP ***Cheiro do Mato — Acústico***, clipe oficial **21 ago. 2020**. A referência de áudio **pedida** nesta ficha é o single Spotify **Amor e Fé — Acústico** (**16 jun. 2024**, \`6ZEKE3RR5EMhAMTJzjGOB6\`) — **cópia de escuta**, não génese. Autoria citada nas plataformas: **Gustavo da Hungria Neves** e **Luan Padal**. No laboratório BudGanja, o título conversa com [coração](${coracao}), [esperança](${esperanca}) e [caminho](${caminho}) — **ficar** com o par amor/fé sem transformar a ficha em púlpito nem em biografia. Distinto de [Under Pressure](${under}) (o aperto que esmaga) e par de [The Middle](${middle}) (ficar no meio da viagem). A ficha é da **canção**; a vida de Hungria é **contexto**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Hungria Hip Hop](${WIKI}), [Wikipedia (EN)](${WIKI_EN}), clipe oficial (${YT}), [Spotify pedido](${SPOTIFY}). Crédito: Hungria / Best / Luan Padal e músicos do acústico. **Sem afiliação**. Esta ficha **não** é biografia (Pessoas) nem inspeção de canal YouTube. O laboratório **não** reproduz a letra integral (direitos). **Fé no título ≠ catecismo**: sem proselitismo; [Deus abençoe](${deusAbencoe}) é elo de léxico, não doutrina. Distinto do [Legado](${legado}) canábico.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Amor e Fé** (versão **acústica**) |
| Artista | **Hungria Hip Hop** — Gustavo da Hungria Neves |
| Meio | Canção / single (rap acústico · violão · trap que respira) |
| Génese | EP ***Cheiro do Mato — Acústico*** (**2020**) — 1.º single |
| Clipe | **21 ago. 2020** — «Hungria - Amor e Fé (Official Music Video) #CheiroDoMato» |
| Áudio pedido | [Spotify · Amor e Fé - Acústico](${SPOTIFY}) — **16 jun. 2024** (~5:22) |
| Autoria citada | **Gustavo da Hungria Neves** · **Luan Padal** |
| Formação citada no clipe | Hungria (voz) · Luan Padal, Lucas Reis, Leonardo Brit (violões) · Tom Suassuna (violino / erhu) · Lucas Ramalho Evangelista (cajón / bongô) · Tufas (contrabaixo) · Igor de Miranda Canêdo (gaita) |
| Gravadora / editora | Best (fonogramas de Hungria, desde 2013) |
| Circulação citada | Crowley Charts **#1**; iTunes BR **#1**; rádios BR **#3**; Spotify Global **#22** (época do hit 2020); clipe entre os mais vistos do Brasil (centenas de milhões; número **data**) |
| Certificação citada | Single de **ouro** (Amor e Fé) |
| Tipo BudGanja | Arte — **canção acústica 2020 primeiro**; Spotify 2024 como referência pedida |
| Elo Palavras | [coração](${coracao}) · [esperança](${esperanca}) · [caminho](${caminho}) · [vida](${vidaPalavra}) · [respeito](${respeito}) · [emoção](${emocao}) · [gesto](${gesto}) |
| Elo Artes (par) | [The Middle](${middle}) · [Under Pressure](${under}) · [Só os Loucos Sabem](${loucos}) · [All Right Now](${allRight}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipédia](${WIKI}) · [Spotify](${SPOTIFY}) · [clipe](${YT}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 2020** — *Cheiro do Mato*, violão, clipe de 21 ago. — antes da reposição Spotify 2024.  
**H2:** o título **Amor e Fé** é léxico de [coração](${coracao}) e [esperança](${esperanca}): ficar, não ostentar. Hungria veio de hits de ostentação; esta faixa é o **gesto acústico** — [criatividade](${criatividade}) que muda de forma sem apagar a origem.  
**H3:** distinto de púlpito: a ficha **não** adopta religião do artista (facto biográfico: cristão) como tese. [Deus abençoe](${deusAbencoe}) cruza o léxico; a inspeção fica na **canção**.  
**H4:** par útil com [The Middle](${middle}) (não se escrever fora) e contraste com [Under Pressure](${under}) (aperto). Fecho = [Valeu !!!](${mantra}).

Passos: origem da canção → tese → cruzamentos → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **26 mai. 1991** | Nasce Gustavo da Hungria Neves em **Ceilândia** (DF); cresce em **Cidade Ocidental** (GO). Contexto, não centro. |
| Infância / ofício | Compõe cedo; trabalha de garçom na escola; mãe pedia emprego formal — o rap ainda não pagava. |
| **2007–13** | Primeiros temas, *Bens Materiais*, grupos Sentinela / Son d'Play; 2013: contrato com **Eduardo Bastos / Best**. |
| **2015–19** | *Meu Carona*; *Lembranças*, *Coração de Aço*, *Um Pedido* — circulação nacional. |
| **2020** | EP ***Cheiro do Mato — Acústico*** — #1 Spotify BR e Apple Music BR. **Amor e Fé** é o 1.º single. |
| **21 ago. 2020** | Clipe oficial — direção Leandro G. Moura; áudio com Padal e banda acústica. |
| Circulação | Ouro; Crowley #1; iTunes BR #1; Spotify Global #22 (época). O número de views do YouTube **envelhece** — citar como ordem de grandeza, não como medalha eterna. |
| **16 jun. 2024** | Single Spotify **Amor e Fé (Acústico)** — a faixa **pedida** nesta inspeção. Hierarquia: **2020 → 2024**. |

> **Hierarquia:** sem o acústico de **2020** (*Cheiro do Mato* + clipe), não há canção a inspecionar. O Spotify de 2024 é a cópia que o laboratório foi mandado ouvir. A ficha **não** substitui a vida de Hungria nem ensina fé.

## A obra (síntese)

- Rap brasileiro em modo acústico: voz à frente, violão, cordas, percussão leve — o trap **respira**.  
- Tese pública do título: **amor** e **fé** como par de permanência (não como slogan de vitrine).  
- Tese BudGanja da génese: o laboratório inspeciona o **ofício de ficar** — [coração](${coracao}) sem ostentação, [esperança](${esperanca}) sem atalho.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (nomear o par; escolher o acústico) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| **Amor** | [Coração](${coracao}) · [emoção](${emocao}) — afecto que fica, não capa |
| **Fé** | [Esperança](${esperanca}) de ofício — sem catecismo nesta ficha |
| Acústico / *Cheiro do Mato* | [Gesto](${gesto}) de baixar o volume; [criatividade](${criatividade}) que muda a forma |
| Ceilândia → circulação global | [Caminho](${caminho}) — a rua chega ao Spotify sem apagar a origem |
| Ostentação anterior × esta faixa | Inspecionar a **volta** ao peito; não apagar o catálogo anterior |
| Par The Middle | [The Middle](${middle}) — não se escrever fora no meio da viagem |
| Contraste Under Pressure | [Under Pressure](${under}) — outro aperto; aqui o par é ficar com fé |

## Cruzamento: amor × fé × inspeção

| Hungria / Amor e Fé | BudGanja |
|---------------------|----------|
| Cantar o par no acústico | Inspeção que **mede sem pregar** o vivo |
| Fé no título | Léxico de [esperança](${esperanca}) — não bula nem culto |
| Amor no título | [Coração](${coracao}) · [respeito](${respeito}) ao outro |
| Violão 2020 | [Gesto](${gesto}) — baixar o trap para caber a voz |
| Spotify 2024 | Afterlife de escuta — a origem continua **2020** |
| Hit brasileiro | Série [Artes](${hub}) ao lado de [Só os Loucos Sabem](${loucos}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra de Hungria.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=amor-e-fe)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [coração](${coracao}) · [esperança](${esperanca}) · [vida](${vidaPalavra}) | Léxico do par amor / fé |
| [caminho](${caminho}) · [respeito](${respeito}) · [gesto](${gesto}) | Origem → circulação; ficar sem ostentar |
| [emoção](${emocao}) · [criatividade](${criatividade}) · [Valeu !!!](${mantra}) | Pulso acústico e ofício |
| [The Middle](${middle}) · [Under Pressure](${under}) · [Só os Loucos Sabem](${loucos}) | Pares — ficar / aperto / rap BR |
| [Deus abençoe](${deusAbencoe}) | Elo de léxico — **não** púlpito |
| [Transformers](${transformers}) | Outra ficha Artes do mesmo pedido de oficina — **filmes**, não trilha |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção acústica 2020 (Hungria / *Cheiro do Mato*) + Spotify 2024 como referência pedida; cruzamento com coração / esperança / caminho e eco poético: ficar com amor e fé sem transformar a ficha em sermão.

[▶ Spotify](${SPOTIFY}) · [▶ Clipe](${YT}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=amor-e-fe) · [▶ Coração](${coracao}) · [▶ Esperança](${esperanca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Amor e Fé"** — **Hungria Hip Hop** (Gustavo da Hungria Neves). Song first: acoustic **2020** (*Cheiro do Mato — Acústico*; official clip **21 Aug 2020**). The **requested** audio is the Spotify single **Amor e Fé — Acústico** (**16 Jun 2024**, \`6ZEKE3RR5EMhAMTJzjGOB6\`) — a listening copy, not genesis. Writers cited: **Gustavo da Hungria Neves** and **Luan Padal**. Crosses [heart](${coracao}), [hope](${esperanca}) and [path](${caminho}). Distinct from [Under Pressure](${under}); pair with [The Middle](${middle}). Biography is **context**; this sheet is the **song**.

> Method note: [Wikipedia](${WIKI_EN}). No affiliation. Requested audio: [Spotify](${SPOTIFY}). Clip: [official video](${YT}). The lab does **not** reproduce the full lyric. Faith in the title is **not** catechism.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemAmorEFeEn()}
\`\`\`

[▶ Vida](${vida}#poema=amor-e-fe) · [▶ Heart](${coracao}) · [▶ Hope](${esperanca})

## Status

**Approved** — 2020 acoustic Hungria song + 2024 Spotify as requested listen; BudGanja map (stay with love and faith without turning the sheet into a sermon).
`;

  const contentEs = `## Alcance

Inspección de **«Amor e Fé»** — **Hungria Hip Hop** (Gustavo da Hungria Neves). Canción primero: acústico **2020** (*Cheiro do Mato — Acústico*; clip **21 ago. 2020**). El audio **pedido** es el single Spotify **Amor e Fé — Acústico** (**16 jun. 2024**, \`6ZEKE3RR5EMhAMTJzjGOB6\`) — copia de escucha, no génesis. Autores citados: **Gustavo da Hungria Neves** y **Luan Padal**. Cruza [corazón](${coracao}), [esperanza](${esperanca}) y [camino](${camino}). Distinto de [Under Pressure](${under}); par de [The Middle](${middle}). La biografía es **contexto**; esta ficha es la **canción**.

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Audio pedido: [Spotify](${SPOTIFY}). El laboratorio **no** reproduce la letra íntegra. Fe en el título **no** es catecismo.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemAmorEFeEs()}
\`\`\`

[▶ Vida](${vida}#poema=amor-e-fe) · [▶ Corazón](${coracao}) · [▶ Esperanza](${esperanca})

## Estado

**Aprobada** — canción acústica Hungria 2020 + Spotify 2024 como escucha pedida; mapa BudGanja (quedarse con amor y fe sin transformar la ficha en sermón).
`;

  return { body, contentEn, contentEs };
}

function buildAmorEFePost() {
  const { body, contentEn, contentEs } = buildAmorEFeBodies();
  return artePost({
    title: 'Inspeção: Amor e Fé — Hungria e o ofício de ficar quando o volume baixa',
    titleEn: 'Inspection: Amor e Fé — Hungria and the craft of staying when the volume drops',
    titleEs: 'Inspección: Amor e Fé — Hungria y el oficio de quedarse cuando baja el volumen',
    excerpt:
      'Artes · canção 2020: Hungria Hip Hop — Amor e Fé (Cheiro do Mato, acústico); Spotify 2024 como escuta pedida; elo BudGanja com coração, esperança e caminho.',
    excerptEn:
      'Arts · 2020 song: Hungria Hip Hop — Amor e Fé (Cheiro do Mato, acoustic); 2024 Spotify as requested listen; BudGanja link to heart, hope and path.',
    excerptEs:
      'Artes · canción 2020: Hungria Hip Hop — Amor e Fé (Cheiro do Mato, acústico); Spotify 2024 como escucha pedida; vínculo BudGanja con corazón, esperanza y camino.',
    slug: 'inspecao-arte-amor-e-fe',
    date: '2026-08-20T15:40:00.000Z',
    seriesOrder: 63,
    seriesLabel: 'Amor e Fé · Artes',
    coverImage: '/imagens/inspecoes/amor-e-fe-cover.jpg',
    sourceUrl: SPOTIFY,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAmorEFePost,
  buildAmorEFeBodies,
  poemAmorEFePt,
  poemAmorEFeEn,
  poemAmorEFeEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
