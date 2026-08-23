'use strict';

/**
 * Encontro Marcado / Meet Joe Black (1998) — Artes · cinema
 * Génese: peça La morte in vacanza (Alberto Casella, 1924)
 * → Death Takes a Holiday (1934) → remake 1998.
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

const YT_ID = '_zIOjl93WrU';

function buildBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Meet_Joe_Black';
  const wikiEn = 'https://en.wikipedia.org/wiki/Meet_Joe_Black';
  const wikiPeca = 'https://en.wikipedia.org/wiki/Death_Takes_a_Holiday';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const qdt = '/posts/post-inspecao-filme-questao-de-tempo.html';
  const shaw = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial do filme **«Meet Joe Black»** — no Brasil, **Encontro Marcado** (**1998**). Realização e produção de **Martin Brest**. O **início de tudo** é a peça italiana **«La morte in vacanza»**, de **Alberto Casella** (**1924**). Dela vem a adaptação inglesa de Walter Ferris (*Death Takes a Holiday*, Broadway 1929), o filme de Mitchell Leisen (**1934**, Fredric March) e, por fim, este remake **largo** de 1998. O ecrã de Pitt/Hopkins é **eco**; a pergunta da peça é a génese.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Meet Joe Black](${wiki}), [Wikipedia (EN)](${wikiEn}), [Death Takes a Holiday](${wikiPeca}), trailer (${yt}). Crédito: Casella / Ferris / Leisen / Brest / Universal / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção da Morte em férias ≠ manual clínico nem escatológico.** Não se inventa vida privada. Título PT: *Conhece Joe Black?*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Encontro Marcado** |
| Título original | *Meet Joe Black* (PT: *Conhece Joe Black?*) |
| Ano (filme) | **1998** (Tóquio 8 nov.; EUA **13 nov.**; Brasil **11 dez.**) |
| Génese | Peça **La morte in vacanza** — Alberto Casella (**1924**) |
| Cadeia | Ferris 1929 → filme **Death Takes a Holiday** (1934, Leisen) → remake 1998 |
| Realização / produção | **Martin Brest** · City Light Films |
| Argumento | Bo Goldman · Kevin Wade · Ron Osborn · Jeff Reno |
| Música / fotografia | **Thomas Newman** · **Emmanuel Lubezki** |
| Duração | ~180–181 min (versão aérea/TV ~2 h, creditada a *Alan Smithee* — Brest recusou o corte) |
| Distribuição | Universal Pictures |
| Orçamento / receita | ~US$ 90 milhões / ~US$ 142,9 milhões |
| Tipo BudGanja | Arte — **peça 1924 primeiro**; filme 1998 como remake |
| Elenco âncora | Brad Pitt (Joe / o rapaz do café) · Anthony Hopkins (Bill Parrish) · Claire Forlani (Susan) · Jake Weber · Marcia Gay Harden · Jeffrey Tambor |
| Elo Palavras | [vida](${vida}) · [tempo](${tempo}) · [alma](${alma}) · [passar](${passar}) · [sempre](${sempre}) · [caminho](${caminho}) |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) · [peça / 1934](${wikiPeca}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **peça de 1924** — a Morte tira férias entre os vivos — e o filme de 1998 **alonga** o tema (quase três horas), não o inventa.  
**H2:** o «encontro marcado» do título BR é o [tempo](${tempo}) que já tem data; Joe pede [vida](${vida}) emprestada para a inspeccionar.  
**H3:** Hopkins carrega o ofício do pai que guia a Morte; Pitt é o corpo emprestado — pessoa ≠ personagem ≠ entidade.  
**H4:** manteiga de amendoim, café e dança são [gesto](${gesto}) do ordinário — o laboratório lê atenção, não receita.  
**H5:** fecho = [Valeu !!!](${mantra}) com o [tempo](${tempo}) que resta, sem barganhar o calendário.

## O início de tudo — a peça (1924)

**Alberto Casella** (1891–1957) escreve *La morte in vacanza*. A Morte assume forma humana, convive, apaixona-se, e o mundo dos vivos descobre o que significa **adiar**. Walter Ferris leva o texto ao inglês (1929). **1934:** Paramount / Mitchell Leisen / Fredric March — 79 minutos, pré-Code. O laboratório **nomeia a cadeia** e não apaga Casella.

1998 é remake **largo** e solto: mogul de media, fusão, Nova Iorque, Rhode Island. A pergunta continua a ser a da peça: *o que a Morte aprende se [passar](${passar}) uns dias connosco?*

## A adaptação — génese do filme (1998)

Brest realiza e produz. Guião de quatro nomes. Filmagem **11 jun. – 12 nov. 1997**: Aldrich Mansion (Warwick, Rhode Island) para a casa; sets no 14th Regiment Armory (Brooklyn) para o escritório; café em Broadway Restaurant, Manhattan (2664 Broadway / W 101st — fechou em 2023, nas fontes).

Estreia de encerramento no Festival de Tóquio (**8 nov. 1998**); EUA **13 nov.**; Brasil **11 dez.** Terceiro no fim-de-semana de abertura (~US$ 15 milhões). Doméstico fraco (~US$ 44,6 milhões); internacional puxa o total a ~US$ 142,9 milhões. O primeiro trailer de *The Phantom Menace* passou antes de algumas sessões — facto de sala, não de tese.

Crítica mista (RT ~48%; Metacritic 43). Consenso: elenco e imagem; duração «punitive». Ebert: três estrelas, «há tanto de fino». Hopkins: elogio quase unânime. Pitt: misto a duro; mais tarde o próprio actor disse ter «falhado o rumo» neste papel — **facto de ofício**, sem chacota. Newman: partitura elogiada (o mesmo compositor de [Um Sonho de Liberdade](${shaw})). Nomeação ao Razzie de pior remake — o laboratório **regista** e **não** adopta o troféu como veredicto.

## Tese cultural BudGanja

Bill Parrish, 65 anos, ouve uma voz. A Morte toma o corpo de um rapaz que Susan acabou de conhecer num café. Em troca de dias extra, Bill é guia. Joe descobre comida, ciúme, paixão, uma doente que o reconhece. Drew conspira a fusão. No baile de aniversário, Bill [passa](${passar}) o cargo e a [vida](${vida}) — dança com a filha, atravessa a ponte. O rapaz do café volta; Joe já não está.

| Tema na obra | Tradução editorial |
|--------------|-------------------|
| Morte de férias | Inspecionar a [vida](${vida}) **antes** de a cobrar — não protocolo |
| Dias extra | [Tempo](${tempo}) emprestado; kairós do aniversário, não cronómetro eterno |
| Café / manteiga de amendoim | [Gesto](${gesto}) do ordinário — o que Joe ainda não tinha nome |
| Pai e filha | [Respeito](${respeito}) de quem guia e de quem fica |
| Ponte / fogos | [Passar](${passar}) o encontro marcado; [sempre](${sempre}) não se barganha |
| Rapaz que volta | O corpo era empréstimo; a [alma](${alma}) do encontro fica no que Susan aprendeu a pedir |
| Corte Smithee | Versão curta sem o negócio — o filme **inteiro** é o objecto inspeccionado |

O laboratório **não** ensina a negociar a morte. Usa a obra como parábola: **o encontro inspecciona-se no dia que se tem; a peça honra-se.**

## Elenco — crédito, não centro

| Pessoa | Papel no ecrã | Nota de ofício |
|--------|---------------|----------------|
| **Anthony Hopkins** | William «Bill» Parrish | O guia; a crítica viu aqui o carácter inteiro |
| **Brad Pitt** | Joe Black / o rapaz do café | Dois ofícios no mesmo corpo; o actor depois recusou o próprio rumo — facto, não chacota |
| **Claire Forlani** | Susan Parrish | Quem encontra duas vezes o mesmo rosto |
| **Jake Weber** | Drew | A fusão — o negócio que o filme longo não corta |
| **Marcia Gay Harden** | Allison | A filha que organiza a festa |
| **Jeffrey Tambor** | Quince | O genro que pede desculpa |
| **Lois Kelly Miller** | a doente | Quem reconhece Joe sem o nome |

Pessoa ≠ personagem ≠ Morte. Sem ficha Pessoas neste passo — o par é a **peça** e este **filme**.

## Elos

| Recurso | Papel |
|---------|-------|
| [vida](${vida}) · [tempo](${tempo}) | Léxico-mãe: dias extra × dia ordinário |
| [alma](${alma}) · [passar](${passar}) · [sempre](${sempre}) | O que atravessa a ponte; o que não se eterniza |
| [caminho](${caminho}) · [gesto](${gesto}) · [respeito](${respeito}) | Guia, café, dança |
| [Questão de Tempo](${qdt}) | Outro filme de [tempo](${tempo}) emprestado — lá o autor escreve o texto; aqui a peça vem primeiro |
| [Um Sonho de Liberdade](${shaw}) | Newman de novo; [vida](${vida}) do outro lado da grade |
| [Alice](${alice}) | Outra ficha Artes com **literatura / teatro primeiro** |
| [Valeu !!!](${mantra}) | O melhor deste encontro *neste* [tempo](${tempo}) |

> Abrir primeiro esta ficha se o interesse for a **peça e o remake**. Abrir [tempo](${tempo}) ou [vida](${vida}) se o interesse for a **palavra**.

## Vídeo de referência (embed)

Trailer clássico (Rotten Tomatoes / Universal, 1998) — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | Meet Joe Black Official Trailer #1 (1998) HD |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **remake**; a génese é a peça de 1924 |

## Como repetir o método

1. Quando houver peça + filme de 1934 + remake, **priorizar a origem teatral**.  
2. Declarar tese a partir da pergunta da peça; o ecrã de 1998 como secção de adaptação.  
3. Tratar a Morte personificada como **ficção**, não como doutrina.  
4. Slug \`inspecao-filme-…\` (URL estável; conteúdo = peça primeiro).

## Limites

- Não é tratado de luto, escatologia nem aconselhamento clínico.  
- Não se inventa vida privada do elenco nem de Casella.  
- Auto-crítica de Pitt (2011): facto de ofício — **sem** centro de fofoca.  
- Versão Smithee: existe; o objecto é o filme longo.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Artes** — *Encontro Marcado* (1998) como remake da cadeia Casella 1924 → *Death Takes a Holiday* 1934. Teatro primeiro; ecrã creditado; elenco com nome.

[▶ Artes](${hub}) · [▶ vida](${vida}) · [▶ tempo](${tempo}) · [▶ Questão de Tempo](${qdt}) · [▶ Um Sonho de Liberdade](${shaw}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **Meet Joe Black** (1998, BR: *Encontro Marcado*). Directed by **Martin Brest**. The **origin** is Alberto Casella’s 1924 play *La morte in vacanza*, then Walter Ferris (1929) and *Death Takes a Holiday* (1934). The 1998 film is a **loose, long remake**.

> Independent audit. [Wikipedia](${wikiEn}). Universal — no affiliation. **Death-on-holiday fiction is not a clinical or eschatological manual.**

## Genesis

Casella writes the holiday. 1934 is 79 minutes; 1998 is three hours (media merger, New York, Rhode Island). Hopkins as guide; Pitt as borrowed body. Thomas Newman score (also [Shawshank](${shaw})).

## Words

[life](${vida}) · [time](${tempo}) · [soul](${alma}) · [path](${caminho})

## Status

**Approved in Arts** — 1924 play first; 1998 remake as credited echo.

[▶ life](${vida}) · [▶ time](${tempo})
`;

  const contentEs = `## Alcance

Inspección de **Meet Joe Black** (*Encontro Marcado*, 1998). Dirección de **Martin Brest**. El **origen** es la obra de Alberto Casella (1924) *La morte in vacanza*, luego Ferris (1929) y *Death Takes a Holiday* (1934). El filme de 1998 es **remake largo**.

> Auditoría independiente. [Wikipedia](${wiki}). **La ficción de la Muerte de vacaciones no es manual.**

## Génesis

Casella escribe las vacaciones. 1934 dura 79 minutos; 1998, tres horas. Hopkins guía; Pitt es el cuerpo prestado.

## Estado

**Aprobado en Artes** — obra 1924 primero; remake 1998 como eco acreditado.

[▶ vida](${vida}) · [▶ tempo](${tempo})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildEncontroMarcadoPost() {
  const { body, contentEn, contentEs, wiki } = buildBodies();
  return artePost({
    title: 'Inspeção: Encontro Marcado — a peça de 1924 e o filme de 1998',
    titleEn: 'Inspection: Meet Joe Black — the 1924 play and the 1998 film',
    titleEs: 'Inspección: Meet Joe Black — la obra de 1924 y el filme de 1998',
    excerpt:
      'Artes · cinema: Encontro Marcado / Meet Joe Black (1998, Brest) — génese na peça de Alberto Casella (1924) e em Death Takes a Holiday (1934); o filme é remake. Morte, tempo e vida ordinária.',
    excerptEn:
      'Arts · film: Meet Joe Black (1998, Brest) — origin in Alberto Casella’s 1924 play and Death Takes a Holiday (1934); the film is a remake. Death, time and ordinary life.',
    excerptEs:
      'Artes · cine: Meet Joe Black / Encontro Marcado (1998, Brest) — origen en la obra de Alberto Casella (1924) y Death Takes a Holiday (1934); el filme es remake. Muerte, tiempo y vida ordinaria.',
    slug: 'inspecao-filme-encontro-marcado',
    date: '2026-08-18T06:50:00.000Z',
    seriesOrder: 54,
    seriesLabel: 'Encontro Marcado · Artes',
    coverImage: 'imagens/inspecoes/encontro-marcado-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEncontroMarcadoPost,
  YT_ID
};
