'use strict';

/**
 * Inspeção Palavras · trocadilho
 * Eixos: jogo cara+alho · calembur · ≠ polimorfismo ·
 * ≠ aglutinação histórica · ≠ palavra-valise (Tanzânia)
 * Ficha do mecanismo; o resultado da piada é baixo calão — inspecciona-se o ofício, não o insulto.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/trocadilho-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Trocadilho';

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

function buildTrocadilhoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const polimorfismo = '/posts/post-inspecao-palavra-polimorfismo.html';
  const tanzania = '/posts/post-inspecao-palavra-tanzania.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiCal = 'https://pt.wikipedia.org/wiki/Calembur';
  const wikiValise = 'https://pt.wikipedia.org/wiki/Palavra-valise';
  const wikiComp = 'https://pt.wikipedia.org/wiki/Composi%C3%A7%C3%A3o_(lingu%C3%ADstica)';
  const wikt = 'https://pt.wiktionary.org/wiki/trocadilho';
  const wiktCaralho = 'https://pt.wiktionary.org/wiki/caralho';

  const body = `## Escopo

Inspeção editorial da palavra **[trocadilho](${self})** — o **jogo** em que duas palavras (ou pedaços) **parecem** formar outra com sentido novo. Pedido de campo: *cara + alho* e a pergunta *é polimorfismo?* Resposta lab: **não**. A âncora desta ficha é o **nome da piada**. Irmãs: [aglutinação](${aglutinacao}) (solda gramatical real) e [polimorfismo](${polimorfismo}) (várias formas, outro ofício). Exemplo vivo de **palavra-valise** (mistura que *cria* nome): [Tanzânia](${tanzania}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Trocadilho](${WIKI}), [Calembur](${wikiCal}), [Palavra-valise](${wikiValise}), [Composição](${wikiComp}), [Wikcionário · trocadilho](${wikt}). O exemplo *cara+alho* desemboca numa **palavra de baixo calão** já existente — a ficha inspecciona o **mecanismo**, não o insulto. **Ficha ≠ dicionário de ofensas.** [Respeito](${respeito}) + [verdade](${verdade}): a [etimologia popular](${etimologia}) **não** é o étimo.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **trocadilho** |
| Sinónimos de ofício | **calembur** (fr. *calembour*) · por vezes **paronomásia** (som parecido, não necessariamente solda) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | de *trocar* / esp. *trocado* — «troca» de peças sonoras — confiança: **alta** no sentido; detalhe românico: **média** |
| Pedido de campo | *cara* + *alho* → outra palavra; *é polimorfismo?* |
| Não é | [polimorfismo](${polimorfismo}) · [aglutinação](${aglutinacao}) histórica deste vocábulo · criação de palavra nova |
| Tipo BudGanja | Palavra — jogo de ouvido × [relação](${relacao}) entre peças × correção de nome |
| Elo língua | [língua portuguesa](${lingua}) · [Tanzânia](${tanzania}) (palavra-valise verdadeira) |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Fonte | [Trocadilho](${WIKI}) |
| Data | ${inspected} |

**O que é o objeto:** o **nome do jogo**. Duas peças (*cara*, *alho*) colam no ouvido e **revelam** uma terceira forma que o português **já tinha**. Não se inventa o vocábulo; troca-se a leitura.

## 2. Cara + alho — o que a boca faz

| Peça | Sentido sozinha | Papel no jogo |
|------|-----------------|---------------|
| **cara** | rosto; pessoa; «ter cara de» | primeira metade sonora |
| **alho** | *Allium sativum* — dente de alho | segunda metade sonora |
| **cara+alho** (ouvido) | a terceira forma **já existia** (baixo calão / interjeição) | a piada **descobre** uma leitura, não baptiza |

O *a* final de *cara* e o *a* inicial de *alho* **fundem-se** no ouvido — parece [aglutinação](${aglutinacao}). A diferença lab: a aglutinação escolar **produz** composto (*planalto* = plano+alto). Aqui o composto **não** é a origem da palavra: é **[etimologia popular](${etimologia})** (história que encaixa demais).

**H-jogo:** *cara+alho* = **trocadilho** + **[etimologia popular](${etimologia})**.  
**H-não:** não é [polimorfismo](${polimorfismo}).  
**H-não-2:** não é palavra-valise (não se criou *brunch*; leu-se uma forma velha).

## 3. Quatro nomes (não misturar)

| Nome | O que faz | Exemplo lab | Confiança |
|------|-----------|-------------|-----------|
| **Trocadilho** / **calembur** | Jogo: ler A+B como C, ou trocar sons | *cara* + *alho* | Alta (pedido de campo) |
| **[Aglutinação](${aglutinacao})** | Composição em que as peças **fundem** e perdem fatia | *planalto*, *embora*, *aguardente* | Alta (gramática escolar) |
| **Palavra-valise** / *portmanteau* | Mistura que **cria** vocábulo novo | [Tanzânia](${tanzania}) = Tan+Zan+-ia (1964) | Alta |
| **[Polimorfismo](${polimorfismo})** | Várias **formas** do mesmo (biologia / código / alomorfia) | um gene, vários fenótipos; um método, vários tipos | Alta — e **não** é este jogo |

**Veredicto de nome:** o pedido *cara e alho, junção que forma outro significado* chama-se **trocadilho**. Polimorfismo é outro mapa — ficha [polimorfismo](${polimorfismo}).

## 4. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| *Trocadilho* ← *trocar* | Troca de peças (som / sentido) | Alta |
| *Calembur* ← fr. *calembour* | Mesmo ofício em nome francês | Alta |
| Paronomásia | Jogo de vocábulos parecidos (*são* / *são*) | Alta no termo; **vizinho**, não sinónimo fechado |
| [Etimologia popular](${etimologia}) *cara+alho* | História falsa que a boca conta porque **encaixa** | Alta (como fenómeno); **baixa** como étimo real |
| Étimo da terceira forma | lat. *caraculum* («estaca, pau pequeno») → uso náutico → gíria — ver [Wikcionário](${wiktCaralho}) | Média–alta (hipótese dominante; detalhe em disputa) |

**Veredicto etimológico:** **trocadilho** nomeia o jogo. A terceira forma **não** nasceu de alho na cara. A [verdade](${verdade}) do lab: separar **piada** e **origem**.

## 5. Palavra-valise × trocadilho

A [Tanzânia](${tanzania}) **é** palavra-valise: Tanganica + Zanzibar + *-ia* **criaram** o nome do país em 1964. *Brunch* = *breakfast* + *lunch*. [Abracadabra](${abracadabra}) é fórmula, não solda de duas peças PT.

*Cara+alho* **não** criou vocábulo: leu um que já circulava. Por isso o lab **não** ficheia o exemplo como palavra-valise. O elo útil: os dois são **junções de ouvido**; só um **baptiza**.

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Nome do fenómeno** | Polimorfismo | **Trocadilho** |
| **Gramática** | Aglutinação que gerou a palavra | Aglutinação **fingida** no ouvido |
| **Criação** | Palavra nova tipo Tanzânia | Leitura nova de palavra **velha** |
| **Ofício** | Insulto | Mecanismo linguístico; o insulto é **outro uso** |
| **Étimo** | cara + alho | [Etimologia popular](${etimologia}) ≠ étimo |

## 7. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Nomear o jogo** | «isso é um trocadilho» | Bom: âncora desta ficha |
| **Calembur** | mesmo ofício, nome culto | Bom: sinónimo de oficina |
| **Piada cara+alho** | soldar as duas peças | Bom: exemplo etiquetado · Mau: achar que prova o étimo |
| **Palavrão** | a terceira forma como ofensa | Fora do recorte — [respeito](${respeito}) |
| **Confusão com código** | chamar polimorfismo | Mau: misturar mapas — ir a [polimorfismo](${polimorfismo}) |

## Hipóteses (síntese)

**H1:** âncora = **trocadilho** (calembur).  
**H2:** *cara+alho* = jogo + [etimologia popular](${etimologia}); **não** é étimo.  
**H3:** **não** é [polimorfismo](${polimorfismo}).  
**H4:** **não** é [aglutinação](${aglutinacao}) histórica desta terceira forma.  
**H5:** palavra-valise verdadeira = [Tanzânia](${tanzania}).  
**H6:** fecho = [Valeu !!!](${mantra}) — nome certo, sem misturar ofícios.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Aglutinação](${aglutinacao}) | Solda gramatical real — irmã que **não** é a piada |
| [Polimorfismo](${polimorfismo}) | O nome que **não** serve aqui |
| [Tanzânia](${tanzania}) | Palavra-valise (Tan+Zan+-ia) |
| [Etimologia](${etimologia}) | O ofício: étimo × popular; esta piada é o exemplo |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo do ofício de nomear |
| [Relação](${relacao}) | O **entre** das duas peças |
| [Verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) | Piada ≠ origem; baixo calão etiquetado |
| [Abracadabra](${abracadabra}) · [Grok](${grok}) | Outros jogos de boca / tom |
| [Valeu !!!](${mantra}) | Fechar com o nome certo |

## Limites

- Não é tratado de retórica comparada nem lista de calembures.  
- Não é dicionário de palavrões; a terceira forma cita-se como **resultado do jogo**.  
- Não resolve todas as disputas do étimo da terceira forma — aponta a hipótese dominante e recusa a popular.  
- Polimorfismo e aglutinação têm **fichas próprias**.

## Status

**Aprovado** — **trocadilho** fichado como nome do jogo *cara+alho*; [polimorfismo](${polimorfismo}) recusado; [aglutinação](${aglutinacao}) e palavra-valise ([Tanzânia](${tanzania})) separadas. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Aglutinação](${aglutinacao}) · [▶ Polimorfismo](${polimorfismo}) · [▶ Tanzânia](${tanzania}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **trocadilho** (pun / Fr. *calembour*). Field request: *cara* + *alho* forming another meaning — is that **polymorphism**? Lab answer: **no**. This sheet names the **joke**. Sisters: [aglutinação](${aglutinacao}) (real compounding) and [polimorfismo](${polimorfismo}) (many forms, other craft). True portmanteau: [Tanzânia](${tanzania}).

> Independent audit. Sources: [Trocadilho](${WIKI}), [portmanteau](${wikiValise}). The *cara+alho* gag lands on an existing **swear-word** — the sheet inspects the **mechanism**, not the insult.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **trocadilho** · **calembur** |
| Field request | face + garlic → another word; polymorphism? |
| Not | [polymorphism](${polimorfismo}) · historical agglutination of that vocable · a newly coined blend |
| Date | ${inspected} |

## 2. Four names

| Name | What it does | Lab example |
|------|----------------|-------------|
| **Pun / calembour** | Read A+B as C | *cara* + *alho* |
| **[Agglutination](${aglutinacao})** | Pieces fuse into a real compound | *planalto* |
| **Portmanteau** | Blend that **creates** a word | [Tanzania](${tanzania}) |
| **[Polymorphism](${polimorfismo})** | Many forms of the same thing | biology / code — **not** this joke |

**Verdict:** the joining that makes another meaning here is a **pun**. [Folk etymology](${etimologia}) ≠ etymon.

## Status

**Approved** — pun named; polymorphism refused; agglutination and portmanteau kept apart.

[▶ Words](${hub}) · [▶ Agglutination](${aglutinacao}) · [▶ Polymorphism](${polimorfismo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **trocadilho** (juego de palabras / *calembur*). Pedido: *cara* + *alho* forman otro sentido — ¿es **polimorfismo**? Respuesta del lab: **no**. Esta ficha nombra el **juego**. Hermanas: [aglutinação](${aglutinacao}) y [polimorfismo](${polimorfismo}). Palabra-valija verdadera: [Tanzânia](${tanzania}).

> Auditoría independiente. Fuentes: [Trocadilho](${WIKI}). El gag *cara+alho* desemboca en un **taco** ya existente — se inspecciona el **mecanismo**, no el insulto.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **trocadilho** · **calembur** |
| No es | [polimorfismo](${polimorfismo}) · aglutinación histórica de ese vocablo |
| Fecha | ${inspected} |

## 2. Cuatro nombres

**Trocadilho** = el juego. **[Aglutinação](${aglutinacao})** = soldadura gramatical real. **Palabra-valija** = [Tanzânia](${tanzania}). **[Polimorfismo](${polimorfismo})** = varias formas — **no** este chiste.

## Estado

**Aprobada** — juego nombrado; polimorfismo rechazado.

[▶ Palabras](${hub}) · [▶ Aglutinación](${aglutinacao}) · [▶ Polimorfismo](${polimorfismo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTrocadilhoPost() {
  const { body, contentEn, contentEs, wiki } = buildTrocadilhoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-trocadilho', 152);
  const post = makePalavra({
    title: 'Inspeção: Trocadilho — cara + alho, e por que não é polimorfismo',
    titleEn: 'Inspection: Trocadilho — face + garlic, and why it is not polymorphism',
    titleEs: 'Inspección: Trocadilho — cara + ajo, y por qué no es polimorfismo',
    excerpt:
      'Palavras: trocadilho (calembur) — cara+alho é jogo + etimologia popular, não polimorfismo nem palavra-valise; irmãs aglutinação e Tanzânia; Valeu !!!',
    excerptEn:
      'Words: pun / calembour — cara+alho is a joke + folk etymology, not polymorphism or a portmanteau; sisters agglutination and Tanzania; Valeu !!!',
    excerptEs:
      'Palabras: trocadilho (calembur) — cara+alho es juego + etimología popular, no polimorfismo ni palabra-valija; hermanas aglutinación y Tanzanía; ¡Valeu !!!',
    slug: 'inspecao-palavra-trocadilho',
    date: '2026-08-21T16:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Trocadilho · palavra',
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

module.exports = { buildTrocadilhoPost, buildTrocadilhoBodies };
