'use strict';

/**
 * De Volta para o Futuro (1985) — Artes · cinema
 * + Pessoas: Michael J. Fox e Christopher Lloyd (homenagem aos actores).
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

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

const FILME = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
const FOX = '/posts/post-inspecao-figura-michael-j-fox.html';
const LLOYD = '/posts/post-inspecao-figura-christopher-lloyd.html';
const DELOREAN = '/posts/post-inspecao-delorean.html';
const YT_ID = 'qvsgGtivCgs';

function buildFilmeBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Back_to_the_Future';
  const wikiEn = 'https://en.wikipedia.org/wiki/Back_to_the_Future';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Homenagem editorial e inspeção do filme **«Back to the Future»** — no Brasil, **De Volta para o Futuro** (**1985**). Realização de **Robert Zemeckis**, argumentado por Zemeckis e **Bob Gale**. O **início de tudo** é a **obra de 1985**. As partes II (1989) e III (1990) ficam como **ecos**.

O recorte BudGanja **não** é só a DeLorean nem a tese do tempo: é **honrar os actores** — gente com nome, ofício e presença — sem os reduzir a personagem, métrica ou doença. Fichas de pessoa: [Michael J. Fox](${FOX}) e [Christopher Lloyd](${LLOYD}). O resto do elenco recebe aqui o **mesmo respeito**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Back to the Future](${wiki}), [Wikipedia (EN)](${wikiEn}), trailer (${yt}). Crédito: Universal / Amblin / Zemeckis / Gale / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. Distinto de [The Matrix](${matrix}) (filme primeiro, actor secundário): **aqui o filme existe também para devolver o crédito às pessoas**. **Ficção de viagem no tempo ≠ manual.** Não se inventa vida privada.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **De Volta para o Futuro** |
| Título original | *Back to the Future* (PT/PALOP: *Regresso ao Futuro*) |
| Ano | **1985** (EUA 3 jul.; Brasil 25 dez.; Portugal 19 dez.) |
| Realização | **Robert Zemeckis** |
| Argumento | Robert Zemeckis · **Bob Gale** |
| Produção | Bob Gale · Neil Canton · exec. Steven Spielberg, Frank Marshall, Kathleen Kennedy |
| Música | **Alan Silvestri** · canções Huey Lewis and the News |
| Duração | 116 min |
| Produção / distribuição | Amblin Entertainment · Universal Pictures |
| Tipo BudGanja | Arte — **filme 1985** + **homenagem aos actores** |
| Elenco âncora | [Michael J. Fox](${FOX}) · [Christopher Lloyd](${LLOYD}) · Lea Thompson · Crispin Glover · Thomas F. Wilson |
| Elo Palavras | [tempo](${tempo}) · [passado](${passado}) · [caminho](${caminho}) · [passar](${passar}) |
| Elo Pessoas | [Fox](${FOX}) · [Lloyd](${LLOYD}) · hub [Pessoas](${pessoas}) |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **obra de 1985** — Hill Valley, 88 mph, a pergunta «e se encontrares os teus pais na mesma idade?» — e **não fecha** sem os actores.  
**H2:** Marty e Doc são personagens; **Fox e Lloyd** são pessoas. Separar. Honrar.  
**H3:** o elenco inteiro (Thompson, Glover, Wilson, Wells, Tolkan, Lewis, e quem filmou e saiu) merece [respeito](${respeito}) de gente, não nota de rodapé.  
**H4:** [tempo](${tempo}) e [passado](${passado}) são o léxico da obra; o [gesto](${gesto}) dos actores é o que a torna viva.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* filme *destas* pessoas.

## O início de tudo — génese do filme

A ideia nasce quando **Bob Gale** vê o anuário do pai e pergunta: *teria sido amigo dele no colégio?* Zemeckis junta a mãe que «nunca beijou um rapaz» — e o par escreve. Estúdios recusam durante anos («leve demais»; a Disney recusa o eixo mãe/filho). Depois de *Romancing the Stone*, Spielberg e a Universal pegam. Sidney Sheinberg quase muda o título para *Spaceman from Pluto*; Spielberg desarma a ideia.

**3 de julho de 1985**, EUA. Filme mais visto do ano (~US$ 381–383 milhões). Hugo, Saturno, National Film Registry (2007), AFI 10.º melhor sci-fi americano (2008). Reagan cita-o no Estado da União (1986).

A [DeLorean](${DELOREAN}) substitui o frigorífico (risco de crianças se trancarem) e a explosão nuclear — ficha própria do **objecto**. Hill Valley filma-se na praça da Universal — 1955 primeiro, depois o 1985 «sem vida».

## Homenagem aos actores — o centro desta ficha

O laboratório **não** trata o elenco como figurinos. Trata-os como **pessoas especiais** cujo ofício fez o filme.

### Michael J. Fox — Marty McFly

**Michael Andrew Fox** (Edmonton, 9 jun. 1961). Primeira escolha para Marty. *Family Ties* não o largava; **Eric Stoltz** filma quatro semanas; Zemeckis e Spielberg reescalam — não por «falha» de Stoltz (interpretação dramática séria), mas porque o filme pedia o **humor e o corpo** de Fox. Fox aceita: dias em *Family Ties*, noites no set até às 2h30, fins-de-semana de exteriores. «Tudo o que eu fazia no colégio era andar de skate, ir atrás de garotas e tocar em bandas.»

A ficha de pessoa — ofício, coragem, Fundação — está em **[Michael J. Fox](${FOX})**. Aqui: o rapaz que **deu o corpo** a Marty sem deixar de ser Michael.

### Christopher Lloyd — Dr. Emmett Brown

**Christopher Allen Lloyd** (Stamford, 22 out. 1938). Primeira escolha: John Lithgow (indisponível). Lloyd **recusa** o papel; lê o guião; a mulher insiste; aceita. Improvisa com Einstein e Leopold Stokowski na cabeça. Diz «jigowatts». A *Variety* viu na amizade Marty–Doc um eco de Artur e Merlin.

A ficha de pessoa está em **[Christopher Lloyd](${LLOYD})**. Aqui: o homem que **inventou o Doc** sem se apagar nele.

### Lea Thompson — Lorraine Baines McFly

**Lea Katherine Thompson** (Rochester, Minnesota, 31 mai. 1961). Lorraine em 1955 e a mãe de 1985. A maquiagem protésica do início levava **três horas e meia**. Escalada depois de trabalhar com Stoltz em *The Wild Life*. Ofício: duas idades no mesmo corpo, sem caricatura barata da mãe. Crédito à **actriz**, não só à «mãe de Marty».

### Crispin Glover — George McFly

**Crispin Hellion Glover** (Nova Iorque, 20 abr. 1964). George tímido de 1955 e o pai de 1985. Zemeckis: Glover **improvisou** maneirismos (mãos a tremer). Desacordo de contrato: nas sequelas entra Jeffrey Weissman. O laboratório **não** transforma o desacordo em fofoca — regista o **ofício de 1985**. Sem Glover, o George que o filme precisa não existe.

### Thomas F. Wilson — Biff Tannen

**Thomas Francis Wilson** (Filadélfia, 15 abr. 1959). Biff. A primeira ideia (J. J. Cohen) não convencia a intimidar Stoltz; Cohen fica na gangue. Wilson faz o valentão **sem** o reduzir a cartaz — e a pessoa por trás (actor, humorista, pintor, voz) é maior do que o murro. Honra-se o **homem**, não o bully.

### Claudia Wells · Elisabeth Shue — Jennifer Parker

**Claudia Grace Wells** (Kuala Lumpur, 5 jul. 1966) é Jennifer em 1985. Sai da carreira para cuidar da mãe doente; nas sequelas entra **Elisabeth Shue** (Wilmington, 6 out. 1963). Duas actrizes, um nome de personagem: o laboratório **nomeia as duas** e não apaga Wells.

### James Tolkan — Gerald Strickland

**James S. Tolkan** (Calumet, 20 jun. 1931). O director — 1955 e 1985. Presença curta, marca longa. Crédito de ofício.

### Huey Lewis — o juiz da batalha de bandas

**Hugh Anthony Cregg III** (Nova Iorque, 5 jul. 1950). Ponta como o professor que manda a banda de Marty calar-se — e *The Power of Love* / *Back in Time* no filme. Actor por um instante; músico por ofício. Os dois créditos cabem.

### Eric Stoltz — quem filmou primeiro

**Eric Cameron Stoltz** (Whittier, 30 set. 1961) filmou Marty durante semanas. A reescalação **não** é vergonha da pessoa: é decisão de tom (comédia vs drama). O laboratório **não** apaga quem trabalhou. Stoltz tem nome e ofício.

### Outros nomes com cara

Billy Zane (Match), Casey Siemaszko (3-D), Jeffrey Jay Cohen (Skinhead), Marc McClure (Dave), Wendie Jo Sperber (Linda), Harry Waters Jr. (Marvin Berry), Donald Fullilove (Goldie Wilson), Frances Lee McCain e George DiCenzo (pais de Lorraine). Cada um: **pessoa**, não figurante sem nome.

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Viajar ao [passado](${passado}) | Ver o que [passou](${passar}) sem apagar quem viveu |
| Consertar o [tempo](${tempo}) | Método, não nostalgia oca |
| 88 mph / relógio | [Gesto](${gesto}) + instante — [skill](${skill}) de precisão |
| Amizade Marty–Doc | Duas pessoas no ecrã; duas fichas em Pessoas |
| Hill Valley muda | O [caminho](${caminho}) da cidade é o da escolha |
| Johnny B. Goode | [Criatividade](${criatividade}) que o público de teste recusou cortar |

O laboratório **não** adopta física de viagem no tempo. Usa o filme como parábola: **o passado inspeciona-se; as pessoas honram-se.**

## Elos

| Recurso | Papel |
|---------|-------|
| [Michael J. Fox](${FOX}) | Pessoa — Marty é personagem; Michael é a ficha |
| [Christopher Lloyd](${LLOYD}) | Pessoa — Doc é personagem; Christopher é a ficha |
| [DeLorean](${DELOREAN}) | Objecto — carro real primeiro; máquina do filme como camada |
| [tempo](${tempo}) · [passado](${passado}) | Léxico da obra |
| [caminho](${caminho}) · [passar](${passar}) | Travessia 1985 ↔ 1955 |
| [respeito](${respeito}) | Como se trata o elenco |
| [The Matrix](${matrix}) | Outro filme Artes; hierarquia inversa (obra > actor) |
| [Valeu !!!](${mantra}) | O melhor desta homenagem |

> Abrir primeiro esta ficha se o interesse for o **filme e o elenco**. Abrir [Fox](${FOX}) ou [Lloyd](${LLOYD}) se o interesse for a **pessoa**. Abrir a [DeLorean](${DELOREAN}) se o interesse for o **carro**.

## Vídeo de referência (embed)

Trailer oficial do filme de 1985 — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | Back to the Future (1985) Official Trailer |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **obra**; a homenagem aos actores está no texto e nas fichas Pessoas |

## Limites

- Não é walkthrough nem física de ficção.  
- Não se inventa vida privada do elenco.  
- Parkinson em Fox: facto e advocacia na [ficha da pessoa](${FOX}) — **não** o centro desta inspeção.  
- Desacordo Glover / sequelas: facto contratual, não fofoca.  
- Stoltz: crédito, não anedota cruel.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Artes com homenagem aos actores** — *De Volta para o Futuro* (1985). Obra de Zemeckis/Gale; crédito de gente a Fox, Lloyd, Thompson, Glover, Wilson, Wells, Shue, Tolkan, Lewis, Stoltz e ao resto do elenco.

[▶ Artes](${hub}) · [▶ Michael J. Fox](${FOX}) · [▶ Christopher Lloyd](${LLOYD}) · [▶ DeLorean](${DELOREAN}) · [▶ tempo](${tempo}) · [▶ passado](${passado}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage and inspection of **Back to the Future** (1985, Zemeckis / Gale). The **1985 film** is the origin; Parts II–III are echoes. BudGanja cut: honor the **actors as people**, not only the DeLorean. Person sheets: [Michael J. Fox](${FOX}), [Christopher Lloyd](${LLOYD}).

> Independent audit. [Wikipedia](${wikiEn}). Universal / Amblin — no affiliation. **Time-travel fiction is not a manual.** No invented private life.

## Homage (leads)

- **[Michael J. Fox](${FOX})** — first choice for Marty; nights after *Family Ties*; skate, guitar, comic timing.  
- **[Christopher Lloyd](${LLOYD})** — first refused Doc; Einstein / Stokowski; invented the scientist without erasing the man.  
- **Lea Thompson**, **Crispin Glover**, **Thomas F. Wilson**, **Claudia Wells** / **Elisabeth Shue**, **James Tolkan**, **Huey Lewis**, **Eric Stoltz** (filmed first — recast is tone, not shame).

## Words

[time](${tempo}) · [past](${passado}) · [path](${caminho}) · [respect](${respeito})

## Status

**Approved in Arts with actor homage** — 1985 work; people credited by name.

[▶ Fox](${FOX}) · [▶ Lloyd](${LLOYD})
`;

  const contentEs = `## Alcance

Homenaje e inspección de **Back to the Future** (*De Volta para o Futuro*, 1985, Zemeckis / Gale). El filme de **1985** es el origen; las partes II–III son ecos. Recorte: honrar a los **actores como personas**. Fichas: [Michael J. Fox](${FOX}), [Christopher Lloyd](${LLOYD}).

> Auditoría independiente. [Wikipedia](${wiki}). Sin afiliación. **La ficción de viaje en el tiempo no es manual.**

## Homenaje

- **[Fox](${FOX})** — Marty; noches tras *Family Ties*.  
- **[Lloyd](${LLOYD})** — Doc; primero rechazó el papel.  
- Thompson, Glover, Wilson, Wells / Shue, Tolkan, Lewis, **Stoltz** (filmó primero — el recasting es de tono, no de vergüenza).

## Estado

**Aprobado en Artes con homenaje a los actores.**

[▶ Fox](${FOX}) · [▶ Lloyd](${LLOYD})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFilmePost() {
  const { body, contentEn, contentEs, wiki } = buildFilmeBodies();
  return artePost({
    title: 'Inspeção: De Volta para o Futuro — o filme de 1985 e a homenagem aos actores',
    titleEn: 'Inspection: Back to the Future — the 1985 film and homage to the actors',
    titleEs: 'Inspección: Back to the Future — el filme de 1985 y el homenaje a los actores',
    excerpt:
      'Artes · cinema: De Volta para o Futuro (1985, Zemeckis/Gale) — a obra e o crédito às pessoas: Michael J. Fox, Christopher Lloyd e o elenco, tratados como gente, não como persona.',
    excerptEn:
      'Arts · film: Back to the Future (1985, Zemeckis/Gale) — the work and credit to the people: Michael J. Fox, Christopher Lloyd and the cast, treated as people, not personas.',
    excerptEs:
      'Artes · cine: Back to the Future (1985, Zemeckis/Gale) — la obra y el crédito a las personas: Michael J. Fox, Christopher Lloyd y el elenco, como gente, no como persona de pantalla.',
    slug: 'inspecao-filme-de-volta-para-o-futuro',
    date: '2026-08-18T05:20:00.000Z',
    seriesOrder: 50,
    seriesLabel: 'De Volta para o Futuro · Artes',
    coverImage: 'imagens/inspecoes/de-volta-para-o-futuro-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

function buildFoxBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Michael_J._Fox';
  const wikiEn = 'https://en.wikipedia.org/wiki/Michael_J._Fox';
  const fundacao = 'https://www.michaeljfox.org/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Michael Andrew Fox** — no ecrã, **Michael J. Fox** (Edmonton, Alberta, 9 de junho de 1961). Actor canadiano-americano. O recorte BudGanja **não** é ficha de doença nem de personagem: é a **pessoa e o ofício** — timing, skate, guitarra fingida, noites depois de *Family Ties* — com elo principal em [De Volta para o Futuro](${FILME}).

> **Nota metodológica:** auditoria independente. [Wikipédia · Michael J. Fox](${wiki}), [EN](${wikiEn}), [Michael J. Fox Foundation](${fundacao}). Sem afiliação. Distinto do [Legado](${legado}) canábico. O Parkinson (diagnóstico 1991; público 1998) **regista-se como facto e advocacia**; **não** é o centro nem se romantiza. Quando a dor pedir companhia: [Vida](${vida}).

Marty McFly é personagem. **Michael** é a ficha.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Michael Andrew Fox** |
| Nome artístico | **Michael J. Fox** (o «J.» distingue-o de outro actor) |
| Nascimento | 9 jun. 1961, Edmonton, Alberta, Canadá |
| Ofícios | Actor · produtor · escritor · defensor de investigação |
| Obra-âncora BudGanja | [De Volta para o Futuro](${FILME}) (1985) — Marty |
| Outras marcas | *Family Ties* · *Spin City* · *Teen Wolf* · *The Frighteners* · *Stuart Little* (voz) |
| Fundação | [Michael J. Fox Foundation](${fundacao}) (2000) |
| Tipo BudGanja | Pessoa — ofício e presença × Artes |
| Elo principal | [De Volta para o Futuro](${FILME}) |
| Elo Palavras | [gesto](${gesto}) · [skill](${skill}) · [respeito](${respeito}) · [tempo](${tempo}) |
| Fonte | [Wikipédia](${wiki}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor é o **método de presença** — comédia no corpo, skate, olhar — não o mito do «miúdo dos anos 80».  
**H2:** o filme de 1985 é o **elo de obra**; a biografia não se duplica lá.  
**H3:** a Fundação e o livro *Lucky Man* são **ofício depois do ecrã** — [caminho](${caminho}) de pessoa, não definição única.  
**H4:** fecho = [respeito](${respeito}) + [Valeu !!!](${mantra}).

## Quem é (síntese verificável)

- Nasce em Edmonton; família militar; muda-se para a Colúmbia Britânica; começa a actuar muito novo.  
- O «J.» no nome artístico evita confusão com outro Michael Fox (homenagem a Michael J. Pollard, nas fontes).  
- *Family Ties* (Alex P. Keaton) — primeira fama nacional.  
- 1985: *Back to the Future* — primeira escolha; só entra depois da reescalação; filma de noite. Trilogia 1985–1990.  
- *Spin City*; voz em *Stuart Little*.  
- 1991: diagnóstico de Parkinson de início precoce; 1998: torna público; 2000: funda a [Foundation](${fundacao}).  
- *Lucky Man*; documentário *Still* (2023). Aposentadoria anunciada em 2020; aparições pontuais depois.

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Timing cómico | [Gesto](${gesto}) no instante certo |
| Skate e guitarra | [Skill](${skill}) de corpo — Hanson ensinou a fingir as partes; Tim May / Mark Campbell tocaram e cantaram «Johnny B. Goode» |
| Dois ofícios à vez | *Family Ties* de dia, Zemeckis de noite — obstinação, não glamour |
| Separar pessoa / personagem | Marty ≠ Michael |
| Depois do ecrã | Fundação = [caminho](${caminho}) de bem público |

## Elo com o filme

Abrir [De Volta para o Futuro](${FILME}) para a **obra e o elenco**. Esta ficha se o interesse for o **homem**.

## Limites

- Não é biografia fechada nem ranking.  
- Parkinson: facto, advocacia, *Lucky Man* — **sem** centro patológico nem conselho clínico.  
- Sem vida privada inventada (família, filhos).  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas com mérito de pessoa especial** — Michael J. Fox · ofício · [De Volta para o Futuro](${FILME}) · Fundação como eco, não definição.

[▶ Pessoas](${hub}) · [▶ o filme](${FILME}) · [▶ Lloyd](${LLOYD}) · [▶ Foundation](${fundacao}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage to **Michael Andrew Fox** (**Michael J. Fox**, b. 9 Jun 1961, Edmonton). Craft and presence — not a disease sheet. Anchor: [Back to the Future](${FILME}).

> [Wikipedia](${wikiEn}). Parkinson's (1991 / public 1998) is fact and advocacy — **not** the center. [Foundation](${fundacao}). For companionship: [Vida](${vida}).

## Status

**Approved in People** — Michael J. Fox; Marty is the character; this sheet is the man.

[▶ Film](${FILME}) · [▶ Foundation](${fundacao})
`;

  const contentEs = `## Alcance

Homenaje a **Michael Andrew Fox** (**Michael J. Fox**, n. 9 jun. 1961, Edmonton). Oficio y presencia — no ficha de enfermedad. Ancla: [De Volta para o Futuro](${FILME}).

> Parkinson (1991 / público 1998): hecho y defensa — **no** el centro. [Foundation](${fundacao}).

## Estado

**Aprobado en Personas** — Michael J. Fox; Marty es el personaje; esta ficha es el hombre.

[▶ Filme](${FILME})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFoxPost() {
  const { body, contentEn, contentEs, wiki } = buildFoxBodies();
  return figuraPost({
    title: 'Inspeção: Michael J. Fox — presença, ofício e elo com De Volta para o Futuro',
    titleEn: 'Inspection: Michael J. Fox — presence, craft and link to Back to the Future',
    titleEs: 'Inspección: Michael J. Fox — presencia, oficio y vínculo con Back to the Future',
    excerpt:
      'Pessoas × Artes: Michael J. Fox (Michael Andrew Fox) — timing, skate e coragem de ofício; elo principal em De Volta para o Futuro (1985). Pessoa, não personagem nem ficha de doença.',
    excerptEn:
      'People × Arts: Michael J. Fox (Michael Andrew Fox) — timing, skate and craft; primary link to Back to the Future (1985). The person, not the character or a disease sheet.',
    excerptEs:
      'Personas × Artes: Michael J. Fox (Michael Andrew Fox) — timing, skate y oficio; vínculo en Back to the Future (1985). La persona, no el personaje ni una ficha de enfermedad.',
    slug: 'inspecao-figura-michael-j-fox',
    date: '2026-08-18T05:25:00.000Z',
    seriesOrder: 13,
    seriesLabel: 'Michael J. Fox · pessoa',
    coverImage: 'imagens/inspecoes/michael-j-fox-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildLloydBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Christopher_Lloyd';
  const wikiEn = 'https://en.wikipedia.org/wiki/Christopher_Lloyd';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Christopher Allen Lloyd** (Stamford, Connecticut, 22 de outubro de 1938). Actor americano. O recorte BudGanja **não** é o cabelo branco do Doc: é a **pessoa e o método** — recusar, ler, aceitar, improvisar — com elo principal em [De Volta para o Futuro](${FILME}).

> **Nota metodológica:** auditoria independente. [Wikipédia · Christopher Lloyd](${wiki}), [EN](${wikiEn}). Sem afiliação. Distinto do [Legado](${legado}) canábico. Doc Brown é personagem; **Christopher** é a ficha.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Christopher Allen Lloyd** |
| Nascimento | 22 out. 1938, Stamford, Connecticut, EUA |
| Ofícios | Actor de teatro, televisão e cinema |
| Obra-âncora BudGanja | [De Volta para o Futuro](${FILME}) (1985) — Dr. Emmett Brown |
| Outras marcas | *One Flew Over the Cuckoo's Nest* (teatro) · *Taxi* (Reverend Jim) · *The Addams Family* (Tio Fester) · *Who Framed Roger Rabbit* |
| Tipo BudGanja | Pessoa — presença excêntrica com método |
| Elo principal | [De Volta para o Futuro](${FILME}) |
| Elo Palavras | [gesto](${gesto}) · [criatividade](${criatividade}) · [respeito](${respeito}) |
| Fonte | [Wikipédia](${wiki}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor é o **ofício da presença** — corpo, voz, improviso — não o cartaz do cientista louco.  
**H2:** recusou o papel; leu; a mulher insistiu; aceitou — [caminho](/posts/post-inspecao-palavra-caminho.html) de escolha, não destino.  
**H3:** Einstein e Stokowski são **referências de trabalho**, não biografia roubada.  
**H4:** fecho = [respeito](${respeito}) + [Valeu !!!](${mantra}).

## Quem é (síntese verificável)

- Nasce em Stamford (1938); formação de palco; *One Flew Over the Cuckoo's Nest* no teatro.  
- *Taxi* — Reverend Jim Ignatowski (Emmys, nas fontes).  
- 1985: Doc Brown — Lithgow indisponível; Neil Canton sugere Lloyd (*Buckaroo Banzai*); primeiro **não**; depois sim. Improvisa. «Jigowatts.»  
- Trilogia 1985–1990; Tio Fester; Roger Rabbit (Judge Doom).  
- Longevidade: continua a trabalhar décadas depois — ofício, não nostalgia.

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Recusar e aceitar | Pessoa que escolhe, não mascote |
| Improviso com método | [Criatividade](${criatividade}) ancorada (Einstein / Stokowski) |
| Voz e corpo | [Gesto](${gesto}) grande sem apagar o homem |
| Amizade no ecrã | Artur/Merlin na crítica da época — duas pessoas, dois ofícios |
| Separar | Doc ≠ Christopher |

## Elo com o filme

Abrir [De Volta para o Futuro](${FILME}) para a **obra e o elenco**. Esta ficha se o interesse for o **homem**. Par: [Michael J. Fox](${FOX}).

## Limites

- Não inventaria a filmografia.  
- Sem vida privada inventada.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas com mérito de pessoa especial** — Christopher Lloyd · ofício · [De Volta para o Futuro](${FILME}).

[▶ Pessoas](${hub}) · [▶ o filme](${FILME}) · [▶ Fox](${FOX}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage to **Christopher Allen Lloyd** (b. 22 Oct 1938, Stamford). Craft of presence — not the Doc poster. Anchor: [Back to the Future](${FILME}).

> First refused the role; Einstein / Stokowski as working references. [Wikipedia](${wikiEn}).

## Status

**Approved in People** — Christopher Lloyd; Doc is the character; this sheet is the man.

[▶ Film](${FILME}) · [▶ Fox](${FOX})
`;

  const contentEs = `## Alcance

Homenaje a **Christopher Allen Lloyd** (n. 22 oct. 1938, Stamford). Oficio de presencia — no el cartel del Doc. Ancla: [De Volta para o Futuro](${FILME}).

> Primero rechazó el papel. [Wikipedia](${wiki}).

## Estado

**Aprobado en Personas** — Christopher Lloyd; Doc es el personaje; esta ficha es el hombre.

[▶ Filme](${FILME}) · [▶ Fox](${FOX})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLloydPost() {
  const { body, contentEn, contentEs, wiki } = buildLloydBodies();
  return figuraPost({
    title: 'Inspeção: Christopher Lloyd — presença, improviso e elo com De Volta para o Futuro',
    titleEn: 'Inspection: Christopher Lloyd — presence, improvisation and link to Back to the Future',
    titleEs: 'Inspección: Christopher Lloyd — presencia, improvisación y vínculo con Back to the Future',
    excerpt:
      'Pessoas × Artes: Christopher Lloyd — recusou, leu e inventou o Doc sem se apagar; elo principal em De Volta para o Futuro (1985). Pessoa, não persona.',
    excerptEn:
      'People × Arts: Christopher Lloyd — refused, read, and invented Doc without erasing himself; primary link to Back to the Future (1985). The person, not the persona.',
    excerptEs:
      'Personas × Artes: Christopher Lloyd — rechazó, leyó e inventó a Doc sin apagarse; vínculo en Back to the Future (1985). La persona, no la persona de pantalla.',
    slug: 'inspecao-figura-christopher-lloyd',
    date: '2026-08-18T05:30:00.000Z',
    seriesOrder: 14,
    seriesLabel: 'Christopher Lloyd · pessoa',
    coverImage: 'imagens/inspecoes/christopher-lloyd-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFilmePost: buildFilmePost,
  buildDeVoltaParaOFuturoPost: buildFilmePost,
  buildFoxPost,
  buildMichaelJFoxPost: buildFoxPost,
  buildLloydPost,
  buildChristopherLloydPost: buildLloydPost,
  YT_ID
};
