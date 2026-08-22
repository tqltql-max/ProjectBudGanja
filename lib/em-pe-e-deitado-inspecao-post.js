'use strict';

/**
 * Inspeção Expressões · em pé e deitado
 * Par de posturas da lemniscata · gatilho *bodiado* → deitado (+ body) ·
 * aula XIV Kassia · Valeu !!!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemEmPeEDeitadoPt() {
  return `Bodiado chegou torto no ouvido.
Deitado endereçou.
O oito deitado chama-se infinito.
O oito em pé chama-se corpo:
o que está em cima fala com o que está em baixo.

Não é duas figuras.
É a mesma fita, rodada.
Em pé — o caminho no corpo.
Deitado — o nome do sem-fim.
No cruzamento — o elo que junta.

Kassia não baptizou a locução.
Pôs a lemniscata em pé
quando pensou o corpo.
O laboratório guarda o par:
em pé e deitado.

Valeu !!!
nas duas posturas,
sem fingir que o infinito cabe numa ficha.`;
}

function poemEmPeEDeitadoEn() {
  return `Bodiado arrived crooked in the ear.
Deitado addressed it.
The eight lying down is called infinity.
The eight standing up is called a body:
what is above speaks with what is below.

It is not two figures.
It is the same ribbon, turned.
Standing — the path in the body.
Lying — the name of the endless.
At the crossing — the link that joins.

Kassia did not baptise the locution.
She stood the lemniscate up
when she thought of the body.
The lab keeps the pair:
standing and lying.

Valeu !!!
in both postures,
without pretending infinity fits on a sheet.`;
}

function poemEmPeEDeitadoEs() {
  return `Bodiado llegó torcido al oído.
Deitado lo enderezó.
El ocho acostado se llama infinito.
El ocho de pie se llama cuerpo:
lo de arriba habla con lo de abajo.

No son dos figuras.
Es la misma cinta, girada.
De pie — el camino en el cuerpo.
Acostada — el nombre del sin-fin.
En el cruce — el eslabón que junta.

Kassia no bautizó la locución.
Puso la lemniscata de pie
cuando pensó el cuerpo.
El laboratorio guarda el par:
de pie y acostada.

Valeu !!!
en las dos posturas,
sin fingir que el infinito cabe en una ficha.`;
}

function buildEmPeEDeitadoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const trilha = '/vida/';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const kassiaVideos = '/videos/?channel=movrecam&series=kassia-martins';
  const ytAula8 = 'https://www.youtube.com/watch?v=dNcVCa1_7Ig';
  const wikiPe = 'https://pt.wiktionary.org/wiki/p%C3%A9';
  const wikiDeitar = 'https://pt.wiktionary.org/wiki/deitar';
  const wikiInfSym = 'https://en.wikipedia.org/wiki/Infinity_symbol';
  const wikiLemniscate = 'https://en.wikipedia.org/wiki/Lemniscate';
  const wikiBody = 'https://en.wiktionary.org/wiki/body';

  const body = `## Escopo

Inspeção editorial da expressão **«[em pé e deitado](${self})»** — o **par de posturas** da [lemniscata](${lemniscata}). Pedido de campo: *em pé e Deitado ou bodiado*. O ouvido trouxe *bodiado*; a letra endereça **deitado**. O inglês *body* cola no mesmo gatilho: a Dra. Kassia Martins, na [8.ª aula XIV](${aula8}), pede que se pense a figura **em pé** quando se pensa o **corpo**. O ofício desta ficha: as **duas posturas** da mesma fita. O cruzamento fica em [elo de ligação](${eloLigacao}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pé](${wikiPe}), [deitar](${wikiDeitar}), [infinity symbol](${wikiInfSym}), [lemniscate](${wikiLemniscate}), EN [body](${wikiBody}). Analogia de aula: Dra. **Kassia Martins** · [8.ª aula XIV](${aula8}) ([YouTube](${ytAula8})) · [UNIFESP](${unifesp}) / [MovReCam](${movrecam}). **Ficha ≠ misticismo, ≠ protocolo clínico, ≠ aula de geometria.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *bodiado* / *bodyado* / *deitado ou em pé* / *oito deitado* → **deitado** · **em pé** · **em pé e deitado**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **em pé e deitado** |
| Classe | Locução coordenada (par de posturas) |
| Peças | **em pé** (de pé) + **deitado** (particípio de *deitar*) |
| Gatilho de ouvido | *bodiado* → **deitado** (+ EN *body*, o corpo que endireita a figura) |
| Objecto gráfico | [lemniscata](${lemniscata}) (∞ / oito) |
| Cruzamento | [elo de ligação](${eloLigacao}) |
| Tipo BudGanja | Expressão — duas posturas da mesma fita |
| Não é | duas curvas distintas · eternidade · dose · [nó](${no}) |
| Fonte aula | [Kassia · aula 8](${kassiaVideos}) |
| Data | ${inspected} |

**O que é o objecto:** o **par** — deitar a figura (∞, o nome do sem-fim) e **erguê-la** (8, o caminho no corpo). Não são duas lemniscatas. É a **mesma** curva, rodada. *Bodiado* não entra no dicionário: o lab guarda o gatilho e **corrige** a letra.

## 2. Peças da locução

| Peça | Étimo de trabalho | Confiança | Ofício |
|------|-------------------|-----------|--------|
| **pé** | lat. *pēs, pedis* «pé» | Alta | O apoio no chão; *em pé* = erguido |
| **em pé** | locução PT (de pé / vertical) | Alta | Postura **vertical** da figura |
| **deitar** | lat. *deiectāre* / família de *iacĕre* «lançar, deitar» | Alta | Pôr na horizontal |
| **deitado** | particípio de *deitar* | Alta | Postura **horizontal** da figura |
| **body** (EN) | OE *bodig* «tronco / corpo» — [body](${wikiBody}) | Alta no inglês; **nula** como étimo PT | Só no gatilho: o **corpo** que pede a figura em pé |
| ***bodiado*** | orelha; mistura *deitado* + *body* | Alta como **gatilho**; nula como lema | Não se escreve; endereça **deitado** e lembra o corpo |

**H1:** *em pé* e *deitado* são posturas do **mesmo** objecto — a [lemniscata](${lemniscata}).  
**H2:** *bodiado* não é étimo; é orelha. Duas vias em paralelo: *deitado* (letra) e *body* (o corpo da aula).  
**H3:** a Dra. Kassia **não** baptizou a locução *em pé e deitado* — o par é leitura de ofício do laboratório.

## 3. As duas posturas (não misturar)

| Postura | Nome na aula / no lab | Leitura | Confiança |
|---------|------------------------|---------|-----------|
| **∞ deitado** | Símbolo do infinito (Wallis, 1655) | Sem-fim gráfico / matemático | Alta no **nome** do sinal; o conceito é outro ofício — [tudo](${tudo}) |
| **8 em pé** | Analogia da [aula 8](${aula8}) | Movimento e **comunicação**: cima fala com baixo; o **corpo** como caminho | Alta como **metáfora de aula**; não é teorema |
| **Cruzamento** | [Elo de ligação](${eloLigacao}) | O ponto onde as duas voltas ainda são uma | Alta como leitura de ofício — **não** é esta ficha |

**H4:** deitado nomeia o **sem fim**; em pé nomeia o **vai-e-vem** no corpo. O cruzamento nomeia o **entre** — ficha irmã.  
**H5:** na [8.ª aula do XIV Curso](${aula8}), a professora liga a figura às funções do SEC (*relaxar, comer, dormir, esquecer, proteger*): quanto mais ritmado o movimento cima↔baixo, mais equilíbrio. O lab **relaciona** essa analogia com o par de posturas — **não** afirma que ela usou as palavras *em pé e deitado* nem *bodiado*.

**Veredicto de analogia:** o [endocanabinoidoma](${ecbome}) é, nessa aula, o **maestro que comunica**. *Em pé e deitado* é o **nome do par**. Distinto de [tudo](${tudo}) — o infinito **não** cabe numa ficha.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Em pé e deitado** | Duas figuras, dois destinos | A mesma [lemniscata](${lemniscata}), rodada |
| ***Bodiado*** | Palavra nova / gíria | Gatilho: **deitado** + rasto de *body* |
| **Oito deitado** | Promessa de eternidade | Marca gráfica ∞ |
| **Oito em pé** | Religião do corpo | Analogia de **comunicação** (aula XIV) |
| **Cruzamento** | Esta locução | [Elo de ligação](${eloLigacao}) — ofício à parte |
| **SEC / eCBome** | O próprio ∞ em pé | Rede fisiológica — mapa em [endocanabinoidoma](${ecbome}) |

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Lemniscata](${lemniscata}) | O **nome** da curva-fita; OCR *lemeniscata* |
| [Elo de ligação](${eloLigacao}) | O **cruzamento** das voltas; gatilho *simbuklo* |
| [Caminho](${caminho}) · [gesto](${gesto}) | Em pé = caminho no corpo; rodar a figura é [gesto](${gesto}) |
| [Sinal](${sinal}) · [pattern](${pattern}) · [cinta](${cinta}) | A marca ∞; o molde; a fita das mãos |
| [Nó](${no}) | O encontro da lemniscata **passa**; o nó **aperta** |
| [Endocanabinoidoma](${ecbome}) | Mapa do SEC; analogia da figura em pé |
| [Curso UNIFESP](${unifesp}) · [MovReCam](${movrecam}) · [aula 8](${aula8}) | Crédito da analogia; [vídeos Kassia](${kassiaVideos}) |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | *Bodiado* → deitado; *pēs* / *deitar* / *body* |
| [Verdade](${verdade}) · [tudo](${tudo}) · [vida](${vida}) · trilha [Vida](${trilha}) | Sem slogan de eternidade; ofício no chão |
| [Valeu !!!](${mantra}) | Fechar nas duas posturas, não no cartaz |

## 6. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Descrever a figura ∞ / 8** | Bom: deitado = ∞; em pé = 8 |
| **Lembrar o corpo (aula XIV)** | Bom se se declara: analogia, não prova |
| **Escrever *bodiado* como lema** | Mau: guardar o gatilho; grafia = **deitado** |
| **Fundir as duas posturas com o cruzamento** | Mau: o cruzamento é [elo de ligação](${eloLigacao}) |
| **«O SEC é o oito em pé»** | Mau: cola analogia em dogma |
| **Duas curvas distintas** | Mau: é a mesma fita, rodada |

**Finalidade-mãe:** guardar o **par**. *Em pé e deitado* inspecciona as posturas; [lemniscata](${lemniscata}) nomeia a curva; [elo de ligação](${eloLigacao}) nomeia o cruzamento. Nenhum dos três é receita.

## Poema Vida

\`\`\`poem
${poemEmPeEDeitadoPt()}
\`\`\`

## Hipóteses (síntese)

**H1:** *em pé e deitado* = locução do **par de posturas** da mesma [lemniscata](${lemniscata}).  
**H2:** *bodiado* = gatilho de ouvido → **deitado** (+ rasto de EN *body*).  
**H3:** deitado = ∞ (nome do sem-fim); em pé = comunicação no corpo (Kassia / XIV).  
**H4:** o cruzamento **não** é esta ficha — vai a [elo de ligação](${eloLigacao}).  
**H5:** [endocanabinoidoma](${ecbome}) = mapa; analogia ≠ prova.  
**H6:** fecho = [Valeu !!!](${mantra}) — nas duas posturas, sem fingir eternidade.

## Limites

- Não é aula de curvas algébricas nem de compactação.  
- Não afirma que Kassia pronunciou *em pé e deitado* nem *bodiado* — a **relação** é do laboratório.  
- Não é protocolo clínico nem dose. O SEC fica na ficha [endocanabinoidoma](${ecbome}).  
- *Simbuklo* e o cruzamento ficam em [elo de ligação](${eloLigacao}).  
- OCR da aula escreve *lemeniscata* / *lemenescata* — lema: **lemniscata**.

## Status

**Aprovada** — **em pé e deitado** fichada como par de posturas da [lemniscata](${lemniscata}); gatilho *bodiado* endereçado a **deitado** (com rasto de *body*); analogia XIV (Kassia) creditada sem afiliação. Cruzamento na ficha irmã [elo de ligação](${eloLigacao}).

[▶ Expressões](${hub}) · [▶ Lemniscata](${lemniscata}) · [▶ Elo de ligação](${eloLigacao}) · [▶ Aula 8](${aula8}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[em pé e deitado](${self})”** — the **pair of postures** of the [lemniscate](${lemniscata}). Field request: *em pé e Deitado ou bodiado*. The ear brought *bodiado*; the letter addresses **deitado** (lying down). English *body* sticks to the same trigger: in [UNIFESP XIV lesson 8](${aula8}), Dr. Kassia Martins asks that the figure be thought **standing** when one thinks of the **body**. The crossing stays on [elo de ligação](${eloLigacao}). Close: [Valeu !!!](${mantra}).

> Independent audit. Sources: [pé](${wikiPe}), [deitar](${wikiDeitar}), [infinity symbol](${wikiInfSym}), [body](${wikiBody}). **Not mysticism, not a clinical protocol.** No affiliation.

## Object

| Field | Value |
|-------|-------|
| Saying | **em pé e deitado** (standing and lying) |
| Ear trigger | *bodiado* → **deitado** (+ *body*) |
| Graphic | [lemniscate](${lemniscata}) |
| Crossing | [elo de ligação](${eloLigacao}) |
| Not | two curves · eternity · dose · [nó](${no}) |
| Date | ${inspected} |

**H1:** one ribbon, turned — lying = ∞; standing = body path (Kassia).  
**H2:** *bodiado* is not an etymon.  
**H3:** the lab **relates** the pair to the lesson — it does **not** claim she used these words.

\`\`\`poem
${poemEmPeEDeitadoEn()}
\`\`\`

## Status

**Approved** — pair of postures filed; *bodiado* addressed; XIV analogy credited without affiliation.

[▶ Sayings](${hub}) · [▶ Lemniscate](${lemniscata}) · [▶ Connecting link](${eloLigacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[em pé e deitado](${self})»** — el **par de posturas** de la [lemniscata](${lemniscata}). Pedido de campo: *em pé e Deitado ou bodiado*. El oído trajo *bodiado*; la letra endereza **deitado** (acostada). El inglés *body* se pega al mismo gatillo: en la [aula 8 del XIV](${aula8}), la Dra. Kassia Martins pide pensar la figura **de pie** cuando se piensa el **cuerpo**. El cruce queda en [elo de ligação](${eloLigacao}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. Fuentes: [pé](${wikiPe}), [deitar](${wikiDeitar}), [infinity symbol](${wikiInfSym}), [body](${wikiBody}). **No es misticismo ni protocolo clínico.** Sin afiliación.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **em pé e deitado** (de pie y acostada) |
| Gatillo | *bodiado* → **deitado** (+ *body*) |
| Gráfico | [lemniscata](${lemniscata}) |
| Cruce | [elo de ligação](${eloLigacao}) |
| No es | dos curvas · eternidad · dosis · [nó](${no}) |
| Fecha | ${inspected} |

**H1:** una misma cinta, girada — acostada = ∞; de pie = camino en el cuerpo (Kassia).  
**H2:** *bodiado* no es étimo.  
**H3:** el lab **relaciona** el par con la aula — **no** afirma que ella dijera estas palabras.

\`\`\`poem
${poemEmPeEDeitadoEs()}
\`\`\`

## Estado

**Aprobada** — par de posturas fichado; *bodiado* enderezado; analogía XIV acreditada sin afiliación.

[▶ Expresiones](${hub}) · [▶ Lemniscata](${lemniscata}) · [▶ Eslabón](${eloLigacao}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiInfSym };
}

function buildEmPeEDeitadoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEmPeEDeitadoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 22;
  return expressaoPost({
    title: 'Inspeção: em pé e deitado — as duas posturas da lemniscata (*bodiado*)',
    titleEn: 'Inspection: em pé e deitado — the two postures of the lemniscate (*bodiado*)',
    titleEs: 'Inspección: em pé e deitado — las dos posturas de la lemniscata (*bodiado*)',
    excerpt:
      'Expressões: «em pé e deitado» — par de posturas da lemniscata; *bodiado* → deitado (+ body); aula XIV Kassia; Valeu !!!',
    excerptEn:
      'Sayings: “em pé e deitado” — pair of lemniscate postures; *bodiado* → deitado (+ body); UNIFESP XIV Kassia; Valeu !!!',
    excerptEs:
      'Dichos: «em pé e deitado» — par de posturas de la lemniscata; *bodiado* → deitado (+ body); aula XIV Kassia; ¡Valeu !!!',
    slug: 'inspecao-expressao-em-pe-e-deitado',
    date: '2026-08-22T06:25:00.000Z',
    seriesOrder: order,
    seriesLabel: 'em pé e deitado · expressão',
    coverImage: '/imagens/inspecoes/em-pe-e-deitado-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEmPeEDeitadoPost,
  buildEmPeEDeitadoBodies,
  poemEmPeEDeitadoPt,
  poemEmPeEDeitadoEn,
  poemEmPeEDeitadoEs
};
