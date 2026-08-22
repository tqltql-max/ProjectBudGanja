'use strict';

/**
 * Inspeção Palavras · sonhar × sonar
 * Eixos: lat. somniare · sonho · ≠ sonar (aparelho / ES soar) ·
 * gatilho Sonar / soñar sem ñ · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/sonhar-sonar-cover.jpg';
const WIKT_SONHAR = 'https://pt.wiktionary.org/wiki/sonhar';
const WIKT_SONAR = 'https://pt.wiktionary.org/wiki/sonar';
const WIKT_SOAR = 'https://pt.wiktionary.org/wiki/soar';
const WIKT_SONHO = 'https://pt.wiktionary.org/wiki/sonho';
const WIKT_ES_SONAR = 'https://es.wiktionary.org/wiki/sonar';
const WIKT_ES_SONAR_TIL = 'https://es.wiktionary.org/wiki/so%C3%B1ar';
const WIKT_EN_SONAR = 'https://en.wiktionary.org/wiki/sonar';
const WIKT_LA = 'https://en.wiktionary.org/wiki/somniare#Latin';

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

function buildSonharSonarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-sonhar.html';
  const rem = '/posts/post-inspecao-palavra-sinais-rem.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const desejos = '/posts/post-inspecao-palavra-desejos.html';
  const filme = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const navegar = '/posts/post-inspecao-palavra-navegar.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[sonhar](${self})** e da sua **[relação](${relacao})** com **sonar**. Pedido de campo: *Sonhar com relação a Sonar*. [A orelha cola](${orelhaCola}) o **verbo do sonho** no **eco** (aparelho; espanhol *sonar* = [soar](${WIKT_SOAR})). O étimo **corta**. Duas famílias latinas: *somnus* / *somnium* (**sono, sonho**) e *sonare* (**emitir som**). O **h** e o **ñ** não são enfeite.

> **Nota metodológica:** auditoria independente. Fontes: [sonhar](${WIKT_SONHAR}), [sonho](${WIKT_SONHO}), [sonar](${WIKT_SONAR}), [soar](${WIKT_SOAR}), lat. [*somniāre*](${WIKT_LA}), ES [*sonar*](${WIKT_ES_SONAR}) × [*soñar*](${WIKT_ES_SONAR_TIL}), EN [*sonar*](${WIKT_EN_SONAR}). **Ficha ≠ interpretação de sonhos, ≠ manual de sonar militar, ≠ aula de espanhol.** Sem protocolo de eco.

**Gatilho:** *Sonhar* / *SONAR* / *sonar* / *soñar* sem til → **sonhar** (verbo PT) **ou** **sonar** (aparelho / ES *soar*) — duas salas, uma letra.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **sonhar** |
| Classe | Verbo · nome **sonho** |
| Étimo (trabalho) | Lat. *somniāre* ← *somnium* «sonho» ← *somnus* «sono» — confiança: **alta** |
| Família do sonho | *sonho* · *sonhador* · *sonâmbulo* · [sono](${rem}) |
| O outro étimo | Lat. *sonāre* «soar» → PT **soar** · ES **sonar** · aparelho EN **SONAR** |
| Tipo BudGanja | Palavra — sonho × ≠ eco / aparelho |
| Elo noite | [nap](${nap}) · [noite](${noite}) · [sinais REM](${rem}) |
| Elo fala | [relação](${relacao}) · [língua portuguesa](${lingua}) · [desejos](${desejos}) |
| Fonte | [sonhar](${WIKT_SONHAR}) · [sonar](${WIKT_SONAR}) |
| Data | ${inspected} |

**O que é o objecto:** **sonhar** = produzir ou viver um **sonho**. **Sonar**, nesta [relação](${relacao}), **não** herda o sono: ou é o **aparelho de eco** (sigla EN *Sound Navigation And Ranging*), ou é o espanhol de **soar**. Duas frases.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **sonhar** | O mesmo que sonar (falta um h) | Lat. *somniāre* — verbo do **sonho** |
| **sonar** (PT) | Variante de sonhar | Empréstimo EN — aparelho de **eco** no [mar](${mar}) / [navegar](${navegar}) |
| **sonar** (ES) | O sonho em espanhol | Verbo *sonāre* — **soar**, emitir som |
| **soñar** (ES) | Teclado sem ñ | O sonho em espanhol — irmão de **sonhar** |
| **soar** (PT) | Longe | O verbo PT do som — par do ES *sonar* |
| **SONAR** | Grito do sonho | Sigla inglesa; [sinal](${sinal}) de eco, não de REM |
| **sonho** | O filme, o desejo | Nome do objecto de sonhar; [*Um sonho de liberdade*](${filme}) é **outra ficha** |

**H1:** sonhar ← *somnus* (sono).  
**H2:** sonar-aparelho ← sigla EN; não desce de *somnium*.  
**H3:** ES *sonar* = PT *soar*; ES *soñar* = PT *sonhar*. O ñ decide.  
**H4:** *Sonar* maiúsculo não baptiza o verbo.

## Duas famílias

| Família | Étimo | Português | Espanhol |
|---------|-------|-----------|----------|
| **Sono / sonho** | *somnus* · *somnium* | sono · sonho · **sonhar** | sueño · **soñar** |
| **Som** | *sonus* · *sonāre* | som · **soar** | sonido · **sonar** |

A orelha brasileira ouve *sonar* e cola no sonho. O mapa corta: sem **h** (e sem **ñ**) já não é o leito — é o **eco**.

## Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o verbo: sonhar, sonho, sonhador |
| Bom | Cortar sonar (aparelho / ES soar) quando a boca junta |
| Bom | Devolver o ñ ao *soñar* espanhol |
| Mau | Fundir sonhar no dicionário do sonar |
| Mau | Interpretação onírica ou receita de ping como se fosse a ficha |
| Mau | Tratar o título [*Um sonho de liberdade*](${filme}) como étimo do verbo |

Fecho: [Valeu !!!](${mantra}) — sonhar o que é sonho; soar o que é som; o aparelho fica no eco.

## Status

**Aprovado na série Palavras** — *sonhar* (*somniāre*) ≠ *sonar* (aparelho / ES *soar*).

[▶ Palavras](${hub}) · [▶ Sinais REM](${rem}) · [▶ Nap](${nap}) · [▶ Relação](${relacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **sonhar** (“to dream”) and its [relation](${relacao}) to **sonar**. Field: *Sonhar com relação a Sonar*. The ear glues the dream-verb to the echo (device; Spanish *sonar* = to sound). The etymon cuts. Two Latin families: *somnus* / *somnium* (sleep, dream) and *sonāre* (to sound).

> **Method note:** [sonhar](${WIKT_SONHAR}), [sonar](${WIKT_SONAR}). Not dream interpretation. Not a sonar manual.

## Object

| Field | Value |
|-------|-------|
| Word | **sonhar** |
| Etymon | Lat. *somniāre* ← *somnium* |
| Not | SONAR (device) · ES *sonar* (to sound) · missing-ñ *soñar* |
| Sister | ES *soñar* = this verb; PT *soar* = ES *sonar* |
| Date | ${inspected} |

Dream the sleep-word. Sound the echo. [Valeu !!!](${mantra})

## Status

**Approved in Words** — *sonhar* ≠ sonar.
`;

  const contentEs = `## Alcance

Inspección de **sonhar** («soñar») y su [relación](${relacao}) con **sonar**. Pedido: *Sonhar com relação a Sonar*. La oreja pega el verbo del sueño al eco (aparato; ES *sonar* = emitir sonido). El étimo corta. Dos familias: *somnus* / *somnium* y *sonāre*.

> **Nota:** [sonhar](${WIKT_SONHAR}), [sonar](${WIKT_SONAR}). No es interpretación de sueños ni manual de sónar.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sonhar** |
| Étimo | lat. *somniāre* |
| No es | sónar (aparato) · ES *sonar* (emitir sonido) |
| Hermana | ES **soñar** = este verbo; PT *soar* = ES *sonar* |
| Fecha | ${inspected} |

[¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — *sonhar* ≠ sonar.
`;

  return { body, contentEn, contentEs };
}

function buildSonharSonarPost() {
  const { body, contentEn, contentEs } = buildSonharSonarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-sonhar', 228);
  return makePalavra({
    title: 'Inspeção: Sonhar × sonar — o sonho, o eco, e o ñ que falta',
    titleEn: 'Inspection: Sonhar × sonar — the dream, the echo, and the missing ñ',
    titleEs: 'Inspección: Sonhar × sonar — el sueño, el eco, y la ñ que falta',
    excerpt:
      'Palavras: sonhar (lat. somniāre) × sonar (aparelho / ES soar); orelha cola o h; soñar leva ñ; Valeu !!!',
    excerptEn:
      'Words: sonhar (Lat. somniāre, to dream) × sonar (device / ES to sound); the ear glues the h; soñar keeps ñ; Valeu !!!',
    excerptEs:
      'Palabras: sonhar (lat. somniāre) × sonar (aparato / ES emitir sonido); la oreja pega la h; soñar lleva ñ; ¡Valeu !!!',
    slug: 'inspecao-palavra-sonhar',
    date: '2026-08-22T18:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Sonhar × sonar · palavra',
    coverImage: COVER,
    sourceUrl: WIKT_SONHAR,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildSonharSonarPost, buildSonharSonarBodies };
