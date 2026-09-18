'use strict';

/**
 * Inspeção Palavras · papel de enrolar × tabaco
 * Eixos: origem do papel (enrolar) · origem do tabaco (planta / vocábulo) ·
 * elos cinzeiro / fogo / gesto / cannabis · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPapelEnrolarTabacoBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const plantas = '/plantas/';
  const cannabis = '/plantas/cannabis-sativa/';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const oInicio = '/posts/post-inspecao-arte-o-inicio.html';
  const wikiTabaco = 'https://pt.wikipedia.org/wiki/Tabaco';
  const wikiTabacoWikt = 'https://pt.wiktionary.org/wiki/tabaco';
  const wikiNicotiana = 'https://pt.wikipedia.org/wiki/Nicotiana';
  const wikiPapel = 'https://en.wikipedia.org/wiki/Rolling_paper';
  const wikiRizla = 'https://en.wikipedia.org/wiki/Rizla';
  const wikiTobacco = 'https://en.wikipedia.org/wiki/Tobacco';

  const body = `## Escopo

Inspeção editorial do par **papel de enrolar** × **tabaco** — pedido do laboratório: **origem do papel** e **origem do tabaco**. Duas genealogias distintas que só se encontram no **gesto de enrolar**: a planta americana e o papel europeu (depois global) feitos para envolver folhas. Elos: [cinzeiro](${cinzeiro}), [fogo](${fogo}), [gesto](${gesto}), [risco](${risco}), [maconha](${maconha}) / [Cannabis](${cannabis}), [objetos](${objetos}), [proibição](${proibicao}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Tabaco](${wikiTabaco}), [Nicotiana](${wikiNicotiana}), [Wikcionário · tabaco](${wikiTabacoWikt}), [Rolling paper](${wikiPapel}), [Rizla](${wikiRizla}), [Tobacco (EN)](${wikiTobacco}). **Ficha ≠ incentivo ao fumo** nem manual de consumo. Nomear origem ≠ endossar combustão. Marcas (ex. Rizla) entram como **marco histórico**, não como publicidade. Tom: Inspetor BudGanja — separar **planta**, **papel** e **risco**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Lema A | **papel de enrolar** (também *papel de liar* / *seda* / *folha*) |
| Lema B | **tabaco** |
| Classe | Locução (papel) · substantivo masculino (tabaco) |
| Tipo BudGanja | Palavras — **dupla origem** (Américas × Europa do papel) |
| Elo utensílio | [cinzeiro](${cinzeiro}) · [objetos](${objetos}) · [gesto](${gesto}) |
| Elo planta / vocábulo | [maconha](${maconha}) · [Cannabis sativa](${cannabis}) · [plantas](${plantas}) |
| Elo aviso | [fogo](${fogo}) · [risco](${risco}) · [proibição](${proibicao}) |
| Fonte papel | [Rolling paper](${wikiPapel}) · [Rizla](${wikiRizla}) |
| Fonte tabaco | [Tabaco](${wikiTabaco}) · [Nicotiana](${wikiNicotiana}) |
| Data | ${inspected} |

## 2. Origem do tabaco (planta e palavra)

### 2.1 Planta — Américas

| Marco | Leitura BudGanja |
|-------|------------------|
| **Género *Nicotiana*** | Solanácea americana — espécies cultivadas sobretudo *N. tabacum* e *N. rustica* |
| **Uso indígena** | Milénios nas Américas: ritual, medicina, oferta, fumo em cachimbo / charuto / folhas |
| **Pós-1492** | Columbian exchange: tabaco chega à Europa, África e Ásia; torna-se commodity colonial |
| **Nicot / nicotina** | Jean Nicot (séc. XVI) empresta o nome ao género / alcalóide — **etimologia científica europeia**, não origem da planta |

**H1:** o tabaco **nasce nas Américas**; a Europa inventa o comércio global e o nome químico, não a planta.

### 2.2 Vocábulo — *tabaco*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo corrente** | Do espanhol *tabaco* — via contacto caribenho / taíno (rolo, planta ou utensílio de fumo — hipóteses em disputa lexicográfica) | Média–alta (via esp.; detalhe taíno = debate) |
| **PT / BR** | *tabaco* — planta, folha seca, produto industrial, metonímia do fumo | Alta |
| **Não confundir** | *Tabaco* (planta/produto) ≠ *Cannabis* ([maconha](${maconha})) — espécies e histórias distintas, gestos de fumo por vezes partilhados | Alta |

**H2:** a palavra viaja com o **império e o comércio**; a planta já estava nas Américas.

## 3. Origem do papel de enrolar

### 3.1 Antes do «papel de marca»

| Prática | Leitura |
|---------|---------|
| **Folhas / palha / casca** | Envolver tabaco com o que houvesse (incluindo materiais vegetais locais) |
| **Recortes de papel** | Jornais, cartas, papel de embrulho — enrolar com sobra, não com produto dedicado |
| **Charuto / cachimbo** | Outras vias de fumo **sem** papel fino industrial |

**H3:** o gesto de enrolar **precedece** o papel de marca; o papel de marca **padroniza** o gesto.

### 3.2 Europa — genealogia do papel dedicado (marco Lacroix / Rizla)

| Marco (tradição pública da marca) | O que inspecionar |
|----------------------------------|-------------------|
| **Lore 1532 / 1660** | Família Lacroix (França) associada a papel feito **para** enrolar — datas de marketing misturam-se com história industrial |
| **1736** | Moinho próprio (François Lacroix) — marco mais sólido de empresa de papel |
| **1796 · Napoleão** | Licença para tropas — **contestada** por historiadores / museu de Angoulême (relato *The Economist*: possível «fantasia») |
| **1865–1886** | Papel de **arroz** (*riz*) + *La* + cruz (*Lacroix*) → marca **Rizla+** |
| **1942** | Patente da **goma** na borda — fecha o envelope com ofício industrial |
| **Outras geografias** | Espanha (*papel de liar*), Itália, etc. — indústria europeia de mortalhas, não monopólio de uma marca |

> **Ressalva:** a lenda de Pierre Lacroix em 1532 e Napoleão em 1796 circulam na comunicação da marca; o laboratório **regista** e **marca a dúvida** — ofício ≠ propaganda.

**H4:** o «papel de enrolar» como **produto** é sobretudo **europeu moderno** (papel fino + goma); o tabaco que ele envolve é **americano antigo**.

## 4. Onde as duas origens se encontram

| Elemento | Origem dominante | Ofício BudGanja |
|----------|------------------|-----------------|
| Folha de tabaco | Américas | Nomear planta ≠ produto ≠ fumo |
| Papel fino + goma | Europa industrial | Nomear utensílio ≠ endossar combustão |
| Gesto de enrolar | Cruza os dois | [Gesto](${gesto}) com [risco](${risco}) e [fogo](${fogo}) |
| Cinza | Depois do fogo | [Cinzeiro](${cinzeiro}) — contenção |
| Cannabis no mesmo papel | Outra planta ([maconha](${maconha})) | Não confundir espécies; mesmo utensílio possível |

## 5. Tese cultural BudGanja

| Imagem | Tradução editorial |
|--------|-------------------|
| Tabaco americano | Planta do Novo Mundo — uso indígena antes do cigarro industrial |
| Papel europeu | Padronização do envelope — arroz, seda, goma |
| «Matar no nome» do costume | Fumo normalizado ≠ isento de [risco](${risco}) / [proibição](${proibicao}) seletiva |
| Fundação discreta | Como em [O Início](${oInicio}): o que envolve (papel) e o que se cultiva (folha) têm **histórias** — inspecionar as duas |

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Cinzeiro](${cinzeiro}) · [fogo](${fogo}) · [gesto](${gesto}) | Depois e durante o fumo |
| [Maconha](${maconha}) · [Cannabis](${cannabis}) | Outra folha — não misturar genealogias |
| [Proibição](${proibicao}) · [risco](${risco}) | Listas e danos — método, não moralismo vazio |
| [Objetos](${objetos}) | Papel como objecto / utensílio |
| [Faça o melhor!](${mantra}) · [poema](${poemMantra}) | Ofício sem romantizar brasa |

## 7. Faça o melhor!

Não pedimos permissão para **inspecionar origens**.  
Pedimos ofício: separar planta americana de papel europeu,  
nomear [risco](${risco}) sem confundir com [maconha](${maconha}),  
e não deixar a cinza sem [cinzeiro](${cinzeiro}).

**Faça o melhor!** — o melhor possível **nesta ficha de origem**, hoje.

## 8. Status

**Aprovado** — dupla origem fichada: **tabaco** (Américas) × **papel de enrolar** (Europa industrial / mortalha); elos cinzeiro–fogo–gesto–cannabis–proibição.

[▶ Cinzeiro](${cinzeiro}) · [▶ Maconha](${maconha}) · [▶ Fogo](${fogo}) · [▶ Faça o melhor!](${mantra}) · [▶ Palavras](${hub})
`;

  const contentEn = `## Scope

Editorial inspection of **rolling paper** × **tobacco** — **origin of the paper** and **origin of tobacco**. Two genealogies that meet only in the **rolling gesture**: an American plant and European (then global) thin paper. Links [cinzeiro](${cinzeiro}), [fogo](${fogo}), [gesto](${gesto}), [risco](${risco}), [maconha](${maconha}).

> Method note: [Tobacco](${wikiTobacco}), [Nicotiana](${wikiNicotiana}), [Rolling paper](${wikiPapel}), [Rizla](${wikiRizla}). Naming origins ≠ endorsing smoking. Brand lore (Rizla/Napoleon) is recorded **with caveats**.

## Tobacco origin

- ***Nicotiana*** — American solanaceous genus; indigenous use for millennia.  
- Post-1492 global commodity; *nicotine* / *Nicotiana* named after Jean Nicot (16th c.) — European label, not plant origin.  
- PT/ES *tabaco* via Spanish contact (Caribbean/Taíno hypotheses debated).

## Rolling-paper origin

- Before brands: husks, scraps, newspaper.  
- Lacroix / **Rizla+** (*riz* + *La* + cross): rice paper 1865–1886; gum edge 1942.  
- Napoleon licence story **contested**. Spain *papel de liar* and other EU industries.

## Thesis

Tobacco = **American plant**. Dedicated rolling paper = **modern European product**. The lab inspects both without selling smoke.

## Status

**Approved** — dual origin sheet.

[▶ Cinzeiro](${cinzeiro}) · [▶ Maconha](${maconha}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **papel de liar** × **tabaco** — **origen del papel** y **origen del tabaco**. Dos genealogías que se encuentran en el **gesto de liar**: planta americana y papel fino europeo. Vínculos [cinzeiro](${cinzeiro}), [fogo](${fogo}), [gesto](${gesto}), [risco](${risco}), [maconha](${maconha}).

> Nota: [Tabaco](${wikiTabaco}), [Nicotiana](${wikiNicotiana}), [Rolling paper](${wikiPapel}), [Rizla](${wikiRizla}). Nombrar orígenes ≠ promover fumar. Lore de marca (Rizla/Napoleón) con **salvedades**.

## Origen del tabaco

- ***Nicotiana*** — género americano; uso indígena milenario.  
- Tras 1492, mercancía global; nicotina / *Nicotiana* por Jean Nicot — etiqueta europea.  
- *Tabaco* vía español (hipótesis taínas en debate).

## Origen del papel de liar

- Antes: hojas, recortes, periódico.  
- Lacroix / **Rizla+**: papel de arroz 1865–1886; goma 1942.  
- Historia de Napoleón **discutida**. España *papel de liar* y otras industrias.

## Tesis

Tabaco = **planta americana**. Papel de liar dedicado = **producto europeo moderno**. El lab inspecciona ambos sin vender humo.

## Estado

**Aprobada** — ficha de doble origen.

[▶ Cinzeiro](${cinzeiro}) · [▶ Maconha](${maconha}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wikiTabaco };
}

function buildPapelEnrolarTabacoPost(seriesOrder) {
  const { body, contentEn, contentEs, wikiTabaco } = buildPapelEnrolarTabacoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 114;
  return makePalavra({
    title:
      'Inspeção: Papel de enrolar e tabaco — origem do papel e origem da planta',
    titleEn:
      'Inspection: Rolling paper and tobacco — origin of the paper and of the plant',
    titleEs:
      'Inspección: Papel de liar y tabaco — origen del papel y de la planta',
    excerpt:
      'Palavras: papel de enrolar × tabaco — planta americana e mortalha europeia; elos cinzeiro, fogo, maconha; Faça o melhor!',
    excerptEn:
      'Words: rolling paper × tobacco — American plant and European paper; links cinzeiro, fogo, maconha; Do your best!',
    excerptEs:
      'Palabras: papel de liar × tabaco — planta americana y papel europeo; vínculos cinzeiro, fogo, maconha; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-papel-enrolar-tabaco',
    date: '2026-08-04T20:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Papel de enrolar · tabaco · palavra',
    coverImage: '/imagens/inspecoes/papel-enrolar-tabaco-cover.jpg',
    sourceUrl: wikiTabaco,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPapelEnrolarTabacoPost,
  buildPapelEnrolarTabacoBodies
};
