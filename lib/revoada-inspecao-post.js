'use strict';

/**
 * Inspeção Expressões · Revoada
 * Pedido de campo: palavra relação + animal pássaro / Birds + gesto de voar.
 * O nome vivo desse entre é a revoada — o bando que levanta voo junto.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/revoada-cover.jpg';
const WIKT_REVOADA = 'https://pt.wiktionary.org/wiki/revoada';
const WIKT_REVOAR = 'https://pt.wiktionary.org/wiki/revoar';
const WIKT_VOAR = 'https://pt.wiktionary.org/wiki/voar';
const WIKT_PASSARO = 'https://pt.wiktionary.org/wiki/p%C3%A1ssaro';

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
  return `Um só pássaro voa.
A revoada é o entre:
vários corpos, o mesmo gesto,
o céu a abrir-se ao mesmo tempo.

Não é o braço humano a imitar asa.
Não é o drone a mandar a câmara.
Não é um a passar e o outro a ficar.

Valeu !!!
com o bando nomeado,
sem fundir ave, mime e máquina.`;
}

function poemEn() {
  return `One bird flies.
The revoada is the between:
several bodies, the same gesture,
the sky opening at once.

It is not the human arm mimicking a wing.
It is not the drone sending the camera.
It is not one passing while another stays.

Valeu !!!
with the flock named,
without merging bird, mime and machine.`;
}

function poemEs() {
  return `Un solo pájaro vuela.
La revoada es el entre:
varios cuerpos, el mismo gesto,
el cielo abriéndose a la vez.

No es el brazo humano imitando el ala.
No es el dron mandando la cámara.
No es uno que pasa y otro que se queda.

¡Valeu !!!
con la bandada nombrada,
sin fundir ave, mimo y máquina.`;
}

function buildRevoadaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-revoada.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const voar = '/posts/post-inspecao-palavra-voar.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const galinha = '/posts/post-inspecao-animal-galinha.html';
  const codorna = '/posts/post-inspecao-animal-codorna.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const animais = '/animais/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[Revoada](${self})»** — o nome português do **bando de aves que levanta voo junto**. Pedido de campo: *inspeção da palavra [relação](${relacao}) com animal pássaro / Birds [gesto](${gesto}) de [voar](${voar})*. Esta ficha cobre o **objecto**, o étimo (*re-* + *voar* + *-ada*), as camadas (ornitologia × mime humano × metáfora social), os **cortes** e a rede com [animal](${animal}), [pato](${pato}), [galinha](${galinha}) e [Three Little Birds](${birds}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · revoada](${WIKT_REVOADA}), [revoar](${WIKT_REVOAR}), [voar](${WIKT_VOAR}), [pássaro](${WIKT_PASSARO}). **Ficha ≠ monografia ornitológica, ≠ aula de mímica, ≠ manual de drone.** Sem afiliação. Tom: Inspetor BudGanja — a revoada **nomeia o entre** do bando; o [gesto](${gesto}) de voar torna esse entre visível.

**Gatilho tipográfico:** *revoada* / *Revoada* / *re voada* → **revoada**. *Birds* nesta ficha = inglês de **pássaros / aves**, não a banda, não só as [Three Little Birds](${birds}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **Revoada** |
| Variantes | *revoada* · *uma revoada de* · *revoar* (verbo) · *revoaram* |
| Classe | Substantivo feminino (evento / colectivo); o verbo irmão é **revoar** |
| Peças | **re-** (de novo / em volta) + **[voar](${voar})** (lat. *volāre*) + **-ada** (colectivo: *boiada*, *ninhada*) |
| Núcleo | Vários [animais](${animal})-ave no **mesmo** [gesto](${gesto}) de [voar](${voar}) — a [relação](${relacao}) feita céu |
| Tipo BudGanja | Expressão — [relação](${relacao}) animal × [gesto](${gesto}) de voar |
| O que **não** é | Voo a solo · [passar](${passar}) (outro étimo) · avião / drone da ficha [voar](${voar}) · só as [Three Little Birds](${birds}) |
| Elo | [relação](${relacao}) · [gesto](${gesto}) · [animal](${animal}) · [Animais](${animais}) · [Valeu !!!](${mantra}) |
| Fonte | [revoada](${WIKT_REVOADA}) · [revoar](${WIKT_REVOAR}) |
| Data | ${inspected} |

**Objecto:** o **entre do bando**. Um pássaro voa; a revoada é o que acontece **entre** os pássaros quando o céu abre ao mesmo tempo.

## 2. A relação pedida (pássaro × Birds × gesto de voar)

Pedido: *relação com animal pássaro Birds gesto de voar*. A [relação](${relacao}) (lat. *relatĭō*) é o **entre**. Aqui o entre tem corpo.

| Peça do pedido | Sala | Papel nesta ficha |
|----------------|------|-------------------|
| **[relação](${relacao})** | Palavra — o entre | O bando **é** uma relação visível |
| **[animal](${animal}) / pássaro / Birds** | Ser vivo não humano | Os corpos da relação — Ave, não mascote genérica |
| **[gesto](${gesto}) de [voar](${voar})** | Acto mínimo | Asas (ave) ou braços (mime humano) — **duas salas** |
| **Revoada** | Esta expressão | O **nome** que junta as três peças |

**H1:** *revoada* = *revoar* + *-ada* — colectivo do voo, confiança **alta**.  
**H2:** a [relação](${relacao}) do bando não é romance nem proporção matemática: é **co-decolagem**.  
**H3:** o [gesto](${gesto}) humano de voar (braços em asa) **imita** a revoada; não a substitui.  
**H4:** *Birds* (EN) traduz o referente **aves**; as [Three Little Birds](${birds}) são **personagens** da [Vida](${vida}) — irmãs de tema, não o lema.  
**H5:** fecho = [respeito](${respeito}) ao animal + [verdade](${verdade}) do nome + [Faça o seu melhor](${faca}) / [Valeu !!!](${mantra}).

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| *voar* ← lat. *volāre* | Voo da ave e, por extensão, de máquina / mime | Alta |
| *revoar* = *re-* + *voar* | Voar de novo, em volta, ou levantar voo (bando) | Alta |
| *revoada* = *revoar* + *-ada* | Acto e **colectivo** (como *boiada*) | Alta |
| *pássaro* ← lat. *passer* | Passeriforme / ave pequena — **≠** verbo [passar](${passar}) | Alta |
| EN *birds* / *a flight of birds* | Tradução do referente, não étimo | Alta (uso) |
| ES *revuelo* / *bandada* | Paralelo ibérico; *revuelo* também é alvoroço | Alta (paralelo) |

**Veredicto etimológico:** origem **latina clara** via *volāre*. O sufixo *-ada* faz do voo um **acontecimento colectivo**. A [relação](${relacao}) pede-se aqui porque a revoada **não cabe num só corpo**.

## 4. Camadas (não fundir)

| Camada | O que é | O que **não** é |
|--------|---------|-----------------|
| Ornitologia | Bando que [revoa](${WIKT_REVOAR}) — pombos, andorinhas, estorninhos | Ficha de uma só espécie ([galinha](${galinha}), [pato](${pato}), [codorna](${codorna})) |
| [Gesto](${gesto}) da ave | Asas, arranque, formação | Pose humana |
| [Gesto](${gesto}) humano | Braços em asa — mime / brincadeira / sinal | O ofício do corpo da ave |
| Metáfora social | «Saiu uma revoada de gente» — vários a partir ao mesmo tempo | Relatório de fauna |
| Máquina | [Voar](${voar}) na ficha Tamara = mandar a câmara ao céu | Revoada de drones ≠ revoada de aves |
| Cultura pop | [Three Little Birds](${birds}) — trio da [Vida](${vida}) | O colectivo da expressão |

**Anti-armadilha:** dizer «revoada» a um pássaro sozinho. Outra: colar *Birds* só às personagens. Outra: fundir *pássaro* com [passar](${passar}) — ouvido parecido, étimos distintos (*passer* ≠ *passāre*).

## 5. Relação × simbiose × revoada

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[relação](${relacao})** | Nome genérico do entre | Ampla — vínculo, relato, proporção |
| **[simbiose](${simbiose})** | Viver juntos | Coabitação; a revoada pode ser breve |
| **Revoada** | Entre **em voo** | O vínculo dura o gesto de levantar |
| **[elo de ligação](${elo})** | Anel que junta dois lados | Geometria; a revoada junta **muitos** |
| **[gesto](${gesto})** | Acto mínimo | O que **faz** a revoada existir no ar |

A revoada é um **caso** de [relação](${relacao}): A, B e C no mesmo céu, sem fundir num só animal.

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Relação](${relacao}) | O método do entre — esta expressão é o caso-ave |
| [Gesto](${gesto}) · [voar](${voar}) | Acto mínimo × verbo do céu (ficha Tamara = câmara; aqui = asa) |
| [Animal](${animal}) · [Animais](${animais}) | Hub do ser; espécies: [pato](${pato}), [galinha](${galinha}), [codorna](${codorna}) |
| [Three Little Birds](${birds}) | Personagens-pássaro da [Vida](${vida}) — tema, não lema |
| [Passar](${passar}) · [caminho](${caminho}) | Corte: passar ≠ pássaro |
| [Simbiose](${simbiose}) · [respeito](${respeito}) · [verdade](${verdade}) | Ética do entre |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo do vocábulo |
| [Valeu !!!](${mantra}) · [Faça o seu melhor](${faca}) | Fecho — nomear o bando sem pose |

### Como ler

1. Entrar pela **expressão** (esta ficha).  
2. Separar: ave · mime · metáfora · máquina.  
3. Cruzar [relação](${relacao}) se o pedido for o **entre**.  
4. Cruzar [animal](${animal}) / [Animais](${animais}) se o pedido for o **ser**.  
5. Cruzar [gesto](${gesto}) / [voar](${voar}) se o pedido for o **acto**.  
6. Fechar com [Valeu !!!](${mantra}).

\`\`\`poem
${poemPt()}
\`\`\`

## 7. Avaliação BudGanja

### Forças

- Nomeia o **colectivo** do voo sem exigir uma espécie.  
- Cruza o pedido de campo ([relação](${relacao}) × pássaro / Birds × [gesto](${gesto}) de [voar](${voar})) num só objecto.  
- Corta mime, drone, personagens e o verbo [passar](${passar}).

### Limites

- Não inventaria espécies nem cantos.  
- Não é tratado de murmuração (estorninhos) — caso especial.  
- Não ensina a «fazer a revoada» com o corpo como coreografia.

## Status

**Aprovado** — **Revoada** fichada: *revoar* + *-ada*; [relação](${relacao}) do bando; animal pássaro / Birds; [gesto](${gesto}) de [voar](${voar}); cortes nomeados; [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Relação](${relacao}) · [▶ Gesto](${gesto}) · [▶ Voar](${voar}) · [▶ Animal](${animal}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **«[Revoada](${self})»** — the flock of birds **taking wing together**. Field request: the word [relação](${relacao}) with animal *pássaro* / Birds and the [gesto](${gesto}) of [voar](${voar}) (to fly). This sheet covers the object, the etymon (*re-* + *voar* + collective *-ada*), layers (ornithology × human mime × social metaphor), and cuts.

> Independent audit. Sources: [revoada](${WIKT_REVOADA}), [revoar](${WIKT_REVOAR}), [voar](${WIKT_VOAR}), [pássaro](${WIKT_PASSARO}). **Not** an ornithology monograph, a mime class, or a drone manual.

## 1. Object

| Field | Value |
|-------|-------|
| Expression | **Revoada** |
| Pieces | *re-* + [voar](${voar}) (Lat. *volāre*) + *-ada* (collective) |
| Core | Several [animals](${animal}) in the **same** flying [gesto](${gesto}) — [relação](${relacao}) made sky |
| Not | Solo flight · [passar](${passar}) (other etymon) · Tamara-drone [voar](${voar}) · only [Three Little Birds](${birds}) |
| Date | ${inspected} |

**H1:** *revoada* names the **between** of the flock.  
**H2:** human arm-wings **mimic** it; they do not replace the bird.  
**H3:** EN *Birds* = the animals; the [Three Little Birds](${birds}) are Vida characters, not the lemma.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** the flock named, rooms unmerged. [Valeu !!!](${mantra})

[▶ Sayings](${hub}) · [▶ Relação](${relacao}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la expresión portuguesa **«[Revoada](${self})»** — la bandada que **alza el vuelo junta**. Pedido de campo: la palabra [relação](${relacao}) con animal *pássaro* / Birds y el [gesto](${gesto}) de [voar](${voar}). Cubre el objeto, el étimo (*re-* + *voar* + *-ada* colectivo), las capas (ornitología × mimo humano × metáfora social) y los cortes.

> Auditoría independiente. Fuentes: [revoada](${WIKT_REVOADA}), [revoar](${WIKT_REVOAR}), [voar](${WIKT_VOAR}), [pássaro](${WIKT_PASSARO}). **No** es monografía ornitológica ni clase de mimo.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **Revoada** |
| Piezas | *re-* + [voar](${voar}) (lat. *volāre*) + *-ada* (colectivo) |
| Núcleo | Varios [animales](${animal}) en el **mismo** [gesto](${gesto}) de volar — la [relação](${relacao}) hecha cielo |
| No es | Vuelo a solas · [passar](${passar}) · [voar](${voar})-dron Tamara · solo las [Three Little Birds](${birds}) |
| Fecha | ${inspected} |

**H1:** *revoada* nombra el **entre** de la bandada.  
**H2:** los brazos-ala humanos **imitan**; no sustituyen al ave.  
**H3:** EN *Birds* = los animales; las [Three Little Birds](${birds}) son personajes de Vida, no el lema.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** la bandada nombrada, las salas sin fundir. [¡Valeu !!!](${mantra})

[▶ Expresiones](${hub}) · [▶ Relação](${relacao}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_REVOADA };
}

function buildRevoadaPost() {
  const { body, contentEn, contentEs, wiki } = buildRevoadaBodies();
  return expressaoPost({
    title: 'Inspeção: Revoada — a relação do bando no gesto de voar',
    titleEn: 'Inspection: Revoada — the flock’s relation in the gesture of flying',
    titleEs: 'Inspección: Revoada — la relación de la bandada en el gesto de volar',
    excerpt:
      'Expressões: Revoada — bando que levanta voo; relação × pássaro / Birds × gesto de voar; Valeu !!!',
    excerptEn:
      'Sayings: Revoada — flock taking wing; relation × bird / Birds × flying gesture; Valeu !!!',
    excerptEs:
      'Dichos: Revoada — bandada alzando el vuelo; relación × pájaro / Birds × gesto de volar; ¡Valeu !!!',
    slug: 'inspecao-expressao-revoada',
    date: '2026-08-23T23:05:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-revoada', 278),
    seriesLabel: 'Revoada · bando',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildRevoadaPost, buildRevoadaBodies };
