'use strict';

/**
 * Inspeção Palavras · Danger
 * Eixos: EN danger ← OF dangier ← VL *dominarium ← lat. dominus
 * (poder do senhor) · cruzar com PT perigo ← lat. periculum (a prova)
 * · método [relação] (pôr no entre, não fundir) · ≠ risco · ≠ medo
 * · placa / sinal · Valeu !!!
 * Pedido de campo: inspeção da palavra Danger cruze com relação de Perigo.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/danger-palavra-cover.jpg';
const WIKT_DANGER = 'https://en.wiktionary.org/wiki/danger';
const WIKT_DOMINUS = 'https://en.wiktionary.org/wiki/dominus#Latin';
const WIKT_PERIGO = 'https://pt.wiktionary.org/wiki/perigo';
const WIKT_PERICULUM = 'https://en.wiktionary.org/wiki/periculum#Latin';
const WIKT_PERIL = 'https://en.wiktionary.org/wiki/peril';
const WIKT_PELIGRO = 'https://es.wiktionary.org/wiki/peligro';
const WIKT_DUNGEON = 'https://en.wiktionary.org/wiki/dungeon';

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
  return `Danger.
Não nasceu do perigo.
Nasceu do senhor.

Dominus.
O poder sobre ti
chamava-se dangier.
Estar no danger de alguém
era estar na mão dele.

Perigo.
Não nasceu do senhor.
Nasceu da prova.
Periculum:
o que se atravessa,
o ensaio que pode falhar.

A placa cola as duas.
DANGER = PERIGO.
A orelha funde.
O étimo corta.

Risco mapeia.
Medo avisa.
Relação põe as duas no entre
sem soldar a raiz.

Valeu !!!
avisar
sem fingir que o poder
e a prova
são a mesma palavra.`;
}

function poemEn() {
  return `Danger.
It was not born from perigo.
It was born from the lord.

Dominus.
Power over you
was called dangier.
To be in someone’s danger
was to be in their hand.

Perigo.
It was not born from the lord.
It was born from the trial.
Periculum:
what you go through,
the test that may fail.

The sign glues both.
DANGER = PERIGO.
The ear fuses.
The etymon cuts.

Risk maps.
Fear warns.
Relation sets both in the between
without welding the root.

Valeu !!!
warn
without pretending that power
and trial
are the same word.`;
}

function poemEs() {
  return `Danger.
No nació del perigo.
Nació del señor.

Dominus.
El poder sobre ti
se llamaba dangier.
Estar en el danger de alguien
era estar en su mano.

Perigo / peligro.
No nació del señor.
Nació de la prueba.
Periculum:
lo que se atraviesa,
el ensayo que puede fallar.

La placa pega las dos.
DANGER = PERIGO.
El oído funde.
El étimo corta.

Riesgo mapea.
Miedo avisa.
Relación pone las dos en el entre
sin soldar la raíz.

¡Valeu !!!
avisar
sin fingir que el poder
y la prueba
son la misma palabra.`;
}

function buildDangerBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-danger.html';
  const perigoHref = self;
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const eminente = '/posts/post-inspecao-palavra-eminente.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const objetosPerigosos = '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[Danger](${self})** — empréstimo inglês da **placa** (OSHA / jogos / ISO) — **cruzada**, pelo método de **[relação](${relacao})**, com a palavra portuguesa **[perigo](${perigoHref})**. Pedido de campo: *inspeção da palavra Danger cruze com relação de Perigo*.

Duas salas, um ofício de aviso. A [orelha cola](${orelha}): DANGER = PERIGO = [risco](${risco}) = [medo](${medo}). O étimo **corta**.

| Forma | Avô | Ofício antigo | Ofício na placa |
|-------|-----|---------------|-----------------|
| **Danger** | lat. [*dominus*](${WIKT_DOMINUS}) «senhor» | o **poder** de alguém sobre ti (*dangier*) | aviso EN |
| **Perigo** | lat. [*periculum*](${WIKT_PERICULUM}) «prova, ensaio» | o que se **atravessa** (família de *experior*) | aviso PT |
| **[Risco](${risco})** | it. *rischio* (debate remoto) | perigo **com mapa** | cálculo |
| **[Medo](${medo})** | lat. *metus* | o peito que antecipa | afecto |

**H-relação:** [relação](${relacao}) = pôr A e B **no entre** sem fundir. *Danger* e *perigo* são **equivalentes de placa**, não cognatos. O francês guarda as **duas** linhagens (*danger* e *péril*); o inglês também (*danger* e *peril*); o português ficou com **perigo** e importa **DANGER** como [sinal](${sinal}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · danger](${WIKT_DANGER}), [*dominus*](${WIKT_DOMINUS}), [Wikcionário · perigo](${WIKT_PERIGO}), [*periculum*](${WIKT_PERICULUM}), [peril](${WIKT_PERIL}), [peligro](${WIKT_PELIGRO}), [dungeon](${WIKT_DUNGEON}). Método: [etimologia](${etimologia}) · [relação](${relacao}). **Ficha ≠ NR-26, ≠ manual de bombeiros, ≠ tabela actuarial, ≠ terapia do medo.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Danger* / *DANGER* / *danger* / *perigoso* / *P de Perigo* / *peril* / *peligro*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Danger** (EN; placa, jargão, jogos) |
| Cruzamento | **perigo** (PT) — objecto irmão de **ofício**, não de **raiz** |
| Método | [relação](${relacao}) — *cruzar* = variação verbal do entre |
| Classe | Danger: substantivo EN (também interjeição de placa) · perigo: substantivo masculino PT |
| Étimo Danger (trabalho) | MÉ *daunger* ← anglo-normando / ant. fr. *dangier* «poder, jurisdição» ← lat. vulg. *dominarium* ← [*dominus*](${WIKT_DOMINUS}) — confiança: **alta** |
| Étimo perigo (trabalho) | lat. [*periculum*](${WIKT_PERICULUM}) «tentativa, risco, perigo» ← *perīrī* / família de *experior* «passar por, ensaiar» — confiança: **alta** |
| Família Danger | *dangerous* · *endanger* · *dungeon* (primo: o *donjon* do senhor) · fr. *danger* |
| Família perigo | *perigoso* · *de perigo* · esp. *peligro* · it. *pericolo* · fr. *péril* · EN *peril* |
| Tipo BudGanja | Palavra — empréstimo de placa × relação com perigo × corte risco/medo |
| Não é | [risco](${risco}) (mapa) · [medo](${medo}) (peito) · [fogo](${fogo}) (elemento) · laudo de segurança |
| Elo método | [relação](${relacao}) · [etimologia](${etimologia}) · [orelha cola…](${orelha}) · [verdade](${verdade}) |
| Elo aviso | [sinal](${sinal}) · [EXIT](${exit}) · [caminho](${caminho}) · [gesto](${gesto}) |
| Elo chão | [cola / colar](${cola}) (caso: linha de pipa — Brasil com **P de Perigo**) · [objectos perigosos](${objetosPerigosos}) |
| Data | ${inspected} |
| Fonte | [danger](${WIKT_DANGER}) · [perigo](${WIKT_PERIGO}) |

**O que é o objecto:** o vocábulo inglês **Danger** como peça da [mensagem](${mensagem}) de aviso — e a **[relação](${relacao})** que o põe ao lado de **perigo** sem soldar as raízes.

## 2. Hipóteses e método

**H1:** *danger* < *dangier* < *dominarium* < *dominus* — primeiro **poder / jurisdição**, depois **ameaça** (alta).  
**H2:** *perigo* < *periculum* — primeiro **prova / ensaio**, depois **ameaça** (alta).  
**H3:** a [relação](${relacao}) pedida é de **ofício** (os dois avisam), não de **genealogia** (os avôs divergem).  
**H4:** [risco](${risco}) é o perigo **com contorno**; [medo](${medo}) é o **peito**; Danger/perigo são a **ameaça nua** na placa.  
**H5:** a [orelha cola](${orelha}) as quatro; o lab **corta** as salas.  
**H6:** o caso de chão **Brasil com P de Perigo** (linha de pipa) vive na ficha [cola / colar](${cola}) — aqui o objecto é o **vocábulo**, não o cerol.

Passos: (1) fixar Danger; (2) cruzar perigo pelo método [relação](${relacao}); (3) cortar risco e medo; (4) rede de [sinal](${sinal}); (5) limites.

## 3. Danger — o senhor

O inglês *danger* não começa em «ameaça». Começa em **mão**.

No francês antigo, *dangier* / *danger* é **poder, autoridade, jurisdição** — o direito do [senhor](${WIKT_DOMINUS}) (*dominus*) sobre quem está *en son danger*, «no danger dele»: na alçada, na mão, no foro. Quem está no *danger* de alguém **depende** desse alguém. O dano vem depois, como sombra do poder.

| Época / eixo | O que a palavra carrega | Nota |
|--------------|-------------------------|------|
| Lat. *dominus* | Senhor, dono da casa | Avô de *domínio*, *dominar*, *don*, *domingo* (*dies dominica*) |
| Lat. vulg. *dominarium* | Poder do senhor | Hipótese de trabalho do *dangier* |
| Ant. fr. *dangier* | Jurisdição, poder, recusa | «Estar no danger de» = estar sob o poder |
| MÉ *daunger* | Poder; depois dificuldade e ameaça | Deslizamento: a alçada **pode magoar** |
| EN moderno *danger* | Perigo, ameaça de dano | O poder saiu de cena; ficou o dano |
| Placa OSHA / jogos | **DANGER** em barra vermelha | [Sinal](${sinal}) internacional; empréstimo visual no BR |

**Primo de corredor:** [*dungeon*](${WIKT_DUNGEON}) (o *donjon*, a torre do senhor) anda na mesma família de *dominus*. A masmorra é o **sítio** do poder; *danger* foi o **nome** desse poder. Não fundir masmorra com placa — são primos, não sinónimos.

**H-deslizamento:** o sentido moderno («ameaça») é **metonímia histórica**: o poder do senhor *era* o perigo. A palavra ficou com o efeito e esqueceu o senhor. A [etimologia](${etimologia}) devolve o senhor à ficha, sem repor feudalismo no laboratório.

## 4. Perigo — a prova

O português **perigo** não deve nada a *dominus*. Deve a **passar por**.

Latim [*periculum*](${WIKT_PERICULUM}): tentativa, ensaio, risco, perigo. Família de *experior* / *perītus* — **experiência**, *experimento*, *empirical*, *perito*. O perigo antigo é a **prova que se atravessa**: o que pode falhar *enquanto se tenta*. Daí esp. [*peligro*](${WIKT_PELIGRO}), it. *pericolo*, fr. *péril*, EN [*peril*](${WIKT_PERIL}).

| Linhagem *periculum* | Forma | Papel |
|----------------------|-------|-------|
| PT | **perigo** · *perigoso* | Aviso nativo |
| ES | **peligro** | Cognato verdadeiro de *perigo* |
| IT | *pericolo* | Cognato |
| FR | *péril* | Cognato — **ao lado** de *danger* |
| EN | *peril* | Cognato — **ao lado** de *danger* |
| Lat. | *periculum* | Avô da prova |

O francês e o inglês **não escolheram**: ficaram com as **duas** palavras. O português escolheu *perigo* para o aviso nativo e deixa **DANGER** entrar pela [placa](${sinal}), pelo jogo, pelo ISO.

**H-prova:** *perigo* nomeia o que **já está no caminho** (lat. *periculum*). [Risco](${risco}) insiste no **cálculo**. [Medo](${medo}) insiste no **peito**. Três ofícios; um sopro na rua.

## 5. Relação — cruzar sem fundir

Pedido de campo: *cruzar com [relação](${relacao}) de Perigo*. O verbo **cruzar** mora na ficha [relação](${relacao}): pôr A e B no entre. Não abre lema próprio. Não solda raízes.

| Peça | Papel nesta ficha |
|------|-------------------|
| **[relação](${relacao})** | O **nome** do entre — vínculo, relato, proporção |
| **cruzar** | O **verbo** — pôr Danger e perigo lado a lado |
| **Danger** | Peça EN da placa — avô *dominus* |
| **perigo** | Peça PT do aviso — avô *periculum* |
| **equivalência** | Mesmo ofício na [mensagem](${mensagem}) de aviso |
| **não-cognato** | Avôs distintos — [etimologia](${etimologia}) corta a cola |

**Como ler o cruzamento**

1. Entrar por **Danger** (esta âncora).  
2. Cruzar **perigo** — mesmo ofício, outra raiz.  
3. Não fundir com [risco](${risco}) (mapa) nem com [medo](${medo}) (peito).  
4. Se a orelha colar as quatro, voltar à tabela do escopo.  
5. Se o chão for linha de pipa, ir a [cola / colar](${cola}) — **P de Perigo** é carimbo de caso, não étimo desta ficha.  
6. Fechar com [respeito](${respeito}) ao aviso e [Valeu !!!](${mantra}).

**Anti-armadilha:** traduzir *danger* por *risco* apaga o cálculo. Outra: tratar *Danger* como étimo de *perigo*. Outra: achar que a placa EN «é mais verdadeira» do que a palavra PT — são **duas linhagens**, um ofício.

## 6. Quatro salas — o que a orelha cola

| Sala | Palavra | Ofício | Corte |
|------|---------|--------|-------|
| **Poder** | Danger | Aviso EN; avô senhor | ≠ perigo (raiz) |
| **Prova** | perigo | Aviso PT; avô ensaio | ≠ risco (mapa) |
| **Mapa** | [risco](${risco}) | Perigo **com contorno** | ≠ medo (peito) |
| **Peito** | [medo](${medo}) | Afecto que antecipa | ≠ a coisa na rua |
| **Marca** | [sinal](${sinal}) | A placa, o pictograma, o «DANGER» vermelho | O suporte, não o étimo |
| **Saída** | [EXIT](${exit}) | Quando o aviso pede sair | Não apaga o perigo; nomeia a porta |
| **Par ilusório** | [eminente](${eminente}) / iminente | A orelha cola; *iminente* é o que **paira** | Perigo iminente ≠ pessoa eminente |

**Brasil com P de Perigo:** o carimbo da ficha [cola / colar](${cola}) — linha de pipa com cerol. Aqui o P **cita** perigo; não substitui esta ficha. O objecto perigoso daquela rua é o **fio**, não o papel no céu.

**Objectos da tenda:** o mapa perigo × corte × nome vive em [objectos perigosos para controle de incêndio](${objetosPerigosos}). Danger/perigo **nomeiam**; a fonte e o extintor **são** coisas.

## 7. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Dizer *Danger* quando a placa está em inglês; *perigo* quando o aviso é português |
| Bom | Cruzar as duas pela [relação](${relacao}) e declarar os avôs |
| Bom | Reservar [risco](${risco}) para o mapa; [medo](${medo}) para o peito |
| Mau | Fundir Danger = perigo = risco = medo num só sopro |
| Mau | Inventar que *perigo* vem de *danger* (calco falso) |
| Mau | Tratar a ficha como NR, laudo ou receita de cerol |

## 8. Poema do laboratório

\`\`\`poem
${poemPt()}
\`\`\`

## 9. Avaliação BudGanja

### Forças
- Separa **poder** (*dominus*) de **prova** (*periculum*) — a [relação](${relacao}) pede o entre, não a solda.  
- Devolve ao inglês o primo *peril* e ao francês o par *danger* / *péril*.  
- Corta [risco](${risco}) e [medo](${medo}) sem apagar o aviso.  
- Liga o chão ([cola / colar](${cola}), [sinal](${sinal})) sem virar manual.

### Limites
- Não é norma regulamentadora, laudo eléctrico nem protocolo clínico.  
- O deslizamento semântico de *dangier* (poder → ameaça) resume-se; filologia fina fica nos dicionários citados.  
- Casos graves (violência, incêndio, linha cortante na via) pedem autoridade e cuidado especializados — fora do escopo da palavra.

## 10. Como repetir o método

1. Fixar a forma âncora (aqui: **Danger**).  
2. Cruzar o equivalente de ofício (**perigo**) pela ficha [relação](${relacao}) — sem fundir raízes.  
3. Tabela de salas (aviso × mapa × peito × marca).  
4. Um caso de chão ([cola / colar](${cola})) como **exemplo**, não como étimo.  
5. Status + [Valeu !!!](${mantra}).

## Status

**Aprovado** — **Danger** fichado: étimo *dominus* (poder do senhor); cruzamento com **perigo** (*periculum*, a prova) pelo método [relação](${relacao}); cortes [risco](${risco}) · [medo](${medo}) · [sinal](${sinal}); caso de chão [cola / colar](${cola}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Relação](${relacao}) · [▶ Risco](${risco}) · [▶ Medo](${medo}) · [▶ Sinal](${sinal}) · [▶ Valeu !!!](${mantra}) · [▶ Hub](${hubAll}) · [▶ Guia](${guia})
`;

  const contentEn = `## Scope

Editorial inspection of the word **[Danger](${self})** — English loan of the **sign** (OSHA / games / ISO) — **crossed**, by the method of **[relação](${relacao})** (“relation”), with Portuguese **perigo**. Field request: inspect *Danger* and cross it with the *relation* of *Perigo*.

Two rooms, one warning job. The [ear glues](${orelha}): DANGER = PERIGO = [risco](${risco}) = [medo](${medo}). The etymon **cuts**.

| Form | Ancestor | Old office | Office on the sign |
|------|----------|------------|-------------------|
| **Danger** | Lat. [*dominus*](${WIKT_DOMINUS}) “lord” | **power** over you (*dangier*) | EN warning |
| **Perigo** | Lat. [*periculum*](${WIKT_PERICULUM}) “trial, test” | what you **go through** (*experior*) | PT warning |
| **[Risco](${risco})** | It. *rischio* (remote debate) | danger **with a map** | calculation |
| **[Medo](${medo})** | Lat. *metus* | the chest that anticipates | affect |

**H-relation:** [relação](${relacao}) = set A and B **in the between** without fusing. *Danger* and *perigo* are **sign equivalents**, not cognates. French keeps **both** lines (*danger* and *péril*); English too (*danger* and *peril*); Portuguese kept **perigo** and imports **DANGER** as a [sign](${sinal}).

> Method note: [danger](${WIKT_DANGER}), [*dominus*](${WIKT_DOMINUS}), [perigo](${WIKT_PERIGO}), [*periculum*](${WIKT_PERICULUM}), [peril](${WIKT_PERIL}), [peligro](${WIKT_PELIGRO}). **Sheet ≠ safety code, ≠ fire manual, ≠ actuarial table.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **Danger** (EN sign / jargon / games) |
| Cross | **perigo** (PT) — sibling of **office**, not of **root** |
| Method | [relação](${relacao}) — *cruzar* (“to cross”) = the verb of the between |
| Danger etymon | ME *daunger* ← OF *dangier* “power, jurisdiction” ← VL *dominarium* ← *dominus* — **high** |
| Perigo etymon | Lat. *periculum* ← *experior* family “to go through, to try” — **high** |
| Not | [risco](${risco}) (map) · [medo](${medo}) (chest) · safety report |
| Date | ${inspected} |

## Danger — the lord

Old French *dangier* is **power, authority, jurisdiction** — the lord’s (*dominus*) hold over whoever is *en son danger*, “in his danger”: in his reach, in his court. Harm arrives later, as the shadow of power. Modern *danger* kept the harm and forgot the lord. Cousin: [*dungeon*](${WIKT_DUNGEON}) (*donjon*, the lord’s tower).

## Perigo — the trial

Portuguese **perigo** owes nothing to *dominus*. It owes **going through**. Latin *periculum*: attempt, test, risk, danger. Family of *experior* — experience, experiment, expert. True cognates: ES [*peligro*](${WIKT_PELIGRO}), IT *pericolo*, FR *péril*, EN [*peril*](${WIKT_PERIL}).

## Relation — cross without fusing

| Piece | Role |
|-------|------|
| **[relação](${relacao})** | The **name** of the between |
| **cruzar** | The **verb** — set Danger beside perigo |
| **equivalence** | Same warning job |
| **not cognate** | Distinct grandfathers |

**Anti-trap:** translating *danger* as *risco* erases the map. Another: claiming *perigo* comes from *danger*. Another: treating the EN sign as “more true” than the PT word.

## Four rooms

| Room | Word | Office |
|------|------|--------|
| Power | Danger | EN warning; lord-root |
| Trial | perigo | PT warning; test-root |
| Map | [risco](${risco}) | Contoured danger |
| Chest | [medo](${medo}) | Affect |
| Mark | [sinal](${sinal}) | The red DANGER bar / pictogram |

Street case **Brazil with P for Perigo** (cerol kite line) lives on [cola / colar](${cola}) — a stamp, not this etymon.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *Danger*: etymon *dominus* (the lord’s power). Crossed with **perigo** (*periculum*, the trial) by [relação](${relacao}). Cuts: [risco](${risco}) · [medo](${medo}) · [sinal](${sinal}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de la palabra **[Danger](${self})** — préstamo inglés de la **placa** — **cruzada**, por el método de **[relação](${relacao})**, con el portugués **perigo** (esp. **peligro**). Pedido de campo: inspeccionar *Danger* y cruzarlo con la *relación* de *Perigo*.

Dos salas, un oficio de aviso. El [oído pega](${orelha}): DANGER = PERIGO = [risco](${risco}) = [medo](${medo}). El étimo **corta**.

| Forma | Abuelo | Oficio antiguo | Oficio en la placa |
|-------|--------|----------------|--------------------|
| **Danger** | lat. [*dominus*](${WIKT_DOMINUS}) «señor» | el **poder** sobre ti | aviso EN |
| **Perigo / peligro** | lat. [*periculum*](${WIKT_PERICULUM}) «prueba» | lo que se **atraviesa** | aviso PT / ES |
| **[Risco](${risco})** | it. *rischio* | peligro **con mapa** | cálculo |
| **[Medo](${medo})** | lat. *metus* | el pecho que anticipa | afecto |

**H-relación:** [relação](${relacao}) = poner A y B **en el entre** sin fundir. *Danger* y *perigo* son **equivalentes de placa**, no cognados. El francés guarda **ambas** líneas (*danger* y *péril*); el inglés también (*danger* y *peril*); el portugués se quedó con **perigo** y importa **DANGER** como [señal](${sinal}). El español *peligro* **sí** es cognado de *perigo* — ambos *periculum*, no *dominus*.

> Nota: [danger](${WIKT_DANGER}), [perigo](${WIKT_PERIGO}), [peligro](${WIKT_PELIGRO}), [*periculum*](${WIKT_PERICULUM}). **Ficha ≠ norma de seguridad.** Cierre: [¡Valeu !!!](${mantra}).

## Danger — el señor

El francés antiguo *dangier* es **poder, jurisdicción** — la mano del señor (*dominus*). El daño llega después. El *danger* moderno se quedó con el daño y olvidó al señor. Primo: [*dungeon*](${WIKT_DUNGEON}) (el *donjon*).

## Perigo / peligro — la prueba

**Perigo** (PT) y **peligro** (ES) no deben nada a *dominus*. Deben a **pasar por**. Latín *periculum*: ensayo, riesgo, peligro. Familia de *experior* — experiencia, experimento, perito.

## Relación — cruzar sin fundir

Poner Danger al lado de perigo / peligro: mismo oficio de aviso, abuelos distintos. [Risco](${risco}) mapea; [medo](${medo}) avisa el pecho; [sinal](${sinal}) es la marca. El caso de calle **Brasil con P de Perigo** (línea de cometa con cerol) vive en [cola / colar](${cola}).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *Danger*: étimo *dominus* (poder del señor). Cruce con **perigo** (*periculum*, la prueba) por [relação](${relacao}). Cortes: [risco](${risco}) · [medo](${medo}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn: contentEn, contentEs: contentEs };
}

function buildDangerPost() {
  const { body, contentEn, contentEs } = buildDangerBodies();
  const seriesOrder = pickOrder('inspecao-palavra-danger', 291);
  return makePalavra({
    title:
      'Inspeção: Danger — *dominus* (poder do senhor); cruzar com perigo (*periculum*); relação sem fundir; Valeu !!!',
    titleEn:
      'Inspection: Danger — *dominus* (the lord’s power); cross with perigo (*periculum*); relation without fusing; Valeu !!!',
    titleEs:
      'Inspección: Danger — *dominus* (poder del señor); cruzar con perigo (*periculum*); relación sin fundir; ¡Valeu !!!',
    excerpt:
      'Palavras: Danger (EN, *dominus*) × perigo (PT, *periculum*) — equivalentes de placa, não cognatos; método relação; ≠ risco ≠ medo; Valeu !!!',
    excerptEn:
      'Words: Danger (EN, *dominus*) × perigo (PT, *periculum*) — sign equivalents, not cognates; relation method; ≠ risk ≠ fear; Valeu !!!',
    excerptEs:
      'Palabras: Danger (EN, *dominus*) × perigo (PT, *periculum*) — equivalentes de placa, no cognados; método relación; ≠ riesgo ≠ miedo; ¡Valeu !!!',
    slug: 'inspecao-palavra-danger',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Danger · palavra',
    filename: 'posts/post-inspecao-palavra-danger.html',
    url: '/posts/post-inspecao-palavra-danger.html',
    coverImage: COVER,
    sourceUrl: WIKT_DANGER,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDangerPost,
  buildDangerBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_DANGER,
  WIKT_PERIGO
};
