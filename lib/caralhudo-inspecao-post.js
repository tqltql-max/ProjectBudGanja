'use strict';

/**
 * Inspeção Palavras · caralhudo
 * Pedido de campo: inspeção em caralhudo cruze com cara de olaho.
 *
 * Três salas, um vocábulo:
 *   caralhudo     — caralho + -udo (adjectivo / intensificador)
 *   cara de alho  — trocadilho + etimologia popular (não étimo)
 *   cara de olho  — o visual do pedido; olaho = orelha entre olho e alho
 *
 * A ficha trocadilho inspecciona o *mecanismo*. Esta inspecciona o *adjectivo*
 * e o cruzamento visual. Não funde as raízes. Não celebra o insulto.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/caralhudo-palavra-cover.jpg';
const WIKT_CARALHUDO = 'https://pt.wiktionary.org/wiki/caralhudo';
const WIKT_CARALHO = 'https://pt.wiktionary.org/wiki/caralho';
const WIKT_ALHO = 'https://pt.wiktionary.org/wiki/alho';
const WIKT_OLHO = 'https://pt.wiktionary.org/wiki/olho';
const WIKT_CARACULUM = 'https://en.wiktionary.org/wiki/caraculum';
const WIKT_OCULUS = 'https://en.wiktionary.org/wiki/oculus#Latin';
const WIKT_ALLIUM = 'https://en.wiktionary.org/wiki/allium#Latin';
const WIKT_UDO = 'https://pt.wiktionary.org/wiki/-udo';

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
  return `Caralhudo.
Não nasceu de alho na cara.
Não nasceu de um olho no rosto.
Nasceu de uma estaca
e de um sufixo.

-udo é ter muito.
Barbudo. Cabeludo. Sortudo.
O tamanho cola no tabu.
O étimo não cola no alho.

Cara + alho
é a piada que a boca conta
porque encaixa demais.
Cara de olho
é o que o pedido pediu para ver.

Olaho:
a orelha entre olho e alho.
O olho vê o dente.
A orelha solda o palavrão.

Três salas.
Um vocábulo.
O lab não funde.

Valeu !!!
nomear o tamanho
sem fingir a origem.`;
}

function poemEn() {
  return `Caralhudo.
It was not born of garlic on a face.
It was not born of an eye for a face.
It was born of a stake
and a suffix.

-udo is having a lot.
Bearded. Hairy. Lucky.
Size sticks to the taboo.
The etymon does not stick to garlic.

Face + garlic
is the joke the mouth tells
because it fits too well.
Eye-face
is what the field asked to see.

Olaho:
the ear between eye and garlic.
The eye sees the clove.
The ear solders the swear.

Three rooms.
One word.
The lab does not fuse.

Valeu !!!
name the size
without faking the origin.`;
}

function poemEs() {
  return `Caralhudo.
No nació de ajo en la cara.
No nació de un ojo por rostro.
Nació de una estaca
y de un sufijo.

-udo es tener mucho.
Barbudo. Peludo. Suertudo.
El tamaño pega al tabú.
El étimo no pega al ajo.

Cara + ajo
es la broma que la boca cuenta
porque encaja demasiado.
Cara de ojo
es lo que el pedido pidió ver.

Olaho:
el oído entre ojo y ajo.
El ojo ve el diente.
El oído suelda el taco.

Tres salas.
Un vocablo.
El lab no funde.

¡Valeu !!!
nombrar el tamaño
sin fingir el origen.`;
}

function buildCaralhudoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-caralhudo.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const olhoFicha = '/posts/post-inspecao-palavra-olho.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const puta = '/posts/post-inspecao-palavra-puta.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vidaHub = '/vida/';
  const plantas = '/plantas/';

  const body = `## Escopo

Inspeção editorial da palavra **[caralhudo](${self})** — adjectivo português (BR) de **tamanho / intensidade**, formado por **caralho** + sufixo **-udo**. Pedido de campo: *inspeção em caralahdo cruze com cara de olaho*.

O laboratório lê três salas e **não funde**. O **objecto** é o vocábulo **caralhudo**. O **jogo** cruzado é **cara de alho** — o [trocadilho](${trocadilho}) clássico (cara + alho) que a boca conta como se fosse étimo. O **visual** cruzado é **cara de olho**. A grafia de campo **olaho** fica no meio: a [orelha](${orelha}) escreveu **olho** e **alho** no mesmo sopro. Objecto = o **adjectivo**. Não é dicionário de ofensas. Não é receita de alho. Não é anatomia de olho.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · caralhudo](${WIKT_CARALHUDO}), [caralho](${WIKT_CARALHO}), [-udo](${WIKT_UDO}), [alho](${WIKT_ALHO}), [olho](${WIKT_OLHO}), lat. [*caraculum*](${WIKT_CARACULUM}), [*oculus*](${WIKT_OCULUS}), [*allium*](${WIKT_ALLIUM}). Método: [etimologia](${etimologia}) — étimo × cola × sala. A ficha [trocadilho](${trocadilho}) inspecciona o **mecanismo** da piada; esta inspecciona o **resultado adjectival** e o cruzamento visual. **Ficha ≠ licença para ofender.** Trabalho com [respeito](${respeito}) e [verdade](${verdade}). Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *caralhudo* / *caralahdo* / *caralho* / *cara de alho* / *cara+alho* / *cara de olho* / *olaho* / *-udo*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **caralhudo** (também *caralhuda*) |
| Classe | Adjectivo; por extensão intensificador BR («um som caralhudo») |
| Formação | **caralho** + **-udo** — «o que tem / o que é em grau alto» |
| Étimo da base (trabalho) | lat. *caraculum* («estaca, pau pequeno») → uso náutico → gíria — confiança: **média–alta** (hipótese dominante; detalhe em disputa) |
| Étimo do sufixo | **-udo** ← lat. *-ūtus* — adjectivos de posse / intensidade (*barbudo*, *cabeludo*, *sortudo*) — confiança: **alta** |
| Cruzamento 1 | **cara de alho** — [trocadilho](${trocadilho}) + [etimologia popular](${etimologia}); **não** é o étimo |
| Cruzamento 2 | **cara de olho** — visual do pedido; órgão = ficha [olho](${olhoFicha}) (lat. *oculus*) |
| Grafia de campo | **olaho** — a [orelha](${orelha}) entre *olho* e *alho* |
| Tipo BudGanja | Palavra — adjectivo de intensidade × piada de ouvido × cara que o olho pede para ver |
| Não é | Origem «alho na cara» · biografia de um olho · manual de insulto · ficha da planta *Allium* |
| Data | ${inspected} |
| Fonte | [caralhudo](${WIKT_CARALHUDO}) |

**O que é o objecto:** o nome BR do **muito**. O sufixo pega na base tabu e mede tamanho, força, espanto. A boca pode usar isso como elogio de volume («caralhudo») ou como golpe. O lab ficheia o **ofício da palavra**, não o golpe.

## 2. Três salas — o cruzamento

Pedido de campo: *caralhudo* × *cara de olaho*. O lab **cruza** pelo método [relação](${relacao}) e **não funde**.

| Sala | Peça | Origem | Ofício nesta ficha |
|------|------|--------|---------------------|
| **Adjectivo** | *caralhudo* | *caralho* + *-udo* | O **tamanho** / a intensidade |
| **Piada** | cara + alho | [trocadilho](${trocadilho}); *alho* ← lat. *allium* | A **leitura** que a boca inventa para a base |
| **Visual** | cara de olho | [olho](${olhoFicha}) ← lat. *oculus* | O **rosto** que o pedido pediu para ver |
| **Grafia-ponte** | *olaho* | cola de campo | A orelha no meio das duas peças |

**H-cruzamento:** as três encontram-se no **rosto** (*cara*) e no **ouvido**. **Não** são a mesma raiz. *Caralhudo* não vem de alho nem de olho.  
**H-olaho:** o pedido escreveu *olaho*. O lab honra o instinto: *olho* e *alho* cabem na mesma boca. Isso é cola, não étimo.  
**H-mecanismo:** o nome do jogo continua a ser [trocadilho](${trocadilho}). Esta ficha não substitui aquela; **herda** o veredicto e aplica-o ao adjectivo.

## 3. Caralhudo — a base e o sufixo

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **caralho** | lat. *caraculum* «estaca» → náutica (moitão / peça do mastro) → interjeição e tabu | Média–alta (dominante); rivalidades de detalhe nos dicionários |
| **cara+alho** (ouvido) | [Etimologia popular](${etimologia}): história que **encaixa** demais | Alta como *fenómeno*; **baixa** como origem |
| **-udo** | lat. *-ūtus* → PT *-udo/-uda* | Alta |
| **caralhudo** | Base + sufixo: «em grau alto / que tem muito» | Alta na formação; o sentido vive no uso BR |
| **caralhuda** | Feminino do mesmo ofício | Alta |

Família visível do sufixo (não da base): *barbudo*, *cabeludo*, *peludo*, *pançudo*, *cabeçudo*, *sortudo*, *pontudo*. O **-udo** não é pejorativo por si: *sortudo* é sorte; *caralhudo* herda o tabu da **base**.

**H-náutica:** a hipótese *caraculum* passa pelo barco antes de passar pela rua. A estaca virou peça; a peça virou grito. O alho **não** entra nesta linha.  
**H-intensificador:** como [puta](${puta}) no BR também mede tamanho («uma puta festa»), *caralhudo* mede volume sem precisar de alvo humano. O paralelo é de **ofício** (intensificar), não de sangue. Cortar: intensificador ≠ licença de humilhar.

## 4. Cara de alho — o jogo (não o étimo)

A ficha [trocadilho](${trocadilho}) já fechou o nome: *cara* + *alho* **parece** [aglutinação](${aglutinacao}) (*planalto* = plano+alto) e **não é**. A terceira forma **já existia**. A piada **descobre** uma leitura; não baptiza.

| Peça | Sentido sozinha | Papel no cruzamento |
|------|-----------------|---------------------|
| **cara** | rosto; pessoa; «ter cara de» | primeira metade sonora; também a *cara* de olho |
| **alho** | *Allium sativum* — dente / cabeça | segunda metade; planta de cozinha, sem ficha própria ainda em [Plantas](${plantas}) |
| **cara+alho** | a base tabu **já no léxico** | [etimologia popular](${etimologia}) |
| **caralhudo** | o adjectivo | **não** nasce da piada; a piada cola-se depois |

**H-não:** *caralhudo* **não** significa «rosto de alho em grau alto».  
**H-não-2:** não é [polimorfismo](${polimorfismo}). Não é palavra-valise.  
**H-sim:** o pedido *cruze com cara de alho* é o método [relação](${relacao}): pôr o adjectivo ao lado da piada e **declarar** que a piada não é pai.

O *alho* é planta real (*allium*). O lab pode cheirar o dente; isso **não** prova o étimo da gíria. Sem página de planta *alho* no catálogo — citar o nome científico chega.

## 5. Cara de olho — o visual; *olaho* no meio

Pedido: *com cara de olaho*. O olho do laboratório lê **cara de olho**: um rosto que é (ou tem) um olho. A orelha lê **alho**. A grafia *olaho* guarda as duas.

| Peça | Étimo | Ofício |
|------|-------|--------|
| **olho** | lat. [*oculus*](${WIKT_OCULUS}) — ficha [olho](${olhoFicha}) | ver; o órgão; «olho no olho» |
| **alho** | lat. [*allium*](${WIKT_ALLIUM}) | o dente; o cheiro; a cabeça |
| **cara** | lat. *cara* / *chara* (rosto) — outra árvore | o suporte das duas leituras |
| **olaho** | cola de campo | ponte; **não** é lema |

A [orelha cola](${orelha}) o que a boca juntou. Aqui o **olho** pede para *ver* a solda: a capa desta ficha é um dente de alho com **cara de olho** — o visual do pedido, não a origem da palavra.

**H-olho:** *olho* e *alho* rimam quase; diferem numa vogal. A orelha BR troca vogais no meio da pressa. *Olaho* é o rasto dessa pressa.  
**H-cara:** «ter cara de» é construção portuguesa (*cara de pau*, *cara de paisagem*). *Cara de olho* e *cara de alho* cabem na mesma moldura sintáctica; só uma é a piada clássica; a outra é o [gesto](${gesto}) de ver.

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Origem de caralhudo** | cara + alho + -udo | *caraculum* + *-udo* |
| **Cara de alho** | étimo caseiro | [trocadilho](${trocadilho}) + etimologia popular |
| **Cara de olho** | outra origem | visual do pedido; *oculus* |
| **Olaho** | palavra nova | cola *olho* × *alho* |
| **Aglutinação** | plano+alto aplicado à gíria | máscara — ver [aglutinação](${aglutinacao}) |
| **Ofício** | insulto | adjectivo de intensidade; o insulto é **outro uso** |

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Intensificador** | «um trabalho caralhudo» = grande / difícil / impressionante | Bom: medir volume **sem** alvo humano |
| **Adjectivo de tamanho** | coisa *caralhuda* = enorme | Bom: o *-udo* a trabalhar |
| **Insulto dirigido** | arma contra pessoa | Fora do ofício — [respeito](${respeito}) |
| **Piada cara+alho** | soldar as peças e achar que prova o étimo | Mau como origem; bom como exemplo etiquetado |
| **Cara de olho** | pedir o visual (esta capa) | Bom: o [gesto](${gesto}) de ver; não substitui o étimo |

**Anti-armadilha:** «é só gíria» não apaga o tabu da base. **Anti-armadilha 2:** fichar ≠ repetir o golpe. **Anti-armadilha 3:** a capa com olho no alho **ilustra** o pedido; **não** ilustra a genealogia.

## 8. Poema do laboratório

\`\`\`poem
${poemPt()}
\`\`\`

## 9. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Trocadilho](${trocadilho}) | O **nome** do jogo cara+alho — irmã de mecanismo |
| [Aglutinação](${aglutinacao}) | A solda real (*planalto*); aqui só *parece* |
| [Polimorfismo](${polimorfismo}) | O nome que **não** serve à piada |
| [Etimologia](${etimologia}) · [étimo](${etimo}) | Oficio: popular ≠ trabalho; a peça |
| [Relação](${relacao}) | Cruzar sem fundir |
| [A orelha cola](${orelha}) | Método: *olaho* é o rasto |
| [Olho](${olhoFicha}) | O órgão (*oculus*) — a *cara de olho* aponta para aqui, não para o étimo de *caralhudo* |
| [Óculos](${oculos}) | O objecto **diante** do olho — outra classe |
| [Gíria](${giria}) | Solo da fala de grupo |
| [Puta](${puta}) | Paralelo de intensificador BR — outro sangue |
| [Respeito](${respeito}) · [verdade](${verdade}) · [gesto](${gesto}) | Nomear o tabu sem celebrar o golpe |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo e índice |
| [Valeu !!!](${mantra}) · [Vida](${vidaHub}) | Fecho |

## 10. Avaliação BudGanja

### Forças
- Separa **formação** (*-udo*) de **piada** (cara+alho) e de **visual** (cara de olho).  
- Honra a grafia de campo *olaho* sem a promover a lema.  
- Herda o veredicto da ficha [trocadilho](${trocadilho}) em vez de reabrir a guerra do étimo.  
- Trata o intensificador com o mesmo corte ético da ficha [puta](${puta}): medir tamanho ≠ humilhar.

### Limites
- Não é tratado de náutica nem de *Allium*.  
- Não resolve todas as disputas minuciosas de *caraculum* — aponta a hipótese dominante e recusa a popular.  
- Não ensina a insultar.  
- O poema e a capa são **criação do laboratório**.

## Status

**Aprovado** — **caralhudo** fichado: *caralho* + *-udo*; cruzado com **cara de alho** ([trocadilho](${trocadilho}), não étimo) e **cara de olho** (visual do pedido); grafia de campo *olaho* = cola *olho* × *alho*; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ Olho](${olhoFicha}) · [▶ Aglutinação](${aglutinacao}) · [▶ Etimologia](${etimologia}) · [▶ Relação](${relacao}) · [▶ Valeu !!!](${mantra}) · [▶ Hub](${hubAll}) · [▶ Guia](${guia})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[caralhudo](${self})** — adjective of **size / intensity**, formed by **caralho** + suffix **-udo**. Field request: inspect *caralhudo* and cross it with *cara de olaho*.

Three rooms, no fusion. The **object** is the adjective. The **joke** is **cara de alho** (face + garlic) — the classic [trocadilho](${trocadilho}) (pun) that the mouth tells as if it were an etymon. The **visual** is **cara de olho** (eye-face). Field spelling **olaho** sits between **olho** (eye, Lat. *oculus*) and **alho** (garlic, Lat. *allium*). Not a dictionary of insults. Not a garlic recipe. Not an eye anatomy sheet.

> Sources: [caralhudo](${WIKT_CARALHUDO}), [caralho](${WIKT_CARALHO}), [*caraculum*](${WIKT_CARACULUM}), [olho](${WIKT_OLHO}), [alho](${WIKT_ALHO}). Method: [etimologia](${etimologia}). The [trocadilho](${trocadilho}) sheet inspects the **mechanism**; this one inspects the **adjective** and the visual cross. **Sheet ≠ licence to insult.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **caralhudo** / *caralhuda* |
| Formation | **caralho** + **-udo** (Lat. *-ūtus* — “having a lot”) |
| Base etymon (working) | Lat. *caraculum* “small stake” → nautical → slang — **medium–high** |
| Cross 1 | **cara de alho** — pun + folk etymology; **not** the etymon |
| Cross 2 | **cara de olho** — the visual the field asked to see |
| Field spelling | **olaho** — [the ear](${orelha}) between eye and garlic |
| Not | garlic-face origin · insult manual |
| Date | ${inspected} |

## Three rooms

| Room | Piece | Office |
|------|-------|--------|
| Adjective | *caralhudo* | size / intensity |
| Joke | face + garlic | reading the mouth invents for the base |
| Visual | eye-face | what the field asked to see |
| Bridge | *olaho* | glue; **not** a headword |

**H-cross:** they meet on the **face** (*cara*) and in the ear. They are **not** the same root.  
**H-not:** *caralhudo* does **not** mean “garlic-face to a high degree”. The pun **discovers** a reading of a word that already existed.

## Suffix and intensifier

*-udo* is the same office as in *barbudo*, *cabeludo*, *sortudo*. The suffix is not pejorative by itself; *caralhudo* inherits the taboo from the **base**. Parallel of office with [puta](${puta}) as BR intensifier (“a puta festa”): measuring size ≠ a licence to humiliate.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *caralhudo* = *caralho* + *-udo*. Crossed with **cara de alho** (pun, not etymon) and **cara de olho** (visual). *Olaho* = glue. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **[caralhudo](${self})** — adjetivo de **tamaño / intensidad**, formado por **caralho** + sufijo **-udo**. Pedido de campo: inspeccionar *caralhudo* y cruzarlo con *cara de olaho*.

Tres salas, sin fundir. El **objeto** es el adjetivo. El **juego** es **cara de alho** (cara + ajo) — el [trocadilho](${trocadilho}) clásico que la boca cuenta como si fuera étimo. El **visual** es **cara de olho** (cara de ojo). La grafía de campo **olaho** queda entre **olho** (ojo, lat. *oculus*) y **alho** (ajo, lat. *allium*). No es diccionario de insultos.

> Fuentes: [caralhudo](${WIKT_CARALHUDO}), [caralho](${WIKT_CARALHO}), [*caraculum*](${WIKT_CARACULUM}). Método: [etimología](${etimologia}). La ficha [trocadilho](${trocadilho}) inspecciona el **mecanismo**; esta, el **adjetivo** y el cruce visual. **Ficha ≠ licencia para ofender.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **caralhudo** / *caralhuda* |
| Formación | **caralho** + **-udo** (lat. *-ūtus*) |
| Étimo de la base | lat. *caraculum* «estaca» → náutica → jerga — **media–alta** |
| Cruce 1 | **cara de alho** — calambur + etimología popular; **no** el étimo |
| Cruce 2 | **cara de olho** — el visual que el pedido pidió ver |
| Grafía de campo | **olaho** — [el oído](${orelha}) entre ojo y ajo |
| Fecha | ${inspected} |

## Tres salas

El lab **cruza** por [relação](${relacao}) y no funde. *Caralhudo* no viene del ajo ni del ojo. *Olaho* es cola, no lema. El sufijo *-udo* es el mismo oficio de *barbudo* / *sortudo*; el tabú viene de la **base**. Intensificar ≠ humillar.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *caralhudo* = *caralho* + *-udo*. Cruzado con **cara de alho** (juego, no étimo) y **cara de olho** (visual). *Olaho* = cola. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCaralhudoPost() {
  const { body, contentEn, contentEs } = buildCaralhudoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-caralhudo', 298);
  return makePalavra({
    title:
      'Inspeção: Caralhudo — -udo no tabu; cruzar com cara de alho e cara de olho; olaho no meio; Valeu !!!',
    titleEn:
      'Inspection: Caralhudo — -udo on the taboo; cross with garlic-face and eye-face; olaho in between; Valeu !!!',
    titleEs:
      'Inspección: Caralhudo — -udo en el tabú; cruzar con cara de ajo y cara de ojo; olaho en el medio; ¡Valeu !!!',
    excerpt:
      'Palavras: caralhudo (caralho + -udo) × cara de alho (trocadilho, não étimo) × cara de olho (visual); olaho = cola; Valeu !!!',
    excerptEn:
      'Words: caralhudo (caralho + -udo) × garlic-face (pun, not etymon) × eye-face (visual); olaho = glue; Valeu !!!',
    excerptEs:
      'Palabras: caralhudo (caralho + -udo) × cara de ajo (calambur, no étimo) × cara de ojo (visual); olaho = cola; ¡Valeu !!!',
    slug: 'inspecao-palavra-caralhudo',
    date: '2026-08-24T11:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Caralhudo · cara de alho · olho',
    coverImage: COVER,
    sourceUrl: WIKT_CARALHUDO,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCaralhudoPost,
  buildCaralhudoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_CARALHUDO,
  WIKT_CARALHO,
  WIKT_ALHO,
  WIKT_OLHO
};
