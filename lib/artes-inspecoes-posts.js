'use strict';

/**
 * Inspeções «Artes»: filmes, séries, música, artes visuais e obras culturais
 * ligadas a plantas, linguagem ou ao ecossistema inspecionado.
 * Série: artes-cultura — tipagem no hub → 'arte'.
 *
 * Método (padrão Alice): **origem primeiro** (génese da obra) →
 * tese cultural → uso no laboratório / adaptação / elenco como secção secundária —
 * sem confundir com Canais (YouTube) nem com biografia em Pessoas.
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

function buildSendMeOnMyWayBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const radio = '/radio/';
  const wiki = 'https://en.wikipedia.org/wiki/Send_Me_On_My_Way';
  const ytId = 'IGMabBGydC0';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const vevo = 'https://www.youtube.com/@RustedRootVEVO';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';

  const body = `## Escopo

Inspeção editorial da canção **«Send Me On My Way»** (Rusted Root). O **início de tudo** é a **obra musical**: versão bruta em *Cruel Sun* (1992), single remisturado em *When I Woke* (1994) e memória cultural nos anos 90. O uso na [BudGanja Radio](${radio}) entra **depois**, como **eco funcional** no laboratório — não como origem da canção.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipedia · Send Me On My Way](${wiki}); videoclipe [RustedRootVEVO](${yt}). Crédito da obra: Rusted Root / editores (Mercury/PolyGram). Sem afiliação. **Não confundir** com Canais (YouTube) nem com a ficha [Chorão](${chorao}) (biografia); a segunda faixa da rádio tem ficha própria: [Só os Loucos Sabem](${loucos}).

Esta ficha é a **fundadora** da série **Artes**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Send Me On My Way** |
| Artista | Rusted Root (banda worldbeat de Pittsburgh) |
| Meio | Canção / single (worldbeat · alternative / folk-rock) |
| Génese estúdio | *Cruel Sun* (1992) — versão inicial |
| Álbum âncora | *When I Woke* (1994) — single remisturado |
| Single | 1994 (pico Billboard Hot 100: #72 em 1995) |
| Autoria (créditos públicos) | Michael Glabicki + membros da banda |
| Produtores | Dave Brown (*Cruel Sun*) · Bill Bottrell (*When I Woke*) |
| Tipo BudGanja | Arte — **canção primeiro**; rádio como adaptação no site |
| Elo Palavras | [passar](${passar}) — viagem / «envie-me no meu caminho» |
| Elo laboratório (secundário) | [BudGanja Radio](${radio}) — faixa de boas-vindas |
| Faixa companheira na rádio | [Só os Loucos Sabem](${loucos}) (Charlie Brown Jr.) · biografia em [Chorão](${chorao}) |
| Fonte de partida | [Wikipedia · Send Me On My Way](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese da canção** (1992→1994) — Pittsburgh, worldbeat, optimismo de caminho — antes de qualquer uso no player.  
**H2:** a letra e o imaginário de partida cruzam com a série [Palavras](${palavras}) via [passar](${passar}) — elo metodológico, não etimológico inglês→português.  
**H3:** a presença em cinema/TV (*Matilda*, *Ice Age*, etc.) e o wake-up da NASA/Opportunity (Sol 21) explicam a **memória colectiva**; o laboratório **não** replica essa filmografia — só a regista como afterlife cultural.

Passos:

1. Fixar a **origem da canção** (datas, álbuns, créditos, produtores).  
2. Declarar a tese cultural a partir da **obra**.  
3. Só depois situar uso no site (aqui: abertura da rádio).  
4. Separar obra de biografia e de canal YouTube.  
5. Status + fila.

## O início de tudo — génese da canção

Fonte: [Wikipedia · Send Me On My Way](${wiki}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1992** | Versão inicial em *Cruel Sun* — banda worldbeat de **Pittsburgh**; tom de caminho e partida já presente. |
| Autoria | **Michael Glabicki** (voz, guitarra) + créditos da formação Rusted Root. |
| Produção | **Dave Brown** (*Cruel Sun*) · **Bill Bottrell** (*When I Woke* — remistura que leva ao single). |
| **1994** | Single remisturado em *When I Woke* (Mercury/PolyGram) — versão que entra na memória mainstream. |
| **1995** | Pico **Billboard Hot 100 #72** — confirmação comercial da faixa. |
| Videoclipe | **Sean Alquist**, filmado nos **Badlands da Dakota do Sul** (finais de 1994); remaster HD no [VEVO](${yt}). |
| Afterlife cultural | *Matilda*, *Ice Age*, anúncios; wake-up music da **NASA Opportunity Sol 21** — **memória**, não origem de laboratório. |

> **Hierarquia BudGanja:** sem *Cruel Sun* (1992) e *When I Woke* (1994), não há canção a inspecionar. A rádio do site é descendente.

## A obra (síntese)

- Worldbeat / rock alternativo dos anos 90; single de *When I Woke* com produção de Bill Bottrell.  
- Tom: optimismo e caminho — «envie-me no meu caminho»; refrão de partida que a cultura reutilizou em cinema e ciência.  
- Videoclipe icónico nos Badlands; versão VEVO como referência audiovisual da **obra**, não do canal como objecto principal.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Caminho / partida | Entrar na investigação; aceitar a viagem para ver o terreno |
| «Send me on my way» | Convite à travessia — ver [passar](${passar}) |
| Optimismo de estrada | Método com direcção, não cápsula confortável |
| Afterlife (*Matilda*, NASA) | Memória colectiva — **não** protocolo do laboratório |

O laboratório **não** adopta a banda como cosmologia: usa a **canção** como parábola de caminho metódico — a inspeção parte; a simulação fica.

## Uso no laboratório — abertura da casa

O site **não** substitui a origem. Regista-se aqui o eco funcional na [BudGanja Radio](${radio}).

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Player | Mini-player global + página da rádio |
| Critério de selecção | Título contém *Rusted Root* + *Send Me On My Way* (\`findWelcomeIndex\`) |
| Momento | Sessão fresca ao abrir o site (browser pode exigir 1.º clique) |
| Playlist | \`radio/playlist.json\` — MP3 local da faixa VEVO |
| Papel nesta inspeção | **Adaptação no laboratório** — boas-vindas, não génese da obra |

> A segunda faixa da casa é [Só os Loucos Sabem](${loucos}); a biografia do letrista fica em [Chorão](${chorao}).

## Elo com Palavras

A canção é um convite à **partida** e ao **caminho**. No hub BudGanja, isso conversa com [passar](${passar}): travessia, o que se passa e o tempo que passa — sem forçar tradução literal do título inglês.

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | Rusted Root — Send Me On My Way (Official Music Video) |
| Canal | RustedRootVEVO |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **obra**; a fonte âncora continua a ser a [canção](${wiki}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pela **génese** (1992/1994); só depois ouvir na [BudGanja Radio](${radio}).  
- Cruzar com [passar](${passar}), [Só os Loucos Sabem](${loucos}) e [Chorão](${chorao}).  
- Hub [Artes](${hub}) — fila de filmes/séries/outras obras.

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese da obra** (canção, livro, filme) antes do uso no laboratório ou biografia de elenco.  
2. Fixar créditos, datas e fonte pública.  
3. Declarar tese cultural a partir da **obra**.  
4. Só depois situar uso no site (rádio, capa, citação) ou elos a Pessoas/Palavras.  
5. Publicar com slug \`inspecao-arte-…\` / \`inspecao-filme-…\` / \`inspecao-serie-…\`.

## Status

**Aprovado como ficha fundadora Artes** — *Send Me On My Way* documentada com a **génese Rusted Root (1992/1994)** como início de tudo; BudGanja Radio como eco funcional; elos a [passar](${passar}) e à faixa CBJr da mesma playlist.
`;

  const contentEn = `## Scope

Editorial inspection of **"Send Me On My Way"** (Rusted Root). The **beginning of everything** is the **song**: rough version on *Cruel Sun* (1992), remixed lead single on *When I Woke* (1994). Use on [BudGanja Radio](${radio}) follows as a **functional echo** in the lab — not the song’s origin.

> **Method note:** independent audit. Anchor source: [Wikipedia · Send Me On My Way](${wiki}); official video [RustedRootVEVO](${yt}). Credit: Rusted Root / rights holders. No affiliation. **Do not confuse** with Channel inspections or the [Chorão](${chorao}) sheet.

Founding sheet of the **Arts** series.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Send Me On My Way** |
| Artist | Rusted Root (Pittsburgh worldbeat band) |
| Studio genesis | *Cruel Sun* (1992) |
| Anchor album | *When I Woke* (1994) — remixed single |
| Single peak | Billboard Hot 100 #72 (1995) |
| Writers / producers | Michael Glabicki + band · Dave Brown / Bill Bottrell |
| BudGanja type | Art — **song first**; radio as site adaptation |
| Words link | [passar](${passar}) |
| Lab link (secondary) | [BudGanja Radio](${radio}) |
| Date | ${inspected} |

## Origin of the song (core)

| Milestone | Note |
|-----------|------|
| **1992** | Initial version on *Cruel Sun* — Pittsburgh worldbeat band. |
| **1994** | Remixed lead single on *When I Woke* (Mercury/PolyGram). |
| **1995** | Billboard Hot 100 peak **#72**. |
| Video | **Sean Alquist**, South Dakota Badlands (late 1994). |
| Cultural afterlife | *Matilda*, *Ice Age*, NASA Opportunity Sol 21 wake-up — **memory**, not lab origin. |

**Hierarchy:** without 1992–1994 there is no song to inspect. Site radio is descendant.

## Lab thesis

Path / departure imagery crosses [Words](${palavras}) via [passar](${passar}). Afterlife in film and science is collective memory — the lab does not replicate that filmography.

## Lab use (secondary)

Welcome track via \`findWelcomeIndex\` in \`radio/playlist.json\` — functional echo, not genesis.

@youtube ${ytId}

## Status

**Approved as founding Arts sheet** — Rusted Root genesis (1992/1994) as the start of everything; BudGanja Radio as functional echo.
`;

  const contentEs = `## Alcance

Inspección editorial de **«Send Me On My Way»** (Rusted Root). El **inicio de todo** es la **canción**: versión en *Cruel Sun* (1992), single remezclado en *When I Woke* (1994). El uso en [BudGanja Radio](${radio}) entra **después**, como **eco funcional** — no como origen.

> **Nota metodológica:** auditoría independiente. Fuente ancla: [Wikipedia · Send Me On My Way](${wiki}); videoclip [RustedRootVEVO](${yt}). Crédito: Rusted Root / editores. Sin afiliación.

Ficha fundadora de la serie **Artes**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Send Me On My Way** |
| Artista | Rusted Root (banda worldbeat de Pittsburgh) |
| Génesis estudio | *Cruel Sun* (1992) |
| Álbum ancla | *When I Woke* (1994) |
| Pico single | Billboard Hot 100 #72 (1995) |
| Tipo BudGanja | Arte — **canción primero**; radio como adaptación |
| Palabras | [passar](${passar}) |
| Laboratorio (secundario) | [BudGanja Radio](${radio}) |
| Fecha | ${inspected} |

## Origen de la canción (núcleo)

| Hito | Nota |
|------|------|
| **1992** | Versión inicial en *Cruel Sun* — banda worldbeat de Pittsburgh. |
| **1994** | Single remezclado en *When I Woke* (Mercury/PolyGram). |
| **1995** | Pico Billboard Hot 100 **#72**. |
| Videoclip | **Sean Alquist**, Badlands de Dakota del Sur (finales de 1994). |
| Afterlife cultural | *Matilda*, *Ice Age*, wake-up NASA Opportunity Sol 21 — **memoria**, no origen de laboratorio. |

**Jerarquía:** sin 1992–1994 no hay canción que inspeccionar. La radio del sitio es descendiente.

## Uso en el laboratorio (secundario)

Pista de bienvenida vía \`findWelcomeIndex\` — eco funcional, no génesis.

@youtube ${ytId}

## Estado

**Aprobada como ficha fundadora Artes** — génesis Rusted Root (1992/1994) como inicio de todo; BudGanja Radio como eco funcional.
`;

  return { body, contentEn, contentEs, ytId, vevo, wiki };
}

function buildSendMeOnMyWayPost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildSendMeOnMyWayBodies();
  return artePost({
    title: 'Inspeção: Send Me On My Way — a canção Rusted Root e o caminho',
    titleEn: 'Inspection: Send Me On My Way — the Rusted Root song and the path',
    titleEs: 'Inspección: Send Me On My Way — la canción de Rusted Root y el camino',
    excerpt:
      'Ficha fundadora Artes: Send Me On My Way começa na génese Rusted Root (1992 *Cruel Sun*, 1994 *When I Woke*, Hot 100 #72) — caminho e optimismo; BudGanja Radio como eco secundário de abertura da casa.',
    excerptEn:
      'Founding Arts sheet: Send Me On My Way begins with Rusted Root’s genesis (1992 *Cruel Sun*, 1994 *When I Woke*, Hot 100 #72) — path and optimism; BudGanja Radio as secondary house-opening echo.',
    excerptEs:
      'Ficha fundadora Artes: Send Me On My Way empieza en la génesis de Rusted Root (1992 *Cruel Sun*, 1994 *When I Woke*, Hot 100 #72) — camino y optimismo; BudGanja Radio como eco secundario de apertura de la casa.',
    slug: 'inspecao-arte-send-me-on-my-way',
    date: '2026-08-01T14:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Send Me On My Way · Artes',
    coverImage: 'imagens/inspecoes/send-me-on-my-way-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

function buildSoOsLoucosSabemBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const radio = '/radio/';
  const wikiAlbum = 'https://pt.wikipedia.org/wiki/Chegou_Quem_Faltava';
  const wikiCamisa = 'https://pt.wikipedia.org/wiki/Camisa_10_Joga_Bola_At%C3%A9_na_Chuva';
  const ytId = 'NFADwNLNSd4';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const vevo = 'https://www.youtube.com/@charliebrownjrVEVO';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';

  const body = `## Escopo

Inspeção editorial da canção **«Só os Loucos Sabem»** (Charlie Brown Jr.). O **início de tudo** é a **obra de estúdio** no álbum *[Camisa 10 Joga Bola Até na Chuva](${wikiCamisa})* (**2009**) — créditos Chorão / Thiago Castanho, repertório CBJr dos 2000/2010. A versão **ao vivo** (*Chegou Quem Faltava*, 2011/2021) e o uso na [BudGanja Radio](${radio}) entram **depois**, como **adaptação** no laboratório — não como origem da canção.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · Camisa 10 Joga Bola Até na Chuva](${wikiCamisa}); complementar [Chegou Quem Faltava](${wikiAlbum}), videoclipe [charliebrownjrVEVO](${yt}). Crédito da obra: Charlie Brown Jr. / Sony Music. Sem afiliação. **Não romantiza overdose nem dependência.** Distinto de Canais (YouTube) e da ficha Pessoas. A biografia do letrista fica em [Chorão](${chorao}) — referência apenas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Só os Loucos Sabem** |
| Artista | Charlie Brown Jr. |
| Meio | Canção · rock brasileiro |
| Génese (estúdio) | *Camisa 10 Joga Bola Até na Chuva* (**2009**) — [wiki](${wikiCamisa}) |
| Autoria citada | **Chorão** / **Thiago Castanho** (créditos públicos) |
| Adaptação ao vivo | Citibank Hall, SP — **19 mar. 2011**; álbum póstumo *[Chegou Quem Faltava](${wikiAlbum})* (2021) |
| Formação no show | Chorão, Thiago Castanho, Heitor Gomes, Bruno Graveto |
| Tipo BudGanja | Arte — **canção primeiro**; rádio como adaptação no site |
| Elo Pessoas (referência) | [Chorão](${chorao}) — letrista (biografia; não duplicar aqui) |
| Elo Artes (par) | [Send Me On My Way](${sendMe}) — abertura da casa |
| Elo Palavras | [maconha](${maconha}) — via cultura da letra / [Palavras](${palavras}) |
| Elo laboratório (secundário) | [BudGanja Radio](${radio}) — faixa 2 da playlist (versão ao vivo) |
| Fonte de partida | [Wikipédia · Camisa 10 Joga Bola Até na Chuva](${wikiCamisa}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese de estúdio** (2009) — recomeço, paz, memória entre irmãos — antes de qualquer versão ao vivo ou playlist.  
**H2:** a versão **ao vivo** (2011/2021) é o objecto concreto da rádio — memória de palco com Chorão — mas **descende** do single de estúdio.  
**H3:** a biografia e o método da letra ficam em [Chorão](${chorao}) / [Palavras](${palavras}); aqui inspeciona-se a **canção como obra**.

Passos:

1. Fixar a **origem de estúdio** (álbum, ano, créditos).  
2. Declarar a tese cultural a partir da **obra**.  
3. Só depois situar adaptação ao vivo e uso na [BudGanja Radio](${radio}).  
4. Ligar a Pessoas só por referência (sem repetir biografia).  
5. Status.

## O início de tudo — génese da canção

Fonte: [Wikipédia · Camisa 10 Joga Bola Até na Chuva](${wikiCamisa}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **2009** | Lançamento do álbum de estúdio *Camisa 10 Joga Bola Até na Chuva* — **origem** de «Só os Loucos Sabem» no repertório CBJr. |
| Autoria | **Chorão** (letra) · **Thiago Castanho** (música) — créditos públicos do single. |
| Contexto | Rock brasileiro dos 2000/2010; tom de recomeço e paz no refrão. |
| **19 mar. 2011** | Show ao vivo no **Citibank Hall** (São Paulo) — gravação que circula como versão de palco. |
| **2021** | Álbum póstumo *[Chegou Quem Faltava](${wikiAlbum})* — lançamento da gravação ao vivo (Sony / herdeiros). |
| Formação no show | Chorão, Thiago Castanho, Heitor Gomes, Bruno Graveto — formação Camisa 10. |

> **Hierarquia BudGanja:** sem *Camisa 10…* (2009), não há canção a inspecionar. O ao vivo e a rádio são descendentes.

## A obra (síntese)

- Canção do repertório CBJr; **origem em estúdio** em *Camisa 10…* (2009).  
- Refrão de rock brasileiro: recomeço, paz, memória entre irmãos — «só os loucos sabem».  
- A versão ao vivo (2011/2021) amplifica a memória de palco com Chorão; na casa, é essa gravação que entra na playlist — mas **não** substitui a génese de estúdio.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Recomeço | Entrar de novo na investigação após queda |
| «Só os loucos sabem» | Coragem de ver o que outros não inspeccionam |
| Paz / memória | Método com calma, não romantização de dependência |
| Ao vivo vs estúdio | Adaptação de palco — **eco**, não origem |

O laboratório **não** adopta a biografia do letrista como cosmologia: usa a **canção** como parábola de recomeço metódico — a inspeção recomeça; a biografia fica em Pessoas.

## Uso no laboratório — segunda faixa da casa

O site **não** substitui a origem. Regista-se aqui a **adaptação** na [BudGanja Radio](${radio}) — versão ao vivo alinhada a *Chegou Quem Faltava*.

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Posição | Segunda faixa do catálogo \`radio/playlist.json\` |
| Versão na rádio | Ao vivo — *Chegou Quem Faltava* (VEVO) |
| Par de abertura | [Send Me On My Way](${sendMe}) (\`findWelcomeIndex\` — boas-vindas) |
| Ficheiro | MP3 local · charliebrownjrVEVO (youtube) |
| Papel nesta inspeção | **Adaptação no laboratório** — segunda voz da casa, não génese |

> A rádio fixa **esta** gravação como companheira da abertura Rusted Root; não inventaria o catálogo CBJr.

## Elo com Pessoas e Palavras

| Recurso | Papel |
|---------|-------|
| [Chorão](${chorao}) | Biografia / método da letra — série Pessoas (**referência apenas**) |
| [maconha](${maconha}) / [Palavras](${palavras}) | Vocabulário e cultura urbana já mapeados na ficha Pessoas |
| Hub [Pessoas](${pessoas}) | Não duplicar: obra ≠ pessoa |

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | Charlie Brown Jr. — Só os Loucos Sabem (Ao Vivo - Chegou Quem Faltava) |
| Canal | charliebrownjrVEVO |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da **adaptação ao vivo**; a fonte âncora continua a ser o [álbum de estúdio 2009](${wikiCamisa}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pela **génese de estúdio** (2009); só depois ouvir o par na [BudGanja Radio](${radio}).  
- Abrir [Send Me On My Way](${sendMe}) (faixa 1) e [Chorão](${chorao}) (pessoa — referência).  
- Hub [Artes](${hub}).

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese da obra** (canção, livro, filme) antes do uso no laboratório ou biografia de elenco.  
2. Fixar a versão exacta que está na rádio como **adaptação**, não como origem.  
3. Separar obra de biografia.  
4. Ligar à faixa-par e a Pessoas/Palavras por referência.  
5. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *Só os Loucos Sabem* documentada com a **génese de estúdio (2009)** como início de tudo; versão ao vivo e BudGanja Radio como ecos; biografia do letrista permanece em [Chorão](${chorao}).
`;

  const contentEn = `## Scope

Editorial inspection of **"Só os Loucos Sabem"** (Charlie Brown Jr.). The **beginning of everything** is the **studio work** on *[Camisa 10 Joga Bola Até na Chuva](${wikiCamisa})* (**2009**) — Chorão / Thiago Castanho credits. The **live** version (*Chegou Quem Faltava*, 2011/2021) and use on [BudGanja Radio](${radio}) follow as **adaptation** in the lab — not the song’s origin.

> **Method note:** independent audit. Anchor source: [Wikipedia · Camisa 10…](${wikiCamisa}); complementary [Chegou Quem Faltava](${wikiAlbum}), live video [charliebrownjrVEVO](${yt}). **Does not romanticize overdose.** Lyricist biography stays in [Chorão](${chorao}) — reference only.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Só os Loucos Sabem** |
| Artist | Charlie Brown Jr. |
| Studio genesis | *Camisa 10 Joga Bola Até na Chuva* (**2009**) |
| Writers | **Chorão** / **Thiago Castanho** |
| Live adaptation | Citibank Hall, 19 Mar 2011; album *Chegou Quem Faltava* (2021) |
| BudGanja type | Art — **song first**; radio as site adaptation |
| People link (reference) | [Chorão](${chorao}) |
| Arts pair | [Send Me On My Way](${sendMe}) |
| Lab link (secondary) | [BudGanja Radio](${radio}) |
| Date | ${inspected} |

## Origin of the song (core)

| Milestone | Note |
|-----------|------|
| **2009** | Studio album *Camisa 10 Joga Bola Até na Chuva* — **origin** of the song. |
| Credits | **Chorão** (lyrics) · **Thiago Castanho** (music). |
| **19 Mar 2011** | Live show at Citibank Hall (São Paulo). |
| **2021** | Posthumous album *[Chegou Quem Faltava](${wikiAlbum})* — live release. |

**Hierarchy:** without 2009 studio genesis there is no song to inspect. Live cut and site radio are descendants.

## Lab thesis

Restart, peace, memory — methodological parable. Biography stays in People; this sheet audits the **song as work**.

## Lab use (secondary)

Second track in \`radio/playlist.json\` — live *Chegou Quem Faltava* cut; pair with [Send Me On My Way](${sendMe}).

@youtube ${ytId}

## Status

**Approved in the Arts series** — studio genesis (2009) as the start of everything; live version and BudGanja Radio as echoes; lyricist biography in [Chorão](${chorao}).
`;

  const contentEs = `## Alcance

Inspección editorial de **«Só os Loucos Sabem»** (Charlie Brown Jr.). El **inicio de todo** es la **obra de estudio** en *[Camisa 10 Joga Bola Até na Chuva](${wikiCamisa})* (**2009**) — créditos Chorão / Thiago Castanho. La versión **en vivo** (*Chegou Quem Faltava*, 2011/2021) y el uso en [BudGanja Radio](${radio}) entran **después**, como **adaptación** — no como origen.

> **Nota metodológica:** auditoría independiente. Fuente ancla: [Wikipedia · Camisa 10…](${wikiCamisa}); complementaria [Chegou Quem Faltava](${wikiAlbum}). **No romantiza la overdose.** Biografía del letrista en [Chorão](${chorao}) — solo referencia.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Só os Loucos Sabem** |
| Artista | Charlie Brown Jr. |
| Génesis estudio | *Camisa 10 Joga Bola Até na Chuva* (**2009**) |
| Autoría | **Chorão** / **Thiago Castanho** |
| Adaptación en vivo | Citibank Hall, 19 mar. 2011; álbum *Chegou Quem Faltava* (2021) |
| Tipo BudGanja | Arte — **canción primero**; radio como adaptación |
| Personas (referencia) | [Chorão](${chorao}) |
| Laboratorio (secundario) | [BudGanja Radio](${radio}) |
| Fecha | ${inspected} |

## Origen de la canción (núcleo)

| Hito | Nota |
|------|------|
| **2009** | Álbum de estudio *Camisa 10 Joga Bola Até na Chuva* — **origen** de la canción. |
| Créditos | **Chorão** (letra) · **Thiago Castanho** (música). |
| **19 mar. 2011** | Show en vivo en Citibank Hall (São Paulo). |
| **2021** | Álbum póstumo *Chegou Quem Faltava* — lanzamiento en vivo. |

**Jerarquía:** sin 2009 no hay canción que inspeccionar. El vivo y la radio son descendientes.

## Uso en el laboratorio (secundario)

Segunda pista de \`radio/playlist.json\` — versión en vivo; par con [Send Me On My Way](${sendMe}).

@youtube ${ytId}

## Estado

**Aprobada en la serie Artes** — génesis de estudio (2009) como inicio de todo; versión en vivo y BudGanja Radio como ecos; biografía del letrista en [Chorão](${chorao}).
`;

  return { body, contentEn, contentEs, ytId, wikiCamisa };
}

function buildSoOsLoucosSabemPost() {
  const { body, contentEn, contentEs, ytId, wikiCamisa } = buildSoOsLoucosSabemBodies();
  return artePost({
    title: 'Inspeção: Só os Loucos Sabem — a canção CBJr e o recomeço',
    titleEn: 'Inspection: Só os Loucos Sabem — the CBJr song and restart',
    titleEs: 'Inspección: Só os Loucos Sabem — la canción de CBJr y el recomezo',
    excerpt:
      'Artes: Só os Loucos Sabem começa no álbum de estúdio Camisa 10 Joga Bola Até na Chuva (2009, Chorão/Thiago Castanho) — recomeço e paz; ao vivo Chegou Quem Faltava e BudGanja Radio como ecos secundários.',
    excerptEn:
      'Arts: Só os Loucos Sabem begins with the studio album Camisa 10 Joga Bola Até na Chuva (2009, Chorão/Thiago Castanho) — restart and peace; live Chegou Quem Faltava and BudGanja Radio as secondary echoes.',
    excerptEs:
      'Artes: Só os Loucos Sabem empieza en el álbum de estudio Camisa 10 Joga Bola Até na Chuva (2009, Chorão/Thiago Castanho) — recomezo y paz; en vivo Chegou Quem Faltava y BudGanja Radio como ecos secundarios.',
    slug: 'inspecao-arte-so-os-loucos-sabem',
    date: '2026-08-01T14:30:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Só os Loucos Sabem · Artes',
    coverImage: 'imagens/inspecoes/so-os-loucos-sabem-cover.jpg',
    sourceUrl: wikiCamisa,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

function buildTheMatrixBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Matrix';
  const wikiEn = 'https://en.wikipedia.org/wiki/The_Matrix';
  const ytId = 'vKQi3bBA1y8';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';

  const body = `## Escopo

Inspeção editorial do filme **«The Matrix»** (*Matrix*, **1999**). O **início de tudo** é a **obra cinematográfica** — escrita e realizada por **Lana e Lilly Wachowski**, sem romance prévio: o filme **é** a génese do objecto cultural Matrix. A biografia de **Keanu Reeves** (Neo) entra **depois**, como **elo secundário** em [Keanu Reeves](${keanu}) (série Pessoas) — não como origem.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · Matrix](${wiki}); complementar [Wikipedia (EN) · The Matrix](${wikiEn}), trailer oficial (${yt}). Crédito da obra: Warner Bros. / Village Roadshow / Wachowski. Sem afiliação. **Não confundir** com Canais (YouTube), com [Legado](${legado}) canábico nem com a ficha Pessoas. A metáfora da «pílula» é **simbólica** (acordar / escolher ver) — o laboratório **não** romantiza consumo de substâncias.

Esta ficha abre o eixo **cinema** na série **Artes**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **The Matrix** (*Matrix*) |
| Ano | **1999** (estreia EUA 31 mar.; Brasil 21 mai.) |
| Realização | **Lana e Lilly Wachowski** (escrita e realização) |
| Meio | Longa-metragem · ficção científica / ação |
| Produção | Warner Bros. / Village Roadshow Pictures |
| Elenco âncora | Keanu Reeves (Neo), Laurence Fishburne (Morpheus), Carrie-Anne Moss (Trinity), Hugo Weaving (Agent Smith) |
| Tipo BudGanja | Arte — **filme primeiro**; actor como referência secundária |
| Elo Pessoas (referência) | [Keanu Reeves](${keanu}) — actor (biografia; não duplicar aqui) |
| Elo laboratório | Método BudGanja: **verificar** o que se apresenta como real |
| Fonte de partida | [Wikipédia · Matrix](${wiki}) · [EN](${wikiEn}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese do filme** (1999) — a pergunta «o que é real?» — antes de qualquer elenco ou franquia posterior.  
**H2:** Neo (Reeves) é o **rosto da obra**; a carreira e o ofício do actor ficam em [Keanu Reeves](${keanu}) — aqui inspeciona-se o **filme**.  
**H3:** a «pílula vermelha / azul» entrou na linguagem popular como metáfora de despertar; no laboratório trata-se como **figura de escolha informada**, não como conselho farmacológico.

Passos:

1. Fixar a **origem do filme** (ano, realização, produção, estreias).  
2. Declarar a **tese cultural** (simulação vs verificação).  
3. Só depois situar elos a Pessoas (actor) e trailer.  
4. Separar obra de biografia.  
5. Status + fila.

## O início de tudo — génese do filme

Fontes: [Wikipédia · Matrix](${wiki}) · [Wikipedia (EN)](${wikiEn}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Anos 90 (fim)** | Escrita e realização por **Lana e Lilly Wachowski**; produção de ficção científica/ação para Warner Bros / Village Roadshow — **sem romance prévio**: o filme inventa o objecto Matrix. |
| Influências (fontes culturais, não plágio) | Jean Baudrillard — *Simulacra and Simulation*; tradição da caverna de Platão; **cyberpunk**; anime (*Ghost in the Shell*); cinema de acção de Hong Kong. |
| **31 mar. 1999** | Estreia nos **EUA**. |
| **21 mai. 1999** | Estreia no **Brasil**. |
| Invenção visual | ***Bullet time*** — câmara lenta rotativa; estilização de artes marciais; estética *cyberpunk* / *noir* digital. |
| Prémios | **4 Óscares técnicos** (1999) — efeitos visuais, edição de som, som, montagem de efeitos. |
| Argumento (núcleo) | Hacker Thomas Anderson / Neo descobre que a vida quotidiana é uma simulação gerida por máquinas; junta-se à resistência liderada por Morpheus. |

> **Hierarquia BudGanja:** sem o filme de 1999, não há Matrix cultural. A biografia do actor é descendente.

## A obra (síntese)

- Neo aprende que o quotidiano é simulação; treina, duvida, escolhe ver — «ninguém pode ser *dito* o que é a Matrix; tem de ver por si».  
- Impacto: franquia (reloads, *Resurrections*), memes e léxico («red pill», «glitch in the Matrix»).  
- Tom: escolha, treino, dúvida metódica — parábola de verificação, não cosmologia adoptada pelo laboratório.

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Simulação convincente | Narrativa que passa por «verdade» sem prova |
| Pílula / escolha | Decidir inspecionar vs aceitar o dado |
| Treino (dojo / salto) | Método repetível; hipótese + ensaio |
| Agentes | Sistemas que defendem a ilusão |
| «The desert of the real» | Ir às fontes; medir o terreno |

O laboratório **não** adopta a cosmologia do filme: usa-o como **parábola de verificação** — a inspeção é o oposto da cápsula confortável.

## Elo com Pessoas (secundário)

| Recurso | Papel |
|---------|-------|
| [Keanu Reeves](${keanu}) | Biografia e método actoral — série [Pessoas](${pessoas}) (**referência apenas**) |
| Hub [Artes](${hub}) | Obra ≠ pessoa; Neo é personagem, Keanu é ficha Pessoas |

> Como em Alice (livro > Disney): aqui **filme > actor**. A inspeção começa na obra Wachowski; Keanu é elo, não origem.

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | The Matrix (1999) Official Trailer #1 |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **filme**; a fonte âncora continua a ser a [obra](${wiki}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pela **génese** (1999, Wachowski, influências); só depois abrir [Keanu Reeves](${keanu}) (Pessoas).  
- Cruzar o hábito de «duvidar do ecrã» com o método das inspeções de canais e cursos.  
- Hub [Artes](${hub}) · opcional [Palavras](${palavras}) (metáforas de despertar / passagem).

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese da obra** (filme, livro, canção) antes do uso no laboratório ou biografia de elenco.  
2. Escolher o **filme** (título + ano), não a filmografia inteira do actor.  
3. Separar obra de biografia.  
4. Declarar tese cultural útil ao laboratório (sem forçar elo canábico).  
5. Slug \`inspecao-filme-…\` ou \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *The Matrix* (1999) documentado com a **génese Wachowski** como início de tudo; biografia do actor em [Keanu Reeves](${keanu}) como elo secundário.
`;

  const contentEn = `## Scope

Editorial inspection of **The Matrix** (1999). The **beginning of everything** is the **cinematic work** — written and directed by **Lana and Lilly Wachowski**; no prior novel: the film **is** the genesis of the Matrix cultural object. **Keanu Reeves**’ biography follows as a **secondary link** in [Keanu Reeves](${keanu}) (People) — not the origin.

> **Method note:** independent audit. Anchor source: [Wikipedia · The Matrix](${wikiEn}); PT: [Matrix](${wiki}). Credit: Warner Bros. / Village Roadshow / Wachowski. The “pill” metaphor is **symbolic** — the lab does **not** romanticize substance use.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **The Matrix** |
| Year | **1999** (US premiere 31 Mar; Brazil 21 May) |
| Directors | **Lana and Lilly Wachowski** |
| Medium | Feature film · science fiction / action |
| BudGanja type | Art — **film first**; actor as secondary reference |
| People link (reference) | [Keanu Reeves](${keanu}) |
| Date | ${inspected} |

## Origin of the film (core)

| Milestone | Note |
|-----------|------|
| **Late 1990s** | Written/directed by **Lana and Lilly Wachowski**; Warner Bros / Village Roadshow production. |
| Influences (cultural sources) | Baudrillard *Simulacra and Simulation*; Plato’s cave; cyberpunk; anime (*Ghost in the Shell*); HK action cinema. |
| **31 Mar 1999** | US premiere. |
| **21 May 1999** | Brazil premiere. |
| Visual invention | ***Bullet time***; 4 technical Oscars (1999). |

**Hierarchy:** without the 1999 film there is no cultural Matrix. Actor biography is descendant.

## Lab thesis

Convincing simulation vs inspection; pill as informed choice, not pharmacology. The lab uses the **film** as a verification parable.

## People link (secondary)

[Keanu Reeves](${keanu}) — reference only. **Film > actor**, like Alice (book > Disney).

@youtube ${ytId}

## Status

**Approved in the Arts series** — Wachowski genesis (1999) as the start of everything; actor biography as secondary link.
`;

  const contentEs = `## Alcance

Inspección editorial de **The Matrix** (*Matrix*, **1999**). El **inicio de todo** es la **obra cinematográfica** — escrita y dirigida por **Lana y Lilly Wachowski**; sin novela previa: el filme **es** la génesis del objeto cultural Matrix. La biografía de **Keanu Reeves** entra **después**, como **vínculo secundario** en [Keanu Reeves](${keanu}) (Personas).

> **Nota metodológica:** auditoría independiente. Fuente ancla: [Wikipedia · The Matrix](${wikiEn}); PT: [Matrix](${wiki}). La metáfora de la «píldora» es **simbólica** — el laboratorio **no** romantiza el consumo de sustancias.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **The Matrix** |
| Año | **1999** (estreno EE.UU. 31 mar.; Brasil 21 may.) |
| Dirección | **Lana y Lilly Wachowski** |
| Tipo BudGanja | Arte — **filme primero**; actor como referencia secundaria |
| Personas (referencia) | [Keanu Reeves](${keanu}) |
| Fecha | ${inspected} |

## Origen del filme (núcleo)

| Hito | Nota |
|------|------|
| **Finales de los 90** | Escrito/dirigido por las **Wachowski**; Warner Bros / Village Roadshow. |
| Influencias | Baudrillard *Simulacra and Simulation*; caverna de Platón; cyberpunk; anime (*Ghost in the Shell*); cine de acción de HK. |
| **31 mar. 1999** | Estreno en EE.UU. |
| **21 may. 1999** | Estreno en Brasil. |
| Invención visual | ***Bullet time***; 4 Óscares técnicos (1999). |

**Jerarquía:** sin el filme de 1999 no hay Matrix cultural. La biografía del actor es descendiente.

## Vídeo de referencia

@youtube ${ytId}

## Estado

**Aprobada en la serie Artes** — génesis Wachowski (1999) como inicio de todo; biografía del actor como vínculo secundario.
`;

  return { body, contentEn, contentEs, ytId, wiki };
}

function buildTheMatrixPost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildTheMatrixBodies();
  return artePost({
    title: 'Inspeção: The Matrix — a obra Wachowski e a pergunta do real',
    titleEn: 'Inspection: The Matrix — the Wachowski work and the question of the real',
    titleEs: 'Inspección: The Matrix — la obra Wachowski y la pregunta de lo real',
    excerpt:
      'Artes · cinema: The Matrix (1999, Wachowski) — génese do filme, influências (Baudrillard, cyberpunk, anime) e pergunta «o que é real?»; Keanu Reeves como elo secundário em Pessoas.',
    excerptEn:
      'Arts · film: The Matrix (1999, Wachowski) — film genesis, influences (Baudrillard, cyberpunk, anime) and “what is real?”; Keanu Reeves as secondary People link.',
    excerptEs:
      'Artes · cine: The Matrix (1999, Wachowski) — génesis del filme, influencias (Baudrillard, cyberpunk, anime) y «¿qué es real?»; Keanu Reeves como vínculo secundario en Personas.',
    slug: 'inspecao-filme-the-matrix',
    date: '2026-08-01T16:00:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'The Matrix · Artes',
    coverImage: 'imagens/inspecoes/the-matrix-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

function buildAliceNoPaisDasMaravilhasBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const book = 'https://pt.wikipedia.org/wiki/Alice_no_Pa%C3%ADs_das_Maravilhas';
  const bookEn = 'https://en.wikipedia.org/wiki/Alice%27s_Adventures_in_Wonderland';
  const filmWiki =
    'https://pt.wikipedia.org/wiki/Alice_no_Pa%C3%ADs_das_Maravilhas_(filme_de_1951)';
  const filmWikiEn = 'https://en.wikipedia.org/wiki/Alice_in_Wonderland_(1951_film)';
  const ytId = 'PA-h3-0wheo';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial de **«Alice no País das Maravilhas»** — a **obra literária** de **Lewis Carroll** (Charles Lutwidge Dodgson), publicada em **1865**. O **início de tudo** é o livro: génese no rio Tâmisa, manuscrito, nonsense vitoriano e a queda na toca do Coelho Branco. O filme Disney (1951) entra depois, como **adaptação** que popularizou a imagem — não como origem.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · Alice no País das Maravilhas](${book}) (livro); complementar [Wikipedia (EN)](${bookEn}). Adaptação de referência: [filme Disney 1951](${filmWiki}) / trailer (${yt}). Crédito da obra literária: Carroll / domínio público do texto original; ilustrações clássicas de John Tenniel. Sem afiliação com a Disney. **Não confundir** com Canais (YouTube) nem com [Legado](${legado}) canábico. Cogumelos, «Eat Me» / «Drink Me» e o «buraco do coelho» nascem no **texto** — são metáforas literárias; o laboratório **não** romantiza consumo de substâncias.

Esta ficha é Artes · **literatura + cinema** (par cultural com [The Matrix](${matrix})).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **Alice's Adventures in Wonderland** — *Alice no País das Maravilhas* |
| Autor | Charles Lutwidge Dodgson (**Lewis Carroll**) |
| Publicação | **4 jul. 1865** (Reino Unido); 2.ª tiragem datada 1866 |
| Género | Literatura infantil / **nonsense**; sátira, jogos de linguagem e matemática |
| Ilustração clássica | John Tenniel |
| Continuação | *Through the Looking-Glass* (*Alice Através do Espelho*, 1871) |
| Adaptação âncora (cinema) | Disney · *Alice in Wonderland* (1951) — ver secção abaixo |
| Tipo BudGanja | Arte — **livro primeiro**; cinema como eco cultural |
| Elo Palavras | [passar](${passar}) — travessia, queda, o que se passa |
| Elo cinema | [The Matrix](${matrix}) — outro «mundo por baixo» do quotidiano |
| Fonte de partida | [Wikipédia · Alice no País das Maravilhas](${book}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **livro** — Alice **inspeciona** um mundo absurdo pergunta a pergunta; a disciplina é literária antes de ser cinematográfica.  
**H2:** o «buraco do coelho» e as mudanças de escala são **figuras de passagem** (ver [passar](${passar})), nascidas no texto de 1865 — não protocolo botânico.  
**H3:** a associação cultural Wonderland ↔ substâncias psicoactivas é **memória colectiva posterior**; a tese do laboratório é curiosidade, linguagem e autoridade sem prova.

Passos:

1. Fixar a **origem literária** (data, autor, génese).  
2. Declarar a tese cultural a partir do **livro**.  
3. Só depois situar adaptações (aqui: Disney 1951 como eco).  
4. Embed do trailer da adaptação de referência.  
5. Status + fila.

## O início de tudo — génese do livro

Fonte: [Wikipédia · Alice no País das Maravilhas](${book}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **4 jul. 1862** | Passeio de barco no **rio Tâmisa** (Folly Bridge → Godstow): Dodgson, Robinson Duckworth e as irmãs Liddell — Lorina, **Alice Pleasance** (10 anos) e Edith. História improvisada para entreter. |
| **26 nov. 1864** | Manuscrito *Alice's Adventures Under Ground* (*Alice Debaixo da Terra*), oferecido a Alice Liddell. |
| Expansão | Influência de amigos e de George MacDonald; texto cresce (~18 mil → ~35 mil palavras); entram, notavelmente, o **Gato de Cheshire** e o **Chapeleiro**. |
| **4 jul. 1865** | Publicação de *Alice's Adventures in Wonderland* com ilustrações de **John Tenniel**. 1.ª tiragem retirada por queixas de impressão; 2.ª (capa 1866) esgota-se. |
| Ecos locais | Alusões a Oxford / Christ Church (ex.: toca do coelho ligada, na tradição, às escadas do salão); nonsense, paródias de poemas infantis, enigmas linguísticos e matemáticos. |
| Sequela | **1871** — *Alice Através do Espelho*; em 1890, *The Nursery "Alice"* para crianças muito pequenas. |

> **Hierarquia BudGanja:** sem o passeio de 1862 e o livro de 1865, não há Wonderland cultural. O filme é descendente.

## A obra literária (síntese)

- Menina Alice segue o Coelho Branco, cai na toca e entra num país de criaturas antropomórficas e lógica de sonho.  
- Dois níveis de leitura (tradição crítica): um para crianças, outro para adultos — sátira, alusões e jogos de linguagem.  
- Marcos narrativos que a cultura memoriza: «Beba-me» / «Coma-me», lago de lágrimas, Lagarta no cogumelo, chá do Chapeleiro, Rainha de Copas («Cortem-lhe a cabeça!»), Gato de Cheshire.  
- Impacto: uma das obras **nonsense** mais traduzidas e adaptadas; o título português *Alice no País das Maravilhas* carrega sobretudo esta herança literária.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Buraco do coelho | Entrar na investigação; aceitar a queda para ver o terreno |
| «Eat Me» / «Drink Me» | Mudança de escala / ponto de vista — **metáfora literária**, não dose |
| Lagarta e cogumelo | Imagem de transformação no **capítulo** de Carroll; **não** ficha de planta |
| Rainha de Copas | Autoridade sem método vs inspeção com prova |
| Gato de Cheshire | Narrativa que aparece e some sem rastreio |
| Nonsense / enigmas | Auditar o que se diz vs o que se demonstra |

O laboratório **não** adopta Wonderland como cosmologia de consumo: usa o **livro** como parábola de curiosidade metódica — a inspeção pergunta; a Rainha manda.

## Adaptação de referência — Disney (1951)

O cinema **não** substitui a origem. Regista-se aqui a adaptação mais reconhecida no imaginário popular (incl. Brasil), para quem chega à obra pelo ecrã.

| Campo | Valor |
|-------|-------|
| Título | *Alice in Wonderland* · *Alice no País das Maravilhas* |
| Ano | 1951 |
| Realização | Clyde Geronimi, Wilfred Jackson, Hamilton Luske |
| Estúdio | Walt Disney Productions |
| Fonte ficha filme | [Wikipédia · filme 1951](${filmWiki}) · [EN](${filmWikiEn}) |
| Papel nesta inspeção | **Eco visual** do livro — canções, cores, nonsense traduzido em gag |

Remakes posteriores (ex.: Burton 2010) ficam fora deste recorte.

## Elo com outras fichas

| Recurso | Papel |
|---------|-------|
| [passar](${passar}) | Palavras — travessia e queda (núcleo literário) |
| [The Matrix](${matrix}) | Cinema Artes — outro «mundo por baixo»; aqui o livro tem prioridade |
| Hub [Artes](${hub}) | Literatura + adaptação; sem ficha Pessoas de Carroll neste passo |
| Hub [Palavras](${palavras}) | Linguagem, metáfora, título |

## Vídeo de referência (embed) — adaptação

| Campo | Valor |
|-------|-------|
| Título | Alice in Wonderland (1951) Trailer #1 · Movieclips Classic Trailers |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed da adaptação; a fonte âncora continua a ser o [livro](${book}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pelo **texto** (1862–1865); só depois pelo ecrã.  
- Contrapor com [The Matrix](${matrix}): duas ficções de mundos «por baixo» — uma nonsense vitoriano, outra cyberpunk.  
- Hub [Artes](${hub}) · [passar](${passar}).

## Como repetir o método

1. Quando houver livro + filme, **priorizar a origem literária**.  
2. Declarar tese a partir do texto; adaptações como secção secundária.  
3. Tratar metáforas de substância como **literatura**, não como protocolo.  
4. Slug \`inspecao-filme-…\` / \`inspecao-arte-…\` (URL estável; conteúdo = livro primeiro).

## Status

**Aprovado na série Artes** — *Alice no País das Maravilhas* documentado com o **livro de Lewis Carroll (1865)** como início de tudo; Disney 1951 como adaptação de referência; remakes posteriores fora do recorte.
`;

  const contentEn = `## Scope

Editorial inspection of **Alice’s Adventures in Wonderland** — the **literary work** by **Lewis Carroll** (1865). The **beginning of everything** is the book: Thames boat trip, manuscript, Victorian nonsense and the rabbit hole. The Disney film (1951) follows as an **adaptation**, not the origin.

> **Method note:** independent audit. Anchor source: [Wikipedia · Alice’s Adventures in Wonderland](${bookEn}); PT: [${book}](${book}). Film reference: [1951 Disney](${filmWikiEn}), trailer (${yt}). Mushrooms / Eat Me / Drink Me / rabbit hole are **literary metaphors** — the lab does **not** romanticize substance use.

Companion Arts sheet: [The Matrix](${matrix}).

## Inspected object

| Field | Value |
|-------|-------|
| Main work | **Alice’s Adventures in Wonderland** |
| Author | Lewis Carroll (Charles Lutwidge Dodgson) |
| Published | **4 Jul 1865** |
| Sequel | *Through the Looking-Glass* (1871) |
| Film echo | Disney 1951 |
| BudGanja type | Art — **book first**; cinema as cultural echo |
| Words link | [passar](${passar}) |
| Date | ${inspected} |

## Origin of the book (core)

| Milestone | Note |
|-----------|------|
| **4 Jul 1862** | Thames boat trip; story improvised for the Liddell sisters (incl. Alice Pleasance, 10). |
| **26 Nov 1864** | Manuscript *Alice’s Adventures Under Ground* for Alice Liddell. |
| **4 Jul 1865** | Published with John Tenniel illustrations; early print run withdrawn; second printing sells out. |
| Expansion | Cheshire Cat and Mad Hatter among notable additions; Oxford / Christ Church allusions in tradition. |

**Hierarchy:** without 1862–1865 there is no cultural Wonderland. Film is descendant.

## Lab thesis (from the book)

| Text theme | Editorial gloss |
|------------|-----------------|
| Rabbit hole | Enter the inquiry |
| Eat Me / Drink Me | Scale / viewpoint — **metaphor**, not dose |
| Caterpillar & mushroom | Literary image — **not** a plant sheet |
| Queen of Hearts | Authority without method vs inspection with proof |

## Film reference (secondary)

Disney 1951 — visual echo of the book. Trailer embed below. Later remakes out of scope.

@youtube ${ytId}

## Status

**Approved in the Arts series** — Carroll’s **1865 book** as the start of everything; Disney 1951 as reference adaptation.
`;

  const contentEs = `## Alcance

Inspección editorial de **Alicia en el país de las maravillas** — la **obra literaria** de **Lewis Carroll** (1865). El **inicio de todo** es el libro: paseo por el Támesis, manuscrito, nonsense victoriano y la madriguera. El filme Disney (1951) entra después, como **adaptación**, no como origen.

> **Nota metodológica:** auditoría independiente. Fuente ancla: [Wikipedia](${bookEn}) / [PT](${book}). Hongos, «Eat Me» / «Drink Me» y la madriguera son **metáforas literarias** — el laboratorio **no** romantiza el consumo de sustancias.

Par en Artes: [The Matrix](${matrix}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra principal | **Alice’s Adventures in Wonderland** |
| Autor | Lewis Carroll |
| Publicación | **4 jul. 1865** |
| Secuela | *A través del espejo* (1871) |
| Eco cinematográfico | Disney 1951 |
| Tipo BudGanja | Arte — **libro primero** |
| Palabras | [passar](${passar}) |
| Fecha | ${inspected} |

## Origen del libro (núcleo)

| Hito | Nota |
|------|------|
| **4 jul. 1862** | Paseo en el Támesis; historia improvisada para las hermanas Liddell (Alice Pleasance, 10). |
| **26 nov. 1864** | Manuscrito *Alice’s Adventures Under Ground*. |
| **4 jul. 1865** | Publicación con ilustraciones de John Tenniel. |

**Jerarquía:** sin 1862–1865 no hay Wonderland cultural. El filme es descendiente.

## Tesis del laboratorio (desde el libro)

| Tema | Glosa |
|------|-------|
| Madriguera | Entrar en la investigación |
| Eat Me / Drink Me | Escala / punto de vista — **metáfora**, no dosis |
| Oruga y hongo | Imagen literaria — **no** ficha de planta |
| Reina de Corazones | Autoridad sin método vs inspección con prueba |

## Referencia cinematográfica (secundaria)

Disney 1951 — eco visual del libro.

@youtube ${ytId}

## Estado

**Aprobada en la serie Artes** — el **libro de 1865** como inicio de todo; Disney 1951 como adaptación de referencia.
`;

  return { body, contentEn, contentEs, ytId, wiki: book };
}

function buildAliceNoPaisDasMaravilhasPost() {
  const { body, contentEn, contentEs, ytId, wiki } =
    buildAliceNoPaisDasMaravilhasBodies();
  return artePost({
    title:
      'Inspeção: Alice no País das Maravilhas — o livro de Carroll e o buraco do coelho',
    titleEn:
      'Inspection: Alice in Wonderland — Carroll’s book and the rabbit hole',
    titleEs:
      'Inspección: Alicia en el país de las maravillas — el libro de Carroll y la madriguera',
    excerpt:
      'Artes: Alice no País das Maravilhas começa no livro de Lewis Carroll (1865) — génese no Tâmisa, nonsense e curiosidade; Disney 1951 como adaptação. Metáforas literárias, sem romantizar substâncias.',
    excerptEn:
      'Arts: Alice in Wonderland begins with Lewis Carroll’s book (1865) — Thames origin, nonsense and curiosity; Disney 1951 as adaptation. Literary metaphors, without romanticizing substances.',
    excerptEs:
      'Artes: Alicia en el país de las maravillas empieza en el libro de Lewis Carroll (1865) — génesis en el Támesis, nonsense y curiosidad; Disney 1951 como adaptación. Metáforas literarias, sin romantizar sustancias.',
    slug: 'inspecao-filme-alice-no-pais-das-maravilhas',
    date: '2026-08-01T18:00:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'Alice no País das Maravilhas · Artes',
    coverImage: 'imagens/inspecoes/alice-no-pais-das-maravilhas-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

const ARTES_INSPECOES_POSTS = [
  buildSendMeOnMyWayPost(),
  buildSoOsLoucosSabemPost(),
  buildTheMatrixPost(),
  buildAliceNoPaisDasMaravilhasPost()
];

module.exports = {
  ARTES_INSPECOES_POSTS,
  artePost,
  buildSendMeOnMyWayPost,
  buildSendMeOnMyWayBodies,
  buildSoOsLoucosSabemPost,
  buildSoOsLoucosSabemBodies,
  buildTheMatrixPost,
  buildTheMatrixBodies,
  buildAliceNoPaisDasMaravilhasPost,
  buildAliceNoPaisDasMaravilhasBodies
};
