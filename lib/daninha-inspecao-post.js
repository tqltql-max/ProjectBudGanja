'use strict';

/**
 * Inspeção Palavras · daninha
 * Eixos: objeto (dano + -inha) · planta daninha · juízo × biologia ·
 * planta / selvagem / cultivo · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildDaninhaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/daninha';
  const wikiDano = 'https://pt.wiktionary.org/wiki/dano';
  const wikiPlanta = 'https://pt.wikipedia.org/wiki/Planta_daninha';

  const body = `## Escopo

Inspeção editorial da palavra **daninha** — no português do Brasil, sobretudo na locução **planta daninha**: o vegetal julgado **indesejado** num cultivo, num jardim ou numa norma. Esta ficha cobre o **objeto** (*dano* + sufixo *-inha*), a diferença entre **juízo de ofício** e **biologia da planta**, a rede com [planta](${planta}) / [Plantas](${plantas}), [selvagem](${selvagem}) e [cultivo](${cultivo}), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · daninha](${wiki}), [dano](${wikiDano}), [Planta daninha (WP)](${wikiPlanta}), série [Palavras](${hub}). **Ficha ≠ manual de herbicida nem lista de espécies.** Tom: Inspetor BudGanja — *daninha* nomeia um **conflito de lugar**, não uma planta «má» em si. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **daninha** (freq. em *planta daninha*) |
| Classe | Adjectivo feminino (também substantivado: «as daninhas») |
| Étimo (trabalho) | *dano* (lat. *damnum*, «prejuízo») + *-inha* (diminutivo / formação adjectival) → «que causa dano» — confiança: **alta** |
| Família | *dano* · *danoso* · *danificar* · *prejuízo* · *planta daninha* |
| Cognatos / paralelos | esp. *maleza* / *planta dañina* · fr. *mauvaise herbe* · ing. *weed* (função; **≠** [maconha](${maconha})) |
| Tipo BudGanja | Palavra — juízo de cultivo × planta viva |
| Elo vivo | [planta](${planta}) · [Plantas](${plantas}) · [selvagem](${selvagem}) |
| Elo ofício | [cultivo](${cultivo}) · [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo léxico antigo | [erva](${erva}) (ponte → planta) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · daninha](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o adjectivo que marca o que **prejudica um plano humano** (cultura, canteiro, norma) — quase sempre uma [planta](${planta}) no sítio «errado» para quem cultiva. No lab: a daninha continua a ser planta; o *dano* é relativo ao [caminho](${caminho}) escolhido.

## 2. Daninha × planta × selvagem × weed

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[planta](${planta})** | Ser vivo vegetal | Neutro / positivo de ofício |
| **daninha** | Planta *julgada* indesejada ali | Juízo de lugar e de plano |
| **[selvagem](${selvagem})** | Da mata / não domesticado | Pode ser aliada ou concorrente — ≠ automaticamente daninha |
| **weed (EN)** | Função «indesejada» *ou* gíria de cannabis | No BR lab: **não** traduzir *weed* → daninha para [maconha](${maconha}) |
| **[erva](${erva})** | Ficha antiga | Preferir **planta**; daninha é outro eixo (juízo) |

**H1:** *daninha* vem de *dano* — nomeia **prejuízo relativo**, não essência moral da planta.  
**H2:** «planta daninha» é categoria de **manejo**, não de taxonomia.  
**H3:** no BudGanja, inspecionar *quem* chama daninha e *para que cultivo* — com [verdade](${verdade}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Agrícola / jardim** | Concorrente de água, luz, nutrientes | Alta |
| **Juízo de lugar** | «Não quero isto aqui» | Alta (uso vivo) |
| **Substantivo** | «Arrancar as daninhas» | Alta |
| **Risco de desprezo** | Tratar a planta como lixo sem olhar o ecossistema | Alta (armadilha) |
| **Confusão EN** | *Weed* ≠ daninha ≠ maconha | Alta (mapa lab) |
| **Ofício lab** | Manejo com [gesto](${gesto}) e observação no [cultivo](${cultivo}) | Média–alta |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *daninha* |
|-------|----------------------|
| [Planta](${planta}) · [Plantas](${plantas}) | A daninha *é* planta — o juízo vem depois |
| [Cultivo](${cultivo}) | Onde o conflito de lugar aparece |
| [Selvagem](${selvagem}) | Origem / modo — não decide sozinho o «dano» |
| [Maconha](${maconha}) · [erva](${erva}) | Separar gíria/eufemismo do manejo de daninhas |
| [Animal](${animal}) | Outro vivo no sistema — às vezes come a «daninha» |
| [Verdade](${verdade}) · [gesto](${gesto}) · [caminho](${caminho}) | Nomear o plano e agir com medida |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Planta daninha** | Concorrente no canteiro | Juízo de cultivo — inspecionar o plano |
| **Arrancar daninhas** | Manejo manual | [Gesto](${gesto}) com observação |
| **«Isso é daninha»** | Desqualificar o vivo | Pedir [verdade](${verdade}): dano a quê? |
| **Tradução *weed*** | Inglês ambíguo | Não misturar com [maconha](${maconha}) |
| **Ofício lab** | Cultivo / Farmácia Viva | Preferir nomear a [planta](${planta}) e o conflito |

**Finalidade-mãe:** nomear a **daninha** para **manejar com ofício** — conflito de lugar, não ódio ao vivo.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **neste canteiro**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «É daninha, então é lixo» = falso · «compete com o meu plano» = inspetável |
| Par vivo | [planta](${planta}) · [selvagem](${selvagem}) · [cultivo](${cultivo}) |

**Veredicto:** Valeu !!! **com o juízo certo**. Daninha sem [planta](${planta}) = insulto; daninha com método = manejo que ainda respeita o vivo.

## Hipóteses (síntese)

**H1:** objeto = *dano* + *-inha* → daninha (alta confiança).  
**H2:** categoria de manejo, não de essência.  
**H3:** elos = [planta](${planta}) · [cultivo](${cultivo}) · [selvagem](${selvagem}).  
**H4:** fecho = [Valeu !!!](${mantra}) — arrancar ou conviver com inspeção.

## Limites

- Não é receita de herbicida nem lista de espécies.  
- Daninha ≠ [maconha](${maconha}) ≠ *weed* em inglês.  
- Juízo de cultivo ≠ desprezo pelo reino vegetal.

## Status

**Aprovado** — **daninha** fichada: *dano*+*-inha*, planta daninha como juízo de lugar, rede com planta/cultivo e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Planta](${planta}) · [▶ Cultivo](${cultivo}) · [▶ Selvagem](${selvagem}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **daninha** — chiefly in **planta daninha** (weed in the agronomic sense): a plant judged unwanted in a crop or garden. Covers **object** (*dano* + *-inha*), judgment vs biology, links to [planta](${planta}), [selvagem](${selvagem}), [cultivo](${cultivo}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · daninha](${wiki}), [dano](${wikiDano}), [Planta daninha](${wikiPlanta}). Not a herbicide manual. *Weed* (EN) ≠ [maconha](${maconha}).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **daninha** |
| Etymon | *dano* (Lat. *damnum*) + *-inha* — “that causes damage” — high confidence |
| Lab type | Cultivation judgment × living plant |
| Links | [planta](${planta}) · [cultivo](${cultivo}) · [selvagem](${selvagem}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Judgment vs plant

A daninha is still a [planta](${planta}). The “damage” is relative to a human plan. Manage with [gesto](${gesto}) and [verdade](${verdade}).

## 3. Valeu !!!

Best possible **in this bed**, today. Daninha without plant-respect = insult; with method = craft.

## Status

**Approved** — object · place-conflict · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Planta](${planta}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **daninha** — sobre todo en **planta daninha**: vegetal juzgado indeseado en un cultivo. Cubre **objeto** (*dano* + *-inha*), juicio × biología, vínculos con [planta](${planta}), [selvagem](${selvagem}), [cultivo](${cultivo}) y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · daninha](${wiki}), [dano](${wikiDano}). No es manual de herbicida. *Weed* (EN) ≠ [maconha](${maconha}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **daninha** |
| Étimo | *dano* (lat. *damnum*) + *-inha* |
| Tipo lab | Juicio de cultivo × planta viva |
| Vínculos | [planta](${planta}) · [cultivo](${cultivo}) · [selvagem](${selvagem}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Juicio × planta

La daninha sigue siendo [planta](${planta}). El daño es relativo al plan humano.

## 3. ¡Valeu !!!

Lo mejor posible **en este cantero**, hoy.

## Estado

**Aprobada** — objeto · conflicto de lugar · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Planta](${planta}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDaninhaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDaninhaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 90;
  return makePalavra({
    title: 'Inspeção: Daninha — juízo de cultivo e planta viva',
    titleEn: 'Inspection: Daninha — cultivation judgment and living plant',
    titleEs: 'Inspección: Daninha — juicio de cultivo y planta viva',
    excerpt:
      'Palavras: «daninha» (*dano* + *-inha*) — planta daninha como juízo de lugar; elos planta, cultivo, selvagem; Valeu !!!',
    excerptEn:
      'Words: “daninha” (*dano* + *-inha*) — weed as place-judgment; links planta, cultivo, selvagem; Valeu !!!',
    excerptEs:
      'Palabras: «daninha» (*dano* + *-inha*) — planta daninha como juicio de lugar; vínculos planta, cultivo, selvagem; ¡Valeu !!!',
    slug: 'inspecao-palavra-daninha',
    date: '2026-08-03T16:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Daninha · palavra',
    coverImage: '/imagens/inspecoes/daninha-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDaninhaPost,
  buildDaninhaBodies
};
