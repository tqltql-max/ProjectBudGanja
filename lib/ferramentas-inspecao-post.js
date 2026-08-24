'use strict';

/**
 * Inspeção Palavras · ferramentas
 * Eixos: lat. ferramentum (ferrum + -mentum) · relação com objetos
 * (obiectum) · gesto / mão · hub /calculadoras/ × catálogo /objetos/ · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ferramentas-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/ferramenta';
const WIKT_PL = 'https://pt.wiktionary.org/wiki/ferramentas';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/ferramentum';
const WIKT_OBJ = 'https://pt.wiktionary.org/wiki/objeto';

function poemPt() {
  return `Ferramentas.
Não são só o que fica diante.
São o que a mão usa
sobre o que fica diante.

Obiectum: o posto à frente.
Ferramentum: o ferro na palma.

Todo o utensílio é objeto.
Nem todo o objeto é utensílio.

O cinzeiro recebe.
A tesoura corta.
A calculadora mede
sem ter massa.

Duas lojas no lab:
a prateleira das coisas
e a mesa que calcula.

Valeu !!!
com a ferramenta certa
neste objeto, hoje.`;
}

function poemEn() {
  return `Tools.
They are not only what stands before.
They are what the hand uses
on what stands before.

Obiectum: what is placed in front.
Ferramentum: iron in the palm.

Every tool is an object.
Not every object is a tool.

The ashtray receives.
The scissors cut.
The calculator measures
without having mass.

Two shops in the lab:
the shelf of things
and the table that calculates.

Valeu !!!
with the right tool
on this object, today.`;
}

function poemEs() {
  return `Herramientas.
No son solo lo que queda delante.
Son lo que la mano usa
sobre lo que queda delante.

Obiectum: lo puesto delante.
Ferramentum: el hierro en la palma.

Todo utensilio es objeto.
No todo objeto es utensilio.

El cenicero recibe.
La tijera corta.
La calculadora mide
sin tener masa.

Dos tiendas en el lab:
el estante de las cosas
y la mesa que calcula.

¡Valeu !!!
con la herramienta cierta
en este objeto, hoy.`;
}

function buildFerramentasBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-ferramentas.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const objetosHub = '/objetos/';
  const calcHub = '/calculadoras/';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const tecnologia = '/posts/post-inspecao-palavra-tecnologia.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';

  const body = `## Escopo

Inspeção editorial da palavra **[ferramentas](${self})** — plural de **ferramenta**: o utensílio que a [mão](${mao}) usa para agir sobre um [objeto](${objetos}). Pedido de campo: *inspeção da palavra Ferramentas relação com Objetos*.

Duas salas, um sopro. **[Objetos](${objetos})** nomeia o que **fica diante**. **Ferramentas** nomeia o objeto que **serve para agir**. Toda ferramenta é objeto; nem todo objeto é ferramenta. No site, o menu já corta duas lojas de ofício: o catálogo **[Objetos](${objetosHub})** (coisa) e o hub **[Ferramentas](${calcHub})** (cálculo).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ferramenta](${WIKT}), [ferramentas](${WIKT_PL}), lat. [*ferramentum*](${WIKT_LAT}), [objeto](${WIKT_OBJ}). **Ficha ≠ catálogo de SKU, ≠ aula de Heidegger, ≠ tutorial de oficina.** Série [Palavras](${hub}). Tom: Inspetor BudGanja — a ferramenta é objeto **em uso**. Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho tipográfico:** *ferramenta* / *ferramentas* / *tool* / *herramienta*.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **ferramentas** (plural); singular **ferramenta** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *ferramentum* («utensílio de ferro») ← *ferrum* («ferro») + *-mentum* — confiança: **alta** |
| Família | *ferramenta* · *ferramentaria* · *ferreiro* · *ferro* · *aferir* (outra árvore) |
| Cognatos / paralelos | esp. *herramienta* · fr. *outil* / *ferrament* (ant.) · it. *attrezzo* / *ferramenta* · ing. *tool* · lat. *ferramentum* · *instrumentum* (vizinho) |
| Tipo BudGanja | Palavra — objeto-em-uso × [relação](${relacao}) com [objetos](${objetos}) |
| Não é | Todo objeto · [skill](${skill}) (habilidade) · [tecnologia](${tecnologia}) (ofício do sistema) · pessoa-instrumento |
| Elo ofício | [gesto](${gesto}) · [mão](${mao}) · [caminho](${caminho}) · [verdade](${verdade}) |
| Elo catálogo | [Objetos](${objetosHub}) · [Ferramentas](${calcHub}) · [tecnologia](${tecnologia}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · ferramenta](${WIKT}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **utensílio** — coisa feita para **servir a um gesto**. No lab: sem [objeto](${objetos}) claro, a ferramenta não sabe onde corta; sem ferramenta, o objeto fica só à frente, sem ofício.

## 2. Relação — ferramenta × objeto

Pedido de campo: **relação com Objetos**. A [relação](${relacao}) aqui é de **inclusão com corte**, não de sinónimo.

| Peça | Étimo | Ofício | Teste |
|------|-------|--------|-------|
| **[objeto](${objetos})** | lat. *obiectum* (*ob-* + *iacere*) — o posto diante | O que a ficha isola | «Fica à frente?» |
| **ferramenta** | lat. *ferramentum* — peça de ferro | O que a [mão](${mao}) usa **sobre** um objeto | «Serve para agir?» |
| **utensílio** | lat. *utensilia* (*uti*, usar) | Prima de uso; menos «ferro» | Uso doméstico / oficina |
| **instrumento** | lat. *instrumentum* | Prima culta / música / medida | Violão, luxímetro, contrato |
| **aparelho / equipamento** | via fr. *appareil* / *équipement* | Sistema ou kit | Clonadora, tenda |

**H1:** *ferramenta* < *ferramentum* < *ferrum* — alta. O ferro é a matéria antiga; o sentido vivo já cobre plástico, código e cálculo.  
**H2:** **toda ferramenta é um objeto**; **nem todo objeto é ferramenta**. O [cinzeiro](${cinzeiro}) fica diante e recebe cinza — objeto. A tesoura fica diante **e corta** — objeto-ferramenta.  
**H3:** no BudGanja, o menu **separa** as lojas: [Objetos](${objetosHub}) = prateleira da *coisa*; [Ferramentas](${calcHub}) = mesa que *mede* (Super Calc, luxímetro, Super Solo). Duas lojas, um ofício.  
**H4:** ferramenta pede [gesto](${gesto}) + **alvo** (o objeto sobre o qual se age). Sem alvo, vira fetiche de gadget.  
**H5:** fecho = [Faça o seu melhor](${faca}) / [Valeu !!!](${mantra}) — a ferramenta certa **neste** objeto, hoje.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Utensílio de ferro** | Martelo, alicate, foice — o étimo | Alta |
| **Qualquer implemento** | Madeira, plástico, digital | Alta (uso vivo) |
| **Hub do site** | Título de [/calculadoras/](${calcHub}) | Alta (ofício BudGanja) |
| **Software / *devtools*** | Git, editor, calculadora | Alta (extensão contemporânea) |
| **Metáfora de pessoa** | «Fulano é uma ferramenta» | Média — **limite:** não transformar gente em utensílio |
| **Gramática / OO** | «Orientado a objetos» ≠ ferramenta | Alta — outra sala ([objetos](${objetos})) |

## 4. Duas lojas no laboratório

| Loja | URL | O que guarda | Corte |
|------|-----|--------------|-------|
| **Objetos** | [${objetosHub}](${objetosHub}) | Coisa que fica diante (clonadora, balde, [óculos](${oculos}), [interruptor](${interruptor})) | Inventário da *coisa* |
| **Ferramentas** | [${calcHub}](${calcHub}) | Calculadoras e utilitários (luz, clima, solo, EC) | Ofício de *medir* |
| **Tecnologia** | [/tecnologia/](/tecnologia/) | Aparelhos e métodos — lema [tecnologia](${tecnologia}) | Ofício do *sistema* |

O menu já avisava: *«separa a prateleira de objectos das ferramentas de cálculo»*. Esta ficha torna o corte **léxico**, não só de navegação.

## 5. Rede (só fichas existentes)

| Ficha | Relação com *ferramentas* |
|-------|---------------------------|
| [Objetos](${objetos}) · [hub](${objetosHub}) | A coisa diante; conjunto do qual a ferramenta é **subconjunto útil** |
| [Relação](${relacao}) | O **entre** — inclusão com corte, sem fundir |
| [Gesto](${gesto}) · [mão](${mao}) | A palma que empunha; a mão já foi dita «ferramenta do gesto» |
| [Skill](${skill}) | Habilidade — não é o utensílio; a *skill* usa a ferramenta |
| [Tecnologia](${tecnologia}) | Ofício dos aparelhos; a ferramenta é peça, não o sistema |
| [Interruptor](${interruptor}) | Objeto-ferramenta de corte (liga / desliga) |
| [Verdade](${verdade}) · [caminho](${caminho}) | Nomear o utensílio certo e o alvo certo |
| Hub [Inspeções](${hubAll}) | Casa das fichas |

## 6. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Pega a ferramenta»** | Utensílio da oficina | Objeto-em-uso — pedir o alvo |
| **«Ferramentas do site»** | Menu [/calculadoras/](${calcHub}) | Mesa de cálculo — não é o catálogo [Objetos](${objetosHub}) |
| **«Ferramentas de trabalho»** | Kit profissional | Ofício; ≠ [skill](${skill}) sozinha |
| **«É uma ferramenta»** (pessoa) | Metáfora dura | **Cortar** — gente não é utensílio |
| **DevTools / *tools*** | Jargão de ecrã | Extensão digital da mesma palavra |

**Finalidade-mãe:** nomear **ferramentas** como **objetos que servem ao gesto** — e guardar a [relação](${relacao}) com [objetos](${objetos}) sem fundir as lojas.

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=ferramentas)

## 8. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com esta ferramenta, neste objeto**, hoje |
| Expressão | [Faça o seu melhor](${faca}) |
| Anti-armadilha | «Comprar ferramenta sem alvo» = falso · «escolher o objeto e o utensílio» = ofício |
| Par vivo | [objetos](${objetos}) · [gesto](${gesto}) · [mão](${mao}) · [relação](${relacao}) |

**Veredicto:** Valeu !!! **com a ferramenta certa neste objeto**. Ferramentas sem [objeto](${objetos}) = gadget; objeto sem utensílio = coisa parada; os dois com [gesto](${gesto}) = ofício.

## Hipóteses (síntese)

**H1:** *ferramenta(s)* < lat. *ferramentum* / *ferrum* (alta).  
**H2:** inclusão com corte — ferramenta ⊂ objeto; objeto ⊄ ferramenta.  
**H3:** duas lojas no site — [Objetos](${objetosHub}) × [Ferramentas](${calcHub}).  
**H4:** elos = [relação](${relacao}) · [gesto](${gesto}) · [mão](${mao}) · [tecnologia](${tecnologia}).  
**H5:** fecho = [Valeu !!!](${mantra}) — utensílio certo, alvo certo.

## Limites

- Não é catálogo de marcas nem receita de oficina.  
- Não é ontologia (Heidegger *Zuhandenheit* fica fora).  
- Não trata pessoa como ferramenta.  
- O poema é **criação do laboratório**.

## Status

**Aprovado** — **ferramentas** fichadas: *ferramentum*, [relação](${relacao}) com [objetos](${objetos}), duas lojas do lab, [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Catálogo Objetos](${objetosHub}) · [▶ Hub Ferramentas](${calcHub}) · [▶ Relação](${relacao}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ferramentas** (plural of **ferramenta**) — a tool: the object the [hand](${mao}) uses to act on another [object](${objetos}). Field request: *Ferramentas in relation to Objetos*.

Etymon Lat. *ferramentum* (*ferrum* “iron” + *-mentum*). Every tool is an object; not every object is a tool. On this site the menu already splits two craft shops: the **[Objetos](${objetosHub})** catalogue (the thing) and the **[Ferramentas](${calcHub})** hub (measurement).

> Method note: [Wiktionary · ferramenta](${WIKT}), Lat. [*ferramentum*](${WIKT_LAT}). Not a brand catalogue or a Heidegger lecture. Links [relação](${relacao}), [gesto](${gesto}), [Valeu !!!](${mantra}).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **ferramentas** / **ferramenta** |
| Etymon | Lat. *ferramentum* ← *ferrum* — high confidence |
| Lab type | Object-in-use × relation to [objetos](${objetos}) |
| Site shops | [Objetos](${objetosHub}) · [Ferramentas](${calcHub}) |
| Date | ${inspected} |

## 2. Relation

**Object** = what stands before (*obiectum*). **Tool** = what the hand uses on that object. The ashtray receives (object). Scissors cut (object-tool). Super Calc measures without mass (digital tool).

## 3. Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## 4. Valeu !!!

Best possible **with this tool, on this object**, today.

## Status

**Approved** — *ferramentum* · inclusion with a cut · two shops · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Objetos](${objetos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ferramentas** (plural de **ferramenta**) — el utensilio: el objeto que la [mano](${mao}) usa para actuar sobre otro [objeto](${objetos}). Pedido de campo: *Ferramentas en relación con Objetos*.

Étimo lat. *ferramentum* (*ferrum* + *-mentum*). Toda herramienta es objeto; no todo objeto es herramienta. En el sitio el menú ya corta dos tiendas: catálogo **[Objetos](${objetosHub})** (la cosa) y hub **[Ferramentas](${calcHub})** (medir).

> Nota: [Wikcionario · ferramenta](${WIKT}), lat. [*ferramentum*](${WIKT_LAT}). No es catálogo de marcas. Vínculos [relação](${relacao}), [gesto](${gesto}), [¡Valeu !!!](${mantra}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **ferramentas** / **ferramenta** |
| Étimo | lat. *ferramentum* ← *ferrum* |
| Tipo lab | Objeto-en-uso × relación con [objetos](${objetos}) |
| Tiendas | [Objetos](${objetosHub}) · [Ferramentas](${calcHub}) |
| Fecha | ${inspected} |

## 2. Relación

**Objeto** = lo que queda delante. **Herramienta** = lo que la mano usa sobre ese objeto. El cenicero recibe; la tijera corta; la calculadora mide sin masa.

## 3. Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## 4. ¡Valeu !!!

Lo mejor posible **con esta herramienta, en este objeto**, hoy.

## Estado

**Aprobado** — *ferramentum* · inclusión con corte · dos tiendas · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildFerramentasPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildFerramentasBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 400;
  return makePalavra({
    title: 'Inspeção: Ferramentas — o objeto em uso; relação com Objetos',
    titleEn: 'Inspection: Ferramentas — the object in use; relation to Objetos',
    titleEs: 'Inspección: Ferramentas — el objeto en uso; relación con Objetos',
    excerpt:
      'Palavras: «ferramentas» (lat. *ferramentum*) — objeto que a mão usa; relação com objetos; duas lojas do lab; Valeu !!!',
    excerptEn:
      'Words: “ferramentas” (Lat. *ferramentum*) — object the hand uses; relation to objetos; two lab shops; Valeu !!!',
    excerptEs:
      'Palabras: «ferramentas» (lat. *ferramentum*) — objeto que la mano usa; relación con objetos; dos tiendas del lab; ¡Valeu !!!',
    slug: 'inspecao-palavra-ferramentas',
    date: '2026-08-24T14:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Ferramentas · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFerramentasPost,
  buildFerramentasBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  WIKT_PL,
  WIKT_LAT,
  COVER
};
