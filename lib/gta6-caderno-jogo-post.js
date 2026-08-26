'use strict';

/**
 * Caderno de jogo 1 — Grand Theft Auto VI (GTA 6).
 * Série nova: cadernos-jogo. Primeiro caderno = cidade anunciada (pré-estreia).
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

function buildGta6CadernoBodies() {
  const inspected = '2026-08-17';
  const hub = '/biblioteca/inspecoes/#inspecoes-jogos';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const wiki = 'https://pt.wikipedia.org/wiki/Grand_Theft_Auto_VI';
  const wikiEn = 'https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI';
  const official = 'https://www.rockstargames.com/VI';
  const rockstarNews =
    'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026';
  const ytId = 'QdBZYXl_BXg';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const rockstar = '/posts/post-inspecao-estudio-rockstar.html';
  const rockstarSite = 'https://www.rockstargames.com';

  const body = `## Escopo

**Caderno de jogo 1** — o primeiro caderno da série **Cadernos de jogo**. Objecto: **Grand Theft Auto VI** (**GTA 6**), da **Rockstar Games** ([inspeção do estúdio](${rockstar})). Hoje (17 ago. 2026) o jogo **ainda não saiu**: a estreia oficial anunciada é **19 de novembro de 2026** (PlayStation 5 e Xbox Series X|S). Este caderno **não é walkthrough**. É o **abrir do caderno**: inspecionar a **cidade anunciada**, o **par de protagonistas** e o **hype**, com método.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes âncora: [Wikipédia · GTA VI](${wiki}), [Wikipedia (EN)](${wikiEn}), [página oficial](${official}), [comunicado Rockstar · 19 nov. 2026](${rockstarNews}), trailer oficial 1 (${yt}), [ficha do estúdio](${rockstar}). Crédito: Rockstar Games / Take-Two — **sem afiliação**. **Ficção de crime ≠ manual de crime.** O laboratório **não** ensina delito, aliciação nem exploração. O objecto é **cultura + cidade + método**.

Cadernos seguintes (quando o jogo existir no ecrã) podem anotar sessões de jogo. Este primeiro caderno fixa o **mapa antes da viagem**. O **estúdio** que publica o mapa vive em [Rockstar Games](${rockstar}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Caderno | **1** — o primeiro da série |
| Título | **Grand Theft Auto VI** (GTA 6) |
| Estúdio | **Rockstar Games** · [ficha do estúdio](${rockstar}) · [site](${rockstarSite}) |
| Editora | Take-Two Interactive |
| Estado (hoje) | **Pré-estreia** — lançamento anunciado **19 nov. 2026** |
| Plataformas (anúncio) | PlayStation 5 e Xbox Series X/S |
| Cidade anunciada | **Vice City** / Estado de **Leonida** (Florida ficcional) |
| Protagonistas (trailers) | **Lucia** e **Jason** |
| Tipo BudGanja | Caderno de jogo — cidade × hype × método |
| Elo Palavras | [risco](${risco}) · [verdade](${verdade}) · [caminho](${caminho}) · [skill](${skill}) |
| Elo Artes | [The Matrix](${matrix}) — verificar o que o ecrã vende como mundo |
| Fonte de partida | [Wikipédia](${wiki}) · [oficial](${official}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor do **caderno 1** é abrir **antes** de jogar — senão o hype escreve o mapa no lugar do Inspetor.  
**H2:** GTA inspeciona **cidade** (vice, turismo, polícia, dinheiro, ecrã) mais do que «ser o bandido». A pergunta útil: **que cidade isto retrata, e o que esconde?**  
**H3:** Lucia + Jason são um **par** — duas agências no mesmo mapa; o lab lê parceria e limite, não romance de crime.  
**H4:** o fecho é [Valeu !!!](${mantra}) — jogar com [skill](${skill}) e [risco](${risco}) nomeados; sair do ecrã sem copiar o delito.

Passos:

1. Fixar **o que já é oficial** (título, data, plataformas, cidade, par).  
2. Separar **anúncio** de **jogo jogado** (ainda não há sessão).  
3. Declarar tese: cidade como personagem.  
4. Recusar walkthrough, cheat e «como fazer o crime».  
5. Deixar a porta aberta ao **caderno 2** (primeira sessão, se e quando existir).

## O que já se pode inspecionar (oficial)

Fontes: [PT](${wiki}) · [EN](${wikiEn}) · [Rockstar](${official}).

| Marco | O que importa ao caderno |
|-------|--------------------------|
| **Série GTA** | Cidades-ficção que pasticham EUA (Vice City, Los Santos, Liberty City) — mapa cultural, não GPS de delito. |
| **Trailers** | Primeiro olhar oficial: Leonida / Vice City; Lucia e Jason; tom de verão, turismo e tensão. |
| **19 nov. 2026** | Data anunciada pela Rockstar (após adiamentos). Confirmar sempre no [comunicado](${rockstarNews}) — datas mudam. |
| **Pré-venda / marketing** | Hype é objecto: dinheiro, espera, ecrã. Não é prova de qualidade. |
| **Extended Look (Netflix, 27 ago. 2026)** | Mais imagem oficial antes da estreia — anotar no caderno 2 se for o caso. |

> **Hierarquia BudGanja:** sem a **série** não há GTA 6. Sem o **anúncio oficial** não há este caderno. Sem o **jogo no ecrã** não há sessão. Caderno 1 = anúncio + cidade.

## Tese cultural BudGanja

| Tema no anúncio | Tradução editorial |
|-----------------|-------------------|
| Cidade-sol / turismo | Mapa de desejo e de [risco](${risco}) — o cartão-postal mente |
| Par Lucia / Jason | Duas mãos no volante — quem decide o [caminho](${caminho})? |
| Crime como género | Ficção; o lab **não** traduz em receita |
| Hype e espera | Inspecionar o ecrã como em [Matrix](${matrix}) — o trailer é venda |
| Skill de jogar | [skill](${skill}) = ofício no pad; ≠ skill de delinquir |

O laboratório **não** adopta a cosmologia Rockstar: usa o anúncio como **parábola de cidade e ecrã**. Jogar, quando chegar, é lazer com limite — [verdade](${verdade}) no quarto, não no HUD.

## Vídeo de referência (embed)

| Campo | Valor |
|-------|-------|
| Título | Grand Theft Auto VI — Trailer 1 (oficial) |
| ID | \`${ytId}\` |
| URL | [${yt}](${yt}) |
| Nota | Embed do **anúncio**; a fonte âncora continua a ser a [ficha oficial / Wikipédia](${wiki}) |

@youtube ${ytId}

## Complementaridade com o Inspetor BudGanja

- Começar pelo **oficial** (data, cidade, par); rumor de forum fica de fora.  
- Cruzar com a [ficha do estúdio Rockstar](${rockstar}) quando o interesse for a **casa**, não só o título.  
- Cruzar cidade-ecrã com [Matrix](${matrix}) sem misturar enredos.  
- Hub [Cadernos de jogo](${hub}) · [Artes](${artes}) · [Palavras](${palavras}).

## Como repetir o método

1. Um **caderno = um jogo** (ou um recorte claro: anúncio / sessão 1 / sessão N).  
2. Escrever **o que se viu**, não o que o hype mandou sentir.  
3. Separar ficção, marketing e vida no quarto.  
4. Nunca transformar o caderno em tutorial de crime.  
5. Slug \`inspecao-jogo-…\`.

## Status

**Aprovado — Caderno de jogo 1.** GTA 6 documentado como **cidade anunciada** (pré-estreia 19 nov. 2026). Estúdio: [Rockstar Games](${rockstar}). Próximo caderno possível: primeira sessão **depois** do lançamento, se o Inspetor jogar.
`;

  const contentEn = `## Scope

**Game notebook 1** — first notebook in the **Game notebooks** series. Object: **Grand Theft Auto VI** (GTA 6) by **Rockstar Games**. As of 17 Aug 2026 the game is **not out**; official date **19 November 2026**. This is **not** a walkthrough. It opens the notebook: announced city, lead pair, hype, method.

> **Method note:** independent audit. Anchors: [Wikipedia](${wikiEn}), [official page](${official}), [Rockstar · 19 Nov 2026](${rockstarNews}), Trailer 1 (${yt}). Credit: Rockstar / Take-Two — **no affiliation**. **Crime fiction ≠ crime manual.**

## Inspected object

| Field | Value |
|-------|-------|
| Notebook | **1** — first in the series |
| Title | **Grand Theft Auto VI** |
| Studio | **Rockstar Games** · [studio sheet](${rockstar}) |
| Status | **Pre-release** — announced **19 Nov 2026** |
| Announced city | **Vice City** / **Leonida** |
| Leads (trailers) | **Lucia** and **Jason** |
| Date | ${inspected} |

## Lab thesis

Inspect the **city** the trailer sells (tourism, heat, money, police) — not “how to be the criminal.” Pair = two agencies on one map. Hype is an object. [Valeu !!!](${mantra}) means play with named [risk](${risco}), then leave the screen.

@youtube ${ytId}

## Status

**Approved — Game notebook 1.** GTA 6 as **announced city**. Notebook 2 can be the first real session after launch.
`;

  const contentEs = `## Alcance

**Cuaderno de juego 1** — el primero de la serie **Cuadernos de juego**. Objeto: **Grand Theft Auto VI** (GTA 6) de **Rockstar Games**. El 17 ago. 2026 el juego **aún no salió**; fecha anunciada **19 de noviembre de 2026**. **No es walkthrough.** Abre el cuaderno: ciudad anunciada, pareja, hype, método.

> **Nota metodológica:** auditoría independiente. Anclas: [Wikipedia](${wikiEn}), [oficial](${official}), [Rockstar · 19 nov. 2026](${rockstarNews}), tráiler 1 (${yt}). Crédito: Rockstar / Take-Two — **sin afiliación**. **Ficción de crimen ≠ manual de crimen.**

## Objeto

| Campo | Valor |
|-------|-------|
| Cuaderno | **1** — el primero |
| Título | **Grand Theft Auto VI** |
| Estudio | **Rockstar Games** |
| Estado | **Preestreno** — **19 nov. 2026** |
| Ciudad | **Vice City** / **Leonida** |
| Protagonistas | **Lucia** y **Jason** |
| Fecha | ${inspected} |

## Tesis

Inspeccionar la **ciudad** que vende el tráiler — no «cómo ser el criminal». La pareja = dos agencias. El hype es objeto. [¡Valeu !!!](${mantra}) = jugar con [riesgo](${risco}) nombrado y apagar la pantalla.

@youtube ${ytId}

## Estado

**Aprobado — Cuaderno de juego 1.** GTA 6 como **ciudad anunciada**. El cuaderno 2 puede ser la primera sesión después del lanzamiento.
`;

  return { body, contentEn, contentEs, ytId, wiki };
}

function buildGta6CadernoPost(seriesOrder) {
  const { body, contentEn, contentEs, ytId, wiki } = buildGta6CadernoBodies();
  return jogoPost({
    title: 'Caderno de jogo 1: GTA 6 — a cidade anunciada',
    titleEn: 'Game notebook 1: GTA 6 — the announced city',
    titleEs: 'Cuaderno de juego 1: GTA 6 — la ciudad anunciada',
    excerpt:
      'Primeiro caderno de jogo: Grand Theft Auto VI ainda em pré-estreia (19 nov. 2026) — Vice City / Leonida, Lucia e Jason, hype e método. Sem walkthrough.',
    excerptEn:
      'First game notebook: Grand Theft Auto VI still pre-release (19 Nov 2026) — Vice City / Leonida, Lucia and Jason, hype and method. No walkthrough.',
    excerptEs:
      'Primer cuaderno de juego: Grand Theft Auto VI aún en preestreno (19 nov. 2026) — Vice City / Leonida, Lucia y Jason, hype y método. Sin walkthrough.',
    slug: 'inspecao-jogo-gta6',
    date: '2026-08-17T22:00:00.000Z',
    seriesOrder: seriesOrder == null ? 1 : seriesOrder,
    seriesLabel: 'GTA 6 · Caderno 1',
    coverImage: 'imagens/inspecoes/gta6-caderno-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGta6CadernoPost,
  buildGta6CadernoBodies
};
