'use strict';

/**
 * Caderno de jogo 3 — Diablo (Blizzard North, 1997) + franquia.
 * Génese primeiro; sequelas como eco. Cópia legal. Sem cheat.
 * Elo: palavra diabo · monte californiano · ≠ diamba.
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

const YT_ID = 'o_Kr5i5F43U';

function buildDiabloCadernoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-jogos';
  const cadernos = '/jogos/cadernos/';
  const diabo = '/posts/post-inspecao-palavra-diabo.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const bazaar = '/posts/post-inspecao-jogo-sos-grand-bazaar.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://en.wikipedia.org/wiki/Diablo_(video_game)';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Diablo_(jogo_eletr%C3%B4nico)';
  const wikiFranquia = 'https://en.wikipedia.org/wiki/Diablo_(series)';
  const wikiMonte = 'https://en.wikipedia.org/wiki/Mount_Diablo';
  const wikiBrevik = 'https://en.wikipedia.org/wiki/David_Brevik';
  const official = 'https://diablo.blizzard.com/';
  const battle = 'https://battle.net/';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;

  const body = `## Escopo

**Caderno de jogo 3** — o **jogo Diablo**. Objecto âncora: o primeiro título (**Blizzard North / Blizzard**, Windows, estreia NA **3 jan. 1997**). O **início de tudo** é essa dungeon de Tristram, não o hype de *Diablo IV*. Este caderno **não é walkthrough**, **não aloja o jogo** e **não aponta para cópia pirata**.

A boca pediu *Daibo* e *parece giaua*. A [palavra diabo](${diabo}) corta o lapso. Aqui inspeciona-se o **ecrã**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipedia · Diablo (game)](${wiki}), [PT](${wikiPt}), [série](${wikiFranquia}), [David Brevik](${wikiBrevik}), [Mount Diablo](${wikiMonte}), [diablo.blizzard.com](${official}), trailer in-store 1996 (${yt}). Crédito: Blizzard / Activision Blizzard — **sem afiliação**. **Ficção de Inferno ≠ manual occultista.** Indexar ≠ endosso. **Cópia legal = Battle.net / loja oficial do território.**

O [Caderno 1](${gta6}) abriu uma cidade anunciada. O [Caderno 2](${bazaar}) apontou uma quinta legal. Este abre o **abismo clicável**: loot, [medo](${medo}), [skill](${skill}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Caderno | **3** — génese da franquia |
| Título âncora | **Diablo** (1997) |
| Estúdio | **Blizzard North** (ex-Condor) · publicação **Blizzard Entertainment** |
| Design / programação | **David Brevik** · Erich Schaefer (entre outros) |
| Música | Matt Uelmen |
| Género | Action RPG · dungeon crawl · isometric |
| Cenário | **Tristram** / Khanduras — catedral, 16 andares, Lord of Terror |
| Classes (1997) | Warrior · Rogue · Sorcerer |
| Ecos (não o recorte) | *Hellfire* (1997) · *II* (2000) · *III* (2012) · *Immortal* (2022) · *IV* (2023) |
| Tipo BudGanja | Caderno de jogo — **génese 1997** · cópia legal · palavra à parte |
| Elo Palavras | [diabo](${diabo}) · [medo](${medo}) · [risco](${risco}) · [skill](${skill}) · [caminho](${caminho}) |
| Elo que **não** é | [diamba](${diamba}) — outra sílaba, outra planta |
| Compra | [${official}](${official}) · [${battle}](${battle}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **primeiro Diablo** (Condor → Blizzard North, 1995–1997) — clique, loot, andares gerados. Sequels = **ecos**.  
**H2:** o título **parece** o espanhol *diablo* (= [diabo](${diabo})); Brevik liga o nome ao **[Mount Diablo](${wikiMonte})**, perto da infância na Califórnia. Duas camadas.  
**H3:** *giaua* fica na ficha-palavra (vizinho oral de Iavé) — **não** entra no mapa de Sanctuary.  
**H4:** jogar = [skill](${skill}) no rato; sair do ecrã sem copiar o Inferno para o quarto. [Valeu !!!](${mantra})

Passos:

1. Fixar génese (Condor, Brevik, 3 jan. 1997).  
2. Separar palavra, monte e franquia.  
3. Apontar **loja oficial**; recusar dump / cheat / bot.  
4. Status.

## O início de tudo — 1995–1997

[Brevik](${wikiBrevik}) apresenta *Diablo* à Blizzard em **jan. 1995**. Condor é adquirida e vira **Blizzard North**. O combate passa de por turnos a tempo real; entra o **Battle.net**. Estreia Windows NA **3 jan. 1997** (algumas fontes citam 31 dez. 1996). Tristram: herói só contra o Lord of Terror debaixo da catedral. Três classes; masmorras procedimentais; multiplayer.

> **Hierarquia:** sem *Diablo* (1997) não há franquia a inspecionar. *IV* é descendente.

## Tese cultural BudGanja

| Tema no ecrã | Tradução editorial |
|--------------|-------------------|
| Nome *Diablo* | Som de [diabo](${diabo}) + monte californiano — ver ficha-palavra |
| Terror / Inferno | [Medo](${medo}) jogável; **não** é liturgia |
| Clique e loot | [Skill](${skill}) de sessão; grind ≠ ofício do lab |
| Andar seguinte | [Caminho](${caminho}) de masmorra — metáfora, não GPS |
| Battle.net | Cópia e sessão **oficiais** |

O laboratório **não** adopta a cosmologia de Sanctuary. Inspeciona o **jogo**. Pessoa ≠ Prime Evil.

## Onde jogar (legal)

| Caminho | Nota |
|---------|------|
| [diablo.blizzard.com](${official}) | Porta da franquia |
| [Battle.net](${battle}) | Conta + loja Blizzard |
| Lojas oficiais do território | Confirmar SKU (I / II / III / IV) |

**Fora:** dump, keygen, bot, site «grátis completo». Crítica de método noutro caderno: [Zangado](${zangado}).

## Vídeo de referência (génese)

Trailer **in-store 1996** — alpha, arquivo. A âncora continua a ser a [Wikipedia](${wiki}) e o [site](${official}).

@youtube ${YT_ID}

## Como repetir o método

1. Um **caderno = um jogo** (ou génese de franquia).  
2. Palavra do título ganha ficha **à parte** quando a orelha cola lapsos (*Daibo*, *giaua*).  
3. Sem pirataria, sem walkthrough de delito, sem occultismo de receita.  
4. Slug \`inspecao-jogo-…\`.

## Status

**Aprovado — Caderno de jogo 3.** *Diablo* (1997) como génese; palavra em [diabo](${diabo}). Ecos II–IV fora do recorte nuclear.

[▶ Cadernos](${cadernos}) · [▶ Diabo](${diabo}) · [▶ Hub jogos](${hub}) · [Oficial](${official})
`;

  const contentEn = `## Scope

**Game notebook 3** — **Diablo**. Anchor: the first title (**Blizzard North**, Windows, NA **3 Jan 1997**). Not a walkthrough. No pirate links. The word *Daibo* / *giaua* is cut on the [diabo sheet](${diabo}).

> **Method note:** [Wikipedia](${wiki}), [official](${official}). Credit: Blizzard — **no affiliation**. Hell fiction ≠ occult manual. Legal copy = Battle.net / official store.

## Object

| Field | Value |
|-------|-------|
| Notebook | **3** |
| Title | **Diablo** (1997) |
| Studio | Blizzard North · Blizzard Entertainment |
| Setting | Tristram — Lord of Terror |
| Word link | [diabo](${diabo}) — Spanish cognate + [Mount Diablo](${wikiMonte}) (Brevik) |
| Buy | [${official}](${official}) |
| Date | ${inspected} |

## Thesis

Genesis 1997 first · sequels as echoes · name sounds like “devil” and also names a California mountain · play with [skill](${skill}), then leave the screen. [Valeu !!!](${mantra})

@youtube ${YT_ID}

## Status

**Approved — Game notebook 3.** Word sheet: [diabo](${diabo}).
`;

  const contentEs = `## Alcance

**Cuaderno 3** — **Diablo**. Ancla: el primer título (**Blizzard North**, **3 ene. 1997**). Sin walkthrough ni copia pirata. *Daibo* / *giaua* se cortan en la [ficha diabo](${diabo}).

> **Nota:** [Wikipedia](${wiki}), [oficial](${official}). Crédito: Blizzard — **sin afiliación**. Ficción del Infierno ≠ manual ocultista.

## Objeto

| Campo | Valor |
|-------|-------|
| Cuaderno | **3** |
| Título | **Diablo** (1997) |
| Estudio | Blizzard North |
| Vínculo | [diabo](${diabo}) — cognado + [Mount Diablo](${wikiMonte}) |
| Fecha | ${inspected} |

## Tesis

Génesis 1997 primero · secuelas como eco · el nombre parece «diablo» y también nombra un monte. [¡Valeu !!!](${mantra})

@youtube ${YT_ID}

## Estado

**Aprobado — Cuaderno 3.** Palabra: [diabo](${diabo}).
`;

  return { body, contentEn, contentEs, ytId: YT_ID, wiki };
}

function buildDiabloCadernoPost(seriesOrder) {
  const { body, contentEn, contentEs, ytId, wiki } = buildDiabloCadernoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 3;
  return jogoPost({
    title: 'Caderno de jogo 3: Diablo — a masmorra de 1997 e o nome que parece diabo',
    titleEn: 'Game notebook 3: Diablo — the 1997 dungeon and the name that sounds like devil',
    titleEs: 'Cuaderno de juego 3: Diablo — la mazmorra de 1997 y el nombre que parece diablo',
    excerpt:
      'Caderno 3: Diablo (Blizzard North, 1997) — Tristram, cópia legal; elo palavra diabo / monte californiano; ≠ diamba; Valeu !!!',
    excerptEn:
      'Notebook 3: Diablo (Blizzard North, 1997) — Tristram, legal copy; word sheet diabo / California mountain; ≠ diamba; Valeu !!!',
    excerptEs:
      'Cuaderno 3: Diablo (Blizzard North, 1997) — Tristram, copia legal; ficha diabo / monte; ≠ diamba; ¡Valeu !!!',
    slug: 'inspecao-jogo-diablo',
    date: '2026-08-22T17:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Diablo · Caderno 3',
    coverImage: '/imagens/inspecoes/diablo-caderno-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDiabloCadernoPost,
  buildDiabloCadernoBodies,
  YT_ID
};
