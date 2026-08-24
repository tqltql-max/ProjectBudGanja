'use strict';

/**
 * Inspeção Palavras · estrada
 * Lat. (via) strata «via calçada» ← sternere «estender / pavimentar».
 * Distinta de caminho (hub) e de via. Objectos da viagem: automóvel, bateria.
 * Cruzamento: encruzilhada × Jesus Cristo (ficha irmã).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/estrada-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/estrada';
const WIKT_STRATA = 'https://en.wiktionary.org/wiki/strata#Latin';
const WIKT_STERNERE = 'https://en.wiktionary.org/wiki/sterno#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Estrada';

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
  return `Estrada.
Não é o caminho.
É a via calçada.

Latim strata.
O que foi estendido,
pavimentado, posto no chão.

O caminho é o método.
A estrada é o leito
onde o método roda.

O automóvel pede estrada.
A bateria pede pulso.
A encruzilhada pede escolha.

Valeu !!!
pegar a estrada
sem fingir que o asfalto
já é o rumo.`;
}

function poemEn() {
  return `Estrada.
It is not the path.
It is the paved way.

Latin strata.
What was spread,
paved, laid on the ground.

Caminho is the method.
The road is the bed
where the method rolls.

The car asks for a road.
The battery asks for pulse.
The crossroads asks for a choice.

Valeu !!!
hit the road
without pretending the asphalt
is already the heading.`;
}

function poemEs() {
  return `Estrada.
No es el camino.
Es la vía calzada.

Latín strata.
Lo que fue extendido,
pavimentado, puesto en el suelo.

Caminho es el método.
La estrada es el lecho
donde el método rueda.

El automóvil pide estrada.
La batería pide pulso.
La encrucijada pide elección.

¡Valeu !!!
tomar la estrada
sin fingir que el asfalto
ya es el rumbo.`;
}

function buildEstradaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-estrada.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const mapa = '/posts/post-inspecao-palavra-mapa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const automovel = '/posts/post-inspecao-palavra-automovel.html';
  const bateria = '/posts/post-inspecao-palavra-bateria.html';
  const encruzilhada = '/posts/post-inspecao-palavra-encruzilhada.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção editorial da palavra **[estrada](${self})** — lat. *(via) strata* («via calçada»), particípio de *sternere* («estender, pavimentar»). Pedido de campo: *inspeção da palavra estrada*, com os objectos **[automóvel](${automovel})** e **[bateria](${bateria})**, a cruzar com **[encruzilhada](${encruzilhada})** e **Jesus Cristo** (ficha-[cruzamento](${cruzamento})). Esta ficha é o **lema da via pública**; o [caminho](${caminho}) continua a ser o hub do método; a [encruzilhada](${encruzilhada}) é o sítio onde duas estradas se encontram.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · estrada](${WIKT}), lat. [*strata*](${WIKT_STRATA}), [*sternō*](${WIKT_STERNERE}), [Wikipédia · Estrada](${WIKI}). **Ficha ≠ código de trânsito, ≠ projecto de pavimento, ≠ catecismo.** Sem afiliação com concessionárias, marcas de automóvel ou igrejas. Tom: Inspetor BudGanja — a estrada é o **leito**; o rumo é outra palavra. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **estrada** (plural *estradas*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *(via) strata* «via calçada» ← *sternere* «estender / pavimentar» — confiança: **alta** ([Wikcionário](${WIKT})) |
| Família | *estradar* · *estradeiro* · *auto-estrada* / *autoestrada* · *estrada de terra* |
| Cognatos / mapa | it. *strada* · esp. *estrada* (também via) · ing. *street* (mesmo avô *strata*) · al. *Straße* · fr. *estrade* é **outro** ofício (estrado / palco) |
| Tipo BudGanja | Palavra — via calçada × [caminho](${caminho}) (método) × [passar](${passar}) |
| Não é | [caminho](${caminho}) (hub do lab) · *via* (lat. *via*, outra peça) · rua / avenida (escalas urbanas) · [mapa](${mapa}) (o pano, não o leito) |
| Objectos da viagem | [automóvel](${automovel}) · [bateria](${bateria}) — catálogo [Objetos](${objetos}) |
| Cruzamento | [encruzilhada](${encruzilhada}) × [Jesus Cristo](${cruzamento}) |
| Elo ofício | [passar](${passar}) · [risco](${risco}) · [gesto](${gesto}) · [verdade](${verdade}) · [relação](${relacao}) |
| Fonte | [estrada](${WIKT}) · [strata](${WIKT_STRATA}) |
| Data | ${inspected} |

**O que é o objecto:** a **via feita para rodar** — calçada, asfaltada ou de terra batida quando a boca ainda diz *estrada*. No laboratório: o [caminho](${caminho}) é o **método**; a estrada é o **chão público** onde o método encontra o [automóvel](${automovel}).

## 2. Estrada × caminho × via × rua

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[caminho](${caminho})** | Hub lexical do lab — via, método, rede | Não precisa de asfalto |
| **estrada** | Via calçada / pública para veículos e gente | O leito; pede [mapa](${mapa}) e escolha |
| **via** | Lat. *via* — peça culta / placa / «via de acesso» | Outro étimo; irmã de uso, não de sangue com *strata* |
| **rua / avenida** | Malha urbana | Escala da cidade; a estrada sai e liga |
| **rodovia** | Estrada de trânsito rápido (BR) | Espécie, não sinónimo exacto |
| **[passar](${passar})** | O verbo da travessia | A estrada é onde se passa |

**H1:** *estrada* < lat. *strata* — o que foi **estendido / pavimentado** (alta).  
**H2:** *street* inglês e *strada* italiana são **primos** da mesma *strata*; o [caminho](${caminho}) (*camminus*) é **outra árvore**.  
**H3:** no ofício BudGanja, não fundir *estrada* com [caminho](${caminho}): um é o leito, o outro é o método.  
**H4:** a [encruzilhada](${encruzilhada}) não é a estrada — é o **X** onde duas (ou mais) se cruzam.

\`\`\`poem
${poemPt()}
\`\`\`

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Via pública** | Ligação entre lugares, calçada ou de terra | Alta |
| **Pegar a estrada** | Partir, viajar, meter marcha | Alta (locução BR) |
| **Fim da estrada** | Termo, esgotamento, «não há mais leito» | Alta (figurado) |
| **Estrada de terra** | Leito sem asfalto — ainda é estrada | Alta |
| **Auto-estrada** | Via rápida de acesso controlado | Alta |
| **Ofício lab** | O chão da viagem; o rumo fica na [encruzilhada](${encruzilhada}) e no [cruzamento](${cruzamento}) | Alta (mapa BudGanja) |

## 4. Objectos que pedem estrada

| Objecto | Papel nesta ficha | Ficha própria |
|---------|-------------------|---------------|
| **[Automóvel](${automovel})** | O que se move **a si** sobre o leito | Objecto — *auto* + *móvel* |
| **[Bateria](${bateria})** | O pulso que deixa o automóvel **ligar** | Objecto — célula / feixe |
| **[DeLorean](${delorean})** | Um automóvel-ícone (Artes) — **não** o lema | Outra ficha |
| **[Senna](${senna})** | Outro ofício de [risco](${risco}) na pista | Outra ficha |

A estrada **não é** o carro. Sem leito, o [automóvel](${automovel}) é máquina parada; sem [bateria](${bateria}), o carro no leito ainda é casca.

## 5. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [caminho](${caminho}) · [passar](${passar}) · [mapa](${mapa}) | Método, travessia, pano do território |
| [automóvel](${automovel}) · [bateria](${bateria}) | Objectos da viagem — [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| [encruzilhada](${encruzilhada}) | O X da escolha |
| [Cruzamento · Jesus Cristo](${cruzamento}) | O pedido de cruzar o leito com a cruz |
| [risco](${risco}) · [gesto](${gesto}) · [verdade](${verdade}) | Velocidade, volante, nomear sem pose |
| [língua portuguesa](${lingua}) | Solo da palavra |
| [Vida](${vida}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) | Fecho |

## 6. O que esta ficha não é

- **Não** é manual do Código de Trânsito Brasileiro.  
- **Não** funde *estrada* com [caminho](${caminho}) nem com *via*.  
- **Não** é a ficha do [automóvel](${automovel}), da [bateria](${bateria}) nem da [encruzilhada](${encruzilhada}).  
- **Não** é catecismo: o elo com Jesus Cristo vive no [cruzamento](${cruzamento}).  
- **Não** endossa marca, pista ou «liberdade» como velocidade sem [risco](${risco}).

## 7. Veredicto

**Aprovado** — **estrada** fichada como lat. *strata* (via calçada); distinta de [caminho](${caminho}); objectos da viagem [automóvel](${automovel}) e [bateria](${bateria}); irmã da [encruzilhada](${encruzilhada}); o cruzamento com Jesus Cristo tem [ficha própria](${cruzamento}). [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

[▶ Palavras](${hub}) · [▶ Caminho](${caminho}) · [▶ Automóvel](${automovel}) · [▶ Bateria](${bateria}) · [▶ Encruzilhada](${encruzilhada}) · [▶ Cruzamento](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[estrada](${self})** — Lat. *(via) strata* (“paved way”) ← *sternere* (“to spread / pave”). Field request: inspect the word *estrada*, objects **[automóvel](${automovel})** and **[bateria](${bateria})**, crossed with **[encruzilhada](${encruzilhada})** and **Jesus Christ** ([cross sheet](${cruzamento})). This sheet is the **public paved way**; [caminho](${caminho}) remains the method hub.

> Independent audit. [estrada](${WIKT}), Lat. [*strata*](${WIKT_STRATA}). **Not a traffic code, not pavement engineering, not a catechism.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **estrada** |
| Etymon | Lat. *strata* ← *sternere* — high confidence |
| Not | [caminho](${caminho}) (method) · *via* (another Latin piece) · [mapa](${mapa}) (the cloth) |
| Travel objects | [automóvel](${automovel}) · [bateria](${bateria}) |
| Cross | [encruzilhada](${encruzilhada}) × [Jesus Christ](${cruzamento}) |
| Date | ${inspected} |

**H1:** *estrada* is the **bed**; [caminho](${caminho}) is the **method**.  
**H2:** English *street* and Italian *strada* share *strata*; *caminho* does not.  
**H3:** the [crossroads](${encruzilhada}) is the **X**, not the road itself.

\`\`\`poem
${poemEn()}
\`\`\`

## Verdict

**Approved** — *estrada* as Lat. *strata*. Objects [automóvel](${automovel}) and [bateria](${bateria}). Sister [encruzilhada](${encruzilhada}). Jesus Christ lives on the [cross sheet](${cruzamento}). [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Caminho](${caminho}) · [▶ Cross](${cruzamento}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **[estrada](${self})** — lat. *(via) strata* («vía calzada») ← *sternere*. Pedido de campo: palabra *estrada*, objetos **[automóvel](${automovel})** y **[bateria](${bateria})**, cruce con **[encruzilhada](${encruzilhada})** y **Jesucristo** ([ficha-cruce](${cruzamento})). Esta ficha es el **lecho público**; [caminho](${caminho}) sigue siendo el método.

> Auditoría independiente. [estrada](${WIKT}). **Ficha ≠ código de tráfico, ≠ catecismo.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **estrada** |
| Étimo | lat. *strata* ← *sternere* — confianza alta |
| No es | [caminho](${caminho}) · *via* · [mapa](${mapa}) |
| Objetos | [automóvel](${automovel}) · [bateria](${bateria}) |
| Cruce | [encruzilhada](${encruzilhada}) × [Jesucristo](${cruzamento}) |
| Fecha | ${inspected} |

**H1:** *estrada* es el **lecho**; [caminho](${caminho}) es el **método**.  
**H2:** *street* / *strada* comparten *strata*; *caminho* no.  
**H3:** la [encrucijada](${encruzilhada}) es la **X**, no la vía.

\`\`\`poem
${poemEs()}
\`\`\`

## Veredicto

**Aprobada** — *estrada* como lat. *strata*. Objetos [automóvel](${automovel}) y [bateria](${bateria}). Hermana [encruzilhada](${encruzilhada}). Jesucristo vive en el [cruce](${cruzamento}). [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Caminho](${caminho}) · [▶ Cruce](${cruzamento}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildEstradaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEstradaBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-estrada', 200);
  return makePalavra({
    title: 'Inspeção: Estrada — a via calçada (≠ caminho)',
    titleEn: 'Inspection: Estrada — the paved way (≠ caminho)',
    titleEs: 'Inspección: Estrada — la vía calzada (≠ caminho)',
    excerpt:
      'Palavras: estrada (lat. strata «via calçada») ≠ caminho (método); objectos automóvel e bateria; irmã encruzilhada; cruzamento Jesus Cristo; Valeu !!!',
    excerptEn:
      'Words: estrada (Lat. strata “paved way”) ≠ caminho (method); objects automóvel and bateria; sister encruzilhada; Jesus Christ cross; Valeu !!!',
    excerptEs:
      'Palabras: estrada (lat. strata «vía calzada») ≠ caminho (método); objetos automóvel y bateria; hermana encruzilhada; cruce Jesucristo; ¡Valeu !!!',
    slug: 'inspecao-palavra-estrada',
    date: '2026-08-24T16:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Estrada · strata',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEstradaPost,
  buildEstradaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_STRATA,
  WIKI
};
