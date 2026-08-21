'use strict';

/**
 * Inspeção Expressões · puta que pariu (PQP)
 * Eixos: interjeição BR · peças puta + pariu · lugar longe ·
 * termómetro emocional · respeito · Faça o melhor!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildPutaQuePariuBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const puta = '/posts/post-inspecao-palavra-puta.html';
  const pariu = '/posts/post-inspecao-palavra-pariu.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const vida = '/vida/';
  const wiki = 'https://pt.wiktionary.org/wiki/puta_que_pariu';

  const body = `## Escopo

Inspeção editorial da expressão oral brasileira **«puta que pariu»** (sigla viva **PQP**) — forma canónica lab nesta ficha. Interjeição de **pico emocional**: raiva, frustração, susto, às vezes euforia; também lugar «muito longe» e mandado embora. Peças etimológicas: [puta](${puta}) + [pariu](${pariu}). Tom: Inspetor BudGanja — **mapear o sopro sem glamourizar o estigma**.

> **Nota metodológica:** [Wiktionary · puta que pariu](${wiki}); fichas [puta](${puta}) e [pariu](${pariu}). Objecto = a **locução** na oralidade BR. **Ficha ≠ convite ao insulto.** Escala de tom com [aff](${aff}), [jesusudavi](${jesusudavi}), [jesusamando](${jesusamando}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão (lab) | **puta que pariu** / **PQP** |
| Tipo | Locução interjetiva · também locução de lugar |
| Peças | [puta](${puta}) · *que* · [pariu](${pariu}) |
| Núcleo semântico | Pico · explosão · «não aguento / não acredito / que lonjura» |
| Escala de tom | [aff](${aff}) ← → **PQP** (explosão) ← → [jesusudavi](${jesusudavi}) (espanto) ← → [jesusamando](${jesusamando}) (calor) |
| Tipo BudGanja | Expressão — válvula de pressão |
| Elo ofício | [respeito](${respeito}) · [gesto](${gesto}) · [Faça o melhor!](${mantra}) |
| Elo afecto | [raiva](${raiva}) · [medo](${medo}) · [alegria](${alegria}) · [emoção](${emocao}) |
| Fonte | [Wiktionary](${wiki}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **puta que pariu** | Canónica lab / falada |
| **PQP** | Sigla — chat, adesivo, respiração curta |
| puta que *o* pariu | Variante com artigo |
| puta que *me* pariu | Variante reflexiva / ênfase |
| vá pra puta que pariu | Mandar embora / longe |
| na puta que pariu | Lugar distante |
| fruta que partiu / caiu | Atenuante eufémico |

**Veredicto de forma:** o lab ancora **puta que pariu**; PQP é a forma rápida do mesmo ofício.

## O que a frase inspeciona

| Peça / tom | Leitura laboratorial | Bom × mau |
|------------|----------------------|-----------|
| **Explosão** | Soltar pressão do peito | Bom: termómetro · Mau: virar arma |
| **[Raiva](${raiva}) / frustração** | Algo quebrou o plano | Bom: nomear · Mau: [vingança](${vinganca}) |
| **Susto / [medo](${medo})** | Quase acidente, susto | Bom: alívio depois · Mau: assustar outrem de propósito |
| **Euforia** | «PQP, que golo!» | Bom: [alegria](${alegria}) · Mau: humilhar quem perdeu |
| **Lugar longe** | Distância cómica | Bom: mapa oral · Mau: excluir quem mora «longe» |
| **Estigma embutido** | Peças [puta](${puta}) + parto | Bom: ver a história · Mau: fingir que não existe |

**H1:** PQP é **válvula** da oralidade BR — pico antes do [gesto](${gesto}).  
**H2:** literal «prostituta que deu à luz» **não** governa o uso quotidiano; o afecto governa.  
**H3:** depois do sopro, [Faça o melhor!](${mantra}) — o palavrão não fecha a conta.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Exclamar o pico** | Reagir ao absurdo / à dor / ao milagre | Tom da fala / [Vida](${vida}) |
| **Marcar distância** | «Mora na PQP» | Metáfora espacial |
| **Mandar embora** | Empurrar o incómodo | [Risco](${risco}) de humilhar |
| **Descomprimir** | Soltar sem plano | Depois: [gesto](${gesto}) + [verdade](${verdade}) |
| **Fechar com ofício** | Depois do PQP | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Ficha | Relação |
|-------|---------|
| [Puta](${puta}) · [Pariu](${pariu}) | Peças — etimologia e sentidos |
| [jesusudavi](${jesusudavi}) · [jesusamando](${jesusamando}) · [aff](${aff}) | Outros termómetros |
| [Raiva](${raiva}) · [emoção](${emocao}) · [medo](${medo}) | Mapa afectivo |
| [Respeito](${respeito}) · [língua portuguesa](${lingua}) | Solo e ética da boca |
| [Faça o melhor!](${mantra}) | Depois da explosão — o ofício |
| [Vingança…](${vinganca}) | Anti-modelo: explosão que envenena |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Peças | [puta](${puta}) · [pariu](${pariu}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida | [Vida](${vida}) |

## Limites

- Não é aula de ofensa.  
- Não apaga o estigma de género embutido nas peças.  
- Não substitui [verdade](${verdade}) — é **tom**, não argumento.  
- Em registo formal do lab, preferir nomear o afecto (*raiva*, *susto*) quando o palavrão não serve.

## Veredicto

**Aprovado na série Expressões** — *puta que pariu* / PQP fichado como **válvula de pico** BR; peças [puta](${puta}) e [pariu](${pariu}) inspecionadas; fecho [Faça o melhor!](${mantra}).

**Faça o melhor nesse trabalho:** inspecionar a língua inteira — berço, golpe e sopro — e voltar ao ofício depois da explosão.

[▶ Expressões](${hub}) · [▶ Puta](${puta}) · [▶ Pariu](${pariu}) · [▶ jesusudavi](${jesusudavi}) · [▶ Respeito](${respeito}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian oral **“puta que pariu”** (PQP) — emotional peak interjection; also “very far” place. Pieces: [puta](${puta}) + [pariu](${pariu}). Scale with [aff](${aff}), [jesusudavi](${jesusudavi}), [jesusamando](${jesusamando}). Close with [Do your best!](${mantra}).

> Method note: [Wiktionary](${wiki}). Map the breath; **do not** glamorize the stigma.

## Object

| Field | Value |
|-------|-------|
| Saying | **puta que pariu** / **PQP** |
| Pieces | [puta](${puta}) · [pariu](${pariu}) |
| Links | [respeito](${respeito}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Verdict

**Approved** — BR pressure valve · pieces mapped · [Do your best!](${mantra}) after the blast.

[▶ Expressions](${hub}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«puta que pariu»** (PQP) — interjección de pico emocional BR; también lugar «muy lejos». Piezas: [puta](${puta}) + [pariu](${pariu}). Escala con [aff](${aff}), [jesusudavi](${jesusudavi}), [jesusamando](${jesusamando}). Cierre [¡Haz lo mejor!](${mantra}).

> Nota: [Wiktionary](${wiki}). Mapear el soplo; **no** glamourizar el estigma.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **puta que pariu** / **PQP** |
| Piezas | [puta](${puta}) · [pariu](${pariu}) |
| Vínculos | [respeito](${respeito}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Veredicto

**Aprobado** — válvula BR · piezas mapeadas · [¡Haz lo mejor!](${mantra}) después de la explosión.

[▶ Expresiones](${hub}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPutaQuePariuPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPutaQuePariuBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 11;
  return expressaoPost({
    title: 'Inspeção: puta que pariu — válvula de pico e ofício da boca',
    titleEn: 'Inspection: puta que pariu — peak valve and craft of speech',
    titleEs: 'Inspección: puta que pariu — válvula de pico y oficio de la boca',
    excerpt:
      'Expressões: puta que pariu (PQP) — pico emocional BR; peças puta + pariu; elos respeito, jesusudavi; Faça o melhor!',
    excerptEn:
      'Sayings: puta que pariu (PQP) — BR emotional peak; pieces puta + pariu; links respeito, jesusudavi; Do your best!',
    excerptEs:
      'Dichos: puta que pariu (PQP) — pico emocional BR; piezas puta + pariu; vínculos respeito, jesusudavi; ¡Haz lo mejor!',
    slug: 'inspecao-expressao-puta-que-pariu',
    date: '2026-08-03T21:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'puta que pariu · expressão',
    coverImage: '/imagens/inspecoes/puta-que-pariu-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPutaQuePariuPost,
  buildPutaQuePariuBodies
};
