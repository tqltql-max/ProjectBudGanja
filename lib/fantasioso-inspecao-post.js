'use strict';

/**
 * Inspeção Palavras · fantasioso
 * Eixos: fantasia + -oso · imaginativo / irrealista · ≠ fantástico · Faça o melhor!
 * Elos (só slugs existentes): criatividade · verdade · gesto · genial · fabuloso · especial · fantástico · maravilhoso · alegria
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildFantasiosoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const jesus = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/fantasioso';
  const wikiFantasia = 'https://pt.wiktionary.org/wiki/fantasia';
  const wikiEn = 'https://en.wiktionary.org/wiki/fanciful';

  const body = `## Escopo

Inspeção editorial da palavra **fantasioso** — adjetivo (também substantivado: «um fantasioso»). Étimo: *fantasia* + sufixo *-oso* («cheio de») → «cheio de fantasia». No português do Brasil nomeia a **pessoa ou ideia imaginativa / fanciful** — pode ser **elogio** («mente fantasiosa») ou **crítica leve** («não seja fantasioso»). Gatilho tipográfico: *fantatioso* → **fantasioso**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fantasioso](${wiki}), [fantasia](${wikiFantasia}), [fanciful (EN)](${wikiEn}), série [Palavras](${hub}). **Esta ficha ≠ ficha de [fantástico](${fantastico}).** *Fantástico* = admirável / extraordinário / género — Cap. irmã, eixos distintos. [Maravilhoso](${maravilhoso}) = assombro / elogio caloroso — outro vizinho, não sinónimo. Rede: [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [maravilhoso](${maravilhoso}) · [genial](${genial}). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fantasioso** |
| Classe | Adjetivo (pessoa / ideia / plano); às vezes substantivo («o fantasioso») |
| Étimo (trabalho) | Gr. *phantasía* → lat. *phantasia* → PT *fantasia* + *-oso* («cheio de») → *fantasioso* — confiança: alta |
| Família | *fantasia* · *fantasiar* · *fantasia* (roupa / imaginação) · *fantasma* (mesmo tronco grego, sentido distinto) |
| Cognatos | esp. *fantasioso* · fr. *fantaisiste* · ing. *fanciful* / *flighty* (sentido próximo, não cognato directo) |
| Tipo BudGanja | Palavra — imaginação × realismo × ofício |
| Gatilho tipográfico | *fantatioso* → **fantasioso** (teclado / boca → forma canónica) |
| ≠ [fantástico](${fantastico}) | Admirável / extraordinário / género — Cap. irmã; **não** sinónimo de *fantasioso* |
| Elo imaginação | [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) (eixos vizinhos, não sinónimos) |
| Elo ofício | [verdade](${verdade}) · [gesto](${gesto}) · [genial](${genial}) · [Faça o melhor!](${mantra}) |
| Elo afecto | [alegria](${alegria}) · [especial](${especial}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · fantasioso](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que marca quem (ou o quê) **vive de fantasia** — inventa cenários, exagera possibilidades, sonha alto. No lab: **bom** quando alimenta [criatividade](${criatividade}) com rasto; **mau** quando substitui [verdade](${verdade}) e [gesto](${gesto}) por castelo no ar.

## 2. Origem — fantasia × -oso × fanciful

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Gr. *phantasía* | Aparição, imaginação, representação mental | Alta |
| PT *fantasia* | Imaginação; também «roupa de fantasia» / desejo | Alta |
| *-oso* | «Cheio de / propenso a» | Alta |
| Adj. **fantasioso** | Cheio de fantasia; imaginativo; pouco realista | Alta |
| Elogio | «Que mente fantasiosa!» ≈ inventiva, viva | Alta (uso vivo) |
| Crítica leve | «Não seja fantasioso» ≈ volte ao chão | Alta (uso vivo) |
| Cognato de sentido | EN *fanciful* — idea/person given to fancy | Alta–média |

**H1:** *fantasioso* = **cheio de fantasia** — eixo da imaginação, não do «uau» de elogio puro.  
**H2:** no BR, o tom **oscila** — elogio da inventiva ou aviso de irrealismo.  
**H3:** [fantástico](${fantastico}) é **outra palavra** (admirável / género) — Cap. irmã; esta ficha distingue, não funde.

## 3. Fantasioso ≠ fantástico (e vizinhos)

| Palavra | Eixo | Cap. / status |
|---------|------|---------------|
| **fantasioso** (esta) | Pessoa/ideia **fanciful** — imaginação ± crítica | Esta ficha |
| [fantástico](${fantastico}) | Admirável / extraordinário / género fantasy | Cap. publicada — **≠** esta |
| [maravilhoso](${maravilhoso}) | Assombro / elogio caloroso | Cap. publicada — vizinho, não sinónimo |
| [fabuloso](${fabuloso}) | Louvor «de conto» / *fabulous* | Cap. publicada |
| [incrível](${incrivel}) | Inacreditável / elogio «uau» | Cap. publicada |
| [genial](${genial}) | Engenho reconhecido | Cap. publicada |
| [especial](${especial}) | Particular / distinto | Cap. publicada |
| [criatividade](${criatividade}) | Ofício de inventar forma **com** método | Cap. publicada |

**Veredicto de distinção:** dizer «idéia **fantasiosa**» ≠ dizer «idéia **fantástica**». A primeira aponta **fantasia / realismo** (pessoa ou plano cheio de fantasia); a segunda aponta **admiração / género** ([fantástico](${fantastico})). Confundir os dois esvazia a inspeção — e o gatilho tipográfico *fantatioso* → **fantasioso**, não *fantástico*.

| Bom × mau no lab | Exemplo |
|------------------|---------|
| Bom | «Proposta fantasiosa — e aqui o protótipo» | Imaginação + [gesto](${gesto}) |
| Bom | Celebrar mente fantasiosa que documenta | [criatividade](${criatividade}) |
| Bom | «Não seja fantasioso» = pedido de [verdade](${verdade}) | Crítica útil |
| Mau | Confundir com [fantástico](${fantastico}) («que uau!» / género) | Eixos distintos |
| Mau | Fantasia que dispensa inspeção («já está») | Primo de [já](${ja}) / [aff](${aff}) |
| Mau | Chamar «fantasioso» só para humilhar quem imagina | Crueldade ≠ método |

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Nomear inventiva** | «Pessoa fantasiosa» | Elo [criatividade](${criatividade}) |
| **Avisar irrealismo** | «Plano fantasioso» | Exigir [verdade](${verdade}) e rasto |
| **Elogiar imaginação** | Mente viva, cenário rico | Sem confundir com [fabuloso](${fabuloso}) / [fantástico](${fantastico}) |
| **Tipografia viva** | *fantatioso* e afins | Normalizar para **fantasioso** (não *fantástico*), sem humilhar |
| **Fechar** | Depois do sonho, o acto | [Faça o melhor!](${mantra}) · [caminho](${caminho}) |

**Finalidade-mãe:** usar **fantasioso** para mapear a **fantasia com pés** — imaginação que serve o ofício, ou aviso quando ela foge do [gesto](${gesto}).

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, mesmo sem ser [fantástico](${fantastico}) |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sou fantasioso, dispenso a [verdade](${verdade})» = falso |
| Anti-armadilha 2 | «Não sonho, logo não crio» = falso · [criatividade](${criatividade}) precisa de freio **e** de asa |
| Par imaginação | [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [genial](${genial}) |
| Par afectivo | [alegria](${alegria}) · [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) |

**Veredicto:** Faça o melhor — fantasioso **com** rasto; se a fantasia virar fuga, volte à ficha e ao [gesto](${gesto}).

## Hipóteses (síntese)

**H1:** objeto = *fantasia* + *-oso* → **fantasioso** (cheio de fantasia).  
**H2:** BR = elogio da inventiva **ou** crítica leve de irrealismo.  
**H3:** ≠ [fantástico](${fantastico}) (Cap. irmã); [maravilhoso](${maravilhoso}) = vizinho de assombro, não sinónimo.  
**H4:** fecho = [Faça o melhor!](${mantra}) com [criatividade](${criatividade}) + [verdade](${verdade}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Criatividade](${criatividade}) · [Verdade](${verdade}) · [Gesto](${gesto}) | Imaginação com método |
| [Fantástico](${fantastico}) | Cap. irmã — admiração / género (**≠** fantasioso) |
| [Maravilhoso](${maravilhoso}) · [Fabuloso](${fabuloso}) · [Incrível](${incrivel}) · [Genial](${genial}) · [Especial](${especial}) | Vizinhos de louvor / assombro (não sinónimos) |
| [Alegria](${alegria}) · [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) | Afecto / assombro |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é tratado de literatura fantástica nem de psicologia clínica.  
- Liga [fantástico](${fantastico}) e [maravilhoso](${maravilhoso}) como Cap. irmãs / vizinhas de distinção — não sinónimos.  
- Não exige «parar de fantasiar» para publicar inspeção — exige rasto.  
- Tipografia *fantatioso* = ponte para **fantasioso** (não para *fantástico*), sem chacota.

## Status

**Aprovado** — **fantasioso** fichado: *fantasia* + *-oso*; elogio × crítica leve; distinção clara de [fantástico](${fantastico}); rede com [criatividade](${criatividade}), [verdade](${verdade}), [fabuloso](${fabuloso}); [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Criatividade](${criatividade}) · [▶ Verdade](${verdade}) · [▶ Fantástico](${fantastico}) · [▶ Fabuloso](${fabuloso}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **fantasioso** — adjective (also “a fanciful person”). Etymon: *fantasia* + *-oso* (“full of”) → “full of fantasy.” In BR use it names a **fanciful / imaginative** person or idea — **praise** (“what a fanciful mind!”) or **mild critique** (“don’t be unrealistic”). Typo trigger: *fantatioso* → **fantasioso**.

> Method note: [Wiktionary · fantasioso](${wiki}), [fantasia](${wikiFantasia}), [fanciful](${wikiEn}). **Not the sheet for [fantástico](${fantastico})** (admirable / genre) — sister Cap., distinct axes. [Maravilhoso](${maravilhoso}) = wonder / warm praise — neighbor, not synonym. Network: [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [maravilhoso](${maravilhoso}).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **fantasioso** |
| Etymon | *fantasia* + *-oso* — high confidence |
| Lab type | Imagination × realism × craft |
| ≠ [fantástico](${fantastico}) | Admirable / genre — sister Cap. |
| Links | [criatividade](${criatividade}) · [verdade](${verdade}) · [gesto](${gesto}) · [fantástico](${fantastico}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses & distinction

Full of fantasy · inventive praise · mild “get real” critique. Neighbors: [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [genial](${genial}). Good = fantasy with a trail; bad = confusing with [fantástico](${fantastico}) (“wow!”) or skipping [truth](${verdade}).

## 4. Purpose

Name inventiveness · warn unreality · normalize *fantatioso* → **fantasioso** (not *fantástico*) · close with [Do your best!](${mantra}).

## 5. Do your best!

Best possible **today** — fantasy with [gesture](${gesto}), not escape from [truth](${verdade}).

## Status

**Approved** — *fantasia* + *-oso*; praise × mild critique; clear ≠ [fantástico](${fantastico}); [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Criatividade](${criatividade}) · [▶ Fantástico](${fantastico}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fantasioso** — adjetivo (también «un fantasioso»). Étimo: *fantasia* + *-oso* («lleno de») → «lleno de fantasía». En el BR nombra a la persona o idea **imaginativa / poco realista** — **elogio** («¡qué mente fantasiosa!») o **crítica leve** («no seas fantasioso»). Gatillo tipográfico: *fantatioso* → **fantasioso**.

> Nota: [Wikcionario · fantasioso](${wiki}), [fantasia](${wikiFantasia}), [fanciful](${wikiEn}). **No es la ficha de [fantástico](${fantastico})** (admirable / género) — Cap. hermana, ejes distintos. [Maravilhoso](${maravilhoso}) = asombro / elogio cálido — vecino, no sinónimo. Red: [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [maravilhoso](${maravilhoso}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **fantasioso** |
| Étimo | *fantasia* + *-oso* |
| Tipo lab | Imaginación × realismo × oficio |
| ≠ [fantástico](${fantastico}) | Admirable / género — Cap. hermana |
| Vínculos | [criatividade](${criatividade}) · [verdade](${verdade}) · [gesto](${gesto}) · [fantástico](${fantastico}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y distinción

Lleno de fantasía · elogio inventivo · crítica leve «baja a tierra». Vecinos: [criatividade](${criatividade}) · [fabuloso](${fabuloso}) · [fantástico](${fantastico}) · [genial](${genial}). Bueno = fantasía con rastro; malo = confundir con [fantástico](${fantastico}) o saltar la [verdad](${verdade}).

## 4. Para qué sirve

Nombrar inventiva · avisar irrealismo · normalizar *fantatioso* → **fantasioso** (no *fantástico*) · cerrar con [¡Haz lo mejor!](${mantra}).

## 5. ¡Haz lo mejor!

Lo mejor posible **hoy** — fantasía con [gesto](${gesto}), no fuga de la [verdad](${verdade}).

## Estado

**Aprobada** — *fantasia* + *-oso*; elogio × crítica leve; ≠ [fantástico](${fantastico}); [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Criatividade](${criatividade}) · [▶ Fantástico](${fantastico}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFantasiosoPost() {
  const { body, contentEn, contentEs, wiki } = buildFantasiosoBodies();
  return makePalavra({
    title:
      'Inspeção: Fantasioso — fantasia, imaginação e ≠ fantástico',
    titleEn:
      'Inspection: Fantasioso — fantasy, imagination and ≠ fantástico',
    titleEs:
      'Inspección: Fantasioso — fantasía, imaginación y ≠ fantástico',
    excerpt:
      'Palavras: «fantasioso» (fantasia + -oso) — imaginativo / crítica leve «não seja fantasioso»; tipografia fantatioso → fantasioso; ≠ fantástico (Cap. irmã).',
    excerptEn:
      'Words: “fantasioso” (fantasia + -oso) — fanciful / mild “don’t be unrealistic”; typo fantatioso → fantasioso; ≠ fantástico (sister Cap.).',
    excerptEs:
      'Palabras: «fantasioso» (fantasia + -oso) — imaginativo / crítica leve; tipografía fantatioso → fantasioso; ≠ fantástico (Cap. hermana).',
    slug: 'inspecao-palavra-fantasioso',
    date: '2026-08-03T14:00:00.000Z',
    seriesOrder: 69,
    seriesLabel: 'Fantasioso · palavra',
    coverImage: '/imagens/inspecoes/fantasioso-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFantasiosoPost,
  buildFantasiosoBodies
};
