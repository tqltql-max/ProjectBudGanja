'use strict';

/**
 * Inspeção Palavras · retarget
 * Eixos: empréstimo EN re- + target · objecto alvo (lat. albus) ·
 * cola da orelha: rato (rat) + alvo (target) ·
 * ≠ étimo do animal · ≠ rato de computador · ≠ tutorial de anúncio.
 * Pedido: inspeção palavra retarget relacionado com objeto alvo e animal rato.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/retarget-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/retarget';
const WIKT_TARGET = 'https://en.wiktionary.org/wiki/target';
const WIKT_ALVO = 'https://pt.wiktionary.org/wiki/alvo';
const WIKT_RATO = 'https://pt.wiktionary.org/wiki/rato';
const WIKT_RE = 'https://en.wiktionary.org/wiki/re-#English';

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
  return `Retarget.
Não é o rato que inventou o verbo.
É o prefixo de novo
mais o alvo.

A orelha cola:
rato + alvo.
A boca junta o sopro.
O étimo corta:

re- outra vez.
Target o disco branco.
Alvo o objecto.
Rato o animal — cola, não pai.

O anúncio é outra sala.
O rato do rato é outra sala.
O delator é outra sala.

Valeu !!!
apontar de novo
sem fundir o bicho no branco.`;
}

function poemEn() {
  return `Retarget.
The rat did not invent the verb.
It is the prefix again
plus the target.

The ear glues:
rat + target.
The mouth joins the breath.
The etymon cuts:

re- once more.
Target the white disk.
Alvo the object.
Rat the animal — glue, not father.

The ad is another room.
The computer mouse is another room.
The snitch is another room.

Valeu !!!
aim again
without fusing the beast into the white.`;
}

function poemEs() {
  return `Retarget.
No es la rata quien inventó el verbo.
Es el prefijo de nuevo
más el blanco.

El oído pega:
rata + blanco.
La boca junta el soplo.
El étimo corta:

re- otra vez.
Target el disco blanco.
Alvo el objeto.
Rata el animal — cola, no padre.

El anuncio es otra sala.
El ratón del ordenador es otra sala.
El soplón es otra sala.

¡Valeu !!!
apuntar de nuevo
sin fundir el bicho en el blanco.`;
}

function buildRetargetBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-retarget.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';

  const body = `## Escopo

Inspeção editorial da palavra **[retarget](${self})** — empréstimo inglês: prefixo **re-** («de novo / outra vez») + **target** («alvo»). Pedido de campo: relacionar com o **objecto [alvo](${objetos})** e o **animal rato**.

Duas salas, um sopro. A [orelha cola](${orelha}): **rat** + **target** soa a **retarget**. O étimo **corta**: o [rato](${animal}) não gerou o verbo; o [alvo](${objetos}) é a peça portuguesa de *target*. Objecto = o **vocábulo**. Não é tutorial de anúncio. Não é ficha zoológica. Não é o rato do computador.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · retarget](${WIKT}), [target](${WIKT_TARGET}), [re-](${WIKT_RE}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}). **Ficha ≠ playbook de tracking, ≠ manual de praga, ≠ dicionário de hardware.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *retarget* / *retargeting* / *retargetar* / *rato no alvo* / *voltar a apontar*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **retarget** (EN de oficina; verbo / substantivo de jargão) |
| Classe | Empréstimo EN; calco BR *retargetar*; gerúndio de mercado *retargeting* |
| Étimo (trabalho) | EN **re-** + **target** — confiança: **alta** |
| Target | Ant. fr. *targette* ← *targe* «broquel / escudo pequeno» — o disco a atingir |
| Alvo (PT) | Lat. *albus* «branco» → o **branco do centro** (bullseye) → o objecto da pontaria |
| Rato (cola) | Lat. tardio *rattus* — [animal](${animal}); EN *rat* cola no ouvido com *target* |
| Tipo BudGanja | Palavra — étimo × cola da orelha × objecto × animal |
| Não é | Tutorial de ads · praga urbana · rato de computador (PT-PT) · delator · [upsert](${upsert}) |
| Data | ${inspected} |
| Fonte | [retarget](${WIKT}) |

**O que é o objecto:** o nome de **voltar a apontar ao mesmo alvo**. No lab: o [gesto](${gesto}) *re-* + o [objecto](${objetos}) *alvo*. A mnemónica **rato + alvo** é ofício da [orelha](${orelha}), não genealogia.

## 2. Duas salas — étimo × cola

Pedido de campo: *objecto alvo* e *animal rato*. O lab **não funde**.

| Sala | Peça | Ofício |
|------|------|--------|
| **Étimo** | *re-* + *target* | De novo + o disco a atingir |
| **Objecto** | **alvo** | A coisa posta à frente — [objetos](${objetos}); em PT, o branco do centro |
| **Cola** | **rato** (*rat*) + **alvo** (*target*) | A [orelha cola](${orelha}) o sopro; serve para *lembrar*, não para *provar origem* |
| **Animal** | **rato** | Ser vivo ([animal](${animal})); *Rattus*; sem ficha própria no [catálogo](${animais}) ainda |
| **Mercado** | *retargeting* / remarketing | Voltar a mostrar [mensagem](${mensagem}) a quem já passou — **outra** sala |
| **Hardware** | rato / *mouse* | Apontador do ecrã — **corte** (PT-PT *rato* ≠ o bicho desta cola) |
| **Gíria** | rato = delator | EN *rat* «informante» — **corte** |

**H-cola:** a boca junta *rat* + *target* num sopro; a orelha cola **retarget**. Mesmo o «não é o rato» ainda pega o bicho se vier na mesma frase. Cortar em duas frases: o animal. Ponto. O alvo. Ponto.  
**H-alvo:** em português, *alvo* **é** o objecto — e o étimo *albus* explica o branco do centro. *Target* EN veio do escudo; *alvo* PT veio da cor. Dois caminhos, o mesmo ofício de pontaria.  
**H-rato:** o animal entra **a pedido**. Não é pai do verbo. É a âncora da memória.

## 3. Derivação — a família à vista

| Forma | Papel | Sala |
|-------|-------|------|
| **target** | EN — alvo / objecto da pontaria | Peça-mãe do composto |
| **re-** | Prefixo EN «outra vez» | O *de novo* |
| **retarget** | Verbo / jargão | Esta ficha |
| **retargeting** | Nome de prática (ads, campanha) | Sala mercado — inspeccionar o vocábulo, não o funil |
| **retargetar** | Calco BR | Boca de oficina; não é a fala de pátio |
| **remarketing** | Primo de mercado (Google / ads) | Quase-sinónimo comercial; **não** o étimo |
| **alvo** | PT — objecto / meta / branco do centro | A peça portuguesa pedida |
| **objetivo** | Meta abstracta | Vizinho; não o disco físico |
| **rato** | Animal; em PT-PT também o apontador | Cola + homógrafo a cortar |

**H-derivação:** *retargetar* é calco, como [upsert](${upsert}) tem *upsertar*. O lema EN fica no disco; a boca BR pode calcar. O lab nomeia os dois e **não** finge que o calco é nativo antigo.

## 4. O objecto alvo

*Alvo* no português: o **[objecto](${objetos})** da pontaria — disco, silhueta, pessoa-figura, meta. Étimo de trabalho: lat. *albus* «branco». O centro do alvo de tiro era o **branco**; o branco virou o nome do objecto.

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Objecto físico** | Disco / silhueta a atingir | Alta |
| **Branco do centro** | *Albus* → bullseye | Alta (via da cor) |
| **Meta** | «O alvo da campanha» | Alta (extensão) |
| **Pessoa como alvo** | Figura, não coisa inerte | Alta — pede [respeito](${respeito}) |
| **Target EN** | Escudo pequeno → disco a atingir | Alta (via outra) |

No lab: *alvo* é o **objecto inspecionado da pontaria**. *Retarget* nomeia o [gesto](${gesto}) de **voltar** a esse objecto. Sem alvo, o *re-* não tem onde pousar.

## 5. O animal rato

*Rato* — [animal](${animal}) roedor (família Muridae; género *Rattus* no sentido comum). Étimo de trabalho: lat. tardio *rattus*. Irmãos de catálogo no lab: [coelho](${coelho}) (lagomorfo — **não** fundir com roedor), [pato](${pato}) (ave). Ainda **não** há ficha *animal rato* no [catálogo](${animais}); esta palavra empresta a peça.

| Camada | Leitura | Corte |
|--------|---------|-------|
| **Animal** | O bicho — vivo, dente, noite, cidade | Esta cola |
| **EN rat** | A mesma peça na boca inglesa | O que a orelha cola em *retarget* |
| **Rato de computador** | PT-PT para *mouse* | **Outra** sala — apontador, não Muridae |
| **Delator** | Gíria EN *rat* / «rato» de alcunha | **Corte** — não é o animal da mnemónica |
| **Praga / veneno** | Ofício de saneamento | **Não** esta ficha |

**H-animal:** o pedido «animal rato» é honrado como **peça da cola**. O lab não ensina a caçar, não estigmatiza o bicho, não o transforma em mascote de anúncio.

## 6. Hipóteses

**H1:** *retarget* EN = *re-* + *target* — alta.  
**H2:** *target* ← fr. *targette* / *targe* (escudo) — alta no traçado geral.  
**H3:** PT *alvo* ← *albus* (branco do centro) — alta; **não** é calco de *target*.  
**H4:** a cola **rato + alvo** (*rat* + *target*) é mnemónica da [orelha](${orelha}) — alta como ofício; **nula** como étimo.  
**H5:** *retargeting* de mercado é **uso** do verbo, não a origem. Ficha ≠ tutorial de pixel, cookie ou lista.  
**H6:** rato de computador e rato-delator são homógrafos / gírias — cortar.  
**H7:** o lab aponta de novo ao objecto com [verdade](${verdade}); não persegue pessoa.

## 7. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Retarget = o rato no alvo | Étimo *re-* + *target*; cola à parte |
| **Alvo** | Só «meta» abstracta | Primeiro o **objecto** (branco / disco) |
| **Rato** | Pai da palavra | Animal + cola; não genealogia |
| **Retargeting** | A ficha é um curso de ads | Vocábulo de um [gesto](${gesto}) comercial — sala cortada |
| **Rato (PT-PT)** | O apontador do ecrã | Homógrafo; hardware ≠ Muridae |
| **Remarketing** | Sinónimo exacto | Primo de mercado; outro nome de marca |

## 8. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *retarget* como **voltar a apontar ao alvo** |
| Bom | Usar **rato + alvo** como cola — e declarar que é cola |
| Bom | Separar objecto (*alvo*), animal (*rato*) e jargão EN |
| Bom | [Respeito](${respeito}) a quem é tratado como «alvo» de mensagem |
| Mau | Tutorial de perseguir gente com anúncio |
| Mau | Fundir o animal no étimo |
| Mau | Fundir o rato do computador com o bicho |
| Mau | Transformar o bicho em praga-mascote da ficha |

## 9. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=retarget)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Objetos](${objetos}) | Casa do **alvo** como coisa posta diante |
| [Animal](${animal}) · [Animais](${animais}) | Casa do **rato** como ser vivo |
| [Coelho](${coelho}) · [pato](${pato}) | Irmãos-animais no léxico — não fundir espécies |
| [A orelha cola o que a boca juntou](${orelha}) | Ofício da cola *rat* + *target* |
| [Pattern](${pattern}) · [skill](${skill}) · [upsert](${upsert}) | Empréstimos EN de oficina |
| [Mensagem](${mensagem}) | O que o mercado *re-* aponta — sem tutorial |
| [Gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [respeito](${respeito}) | Ofício |
| [Língua portuguesa](${lingua}) | Solo do *alvo* e do *rato* |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é manual de campanha, pixel, cookie nem lista de remarketing.  
- Não é ficha de *Rattus* no catálogo animal (ainda não existe; a peça entra aqui).  
- Não é aula de tiro nem de hardware.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **retarget** fichado como *re-* + *target* (voltar a apontar); **alvo** como objecto (branco / disco); **rato** como cola da [orelha](${orelha}), não como étimo. Salas cortadas (ads-tutorial, mouse, delator). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Animal](${animal}) · [▶ Orelha cola](${orelha}) · [▶ Poema Vida](/vida/#poema=retarget) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of English **retarget** — prefix *re-* («again») + *target*. Field request: relate it to the **object alvo** (Portuguese for target) and the **animal rato** (rat).

Two rooms, one breath. The [ear glues](${orelha}): **rat** + **target** sounds like **retarget**. The etymon **cuts**: the [rat](${animal}) did not father the verb; [alvo](${objetos}) is the Portuguese piece of *target*. Object = the **word**. Not an ads playbook. Not a pest sheet. Not the computer mouse.

> Method note: [Wiktionary · retarget](${WIKT}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}). **Sheet ≠ tracking tutorial.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **retarget** |
| Etymon | EN *re-* + *target* (high) |
| Object | **alvo** — Lat. *albus* «white» → bullseye → the thing aimed at |
| Glue | **rato** (*rat*) + **alvo** (*target*) — memory, not genealogy |
| Date | ${inspected} |

**H-glue:** the mouth joins rat + target; the ear glues retarget. Cut in two sentences.  
**H-market:** *retargeting* is a **use**, not the origin — no pixel lesson.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Etymon *re-* + target. Object *alvo*. Animal *rato* as glue only. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **retarget** — prefijo inglés *re-* («de nuevo») + *target*. Pedido de campo: relacionarlo con el **objeto alvo** (blanco) y el **animal rato** (rata).

Dos salas, un soplo. El [oído pega](${orelha}): **rat** + **target** suena a **retarget**. El étimo **corta**: la [rata](${animal}) no engendró el verbo; [alvo](${objetos}) es la pieza portuguesa de *target*. Objeto = el **vocablo**. No es tutorial de anuncios. No es ficha de plaga. No es el ratón del ordenador.

> Nota: [Wiktionary · retarget](${WIKT}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}). **Ficha ≠ tutorial de tracking.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **retarget** |
| Étimo | EN *re-* + *target* (alta) |
| Objeto | **alvo** — lat. *albus* «blanco» → centro del blanco |
| Cola | **rato** (*rat*) + **alvo** (*target*) — memoria, no genealogía |
| Fecha | ${inspected} |

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Étimo *re-* + target. Objeto *alvo*. Animal *rato* solo como cola. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildRetargetPost() {
  const { body, contentEn, contentEs } = buildRetargetBodies();
  const seriesOrder = pickOrder('inspecao-palavra-retarget', 290);
  return makePalavra({
    title: 'Inspeção: Retarget — re- + alvo; a orelha cola o rato; ≠ tutorial de anúncio',
    titleEn: 'Inspection: Retarget — re- + target; the ear glues the rat; ≠ ads tutorial',
    titleEs: 'Inspección: Retarget — re- + blanco; el oído pega la rata; ≠ tutorial de anuncio',
    excerpt:
      'Palavras: retarget (re- + target) — voltar a apontar ao alvo; cola rato+alvo (rat+target) ≠ étimo; objecto alvo (albus); animal rato; Valeu !!!',
    excerptEn:
      'Words: retarget (re- + target) — aim again at the target; rat+target glue ≠ etymon; object alvo (albus); animal rato; Valeu !!!',
    excerptEs:
      'Palabras: retarget (re- + target) — apuntar de nuevo al blanco; cola rata+blanco ≠ étimo; objeto alvo (albus); animal rato; ¡Valeu !!!',
    slug: 'inspecao-palavra-retarget',
    date: '2026-08-24T01:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Retarget · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRetargetPost,
  buildRetargetBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
