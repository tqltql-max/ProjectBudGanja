'use strict';

/**
 * Inspeção Palavras · planta
 * Conceito: ser vivo vegetal · cultivo · farmácia viva ·
 * hub /plantas/ (sem listar espécies). Plural «plantas» no corpo.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPlantaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const guiaCultivo = '/guia/cultivo-basico.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const farmacia = '/posts/post-inspecao-guia-farmacia-viva.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const cannabis = '/posts/post-inspecao-planta-cannabis-sativa.html';
  const cannabisHub = '/plantas/cannabis-sativa/';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/planta';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Planta';
  const wikiLat = 'https://en.wiktionary.org/wiki/planta#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **planta** — substantivo do português para o **ser vivo vegetal** (e, no plural **plantas**, o conjunto e o catálogo). Esta ficha cobre o **objeto**, os **sentidos** (vivo · cultivo · farmácia · metáfora), o elo com o hub [Plantas](${plantas}) e a [Farmácia Viva](${farmacia}), sem duplicar fichas de espécie. Tom: **ofício cálido** — a planta como ser que cresce, não só «insumo». Elos: [animal](${animal}), [simbiose](${simbiose}), [cultivo](${cultivo}), [Vida](${vida}).

**Troca lab:** a ficha antiga [erva](${erva}) cede o lugar preferente a **planta / plantas** (hub + esta palavra).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · planta](${wiki}), [Wikipédia · Planta](${wikiEl}), [Wikcionário · planta (latim)](${wikiLat}), série [Palavras](${hub}). Étimo de trabalho: latim *planta* («sola do pé; rebento / muda; planta») ↔ *plantare* («plantar»). **Ficha de palavra ≠ monografia botânica nem lista de espécies.** As fichas \`inspecao-planta-*\` (ex.: [Cannabis sativa](${cannabis})) tratam espécies; aqui inspecionamos o **vocábulo**. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **planta** (plural **plantas**) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *planta* («rebento; planta; sola») · *plantare* («plantar») — confiança: alta |
| Família | *plantar* · *plantação* · *plantio* · *transplantar* · *implantação* (fig.) |
| Cognatos | esp. *planta* · fr. *plante* · it. *pianta* · ing. *plant* · lat. *planta* |
| Tipo BudGanja | Palavra — ser vivo vegetal × cultura de cultivo × farmácia |
| Elo catálogo | [Plantas](${plantas}) — hub de espécies (não inventariar aqui) |
| Elo farmácia | [Farmácia Viva](${farmacia}) — cultivo / orientação / processamento medicinal |
| Elo irmãos | [animal](${animal}) · [simbiose](${simbiose}) · [erva](${erva}) (ficha antiga → esta) |
| Elo ofício | [cultivo](${cultivo}) · [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo projecto | [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · planta](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **ser vivo do reino vegetal** — e, no uso corrente, também a **muda**, a **instalação industrial** («planta fabril») e o **acto de plantar** (via o verbo). No BudGanja: a planta é **viva** antes de ser produto; o plural **plantas** aponta para o [catálogo](${plantas}) e para a cultura de cultivo.

## 2. Sentidos — vivo · cultivo · farmácia · metáfora

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo (*planta* / *plantare*)** | Rebento, muda; acto de fixar no solo | Alta |
| **Ser vivo vegetal** | Organismo fotossintético / reino Plantae (escola) | Alta |
| **Cultivo** | O que se planta, se cuida, se colhe | Alta (uso vivo) |
| **Farmácia / medicinal** | Planta como matéria de cuidado — [Farmácia Viva](${farmacia}) | Alta (mapa BudGanja) |
| **Plural *plantas*** | Conjunto; hub; «as plantas medicinais» | Alta |
| **Metáfora industrial** | «Planta» = fábrica / instalação | Alta (registo técnico) |
| **Figurativo** | «Plantar uma ideia»; «estar plantado» | Alta–média |

**H1:** *planta* herda o *plantare* — **pôr a crescer**, não só «coisa verde».  
**H2:** no lab, **planta** (palavra) ≠ ficha de espécie; o hub [Plantas](${plantas}) particulariza.  
**H3:** cultura de cultivo + [Farmácia Viva](${farmacia}) = trato com o vivo, com método.

## 3. Planta como ser vivo (não só recurso)

A planta **respira o mundo** à sua maneira: luz, água, solo, tempo. No ofício BudGanja isso importa:

| Situação | Bom (ofício) | Mau (redução) |
|----------|--------------|---------------|
| **Olhar** | Ver ciclo (semente → flor → semente) | Só «droga / produto» |
| **Cuidado** | [Cultivo](${cultivo}) com [gesto](${gesto}) e registo | Pressa sem observação |
| **Nome** | Separar palavra popular, binómio, gíria ([maconha](${maconha}) / *cannabis*) | Confundir tudo num saco |
| **Convívio** | [Simbiose](${simbiose}) — viver *com* solo e seres | Extrair sem devolver |
| **Ética** | [Verdade](${verdade}) sobre riscos e limites | Romantizar ou demonizar |

**Veredicto:** planta boa no lab = **ser vivo com história e cuidado**. Se só serve de rótulo de marketing, a palavra ficou oca.

## 4. Cultura de cultivo e Farmácia Viva

| Eixo | Onde vive | Papel |
|------|-----------|-------|
| **Cultivo** | [Cultivo](${cultivo}) · [guia básico](${guiaCultivo}) | Solo, luz, água, tempo — ofício prático |
| **Farmácia Viva** | [Guia · Farmácia Viva](${farmacia}) | SUS / Portaria 886 — cultivo, orientação, processamento de plantas medicinais |
| **Catálogo** | [Plantas](${plantas}) | Fichas de espécie (entrar pelo hub; não listar aqui) |
| **Exemplo de espécie** | [Cannabis sativa](${cannabis}) · [ficha medicinal](${cannabisHub}) | Uma ponte — não o inventário |
| **Léxico irmão** | [erva](${erva}) (substituída por **planta**) · [maconha](${maconha}) · [animal](${animal}) | Outros nomes e o vivo |

Regra clara: **esta ficha não inventaria espécies**. Quem quer babosa, camomila, cannabis — vai ao [hub Plantas](${plantas}) ou à ficha \`inspecao-planta-*\` correspondente.

## 5. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear o vivo** | «Uma planta no vaso» | Ser com ciclo — [Vida](${vida}) |
| **Cultivar** | Plantio, horta, tenda | [Cultivo](${cultivo}) com método |
| **Cuidar / farmácia** | Fitoterapia, Farmácia Viva | [Farmácia Viva](${farmacia}) |
| **Plural / catálogo** | «Plantas medicinais» | Hub [Plantas](${plantas}) |
| **Metáfora** | Planta fabril; plantar ideia | Registo — não confundir com botânica |
| **Fechar** | Depois do trato, o acto | [Faça o melhor!](${mantra}) com a planta à vista |

**Finalidade-mãe:** nomear a **planta** para **tratar o vegetal como vivo** — cultivo, farmácia e catálogo com ofício; sem reduzir a produto nem listar o inventário inteiro.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com esta planta / este cultivo**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Planta = só THC / só dinheiro» = falso · planta pede ciclo e [verdade](${verdade}) |
| Par vivo | [Animal](${animal}) · [simbiose](${simbiose}) — o vivo em rede |
| Farmácia | [Farmácia Viva](${farmacia}) — cuidado público com plantas medicinais |
| Ofício | [Cultivo](${cultivo}) · [gesto](${gesto}) · [caminho](${caminho}) |

**Veredicto:** Faça o melhor **com a planta** — observar, cuidar, nomear com método. Planta sem [caminho](${caminho}) = cartaz; planta com ofício = vida que o lab respeita.

## Hipóteses (síntese)

**H1:** objeto = lat. *planta* / *plantare* → rebento e acto de fazer crescer.  
**H2:** sentidos = ser vivo · cultivo · farmácia · plural *plantas* · metáfora industrial.  
**H3:** elos = [Plantas](${plantas}) · [Farmácia Viva](${farmacia}) · [animal](${animal}) · [simbiose](${simbiose}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com a planta como ser vivo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Plantas](${plantas}) | Hub de espécies — o referente concreto |
| [Farmácia Viva](${farmacia}) | Cultivo medicinal no SUS |
| [Cultivo](${cultivo}) · [guia](${guiaCultivo}) | Ofício prático |
| [Animal](${animal}) · [Simbiose](${simbiose}) | Vivo e viver juntos |
| [Erva](${erva}) (ponte) · [Maconha](${maconha}) · [Cannabis](${cannabis}) | Léxico antigo / exemplo de espécie |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é tratado de botânica sistemática nem lista de espécies do catálogo.  
- Não é aconselhamento médico, receita nem incentivo a uso ilícito.  
- «Planta» industrial (fábrica) ≠ planta vegetal — registos distintos.  
- Fichas \`inspecao-planta-*\` continuam a ser o lugar das espécies.

## Status

**Aprovado** — **planta** fichada: objeto (*planta* / *plantare*), sentidos (vivo · cultivo · farmácia · plural **plantas**), elos ao hub [Plantas](${plantas}) e [Farmácia Viva](${farmacia}), sem duplicar espécies; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Plantas](${plantas}) · [▶ Farmácia Viva](${farmacia}) · [▶ Cultivo](${cultivo}) · [▶ Animal](${animal}) · [▶ Simbiose](${simbiose}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **planta** (plant) — the **living vegetal being** (plural **plantas** for the set / catalog). Covers **object**, **senses** (living · cultivation · pharmacy · metaphor), links to the [Plantas](${plantas}) hub and [Farmácia Viva](${farmacia}), without duplicating species sheets. Tone: warm craft. Links: [animal](${animal}), [simbiose](${simbiose}), [cultivo](${cultivo}), [Vida](${vida}).

> Method note: [Wiktionary · planta](${wiki}), [Wikipedia · Planta](${wikiEl}). Lat. *planta* / *plantare*. Word sheet ≠ botanical monograph. Species live under \`inspecao-planta-*\` (e.g. [Cannabis sativa](${cannabis})).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **planta** (plural **plantas**) |
| Etymon | Lat. *planta* / *plantare* (shoot; to plant) → PT *planta* |
| Lab type | Living plant × cultivation culture × pharmacy |
| Links | [Plantas](${plantas}) · [Farmácia Viva](${farmacia}) · [animal](${animal}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Living vegetal** · **cultivation** · **medicinal / Farmácia Viva** · plural **plantas** (catalog) · industrial metaphor (“plant” = factory) · figurative “plant an idea”.

## 3. Living being

Good craft = see the cycle, care with [gesto](${gesto}), separate popular name / binomial / slang. Bad = plant as mere product or slogan.

## 4. Cultivation & Farmácia Viva

[Cultivo](${cultivo}) for practice; [Farmácia Viva](${farmacia}) for public medicinal plant care; [Plantas](${plantas}) for species — **do not inventory here**. Example bridge: [Cannabis sativa](${cannabis}).

## 5. Do your best!

Best possible **with this plant / this grow**, today — observe, care, name with method. Plant without [path](${caminho}) = poster; plant with craft = life the lab respects.

## Status

**Approved** — object · senses · living being · cultivation / Farmácia Viva · hub without species list · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Plantas](${plantas}) · [▶ Farmácia Viva](${farmacia}) · [▶ Cultivo](${cultivo}) · [▶ Animal](${animal}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **planta** — el **ser vivo vegetal** (plural **plantas** para el conjunto / catálogo). Cubre **objeto**, **sentidos** (vivo · cultivo · farmacia · metáfora), vínculos con el hub [Plantas](${plantas}) y [Farmácia Viva](${farmacia}), sin duplicar fichas de especie. Tono: oficio cálido. Vínculos: [animal](${animal}), [simbiose](${simbiose}), [cultivo](${cultivo}), [Vida](${vida}).

> Nota: [Wikcionario · planta](${wiki}), [Wikipedia · Planta](${wikiEl}). Lat. *planta* / *plantare*. Ficha de palabra ≠ monografía botánica. Las especies viven en \`inspecao-planta-*\` (p. ej. [Cannabis sativa](${cannabis})).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **planta** (plural **plantas**) |
| Étimo | Lat. *planta* / *plantare* → PT *planta* |
| Tipo lab | Ser vivo vegetal × cultura de cultivo × farmacia |
| Vínculos | [Plantas](${plantas}) · [Farmácia Viva](${farmacia}) · [animal](${animal}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Ser vivo vegetal** · **cultivo** · **farmacia / Farmácia Viva** · plural **plantas** · metáfora industrial · figurado.

## 3. Ser vivo

Buen oficio = ver el ciclo, cuidar con [gesto](${gesto}), separar nombre popular / binomio / jerga. Malo = planta como mero producto.

## 4. Cultivo y Farmácia Viva

[Cultivo](${cultivo}) · [Farmácia Viva](${farmacia}) · hub [Plantas](${plantas}) — **sin inventariar especies aquí**. Puente de ejemplo: [Cannabis sativa](${cannabis}).

## 5. ¡Haz lo mejor!

Lo mejor posible **con esta planta / este cultivo**, hoy — observar, cuidar, nombrar con método.

## Estado

**Aprobada** — objeto · sentidos · ser vivo · cultivo / Farmácia Viva · hub sin lista · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Plantas](${plantas}) · [▶ Farmácia Viva](${farmacia}) · [▶ Cultivo](${cultivo}) · [▶ Animal](${animal}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPlantaPost() {
  const { body, contentEn, contentEs, wiki } = buildPlantaBodies();
  return makePalavra({
    title:
      'Inspeção: Planta — ser vivo, cultivo e Farmácia Viva',
    titleEn:
      'Inspection: Planta — living being, cultivation and Farmácia Viva',
    titleEs:
      'Inspección: Planta — ser vivo, cultivo y Farmácia Viva',
    excerpt:
      'Palavras: «planta» (lat. *planta* / *plantare*) — ser vivo vegetal; plural plantas no hub; cultivo e Farmácia Viva; sem listar espécies.',
    excerptEn:
      'Words: “planta” (Lat. *planta* / *plantare*) — living vegetal being; plural plantas in the hub; cultivation and Farmácia Viva; no species list.',
    excerptEs:
      'Palabras: «planta» (lat. *planta* / *plantare*) — ser vivo vegetal; plural plantas en el hub; cultivo y Farmácia Viva; sin listar especies.',
    slug: 'inspecao-palavra-planta',
    date: '2026-08-03T21:30:00.000Z',
    seriesOrder: 83,
    seriesLabel: 'Planta · palavra',
    coverImage: '/imagens/inspecoes/planta-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPlantaPost,
  buildPlantaBodies
};
