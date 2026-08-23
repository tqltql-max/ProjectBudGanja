'use strict';

/**
 * Inspeção Expressões · cruzar os braços em cima da cabeça
 * Gesto-sinal do corpo. Pedido: cruzar os braços em cima da cabeça · sinais.
 * Leitura de ofício: pausa da cabeça.
 * Corta: braços no peito · mãos na nuca · mãos no cabelo sem cruzar · cruzar os dedos.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cruzar-os-bracos-cabeca-cover.jpg';
const WIKT_CRUZAR = 'https://pt.wiktionary.org/wiki/cruzar';
const WIKT_BRACO = 'https://pt.wiktionary.org/wiki/bra%C3%A7o';
const WIKT_CABECA = 'https://pt.wiktionary.org/wiki/cabe%C3%A7a';

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
  return `Cruzou os braços
em cima da cabeça.
O peito abriu.
O crânio pediu abrigo.

Não é o X no peito.
Não é a nuca à vontade.
Não é o choque das mãos no cabelo.
Não é cruzar os dedos.

A cabeça pesou.
O ofício pausa.
O ar entra.
Não é laudo.
É sinal.

Valeu !!!
nesta pausa,
sem fingir que o gesto fecha o dia.`;
}

function poemEn() {
  return `Arms crossed
on top of the head.
The chest opened.
The skull asked for shelter.

It is not the X on the chest.
It is not hands behind the neck at ease.
It is not shock with hands in the hair.
It is not crossing fingers.

The head grew heavy.
The craft pauses.
Air comes in.
It is not a diagnosis.
It is a signal.

Valeu !!!
in this pause,
without pretending the gesture closes the day.`;
}

function poemEs() {
  return `Cruzó los brazos
encima de la cabeza.
El pecho se abrió.
El cráneo pidió abrigo.

No es la X en el pecho.
No es la nuca a gusto.
No es el choque de las manos en el pelo.
No es cruzar los dedos.

La cabeza pesó.
El oficio pausa.
Entra el aire.
No es laudo.
Es señal.

¡Valeu !!!
en esta pausa,
sin fingir que el gesto cierra el día.`;
}

function buildCruzarOsBracosCabecaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const cuca = '/posts/post-inspecao-palavra-cuca.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const alivio = '/posts/post-inspecao-palavra-alivio.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const sinaisRem = '/posts/post-inspecao-palavra-sinais-rem.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';

  const body = `## Escopo

Inspeção da expressão **«[cruzar os braços em cima da cabeça](${self})»** — o **[gesto](${gesto})** que põe os dois [braços](${maos}) a fazer um X **sobre o crânio**, não sobre o peito. Pedido de campo: *cruzar os braços em cima da cabeça* · *sinais*. Grafia de campo *cabçeça* → **cabeça**.

No mapa de **[sinais](${sinais})**, esta ficha é a peça **gesto**, não a peça órgão. [A orelha cola](${orelhaCola}) *cruzar os braços* no X do peito (defesa). O desenho **corta**: aqui o X está **em cima da cabeça**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cruzar](${WIKT_CRUZAR}), [braço](${WIKT_BRACO}), [cabeça](${WIKT_CABECA}). **Ficha ≠ atlas de kinesics, ≠ PNL, ≠ diagnóstico, ≠ ficha de [gesso](${gesso}).** Leitura de ofício (**pausa da cabeça**) é **mapa lexical**, não protocolo clínico. Tom: [respeito](${respeito}) ao corpo que pede descanso; [verdade](${verdade}) do que o gesto **não** prova sozinho.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Âncora | **cruzar os braços em cima da cabeça** |
| Classe | Locução + [gesto](${gesto})-sinal |
| Desenho | Antebraços cruzados **sobre o cimo do crânio**; cotovelos para fora; peito **aberto** |
| Sinal de ofício | **Pausa da cabeça** — o pensamento ou o esforço pesou; o corpo abriga o crânio |
| Tipo BudGanja | Expressão — [sinais](${sinais}) do corpo × [gesto](${gesto}) |
| Não é | Braços cruzados no **peito** · mãos na **nuca** · mãos no cabelo **sem cruzar** · cruzar os **dedos** · [sinais REM](${sinaisRem}) |
| Elo mapa | [sinais](${sinais}) · [sinal](${sinal}) · [gesto](${gesto}) · [mãos](${maos}) · [cuca](${cuca}) |
| Elo pausa | [Ufa!!!](${ufa}) · [alívio](${alivio}) · [nap](${nap}) · [em pé](${emPe}) |
| Fonte | [cruzar](${WIKT_CRUZAR}) · [braço](${WIKT_BRACO}) · [cabeça](${WIKT_CABECA}) |
| Data | ${inspected} |

**Objecto:** o X **no tecto da cabeça**. O peito não se fecha. A [cuca](${cuca}) pede abrigo. O ofício, se houver, **pausa** — não some.

## 2. Três cruzamentos que não são este

| Desenho | Onde está o X | Sinal (ofício) |
|---------|---------------|----------------|
| **Braços cruzados no peito** | Tórax | Fechamento / defesa / frio — **outra sala** |
| **Mãos na nuca** (dedos atrás) | Nuca, cotovelos abertos | À vontade / território — **outra sala** |
| **Mãos na cabeça sem cruzar** | Crânio, palmas | Choque / «não acredito» — primo; **não** é o X |
| **Cruzar os dedos** | Dois dedos | Sorte / espera de amuleto — outro *cruzar* |
| **Cruzar os braços em cima da cabeça** | Cimo do crânio | **Esta ficha** — pausa da cabeça |

**H1:** *cruzar os braços* sozinho puxa o peito. **Em cima da cabeça** é locução completa.  
**H2:** peito aberto + crânio abrigado ≠ peito fechado. O mapa não funde.

## 3. Leitura de campo — pausa da cabeça

Três camadas **convivem**. Não escolher uma como bula.

| Camada | O que o corpo faz | Confiança |
|--------|-------------------|-----------|
| **Esforço / fôlego** | Abre a caixa; ventila; o ar volta | Alta (observação) |
| **Espera [em pé](${emPe})** | Descarrega os ombros; os braços pesam menos no ar | Alta (ofício de fila / pausa) |
| **Cabeça cheia** | A [cuca](${cuca}) pede tecto; o pensamento pesou | Média–alta (leitura de campo; ≠ laudo) |

**H3:** o sinal-mãe é **pausa da cabeça** — [Ufa!!!](${ufa}) visível, sem ser o sopro.  
**H4:** [alívio](${alivio}) pode **seguir**; o gesto **não** garante que o nó desatou.  
**H5:** [nap](${nap}) é o sono curto; este X é **ainda acordado**.

## 4. Parece × é

| Parece | É |
|--------|---|
| «Está fechado» (braços cruzados) | O peito está **aberto**; o fechamento é do **peito**, não deste X |
| Pose de vitória / desespero de estádio | Pode parecer; sem contexto é **ruído** — o lab fica com a pausa |
| Preguiça / recusa de ofício | Pode ser descanso **de pé**; [respeito](${respeito}): não acusar o músculo |
| [Gesso](${gesso}) / braço partido | Lesão = outra ficha; este gesto **pede dois braços livres** |
| [Sinais REM](${sinaisRem}) | Sono / sigla — **não** fundir com sinais do corpo acordado |
| Mensagem completa | [Sinal](${sinal}) mostra; não substitui a boca |

**Anti-armadilha:** ler um gesto como sentença («sempre cansaço», «sempre soberba») = superstição. Nomear o **desenho**, depois o **ofício do dia**.

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## 5. Valeu !!!

O melhor **hoje** é pôr a peça no mapa: **[sinais](${sinais})** ganha o gesto **cruzar os braços em cima da cabeça** = **pausa da cabeça**. [Valeu !!!](${mantra}) · [eu amo a vida](${vida}) — o X no crânio não fecha o dia; pode pedir o ar e o [respeito](${respeito}) da pausa.

## 6. Estado

**Aprovada** — gesto fichado no campo de [sinais](${sinais}); X no peito / nuca / dedos cortados; leitura **pausa da cabeça** sem laudo.

[▶ Expressões](${hub}) · [▶ Sinais](${sinais}) · [▶ Gesto](${gesto}) · [▶ Mãos](${maos}) · [▶ Cuca](${cuca}) · [▶ Ufa!!!](${ufa}) · [▶ Alívio](${alivio}) · [▶ Em pé](${emPe}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia}) · [▶ Hub](${hubAll}) · [▶ Língua](${lingua})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[cruzar os braços em cima da cabeça](${self})”** — arms crossed **on top of the head**, not on the chest. Field: *sinais* (body signals).

> Not kinesics dogma. Not a diagnosis. Not a cast on the arm.

## Object

| Field | Value |
|-------|-------|
| Anchor | **cruzar os braços em cima da cabeça** |
| Craft signal | **head pause** — skull sheltered, chest open |
| Not | arms crossed on the chest (closed) · hands behind the neck (ease) · uncrossed hands on the head (shock) · crossed fingers (luck) |
| Hub | [sinais](${sinais}) · [gesture](${gesto}) |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** a body-signal piece. [Valeu !!!](${mantra}).

[▶ Sayings](${hub}) · [▶ Sinais](${sinais}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[cruzar os braços em cima da cabeça](${self})»** — brazos cruzados **encima de la cabeza**, no en el pecho. Pedido: *sinais*.

> No es dogma de kinesics. No es diagnóstico. No es yeso en el brazo.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **cruzar os braços em cima da cabeça** |
| Señal de oficio | **pausa de la cabeza** — cráneo abrigado, pecho abierto |
| No es | brazos en el pecho (cierre) · manos en la nuca (soltura) · manos en la cabeza sin cruzar (choque) · cruzar los dedos (suerte) |
| Mapa | [sinais](${sinais}) · [gesto](${gesto}) |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** pieza del mapa del cuerpo. [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Sinais](${sinais}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_CRUZAR };
}

function buildCruzarOsBracosCabecaPost() {
  const { body, contentEn, contentEs, wiki } = buildCruzarOsBracosCabecaBodies();
  const seriesOrder = pickOrder('inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca', 31);
  return expressaoPost({
    title: 'Inspeção: cruzar os braços em cima da cabeça — pausa da cabeça',
    titleEn: 'Inspection: arms crossed on top of the head — head pause',
    titleEs: 'Inspección: cruzar los brazos encima de la cabeza — pausa de la cabeza',
    excerpt:
      'Expressões: cruzar os braços em cima da cabeça — sinal de pausa da cabeça; ≠ X no peito; mapa sinais; Valeu !!!',
    excerptEn:
      'Sayings: arms crossed on top of the head — head-pause signal; ≠ chest fold; sinais map; Valeu !!!',
    excerptEs:
      'Dichos: brazos cruzados encima de la cabeza — señal de pausa de la cabeza; ≠ X en el pecho; mapa sinais; ¡Valeu !!!',
    slug: 'inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca',
    date: '2026-08-23T13:25:00.000Z',
    seriesOrder,
    seriesLabel: 'cruzar os braços · cabeça',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCruzarOsBracosCabecaPost,
  buildCruzarOsBracosCabecaBodies,
  poemPt,
  poemEn,
  poemEs
};
