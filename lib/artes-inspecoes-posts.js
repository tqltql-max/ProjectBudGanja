'use strict';

/**
 * Inspeções «Artes»: filmes, séries, música, artes visuais e obras culturais
 * ligadas a plantas, linguagem ou ao ecossistema inspecionado.
 * Série: artes-cultura — tipagem no hub → 'arte'.
 *
 * Método: obra (título, ano, meio) → representação / tese cultural →
 * elos com Plantas / Palavras / Pessoas quando couber —
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

Inspeção editorial da canção **«Send Me On My Way»** (Rusted Root) — faixa de **boas-vindas / abertura da casa** na [BudGanja Radio](${radio}). O recorte não é biografia da banda nem inventário do canal VEVO: é auditar a **obra** e o papel que o laboratório lhe deu no player do site (\`js/radio-player.js\` → \`findWelcomeIndex\`).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia (EN)](${wiki}), videoclipe oficial [RustedRootVEVO](${yt}), playlist pública em [${radio}](${radio}). Crédito da obra pertence a Rusted Root / editores. Sem afiliação com a banda ou a Mercury/PolyGram. **Não confundir** com inspeção de Canais (YouTube) nem com a ficha [Chorão](${chorao}) (biografia); a segunda faixa da rádio tem ficha própria: [Só os Loucos Sabem](${loucos}).

Esta ficha é a **fundadora** da série **Artes**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Send Me On My Way** |
| Artista | Rusted Root |
| Meio | Canção / single (worldbeat · alternative / folk-rock) |
| Álbum âncora | *When I Woke* (1994); versão anterior em *Cruel Sun* (1992) |
| Single | 1994 (pico Billboard Hot 100: #72 em 1995) |
| Autoria (créditos públicos) | Michael Glabicki + membros da banda (ver wiki) |
| Tipo BudGanja | Arte — música · abertura da casa |
| Elo laboratório | [BudGanja Radio](${radio}) — faixa de boas-vindas ao abrir o site |
| Elo Palavras | [passar](${passar}) — viagem / «envie-me no meu caminho» |
| Faixa companheira na rádio | [Só os Loucos Sabem](${loucos}) (Charlie Brown Jr.) · biografia em [Chorão](${chorao}) |
| Fonte de partida | [Wikipedia · Send Me On My Way](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja desta obra é **funcional e simbólico**: é a música que o laboratório escolheu para **abrir a casa** (sessão fresca no mini-player / rádio).  
**H2:** a letra e o imaginário de caminho / partida cruzam com a série [Palavras](${palavras}) via [passar](${passar}) — elo metodológico, não etimológico inglês→português.  
**H3:** a presença em cinema/TV (*Matilda*, *Ice Age*, etc.) explica a memória colectiva da faixa; o laboratório **não** replica essa filmografia — só a regista como contexto cultural.

Passos (repetíveis na série Artes):

1. Identificar obra, ano, meio e créditos com fonte pública.  
2. Declarar o **uso BudGanja** (aqui: abertura da rádio).  
3. Cruzar com [Palavras](${palavras}) / [Pessoas](${pessoas}) / \`/plantas/\` quando couber.  
4. Separar obra de biografia e de canal YouTube.  
5. Status + fila.

## A obra (síntese)

- Worldbeat / rock alternativo dos anos 90 (Pittsburgh); single de *When I Woke*.  
- Videoclipe de Sean Alquist, Badlands da Dakota do Sul (finais de 1994); remaster HD no [VEVO](${yt}).  
- Uso cultural ampliado (filmes, séries, anúncios; wake-up music da NASA/Opportunity Sol 21 — segundo a wiki).  
- Tom: optimismo e caminho — «envie-me no meu caminho».

## Uso no laboratório — abertura da casa

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Player | Mini-player global + página da rádio |
| Critério de selecção | Título contém *Rusted Root* + *Send Me On My Way* (\`findWelcomeIndex\`) |
| Momento | Sessão fresca ao abrir o site (browser pode exigir 1.º clique) |
| Playlist | \`radio/playlist.json\` — MP3 local da faixa VEVO |

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

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Ouvir na [BudGanja Radio](${radio}) enquanto se navega no laboratório.  
- Cruzar com [passar](${passar}), [Só os Loucos Sabem](${loucos}) e [Chorão](${chorao}).  
- Hub [Artes](${hub}) — fila de filmes/séries/outras obras.

## Como repetir o método

1. Escolher uma obra (filme, série, canção, exposição).  
2. Fixar créditos e ano com fonte.  
3. Declarar se há **uso no site** (rádio, capa, citação) ou só análise cultural.  
4. Ligar a Palavras / Pessoas / Plantas quando o elo for claro.  
5. Publicar com slug \`inspecao-arte-…\` / \`inspecao-filme-…\` / \`inspecao-serie-…\`.

## Status

**Aprovado como ficha fundadora Artes** — obra musical de abertura da BudGanja Radio, com elos documentados à rádio e à série Palavras. Recomendado ouvir em [${radio}](${radio}) e contrastar com a faixa CBJr da mesma playlist.
`;

  const contentEn = `## Scope

Editorial inspection of **"Send Me On My Way"** (Rusted Root) — the **welcome / house-opening** track on [BudGanja Radio](${radio}). This is not a band biography or a VEVO channel inventory: it audits the **work** and the role the lab gave it in the site player (\`js/radio-player.js\` → \`findWelcomeIndex\`).

> **Method note:** independent audit. Sources: [Wikipedia (EN)](${wiki}), official video [RustedRootVEVO](${yt}), public playlist at [${radio}](${radio}). Credit belongs to Rusted Root / rights holders. No affiliation. **Do not confuse** with Channel inspections or the [Chorão](${chorao}) sheet (another track on the same radio).

Founding sheet of the **Arts** series.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Send Me On My Way** |
| Artist | Rusted Root |
| Medium | Song / single (worldbeat · alternative / folk-rock) |
| Anchor album | *When I Woke* (1994); earlier version on *Cruel Sun* (1992) |
| Single | 1994 (Billboard Hot 100 peak #72 in 1995) |
| BudGanja type | Art — music · house opening |
| Lab link | [BudGanja Radio](${radio}) — welcome track on fresh session |
| Words link | [passar](${passar}) — journey / “send me on my way” |
| Companion radio track | Charlie Brown Jr. — *Só os Loucos Sabem* (see [Chorão](${chorao})) |
| Inspection date | ${inspected} |

## Hypotheses and method

**H1:** BudGanja value is **functional and symbolic**: the song chosen to **open the house**.  
**H2:** path/departure imagery crosses [Words](${palavras}) via [passar](${passar}) — methodological, not a literal EN→PT etymology.  
**H3:** film/TV afterlife (*Matilda*, *Ice Age*, etc.) explains collective memory; the lab does not replicate that filmography.

## The work (brief)

- 1990s worldbeat / alt-rock single from *When I Woke*.  
- Video by Sean Alquist (South Dakota Badlands, late 1994); HD remaster on [VEVO](${yt}).  
- Broader culture uses (films, series, ads; NASA/Opportunity wake-up music Sol 21 — per wiki).

## Lab use — opening the house

| Field | Value |
|-------|-------|
| Page | [${radio}](${radio}) |
| Selection | Title matches Rusted Root + Send Me On My Way (\`findWelcomeIndex\`) |
| Moment | Fresh session on site open (browser may require first click) |
| Playlist | \`radio/playlist.json\` — local MP3 of the VEVO track |

## Reference video

@youtube ${ytId}

## Status

**Approved as founding Arts sheet** — house-opening track of BudGanja Radio, with documented links to the radio and the Words series.
`;

  const contentEs = `## Alcance

Inspección editorial de **«Send Me On My Way»** (Rusted Root) — la pista de **bienvenida / apertura de la casa** en [BudGanja Radio](${radio}). No es biografía de la banda ni inventario del canal VEVO: audita la **obra** y el papel que el laboratorio le dio en el player (\`js/radio-player.js\` → \`findWelcomeIndex\`).

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia (EN)](${wiki}), videoclip oficial [RustedRootVEVO](${yt}), playlist pública en [${radio}](${radio}). Crédito de la obra a Rusted Root / editores. Sin afiliación. **No confundir** con Canales ni con la ficha [Chorão](${chorao}).

Ficha fundadora de la serie **Artes**.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Send Me On My Way** |
| Artista | Rusted Root |
| Medio | Canción / single (worldbeat · alternative / folk-rock) |
| Álbum ancla | *When I Woke* (1994); versión anterior en *Cruel Sun* (1992) |
| Tipo BudGanja | Arte — música · apertura de la casa |
| Vínculo laboratorio | [BudGanja Radio](${radio}) — pista de bienvenida |
| Vínculo Palabras | [passar](${passar}) — viaje / «envíame en mi camino» |
| Pista compañera | Charlie Brown Jr. — *Só os Loucos Sabem* (ver [Chorão](${chorao})) |
| Fecha de inspección | ${inspected} |

## Hipótesis y método

**H1:** el valor BudGanja es **funcional y simbólico**: la música elegida para **abrir la casa**.  
**H2:** el imaginario de camino cruza [Palabras](${palavras}) vía [passar](${passar}).  
**H3:** el uso en cine/TV explica la memoria colectiva; el laboratorio no replica esa filmografía.

## Uso en el laboratorio

Selección por título en \`findWelcomeIndex\`; sesión fresca al abrir el sitio; MP3 en \`radio/playlist.json\`.

## Vídeo de referencia

@youtube ${ytId}

## Estado

**Aprobada como ficha fundadora Artes** — pista de apertura de BudGanja Radio, con vínculos a la radio y a la serie Palabras.
`;

  return { body, contentEn, contentEs, ytId, vevo, wiki };
}

function buildSendMeOnMyWayPost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildSendMeOnMyWayBodies();
  return artePost({
    title: 'Inspeção: Send Me On My Way — Rusted Root e abertura da BudGanja Radio',
    titleEn: 'Inspection: Send Me On My Way — Rusted Root and BudGanja Radio opening',
    titleEs: 'Inspección: Send Me On My Way — Rusted Root y apertura de BudGanja Radio',
    excerpt:
      'Ficha fundadora da série Artes: a canção de boas-vindas da casa na BudGanja Radio — obra, uso no player e elos com Palavras (passar) e a segunda faixa CBJr da playlist.',
    excerptEn:
      'Founding Arts sheet: the house welcome song on BudGanja Radio — work, player use, and links to Words (passar) and the second CBJr playlist track.',
    excerptEs:
      'Ficha fundadora de Artes: la canción de bienvenida de la casa en BudGanja Radio — obra, uso en el player y vínculos con Palabras (passar) y la segunda pista CBJr de la playlist.',
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

Inspeção editorial da canção **«Só os Loucos Sabem»** (Charlie Brown Jr.) — **segunda faixa** da [BudGanja Radio](${radio}), na versão **ao vivo** do álbum póstumo *[Chegou Quem Faltava](${wikiAlbum})* (show de 19 mar. 2011; lançamento 2021). O recorte é a **obra** e o seu lugar na playlist da casa — **não** a biografia do letrista (já em [Chorão](${chorao})).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Chegou Quem Faltava](${wikiAlbum}), videoclipe ao vivo [charliebrownjrVEVO](${yt}), playlist em [${radio}](${radio}). Crédito da obra: Charlie Brown Jr. / Sony Music. Sem afiliação. **Não romantiza overdose nem dependência.** Distinto de Canais (YouTube) e da ficha Pessoas.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Só os Loucos Sabem** |
| Artista | Charlie Brown Jr. |
| Meio | Canção · versão ao vivo (rádio BudGanja) |
| Estúdio (origem) | *Camisa 10 Joga Bola Até na Chuva* (2009) — [wiki](${wikiCamisa}) |
| Registo na rádio | Ao vivo — *Chegou Quem Faltava* (Citibank Hall, SP, 19/03/2011; álbum 2021) |
| Autoria citada | Chorão / Thiago Castanho (créditos públicos do single ao vivo) |
| Formação no show | Chorão, Thiago Castanho, Heitor Gomes, Bruno Graveto |
| Tipo BudGanja | Arte — música · segunda faixa da casa |
| Elo laboratório | [BudGanja Radio](${radio}) — faixa 2 da playlist |
| Elo Pessoas | [Chorão](${chorao}) — letrista (biografia; não duplicar aqui) |
| Elo Artes (par) | [Send Me On My Way](${sendMe}) — abertura da casa |
| Elo Palavras | [maconha](${maconha}) — via cultura da letra / [Palavras](${palavras}) |
| Fonte de partida | [Wikipedia · Chegou Quem Faltava](${wikiAlbum}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja desta faixa é **atmosférico e cultural**: segunda voz da casa depois da abertura internacional ([Send Me On My Way](${sendMe})).  
**H2:** a versão **ao vivo** (2011/2021) é o objecto da rádio — memória de palco com Chorão, não só o single de estúdio de 2009.  
**H3:** a biografia e o método da letra ficam em [Chorão](${chorao}) / [Palavras](${palavras}); aqui inspeciona-se a **canção como obra** e o **uso na playlist**.

Passos (variante «faixa da rádio»):

1. Identificar título, álbum-âncora e versão (estúdio vs ao vivo).  
2. Declarar posição na [BudGanja Radio](${radio}).  
3. Ligar a Pessoas só por referência (sem repetir biografia).  
4. Embed do vídeo oficial da mesma versão.  
5. Status.

## A obra (síntese)

- Canção do repertório CBJr; origem em *Camisa 10…* (2009).  
- Na casa: MP3 da versão **Ao Vivo – Chegou Quem Faltava** (VEVO), alinhada ao álbum póstumo de 2021.  
- Show gravado em São Paulo (Citibank Hall) com a formação Camisa 10; lançamento atrasado e recuperado via Sony / herdeiros (contexto wiki).  
- Tom: recomeço, paz, memória entre irmãos — refrão de rock brasileiro dos 2000/2010.

## Uso no laboratório — segunda faixa da casa

| Campo | Valor |
|-------|-------|
| Página | [${radio}](${radio}) |
| Posição | Segunda faixa do catálogo \`radio/playlist.json\` (ordem natural do build) |
| Par de abertura | [Send Me On My Way](${sendMe}) (\`findWelcomeIndex\` — boas-vindas) |
| Ficheiro | MP3 local · charliebrownjrVEVO (youtube) |

> A rádio não inventaria o catálogo CBJr: fixa **esta** gravação como companheira da abertura Rusted Root.

## Elo com Pessoas e Palavras

| Recurso | Papel |
|---------|-------|
| [Chorão](${chorao}) | Biografia / método da letra — série Pessoas |
| [maconha](${maconha}) / [Palavras](${palavras}) | Vocabulário e cultura urbana já mapeados na ficha Pessoas |
| Hub [Pessoas](${pessoas}) | Não duplicar: obra ≠ pessoa |

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | Charlie Brown Jr. — Só os Loucos Sabem (Ao Vivo - Chegou Quem Faltava) |
| Canal | charliebrownjrVEVO |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Ouvir o par completo na [BudGanja Radio](${radio}).  
- Abrir [Send Me On My Way](${sendMe}) (faixa 1) e [Chorão](${chorao}) (pessoa).  
- Hub [Artes](${hub}).

## Como repetir o método

1. Escolher a faixa exacta (versão) que está na rádio.  
2. Separar obra de biografia.  
3. Ligar à faixa-par e a Pessoas/Palavras por referência.  
4. Slug \`inspecao-arte-…\`.

## Status

**Aprovado na série Artes** — segunda música da BudGanja Radio documentada; biografia do letrista permanece em [Chorão](${chorao}).
`;

  const contentEn = `## Scope

Editorial inspection of **"Só os Loucos Sabem"** (Charlie Brown Jr.) — **second track** on [BudGanja Radio](${radio}), in the **live** version from *[Chegou Quem Faltava](${wikiAlbum})* (show 19 Mar 2011; album 2021). Focus is the **work** and its place in the house playlist — **not** the lyricist biography (see [Chorão](${chorao})).

> **Method note:** independent audit. Sources: [Wikipedia](${wikiAlbum}), live video [charliebrownjrVEVO](${yt}), playlist at [${radio}](${radio}). **Does not romanticize overdose.** Distinct from Channels and People sheets.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Só os Loucos Sabem** |
| Artist | Charlie Brown Jr. |
| Studio origin | *Camisa 10 Joga Bola Até na Chuva* (2009) |
| Radio version | Live — *Chegou Quem Faltava* |
| BudGanja type | Art — music · second house track |
| Lab link | [BudGanja Radio](${radio}) |
| People link | [Chorão](${chorao}) |
| Arts pair | [Send Me On My Way](${sendMe}) |
| Date | ${inspected} |

## Hypotheses

**H1:** atmospheric/cultural value as second voice of the house after the welcome track.  
**H2:** the **live** cut is the radio object — stage memory with Chorão.  
**H3:** biography stays in People; this sheet audits the **song as work**.

## Lab use

Second catalog track in \`radio/playlist.json\`; pair with [Send Me On My Way](${sendMe}).

## Reference video

@youtube ${ytId}

## Status

**Approved in the Arts series** — second BudGanja Radio track; lyricist biography remains in [Chorão](${chorao}).
`;

  const contentEs = `## Alcance

Inspección editorial de **«Só os Loucos Sabem»** (Charlie Brown Jr.) — **segunda pista** de [BudGanja Radio](${radio}), en la versión **en vivo** de *[Chegou Quem Faltava](${wikiAlbum})* (show 19 mar. 2011; álbum 2021). El recorte es la **obra** y su lugar en la playlist — **no** la biografía del letrista ([Chorão](${chorao})).

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia](${wikiAlbum}), vídeo [charliebrownjrVEVO](${yt}), playlist en [${radio}](${radio}). **No romantiza la overdose.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Só os Loucos Sabem** |
| Artista | Charlie Brown Jr. |
| Origen estudio | *Camisa 10 Joga Bola Até na Chuva* (2009) |
| Versión radio | En vivo — *Chegou Quem Faltava* |
| Tipo BudGanja | Arte — música · segunda pista de la casa |
| Vínculo laboratorio | [BudGanja Radio](${radio}) |
| Personas | [Chorão](${chorao}) |
| Par Artes | [Send Me On My Way](${sendMe}) |
| Fecha | ${inspected} |

## Uso en el laboratorio

Segunda pista de \`radio/playlist.json\`; par con [Send Me On My Way](${sendMe}).

## Vídeo de referencia

@youtube ${ytId}

## Estado

**Aprobada en la serie Artes** — segunda canción de BudGanja Radio; la biografía del letrista permanece en [Chorão](${chorao}).
`;

  return { body, contentEn, contentEs, ytId, wikiAlbum };
}

function buildSoOsLoucosSabemPost() {
  const { body, contentEn, contentEs, ytId, wikiAlbum } = buildSoOsLoucosSabemBodies();
  return artePost({
    title: 'Inspeção: Só os Loucos Sabem — Charlie Brown Jr. e a segunda faixa da rádio',
    titleEn: 'Inspection: Só os Loucos Sabem — Charlie Brown Jr. and the radio’s second track',
    titleEs: 'Inspección: Só os Loucos Sabem — Charlie Brown Jr. y la segunda pista de la radio',
    excerpt:
      'Artes: segunda música da BudGanja Radio — versão ao vivo Chegou Quem Faltava; obra na playlist, distinta da biografia em Chorão e par da abertura Rusted Root.',
    excerptEn:
      'Arts: second BudGanja Radio track — live Chegou Quem Faltava cut; playlist work, distinct from the Chorão biography and paired with the Rusted Root opener.',
    excerptEs:
      'Artes: segunda canción de BudGanja Radio — versión en vivo Chegou Quem Faltava; obra en la playlist, distinta de la biografía en Chorão y par de la apertura Rusted Root.',
    slug: 'inspecao-arte-so-os-loucos-sabem',
    date: '2026-08-01T14:30:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Só os Loucos Sabem · Artes',
    coverImage: 'imagens/inspecoes/so-os-loucos-sabem-cover.jpg',
    sourceUrl: wikiAlbum,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

const ARTES_INSPECOES_POSTS = [buildSendMeOnMyWayPost(), buildSoOsLoucosSabemPost()];

module.exports = {
  ARTES_INSPECOES_POSTS,
  artePost,
  buildSendMeOnMyWayPost,
  buildSendMeOnMyWayBodies,
  buildSoOsLoucosSabemPost,
  buildSoOsLoucosSabemBodies
};
