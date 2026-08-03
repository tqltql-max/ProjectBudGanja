'use strict';

/**
 * Inspeção Palavras · insana
 * Eixos: feminino de insano · lat. insanus (in- + sanus) ·
 * intensidade oral BR × cuidado clínico · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildInsanaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/insano';
  const wikiSanus = 'https://en.wiktionary.org/wiki/sanus#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **insana** — forma feminina de **insano**: no português do Brasil, marca o que parece **fora do juízo**, **excessivo** ou, na gíria de intensidade, **absurdo / extremo** («ideia insana», «trabalho insano»). Esta ficha cobre o **objeto** (lat. *insanus* = *in-* + *sanus*), a diferença entre **elogio de intensidade**, **juízo moral** e **discurso clínico**, e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · insano](${wiki}), lat. [*sanus*](${wikiSanus}), série [Palavras](${hub}). **Ficha ≠ diagnóstico, não é psiquiatria nem insulto autorizado.** Tom: Inspetor BudGanja — *insana* na boca viva muitas vezes = **intensidade**; usar a palavra como arma contra pessoas = falha de [respeito](${respeito}) e de [verdade](${verdade}). Sem afiliação clínica.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **insana** (fem.); **insano** (masc.) |
| Classe | Adjectivo (também substantivado em usos vivos) |
| Étimo (trabalho) | lat. *insānus* ← *in-* (negação) + *sānus* («são, sadio, juízo») — confiança: **alta** |
| Família | *insano* · *insanidade* · *são* · *sanidade* · *insensatez* |
| Cognatos / paralelos | esp. *insano* · fr. *insensé* / *fou* (parcial) · ing. *insane* (cuidado: carga clínica/gíria EN) |
| Tipo BudGanja | Palavra — intensidade × juízo × cuidado |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}) · [gesto](${gesto}) |
| Elo afectivo | [emoção](${emocao}) · [medo](${medo}) · [raiva](${raiva}) |
| Elo léxico | [caminho](${caminho}) · [língua portuguesa](${lingua}) · escala ([legal](${legal}) · [incrível](${incrivel}) · [fantástico](${fantastico})) |
| Elo projecto | [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · insano](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o adjectivo que diz «**não-são**» — seja no juízo antigo (loucura / falta de domínio), seja no uso figurado (**excessivo**, cansativo, extremo). No lab BR oral: muitas vezes hiperboliza esforço ou ideia, sem pretender laudo.

## 2. Insana × são × intensidade × clínica

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **são / sã** | Juízo / saúde (antónimo clássico) | Polo positivo do étimo |
| **insana** | Negação de *são* + usos vivos | Pode ser insulto, metáfora ou «uau extremo» |
| **Intensidade BR** | «Trabalho insano», «ideia insana» | Hiperbole — ≠ diagnóstico |
| **Clínica** | Transtorno / cuidado em saúde mental | **Outro registo** — esta ficha não o cobre |
| **Escala lab** | [incrível](${incrivel}) · [fantástico](${fantastico}) · [legal](${legal}) | Elogio sem estigma de «loucura» |

**H1:** *insana* < *in-* + *sanus* — «não são» (alta confiança).  
**H2:** no BR vivo, o eixo dominante em muitos contextos é **intensidade / excesso**.  
**H3:** chamar pessoa de *insana* como desprezo = falha de ofício; nomear **ideia** ou **carga** como «insana» = hipérbole inspecionável.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Juízo / comportamento** | Fora do domínio pleno dos actos (entrada de dicionário) | Alta (léxico) |
| **Figurado** | Excessivo, cansativo («trabalho insano») | Alta (uso vivo) |
| **Gíria de intensidade** | Ideia ousada / absurda / «braba» | Alta (BR oral) |
| **Insulto** | Estigmatizar o outro | Alta (armadilha) |
| **Ofício lab** | Preferir precisão: *difícil*, *arriscado*, *criativo*, *exagerado* | Média–alta |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *insana* |
|-------|----------------------|
| [Verdade](${verdade}) · [respeito](${respeito}) | Nomear sem ferir de graça |
| [Risco](${risco}) · [caminho](${caminho}) | Ideia «insana» pode ser ousada *ou* imprudente |
| [Emoção](${emocao}) · [medo](${medo}) · [raiva](${raiva}) | Onde a palavra explode na boca |
| [Gesto](${gesto}) | Acto concreto > rótulo |
| [Incrível](${incrivel}) · [fantástico](${fantastico}) · [legal](${legal}) | Escala de intensidade sem estigma |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Ideia insana»** | Ousada / absurda | Pedir [verdade](${verdade}): genial ou [risco](${risco})? |
| **«Trabalho insano»** | Muito pesado | Excesso — inspecionar descanso e [gesto](${gesto}) |
| **«Ela é insana»** | Juízo sobre pessoa | Armadilha de respeito; preferir actos |
| **Inglês *insane*** | Gíria + clínica | Não importar carga clínica à toa |
| **Ofício lab** | Intensidade no projecto | Preferir palavras da escala ([legal](${legal})…) quando for elogio |

**Finalidade-mãe:** nomear **insana** para **separar hipérbole de insulto e de clínica** — intensidade com [verdade](${verdade}), nunca rótulo barato.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **nesta ideia / carga**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Insana = louca = descartável» = falso · «excesso que pede medida» = inspetável |
| Par vivo | [verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **sem usar *insana* como pedra**. Hipérbole de esforço pode passar; desprezo à pessoa não é ofício BudGanja.

## Hipóteses (síntese)

**H1:** objeto = *in-* + *sanus* → insano/insana (alta confiança).  
**H2:** BR oral mistura juízo, excesso e intensidade.  
**H3:** elos = [verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}).  
**H4:** fecho = [Faça o melhor!](${mantra}) — intensidade com medida.

## Limites

- Não é diagnóstico nem manual de saúde mental.  
- Não autoriza insulto.  
- *Insane* (EN) ≠ cópia automática do sentido BR.

## Status

**Aprovado** — **insana** fichada: *in-*+*sanus*, intensidade × cuidado, rede com verdade/respeito e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Verdade](${verdade}) · [▶ Respeito](${respeito}) · [▶ Risco](${risco}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **insana** (feminine of **insano**) — Lat. *insānus* (*in-* + *sānus*). In Brazilian speech often marks **intensity / excess** (“trabalho insano”), not a clinical label. Links [verdade](${verdade}), [respeito](${respeito}), [risco](${risco}), [Do your best!](${mantra}).

> Method note: [Wiktionary · insano](${wiki}). **Not a diagnosis.** Using it as a slur fails respect.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **insana** / **insano** |
| Etymon | Lat. *insānus* — “not sound” — high confidence |
| Lab type | Intensity × judgment × care |
| Links | [verdade](${verdade}) · [respeito](${respeito}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Craft note

Hyperbole about work/ideas can be inspected. Labeling a person to discard them is not BudGanja craft.

## 3. Do your best!

Best possible **on this idea / load**, today — intensity with measure.

## Status

**Approved** — object · intensity vs slur · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Verdade](${verdade}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **insana** (femenino de **insano**) — lat. *insānus* (*in-* + *sānus*). En el habla BR a menudo marca **intensidad / exceso**, no un diagnóstico. Vínculos [verdade](${verdade}), [respeito](${respeito}), [risco](${risco}), [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · insano](${wiki}). **No es diagnóstico.** Usarla como insulto falla el respeto.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **insana** / **insano** |
| Étimo | lat. *insānus* |
| Tipo lab | Intensidad × juicio × cuidado |
| Vínculos | [verdade](${verdade}) · [respeito](${respeito}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Oficio

Hipérbole de trabajo/idea: inspeccionable. Etiqueta a la persona para descartarla: no es oficio.

## 3. ¡Haz lo mejor!

Lo mejor posible **en esta idea / carga**, hoy.

## Estado

**Aprobada** — objeto · intensidad × cuidado · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Verdade](${verdade}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildInsanaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildInsanaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 96;
  return makePalavra({
    title: 'Inspeção: Insana — intensidade, juízo e cuidado',
    titleEn: 'Inspection: Insana — intensity, judgment and care',
    titleEs: 'Inspección: Insana — intensidad, juicio y cuidado',
    excerpt:
      'Palavras: «insana» (lat. *insanus* = *in-* + *sanus*) — excesso/intensidade BR; ≠ diagnóstico; Faça o melhor!',
    excerptEn:
      'Words: “insana” (Lat. *insanus* = *in-* + *sanus*) — BR intensity/excess; ≠ diagnosis; Do your best!',
    excerptEs:
      'Palabras: «insana» (lat. *insanus* = *in-* + *sanus*) — intensidad/exceso BR; ≠ diagnóstico; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-insana',
    date: '2026-08-03T18:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Insana · palavra',
    coverImage: '/imagens/inspecoes/insana-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInsanaPost,
  buildInsanaBodies
};
