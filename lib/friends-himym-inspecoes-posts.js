'use strict';

/**
 * Friends (1994–2004) e How I Met Your Mother (2005–2014) — Artes · sitcom
 * Génese: cada série é o texto (sem livro prévio). Fichas SEPARADAS.
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

const FRIENDS = '/posts/post-inspecao-serie-friends.html';
const HIMYM = '/posts/post-inspecao-serie-how-i-met-your-mother.html';
const YT_FRIENDS = 'sLisEEwYZvw';
const YT_HIMYM = 'cjJLEYMzpjc';

function buildFriendsBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Friends';
  const wikiEn = 'https://en.wikipedia.org/wiki/Friends';
  const yt = 'https://www.youtube.com/watch?v=' + YT_FRIENDS;
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const chaves = '/posts/post-inspecao-serie-chaves-el-chavo.html';
  const qdt = '/posts/post-inspecao-filme-questao-de-tempo.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial da sitcom **«Friends»** (**1994–2004**). Criada por **David Crane** e **Marta Kauffman**, com **Kevin S. Bright**. O **início de tudo** é a **série**: guião original, sem romance prévio. Os seis amigos em Manhattan **são** a génese. [How I Met Your Mother](${HIMYM}) tem ficha **própria** — outro criador, outra rede, outro recorte.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Friends](${wiki}), [Wikipedia (EN)](${wikiEn}), abertura (${yt}). Crédito: Crane / Kauffman / Bright / Warner Bros. Television / NBC / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção de apartamento ≠ manual de namoro nem de carreira.** Pessoa ≠ personagem. Sem vida privada inventada. A morte de Matthew Perry (2023) **regista-se como facto**; **não** é o centro desta ficha.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Friends** (BR / PT: o mesmo) |
| Anos | **1994–2004** (NBC · 22 set. 1994 – 6 mai. 2004) |
| Génese | Série original — *Insomnia Cafe* → *Friends Like Us* → *Six of One* → **Friends** |
| Criação | **David Crane** · **Marta Kauffman** |
| Produção | Kevin S. Bright · Bright/Kauffman/Crane · Warner Bros. Television |
| Temporadas / episódios | **10** · **236** (+ especial de reunião, 2021, como eco) |
| Tema | *I'll Be There for You* — The Rembrandts |
| Tipo BudGanja | Arte — **a série é o texto**; sitcom de ensemble |
| Elenco âncora | Jennifer Aniston (Rachel) · Courteney Cox (Monica) · Lisa Kudrow (Phoebe) · Matt LeBlanc (Joey) · Matthew Perry (Chandler) · David Schwimmer (Ross) |
| Elo Palavras | [vida](${vida}) · [coração](${coracao}) · [respeito](${respeito}) · [gesto](${gesto}) · [caminho](${caminho}) · [esperança](${esperanca}) |
| Ficha irmã (separada) | [How I Met Your Mother](${HIMYM}) — outra obra; não misturar |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja é o **ensemble** — seis ofícios no mesmo sofá — não o meme solto nem o cartaz de um casal.  
**H2:** a génese é Crane / Kauffman (1993–94); títulos de trabalho (*Insomnia Cafe*, *Friends Like Us*, *Six of One*) **declaram-se**; a alegação Crowe/*Singles* fica como **disputa**, não como origem.  
**H3:** Central Perk e o apartamento da Monica são [gesto](${gesto}) de vizinhança urbana — outra vila que [Chaves](${chaves}), outro recorte.  
**H4:** gags de época (corpo, género, diversidade) **registam-se**; assistir hoje pede [respeito](${respeito}) — rir e nomear o que já não se imita.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte *desta* turma *desta* década, sem fundir com [HIMYM](${HIMYM}).

## O início de tudo — a série (1994)

Crane e Kauffman, depois de *Family Album* (CBS, 1993), pensam seis pessoas nos vinte / trinta a fazer [caminho](${caminho}) em Manhattan. Tratamento de sete páginas a NBC (dez. 1993) como *Insomnia Cafe*. Guião-piloto: *Friends Like Us*. NBC hesita no título (*Six of One*); fica **Friends**. Bright produz. Estreia **22 set. 1994**, quinta-feira NBC (*Must See TV*). Gravação em Burbank (Stage 5, depois Stage 24 — *The Friends Stage*).

O café (Central Perk) resiste ao pedido de diner. A fonte do genérico filma-se de madrugada no Warner Ranch. O tema dos Rembrandts é [gesto](${gesto}) da obra — «I'll be there for you» como tese de turma, não contrato.

*Joey* (2004–06) e *Friends: The Reunion* (2021) são **ecos**. Esta ficha é a série de **1994–2004**.

## A obra — dez temporadas

236 episódios. Rachel foge do altar; Monica recebe colega de casa; Ross divorcia-se; Chandler ironiza; Joey ensaia; Phoebe canta. O laboratório **não** inventaria cada «The One with…». Lê o **padrão**: a família que se escolhe quando a [vida](${vida}) ainda é ponto de interrogação.

Recepção: êxito de audiência; syndication; crítica inicial mista a elogiosa; décadas depois, novo público em streaming **e** revisão de gags. O laboratório **documenta os dois**.

## Tese cultural BudGanja

| Tema na série | Tradução editorial |
|---------------|-------------------|
| Amigos como família | [Coração](${coracao}) de quem fica — sem apagar a família de sangue (Ross / Monica) |
| «I'll be there for you» | [Gesto](${gesto}) de presença; [esperança](${esperanca}) de quem atende o telefone |
| Central Perk | Mesa de [caminho](${caminho}) — o ordinário como palco |
| Ross / Rachel | Romance de ecrã; «we were on a break» é gag, **não** jurisprudência |
| Ensemble | Seis créditos — honrar a turma **sem** ficha Pessoas neste passo |
| Gags de época | [Respeito](${respeito}): contextualizar; não endossar gozação de corpo ou exclusão |
| Perry / Chandler | Ofício de timing; a pessoa **não** é o personagem; 2023 é facto |

O laboratório **não** ensina a namorar nem a negociar salário. Usa a série como parábola: **a turma inspecciona-se no [respeito](${respeito}) aos seis nomes; a biografia fica noutro sítio.**

## Elenco — crédito, não centro

| Pessoa | Papel | Nota |
|--------|-------|------|
| **Jennifer Aniston** | Rachel Green | O [caminho](${caminho}) que começa numa fuga de altar |
| **Courteney Cox** | Monica Geller | A casa e o [gesto](${gesto}) de cuidar |
| **Lisa Kudrow** | Phoebe Buffay | Voz própria — a turma não a reduz a «estranha» |
| **Matt LeBlanc** | Joey Tribbiani | Comicidade de apetite; pessoa ≠ o cartaz de sedução |
| **Matthew Perry** | Chandler Bing | Ironia como escudo; facto 2023 com [respeito](${respeito}) |
| **David Schwimmer** | Ross Geller | O irmão / o paleontólogo — pessoa ≠ o meme |
| **Crane · Kauffman · Bright** | Criação / produção | Autores da **série** — sem ficha Pessoas neste passo |
| **James Michael Tyler** | Gunther | Presença do café — crédito de quem serve a mesa |

## Elos

| Recurso | Papel |
|---------|-------|
| [vida](${vida}) · [coração](${coracao}) · [esperança](${esperanca}) | Léxico da turma |
| [respeito](${respeito}) · [gesto](${gesto}) · [caminho](${caminho}) | Como assistir e o que a mesa faz |
| [Chaves](${chaves}) | Outra sitcom de vizinhança — pátio, não Greenwich Village |
| [How I Met Your Mother](${HIMYM}) | **Ficha separada** — outro objecto (2005) |
| [Questão de Tempo](${qdt}) | Outro recorte de [tempo](${tempo}) e encontro — cinema, não sitcom |
| [Faça o melhor!](${mantra}) | O melhor *deste* recorte |

> Abrir esta ficha para **Friends**. Abrir [How I Met Your Mother](${HIMYM}) para **essa** série. Não fundir as duas.

## Vídeo de referência (embed)

Abertura da 1.ª temporada — @youtube ${YT_FRIENDS}

| Campo | Valor |
|-------|-------|
| Título | Friends — Opening Season 1 |
| ID | \`${YT_FRIENDS}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **abertura**; a génese é a série Crane / Kauffman |

## Limites

- Não é manual de relacionamentos nem inventário de 236 episódios.  
- *Joey* e a Reunião: ecos — fora do núcleo.  
- Gags de época: contexto, não endosso.  
- Sem vida privada inventada (elenco).  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [How I Met Your Mother](${HIMYM}).

## Status

**Aprovado na série Artes (ficha própria)** — *Friends* (1994–2004). Crane / Kauffman primeiro; a série é o texto; elenco com nome; irmã [HIMYM](${HIMYM}) noutro sítio.

[▶ Artes](${hub}) · [▶ vida](${vida}) · [▶ How I Met Your Mother (outra ficha)](${HIMYM}) · [▶ Faça o melhor!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **Friends** (1994–2004). Created by **David Crane** and **Marta Kauffman**. The **series is the text** — no prior novel. [How I Met Your Mother](${HIMYM}) has its **own** sheet.

> [Wikipedia](${wikiEn}). Sitcom ≠ dating manual. Person ≠ character. Matthew Perry (2023) is fact — **not** the center.

## Status

**Approved in Arts as its own sheet** — Crane / Kauffman first; ensemble credited.

[▶ life](${vida}) · [▶ HIMYM (separate)](${HIMYM})
`;

  const contentEs = `## Alcance

Inspección de **Friends** (1994–2004). Creada por **David Crane** y **Marta Kauffman**. La **serie es el texto**. [How I Met Your Mother](${HIMYM}) tiene ficha **propia**.

> [Wikipedia](${wiki}). Sitcom ≠ manual de citas. Persona ≠ personaje. 2023 es hecho — **no** el centro.

## Estado

**Aprobado en Artes (ficha propia)** — Crane / Kauffman primero; elenco con nombre.

[▶ vida](${vida}) · [▶ HIMYM (otra)](${HIMYM})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFriendsPost() {
  const { body, contentEn, contentEs, wiki } = buildFriendsBodies();
  return artePost({
    title: 'Inspeção: Friends — a turma de 1994 e a série que é o texto',
    titleEn: 'Inspection: Friends — the 1994 ensemble and the series as the text',
    titleEs: 'Inspección: Friends — la tropa de 1994 y la serie como texto',
    excerpt:
      'Artes · sitcom: Friends (1994–2004, Crane / Kauffman) — a série é a génese; ensemble com crédito. Ficha própria, distinta de How I Met Your Mother.',
    excerptEn:
      'Arts · sitcom: Friends (1994–2004, Crane / Kauffman) — the series is the origin; ensemble credited. Own sheet, distinct from How I Met Your Mother.',
    excerptEs:
      'Artes · sitcom: Friends (1994–2004, Crane / Kauffman) — la serie es el origen; elenco con crédito. Ficha propia, distinta de How I Met Your Mother.',
    slug: 'inspecao-serie-friends',
    date: '2026-08-18T07:40:00.000Z',
    seriesOrder: 57,
    seriesLabel: 'Friends · Artes',
    coverImage: 'imagens/inspecoes/friends-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_FRIENDS,
    body,
    contentEn,
    contentEs
  });
}

function buildHimymBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/How_I_Met_Your_Mother';
  const wikiEn = 'https://en.wikipedia.org/wiki/How_I_Met_Your_Mother';
  const yt = 'https://www.youtube.com/watch?v=' + YT_HIMYM;
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const qdt = '/posts/post-inspecao-filme-questao-de-tempo.html';
  const encontro = '/posts/post-inspecao-filme-encontro-marcado.html';
  const chaves = '/posts/post-inspecao-serie-chaves-el-chavo.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial da sitcom **«How I Met Your Mother»** — no Brasil, o mesmo título inglês ou **Como Eu Conheci Sua Mãe** (**2005–2014**). Criada por **Carter Bays** e **Craig Thomas**. O **início de tudo** é a **série**: guião original, sem romance prévio. A moldura — Ted em 2030 a contar aos filhos **como** conheceu a [mãe](${mae}) — **é** a génese. [Friends](${FRIENDS}) tem ficha **própria** — outra década, outra casa, outro texto.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · How I Met Your Mother](${wiki}), [Wikipedia (EN)](${wikiEn}), trailer (${yt}). Crédito: Bays / Thomas / Bays Thomas Productions / 20th Century Fox Television / CBS / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção de encontro ≠ manual de conquista.** O «playbook» de Barney **não** se endossa. Pessoa ≠ personagem. Sem vida privada inventada. O final polarizado **regista-se como recepção**; **não** é tribunal.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **How I Met Your Mother** / *Como Eu Conheci Sua Mãe* |
| Título original | *How I Met Your Mother* |
| Anos | **2005–2014** (CBS · 19 set. 2005 – 31 mar. 2014) |
| Génese | Série original — Bays & Thomas; moldura do narrador em 2030 |
| Criação | **Carter Bays** · **Craig Thomas** |
| Realização âncora | Pamela Fryman (maioria dos episódios, nas fontes) |
| Temporadas / episódios | **9** · **208** |
| Tema | *Hey Beautiful* — The Solids (Bays e Thomas na banda) |
| Narrador (2030) | Bob Saget (voz) · Josh Radnor (Ted no ecrã) |
| A Mãe | Tracy McConnell — **Cristin Milioti** (visível no fim da 8.ª; regular na 9.ª) |
| Tipo BudGanja | Arte — **a série é o texto**; sitcom de [tempo](${tempo}) e relato |
| Elenco âncora | Josh Radnor (Ted) · Jason Segel (Marshall) · Alyson Hannigan (Lily) · Neil Patrick Harris (Barney) · Cobie Smulders (Robin) · Cristin Milioti (Tracy) |
| Elo Palavras | [tempo](${tempo}) · [passado](${passado}) · [mãe](${mae}) · [vida](${vida}) · [caminho](${caminho}) · [esperança](${esperanca}) |
| Ficha irmã (separada) | [Friends](${FRIENDS}) — outra turma; não misturar |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja é o **relato** — como se conta um encontro — não a lista de namoradas nem o gag do terno.  
**H2:** Bays / Thomas escrevem a partir da amizade e de bares de Nova Iorque (McGee's e outros); MacLaren's é [gesto](${gesto}) de oficina, não acta notarial.  
**H3:** Ted futuro é narrador **não fiável** (os criadores declaram) — o [passado](${passado}) chega filtrado.  
**H4:** o final (Tracy morre; Ted volta a Robin) é **recepção polarizada** — documentar, não «corrigir» a obra.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte *deste* [tempo](${tempo}) *desta* [mãe](${mae}), sem fundir com [Friends](${FRIENDS}).

## O início de tudo — a série (2005)

Bays e Thomas criam. Fox Television / CBS. Estreia **19 set. 2005**. Tema: recorte de *Hey Beautiful* (The Solids). A pergunta do título é o motor: **como** conheci a vossa [mãe](${mae}) — não um biopic de casamento.

MacLaren's (nome do assistente Carl MacLaren) junta a turma. Guarda-chuva amarelo, trompa azul, aposta das chapadas: [gesto](${gesto}) de série — teses culturais, não protocolos. A Mãe filma-se cedo (2006) nos filhos adolescentes, porque o [tempo](${tempo}) do ecrã e o calendário real não coincidem.

*How I Met Your Father* (2022) é **eco**. Esta ficha é **2005–2014**.

## A obra — nove temporadas

208 episódios. Ted arquitecto / professor conta; Marshall e Lily casam e mudam; Robin recusa o guião tradicional; Barney veste o terno. Tracy entra tarde de propósito. O laboratório **não** inventaria cada arco: lê o **padrão** — o [caminho](${caminho}) até ao encontro e o preço de o narrar depois.

Recepção: êxito de sitcom; o final *Last Forever* (31 mar. 2014) polariza (elogio de coerência com o conceito inicial × acusação de desperdício da 9.ª). O laboratório **documenta os dois** e **não** fecha o veredicto dos fãs.

## Tese cultural BudGanja

| Tema na série | Tradução editorial |
|---------------|-------------------|
| «Kids, I'm going to tell you…» | [Tempo](${tempo}) como moldura; o [passado](${passado}) é escolha de quem conta |
| A [mãe](${mae}) | Pessoa no ecrã (Milioti); o título não a apaga até à 8.ª |
| Guarda-chuva / trompa | [Gesto](${gesto}) — objectos que carregam o encontro |
| Narrador não fiável | [Verdade](${verdade}) de ofício: lembrar é editar |
| MacLaren's | Mesa de turma — outra que [Friends](${FRIENDS}), **outra ficha** |
| Barney / «legen-dary» | Comicidade de conquista — **não** é manual; [respeito](${respeito}) pede o aviso |
| Final | Recepção: [vida](${vida}) e perda *versus* o casal que o público esperava |
| [Questão de Tempo](${qdt}) | Cinema do [tempo](${tempo}) — elo, não gémeo |

O laboratório **não** ensina a «conhecer a mãe» nem a aplicar o playbook. Usa a série como parábola: **o encontro inspecciona-se no [respeito](${respeito}) a quem foi [mãe](${mae}) na história; o gag não manda na ética.**

## Elenco — crédito, não centro

| Pessoa | Papel | Nota |
|--------|-------|------|
| **Josh Radnor** | Ted Mosby | Quem vive o [caminho](${caminho}); Saget narra o Ted de 2030 |
| **Jason Segel** | Marshall Eriksen | A amizade longa — pessoa ≠ o advogado do ecrã |
| **Alyson Hannigan** | Lily Aldrin | Ofício e casa; crédito sem reduzir a «a que manda» |
| **Neil Patrick Harris** | Barney Stinson | Timing de terno; o personagem **não** é prescrito |
| **Cobie Smulders** | Robin Scherbatsky | Carreira e recusa — pessoa ≠ o meme canadiano |
| **Cristin Milioti** | Tracy McConnell | A [mãe](${mae}) do título — entra tarde de propósito |
| **Bob Saget** | Voz do Ted futuro | Moldura; morreu em 2022 — facto, não centro |
| **Bays · Thomas** | Criação | Autores da **série** e do tema (The Solids) |

## Elos

| Recurso | Papel |
|---------|-------|
| [tempo](${tempo}) · [passado](${passado}) · [mãe](${mae}) | Léxico do título e da moldura |
| [vida](${vida}) · [caminho](${caminho}) · [esperança](${esperanca}) · [gesto](${gesto}) | Relato, objectos, o que se espera do encontro |
| [Questão de Tempo](${qdt}) | Outro ofício de [tempo](${tempo}) — filme, não sitcom |
| [Encontro Marcado](${encontro}) | Outro «meet» — peça / cinema, não CBS |
| [Chaves](${chaves}) | Outra turma — vila, não MacLaren's |
| [Friends](${FRIENDS}) | **Ficha separada** — outro objecto (1994) |
| [Faça o melhor!](${mantra}) | O melhor *deste* recorte |

> Abrir esta ficha para **How I Met Your Mother**. Abrir [Friends](${FRIENDS}) para **essa** série. Não fundir as duas.

## Vídeo de referência (embed)

Trailer da série — @youtube ${YT_HIMYM}

| Campo | Valor |
|-------|-------|
| Título | How I Met Your Mother — Trailer |
| ID | \`${YT_HIMYM}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **série**; a génese é Bays / Thomas |

## Limites

- Não é manual de conquista nem inventário de 208 episódios.  
- Playbook / slap bet: gag — **não** se reproduz nem se ensina.  
- Final: facto de recepção — sem «consertar» o texto.  
- *How I Met Your Father*: eco.  
- Sem vida privada inventada.  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [Friends](${FRIENDS}).

## Status

**Aprovado na série Artes (ficha própria)** — *How I Met Your Mother* (2005–2014). Bays / Thomas primeiro; a série é o texto; a [mãe](${mae}) tem nome no ecrã; irmã [Friends](${FRIENDS}) noutro sítio.

[▶ Artes](${hub}) · [▶ tempo](${tempo}) · [▶ Friends (outra ficha)](${FRIENDS}) · [▶ Faça o melhor!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **How I Met Your Mother** (2005–2014). Created by **Carter Bays** and **Craig Thomas**. The **series is the text** — Ted in 2030 telling how he met their mother. [Friends](${FRIENDS}) has its **own** sheet.

> [Wikipedia](${wikiEn}). Sitcom ≠ pickup manual. The finale’s polarized reception is fact — not a court.

## Status

**Approved in Arts as its own sheet** — Bays / Thomas first; Tracy / Milioti credited.

[▶ time](${tempo}) · [▶ Friends (separate)](${FRIENDS})
`;

  const contentEs = `## Alcance

Inspección de **How I Met Your Mother** (*Como Eu Conheci Sua Mãe*, 2005–2014). Creada por **Carter Bays** y **Craig Thomas**. La **serie es el texto**. [Friends](${FRIENDS}) tiene ficha **propia**.

> [Wikipedia](${wiki}). Sitcom ≠ manual de conquista. El final polarizado es recepción — no tribunal.

## Estado

**Aprobado en Artes (ficha propia)** — Bays / Thomas primero; Tracy / Milioti con crédito.

[▶ tempo](${tempo}) · [▶ Friends (otra)](${FRIENDS})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildHimymPost() {
  const { body, contentEn, contentEs, wiki } = buildHimymBodies();
  return artePost({
    title: 'Inspeção: How I Met Your Mother — o relato, o tempo e a série de 2005',
    titleEn: 'Inspection: How I Met Your Mother — the telling, time and the 2005 series',
    titleEs: 'Inspección: How I Met Your Mother — el relato, el tiempo y la serie de 2005',
    excerpt:
      'Artes · sitcom: How I Met Your Mother (2005–2014, Bays / Thomas) — a série é a génese; moldura do tempo e da mãe. Ficha própria, distinta de Friends.',
    excerptEn:
      'Arts · sitcom: How I Met Your Mother (2005–2014, Bays / Thomas) — the series is the origin; time-frame and the mother. Own sheet, distinct from Friends.',
    excerptEs:
      'Artes · sitcom: How I Met Your Mother (2005–2014, Bays / Thomas) — la serie es el origen; marco del tiempo y la madre. Ficha propia, distinta de Friends.',
    slug: 'inspecao-serie-how-i-met-your-mother',
    date: '2026-08-18T07:45:00.000Z',
    seriesOrder: 58,
    seriesLabel: 'How I Met Your Mother · Artes',
    coverImage: 'imagens/inspecoes/how-i-met-your-mother-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_HIMYM,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  artePost,
  FRIENDS,
  HIMYM,
  YT_FRIENDS,
  YT_HIMYM,
  buildFriendsBodies,
  buildFriendsPost,
  buildHimymBodies,
  buildHimymPost
};
