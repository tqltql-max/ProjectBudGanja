'use strict';

/**
 * Inspeção Palavras · pólvora
 * Pó que a língua nomeia. Pedidos: pOLVORA / FOFO / GOFO / FOGO / ESQUEIRO / FOSFORO.
 * Corta: pólvora × fogo × fofo × fósforo × isqueiro. Sem receita, proporção ou tutorial.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/polvora-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/p%C3%B3lvora';
const WIKI = 'https://pt.wikipedia.org/wiki/P%C3%B3lvora';
const WIKT_FOFO = 'https://pt.wiktionary.org/wiki/fofo';
const WIKT_FOSFORO = 'https://pt.wiktionary.org/wiki/f%C3%B3sforo';
const WIKI_P = 'https://pt.wikipedia.org/wiki/F%C3%B3sforo';
const WIKI_MATCH = 'https://pt.wikipedia.org/wiki/F%C3%B3sforo_(utens%C3%ADlio)';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Chegou pOLVORA.
Chegou FOFO.
Chegou GOFO.
Chegou FOSFORO.
A boca colou o pó no fogo.
A orelha colou o fofo na chama.

Pólvora é o nome do pó.
Não a receita.
Fogo é a lareira.
Fofo é o macio.
Gofo é o fogo de cabeça.
Fósforo é o palito — e o elemento.
Esqueiro é o isqueiro, com lapso.

Seis salas.
Um só sopro.

Valeu !!!
neste pó,
sem escrever o modo.`;
}

function poemEn() {
  return `pOLVORA arrived.
FOFO arrived.
GOFO arrived.
FOSFORO arrived.
The mouth glued powder to fire.
The ear glued softness to flame.

Pólvora is the name of the powder.
Not the recipe.
Fogo is the hearth.
Fofo is the soft.
Gofo is fire turned around.
Fósforo is the match — and the element.
Esqueiro is the lighter, with a slip.

Six rooms.
One breath.

Valeu !!!
on this powder,
without writing the how.`;
}

function poemEs() {
  return `Llegó pOLVORA.
Llegó FOFO.
Llegó GOFO.
Llegó FOSFORO.
La boca pegó el polvo al fuego.
La oreja pegó lo suave a la llama.

Pólvora es el nombre del polvo.
No la receta.
Fogo es el hogar.
Fofo es lo suave.
Gofo es el fuego al revés.
Fósforo es el fósforo — y el elemento.
Esqueiro es el encendedor, con lapsus.

Seis salas.
Un solo soplo.

Valeu !!!
en este polvo,
sin escribir el modo.`;
}

function buildPolvoraBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-polvora.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const incendio = '/posts/post-inspecao-palavra-incendio.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const perigosos = '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html';
  const extintor = '/posts/post-inspecao-palavra-extintor.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const mexico = '/posts/post-inspecao-palavra-mexico.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção da palavra **[pólvora](${self})** — o **nome** do pó que a história ligou ao [fogo](${fogo}). Pedidos de campo no mesmo sopro: *pOLVORA* · *FOFO* · *GOFO* · *FOGO* · *ESQUEIRO* · *FOSFORO*. [A orelha cola](${orelhaCola}) **pólvora** / **fogo** / **fofo** / **fósforo**. O étimo **corta**. Esta ficha é o **vocábulo**. Não é o modo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pólvora](${WIKT}), [Wikipédia · Pólvora](${WIKI}) (história do **nome**, não o miolo técnico), [fofo](${WIKT_FOFO}), [fósforo](${WIKT_FOSFORO}), [elemento P](${WIKI_P}), [utensílio fósforo](${WIKI_MATCH}). **Ficha ≠ receita, ≠ proporção, ≠ mistura, ≠ tutorial de palito, ≠ manual de arma, ≠ pirotecnia.** O laboratório **não** ensina a fazer. Tom: [respeito](${respeito}) do [risco](${risco}); [verdade](${verdade}) do nome.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **pólvora** (PT) |
| Formas vivas | *pólvora* · *polvora* (sem acento) · campo *pOLVORA* |
| Classe | Substantivo feminino — nome de um pó histórico |
| Étimo (trabalho) | Lat. *pulvis, pulveris* («pó, poeira») → *pólvora* — confiança **alta** |
| Tipo BudGanja | Palavra — nome do pó × cadeia de acender |
| Não é | **fogo** (elemento) · **incêndio** (evento) · **fofo** (macio) · **fósforo** (elemento / palito) · **isqueiro** (utensílio) · receita |
| Elo lab | [fogo](${fogo}) · [isqueiro](${isqueiro}) · [cinzeiro](${cinzeiro}) · [incêndio](${incendio}) · [genial](${genial}) |
| Fonte | [pólvora](${WIKT}) |
| Data | ${inspected} |

**Objecto:** a **palavra** que nomeia um pó de ofício antigo (guerra, festa, sinal). O objecto histórico existe nos livros. O **modo** não entra nesta sala.

## 2. Lapsus do sopro — seis salas

| Pedido de campo | O que a orelha / o olho cola | O que **é** |
|-----------------|------------------------------|-------------|
| *pOLVORA* | o pó que arde | **pólvora** ← *pulvis* — o **nome**; não a fórmula de fabrico |
| *FOGO* | a chama | **[fogo](${fogo})** ← *focus* (lareira) — elemento e metáfora; ≠ o pó |
| *FOFO* | quase FOGO (F×G) | **fofo** — macio, fofinho; [Wikcionário](${WIKT_FOFO}); **≠** chama |
| *GOFO* | fogo embaralhado | Lapso / anagrama de **fogo** — não é vocábulo de ofício |
| *ESQUEIRO* | isca na boca | **[isqueiro](${isqueiro})** (*isca* + *-eiro*); lapso *esqueiro*; **≠** escada minhota nesta ficha |
| *FOSFORO* | palito e brilho | **fósforo** — (1) elemento P (*phosphoros*, «portador de luz»); (2) palito de acender no PT — **duas** salas |

**H1:** *pólvora* < *pulvis* — alta confiança: é **pó** no étimo, não «fogo em pó» como composição.  
**H2:** [fogo](${fogo}) é *focus* (lareira). A pólvora **usa** fogo na história; não **é** o fogo.  
**H3:** *FOFO* / *FOGO* é cola de **olho** (uma haste). *fofo* é qualidade táctil.  
**H4:** *gofo* não promove grafia; guarda o gatilho.  
**H5:** *fósforo* elemento ≠ *fósforo* palito. Nenhum dos dois é tutorial.  
**H6:** *esqueiro* já está na ficha [isqueiro BIC](${isqueiro}). Aqui só entra como elo da cadeia de acender.

## 3. Fósforo — duas salas (sem modo)

O português usa **fósforo** para o **elemento** e para o **palito**. A orelha funde. O lab corta.

| Sala | Leitura | Não é |
|------|---------|-------|
| Elemento P | Gr. *φωσφόρος* (*phosphoros*) — «que traz luz»; [Wikipédia · Fósforo](${WIKI_P}) | ≠ palito · ≠ pólvora · ≠ receita |
| Utensílio | Palito de acender, no uso vivo; [utensílio](${WIKI_MATCH}) | ≠ elemento · ≠ isqueiro · ≠ modo de fabrico |
| Corte | Nomear o objecto | **Sem** cabeça, **sem** risca, **sem** mistura |

**Ficha ≠ química de bancada, ≠ história técnica do palito, ≠ substituição da pólvora.**

## 4. Fofo × fogo × gofo

| Forma | Ofício | Corte |
|-------|--------|-------|
| **fofo** | Macio, fofinho, afetivo | Qualidade táctil — **≠** chama |
| **fogo** | [Lareira / elemento](${fogo}) | *focus* — **≠** pó |
| **gofo** | Lapso | *fogo* com letras a andar — não dicionarizar |

O olho lê *FOFO* e *FOGO* no mesmo bloco. O étimo não lê.

## 5. Cadeia de acender — já fichada noutros sítios

| Elo | Papel nesta ficha | Já existe |
|-----|-------------------|-----------|
| [Fogo](${fogo}) | Elemento; par [água](${agua}); medida | Sim |
| [Calor × frio](${calorFrio}) | Qualidade térmica — ≠ pó, ≠ chama | Sim |
| [Incêndio](${incendio}) | Evento descontrolado — ≠ nome *pólvora* | Sim |
| [Isqueiro](${isqueiro}) | Utensílio de bolso; lapso *esqueiro* | Sim |
| [Cinzeiro](${cinzeiro}) | Cinza + *-eiro* — depois da chama | Sim |
| [Extintor](${extintor}) / [objectos perigosos](${perigosos}) | Controle; [risco](${risco}) | Sim |
| [México](${mexico}) | Outro sopro: o golfo **não** é «fósforo do mundo» | Sim |

Esta ficha **não** substitui nenhuma delas. Só nomeia o **pó** e corta o que a boca colou.

## 6. Genial e fórmula — sem fundir

O campo pediu relacionar pólvora com o que der. Dois elos honestos, sem merch:

| Palavra | Papel | Não é |
|---------|-------|-------|
| [Genial](${genial}) | Elogio de engenho — o **feito** inspecionado | ≠ licença para fabricar o pó |
| *fórmula* / *Fórmula 1* | Lema escrito × campeonato × [Senna](${senna}) | **Outra** sala; não entra receita nem patrocínio nesta ficha |

**Engenho que nomeia ≠ engenho que mistura.** O laboratório fica no primeiro.

## 7. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| Nomear o pó | Palavra histórica | Uma sala: *pulvis* |
| Avisar o risco | Objecto perigoso de verdade | [Risco](${risco}) · [objectos](${objetos}) — sem tutorial |
| Corrigir o sopro | FOFO / GOFO / FOSFORO | Guardar o gatilho; não promover a grafia |
| Não fundir | Fogo, palito, isqueiro, macio | Quatro étimos, quatro ofícios |

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 8. Valeu !!!

O melhor **hoje** é o mapa com seis salas e **zero** modos: pólvora (nome do pó), fogo (lareira), fofo (macio), gofo (lapso), fósforo (elemento / palito), esqueiro (isqueiro). [Valeu !!!](${mantra}) — *pOLVORA* endereçada; a boca cola; o lab não ensina a fazer.

## 9. Estado

**Aprovada** — pólvora fichada como **palavra**; FOFO / GOFO / FOSFORO / ESQUEIRO cortados; **sem** receita.

[▶ Palavras](${hub}) · [▶ Orelha cola](${orelhaCola}) · [▶ Fogo](${fogo}) · [▶ Isqueiro](${isqueiro}) · [▶ Incêndio](${incendio}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[pólvora](${self})** — the **name** of a historical powder tied to [fogo](${fogo}). Field slips: *pOLVORA* · *FOFO* · *GOFO* · *FOGO* · *ESQUEIRO* · *FOSFORO*.

[The ear glues](${orelhaCola}) powder / fire / softness / match. The etymon **cuts**. This sheet is the **word**. Not the how.

> **Not a recipe. Not a ratio. Not a match tutorial. Not a weapons manual.** The lab does not teach making.

## Object

| Field | Value |
|-------|-------|
| Anchor | **pólvora** ← Lat. *pulvis* (“dust”) — **high** confidence |
| Fire | **[fogo](${fogo})** ← *focus* (hearth) — not the powder |
| Soft | **fofo** — tactile; eye-glue FOFO / FOGO |
| Gofo | slip / anagram of *fogo* — not a craft word |
| Match / P | **fósforo** — element P **and** the matchstick in PT — two rooms; no how-to |
| Lighter | **[isqueiro](${isqueiro})** — slip *esqueiro* |
| Lab | [genial](${genial}) names ingenuity; it does not license mixing |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** six rooms. Zero methods. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Ear glue](${orelhaCola}) · [▶ Fire](${fogo}) · [▶ Lighter](${isqueiro}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[pólvora](${self})** — el **nombre** de un polvo histórico ligado al [fuego](${fogo}). Lapsus: *pOLVORA* · *FOFO* · *GOFO* · *FOGO* · *ESQUEIRO* · *FOSFORO*.

[La oreja pega](${orelhaCola}) polvo / fuego / suavidad / fósforo. El étimo **corta**. Esta ficha es la **palabra**. No el modo.

> **No es receta, ni proporción, ni tutorial de fósforo, ni manual de arma.** El laboratorio no enseña a hacer.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **pólvora** ← lat. *pulvis* («polvo») — confianza **alta** |
| Fuego | **[fogo](${fogo})** ← *focus* — no es el polvo |
| Suave | **fofo** — táctil; el ojo pega FOFO / FOGO |
| Gofo | lapsus / anagrama de *fogo* |
| Fósforo | elemento P **y** el palito en PT — dos salas; sin modo |
| Encendedor | **[isqueiro](${isqueiro})** — lapsus *esqueiro* |
| Lab | [genial](${genial}) nombra el ingenio; no licencia mezclar |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** seis salas. Cero métodos. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Oreja pega](${orelhaCola}) · [▶ Fuego](${fogo}) · [▶ Encendedor](${isqueiro}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildPolvoraPost() {
  const { body, contentEn, contentEs, wiki } = buildPolvoraBodies();
  const seriesOrder = pickOrder('inspecao-palavra-polvora', 262);
  return makePalavra({
    title: 'Inspeção: pólvora — o nome do pó, não a receita',
    titleEn: 'Inspection: pólvora — the name of the powder, not the recipe',
    titleEs: 'Inspección: pólvora — el nombre del polvo, no la receta',
    excerpt:
      'Palavras: pólvora (pulvis) — nome ≠ fogo ≠ fofo ≠ fósforo ≠ isqueiro; sem receita; Valeu !!!',
    excerptEn:
      'Words: pólvora (pulvis) — name ≠ fire ≠ soft ≠ match ≠ lighter; no recipe; Valeu !!!',
    excerptEs:
      'Palabras: pólvora (pulvis) — nombre ≠ fuego ≠ fofo ≠ fósforo ≠ encendedor; sin receta; ¡Valeu !!!',
    slug: 'inspecao-palavra-polvora',
    date: '2026-08-23T12:50:00.000Z',
    seriesOrder,
    seriesLabel: 'pólvora · pulvis',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildPolvoraPost, buildPolvoraBodies, poemPt, poemEn, poemEs };
