'use strict';

/**
 * Inspeção Palavras · aglutinação
 * Eixos: composição por fusão · planalto / embora ·
 * ≠ trocadilho cara+alho · ≠ palavra-valise
 * Ficha gramatical; não é a piada do alho.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/aglutinacao-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Composi%C3%A7%C3%A3o_(lingu%C3%ADstica)';

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

function buildAglutinacaoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-aglutinacao.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiValise = 'https://pt.wikipedia.org/wiki/Palavra-valise';
  const wikt = 'https://pt.wiktionary.org/wiki/aglutina%C3%A7%C3%A3o';

  const body = `## Escopo

Inspeção editorial da palavra **[aglutinação](${self})** — na gramática escolar portuguesa, o tipo de **composição** em que duas peças **fundem** e perdem fatia (som ou letra) até virarem **uma** palavra. Pedido de campo irmão: *cara + alho*. Essa solda de ouvido **parece** aglutinação; a ficha-irmã [trocadilho](${trocadilho}) mostra que, naquele caso, é **jogo**, não origem. Aqui o lab ficheia o **ofício gramatical verdadeiro**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Composição](${WIKI}), [Wikcionário · aglutinação](${wikt}), [Palavra-valise](${wikiValise}). **Ficha ≠ tratado de morfologia.** Sem confundir com aglutinação em tipologia de línguas (turco, etc.) — outro mapa, mesmo nome.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **aglutinação** |
| Classe | Substantivo feminino |
| Ofício escolar | Composição por **fusão** (vs. **justaposição**) |
| Étimo (trabalho) | lat. *agglutinare* «colar, pegar com cola» — confiança: **alta** |
| Não é | [trocadilho](${trocadilho}) *cara+alho* · [polimorfismo](${polimorfismo}) · palavra-valise |
| Tipo BudGanja | Palavra — gramática da solda × [relação](${relacao}) entre peças |
| Elo língua | [língua portuguesa](${lingua}) · [Tanzânia](${tanzania}) (outro tipo de solda: valise) |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [simbiose](${simbiose}) · [Faça o melhor!](${mantra}) |
| Fonte | [Composição (linguística)](${WIKI}) |
| Data | ${inspected} |

**O que é o objeto:** o nome da **cola gramatical**. Duas palavras entram; uma sai, com cicatriz no meio.

## 2. Justaposição × aglutinação × palavra-valise

| Tipo | O que acontece | Exemplos | Nota lab |
|------|----------------|----------|----------|
| **Justaposição** | Peças lado a lado; cada uma **reconhece-se** | *guarda-chuva*, *pontapé*, *couve-flor* | Hífen ou ainda «duas caras» |
| **Aglutinação** | Peças **fundem**; alguma letra/som cai ou muda | *planalto* (plano+alto), *embora* (em+boa+hora), *aguardente* (água+ardente), *fidalgo* (filho+de+algo) | Uma palavra só |
| **Palavra-valise** | Recorta **frentes** e cola num vocábulo **novo** | [Tanzânia](${tanzania}) = Tan+Zan+-ia; *brunch* | Cria nome; não é o composto escolar clássico |
| **Trocadilho** | Lê A+B como C **já existente** | *cara+alho* — [trocadilho](${trocadilho}) | Jogo; etimologia popular |

**H1:** aglutinação escolar = fusão **etimológica** (as peças *são* a origem).  
**H2:** *cara+alho* funde o *a* no ouvido, mas **não** é a origem da terceira forma.  
**H3:** Tanzânia é valise (baptismo de 1964), não *planalto*.

## 3. Cara + alho — por que só *parece*

No ouvido, *cara* + *alho* partilham o **a** — o mesmo gesto que *plano* + *alto* → *planalto*. Por isso a boca pergunta «é aglutinação?».

| Teste | *planalto* | *cara+alho* |
|-------|------------|-------------|
| As duas peças **existem** sozinhas? | Sim | Sim |
| A palavra grande **nasceu** delas? | Sim (composto) | **Não** (a forma já existia) |
| Há étimo independente? | As peças *são* o étimo | Hipótese *caraculum* / náutico — ver [trocadilho](${trocadilho}) |
| Nome do fenómeno | **Aglutinação** | **Trocadilho** + etimologia popular |

**Veredicto:** a solda *cara+alho* é **máscara** de aglutinação. O ofício verdadeiro desta ficha são os compostos que **nascem** da fusão.

## 4. Origens do nome

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *agglutinare* | Colar (glúten / cola) | Alta |
| Gramática PT escolar | Par justaposição / aglutinação nos manuais | Alta (uso didáctico BR/PT) |
| Tipologia linguística | Línguas aglutinantes (muitos afixos em cadeia) | Alta noutro mapa — **não** é o recorte desta ficha |
| Medicina / sangue | Aglutinação de células | Homónimo de laboratório clínico — **fora** |

**Veredicto etimológico:** a palavra **aglutinação** = acto de colar. No lab de Palavras, cola-se **morfema em morfema**, não hemácia.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Cara+alho** | Aglutinação que gerou palavrão | [Trocadilho](${trocadilho}) |
| **Tanzânia** | Aglutinação escolar | Palavra-valise (1964) |
| **Polimorfismo** | Outro nome da junção | [Outro ofício](${polimorfismo}) |
| **Simbiose** | Duas coisas juntas | Viver *com* — [simbiose](${simbiose}) é relação, não composição |

## 6. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Gramática** | «planalto é aglutinação» | Bom: âncora |
| **Tipo de língua** | «o turco é aglutinante» | Bom se etiquetado · Mau: misturar com *planalto* sem aviso |
| **Clínica** | aglutinação sanguínea | Outro mapa |
| **Piada cara+alho** | «aglutinou cara e alho» | Mau como étimo · Bom só como **metáfora** do ouvido — apontar [trocadilho](${trocadilho}) |

## Hipóteses (síntese)

**H1:** âncora = composição por **fusão**.  
**H2:** justaposição guarda as caras; aglutinação esconde a costura.  
**H3:** *cara+alho* ≠ este ofício — [trocadilho](${trocadilho}).  
**H4:** Tanzânia = valise, não *planalto*.  
**H5:** fecho = [Faça o melhor!](${mantra}) — colar com [verdade](${verdade}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Trocadilho](${trocadilho}) | A máscara de aglutinação no ouvido |
| [Polimorfismo](${polimorfismo}) | Nome que **não** cobre composição |
| [Tanzânia](${tanzania}) | Valise — outro tipo de junção |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo |
| [Relação](${relacao}) · [simbiose](${simbiose}) | O *entre* × o *com* — não são compostos |
| [Faça o melhor!](${mantra}) | Soldar certo |

## Limites

- Não é curso completo de morfologia nem tipologia de línguas.  
- Lista de exemplos é **amostra** (*planalto*, *embora*, *aguardente*), não inventário.  
- Homónimo clínico (sangue) só se demarca.  
- A piada *cara+alho* vive na ficha [trocadilho](${trocadilho}).

## Status

**Aprovado** — **aglutinação** fichada como composição por fusão; *cara+alho* recusado como étimo e enviado ao [trocadilho](${trocadilho}). Sem afiliação.

[▶ Palavras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ Polimorfismo](${polimorfismo}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **aglutinação** — school-grammar **compounding by fusion** (pieces glue and lose a slice). The *cara+alho* gag *looks* like this; the sister sheet [trocadilho](${trocadilho}) shows it is a **pun**, not the etymon. True portmanteau: [Tanzânia](${tanzania}).

> Independent audit. Source: [Composition](${WIKI}). Not a morphology treatise. Not clinical agglutination of cells.

## Object

| Field | Value |
|-------|-------|
| Word | **aglutinação** (agglutination) |
| Pair | juxtaposition (*guarda-chuva*) vs fusion (*planalto*) |
| Not | [pun](${trocadilho}) · [polymorphism](${polimorfismo}) |
| Date | ${inspected} |

**Verdict:** agglutination **gives birth** to the compound. *Cara+alho* only **wears** that mask.

## Status

**Approved** — fusion compounding filed; the garlic joke sent to [trocadilho](${trocadilho}).

[▶ Words](${hub}) · [▶ Pun](${trocadilho}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **aglutinação** — composición escolar por **fusión** (las piezas se pegan y pierden un trozo). El gag *cara+alho* **parece** esto; la ficha [trocadilho](${trocadilho}) muestra que es **juego**, no étimo. Palabra-valija: [Tanzânia](${tanzania}).

> Auditoría independiente. Fuente: [Composición](${WIKI}). No es aglutinación clínica de células.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **aglutinação** |
| Par | yuxtaposición (*guarda-chuva*) × fusión (*planalto*) |
| No es | [trocadilho](${trocadilho}) · [polimorfismo](${polimorfismo}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — fusión gramatical fichada; el chiste del ajo va a [trocadilho](${trocadilho}).

[▶ Palabras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildAglutinacaoPost() {
  const { body, contentEn, contentEs, wiki } = buildAglutinacaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-aglutinacao', 153);
  const post = makePalavra({
    title: 'Inspeção: Aglutinação — a solda gramatical (e por que cara+alho só parece)',
    titleEn: 'Inspection: Agglutination — grammatical fusion (and why cara+alho only looks like it)',
    titleEs: 'Inspección: Aglutinación — la soldadura gramatical (y por qué cara+alho solo parece)',
    excerpt:
      'Palavras: aglutinação — composição por fusão (planalto, embora); cara+alho é máscara, o nome certo é trocadilho; ≠ polimorfismo; Faça o melhor!',
    excerptEn:
      'Words: agglutination — compounding by fusion (planalto); cara+alho is a mask, the right name is pun; ≠ polymorphism; Do your best!',
    excerptEs:
      'Palabras: aglutinación — composición por fusión (planalto); cara+alho es máscara, el nombre cierto es trocadilho; ≠ polimorfismo; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-aglutinacao',
    date: '2026-08-21T16:41:00.000Z',
    seriesOrder,
    seriesLabel: 'Aglutinação · palavra',
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

module.exports = { buildAglutinacaoPost, buildAglutinacaoBodies };
