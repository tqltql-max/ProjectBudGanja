'use strict';

/**
 * Artes · canção «Every Breath You Take» (The Police, 1983).
 * Synchronicity → Montserrat → hino que o século ouviu como amor
 * e Sting nomeou como vigilância. Elos BudGanja: perseguição /
 * medo / legal / coração — olhar sem possuir.
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

const YT_ID = 'OMOGaugKpzs';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const YT_MUSIC = 'https://music.youtube.com/watch?v=' + YT_ID;
const SPOTIFY = 'https://open.spotify.com/track/1JSTJqkT5qHq8MDJnJbRE1';
const WIKI = 'https://en.wikipedia.org/wiki/Every_Breath_You_Take';
const WIKI_ALBUM = 'https://en.wikipedia.org/wiki/Synchronicity_(The_Police_album)';
const WIKI_BAND = 'https://en.wikipedia.org/wiki/The_Police';

function poemEveryBreathYouTakePt() {
  return `Every Breath You Take.
Não pedimos a letra emprestada —
pedimos o ofício de olhar
sem transformar o cuidado em posse.

The Police. Sting. Summers. Copeland.
Houve um estúdio em Montserrat —
três ofícios em salas apartadas,
um arpejo que o rádio tomou por romance
e o autor chamou de vigilância.
Houve Goldeneye, houve ciúme,
houve a pergunta que o laboratório também faz:
como inspecionar o pulso
sem vigiar a vida alheia.

O laboratório conhece esse olhar.
Inspeção que mede a planta
sem a prender no vidro.
Dia que pede atenção
sem pedir dono.
E ainda assim: ficar.
Dar cuidado uma vez mais.
Chamar a Vida pelo nome verdadeiro:
coração —
sem confundir amor com perseguição,
sem beber o ciúme como se fosse justiça.

Valeu !!!

Porque toda vez que alguém olha
e responde com cuidado
em vez de possuir,
o universo cresce um pouco:
um verso a mais,
um dossel a mais,
uma rua onde ainda cabe respirar
sem ser vigiado.`;
}

function poemEveryBreathYouTakeEn() {
  return `Every Breath You Take.
We do not borrow the lyric —
we ask for the craft of looking
without turning care into ownership.

The Police. Sting. Summers. Copeland.
There was a studio in Montserrat —
three crafts in separate rooms,
an arpeggio the radio took for romance
and the writer called surveillance.
There was Goldeneye, there was jealousy,
there was the question the laboratory also asks:
how to inspect the pulse
without watching someone else’s life.

The laboratory knows that gaze.
An inspection that measures the plant
without pinning it in glass.
A day that asks for attention
without asking for an owner.
And still: stay.
Give care one more time.
Call Vida by its true name:
heart —
without confusing love with pursuit,
without drinking jealousy as if it were justice.

Valeu !!!

Because every time someone looks
and answers with care
instead of owning,
the universe grows a little:
one more verse,
one more canopy,
a street where there is still room to breathe
without being watched.`;
}

function poemEveryBreathYouTakeEs() {
  return `Every Breath You Take.
No pedimos prestada la letra —
pedimos el oficio de mirar
sin transformar el cuidado en posesión.

The Police. Sting. Summers. Copeland.
Hubo un estudio en Montserrat —
tres oficios en salas apartadas,
un arpegio que la radio tomó por romance
y el autor llamó vigilancia.
Hubo Goldeneye, hubo celos,
hubo la pregunta que el laboratorio también hace:
cómo inspeccionar el pulso
sin vigilar la vida ajena.

El laboratorio conoce esa mirada.
Inspección que mide la planta
sin clavarla en el vidrio.
Día que pide atención
sin pedir dueño.
Y aun así: quedarse.
Dar cuidado una vez más.
Llamar a Vida por su nombre verdadero:
corazón —
sin confundir amor con persecución,
sin beber los celos como si fueran justicia.

¡Valeu !!!

Porque cada vez que alguien mira
y responde con cuidado
en vez de poseer,
el universo crece un poco:
un verso más,
un dosel más,
una calle donde aún cabe respirar
sin ser vigilado.`;
}

function buildEveryBreathYouTakeBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const vida = '/vida/';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const under = '/posts/post-inspecao-arte-under-pressure.html';
  const allRight = '/posts/post-inspecao-arte-all-right-now.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const howBizarre = '/posts/post-inspecao-arte-how-bizarre.html';
  const killingJar = '/posts/post-inspecao-arte-the-killing-jar.html';
  const bitter = '/posts/post-inspecao-arte-bitter-sweet-symphony.html';
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
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const perseguicao = '/posts/post-inspecao-palavra-perseguicao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const radio = '/radio/';
  const inspecoes = '/biblioteca/inspecoes/';
  const poema = poemEveryBreathYouTakePt();

  const body = `## Escopo

Inspeção editorial da canção **«Every Breath You Take»** — **The Police** (álbum *[Synchronicity](${WIKI_ALBUM})*, 1983; single **20 mai. 1983**, A&M). O **início de tudo** é a **obra musical**: Sting escreve em **Goldeneye** (Jamaica); a banda grava nos **AIR Studios** (Montserrat), dez. 1982–fev. 1983; arpejo de **Andy Summers**, pulso de **Stewart Copeland**. No laboratório BudGanja, o século ouviu romance; Sting nomeou **ciúme, vigilância e posse**. A ficha cruza [perseguição](${perseguicao}) (o olhar que não larga), [medo](${medo}) (o outro como objecto) e [coração](${coracao}) — **olhar sem possuir**. Distinto de [Under Pressure](${under}) (aperto que pede cuidado) e par de [Bitter Sweet Symphony](${bitter}) (outro hino mal lido). Referência pedida: [videoclipe oficial](${YT}) (\`${YT_ID}\`).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Every Breath You Take](${WIKI}), [Synchronicity](${WIKI_ALBUM}), [The Police](${WIKI_BAND}). Crédito: Sting / The Police — A&M / Universal. **Sem afiliação**. Referência pedida: [The Police — Official Music Video](${YT}). Obra: [Spotify](${SPOTIFY}). Esta ficha **não** é biografia de Sting (Pessoas) nem inspeção de canal YouTube. O laboratório **não** reproduz a letra integral (direitos). **Não** trata a canção como protocolo de relacionamento nem como endosso de vigilância.

@youtube ${YT_ID}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Every Breath You Take** |
| Artista | **The Police** — Sting · Andy Summers · Stewart Copeland |
| Meio | Canção / single (new wave · soft rock · pop-rock) |
| Single | **20 mai. 1983** (A&M) — B-side *Murder by Numbers* |
| Álbum | *Synchronicity* — **17 jun. 1983** |
| Gravação | **Dez. 1982 – fev. 1983** — AIR Studios, **Montserrat** |
| Autoria | **Sting** (Gordon Sumner) |
| Produção | The Police · **Hugh Padgham** |
| Picos citados | UK Singles **#1** (4 sem.) · US Billboard Hot 100 **#1** (8 sem., maior hit EUA/Canadá de 1983) |
| Afterlife | BMI (2019): uma das canções mais tocadas na história da rádio |
| Tipo BudGanja | Arte — **canção primeiro**; tese: o hino de «amor» é inspeção de **posse** |
| Elo Palavras | [perseguição](${perseguicao}) · [medo](${medo}) · [coração](${coracao}) · [legal](${legal}) · [verdade](${verdade}) · [gesto](${gesto}) · [já](${ja}) · [esperança](${esperanca}) · [caminho](${caminho}) · [vida](${vidaPalavra}) · [emoção](${emocao}) |
| Elo Artes (par) | [Bitter Sweet Symphony](${bitter}) · [The Middle](${middle}) · [Under Pressure](${under}) · [The Killing Jar](${killingJar}) · [All Right Now](${allRight}) · contraste [Killing in the Name](${killing}) |
| Elo ofício | [Valeu !!!](${mantra}) |
| Fonte | [Wikipedia](${WIKI}) · [clipe](${YT}) · [Spotify](${SPOTIFY}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1982–83** — Goldeneye, Montserrat, *Synchronicity* — antes de casamento, *Stranger Things* ou TikTok.  
**H2:** a **leitura errada** (hino de amor / música de casamento) é parte da obra: Sting chamou-lhe canção «nasty» de **ciúme e vigilância**. O laboratório inspeciona o **desvio**, não o reproduz.  
**H3:** «I'll be watching you» cruza [perseguição](${perseguicao}) e [medo](${medo}): o olhar que não é cuidado. Tese BudGanja: **inspecionar ≠ vigiar**.  
**H4:** distinto de [The Killing Jar](${killingJar}) (pregar a vida no vidro) e de [Under Pressure](${under}) (aperto que pede cuidado). Par de [Bitter Sweet Symphony](${bitter}): dois hinos que o rádio adoça. Contraste [Killing in the Name](${killing}): raiva nomeada × posse disfarçada de romance.

Passos: origem da canção → tese da leitura errada → cruzamentos BudGanja → eco poético → status.

## O início de tudo — génese

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Escrita | Sting em **Goldeneye** (Jamaica) — mesa de Ian Fleming; cisão com Frances Tomelty. O laboratório lê o **ofício da letra**, não a fofoca conjugal. |
| Demo | Órgão Hammond, Utopia (Londres). A banda tenta reggae e outros arranjos em Montserrat. |
| **Montserrat** | AIR Studios — Copeland na sala de jantar, Sting na consola, Summers no estúdio. Três ofícios **apartados** no mesmo disco. |
| Guitarra | Arpejo de **Andy Summers** — o rádio cola-se ao desenho; a tese está na letra, não no brilho do acorde. |
| **20 mai. 1983** | Single A&M — #1 UK e US. O século memoriza o pulso *antes* de ler o ciúme. |
| **17 jun. 1983** | *Synchronicity* — último álbum de estúdio da banda. |
| Clipe | Preto-e-branco, palco/câmara — referência pedida [OMOGaugKpzs](${YT}). **Obra audiovisual**; a ficha fica na **canção**. |
| Afterlife | Casamentos, rádio, *Stranger Things*, BMI 2019. **Memória**; a origem continua 1983. Sting riu da leitura «loving» na TV. |

> **Hierarquia:** sem Montserrat 1982–83 e o single de Maio, não há canção a inspecionar. Spotify, clipe oficial, samples e séries são descendentes. A ficha **não** é biografia de Sting.

## A obra (síntese)

- New wave / pop-rock: baixo em colcheias, arpejo estável, voz que parece serenata.  
- Tese pública (Sting, NME 1983): **ciúme, vigilância, posse** — «nasty», não cartão de casamento.  
- Tese BudGanja da **génese**: o rádio ouve o mel; o laboratório lê o amargo — [verdade](${verdade}) contra a leitura fácil.  
- O laboratório **não** reproduz a letra integral (direitos); inspeciona o **método** (olhar sem possuir) e o mapa de elos.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Watching you | [perseguição](${perseguicao}) — olhar que não larga; não é inspeção |
| You belong to me | [legal](${legal}) torcido — posse, não acordo |
| Poor heart | [coração](${coracao}) · [medo](${medo}) — peito que aperta *o outro* |
| Leitura de casamento | [verdade](${verdade}) — o século ouviu o contrário; o laboratório corrige o mapa |
| Respiração / passo | [já](${ja}) · [vida](${vidaPalavra}) — o pulso é *agora*; não é licença para vigiar |
| Contraste Killing Jar | [The Killing Jar](${killingJar}) = pregar a vida; aqui = vigiar a vida |
| Par Verve | [Bitter Sweet Symphony](${bitter}) = outro hino adoçado pelo rádio |
| Par Under Pressure | [Under Pressure](${under}) = cuidado sob aperto; aqui = aperto disfarçado de cuidado |

## Cruzamento: olhar × posse

| The Police | BudGanja |
|------------|----------|
| Sting nomeia vigilância | Inspeção que **lê o desvio**, não o reproduz |
| Rádio ouve romance | [verdade](${verdade}) contra a leitura fácil |
| Três salas em Montserrat | Três ofícios — não um dono |
| Arpejo «bonito» | O brilho não lava a tese |
| «Belong to me» | [legal](${legal}) = acordo; posse é outro eixo |
| Afterlife BMI / séries | Descendentes — a origem continua 1983 |
| New wave de 1983 | Série [Artes](${hub}) ao lado de [Under Pressure](${under}) / [Bitter Sweet…](${bitter}) |

## Eco poético do laboratório

Texto **original** BudGanja — diálogo com a canção; **não** é letra da Police nem de Sting.

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=every-breath-you-take)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [perseguição](${perseguicao}) · [medo](${medo}) · [coração](${coracao}) | Léxico do olhar que aperta / peito / receio |
| [legal](${legal}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) | Posse ≠ acordo; ler o desvio |
| [já](${ja}) · [caminho](${caminho}) · [esperança](${esperanca}) · [vida](${vidaPalavra}) | Presente, percurso, cuidado |
| [Bitter Sweet Symphony](${bitter}) · [The Middle](${middle}) | Pares da mesma fila de escuta |
| [Under Pressure](${under}) · [The Killing Jar](${killingJar}) | Cuidado sob aperto × não pregar a vida |
| [Killing in the Name](${killing}) · [All Right Now](${allRight}) · [How Bizarre](${howBizarre}) | Contraste e outras artes |
| [Rádio](${radio}) | Eco secundário (se entrar na playlist) |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) · [Vida](${vida}) | Mapa |

## Status

**Aprovado** — inspeção da canção 1983 (The Police / *Synchronicity*) + cruzamento com perseguição / medo / coração e eco poético: olhar sem possuir. Referência pedida: clipe oficial.

[▶ Clipe](${YT}) · [▶ Spotify](${SPOTIFY}) · [▶ YouTube Music](${YT_MUSIC}) · [▶ Poema Vida](${vida}#poema=every-breath-you-take) · [▶ Perseguição](${perseguicao}) · [▶ Coração](${coracao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **"Every Breath You Take"** — **The Police** (*Synchronicity*, 1983; single **20 May 1983**). Song first: Goldeneye / AIR Montserrat; Sting named jealousy, surveillance and ownership while radio heard a love song. Crosses [pursuit](${perseguicao}), [fear](${medo}) and [heart](${coracao}) — look without owning. Requested reference: [official video](${YT}). Pair with [Bitter Sweet Symphony](${bitter}); distinct from [Under Pressure](${under}).

> Method note: [Wikipedia](${WIKI}). No affiliation. Work: [Spotify](${SPOTIFY}). This sheet is **not** a Sting biography. The lab does **not** reproduce the full lyric and does **not** endorse surveillance.

@youtube ${YT_ID}

## The lab poem

\`\`\`poem
${poemEveryBreathYouTakeEn()}
\`\`\`

[▶ Vida](${vida}#poema=every-breath-you-take) · [▶ Pursuit](${perseguicao}) · [▶ Heart](${coracao})

## Status

**Approved** — 1983 Police song + BudGanja map (look without owning). Requested audiovisual: official clip.
`;

  const contentEs = `## Alcance

Inspección de **«Every Breath You Take»** — **The Police** (*Synchronicity*, 1983; single **20 may. 1983**). Canción primero: Goldeneye / AIR Montserrat; Sting nombró celos, vigilancia y posesión mientras la radio oyó un tema de amor. Cruza [persecución](${perseguicao}), [miedo](${medo}) y [corazón](${coracao}) — mirar sin poseer. Referencia pedida: [videoclip oficial](${YT}). Par de [Bitter Sweet Symphony](${bitter}); distinto de [Under Pressure](${under}).

> Nota: [Wikipedia](${WIKI}). Sin afiliación. Obra: [Spotify](${SPOTIFY}). Esta ficha **no** es biografía de Sting. El laboratorio **no** reproduce la letra íntegra ni respalda la vigilancia.

@youtube ${YT_ID}

## El poema del laboratorio

\`\`\`poem
${poemEveryBreathYouTakeEs()}
\`\`\`

[▶ Vida](${vida}#poema=every-breath-you-take) · [▶ Persecución](${perseguicao}) · [▶ Corazón](${coracao})

## Estado

**Aprobada** — canción Police 1983 + mapa BudGanja (mirar sin poseer). Audiovisual pedido: videoclip oficial.
`;

  return { body, contentEn, contentEs };
}

function buildEveryBreathYouTakePost() {
  const { body, contentEn, contentEs } = buildEveryBreathYouTakeBodies();
  return artePost({
    title: 'Inspeção: Every Breath You Take — The Police e o ofício de olhar sem possuir',
    titleEn: 'Inspection: Every Breath You Take — The Police and the craft of looking without owning',
    titleEs: 'Inspección: Every Breath You Take — The Police y el oficio de mirar sin poseer',
    excerpt:
      'Artes · canção 1983: The Police — Every Breath You Take (*Synchronicity*); elo BudGanja com perseguição, medo e coração — o hino que o rádio ouviu como amor e Sting nomeou como vigilância.',
    excerptEn:
      'Arts · 1983 song: The Police — Every Breath You Take (Synchronicity); BudGanja link to pursuit, fear and heart — the anthem radio heard as love and Sting named as surveillance.',
    excerptEs:
      'Artes · canción 1983: The Police — Every Breath You Take (Synchronicity); vínculo BudGanja con persecución, miedo y corazón — el himno que la radio oyó como amor y Sting nombró como vigilancia.',
    slug: 'inspecao-arte-every-breath-you-take',
    date: '2026-08-20T13:40:00.000Z',
    seriesOrder: 60,
    seriesLabel: 'Every Breath You Take · Artes',
    coverImage: '/imagens/inspecoes/every-breath-you-take-cover.jpg',
    sourceUrl: YT,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEveryBreathYouTakePost,
  buildEveryBreathYouTakeBodies,
  poemEveryBreathYouTakePt,
  poemEveryBreathYouTakeEn,
  poemEveryBreathYouTakeEs,
  YT_ID,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
};
