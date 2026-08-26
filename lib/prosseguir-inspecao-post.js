'use strict';

/**
 * Inspeção Palavras · prosseguir (+ derivações)
 * Eixos: objeto (lat. prosequi) · continuar · sempre × já ·
 * caminho · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildProsseguirBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/prosseguir';
  const wikiLat = 'https://en.wiktionary.org/wiki/prosequor';

  const body = `## Escopo

Inspeção editorial da palavra **prosseguir** — verbo do português do Brasil que nomeia **continuar adiante** depois de uma pausa, um corte ou um começo. Esta ficha cobre o **objeto** (latim *prōsequī* / *prosequor*), as **derivações** (*prosseguimento*, *prosseguido*…), o par com [sempre](${sempre}) e [já](${ja}), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · prosseguir](${wiki}), [prosequor (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ ordem de nunca parar.** Tom: Inspetor BudGanja — prosseguir como ofício vivo: um [gesto](${gesto}) a mais no [caminho](${caminho}).

**Gatilho tipográfico:** *Proceguir* → **prosseguir**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **prosseguir** |
| Classe | Verbo |
| Étimo (trabalho) | Latim *prōsequī* / *prosequor* («seguir adiante, acompanhar») ← *pro-* + *sequī* («seguir») → PT *prosseguir* — confiança: **alta** |
| Família (derivações) | *prosseguimento* · *prosseguido* · *prosseguindo* · *prosseguível* (raro) |
| Cognatos / paralelos | esp. *proseguir* · it. *proseguire* · fr. *poursuivre* / *poursuivre* (parcial) · ing. *proceed* / *continue* · lat. *prōsequī* |
| Tipo BudGanja | Palavra — continuar × retomar × ofício depois da pausa |
| Elo tempo | [sempre](${sempre}) · [já](${ja}) · [passar](${passar}) |
| Elo movimento | [caminho](${caminho}) · [pular](${pular}) · [interruptor](${interruptor}) · [gesto](${gesto}) |
| Elo ânimo | [esperança](${esperanca}) · [inspiração](${inspiracao}) · [verdade](${verdade}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) / [Diário](${diario}) |
| Fonte | [Wikcionário · prosseguir](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o verbo que nomeia **seguir em frente** («vamos prosseguir», «prosseguir o trabalho», «prosseguir a viagem»). No laboratório: não é corrida cega — é retomar o [caminho](${caminho}) com [verdade](${verdade}) depois do [interruptor](${interruptor}) ou do cansaço.

## 2. Derivações — família lexical

| Forma | Classe | Leitura no BR | No BudGanja |
|-------|--------|---------------|-------------|
| **prosseguir** | verbo | Continuar; retomar; ir adiante | Objecto-mãe desta ficha |
| **prosseguimento** | subst. | Continuação; andamento | Nome do fluxo |
| **prosseguido** | adj./particípio | Que foi continuado | Estado após retomar |
| **«pode prosseguir»** | fórmula | Autorização a continuar | Formal / clínico / administrativo — e lab |
| **continuar** | quase-sinónimo | Seguir | Mais quotidiano; *prosseguir* soa um grau mais deliberado |

**H1:** objeto = *prōsequī* → *prosseguir* (romance; alta confiança).  
**H2:** no BR, *prosseguir* carrega tom de **retoma deliberada** — não só «seguir».  
**H3:** prosseguir sem [gesto](${gesto}) = frase; com método = ofício no [caminho](${caminho}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Continuar** | Não parar o que já começou | Alta |
| **Retomar** | Voltar depois da pausa / corte | Alta (uso vivo) |
| **Avançar no processo** | Prosseguir a análise, a viagem, a ficha | Alta |
| **Autorização** | «Pode prosseguir» | Alta–média (registos formais) |
| **Risco de fuga** | Prosseguir para não sentir / não inspecionar | Alta (armadilha) |
| **Ofício lab** | Um passo a mais no [diário](${diario}) / cultivo / texto | Média–alta |

## 4. Prosseguir × sempre × já × pular × interruptor

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[sempre](${sempre})** | Duração / hábito | Chão temporal; prosseguir é o **movimento** sobre esse chão |
| **[já](${ja})** | Agora | Pode disparar o próximo passo |
| **[pular](${pular})** | Omitir / saltar | Atalho; prosseguir *atravessa* em vez de saltar |
| **[interruptor](${interruptor})** | Cortar / pausar | O corte; prosseguir é o clique de **retoma** |
| **[passar](${passar})** | Atravessar / deixar ir | Passar *por*; prosseguir *com* |

**Anti-armadilha:** «prosseguir a qualquer custo» = burn-out disfarçado. Prosseguir *depois* de inspecionar = ofício.

## 5. Rede (só fichas existentes)

| Ficha | Relação com *prosseguir* |
|-------|--------------------------|
| [Sempre](${sempre}) | Constância que pode alimentar a continuação |
| [Já](${ja}) · [passar](${passar}) | Tempo do próximo passo |
| [Caminho](${caminho}) · [gesto](${gesto}) | Onde e como se continua |
| [Pular](${pular}) · [interruptor](${interruptor}) | Alternativas ao prosseguir — omitir ou cortar |
| [Esperança](${esperanca}) · [inspiração](${inspiracao}) | Ânimo para o próximo passo |
| [Verdade](${verdade}) | Inspecionar *se* e *como* continuar |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 6. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Retomar tarefa** | «Vamos prosseguir» | Um [gesto](${gesto}) a mais |
| **Formal / clínico** | «Pode prosseguir» | Autorização — sem virar pressão |
| **Viagem / processo** | Prosseguir a rota / a análise | Elo [caminho](${caminho}) |
| **Depois do corte** | Pós-[interruptor](${interruptor}) / pausa | Retoma com [verdade](${verdade}) |
| **Ofício lab** | Continuar ficha, cultivo, [diário](${diario}) | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear o **prosseguir** para **continuar com ofício** — passo deliberado, não fuga para a frente.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, no próximo passo |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Prosseguir sem [verdade](${verdade}) = fuga · pausar e retomar = método |
| Par tempo | [sempre](${sempre}) · [já](${ja}) · [passar](${passar}) |
| Par movimento | [caminho](${caminho}) · [gesto](${gesto}) · [interruptor](${interruptor}) · [pular](${pular}) |

**Veredicto:** Valeu !!! **e prossiga**. Prosseguir sem [caminho](${caminho}) = corrida; prosseguir com método = continuação que respeita a pausa.

## Hipóteses (síntese)

**H1:** objeto = *prōsequī* → *prosseguir* (alta confiança).  
**H2:** continuar × retomar deliberada — tom BR.  
**H3:** elos = [sempre](${sempre}) · [já](${ja}) · [caminho](${caminho}) · [gesto](${gesto}).  
**H4:** fecho = [Valeu !!!](${mantra}) — próximo passo vivo.

## Limites

- Não é ordem de nunca descansar.  
- Prosseguir ≠ [pular](${pular}) o difícil sem nomear.  
- Autorização formal («pode prosseguir») ≠ pressão afectiva.

## Status

**Aprovado** — **prosseguir** fichado com derivações, retoma deliberada, rede tempo/movimento e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sempre](${sempre}) · [▶ Já](${ja}) · [▶ Caminho](${caminho}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **prosseguir** (to proceed / continue) — deliberate continuation after a pause, cut, or start. Covers **object** (Lat. *prōsequī*), **derivatives** (*prosseguimento*…), pair with [sempre](${sempre}) and [já](${ja}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · prosseguir](${wiki}), [prosequor](${wikiLat}). Not an order to never stop. Warm lab tone.

Typo trigger: *Proceguir* → **prosseguir**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **prosseguir** |
| Etymon | Lat. *prōsequī* (*pro-* + *sequī*) → PT *prosseguir* — high confidence |
| Derivatives | *prosseguimento* · *prosseguido* · *prosseguindo* |
| Lab type | Continue × resume × craft after pause |
| Links | [sempre](${sempre}) · [já](${ja}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. proceed × always × already × skip × switch

**sempre** = duration. **já** = now. **pular** = skip over. **interruptor** = cut. **prosseguir** = resume through the path.

## 3. Valeu !!!

Best possible **today**, in the next step. Proceed without [verdade](${verdade}) = escape forward; pause and resume = method.

## Status

**Approved** — object · derivatives · deliberate resume · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Sempre](${sempre}) · [▶ Já](${ja}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **prosseguir** (proseguir / continuar) — continuación deliberada después de pausa, corte o comienzo. Cubre **objeto** (lat. *prōsequī*), **derivaciones** (*prosseguimento*…), par con [sempre](${sempre}) y [já](${ja}), y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · prosseguir](${wiki}), [prosequor](${wikiLat}). No es orden de nunca parar.

Gatillo tipográfico: *Proceguir* → **prosseguir**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **prosseguir** |
| Étimo | Lat. *prōsequī* → PT *prosseguir* |
| Derivaciones | *prosseguimento* · *prosseguido* |
| Tipo lab | Continuar × retomar × oficio después de la pausa |
| Vínculos | [sempre](${sempre}) · [já](${ja}) · [caminho](${caminho}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. proseguir × siempre × ya

**sempre** = duración. **já** = ahora. **prosseguir** = retomar el [camino](${caminho}).

## 3. ¡Valeu !!!

Lo mejor posible **hoy**, en el próximo paso. Proseguir sin [verdad](${verdade}) = huida hacia adelante; pausar y retomar = método.

## Estado

**Aprobada** — objeto · derivaciones · retoma deliberada · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Sempre](${sempre}) · [▶ Já](${ja}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildProsseguirPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildProsseguirBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 88;
  return makePalavra({
    title: 'Inspeção: Prosseguir — continuar, retomar e Valeu !!!',
    titleEn: 'Inspection: Prosseguir — continue, resume and Valeu !!!',
    titleEs: 'Inspección: Prosseguir — continuar, retomar y ¡Valeu !!!',
    excerpt:
      'Palavras: «prosseguir» (lat. *prōsequī*) — continuar × retomar BR; derivações prosseguimento; elos sempre, já, caminho; Valeu !!!',
    excerptEn:
      'Words: “prosseguir” (Lat. *prōsequī*) — continue × resume in BR; derivatives prosseguimento; links sempre, já, caminho; Valeu !!!',
    excerptEs:
      'Palabras: «prosseguir» (lat. *prōsequī*) — continuar × retomar BR; derivaciones prosseguimento; vínculos sempre, já, caminho; ¡Valeu !!!',
    slug: 'inspecao-palavra-prosseguir',
    date: '2026-08-03T15:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Prosseguir · palavra',
    coverImage: '/imagens/inspecoes/prosseguir-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildProsseguirPost,
  buildProsseguirBodies
};
