'use strict';

/**
 * Inspeção Palavras · comprimento × distância × relatividade
 * Três salas, uma página: a vara, o vão, a teoria que as mede com o observador.
 * Pedido: inspeção em comprimento, distância e relatividade.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/comprimento-distancia-relatividade-palavra-cover.jpg';
const WIKT_COMP = 'https://pt.wiktionary.org/wiki/comprimento';
const WIKT_DIST = 'https://pt.wiktionary.org/wiki/dist%C3%A2ncia';
const WIKT_REL = 'https://pt.wiktionary.org/wiki/relatividade';
const WIKT_COMPLEO = 'https://en.wiktionary.org/wiki/compleo#Latin';
const WIKT_DISTANTIA = 'https://en.wiktionary.org/wiki/distantia#Latin';
const WIKT_RELATIVUS = 'https://en.wiktionary.org/wiki/relativus#Latin';
const WIKI_SR = 'https://pt.wikipedia.org/wiki/Relatividade_restrita';
const WIKI_GR = 'https://pt.wikipedia.org/wiki/Relatividade_geral';
const WIKI_LC = 'https://pt.wikipedia.org/wiki/Contra%C3%A7%C3%A3o_do_espa%C3%A7o';

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

function poemPt() {
  return `Comprimento.
A vara no próprio.

Distância.
O vão entre dois pontos.

Relatividade.
O metro muda de comboio
e a luz não muda de ofício.

Não é cumprimento.
Não é relativismo.
Não é «tudo vale».

O intervalo é o que resta
quando o observador passa.

Valeu !!!
medir com o quadro à vista.`;
}

function poemEn() {
  return `Length.
The rod at rest.

Distance.
The gap between two points.

Relativity.
The metre changes trains
and light does not change jobs.

Not a greeting.
Not relativism.
Not “anything goes”.

The interval is what remains
when the observer passes.

Valeu !!!
measure with the frame in sight.`;
}

function poemEs() {
  return `Longitud.
La vara en su propio.

Distancia.
El vano entre dos puntos.

Relatividad.
El metro cambia de tren
y la luz no cambia de oficio.

No es saludo.
No es relativismo.
No es «todo vale».

El intervalo es lo que queda
cuando el observador pasa.

¡Valeu !!!
medir con el marco a la vista.`;
}

function buildBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-comprimento-distancia-relatividade.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const cordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const parabola = '/posts/post-inspecao-palavra-parabola.html';
  const missao = '/posts/post-inspecao-expressao-missao-comprida.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do trio **[comprimento](${self})** · **[distância](${self})** · **[relatividade](${self})** — três vocábulos, **uma página**. Pedido de campo: inspeccionar *comprimento, distância e relatividade*. A ficha **separa** o que a fala junta: a **extensão de um objecto**, o **vão entre dois pontos**, e a **teoria** (Einstein, 1905 / 1915) que diz que essas medidas **dependem do quadro** do observador — sem transformar isso em «tudo é relativo».

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · comprimento](${WIKT_COMP}), [distância](${WIKT_DIST}), [relatividade](${WIKT_REL}), lat. [*compleō*](${WIKT_COMPLEO}), [*distantia*](${WIKT_DISTANTIA}), [*relātīvus*](${WIKT_RELATIVUS}), [relatividade restrita](${WIKI_SR}), [geral](${WIKI_GR}), [contração do espaço](${WIKI_LC}). Método: [etimologia](${etimologia}). **Ficha ≠ curso de tensores, ≠ filosofia do relativismo, ≠ manual de GPS.** Sem afiliação a institutos. Fecho: [Valeu !!!](${mantra}).

![Capa editorial — comprimento, distância e relatividade](${COVER})

*Três ofícios no mesmo quadro: a vara (comprimento próprio), o vão (distância), o cone da [luz](${luz}) (c). A capa é mapa, não prova.*

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Trio | **comprimento** × **distância** × **relatividade** |
| Classes | Substantivos |
| Étimos (trabalho) | lat. *complēre* / *complētus* → *comprido* → **comprimento** · lat. *distantia* ← *distāre* (*dis-* + *stāre*) → **distância** · lat. *relātīvus* ← *relātus* (*referre*) → **relatividade** — confiança **alta** nas rotas |
| Prima perigosa | **cumprimento** (saudação / acto de cumprir) — mesmo avô *complēre*; ofício **outro** — ver [missão comprida](${missao}) |
| Falso amigo de discurso | **relativismo** (filosofia: «não há [verdade](${verdade})») ≠ relatividade (física) |
| Prima lexical | [relação](${relacao}) — mesmo tronco *referre*; ofício de **vínculo**, não de teoria |
| Vizinha geográfica | **longitude** — meridiano, não a vara |
| Tipo BudGanja | Palavra — medida da coisa × vão × teoria do quadro |
| Elos | [tempo](${tempo}) · [luz](${luz}) · [caminho](${caminho}) · [teoria das cordas](${cordas}) · [parábola](${parabola}) |
| Fonte | [comprimento](${WIKT_COMP}) · [distância](${WIKT_DIST}) · [relatividade](${WIKT_REL}) |
| Data | ${inspected} |

**O que é o objecto:** três nomes que a física do século XX **amarrou**. No português do dia, comprimento é «quanto mede a vara»; distância é «quanto há daqui até ali». Na relatividade, as duas **deixam de ser absolutas** — e o que **não** muda é a velocidade da [luz](${luz}) no vácuo e o **intervalo** do espaço-[tempo](${tempo}).

## 2. Três salas

| Sala | Ofício | Inglês | O que **não** é |
|------|--------|--------|-----------------|
| **A. Comprimento** | Extensão de **um** [objecto](${objetos}) (ponta a ponta) | *length* | Distância entre cidades; cumprimento (saudação); longitude |
| **B. Distância** | Vão **entre** dois pontos / sítios | *distance* | O tamanho da coisa; o [caminho](${caminho}) percorrido (pode ser mais longo que o vão) |
| **C. Relatividade** | Teoria: leis iguais em todos os referenciais inerciais; *c* invariante | *relativity* | Relativismo; [relação](${relacao}); «opinião de cada um» |

**H1:** comprimento e distância **não** são sinónimos — um é da **coisa**; o outro é do **entre**.  
**H2:** relatividade **não** autoriza o slogan «tudo é relativo»: o que é relativo são certas **medidas**; *c* e o intervalo são o ofício duro.  
**H3:** cumprimento × comprimento partilham *complēre* e **separam** o ofício — a [missão comprida](${missao}) já cortou o u e o o.

## 3. Sala A — comprimento

Latim *complēre* «encher até ao bordo» → particípio *complētus* «cheio / completo» → PT *comprido* («de ponta a ponta cheio» → **longo**) → *comprimento* (o **quanto** de longo). O inglês foi por outra porta (*length* ← germ. *long*). O espanhol diz *longitud* para a grandeza e *largo* para o adjectivo — o português **guardou** *comprimento* para a vara e *longitude* para o mapa.

| Peça | Ofício |
|------|--------|
| **Comprimento próprio** | O da vara **no quadro em que ela está parada** — o máximo |
| **Contração de Lorentz** | No quadro em que a vara **corre**, o comprimento medido **encolhe** só na direcção do movimento |
| **Mapa (não caderno)** | *L = L₀ √(1 − v²/c²)* — quanto mais perto de *c*, mais curto o metro móvel |

O [gesto](${gesto}) de medir uma vara em movimento **não** é o mesmo gesto de medi-la em casa. A ficha nomeia a diferença; **não** deriva a fórmula.

## 4. Sala B — distância

Latim *distantia* «o estar-apartado» ← *distāre* (*dis-* «à parte» + *stāre* «estar de pé»). Distância é o **vão**. Dois pontos, um número. Não é o objecto. Não é necessariamente o [caminho](${caminho}): o caminho pode **dobrar**; a distância (em linha, no mapa combinado) é o vão.

Na [parábola](${parabola}) (sala da curva), cada ponto está **à mesma distância** do foco e da directriz — aqui *distância* é o ofício geométrico, não a teoria de Einstein.

No espaço-[tempo](${tempo}), o vão que **não** depende do observador é o **intervalo** (Minkowski): mistura comprimento e tempo com o sinal certo. A ficha **aponta** o intervalo; **não** o calcula.

| Distância | Comprimento | Caminho |
|-----------|-------------|---------|
| Entre A e B | De um [objecto](${objetos}) | O rasto que se **percorre** |
| Pode ser recta | Ponta a ponta da coisa | Pode ser mais longo que o vão |
| *distantia* | *complēre* → comprido | [caminho](${caminho}) |

## 5. Sala C — relatividade

*Relatividade* ← *relativo* ← lat. *relātīvus* «que se refere / que se reporta». Em física, o nome **não** quer dizer «subjectivo». Quer dizer: as medidas de [tempo](${tempo}) e de comprimento **referem-se a um quadro**; as **leis** e a velocidade da [luz](${luz}) **não** escolhem quadro.

| Camada | Ano / recorte | Ofício | Confiança |
|--------|----------------|--------|-----------|
| **Restrita (especial)** | 1905, Einstein | Referenciais inerciais; *c* constante; dilatação do [tempo](${tempo}); contração do comprimento; simultaneidade relativa | Alta (teoria + testes) |
| **Geral** | 1915, Einstein | Gravidade = curvatura do espaço-[tempo](${tempo}) | Alta (teoria + testes: GPS, lentes, ondas) |
| **Slogan popular** | «tudo é relativo» | Vulgarização — **corta** o ofício | Folclórica |
| **Relativismo** | Filosofia | Outra palavra, outro tribunal | Fora desta ficha |
| **[Teoria das cordas](${cordas})** | Programa posterior | Candidata a juntar quântica e relatividade **geral** | Objectivo; êxito em aberto |

**H4:** a simultaneidade («aconteceu ao mesmo tempo») também é relativa — irmã do comprimento e do [tempo](${tempo}).  
**H5:** GPS no bolso **usa** as duas relatividades; isso é ofício de engenharia, não prova de opinião.

### O que é relativo × o que não é

| Relativo ao quadro | Invariante (ofício duro) |
|--------------------|--------------------------|
| Comprimento medido da vara em movimento | Comprimento **próprio** |
| Duração do relógio em movimento | Tempo **próprio** |
| Distância e tempo **separados** ao gosto do comboio | Intervalo do espaço-[tempo](${tempo}) |
| «Ao mesmo tempo» em sítios distantes | *c* no vácuo |

## 6. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **comprimento** | Qualquer medida no espaço | Extensão da **coisa** |
| **cumprimento** | O mesmo vocábulo | Saudação / acto de cumprir — [missão comprida](${missao}) |
| **distância** | Sinónimo de comprimento | Vão **entre** |
| **relatividade** | «Cada um tem a sua [verdade](${verdade})» | Teoria física do quadro |
| **relativismo** | O mesmo | Filosofia — **outra** ficha, se um dia existir |
| **[relação](${relacao})** | Prima óbvia | Vínculo; não a teoria |
| **longitude** | «comprimento no mapa» | Coordenada geográfica |

**H6:** *complēre* deu as duas portas PT (*comprido* / *cumprir*); o [risco](${risco}) é fundi-las na orelha.  
**H7:** *relātus* deu *relação*, *relativo* e *relatividade* — família **não** é sinónimo.

## 7. Rede (só fichas existentes)

| Ficha | Relação com o trio |
|-------|---------------------|
| [Tempo](${tempo}) | Par da contração: dilatação. O relógio móvel atrasa; a vara móvel encolhe |
| [Luz](${luz}) | *c* — o ofício que **não** muda de comboio |
| [Caminho](${caminho}) | Percurso ≠ vão; o intervalo é outro ofício |
| [Parábola](${parabola}) | Distância foco–directriz — geometria, não Lorentz |
| [Teoria das cordas](${cordas}) | Programa que **mira** a relatividade geral + quântica |
| [Missão comprida](${missao}) | Corte cumprimento × comprimento no trocadilho |
| [Relação](${relacao}) | Prima de *referre* — vínculo, não Einstein |
| [Objectos](${objetos}) | Quem **tem** comprimento |
| [Verdade](${verdade}) | A vulgarização «tudo é relativo» **não** substitui a verificação |
| [Língua portuguesa](${lingua}) · [latim](${latim}) | Solo e avô |

## 8. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor metro **deste** quadro, com o quadro **nomeado** |
| Anti-armadilha | «Tudo é relativo» sem quadro = slogan · fundir cumprimento e comprimento = orelha · fundir vão e vara = mapa torto |
| Par vivo | [tempo](${tempo}) · [luz](${luz}) · [caminho](${caminho}) |

**Veredicto:** comprimento da coisa, distância do entre, relatividade do **quadro**. O metro muda de comboio; a [luz](${luz}) não muda de ofício. [Valeu !!!](${mantra}) com o referencial à vista.

## Hipóteses (síntese)

**H1:** objecto = trio de ofícios, não um vocábulo só.  
**H2:** *complēre* → comprimento; *distāre* → distância; *relātīvus* → relatividade (rotas altas).  
**H3:** cumprimento é prima, não sinónimo — [missão comprida](${missao}).  
**H4:** relatividade ≠ relativismo ≠ [relação](${relacao}).  
**H5:** elos = [tempo](${tempo}) · [luz](${luz}) · [caminho](${caminho}) · [teoria das cordas](${cordas}).  
**H6:** fecho = [Valeu !!!](${mantra}) com o quadro nomeado.

## Limites

- Não é aula de relatividade (sem tensores, sem derivar Lorentz, sem arbitrário académico).  
- Não é GPS tutorial nem prova experimental.  
- Não é tratado de relativismo filosófico.  
- Não funde cumprimento, longitude e comprimento.  
- O poema é **criação do laboratório**.

## Status

**Aprovado** — **comprimento × distância × relatividade** fichados: três salas, cortes (cumprimento, relativismo, relação, longitude), rede com [tempo](${tempo}), [luz](${luz}), [caminho](${caminho}) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tempo](${tempo}) · [▶ Luz](${luz}) · [▶ Caminho](${caminho}) · [▶ Teoria das cordas](${cordas}) · [▶ Missão comprida](${missao}) · [▶ Todas as inspeções](${hubAll}) · [▶ Guia](${guia}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the trio **[comprimento](${self})** · **[distância](${self})** · **[relatividade](${self})** — three Portuguese words, **one page**. Field request: inspect *length, distance and relativity*. The sheet **cuts** what casual speech glues: the **extent of one object**, the **gap between two points**, and the **theory** (Einstein 1905 / 1915) that those measures **depend on the observer’s frame** — without turning that into “everything is relative”.

> Independent audit. [comprimento](${WIKT_COMP}), [distância](${WIKT_DIST}), [relatividade](${WIKT_REL}), Lat. [*compleō*](${WIKT_COMPLEO}), [*distantia*](${WIKT_DISTANTIA}), [*relātīvus*](${WIKT_RELATIVUS}), [special relativity](${WIKI_SR}), [general](${WIKI_GR}). Method: [etymology](${etimologia}). **Sheet ≠ tensor course, ≠ philosophical relativism, ≠ GPS manual.** Close: [Valeu !!!](${mantra}).

## Three rooms

| Room | Craft | English | Not |
|------|--------|---------|-----|
| **A. Comprimento** | Extent of **one** [object](${objetos}) | *length* | Distance between cities; *cumprimento* (greeting); longitude |
| **B. Distância** | Gap **between** two points | *distance* | The thing’s size; a [path](${caminho}) may be longer than the gap |
| **C. Relatividade** | Same laws in every inertial frame; *c* invariant | *relativity* | Relativism; [relação](${relacao}); “each opinion” |

**Length contraction:** the rod is longest in its rest frame (*proper length*). In a frame where it moves, the measured length shrinks along the motion. Map (not a problem set): *L = L₀ √(1 − v²/c²)*.

**What is relative / what is not:** measured length and duration depend on the frame; **proper** length and time, the spacetime **interval**, and *c* in vacuum do not “vote”. [Time](${tempo}) dilation is the twin of length contraction. [Light](${luz}) does not change jobs when the train does.

**Cuts:** *cumprimento* (greeting / fulfillment) shares *complēre* with *comprimento* — other office; see [missão comprida](${missao}). Relativism is philosophy. [Relação](${relacao}) is a bond, not Einstein.

## Valeu !!!

Best metre **of this frame**, with the frame **named**. “Everything is relative” with no frame is a slogan.

## Status

**Approved** — three rooms; cuts; network with [tempo](${tempo}), [luz](${luz}), [caminho](${caminho}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Time](${tempo}) · [▶ Light](${luz}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial del trío **[comprimento](${self})** · **[distância](${self})** · **[relatividade](${self})** — tres vocablos portugueses, **una página**. Pedido: inspeccionar *longitud, distancia y relatividad*. La ficha **separa** lo que el habla pega: la **extensión de un objeto**, el **vano entre dos puntos**, y la **teoría** (Einstein 1905 / 1915) de que esas medidas **dependen del marco** del observador — sin convertirlo en «todo es relativo».

> Auditoría independiente. [comprimento](${WIKT_COMP}), [distância](${WIKT_DIST}), [relatividade](${WIKT_REL}), lat. [*compleō*](${WIKT_COMPLEO}), [*distantia*](${WIKT_DISTANTIA}), [*relātīvus*](${WIKT_RELATIVUS}). Método: [etimología](${etimologia}). **Ficha ≠ curso de tensores, ≠ relativismo filosófico, ≠ manual de GPS.** Cierre: [¡Valeu !!!](${mantra}).

## Tres salas

| Sala | Oficio | Inglés | No es |
|------|--------|--------|-------|
| **A. Comprimento** | Extensión de **un** [objeto](${objetos}) | *length* | Distancia entre ciudades; *cumprimento* (saludo); longitud geográfica |
| **B. Distância** | Vano **entre** dos puntos | *distance* | El tamaño de la cosa; el [camino](${caminho}) puede ser más largo |
| **C. Relatividade** | Leyes iguales en todo marco inercial; *c* invariante | *relativity* | Relativismo; [relação](${relacao}); «cada opinión» |

**Contracción de la longitud:** la vara es máxima en su marco en reposo (*longitud propia*). En el marco donde se mueve, la medida encoge en la dirección del movimiento.

**Cortes:** *cumprimento* comparte *complēre* con *comprimento* — otro oficio; ver [missão comprida](${missao}). El relativismo es filosofía. [Relação](${relacao}) es vínculo, no Einstein. El [tiempo](${tempo}) se dilata; la [luz](${luz}) no cambia de oficio.

## ¡Valeu !!!

El mejor metro **de este marco**, con el marco **nombrado**.

## Estado

**Aprobado** — tres salas; cortes; red con [tempo](${tempo}), [luz](${luz}), [caminho](${caminho}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Tiempo](${tempo}) · [▶ Luz](${luz}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildComprimentoDistanciaRelatividadePost() {
  const { body, contentEn, contentEs } = buildBodies();
  const seriesOrder = pickOrder('inspecao-palavra-comprimento-distancia-relatividade', 322);
  return makePalavra({
    title: 'Inspeção: Comprimento, Distância e Relatividade — o metro depende do quadro',
    titleEn: 'Inspection: Length, Distance and Relativity — the metre depends on the frame',
    titleEs: 'Inspección: Longitud, Distancia y Relatividad — el metro depende del marco',
    excerpt:
      'Palavras: comprimento × distância × relatividade — vara, vão e teoria do quadro; ≠ cumprimento ≠ relativismo; c não muda de ofício; Valeu !!!',
    excerptEn:
      'Words: comprimento × distância × relatividade — rod, gap and frame theory; ≠ greeting ≠ relativism; c does not change jobs; Valeu !!!',
    excerptEs:
      'Palabras: comprimento × distância × relatividade — vara, vano y teoría del marco; ≠ saludo ≠ relativismo; c no cambia de oficio; ¡Valeu !!!',
    slug: 'inspecao-palavra-comprimento-distancia-relatividade',
    date: '2026-08-24T12:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Comprimento · Distância · Relatividade',
    coverImage: COVER,
    sourceUrl: WIKT_REL,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildComprimentoDistanciaRelatividadePost,
  buildBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_COMP,
  WIKT_DIST,
  WIKT_REL,
  WIKT_COMPLEO,
  WIKT_DISTANTIA,
  WIKT_RELATIVUS,
  WIKI_SR,
  WIKI_GR,
  WIKI_LC
};
