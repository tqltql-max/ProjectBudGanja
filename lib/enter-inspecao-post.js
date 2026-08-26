'use strict';

/**
 * Inspeção Palavras · Enter
 * Pedido: inspeção da palavra Enter · relação com bem viNDOS!!! · palavra final inspecionada.
 *
 * Eixos: lat. intrāre (intrā «dentro») → EN enter → tecla Enter/Return ·
 * PT entrar · par de limiar EXIT · saudação bem-vindos!!! (bene + venīre) ·
 * ≠ Return (carro) ≠ login frio ≠ banner de marketing · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/enter-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/enter';
const WIKT_PT = 'https://pt.wiktionary.org/wiki/entrar';
const WIKT_LA = 'https://en.wiktionary.org/wiki/intro#Latin';
const WIKT_INTRA = 'https://en.wiktionary.org/wiki/intra#Latin';
const WIKT_BEM = 'https://pt.wiktionary.org/wiki/bem-vindo';
const WIKT_WELCOME = 'https://en.wiktionary.org/wiki/welcome';
const WIKT_VENIRE = 'https://en.wiktionary.org/wiki/venio#Latin';
const WIKI_KEY = 'https://en.wikipedia.org/wiki/Enter_key';

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
  return `Enter.
Não é só a tecla.
É o gesto de ir para dentro.

Intrāre:
atravessar o limiar.
Bem-vindos!!!
é a voz que recebe
quem entrou.

Enter sem saudação
é login frio.
Bem-vindos sem Enter
é cartaz sem porta.

EXIT é a outra boca.
Backspace corrige o rascunho.
Enter confirma o passo.

Valeu !!!
entrar de verdade
e ouvir bem-vindos.`;
}

function poemEn() {
  return `Enter.
Not only the key.
It is the gesture of going in.

Intrāre:
cross the threshold.
Bem-vindos!!!
is the voice that receives
the one who entered.

Enter without welcome
is a cold login.
Welcome without Enter
is a poster without a door.

EXIT is the other mouth.
Backspace revises the draft.
Enter confirms the step.

Valeu !!!
enter in truth
and hear bem-vindos.`;
}

function poemEs() {
  return `Enter.
No es solo la tecla.
Es el gesto de ir adentro.

Intrāre:
cruzar el umbral.
¡Bem-vindos!!!
es la voz que recibe
a quien entró.

Enter sin saludo
es un login frío.
Bienvenida sin Enter
es cartel sin puerta.

EXIT es la otra boca.
Backspace corrige el borrador.
Enter confirma el paso.

¡Valeu !!!
entrar de verdad
y oír bem-vindos.`;
}

function buildEnterBodies() {
  const inspected = '2026-08-25';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-enter.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const homepage = '/posts/post-inspecao-palavra-homepage.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gratidao = '/posts/post-inspecao-palavra-gratidao.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const welcomeTrack = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';
  const radio = '/radio/';
  const porta = '/entrar.html';
  const home = '/';

  const body = `## Escopo

Inspeção editorial da palavra **[Enter](${self})**. Pedido de campo: *inspeção da palavra Enter* · *relação com bem viNDOS!!!* · **palavra final inspecionada**.

*Enter* é o nome inglês do **ir para dentro** (lat. *intrāre*) e, no teclado, a tecla que **confirma** o passo ou muda de linha. *Bem-vindos!!!* é a saudação do limiar: *bem* + *vindos* (lat. *bene* + *venīre*) — o mesmo desenho do inglês *welcome* (*well* + *come*). Esta ficha corta as duas bocas da **mesma porta**: quem entra, e quem recebe.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · enter](${WIKT}), PT [*entrar*](${WIKT_PT}), lat. [*intrō*](${WIKT_LA}) / [*intrā*](${WIKT_INTRA}), [*bem-vindo*](${WIKT_BEM}), EN [*welcome*](${WIKT_WELCOME}), [*veniō*](${WIKT_VENIRE}), [Enter key](${WIKI_KEY}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}). **Ficha ≠ tutorial de teclado, ≠ copião de recepção, ≠ hipnose de comando.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${valeu}).

**Gatilho:** *Enter* / *ENTER* / *↵* / *Return* / *entrar* / *bem viNDOS!!!* / *bem-vindos!!!* / *sejam bem-vindos*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Enter** (EN; tecla / verbo) |
| Irmã PT | **entrar** · *entrada* · *entre* |
| Par de saudação | **bem-vindos!!!** (*bem-vindo* / *bem-vinda* / *bem-vindas*) |
| Classe | Verbo EN · tecla · loan BR («aperta o Enter») |
| Étimo (trabalho) | Lat. *intrō, intrāre* «ir para dentro» ← *intrā* «dentro» → OF *entrer* → EN *enter* — confiança: **alta** |
| Étimo da saudação | Lat. *bene* + *venīre* → PT *bem-vindo*; EN *well* + *come* = **o mesmo gesto em duas línguas** — confiança: **alta** |
| Família viva | *Enter* · *Return* · *↵* · *to enter* · *entrada* · *sejam bem-vindos* |
| Tipo BudGanja | Palavra — tecla × verbo × limiar × hospitalidade |
| Não é | [EXIT](${exit}) · Return só como carro da máquina · login frio · banner de marketing |
| Porta no site | [${porta}](${porta}) · [homepage](${homepage}) · [/](${home}) |
| Data | ${inspected} |
| Fonte | [enter](${WIKT}) · [bem-vindo](${WIKT_BEM}) · [tecla](${WIKI_KEY}) |

**O que é o objecto:** o vocábulo que nomeia o **cruzar para dentro** — e, no laboratório, o par obrigatório com **bem-vindos!!!**. Enter sem recepção é porta automática. Bem-vindos sem Enter é cartaz.

## 2. Latim — *intrāre* × *venīre*

Duas raízes, um limiar.

| Peça | Traçado | Ofício |
|------|---------|--------|
| **intrā** | «Dentro» | O sítio para onde se vai |
| **intrāre** | Ir para dentro | O [gesto](${gesto}) de Enter / *entrar* |
| **exīre** | Sair | O [EXIT](${exit}) — a outra boca |
| **bene** | Bem | A qualidade da recepção |
| **venīre** | Vir / chegar | A peça de *vindo* |
| **bem-vindo** | *bem* + *vindo* | «Chegaste bem» — hospitalidade nomeada |
| **welcome** | *well* + *come* | Cognato de ofício, não de sangue com *enter* |

**H-porta:** *enter* e *exit* são **primos latinos** (*intrāre* × *exīre*). A [orelha cola](${orelhaCola}) as duas teclas; o étimo explica a cola; o ofício **separa**: uma boca entra, a outra sai.

**H-saudação:** *bem-vindos* e *welcome* **não** vêm de *intrāre*. Vêm de *vir* / *come*. A relação pedida é de **uso no limiar**, não de família etimológica. Quem entra (*enter*) é recebido (*bem-vindos*). Duas peças, uma porta.

## 3. Quatro salas — a mesma porta

| Sala | Leitura | Exemplo | O que estudar |
|------|---------|---------|----------------|
| **A. Tecla** | Enter / Return / ↵ — confirmar ou mudar de linha | formulário, chat, código | Secção 4 |
| **B. Verbo** | *to enter* / *entrar* — ir para dentro | sala, site, ofício | Secção 5 |
| **C. Bem-vindos!!!** | A voz que recebe quem atravessou | «sejam bem-vindos» | Secção 6 |
| **D. Ofício** | Hospitalidade com verdade — não login frio | lab, [/entrar/](${porta}), rádio | Secção 7 |

## 4. Sala A — a tecla

Na máquina de escrever, *Return* fazia o **carro** voltar ao início da linha (e muitas vezes avançar o papel). No computador, a mesma família de teclas passou a **confirmar** (enviar, executar, gravar o passo) **ou** a mudar de linha.

| Forma | Ofício | Corte |
|-------|--------|-------|
| **Enter** (PC / BR oral) | Confirmar o passo | Loan no português: «aperta o Enter» |
| **Return** (Mac / história) | Carro da linha; no ecrã, muitas vezes = Enter | ≠ *voltar* ([restore](${restore}) / *voltar*) |
| **↵** | Símbolo do limiar no teclado | Ícone, não étimo |
| **[Backspace](${backspace})** | Corrigir o que ficou atrás | Irmã de teclado; ofício inverso |
| **[commitar](${commitar})** | Gravame no git — muitas vezes *depois* de Enter | Confirmar ≠ apagar |

**IBM 3270** (e alguns teclados de terminal) guardou **Return** e **Enter** como teclas distintas: uma muda de linha, a outra envia. O PC doméstico **fundiu** as duas bocas numa tecla só. A [orelha cola](${orelhaCola}); o ofício, quando preciso, **corta**.

**H-tecla:** no BudGanja, Enter **bom** = confirmar com [verdade](${verdade}) o que se escreveu; Enter **mau** = enviar no automático, sem ler, sem [respeito](${respeito}) a quem recebe.

## 5. Sala B — *entrar*

O português **já tinha** *entrar* (da mesma *intrāre*). *Enter* no BR é sobretudo a **tecla** e o jargão digital. Não apagar a irmã nativa.

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **entrar na sala** | Ir para dentro | O gesto nativo |
| **entrar no site** | Abrir a [homepage](${homepage}) / [/](${home}) | Porta viva |
| **entrar na conta** | [${porta}](${porta}) | Login — útil; frio se não houver **bem-vindos** |
| **«aperta o Enter»** | Confirmar no teclado | Loan honesto; preferir *entrar* no texto formal |
| **enter a value** | Inserir dado (EN técnico) | Vizinho de *input*; não é a saudação |

**Anti-armadilha:** *enter* como ordem hipnótica («enter the state…») não é esta ficha. Aqui a palavra é **limiar com ofício**.

## 6. Sala C — bem-vindos!!!

Pedido de campo: *relação com bem viNDOS!!!*. Grafia viva: espaço no lugar do hífen, *NDOS* em maiúsculas, três pontos de exclamação — o mesmo calor de [Valeu !!!](${valeu}).

A âncora escrita é **bem-vindos** (hífen obrigatório no PT). Flexão: *bem-vindo* · *bem-vinda* · *bem-vindos* · *bem-vindas*. Fórmula: *sejam bem-vindos*.

| Peça | Traçado | Leitura lab |
|------|---------|-------------|
| **bem** | Lat. *bene* | Qualidade da chegada — não bajulação |
| **vindo** | Particípio de *vir* ← *venīre* | Quem **chegou**, não quem foi empurrado |
| **bem-vindo** | Composto PT | «Chegaste *bem*» |
| **welcome** | *well* + *come* | Mesmo desenho em inglês |
| **bienvenido** | Esp. *bien* + *venido* | Irmã romance |
| **!!!** | Pontuação do lab | Eco de [Valeu !!!](${valeu}) — calor, não grito vazio |

**A relação (o que o pedido pede):**

| Boca | Gesto | Sem a outra |
|------|-------|-------------|
| **Enter** | Ir para dentro / confirmar o passo | Login frio, formulário sem rosto |
| **bem-vindos!!!** | Receber quem chegou | Cartaz de hospitalidade sem porta |

No site: a [homepage](${homepage}) é a sala; [${porta}](${porta}) é o Enter da conta; a rádio ([Send Me On My Way](${welcomeTrack}), [${radio}](${radio})) é o **bem-vindos** sonoro da sessão. Três gestos, um limiar.

**H-hospitalidade:** bem-vindos **bom** = [respeito](${respeito}) a quem entra, com [verdade](${verdade}) do que a casa é. Bem-vindos **mau** = marketing de porta giratória («welcome» de banner, Enter que só captura).

## 7. Sala D — ofício do laboratório

| Camada | Ligação |
|--------|---------|
| Teclado | Enter confirma; [backspace](${backspace}) revê; [EXIT](${exit}) sai |
| Porta do site | [homepage](${homepage}) · [${porta}](${porta}) · [/](${home}) |
| Saudação | **bem-vindos!!!** · rádio [welcome](${welcomeTrack}) |
| Fecho | [Valeu !!!](${valeu}) — o melhor **ao entrar e ao receber**, hoje |
| Caminho | Enter é limiar no [caminho](${caminho}); não substitui o percurso |
| Gratidão | [gratidão](${gratidao}) nomeia o bem *já* recebido; bem-vindos nomeia o bem *ao chegar* |

**Veredicto:** Valeu !!! **também ao entrar**. Enter sem [alma](${respeito}) da casa = tecla. Enter com **bem-vindos!!!** = **porta com ofício**.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Tecla** | Só hardware | Confirmar o passo — ou mandar no automático |
| **Enter = Return** | Sinónimos exactos | História distinta; no PC, uma boca fundida |
| **Enter = EXIT** | Duas teclas iguais | *intrāre* × *exīre* — porta de dois sentidos |
| **Bem-vindos = Enter** | A mesma palavra | Relação de **limiar**, não de étimo |
| **Welcome** | Tradução preguiçosa | Mesmo *desenho* (*well+come*); outro sangue que *enter* |
| **Login** | Já é hospitalidade | Só é, se houver **bem-vindos** com [verdade](${verdade}) |

## 9. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Apertar Enter *depois* de ler o que se envia |
| Bom | Dizer **bem-vindos!!!** a quem atravessou — hífen no escrito, calor na boca |
| Bom | Mandar a saída para [EXIT](${exit}) e a correcção para [backspace](${backspace}) |
| Mau | Enter no automático (enviar sem olhar) |
| Mau | «Welcome» de banner sem porta, sem [respeito](${respeito}) |
| Mau | Confundir *entrar* (PT) com a tecla e apagar a irmã nativa |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=enter)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [EXIT](${exit}) | A outra boca da porta (*exīre*) |
| [Backspace](${backspace}) | Irmã de teclado — rever, não entrar |
| [Homepage](${homepage}) · [/](${home}) · [${porta}](${porta}) | Onde se entra no lab |
| [Send Me On My Way](${welcomeTrack}) · [rádio](${radio}) | Bem-vindos sonoro |
| [Caminho](${caminho}) · [gesto](${gesto}) | O percurso e a mão |
| [Verdade](${verdade}) · [respeito](${respeito}) · [gratidão](${gratidao}) | Hospitalidade com ofício |
| [Commitar](${commitar}) · [restore](${restore}) | Confirmar / pôr de pé de novo |
| [Latim](${latim}) · [étimo](${etimo}) · [língua](${lingua}) | Método |
| [Guia](${guia}) · [Vida](${vidaHub}) | Índice e poema |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${valeu}) · [eu amo a vida](${amo}) | Fecho |

## Hipóteses (síntese)

**H1:** *enter* < lat. *intrāre* / *intrā* (alta).  
**H2:** *bem-vindos* < *bene* + *venīre*; *welcome* = o mesmo desenho em EN — relação de **limiar**, não de sangue com *enter*.  
**H3:** quatro salas = tecla · verbo · saudação · ofício.  
**H4:** par de porta = [Enter](${self}) × [EXIT](${exit}); par de hospitalidade = Enter × **bem-vindos!!!**.  
**H5:** fecho = [Valeu !!!](${valeu}).

## Limites

- Não é manual de atalhos nem história completa da IBM.  
- Não funde *entrar*, *input* e *inserir* num só vocábulo.  
- Não é protocolo de recepção comercial.  
- O poema é **criação do laboratório**.  
- Palavra **final inspecionada** neste pedido — não fecha a série Palavras.

## Status

**Aprovado na série Palavras** — **Enter** fichado: *intrāre*; tecla × verbo × limiar; relação com **bem-vindos!!!** (*bene* + *venīre*); cortes ([EXIT](${exit}), Return só-carro, login frio, banner). Palavra final inspecionada. [Faça o seu melhor](${faca}). [Valeu !!!](${valeu}).

[▶ Palavras](${hub}) · [▶ EXIT](${exit}) · [▶ Backspace](${backspace}) · [▶ Homepage](${homepage}) · [▶ Poema Vida](/vida/#poema=enter) · [▶ Valeu !!!](${valeu})
`;

  const contentEn = `## Scope

Inspection of **Enter** — Lat. *intrāre* “to go in”. Field: the word *Enter*, its relation to **bem-vindos!!!**, **final inspected word**.

*Enter* names going inward (and the key that confirms the step). *Bem-vindos!!!* is the greeting at the threshold: *bem* + *vindos* (Lat. *bene* + *venīre*) — the same drawing as English *welcome* (*well* + *come*). Two mouths, one door: who enters, and who receives.

> Sources: [enter](${WIKT}), [bem-vindo](${WIKT_BEM}), [Enter key](${WIKI_KEY}). Not a keyboard tutorial. Close: [Valeu !!!](${valeu}).

## Four rooms, one door

| Room | Reading |
|------|---------|
| **A. Key** | Enter / Return / ↵ — confirm or newline; sister [backspace](${backspace}) |
| **B. Verb** | *to enter* / PT *entrar* — go in; site door [${porta}](${porta}) |
| **C. Bem-vindos!!!** | The voice that receives — hyphen in writing, heat in the mouth |
| **D. Craft** | Hospitality with [verdade](${verdade}); not a cold login or a banner |

[EXIT](${exit}) is *exīre* — the other mouth. *Welcome* shares the *well+come* drawing with *bem-vindo*, not blood with *enter*. The relation asked is **threshold use**.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *intrāre*; key × verb × welcome; pair [EXIT](${exit}); [Valeu !!!](${valeu}).
`;

  const contentEs = `## Alcance

Inspección de **Enter** — lat. *intrāre* «ir adentro». Pedido: la palabra *Enter*, relación con **bem-vindos!!!**, **palabra final inspeccionada**.

*Enter* nombra el ir hacia dentro (y la tecla que confirma el paso). *Bem-vindos!!!* es el saludo del umbral: *bem* + *vindos* (lat. *bene* + *venīre*) — el mismo dibujo que *welcome* (*well* + *come*). Dos bocas, una puerta: quien entra, y quien recibe.

> Fuentes: [enter](${WIKT}), [bem-vindo](${WIKT_BEM}), [tecla](${WIKI_KEY}). No es tutorial de teclado. Cierre: [¡Valeu !!!](${valeu}).

## Cuatro salas, una puerta

| Sala | Lectura |
|------|---------|
| **A. Tecla** | Enter / Return / ↵ — confirmar o cambiar de línea; hermana [backspace](${backspace}) |
| **B. Verbo** | *to enter* / PT *entrar* — ir adentro; puerta [${porta}](${porta}) |
| **C. Bem-vindos!!!** | La voz que recibe — guion en lo escrito, calor en la boca |
| **D. Oficio** | Hospitalidad con [verdade](${verdade}); no login frío ni cartel |

[EXIT](${exit}) es *exīre* — la otra boca. La relación pedida es de **uso en el umbral**, no de sangre etimológica.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *intrāre*; tecla × verbo × bienvenida; par [EXIT](${exit}); [¡Valeu !!!](${valeu}).
`;

  return { body, contentEn, contentEs };
}

function buildEnterPost() {
  const { body, contentEn, contentEs } = buildEnterBodies();
  const seriesOrder = pickOrder('inspecao-palavra-enter', 335);
  return makePalavra({
    title: 'Inspeção: Enter — intrāre, a tecla e bem-vindos!!!',
    titleEn: 'Inspection: Enter — intrāre, the key and bem-vindos!!!',
    titleEs: 'Inspección: Enter — intrāre, la tecla y bem-vindos!!!',
    excerpt:
      'Palavras: Enter ← lat. intrāre — tecla × verbo × limiar; relação com bem-vindos!!! (bene + venīre); ≠ EXIT ≠ login frio; Valeu !!!',
    excerptEn:
      'Words: Enter ← Lat. intrāre — key × verb × threshold; relation to bem-vindos!!! (bene + venīre); ≠ EXIT ≠ cold login; Valeu !!!',
    excerptEs:
      'Palabras: Enter ← lat. intrāre — tecla × verbo × umbral; relación con bem-vindos!!! (bene + venīre); ≠ EXIT ≠ login frío; ¡Valeu !!!',
    slug: 'inspecao-palavra-enter',
    date: '2026-08-25T12:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Enter · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEnterPost,
  buildEnterBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_PT,
  WIKT_LA,
  WIKT_BEM,
  WIKT_WELCOME,
  WIKI_KEY
};
