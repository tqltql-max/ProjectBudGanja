'use strict';

/**
 * Inspeção Palavras · ramo / branch
 * Eixos: lat. ramus (planta) × git branch (linha de rasto)
 * · a orelha cola brunch · ≠ árvore de trabalho · ≠ Árvore da Vida
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/ramo-palavra-cover.jpg';
const GIT_GLOSS = 'https://git-scm.com/docs/gitglossary';
const GIT_BRANCH = 'https://git-scm.com/docs/git-branch';
const WIKT_RAMO = 'https://pt.wiktionary.org/wiki/ramo';
const WIKT_RAMUS = 'https://en.wiktionary.org/wiki/ramus#Latin';
const WIKT_BRANCH = 'https://en.wiktionary.org/wiki/branch';
const WIKT_BRUNCH = 'https://en.wiktionary.org/wiki/brunch';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'palavras-origem')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : 0) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildRamoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-ramo.html';
  const arvoreTrabalho = '/posts/post-inspecao-palavra-arvore-de-trabalho.html';
  const arvoreVida = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da palavra **[ramo](${self})** — lat. *ramus*, o **braço da [planta](${planta})** — e do inglês de ofício *branch* (git): a **linha de rasto**. Pedido de campo, a seguir à [árvore de trabalho](${arvoreTrabalho}): fichar o **ramo**. [A orelha cola](${orelhaCola}) *brunch* (pequeno-almoço + almoço) em *branch*. O étimo **corta**. [Faça o melhor!](${mantra})

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ramo](${WIKT_RAMO}), lat. [*ramus*](${WIKT_RAMUS}), [branch](${WIKT_BRANCH}), [brunch](${WIKT_BRUNCH}), [gitglossary](${GIT_GLOSS}), [\`git branch\`](${GIT_BRANCH}). **Ficha ≠ tutorial git. Ficha ≠ poda. Ficha ≠ cardápio de domingo.** Série [Palavras](${hub}).

**Gatilho:** *ramo* / *branch* / *brunch* / *main* / *checkout*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **ramo** |
| Inglês de ofício | *branch* |
| Lapso de campo | **brunch** — a orelha lê refeição onde o ofício escreve linha |
| Classe | Substantivo masculino (PT) · termo de ofício (EN) |
| Étimo (planta) | Lat. *ramus* «ramo, braço» — confiança **alta** |
| Étimo (git) | Ing. *branch* «ramo» → linha de commits (2005–) — confiança **alta** no calco |
| Tipo BudGanja | Palavra — planta primeiro × linha de rasto × par ilusório *brunch* |
| Não é | **brunch** (refeição) · [árvore de trabalho](${arvoreTrabalho}) (chão de ficheiros) · [Árvore da Vida](${arvoreVida}) (fase sénior) · [commitar](${commitar}) (o snapshot) · [caminho](${caminho}) (a rota) |
| Elo planta | [planta](${planta}) · [Árvore da Vida](${arvoreVida}) — o ramo botânico **fica** botânico |
| Elo ofício | [árvore de trabalho](${arvoreTrabalho}) · [commitar](${commitar}) · [node](${node}) |
| Fonte | [ramo](${WIKT_RAMO}) · [gitglossary](${GIT_GLOSS}) |
| Data | ${inspected} |

**O que é o objecto:** duas salas, um desenho. Na planta, o **braço**. No git, a **linha** onde o rasto cresce. Não é o chão de ficheiros. Não é o ovo-e-bacon de domingo.

## O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **ramo** | Só gíria de escritório | Lat. *ramus* — primeiro a [planta](${planta}) |
| **branch** | A mesma planta | No ofício: linha de commits nomeada (*main*, *feat/…*) |
| **brunch** | O mesmo som | *breakfast* + *lunch* — [brunch](${WIKT_BRUNCH}); **≠** *branch* |
| **ramo de atividade** | O git da empresa | Metáfora comercial; **não** é esta ficha |
| **[árvore de trabalho](${arvoreTrabalho})** | A árvore inteira | O **chão** (ficheiros). O ramo é a **linha** |
| **[Árvore da Vida](${arvoreVida})** | O mesmo tronco | Fase sénior do lab — **outra** sala |

O olho lê BRANCH / BRUNCH: quase o mesmo desenho. [A orelha cola](${orelhaCola}); o [étimo](${etimologia}) solta. Método [gíria](${giria}).

## Hipóteses e método

**H1:** *ramo* < *ramus* — a planta **primeiro**. Alta.  
**H2:** *branch* no git é **linha de rasto**, não a [árvore de trabalho](${arvoreTrabalho}). Alta.  
**H3:** *brunch* é **lapso de campo** — indexar, sem humilhar. Alta no gatilho.  
**H4:** a [Árvore da Vida](${arvoreVida}) e o ramo botânico **não** viram checkout.  
**H5:** [commitar](${commitar}) **grava no ramo**; não *é* o ramo.  
**H6:** *checkout* **muda de ramo**; fica para outra sala (limites).

## Três andares (não misturar)

| Andar | O que é | O que **não** é |
|-------|---------|-----------------|
| **1. Ramo / branch** | Linha nomeada de commits | O disco sujo no editor |
| **2. Árvore de trabalho** | Ficheiros que a mão edita — [árvore de trabalho](${arvoreTrabalho}) | A história do ramo |
| **3. Commit** | Snapshot com mensagem — [commitar](${commitar}) | Trocar de ramo |

**Irmãos de fluxo:** escolher o [ramo](${self}) → editar na [árvore](${arvoreTrabalho}) → [commitar](${commitar}) o limpo → *push* (fora). Esta ficha é **só a linha**.

Um \`git worktree\` extra é **outro chão** no **mesmo** repo, muitas vezes noutro ramo — corte já feito na [árvore de trabalho](${arvoreTrabalho}); não duplicar.

## Camadas vivas de *ramo*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Planta** | Braço lenhoso — *ramus* | Alta |
| **Ofício git** | *branch* — linha de rasto | Alta |
| **Calco PT** | Dizer *ramo* ou *branch* no mesmo lab | Alta no uso BR tech |
| **Lapso** | *brunch* | Alta no gatilho; **≠** lema |
| **Comércio** | Ramo de atividade | Alta como metáfora; **fora** do objecto |
| **Main** | Nome do ramo-base em muitos repos | Alta no uso; **não** é o lema |

Bom ofício: **nomear o ramo**, editar no chão, [commitar](${commitar}) o limpo, [Faça o melhor!](${mantra}). Mau: achar que *brunch* é comando, ou que o ramo da [planta](${planta}) se dá \`checkout\`.

Fecho: [Valeu !!!](${valeu}) — o melhor recorte *desta* sala *hoje*: o ramo da planta fica planta; o *branch* é linha; *brunch* é mesa.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Árvore de trabalho](${arvoreTrabalho}) | O chão — *work three* já cortado |
| [Commitar](${commitar}) | Grava **no** ramo |
| [Árvore da Vida](${arvoreVida}) · [planta](${planta}) | A planta fica planta |
| [Três](${tres}) | O número; não é *branch* |
| [Caminho](${caminho}) · [node](${node}) | Rota e nó — não a linha toda |
| [Gíria](${giria}) · [a orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método *branch* / *brunch* |
| [Língua portuguesa](${lingua}) · [gesto](${gesto}) · [verdade](${verdade}) | Como se fala o ofício |
| [Guia de Palavras](${guia}) · [Valeu !!!](${valeu}) · [Faça o melhor!](${mantra}) | Glossário e fecho |
| [gitglossary](${GIT_GLOSS}) · [git-branch](${GIT_BRANCH}) | Fonte de ofício |

## Limites

- Não ensina \`git checkout -b\`, *merge*, *rebase* nem a guerra *main* / *master*.  
- Não abre ficha de **checkout** nem de **staging** nesta entrega — andares seguintes.  
- Não poda plantas. Não recomenda brunch.  
- *Ramo de atividade* fica metáfora comercial, fora do objecto.

## Status

**Aprovado na série Palavras** — *ramo* fichado com a [planta](${planta}) primeiro; *branch* é a linha de rasto; [a orelha cola](${orelhaCola}) **brunch**; a [árvore de trabalho](${arvoreTrabalho}) é o chão; a [Árvore da Vida](${arvoreVida}) fica planta. [Faça o melhor!](${mantra})

[▶ Palavras](${hub}) · [▶ Árvore de trabalho](${arvoreTrabalho}) · [▶ Commitar](${commitar}) · [▶ Árvore da Vida](${arvoreVida}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ramo** (Lat. *ramus*, the plant’s arm) and English *branch* (git): a **named line of history**. After [working tree](${arvoreTrabalho}). [The ear glues](${orelhaCola}) *brunch* onto *branch*. The etymon **cuts**. [Do your best!](${mantra})

> **Method note:** [ramo](${WIKT_RAMO}), [branch](${WIKT_BRANCH}), [brunch](${WIKT_BRUNCH}), [gitglossary](${GIT_GLOSS}). **Not** a git tutorial. **Not** pruning. **Not** Sunday brunch. Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **ramo** / *branch* |
| Plant | Lat. *ramus* first — [Árvore da Vida](${arvoreVida}) stays plant |
| Slip | **brunch** — meal ≠ line |
| Not | [working tree](${arvoreTrabalho}) (the floor) · [commitar](${commitar}) (the snapshot) |
| Date | ${inspected} |

The object is the **line**. [Valeu !!!](${valeu})

## Status

**Approved in Words** — plant first; git branch is the line; ear-glue *brunch* cut.

[▶ Words](${hub}) · [▶ Working tree](${arvoreTrabalho}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ramo** (lat. *ramus*, brazo de la [planta](${planta})) y del inglés *branch* (git): la **línea de rastro**. Después de la [árvore de trabalho](${arvoreTrabalho}). [El oído pega](${orelhaCola}) *brunch* a *branch*. El étimo **corta**. [¡Haz lo mejor!](${mantra})

> **Nota:** [ramo](${WIKT_RAMO}), [branch](${WIKT_BRANCH}), [brunch](${WIKT_BRUNCH}), [gitglossary](${GIT_GLOSS}). **No** es tutorial git. Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **ramo** / *branch* |
| Planta | Lat. *ramus* primero — [Árvore da Vida](${arvoreVida}) sigue planta |
| Lapsus | **brunch** — comida ≠ línea |
| No es | [árvore de trabalho](${arvoreTrabalho}) · [commitar](${commitar}) |
| Fecha | ${inspected} |

El objeto es la **línea**. [¡Valeu !!!](${valeu})

## Estado

**Aprobada en Palabras** — planta primero; *branch* es la línea; cola *brunch* cortada.

[▶ Palabras](${hub}) · [▶ Árbol de trabajo](${arvoreTrabalho}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildRamoPost() {
  const { body, contentEn, contentEs } = buildRamoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-ramo', 245);
  return makePalavra({
    title: 'Inspeção: Ramo — branch; a planta primeiro; a orelha cola brunch',
    titleEn: 'Inspection: Ramo — branch; the plant first; the ear glues brunch',
    titleEs: 'Inspección: Ramo — branch; la planta primero; el oído pega brunch',
    excerpt:
      'Palavras: ramo (lat. ramus) × git branch — linha de rasto; a orelha cola brunch; ≠ árvore de trabalho ≠ Árvore da Vida; Faça o melhor!',
    excerptEn:
      'Words: ramo (Lat. ramus) × git branch — line of history; the ear glues brunch; ≠ working tree ≠ Árvore da Vida; Do your best!',
    excerptEs:
      'Palabras: ramo (lat. ramus) × git branch — línea de rastro; el oído pega brunch; ≠ árvore de trabalho ≠ Árvore da Vida; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-ramo',
    date: '2026-08-23T01:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Ramo · palavra',
    coverImage: COVER,
    sourceUrl: WIKT_RAMO,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRamoPost,
  buildRamoBodies
};
