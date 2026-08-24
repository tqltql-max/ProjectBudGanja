'use strict';

/**
 * Inspeção-cruzamento: Aaron Beggs × Air Bag
 * Objecto = a intersecção (gesto humano × dispositivo que amortece),
 * não biografia íntima nem manual de airbag.
 */

const fs = require('fs');
const path = require('path');
const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/aaron-beggs-air-bag-cover.jpg';
const BBC = 'https://www.bbc.com/news/articles/cj0v632yddzo';
const NBC =
  'https://www.nbcnews.com/sports/track-field/man-helped-competitor-boston-marathon-explains-rcna341852';
const ATH_NI =
  'https://athleticsni.org/News/Athletics-NI-News/North-Down-AC-Superstar-Shows-True-Spirit-of-Athletics-at-Boston-Marathon';
const WIKI_AIRBAG = 'https://pt.wikipedia.org/wiki/Airbag';
const WIKT_AIRBAG = 'https://pt.wiktionary.org/wiki/airbag';

function poemPt() {
  return `O airbag não escolhe.
Dispara no impacto.

Aaron olhou o relógio,
olhou a fita,
e escolheu.

O saco de ar amortece o choque.
O corpo de Bangor amorteceu a queda.

Dois são mais fortes que um.
Robson inflou o segundo lado.

Ajay atravessou.
Os três cruzaram.

Valeu !!!
airbag humano,
sem fingir que o dispositivo substitui o gesto.`;
}

function poemEn() {
  return `The airbag does not choose.
It fires on impact.

Aaron looked at his watch,
looked at the tape,
and chose.

The air bag cushions the crash.
The body from Bangor cushioned the fall.

Two are stronger than one.
Robson inflated the other side.

Ajay crossed.
The three finished.

Valeu !!!
human airbag,
without pretending the device replaces the gesture.`;
}

function poemEs() {
  return `El airbag no elige.
Dispara en el impacto.

Aaron miró el reloj,
miró la cinta,
y eligió.

El saco de aire amortigua el golpe.
El cuerpo de Bangor amortiguó la caída.

Dos son más fuertes que uno.
Robson infló el segundo lado.

Ajay cruzó.
Los tres llegaron.

¡Valeu !!!
airbag humano,
sin fingir que el dispositivo sustituye el gesto.`;
}

function buildAaronBeggsAirBagBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const juntos = '/posts/post-inspecao-palavra-juntos.html';
  const elo = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vida = '/vida/';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const robson = '/posts/post-inspecao-figura-robson-oliveira.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';

  const body = `## Escopo

Inspeção editorial do **cruzamento** **Aaron Beggs × Air Bag**. O objecto **não** é só o corredor de Bangor nem só a bolsa de ar do automóvel: é o **mapa** onde o dispositivo que **infla no impacto** encontra o [gesto](${gesto}) que **escolhe inflar** a uns 200 m da fita da [Maratona de Boston](${NBC}) (20 abr. 2026).

Pedido de campo: *Aaron Beggs cruze com Air Bag*. O laboratório honra o pedido **sem** afirmar que havia um airbag na Boylston Street. A metáfora é de ofício: o homem como **saco de ar humano**.

> **Nota metodológica:** auditoria independente. Fontes da pessoa e do gesto: [BBC](${BBC}), [NBC](${NBC}), [Athletics NI / North Down AC](${ATH_NI}). Fontes do dispositivo: [Wikipédia · Airbag](${WIKI_AIRBAG}), [Wikcionário · airbag](${WIKT_AIRBAG}). Sem afiliação com BAA, North Down AC, Scania ou fabricantes de airbag. **Ficha ≠ protocolo clínico, ≠ plano de treino, ≠ biografia íntima.** Não se inventa vida privada. Distinto de [Senna](${senna}) (outro ofício, outro risco). Fecho: [Valeu !!!](${mantra}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Cruzamento** — gesto × dispositivo, não obra única |
| Eixo pessoa | **Aaron Beggs** — Bangor, Co. Down, Irlanda do Norte; North Down AC |
| Eixo objecto | **Air bag** / **airbag** — EN *air* + *bag*; PT também **saco de ar**, **bolsa de ar**, *erbegue* |
| Tipo BudGanja | Pessoas — inspeção-cruzamento |
| Elo Palavras | [gesto](${gesto}) · [juntos](${juntos}) · [respeito](${respeito}) · [caminho](${caminho}) · [risco](${risco}) |
| Elo Expressões | [elo de ligação](${elo}) — os dois lados que seguram |
| Contraste | o airbag **dispara**; Beggs **escolheu** (olhou o relógio, olhou a fita) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila do laboratório: cruzar a **pessoa** que parou com a **palavra** do amortecimento. O airbag é segurança **passiva** — sensores, unidade de controlo, saco que enche em milissegundos. Beggs é segurança **escolhida** — instinto nomeado, [mão](${mao}) estendida, tempo de recorde pessoal posto em segundo plano.

A palavra [ídolo](${idolo}) avisa: não entregar Aaron ao pedestal. Esta ficha admira o feito **sem** reduzir Ajay Haridasse a queda nem [Robson de Oliveira](${robson}) a figurante.

## Hipóteses e método

**H1:** *airbag* nomeia o **dispositivo** (bolsa que infla no choque); o cruzamento **não** funde o objecto com o homem.  
**H2:** o valor BudGanja de Beggs é o [gesto](${gesto}) — parar quando dezenas passaram — não o tempo oficial.  
**H3:** o airbag **não escolhe**; Beggs **escolheu** («fight or flight, and I decided to fight» — [NBC](${NBC})). A diferença é o ofício humano.  
**H4:** [Robson](${robson}) é o **segundo saco** — «two are stronger than one»; o [juntos](${juntos}) aqui tem [elos](${elo}), não slogan.  
**H5:** fecho = [respeito](${respeito}) + [Valeu !!!](${mantra}) — o melhor recorte *deste* cruzamento *nesta* ficha.

Passos:

1. Fixar o eixo lexical (airbag / saco de ar).  
2. Fixar o eixo humano (Beggs, Bangor, Boston 2026) com fonte pública.  
3. Ler o cruzamento: amortecer ≠ disparar automático.  
4. Nomear os três na fita **sem** espetáculo da queda.  
5. Declarar limites.

\`\`\`poem
${poemPt()}
\`\`\`

## Eixo 1 — Air bag (o dispositivo)

| Campo | Valor |
|-------|-------|
| Grafia | **airbag** (PT, estrangeirismo) · **air bag** (EN, duas peças) · **saco / bolsa de ar** |
| Étimo | EN *air* (ar) + *bag* (saco) — confiança alta |
| Ofício | Segurança **passiva**: no impacto, sensores disparam o enchimento; o saco amortece cara, peito, coluna |
| Génese (contexto) | Patentes de almofada / veículo (Hetrick, Linderer, anos 1950); sensor prático de Allen Breed (1968) — [Wikipédia](${WIKI_AIRBAG}) |
| Limite | Também pode lesar; não é magia; **não** esteve na reta de Boston |

O airbag **espera o choque**. Não olha a fita. Não abre mão de um recorde. Infla e esvazia.

## Eixo 2 — Aaron Beggs (o gesto)

| Campo | Valor |
|-------|-------|
| Nome | **Aaron Beggs** |
| Terra | Bangor, County Down, Irlanda do Norte |
| Clube | North Down Athletic Club (colete amarelo e azul) |
| Ofício civil (público) | Trabalhador de manutenção; ex-cabo do Exército (fonte: imprensa NI) |
| Corrida | Correu ~3 anos antes de Boston; 130.ª Maratona de Boston, **20 abr. 2026** |
| O que fez | Primeiro a parar ~200 m / ~300 m da fita; puxou **Ajay Haridasse** (21, Wakefield / Northeastern) do chão |
| Quem se juntou | **[Robson de Oliveira](${robson})** (Brasil) — o segundo lado; ficha própria |
| Tempos (Athletics NI) | Oliveira **2:44:26** · Haridasse **2:44:32** · Beggs **2:44:36** (1 884.º / ~30 000) |
| Nota de fonte | *News Letter* cita ~2:43:53 e perda de ~1 min de PB — **discrepância declarada**, não «corrigida» |
| Palavra dele | «Natural instinct»; «it's a journey together»; olhou o relógio, olhou Ajay, parou |

Beggs ia para PB. Parou. Ajay tinha caído várias vezes. Dezenas passaram. Aaron não passou.

## Mapa do cruzamento — dispositivo × gesto

| Peça do airbag | Peça na Boylston Street |
|----------------|-------------------------|
| Sensor de impacto | O olho no canto: Ajay a cair outra vez |
| Unidade de controlo | O segundo de decisão: relógio × fita × homem no chão |
| Inflação em milissegundos | O corpo que **para** — não o corpo que acelera |
| Saco que amortece | Os ombros e as [mãos](${mao}) que seguram |
| Segundo módulo (lateral) | Robson: «dois são mais fortes que um» |
| Esvaziar depois do choque | Tenda médica (Ajay, Robson); Aaron foi «comer bem» (BBC) — o saco não fica teso para sempre |
| Segurança passiva | Aqui foi **activa**: instinto + escolha |

Tese: o airbag **substitui** a escolha; Beggs **é** a escolha. O cruzamento lê o amortecimento **sem** transformar o homem em peça de carro.

## Os três na fita

| Pessoa | Papel nesta ficha | Limite |
|--------|-------------------|--------|
| **Aaron Beggs** | Primeiro a inflar — o airbag que escolheu | ≠ ídolo; ≠ biografia de família (não há fonte para inventar) |
| **[Robson de Oliveira](${robson})** | Segundo módulo; creditado por Aaron como «true star» | A [ficha da casa](${robson}) não se funde aqui |
| **Ajay Haridasse** | Quem atravessou com ajuda — força de não desistir | **Não** é o espectáculo da queda; [respeito](${respeito}) |

Os três cruzaram **juntos**. O [juntos](${juntos}) desta reta tem [elos](${elo}): dois anéis à volta de um terceiro. Sem elo, seria só multidão a passar.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [gesto](${gesto}) | O mínimo concreto: parar, puxar, carregar |
| [juntos](${juntos}) × [elo de ligação](${elo}) | Estado **com** anéis — não slogan de «todos somos um» |
| [respeito](${respeito}) · [verdade](${verdade}) | Nomear fontes; não inflar o mito |
| [caminho](${caminho}) · [risco](${risco}) | A maratona é travessia com custo; o lab não prescreve |
| [Vida](${vida}) · [eu amo a vida](${amo}) | Ficar com quem caiu à vista da fita |
| [Senna](${senna}) | Outro ofício de [risco](${risco}); **outra** ficha |
| [Palavras](${palavras}) | *Air bag* entra como eixo lexical deste cruzamento |

## O que esta ficha não é

- **Não** é relatório médico (colapso, tenda, «quads»).  
- **Não** é plano de treino nem incentivo a «salvar» no meio da prova sem juízo.  
- **Não** afirma que um airbag automóvel esteve na corrida.  
- **Não** inventa família, fé ou vida privada de Aaron, Robson ou Ajay.  
- **Não** reduz o feito a viral: o ofício é o [gesto](${gesto}), não a métrica de views.

## Veredicto

**Aprovado** como inspeção-cruzamento (Pessoas) — Aaron Beggs × Air Bag: o saco de ar **dispara**; o homem de Bangor **escolheu** amortecer. Os três cruzaram. [Valeu !!!](${mantra})

[▶ Pessoas](${hub}) · [▶ Gesto](${gesto}) · [▶ Juntos](${juntos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **cross** **Aaron Beggs × Air Bag**. The object is not only the Bangor runner or only the car cushion: it is the **map** where the device that **inflates on impact** meets the [gesture](${gesto}) that **chooses to inflate** about 200 m from the [Boston Marathon](${NBC}) tape (20 Apr 2026).

Field request: *Aaron Beggs cruze com Air Bag*. The lab honors it **without** claiming an airbag was on Boylston Street. Craft metaphor: the man as **human airbag**.

> Independent audit. Person/gesture: [BBC](${BBC}), [NBC](${NBC}), [Athletics NI](${ATH_NI}). Device: [Wikipedia · Airbag](${WIKI_AIRBAG}). No affiliation. **Sheet ≠ clinical protocol, ≠ training plan, ≠ private biography.** Close: [Valeu !!!](${mantra}).

## Inspected object

| Field | Value |
|-------|-------|
| Object | **Cross** — gesture × device |
| Person | **Aaron Beggs** — Bangor, Co. Down, Northern Ireland; North Down AC |
| Device | **Air bag** / **airbag** — EN *air* + *bag*; PT *saco de ar* |
| Date | ${inspected} |

## Hypotheses

**H1:** *airbag* names the **device**; the cross does not fuse object and man.  
**H2:** Beggs’s BudGanja value is the [gesture](${gesto}) — stopping while dozens passed — not the clock.  
**H3:** the airbag **does not choose**; Beggs **did** (watch, tape, Ajay).  
**H4:** [Robson](${robson}) is the **second bag** — “two are stronger than one”; [juntos](${juntos}) with [links](${elo}).  
**H5:** close = [respect](${respeito}) + [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Axis 1 — Air bag

Passive safety: sensors, control unit, bag that fills in milliseconds. Context: Hetrick / Linderer (1950s); Breed sensor (1968). **Limit:** it can also injure; it was **not** on the Boston straight.

## Axis 2 — Aaron Beggs

Bangor maintenance worker; North Down AC (yellow-blue vest). First to stop ~200 m out; pulled **Ajay Haridasse** (21, Northeastern) up. **[Robson de Oliveira](${robson})** (Brazil) joined. Athletics NI times: Oliveira **2:44:26** · Haridasse **2:44:32** · Beggs **2:44:36**. News Letter cites ~2:43:53 — **declared discrepancy**. He was on for a PB. He stopped.

## Cross-map

| Airbag piece | Boylston Street |
|--------------|-----------------|
| Impact sensor | The corner of the eye: Ajay falling again |
| Control unit | Watch × tape × man on the ground |
| Inflation | The body that **stops** |
| Cushion | Shoulders and [hands](${mao}) |
| Second module | Robson |
| Deflation | Medical tent (Ajay, Robson); Aaron “went for a good feed” (BBC) |

Thesis: the airbag **replaces** choice; Beggs **is** the choice.

## The three at the tape

Aaron first to inflate — not an [idol](${idolo}). [Robson](${robson}) second module — house sheet separate. Ajay who still wanted the line — **not** collapse-as-spectacle.

## Status

**Approved** as People cross-map — Aaron Beggs × Air Bag. The bag fires; the man from Bangor chose to cushion. The three crossed. [Valeu !!!](${mantra})

[▶ People](${hub}) · [▶ Gesture](${gesto}) · [▶ Juntos](${juntos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial del **cruce** **Aaron Beggs × Air Bag**. El objeto no es solo el corredor de Bangor ni solo el saco del coche: es el **mapa** donde el dispositivo que **infla en el impacto** encuentra el [gesto](${gesto}) que **elige inflar** a unos 200 m de la cinta de la [Maratón de Boston](${NBC}) (20 abr. 2026).

Pedido de campo: *Aaron Beggs cruze com Air Bag*. El laboratorio lo honra **sin** afirmar que hubiera un airbag en Boylston Street. Metáfora de oficio: el hombre como **airbag humano**.

> Auditoría independiente. Persona/gesto: [BBC](${BBC}), [NBC](${NBC}), [Athletics NI](${ATH_NI}). Dispositivo: [Wikipedia · Airbag](${WIKI_AIRBAG}). Sin afiliación. **Ficha ≠ protocolo clínico, ≠ plan de entreno, ≠ biografía íntima.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Objeto | **Cruce** — gesto × dispositivo |
| Persona | **Aaron Beggs** — Bangor, Co. Down, Irlanda del Norte; North Down AC |
| Dispositivo | **Air bag** / **airbag** — EN *air* + *bag*; PT *saco de ar* |
| Fecha | ${inspected} |

## Hipótesis

**H1:** *airbag* nombra el **dispositivo**; el cruce no fusiona objeto y hombre.  
**H2:** el valor BudGanja de Beggs es el [gesto](${gesto}) — parar cuando decenas pasaron — no el reloj.  
**H3:** el airbag **no elige**; Beggs **sí** (reloj, cinta, Ajay).  
**H4:** [Robson](${robson}) es el **segundo saco** — «two are stronger than one»; [juntos](${juntos}) con [eslabones](${elo}).  
**H5:** cierre = [respeto](${respeito}) + [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Eje 1 — Air bag

Seguridad pasiva: sensores, unidad de control, saco que se llena en milisegundos. Contexto: Hetrick / Linderer (años 1950); sensor Breed (1968). **Límite:** también puede lesionar; **no** estuvo en la recta de Boston.

## Eje 2 — Aaron Beggs

Trabajador de mantenimiento de Bangor; North Down AC (chaleco amarillo y azul). Primero en parar ~200 m antes; levantó a **Ajay Haridasse** (21, Northeastern). Se unió **[Robson de Oliveira](${robson})** (Brasil). Tiempos Athletics NI: Oliveira **2:44:26** · Haridasse **2:44:32** · Beggs **2:44:36**. *News Letter* cita ~2:43:53 — **discrepancia declarada**. Iba a marca personal. Paró.

## Mapa del cruce

| Pieza del airbag | Boylston Street |
|------------------|-----------------|
| Sensor de impacto | El rabillo del ojo: Ajay cayendo otra vez |
| Unidad de control | Reloj × cinta × hombre en el suelo |
| Inflado | El cuerpo que **para** |
| Amortiguación | Hombros y [manos](${mao}) |
| Segundo módulo | Robson |
| Desinflado | Carpa médica (Ajay, Robson); Aaron «fue a comer bien» (BBC) |

Tesis: el airbag **sustituye** la elección; Beggs **es** la elección.

## Los tres en la cinta

Aaron primero en inflar — no [ídolo](${idolo}). [Robson](${robson}) segundo módulo — ficha de la casa aparte. Ajay quien aún quería la línea — **no** espectáculo de la caída.

## Veredicto

**Aprobado** como cruce (Personas) — Aaron Beggs × Air Bag. El saco dispara; el hombre de Bangor eligió amortiguar. Los tres cruzaron. [¡Valeu !!!](${mantra})

[▶ Personas](${hub}) · [▶ Gesto](${gesto}) · [▶ Juntos](${juntos}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function nextPessoasOrder(posts) {
  const orders = posts
    .filter((p) => p && p.series === 'pessoas-historia')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function buildAaronBeggsAirBagPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildAaronBeggsAirBagBodies();
  let order = seriesOrder;
  if (order == null) {
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find(
        (p) => p.slug === 'inspecao-cruzamento-aaron-beggs-air-bag'
      );
      order =
        existing && typeof existing.seriesOrder === 'number'
          ? existing.seriesOrder
          : nextPessoasOrder(posts);
    } catch (_) {
      order = 40;
    }
  }

  return figuraPost({
    title: 'Inspeção: Cruzamento — Aaron Beggs × Air Bag',
    titleEn: 'Inspection: Cross — Aaron Beggs × Air Bag',
    titleEs: 'Inspección: Cruce — Aaron Beggs × Air Bag',
    excerpt:
      'Pessoas · cruzamento: Aaron Beggs × airbag — o saco de ar dispara no impacto; o homem de Bangor escolheu amortecer Ajay na Boylston Street (Boston 2026); Valeu !!!',
    excerptEn:
      'People · cross: Aaron Beggs × airbag — the bag fires on impact; the man from Bangor chose to cushion Ajay on Boylston Street (Boston 2026); Valeu !!!',
    excerptEs:
      'Personas · cruce: Aaron Beggs × airbag — el saco dispara en el impacto; el hombre de Bangor eligió amortiguar a Ajay en Boylston Street (Boston 2026); ¡Valeu !!!',
    slug: 'inspecao-cruzamento-aaron-beggs-air-bag',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cruzamento · airbag humano',
    coverImage: COVER,
    sourceUrl: BBC,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAaronBeggsAirBagPost,
  buildAaronBeggsAirBagBodies,
  poemPt,
  poemEn,
  poemEs
};
