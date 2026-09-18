'use strict';

/**
 * Inspeção Palavras · craque
 * Eixos: EN crack «excelente» → PT craque (jogador) ·
 * EN crack (fenda / estalo / droga) → PT crack ·
 * a orelha cola craque no crack · pedra mineral (πέτρα) × pedra-gíria ·
 * Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/craque-palavra-cover.jpg';
const WIKT_CRAQUE = 'https://pt.wiktionary.org/wiki/craque';
const WIKT_CRACK_PT = 'https://pt.wiktionary.org/wiki/crack';
const WIKT_CRACK_EN = 'https://en.wiktionary.org/wiki/crack';

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

function buildCraqueBodies() {
  const inspected = '2026-09-17';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-craque.html';
  const pedra = '/posts/post-inspecao-palavra-pedra.html';
  const gesso = '/posts/post-inspecao-palavra-gesso.html';
  const droga = '/posts/post-inspecao-palavra-droga.html';
  const estupe = '/posts/post-inspecao-palavra-estupefaciente.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const nappo = '/posts/post-inspecao-solange-nappo.html';
  const cebrid = '/posts/post-inspecao-cebrid.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[craque](${self})** — pedido de campo: relacionar com **[pedra](${pedra})** e com **crack** (droga). Um inglês, **três cortes** no português: o **craque** do campo; o **crack** da lista; a **pedra** que a gíria pega emprestada ao mineral.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · craque](${WIKT_CRAQUE}), [crack (PT)](${WIKT_CRACK_PT}), [crack (EN)](${WIKT_CRACK_EN}). **Ficha ≠ manual de fabrico, ≠ protocolo de uso, ≠ receita de redução de danos.** Série [Palavras](${hub}). Sem afiliação policial, clínica ou comercial. O ofício é **nomear camadas** e **não fundi-las**.

**Gatilho:** *craq* / *krack* / *crak* / *craque* (droga) → cortar **craque** (jogador) × **crack** (empréstimo da substância) × **[pedra](${pedra})** (πέτρα × gíria).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **craque** (pl. *craques*) — e o empréstimo **crack** |
| Classe | Substantivo masculino (*o craque*; *o crack*) |
| Étimo (craque / jogador) | ing. *crack* adj. «de primeira, especialista» (*crack shot*) → PT *craque* — confiança: **alta** |
| Étimo (crack / droga) | ing. *crack* (fenda, estalo; anos 1980 EUA: cocaína-base fumada) → PT *crack* — confiança: **alta** no empréstimo; **média** no motivo exacto do baptismo (estalido × aspecto de pedra) |
| Família (inglês) | *to crack* · *crack shot* · *crackdown* · *crack cocaine* |
| Tipo BudGanja | Palavra — homofonia BR × gíria × mineral |
| Não é | **[pedra](${pedra})** mineral (gr. *πέτρα*) · **[maconha](${maconha})** / cannabis · folha de coca · cocaína em pó · manual de síntese |
| Elo método | [etimologia](${etimologia}) · [a orelha cola…](${orelhaCola}) · [gíria](${giria}) · [língua portuguesa](${lingua}) |
| Elo mapa | [droga](${droga}) · [estupefaciente](${estupe}) · [risco](${risco}) · [proibição](${proibicao}) · [Nappo](${nappo}) / [CEBRID](${cebrid}) |
| Fonte | [Wikcionário · craque](${WIKT_CRAQUE}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo BR **craque** (estrela de ofício, sobretudo futebol) **e** o inglês **crack** que no Brasil nomeia uma **preparação de cocaína**. A [orelha cola](${orelhaCola}) os dois; o [étimo](${etimologia}) e a **grafia** tentam cortar. A [pedra](${pedra}) entra como **metáfora de dureza** na gíria (*pedra de crack*), não como irmã latina de *craque*.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **craque** | Qualquer «crack» inglês | PT: jogador / perito — calque do *crack* «excelente» |
| **crack** (PT) | Erro de *craque* | Empréstimo da **substância** (cocaína-base); grafia inglesa conservada |
| **craque** escrito para a droga | «É a mesma palavra» | Cola de orelha / ortografia popular — **não** unifica os ofícios |
| **[pedra](${pedra})** | O crack *é* pedra | Mineral *πέτρα* **ou** gíria do **fragmento** da substância — dois mapas |
| **pedra de crack** | Nome químico | Locução de rua: o **naco** duro; cita [pedra](${pedra}) sem virar geologia |
| **coca / cocaína** | Sinónimos do crack | Folha andina / alcalóide isolado (Niemann, 1860) / **base fumada** — três objectos |
| **[maconha](${maconha})** | «Outra droga, mesma ficha» | Outra planta, outro léxico; o laboratório **não** funde cannabis com crack |

**H1:** *craque* (jogador) < ing. *crack* «de primeira» — alta.  
**H2:** *crack* (droga) < ing. *crack* (som / fenda / *crack cocaine*, séc. XX) — alta no empréstimo; a ficha **não** ensina o processo.  
**H3:** [a orelha cola](${orelhaCola}) *craque* em *crack*; o português culto **corta na letra** (*craque* ≠ *crack*).  
**H4:** [pedra](${pedra}) mineral é *πέτρα*; *pedra* de gíria é **figura** do naco — irmã de *crack*, **não** de Pedro/perdão.

## Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ofício / desporto** | *Craque* = quem manda no jogo; figura de excelência | Alta |
| **Inglês amplo** | *Crack* = fenda, estalo, graça, *crack of dawn* | Alta noutro mapa |
| **Substância (BR)** | *Crack* = cocaína-base fumada; gíria **pedra** | Alta (vocabulário público); **zero** receita nesta página |
| **Ortografia** | Escrever *craque* para a droga = cola; escrever *crack* para o jogador = anglicismo | Alta (uso) |
| **Saúde colectiva** | Dependência, território, estigma — eixo [Nappo](${nappo}) / [CEBRID](${cebrid}) | Alta no **elo**; esta ficha não substitui estudo nem clínica |
| **[Droga](${droga})** | *Phármakon* × ilícito — o crack cai no polo de [risco](${risco}) e lista, não no de Farmácia Viva | Alta no contraste |

## Craque × crack × pedra

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **[craque](${self})** | Esta ficha — o vocábulo BR do perito | Excelência; **não** a substância |
| **crack** | Empréstimo EN da preparação de cocaína | Grafia que o laboratório **conserva** para cortar a cola |
| **[pedra](${pedra})** | Mineral *πέτρα* · locuções · gíria indexada | Gíria aponta para **aqui**; mineral fica na irmã |
| **[gesso](${gesso})** | Sulfato / molde | Outra pedra de ofício; **não** entra no crack |
| **[droga](${droga})** | Palavra guarda-chuva | Meta-rótulo; não apaga craque nem pedra |

## Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Cortar *craque* (jogador) × *crack* (substância) × *pedra* (*πέτρα* × gíria) |
| Bom | Mandar pesquisa qualitativa e prevenção para [Nappo](${nappo}) / [CEBRID](${cebrid}) |
| Bom | Contrastar com [maconha](${maconha}): outro reino botânico |
| Mau | Fundir o 10 da camisola com a pedra da gíria porque a boca soa igual |
| Mau | Descrever fabrico, corte, cachimbo ou dose — **fora do ofício Palavras** |
| Mau | Usar *pedra* mineral como eufemismo da substância sem o corte |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *hoje*: o **craque** é excelência emprestada do inglês; o **crack** é outro empréstimo, de [risco](${risco}); a **[pedra](${pedra})** ou é terra dura ou é gíria — nunca as duas no mesmo sopro sem o corte.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Pedra](${pedra}) | Mineral *πέτρα*; gíria *pedra* aponta para esta ficha |
| [Gíria](${giria}) · [orelha cola…](${orelhaCola}) | Método do corte sonoro |
| [Droga](${droga}) · [estupefaciente](${estupe}) · [proibição](${proibicao}) | Rótulos institucionais |
| [Risco](${risco}) · [respeito](${respeito}) · [verdade](${verdade}) | Nomear sem receita nem estigma vazio |
| [Maconha](${maconha}) | Outra planta — não fundir |
| [Solange Nappo](${nappo}) · [CEBRID](${cebrid}) | Pesquisa pública (crack / cocaína / cannabis) |
| [Valeu !!!](${mantra}) | Depois do corte |

## Limites

- Não ensina obtenção, adulteração nem consumo.  
- Não é protocolo clínico, jurídico ou policial.  
- *Craque* (jogador) e *crack* (substância) ficam **cortados nesta ficha**; *pedra* mineral vive na [irmã](${pedra}).  
- Folha de coca e cocaína isolada **não** ganham ficha aqui — só o corte lexical.

## Status

**Aprovado na série Palavras** — *craque* fichado como calque de excelência; *crack* como empréstimo da substância; [pedra](${pedra}) mineral × gíria; [a orelha cola](${orelhaCola}); o étimo e a grafia cortam.

[▶ Palavras](${hub}) · [▶ Pedra](${pedra}) · [▶ Droga](${droga}) · [▶ Nappo](${nappo}) · [▶ Guia](${guia}) · [Wikcionário](${WIKT_CRAQUE})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **craque** — field request: relate it to **[pedra](${pedra})** and to **crack** (the drug). One English word, **three cuts** in Brazilian Portuguese: the pitch **craque**; list **crack**; slang **pedra** borrowed from the mineral.

> **Method note:** [Wiktionary · craque](${WIKT_CRAQUE}), [crack (EN)](${WIKT_CRACK_EN}). **Not** a manufacturing or use manual. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Word | **craque** · loan **crack** |
| Player sense | Eng. *crack* “first-rate” → PT *craque* |
| Drug sense | Eng. *crack* (*crack cocaine*, 1980s) → PT *crack* |
| Not | mineral **[pedra](${pedra})** (Gk. *πέτρα*) · **[maconha](${maconha})** · a recipe |
| Date | ${inspected} |

[The ear glues](${orelhaCola}) *craque* to *crack*; spelling **cuts**. Slang *pedra* is a **chunk** metaphor — sister of *crack*, not of Pedro. Research map: [Nappo](${nappo}) / [CEBRID](${cebrid}). [Valeu !!!](${mantra})

## Status

**Approved in Words** — excellence calque vs drug loan vs mineral *πέτρα*.

[▶ Words](${hub}) · [▶ Pedra](${pedra}) · [Wiktionary](${WIKT_CRAQUE})
`;

  const contentEs = `## Alcance

Inspección de **craque** — pedido: relacionar con **[pedra](${pedra})** y con **crack** (droga). Un inglés, **tres cortes** en el portugués brasileño: el **craque** del campo; el **crack** de lista; la **pedra** que la jerga toma prestada del mineral.

> **Nota:** [Wikcionario · craque](${WIKT_CRAQUE}). **No** es manual de fabricación ni de uso. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **craque** · préstamo **crack** |
| Sentido jugador | ing. *crack* «de primera» → PT *craque* |
| Sentido droga | ing. *crack* (*crack cocaine*) → PT *crack* |
| No es | **[pedra](${pedra})** mineral (gr. *πέτρα*) · **[maconha](${maconha})** · receta |
| Fecha | ${inspected} |

[El oído pega](${orelhaCola}) *craque* con *crack*; la grafía **corta**. La jerga *pedra* es metáfora del **naco** — hermana de *crack*, no de Pedro. Mapa de investigación: [Nappo](${nappo}) / [CEBRID](${cebrid}). [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — calco de excelencia × préstamo de sustancia × mineral *πέτρα*.

[▶ Palabras](${hub}) · [▶ Pedra](${pedra}) · [Wikcionario](${WIKT_CRAQUE})
`;

  return { body, contentEn, contentEs };
}

function buildCraquePost() {
  const { body, contentEn, contentEs } = buildCraqueBodies();
  const seriesOrder = pickOrder('inspecao-palavra-craque', 280);
  return makePalavra({
    title: 'Inspeção: Craque — excelência no campo; a orelha cola crack e pedra',
    titleEn: 'Inspection: Craque — pitch excellence; the ear glues crack and pedra',
    titleEs: 'Inspección: Craque — excelencia en el campo; el oído pega crack y pedra',
    excerpt:
      'Palavras: craque ← ing. crack «de primeira»; crack (droga) é outro empréstimo; pedra mineral (πέτρα) × pedra-gíria; Valeu !!!',
    excerptEn:
      'Words: craque ← Eng. crack “first-rate”; crack (drug) is another loan; mineral pedra (πέτρα) vs slang rock; Valeu !!!',
    excerptEs:
      'Palabras: craque ← ing. crack «de primera»; crack (droga) es otro préstamo; pedra mineral (πέτρα) × jerga; ¡Valeu !!!',
    slug: 'inspecao-palavra-craque',
    date: '2026-09-17T14:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Craque · palavra',
    coverImage: COVER,
    sourceUrl: WIKT_CRAQUE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCraquePost,
  buildCraqueBodies
};
