'use strict';

/**
 * Inspeção Expressões · cruzar os dedos
 * Gesto de sorte / espera. Pedido: cruzar os dedos; relação com loucos ou ação.
 * Corta: relação (o entre) · mindinho (conta) · sinal da cruz · ação de ofício.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cruzar-os-dedos-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cruzar';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Crossed_fingers';
const WIKT_DEDO = 'https://pt.wiktionary.org/wiki/dedo';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Cruzou os dedos.
Pediu sorte.
A mão fez um X miúdo.

Não é a relação.
Não é o mindinho a contar.
Não é o sinal da cruz.
Não é a rua a cruzar.

Os loucos, na casa, sabem o caminho.
A acção, na casa, é o gesto que faz.
Cruzar os dedos é o signo que espera.
Pode acompanhar.
Não substitui.

Valeu !!!
nesta espera,
sem fingir que o X planta o dia.`;
}

function poemEn() {
  return `Fingers crossed.
Luck asked for.
The hand made a tiny X.

It is not relação.
It is not the pinky counting.
It is not the sign of the cross.
It is not crossing the street.

The “loucos” in this house know the path.
Action in this house is the gesture that does.
Crossing fingers is the sign that waits.
It may walk beside.
It does not replace.

Valeu !!!
in this wait,
without pretending the X plants the day.`;
}

function poemEs() {
  return `Cruzó los dedos.
Pidió suerte.
La mano hizo una X chica.

No es la relação.
No es el meñique contando.
No es la señal de la cruz.
No es cruzar la calle.

Los locos, en esta casa, saben el camino.
La acción, en esta casa, es el gesto que hace.
Cruzar los dedos es el signo que espera.
Puede acompañar.
No sustituye.

Valeu !!!
en esta espera,
sin fingir que la X siembra el día.`;
}

function buildCruzarOsDedosBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-expressao-cruzar-os-dedos.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const insana = '/posts/post-inspecao-palavra-insana.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const sexta = '/posts/post-inspecao-palavra-sexta-feira-13.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção da expressão **«[cruzar os dedos](${self})»** — o **gesto** de juntar dois dedos em X e, na fala, o pedido de sorte. Pedidos de campo no mesmo sopro: *cruzar* · *mudar para relação* · *cruzar os dedos* · *alguma relação com loucos ou ação*.

[A orelha cola](${orelhaCola}) o verbo **cruzar** na [relação](${relacao}), nos [loucos](${loucos}) e na **ação**. O étimo **corta**. Esta ficha é o **X na mão**. A [relação](${relacao}) é o **entre**. Os [loucos](${loucos}) são ofício de saber. A ação, no lab, é o [gesto](${gesto}) que [faz o melhor](${faca}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cruzar](${WIKT}), [dedo](${WIKT_DEDO}), [Crossed fingers](${WIKI_EN}). Calque vivo do inglês *cross your fingers*. **Ficha ≠ grimório, ≠ teologia, ≠ diagnóstico, ≠ manual de sorte.** Tom: [respeito](${respeito}) do peito que espera; [verdade](${verdade}) do que a mão **não** faz sozinha.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Âncora | **cruzar os dedos** |
| Classe | Locução + [gesto](${gesto}) da [mão](${maos}) |
| Étimo (trabalho) | *cruzar* ← lat. *crux* (cruz) + *os dedos* — confiança **alta** na composição; o sentido de **sorte** é calque EN (séc. XIX–XX) — **média–alta** no uso, não no latim |
| Gesto | Indicador sobre o médio (ou o inverso) — um X miúdo |
| Tipo BudGanja | Expressão — signo de espera × não substitui acção |
| Não é | [relação](${relacao}) · [mindinho](${mindinho}) · sinal da cruz · cruzar a rua · [insana](${insana}) como diagnóstico |
| Elo peito | [esperança](${esperanca}) · [faça o melhor](${faca}) · [Só os Loucos Sabem](${loucos}) |
| Fonte | [cruzar](${WIKT}) · [Crossed fingers](${WIKI_EN}) |
| Data | ${inspected} |

**Objecto:** a fórmula que **pede** o que ainda não veio. A mão marca a espera. O ofício, se houver, fica noutro músculo.

## 2. Três cruzamentos que não são este

| Pedido / cola | O que a orelha ouve | O que **é** |
|---------------|---------------------|-------------|
| *inspeção da palabra cruzar* | o verbo nu | Atravessar, misturar, passar por cima — [passar](${passar}) / [caminho](${caminho}) |
| *mudar para relação* | o **entre** | [Relação](${relacao}) (*relatĭō*) — vínculo, relato, proporção; **≠** o X dos dedos |
| *cruzamento* (∞) | o anel | [Elo de ligação](${elo}) — o ponto das duas voltas; **≠** sorte |
| *cruzar os dedos* | esta ficha | Gesto de espera |

**H1:** *cruzar* sozinho é verbo largo. **Cruzar os dedos** é locução.  
**H2:** a correção *cruzar → relação* guarda o **entre**. Esta ficha guarda o **signo**. Relacionar ≠ fundir.

## 3. Relação com *loucos*

Pedido: *alguma relação com loucos*. Há **relação**. Não há fusão.

| Sala | Ofício | Corte |
|------|--------|-------|
| **[Só os Loucos Sabem](${loucos})** | Canção / ofício da casa — saber pelo [caminho](${caminho}); letra em [Chorão](${chorao}) | **≠** «é loucura cruzar os dedos» como insulto |
| **[insana](${insana})** | Intensidade BR (*insanus*) — **≠** diagnóstico | O X da mão não nomeia doença |
| **Cruzar os dedos** | Signo de [esperança](${esperanca}) / superstição leve | Pode parecer «coisa de louco» a quem só conta o cálculo; o lab **não** usa *louco* para diminuir o peito |

**H3:** os loucos da casa **sabem**. Os dedos cruzados **esperam**. Saber ≠ esperar.  
**H4:** [respeito](${respeito}): relacionar com a faixa **não** é chamar supersticioso de doente.

## 4. Relação com *ação*

Pedido: *ou ação*. De novo: **relação**. O corte é o que importa.

| Sala | Ofício | Corte |
|------|--------|-------|
| **[Gesto](${gesto})** | Acto mínimo concreto — o que **faz** a [relação](${relacao}) existir no dia | Cruzar os dedos **é** um gesto; **não** é todo o gesto |
| **[Faça o melhor](${faca})** | Mantra de **ação** — o melhor possível hoje | O X pode **acompanhar**; não **substitui** o faça |
| **Ação** (lema) | Fazer, mover, ofício | Esperar com a mão ≠ plantar, teclar, atravessar a rua com método |
| **Faca** (lâmina) | Outra grafia, outro objecto | *faça* (verbo) ≠ *faca* (utensílio) — o lab já corta noutro sítio |

**H5:** cruzar os dedos é **signo**. [Faça o melhor](${faca}) é **ofício**.  
**H6:** o signo que **adia** a ação vira amuleto. O signo que **anda com** a ação é [esperança](${esperanca}) com [gesto](${gesto}).

## 5. Outras salas da mesma mão

| Não é | Porquê |
|-------|--------|
| [Mindinho](${mindinho}) | A parlenda **conta** os cinco; aqui **dois** cruzam |
| Sinal da cruz | Gesto religioso outro desenho — testa, peito, ombros |
| Dedos cruzados às escondidas | Nalgumas culturas = «estou a mentir»; o lab fica com [verdade](${verdade}) — não promove o truque |
| [Sexta-feira 13](${sexta}) | Superstição de calendário — irmã de tom, outro objecto |
| Cruzar a rua / o ônibus | Verbo de tráfego — outra ficha se o veículo chegar sozinho |

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 6. Valeu !!!

O melhor **hoje** é o mapa de três salas: **cruzar os dedos** (espera), **[loucos](${loucos})** (saber), **[ação](${faca})** (fazer). [Valeu !!!](${mantra}) · [eu amo a vida](${vida}) — o X na mão não planta o dia; pode ir ao lado de quem planta.

## 7. Estado

**Aprovada** — locução fichada; *cruzar* nu e [relação](${relacao}) cortados; [loucos](${loucos}) e **ação** relacionados sem fundir.

[▶ Expressões](${hub}) · [▶ Orelha cola](${orelhaCola}) · [▶ Relação](${relacao}) · [▶ Mindinho](${mindinho}) · [▶ Só os Loucos Sabem](${loucos}) · [▶ Faça o melhor](${faca}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[cruzar os dedos](${self})”** — crossing fingers for luck. Field: *cruzar* · change to [relação](${relacao}) · *some relation with loucos or action*.

[The ear glues](${orelhaCola}). The etymon **cuts**. This sheet is the **X on the hand**.

> Not a grimoire. Not theology. Not a diagnosis. Not a luck manual.

## Object

| Field | Value |
|-------|-------|
| Anchor | **cruzar os dedos** — calque of Eng. *cross your fingers* |
| Loucos | [Só os Loucos Sabem](${loucos}) = knowing by the [path](${caminho}); **≠** insult |
| Action | [Faça o melhor](${faca}) / [gesture](${gesto}) = doing; the X **waits**, it does not replace |
| Not | [relação](${relacao}) · [mindinho](${mindinho}) · sign of the cross |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** three rooms. [Valeu !!!](${mantra}).

[▶ Sayings](${hub}) · [▶ Relação](${relacao}) · [▶ Loucos](${loucos}) · [▶ Faça o melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[cruzar os dedos](${self})»** — el gesto de suerte. Pedidos: *cruzar* · cambiar a [relação](${relacao}) · *relación con locos o acción*.

[La oreja pega](${orelhaCola}). El étimo **corta**. Esta ficha es la **X en la mano**.

> No es grimorio, ni teología, ni diagnóstico, ni manual de suerte.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **cruzar os dedos** — calco del ing. *cross your fingers* |
| Locos | [Só os Loucos Sabem](${loucos}) = saber por el [camino](${caminho}); **≠** insulto |
| Acción | [Faça o melhor](${faca}) / [gesto](${gesto}) = hacer; la X **espera**, no sustituye |
| No es | [relação](${relacao}) · [mindinho](${mindinho}) · señal de la cruz |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** tres salas. [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Relação](${relacao}) · [▶ Locos](${loucos}) · [▶ Faça o melhor](${faca}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI_EN };
}

function buildCruzarOsDedosPost() {
  const { body, contentEn, contentEs, wiki } = buildCruzarOsDedosBodies();
  const seriesOrder = pickOrder('inspecao-expressao-cruzar-os-dedos', 31);
  return expressaoPost({
    title: 'Inspeção: cruzar os dedos — o signo, os loucos e a ação',
    titleEn: 'Inspection: cruzar os dedos — the sign, the loucos, and action',
    titleEs: 'Inspección: cruzar os dedos — el signo, los locos y la acción',
    excerpt:
      'Expressões: cruzar os dedos — espera ≠ relação ≠ mindinho; loucos sabem, ação faz; Valeu !!!',
    excerptEn:
      'Sayings: cruzar os dedos — waiting ≠ relação ≠ mindinho; loucos know, action does; Valeu !!!',
    excerptEs:
      'Dichos: cruzar os dedos — espera ≠ relação ≠ mindinho; los locos saben, la acción hace; ¡Valeu !!!',
    slug: 'inspecao-expressao-cruzar-os-dedos',
    date: '2026-08-23T13:10:00.000Z',
    seriesOrder,
    seriesLabel: 'cruzar os dedos · gesto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCruzarOsDedosPost,
  buildCruzarOsDedosBodies,
  poemPt,
  poemEn,
  poemEs
};
