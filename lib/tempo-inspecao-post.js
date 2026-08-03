'use strict';

/**
 * Inspeção Palavras · tempo
 * Eixos: objeto (lat. tempus) · cronológico × climático × musical × posse ·
 * kairós × chronos (comparação, não linhagem) · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildTempoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/tempo';
  const wikiLat = 'https://en.wiktionary.org/wiki/tempus';
  const wikiTemperare = 'https://en.wiktionary.org/wiki/tempero';

  const body = `## Escopo

Inspeção editorial da palavra **tempo** — do latim *tempus*, um dos vocábulos mais carregados do português: nomeia a **cronologia** (o que passa), o **clima** («o tempo está feio»), o **compasso musical** («no tempo certo») e um **recurso que se tem ou falta** («não tenho tempo»). Esta ficha cobre o **objeto**, a família culta (*temperar*, *tempestade*, *temporário*), a comparação grega **kairós × chronos** (sem linhagem etimológica — só ofício útil) e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · tempo](${wiki}), [tempus (EN)](${wikiLat}), [tempero (EN)](${wikiTemperare}), série [Palavras](${hub}). **Ficha ≠ tratado de física nem de teoria musical.** A raiz indo-europeia de *tempus* tem **duas hipóteses em disputa** (De Vaan 2008): «esticar» (*temp-*, tempo como algo que se estende) ou «cortar» (*temh₁-*, tempo como secção). Documentamos ambas sem fechar consenso. Tom: Inspetor BudGanja — tempo como matéria do [gesto](${gesto}), não abstração fria.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **tempo** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Latim *tempus, temporis* (n.) → PT *tempo* — confiança: **alta** na rota; raiz indo-europeia anterior: **em disputa** («esticar» × «cortar») |
| Família culta (mesma raiz) | *temperar* / *tempero* (de *temperāre*, «dosar na medida certa» — confiança **alta**, Wiktionary) · *temperatura* · *temperamento* · *tempestade* (de *tempestas*, «estação / estado do tempo» → «tormenta») · *temporário* · *contemporâneo* · *extemporâneo* · *temporal* |
| Cognatos romances | esp. *tiempo* · it. *tempo* · fr. *temps* · cat. *temps* |
| Falso amigo | ing. **time** — germânico (*tima*), raiz **diferente**; ing. **tempo** (música) — **é** a mesma raiz, emprestado do italiano |
| Vizinhos PT (não confundir) | **hora** (< grego *hōra* via lat. *hora* — ponto específico) · **vez** (< lat. *vice* — ocorrência) — *tempo* é o pano de fundo; *hora* e *vez* são recortes nele |
| Tipo BudGanja | Palavra — cronologia × clima × compasso × recurso |
| Elo tempo | [sempre](${sempre}) · [passado](${passado}) |
| Elo ofício | [caminho](${caminho}) · [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) · [alma](${alma}) |
| Elo lab | [nap](${nap}) · [pattern](${pattern}) · [vida](${vidaPalavra}) |
| Fonte | [Wikcionário · tempo](${wiki}) · [Wiktionary · tempus](${wikiLat}) |
| Data | ${inspected} |

**O que é o objeto:** a palavra que um só idioma usa para **quatro coisas diferentes** — o relógio que corre, o céu que muda, o compasso que organiza som e o bem que falta no fim do dia. No laboratório: não são metáforas soltas — são **a mesma raiz** fazendo trabalho em domínios distintos.

## 2. Tempo × clima × compasso × posse

| Sentido | Uso no PT-BR | Origem / nota |
|---------|--------------|---------------|
| **Cronológico** | «o tempo passa», «quanto tempo falta» | *tempus* no sentido quantitativo — a raiz-mãe |
| **Climático** | «o tempo está feio», «previsão do tempo» | *tempus* → *tempestas* («estação, estado do tempo») → PT herdou o sentido «clima» direto no substantivo — não é gíria, é herança |
| **Musical** | «tempo lento», «no tempo certo», *tempo* (BPM) | Vocabulário internacional via **italiano** *tempo* — mesma raiz latina, reimportada |
| **Posse / recurso** | «não tenho tempo», «perder tempo», «ganhar tempo» | Metáfora viva: tempo tratado como bem finito, gastável, roubável |
| **Gramatical** | «tempo verbal» (presente / [passado](${passado}) / futuro) | Marca temporal na própria [língua](${vidaPalavra}) |
| **Kairós (comparação)** | «hora certa», «tempo de agir» | Grego *kairós* (ocasião oportuna) ≠ raiz de *tempus* — comparação de **ofício**, não de linhagem |

**H1:** *tempus* → *tempo* cobre cronologia e clima com a **mesma palavra** porque «estado do tempo» já estava em *tempestas* na origem — não é coincidência do português.  
**H2:** o sentido musical é **reimportação**: latim → italiano (arte) → vocabulário internacional → de volta ao português como jargão técnico.  
**H3:** tratar tempo como **posse** («tenho», «falta», «perco») é a metáfora mais arriscada — abre para o [risco](${risco}) de contabilizar vida como saldo bancário.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Chronos** | Duração que corre, igual para todos — o relógio | Alta |
| **Clima** | Estado do céu — «vai fazer tempo bom?» | Alta (herança direta) |
| **Compasso** | Andamento — rápido, lento, no tempo | Alta (jargão musical) |
| **Recurso** | Bem finito — ter, faltar, perder, ganhar | Alta (uso vivo, metáfora de posse) |
| **Kairós** | O instante certo — nem cedo, nem tarde | Média-alta (comparação grega, sem linhagem) |
| **Tempo da [alma](${alma})** | O compasso interno — que não bate igual ao do relógio | Média (leitura de ofício, não física) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *tempo* |
|-------|----------------------|
| [Sempre](${sempre}) | *Sempre* é tempo sem fim declarado — absolutização do tempo |
| [Passado](${passado}) | Fatia específica do tempo — o que já correu e virou rasto |
| [Vida](${vidaPalavra}) | *Vīta* já carrega «tempo e modo» entre os seus próprios sentidos |
| [Caminho](${caminho}) | Caminho é o espaço percorrido; tempo é o que se gasta percorrendo |
| [Gesto](${gesto}) | O gesto cabe **num** instante — é onde o kairós vira acto |
| [Risco](${risco}) | Tempo mal calculado — perder a janela certa, ou queimar o compasso |
| [Verdade](${verdade}) | «O tempo dirá» é aforismo popular — o lab não terceiriza a verificação para o relógio |
| [Alma](${alma}) | Chegar por dentro tem outro compasso — nem sempre o do cronômetro |
| [Nap](${nap}) | A pausa breve que rouba minutos do cronos e devolve fôlego à [alma](${alma}) |
| [Pattern](${pattern}) | Repetição só vira padrão quando se olha vários tempos ao mesmo tempo |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Não tenho tempo»** | Recusa ou sobrecarga real | Inspecionar: falta tempo ou falta prioridade? |
| **«O tempo vai virar»** | Previsão do tempo (clima) | Herança directa de *tempestas* — não é coincidência |
| **«Tá no tempo»** | Música / dança | Compasso comum — o corpo mede junto |
| **«Dá um tempo»** | Pausa, trégua | Elo [nap](${nap}) — parar não é perder |
| **«Tempo de plantar, tempo de colher»** | Ciclo agrícola | Estação certa — kairós aplicado ao [cultivo](/cultivo/) |
| **«O tempo cura»** | Consolo popular | Meia-verdade — [verdade](${verdade}) exige gesto, não só espera |
| **Ofício** | Fazer o melhor com o tempo disponível | [Faça o melhor!](${mantra}) — não com o tempo que se queria ter |

**Finalidade-mãe:** nomear **tempo** para separar suas quatro camadas (cronos, clima, compasso, posse) e usar cada uma no lugar certo — sem deixar a metáfora de «faltar tempo» virar desculpa nem a de «o tempo dirá» virar fuga da [verdade](${verdade}).

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com o tempo que se tem hoje**, não com o tempo ideal que não existe |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Não deu tempo» sem [gesto](${gesto}) tentado = desculpa · kairós reconhecido e perdido = [risco](${risco}) assumido, não fatalidade |
| Par vivo | [gesto](${gesto}) · [caminho](${caminho}) · [alma](${alma}) |
| Par tempo | [sempre](${sempre}) · [passado](${passado}) |

**Veredicto:** Faça o melhor **agora**, no instante que é kairós — o cronos não espera, mas o compasso certo se escolhe. Tempo bem gasto é [gesto](${gesto}) no momento que cabia; tempo perdido é ausência de [gesto](${gesto}) disfarçada de falta de tempo.

## Hipóteses (síntese)

**H1:** objeto = lat. *tempus* → PT *tempo* (alta confiança na rota; raiz PIE em disputa: «esticar» × «cortar»).  
**H2:** clima e cronologia partilham a mesma raiz via *tempestas* — não é polissemia acidental do português.  
**H3:** sentido musical é reimportação latim → italiano → internacional.  
**H4:** elos = [sempre](${sempre}) · [passado](${passado}) · [vida](${vidaPalavra}) · [alma](${alma}) · [gesto](${gesto}).  
**H5:** fecho = [Faça o melhor!](${mantra}) com o tempo real, não o desejado.

## Limites

- Não é tratado de física do tempo nem de teoria musical formal.
- *Kairós* × *chronos* é comparação de ofício grega — **não** há linhagem etimológica com *tempus* latino.
- «O tempo cura» entra como ditado popular, não como método clínico.
- Raiz indo-europeia de *tempus* permanece em disputa acadêmica (De Vaan 2008); a ficha não escolhe lado.

## Status

**Aprovado** — **tempo** fichado: objeto (*tempus*), quatro camadas vivas (cronos, clima, compasso, posse), comparação kairós × chronos, rede com [sempre](${sempre}), [passado](${passado}), [vida](${vidaPalavra}), [alma](${alma}) e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sempre](${sempre}) · [▶ Passado](${passado}) · [▶ Alma](${alma}) · [▶ Caminho](${caminho}) · [▶ Todas as inspeções](${hubAll}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **tempo** — from Latin *tempus*, a word doing four jobs at once: **chronology** (what passes), **weather** («o tempo está feio»), **musical tempo** (beat/pace), and a **finite resource** («não tenho tempo»). Covers the **object**, the learned family (*temperar*, *tempestade*, *temporário* — all from the same root), the Greek **kairós × chronos** comparison (no etymological lineage, useful craft-contrast only), and [Do your best!](${mantra}).

> Method note: [Wiktionary · tempo](${wiki}), [tempus](${wikiLat}), [tempero](${wikiTemperare}). Not a physics or music-theory treatise. The Proto-Indo-European root behind *tempus* is disputed (De Vaan 2008): "to stretch" vs. "to cut" — both documented, neither settled.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **tempo** |
| Etymon | Lat. *tempus, temporis* → PT *tempo* — high confidence on the route; deeper PIE root disputed |
| Learned family | *temperar* (from *temperāre*, "to proportion duly" — same root, Wiktionary-confirmed) · *tempestade* (from *tempestas*, "state of the weather") · *temporário* · *contemporâneo* |
| False friend | EN **time** is Germanic (unrelated root); EN **tempo** (music) **is** the same Latin root, via Italian |
| Neighbors (PT) | **hora** (Greek *hōra*, a specific point) · **vez** (Lat. *vice*, an occurrence) — *tempo* is the backdrop; *hora* and *vez* are cuts within it |
| Lab type | Word — chronology × weather × beat × resource |
| Links | [sempre](${sempre}) · [passado](${passado}) · [vida](${vidaPalavra}) · [gesto](${gesto}) · [alma](${alma}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Four layers, one word

**Chronological** (clock, calendar) · **weather** (inherited directly from Latin *tempestas*, not a coincidence) · **musical tempo** (re-imported via Italian) · **possession metaphor** ("I don't have time," "I'm losing time" — the riskiest one, treating life as a bank balance).

## 3. Kairós × chronos (comparison, not lineage)

Greek distinguishes *chronos* (time that flows, measured) from *kairós* (the right, opportune moment). No etymological tie to Latin *tempus* — but a useful craft lens: [gesto](${gesto}) happens in the kairós instant, inside the chronos that keeps running regardless.

## 4. Do your best!

Best possible **with the time you actually have today** — not the ideal time that doesn't exist. Time well spent is [gesto](${gesto}) at the moment it fit; time lost is absence of gesture disguised as lack of time.

## Status

**Approved** — object (*tempus*) · four layers · kairós × chronos comparison · network with [sempre](${sempre}), [passado](${passado}), [alma](${alma}) · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Sempre](${sempre}) · [▶ Passado](${passado}) · [▶ Alma](${alma}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **tempo** en portugués — del latín *tempus*, una palabra que hace cuatro trabajos a la vez: **cronología** (lo que pasa), **clima** («o tempo está feio»), **tempo musical** (compás) y un **recurso finito** («não tenho tempo»). Cubre el **objeto**, la familia culta (*temperar*, *tempestade*, *temporário* — misma raíz), la comparación griega **kairós × chronos** (sin linaje etimológico, solo contraste de oficio útil) y [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · tempo](${wiki}), [tempus](${wikiLat}), [tempero](${wikiTemperare}). No es tratado de física ni de teoría musical. La raíz protoindoeuropea de *tempus* está en disputa (De Vaan 2008): «estirar» vs. «cortar».

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **tempo** |
| Étimo | Lat. *tempus, temporis* → PT *tempo* — alta confianza en la ruta |
| Familia culta | *temperar* (de *temperāre*, misma raíz) · *tempestade* (de *tempestas*, «estado del tiempo») · *temporário* |
| Falso amigo | ING **time** es germánico (raíz distinta); ING **tempo** (música) **es** la misma raíz, vía italiano |
| Vecinos PT | **hora** (griego *hōra*) · **vez** (lat. *vice*) — *tempo* es el fondo; *hora* y *vez* son cortes en él |
| Tipo lab | Palabra — cronología × clima × compás × recurso |
| Vínculos | [sempre](${sempre}) · [passado](${passado}) · [vida](${vidaPalavra}) · [gesto](${gesto}) · [alma](${alma}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Cuatro capas, una palabra

**Cronológica** (reloj, calendario) · **clima** (heredado directo de *tempestas*, no es coincidencia) · **tempo musical** (reimportado vía italiano) · **metáfora de posesión** («no tengo tiempo», «pierdo tiempo» — la más arriesgada, tratar la vida como saldo bancario).

## 3. Kairós × chronos (comparación, no linaje)

El griego distingue *chronos* (tiempo que fluye) de *kairós* (el instante oportuno). Sin vínculo etimológico con *tempus* — pero útil como lente de oficio: el [gesto](${gesto}) ocurre en el instante kairós, dentro del chronos que sigue corriendo.

## 4. ¡Haz lo mejor!

Lo mejor posible **con el tiempo que realmente tienes hoy** — no el tiempo ideal que no existe.

## Estado

**Aprobada** — objeto (*tempus*) · cuatro capas · comparación kairós × chronos · red con [sempre](${sempre}), [passado](${passado}), [alma](${alma}) · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Sempre](${sempre}) · [▶ Passado](${passado}) · [▶ Alma](${alma}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildTempoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildTempoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 106;
  return makePalavra({
    title: 'Inspeção: Tempo — cronologia, clima, compasso e o instante certo',
    titleEn: 'Inspection: Tempo — chronology, weather, beat and the right moment',
    titleEs: 'Inspección: Tempo — cronología, clima, compás y el instante justo',
    excerpt:
      'Palavras: «tempo» (lat. tempus) — cronologia, clima e compasso musical no BR; kairós × chronos; elos caminho, vida, sempre, passado, alma; Faça o melhor!',
    excerptEn:
      'Words: “tempo” (Lat. tempus) — chronology, weather and musical beat in BR use; kairós × chronos; links caminho, vida, sempre, passado, alma; Do your best!',
    excerptEs:
      'Palabras: «tempo» (lat. tempus) — cronología, clima y compás musical en BR; kairós × chronos; vínculos caminho, vida, sempre, passado, alma; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-tempo',
    date: '2026-08-03T21:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Tempo · palavra',
    coverImage: '/imagens/inspecoes/tempo-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTempoPost,
  buildTempoBodies
};
