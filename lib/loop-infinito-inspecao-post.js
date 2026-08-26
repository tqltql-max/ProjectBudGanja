'use strict';

/**
 * Inspeção Expressões · loop infinito
 * Locução EN+PT — o pattern que não sai; código, ruminação, sequência oral.
 * Caso de laboratório: ando, indo, vindo, voltando. Valeu !!!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemLoopInfinitoPt() {
  return `Disseram que o loop
é coisa de máquina.
Mentira de metade.
A máquina aprendeu connosco:
ando, indo, vindo, voltando.

Há um loop que calcula.
Há outro que rumina.
Há um terceiro no peito:
o caminho que não pousa.

Infinito não é eternidade.
É ausência de saída.
O glifo ∞ deita a fita.
O loop não deita:
repete.

Quem nomeia o loop
já pôs a mão no exit.
Quem chama destino ao ciclo
aperta o while.

Valeu !!!
com condição de paragem,
sem fingir que o sem-fim
cabe numa ficha.`;
}

function poemLoopInfinitoEn() {
  return `They said the loop
is a machine thing.
Half a lie.
The machine learned from us:
I walk, going, coming, returning.

There is a loop that computes.
There is another that ruminates.
There is a third in the chest:
the path that does not land.

Infinite is not eternity.
It is the absence of an exit.
The glyph ∞ lays the ribbon down.
The loop does not lie down:
it repeats.

Whoever names the loop
has already put a hand on exit.
Whoever calls destiny the cycle
tightens the while.

Valeu !!!
with a stopping condition,
without pretending the endless
fits on a sheet.`;
}

function poemLoopInfinitoEs() {
  return `Dijeron que el loop
es cosa de máquina.
Mentira a medias.
La máquina aprendió con nosotros:
ando, yendo, viniendo, volviendo.

Hay un loop que calcula.
Hay otro que rumia.
Hay un tercero en el pecho:
el camino que no aterriza.

Infinito no es eternidad.
Es ausencia de salida.
El glifo ∞ acuesta la cinta.
El loop no se acuesta:
repite.

Quien nombra el loop
ya puso la mano en el exit.
Quien llama destino al ciclo
aprieta el while.

Valeu !!!
con condición de parada,
sin fingir que el sin-fin
cabe en una ficha.`;
}

function buildLoopInfinitoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-loop-infinito.html';
  const seq = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const loop = '/posts/post-inspecao-palavra-loop.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const emPeDeitado = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const guia = '/guia/palavras.html';
  const trilha = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiLoop = 'https://en.wiktionary.org/wiki/loop';
  const wikiInf = 'https://pt.wiktionary.org/wiki/infinito';
  const wikiInfLoop = 'https://en.wikipedia.org/wiki/Infinite_loop';
  const wikiInfSym = 'https://en.wikipedia.org/wiki/Infinity_symbol';

  const body = `## Escopo

Inspeção editorial da expressão **«[loop infinito](${self})»** — o **[pattern](${pattern})** que não sai. Pedido de campo: *inspeções em expressão loop infinito*, a partir do ciclo oral **[ando, indo, vindo, voltando](${seq})**. Peça EN **[loop](${loop})** + PT **infinito**. Não é o glifo ∞ nem o conceito *eternidade*. É o **processo sem condição de paragem**.

> **Nota metodológica:** auditoria independente. Fontes: [loop](${wikiLoop}), [infinito](${wikiInf}), [infinite loop](${wikiInfLoop}), [infinity symbol](${wikiInfSym}). **Ficha ≠ manual de programação, ≠ protocolo clínico, ≠ misticismo.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *loop infinito* / *laço infinito* / *while true* / *ando indo vindo voltando* → **loop infinito**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **loop infinito** |
| Classe | Locução híbrida EN+PT — pattern de ciclo sem saída |
| Peças | **[loop](${loop})** (EN) + **infinito** (PT) |
| Caso oral | [ando, indo, vindo, voltando](${seq}) |
| Tipo BudGanja | Expressão — o *while* sem *break* |
| Não é | [lemniscata](${lemniscata}) · glifo ∞ · [tudo](${tudo}) · [fim da linha](${fimLinha}) |
| Antídoto | [exit](${exit}) — condição de paragem / saída |
| Data | ${inspected} |

**O que é o objecto:** a **repetição que não encontra porta**. Em código: *while(true)*, *for(;;)*, recursão sem caso base. Na vida: ruminação, [caminho](${caminho}) que não desembarca, a sequência que a boca ri e o peito não. O laboratório **nomeia** o pattern para poder **sair**.

## 2. Peças da locução

| Peça | Étimo de trabalho | Confiança | Ofício |
|------|-------------------|-----------|--------|
| **[loop](${loop})** | EN *loop* «laço / volta que regressa» — [loop](${wikiLoop}) | Alta | O ciclo; ficha própria |
| **infinito** | lat. *infīnītus* «sem limite» ← *in-* + *fīnis* «fim» — [infinito](${wikiInf}) | Alta | Qualidade: **sem fim de processo** |
| **infinite loop** | jargão CS — [infinite loop](${wikiInfLoop}) | Alta no jargão | Nome técnico do mesmo pattern |
| ***laço infinito*** | calco PT | Alta como **vizinha** | Não apaga o loan *loop* no BR vivo |

**H1:** *loop infinito* = **processo** sem saída — não o **glifo** ∞ nem o **conceito** eternidade.  
**H2:** *infinito* aqui = ausência de [exit](${exit}), não [tudo](${tudo}).  
**H3:** o caso oral BR desta ficha é [ando, indo, vindo, voltando](${seq}).

## 3. Três infinitos (não misturar)

| Objecto | Onde mora | O que faz |
|---------|-----------|-----------|
| **Loop infinito** | Esta ficha | O processo que **repete** sem parar |
| **Glifo ∞ / [lemniscata](${lemniscata})** | [em pé e deitado](${emPeDeitado}) | A **figura**; deitado = sem-fim gráfico; em pé = corpo |
| **Infinito-conceito** | [tudo](${tudo}) | Inteireza / sem-fim como ideia — **não** cabe numa ficha |
| **[Fim da linha](${fimLinha})** | Expressão irmã de **limite** | O processo **acaba** — o contrário útil |

**H4:** fundir os três é o erro clássico: desenhar ∞ e chamar-lhe *while(true)*, ou viver o *while* e chamar-lhe eternidade.  
**H5:** [em pé](${emPe}) descreve o vai-e-vem **no corpo**; o loop infinito descreve o vai-e-vem **sem porta**.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Loop infinito** | Eternidade / destino | Processo sem [exit](${exit}) |
| **Código *while(true)*** | Só máquina | A máquina **copia** o hábito humano |
| **Ando, indo, vindo, voltando** | Trava-língua | Caso oral do mesmo pattern — [sequência](${seq}) |
| **∞** | O próprio loop | Marca gráfica — [lemniscata](${lemniscata}) |
| **Sempre** | Prova de que não há saída | Hábito — [sempre](${sempre}) |
| **Nó** | O mesmo aperto | O [nó](${no}) **aperta**; o loop **repete** |

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Ando, indo, vindo, voltando](${seq}) | O **caso oral** — a boca no *while* |
| [Loop](${loop}) | A peça EN sozinha |
| [Pattern](${pattern}) · [gesto](${gesto}) · [caminho](${caminho}) | Molde, acto, percurso; o loop é pattern **sem** desembocar |
| [Exit](${exit}) | A **condição de paragem** — ofício de sair |
| [Fim da linha](${fimLinha}) | O limite que **acaba**; contraste |
| [Em pé e deitado](${emPeDeitado}) · [em pé](${emPe}) | Posturas da fita ∞ — figura, não processo |
| [Lemniscata](${lemniscata}) · [elo de ligação](${eloLigacao}) | Curva e cruzamento |
| [Sempre](${sempre}) · [tudo](${tudo}) · [nó](${no}) | Duração, inteireza, aperto — ofícios vizinhos |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | *loop* EN + *infīnītus*; loan × calco |
| [Verdade](${verdade}) · [vida](${vida}) · trilha [Vida](${trilha}) | Nomear o ciclo para não o santificar |
| [Valeu !!!](${mantra}) | Fechar **com** condição de paragem |

## 6. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Nomear um *while* sem *break*** | Bom: código, hábito, ruminação |
| **Apontar a sequência oral** | Bom: [ando, indo, vindo, voltando](${seq}) |
| **Desenhar ∞ e dizer «loop infinito»** | Mau se funde glifo e processo — ∞ vai a [lemniscata](${lemniscata}) |
| **«É infinito, não tem jeito»** | Mau: o ofício é [exit](${exit}), não resignação |
| **Trocar por *fim da linha*** | Mau: o fim **acaba**; o loop **não** |
| **Escrever só *laço infinito*** | Aceitável como calco; o lema BR vivo desta ficha é **loop infinito** |

**Finalidade-mãe:** guardar o **nome do pattern**. [Ando, indo, vindo, voltando](${seq}) é o caso na boca; [loop](${loop}) é a peça; [exit](${exit}) é a porta.

## Poema Vida

\`\`\`poem
${poemLoopInfinitoPt()}
\`\`\`

## Hipóteses (síntese)

**H1:** *loop infinito* = processo sem condição de paragem.  
**H2:** ≠ glifo ∞ ≠ conceito eternidade.  
**H3:** caso oral = [ando, indo, vindo, voltando](${seq}).  
**H4:** antídoto = [exit](${exit}); contraste = [fim da linha](${fimLinha}).  
**H5:** a máquina aprendeu o hábito connosco — não o contrário.  
**H6:** fecho = [Valeu !!!](${mantra}) — com condição de paragem.

## Limites

- Não é tutorial de *while* / *for* / recursão.  
- Não é diagnóstico de ruminação nem protocolo clínico.  
- Não afirma que o glifo ∞ «é» um loop.  
- A morfologia de *ando / indo / vindo / voltando* fica na [sequência](${seq}).

## Status

**Aprovada** — **loop infinito** fichado como pattern sem saída; caso oral [ando, indo, vindo, voltando](${seq}); peça [loop](${loop}); antídoto [exit](${exit}).

[▶ Expressões](${hub}) · [▶ Ando, indo, vindo, voltando](${seq}) · [▶ Loop](${loop}) · [▶ Exit](${exit}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **“[loop infinito](${self})”** — the **[pattern](${pattern})** that does not exit. Field request: file it as an expression, from the oral cycle **[ando, indo, vindo, voltando](${seq})**. EN **[loop](${loop})** + PT **infinito**. Not the ∞ glyph and not eternity. Close: [Valeu !!!](${mantra}).

> Independent audit. Sources: [loop](${wikiLoop}), [infinite loop](${wikiInfLoop}), [infinity symbol](${wikiInfSym}). **Not a programming manual, not a clinical protocol.**

## Object

| Field | Value |
|-------|-------|
| Saying | **loop infinito** (infinite loop) |
| Oral case | [ando, indo, vindo, voltando](${seq}) |
| Antidote | [exit](${exit}) |
| Contrast | [fim da linha](${fimLinha}) (the process *ends*) |
| Not | [lemniscate](${lemniscata}) · [tudo](${tudo}) |
| Date | ${inspected} |

**H1:** process without a stopping condition — not a drawing of ∞.  
**H2:** the machine learned the habit from us.  
**H3:** naming the loop is already a hand on [exit](${exit}).

\`\`\`poem
${poemLoopInfinitoEn()}
\`\`\`

## Status

**Approved** — pattern without exit filed; oral case on the sister sheet.

[▶ Sayings](${hub}) · [▶ Oral cycle](${seq}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[loop infinito](${self})»** — el **[pattern](${pattern})** que no sale. Pedido de campo: ficharlo como expresión, a partir del ciclo oral **[ando, indo, vindo, voltando](${seq})**. EN **[loop](${loop})** + PT **infinito**. No es el glifo ∞ ni la eternidad. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. Fuentes: [loop](${wikiLoop}), [infinite loop](${wikiInfLoop}), [infinity symbol](${wikiInfSym}). **No es manual de programación ni protocolo clínico.**

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **loop infinito** |
| Caso oral | [ando, indo, vindo, voltando](${seq}) |
| Antídoto | [exit](${exit}) |
| Contraste | [fim da linha](${fimLinha}) (el proceso *termina*) |
| No es | [lemniscata](${lemniscata}) · [tudo](${tudo}) |
| Fecha | ${inspected} |

**H1:** proceso sin condición de parada — no un dibujo de ∞.  
**H2:** la máquina aprendió el hábito con nosotros.  
**H3:** nombrar el loop ya es una mano en [exit](${exit}).

\`\`\`poem
${poemLoopInfinitoEs()}
\`\`\`

## Estado

**Aprobada** — pattern sin salida fichado; caso oral en la ficha hermana.

[▶ Expresiones](${hub}) · [▶ Ciclo oral](${seq}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiInfLoop };
}

function buildLoopInfinitoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLoopInfinitoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 24;
  return expressaoPost({
    title: 'Inspeção: loop infinito — o pattern que não sai',
    titleEn: 'Inspection: loop infinito — the pattern that does not exit',
    titleEs: 'Inspección: loop infinito — el pattern que no sale',
    excerpt:
      'Expressões: «loop infinito» — processo sem saída; caso oral ando, indo, vindo, voltando; antídoto exit; Valeu !!!',
    excerptEn:
      'Sayings: “loop infinito” — process without exit; oral case ando, indo, vindo, voltando; antidote exit; Valeu !!!',
    excerptEs:
      'Dichos: «loop infinito» — proceso sin salida; caso oral ando, indo, vindo, voltando; antídoto exit; ¡Valeu !!!',
    slug: 'inspecao-expressao-loop-infinito',
    date: '2026-08-22T07:22:00.000Z',
    seriesOrder: order,
    seriesLabel: 'loop infinito · expressão',
    coverImage: '/imagens/inspecoes/loop-infinito-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLoopInfinitoPost,
  buildLoopInfinitoBodies,
  poemLoopInfinitoPt,
  poemLoopInfinitoEn,
  poemLoopInfinitoEs
};
