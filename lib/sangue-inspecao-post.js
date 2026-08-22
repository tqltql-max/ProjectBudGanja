'use strict';

/**
 * Inspeção Palavras · sangue
 * Eixos: lat. sanguis · fluido × linhagem × temperamento ·
 * sangria (bebida ≠ sangria clínica) · elo sucção / sanguessuga ·
 * Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/sangue-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/sangue';
const WIKT_LA = 'https://en.wiktionary.org/wiki/sanguis#Latin';

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

function buildSangueBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-sangue.html';
  const succao = '/posts/post-inspecao-palavra-succao.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const nectar = '/posts/post-inspecao-palavra-nectar.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[sangue](${self})** — o **fluido** da [vida](${vida}), a **linhagem** (*consanguíneo*) e o **temperamento** («sangue quente»). Pedido de campo: *inspeção palavra sangue*. Par de ofício: **[sucção](${succao})** — encontram-se na *sanguessuga*, não num só sopro.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sangue](${WIKT}), lat. [*sanguis*](${WIKT_LA}). **Ficha ≠ protocolo clínico, ≠ guia de colheita, ≠ tratado de vampiro.** Série [Palavras](${hub}). Sem afiliação médica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sangue** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | lat. *sanguis*, *sanguinis* — confiança: **alta** |
| Família | *sangrar* · *sangria* · *sanguinário* · *consanguíneo* · *exsanguinar* · *sanguessuga* · esp. *sangre* · fr. *sang* · ing. *sanguine* |
| Tipo BudGanja | Palavra — fluido × parentesco × figura |
| Não é | [água](${agua}) · [néctar](${nectar}) · laudo · tipo sanguíneo como ranking moral |
| Elo corpo | [coração](${coracao}) (bombeia) · [vida](${vida}) · [alma](${alma}) · [curar](${curar}) · [risco](${risco}) |
| Elo sucção | [sucção](${succao}) · *sanguessuga* (sangue + *sugar*) |
| Fonte | [Wikcionário](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo latino que o português herdou para o **líquido vermelho da vida** — e, por figura, a família e o génio.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **sangue** | Só o fluido clínico | *sanguis* — fluido **e** linhagem **e** temperamento |
| **sangria** | Sempre a bebida | Também a **sangria** antiga (tirar sangue) — dois ofícios, um étimo |
| **sanguessuga** | «Só o bicho» | Composto: [sangue](${self}) + *sugar* → elo com [sucção](${succao}) |
| **sanguíneo / *sanguine*** | Sinónimo de sangue | Em EN, *sanguine* virou **optimista** (humores) — outro mapa |
| **[água](${agua})** | Outro suco do corpo | Outro étimo (*aqua*); não substitui o sangue |

**H1:** *sangue* < *sanguis* — fluido da [vida](${vida}) (alta).  
**H2:** a figura de **parentesco** (*consanguíneo*) é expansão estável, não metáfora oca.  
**H3:** [a orelha cola](${orelhaCola}) *sangria* na taça; o [étimo](${etimologia}) lembra o verbo *sangrar*.  
**H4:** *sanguessuga* aponta [sucção](${succao}) — duas fichas, um composto.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Fluido** | O que o [coração](${coracao}) move | Alta |
| **Linhagem** | «Do mesmo sangue» — parentesco | Alta |
| **Temperamento** | Sangue quente / frio — figura de génio | Alta (uso vivo) |
| **Rito / figura** | Sangue como gravidade (pacto, preço) | Média — citar, não cultuar |
| **Lab** | Nomear com [respeito](${respeito}); [risco](${risco}) quando há ferida | Alta (ofício) |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Distinguir fluido, família e figura |
| Bom | Cruzar [sucção](${succao}) só no composto *sanguessuga* — não fundir os étimos |
| Mau | Receita de sangria clínica ou de copo como se fossem a ficha |
| Mau | Tipo sanguíneo como destino moral |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *deste* sangue *hoje*: a [vida](${vida}) que circula; a sucção fica na [irmã](${succao}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Sucção](${succao}) | O gesto de puxar — distinto; cruzam na sanguessuga |
| [Coração](${coracao}) · [vida](${vida}) · [alma](${alma}) | Casa do fluido |
| [Curar](${curar}) · [risco](${risco}) | Ofício e ferida |
| [Água](${agua}) · [néctar](${nectar}) | Outros líquidos — outros étimos |
| [Língua](${lingua}) · [Guia](${guia}) · [Valeu !!!](${mantra}) | Solo e fecho |

## Limites

- Não ensina a tirar sangue nem a estancá-lo.  
- Não é carta de tipos ABO.  
- *Sanguessuga* entra como **elo lexical**, não como ficha de animal.

## Status

**Aprovado na série Palavras** — *sangue* fichado como *sanguis*; [sucção](${succao}) à parte; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sucção](${succao}) · [▶ Coração](${coracao}) · [▶ Valeu !!!](${mantra}) · [Wikcionário](${WIKT})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sangue** (“blood”) — the **fluid** of [life](${vida}), **lineage**, and **temper**. Pair: **[sucção](${succao})**. They meet in *sanguessuga* (blood + to suck), not in one breath.

> **Method note:** [Wiktionary](${WIKT}), Lat. [*sanguis*](${WIKT_LA}). **Not** a clinical protocol.

## Object

| Field | Value |
|-------|-------|
| Word | **sangue** |
| Etymon | Lat. *sanguis* |
| Not | [water](${agua}) · a lab report · blood type as moral rank |
| Links | [heart](${coracao}) · [sucção](${succao}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

*Sangria* is both the drink and the old letting of blood. [Valeu !!!](${mantra})

## Status

**Approved in Words** — *sanguis*; suction on the sister sheet.

[▶ Words](${hub}) · [▶ Sucção](${succao}) · [Wiktionary](${WIKT})
`;

  const contentEs = `## Alcance

Inspección de **sangue** — el **fluido** de la [vida](${vida}), el **linaje** y el **temperamento**. Par: **[sucção](${succao})**. Se encuentran en *sanguessuga*, no en un solo soplo.

> **Nota:** [Wikcionario](${WIKT}), lat. [*sanguis*](${WIKT_LA}). **No** es protocolo clínico.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sangue** |
| Étimo | Lat. *sanguis* |
| No es | [agua](${agua}) · laudo · tipo sanguíneo como rango moral |
| Vínculos | [corazón](${coracao}) · [sucção](${succao}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

*Sangria* es la bebida y la sangría antigua. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *sanguis*; succión en la ficha hermana.

[▶ Palabras](${hub}) · [▶ Sucção](${succao}) · [Wikcionario](${WIKT})
`;

  return { body, contentEn, contentEs };
}

function buildSanguePost() {
  const { body, contentEn, contentEs } = buildSangueBodies();
  const seriesOrder = pickOrder('inspecao-palavra-sangue', 232);
  return makePalavra({
    title: 'Inspeção: Sangue — o fluido, a linhagem, e o elo com sucção',
    titleEn: 'Inspection: Sangue — the fluid, the lineage, and the link to sucção',
    titleEs: 'Inspección: Sangue — el fluido, el linaje y el vínculo con sucção',
    excerpt:
      'Palavras: sangue ← lat. sanguis — fluido da vida, parentesco e génio; ≠ água; cruzamento com sucção na sanguessuga; Valeu !!!',
    excerptEn:
      'Words: sangue ← Lat. sanguis — fluid of life, kinship and temper; ≠ water; crosses sucção at the leech-word; Valeu !!!',
    excerptEs:
      'Palabras: sangue ← lat. sanguis — fluido de la vida, parentesco y genio; ≠ agua; cruza sucção en la sanguijuela; ¡Valeu !!!',
    slug: 'inspecao-palavra-sangue',
    date: '2026-08-22T18:15:00.000Z',
    seriesOrder,
    seriesLabel: 'Sangue · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildSanguePost, buildSangueBodies };
