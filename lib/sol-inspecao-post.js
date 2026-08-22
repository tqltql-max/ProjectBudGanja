'use strict';

/**
 * Inspeção Palavras · sol
 * Eixos: lat. sōl · astro · luz natural · cultivo / fotoperíodo ·
 * ≠ solitário · tríade circuito (luz artificial) · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSolBodies() {
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
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligarDesligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const solitario = '/posts/post-inspecao-palavra-solitario.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/sol';
  const wikiLat = 'https://en.wiktionary.org/wiki/sol#Latin';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const teoriaCordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';

  const body = `## Escopo

Inspeção editorial da palavra **sol** — o **astro** que dá [luz](${luz}) e calor ao dia. No mapa BudGanja: fonte natural de claridade (≠ clique do [interruptor](${interruptor})); par do ciclo com [noite](${noite}); eixo do [cultivo](${cultivo}) outdoor / fotoperíodo; metáfora de clareza e ciclo. Esta ficha cobre o **étimo** (lat. *sōl*), as **camadas BR**, a distinção com [luz](${luz}) artificial e com [solitário](${solitario}), elos [noite](${noite}), [fogo](${fogo}), [inverno](${inverno}) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sol](${wiki}), [sōl (EN)](${wikiLat}), [luz](${luz}), [noite](${noite}), série [Palavras](${hub}). **Ficha ≠ manual de astronomia nem protocolo de burn.** Tom: Inspetor BudGanja — sol com ofício ≠ culto vazio ao astro. **≠** [solitário](${solitario}) (outra ficha).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sol** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *sōl, sōlis* («sol») → PT *sol* — confiança: **alta** |
| Família | *solar* · *soalheiro* · *ensolarado* · *pôr do sol* · *nascer do sol* · *girassol* |
| Cognatos | esp. *sol* · fr. *soleil* · it. *sole* · ing. *sun* · lat. *sōl* |
| Tipo BudGanja | Palavra — astro × luz natural × ciclo |
| Elo claridade | [luz](${luz}) — o sol *dá* luz; a luz do quarto pode ser artificial |
| Elo ciclo | [noite](${noite}) — par dia × noite |
| Elo circuito | [interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) — luz de clique ≠ luz de sol |
| Elo vivo | [fogo](${fogo}) · [eletrizante](${eletrizante}) · [sinal](${sinal}) · [gesto](${gesto}) |
| Elo ofício | [verdade](${verdade}) · [caminho](${caminho}) · [risco](${risco}) · [cultivo](${cultivo}) |
| Elo gelo | [inverno](${inverno}) · [gelo](${gelo}) — contraste ártice / Tamara |
| Anti-confusão | [solitário](${solitario}) — *sol-* ≠ *só*; fichas distintas |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) · [calculadoras](${calculadoras}) |
| Fonte | [Wikcionário · sol](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **astro** e, por extensão, o **dia claro**, o **calor solar** e a metáfora de **clareza**. No lab: fonte natural que o cultivo e a [luz](${luz}) medem ou imitam.

## 2. Sol × noite × luz × circuito

| Papel | Ficha | Leitura |
|-------|-------|---------|
| **Fonte natural / dia** | **Sol** (esta ficha) | Astro — não se liga com interruptor |
| **Escuro / ciclo** | [Noite](${noite}) | Quando o sol baixa |
| **Efeito / claridade** | [Luz](${luz}) | Pode ser do sol *ou* da lâmpada |
| **Peça / verbo (artificial)** | [Interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) | Clique que imita ou substitui o dia |

**Tese:** o sol é a **matriz** da luz do dia; a [noite](${noite}) é a **fase** que completa o ciclo; o circuito lab **copia** ou **completa** o fotoperíodo. Sem confundir astro com lâmpada.

## 3. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Astro / dia** | O Sol no céu; nascer / pôr | Alta |
| **Calor / pele** | Banho de sol; queimadura | Alta |
| **Cultivo** | Fotoperíodo, DLI, outdoor × indoor | Alta (mapa BudGanja) |
| **Figurado** | «Sol da minha vida»; clareza; «no sol» | Alta |
| **Ciclo / estação** | Verão; contraste com [inverno](${inverno}) | Alta |
| **Ofício lab** | Medir, sombrear, complementar com painel | Lab |

**H1:** *sol* < lat. *sōl* — astro (alta confiança).  
**H2:** [luz](${luz}) do sol ≠ luz do [interruptor](${interruptor}) — mesma claridade nomeada, fontes distintas.  
**H3:** *sol* ≠ [solitário](${solitario}) — não colapsar etimologias no hub.

## 4. Distinções úteis

| Par | Diferença |
|-----|-----------|
| **sol** vs **[noite](${noite})** | Astro / dia × fase escura do ciclo |
| **sol** vs **[luz](${luz})** | Fonte astro × claridade (efeito) |
| **sol** vs **[fogo](${fogo})** | Astro / dia × combustão local |
| **sol** vs **[interruptor](${interruptor})** | Natural × peça do clique |
| **sol** vs **[solitário](${solitario})** | Astro × estar só (outra ficha) |
| **sol** vs **[inverno](${inverno})** | Astro forte / fraco no ciclo |

## 5. Rede BudGanja

| Elo | Papel |
|-----|-------|
| [Luz](${luz}) | Efeito — o sol é a fonte-mãe do dia |
| [Noite](${noite}) | Par do ciclo — quando o sol rarefaz |
| [Interruptor](${interruptor}) · [Ligar × Desligar](${ligarDesligar}) | Circuito que imita/completa o dia |
| [Fogo](${fogo}) · [Eletrizante](${eletrizante}) | Calor e carga — medir |
| [Teoria das cordas](${teoriaCordas}) | O fotão que a física teórica **quer** incluir; o sol do cultivo **não** prova supercorda |
| [Cultivo](${cultivo}) · [calculadoras](${calculadoras}) | Fotoperíodo e intensidade |
| [Inverno](${inverno}) · [Gelo](${gelo}) | Quando o sol rarefaz |
| [Solitário](${solitario}) | Anti-confusão lexical |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Melhor luz **hoje** — solar ou de painel, com ofício |

## 6. Valeu !!!

| Campo | Valor |
|-------|-------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, inclusive respeitar o sol (e a sombra) |
| Veredicto | Sol sem [verdade](${verdade}) = cartão-postal; sol com medida = ofício no [caminho](${caminho}) e no [cultivo](${cultivo}). |

**H4:** fecho = [Valeu !!!](${mantra}) — receber e dosear a luz do sol com consciência.

## Estado

**Aprovado** — **sol** fichado como fonte natural; par com [noite](${noite}); elo vivo em [luz](${luz}), contraste com o circuito ([interruptor](${interruptor}) / [ligar × desligar](${ligarDesligar})), ≠ [solitário](${solitario}).

[▶ Palavras](${hub}) · [▶ Noite](${noite}) · [▶ Luz](${luz}) · [▶ Interruptor](${interruptor}) · [▶ Fogo](${fogo}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sol** (sun) — the star that gives [luz](${luz}) and daytime heat. Natural source ≠ [interruptor](${interruptor}) click. Grow / photoperiod axis. Distinct from [solitário](${solitario}).

> Sources: [sol](${wiki}), [sōl](${wikiLat}), [luz](${luz}). Not an astronomy manual.

## Sol × light × circuit

| Role | Sheet |
|------|-------|
| Natural source | **Sol** (this sheet) |
| Clarity / effect | [Luz](${luz}) |
| Artificial circuit | [Interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) |

## Etymon

Lat. *sōl, sōlis* → PT *sol* — high confidence. Do not collapse with [solitário](${solitario}).

## Valeu !!!

Best light **today** — solar or panel, with craft. Sun without [truth](${verdade}) = postcard; with measure = craft on the [path](${caminho}).

## Status

**Approved** — sol as natural source; links [luz](${luz}) and the circuit triad.

[▶ Words](${hub}) · [▶ Luz](${luz}) · [▶ Interruptor](${interruptor}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sol** — el astro que da [luz](${luz}) y calor al día. Fuente natural ≠ clic del [interruptor](${interruptor}). Eje de cultivo / fotoperiodo. Distinto de [solitário](${solitario}).

> Fuentes: [sol](${wiki}), [sōl](${wikiLat}), [luz](${luz}). No es manual de astronomía.

## Sol × luz × circuito

| Rol | Ficha |
|-----|-------|
| Fuente natural | **Sol** (esta ficha) |
| Claridad / efecto | [Luz](${luz}) |
| Circuito artificial | [Interruptor](${interruptor}) · [ligar × desligar](${ligarDesligar}) |

## Étimo

Lat. *sōl, sōlis* → PT *sol*. No colapsar con [solitário](${solitario}).

## ¡Valeu !!!

La mejor luz **hoy** — solar o panel, con oficio. Sol sin [verdad](${verdade}) = postal; con medida = oficio en el [camino](${caminho}).

## Estado

**Aprobada** — sol como fuente natural; elos [luz](${luz}) y la tríada del circuito.

[▶ Palabras](${hub}) · [▶ Luz](${luz}) · [▶ Interruptor](${interruptor}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSolPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildSolBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 117;
  return makePalavra({
    title: 'Inspeção: Sol — astro, luz natural e ciclo',
    titleEn: 'Inspection: Sol — star, natural light and cycle',
    titleEs: 'Inspección: Sol — astro, luz natural y ciclo',
    excerpt:
      'Palavras: «sol» (lat. *sōl*) — astro e luz natural; par com noite; elo luz; contraste interruptor; ≠ solitário; Valeu !!!',
    excerptEn:
      'Words: “sol” (Lat. *sōl*) — star and natural light; pair with noite; link luz; contrast interruptor; ≠ solitário; Valeu !!!',
    excerptEs:
      'Palabras: «sol» (lat. *sōl*) — astro y luz natural; par con noite; vínculo luz; contraste interruptor; ≠ solitário; ¡Valeu !!!',
    slug: 'inspecao-palavra-sol',
    date: '2026-08-04T18:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Sol · noite · luz',
    coverImage: '/imagens/inspecoes/sol-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSolPost,
  buildSolBodies
};
