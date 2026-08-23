'use strict';

/**
 * Caderno de jogo 4 — Mortal Kombat (Midway, 1992) + léxico do fliperama.
 * Fala viva: Konbat. Palavras do gabinete + HUD (HP, mana, vida/energia).
 * Sem lista de golpes.
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

const YT_ID = 'jnMo1SUTal8';
const YT = 'https://www.youtube.com/watch?v=' + YT_ID;
const WIKI = 'https://pt.wikipedia.org/wiki/Mortal_Kombat';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Mortal_Kombat';
const WIKI_1992 = 'https://en.wikipedia.org/wiki/Mortal_Kombat_%281992_video_game%29';
const WIKI_FAT = 'https://en.wikipedia.org/wiki/Fatality_%28Mortal_Kombat%29';
const WIKI_MK2 = 'https://en.wikipedia.org/wiki/Mortal_Kombat_II';
const FANDOM = 'https://mortalkombat.fandom.com/wiki/Fatality';
const OFFICIAL = 'https://www.mortalkombat.com/';
const NRS = 'https://www.netherrealm.com/';
const WB = 'https://www.youtube.com/@WarnerBrosGames';

function poemMortalKombatPt() {
  return `Mortal Kombat.
Não pedimos o golpe emprestado —
pedimos o ofício das palavras
que o fliperama gritava
quando o round acabava
e ainda dava tempo de escolher
o fecho.

Midway. Boon. Tobias.
Houve um K no kombat
e um Fight depois do Raund.
Houve um Finish que não é o fim da vida:
é o nome do aviso.
Houve Fatallitty, Brutalititi, babalitity —
família de fechos,
uns de sangue no ecrã,
outros de sátira no bebé.

O laboratório conhece esse gabinete.
Não cola a sequência.
Lê o vocabulário.
O ecrã é ficção.
O ofício é não copiar o golpe.

Valeu !!!

Porque toda vez que alguém
separa Fight de luta na rua
e Finish de acabar a pessoa,
o universo cresce um pouco:
um round a mais,
uma palavra a mais,
um jogo
que ainda cabe no caderno.`;
}

function poemMortalKombatEn() {
  return `Mortal Kombat.
We do not borrow the move —
we ask for the craft of the words
the cabinet shouted
when the round ended
and there was still time to choose
the close.

Midway. Boon. Tobias.
There was a K in kombat
and a Fight after the Round.
There was a Finish that is not the end of a life:
it is the name of the prompt.
There was Fatality, Brutality, Babality —
a family of closings,
some blood on the screen,
some satire in a baby.

The laboratory knows that cabinet.
It does not paste the sequence.
It reads the vocabulary.
The screen is fiction.
The craft is not copying the blow.

Valeu !!!

Because every time someone
separates Fight from a street fight
and Finish from ending a person,
the universe grows a little:
one more round,
one more word,
a game
that still fits the notebook.`;
}

function poemMortalKombatEs() {
  return `Mortal Kombat.
No pedimos prestado el golpe —
pedimos el oficio de las palabras
que el fliperama gritaba
cuando el round acababa
y aún había tiempo de elegir
el cierre.

Midway. Boon. Tobias.
Hubo una K en kombat
y un Fight después del Raund.
Hubo un Finish que no es el fin de la vida:
es el nombre del aviso.
Hubo Fatallitty, Brutalititi, babalitity —
familia de cierres,
unos de sangre en la pantalla,
otros de sátira en el bebé.

El laboratorio conoce ese gabinete.
No pega la secuencia.
Lee el vocabulario.
La pantalla es ficción.
El oficio es no copiar el golpe.

¡Valeu !!!

Porque cada vez que alguien
separa Fight de pelea en la calle
y Finish de acabar a la persona,
el universo crece un poco:
un round más,
una palabra más,
un juego
que aún cabe en el cuaderno.`;
}

function buildMortalKombatBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-jogos';
  const cadernos = '/jogos/cadernos/';
  const gta6 = '/posts/post-inspecao-jogo-gta6.html';
  const diablo = '/posts/post-inspecao-jogo-diablo.html';
  const bazaar = '/posts/post-inspecao-jogo-sos-grand-bazaar.html';
  const finish = '/posts/post-inspecao-palavra-finish.html';
  const fatality = '/posts/post-inspecao-palavra-fatality.html';
  const brutality = '/posts/post-inspecao-palavra-brutality.html';
  const babality = '/posts/post-inspecao-palavra-babality.html';
  const round = '/posts/post-inspecao-palavra-round.html';
  const fight = '/posts/post-inspecao-palavra-fight.html';
  const hp = '/posts/post-inspecao-palavra-hp.html';
  const mana = '/posts/post-inspecao-palavra-mana.html';
  const vidaEnergia = '/posts/post-inspecao-palavra-vida-energia.html';
  const vidaLab = '/posts/post-inspecao-palavra-vida.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poema = poemMortalKombatPt();

  const body = `## Escopo

**Caderno de jogo 4** — **Mortal Kombat**. Objecto âncora: o fliperama da **Midway** (**agosto 1992**), criação de **Ed Boon** e **John Tobias**. A boca pediu *MOrtal Konbat* e depois as **palavras do game**: [Fight](${fight}), [Round](${round}) (*Raund*), [Finish](${finish}), [Fatality](${fatality}) (*Fatallitty*), [Brutality](${brutality}) (*Brutalititi*), [Babality](${babality}) (*babalitity*), e o HUD [HP](${hp}) · [Mana](${mana}) · [vida × energia](${vidaEnergia}) (≠ [Vida](${vidaLab}) do laboratório). O **início de tudo** é o gabinete de 1992 — não o hype de *Mortal Kombat 1* (2023). Este caderno **não é walkthrough**, **não lista golpes** e **não ensina a executar fechos**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Mortal Kombat](${WIKI}), [Wikipedia (EN)](${WIKI_EN}), [jogo 1992](${WIKI_1992}), [Fatality (série)](${WIKI_FAT}), [Mortal Kombat II](${WIKI_MK2}), [Fandom · Fatality](${FANDOM}), [mortalkombat.com](${OFFICIAL}), [NetherRealm](${NRS}). Trailer oficial **Warner Bros. Games** (${YT}) — **eco** da franquia hoje; a génese continua 1992. Crédito: Midway / NetherRealm / Warner Bros. Games — **sem afiliação**. **Ficção de luta ≠ manual de violência.** Ficha ≠ ESRB, ≠ lista de fatalities.

O [Caderno 1](${gta6}) abriu uma cidade anunciada. O [Caderno 3](${diablo}) abriu uma masmorra. Este abre o **vocabulário do combate no ecrã**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Caderno | **4** — génese 1992 + léxico do fliperama |
| Título | **Mortal Kombat** (oficial com **K**). Fala viva: **Konbat** |
| Estúdio âncora | **Midway Games** (Chicago) |
| Criação | **Ed Boon** (programa / voz) · **John Tobias** (arte / história) · Dan Forden (som) · John Vogel |
| Estreia | **Agosto 1992** (arcade) |
| Género | Fighting · one-on-one |
| Casa actual | **NetherRealm Studios** (Boon) · publicação Warner Bros. Games |
| Tipo BudGanja | Caderno de jogo — **palavras do gabinete**, não guia de fatality |
| Léxico fichado | [Fight](${fight}) · [Round](${round}) · [Finish](${finish}) · [Fatality](${fatality}) · [Brutality](${brutality}) · [Babality](${babality}) · [HP](${hp}) · [Mana](${mana}) · [vida × energia](${vidaEnergia}) |
| Eco (sem ficha própria) | Friendship · Animality · Stage Fatality · Mercy · Hara-Kiri |
| Elo Palavras | [skill](${skill}) · [risco](${risco}) · [medo](${medo}) · [gesto](${gesto}) |
| Fonte | [Wiki 1992](${WIKI_1992}) · [Fatality](${WIKI_FAT}) |
| Data | ${inspected} |

**O que é o objecto:** um jogo de luta cuja marca cultural é um **vocabulário de fecho** — o anunciador diz [Round](${round}) / [Fight](${fight}); no último round, [Finish](${finish}) abre a janela; [Fatality](${fatality}) nomeia o fecho letal; [Babality](${babality}) e Friendship (MK II) respondem à polémica com sátira.

## Hipóteses e método

**H1:** o valor BudGanja começa na **génese 1992** (Midway / Boon / Tobias) — antes de NetherRealm, filmes e *MK1* 2023.  
**H2:** o **K** de *Kombat* é grafia de marca (*klassic*) — a orelha diz **Konbat**; o lema oficial guarda o K.  
**H3:** *Finish Him / Finish Her* é **nome do aviso**, não receita; ES de fliperama: *Acábalo / Acábala*. **Não se cola sequência.**  
**H4:** [Babality](${babality}) e Friendship (MK II) são **resposta satírica** às audiências sobre violência no ecrã (caminho que levou à **ESRB**, 1994).  
**H5:** [Brutality](${brutality}) entra depois (UMK3 / Trilogy) e muda de forma nos títulos recentes — ainda é **palavra de fecho**, não tutorial.  
**H6:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *destas* palavras *hoje*.

Passos: génese → mapa do léxico (sem inputs) → clip oficial como transporte → eco poético → status.

## Génese (o que importa)

| Marco | O que importa |
|-------|----------------|
| **1991–92** | Equipa pequena na Midway; luta digitalizada; Johnny Cage ecoa o *Bloodsport* / Van Damme que não entrou |
| **Ago. 1992** | Arcade — origem desta ficha |
| **Fatality** | Fecho letal depois do aviso [Finish](${finish}) — ver [ficha](${fatality}) |
| **1993–94** | Portes, polémica, audiências no Congresso dos EUA → **ESRB** (1994) |
| **MK II (1993)** | [Babality](${babality}) + Friendship — sátira do gore |
| **MK 3 / UMK3** | Animality · [Brutality](${brutality}) |
| **2000+** | Tobias sai; Boon segue em **NetherRealm** |
| **2023** | *Mortal Kombat 1* — **eco** (trailer abaixo); não abre o caderno |

> **Hierarquia:** sem o arcade **1992**, não há Konbat a inspecionar. Trailer 2023 e sequelas são descendentes.

## Palavras do game (mapa)

O laboratório **não** ensina o golpe. Lê o **nome**.

| Palavra (boca / lema) | Papel no gabinete | Ficha |
|-----------------------|-------------------|-------|
| **Fight** | Grito que **abre** o round | [Fight](${fight}) |
| **Round** / *Raund* | Unidade da luta (Round 1…) | [Round](${round}) |
| **Finish** | Aviso de janela (*Finish Him / Her*) | [Finish](${finish}) |
| **Fatality** / *Fatallitty* | Fecho letal nomeado | [Fatality](${fatality}) |
| **Brutality** / *Brutalititi* | Fecho por combo / condição (UMK3 → títulos recentes) | [Brutality](${brutality}) |
| **Babality** / *babalitity* | Fecho satírico: o rival vira bebé (MK II) | [Babality](${babality}) |
| Friendship | Fecho amistoso — irmão da Babality | eco nesta tabela |
| Animality | Fecho em forma de animal (MK 3) | eco |
| Stage Fatality | Fecho do cenário (The Pit, etc.) | eco |
| **HP** | Hit points — a barra que o BR chama **vida** no HUD | [HP](${hp}) |
| **Mana** | Reserva de magia / especial (RPG → HUD) | [Mana](${mana}) |
| **Vida × energia** | Duas barras: vida (HP) ≠ energia (meter); ≠ [Vida](${vidaLab}) | [vida × energia](${vidaEnergia}) |

## Tese cultural BudGanja

O fliperama vendeu **sangue no ecrã** e, ao mesmo tempo, inventou um **dicionário**. [Fight](${fight}) não é briga na rua. [Finish](${finish}) não é matar a pessoa. [Fatality](${fatality}) é **nome de cena** — ficção com [risco](${risco}) de se colar no peito. A [Babality](${babality}) lembra que o próprio jogo já zombava do culto do gore. [Skill](${skill}) aqui é ofício no pad, não ofício de ferir.

## Trailer oficial (eco — transporte)

Embed de [Warner Bros. Games](${WB}) — *Mortal Kombat 1*, Van Damme / Johnny Cage. **Não** substitui o arcade de 1992. O clipe oficial ainda diz o aviso [Finish](${finish}); o laboratório **não** cola a letra nem o input.

@youtube ${YT_ID}

## Poema do laboratório

\`\`\`poem
${poema}
\`\`\`

[▶ Vida](${vida}#poema=mortal-kombat) · [▶ Cadernos](${cadernos}) · [▶ Valeu !!!](${mantra})

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Fight](${fight}) · [Round](${round}) · [Finish](${finish}) | Gritos do anunciador |
| [Fatality](${fatality}) · [Brutality](${brutality}) · [Babality](${babality}) | Família de fechos |
| [GTA 6](${gta6}) · [Grand Bazaar](${bazaar}) · [Diablo](${diablo}) | Outros cadernos |
| [Zangado](${zangado}) | Canal de jogos (hub), não esta ficha |
| [skill](${skill}) · [risco](${risco}) | Ofício no pad × limite |

## Limites

- **Ficha ≠ lista de fatalities / brutalities** (sem comandos).  
- Sem protocolar violência real.  
- Distinto de filme 1995 / 2021 (ecos).  
- *MK1* 2023 = eco.

## Status

**Aprovado — Caderno de jogo 4.** Mortal Kombat (1992): léxico [Fight](${fight}) · [Round](${round}) · [Finish](${finish}) · [Fatality](${fatality}) · [Brutality](${brutality}) · [Babality](${babality}) · [HP](${hp}) · [Mana](${mana}) · [vida × energia](${vidaEnergia}); trailer Warner como transporte.

[▶ Trailer Warner](${YT}) · [▶ Fight](${fight}) · [▶ Finish](${finish}) · [▶ Fatality](${fatality}) · [▶ HP](${hp}) · [▶ Cadernos](${cadernos}) · [▶ Jogos](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

**Game notebook 4** — **Mortal Kombat** (Midway arcade, **August 1992**, Ed Boon & John Tobias). Living mouth: **Konbat**. Field words: [Fight](${fight}), [Round](${round}), [Finish](${finish}), [Fatality](${fatality}), [Brutality](${brutality}), [Babality](${babality}). Not a move list. 2023 *MK1* is an **echo**.

> [Wikipedia](${WIKI_EN}). [1992 game](${WIKI_1992}). [Fatality feature](${WIKI_FAT}). [MK II](${WIKI_MK2}). Official trailer (${YT}) — transport, not genesis.

@youtube ${YT_ID}

## Word map (no inputs)

Fight opens the round · Round is the unit · Finish names the prompt · Fatality names the lethal close · Brutality later combo-close · Babality (MK II) satirical baby close · Friendship sister satire.

## Lab poem

\`\`\`poem
${poemMortalKombatEn()}
\`\`\`

[▶ Vida](${vida}#poema=mortal-kombat) · [▶ Valeu !!!](${mantra})

## Status

**Approved — notebook 4.** 1992 lexicon; no pasted commands.
`;

  const contentEs = `## Alcance

**Cuaderno 4** — **Mortal Kombat** (arcade Midway, **agosto 1992**). Habla viva: **Konbat**. Palabras: [Fight](${fight}), [Round](${round}), [Finish](${finish}), [Fatality](${fatality}), [Brutality](${brutality}), [Babality](${babality}). Sin lista de golpes. *Finish Him/Her* en el fliperama ES: *Acábalo / Acábala*.

> [Wikipedia](${WIKI_EN}). Tráiler oficial (${YT}) — transporte, no génesis.

@youtube ${YT_ID}

## Poema

\`\`\`poem
${poemMortalKombatEs()}
\`\`\`

[▶ Vida](${vida}#poema=mortal-kombat) · [▶ ¡Valeu !!!](${mantra})

## Estado

**Aprobado — cuaderno 4.** Léxico 1992; sin comandos.
`;

  return { body, contentEn, contentEs };
}

function buildMortalKombatCadernoPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildMortalKombatBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 4;
  return jogoPost({
    title: 'Caderno de jogo 4: Mortal Kombat — o fliperama e as palavras do combate',
    titleEn: 'Game notebook 4: Mortal Kombat — the cabinet and the words of the fight',
    titleEs: 'Cuaderno 4: Mortal Kombat — el fliperama y las palabras del combate',
    excerpt:
      'Caderno 4: Mortal Kombat (Midway, 1992) — Konbat; Fight / Round / Finish / Fatality / Brutality / Babality; HUD HP · mana · vida×energia; sem lista de golpes; Valeu !!!',
    excerptEn:
      'Notebook 4: Mortal Kombat (Midway, 1992) — lexicon Fight / Round / Finish / Fatality / Brutality / Babality; no move list; Valeu !!!',
    excerptEs:
      'Cuaderno 4: Mortal Kombat (Midway, 1992) — léxico Fight / Round / Finish / Fatality / Brutality / Babality; sin lista de golpes; ¡Valeu !!!',
    slug: 'inspecao-jogo-mortal-kombat',
    date: '2026-08-23T07:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mortal Kombat · Caderno 4',
    coverImage: '/imagens/inspecoes/mortal-kombat-cover.jpg',
    sourceUrl: WIKI_1992,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMortalKombatCadernoPost,
  buildMortalKombatBodies,
  poemMortalKombatPt,
  poemMortalKombatEn,
  poemMortalKombatEs,
  YT_ID,
  YT,
  WIKI,
  WIKI_EN,
  WIKI_1992,
  WIKI_FAT,
  WIKI_MK2,
  FANDOM,
  OFFICIAL
};
