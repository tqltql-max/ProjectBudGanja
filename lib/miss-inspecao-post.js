'use strict';

/**
 * Inspeção Palavras · miss
 * Pedido 1: inspeção da palavra Miss cruzada com Faltando.
 * Pedido 2: cruzada com ERROR.
 *
 * Três árvores, um campo:
 *   miss     — germ. *missijaną / OE missan «falhar o alvo»
 *   faltando — lat. fallere «falhar, enganar» → PT faltar (gerúndio)
 *   ERROR    — lat. errāre «errar o caminho» → error / erro
 * Cruzamento de uso, não de sangue. Título Miss (← mistress) = outra sala.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/miss-palavra-cover.jpg';
const WIKT_MISS = 'https://en.wiktionary.org/wiki/miss#English';
const WIKT_FALTAR = 'https://pt.wiktionary.org/wiki/faltar';
const WIKT_ERROR = 'https://en.wiktionary.org/wiki/error';
const WIKT_ERRO = 'https://pt.wiktionary.org/wiki/erro';
const WIKT_ERRARE = 'https://en.wiktionary.org/wiki/erro#Latin';
const WIKT_FALLERE = 'https://en.wiktionary.org/wiki/fallo#Latin';

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
  return `Miss.
Não é o título.
Não é o grito da máquina.
É falhar o alvo.

Faltando é o que não está.
ERROR é o nome do desvio.

Três árvores.
Um campo.

I miss you
não é 500.
É a falta no peito.

Cache miss
não é queda.
É a caixa que não tinha o alvo.

Em português
errar o alvo
já junta o miss e o erro.
O lab não funde as raízes.

Valeu !!!
nomear o desvio
sem colar as salas.`;
}

function poemEn() {
  return `Miss.
Not the title.
Not the machine scream.
It is failing to hit.

Faltando is what is not there.
ERROR is the name of the wander.

Three trees.
One field.

I miss you
is not a 500.
It is the lack in the chest.

A cache miss
is not a crash.
It is the box that did not hold the target.

In Portuguese
errar o alvo
already joins miss and error.
The lab does not fuse the roots.

Valeu !!!
name the wander
without gluing the rooms.`;
}

function poemEs() {
  return `Miss.
No es el título.
No es el grito de la máquina.
Es fallar el blanco.

Faltando es lo que no está.
ERROR es el nombre del desvío.

Tres árboles.
Un campo.

I miss you
no es un 500.
Es la falta en el pecho.

Cache miss
no es una caída.
Es la caja que no tenía el blanco.

En portugués
errar o alvo
ya junta el miss y el error.
El lab no funde las raíces.

¡Valeu !!!
nombrar el desvío
sin pegar las salas.`;
}

function buildMissBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-miss.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const missClick = '/posts/post-inspecao-expressao-miss-click.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[miss](${self})** — inglês *miss*: falhar o alvo; sentir a ausência. Pedido de campo: *inspeção da palavra Miss cruzada com Faltando*. Eco: *cruzada com ERROR*.

Três árvores, um campo. O **objecto** é o vocábulo inglês *miss* (verbo / nome do falhanço). O **estado** cruzado é o gerúndio português **faltando** (lat. *fallere*). O **nome do desvio** é **ERROR** (lat. *errāre*). A [orelha](${orelha}) cola as três porque todas apontam para «não está / não acertou / deu errado». O étimo **corta**: germânico × *fallere* × *errāre*. O título *Miss* (← *mistress*) é **outra sala**. A locução [Miss Click](${missClick}) é **outra ficha** (clique errado, prefixo *mis-*). Objecto = o **vocábulo**. Não é tutorial de debugger. Não é concurso de Miss. Não é clínica de saudade.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · miss](${WIKT_MISS}), [faltar](${WIKT_FALTAR}), [error](${WIKT_ERROR}), [erro](${WIKT_ERRO}), lat. [*errō*](${WIKT_ERRARE}), [*fallō*](${WIKT_FALLERE}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ RFC HTTP, ≠ pageant, ≠ manual de excepção, ≠ dicionário de saudade.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *miss* / *I miss you* / *missing* / *cache miss* / *faltando* / *faltar* / *falta* / *ERROR* / *erro* / *errar o alvo*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **miss** (EN; no BR entra como loan: *I miss you*, *you missed*, *Miss*) |
| Classe | Verbo e substantivo ingleses; no PT, empréstimo + cruzamento com *faltando* e *erro* |
| Étimo (trabalho) | Germ. *missijaną* / OE *missan* «falhar o alvo, não acertar» — confiança: **alta** |
| Cruzamento 1 | PT **faltando** ← *faltar* ← lat. *fallere* «falhar, enganar, decepcionar» |
| Cruzamento 2 | EN **ERROR** / PT *erro* ← lat. *error* ← *errāre* «vagar, sair do [caminho](${caminho})» |
| Não-irmã (título) | *Miss* ← *mistress* ← lat. *magister* — **outra árvore** |
| Tipo BudGanja | Palavra — loan EN × gerúndio PT × grito de máquina |
| Não é | Debugger · Miss Universo · protocolo HTTP · terapia de ausência |
| Data | ${inspected} |
| Fonte | [miss](${WIKT_MISS}) |

**O que é o objecto:** o nome inglês do **tiro que não acertou** — e, por extensão, do **sentir que alguém não está**. No lab: [objecto](${self}) lexical. A capital *Miss* (título) partilha grafia e **não** partilha sangue. O caps-lock *ERROR* é o log a gritar o desvio; não é o verbo *miss*.

## 2. Três linhagens — o cruzamento

Pedido de campo: *Miss* × *Faltando* × *ERROR*. O lab **cruza** e **não funde**.

| Linhagem | Peça | Origem | Ofício nesta ficha |
|----------|------|--------|---------------------|
| **Étimo de miss** | *missan* | Germânico — «falhar o alvo» | O **acto** de não acertar; o sentir a ausência |
| **Étimo de faltando** | *fallere* | Latim — «falhar, enganar» | O **estado** do que não está no conjunto |
| **Étimo de ERROR** | *errāre* | Latim — «vagar, sair da via» | O **nome** do desvio (o log, o *erro*) |
| **Título cortado** | *Miss* | *mistress* / *magister* | Tratamento; **não** o verbo |

**H-cruzamento:** as três encontram-se no campo semântico da ausência e do falhanço. **Não** são a mesma raiz. A [relação](${relacao}) é de ofício, não de genealogia.  
**H-orelha:** a boca BR cola *miss* em *faltando* («está missing») e cola *miss* em *erro* («you missed = você errou»). A cola é útil; o étimo **mantém três salas**.  
**H-errar-PT:** o português **errar o alvo** já faz, num só verbo (*errāre*), o trabalho que o inglês parte em *miss* + *error*. Cruzamento nativo — não prova de que *miss* venha de *errāre*.

## 3. *miss* — falhar o alvo (germânico)

O [Wiktionary](${WIKT_MISS}) fecha o étimo inglês: *miss* «fail to hit; fail to reach; notice the absence of». Daí a família à vista:

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **miss** (verbo) | OE *missan* → ME *missen* → EN *miss* | Alta |
| **a miss** (nome) | O falhanço — «that was a miss» | Alta |
| **missing** | Ausente do conjunto — «the file is missing» | Alta |
| **I miss you** | Sentir a ausência da pessoa | Alta como uso; **não** é ERROR |
| **cache miss** | A caixa não tinha o alvo — miss **esperado** em cache | Alta na informática; **≠** excepção |
| **to miss the bus / class** | Não alcançar o [tempo](${tempo}) ou o lugar | Alta |
| **Miss** (título) | ← *mistress* — outra árvore | Alta o corte |

Cognatos germânicos: nl. *missen* · de. *missen* / *vermissen* · sv. *missa*. O latim *errāre* **não** entra nesta lista. O francês *manquer* e o português *faltar* são **outros** nomes de ausência.

**H-sentir:** *I miss you* é o peito a nomear a falta. Em PT: *sinto a tua falta* / *estou com saudades* / *você me faz falta*. **Não** é *você está faltando* (calco: trata a pessoa como peça em falta no conjunto).  
**H-título:** *Miss Brasil* é *mistress* encurtado. Grafia irmã; sangue outro. Cortar.

## 4. *faltando* — o que não está (*fallere*)

*Faltando* é o gerúndio de *faltar*. O [Wikcionário](${WIKT_FALTAR}) aponta ao latim *fallere* (via romance): falhar, enganar, decepcionar. Família à vista: *fail*, *false*, *fault*, *falácia*, *falível*, esp. *faltar*, fr. *faillir*.

| Uso PT | Ofício | Sala |
|--------|--------|------|
| **está faltando uma peça** | Ausência no conjunto | Esta ficha — o estado |
| **faltou à aula** | Não comparecer | Miss de presença — acto |
| **não falta nada** | Completude | Antónimo de ofício |
| **você me faz falta** | O outro é a fonte da falta sentida | Vizinho de *I miss you* |
| **falta** (desporto) | Infração | Homógrafo de ofício — **outra** sala |
| **falta de ar / de tempo** | Carência | Metáfora de posse; ver [tempo](${tempo}) |

**H-calco:** *está faltando você* no sentido de *I miss you* é cola da [orelha](${orelha}) bilingue. O português nativo põe a **falta no peito de quem sente** (*fazes-me falta*), não a pessoa como peça em falta na prateleira.  
**H-fallere:** *faltar* e *fail* são primos (*fallere*). *Miss* **não** é primo — é vizinho de uso.  
**H-404:** «ficheiro faltando» / *missing file* é ausência no conjunto. O servidor pode responder **404 Not Found**. Isso ainda **não** é o *ERROR* 500.

## 5. *ERROR* — o nome do desvio (*errāre*)

*Error* é o substantivo latino do **vagar para fora da via**: *errāre* → *error* → EN *error* / PT [*erro*](${WIKT_ERRO}). Família: *err*, *erratic*, *aberration*, *errante*, *errar*. O caps-lock **ERROR** é o [gesto](${gesto}) da máquina: gritar o desvio no log.

| Peça | O que é | O que não é |
|------|---------|-------------|
| **error / erro** | O desvio nomeado | O sentimento *I miss you* |
| **ERROR** (log) | O grito em maiúsculas | O título *Miss* |
| **errar o alvo** (PT) | Falhar o alvo **com o verbo de *errāre*** | Prova de que *miss* é latino |
| **exception / traceback** | O rasto do desvio | Tutorial desta ficha |
| **[buguei](${buguei})** | O peito/máquina travou | O **nome** do desvio (esta peça) |
| **[backspace](${backspace})** | Corrigir o rascunho | Apagar o ERROR sem inspecionar |

**H-caps:** *ERROR* em maiúsculas é teatro de terminal — o mesmo vocábulo *error*, volume no máximo. O lab honra o grito e **não** o transforma em essência da pessoa («eu sou um erro»).  
**H-500:** HTTP **500** nomeia falha do servidor (o caminho vagou). HTTP **404** nomeia ausência (faltando). Cache **miss** nomeia um tiro que a caixa não tinha — muitas vezes **ofício normal**, não queda. Três códigos, três salas.  
**H-buguei:** [buguei](${buguei}) é o tranco no peito. *ERROR* é a linha no log. [Backspace](${backspace}) é a tecla que corrige. [Exit](${exit}) é sair do aperto. Não fundir.

## 6. Informática — miss × missing × ERROR

Pedido eco: a palavra **ERROR**. O lab mapeia o trio onde o código vive.

| Evento | Palavra | Leitura lab |
|--------|---------|-------------|
| A caixa não tinha o alvo | **cache miss** | Miss esperado — não é queda |
| O recurso não está | **missing** / **faltando** | 404 — ausência no conjunto |
| O caminho vagou | **ERROR** / *exception* | 500 — desvio nomeado |
| O peito travou | **[buguei](${buguei})** | Gíria do tranco — outra ficha |
| Corrigir o rascunho | **[backspace](${backspace})** | Tecla — não o nome do desvio |
| Gravar o estado | **[upsert](${upsert})** | Ofício de persistir — outro verb |

**H-cache:** um *cache miss* **bem tratado** é ofício: ir buscar à fonte e preencher a caixa. Tratar *miss* como *ERROR* é fundir salas e inventar pânico.  
**H-padrão:** o [pattern](${pattern}) do lab é nomear a sala **antes** de gritar. Miss, faltando e ERROR pedem três nomes, não um só alarme.

## 7. Camadas BR — o que a boca faz

| Camada | Leitura | Sala |
|--------|---------|------|
| **you missed** | Falhou o alvo / perdeu o momento | Verbo *miss* |
| **I miss you** | Sinto a tua falta | Peito — ≠ ERROR |
| **está missing / faltando** | Ausente do conjunto | Gerúndio *faltando* |
| **deu ERROR** | A máquina nomeou o desvio | Log / ecrã |
| **você errou** | *Errāre* nativo — miss + error num verbo | Cruzamento PT |
| **Miss** + nome | Título | Cortado |
| **falta!** (desporto) | Infração | Homógrafo |

**H-boca:** o BR fala *deu erro*, *tá faltando*, *I miss you* e *you missed* no mesmo dia. A [língua portuguesa](${lingua}) acolhe o loan e **já tinha** *errar* / *faltar*. O lab credita as três entradas e corta a fusão.

## 8. Hipóteses

**H1:** EN *miss* < OE *missan* (germânico «falhar o alvo») — alta.  
**H2:** *I miss you* é a mesma árvore (notar a ausência), não o título e não o log — alta.  
**H3:** *Miss* (tratamento) < *mistress* / *magister* — alta o corte.  
**H4:** PT *faltar* / *faltando* < lat. *fallere* — alta.  
**H5:** EN *error* / PT *erro* / *ERROR* < lat. *errāre* — alta.  
**H6:** o cruzamento é de **uso**, não de sangue — alta.  
**H7:** PT *errar o alvo* junta miss e error num verbo latino — alta como facto de ofício; nula como étimo de *miss*.  
**H8:** *está faltando você* ≠ *I miss you* — o calco trata pessoa como peça; o nativo põe a falta no peito.  
**H9:** cache miss ≠ 404 ≠ 500 — três salas.  
**H10:** o lab alumia com [verdade](${verdade}); não transforma a pessoa em ERROR. O [risco](${risco}) é fundir as salas.

## 9. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | miss = faltando = ERROR | Acto × estado × nome do desvio |
| **I miss you** | Falha / erro afectivo | Notar a ausência — peito, não log |
| **Miss** | O mesmo vocábulo | Título ← *mistress* |
| **Cache miss** | O sistema quebrou | A caixa não tinha — ofício normal |
| **404** | ERROR | Faltando — recurso ausente |
| **500** | Missing | ERROR — o caminho vagou |
| **Você errou** | Só moral | Em PT, também *miss the target* |
| **Deu ERROR** | A pessoa falhou | A máquina nomeou um desvio |

## 10. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *miss* como germânico — falhar o alvo / sentir a falta |
| Bom | Cruzar com *faltando* (*fallere*) sem fundir acto e estado |
| Bom | Cruzar com *ERROR* (*errāre*) sem transformar o peito em log |
| Bom | Separar 404 (faltando), cache miss (ofício) e 500 (desvio) |
| Bom | Honrar *I miss you* como falta sentida — [verdade](${verdade}) no peito |
| Bom | Cortar o título *Miss* e a *falta* de desporto |
| Mau | «Você está faltando» como calco de *I miss you* |
| Mau | Tratar a pessoa como ERROR |
| Mau | Tutorial de debugger, RFC HTTP ou concurso de Miss |
| Mau | Fundir [buguei](${buguei}), *miss* e *ERROR* num único pânico |

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=miss)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Buguei](${buguei}) | O tranco no peito — não o nome do desvio |
| [Miss Click](${missClick}) | Clique errado (*mis-* + click) — locução irmã, ficha outra |
| [Backspace](${backspace}) | Corrigir o rascunho — não apagar a inspeção |
| [Exit](${exit}) | Sair do aperto |
| [Upsert](${upsert}) | Ofício de persistir — outro verb |
| [Pattern](${pattern}) | Nomear a sala antes do alarme |
| [Caminho](${caminho}) | A via de onde *errāre* se desvia |
| [Tempo](${tempo}) | *Miss the moment* / falta de tempo |
| [Verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) | Ofício — não identitarizar o erro |
| [Etimologia](${etimologia}) · [relação](${relacao}) · [orelha cola](${orelha}) | Étimo × cola × três árvores |
| [Língua portuguesa](${lingua}) | Solo de *faltar*, *errar* e do loan *miss* |
| [Vida](${vida}) | O peito que sente a falta |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é manual de excepção, RFC HTTP nem tutorial de debugger.  
- Não é ficha de concurso, título de tratamento ou clínica de saudade.  
- Não diagnostica a pessoa como «erro».  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **miss** fichado como germ. *missan* (falhar o alvo; sentir a ausência); cruzado com **faltando** (*fallere*, estado do que não está) e com **ERROR** (*errāre*, o nome do desvio). Três árvores, um campo. Título *Miss* cortado. 404 ≠ cache miss ≠ 500. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Buguei](${buguei}) · [▶ Backspace](${backspace}) · [▶ Exit](${exit}) · [▶ Caminho](${caminho}) · [▶ Poema Vida](/vida/#poema=miss) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of English **miss** — Germanic *missan*, “fail to hit”. Field request: cross it with Portuguese **faltando** (Lat. *fallere*) and with **ERROR** (Lat. *errāre*).

Three trees, one field. The **act** is *miss*. The **state** is *faltando* (what is not in the set). The **name of the wander** is ERROR. The [ear](${orelha}) glues them; the etymon **cuts**. The title *Miss* (← *mistress*) is another room. Not a debugger tutorial. Not a pageant sheet.

> Sources: [miss](${WIKT_MISS}), [faltar](${WIKT_FALTAR}), [error](${WIKT_ERROR}), [*errō*](${WIKT_ERRARE}), [*fallō*](${WIKT_FALLERE}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Three lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Etymon of miss** | *missan* | Germanic — fail to hit | The **act**; also feeling absence |
| **Etymon of faltando** | *fallere* | Latin — fail, deceive | The **state** of what is not there |
| **Etymon of ERROR** | *errāre* | Latin — wander off the [path](${caminho}) | The **name** of the deviation |
| **Cut title** | *Miss* | *mistress* / *magister* | Address — **not** the verb |

Portuguese *errar o alvo* already does miss-the-target with the **error** verb. That is native office, not proof that *miss* is Latin.

*I miss you* is the chest naming lack — PT *fazes-me falta* / *estou com saudades*. It is **not** a 500. A cache miss is often normal office. 404 is missing; 500 is ERROR.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *miss* < *missan*. Crossed with *faltando* and ERROR. Three trees. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **miss** — germ. *missan*, «fallar el blanco». Pedido: cruzarla con el portugués **faltando** (lat. *fallere*) y con **ERROR** (lat. *errāre*).

Tres árboles, un campo. El **acto** es *miss*. El **estado** es *faltando* (lo que no está en el conjunto). El **nombre del desvío** es ERROR. El [oído](${orelha}) pega; el étimo **corta**. El título *Miss* (← *mistress*) es otra sala. No es tutorial de debugger. No es ficha de certamen.

> Fuentes: [miss](${WIKT_MISS}), [faltar](${WIKT_FALTAR}), [error](${WIKT_ERROR}), [*errō*](${WIKT_ERRARE}), [*fallō*](${WIKT_FALLERE}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Tres linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Étimo de miss** | *missan* | Germánico — fallar el blanco | El **acto**; también sentir la ausencia |
| **Étimo de faltando** | *fallere* | Latín — fallar, engañar | El **estado** de lo que no está |
| **Étimo de ERROR** | *errāre* | Latín — vagar fuera del [camino](${caminho}) | El **nombre** del desvío |
| **Título cortado** | *Miss* | *mistress* / *magister* | Tratamiento — **no** el verbo |

El portugués *errar o alvo* ya hace fallar-el-blanco con el verbo de **error**. Oficio nativo, no prueba de que *miss* sea latino.

*I miss you* es el pecho nombrando la falta. **No** es un 500. Un cache miss suele ser oficio normal. 404 es faltando; 500 es ERROR.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *miss* < *missan*. Cruzada con *faltando* y ERROR. Tres árboles. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMissPost() {
  const { body, contentEn, contentEs } = buildMissBodies();
  const seriesOrder = pickOrder('inspecao-palavra-miss', 294);
  return makePalavra({
    title: 'Inspeção: Miss — falhar o alvo; cruzado com faltando e ERROR',
    titleEn: 'Inspection: Miss — fail to hit; crossed with faltando and ERROR',
    titleEs: 'Inspección: Miss — fallar el blanco; cruzado con faltando y ERROR',
    excerpt:
      'Palavras: miss (germ. missan) × faltando (lat. fallere) × ERROR (lat. errāre) — três árvores, um campo; I miss you ≠ 500; Valeu !!!',
    excerptEn:
      'Words: miss (Gmc missan) × faltando (Lat. fallere) × ERROR (Lat. errāre) — three trees, one field; I miss you ≠ 500; Valeu !!!',
    excerptEs:
      'Palabras: miss (germ. missan) × faltando (lat. fallere) × ERROR (lat. errāre) — tres árboles, un campo; I miss you ≠ 500; ¡Valeu !!!',
    slug: 'inspecao-palavra-miss',
    date: '2026-08-24T10:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Miss · faltando · ERROR',
    coverImage: COVER,
    sourceUrl: WIKT_MISS,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMissPost,
  buildMissBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_MISS,
  WIKT_FALTAR,
  WIKT_ERROR
};
