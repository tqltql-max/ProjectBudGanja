'use strict';

/**
 * Inspeção Palavras · língua portuguesa
 * Eixos: originalidade · para que serve · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildLinguaPortuguesaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/cultivo/';
  const comunidade = '/comunidade/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wikipedia.org/wiki/L%C3%ADngua_portuguesa';
  const wikiPtBr = 'https://pt.wikipedia.org/wiki/Portugu%C3%AAs_brasileiro';

  const body = `## Escopo

Inspeção editorial da **língua portuguesa** — o meio em que o Inspetor BudGanja **pensa, inspeta e publica**. Esta ficha cobre a **originalidade** (de onde vem e o que tem de próprio), **para que serve** no laboratório e no mundo, e o fecho [Faça o melhor!](${mantra}): o melhor ofício **nesta língua, hoje**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Língua portuguesa](${wiki}), [português brasileiro](${wikiPtBr}), série [Palavras](${hub}), [Duvivier](${duvivier}) (método da palavra). **Ficha ≠ gramática normativa completa** — mapa de ofício: originalidade × utilidade × mantra. Sem afiliação académica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **língua portuguesa** (também: português) |
| Classe | Língua romance · instrumento de ofício no BudGanja |
| Família | Latim vulgar → galego-português → português (PT / BR / África / Ásia…) |
| Variedade âncora no site | Português do Brasil (oralidade + escrita do laboratório) |
| Tipo BudGanja | Palavra / língua — meio do projecto inteiro |
| Elo método | [Duvivier](${duvivier}) · [verdade](${verdade}) · [gesto](${gesto}) · [criatividade](${criatividade}) |
| Elo léxico vivo | [aff](${aff}) · [já](${ja}) · [genial](${genial}) · [esquerdo](${esquerdo}) · [maconha](${maconha}) |
| Elo projecto | [Guia de palavras](${guia}) · [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) |
| Fonte | [Wikipédia · Língua portuguesa](${wiki}) |
| Data | ${inspected} |

## 1. Originalidade

O que a língua portuguesa tem de **próprio** — e o que o BudGanja inspeciona:

| Camada de originalidade | Leitura laboratorial | Elo |
|-------------------------|----------------------|-----|
| **Raiz latina** | Herança romance — *veritas*, *creare*, *gestus*, *iam*… | [verdade](${verdade}) · [criatividade](${criatividade}) · [gesto](${gesto}) · [já](${ja}) |
| **Travessia atlântica** | Brasil, África, Ásia — a língua **viaja** e transforma | [passar](${passar}) · [caminho](${caminho}) |
| **Português brasileiro** | Pronúncia, gíria, interjeições, ritmo — *aff*, *já*, *genial!* | [aff](${aff}) · [genial](${genial}) |
| **Léxico canábico / popular** | Vocábulos com história (ex.: [maconha](${maconha})) — origem rastreável | série [Palavras](${hub}) |
| **Ofício da palavra** | Tratar a língua como instrumento de pesquisa pública | [Duvivier](${duvivier}) |
| **Criar no idioma** | Poemas Vida, fichas, mantras — originalidade **com método** | [Vida](${vida}) · [criatividade](${criatividade}) |

**Hótese:** a originalidade do português no BudGanja **não** é pureza inventada — é **mistura rastreável** + **uso honesto**: citar, nomear, inventar verso sem apagar a fonte.

**Veredicto de originalidade:** original = o que a língua **permite criar** (ficha, poema, elo) sem mentir sobre a origem das palavras.

## 2. Para que serve

| Função | No mundo | No projecto BudGanja |
|--------|----------|----------------------|
| **Nomear** | Pessoas, plantas, leis, afectos | Fichas [Palavras](${hub}) · [Inspeções](${hubAll}) |
| **Inspecionar** | Perguntar origem e uso | Método: étimo · uso · ressalva |
| **Criar** | Literatura, música, humor | [Poemas Vida](${vida}) · [genial](${genial}) · [criatividade](${criatividade}) |
| **Cuidar** | Pedir ajuda, registar o dia | [Diário](${diario}) · [gesto](${gesto}) |
| **Partilhar** | Comunidade, crédito | [Comunidade](${comunidade}) · [Faça o melhor!](${mantra}) |
| **Aprender** | Traduzir, glossário | [Guia de palavras](${guia}) · modo Aprender |
| **Cultivar** | Instruções, fases, balde | [Cultivo](${cultivo}) |
| **Avisar** | Enfado, tempo, veneno afectivo | [aff](${aff}) · [já](${ja}) · Expressões |

**Para que serve, em uma frase:** a língua portuguesa é o **solo sonoro** onde o laboratório planta [verdade](${verdade}), [gesto](${gesto}) e cuidado — sem ela, não há ficha, verso nem mantra.

## 3. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — escrito e dito **em português** |
| Poema | [poema Vida](${poemMantra}) |
| Ofício diário | O melhor possível **nesta língua, nesta mão, hoje** |
| Anti-armadilha | «Meu português não é perfeito» ≠ parar — o mantra pede ofício, não academia fechada |
| Método da palavra | [Duvivier](${duvivier}) — língua como pesquisa, não só enfeite |

**Veredicto:** Faça o melhor **em português** — com a palavra certa, o crédito certo e o gesto de publicar. A língua serve; o ofício decide **como**.

## Hipóteses (síntese)

**H1:** objeto = a língua como meio do projecto.  
**H2:** originalidade = raiz + travessia + BR oral + criação com crédito.  
**H3:** serve para nomear, inspecionar, criar, cuidar, partilhar, aprender.  
**H4:** fecho = [Faça o melhor!](${mantra}) nesta língua.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Guia de palavras](${guia}) · [hub Palavras](${hub}) | Léxico vivo |
| [Duvivier](${duvivier}) | Método da palavra |
| [Verdade](${verdade}) · [Gesto](${gesto}) · [Criatividade](${criatividade}) | Tríade de ofício |
| [Maconha](${maconha}) · [aff](${aff}) · [genial](${genial}) · [esquerdo](${esquerdo}) | Amostras de inspeção lexical |
| [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) | Onde a língua trabalha |
| [Faça o melhor!](${mantra}) | Finalidade prática do falar/escrever |

## Limites

- Não é curso de gramática nem exame de proficiência.  
- Não hierarquiza PT-PT vs PT-BR — o site opera sobretudo no BR.  
- Não substitui dicionário académico; aponta fontes e elos.

## Status

**Aprovado** — língua portuguesa fichada: **originalidade** (raiz × travessia × BR × criação), **para que serve** (nomear · inspecionar · cuidar · partilhar) e elo [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Guia](${guia}) · [▶ Duvivier](${duvivier}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the **Portuguese language** — the medium in which Inspetor BudGanja thinks, inspects and publishes. Covers **originality**, **what it is for**, and [Do your best!](${mantra}).

> Method note: [Wikipedia · Portuguese](${wiki}), [Brazilian Portuguese](${wikiPtBr}), [Words](${hub}), [Duvivier](${duvivier}). Not a full grammar.

## Object

| Field | Value |
|-------|-------|
| Name | **língua portuguesa** / Portuguese |
| Lab type | Language — medium of the whole project |
| Anchor variety | Brazilian Portuguese |
| Links | [Duvivier](${duvivier}) · [truth](${verdade}) · [gesture](${gesto}) · [creativity](${criatividade}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 1. Originality

| Layer | Lab reading |
|-------|-------------|
| Latin root | Romance heritage |
| Atlantic crossing | Language travels and transforms |
| Brazilian Portuguese | Slang, rhythm, *aff*, *já*, *genial!* |
| Traceable lexicon | e.g. [maconha](${maconha}) |
| Craft of the word | [Duvivier](${duvivier}) — language as public research |

**Verdict:** originality = what the language **allows you to create** without lying about word origins.

## 2. What it is for

Name · inspect · create · care · share · learn · grow — in the project: [Words](${hub}), [Vida](${vida}), [Cultivo](${cultivo}), [Comunidade](${comunidade}), [Guia](${guia}).

**One line:** Portuguese is the **sound-soil** where the lab plants truth, gesture and care.

## 3. Do your best!

[Do your best!](${mantra}) is written and said **in Portuguese**. Imperfect Portuguese ≠ stop — the mantra asks for craft, not a closed academy.

## Status

**Approved** — originality · purpose · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Duvivier](${duvivier}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de la **lengua portuguesa** — el medio en que Inspetor BudGanja piensa, inspecciona y publica. Cubre **originalidad**, **para qué sirve** y [¡Haz lo mejor!](${mantra}).

> Nota: [Wikipedia · Portugués](${wiki}), [portugués brasileño](${wikiPtBr}), [Palabras](${hub}), [Duvivier](${duvivier}). No es gramática completa.

## Objeto

| Campo | Valor |
|-------|-------|
| Nombre | **língua portuguesa** / portugués |
| Tipo lab | Lengua — medio de todo el proyecto |
| Variedad ancla | Portugués de Brasil |
| Vínculos | [Duvivier](${duvivier}) · [verdad](${verdade}) · [gesto](${gesto}) · [creatividad](${criatividade}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 1. Originalidad

Raíz latina · travesía atlántica · BR oral (*aff*, *já*, *genial*) · léxico rastreable · oficio de la palabra ([Duvivier](${duvivier})).

**Veredicto:** original = lo que la lengua **permite crear** sin mentir sobre el origen.

## 2. Para qué sirve

Nombrar · inspeccionar · crear · cuidar · compartir · aprender · cultivar — en el proyecto: [Palabras](${hub}), [Vida](${vida}), [Cultivo](${cultivo}), [Comunidad](${comunidade}).

## 3. ¡Haz lo mejor!

[¡Haz lo mejor!](${mantra}) se escribe y se dice **en portugués**. Portugués imperfecto ≠ parar.

## Estado

**Aprobada** — originalidad · para qué sirve · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Duvivier](${duvivier}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLinguaPortuguesaPost() {
  const { body, contentEn, contentEs, wiki } = buildLinguaPortuguesaBodies();
  return makePalavra({
    title:
      'Inspeção: Língua portuguesa — originalidade, para que serve e Faça o melhor!',
    titleEn:
      'Inspection: Portuguese language — originality, purpose and Do your best!',
    titleEs:
      'Inspección: Lengua portuguesa — originalidad, para qué sirve y ¡Haz lo mejor!',
    excerpt:
      'Palavras: língua portuguesa — originalidade (raiz × BR × criação); para que serve (nomear · inspecionar · cuidar); Faça o melhor! nesta língua.',
    excerptEn:
      'Words: Portuguese language — originality (root × BR × creation); what it is for (name · inspect · care); Do your best! in this language.',
    excerptEs:
      'Palabras: lengua portuguesa — originalidad (raíz × BR × creación); para qué sirve (nombrar · inspeccionar · cuidar); ¡Haz lo mejor! en esta lengua.',
    slug: 'inspecao-palavra-lingua-portuguesa',
    date: '2026-08-03T15:30:00.000Z',
    seriesOrder: 32,
    seriesLabel: 'Língua portuguesa · palavra',
    coverImage: '/imagens/inspecoes/lingua-portuguesa-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLinguaPortuguesaPost,
  buildLinguaPortuguesaBodies
};
