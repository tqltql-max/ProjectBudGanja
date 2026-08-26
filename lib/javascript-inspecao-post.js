'use strict';

/**
 * Inspeção Palavras · JavaScript
 * Pedido: java + sCRIPT — o composto Java + Script.
 * Java ≠ JavaScript; o + é cola de marketing (1995), não sangue de língua.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/javascript-palavra-cover.jpg';
const HREF = '/posts/post-inspecao-palavra-javascript.html';
const WIKT = 'https://en.wiktionary.org/wiki/JavaScript';
const WIKI = 'https://en.wikipedia.org/wiki/JavaScript';
const WIKT_JAVA = 'https://en.wiktionary.org/wiki/Java';
const WIKT_SCRIPT = 'https://en.wiktionary.org/wiki/script';
const WIKI_ES = 'https://en.wikipedia.org/wiki/ECMAScript';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 600) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Java + Script.
Dois núcleos.
Um composto de cartaz.

Java é a ilha e o café
e outra língua.
Script é o escrito.

O mais não é sangue.
O mais é 1995:
LiveScript virou JavaScript
para parecer da casa Java.

A orelha cola:
é o Java em script.
O étimo corta:
são duas línguas.

No lab a língua vive
em .js, na tag, no Node.
JSON parqueia os objectos.

Valeu !!!
o composto lido,
sem fundir o café com o interpretador.`;
}

function poemEn() {
  return `Java + Script.
Two nuclei.
One billboard compound.

Java is the island and the coffee
and another language.
Script is the writing.

The plus is not blood.
The plus is 1995:
LiveScript became JavaScript
to look like Java’s house.

The ear glues:
it is Java in script form.
The etymon cuts:
they are two languages.

In the lab the tongue lives
in .js, in the tag, in Node.
JSON parks the objects.

Valeu !!!
the compound read,
without fusing the coffee with the interpreter.`;
}

function poemEs() {
  return `Java + Script.
Dos núcleos.
Un compuesto de cartel.

Java es la isla y el café
y otra lengua.
Script es lo escrito.

El más no es sangre.
El más es 1995:
LiveScript viró JavaScript
para parecer de la casa Java.

El oído pega:
es el Java en script.
El étimo corta:
son dos lenguas.

En el lab la lengua vive
en .js, en la etiqueta, en Node.
JSON aparca los objetos.

¡Valeu !!!
el compuesto leído,
sin fundir el café con el intérprete.`;
}

function buildJavascriptBodies() {
  const inspected = '2026-08-25';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const json = '/posts/post-inspecao-palavra-json.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const forIf = '/posts/post-inspecao-palavra-for-if-else.html';
  const loop = '/posts/post-inspecao-palavra-loop.html';
  const tecnologia = '/posts/post-inspecao-palavra-tecnologia.html';
  const tecHub = '/tecnologia/';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[JavaScript](${HREF})** — composto inglês **Java + Script**. Pedido de campo: *java + sCRIPT* (a boca parte o camelCase). Dois núcleos. Um **+** de cartaz. A orelha cola: «é o [Java](${WIKT_JAVA}) em [script](${script})». O [étimo](${etimo}) **corta**.

Objecto = o **nome da língua** do browser e do [Node](${node}) desta casa. Não é a língua **Java**. Não é o café da ilha. Não é o [script](${script}) sozinho (sequência escrita). O mais junta um íman de marca (Java, 1995) a um género (*scripting language*). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · JavaScript](${WIKT}), [JavaScript](${WIKI}), [Java](${WIKT_JAVA}), [script](${WIKT_SCRIPT}), [ECMAScript](${WIKI_ES}). **Ficha ≠ curso de programação, ≠ tutorial de injecção, ≠ aula de Java.** Irmãs: [script](${script}) · [JSON](${json}) · [node](${node}) · [for / if / else](${forIf}). Composto-irmão: [homepage](${homepage}) (home + page). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *JavaScript* / *javascript* / *JS* / *java + script* / *ECMAScript* / *LiveScript* / *Mocha* (codinome 1995) → lema **JavaScript**. *Java* sozinha → **não** é este lema (outra língua). *script* sozinho → [script](${script}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **JavaScript** (camelCase EN, uso BR igual) |
| Pedido de campo | **java + sCRIPT** — o olho parte o composto |
| Expansão | **Java** + **Script** |
| Classe | Composto de marca (1995) / nome de língua |
| Étimo (trabalho) | Netscape: Mocha → LiveScript → **JavaScript** (acordo de marketing com Sun) — confiança: **alta** |
| Grafias vivas | *JavaScript* · *javascript* · **JS** · *ECMAScript* (norma) · \`.js\` |
| Tipo BudGanja | Palavra — composto × cola «é o Java» recusada |
| Não é | A língua **Java** · o café / a ilha · o [script](${script}) genérico · um destino |
| Elo peças | [script](${script}) (o escrito) · Java (outra língua, íman de cartaz) |
| Elo lab | Tag \`<script>\` · pasta \`scripts/*.js\` · [opsert](${upsert}) · [Node](${node}) |
| Elo dados | [JSON](${json}) = *Java**S**cript **O**bject **N**otation* |
| Elo aula | [for / if / else](${forIf}) em [Tecnologia](${tecHub}) |
| Fonte | [JavaScript](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome** da língua de *scripting* da Web. Não é um tutorial. Não é o café.

## 2. Hipóteses e método

**H1:** *JavaScript* = composto **Java + Script** — alta.  
**H2:** o **+** é cola de **marketing** (1995), não parentesco de línguas — alta.  
**H3:** a orelha cola *JavaScript* em *Java* («é o Java em script») — alta ([trocadilho](${trocadilho}) / [cola](${cola}) de marca).  
**H4:** Java (Gosling / Sun) e JavaScript (Eich / Netscape) são **duas línguas** — alta.  
**H5:** a peça **Script** é a mesma da ficha [script](${script}) (lat. *scrīptum*) — alta.  
**H6:** a peça **Java** no composto é o **íman** da marca-café, não a ilha como étimo da língua do browser — alta.  
**H7:** fecho = [Valeu !!!](${mantra}).

## 3. Java + Script — o entre

Pedido de campo: partir **java + sCRIPT**. Como [homepage](${homepage}) parte *home + page*. Dois núcleos. Um composto. Não fundir.

| Peça | O que **parece** | O que **é** |
|------|------------------|-------------|
| **Java** | A língua Java; ou o café da ilha | Íman de marca (1995). A língua Java é **outra**. O café nomeou *essa* língua, não esta |
| **Script** | «Versão script do Java» | Género: língua de [script](${script}) — sequência interpretada no browser |
| **o +** | Sangue / dialecto | [Relação](${relacao}) de cartaz: *parecer da casa Java* |
| **JavaScript** (colado) | Uma só substância | Grafia camelCase do composto; as duas peças continuam legíveis |
| **java + sCRIPT** | Erro de maiúsculas | Leitura de ofício: o olho **mostra** a costura |

**H-composto:** *homepage* cola *home* e *page* com ofício real (folha de partida). *JavaScript* cola *Java* e *Script* com ofício de **cartaz**. Relacionar é **nomear a costura**. Não fundir as línguas.

## 4. Étimo — os dois núcleos e o cartaz

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **Script** | Lat. *scrīptum* ← *scrībere* → EN *script* — ver [script](${script}) | Alta |
| **Java** (ilha / café) | Topónimo da ilha → café; a língua Java toma o café como marca | Alta (para a língua **Java**) |
| **Java** (no composto JS) | Empréstimo do **nome da marca** Java, não do código Java | Alta |
| **Mocha** (1995) | Codinome interno (porto de café) — ainda o eixo café, **antes** do íman Java | Alta (história da casa) |
| **LiveScript** | *live + script* — nome intermédio no Netscape | Alta |
| **JavaScript** | Renomeação 1995 (Netscape + Sun): o cartaz cola no hype Java | Alta |
| **ECMAScript** | Nome da **norma** (ECMA-262) — a língua sem o cartaz Sun | Alta |
| **JS** | Sigla oral / ficheiro \`.js\` | Alta (uso vivo) |
| **Folk «é o Java»** | Dialectos / subset | Recusado — sintaxe e máquina **outras** |

**Veredicto etimológico:** JavaScript **nomeia a língua do browser** com um composto de cartaz. Java **nomeia outra língua** (e um café, e uma ilha). Script **nomeia o escrito**. Três mapas. O [étimo](${etimo}) corta o sangue; a [etimologia](${etimologia}) guarda o cartaz.

## 5. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **JavaScript** = **Java** | A mesma boca, a mesma casa | Homografia da peça *Java*; línguas distintas |
| **JavaScript** = *script de Java* | Dialectos | Género *scripting* × marca Java — [cola](${cola}), não herança |
| **Mocha** = café | O nome «é» a bebida | Codinome 1995; hoje também test runner — **outra** sala |
| **JS** = o site | O ficheiro *é* a página | Rasto; a página é HTML + [script](${script}) |
| **ECMAScript** = outro bicho | Rebranding confuso | A **norma**; JavaScript é o nome vivo da mesma família |
| **\`<script>\`** = JavaScript | A tag *é* a língua | A tag **aloja** o [script](${script}); a língua desta casa é JS |

Método: [a orelha cola](${orelha}); o [étimo](${etimo}) corta. Irmão de corte: [homepage](${homepage}) × Homer.

## 6. Usos no laboratório

| Uso | Bom × mau |
|-----|-----------|
| **Nomear** | Bom: dizer JavaScript / JS quando é a língua do sítio · Mau: dizer Java quando é \`.js\` |
| **Ler** | Bom: [gesto](${gesto}) de inspecionar o [script](${script}) · Mau: tutorial ofensivo |
| **Correr** | Bom: [Node](${node}) interpreta a sequência da pasta \`scripts/\` · Mau: fé cega no ficheiro |
| **Guardar** | Bom: [JSON](${json}) parqueia objectos que o JS lê · Mau: fundir JSON com Jason |
| **Aprender** | Bom: aula 0 em [for / if / else](${forIf}) / [Tecnologia](${tecHub}) · Mau: [loop](${loop}) sem porta |
| **Partir o nome** | Bom: *java + sCRIPT* mostra a costura · Mau: achar que maiúsculas mudam o étimo |

**Finalidade-mãe:** o composto **fica** lido — Java para a outra língua / o café; Script para o escrito; JavaScript para a língua desta casa.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Script](${script}) | A peça direita — sequência escrita; ≠ destino |
| [JSON](${json}) | A notação de objectos desta língua; PARK parqueia |
| [Node](${node}) | O interpretador fora do browser (*nodus*, não nudes) |
| [for / if / else](${forIf}) | Aula 0 — palavras-reservadas na língua JS |
| [Loop](${loop}) · [Tecnologia](${tecnologia}) | Porta do ciclo · catálogo do ofício |
| [Homepage](${homepage}) | Composto-irmão (*home + page*); a tag vive na porta |
| [Opsert](${upsert}) · [commitar](${commitar}) · [skill](${skill}) · [pattern](${pattern}) | Ofício dos \`.js\` da casa |
| [Trocadilho](${trocadilho}) · [etimologia](${etimologia}) · [orelha cola](${orelha}) · [cola](${cola}) | Cola × corte |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) · [Guia](${guia}) · [hub](${hub}) | Solo |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) · [Vida](${vidaHub}) | Fecho |

## 8. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=javascript)

## Limites

- Não é curso de JavaScript, Java, ECMAScript ou Node.  
- Não ensina injecção, exploit nem automação ofensiva.  
- Não funde Java (língua / café / ilha) com JavaScript.  
- Mocha (codinome 1995) ≠ mocha (bebida) ≠ Mocha (test runner) como étimo único.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **JavaScript** fichado como composto **Java + Script**; o **+** é cartaz de 1995, não sangue; cola «é o Java» recusada; peça direita = [script](${script}); dados = [JSON](${json}); runtime = [Node](${node}).

[▶ Palavras](${hub}) · [▶ Script](${script}) · [▶ JSON](${json}) · [▶ Node](${node}) · [▶ for / if / else](${forIf}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **[JavaScript](${HREF})** — English compound **Java + Script**. Field request: *java + sCRIPT* (the eye splits the camelCase). Two nuclei. One billboard **+**. The ear glues: “it is [Java](${WIKT_JAVA}) in [script](${script}) form.” The [etymon](${etimo}) **cuts**.

Not the Java language. Not the coffee. Not [script](${script}) alone. The plus joins a 1995 brand magnet to a genre (*scripting language*). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

[▶ Words](${hub}) · [▶ Script](${script}) · [▶ JSON](${json}) · [▶ Node](${node}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[JavaScript](${HREF})** — compuesto inglés **Java + Script**. Pedido: *java + sCRIPT* (el ojo parte el camelCase). Dos núcleos. Un **+** de cartel. El oído pega: «es el [Java](${WIKT_JAVA}) en [script](${script})». El [étimo](${etimo}) **corta**.

No es la lengua Java. No es el café. No es el [script](${script}) solo. El más junta un imán de marca (1995) a un género (*scripting language*). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

[▶ Palabras](${hub}) · [▶ Script](${script}) · [▶ JSON](${json}) · [▶ Node](${node}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildJavascriptPost() {
  const { body, contentEn, contentEs } = buildJavascriptBodies();
  const post = makePalavra({
    title: 'Inspeção: JavaScript — Java + Script; o + é cartaz, não sangue',
    titleEn: 'Inspection: JavaScript — Java + Script; the plus is a billboard, not blood',
    titleEs: 'Inspección: JavaScript — Java + Script; el más es cartel, no sangre',
    excerpt:
      'Palavras: JavaScript ← Java + Script; cola «é o Java» recusada; ≠ café ≠ ilha; elos script/JSON/Node; Valeu !!!',
    excerptEn:
      'Words: JavaScript ← Java + Script; “it is Java” glue refused; ≠ coffee ≠ island; links script/JSON/Node; Valeu !!!',
    excerptEs:
      'Palabras: JavaScript ← Java + Script; cola «es el Java» rechazada; ≠ café ≠ isla; vínculos script/JSON/Node; ¡Valeu !!!',
    slug: 'inspecao-palavra-javascript',
    date: '2026-08-25T12:00:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-javascript', 345),
    seriesLabel: 'JavaScript · Java + Script',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = WIKT;
  return post;
}

module.exports = {
  buildJavascriptPost,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  HREF,
  WIKT,
  WIKI,
  WIKT_JAVA,
  WIKI_ES
};
