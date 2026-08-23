'use strict';

/**
 * Inspeção Palavras · Desejos
 * Eixos: lat. desiderium · desejo × ofício · pack dos três pedidos
 * Ficha de palavra, não lista de pedidos nem grimório.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/desejos-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/desejo';

function buildDesejosBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-desejos.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const lampada = '/posts/post-inspecao-palavra-lampada.html';
  const esfregar = '/posts/post-inspecao-palavra-esfregar.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';
  const wiktEn = 'https://en.wiktionary.org/wiki/desire';
  const wiktDesiderium = 'https://en.wiktionary.org/wiki/desiderium';

  const body = `## Escopo

Inspeção editorial da palavra **[desejos](${self})** (singular **desejo**). Pedido de campo, a seguir a *esfregar*: o **conteúdo** que o génio da [lâmpada](${lampada}) é pago para entregar. No português vivo, desejo é **vontade** / apetite / projecto. No ciclo de [Aladim](${wikiAladim}), desejos vêm em **pack** — muitas vezes [três](${tres}). Esta ficha cobre o **objecto**, o **étimo** (*desiderium*), o **choque desejo × ofício** e a **correção**: pedir não substitui [gesto](${gesto}). Elos: [esfregar](${esfregar}), [abracadabra](${abracadabra}), [genial](${genial}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · desejo](${WIKI}), [desire](${wiktEn}), [*desiderium*](${wiktDesiderium}), [Aladim](${wikiAladim}). **Ficha ≠ lista de pedidos, ≠ psicologia clínica, ≠ conto autorizado.** O étimo *de + sidus* («a partir das estrelas») **não** cola esta ficha a [gêmeos](${gemeos}): é história da palavra, não horóscopo.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **desejos** (plural do conto) · **desejo** (dicionário) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *desiderium* ← *desiderare* (*de* + *sidus*, «astro») — confiança: **alta** no étimo; **baixa** como destino |
| Família | *desejar* · *desejável* · *indesejado* |
| Tipo BudGanja | Palavra — vontade × pack mágico × ofício |
| Elo conto | [lâmpada](${lampada}) · [esfregar](${esfregar}) · [três](${tres}) · [abracadabra](${abracadabra}) |
| Elo ofício | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [genial](${genial}) |
| Elo vizinho | [esperança](${esperanca}) · [criatividade](${criatividade}) · [verdade](${verdade}) |
| Fonte | [desejo](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do que se quer** — e, no conto, o **crédito** que o génio gasta. A boca do lab pediu *desejos* no plural: é o pack, não só o apetite.

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Vontade viva** | Querer um feito, um bem, um alívio | Alta |
| **Pack do conto** | Pedidos ao génio, quota [três](${tres}) nas recontagens populares | Alta (convenção); variável no texto clássico |
| **Atalho** | Resultado sem [caminho](${caminho}) — primo de [abracadabra](${abracadabra}) | Alta (leitura lab) |

**H1:** *desejo* = *desiderium* (falta sentida).  
**H2:** o génio vende o pack; o lab compra o [gesto](${gesto}).  
**H3:** «três desejos» é **regra de reconto**, não constante física — ver [três](${tres}).

## 3. Desejo × engenho × fórmula

| Forma | O que entrega | O que o lab exige |
|-------|---------------|-------------------|
| **Desejo** | Intenção | Pode abrir o [caminho](${caminho}) — não o fecha sozinho |
| **Génio da lâmpada** | Atalho | Ficha [genial](${genial}): engenho ≠ servidor de pedidos |
| **Abracadabra** | Cue da boca | Fala ≠ feito |
| **Esfregar** | Cue da palma | [Esfregar](${esfregar}) ≠ [ligar](${ligar}) |
| **Valeu !!!** | Ofício | Um gesto hoje, sem pack |

**Tese:** o desejo **aponta**; o ofício **anda**. O pack de três tenta **saltar** o andar.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Conto** | Três pedidos resolvem a vida | Convenção de quota; ver [três](${tres}) |
| **Estrelas** | *Sidus* = signo / [gêmeos](${gemeos}) | Étimo de *desiderare*; **não** laudo astral |
| **Elogio** | «Desejo genial» | [Genial](${genial}) mede rasto, não apetite |
| **Quarto** | Pedir luz ao génio | [Ligar](${ligar}) a [lâmpada](${lampada}) |

**Veredicto contraste:** parece crédito mágico; é **vontade** — útil se virar [gesto](${gesto}), oca se ficar pack.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Tenho três desejos, está feito» | Quota de conto; ofício não tem pack | 
| «Desejar forte chega» | Força de apetite ≠ [skill](${skill}) |
| «O génio deve-me isto» | O génio é inquilino da [lâmpada](${lampada}), não credor do lab |
| «Desejo = esperança» | [Esperança](${esperanca}) aguarda; desejo puxa; ofício faz |

### Ofício do pedido (mapa curto)

1. Nomear o **desejo** (vontade).  
2. Recusar o **pack** como substituto do rasto.  
3. Traduzir um desejo em **um** [gesto](${gesto}) hoje.  
4. Se a boca pediu o **3**, ir a [três](${tres}).  
5. Fechar com [Valeu !!!](${mantra}) — não com o terceiro pedido.

**Veredicto correção:** **desejos apontam; ofício cumpre.** Pack de conto ≠ método.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Vontade** | «meu desejo é terminar» | Bom: apontar · Mau: parar no apontar |
| **Aniversário** | «faz um desejo» | Bom: brincadeira · Mau: substituir o [caminho](${caminho}) |
| **Conto** | «os três desejos» | Bom: nomear o pack · Mau: tratar como lei |
| **Cortesia** | «desejos de melhoras» | Bom: fala social · Mau: achar que cura |

## 7. Anti-pack · Valeu !!!

| Armadilha | Leitura |
|-----------|---------|
| **Quota = método** | [Três](${tres}) é convenção, não ofício |
| **Apetite = génio** | [Genial](${genial}) vem depois do commit |
| **Estrela = destino** | *Sidus* no étimo ≠ [gêmeos](${gemeos}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — um feito, não três milagres |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Gastar o pack em vez do [gesto](${gesto}) |
| Rede | [lâmpada](${lampada}) · [esfregar](${esfregar}) · [três](${tres}) · [abracadabra](${abracadabra}) |

## Hipóteses (síntese)

**H1:** *desejo* = *desiderium* (falta / vontade).  
**H2:** no conto, desejos são o **crédito** do vaso.  
**H3:** o **3** é ficha irmã, não esta.  
**H4:** fecho [Valeu !!!](${mantra}); ficha ≠ lista de pedidos.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Lâmpada](${lampada}) · [Esfregar](${esfregar}) | Vaso e cue |
| [Três](${tres}) | Quota do pack |
| [Abracadabra](${abracadabra}) · [Genial](${genial}) | Fórmula × engenho |
| [Gesto](${gesto}) · [Skill](${skill}) · [Caminho](${caminho}) | Tradução do apetite |
| [Esperança](${esperanca}) · [Verdade](${verdade}) · [Guia](${guia}) | Vizinhos |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem pack |

## Limites

- Não avalia psicologia do desejo nem coaching.  
- Não inventa quantos pedidos o Aladim clássico «realmente» tinha.  
- Não cola *sidus* a horóscopo.

## Status

**Aprovado** — **desejos** fichados como vontade (*desiderium*) × pack do conto; quota em [três](${tres}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Lâmpada](${lampada}) · [▶ Esfregar](${esfregar}) · [▶ Três](${tres}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **desejos** (“wishes”; singular **desejo**). After rubbing the [lamp](${lampada}), this is the **content** the genie is paid to deliver. Living PT: will / appetite / project. In popular [Aladdin](${wikiAladim}) retellings, wishes come as a **pack** — often [three](${tres}). A wish **points**; craft **walks**. Links: [esfregar](${esfregar}), [abracadabra](${abracadabra}), [Valeu !!!](${mantra}).

> Sources: [desejo](${WIKI}), [*desiderium*](${wiktDesiderium}). **Not a wish-list, not clinical psychology.** *De + sidus* is etymology, not a horoscope, not [twins](${gemeos}).

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **desejos** · **desejo** |
| Path | Lat. *desiderium* |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** three wishes settle the life.  
**Is:** a tale quota. The lab translates one wish into one [gesture](${gesto}).

## 3. Correction

**Wishes point; craft fulfils.** If the mouth said **3**, see [três](${tres}). Close with [Valeu !!!](${mantra}), not the third wish.

## Status

**Approved** — will × tale pack; quota on the sister sheet.

[▶ Words](${hub}) · [▶ Lamp](${lampada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **desejos** («deseos»; singular **desejo**). Tras frotar la [lámpara](${lampada}), es el **contenido** que el genio entrega. PT vivo: voluntad / apetito / proyecto. En recontos populares de [Aladino](${wikiAladim}), los deseos vienen en **pack** — a menudo [tres](${tres}). El deseo **apunta**; el oficio **anda**. Vínculos: [esfregar](${esfregar}), [abracadabra](${abracadabra}), [¡Valeu !!!](${mantra}).

> Fuentes: [desejo](${WIKI}), [*desiderium*](${wiktDesiderium}). **No es lista de pedidos ni psicología clínica.** *De + sidus* es étimo, no horóscopo.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **desejos** · **desejo** |
| Camino | lat. *desiderium* |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** tres deseos resuelven la vida.  
**Es:** cuota de cuento. El lab traduce un deseo en un [gesto](${gesto}).

## 3. Corrección

**Los deseos apuntan; el oficio cumple.** Si la boca dijo **3**, ver [três](${tres}). Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — voluntad × pack del cuento; cuota en la ficha hermana.

[▶ Palabras](${hub}) · [▶ Lámpara](${lampada}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildDesejosPost() {
  const { body, contentEn, contentEs, wiki } = buildDesejosBodies();
  let seriesOrder = 125;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-desejos');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 125 */
  }

  const post = makePalavra({
    title: 'Inspeção: Desejos — vontade, pack da lâmpada e o ofício que não pede',
    titleEn: 'Inspection: Desejos — will, lamp pack, and the craft that does not ask',
    titleEs: 'Inspección: Desejos — voluntad, pack de la lámpara y el oficio que no pide',
    excerpt:
      'Palavras: «desejos» (*desiderium*) — vontade viva × pack do génio; quota muitas vezes três; ≠ gesto; elos lâmpada, esfregar e três; Valeu !!!',
    excerptEn:
      'Words: “desejos” (*desiderium*) — living will × genie pack; quota often three; ≠ gesture; links lamp, rub and three; Valeu !!!',
    excerptEs:
      'Palabras: «desejos» (*desiderium*) — voluntad × pack del genio; cuota a menudo tres; ≠ gesto; vínculos lámpara, frotar y tres; ¡Valeu !!!',
    slug: 'inspecao-palavra-desejos',
    date: '2026-08-20T02:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Desejos · palavra',
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
  buildDesejosPost,
  buildDesejosBodies
};
