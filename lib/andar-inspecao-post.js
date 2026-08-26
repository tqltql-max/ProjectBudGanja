'use strict';

/**
 * Inspeção Palavras · andar
 * Lat. ambulāre / VL *andare · o passo como ofício ·
 * fundadora do catálogo /atividades/ · MET · REM lab ≠ sono REM ·
 * Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/andar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/andar';
const WIKT_EN = 'https://en.wiktionary.org/wiki/andar#Portuguese';
const WIKT_AMBULO = 'https://en.wiktionary.org/wiki/ambulo#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Marcha_(movimento)';
const COMPENDIUM = 'https://pubmed.ncbi.nlm.nih.gov/21681120/';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
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
  return `Andar.
Não é recorde.
É o ofício do passo
que o corpo já sabe.

Um MET é o chão.
Três e meio é a conversa
que ainda cabe no peito.
Trinta minutos, se couber.

R é o tónus a descer.
E é o recado de dentro.
M é o próximo passo —
não a dose de cartaz.

Não é clínica do sono.
Não é bula de corrida.
É a porta do catálogo
onde o pé encontra o chão.

Valeu !!!
com o passo que cabe hoje.`;
}

function poemEn() {
  return `Walking.
It is not a record.
It is the craft of the step
the body already knows.

One MET is the floor.
Three-point-five is the talk
that still fits in the chest.
Thirty minutes, if it fits.

R is tone coming down.
E is the message from within.
M is the next step —
not a poster dose.

It is not a sleep clinic.
It is not a running leaflet.
It is the catalog’s door
where the foot meets the ground.

Valeu !!!
with the step that fits today.`;
}

function poemEs() {
  return `Andar.
No es récord.
Es el oficio del paso
que el cuerpo ya sabe.

Un MET es el suelo.
Tres y medio es la charla
que aún cabe en el pecho.
Treinta minutos, si cabe.

R es el tono que baja.
E es el recado de dentro.
M es el próximo paso —
no la dosis de cartel.

No es clínica del sueño.
No es prospecto de carrera.
Es la puerta del catálogo
donde el pie encuentra el suelo.

¡Valeu !!!
con el paso que cabe hoy.`;
}

function buildAndarBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-andar.html';
  const cat = '/atividades/';
  const rem = '/posts/post-inspecao-palavra-sinais-rem.html';
  const remo = '/posts/post-inspecao-palavra-remo.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const marcha = '/posts/post-inspecao-expressao-meter-marcha.html';
  const ciclo = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const meditacao = '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html';
  const modulacao = '/posts/post-inspecao-guia-canabimeticos-modulacao.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const vida = '/vida/';
  const plantas = '/plantas/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da **[andar](${self})** — o **passo como ofício**, não o recorde. Pedido de campo: *inspeção na actividade de andar* + *página dedicada a actividades físicas com indicação de REM*.

Duas salas, um pé. Esta ficha é a **fundadora**. A página dedicada é o catálogo **[Atividades](${cat})**, onde cada gesto traz **MET** (equivalente metabólico) e **REM de ofício** — [Relaxamento · Endocanabinoide · Modular](${rem}). O sono *Rapid Eye Movement* é **outra coluna** da mesma sigla; não se funde aqui.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · andar](${WIKT}), [andar (EN)](${WIKT_EN}), lat. [*ambulō*](${WIKT_AMBULO}), [Marcha](${WIKI}), [Compendium of Physical Activities 2011](${COMPENDIUM}), ficha [sinais REM](${rem}), grade XIV (exercício ~30 min e ↑ AEA, literacia observacional). **Ficha ≠ plano de treino, ≠ clínica do sono, ≠ bula, ≠ prescrição.** Série [Palavras](${hub}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *andar* / *caminhar* / *walk* / *passear* / *dar um passo*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **andar** (verbo) |
| Classe | Verbo (também subst.: o andar de um prédio — **outra sala**) |
| Étimo (trabalho) | lat. *ambulāre* «passear, ir» / lat. vulg. *andare* (it. *andare*, esp. *andar*) — confiança: **média-alta**; o étimo exacto do *andare* romance debate-se |
| Cognatos | esp. *andar* · it. *andare* · fr. *aller* (outra via) · ing. *amble* (de *ambulāre*) |
| Tipo BudGanja | Palavra + **actividade física** — fundadora de [Atividades](${cat}) |
| MET âncora | **3,5** — andar ~4,8 km/h (3 mph), piso firme, plano ([Compendium 2011](${COMPENDIUM}), código 17190) |
| Intensidade OMS | **Moderada** (3,0–5,9 MET) |
| REM lab | **R** tónus que desce sem apagar · **E** via endógena de ~30 min · **M** ritmo, piso, regularidade |
| Não é | [caminho](${caminho}) (o chão) · [correr](${cat}) (outro MET) · [meter marcha](${marcha}) (caixa do carro) · [remo](${remo}) (a pá) · sono REM |
| Data | ${inspected} |
| Fonte | [andar](${WIKT}) |

**O que é o objecto:** o **gesto de pôr um pé à frente do outro** com o corpo em carga — o [gesto](${gesto}) mínimo da locomoção humana. No lab, andar é a **porta** do catálogo: acessível, mensurável em MET, e a via mais honesta para falar de **endocanabinoides sem bula**.

## 2. Hipóteses e método

**H1:** *andar* herda o ir romano (*ambulāre*) — há **deslocação**, não pose.  
**H2:** o [caminho](${caminho}) é o chão; o **andar** é o ofício sobre o chão.  
**H3:** **MET** mede o custo; **REM lab** lê o ofício (R·E·M); **sono REM** é fase da noite — três instrumentos, não um.  
**H4:** ~30 min de esforço contínuo (aula XIV: corrida/bike) é **literacia de biomarcador** (↑ AEA), não receita; o andar moderado é o **degrau que cabe**.  
**H5:** [Valeu !!!](${mantra}) = o passo **possível hoje**, não o recorde.

Passos: (1) étimo e cortes; (2) MET; (3) REM lab e sono; (4) tabela de andares; (5) rede; (6) limites.

## 3. Origens e cortes

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| lat. *ambulāre* | Passear, ir a pé — raiz visível em *amável/ambulatório/amble* | Alta para a família; o verbo PT pode chegar pelo romance *andare* |
| lat. vulg. *andare* | It. *andare*, esp./pt. *andar* — étimo interno do *andare* **discutido** (não fingir unanimidade) | Média |
| Subst. **andar** (piso) | O «andar» do prédio — mesma grafia, **sala da casa**, não da estrada | Alta (polissemia) |
| *Andar a + inf.* | Progressivo PT («andar a fazer») — auxiliar de aspecto, não MET | Alta |

**Cortes obrigatórios**

| Isto | Não é |
|------|--------|
| **Andar** (passo) | **[Caminho](${caminho})** — o chão onde se anda |
| Andar | **Correr** — outro MET, outra letra R |
| Andar | **[Meter marcha](${marcha})** — caixa do carro; metáfora de arranque |
| Andar | **[Ando, indo, vindo, voltando](${ciclo})** — ciclo oral, não Compendium |
| Andar | **[Remo](${remo})** — pá náutica; o lapso *rEMO* não é este verbo |
| Andar | **Andar** (piso do edifício) |
| **REM lab** | **Sono REM** — ver [sinais REM](${rem}) |

## 4. MET — a indicação de esforço

**1 MET** ≈ consumo de oxigénio em **repouso** (~3,5 mL O₂·kg⁻¹·min⁻¹). A actividade mede-se em **múltiplos** desse chão. Fonte de trabalho: [Ainsworth et al., Compendium 2011](${COMPENDIUM}). Valores **médios**; o custo real muda com peso, piso, ladeira, carga e condição.

Fórmula de literacia (não app de calorias):

> **kcal ≈ MET × massa (kg) × tempo (h)**  
> Ex.: 70 kg × 3,5 MET × 1 h ≈ **245 kcal**.

| Andar | ~velocidade | MET | Intensidade |
|-------|-------------|-----|-------------|
| Devagar | 3,2 km/h (2 mph) | **2,8** | leve |
| Moderado (âncora) | 4,8 km/h (3 mph) | **3,5** | moderada |
| Depressa (brisk) | 5,6 km/h (3,5 mph) | **4,3** | moderada |
| Muito depressa | 6,4 km/h (4 mph) | **5,0** | moderada |
| Ladeira / carga | varia | **5–8** | moderada a vigorosa |
| Subir escadas (contínuo) | — | **~8,8** | vigorosa |

OMS (literacia): **leve** < 3 MET · **moderada** 3,0–5,9 · **vigorosa** ≥ 6. O andar âncora (**3,5**) cabe no meio — conversável, sustentável, sem teatro de ginásio.

O catálogo **[Atividades](${cat})** aplica a mesma régua a correr, pedalar, nadar, yoga, remar, cultivar e pausar.

## 5. REM do laboratório (R · E · M)

Não confundir com [remo](${remo}). A sigla de ofício está em [sinais REM](${rem}):

| Letra | Nome | No andar |
|-------|------|----------|
| **R** | Relaxamento | O tónus **desce um pouco** depois do passo certo — sem desligar a [vida](${vida}). Andar vigoroso demais **adia** o R. |
| **E** | Endocanabinoide | O corpo **já** faz AEA / 2-AG. Exercício contínuo (~30 min na grade XIV, sobretudo corrida/bike) aparece ligado a **↑ AEA** em estudos observacionais (Sparling 2003; Raichlen et al.). O andar **moderado contínuo** é o degrau que o lab indica — **não** equivalente milimétrico da corrida. |
| **M** | Modular | Ritmo, duração, piso, regularidade, pausa. Não existe «dose de andar» em cartaz. O próximo [gesto](${gesto}) ajusta-se. |

**H aplicada:** o andar é a actividade em que as **três letras cabem no mesmo dia** — R possível, E ao alcance, M simples (sair e voltar). Correr empurra o E e aperta o R. [Meditação](${meditacao}) / [nap](${nap}) empurram o R e quase não mexem no MET.

## 6. Sono REM — a outra coluna

O **sono REM** (*Rapid Eye Movement*) é fase da noite: olhos rápidos, atonia, sonho frequente. Exercício **regular e moderado** associa-se, em revisões, a melhor qualidade de sono; esforço **muito intenso ou tardio** pode **atrasar** o REM dessa noite.

Regra de ofício: **andar de dia** pode **servir a noite**; **andar a substituir a cama** não. O [nap](${nap}) curto é irmão — não é a noite REM completa. Quem quiser laudo, vai a profissional. Ver [sinais REM](${rem}).

## 7. Rede

| Tema | Recurso |
|------|---------|
| Catálogo | **[Atividades](${cat})** — MET + REM em cada ficha |
| Sigla | [sinais REM](${rem}) — dois REM cortados |
| Chão | [caminho](${caminho}) · [gesto](${gesto}) · [ação](${acao}) |
| Arranque | [Meter marcha](${marcha}) — metáfora; o pé é esta ficha |
| Ciclo oral | [ando, indo, vindo, voltando](${ciclo}) |
| Via endógena | [Guia meditação × eCBome](${meditacao}) · [modulação](${modulacao}) |
| Pausa | [nap](${nap}) · [Vida](${vida}) |
| Ofício de terra | [Plantas](${plantas}) — cultivar também tem MET |
| Pá ≠ sigla | [remo](${remo}) |
| Língua | [língua portuguesa](${lingua}) · [verdade](${verdade}) · [risco](${risco}) |

## 8. Limites

- MET de tabela **não** é o teu MET. Peso, ladeira, calor, joelho e hábito mudam o custo.  
- ↑ AEA com exercício é **literatura e aula XIV**, não garantia pessoal nem «legalizar o passo».  
- **Não** é plano de treino, **não** é fisioterapia, **não** é clínica do sono. Dor, tontura, peito: parar e procurar cuidado.  
- Andar **não** apaga [risco](${risco}) metabólico sozinho nem substitui o que o médico já disse.  
- O substantivo *andar* (piso) e o progressivo *andar a* ficam **fora** do Compendium.

## 9. Veredicto

**Andar** é o **ofício do passo**. MET âncora **3,5**. REM lab: o R cabe, o E aproxima-se aos ~30 min contínuos, o M é o chão de todos os dias. O sono REM é **outra coluna**. A página **[Atividades](${cat})** guarda as irmãs com a mesma indicação.

**Aprovado em Palavras.** Fundadora de [Atividades](${cat}). Salas cortadas. [Valeu !!!](${mantra})

## Poema do laboratório

\`\`\`poem
${poemPt()}
\`\`\`
`;

  const contentEn = `## Scope

Inspection of Portuguese **[andar](${self})** — the **step as craft**, not a record. Field request: *inspect walking* + *a dedicated physical-activity page with REM indication*.

Two rooms, one foot. This sheet is the **founder**. The dedicated page is **[Atividades](${cat})**, where each gesture carries **MET** and **lab REM** — [Relaxation · Endocannabinoid · Modular](${rem}). *Rapid Eye Movement* sleep is **another column** of the same letters.

> **Method note:** independent audit. Sources: [Wiktionary · andar](${WIKT_EN}), Lat. [*ambulō*](${WIKT_AMBULO}), [2011 Compendium](${COMPENDIUM}), [sinais REM](${rem}), Book XIV (~30 min exercise and ↑ AEA, observational literacy). **Not a training plan, sleep clinic, leaflet or prescription.**

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **andar** (verb) |
| Etymon (working) | Lat. *ambulāre* / Vulgar Lat. *andare* — **medium-high**; the inner etymon of Romance *andare* is debated |
| Anchor MET | **3.5** — walking ~3 mph, level, firm (Compendium 17190) |
| Lab REM | **R** tone that drops without shutting off · **E** endogenous window ~30 min · **M** pace, ground, regularity |
| Date | ${inspected} |

**Cuts:** walking ≠ [caminho](${caminho}) (the ground) ≠ running ≠ [meter marcha](${marcha}) ≠ building storey ≠ [remo](${remo}) ≠ REM sleep.

## 2. MET

**1 MET** ≈ resting oxygen cost. kcal ≈ MET × kg × hours. Anchor walk **3.5 MET** = moderate (WHO 3.0–5.9). Slow ~2.8; brisk ~4.3; stairs ~8.8. Catalog: **[Atividades](${cat})**.

## 3. Lab REM versus sleep REM

[Sinais REM](${rem}): **R** relaxation after the right step; **E** endogenous AEA/2-AG (XIV / Sparling / Raichlen — literacy, not a dose); **M** modulate pace and pause. Sleep REM is a **night phase**; regular moderate movement may help sleep, late all-out effort may delay that night’s REM. [Nap](${nap}) is a sibling, not the whole night.

## 4. Verdict

Walking is the **craft of the step**. MET **3.5**. Lab REM fits in one day. Sleep REM stays in its column. **[Atividades](${cat})** holds the sisters.

**Passed in Words.** [Valeu !!!](${mantra})

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`
`;

  const contentEs = `## Alcance

Inspección de **[andar](${self})** — el **paso como oficio**, no el récord. Pedido: *inspeccionar el andar* + *página de actividades físicas con indicación de REM*.

Dos salas, un pie. Esta ficha es la **fundadora**. La página es **[Atividades](${cat})**, con **MET** y **REM de oficio** — [Relajación · Endocanabinoide · Modular](${rem}). El sueño *Rapid Eye Movement* es **otra columna**.

> **Nota:** auditoría independiente. Fuentes: [Wikcionario](${WIKT}), [Compendium 2011](${COMPENDIUM}), [sinais REM](${rem}), grado XIV. **No es plan de entreno, clínica del sueño ni prospecto.**

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **andar** (verbo) |
| Étimo (trabajo) | lat. *ambulāre* / lat. vulg. *andare* — **media-alta** |
| MET ancla | **3,5** — andar ~4,8 km/h, piso firme (Compendium 17190) |
| REM lab | **R** tono que baja · **E** vía endógena ~30 min · **M** ritmo, piso, regularidad |
| Fecha | ${inspected} |

**Cortes:** andar ≠ [caminho](${caminho}) ≠ correr ≠ [meter marcha](${marcha}) ≠ piso del edificio ≠ [remo](${remo}) ≠ sueño REM.

## 2. MET

**1 MET** ≈ coste de reposo. kcal ≈ MET × kg × horas. Andar ancla **3,5 MET** = moderado. Catálogo: **[Atividades](${cat})**.

## 3. REM lab y sueño REM

[Sinais REM](${rem}): las tres letras caben en el andar cotidiano. El sueño REM es fase de la noche. El [nap](${nap}) es hermano, no la noche entera.

## 4. Veredicto

Andar es el **oficio del paso**. MET **3,5**. El sueño REM queda en su columna. **[Atividades](${cat})** guarda las hermanas.

**Aprobado en Palabras.** [¡Valeu !!!](${mantra})

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`
`;

  return { body, contentEn, contentEs };
}

function buildAndarPost() {
  const { body, contentEn, contentEs } = buildAndarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-andar', 331);
  return makePalavra({
    title: 'Inspeção: Andar — o passo, o MET e o REM de ofício',
    titleEn: 'Inspection: Andar — the step, MET, and craft REM',
    titleEs: 'Inspección: Andar — el paso, el MET y el REM de oficio',
    excerpt:
      'Palavras: andar — passo como ofício; MET 3,5; REM lab (Relaxamento·Endocanabinoide·Modular) ≠ sono REM; catálogo /atividades/; Valeu !!!',
    excerptEn:
      'Words: andar — step as craft; MET 3.5; lab REM (Relaxation·Endocannabinoid·Modular) ≠ REM sleep; catalog /atividades/; Valeu !!!',
    excerptEs:
      'Palabras: andar — paso como oficio; MET 3,5; REM lab (Relajación·Endocanabinoide·Modular) ≠ sueño REM; catálogo /atividades/; ¡Valeu !!!',
    slug: 'inspecao-palavra-andar',
    date: '2026-08-24T13:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Andar · palavra · actividades',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAndarPost,
  buildAndarBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  COVER
};
