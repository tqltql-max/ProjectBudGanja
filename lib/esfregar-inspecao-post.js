'use strict';

/**
 * Inspeção Palavras · Esfregar
 * Eixos: lat. fricare · gesto do conto (lâmpada) · ≠ clique / ligar
 * Ficha de palavra, não manual de limpeza nem grimório.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/esfregar-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/esfregar';

function buildEsfregarBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-esfregar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lampada = '/posts/post-inspecao-palavra-lampada.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const desejos = '/posts/post-inspecao-palavra-desejos.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';
  const wiktEn = 'https://en.wiktionary.org/wiki/rub';

  const body = `## Escopo

Inspeção editorial da palavra **[esfregar](${self})** — o **gesto falso do conto** no mapa da [lâmpada](${lampada}). Pedido de campo, a seguir a *lâmpada*: a mão no cobre. No quarto, esfregar é **fricção** (limpar, aquecer, polir). No ciclo de [Aladim](${wikiAladim}), esfregar é o **cue da mão** que chama o génio — primo táctil de [abracadabra](${abracadabra}) (cue da boca). Esta ficha cobre o **objecto**, o **étimo** (*fricare*), o **choque conto × circuito** e a **correção**: esfregar a cúpula **não** é [ligar](${ligar}). Elos: [gesto](${gesto}), [desejos](${desejos}), [três](${tres}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · esfregar](${WIKI}), [rub](${wiktEn}), [Aladim](${wikiAladim}), [lâmpada](${lampada}). **Ficha ≠ manual de limpeza, ≠ protocolo eléctrico, ≠ conto autorizado.** Sem afiliação a palco ou franquia.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **esfregar** |
| Classe | Verbo |
| Étimo (trabalho) | Lat. *fricare* / *exfricare* «esfregar, gastar por atrito» — confiança: **alta** |
| Família | *fricção* · *esfregão* · *esfregaça* |
| Tipo BudGanja | Palavra — gesto do conto × gesto do ofício |
| Elo conto | [lâmpada](${lampada}) · [desejos](${desejos}) · [três](${tres}) · [abracadabra](${abracadabra}) |
| Elo ofício | [gesto](${gesto}) · [ligar × desligar](${ligar}) · [interruptor](${interruptor}) · [mãos](${maos}) |
| Elo armadilha | [genial](${genial}) (engenho ≠ atrito mágico) · [gêmeos](${gemeos}) (par ≠ fricção) |
| Fonte | [esfregar](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **verbo da palma no objecto**. No lab, só conta se deixar rasto inspeccionável (limpo, quente, polido). No conto, o rasto é o génio — atalho.

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ofício doméstico** | Limpar / polir / aquecer por atrito — vizinho de [lavar](${lavar}) | Alta |
| **Cue do conto** | Esfregar a [lâmpada](${lampada}) = chamar o génio | Alta (conto); baixa como física |
| **Falso ligar** | Confundir fricção com [clique](${ligar}) | Alta (armadilha do lab) |

**H1:** *esfregar* é **fricção**; [ligar](${ligar}) é **circuito**.  
**H2:** a mão no conto **salta** o [interruptor](${interruptor}).  
**H3:** [abracadabra](${abracadabra}) é a boca; esfregar é a **pele**. Os dois pedem resultado sem [caminho](${caminho}).

## 3. Esfregar × clique × fórmula

| Gesto | Onde | O que o lab lê |
|-------|------|----------------|
| **Esfregar** | Conto / limpeza | Cue táctil ou ofício de atrito |
| **Clique** | Quarto | [Ligar × desligar](${ligar}) — rasto (luz, watt, [risco](${risco})) |
| **Abracadabra** | Palco | Cue oral — ficha [abracadabra](${abracadabra}) |
| **Pedir** | Boca no génio | Pack de [desejos](${desejos}), muitas vezes [três](${tres}) |

**Tese:** no quarto, a palma certa pousa no [interruptor](${interruptor}). Esfregar o vidro é teatro ou limpeza — não é o verbo do circuito.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Conto** | A fricção *acorda* o espírito | Convenção da história; a [lâmpada](${lampada}) é vaso |
| **Quarto** | Esfregar a lâmpada *liga* | Ligar é clique + fio |
| **Elogio** | «Esfrega que sai génio» | [Genial](${genial}) pede [skill](${skill}), não atrito |
| **Par** | Dois esfregam juntos = [gêmeos](${gemeos}) | Par ≠ gesto |

**Veredicto contraste:** parece o interruptor do milagre; é **gesto de conto** ou **ofício de limpeza**.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Esfrega a lâmpada e resolve» | No quarto: [ligar](${ligar}). No lab: [gesto](${gesto}) com rasto |
| «Esfregar = magia» | Esfregar = *fricare*. Magia = atalho. Ofício = [caminho](${caminho}) |
| «Não preciso de clique se esfregar bem» | Fricção não fecha circuito |
| «O génio vem da palma» | O génio vem do **conto**; a palma no lab limpa ou carrega |

### Ofício da palma (mapa curto)

1. Se a boca pediu **esfregar** depois de **lâmpada**, ler **cue do conto**.  
2. No quarto: palma no [interruptor](${interruptor}), não na cúpula.  
3. Se for limpeza, é ofício — vizinho de [lavar](${lavar}), com [risco](${risco}) (calor, vidro).  
4. Fechar com [Valeu !!!](${mantra}) **nesta** mão, hoje.

**Veredicto correção:** **esfregar ≠ ligar.** Cue táctil do conto; clique é o [gesto](${gesto}) do lab.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Casa** | «esfrega o fogão» | Bom: ofício · Mau: violência no objecto |
| **Corpo** | «esfrega as mãos (frio)» | Bom: atrito visível · Mau: ritual vazio |
| **Conto** | «esfrega a lâmpada» | Bom: nomear o cue · Mau: copiar para o soquete |
| **Gíria** | «esfregar na cara» | Humilhar ≠ [verdade](${verdade}) do feito |

## 7. Anti-esfrega · Valeu !!!

| Armadilha | Leitura |
|-----------|---------|
| **Fricção = circuito** | *Fricare* ≠ watt |
| **Palma = génio** | Inquilino do vaso; ver [lâmpada](${lampada}) |
| **Três esfregas = três desejos** | Quota é ficha [três](${tres}); gesto continua um |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor **nesta** palma, com rasto |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Esfregar a cúpula em vez do clique = falso ofício |
| Rede | [gesto](${gesto}) · [lâmpada](${lampada}) · [ligar](${ligar}) · [desejos](${desejos}) |

## Hipóteses (síntese)

**H1:** *esfregar* = *fricare* (atrito).  
**H2:** no conto é cue; no quarto é limpeza ou erro de circuito.  
**H3:** boca = [abracadabra](${abracadabra}); pele = esfregar; efeito pedido = [desejos](${desejos}) em [três](${tres}).  
**H4:** fecho [Valeu !!!](${mantra}); ficha ≠ grimório.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Lâmpada](${lampada}) | Vaso que o conto manda esfregar |
| [Ligar × desligar](${ligar}) · [Interruptor](${interruptor}) | Verbo e peça do quarto |
| [Desejos](${desejos}) · [Três](${tres}) | O que o cue tenta comprar |
| [Gesto](${gesto}) · [Skill](${skill}) · [Mãos](${maos}) | Palma com rasto |
| [Abracadabra](${abracadabra}) · [Genial](${genial}) | Cue oral × engenho |
| [Guia](${guia}) · [Verdade](${verdade}) | Âncora |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem teatro |

## Limites

- Não ensina massagem, limpeza industrial nem instalações.  
- Não autentica o conto de Aladim.  
- Não prescreve quantas esfregas «funcionam».

## Status

**Aprovado** — **esfregar** fichado como atrito (*fricare*); cue do conto ≠ clique do lab; elos [lâmpada](${lampada}), [gesto](${gesto}), [desejos](${desejos}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Lâmpada](${lampada}) · [▶ Gesto](${gesto}) · [▶ Ligar × desligar](${ligar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **esfregar** (“to rub”) — the **tale’s false gesture** on the [lamp](${lampada}) map. In the room, rubbing is friction (clean, warm, polish). In [Aladdin](${wikiAladim}) it is the **hand cue** that summons the genie — tactile cousin of [abracadabra](${abracadabra}). Rubbing the bulb is not [turning it on](${ligar}). Links: [gesture](${gesto}), [wishes](${desejos}), [three](${tres}), [Valeu !!!](${mantra}).

> Sources: [esfregar](${WIKI}), [Aladdin](${wikiAladim}). **Not a cleaning manual, not an electrical protocol.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **esfregar** · Lat. *fricare* |
| Not | [Ligar](${ligar}) (circuit) · the genie · [twins](${gemeos}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** friction *wakes* the spirit.  
**Is:** friction is craft or theatre. The switch is the lab [gesture](${gesto}).

## 3. Correction

**Rub ≠ on.** Palm on the [switch](${interruptor}), not on the glass. Close with [Valeu !!!](${mantra}) in this hand.

## Status

**Approved** — friction sheet; tale cue × circuit click.

[▶ Words](${hub}) · [▶ Lamp](${lampada}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **esfregar** («frotar») — el **gesto falso del cuento** en el mapa de la [lámpara](${lampada}). En el cuarto, frotar es fricción. En [Aladino](${wikiAladim}) es la **señal de la mano** que llama al genio — primo táctil de [abracadabra](${abracadabra}). Frotar el vidrio no es [encender](${ligar}). Vínculos: [gesto](${gesto}), [deseos](${desejos}), [tres](${tres}), [¡Valeu !!!](${mantra}).

> Fuentes: [esfregar](${WIKI}), [Aladino](${wikiAladim}). **No es manual de limpieza ni protocolo eléctrico.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **esfregar** · lat. *fricare* |
| No es | [Ligar](${ligar}) · el genio · [gêmeos](${gemeos}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** la fricción *despierta* al espíritu.  
**Es:** fricción es oficio o teatro. El interruptor es el [gesto](${gesto}) del lab.

## 3. Corrección

**Frotar ≠ encender.** Palma en el [interruptor](${interruptor}), no en el vidrio. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — ficha de fricción; señal del cuento × clic del circuito.

[▶ Palabras](${hub}) · [▶ Lámpara](${lampada}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildEsfregarPost() {
  const { body, contentEn, contentEs, wiki } = buildEsfregarBodies();
  let seriesOrder = 124;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-esfregar');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 124 */
  }

  const post = makePalavra({
    title: 'Inspeção: Esfregar — fricção, cue da lâmpada e o clique que não é',
    titleEn: 'Inspection: Esfregar — friction, lamp cue, and the click it is not',
    titleEs: 'Inspección: Esfregar — fricción, señal de la lámpara y el clic que no es',
    excerpt:
      'Palavras: «esfregar» (*fricare*) — gesto do conto na lâmpada de Aladim × clique do interruptor; ≠ ligar; elos gesto, desejos e três; Valeu !!!',
    excerptEn:
      'Words: “esfregar” (*fricare*) — Aladdin lamp cue × switch click; ≠ turning on; links gesture, wishes and three; Valeu !!!',
    excerptEs:
      'Palabras: «esfregar» (*fricare*) — señal de Aladino × clic del interruptor; ≠ encender; vínculos gesto, deseos y tres; ¡Valeu !!!',
    slug: 'inspecao-palavra-esfregar',
    date: '2026-08-20T02:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Esfregar · palavra',
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
  buildEsfregarPost,
  buildEsfregarBodies
};
