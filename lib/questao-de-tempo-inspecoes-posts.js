'use strict';

/**
 * Questão de Tempo / About Time (2013) — Artes · cinema
 * + Pessoas: Richard Curtis (destaque para o autor — guião original e realização).
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

const FILME = '/posts/post-inspecao-filme-questao-de-tempo.html';
const AUTOR = '/posts/post-inspecao-figura-richard-curtis.html';
const YT_ID = '7lCDEYXw3mM';

function buildFilmeBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://www.adorocinema.com/filmes/filme-201760/';
  const wikiEnPage = 'https://en.wikipedia.org/wiki/About_Time_(2013_film)';
  const wikiA = '<a href="' + wikiEnPage + '">Wikipedia · About Time (2013)</a>';
  const wikiAShort = '<a href="' + wikiEnPage + '">Wikipedia</a>';
  const wikiAutor = 'https://en.wikipedia.org/wiki/Richard_Curtis';
  const adoro = 'https://www.adorocinema.com/filmes/filme-201760/';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const bttf = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial do filme **«About Time»** — no Brasil, **Questão de Tempo** (**2013**). **Escrito e realizado** por **[Richard Curtis](${AUTOR})**. O **início de tudo** é a **obra de 2013**: guião original, sem romance prévio. O filme **é** a génese. A biografia do autor entra **depois**, na ficha de pessoa — mas o recorte BudGanja desta inspeção é **devolver o crédito ao autor**.

O recorte **não** é física de viagem no tempo nem ficha de elenco: é honrar quem **escreveu** o objecto. Distinto de [De Volta para o Futuro](${bttf}) (homenagem aos actores) e de [The Matrix](${matrix}) (filme primeiro, actor secundário): **aqui o filme existe também para devolver o crédito ao autor**.

> **Nota metodológica:** auditoria independente. Fontes: ${wikiA}, [AdoroCinema](${adoro}), [Richard Curtis](${wikiAutor}), trailer (${yt}). Crédito: Working Title / Universal / Curtis / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção de viagem no tempo ≠ manual.** Não se inventa vida privada. Homónimo: o título BR *Questão de Tempo* também cobriu *A Matter of Time* (1976) — **não** é este filme.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Questão de Tempo** |
| Título original | *About Time* |
| Ano | **2013** (EIFF 27 jun.; Reino Unido 4 set.; EUA 1/8 nov.; Brasil **20 dez.**) |
| Autor / realização | **[Richard Curtis](${AUTOR})** — guião original **e** realização |
| Produção | Tim Bevan · Eric Fellner · Nicky Kentish Barnes |
| Música | **Nick Laird-Clowes** · canções (The Cure, The Killers, Amy Winehouse, Ellie Goulding, entre outras) |
| Fotografia / montagem | John Guleserian · Mark Day |
| Duração | 123 min |
| Produção / distribuição | Working Title Films · Relativity Media · Universal Pictures |
| Orçamento / receita | ~US$ 12 milhões / ~US$ 87–88,5 milhões |
| Tipo BudGanja | Arte — **filme 2013** + **destaque para o autor** |
| Elenco âncora | Domhnall Gleeson (Tim) · Rachel McAdams (Mary) · Bill Nighy (James) · Lydia Wilson · Tom Hollander · Margot Robbie |
| Elo autor | **[Richard Curtis](${AUTOR})** — pessoa; o filme não o substitui |
| Elo Palavras | [tempo](${tempo}) · [passado](${passado}) · [vida](${vida}) · [caminho](${caminho}) · [passar](${passar}) · [sempre](${sempre}) |
| Fonte | ${wikiAShort} · [AdoroCinema](${adoro}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **autor** — Curtis escreve *e* realiza; sem romance prévio, o filme **é** o texto.  
**H2:** a viagem no tempo é **dispositivo**, não tese de física. Curtis: ideia lenta, a partir de um almoço sobre felicidade no dia ordinário; o *time travel* entra porque o tema «parecia simples demais».  
**H3:** o filme é, nas palavras do autor, um **anti-filme de viagem no tempo** — usa o mecanismo sem virar ficção científica de espectáculo.  
**H4:** [tempo](${tempo}) e [vida](${vida}) são o léxico; o [gesto](${gesto}) que o filme pede é viver o dia **uma vez**, como se já fosse a segunda.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor recorte *deste* filme *deste* autor.

## Destaque para o autor — o centro desta ficha

**Richard Whalley Anthony Curtis** (Wellington, 8 nov. 1956). Britânico. Argumentista, produtor, realizador. A ficha de pessoa — ofício da escrita, Comic Relief, método — está em **[Richard Curtis](${AUTOR})**. Aqui: o **autor desta obra**.

Não há livro primeiro. Não há adaptação. Curtis **inventa** Tim, Mary, James, Cornwall e a regra da família. Escreve. Realiza — só o **terceiro** longa como realizador (*Love Actually*, 2003; *The Boat That Rocked*, 2009; este). Disse, à saída, que seria **provavelmente o último** que realizaria; continuaria a escrever. O laboratório trata isso como **facto de ofício**, não como lamento.

A génese, nas fontes: um almoço com um amigo; o tema da felicidade; Curtis admite que não se sente «verdadeiramente feliz»; descreve o dia ideal — e percebe que **aquele** almoço já era esse dia. Decide escrever um filme sobre **como se alcança a felicidade na vida ordinária**. O *time travel* é a camada que torna o simples filmável.

Casas de efeitos tentam espectáculo; Curtis recusa — «simplesmente errado» no tom. Fica o gesto baixo: um sítio escuro, uma intenção, voltar. Sem flux capacitor. Sem 88 mph. A [criatividade](${criatividade}) aqui é **subtrair** máquina.

Zooey Deschanel esteve em conversas para Mary; o papel fica com **Rachel McAdams**. O filme dedica-se a **Richard Griffiths** (ponta sem crédito na peça de Harry — última aparição no ecrã; morre meses antes da estreia). Crédito ao actor; o autor **assinou a dedicatória**.

A ficha de [Richard Curtis](${AUTOR}) é a pessoa. Esta ficha é **o texto que ele escreveu**.

## O início de tudo — génese do filme

Working Title — casa artística de Curtis desde *The Tall Guy* (1989). Estreia no Edinburgh International Film Festival (**27 jun. 2013**); Somerset House / Film4 Summer Screen (**8 ago.**); Reino Unido **4 set.**; EUA **1 nov.** (limitada) e **8 nov.** (geral); Brasil **20 dez. 2013**.

Receita global ~US$ 87–88,5 milhões contra ~US$ 12 milhões. Surpresa na Coreia do Sul: mais de três milhões de espectadores — o maior mercado do filme. Crítica mista a favorável (Rotten Tomatoes ~71%; Metacritic 55). Consenso da RT: «sincero sem vergonha»; Curtis «no seu mais sentimental». Em 2025, leitores do *New York Times* votam-no na edição «Readers' Choice» dos 100 filmes do século XXI (posição 160).

Críticos (Kermode, *Time*, *Independent*) apontam **furos de regra** no *time travel*. O laboratório **regista** a objecção e **não** a resolve: o filme não pede física; pede [gesto](${gesto}). Tratar o furo como falha de manual é ler o objecto errado.

## O que a obra faz (sem spoilers de mecanismo)

Tim Lake, aos 21, ouve do pai que os homens da família podem voltar a momentos **já vividos**. Não mudam a História; mudam a própria [vida](${vida}). Usa o dom para o amor; aprende o custo de [passar](${passar}) de novo por um [passado](${passado}) que já tem filhos, irmã e pai. A tese do autor, no fecho: viver cada dia **uma vez**, como quem já o viveu — notar o mundo, não o rebobinar.

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Voltar ao [passado](${passado}) | Inspecionar o que [passou](${passar}) sem apagar quem nasceu depois |
| Viver o dia duas vezes | Método de atenção — depois, viver **uma** vez com a mesma atenção |
| O pai e o filho | Ofício herdado: o autor escreve o pai que ensina a **não** usar o truque |
| Cornwall / Londres | [Caminho](${caminho}) entre casa e cidade — geografia de gente, não de portal |
| Felicidade ordinária | [Tempo](${tempo}) como kairós do almoço, não como máquina |
| Regras que furam | O filme **não** é tratado de física; o furo não anula a tese |

O laboratório **não** adopta viagem no tempo. Usa o filme como parábola: **o tempo inspeciona-se no dia que se tem; o autor honra-se.**

## Elenco — crédito, não centro

O destaque é o autor. O elenco **tem nome**.

| Pessoa | Papel no ecrã | Nota de ofício |
|--------|---------------|----------------|
| **Domhnall Gleeson** | Tim Lake | Corpo e timing do texto; crítica chamou-lhe «Hugh Grant ruivo» — o laboratório credita o **actor**, não a comparação |
| **Rachel McAdams** | Mary | Química que «mantém o filme no ar» (*Variety*); entra depois das conversas com Deschanel |
| **Bill Nighy** | James Lake | O pai que ensina o método; presença recorrente em Curtis |
| **Lydia Wilson** | Kit Kat | A irmã — o custo familiar do retrato |
| **Lindsay Duncan** | Mary Lake (mãe) | Casa de Cornwall |
| **Tom Hollander** | Harry Chapman | O dramaturgo; a noite da estreia |
| **Margot Robbie** | Charlotte | O «não» que o tempo não desfaz |
| **Richard Cordery** | Tio Desmond | Família da casa |
| **Will Merrick** · **Vanessa Kirby** | Jay · Joanna | Satélites com nome |
| **Richard Griffiths** · **Richard E. Grant** | actores na peça | Griffiths: última aparição; dedicatória do filme |

Pessoa ≠ personagem. Sem fichas Pessoas do elenco neste passo — o par é **[Richard Curtis](${AUTOR})**.

## Elos

| Recurso | Papel |
|---------|-------|
| **[Richard Curtis](${AUTOR})** | Autor — guião e realização; a pessoa é a ficha |
| [tempo](${tempo}) · [vida](${vida}) | Léxico-mãe da obra |
| [passado](${passado}) · [passar](${passar}) · [sempre](${sempre}) | O que se revisita e o que não se absolutiza |
| [caminho](${caminho}) · [gesto](${gesto}) | Cornwall → Londres; o dia vivido uma vez |
| [respeito](${respeito}) | Como se trata o autor e o elenco |
| [De Volta para o Futuro](${bttf}) | Outro filme de [tempo](${tempo}); lá o destaque é o **elenco**; aqui é o **autor** |
| [The Matrix](${matrix}) | Outro filme Artes; hierarquia obra > actor |
| [Faça o melhor!](${mantra}) | O melhor desta homenagem ao texto |

> Abrir primeiro esta ficha se o interesse for o **filme e o autor da obra**. Abrir [Richard Curtis](${AUTOR}) se o interesse for a **pessoa**. Abrir [tempo](${tempo}) se o interesse for a **palavra**.

## Vídeo de referência (embed)

Trailer oficial — Universal Pictures — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | ABOUT TIME - Official Trailer (Universal Pictures) |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **obra**; o destaque ao autor está no texto e na ficha Pessoas |

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese da obra** (filme, livro, canção).  
2. Se o pedido for **destaque para o autor**, creditar quem **escreveu** — sobretudo quando o filme **é** o texto (sem livro prévio).  
3. Separar obra de biografia: filme aqui; pessoa em \`inspecao-figura-…\`.  
4. Declarar tese cultural útil ao laboratório (sem forçar elo canábico).  
5. Slug \`inspecao-filme-…\`.

## Limites

- Não é walkthrough nem física de ficção.  
- Não se inventa vida privada do autor nem do elenco.  
- Furos de regra do *time travel*: facto da crítica — **não** se «corrigem» aqui.  
- Homónimo BR (*A Matter of Time*, 1976): outro objecto.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Artes com destaque para o autor** — *Questão de Tempo* / *About Time* (2013). Obra de [Richard Curtis](${AUTOR}); crédito de gente ao elenco; o centro é quem **escreveu**.

[▶ Artes](${hub}) · [▶ Richard Curtis](${AUTOR}) · [▶ tempo](${tempo}) · [▶ vida](${vida}) · [▶ De Volta para o Futuro](${bttf}) · [▶ Faça o melhor!](${mantra}) · ${wikiAShort}
`;

  const contentEn = `## Scope

Inspection of **About Time** (2013, BR: *Questão de Tempo*). **Written and directed** by **[Richard Curtis](${AUTOR})**. No prior novel: the film **is** the text. BudGanja cut: **credit the author**. Distinct from [Back to the Future](${bttf}) (actor homage).

> Independent audit. ${wikiAShort}. Working Title / Universal — no affiliation. **Time-travel fiction is not a manual.**

## Author (the center)

Curtis invents the story over a lunch about ordinary happiness; time travel is a device because the theme “felt too simple.” He calls it an **anti-time-travel movie**. Third feature as director; he said it would probably be his last as director. Person sheet: [Richard Curtis](${AUTOR}).

## Words

[time](${tempo}) · [life](${vida}) · [past](${passado}) · [path](${caminho})

## Status

**Approved in Arts with author highlight** — 2013 work; Curtis credited as writer/director.

[▶ Curtis](${AUTOR}) · [▶ time](${tempo})
`;

  const contentEs = `## Alcance

Inspección de **About Time** (*Questão de Tempo*, 2013). **Escrito y dirigido** por **[Richard Curtis](${AUTOR})**. Sin novela previa: el filme **es** el texto. Recorte: **crédito al autor**. Distinto de [De Volta para o Futuro](${bttf}) (homenaje a los actores).

> Auditoría independiente. ${wikiAShort}. **La ficción de viaje en el tiempo no es manual.**

## Autor (el centro)

Curtis parte de un almuerzo sobre la felicidad ordinaria; el *time travel* es dispositivo. Lo llama un **anti-filme de viaje en el tiempo**. Ficha de persona: [Richard Curtis](${AUTOR}).

## Estado

**Aprobado en Artes con destaque para el autor.**

[▶ Curtis](${AUTOR}) · [▶ tempo](${tempo})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFilmePost() {
  const { body, contentEn, contentEs, wiki } = buildFilmeBodies();
  return artePost({
    title: 'Inspeção: Questão de Tempo — o filme de 2013 e o destaque para o autor',
    titleEn: 'Inspection: About Time — the 2013 film and the highlight on the author',
    titleEs: 'Inspección: About Time — el filme de 2013 y el destaque para el autor',
    excerpt:
      'Artes · cinema: Questão de Tempo / About Time (2013) — guião e realização de Richard Curtis; sem livro prévio, o filme é o texto. Destaque para o autor; elenco com crédito, não como centro.',
    excerptEn:
      'Arts · film: About Time (2013) — written and directed by Richard Curtis; no prior book, the film is the text. Highlight on the author; cast credited, not centered.',
    excerptEs:
      'Artes · cine: About Time / Questão de Tempo (2013) — guion y dirección de Richard Curtis; sin libro previo, el filme es el texto. Destaque para el autor; elenco con crédito, no como centro.',
    slug: 'inspecao-filme-questao-de-tempo',
    date: '2026-08-18T06:00:00.000Z',
    seriesOrder: 52,
    seriesLabel: 'Questão de Tempo · Artes',
    coverImage: 'imagens/inspecoes/questao-de-tempo-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

function buildCurtisBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Richard_Curtis';
  const wikiEn = 'https://en.wikipedia.org/wiki/Richard_Curtis';
  const comic = 'https://www.comicrelief.com/meet-the-team/richard-curtis/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Richard Whalley Anthony Curtis** (Wellington, Nova Zelândia, 8 de novembro de 1956). Argumentista, produtor e realizador britânico. O recorte BudGanja **não** é a marca «rom-com» nem o cartaz de *Love Actually*: é a **pessoa e o ofício de autor** — escrever o texto, depois (às vezes) realizá-lo — com elo principal em [Questão de Tempo](${FILME}) (2013).

> **Nota metodológica:** auditoria independente. [Wikipédia · Richard Curtis](${wiki}), [EN](${wikiEn}), [Comic Relief](${comic}). Sem afiliação. Distinto do [Legado](${legado}) canábico. *About Time* é obra; **Richard** é a ficha. Sem vida privada inventada.

Tim Lake é personagem. **Curtis** é o autor.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Richard Whalley Anthony Curtis** |
| Nascimento | 8 nov. 1956, Wellington, Nova Zelândia; criado em vários países; Reino Unido desde os 11 anos |
| Nacionalidade | Britânica |
| Ofícios | Argumentista · realizador · produtor · cofundador de Comic Relief |
| Obra-âncora BudGanja | [Questão de Tempo](${FILME}) (2013) — **autor** (guião + realização) |
| Outras marcas (contexto) | *Blackadder* · *Mr. Bean* · *The Vicar of Dibley* · *Four Weddings and a Funeral* · *Notting Hill* · *Love Actually* · *Bridget Jones* · *War Horse* · *Yesterday* |
| Bem público | [Comic Relief](${comic}) (1985, com Lenny Henry) · Make Poverty History · Project Everyone |
| Tipo BudGanja | Pessoa — **método de autor** × Artes |
| Elo principal | [Questão de Tempo](${FILME}) |
| Elo Palavras | [gesto](${gesto}) · [criatividade](${criatividade}) · [respeito](${respeito}) · [tempo](${tempo}) · [vida](${vida}) |
| Par Pessoas | [Jostein Gaarder](${gaarder}) — outro autor; lá o livro é a génese; aqui o **filme é o texto** |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor é o **ofício de escrever** — sketch, sitcom, longa — não o mito do «rei da comédia romântica».  
**H2:** [Questão de Tempo](${FILME}) é o **elo de obra**; a filmografia não se duplica lá.  
**H3:** Comic Relief, Live 8 e Project Everyone são **ofício depois da página** — [caminho](${caminho}) de pessoa, não definição única.  
**H4:** fecho = [respeito](${respeito}) + [Faça o melhor!](${mantra}).

## Quem é (síntese verificável)

- Nasce em Wellington (1956); pai executivo da Unilever (refugiado checoslovaco na Austrália aos 13); infância na Suécia e nas Filipinas; Reino Unido aos 11.  
- Harrow: aprende o ofício de *sketch* na revista da escola. Christ Church, Oxford: *first-class* em English Language and Literature; encontra **Rowan Atkinson** no Experimental Theatre Club.  
- *Not the Nine O'Clock News*; *Spitting Image*; **Blackadder** (único escritor em todos os episódios); *Mr. Bean*; *The Vicar of Dibley* (Dawn French).  
- 1994: *Four Weddings and a Funeral* — nomeação ao Óscar de argumento; Working Title como casa.  
- *Notting Hill* (1999); *Bridget Jones's Diary* (2001, com Helen Fielding); *Love Actually* (2003) — **primeira** realização de longa.  
- 2009: *The Boat That Rocked* (*Pirate Radio* nos EUA) — decepção comercial; reedita.  
- 2011: reescreve *War Horse* para Spielberg.  
- **2013:** escreve e realiza [About Time / Questão de Tempo](${FILME}). Aula de argumento BAFTA/BFI a seguir.  
- 2019: *Yesterday* (Danny Boyle; história partilhada com Jack Barth).  
- 2007: BAFTA Fellowship. 2024: Jean Hersholt Humanitarian Award (Óscar honorário; discurso de Hugh Grant).  
- Comic Relief (1985, após visita à Etiópia); Red Nose Day; Make Poverty History / Live 8; Robin Hood Tax; Make My Money Matter (2020).

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Escrever primeiro | O filme-âncora **é** texto original — autor, não só realizador |
| Subtrair máquina | Em *About Time*, recusa o espectáculo de efeitos — [criatividade](${criatividade}) por corte |
| Dia ordinário | Génese no almoço: felicidade como [gesto](${gesto}) no [tempo](${tempo}) que já se tem |
| Casa Working Title | Ofício longo com a mesma produtora — [caminho](${caminho}), não salto de marca |
| Depois da página | Comic Relief = bem público; **não** substitui a ficha de autor |
| Separar | «Rom-com britânica» ≠ Richard |

## Elo com o filme

Abrir [Questão de Tempo](${FILME}) para a **obra**. Esta ficha se o interesse for o **homem que escreveu**.

## Limites

- Não inventaria a filmografia.  
- Sem vida privada inventada (família, casa, casamento).  
- Comic Relief e campanhas: facto e advocacia — **não** sermão nem ficha de ONG.  
- O curto *No Pressure* (2010, campanha 10:10) e a queixa da British Stammering Association (2011) registam-se como **facto público**, sem centro moralista.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas com mérito de autor** — Richard Curtis · ofício de escrita · elo em [Questão de Tempo](${FILME}).

[▶ Pessoas](${hub}) · [▶ o filme](${FILME}) · [▶ tempo](${tempo}) · [▶ Comic Relief](${comic}) · [▶ Faça o melhor!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage to **Richard Whalley Anthony Curtis** (b. 8 Nov 1956, Wellington). Craft of the **author** — not the rom-com brand. Anchor: [About Time](${FILME}) (2013), which he wrote and directed.

> [Wikipedia](${wikiEn}). Comic Relief (1985, with Lenny Henry) is public craft after the page — not the definition. No invented private life.

## Status

**Approved in People** — Richard Curtis; Tim is the character; this sheet is the author.

[▶ Film](${FILME}) · [▶ Comic Relief](${comic})
`;

  const contentEs = `## Alcance

Homenaje a **Richard Whalley Anthony Curtis** (n. 8 nov. 1956, Wellington). Oficio de **autor** — no la marca rom-com. Ancla: [Questão de Tempo](${FILME}) (2013), que escribió y dirigió.

> [Wikipedia](${wikiEn}). Comic Relief es oficio público después de la página. Sin vida privada inventada.

## Estado

**Aprobado en Personas** — Richard Curtis; Tim es el personaje; esta ficha es el autor.

[▶ Filme](${FILME})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCurtisPost() {
  const { body, contentEn, contentEs, wiki } = buildCurtisBodies();
  return figuraPost({
    title: 'Inspeção: Richard Curtis — o autor, o ofício da escrita e Questão de Tempo',
    titleEn: 'Inspection: Richard Curtis — the author, the craft of writing and About Time',
    titleEs: 'Inspección: Richard Curtis — el autor, el oficio de la escritura y About Time',
    excerpt:
      'Pessoas × Artes: Richard Curtis — argumentista que escreve e realiza Questão de Tempo (2013); o filme é o texto, sem livro prévio. Pessoa e autor, não marca de rom-com.',
    excerptEn:
      'People × Arts: Richard Curtis — screenwriter who writes and directs About Time (2013); the film is the text, no prior book. The person and author, not a rom-com brand.',
    excerptEs:
      'Personas × Artes: Richard Curtis — guionista que escribe y dirige About Time (2013); el filme es el texto, sin libro previo. Persona y autor, no marca de rom-com.',
    slug: 'inspecao-figura-richard-curtis',
    date: '2026-08-18T06:05:00.000Z',
    seriesOrder: 15,
    seriesLabel: 'Richard Curtis · autor',
    coverImage: 'imagens/inspecoes/richard-curtis-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFilmePost,
  buildQuestaoDeTempoPost: buildFilmePost,
  buildCurtisPost,
  buildRichardCurtisPost: buildCurtisPost,
  YT_ID
};
