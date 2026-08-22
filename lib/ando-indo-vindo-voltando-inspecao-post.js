'use strict';

/**
 * Inspeção Expressões · ando, indo, vindo, voltando
 * Sequência oral BR — o loop que não pousa; *ando* (eu ando) + três gerúndios.
 * Par de ofício: loop infinito. Valeu !!!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemAndoIndoVindoVoltandoPt() {
  return `Ando.
Indo.
Vindo.
Voltando.

Não é quatro passos.
É o mesmo passo
que não desce no chão.

Ando ainda tem sujeito —
eu ando.
Indo já perdeu o eu.
Vindo puxa de lá.
Voltando promete casa
e não entrega a porta.

Quem diz a sequência
ri.
Quem vive a sequência
não ri.
O loop não é graça.
É gerúndio sem ponto.

Há um fim da linha.
Há um exit.
Há um Valeu !!!
que corta o ciclo
sem fingir que o caminho
é só ir e voltar.

Valeu !!!
andando ainda —
não andando para sempre.`;
}

function poemAndoIndoVindoVoltandoEn() {
  return `I walk.
Going.
Coming.
Returning.

It is not four steps.
It is the same step
that does not land.

Ando still has a subject —
I walk.
Going has already lost the I.
Coming pulls from there.
Returning promises home
and does not hand over the door.

Whoever says the sequence
laughs.
Whoever lives the sequence
does not laugh.
The loop is not a joke.
It is a gerund without a period.

There is an end of the line.
There is an exit.
There is a Valeu !!!
that cuts the cycle
without pretending the path
is only going and coming back.

Valeu !!!
still walking —
not walking forever.`;
}

function poemAndoIndoVindoVoltandoEs() {
  return `Ando.
Yendo.
Viniendo.
Volviendo.

No son cuatro pasos.
Es el mismo paso
que no baja al suelo.

Ando todavía tiene sujeto —
yo ando.
Yendo ya perdió el yo.
Viniendo tira de allá.
Volviendo promete casa
y no entrega la puerta.

Quien dice la secuencia
ríe.
Quien vive la secuencia
no ríe.
El loop no es gracia.
Es gerundio sin punto.

Hay un fin de la línea.
Hay un exit.
Hay un Valeu !!!
que corta el ciclo
sin fingir que el camino
es solo ir y volver.

Valeu !!!
andando todavía —
no andando para siempre.`;
}

function buildAndoIndoVindoVoltandoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const loopInf = '/posts/post-inspecao-expressao-loop-infinito.html';
  const loop = '/posts/post-inspecao-palavra-loop.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
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
  const guia = '/guia/palavras.html';
  const trilha = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiAndar = 'https://pt.wiktionary.org/wiki/andar';
  const wikiIr = 'https://pt.wiktionary.org/wiki/ir';
  const wikiVir = 'https://pt.wiktionary.org/wiki/vir';
  const wikiVoltar = 'https://pt.wiktionary.org/wiki/voltar';
  const wikiGerundio = 'https://pt.wikipedia.org/wiki/Ger%C3%BAndio';
  const wikiInfLoop = 'https://en.wikipedia.org/wiki/Infinite_loop';

  const body = `## Escopo

Inspeção editorial da expressão **«[ando, indo, vindo, voltando](${self})»** — a **sequência oral** BR que não pousa. Pedido de campo: *ando, indo, vindo, voltando* · inspeções desse **[loop infinito](${loopInf})**. Quatro peças de movimento; um só ciclo. O nome do [pattern](${pattern}) fica na expressão irmã; a peça EN **[loop](${loop})** na palavra. Esta ficha inspecciona a **fala que gira**.

> **Nota metodológica:** auditoria independente. Fontes: [andar](${wikiAndar}), [ir](${wikiIr}), [vir](${wikiVir}), [voltar](${wikiVoltar}), [gerúndio](${wikiGerundio}), [infinite loop](${wikiInfLoop}). **Ficha ≠ autoajuda, ≠ protocolo clínico, ≠ aula de conjugação.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *ando indo vindo voltando* / *andando, indo, vindo, voltando* / *indo e vindo* → **ando, indo, vindo, voltando**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **ando, indo, vindo, voltando** |
| Classe | Sequência oral BR — ciclo de movimento |
| Peças | **ando** (*eu ando*) + **indo** + **vindo** + **voltando** |
| Variante | *andando, indo, vindo, voltando* (quatro gerúndios) |
| Nome do pattern | [loop infinito](${loopInf}) |
| Peça EN | [loop](${loop}) |
| Tipo BudGanja | Expressão — o ciclo falado, não o glifo ∞ |
| Não é | eternidade · [tudo](${tudo}) · [lemniscata](${lemniscata}) · [fim da linha](${fimLinha}) |
| Data | ${inspected} |

**O que é o objecto:** a **roda da boca**. Diz-se a rir, como trava-língua de gerúndios. Vive-se sem rir, quando o [caminho](${caminho}) não desembarca. O laboratório guarda a sequência **com as quatro peças na ordem do pedido**.

## 2. Peças da locução

| Peça | Forma | Étimo de trabalho | Ofício |
|------|-------|-------------------|--------|
| **ando** | 1.ª pess. pres. de *andar* | lat. *ambulāre* «andar» — [andar](${wikiAndar}) | Ainda tem **sujeito**: *eu ando* |
| **indo** | gerúndio de *ir* | lat. *īre* — [ir](${wikiIr}) | O ir sem eu; movimento para lá |
| **vindo** | gerúndio de *vir* | lat. *venīre* — [vir](${wikiVir}) | O vir; movimento para cá |
| **voltando** | gerúndio de *voltar* | lat. *volūtāre* / família de *volvere* «virar» — [voltar](${wikiVoltar}) | A promessa de casa que não fecha a porta |
| ***andando*** | gerúndio de *andar* | o mesmo *ambulāre* | Variante: quatro gerúndios; **não** apaga o *ando* do pedido |

**H1:** *ando* **não** é gerúndio — é *eu ando*. A graça (e o aperto) começa aí: um presente conjugado cola em três processos sem sujeito.  
**H2:** a variante *andando…* homogeneíza a morfologia; o lab **anota** e **não substitui** a forma pedida.  
**H3:** *voltando* promete retorno; no ciclo, o retorno é só a próxima volta.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **A sequência** | Quatro verbos, quatro destinos | Um só [loop](${loop}) oral |
| **Ando** | Gerúndio partido (*andando*) | Presente: ainda há um *eu* |
| **Indo / vindo** | Ida e volta equilibradas | Vai-e-vem **sem pouso** |
| **Voltando** | Chegar a casa | Reentrar no ciclo |
| **Rir da frase** | Só brincadeira | O ouvido ri; o peito pode estar no *while* |
| **∞ / lemniscata** | O mesmo objecto | O glifo nomeia o **sem-fim gráfico**; esta ficha nomeia o **ciclo falado** — [em pé e deitado](${emPeDeitado}) |
| **Sempre** | Destino | Hábito que se pode [sair](${exit}) — [sempre](${sempre}) ≠ lei |

## 4. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Loop infinito](${loopInf}) | O **nome** do pattern — código e vida |
| [Loop](${loop}) | A peça EN: laço que regressa |
| [Caminho](${caminho}) · [passar](${passar}) · [gesto](${gesto}) | Percurso, travessia, acto; o ciclo **adia** o passar |
| [Pattern](${pattern}) | A repetição reconhecível; esta sequência **é** um pattern oral |
| [Exit](${exit}) · [fim da linha](${fimLinha}) | A saída e o limite — o loop **não** os substitui |
| [Em pé](${emPe}) · [em pé e deitado](${emPeDeitado}) | Em pé = vai-e-vem no corpo; deitado = ∞; **≠** esta roda falada |
| [Lemniscata](${lemniscata}) · [elo de ligação](${eloLigacao}) | Curva-fita e cruzamento — figura, não gerúndio |
| [Sempre](${sempre}) · [tudo](${tudo}) | Duração e inteireza; nenhum dos dois é *while(true)* |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | *ambulāre / īre / venīre / volvere*; gerúndio PT |
| [Verdade](${verdade}) · [vida](${vida}) · trilha [Vida](${trilha}) | Nomear o ciclo sem o santificar |
| [Valeu !!!](${mantra}) | Cortar o ciclo com ofício, não com cartaz de eternidade |

## 5. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Dizer a sequência a rir** | Bom: trava-língua; guarda o ouvido |
| **Nomear o ciclo da vida / do código** | Bom se se aponta para [loop infinito](${loopInf}) |
| **«Andando, indo…» no lugar de *ando*** | Bom como **variante**; mau se apaga o *eu ando* |
| **Colar a sequência no glifo ∞** | Mau: ∞ é [lemniscata](${lemniscata}) / [em pé e deitado](${emPeDeitado}) |
| **«É o destino, sempre a ir e vir»** | Mau: [sempre](${sempre}) não fecha o *while*; há [exit](${exit}) |
| **Fim da linha = loop** | Mau: [fim da linha](${fimLinha}) **acaba**; o loop **não** |

**Finalidade-mãe:** guardar a **fala que gira**. A sequência é o ciclo na boca; [loop infinito](${loopInf}) é o nome do pattern; [exit](${exit}) é o ofício de sair.

## Poema Vida

\`\`\`poem
${poemAndoIndoVindoVoltandoPt()}
\`\`\`

## Hipóteses (síntese)

**H1:** *ando, indo, vindo, voltando* = sequência oral do ciclo que não pousa.  
**H2:** *ando* = *eu ando* (presente); os outros três = gerúndios.  
**H3:** *andando…* é variante, não lema.  
**H4:** o nome do pattern = [loop infinito](${loopInf}); a peça EN = [loop](${loop}).  
**H5:** ≠ ∞ / [lemniscata](${lemniscata}); ≠ [fim da linha](${fimLinha}).  
**H6:** fecho = [Valeu !!!](${mantra}) — andando ainda, não andando para sempre.

## Limites

- Não é aula de morfologia nem de teoria da computação.  
- Não prescreve «parar de se mover» nem «continuar a qualquer custo».  
- Não funde gerúndio, glifo ∞ e conceito *infinito* ([tudo](${tudo})).  
- O *while(true)* e a condição de paragem ficam em [loop infinito](${loopInf}).

## Status

**Aprovada** — sequência **ando, indo, vindo, voltando** fichada como ciclo oral BR; *ando* = presente com sujeito; par [loop infinito](${loopInf}); peça [loop](${loop}).

[▶ Expressões](${hub}) · [▶ Loop infinito](${loopInf}) · [▶ Loop](${loop}) · [▶ Exit](${exit}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Brazilian **“[ando, indo, vindo, voltando](${self})”** — the **spoken cycle** that does not land. Field request: inspections of this **[infinite loop](${loopInf})**. Four movement pieces; one cycle. Close: [Valeu !!!](${mantra}).

> Independent audit. Sources: [andar](${wikiAndar}), [ir](${wikiIr}), [vir](${wikiVir}), [voltar](${wikiVoltar}), [infinite loop](${wikiInfLoop}). **Not self-help, not a clinical protocol.**

## Object

| Field | Value |
|-------|-------|
| Saying | **ando, indo, vindo, voltando** (I walk, going, coming, returning) |
| Twist | *ando* is present tense (*I walk*), not the gerund *andando* |
| Pattern name | [loop infinito](${loopInf}) |
| EN piece | [loop](${loop}) |
| Not | eternity · ∞ glyph · [fim da linha](${fimLinha}) |
| Date | ${inspected} |

**H1:** one spoken wheel — a conjugated *I* glued to three gerunds.  
**H2:** laughing at the tongue-twister ≠ living inside the *while*.  
**H3:** [exit](${exit}) and [end of the line](${fimLinha}) are other crafts.

\`\`\`poem
${poemAndoIndoVindoVoltandoEn()}
\`\`\`

## Status

**Approved** — oral BR cycle filed; pair [infinite loop](${loopInf}).

[▶ Sayings](${hub}) · [▶ Infinite loop](${loopInf}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[ando, indo, vindo, voltando](${self})»** — el **ciclo oral** BR que no aterriza. Pedido de campo: inspecciones de este **[loop infinito](${loopInf})**. Cuatro piezas de movimiento; un solo ciclo. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. Fuentes: [andar](${wikiAndar}), [ir](${wikiIr}), [vir](${wikiVir}), [voltar](${wikiVoltar}), [infinite loop](${wikiInfLoop}). **No es autoayuda ni protocolo clínico.**

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **ando, indo, vindo, voltando** (ando, yendo, viniendo, volviendo) |
| Giro | *ando* es presente (*yo ando*), no el gerundio *andando* |
| Nombre del pattern | [loop infinito](${loopInf}) |
| Pieza EN | [loop](${loop}) |
| No es | eternidad · glifo ∞ · [fim da linha](${fimLinha}) |
| Fecha | ${inspected} |

**H1:** una rueda hablada — un *yo* conjugado pegado a tres gerundios.  
**H2:** reír del trabalenguas ≠ vivir dentro del *while*.  
**H3:** [exit](${exit}) y [fim da linha](${fimLinha}) son otros oficios.

\`\`\`poem
${poemAndoIndoVindoVoltandoEs()}
\`\`\`

## Estado

**Aprobada** — ciclo oral BR fichado; par [loop infinito](${loopInf}).

[▶ Expresiones](${hub}) · [▶ Loop infinito](${loopInf}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiAndar };
}

function buildAndoIndoVindoVoltandoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildAndoIndoVindoVoltandoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 23;
  return expressaoPost({
    title: 'Inspeção: ando, indo, vindo, voltando — o ciclo que não pousa',
    titleEn: 'Inspection: ando, indo, vindo, voltando — the cycle that does not land',
    titleEs: 'Inspección: ando, indo, vindo, voltando — el ciclo que no aterriza',
    excerpt:
      'Expressões: «ando, indo, vindo, voltando» — sequência oral do loop; ando = eu ando; par loop infinito; Valeu !!!',
    excerptEn:
      'Sayings: “ando, indo, vindo, voltando” — spoken cycle of the loop; ando = I walk; pair infinite loop; Valeu !!!',
    excerptEs:
      'Dichos: «ando, indo, vindo, voltando» — secuencia oral del loop; ando = yo ando; par loop infinito; ¡Valeu !!!',
    slug: 'inspecao-expressao-ando-indo-vindo-voltando',
    date: '2026-08-22T07:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'ando, indo, vindo, voltando · expressão',
    coverImage: '/imagens/inspecoes/ando-indo-vindo-voltando-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAndoIndoVindoVoltandoPost,
  buildAndoIndoVindoVoltandoBodies,
  poemAndoIndoVindoVoltandoPt,
  poemAndoIndoVindoVoltandoEn,
  poemAndoIndoVindoVoltandoEs
};
