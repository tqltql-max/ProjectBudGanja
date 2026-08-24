'use strict';

/**
 * Inspeção objecto · óculos
 * Pedido: inspeção do objeto oculos.
 * Eixos: plural de óculo ← lat. oculus · lentes + armação diante do olho ·
 * ≠ órgão olho ≠ lente de contacto ≠ óculo de arquitectura · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/oculos-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/%C3%B3culos';
const WIKT_OCULO = 'https://pt.wiktionary.org/wiki/%C3%B3culo';
const WIKT_OCULUS = 'https://en.wiktionary.org/wiki/oculus#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/%C3%93culos';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildOculosBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-oculos.html';
  const olho = '/posts/post-inspecao-palavra-olho.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const miss = '/posts/post-inspecao-palavra-miss.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [óculos](${self})** — no português do Brasil, o **par de lentes na armação** que se põe **diante** do [olho](${olho}), no nariz e nas [orelhas](${orelha}), sem (em regra) tocar o órgão. Pedido de campo: *inspeção do objeto oculos*. Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa**: duas lentes + armação + hastes. O órgão é a ficha [olho](${olho}) (lat. *oculus*, cruzada com *zaroio*). Aqui o ofício é o **artefacto**. Não é receita oftalmológica, não é loja, não é catálogo de marca.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · óculos](${WIKT}), [óculo](${WIKT_OCULO}), lat. [*oculus*](${WIKT_OCULUS}), [Wikipédia · Óculos](${WIKI}). **Ficha ≠ prescrição, ≠ optometria, ≠ vitrine.** Sem afiliação comercial. Tom: Inspetor BudGanja — os óculos **não substituem o [olho](${olho})**; **sentam-se à frente**. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **óculos** (lema plural); fala BR muitas vezes *o óculos* |
| Classe | Substantivo masculino plural — par de lentes + suporte |
| Étimo (trabalho) | Plural de **óculo** ← lat. *oculus* «olho» — confiança: **alta** |
| Família | *óculo* · *ocular* · *oculista* · *binóculo* · [olho](${olho}) |
| Cognatos / mapa | esp. *gafas* / *lentes* / *anteojos* · ing. *glasses* / *spectacles* · fr. *lunettes* · it. *occhiali* |
| Tipo BudGanja | Objecto — prótese óptica × protecção × adorno |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | O órgão [olho](${olho}) · lente de contacto (toca o olho) · óculo de arquitectura / luneta · VR · marca |
| Elo órgão | [olho](${olho}) — mesmo *oculus*; outra classe |
| Elo ofício | [luz](${luz}) · [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) |
| Fonte | [óculos](${WIKT}) · [Óculos (WP)](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **par**. Duas lentes oftálmicas (ou de filtro) numa **armação**, com **hastes** que assentam nas [orelhas](${orelha}) e ponte/plaquetas no nariz. Ficam **diante** do rosto, próximos dos [olhos](${olho}), em regra **sem contacto** com o globo. A [luz](${luz}) atravessa a lente; o órgão continua a ser o olho.

## 2. Óculos × olho × óculo × lentes

| Forma | Onde | Ofício nesta ficha |
|-------|------|-------------------|
| **óculos** | BR/PT | Objecto — o par que se usa no rosto |
| **[olho](${olho})** | Órgão | A peça viva — mesma árvore *oculus*, **outra classe** |
| **óculo** | Singular culto | Luneta, olho de boi (arquitectura), uma só lente |
| **ocularium** | Antiguidade | Orifício da armadura para ver — avô semântico |
| **lentes** (BR) | Fala | Às vezes o par inteiro; no lab: a **peça óptica**, não a armação |
| **lente de contacto** | Outro objecto | Toca o olho — **não** esta ficha |
| **binóculos** | Aumentativo de par | Outra escala — dois tubos, não o par de grau |
| **zaroio / zarolho** | Ficha [olho](${olho}) | Eixo que não alinha — os óculos **não** são o étimo nem o xingo |

**H1:** *óculos* = plural de *óculo* ← *oculus* — o objecto herda o nome do órgão (alta).  
**H2:** o [olho](${olho}) é carne; os óculos são **coisa** — [relação](${relacao}) de ofício (ver melhor / proteger), não de identidade.  
**H3:** a fala *o óculos* trata o par como **uma** coisa; o lema no papel continua **plural**.  
**H4:** *zaroio* nomeia o eixo; óculos nomeiam o artefacto. Não fundir.

## 3. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Lentes** | Onde a [luz](${luz}) se curva ou se filtra — vidro, resina, cristal; grau ou filtro |
| **Armação** | O vaso que segura as lentes — acetato, metal, injetado, madeira |
| **Hastes** | O caminho até à [orelha](${orelha}) — o par assenta, não fura |
| **Ponte / plaquetas** | Onde o nariz carrega o objecto |
| **Ângulo / ajuste** | [Gesto](${gesto}) do óptico — um quarto de volta, não raiva |
| **Grau** | Prescrição — **fora** desta ficha (não é receita) |
| **Filtro (sol)** | Corta [sol](${sol}) / UV — outra função, mesmo objecto-família |

**Veredicto peças:** os óculos são o **conjunto**. Trocar lente ≠ trocar o olho. Partir a haste ≠ cegar.

## 4. Formas do objecto (mapa curto)

| Forma | Função | Sala |
|-------|--------|------|
| **De grau / graduados** | Compensar ametropia (miopia, hipermetropia, astigmatismo, presbiopia) | Correcção — sem prescrever aqui |
| **De sol** | Filtrar [luz](${luz}) / UV; também adorno | Protecção + moda |
| **De segurança (EPI)** | Impacto, químico, indoor | [Risco](${risco}) — outro critério de lente |
| **De natação** | Vedação na água | Outro vedante, mesma ideia de par |
| **Bifocais / progressivas** | Perto + longe no mesmo par | Franklin (1785) como marco histórico, não marca |
| **Monóculo** | Uma lente | Par incompleto — outra peça |
| **Pince-nez / lorgnon** | Sem hastes fixas | Avós do objecto (séc. XV–XIX) |

História curta (WP, com limites): *ocularium* na armadura; lentes de leitura na Europa medieval (guildas de Veneza, séc. XIII–XIV); hastes às orelhas no séc. XVII; no Brasil, séc. XVI com o colono letrado. O lab **não** fecha lenda de Confúcio nem de pedra preciosa no séc. I — nota, não dogma.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **O órgão** | Óculos = olho | Objecto **diante** do [olho](${olho}) |
| **A marca** | O nome da loja vê por ti | Sem afiliação — inspecionar a **função** |
| **A moda** | O par *é* o estilo | O estilo é [gesto](${gesto}) social; a lente ainda é óptica |
| **O grau** | Comprar armação = ver | Sem lente certa, a armação é só peso no nariz |
| **Zaroio** | Óculos «endireitam» o xingo | *Zarolho* é eixo; esta ficha é artefacto — ver [olho](${olho}) |
| **Contacto** | Tudo o que corrige é óculos | Contacto toca o globo — **outra** coisa |
| **Eu olho** | Homógrafo do órgão | Verbo — ficha [olho](${olho}), não este par |

**H-parece:** os óculos vêem.  
**H-é:** o [olho](${olho}) vê; os óculos **dobram ou filtram a [luz](${luz})** no caminho.

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «pega os óculos» / «o óculos» | Bom: a coisa; o lema é plural |
| **Ofício** | «pôr os óculos para ler» | Bom: [gesto](${gesto}) + lente de perto |
| **Sol** | «óculos escuros» | Bom se se nomeia o filtro; mau se se apaga o UV |
| **Grau** | «óculos de grau» | Bom: função; mau: esta ficha como receita |
| **Xingo** | «quatro-olhos» | Mau: o objecto não é insulto |
| **Esquecer** | «tá na cabeça» | Bom: o par é tão próximo que some — ainda é coisa |
| **EPI** | «óculos de protecção no indoor» | Bom: [risco](${risco}); mau: confundir com grau de rua |

**Finalidade-mãe:** nomear os **óculos** para inspecionar a **coisa que se põe diante do olho** — lentes + armação — sem virar receita, vitrine ou xingo.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Par de lentes + armação — catálogo [Objetos](${objetos}) |
| Órgão | [Olho](${olho}) — *oculus*; *zaroio* é o eixo, não o par |
| Luz | A lente trabalha a [luz](${luz}); o olho recebe |
| Anti-armadilha | Marca ≠ visão; armação ≠ grau; óculos ≠ contacto |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** par, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **óculos** são objecto (plural de *óculo* ← *oculus*); o [olho](${olho}) é o órgão; o par **senta-se à frente**, não substitui.

## Hipóteses (síntese)

**H1:** *óculos* < *óculo* < lat. *oculus* — alta.  
**H2:** mesmo [étimo](${etimo}) que [olho](${olho}); classe **objecto**, não órgão.  
**H3:** fala *o óculos* = um par; papel = plural.  
**H4:** grau / sol / EPI / natação = funções; um lema.  
**H5:** *zaroio* fica na ficha [olho](${olho}) — não é este artefacto.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Olho](${olho}) | Órgão — *oculus*; cruzado com zaroio |
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Orelha](${orelha}) | Onde a haste assenta |
| [Luz](${luz}) · [sol](${sol}) | O que a lente curva ou filtra |
| [Sinais](${sinais}) | O par no rosto — mapa do corpo |
| [Miss](${miss}) | Falhar o alvo — ver sem o par certo |
| [Gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) | Pôr, ajustar, proteger |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [relação](${relacao}) | Peça × ofício × cruzamento |
| [Língua portuguesa](${lingua}) | *O óculos* na boca; *óculos* no papel |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é prescrição, exame de vista nem aconselhamento médico.  
- Não é catálogo de marcas (Ray-Ban e pares são história de design, não essência).  
- Não trata lente de contacto, VR, luneta ou óculo de arquitectura como este par.  
- *Zaroio* / estrabismo: ver [olho](${olho}); esta ficha não diagnostica.

## Status

**Aprovado** — **óculos** fichados como **objecto** (plural de *óculo* ← lat. *oculus*); catálogo [Objetos](${objetos}); lentes + armação **diante** do [olho](${olho}); ≠ órgão ≠ contacto ≠ marca. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Olho](${olho}) · [▶ Orelha](${orelha}) · [▶ Luz](${luz}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **óculos** — the **object**: a pair of lenses in a frame, worn **in front of** the [olho](${olho}) (eye), on the nose and [ears](${orelha}). Field request: inspection of the **object**. Same etymon as the organ (*oculus*); other class. Catalog: [Objetos](${objetos}). Not a prescription. Not a shop. Not a brand sheet. Close: [Valeu !!!](${mantra}).

> Independent audit. [óculos](${WIKT}), [*oculus*](${WIKT_OCULUS}), [Wikipedia](${WIKI}). The glasses **do not replace** the eye; they **sit in front**.

## Object

| Field | Value |
|-------|-------|
| Thing | Two lenses + frame + temples |
| Etymon | Plural of *óculo* ← Lat. *oculus* — “eye” |
| Not | The organ [olho](${olho}) · contact lens · architectural oculus · VR · a brand |
| Spoken BR | Often *o óculos* (the pair as one thing); lemma stays plural |
| Links | [olho](${olho}) · [luz](${luz}) · [orelha](${orelha}) · [risco](${risco}) |
| Date | ${inspected} |

**Seems:** the glasses see.  
**Is:** the [eye](${olho}) sees; the lenses **bend or filter** [light](${luz}) on the way.

## Status

**Approved** — óculos as object; same *oculus* as [olho](${olho}); other class. No brand affiliation.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Olho](${olho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Óculos** (portugués) — el **objeto**: un par de lentes en la montura, **delante** del [olho](${olho}) (ojo), en la nariz y las [orejas](${orelha}). Pedido: inspección del **objeto**. Mismo étimo que el órgano (*oculus*); otra clase. Catálogo: [Objetos](${objetos}). No es receta. No es tienda. No es ficha de marca. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [óculos](${WIKT}), [*oculus*](${WIKT_OCULUS}). Los anteojos **no sustituyen** el ojo; **se sientan delante**.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Dos lentes + montura + patillas |
| Étimo | Plural de *óculo* ← lat. *oculus* |
| No es | El órgano [olho](${olho}) · lentilla · óculo de arquitectura · VR · una marca |
| Habla BR | A menudo *o óculos* (el par como una cosa); el lema sigue plural |
| Vínculos | [olho](${olho}) · [luz](${luz}) · [orelha](${orelha}) |
| Fecha | ${inspected} |

**Parece:** los óculos ven.  
**Es:** el [ojo](${olho}) ve; las lentes **doblan o filtran** la [luz](${luz}) en el camino.

## Estado

**Aprobada** — óculos como objeto; el mismo *oculus* que [olho](${olho}); otra clase. Sin afiliación.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Olho](${olho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildOculosPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildOculosBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-oculos', 296);
  return makePalavra({
    title: 'Inspeção: Óculos — o objecto diante do olho',
    titleEn: 'Inspection: Óculos — the object in front of the eye',
    titleEs: 'Inspección: Óculos — el objeto delante del ojo',
    excerpt:
      'Objecto: «óculos» (plural de óculo ← lat. oculus) — lentes + armação diante do olho; ≠ órgão ≠ contacto ≠ marca; Valeu !!!',
    excerptEn:
      'Object: “óculos” (plural of óculo ← Lat. oculus) — lenses + frame in front of the eye; ≠ organ ≠ contacts ≠ brand; Valeu !!!',
    excerptEs:
      'Objeto: «óculos» (plural de óculo ← lat. oculus) — lentes + montura delante del ojo; ≠ órgano ≠ lentilla ≠ marca; ¡Valeu !!!',
    slug: 'inspecao-palavra-oculos',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Óculos · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildOculosPost, buildOculosBodies, COVER, WIKT, WIKT_OCULO, WIKI };
