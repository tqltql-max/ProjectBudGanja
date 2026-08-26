'use strict';

/**
 * Caderno de jogo 5 — Metal Slug (Nazca / SNK, 1996).
 * Fala viva: Meteal Slug. Run and gun; tanque SV-001; sem walkthrough nem ROM.
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

const YT_ID = 'zGvQN3uEyFM';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Metal_Slug';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Metal_Slug';
const WIKI_1996 = 'https://en.wikipedia.org/wiki/Metal_Slug_%281996_video_game%29';
const WIKI_NAZCA = 'https://en.wikipedia.org/wiki/Nazca_Corporation';
const OFFICIAL = 'https://www.snk-corp.co.jp/';
const SNK_MSAR = 'https://www.snk-corp.co.jp/us/games/metalslug_attack_re/';
const SNK_YT = 'https://www.youtube.com/@SNKCORP';
const ZANGADO_SAGA = 'https://www.youtube.com/watch?v=uMItY-0-8NY';

function poemMetalSlugPt() {
  return `Metal Slug.
Não pedimos o ROM emprestado —
pedimos o ofício do pixel
e das palavras que o fliperama gritava
quando a missão acabava
e o prisioneiro ainda dizia
Hey!

Nazca. SNK. Marco. Tarma.
Houve um tanque chamado lesma de metal
e uma boca que diz Meteal.
Houve um Mission Complete que não é o fim da guerra:
é o nome do fecho no ecrã.
Houve um HURRY UP que aperta o tempo
e um Continue que ainda cabe no bolso.

O laboratório conhece esse gabinete.
Não cola o dump.
Lê o vocabulário.
A guerra no ecrã é cartoon.
O ofício é não copiar o tiro.

Valeu !!!

Porque toda vez que alguém
separa o Hey! do prisioneiro
do tiro na rua,
o universo cresce um pouco:
uma missão a mais,
uma palavra a mais,
um tanque lento
que ainda cabe no caderno.`;
}

function poemMetalSlugEn() {
  return `Metal Slug.
We do not borrow the ROM —
we ask for the craft of the pixel
and of the words the cabinet shouted
when the mission ended
and the prisoner still said
Hey!

Nazca. SNK. Marco. Tarma.
There was a tank called a metal slug
and a living mouth that says Meteal.
There was a Mission Complete that is not the end of a war:
it is the name of the close on the screen.
There was a HURRY UP that squeezes time
and a Continue that still fits a pocket.

The laboratory knows that cabinet.
It does not paste the dump.
It reads the vocabulary.
War on the screen is cartoon.
The craft is not copying the shot.

Valeu !!!

Because every time someone
separates the prisoner's Hey!
from a shot in the street,
the universe grows a little:
one more mission,
one more word,
a slow tank
that still fits the notebook.`;
}

function poemMetalSlugEs() {
  return `Metal Slug.
No pedimos prestada la ROM —
pedimos el oficio del píxel
y de las palabras que el fliperama gritaba
cuando la misión acababa
y el prisionero aún decía
Hey!

Nazca. SNK. Marco. Tarma.
Hubo un tanque llamado babosa de metal
y una boca viva que dice Meteal.
Hubo un Mission Complete que no es el fin de la guerra:
es el nombre del cierre en la pantalla.
Hubo un HURRY UP que aprieta el tiempo
y un Continue que aún cabe en el bolsillo.

El laboratorio conoce ese gabinete.
No pega el dump.
Lee el vocabulario.
La guerra en la pantalla es cartoon.
El oficio es no copiar el tiro.

¡Valeu !!!

Porque cada vez que alguien
separa el Hey! del prisionero
del tiro en la calle,
el universo crece un poco:
una misión más,
una palabra más,
un tanque lento
que aún cabe en el cuaderno.`;
}

function buildMetalSlugBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-jogos';
  const cadernos = '/jogos/cadernos/';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const bazaar = '/posts/post-inspecao-jogo-sos-grand-bazaar.html';
  const diablo = '/posts/post-inspecao-jogo-diablo.html';
  const mk = '/posts/post-inspecao-jogo-mortal-kombat.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const hp = '/posts/post-inspecao-palavra-hp.html';
  const saveGame = '/posts/post-inspecao-palavra-save-game.html';
  const vidaLab = '/posts/post-inspecao-palavra-vida.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poema = poemMetalSlugPt();

  const body = `## Escopo

**Caderno de jogo 5** — **Metal Slug**. Objecto âncora: o fliperama da **Nazca Corporation** publicado pela **SNK** no **Neo Geo MVS** (**19 abr. 1996**), título completo *Metal Slug: Super Vehicle-001*. A boca pediu *Meteal Slug*. O **início de tudo** é esse gabinete de 1996 — não o hype de *Attack Reloaded* nem de *Tactics*. Este caderno **não é walkthrough**, **não lista armas**, **não aloja o jogo** e **não aponta para ROM / dump**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Metal Slug](${WIKI}), [série (EN)](${WIKI_EN}), [jogo 1996](${WIKI_1996}), [Nazca](${WIKI_NAZCA}), [SNK](${OFFICIAL}), [Attack Reloaded](${SNK_MSAR}). Trailer oficial **SNK OFFICIAL** (${YT}) — **eco** da franquia hoje; a génese continua 1996. Crédito: Nazca / SNK — **sem afiliação**. **Ficção de guerra cartoon ≠ manual de combate.** Indexar ≠ endosso. **Cópia legal = loja oficial do território (SNK / Steam / Nintendo, etc.).**

O [Caderno 1](${gta6}) abriu uma cidade anunciada. O [Caderno 4](${mk}) abriu o vocabulário do combate one-on-one. Este abre o **run and gun** e o tanque que deu o nome.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Caderno | **5** — génese 1996 + léxico do gabinete |
| Título | **Metal Slug** (*Super Vehicle-001*). Fala viva: **Meteal Slug** |
| Estúdio âncora | **Nazca Corporation** (depois fundida na SNK, 1996) |
| Publicação | **SNK** — Neo Geo MVS / AES |
| Produção / design | Takashi Nishiyama · Kazuma Kujo · Meeher |
| Arte / som | Akio Oyabu (entre outros) · Takushi Hiyamuta (Hiya!) |
| Estreia | **19 abr. 1996** (arcade JP) |
| Género | Run and gun · side-scrolling |
| Cenário | 2028 — Peregrine Falcon (Marco Rossi, Tarma Roving) × Rebel Army (Donald Morden) |
| Nome do tanque | **SV-001** — a *Metal Slug* (lesma de metal) |
| Tipo BudGanja | Caderno de jogo — **pixel + palavras do gabinete**, não guia de tiro |
| Léxico (eco nesta ficha) | Mission Complete · HURRY UP! · POW / Hey! · Continue · Game Over · Slug |
| Elo Palavras | [skill](${skill}) · [risco](${risco}) · [medo](${medo}) · [gesto](${gesto}) · [HP](${hp}) · [Save Game](${saveGame}) |
| Fonte | [Wiki 1996](${WIKI_1996}) · [série](${WIKI_EN}) |
| Data | ${inspected} |

**O que é o objecto:** um *run and gun* cuja marca cultural é o **pixel denso** e um **vocabulário de missão** — o anunciador aperta com *HURRY UP!*; o prisioneiro grita *Hey!*; o fecho nomeia-se *MISSION COMPLETE*. O título não é uma lesma biológica: é o **alcunho do tanque**.

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1996** (Nazca / SNK / Neo Geo) — antes de sequelas, *Attack* e *Tactics*.  
**H2:** a boca diz **Meteal**; o lema oficial guarda **Metal**. O lapso não abre outra ficha: aponta para este caderno.  
**H3:** **Slug** no inglês é projétil *e* lesma; no jogo é o **SV-001** — veículo lento, pesado, de metal. **Não se cola hitbox.**  
**H4:** o recorte humano é o **POW** que diz *Hey!* — resgate no ecrã, não manual de guerra.  
**H5:** *HURRY UP!* é **aperto de tempo no gabinete**; o laboratório da [Vida](${vidaLab}) não apressa a terra. São ofícios distintos.  
**H6:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *deste* fliperama *hoje*.

Passos: génese → mapa do léxico (sem inputs) → clip oficial como transporte → eco poético → status.

## Génese (o que importa)

| Marco | O que importa |
|-------|----------------|
| **1994–96** | Nazca (ex-Irem) desenha o primeiro título; pixel e humor slapstick |
| **19 abr. 1996** | Arcade Neo Geo MVS — origem desta ficha |
| **SV-001** | O tanque que dá o nome — *Metal Slug* |
| **1996 (fim)** | Nazca funde-se na SNK depois do primeiro jogo |
| **MS 2 (1998)** | Eri Kasamoto · Fio Germi entram; o quarteto clássico fecha |
| **MS X / 3 (1999–2000)** | *Metal Slug 3* — eco mais citado da linhagem arcade |
| **4–7 / XX** | Continuação SNK / Noise Factory — descendentes |
| **2024** | *Attack Reloaded* (trailer abaixo) e *Metal Slug Tactics* — **ecos**; não abrem o caderno |

> **Hierarquia:** sem o arcade **1996**, não há Meteal a inspecionar. Trailer 2024 e sequelas são descendentes.

## Palavras do game (mapa)

O laboratório **não** ensina o tiro. Lê o **nome**.

| Palavra (boca / lema) | Papel no gabinete | Nota |
|-----------------------|-------------------|------|
| **Metal Slug** / *Meteal* | Título + alcunho do tanque SV-001 | esta ficha |
| **Slug** | EN: projétil / lesma; no jogo: o veículo | eco |
| **Mission Complete** | Fecho da missão — irmão de gabinete do [Valeu !!!](${mantra}) | eco |
| **HURRY UP!** | Aviso de tempo (o relógio aperta) | eco — ≠ pressa da terra |
| **POW** / **Hey!** | Prisioneiro de guerra no ecrã; o grito de resgate | eco — recorte humano |
| **Continue** | Segunda chance no fliperama (moeda / crédito) | elo [Save Game](${saveGame}) |
| **Game Over** | Fecho da partida quando o crédito acaba | eco |
| **Combat School** | Modo extra (Neo Geo CD, 1996) — revisitar missão | eco |
| **HP** | Barra do tanque / do corpo no HUD | [HP](${hp}) |

## Tese cultural BudGanja

O fliperama vendeu **guerra no ecrã** e, ao mesmo tempo, inventou um **desenho que ri de si**. *Mission Complete* não é vitória na rua. *HURRY UP!* não é ordem para a colheita. *Hey!* do POW é **nome de cena** — cartoon com [risco](${risco}) de se colar no peito. [Skill](${skill}) aqui é ofício no stick, não ofício de ferir. Cópia legal na loja; dump de ROM fica fora do caderno.

## Trailer oficial (eco — transporte)

Embed de [SNK OFFICIAL](${SNK_YT}) — *Metal Slug Attack Reloaded* (2024). **Não** substitui o arcade de 1996. O clipe oficial ainda mostra o pixel e o tanque; o laboratório **não** cola a ROM nem o input.

@youtube ${YT_ID}

## Poema do laboratório

\`\`\`poem
${poema}
\`\`\`

[▶ Vida](${vida}#poema=metal-slug) · [▶ Cadernos](${cadernos}) · [▶ Valeu !!!](${mantra})

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [GTA 6](${gta6}) · [Grand Bazaar](${bazaar}) · [Diablo](${diablo}) · [Mortal Kombat](${mk}) | Outros cadernos |
| [Zangado](${zangado}) | Canal de jogos (hub); saga Metal Slug no feed (${ZANGADO_SAGA}) — não esta ficha |
| [skill](${skill}) · [risco](${risco}) · [Save Game](${saveGame}) | Ofício no stick × limite × rasto legal |
| [HP](${hp}) | Barra do HUD — ≠ [Vida](${vidaLab}) do laboratório |

## Limites

- **Ficha ≠ walkthrough / lista de armas / rotas de boss.**  
- Sem protocolar violência real nem dump de ROM.  
- Distinto de *Attack Reloaded*, *Tactics* e portes posteriores (ecos).  
- *Hey!* do POW ≠ pedido de socorro na rua.

## Status

**Aprovado — Caderno de jogo 5.** Metal Slug (1996): Nazca / SNK; SV-001; léxico Mission Complete · HURRY UP! · POW / Hey! · Continue; trailer SNK como transporte; fala viva *Meteal*.

[▶ Trailer SNK](${YT}) · [▶ Mortal Kombat](${mk}) · [▶ Save Game](${saveGame}) · [▶ Cadernos](${cadernos}) · [▶ Jogos](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Game notebook 5** — **Metal Slug** (Nazca / SNK, Neo Geo arcade, **19 Apr 1996**, *Super Vehicle-001*). Living mouth: **Meteal Slug**. Not a walkthrough, not a ROM dump. 2024 *Attack Reloaded* is an **echo**.

> [Wikipedia 1996](${WIKI_1996}). [Series](${WIKI_EN}). [SNK](${OFFICIAL}). Official trailer (${YT}) — transport, not genesis. Cartoon war ≠ combat manual. Legal copy only.

@youtube ${YT_ID}

## Word map (no inputs)

Metal Slug names the SV-001 tank · Slug = projectile / gastropod / vehicle nickname · Mission Complete closes the stage · HURRY UP! squeezes cabinet time · POW / Hey! is the rescue shout · Continue is the extra credit.

## Lab poem

\`\`\`poem
${poemMetalSlugEn()}
\`\`\`

[▶ Vida](${vida}#poema=metal-slug) · [▶ Valeu !!!](${mantra})

## Status

**Approved — notebook 5.** 1996 genesis; no pasted ROM; no weapon list.
`;

  const contentEs = `## Alcance

**Cuaderno 5** — **Metal Slug** (arcade Nazca / SNK, **19 abr. 1996**). Habla viva: **Meteal Slug**. Sin walkthrough ni dump de ROM. *Attack Reloaded* (2024) es **eco**.

> [Wikipedia 1996](${WIKI_1996}). Tráiler oficial (${YT}) — transporte, no génesis. Guerra cartoon ≠ manual de combate.

@youtube ${YT_ID}

## Poema

\`\`\`poem
${poemMetalSlugEs()}
\`\`\`

[▶ Vida](${vida}#poema=metal-slug) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobado — cuaderno 5.** Génesis 1996; sin ROM; sin lista de armas.
`;

  return { body, contentEn, contentEs };
}

function buildMetalSlugCadernoPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildMetalSlugBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 5;
  return jogoPost({
    title: 'Caderno de jogo 5: Metal Slug — o tanque, o pixel e o Hey!',
    titleEn: 'Game notebook 5: Metal Slug — the tank, the pixel and the Hey!',
    titleEs: 'Cuaderno 5: Metal Slug — el tanque, el píxel y el Hey!',
    excerpt:
      'Caderno 5: Metal Slug (Nazca / SNK, 1996) — Meteal; SV-001; Mission Complete / HURRY UP! / POW Hey!; sem walkthrough nem ROM; Valeu !!!',
    excerptEn:
      'Notebook 5: Metal Slug (Nazca / SNK, 1996) — living Meteal; SV-001; Mission Complete / HURRY UP! / POW Hey!; no walkthrough, no ROM; Valeu !!!',
    excerptEs:
      'Cuaderno 5: Metal Slug (Nazca / SNK, 1996) — Meteal; SV-001; Mission Complete / HURRY UP! / POW Hey!; sin walkthrough ni ROM; ¡Valeu !!!',
    slug: 'inspecao-jogo-metal-slug',
    date: '2026-08-24T02:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Metal Slug · Caderno 5',
    coverImage: '/imagens/inspecoes/metal-slug-cover.jpg',
    sourceUrl: WIKI_1996,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMetalSlugCadernoPost,
  buildMetalSlugBodies,
  poemMetalSlugPt,
  poemMetalSlugEn,
  poemMetalSlugEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN,
  WIKI_1996,
  WIKI_NAZCA,
  OFFICIAL,
  SNK_MSAR
};
