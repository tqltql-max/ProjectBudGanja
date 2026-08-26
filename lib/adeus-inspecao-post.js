'use strict';

/**
 * Inspeção Expressões · «A Deus!!!» / adeus
 * Eixos: a + Deus («encomendo-te a Deus») · grito A DEUS!!! × grafia adeus ·
 * fr. adieu · esp. adiós · ≠ Deus abençoe · irmã fui ·
 * respeito à fé, sem catecismo · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/adeus-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/adeus';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `A Deus!!!
Duas peças ainda se ouvem:
a + Deus.
Adeus já colou na página.

Não é a bênção que fica.
É o encomendar de quem parte.
Fr. adieu. Esp. adiós.
O mesmo gesto antigo:
deixo-te ao céu que a boca nomeia.

Quem grita A DEUS!!!
ainda parte a fórmula.
Quem escreve adeus
já fez a viagem.

Valeu !!!
na porta —
sem sermão.`;
}

function poemEn() {
  return `A Deus!!!
Two pieces can still be heard:
a + Deus.
Adeus has already glued on the page.

It is not the blessing that stays.
It is the commendation of one who leaves.
Fr. adieu. Sp. adiós.
The same old gesture:
I leave you to the sky the mouth names.

Whoever shouts A DEUS!!!
still splits the formula.
Whoever writes adeus
has already made the trip.

Valeu !!!
at the door —
no sermon.`;
}

function poemEs() {
  return `¡A Deus!!!
Dos piezas aún se oyen:
a + Deus.
Adeus ya pegó en la página.

No es la bendición que se queda.
Es el encomendar de quien parte.
Fr. adieu. Esp. adiós.
El mismo gesto antiguo:
te dejo al cielo que la boca nombra.

Quien grita A DEUS!!!
aún parte la fórmula.
Quien escribe adeus
ya hizo el viaje.

¡Valeu !!!
en la puerta —
sin sermón.`;
}

function buildAdeusBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-expressao-adeus.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const fui = '/posts/post-inspecao-palavra-fui.html';
  const abencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const aBenca = '/posts/post-inspecao-expressao-a-benca.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[A Deus!!!](${self})»** — despedida viva cuja grafia junta é **adeus**. Étimo de ofício: **a + [Deus](${deus})** («encomendo-te a Deus»). Pedido de campo: o grito **A DEUS!!!** no cluster **[Deus](${deus}) → A Deus!!! → [fui](${fui})**. Respeito à fé; **sem** catecismo.

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · adeus](${WIKT}). Objecto = a **forma viva** (grito partido × palavra colada). Ficha ≠ oração de despedida, ≠ protocolo de luto. Série [Expressões](${hub}).

**Gatilho:** *A Deus!!!* / *adeus* / *adeuzinho*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **A Deus!!!** (oral partido) · **adeus** (grafia canónica) |
| Tipo | Expressão — despedida × encomenda |
| Étimo (trabalho) | *a* + *Deus* — «(vai) a Deus / encomendo-te a Deus» — confiança: **alta** |
| Família | fr. *adieu* · esp. *adiós* · it. *addio* · cat. *adéu* |
| Tipo BudGanja | Expressão — [gesto](${gesto}) de saída com o nome [Deus](${deus}) |
| Não é | [Deus abençoe](${abencoe}) (bênção que pode ficar) · [fui](${fui}) (saída sem nomear o céu) |
| Elo | [Deus](${deus}) (vocábulo) · [fui](${fui}) (corpo que parte) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o **corte da conversa** que ainda carrega o nome. Quem grita **A DEUS!!!** deixa ouvir as duas peças; quem escreve **adeus** já fez a aglutinação. O ofício é o mesmo: **partir**.

## Forma e variantes

| Forma | Nota |
|-------|------|
| **A Deus!!!** | Grito / tipografia partida — pedido de campo |
| **adeus** | Grafia junta canónica |
| adeusinho / tchau | Diminutivo / irmão informal — outro calor, mesmo ofício de saída |
| Adeus! | Pontuação viva — o ponto não é liturgia |

**Veredicto de forma:** o laboratório ficheia o grito **A Deus!!!** e ancora a página em **adeus**. Não impõe maiúsculas litúrgicas nem nega a fé de quem as usa.

## Hipóteses e método

**H1:** *adeus* < *a* + *Deus* — encomenda, não catecismo (alta).  
**H2:** [Deus abençoe](${abencoe}) **deseja bem** (pode ficar na sala); **adeus** **encomenda e sai**.  
**H3:** [fui](${fui}) é a irmã sem o nome: o corpo declara a saída.  
**H4:** *adieu* / *adiós* confirmam o mesmo gesto românico.  
**H5:** fecho = [Valeu !!!](${mantra}).

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo** | A + Deus — encomendar | Alta |
| **Despedida** | Cortar o encontro | Alta |
| **Grito** | A DEUS!!! — peças ainda visíveis | Alta |
| **Calor** | Pode ser terno, seco ou teatral | Alta |
| **Risco** | Usar o nome para fechar a porta com culpa | Média |

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *A Deus!!!* (grito) × *adeus* (grafia) × [Deus](${deus}) (vocábulo) |
| Bom | Distinguir de [Deus abençoe](${abencoe}) e de [a bença](${aBenca}) |
| Mau | Transformar a despedida em prova de fé |
| Mau | Confundir com [fui](${fui}) — aquela ficha é o pretérito / a gíria de saída |

## O poema

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Deus](${deus}) | O nome que a fórmula ainda carrega |
| [fui](${fui}) | Irmã de saída — sem nomear o céu |
| [Deus abençoe](${abencoe}) · [a bença](${aBenca}) · [filho de deus](${filho}) | Outros usos do nome |
| [gesto](${gesto}) · [respeito](${respeito}) · [língua portuguesa](${lingua}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |
| [Vida](${vida}) | Poema |

## Limites

- Não ensina reza de despedida nem juízo sobre quem crê.  
- Não é protocolo de luto.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Expressões** — *A Deus!!!* / *adeus* fichados como *a* + *Deus*; irmãs [Deus](${deus}) e [fui](${fui}).

[▶ Expressões](${hub}) · [▶ Palavras](${hubPalavras}) · [▶ Deus](${deus}) · [▶ fui](${fui}) · [▶ Valeu !!!](${mantra}) · [Wikcionário](${WIKT}) · [Guia](${guia})
`;

  const contentEn = `## Scope

Inspection of **“A Deus!!!”** — living farewell whose glued spelling is **adeus**. Craft etymon: **a + [Deus](${deus})** (“I commend you to God”). Cluster **[Deus](${deus}) → A Deus!!! → [fui](${fui})**. Sister of Fr. *adieu* / Sp. *adiós*. Distinct from [Deus abençoe](${abencoe}). Respect for faith; **no** catechism.

## Status

**Approved in Sayings** — shout *A DEUS!!!* × spelling *adeus*; sisters [Deus](${deus}) and [fui](${fui}).

[▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«¡A Deus!!!»** — despedida viva cuya grafía junta es **adeus**. Étimo de oficio: **a + [Deus](${deus})**. Clúster **[Deus](${deus}) → A Deus!!! → [fui](${fui})**. Hermana de fr. *adieu* / esp. *adiós*. Distinta de [Deus abençoe](${abencoe}). Respeto a la fe; **sin** catecismo.

## Estado

**Aprobada en Expresiones** — grito *A DEUS!!!* × grafía *adeus*; hermanas [Deus](${deus}) y [fui](${fui}).

[▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAdeusPost() {
  const { body, contentEn, contentEs } = buildAdeusBodies();
  const seriesOrder = pickOrder('inspecao-expressao-adeus', 12);
  return expressaoPost({
    title: 'Inspeção: A Deus!!! — adeus, encomendar e sair',
    titleEn: 'Inspection: A Deus!!! — goodbye, commend and leave',
    titleEs: 'Inspección: ¡A Deus!!! — adiós, encomendar y salir',
    excerpt:
      'Expressões: A Deus!!! = a + Deus (adeus); grito partido × grafia junta; ≠ Deus abençoe; irmã fui; Valeu !!!',
    excerptEn:
      'Sayings: A Deus!!! = a + Deus (adeus); split shout × glued spelling; ≠ Deus abençoe; sister fui; Valeu !!!',
    excerptEs:
      'Dichos: ¡A Deus!!! = a + Deus (adeus); grito partido × grafía junta; ≠ Deus abençoe; hermana fui; ¡Valeu !!!',
    slug: 'inspecao-expressao-adeus',
    date: '2026-08-23T16:41:00.000Z',
    seriesOrder,
    seriesLabel: 'A Deus!!! · adeus',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildAdeusPost, buildAdeusBodies, poemPt, poemEn, poemEs };
