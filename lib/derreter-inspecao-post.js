'use strict';

/**
 * Inspeção Palavras · Derreter
 * Esp. derretir ← lat. dēterō × rēterō (terere «esfregar»).
 * Pedido de campo: «derver» — boca rápida da mesma peça.
 * ≠ dever ≠ derrota ≠ lava ≠ dissolver.
 * Par de ofício: neve (o sólido que este verbo devolve à água).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/derreter-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/derreter';
const WIKT_EN = 'https://en.wiktionary.org/wiki/derreter';
const WIKT_ES = 'https://en.wiktionary.org/wiki/derretir';
const WIKT_DETERO = 'https://en.wiktionary.org/wiki/detero#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Derreter.
Não é dever.
Não é derrota.
É o sólido que volta a água.

A neve cobre.
O gelo prende.
Derreter solta.

Calor no ofício.
Não é lava.
Não é dissolver no copo.

Derver —
a boca rápida
da mesma peça.

Quem se derrete de amor
usa a figura.
Quem derrete o ouro
usa o grau.

Valeu !!!
o estado no tempo certo
e a água de volta.`;
}

function poemEn() {
  return `Derreter.
Not duty (dever).
Not defeat (derrota).
It is the solid returning to water.

Snow covers.
Ice holds.
Melting lets go.

Heat in the craft.
Not lava.
Not dissolving in a glass.

Derver —
the fast mouth
of the same piece.

Whoever melts with love
uses the figure.
Whoever melts the gold
uses the degree.

Valeu !!!
the state in the right time
and the water back.`;
}

function poemEs() {
  return `Derreter.
No es deber.
No es derrota.
Es el sólido que vuelve al agua.

La nieve cubre.
El hielo prende.
Derretir suelta.

Calor en el oficio.
No es lava.
No es disolver en el vaso.

Derver —
la boca rápida
de la misma pieza.

Quien se derrite de amor
usa la figura.
Quien derrite el oro
usa el grado.

¡Valeu !!!
el estado a tiempo
y el agua de vuelta.`;
}

function buildDerreterBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-derreter.html';
  const neve = '/posts/post-inspecao-palavra-neve.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const invernagem = '/posts/post-inspecao-palavra-invernagem.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';
  const qa = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';

  const body = `## Escopo

Inspeção editorial da palavra **[Derreter](${self})**. Pedido de campo: *inspeção palavra neve e derver*.

*Derreter* é o verbo do **sólido que volta a líquido pelo calor** (esp. *derretir* ← cruzamento lat. *dēterō* × *rēterō*, de *terere* «esfregar, gastar»). *Derver* é a **boca rápida** da mesma peça — não é lema, não é [dever](${self}#3-o-que-a-orelha-cola). Esta ficha cobre o étimo, o ciclo com **[neve](${neve})** / [gelo](${gelo}) / [água](${agua}), as salas (ofício × figura × gasto) e os cortes *dever* / *derrota* / [lava](${lava}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · derreter](${WIKT}), EN [*derreter*](${WIKT_EN}), [*derretir*](${WIKT_ES}), lat. [*dēterō*](${WIKT_DETERO}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}) · [conjugação](${conjugacao}). **Ficha ≠ manual de fundição, ≠ conselho financeiro, ≠ receita de chocolate.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *derreter* / *derreti* / *derretido* / *derretimento* / *derver* / *derretir* / *se derrete*.

No Q&A de [Tamara](${tamara}) o transcrito já marca *derreter*, *derreti* e *derretimento* ao lado de [neve](${neve}) — o par pedia ficha.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **derreter** |
| Forma de campo | **derver** — sílaba comida; mesma peça |
| Classe | Verbo (2.ª conjugação; também pronominal *derreter-se*) |
| Étimo (trabalho) | Cruzamento lat. *dēterō* «gastar, esfregar» × *rēterō* «esfregar de novo» ← *terere* — confiança: **média-alta** (Coromines no ramo hispânico) |
| Via | Galego-português medieval *derreter* / *rreter*; esp. *derretir* |
| Família viva | *derretido* · *derretimento* · *derreter-se* · *irresistível* (figura de amor — **não** étimo) |
| Tipo BudGanja | Palavra — gesto térmico do ciclo da [água](${agua}) |
| Par de ofício | [Neve](${neve}) — a cobertura que este verbo **solta** |
| Não é | *dever* (dívida / obrigação) · *derrota* · [lava](${lava}) · dissolver · [lavar](${lavar}) |
| Data | ${inspected} |
| Fonte | [derreter](${WIKT}) · [*derretir*](${WIKT_ES}) |

**O que é o objecto:** o vocábulo que nomeia a **mudança de estado** sólido → líquido **pelo calor**. Não é a obrigação (*dever*). Não é a derrota. Não é a [lava](${lava}) (rocha fundida — outro étimo, outro ofício).

## 2. Latim — *terere* no cruzamento

O espanhol [*derretir*](${WIKT_ES}) descreve um **portmanteau**: lat. *dēterō* («gastar esfregando») × *rēterō* («esfregar outra vez»), ambos de *terere* «esfregar, pisar, gastar». O inglês *detriment* é **primo** do primeiro ramo (*dētrīmentum*). O português *derreter* é o irmão galego-português. Confiança **média-alta**: a via é romance estável; o cruzamento exacto é hipótese de dicionário etimológico, não consenso de escola.

O galego medieval já junta o par desta ficha: *se começã a rreter et deslyr as neues et as geadas* — «começam a derreter e a rarear as neves e as geadas» (General Estoria, séc. XIV). A [neve](${neve}) e o derreter **nasceram na mesma frase**.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| Lat. **terere** | Esfregar / gastar | Alta |
| Lat. **dēterō** | Gastar para baixo / desgastar | Alta |
| Esp. **derretir** | Cruzamento *dēterō* × *rēterō* | Média-alta |
| PT/GL **derreter** | Mesmo étimo hispânico | Média-alta |
| EN *melt* | Germânico — **equivalente**, não cognato | Alta |
| EN *detriment* | Primo de *dēterō* — ofício de **dano**, não de degelo | Alta |

**H-não-cognato:** *melt* traduz; não herda. **H-detriment:** a orelha erudita cola *derreter* em *detriment*; o ofício **corta** — um gasta a coisa por atrito; o outro **solta** o sólido em líquido.

## 3. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **derver** | Lema à parte | Forma de campo de *derreter* (boca rápida) |
| **derver** = **dever** | A mesma peça | Gesto térmico × obrigação / dívida (lat. *dēbēre*) |
| **derreter** = **derrota** | A mesma boca | Degelo × *de-rotare* / vencimento |
| **derreter** = [lavar](${lavar}) | Água em movimento | Calor que **funde** × água que **lava** |
| **derreter** = [lava](${lava}) | «Tudo que funde» | Água/metal no grau × rocha do vulcão |
| **derreter** = dissolver | O sólido some | Calor (estado) × solvente (mistura) |
| **derretido** (amor) | O étimo | Figura — o peito no grau da [neve](${neve}) que cede |

**H-campo:** *derver* entra no laboratório como **o que foi pedido**. Catalogar a boca ≠ corrigir a pessoa. A forma canónica fica *derreter*.

## 4. Quatro salas — a mesma boca

| Sala | Leitura | Exemplo | O que estudar |
|------|---------|---------|----------------|
| **A. Ofício** | Sólido → líquido pelo [calor](${calorFrio}) | manteiga, gelo, neve, ouro | Secção 5 |
| **B. Ciclo** | [Neve](${neve}) / [gelo](${gelo}) → [água](${agua}) | degelo, [invernagem](${invernagem}) | Secção 6 |
| **C. Figura** | Peito / dinheiro / vontade | «derrete-se por»; «derreteu a grana» | Secção 7 |
| **D. Campo** | *Derver* e as colas | dever · derrota · lava | Secção 3 |

## 5. Sala A — ofício (o grau que solta)

Aqui *derreter* é **gesto medido**: o [calor](${calorFrio}) atravessa o ponto de fusão. Sem número, é impressão. Com número, é ofício. O [fogo](${fogo}) é **fonte**; derreter é o **efeito** no sólido.

| Corte | Leitura |
|-------|---------|
| Derreter ≠ [fogo](${fogo}) | Efeito × fonte |
| Derreter ≠ [lava](${lava}) | Água/metal/gordura × magma |
| Derreter ≠ dissolver | Estado (calor) × mistura (solvente) |
| *Derretido* (culinária) | Ponto certo — não é incêndio |

**H-tenda:** esta ficha **não** ensina a fundir metal nem a derreter gordura na [tenda](/posts/post-inspecao-palavra-tenda.html). Nomeia o vocábulo.

## 6. Sala B — ciclo (neve × gelo × água)

[Neve](${neve}) cobre. [Gelo](${gelo}) prende. **Derreter** solta. A [água](${agua}) recebe. Sem este verbo, o Ártico de [Tamara](${tamara}) fica só prisão; com ele, a manta **é também reserva**. [*Bom dia, Inverno*](${bomDia}) cumprimenta a estação; derreter mede o **fim** da manta.

| Peça | Papel no ciclo |
|------|----------------|
| [Neve](${neve}) | Cristal / cobertura |
| [Gelo](${gelo}) | Bloco / casco |
| **Derreter** | Gesto / degelo |
| [Água](${agua}) | Destino / fonte de novo |
| [Inverno](${inverno}) | Época — não é o verbo |
| [Risco](${risco}) | Degelo fora de hora (cheia, casco, tenda) |

**H-par:** as duas fichas são **um ofício, duas bocas** — estado (*neve*) × gesto (*derreter*).

## 7. Sala C — figura (amor · gasto)

*Derreter-se* por alguém é **figura de grau**: o peito cede como a [neve](${neve}). *Derreter dinheiro* é figura de **gasto** (o galego já registava «consumir os bens»). Nenhuma das duas é o étimo *terere*. São **ofícios emprestados**.

| Figura | Leitura lab | Corte |
|--------|-------------|-------|
| Amor | O peito no ponto de fusão | ≠ fundição |
| Dinheiro | Consumir o ter | ≠ conselho financeiro |
| Chocolate / queijo | Culinária no grau | Esta ficha **não** é receita |

## 8. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Catalogar *derver* como boca de *derreter* |
| Bom | Ligar o ciclo [neve](${neve}) → derreter → [água](${agua}) |
| Bom | Cortar *dever* / *derrota* / [lava](${lava}) antes de traduzir |
| Bom | Separar ofício (calor) de figura (amor / gasto) |
| Mau | «Derver» como lema novo, sem ponte |
| Mau | Tutorial de fundição, de avalanche ou de gastar |
| Mau | Fundir derreter, [lavar](${lavar}) e dissolver num só sopro |

Fecho: [Valeu !!!](${mantra}) — o sólido *deste* grau *hoje*.

## 9. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vidaHub}#poema=derreter)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Neve](${neve}) | O estado — par desta ficha |
| [Gelo](${gelo}) · [água](${agua}) | Bloco × líquido |
| [Calor × frio](${calorFrio}) · [fogo](${fogo}) | Grau e fonte |
| [Lava](${lava}) · [lavar](${lavar}) | Rocha fundida × água que lava — **não** este verbo |
| [Inverno](${inverno}) · [invernagem](${invernagem}) · [*Bom dia, Inverno*](${bomDia}) · [Tamara](${tamara}) | Época, ofício, lote, [Q&A](${qa}) |
| [Conjugação](${conjugacao}) | *derreto / derreti / derretido* |
| [latim](${latim}) · [étimo](${etimo}) · [etimologia](${etimologia}) | *terere* / *dēterō* |
| [língua portuguesa](${lingua}) · [A orelha cola](${orelhaCola}) | *derver* × *dever* |
| [Guia](${guia}) · hub [Palavras](${hub}) | Mapa |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Ofício e fecho |

## Limites

- Não ensina a fundir, a degelar tenda nem a «derreter» património.  
- *Dever* (obrigação) fica **cortado**; pode ganhar ficha própria.  
- *Dissolver* fica vizinho; não é sinónimo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **derreter** fichado (lat. *dēterō* × *rēterō* / *terere*; confiança média-alta); forma de campo **derver**; cortes *dever* / *derrota* / [lava](${lava}); par vivo **[neve](${neve})**. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Neve](${neve}) · [▶ Gelo](${gelo}) · [▶ Água](${agua}) · [▶ Calor × frio](${calorFrio}) · [▶ Lava](${lava}) · [▶ Conjugação](${conjugacao}) · [▶ Tamara](${tamara}) · [▶ Poema Vida](${vidaHub}#poema=derreter) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **Derreter** (to melt). Field request: *neve* and *derver*.

*Derver* is the **fast mouth** of *derreter* — not a separate headword, not *dever* (duty / to owe). Spanish *derretir* is a portmanteau of Latin *dēterō* × *rēterō* (*terere* “to rub, wear down”). Craft pair: **[neve](${neve})** — the cover this verb **releases** back into [water](${agua}).

> Sources: [Wiktionary · derreter](${WIKT}), [*derretir*](${WIKT_ES}). Method: [etymology](${etimologia}). Not a foundry manual. Close: [Valeu !!!](${mantra}).

## Four rooms, one mouth

| Room | Reading |
|------|---------|
| **A. Craft** | Solid → liquid by [heat](${calorFrio}) — [fire](${fogo}) is the source; melting is the effect |
| **B. Cycle** | [Snow](${neve}) covers; [ice](${gelo}) holds; **derreter** lets go; [water](${agua}) receives |
| **C. Figure** | To melt with love; to melt money — borrowed offices, not the etymon |
| **D. Field** | *Derver* · *dever* · *derrota* · [lava](${lava}) — [the ear glues](${orelhaCola}); craft cuts |

Medieval Galician already pairs them: snows and frosts begin *to melt*. EN *melt* translates; it does not inherit. *Detriment* is a cousin of *dēterō* with a **harm** office, not a thaw.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Melt filed. *Derver* mapped. *Dever* cut. Pair: [neve](${neve}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Derreter**. Pedido de campo: *neve* y *derver*.

*Derver* es la **boca rápida** de *derreter* — no es lema aparte, no es *deber*. El español *derretir* es cruce del latín *dēterō* × *rēterō* (*terere* «frotar, gastar»). Par de oficio: **[neve](${neve})** — la cubierta que este verbo **suelta** hacia el [agua](${agua}).

> Fuentes: [Wikcionario · derreter](${WIKT}), [*derretir*](${WIKT_ES}). Método: [etimología](${etimologia}). No es manual de fundición. Cierre: [¡Valeu !!!](${mantra}).

## Cuatro salas, una boca

| Sala | Lectura |
|------|---------|
| **A. Oficio** | Sólido → líquido por el [calor](${calorFrio}) — el [fuego](${fogo}) es fuente; derretir es el efecto |
| **B. Ciclo** | La [nieve](${neve}) cubre; el [hielo](${gelo}) prende; **derreter** suelta; el [agua](${agua}) recibe |
| **C. Figura** | Derritarse de amor; derretir el dinero — oficios prestados, no el étimo |
| **D. Campo** | *Derver* · *deber* · *derrota* · [lava](${lava}) — [la oreja pega](${orelhaCola}); el oficio corta |

El gallego medieval ya junta nieve y derretir en la misma frase. EN *melt* traduce; no hereda.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Derretir fichado. *Derver* mapeado. *Deber* cortado. Par: [neve](${neve}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildDerreterPost() {
  const { body, contentEn, contentEs } = buildDerreterBodies();
  const seriesOrder = pickOrder('inspecao-palavra-derreter', 321);
  return makePalavra({
    title: 'Inspeção: Derreter — o sólido volta a água (campo: derver)',
    titleEn: 'Inspection: Derreter — the solid returns to water (field: derver)',
    titleEs: 'Inspección: Derreter — el sólido vuelve al agua (campo: derver)',
    excerpt:
      'Palavras: Derreter ← dēterō × rēterō; campo derver; ≠ dever ≠ derrota ≠ lava; par neve; Valeu !!!',
    excerptEn:
      'Words: Derreter ← dēterō × rēterō; field derver; ≠ duty ≠ defeat ≠ lava; pair neve; Valeu !!!',
    excerptEs:
      'Palabras: Derreter ← dēterō × rēterō; campo derver; ≠ deber ≠ derrota ≠ lava; par neve; ¡Valeu !!!',
    slug: 'inspecao-palavra-derreter',
    date: '2026-08-24T18:46:00.000Z',
    seriesOrder,
    seriesLabel: 'Derreter',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDerreterPost,
  buildDerreterBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_EN,
  WIKT_ES,
  WIKT_DETERO
};
