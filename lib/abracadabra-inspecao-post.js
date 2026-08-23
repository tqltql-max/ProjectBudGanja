'use strict';

/**
 * Inspeção Palavras · Abracadabra
 * Eixos: fórmula · palco · lapso oral «abacadabra» · fala ≠ feito
 * Ficha de palavra, não grimório nem review de magia.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/abracadabra-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Abracadabra';

function buildAbracadabraBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-abracadabra.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const fantasioso = '/posts/post-inspecao-palavra-fantasioso.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const lampada = '/posts/post-inspecao-palavra-lampada.html';
  const esfregar = '/posts/post-inspecao-palavra-esfregar.html';
  const desejos = '/posts/post-inspecao-palavra-desejos.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiktPt = 'https://pt.wiktionary.org/wiki/abracadabra';
  const wiktEn = 'https://en.wiktionary.org/wiki/abracadabra';
  const wikiEn = 'https://en.wikipedia.org/wiki/Abracadabra';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';

  const body = `## Escopo

Inspeção editorial da palavra **[abracadabra](${self})** — e do pedido oral **abacadabra**, lapso que **cai o r** depois do *b*. No português do Brasil é **fórmula de palco** («e agora… abracadabra!») sentada em cima de um **amuleto escrito** do Império Romano. Esta ficha cobre o **objecto lexical**, a **variante abacadabra**, o **choque de camadas** (febre × palco × pensamento mágico) e a **correção BudGanja**: a fala encena; o [gesto](${gesto}) faz. Elos: [verdade](${verdade}), [criatividade](${criatividade}), [skill](${skill}), [pattern](${pattern}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · abracadabra](${wiktPt}), [EN](${wiktEn}), [Wikipédia PT](${WIKI}), [EN](${wikiEn}), série [Palavras](${hub}). **Ficha ≠ grimório, ≠ manual de ilusionismo, ≠ teologia.** Sem afiliação a palco, esoterismo ou franquia.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **abracadabra** (grafia dicionarizada) |
| Forma do pedido | **abacadabra** — oral / lapso (falta o *r* de *abra-*) |
| Outras grafias vivas | *abra cadabra* · *abrakadabra* |
| Classe | Interjeição / fórmula; também substantivo («um abracadabra») |
| Uso BR | Cue de mágico; metáfora de solução instantânea; brincadeira infantil |
| Étimo (trabalho) | Incerto no étimo remoto; **alta** confiança no uso romano como **amuleto de febre** (séc. II) |
| Tipo BudGanja | Palavra — fórmula × palco × anti-atalho |
| Elo ofício | [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Elo maravilha | [fantástico](${fantastico}) · [fabuloso](${fabuloso}) · [fantasioso](${fantasioso}) · [inspiração](${inspiracao}) |
| Elo língua / tech | [língua portuguesa](${lingua}) · [pattern](${pattern}) · [Grok](${grok}) |
| Fonte | [abracadabra (PT)](${wiktPt}) · [Abracadabra (wiki)](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** não é magia real nem truque ensinado. É o **vocábulo-fórmula** que promete efeito **ao ser dito** (ou escrito em triângulo). Inspecionar abracadabra = não deixar a palavra **substituir** o ofício.

## 2. Quatro camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Amuleto romano** | Séc. II: Sereno Samónico (*Liber Medicinalis*) — palavra escrita em **triângulo decrescente** contra febre | Alta (atestação) |
| **Étimo remoto** | Propostas (aramaico «crio como falo», hebraico, gnóstico) — **folclore erudito**, sem consenso | Baixa–média |
| **Palco** | Cue do ilusionista: a palavra **marca o instante** do truque, não o mecanismo | Alta (uso vivo) |
| **Lapso BR** | **abacadabra** / *abra cadabra* — a boca come o *r*; o lab **não** repreende a boca; ancora a forma escrita | Alta (oralidade) |
| **Metáfora** | «Isso não é abracadabra» = não há milagre; pede método | Alta |
| **Primo de ficção** | *Avada Kedavra* (saga Potter) ecoa a fórmula — **outra ficha**, outro ofício; não colar maldição a amuleto | Alta (separar) |

**H1:** **abacadabra** é a mesma palavra em trânsito oral — falta um *r*, não falta o mapa.  
**H2:** o étimo aramaico «eu crio ao falar» é **bonito e instável**; o lab cita-o como hipótese, não como facto.  
**H3:** no palco, a palavra é [pattern](${pattern}) de atenção; o efeito é [skill](${skill}) + [gesto](${gesto}) escondido.

## 2b. Aladim, génio da lâmpada, gêmeos

O pedido de campo junta a fórmula ao conto de **[Aladim](${wikiAladim})** e ao **génio da lâmpada** (oral **Geneo**). O lab lê **três ofícios**, não um só milagre:

| Peça | O que faz | Ficha |
|------|-----------|-------|
| **Abracadabra** | Cue / amuleto — a boca **marca o instante** | Esta |
| **Lâmpada** | Vaso de luz e de desejo | [lâmpada](${lampada}) |
| **Esfregar** | Cue da palma no cobre | [esfregar](${esfregar}) ≠ clique |
| **Desejos / três** | Crédito e quota popular | [desejos](${desejos}) · [três](${tres}) |
| **Génio da lâmpada** | Servidor de **desejos** no ciclo de Aladim | Engenho ≠ desejo: [genial](${genial}) |
| **Aladim** | Quem **esfrega** e pede — atalho de conto | Não é ficha de filme; é mapa de atalho |
| **Gêmeos** | Par de nascimento / signo *Gemini* | Étimo *outro*: [gêmeos](${gemeos}) |

**H-lâmpada:** o génio concede **sem ofício visível**; o palco **esconde** o ofício. Os dois tentam o mesmo vício: resultado sem rasto.  
**H-par:** *gêmeos* (*geminus*) **não** é *gênio* (*genius*) — letra parecida, família latina distinta. Ver [gêmeos](${gemeos}).  
**H-Geneo:** lapso oral de *gênio*, não de *gêmeos*.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Boca** | Poder na sílaba | Encanto social: todos olham no mesmo tempo |
| **História** | Segredo cabalístico fechado | Amuleto médico antigo + camadas posteriores |
| **Palco** | A palavra faz o coelho | A palavra **cue**; as mãos fazem |
| **Vida** | Atalho para o difícil | Pensamento mágico — irmão do [fantasioso](${fantasioso}) sem [caminho](${caminho}) |
| **Quando falha** | Mundo injusto | [Aff](${aff}) no peito; o lab reabre o método |

**H-parece:** dizer é fazer.  
**H-é:** dizer **encena**; fazer é [gesto](${gesto}) com rasto.

**Veredicto contraste:** o que parece = milagre de vocábulo; o que é = fórmula com história + cue de palco. Entrar pela porta do ofício.

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Abacadabra e está pronto» | A boca não fecha o [caminho](${caminho}) |
| «É hebraico secreto, logo é verdade» | Hipótese de étimo ≠ [verdade](${verdade}) do feito |
| «Mágico = mentiroso» | Ilusionismo declarado é ofício; fraude é outra coisa |
| «Criatividade = abracadabra» | [Criatividade](${criatividade}) tem rasto; fórmula sem rasto é fumo |
| «Se não resultou, aff» | [Aff](${aff}) mede o peito; não é veredicto — voltar ao método |

### Ofício correcto (mapa curto)

1. Se ouvir **abacadabra**, ler **abracadabra** — mesma fórmula, grafia âncora.  
2. Separar **amuleto antigo**, **palco** e **atalho de vida**.  
3. Admirar o [genial](${genial}) do truque sem entregar o [gesto](${gesto}) à sílaba.  
4. Fechar com [Valeu !!!](${mantra}) — trabalho visível, não triângulo no ar.

**Veredicto correção:** **abracadabra ≠ tecla de atalho.** No lab, a palavra vale como **história de fórmula** e como **aviso**: a boca não substitui as mãos.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Cue de palco** | «Abracadabra!» no instante do truque | Bom: marca o tempo · Mau: achar que a sílaba opera |
| **Lapso oral** | «abacadabra» / «abra cadabra» | Bom: mapa da boca · Mau: corrigir a criança em vez de brincar |
| **Anti-milagre** | «Não tem abracadabra» | Bom: pede método · Mau: cinismo que mata [inspiração](${inspiracao}) |
| **Elogio irónico** | «Foi um abracadabra» (sorte) | Bom: nomear acaso · Mau: apagar o [skill](${skill}) de quem fez |
| **Brinquedo** | Criança com capa | Bom: jogo · Mau: vender milagre adulto no mesmo saco |

## 6. Anti-atalho · Valeu !!!

| Armadilha | Leitura |
|-----------|---------|
| **Fala = facto** | A fórmula encena; a [verdade](${verdade}) mede o rasto |
| **Étimo como prova** | «Crio ao falar» é hipótese — não licença para saltar o [caminho](${caminho}) |
| **Palco como vida** | Ilusão combinada ≠ atalho no ofício |
| **Aff como fecho** | [Aff](${aff}) soprou; o lab ainda inspeciona |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor **com as mãos**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Abacadabra» como fecho de tarefa = falso ofício |
| Rede | [gesto](${gesto}) · [skill](${skill}) · [verdade](${verdade}) · [pattern](${pattern}) |

**Veredicto:** Valeu !!! **sem a tecla mágica** — abracadabra como fórmula inspecionada; abacadabra como boca viva; nenhum dos dois como substituto do rasto.

## Hipóteses (síntese)

**H1:** âncora escrita = **abracadabra**; **abacadabra** = variante oral.  
**H2:** parece poder na sílaba; é cue + história de amuleto + risco de atalho.  
**H3:** elos = [gesto](${gesto}) · [skill](${skill}) · [verdade](${verdade}) · [fantástico](${fantastico}).  
**H4:** fecho [Valeu !!!](${mantra}); ficha ≠ grimório.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Gesto](${gesto}) · [Skill](${skill}) · [Caminho](${caminho}) | O que o palco esconde e o lab exige |
| [Verdade](${verdade}) · [Pattern](${pattern}) | Hipótese de étimo ≠ padrão de truque |
| [Fantástico](${fantastico}) · [Fabuloso](${fabuloso}) · [Fantasioso](${fantasioso}) | Maravilha × conto × fuga |
| [Inspiração](${inspiracao}) · [Criatividade](${criatividade}) · [Genial](${genial}) | Sopro e rasto; génio da lâmpada ≠ elogio «genial» |
| [Gêmeos](${gemeos}) | Par (*geminus*) — **não** colar ao génio da lâmpada |
| [Lâmpada](${lampada}) · [Esfregar](${esfregar}) · [Desejos](${desejos}) · [Três](${tres}) | Vaso, palma, pack e quota |
| [Aff](${aff}) | Quando a fórmula não fecha a vida |
| [Grok](${grok}) · [Língua portuguesa](${lingua}) · [Guia](${guia}) | Outras fórmulas / empréstimos |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem atalho |

## Limites

- Não ensina truques nem rituais.  
- Não autentica étimo aramaico/hebraico.  
- Não inspeciona a saga Potter — só marca o primo para **não colar**.

## Status

**Aprovado** — **abracadabra** fichado; **abacadabra** como lapso oral; anti-atalho; elos [gesto](${gesto}) · [skill](${skill}) · [verdade](${verdade}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Skill](${skill}) · [▶ Verdade](${verdade}) · [▶ Fantástico](${fantastico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **abracadabra** — and the spoken slip **abacadabra** (the *r* after *b* drops). In Brazilian Portuguese it is a **stage cue** sitting on a **Roman fever amulet**. Covers the **lexical object**, the **oral variant**, the **layer clash** (charm × stage × magical thinking), and the BudGanja correction: speech cues; the [gesture](${gesto}) does the work. Links: [verdade](${verdade}), [skill](${skill}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary](${wiktEn}), [Wikipedia](${wikiEn}). **Not a grimoire, not a magic manual.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **abracadabra** (dictionary form) · **abacadabra** (oral / slip) |
| Path | 2nd-c. Roman diminishing charm (high confidence) × uncertain remote etymology × stage cue × life-shortcut metaphor |
| Links | [gesture](${gesto}) · [skill](${skill}) · [truth](${verdade}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** power in the syllable.  
**Is:** a **formula** (history + attention cue). Genius without a trail is not the word — it is [skill](${skill}) and [gesture](${gesto}).

## 3. BudGanja correction

**Abracadabra ≠ shortcut key.** If you hear abacadabra, read abracadabra. Admire the trick without handing the work to the sound. Close with [Valeu !!!](${mantra}).

## Status

**Approved** — written anchor × oral slip; anti-shortcut; links [gesture](${gesto}) · [skill](${skill}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Gesture](${gesto}) · [▶ Skill](${skill}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **abracadabra** — y el lapsus oral **abacadabra** (cae la *r* tras *b*). En el portugués de Brasil es **cue de escenario** sobre un **amuleto romano de fiebre**. Cubre el **objeto léxico**, la **variante oral**, el **choque de capas** y la corrección BudGanja: el habla señala; el [gesto](${gesto}) hace. Vínculos: [verdade](${verdade}), [skill](${skill}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario](${wiktPt}), [Wikipedia](${WIKI}). **No es grimorio ni manual de magia.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **abracadabra** (forma de diccionario) · **abacadabra** (oral / lapsus) |
| Camino | Amuleto romano s. II (alta confianza) × étimo remoto incerto × cue de escenario × atajo de vida |
| Vínculos | [gesto](${gesto}) · [skill](${skill}) · [verdad](${verdade}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** poder en la sílaba.  
**Es:** una **fórmula** (historia + señal de atención). Sin rastro no es la palabra — es [skill](${skill}) y [gesto](${gesto}).

## 3. Corrección BudGanja

**Abracadabra ≠ tecla de atajo.** Si oyes abacadabra, lee abracadabra. Admirar el truco sin entregar el oficio al sonido. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — ancla escrita × lapsus oral; anti-atajo; vínculos [gesto](${gesto}) · [skill](${skill}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ Skill](${skill}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildAbracadabraPost() {
  const { body, contentEn, contentEs, wiki } = buildAbracadabraBodies();
  let seriesOrder = 121;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-abracadabra');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 121 */
  }

  const post = makePalavra({
    title:
      'Inspeção: Abracadabra — fórmula, palco e o lapso «abacadabra»',
    titleEn:
      'Inspection: Abracadabra — formula, stage cue, and the slip “abacadabra”',
    titleEs:
      'Inspección: Abracadabra — fórmula, escenario y el lapsus «abacadabra»',
    excerpt:
      'Palavras: «abracadabra» — âncora escrita; «abacadabra» = lapso oral; amuleto romano × cue de palco × anti-atalho; elos gesto, skill e verdade; Valeu !!!',
    excerptEn:
      'Words: “abracadabra” — written anchor; “abacadabra” = oral slip; Roman amulet × stage cue × anti-shortcut; links gesture, skill and truth; Valeu !!!',
    excerptEs:
      'Palabras: «abracadabra» — ancla escrita; «abacadabra» = lapsus oral; amuleto romano × cue de escenario × anti-atajo; vínculos gesto, skill y verdad; ¡Valeu !!!',
    slug: 'inspecao-palavra-abracadabra',
    date: '2026-08-19T23:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Abracadabra · palavra',
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

module.exports = {
  buildAbracadabraPost,
  buildAbracadabraBodies
};
