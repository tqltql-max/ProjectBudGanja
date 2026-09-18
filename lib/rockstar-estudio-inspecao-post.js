'use strict';

/**
 * Inspeção: Rockstar Games — estúdio / editora de ação-aventura.
 * Distinto do Caderno GTA 6 (jogo anunciado). Ficção de crime ≠ manual de crime.
 */

function estudioPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series || 'cadernos-jogo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Rockstar Games · estúdio',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const COVER = 'imagens/inspecoes/rockstar-estudio-cover.jpg';
const SITE = 'https://www.rockstargames.com';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/Rockstar_Games';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Rockstar_Games';
const GTA6 = '/posts/post-inspecao-jogo-gta6.html';
const GTA6_OFFICIAL = 'https://www.rockstargames.com/VI';
const PAULINHO = '/posts/post-inspecao-canal-paulinho.html';
const ZANGADO = '/posts/post-inspecao-canal-zangado.html';
const ALEFF = '/posts/post-inspecao-figura-aleff.html';
const RISK = '/posts/post-inspecao-palavra-risco.html';
const TRUTH = '/posts/post-inspecao-palavra-verdade.html';
const PATH = '/posts/post-inspecao-palavra-caminho.html';
const SKILL = '/posts/post-inspecao-palavra-skill.html';
const RESPECT = '/posts/post-inspecao-palavra-respeito.html';
const MANTRA = '/posts/post-inspecao-expressao-faca-o-melhor.html';
const GAMES = '/jogos/';
const HUB = '/biblioteca/inspecoes/#inspecoes-jogos';
const MATRIX = '/posts/post-inspecao-filme-the-matrix.html';

