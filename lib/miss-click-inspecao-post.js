'use strict';

/**
 * Inspeção Expressões · Miss Click
 * Eixos: locução EN mis- + click (clique errado) ·
 * forma viva Miss Click / miss click / misclick ·
 * cola da orelha: Miss (título) + Click (nome) ≠ étimo ·
 * ≠ mistress · ≠ clique social · ≠ saudade · ≠ clickbait.
 * Pedido: inspeção da expressão Miss Click.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/miss-click-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/misclick';
const WIKT_MIS = 'https://en.wiktionary.org/wiki/mis-#English';
const WIKT_CLICK = 'https://en.wiktionary.org/wiki/click';
const WIKT_MISS = 'https://en.wiktionary.org/wiki/miss#English';
const WIKT_MISS_TITLE = 'https://en.wiktionary.org/wiki/Miss';
const WIKT_CLIQUE_PT = 'https://pt.wiktionary.org/wiki/clique';
const WIKT_CLIQUE_EN = 'https://en.wiktionary.org/wiki/clique';
const WIKI_POP = 'https://pt.wikipedia.org/wiki/Etimologia_popular';

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
  return `Miss Click.
Não é a senhorita.
É o prefixo do erro
mais o som curto.

mis- erradamente.
Click o estalo.
O alvo ficou ao lado.

A orelha cola:
Miss + Click.
A boca junta o título.
O étimo corta — as letras são mis-, não mistress.

O interruptor já clicava
antes do rato.
O jogo só deu o nome ao pátio.

A saudade é outra sala.
O grupo social é outra sala.
O clickbait é outra sala.

Valeu !!!
clicar de novo
sem culpar o dedo pelo botão pequeno.`;
}

function poemEn() {
  return `Miss Click.
It is not the young lady.
It is the prefix of error
plus the short sound.

mis- wrongly.
Click the snap.
The target stayed beside.

The ear glues:
Miss + Click.
The mouth joins the title.
The etymon cuts — the letters are mis-, not mistress.

The switch already clicked
before the mouse.
The game only named the yard.

Missing someone is another room.
The social clique is another room.
Clickbait is another room.

Valeu !!!
click again
without blaming the finger for the small button.`;
}

function poemEs() {
  return `Miss Click.
No es la señorita.
Es el prefijo del error
más el sonido corto.

mis- erradamente.
Click el chasquido.
El blanco quedó al lado.

El oído pega:
Miss + Click.
La boca junta el título.
El étimo corta — las letras son mis-, no mistress.

El interruptor ya clicaba
antes del ratón.
El juego solo dio el nombre al patio.

La añoranza es otra sala.
El grupo social es otra sala.
El clickbait es otra sala.

¡Valeu !!!
clicar de nuevo
sin culpar al dedo por el botón pequeño.`;
}

function buildMissClickBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-miss-click.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const retarget = '/posts/post-inspecao-palavra-retarget.html';
  const missPalavra = '/posts/post-inspecao-palavra-miss.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[Miss Click](${self})»** — o **[gesto](${gesto})** que **falhou o [alvo](${objetos})**. Pedido de campo: *inspeção da expressão Miss Click*.

Duas salas, um sopro. A [orelha cola](${orelha}): **Miss** (título, «senhorita») + **Click** (nome próprio). O étimo **corta**: a forma de oficina é **mis-** («erradamente») + **click** («estalo / clique»). Objecto = a **locução**. Não é biografia de uma senhorita. Não é o grupo social *clique*. Não é tutorial de rato.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · misclick](${WIKT}), [mis-](${WIKT_MIS}), [click](${WIKT_CLICK}), [miss](${WIKT_MISS}), [Miss](${WIKT_MISS_TITLE}), [clique](${WIKT_CLIQUE_PT}), [clique EN](${WIKT_CLIQUE_EN}), [etimologia popular](${WIKI_POP}). Método: [etimologia](${etimologia}) — étimo × cola. **Ficha ≠ aula de hardware, ≠ playbook de FPS, ≠ clickbait.** Série [Expressões](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Miss Click* / *miss click* / *misclick* / *clique errado* / *clicar fora*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Miss Click** (duas palavras, maiúsculas — a boca do pátio) |
| Formas irmãs | *miss click* · *misclick* (uma palavra, oficina) · *miss-click* |
| Classe | Locução EN de [gesto](${gesto}) / jargão de ecrã e jogo; calco PT *clique errado* |
| Étimo (trabalho) | EN **mis-** + **click** — confiança: **alta** |
| Reanálise | *miss* (verbo «falhar») + *click* — [rebracketing](${aglutinacao}); **não** o título *Miss* |
| Tipo BudGanja | Expressão — étimo × cola da orelha × [ação](${acao}) que foi ao lado |
| Não é | Senhorita · clique social (FR) · saudade (*I miss you*) · clickbait · [rato](${animal})-bicho |
| Data | ${inspected} |
| Fonte | [misclick](${WIKT}) |

**O que é o objecto:** o nome do **clique que não acertou o sítio**. No lab: o [gesto](${gesto}) *mis-* + o som *click*. A mnemónica **senhorita Clique** é ofício da [orelha](${orelha}), não genealogia.

## 2. Três linhagens — o étimo não é a senhorita

Pedido de campo: a expressão **Miss Click**. O lab **não funde**. Quatro famílias; só uma faz a locução.

| Linhagem | Peça | Origem | Ofício nesta ficha |
|----------|------|--------|---------------------|
| **Étimo** | *mis-* + *click* | prefixo EN «erradamente» + onomatopeia do estalo | **Clicar no sítio errado** — esta é a origem |
| **Reanálise** | *miss* (verbo) + *click* | OE *missan* «falhar o alvo» | Forma *miss click* — a boca parte o composto; o ofício **coincide** com o prefixo |
| **Cola** | **Miss** (título) + **Click** (nome) | *mistress* encurtado + o estalo virado antropónimo | [Etimologia popular](${etimologia}) — serve para *lembrar*, **não** para *provar origem* |
| **Calco PT** | **clique errado** | EN *click* → PT *clique* | Peça portuguesa do mesmo [gesto](${gesto}) |

**H-linhagem:** *misclick* é prefixação inglesa ([aglutinação](${aglutinacao}) de ofício: *mis-* solda-se a *click*). A história *Miss + Click* é o mesmo mecanismo do [trocadilho](${trocadilho}): a boca reanalisa, a [orelha cola](${orelha}), o étimo **corta**.  
**H-letras:** o composto de oficina escreve **mis-** (um *s*). O título *Miss* também escreve dois *s* — a cola **parece** prova; o étimo do título é *mistress*, outra árvore. O teste não é a contagem de *s*; é a **família**: prefixo de erro × tratamento de pessoa.

## 3. *mis-* + *click* — o clique no sítio errado

O [Wiktionary](${WIKT}) fecha o étimo: *misclick* = *mis-* + *click* — «to perform an erroneous click». Duas grafias, um só ofício.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **mis-** | Prefixo EN «mal / erradamente / ao lado» — o mesmo de *mistake*, *misread*, *mishear* — [mis-](${WIKT_MIS}) | Alta |
| **click** (nome / verbo) | Onomatopeia do **estalo curto** (fecho, [interruptor](${interruptor}), língua) — [click](${WIKT_CLICK}) | Alta |
| **click** (GUI) | Extensão: premir o botão do apontador — o estalo passou ao [gesto](${gesto}) no ecrã | Alta |
| **misclick** | Composto de oficina: o estalo **no sítio errado** | Alta |
| **miss click** | Forma alternativa — a boca parte *misclick* em *miss* + *click* | Alta como grafia viva; **não** muda o étimo |
| **Miss Click** | Maiúsculas de pátio / personificação | Cola — ver §5 |

Registos públicos de oficina (OED, ficha aberta): o **verbo** *misclick* já aparece em **1952** (antes da GUI doméstica — o *click* era tecla, relé, [interruptor](${interruptor})). O **nome** firma-se nos **anos 1990**, quando o clique do apontador virou fala de ecrã e de jogo.

Dois *mis-* úteis, sem fundir:

1. **O sítio** — o dedo foi ao botão do lado.  
2. **O momento** — o dedo foi cedo / tarde; o [alvo](${objetos}) já tinha mudado.

Em ambos: sem [gesto](${gesto}), o prefixo não tem o que errar.

## 4. *click* — o estalo que virou [ação](${acao})

*Click* começa no **ouvido**: um som breve e seco. Depois nomeia o **mecanismo** que o faz ([interruptor](${interruptor}), fecho, patilha). Depois, no ecrã, o **premir** do botão. O português herdou **clique** (o [gesto](${gesto}) no rato) — [clique](${WIKT_CLIQUE_PT}).

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Som** | Estalo curto — onomatopeia | Alta |
| **Peça** | O [interruptor](${interruptor}) / fecho que *clica* | Alta |
| **GUI** | Premir o botão do apontador | Alta (extensão) |
| **Métrica web** | «Um clique» = uma visita / um hit | Alta no jargão; **sala cortada** (≠ clickbait) |
| **«Clicou»** | De repente fez sentido; duas pessoas *click* (afinaram) | Alta como extensão; **outra** sala |
| **PT clique** | Empréstimo do EN *click* para o [gesto](${gesto}) | Alta |
| **PT clique (grupo)** | FR *clique* «panelinha» — **homógrafo** | Alta — **corte** |

**H-click:** o [interruptor](${interruptor}) já clicava **antes** do rato. A ficha [retarget](${retarget}) cortou o rato-hardware da cola *rat+target*. Esta ficha **abre** a sala do clique: o objecto é o [gesto](${gesto}), não o [animal](${animal}).  
**H-luz:** o clique do [interruptor](${interruptor}) pode acender a [luz](${luz}) ([ligar](${ligar})). O *miss click* é o clique que **não** acendeu o sítio pedido.

## 5. A cola da orelha — Miss Click ≠ origem

A [etimologia popular](${WIKI_POP}) é um **mecanismo**, não um erro de quem ouve. A boca vê **Miss Click** em maiúsculas e lê um **tratamento + um nome**: *senhorita Clique*. O lab honra o instinto e **corrige o étimo** — ofício da ficha [etimologia](${etimologia}).

| Teste | *mis-* + *click* (étimo) | *Miss* + *Click* (cola) |
|-------|--------------------------|-------------------------|
| **Família** | prefixo de erro + onomatopeia | título ← *mistress* + antropónimo |
| **Ofício** | clicar no sítio errado | personificar o erro |
| **Grafia** | *misclick* / *miss click* | *Miss Click* (maiúsculas de palco) |
| **Em português** | *clique errado* / *misclick* | *senhorita Clique* **não** soa a étimo — a cola é **bilingue** |
| **Veredicto** | origem | [trocadilho](${trocadilho}) / cola da [orelha](${orelha}) |

Há uma **segunda cola**, mais fina: *miss* verbo («falhar o alvo», OE *missan*) + *click*. Essa leitura **acerta o ofício** e explica a grafia em duas palavras. Ainda assim o étimo de oficina é o **prefixo** *mis-* soldado a *click* — não o título, não a saudade.

**H-cola:** mesmo o «não é a senhorita» ainda pega a pessoa se vier na mesma frase. Cortar em duas frases: o título. Ponto. O clique. Ponto.  
**H-saudade:** EN *miss* também é «ter saudade». **Outra** sala. *I miss you* não gerou *misclick*.  
**H-aglutinação:** a solda **verdadeira** é *mis-* + *click*. A solda **de palco** é *Miss* + *Click*.

## 6. Duas salas — mapa rápido

| Sala | Peça | Ofício |
|------|------|--------|
| **Étimo** | *mis-* + *click* | Erradamente + o estalo |
| **Expressão viva** | **Miss Click** / *miss click* | A boca do pátio (jogo, UI) |
| **Calco** | **clique errado** | Peça PT |
| **Cola** | **Miss** + **Click** | Lembrar, não provar origem |
| **Gesto** | dedo / [mão](${mao}) no botão | A [ação](${acao}) mínima |
| **Alvo** | botão, ícone, unidade | O [objecto](${objetos}) que ficou ao lado |
| **Irmão** | [retarget](${retarget}) | Voltar a apontar — depois do miss |
| **Irmã** | [miss](${missPalavra}) (palavra) | O verbo *miss* / *faltando* / ERROR — a peça, não a locução |
| **Corte** | clique social · saudade · clickbait · bicho rato | Homógrafos / outras árvores |

## 7. Derivação — a família à vista

| Forma | Papel | Sala |
|-------|-------|------|
| **click** | EN — estalo / [gesto](${gesto}) no ecrã | Peça-mãe |
| **mis-** | Prefixo EN «erradamente» | O *ao lado* |
| **misclick** | Verbo / nome de oficina | Forma técnica |
| **miss click** | Reanálise em duas palavras | Grafia viva |
| **Miss Click** | Maiúsculas / personificação | Esta âncora de campo |
| **clique** (PT) | Empréstimo do [gesto](${gesto}) | Calco do som |
| **clique errado** | Calco BR | Boca de pátio PT |
| **clicar fora** | Fala de UI | Vizinho |
| **mistap** | Primo do ecrã táctil | Coordenado (Wiktionary) |
| **clique** (grupo) | FR *clique* | **Corte** |

**H-derivação:** *misclick* é composto, como [retarget](${retarget}) é *re-* + *target*. O lema EN fica no disco; a boca BR pode dizer *misclick* ou *clique errado*. O lab nomeia os dois e **não** finge que o calco é nativo antigo.

## 8. O [gesto](${gesto}) que falhou o [alvo](${objetos})

*Miss click* nomeia um **desvio mínimo**: a [mão](${mao}) fez o [gesto](${gesto}); a [ação](${acao}) caiu **ao lado** do [objecto](${objetos}) pedido. No jogo, isso é fala de [skill](${skill}) (e de lag, e de botão pequeno). No lab, o ofício é **nomear** — não apontar culpa.

| Camada | Leitura | Corte |
|--------|---------|-------|
| **Gesto** | O dedo premou | Esta ficha |
| **Alvo** | O sítio pedido — botão, ícone, unidade | [Objetos](${objetos}); irmão [retarget](${retarget}) |
| **Desfazer** | [Backspace](${backspace}) / undo | Sala seguinte — corrigir o miss |
| **Tranco** | [Buguei](${buguei}) | O peito trava; o miss é o dedo |
| **Hardware** | Rato / trackpad / ecrã | Meio do [gesto](${gesto}); **não** o [animal](${animal}) |
| **Moral** | «És mau de pontaria» | **Corte** — o [risco](${risco}) também mora no botão pequeno |

**H-gesto:** a ficha não ensina a «acertar». Ensina a **separar** o nome do erro, a cola da senhorita, e o [respeito](${respeito}) a quem errou um pixel.  
**H-retarget:** depois do miss, [retarget](${retarget}) é *voltar a apontar*. Duas fichas, um [caminho](${caminho}): falhou → nomeia → aponta de novo.

## 9. Hipóteses

**H1:** *misclick* EN = *mis-* + *click* — «clicar erradamente» — alta.  
**H2:** *click* ← onomatopeia do estalo; a GUI é extensão — alta.  
**H3:** *miss click* é reanálise do composto (verbo *miss* + *click*) — alta como grafia; o ofício coincide; o étimo de oficina continua a ser o prefixo.  
**H4:** a cola **Miss Click** (senhorita) é mnemónica da [orelha](${orelha}) — alta como ofício; **nula** como étimo (*Miss* ← *mistress*).  
**H5:** PT *clique* do rato ← EN *click*; PT *clique* de grupo ← FR *clique* — homógrafos; cortar.  
**H6:** o verbo *misclick* (anos 1950) é anterior à GUI doméstica — o estalo já errava no [interruptor](${interruptor}) / tecla.  
**H7:** saudade (*I miss you*), clickbait e *klick* (km) são outras salas.  
**H8:** o lab nomeia o miss com [verdade](${verdade}); não transforma o dedo em culpa.

## 10. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Miss Click = a senhorita | Étimo *mis-* + *click*; cola à parte |
| **As maiúsculas** | Nome próprio | Grafia de pátio / palco |
| **Duas palavras** | Prova de que é *miss* + *click* (título) | Reanálise possível do **verbo** *miss*; o título é cola |
| **Clique** | Só o grupo de amigos | Homógrafo: [gesto](${gesto}) × panelinha |
| **Rato** | O bicho da cola *retarget* | Aqui o meio do [gesto](${gesto}); o animal fica na [outra](${retarget}) ficha |
| **Skill** | A ficha é um guia de aim | Vocábulo de um [gesto](${gesto}) falhado — sala cortada |
| **Culpa** | O dedo é o réu | O [objecto](${objetos}) pequeno também erra o encontro |

## 11. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *Miss Click* / *misclick* como **clique no sítio errado** |
| Bom | Usar **senhorita Clique** como cola — e declarar que **não é a origem** |
| Bom | Separar *mis-* (prefixo), *miss* (verbo), *Miss* (título) |
| Bom | Calco PT *clique errado* ao lado do loan |
| Bom | [Respeito](${respeito}) a quem errou um pixel |
| Mau | Tutorial de aim, DPI ou macro |
| Mau | Fundir a senhorita no étimo |
| Mau | Fundir *clique* social com o [gesto](${gesto}) |
| Mau | Transformar o miss em culpa moral |

## 12. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=miss-click)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A orelha cola o que a boca juntou](${orelha}) | Ofício da cola *Miss* + *Click* |
| [Etimologia](${etimologia}) · [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) | Étimo × popular × solda verdadeira |
| [Gesto](${gesto}) · [ação](${acao}) · [mão](${mao}) | O acto mínimo que foi ao lado |
| [Objetos](${objetos}) · [retarget](${retarget}) | O [alvo](${objetos}); voltar a apontar |
| [Miss](${missPalavra}) (palavra) | A peça *miss* × *faltando* × ERROR — esta ficha é a locução |
| [Interruptor](${interruptor}) · [ligar](${ligar}) · [luz](${luz}) | O *click* antes do rato |
| [Backspace](${backspace}) · [buguei](${buguei}) | Desfazer / tranco depois do miss |
| [Skill](${skill}) · [pattern](${pattern}) | Jargão EN de oficina — sem tutorial |
| [Relação](${relacao}) | *Click* EN e *clique* PT — dois caminhos, um [gesto](${gesto}) |
| [Língua portuguesa](${lingua}) | Solo do calco *clique errado* |
| [Verdade](${verdade}) · [caminho](${caminho}) · [respeito](${respeito}) · [risco](${risco}) | Ofício |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é aula de rato, DPI, aim ou macro.  
- Não é ficha da senhorita nem de tratamento social.  
- Não é o grupo *clique* nem clickbait.  
- Não funde o [animal](${animal}) rato com o apontador.  
- O poema é **criação do laboratório**.

## Status

**Aprovada na série Expressões** — **Miss Click** fichada como *mis-* + *click* (clique no sítio errado); grafias *misclick* / *miss click*; cola **senhorita Clique** da [orelha](${orelha}), **não** como étimo (*Miss* ← *mistress*). Salas cortadas (grupo social, saudade, clickbait, culpa-moral). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Miss (palavra)](${missPalavra}) · [▶ Etimologia](${etimologia}) · [▶ Gesto](${gesto}) · [▶ Retarget](${retarget}) · [▶ Orelha cola](${orelha}) · [▶ Poema Vida](/vida/#poema=miss-click) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the expression **«[Miss Click](${self})»** — the **[gesture](${gesto})** that **missed the [target](${objetos})**. Field request: inspect the expression *Miss Click*.

Two rooms, one breath. The [ear glues](${orelha}): **Miss** (title) + **Click** (a name). The etymon **cuts**: workshop form is **mis-** («wrongly») + **click** («short snap»). Object = the **locution**. Not a young lady’s biography. Not the social *clique*. Not a mouse tutorial.

> Sources: [misclick](${WIKT}), [mis-](${WIKT_MIS}), [click](${WIKT_CLICK}), [Miss](${WIKT_MISS_TITLE}), [folk etymology](${WIKI_POP}). Method: [etymology](${etimologia}). **Sheet ≠ hardware class, ≠ FPS playbook.** Close: [Valeu !!!](${mantra}).

## Three lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Etymon** | *mis-* + *click* | EN prefix «wrongly» + onomatopoeia of the snap | **Click in the wrong place** — this is the origin |
| **Reanalysis** | *miss* (verb) + *click* | OE *missan* «fail to hit» | Spelling *miss click* — the mouth splits the compound |
| **Glue** | **Miss** (title) + **Click** (name) | *mistress* shortened + the snap turned into a proper name | [Folk etymology](${etimologia}) — memory, **not** genealogy |
| **PT calque** | **clique errado** | EN *click* → PT *clique* | Portuguese piece of the same [gesture](${gesto}) |

**H-letters:** workshop English writes **mis-**. The title *Miss* is another tree (*mistress*). The test is the **family**, not the count of *s*.

The [switch](${interruptor}) already clicked **before** the mouse. Public workshop dates: verb *misclick* from the **1950s**; noun in the **1990s** (GUI / games). After a miss, [retarget](${retarget}) is aiming again. Sister word sheet: [miss](${missPalavra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Sayings.** Etymon *mis-* + *click* (wrong-place click). Spellings *misclick* / *miss click*. Glue *Miss Click* (young lady) only as ear-glue — not origin. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la expresión **«[Miss Click](${self})»** — el **[gesto](${gesto})** que **falló el [blanco](${objetos})**. Pedido de campo: inspeccionar la expresión *Miss Click*.

Dos salas, un soplo. El [oído pega](${orelha}): **Miss** (título) + **Click** (un nombre). El étimo **corta**: la forma de oficio es **mis-** («erradamente») + **click** («chasquido corto»). Objeto = la **locución**. No es biografía de una señorita. No es el grupo social *clique*. No es tutorial de ratón.

> Fuentes: [misclick](${WIKT}), [mis-](${WIKT_MIS}), [click](${WIKT_CLICK}), [Miss](${WIKT_MISS_TITLE}), [etimología popular](${WIKI_POP}). Método: [etimología](${etimologia}). **Ficha ≠ clase de hardware, ≠ playbook de FPS.** Cierre: [¡Valeu !!!](${mantra}).

## Tres linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Étimo** | *mis-* + *click* | prefijo EN «erradamente» + onomatopeya del chasquido | **Clicar en el sitio errado** — esta es la origen |
| **Reanálisis** | *miss* (verbo) + *click* | OE *missan* «fallar el blanco» | Grafía *miss click* — la boca parte el compuesto |
| **Cola** | **Miss** (título) + **Click** (nombre) | *mistress* acortado + el chasquido vuelto antropónimo | [Etimología popular](${etimologia}) — memoria, **no** genealogía |
| **Calco PT** | **clique errado** | EN *click* → PT *clique* | Pieza portuguesa del mismo [gesto](${gesto}) |

**H-letras:** el inglés de oficio escribe **mis-**. El título *Miss* es otro árbol (*mistress*). La prueba es la **familia**, no la cuenta de *s*.

El [interruptor](${interruptor}) ya clicaba **antes** del ratón. Fechas públicas: verbo *misclick* desde los **años 1950**; nombre en los **1990**. Después del miss, [retarget](${retarget}) es volver a apuntar. Ficha hermana: [miss](${missPalavra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Expresiones.** Étimo *mis-* + *click* (clic en el sitio errado). Grafías *misclick* / *miss click*. Cola *Miss Click* (señorita) solo como cola del oído — no origen. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMissClickPost() {
  const { body, contentEn, contentEs } = buildMissClickBodies();
  const seriesOrder = pickOrder('inspecao-expressao-miss-click', 279);
  return expressaoPost({
    title: 'Inspeção: Miss Click — mis- + click; a orelha cola a senhorita; ≠ clique social',
    titleEn: 'Inspection: Miss Click — mis- + click; the ear glues the young lady; ≠ social clique',
    titleEs: 'Inspección: Miss Click — mis- + click; el oído pega a la señorita; ≠ clique social',
    excerpt:
      'Expressões: Miss Click (mis- + click) — clique no sítio errado; cola senhorita Clique ≠ étimo; calco clique errado; Valeu !!!',
    excerptEn:
      'Sayings: Miss Click (mis- + click) — click in the wrong place; Miss Click glue ≠ etymon; calque clique errado; Valeu !!!',
    excerptEs:
      'Dichos: Miss Click (mis- + click) — clic en el sitio errado; cola señorita Clique ≠ étimo; calco clique errado; ¡Valeu !!!',
    slug: 'inspecao-expressao-miss-click',
    date: '2026-08-24T10:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Miss Click · expressão',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMissClickPost,
  buildMissClickBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
