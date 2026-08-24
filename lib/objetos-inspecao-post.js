'use strict';

/**
 * Inspeção Palavras · objetos
 * Eixos: plural de objeto · lat. obiectum · «objeto inspecionado» (meta-lab) ·
 * coisa × matéria · gramática · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildObjetosBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const livro = '/posts/post-inspecao-palavra-livro.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/objeto';
  const wikiPlural = 'https://pt.wiktionary.org/wiki/objetos';
  const ao90 = '/posts/post-inspecao-palavra-ao90.html';

  const body = `## Escopo

Inspeção editorial da palavra **objetos** — plural de **objeto**: as **coisas** / **entidades** postas diante do olhar, e, no laboratório BudGanja, o plural do **«objeto inspecionado»** que abre quase toda ficha. Esta ficha cobre o **lema** (lat. *obiectum*), o eixo **um objeto × muitos objetos**, o uso **meta-lab** (o que a inspeção escolhe nomear), a gramática (objeto direto / indireto) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · objeto](${wiki}), [objetos](${wikiPlural}), série [Palavras](${hub}). Forma [AO90](${ao90}) BR: *objeto* / *objetos* (PT-PT antigo: *objecto*). **Ficha ≠ inventário do mundo nem aula completa de sintaxe.** Tom: Inspetor BudGanja — *objetos* são o que **fica à frente** para ser inspecionado com [verdade](${verdade}). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **objetos** (plural); singular **objeto** |
| Classe | Substantivo masculino plural |
| Étimo (trabalho) | lat. *obiectum* («o que é lançado / posto diante»; *ob-* + *iacere*) → pt. *objeto* — confiança: **alta** |
| Família | *objeto* · *objetivo* · *objetivar* · *objectivo* (PT) · *subjectivo* (par) |
| Cognatos / paralelos | esp. *objeto* · fr. *objet* · ing. *object* · it. *oggetto* |
| Tipo BudGanja | Palavra — meta-lab × coisa nomeável |
| Elo ofício | [verdade](${verdade}) · [gesto](${gesto}) · [caminho](${caminho}) · [sinal](${sinal}) |
| Elo léxico | [língua portuguesa](${lingua}) · [mensagem](${mensagem}) · [livro](${livro}) |
| Elo vivo | [planta](${planta}) · [Plantas](${plantas}) · [cultivo](${cultivo}) |
| Elo projecto | [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) · [risco](${risco}) |
| Fonte | [Wikcionário · objeto](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o plural das **unidades que a inspeção isola** — materiais, palavras, plantas, gestos, normas. No lab: sem *objeto* claro, a ficha vira névoa; com *objetos* demais sem hierarquia, vira lista sem [caminho](${caminho}).

## 2. Objeto × objetos × coisa × meta-lab

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **objeto** (sing.) | Uma unidade posta diante | Secção «Objeto inspecionado» |
| **objetos** (pl.) | Conjunto / catálogo / rede | Vários alvos — exigir prioridade |
| **coisa** | Uso oral amplo | Menos técnico; objeto pede recorte |
| **meta-lab** | O que a ficha escolhe auditar | Objeto ≠ tudo o que existe |
| **objeto direto / indireto** | Gramática | Complemento verbal — outro eixo |

**H1:** *objeto* < lat. *obiectum* — o que fica **diante** (alta confiança).  
**H2:** no BudGanja, *objeto inspecionado* = contrato de foco da ficha.  
**H3:** *objetos* no plural pedem **ordem** — qual primeiro, qual elo, qual limite.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Material** | Coisa física (vaso, cinta, cinzeiro…) | Alta |
| **Exterior ao observador** | O que se opõe / apresenta ao sujeito | Alta (filosofia leve) |
| **Gramática** | Objeto direto / indireto | Alta |
| **Informática** | Entidade em programação OO | Média (uso técnico) |
| **Meta-lab BudGanja** | Alvo nomeado da inspeção | Alta (ofício do site) |
| **Plural «os objetos»** | Conjunto a organizar | Alta (uso vivo) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *objetos* |
|-------|----------------------|
| [Verdade](${verdade}) | Nomear o objeto sem inventar |
| [Gesto](${gesto}) · [caminho](${caminho}) | Agir sobre / em direção ao objeto |
| [Sinal](${sinal}) · [mensagem](${mensagem}) | Objetos que comunicam |
| [Planta](${planta}) · [Plantas](${plantas}) | Objetos vivos no catálogo |
| [Livro](${livro}) · [língua portuguesa](${lingua}) | Objetos de leitura e léxico |
| [Risco](${risco}) | Objeto mal delimitado = inspeção frouxa |
| Hub [Inspeções](${hubAll}) | Casa dos objetos fichados |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Objeto inspecionado»** | Secção de ficha | Contrato: *isto* e não o resto |
| **«Os objetos da mesa»** | Coisas concretas | Inventário com ofício |
| **Objeto direto** | Escola / gramática | Não confundir com objeto da inspeção |
| **Orientado a objetos** | Programação | Sentido técnico à parte |
| **[AO90](${ao90})** | *objeto* (sem *c*) | Forma do lab BR |

**Finalidade-mãe:** nomear **objetos** para **inspecionar com foco** — um de cada vez, elos depois, limites sempre.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **neste objeto**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Inspecionar tudo» = falso · «escolher o objeto e os elos» = ofício |
| Par vivo | [verdade](${verdade}) · [caminho](${caminho}) · [gesto](${gesto}) |

**Veredicto:** Valeu !!! **com o objeto certo**. Objetos sem [verdade](${verdade}) = pilha; objeto com método = inspeção que cabe numa ficha.

## Hipóteses (síntese)

**H1:** *objeto(s)* < lat. *obiectum* (alta confiança).  
**H2:** meta-lab = «objeto inspecionado» como foco.  
**H3:** elos = [verdade](${verdade}) · [caminho](${caminho}) · [gesto](${gesto}) · [planta](${planta}).  
**H4:** fecho = [Valeu !!!](${mantra}) — um objeto bem delimitado.

## Limites

- Não é ontologia completa nem curso de sintaxe.  
- Plural ≠ licença para fichar o universo de uma vez.  
- *objecto* (grafia antiga PT) → no lab BR preferir **objeto**.

## Status

**Aprovado** — **objetos** fichados: plural de *objeto*, meta-lab do «objeto inspecionado», rede com verdade/caminho e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Verdade](${verdade}) · [▶ Caminho](${caminho}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **objetos** (plural of **objeto**) — things placed before the gaze, and in BudGanja the plural of the sheet’s **“objeto inspecionado”**. Etymon Lat. *obiectum*. Links [verdade](${verdade}), [caminho](${caminho}), [gesto](${gesto}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · objeto](${wiki}). Not a full ontology or syntax course.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **objetos** / **objeto** |
| Etymon | Lat. *obiectum* (*ob-* + *iacere*) — high confidence |
| Lab type | Meta-lab focus × nameable thing |
| Links | [verdade](${verdade}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Craft note

One clear object per sheet; many objects need order and links. “Inspect everything” is not craft.

## 3. Valeu !!!

Best possible **on this object**, today.

## Status

**Approved** — plural · meta-lab focus · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Verdade](${verdade}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **objetos** (plural de **objeto**) — las cosas puestas delante de la mirada y, en BudGanja, el plural del **«objeto inspeccionado»**. Étimo lat. *obiectum*. Vínculos [verdade](${verdade}), [caminho](${caminho}), [gesto](${gesto}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · objeto](${wiki}). No es ontología completa ni curso de sintaxis.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **objetos** / **objeto** |
| Étimo | lat. *obiectum* |
| Tipo lab | Meta-lab × cosa nombrable |
| Vínculos | [verdade](${verdade}) · [caminho](${caminho}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Oficio

Un objeto claro por ficha; muchos objetos piden orden.

## 3. ¡Valeu !!!

Lo mejor posible **en este objeto**, hoy.

## Estado

**Aprobado** — plural · foco meta-lab · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Verdade](${verdade}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildObjetosPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildObjetosBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 94;
  return makePalavra({
    title: 'Inspeção: Objetos — o que fica diante e o foco da ficha',
    titleEn: 'Inspection: Objetos — what stands before and the sheet’s focus',
    titleEs: 'Inspección: Objetos — lo que queda delante y el foco de la ficha',
    excerpt:
      'Palavras: «objetos» (lat. *obiectum*) — plural de objeto; meta-lab do objeto inspecionado; Valeu !!!',
    excerptEn:
      'Words: “objetos” (Lat. *obiectum*) — plural of objeto; meta-lab inspected object; Valeu !!!',
    excerptEs:
      'Palabras: «objetos» (lat. *obiectum*) — plural de objeto; meta-lab del objeto inspeccionado; ¡Valeu !!!',
    slug: 'inspecao-palavra-objetos',
    date: '2026-08-03T17:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Objetos · palavra',
    coverImage: '/imagens/inspecoes/objetos-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildObjetosPost,
  buildObjetosBodies
};
