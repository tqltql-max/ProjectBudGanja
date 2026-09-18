'use strict';

/**
 * Inspeção Palavras · luz
 * Eixos: lat. lūx · claridade · circuito (efeito do clique) ·
 * cultivo / ofício · interruptor × ligar/desligar · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildLuzBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const cultivo = '/guia/cultivo-basico.html';
  const calculadoras = '/calculadoras/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligarDesligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/luz';
  const wikiLat = 'https://en.wiktionary.org/wiki/lux#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **luz** — **claridade** que se vê, se mede e se nomeia. No mapa do circuito lab, a luz é o **efeito** do clique: o [interruptor](${interruptor}) é a peça; [ligar × desligar](${ligarDesligar}) é o gesto; **luz** é o que acende (ou falta) no quarto, no cultivo e na [verdade](${verdade}). Fonte natural-mãe: o [sol](${sol}). Esta ficha cobre o **étimo** (lat. *lūx*), as **camadas BR**, a tríade com interruptor/ligar-desligar, elos [sol](${sol}), [fogo](${fogo}), [eletrizante](${eletrizante}), [sinal](${sinal}), [cultivo](${cultivo}) e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · luz](${wiki}), [lūx (EN)](${wikiLat}), [interruptor](${interruptor}), [ligar × desligar](${ligarDesligar}), [sol](${sol}), série [Palavras](${hub}). **Ficha ≠ manual de iluminação nem protocolo PPFD.** Tom: Inspetor BudGanja — luz com ofício ≠ glare sem medida.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **luz** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *lūx, lūcis* («luz, claridade») → PT *luz* — confiança: **alta** |
| Família | *luzir* · *luzente* · *luzidia* · *à luz de* · *dar luz* · *luzinha* |
| Cognatos | esp. *luz* · fr. *lumière* · it. *luce* · ing. *light* · lat. *lūx* |
| Tipo BudGanja | Palavra — efeito do circuito × claridade × ofício |
| Elo circuito | [interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) |
| Elo fonte natural | [sol](${sol}) — luz do dia sem clique |
| Elo ciclo | [noite](${noite}) — quando a luz natural rarefaz |
| Elo vivo | [fogo](${fogo}) · [eletrizante](${eletrizante}) · [sinal](${sinal}) · [gesto](${gesto}) |
| Elo ofício | [verdade](${verdade}) · [caminho](${caminho}) · [risco](${risco}) · [cultivo](${cultivo}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) · [calculadoras](${calculadoras}) |
| Fonte | [Wikcionário · luz](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **claridade** — física (lâmpada, sol, painel) e figurada («à luz da verdade», «trazer à luz»). No BudGanja: resultado inspeccionável do clique e da medida.

## 2. Tríade do circuito

| Papel | Ficha | Leitura |
|-------|-------|---------|
| **Peça** | [Interruptor](${interruptor}) | Onde a mão pousa |
| **Verbo** | [Ligar × Desligar](${ligarDesligar}) | O que a mão faz |
| **Efeito** | **Luz** (esta ficha) | O que aparece (ou some) depois do clique |
| **Fonte natural** | [Sol](${sol}) | Astro — luz do dia sem interruptor |

**Tese:** sem luz, o circuito lab fica só clique abstracto; sem interruptor/ligar-desligar, a luz artificial parece milagre; sem [sol](${sol}), falta a matriz do dia. Tríade + fonte.

## 3. Família e camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Física / lâmpada** | Claridade no espaço | Alta |
| **Sol / dia** | Luz natural | Alta |
| **Cultivo** | Intensidade, espectro, fotoperíodo | Alta (mapa BudGanja) |
| **Figurado** | «À luz de», «trazer à luz», «luz no fim» | Alta |
| **Afecto / espírito** | Esperança, clareza, «ver a luz» | Média–alta |
| **Ofício lab** | Clique com [verdade](${verdade}) → luz útil; excesso = [risco](${risco}) | Lab |

**H1:** *luz* < lat. *lūx* — claridade (alta confiança).  
**H2:** no circuito, luz = **efeito** do [ligar](${ligarDesligar}) no [interruptor](${interruptor}).  
**H3:** no cultivo, luz sem medida queima; com ofício, alimenta.

## 4. Distinções úteis

| Par | Diferença |
|-----|-----------|
| **luz** vs **[sol](${sol})** | Claridade (efeito) × astro (fonte natural) |
| **luz** vs **[fogo](${fogo})** | Claridade / brilho × combustão / calor (fogo *também* dá luz) |
| **luz** vs **[eletrizante](${eletrizante})** | Claridade útil × carga/hype |
| **luz** vs **[sinal](${sinal})** | O que ilumina × o que avisa |
| **luz** vs **[ligar × desligar](${ligarDesligar})** | Efeito × verbo |
| **luz** vs **[interruptor](${interruptor})** | Efeito × peça |

## 5. Rede BudGanja

| Elo | Papel |
|-----|-------|
| [Interruptor](${interruptor}) | Peça do clique |
| [Ligar × Desligar](${ligarDesligar}) | Gesto que acende ou apaga |
| [Sol](${sol}) | Fonte natural — luz do dia |
| [Noite](${noite}) | Fase escura — quando a luz artificial ganha ofício |
| [Fogo](${fogo}) | Calor e luz da combustão — medir |
| [Eletrizante](${eletrizante}) | Carga que pode virar luz ou ruído |
| [Sinal](${sinal}) · [Gesto](${gesto}) | Aviso e mão |
| [Cultivo](${cultivo}) · [calculadoras](${calculadoras}) | Luz medida no grow |
| [Verdade](${verdade}) · [caminho](${caminho}) | Clareza com ofício |
| [Faça o melhor!](${mantra}) · [poema](${poemMantra}) | Melhor luz **hoje** — inclusive a que se apaga a tempo |

## 6. Faça o melhor!

| Campo | Valor |
|-------|-------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, inclusive a luz certa (nem glare, nem buraco) |
| Veredicto | Luz sem [verdade](${verdade}) = teatro; luz com medida = ofício no [caminho](${caminho}). |

**H4:** fecho = [Faça o melhor!](${mantra}) — acender e apagar com consciência.

## Estado

**Aprovado** — **luz** fichada como efeito do circuito; tríade com [interruptor](${interruptor}) e [ligar × desligar](${ligarDesligar}); fonte natural [sol](${sol}); elos [fogo](${fogo}), cultivo e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sol](${sol}) · [▶ Noite](${noite}) · [▶ Interruptor](${interruptor}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ Fogo](${fogo}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **luz** (light) — clarity you see, measure and name. In the lab circuit: [interruptor](${interruptor}) = device; [ligar × desligar](${ligarDesligar}) = gesture; **luz** = effect after the click. Links [fogo](${fogo}), [eletrizante](${eletrizante}), [sinal](${sinal}), [cultivo](${cultivo}), [Do your best!](${mantra}).

> Sources: [luz](${wiki}), [lūx](${wikiLat}). Not a lighting manual.

## Circuit triad

| Role | Sheet |
|------|-------|
| Device | [Interruptor](${interruptor}) |
| Verb | [Ligar × Desligar](${ligarDesligar}) |
| Effect | **Luz** (this sheet) |

## Etymon

Lat. *lūx, lūcis* → PT *luz* — high confidence. Grow: light without measure burns; with craft, feeds.

## Do your best!

Best light **today** — including turning it off in time. Light without [truth](${verdade}) = theater; with measure = craft on the [path](${caminho}).

## Status

**Approved** — luz as circuit effect; triad with [interruptor](${interruptor}) and [ligar × desligar](${ligarDesligar}).

[▶ Words](${hub}) · [▶ Interruptor](${interruptor}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **luz** — claridad que se ve, se mide y se nombra. En el circuito lab: [interruptor](${interruptor}) = pieza; [ligar × desligar](${ligarDesligar}) = gesto; **luz** = efecto del clic. Vínculos [fogo](${fogo}), [eletrizante](${eletrizante}), [sinal](${sinal}), [cultivo](${cultivo}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [luz](${wiki}), [lūx](${wikiLat}). No es manual de iluminación.

## Tríada del circuito

| Rol | Ficha |
|-----|-------|
| Pieza | [Interruptor](${interruptor}) |
| Verbo | [Ligar × Desligar](${ligarDesligar}) |
| Efecto | **Luz** (esta ficha) |

## Étimo

Lat. *lūx, lūcis* → PT *luz*. Cultivo: luz sin medida quema; con oficio, alimenta.

## ¡Haz lo mejor!

La mejor luz **hoy** — incluso apagar a tiempo. Luz sin [verdad](${verdade}) = teatro; con medida = oficio en el [camino](${caminho}).

## Estado

**Aprobada** — luz como efecto del circuito; tríada con [interruptor](${interruptor}) y [ligar × desligar](${ligarDesligar}).

[▶ Palabras](${hub}) · [▶ Interruptor](${interruptor}) · [▶ Ligar × Desligar](${ligarDesligar}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLuzPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLuzBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 116;
  return makePalavra({
    title: 'Inspeção: Luz — efeito do circuito e claridade',
    titleEn: 'Inspection: Luz — circuit effect and clarity',
    titleEs: 'Inspección: Luz — efecto del circuito y claridad',
    excerpt:
      'Palavras: «luz» (lat. *lūx*) — claridade e efeito do clique; tríade circuito + sol (fonte natural); Faça o melhor!',
    excerptEn:
      'Words: “luz” (Lat. *lūx*) — clarity and click effect; circuit triad + sol (natural source); Do your best!',
    excerptEs:
      'Palabras: «luz» (lat. *lūx*) — claridad y efecto del clic; tríada circuito + sol (fuente natural); ¡Haz lo mejor!',
    slug: 'inspecao-palavra-luz',
    date: '2026-08-04T18:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Luz · sol · interruptor',
    coverImage: '/imagens/inspecoes/luz-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLuzPost,
  buildLuzBodies
};
