'use strict';

/**
 * Inspeção Palavras · especial
 * Eixos: Lat. specialis (≠ Tupi) · uso oral/ofício BR · «em especial» ·
 * rede «Palavras originárias do Brasil» · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildEspecialBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const diamba = '/posts/post-inspecao-palavra-diamba.html';
  const ganja = '/posts/post-inspecao-palavra-ganja.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/especial';
  const wikiSpecies = 'https://en.wiktionary.org/wiki/specialis';

  const body = `## Escopo

Inspeção editorial da palavra **especial** — e, **em especial**, do que o laboratório faz com ela no português do Brasil. Esta ficha cobre o **objeto** (Latim *specialis*, **não** étimo tupi), os **usos orais e de ofício** no BR, o meta-quadro **«em especial»**, e uma secção substancial **«Palavras originárias do Brasil»**: mapa das fichas já existentes (afro-atlânticas, contacto, oralidade BR) — sem fingir que *especial* seja indígena.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · especial](${wiki}), [specialis (EN)](${wikiSpecies}), [língua portuguesa](${lingua}), [Duvivier](${duvivier}), série [Palavras](${hub}). **Ficha ≠ dicionário académico completo.** Sem afiliação comercial.

**Aviso etimológico (obrigatório):** **especial ≠ Tupi / ≠ «palavra originária indígena»**. O étimo de trabalho é latim *specialis* ← *species* («espécie; tipo»). O que é brasileiro nesta ficha é o **uso** (oralidade, ofício, rede de sentido) — não a genealogia lexical.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **especial** |
| Locução âncora | **em especial** («de modo particular; sobretudo») |
| Classe | Adjectivo · também advérbio em locuções (*em especial*) |
| Étimo (trabalho) | Latim *specialis* («próprio de uma espécie; particular») ← *species* — confiança: **alta** |
| O que **não** é | Étimo tupi, guarani ou «nativismo» folclórico — **reprovado** como hipótese |
| Família | *espécie* · *específico* · *especialidade* · *especialmente* · *especialista* |
| Cognatos | esp. *especial* · fr. *spécial* · it. *speciale* · ing. *special* |
| Tipo BudGanja | Palavra — latim vivo × uso BR × meta-quadro da rede originária |
| Elo língua | [língua portuguesa](${lingua}) · [Duvivier](${duvivier}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [genial](${genial}) · [Faça o melhor!](${mantra}) |
| Elo rede BR | [maconha](${maconha}) · [diamba](${diamba}) · [ganja](${ganja}) · [aff](${aff}) · [buguei](${buguei}) · [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) |
| Fonte | [Wikcionário · especial](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que marca o **particular**, o **fora do comum**, o **próprio de um tipo** — e, na boca BR, o elogio («é especial»), a selecção («em especial isto») e o risco de vazio («tudo é especial» = nada é).

## 2. Origem — latim, não tupi

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *species* | Espécie, aspecto, tipo | Alta |
| Lat. *specialis* | Próprio de uma espécie; particular | Alta |
| Romance → PT | *especial* / *especialmente* | Alta |
| Uso BR oral | Elogio, selecção, afecto («pessoa especial») | Alta (uso vivo) |
| Hipótese «tupi / indígena» | Sem documentação filológica séria | **Reprovada** |

**H1:** *especial* é herança **latina/romance** — mesma família de *espécie* e *específico*.  
**H2:** o Brasil **não inventa** o étimo; **inventa e inspeciona usos** (tom, afecto, ofício).  
**H3:** confundir *especial* com palavra originária indígena **apaga** a história real das palavras que **são** afro-atlânticas ou de contacto — por isso esta ficha **separa** as camadas.

**Veredicto etimológico:** **especial = *specialis***. Creditamos o latim; **não** romantizamos origem indígena falsa.

## 3. Usos no português do Brasil (oralidade e ofício)

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Selecção** | «Em especial a palavra *especial*» | Bom: apontar o foco · Mau: lista sem critério |
| **Elogio afectivo** | «É uma pessoa especial» | Bom: nomear cuidado · Mau: elogio vazio sem [gesto](${gesto}) |
| **Ofício / craft** | «Tratamento especial» · «ficha especial» | Bom: particularizar com método · Mau: excepção sem [verdade](${verdade}) |
| **Marketing / hype** | «Oferta especial!» | Bom: se for facto · Mau: tudo especial = nada especial |
| **Contraste com genial** | «Especial» ≠ [genial](${genial}) | Bom: especial = particular; genial = engenho · Mau: fundir os dois |

### «Em especial» — meta-quadro desta inspeção

A locução **em especial** é o **ponteiro** do laboratório: «inspeciona a rede originária do Brasil, **em especial** a palavra *especial*». Ou seja:

1. O pedido aponta para o **mapa das palavras BR-marcadas / originárias** (secção seguinte).  
2. Dentro desse mapa, **destaca** *especial* — sem a transformar em tupi.  
3. O ofício responde: etimologia latina **honesta** + usos BR + elos às fichas verdadeiramente afro-atlânticas / de contacto / de oralidade.

## 4. Palavras originárias do Brasil

Como o laboratório lê o léxico **nascido, atravessado ou marcado no Brasil** — sem confundir camadas. *Especial* entra aqui como **âncora meta** («em especial…»), **não** como étimo indígena.

### 4.1 Como o lab classifica

| Camada | O que é | Como inspecionar | Exemplos no projecto |
|--------|---------|------------------|----------------------|
| **Afro-atlântica / bantu em solo BR** | Vocábulo que viaja com a diáspora africana e se fixa no português do Brasil | Étimo + viagem + estigma/uso | [maconha](${maconha}) · [diamba](${diamba}) |
| **Rota índica / caribenha presente no BR** | Palavra de outra rota cultural que o Brasil **usa** e a marca BudGanja ecoa | Creditar rota; não fundir com maconha | [ganja](${ganja}) |
| **Contacto indígena (mapa geral)** | Empréstimos tupi/guarani etc. na língua | Só com fonte; sem folclore | (fichas futuras — não inventar aqui) |
| **Oralidade / craft BR** | Formas vivas da boca e do teclado brasileiro | Tom, peito, ofício | [aff](${aff}) · [buguei](${buguei}) · [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) |
| **Solo da língua** | O meio onde tudo isto se mistura | Originalidade × mudança no tempo | [língua portuguesa](${lingua}) · [Duvivier](${duvivier}) |
| **Latim vivo no BR** | Herança romance **usada** à brasileira | Étimo latino + uso local | **especial** (esta ficha) · [fogo](${fogo}) |

**Hipótese de leitura:** «originária do Brasil» no BudGanja **não** = «só tupi». Significa: **nascido, atravessado ou fortemente marcado no Brasil** — com crédito de rota (África, Índia/Caribe, indígena, oralidade, latim vivo).

### 4.2 Rede já fichada (ligar, não inventar)

| Ficha | Camada | Papel na rede |
|-------|--------|---------------|
| [maconha](${maconha}) | Afro-atlântica (hipótese bantu) | Ficha fundadora — estigma e viagem semântica |
| [diamba](${diamba}) | Afro-brasileira / bantu | Quase-cognato cultural; originalidade coberta por pejorativo |
| [ganja](${ganja}) | Rota hindi/sânscrito → Caribe → global | Presente na marca; **outra** rota que [maconha](${maconha}) |
| [língua portuguesa](${lingua}) | Solo | Onde a mistura se torna ofício público |
| [Duvivier](${duvivier}) | Método | Palavra como pesquisa — não só enfeite |
| [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) | Oralidade BR | Calor × assombro — sopros do peito |
| [aff](${aff}) | Oralidade BR | Enfado — termómetro |
| [buguei](${buguei}) | Empréstimo oral BR | Inseto → falha → peito |
| **especial** (aqui) | Latim × uso BR | Meta-quadro «em especial» + aviso ≠ Tupi |

### 4.3 O que *especial* faz nesta rede

| Função | Leitura |
|--------|---------|
| **Ponteiro** | «Em especial…» escolhe o foco sem apagar o mapa |
| **Contraste** | Lembra que nem toda palavra «brasileira no uso» é «indígena no étimo» |
| **Literacia** | Treina o hábito: perguntar *de onde veio* antes de romantizar |
| **Elo afectivo** | «Especial» no peito BR (pessoa, gesto, cuidado) — sem magia etimológica falsa |
| **Fecho** | Depois de mapear a rede → [Faça o melhor!](${mantra}) com a palavra certa |

**Veredicto da secção:** as palavras **originárias / BR-marcadas** do projecto já têm fichas ([maconha](${maconha}), [diamba](${diamba}), [ganja](${ganja}), oralidade). *Especial* **organiza a visita** («em especial») e **recusa** a mentira tupi.

## 5. Para que serve · Faça o melhor!

| Finalidade | Leitura |
|------------|---------|
| **Particularizar** | Separar o foco sem mentir sobre origem |
| **Elogiar com ofício** | «Especial» + [gesto](${gesto}) ≠ hype vazio |
| **Mapear a rede BR** | Usar esta ficha como porta para originárias verdadeiras |
| **Credit etymon** | Latim primeiro; Brasil no uso |
| **Voltar ao ofício** | [verdade](${verdade}) · [Faça o melhor!](${mantra}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor **particular** deste gesto, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Tudo é especial» = diluição · o mantra pede foco |
| Anti-folclore | Inventar étimo indígena para *especial* = reprovado |
| Rede | [maconha](${maconha}) · [diamba](${diamba}) · [aff](${aff}) · [língua portuguesa](${lingua}) |

**Veredicto:** Faça o melhor **em especial** — com a palavra certa, o crédito certo (latim) e a rede das originárias **sem falsificar**.

## Hipóteses (síntese)

**H1:** *especial* ← lat. *specialis* — **não** tupi.  
**H2:** o BR marca o **uso** (oral, afecto, ofício), não o étimo.  
**H3:** «em especial» = meta-quadro para inspecionar a rede originária do Brasil.  
**H4:** elos = [maconha](${maconha}) · [diamba](${diamba}) · [ganja](${ganja}) · [aff](${aff}) · [buguei](${buguei}) · [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) · [língua portuguesa](${lingua}) · [Duvivier](${duvivier}).  
**H5:** fecho = [Faça o melhor!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Língua portuguesa](${lingua}) · [Duvivier](${duvivier}) | Solo e método |
| [Maconha](${maconha}) · [Diamba](${diamba}) · [Ganja](${ganja}) | Originárias / rotas BR-marcadas |
| [Aff](${aff}) · [Buguei](${buguei}) · [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) | Oralidade BR |
| [Genial](${genial}) · [Fogo](${fogo}) | Elogio × intensidade (contraste) |
| [Verdade](${verdade}) · [Gesto](${gesto}) · [Criatividade](${criatividade}) | Ofício |
| [Guia](${guia}) · [hub Palavras](${hub}) · [Inspeções](${hubAll}) | Catálogo |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Depois do mapa |

## Limites

- Não afirma origem indígena para *especial*.  
- Não esgota o inventário de empréstimos tupi/africanos do português BR — aponta a **rede já fichada**.  
- «Originária do Brasil» aqui é **categoria de leitura laboratorial** (camadas), não rótulo académico único.  
- Não é aconselhamento clínico nem jurídico.

## Status

**Aprovado** — **especial** fichada: Lat. *specialis* (≠ Tupi); usos BR; meta «em especial»; secção **Palavras originárias do Brasil** com elos; fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Língua portuguesa](${lingua}) · [▶ Maconha](${maconha}) · [▶ Diamba](${diamba}) · [▶ Aff](${aff}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **especial** (“special”) — and, **especially** (*em especial*), what the lab does with it in Brazilian Portuguese. Covers the **object** (Latin *specialis*, **not** a Tupi etymon), **BR oral/craft uses**, the **“em especial”** meta-frame, and a substantial **“Brazil’s originary words”** section linking existing sheets — without claiming *especial* is Indigenous.

> Method note: [Wiktionary · especial](${wiki}), [specialis](${wikiSpecies}), [Portuguese](${lingua}), [Duvivier](${duvivier}). **especial ≠ Tupi.**

## Object

| Field | Value |
|-------|-------|
| Word | **especial** |
| Anchor phrase | **em especial** (“in particular; especially”) |
| Etymon | Latin *specialis* ← *species* — **high** confidence |
| Not | Tupi / folk “native” origin — **fail** as hypothesis |
| Links | [Portuguese](${lingua}) · [maconha](${maconha}) · [diamba](${diamba}) · [ganja](${ganja}) · [aff](${aff}) · [buguei](${buguei}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Origin — Latin, not Tupi

*especial* is Romance/Latin. Brazil shapes **use** (praise, selection, craft), not the etymon. Inventing an Indigenous root erases the real Afro-Atlantic / contact stories already on file.

## BR oral and craft uses

Selection (“em especial…”), affectionate praise (“pessoa especial”), craft (“ficha especial”), marketing hype risk (“everything is special” = nothing is). Contrast: *especial* ≠ [genial](${genial}) (particular vs ingenuity).

## Brazil’s originary words

Lab layers: **Afro-Atlantic** ([maconha](${maconha}), [diamba](${diamba})) · **Indic/Caribbean route in BR** ([ganja](${ganja})) · **BR orality** ([aff](${aff}), [buguei](${buguei}), [jesusamando](${jesusamando}), [meudeusdoceu](${meudeusdoceu})) · **language soil** ([Portuguese](${lingua}), [Duvivier](${duvivier})) · **Latin alive in BR** (**especial** here). “Originary” ≠ “Tupi only.” *especial* is the **pointer** into that network, not a false Indigenous claim.

## Do your best!

Particularize with credit; refuse folk etymology; return to [gesture](${gesto}) and [Do your best!](${mantra}).

## Status

**Approved** — Latin *specialis* (≠ Tupi); BR use; originary network linked; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Portuguese](${lingua}) · [▶ Maconha](${maconha}) · [▶ Aff](${aff}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **especial** — y, **en especial**, lo que el laboratorio hace con ella en el portugués de Brasil. Cubre el **objeto** (latín *specialis*, **no** étimo tupí), los **usos orales y de oficio** BR, el meta-marco **«em especial»**, y la sección **«Palabras originarias de Brasil»** con fichas existentes — sin fingir que *especial* sea indígena.

> Nota: [Wiktionary · especial](${wiki}), [specialis](${wikiSpecies}), [portugués](${lingua}), [Duvivier](${duvivier}). **especial ≠ tupí.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **especial** |
| Locución | **em especial** («sobre todo; en particular») |
| Étimo | Latín *specialis* ← *species* — confianza **alta** |
| No es | Origen tupí / «nativo» folclórico — **reprobado** |
| Vínculos | [portugués](${lingua}) · [maconha](${maconha}) · [diamba](${diamba}) · [ganja](${ganja}) · [aff](${aff}) · [buguei](${buguei}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Origen — latín, no tupí

*especial* es romance/latín. Brasil marca el **uso**, no el étimo. Inventar raíz indígena borra las historias afroatlánticas ya fichadas.

## Usos BR

Selección, elogio afectivo, oficio, riesgo de hype. Contraste: *especial* ≠ [genial](${genial}).

## Palabras originarias de Brasil

Capas del lab: **afroatlántica** ([maconha](${maconha}), [diamba](${diamba})) · **ruta índica/caribeña** ([ganja](${ganja})) · **oralidad BR** ([aff](${aff}), [buguei](${buguei}), [jesusamando](${jesusamando}), [meudeusdoceu](${meudeusdoceu})) · **suelo** ([portugués](${lingua}), [Duvivier](${duvivier})) · **latín vivo** (**especial**). «Originaria» ≠ «solo tupí». *especial* es el **puntero** de la red.

## ¡Haz lo mejor!

Particularizar con crédito; rechazar etimología folclórica; volver al [gesto](${gesto}) con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — lat. *specialis* (≠ tupí); uso BR; red originaria enlazada; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Portugués](${lingua}) · [▶ Maconha](${maconha}) · [▶ Aff](${aff}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildEspecialPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEspecialBodies();
  const order = Number(seriesOrder) || 128;
  return makePalavra({
    title:
      'Inspeção: Especial — latim vivo, uso BR e palavras originárias do Brasil',
    titleEn:
      'Inspection: Especial — living Latin, BR use, and Brazil’s originary words',
    titleEs:
      'Inspección: Especial — latín vivo, uso BR y palabras originarias de Brasil',
    excerpt:
      'Palavras: «especial» — Lat. specialis (≠ Tupi); usos orais/ofício BR; meta «em especial»; rede das palavras originárias / BR-marcadas já fichadas; Faça o melhor!',
    excerptEn:
      'Words: “especial” — Lat. specialis (≠ Tupi); BR oral/craft use; “em especial” meta-frame; network of originary / BR-marked sheets already on file; Do your best!',
    excerptEs:
      'Palabras: «especial» — lat. specialis (≠ tupí); uso oral/oficio BR; meta «em especial»; red de fichas originarias / marcadas en BR; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-especial',
    date: '2026-08-03T20:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Especial · palavra',
    coverImage: '/imagens/inspecoes/especial-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEspecialPost,
  buildEspecialBodies
};
