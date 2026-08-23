'use strict';

/**
 * Palavras do game · cluster Mortal Kombat + HUD.
 * Fight, Round/Raund, Finish, Fatality/Fatallitty, Brutality/Brutalititi,
 * Babality/babalitity, HP, Mana, vida × energia.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const MK = '/posts/post-inspecao-jogo-mortal-kombat.html';
const FINISH = '/posts/post-inspecao-palavra-finish.html';
const FATALITY = '/posts/post-inspecao-palavra-fatality.html';
const BRUTALITY = '/posts/post-inspecao-palavra-brutality.html';
const BABALITY = '/posts/post-inspecao-palavra-babality.html';
const ROUND = '/posts/post-inspecao-palavra-round.html';
const FIGHT = '/posts/post-inspecao-palavra-fight.html';
const HP = '/posts/post-inspecao-palavra-hp.html';
const MANA = '/posts/post-inspecao-palavra-mana.html';
const VIDA_EN = '/posts/post-inspecao-palavra-vida-energia.html';
const VIDA_LAB = '/posts/post-inspecao-palavra-vida.html';
const SKILL = '/posts/post-inspecao-palavra-skill.html';
const RISCO = '/posts/post-inspecao-palavra-risco.html';
const GESTO = '/posts/post-inspecao-palavra-gesto.html';
const MANTRA = '/posts/post-inspecao-palavra-valeu.html';
const HUB = '/biblioteca/inspecoes/#inspecoes-palavras';
const GUIA = '/guia/palavras.html';
const WIKI_FAT = 'https://en.wikipedia.org/wiki/Fatality_%28Mortal_Kombat%29';
const WIKI_MK2 = 'https://en.wikipedia.org/wiki/Mortal_Kombat_II';
const WIKI_HP = 'https://en.wikipedia.org/wiki/Health_%28game_terminology%29';
const WIKI_MANA = 'https://en.wikipedia.org/wiki/Magic_points';
const WIKT_FINISH = 'https://en.wiktionary.org/wiki/finish';
const WIKT_FIGHT = 'https://en.wiktionary.org/wiki/fight';
const WIKT_ROUND = 'https://en.wiktionary.org/wiki/round';
const WIKT_FATAL = 'https://en.wiktionary.org/wiki/fatality';
const WIKT_BRUTAL = 'https://en.wiktionary.org/wiki/brutality';
const WIKT_MANA = 'https://en.wiktionary.org/wiki/mana';
const WIKT_HP = 'https://en.wiktionary.org/wiki/hit_point';
const WIKT_ENERGIA = 'https://pt.wiktionary.org/wiki/energia';

function pickOrder(slug, start) {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
  } catch (_) {
    /* keep start */
  }
  return start;
}

function shortI18n(en, es) {
  return { contentEn: en, contentEs: es };
}

function redeMk() {
  return `| Recurso | Papel |
|---------|-------|
| [Mortal Kombat](${MK}) | Caderno 4 — o gabinete |
| [Fight](${FIGHT}) · [Round](${ROUND}) · [Finish](${FINISH}) | Gritos |
| [Fatality](${FATALITY}) · [Brutality](${BRUTALITY}) · [Babality](${BABALITY}) | Fechos |
| [HP](${HP}) · [Mana](${MANA}) · [vida × energia](${VIDA_EN}) | HUD |
| [Vida](${VIDA_LAB}) | Palavra do laboratório — **não** a barra |
| [skill](${SKILL}) · [risco](${RISCO}) · [gesto](${GESTO}) | Ofício |
| [Valeu !!!](${MANTRA}) | Fecho |`;
}

