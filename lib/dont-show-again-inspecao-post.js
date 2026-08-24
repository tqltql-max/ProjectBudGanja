'use strict';

/**
 * Inspeção Expressões · Don't Show Again × não mostrar de novo
 * Eixos: locução EN de caixa de diálogo · calco PT ·
 * show (olhar) × mostrar (avisar) · again × de novo (≠ o novo) ·
 * Dont sem apóstrofo ≠ nome · pular (desta vez) ≠ daqui para a frente ·
 * ≠ tutorial de cookie, ≠ burlar aviso.
 * Pedido: inspeção em Dont Show Again cruzada com não mostrar de novo.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/dont-show-again-cover.jpg';
const WIKT_DONT = 'https://en.wiktionary.org/wiki/don%27t';
const WIKT_SHOW = 'https://en.wiktionary.org/wiki/show#English';
const WIKT_AGAIN = 'https://en.wiktionary.org/wiki/again';
const WIKT_NAO = 'https://pt.wiktionary.org/wiki/n%C3%A3o';
const WIKT_MOSTRAR = 'https://pt.wiktionary.org/wiki/mostrar';
const WIKT_DE_NOVO = 'https://pt.wiktionary.org/wiki/de_novo';
const WIKT_MONSTRARE = 'https://en.wiktionary.org/wiki/monstro#Latin';
const WIKT_MONEO = 'https://en.wiktionary.org/wiki/moneo#Latin';
const WIKT_SCEAWIAN = 'https://en.wiktionary.org/wiki/sceawian';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Don't Show Again.
Não mostrar de novo.
Duas bocas, um ofício:
o aviso pede para não voltar.

Don't: do + not.
Show: pôr à vista — olhar.
Again: uma vez mais.

Não: latim non.
Mostrar: monstrare — apontar, avisar.
De novo: desde o novo — outra vez.

O inglês esconde o olhar.
O português esconde o aviso.
A caixa é a mesma.

Dont sem apóstrofo
não é um nome.
É Don't sem a marca.

De novo não é o novo.
É o outra vez.

Pular é desta vez.
Don't Show Again é daqui para a frente.
O loop pede condição de paragem.
O inspector, às vezes, olha de novo.

Valeu !!!
esconder o nag,
sem esconder o risco.`;
}

function poemEn() {
  return `Don't Show Again.
Não mostrar de novo.
Two mouths, one office:
the warning asks not to return.

Don't: do + not.
Show: put in view — look.
Again: once more.

Não: Latin non.
Mostrar: monstrare — point, warn.
De novo: from the new — another time.

English hides the look.
Portuguese hides the warning.
The box is the same.

Dont without the apostrophe
is not a name.
It is Don't without the mark.

De novo is not the new one.
It is the once-more.

Skip is this time.
Don't Show Again is from here on.
The loop asks for a stop condition.
The inspector, sometimes, looks again.

Valeu !!!
hide the nag,
without hiding the risk.`;
}

function poemEs() {
  return `Don't Show Again.
Não mostrar de novo.
Dos bocas, un oficio:
el aviso pide no volver.

Don't: do + not.
Show: poner a la vista — mirar.
Again: una vez más.

Não: latín non.
Mostrar: monstrare — señalar, avisar.
De novo: desde lo nuevo — otra vez.

El inglés esconde la mirada.
El portugués esconde el aviso.
La caja es la misma.

Dont sin apóstrofo
no es un nombre.
Es Don't sin la marca.

De novo no es lo nuevo.
Es el otra vez.

Saltar es esta vez.
Don't Show Again es de aquí en adelante.
El loop pide condición de parada.
El inspector, a veces, mira de nuevo.

¡Valeu !!!
esconder el nag,
sin esconder el riesgo.`;
}

function buildDontShowAgainBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-dont-show-again.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const missClick = '/posts/post-inspecao-expressao-miss-click.html';
  const loopInf = '/posts/post-inspecao-expressao-loop-infinito.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const euAmo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const sempre = '/posts/post-inspecao-palavra-sempre.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const saveGame = '/posts/post-inspecao-palavra-save-game.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const privacidade = '/info/privacidade.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[Don't Show Again](${self})»** cruzada com **«não mostrar de novo»**. Pedido de campo: *inspecao em Dont Show Again cruze com não mostrar de novo*.

Duas bocas, um ofício. O inglês da caixa de diálogo pede para **não pôr à vista outra vez**. O português calca: **não mostrar de novo** / *não mostrar novamente* / *não exibir novamente*. Objecto = a **locução de preferência** — o [gesto](${gesto}) que corta o [loop](${loopInf}) de um [aviso](${sinal}). Não é tutorial de cookie. Não é receita para burlar consentimento. Não é o espectáculo (*show*) de palco.

> **Nota metodológica:** auditoria independente. Fontes: [don't](${WIKT_DONT}), [show](${WIKT_SHOW}), [again](${WIKT_AGAIN}), [não](${WIKT_NAO}), [mostrar](${WIKT_MOSTRAR}), [de novo](${WIKT_DE_NOVO}), [mōnstrō](${WIKT_MONSTRARE}), [moneō](${WIKT_MONEO}), [scēawian](${WIKT_SCEAWIAN}). Método: [etimologia](${etimologia}) — duas árvores, um cruzamento. **Ficha ≠ aula de localStorage, ≠ playbook de dark pattern, ≠ política de privacidade.** Série [Expressões](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${euAmo}).

**Gatilho:** *Don't Show Again* / *Dont Show Again* (campo, sem apóstrofo) / *Don't show this again* / *Don't show this message again* / *não mostrar de novo* / *não mostrar novamente* / *não exibir novamente* / *no volver a mostrar*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora (EN) | **Don't Show Again** (caixa de diálogo; maiúsculas de botão) |
| Forma de campo | **Dont Show Again** — o apóstrofo cai no teclado / na etiqueta |
| Forma âncora (PT) | **não mostrar de novo** |
| Formas irmãs PT | *não mostrar novamente* · *não exibir novamente* · *não mostrar outra vez* · *não voltar a mostrar* |
| Forma irmã ES | *no volver a mostrar* / *no mostrar de nuevo* |
| Classe | Locução EN de UI + calco PT do mesmo [gesto](${gesto}) |
| Étimo (EN) | *don't* (*do* + *not*) + *show* + *again* — confiança: **alta** |
| Étimo (PT) | *não* (lat. *non*) + *mostrar* (lat. *mōnstrāre*) + *de novo* — confiança: **alta** |
| Tipo BudGanja | Expressão — cruzamento EN × PT · olhar × aviso |
| Não é | Espectáculo de palco · «não mostrar o novo» · never (absoluto moral) · burlar [aviso](${sinal}) de risco |
| Data | ${inspected} |
| Fonte | [show](${WIKT_SHOW}) · [mostrar](${WIKT_MOSTRAR}) |

**O que é o objecto:** o **nome da caixa** que pede para **não repetir a [mensagem](${mensagem})**. No lab: uma [preferência](${gesto}), não um apagar. A escolha **grava-se** (sessão, [login](${login}), rasto tipo [Save Game](${saveGame})) — esta ficha **nomeia** o ofício; **não** ensina a burlar o aviso.

## 2. O cruzamento — duas bocas, um ofício

Pedido de campo: cruzar **Dont Show Again** com **não mostrar de novo**. O lab **não funde** as árvores. Funde o **ofício**.

| Boca | Peças | Ofício nesta ficha |
|------|-------|-------------------|
| **EN** | *Don't* + *Show* + *Again* | Não **pôr à vista** outra vez |
| **PT** | *não* + *mostrar* + *de novo* | Não **apontar / avisar** outra vez |
| **Campo** | *Dont* (sem ') | A marca cai; o étimo **não** cai |
| **Calco** | *não mostrar novamente* | Norma de software BR / PT |
| **Cola PT** | *de novo* = «o novo» | [Orelha](${orelha}) — ver §6 |
| **Cola EN** | *Show* = espectáculo | Outra sala — ver §5 |

**H-cruzamento:** o par não é tradução palavra-a-palavra perfeita; é **equivalência de ofício**. O inglês corta o **olhar**. O português corta o **aviso**. A caixa no ecrã é a mesma.

**H-relação:** [relação](${relacao}) aqui = duas línguas a nomear o mesmo [gesto](${gesto}) — não um acordo de sinónimos cegos.

## 3. Don't + Show + Again

Três peças inglesas; só juntas fazem a locução.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **don't** | Contração de *do not* — auxiliar + negação; [don't](${WIKT_DONT}) | Alta |
| **Dont** (campo) | A mesma contração **sem** apóstrofo — teclado, fonte, etiqueta curta | Alta como grafia viva; **não** muda o étimo |
| **show** (verbo) | OE [*scēawian*](${WIKT_SCEAWIAN}) «olhar, inspeccionar, pôr à vista» — [show](${WIKT_SHOW}) | Alta |
| **show** (nome / palco) | Espectáculo, programa — **extensão**; **sala cortada** nesta ficha | Alta como outra camada |
| **again** | OE *ongēan* «de encontro / outra vez» — [again](${WIKT_AGAIN}) | Alta |
| **Don't Show Again** | Imperativo negativo de UI: não mostres **isto** outra vez | Alta |

O *this* / *this message* / *this dialog* fica muitas vezes **elidido** na etiqueta curta. O objecto omitido é **esta** [mensagem](${mensagem}) — não «nunca mais mostrar nada».

**H-don't:** *don't* não é o prefixo *un-* nem o *never*. É **não faças** (deste [gesto](${gesto})), agora, para a frente, **deste** aviso.

## 4. Não + mostrar + de novo

Três peças portuguesas; o calco vive na boca de software BR.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **não** | Lat. *non* — [não](${WIKT_NAO}) | Alta |
| **mostrar** | Lat. *mōnstrāre* «apontar, fazer ver, indicar» — [mostrar](${WIKT_MOSTRAR}) | Alta |
| **mōnstrāre** | De *monstrum* «o que se mostra / presságio» ← *moneō* «avisar, fazer lembrar» — [mōnstrō](${WIKT_MONSTRARE}) · [moneō](${WIKT_MONEO}) | Alta |
| **de novo** | *de* + *novo* — «desde o novo» = outra vez — [de novo](${WIKT_DE_NOVO}) | Alta |
| **novamente** | Advérbio de *novo* — forma de manual / UI mais «norma» | Alta |
| **exibir** | Calco de *display* / *exhibit* — irmã de escritório, não a boca viva | Alta como variante; **não** é a âncora de campo |

A boca de campo pediu **não mostrar de novo** — mais oral que *não mostrar novamente*. O lab honra a boca e mapeia a norma ao lado.

**H-infinitivo:** o PT de UI usa **infinitivo negativo** (*não mostrar*), não o imperativo (*não mostres*). É ofício de etiqueta, não erro.

## 5. Show × mostrar — o ouro do cruzamento

Aqui o cruzamento **paga**. Duas árvores, um botão.

| Árvore | Verbo | Família | O que a locução esconde |
|--------|-------|---------|-------------------------|
| **EN *show*** | OE *scēawian* | Olhar, inspeccionar, pôr à vista (parente de *schauen*) | O **olhar** — «não me faças **ver** outra vez» |
| **PT *mostrar*** | Lat. *mōnstrāre* ← *moneō* | Apontar, indicar, **avisar** (parente de *monstro*, *monumento*, *admoestar*) | O **aviso** — «não me **admoestes** outra vez» |

O inspector **olha**. A palavra *inspeção* é olhar para dentro. *Show* EN mora nessa família de **ver**. *Mostrar* PT mora na família de **avisar**. Por isso a caixa única faz dois ofícios ao mesmo tempo: corta a **vista repetida** e corta o **nag** — o aviso que volta.

**H-palco:** *show* como espectáculo («o *show* não volta») é cola da [orelha](${orelha}). Serve para lembrar. **Não** é o étimo da etiqueta.

**H-monstro:** *monstrum* é «o que se mostra» — o presságio posto à vista para **avisar**. Cortar *mostrar* nesta locução é recusar o presságio **desta** caixa, não apagar o [risco](${risco}) no mundo.

## 6. Again × de novo — a cola do novo

*Again* é «outra vez». *De novo* também — e a [orelha](${orelha}) cola **o novo**.

| Teste | *again* / *de novo* (étimo de ofício) | *de novo* = «o novo» (cola) |
|-------|--------------------------------------|-----------------------------|
| **Família** | repetição | novidade |
| **Ofício na caixa** | não repetir **esta** [mensagem](${mensagem}) | não mostrar a versão **nova** |
| **Em inglês** | *again* não soa a *new* | a cola é **portuguesa** |
| **Veredicto** | origem do calco | mnemónica — **não** genealogia |

**H-cola:** «não mostrar de novo» ouvido como «não mostrar **o novo**» inverte o ofício: esconderia a actualização, não o nag. O lab corta em duas frases. O outra vez. Ponto. O novo. Ponto.

**H-novamente:** *novamente* traz *novo* na letra e ainda assim significa **outra vez**. A norma de UI (*não mostrar novamente*) **parece** a cola e **é** o ofício — o teste é o contexto da caixa, não a raiz *nov-*.

## 7. Desta vez × daqui para a frente

Três [gestos](${gesto}) vizinhos; não fundir.

| Gesto | Duração | Ficha |
|-------|---------|-------|
| **[Pular](${pular})** / Skip / Dismiss | **Desta vez** — o aviso pode voltar | Irmão |
| **Don't Show Again** / não mostrar de novo | **Daqui para a frente** — desta caixa, neste sítio | Esta ficha |
| **[Sempre](${sempre})** mostrar | O inverso — o aviso não descansa | Contra-irmão |
| **[Loop infinito](${loopInf})** | Ausência de condição de paragem | O problema que a caixa resolve |
| **[EXIT](${exit})** | Sair agora | Outra porta; não grava a preferência |
| **[Miss Click](${missClick})** | O clique **no** visto, sem querer | O [risco](${risco}) do alvo pequeno |

**H-duração:** *Don't Show Again* **não** é *never* moral. É *not this dialog, from here on, in this store*. Limpar dados, outra conta, outro [login](${login}) — a caixa pode **voltar**. Isso é ofício de rasto, não traição da palavra.

**H-interruptor:** a caixa é um [interruptor](${interruptor}) da [mensagem](${mensagem}): [ligar × desligar](${ligar}) o nag. O [risco](${risco}) fica no mundo se o aviso era de segurança e a preferência o apagou da vista.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | EN = PT palavra a palavra | Equivalência de **ofício**; árvores distintas (*scēawian* × *mōnstrāre*) |
| **Dont** | Nome próprio / marca | *Don't* sem apóstrofo |
| **Show** | O espectáculo | Verbo de **pôr à vista** |
| **De novo** | O lançamento novo | *Again* — outra vez **desta** caixa |
| **Checkbox** | Apagar o aviso do mundo | Preferência de **vista**; o [risco](${risco}) pode continuar |
| **Always / nunca** | Absoluto | Deste sítio, deste rasto, desta [mensagem](${mensagem}) |
| **Cookie / consentimento** | A mesma caixa | Prima: [privacidade](${privacidade}) é **consentir ou recusar**, não só esconder o nag |
| **Inspeção** | «Já vi, não mostres» | O ofício do lab é, às vezes, **olhar de novo** |

**H-parece:** a etiqueta vende descanso.  
**H-é:** vende uma **política de repetição** — com [verdade](${verdade}) se o que se esconde era nag; com [risco](${risco}) se era aviso de ofício.

## 9. Hipóteses

**H1:** *Don't Show Again* = *do not* + *show* + *again* — «não ponhas à vista outra vez» — alta.  
**H2:** *não mostrar de novo* é calco vivo BR do mesmo ofício; *não mostrar novamente* é a forma de manual — alta.  
**H3:** EN *show* ← *scēawian* (olhar); PT *mostrar* ← *mōnstrāre* / *moneō* (avisar) — o cruzamento **não** é sinónimo cego — alta.  
**H4:** *Dont* sem apóstrofo é grafia de campo / etiqueta; o étimo continua *don't* — alta.  
**H5:** cola *de novo* = «o novo» é da [orelha](${orelha}); o ofício da caixa é *again* — alta como cola; nula como étimo da UI.  
**H6:** [pular](${pular}) = desta vez; Don't Show Again = daqui para a frente — alta.  
**H7:** a locução é condição de paragem do [loop](${loopInf}) da [mensagem](${mensagem}) — alta.  
**H8:** o lab nomeia; **não** ensina a burlar aviso, consentimento ou [sinal](${sinal}) de [risco](${risco}).  
**H9:** [Miss Click](${missClick}) no visto grava a preferência sem intenção — [respeito](${respeito}) a quem errou o pixel; a ficha não culpa o dedo.  
**H10:** [Faça o seu melhor](${faca}) aqui = escolher **quando** esconder o nag e **quando** olhar de novo.

## 10. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o par EN × PT como **um ofício, duas árvores** |
| Bom | Usar *Dont* de campo e declarar o apóstrofo |
| Bom | Separar *de novo* (outra vez) de *o novo* (novidade) |
| Bom | Distinguir [pular](${pular}) (desta vez) desta locução (daqui para a frente) |
| Bom | [Respeito](${respeito}) a quem não quer o nag — e [verdade](${verdade}) se o aviso era de [risco](${risco}) |
| Mau | Tutorial de esconder consentimento, EULA ou aviso de segurança |
| Mau | Fundir *show* de palco no étimo da etiqueta |
| Mau | Fundir *de novo* com «não actualizar» |
| Mau | Tratar a caixa como *never* absoluto |

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=dont-show-again)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A orelha cola o que a boca juntou](${orelha}) | Cola *de novo* = o novo; cola *show* = palco |
| [Etimologia](${etimologia}) | Duas árvores: *scēawian* × *mōnstrāre* |
| [Relação](${relacao}) | EN × PT — equivalência de ofício, não sinónimo cego |
| [Gesto](${gesto}) · [ação](${acao}) | O visto na caixa |
| [Miss Click](${missClick}) | Clicar o visto sem querer |
| [Pular](${pular}) · [sempre](${sempre}) · [loop infinito](${loopInf}) | Desta vez × daqui para a frente × sem paragem |
| [Mensagem](${mensagem}) · [sinal](${sinal}) · [sugestão](${sugestao}) | O que a caixa esconde |
| [Login](${login}) · [Save Game](${saveGame}) | O rasto da preferência |
| [EXIT](${exit}) · [interruptor](${interruptor}) · [ligar](${ligar}) | Sair agora × desligar o nag |
| [Pattern](${pattern}) | Molde de UI — sem tutorial de implementação |
| [Língua portuguesa](${lingua}) | Solo do calco *não mostrar de novo* |
| [Privacidade](${privacidade}) | Prima: consentir ≠ só esconder o banner |
| [Verdade](${verdade}) · [caminho](${caminho}) · [respeito](${respeito}) · [risco](${risco}) | Ofício |
| [Faça o seu melhor](${faca}) | Quando esconder / quando olhar de novo |
| [Valeu !!!](${mantra}) · [eu amo a vida](${euAmo}) | Fecho |

## Limites

- Não é aula de cookie, localStorage, GDPR nem de como «não mostrar» um aviso de segurança.  
- Não é ficha do espectáculo (*show*) nem de programa de TV.  
- Não funde *de novo* com actualização de versão.  
- Não é *never* moral nem autoajuda de «ignora e segue».  
- O poema é **criação do laboratório**.

## Status

**Aprovada na série Expressões** — **Don't Show Again** cruzada com **não mostrar de novo**: um ofício de preferência (não repetir **esta** [mensagem](${mensagem})); árvores *show*/*scēawian* (olhar) × *mostrar*/*mōnstrāre* (avisar); grafia de campo *Dont*; cola *de novo* ≠ o novo; [pular](${pular}) ≠ daqui para a frente. Salas cortadas (palco, burlar aviso, never absoluto). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}) · [eu amo a vida](${euAmo}).

[▶ Expressões](${hub}) · [▶ Miss Click](${missClick}) · [▶ Pular](${pular}) · [▶ Loop infinito](${loopInf}) · [▶ Etimologia](${etimologia}) · [▶ Orelha cola](${orelha}) · [▶ Poema Vida](/vida/#poema=dont-show-again) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **«[Don't Show Again](${self})»** crossed with Portuguese **«não mostrar de novo»**. Field request: inspect *Dont Show Again* crossed with *não mostrar de novo*.

Two mouths, one office. English dialog-box speech asks **not to put it in view again**. Portuguese calques: **não mostrar de novo** / *não mostrar novamente*. Object = the **preference locution** — the [gesture](${gesto}) that cuts the [loop](${loopInf}) of a [warning](${sinal}). Not a cookie tutorial. Not a recipe to bypass consent. Not the stage *show*.

> Sources: [don't](${WIKT_DONT}), [show](${WIKT_SHOW}), [again](${WIKT_AGAIN}), [não](${WIKT_NAO}), [mostrar](${WIKT_MOSTRAR}), [de novo](${WIKT_DE_NOVO}), [mōnstrō](${WIKT_MONSTRARE}), [scēawian](${WIKT_SCEAWIAN}). Method: [etymology](${etimologia}). **Sheet ≠ localStorage class, ≠ dark-pattern playbook.** Close: [Valeu !!!](${mantra}) · [eu amo a vida](${euAmo}).

## The cross

| Mouth | Pieces | Office |
|-------|--------|--------|
| **EN** | *Don't* + *Show* + *Again* | Do not **put in view** again |
| **PT** | *não* + *mostrar* + *de novo* | Do not **point / warn** again |
| **Field** | *Dont* (no apostrophe) | The mark drops; the etymon does **not** |
| **PT glue** | *de novo* heard as «the new one» | [Ear](${orelha}) — not the UI office |

**H-gold:** EN *show* ← *scēawian* (look / inspect). PT *mostrar* ← *mōnstrāre* / *moneō* (point / **warn**). Same checkbox, two trees. [Skip](${pular}) is **this time**; Don't Show Again is **from here on**. [Miss Click](${missClick}) on the tick stores the preference by accident.

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Sayings.** *Don't Show Again* × *não mostrar de novo*: one preference office; *show*/look × *mostrar*/warn; field spelling *Dont*; glue *de novo* ≠ the new; skip ≠ from here on. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[Don't Show Again](${self})»** cruzada con **«não mostrar de novo»**. Pedido de campo: inspeccionar *Dont Show Again* cruzado con *não mostrar de novo*.

Dos bocas, un oficio. El inglés de la caja de diálogo pide **no poner a la vista otra vez**. El portugués calca: **não mostrar de novo** / *não mostrar novamente*. Objeto = la **locución de preferencia** — el [gesto](${gesto}) que corta el [loop](${loopInf}) de un [aviso](${sinal}). No es tutorial de cookie. No es receta para burlar consentimiento. No es el espectáculo (*show*).

> Fuentes: [don't](${WIKT_DONT}), [show](${WIKT_SHOW}), [again](${WIKT_AGAIN}), [não](${WIKT_NAO}), [mostrar](${WIKT_MOSTRAR}), [de novo](${WIKT_DE_NOVO}), [mōnstrō](${WIKT_MONSTRARE}), [scēawian](${WIKT_SCEAWIAN}). Método: [etimología](${etimologia}). **Ficha ≠ clase de localStorage, ≠ playbook de dark pattern.** Cierre: [¡Valeu !!!](${mantra}) · [eu amo a vida](${euAmo}).

## El cruce

| Boca | Piezas | Oficio |
|------|--------|--------|
| **EN** | *Don't* + *Show* + *Again* | No **poner a la vista** otra vez |
| **PT** | *não* + *mostrar* + *de novo* | No **señalar / avisar** otra vez |
| **Campo** | *Dont* (sin apóstrofo) | Cae la marca; el étimo **no** |
| **Cola PT** | *de novo* oído como «lo nuevo» | [Oído](${orelha}) — no el oficio de la UI |

**H-oro:** EN *show* ← *scēawian* (mirar / inspeccionar). PT *mostrar* ← *mōnstrāre* / *moneō* (señalar / **avisar**). La misma caja, dos árboles. [Pular](${pular}) es **esta vez**; Don't Show Again es **de aquí en adelante**. [Miss Click](${missClick}) en el visto graba la preferencia sin querer.

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Expresiones.** *Don't Show Again* × *não mostrar de novo*: un oficio de preferencia; *show*/mirar × *mostrar*/avisar; grafía de campo *Dont*; cola *de novo* ≠ lo nuevo; saltar ≠ de aquí en adelante. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildDontShowAgainPost() {
  const { body, contentEn, contentEs } = buildDontShowAgainBodies();
  const seriesOrder = pickOrder('inspecao-expressao-dont-show-again', 280);
  return expressaoPost({
    title: 'Inspeção: Don\'t Show Again × não mostrar de novo — o aviso que pede para não voltar',
    titleEn: 'Inspection: Don\'t Show Again × não mostrar de novo — the warning that asks not to return',
    titleEs: 'Inspección: Don\'t Show Again × não mostrar de novo — el aviso que pide no volver',
    excerpt:
      'Expressões: Don\'t Show Again × não mostrar de novo — caixa EN×PT; show=olhar × mostrar=avisar; de novo ≠ o novo; Valeu !!!',
    excerptEn:
      'Sayings: Don\'t Show Again × não mostrar de novo — EN×PT dialog; show=look × mostrar=warn; de novo ≠ the new; Valeu !!!',
    excerptEs:
      'Dichos: Don\'t Show Again × não mostrar de novo — caja EN×PT; show=mirar × mostrar=avisar; de novo ≠ lo nuevo; ¡Valeu !!!',
    slug: 'inspecao-expressao-dont-show-again',
    date: '2026-08-24T11:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Don\'t Show Again · expressão',
    coverImage: COVER,
    sourceUrl: WIKT_SHOW,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDontShowAgainPost,
  buildDontShowAgainBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_SHOW,
  WIKT_DONT,
  WIKT_MOSTRAR
};
