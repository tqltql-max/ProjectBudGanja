'use strict';

/**
 * Inspeção Palavras · ligar × desligar
 * Eixos: lat. ligāre / des- + ligar · circuito · telefone · vínculo ·
 * interruptor (objeto) × verbos (gesto) · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildLigarDesligarBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiLigar = 'https://pt.wiktionary.org/wiki/ligar';
  const wikiDesligar = 'https://pt.wiktionary.org/wiki/desligar';
  const wikiLat = 'https://en.wiktionary.org/wiki/ligare#Latin';

  const body = `## Escopo

Inspeção editorial do par **ligar** × **desligar** — os **verbos do circuito** no português do Brasil. O [interruptor](${interruptor}) é o **objeto**; ligar/desligar é o **gesto** (e, por extensão viva, o acto de **conectar ou cortar** um fluxo: luz, aparelho, conversa, vínculo). Esta ficha cobre o **étimo** (lat. *ligāre*; *des-* + *ligar*), as **camadas BR**, a rede com [sinal](${sinal}), [gesto](${gesto}), [eletrizante](${eletrizante}), [caminho](${caminho}) e [verdade](${verdade}), e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ligar](${wikiLigar}), [desligar](${wikiDesligar}), [ligāre (EN)](${wikiLat}), ficha [interruptor](${interruptor}), série [Palavras](${hub}). **Ficha ≠ manual eléctrico.** Tom: Inspetor BudGanja — o clique é [gesto](${gesto}) com ofício.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Par | **ligar** × **desligar** |
| Classe | Verbos (também: *ligado*, *desligado*, *ligação*) |
| Étimo (trabalho) | Lat. *ligāre* («atar, unir») → PT *ligar*; *des-* + *ligar* → *desligar* — confiança: **alta** |
| Cognatos | esp. *ligar* / *desligar* · fr. *lier* / *délier* · it. *legare* · ing. *on* / *off* (circuito) · lat. *ligāre* |
| Tipo BudGanja | Palavra — acção do circuito × vínculo × corte |
| Elo objeto | [interruptor](${interruptor}) — quem recebe a mão |
| Elo vivo | [gesto](${gesto}) · [sinal](${sinal}) · [eletrizante](${eletrizante}) |
| Elo ofício | [verdade](${verdade}) · [caminho](${caminho}) · [risco](${risco}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [ligar](${wikiLigar}) · [desligar](${wikiDesligar}) |
| Data | ${inspected} |

**O que é o objeto:** o par de verbos que **abre ou fecha** um circuito (e, no mapa lab, um fluxo de atenção, conversa ou tarefa). *Ligar* une; *desligar* solta. Sem o par, o [interruptor](${interruptor}) fica só peça muda na parede.

## 2. Família — formas vivas

| Forma | Ofício | Nota |
|-------|--------|------|
| **ligar** | Acender / conectar / telefonar / unir | Polissemia BR rica |
| **desligar** | Apagar / cortar / sair do fluxo | Prefixo *des-* = reverso |
| **ligado / desligado** | Estado após o gesto | «Estou desligado» ≠ só aparelho |
| **ligação** | Vínculo / chamada / conexão | Elo afectivo e técnico |
| **«ligar para»** | Telefonar / contactar | Uso BR dominante oral |
| **«desligar de»** | Cortar atenção / vínculo | Metáfora social viva |

**H1:** *ligar* < lat. *ligāre* — «atar» (alta confiança).  
**H2:** *desligar* = *des-* + *ligar* — reverso do atar.  
**H3:** no BudGanja, o par = **gesto do circuito**; o [interruptor](${interruptor}) = **ponto onde o gesto pousa**.

## 3. Sentidos — camadas

| Camada | Ligar | Desligar | Confiança |
|--------|-------|----------|-----------|
| **Circuito / luz** | Acender | Apagar | Alta |
| **Aparelho** | Ligar o rádio | Desligar o PC | Alta |
| **Telefone** | Ligar para alguém | Desligar a chamada | Alta (BR) |
| **Vínculo** | Ligar-se a | Desligar-se de | Alta–média |
| **Atenção** | Ficar ligado | Desligar da conversa | Média–alta |
| **Ofício lab** | Acender com [verdade](${verdade}) | Cortar [risco](${risco}) a tempo | Lab |

## 4. Distinções úteis

| Par | Diferença |
|-----|-----------|
| **ligar/desligar** vs **[interruptor](${interruptor})** | Verbos (gesto) × substantivo (peça) |
| **desligar** vs **[pular](${pular})** | Cortar o fluxo × saltar por cima |
| **desligar** vs **[passar](${passar})** | Cortar × deixar seguir |
| **ligar** vs **[sinal](${sinal})** | Agir no circuito × informar |
| **ligado** vs **[eletrizante](${eletrizante})** | Estado on × carga/hype |

## 5. Rede BudGanja

| Elo | Papel |
|-----|-------|
| [interruptor](${interruptor}) | Objecto-mãe do clique |
| [gesto](${gesto}) | O dedo que liga/desliga |
| [sinal](${sinal}) | Avisa; o verbo **age** |
| [eletrizante](${eletrizante}) | Carga que o ligar pode soltar |
| [verdade](${verdade}) | Clique sem verdade = curto social |
| [caminho](${caminho}) | Luz (ou pausa) no percurso |
| [risco](${risco}) | Desligar antes de mexer |
| [Faça o melhor!](${mantra}) · [poema](${poemMantra}) | Fecho — melhor clique **hoje** |

## 6. Faça o melhor!

| Campo | Valor |
|-------|-------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, inclusive o clique que **desliga** |
| Veredicto | Ligar sem [verdade](${verdade}) = barulho; desligar sem ofício = abandono. Clique com método = luz ou pausa no [caminho](${caminho}). |

**H4:** fecho = [Faça o melhor!](${mantra}) — ligar e desligar com consciência.

## Estado

**Aprovado** — **ligar** × **desligar** fichados como verbos do circuito; elo vivo em [interruptor](${interruptor}), [gesto](${gesto}) e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Interruptor](${interruptor}) · [▶ Gesto](${gesto}) · [▶ Sinal](${sinal}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ligar** × **desligar** — the **verbs of the circuit**. [Interruptor](${interruptor}) is the **object**; ligar/desligar is the **gesture** (and, by lived extension, connecting or cutting a flow: light, device, talk, bond). Links [sinal](${sinal}), [gesto](${gesto}), [eletrizante](${eletrizante}), [caminho](${caminho}), [verdade](${verdade}), and [Do your best!](${mantra}).

> Sources: [ligar](${wikiLigar}), [desligar](${wikiDesligar}), [ligāre](${wikiLat}), [interruptor](${interruptor}). Not an electrical manual.

## Object

| Field | Value |
|-------|-------|
| Pair | **ligar** × **desligar** |
| Etymon | Lat. *ligāre* (“to bind”) → PT *ligar*; *des-* + *ligar* → *desligar* — high confidence |
| Lab type | Word — circuit action × bond × cut |
| Object link | [interruptor](${interruptor}) |
| Date | ${inspected} |

**H1:** *ligar* < *ligāre*. **H2:** *desligar* = reverse. **H3:** verbs = gesture; interruptor = where the gesture lands.

## Layers

On/off light and devices; BR phone (“ligar para”); social bond/attention (“desligar de”). Lab: turn on with [truth](${verdade}); cut [risk](${risco}) in time.

## Do your best!

Best click **today** — including the one that turns **off**. Click without truth = social short-circuit; with method = light or pause on the [path](${caminho}).

## Status

**Approved** — ligar × desligar filed; live links to [interruptor](${interruptor}), [gesto](${gesto}), [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Interruptor](${interruptor}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **ligar** × **desligar** — los **verbos del circuito**. El [interruptor](${interruptor}) es el **objeto**; ligar/desligar es el **gesto** (y, por extensión vivida, conectar o cortar un flujo). Vínculos [sinal](${sinal}), [gesto](${gesto}), [eletrizante](${eletrizante}), [caminho](${caminho}), [verdade](${verdade}) y [¡Haz lo mejor!](${mantra}).

> Fuentes: [ligar](${wikiLigar}), [desligar](${wikiDesligar}), [ligāre](${wikiLat}), [interruptor](${interruptor}). No es manual eléctrico.

## Objeto

| Campo | Valor |
|-------|-------|
| Par | **ligar** × **desligar** |
| Étimo | Lat. *ligāre* → PT *ligar*; *des-* + *ligar* → *desligar* |
| Tipo lab | Palabra — acción del circuito × vínculo × corte |
| Fecha | ${inspected} |

**H1:** *ligar* < *ligāre*. **H2:** *desligar* = reverso. **H3:** verbos = gesto; interruptor = donde aterriza el gesto.

## Capas

Luz/aparatos; teléfono BR («ligar para»); vínculo/atención («desligar de»). Lab: encender con [verdad](${verdade}); cortar [riesgo](${risco}) a tiempo.

## ¡Haz lo mejor!

El mejor clic **hoy** — incluso el que **apaga**. Clic sin verdad = cortocircuito social; con método = luz o pausa en el [camino](${caminho}).

## Estado

**Aprobada** — ligar × desligar fichados; elos [interruptor](${interruptor}), [gesto](${gesto}), [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Interruptor](${interruptor}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wikiLigar };
}

function buildLigarDesligarPost(seriesOrder) {
  const { body, contentEn, contentEs, wikiLigar } = buildLigarDesligarBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 113;
  return makePalavra({
    title: 'Inspeção: Ligar × Desligar — verbos do circuito',
    titleEn: 'Inspection: Ligar × Desligar — verbs of the circuit',
    titleEs: 'Inspección: Ligar × Desligar — verbos del circuito',
    excerpt:
      'Palavras: «ligar» × «desligar» (lat. *ligāre*) — acender/apagar × conectar/cortar; elos interruptor, gesto, sinal; Faça o melhor!',
    excerptEn:
      'Words: “ligar” × “desligar” (Lat. *ligāre*) — on/off × connect/cut; links interruptor, gesto, sinal; Do your best!',
    excerptEs:
      'Palabras: «ligar» × «desligar» (lat. *ligāre*) — encender/apagar × conectar/cortar; vínculos interruptor, gesto, sinal; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-ligar-desligar',
    date: '2026-08-04T17:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Ligar × Desligar · palavra',
    coverImage: '/imagens/inspecoes/ligar-desligar-palavra-cover.jpg',
    sourceUrl: wikiLigar,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLigarDesligarPost,
  buildLigarDesligarBodies
};
