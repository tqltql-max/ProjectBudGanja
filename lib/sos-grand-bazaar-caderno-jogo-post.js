'use strict';

/**
 * Caderno de jogo 2 — STORY OF SEASONS: Grand Bazaar.
 * Indicação de cópia legal (lojas oficiais) + elo cultivo/Vida.
 */

function jogoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'cadernos-jogo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Caderno de jogo',
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

function buildSosGrandBazaarBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-jogos';
  const cadernos = '/jogos/cadernos/';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const superSolo = '/calculadoras/super-solo.html';
  const plantas = '/plantas/';
  const animais = '/animais/';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const wiki = 'https://en.wikipedia.org/wiki/Harvest_Moon_DS:_Grand_Bazaar';
  const official = 'https://www.storyofseasons.com/grandbazaar/';
  const steam = 'https://store.steampowered.com/app/2508780/STORY_OF_SEASONS_Grand_Bazaar/';
  const nintendo = 'https://www.nintendo.com/us/store/products/story-of-seasons-grand-bazaar-switch/';
  const marvelous = 'https://marvelousgames.com/games/story-of-seasons-grand-bazaar';
  const ytId = 'TkMvN7PciFc';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;

  const body = `## Escopo

**Caderno de jogo 2** — indicação de um título **legal** que o laboratório quer apontar: **STORY OF SEASONS: Grand Bazaar** (Marvelous / XSEED). Objecto = a **quinta + o bazar** de Zephyr Town, e o **caminho oficial de compra**. Este caderno **não é walkthrough**, **não aloja o jogo** e **não aponta para cópia pirata**.

> **Nota metodológica:** auditoria independente (20 ago. 2026). Fontes âncora: [site oficial](${official}), [Steam](${steam}), [Nintendo eShop](${nintendo}), [Marvelous Games](${marvelous}), [Wikipedia · linhagem DS](${wiki}), launch trailer (${yt}). Crédito: Marvelous Inc. / XSEED / Marvelous USA / Marvelous Europe — **sem afiliação**. Indexar ≠ endosso comercial. **Cópia legal = loja oficial do território.**

O [Caderno 1](${gta6}) abriu uma **cidade anunciada** de crime-ficção. Este abre o **contraste**: cultivar, vender no bazar, restaurar a praça. No BudGanja isso cruza [Vida](${vida}) e [cultivo](${cultivo}) — **simulação de quinta ≠ diário de cultivo real**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Caderno | **2** — indicação legal |
| Título | **STORY OF SEASONS: Grand Bazaar** |
| Estúdio / editora (oeste) | **Marvelous** · XSEED Games / Marvelous USA / Marvelous Europe |
| Linhagem | Remake de *Harvest Moon DS: Grand Bazaar* (JP 18 dez. 2008; NA 24 ago. 2010) |
| Estreia remake | **27 ago. 2025** (Switch / Switch 2 / PC Steam); **28 mai. 2026** (PS5 / Xbox Series) |
| Cenário | **Zephyr Town** — quinta, animais, bazar semanal, moinhos e planador |
| Tipo BudGanja | Caderno de jogo — quinta × bazar × **cópia legal** |
| Elo lab | [Vida](${vida}) · [cultivo](${cultivo}) · [plantas](${plantas}) · [animais](${animais}) · [Super Solo](${superSolo}) |
| Elo Palavras | [caminho](${caminho}) · [skill](${skill}) · [risco](${risco}) |
| Contraste | [GTA 6 · caderno 1](${gta6}) — cidade-hype ≠ quinta-ritmo |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** indicar um jogo **legal** é apontar a **loja oficial**, não o ficheiro.  
**H2:** Grand Bazaar entra no lab porque a **quinta de ecrã** conversa com o ofício BudGanja (ritmo, planta, animal, venda) — sem fingir que substitui [cultivo](${cultivo}) real.  
**H3:** o bazar semanal é o **motor da história** (restaurar a fama de Zephyr Town); não é tutorial de mercado negro.  
**H4:** *Harvest Moon* (Natsume, oeste) e *Story of Seasons* (Marvelous) são **marcas distintas** desde a cisão — este remake é **SoS**, não o Harvest Moon actual da Natsume.  
**H5:** fecho = [Valeu !!!](${mantra}) — jogar com [skill](${skill}) e apagar o ecrã; a quinta de verdade fica no [Vida](${vida}).

Passos:

1. Fixar **o que é oficial** (título, data, plataformas, Zephyr Town).  
2. Separar **indicação** de **afiliação** e de **pirataria**.  
3. Ligar quinta-ecrã a cultivo-lab sem misturar receitas.  
4. Recusar walkthrough, cheat e link de dump.  
5. Deixar a porta aberta a um caderno de **sessão** se o Inspetor anotar o jogo no pad.

## Onde comprar (cópia legal)

Só lojas oficiais. Preços e catálogos mudam — conferir no sítio no dia da compra. **Não** usar dumps, keys de marketplace duvidoso nem «free download».

| Canal | Ligação |
|-------|---------|
| Site do título | [storyofseasons.com/grandbazaar](${official}) |
| PC | [Steam · app 2508780](${steam}) |
| Nintendo Switch / Switch 2 | [Nintendo eShop](${nintendo}) |
| Editora (oeste) | [Marvelous Games](${marvelous}) |
| Consolas extra | PS5 e Xbox Series — loja oficial da plataforma (estreia **28 mai. 2026**) |

> **Hierarquia BudGanja:** sem a **loja oficial** não há indicação. Sem o **jogo no ecrã** não há sessão. Caderno 2 = apontar o caminho legal + ler a quinta como parábola de cultivo.

## Tese cultural BudGanja

| Tema no ecrã | Tradução editorial |
|--------------|-------------------|
| Quinta e estações | Ritmo — o mesmo ofício que [Vida](${vida}) nomeia, aqui em lazer |
| Cultivos e animais | Catálogo de ecrã; o lab real está em [plantas](${plantas}) e [animais](${animais}) |
| Bazar semanal | Venda com regra da casa — não é mercado paralelo |
| Moinho / vento / planador | Ferramenta e brincadeira; [skill](${skill}) de pad, não de delito |
| Restaurar a praça | Comunidade que volta — elo com [Valeu !!!](${mantra}) |
| Romance / aldeia | Ficção de laço; o lab não prescreve vida a dois |

O laboratório **não** adopta a cosmologia Marvelous: usa o título como **parábola de ritmo e troca justa**. Jogar é lazer com limite.

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | STORY OF SEASONS: Grand Bazaar — Launch Trailer (Marvelous Europe) |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **anúncio oficial**; a compra continua nas [lojas](${steam}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pelo **oficial** (site, Steam, eShop); dump fica de fora.  
- Cruzar quinta-ecrã com [cultivo](${cultivo}) e [Super Solo](${superSolo}) sem copiar calendário do jogo para o vaso.  
- Contraste com [GTA 6](${gta6}): duas cidades-ficção, dois ofícios no pad.  
- Crítica de método: [Zangado](${zangado}) — vale ou não vale, noutro caderno.  
- Hub [Cadernos de jogo](${cadernos}) · [inspeções · jogos](${hub}).

## Como repetir o método

1. Um **caderno = um jogo** (ou um recorte: indicação / sessão).  
2. **Indicar** = loja oficial + o que o ecrã faz no lab.  
3. Separar simulação, cultivo real e pirataria.  
4. Slug \`inspecao-jogo-…\`.

## Status

**Aprovado — Caderno de jogo 2.** Grand Bazaar documentado como **indicação de cópia legal** (quinta + bazar, Zephyr Town). Contraste: [Caderno 1 · GTA 6](${gta6}). Próximo caderno possível: primeira sessão anotada, se o Inspetor jogar com método.
`;

  const contentEn = `## Scope

**Game notebook 2** — a **legal** pointer the lab wants on the shelf: **STORY OF SEASONS: Grand Bazaar** (Marvelous / XSEED). Object = Zephyr Town’s **farm + bazaar**, and the **official purchase path**. Not a walkthrough. Does **not** host the game. **No pirate links.**

> **Method note:** independent audit (20 Aug 2026). Anchors: [official site](${official}), [Steam](${steam}), [Nintendo eShop](${nintendo}), [Marvelous Games](${marvelous}), [Wikipedia · DS lineage](${wiki}), launch trailer (${yt}). Credit: Marvelous / XSEED — **no affiliation**. Indexing ≠ endorsement.

[Notebook 1](${gta6}) opened a crime-fiction **announced city**. This opens the **contrast**: grow, stall, restore the square. Crosses [Vida](${vida}) and [cultivation](${cultivo}) — **sim farm ≠ real grow diary**.

## Inspected object

| Field | Value |
|-------|-------|
| Notebook | **2** — legal pointer |
| Title | **STORY OF SEASONS: Grand Bazaar** |
| Studio | **Marvelous** · XSEED / Marvelous USA / Marvelous Europe |
| Lineage | Remake of *Harvest Moon DS: Grand Bazaar* (JP 2008 / NA 2010) |
| Remake launch | **27 Aug 2025** (Switch / Switch 2 / Steam); **28 May 2026** (PS5 / Xbox Series) |
| Setting | **Zephyr Town** |
| Date | ${inspected} |

## Where to buy (legal copy)

Official stores only. Prices move. **No** dumps, sketchy keys, or “free download.”

| Channel | Link |
|---------|------|
| Official site | [storyofseasons.com/grandbazaar](${official}) |
| PC | [Steam · app 2508780](${steam}) |
| Switch | [Nintendo eShop](${nintendo}) |
| Publisher | [Marvelous Games](${marvelous}) |

*Harvest Moon* (Natsume, West) and *Story of Seasons* (Marvelous) are **split brands**. This remake is **SoS**.

@youtube ${ytId}

## Status

**Approved — Game notebook 2.** Grand Bazaar as a **legal-copy pointer**. Contrast: [GTA 6 notebook 1](${gta6}).
`;

  const contentEs = `## Alcance

**Cuaderno de juego 2** — indicación de un título **legal**: **STORY OF SEASONS: Grand Bazaar** (Marvelous / XSEED). Objeto = la **granja + el bazar** de Zephyr Town y la **compra oficial**. No es walkthrough. **No** aloja el juego. **Sin** enlace pirata.

> **Nota metodológica:** auditoría independiente (20 ago. 2026). Anclas: [sitio oficial](${official}), [Steam](${steam}), [Nintendo eShop](${nintendo}), [Marvelous Games](${marvelous}), [Wikipedia](${wiki}), tráiler (${yt}). Crédito: Marvelous / XSEED — **sin afiliación**.

El [cuaderno 1](${gta6}) abrió una **ciudad anunciada** de crimen-ficción. Este abre el **contraste**: cultivar, vender, restaurar la plaza. Cruza [Vida](${vida}) y [cultivo](${cultivo}) — **granja simulada ≠ diario real**.

## Objeto

| Campo | Valor |
|-------|-------|
| Cuaderno | **2** — indicación legal |
| Título | **STORY OF SEASONS: Grand Bazaar** |
| Estudio | **Marvelous** · XSEED |
| Linaje | Remake de *Harvest Moon DS: Grand Bazaar* (JP 2008 / NA 2010) |
| Estreno remake | **27 ago. 2025** (Switch / PC); **28 may. 2026** (PS5 / Xbox) |
| Escenario | **Zephyr Town** |
| Fecha | ${inspected} |

## Dónde comprar (copia legal)

Solo tiendas oficiales. **Sin** dumps ni «free download».

| Canal | Enlace |
|-------|--------|
| Sitio | [storyofseasons.com/grandbazaar](${official}) |
| PC | [Steam](${steam}) |
| Switch | [Nintendo eShop](${nintendo}) |

*Harvest Moon* (Natsume) y *Story of Seasons* (Marvelous) son **marcas distintas**. Este remake es **SoS**.

@youtube ${ytId}

## Estado

**Aprobado — Cuaderno de juego 2.** Grand Bazaar como **indicación de copia legal**. Contraste: [GTA 6](${gta6}).
`;

  return { body, contentEn, contentEs, ytId, official };
}

