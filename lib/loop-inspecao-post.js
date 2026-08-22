'use strict';

/**
 * Inspeção Palavras · loop
 * Eixos: loanword EN · laço / volta que regressa · código · áudio ·
 * caso infinito na expressão irmã · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/loop-palavra-cover.jpg';
const WIKI = 'https://en.wiktionary.org/wiki/loop';
const WIKI_PT = 'https://pt.wiktionary.org/wiki/loop';
const WIKI_INF = 'https://en.wikipedia.org/wiki/Infinite_loop';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n))
    );
    while (taken.has(seriesOrder) && seriesOrder < 400) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildLoopBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-loop.html';
  const loopInf = '/posts/post-inspecao-expressao-loop-infinito.html';
  const seq = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const emPeDeitado = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[loop](${self})** — loanword do inglês para **laço**, **volta que regressa**, ciclo de código ou de áudio. Pedido de campo com a expressão **[loop infinito](${loopInf})** e o caso oral **[ando, indo, vindo, voltando](${seq})**. Esta ficha cobre a **peça**. O *while* sem porta fica na expressão.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · loop](${WIKI}), [PT loop](${WIKI_PT}), [infinite loop](${WIKI_INF}). **Ficha ≠ aula de estruturas de controlo.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *loop* / *lúp* / *laço* (calco) → **loop**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **loop** (EN em uso BR) |
| Classe | Substantivo (também verbo EN: *to loop*) |
| Étimo (trabalho) | EN *loop* «laço / anel / volta» — confiança: **alta** no uso; origem remota discutida (poss. *leap* / formas de anel) |
| Paralelos PT | *laço* · *ciclo* · *volta* · *bucle* (ES) |
| Tipo BudGanja | Palavra — ciclo que regressa × ofício |
| Caso sem saída | [loop infinito](${loopInf}) |
| Caso oral | [ando, indo, vindo, voltando](${seq}) |
| Antídoto | [exit](${exit}) |
| Fonte | [loop](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** a **volta que encontra o próprio começo**. Cabelo, fita, faixa de áudio, *for* / *while*, ruminação. Um loop **pode** ter fim. O que não tem fim é o [loop infinito](${loopInf}).

## 2. Loop × laço × ciclo × ∞

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **loop** | Loan EN (código / áudio / oral BR) | Soa «de oficina» |
| **laço** | PT nativo | Vizinho; também [nó](${no}) quando aperta |
| **ciclo** | PT culto | Ênfase no período (pode fechar bem) |
| **[loop infinito](${loopInf})** | Locução | Loop **sem** [exit](${exit}) |
| **∞ / [lemniscata](${lemniscata})** | Figura | Glifo / curva — **não** é esta palavra |

**H1:** no lab BR, *loop* = laço/volta emprestado do inglês (alta confiança no uso).  
**H2:** todo loop infinito é um loop; **nem** todo loop é infinito.  
**H3:** ∞ não é sinónimo — vai a [lemniscata](${lemniscata}) / [em pé e deitado](${emPeDeitado}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Laço / anel** | Forma que regressa a si | Alta |
| **Código** | *for* / *while* / iteração | Alta (jargão) |
| **Áudio / vídeo** | Faixa que recomeça | Alta |
| **Hábito** | Conduta que se repete | Alta (mapa lab) |
| **Verbo EN** | *to loop* (dar a volta) | Alta (EN) |
| **Infinito** | Sem condição de paragem | Alta — **ficha irmã** [loop infinito](${loopInf}) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *loop* |
|-------|---------------------|
| [Loop infinito](${loopInf}) | O mesmo laço **sem** porta |
| [Ando, indo, vindo, voltando](${seq}) | O loop **falado** |
| [Pattern](${pattern}) · [gesto](${gesto}) · [caminho](${caminho}) | Molde, acto, percurso |
| [Exit](${exit}) · [fim da linha](${fimLinha}) | Sair × acabar |
| [Lemniscata](${lemniscata}) · [em pé e deitado](${emPeDeitado}) | Figura ∞ — não o vocábulo *loop* |
| [Nó](${no}) · [tudo](${tudo}) | Aperto × inteireza |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | Loan EN no PT vivo |
| [Verdade](${verdade}) · [vida](${vida}) | Nomear o ciclo |
| [Valeu !!!](${mantra}) | Fechar o laço com ofício |

## 5. Usos no português do Brasil

| Uso | Bom × mau no lab |
|-----|------------------|
| **«Entrou em loop»** | Bom: nomear a repetição |
| **Loop de áudio / de código** | Bom: sentido técnico limpo |
| **Loop = ∞** | Mau: o glifo é outra ficha |
| **Todo loop é infinito** | Mau: falta o adjectivo — ver [loop infinito](${loopInf}) |
| **Preferir só *laço*** | Aceitável em texto formal; o lema desta ficha é **loop** |

**Finalidade-mãe:** guardar a **peça**. [Loop infinito](${loopInf}) qualifica; [ando, indo, vindo, voltando](${seq}) exemplifica; [exit](${exit}) abre a porta.

## Hipóteses (síntese)

**H1:** *loop* = loan EN — laço / volta que regressa.  
**H2:** infinito ≠ automático — só na expressão irmã.  
**H3:** ≠ [lemniscata](${lemniscata}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é tutorial de *for* / *while*.  
- Origem remota do EN *loop* não é fechada nesta ficha — o ofício é o **uso BR**.  
- O ciclo oral fica em [ando, indo, vindo, voltando](${seq}).

## Status

**Aprovada** — **loop** fichado: loan EN, volta que regressa; o sem-saída mora em [loop infinito](${loopInf}).

[▶ Palavras](${hub}) · [▶ Loop infinito](${loopInf}) · [▶ Ando, indo, vindo, voltando](${seq}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **loop** as used in Brazilian Portuguese — English loanword for a **bend that returns**, a code cycle, or an audio loop. Infinite case: [loop infinito](${loopInf}). Oral case: [ando, indo, vindo, voltando](${seq}). Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · loop](${WIKI}). Not a control-flow tutorial.

## Object

| Field | Value |
|-------|-------|
| Word | **loop** |
| Sense | Returning bend / cycle |
| Infinite case | [loop infinito](${loopInf}) |
| Antidote | [exit](${exit}) |
| Date | ${inspected} |

**H1:** every infinite loop is a loop; not every loop is infinite.  
**H2:** ∞ is a different sheet — [lemniscate](${lemniscata}).

## Status

**Approved** — EN loan filed; infinite case on the sister expression.

[▶ Words](${hub}) · [▶ Infinite loop](${loopInf}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **loop** en uso BR — préstamo del inglés para **lazo que regresa**, ciclo de código o de audio. Caso infinito: [loop infinito](${loopInf}). Caso oral: [ando, indo, vindo, voltando](${seq}). Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wiktionary · loop](${WIKI}). No es tutorial de control de flujo.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **loop** |
| Sentido | Lazo / ciclo que vuelve |
| Caso infinito | [loop infinito](${loopInf}) |
| Antídoto | [exit](${exit}) |
| Fecha | ${inspected} |

**H1:** todo loop infinito es un loop; no todo loop es infinito.  
**H2:** ∞ es otra ficha — [lemniscata](${lemniscata}).

## Estado

**Aprobada** — préstamo EN fichado; caso infinito en la expresión hermana.

[▶ Palabras](${hub}) · [▶ Loop infinito](${loopInf}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildLoopPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLoopBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-loop', 180);
  return makePalavra({
    title: 'Inspeção: loop — o laço que regressa, ainda não é o infinito',
    titleEn: 'Inspection: loop — the bend that returns, not yet the infinite',
    titleEs: 'Inspección: loop — el lazo que regresa, aún no es el infinito',
    excerpt:
      'Palavras: loop — loan EN, volta que regressa; o sem-saída fica em loop infinito; Valeu !!!',
    excerptEn:
      'Words: loop — EN loan, returning bend; the no-exit case lives on loop infinito; Valeu !!!',
    excerptEs:
      'Palabras: loop — préstamo EN, vuelta que regresa; el sin-salida queda en loop infinito; ¡Valeu !!!',
    slug: 'inspecao-palavra-loop',
    date: '2026-08-22T07:24:00.000Z',
    seriesOrder: order,
    seriesLabel: 'loop · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLoopPost,
  buildLoopBodies
};