function buildRockstarBodies(inspected) {
  const body = `## Escopo

Inspeção editorial e documental da **Rockstar Games, Inc.** — produtora e publicadora estadunidense de jogos electrónicos, subsidiária da **Take-Two Interactive**, com sede em **Nova Iorque**. O objecto aqui **não é um título** (o [Caderno GTA 6](${GTA6}) já cobre a cidade anunciada): é o **estúdio-rótulo** que faz cidades de ecrã — GTA, Red Dead, Max Payne — e o modo como o laboratório BudGanja as lê: **cultura + mapa + método**, nunca como GPS de delito.

> **Nota metodológica:** auditoria independente. Fontes âncora: [Wikipédia · Rockstar Games](${WIKI_PT}), [Wikipedia (EN)](${WIKI_EN}), [rockstargames.com](${SITE}). Crédito: Rockstar Games / Take-Two — **sem afiliação**. Indexar ≠ endossar. **Ficção de crime ≠ manual de crime.** O laboratório **não** ensina delito, aliciação nem exploração. Cultura de trabalho e crunch: registo público (reportagens) — **sem inventar** testemunhos internos.

![Rockstar Games — capa editorial BudGanja](/${COVER})

*Capa editorial do laboratório — não é o logótipo oficial; consultar [rockstargames.com](${SITE}) para marca e comunicados.*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Rockstar Games, Inc.** |
| Tipo | Subsidiária · produtora / publicadora |
| Fundação | **Dezembro de 1998** (anúncio formal jan. 1999) |
| Antecessora (IPs) | Activos da **BMG Interactive** adquiridos pela Take-Two (mar. 1998) |
| Sede | **Nova Iorque**, EUA (também referida como Rockstar NY / NYC) |
| Matriz | **Take-Two Interactive** |
| Presidente | **Sam Houser** |
| Vice-presidente | Jennifer Kolbe (fontes públicas) |
| Fundadores | Terry Donovan · Gary Foreman · Dan Houser · Sam Houser · Jamie King |
| Empregados (ordem de grandeza) | **> 2 000** (2018, fontes enciclopédicas) |
| Site | [rockstargames.com](${SITE}) |
| Tipo BudGanja | Estúdio de jogo — cidades × franquias × método |
| Distinção | **Estúdio ≠ caderno de título** ([GTA 6](${GTA6})) |
| Elo Games | [Cadernos / Games](${GAMES}) · [Paulinho](${PAULINHO}) · [Zangado](${ZANGADO}) |
| Elo Palavras | [risco](${RISK}) · [verdade](${TRUTH}) · [caminho](${PATH}) · [skill](${SKILL}) · [respeito](${RESPECT}) |
| Data | ${inspected} |

## Por que esta inspeção existe

O laboratório já abriu o [Caderno 1 · GTA 6](${GTA6}) e já indexa arquivos de ecrã ([Paulinho](${PAULINHO}), [Zangado](${ZANGADO})). Faltava a **casa que publica o mapa**: a Rockstar. Sem o estúdio, a cidade anunciada fica órfã de contexto; sem a distinção **estúdio ≠ jogo**, o hype engole o método.

Inspecionar a Rockstar é perguntar: **quem desenha estas cidades de ecrã, com que rede de estúdios, e que limites o laboratório põe ao copiar o delito?**

## Hipóteses e método

- **H1:** o mérito público da Rockstar é **mundo aberto como narrativa** — cidade, rádio, humor negro, satira — não «tutorial de crime».  
- **H2:** a Rockstar é uma **rede** (North, San Diego, Leeds…) sob um rótulo; GTA e Red Dead não saem de um único quarto.  
- **H3:** no BudGanja, o estúdio entra em **Cadernos de jogo** como Cap. 0 — o chão sob o [Caderno GTA 6](${GTA6}).  
- **H4:** [respeito](${RESPECT}) aos ofícios (artistas, writers, QA) inclui **não romantizar crunch**; o lab regista a controvérsia pública sem julgamento de fórum.  
- **H5:** fecho = [Faça o melhor!](${MANTRA}) — jogar / anotar com [skill](${SKILL}) e [risco](${RISK}) nomeados.  
- **Método:** (1) objecto societário; (2) cronologia; (3) rede de estúdios; (4) franquias; (5) tecnologia; (6) limites éticos; (7) elos BudGanja; (8) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| Mar. 1998 | Take-Two adquire activos da BMG Interactive (incl. *Grand Theft Auto* de DMA Design) |
| Dez. 1998 | Fundação do rótulo **Rockstar Games** |
| 22 jan. 1999 | Anúncio formal da formação |
| 1999→ | Expansão por aquisições / renomeações (Toronto, North, San Diego, …) |
| 2013→ | *GTA V* torna-se fenómeno de vendas (ordem de **centenas de milhões** de unidades — confirmar números oficiais actualizados) |
| 2018 | *Red Dead Redemption 2*; debate público sobre cultura de trabalho / horas |
| 2019 | Lançamento do **Rockstar Games Launcher** (PC) |
| 2021 | **CircoLoco Records** — gravadora / parceria musical |
| 2023 | Aquisição / integração **Cfx.re** (FiveM / RedM) |
| 2026 | *[GTA VI](${GTA6_OFFICIAL})* em pré-estreia — ver [Caderno 1](${GTA6}) |

## Rede de estúdios (mapa público)

A Rockstar Games é o **rótulo**; os estúdios ostentam o nome «Rockstar» com cores próprias. Síntese (não exaustiva):

| Estúdio | Nota pública |
|---------|----------------|
| **Rockstar North** (Edimburgo) | Ex-DMA Design — núcleo histórico de **GTA** / Manhunt |
| **Rockstar San Diego** | Ex-Angel Studios — **RAGE**, **Red Dead**, Midnight Club |
| **Rockstar Leeds / London / Lincoln** | Portáteis, QA/localização, Manhunt 2, ports |
| **Rockstar Toronto** | Ex-Canada — *The Warriors*, ports PC |
| **Rockstar New England** | Ex-Mad Doc — *Bully* (consolas) |
| **Rockstar India** | Bangalore — apoio / colaboração |
| **Rockstar Dundee** | Ex-Ruffian (2020–) |
| **Cfx.re** (2023–) | FiveM / RedM — modding / multiplayer comunitário |
| Encerrados / fundidos | Vancouver (→ Toronto), Vienna (2006) |

> **Leitura BudGanja:** creditar **equipas** e **estúdios**, não um mito de génio único. Sam Houser é presidente público; o mapa é colectivo.

## Franquias e produtos (âncoras)

| Franquia / linha | Porquê importa ao lab |
|------------------|------------------------|
| **Grand Theft Auto** | Cidades-ficção (Vice, Los Santos, Liberty) — [Caderno GTA 6](${GTA6}) |
| **Red Dead** | Oeste, moral, mapa aberto — outro eixo narrativo |
| **Max Payne** | Noir / bullet time — cinema de ecrã |
| **Manhunt / Bully** | Violência e escola como sátira — exigir [verdade](${TRUTH}) no quarto |
| **Midnight Club / Smuggler's Run** | Corrida / velocidade |
| **L.A. Noire / The Warriors** | Adaptação / investigação |
| **GTA Online / FiveM** | Cidade persistente + mods — elo com [Paulinho](${PAULINHO}) (ficção de servidor) |

## Tecnologia e plataforma

| Peça | Função |
|------|--------|
| **RAGE** (Rockstar Advanced Game Engine) | Motor próprio — base técnica dos mundos abertos modernos |
| **Social Club** | Conta / serviços online Rockstar |
| **Rockstar Games Launcher** (2019) | Cliente PC próprio |
| **CircoLoco Records** (2021) | Música — rádio e cultura já eram parte do DNA GTA |

## Cultura de trabalho (registo público, sem fórum)

Em **2018**, reportagens (Vulture, Kotaku / Jason Schreier) e declarações públicas debateram **horas longas** no ciclo de *Red Dead Redemption 2* e a história mais longa de pressão em ciclos GTA. A empresa clarificou declarações; ex-funcionários e actuais deram relatos **mistos** (orgulho do ofício × custo pessoal).

**Posição BudGanja:** registar que o debate **existe** e que [respeito](${RESPECT}) ao ofício inclui **não romantizar o crunch**. Esta ficha **não** adjudica processos internos nem inventa números de horas.

## Limites éticos do laboratório

| Tentação | Recusa BudGanja |
|----------|-----------------|
| «Aprender crime com o GTA» | **Ficção ≠ manual.** Cidade de ecrã ≠ GPS |
| «A Rockstar é só hype» | Há ofício de mundo aberto, escrita, áudio, QA — mérito técnico |
| «O estúdio = o jogo anunciado» | Estúdio aqui; título em [Caderno GTA 6](${GTA6}) |
| «Mods / RP = vida real» | [Paulinho](${PAULINHO}): performance de servidor; [Aleff](${ALEFF}): pessoa |
| «Crítica = ódio» | [Zangado](${ZANGADO}) = método de review; Rockstar = objecto cultural |

## Complementaridade com o Inspetor BudGanja

| Tema Rockstar | Recurso BudGanja |
|---------------|------------------|
| Estúdio (esta ficha) | Cap. 0 · Cadernos de jogo |
| GTA VI anunciado | [Caderno 1 · GTA 6](${GTA6}) · [página oficial VI](${GTA6_OFFICIAL}) |
| Arquivo RP / Anti-RP | [Canal Paulinho](${PAULINHO}) · [Games](${GAMES}) |
| Crítica gamer | [Canal Zangado](${ZANGADO}) |
| Pessoa ≠ persona | [Aleff](${ALEFF}) |
| Ecrã / mundo | [The Matrix](${MATRIX}) · [verdade](${TRUTH}) · [risco](${RISK}) |
| Fecho | [Faça o melhor!](${MANTRA}) |

## Créditos e referências

**Todo o mérito de criação, publicação e marca pertence à Rockstar Games, aos seus estúdios e à Take-Two.** Esta inspeção apenas documenta fontes públicas.

- [rockstargames.com](${SITE})  
- [Wikipédia · Rockstar Games](${WIKI_PT}) · [Wikipedia (EN)](${WIKI_EN})  
- Cruzamentos: [GTA 6](${GTA6}) · [Paulinho](${PAULINHO}) · [Zangado](${ZANGADO}) · [Aleff](${ALEFF})

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como referência de estúdio** — Rockstar Games documentada como **rótulo + rede** de mundos abertos; distinta do [Caderno GTA 6](${GTA6}). Recomendado ler com [respeito](${RESPECT}), [risco](${RISK}) e a recusa: **ficção de crime ≠ manual de crime**.

[▶ Site](${SITE}) · [▶ GTA 6](${GTA6}) · [▶ Paulinho](${PAULINHO}) · [▶ Zangado](${ZANGADO}) · [▶ Games](${GAMES}) · [▶ Jogos](${HUB}) · [▶ Faça o melhor!](${MANTRA})
`;

  const contentEn = `## Scope

Editorial inspection of **Rockstar Games, Inc.** — U.S. video-game producer/publisher, **Take-Two Interactive** subsidiary, headquartered in **New York City**. Object is the **studio label**, not a single title ([GTA 6 notebook](${GTA6}) covers the announced city).

> Independent audit. Sources: [Wikipedia](${WIKI_EN}), [rockstargames.com](${SITE}). Credit: Rockstar / Take-Two — **no affiliation**. **Crime fiction ≠ crime manual.** Work-culture debates: public reporting only — no invented testimony.

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Rockstar Games, Inc.** |
| Founded | **December 1998** |
| Parent | **Take-Two Interactive** |
| HQ | **New York City** |
| President | **Sam Houser** |
| Site | [rockstargames.com](${SITE}) |
| Distinction | **Studio ≠ title notebook** ([GTA 6](${GTA6})) |
| Date | ${inspected} |

## Why it exists

The lab already opened [GTA 6 notebook 1](${GTA6}) and indexes screen archives ([Paulinho](${PAULINHO}), [Zangado](${ZANGADO})). Missing was the **house that publishes the map**.

## Network & franchises

Rockstar is a **label + studio network** (North, San Diego, Leeds, Toronto, India, Dundee, Cfx.re…). Anchors: **GTA**, **Red Dead**, Max Payne, Manhunt, Bully, Midnight Club. Tech: **RAGE**, Social Club, Launcher; music: CircoLoco Records.

## Limits

Fiction is not a crime manual. Studio ≠ announced game. Mods/RP ≠ real life. Critique ≠ hate. Respect craft without romanticizing crunch.

## Status

**Approved with highest merit as a studio reference** — read with [GTA 6](${GTA6}), [Paulinho](${PAULINHO}), [Zangado](${ZANGADO}) and [Faça o melhor!](${MANTRA}).

[▶ Site](${SITE}) · [▶ GTA 6](${GTA6}) · [▶ Games](${GAMES})
`;

  const contentEs = `## Alcance

Inspección editorial de **Rockstar Games, Inc.** — productora/publicadora estadounidense, subsidiaria de **Take-Two Interactive**, sede en **Nueva York**. El objeto es el **sello-estudio**, no un título ([cuaderno GTA 6](${GTA6})).

> Auditoría independiente. Fuentes: [Wikipedia](${WIKI_EN}), [rockstargames.com](${SITE}). Crédito: Rockstar / Take-Two — **sin afiliación**. **Ficción de crimen ≠ manual de crimen.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Rockstar Games, Inc.** |
| Fundación | **Diciembre de 1998** |
| Matriz | **Take-Two Interactive** |
| Sede | **Nueva York** |
| Presidente | **Sam Houser** |
| Distinción | **Estudio ≠ cuaderno de título** ([GTA 6](${GTA6})) |
| Fecha | ${inspected} |

## Red y franquicias

Rockstar es **sello + red** (North, San Diego, Leeds, Toronto, India, Dundee, Cfx.re…). Anclas: **GTA**, **Red Dead**, Max Payne, Manhunt, Bully. Tecnología: **RAGE**, Social Club, Launcher.

## Estado

**Aprobado con mérito máximo como referencia de estudio** — leer con [GTA 6](${GTA6}), [Paulinho](${PAULINHO}), [Zangado](${ZANGADO}) y [Faça o melhor!](${MANTRA}).

[▶ Sitio](${SITE}) · [▶ GTA 6](${GTA6}) · [▶ Games](${GAMES})
`;

  return { body, contentEn, contentEs };
}

