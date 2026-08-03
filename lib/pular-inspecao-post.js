'use strict';

/**
 * Inspeção Palavras · pular (+ derivações)
 * Eixos: objeto (lat. pullāre) · salto × omitir · família lexical ·
 * passar / backspace · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPularBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/pular';
  const wikiPulo = 'https://pt.wiktionary.org/wiki/pulo';
  const wikiLat = 'https://en.wiktionary.org/wiki/pullare';

  const body = `## Escopo

Inspeção editorial da palavra **pular** — verbo do português do Brasil que cobre o **salto físico** e, por extensão viva, o **omitir / avançar sem passar por**. Esta ficha cobre o **objeto** (latim *pullāre*), as **derivações** (*pulo*, *pulinho*, *pulada*…), o contraste útil com [passar](${passar}) e [backspace](${backspace}), e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pular](${wiki}), [pulo](${wikiPulo}), [pullāre (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ protocolo de exercício nem ordem de ignorar o ofício.** Tom: Inspetor BudGanja — pular como palavra **vivida**, com [verdade](${verdade}): às vezes salta-se de [alegria](${alegria}); às vezes salta-se uma etapa — e isso também se inspetora.

**Gatilho tipográfico / lab:** *skip inspecao* / «pular inspeção» → ficha **pular** (e derivações).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **pular** |
| Classe | Verbo |
| Étimo (trabalho) | Latim *pullāre* («saltar / mover-se com pulos»; também associado a pintainhos) → PT *pular* — confiança: **alta–média** |
| Família (derivações) | *pulo* · *pulinho* · *pulada* · *pulão* · *pulador* · *pulável* (raro) · *impulso* (parente remoto via *pellere*/*pulsus* — **não** confundir como derivação directa) |
| Cognatos / paralelos | esp. *saltar* / *brincar* (sentidos) · fr. *sauter* · ing. *jump* / *skip* (paralelo semântico UI) |
| Tipo BudGanja | Palavra — salto × omissão × ofício do [já](${ja}) |
| Elo movimento | [passar](${passar}) · [caminho](${caminho}) · [gesto](${gesto}) · [backspace](${backspace}) |
| Elo afecto | [alegria](${alegria}) · [emoção](${emocao}) · [inspiração](${inspiracao}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) / [Diário](${diario}) |
| Fonte | [Wikcionário · pular](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o verbo que nomeia **deixar o chão por um instante** (salto) e, no BR oral/digital, **não percorrer um trecho** («pular o anúncio», «pular a etapa», «pular a inspeção»). No laboratório: movimento com [gesto](${gesto}) — ou omissão com [verdade](${verdade}) nomeada.

## 2. Derivações — família lexical

| Forma | Classe | Leitura no BR | No BudGanja |
|-------|--------|---------------|-------------|
| **pular** | verbo | Saltar; omitir; «pular fora» | Objecto-mãe desta ficha |
| **pulo** | subst. | O salto; «dar um pulo» (ir rápido) | Unidade do movimento |
| **pulinho** | subst. dim. | Salto pequeno; carinho / leveza | Escala mínima — um [gesto](${gesto}) |
| **pulada** | subst. | Acto de pular; às vezes «fuga» / salto brusco | Evento nomeado |
| **pulão** | subst. aum. | Salto grande / exagero oral | Escala máxima — cuidado com drama |
| **pulador** | adj./subst. | Quem / o que pula | Agente do salto |
| **pular fora** | locução | Sair, desistir, escapar | Limite: pode ser cuidado ou fuga — inspecionar o porquê |
| **pular de alegria** | locução | Explosão afectiva | Elo [alegria](${alegria}) — salto que celebra |
| **pular etapa / pular inspeção** | uso lab/UI | Omitir um passo | Par de *skip*; pede [verdade](${verdade}): porquê se pula? |

**H1:** núcleo = *pullāre* → *pular* (romance; confiança alta–média).  
**H2:** no BR, o sentido **omitir** (skip) é extensão viva do salto — não é outro étimo.  
**H3:** derivações (*pulo* / *pulinho* / *pulada*) escalam o mesmo ofício: tamanho do salto, não outra palavra.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Salto físico** | Corpo deixa o chão | Alta |
| **Ir rápido** | «Dou um pulo lá» = ir e voltar | Alta (uso vivo) |
| **Omitir** | Pular página, anúncio, etapa, inspeção | Alta (BR + UI) |
| **Sair / escapar** | «Pular fora» | Alta–média |
| **Alegria** | «Pular de alegria» | Alta |
| **Risco de fuga** | Pular o difícil sem nomear o porquê | Alta (armadilha) |
| **Ofício lab** | Pular *com consciência* ≠ abandonar o [caminho](${caminho}) | Média–alta |

## 4. Pular × passar × backspace × já

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[passar](${passar})** | Atravessar / deixar ir / acontecer | Passar *por*; pular *por cima* |
| **pular** | Saltar ou omitir | Corta o meio — às vezes certo, às vezes buraco |
| **[backspace](${backspace})** | Apagar o que já veio | Recua; pular avança sem tocar |
| **[já](${ja})** | Agora / conclusão | Pode *autorizar* o pulo («já sei») ou *apressar* demais |

**Anti-armadilha:** «pular inspeção» sem [verdade](${verdade}) = buraco no mapa. «Pular» *depois* de inspecionar o essencial = economia de ofício.

## 5. Rede (só fichas existentes)

| Ficha | Relação com *pular* |
|-------|---------------------|
| [Passar](${passar}) | Irmão de movimento — atravessar × saltar por cima |
| [Backspace](${backspace}) | Inverso temporal — apagar vs omitir à frente |
| [Já](${ja}) | Pressão de agora — pode pedir pulo ou impedir pressa cega |
| [Caminho](${caminho}) · [gesto](${gesto}) | Onde o pulo aterra (ou não) |
| [Verdade](${verdade}) | Nomear *o que* se pula e *porquê* |
| [Alegria](${alegria}) · [emoção](${emocao}) | Pulo celebrativo |
| [Inspiração](${inspiracao}) | Faísca que às vezes faz pular *para* o ofício — não *fora* dele |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 6. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Salto** | Brincar, treino, susto | Corpo no mapa |
| **Visita rápida** | «Dou um pulo» | [Gesto](${gesto}) curto com volta |
| **Omitir mídia/UI** | Skip, «pular intro» | Paralelo *skip* — economia |
| **Omitir etapa** | Atalho de processo | Só com [verdade](${verdade}) do risco |
| **Pular fora** | Desistir / sair | Limite afectivo — inspecionar se é cuidado ou fuga |
| **Pular de alegria** | Celebração | Elo [alegria](${alegria}) |

**Finalidade-mãe:** nomear o **pular** (e derivações) para **escolher o salto** — economia com ofício, não buraco sem mapa.

## 7. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, inclusive quando o melhor é *não* pular |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Pulo tudo difícil» = falso ofício · «pulo o ruído depois de inspecionar» = método |
| Par movimento | [passar](${passar}) · [backspace](${backspace}) · [já](${ja}) · [caminho](${caminho}) |
| Par afectivo | [alegria](${alegria}) · [inspiração](${inspiracao}) |

**Veredicto:** Faça o melhor **com o pulo certo**. Pular sem [verdade](${verdade}) = buraco; pular com método = atalho que ainda respeita o [caminho](${caminho}).

## Hipóteses (síntese)

**H1:** objeto = *pullāre* → *pular* (+ *pulo* / *pulinho* / *pulada*…).  
**H2:** salto físico e «skip» são a mesma família semântica no BR.  
**H3:** elos = [passar](${passar}) · [backspace](${backspace}) · [já](${ja}) · [gesto](${gesto}).  
**H4:** fecho = [Faça o melhor!](${mantra}) — pular com consciência.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Passar](${passar}) · [Backspace](${backspace}) · [Já](${ja}) | Movimento e tempo |
| [Caminho](${caminho}) · [Gesto](${gesto}) · [Verdade](${verdade}) | Aterragem do pulo |
| [Alegria](${alegria}) · [Inspiração](${inspiracao}) | Pulo que celebra / acende |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é ordem para ignorar inspeções, leis ou cuidados.  
- Pular ≠ apagar ([backspace](${backspace})) ≠ atravessar ([passar](${passar})).  
- «Pular fora» sem nomear o afecto pode esconder [verdade](${verdade}).

