'use strict';

/**
 * Inspeção Palavras · commitar (grafia viva comitar)
 * Empréstimo BR do EN git commit — gravar o rasto.
 * ≠ cometer (crime/erro). Tríade: tónos → vomitar → commitar.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/commitar-palavra-cover.jpg';
const WIKI = 'https://en.wiktionary.org/wiki/commit';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildCommitarBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-commitar.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const vomitar = '/posts/post-inspecao-palavra-vomitar.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiCommittere = 'https://en.wiktionary.org/wiki/committo#Latin';
  const wikiPtCometer = 'https://pt.wiktionary.org/wiki/cometer';
  const wikiGit = 'https://en.wikipedia.org/wiki/Commit_(version_control)';

  const body = `## Escopo

Inspeção editorial da palavra **[commitar](${self})** — verbo BR de ofício, calco do inglês *to commit* (git). Pedido de campo: **[tónos](${tonos})**, **[vomitar](${vomitar})**, **commitar** (tipografia viva *comitar*). Aqui o gesto é **gravar o que fica** — snapshot com rasto — **sem** confundir com **cometer** (crime, erro) nem com push/PR.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · commit](${WIKI}), [committō](${wikiCommittere}), [cometer](${wikiPtCometer}), [commit (VCS)](${wikiGit}). **Ficha ≠ tutorial git. Ficha ≠ desculpa para force-push.** Empréstimo consciente, como [skill](${skill}) e [Grok](${grok}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **commitar** |
| Grafia viva | *comitar* (pedido de campo) — o **mesmo** objecto; mm do étimo EN |
| Classe | Verbo (BR tech) · substantivo informal *o commit* |
| Étimo (trabalho) | Lat. *committere* «juntar, confiar» → EN *commit* → git (2005–) → BR **commitar** — confiança **alta** no calco; **média** na grafia mm (norma ainda oscila) |
| Falso irmão | **cometer** (PT herdado) — crime, falta, equívoco — [cometer](${wikiPtCometer}) **não** é esta ficha |
| Tipo BudGanja | Palavra — empréstimo de rasto × tríade de ofício |
| Elo tríade | [tónos](${tonos}) (segurar) · [vomitar](${vomitar}) (largar) |
| Elo elogio | [genial](${genial}) — «depois do commit», não antes do trabalho |
| Elo teclado | [backspace](${backspace}) — apagar ≠ gravar |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Fonte | [commit](${WIKI}) · [commit (VCS)](${wikiGit}) |
| Data | ${inspected} |

**Objeto:** o vocábulo de **fixar um estado no rasto** (git e, por metáfora lab, ficha publicada). Não é «cometer um crime». Não é o push. Não é o PR.

## 2. Hipóteses e método

**H1:** *commitar* no BR é **empréstimo de ofício**, não herança popular de *committere*.  
**H2:** *comitar* (um m) é **tipografia viva** do mesmo verbo — normalizar sem humilhar, como outras fichas de lapso.  
**H3:** *cometer* é **outra palavra** (crime/erro); homofonia aproximada não funde os objectos.  
**H4:** no lab, [genial](${genial}) e irmãs elogiam **depois** do commit; o commit não substitui [Valeu !!!](${mantra}).  
**H5:** tríade: [tónos](${tonos}) → [vomitar](${vomitar}) o ruído → **commitar** o limpo.

Passos: calco EN → grafia *comitar* → ≠ cometer → git / lab / push-PR → limites.

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **1. Git** | Gravar um snapshot com mensagem | *git push*, PR, merge, deploy |
| **2. Lab** | Ficha no ar, rasto no diário, verso publicado | Elogio vazio antes do [gesto](${gesto}) |
| **3. Compromisso EN** | *commit to* = comprometer-se | Não apaga *compromisso* em PT |
| **4. Cometer** | Outro verbo — falta / crime | **Fora** desta ficha |

**Irmãos de fluxo (não fundir):** *commit* → *push* → *PR* — três gestos; esta ficha é **só o primeiro**.

## 4. Tríade de ofício

| Peça | Gesto | Mau uso |
|------|-------|---------|
| **[tónos](${tonos})** | Segurar — onde aperta | Commitar no pânico da tensão |
| **[vomitar](${vomitar})** | Largar o que não fica | Commitar o vómito (diff de ruído) |
| **[commitar](${self})** | Gravar o que fica | Pose de git sem [verdade](${verdade}) |

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Inglês no meio do PT** | Estrago da língua | Empréstimo de [ofício](${gesto}), como [skill](${skill}) |
| **comitar** | Erro grave | Mesmo verbo; mm do *commit* |
| **cometer** | O mesmo som | Crime/erro — **outra** ficha de dicionário |
| **Commit = publicar o site** | Um só botão | Commit ≠ push ≠ deploy |

## 6. Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Gravar o rasto** | \`git commit\` | Ficha + mensagem que diz o **porquê** |
| **Separar o fluxo** | commit / push / PR | Não misturar na mesma frase-objecto |
| **Elogiar depois** | «Genial!» | [genial](${genial}) **após** o commit |
| **Fechar** | Depois do snapshot | [Valeu !!!](${mantra}) — o commit não dispensa o ofício |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[tónos](${tonos})** · **[vomitar](${vomitar})** | Tríade: tensão → filtro → rasto |
| [genial](${genial}) | Elogio depois do commit |
| [skill](${skill}) · [Grok](${grok}) | Outros empréstimos de ofício |
| [backspace](${backspace}) | Apagar no teclado ≠ gravar no git |
| [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) · [caminho](${caminho}) | Como se commita |
| [língua portuguesa](${lingua}) · [Valeu !!!](${mantra}) · [Guia](${guia}) · [Vida](${vida}) | Índice e fecho |

## Limites

- Não ensina git, não autoriza \`--force\` em \`main\`, não substitui o hook.  
- Não trata *cometer um crime* nesta ficha.  
- *comitar* / *commitar* / *commit* (substantivo de ofício) = o mesmo gesto lab; push e PR ficam de fora.

## Veredicto

**Aprovado na série Palavras** — *commitar* (*comitar*) fichado como **empréstimo de rasto**; ≠ *cometer*; tríade [tónos](${tonos}) · [vomitar](${vomitar}); elogio [genial](${genial}) depois; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tónos](${tonos}) · [▶ Vomitar](${vomitar}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian Portuguese **[commitar](${self})** — a workshop calque of English *to commit* (git). Field request: **[tónos](${tonos})**, **[vomitar](${vomitar})**, **commitar** (live spelling *comitar*). The gesture is **record what stays**. It is **not** Portuguese *cometer* (to commit a crime/error), and not push/PR.

> Independent audit. **Sheet ≠ git tutorial or force-push licence.**

## Object

| Field | Value |
|-------|-------|
| Word | **commitar** / live *comitar* |
| Etymon | Lat. *committere* → EN *commit* → git → BR **commitar** |
| False sibling | **cometer** — crime/fault — another word |
| Links | [tónos](${tonos}) · [vomitar](${vomitar}) · [genial](${genial}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Offices

1. **Git** — snapshot + message; not push, PR, or deploy.  
2. **Lab** — published sheet / diary trace — praise like [genial](${genial}) comes **after**.  
3. **EN *commit to*** — to pledge; does not erase PT *compromisso*.

**Triad:** hold ([tónos](${tonos})) → drop noise ([vomitar](${vomitar})) → **commitar** the clean remainder.

**Verdict:** calque approved; [Valeu !!!](${mantra}) after the snapshot.

[▶ Words](${hub}) · [▶ Tónos](${tonos}) · [▶ Vomitar](${vomitar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[commitar](${self})** — calco BR del inglés *to commit* (git). Pedido: **[tónos](${tonos})**, **[vomitar](${vomitar})**, **commitar** (grafía viva *comitar*). El gesto es **grabar lo que queda**. **No** es *cometer* (delito/error) ni push/PR.

> Auditoría independiente. **Ficha ≠ tutorial git ni licencia de force-push.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **commitar** / viva *comitar* |
| Étimo | Lat. *committere* → EN *commit* → git → BR **commitar** |
| Falso hermano | **cometer** — delito/falta — otra palabra |
| Vínculos | [tónos](${tonos}) · [vomitar](${vomitar}) · [genial](${genial}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Oficios

1. **Git** — instantánea + mensaje; no push, PR ni deploy.  
2. **Lab** — ficha al aire / rastro; el elogio [genial](${genial}) llega **después**.  
3. **EN *commit to*** — comprometerse; no borra *compromiso*.

**Tríada:** sostener ([tónos](${tonos})) → soltar ruido ([vomitar](${vomitar})) → **commitar** lo limpio.

**Veredicto:** calco aprobado; [¡Valeu !!!](${mantra}) después del snapshot.

[▶ Palabras](${hub}) · [▶ Tónos](${tonos}) · [▶ Vomitar](${vomitar}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildCommitarPost() {
  const { body, contentEn, contentEs, wiki } = buildCommitarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-commitar', 147);
  return makePalavra({
    title: 'Inspeção: Commitar — gravar o rasto (comitar ≠ cometer)',
    titleEn: 'Inspection: Commitar — record the trace (comitar ≠ cometer)',
    titleEs: 'Inspección: Commitar — grabar el rastro (comitar ≠ cometer)',
    excerpt:
      'Palavras: «commitar» (*comitar*) — calco git; ≠ cometer; tríade tónos / vomitar; Valeu !!! depois do snapshot!',
    excerptEn:
      'Words: “commitar” (*comitar*) — git calque; ≠ cometer; triad tónos / vomitar; Valeu !!! after the snapshot!',
    excerptEs:
      'Palabras: «commitar» (*comitar*) — calco git; ≠ cometer; tríada tónos / vomitar; ¡Valeu !!! después del snapshot!',
    slug: 'inspecao-palavra-commitar',
    date: '2026-08-20T23:07:00.000Z',
    seriesOrder,
    seriesLabel: 'Commitar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildCommitarPost, buildCommitarBodies };