function buildSosGrandBazaarCadernoPost(seriesOrder) {
  const { body, contentEn, contentEs, ytId, official } = buildSosGrandBazaarBodies();
  return jogoPost({
    title: 'Caderno de jogo 2: Story of Seasons Grand Bazaar — a quinta legal',
    titleEn: 'Game notebook 2: Story of Seasons Grand Bazaar — the legal farm',
    titleEs: 'Cuaderno de juego 2: Story of Seasons Grand Bazaar — la granja legal',
    excerpt:
      'Indicação de cópia legal: farming sim da Marvelous (Zephyr Town, 27 ago. 2025) — Steam e Nintendo oficiais. Sem walkthrough, sem dump. Elo com Vida e cultivo.',
    excerptEn:
      'Legal-copy pointer: Marvelous farming sim (Zephyr Town, 27 Aug 2025) — official Steam and Nintendo. No walkthrough, no dump. Tied to Vida and cultivation.',
    excerptEs:
      'Indicación de copia legal: farming sim de Marvelous (Zephyr Town, 27 ago. 2025) — Steam y Nintendo oficiales. Sin walkthrough ni dump. Elo con Vida y cultivo.',
    slug: 'inspecao-jogo-sos-grand-bazaar',
    date: '2026-08-20T22:10:00.000Z',
    seriesOrder: seriesOrder == null ? 2 : seriesOrder,
    seriesLabel: 'Grand Bazaar · Caderno 2',
    coverImage: 'imagens/inspecoes/sos-grand-bazaar-caderno-cover.jpg',
    sourceUrl: official,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSosGrandBazaarCadernoPost,
  buildSosGrandBazaarBodies
};