function buildRockstarEstudioInspecaoPost() {
  const inspected = '2026-08-18';
  const { body, contentEn, contentEs } = buildRockstarBodies(inspected);
  return estudioPost({
    title: 'Inspeção: Rockstar Games — estúdio das cidades de ecrã',
    titleEn: 'Inspection: Rockstar Games — studio of on-screen cities',
    titleEs: 'Inspección: Rockstar Games — estudio de las ciudades de pantalla',
    excerpt:
      'Estúdio/rótulo Rockstar Games (Take-Two, NY, 1998): rede de studios, GTA/Red Dead, RAGE — distinto do Caderno GTA 6. Ficção de crime ≠ manual de crime.',
    excerptEn:
      'Rockstar Games label/studio (Take-Two, NYC, 1998): studio network, GTA/Red Dead, RAGE — distinct from GTA 6 notebook. Crime fiction ≠ crime manual.',
    excerptEs:
      'Sello/estudio Rockstar Games (Take-Two, NY, 1998): red de studios, GTA/Red Dead, RAGE — distinto del cuaderno GTA 6. Ficción de crimen ≠ manual de crimen.',
    slug: 'inspecao-estudio-rockstar',
    date: inspected + 'T21:00:00.000Z',
    seriesOrder: 0,
    seriesLabel: 'Rockstar Games · estúdio',
    coverImage: COVER,
    sourceUrl: SITE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRockstarEstudioInspecaoPost,
  buildRockstarBodies
};
