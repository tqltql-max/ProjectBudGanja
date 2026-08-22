'use strict';

/**
 * Inspeção Palavras · polimorfismo
 * Eixos: biologia · programação · alomorfia ·
 * ≠ trocadilho cara+alho · ≠ aglutinação
 * Pedido de campo: «é polimorfismo?» — resposta: não (neste jogo).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/polimorfismo-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Polimorfismo';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildPolimorfismoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-polimorfismo.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const planta = '/plantas/cannabis-sativa/';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiBio = 'https://pt.wikipedia.org/wiki/Polimorfismo_(biologia)';
  const wikiProg = 'https://pt.wikipedia.org/wiki/Polimorfismo_(programa%C3%A7%C3%A3o_orientada_a_objetos)';
  const wikt = 'https://pt.wiktionary.org/wiki/polimorfismo';

  const body = `## Escopo

Inspeção editorial da palavra **[polimorfismo](${self})** — **várias formas** do mesmo. Pedido de campo: *cara + alho, junção que forma outro significado — é polimorfismo?* Resposta lab: **não**. Esse jogo chama-se [trocadilho](${trocadilho}). Esta ficha cobre o **ofício verdadeiro** da palavra: biologia, programação, e (à margem) alomorfia. Irmã gramatical da solda: [aglutinação](${aglutinacao}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Polimorfismo](${WIKI}) (desambiguação), [biologia](${wikiBio}), [programação](${wikiProg}), [Wikcionário](${wikt}). **Ficha ≠ aula de POO nem tratado de genética.** Sem afiliação a linguagens de programação.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **polimorfismo** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | gr. *poly-* «muitos» + *morphē* «forma» — confiança: **alta** |
| Ofícios vivos | (1) biologia — vários fenótipos · (2) programação — mesmo nome, vários tipos · (3) linguística — alomorfia (várias formas de um morfema) |
| Pedido de campo | *cara+alho* = polimorfismo? → **não** |
| Não é | [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) · palavra-valise ([Tanzânia](${tanzania})) |
| Tipo BudGanja | Palavra — várias formas × correção de nome × [relação](${relacao}) com o jogo |
| Elo ofício | [verdade](${verdade}) · [skill](${skill}) · [commitar](${commitar}) · [simbiose](${simbiose}) · [Faça o melhor!](${mantra}) |
| Fonte | [Polimorfismo](${WIKI}) |
| Data | ${inspected} |

**O que é o objeto:** o nome de **um** que se apresenta **de muitos jeitos**. Não é o nome de **dois** que se colam e viram **terceiro sentido**.

## 2. O pedido cara + alho

| Afirmação | Correção lab |
|-----------|----------------|
| «cara+alho é polimorfismo» | É [trocadilho](${trocadilho}) (calembur) + [etimologia popular](${etimologia}) |
| «junção de palavras = polimorfismo» | Junção gramatical verdadeira = [aglutinação](${aglutinacao}) ou palavra-valise |
| «vários significados = polimorfismo» | Vários sentidos de uma forma = **polissemia** / **homonímia** — ainda outro mapa |
| «o palavrão muda de forma» | Interjeição × ofensa = **usos**; não cria o vocábulo a partir de *cara* e *alho* |

**H-campo:** a boca usou *polimorfismo* porque ouviu «muitas formas / outro significado». O lab honra o instinto e **corrige o nome**.  
**H-certo:** polimorfismo = muitas formas **do mesmo**. *Cara+alho* = duas peças **lidas como** um terceiro que **já era outro**.

## 3. Três ofícios (não misturar)

| Ofício | Leitura | Exemplo | Confiança |
|--------|---------|---------|-----------|
| **Biologia** | Mesma espécie / mesmo gene, **várias formas** visíveis | borboletas com asas diferentes; sangue ABO | Alta |
| **Programação** | Mesma interface / mesmo método, **vários tipos** respondem | \`desenhar()\` no círculo e no quadrado | Alta |
| **Linguística (alomorfia)** | Mesmo morfema, **várias formas** (*-s* / *-es*; *in-* / *im-* / *i-*) | plural, prefixo negativo | Média–alta (termo técnico; manuais às vezes dizem *variantes*) |
| **Piada cara+alho** | **Fora** — [trocadilho](${trocadilho}) | — | Alta (recusa) |

**Veredicto:** os três ofícios partilham *poly + morphē*. Nenhum descreve soldar *cara* e *alho*.

## 4. Polimorfismo × polissemia × homonímia × trocadilho

| Nome | O que varia | O que fica |
|------|-------------|------------|
| **Polimorfismo** | a **forma** (fenótipo / tipo / alomorfe) | o **mesmo** objecto/gene/método/morfema |
| **Polissemia** | o **sentido** | a **mesma** forma (*banco* de praça e de dinheiro, se se aceitar o elo) |
| **Homonímia** | o **sentido** (e às vezes a origem) | forma igual, histórias distintas (*manga* fruta / manga de camisa) |
| **[Trocadilho](${trocadilho})** | a **leitura** (A+B = C) | duas peças + uma forma já existente |
| **[Aglutinação](${aglutinacao})** | as **peças** fundem-se | nasce um composto |

**H-vizinho:** quem diz «a palavra tem vários significados» talvez queira **polissemia**, não polimorfismo. Ainda assim, *cara+alho* não é polissemia de *cara*: é **jogo entre três vocábulos**.

## 5. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| gr. *polymorphos* | de muitas formas | Alta |
| Biologia (séc. XIX–XX) | variação intraespecífica / genética | Alta |
| POO (Smalltalk → C++ / Java…) | subtipos que respondem à mesma mensagem | Alta |
| Uso solto BR | «tem várias formas» dito de qualquer coisa | Média — daí o pedido de campo |

**Veredicto etimológico:** **polimorfismo** = muitas formas. O lab não alarga o termo até cobrir calembur.

## 6. Elos BudGanja

No laboratório, *polimorfismo* pode aparecer no **código** ([skill](${skill}), [commitar](${commitar})) e, com cuidado, na **planta** (quimiotipos, fenótipos — ver [cannabis](${planta}) como elo botânico, não como prova de que a palavra é «da erva»). [Simbiose](${simbiose}) é viver *com*; polimorfismo é o mesmo apresentar-se *de vários jeitos*. Não fundir.

## 7. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Biologia** | «polimorfismo do lócus» | Bom: âncora científica |
| **Código** | «método polimórfico» | Bom: ofício [skill](${skill}) |
| **Fala larga** | «isso é polimorfismo» para qualquer mistura | Mau: esvazia o termo |
| **Cara+alho** | «é polimorfismo?» | Bom **como pergunta** · a resposta é [trocadilho](${trocadilho}) |

## Hipóteses (síntese)

**H1:** âncora = *poly* + *morphē* — muitas formas do mesmo.  
**H2:** *cara+alho* **não** é este ofício — [trocadilho](${trocadilho}).  
**H3:** solda gramatical = [aglutinação](${aglutinacao}); baptismo por recorte = [Tanzânia](${tanzania}).  
**H4:** vários sentidos ≠ polimorfismo (polissemia / homonímia).  
**H5:** fecho = [Faça o melhor!](${mantra}) — nome certo depois da pergunta certa.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Etimologia](${etimologia}) | O ofício de nomear origens — popular ≠ étimo |
| [Trocadilho](${trocadilho}) | O nome do jogo *cara+alho* |
| [Aglutinação](${aglutinacao}) | A solda gramatical verdadeira |
| [Tanzânia](${tanzania}) | Palavra-valise |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo |
| [Skill](${skill}) · [commitar](${commitar}) | Onde o polimorfismo de código vive no lab |
| [Simbiose](${simbiose}) · [relação](${relacao}) | *Com* / *entre* — não são «muitas formas» |
| [Verdade](${verdade}) · [respeito](${respeito}) | Corrigir o nome sem humilhar a pergunta |
| [Faça o melhor!](${mantra}) | Fechar com o mapa certo |

## Limites

- Não é aula de genética nem de Java.  
- Alomorfia fica **demarcada**, sem inventário de morfemas.  
- Polissemia/homonímia só entram para **separar**.  
- A piada *cara+alho* não se desenvolve aqui — [trocadilho](${trocadilho}).

## Status

**Aprovado** — **polimorfismo** fichado como muitas formas do mesmo (bio / código / alomorfia); pedido *cara+alho* recusado e enviado ao [trocadilho](${trocadilho}). Sem afiliação.

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Trocadilho](${trocadilho}) · [▶ Aglutinação](${aglutinacao}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **polimorfismo** (polymorphism) — **many forms** of the same thing. Field request: is *cara+alho* polymorphism? Lab answer: **no**. That joke is a [pun](${trocadilho}). This sheet covers biology, programming, and (at the edge) allomorphy. Grammatical fusion: [aglutinação](${aglutinacao}).

> Independent audit. Sources: [Polymorphism](${WIKI}), [biology](${wikiBio}), [OOP](${wikiProg}). Not a genetics lecture.

## Object

| Field | Value |
|-------|-------|
| Word | **polimorfismo** · *poly-* + *morphē* |
| Crafts | biology · programming · allomorphy |
| Not | [pun](${trocadilho}) · [agglutination](${aglutinacao}) · portmanteau |
| Date | ${inspected} |

**Verdict:** polymorphism = many forms **of the same**. *Cara+alho* = two pieces **read as** a third that **already was something else**.

## Status

**Approved** — polymorphism filed; the garlic joke sent to [trocadilho](${trocadilho}).

[▶ Words](${hub}) · [▶ Pun](${trocadilho}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **polimorfismo** — **varias formas** de lo mismo. Pedido: ¿*cara+alho* es polimorfismo? Respuesta: **no**. Ese juego es [trocadilho](${trocadilho}). Esta ficha cubre biología, programación y (al margen) alomorfia. Fusión gramatical: [aglutinação](${aglutinacao}).

> Auditoría independiente. Fuentes: [Polimorfismo](${WIKI}). No es clase de genética.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **polimorfismo** · *poly-* + *morphē* |
| Oficios | biología · código · alomorfia |
| No es | [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — polimorfismo fichado; el chiste del ajo va a [trocadilho](${trocadilho}).

[▶ Palabras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildPolimorfismoPost() {
  const { body, contentEn, contentEs, wiki } = buildPolimorfismoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-polimorfismo', 154);
  const post = makePalavra({
    title: 'Inspeção: Polimorfismo — várias formas do mesmo (não é cara+alho)',
    titleEn: 'Inspection: Polymorphism — many forms of the same (not cara+alho)',
    titleEs: 'Inspección: Polimorfismo — varias formas de lo mismo (no es cara+alho)',
    excerpt:
      'Palavras: polimorfismo (poly+morphē) — biologia, código, alomorfia; cara+alho não é isto, é trocadilho; irmã aglutinação; Faça o melhor!',
    excerptEn:
      'Words: polymorphism (poly+morphē) — biology, code, allomorphy; cara+alho is not this, it is a pun; sister agglutination; Do your best!',
    excerptEs:
      'Palabras: polimorfismo (poly+morphē) — biología, código, alomorfia; cara+alho no es esto, es trocadilho; hermana aglutinación; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-polimorfismo',
    date: '2026-08-21T16:42:00.000Z',
    seriesOrder,
    seriesLabel: 'Polimorfismo · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildPolimorfismoPost, buildPolimorfismoBodies };
