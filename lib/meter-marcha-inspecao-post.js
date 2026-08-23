'use strict';

/**
 * Inspeção Expressões · meter marcha
 * Locução BR: engatar a caixa / pôr o ofício a andar.
 * Camadas: carro · trabalho · (corte) flerte.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/meter-marcha-cover.jpg';
const WIKT_MARCHA = 'https://pt.wiktionary.org/wiki/marcha';
const WIKT_METER = 'https://pt.wiktionary.org/wiki/meter';

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
  return `O motor já estava ligado.
Faltava o dente da caixa.
Meter marcha
é deixar de ficar em ponto morto.

Não é a rua a desfilar.
Não é a cantiga do bloco.
Não é ré.
É a primeira que pega o peso
e o gesto que sai do idle.

Valeu !!!
com a marcha engatada,
sem empurrar quem não pediu a viagem.`;
}

function poemEn() {
  return `The engine was already on.
The gearbox still missed a tooth.
Meter marcha
is leaving idle.

It is not the parade.
It is not the carnival song.
It is not reverse.
It is first gear taking the weight
and the gesture leaving idle.

Valeu !!!
in gear,
without pushing anyone who did not ask for the ride.`;
}

function poemEs() {
  return `El motor ya estaba encendido.
Faltaba el diente de la caja.
Meter marcha
es dejar el punto muerto.

No es el desfile.
No es la canción del bloque.
No es marcha atrás.
Es la primera que toma el peso
y el gesto que sale del ralenti.

Valeu !!!
con la marcha metida,
sin empujar a quien no pidió el viaje.`;
}

function buildMeterMarchaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-meter-marcha.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const circular = '/posts/post-inspecao-palavra-circular.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const mega = '/posts/post-inspecao-palavra-mega-sena.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[meter marcha](${self})»** — locução viva do português do Brasil: **engatar** a caixa do carro e, por extensão, **pôr o ofício a andar**. Pedido de campo: *Meter Marcha*. Três salas: **veículo**, **trabalho**, e o rasto oral *meter marcha em alguém* (flerte) — este último entra como **corte**, não como manual.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · marcha](${WIKT_MARCHA}), [meter](${WIKT_METER}). **Ficha ≠ aula de condução, ≠ cantiga de bloco, ≠ guia de paquera.** Sem afiliação a marcas de caixa/câmbio. Tom: [gesto](${gesto}) que sai do ponto morto.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **meter marcha** |
| Variantes | *meter a marcha* · *mete marcha* · *bora meter marcha* · *engatar a marcha* |
| Classe | Locução verbal |
| Peças | **meter** (lat. *mittere* «pôr, enviar») + **marcha** (passo em ordem; no BR também **dente da caixa**) |
| Núcleo | Sair do **idle** / ponto morto — a primeira que pega o peso |
| Tipo BudGanja | Expressão — [gesto](${gesto}) de arranque × [caminho](${caminho}) |
| O que **não** é | Marcha de carnaval (âncora) · desfile militar · [Mega-Sena](${mega}) / [Senna](${senna}) · marcha ré |
| Elo | [já](${ja}) · [circular](${circular}) · [respeito](${respeito}) · [relação](${relacao}) · [Faça o seu melhor](${faca}) |
| Fonte | [marcha](${WIKT_MARCHA}) · [meter](${WIKT_METER}) |
| Data | ${inspected} |

**Objecto:** o acto de **pôr dente na caixa**. No laboratório: deixar de aquecer no neutro.

## 2. Hipóteses e método

**H1:** *marcha* no carro é o **dente** que liga motor e roda; *meter* é o [gesto](${gesto}) de engatar.  
**H2:** a extensão «bora meter marcha» = **começar o ofício** — irmã de [já](${ja}) e de [Faça o seu melhor](${faca}), não de perfeccionismo.  
**H3:** *meter marcha em alguém* é outra sala (aproximação / flerte). Sem [respeito](${respeito}) vira pressão — [risco](${risco}), não método.  
**H4:** **ré** é o contrário do arranque; não fundir.  
**H5:** orelha cola *marcha* em *Sena* / *Senna* — **não**. Um é passo/caixa; o outro é seis ou apelido.

## 3. Três camadas (não misturar)

| Camada | Leitura | No lab |
|--------|---------|--------|
| **Caixa** | Engatar 1.ª, 2.ª… | Literal — veículo |
| **Ofício** | Sair do ponto morto do dia | Canónica desta ficha |
| **Flerte** | *meter marcha em* | Só o nome; **não** é tutorial; [respeito](${respeito}) manda |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Meter** | Pôr dentro / aplicar | [Gesto](${gesto}) — a mão que engata |
| **Marcha** | Passo; dente da caixa; cortejo | O **encaixe** que faz o peso andar |
| **a** (artigo) | *meter a marcha* | Mesma locução; o artigo não muda o ofício |

**≠** *marcha* só como música de bloco: o bloco *usa* a palavra; a âncora aqui é **engatar**.

## 5. O que parece × o que é

| Parece | É |
|--------|---|
| Grito para ir mais depressa | Primeiro: **sair do neutro**; velocidade vem depois |
| Licença para empurrar pessoas | Sem [respeito](${respeito}), é [risco](${risco}) |
| Homenagem a Senna | Grafia e étimo **outros** — ver [Ayrton Senna](${senna}) |
| Já estar a trabalhar | Idle com motor ligado ainda **não** é marcha |

## 6. Limites

- Não ensinamos a conduzir nem a «conquistar».  
- Não confundir arranque de ofício com pressa vazia.  
- Carnaval e tropa emprestam a palavra; não são esta ficha.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **meter marcha** = engatar o [gesto](${gesto}) e o [caminho](${caminho}). Fecho: [Valeu !!!](${mantra}) **já em marcha**, não em ponto morto.

[▶ Expressões](${hub}) · [▶ Gesto](${gesto}) · [▶ Caminho](${caminho}) · [▶ Já](${ja}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian saying **«[meter marcha](${self})»** — put the car **in gear**, and by extension **get the craft moving**. Field: *Meter Marcha*. Flirting (*meter marcha em alguém*) is a **cut**, not a how-to.

> Independent audit. **Not** a driving lesson, carnival song, or pickup guide.

## Object

| Field | Value |
|-------|-------|
| Saying | **meter marcha** |
| Pieces | *meter* (Lat. *mittere*) + *marcha* (step / gearbox tooth) |
| Lab | Leave idle — first gear takes the weight |
| Not | Carnival march as âncora · reverse · [Senna](${senna}) |
| Date | ${inspected} |

**H1:** gear = the tooth that connects engine and wheel.  
**H2:** “bora meter marcha” = start the day’s craft.  
**H3:** hitting on someone needs [respeito](${respeito}); otherwise it is [risco](${risco}).

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** in gear. [Valeu !!!](${mantra})

[▶ Sayings](${hub}) · [▶ Gesture](${gesto}) · [▶ Path](${caminho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Dicho BR **«[meter marcha](${self})»** — meter la **marcha** del coche y, por extensión, **poner el oficio en marcha**. Pedido: *Meter Marcha*. El flirteo (*meter marcha em alguém*) es **corte**, no manual.

> Auditoría independiente. **No** es clase de conducir ni de ligar.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **meter marcha** |
| Piezas | *meter* (lat. *mittere*) + *marcha* (paso / diente de la caja) |
| Lab | Salir del punto muerto |
| No es | Marcha de carnaval como âncora · marcha atrás · [Senna](${senna}) |
| Fecha | ${inspected} |

**H1:** la marcha es el diente que une motor y rueda.  
**H2:** «bora meter marcha» = empezar el oficio del día.  
**H3:** sin [respeito](${respeito}), el flirteo es [risco](${risco}).

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** marcha metida. [¡Valeu !!!](${mantra})

[▶ Expresiones](${hub}) · [▶ Gesto](${gesto}) · [▶ Camino](${caminho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_MARCHA };
}

function buildMeterMarchaPost() {
  const { body, contentEn, contentEs, wiki } = buildMeterMarchaBodies();
  return expressaoPost({
    title: 'Inspeção: Meter marcha — engatar o ofício',
    titleEn: 'Inspection: Meter marcha — put the craft in gear',
    titleEs: 'Inspección: Meter marcha — meter el oficio en marcha',
    excerpt:
      'Expressões: meter marcha — engatar a caixa / sair do ponto morto do dia; ≠ carnaval ≠ ré ≠ flerte-manual; Valeu !!!',
    excerptEn:
      'Sayings: meter marcha — in gear / leave idle; ≠ carnival ≠ reverse ≠ pickup guide; Valeu !!!',
    excerptEs:
      'Dichos: meter marcha — meter la marcha / salir del punto muerto; ≠ carnaval ≠ marcha atrás; ¡Valeu !!!',
    slug: 'inspecao-expressao-meter-marcha',
    date: '2026-08-23T14:40:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-meter-marcha', 31),
    seriesLabel: 'Meter marcha · engatar',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMeterMarchaPost, buildMeterMarchaBodies };
