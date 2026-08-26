'use strict';

/**
 * Inspeção Palavras · México (especial)
 * País ← náuatle Mēxihco. Pedidos de campo: Coongo / Gongo / gosfo / golfo / golfe.
 * Corta: golfo (mar) × golfe (jogo) × gongo (instrumento) × Congo (África).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mexico-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/M%C3%A9xico';
const WIKT = 'https://pt.wiktionary.org/wiki/M%C3%A9xico';
const WIKT_NAH = 'https://en.wiktionary.org/wiki/M%C4%93xihco#Classical_Nahuatl';
const WIKI_GULF = 'https://pt.wikipedia.org/wiki/Golfo_do_M%C3%A9xico';
const WIKI_GOLF = 'https://pt.wikipedia.org/wiki/Golfe';
const WIKT_GONGO = 'https://pt.wiktionary.org/wiki/gongo';
const WIKI_CONGO = 'https://pt.wikipedia.org/wiki/Rep%C3%BAblica_Democr%C3%A1tica_do_Congo';

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
  return `Chegou gosfo.
Chegou coongo.
Chegou gongo.
O mapa já sabia o nome:
México.
Ao lado, o golfo.
Não o golfe.
Não o gongo.
Não o Congo.

O país tem um umbigo de náuatle.
O mar toma o nome emprestado.
O jogo veio da Escócia.
O instrumento veio da Ásia.
O rio veio de África.

Cinco salas.
Um só sopro.

Valeu !!!
neste mapa,
sem colar o jogo no mar.`;
}

function poemEn() {
  return `Gosfo arrived.
Coongo arrived.
Gongo arrived.
The map already knew the name:
México.
Beside it, the gulf.
Not golf.
Not the gong.
Not the Congo.

The country has a Nahuatl navel.
The sea borrows the name.
The game came from Scotland.
The instrument came from Asia.
The river came from Africa.

Five rooms.
One breath.

Valeu !!!
on this map,
without gluing the game to the sea.`;
}

function poemEs() {
  return `Llegó gosfo.
Llegó coongo.
Llegó gongo.
El mapa ya sabía el nombre:
México.
Al lado, el golfo.
No el golf.
No el gongo.
No el Congo.

El país tiene ombligo náhuatl.
El mar toma el nombre prestado.
El juego vino de Escocia.
El instrumento vino de Asia.
El río vino de África.

Cinco salas.
Un solo soplo.

Valeu !!!
en este mapa,
sin pegar el juego al mar.`;
}

function buildMexicoBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-mexico.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const abacate = '/posts/post-inspecao-planta-abacate.html';
  const chaves = '/posts/post-inspecao-serie-chaves-el-chavo.html';
  const ramon = '/posts/post-inspecao-figura-ramon-valdes.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const jogos = '/jogos/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção **especial** da palavra **[México](${self})** — o **país**. Pedidos de campo no mesmo sopro: *Coongo do Mexico* · *Gongo e Mexico* · *gosfo do mexico* · *golfo do mexico* · *jogo golfe* · *inspelçao especial ao mexico*.

[A orelha cola](${orelhaCola}) **golfo** / **golfe** / **gongo** / **Congo**. O étimo **corta**. Esta ficha é o **país**. O golfo é o mar que toma o nome. O golfe é o jogo. O gongo é o instrumento. O Congo é África.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · México](${WIKI}), [Wikcionário · México](${WIKT}), náuatle [Mēxihco](${WIKT_NAH}), [Golfo do México](${WIKI_GULF}), [golfe](${WIKI_GOLF}), [gongo](${WIKT_GONGO}), [Congo](${WIKI_CONGO}). **Ficha ≠ guia turístico, ≠ atlas petrolífero, ≠ receita de jogo, ≠ manifesto.** Sem afiliação a Estados. Tom: [respeito](${respeito}) do mapa; [verdade](${verdade}) do nome.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **México** (PT) |
| Formas vivas | esp. *México* / *Méjico* (fala) · náuatle *Mēxihco* · EN *Mexico* |
| Classe | Topónimo — Estado soberano |
| Capital | Cidade do México |
| Étimo (trabalho) | Náuatle *Mēxihco* (lugar dos Mexica) → castelhano *México* → PT *México* — confiança **alta** na via; **média** no miolo náuatle (hipóteses em disputa: Mexihtli / umbigo-lua) |
| Tipo BudGanja | Palavra — país × nome emprestado ao golfo |
| Não é | **golfo** (mar) · **golfe** (jogo) · **gongo** (instrumento) · **Congo** (África) |
| Elo lab | [abacate](${abacate}) (náuatle) · [Chaves](${chaves}) · [Ramón Valdés](${ramon}) · [UNIFESP](${unifesp}) |
| Elo mapa | [Moçambique](${mocambique}) · [Paraguai](${paraguai}) |
| Fonte | [México](${WIKI}) · [Mēxihco](${WIKT_NAH}) |
| Data | ${inspected} |

**Objecto:** o **país** que o náuatle nomeou. O golfo é vizinho de água. Não é o país inteiro.

## 2. Lapsus do sopro — cinco salas

| Pedido de campo | O que a orelha ouve | O que **é** |
|-----------------|---------------------|-------------|
| *golfo do mexico* | o mar | **Golfo do México** — bacia; toma o nome do país / da região; **≠** o Estado inteiro |
| *gosfo do mexico* | quase golfo | Lapso de **golfo** (o *l* virou *s*) |
| *Coongo do Mexico* | Congo + golfo | Lapso de **golfo**; a orelha também pega **Congo** |
| *Gongo e Mexico* | o metal | **gongo** — instrumento (malaio *gong*); **e** o país, duas frases |
| *jogo golfe* | o desporto | **golfe** ← ing. *golf* (Escócia); **≠** golfo |
| *inspelçao especial* | esta ficha | Inspeção **dedicada** ao país — não a palavra [genial](${genial}) nem um selo de propaganda |

**H1:** *México* < *Mēxihco* — alta confiança na via náuatle → castelhano → português.  
**H2:** o **Golfo do México** herda o nome; não substitui o país.  
**H3:** *golfe* (jogo) e *golfo* (mar) são prima de **som**, não de étimo.  
**H4:** *gongo* não é golfo sem *l*; é outro objecto.  
**H5:** *Congo* / *Coongo* não é México. A [maconha](${maconha}) aponta a via bantu (Angola/Congo); essa sala é africana.

## 3. Golfe — o jogo (pedido à parte)

O laboratório lê *inspeção do jogo golfe* **nesta** ficha, porque o sopro colou o jogo no golfo. Não é caderno de videojogo ([/jogos/](${jogos})). É o **desporto**: taco, bola, percurso, St Andrews.

| Camada | Leitura |
|--------|---------|
| Étimo | Ing. *golf* (escocês; hipóteses *kolf* neerlandês) → PT *golfe* |
| Ofício | Jogo com [gesto](${gesto}) medido — não o mar, não o país |
| México | Há campos no país; isso **não** torna o golfe «o México» |
| Corte | golfe ≠ golfo ≠ México |

**Ficha ≠ regulamento da R&A, ≠ dica de swing, ≠ ranking.**

## 4. O que o laboratório já deve ao México

| Elo | Papel | Não é |
|-----|-------|-------|
| [Abacate](${abacate}) | Palavra náuatle (*āhuacatl*) que o lab já honra | ≠ o país inteiro |
| [Chaves](${chaves}) / [Ramón Valdés](${ramon}) | Obra e ofício cómico mexicano | ≠ guia de televisão |
| [UNIFESP](${unifesp}) | Aula que nomeia México (peiote / Maria Sabina) como **história cultural** | ≠ bula, ≠ cultivo, ≠ turismo psicadélico |
| [Isqueiro](${isqueiro}) / [fogo](${fogo}) | Cadeia de acender (esqueiro · fósforo) — outro sopro | ≠ o golfo como «fósforo do mundo» |
| Petróleo no golfo | [Risco](${risco}) industrial real | Esta ficha **não** é relatório de derrame |

## 5. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| Nomear o país | Estado soberano | Uma sala: *Mēxihco* |
| Nomear o mar | Golfo do México | Sala ao lado — empresta o nome |
| Corrigir o sopro | gosfo / coongo / gongo | Guardar o gatilho; não promover a grafia |
| Não fundir | Jogo, gongo, Congo | Três étimos, três mapas |

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 6. Valeu !!!

O melhor **hoje** é o mapa com cinco salas: México (país), golfo (mar), golfe (jogo), gongo (metal), Congo (África). [Valeu !!!](${mantra}) — *gosfo* endereçado; inspeção especial sem selo de propaganda.

## 7. Estado

**Aprovada** — México fichado como país; golfo / golfe / gongo / Congo cortados; lapsus *gosfo* · *coongo* documentados.

[▶ Palavras](${hub}) · [▶ Orelha cola](${orelhaCola}) · [▶ Abacate](${abacate}) · [▶ Chaves](${chaves}) · [▶ Moçambique](${mocambique}) · [▶ Paraguai](${paraguai}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

**Special** inspection of **[México](${self})** — the **country**. Field slips: *Coongo* · *Gongo* · *gosfo* · *golfo do mexico* · *jogo golfe*.

[The ear glues](${orelhaCola}) gulf / golf / gong / Congo. The etymon **cuts**.

> Not a tourist guide. Not an oil atlas. Not a golf rulebook.

## Object

| Field | Value |
|-------|-------|
| Anchor | **México** ← Nahuatl *Mēxihco* — **high** confidence on the path |
| Gulf | **Gulf of Mexico** borrows the name; it is not the whole State |
| Golf | sport ← Eng. *golf* — not the sea |
| Gong | Malay *gong* — not golfo without an *l* |
| Congo | Africa — not Mexico; [maconha](${maconha}) keeps the Bantu room |
| Lab | [avocado](${abacate}) (Nahuatl) · [El Chavo](${chaves}) |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** five rooms. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Ear glue](${orelhaCola}) · [▶ Avocado](${abacate}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección **especial** de **[México](${self})** — el **país**. Lapsus: *Coongo* · *Gongo* · *gosfo* · *golfo do mexico* · *jogo golfe*.

[La oreja pega](${orelhaCola}) golfo / golf / gongo / Congo. El étimo **corta**.

> No es guía turística, ni atlas petrolero, ni reglamento de golf.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **México** ← náhuatl *Mēxihco* — confianza **alta** en la vía |
| Golfo | **Golfo de México** toma el nombre; no es todo el Estado |
| Golf | deporte ← ing. *golf* — no es el mar |
| Gongo | malayo *gong* — no es golfo sin *l* |
| Congo | África — no es México |
| Lab | [aguacate](${abacate}) · [El Chavo](${chaves}) |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** cinco salas. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Oreja pega](${orelhaCola}) · [▶ Aguacate](${abacate}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildMexicoPost() {
  const { body, contentEn, contentEs, wiki } = buildMexicoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-mexico', 261);
  return makePalavra({
    title: 'Inspeção: México — o país, o golfo, o golfe e o lapso gosfo',
    titleEn: 'Inspection: México — the country, the gulf, golf, and the gosfo slip',
    titleEs: 'Inspección: México — el país, el golfo, el golf y el lapsus gosfo',
    excerpt:
      'Palavras: México (Mēxihco) — país ≠ golfo ≠ golfe ≠ gongo ≠ Congo; gosfo→golfo; Valeu !!!',
    excerptEn:
      'Words: México (Mēxihco) — country ≠ gulf ≠ golf ≠ gong ≠ Congo; gosfo→golfo; Valeu !!!',
    excerptEs:
      'Palabras: México (Mēxihco) — país ≠ golfo ≠ golf ≠ gongo ≠ Congo; gosfo→golfo; ¡Valeu !!!',
    slug: 'inspecao-palavra-mexico',
    date: '2026-08-23T12:35:00.000Z',
    seriesOrder,
    seriesLabel: 'México · país',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMexicoPost, buildMexicoBodies, poemPt, poemEn, poemEs };
