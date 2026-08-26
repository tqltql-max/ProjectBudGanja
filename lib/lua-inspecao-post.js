'use strict';

/**
 * Inspeção Palavras · lua
 * Eixos: lat. lūna («a luminosa») · irmã de lūx · ≠ moon/mês (medir) ·
 * satélite × palavra × expressões · dar à luz (lux, não luna) ·
 * ≠ horóscopo ≠ linguagens PUC-Rio (sala cortada).
 * Pedido: inspeção na palavra Lua. Eco de campo: dar a lux.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/lua-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/lua';
const WIKT_LUNA = 'https://en.wiktionary.org/wiki/luna#Latin';
const WIKT_LUX = 'https://en.wiktionary.org/wiki/lux#Latin';
const WIKT_MOON = 'https://en.wiktionary.org/wiki/moon';
const WIKT_MES = 'https://pt.wiktionary.org/wiki/m%C3%AAs';
const WIKT_DAR = 'https://pt.wiktionary.org/wiki/dar_%C3%A0_luz';
const WIKI = 'https://pt.wikipedia.org/wiki/Lua';
const WIKI_LANG = 'https://pt.wikipedia.org/wiki/Lua_(linguagem_de_programa%C3%A7%C3%A3o)';

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
  return `Lua.
Não é o sol.
Não é a luz.
É a que brilha
com claridade emprestada.

Lūna — a luminosa.
Irmã de lūx.
Não irmã de moon.

Moon mede o mês.
Lua alumia a noite.

Dar à luz
é trazer ao claro.
Não é pôr o astro no colo.

Estar na lua é outra sala.
Lua de mel é outra sala.
A linguagem Lua é outra sala.

Valeu !!!
brilho emprestado
sem fingir que é sol.`;
}

function poemEn() {
  return `Lua.
It is not the sun.
It is not the light.
It is the one that shines
with borrowed clarity.

Lūna — the luminous one.
Sister of lūx.
Not sister of moon.

Moon measures the month.
Lua lights the night.

Dar à luz
is to bring into the clear.
It is not putting the orb in your lap.

To be on the moon is another room.
Honeymoon is another room.
The Lua language is another room.

Valeu !!!
borrowed shine
without pretending to be the sun.`;
}

function poemEs() {
  return `Lua.
No es el sol.
No es la luz.
Es la que brilla
con claridad prestada.

Lūna — la luminosa.
Hermana de lūx.
No hermana de moon.

Moon mide el mes.
Lua alumbra la noche.

Dar à luz
es traer a lo claro.
No es poner el astro en el colo.

Estar en la luna es otra sala.
Luna de miel es otra sala.
El lenguaje Lua es otra sala.

¡Valeu !!!
brillo prestado
sin fingir que es sol.`;
}

function buildLuaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-lua.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const pariu = '/posts/post-inspecao-palavra-pariu.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const lampada = '/posts/post-inspecao-palavra-lampada.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const cultivo = '/guia/cultivo-basico.html';
  const luximetro = '/calculadoras/luximetro.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[lua](${self})** — lat. *lūna*, «a luminosa». Pedido de campo: *inspeção na palavra Lua*. Eco de campo: a expressão **dar à luz** (grafia de orelha: *dar a lux*).

Três salas, um céu. O **objecto** é o satélite (e o vocábulo que o nomeia). A **irmã lexical** é [luz](${luz}) (lat. *lūx*). A **expressão** *dar à luz* usa a claridade, **não** o astro. O inglês *moon* e o português *mês* medem o [tempo](${tempo}) — **outra árvore**. Objecto = o **vocábulo**. Não é horóscopo. Não é tutorial da linguagem PUC-Rio. Não é protocolo de fotoperíodo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · lua](${WIKT}), lat. [*lūna*](${WIKT_LUNA}), [*lūx*](${WIKT_LUX}), [*moon*](${WIKT_MOON}), [*mês*](${WIKT_MES}), [*dar à luz*](${WIKT_DAR}), [Wikipédia · Lua](${WIKI}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ almanaque lunar, ≠ obstetrícia, ≠ curso de programação, ≠ PPFD.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *lua* / *luna* / *lunar* / *lua cheia* / *estar na lua* / *lua de mel* / *dar à luz* / *lux*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **lua** (PT; capital *Lua* = o satélite da Terra, por convenção) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *lūna* «lua; a luminosa» ← PIE *lewk-* «brilhar, claro» — confiança: **alta** |
| Irmã de claridade | Lat. *lūx, lūcis* → PT [luz](${luz}); unidade SI **lux**; *lūmen* |
| Não-irmã (medir) | Ing. *moon* / PT *mês* ← PIE *mēh₁-* «medir» — outra árvore |
| Tipo BudGanja | Palavra — astro × vocábulo × família *lūx* × expressão *dar à luz* |
| Não é | Horóscopo · obstetrícia · linguagem Lua (PUC-Rio) · [luxímetro](${luximetro}) como protocolo |
| Data | ${inspected} |
| Fonte | [lua](${WIKT}) |

**O que é o objecto:** o nome do **satélite** que alumia a [noite](${noite}) com [luz](${luz}) **emprestada** do [sol](${sol}) — e, por extensão, o ciclo visível (nova, crescente, cheia, minguante). No lab: [objecto](${objetos}) celeste + vocábulo. A capital *Lua* marca o corpo do Sistema Solar; a minúscula *lua* marca o nome comum (e, noutros planetas, outras luas).

## 2. Três linhagens — brilhar ≠ medir

Pedido de campo: a **palavra** e a **expressão** (*dar a lux*). O lab **não funde**.

| Linhagem | Peça | Origem | Ofício nesta ficha |
|----------|------|--------|---------------------|
| **Étimo da lua** | *lūna* | PIE *lewk-* «claro, brilhar» → «a luminosa» | O **astro** e o vocábulo PT |
| **Étimo da luz** | *lūx* | A **mesma** raiz *lewk-* | Claridade — [luz](${luz}); unidade **lux** |
| **Expressão** | *dar à luz* | *luz* / *lūx*, não *lūna* | Parto e «trazer ao claro» |
| **Medir** | *moon* / *mês* | PIE *mēh₁-* «medir» → *mḗh₁n̥s* | O [tempo](${tempo}) do mês — **outra** árvore |

**H-linhagem:** *lua* e [luz](${luz}) são **irmãs** (as duas vêm do brilho). *Moon* e *mês* são **primos um do outro**, não da lua portuguesa. A [orelha](${orelha}) pode colar *lua* e *lux* porque soam a claridade; o étimo **confirma** a cola *lua↔luz* e **corta** a cola *lua↔moon*.  
**H-capital:** *Lua* (satélite da Terra) × *lua* (nome comum / outras luas). Mesma palavra; o grafema marca o [objecto](${objetos}) astronómico.

## 3. *lūna* — a luminosa

O [Wiktionary](${WIKT_LUNA}) fecha o étimo latino: *lūna* é o nome do astro e, por extensão, o de *Diana* / *Selene* no panteão. A reconstrução usual liga *lūna* a *leuksna* — «a que tem luz», a luminosa. Daí a família à vista:

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **lūna** | Lat. clássico → PT *lua* (queda do *-n-* intervocálico: *luna* > *lũa* > *lua*) | Alta |
| **lūx** | «luz, claridade» → PT [luz](${luz}); SI **lux** (lm/m²) | Alta |
| **lūmen** | «luz; abertura que deixa luz» → *lúmen*, *iluminar* | Alta |
| **lūcēre** | «brilhar» → *luzir*, *reluzir* | Alta |
| **lunar** | Do astro — ciclo, calendário, relevo | Alta |
| **lunático** | Antiga crença de que a lua desregula o ânimo | Alta como história da palavra; **nula** como clínica |

Cognatos românicos: esp. *luna* · fr. *lune* · it. *luna*. O inglês *moon* **não** entra nesta lista. O grego *selḗnē* (de *sélas*, «clarão») é **outro** nome de claridade — [relação](${relacao}) de ofício, não calco.

Segunda-feira em espanhol é *lunes* (*dies Lunae*). Em português o dia da lua perdeu o astro no nome civil (*segunda-feira*). O lab regista o corte: **o astro ficou na palavra *lua*, não no dia da semana BR**.

## 4. *lua* × *luz* × *lux* — três peças, uma raiz

A orelha cola. O étimo, desta vez, **não corta** o parentesco — corta a **sala**.

| Peça | O que é | O que não é |
|------|---------|-------------|
| **lua** | O astro / o vocábulo | A claridade em si |
| **[luz](${luz})** | A claridade (efeito) | O satélite |
| **lux** (SI) | Unidade de iluminância — o nome latino da [luz](${luz}) virado instrumento | Protocolo de cultivo; ver [Luxímetro](${luximetro}) |
| **lux** (latim) | A palavra-mãe de *luz* | Grafia alternativa de *lua* |

**H-emprestada:** a lua **não produz** a luz do dia. Reflete o [sol](${sol}). Por isso o poema diz *brilho emprestado*. No cultivo, a lua **não substitui** painel nem [lâmpada](${lampada}).  
**H-luxímetro:** medir lux no quarto é ofício da [calculadora](${luximetro}). Esta ficha nomeia o vocábulo *lux*; não calibra o dossel.

## 5. A expressão — dar à luz (*dar a lux*)

Pedido eco: *dar a lux*. A forma canónica PT é **dar à luz** (*à* = *a* + *a*). A boca pode escrever *lux* porque o latim da claridade **é** *lūx*. O lab honra as duas grafias e **corta o astro** da expressão.

| Leitura | Ofício | Confiança |
|---------|--------|-----------|
| **Parto** | «Ela deu à luz uma menina» — trazer uma [vida](${vida}) ao claro | Alta |
| **Revelar** | «O arquivo veio à luz» — trazer ao visível | Alta |
| **Étimo da expressão** | *luz* / *lūx*, não *lūna* | Alta |
| **Par obstétrico** | [pariu](${pariu}) / lat. *pariō* «dar à luz» — **outro** verbo, mesmo ofício de nascimento | Alta |
| **Elo [mãe](${mae})** | Quem dá à luz no sentido de parto | Alta — pede [respeito](${respeito}) |

**H-expressão:** *dar à luz* **não** é «oferecer a lua». É meter no claro. O recém-nascido sai da sombra do corpo para a [luz](${luz}). A metáfora é de **claridade**, não de satélite.  
**H-lux:** escrever *dar a lux* é lapso útil — aponta para o étimo latino da claridade. Corrigir a preposição (*à*) sem apagar o lux.  
**H-pariu:** [pariu](${pariu}) é o verbo de nascimento (lat. *pariō*). *Dar à luz* é a **perífrase** de claridade. Duas bocas, um ofício. Não fundir com palavrão.

## 6. *moon* e *mês* — a árvore que mede

A [orelha](${orelha}) bilingue cola *lua* e *moon* porque **apontam para o mesmo astro**. O étimo **corta**.

| Língua | Palavra do astro | Veio de | Palavra do mês |
|--------|------------------|---------|----------------|
| **PT** | *lua* (*lūna*, brilhar) | *lewk-* | *mês* (*mensis*, medir) |
| **EN** | *moon* | *mēh₁-* (medir) | *month* (a mesma raiz) |
| **ES** | *luna* (brilhar) | *lewk-* | *mes* (medir) |

Inglês fundiu **astro** e **medida** na mesma família (*moon* / *month*). Português (e espanhol) **separou**: o astro brilha (*lua* / *luna*); o calendário mede (*mês* / *mes*). Três soluções, dois ofícios — [relação](${relacao}), não calco.

**H-mês:** o mês civil ainda **imita** o ciclo da lua (≈ 29,5 dias no sinódico) mesmo quando a palavra *mês* já não diz *lua*. O [tempo](${tempo}) ficou na medida; o brilho ficou no astro.

## 7. Camadas BR — o que a boca faz com a lua

| Camada | Leitura | Sala |
|--------|---------|------|
| **Astro / satélite** | A Lua; luas de Júpiter | Esta ficha |
| **Fases** | Nova, crescente, cheia, minguante | Ciclo visível — não horóscopo |
| **«Estar na lua»** | Distraído; fora do quarto | Figurado — corte com astronomia |
| **Lua de mel** | Calco de *honeymoon* — o mês doce depois do rito | Expressão; **não** étimo de *lua* |
| **Lunático** | História da palavra: a lua como desregra | História; **não** diagnóstico |
| **Linguagem Lua** | PUC-Rio, 1993 — sucessor de SOL; nome PT do astro | [Outra sala](${WIKI_LANG}) — sem tutorial |
| **Segunda-feira** | Em ES *lunes*; em PT o astro saiu do dia | Corte civil |

**H-lua-de-mel:** a *mel* é o doce; a *lua* / *moon* é o **mês** (o tempo do rito). Em inglês a peça mede; em português a boca **importou o astro**. Cola de tradução, não genealogia de *lūna*.  
**H-PUC:** a linguagem Lua chama-se *lua* porque o laboratório carioca veio depois de uma linguagem *SOL*. Astro depois do astro. Ficha ≠ manual de *script*.

## 8. Lua × sol × noite × luz × circuito

| Papel | Ficha | Leitura |
|-------|-------|---------|
| **Fonte do dia** | [Sol](${sol}) | Astro que **produz** luz |
| **Claridade** | [Luz](${luz}) | Efeito — natural ou de clique |
| **Escuro / ciclo** | [Noite](${noite}) | Quando o sol baixa — o palco da lua |
| **Satélite** | **Lua** (esta ficha) | Brilho **emprestado**; marca o mês visível |
| **Peça / verbo** | [Interruptor](${interruptor}) | Clique que imita o dia — **não** a lua |

**Tese:** a lua é o **rosto da noite**, não a matriz do dia. O [sol](${sol}) dá; a lua **devolve**. Sem [noite](${noite}), a lua não tem palco. Sem [luz](${luz}), o nome *lūna* («luminosa») fica sem ofício.

## 9. Hipóteses

**H1:** PT *lua* < lat. *lūna* — alta.  
**H2:** *lūna* e *lūx* partilham a raiz *lewk-* («brilhar») — alta no traçado geral.  
**H3:** ing. *moon* / PT *mês* vêm de *mēh₁-* («medir») — alta; **não** são étimo de *lua*.  
**H4:** *dar à luz* é perífrase de claridade (*lūx*), não de satélite — alta.  
**H5:** *dar a lux* é lapso que acerta o latim e erra a preposição (*à*) — ofício da [orelha](${orelha}).  
**H6:** a lua **reflete** o [sol](${sol}); não substitui painel no [cultivo](${cultivo}).  
**H7:** horóscopo, obstetrícia clínica e linguagem PUC-Rio são salas cortadas.  
**H8:** o lab alumia com [verdade](${verdade}); não lê destino na fase.

## 10. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Lua = luz = moon = mês | *Lua*/*luz* brilham; *moon*/*mês* medem |
| **Dar à luz** | Oferecer o astro | Trazer ao claro (*lūx*) |
| **Lua de mel** | A lua adoça o rito | Calco de *honeymoon* — o **mês** doce |
| **Estar na lua** | Astronauta | Distracção |
| **Lunático** | A lua causa o ânimo | História da palavra, não clínica |
| **Lux** | Outro nome da lua | Unidade / étimo de [luz](${luz}) |
| **Linguagem Lua** | Esta ficha ensina a programar | Nome de oficina carioca — outra sala |

## 11. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *lua* como lat. *lūna* — a luminosa |
| Bom | Cruzar com [luz](${luz}) (*lūx*) sem fundir astro e claridade |
| Bom | Contar *dar à luz* como claridade / parto — e o lapso *lux* |
| Bom | Separar *moon*/*mês* (medir) da *lua* (brilhar) |
| Bom | [Respeito](${respeito}) a quem dá à luz |
| Mau | Horóscopo, azar de lua cheia, destino na fase |
| Mau | Tutorial obstétrico ou de linguagem Lua |
| Mau | Fingir que a lua substitui o [sol](${sol}) no dossel |

