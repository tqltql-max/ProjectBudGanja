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
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
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
| Elo Palavras | [caminho](${caminho}) — *way* / percurso; [passar](${passar}) — passo da travessia |
| Elo laboratório (secundário) | [BudGanja Radio](${radio}) — faixa de boas-vindas |
| Faixa companheira na rádio | [Só os Loucos Sabem](${loucos}) (Charlie Brown Jr.) · biografia em [Chorão](${chorao}) |
| Fonte de partida | [Wikipedia · Send Me On My Way](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese da canção** (1992→1994) — Pittsburgh, worldbeat, optimismo de caminho — antes de qualquer uso no player.  
**H2:** a letra e o imaginário de partida cruzam com a série [Palavras](${palavras}) via [caminho](${caminho}) (*way*) e [passar](${passar}) — elo metodológico, não etimológico inglês→português.  
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
| «Send me on my way» | Convite à travessia — ver [caminho](${caminho}) · [passar](${passar}) |
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

A canção é um convite à **partida** e ao **caminho**. No hub BudGanja, o léxico âncora é [caminho](${caminho}) (*way* / percurso) e o verbo irmão [passar](${passar}): travessia, o que se passa e o tempo que passa — sem forçar tradução literal do título inglês.

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
- Cruzar com [caminho](${caminho}), [passar](${passar}), [Só os Loucos Sabem](${loucos}) e [Chorão](${chorao}).  
- Hub [Artes](${hub}) — fila de filmes/séries/outras obras.

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese da obra** (canção, livro, filme) antes do uso no laboratório ou biografia de elenco.  
2. Fixar créditos, datas e fonte pública.  
3. Declarar tese cultural a partir da **obra**.  
4. Só depois situar uso no site (rádio, capa, citação) ou elos a Pessoas/Palavras.  
5. Publicar com slug \`inspecao-arte-…\` / \`inspecao-filme-…\` / \`inspecao-serie-…\`.

## Status

**Aprovado como ficha fundadora Artes** — *Send Me On My Way* documentada com a **génese Rusted Root (1992/1994)** como início de tudo; BudGanja Radio como eco funcional; elos a [caminho](${caminho}), [passar](${passar}) e à faixa CBJr da mesma playlist.
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
| Words link | [caminho](${caminho}) · [passar](${passar}) |
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

Path / departure imagery crosses [Words](${palavras}) via [caminho](${caminho}) (*way*) and [passar](${passar}). Afterlife in film and science is collective memory — the lab does not replicate that filmography.

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
| Palabras | [caminho](${caminho}) · [passar](${passar}) |
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
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const vida = '/vida/';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';

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

## Frases anotadas (Chorão)

Citação breve para crítica editorial — créditos: **Chorão** / Charlie Brown Jr., *Só os Loucos Sabem* (*Camisa 10…*, 2009). Biografia do letrista: [Chorão](${chorao}). **Não reproduzir a letra completa.**

> «Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.»

| Frase | Leitura BudGanja | Elo |
|-------|------------------|-----|
| **Toda positividade** | Desejo de ânimo completo — não ingenuidade: escolher o tom do cuidado | [emoção](${emocao}) · [Vida](${vida}) |
| **eu desejo a você** | [Gesto](${gesto}) de oferta: a palavra vai para o outro | [gesto](${gesto}) · [Chorão](${chorao}) |
| **Pois precisamos disso** | Necessidade colectiva — o laboratório não cultiva sozinho | [Vida](${vida}) · [verdade](${verdade}) |
| **nos dias de luta** | Dias duros sem romantizar a queda; luta ≠ glória automática | [medo](${medo}) · recomeço (tese abaixo) |

**Síntese em frases:**

1. **Positividade** — ânimo que se deseja, não propaganda.  
2. **Desejo a você** — acto dirigido: quem escreve oferece.  
3. **Precisamos** — o «nós» da luta (banda, rua, laboratório).  
4. **Dias de luta** — o tempo difícil em que o desejo importa; logo a canção lembra que o [medo](${medo}) «cega os nossos sonhos» — outro verso da mesma obra.

## Tese cultural BudGanja

| Tema na canção | Tradução editorial |
|----------------|-------------------|
| Recomeço | Entrar de novo na investigação após queda |
| «Só os loucos sabem» | Coragem de ver o que outros não inspeccionam |
| Positividade nos dias de luta | Ânimo como [gesto](${gesto}) necessário — sem negar a luta |
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

## Annotated phrases (Chorão)

Short quote for editorial critique — **Chorão** / Charlie Brown Jr., *Só os Loucos Sabem* (2009). Full lyric not reproduced.

> “Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.”

| Phrase | BudGanja reading |
|--------|------------------|
| **Toda positividade** | Full wish for courage — not naïveté |
| **eu desejo a você** | Offering gesture toward the other |
| **Pois precisamos disso** | Collective need |
| **nos dias de luta** | Hard days without romanticizing the fall |

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

## Frases anotadas (Chorão)

Cita breve — **Chorão** / Charlie Brown Jr., *Só os Loucos Sabem* (2009). No se reproduce la letra completa.

> «Toda positividade eu desejo a você / Pois precisamos disso nos dias de luta.»

| Frase | Lectura BudGanja |
|-------|------------------|
| **Toda positividade** | Deseo de ánimo completo — no ingenuidad |
| **eu desejo a você** | Gesto de oferta hacia el otro |
| **Pois precisamos disso** | Necesidad colectiva |
| **nos dias de luta** | Días duros sin romantizar la caída |

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
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial de **«Alice no País das Maravilhas»** — a **obra literária** de **Lewis Carroll** (Charles Lutwidge Dodgson), publicada em **1865**. O **início de tudo** é o livro: génese no rio Tâmisa, manuscrito, nonsense vitoriano e a queda na toca do Coelho Branco. O filme Disney (1951) entra depois, como **adaptação** que popularizou a imagem — não como origem.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · Alice no País das Maravilhas](${book}) (livro); complementar [Wikipedia (EN)](${bookEn}). Adaptação de referência: [filme Disney 1951](${filmWiki}) / trailer (${yt}). Crédito da obra literária: Carroll / domínio público do texto original; ilustrações clássicas de John Tenniel. Sem afiliação com a Disney. **Não confundir** com Canais (YouTube) nem com [Legado](${legado}) canábico. Cogumelos, «Eat Me» / «Drink Me» e o «buraco do coelho» nascem no **texto** — são metáforas literárias; o laboratório **não** romantiza consumo de substâncias. Ficha lexical: [coelho](${coelho}).

Esta ficha é Artes · **literatura + cinema** (par cultural com [The Matrix](${matrix})).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **Alice's Adventures in Wonderland** — *Alice no País das Maravilhas* |
| Autor | Charles Lutwidge Dodgson (**Lewis Carroll**) |
| Publicação | **4 jul. 1865** (Reino Unido); 2.ª tiragem datada 1866 |
| Género | Literatura **nonsense** / fantasia; sátira, jogos de linguagem e matemática |
| Ilustração clássica | John Tenniel |
| Continuação | *Through the Looking-Glass* (*Alice Através do Espelho*, 1871) |
| Adaptação âncora (cinema) | Disney · *Alice in Wonderland* (1951) — ver secção abaixo |
| Tipo BudGanja | Arte — **livro primeiro**; cinema como eco cultural |
| Elo Palavras | [coelho](${coelho}) · [passar](${passar}) · [caminho](${caminho}) |
| Elo cinema | [The Matrix](${matrix}) — outro «mundo por baixo» do quotidiano |
| Fonte de partida | [Wikipédia · Alice no País das Maravilhas](${book}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **livro** — Alice **inspeciona** um mundo absurdo pergunta a pergunta; a disciplina é literária antes de ser cinematográfica.  
**H2:** o «buraco do coelho» e as mudanças de escala são **figuras de passagem** (ver [coelho](${coelho}) e [passar](${passar})), nascidas no texto de 1865 — não protocolo botânico.  
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
| Sequela | **1871** — *Alice Através do Espelho*; em 1890, *The Nursery "Alice"* (edição ilustrada simplificada). |

> **Hierarquia BudGanja:** sem o passeio de 1862 e o livro de 1865, não há Wonderland cultural. O filme é descendente.

## A obra literária (síntese)

- Menina Alice segue o Coelho Branco, cai na toca e entra num país de criaturas antropomórficas e lógica de sonho.  
- Dois níveis de leitura (tradição crítica): nível popular e nível crítico/adulto — sátira, alusões e jogos de linguagem.  
- Marcos narrativos que a cultura memoriza: «Beba-me» / «Coma-me», lago de lágrimas, Lagarta no cogumelo, chá do Chapeleiro, Rainha de Copas («Cortem-lhe a cabeça!»), Gato de Cheshire.  
- Impacto: uma das obras **nonsense** mais traduzidas e adaptadas; o título português *Alice no País das Maravilhas* carrega sobretudo esta herança literária.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Buraco do coelho | Entrar na investigação; aceitar a queda para ver o terreno — ficha [coelho](${coelho}) |
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

[▶ Artes](${hub}) · [▶ Coelho](${coelho}) · [▶ Palavras](${palavras}) · [▶ Matrix](${matrix})
`;

  const contentEn = `## Scope

Editorial inspection of **Alice’s Adventures in Wonderland** — the **literary work** by **Lewis Carroll** (1865). The **beginning of everything** is the book: Thames boat trip, manuscript, Victorian nonsense and the rabbit hole. The Disney film (1951) follows as an **adaptation**, not the origin.

> **Method note:** independent audit. Anchor source: [Wikipedia · Alice’s Adventures in Wonderland](${bookEn}); PT: [${book}](${book}). Film reference: [1951 Disney](${filmWikiEn}), trailer (${yt}). Mushrooms / Eat Me / Drink Me / rabbit hole are **literary metaphors** — the lab does **not** romanticize substance use. Lexical sheet: [coelho](${coelho}).

Companion Arts sheet: [The Matrix](${matrix}). Words: [coelho](${coelho}).

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

function buildODiaDoCuringaBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const book = 'https://pt.wikipedia.org/wiki/O_Dia_do_Curinga';
  const bookEn = 'https://en.wikipedia.org/wiki/The_Solitaire_Mystery';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial de **«O Dia do Curinga»** (*Kabalmysteriet* / *The Solitaire Mystery*) — romance filosófico de **Jostein Gaarder** (1990). O **início de tudo** é o livro: viagem Europa, livrinho no pão, ilha das cartas e o Curinga que pergunta. A biografia do autor fica em [Jostein Gaarder](${gaarder}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · O Dia do Curinga](${book}); complementar [Wikipedia (EN)](${bookEn}). Crédito: Jostein Gaarder / editores (pt.: Companhia das Letras · Seguinte). Sem afiliação. **Não confundir** com Canais nem com [Legado](${legado}). A «Bebida Púrpura» do romance é **metáfora literária** de acomodação mental — o laboratório **não** a trata como protocolo de substâncias nem alegoria canábica.

Par cultural em Artes: [Alice no País das Maravilhas](${alice}) — outra obra onde a curiosidade inspeciona um mundo de regras estranhas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **O Dia do Curinga** (*Kabalmysteriet*) |
| Autor | [Jostein Gaarder](${gaarder}) — biografia em Pessoas |
| Publicação original | **1990** (Noruega) |
| Título EN | *The Solitaire Mystery* |
| Género | Romance filosófico juvenil / metaficção (história dentro de história) |
| Tradução BR (âncora) | Companhia das Letras · selo Seguinte (lançamento pt. 1996) |
| Tipo BudGanja | Arte — **livro primeiro**; autor em Pessoas |
| Elo Pessoas | [Jostein Gaarder](${gaarder}) |
| Elo Palavras | [passar](${passar}) — viagem, travessia Europa, o que se passa na leitura |
| Fonte de partida | [Wikipédia · O Dia do Curinga](${book}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **texto** — o Curinga é figura de **pergunta** («Quem somos? De onde viemos?»), disciplina próxima da inspeção.  
**H2:** a viagem Noruega→Grécia e o livrinho oculto são **figuras de passagem** (ver [passar](${passar})).  
**H3:** a Bebida Púrpura dramatiza a **acomodação sem prova**; o Curinga é o contrário — manter o mundo desperto.

Passos:

1. Fixar origem literária (ano, título original, autor).  
2. Declarar tese a partir do **livro**.  
3. Ligar Pessoas só por referência ([Gaarder](${gaarder})).  
4. Status + fila.

## O início de tudo — génese do livro

Fonte: [Wikipédia · O Dia do Curinga](${book}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **1990** | Publicação norueguesa *Kabalmysteriet* — antes do sucesso global de *O Mundo de Sofia* (1991). |
| Forma | Metaficção: viagem de Hans-Thomas + narrativa do livrinho (Ludwig / Albert / Hans / Frode / cartas). |
| Motivo central | Calendário da ilha (52 cartas + **Dia do Curinga**); o Curinga como único que não se embriaga com a Bebida Púrpura. |
| Eco BR | Tradução *O Dia do Curinga*; FNLIJ 1996 (tradução/jovem) — contexto de circulação, não tese. |
| Continuação temática | Eco em *Maya* (1999), segundo a wiki — fora do recorte desta ficha. |

> **Hierarquia BudGanja:** sem o romance de 1990 não há «Dia do Curinga» cultural. O autor tem ficha própria em Pessoas.

## A obra (síntese)

- Hans-Thomas (12) e o pai cruzam a Europa num Fiat vermelho à procura da mãe em Atenas.  
- Em Dorf, um anão dá-lhe uma lupa; um padeiro entrega pães — no maior, um livrinho minúsculo.  
- O livrinho revela a ilha de Frode, as cartas-anãs, a Bebida Púrpura e o **Dia do Curinga**.  
- Fecho: o Curinga continua no mundo a impedir a acomodação — pergunta que o laboratório reconhece como método.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Curinga | Figura da pergunta inconveniente — inspeção vs conforto |
| Bebida Púrpura | Acomodação deliciosa que embota o pensamento — **metáfora**, não dose |
| Livrinho no pão | Descoberta por escala (lupa) — ver o que estava oculto |
| Viagem Europa | [passar](${passar}) — travessia geográfica e narrativa |
| Jogo do Curinga | Frases soltas ordenadas em sentido — auditar o que se diz |
| «Quem somos?» | Pergunta fundadora — alinhada ao método BudGanja |

O laboratório **não** adopta a cosmologia da ilha: usa o livro como **parábola de curiosidade filosófica**.

## Elo com Pessoas e outras fichas

| Recurso | Papel |
|---------|-------|
| [Jostein Gaarder](${gaarder}) | Autor — método de escrita filosófica (Pessoas) |
| [passar](${passar}) | Palavras — viagem e travessia |
| [Alice](${alice}) | Artes — curiosidade em mundo de regras estranhas |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Palavras](${palavras}) | Separar obra, autor e léxico |

## Complementaridade com o Inspetor BudGanja

- Ler a ficha do **livro** antes da biografia do autor.  
- Cruzar o hábito de **perguntar** com inspeções de canais e cursos.  
- Hub [Artes](${hub}).

## Como repetir o método

1. Priorizar a **origem literária** quando houver livro.  
2. Autor em Pessoas com elo de volta à obra.  
3. Metáforas de substância = literatura, não protocolo.  
4. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *O Dia do Curinga* (1990) documentado como livro; autor em [Jostein Gaarder](${gaarder}).
`;

  const contentEn = `## Scope

Editorial inspection of **The Solitaire Mystery** (*Kabalmysteriet* / *O Dia do Curinga*) — philosophical novel by **Jostein Gaarder** (1990). The **beginning of everything** is the book. Author biography: [Jostein Gaarder](${gaarder}) (People).

> **Method note:** independent audit from [Wikipedia](${bookEn}) / [PT](${book}). The “Purple Drink” is a **literary metaphor** for mental complacency — not a substance protocol. Companion Arts sheet: [Alice](${alice}).

## Inspected object

| Field | Value |
|-------|-------|
| Work | **O Dia do Curinga** (*Kabalmysteriet*, 1990) |
| Author | [Jostein Gaarder](${gaarder}) |
| BudGanja type | Art — **book first** |
| Words link | [passar](${passar}) |
| Date | ${inspected} |

## Origin of the book (core)

Published Norway **1990**. Nested narrative (Hans-Thomas’s journey + miniature book). Island calendar of 52 cards + **Joker’s Day**. Joker asks “Who are we? Where do we come from?”

## Lab thesis

| Theme | Gloss |
|-------|-------|
| Joker | Figure of inconvenient question — inspection vs comfort |
| Purple Drink | Delicious complacency — **metaphor**, not dose |
| Journey | [passar](${passar}) — crossing |

## Status

**Approved in the Arts series** — 1990 book first; author in [Jostein Gaarder](${gaarder}).
`;

  const contentEs = `## Alcance

Inspección editorial de **El día del comodín** (*Kabalmysteriet* / *O Dia do Curinga*) — novela filosófica de **Jostein Gaarder** (1990). El **inicio de todo** es el libro. Biografía del autor: [Jostein Gaarder](${gaarder}) (Personas).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${bookEn}) / [PT](${book})). La «Bebida Púrpura» es **metáfora literaria** — no protocolo de sustancias.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **O Dia do Curinga** (*Kabalmysteriet*, 1990) |
| Autor | [Jostein Gaarder](${gaarder}) |
| Tipo BudGanja | Arte — **libro primero** |
| Palabras | [passar](${passar}) |
| Fecha | ${inspected} |

## Origen del libro (núcleo)

Publicación Noruega **1990**. Metaficción (viaje + librito). Calendario de 52 cartas + **Día del Curinga**. El Curinga pregunta «¿Quiénes somos?».

## Tesis del laboratorio

| Tema | Glosa |
|------|-------|
| Curinga | Pregunta incómoda — inspección vs confort |
| Bebida Púrpura | Acomodación — **metáfora**, no dosis |
| Viaje | [passar](${passar}) — travesía |

## Estado

**Aprobada en la serie Artes** — libro de 1990 primero; autor en [Jostein Gaarder](${gaarder}).
`;

  return { body, contentEn, contentEs, wiki: book };
}

