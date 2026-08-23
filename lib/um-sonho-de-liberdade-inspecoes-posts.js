'use strict';

/**
 * Um Sonho de Liberdade / The Shawshank Redemption (1994) — Artes · cinema
 * Génese: novela Rita Hayworth and Shawshank Redemption (Stephen King, 1982).
 * + Pessoas: Stephen King (autor da novela).
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

const FILME = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
const AUTOR = '/posts/post-inspecao-figura-stephen-king.html';
const YT_ID = '6hB3S9bIacs';

function buildFilmeBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Um_Sonho_de_Liberdade';
  const wikiEn = 'https://en.wikipedia.org/wiki/The_Shawshank_Redemption';
  const wikiNovela = 'https://en.wikipedia.org/wiki/Rita_Hayworth_and_Shawshank_Redemption';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const bttf = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
  const tempo = '/posts/post-inspecao-filme-questao-de-tempo.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial do filme **«The Shawshank Redemption»** — no Brasil, **Um Sonho de Liberdade** (**1994**). Realização e argumento de **Frank Darabont**. O **início de tudo** é a **novela** *Rita Hayworth and Shawshank Redemption*, de **[Stephen King](${AUTOR})**, publicada em **1982** no volume *Different Seasons*. O filme é **adaptação**. A biografia do autor entra **depois**, na ficha de pessoa.

O recorte BudGanja **não** é walkthrough de fuga nem ficha de prisão: é honrar o **texto** e o **ecrã** — King escreve; Darabont adapta e realiza; Robbins e Freeman dão o corpo. Distinto de [Alice](${alice}) (livro primeiro, cinema eco) só no título da URL: **aqui também a literatura vem primeiro**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Um Sonho de Liberdade](${wiki}), [Wikipedia (EN)](${wikiEn}), [novela](${wikiNovela}), trailer (${yt}). Crédito: King / Darabont / Castle Rock / Columbia / elenco — **sem afiliação**. Distinto do [Legado](${legado}) canábico. **Ficção de prisão ≠ manual de crime nem de fuga.** Não se inventa vida privada. Título PT: *Os Condenados de Shawshank*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título BR | **Um Sonho de Liberdade** |
| Título original | *The Shawshank Redemption* (PT: *Os Condenados de Shawshank*) |
| Ano (filme) | **1994** (TIFF 10 set.; EUA 23 set.; Brasil **25 jan. 1995**) |
| Génese | Novela **Rita Hayworth and Shawshank Redemption** — [Stephen King](${AUTOR}), *Different Seasons* (**1982**) |
| Realização / argumento | **Frank Darabont** (adaptação) |
| Produção | Niki Marvin · Castle Rock Entertainment |
| Música / fotografia | **Thomas Newman** · **Roger Deakins** |
| Duração | 142 min |
| Distribuição | Columbia Pictures |
| Orçamento / receita | ~US$ 25 milhões / ~US$ 73,3 milhões (após reposição; a primeira carreira foi um fiasco) |
| Tipo BudGanja | Arte — **novela 1982 primeiro**; filme 1994 como adaptação |
| Elenco âncora | Tim Robbins (Andy) · Morgan Freeman (Red) · Bob Gunton · William Sadler · Clancy Brown · Gil Bellows · James Whitmore |
| Elo autor | **[Stephen King](${AUTOR})** — pessoa; o filme não o substitui |
| Elo Palavras | [esperança](${esperanca}) · [caminho](${caminho}) · [passar](${passar}) · [verdade](${verdade}) · [vida](${vida}) · [respeito](${respeito}) |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) · [novela](${wikiNovela}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **novela de 1982** — King fora do horror, a contar prisão e [esperança](${esperanca}) — e o filme **adapta**, não inventa o objecto.  
**H2:** Darabont compra os direitos por US$ 5 000; King **não desconta** o cheque e devolve-o emoldurado («para fiança»). Ofício de autor que **deixa adaptar**.  
**H3:** a cartaz «Fear can hold you prisoner. Hope can set you free» é tese de ecrã; no laboratório traduz-se por [esperança](${esperanca}) + [gesto](${gesto}), não por conselho jurídico.  
**H4:** Red no livro é irlandês ruivo; no filme é **Morgan Freeman** — adaptação de corpo, não troca de autor.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* novela *deste* filme.

## O início de tudo — a novela (1982)

[Stephen King](${AUTOR}) publica *Different Seasons* (Viking) com quatro novelas «de outra estação»: *Rita Hayworth and Shawshank Redemption*, *Apt Pupil*, *The Body* (depois *Stand by Me*), *The Breathing Method*. King descreve Shawshank como fuga à maneira dos velhos filmes da Warner — **realismo**, não horror.

A voz é **Red**: o homem que consegue coisas. Andy chega condenado; a prisão é corrupta e violenta; o cartaz de Rita Hayworth (depois outras actrizes) esconde o trabalho de anos. King não via longa-metragem nisto; Darabont viu «o óbvio».

A ficha de [Stephen King](${AUTOR}) é a pessoa. Esta ficha é **o texto e a adaptação**.

## A adaptação — génese do filme (1994)

Darabont já tinha adaptado King em *The Woman in the Room* (Dollar Baby, US$ 1, 1983). Em 1987 compra Shawshank por US$ 5 000. Escreve o guião em **oito semanas** (c. 1992). Castle Rock aprova ~US$ 25 milhões. Pré-produção jan. 1993; filmagem jun.–ago. 1993, quase toda em **Mansfield, Ohio** — Ohio State Reformatory no lugar de Shawshank (a história é no Maine).

Nomes cotados para Andy: Tom Hanks, Tom Cruise, Kevin Costner. Fica **Tim Robbins**. Red: Freeman — escolha de ecrã, não de página.

**10 set. 1994**, TIFF. **23 set.**, EUA. Crítica forte; bilheteira inicial ~US$ 16 milhões — título «confuso», género de prisão, concorrência de *Pulp Fiction* e *Forrest Gump*. Sete nomeações ao Óscar (67.ª); zero estatuetas. Reposição + vídeo: maior aluguer VHS de 1995; TNT a partir de 1997; ~US$ 73,3 milhões no total. National Film Registry (**2015**). Décadas depois, continua entre os mais amados do público (IMDb, inquéritos).

## Tese cultural BudGanja

Andy, banqueiro, cumpre duas perpétuas por um crime que diz não ter feito. Red contrabandeia e narra. Duas décadas: biblioteca, cartas ao Estado, música no altifalante (*As Bodas de Fígaro*), o director Norton, o guarda Hadley, Brooks que [passa](${passar}) para fora e não aguenta, Tommy que traz uma [verdade](${verdade}) que a prisão recusa. A fuga é [caminho](${caminho}) de anos, não truque. Zihuatanejo é o nome do lado de fora.

| Tema na obra | Tradução editorial |
|--------------|-------------------|
| [Esperança](${esperanca}) | O que Andy guarda e Red aprende a nomear — não optimismo oco |
| Prisão / instituição | O sítio que define a pessoa se ela deixar — [respeito](${respeito}) de gente, não de uniforme |
| Cartaz / cinema | O ecrã **dentro** do ecrã: Rita Hayworth, *Gilda* — a arte como buraco e como [gesto](${gesto}) |
| Biblioteca / cartas | [Criatividade](${criatividade}) administrativa: persistir até o Estado mandar livros |
| Brooks | Sair sem [caminho](${caminho}) interior — liberdade formal ≠ [vida](${vida}) |
| «Get busy living or get busy dying» | Escolha de ofício — [Valeu !!!](${mantra}) com o dia que resta |
| Zihuatanejo / praia | Paraíso narrativo — **não** é protocolo de fuga nem destino turístico do laboratório |

O laboratório **não** ensina a cavar, a lavar dinheiro nem a violar liberdade condicional. Usa a obra como parábola: **a esperança inspecciona-se no gesto longo; o autor honra-se.**

## Elenco — crédito, não centro

O centro é a novela + o filme. O elenco **tem nome**.

| Pessoa | Papel no ecrã | Nota de ofício |
|--------|---------------|----------------|
| **Tim Robbins** | Andy Dufresne | O corpo do texto de King no ecrã de Darabont |
| **Morgan Freeman** | Ellis Boyd «Red» Redding | Narrador do filme; no livro, Red é irlandês — adaptação declarada |
| **Bob Gunton** | Warden Samuel Norton | A lei que se faz a si própria |
| **Clancy Brown** | Capt. Byron Hadley | A violência do uniforme |
| **William Sadler** | Heywood | A turma longa |
| **Gil Bellows** | Tommy Williams | Quem traz a [verdade](${verdade}) |
| **James Whitmore** | Brooks Hatlen | O bibliotecário que sai e não cabe |
| **Mark Rolston** | Bogs Diamond | A gangue — crédito sem glória da violência |

Pessoa ≠ personagem. Sem fichas Pessoas do elenco neste passo — o par é **[Stephen King](${AUTOR})**.

## Elos

| Recurso | Papel |
|---------|-------|
| **[Stephen King](${AUTOR})** | Autor da novela — a pessoa é a ficha |
| [esperança](${esperanca}) | Léxico-mãe do cartaz e do fecho |
| [caminho](${caminho}) · [passar](${passar}) | Os anos, o túnel, a liberdade condicional, o México |
| [verdade](${verdade}) · [vida](${vida}) | O que Tommy diz; o que Brooks não aguenta; o que Red escolhe |
| [respeito](${respeito}) · [gesto](${gesto}) | Como se trata autor, adaptação e elenco |
| [Alice](${alice}) | Outra ficha Artes com **literatura primeiro** |
| [De Volta para o Futuro](${bttf}) · [Questão de Tempo](${tempo}) | Outros filmes; hierarquias diferentes (elenco / autor de guião) |
| [Valeu !!!](${mantra}) | O melhor desta adaptação creditada |

> Abrir primeiro esta ficha se o interesse for a **novela e o filme**. Abrir [Stephen King](${AUTOR}) se o interesse for o **autor**. Abrir [esperança](${esperanca}) se o interesse for a **palavra**.

## Vídeo de referência (embed)

Trailer clássico do filme de 1994 — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | The Shawshank Redemption (1994) Trailer |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **adaptação**; a génese é a novela de 1982 |

## Como repetir o método

1. Quando houver livro/novela + filme, **priorizar a origem literária**.  
2. Declarar tese a partir do texto; o ecrã como secção de adaptação.  
3. Separar autor (Pessoas) de obra (Artes).  
4. Tratar prisão e fuga como **ficção**, não como protocolo.  
5. Slug \`inspecao-filme-…\` (URL estável; conteúdo = literatura primeiro).

## Limites

- Não é walkthrough, guia de fuga nem manual jurídico.  
- Violência sexual e institucional no enredo: **facto da obra** — sem reprodução nem morbo.  
- Não se inventa vida privada de King, Darabont ou elenco.  
- Interpretações cristãs / nietzschianas / sartrianas: **leituras** da crítica, não dogma do laboratório.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Artes** — *Um Sonho de Liberdade* (1994) como adaptação da novela de [Stephen King](${AUTOR}) (1982). Literatura primeiro; ecrã creditado; elenco com nome.

[▶ Artes](${hub}) · [▶ Stephen King](${AUTOR}) · [▶ esperança](${esperanca}) · [▶ caminho](${caminho}) · [▶ Alice](${alice}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **The Shawshank Redemption** (1994, BR: *Um Sonho de Liberdade*). Written and directed by **Frank Darabont**. The **origin** is Stephen King’s 1982 novella *Rita Hayworth and Shawshank Redemption* (*Different Seasons*). The film is an **adaptation**. Person sheet: [Stephen King](${AUTOR}).

> Independent audit. [Wikipedia](${wikiEn}). Castle Rock / Columbia — no affiliation. **Prison fiction is not a crime or escape manual.**

## Genesis

King writes outside horror. Darabont buys the rights for $5,000; King never cashes the check (frames it: “bail money”). Filmed at the Ohio State Reformatory (Mansfield), story set in Maine. Initial box-office flop; later beloved; National Film Registry 2015.

## Words

[hope](${esperanca}) · [path](${caminho}) · [truth](${verdade}) · [life](${vida})

## Status

**Approved in Arts** — 1982 novella first; 1994 film as credited adaptation.

[▶ King](${AUTOR}) · [▶ hope](${esperanca})
`;

  const contentEs = `## Alcance

Inspección de **The Shawshank Redemption** (*Um Sonho de Liberdade*, 1994). Guion y dirección de **Frank Darabont**. El **origen** es la novela de Stephen King (1982) *Rita Hayworth and Shawshank Redemption*. El filme es **adaptación**. Ficha: [Stephen King](${AUTOR}).

> Auditoría independiente. [Wikipedia](${wiki}). **La ficción de prisión no es manual.**

## Génesis

King escribe fuera del horror. Darabont compra los derechos por 5 000 dólares; King no cobra el cheque. Rodaje en Mansfield, Ohio. Fracaso inicial de taquilla; después, obra amada.

## Estado

**Aprobado en Artes** — novela 1982 primero; filme 1994 como adaptación.

[▶ King](${AUTOR}) · [▶ esperança](${esperanca})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFilmePost() {
  const { body, contentEn, contentEs, wiki } = buildFilmeBodies();
  return artePost({
    title: 'Inspeção: Um Sonho de Liberdade — a novela de King e o filme de 1994',
    titleEn: 'Inspection: The Shawshank Redemption — King’s novella and the 1994 film',
    titleEs: 'Inspección: Cadena perpetua — la novela de King y el filme de 1994',
    excerpt:
      'Artes · cinema: Um Sonho de Liberdade / The Shawshank Redemption (1994, Darabont) — génese na novela de Stephen King (1982); o filme é adaptação. Autor em Pessoas; elenco com crédito.',
    excerptEn:
      'Arts · film: The Shawshank Redemption (1994, Darabont) — origin in Stephen King’s 1982 novella; the film is an adaptation. Author in People; cast credited.',
    excerptEs:
      'Artes · cine: The Shawshank Redemption / Um Sonho de Liberdade (1994, Darabont) — origen en la novela de Stephen King (1982); el filme es adaptación. Autor en Personas; elenco con crédito.',
    slug: 'inspecao-filme-um-sonho-de-liberdade',
    date: '2026-08-18T06:30:00.000Z',
    seriesOrder: 53,
    seriesLabel: 'Um Sonho de Liberdade · Artes',
    coverImage: 'imagens/inspecoes/um-sonho-de-liberdade-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

function buildKingBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Stephen_King';
  const wikiEn = 'https://en.wikipedia.org/wiki/Stephen_King';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const curtis = '/posts/post-inspecao-figura-richard-curtis.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Stephen Edwin King** (Portland, Maine, 21 de setembro de 1947). Escritor americano. O recorte BudGanja **não** é o cartaz de horror nem o inventário de adaptações: é a **pessoa e o ofício de autor** — escrever fora da marca que o tornou famoso — com elo principal na novela que gera [Um Sonho de Liberdade](${FILME}) (1982 → 1994).

> **Nota metodológica:** auditoria independente. [Wikipédia · Stephen King](${wiki}), [EN](${wikiEn}). Sem afiliação. Distinto do [Legado](${legado}) canábico. Andy e Red são personagens; **King** é a ficha. Sem vida privada inventada.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Stephen Edwin King** |
| Nascimento | 21 set. 1947, Portland, Maine, EUA |
| Ofícios | Escritor · argumentista ocasional |
| Obra-âncora BudGanja | *Rita Hayworth and Shawshank Redemption* (1982) → [Um Sonho de Liberdade](${FILME}) |
| Outras marcas (contexto) | *Carrie* · *The Shining* · *The Body* / *Stand by Me* · *Misery* · *The Green Mile* · *On Writing* · heterónimo Richard Bachman |
| Tipo BudGanja | Pessoa — **método de autor** × Artes |
| Elo principal | [Um Sonho de Liberdade](${FILME}) |
| Elo Palavras | [esperança](${esperanca}) · [criatividade](${criatividade}) · [respeito](${respeito}) · [caminho](${caminho}) · [vida](${vida}) |
| Par Pessoas | [Jostein Gaarder](${gaarder}) · [Richard Curtis](${curtis}) — outros autores; cá a génese é **novela**, não filme original |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor é o **ofício de escrever** — inclusive quando o público pede só horror. *Different Seasons* é o [gesto](${gesto}) de mudar de estação.  
**H2:** [Um Sonho de Liberdade](${FILME}) é o **elo de obra**; a filmografia kingiana não se duplica lá.  
**H3:** o Dollar Baby (US$ 1 a estudantes) e o cheque de US$ 5 000 que King **não desconta** são ofício de autor que **deixa o texto ir** — [caminho](${caminho}), não posse.  
**H4:** fecho = [respeito](${respeito}) + [Valeu !!!](${mantra}).

## Quem é (síntese verificável)

- Nasce em Portland (1947); pais separam-se cedo; volta ao Maine aos 11.  
- University of Maine (Orono), 1970 — inglês e certificado de professor; escreve no jornal da casa.  
- 1971: casa com a escritora Tabitha Spruce (facto público de ofício partilhado).  
- *Carrie* (1974) — estreia que o marca como horror.  
- **1982:** *Different Seasons* — quatro novelas; Shawshank, *The Body*, *Apt Pupil*, *The Breathing Method*.  
- Heterónimo **Richard Bachman**; ensaio *Danse Macabre* (1981); *On Writing* (2000) — ofício declarado.  
- Adaptações (contexto, não fichas): *Carrie*, *The Shining*, *Stand by Me*, *Misery*, *The Green Mile*, *It*…  
- Dollar Baby: cede contos a cineastas novos por US$ 1 (programa encerrado em 2023, nas fontes). Darabont começa aí (*The Woman in the Room*) e depois compra Shawshank.

## O ofício que interessa ao BudGanja

| Traço | Tradução |
|-------|----------|
| Escrever fora da marca | Horror famoso; Shawshank é **realismo** — [criatividade](${criatividade}) de recorte |
| Deixar adaptar | Dollar Baby + cheque emoldurado — o texto parte sem o autor o reter |
| Voz de Red | A novela é de quem **conta**; o filme muda o corpo, não o ofício de narrar |
| Maine | Geografia de trabalho — Castle Rock, Shawshank — [caminho](${caminho}) de sítio |
| *On Writing* | Método declarado — sem transformar esta ficha em manual de oficina |
| Separar | «O rei do horror» ≠ Stephen |

## Elo com a obra

Abrir [Um Sonho de Liberdade](${FILME}) para a **novela e o filme**. Esta ficha se o interesse for o **homem que escreveu**.

## Limites

- Não inventaria a obra completa nem as adaptações.  
- Sem vida privada inventada (família, saúde, acidente).  
- Dollar Baby: facto de ofício — **não** convite a violar direitos.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Pessoas com mérito de autor** — Stephen King · ofício de escrita · elo em [Um Sonho de Liberdade](${FILME}).

[▶ Pessoas](${hub}) · [▶ o filme](${FILME}) · [▶ esperança](${esperanca}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage to **Stephen Edwin King** (b. 21 Sep 1947, Portland, Maine). Craft of the **author** — not the horror brand. Anchor: the 1982 novella behind [The Shawshank Redemption](${FILME}).

> [Wikipedia](${wikiEn}). Dollar Baby and the uncashed $5,000 check are craft of letting the text go. No invented private life.

## Status

**Approved in People** — Stephen King; Andy and Red are characters; this sheet is the author.

[▶ Film](${FILME})
`;

  const contentEs = `## Alcance

Homenaje a **Stephen Edwin King** (n. 21 sep. 1947, Portland, Maine). Oficio de **autor** — no la marca de terror. Ancla: la novela de 1982 detrás de [Um Sonho de Liberdade](${FILME}).

> [Wikipedia](${wikiEn}). Sin vida privada inventada.

## Estado

**Aprobado en Personas** — Stephen King; Andy y Red son personajes; esta ficha es el autor.

[▶ Filme](${FILME})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildKingPost() {
  const { body, contentEn, contentEs, wiki } = buildKingBodies();
  return figuraPost({
    title: 'Inspeção: Stephen King — o autor, a novela e Um Sonho de Liberdade',
    titleEn: 'Inspection: Stephen King — the author, the novella and The Shawshank Redemption',
    titleEs: 'Inspección: Stephen King — el autor, la novela y Cadena perpetua',
    excerpt:
      'Pessoas × Artes: Stephen King — autor de Rita Hayworth and Shawshank Redemption (1982); elo em Um Sonho de Liberdade (1994). Pessoa e autor, não marca de horror.',
    excerptEn:
      'People × Arts: Stephen King — author of Rita Hayworth and Shawshank Redemption (1982); link to The Shawshank Redemption (1994). The person and author, not a horror brand.',
    excerptEs:
      'Personas × Artes: Stephen King — autor de Rita Hayworth and Shawshank Redemption (1982); vínculo en Um Sonho de Liberdade (1994). Persona y autor, no marca de terror.',
    slug: 'inspecao-figura-stephen-king',
    date: '2026-08-18T06:35:00.000Z',
    seriesOrder: 16,
    seriesLabel: 'Stephen King · autor',
    coverImage: 'imagens/inspecoes/stephen-king-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFilmePost,
  buildUmSonhoDeLiberdadePost: buildFilmePost,
  buildKingPost,
  buildStephenKingPost: buildKingPost,
  YT_ID
};
