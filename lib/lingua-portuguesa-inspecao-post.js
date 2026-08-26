'use strict';

/**
 * Inspeção Palavras · língua portuguesa
 * Eixos: originalidade · alterações no tempo · para que serve · Valeu !!!
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
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wikipedia.org/wiki/L%C3%ADngua_portuguesa';
  const wikiPtBr = 'https://pt.wikipedia.org/wiki/Portugu%C3%AAs_brasileiro';

  const body = `## Escopo

Inspeção editorial da **língua portuguesa** — o meio em que o Inspetor BudGanja **pensa, inspeta e publica**. Esta ficha cobre a **originalidade**, as **alterações ao longo do tempo**, **para que serve** no laboratório, e o fecho [Valeu !!!](${mantra}): o melhor ofício **nesta língua, hoje**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Língua portuguesa](${wiki}), [português brasileiro](${wikiPtBr}), série [Palavras](${hub}), [Duvivier](${duvivier}) (método da palavra). **Ficha ≠ gramática normativa completa** — mapa de ofício: originalidade × mudança no tempo × utilidade × mantra. Sem afiliação académica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **língua portuguesa** (também: português) |
| Classe | Língua romance · instrumento de ofício no BudGanja |
| Família | Latim vulgar → galego-português → português (PT / BR / África / Ásia…) |
| Variedade âncora no site | Português do Brasil (oralidade + escrita do laboratório) |
| Tipo BudGanja | Palavra / língua — meio do projecto inteiro |
| Elo método | [Duvivier](${duvivier}) · [etimologia](${etimologia}) · [verdade](${verdade}) · [gesto](${gesto}) · [criatividade](${criatividade}) · [passar](${passar}) · [caminho](${caminho}) |
| Elo léxico / oralidade | [aff](${aff}) · [já](${ja}) · [genial](${genial}) · [jesusamado](${jesusamado}) · [esquerdo](${esquerdo}) · [maconha](${maconha}) |
| Elo projecto | [Guia de palavras](${guia}) · [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) |
| Fonte | [Wikipédia · Língua portuguesa](${wiki}) |
| Data | ${inspected} |

## 1. Originalidade

O que a língua portuguesa tem de **próprio** — e o que o BudGanja inspeciona:

| Camada de originalidade | Leitura laboratorial | Elo |
|-------------------------|----------------------|-----|
| **Raiz latina** | Herança romance — *veritas*, *creare*, *gestus*, *iam*… · pessoas *ego / nōs* | [verdade](${verdade}) · [criatividade](${criatividade}) · [gesto](${gesto}) · [já](${ja}) · [latim](${latim}) · [conjugação](${conjugacao}) |
| **Travessia atlântica** | Brasil, África, Ásia — a língua **viaja** e transforma | [passar](${passar}) · [caminho](${caminho}) |
| **Português brasileiro** | Pronúncia, gíria, interjeições, ritmo — *aff*, *já*, *genial!*, *jesusamado* | [aff](${aff}) · [genial](${genial}) · [jesusamado](${jesusamado}) |
| **Léxico canábico / popular** | Vocábulos com história (ex.: [maconha](${maconha})) — origem rastreável | série [Palavras](${hub}) |
| **Ofício da palavra** | Tratar a língua como instrumento de pesquisa pública | [Duvivier](${duvivier}) |
| **Criar no idioma** | Poemas Vida, fichas, mantras — originalidade **com método** | [Vida](${vida}) · [criatividade](${criatividade}) |

**Hótese:** a originalidade do português no BudGanja **não** é pureza inventada — é **mistura rastreável** + **uso honesto**: citar, nomear, inventar verso sem apagar a fonte.

**Veredicto de originalidade:** original = o que a língua **permite criar** (ficha, poema, elo) sem mentir sobre a origem das palavras.

## 2. Alterações ao longo do tempo

A língua **não congela**. O método BudGanja (origem → viagem → transformação) aplica-se à língua inteira, não só a uma palavra.

### Linha do tempo (mapa de ofício)

| Fase | O que muda | Leitura laboratorial |
|------|------------|----------------------|
| **Latim vulgar → galego-português** | Sons, morfologia, vocabulário comum ibérico | Raiz romance — base partilhada |
| **Português antigo / medieval** | Escrita, trovas, administração | A língua torna-se **documento** |
| **Expansão marítima (séc. XV–XVI)** | Contacto com África, Ásia, Brasil | A língua **viaja** — [passar](${passar}) · [caminho](${caminho}) |
| **Brasil colonial → independente** | Contacto indígena e africano; variedade BR | Mistura rastreável (ex.: [maconha](${maconha})) |
| **Séculos XIX–XX** | Imprensa, escola, rádio, norma culta | Escrita e oral **divergem e negociam** |
| **Acordos ortográficos** | Grafia partilhada / controversa entre países | Norma ≠ fala viva |
| **Era digital / redes** | Gíria, teclado, *aff*, memes, inglês técnico | Oralidade escrita — [aff](${aff}) · [já](${ja}) · [genial](${genial}) |
| **Hoje no BudGanja** | Fichas, poemas, glossário, mantra | Inspecionar a mudança **sem negar a raiz** |

### O que muda (camadas)

| Camada | Exemplos de alteração | Ressalva |
|--------|----------------------|----------|
| **Som e ritmo** | Pronúncia BR ≠ PT europeu; redução de vogais, sibilantes | Variedade ≠ erro |
| **Léxico** | Empréstimos, gírias, termos técnicos, nomes de plantas | Creditar origem quando possível |
| **Sentido** | Palavra antiga com uso novo (ou estigma novo) | [maconha](${maconha}) — viagem semântica |
| **Grafia** | Ortografias oficiais e reformas | Ficha usa forma viva do laboratório |
| **Uso social** | Formal × informal; chat × documento | [gesto](${gesto}) e tom importam |
| **Poder / norma** | Escola, lei, dicionário vs. rua | Norma ajuda; **não** apaga a oralidade |

### Hipótese temporal

**H-tempo:** toda palavra inspecionada na série [Palavras](${hub}) é um **corte no tempo** — um instante da língua em movimento. Inspecionar = perguntar *de onde veio*, *para onde foi*, *o que significa agora*.

**Oralidade viva:** no tempo digital, sopros como [aff](${aff}) e [jesusamado](${jesusamado}) mostram a língua a **mudar no peito** — enfado × calor — sem sair do português.

**Veredicto temporal:** alteração no tempo **não** é decadência — é [caminho](${caminho}). Congelar a língua («só o português antigo é puro») = reprovado. Negar a história («inventei agora, sem raiz») = também reprovado.

## 3. Para que serve

| Função | No mundo | No projecto BudGanja |
|--------|----------|----------------------|
| **Nomear** | Pessoas, plantas, leis, afectos | Fichas [Palavras](${hub}) · [Inspeções](${hubAll}) |
| **Inspecionar** | Perguntar origem e uso **ao longo do tempo** | Método: [etimologia](${etimologia}) (étimo · viagem · uso · ressalva) |
| **Criar** | Literatura, música, humor | [Poemas Vida](${vida}) · [genial](${genial}) · [criatividade](${criatividade}) |
| **Cuidar** | Pedir ajuda, registar o dia | [Diário](${diario}) · [gesto](${gesto}) |
| **Partilhar** | Comunidade, crédito | [Comunidade](${comunidade}) · [Valeu !!!](${mantra}) |
| **Aprender** | Traduzir, glossário, **conjugação** | [Guia de palavras](${guia}) · modo Aprender · [conjugação](${conjugacao}) · [latim](${latim}) |
| **Cultivar** | Instruções, fases, balde | [Cultivo](${cultivo}) |
| **Avisar** | Enfado, tempo, veneno afectivo | [aff](${aff}) · [já](${ja}) · Expressões |

**Para que serve, em uma frase:** a língua portuguesa é o **solo sonoro** onde o laboratório planta [verdade](${verdade}), [gesto](${gesto}) e cuidado — sem ela, não há ficha, verso nem mantra.

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — escrito e dito **em português** |
| Poema | [poema Vida](${poemMantra}) |
| Ofício diário | O melhor possível **nesta língua, nesta mão, hoje** — sabendo que a língua **já mudou** e **ainda muda** |
| Anti-armadilha | «Meu português não é perfeito» ≠ parar — o mantra pede ofício, não academia fechada |
| Anti-purismo | Perseguir «português puro eterno» ≠ Valeu !!!; o melhor é **honesto no tempo** |
| Método da palavra | [Duvivier](${duvivier}) — língua como pesquisa, não só enfeite |

**Veredicto:** Valeu !!! **em português** — com a palavra certa **neste momento**, o crédito certo e o gesto de publicar. A língua muda; o ofício decide **como acompanhar** sem mentir.

## Hipóteses (síntese)

**H1:** objeto = a língua como meio do projecto.  
**H2:** originalidade = raiz + travessia + BR oral + criação com crédito.  
**H3:** alterações no tempo = latim → galego-português → expansão → BR → norma/digital — mudança ≠ decadência.  
**H4:** serve para nomear, inspecionar (também no tempo), criar, cuidar, partilhar, aprender.  
**H5:** fecho = [Valeu !!!](${mantra}) nesta língua, hoje.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Guia de palavras](${guia}) · [hub Palavras](${hub}) | Léxico vivo (cortes no tempo) |
| [Latim](${latim}) · [conjugação](${conjugacao}) | Sala da língua-mãe × os 3 elos do verbo — estudar português pelo projecto |
| [Etimologia](${etimologia}) | O ofício de perguntar de onde veio |
| [Duvivier](${duvivier}) | Método da palavra |
| [Passar](${passar}) · [Caminho](${caminho}) | Metáforas da mudança / viagem |
| [jesusamado](${jesusamado}) · [aff](${aff}) | Oralidade BR — calor × enfado |
| [Verdade](${verdade}) · [Gesto](${gesto}) · [Criatividade](${criatividade}) | Tríade de ofício |
| [Maconha](${maconha}) · [aff](${aff}) · [genial](${genial}) · [esquerdo](${esquerdo}) | Amostras de inspeção lexical |
| [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) | Onde a língua trabalha |
| [Valeu !!!](${mantra}) | Finalidade prática do falar/escrever |

## Limites

- Não é curso de gramática nem história linguística académica completa — a sala gramatical das **pessoas do verbo** é [conjugação](${conjugacao}), partilhada com [latim](${latim}).  
- Não hierarquiza PT-PT vs PT-BR — o site opera sobretudo no BR.  
- Datas e fases são **mapa de ofício**, não tese filológica fechada.  
- Não substitui dicionário académico; aponta fontes e elos.

## Status

**Aprovado** — língua portuguesa fichada: **originalidade**, **alterações ao longo do tempo**, **para que serve** e elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Guia](${guia}) · [▶ jesusamado](${jesusamado}) · [▶ Duvivier](${duvivier}) · [▶ Passar](${passar}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the **Portuguese language** — the medium in which Inspetor BudGanja thinks, inspects and publishes. Covers **originality**, **changes over time**, **what it is for**, and [Valeu !!!](${mantra}). Oral cross-link: [jesusamado](${jesusamado}).

> Method note: [Wikipedia · Portuguese](${wiki}), [Brazilian Portuguese](${wikiPtBr}), [Words](${hub}), [Duvivier](${duvivier}). Not a full grammar.

## Object

| Field | Value |
|-------|-------|
| Name | **língua portuguesa** / Portuguese |
| Lab type | Language — medium of the whole project |
| Anchor variety | Brazilian Portuguese |
| Links | [Duvivier](${duvivier}) · [truth](${verdade}) · [gesture](${gesto}) · [pass](${passar}) · [path](${caminho}) · [Valeu !!!](${mantra}) |
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

## 2. Changes over time

Portuguese **does not freeze**. The lab method (origin → journey → transformation) applies to the whole language.

| Phase | What shifts |
|-------|-------------|
| Vulgar Latin → Galician-Portuguese | Sounds, morphology |
| Old / medieval Portuguese | Writing becomes document |
| Maritime expansion | Contact Africa / Asia / Brazil — [pass](${passar}) · [path](${caminho}) |
| Brazil | Indigenous + African contact; BR variety (e.g. [maconha](${maconha})) |
| Print / school / radio | Written and spoken negotiate |
| Spelling agreements | Official norms across countries |
| Digital age | Chat slang — [aff](${aff}) · [já](${ja}) · [genial](${genial}) |
| BudGanja today | Sheets inspect change **without denying the root** |

**Temporal hypothesis:** each [Words](${hub}) sheet is a **cut in time**. Change ≠ decay; freezing “pure ancient Portuguese” = fail; erasing history = also fail. Living breath in BR orality: [jesusamado](${jesusamado}) vs [aff](${aff}).

## 3. What it is for

Name · inspect (including through time) · create · care · share · learn · grow — in the project: [Words](${hub}), [Vida](${vida}), [Cultivo](${cultivo}), [Comunidade](${comunidade}), [Guia](${guia}).

**One line:** Portuguese is the **sound-soil** where the lab plants truth, gesture and care.

## 4. Valeu !!!

[Valeu !!!](${mantra}) is written and said **in Portuguese** — honest **in this moment**, knowing the language still moves. Imperfect Portuguese ≠ stop; eternal purism ≠ the mantra.

## Status

**Approved** — originality · changes over time · purpose · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ jesusamado](${jesusamado}) · [▶ Duvivier](${duvivier}) · [▶ Pass](${passar}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de la **lengua portuguesa** — el medio en que Inspetor BudGanja piensa, inspecciona y publica. Cubre **originalidad**, **cambios a lo largo del tiempo**, **para qué sirve** y [¡Valeu !!!](${mantra}). Vínculo oral: [jesusamado](${jesusamado}).

> Nota: [Wikipedia · Portugués](${wiki}), [portugués brasileño](${wikiPtBr}), [Palabras](${hub}), [Duvivier](${duvivier}). No es gramática completa.

## Objeto

| Campo | Valor |
|-------|-------|
| Nombre | **língua portuguesa** / portugués |
| Tipo lab | Lengua — medio de todo el proyecto |
| Variedad ancla | Portugués de Brasil |
| Vínculos | [Duvivier](${duvivier}) · [verdad](${verdade}) · [gesto](${gesto}) · [pasar](${passar}) · [camino](${caminho}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 1. Originalidad

Raíz latina · travesía atlántica · BR oral (*aff*, *já*, *genial*) · léxico rastreable · oficio de la palabra ([Duvivier](${duvivier})).

**Veredicto:** original = lo que la lengua **permite crear** sin mentir sobre el origen.

## 2. Cambios a lo largo del tiempo

La lengua **no se congela**. Método del lab (origen → viaje → transformación) aplica a toda la lengua.

| Fase | Qué cambia |
|------|------------|
| Latín vulgar → galaicoportugués | Sonidos, morfología |
| Portugués antiguo / medieval | La lengua se hace documento |
| Expansión marítima | Contacto África / Asia / Brasil — [pasar](${passar}) · [camino](${caminho}) |
| Brasil | Contacto indígena y africano; variedad BR (ej. [maconha](${maconha})) |
| Prensa / escuela / radio | Escrita y oral negocian |
| Acuerdos ortográficos | Normas oficiales |
| Era digital | Jerga de chat — [aff](${aff}) · [já](${ja}) · [genial](${genial}) |
| BudGanja hoy | Fichas inspeccionan el cambio **sin negar la raíz** |

**Hipótesis temporal:** cada ficha de [Palabras](${hub}) es un **corte en el tiempo**. Cambio ≠ decadencia; congelar «portugués puro eterno» = reprobado. Soplo vivo BR: [jesusamado](${jesusamado}) vs [aff](${aff}).

## 3. Para qué sirve

Nombrar · inspeccionar (también en el tiempo) · crear · cuidar · compartir · aprender · cultivar — en el proyecto: [Palabras](${hub}), [Vida](${vida}), [Cultivo](${cultivo}), [Comunidad](${comunidade}).

## 4. ¡Valeu !!!

[¡Valeu !!!](${mantra}) se escribe y se dice **en portugués** — honesto **en este momento**, sabiendo que la lengua sigue moviéndose.

## Estado

**Aprobada** — originalidad · cambios en el tiempo · para qué sirve · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ jesusamado](${jesusamado}) · [▶ Duvivier](${duvivier}) · [▶ Pasar](${passar}) · [▶ ¡Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLinguaPortuguesaPost() {
  const { body, contentEn, contentEs, wiki } = buildLinguaPortuguesaBodies();
  return makePalavra({
    title:
      'Inspeção: Língua portuguesa — originalidade, alterações no tempo e Valeu !!!',
    titleEn:
      'Inspection: Portuguese language — originality, changes over time and Valeu !!!',
    titleEs:
      'Inspección: Lengua portuguesa — originalidad, cambios en el tiempo y ¡Valeu !!!',
    excerpt:
      'Palavras: língua portuguesa — originalidade; alterações ao longo do tempo (latim → BR → digital); para que serve; Valeu !!! nesta língua.',
    excerptEn:
      'Words: Portuguese language — originality; changes over time (Latin → BR → digital); purpose; Valeu !!! in this language.',
    excerptEs:
      'Palabras: lengua portuguesa — originalidad; cambios a lo largo del tiempo (latín → BR → digital); para qué sirve; ¡Valeu !!! en esta lengua.',
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