function buildODiaDoCuringaPost() {
  const { body, contentEn, contentEs, wiki } = buildODiaDoCuringaBodies();
  return artePost({
    title:
      'Inspeção: O Dia do Curinga — o livro de Gaarder e a pergunta do curinga',
    titleEn:
      'Inspection: The Solitaire Mystery — Gaarder’s book and the joker’s question',
    titleEs:
      'Inspección: El día del comodín — el libro de Gaarder y la pregunta del curinga',
    excerpt:
      'Artes: O Dia do Curinga (*Kabalmysteriet*, 1990) — romance filosófico de Jostein Gaarder; curiosidade, viagem e metáfora da Bebida Púrpura. Autor em Pessoas.',
    excerptEn:
      'Arts: The Solitaire Mystery (*Kabalmysteriet*, 1990) — Gaarder’s philosophical novel; curiosity, journey and Purple Drink metaphor. Author in People.',
    excerptEs:
      'Artes: O Dia do Curinga (*Kabalmysteriet*, 1990) — novela filosófica de Gaarder; curiosidad, viaje y metáfora de la Bebida Púrpura. Autor en Personas.',
    slug: 'inspecao-arte-o-dia-do-curinga',
    date: '2026-08-01T19:00:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'O Dia do Curinga · Artes',
    coverImage: 'imagens/inspecoes/o-dia-do-curinga-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildDiambaSarabambaBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const neip =
    'http://neip.info/livro/diamba-sarabamba-coletanea-de-textos-brasileiros-sobre-a-maconha-sao-paulo-ground-1986/';
  const henman = '/posts/post-inspecao-figura-anthony-henman.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';

  const body = `## Escopo

Inspeção editorial de **«Diamba Sarabamba»** (*Coletânea de textos brasileiros sobre a maconha*) — antologia organizada por **Anthony Henman** e **Osvaldo Pessoa Jr.** (São Paulo, **Ground**, **1986**). O **início de tudo** é o livro: reunião pioneira de textos brasileiros sobre a diamba/maconha, do discurso médico do início do século XX aos ensaios contemporâneos de história, antropologia, farmacologia e direito. A biografia do co-organizador âncora fica em [Anthony Henman](${henman}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fonte âncora: [NEIP · Diamba Sarabamba](${neip}); complementar catálogos de circulação (ISBN 978-85-7187-065-9). Crédito: Henman & Pessoa Jr. / Editora Ground. Sem afiliação. **Não confundir** com Canais, com a HQ *Diamba — Histórias do Proibicionismo* (Daniel Paiva, Brasa) nem com [Legado](${legado}) (ex.: [Carlini](${carlini}), que contribui neste volume). Indexar a antologia ≠ endossar cada texto histórico anti-maconha nela reunido.

Par cultural em Artes: [O Dia do Curinga](${curinga}) — outra ficha «livro primeiro»; aqui o objecto é **ensaio/coletânea**, não romance.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **Diamba Sarabamba** — coletânea de textos brasileiros sobre a maconha |
| Organizadores | [Anthony Henman](${henman}) · Osvaldo Pessoa Jr. |
| Publicação | **1986** · Editora Ground · São Paulo |
| Extensão (catálogo) | ~163 p. |
| ISBN (ed. referida) | 978-85-7187-065-9 |
| Género | Antologia / ensaios — história, antropologia, farmacologia, direito |
| Tipo BudGanja | Arte — **livro primeiro**; organizador âncora em Pessoas |
| Elo Pessoas | [Anthony Henman](${henman}) |
| Elo Palavras | [maconha](${maconha}) — léxico BR; «diamba» no título e na tradição popular |
| Elo Legado (contribuinte) | [Elisaldo Carlini](${carlini}) — ensaio farmacológico no volume |
| Fonte de partida | [NEIP · Diamba Sarabamba](${neip}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **volume de 1986** — arquivo editorial que contrapõe preconceito médico antigo a argumentos históricos, antropológicos e jurídicos.  
**H2:** o título ecoa a cantoria popular «Ó diamba, sarabamba!» (registos de sertão / «clubes de diambistas») — cultura oral antes da antologia.  
**H3:** a ficha Pessoas ([Henman](${henman})) cobre o **método** do co-organizador; a tese da **coletânea** fica aqui.

Passos:

1. Fixar génese editorial (ano, editora, organizadores).  
2. Declarar tese a partir do **livro**.  
3. Ligar Pessoas, Palavras e Legado só por referência.  
4. Status + fila.

## O início de tudo — génese do livro

Fonte: [NEIP](${neip}); eco folclórico em reportagens/história oral sobre a cantoria «diamba sarabamba».

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Cantoria popular** | «Ó diamba, sarabamba…» — memória oral de uso popular no Nordeste (século XX); o título da antologia **herda** essa fórmula. |
| **1986** | Ground (SP) publica a coletânea — marco pioneiro dos estudos brasileiros em livro sobre maconha. |
| **Arquitectura editorial** | Textos médicos anti-maconha do início do século XX **junto** a ensaios contemporâneos — o contraste é o método. |
| **Contribuintes (NEIP)** | Carlini (farmacologia); Henman (Tenetehara / autoridades); Luiz Mott (história BR); Alberto Zacarias Toron (sócio-jurídico); Pessoa Jr. (perspectivas de liberação). |
| **Tese de capa (catálogos)** | Controles culturais dos próprios usuários vs imposição externa sem entendimento do mundo cognitivo do consumidor. |

> **Hierarquia BudGanja:** sem a antologia de 1986 não há «Diamba Sarabamba» como objecto cultural inspecionável. Henman tem ficha própria em Pessoas; Carlini em Legado.

## A obra (síntese)

- Planta «diamba» apresentada como adaptada ao território BR — dos pampas à Amazónia (texto de apresentação em catálogos).  
- História da diamba acompanhada por observações sociológicas permeadas de preconceito e autoritarismo.  
- Evolução do discurso médico contraposta a argumentos libertários (antropologia, história, direito).  
- Não é manual de cultivo nem protocolo terapêutico: é **arquivo de debate** brasileiro.

## Tese cultural BudGanja (a partir do livro)

| Tema no volume | Tradução editorial |
|----------------|-------------------|
| Antologia-contraste | Auditar o arquivo (textos antigos + contemporâneos) — método de inspeção |
| «Diamba» no título | Elo com [maconha](${maconha}) e léxico popular BR |
| Controlo cultural vs autoridade | Distinguir norma vivida de proibição externa |
| Multidisciplinaridade | Farmacologia + história + direito + antropologia no mesmo volume |
| Pioneirismo 1986 | Marco editorial antes da onda contemporânea de livros/HQs canábicos |

O laboratório **não** adopta cada tese do volume: usa a coletânea como **marco de arquivo** e de debate público brasileiro.

## Elo com Pessoas e outras fichas

| Recurso | Papel |
|---------|-------|
| [Anthony Henman](${henman}) | Co-organizador âncora — método antropológico (Pessoas) |
| Osvaldo Pessoa Jr. | Co-organizador · ensaio de liberação — crédito no volume; sem ficha Pessoas nesta entrega |
| [maconha](${maconha}) | Palavras — léxico |
| [Carlini](${carlini}) | Legado — contribuinte farmacológico |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Palavras](${palavras}) · [Legado](${legado}) | Separar obra, pessoa, léxico e legado científico |

## Complementaridade com o Inspetor BudGanja

- Ler a ficha do **livro** antes da biografia do organizador.  
- Cruzar o arquivo 1986 com a ficha [maconha](${maconha}) e com [Carlini](${carlini}).  
- Hub [Artes](${hub}).

## Como repetir o método

1. Priorizar a **origem editorial** (ano, editora, organizadores).  
2. Organizador âncora em Pessoas com elo de volta à obra.  
3. Contribuinte Legado = ligação, não fusão de séries.  
4. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *Diamba Sarabamba* (1986) documentado como livro/coletânea; organizador âncora em [Anthony Henman](${henman}).
`;

  const contentEn = `## Scope

Editorial inspection of **Diamba Sarabamba** (*Coletânea de textos brasileiros sobre a maconha*) — 1986 Ground anthology organized by **Anthony Henman** and **Osvaldo Pessoa Jr.** The **beginning of everything** is the book. Anchor organizer biography: [Anthony Henman](${henman}) (People).

> **Method note:** independent audit from [NEIP](${neip}). Indexing ≠ endorsing every historical anti-cannabis text in the volume. Not the Daniel Paiva HQ *Diamba*. Contributor [Carlini](${carlini}) is Legacy; this sheet is Arts.

## Inspected object

| Field | Value |
|-------|-------|
| Work | **Diamba Sarabamba** (Ground, São Paulo, **1986**) |
| Organizers | [Anthony Henman](${henman}) · Osvaldo Pessoa Jr. |
| BudGanja type | Art — **book first** |
| Words link | [maconha](${maconha}) |
| Date | ${inspected} |

## Origin of the book (core)

Pioneer Brazilian cannabis studies anthology. Contrasts early-20th-century medical anti-cannabis texts with contemporary essays (Carlini, Henman/Tenetehara, Mott, Toron, Pessoa Jr.). Title echoes the folk chant “Ó diamba, sarabamba!”

## Lab thesis

| Theme | Gloss |
|-------|-------|
| Contrast anthology | Audit the archive — inspection method |
| Cultural control vs authority | Lived norms vs external ban |
| 1986 milestone | Editorial landmark for Brazilian debate |

## Status

**Approved in the Arts series** — 1986 book first; organizer in [Anthony Henman](${henman}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Diamba Sarabamba** (*Coletânea de textos brasileiros sobre a maconha*) — antología Ground **1986** organizada por **Anthony Henman** y **Osvaldo Pessoa Jr.** El **inicio de todo** es el libro. Biografía del organizador ancla: [Anthony Henman](${henman}) (Personas).

> **Nota metodológica:** auditoría independiente ([NEIP](${neip})). Indexar ≠ respaldar cada texto histórico antimachona del volumen. No confundir con la HQ *Diamba* de Daniel Paiva.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **Diamba Sarabamba** (Ground, 1986) |
| Organizadores | [Anthony Henman](${henman}) · Osvaldo Pessoa Jr. |
| Tipo BudGanja | Arte — **libro primero** |
| Palabras | [maconha](${maconha}) |
| Fecha | ${inspected} |

## Origen del libro (núcleo)

Antología pionera. Contrasta textos médicos del inicio del s. XX con ensayos contemporáneos. El título ecoa el canto popular «Ó diamba, sarabamba!».

## Estado

**Aprobada en la serie Artes** — libro de 1986 primero; organizador en [Anthony Henman](${henman}).
`;

  return { body, contentEn, contentEs, wiki: neip };
}

function buildDiambaSarabambaPost() {
  const { body, contentEn, contentEs, wiki } = buildDiambaSarabambaBodies();
  return artePost({
    title:
      'Inspeção: Diamba Sarabamba — a coletânea pioneira de 1986 sobre a maconha no Brasil',
    titleEn:
      'Inspection: Diamba Sarabamba — the pioneering 1986 Brazilian cannabis anthology',
    titleEs:
      'Inspección: Diamba Sarabamba — la antología pionera de 1986 sobre la marihuana en Brasil',
    excerpt:
      'Artes: Diamba Sarabamba (Ground, 1986) — coletânea de Henman e Pessoa Jr.; arquivo pioneiro do debate brasileiro sobre a diamba/maconha. Organizador em Pessoas.',
    excerptEn:
      'Arts: Diamba Sarabamba (Ground, 1986) — Henman & Pessoa Jr. anthology; pioneering archive of Brazilian cannabis debate. Organizer in People.',
    excerptEs:
      'Artes: Diamba Sarabamba (Ground, 1986) — antología de Henman y Pessoa Jr.; archivo pionero del debate brasileño. Organizador en Personas.',
    slug: 'inspecao-arte-diamba-sarabamba',
    date: '2026-08-01T20:00:00.000Z',
    seriesOrder: 6,
    seriesLabel: 'Diamba Sarabamba · Artes',
    coverImage: 'imagens/inspecoes/diamba-sarabamba-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildAUltimaCasaDeOpioBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const book = 'https://en.wikipedia.org/wiki/The_Last_Opium_Den';
  const tosches = '/posts/post-inspecao-figura-nick-tosches.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const diamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';

  const body = `## Escopo

Inspeção editorial de **«A Última Casa de Ópio»** (*The Last Opium Den*) — livro-reportagem / viagem de **Nick Tosches** (**2002**; origem em artigo da *Vanity Fair*). O **início de tudo** é o texto: a procura, na Ásia e na Europa, por uma casa de ópio que «já não existe», entrelaçada com história do comércio, usos medicinais e crítica à cultura do placebo. A biografia do autor fica em [Nick Tosches](${tosches}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipedia · The Last Opium Den](${book}). Crédito: Nick Tosches / Bloomsbury (EUA, 2002); ed. BR Conrad (2006, trad. Michelle A. Vartulli). Sem afiliação. **Não romantiza o uso de ópio nem de opiáceos.** Indexar ≠ endossar consumo. Distinto de Canais e de [Legado](${legado}). O ópio aqui é **objecto cultural e histórico** da reportagem — não protocolo de substâncias do laboratório.

Pares em Artes: [Diamba Sarabamba](${diamba}) (arquivo do debate BR) · [A História das Coisas](${historia}) (crítica do consumo-placebo).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **A Última Casa de Ópio** (*The Last Opium Den*) |
| Autor | [Nick Tosches](${tosches}) — biografia em Pessoas |
| Publicação original | **5 jan. 2002** · Bloomsbury USA (~72 p. 1.ª ed.) |
| Génese | Artigo / reportagem *Vanity Fair* → livro |
| Eco BR | Conrad Editora · **2006** (~98 p.) · ISBN 85-7616-165-6 |
| Género | Jornalismo investigativo · literatura de viagem · ensaio |
| Tipo BudGanja | Arte — **livro primeiro**; autor em Pessoas |
| Elo Pessoas | [Nick Tosches](${tosches}) |
| Elo Palavras | [passar](${passar}) — périplo, procura, travessia |
| Fonte de partida | [Wikipedia · The Last Opium Den](${book}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **relato de 2002** — a casa de ópio como figura de um mundo que a modernidade «consumista» esvaziou.  
**H2:** a viagem (Europa → Hong Kong → Tailândia → Camboja) é figura de [passar](${passar}).  
**H3:** a crítica aos placebos do consumo liga-se a [A História das Coisas](${historia}) sem fundir as fichas.

Passos:

1. Fixar origem (Vanity Fair → Bloomsbury 2002 → Conrad 2006).  
2. Declarar tese a partir do **livro**.  
3. Ligar Pessoas só por referência.  
4. Status — sem glamourizar substâncias.

## O início de tudo — génese do livro

Fonte: [Wikipedia · The Last Opium Den](${book}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Vanity Fair** | Peça de jornalismo — Tosches como contributing editor. |
| **2002** | Bloomsbury publica o livro curto; procura da «última» casa. |
| **Forma** | Viagem + história do comércio de ópio/heroína + notas medicinais (ex.: diabetes) + crítica cultural. |
| **2006 BR** | Conrad — circulação em português; eco em imprensa (Folha, etc.). |
| **Eco literário** | Wiki aponta *Confessions of an English Opium-Eater* (De Quincey) como vizinho temático — contexto, não ficha. |

> **Hierarquia BudGanja:** sem o texto de Tosches não há «Última Casa de Ópio» cultural. O autor tem ficha em Pessoas.

## A obra (síntese)

- Motivo declarado: fumar ópio «numa casa de ópio» — obsessão romântica confrontada com a alegada extinção do espaço.  
- Percurso geográfico e histórico: dens, comércio, conversão económica ópio→heroína.  
- Fecho cultural (eco em entrevistas BR): o perigo maior seriam os **placebos do consumismo** — quase tudo comprado como falsa plenitude.  
- Tom: prosa afiada, anti-«arte» como categoria vazia; não é manual nem apologia.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Casa de ópio | Figura de um rito lento / «magia» perdida — **literatura**, não receita |
| Procura mundial | [passar](${passar}) — travessia sem garantia de achado |
| Placebos do consumo | Crítica alinhável a [A História das Coisas](${historia}) |
| Ópio vs heroína | Ritmo lento vs aceleração mercadoria — observação cultural |
| «Homens ocos» | Acomodação sem prova — eco do método de inspeção |

O laboratório **não** adopta a cosmologia hedonista do narrador: usa o livro como **parábola de procura e crítica cultural**.

## Elo com Pessoas e outras fichas

| Recurso | Papel |
|---------|-------|
| [Nick Tosches](${tosches}) | Autor — ofício jornalístico/literário (Pessoas) |
| [passar](${passar}) | Palavras — viagem |
| [Diamba Sarabamba](${diamba}) | Artes — arquivo do debate sobre psicoativos |
| [A História das Coisas](${historia}) | Artes — máquina do consumo |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Palavras](${palavras}) | Separar obra, autor e léxico |

## Complementaridade com o Inspetor BudGanja

- Ler a ficha do **livro** antes da biografia.  
- Tratar substâncias no texto como **objecto cultural**, nunca como protocolo.  
- Hub [Artes](${hub}).

## Como repetir o método

1. Priorizar origem editorial (artigo → livro → tradução).  
2. Autor em Pessoas com elo de volta.  
3. Psicadélicos/opiáceos no texto = literatura, não dose.  
4. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *A Última Casa de Ópio* (2002) documentado como livro; autor em [Nick Tosches](${tosches}).
`;

  const contentEn = `## Scope

Editorial inspection of **The Last Opium Den** (*A Última Casa de Ópio*) — 2002 travel/investigative book by **Nick Tosches** (from a *Vanity Fair* piece). The **beginning of everything** is the book. Author: [Nick Tosches](${tosches}) (People).

> **Method note:** independent audit from [Wikipedia](${book}). **Does not romanticize opium use.** Indexing ≠ endorsement. Companion Arts: [Diamba Sarabamba](${diamba}), [The Story of Stuff](${historia}).

## Inspected object

| Field | Value |
|-------|-------|
| Work | **The Last Opium Den** (Bloomsbury, **2002**) |
| Author | [Nick Tosches](${tosches}) |
| BR edition | Conrad **2006** |
| BudGanja type | Art — **book first** |
| Words | [passar](${passar}) |
| Date | ${inspected} |

## Origin (core)

Vanity Fair article → Bloomsbury book. Global search for an opium den; history of trade; critique of consumer placebos.

## Status

**Approved in the Arts series** — 2002 book first; author in [Nick Tosches](${tosches}).
`;

  const contentEs = `## Alcance

Inspección editorial de **La última casa de opio** (*The Last Opium Den* / *A Última Casa de Ópio*) — libro-reportaje de **Nick Tosches** (**2002**). El **inicio de todo** es el libro. Autor: [Nick Tosches](${tosches}) (Personas).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${book})). **No romantiza el uso de opio.** Indexar ≠ respaldar.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **The Last Opium Den** (2002) |
| Autor | [Nick Tosches](${tosches}) |
| Tipo BudGanja | Arte — **libro primero** |
| Fecha | ${inspected} |

## Estado

**Aprobada en la serie Artes** — libro de 2002 primero; autor en [Nick Tosches](${tosches}).
`;

  return { body, contentEn, contentEs, wiki: book };
}

function buildAUltimaCasaDeOpioPost() {
  const { body, contentEn, contentEs, wiki } = buildAUltimaCasaDeOpioBodies();
  return artePost({
    title:
      'Inspeção: A Última Casa de Ópio — a procura de Tosches e a crítica ao placebo',
    titleEn:
      'Inspection: The Last Opium Den — Tosches’s quest and the critique of placebos',
    titleEs:
      'Inspección: La última casa de opio — la búsqueda de Tosches y la crítica al placebo',
    excerpt:
      'Artes: A Última Casa de Ópio (*The Last Opium Den*, 2002) — livro-reportagem de Nick Tosches; viagem, memória das dens e crítica ao consumismo. Autor em Pessoas. Sem romantizar ópio.',
    excerptEn:
      'Arts: The Last Opium Den (2002) — Tosches’s travel reportage; dens, memory and consumer critique. Author in People. Does not romanticize opium.',
    excerptEs:
      'Artes: A Última Casa de Ópio (2002) — reportaje de viaje de Tosches; dens, memoria y crítica al consumo. Autor en Personas. Sin romantizar el opio.',
    slug: 'inspecao-arte-a-ultima-casa-de-opio',
    date: '2026-08-01T21:00:00.000Z',
    seriesOrder: 7,
    seriesLabel: 'A Última Casa de Ópio · Artes',
    coverImage: 'imagens/inspecoes/a-ultima-casa-de-opio-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildAHistoriaDasCoisasBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wikiFilm = 'https://en.wikipedia.org/wiki/The_Story_of_Stuff';
  const wikiAuthor = 'https://en.wikipedia.org/wiki/Annie_Leonard';
  const zahar =
    'https://www.companhiadasletras.com.br/livro/9788537807286/a-historia-das-coisas';
  const leonard = '/posts/post-inspecao-figura-annie-leonard.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const opio = '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html';
  const diamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const ricos =
    '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';

  const body = `## Escopo

Inspeção editorial de **«A História das Coisas»** (*The Story of Stuff*) — livro de **Annie Leonard** (**2010**; ed. BR Zahar **2011**). O **objecto inspecionado** é o **livro**: aprofundamento escrito da economia linear extrair→fazer→descartar. O vídeo animado de **2007** entra como **génese mediática** do projecto — precursor que o livro expande, não substituto da ficha. A biografia da autora fica em [Annie Leonard](${leonard}) (série Pessoas). Refrain oral do lab: [Como os ricos transformam as coisas](${ricos}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · The Story of Stuff](${wikiFilm}) (filme/projecto), [Annie Leonard](${wikiAuthor}), ficha [Zahar / Companhia das Letras](${zahar}). Crédito: Annie Leonard / Free Press (Simon & Schuster, 2010); BR Zahar ISBN 978-85-378-0728-6. Sem afiliação. **Não confundir** com Canais YouTube genéricos nem com [Legado](${legado}) canábico. Sustentabilidade ≠ protocolo de plantas medicinais.

Pares em Artes: [A Última Casa de Ópio](${opio}) (crítica ao placebo) · [Diamba Sarabamba](${diamba}) (arquivo de debate).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra principal | **A História das Coisas** — *Da natureza ao lixo, o que acontece com tudo que consumimos* |
| Autora | [Annie Leonard](${leonard}) — biografia em Pessoas |
| Título EN | *The Story of Stuff: How Our Obsession with Stuff Is Trashing the Planet…* |
| Publicação original | **9 mar. 2010** · Free Press |
| Eco BR | Zahar · **1 nov. 2011** · ~304 p. · ISBN 978-85-378-0728-6 |
| Precursor | Vídeo animado *The Story of Stuff* (**4 dez. 2007**, ~20 min., Free Range Studios) |
| Género | Ensaio / não-ficção — economia dos materiais · sustentabilidade |
| Tipo BudGanja | Arte — **livro primeiro** (vídeo = génese do projecto) |
| Elo Pessoas | [Annie Leonard](${leonard}) |
| Elo Expressões | [Como os ricos transformam as coisas](${ricos}) — pergunta-mapa do ciclo |
| Elo Palavras | [passar](${passar}) — ciclo das coisas, o que se passa do minério ao lixo |
| Elo Derivados | [Cana-de-açúcar](${cana}) — exemplo de cadeia extrativa/industrial no hub |
| Fonte de partida | [Wikipedia · The Story of Stuff](${wikiFilm}) · [Zahar](${zahar}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja do **livro** é mapear a **máquina linear** (extração, produção, distribuição, consumo, descarte) com custos ocultos.  
**H2:** o vídeo 2007 é o **início mediático**; o livro 2010 é o **arquivo argumentativo** inspecionado aqui.  
**H3:** a crítica ao «stuff» ecoa a tese dos placebos em [A Última Casa de Ópio](${opio}) sem fundir as obras.

Passos:

1. Fixar livro (2010/2011) e declarar o vídeo como precursor.  
2. Tese a partir do **texto impresso**.  
3. Ligar Pessoas e Derivados por referência.  
4. Status.

## O início de tudo — génese do livro (e do projecto)

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Décadas de campo** | Leonard rastreia lixo internacional, incineração, economia de materiais (30+ países — registo editorial). |
| **4 dez. 2007** | Vídeo online (~20 min.) — fenómeno viral; Free Range Studios; narrativa de Annie. |
| **Projecto Story of Stuff** | Pedidos de aprofundamento → materiais educativos e novos curtas. |
| **9 mar. 2010** | Livro Free Press — cinco estágios + visão de mudança. |
| **2011 BR** | Zahar — circulação escolar/activista em português. |

> **Hierarquia BudGanja:** o vídeo inaugura o nome público; esta ficha inspeciona o **livro** como objecto Artes. A autora tem ficha em Pessoas.

## A obra (síntese)

- Cinco estágios: extração → produção → distribuição → consumo → descarte.  
- Crítica à obsolescência planeada e percebida; externalidades (saúde, comunidades, ecossistemas).  
- Exemplos de cadeias (algodão, alumínio, electrónicas, mineração…).  
- Fecho: ainda é possível mudar — reformas sistémicas + gestos individuais; tom optimista relativo.

## Tese cultural BudGanja (a partir do livro)

| Tema no texto | Tradução editorial |
|---------------|-------------------|
| Sistema linear num planeta finito | Auditar o ciclo completo — método de inspeção |
| Custos ocultos | O preço de prateleira não conta doença nem lixo |
| «Stuff» / coisas | Objectos como narrativa — elo com [passar](${passar}) |
| Vídeo → livro | Precursor mediático vs arquivo argumentativo |
| Elo consumo | Par com [A Última Casa de Ópio](${opio}) (placebos) e hub [Derivados](${derivados}) |

O laboratório **não** adopta o programa político completo da autora: usa o livro como **mapa pedagógico da economia dos materiais**.

## Elo com Pessoas e outras fichas

| Recurso | Papel |
|---------|-------|
| [Annie Leonard](${leonard}) | Autora — activismo e método de divulgação (Pessoas) |
| [Como os ricos transformam as coisas](${ricos}) | Expressões — refrão oral do ciclo / poder |
| [passar](${passar}) | Palavras — ciclo / travessia das coisas |
| [Cana-de-açúcar](${cana}) | Derivados — cadeia industrial de exemplo |
| [A Última Casa de Ópio](${opio}) · [Diamba Sarabamba](${diamba}) | Artes — consumo e arquivo |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Palavras](${palavras}) · [Derivados](${derivados}) | Separar obra, pessoa, léxico e cadeias |

## Complementaridade com o Inspetor BudGanja

- Preferir o **livro** para tese; o vídeo para introdução rápida.  
- Cruzar cadeias materiais com fichas de [Derivados](${derivados}).  
- Hub [Artes](${hub}).

## Como repetir o método

1. Se houver vídeo + livro, declarar **qual objecto** a ficha inspeciona.  
2. Autora em Pessoas com elo de volta.  
3. Sustentabilidade ≠ série Plantas/Legado.  
4. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — *A História das Coisas* (livro 2010/2011) documentado; autora em [Annie Leonard](${leonard}).
`;

  const contentEn = `## Scope

Editorial inspection of **The Story of Stuff** (*A História das Coisas*) — **2010** book by **Annie Leonard** (BR Zahar 2011). The inspected object is the **book**; the **2007** animated video is the project’s media precursor. Author: [Annie Leonard](${leonard}) (People).

> **Method note:** independent audit from [Wikipedia](${wikiFilm}) / [Zahar](${zahar}). Not cannabis Legacy. Companion Arts: [The Last Opium Den](${opio}).

## Inspected object

| Field | Value |
|-------|-------|
| Work | **The Story of Stuff** (Free Press, **2010**) |
| Author | [Annie Leonard](${leonard}) |
| Precursor | 2007 ~20 min animated film |
| BudGanja type | Art — **book first** |
| Date | ${inspected} |

## Origin (core)

Field work → viral 2007 film → 2010 book mapping extraction→production→distribution→consumption→disposal and a vision for change.

## Status

**Approved in the Arts series** — 2010 book; author in [Annie Leonard](${leonard}).
`;

  const contentEs = `## Alcance

Inspección editorial de **La historia de las cosas** (*The Story of Stuff* / *A História das Coisas*) — libro de **Annie Leonard** (**2010**; BR Zahar 2011). El objeto es el **libro**; el vídeo **2007** es precursor mediático. Autora: [Annie Leonard](${leonard}) (Personas).

> **Nota metodológica:** auditoría independiente ([Wikipedia](${wikiFilm})).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **The Story of Stuff** (2010) |
| Autora | [Annie Leonard](${leonard}) |
| Tipo BudGanja | Arte — **libro primero** |
| Fecha | ${inspected} |

## Estado

**Aprobada en la serie Artes** — libro de 2010; autora en [Annie Leonard](${leonard}).
`;

  return { body, contentEn, contentEs, wiki: zahar };
}

function buildAHistoriaDasCoisasPost() {
  const { body, contentEn, contentEs, wiki } = buildAHistoriaDasCoisasBodies();
  return artePost({
    title:
      'Inspeção: A História das Coisas — o livro de Leonard e a máquina extrair-fazer-descartar',
    titleEn:
      'Inspection: The Story of Stuff — Leonard’s book and the take-make-waste machine',
    titleEs:
      'Inspección: La historia de las cosas — el libro de Leonard y la máquina extraer-hacer-desechar',
    excerpt:
      'Artes: A História das Coisas (*The Story of Stuff*, 2010/2011) — livro de Annie Leonard sobre a economia linear das coisas; vídeo 2007 como precursor. Autora em Pessoas.',
    excerptEn:
      'Arts: The Story of Stuff (2010) — Annie Leonard’s book on the linear materials economy; 2007 video as precursor. Author in People.',
    excerptEs:
      'Artes: A História das Coisas (2010/2011) — libro de Annie Leonard sobre la economía lineal; vídeo 2007 como precursor. Autora en Personas.',
    slug: 'inspecao-arte-a-historia-das-coisas',
    date: '2026-08-01T21:30:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'A História das Coisas · Artes',
    coverImage: 'imagens/inspecoes/a-historia-das-coisas-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

const { buildDivertidamentePost } = require('./divertidamente-inspecoes-posts.js');
const { buildBarrigaDeTrigoPost } = require('./william-davis-inspecoes-posts.js');
const { buildVenomPost } = require('./venom-inspecao-post.js');
const { buildChavesProgramaPost } = require('./chaves-turma-inspecoes-posts.js');
const {
  buildCruzamentoRaivaVenomVidaDivertidaPost
} = require('./cruzamento-raiva-venom-vida-divertida-inspecao-post.js');
const { buildBomDiaInvernoPost } = require('./bom-dia-inverno-inspecao-post.js');
const { buildKillingInTheNamePost } = require('./killing-in-the-name-inspecao-post.js');
const { buildAllRightNowPost } = require('./all-right-now-inspecao-post.js');

const ARTES_INSPECOES_POSTS = [
  buildSendMeOnMyWayPost(),
  buildSoOsLoucosSabemPost(),
  buildTheMatrixPost(),
  buildAliceNoPaisDasMaravilhasPost(),
  buildODiaDoCuringaPost(),
  buildDiambaSarabambaPost(),
  buildAUltimaCasaDeOpioPost(),
  buildAHistoriaDasCoisasPost(),
  buildDivertidamentePost(),
  buildBarrigaDeTrigoPost(),
  buildVenomPost(),
  buildChavesProgramaPost(),
  buildCruzamentoRaivaVenomVidaDivertidaPost(),
  buildBomDiaInvernoPost(),
  buildKillingInTheNamePost(),
  buildAllRightNowPost()
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
  buildAliceNoPaisDasMaravilhasBodies,
  buildODiaDoCuringaPost,
  buildODiaDoCuringaBodies,
  buildDiambaSarabambaPost,
  buildDiambaSarabambaBodies,
  buildAUltimaCasaDeOpioPost,
  buildAUltimaCasaDeOpioBodies,
  buildAHistoriaDasCoisasPost,
  buildAHistoriaDasCoisasBodies,
  buildDivertidamentePost,
  buildBarrigaDeTrigoPost,
  buildVenomPost,
  buildChavesProgramaPost,
  buildCruzamentoRaivaVenomVidaDivertidaPost,
  buildBomDiaInvernoPost,
  buildKillingInTheNamePost,
  buildAllRightNowPost
};