## Status

**Aprovado** — **pular** fichado com derivações (*pulo*, *pulinho*, *pulada*…), salto × omissão, rede movimento e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Passar](${passar}) · [▶ Backspace](${backspace}) · [▶ Já](${ja}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **pular** (to jump / to skip) — physical leap and, by lived extension, **omitting a step**. Covers **object** (Lat. *pullāre*), **derivatives** (*pulo*, *pulinho*, *pulada*…), contrast with [passar](${passar}) and [backspace](${backspace}), and [Do your best!](${mantra}).

> Method note: [Wiktionary · pular](${wiki}), [pulo](${wikiPulo}), [pullāre](${wikiLat}). Not an order to ignore craft. Warm lab tone.

Lab trigger: *skip inspecao* → sheet **pular**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **pular** |
| Etymon | Lat. *pullāre* → PT *pular* — high–medium confidence |
| Derivatives | *pulo* · *pulinho* · *pulada* · *pulão* · *pulador* · locutions *pular fora*, *pular de alegria*, *pular etapa* |
| Lab type | Jump × skip × craft of [já](${ja}) |
| Links | [passar](${passar}) · [backspace](${backspace}) · [gesto](${gesto}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Jump vs skip

Same family in BR: body leaves the ground · “dar um pulo” (quick visit) · omit a step/UI (*skip*) · “pular fora” (leave) · “pular de alegria”.

## 3. vs passar / backspace / já

**passar** = go through. **pular** = go over / omit. **backspace** = erase what came. **já** = now-pressure that may authorize or rush the skip.

## 4. Do your best!

Best possible **today** — including when the best is *not* to skip. Skip without [verdade](${verdade}) = hole; skip with method = shortcut that still respects the [path](${caminho}).

## Status

**Approved** — object · derivatives · jump×skip · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Passar](${passar}) · [▶ Backspace](${backspace}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **pular** (saltar / omitir) — salto físico y, por extensión vivida, **omitir un paso**. Cubre **objeto** (lat. *pullāre*), **derivaciones** (*pulo*, *pulinho*, *pulada*…), contraste con [passar](${passar}) y [backspace](${backspace}), y [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · pular](${wiki}), [pulo](${wikiPulo}), [pullāre](${wikiLat}). No es orden de ignorar el oficio.

Gatillo lab: *skip inspecao* → ficha **pular**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **pular** |
| Étimo | Lat. *pullāre* → PT *pular* |
| Derivaciones | *pulo* · *pulinho* · *pulada* · *pulão* · *pulador* · locuciones |
| Tipo lab | Salto × omisión × oficio del [já](${ja}) |
| Vínculos | [passar](${passar}) · [backspace](${backspace}) · [gesto](${gesto}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Saltar × omitir

Misma familia en BR: cuerpo · visita rápida · omitir etapa/UI · «pular fora» · «pular de alegria».

## 3. vs passar / backspace / já

**passar** = atravesar. **pular** = saltar por encima / omitir. **backspace** = borrar lo ya venido. **já** = presión del ahora.

## 4. ¡Haz lo mejor!

Lo mejor posible **hoy** — incluso cuando lo mejor es *no* saltar. Saltar sin [verdad](${verdade}) = hueco; con método = atajo que aún respeta el [camino](${caminho}).

## Estado

**Aprobada** — objeto · derivaciones · salto×omisión · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Passar](${passar}) · [▶ Backspace](${backspace}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPularPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPularBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 85;
  return makePalavra({
    title: 'Inspeção: Pular — salto, omissão e derivações',
    titleEn: 'Inspection: Pular — jump, skip and derivatives',
    titleEs: 'Inspección: Pular — salto, omisión y derivaciones',
    excerpt:
      'Palavras: «pular» (lat. *pullāre*) — salto × omitir BR; derivações pulo/pulinho/pulada; elos passar, backspace, já; Faça o melhor!',
    excerptEn:
      'Words: “pular” (Lat. *pullāre*) — jump × skip in BR; derivatives pulo/pulinho/pulada; links passar, backspace, já; Do your best!',
    excerptEs:
      'Palabras: «pular» (lat. *pullāre*) — salto × omitir BR; derivaciones pulo/pulinho/pulada; vínculos passar, backspace, já; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-pular',
    date: '2026-08-03T15:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Pular · palavra',
    coverImage: '/imagens/inspecoes/pular-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPularPost,
  buildPularBodies
};
