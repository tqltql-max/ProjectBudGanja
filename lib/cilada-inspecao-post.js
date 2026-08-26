'use strict';

/**
 * Inspeção Palavras · Cilada
 * Lat. cēlāta ← cēlāre «esconder» · tocaia × ardil × situação × ofício
 * ≠ celada (elmo) ≠ ciliada ≠ selada ≠ desastre ≠ risco
 * A linha «Anti-armadilha» do lab ganha ficha-mãe.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cilada-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/cilada';
const WIKT_EN = 'https://en.wiktionary.org/wiki/cilada';
const WIKT_CELADA = 'https://pt.wiktionary.org/wiki/celada';
const WIKT_ES = 'https://es.wiktionary.org/wiki/celada';
const WIKT_CELO = 'https://en.wiktionary.org/wiki/celo#Latin';
const WIKT_CONCEAL = 'https://en.wiktionary.org/wiki/conceal';
const WIKI_TV = 'https://pt.wikipedia.org/wiki/Cilada_%28programa_de_televis%C3%A3o%29';

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
  return `Cilada.
Não é o desastre.
O desastre cai.
A cilada espera.

Cēlāta:
o que se esconde
para apanhar.

Celada cobre o rosto.
Cilada cobre a intenção.
A mesma raiz.
Dois ofícios.

O risco mapeia o visível.
A cilada vive no isco.

Nomear a armadilha
não é cair nela.
É o primeiro gesto.

Valeu !!!
ver o isco
antes da boca.`;
}

function poemEn() {
  return `Cilada.
Not disaster.
Disaster falls.
The trap waits.

Cēlāta:
what is hidden
in order to catch.

Celada covers the face.
Cilada covers the intent.
Same root.
Two crafts.

Risk maps the visible.
The trap lives in the bait.

Naming the snare
is not falling into it.
It is the first gesture.

Valeu !!!
see the bait
before the mouth.`;
}

function poemEs() {
  return `Cilada.
No es el desastre.
El desastre cae.
La celada espera.

Cēlāta:
lo que se esconde
para atrapar.

Celada cubre el rostro.
Cilada cubre la intención.
La misma raíz.
Dos oficios.

El riesgo mapea lo visible.
La cilada vive en el cebo.

Nombrar la trampa
no es caer en ella.
Es el primer gesto.

¡Valeu !!!
ver el cebo
antes de la boca.`;
}

function buildCiladaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-cilada.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const danger = '/posts/post-inspecao-palavra-danger.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const perseguicao = '/posts/post-inspecao-palavra-perseguicao.html';
  const loop = '/posts/post-inspecao-palavra-loop.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[Cilada](${self})**. Pedido de campo: *inspeção da palavra Cilada*.

*Cilada* é o nome do **ardil escondido**: tocaia, setup, situação que atrai para o erro. O laboratório já escreve «Anti-armadilha» em dezenas de fichas — esta página é a **ficha-mãe desse aviso**. Cobre o étimo latino *cēlāta*, o corte PT **cilada × [celada](${WIKT_CELADA})**, quatro salas (tocaia × ardil × situação × ofício) e o contraste com [risco](${risco}), [desastre](${desastre}) e [perseguição](${perseguicao}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cilada](${WIKT}), EN [*cilada*](${WIKT_EN}), [*celada*](${WIKT_CELADA}), ES [*celada*](${WIKT_ES}), lat. [*cēlō*](${WIKT_CELO}), EN [*conceal*](${WIKT_CONCEAL}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}). **Ficha ≠ manual de golpe, ≠ defesa de programa de TV, ≠ protocolo de segurança.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Cilada* / *cilada* / *ciladas* / *celada* / *tocaia* / *emboscada* / *armadilha* / *ardil* / *setup* / *foi uma cilada*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **cilada** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *cēlāta* «coisa oculta» ← *cēlāre* «esconder, ocultar» — confiança: **alta** |
| Via | Romance (esp. *celada* → PT *cilada*) |
| Família viva | *cair numa cilada* · *armar cilada* · *foi uma cilada* |
| Tipo BudGanja | Palavra — ardil escondido (quatro salas) |
| Não é | [Celada](${WIKT_CELADA}) (elmo) · ciliada · selada · [desastre](${desastre}) · [risco](${risco}) · o programa de TV |
| Data | ${inspected} |
| Fonte | [cilada](${WIKT}) · [*cēlō*](${WIKT_CELO}) |

**O que é o objecto:** o vocábulo que nomeia o **esconder-para-apanhar**. Não é o acidente. Não é o perigo à vista. Não é o elmo que cobre o rosto. É a **intenção oculta** (ou a situação que funciona *como se* houvesse intenção).

## 2. Latim — *cēlāre* / *cēlāta*

*Cēlāre*: esconder, ocultar, guardar fora da vista. O particípio *cēlātus* / *cēlāta* = **o que foi escondido**. O inglês [*conceal*](${WIKT_CONCEAL}) herda a mesma raiz. O [latim](${latim}) do laboratório já corta: a peça nua é o **gesto de cobrir**.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **cēlāre** | Esconder / ocultar | Alta |
| **cēlāta** | O oculto (fem.) — «coisa escondida» | Alta |
| Esp. **celada** | Emboscada **e** viseira do elmo | Alta |
| PT **cilada** | O ardil (a via *e* > *i* é romance) | Alta |
| PT **celada** | Peça de armadura que **cobre o rosto** | Alta (homónimo de ofício) |

**H-uma raiz:** espanhol guardou **uma boca** (*celada*) para o elmo e para a tocaia. Português **cortou**: *celada* = capacete; *cilada* = ardil. A [orelha cola](${orelhaCola}) as duas; o étimo explica a cola; o ofício **separa**.

**H-conceal:** *conceal* (EN) e *cilada* (PT) são **primos** de *cēlāre*. Não são a mesma palavra. Um nomeia o **esconder**; o outro nomeia o **esconder que caça**.

## 3. Quatro salas — a mesma boca

| Sala | Leitura | Exemplo | O que estudar |
|------|---------|---------|----------------|
| **A. Tocaia** | Emboscada física — esperar escondido | caça, via, ataque | Secção 4 |
| **B. Ardil** | Setup social — alguém arma para enganar | «foi uma cilada» | Secção 5 |
| **C. Situação** | A via *parece* boa e leva ao erro | investimento, atalho, isco | Secção 6 |
| **D. Ofício** | Nomear a armadilha **antes** de cair | a linha Anti-armadilha do lab | Secção 7 |

**H-uma boca:** *tocaia* e *setup* **rimam** em *cilada*. Não são o mesmo ofício.  
**H-TV:** o programa [*Cilada*](${WIKI_TV}) (Multishow) é **homónimo cultural** — câmara escondida como *formato*. Não é o objecto desta ficha.

## 4. Sala A — tocaia (emboscada)

Aqui *cilada* é **lugar + espera**: o corpo esconde-se para o outro aparecer. Sinónimos de ofício: *emboscada*, *tocaia*. A [perseguição](${perseguicao}) **corre atrás**. A cilada **espera à frente**.

| Corte | Leitura |
|-------|---------|
| Cilada ≠ perseguição | Uma espera; a outra caça em movimento |
| Cilada ≠ [risco](${risco}) | O risco pode estar à vista no mapa; a tocaia **apaga-se** do mapa |
| Cilada ≠ [medo](${medo}) | O medo avisa; a tocaia **não quer** ser avisada |

**H-caça:** esta ficha **não** ensina a armar tocaia. Nomeia o vocábulo.

## 5. Sala B — ardil (setup)

Por extensão, *cilada* vira **traição desenhada**: alguém atrai, alguém cai. A fala BR «foi uma cilada» aponta esta sala. O inglês informal *setup* (armar alguém) é **equivalente de rua**, não cognato.

| Peça | Papel | Corte |
|------|-------|-------|
| **Isco** | O que brilha | ≠ o ofício verdadeiro |
| **Via aparente** | O [caminho](${caminho}) que parece certo | ≠ o caminho inspecionado |
| **Queda** | «Caiu na cilada» | O verbo denuncia a sala B/C |
| **Mentira** | Pode ser **ferramenta** da cilada | A mentira sozinha **não** é a cilada |

**H-mentira:** uma mentira pode servir de isco. A cilada é o **arranjo** — isco + via + queda.

## 6. Sala C — situação (sem necessariamente um vilão)

O Wikcionário regista o figurado: *toda situação que leva alguém a ser enganado ou a cometer erro*. Aqui pode **não** haver um armador. Há uma **forma** que caça: atalho fácil, gôndola, [loop](${loop}) que parece saída.

| Situação | Leitura lab |
|----------|-------------|
| Atalho que apaga o [gesto](${gesto}) | Cilada de método — a pressa é o isco |
| «Já está inspecionado, não preciso ver» | Cilada de ofício — o lab avisa contra ela em quase toda ficha |
| [Pattern](${pattern}) invisível que se repete | Molde que caça se não for nomeado |
| Investimento / produto que «brilha» | Isco; esta ficha **não** aconselha mercado |

**H-sem vilão:** a sala C não exige má-fé humana. Exige **forma que atrai e falha**. O ofício ainda nomeia.

## 7. Sala D — ofício (anti-armadilha)

No BudGanja, quase toda inspeção fecha com uma linha **Anti-armadilha**: o mapa do *falso ofício* daquela peça. *Cilada* é o **nome português** dessa linha.

| Gesto | Ofício |
|-------|--------|
| Nomear o isco | [Verdade](${verdade}) — o brilho sem o corte |
| Ler o [sinal](${sinal}) | A tocaia deixa rasto se houver método |
| Medir o [risco](${risco}) | O visível; a cilada é o **invisível desenhado** |
| Escolher [EXIT](${exit}) | Sair **antes** da boca no isco |
| [Gesto](${gesto}) inspecionado | O contrário da queda automática |

**H-lab:** inspecionar **é** o corte da cilada — ver o arranjo. Não é paranoia. Paranoia vê cilada em tudo; o ofício **corta** a sala antes de traduzir.

## 8. Cilada × vizinhos

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **cilada** | Ardil / tocaia / situação-isco | Esconde para apanhar |
| **celada** | Elmo / viseira | Esconde o **rosto**; mesma raiz, outro objecto |
| **armadilha** | Dispositivo ou mecanismo | A **peça**; *cilada* insiste na **situação** |
| **[risco](${risco})** | Perigo com contorno | Calculável; a cilada recusa o contorno |
| **[danger](${danger})** / perigo | Placa / prova | Aviso à vista; a cilada **não põe placa** |
| **[desastre](${desastre})** | Má estrela / queda grave | Acontece; a cilada **espera** |
| **[medo](${medo})** | Afecto de alarme | Sente-se; não desenha o isco |
| **[perseguição](${perseguicao})** | Caça em movimento | Corre; a cilada **espera** |
| **[pattern](${pattern})** | Molde visível | Repetição reconhecível; a cilada esconde o molde |
| **[loop](${loop})** | Ciclo que não sai | Pode **ser** a forma da sala C |
| **[verdade](${verdade})** | Nomear sem pose | O corte da cilada |

**Anti-armadilha desta ficha:** «tudo é cilada» = paranoia (falso ofício). Outra: «se caiu, merecia» = crueldade, não método. Outra: fundir *celada* (elmo) com *cilada* (ardil) porque a orelha cola. Outra: tratar o programa de TV como étimo.

## 9. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **cilada** = **celada** | A mesma palavra | PT cortou: ardil × elmo |
| **ciliada** | A mesma boca | Biologia (cílio) — **outra** árvore |
| **selada** | A mesma boca | *Selo* / *selar* — **outra** árvore |
| **armadilha** = **cilada** | Sinónimos exactos | Peça × situação; vizinhos, não clones |
| **desastre** = **cilada** | «Deu errado» | Queda × espera desenhada |
| **risco** = **cilada** | Perigo | Mapa visível × isco escondido |
| *setup* (EN) | Cognato | Equivalente de rua da sala B; **não** étimo |
| Programa *Cilada* | A origem da palavra | [Homónimo de palco](${WIKI_TV}) |

**H1:** *cilada* < lat. *cēlāta* < *cēlāre* — o oculto que caça (alta).  
**H2:** quatro salas (tocaia × ardil × situação × ofício); uma boca.  
**H3:** *celada* / *ciliada* / *selada* são **colas da orelha**.  
**H4:** [risco](${risco}) mapeia; [desastre](${desastre}) cai; cilada **espera**.

## 10. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o isco **antes** da queda |
| Bom | Cortar sala (tocaia / ardil / situação) antes de acusar alguém |
| Bom | Usar a linha Anti-armadilha como mapa, não como sermão |
| Bom | Separar *celada* (elmo) de *cilada* (ardil) |
| Mau | «Tudo é cilada» — paranoia que apaga o [sinal](${sinal}) real |
| Mau | Ensinar a armar golpe com esta ficha |
| Mau | Fundir desastre, risco e cilada num só sopro |
| Mau | Transformar o programa de TV no étimo |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* espera *hoje*.

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vidaHub}#poema=cilada)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [risco](${risco}) · [danger](${danger}) | O visível / a placa — o contrário do isco |
| [desastre](${desastre}) | A queda; a cilada é a espera |
| [medo](${medo}) · [verdade](${verdade}) | Alarme × nomeação |
| [sinal](${sinal}) · [gesto](${gesto}) · [EXIT](${exit}) | Rasto, acto, saída |
| [caminho](${caminho}) · [pattern](${pattern}) · [loop](${loop}) | Via, molde, ciclo que pode ser sala C |
| [perseguição](${perseguicao}) | Caça em movimento ≠ tocaia |
| [latim](${latim}) · [étimo](${etimo}) · [etimologia](${etimologia}) | *cēlāre* / *cēlāta* |
| [língua portuguesa](${lingua}) | O corte cilada × celada |
| [A orelha cola](${orelhaCola}) | Por que *celada* cola em *cilada* |
| [Guia](${guia}) · hub [Palavras](${hub}) | Mapa |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a armar tocaia, golpe ou setup.  
- Não aconselha investimento nem produto.  
- Não é ficha do programa de TV — só o declara como homónimo.  
- *Armadilha* fica **vizinha**; pode ganhar ficha própria mais tarde.  
- Paranoia («tudo é cilada») fica **cortada** como falso ofício.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **cilada** fichada como lat. *cēlāta* ← *cēlāre*; **quatro salas** (tocaia × ardil × situação × ofício); [celada](${WIKT_CELADA}) / ciliada / selada cortadas; [risco](${risco}) mapeia, [desastre](${desastre}) cai, cilada espera. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Risco](${risco}) · [▶ Desastre](${desastre}) · [▶ Danger](${danger}) · [▶ Verdade](${verdade}) · [▶ Caminho](${caminho}) · [▶ Étimo](${etimo}) · [▶ Latim](${latim}) · [▶ Poema Vida](${vidaHub}#poema=cilada) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **Cilada** — trap, ambush, setup. Field request: inspect the word *Cilada*.

From Latin *cēlāta* (“something hidden”) ← *cēlāre* (“to hide”). Spanish *celada* kept one mouth for the helmet visor **and** the ambush. Portuguese **split**: *celada* = helmet; *cilada* = the snare. This sheet is the mother of the lab’s **Anti-trap** line.

> Sources: [Wiktionary · cilada](${WIKT}), Lat. [*cēlō*](${WIKT_CELO}). Method: [etymology](${etimologia}). Not a playbook for a scam. Close: [Valeu !!!](${mantra}).

## Four rooms, one mouth

| Room | Reading |
|------|---------|
| **A. Ambush** | Hidden waiting (tocaia) — [pursuit](${perseguicao}) *chases*; cilada *waits* |
| **B. Setup** | Someone designs the fall — EN street *setup* is an equivalent, not a cognate |
| **C. Situation** | A shape that lures into error — no villain required |
| **D. Craft** | Naming the bait **before** the mouth — [truth](${verdade}) · [signal](${sinal}) · [EXIT](${exit}) |

[Risk](${risco}) maps what can be seen. [Disaster](${desastre}) *falls*. Cilada **waits**. [Fear](${medo}) alarms; it does not draw the bait. The TV show *Cilada* is a cultural homonym, not the etymon.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Trap filed. Helmet cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Cilada** — trampa, emboscada, montaje. Pedido de campo: inspeccionar la palabra *Cilada*.

Del latín *cēlāta* («cosa oculta») ← *cēlāre* («esconder»). El español *celada* guarda **una boca** para el yelmo y para la emboscada. El portugués **cortó**: *celada* = yelmo; *cilada* = el ardid. Esta ficha es la madre de la línea **Anti-trampa** del laboratorio.

> Fuentes: [Wikcionario · cilada](${WIKT}), lat. [*cēlō*](${WIKT_CELO}). Método: [etimología](${etimologia}). No es manual de golpe. Cierre: [¡Valeu !!!](${mantra}).

## Cuatro salas, una boca

| Sala | Lectura |
|------|---------|
| **A. Tocaia** | Espera escondida — la [persecución](${perseguicao}) *corre*; la cilada *espera* |
| **B. Ardid** | Alguien diseña la caída — EN *setup* es equivalente de calle, no cognado |
| **C. Situación** | Una forma que atrae al error — no exige villano |
| **D. Oficio** | Nombrar el cebo **antes** de la boca — [verdad](${verdade}) · [señal](${sinal}) · [EXIT](${exit}) |

El [riesgo](${risco}) mapea lo visible. El [desastre](${desastre}) *cae*. La cilada **espera**. El programa de TV *Cilada* es homónimo cultural, no el étimo.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Trampa fichada. Yelmo cortado. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCiladaPost() {
  const { body, contentEn, contentEs } = buildCiladaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-cilada', 320);
  return makePalavra({
    title: 'Inspeção: Cilada — cēlāta, o que se esconde para apanhar',
    titleEn: 'Inspection: Cilada — cēlāta, what hides in order to catch',
    titleEs: 'Inspección: Cilada — cēlāta, lo que se esconde para atrapar',
    excerpt:
      'Palavras: Cilada ← lat. cēlāta / cēlāre — tocaia × ardil × situação × ofício; ≠ celada ≠ desastre ≠ risco; Valeu !!!',
    excerptEn:
      'Words: Cilada ← Lat. cēlāta / cēlāre — ambush × setup × situation × craft; ≠ helmet ≠ disaster ≠ risk; Valeu !!!',
    excerptEs:
      'Palabras: Cilada ← lat. cēlāta / cēlāre — tocaia × ardid × situación × oficio; ≠ celada ≠ desastre ≠ riesgo; ¡Valeu !!!',
    slug: 'inspecao-palavra-cilada',
    date: '2026-08-24T13:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Cilada',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCiladaPost,
  buildCiladaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_EN,
  WIKT_CELADA,
  WIKT_CELO,
  WIKI_TV
};
