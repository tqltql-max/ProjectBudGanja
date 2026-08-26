'use strict';

/**
 * Inspeção objecto · automóvel
 * Gr. autós «si mesmo» + lat. mōbilis «que se move».
 * O que se move a si sobre a estrada; pede bateria.
 * Pedido de campo: «objeto altomovel».
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/automovel-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/autom%C3%B3vel';
const WIKT_AUTO = 'https://en.wiktionary.org/wiki/automobile';
const WIKI = 'https://pt.wikipedia.org/wiki/Autom%C3%B3vel';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Automóvel.
Auto + móvel.
O que se move a si.

Não é o cavalo.
Não é a carroça.
Não é a mula da lida.

A estrada é o leito.
A bateria é o pulso.
O volante é o gesto.

Auto-móvil.
Move-se sozinho.
O rumo ainda pede escolha.

Valeu !!!
máquina que anda
sem fingir que o rumo
já veio de fábrica.`;
}

function poemEn() {
  return `Automóvel.
Auto + mobile.
That which moves itself.

Not the horse.
Not the cart.
Not the mule of the work.

The road is the bed.
The battery is the pulse.
The wheel is the gesture.

Self-moving.
It goes alone.
The heading still asks for a choice.

Valeu !!!
a machine that walks
without pretending the heading
came from the factory.`;
}

function poemEs() {
  return `Automóvel.
Auto + móvil.
Lo que se mueve a sí.

No es el caballo.
No es la carreta.
No es la mula del oficio.

La estrada es el lecho.
La batería es el pulso.
El volante es el gesto.

Auto-móvil.
Se mueve solo.
El rumbo aún pide elección.

¡Valeu !!!
máquina que anda
sin fingir que el rumbo
ya vino de fábrica.`;
}

function buildAutomovelBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-automovel.html';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const bateria = '/posts/post-inspecao-palavra-bateria.html';
  const encruzilhada = '/posts/post-inspecao-palavra-encruzilhada.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const airbag = '/posts/post-inspecao-cruzamento-aaron-beggs-air-bag.html';
  const patinete = '/posts/post-inspecao-patinete-eletrico-criancas.html';
  const mula = '/posts/post-inspecao-animal-mula.html';
  const cavalo = '/posts/post-inspecao-animal-cavalo.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial do **objecto [automóvel](${self})** — gr. *autós* («si mesmo») + lat. *mōbilis* («que se move»): o veículo que **se move a si** sobre a [estrada](${estrada}). Pedido de campo: *objeto altomovel* → forma canónica **automóvel** (grafia *altomovel* fica como gatilho de orelha, não como lema). Entra no catálogo [Objetos](${objetos}) como **coisa**: chassis, motor, volante, rodas, [bateria](${bateria}). O cruzamento com [encruzilhada](${encruzilhada}) e Jesus Cristo vive na [ficha-cruzamento](${cruzamento}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · automóvel](${WIKT}), [automobile](${WIKT_AUTO}), [Wikipédia · Automóvel](${WIKI}). **Ficha ≠ manual do condutor, ≠ catálogo de marcas, ≠ laudo de acidente.** Sem afiliação comercial. Distinto de [DeLorean](${delorean}) (um ícone) e de [patinete eléctrico](${patinete}) (outra escala). Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **automóvel** (BR/PT); plural *automóveis*; fala curta *auto* / *carro* |
| Gatilho de campo | *altomovel* — orelha cola **alto** + móvel; o étimo é **auto** (si), não *alto* (altura) |
| Classe | Substantivo masculino — veículo automotor |
| Étimo (trabalho) | fr. *automobile* ← gr. *αὐτός* + lat. *mōbilis* — «que se move por si» — confiança: **alta** |
| Família | *auto* · *automotivo* · *automobilismo* · *auto-estrada* |
| Cognatos / mapa | esp. *automóvil* · ing. *automobile* / *car* · fr. *automobile* / *voiture* · it. *automobile* / *macchina* |
| Tipo BudGanja | Objecto — locomoção × [estrada](${estrada}) × [bateria](${bateria}) |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | [cavalo](${cavalo}) / [mula](${mula}) (tração viva) · [DeLorean](${delorean}) (ficha-ícone) · [patinete](${patinete}) (outra escala) · *carroça* |
| Elo ofício | [estrada](${estrada}) · [bateria](${bateria}) · [gesto](${gesto}) · [ligar](${ligar}) · [risco](${risco}) |
| Fonte | [automóvel](${WIKT}) · [Automóvel](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** uma **máquina de locomoção** que não pede cavalo à frente: o motor (e, no eléctrico, a [bateria](${bateria}) como feixe principal) faz o **auto**-movimento. No lab: *móvel* sozinho é móvel de casa; *automóvel* é o que **anda sozinho** — o rumo ainda pede [gesto](${gesto}) no volante.

## 2. Automóvel × carro × auto × altomovel

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **automóvel** | Lema técnico / civil | *auto* + *móvel* — move-se a si |
| **carro** | Fala BR viva | Também carroça, carrinho, vagão — polissemia |
| **auto** | Abreviação | Também prefixo *auto-* (si / por si) e *autoconhecimento* |
| **altomovel** | Gatilho de campo | Orelha cola *alto*; o étimo **corta** — não é «móvel alto» |
| **veículo** | Classe larga | Inclui moto, bus, camião, patinete |
| **[DeLorean](${delorean})** | Um automóvel na série Artes | Não substitui o lema |

**H1:** *automóvel* = *auto-* + *móvel* — confiança alta.  
**H2:** *altomovel* é **erro / orelha**, não étimo: *alto* (altura) ≠ *auto* (si).  
**H3:** o automóvel **substitui** a tração viva ([cavalo](${cavalo}), [mula](${mula})) no leito da [estrada](${estrada}) — outro ofício, outro [risco](${risco}).  
**H4:** sem [bateria](${bateria}) (arranque ou tração), o automóvel é casca no leito.

\`\`\`poem
${poemPt()}
\`\`\`

## 3. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Chassis / carroçaria** | O corpo que ocupa a [estrada](${estrada}) |
| **Motor** | O que converte energia em movimento |
| **[Bateria](${bateria})** | Pulso do arranque (térmico) ou do próprio andar (eléctrico) |
| **Volante** | [Gesto](${gesto}) do rumo — a máquina move-se; o rumo escolhe-se |
| **Rodas / pneus** | O contacto com o leito |
| **[Airbag](${airbag})** | Segurança **passiva** — dispara; o condutor **escolhe** (metáfora Beggs) |
| **Faróis** | Ver o leito; não são o [caminho](${caminho}) |

## 4. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [estrada](${estrada}) | O leito onde o objecto roda |
| [bateria](${bateria}) | O pulso |
| [encruzilhada](${encruzilhada}) · [cruzamento](${cruzamento}) | O X da escolha; Jesus Cristo no mapa pedido |
| [DeLorean](${delorean}) · [Senna](${senna}) | Ícone e ofício de pista — **outras** fichas |
| [Patinete eléctrico](${patinete}) | Locomoção a bateria em escala de criança |
| [Airbag × Beggs](${airbag}) | Segurança passiva × gesto que escolhe |
| [cavalo](${cavalo}) · [mula](${mula}) | Tração viva — o «antes» do auto-móvil |
| [ligar / desligar](${ligar}) · [risco](${risco}) · [verdade](${verdade}) | Ignição, custo, nomear |
| [Objetos](${objetos}) · [Vida](${vida}) · [Valeu !!!](${mantra}) | Catálogo e fecho |

## 5. O que esta ficha não é

- **Não** é aula de mecânica nem tabela de consumo.  
- **Não** endossa marca, modelo, «zero a cem» nem pista.  
- **Não** funde *auto* (si) com *alto* (altura): *altomovel* fica como gatilho.  
- **Não** substitui [DeLorean](${delorean}), [Senna](${senna}) nem o [patinete](${patinete}).  
- **Não** é catecismo: o cruzamento com Jesus Cristo está na [ficha irmã](${cruzamento}).

## 6. Veredicto

**Aprovado** — **automóvel** fichado como objecto *auto* + *móvel* (move-se a si) sobre a [estrada](${estrada}); gatilho *altomovel* cortado; pulso na [bateria](${bateria}); catálogo [Objetos](${objetos}). [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Estrada](${estrada}) · [▶ Bateria](${bateria}) · [▶ Cruzamento](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **object [automóvel](${self})** — Gk. *autós* (“self”) + Lat. *mōbilis* (“movable”): the vehicle that **moves itself** on the [estrada](${estrada}). Field spelling *altomovel* is an ear-glue (*alto* = tall), not the etymon. Catalog: [Objetos](${objetos}). Pulse: [bateria](${bateria}). Cross with Jesus Christ: [cross sheet](${cruzamento}).

> Independent audit. [automóvel](${WIKT}). **Not a driver’s manual, not a brand catalog.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Object | **automóvel** — self-moving vehicle |
| Field trigger | *altomovel* — ear glues *alto*; etymon cuts |
| Etymon | Fr. *automobile* ← Gk. *autós* + Lat. *mōbilis* — high |
| Not | [horse](${cavalo}) / [mule](${mula}) · [DeLorean](${delorean}) · [e-scooter](${patinete}) |
| Date | ${inspected} |

**H1:** *auto-* is **self**, not **tall**.  
**H2:** without [bateria](${bateria}) the car on the [road](${estrada}) is a shell.  
**H3:** the machine moves itself; the heading still needs a [gesture](${gesto}).

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** — automóvel as self-moving object on the [estrada](${estrada}); battery as pulse; [cross sheet](${cruzamento}) for Jesus Christ. [Valeu !!!](${mantra})

[▶ Objects](${objetos}) · [▶ Estrada](${estrada}) · [▶ Bateria](${bateria}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **objeto [automóvel](${self})** — gr. *autós* («sí mismo») + lat. *mōbilis*: el vehículo que **se mueve a sí** sobre la [estrada](${estrada}). Grafía de campo *altomovel* pega *alto*; el étimo corta. Catálogo: [Objetos](${objetos}). Pulso: [bateria](${bateria}). Cruce con Jesucristo: [ficha-cruce](${cruzamento}).

> Auditoría independiente. [automóvel](${WIKT}). **Ficha ≠ manual del conductor.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Objeto | **automóvel** — vehículo que se mueve a sí |
| Gatillo | *altomovel* — oído pega *alto*; el étimo corta |
| Étimo | fr. *automobile* ← gr. *autós* + lat. *mōbilis* |
| Fecha | ${inspected} |

**H1:** *auto-* es **sí**, no **alto**.  
**H2:** sin [bateria](${bateria}) el auto en la [estrada](${estrada}) es cáscara.  
**H3:** la máquina se mueve; el rumbo pide [gesto](${gesto}).

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobado** — automóvel como objeto auto-móvil; pulso en la [bateria](${bateria}); Jesucristo en el [cruce](${cruzamento}). [¡Valeu !!!](${mantra})

[▶ Objetos](${objetos}) · [▶ Estrada](${estrada}) · [▶ Bateria](${bateria}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildAutomovelPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildAutomovelBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-automovel', 201);
  return makePalavra({
    title: 'Inspeção: Automóvel — o objecto que se move a si',
    titleEn: 'Inspection: Automóvel — the object that moves itself',
    titleEs: 'Inspección: Automóvel — el objeto que se mueve a sí',
    excerpt:
      'Objecto: automóvel (gr. autós + lat. mōbilis) — move-se a si na estrada; gatilho altomovel (alto ≠ auto); pulso bateria; catálogo Objetos; Valeu !!!',
    excerptEn:
      'Object: automóvel (Gk. autós + Lat. mōbilis) — moves itself on the road; trigger altomovel (tall ≠ self); battery pulse; Objects catalog; Valeu !!!',
    excerptEs:
      'Objeto: automóvel (gr. autós + lat. mōbilis) — se mueve a sí en la estrada; gatillo altomovel (alto ≠ auto); pulso batería; catálogo Objetos; ¡Valeu !!!',
    slug: 'inspecao-palavra-automovel',
    date: '2026-08-24T16:05:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Automóvel · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAutomovelPost,
  buildAutomovelBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKI
};
