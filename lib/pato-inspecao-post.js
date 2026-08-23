'use strict';

/**
 * Inspeção Palavras · pato
 * Eixos: ave aquática · étimo árabe-persa · gíria (pagar o pato) ·
 * culinária (pato no tucupi) · animal / água / coelho · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPatoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const jambu = '/posts/post-inspecao-planta-jambu.html';
  const jambuCat = '/plantas/jambu/';
  const animais = '/animais/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/pato';
  const wikiWp = 'https://pt.wikipedia.org/wiki/Pato';
  const wikiExpr = 'https://pt.wiktionary.org/wiki/pagar_o_pato';

  const body = `## Escopo

Inspeção editorial da palavra **pato** — ave aquática (Anatidae), étimo **árabe-hispânico** que substituiu o latim *anatem*, e, no português vivo, também a **figura do ingénuo** e as expressões **pagar o pato** / **cair como um pato**. Elos: [animal](${animal}), [água](${agua}), [coelho](${coelho}), culinária amazónica via [jambu](${jambu}) («pato no tucupi»), e fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pato](${wiki}), [pagar o pato](${wikiExpr}), [Wikipédia · Pato](${wikiWp}), série [Palavras](${hub}). **Ficha de palavra ≠ monografia ornitológica** — o hub [Animais](${animais}) particulariza espécies; aqui inspecionamos o **vocábulo**. Sem afiliação Disney nem receita clínica.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **pato** |
| Classe | Substantivo masculino (também gíria: «és um pato») |
| Étimo (trabalho) | Árabe hispânico *páṭṭ* ← clássico *baṭṭ* ← persa *bat* — confiança: **alta** (Wikcionário); substituiu o herdado *adem* (lat. *anatēm*) |
| Família | *pata* · *patinho* · *marreco* / *parreco* · *Anas* (taxonomia) |
| Cognatos / paralelos | esp. *pato* · gal. *pato* · ing. *duck* (tradução, não cognato) · fr. *canard* |
| Tipo BudGanja | Palavra — animal aquático × figura social × culinária |
| Elo vivo | [animal](${animal}) · [Animais](${animais}) · [água](${agua}) |
| Elo irmão | [coelho](${coelho}) — outra palavra-animal com carga cultural |
| Elo culinário | [jambu](${jambu}) · [catálogo jambu](${jambuCat}) — «pato no tucupi» |
| Elo ofício | [caminho](${caminho}) · [gesto](${gesto}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · pato](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome comum da ave de bico largo e pés palmados — e, por metáfora, quem **leva a culpa** ou **cai na conversa**. No lab: separar **referente biológico**, **expressão** e **prato**.

## 2. Hipóteses e método

**H1:** «pato» no português vem da via **árabe → iberorromance**, não do latim *anas* (que sobreviveu em *adem* / *Anas*).  
**H2:** as expressões **pagar o pato** e **cair como um pato** são **transformação social** — o animal vira figura do que sofre ou se deixa enganar.  
**H3:** «pato no tucupi» é elo **cultural-culinário** com a Amazónia e o [jambu](${jambu}); não fundir receita com ornitologia.

Passos:

1. Fixar forma + étimo (árabe-persa).  
2. Tabela: ave / gíria / expressão / culinária / cultura pop.  
3. Rede BudGanja com URLs reais.  
4. Limites + status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Árabe hispânico *páṭṭ* | Via al-Andalus → pt./esp. *pato* | Alta |
| Persa *bat* | Fonte remota do árabe clássico *baṭṭ* | Alta (cadeia) |
| Latim *anatēm* | Forma herdada *adem* — **substituída**, não étimo do *pato* actual | Alta (história) |
| Onomatopeia | Hipótese popular — não é a via do Wikcionário | Fraca |

**Veredicto etimológico:** origem **árabe-hispânica (← persa)** como hipótese forte; o latim *anas* fica na taxonomia e no arcaísmo *adem*, não no étimo vivo de *pato*.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Ave / biologia | pato-real (*Anas platyrhynchos*); Anatidae | Referente — hub [Animais](${animais}) |
| Água / habitat | lago, rio, [água](${agua}), [mar](${mar}) (eco) | Palmípede — elo elemental |
| Gíria / pejorativo | «és um pato» (ingénuo) | Duplo sentido — não apaga a ave |
| Expressão | **pagar o pato**; **cair como um pato** | Culpa alheia / ser ludibriado |
| Culinária | pato no tucupi; confit | Elo [jambu](${jambu}) — tradição amazónica |
| Cultura / conto | Patinho Feio; Pato Donald | Figuras — sem afiliação comercial |
| Irmão lexical | [coelho](${coelho}) | Animal + metáfora cultural |

## 5. Expressões âncora

| Expressão | Sentido | Leitura de ofício |
|-----------|---------|-------------------|
| **pagar o pato** | Levar a culpa (e a pena) por algo que não fez | Nomear a injustiça com [verdade](${verdade}) — sem romantizar o papel de vítima |
| **cair como um pato** | Deixar-se enganar | Contraste com método: inspecionar antes de [passar](${passar}) |
| **fazer-se de pato** (eco esp.) | Fingir que não entende | Outro eixo — não confundir com «ser o pato» |

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [animal](${animal}) | Hub lexical do ser vivo |
| [Animais](${animais}) | Catálogo de espécies |
| [água](${agua}) · [mar](${mar}) | Habitat e elemento |
| [coelho](${coelho}) | Irmão: palavra-animal com figura cultural |
| [jambu](${jambu}) · [jambu catálogo](${jambuCat}) | «pato no tucupi» na tradição oral |
| [Valeu !!!](${mantra}) | Ofício: não «ser o pato» — fazer o melhor possível nesta mão |
| Hub [Palavras](${hub}) · [Inspeções](${hubAll}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha) ou pelo **animal** ([animal](${animal})).  
2. Se vier pela gíria («és um pato»), voltar à **ave** e ao étimo.  
3. Se vier pelo prato, cruzar [jambu](${jambu}) sem fundir com taxonomia.  
4. Fechar com [Valeu !!!](${mantra}) — ofício ≠ levar a culpa alheia.  
5. Voltar ao [hub](${hubAll}).

## 7. Avaliação BudGanja

### Forças

- Documenta o étimo **árabe-persa** e a substituição do latim *anatem*.  
- Separa ave, expressão, culinária e cultura pop.  
- Liga [água](${agua}), [animal](${animal}) e [jambu](${jambu}) sem forçar analogia clínica.

### Limites

- Não é guia de espécies nem dicionário completo de gírias.  
- Não inventaria todas as adaptações de Patinho Feio / Pato Donald.

## 8. Como repetir o método

1. Fixar forma + étimo.  
2. Tabela ave / gíria / expressão / culinária.  
3. Um elo [animal](${animal}) + um elo elemental ([água](${agua})) + um elo cultural.  
4. Declaração: palavra ≠ monografia.  
5. Status.

## Status

**Aprovado** — «pato» documentado da via árabe-hispânica à gíria e ao prato amazónico, com elos a [animal](${animal}), [água](${agua}), [coelho](${coelho}) e [jambu](${jambu}).

[▶ Palavras](${hub}) · [▶ Animal](${animal}) · [▶ Água](${agua}) · [▶ Jambu](${jambu}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **pato** (“duck”) — waterbird (Anatidae), **Arabic-Hispanic** etymon that replaced Latin *anatem*, and figurative uses (**pagar o pato**, gullible person). Links: [animal](${animal}), [água](${agua}), [coelho](${coelho}), Amazon cuisine via [jambu](${jambu}) (“duck in tucupi”), and [Valeu !!!](${mantra}).

> **Method note:** [Wiktionary · pato](${wiki}). Word sheet ≠ ornithology monograph. Catalog: [Animais](${animais}).

## Object

| Field | Value |
|-------|-------|
| Word | **pato** |
| Etymon | Arabic-Hispanic *páṭṭ* ← Persian *bat* (replaced Latin *anatem*) |
| Lab type | Animal × social figure × cuisine |
| Links | [animal](${animal}) · [água](${agua}) · [coelho](${coelho}) · [jambu](${jambu}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Senses

Waterbird · slang (“gullible”) · **pagar o pato** (take the blame) · **cair como um pato** (be fooled) · duck in tucupi · pop figures (Ugly Duckling / Donald — separate axis).

## Status

**Approved** — Arabic-Persian path documented; links to animal, água, coelho and jambu.

[▶ Words](${hub}) · [▶ Animal](${animal}) · [▶ Água](${agua}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **pato** — ave acuática (Anatidae), étimo **árabe-hispánico** que sustituyó el latín *anatem*, y usos figurados (**pagar o pato**, ingenuo). Vínculos: [animal](${animal}), [água](${agua}), [coelho](${coelho}), cocina amazónica vía [jambu](${jambu}) («pato en tucupi»), y [¡Valeu !!!](${mantra}).

> **Nota metodológica:** [Wikcionario · pato](${wiki}). Ficha de palabra ≠ monografía ornitológica. Catálogo: [Animais](${animais}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **pato** |
| Étimo | Árabe hispánico *páṭṭ* ← persa *bat* (sustituyó lat. *anatem*) |
| Tipo lab | Animal × figura social × cocina |
| Vínculos | [animal](${animal}) · [água](${agua}) · [coelho](${coelho}) · [jambu](${jambu}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Sentidos

Ave acuática · jerga («ingenuo») · **pagar o pato** · **cair como um pato** · pato en tucupi · figuras pop (eje aparte).

## Estado

**Aprobada** — vía árabe-persa documentada; vínculos con animal, água, coelho y jambu.

[▶ Palabras](${hub}) · [▶ Animal](${animal}) · [▶ Água](${agua}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPatoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPatoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 91;
  return makePalavra({
    title: 'Inspeção: Pato — a palavra da ave, da culpa e da água',
    titleEn: 'Inspection: Pato — the word of the bird, blame, and water',
    titleEs: 'Inspección: Pato — la palabra del ave, de la culpa y del agua',
    excerpt:
      'Palavras: «pato» (árabe-hispânico *páṭṭ* ← persa) — ave aquática, pagar o pato, culinária amazónica; elos animal, água, jambu; Valeu !!!',
    excerptEn:
      'Words: “pato” (Arabic-Hispanic *páṭṭ* ← Persian) — waterbird, take the blame, Amazon cuisine; links animal, água, jambu; Valeu !!!',
    excerptEs:
      'Palabras: «pato» (árabe-hispánico *páṭṭ* ← persa) — ave acuática, pagar el pato, cocina amazónica; vínculos animal, água, jambu; ¡Valeu !!!',
    slug: 'inspecao-palavra-pato',
    date: '2026-08-03T17:05:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Pato · palavra',
    coverImage: '/imagens/inspecoes/pato-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPatoPost,
  buildPatoBodies
};
