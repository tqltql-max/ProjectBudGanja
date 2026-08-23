'use strict';

/**
 * Inspeção Palavras · cinzeiro
 * (pedido «Cinzerio» → forma canónica cinzeiro)
 * Eixos: cinza + -eiro · recipiente / monte de cinza · fogo × gesto ·
 * ≠ cinzento · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildCinzeiroBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const cultivo = '/cultivo/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/cinzeiro';
  const wikiCinza = 'https://pt.wiktionary.org/wiki/cinza';

  const body = `## Escopo

Inspeção editorial da palavra **cinzeiro** — no português do Brasil, sobretudo o **recipiente** onde se deita a **cinza** (e restolhos) do [fogo](${fogo}) de cigarro / combustão, e, em sentido mais antigo ou literário, o **monte de cinzas**. Pedido oral/escrito «Cinzerio» → forma canónica **cinzeiro**. Esta ficha cobre o **objeto** (*cinza* + *-eiro*), o eixo **cinza × fogo × gesto**, a distinção **cinzeiro ≠ cinzento**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cinzeiro](${wiki}), [cinza](${wikiCinza}), série [Palavras](${hub}). **Ficha ≠ incentivo ao tabaco nem manual de consumo.** Nomear o utensílio ≠ endossar fumar. Tom: Inspetor BudGanja — *cinzeiro* é o **lugar da cinza**; o [risco](${risco}) e o [gesto](${gesto}) ficam do lado de quem acende. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cinzeiro** (grafia pedida «Cinzerio» → canónica) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | *cinza* + sufixo *-eiro* (lugar / utensílio ligado à cinza) — confiança: **alta** ([Wikcionário](${wiki})) |
| Família | *cinza* · *cinzento* · *acinzentado* · *cinzeiro* |
| Cognatos / paralelos | esp. *cenicero* · fr. *cendrier* · ing. *ashtray* (recipiente) / *ash heap* (monte) |
| Tipo BudGanja | Palavra — utensílio / lugar da cinza × ofício do [fogo](${fogo}) |
| Elo ofício | [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}) · [balde](${balde}) |
| Elo léxico | [verdade](${verdade}) · [caminho](${caminho}) · [língua portuguesa](${lingua}) |
| Elo vivo | [planta](${planta}) · [cultivo](${cultivo}) (cinza ≠ adubo automático — inspecionar) |
| Elo projecto | [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · cinzeiro](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o **vaso / prato / recipiente** (uso vivo BR) — e, por extensão, o **monte** ou sítio onde a cinza se acumula. No lab: utensílio de **contenção** da cinza do [fogo](${fogo}), para não espalhar brasa nem resto onde não deve.

## 2. Cinzeiro × cinza × cinzento × gelo

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **cinza** | Resíduo da combustão; cor | Matéria / cor — base do étimo |
| **cinzeiro** | Lugar / vaso da cinza | Utensílio ou monte — *onde* a cinza fica |
| **cinzento** | Adjectivo de cor | ≠ recipiente |
| **[fogo](${fogo})** | Combustão / calor | Produz a cinza que o cinzeiro recebe |
| **[gelo](${gelo})** | Frio / sólido | Contraste elemental — outro ofício |

**H1:** *cinzeiro* = *cinza* + *-eiro* — utensílio ou lugar da cinza (alta confiança).  
**H2:** no BR vivo, o sentido dominante é o **ashtray**.  
**H3:** fichar a palavra ≠ promover fumo; é literacia do objecto e do [gesto](${gesto}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Recipiente (BR)** | Vaso para cinza de cigarro / combustão leve | Alta |
| **Monte de cinzas** | Grande acumulação (sentido 1 no Wikcionário) | Alta (léxico) |
| **Lareira / forno** (tradição) | Sítio onde se aparta a cinza | Média (uso regional / galego-pt) |
| **Metáfora** | «Virar cinzeiro» / fim em cinza | Média (uso figurado) |
| **Ofício lab** | Conter brasa e resto; higiene do espaço | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *cinzeiro* |
|-------|------------------------|
| [Fogo](${fogo}) | Origem da cinza |
| [Gesto](${gesto}) | Apagar / deitar cinza com cuidado |
| [Risco](${risco}) | Brasa viva fora do cinzeiro |
| [Balde](${balde}) | Outro recipiente de ofício — volumes diferentes |
| [Gelo](${gelo}) | Contraste elemental |
| [Planta](${planta}) · [Cultivo](${cultivo}) | Cinza de madeira às vezes no solo — ≠ cinza de cigarro «adubo» sem inspeção |
| [Língua portuguesa](${lingua}) | Solo lexical |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Passa o cinzeiro»** | Pedido de utensílio | Ofício de contenção |
| **Cinzeiro cheio** | Higiene / troca | [Gesto](${gesto}) de esvaziar com segurança (frio) |
| **Sem cinzeiro** | Cinza no chão / no vaso da planta | [Risco](${risco}) e falta de ofício |
| **Monte de cinzas** | Sentido amplo / literário | Menos frequente no BR oral |
| **Ortografia** | *cinzeiro* | «Cinzerio» = variante pedida; canónica com **ei** |

**Finalidade-mãe:** nomear o **cinzeiro** para **conter a cinza com ofício** — o fogo acaba num sítio certo, não no canteiro nem na mão.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com este resto de fogo**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «É só cinza» = falso se ainda há brasa · «cinzeiro frio e limpo» = ofício |
| Par vivo | [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}) |

**Veredicto:** Valeu !!! **no fim do fogo**. Cinzeiro sem [gesto](${gesto}) = bagunça; cinzeiro com inspeção = contenção que respeita o espaço e o vivo ao lado.

## Hipóteses (síntese)

**H1:** objeto = *cinza* + *-eiro* → cinzeiro (alta confiança).  
**H2:** uso vivo BR = recipiente (ashtray).  
**H3:** elos = [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}).  
**H4:** fecho = [Valeu !!!](${mantra}) — apagar e conter.

## Limites

- Não é campanha antitabaco nem apologia ao fumo.  
- Cinza de cigarro ≠ adubo de [cultivo](${cultivo}) sem critério.  
- Grafia canónica: **cinzeiro** (não «cinzerio»).

## Status

**Aprovado** — **cinzeiro** fichado: *cinza*+*-eiro*, recipiente/monte da cinza, rede com fogo/gesto e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Fogo](${fogo}) · [▶ Gesto](${gesto}) · [▶ Risco](${risco}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **cinzeiro** (requested spelling “Cinzerio” → canonical **cinzeiro**) — chiefly the **ashtray** (*cinza* + *-eiro*), also an ash heap. Links [fogo](${fogo}), [gesto](${gesto}), [risco](${risco}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · cinzeiro](${wiki}). Naming the vessel ≠ endorsing smoking.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **cinzeiro** |
| Etymon | *cinza* + *-eiro* — high confidence |
| Lab type | Ash vessel / place × fire craft |
| Links | [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Craft note

Contain ash and embers. Cold before emptying. Cigarette ash ≠ garden fertilizer without inspection.

## 3. Valeu !!!

Best possible **at the end of the fire**, today.

## Status

**Approved** — object · containment · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Fogo](${fogo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **cinzeiro** (pedido «Cinzerio» → forma canónica **cinzeiro**) — sobre todo el **cenicero** (*cinza* + *-eiro*), también montón de ceniza. Vínculos [fogo](${fogo}), [gesto](${gesto}), [risco](${risco}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · cinzeiro](${wiki}). Nombrar el utensilio ≠ promover fumar.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **cinzeiro** |
| Étimo | *cinza* + *-eiro* |
| Tipo lab | Recipiente / lugar de la ceniza × oficio del fuego |
| Vínculos | [fogo](${fogo}) · [gesto](${gesto}) · [risco](${risco}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Oficio

Contener ceniza y brasa. Frío antes de vaciar.

## 3. ¡Valeu !!!

Lo mejor posible **al final del fuego**, hoy.

## Estado

**Aprobado** — objeto · contención · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Fogo](${fogo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCinzeiroPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCinzeiroBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 93;
  return makePalavra({
    title: 'Inspeção: Cinzeiro — lugar da cinza e ofício do fogo',
    titleEn: 'Inspection: Cinzeiro — ash place and fire craft',
    titleEs: 'Inspección: Cinzeiro — lugar de la ceniza y oficio del fuego',
    excerpt:
      'Palavras: «cinzeiro» (*cinza* + *-eiro*) — recipiente/monte da cinza; elos fogo, gesto, risco; Valeu !!!',
    excerptEn:
      'Words: “cinzeiro” (*cinza* + *-eiro*) — ashtray / ash heap; links fogo, gesto, risco; Valeu !!!',
    excerptEs:
      'Palabras: «cinzeiro» (*cinza* + *-eiro*) — cenicero / montón de ceniza; vínculos fogo, gesto, risco; ¡Valeu !!!',
    slug: 'inspecao-palavra-cinzeiro',
    date: '2026-08-03T17:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cinzeiro · palavra',
    coverImage: '/imagens/inspecoes/cinzeiro-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCinzeiroPost,
  buildCinzeiroBodies
};