function buildFightBodies() {
  const body = `## Escopo

Inspeção editorial de **Fight** — o grito inglês que **abre** o round no fliperama. Pedido de campo com [Mortal Kombat](${MK}). Irmão imediato: [Round](${ROUND}) (*Raund*). **Não** é a luta na rua.

> Fontes: [Wiktionary · fight](${WIKT_FIGHT}), caderno [MK](${MK}). **Ficha ≠ tutorial de luta, ≠ briga real.**

**Gatilho:** *Fight!* / *Fait* / *Faight*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Fight** |
| Classe | Verbo / interjeição de HUD |
| Étimo | OE *feohtan* ← germânico — confiança **alta** |
| Irmã PT | **luta** · **combate** · *Kombat* (marca com **K**) |
| Tipo BudGanja | Palavra — grito de abertura × [gesto](${GESTO}) no pad |
| Não é | Briga na rua · [Finish](${FINISH}) (aviso de fecho) |
| Elo jogo | [Mortal Kombat](${MK}) · [Round](${ROUND}) |
| Data | 2026-08-23 |

**H1:** no gabinete, Fight é **sinal de começar**, não ética de violência.  
**H2:** [Finish](${FINISH}) é o outro extremo do mesmo anunciador.  
**H3:** fecho = [Valeu !!!](${MANTRA}).

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Ler Fight como **abrir o round** |
| Mau | Traduzir Fight em receita de ferir |

${redeMk()}

## Status

**Aprovado na série Palavras** — Fight = grito de abertura; caderno [MK](${MK}).

[▶ Palavras](${HUB}) · [▶ Mortal Kombat](${MK}) · [▶ Round](${ROUND}) · [▶ Guia](${GUIA})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Fight** — the announcer shout that **opens** the round. Not a street fight. Sister: [Round](${ROUND}). Cabinet: [Mortal Kombat](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Fight** — el grito que **abre** el round. No es pelea de calle. Hermano: [Round](${ROUND}). [Mortal Kombat](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildRoundBodies() {
  const body = `## Escopo

Inspeção editorial de **Round** — a **unidade** da luta no HUD. Fala viva: **Raund**. No Mortal Kombat clássico, o anunciador conta o round e depois grita [Fight](${FIGHT}).

> Fontes: [Wiktionary · round](${WIKT_ROUND}) (lat. *rotundus* via francês). Caderno [MK](${MK}).

**Gatilho:** *Round 1* / *Raund* / *Ronde*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Round** · boca **Raund** |
| Étimo | Fr. *rond* ← lat. *rotundus* — confiança **alta** |
| Irmã PT | **assalto** · **round** (empréstimo vivo) |
| Não é | [Finish](${FINISH}) · fim da [Vida](${VIDA_LAB}) |
| Elo | [Fight](${FIGHT}) abre; o último round pode abrir [Finish](${FINISH}) |
| Data | 2026-08-23 |

**H1:** Round mede o **combate no ecrã**, não a vida da pessoa.  
**H2:** *Raund* é a orelha; o lema EN guarda *round*.

${redeMk()}

## Status

**Aprovado** — Round / *Raund* fichado; [MK](${MK}).

[▶ Palavras](${HUB}) · [▶ Fight](${FIGHT}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Round** (living **Raund**) — the match unit. [Fight](${FIGHT}) opens it. [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Round** (habla **Raund**) — la unidad del combate. [Fight](${FIGHT}) lo abre. [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildFinishBodies() {
  const body = `## Escopo

Inspeção editorial de **Finish** — o inglês *to finish* (lat. *fīnīre* ← *fīnis* «fim»). No fliperama Mortal Kombat, **Finish Him / Finish Her** é o **nome do aviso** (ES de gabinete: *Acábalo / Acábala*). **Não** é ordem de acabar a pessoa. A cena letal tem outro nome: [Fatality](${FATALITY}).

> Fontes: [Wiktionary · finish](${WIKT_FINISH}), [Fatality (MK)](${WIKI_FAT}), [MK](${MK}). **Sem colar sequência de botões.**

**Gatilho:** *Finish* / *Finish Him* / *Finish Her* / *Finishe*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Finish** |
| Étimo | lat. *fīnīre* — confiança **alta** |
| Irmã PT | **acabar** · **terminar** · **fechar** |
| Tipo | Aviso de **janela** no último round |
| Não é | [Fatality](${FATALITY}) (o fecho nomeado) · fim da [Vida](${VIDA_LAB}) |
| Data | 2026-08-23 |

**H1:** Finish no MK é **prompt**, não ética.  
**H2:** [Fight](${FIGHT}) abre; Finish avisa o fecho.  
**H3:** a ficha **não** ensina o golpe.

${redeMk()}

## Status

**Aprovado** — Finish = aviso; [Fatality](${FATALITY}) = nome da cena.

[▶ Palavras](${HUB}) · [▶ Fatality](${FATALITY}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Finish** — in MK, the **prompt name** (*Finish Him/Her*), not a real-world order. Lethal close: [Fatality](${FATALITY}). No inputs. [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Finish** — en MK, nombre del aviso (*Acábalo / Acábala*). Cierre letal: [Fatality](${FATALITY}). Sin comandos. [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildFatalityBodies() {
  const body = `## Escopo

Inspeção editorial de **Fatality** — EN *fatality* (lat. *fātālis* ← *fātum*). Fala viva: **Fatallitty**. No Mortal Kombat (1992), é o **fecho letal nomeado** depois do aviso [Finish](${FINISH}). Referência: [Wikipedia · Fatality (Mortal Kombat)](${WIKI_FAT}). **Sem lista de golpes.**

> Caderno [MK](${MK}). **Ficção de ecrã ≠ protocolo.**

**Gatilho:** *Fatality* / *Fatallitty* / *Fataliti* / *Fatalidade* (calco).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Fatality** · boca **Fatallitty** |
| Étimo | lat. *fātālis* — confiança **alta** no EN geral; no jogo = **termo de marca** |
| Origem no game | Arcade **1992** |
| Irmãos | [Brutality](${BRUTALITY}) · [Babality](${BABALITY}) · Friendship (eco) |
| Não é | Receita · [HP](${HP}) a zero sem cena |
| Data | 2026-08-23 |

**H1:** Fatality é **nome de cena**, não destino (*fātum*) da pessoa.  
**H2:** *Fatallitty* é a orelha a alongar o lema.

${redeMk()}

## Status

**Aprovado** — Fatality / *Fatallitty*; sem comandos; [MK](${MK}).

[▶ Palavras](${HUB}) · [▶ Finish](${FINISH}) · [▶ Brutality](${BRUTALITY}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Fatality** (living **Fatallitty**) — named lethal closer after [Finish](${FINISH}). Source: [Wikipedia](${WIKI_FAT}). No move list. [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Fatality** (habla **Fatallitty**) — cierre letal nombrado tras [Finish](${FINISH}). [Wikipedia](${WIKI_FAT}). Sin lista. [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildBrutalityBodies() {
  const body = `## Escopo

Inspeção editorial de **Brutality** — EN *brutality* (lat. *brūtālis*). Fala viva: **Brutalititi**. No Mortal Kombat entra como **fecho** distinto da [Fatality](${FATALITY}): primeiro em **Ultimate Mortal Kombat 3** / Trilogy (combo longo); depois os títulos recentes **reamarram** a palavra a condições de golpe. Referência: [Wikipedia · Fatality (MK)](${WIKI_FAT}) (secção Brutality). **Sem inputs.**

**Gatilho:** *Brutality* / *Brutalititi* / *Brutaliti*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Brutality** · boca **Brutalititi** |
| Origem no game | UMK3 / Trilogy; regresso e redesign (MKX, MK11, MK1) |
| Distinto de | [Fatality](${FATALITY}) (cena após [Finish](${FINISH})) |
| Data | 2026-08-23 |

**H1:** Brutality é **irmã** da Fatality, não o mesmo fecho.  
**H2:** a ficha lê o **nome**, não o combo.

${redeMk()}

## Status

**Aprovado** — Brutality / *Brutalititi*; [MK](${MK}).

[▶ Palavras](${HUB}) · [▶ Fatality](${FATALITY}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Brutality** (living **Brutalititi**) — later named closer, distinct from [Fatality](${FATALITY}). [Wiki](${WIKI_FAT}). No inputs. [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Brutality** (habla **Brutalititi**) — cierre posterior, distinto de [Fatality](${FATALITY}). Sin comandos. [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildBabalityBodies() {
  const body = `## Escopo

Inspeção editorial de **Babality** — palavra **cunhada no jogo** (*baby* + *-ality*, paródia de [Fatality](${FATALITY})). Fala viva: **babalitity**. Introduzida em **Mortal Kombat II** (1993) com as **Friendships**: o rival vira **bebé**. Referência: [Wikipedia · Mortal Kombat II](${WIKI_MK2}), [Fatality (MK)](${WIKI_FAT}). É **sátira** da polémica do gore — não tutorial.

**Gatilho:** *Babality* / *babalitity* / *Babaliti*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Babality** · boca **babalitity** |
| Étimo | EN *baby* + calco de *Fatality* — **alta** (termo de jogo) |
| Origem | **MK II** (1993) |
| Irmã | Friendship (fecho amistoso — eco no [caderno](${MK})) |
| Data | 2026-08-23 |

**H1:** Babality **zomba** do culto do fecho letal.  
**H2:** não é a [Vida](${VIDA_LAB}) do laboratório nem a barra de [HP](${HP}).

${redeMk()}

## Status

**Aprovado** — Babality / *babalitity*; sátira MK II; [MK](${MK}).

[▶ Palavras](${HUB}) · [▶ Fatality](${FATALITY}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Babality** (living **babalitity**) — MK II satirical baby close; sister Friendship. [MK II](${WIKI_MK2}). [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Babality** (habla **babalitity**) — cierre satírico de MK II (bebé). [MK II](${WIKI_MK2}). [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildHpBodies() {
  const body = `## Escopo

Inspeção editorial de **HP** — *hit points* / *health points*. No HUD, a barra que o BR chama **vida**. Distinto da ficha [Vida](${VIDA_LAB}) (ofício de viver). Par: [vida × energia](${VIDA_EN}). Referência: [Wikipedia · Health (game terminology)](${WIKI_HP}), [Wiktionary · hit point](${WIKT_HP}).

**Gatilho:** *HP* / *life bar* / *barra de vida*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **HP** |
| Étimo de uso | Wargames / D&D → videojogos — confiança **alta** no uso |
| Irmã PT | **vida** (HUD) · **barra** |
| Não é | [Vida](${VIDA_LAB}) · [Mana](${MANA}) · [energia](${VIDA_EN}) |
| Elo | [Mortal Kombat](${MK}) (a barra no topo) |
| Data | 2026-08-23 |

**H1:** HP a zero no ecrã **não** é o fim da [Vida](${VIDA_LAB}).  
**H2:** o laboratório corta HUD × peito.

${redeMk()}

## Status

**Aprovado** — HP = barra; ≠ [Vida](${VIDA_LAB}).

[▶ Palavras](${HUB}) · [▶ vida × energia](${VIDA_EN}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**HP** — hit/health points. PT HUD often says **vida**. Not lab [Vida](${VIDA_LAB}). Pair: [vida × energia](${VIDA_EN}). [Wiki](${WIKI_HP}).\n\n**Approved.**`,
      `## Alcance\n\n**HP** — puntos de golpe. En PT del HUD: **vida**. ≠ [Vida](${VIDA_LAB}). [vida × energía](${VIDA_EN}).\n\n**Aprobada.**`
    )
  );
}

function buildManaBodies() {
  const body = `## Escopo

Inspeção editorial de **Mana** — empréstimo do **mana** oceânico (poder / eficácia) para o **HUD de magia** (MP). Referência: [Wiktionary · mana](${WIKT_MANA}), [Wikipedia · Magic points](${WIKI_MANA}). Nos lutadores (MK) o meter pode ter outro nome; a boca ainda diz **mana** para a reserva especial. Par: [vida × energia](${VIDA_EN}).

**Gatilho:** *Mana* / *MP* / *magia*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Mana** |
| Étimo | Línguas austronésias → fantasy RPG → HUD — confiança **alta** no percurso de jogo |
| Distinto de | [HP](${HP}) (vida no ecrã) · [energia](${VIDA_EN}) (meter genérico) |
| Não é | Ritual · a [Vida](${VIDA_LAB}) do laboratório |
| Data | 2026-08-23 |

**H1:** mana de HUD é **contador**, não teologia.  
**H2:** no MK o vocábulo vive como **empréstimo de jogador**, mesmo quando o UI diz *special* / *super*.

${redeMk()}

## Status

**Aprovado** — Mana = reserva de HUD; [MK](${MK}) como casa do cluster.

[▶ Palavras](${HUB}) · [▶ HP](${HP}) · [▶ vida × energia](${VIDA_EN})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Mana** — Oceanic word → RPG MP bar. Distinct from [HP](${HP}). [Magic points](${WIKI_MANA}). [MK](${MK}) cluster.\n\n**Approved.**`,
      `## Alcance\n\n**Mana** — palabra oceánica → barra de magia. Distinto de [HP](${HP}). [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function buildVidaEnergiaBodies() {
  const body = `## Escopo

Inspeção editorial do par **vida × energia** no **HUD**. A boca pediu *VIda Energia*. **Vida** aqui é a barra de [HP](${HP}) — **não** a ficha [Vida](${VIDA_LAB}) (ofício de viver, mantra, laboratório). **Energia** é o meter (stamina, especial, super) — irmã de [Mana](${MANA}) quando o jogo fala magia. Fontes: [Health (games)](${WIKI_HP}), [Magic points](${WIKI_MANA}), [Wikcionário · energia](${WIKT_ENERGIA}).

**Gatilho:** *vida* (barra) / *energia* / *stamina* / *meter*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Par | **vida** (HUD) × **energia** (meter) |
| Vida HUD | = [HP](${HP}) |
| Energia | meter de recurso — às vezes [Mana](${MANA}) |
| ≠ | [Vida](${VIDA_LAB}) — palavra do laboratório |
| Elo | [Mortal Kombat](${MK}) — duas lógicas no topo do ecrã |
| Data | 2026-08-23 |

**H1:** duas barras, dois ofícios — uma cai com o dano, outra gasta o especial.  
**H2:** colar «vida» do HUD na [Vida](${VIDA_LAB}) é o erro que esta ficha corta.

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Dizer **HP** / **barra** quando for o ecrã |
| Bom | Guardar [Vida](${VIDA_LAB}) para o ofício de viver |
| Mau | «Acabou a vida» = a pessoa |

${redeMk()}

## Status

**Aprovado** — vida×energia = HUD; ≠ [Vida](${VIDA_LAB}). [Valeu !!!](${MANTRA}).

[▶ Palavras](${HUB}) · [▶ HP](${HP}) · [▶ Mana](${MANA}) · [▶ Vida (lab)](${VIDA_LAB}) · [▶ Mortal Kombat](${MK})
`;
  return Object.assign(
    { body },
    shortI18n(
      `## Scope\n\n**Life × energy** on the HUD. HUD **vida** = [HP](${HP}), not lab [Vida](${VIDA_LAB}). Energy meter sister of [Mana](${MANA}). [MK](${MK}).\n\n**Approved.**`,
      `## Alcance\n\n**Vida × energía** del HUD. La vida de barra = [HP](${HP}), no la [Vida](${VIDA_LAB}) del laboratorio. [MK](${MK}).\n\n**Aprobada.**`
    )
  );
}

function pack(slug, start, meta, bodies) {
  const { body, contentEn, contentEs } = bodies();
  return makePalavra(
    Object.assign(
      {
        slug,
        date: '2026-08-23T07:10:00.000Z',
        seriesOrder: pickOrder(slug, start),
        body,
        contentEn,
        contentEs
      },
      meta
    )
  );
}

function buildFightPost() {
  return pack('inspecao-palavra-fight', 250, {
    title: 'Inspeção: Fight — o grito que abre o round, não a briga na rua',
    titleEn: 'Inspection: Fight — the shout that opens the round, not a street fight',
    titleEs: 'Inspección: Fight — el grito que abre el round, no la pelea de calle',
    excerpt: 'Palavras: Fight — grito de abertura no Mortal Kombat; ≠ luta na rua; elo Round / Finish; Valeu !!!',
    excerptEn: 'Words: Fight — MK opening shout; not a street fight; Valeu !!!',
    excerptEs: 'Palabras: Fight — grito de apertura en MK; ≠ pelea de calle; ¡Valeu !!!',
    seriesLabel: 'Fight · palavra',
    coverImage: '/imagens/inspecoes/fight-palavra-cover.jpg',
    sourceUrl: WIKT_FIGHT
  }, buildFightBodies);
}

function buildRoundPost() {
  return pack('inspecao-palavra-round', 251, {
    title: 'Inspeção: Round — Raund, a unidade do combate no ecrã',
    titleEn: 'Inspection: Round — Raund, the unit of on-screen combat',
    titleEs: 'Inspección: Round — Raund, la unidad del combate en pantalla',
    excerpt: 'Palavras: Round / Raund — unidade da luta; Fight abre; Finish pode fechar o último; Valeu !!!',
    excerptEn: 'Words: Round / living Raund — match unit; Valeu !!!',
    excerptEs: 'Palabras: Round / Raund — unidad del combate; ¡Valeu !!!',
    seriesLabel: 'Round · palavra',
    coverImage: '/imagens/inspecoes/round-palavra-cover.jpg',
    sourceUrl: WIKT_ROUND
  }, buildRoundBodies);
}

function buildFinishPost() {
  return pack('inspecao-palavra-finish', 252, {
    title: 'Inspeção: Finish — o aviso do fliperama, não o fim da pessoa',
    titleEn: 'Inspection: Finish — the cabinet prompt, not the end of a person',
    titleEs: 'Inspección: Finish — el aviso del fliperama, no el fin de la persona',
    excerpt: 'Palavras: Finish — Finish Him/Her = nome do aviso (Acábalo); Fatality é a cena; sem golpes; Valeu !!!',
    excerptEn: 'Words: Finish — MK prompt name; Fatality is the close; no inputs; Valeu !!!',
    excerptEs: 'Palabras: Finish — aviso (Acábalo); Fatality es la escena; ¡Valeu !!!',
    seriesLabel: 'Finish · palavra',
    coverImage: '/imagens/inspecoes/finish-palavra-cover.jpg',
    sourceUrl: WIKT_FINISH
  }, buildFinishBodies);
}

function buildFatalityPost() {
  return pack('inspecao-palavra-fatality', 253, {
    title: 'Inspeção: Fatality — Fatallitty, o fecho letal nomeado',
    titleEn: 'Inspection: Fatality — Fatallitty, the named lethal close',
    titleEs: 'Inspección: Fatality — Fatallitty, el cierre letal nombrado',
    excerpt: 'Palavras: Fatality / Fatallitty — fecho letal MK 1992 depois de Finish; sem lista de golpes; Valeu !!!',
    excerptEn: 'Words: Fatality / living Fatallitty — MK 1992 named close; no move list; Valeu !!!',
    excerptEs: 'Palabras: Fatality / Fatallitty — cierre letal; sin lista; ¡Valeu !!!',
    seriesLabel: 'Fatality · palavra',
    coverImage: '/imagens/inspecoes/fatality-palavra-cover.jpg',
    sourceUrl: WIKI_FAT
  }, buildFatalityBodies);
}

function buildBrutalityPost() {
  return pack('inspecao-palavra-brutality', 254, {
    title: 'Inspeção: Brutality — Brutalititi, o fecho irmão da Fatality',
    titleEn: 'Inspection: Brutality — Brutalititi, Fatality’s sister close',
    titleEs: 'Inspección: Brutality — Brutalititi, el cierre hermano de Fatality',
    excerpt: 'Palavras: Brutality / Brutalititi — fecho UMK3 e depois; distinto de Fatality; sem inputs; Valeu !!!',
    excerptEn: 'Words: Brutality / living Brutalititi — later MK closer; Valeu !!!',
    excerptEs: 'Palabras: Brutality / Brutalititi — cierre posterior; ¡Valeu !!!',
    seriesLabel: 'Brutality · palavra',
    coverImage: '/imagens/inspecoes/brutality-palavra-cover.jpg',
    sourceUrl: WIKI_FAT
  }, buildBrutalityBodies);
}

function buildBabalityPost() {
  return pack('inspecao-palavra-babality', 255, {
    title: 'Inspeção: Babality — babalitity, o fecho satírico do bebé',
    titleEn: 'Inspection: Babality — babalitity, the satirical baby close',
    titleEs: 'Inspección: Babality — babalitity, el cierre satírico del bebé',
    excerpt: 'Palavras: Babality / babalitity — MK II; paródia da Fatality; Friendship é irmã; Valeu !!!',
    excerptEn: 'Words: Babality / living babalitity — MK II satire; Valeu !!!',
    excerptEs: 'Palabras: Babality / babalitity — sátira MK II; ¡Valeu !!!',
    seriesLabel: 'Babality · palavra',
    coverImage: '/imagens/inspecoes/babality-palavra-cover.jpg',
    sourceUrl: WIKI_MK2
  }, buildBabalityBodies);
}

function buildHpPost() {
  return pack('inspecao-palavra-hp', 256, {
    title: 'Inspeção: HP — hit points; a barra que o BR chama vida',
    titleEn: 'Inspection: HP — hit points; the bar PT calls vida',
    titleEs: 'Inspección: HP — hit points; la barra que el BR llama vida',
    excerpt: 'Palavras: HP — hit points; HUD vida ≠ ficha Vida do laboratório; elo mana / energia; Valeu !!!',
    excerptEn: 'Words: HP — health bar; not lab Vida; Valeu !!!',
    excerptEs: 'Palabras: HP — barra; ≠ Vida del laboratorio; ¡Valeu !!!',
    seriesLabel: 'HP · palavra',
    coverImage: '/imagens/inspecoes/hp-palavra-cover.jpg',
    sourceUrl: WIKI_HP
  }, buildHpBodies);
}

function buildManaPost() {
  return pack('inspecao-palavra-mana', 257, {
    title: 'Inspeção: Mana — a reserva de magia no HUD, não um rito',
    titleEn: 'Inspection: Mana — the HUD magic reserve, not a rite',
    titleEs: 'Inspección: Mana — la reserva de magia del HUD, no un rito',
    excerpt: 'Palavras: Mana — oceânico → MP de jogo; distinto de HP e da Vida do lab; Valeu !!!',
    excerptEn: 'Words: Mana — Oceanic word → MP bar; Valeu !!!',
    excerptEs: 'Palabras: Mana — barra de magia; ¡Valeu !!!',
    seriesLabel: 'Mana · palavra',
    coverImage: '/imagens/inspecoes/mana-palavra-cover.jpg',
    sourceUrl: WIKI_MANA
  }, buildManaBodies);
}

function buildVidaEnergiaPost() {
  return pack('inspecao-palavra-vida-energia', 258, {
    title: 'Inspeção: Vida e energia — duas barras; a Vida do laboratório é outra',
    titleEn: 'Inspection: Life and energy — two bars; lab Vida is another word',
    titleEs: 'Inspección: Vida y energía — dos barras; la Vida del laboratorio es otra',
    excerpt: 'Palavras: vida × energia no HUD — HP e meter; ≠ ficha Vida; elos mana e Mortal Kombat; Valeu !!!',
    excerptEn: 'Words: HUD life × energy — HP and meter; not lab Vida; Valeu !!!',
    excerptEs: 'Palabras: vida × energía del HUD; ≠ Vida del lab; ¡Valeu !!!',
    seriesLabel: 'Vida × energia · palavra',
    coverImage: '/imagens/inspecoes/vida-energia-palavra-cover.jpg',
    sourceUrl: WIKI_HP
  }, buildVidaEnergiaBodies);
}

function buildMortalKombatPalavrasPosts() {
  return [
    buildFightPost(),
    buildRoundPost(),
    buildFinishPost(),
    buildFatalityPost(),
    buildBrutalityPost(),
    buildBabalityPost(),
    buildHpPost(),
    buildManaPost(),
    buildVidaEnergiaPost()
  ];
}

module.exports = {
  buildMortalKombatPalavrasPosts,
  buildFightPost,
  buildRoundPost,
  buildFinishPost,
  buildFatalityPost,
  buildBrutalityPost,
  buildBabalityPost,
  buildHpPost,
  buildManaPost,
  buildVidaEnergiaPost
};
