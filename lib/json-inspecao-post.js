'use strict';

/**
 * Inspeção Palavras · JSON
 * Pedido: relacionar PARK com JSON.
 * JSON = JavaScript Object Notation; soa jay-son (≠ Jason ≠ -son de Parkin).
 * PARK = recinto / verbo to park — o lab parqueia objectos no ficheiro.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/json-palavra-cover.jpg';
const HREF = '/posts/post-inspecao-palavra-json.html';
const WIKT = 'https://en.wiktionary.org/wiki/JSON';
const WIKI = 'https://en.wikipedia.org/wiki/JSON';
const WIKT_PARK = 'https://en.wiktionary.org/wiki/park';

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
  return `JSON.
Não é Jason.
Não é o filho de Parkin.
É a notação:
objectos entre chavetas.

PARK é o recinto.
JSON é onde o lab parqueia
os objectos.

A orelha ouve jay-son
e cola no -son do apelido.
O étimo corta:
JavaScript Object Notation.

Quatro letras.
Outro mapa.

Valeu !!!
objectos no recinto certo,
sem fundir o parque com o ficheiro.`;
}

function poemEn() {
  return `JSON.
It is not Jason.
It is not the son of Parkin.
It is the notation:
objects between braces.

PARK is the enclosure.
JSON is where the lab parks
the objects.

The ear hears jay-son
and glues it to the surname’s -son.
The etymon cuts:
JavaScript Object Notation.

Four letters.
Another map.

Valeu !!!
objects in the right enclosure,
without fusing the park with the file.`;
}

function poemEs() {
  return `JSON.
No es Jason.
No es el hijo de Parkin.
Es la notación:
objetos entre llaves.

PARK es el recinto.
JSON es donde el lab aparca
los objetos.

El oído oye jay-son
y lo pega al -son del apellido.
El étimo corta:
JavaScript Object Notation.

Cuatro letras.
Otro mapa.

¡Valeu !!!
objetos en el recinto cierto,
sin fundir el parque con el archivo.`;
}

function buildJsonBodies() {
  const inspected = '2026-08-25';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const parkinson = '/posts/post-inspecao-palavra-parkinson.html';
  const parque = '/posts/post-inspecao-palavra-parque-de-diversoes.html';
  const party = '/posts/post-inspecao-palavra-party.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const javascript = '/posts/post-inspecao-palavra-javascript.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const boston = '/posts/post-inspecao-palavra-boston.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[JSON](${HREF})** — a **notação** de objectos. Pedido de campo: *relacionar PARK com JSON*.

Objecto = o **acrónimo** *JSON* (JavaScript Object Notation). Relação pedida: **PARK** — as quatro letras que a orelha lê em [Parkinson](${parkinson}) e o verbo inglês *to park* (deixar no recinto). O laboratório **parqueia** objectos em ficheiros \`.json\` (\`posts.json\`, \`guia-palavras.json\`). A orelha ouve *jay-son* e cola no *-son* do apelido. O [étimo](${etimo}) **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · JSON](${WIKT}), [JSON](${WIKI}), EN [park](${WIKT_PARK}). **Ficha ≠ curso de API, ≠ esquema de base de dados, ≠ tutorial de injeção.** Irmãs: [JavaScript](${javascript}) · [script](${script}) · [node](${node}) · [opsert](${upsert}). Trio: [Parkinson](${parkinson}) · [parque de diversões](${parque}) · [party](${party}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *JSON* / *json* / *Jay-son* / *Jason* / *PARK* / \`.json\`.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **JSON** (acrónimo EN, uso BR igual) |
| Expansão | **J**ava**S**cript **O**bject **N**otation |
| Classe | Sigla / formato de dados |
| Étimo (trabalho) | Cunhagem ~2001 (Crockford): notação de **objectos** em JavaScript — confiança: **alta** |
| Pronúncia | EN *jay-son* — homófona de **Jason** |
| Tipo BudGanja | Palavra — notação × cola *jay-son* × verbo *park* |
| Não é | Jason (nome) · o *-son* de [Parkinson](${parkinson}) · [parque de diversões](${parque}) · [party](${party}) |
| Elo PARK | Recinto / *to park* — estacionar objectos no ficheiro |
| Fonte | [JSON](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o **texto ordenado** que guarda pares chave/valor entre chavetas. Não é uma pessoa. Não é um parque.

## 2. Hipóteses e método

**H1:** *JSON* = JavaScript Object Notation — alta.  
**H2:** a orelha cola *JSON* em *Jason* e no *-son* de [Parkinson](${parkinson}) — alta ([trocadilho](${trocadilho})).  
**H3:** **PARK** (letras / verbo) **não** é avô de JSON — alta.  
**H4:** relacionar PARK com JSON = etiquetar o **entre**: o lab *parks* objectos na notação — alta (leitura de ofício).  
**H5:** [parque de diversões](${parque}) é o recinto da festa escolhida; JSON é o recinto **dos dados** — alta.  
**H6:** fecho = [Valeu !!!](${mantra}).

## 3. PARK × JSON — o entre

Pedido de campo: cruzar **PARK** com **JSON**. Quatro letras contra quatro letras. Dois mapas.

| Peça | O que **parece** | O que **é** |
|------|------------------|-------------|
| **PARK** em [Parkinson](${parkinson}) | O apelido vem do recinto | Parkin = Pedro; *park* (*parricus*) é outro avô |
| **PARK** verbo (*to park*) | Estacionar o carro | Deixar no recinto; no lab: **parquear objectos** no \`.json\` |
| **JSON** | Um *Jay-son* / filho | Notação de objectos; **não** patronímico |
| **PARK + JSON** | Um só étimo | Colocação de ofício: *park it in JSON* — [relação](${relacao}), não sangue |
| **{ }** | Um parque de diversões | Chavetas — o recinto **escrito** |

**H-parquear:** o inglês *park* (verbo) herda o recinto. O lab usa o gesto: objectos **ficam** no JSON até o [script](${script}) os ler. Relacionar é **nomear o recinto dos dados**. Não fundir com o [parque de diversões](${parque}).

## 4. Étimo — a notação, não o filho

| Peça | Leitura | Confiança |
|------|---------|-----------|
| **JavaScript** | Língua; a notação nasceu no seu literal de objecto | Alta |
| **Object** | O que se guarda — par chave/valor | Alta |
| **Notation** | Sistema de escrita, não a coisa escrita | Alta |
| **JSON** | Acrónimo da notação (ECMA-404 / RFC 8259) | Alta |
| **Folk «Jason»** | Homofonia EN | [Trocadilho](${trocadilho}) — recusado como étimo |
| **Folk «-son de Parkin»** | *jay-son* ≈ Parkinson | Recusado — o *-son* do apelido é patronímico inglês |

**Veredicto:** JSON **nomeia o formato**. Jason **nomeia pessoas**. Parkinson **nomeia o filho de Parkin**. Três mapas.

## 5. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **JSON** = **Jason** | A mesma boca | Notação × antropónimo grego (*Iásōn*) |
| **JSON** = *-son* | É o filho no apelido | Homofonia com [Parkinson](${parkinson}); avô outro |
| **PARK** = JSON | Quatro letras = um étimo | Recinto / verbo × notação |
| **.json** = o site | O ficheiro *é* a página | Rasto de dados; a página é HTML |
| **parse JSON** | Magia | [Gesto](${gesto}) de ler o recinto — ofício, como [script](${script}) |

Método: [a orelha cola](${orelha}); o [étimo](${etimo}) corta. Irmão: [Boston](${boston}) × bosta.

## 6. Usos no laboratório

| Uso | Bom × mau |
|-----|-----------|
| **Guardar** | Bom: parquear a ficha em \`posts.json\` · Mau: achar que JSON é o apelido |
| **Ler** | Bom: [script](${script}) / [node](${node}) lê o recinto · Mau: tutorial ofensivo |
| **Nomear** | Bom: dizer JSON quando é notação · Mau: dizer Jason quando é o ficheiro |
| **Cruzar PARK** | Bom: o verbo *park* + o recinto dos dados · Mau: fundir com montanha-russa |

**Finalidade-mãe:** o objecto **fica** no recinto certo — JSON para dados; [parque](${parque}) para a festa escolhida; [Parkinson](${parkinson}) para o nome.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **PARK** · [parque de diversões](${parque}) | Recinto da festa; o verbo *park* empresta o gesto de deixar |
| **[Parkinson](${parkinson})** | Apelido — cola *jay-son* recusada |
| **[Party](${party})** | *PAR-* visível; festa, não formato |
| [JavaScript](${javascript}) · [script](${script}) · [node](${node}) · [opsert](${upsert}) | A língua da notação · quem escreve e lê o recinto |
| [Trocadilho](${trocadilho}) · [etimologia](${etimologia}) · [orelha cola](${orelha}) | Cola × corte |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) · [Guia](${guia}) · [hub](${hub}) | Solo |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) · [Vida](${vidaHub}) | Fecho |

## 8. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=json)

## Limites

- Não é aula de JSON Schema, REST ou base de dados.  
- Não funde Jason (mito / nome) com a notação.  
- Não usa o recinto dos dados como metáfora da doença.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **JSON** fichado como JavaScript Object Notation; relação **PARK × JSON** = *to park* objectos no recinto escrito; cola *jay-son* / *-son* de [Parkinson](${parkinson}) recusada.

[▶ Palavras](${hub}) · [▶ Parkinson](${parkinson}) · [▶ Parque de diversões](${parque}) · [▶ Party](${party}) · [▶ Script](${script}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **JSON** — JavaScript Object Notation. Field: *relate PARK with JSON*.

PARK is the enclosure / the verb *to park*. The lab **parks** objects in \`.json\` files. The ear hears *jay-son* and glues it to [Parkinson](${parkinson})’s *-son*. The [etymon](${etimo}) **cuts**. Not Jason. Not the amusement [park](${parque}).

\`\`\`poem
${poemEn()}
\`\`\`

[▶ Words](${hub}) · [▶ Parkinson](${parkinson}) · [▶ Park](${parque}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **JSON** — JavaScript Object Notation. Pedido: *relacionar PARK con JSON*.

PARK es el recinto / el verbo *to park*. El lab **aparca** objetos en \`.json\`. El oído oye *jay-son* y lo pega al *-son* de [Parkinson](${parkinson}). El [étimo](${etimo}) **corta**. No es Jason. No es el [parque de diversiones](${parque}).

\`\`\`poem
${poemEs()}
\`\`\`

[▶ Palabras](${hub}) · [▶ Parkinson](${parkinson}) · [▶ Parque](${parque}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildJsonPost() {
  const { body, contentEn, contentEs } = buildJsonBodies();
  const post = makePalavra({
    title: 'Inspeção: JSON — notação; PARK parqueia objectos; ≠ Jason ≠ Parkinson',
    titleEn: 'Inspection: JSON — notation; PARK parks objects; ≠ Jason ≠ Parkinson',
    titleEs: 'Inspección: JSON — notación; PARK aparca objetos; ≠ Jason ≠ Parkinson',
    excerpt:
      'Palavras: JSON = JavaScript Object Notation; relacionar PARK (recinto / to park); cola jay-son com Parkinson recusada; Valeu !!!',
    excerptEn:
      'Words: JSON = JavaScript Object Notation; relate PARK (enclosure / to park); jay-son glue to Parkinson refused; Valeu !!!',
    excerptEs:
      'Palabras: JSON = JavaScript Object Notation; relacionar PARK (recinto / to park); cola jay-son con Parkinson rechazada; ¡Valeu !!!',
    slug: 'inspecao-palavra-json',
    date: '2026-08-25T10:00:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-json', 344),
    seriesLabel: 'JSON · PARK',
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
  buildJsonPost,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  HREF,
  WIKT,
  WIKI
};
