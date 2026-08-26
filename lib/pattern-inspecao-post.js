'use strict';

/**
 * Inspeção Palavras · Pattern
 * Eixos: loanword EN · molde / padrão · design pattern ·
 * repetição reconhecível · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPatternBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const sugestao = '/posts/post-inspecao-palavra-sugestao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://en.wiktionary.org/wiki/pattern';
  const wikiPt = 'https://pt.wiktionary.org/wiki/padr%C3%A3o';

  const body = `## Escopo

Inspeção editorial da palavra **pattern** — loanword do inglês para **molde**, **padrão** ou **modelo que se repete**. No português do Brasil entra forte em design, costura, comportamento e código (*design pattern*). Esta ficha cobre o **objeto**, o eixo **pattern × padrão**, o ofício de **reconhecer estrutura sem congelar o pensamento**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · pattern](${wiki}), [padrão](${wikiPt}), série [Palavras](${hub}). **Ficha ≠ manual de engenharia de software.** Tom: Inspetor BudGanja — *pattern* é [gesto](${gesto}) de ler repetição; sem afiliação a framework.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **pattern** (EN em uso BR) |
| Classe | Substantivo (também verbo em EN: *to pattern*) |
| Étimo (trabalho) | latim *patronus* («protetor / modelo») → francês antigo *patron* («molde») → inglês *pattern* — confiança: **alta** no trajeto geral |
| Família (EN) | *pattern* · *design pattern* · *patterned* · *patterning* |
| Paralelos PT | *padrão* · *molde* · *modelo* · *esquema* |
| Tipo BudGanja | Palavra — repetição reconhecível × ofício |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [risco](${risco}) · [sugestão](${sugestao}) |
| Elo léxico | [língua portuguesa](${lingua}) · [verdade](${verdade}) · [Guia](${guia}) |
| Fonte | [Wiktionary · pattern](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a **forma que se repete** e, por isso, se nomeia — tecido, conduta, layout ou solução de código. No lab: atalho de leitura; não dogma.

## 2. Pattern × padrão × design pattern

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **pattern** | Loan EN (tech / design / oral) | Soa “de oficina” no BR vivo |
| **padrão** | PT nativo / culto | Preferir em texto formal do lab |
| **molde / modelo** | Costura, referência | Ênfase no *template* |
| **design pattern** | Solução nomeada a problema recorrente | Catálogo — não lei natural |
| **padrão de conduta** | Comportamento previsível | Pode ser hábito útil ou vício |

**H1:** no lab BR, *pattern* = molde/padrão emprestado do inglês (alta confiança no uso).  
**H2:** reconhecer pattern acelera o [caminho](${caminho}) — copiar cego é [risco](${risco}).  
**H3:** *padrão* PT e *pattern* EN convivem; escolher conforme registro.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Desenho / tecido** | Motivo que se repete | Alta |
| **Molde** | Template (costura, UI, doc) | Alta |
| **Conduta** | Sequência previsível de alguém | Alta (uso vivo) |
| **Design pattern** | Solução tipificada em software | Alta (jargão) |
| **Verbo EN** | *to pattern* (formar segundo modelo) | Alta (EN) |
| **Ofício lab** | Ver estrutura sem parar de inspecionar | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *pattern* |
|-------|------------------------|
| [Gesto](${gesto}) · [caminho](${caminho}) | Repetir bem ≠ repetir no automático |
| [Risco](${risco}) | Pattern errado aplicado “porque é o pattern” |
| [Sugestão](${sugestao}) | Proposta pode nascer de um pattern visto |
| [Verdade](${verdade}) | O molde descreve — não substitui o caso |
| [Língua portuguesa](${lingua}) | Loanword × *padrão* / *molde* |
| [Vida](${vidaPalavra}) | Hábitos também são patterns |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Tem um pattern»** | Bug / comportamento recorrente | Nomear a repetição = primeiro [gesto](${gesto}) |
| **«Siga o pattern»** | UI / docs / código | Útil se o contexto bate; senão, [risco](${risco}) |
| **Design pattern** | Catálogo (Factory, Observer…) | Ferramenta — não religião |
| **Preferir PT** | Padrão / molde | Em fichas formais do lab |
| **Ofício** | Inspeção com estrutura | Pattern ajuda a ver; [verdade](${verdade}) decide se serve |

**Finalidade-mãe:** nomear o **pattern** para **ler repetição com ofício** — útil quando revela estrutura; perigoso quando congela o experimento.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com o molde certo para este caso**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «É o pattern» ≠ argumento fechado · «serve *aqui*?» = ofício |
| Par vivo | [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) |

**Veredicto:** Valeu !!! **também ao escolher o molde**. Pattern sem olhar = cópia; pattern com [verdade](${verdade}) = aceleração.

## Hipóteses (síntese)

**H1:** objeto = EN *pattern* → molde/padrão no BR vivo.  
**H2:** ofício = reconhecer repetição a serviço do [caminho](${caminho}).  
**H3:** elos = [gesto](${gesto}) · [risco](${risco}) · [sugestão](${sugestao}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é curso de *design patterns*.  
- Loanword ≠ apagar *padrão* / *molde*.  
- Pattern nomeado ≠ verdade do caso concreto.

## Status

**Aprovado** — **pattern** fichado: molde EN, repetição reconhecível, rede com gesto/caminho e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Caminho](${caminho}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **pattern** as used in Brazilian Portuguese — English loanword for a **mold**, **template**, or **recognizable repetition** (incl. *design pattern*). Links [gesto](${gesto}), [caminho](${caminho}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · pattern](${wiki}). Not a software-engineering manual.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **pattern** |
| Sense | Mold / repeating model |
| Lab type | Recognizable structure × craft |
| Links | [gesto](${gesto}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **with the right mold for this case**, today.

## Status

**Approved** — mold · repetition · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **pattern** en uso BR — préstamo del inglés para **molde**, **plantilla** o **repetición reconocible** (incl. *design pattern*). Vínculos [gesto](${gesto}), [caminho](${caminho}), [¡Valeu !!!](${mantra}).

> Nota: [Wiktionary · pattern](${wiki}). No es manual de ingeniería de software.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **pattern** |
| Sentido | Molde / modelo que se repite |
| Tipo lab | Estructura reconocible × oficio |
| Vínculos | [gesto](${gesto}) · [caminho](${caminho}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **con el molde correcto para este caso**, hoy.

## Estado

**Aprobado** — molde · repetición · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPatternPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPatternBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 102;
  return makePalavra({
    title: 'Inspeção: Pattern — molde, padrão e repetição',
    titleEn: 'Inspection: Pattern — mold, template and repetition',
    titleEs: 'Inspección: Pattern — molde, plantilla y repetición',
    excerpt:
      'Palavras: «pattern» (EN) — molde / padrão / design pattern no BR; elos gesto, caminho, risco; Valeu !!!',
    excerptEn:
      'Words: “pattern” (EN) — mold / template / design pattern in BR use; links gesto, caminho, risco; Valeu !!!',
    excerptEs:
      'Palabras: «pattern» (EN) — molde / plantilla / design pattern en uso BR; vínculos gesto, caminho, risco; ¡Valeu !!!',
    slug: 'inspecao-palavra-pattern',
    date: '2026-08-03T20:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Pattern · palavra',
    coverImage: '/imagens/inspecoes/pattern-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPatternPost,
  buildPatternBodies
};
