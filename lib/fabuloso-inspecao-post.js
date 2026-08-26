'use strict';

/**
 * Inspeção Palavras · fabuloso
 * Eixos: étimo fábula / fabulous · elogio BR quotidiano · escala de louvor · Valeu !!!
 * Elos (só slugs existentes): genial · legal · especial · fantástico · alegria · criatividade · verdade · gesto
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildFabulosoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const magnifico = '/posts/post-inspecao-palavra-magnifico.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const jesus = '/posts/post-inspecao-expressao-jesusamado.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/fabuloso';
  const wikiFabula = 'https://pt.wiktionary.org/wiki/f%C3%A1bula';
  const wikiEn = 'https://en.wiktionary.org/wiki/fabulous';

  const body = `## Escopo

Inspeção editorial da palavra **fabuloso** — adjetivo (e interjeição de elogio no português do Brasil). Étimo: latim *fābula* («narrativa, conto») → *fabulōsus* → PT *fabuloso* / ing. *fabulous*. No uso vivo BR, «fabuloso!» é **louvor alto** do quotidiano — quase irmão de [genial](${genial}), [fantástico](${fantastico}) e da gíria [legal](${legal}) («bacana»), com um matiz de **conto** / maravilha. Gatilho tipográfico frequente: *fabsulkaoso* → **fabuloso**. No laboratório Inspetor BudGanja, celebra feito com método; **não** substitui [gesto](${gesto}) nem [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fabuloso](${wiki}), [fábula](${wikiFabula}), [fabulous (EN)](${wikiEn}), série [Palavras](${hub}). **Ficha ≠ crítica literária de fábulas** — mapa lexical e de elogio. Escala de louvor só com fichas existentes ([legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico})). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fabuloso** |
| Classe | Adjetivo · interjeição de elogio (uso oral BR) |
| Étimo (trabalho) | Lat. *fābula* («conto, narrativa») → *fabulōsus* («cheio de fábulas / lendário») → PT *fabuloso* — confiança: alta |
| Família | *fábula* · *fabular* · *fabulista* · *infabulação* · fr. *fabuleux* · esp. *fabuloso* · ing. *fabulous* |
| Cognato EN | *fabulous* — mesmo tronco; no EN contemporâneo também = «ótimo / incrível» (elogio) |
| Tipo BudGanja | Palavra — elogio BR × raiz de fábula × risco de hype |
| Gatilho tipográfico | *fabsulkaoso* → **fabuloso** (teclado / boca → forma canónica) |
| Elo elogio | [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) |
| Elo afecto | [alegria](${alegria}) · [jesusamado](${jesus}) · [meudeusdoceu](${meudeus}) |
| Elo ofício | [criatividade](${criatividade}) · [verdade](${verdade}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · fabuloso](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **lendário / admirável** e, no BR de todos os dias, o **«que demais!»** — louvor com perfume de conto. O lab inspeciona **quando** o perfume serve o feito e **quando** vira fumaça sem [verdade](${verdade}).

## 2. Origem — fábula × fabulous × elogio

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *fābula* | Conto, narrativa, falar | Alta |
| Lat. *fabulōsus* | Cheio de fábulas; lendário; às vezes «pouco crível» | Alta |
| PT *fabuloso* | Admirável, extraordinário; elogio vivo | Alta |
| EN *fabulous* | Mesmo étimo; hoje também «awesome / great» | Alta |
| BR quotidiano | «Fabuloso!» ≈ louvor alto (peito + aprovação) | Alta (uso vivo) |
| Sombra clássica | «História fabulosa» = inventada / lendária (não só elogio) | Alta–média |

**H1:** *fabuloso* herda a **fábula** — o extraordinário nomeado como se viesse de um conto.  
**H2:** no BR, o uso dominante é **elogio afectivo**, irmão de [genial](${genial}), [fantástico](${fantastico}) e da gíria [legal](${legal}).  
**H3:** a sombra «inventado / pouco crível» ainda existe no registo culto — o lab **não** apaga; só marca o eixo.

## 3. Escala de louvor BR (só fichas existentes)

| Polo | Ficha | Tom |
|------|-------|-----|
| Aprovação leve / bacana | [legal](${legal}) (eixo gíria) | «Que legal!» — calor sem mito |
| Particular / distinto | [especial](${especial}) | Seleção, não hype universal |
| Engenho reconhecido | [genial](${genial}) | Feito com método |
| Fantasia / uau | [fantástico](${fantastico}) · [incrível](${incrivel}) | Fora do crível / maravilha |
| Louvor «de conto» | **fabuloso** (esta) | Admirável / «que demais!» com perfume de fábula |
| Assombro caloroso | [maravilhoso](${maravilhoso}) | Espanto + calor |
| Louvor de grandeza | [magnífico](${magnifico}) | Esplendor / «que grande!» |
| Expansão afectiva | [alegria](${alegria}) · [jesusamado](${jesus}) | Peito, não escala de QI |
| Assombro alto | [meudeusdoceu](${meudeus}) | Espanto — outro registo |

**Veredicto de escala:** *fabuloso* senta-se **perto de [fantástico](${fantastico}), [maravilhoso](${maravilhoso}) e [genial](${genial})** no volume do elogio, com matiz de **fábula / fabulous**; [legal](${legal}) (bacana) é mais leve; [especial](${especial}) marca particularidade. Rede só com slugs publicados.

| Bom × mau no lab | Exemplo |
|------------------|---------|
| Bom | «Fabuloso o elo da ficha» + o que acertou | Elogio com objecto |
| Bom | Celebrar verso / cultivo / inspeção | [criatividade](${criatividade}) · [gesto](${gesto}) |
| Mau | «Já é fabuloso, não precisa inspecionar» | Flattery — primo de [já](${ja}) / [aff](${aff}) |
| Mau | Usar *fabuloso* para tapar falta de [verdade](${verdade}) | Hype sem relatório |
| Mau | Confundir elogio com «é só fábula» (mentira) | Eixos distintos |

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Elogiar** | «Fabuloso!» no chat e na boca | Depois do commit — como [genial](${genial}) |
| **Nomear o lendário** | Contos, mitos, «história fabulosa» | Marcar eixo (conto × mentira × louvor) |
| **Cognato EN** | *fabulous* = great / legendary | Ponte útil; não traduzir cego |
| **Afecto** | Admiração com [alegria](${alegria}) | Peito + ofício |
| **Tipografia viva** | *fabsulkaoso* e afins | Normalizar para **fabuloso** sem humilhar o falante |
| **Fechar** | Depois do louvor, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** usar **fabuloso** para **celebrar o admirável com rasto** — perfume de fábula, pés no [gesto](${gesto}).

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, sem precisar ser «fabuloso» absoluto |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se é fabuloso, dispenso a [verdade](${verdade})» = falso |
| Anti-armadilha 2 | «Não sou fabuloso, então paro» = falso · o lab corre no mantra |
| Par de elogio | [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) |
| Par afectivo | [alegria](${alegria}) · [jesusamado](${jesus}) |

**Veredicto:** Valeu !!! — e se sair **fabuloso**, celebra com objecto; se não, celebra o ofício na mesma.

## Hipóteses (síntese)

**H1:** objeto = *fābula* → *fabulōsus* → *fabuloso* / *fabulous*.  
**H2:** BR quotidiano = louvor alto; sombra culta = «lendário / inventado».  
**H3:** escala = [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · **fabuloso** · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}).  
**H4:** fecho = [Valeu !!!](${mantra}) com rasto, sem culto vazio.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Especial](${especial}) · [Genial](${genial}) · [Fantástico](${fantastico}) · [Incrível](${incrivel}) · [Maravilhoso](${maravilhoso}) · [Magnífico](${magnifico}) | Escala de louvor (fichas existentes) |
| [Alegria](${alegria}) · [jesusamado](${jesus}) · [meudeusdoceu](${meudeus}) | Afecto / assombro |
| [Criatividade](${criatividade}) · [Gesto](${gesto}) · [Verdade](${verdade}) | Prova do elogio |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é tratado de literatura de fábulas.  
- Não exige «ser fabuloso» para publicar inspeção.  
- Só liga fichas já publicadas na escala de louvor.  
- Tipografia *fabsulkaoso* = ponte para a forma canónica, não chacota.

## Status

**Aprovado** — **fabuloso** fichado: étimo *fábula* / *fabulous*; elogio BR quotidiano; escala com irmãs publicadas; tipografia fabsulkaoso → fabuloso; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Genial](${genial}) · [▶ Fantástico](${fantastico}) · [▶ Incrível](${incrivel}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Magnífico](${magnifico}) · [▶ Legal](${legal}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **fabuloso** — adjective and BR praise interjection. Etymon: Lat. *fābula* → *fabulōsus* → PT *fabuloso* / Eng. *fabulous*. Everyday BR “fabuloso!” is **high praise** — near [genial](${genial}), [fantástico](${fantastico}), [maravilhoso](${maravilhoso}) and slang [legal](${legal}) (“cool”), with a **fable / wonder** tint. Common typo trigger: *fabsulkaoso* → **fabuloso**. Celebrates a deed with method; does **not** replace [gesture](${gesto}) or [Valeu !!!](${mantra}).

> Method note: [Wiktionary · fabuloso](${wiki}), [fábula](${wikiFabula}), [fabulous](${wikiEn}). Praise scale only links **existing** sheets.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **fabuloso** |
| Etymon | Lat. *fābula* → *fabulōsus* — high confidence |
| Lab type | BR praise × fable root × hype risk |
| Links | [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses & praise scale

Wonder / admirable · everyday “how great!” · cultured shadow “legendary / made-up.” Scale (existing): [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · **fabuloso** · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}). Good = praise with object; bad = “already fabulous, skip inspection” ([já](${ja}) / [aff](${aff})).

## 4. Purpose

Praise after the commit · name the legendary carefully · bridge EN *fabulous* · normalize typos without shaming · close with [Valeu !!!](${mantra}).

## 5. Valeu !!!

Best possible **today** — no need to be absolutely “fabulous.” Trap: praise that skips [truth](${verdade}).

## Status

**Approved** — *fábula* / *fabulous* etymon; BR everyday praise; scale with existing sheets; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Genial](${genial}) · [▶ Fantástico](${fantastico}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fabuloso** — adjetivo e interjección de elogio BR. Étimo: lat. *fābula* → *fabulōsus* → PT *fabuloso* / ing. *fabulous*. En el BR cotidiano, «¡fabuloso!» es **elogio alto** — cerca de [genial](${genial}), [fantástico](${fantastico}), [maravilhoso](${maravilhoso}) y la jerga [legal](${legal}) («bacán»), con matiz de **cuento** / maravilla. Gatillo tipográfico: *fabsulkaoso* → **fabuloso**. Celebra el hecho con método; **no** sustituye [gesto](${gesto}) ni [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · fabuloso](${wiki}), [fábula](${wikiFabula}), [fabulous](${wikiEn}). Escala de elogio solo con fichas **existentes**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **fabuloso** |
| Étimo | Lat. *fābula* → *fabulōsus* |
| Tipo lab | Elogio BR × raíz de fábula × riesgo de hype |
| Vínculos | [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y escala

Admirable · «¡qué bueno!» · sombra culta «legendario / inventado». Escala: [legal](${legal}) · [especial](${especial}) · [genial](${genial}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · **fabuloso** · [maravilhoso](${maravilhoso}) · [magnífico](${magnifico}). Bueno = elogio con objeto; malo = «ya es fabuloso, no inspecciones».

## 4. Para qué sirve

Elogiar después del commit · nombrar lo legendario con cuidado · puente EN *fabulous* · normalizar typos · cerrar con [¡Valeu !!!](${mantra}).

## 5. ¡Valeu !!!

Lo mejor posible **hoy** — sin exigir ser «fabuloso» absoluto. Trampa: elogio que salta la [verdad](${verdade}).

## Estado

**Aprobada** — étimo *fábula* / *fabulous*; elogio BR; escala con fichas existentes; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Genial](${genial}) · [▶ Fantástico](${fantastico}) · [▶ Maravilhoso](${maravilhoso}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFabulosoPost() {
  const { body, contentEn, contentEs, wiki } = buildFabulosoBodies();
  return makePalavra({
    title:
      'Inspeção: Fabuloso — fábula, elogio BR e Valeu !!!',
    titleEn:
      'Inspection: Fabuloso — fable, BR praise and Valeu !!!',
    titleEs:
      'Inspección: Fabuloso — fábula, elogio BR y ¡Valeu !!!',
    excerpt:
      'Palavras: «fabuloso» (lat. *fābula* / *fabulous*) — elogio BR quotidiano; escala com genial, fantástico, incrível, maravilhoso, magnífico; tipografia fabsulkaoso → fabuloso.',
    excerptEn:
      'Words: “fabuloso” (Lat. *fābula* / *fabulous*) — everyday BR praise; scale with genial, fantástico, incrível, maravilhoso, magnífico; typo fabsulkaoso → fabuloso.',
    excerptEs:
      'Palabras: «fabuloso» (lat. *fābula* / *fabulous*) — elogio BR cotidiano; escala con genial, fantástico, incrível, maravilloso, magnífico; tipografía fabsulkaoso → fabuloso.',
    slug: 'inspecao-palavra-fabuloso',
    date: '2026-08-03T22:10:00.000Z',
    seriesOrder: 81,
    seriesLabel: 'Fabuloso · palavra',
    coverImage: '/imagens/inspecoes/fabuloso-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFabulosoPost,
  buildFabulosoBodies
};
