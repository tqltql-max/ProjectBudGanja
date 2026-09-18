'use strict';

/**
 * Inspeção Expressões · slow motion
 * Loan EN · calco câmera / câmara lenta ·
 * motion ≠ emotion · slow ≠ insulto · ≠ time-lapse ·
 * o gesto esticado no ecrã. Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/slow-motion-cover.jpg';
const WIKI = 'https://en.wikipedia.org/wiki/Slow_motion';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/C%C3%A2mera_lenta';
const WIKT = 'https://en.wiktionary.org/wiki/slow_motion';
const WIKT_SLOW = 'https://en.wiktionary.org/wiki/slow';
const WIKT_MOTION = 'https://en.wiktionary.org/wiki/motion';

function pickExprOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemSlowMotionPt() {
  return `Slow motion.
Não pedimos o relógio emprestado —
pedimos o ofício de esticar o gesto
até a orelha conseguir ler.

Houve um projector que atrasou a fita.
Houve câmaras a gravar a mais
para o ecrã devolver a menos.
Houve o peito a achar que o dia parou —
e o dia não parou.

Motion não é emotion.
Slow não é insulto.
Time-lapse é o contrário:
o mesmo caminho, outra pressa.

Faça o melhor!

Porque toda vez que alguém nomeia
o instante sem o congelar,
o universo cresce um pouco:
um frame a mais,
um dossel a mais,
uma rua onde o gesto ainda cabe
no tempo que é.`;
}

function poemSlowMotionEn() {
  return `Slow motion.
We do not borrow the clock —
we ask for the craft of stretching the gesture
until the ear can read it.

There was a projector that delayed the ribbon.
There were cameras that shot more frames
so the screen could give fewer back.
There was a chest that thought the day had stopped —
and the day had not.

Motion is not emotion.
Slow is not an insult.
Time-lapse is the inverse:
the same path, another haste.

Do your best!

Because every time someone names
the instant without freezing it,
the universe grows a little:
one more frame,
one more canopy,
a street where the gesture still fits
in the time that is.`;
}

function poemSlowMotionEs() {
  return `Slow motion.
No pedimos prestado el reloj —
pedimos el oficio de estirar el gesto
hasta que el oído pueda leerlo.

Hubo un projector que atrasó la cinta.
Hubo cámaras que grabaron de más
para que la pantalla devolviera de menos.
Hubo un pecho que creyó que el día se paró —
y el día no se paró.

Motion no es emotion.
Slow no es insulto.
Time-lapse es lo contrario:
el mismo camino, otra prisa.

¡Haz lo mejor!

Porque cada vez que alguien nombra
el instante sin congelarlo,
el universo crece un poco:
un frame más,
un dosel más,
una calle donde el gesto aún cabe
en el tiempo que es.`;
}

function buildSlowMotionBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-slow-motion.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const loopInf = '/posts/post-inspecao-expressao-loop-infinito.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const rockstar = '/posts/post-inspecao-estudio-rockstar.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const poema = poemSlowMotionPt();

  const body = `## Escopo

Inspeção editorial da expressão **«[slow motion](${self})»**. Pedido de campo: *EXPRESÃP SLOW motion*. Loan inglês vivo no português: o **movimento aparente mais lento no ecrã** — e, por figura, o dia que *parece* atrasar. O calco BR/PT é **câmera lenta** / **câmara lenta**. [A orelha cola](${orelhaCola}) *motion* em *[emotion](${emocao})*; o [étimo](${etimologia}) **aproxima a casa e corta o ofício**. *Slow* germânico não é insulto de QI. Contrário técnico: **time-lapse**.

> **Nota metodológica:** auditoria independente. Fontes: [slow motion](${WIKT}), [*slow*](${WIKT_SLOW}), [*motion*](${WIKT_MOTION}), [Wikipedia](${WIKI}), [câmera lenta](${WIKI_PT}). **Ficha ≠ manual de câmara, ≠ protocolo de trauma, ≠ aula de física.** Sem afiliação com marcas de telemóvel nem com o *bullet time* de Hollywood.

**Gatilho:** *EXPRESÃP* / *slowmotion* / *slo-mo* / *em camera lenta* → **slow motion**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **slow motion** (também *slo-mo* · *slowmotion*) |
| Classe | Locução EN — ofício de ecrã × figura de [tempo](${tempo}) |
| Peças | **slow** (germânico *slāw*) + **motion** (lat. *motio* ← *movēre*) |
| Calco PT | **câmera lenta** (BR) · **câmara lenta** (PT) |
| Tipo BudGanja | Expressão — esticar o [gesto](${gesto}) no ecrã, não parar o relógio |
| Não é | [emoção](${emocao}) · insulto *slow* · Slow Food · Motown · *time-lapse* · *moção* jurídica |
| Irmã de [tempo](${tempo}) | O cronos **esticado na fita**; o relógio do laboratório não muda |
| Data | ${inspected} |

**O que é o objecto:** o **ofício de tornar o gesto legível** atrasando o que o ecrã devolve. Filmar a mais (mais fotogramas por segundo) e projectar no ritmo padrão — ou, mais pobre, tocar o mesmo ficheiro mais devagar. A vida «em câmera lenta» é **figura**; o dia continua no [já](${ja}).

## 2. Peças da locução

| Peça | Étimo de trabalho | Confiança | Ofício |
|------|-------------------|-----------|--------|
| **slow** | OE *slāw* — tardo, sem pressa — [slow](${WIKT_SLOW}) | Alta | Qualidade da velocidade **aparente** |
| **motion** | lat. *motio* / *movēre* — movimento — [motion](${WIKT_MOTION}) | Alta | O que se move; não o afecto |
| **slow motion** | jargão de cinema / vídeo — [Wiktionary](${WIKT}) | Alta no ofício | Nome técnico + figura viva |
| **câmera / câmara lenta** | calco: *camera* (câmara) + *lenta* | Alta como **vizinha** | Não apaga o loan no BR vivo |
| **slo-mo** / *slowmotion* | corte / cola de teclado | Alta como **gatilho** | A mesma locução, boca curta |

**H1:** *slow motion* = **esticar o movimento no ecrã** — não alterar o [tempo](${tempo}) do mundo.  
**H2:** *motion* e *[emotion](${emocao})* partilham a casa distante *movēre*; o ofício **corta**: um é o passo, o outro é o peito.  
**H3:** *slow* germânico ≠ «burro». A orelha cola o insulto inglês; esta ficha recusa.

## 3. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **slow motion** | O tempo parou | O ecrã **atrasa a devolução**; o relógio não |
| **motion** | [Emoção](${emocao}) | *Motio* — movimento; *e-movere* é **outra sala** da mesma casa |
| **slow** | Insulto de QI | Adjectivo de **pressa**; o insulto é outro ofício |
| **câmera lenta** | Câmera que é lenta | Calco do **efeito**; a câmara pode ser rapidíssima |
| **time-lapse** | O mesmo truque | O **contrário**: comprimir o [caminho](${caminho}) |
| **bullet time** | Sinónimo | Recorte de [The Matrix](${matrix}) / [Max Payne](${rockstar}) — *array* de câmaras, não só replay |
| **Slow Food** | A mesma *slow* | Movimento de mesa (Petrini); **não** fotograma |
| **Motown** | *Motion* + cidade | *Motor Town* (Detroit) — cola de orelha |
| **motion** (jurídico) | O mesmo inglês | EN *motion* = **moção**; outra sala |
| **«a vida em slow»** | Diagnóstico | Figura de [tempo](${tempo}) sentido — **não** protocolo |

## 4. Génese do ofício (ecrã)

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Sequência (Muybridge, séc. XIX) | Fotogramas em fila — o gesto **já** se lia aos pedaços |
| Overcrank / projector | Filmar a **mais** fps; projectar no padrão — o ecrã devolve **menos** pressa |
| Musger (~1904–07) | Projector de câmara lenta citado nas fontes — **técnica**, não mito de iPhone |
| Replay desportivo | A mesma locução no estádio: ver o [gesto](${gesto}) outra vez |
| **1999** | [The Matrix](${matrix}) — *bullet time*: irmã de palco, **não** esta ficha |
| Telemóvel «slo-mo» | Afterlife de bolso; a origem continua o **cinema** |

> **Hierarquia:** sem fotograma a mais (ou replay a menos), não há *slow motion* a fichar. O peito que «viu tudo em câmera lenta» é **figura**; fica no mapa de [tempo](${tempo}) / [emoção](${emocao}), não no manual da câmara.

## 5. Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Tempo](${tempo}) | Cronos, clima, compasso — o fundo; aqui só o **esticar no ecrã**. *Tempus* tem hipótese «esticar»: eco de ofício, não prova |
| [Já](${ja}) · [caminho](${caminho}) · [gesto](${gesto}) | O instante, o percurso, o acto que o slo-mo **torna lido** |
| [Emoção](${emocao}) | *E-movere* — o peito; ≠ *motion* do ecrã |
| [Loop infinito](${loopInf}) | O processo que **repete**; aqui o processo **atrasa**. Não fundir |
| [The Matrix](${matrix}) · [Rockstar](${rockstar}) | *Bullet time* / Max Payne — irmãos de palco |
| [Pattern](${pattern}) · [etimologia](${etimologia}) · [língua](${lingua}) | Molde EN+calco; *slow* × *motion* × *lenta* |
| [Verdade](${verdade}) · [respeito](${respeito}) | Não chamar insulto ao adjectivo; não chamar relógio ao ecrã |
| [Faça o melhor!](${mantra}) · [Valeu !!!](${valeu}) | O melhor no [tempo](${tempo}) **que é** — sem congelar a planta no vidro |
| [Guia](${guia}) · hub [Expressões](${hub}) | Mapa |

## 6. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Nomear replay / overcrank** | Bom: ecrã, desporto, ciência do gesto |
| **Figura «o dia foi em slow»** | Bom se se admite **figura**; mau se vira laudo |
| **Dizer *câmera lenta*** | Bom como calco; o lema desta ficha é o **loan** |
| **Fundir com [emoção](${emocao})** | Mau: a orelha cola *-motion* |
| **Usar *slow* como insulto** | Mau nesta ficha |
| **Trocar por *time-lapse*** | Mau: é o **contrário** |
| **Chamar *bullet time* a todo slo-mo** | Mau: [Matrix](${matrix}) é recorte próprio |

### Poema de ofício

\`\`\`poem
${poema}
\`\`\`

## Hipóteses (síntese)

**H1:** *slow motion* = esticar o movimento **no ecrã**, não parar o [tempo](${tempo}).  
**H2:** *motion* × [emoção](${emocao}) — mesma casa distante *movēre*; ofícios cortados.  
**H3:** *slow* ≠ insulto; Slow Food ≠ fotograma; Motown ≠ *motion*.  
**H4:** *time-lapse* = contrário; *bullet time* = irmã em [Matrix](${matrix}).  
**H5:** fecho = [Faça o melhor!](${mantra}) no tempo real; [Valeu !!!](${valeu}).

## Limites

- Não ensina fps, shutter nem app de telemóvel.  
- Não diagnostica «tempo subjectivo» de acidente ou luto.  
- Não reproduz *bullet time* nem marca da Warner.  
- *Câmera* (BR) e *câmara* (PT) ficam **ambas** no calco; o lema é o inglês.

## Status

**Aprovada na série Expressões** — *slow motion* fichada como loan de ecrã; calco *câmera / câmara lenta*; *motion* ≠ [emoção](${emocao}); contrário *time-lapse*; irmã [tempo](${tempo}).

[▶ Expressões](${hub}) · [▶ Tempo](${tempo}) · [▶ Emoção](${emocao}) · [▶ The Matrix](${matrix}) · [▶ Faça o melhor!](${mantra}) · [▶ Valeu !!!](${valeu})
`;

  const contentEn = `## Scope

Inspection of **“[slow motion](${self})”**. Field request: *slow motion* as a saying. English loan: apparent slower movement on screen — and, as figure, a day that *seems* to lag. Portuguese calque: **câmera lenta** / **câmara lenta**. [The ear glues](${orelhaCola}) *motion* to *[emotion](${emocao})*; the distant house is *movēre*, the **craft cuts**. *Slow* is not an insult. Inverse: **time-lapse**.

> Method note: [Wiktionary](${WIKT}), [Wikipedia](${WIKI}). **Not** a camera manual or a trauma protocol.

## Object

| Field | Value |
|-------|-------|
| Saying | **slow motion** (*slo-mo*) |
| Pieces | Germanic *slow* + Lat. *motio* |
| Calque | câmera / câmara lenta |
| Not | [emotion](${emocao}) · insult · Slow Food · time-lapse |
| Sister | [tempo](${tempo}) — the clock is not the ribbon |
| Date | ${inspected} |

**H1:** stretch movement **on the screen**, do not stop the world.  
**H2:** *bullet time* lives on [The Matrix](${matrix}) — sibling, not synonym.

\`\`\`poem
${poemSlowMotionEn()}
\`\`\`

## Status

**Approved in Sayings** — screen loan; *motion* ≠ emotion; inverse time-lapse.

[▶ Sayings](${hub}) · [▶ Tempo](${tempo}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Inspección de **«[slow motion](${self})»**. Pedido: *slow motion* como expresión. Préstamo inglés: movimiento aparente más lento en pantalla — y, por figura, el día que *parece* atrasarse. Calco: **câmera lenta** / **câmara lenta**. [El oído pega](${orelhaCola}) *motion* a *[emoción](${emocao})*; la casa lejana es *movēre*, el **oficio corta**. *Slow* no es insulto. Contrario: **time-lapse**.

> Nota: [Wiktionary](${WIKT}), [Wikipedia](${WIKI}). **No** es manual de cámara.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **slow motion** (*slo-mo*) |
| Piezas | germánico *slow* + lat. *motio* |
| Calco | câmera / câmara lenta |
| No es | [emoción](${emocao}) · insulto · Slow Food · time-lapse |
| Hermana | [tempo](${tempo}) |
| Fecha | ${inspected} |

**H1:** estirar el movimiento **en la pantalla**, no parar el mundo.  
**H2:** *bullet time* vive en [The Matrix](${matrix}) — hermana, no sinónimo.

\`\`\`poem
${poemSlowMotionEs()}
\`\`\`

## Estado

**Aprobada en Expresiones** — préstamo de pantalla; *motion* ≠ emoción; contrario time-lapse.

[▶ Expresiones](${hub}) · [▶ Tempo](${tempo}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs };
}

function buildSlowMotionPost() {
  const { body, contentEn, contentEs } = buildSlowMotionBodies();
  const seriesOrder = pickExprOrder('inspecao-expressao-slow-motion', 28);
  return expressaoPost({
    title: 'Inspeção: slow motion — o gesto esticado no ecrã; motion ≠ emotion',
    titleEn: 'Inspection: slow motion — the gesture stretched on screen; motion ≠ emotion',
    titleEs: 'Inspección: slow motion — el gesto estirado en pantalla; motion ≠ emotion',
    excerpt:
      'Expressões: slow motion — loan EN / câmera lenta; esticar o gesto no ecrã, não o relógio; ≠ emotion ≠ time-lapse; Valeu !!!',
    excerptEn:
      'Sayings: slow motion — EN loan / câmera lenta; stretch the gesture on screen, not the clock; ≠ emotion ≠ time-lapse; Valeu !!!',
    excerptEs:
      'Dichos: slow motion — préstamo EN / câmera lenta; estirar el gesto en pantalla, no el reloj; ≠ emotion ≠ time-lapse; ¡Valeu !!!',
    slug: 'inspecao-expressao-slow-motion',
    date: '2026-08-23T02:20:00.000Z',
    seriesOrder,
    seriesLabel: 'slow motion · expressão',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSlowMotionPost,
  buildSlowMotionBodies,
  poemSlowMotionPt,
  poemSlowMotionEn,
  poemSlowMotionEs,
  WIKI,
  WIKI_PT,
  WIKT
};
