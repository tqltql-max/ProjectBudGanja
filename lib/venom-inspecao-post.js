'use strict';

/**
 * Inspeção Artes · cinema: Venom (2018, Ruben Fleischer / Tom Hardy).
 * Hierarquia: personagem Marvel (BD) → filme Sony SSU 2018 como entrada cinematográfica.
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

function buildVenomBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/Venom_(filme_de_2018)';
  const wikiEn = 'https://en.wikipedia.org/wiki/Venom_(2018_film)';
  const comicsEn = 'https://en.wikipedia.org/wiki/Venom_(character)';
  const ytId = 'u9Mv98Gr5pY';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';

  const body = `## Escopo

Inspeção editorial do filme **«Venom»** (**2018**). O **recorte principal** é a **obra cinematográfica** — realização de **Ruben Fleischer**, com **Tom Hardy** como Eddie Brock / Venom; primeiro filme do *Sony's Spider-Man Universe* (SSU). A **origem cultural** do personagem é anterior: **Venom** nasce nos **comics Marvel** (simbionte + Eddie Brock) — a BD é a génese do objecto; o filme é a **entrada Sony** que popularizou o duo para um público novo.

> **Nota metodológica:** auditoria independente. Fonte âncora: [Wikipédia · Venom (filme de 2018)](${wiki}); complementar [Wikipedia (EN)](${wikiEn}), personagem [Venom (character)](${comicsEn}), trailer oficial (${yt}). Crédito: Columbia / Marvel Entertainment / Sony — sem afiliação. **Não confundir** com Canais (YouTube) nem com [Legado](${legado}) canábico. Simbiose, «nós» e anti-herói são **figuras narrativas** — o laboratório **não** romantiza violência, invasão nem consumo de substâncias.

Esta ficha é Artes · **cinema**. Sequelas (*Let There Be Carnage*, *The Last Dance*) ficam como **ecos** — fora do recorte principal de 2018.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Venom** |
| Ano | **2018** (estreia EUA 5 out.; Brasil 4 out.) |
| Realização | **Ruben Fleischer** |
| Argumento | Jeff Pinkner, Scott Rosenberg, Kelly Marcel |
| Meio | Longa-metragem · super-herói / ficção científica / acção |
| Produção | Columbia Pictures / Marvel Entertainment (SSU) |
| Elenco âncora | Tom Hardy (Eddie / Venom), Michelle Williams, Riz Ahmed (Carlton Drake / Riot), Scott Haze, Reid Scott |
| Origem cultural (pré-filme) | Personagem Marvel — simbionte Venom + Eddie Brock (comics) |
| Sequelas (eco) | *Venom: Let There Be Carnage* (2021) · *Venom: The Last Dance* (2024) |
| Tipo BudGanja | Arte — **filme 2018** no ecrã; **comics** como génese do personagem |
| Elo laboratório | Simbiose / «nós» como parábola de **coabitação de impulsos** e responsabilidade partilhada |
| Fonte de partida | [Wikipédia · filme 2018](${wiki}) · [EN](${wikiEn}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja do **filme** começa na estreia **2018** (Fleischer / Hardy / SSU) — a pergunta «quem manda no corpo?» — sem confundir com a filmografia inteira do actor.  
**H2:** a **génese do personagem** está nos **comics**; o cinema adapta e desloca (SSU, sem Spider-Man no centro da trama). Hierarquia: **personagem BD → filme**.  
**H3:** «We are Venom» / «nós» entra na linguagem popular como metáfora de **duas vozes no mesmo corpo**; no laboratório trata-se como figura de **escuta interna e limite**, não como conselho clínico — par cultural leve com [Divertida Mente](${divertida}) / [emoção](${emocao}) (vozes interiores), sem fundir obras.  
**H4:** o anti-herói «protetor letal» é parábola de **poder sem narrativa de pureza** — próximo do hábito de [Matrix](${matrix}) (verificar o que se apresenta como herói/vilão), sem adoptar cosmologia Marvel.

Passos:

1. Fixar **origem do personagem** (comics) e **génese do filme** (2018).  
2. Declarar a **tese cultural** (simbiose, agência partilhada, anti-herói).  
3. Situar trailer e elos Artes.  
4. Separar obra de sequelas e de biografia do actor.  
5. Status + fila.

## O início de tudo — personagem e filme

Fontes: [filme PT](${wiki}) · [filme EN](${wikiEn}) · [personagem](${comicsEn}).

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Comics (génese do personagem)** | Venom = simbionte alienígena + hospedeiro (Eddie Brock na linha clássica); nasce no universo Spider-Man Marvel — **antes** do filme Sony. |
| **Desenvolvimento Sony** | Longa autónomo no SSU; realização **Ruben Fleischer**; Hardy como Eddie/Venom. |
| **4–5 out. 2018** | Estreias Brasil / EUA (calendário de lançamento comercial). |
| Argumento (núcleo) | Jornalista em crise liga-se a um simbionte; ganha poderes; enfrenta Drake / Riot e a ameaça de invasão da espécie. |
| Tom cultural | Humor negro, corpo partilhado, anti-herói — «protetor letal» mais do que capa brilhante. |
| Sequelas | Continuidades 2021 / 2024 — **ecos**; não substituem a entrada de 2018. |

> **Hierarquia BudGanja:** sem o personagem nos comics, não há Venom cultural. Sem o filme de 2018, não há esta **entrada SSU** inspecionada aqui. BD → ecrã.

## A obra (síntese)

- Eddie Brock, jornalista abalado, torna-se hospedeiro de Venom; a relação oscila entre parasitismo, aliança e identidade partilhada («nós»).  
- Antagonista âncora: Carlton Drake / Riot — outro simbionte, projecto corporativo e ameaça planetária.  
- Impacto: bilheteira forte; memes do «nós»; franquia SSU com sequelas.  
- Tom: acção + comédia estranha; o laboratório guarda a **pergunta da coabitação**, não a estética da violência.

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Simbiose hospedeiro / simbionte | Parceria forçada ou negociada — quem decide? · ficha [simbiose](/posts/post-inspecao-palavra-simbiose.html) |
| «Nós» / duas vozes | Escutar impulsos sem entregar o volante a um só |
| Anti-herói | Poder sem pureza; inspecionar o rótulo «herói» |
| Corporação / experiência | Narrativa que vende progresso sem prova — verificar |
| Sequelas e franquia | Ecos comerciais; o método fixa a **entrada 2018** |

O laboratório **não** adopta a cosmologia Marvel: usa o filme como **parábola de agência partilhada e limite** — a inspeção é o oposto de «deixar o outro mandar sem acordo».

## Elo com outras Artes (secundário)

| Recurso | Papel |
|---------|-------|
| [The Matrix](${matrix}) | Verificar o que se apresenta como real / herói |
| [Divertida Mente](${divertida}) · [emoção](${emocao}) | Vozes interiores (par cultural, obras distintas) |
| Hub [Artes](${hub}) | Filme ≠ sequela ≠ biografia do actor |

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | VENOM - Official Trailer (HD) |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **filme**; a fonte âncora continua a ser a [obra](${wiki}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pela **génese** (personagem comics → filme 2018); sequelas só como eco.  
- Cruzar «duas vozes / um corpo» com literacia emocional ([Divertida Mente](${divertida})) sem misturar enredos.  
- Hub [Artes](${hub}) · opcional [Palavras](${palavras}).

## Como repetir o método

1. Quando inspecionar Artes, **priorizar a génese** (BD / livro / canção / filme) antes da franquia inteira.  
2. Escolher o **filme** (título + ano), não a filmografia do actor.  
3. Separar personagem prévio, adaptação e sequelas.  
4. Declarar tese cultural útil ao laboratório (sem forçar elo canábico).  
5. Slug \`inspecao-filme-…\`.

## Status

**Aprovado na série Artes** — *Venom* (2018) documentado com **comics → filme SSU** como hierarquia; sequelas como eco; Tom Hardy como elenco âncora, não como origem da obra.
`;

  const contentEn = `## Scope

Editorial inspection of **Venom** (2018). The **main cut** is the **film** — directed by **Ruben Fleischer**, starring **Tom Hardy** as Eddie Brock / Venom; first entry in Sony's Spider-Man Universe (SSU). The **character’s cultural origin** is earlier: Marvel **comics**. Hierarchy: **comics character → 2018 film**.

> **Method note:** independent audit. Anchor: [Wikipedia · Venom (2018 film)](${wikiEn}); PT: [filme](${wiki}). Credit: Columbia / Marvel / Sony. Symbiosis and “we” are **narrative figures** — the lab does **not** romanticize violence or substance use.

## Inspected object

| Field | Value |
|-------|-------|
| Title | **Venom** |
| Year | **2018** (US premiere 5 Oct; Brazil 4 Oct) |
| Director | **Ruben Fleischer** |
| BudGanja type | Art — **2018 film** on screen; **comics** as character genesis |
| Date | ${inspected} |

## Origin (core)

| Milestone | Note |
|-----------|------|
| **Comics** | Venom symbiote + Eddie Brock — before the Sony film. |
| **2018** | Fleischer / Hardy / SSU entry. |
| Sequels | 2021 / 2024 — echoes only. |

**Hierarchy:** without the comics character there is no cultural Venom; without 2018 there is no this SSU entry.

## Lab thesis

Shared agency (“we”); anti-hero without a purity story; inspect corporate “progress” claims. Parable of cohabitation and limits — not Marvel cosmology.

@youtube ${ytId}

## Status

**Approved in the Arts series** — comics → 2018 film hierarchy; sequels as echoes.
`;

  const contentEs = `## Alcance

Inspección editorial de **Venom** (**2018**). El **recorte principal** es la **obra cinematográfica** — dirección de **Ruben Fleischer**, con **Tom Hardy** como Eddie Brock / Venom; primer filme del SSU de Sony. El **origen cultural** del personaje es anterior: los **cómics Marvel**. Jerarquía: **personaje BD → filme 2018**.

> **Nota metodológica:** auditoría independiente. Fuente ancla: [Wikipedia · Venom (2018 film)](${wikiEn}); PT: [filme](${wiki}). La simbiosis y el «nosotros» son **figuras narrativas** — el laboratorio **no** romantiza la violencia ni el consumo de sustancias.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Título | **Venom** |
| Año | **2018** (estreno EE.UU. 5 oct.; Brasil 4 oct.) |
| Dirección | **Ruben Fleischer** |
| Tipo BudGanja | Arte — **filme 2018**; **cómics** como génesis del personaje |
| Fecha | ${inspected} |

## Origen (núcleo)

| Hito | Nota |
|------|------|
| **Cómics** | Simbionte Venom + Eddie Brock — antes del filme Sony. |
| **2018** | Entrada Fleischer / Hardy / SSU. |
| Secuelas | 2021 / 2024 — ecos. |

**Jerarquía:** sin el personaje de cómics no hay Venom cultural; sin 2018 no hay esta entrada SSU.

## Vídeo de referencia

@youtube ${ytId}

## Estado

**Aprobada en la serie Artes** — jerarquía cómics → filme 2018; secuelas como eco.
`;

  return { body, contentEn, contentEs, ytId, wiki };
}

function buildVenomPost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildVenomBodies();
  return artePost({
    title: 'Inspeção: Venom — o filme de 2018, a simbiose e o «nós»',
    titleEn: 'Inspection: Venom — the 2018 film, symbiosis and “we”',
    titleEs: 'Inspección: Venom — el filme de 2018, la simbiosis y el «nosotros»',
    excerpt:
      'Artes · cinema: Venom (2018, Fleischer / Hardy) — entrada SSU, génese do personagem nos comics Marvel, simbiose e «nós» como parábola de agência partilhada.',
    excerptEn:
      'Arts · film: Venom (2018, Fleischer / Hardy) — SSU entry, Marvel comics character genesis, symbiosis and “we” as a shared-agency parable.',
    excerptEs:
      'Artes · cine: Venom (2018, Fleischer / Hardy) — entrada SSU, génesis del personaje en cómics Marvel, simbiosis y «nosotros» como parábola de agencia compartida.',
    slug: 'inspecao-filme-venom',
    date: '2026-08-02T11:00:00.000Z',
    seriesOrder: 10,
    seriesLabel: 'Venom · Artes',
    coverImage: 'imagens/inspecoes/venom-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVenomPost,
  buildVenomBodies
};
