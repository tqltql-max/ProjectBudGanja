'use strict';

/**
 * Inspeção Palavras · Três / 3
 * Eixos: lat. tres · quota dos três desejos · ≠ constante física
 * Ficha de palavra-número no mapa da lâmpada, não tratado de aritmética.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/tres-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/tr%C3%AAs';

function buildTresBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-tres.html';
  const desejos = '/posts/post-inspecao-palavra-desejos.html';
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
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';
  const wiktEn = 'https://en.wiktionary.org/wiki/three';
  const motif = 'https://en.wikipedia.org/wiki/Rule_of_three_(writing)';

  const body = `## Escopo

Inspeção editorial do **[três](${self})** (algarismo **3**, grafia viva **tres**). Pedido de campo, a seguir a *desejos*: a **quota** do conto — os **três desejos**. Não é ficha de aritmética nem de Trindade. No mapa BudGanja, **3** é a **regra embalada** das recontagens populares de [Aladim](${wikiAladim}): [esfregar](${esfregar}) a [lâmpada](${lampada}), pedir [desejos](${desejos}), gastar **três**. Esta ficha cobre o **objecto numeral**, a **convenção narrativa** (*rule of three*) e a **correção**: três não é método. Elos: [abracadabra](${abracadabra}), [gesto](${gesto}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · três](${WIKI}), [three](${wiktEn}), [rule of three](${motif}), [Aladim](${wikiAladim}). **Ficha ≠ matemática, ≠ teologia, ≠ plot Disney autenticado.** No texto clássico das *Mil e Uma Noites* o génio da lâmpada **não** fica preso a uma constante «3» que o lab possa jurar. O **3** que o campo pediu é o **pack ocidental / popular**. Sem inventar episódios.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **três** |
| Formas do pedido | **3** · **tres** (sem acento) · *três desejos* |
| Classe | Numeral (cardinal) · também quota de conto |
| Étimo | Lat. *trēs* — confiança: **alta** |
| Tipo BudGanja | Palavra-número — quota do pack × padrão narrativo |
| Elo pack | [desejos](${desejos}) · [lâmpada](${lampada}) · [esfregar](${esfregar}) |
| Elo ofício | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [pattern](${pattern}) |
| Elo armadilha | [gêmeos](${gemeos}) (2, não 3) · [genial](${genial}) (rasto, não quota) |
| Fonte | [três](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **dois+um** da fala — e, neste circuito, o **teto de pedidos** que o conto ensina a gastar depressa.

## 2. Três camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Número** | Cardinal 3 · lat. *trēs* | Alta |
| **Quota do conto** | Três [desejos](${desejos}) nas recontagens populares | Alta como convenção; **baixa** como «lei do Aladim clássico» |
| **Padrão narrativo** | Começos / provas / irmãos em trinca — [pattern](${pattern}) da boca | Alta (escrita); não é física |
| **Lapso tres** | Mesma palavra sem acento | Alta (teclado BR) |

**H1:** *três* = *trēs*. **3** é o mesmo objecto em algarismo.  
**H2:** a quota é **embalagem**, não watt.  
**H3:** [gêmeos](${gemeos}) é **par** (2). Colar 3 ao signo é outra mistura.

## 3. O 3 no mapa da lâmpada

| Papel | Ficha | O 3 faz o quê? |
|-------|-------|----------------|
| **Vaso** | [Lâmpada](${lampada}) | Um objecto — não três lâmpadas |
| **Cue** | [Esfregar](${esfregar}) | Um gesto de conto (às vezes repetido) |
| **Crédito** | [Desejos](${desejos}) | Pack cuja etiqueta popular é **3** |
| **Espírito** | [Genial](${genial}) | Engenho: **sem** quota mágica |
| **Ofício** | [Faça o melhor!](${mantra}) | Um feito hoje — não três milagres |

**Tese:** o **3** fecha o pack para a história **acabar**. O lab não precisa de fechar o dia em trinca.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Conto** | A lâmpada *deve* três pedidos | Convenção de reconto; clássico varia |
| **Sorte** | Terceira vez é a vencida | [Pattern](${pattern}) oral, não [verdade](${verdade}) medida |
| **Par** | Três = gêmeos + génio | [Gêmeos](${gemeos}) = 2; génio ≠ número |
| **Ofício** | Três passos = método | Método é rasto; o número é etiqueta |

**Veredicto contraste:** parece constante do cobre; é **teto narrativo**.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «São sempre três desejos» | Pack popular; não jures o clássico |
| «Gastei os 3, acabou o poder» | Acabou a **cena**. O [caminho](${caminho}) não tem quota |
| «Faça o melhor três vezes e está genial» | [Genial](${genial}) mede rasto, não trinca ritual |
| «3 = tríade do circuito» | Circuito do lab = interruptor · ligar · luz — **não** é esta ficha a forçar o 3 |

### Ofício do número (mapa curto)

1. Se o pedido foi **3** depois de **desejos**, ler **quota do conto**.  
2. Não inventar o terceiro episódio de Aladim.  
3. Traduzir **um** [desejo](${desejos}) em **um** [gesto](${gesto}).  
4. Fechar com [Faça o melhor!](${mantra}) **neste** passo — o 2 e o 3 vêm se o rasto pedir, não se a etiqueta pedir.

**Veredicto correção:** **3 = teto de história.** Ofício conta **um**.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Contar** | «são três» | Bom: cardinal · Mau: misturar com magia |
| **Conto** | «os três desejos» | Bom: nomear o pack · Mau: lei da vida |
| **Teclado** | «3» / «tres» | Bom: mesma âncora **três** |
| **Provérbio** | «à terceira é de vez» | Bom: [pattern](${pattern}) · Mau: desculpa para repetir erro |

## 7. Anti-quota · Faça o melhor!

| Armadilha | Leitura |
|-----------|---------|
| **Teto = método** | Acabar a cena ≠ acabar o ofício |
| **3 = par** | [Gêmeos](${gemeos}) é dois |
| **3 esfregas** | [Esfregar](${esfregar}) continua um verbo, não um ritual de trinca |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor **neste** um |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | Esperar o terceiro milagre em vez do clique ([ligar](${ligar})) |
| Rede | [desejos](${desejos}) · [lâmpada](${lampada}) · [esfregar](${esfregar}) · [abracadabra](${abracadabra}) |

## Hipóteses (síntese)

**H1:** *três* / **3** / *tres* = o mesmo cardinal (*trēs*).  
**H2:** no circuito Aladim do lab, 3 = **etiqueta do pack** de [desejos](${desejos}).  
**H3:** não autenticar o clássico nem a Disney.  
**H4:** fecho [Faça o melhor!](${mantra}); ficha ≠ aritmética.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Desejos](${desejos}) | O que a quota conta |
| [Lâmpada](${lampada}) · [Esfregar](${esfregar}) | Vaso e cue |
| [Abracadabra](${abracadabra}) · [Genial](${genial}) | Fórmula × engenho |
| [Pattern](${pattern}) · [Gesto](${gesto}) · [Caminho](${caminho}) | Trinca narrativa ≠ passo de ofício |
| [Gêmeos](${gemeos}) | O **2** — não colar |
| [Guia](${guia}) · [Verdade](${verdade}) | Âncora |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Um, hoje |

## Limites

- Não ensina numerologia.  
- Não decide quantos pedidos «o Aladim verdadeiro» tinha.  
- Não reduz o circuito eléctrico a uma trinca forçada.

## Status

**Aprovado** — **três** / **3** fichado como cardinal e **quota popular** dos [desejos](${desejos}); clássico não jurado; fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Desejos](${desejos}) · [▶ Lâmpada](${lampada}) · [▶ Esfregar](${esfregar}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **três** (digit **3**, typed **tres**). After *desejos*, this is the **quota** of the tale — **three wishes**. Not arithmetic, not theology. In popular [Aladdin](${wikiAladim}) retellings: [rub](${esfregar}) the [lamp](${lampada}), spend **three** [wishes](${desejos}). The classical *Nights* lamp-genie is **not** a constant the lab can swear. **3** here is the **popular pack**. Links: [abracadabra](${abracadabra}), [Do your best!](${mantra}).

> Sources: [três](${WIKI}), [rule of three](${motif}). **Not Disney plot authentication.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **três** · **3** · **tres** |
| Path | Lat. *trēs* |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** the lamp *owes* three wishes.  
**Is:** a narrative ceiling. Craft counts **one** [gesture](${gesto}).

## 3. Correction

**3 = story cap.** Do not invent the third Aladdin episode. Close with [Do your best!](${mantra}) on **this** step.

## Status

**Approved** — cardinal + popular wish quota; classic not sworn.

[▶ Words](${hub}) · [▶ Wishes](${desejos}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **três** (dígito **3**, teclado **tres**). Tras *desejos*, es la **cuota** del cuento — **tres deseos**. No es aritmética ni teología. En recontos populares de [Aladino](${wikiAladim}): [frotar](${esfregar}) la [lámpara](${lampada}), gastar **tres** [deseos](${desejos}). El clásico de las *Noches* **no** fija un 3 que el lab pueda jurar. **3** aquí es el **pack popular**. Vínculos: [abracadabra](${abracadabra}), [¡Haz lo mejor!](${mantra}).

> Fuentes: [três](${WIKI}), [rule of three](${motif}). **No autentica el plot Disney.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **três** · **3** · **tres** |
| Camino | lat. *trēs* |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** la lámpara *debe* tres deseos.  
**Es:** techo narrativo. El oficio cuenta **un** [gesto](${gesto}).

## 3. Corrección

**3 = tope de historia.** No inventar el tercer episodio. Cerrar con [¡Haz lo mejor!](${mantra}) en **este** paso.

## Estado

**Aprobada** — cardinal + cuota popular; clásico no jurado.

[▶ Palabras](${hub}) · [▶ Deseos](${desejos}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTresPost() {
  const { body, contentEn, contentEs, wiki } = buildTresBodies();
  let seriesOrder = 126;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-tres');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 126 */
  }

  const post = makePalavra({
    title: 'Inspeção: Três — o 3, a quota dos desejos e o teto que não é método',
    titleEn: 'Inspection: Três — 3, the wish quota, and the cap that is not a method',
    titleEs: 'Inspección: Três — el 3, la cuota de deseos y el tope que no es método',
    excerpt:
      'Palavras: «três» / 3 — cardinal (*trēs*) e quota popular dos três desejos da lâmpada; ≠ lei do clássico; elos desejos, esfregar e lâmpada; Faça o melhor!',
    excerptEn:
      'Words: “três” / 3 — cardinal (*trēs*) and popular three-wish quota; ≠ classical law; links wishes, rub and lamp; Do your best!',
    excerptEs:
      'Palabras: «três» / 3 — cardinal (*trēs*) y cuota popular de tres deseos; ≠ ley clásica; vínculos deseos, frotar y lámpara; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tres',
    date: '2026-08-20T02:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Três · palavra',
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
  buildTresPost,
  buildTresBodies
};
