'use strict';

/**
 * Inspeção Palavras · profanar
 * Eixos: lat. profānāre ← pro- + fānum · professor (profitērī) ·
 * profanação · propagação (prōpāgāre) · programação (prógramma) ·
 * elo /tecnologia/ · Faça o seu melhor · Valeu !!!
 * Pedido de campo: profanar × professor; propagação; profanação;
 * programação; ligar a tecnologia.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/profanar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/profanar';
const WIKT_FANUM = 'https://en.wiktionary.org/wiki/fanum#Latin';
const WIKT_PROFANUS = 'https://en.wiktionary.org/wiki/profanus#Latin';
const WIKT_PROFESSOR = 'https://pt.wiktionary.org/wiki/professor';
const WIKT_PROPAGO = 'https://en.wiktionary.org/wiki/propago#Latin';
const WIKT_PROGRAMA = 'https://pt.wiktionary.org/wiki/programa%C3%A7%C3%A3o';
const WIKT_GRAMMA = 'https://en.wiktionary.org/wiki/%CF%80%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1#Ancient_Greek';

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
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Profanar.
Não é o professor.
É o umbral do templo.

Pro- + fānum.
Fora do recinto.
O sagrado sai —
ou é arrastado.

Professor declara.
Propagação estaca.
Programação escreve
o aviso à frente.

Quatro árvores.
Um prefixo.
A orelha cola.
O étimo corta.

Faça o seu melhor
no umbral:
trazer sem pisar.

Valeu !!!
fora do templo
sem baratear o sagrado.`;
}

function poemEn() {
  return `Profanar.
It is not the professor.
It is the temple threshold.

Pro- + fānum.
Outside the precinct.
The sacred steps out —
or is dragged out.

A professor declares.
Propagation takes a cutting.
Programming writes
the notice in front.

Four trees.
One prefix.
The ear glues.
The etymon cuts.

Do your best
on the threshold:
bring it out without trampling.

Valeu !!!
outside the temple
without cheapening the sacred.`;
}

function poemEs() {
  return `Profanar.
No es el profesor.
Es el umbral del templo.

Pro- + fānum.
Fuera del recinto.
Lo sagrado sale —
o lo arrastran.

El profesor declara.
La propagación estaquilla.
La programación escribe
el aviso delante.

Cuatro árboles.
Un prefijo.
El oído pega.
El étimo corta.

Haz tu mejor
en el umbral:
sacar sin pisar.

¡Valeu !!!
fuera del templo
sin baratear lo sagrado.`;
}

function buildProfanarBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-profanar.html';
  const tech = '/posts/post-inspecao-palavra-tecnologia.html';
  const cat = '/tecnologia/';
  const script = '/posts/post-inspecao-palavra-script.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const deus = '/posts/post-inspecao-palavra-deus.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const eliana = '/posts/post-inspecao-eliana-rodrigues.html';
  const unifesp = '/biblioteca/unifesp/';
  const planta = '/plantas/cannabis-sativa/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[profanar](${self})** — lat. *profānāre* ← *pro-* («diante / fora») + *fānum* («templo, recinto consagrado»). Pedido de campo: relação com **professor**; **propagação**; **profanação**; **programação**; **ligar a [tecnologia](${tech})**. Fecho de ofício: **[Faça o seu melhor](${faca})**.

Quatro vocábulos, **um prefixo**, **quatro raízes**. A [orelha cola](${orelha}) o *profa-* / *progra-*. O [étimo](${etimo}) **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · profanar](${WIKT}), lat. [*profānus*](${WIKT_PROFANUS}), [*fānum*](${WIKT_FANUM}), [professor](${WIKT_PROFESSOR}), lat. [*prōpāgō*](${WIKT_PROPAGO}), [programação](${WIKT_PROGRAMA}), gr. [*prógramma*](${WIKT_GRAMMA}). **Ficha ≠ licença para profanar, ≠ ataque a professores, ≠ tutorial de código, ≠ manual de estaca.** Série [Palavras](${hub}). Tom: literacia; [respeito](${respeito}) ao sagrado e ao [gesto](${gesto}) de ensinar.

**Gatilho:** *profanar* / *profano* / *profanação* / *professor* / *propagação* / *programação*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **profanar** (verbo) · **profanação** (nome) |
| Classe | Verbo transitivo / substantivo feminino |
| Étimo (trabalho) | lat. *pro-* + *fānum* → *profānus* «fora do templo» → *profānāre* — confiança: **alta** |
| Família | *profano* · *profanação* · *profanador* · EN *profane* · ES *profanar* |
| Tipo BudGanja | Palavra — umbral × falso amigo × cluster *pro-* |
| Não é | [professor](${self}#3-professor--o-que-a-orelha-cola) (outra raiz) · culto · ódio ao ensino |
| Elo ofício | [etimologia](${etimologia}) · [relação](${relacao}) · [tecnologia](${tech}) · [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) |
| Fonte | [profanar](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o gesto de **tratar como não-sagrado** o que estava no recinto — primeiro um lugar (*fora do *fānum*), depois um juízo (violar, baratear, arrancar do contexto). No lab: **trazer ao público não é o mesmo que pisar**.

## 2. Hipóteses e método

**H1:** *profanar* / *profanação* / *profano* são a **mesma árvore** (*fānum*).  
**H2:** *professor* vem de *profitērī* (*pro-* + *fatērī*, «declarar em público») — **não** de *fānum*.  
**H3:** *propagação* vem de *prōpāgāre* (*pro-* + *pangere*, «fixar / estacar») — planta e ideia.  
**H4:** *programação* vem de gr. *prógramma* (*pró-* + *grámma*, «o que se escreve à frente») — aviso, plano, código.  
**H5:** o prefixo *pro-* é o **parente**; as raízes **não** se fundem.  
**H6:** um professor que **professa** (declara) pode, no sentido *espacial* antigo, trazer o saber **para fora do templo** — isso **não** é a injúria moderna de *profanar*.  
**H7:** baratear, descontextualizar ou extrair o sagrado **é** profanação no sentido vivo — eco na [Eliana Rodrigues](${eliana}) / [UNIFESP](${unifesp}): o sagrado de comunidades tradicionais não se torna «recurso» sem resto.

Passos: étimo → corte da orelha → quatro ofícios → elo tecnologia → limites.

## 3. Quatro árvores (não colar pelo som)

| Vocábulo | Raiz | Gesto | Mau uso |
|----------|------|-------|---------|
| **profanar / profanação** | *fānum* (templo) | Tirar do recinto / violar o sagrado | «Ensinar = profanar» |
| **professor** | *fatērī* (confessar, declarar) | Declarar em público o ofício | «Professor = o que profana» |
| **propagação** | *pangere* (fixar, estacar) | Estaca, clone, espalhar o vivo | «Propaganda = esta ficha» |
| **programação** | *grámma* (letra escrita) | Escrever o plano / o código | «Programar = profanar a máquina» |

O *pro-* comum diz **para a frente / em público**. Cada raiz diz **o quê**.

## 4. Professor — o que a orelha cola

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| Grafia *profa-* | Mesma família | *fānum* × *fatērī* — [orelha cola](${orelha}), [étimo](${etimo}) corta |
| Ofício | Quem profana o segredo da guilda | Quem **professa**: declara o saber à porta |
| Insulto | Professor = destruidor do sagrado | Falsa etimologia popular — [etimologia](${etimologia}) |
| Umbral útil | Tirar do templo = trair | Tirar do templo = **publicar com [respeito](${respeito})** |

**Leitura de ofício:** o bom professor **professa** no umbral — traz o método para a rua **sem** pisar o recinto. O mau ofício **profana**: arranca, descontextualiza, barateia. A [relação](${relacao}) é de **gesto**, não de étimo. [Faça o seu melhor](${faca}) é a regra da porta.

*Profissão* / *professar* / *profissional* ficam na árvore de *profitērī* — irmãos do professor, **não** de *fānum*.

## 5. Profanação

*Profanação* é o **nome do acto**. Não é um templo a menos: é o que se faz **ao** templo, ao rito, ao nome, ao saber guardado.

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **Espacial (antigo)** | Ficar / pôr *pro fano* — diante do recinto, não iniciado | «Ateísmo» como sinónimo |
| **Moral (vivo)** | Violar, escarnecer, tornar vulgar o que pedia [respeito](${respeito}) | Licença poética para destruir |
| **Epistémico** | Tirar saber tradicional do contexto e vendê-lo como peça solta | Método da [UNIFESP](${unifesp}) / [Eliana](${eliana}) — o contrário: literacia **com** origem |
| **Lab** | Nomear o dano quando o sagrado foi usado de troféu | Púlpito nesta ficha |

**H8:** no laboratório, *profano* não é xingamento automático. É o **lado de fora**. O juízo começa quando o fora **rouba** o dentro.

## 6. Propagação

Lat. *prōpāgō* — a **estaca**, o rebentamento que se fixa para gerar outro pé. No cultivo: clone, alporquia, divisão. No discurso: espalhar uma ideia.

| Peça | Gesto | Corte |
|------|-------|-------|
| **Estaca viva** | Multiplicar a [planta](${planta}) sem apagar o pé-mãe | Tutorial de cultivo ilícito **não** cabe aqui |
| **Saber** | O professor **propaga** o método | Propagar ≠ profanar: um *espalha o vivo*; o outro *tira o sagrado do sítio* |
| **Propaganda** | Prima histórica (*Congregatio de Propaganda Fide*, 1622 — «propagação da fé») | Esta ficha **não** é marketing |

**Leitura:** propagação **continua** a vida. Profanação **rompe** o recinto. Podem coincidir num acto mau (espalhar o sagrado como produto). O étimo **não** as funde.

## 7. Programação — ligar a tecnologia

Gr. *prógramma*: o **escrito posto à frente** (edital, plano). Daí *programa* (grade, plano de acção) e *programação* (o ofício de escrever a sequência que a máquina executa).

| Forma | Sala | Elo |
|-------|------|-----|
| **programa** (aviso / plano) | Texto público *antes* do acto | *pró-* + *grámma* |
| **programação** (código) | Ofício de escrever o método executável | [script](${script}) · [commitar](${commitar}) |
| **[tecnologia](${tech})** | *tékhnē* + *lógos* — lema do catálogo **[Tecnologia](${cat})** | A programação é **uma** sala da *tékhnē*; não é o lema inteiro |

**H9:** programar é **escrever o aviso que a máquina vai cumprir**. [Faça o seu melhor](${faca}) aqui = método claro, rasto honesto, sem culto de linguagem.  
**H10:** programação **não** profana a [tecnologia](${tech}) por existir. Profana quando o código vira ídolo, extractivismo ou truque que esconde o ofício.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| Um étimo só | *profa-* = família | Quatro raízes sob *pro-* |
| Professor vilão | Quem ensina destrói o mistério | Quem professa **publica**; profanar é outro verbo |
| Clone = roubo | Toda estaca é profanação | Propagação *pangere*; recinto *fānum* |
| Código = pecado | Programar tira a alma da coisa | *grámma* na sala [tecnologia](${tech}) |
| Profano = inimigo | Fora = contra | Fora = umbral; o juízo é o **como** se sai |

## 9. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Cortar a cola** | Professor ≠ profanar | Esta ficha |
| **Nomear o umbral** | Sagrado × público | Trazer com [respeito](${respeito}) |
| **Cultivo** | Estaca / clone | [Planta](${planta}) — literacia, não receita ilícita |
| **Ofício tech** | Escrever o plano | [Tecnologia](${cat}) · [script](${script}) · [Faça o seu melhor](${faca}) |
| **Fechar** | Depois do corte, o acto | [Valeu !!!](${mantra}) |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=profanar)

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[tecnologia](${tech})** · **[Tecnologia](${cat})** | Lema e catálogo — sala da *programação* |
| **[script](${script})** · **[commitar](${commitar})** | Sequência escrita e rasto |
| **[étimo](${etimo})** · **[etimologia](${etimologia})** · **[orelha cola](${orelha})** | Método: cola × corte |
| **[Eliana Rodrigues](${eliana})** · **[UNIFESP](${unifesp})** | Sagrado tradicional × extractivismo |
| **[Deus](${deus})** · **[respeito](${respeito})** · **[verdade](${verdade})** | Recinto e juízo, sem catecismo nesta ficha |
| **[relação](${relacao})** · **[gesto](${gesto})** · **[caminho](${caminho})** · **[língua](${lingua})** | Ofício |
| **[Faça o seu melhor](${faca})** · **[Valeu !!!](${mantra})** · **[Guia](${guia})** · **[Vida](${vida})** | Fecho |

## Limites

- Não é licença para profanar ritos, nomes ou saberes de outrem.  
- Não é ataque a professores nem manual de «como desconstruir o sagrado».  
- Não é tutorial de clonagem ilícita nem curso de programação.  
- *Propaganda* é prima histórica de *propagação* — **outra ficha**, se um dia couber.  
- Grafia *profanar* = verbo âncora; *profanação* = o acto; *professor* / *propagação* / *programação* = vizinhos **cortados**.

## Veredicto

**Aprovado na série Palavras** — *profanar* fichado como **umbral do *fānum*** (fora do templo × violar o sagrado); *professor* por **ofício de declarar**, não por étimo; *propagação* = estaca; *programação* = *grámma* na sala [tecnologia](${tech}); fecho [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tecnologia](${tech}) · [▶ Catálogo](${cat}) · [▶ Script](${script}) · [▶ Faça o seu melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[profanar](${self})** (Lat. *profānāre* ← *pro-* + *fānum*, “outside the temple”). Field request: relate it to **professor**, **propagação**, **profanação**, **programação**, and **[tecnologia](${tech})**. Close: **[do your best](${faca})**.

Four words, **one prefix**, **four roots**. The ear glues *profa-* / *progra-*. The etymon **cuts**.

> Independent audit. **Sheet ≠ licence to desecrate, attack on teachers, coding tutorial, or illicit cloning guide.**

## Object

| Field | Value |
|-------|-------|
| Word | **profanar** / **profanação** |
| Etymon | Lat. *pro-* + *fānum* → *profānus* → PT **profanar** — **high** confidence |
| False friend | **professor** ← *profitērī* (*fatērī*, to declare) — **not** *fānum* |
| Cluster | **propagação** (*pangere*, to fix a cutting) · **programação** (*prógramma*, written notice) |
| Tech link | [tecnologia](${tech}) — *tékhnē* + *lógos*; programming is one room, not the whole lemma |
| Date | ${inspected} |

## Offices (keep apart)

1. **Profanar** — treat as not-sacred; old sense: stand outside the precinct; living sense: violate / cheapen.  
2. **Professor** — one who **professes** (declares in public). Same *pro-*, other root. Good teaching brings knowledge to the threshold **with** [respect](${respeito}); bad teaching **profanes**.  
3. **Propagação** — a plant slip that takes; spreading what is alive. Cousin *propaganda* is **not** this sheet.  
4. **Programação** — write the plan the machine will run. Link: [script](${script}) · catalog **[Tecnologia](${cat})**. [Do your best](${faca}) = clear method, honest trace.

**Verdict:** one prefix is not one tree. Bring it out without trampling. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Tecnologia](${tech}) · [▶ Script](${script}) · [▶ Do your best](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[profanar](${self})** (lat. *profānāre* ← *pro-* + *fānum*, «fuera del templo»). Pedido: relación con **profesor**, **propagação**, **profanação**, **programação** y **[tecnologia](${tech})**. Cierre: **[haz tu mejor](${faca})**.

Cuatro vocablos, **un prefijo**, **cuatro raíces**. El oído pega *profa-* / *progra-*. El étimo **corta**.

> Auditoría independiente. **Ficha ≠ licencia para profanar, ataque a profesores, tutorial de código ni guía de clonación ilícita.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **profanar** / **profanação** |
| Étimo | Lat. *pro-* + *fānum* → *profānus* → PT **profanar** — confianza **alta** |
| Falso amigo | **professor** ← *profitērī* (*fatērī*, declarar) — **no** *fānum* |
| Cluster | **propagação** (*pangere*, estaquilla) · **programação** (*prógramma*, aviso escrito) |
| Vínculo tech | [tecnologia](${tech}) — *tékhnē* + *lógos*; programar es **una** sala, no el lema entero |
| Fecha | ${inspected} |

## Oficios (separar)

1. **Profanar** — tratar como no sagrado; sentido antiguo: estar fuera del recinto; sentido vivo: violar / baratear.  
2. **Professor** — quien **profesa** (declara en público). Mismo *pro-*, otra raíz. Enseñar bien saca el saber al umbral **con** [respeto](${respeito}); enseñar mal **profana**.  
3. **Propagação** — estaquilla que prende; esparcir lo vivo. La prima *propaganda* **no** es esta ficha.  
4. **Programação** — escribir el plan que la máquina cumple. Vínculo: [script](${script}) · catálogo **[Tecnologia](${cat})**. [Haz tu mejor](${faca}) = método claro, rastro honesto.

**Veredicto:** un prefijo no es un árbol. Sacar sin pisar. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Tecnologia](${tech}) · [▶ Script](${script}) · [▶ Haz tu mejor](${faca}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildProfanarPost() {
  const { body, contentEn, contentEs, wiki } = buildProfanarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-profanar', 330);
  return makePalavra({
    title: 'Inspeção: Profanar — umbral do templo; professor, propagação, programação',
    titleEn: 'Inspection: Profanar — temple threshold; professor, propagation, programming',
    titleEs: 'Inspección: Profanar — umbral del templo; profesor, propagación, programación',
    excerpt:
      'Palavras: profanar (lat. pro- + fānum) — fora do templo × violar; professor é outra raiz (profitērī); propagação = estaca; programação = grámma na sala tecnologia; Faça o seu melhor · Valeu !!!',
    excerptEn:
      'Words: profanar (Lat. pro- + fānum) — outside the temple × violate; professor is another root; propagation = cutting; programming = grámma in the technology room; do your best · Valeu !!!',
    excerptEs:
      'Palabras: profanar (lat. pro- + fānum) — fuera del templo × violar; professor es otra raíz; propagação = estaquilla; programação = grámma en la sala tecnología; haz tu mejor · ¡Valeu !!!',
    slug: 'inspecao-palavra-profanar',
    date: '2026-08-24T16:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Profanar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildProfanarPost,
  buildProfanarBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  COVER
};
