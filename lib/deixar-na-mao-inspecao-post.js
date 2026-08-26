'use strict';

/**
 * Inspeção Expressões · deixar na mão
 * Pedido de campo: *inspecao da expressao deixar  na mao*
 *   (espaço a mais; mao sem til; expressao / inspecao sem ã).
 * Âncora BR: abandonar / falhar no momento em que a outra mão precisava.
 * Outra sala: deixar na mão de = confiar / entregar aos cuidados.
 * Irmã inversa de meter a mão. Cortes: tutorial de abandono · furto · toque.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/deixar-na-mao-cover.jpg';
const WIKT_DEIXAR = 'https://pt.wiktionary.org/wiki/deixar';
const WIKT_MAO = 'https://pt.wiktionary.org/wiki/m%C3%A3o';
const WIKT_LAXARE = 'https://en.wiktionary.org/wiki/laxare#Latin';
const WIKT_MANUS = 'https://en.wiktionary.org/wiki/manus#Latin';

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
  return `A palma estava aberta.
A outra mão ainda pedia.
Deixar na mão
é soltar quando o aperto era o ofício.

Não é meter a mão na massa.
Não é pedir a mão.
Não é entregar aos cuidados.
É a ausência no instante
em que a presença era o contrato.

Deixar — latim laxāre, soltar.
Mão — latim manus, o osso que segura.
A orelha cola o espaço e o til.
O étimo corta: a palma que larga.

Valeu !!!
com a mão que fica,
sem ensinar a largar a alheia.`;
}

function poemEn() {
  return `The palm was open.
The other hand still asked.
Deixar na mão
is letting go when the hold was the craft.

It is not hands in the dough.
It is not asking for a hand.
It is not leaving in someone’s care.
It is absence at the instant
when presence was the contract.

Deixar — Latin laxāre, to loosen.
Mão — Latin manus, the bone that holds.
The ear glues the space and the tilde.
The etymon cuts: the palm that drops.

Valeu !!!
with the hand that stays,
without teaching how to drop the other.`;
}

function poemEs() {
  return `La palma estaba abierta.
La otra mano aún pedía.
Deixar na mão
es soltar cuando el apriete era el oficio.

No es meter la mano en la masa.
No es pedir la mano.
No es entregar a los cuidados.
Es la ausencia en el instante
en que la presencia era el contrato.

Deixar — latín laxāre, soltar.
Mão — latín manus, el hueso que sujeta.
El oído pega el espacio y la tilde.
El étimo corta: la palma que suelta.

Valeu !!!
con la mano que se queda,
sin enseñar a soltar la ajena.`;
}

function buildDeixarNaMaoBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-deixar-na-mao.html';
  const meter = '/posts/post-inspecao-expressao-meter-a-mao.html';
  const pedi = '/posts/post-inspecao-palavra-pedi-mao.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const areia = '/posts/post-inspecao-expressao-jogar-areia.html';
  const desatar = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da expressão **«[deixar na mão](${self})»** — locução viva do português do Brasil: **abandonar** no instante em que a outra palma precisava da tua. Pedido de campo: *inspecao da expressao deixar  na mao*. [A orelha cola](${orelhaCola}) o **espaço a mais** (*deixar  na*), o **til** que cai (*mao*) e o **ã** que some (*inspecao* / *expressao*). O [étimo](${etimo}) **corta**: *deixar* (lat. *laxāre*, soltar) + *mão* (lat. *manus*). A âncora é **deixar (alguém) na mão**. **Deixar na mão de** (entregar aos cuidados) é **outra sala**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · deixar](${WIKT_DEIXAR}), [mão](${WIKT_MAO}), lat. [*laxāre*](${WIKT_LAXARE}), [*manus*](${WIKT_MANUS}). **Ficha ≠ tutorial de abandono, ≠ guia de traição, ≠ furto, ≠ toque sem pedido.** Sem afiliação comercial. Tom: [gesto](${gesto}) no [caminho](${caminho}) com [respeito](${respeito}) — nomear a falha **sem** ensinar a praticá-la.

**Gatilho:** *deixar  na mao* / *deixar na mão* / *deixou na mão* / *me deixou na mão* / *largar na mão* → **deixar na mão** (âncora). *Deixar na mão de* → sala **cuidado / confiança**, não objecto.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **deixar na mão** |
| Variantes | *deixou na mão* · *me deixou na mão* · *largar na mão* · *ficar na mão* (resultado) · *deixar  na mao* (lapso) |
| Classe | Locução verbal |
| Peças | **deixar** (lat. *laxāre* «soltar, deixar ir») + **na** + **mão** (lat. *manus*) |
| Núcleo | Ausência — a palma **larga** quando o aperto era o contrato |
| Tipo BudGanja | Expressão — [gesto](${gesto}) × [mão](${maos}) × [relação](${relacao}) × [ação](${acao}) |
| O que **não** é | Tutorial de abandono · [meter a mão](${meter}) · [pedir a mão](${pedi}) · *deixar na mão de* (cuidados) · furto · toque sem consentimento |
| Elo | [meter a mão](${meter}) · [pedi a mão](${pedi}) · [mãos](${maos}) · [jogar areia](${areia}) · [desatar o nó](${desatar}) · [respeito](${respeito}) |
| Fonte | [deixar](${WIKT_DEIXAR}) · [mão](${WIKT_MAO}) |
| Data | ${inspected} |

**Objecto:** o acto de **não aparecer** quando a [relação](${relacao}) pedia presença. No laboratório: a palma que [meter a mão](${meter}) **entra**; aqui a palma **abre-se e some**. Nomeia-se o rasto. **Não** se ensina o golpe.

## 2. Hipóteses e método

**H1:** *deixar* herda lat. *laxāre* — **soltar / deixar ir**; *mão* herda lat. *manus* — o osso que segura — confiança **alta**.  
**H2:** a canónica de pátio é **me deixou na mão**: o outro falhou no instante combinado.  
**H3:** [A orelha cola](${orelhaCola}) *deixar  na* (espaço) e *mao* (sem til). O [étimo](${etimo}) corta: uma locução, um til, um espaço só.  
**H4:** **deixar na mão de** (confiar / entregar) **não** é esta âncora. Relacionar ≠ fundir.  
**H5:** [meter a mão](${meter}) é o inverso de ofício: a palma **entra**. **Deixar na mão** é a palma que **larga** a outra.  
**H6:** [jogar areia](${areia}) suja o jogo alheio **estando lá**. **Deixar na mão** falha **não estando**. Duas salas de dano; dois gestos.  
**H7:** sem [respeito](${respeito}), a frase vira desculpa ou manual. Esta ficha **nomeia**; não instrui.

## 3. Salas (não misturar)

| Sala | Leitura | No lab |
|------|---------|--------|
| **Pátio / âncora** | Abandonar quem precisava — *me deixou na mão* | Canónica desta ficha |
| **Resultado** | *ficar na mão* — quem ficou sozinho | Mesma família; o lado que sofre |
| **Variante** | *largar na mão* | Mesmo gesto, verbo mais bruto |
| **Cuidado** | *deixar na mão de* = entregar aos cuidados | **Outra sala** — confiança, não abandono |
| **Lapso** | *deixar  na mao* — espaço + til | Orelha cola; étimo corta |
| **Ofício** | [Meter a mão](${meter}) — a palma entra | Irmã **inversa** — contacto, não ausência |
| **Pedido** | [Pedir a mão](${pedi}) — a palma abre-se | Ajuda / compromisso — **não** esta âncora |
| **Atrito** | [Jogar areia](${areia}) — sujar o plano alheio | Dano **presente**; aqui o dano é **ausente** |
| **Furto / toque** | Meter a mão no que não é seu / em quem não pediu | **Corte** — vive na ficha [meter a mão](${meter}) |

## 4. Peças da frase

| Peça | Comum | BudGanja |
|------|-------|----------|
| **Deixar** | Verbo — soltar, não levar, não ficar (lat. *laxāre*) | [Gesto](${gesto}) de **afrouxar** — o oposto de segurar |
| **na** | Preposição + artigo (*em* + *a*) | O lugar da palma — *na mão*, não *da mão* |
| **Mão** | Palavra do corpo (lat. *manus*) | Instrumento da [relação](${relacao}) — ficha [mãos](${maos}) |

**Lapso de campo:** *deixar  na mao* — dois espaços onde há um; *mão* sem til. Lê-se o calor da boca; escreve-se a locução.

**≠** *deixar na mão de alguém*: a preposição **de** muda a sala — entrega, não abandono.  
**≠** *dar a mão* / *dar uma mão*: oferecer ajuda — inverso desta âncora.  
**≠** *mãos atadas*: impedimento; aqui a palma **podia** e **não quis** (ou não veio).

## 5. Deixar na mão × meter a mão × pedir a mão × jogar areia

| Locução | Direcção | Ofício |
|---------|----------|--------|
| **[deixar na mão](${self})** | A palma **larga** | Ausência no instante combinado |
| **[meter a mão](${meter})** | A palma **entra** | Contacto com a massa |
| **[pedir a mão](${pedi})** | A palma **abre-se** | Ajuda ou compromisso |
| **[jogar areia](${areia})** | O grão **entra** no jogo alheio | Atrito presente — não é faltar |

Quatro gestos. A família *mão* cola na orelha. O [étimo](${etimo}) e a direcção **cortam**. [Desatar o nó](${desatar}) é o ofício de quem **fica** a resolver; deixar na mão é o nó que o outro **não** veio desatar.

## 6. O que parece × o que é

| Parece | É |
|--------|---|
| Manual de como abandonar | Nome do [gesto](${gesto}) — a ficha **não** ensina o golpe |
| Sinónimo de [meter a mão](${meter}) | Inverso: um entra, o outro some |
| Sinónimo de *deixar na mão de* | Cuidado × abandono — a preposição **de** muda a sala |
| Só um atraso | A âncora é **não estar** quando o contrato pedia |
| [Jogar areia](${areia}) | Areia suja o jogo **estando**; esta locução falha **faltando** |
| *Deixar  na mao* como lema | Lapso de espaço e til — gatilho, não âncora |

## 7. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *me deixou na mão* com [verdade](${verdade}) — o rasto existe |
| Bom | Distinguir *deixar na mão de* (confiança) desta âncora |
| Bom | Ficar — [meter a mão](${meter}) — quando a outra palma pediu |
| Bom | [Desatar o nó](${desatar}) em vez de largar quem segura |
| Mau | Usar a ficha como receita de abandono |
| Mau | Fundir meter / pedir / deixar num só gesto de mão |
| Mau | Tratar o lapso *mao* / espaço a mais como lema |

## 8. Limites

- Não ensinamos a abandonar, a trair nem a faltar de propósito. Nomeia-se o rasto; o [respeito](${respeito}) corta o manual.  
- Não é ficha de [meter a mão](${meter}) (contacto) nem de [pedir a mão](${pedi}) (abertura).  
- Não é *deixar na mão de* (cuidados / confiança).  
- Furto e toque sem consentimento ficam nos cortes de [meter a mão](${meter}).  
- [Relação](${relacao}) sem [respeito](${respeito}) é [risco](${risco}), não método.

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **deixar na mão** = o [gesto](${gesto}) que **larga** quando o aperto era o contrato. Variantes: *deixou na mão*, *me deixou na mão*, *largar na mão*. Lapso de campo: *deixar  na mao* (espaço × til). Distinto de **deixar na mão de** (cuidados) e inverso de **[meter a mão](${meter})**. Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) **com a mão que fica**, sem ensinar a largar a alheia.

[▶ Expressões](${hub}) · [▶ Meter a mão](${meter}) · [▶ Pedi a mão](${pedi}) · [▶ Mãos](${maos}) · [▶ Jogar areia](${areia}) · [▶ Desatar o nó](${desatar}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${valeu}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Faça o seu melhor](${faca}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Brazilian saying **«[deixar na mão](${self})»** — to **abandon** at the instant the other palm needed yours. Field: *inspecao da expressao deixar  na mao* (extra space; *mao* without tilde). Craft canon: **me deixou na mão** (they left me hanging). Inverse of **[meter a mão](${meter})** (the palm that enters). Other room: **deixar na mão de** (leave in someone’s care). Cuts: abandonment how-to, theft, unwanted touch.

> Independent audit. [deixar](${WIKT_DEIXAR}), [mão](${WIKT_MAO}), Lat. [*laxāre*](${WIKT_LAXARE}), [*manus*](${WIKT_MANUS}). **Not** a tutorial on leaving people hanging.

## Object

| Field | Value |
|-------|-------|
| Saying | **deixar na mão** |
| Pieces | *deixar* (Lat. *laxāre*) + *na* + *mão* (Lat. *manus*) |
| Lab | Absence when presence was the contract |
| Not | How-to abandon · [meter a mão](${meter}) · [pedir a mão](${pedi}) · leave-in-care as âncora |
| Date | ${inspected} |

**H1:** *deixar* = to loosen / let go; *mão* = the holding bone.  
**H2:** field slip *deixar  na mao* = ear-glue; etymon cuts space and tilde.  
**H3:** *deixar na mão de* is trust, not this âncora.  
**H4:** [jogar areia](${areia}) dirties the game while present; this saying fails by being absent.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved. The hand that stays. [Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Sayings](${hub}) · [▶ Hands-on](${meter}) · [▶ Hands](${maos}) · [▶ Throw sand](${areia}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Dicho BR **«[deixar na mão](${self})»** — **abandonar** en el instante en que la otra palma pedía la tuya. Pedido: *inspecao da expressao deixar  na mao* (espacio de más; *mao* sin tilde). Canónica: **me deixou na mão**. Inverso de **[meter a mão](${meter})**. Otra sala: **deixar na mão de** (dejar al cuidado). Cortes: tutorial de abandono, hurto, toque sin pedido.

> Auditoría independiente. [deixar](${WIKT_DEIXAR}), [mão](${WIKT_MAO}). **No** es manual de dejar a alguien colgado.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **deixar na mão** |
| Piezas | *deixar* (lat. *laxāre*) + *na* + *mão* (lat. *manus*) |
| Lab | Ausencia cuando la presencia era el contrato |
| No es | Cómo abandonar · [meter a mão](${meter}) · [pedir a mão](${pedi}) · cuidados como âncora |
| Fecha | ${inspected} |

**H1:** *deixar* = soltar; *mão* = el hueso que sujeta.  
**H2:** *deixar  na mao* = oído; el étimo corta espacio y tilde.  
**H3:** *deixar na mão de* es confianza, no esta âncora.  
**H4:** [jogar areia](${areia}) ensucia el juego estando; esta locución falla faltando.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado. La mano que se queda. [¡Valeu !!!](${valeu}) · [eu amo a vida](${amo})

[▶ Expresiones](${hub}) · [▶ Manos a la obra](${meter}) · [▶ Manos](${maos}) · [▶ Echar arena](${areia}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_DEIXAR };
}

function buildDeixarNaMaoPost() {
  const { body, contentEn, contentEs, wiki } = buildDeixarNaMaoBodies();
  return expressaoPost({
    title: 'Inspeção: Deixar na mão — o gesto que larga no instante combinado',
    titleEn: 'Inspection: Deixar na mão — the gesture that drops at the agreed instant',
    titleEs: 'Inspección: Deixar na mão — el gesto que suelta en el instante combinado',
    excerpt:
      'Expressões: deixar na mão — abandonar quando a outra palma precisava; lapso deixar  na mao; ≠ meter a mão ≠ cuidados ≠ tutorial; Valeu !!!',
    excerptEn:
      'Sayings: deixar na mão — leave hanging when the other palm needed you; slip deixar  na mao; ≠ hands-on ≠ care ≠ how-to; Valeu !!!',
    excerptEs:
      'Dichos: deixar na mão — abandonar cuando la otra palma pedía; lapso deixar  na mao; ≠ meter la mano ≠ cuidados ≠ tutorial; ¡Valeu !!!',
    slug: 'inspecao-expressao-deixar-na-mao',
    date: '2026-08-26T09:45:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-deixar-na-mao', 46),
    seriesLabel: 'Deixar na mão · ausência',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDeixarNaMaoPost,
  buildDeixarNaMaoBodies,
  poemPt,
  poemEn,
  poemEs
};
