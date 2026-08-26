'use strict';

/**
 * Inspeção Expressões · que porra é essa !!!?
 * Pedido: expressão que porra é essa !!!? · relação com porrada de boxe (lapso boxi).
 * Três salas: interjeição (o quê?) · porrada (a pancada) · boxe (o desporto).
 * Ficha ≠ aula de ofensa ≠ tutorial de luta.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/que-porra-e-essa-cover.jpg';
const WIKT_PORRA = 'https://pt.wiktionary.org/wiki/porra';
const WIKT_PORRADA = 'https://pt.wiktionary.org/wiki/porrada';
const WIKT_BOXE = 'https://pt.wiktionary.org/wiki/boxe';
const WIKT_BOXING = 'https://en.wiktionary.org/wiki/boxing';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n) && n > 0)
    );
    if (!taken.size) return start;
    seriesOrder = Math.max(...taken) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Que porra é essa !!!?
Não é a porrada.
Não é o boxe.

A boca pergunta o absurdo.
A família dá a pancada:
porra + -ada.
O desporto veio do inglês —
boxing, o ringue, o round.

Boxi cai o e.
A orelha cola o tabu no soco.
O étimo corta as salas:
uma pergunta,
uma porrada,
um desporto.

Não é aula de golpe.
Não é convite ao insulto.
É o termómetro
quando o mundo não cabe.

Valeu !!!
depois do sopro,
sem transformar a pergunta em soco.`;
}

function poemEn() {
  return `Que porra é essa !!!?
It is not the beating.
It is not boxing.

The mouth asks at the absurd.
The family gives the blow:
porra + -ada.
The sport came from English —
boxing, the ring, the round.

Boxi drops the e.
The ear glues the swear to the punch.
The etymon cuts the rooms:
a question,
a beating,
a sport.

Not a punch tutorial.
Not an invitation to insult.
It is the thermometer
when the world does not fit.

Valeu !!!
after the breath,
without turning the question into a fist.`;
}

function poemEs() {
  return `¿Que porra é essa !!!?
No es la paliza.
No es el boxeo.

La boca pregunta el absurdo.
La familia da el golpe:
porra + -ada.
El deporte vino del inglés —
boxing, el ring, el round.

Boxi pierde la e.
El oído pega el taco al puñetazo.
El étimo corta las salas:
una pregunta,
una paliza,
un deporte.

No es clase de golpe.
No es convite al insulto.
Es el termómetro
cuando el mundo no cabe.

¡Valeu !!!
después del soplo,
sin transformar la pregunta en puño.`;
}

function buildQuePorraEEssaBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-que-porra-e-essa.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const puta = '/posts/post-inspecao-palavra-puta.html';
  const caralhudo = '/posts/post-inspecao-palavra-caralhudo.html';
  const caralho = '/posts/post-inspecao-palavra-caralhudo.html';
  const fight = '/posts/post-inspecao-palavra-fight.html';
  const round = '/posts/post-inspecao-palavra-round.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const baixar = '/posts/post-inspecao-expressao-baixar-a-bola.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/vida/';
  const guia = '/guia/palavras.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[que porra é essa !!!?](${self})»** — interjeição interrogativa do português do Brasil: o peito **não aceita** o que acabou de ver. Pedido de campo: *expressão que porra é essa !!!?* · **relação com porrada de boxe** (lapso **boxi**). Esta ficha cobre o **grito** (o quê / o absurdo), a **família** *porra* → *porrada* (a pancada) e o **desporto** [boxe](${WIKT_BOXE}) (EN *boxing*). [A orelha cola](${orelhaCola}) o tabu no soco. O [étimo](${etimo}) **corta as salas**. Irmã de pico: [puta que pariu](${pqp}). **Ficha ≠ aula de ofensa, ≠ tutorial de luta, ≠ briga na rua.**

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · porra](${WIKT_PORRA}), [porrada](${WIKT_PORRADA}), [boxe](${WIKT_BOXE}), [boxing (EN)](${WIKT_BOXING}). **Mapear o sopro ≠ glamourizar o tabu ≠ ensinar o golpe.** Sem afiliação a ginásio ou marca. Tom: Inspetor BudGanja — a pergunta é **termómetro**; a porrada de boxe é **outra sala**. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *que porra é essa* / *q porra é essa* / *que porra é essa!!!?* → **que porra é essa !!!?** · *boxi* → **boxe**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **que porra é essa !!!?** |
| Classe | Locução interjetiva interrogativa |
| Peças | *que* + **porra** + *é* + *essa* + **!!!?** |
| Núcleo | Incredulidade / indignação / «isto não cabe» |
| Elo pedido | **porrada de boxe** — mesma família *porra*; outro ofício |
| Lapso | **boxi** — cai o *e* de *boxe* |
| Tipo BudGanja | Expressão — válvula do absurdo × corte da pancada |
| Não é | Aula de insulto · porrada como manual · [Fight!](${fight}) do fliperama · briga na rua |
| Elo pico | [PQP](${pqp}) · [aff](${aff}) · [jesusudavi](${jesusudavi}) |
| Elo ofício | [respeito](${respeito}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Fonte | [porra](${WIKT_PORRA}) · [porrada](${WIKT_PORRADA}) · [boxe](${WIKT_BOXE}) |
| Data | ${inspected} |

**Objecto:** a **pergunta-grito**. *Porra* aqui não descreve o corpo nem o ringue — **marca o pico**. As três exclamações e o ponto de interrogação são o mesmo calor gráfico de [Valeu !!!](${mantra}): calor + pergunta.

## 2. Três salas (não misturar)

| Sala | Forma | Ofício | Étimo (trabalho) |
|------|-------|--------|------------------|
| **1. A pergunta** | **que porra é essa !!!?** | Interjeição — o quê / o absurdo | *porra* tabu → válvula BR — confiança **alta no uso** |
| **2. A pancada** | **porrada** · *porrada de boxe* · *levar porrada* | Golpe / sova / troca de socos (fala) | *porra* + *-ada* (colectivo / golpe) — **alta** |
| **3. O desporto** | **boxe** (lapso **boxi**) | Modalidade — ringue, [round](${round}), luvas | EN *boxing* ← *box* (soco) — **alta** |

**H1:** *que porra é essa* é **válvula interrogativa** — irmã de [PQP](${pqp}) no pico, outro eixo (pergunta ≠ explosão pura).  
**H2:** *porrada* é da **mesma família** (*porra* + *-ada*): a pancada, a sova, e também «uma porrada de» = quantidade. Relacionar com a expressão **≠ fundir**.  
**H3:** *boxe* é **empréstimo inglês** — não nasce do palavrão. O BR cola *porrada* no ringue («trocar porrada»); o lema do desporto continua *boxe*.  
**H4:** **boxi** = lapso (cai o *e*), ofício de *Intenet* / *bandad*.  
**H5:** [Fight!](${fight}) abre o round no fliperama; **não** é esta pergunta e **não** é o boxe amador.  
**H6:** ficha **não** ensina golpe. O [risco](${risco}) da rua fica fora.

[A orelha cola](${orelhaCola}) *porra* em *porrada* em *boxe*. O [étimo](${etimo}) devolve três [relações](${relacao}), não um só objecto.

## 3. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Que** | Interrogativo | Abre o inquérito — «qual é esta coisa» |
| **porra** | Tabu / interjeição | Aqui = **intensificador do quê**, não a porrada, não o sémen como âncora desta ficha |
| **é essa** | Copula + demonstrativo | O objecto à frente — o absurdo nomeado |
| **!!!?** | Pontuação viva | Calor de [Valeu !!!](${mantra}) **mais** a pergunta — o lab honra o pedido gráfico |
| **porrada** | Pancada / quantidade | Família; **outra sala** |
| **boxe / boxi** | Desporto / lapso | EN *boxing*; *boxi* não é lema |

**Cognatos úteis (corte):** esp. *porra* (cassetete / interjeição) · *porrazo* (porrada) · ing. *what the hell is this* (função) · *boxing* (desporto). O cassetete espanhol lembra o avô «porra-clava»; no BR vivo da expressão, o ofício é o **grito**.

## 4. Escala de tom

| Grito | O que nomeia | Face à esta ficha |
|--------|----------------|-------------------|
| **[aff](${aff})** | Enfado baixo | Mais baixo |
| **[jesusudavi](${jesusudavi})** | Assombro alto | Espanto; menos tabu |
| **[jesusamado](${jesusamado})** | Calor | Outra temperatura |
| **[PQP](${pqp})** | Explosão | Pico; **não** pergunta |
| **que porra é essa !!!?** | Inquérito indignado | «Isto? agora?» |
| **[Fight!](${fight})** | Abre o round no ecrã | Outro objecto — HUD, não boca de rua |

**Veredicto de tom:** PQP explode. Esta frase **interroga** o explosivo. Depois: [Ufa!!!](${ufa}) se o peito baixa; [Valeu !!!](${mantra}) se o ofício volta.

## 5. Porrada de boxe (o cruzamento pedido)

| Uso | Leitura | Bom × mau no lab |
|-----|---------|------------------|
| **porrada de boxe** | Pancadas / troca no ringue (fala BR) | Bom: nomear a **sala 2+3** · Mau: fundir com a pergunta |
| **trocar porrada** | Combate (ringue ou, na rua, briga) | Bom se se distingue desporto × rua · Mau: tutorial |
| **levar porrada** | Apanhar | Bom: mapa oral · Mau: humilhar |
| **uma porrada de** | Quantidade («muitos») | Outra extensão da *-ada* — citar, não âncora |
| **[baixar a bola](${baixar})** | Descer o orgulho no pátio | Irmã de pátio; **não** é soco |
| **[Fight!](${fight}) / [round](${round})** | Vocabulário de ecrã | Outro desporto de palavras — MK, não boxe |

**H-parece:** *que porra é essa* **é** a porrada de boxe.  
**H-é:** a orelha solda o tabu ao soco; a expressão **pergunta**; a porrada **bate** (no mapa, não nesta página como receita); o boxe **é o desporto inglês**.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Absurdo** | «Que porra é essa !!!?» diante do inexplicável | Bom: termómetro · Mau: arma contra quem só apareceu |
| **Indignação** | Plano quebrado, regra furada | Bom: nomear [raiva](${raiva}) · Mau: virar insulto à pessoa |
| **Susto** | Quase acidente | Bom: pico + [medo](${medo}) · Mau: assustar de propósito |
| **Ringue (fala)** | «foi uma porrada de boxe» | Bom se a sala é a pancada · Mau se apaga a pergunta desta ficha |
| **Quantidade** | «uma porrada de ficha» | Extensão; não é o grito |
| **Formal** | Relatório, aula, atendimento | Mau como âncora — preferir *o que é isto* / nomear o afecto |

## 7. O que parece × o que é

| Parece | É |
|--------|---|
| Aula de palavrão | Mapa da **válvula interrogativa** |
| O mesmo que [PQP](${pqp}) | Família de pico; PQP explode, esta **pergunta** |
| Manual de boxe | O desporto é sala 3; **sem** golpe |
| [Fight!](${fight}) | HUD de jogo ≠ boca de rua ≠ ringue |
| *Boxi* outro lema | Lapso de *boxe* |
| [Caralho](${caralho}) / [caralhudo](${caralhudo}) | Outro tabu; outro étimo (*caraculum*) |

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=que-porra-e-essa)

## Limites

- Não é aula de ofensa nem convite ao insulto.  
- Não ensina porrada, soco, defesa pessoal nem briga.  
- Não funde a pergunta com o desporto nem com [Fight!](${fight}).  
- Não apaga o tabu embutido em *porra* — inspeciona-o.  
- Em registo formal do lab, preferir nomear o afecto (*indignação*, *espanto*) quando o palavrão não serve.

## Status

**Aprovado** na série Expressões — **que porra é essa !!!?** fichada como **válvula interrogativa** BR; relação pedida: **porrada de boxe** (família *porra* + *-ada* × desporto EN *boxing*; lapso **boxi**); ≠ PQP ≠ Fight ≠ luta na rua. Fecho: [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ PQP](${pqp}) · [▶ Fight](${fight}) · [▶ Round](${round}) · [▶ Caralhudo](${caralhudo}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${mantra}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Brazilian oral **«[que porra é essa !!!?](${self})»** — an interrogative burst: the chest **does not accept** what it just saw. Field request: relate it to **porrada de boxe** (slip **boxi**). Three rooms: the **question** (what the hell), the **blow** (*porrada* = *porra* + *-ada*), the **sport** ([boxe](${WIKT_BOXE}) ← EN *boxing*). The ear glues the swear to the punch. The etymon cuts. Sister peak: [PQP](${pqp}). **Not** an insult class. **Not** a boxing tutorial. Close: [Valeu !!!](${mantra}).

> [porra](${WIKT_PORRA}) · [porrada](${WIKT_PORRADA}) · [boxing](${WIKT_BOXING}).

\`\`\`poem
${poemEn()}
\`\`\`

## Object

| Field | Value |
|-------|-------|
| Cry | **que porra é essa !!!?** — bewildered question |
| Family | *porrada* — beating / a bunch of |
| Sport | *boxe* (slip *boxi*) ← EN boxing |
| Not | [Fight!](${fight}) (arcade HUD) · street fight · PQP’s pure blast |
| Date | ${inspected} |

**Seems:** the swear *is* the boxing punch.  
**Is:** one family (*porra*), three offices. After the breath: [Valeu !!!](${mantra}).

## Status

**Approved** — interrogative valve mapped; porrada/boxe crossed, not fused.

[▶ Sayings](${hub}) · [▶ PQP](${pqp}) · [▶ Fight](${fight}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**«[que porra é essa !!!?](${self})»** — soplo interrogativo BR: el pecho **no acepta** lo que acaba de ver. Pedido: relacionar con **porrada de boxe** (lapsus **boxi**). Tres salas: la **pregunta**, el **golpe** (*porrada* = *porra* + *-ada*), el **deporte** ([boxe](${WIKT_BOXE}) ← EN *boxing*). El oído pega el taco al puño. El étimo corta. Hermana de pico: [PQP](${pqp}). **No** es clase de insulto. **No** es tutorial de boxeo. Cierre: [¡Valeu !!!](${mantra}).

> [porra](${WIKT_PORRA}) · [porrada](${WIKT_PORRADA}) · [boxing](${WIKT_BOXING}).

\`\`\`poem
${poemEs()}
\`\`\`

## Objeto

| Campo | Valor |
|-------|-------|
| Grito | **que porra é essa !!!?** — pregunta indignada |
| Familia | *porrada* — paliza / montón |
| Deporte | *boxe* (lapsus *boxi*) ← EN boxing |
| No es | [¡Fight!](${fight}) · pelea callejera · la explosión pura de PQP |
| Fecha | ${inspected} |

**Parece:** el taco *es* el puñetazo.  
**Es:** una familia (*porra*), tres oficios. Después: [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — válvula interrogativa; porrada/boxe cruzados, no fundidos.

[▶ Expresiones](${hub}) · [▶ PQP](${pqp}) · [▶ Fight](${fight}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_PORRA };
}

function buildQuePorraEEssaPost() {
  const { body, contentEn, contentEs, wiki } = buildQuePorraEEssaBodies();
  return expressaoPost({
    title: 'Inspeção: que porra é essa !!!? — a pergunta, não a porrada de boxe',
    titleEn: 'Inspection: que porra é essa !!!? — the question, not the boxing beating',
    titleEs: 'Inspección: que porra é essa !!!? — la pregunta, no la paliza de boxeo',
    excerpt:
      'Expressões: que porra é essa !!!? — válvula interrogativa BR; relação porrada de boxe (lapso boxi); ≠ PQP ≠ Fight; Valeu !!!',
    excerptEn:
      'Sayings: que porra é essa !!!? — BR interrogative valve; link to boxing blows (slip boxi); ≠ PQP ≠ Fight; Valeu !!!',
    excerptEs:
      'Dichos: que porra é essa !!!? — válvula interrogativa BR; vínculo paliza de boxeo (lapsus boxi); ≠ PQP ≠ Fight; ¡Valeu !!!',
    slug: 'inspecao-expressao-que-porra-e-essa',
    date: '2026-08-26T15:20:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-que-porra-e-essa', 287),
    seriesLabel: 'que porra é essa · porrada · boxe',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildQuePorraEEssaPost,
  buildQuePorraEEssaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_PORRA,
  WIKT_PORRADA,
  WIKT_BOXE
};
