'use strict';

/**
 * Inspeção Artes · cinema / animação: Moana (2016).
 * Walt Disney Animation — Clements & Musker; oceano, vocação e caminho.
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

function buildMoanaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const plantas = '/plantas/';
  const wiki = 'https://pt.wikipedia.org/wiki/Moana_(filme)';
  const wikiEn = 'https://en.wikipedia.org/wiki/Moana_(2016_film)';
  const ytId = 'LKFuXEt8JUA';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const meneia = '/posts/post-inspecao-palavra-meneia.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do desenho animado **«Moana»** (*Moana*, **2016**) — longa-metragem musical da **Walt Disney Animation Studios**, realização de **Ron Clements** e **John Musker** (com co-direcção de Don Hall e Chris Williams). No Brasil o título oficial é **Moana**; em alguns países (ex. Portugal) circulou como **Vaiana**. O **recorte principal** é a **obra de 2016**: a jovem Moana, chamada pelo [mar](${mar}), [navega](${navegar}) para restaurar o coração de Te Fiti e salvar a sua ilha. *Moana 2* (2024) e o live-action anunciado ficam como **ecos** — fora do núcleo.

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [Wikipédia · Moana (filme)](${wiki}), [Wikipedia · Moana (2016 film)](${wikiEn}), trailer oficial ([Walt Disney Animation](${yt})). Crédito: Disney — **sem afiliação**. **Ficha ≠ tratado de mitologia polinésia** — a inspiraçao cultural é declarada; o laboratório **não** substitui vozes indígenas nem vende a marca. Animação = literacia de [caminho](${caminho}) e cuidado com a ilha ([plantas](${plantas}) / [Vida](${vida})).

Esta ficha é Artes · **cinema / desenho primeiro**. Rede lexical: [mar](${mar}) · [navegar](${navegar}) · [barco](${barco}) · [água](${agua}) · [caminho](${caminho}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Moana** (*Moana* / *Vaiana*) |
| Ano | **2016** |
| Realização | Ron Clements · John Musker (co-dir. Don Hall · Chris Williams) |
| Argumento | Jared Bush |
| Estúdio | Walt Disney Animation Studios |
| Música | Mark Mancina · canções Lin-Manuel Miranda · Opetaia Foaʻi |
| Protagonistas | Auliʻi Cravalho (Moana) · Dwayne Johnson (Maui) |
| Meio | Longa-metragem · animação · musical · aventura |
| Ambientação | Polinésia antiga (inspiração mitológica — não documentário) |
| Sequelas / ecos | *Moana 2* (2024) · live-action (anunciado) — **fora do recorte** |
| Tipo BudGanja | Arte — **desenho 2016** no ecrã; oceano e vocação como parábola |
| Elo Palavras | [mar](${mar}) · [navegar](${navegar}) · [barco](${barco}) · [água](${agua}) · [caminho](${caminho}) |
| Elo Legado / Vida | [Amyr Klink](${amyr}) · [Tamara Klink](${tamara}) · [Vida](${vida}) · [plantas](${plantas}) |
| Fonte | [Wikipédia · Moana](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **desenho de 2016** — a pergunta «quem és para além da praia segura?» — sem confundir com a franquia inteira.  
**H2:** o [mar](${mar}) não é só cenário: é **chamada** e parceiro de [navegar](${navegar}); o [barco](${barco}) é ferramenta do [gesto](${gesto}).  
**H3:** restaurar Te Fiti = cuidar da **ilha viva** — par cultural com [plantas](${plantas}) / [Vida](${vida}), sem forçar elo canábico.  
**H4:** a vocação de Moana ecoa o ofício de quem [navega](${navegar}) de verdade no Legado ([Amyr](${amyr}) · [Tamara](${tamara})) — parábola, não biografia.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor possível *neste* oceano, hoje.

Passos:

1. Fixar génese (2016, Clements & Musker, Disney Animation).  
2. Declarar tese: oceano · vocação · cuidado da ilha.  
3. Mapear elos Palavras / Vida / Legado.  
4. Embed do trailer.  
5. Separar sequelas.  
6. Status.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| Estúdio / realização | Walt Disney Animation · Clements & Musker |
| Estreia | **2016** (EUA nov.; circulação BR no mesmo ciclo comercial) |
| Núcleo narrativo | Moana deixa a ilha segura, encontra Maui, atravessa o oceano, devolve o coração a Te Fiti |
| Tom | Musical de aventura; humor; identidade e coragem sem «príncipe salvador» |
| Ecos | *Moana 2* (2024) e live-action — **não** substituem a entrada 2016 |

> **Hierarquia BudGanja:** sem o desenho de 2016 não há esta ficha. A franquia amplia; o método fixa a **génese animada**.

## A obra (síntese)

- Moana, filha do chefe, sente o chamado do oceano enquanto a ilha sofre uma praga.  
- Parte em [barco](${barco}) em busca de Maui; juntos enfrentam tempestades, criaturas e a própria dúvida.  
- Te Fiti / Te Kā: a deusa e a lava — cura da terra quando o coração regressa.  
- Mensagem que o laboratório guarda: **conhecer a própria rota** e **cuidar do lugar que alimenta** — [caminho](${caminho}) + [Vida](${vida}).

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Chamado do oceano | [mar](${mar}) / [água](${agua}) como convite, não só perigo |
| Deixar a praia | [caminho](${caminho}) — sair do conhecido com método |
| Navegar | Ofício: [navegar](${navegar}) · [barco](${barco}) · [gesto](${gesto}) / [meneia](${meneia}) do mar |
| Maui e a identidade | Poder sem memória de quem se é — inspecionar o mito de si |
| Ilha / Te Fiti | Cuidado da terra viva — [plantas](${plantas}) · [Vida](${vida}) |
| «How Far I'll Go» | Coragem calibrada — [Faça o melhor!](${mantra}) com o oceano que se tem |
| Sequela / live-action | Ecos comerciais; método = **2016 primeiro** |

## Elo com outras Artes e o laboratório

| Recurso | Papel |
|---------|-------|
| [Divertida Mente](${divertida}) | Outra animação Disney/Pixar de literacia (emoção × vocação — obras distintas) |
| [Alice](${alice}) | Entrar noutro mapa — curiosidade e travessia |
| [Amyr Klink](${amyr}) · [Tamara](${tamara}) | Navegação real no Legado — parábola, não cópia |
| [mar](${mar}) · [navegar](${navegar}) · [barco](${barco}) | Léxico oceânico já no site |
| Hub [Artes](${hub}) · [Palavras](${palavras}) · [Vida](${vida}) | Mapa |

## Trailer de referência

@youtube ${ytId}

| Campo | Valor |
|-------|-------|
| Título | Moana Official Trailer |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **desenho 2016**; âncora = [obra](${wiki}) |

## Avaliação BudGanja

### Forças
- Une oceano, vocação e cuidado da ilha numa parábola clara.  
- Cruza com o léxico já inspecionado ([mar](${mar}), [navegar](${navegar}), …).  
- Respeita a forma «desenho» que o público pede — animação como Artes séria.

### Limites
- Não é antropologia polinésia nem guia de navegação.  
- Não inventaria toda a franquia (*Moana 2*, parques, live-action).  
- Sem afiliação Disney.

## Como repetir o método

1. Fixar **génese** (título + ano + estúdio).  
2. Separar sequelas / remakes como eco.  
3. Declarar tese útil ao lab (sem forçar cannabis).  
4. Elos a Palavras / Vida / Legado com URLs reais.  
5. Slug \`inspecao-filme-…\`.

## Status

**Aprovado na série Artes** — *Moana* (2016) documentada como **desenho** de oceano, vocação e cuidado da ilha; elos [mar](${mar}) · [navegar](${navegar}) · [caminho](${caminho}) · [Faça o melhor!](${mantra}); sequelas como eco.

[▶ Artes](${hub}) · [▶ Mar](${mar}) · [▶ Navegar](${navegar}) · [▶ Caminho](${caminho}) · [▶ Vida](${vida}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the animated film **Moana** (**2016**) — Walt Disney Animation Studios, directed by **Ron Clements** and **John Musker**. Brazil title **Moana** (some countries: *Vaiana*). Main cut: the **2016** work — Moana answers the ocean’s call, sails to restore Te Fiti’s heart. *Moana 2* (2024) and live-action = **echoes**.

> **Method note:** independent audit. Sources: [Wikipedia · Moana (2016)](${wikiEn}), [PT](${wiki}), trailer (${yt}). Credit: Disney — no affiliation. Sheet ≠ Polynesian anthropology treatise.

## Object

| Field | Value |
|-------|-------|
| Work | **Moana** (2016) |
| Directors | Ron Clements · John Musker |
| Stars | Auliʻi Cravalho · Dwayne Johnson |
| Lab type | Art — **2016 animation**; ocean and vocation as parable |
| Word links | [mar](${mar}) · [navegar](${navegar}) · [barco](${barco}) · [caminho](${caminho}) |
| Date | ${inspected} |

## Lab thesis

Ocean as call · leaving the safe shore · craft of sailing · care for the living island · [Do your best!](${mantra}) with the sea you have. Parable beside [Amyr](${amyr}) / [Tamara](${tamara}) navigation — not biography.

@youtube ${ytId}

## Status

**Approved in Arts** — 2016 genesis first; sequels as echoes.

[▶ Arts](${hub}) · [▶ Mar](${mar}) · [▶ Navegar](${navegar}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección del dibujo animado **Moana** (**2016**) — Walt Disney Animation Studios, dirección de **Ron Clements** y **John Musker**. Título BR **Moana** (en algunos países *Vaiana*). Recorte principal: la obra **2016** — Moana responde al llamado del océano y navega para devolver el corazón de Te Fiti. *Moana 2* (2024) y live-action = **ecos**.

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia · Moana (2016)](${wikiEn}), [PT](${wiki}), tráiler (${yt}). Crédito: Disney — sin afiliación. Ficha ≠ tratado de mitología polinesia.

## Objeto

| Campo | Valor |
|-------|-------|
| Obra | **Moana** (2016) |
| Dirección | Ron Clements · John Musker |
| Tipo lab | Arte — **animación 2016**; océano y vocación como parábola |
| Vínculos | [mar](${mar}) · [navegar](${navegar}) · [barco](${barco}) · [caminho](${caminho}) |
| Fecha | ${inspected} |

## Tesis

Océano como llamado · dejar la playa segura · oficio de navegar · cuidar la isla viva · [¡Haz lo mejor!](${mantra}). Parábola junto a [Amyr](${amyr}) / [Tamara](${tamara}) — no biografía.

@youtube ${ytId}

## Estado

**Aprobada en Artes** — génesis 2016 primero; secuelas como eco.

[▶ Artes](${hub}) · [▶ Mar](${mar}) · [▶ Navegar](${navegar}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, ytId, wiki };
}

function buildMoanaPost(seriesOrder) {
  const { body, contentEn, contentEs, ytId, wiki } = buildMoanaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 46;
  return artePost({
    title: 'Inspeção: Moana — o desenho do oceano, da vocação e da ilha',
    titleEn: 'Inspection: Moana — the ocean, vocation, and the island cartoon',
    titleEs: 'Inspección: Moana — el dibujo del océano, la vocación y la isla',
    excerpt:
      'Artes · desenho: Moana (2016, Disney / Clements & Musker) — oceano, navegar e cuidado da ilha; elos mar/caminho/Vida; Faça o melhor!',
    excerptEn:
      'Arts · animation: Moana (2016, Disney / Clements & Musker) — ocean, sailing and island care; links mar/caminho/Vida; Do your best!',
    excerptEs:
      'Artes · dibujo: Moana (2016, Disney / Clements & Musker) — océano, navegar y cuidado de la isla; vínculos mar/caminho/Vida; ¡Haz lo mejor!',
    slug: 'inspecao-filme-moana',
    date: '2026-08-03T23:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Moana · Artes',
    coverImage: '/imagens/inspecoes/moana-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMoanaPost,
  buildMoanaBodies
};
