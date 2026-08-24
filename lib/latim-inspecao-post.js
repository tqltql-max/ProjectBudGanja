'use strict';

/**
 * Inspeção Palavras · latim
 * Eixos: língua do Lácio (latīnus) · página dedicada / sala do latim ·
 * a orelha cola latido (latrāre) · cachorro / cão (canis) ·
 * ES latido = batimento ≠ PT latido = ladrido · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/latim-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/latim';
const WIKT_LATIDO = 'https://pt.wiktionary.org/wiki/latido';
const WIKT_LATIR = 'https://pt.wiktionary.org/wiki/latir';
const WIKT_CACHORRO = 'https://pt.wiktionary.org/wiki/cachorro';
const WIKT_CAO = 'https://pt.wiktionary.org/wiki/cão';
const WIKT_LATINUS = 'https://en.wiktionary.org/wiki/latinus#Latin';
const WIKT_LATRARE = 'https://en.wiktionary.org/wiki/latrare#Latin';
const WIKT_CANIS = 'https://en.wiktionary.org/wiki/canis#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/L%C3%ADngua_latina';
const WIKI_LACIO = 'https://pt.wikipedia.org/wiki/L%C3%A1cio';
const WIKI_CAO = 'https://pt.wikipedia.org/wiki/C%C3%A3o';

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

function buildLatimBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-latim.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const bode = '/posts/post-inspecao-palavra-bode.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const cannabis = '/posts/post-inspecao-palavra-cannabis.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const lua = '/posts/post-inspecao-palavra-lua.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const letraX = '/posts/post-inspecao-palavra-letra-x.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';
  const caoFicha = '/animais/cao/';
  const caoInsp = '/posts/post-inspecao-animal-cao.html';
  const aprender = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[latim](${self})** — a **língua do Lácio**. Pedido de campo: *página dedicada ao Latin* · **inspeção em latido** relaciona com **cachorro** e **latido**. [A orelha cola](${orelhaCola}) *latim* no ladrido do [animal](${animal}). O étimo **corta**: uma é a língua de *Latium*; o outro é o **som do cão**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · latim](${WIKT}), [latido](${WIKT_LATIDO}), [latir](${WIKT_LATIR}), [cachorro](${WIKT_CACHORRO}), [cão](${WIKT_CAO}), lat. [*latīnus*](${WIKT_LATINUS}), [*latrāre*](${WIKT_LATRARE}), [*canis*](${WIKT_CANIS}), [Wikipédia · língua latina](${WIKI}), [Lácio](${WIKI_LACIO}), [cão](${WIKI_CAO}). **Ficha ≠ gramática latina, ≠ protocolo veterinário.** Série [Palavras](${hub}). O [animal](${animal}) fica animal — método [bode](${bode}). Esta ficha é a **sala do latim** já indexado no laboratório.

**Gatilho:** *latin* / *latim* / *latido* / *latir* / *cachorro* / *cão*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **latim** (adj. *latino*; a língua) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *latīnus* ← *Latium* (Lácio) — confiança: **alta** |
| Família viva | *latino* · *latinismo* · *latim vulgar* · *neolatino* · it. *latino* · fr. *latin* · ing. *Latin* |
| Tipo BudGanja | Palavra / língua — raiz romance × par ilusório **latido** × sala do latim |
| Não é | **latido** (ladrido) · esp. *latido* (batimento) · **latino** só como etnia/continente · [gíria](${giria}) |
| Elo animal | **latido** · **cachorro** / **cão** ← *canis* · ficha [Cão](${caoFicha}) · [inspeção animal](${caoInsp}) · hub [Animais](${animais}) |
| Fonte | [Wikcionário](${WIKT}) · [língua latina](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia a **língua de Roma e do Lácio** — mãe romance do [português](${lingua}). Não é o latido do quintal.

## O animal — latido e cachorro

Pedido: *inspeção em Latido relaciona com Cachorro, e latido*. O cachorro **ladra**. O nome do som é **latido**.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **latim** | O ladrido (LATI-) | Lat. *latīnus* — «do Lácio»; a língua |
| **latido** | Pedaço de *latim* | PT: substantivo de *latir* ← *latrāre* — o **ladrido** |
| **latir** | Falar latim | Verbo do cão — ladrar |
| **cachorro** | Só o filhote | Em BR: o [cão](${caoFicha}) no dia-a-dia; étimo ibérico (esp. *cachorro*; hipótese basco *txakur* / *catulus*) — **média** no étimo exacto |
| **cão** | Sinónimo frouxo | Lat. *canis* — o animal primeiro; ficha de espécie em [Animais](${animais}) |
| **latino** | A língua | Adj. de *Latium*; também pessoa / América — **não** fundir com o nome da língua |

O [cão](${caoInsp}) **permanece cão**. Método [bode](${bode}): o animal fica animal. *Cannabis* **não** vem de *canis* — corte [cannabis](${cannabis}).

## O que a orelha cola — e o étimo corta

O ouvido lê LATI- nas duas: *lat**im*** / *lat**ido***.

**H1:** *latim* < *latīnus* < *Latium* — a região do Tibre, não o quintal. **Alta.**  
**H2:** PT *latido* / *latir* < *latrāre* — ladrar. **Alta.** ≠ *latīnus*.  
**H3:** [a orelha cola](${orelhaCola}) porque o som parte igual; o [étimo](${etimologia}) corta.  
**H4:** em **espanhol**, *latido* é o **batimento** do [coração](${coracao}); o ladrido é *ladrido* (*ladrar* ← o mesmo *latrāre*). PT *latido* ≠ ES *latido*.  
**H5:** *cachorro* (BR «cão») e *cão* (*canis*) nomeiam o **animal que late**; não nomeiam a língua.  
**H6:** esta ficha **indexa** latinismos já cortados noutras salas; **não** ensina declinação.

## Camadas vivas de *latim*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Língua** | O idioma de Roma / da Igreja / da ciência clássica | Alta |
| **Latim vulgar** | A fala que vira romance — mãe do [português](${lingua}) | Alta |
| **Latinismo** | Empréstimo culto (*veritas*, *gestus*, *canis*) | Alta |
| **Alfabeto latino** | O A–Z do laboratório — [letra X](${letraX}) | Alta |
| **Latino** (pessoa / América) | Adj. geográfico / identitário — primo, não sinónimo da língua | Alta no corte |
| **Modo Aprender** | Glossário *la* nas palavras da [Vida](${aprender}) | Alta no ofício do site |

## Sala do latim — o que o laboratório já cortou

A página dedicada **é esta ficha**. Cada latinismo vive na palavra-mãe; aqui só o **índice**.

| Latinismo / camada | Onde o étimo corta |
|--------------------|-------------------|
| [língua portuguesa](${lingua}) | *latim vulgar* → galego-português → BR |
| [etimologia](${etimologia}) | o ofício de perguntar de onde veio |
| [verdade](${verdade}) | *vērĭtās* |
| [gesto](${gesto}) | *gestus* |
| [criatividade](${criatividade}) | *creāre* |
| [animal](${animal}) | *anima* → *animal* |
| [lua](${lua}) | *lūna* / irmã *lūx* |
| [deus](${deus}) | *deus* — vocábulo, ≠ catecismo |
| [passar](${passar}) / [caminho](${caminho}) | *passāre* / *cammīnus* |
| [especial](${especial}) | *speciālis* — latim vivo × palavras do Brasil |
| [cannabis](${cannabis}) | latinismo técnico; **≠** *canis* |
| [letra X](${letraX}) | 24.ª do alfabeto **latino** |
| **latido** / **cachorro** | o animal — nesta ficha |

Bom ofício: **indexar** o latinismo, voltar ao étimo, [verdade](${verdade}). Mau: ouvir *latim* e escrever o ladrido; ouvir *canis* e fundir com *cannabis*.

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* par *hoje*: a língua do Lácio tem nome; o cachorro tem latido; a orelha cola e o étimo solta.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Cão](${caoFicha}) · [inspeção animal](${caoInsp}) · [animal](${animal}) · [Animais](${animais}) | O bicho que late |
| [Bode](${bode}) · [gíria](${giria}) | Método: animal primeiro; outra sala de cola de ouvido |
| [Coração](${coracao}) | ES *latido* = batimento — outro andar |
| [Língua portuguesa](${lingua}) · [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) | Método do corte |
| [Cannabis](${cannabis}) | Latinismo técnico; corta CAN- de *canis* |
| [Guia de Palavras](${guia}) · [Valeu !!!](${mantra}) | Glossário e fecho |

## Limites

- Não é curso de latim nem lista de declinações.  
- Étimo de *cachorro* fica **médio** — não fechar dogma (basco / *catulus* / ibérico).  
- Não substitui a ficha de espécie [Cão](${caoFicha}).  
- *Latin* (inglês) e *latín* (espanhol) = a língua; *latido* PT ≠ *latido* ES.

## Status

**Aprovado na série Palavras** — *latim* fichado como língua do Lácio (*latīnus*); [a orelha cola](${orelhaCola}) o [animal](${animal}) **cachorro** no **latido** (*latrāre*); esta ficha é a sala do latim.

[▶ Palavras](${hub}) · [▶ Cão](${caoFicha}) · [▶ Animal](${animal}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **latim** — the **language of Latium**. Field request: dedicated Latin room · **latido** relates to **cachorro** (dog) and **bark**. [The ear glues](${orelhaCola}) *latim* to the [animal](${animal})’s bark. The etymon **cuts**: one is the language; the other is the **dog’s sound**.

> **Method note:** [Wiktionary · latim](${WIKT}), [latido](${WIKT_LATIDO}), Lat. [*latīnus*](${WIKT_LATINUS}), [*latrāre*](${WIKT_LATRARE}), [*canis*](${WIKT_CANIS}). **Not** a Latin grammar. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **latim** (Latin, the language) |
| Etymon | Lat. *latīnus* ← *Latium* — high |
| Animal glue | **latido** ← *latrāre* (to bark) · **cachorro** / **cão** ← *canis* · sheet [Dog](${caoFicha}) |
| False friend | ES *latido* = heartbeat ([coração](${coracao})); PT *latido* = bark. *Cannabis* ≠ *canis* |
| Date | ${inspected} |

This sheet is the lab’s **Latin room**: latinisms already cut ([verdade](${verdade}), [gesto](${gesto}), [animal](${animal}), [lua](${lua}), [cannabis](${cannabis})) stay on their mother words. [Valeu !!!](${mantra})

## Status

**Approved in Words** — language of Latium; ear-glue to *latido* / dog cut.

[▶ Words](${hub}) · [▶ Dog](${caoFicha}) · [▶ Animal](${animal}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **latim** — la **lengua del Lacio**. Pedido: página dedicada al latín · **latido** se relaciona con **cachorro** y con el ladrido. [El oído pega](${orelhaCola}) *latim* al [animal](${animal}). El étimo **corta**: una es la lengua; el otro es el **sonido del perro**.

> **Nota:** [Wikcionario · latim](${WIKT}), [latido](${WIKT_LATIDO}), lat. [*latīnus*](${WIKT_LATINUS}), [*latrāre*](${WIKT_LATRARE}). **No** es gramática latina. Serie [Palabras](${hub}).

**Corte ES:** en español, *latido* es el **latido** del [corazón](${coracao}); el ladrido es *ladrido*. El portugués *latido* = ladrido. No fusionar.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **latim** (latín, la lengua) |
| Étimo | Lat. *latīnus* ← *Latium* — alta |
| Animal | **latido** PT ← *latrāre* · **cachorro** / **cão** ← *canis* · ficha [Perro](${caoFicha}) |
| Cola | LATI- en *latim* y *latido*; *cannabis* ≠ *canis* |
| Fecha | ${inspected} |

Esta ficha es la **sala del latín** del laboratorio. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — lengua del Lacio; cola de oído con *latido* / perro cortada.

[▶ Palabras](${hub}) · [▶ Perro](${caoFicha}) · [▶ Animal](${animal}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildLatimPost() {
  const { body, contentEn, contentEs } = buildLatimBodies();
  const seriesOrder = pickOrder('inspecao-palavra-latim', 250);
  return makePalavra({
    title: 'Inspeção: Latim — língua do Lácio; a orelha cola latido (o cachorro)',
    titleEn: "Inspection: Latim — language of Latium; the ear glues latido (the dog's bark)",
    titleEs: 'Inspección: Latim — lengua del Lacio; el oído pega latido (el perro)',
    excerpt:
      'Palavras: latim ← lat. latīnus (Lácio) — língua; a orelha cola latido (latrāre) no cachorro / cão (canis); sala do latim; Valeu !!!',
    excerptEn:
      'Words: latim ← Lat. latīnus (Latium) — the language; the ear glues latido (latrāre) to the dog (canis); Latin room; Valeu !!!',
    excerptEs:
      'Palabras: latim ← lat. latīnus (Lacio) — la lengua; el oído pega latido (latrāre) al cachorro / cão (canis); sala del latín; ¡Valeu !!!',
    slug: 'inspecao-palavra-latim',
    date: '2026-08-24T10:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Latim · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLatimPost,
  buildLatimBodies,
  COVER,
  WIKT
};
