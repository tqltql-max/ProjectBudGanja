'use strict';

/**
 * Inspeção Palavras · etimologia
 * Eixos: ἔτυμον + λόγος · étimo × etimologia popular ·
 * método da série Palavras · cluster trocadilho / aglutinação / polimorfismo
 * Pedido de campo: a palavra do ofício ainda não tinha ficha.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/etimologia-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Etimologia';

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

function buildEtimologiaBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-etimologia.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiPop = 'https://pt.wikipedia.org/wiki/Etimologia_popular';
  const wikt = 'https://pt.wiktionary.org/wiki/etimologia';
  const wikiEn = 'https://en.wikipedia.org/wiki/Etymology';

  const body = `## Escopo

Inspeção editorial da palavra **[etimologia](${self})** — o **ofício de perguntar de onde veio a palavra**. A série [Palavras](${hub}) usa este método em todas as fichas; a palavra **ela mesma** ainda não tinha ficha nem citação própria. Esta página cobre o étimo grego (*étymon* + *lógos*), a distinção **étimo × etimologia popular**, e o elo com o cluster [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) · [polimorfismo](${polimorfismo}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Etimologia](${WIKI}), [etimologia popular](${wikiPop}), [Wikcionário](${wikt}), [Etymology](${wikiEn}). **Ficha ≠ tratado de filologia.** Sem afiliação académica. Método: [Duvivier](${duvivier}) · [língua portuguesa](${lingua}) · [verdade](${verdade}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **etimologia** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | gr. *etymología* ← *étymon* «sentido verdadeiro» + *lógos* «palavra / estudo» — confiança: **alta** |
| Família | *étimo* · *etimológico* · *etimologista* · *etimologia popular* |
| Ofício no lab | Método da série [Palavras](${hub}): origem → viagem → uso → ressalva |
| Tipo BudGanja | Palavra — o nome do próprio método |
| Elo ofício | [verdade](${verdade}) · [língua portuguesa](${lingua}) · [Duvivier](${duvivier}) · [Faça o melhor!](${mantra}) |
| Fonte | [Etimologia](${WIKI}) |
| Data | ${inspected} |

**O que é o objeto:** o estudo da **origem** e da **história** das palavras. O grego *étymos* quer dizer **verdadeiro** — daí o elo com [verdade](${verdade}): etimologia é tentar o sentido **honesto**, não o que «encaixa demais».

## 2. A palavra que inspeciona as outras

Cada ficha de [Palavras](${hub}) pergunta *de onde veio*, *por onde viajou*, *o que significa agora*. Isso **é** etimologia aplicada. Até hoje o laboratório citava o ofício sem fichar o nome.

| Camada | No lab | Elo |
|--------|--------|-----|
| **Étimo** | Hipótese de origem com grau de confiança | tabela «Origens» de cada ficha |
| **Viagem** | Territórios, séculos, contactos | [língua portuguesa](${lingua}) · [maconha](${maconha}) |
| **Uso** | O que a boca faz agora | [grok](${grok}) · oralidade BR |
| **Ressalva** | O que fica em disputa / o que é folclore | esta ficha |

**H-método:** inspecionar uma palavra **sem** etimologia é só catálogo de usos. A série Palavras recusa isso.

## 3. Étimo × etimologia popular

A distinção que o cluster *cara+alho* já usava — agora com **nome próprio**.

| Nome | O que faz | Exemplo lab | Confiança |
|------|-----------|-------------|-----------|
| **Étimo** | Origem histórica rastreável (ou a melhor hipótese) | *etimologia* ← gr. *etymología* | Alta neste vocábulo |
| **Etimologia** | O ofício de procurar esse étimo | esta ficha; toda a série | Alta |
| **Etimologia popular** | História **falsa** que «encaixa» demais | *cara+alho* como origem da terceira forma — [trocadilho](${trocadilho}) | Alta (como fenómeno); **baixa** como étimo |
| **[Aglutinação](${aglutinacao})** | Fusão gramatical que **é** a origem | *planalto* = plano+alto | Alta |
| **[Polimorfismo](${polimorfismo})** | Muitas formas **do mesmo** — outro mapa | bio / código / alomorfia | Alta — **não** é etimologia |

**H-popular:** etimologia popular **não** é etimologia má feita por acaso — é um **mecanismo** da língua (a boca reanalisa). O lab honra o instinto e **corrige o étimo**.  
**H-certo:** *étymos* = verdadeiro. Popular ≠ verdadeiro. [Verdade](${verdade}) + [respeito](${respeito}): não humilhar quem colou a história.

## 4. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| gr. *étymon* (*ἔτυμον*) | o sentido verdadeiro de uma palavra | Alta |
| gr. *étymos* (*ἔτυμος*) | verdadeiro, real, autêntico | Alta |
| gr. *lógos* (*λόγος*) | palavra, discurso, estudo | Alta |
| lat. *etymologia* | empréstimo culto do grego | Alta |
| PT *etimologia* | via latim / romance culto | Alta |
| EN *etymology* / ES *etimología* | mesmos irmãos românicos / germânicos cultos | Alta |

**Veredicto etimológico:** a palavra **etimologia** tem étimo **fechado**. O que fica em aberto, noutros vocábulos, é o étimo **deles** — ver [maconha](${maconha}) (hipótese bantu, não consenso).

## 5. O que a etimologia **não** é

| Confusão | Correção lab |
|----------|----------------|
| «etimologia = a piada que explica a palavra» | Isso é [etimologia popular](${wikiPop}) — [trocadilho](${trocadilho}) |
| «etimologia = soldar duas peças» | Solda verdadeira = [aglutinação](${aglutinacao}) ou palavra-valise ([Tanzânia](${tanzania})) |
| «etimologia = vários sentidos» | Polissemia / homonímia — ver [polimorfismo](${polimorfismo}) para **não** misturar |
| «etimologia fecha todas as disputas» | Há étimos em aberto; o lab marca confiança (alta / média / folclórica) |
| «saber o étimo manda no uso de hoje» | Origem **informa**; o uso vivo decide o ofício actual |

## 6. Elos BudGanja

No laboratório, etimologia é o **chão** da série: [maconha](${maconha}) (disputa afro-atlântica), [simbiose](${simbiose}) (*syn* + *bíōsis*), [relação](${relacao}) (*relatĭō*), [grok](${grok}) (Heinlein). [Língua portuguesa](${lingua}) é o solo; [Duvivier](${duvivier}) é o método da palavra como pesquisa. [Faça o melhor!](${mantra}) = nomear com o étimo à vista, sem inventar origem.

## 7. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Ofício** | «qual é a etimologia?» | Bom: pergunta desta ficha |
| **Étimo** | «o étimo é grego» | Bom: peça técnica |
| **Popular** | «cara+alho explica o palavrão» | Mau como origem · Bom **como fenómeno** etiquetado |
| **Arma moral** | «a palavra vem de X, logo é pecaminosa / sagrada» | Mau: étimo ≠ veredicto ético |
| **Purismo** | «só o étimo antigo vale» | Mau — [língua portuguesa](${lingua}) muda no tempo |

## Hipóteses (síntese)

**H1:** âncora = gr. *étymon* + *lógos* — estudo do sentido verdadeiro.  
**H2:** a série [Palavras](${hub}) **é** etimologia aplicada; esta ficha nomeia o ofício.  
**H3:** etimologia popular ≠ étimo — cluster [trocadilho](${trocadilho}).  
**H4:** fusão histórica = [aglutinação](${aglutinacao}); muitas formas do mesmo = [polimorfismo](${polimorfismo}).  
**H5:** étimo em disputa (ex. [maconha](${maconha})) marca-se, não se fecha à força.  
**H6:** fecho = [Faça o melhor!](${mantra}) — origem honesta, uso vivo, sem arma moral.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Trocadilho](${trocadilho}) | Onde a etimologia popular foi o mecanismo (*cara+alho*) |
| [Aglutinação](${aglutinacao}) | Solda que **é** étimo |
| [Polimorfismo](${polimorfismo}) | Mapa vizinho — não misturar |
| [Tanzânia](${tanzania}) | Palavra-valise (baptismo rastreável) |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo do ofício |
| [Verdade](${verdade}) · [respeito](${respeito}) | *Étymos* = verdadeiro; corrigir sem humilhar |
| [Maconha](${maconha}) | Étimo em disputa — o método em acção |
| [Duvivier](${duvivier}) · [Grok](${grok}) | Palavra como pesquisa · tom de ofício |
| [Faça o melhor!](${mantra}) | Nomear com origem à vista |

## Limites

- Não é curso de linguística histórica nem dicionário etimológico completo.  
- Étimos de **outras** palavras ficam nas fichas delas.  
- Etimologia popular desenvolve-se no [trocadilho](${trocadilho}), não aqui em lista de piadas.  
- Não usa o étimo para moralizar o referente.

## Status

**Aprovado** — **etimologia** fichada como ofício da série Palavras (*étymon* + *lógos*); étimo × popular separados; cluster [trocadilho](${trocadilho}) / [aglutinação](${aglutinacao}) / [polimorfismo](${polimorfismo}) citado. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ Aglutinação](${aglutinacao}) · [▶ Polimorfismo](${polimorfismo}) · [▶ Língua portuguesa](${lingua}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **etimologia** (etymology) — the craft of asking where a word came from. The [Words](${hub}) series already used this method; the word itself had no sheet. Covers Greek *étymon* + *lógos*, **etymon vs folk etymology**, and the cluster [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) · [polimorfismo](${polimorfismo}).

> Independent audit. Sources: [Etymology](${WIKI}), [folk etymology](${wikiPop}). Not a philology treatise. Method: [Duvivier](${duvivier}) · [truth](${verdade}).

## Object

| Field | Value |
|-------|-------|
| Word | **etimologia** · gr. *etymología* |
| Craft | origin → journey → use → caveat |
| Not | folk story that “fits too well” · moral weapon |
| Date | ${inspected} |

**Verdict:** etymology seeks the **true** origin (*étymos*). Folk etymology is a **false** story the mouth loves. *Cara+alho* is the lab example — see [trocadilho](${trocadilho}).

## Status

**Approved** — etymology named as the Palavras method; folk ≠ etymon.

[▶ Words](${hub}) · [▶ Pun](${trocadilho}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **etimologia** — el oficio de preguntar de dónde vino la palabra. La serie [Palabras](${hub}) ya usaba el método; la palabra **no** tenía ficha. Cubre *étymon* + *lógos*, **étimo × etimología popular**, y el clúster [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) · [polimorfismo](${polimorfismo}).

> Auditoría independiente. Fuentes: [Etimología](${WIKI}), [etimología popular](${wikiPop}). No es tratado de filología.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **etimologia** · gr. *etymología* |
| Oficio | origen → viaje → uso → reserva |
| No es | historia que «encaja demasiado» · arma moral |
| Fecha | ${inspected} |

**Veredicto:** etimología busca el origen **verdadero** (*étymos*). Etimología popular es historia **falsa** que la boca ama. *Cara+alho* — [trocadilho](${trocadilho}).

## Estado

**Aprobada** — etimología fichada como método de Palabras; popular ≠ étimo.

[▶ Palabras](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildEtimologiaPost() {
  const { body, contentEn, contentEs, wiki } = buildEtimologiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-etimologia', 170);
  const post = makePalavra({
    title: 'Inspeção: Etimologia — o ofício de perguntar de onde veio',
    titleEn: 'Inspection: Etymology — the craft of asking where it came from',
    titleEs: 'Inspección: Etimología — el oficio de preguntar de dónde vino',
    excerpt:
      'Palavras: etimologia (étymon + lógos) — método da série; étimo ≠ etimologia popular (cara+alho); irmãs aglutinação e polimorfismo; Faça o melhor!',
    excerptEn:
      'Words: etymology (étymon + lógos) — method of the series; etymon ≠ folk etymology (cara+alho); sisters agglutination and polymorphism; Do your best!',
    excerptEs:
      'Palabras: etimología (étymon + lógos) — método de la serie; étimo ≠ etimología popular (cara+alho); hermanas aglutinación y polimorfismo; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-etimologia',
    date: '2026-08-22T02:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Etimologia · palavra',
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

module.exports = { buildEtimologiaPost, buildEtimologiaBodies };