## 12. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=lua)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Luz](${luz}) | Irmã *lūx* — claridade; não o astro |
| [Sol](${sol}) | Quem **empresta** o brilho |
| [Noite](${noite}) | Palco da lua |
| [Luxímetro](${luximetro}) | Medir *lux* — unidade, não satélite |
| [Tempo](${tempo}) | Casa do *mês* (a árvore que mede) |
| [Vida](${vida}) · [mãe](${mae}) · [pariu](${pariu}) | Quem entra em *dar à luz* |
| [Objetos](${objetos}) | O satélite como coisa no céu |
| [Etimologia](${etimologia}) · [relação](${relacao}) · [orelha cola](${orelha}) | Étimo × cola × duas árvores |
| [Lâmpada](${lampada}) · [interruptor](${interruptor}) | Circuito — imita o dia, não a lua |
| [Gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [respeito](${respeito}) · [sinal](${sinal}) | Ofício |
| [Língua portuguesa](${lingua}) | Solo de *lua* e de *dar à luz* |
| [Cultivo](${cultivo}) | Fotoperíodo — a lua não é o painel |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é almanaque, mapa astral nem aviso de «lua cheia perigosa».  
- Não é manual de parto nem de linguagem de programação.  
- Não é protocolo PPFD: luar ≠ dose de cultivo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **lua** fichada como lat. *lūna* (a luminosa; irmã de *lūx*); **dar à luz** como perífrase de claridade (lapso *lux* honrado, astro cortado); *moon*/*mês* na árvore que **mede**. Salas cortadas (horóscopo, obstetrícia, PUC-Rio tutorial). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Luz](${luz}) · [▶ Sol](${sol}) · [▶ Noite](${noite}) · [▶ Tempo](${tempo}) · [▶ Dar à luz / pariu](${pariu}) · [▶ Poema Vida](/vida/#poema=lua) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of Portuguese **lua** (moon) — Lat. *lūna*, “the luminous one”. Field request: the **word**. Echo: the expression **dar à luz** (“give to the light” = give birth / bring to light), sometimes heard as *dar a lux*.

Three rooms. The **object** is the satellite and its name. The **lexical sister** is [luz](${luz}) (Lat. *lūx*). The **expression** uses clarity, **not** the orb. English *moon* and Portuguese *mês* (month) **measure** [time](${tempo}) — another tree. Object = the **word**. Not a horoscope. Not a Lua-language tutorial. Not a PPFD protocol.

> Sources: [lua](${WIKT}), [*lūna*](${WIKT_LUNA}), [*lūx*](${WIKT_LUX}), [*moon*](${WIKT_MOON}), [*mês*](${WIKT_MES}), [*dar à luz*](${WIKT_DAR}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Three lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Etymon of lua** | *lūna* | PIE *lewk-* “bright” → “the luminous one” | The **orb** and the PT word |
| **Etymon of luz** | *lūx* | The **same** *lewk-* | Clarity — [luz](${luz}); SI **lux** |
| **Expression** | *dar à luz* | *luz* / *lūx*, not *lūna* | Birth and “bring into the clear” |
| **Measure** | *moon* / *mês* | PIE *mēh₁-* “to measure” | [Time](${tempo}) of the month — **another** tree |

Portuguese *lua* and [luz](${luz}) are **sisters** (both shine). English *moon* and PT *mês* are **cousins of each other**, not of *lua*. The [ear](${orelha}) may glue *lua* and *moon* because they name the same sky-object; the etymon **cuts**.

## *dar à luz*

Canonical PT: **dar à luz** (*à* = *a* + *a*). Writing *lux* points at the Latin of clarity. The expression does **not** offer the moon; it brings a [life](${vida}) (or a fact) **into the light**. Neighbour: [pariu](${pariu}) (Lat. *pariō*).

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *lua* < *lūna* (the luminous one; sister of *lūx*). *dar à luz* = clarity / birth, not the orb. *moon*/*mês* measure. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **lua** (luna) — lat. *lūna*, «la luminosa». Pedido: la **palabra**. Eco: la expresión **dar à luz** («dar a la luz» = parir / sacar a la luz), oída a veces como *dar a lux*.

Tres salas. El **objeto** es el satélite y su nombre. La **hermana léxica** es [luz](${luz}) (lat. *lūx*). La **expresión** usa la claridad, **no** el astro. El inglés *moon* y el portugués *mês* **miden** el [tiempo](${tempo}) — otro árbol. Objeto = el **vocablo**. No es horóscopo. No es tutorial del lenguaje Lua. No es protocolo PPFD.

> Fuentes: [lua](${WIKT}), [*lūna*](${WIKT_LUNA}), [*lūx*](${WIKT_LUX}), [*moon*](${WIKT_MOON}), [*mês*](${WIKT_MES}), [*dar à luz*](${WIKT_DAR}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Tres linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Étimo de lua** | *lūna* | PIE *lewk-* «brillar» → «la luminosa» | El **astro** y el vocablo PT |
| **Étimo de luz** | *lūx* | La **misma** *lewk-* | Claridad — [luz](${luz}); SI **lux** |
| **Expresión** | *dar à luz* | *luz* / *lūx*, no *lūna* | Parto y «traer a lo claro» |
| **Medir** | *moon* / *mês* | PIE *mēh₁-* «medir» | El [tiempo](${tempo}) del mes — **otro** árbol |

El portugués *lua* y [luz](${luz}) son **hermanas**. *Moon* y *mês* son **primos entre sí**, no de *lua*. El [oído](${orelha}) pega *lua* y *moon* porque nombran el mismo objeto del cielo; el étimo **corta**.

## *dar à luz*

Forma canónica: **dar à luz**. Escribir *lux* apunta al latín de la claridad. La expresión **no** ofrece el astro; trae una [vida](${vida}) (o un hecho) **a la luz**. Vecino: [pariu](${pariu}) (lat. *pariō*).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *lua* < *lūna* (la luminosa; hermana de *lūx*). *dar à luz* = claridad / parto, no el astro. *moon*/*mês* miden. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildLuaPost() {
  const { body, contentEn, contentEs } = buildLuaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-lua', 292);
  return makePalavra({
    title: 'Inspeção: Lua — lūna, a luminosa; irmã de lūx; ≠ moon',
    titleEn: 'Inspection: Lua — lūna, the luminous one; sister of lūx; ≠ moon',
    titleEs: 'Inspección: Lua — lūna, la luminosa; hermana de lūx; ≠ moon',
    excerpt:
      'Palavras: lua (lat. lūna) — a luminosa; irmã de luz/lūx; dar à luz (claridade, não o astro); moon/mês medem; Valeu !!!',
    excerptEn:
      'Words: lua (Lat. lūna) — the luminous one; sister of luz/lūx; dar à luz (clarity, not the orb); moon/mês measure; Valeu !!!',
    excerptEs:
      'Palabras: lua (lat. lūna) — la luminosa; hermana de luz/lūx; dar à luz (claridad, no el astro); moon/mês miden; ¡Valeu !!!',
    slug: 'inspecao-palavra-lua',
    date: '2026-08-24T10:25:00.000Z',
    seriesOrder,
    seriesLabel: 'Lua · lūna · lūx',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLuaPost,
  buildLuaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
