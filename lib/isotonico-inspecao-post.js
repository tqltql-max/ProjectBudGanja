'use strict';

/**
 * Inspeção Palavras · isotônico
 * Isola a peça tônico: iso- (igual) + tônico (tónos / tensão).
 * Osmose · contração · bebida de gôndola. ≠ chá, sílaba, água tónica.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildIsotonicoBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-isotonico.html';
  const tonico = '/posts/post-inspecao-palavra-tonico.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const quina = '/posts/post-inspecao-planta-quina.html';
  const pfaffia = '/posts/post-inspecao-planta-pfaffia.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/isot%C3%B4nico';
  const wikiEn = 'https://en.wiktionary.org/wiki/isotonic';
  const wikiIso = 'https://en.wiktionary.org/wiki/%E1%BC%B4%CF%83%CE%BF%CF%82';

  const body = `## Escopo

Inspeção editorial da palavra **[isotônico](${self})** (grafia PT-PT *isotónico*; teclado vivo *isotonico*). Pedido de campo: **isolar o tônico**. A ficha **parte** a palavra em duas peças — **iso-** + **[tônico](${tonico})** — e recusa fundir o composto com o chá, a sílaba tônica ou a [água](${agua}) tónica.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · isotônico](${wiki}), [isotonic](${wikiEn}), [ἴσος](${wikiIso}), ficha-mãe [tônico](${tonico}). **Ficha ≠ receita de soro. Ficha ≠ marca de isotónico. Ficha ≠ protocolo de treino.** Sem afiliação comercial a bebidas desportivas.

## 1. Isolar o tônico

| Peça | Étimo | Ofício nesta palavra |
|------|-------|----------------------|
| **iso-** | Gr. *ísos* «igual, o mesmo» | **Igualdade de tensão** — o prefixo que trava o sentido |
| **[tônico](${tonico})** | Gr. *tónos* / lat. *tonus* «tensão, tom» | A **tensão** que se iguala — **não** a sílaba, **não** o chá, **não** o tom do glossário |
| **isotônico** | *iso-* + *tônico* | **Tensão igual** (a um referência: plasma, comprimento que muda, rótulo de gôndola) |

**Veredicto de isolamento:** o **tônico** de *isotônico* é o sentido **7 da ficha-mãe** (tonicidade / tónus) aplicado com **medida igual** — osmose ou músculo. Os outros oito ofícios de [tônico](${tonico}) **não entram** neste composto.

| O que o tônico **é** aqui | O que o tônico **não é** aqui |
|---------------------------|-------------------------------|
| Tensão osmótica (tónus da solução) | Sílaba tônica da [língua portuguesa](${lingua}) |
| Tónus muscular em movimento (contração isotónica) | Tom *tone* do glossário (aff / jesusudavi) |
| Rótulo de bebida que **diz** ter a mesma tensão que o plasma | Tônico vegetal ([Pfaffia](${pfaffia})) · água tónica ([quina](${quina})) |

## 2. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **isotônico** |
| Peças | **iso-** + **[tônico](${tonico})** |
| Irmãs de prefixo | *hipotônico* (tensão **menor**) · *hipertônico* (tensão **maior**) |
| Classe | Adjectivo (solução, contração) · substantivo informal (a bebida) |
| Étimo (trabalho) | Gr. *ísos* + *tónos* → EN *isotonic* → PT **isotônico** — confiança **alta** |
| Tipo BudGanja | Palavra — composto que isola a peça tônico |
| Elo mãe | [tônico](${tonico}) — mapa; aqui só a tensão igualada |
| Elo líquido | [água](${agua}) — o solvente; ≠ água tónica |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [Valeu !!!](${mantra}) |
| Fonte | [isotônico](${wiki}) · [ἴσος](${wikiIso}) |
| Data | ${inspected} |

## 3. Três ofícios do composto (não misturar)

| Ofício | Leitura lab | Bom × mau |
|--------|-------------|-----------|
| **1. Osmose / soro** | Solução com **a mesma** pressão osmótica que o plasma (ex.: NaCl 0,9 %) | Bom: literacia de tensão igual · Mau: beber qualquer coisa e chamar soro |
| **2. Músculo** | Contração **isotónica**: tónus ~ constante, comprimento **muda** (≠ isométrica, ≠ isocinética) | Bom: nomear o gesto · Mau: achar que a lata treina por ti |
| **3. Gôndola** | Bebida «isotónico» — eletrólitos + açúcar; o rótulo **promete** o ofício 1 | Bom: ler a etiqueta · Mau: marketing = fisiologia |

**H1:** *iso-* trava o [tônico](${tonico}) em **igualdade** — sem o prefixo, volta-se ao mapa aberto da ficha-mãe.  
**H2:** hipotônico / hipertônico são a **mesma peça tônico** com outro prefixo (menos / mais tensão).  
**H3:** a lata na prateleira é um **claim**; o soro 0,9 % é um **referente**. Inspecionar o rasto.

## 4. Hipo- e hiper- (a mesma peça)

| Forma | Prefixo | Tônico isolado | Uso típico |
|-------|---------|----------------|------------|
| **hipotônico** | *hipo-* «debaixo» | tensão **abaixo** da referência | Célula incha (água entra) · suco muito diluído |
| **[isotônico](${self})** | *iso-* «igual» | tensão **igual** | Célula estável · soro · (rótulo de) bebida |
| **hipertônico** | *hiper-* «acima» | tensão **acima** | Célula encolhe · água do mar · alguns géis |

**Veredicto de família:** três prefixos, **um tônico**. A ficha-mãe [tônico](${tonico}) guarda o étimo; esta ficha guarda o **igual**.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Bebida** | «Isotónico = energético / dá força» | Claim de **tensão igual** ao plasma — açúcar à parte |
| **Soro** | Qualquer sal no copo | Referente laboratorial (osmolaridade) |
| **Treino** | A lata substitui o [gesto](${gesto}) | Contração isotónica é **movimento com tónus** |
| **Peça tônico** | O mesmo que chá / sílaba / água tónica | Só tonicidade igualada — ver isolamento acima |

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Isolar a peça** | Não beber o acento nem o chá | Esta ficha → [tônico](${tonico}) |
| **Nomear igualdade** | Soro, célula, rótulo | *iso-* + tensão |
| **Ler o [risco](${risco})** | Açúcar, dose, hidratação real | [Verdade](${verdade}) na etiqueta |
| **Fechar** | Depois da lata / do soro | [Valeu !!!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[tônico](${tonico})** | Ficha-mãe — aqui só a peça de **tensão** |
| [água](${agua}) | Solvente; **não** água tónica |
| [quina](${quina}) | Água tónica (quinino) — **outro** composto |
| [Pfaffia](${pfaffia}) | Tônico vegetal — **não** entra em *iso-* |
| [língua portuguesa](${lingua}) | Sílaba tônica — **não** entra neste composto |
| [gesto](${gesto}) · [risco](${risco}) · [respeito](${respeito}) | Ofício e etiqueta |
| [Valeu !!!](${mantra}) · [Guia](${guia}) · [Vida](${vida}) | Fecho e índice |

## Limites

- Não é bula de soro fisiológico nem conselho de hidratação desportiva.  
- Não trata a marca da prateleira como prova de osmolaridade.  
- Não mistura *isotônico* com água tónica, chá tonificante ou sílaba tônica.  
- Grafia *isotonico* / *isotónico* / *isotônico* = o mesmo objecto.

## Veredicto

**Aprovado na série Palavras** — *isotônico* fichado como **iso- + tônico**: tensão **igual**; a peça [tônico](${tonico}) isolada (osmose / músculo / rótulo); hipotônico e hipertônico na mesma família; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tônico](${tonico}) · [▶ Água](${agua}) · [▶ Quina](${quina}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[isotônico](${self})** (*isotonic*). Field request: **isolate tônico**. Split **iso-** (Gr. *ísos*, equal) + **[tônico](${tonico})** (Gr. *tónos*, tension). Do **not** fuse with herbal tonic, stressed syllable, or tonic water.

> Independent audit. **Sheet ≠ saline recipe, sports-drink brand, or training protocol.**

## Isolate the piece

Here **tônico** is **equal tension** (osmosis or muscle). It is **not** syllable stress, glossary *tone*, [Pfaffia](${pfaffia}), or tonic water ([cinchona](${quina})).

## Object

| Field | Value |
|-------|-------|
| Word | **isotônico** |
| Pieces | **iso-** + **[tônico](${tonico})** |
| Sisters | hypotonic · hypertonic |
| Links | [tônico](${tonico}) · [água](${agua}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Three offices

1. **Osmosis / saline** — same osmotic pressure as plasma (e.g. 0.9% NaCl).  
2. **Muscle** — isotonic contraction: tension ~ constant, length changes.  
3. **Shelf** — drink labelled “isotonic”; a **claim**, not proof.

**Verdict:** *iso-* locks [tônico](${tonico}) to **equality**; [Valeu !!!](${mantra}) after the label.

[▶ Words](${hub}) · [▶ Tônico](${tonico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[isotônico](${self})** (*isotónico*). Pedido: **aislar el tônico**. Partir **iso-** (gr. *ísos*, igual) + **[tônico](${tonico})** (gr. *tónos*, tensión). **No** fusionar con tónico vegetal, sílaba tónica ni agua tónica.

> Auditoría independiente. **Ficha ≠ receta de suero, marca de bebida ni protocolo de entreno.**

## Aislar la pieza

Aquí **tônico** es **tensión igual** (ósmosis o músculo). **No** es acento, *tone* del glosario, [Pfaffia](${pfaffia}) ni agua tónica ([quina](${quina})).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **isotônico** |
| Piezas | **iso-** + **[tônico](${tonico})** |
| Hermanas | hipotónico · hipertónico |
| Vínculos | [tônico](${tonico}) · [água](${agua}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Tres oficios

1. **Ósmosis / suero** — misma presión osmótica que el plasma.  
2. **Músculo** — contracción isotónica: tónus ~ constante, longitud cambia.  
3. **Góndola** — bebida «isotónico»; un **claim**, no una prueba.

**Veredicto:** *iso-* fija [tônico](${tonico}) a la **igualdad**; [¡Valeu !!!](${mantra}) después de la etiqueta.

[▶ Palabras](${hub}) · [▶ Tônico](${tonico}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildIsotonicoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildIsotonicoBodies();
  let order = Number.isFinite(seriesOrder) ? seriesOrder : 135;
  if (!Number.isFinite(seriesOrder)) {
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find((p) => p.slug === 'inspecao-palavra-isotonico');
      if (existing && typeof existing.seriesOrder === 'number') {
        order = existing.seriesOrder;
      } else {
        const taken = new Set(
          posts
            .filter((p) => p.series === 'palavras-origem')
            .map((p) => p.seriesOrder)
            .filter((n) => typeof n === 'number')
        );
        while (taken.has(order) && order < 250) order += 1;
      }
    } catch (_) {
      /* keep 135 */
    }
  }

  return makePalavra({
    title: 'Inspeção: Isotônico — iso- + tônico, tensão igual',
    titleEn: 'Inspection: Isotônico — iso- + tônico, equal tension',
    titleEs: 'Inspección: Isotônico — iso- + tônico, tensión igual',
    excerpt:
      'Palavras: «isotônico» — isola o tônico (tónos); iso- = igual; osmose × músculo × gôndola; ≠ chá, sílaba, água tónica; Valeu !!!',
    excerptEn:
      'Words: “isotônico” — isolates tônico (tónos); iso- = equal; osmosis × muscle × shelf; ≠ herb, stress, tonic water; Valeu !!!',
    excerptEs:
      'Palabras: «isotônico» — aísla el tônico (tónos); iso- = igual; ósmosis × músculo × góndola; ≠ té, sílaba, agua tónica; ¡Valeu !!!',
    slug: 'inspecao-palavra-isotonico',
    date: '2026-08-20T22:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Isotônico · palavra',
    coverImage: '/imagens/inspecoes/isotonico-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIsotonicoPost,
  buildIsotonicoBodies
};
