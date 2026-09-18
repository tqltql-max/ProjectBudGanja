'use strict';

/**
 * Inspeção Palavras · sexta-feira 13
 * Eixos: calendário · 13 de novembro · datas de lançamento da franquia ·
 * o dia é dia — não azar, não marca · Faça o melhor!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/sexta-feira-13-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Sexta-feira_13';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildSextaFeira13Bodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-sexta-feira-13.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const vida = '/vida/';
  const wikiEn = 'https://en.wikipedia.org/wiki/Friday_the_13th';
  const wikiFranquia = 'https://en.wikipedia.org/wiki/Friday_the_13th_(franchise)';
  const wikiFilme = 'https://pt.wikipedia.org/wiki/Sexta-Feira_13_(filme)';
  const wikiPtFranquia = 'https://pt.wikipedia.org/wiki/Sexta-Feira_13_(franquia)';

  const body = `## Escopo

Inspeção editorial do composto **[sexta-feira 13](${self})** — uma **data do calendário**, não um feitiço. Pedido de campo: *sexta-feira 13* × **13 de novembro**. Esta ficha cobre (1) o vocábulo e a superstição cultural, (2) o **13 de novembro de 2026**, que cai numa sexta, e (3) as **datas de lançamento** da franquia de terror que usou o dia 13 como calendário de estreia. Veredicto do laboratório: **é apenas mais um dia qualquer**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Sexta-feira 13](${WIKI}), [EN · Friday the 13th](${wikiEn}), [franquia](${wikiFranquia}), [filme 1980](${wikiFilme}). Série [Palavras](${hub}). **Ficha ≠ horóscopo, ≠ aviso de azar, ≠ ficha da marca Paramount / New Line.** A franquia é **elo de calendário de estreia**, não o objecto. Sem afiliação comercial. Horror de ecrã ≠ manual de medo.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **sexta-feira 13** |
| Peças | **sexta-feira** (dia da semana) · **13** (dia do mês) |
| O que é | Uma data — quando o dia 13 cai à sexta |
| O que não é | Azar · maldição · a franquia de terror · um [sinal](${sinal}) do cosmos |
| Tipo BudGanja | Palavra — calendário × [tempo](${tempo}) × literacia do dia |
| Elo peito | [medo](${medo}) · [risco](${risco}) · [verdade](${verdade}) |
| Elo mapa | [tempo](${tempo}) · [sinal](${sinal}) · [gesto](${gesto}) · [caminho](${caminho}) |
| Âncora 2026 | **13 de novembro de 2026** (sexta) |
| Fonte | [Sexta-feira 13](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o nome de um **encontro de calendário**. Sexta-feira existe todos os semanas; o 13 existe todos os meses; juntos, às vezes coincidem. O laboratório lê a coincidência como **data**, não como oráculo.

## 2. Apenas mais um dia qualquer

**H1:** **13 de novembro** — e qualquer sexta-feira 13 — é **um dia civil**, igual aos outros 364 (ou 365). O número e o weekday não alteram a física do ofício.  
**H2:** a superstição (azar, treze, sexta) é **cultura**; o [medo](${medo}) é afecto; o [risco](${risco}) é mapa. Confundi-los transforma o calendário em alarme falso.  
**H3:** a franquia de terror **escolheu** algumas estreias no dia 13 que era sexta — calendário de *marketing*, não prova de maldição.  
**H4:** fecho = viver o dia com [gesto](${gesto}) e [verdade](${verdade}) — [Faça o melhor!](${mantra}) **como em qualquer outro**.

Regra: se a boca disser «cuidado, é sexta 13», o lab pergunta **que [risco](${risco}) concreto há hoje?** Se não houver mapa, é folclore. O dia segue.

## 3. 13 de novembro de 2026

Em **2026** o dia 13 cai à sexta três vezes. A âncora pedida é novembro:

| Data | Dia da semana | Nota de ofício |
|------|---------------|----------------|
| 13 fev. 2026 | sexta | Sexta-feira 13 — ainda um dia |
| 13 mar. 2026 | sexta | Sexta-feira 13 — ainda um dia |
| **13 nov. 2026** | **sexta** | Âncora desta ficha — **apenas mais um dia qualquer** |

Não há lançamento desta ficha «por causa» do 13. Há um **calendário**. O Inspetor trabalha no 13 de novembro como trabalharia no 12 ou no 14.

## 4. Datas de lançamento (franquia — elo, não objecto)

A série *Friday the 13th* / *Sexta-Feira 13* (estreia EUA **9 mai. 1980**, Sean S. Cunningham) **não é esta ficha**. Aqui só o **calendário de estreia**, para mostrar o que é coincidência e o que é escolha comercial. Datas **teatrais EUA** nas fontes ([franquia](${wikiFranquia}) · [filme](${wikiFilme})); estreias BR podem diferir.

| Título (EUA) | Estreia EUA | Caiu em sexta-feira 13? |
|--------------|-------------|-------------------------|
| *Friday the 13th* | **9 mai. 1980** | Sexta, **dia 9** — não é 13 |
| *Part 2* | 30 abr. 1981 | Não |
| *Part III* | **13 ago. 1982** | **Sim** |
| *The Final Chapter* | **13 abr. 1984** | **Sim** |
| *A New Beginning* | 22 mar. 1985 | Não |
| *Jason Lives* | 1 ago. 1986 | Não |
| *The New Blood* | **13 mai. 1988** | **Sim** |
| *Jason Takes Manhattan* | 28 jul. 1989 | Não |
| *Jason Goes to Hell* | **13 ago. 1993** | **Sim** |
| *Jason X* | **13 abr. 2001** | **Sim** |
| *Freddy vs. Jason* | 15 ago. 2003 | Não |
| *Friday the 13th* (remake) | **13 fev. 2009** | **Sim** |

Leitura: o estúdio **encaixou** várias estreias no dia 13 que já era sexta. Isso é **agenda de lançamento**. Não torna o 13 de novembro (nem nenhum 13) num dia especial no laboratório. A marca fica no cartaz; o dia fica no calendário.

## 5. Superstição ≠ sinal ≠ risco

| Termo | Papel | No lab |
|-------|-------|--------|
| **Data** | Número no calendário | Objecto desta ficha |
| **Superstição** | Folclore do azar | Cultura — não laudo |
| **[Sinal](${sinal})** | Marca que se lê com método | O 13 **não** é sinal sozinho |
| **[Medo](${medo})** | Afecto | Pode aparecer no dia; não é o dia |
| **[Risco](${risco})** | Perigo com contorno | Exige mapa — não o weekday |
| **[Tempo](${tempo})** | Chronos do ofício | O dia passa igual |

Regra: o calendário **nomeia**; o [sinal](${sinal}) **avisa com método**; o [medo](${medo}) **sente**; o [risco](${risco}) **calcula**. Fundir tudo no 13 vira superstição.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **neste dia**, como no anterior |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha 1 | Tratar sexta-feira 13 como azar = alarme sem mapa |
| Anti-armadilha 2 | Colapsar o dia na franquia de terror = a marca come o calendário |
| Anti-armadilha 3 | Inventar lançamentos ou omens que as fontes não dão |
| Par de método | [tempo](${tempo}) · [medo](${medo}) · [risco](${risco}) · [sinal](${sinal}) |

**Veredicto:** **13 de novembro** é sexta-feira 13 em 2026 — e continua a ser **apenas mais um dia qualquer**. As datas de lançamento da franquia documentam *marketing* de calendário, não destino.

## Hipóteses (síntese)

**H1:** objecto = composto calendário **sexta-feira 13**, âncora **13 nov. 2026**.  
**H2:** o dia não muda de espécie por coincidir weekday + 13.  
**H3:** estreias no dia 13 (1982, 1984, 1988, 1993, 2001, 2009) = agenda comercial, elo — não o vocábulo.  
**H4:** fecho = [Faça o melhor!](${mantra}) no dia que há.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tempo](${tempo}) | Chronos — o dia passa |
| [Medo](${medo}) · [risco](${risco}) | Afecto × mapa — não fundir no 13 |
| [Sinal](${sinal}) · [verdade](${verdade}) | Marca com método × facto |
| [Gesto](${gesto}) · [caminho](${caminho}) | O que se faz no dia |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) | Finalidade viva |

## Limites

- Não é horóscopo, numerologia nem aviso de azar.  
- Não é ficha da franquia, do filme de 1980 nem de nenhuma personagem de terror.  
- Datas de estreia: calendário EUA nas fontes; não inventar datas BR.  
- Superstição documentada ≠ endossada.

## Status

**Aprovado** — **sexta-feira 13** fichada como data: **13 de novembro de 2026** é sexta e é **apenas mais um dia qualquer**; lançamentos da franquia no dia 13 = elo de calendário, não o objecto; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tempo](${tempo}) · [▶ Medo](${medo}) · [▶ Risco](${risco}) · [▶ Sinal](${sinal}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[sexta-feira 13](${self})** (Friday the 13th) — a **calendar date**, not a curse. Field request: the phrase × **13 November**. This sheet covers the word, **13 November 2026** (a Friday), and **release dates** of the horror franchise that used the 13th as a launch calendar. Lab verdict: **just another ordinary day**.

> Method note: [Wikipedia · Friday the 13th](${wikiEn}), [franchise](${wikiFranquia}). **Not** a horoscope. The franchise is a **release-calendar link**, not the object. No studio affiliation.

## 1. Object

| Field | Value |
|-------|-------|
| Form | **sexta-feira 13** |
| What it is | A date — the 13th falling on Friday |
| What it is not | Bad luck · the horror brand · a cosmic [sinal](${sinal}) |
| 2026 anchor | **13 November 2026** (Friday) |
| Date | ${inspected} |

## 2. Just another day

**H1:** 13 November — and any Friday the 13th — is a civil day like the others.  
**H2:** superstition is culture; [medo](${medo}) is affect; [risco](${risco}) needs a map.  
**H3:** some franchise openings landed on Friday the 13th as **marketing calendar**, not omen.  
**H4:** close = [Do your best!](${mantra}) **as on any other day**.

## 3. 13 November 2026

In 2026 the 13th falls on Friday three times (13 Feb, 13 Mar, **13 Nov**). The inspector works 13 November like the 12th or the 14th.

## 4. Release dates (franchise — link, not object)

US theatrical dates ([franchise](${wikiFranquia})):

| Title | US opening | Friday the 13th? |
|-------------------|------------------|
| *Friday the 13th* | 9 May 1980 | Friday the **9th** |
| *Part III* | **13 Aug 1982** | **Yes** |
| *The Final Chapter* | **13 Apr 1984** | **Yes** |
| *The New Blood* | **13 May 1988** | **Yes** |
| *Jason Goes to Hell* | **13 Aug 1993** | **Yes** |
| *Jason X* | **13 Apr 2001** | **Yes** |
| *Friday the 13th* (2009) | **13 Feb 2009** | **Yes** |

Other entries in the series did not open on Friday the 13th. Studio calendar ≠ cursed day.

## Status

**Approved** — Friday the 13th filed as a date: **just another ordinary day**; franchise openings on the 13th = calendar link; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Tempo](${tempo}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[sexta-feira 13](${self})** (viernes 13) — una **fecha de calendario**, no un hechizo. Pedido de campo: la frase × **13 de noviembre**. Cubre la palabra, el **13 de noviembre de 2026** (viernes) y las **fechas de estreno** de la franquicia de terror que usó el 13 como calendario. Veredicto: **solo un día cualquiera**.

> Nota: [Wikipedia · Friday the 13th](${wikiEn}). **No** es horóscopo. La franquicia es **vínculo de calendario de estreno**, no el objeto.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Forma | **sexta-feira 13** |
| Qué es | Una fecha — el 13 en viernes |
| Qué no es | Mala suerte · la marca de terror |
| Ancla 2026 | **13 de noviembre de 2026** (viernes) |
| Fecha | ${inspected} |

## 2. Solo un día cualquiera

El 13 de noviembre — y cualquier viernes 13 — es un día civil. La superstición es cultura; el [medo](${medo}) es afecto; el [risco](${risco}) pide mapa. Algunos estrenos de la franquicia cayeron en viernes 13 como **agenda comercial**, no como presagio. Cierre: [¡Haz lo mejor!](${mantra}) **como en cualquier otro día**.

## 3. Fechas de estreno (elo)

Estrenos EUA en viernes 13 (fuentes): 13 ago. 1982 · 13 abr. 1984 · 13 may. 1988 · 13 ago. 1993 · 13 abr. 2001 · 13 feb. 2009. El filme de 1980 abrió el **9 may. 1980** (viernes, no el 13).

## Estado

**Aprobado** — viernes 13 fichado como fecha: **solo un día cualquiera**; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Tempo](${tempo}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI, wikiPtFranquia };
}

function buildSextaFeira13Post() {
  const { body, contentEn, contentEs, wiki } = buildSextaFeira13Bodies();
  const seriesOrder = pickOrder('inspecao-palavra-sexta-feira-13', 156);
  const post = makePalavra({
    title: 'Inspeção: Sexta-feira 13 — apenas mais um dia qualquer',
    titleEn: 'Inspection: Friday the 13th — just another ordinary day',
    titleEs: 'Inspección: Viernes 13 — solo un día cualquiera',
    excerpt:
      'Palavras: «sexta-feira 13» — data, não azar; 13 de novembro de 2026 é sexta e é um dia qualquer; estreias da franquia no dia 13 = calendário, não o objecto; Faça o melhor!',
    excerptEn:
      'Words: “sexta-feira 13” (Friday the 13th) — a date, not a curse; 13 November 2026 is a Friday and an ordinary day; franchise openings on the 13th = calendar, not the object; Do your best!',
    excerptEs:
      'Palabras: «sexta-feira 13» — fecha, no mala suerte; el 13 de noviembre de 2026 es viernes y un día cualquiera; estrenos de la franquicia el 13 = calendario, no el objeto; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-sexta-feira-13',
    date: '2026-08-21T18:15:00.000Z',
    seriesOrder,
    seriesLabel: 'Sexta-feira 13 · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildSextaFeira13Post, buildSextaFeira13Bodies };
