'use strict';

/**
 * Inspeção Palavras · interruptor (+ derivações)
 * Eixos: objeto (lat. interrumpere) · ligar/desligar · interrupção ·
 * sinal / eletrizante / gesto · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildInterruptorBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const ligarDesligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const wiki = 'https://pt.wiktionary.org/wiki/interruptor';
  const wikiInterromper = 'https://pt.wiktionary.org/wiki/interromper';
  const wikiLat = 'https://en.wiktionary.org/wiki/interrumpere';

  const body = `## Escopo

Inspeção editorial da palavra **interruptor** — no português do Brasil, o **dispositivo que [liga e desliga](${ligarDesligar})** e, por extensão viva, o **agente ou ponto que corta / retoma um fluxo**. Esta ficha cobre o **objeto** (latim *interrumpere* → *interruptiō* → *interruptor*), as **derivações** (*interromper*, *interrupção*, *interrompido*…), a rede com [sinal](${sinal}), [eletrizante](${eletrizante}), [gesto](${gesto}), [pular](${pular}), o par verbal [ligar × desligar](${ligarDesligar}) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · interruptor](${wiki}), [interromper](${wikiInterromper}), [interrumpere (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ manual eléctrico nem protocolo de segurança.** Tom: Inspetor BudGanja — interruptor como palavra **vivida**: mão no [gesto](${gesto}) que corta ou acende.

**Gatilho tipográfico:** *Imtupidor* → **interruptor**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **interruptor** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Latim *interrumpere* («romper no meio») ← *inter-* + *rumpere* («romper») → *interruptiō* → FR/PT *interruptor* — confiança: **alta** |
| Família (derivações) | *interromper* · *interrupção* · *interrompido* · *interrompendo* · *ininterrupto* · *interruptível* (técnico) |
| Cognatos | esp. *interruptor* · fr. *interrupteur* · it. *interruttore* · ing. *switch* / *interrupter* · lat. *interrumpere* |
| Tipo BudGanja | Palavra — [ligar/desligar](${ligarDesligar}) × corte de fluxo × [gesto](${gesto}) com ofício |
| Elo circuito | [sinal](${sinal}) · [eletrizante](${eletrizante}) · [fogo](${fogo}) |
| Elo ofício | [gesto](${gesto}) · [pular](${pular}) · [caminho](${caminho}) · [já](${ja}) · [verdade](${verdade}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) / [Diário](${diario}) |
| Fonte | [Wikcionário · interruptor](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **peça que abre ou fecha o circuito** («apaga o interruptor», «interruptor da luz») e, por metáfora lab, o **ponto de corte/retoma** de uma tarefa, conversa ou fluxo. No BudGanja: poder de [gesto](${gesto}) — quem mexe no interruptor responde pela [verdade](${verdade}) do corte.

## 2. Derivações — família lexical

| Forma | Classe | Leitura no BR | No BudGanja |
|-------|--------|---------------|-------------|
| **interruptor** | subst. | Dispositivo liga/desliga; quem interrompe | Objecto-mãe desta ficha |
| **interromper** | verbo | Cortar no meio; parar temporariamente | Acto do corte |
| **interrupção** | subst. | O corte; a pausa forçada | Evento nomeado |
| **interrompido** | adj./particípio | Que foi cortado | Estado após o corte |
| **ininterrupto** | adj. | Sem corte | Fluxo contínuo — raro e precioso no ofício |
| **«bater no interruptor»** | uso vivo | [Ligar/desligar](${ligarDesligar}) a luz | [Gesto](${gesto}) mínimo com efeito grande |

**H1:** núcleo = *interrumpere* → interruptor / interrupção (romance; alta confiança).  
**H2:** no BR doméstico, *interruptor* é quase sempre a **peça da parede**; o sentido «pessoa que interrompe» existe mas é secundário.  
**H3:** derivações escalam o mesmo ofício: dispositivo × acto × evento × estado.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Peça eléctrica** | Liga/desliga luz, aparelho | Alta |
| **Corte de fluxo** | Interromper conversa, vídeo, tarefa | Alta |
| **Ponto de controlo** | Quem tem a mão no interruptor decide o circuito | Alta–média |
| **Pausa com volta** | Interromper ≠ apagar para sempre | Alta |
| **Risco de abuso** | Cortar o outro sem [verdade](${verdade}) / sem ouvir | Alta (armadilha) |
| **Ofício lab** | Saber *quando* cortar e *quando* deixar fluir | Média–alta |

## 4. Interruptor × sinal × pular × já

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[sinal](${sinal})** | Indica / avisa | Sinal informa; interruptor **age** no circuito |
| **[eletrizante](${eletrizante})** | Carga / excitação | Energia que o interruptor pode soltar ou cortar |
| **[pular](${pular})** | Saltar / omitir | Pular *por cima*; interruptor *corta no meio* |
| **[já](${ja})** | Agora | Pode pedir o clique — ou apressar o corte cego |
| **[gesto](${gesto})** | Acto mínimo | O dedo no interruptor *é* o gesto |
| **[ligar × desligar](${ligarDesligar})** | Verbos do circuito | Interruptor = peça; ligar/desligar = acção |

**Anti-armadilha:** «interromper sempre» = ruído. «Nunca interromper» = circuito sem segurança. Ofício = clique com [verdade](${verdade}).

## 5. Relação com ligar × desligar e luz

| Papel | Ficha | Leitura |
|-------|-------|---------|
| **Peça / substantivo** | **Interruptor** (esta ficha) | Dispositivo e ponto de corte/retoma |
| **Acção / verbos** | [Ligar × Desligar](${ligarDesligar}) | Acender, apagar, conectar, cortar |
| **Efeito** | [Luz](${luz}) | Claridade que aparece (ou some) após o clique |
| **Derivações** | *interromper* · *interrupção*… | Corte no meio — família desta ficha |
| **Tríade lab** | As três juntas | Peça × verbo × efeito |

**Tese:** [ligar × desligar](${ligarDesligar}) = verbos; [luz](${luz}) = efeito; aqui fica o **objecto** e as derivações de *interrompere*.

## 6. Rede (só fichas existentes)

| Ficha | Relação com *interruptor* |
|-------|---------------------------|
| [Sinal](${sinal}) | Aviso antes / depois do clique |
| [Eletrizante](${eletrizante}) · [Fogo](${fogo}) | Energia e risco do circuito vivo |
| [Gesto](${gesto}) | Mão que liga ou corta |
| [Ligar × Desligar](${ligarDesligar}) | Verbos do circuito — acção do clique |
| [Luz](${luz}) | Efeito — claridade após ligar |
| [Pular](${pular}) | Omissão à frente × corte no meio |
| [Caminho](${caminho}) · [Já](${ja}) | Onde e quando o clique aterra |
| [Verdade](${verdade}) | Nomear *porquê* se corta ou se acende |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 7. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Casa / luz** | «Cadê o interruptor?» | Objecto concreto |
| **Corte de fala** | «Não me interrompe» | Limite afectivo — inspecionar o tom |
| **Pausa de tarefa** | Interromper para descansar / pivô | Pode ser cuidado no [caminho](${caminho}) |
| **Segurança** | Desligar antes de mexer | Metáfora: cortar risco antes do [gesto](${gesto}) perigoso |
| **Ofício lab** | Pausar ficha, vídeo, build | Clique consciente ≠ fuga |

**Finalidade-mãe:** nomear o **interruptor** (e derivações) para **escolher o clique** — acender, cortar ou pausar com ofício.

## 8. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, inclusive o clique que pausa |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Cortar por impulso sem [verdade](${verdade}) = falso poder · clicar com método = segurança do circuito |
| Par circuito | [sinal](${sinal}) · [eletrizante](${eletrizante}) · [fogo](${fogo}) · [gesto](${gesto}) |
| Par movimento | [pular](${pular}) · [caminho](${caminho}) · [já](${ja}) |

**Veredicto:** Valeu !!! **com a mão no interruptor**. Clique sem [verdade](${verdade}) = curto-circuito social; clique com método = luz (ou pausa) no [caminho](${caminho}).

## Hipóteses (síntese)

**H1:** objeto = *interrumpere* → interruptor / interrupção (alta confiança).  
**H2:** peça doméstica e corte de fluxo são a mesma família semântica.  
**H3:** elos = [sinal](${sinal}) · [gesto](${gesto}) · [eletrizante](${eletrizante}) · [pular](${pular}).  
**H4:** fecho = [Valeu !!!](${mantra}) — clicar com consciência.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Sinal](${sinal}) · [Eletrizante](${eletrizante}) · [Fogo](${fogo}) | Circuito e energia |
| [Gesto](${gesto}) · [Pular](${pular}) · [Caminho](${caminho}) | Mão, atalho, percurso |
| [Verdade](${verdade}) · [Já](${ja}) | Porquê e quando do clique |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é manual de electricidade nem norma NR.  
- Interromper pessoa ≠ desligar lâmpada — o afecto pesa.  
- Pause com ofício ≠ abandono do [caminho](${caminho}).

## Status

**Aprovado** — **interruptor** fichado com derivações (*interromper*, *interrupção*…), [ligar/desligar](${ligarDesligar}) × corte de fluxo e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ Luz](${luz}) · [▶ Sinal](${sinal}) · [▶ Gesto](${gesto}) · [▶ Eletrizante](${eletrizante}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **interruptor** (switch / interrupter) — the device that [turns on/off](${ligarDesligar}) and, by lived extension, the point that **cuts or resumes a flow**. Covers **object** (Lat. *interrumpere*), **derivatives** (*interromper*, *interrupção*…), links to [ligar × desligar](${ligarDesligar}), [sinal](${sinal}), [gesto](${gesto}), [eletrizante](${eletrizante}), [pular](${pular}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · interruptor](${wiki}), [interromper](${wikiInterromper}), [interrumpere](${wikiLat}). Not an electrical manual. Warm lab tone.

Typo trigger: *Imtupidor* → **interruptor**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **interruptor** |
| Etymon | Lat. *interrumpere* (*inter-* + *rumpere*) → *interruptiō* → PT *interruptor* — high confidence |
| Derivatives | *interromper* · *interrupção* · *interrompido* · *ininterrupto* |
| Lab type | On/off × flow cut × [gesto](${gesto}) with craft |
| Links | [sinal](${sinal}) · [gesto](${gesto}) · [eletrizante](${eletrizante}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Device vs interruption

Domestic BR: wall switch. Extended: cut a talk, task, or stream — pause with possible return, not always erase.

## 3. vs sinal / pular / já

**sinal** informs. **interruptor** acts on the circuit. **pular** skips over. **interruptor** cuts in the middle. **já** may rush the click.

## 4. Valeu !!!

Best possible **today** — including the click that pauses. Click without [verdade](${verdade}) = social short-circuit; click with method = light (or pause) on the [path](${caminho}).

## Status

**Approved** — object · derivatives · [ligar × desligar](${ligarDesligar}) × cut · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ Luz](${luz}) · [▶ Sinal](${sinal}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **interruptor** — el dispositivo que [enciende/apaga](${ligarDesligar}) y, por extensión vivida, el punto que **corta o retoma un flujo**. Cubre **objeto** (lat. *interrumpere*), **derivaciones** (*interromper*, *interrupção*…), vínculos con [ligar × desligar](${ligarDesligar}), [sinal](${sinal}), [gesto](${gesto}), [eletrizante](${eletrizante}), [pular](${pular}) y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · interruptor](${wiki}), [interromper](${wikiInterromper}), [interrumpere](${wikiLat}). No es manual eléctrico.

Gatillo tipográfico: *Imtupidor* → **interruptor**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **interruptor** |
| Étimo | Lat. *interrumpere* → *interruptiō* → PT *interruptor* |
| Derivaciones | *interromper* · *interrupção* · *interrompido* · *ininterrupto* |
| Tipo lab | Encender/apagar × corte de flujo × [gesto](${gesto}) |
| Vínculos | [sinal](${sinal}) · [gesto](${gesto}) · [eletrizante](${eletrizante}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Dispositivo × interrupción

BR doméstico: interruptor de la pared. Extendido: cortar habla, tarea o flujo — pausa con posible vuelta.

## 3. vs sinal / pular / já

**sinal** informa. **interruptor** actúa. **pular** omite por encima. **interruptor** corta en medio.

## 4. ¡Valeu !!!

Lo mejor posible **hoy** — incluso el clic que pausa. Clic sin [verdad](${verdade}) = cortocircuito social; con método = luz (o pausa) en el [camino](${caminho}).

## Estado

**Aprobada** — objeto · derivaciones · on/off × corte · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ Luz](${luz}) · [▶ Sinal](${sinal}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildInterruptorPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildInterruptorBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 86;
  return makePalavra({
    title: 'Inspeção: Interruptor — ligar, cortar e derivações',
    titleEn: 'Inspection: Interruptor — switch, cut and derivatives',
    titleEs: 'Inspección: Interruptor — encender, cortar y derivaciones',
    excerpt:
      'Palavras: «interruptor» (lat. *interrumpere*) — peça do circuito; tríade com ligar × desligar e luz; Valeu !!!',
    excerptEn:
      'Words: “interruptor” (Lat. *interrumpere*) — circuit device; triad with ligar × desligar and luz; Valeu !!!',
    excerptEs:
      'Palabras: «interruptor» (lat. *interrumpere*) — pieza del circuito; tríada con ligar × desligar y luz; ¡Valeu !!!',
    slug: 'inspecao-palavra-interruptor',
    date: '2026-08-03T15:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Interruptor · ligar · luz',
    coverImage: '/imagens/inspecoes/interruptor-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInterruptorPost,
  buildInterruptorBodies
};
