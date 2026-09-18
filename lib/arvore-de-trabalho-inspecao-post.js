'use strict';

/**
 * Inspeção Palavras · árvore de trabalho (working tree)
 * Eixos: calco git · work tree ≠ work three (orelha cola)
 * · working tree ≠ git worktree · ≠ Árvore da Vida
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/arvore-de-trabalho-palavra-cover.jpg';
const GIT_GLOSS = 'https://git-scm.com/docs/gitglossary';
const GIT_WORKTREE = 'https://git-scm.com/docs/git-worktree';
const WIKT_TREE = 'https://en.wiktionary.org/wiki/tree';
const WIKT_ARVORE = 'https://pt.wiktionary.org/wiki/árvore';
const WIKT_TRABALHO = 'https://pt.wiktionary.org/wiki/trabalho';
const WIKT_THREE = 'https://en.wiktionary.org/wiki/three';

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

function buildArvoreDeTrabalhoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-arvore-de-trabalho.html';
  const arvoreVida = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const giria = '/posts/post-inspecao-palavra-giria.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const ramo = '/posts/post-inspecao-palavra-ramo.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da expressão **[árvore de trabalho](${self})** — calco do inglês *working tree* (git): o **chão de ficheiros** que se edita. Pedido de campo: *inspeção em árvore de trabalho work three*. [A orelha cola](${orelhaCola}) *work **three*** (*três*) em *work **tree*** (*árvore*). O étimo **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [gitglossary · working tree](${GIT_GLOSS}), [\`git worktree\`](${GIT_WORKTREE}), [Wiktionary · tree](${WIKT_TREE}), [árvore](${WIKT_ARVORE}), [trabalho](${WIKT_TRABALHO}), [three](${WIKT_THREE}). **Ficha ≠ tutorial git. Ficha ≠ protocolo de silvicultura.** Série [Palavras](${hub}).

**Gatilho:** *árvore de trabalho* / *work tree* / *working tree* / *worktree* / *work three*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **árvore de trabalho** |
| Inglês de ofício | *working tree* · *work tree* · comando *worktree* |
| Lapso de campo | **work three** — a orelha lê *três* onde o ofício escreve *tree* |
| Classe | Locução (PT) · termo de ofício (EN) |
| Étimo (trabalho) | Ing. *work* + *tree* (árvore de ficheiros) → calco PT **árvore de trabalho** — confiança **alta** no ofício git; **alta** no corte *three* ≠ *tree* |
| Tipo BudGanja | Palavra — chão de ofício × par ilusório *three* × planta [Árvore da Vida](${arvoreVida}) |
| Não é | **work three** (três) · **Árvore da Vida** (fase sénior do lab) · *tree* da informática (estrutura) · \`git worktree\` (segunda árvore) · [commitar](${commitar}) (o snapshot) |
| Elo ofício | [commitar](${commitar}) · [upsert](${upsert}) · [node](${node}) · [script](${script}) · [caminho](${caminho}) |
| Fonte | [gitglossary](${GIT_GLOSS}) · [git-worktree](${GIT_WORKTREE}) |
| Data | ${inspected} |

**O que é o objecto:** a **cópia viva** dos ficheiros no disco — onde a mão escreve. Não é o número três. Não é a planta sénior do laboratório.

## O que a orelha cola — e o étimo corta

Pedido: *work three*. *Three* = inglês **[três](${tres})** (germ. *þrīz*). *Tree* = inglês **árvore** (germ. *trewą*) — [tree](${WIKT_TREE}). O número vive na ficha [três](${tres}); aqui só o **lapso**.

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **work tree** | Frase solta | *working tree* — o chão de ficheiros |
| **work three** | O mesmo som | Lapso: *three* (três) ≠ *tree* (árvore) |
| **worktree** | Sinónimo exacto | Comando git: **outra** árvore ligada ao mesmo repositório |
| **árvore de trabalho** | Uma planta no escritório | Calco PT do *working tree* |
| **[Árvore da Vida](${arvoreVida})** | A mesma árvore | Fase sénior (semente → mudinha → árvore) — **outra** ficha |

O olho lê TREE / THREE: quase o mesmo desenho. [A orelha cola](${orelhaCola}); o [étimo](${etimologia}) solta.

## Hipóteses e método

**H1:** *working tree* no git é a **árvore concreta** (ficheiros *checked out*), não a metáfora da [planta](${planta}).  
**H2:** *work three* é **lapso de campo** — indexar, sem humilhar; método [gíria](${giria}) / *anival gerino*.  
**H3:** \`git worktree\` **acrescenta** uma árvore; não substitui a árvore principal.  
**H4:** [Árvore da Vida](${arvoreVida}) fica **planta**. Esta ficha fica **ofício**.  
**H5:** [commitar](${commitar}) **grava um corte** da árvore; não *é* a árvore.

## Três andares (não misturar)

| Andar | O que é | O que **não** é |
|-------|---------|-----------------|
| **1. Working tree** | Ficheiros no disco que se editam | O repositório nuzinho (\`.git\`) sozinho |
| **2. \`git worktree\`** | Segunda (ou terceira) árvore no **mesmo** repo | Clonar de novo; «work three» como número |
| **3. Commit** | Snapshot com rasto — [commitar](${commitar}) | A árvore ainda suja no editor |

**Irmãos de fluxo:** [ramo](${ramo}) → árvore de trabalho → [commitar](${commitar}) → push. Esta ficha é **só o chão**.

## Camadas vivas de *tree*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ofício git** | Working tree / worktree | Alta |
| **Calco PT** | Árvore de trabalho | Alta no lab |
| **Lapso** | Work three | Alta no gatilho; **≠** lema |
| **Planta** | Lat. *arbor* — [Árvore da Vida](${arvoreVida}) | Alta; **outra** sala |
| **Informática** | Árvore de dados (nós e folhas) | Alta no corte; [node](${node}) é o nó, não o chão |

Bom ofício: **editar na árvore**, [commitar](${commitar}) o limpo, [respeito](${gesto}) ao rasto. Mau: achar que *work three* é um terceiro turno, ou que a [Árvore da Vida](${arvoreVida}) é um checkout.

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* sala *hoje*: a árvore de trabalho é o chão; *three* é número; a Vida é planta.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Ramo](${ramo}) · [Commitar](${commitar}) · [upsert](${upsert}) · [script](${script}) | Linha, snapshot, fundir, correr |
| [Node](${node}) · [caminho](${caminho}) | Nó e rota — não são a árvore toda |
| [Árvore da Vida](${arvoreVida}) · [planta](${planta}) | A planta fica planta |
| [Gíria](${giria}) · [três](${tres}) · [a orelha cola…](${orelhaCola}) · [etimologia](${etimologia}) | Método do corte *three* / *tree* |
| [Língua portuguesa](${lingua}) · [gesto](${gesto}) · [verdade](${verdade}) | Como se fala o ofício |
| [Guia de Palavras](${guia}) · [Valeu !!!](${mantra}) | Glossário e fecho |
| [gitglossary](${GIT_GLOSS}) · [git-worktree](${GIT_WORKTREE}) | Fonte de ofício |

## Limites

- Não ensina \`git worktree add\`, não autoriza dois checkouts a pisar o mesmo ramo à força.  
- Não funde com [Árvore da Vida](${arvoreVida}).  
- *Work three* = lapso, não lema.  
- *Working directory* no glossário git aponta à working tree — não abrir ficha à parte nesta entrega.

## Status

**Aprovado na série Palavras** — *árvore de trabalho* fichada como *working tree* (chão de ficheiros); [a orelha cola](${orelhaCola}) **work three**; \`git worktree\` é a árvore a mais; a [Árvore da Vida](${arvoreVida}) fica planta.

[▶ Palavras](${hub}) · [▶ Ramo](${ramo}) · [▶ Commitar](${commitar}) · [▶ Árvore da Vida](${arvoreVida}) · [▶ Guia](${guia})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **árvore de trabalho** — a calque of English *working tree* (git): the **live files on disk**. Field request: *work three*. [The ear glues](${orelhaCola}) *three* (the number) onto *tree* (the tree). The etymon **cuts**.

> **Method note:** [gitglossary](${GIT_GLOSS}), [\`git worktree\`](${GIT_WORKTREE}), [tree](${WIKT_TREE}), [three](${WIKT_THREE}). **Not** a git tutorial. **Not** the lab’s [Árvore da Vida](${arvoreVida}). Series [Words](${hub}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **árvore de trabalho** / *working tree* |
| Slip | **work three** — *three* ≠ *tree* |
| Extra tree | \`git worktree\` — another checkout on the same repo |
| Not | [Árvore da Vida](${arvoreVida}) (plant) · [commitar](${commitar}) (the snapshot) |
| Date | ${inspected} |

The object is the **working floor**. [Valeu !!!](${mantra})

## Status

**Approved in Words** — working tree filed; ear-glue *work three* cut; plant-tree stays on the Vida sheet.

[▶ Words](${hub}) · [▶ Commit](${commitar}) · [gitglossary](${GIT_GLOSS})
`;

  const contentEs = `## Alcance

Inspección de **árvore de trabalho** — calco del inglés *working tree* (git): los **ficheros vivos en disco**. Pedido: *work three*. [El oído pega](${orelhaCola}) *three* (tres) a *tree* (árbol). El étimo **corta**.

> **Nota:** [gitglossary](${GIT_GLOSS}), [\`git worktree\`](${GIT_WORKTREE}). **No** es tutorial git. **No** es la [Árvore da Vida](${arvoreVida}). Serie [Palabras](${hub}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **árvore de trabalho** / *working tree* |
| Lapsus | **work three** — *three* ≠ *tree* |
| Árbol extra | \`git worktree\` — otro checkout en el mismo repo |
| No es | [Árvore da Vida](${arvoreVida}) · [commitar](${commitar}) |
| Fecha | ${inspected} |

El objeto es el **suelo de ofício**. [¡Valeu !!!](${mantra})

## Estado

**Aprobada en Palabras** — working tree fichado; cola *work three* cortada.

[▶ Palabras](${hub}) · [▶ Commit](${commitar}) · [gitglossary](${GIT_GLOSS})
`;

  return { body, contentEn, contentEs };
}

function buildArvoreDeTrabalhoPost() {
  const { body, contentEn, contentEs } = buildArvoreDeTrabalhoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-arvore-de-trabalho', 244);
  return makePalavra({
    title: 'Inspeção: Árvore de trabalho — working tree; a orelha cola work three',
    titleEn: 'Inspection: Working tree — árvore de trabalho; the ear glues work three',
    titleEs: 'Inspección: Árbol de trabajo — working tree; el oído pega work three',
    excerpt:
      'Palavras: árvore de trabalho (*working tree*) — chão de ficheiros; a orelha cola work three; ≠ git worktree ≠ Árvore da Vida; Valeu !!!',
    excerptEn:
      'Words: árvore de trabalho (working tree) — files on disk; the ear glues work three; ≠ git worktree ≠ Árvore da Vida; Valeu !!!',
    excerptEs:
      'Palabras: árvore de trabalho (working tree) — ficheros en disco; el oído pega work three; ≠ git worktree ≠ Árvore da Vida; ¡Valeu !!!',
    slug: 'inspecao-palavra-arvore-de-trabalho',
    date: '2026-08-23T01:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Árvore de trabalho · palavra',
    coverImage: COVER,
    sourceUrl: GIT_GLOSS,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildArvoreDeTrabalhoPost,
  buildArvoreDeTrabalhoBodies
};
