'use strict';

/**
 * Inspeção Palavras · resetar / Reseta
 * Pedido: inspecao da palabra Reseta (palabra = palvra ES; Reseta = ele/ela reseta).
 * Âncora: resetar ← EN reset (re- + set).
 * Cola: receita / receta (c/s). Irmã: restore (pôr de pé ≠ devolver ao zero).
 * Ficha ≠ tutorial de factory reset, ≠ receita médica, ≠ guia de apagar rasto.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/resetar-palavra-cover.jpg';
const WIKT_RESET = 'https://en.wiktionary.org/wiki/reset';
const WIKT_RESETAR = 'https://pt.wiktionary.org/wiki/resetar';
const WIKT_SET = 'https://en.wiktionary.org/wiki/set#English';
const WIKT_RECEITA = 'https://pt.wiktionary.org/wiki/receita';
const WIKT_RECETA = 'https://es.wiktionary.org/wiki/receta';

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
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Reseta.
Não é a receita.
Não é a receta.

A boca cola o s
no c da fórmula.
O étimo corta:
re- + set —
pôr de novo no começo.

Restore põe de pé o que estava.
Resetar devolve ao zero.
Duas portas.
O mesmo re-.

Não é o tutorial de apagar.
Não é a receita médica.
É o verbo do ponto inicial.

Valeu !!!
o começo outra vez,
sem fingir que a cópia voltou.`;
}

function poemEn() {
  return `Reseta.
It is not the recipe.
It is not Spanish receta.

The mouth glues the s
onto the c of the formula.
The etymon cuts:
re- + set —
to put again at the start.

Restore sets back on its feet.
To reset returns to zero.
Two doors.
The same re-.

It is not a wipe tutorial.
It is not a medical prescription.
It is the verb of the initial point.

Valeu !!!
the start once more,
without pretending the copy came back.`;
}

function poemEs() {
  return `Reseta.
No es la receta.
No es a receita.

La boca pega la s
en la c de la fórmula.
El étimo corta:
re- + set —
poner de nuevo en el comienzo.

Restore pone de pie lo que estaba.
Resetar devuelve al cero.
Dos puertas.
El mismo re-.

No es el tutorial de borrar.
No es la receta médica.
Es el verbo del punto inicial.

¡Valeu !!!
el comienzo otra vez,
sin fingir que la copia volvió.`;
}

function buildResetarBodies() {
  const inspected = '2026-08-26';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-resetar.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const save = '/posts/post-inspecao-palavra-save-game.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const enter = '/posts/post-inspecao-palavra-enter.html';
  const internet = '/posts/post-inspecao-palavra-internet.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const receitas = '/posts/post-inspecao-guia-receitas-plantas.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const techHub = '/tecnologia/';

  const body = `## Escopo

Inspeção editorial da palavra **[resetar](${self})** — o verbo do **voltar ao ponto inicial**. Pedido de campo: *inspecao da palabra Reseta*. *Palabra* é o espanhol de [palavra](${palavra}). **Reseta** é a boca conjugada (*ele/ela reseta*) e a grafia capitalizada do pedido. [A orelha cola](${orelhaCola}) **Reseta** em **[receita](${WIKT_RECEITA})** / esp. **[receta](${WIKT_RECETA})** (o *c* vira *s*). O [étimo](${etimo}) **corta**: EN *reset* = *re-* + *set* («pôr outra vez»). A âncora é o **verbo de ofício**, não a fórmula da cozinha nem a receita médica.

> **Nota metodológica:** auditoria independente. Fontes: [reset](${WIKT_RESET}), [resetar](${WIKT_RESETAR}), [set](${WIKT_SET}), [receita](${WIKT_RECEITA}), [receta](${WIKT_RECETA}). Método: [etimologia](${etimologia}) · [língua portuguesa](${lingua}). **Ficha ≠ tutorial de factory reset, ≠ guia de apagar rasto, ≠ bula, ≠ copiar [receitas de plantas](${receitas}).** Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Reseta* / *reseta* / *resetar* / *reset* / *dar um reset* → lema **resetar**. Fórmula da cozinha / da farmácia → sala **receita**. Pôr de pé o que estava → [restore](${restore}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **resetar** (verbo) · EN **reset** (nome / verbo) |
| Pedido de campo | **Reseta** — 3.ª pessoa / grafia capitalizada; *palabra* = palvra ES |
| Classe | Verbo PT (empréstimo) · nome/verbo EN |
| Étimo (trabalho) | EN *reset* ← *re-* (lat. «outra vez») + *set* (OE *settan* «pôr») — confiança: **alta** |
| Tipo BudGanja | Palavra — [gesto](${gesto}) de ofício × cola receita/receta × irmã [restore](${restore}) |
| Não é | [receita](${WIKT_RECEITA}) / [receta](${WIKT_RECETA}) · [restore](${restore}) · tutorial de apagar · bula |
| Elo circuito | [restore](${restore}) · [ligar / desligar](${ligar}) · [save game](${save}) · [backspace](${backspace}) |
| Fonte | [resetar](${WIKT_RESETAR}) · [reset](${WIKT_RESET}) |
| Data | ${inspected} |

**O que é o objecto:** o [gesto](${gesto}) de **pôr outra vez no sítio inicial**. No ecrã BR: *reseta o telemóvel*, *deu um reset*, *resetar a palavra-passe* (nomeia-se o acto; **não** se ensina a furar a porta). No laboratório: o vocábulo. A cópia que **volta** é [restore](${restore}). A fórmula que **ensina o prato** é [receita](${WIKT_RECEITA}) — outra árvore (lat. *recepta*).

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Reseta** | Um nome próprio / uma receita | Conjugação de **resetar** (*ele reseta*) e gatilho do pedido |
| **palabra Reseta** | Lema espanhol | *Palabra* = [palavra](${palavra}) em ES; *Reseta* cola em *receta* |
| **receita / receta** | A mesma boca *re-se-ta* | Lat. *recepta* «a coisa recebida» — fórmula / prescrição — **outra árvore** |
| **[restore](${restore})** | Sinónimo («voltar») | *restaurāre* = pôr de pé o que **estava**; resetar = devolver ao **zero** |
| **restaurar / restaurante** | O mesmo *re-* | Sala da ficha [restore](${restore}) — corpo / restauro, não o ponto inicial |
| **reset de fábrica** | Manual desta ficha | **Nomeia-se** o [risco](${risco}); **não** é tutorial |

**H-lapso:** *Reseta* = *resetar* em trânsito (pessoa verbal + maiúscula de campo). O lab **não** repreende a boca; ancora o infinitivo.  
**H-cola:** *palabra* puxa o espanhol *receta*; o *c* e o *s* trocam na orelha. *Receita* PT tem ainda o *ei*. Duas mudanças — a cola é forte; o sangue é outro.  
**H-irmãs:** [restore](${restore}) **recupera**; resetar **recomeça**. Quem reseta sem [backup](${restore}) pede milagre ao ar.  
**H-receita:** neste sítio, «ficha ≠ receita» recusa o **manual**. A palavra *receita* (cozinha / farmácia) é sala à parte; o guia de [receitas de plantas](${receitas}) **não** é esta âncora.

## 3. Duas peças — re- + set

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **re-** | Lat. *re-* «outra vez, para trás» | Alta |
| **set** | OE *settan* «pôr, assentar» | Alta |
| **reset** | Composto EN — pôr outra vez (no sítio inicial / a zero) | Alta |
| **resetar** | Empréstimo PT com *-ar* de verbo | Alta |
| **reseta** | 3.ª pessoa do presente / oral de comando | Alta (forma, não lema) |
| **receita** | Lat. *recepta* ← *recipere* «receber» | Alta — **outro étimo** |

**Veredicto etimológico:** *resetar* não desce de *receita*. O *re-* é o mesmo prefixo latino em muitas portas; o núcleo *set* ≠ *cepta*. *Reseta* e *receta* colam na boca; o [étimo](${etimo}) separa o **pôr** do **receber**.

## 4. Salas que não fundir

| Sala | O que é | Ficha |
|------|---------|-------|
| **A. Vocábulo** | O verbo de voltar ao inicial | **Esta** |
| **B. Cola** | *receita* / *receta* — fórmula recebida | [Wikcionário](${WIKT_RECEITA}) · guia [receitas de plantas](${receitas}) |
| **C. Irmã** | Pôr de pé o que estava | [restore](${restore}) |
| **D. Circuito** | Ligar, gravar, apagar uma tecla | [ligar](${ligar}) · [save game](${save}) · [backspace](${backspace}) |
| **E. Porta** | Entrar na sessão | [login](${login}) · [Enter](${enter}) |
| **F. Risco** | Apagar sem cópia / «reset» como ameaça | Nomeia-se — **não** se ensina |

Sem receita de factory reset, sem bypass de [login](${login}), sem apagar rasto alheio.

## 5. Resetar × restore × receita

| Peça | Direcção | Ofício |
|------|----------|--------|
| **[resetar](${self})** | Para o **começo** | Ponto zero / estado de fábrica (nome, não manual) |
| **[restore](${restore})** | Para o que **estava** | Pôr de pé de novo — precisa de cópia |
| **receita** | Fórmula **recebida** | Cozinha, farmácia, ofício — lat. *recepta* |
| **[save game](${save})** | Gravar a partida | Rasto — o contrário de resetar sem pensar |

Quatro salas. O *re-* une resetar e restore na orelha; o objecto muda: **zero** × **cópia**. *Receita* só cola.

## 6. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Ancorar **resetar**; ler *Reseta* como forma do verbo |
| Bom | Cortar *receita* / *receta* como cola, não como lema |
| Bom | Mandar «voltar o que estava» para [restore](${restore}) |
| Bom | Recordar que resetar sem cópia é [risco](${risco}) |
| Mau | Fundir reset, receita médica e prato de cozinha |
| Mau | Transformar a ficha em tutorial de apagar, formatar ou furar porta |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=resetar)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [restore](${restore}) | Irmã — pôr de pé o que estava |
| [ligar / desligar](${ligar}) | O circuito antes do reset |
| [save game](${save}) | A partida gravada — o rasto |
| [backspace](${backspace}) | Apaga a tecla, não o estado |
| [login](${login}) · [Enter](${enter}) | Porta e confirmação |
| [Internet](${internet}) | A rede onde o reset também se diz |
| [receitas de plantas](${receitas}) | A **outra** receita — ofício de chá, não este verbo |
| [tecnologia](${techHub}) | Catálogo de ofício |
| [Guia](${guia}) · [Palavras](${hub}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a formatar, a fazer factory reset nem a apagar rasto alheio.  
- Não é bula nem prescrição (*receita médica*).  
- Não funde *resetar*, *restore* e *receita*.  
- Não copia o guia de [receitas de plantas](${receitas}).

## Status

**Aprovado na série Palavras** — *resetar* ← EN *re-* + *set*; *Reseta* = forma de campo; *receita* / *receta* = cola; [restore](${restore}) noutra sala. [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Restore](${restore}) · [▶ Ligar / desligar](${ligar}) · [▶ Save game](${save}) · [▶ Valeu !!!](${mantra}) · [▶ Língua](${lingua}) · [▶ [ação](${acao})]
`;

  const contentEn = `## Scope

The word **[resetar](${self})** — Portuguese loan of EN **reset** (*re-* + *set*): put again at the **start**. Field: *palabra Reseta* (*palabra* = Spanish for word; *Reseta* = *ele reseta*). The ear glues **receita / receta** (recipe, prescription). The etymon cuts: *set* ≠ Latin *recepta*. Sister **[restore](${restore})** puts back what **was**; reset returns to **zero**.

> [reset](${WIKT_RESET}), [resetar](${WIKT_RESETAR}). **Not** a factory-reset tutorial, **not** a medical prescription. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **resetar** / EN **reset** |
| Field form | **Reseta** — 3rd person / capitalised slip |
| Glue | PT *receita* · ES *receta* ← Lat. *recepta* |
| Sister | [restore](${restore}) — set back on its feet |
| Date | ${inspected} |

**H1:** *re-* + *set* = set again.  
**H2:** *Reseta* ≠ *receita*.  
**H3:** reset without a copy is [risco](${risco}), not a method taught here.

\`\`\`poem
${poemEn()}
\`\`\`

**Status:** approved in Words. [Valeu !!!](${mantra})

[▶ Words](${hub}) · [▶ Restore](${restore}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

La palabra **[resetar](${self})** — préstamo PT del EN **reset** (*re-* + *set*): poner otra vez en el **comienzo**. Pedido: *palabra Reseta*. El oído pega **receita / receta**. El étimo corta: *set* ≠ lat. *recepta*. Hermana **[restore](${restore})** pone de pie lo que **estaba**; resetar vuelve al **cero**.

> [reset](${WIKT_RESET}), [resetar](${WIKT_RESETAR}). **No** es tutorial de factory reset, **no** es receta médica. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Áncora | **resetar** / EN **reset** |
| Forma de campo | **Reseta** — 3.ª persona / mayúscula |
| Cola | PT *receita* · ES *receta* ← lat. *recepta* |
| Hermana | [restore](${restore}) — poner de pie |
| Fecha | ${inspected} |

**H1:** *re-* + *set* = poner otra vez.  
**H2:** *Reseta* ≠ *receta*.  
**H3:** resetar sin copia es [risco](${risco}); aquí no se enseña el borrado.

\`\`\`poem
${poemEs()}
\`\`\`

**Estado:** aprobada en Palabras. [¡Valeu !!!](${mantra})

[▶ Palabras](${hub}) · [▶ Restore](${restore}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildResetarPost() {
  const { body, contentEn, contentEs } = buildResetarBodies();
  return makePalavra({
    title: 'Inspeção: Resetar — Reseta não é receita; re- + set',
    titleEn: 'Inspection: Resetar — Reseta is not a recipe; re- + set',
    titleEs: 'Inspección: Resetar — Reseta no es receta; re- + set',
    excerpt:
      'Palavras: resetar ← EN re- + set; Reseta = forma de campo; ≠ receita ≠ receta ≠ restore; Valeu !!!',
    excerptEn:
      'Words: resetar ← EN re- + set; Reseta = field form; ≠ recipe ≠ receta ≠ restore; Valeu !!!',
    excerptEs:
      'Palabras: resetar ← EN re- + set; Reseta = forma de campo; ≠ receita ≠ receta ≠ restore; ¡Valeu !!!',
    slug: 'inspecao-palavra-resetar',
    date: '2026-08-26T09:30:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-resetar', 367),
    seriesLabel: 'Resetar · re- + set',
    coverImage: COVER,
    sourceUrl: WIKT_RESETAR,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildResetarPost,
  buildResetarBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_RESETAR
};
