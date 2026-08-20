'use strict';

/**
 * Inspeção Palavras · tônico / tônicos
 * Mapa de sentidos: sílaba tônica · tom do lab · planta · Ayurveda ·
 * crise tônico-clônica · música · músculo · cosmética · água tónica.
 * Étimo gr. tónos / lat. tonus. Ficha ≠ receita nem diagnóstico.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildTonicoBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubExpr = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-tonico.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const pqp = '/posts/post-inspecao-expressao-puta-que-pariu.html';
  const nsasj =
    '/posts/post-inspecao-expressao-nossa-senhora-ambulancia-sirene-jesus-cristo.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const pfaffia = '/posts/post-inspecao-planta-pfaffia.html';
  const unha = '/posts/post-inspecao-planta-unha-de-gato.html';
  const quina = '/posts/post-inspecao-planta-quina.html';
  const plantas = '/plantas/';
  const xiv = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const isotonico = '/posts/post-inspecao-palavra-isotonico.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const mocambique = '/posts/post-inspecao-palavra-mocambique.html';
  const isqueiroBic = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const wiki = 'https://pt.wiktionary.org/wiki/t%C3%B4nico';
  const wikiEn = 'https://en.wiktionary.org/wiki/tonic';
  const wikiTonos = 'https://en.wiktionary.org/wiki/%CF%84%CF%8C%CE%BD%CE%BF%CF%82';

  const body = `## Escopo

Inspeção editorial da palavra **[tônico](${self})** (plural **tônicos**; grafia PT-PT *tónico*; teclado vivo *tonico*). Pedido de campo: **tônicos da palavra** e **outros significados**. Um só étimo — grego *tónos* / latim *tonus* («tensão, tom, corda») — ramifica em **muitos ofícios**. Esta ficha **mapeia os sentidos sem os fundir**.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · tônico](${wiki}), [tonic](${wikiEn}), [τόνος](${wikiTonos}), série [Palavras](${hub}), catálogo [Plantas](${plantas}), [curso UNIFESP](${xiv}). **Ficha ≠ receita. Ficha ≠ diagnóstico clínico. Ficha ≠ aula de harmonia.** Sem afiliação a marcas de água tónica, cosmética ou suplementos.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **tônico** / **tônicos** |
| Grafias | *tónico* (PT-PT) · *tonico* (teclado sem acento) · EN *tonic* |
| Classe | Adjectivo e substantivo — homónimos de ofício, não de étimo |
| Étimo (trabalho) | Gr. [*tónos*](${tonos}) «tensão, tom, corda» → lat. *tonus* → PT **tônico** — confiança **alta** |
| Elo raiz | [tónos](${tonos}) — ficha da raiz grega (≠ este mapa PT) |
| Tipo BudGanja | Palavra — mapa de sentidos (não uma só coisa) |
| Elo língua | [língua portuguesa](${lingua}) — sílaba **tônica** |
| Elo tom do lab | [aff](${aff}) · [jesusudavi](${jesusudavi}) · [jesusamando](${jesusamando}) · [emoção](${emocao}) |
| Elo planta | [Pfaffia](${pfaffia}) · [unha-de-gato](${unha}) · [quina](${quina}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [Faça o melhor!](${mantra}) |
| Fonte | [tônico](${wiki}) · [τόνος](${wikiTonos}) |
| Data | ${inspected} |

**Objeto:** não é «o remédio que dá força». É o **vocábulo da tensão** — o que aperta, o que soa, o que sustenta, o que realça.

## 2. Mapa dos sentidos (não misturar)

| Sentido | O que é | O que **não** é | Elo |
|---------|---------|-----------------|-----|
| **1. Tônicos da palavra** | Sílaba **tônica** / acento tônico — o pico de força na boca | Não é «tom afectivo» nem planta | [língua portuguesa](${lingua}) |
| **2. Tom do lab** | Campo *tone* do glossário (caution, awe, warm, joy, truth, calm, hope, danger) | Não é sílaba; não é chá | [aff](${aff}) · [jesusudavi](${jesusudavi}) · [emoção](${emocao}) |
| **3. Tônico vegetal** | Preparação / tradição que «tonifica» (força, amargo, adaptógeno popular) | Não é evidência clínica automática | [Pfaffia](${pfaffia}) · [unha-de-gato](${unha}) · [quina](${quina}) |
| **4. Tônico ayurvédico** | No [XIV](${xiv}): fórmula em **geleia**, saborosa — *rasāyana* de ofício, não chá BR | Não é o mesmo que Pfaffia | aula Margarete Mota |
| **5. Tônico-clônico** | Tipo de **crise** (neurologia) — tensão + abalo | Não é elogio nem chá | [XIV](${xiv}) — literacia, **não** diagnóstico |
| **6. Tônica musical** | Grau I da escala — a **casa** harmónica | Não é sílaba; não é SAMU | [sinal](${sinal}) · pulso |
| **7. Tonicidade** | Tónus muscular / vascular — tensão de fundo do corpo | Não é «estar tónico» de marketing | corpo ≠ rótulo |
| **8. Tônico cosmética** | Loção (facial, capilar) — mercado de «tonificar a pele» | Não é fitoterapia de catálogo | hype × rasto |
| **9. Água tónica** | Bebida com quinino (amargo) — primo distante da [quina](${quina}) | Dose residual ≠ antimalárico | [quina](${quina}) |
| **Composto: [isotônico](${isotonico})** | *iso-* (igual) + **tônico** (tensão) — osmose / músculo / gôndola | Não é chá, sílaba nem água tónica | [isotônico](${isotonico}) |

**H1:** um étimo (*tónos*) — **nove ofícios** e compostos (*iso-* + tônico).  
**H2:** «tônicos da palavra» = **acento** (força na sílaba) **e**, no lab, **tom** (termómetro do glossário) — dois sentidos que se tocam sem ser o mesmo.  
**H3:** planta / Ayurveda / crise / música / músculo / cosmética / bebida ficam **ao lado**, com etiqueta, para ninguém beber a sílaba nem rezar a água tónica.

## 3. Tônicos da palavra (sentido 1)

Na [língua portuguesa](${lingua}), **sílaba tônica** é a que leva o **acento de intensidade** — o pico da palavra na boca.

| Peça | Leitura lab | Bom × mau |
|------|-------------|-----------|
| **Sílaba tônica** | Onde a palavra **aperta** | Bom: ouvir o pico · Mau: achar que o acento é doutrina |
| **Sílaba átona** | O que rodeia o pico | Bom: mapa · Mau: apagar o átono |
| **Acento gráfico** | Marca escrita (*tônico*) | Bom: âncora · Mau: *tonico* no teclado não muda o objecto |
| **Proparoxítona / paroxítona / oxítona** | Onde cai o tônico | Gramática de ofício — não é sermão |

**Veredicto linguístico:** *tônicos da palavra* = **onde a boca carrega**. Sem isso, a palavra escorrega.

## 4. Tom do lab (sentido 2 — irmão, não gémeo)

No glossário da Vida, cada ficha pode ter um **tônico afectivo** (*tone*): o termómetro com que a palavra entra no peito.

| Tone (lab) | Ofício | Exemplos já fichados |
|------------|--------|----------------------|
| **caution** | Cautela / enfado / ofício com ressalva | [aff](${aff}) · skill · buguei |
| **awe** | Assombro alto | [jesusudavi](${jesusudavi}) · [nossa senhora… sirene…](${nsasj}) |
| **warm** | Calor / bênção leve | [jesusamando](${jesusamando}) |
| **joy** | Celebração | deu certo, galera |
| **truth** | Compromisso de fala | eojsofaorforap |
| **calm** | Escuta / proporção | Deus deu dois ouvidos… |
| **hope** | Aurora / diligência | duasakdiqujdocedomadur |
| **danger** | Veneno / retaliação | vingança · veneno |

**Veredicto de tom:** o tônico **do lab** marca o **peito**; o tônico **da sílaba** marca a **boca**. Os dois são tensão (*tónos*). Não são a mesma ficha de uso.

Escala oral irmã (expressões): [aff](${aff}) ← [jesusamando](${jesusamando}) ← [jesusudavi](${jesusudavi}) ← [PQP](${pqp}) ← [código vermelho](${nsasj}).

## 5. Outros significados (3–9)

### Planta / fitoterapia popular

No catálogo, **tônico** é etiqueta de tradição («tonificante», amargo, adaptógeno popular) — não um ensaio clínico. Elos: [Pfaffia](${pfaffia}) (tag *tonico*), [unha-de-gato](${unha}), [quina](${quina}) (tônico amargo histórico). **Mau:** vender força sem rasto.

### Ayurveda ([XIV](${xiv}))

Na aula, **tônicos** aparecem como fórmulas em **geleia**, «o único remédio do Ayurveda que é gostoso». Ofício: *rasāyana* / reconstituição — **distinto** do chá de Pfaffia. Literacia de curso; **não** receita.

### Neurologia

**Crise tônico-clônica** (e tónica, atónica…) no [XIV](${xiv}): tensão + abalo. Palavra de **literacia médica**. **Ficha ≠ diagnóstico. Ficha ≠ conselho de crise.**

### Música

A **tônica** é o grau I — a casa a que a escala volta. Mesmo *tónos* (tensão da corda). Elo [sinal](${sinal}) / pulso; não confundir com sílaba nem com SAMU.

### Corpo, cosmética, bebida

| Uso | Nota lab |
|-----|----------|
| **Tonicidade** | Tónus de fundo — músculo, vaso |
| **Tônico facial / capilar** | Mercado; pedir rasto, não slogan |
| **Água tónica** | Quinino em dose de aperitivo — primo da [quina](${quina}), **não** o chá antimalárico |

## 6. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Uma palavra só** | «Tônico = remédio que dá força» | Nove ofícios com o mesmo *tónos* |
| **Tônicos da palavra** | Tom de voz / «ser tónico» | Sílaba de intensidade **e** (no lab) termómetro *tone* |
| **Planta tónica** | Cura portátil | Tradição + marketing; inspecionar o rasto |
| **Água tónica** | Remédio da quina | Bebida amarga; quinino residual |

**Veredicto contraste:** parece um elixir; é um **mapa de tensões**.

## 7. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Separar sentidos** | Não beber a sílaba nem diagnosticar o chá | Esta ficha |
| **Ouvir o pico** | Sílaba tônica | [língua portuguesa](${lingua}) |
| **Ler o peito** | Tom da fala | *tone* do glossário · [emoção](${emocao}) |
| **Honrar a planta** | Tradição tonificante com etiqueta | [Pfaffia](${pfaffia}) · [Plantas](${plantas}) |
| **Fechar com ofício** | Depois do mapa | [gesto](${gesto}) · [Faça o melhor!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| [língua portuguesa](${lingua}) | Solo da sílaba tônica |
| [aff](${aff}) · [jesusudavi](${jesusudavi}) · [jesusamando](${jesusamando}) | Tônicos afectivos (tom do lab) |
| [emoção](${emocao}) · [fogo](${fogo}) | Intensidade no peito |
| [Pfaffia](${pfaffia}) · [unha-de-gato](${unha}) · [quina](${quina}) | Tônico vegetal / amargo |
| [curso UNIFESP](${xiv}) | Ayurveda (geleia) e crises tônico-clónicas — literacia |
| [tónos](${tonos}) | Raiz grega — ficha própria; aqui só o mapa PT |
| [isotônico](${isotonico}) | Composto — isola a peça tônico (tensão igual) |
| [Moçambique](${mocambique}) · [isqueiro BIC](${isqueiroBic}) | *tónos* da sílaba **BI** × tensão do polegar; lapso *esqueiro biq* |
| [sinal](${sinal}) | Alarme / pulso — outro *tónos* |
| [respeito](${respeito}) · [verdade](${verdade}) | Não fundir ofícios |
| [Faça o melhor!](${mantra}) | Depois do mapa — trabalhar |
| [Guia de palavras](${guia}) · [Vida](${vida}) | Índice e peito |

## Limites

- Não é gramática normativa completa (oxítonas, etc.) — mapa de ofício.  
- Não é protocolo clínico nem receita ayurvédica / de chá.  
- Não mistura crise tônico-clónica com «ficar tónico».  
- Não vende água tónica como quinino terapêutico.  
- Grafia *tonico* / *tónico* / *tônico* = o mesmo objecto.

## Veredicto

**Aprovado na série Palavras** — *tônico* fichado como **mapa de sentidos** a partir de *tónos*; **tônicos da palavra** = sílaba + tom do lab; os outros ofícios (planta, Ayurveda, crise, música, músculo, cosmética, bebida) ficam etiquetados; fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tónos](${tonos}) · [▶ Expressões](${hubExpr}) · [▶ Língua portuguesa](${lingua}) · [▶ Isotônico](${isotonico}) · [▶ Pfaffia](${pfaffia}) · [▶ Aff](${aff}) · [▶ jesusudavi](${jesusudavi}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[tônico](${self})** / **tônicos** (EN *tonic*). One etymon — Gr. *tónos* / Lat. *tonus* (“tension, pitch, string”) — many offices. Field request: **tones of the word** and **other meanings**. Map them; **do not** fuse them.

> Independent audit. **Sheet ≠ recipe, diagnosis, or music lesson.**

## Object

| Field | Value |
|-------|-------|
| Word | **tônico** / **tônicos** |
| Etymon | Gr. [*tónos*](${tonos}) → Lat. *tonus* — **high** confidence |
| Links | [tónos](${tonos}) · [Portuguese](${lingua}) · [Pfaffia](${pfaffia}) · [isotônico](${isotonico}) · [aff](${aff}) · [jesusudavi](${jesusudavi}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Meanings (keep apart)

1. **Word stress** — tonic syllable / intensity peak in the mouth.  
2. **Lab tone** — glossary *tone* (caution, awe, warm, joy, truth, calm, hope, danger).  
3. **Herbal tonic** — popular “tonifying” tradition ([Pfaffia](${pfaffia}), [cat’s claw](${unha}), [cinchona](${quina})).  
4. **Ayurvedic tonic** — jelly *rasāyana* in [UNIFESP XIV](${xiv}), not a BR tea.  
5. **Tonic-clonic** — seizure type; literacy, **not** diagnosis.  
6. **Musical tonic** — scale degree I.  
7. **Muscle tone** — background tension.  
8. **Cosmetic tonic** — market lotion.  
9. **Tonic water** — quinine aperitif ≠ antimalarial bark tea.

**Verdict:** one *tónos*, nine offices; [Do your best!](${mantra}) after the map.

[▶ Words](${hub}) · [▶ Tónos](${tonos}) · [▶ Portuguese](${lingua}) · [▶ Pfaffia](${pfaffia}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[tônico](${self})** / **tônicos** (ES *tónico*). Un étimo — gr. *tónos* / lat. *tonus* («tensión, tono, cuerda») — muchos oficios. Pedido: **tónicos de la palabra** y **otros significados**. Mapear; **no** fusionar.

> Auditoría independiente. **Ficha ≠ receta, diagnóstico ni clase de armonía.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **tônico** / **tônicos** |
| Étimo | Gr. [*tónos*](${tonos}) → lat. *tonus* — confianza **alta** |
| Vínculos | [tónos](${tonos}) · [portugués](${lingua}) · [Pfaffia](${pfaffia}) · [isotônico](${isotonico}) · [aff](${aff}) · [jesusudavi](${jesusudavi}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Significados (separar)

1. **Acento** — sílaba tónica / pico de intensidad en la boca.  
2. **Tono del lab** — *tone* del glosario (caution, awe, warm…).  
3. **Tónico vegetal** — tradición tonificante ([Pfaffia](${pfaffia}), [uña de gato](${unha}), [quina](${quina})).  
4. **Tónico ayurvédico** — jalea en el [XIV](${xiv}), no el té BR.  
5. **Tónico-clónico** — tipo de crisis; literacia, **no** diagnóstico.  
6. **Tónica musical** — grado I.  
7. **Tonicidad** — tensión de fondo del músculo.  
8. **Tónico cosmética** — loción de mercado.  
9. **Agua tónica** — quinina de aperitivo ≠ té antimalárico.

**Veredicto:** un *tónos*, nueve oficios; [¡Haz lo mejor!](${mantra}) después del mapa.

[▶ Palabras](${hub}) · [▶ Tónos](${tonos}) · [▶ Portugués](${lingua}) · [▶ Pfaffia](${pfaffia}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildTonicoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildTonicoBodies();
  let order = Number.isFinite(seriesOrder) ? seriesOrder : 140;
  if (!Number.isFinite(seriesOrder)) {
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find((p) => p.slug === 'inspecao-palavra-tonico');
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
      /* keep 140 */
    }
  }

  return makePalavra({
    title:
      'Inspeção: Tônico — tônicos da palavra e os outros sentidos de tónos',
    titleEn:
      'Inspection: Tônico — word stress, lab tone, and the other senses of tónos',
    titleEs:
      'Inspección: Tônico — tónicos de la palabra y los otros sentidos de tónos',
    excerpt:
      'Palavras: «tônico» (gr. tónos) — sílaba tônica × tom do lab × planta × Ayurveda × crise × música × músculo × cosmética × água tónica; Faça o melhor!',
    excerptEn:
      'Words: “tônico” (Gr. tónos) — stress × lab tone × herb × Ayurveda × seizure × music × muscle × cosmetic × tonic water; Do your best!',
    excerptEs:
      'Palabras: «tônico» (gr. tónos) — sílaba × tono lab × planta × Ayurveda × crisis × música × músculo × cosmética × agua tónica; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tonico',
    date: '2026-08-20T21:50:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Tônico · palavra',
    coverImage: '/imagens/inspecoes/tonico-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTonicoPost,
  buildTonicoBodies
};
