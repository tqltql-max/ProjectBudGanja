'use strict';

/**
 * Inspeção Palavras · esperança
 * Eixos: objeto (lat. spēs / sperare) · espera × esperança ·
 * afectos irmãos · ofício vivo BR · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildEsperancaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const wiki = 'https://pt.wiktionary.org/wiki/esperan%C3%A7a';
  const wikiEsperar = 'https://pt.wiktionary.org/wiki/esperar';
  const wikiSpes = 'https://en.wiktionary.org/wiki/spes';

  const body = `## Escopo

Inspeção editorial da palavra **esperança** — afecto de **ainda-por-vir**, no português do Brasil, sem sermão. Esta ficha cobre o **objeto** (latim *spēs* / *sperāre* → *sperantia*), a diferença útil entre **esperar** e **esperança**, a **rede afectiva** com fichas já existentes, e o fecho [Faça o melhor!](${mantra}). Elos: [emoção](${emocao}), [alegria](${alegria}), [medo](${medo}), [tristeza](${tristeza}), [caminho](${caminho}), [coração](${coracao}), [Vida](${vida}) / [Diário](${diario}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · esperança](${wiki}), [esperar](${wikiEsperar}), [spēs (EN)](${wikiSpes}), série [Palavras](${hub}). **Ficha ≠ teologia nem autoajuda.** Tom: Inspetor BudGanja — esperança como palavra **vivida**, quente, sem púlpito. Sem afiliação comercial.

**Gatilho tipográfico:** *epseramja* / *espepdna* (com flip-flops de decodificação) → **esperança**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **esperança** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Latim *spēs* («esperança») / *sperāre* («esperar») → lat. tardio *sperantia* → PT *esperança* — confiança: **alta** |
| Família | *esperar* · *desespero* · *desesperança* · *esperançoso* · *inesperado* |
| Cognatos | esp. *esperanza* · fr. *espérance* · it. *speranza* · ing. *hope* (germânico; sentido paralelo) · lat. *spēs* |
| Tipo BudGanja | Palavra — afecto vivo × espera com ofício × ânimo sem dogma |
| Elo afecto | [emoção](${emocao}) · [alegria](${alegria}) · [medo](${medo}) · [tristeza](${tristeza}) · [raiva](${raiva}) |
| Elo ofício | [caminho](${caminho}) · [verdade](${verdade}) · [coração](${coracao}) · [Faça o melhor!](${mantra}) |
| Elo cultural | [Lágrimas da Vida](${lagrimas}) · [Three Little Birds](${birds}) · [Vida](${vida}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · esperança](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **disposição de ainda acreditar que algo bom / possível pode chegar** — sem garantir o resultado. No BR oral: «ainda tenho esperança», «não perde a esperança», «isso me dá esperança». No laboratório: ânimo com [caminho](${caminho}), não frase pronta.

## 2. Esperar × esperança

| Forma | Leitura | No BudGanja |
|-------|---------|-------------|
| **esperar** (verbo) | Aguardar; contar com; demorar | Pode ser fila, prazo, silêncio — neutro ou tenso |
| **esperança** (nome) | O afecto / a postura de quem ainda abre espaço ao possível | Nomeia o **porquê** do ficar — não o calendário |
| **«tô esperando»** | Quase sempre *aguardar* | Pode ou não carregar esperança |
| **«tenho esperança»** | Declara afecto | Pede [verdade](${verdade}): esperança de *quê*, com *que* gesto? |

**H1:** a família vem de *spēs* / *sperāre* — romance claro; **não** étimo indígena brasileiro.  
**H2:** no BR, *esperar* e *esperança* partilham raiz mas **não** são a mesma ficha de ofício: um marca tempo; a outra marca postura.  
**H3:** esperança sem [caminho](${caminho}) vira slogan; com método, vira combustível para [Faça o melhor!](${mantra}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ânimo futuro** | Ainda há espaço para o bom / o possível | Alta |
| **Consolo** | Palavra que segura quando [tristeza](${tristeza}) aperta | Alta (uso vivo) |
| **Risco de vazio** | «Tem esperança» sem gesto = frase de cartão | Alta (armadilha) |
| **Par do medo** | [Medo](${medo}) fecha; esperança **abre uma fresta** — sem apagar o medo | Alta–média |
| **Par da alegria** | [Alegria](${alegria}) celebra o que já chegou; esperança aponta o que ainda pode | Alta |
| **Ofício lab** | Continuar o [diário](${diario}), o cultivo, a ficha — um passo | Média–alta |

## 4. Rede afectiva (só fichas existentes)

| Ficha | Relação com *esperança* |
|-------|-------------------------|
| [Emoção](${emocao}) | Hub — esperança é um modo do sentir nomeado |
| [Alegria](${alegria}) | Expansão do que já é; esperança olha o que ainda pode ser |
| [Medo](${medo}) | Limite real; esperança não nega o medo — convive e segue |
| [Tristeza](${tristeza}) | Peso e lentidão; esperança é a fresta, não o apagamento |
| [Raiva](${raiva}) | Fogo de limite; às vezes a esperança volta *depois* do limite nomeado |
| [Coração](${coracao}) | Centro afectivo onde a palavra «ainda espero» costuma nascer |
| [Caminho](${caminho}) · [Verdade](${verdade}) | Esperança com método e inspeção — sem fantasia que mente |
| [Lágrimas da Vida](${lagrimas}) | Eco literário: lábios orvalhados de esperança no fecho do poema |
| [Three Little Birds](${birds}) | Cultura do «não se preocupa» — ânimo leve, sem apagar o ofício |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Nomear o afecto** | «Ainda tenho esperança» | Ficha: dizer *o quê* se espera |
| **Consolar** | «Não perde a esperança» | Quente — sem virar ordem moral |
| **Abrir fresta** | Depois do susto / da perda | Cruza [medo](${medo}) · [tristeza](${tristeza}) |
| **Motivação de ofício** | Seguir o projecto, a planta, o texto | [Faça o melhor!](${mantra}) + [caminho](${caminho}) |
| **Anti-sermão** | Evitar «só ter fé e pronto» | Esperança **com gesto** — senão é pose |

**Finalidade-mãe:** nomear a **esperança** para **continuar com ofício** — fresta viva no peito ([coração](${coracao})), não discurso que esconde [verdade](${verdade}).

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, com a esperança que cabe neste passo |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Tenho esperança, então não inspeciono» = falso · esperança pede [verdade](${verdade}) |
| Par afectivo | [Alegria](${alegria}) · [medo](${medo}) · [tristeza](${tristeza}) — a esperança não apaga a sala de comando |
| Cultura | [Three Little Birds](${birds}) · [Lágrimas da Vida](${lagrimas}) — ânimo e lágrima podem coexistir |

**Veredicto:** Faça o melhor **com esperança** — a que caminha. Esperança sem [caminho](${caminho}) = cartão; esperança com método = fresta que fica.

## Hipóteses (síntese)

**H1:** objeto = *spēs* / *sperantia* → esperança (romance; alta confiança).  
**H2:** *esperar* ≠ *esperança* no ofício — tempo × postura.  
**H3:** elos = [emoção](${emocao}) · [alegria](${alegria}) · [medo](${medo}) · [tristeza](${tristeza}) · [caminho](${caminho}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com fresta viva, sem sermão.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Emoção](${emocao}) · [Alegria](${alegria}) · [Medo](${medo}) · [Tristeza](${tristeza}) | Sala afectiva |
| [Coração](${coracao}) · [Caminho](${caminho}) · [Verdade](${verdade}) | Centro, percurso, inspeção |
| [Lágrimas da Vida](${lagrimas}) · [Three Little Birds](${birds}) | Eco literário / cultural |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é sermão religioso, promessa de milagre nem protocolo clínico.  
- Esperança ≠ negar [medo](${medo}) ou [tristeza](${tristeza}).  
- Frase de consolo sem [caminho](${caminho}) não substitui ofício.

## Status

**Aprovado** — **esperança** fichada: objeto (*spēs* / *sperantia*), espera × esperança, rede afectiva e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Emoção](${emocao}) · [▶ Alegria](${alegria}) · [▶ Medo](${medo}) · [▶ Tristeza](${tristeza}) · [▶ Caminho](${caminho}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **esperança** (hope) — a lived “still-possible” affect in Brazilian Portuguese, without sermon. Covers **object** (Lat. *spēs* / *sperāre* → *sperantia*), **esperar** vs **esperança**, the affective network of existing sheets, and [Do your best!](${mantra}). Links: [emoção](${emocao}), [alegria](${alegria}), [medo](${medo}), [tristeza](${tristeza}), [caminho](${caminho}), [coração](${coracao}), [Vida](${vida}).

> Method note: [Wiktionary · esperança](${wiki}), [esperar](${wikiEsperar}), [spēs](${wikiSpes}). Not theology or self-help. Warm lab tone.

Typo trigger: *epseramja* → **esperança**.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **esperança** |
| Etymon | Lat. *spēs* / *sperāre* → late Lat. *sperantia* → PT *esperança* — high confidence |
| Lab type | Lived hope × waiting with craft × courage without dogma |
| Links | [emoção](${emocao}) · [alegria](${alegria}) · [medo](${medo}) · [tristeza](${tristeza}) · [caminho](${caminho}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Wait vs hope

**esperar** = to wait / expect (time). **esperança** = the stance that still opens space for the possible. Same family; different craft.

## 3. Senses

Future ânimo · comfort beside [tristeza](${tristeza}) · risk of empty slogan · twin of [medo](${medo}) (a crack of light, not denial) · pair with [alegria](${alegria}) (arrived vs still-coming) · lab craft: one more step on the [path](${caminho}).

## 4. Purpose

Name the affect · keep a crack open · walk with [truth](${verdade}) · close with [Do your best!](${mantra}). Culture echoes: [Lágrimas da Vida](${lagrimas}) · [Three Little Birds](${birds}).

## 5. Do your best!

Best possible **today**, with the hope that fits this step — without skipping inspection. Hope without [path](${caminho}) = postcard; hope with method = a crack that stays.

## Status

**Approved** — object · wait×hope · affective net · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Emoção](${emocao}) · [▶ Alegria](${alegria}) · [▶ Medo](${medo}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **esperança** (esperanza) — afecto vivido de «aún-posible» en el portugués de Brasil, sin sermón. Cubre **objeto** (lat. *spēs* / *sperāre* → *sperantia*), **esperar** × **esperança**, red afectiva de fichas existentes y [¡Haz lo mejor!](${mantra}). Vínculos: [emoção](${emocao}), [alegria](${alegria}), [medo](${medo}), [tristeza](${tristeza}), [caminho](${caminho}), [coração](${coracao}), [Vida](${vida}).

> Nota: [Wikcionario · esperança](${wiki}), [esperar](${wikiEsperar}), [spēs](${wikiSpes}). No es teología ni autoayuda.

Gatillo tipográfico: *epseramja* → **esperança**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **esperança** |
| Étimo | Lat. *spēs* / *sperāre* → *sperantia* → PT *esperança* |
| Tipo lab | Esperanza vivida × espera con oficio |
| Vínculos | [emoção](${emocao}) · [alegria](${alegria}) · [medo](${medo}) · [tristeza](${tristeza}) · [caminho](${caminho}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Esperar × esperança

**esperar** = aguardar (tiempo). **esperança** = postura que aún abre espacio a lo posible.

## 3. Sentidos

Ánimo futuro · consuelo junto a [tristeza](${tristeza}) · riesgo de eslogan vacío · par de [medo](${medo}) · par de [alegria](${alegria}) · oficio: un paso en el [camino](${caminho}).

## 4. Para qué sirve

Nombrar · mantener una rendija · caminar con [verdad](${verdade}) · cerrar con [¡Haz lo mejor!](${mantra}). Ecos: [Lágrimas da Vida](${lagrimas}) · [Three Little Birds](${birds}).

## 5. ¡Haz lo mejor!

Lo mejor posible **hoy**, con la esperanza que cabe en este paso. Esperanza sin [camino](${caminho}) = postal; con método = rendija que queda.

## Estado

**Aprobada** — objeto · esperar×esperança · red afectiva · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Emoção](${emocao}) · [▶ Alegria](${alegria}) · [▶ Medo](${medo}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildEsperancaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEsperancaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 67;
  return makePalavra({
    title: 'Inspeção: Esperança — afecto vivo, espera com ofício e Faça o melhor!',
    titleEn: 'Inspection: Esperança — lived hope, waiting with craft and Do your best!',
    titleEs: 'Inspección: Esperança — esperanza vivida, espera con oficio y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «esperança» (lat. *spēs* / *sperantia*) — afecto vivo BR; esperar × esperança; rede com alegria, medo, tristeza; Faça o melhor!',
    excerptEn:
      'Words: “esperança” (Lat. *spēs* / *sperantia*) — lived BR hope; wait vs hope; links to joy, fear, sadness; Do your best!',
    excerptEs:
      'Palabras: «esperança» (lat. *spēs* / *sperantia*) — esperanza vivida BR; esperar × esperança; red con alegría, miedo, tristeza; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-esperanca',
    date: '2026-08-03T21:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Esperança · palavra',
    coverImage: '/imagens/inspecoes/esperanca-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEsperancaPost,
  buildEsperancaBodies
};
