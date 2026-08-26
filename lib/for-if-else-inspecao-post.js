'use strict';

/**
 * Inspeção Palavras · for / if / else
 * Aula 0 de programar no catálogo Tecnologia.
 * Eixos: três palavras-reservadas · decidir (if) · outro caminho (else) ·
 * repetir com fim (for) · ≠ for da Maria · ≠ loop infinito · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/for-if-else-palavra-cover.jpg';
const WIKT_IF = 'https://en.wiktionary.org/wiki/if';
const WIKT_ELSE = 'https://en.wiktionary.org/wiki/else';
const WIKT_FOR = 'https://en.wiktionary.org/wiki/for';
const WIKI_IF = 'https://en.wikipedia.org/wiki/Conditional_(computer_programming)';
const WIKI_FOR = 'https://en.wikipedia.org/wiki/For_loop';
const WIKI_CTRL = 'https://en.wikipedia.org/wiki/Control_flow';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `If pergunta.
Else é o outro pé.
For volta — e tem porta.

Não é o for da Maria.
Não é o loop sem saída.
É a aula zero:
perguntar, escolher, repetir
e parar.

O vaso está húmido?
Se sim, não regar.
Senão, regar.
Quatro vasos: for.

Valeu !!!
com condição
e com fim.`;
}

function poemEn() {
  return `If asks.
Else is the other foot.
For turns — and has a door.

It is not Maria’s for.
It is not the loop with no exit.
It is lesson zero:
ask, choose, repeat
and stop.

Is the pot wet?
If yes, do not water.
Else, water.
Four pots: for.

Valeu !!!
with a condition
and with an end.`;
}

function poemEs() {
  return `If pregunta.
Else es el otro pie.
For vuelve — y tiene puerta.

No es el for de Maria.
No es el loop sin salida.
Es la aula cero:
preguntar, elegir, repetir
y parar.

¿La maceta está húmeda?
Si sí, no regar.
Si no, regar.
Cuatro macetas: for.

¡Valeu !!!
con condición
y con fin.`;
}

function buildForIfElseBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const cat = '/tecnologia/';
  const self = '/posts/post-inspecao-palavra-for-if-else.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const loop = '/posts/post-inspecao-palavra-loop.html';
  const loopInf = '/posts/post-inspecao-expressao-loop-infinito.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const maria = '/posts/post-inspecao-palavra-maria.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const tecnologia = '/posts/post-inspecao-palavra-tecnologia.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';

  const body = `## Escopo

Inspeção-aula de **[for / if / else](${self})** — as três palavras-reservadas com que se **começa a programar**. Pedido de campo: *inspeção For If Else, tecnologia programação, vamos ensinar a programar por ali*. Esta ficha é a **Aula 0** do catálogo **[Tecnologia](${cat})**. Não é o [for](${maria}) da Maria (preposição / conjuntivo). Não é o [loop](${loop}) sem porta. É o ofício de **decidir**, **tomar o outro caminho** e **repetir com fim**.

> **Nota metodológica:** auditoria independente. Fontes: [if](${WIKT_IF}), [else](${WIKT_ELSE}), [for](${WIKT_FOR}), [conditional](${WIKI_IF}), [for loop](${WIKI_FOR}), [control flow](${WIKI_CTRL}). **Exemplos em JavaScript** — a língua do sítio e do [Node](${node}). **Ficha ≠ curso de informática, ≠ tutorial de exploit, ≠ caixa que executa o que o visitante escrever.** A bancada em [Tecnologia](${cat}) é demonstração fechada (regar vasos). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *if* / *else* / *for* / *se* / *senão* / *para cada* / *estrutura de controlo* → **for / if / else**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **if** · **else** · **for** (palavras-reservadas EN, vivas no código BR) |
| PT de oficina | *se* · *senão* · *para cada* / *de 1 até n* |
| Classe | Palavras-reservadas de **fluxo de controlo** |
| Étimo (trabalho) | EN *if* «se» · *else* «senão / outro» · *for* «para» — confiança **alta** no uso; o *for* do código é a sala C da ficha [Maria](${maria}), não a preposição dedicada |
| Tipo BudGanja | Palavra — aula 0 de programar no hub [Tecnologia](${cat}) |
| Peça escrita | [script](${script}) |
| Peça que regressa | [loop](${loop}) — *for* é um loop **com porta** |
| Sem porta | [loop infinito](${loopInf}) |
| Gesto irmão | [interruptor](${interruptor}) · [ligar / desligar](${ligar}) |
| Fonte | [control flow](${WIKI_CTRL}) |
| Data | ${inspected} |

**O que é o objecto:** três [gestos](${gesto}) que a máquina obedece. **if** pergunta. **else** é o outro pé. **for** volta um número de vezes e **para**. Sem isto, um [script](${script}) só anda em linha recta. Com isto, o [caminho](${caminho}) ramifica e pode regressar — com [exit](${exit}).

## 2. Três salas do *for* (não fundir)

| Sala | Onde | Ofício |
|------|------|--------|
| **A. Preposição** | EN *for Maria* ≈ PT *para Maria* | [Maria](${maria}) |
| **B. Conjuntivo PT** | *quando eu for* | *ser* / *ir* — [Maria](${maria}) |
| **C. Laço de código** | \`for (…)\` | **Esta ficha** — repetir com fim |

**H1:** o grafema *for* abre três portas; o lab **corta**.  
**H2:** programar aqui é a sala C. A aula vive em [Tecnologia](${cat}).  
**H3:** *if* / *else* não têm homógrafo de nome próprio nesta casa — são o [interruptor](${interruptor}) do texto.

## 3. If — o interruptor

*If* (EN «se») é a pergunta. O [interruptor](${interruptor}) corta ou deixa passar; o *if* faz o mesmo com uma **condição**.

\`\`\`javascript
var humido = true;

if (humido) {
  // não regar
}
\`\`\`

| Peça | Ofício |
|------|--------|
| \`if\` | «Se isto for verdade…» |
| \`(humido)\` | A pergunta — verdadeiro ou falso |
| \`{ … }\` | O bloco — o que acontece **só** se a resposta for sim |

**H4:** *if* sem *else* é um interruptor que **só liga um lado**. O outro lado fica calado.

## 4. Else — o outro caminho

*Else* (EN «senão») é o pé que o *if* não tomou. Irmão de [ligar / desligar](${ligar}): um ramo **ou** o outro — não os dois no mesmo instante.

\`\`\`javascript
if (humido) {
  console.log('não regar');
} else {
  console.log('regar');
}
\`\`\`

| Uso | Ofício |
|-----|--------|
| Bom | Um sim e um não claros — o vaso húmido × o vaso seco |
| Bom | *else if* quando há **mais** do que dois caminhos (ainda não é esta aula) |
| Mau | Dois *if* soltos que se contradizem |
| Mau | *else* sem *if* — não existe sozinho |

**H5:** *else* não pergunta. Herda a pergunta do *if* e responde **o contrário**.

## 5. For — repetir com porta

*For* no código é um [loop](${loop}) **com fim**. Três peças no cabeçalho: **começo**, **condição**, **passo**. Sem condição de paragem vira [loop infinito](${loopInf}) — outra ficha; o antídoto é [exit](${exit}).

\`\`\`javascript
for (var vaso = 1; vaso <= 4; vaso = vaso + 1) {
  console.log('inspecionar vaso ' + vaso);
}
\`\`\`

| Peça | Ofício |
|------|--------|
| \`vaso = 1\` | Começo — o primeiro vaso |
| \`vaso <= 4\` | Porta — enquanto for verdade, volta |
| \`vaso = vaso + 1\` | Passo — avança um; sem isto, não sai |
| \`{ … }\` | O corpo — o que se faz **em cada** volta |

**H6:** todo *for* é um loop; **nem** todo loop é um *for*.  
**H7:** o *for* desta aula **tem porta**. O sem-porta mora em [loop infinito](${loopInf}).

## 6. As três juntas — o primeiro programa do lab

Um [script](${script}) pequeno: para cada vaso, perguntar se está húmido; se sim, não regar; senão, regar.

\`\`\`javascript
var vasos = ['húmido', 'seco', 'húmido', 'seco'];

for (var i = 0; i < vasos.length; i = i + 1) {
  if (vasos[i] === 'húmido') {
    console.log('vaso ' + (i + 1) + ': não regar');
  } else {
    console.log('vaso ' + (i + 1) + ': regar');
  }
}
\`\`\`

Isto **não** corre na ficha — lê-se. A **bancada** em [Tecnologia](${cat}#tecnologia-aula) demonstra o mesmo gesto sem executar texto livre.

**H8:** programar no BudGanja começa por **ler** o [script](${script}), não por disparar a máquina.  
**H9:** a língua da aula é JavaScript por causa do [Node](${node}) da casa — o *if / else / for* existe em C, Java, Python com a mesma ideia.

## 7. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **If** | Magia / destino | Pergunta verdadeira ou falsa |
| **Else** | Castigo do ramo errado | O outro pé da mesma pergunta |
| **For** | O *for* da [Maria](${maria}) | Laço com porta — sala C |
| **Loop** | Sinónimo de *for* | Peça; *for* é uma forma |
| **Script** | O programa inteiro | A sequência escrita que **contém** if/else/for |
| **Bancada** | Consola para escrever exploits | Demonstração fechada de rega |

## 8. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *if / else / for* como aula 0 em [Tecnologia](${cat}) |
| Bom | Mandar o *for* da preposição para [Maria](${maria}) |
| Bom | Mandar o sem-fim para [loop infinito](${loopInf}) |
| Bom | Ler o exemplo do vaso antes de copiar |
| Mau | Fundir salas A/B/C do *for* |
| Mau | *for* sem porta e chamar-lhe aula |
| Mau | Tutorial ofensivo disfarçado de *if* |

## 9. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=for-if-else)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tecnologia](${cat}) | Catálogo — bancada da aula 0 |
| [Tecnologia](${tecnologia}) (lema) | *tékhnē* + *lógos* |
| [Script](${script}) · [Node](${node}) | Texto e runtime |
| [Loop](${loop}) · [loop infinito](${loopInf}) · [exit](${exit}) | Volta × sem porta × saída |
| [Maria](${maria}) | *for* preposição / conjuntivo — salas A e B |
| [Interruptor](${interruptor}) · [ligar / desligar](${ligar}) | Gesto hardware do *if / else* |
| [Pattern](${pattern}) · [skill](${skill}) · [commitar](${commitar}) · [opsert](${upsert}) | Molde, ofício, rasto |
| [Gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [língua](${lingua}) · [Guia](${guia}) | Ofício |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é curso universitário nem certificação.  
- Não executa código que o visitante escreva.  
- Não é tutorial de *while*, funções, variáveis avançadas — aulas seguintes, se o campo pedir.  
- O *for* da [Maria](${maria}) não se inspeciona aqui.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **for / if / else** fichados como aula 0 de programar; eixo **programação** no catálogo [Tecnologia](${cat}); salas cortadas (Maria, loop infinito, exploit). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Catálogo](${cat}) · [▶ Script](${script}) · [▶ Loop](${loop}) · [▶ Maria](${maria}) · [▶ Poema Vida](/vida/#poema=for-if-else) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection-lesson of **[for / if / else](${self})** — the three reserved words with which one **starts to program**. Field request: teach programming from the [Tecnologia](${cat}) catalog. Not Maria’s [for](${maria}). Not a doorless [loop](${loop}). JavaScript examples; closed demo on the hub. Close: [Valeu !!!](${mantra}).

> Sources: [if](${WIKT_IF}), [else](${WIKT_ELSE}), [for](${WIKT_FOR}), [control flow](${WIKI_CTRL}). Not an exploit tutorial. Not a free code box.

## Object

| Field | Value |
|-------|-------|
| Anchors | **if** · **else** · **for** |
| Craft | Ask, take the other path, repeat with an end |
| Written piece | [script](${script}) |
| Sister rooms | [Maria](${maria}) (preposition) · [infinite loop](${loopInf}) |
| Date | ${inspected} |

**H1:** *if* = the [switch](${interruptor}). **H2:** *else* = the other foot. **H3:** *for* = a [loop](${loop}) with a door.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Lesson 0 of [Tecnologia](${cat}). Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección-aula de **[for / if / else](${self})** — las tres palabras reservadas con las que se **empieza a programar**. Pedido: enseñar a programar desde el catálogo [Tecnologia](${cat}). No es el [for](${maria}) de Maria. No es el [loop](${loop}) sin puerta. Ejemplos en JavaScript; demostración cerrada en el hub. Cierre: [¡Valeu !!!](${mantra}).

> Fuentes: [if](${WIKT_IF}), [else](${WIKT_ELSE}), [for](${WIKT_FOR}), [control flow](${WIKI_CTRL}). No es tutorial de exploit. No es caja de código libre.

## Objeto

| Campo | Valor |
|-------|-------|
| Anclas | **if** · **else** · **for** |
| Oficio | Preguntar, tomar el otro camino, repetir con fin |
| Pieza escrita | [script](${script}) |
| Salas hermanas | [Maria](${maria}) (preposición) · [loop infinito](${loopInf}) |
| Fecha | ${inspected} |

**H1:** *if* = el [interruptor](${interruptor}). **H2:** *else* = el otro pie. **H3:** *for* = un [loop](${loop}) con puerta.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Aula 0 de [Tecnologia](${cat}). Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildForIfElsePost() {
  const { body, contentEn, contentEs } = buildForIfElseBodies();
  const seriesOrder = pickOrder('inspecao-palavra-for-if-else', 330);
  return makePalavra({
    title: 'Inspeção: For / If / Else — aula 0 de programar',
    titleEn: 'Inspection: For / If / Else — programming lesson 0',
    titleEs: 'Inspección: For / If / Else — aula 0 de programar',
    excerpt:
      'Palavras: for / if / else — decidir, o outro caminho, repetir com fim; aula 0 em /tecnologia/; ≠ Maria ≠ loop infinito; Valeu !!!',
    excerptEn:
      'Words: for / if / else — decide, the other path, repeat with an end; lesson 0 at /tecnologia/; ≠ Maria ≠ infinite loop; Valeu !!!',
    excerptEs:
      'Palabras: for / if / else — decidir, el otro camino, repetir con fin; aula 0 en /tecnologia/; ≠ Maria ≠ loop infinito; ¡Valeu !!!',
    slug: 'inspecao-palavra-for-if-else',
    date: '2026-08-24T13:20:00.000Z',
    seriesOrder,
    seriesLabel: 'For · if · else',
    coverImage: COVER,
    sourceUrl: WIKI_CTRL,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildForIfElsePost,
  buildForIfElseBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKI_CTRL
};
