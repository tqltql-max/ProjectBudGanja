'use strict';

/**
 * Inspeção Palavras · sucção
 * Eixos: lat. suctio ← sugere · puxar líquido ·
 * ≠ açúcar · primo suco (sucus) · elo sangue / sanguessuga ·
 * gatilho sucçao · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/succao-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/suc%C3%A7%C3%A3o';
const WIKT_SUGERE = 'https://en.wiktionary.org/wiki/sugo#Latin';
const WIKT_SUCUS = 'https://en.wiktionary.org/wiki/sucus#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildSuccaoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-succao.html';
  const sangue = '/posts/post-inspecao-palavra-sangue.html';
  const nectar = '/posts/post-inspecao-palavra-nectar.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[sucção](${self})** — o **gesto de puxar** líquido ou ar. Pedido de campo: *inspeção sucçao*. Par de ofício: **[sangue](${sangue})** — encontram-se na *sanguessuga* (*sangue* + *sugar*), não num só étimo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sucção](${WIKT}), lat. [*sūgō*](${WIKT_SUGERE}), [*sūcus*](${WIKT_SUCUS}). **Ficha ≠ manual de aspiração, ≠ amamentação, ≠ extração.** Série [Palavras](${hub}). Sem afiliação clínica.

**Gatilho:** *sucçao* / *succao* → **sucção**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sucção** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *suctio* ← *sūgere* / *sūgō* («chupar, puxar») — confiança: **alta** |
| Família | *sugar* (verbo) · *sugador* · *suctorial* · ing. *suction* / *suck* · esp. *succión* · fr. *succion* |
| Primo | *suco* ← lat. *sūcus* («sumo, seiva») — líquido **puxável**, não o gesto |
| Tipo BudGanja | Palavra — gesto de puxar × falso par açúcar |
| Não é | **açúcar** (ár. / skr. *śarkarā*) · [néctar](${nectar}) (o suco da flor, não o gesto) · bomba como receita |
| Elo sangue | [sangue](${sangue}) · *sanguessuga* |
| Elo flor | [néctar](${nectar}) · [abelha](${abelha}) (quem suga a flor) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **puxar para dentro**. A [abelha](${abelha}) suga [néctar](${nectar}); a sanguessuga suga [sangue](${sangue}); o laboratório **nomeia o gesto**, não ensina a fazê-lo.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **sucção** | «Coisa doce» (*açúcar*) | *sūgere* — **puxar** |
| **açúcar** | Mesma família | Árabe / sânscrito — **cristal da cana**; outro mapa |
| **suco** | O mesmo vocábulo | *sūcus* — o **líquido**; primo, não sinónimo do gesto |
| **[néctar](${nectar})** | O que se suga | O **sumo da flor**; a sucção é o **gesto** |
| **sanguessuga** | Só o animal | Composto: [sangue](${sangue}) + *sugar* |

**H1:** *sucção* < *suctio* < *sūgere* — puxar (alta).  
**H2:** *açúcar* **não** vem de *sūgere* — [a orelha cola](${orelhaCola}); o [étimo](${etimologia}) corta.  
**H3:** *suco* é primo (*sūcus*); o suco é o que pode ser sugado, não a sucção.  
**H4:** *sanguessuga* liga esta ficha à de [sangue](${sangue}) sem fundir fluido e gesto.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Gesto** | Puxar com boca, bomba, ventosa | Alta |
| **Física** | Pressão que aspira | Alta noutro mapa — citar, não calcular |
| **Ofício lab** | Nomear o [gesto](${gesto}) com [verdade](${verdade}); [risco](${risco}) se houver vácuo / ferida | Alta |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *sucção* de *açúcar*; cruzar [sangue](${sangue}) só no composto |
| Bom | Deixar o [néctar](${nectar}) ser o líquido e a sucção o acto |
| Mau | Instruir extração, amamentação ou aspiração clínica |
| Mau | Colar sucção em açúcar por semelhança de ouvido |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* sucção *hoje*: puxar o nome certo; o [sangue](${sangue}) fica na irmã.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Sangue](${sangue}) | Fluido; cruzam na sanguessuga |
| [Néctar](${nectar}) · [abelha](${abelha}) | Líquido da flor × quem suga |
| [Água](${agua}) · [risco](${risco}) | Outro líquido; cuidado com o vácuo |
| [Guia](${guia}) · [língua](${lingua}) · [Valeu !!!](${mantra}) | Solo e fecho |

## Limites

- Não é manual de bomba, ventosa ou amamentação.  
- Não funde sucção e açúcar.  
- *Sanguessuga* = elo; não é ficha de animal.

## Status

**Aprovado na série Palavras** — *sucção* fichada como *sūgere*; ≠ açúcar; [sangue](${sangue}) à parte; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sangue](${sangue}) · [▶ Néctar](${nectar}) · [▶ Valeu !!!](${mantra}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sucção** (“suction”) — the **gesture of drawing in**. Field request: *sucçao*. Pair: **[sangue](${sangue})**. They meet in *sanguessuga*, not in one etymon.

> **Method note:** [Wiktionary](${WIKT}), Lat. [*sūgō*](${WIKT_SUGERE}). **Not** a pump manual. **Trigger:** *sucçao* → **sucção**.

## Object

| Field | Value |
|-------|-------|
| Word | **sucção** |
| Etymon | Lat. *suctio* ← *sūgere* (“to suck, draw”) |
| Not | **açúcar** (Arabic/Sanskrit) · [nectar](${nectar}) (the liquid, not the gesture) |
| Cousin | *suco* ← *sūcus* (juice) |
| Date | ${inspected} |

The ear glues sucção to sugar; the etymon cuts. [Valeu !!!](${mantra})

## Status

**Approved in Words** — *sūgere*; blood on the sister sheet.

[▶ Words](${hub}) · [▶ Sangue](${sangue}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **sucção** — el **gesto de pujar**. Pedido: *sucçao*. Par: **[sangue](${sangue})**. Se encuentran en *sanguessuga*, no en un étimo.

> **Nota:** [Wikcionario](${WIKT}), lat. [*sūgō*](${WIKT_SUGERE}). **No** es manual de bomba. **Gatillo:** *sucçao* → **sucção**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sucção** |
| Étimo | Lat. *suctio* ← *sūgere* |
| No es | **açúcar** · [néctar](${nectar}) (el líquido, no el gesto) |
| Primo | *suco* ← *sūcus* |
| Fecha | ${inspected} |

El oído pega sucção a azúcar; el étimo corta. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *sūgere*; sangre en la ficha hermana.

[▶ Palabras](${hub}) · [▶ Sangue](${sangue}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildSuccaoPost() {
  const { body, contentEn, contentEs } = buildSuccaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-succao', 233);
  return makePalavra({
    title: 'Inspeção: Sucção — o gesto de puxar; ≠ açúcar; elo com sangue',
    titleEn: 'Inspection: Sucção — the gesture of drawing in; ≠ sugar; link to sangue',
    titleEs: 'Inspección: Sucção — el gesto de pujar; ≠ azúcar; vínculo con sangue',
    excerpt:
      'Palavras: sucção ← lat. suctio / sūgere — puxar; ≠ açúcar; primo suco; cruzamento com sangue na sanguessuga; Valeu !!!',
    excerptEn:
      'Words: sucção ← Lat. suctio / sūgere — to draw in; ≠ sugar; cousin suco; crosses sangue at the leech-word; Valeu !!!',
    excerptEs:
      'Palabras: sucção ← lat. suctio / sūgere — pujar; ≠ azúcar; primo suco; cruza sangue en la sanguijuela; ¡Valeu !!!',
    slug: 'inspecao-palavra-succao',
    date: '2026-08-22T18:16:00.000Z',
    seriesOrder,
    seriesLabel: 'Sucção · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildSuccaoPost, buildSuccaoBodies };
