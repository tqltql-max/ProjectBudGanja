'use strict';

/**
 * Inspeção Palavras · magnífico
 * Eixos: étimo magnificus (magnus + facere) · elogio BR · escala de louvor · Valeu !!!
 * Elos (só slugs existentes): legal · genial · fabuloso · fantástico · incrível · maravilhoso · aff
 * Gatilho tipográfico: mafianioddpo → magnífico
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildMagnificoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const jesus = '/posts/post-inspecao-expressao-jesusamado.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/magn%C3%ADfico';
  const wikiEn = 'https://en.wiktionary.org/wiki/magnificus';
  const wikiMagno = 'https://pt.wiktionary.org/wiki/magno';

  const body = `## Escopo

Inspeção editorial da palavra **magnífico** — adjetivo (e interjeição de elogio no português do Brasil). Étimo: latim *magnificus* ← *magnus* («grande») + *-ficus* (de *facere*, «fazer») — «que faz grande / esplêndido». No uso vivo BR, «magnífico!» é **louvor alto** do quotidiano — irmão de [genial](${genial}), [fabuloso](${fabuloso}) e [maravilhoso](${maravilhoso}), com matiz de **grandeza** / esplendor (não só engenho). Gatilho tipográfico frequente: *mafianioddpo* → **magnífico** (teclado / boca → forma canónica). No laboratório Inspetor BudGanja, celebra feito com método; **não** substitui [gesto](${gesto}) nem [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · magnífico](${wiki}), [magnificus (EN)](${wikiEn}), [magno](${wikiMagno}), série [Palavras](${hub}). **Ficha ≠ guia de pompa vazia** — mapa lexical e de elogio. Escala de louvor só com fichas existentes. Sem afiliação comercial. Alternativa *máfia/mafioso* rejeitada: o cluster em curso é a **escala de louvor** (legal → genial → … → magnífico).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **magnífico** |
| Classe | Adjetivo · interjeição de elogio (uso oral BR) |
| Étimo (trabalho) | Lat. *magnificus* ← *magnus* + *-ficus* (*facere*) — «que faz grande / esplêndido» — confiança: alta |
| Família | *magnificência* · *magnificar* · *magno* · *magnitude* · fr. *magnifique* · esp. *magnífico* · ing. *magnificent* |
| Cognato EN | *magnificent* — mesmo tronco; louvor de grandeza / esplendor |
| Tipo BudGanja | Palavra — elogio BR × raiz de grandeza × risco de pompa |
| Gatilho tipográfico | *mafianioddpo* → **magnífico** (teclado / boca → forma canónica) |
| Elo elogio | [legal](${legal}) (gíria bacana) · [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) |
| Elo contraste | [aff](${aff}) — enfado (polo oposto do peito) |
| Elo afecto | [alegria](${alegria}) · [jesusamado](${jesus}) · [meudeusdoceu](${meudeus}) |
| Elo ofício | [criatividade](${criatividade}) · [verdade](${verdade}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · magnífico](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **esplêndido / grandioso** e, no BR de todos os dias, o **«que demais!»** com perfume de grandeza. O lab inspeciona **quando** a grandeza serve o feito e **quando** vira pompa sem [verdade](${verdade}).

## 2. Origem — magnificus × magnificent × elogio

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *magnus* | Grande | Alta |
| Lat. *-ficus* ← *facere* | Que faz / produz | Alta |
| Lat. *magnificus* | Esplêndido; que faz grande | Alta |
| PT *magnífico* | Admirável, esplêndido; elogio vivo | Alta |
| EN *magnificent* | Mesmo étimo; «grandioso / esplêndido» | Alta |
| BR quotidiano | «Magnífico!» ≈ louvor alto (peito + aprovação) | Alta (uso vivo) |
| Sombra culta | Pompa / cerimónia («discurso magnífico») — nem sempre elogio afectivo | Média–alta |

**H1:** *magnífico* herda o **fazer-grande** — esplendor nomeado, não só «ok».  
**H2:** no BR, o uso dominante é **elogio afectivo**, irmão de [genial](${genial}), [fabuloso](${fabuloso}) e [maravilhoso](${maravilhoso}).  
**H3:** a sombra «pompa / discurso grandioso» ainda existe no registo culto — o lab **não** apaga; só marca o eixo.

## 3. Escala de louvor BR (só fichas existentes)

| Polo | Ficha | Tom |
|------|-------|-----|
| Enfado / peso | [aff](${aff}) | «Já chega» — contraste |
| Aprovação leve / bacana | [legal](${legal}) (eixo gíria) | «Que legal!» — calor sem mito |
| Engenho reconhecido | [genial](${genial}) | Feito com método |
| Louvor «de conto» | [fabuloso](${fabuloso}) | Admirável com perfume de fábula |
| Fantasia / uau | [fantástico](${fantastico}) · [incrível](${incrivel}) | Fora do crível / maravilha |
| Assombro caloroso | [maravilhoso](${maravilhoso}) | Espanto + calor |
| Louvor de grandeza | **magnífico** (esta) | Esplendor / «que grande!» com rasto |
| Expansão afectiva | [alegria](${alegria}) · [jesusamado](${jesus}) | Peito, não escala de QI |
| Assombro alto | [meudeusdoceu](${meudeus}) | Espanto — outro registo |

**Veredicto de escala:** *magnífico* senta-se **perto de [maravilhoso](${maravilhoso}) / [fabuloso](${fabuloso}) / [genial](${genial})** no volume do elogio, com matiz de **grandeza / esplendor**; [legal](${legal}) (bacana) é mais leve; [aff](${aff}) fecha o peito. Podem coexistir — não são rivais.

| Bom × mau no lab | Exemplo |
|------------------|---------|
| Bom | «Magnífico o elo da ficha» + o que acertou | Elogio com objecto |
| Bom | Celebrar verso / cultivo / inspeção | [criatividade](${criatividade}) · [gesto](${gesto}) |
| Mau | «Já é magnífico, não precisa inspecionar» | Flattery — primo de [já](${ja}) / [aff](${aff}) |
| Mau | Usar *magnífico* para tapar falta de [verdade](${verdade}) | Pompa sem relatório |
| Mau | Confundir tipografia *mafianioddpo* com «máfia» | Eixos distintos — esta ficha é louvor |

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Elogiar** | «Magnífico!» no chat e na boca | Depois do commit — como [genial](${genial}) |
| **Nomear o esplendor** | Arte, feito, paisagem «magnífica» | Marcar eixo (grandeza × pompa vazia) |
| **Cognato EN** | *magnificent* = grand / splendid | Ponte útil; não traduzir cego |
| **Afecto** | Admiração com [alegria](${alegria}) | Peito + ofício |
| **Ardor** | Calor da grandeza nomeada | Bom: [fogo](${fogo}) com medida · Mau: labareda sem [caminho](${caminho}) |
| **Tipografia viva** | *mafianioddpo* e afins | Normalizar para **magnífico** sem humilhar o falante |
| **Fechar** | Depois do louvor, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** usar **magnífico** para **celebrar o esplêndido com rasto** — grandeza nomeada, pés no [gesto](${gesto}).

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje**, sem precisar ser «magnífico» absoluto |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se é magnífico, dispenso a [verdade](${verdade})» = falso |
| Anti-armadilha 2 | «Não sou magnífico, então paro» = falso · o lab corre no mantra |
| Par de elogio | [legal](${legal}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) |
| Par afectivo | [alegria](${alegria}) · [jesusamado](${jesus}) |
| Contraste | [aff](${aff}) |

**Veredicto:** Valeu !!! — e se sair **magnífico**, celebra com objecto; se não, celebra o ofício na mesma.

## Hipóteses (síntese)

**H1:** objeto = *magnus* + *-ficus* → *magnificus* → *magnífico* / *magnificent*.  
**H2:** BR quotidiano = louvor alto; sombra culta = «pompa / discurso grandioso».  
**H3:** escala = [aff](${aff}) ← → [legal](${legal}) ← → [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · **magnífico**.  
**H4:** fecho = [Valeu !!!](${mantra}) com rasto, sem culto vazio.  
**H5:** tipografia *mafianioddpo* → **magnífico** (não *máfia*).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Genial](${genial}) · [Fabuloso](${fabuloso}) · [Fantástico](${fantastico}) · [Incrível](${incrivel}) · [Maravilhoso](${maravilhoso}) | Escala de louvor (fichas existentes) |
| [Aff](${aff}) | Contraste — enfado |
| [Alegria](${alegria}) · [jesusamado](${jesus}) · [meudeusdoceu](${meudeus}) | Afecto / assombro |
| [Criatividade](${criatividade}) · [Gesto](${gesto}) · [Verdade](${verdade}) | Prova do elogio |
| [Fogo](${fogo}) · [Caminho](${caminho}) | Ardor com medida |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é tratado de retórica clássica (*genus grande*).  
- Não exige «ser magnífico» para publicar inspeção.  
- Só liga fichas já publicadas na escala de louvor.  
- Tipografia *mafianioddpo* = ponte para a forma canónica, não chacota nem desvio para *máfia*.

## Status

**Aprovado** — **magnífico** fichado: étimo *magnificus* / *magnificent*; elogio BR quotidiano; escala com irmãs publicadas; tipografia mafianioddpo → magnífico; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Fabuloso](${fabuloso}) · [▶ Fantástico](${fantastico}) · [▶ Incrível](${incrivel}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Aff](${aff}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **magnífico** — adjective and BR praise interjection. Etymon: Lat. *magnificus* ← *magnus* + *-ficus* (*facere*) — “great-making / splendid.” Everyday BR “magnífico!” is **high praise** — near [genial](${genial}), [fabuloso](${fabuloso}) and [maravilhoso](${maravilhoso}), with a **grandeur / splendour** tint. Common typo trigger: *mafianioddpo* → **magnífico**. Celebrates a deed with method; does **not** replace [gesture](${gesto}) or [Valeu !!!](${mantra}).

> Method note: [Wiktionary · magnífico](${wiki}), [magnificus](${wikiEn}). Praise scale only links **existing** sheets. Alt reading *máfia* rejected — ongoing cluster is the praise scale.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **magnífico** |
| Etymon | Lat. *magnificus* ← *magnus* + *-ficus* — high confidence |
| Lab type | BR praise × grandeur root × pomp risk |
| Links | [legal](${legal}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [aff](${aff}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses & praise scale

Splendid / grand · everyday “how magnificent!” · cultured shadow “pompous grandeur.” Scale (existing): [aff](${aff}) ← → [legal](${legal}) (cool) ← → [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · **magnífico**. Good = praise with object; bad = “already magnificent, skip inspection” ([já](${ja}) / [aff](${aff})).

## 4. Purpose

Praise after the commit · name splendour carefully · bridge EN *magnificent* · normalize typos without shaming · close with [Valeu !!!](${mantra}).

## 5. Valeu !!!

Best possible **today** — no need to be absolutely “magnificent.” Trap: praise that skips [truth](${verdade}).

## Status

**Approved** — *magnificus* / *magnificent* etymon; BR everyday praise; scale with existing sheets; typo mafianioddpo → magnífico; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Fabuloso](${fabuloso}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Aff](${aff}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **magnífico** — adjetivo e interjección de elogio BR. Étimo: lat. *magnificus* ← *magnus* + *-ficus* (*facere*) — «que hace grande / espléndido». En el BR cotidiano, «¡magnífico!» es **elogio alto** — cerca de [genial](${genial}), [fabuloso](${fabuloso}) y [maravilhoso](${maravilhoso}), con matiz de **grandeza** / esplendor. Gatillo tipográfico: *mafianioddpo* → **magnífico**. Celebra el hecho con método; **no** sustituye [gesto](${gesto}) ni [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · magnífico](${wiki}), [magnificus](${wikiEn}). Escala de elogio solo con fichas **existentes**. Lectura alt. *máfia* rechazada — el cluster en curso es la escala de louvor.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **magnífico** |
| Étimo | Lat. *magnificus* ← *magnus* + *-ficus* |
| Tipo lab | Elogio BR × raíz de grandeza × riesgo de pompa |
| Vínculos | [legal](${legal}) · [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [aff](${aff}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y escala

Espléndido · «¡qué grande!» · sombra culta «pompa». Escala: [aff](${aff}) ← → [legal](${legal}) ← → [genial](${genial}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · **magnífico**. Bueno = elogio con objeto; malo = «ya es magnífico, no inspecciones».

## 4. Para qué sirve

Elogiar después del commit · nombrar el esplendor con cuidado · puente EN *magnificent* · normalizar typos · cerrar con [¡Valeu !!!](${mantra}).

## 5. ¡Valeu !!!

Lo mejor posible **hoy** — sin exigir ser «magnífico» absoluto. Trampa: elogio que salta la [verdad](${verdade}).

## Estado

**Aprobada** — étimo *magnificus* / *magnificent*; elogio BR; escala con fichas existentes; tipografía mafianioddpo → magnífico; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Fabuloso](${fabuloso}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Aff](${aff}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMagnificoPost() {
  const { body, contentEn, contentEs, wiki } = buildMagnificoBodies();
  return makePalavra({
    title:
      'Inspeção: Magnífico — magnificus, elogio BR e Valeu !!!',
    titleEn:
      'Inspection: Magnífico — magnificus, BR praise and Valeu !!!',
    titleEs:
      'Inspección: Magnífico — magnificus, elogio BR y ¡Valeu !!!',
    excerpt:
      'Palavras: «magnífico» (lat. *magnificus* / *magnificent*) — elogio BR quotidiano; escala com legal, genial, fabuloso, fantástico, incrível, maravilhoso; tipografia mafianioddpo → magnífico.',
    excerptEn:
      'Words: “magnífico” (Lat. *magnificus* / *magnificent*) — everyday BR praise; scale with legal, genial, fabuloso, fantástico, incrível, maravilhoso; typo mafianioddpo → magnífico.',
    excerptEs:
      'Palabras: «magnífico» (lat. *magnificus* / *magnificent*) — elogio BR cotidiano; escala con legal, genial, fabuloso, fantástico, incrível, maravilloso; tipografía mafianioddpo → magnífico.',
    slug: 'inspecao-palavra-magnifico',
    date: '2026-08-03T23:15:00.000Z',
    seriesOrder: 72,
    seriesLabel: 'Magnífico · palavra',
    coverImage: '/imagens/inspecoes/magnifico-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMagnificoPost,
  buildMagnificoBodies
};
