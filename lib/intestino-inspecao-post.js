'use strict';

/**
 * Inspeção Palavras · intestino
 * Eixos: lat. intestinum ← intestinus «interno» ← intus «dentro» ·
 * órgão (tubo) × adj. interno (guerra intestina) ·
 * ≠ barriga (ventre de fora) · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/intestino-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/intestino';
const WIKI = 'https://pt.wikipedia.org/wiki/Intestino';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/intestinum#Latin';
const WIKT_INTUS = 'https://en.wiktionary.org/wiki/intus#Latin';
const WIKT_ENTERON = 'https://en.wiktionary.org/wiki/%E1%BC%94%CE%BD%CF%84%CE%B5%CF%81%CE%BF%CE%BD';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildIntestinoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-intestino.html';
  const barriga = '/posts/post-inspecao-palavra-barriga.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const vomitar = '/posts/post-inspecao-palavra-vomitar.html';
  const pipoca = '/posts/post-inspecao-palavra-pipoca.html';
  const isotonico = '/posts/post-inspecao-palavra-isotonico.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const templo = '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const trigo = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const unifesp = '/biblioteca/unifesp/';
  const curso = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[intestino](${self})** — o **tubo de dentro**. O étimo não mente: lat. *intestīnum* é o substantivo de *intestīnus* «interno», de *intus* «dentro». Pedido de campo: *inspeção da palavra Intestino*. Esta ficha cobre o **objecto lexical**, os **dois ofícios** (órgão × adj. interno), o corte com a [barriga](${barriga}) (ventre de **fora**, sinal de satisfação) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · intestino](${WIKT}), [Wikipédia · Intestino](${WIKI}), lat. [*intestīnum*](${WIKT_LAT}), [*intus*](${WIKT_INTUS}). Série [Palavras](${hub}). **Ficha ≠ gastroenterologia, ≠ dieta, ≠ diagnóstico, ≠ bula.** O laboratório mapeia **léxico e ofício**. Índice de discurso ([Davis](${davis}), [glúten](${gluten}), [UNIFESP](${unifesp})) ≠ endosso clínico. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **intestino** |
| Classe | Substantivo masculino · também adjectivo («interno, de dentro») |
| Étimo (trabalho) | Lat. *intestīnum* ← *intestīnus* «interno» ← *intus* «dentro» — confiança: **alta** |
| Família verdadeira | *intestinal* · *intestinos* · *flora intestinal* · *guerra intestina* · *íntimo* / *interno* / *interior* (campo de *intus*) |
| Popular | *tripa* (uso vivo; não é o étimo culto) |
| Paralelo grego | *énteron* (ἔντερον) → *entérico*, *gastroenterologia* — **outro étimo**, sentido vizinho |
| Cognatos | esp. *intestino* · fr. *intestin* · it. *intestino* · ing. *intestine* · lat. *intestīnum* |
| Tipo BudGanja | Palavra — órgão (tubo) × interno (de dentro) × processamento |
| Não é | [Barriga](${barriga}) (ventre de fora) · estômago (a montante) · [coração](${coracao}) (peito / afeto) |
| Elo corpo | [barriga](${barriga}) · [sinais](${sinais}) · [coração](${coracao}) · [templo corpo e alma](${templo}) |
| Elo o que entra | [água](${agua}) · [pipoca](${pipoca}) · [isotônico](${isotonico}) · [glúten](${gluten}) · [caseína](${caseina}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [vomitar](${vomitar}) · [Valeu !!!](${mantra}) |
| Elo lab | [endocanabinoidoma](${ecbome}) · [UNIFESP](${unifesp}) · [Davis](${davis}) |
| Fonte | [intestino](${WIKT}) · [*intestīnum*](${WIKT_LAT}) |
| Data | ${inspected} |

**O que é o objecto:** o vocábulo que nomeia o **tubo interno** do aparelho digestivo e, no adjectivo herdado, o que é **de dentro** (luta intestina, guerra intestina). No BudGanja: âncora de **dentro** — processar o que entra; não substitui ficha clínica nem atlas de anatomia.

## 2. Sentidos — órgão · interno · processamento

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Órgão** | Tubo após o estômago: *intestino delgado* / *intestino grosso* | Alta (uso comum; sem pretender medicina) |
| **Interno (adj.)** | «De dentro» — *guerra intestina*, conflito interno (lat. *bellum intestinum*) | Alta (mesmo étimo; outro ofício) |
| **Processamento** | Absorver / transformar o que entra — o ofício do tubo | Alta (metáfora de craft; não protocolo) |
| **Flora / microbioma** | Discurso vivo (catálogo [Davis](${davis}), vídeos de divulgação) | Média — indexar ≠ endossar |
| **Eixo intestino–cérebro** | Ponte nomeada na formação [UNIFESP](${curso}) e no mapa do [eCBome](${ecbome}) | Média — literacia, não bula |
| **Feeling (EN *gut*)** | O inglês põe o palpite no *gut*; o PT vive mais na [barriga](${barriga}) / no [coração](${coracao}) | Alta (mapa de línguas; não fundir) |

**H1:** *intestino* herda *intus* — o nome **já diz** «o de dentro».  
**H2:** o adjectivo (*guerra intestina*) e o órgão **não se fundem**: um é conflito interno; o outro é tubo.  
**H3:** [barriga](${barriga}) mostra o **bastante** por fora; intestino nomeia o **trabalho** por dentro.

## 3. Barriga × intestino (fora × dentro)

A [barriga](${barriga}) é o **ventre visível** no mapa de [sinais](${sinais}) (satisfação / o bastante). O **intestino** é o **tubo interno**. Complementaridade — não sinónimo.

| Ficha | Pergunta | Resposta BudGanja |
|-------|----------|-------------------|
| **[Barriga](${barriga})** | O que o ventre **mostra**? | Sinal de satisfação — o chega |
| **Esta (intestino)** | O que o **dentro** faz? | Processa o que entra — o tubo |
| **[Coração](${coracao})** | Onde o afecto se **nomeia**? | Peito — outro órgão, outro ofício |
| **Juntas** | Como o ofício fecha? | Fora lê o bastante; dentro trabalha; [Valeu !!!](${mantra}) |

| Relação | Leitura |
|---------|---------|
| **Fora × dentro** | Barriga = superfície do sinal · intestino = *intus* do étimo |
| **Cheia × preso / solto** | «Barriga cheia» ≠ laudo de *intestino preso* — não colar as frases |
| **Livro Davis** | *[Barriga de Trigo](${trigo})* é **título**; esta ficha é a **palavra do tubo** |
| **Anti-dogma** | Não inventamos anatomia nem dieta. Quem tem outro nome popular (*tripa*) não perde ofício |

**Veredicto da relação:** ler [barriga](${barriga}) para o **sinal de fora**; ler **intestino** para o **dentro que processa**.

## 4. Delgado × grosso (nomes, não atlas)

| Nome | Ofício lexical | Limite |
|------|----------------|--------|
| **Intestino delgado** | A parte **fina** do tubo — onde a língua põe a absorção | Nomear ≠ medir vilosidades |
| **Intestino grosso** | A parte **larga** — onde a língua põe água / resto | Nomear ≠ protocolo de cólon |
| **Tripa** | Oral BR / popular para o mesmo referente | Uso vivo; não substitui o étimo culto |

**H4:** delgado / grosso são **adjectivos de calibre** colados ao substantivo — literacia da [língua](${lingua}), não aula de corte.

## 5. Parece × é

| Parece | É |
|--------|---|
| Só «barriga por dentro» | *Intus* — interno; a barriga é o ventre de **fora** |
| Estômago | A montante; outro órgão, outra palavra |
| *Guerra intestina* = doença intestinal | Adj. «interno» (conflito civil / de dentro) — outro ofício |
| Microbioma no YouTube = esta ficha | Discurso indexado ([Davis](${davis})) · **não** veredicto clínico |
| *Gut feeling* = intestino em PT | Calco inglês; o lab lê [barriga](${barriga}) / [coração](${coracao}) |

## 6. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear o órgão** | Corpo, digestão | Vocábulo — sem clínica nesta ficha |
| **Nomear o interno** | Guerra intestina, luta de dentro | Adj. herdado de *intestīnus* |
| **Processar o que entra** | Comida, [água](${agua}), [pipoca](${pipoca}) | Ofício: o que entra pede [verdade](${verdade}) no rótulo ([isotônico](${isotonico}), [glúten](${gluten}), [caseína](${caseina})) |
| **Expulsar** | Náusea, vómito | [Vomitar](${vomitar}) é outro gesto — a montante / recusa |
| **Mapa endocanabinóide** | Receptores no tubo (literacia pública) | Elo [eCBome](${ecbome}) — mapa, não dose |
| **Formação** | Eixo intestino–cérebro nas aulas | [UNIFESP](${unifesp}) / [curso](${curso}) — rascunho ≠ bula |
| **Fechar** | Depois do dentro, o acto | [Gesto](${gesto}) + [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear o **intestino** para **honrar o dentro** — o tubo que trabalha sem pose; não desculpa para dieta de media nem para ignorar [risco](${risco}) real (isso é médico, fora de escopo).

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com este dentro a trabalhar**, hoje — sem fingir atlas nem vender flora |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sinto no intestino, então dispenso a [verdade](${verdade})» = falso · *gut feeling* não é inspeção |
| Par fora | [Barriga](${barriga}) · [sinais](${sinais}) — o bastante visível |
| Par peito | [Coração](${coracao}) · [alma](${alma}) · [templo](${templo}) — outro centro |
| Par do que entra | [Água](${agua}) · [pipoca](${pipoca}) · [isotônico](${isotonico}) |
| Sol | [Sol](${sol}) — ritmo do dia; divulgação que cola intestino + sol fica **fora** desta ficha (outro discurso) |

**Veredicto:** Valeu !!! **por dentro** — com [gesto](${gesto}) e [verdade](${verdade}). Intestino sem [vida](${vidaPalavra}) = tubo abstracto; intestino com método = o *intus* que fica.

## Hipóteses (síntese)

**H1:** objecto = *intus* → *intestīnus* → intestino (dentro + tubo).  
**H2:** sentidos = órgão · adj. interno · processamento.  
**H3:** elos = [barriga](${barriga}) (fora) · [coração](${coracao}) (peito) · [eCBome](${ecbome}) / [UNIFESP](${unifesp}) (mapa).  
**H4:** fecho = [Valeu !!!](${mantra}) por dentro, com limites.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Barriga](${barriga}) · [Sinais](${sinais}) | Fora — satisfação / marcas do corpo |
| [Coração](${coracao}) · [Alma](${alma}) · [Templo](${templo}) | Outros centros — não fundir com o tubo |
| [Água](${agua}) · [Pipoca](${pipoca}) · [Isotônico](${isotonico}) | O que entra |
| [Glúten](${gluten}) · [Caseína](${caseina}) · [Davis](${davis}) · [Barriga de Trigo](${trigo}) | Discurso de alimento / microbioma — indexar ≠ endossar |
| [Endocanabinoidoma](${ecbome}) · [UNIFESP](${unifesp}) | Mapa do ofício / formação |
| [Vomitar](${vomitar}) · [Risco](${risco}) | Recusa e limite |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é gastroenterologia, nutrição clínica, diagnóstico nem aconselhamento médico.  
- Indexar [Davis](${davis}) / [glúten](${gluten}) / eixo intestino–cérebro ≠ validar protocolo.  
- *Guerra intestina* (adj.) ≠ doença do tubo.  
- *Tripa* é oral; o étimo culto continua *intestīnum*.  
- Ficha ≠ receita, ≠ suplemento, ≠ «reset» de flora.

## Status

**Aprovado** — **intestino** fichado: objecto (*intus*), sentidos (órgão · interno · processamento), corte com [barriga](${barriga}) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Barriga](${barriga}) · [▶ Sinais](${sinais}) · [▶ Coração](${coracao}) · [▶ Endocanabinoidoma](${ecbome}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **intestino** (intestine) — the **inner tube**. Latin *intestīnum* ← *intestīnus* “internal” ← *intus* “within.” Distinct from [barriga](${barriga}) (outer belly, satisfaction signal). Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · intestino](${WIKT}), [intestinum](${WIKT_LAT}). **Not** gastroenterology or medical advice. Indexing [Davis](${davis}) / [gluten](${gluten}) ≠ endorsement.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **intestino** |
| Etymon | Lat. *intestīnum* ← *intus* “within” |
| Lab type | Organ (tube) × internal (adjective) × processing |
| Not | [Belly](${barriga}) · stomach · [heart](${coracao}) |
| Links | [barriga](${barriga}) · [sinais](${sinais}) · [eCBome](${ecbome}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Organ** (small / large intestine — names, not an atlas) · **internal** (*guerra intestina* = inward conflict, same etymon, other craft) · **processing** what enters ([água](${agua}), [pipoca](${pipoca})). English *gut feeling* lives more in [barriga](${barriga}) / [coração](${coracao}) in PT.

## 3. Outside × inside

[Barriga](${barriga}) = visible “enough.” **Intestino** = the *intus* that works. Complementary — not synonyms.

## 4. Purpose

Name the tube · honour the inside · read food discourse without swallowing it as protocol · close with [Valeu !!!](${mantra}).

## 5. Valeu !!!

Best possible **with this inside at work**, today — without posing anatomy or selling flora. Gut feeling ≠ [truth](${verdade}).

## Status

**Approved** — object · senses · barriga cut · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Barriga](${barriga}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **intestino** — el **tubo de dentro**. Lat. *intestīnum* ← *intestīnus* «interno» ← *intus* «dentro». Distinto de [barriga](${barriga}) (vientre de fuera, señal de satisfacción). Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · intestino](${WIKT}), [intestinum](${WIKT_LAT}). **No** es gastroenterología. Indexar [Davis](${davis}) / [gluten](${gluten}) ≠ aval clínico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **intestino** |
| Étimo | Lat. *intestīnum* ← *intus* «dentro» |
| Tipo lab | Órgano (tubo) × interno (adjetivo) × procesamiento |
| No es | [Barriga](${barriga}) · estómago · [corazón](${coracao}) |
| Vínculos | [barriga](${barriga}) · [sinais](${sinais}) · [eCBome](${ecbome}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Órgano** (delgado / grueso — nombres, no atlas) · **interno** (*guerra intestina* = conflicto de dentro) · **procesar** lo que entra. El *gut feeling* inglés en PT vive más en [barriga](${barriga}) / [coração](${coracao}).

## 3. Fuera × dentro

[Barriga](${barriga}) = el «basta» visible. **Intestino** = el *intus* que trabaja. Complementariedad — no sinónimo.

## 4. Para qué sirve

Nombrar el tubo · honrar el dentro · leer el discurso de comida sin tragarlo como protocolo · cerrar con [¡Valeu !!!](${mantra}).

## 5. ¡Valeu !!!

Lo mejor posible **con este dentro trabajando**, hoy — sin fingir anatomía ni vender flora.

## Estado

**Aprobada** — objeto · sentidos · corte con barriga · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Barriga](${barriga}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildIntestinoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildIntestinoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-intestino', 201);
  return makePalavra({
    title: 'Inspeção: Intestino — o tubo de dentro (intus) e Valeu !!!',
    titleEn: 'Inspection: Intestino — the inner tube (intus) and Valeu !!!',
    titleEs: 'Inspección: Intestino — el tubo de dentro (intus) y ¡Valeu !!!',
    excerpt:
      'Palavras: «intestino» (lat. *intestīnum* ← *intus*) — órgão-tubo e adj. interno; ≠ barriga; elos eCBome/UNIFESP; Valeu !!! por dentro.',
    excerptEn:
      'Words: “intestino” (Lat. *intestīnum* ← *intus*) — tube-organ and inward adjective; ≠ belly; eCBome/UNIFESP links; Valeu !!! from inside.',
    excerptEs:
      'Palabras: «intestino» (lat. *intestīnum* ← *intus*) — órgano-tubo y adj. interno; ≠ barriga; vínculos eCBome/UNIFESP; ¡Valeu !!! por dentro.',
    slug: 'inspecao-palavra-intestino',
    date: '2026-08-22T05:55:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Intestino · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIntestinoPost,
  buildIntestinoBodies
};
