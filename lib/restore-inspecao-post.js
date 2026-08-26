'use strict';

/**
 * Inspeção Palavras · restore × back × backup × up
 * Pedido de campo: «Inspeçao em Restoure Back, Backup , Up»
 *
 * Quatro salas, um circuito:
 *   up      — germ. *upp / OE up «para cima; completar; estar no ar»
 *   back    — germ. *bakam / OE bæc «costas; trás; regresso»
 *   backup  — composto back + up «apoiar por trás» → cópia de reserva
 *   restore — lat. restaurāre «pôr de pé de novo» (via OF restorer)
 * Cruzamento de ofício, não de sangue. Lapso Restoure = Restore.
 * Tautologia restore back cortada. Restaurante = outra sala da mesma árvore latina.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/restore-palavra-cover.jpg';
const WIKT_RESTORE = 'https://en.wiktionary.org/wiki/restore';
const WIKT_RESTAURARE = 'https://en.wiktionary.org/wiki/restauro#Latin';
const WIKT_RESTAURAR = 'https://pt.wiktionary.org/wiki/restaurar';
const WIKT_BACK = 'https://en.wiktionary.org/wiki/back#English';
const WIKT_BACKUP = 'https://en.wiktionary.org/wiki/backup';
const WIKT_UP = 'https://en.wiktionary.org/wiki/up#English';
const WIKI_BACKUP = 'https://en.wikipedia.org/wiki/Backup';

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
  return `Restore.
Não é o Restoure da boca.
Não é o restaurante.
É pôr de pé de novo.

Up é o vector.
Back é o regresso.
Backup é as duas peças
a segurar por trás.

Quem restaura sem cópia
pede milagre.
Quem copia e nunca testa
segura papel.

Restore back
diz duas vezes
a mesma porta.

Valeu !!!
a cópia no sítio
e o gesto de voltar.`;
}

function poemEn() {
  return `Restore.
It is not the mouth’s Restoure.
It is not the restaurant.
It is to set back on its feet.

Up is the vector.
Back is the return.
Backup is both pieces
holding from behind.

Whoever restores without a copy
asks for a miracle.
Whoever copies and never tests
holds paper.

Restore back
says twice
the same door.

Valeu !!!
the copy in place
and the gesture of return.`;
}

function poemEs() {
  return `Restore.
No es el Restoure de la boca.
No es el restaurante.
Es poner de pie otra vez.

Up es el vector.
Back es el regreso.
Backup son las dos piezas
sosteniendo por detrás.

Quien restaura sin copia
pide milagro.
Quien copia y nunca prueba
sostiene papel.

Restore back
dice dos veces
la misma puerta.

¡Valeu !!!
la copia en su sitio
y el gesto de volver.`;
}

function buildRestoreBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-restore.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const saveGame = '/posts/post-inspecao-palavra-save-game.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const ando = '/posts/post-inspecao-expressao-ando-indo-vindo-voltando.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';
  const risco = '/posts/post-inspecao-palavra-risco.html';

  const body = `## Escopo

Inspeção editorial da família **[restore](${self}) · back · backup · up** — pedido de campo: *Inspeçao em Restoure Back, Backup , Up*.

Quatro salas, um circuito. **Up** é o vector germânico (para cima / completar / estar no ar). **Back** é o regresso e as costas. **Backup** é o composto *back* + *up*: apoiar por trás, depois a **cópia de reserva**. **Restore** é a árvore latina *restaurāre*: pôr de pé de novo. A [orelha](${orelha}) cola as quatro porque todas apontam para «voltar / guardar / levantar». O étimo **corta**: germânico × germânico × composto × latim. O lapso **Restoure** é a boca a escrever Restore (como *Longin* para Login). A tautologia **restore back** diz duas vezes a mesma porta. [Backspace](${backspace}) é **outra ficha** (tecla que apaga). Restaurante é **outra sala** da mesma árvore latina. Objecto = o **circuito de ofício**. Não é tutorial de disaster recovery. Não é receita de apagar rasto alheio.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · restore](${WIKT_RESTORE}), [restaurāre](${WIKT_RESTAURARE}), [restaurar](${WIKT_RESTAURAR}), [back](${WIKT_BACK}), [backup](${WIKT_BACKUP}), [up](${WIKT_UP}), [Backup (EN)](${WIKI_BACKUP}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ manual de cópia, ≠ runbook de servidor, ≠ licença para overwrite silencioso.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *restore* / *Restoure* / *restaurar* / *back* / *backup* / *back up* / *up* / *upar* / *cópia de segurança* / *restore back*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **restore** · **back** · **backup** · **up** |
| Lapso de campo | **Restoure** — boca de *restore* (e eco de PT *restauro*) |
| Classes | Quatro vocábulos EN vivos no ecrã BR; calcos *restaurar* / *backup* / *upar* |
| Étimo up | Germ. *upp* / OE *up* — confiança **alta** |
| Étimo back | Germ. *bakam* / OE *bæc* «costas» — confiança **alta** |
| Étimo backup | Composto *back* + *up* «apoiar por trás» → reserva / cópia — confiança **alta** no composto; **média-alta** no sentido informático (séc. XX) |
| Étimo restore | Lat. *restaurāre* «reconstruir, reparar» via OF *restorer* — confiança **alta** |
| Tipo BudGanja | Palavras — circuito de regresso × reserva × reerguer |
| Não é | Tutorial de backup · runbook · ficha de restaurante · walkthrough de *upar* |
| Data | ${inspected} |
| Fonte | [restore](${WIKT_RESTORE}) · [backup](${WIKT_BACKUP}) · [up](${WIKT_UP}) |

**O que é o objecto:** o **circuito** pelo qual o ofício **sobe** (*up*), **regressa** (*back*), **guarda uma reserva por trás** (*backup*) e **põe de pé de novo** (*restore*). Não é um único vocábulo. Não é milagre. Não é apagar o [passado](${passado}).

## 2. Quatro salas — o cruzamento

Pedido de campo: *Restoure* × *Back* × *Backup* × *Up*. O lab **cruza** e **não funde**.

| Sala | Peça | Origem | Ofício nesta ficha |
|------|------|--------|---------------------|
| **Up** | *upp* | Germânico — para cima / completar / no ar | O **vector** |
| **Back** | *bæc* | Germânico — costas, trás, regresso | O **retorno** |
| **Backup** | *back* + *up* | Composto EN — apoiar por trás | A **reserva** (cópia) |
| **Restore** | *restaurāre* | Latim — pôr de pé de novo | O **gesto de reerguer** |
| **Lapso cortado** | *Restoure* | Boca + eco de *restauro* | Grafia de campo — **não** lema |
| **Tautologia cortada** | *restore back* | Calco redundante | Restore **já** traz o regresso |
| **Sala cortada** | restaurante | A mesma *restaurāre* | Sítio que «restaura» o corpo — **outro ofício** |
| **Ficha irmã** | [backspace](${backspace}) | *back* + *space* | Tecla que apaga — **não** a cópia |

**H-cruzamento:** as quatro encontram-se no campo «não perder o rasto / voltar / levantar». **Não** são a mesma raiz. A [relação](${relacao}) é de ofício, não de genealogia.  
**H-orelha:** a boca BR cola *restore back*, *fazer backup*, *o servidor está up*, *upar o save*. A cola é útil; o étimo **mantém quatro salas**.  
**H-circuito:** *up* sem *back* é só subida. *Back* sem *backup* é regresso sem reserva. *Backup* sem *restore* é papel. *Restore* sem *backup* é milagre.

## 3. *up* — o vector (germânico)

O [Wiktionary](${WIKT_UP}) fecha o étimo: OE *up* / *upp*, germânico *upp* — movimento para um sítio mais alto; por extensão, completar (*eat up*), estar em serviço (*the server is up*), publicar (*upload*).

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **up** (adv./prep.) | OE *up* → EN *up* | Alta |
| **up** (servidor) | No ar, a responder | Alta no uso de oficina |
| **upload / update** | Compostos com *up* | Alta; fichas outras se pedidas |
| **upar** (BR) | Calco de *level up* / *upload* | Alta como gíria; **outra sala** nesta ficha |
| **time's up** | O [tempo](${tempo}) esgotou | Alta — completar, não copiar |

**H-upar:** *upar* no jogo é subir de nível. **Não** é restaurar. **Não** é backup. O lab honra a gíria e **corta** a fusão com o circuito de cópia.  
**H-up-servidor:** *está up* = está no ar. Antónimo de oficina: *down*. Não é *backup*.

## 4. *back* — o regresso (germânico)

*Back* é o corpo primeiro: OE *bæc*, as **costas**. Daí o lugar de trás, o movimento de regresso, o apoio (*I've got your back*). A [orelha](${orelha}) cola *back* em *voltar*. O nativo PT já tinha [voltar](${ando}) e as costas.

| Uso | Ofício | Sala |
|-----|--------|------|
| **go back** | Regressar | Esta ficha — o retorno |
| **the back** | As costas / a traseira | Corpo — origem da metáfora |
| **I've got your back** | Apoio por trás | Ponte para *backup* |
| **back button** | Porta de regresso no ecrã | Ofício de navegação |
| **[backspace](${backspace})** | Tecla que apaga o carácter de trás | **Outra ficha** |
| **back up** (verbo, duas palavras) | Recuar o carro / apoiar / copiar | Verbo do composto |

**H-corpo:** o regresso inglês nasce das **costas**, não do latim *restaurāre*. Por isso *restore* e *back* **colam** no ecrã e **não** partilham sangue.  
**H-backspace:** apagar o rascunho **não** é guardar a reserva. A tecla irmã tem ficha própria.

## 5. *backup* — a reserva (*back* + *up*)

*Backup* (substantivo) e *back up* (verbo) são o composto: apoiar **por trás** até ficar **de pé**. No séc. XX a informática toma a peça: **cópia de segurança** — o sítio de onde se pode [restaurar](${WIKT_RESTAURAR}). PT vivo: *backup* (loan) / *cópia de segurança* / *reserva*.

| Peça | O que é | O que não é |
|------|---------|-------------|
| **backup** (nome) | A reserva — cópia por trás | O [Save Game](${saveGame}) do slot (irmão de ofício, ficha outra) |
| **back up** (verbo) | Copiar / apoiar / recuar o carro | Trânsito engarrafado como lema desta ficha |
| **cópia de segurança** | Irmã PT | Tutorial desta ficha |
| **backup não testado** | Papel | Ofício — a reserva **só vale se restore funcionar** |
| **[commitar](${commitar})** | Snapshot no git | Outro verb — rasto, não necessariamente restore |
| **[upsert](${upsert}) / opsert** | Inserir ou levantar pela chave | Persistência viva — **não** é a cópia morta |

**H-teste:** backup sem restore ensaiado é amuleto. O ofício **prova** a porta de volta.  
**H-save:** [Save Game](${saveGame}) grava o rasto da partida. Backup grava a **reserva** do ofício. Irmãos de mesa; não fundir as palavras.  
**H-tráfico:** *traffic backup* e *back up the car* são salas do mesmo composto. Nesta ficha o lema de oficina é a **cópia**.

## 6. *restore* — pôr de pé (latim) · lapso *Restoure*

*Restore* chega ao inglês pelo francês antigo *restorer*, do latim *restaurāre*: reconstruir, reparar, **pôr de pé de novo** (*re-* + a família de *instaurāre*). PT **restaurar** / **restauro** / **restauração**. Pedido de campo escreveu **Restoure** — a boca abre o *o* e cola o *restauro* português. Como *Longin* em [Login](${login}): o lab **lê o lema** e **ficha o lapso**.

| Peça | Traçado | Sala |
|------|---------|------|
| **restore** | Lat. *restaurāre* → OF → EN | Gesto de reerguer |
| **restaurar** | PT da mesma árvore | Irmã nativa |
| **Restoure** | Lapso de campo | Não é lema |
| **restore back** | Tautologia EN/BR | Restore **já** contém o regresso |
| **restaurante** | Fr. *restaurant* «o que restaura» (o corpo) | **Outra sala** — mesma árvore, ofício da mesa |
| **restauro** (arte) | Conservar a obra | Irmã de ofício; **não** é backup informático |

**H-tautologia:** *restore back* é dizer *voltar* duas vezes. O lab corta. Restore **basta**. Back entra como **sala germânica**, não como muleta do verbo latino.  
**H-restaurante:** a mesma *restaurāre* alimenta o sítio que restaura o comensal. Grafia próxima; ofício outro. Cortar.  
**H-milagre:** restaurar **sem** backup é pedir ao ar o que não se guardou. O [gesto](${gesto}) honesto é: copiar → testar → restaurar.

## 7. Informática — o circuito

Pedido eco: as quatro no ecrã. O lab mapeia o ofício onde o código vive.

| Evento | Palavra | Leitura lab |
|--------|---------|-------------|
| O serviço responde | **up** | Vector — no ar |
| O botão de regresso | **back** | Porta — não apaga |
| Guardar a reserva | **backup** | Cópia por trás |
| Reerguer a partir da reserva | **restore** | Pôr de pé de novo |
| Gravar a partida | **[Save Game](${saveGame})** | Rasto do jogo — ficha irmã |
| Snapshot git | **[commitar](${commitar})** | Rasto de código — outro verb |
| Inserir ou levantar | **[upsert](${upsert})** | Persistência viva |
| Apagar o carácter | **[backspace](${backspace})** | Corrigir — não restaurar |
| Sair | **[exit](${exit})** | Porta para fora |

**H-ordem:** o circuito são **up** (o sítio vive) → **backup** (a reserva) → (queda) → **restore** (reerguer) → de novo **up**. *Back* é o nome germânico do regresso que o latim chama *restore*.  
**H-padrão:** nomear a sala **antes** de misturar os botões. Restore não é backup. Backup não é save. Back não é backspace.

## 8. Hipóteses

**H1:** EN *up* < OE *up* / germ. *upp* — alta.  
**H2:** EN *back* < OE *bæc* «costas» — alta.  
**H3:** *backup* é composto *back* + *up* (apoiar por trás → reserva) — alta.  
**H4:** o sentido informático de *backup* é especialização do séc. XX — alta como uso; média na data exacta da primeira ficha técnica.  
**H5:** EN *restore* < OF *restorer* < lat. *restaurāre* — alta.  
**H6:** PT *restaurar* é a irmã nativa, não um calco recente de *restore* — alta.  
**H7:** *Restoure* é lapso de campo (Restore × restauro), não lema — alta.  
**H8:** *restore back* é tautologia — alta.  
**H9:** restaurante partilha árvore e **não** partilha ofício — alta.  
**H10:** *upar* (jogo) é outra sala de *up* — alta.  
**H11:** o cruzamento das quatro é de **uso** no ecrã BR, não de sangue — alta.  
**H12:** backup sem restore testado é [risco](${risco}) disfarçado de cuidado — alta como leitura de ofício.

## 9. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | restore = back = backup = up | Vector × retorno × reserva × reerguer |
| **Restoure** | Lema novo | Lapso de *restore* |
| **Restore back** | Precisão | Tautologia — a porta dita duas vezes |
| **Backup** | O save do jogo | Reserva do ofício; [Save Game](${saveGame}) é outra ficha |
| **Restaurante** | Prima de restore | Mesma árvore, mesa outra |
| **Upar** | Restore de personagem | *Level up* — outra sala |
| **Backspace** | O back desta ficha | Tecla que apaga — [ficha irmã](${backspace}) |
| **Restore sem cópia** | Confiança | Milagre pedido ao ar |

## 10. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *up* como vector germânico — subir / completar / no ar |
| Bom | Nomear *back* como costas → regresso, sem fundir com *restaurāre* |
| Bom | Nomear *backup* como composto — a reserva **por trás** |
| Bom | Nomear *restore* como latim — pôr de pé de novo |
| Bom | Fichar *Restoure* como lapso, não como palavra nova |
| Bom | Cortar *restore back*; testar o restore da cópia |
| Bom | Separar restaurante, *upar*, [backspace](${backspace}) e [Save Game](${saveGame}) |
| Mau | Tutorial de disaster recovery ou receita de overwrite alheio |
| Mau | Tratar backup não testado como seguro |
| Mau | Fundir restore, save, commitar e upsert num único botão |
| Mau | Apagar o [passado](${passado}) e chamar a isso restore |

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=restore)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Backspace](${backspace}) | Apagar o rascunho — não guardar a reserva |
| [Save Game](${saveGame}) | Gravar a partida — irmão de rasto |
| [Commitar](${commitar}) | Snapshot git — outro verb |
| [Upsert](${upsert}) | Persistência viva (opsert) — não é a cópia morta |
| [Login](${login}) | Porta de entrada (lapso *Longin*, irmão de *Restoure*) |
| [Exit](${exit}) | Sair do aperto |
| [Passado](${passado}) | O tempo decorrido — restore não o apaga |
| [Ando, indo, vindo, voltando](${ando}) | O loop nativo de voltar |
| [Caminho](${caminho}) · [tempo](${tempo}) | A via e o relógio do regresso |
| [Verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) | Ofício — copiar, testar, reerguer |
| [Etimologia](${etimologia}) · [relação](${relacao}) · [orelha cola](${orelha}) | Étimo × cola × quatro salas |
| [Língua portuguesa](${lingua}) | Solo de *restaurar*, *voltar*, *cópia* e dos loans |
| [Vida](${vida}) | O peito que quer a porta de volta |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é manual de cópia, runbook de servidor nem receita de recuperação.  
- Não ensina a restaurar sistema alheio nem a apagar rasto.  
- Não é ficha de restaurante, de restauro de arte ou de *upar* no jogo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **restore** fichado como lat. *restaurāre* (pôr de pé de novo); cruzado com **back** (germ. *bæc*), **backup** (*back*+*up*, a reserva) e **up** (germ. *upp*, o vector). Quatro salas, um circuito. Lapso *Restoure* lido. Tautologia *restore back* cortada. Restaurante e *upar* noutras salas. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Backspace](${backspace}) · [▶ Save Game](${saveGame}) · [▶ Commitar](${commitar}) · [▶ Poema Vida](/vida/#poema=restore) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Inspection of the family **restore · back · backup · up**. Field request: *Restoure Back, Backup, Up*.

Four rooms, one circuit. **Up** is the Germanic vector (upward / complete / online). **Back** is the return and the spine. **Backup** is the compound *back* + *up*: support from behind, then the spare copy. **Restore** is Latin *restaurāre*: set back on its feet. The [ear](${orelha}) glues them; the etymon **cuts**. Slip **Restoure** = Restore (like *Longin* for Login). Tautology **restore back** cut. Restaurant = same Latin tree, other office. Not a disaster-recovery tutorial.

> Sources: [restore](${WIKT_RESTORE}), [restaurāre](${WIKT_RESTAURARE}), [restaurar](${WIKT_RESTAURAR}), [back](${WIKT_BACK}), [backup](${WIKT_BACKUP}), [up](${WIKT_UP}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Four lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Up** | *upp* | Germanic — upward / complete / online | The **vector** |
| **Back** | *bæc* | Germanic — the back, the return | The **return** |
| **Backup** | *back* + *up* | Compound — hold from behind | The **spare** |
| **Restore** | *restaurāre* | Latin — set on its feet again | The **re-standing** |
| **Cut slip** | *Restoure* | Mouth × PT *restauro* | Not the lemma |
| **Cut tautology** | *restore back* | Redundant calque | Restore **already** returns |

Backup without a tested restore is a paper shield. Restore without a backup asks the air for a miracle. *Upar* (level up) is another room of *up*. [Backspace](${backspace}) erases; it does not keep the spare. [Save Game](${saveGame}) records the match — a sister trail, another sheet.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *restore* < *restaurāre*. Crossed with *back*, *backup* and *up*. Four rooms. Slip *Restoure* read. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la familia **restore · back · backup · up**. Pedido: *Restoure Back, Backup, Up*.

Cuatro salas, un circuito. **Up** es el vector germánico (arriba / completar / en el aire). **Back** es el regreso y la espalda. **Backup** es el compuesto *back* + *up*: sostener por detrás, luego la copia de reserva. **Restore** es latín *restaurāre*: poner de pie otra vez. El [oído](${orelha}) pega; el étimo **corta**. Lapsus **Restoure** = Restore. Tautología **restore back** cortada. Restaurante = mismo árbol latino, otro oficio. No es tutorial de disaster recovery.

> Fuentes: [restore](${WIKT_RESTORE}), [restaurāre](${WIKT_RESTAURARE}), [restaurar](${WIKT_RESTAURAR}), [back](${WIKT_BACK}), [backup](${WIKT_BACKUP}), [up](${WIKT_UP}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Cuatro linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Up** | *upp* | Germánico — arriba / completar / en el aire | El **vector** |
| **Back** | *bæc* | Germánico — espalda, regreso | El **retorno** |
| **Backup** | *back* + *up* | Compuesto — sostener por detrás | La **reserva** |
| **Restore** | *restaurāre* | Latín — poner de pie otra vez | El **reerguir** |
| **Lapsus** | *Restoure* | Boca × PT *restauro* | No es el lema |
| **Tautología** | *restore back* | Calco redundante | Restore **ya** vuelve |

Backup sin restore ensayado es papel. Restore sin backup pide milagro al aire. *Upar* es otra sala de *up*. [Backspace](${backspace}) borra; no guarda la reserva. [Save Game](${saveGame}) graba la partida — rastro hermano, otra ficha.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *restore* < *restaurāre*. Cruzado con *back*, *backup* y *up*. Cuatro salas. Lapsus *Restoure* leído. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildRestorePost() {
  const { body, contentEn, contentEs } = buildRestoreBodies();
  const seriesOrder = pickOrder('inspecao-palavra-restore', 295);
  return makePalavra({
    title: 'Inspeção: Restore — pôr de pé; cruzado com Back, Backup e Up',
    titleEn: 'Inspection: Restore — set back on its feet; crossed with Back, Backup and Up',
    titleEs: 'Inspección: Restore — poner de pie; cruzado con Back, Backup y Up',
    excerpt:
      'Palavras: restore (lat. restaurāre) × back (germ. bæc) × backup (back+up) × up (germ. upp) — quatro salas, um circuito; Restoure = lapso; ≠ restore back; Valeu !!!',
    excerptEn:
      'Words: restore (Lat. restaurāre) × back (Gmc bæc) × backup (back+up) × up (Gmc upp) — four rooms, one circuit; Restoure = slip; ≠ restore back; Valeu !!!',
    excerptEs:
      'Palabras: restore (lat. restaurāre) × back (germ. bæc) × backup (back+up) × up (germ. upp) — cuatro salas, un circuito; Restoure = lapsus; ≠ restore back; ¡Valeu !!!',
    slug: 'inspecao-palavra-restore',
    date: '2026-08-24T11:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Restore · Back · Backup · Up',
    coverImage: COVER,
    sourceUrl: WIKT_RESTORE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRestorePost,
  buildRestoreBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_RESTORE,
  WIKT_BACK,
  WIKT_BACKUP,
  WIKT_UP
};
