'use strict';

/**
 * Inspeção Palavras · Lâmpada
 * Eixos: lat./gr. lampas · vaso de luz · lâmpada de Aladim · ≠ génio · ≠ gêmeos
 * Ficha de palavra, não catálogo de lâmpadas nem grimório.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/lampada-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/l%C3%A2mpada';

function buildLampadaBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-lampada.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const esfregar = '/posts/post-inspecao-palavra-esfregar.html';
  const desejos = '/posts/post-inspecao-palavra-desejos.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiktEn = 'https://en.wiktionary.org/wiki/lamp';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';
  const wikiLampas = 'https://en.wiktionary.org/wiki/lampas#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **[lâmpada](${self})** (teclado vivo **lampada**, sem acento). É o **vaso** — o corpo que segura a [luz](${luz}) no quarto e, no conto, o **receptáculo** do génio de [Aladim](${wikiAladim}). Pedido de campo: *lâmpada também.* O lab lê **duas lâmpadas que não são a mesma**: a de **circuito** (clique, fio, [interruptor](${interruptor})) e a de **desejo** ([esfregar](${esfregar}), [três](${tres}) [desejos](${desejos}), [abracadabra](${abracadabra})). Esta ficha cobre o **objecto**, o **étimo** (gr. *lampás* / lat. *lampas*), o **lapso lampada**, o **génio que mora dentro** (sem *ser* a lâmpada) e a **correção**: vaso ≠ espírito ≠ par de [gêmeos](${gemeos}). Elos: [ligar × desligar](${ligar}), [sol](${sol}), [genial](${genial}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · lâmpada](${WIKI}), [lamp](${wiktEn}), [lampas](${wikiLampas}), [Aladim](${wikiAladim}), [luz](${luz}). **Ficha ≠ catálogo de LED, ≠ manual eléctrico, ≠ conto autorizado da Disney.** Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **lâmpada** (dicionário) |
| Forma do pedido | **lampada** — oral / teclado sem acento |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Gr. *λαμπάς* (tocha) → lat. *lampas* → PT *lâmpada* — confiança: **alta** |
| Família | *lampejar* · *lampião* · *lampejo* · *lâmpadazinha* |
| Tipo BudGanja | Palavra — vaso de luz × vaso de desejo |
| Elo circuito | [luz](${luz}) · [interruptor](${interruptor}) · [ligar × desligar](${ligar}) |
| Elo céu / fogo | [sol](${sol}) · [fogo](${fogo}) · [noite](${noite}) |
| Elo conto | [abracadabra](${abracadabra}) · [esfregar](${esfregar}) · [desejos](${desejos}) · [três](${tres}) · [genial](${genial}) · [Aladim](${wikiAladim}) |
| Elo armadilha | [gêmeos](${gemeos}) — **não** é a lâmpada |
| Fonte | [lâmpada](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** a **coisa oca que brilha ou guarda**. No quarto, guarda o filamento / o LED. No conto, guarda o génio. A boca diz *lampada*; o lab ancora **lâmpada**.

## 2. Quatro camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Vaso de luz** | Objecto que converte energia em [luz](${luz}) | Alta |
| **Lampião / azeite** | Ancestral: chama no vidro — primo do [fogo](${fogo}) | Alta |
| **Lâmpada de Aladim** | Receptáculo do génio; [esfregar](${esfregar}) ≠ [ligar](${ligar}) | Alta (conto); baixa como física |
| **Lapso lampada** | Mesma palavra sem til | Alta (oralidade BR) |
| **Metáfora** | «lâmpada acendeu» = ideia — vizinho de [genial](${genial}) | Alta (uso vivo) |

**H1:** a lâmpada é **continente**; a [luz](${luz}) é **conteúdo visível**; o génio é **conteúdo de desejo**.  
**H2:** [esfregar](${esfregar}) o cobre do conto **não** fecha o circuito do quarto — o [gesto](${gesto}) certo no lab é o clique.  
**H3:** *lampada* sem acento não muda o mapa.

## 3. Circuito × conto

O mapa do lab ganha um **quarto papel** na tríade da [luz](${luz}):

| Papel | Ficha | No quarto | No conto |
|-------|-------|-----------|----------|
| **Vaso** | **Lâmpada** (esta) | Bolbo / LED / cúpula | Objecto a [esfregar](${esfregar}) |
| **Peça** | [Interruptor](${interruptor}) | Onde a mão pousa | *Não há* — o [desejo](${desejos}) salta a peça |
| **Verbo** | [Ligar × desligar](${ligar}) | Clique com rasto | [Esfregar](${esfregar}) / pedir |
| **Efeito** | [Luz](${luz}) | Claridade medida | [Três](${tres}) [desejos](${desejos}) (efeito sem watt) |
| **Espírito** | [Genial](${genial}) | Engenho com rasto | Génio da lâmpada (atalho) |

**Tese:** no quarto, a lâmpada **espera o clique**. No conto, a lâmpada **espera o pedido**. O ofício BudGanja fica com o clique e desconfia do pedido.

## 4. Génio, Geneo, gêmeos — o que a lâmpada não é

| Forma | Relação com a lâmpada |
|-------|------------------------|
| **Génio da lâmpada** | Mora **dentro** — não é o vidro. Ficha [genial](${genial}) (engenho ≠ desejo). Oral **Geneo**. |
| **Aladim** | Quem segura o vaso e pede. Atalho: [abracadabra](${abracadabra}). |
| **Abracadabra** | Cue da boca no palco; a lâmpada do conto é cue da **mão no metal** — [esfregar](${esfregar}). |
| **Desejos / três** | Crédito e quota do conto — fichas [desejos](${desejos}) e [três](${tres}). |
| **Gêmeos** | *Geminus* (par). **Zero** étimo comum com *lampas*. Ver [gêmeos](${gemeos}). |
| **«Lâmpada acendeu»** | Metáfora de ideia — celebrar com [gesto](${gesto}), não com [três](${tres}) [desejos](${desejos}). |

**H-vaso:** quem ama o génio e esquece a lâmpada idolatra o conteúdo e perde o ofício do continente.  
**H-clique:** [Faça o melhor!](${mantra}) no quarto é [ligar](${ligar}) com [risco](${risco}) visto (fio, calor, olho) — não esfregar a cúpula.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Conto** | A lâmpada *é* mágica | A lâmpada é **vaso**; a magia é o pedido |
| **Quarto** | Luz nasce do vidro sozinho | Luz nasce de circuito + [gesto](${gesto}) |
| **Ideia** | «Lâmpada na cabeça» = génio inato | Ideia com rasto = [genial](${genial}) depois do commit |
| **Boca** | *lampada* é outra palavra | Mesma palavra, acento a menos |
| **Céu** | Lâmpada = estrela = signo Gêmeos | [Sol](${sol}) é astro; lâmpada é artefacto; [gêmeos](${gemeos}) é par |

**Veredicto contraste:** parece milagre no vidro; é **continente** — de watts ou de desejo.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Esfrega a lâmpada e resolve» | No quarto: [ligar](${ligar}). No conto: [esfregar](${esfregar}) é cue. No lab: [caminho](${caminho}) |
| «O génio é a lâmpada» | O génio **habita**; a lâmpada **contém** |
| «Lampada não existe» | Existe na boca; a âncora escrita é **lâmpada** |
| «Lâmpada acesa = já sou genial» | Claridade ≠ engenho; ver [genial](${genial}) |
| «Lâmpada queima = aff e paro» | Trocar o vaso é ofício; o [risco](${risco}) inspecciona-se |

### Ofício do vaso (mapa curto)

1. Se ouvir **lampada**, ler **lâmpada**.  
2. Separar **vaso de luz** e **vaso de desejo**.  
3. No quarto: [interruptor](${interruptor}) + [ligar](${ligar}) + [luz](${luz}).  
4. No conto: não copiar o [esfregar](${esfregar}) para a vida — [abracadabra](${abracadabra}) já avisou; quota em [três](${tres}) [desejos](${desejos}).  
5. Fechar com [Faça o melhor!](${mantra}) **neste** soquete, hoje.

**Veredicto correção:** **lâmpada = vaso.** Luz é efeito. Génio é inquilino de conto. Clique é ofício.

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Casa** | «troca a lâmpada» | Bom: ofício do vaso · Mau: ignorar o [risco](${risco}) |
| **Cultivo** | painel / lâmpada de grow | Bom: medida (ver [luz](${luz})) · Mau: «quanto mais, melhor» sem mapa |
| **Conto** | «lâmpada do Aladim» | Bom: nomear o vaso · Mau: pedir [três](${tres}) [desejos](${desejos}) ao soquete |
| **Ideia** | «acendeu a lâmpada» | Bom: metáfora · Mau: dispensar o [skill](${skill}) |
| **Teclado** | lampada | Bom: mesma palavra · Mau: achar que é outra ficha |

## 8. Anti-esfrega · Faça o melhor!

| Armadilha | Leitura |
|-----------|---------|
| **Vaso = espírito** | Continente ≠ conteúdo |
| **Esfregar = ligar** | Conto ≠ circuito |
| **LED = sol** | Artefacto ≠ [sol](${sol}) |
| **Lâmpada = génio = gêmeos** | Três fichas, três étimos |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor **neste** vaso, com clique e medida |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Esfregar a cúpula em vez do [interruptor](${interruptor}) = falso ofício |
| Rede | [luz](${luz}) · [ligar](${ligar}) · [gesto](${gesto}) · [abracadabra](${abracadabra}) |

## Hipóteses (síntese)

**H1:** *lâmpada* = *lampas* (tocha / vaso de claridade); *lampada* = boca.  
**H2:** vaso de watts × vaso de desejo — mesma palavra, dois ofícios.  
**H3:** génio **dentro** ≠ [gêmeos](${gemeos}) ao lado.  
**H4:** fecho [Faça o melhor!](${mantra}); ficha ≠ catálogo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Luz](${luz}) · [Interruptor](${interruptor}) · [Ligar × desligar](${ligar}) | Efeito · peça · verbo — a lâmpada é o vaso |
| [Sol](${sol}) · [Fogo](${fogo}) · [Noite](${noite}) · [Eletrizante](${eletrizante}) | Fontes e ciclo |
| [Abracadabra](${abracadabra}) · [Esfregar](${esfregar}) · [Desejos](${desejos}) · [Três](${tres}) · [Genial](${genial}) | Cue / palma / pack / quota × engenho |
| [Gêmeos](${gemeos}) | Par — **não** colar ao vaso |
| [Gesto](${gesto}) · [Skill](${skill}) · [Caminho](${caminho}) · [Risco](${risco}) | Clique inspeccionável |
| [Verdade](${verdade}) · [Língua portuguesa](${lingua}) · [Guia](${guia}) | Âncora e acento |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem esfrega |

## Limites

- Não ensina instalações eléctricas nem PPFD.  
- Não autentica o conto de Aladim como história factual.  
- Não vende lâmpadas.

## Status

**Aprovado** — **lâmpada** fichada como vaso (*lampas*); **lampada** como boca; circuito × conto separados; génio = inquilino; [gêmeos](${gemeos}) fora do étimo; fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Luz](${luz}) · [▶ Esfregar](${esfregar}) · [▶ Desejos](${desejos}) · [▶ Três](${tres}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **lâmpada** (typed **lampada**). It is the **vessel** — in the room it holds [light](${luz}); in the tale it holds Aladdin’s genie. Two lamps, one word: **circuit** (switch, watts) vs **wish** (rub, three desires). Links: [ligar × desligar](${ligar}), [abracadabra](${abracadabra}), [genial](${genial}), [Do your best!](${mantra}).

> Sources: [lâmpada](${WIKI}), [Aladdin](${wikiAladim}). **Not an electrical catalogue, not a Disney review.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **lâmpada** · oral **lampada** |
| Path | Gk. *lampás* → Lat. *lampas* → PT *lâmpada* |
| Not | The genie (tenant) · [gêmeos](${gemeos}) (twins) · the [sun](${sol}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** the glass *is* the magic.  
**Is:** the glass is a **container**. Light is the effect. The genie is a wish-story. The craft click is [ligar](${ligar}).

## 3. Correction

**Lamp = vessel.** If you hear lampada, read lâmpada. Rubbing the bulb is not [turning it on](${ligar}). Close with [Do your best!](${mantra}) at this socket.

## Status

**Approved** — vessel sheet; circuit × tale split; genie = tenant; twins out of etymon.

[▶ Words](${hub}) · [▶ Light](${luz}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **lâmpada** (teclado **lampada**). Es el **vaso**: en el cuarto contiene la [luz](${luz}); en el cuento, al genio de Aladino. Dos lámparas, una palabra: **circuito** × **deseo**. Vínculos: [ligar × desligar](${ligar}), [abracadabra](${abracadabra}), [genial](${genial}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [lâmpada](${WIKI}), [Aladino](${wikiAladim}). **No es catálogo eléctrico ni reseña Disney.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **lâmpada** · oral **lampada** |
| Camino | gr. *lampás* → lat. *lampas* → PT *lâmpada* |
| No es | El genio (inquilino) · [gêmeos](${gemeos}) · el [sol](${sol}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** el vidrio *es* la magia.  
**Es:** el vidrio es **continente**. La luz es efecto. El genio es cuento de deseo. El oficio es [ligar](${ligar}).

## 3. Corrección

**Lámpara = vaso.** Si oyes lampada, lee lâmpada. Frotar la bombilla no es [encender](${ligar}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — ficha de vaso; circuito × cuento; genio = inquilino.

[▶ Palabras](${hub}) · [▶ Luz](${luz}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildLampadaPost() {
  const { body, contentEn, contentEs, wiki } = buildLampadaBodies();
  let seriesOrder = 123;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-lampada');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 123 */
  }

  const post = makePalavra({
    title: 'Inspeção: Lâmpada — vaso de luz, vaso de desejo e o lapso «lampada»',
    titleEn: 'Inspection: Lâmpada — vessel of light, vessel of wish, and the slip “lampada”',
    titleEs: 'Inspección: Lâmpada — vaso de luz, vaso de deseo y el lapsus «lampada»',
    excerpt:
      'Palavras: «lâmpada» (lampada) — vaso de luz no quarto × lâmpada de Aladim; génio = inquilino; ≠ gêmeos; elos luz, ligar e abracadabra; Faça o melhor!',
    excerptEn:
      'Words: “lâmpada” — room vessel of light × Aladdin’s lamp; genie = tenant; ≠ twins; links luz, ligar and abracadabra; Do your best!',
    excerptEs:
      'Palabras: «lâmpada» — vaso de luz × lámpara de Aladino; genio = inquilino; ≠ gemelos; vínculos luz, ligar y abracadabra; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-lampada',
    date: '2026-08-20T01:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Lâmpada · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = {
  buildLampadaPost,
  buildLampadaBodies
};
