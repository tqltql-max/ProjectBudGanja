'use strict';

/**
 * Inspeção Palavras · memorável
 * Eixos: lat. memorabilis · «que fica na memória» · elogio BR
 * Distinto da escala de intensidade (legal / genial / incrível / …):
 * memorável aponta retenção; a escala aponta aprovação/intensidade.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildMemoravelBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const fabuloso = '/posts/post-inspecao-palavra-fabuloso.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const livro = '/posts/post-inspecao-palavra-livro.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/memor%C3%A1vel';
  const wikiMemoria = 'https://pt.wiktionary.org/wiki/mem%C3%B3ria';
  const wikiLat = 'https://en.wiktionary.org/wiki/memorabilis';

  const body = `## Escopo

Inspeção editorial da palavra **memorável** — o que **merece ficar na memória** e o que, no português do Brasil, também serve de elogio («foi memorável!»). Esta ficha cobre o **objeto** (lat. *memorabilis*), o eixo **retenção × memória**, o uso **de elogio**, e o contraste com a **escala de intensidade/aprovação** já fichada ([legal](${legal}), [genial](${genial}), [incrível](${incrivel}), [maravilhoso](${maravilhoso}), [fantástico](${fantastico}), [fabuloso](${fabuloso})) — sem confundir «fica» com «uau».

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · memorável](${wiki}), [memória](${wikiMemoria}), [memorabilis (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ psicologia da memória** — mapa lexical e de ofício. Digitação de origem («memeopravel») lida como **memorável** (não *meme*). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **memorável** |
| Classe | Adjectivo |
| Étimo (trabalho) | Latim *memorabilis* («digno de memória; notável») ← *memor* / *memoria* — confiança: **alta** |
| Família | *memória* · *memorial* · *memorar* · *imemorável* · *comemoração* |
| Cognatos | esp. *memorable* · fr. *mémorable* · it. *memorabile* · ing. *memorable* |
| Tipo BudGanja | Palavra — retenção digna × elogio BR × ofício que fica |
| Elo memória | [Divertida Mente](${divertida}) · [emoção](${emocao}) · [livro](${livro}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Valeu !!!](${mantra}) |
| Elo escala (≠) | [legal](${legal}) · [genial](${genial}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) — intensidade/aprovação, não retenção |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · memorável](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que marca o **que gruda** — cena, verso, ficha, dia — e, por extensão afectiva no BR, o elogio do que «valeu a pena lembrar».

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *memor* / *memoria* | Que lembra; faculdade de lembrar | Alta |
| Lat. *memorabilis* | Digno de ser lembrado; notável | Alta |
| PT *memorável* | Que fica na memória; marcante | Alta |
| Elogio BR | «Noite memorável», «jogo memorável» — aprovação + retenção | Alta (uso vivo) |
| Antónimo útil | *Esquecível* / *esquecido* / *imemorável* (outro eixo: sem memória registada) | Média |

**H1:** *memorável* nasce na **memória** (*memorabilis*) — o chão é retenção, não volume de elogio.  
**H2:** no BR oral, o adjectivo **também** elogia — mas o lab pergunta: *fica* ou só *soa alto*?  
**H3:** confundir *memorável* com [genial](${genial}) / [maravilhoso](${maravilhoso}) apaga a ferramenta: um mede **ader** na memória; os outros medem **intensidade/particularidade**.

## 3. Memória × escala de elogio

| Palavra | Eixo principal | Pergunta do lab |
|---------|----------------|-----------------|
| **memorável** | Retenção — merece ficar | «Isto cola depois do scroll?» |
| [legal](${legal}) | Aprovação leve / eixo jurídico (outra ficha) | «Bacana ou lei?» |
| [genial](${genial}) | Engenho / intensidade de aprovação | «Há feito rastreável?» |
| [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) | Assombro / maravilha | «É peito alto ou rasto?» |
| [fantástico](${fantastico}) · [fabuloso](${fabuloso}) | Fantasia / fábula + elogio | «Mundo imaginário ou só «uau»?» |
| [aff](${aff}) / [buguei](${buguei}) | Peito cansado / tranco | «Ainda há ofício depois do sopro?» |

### Dois usos de «memorável»

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Retenção** | «Verso memorável» · «ficha memorável» | Bom: nomear o que cola · Mau: chamar memorável o que some amanhã |
| **Elogio de noite/feito** | «Foi memorável!» | Bom: calor com objecto · Mau: flattery sem [gesto](${gesto}) nem [verdade](${verdade}) |
| **Marketing** | «Experiência memorável!» | Bom: se houver rasto · Mau: hype = tudo memorável = nada |

**Veredicto contraste:** a escala [legal](${legal}) / [genial](${genial}) / [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) / [fabuloso](${fabuloso}) / [incrível](${incrivel}) mede **como soa o peito agora**. *Memorável* mede **o que ainda está cá depois**. Podem coincidir — não são a mesma ferramenta.

## 4. Memorável × projecto BudGanja

| Peça | O que pode ser memorável (com método) | Elo |
|------|----------------------------------------|-----|
| [Inspeções / Palavras](${hub}) | Étimo limpo, elo que cola, frase que volta | [verdade](${verdade}) · [criatividade](${criatividade}) |
| [Vida](${vida}) · [poemas](${poemMantra}) | Verso que fica no peito | [Valeu !!!](${mantra}) |
| [Diário](${diario}) | Dia registado — memória com data | [gesto](${gesto}) |
| [Livro](${livro}) | Página que se reabre | Memória externa |
| [Divertida Mente](${divertida}) · [emoção](${emocao}) | Memória afectiva como metáfora de ecrã (≠ protocolo clínico) | Artes × Palavras |
| [Caminho](${caminho}) | Passo que se lembra porque foi feito | Ofício |

**Leitura de projecto:** memorável no BudGanja é o **rasto** — ficha publicada, verso no ar, dia no diário — não o slogan antes do commit.

## 5. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Nomear retenção** | O que merece memória | Distinguir de elogio vazio |
| **Elogiar com critério** | «Foi memorável» + o quê | Objecto + [gesto](${gesto}) |
| **Arquivar com cuidado** | Livro, diário, ficha | [Livro](${livro}) · [Diário](${diario}) |
| **Não confundir eixos** | Memória ≠ intensidade | [Genial](${genial}) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) |
| **Fechar** | Depois do mapa, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** usar **memorável** para o que **fica** — e, quando for elogio, amarrar ao objecto memorado.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **hoje** pode tornar-se memorável **depois** |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se eu acho genial / maravilhoso, é memorável» = falso · intensidade ≠ retenção |
| Anti-armadilha 2 | «Tudo foi memorável» = nada foi · diluição |
| Par de método | [Verdade](${verdade}) · [gesto](${gesto}) · [caminho](${caminho}) |

**Veredicto:** Valeu !!! **para que algo possa ser memorável** — ofício agora; memória como efeito, não como atalho.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Hub Inspeções](${hubAll}) · [Guia Palavras](${guia}) | Onde o rasto vira ficha |
| [Legal](${legal}) · [Genial](${genial}) · [Incrível](${incrivel}) · [Maravilhoso](${maravilhoso}) · [Fantástico](${fantastico}) · [Fabuloso](${fabuloso}) | Escala de intensidade/aprovação — irmãs, eixo distinto |
| [Criatividade](${criatividade}) · [Verdade](${verdade}) · [Gesto](${gesto}) | Prova do que merece memória |
| [Livro](${livro}) · [Diário](${diario}) · [Vida](${vida}) | Suportes de retenção |
| [Divertida Mente](${divertida}) · [emoção](${emocao}) | Memória afectiva na cultura de ecrã |
| [Língua portuguesa](${lingua}) | Solo do adjectivo |
| [aff](${aff}) · [buguei](${buguei}) | Quando o peito não grava — ainda assim inspecionar |

## Limites

- Não é protocolo clínico de memória nem diagnóstico.  
- Não exige «obra-prima» para ser memorável — exige **rasto**.  
- Elogio memorável ≠ dispensar a próxima inspeção.  
- «Meme» / internet humour **não** é o objecto desta ficha (decode de «memeopravel» → **memorável**).

## Status

**Aprovado** — **memorável** fichada como *memorabilis*: digno de memória e elogio BR com critério; eixo **retenção** distinto da escala de intensidade ([genial](${genial}), [maravilhoso](${maravilhoso}), [fantástico](${fantastico})…); uso com objecto e rasto sim; hype sem memória = ressalva.

[▶ Palavras](${hub}) · [▶ Inspeções](${hubAll}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Fantástico](${fantastico}) · [▶ Livro](${livro}) · [▶ Divertida Mente](${divertida}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Word sheet for Portuguese **memorável** — *worth remembering* and, in BR use, praise (“it was memorable!”). Core: Lat. *memorabilis*. Distinct from intensity praise ([genial](${genial}), [maravilhoso](${maravilhoso}), [fantástico](${fantastico}), [fabuloso](${fabuloso}), [incrível](${incrivel}), [legal](${legal})): **memorável** = retention; praise-scale = intensity/approval.

> Method: [Wiktionary · memorável](${wiki}), [memorabilis](${wikiLat}). Not clinical memory science. Typo source “memeopravel” read as **memorável** (not *meme*).

## Object

| Field | Value |
|-------|-------|
| Word | **memorável** |
| Class | Adjective |
| Etymon | Lat. *memorabilis* ← *memor* / *memoria* |
| Memory links | [Inside Out / Divertida Mente](${divertida}) · [emotion](${emocao}) · [book](${livro}) |
| Craft links | [gesture](${gesto}) · [truth](${verdade}) · [creativity](${criatividade}) · [Valeu !!!](${mantra}) |
| Scale (≠) | [legal](${legal}) · [genial](${genial}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) |
| Date | ${inspected} |

## Memory × praise scale

| Word | Main axis |
|------|-----------|
| **memorável** | Retention — does it stick? |
| [genial](${genial}) · [legal](${legal}) | Approval / ingenuity |
| [maravilhoso](${maravilhoso}) · [incrível](${incrivel}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) | High intensity / wonder |

Intensity praise measures **how the chest sounds now**. *Memorável* measures **what is still here later**.

## BudGanja

Memorable = **trace** (published sheet, verse live, day in the diary) — not a slogan before the commit. [Vida](${vida}) · [Diário](${diario}) · [book](${livro}) · [Inspections](${hub}).

## Status

**Approved** — retention axis distinct from intensity praise; empty hype = caveat.

[▶ Words](${hub}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Ficha de **memorável** — *digno de memoria* y, en uso BR, elogio («¡fue memorable!»). Núcleo: lat. *memorabilis*. Distinto de la escala de intensidad ([genial](${genial}), [maravilhoso](${maravilhoso}), [fantástico](${fantastico}), [fabuloso](${fabuloso}), [incrível](${incrivel}), [legal](${legal})): **memorável** = retención; escala = intensidad/aprobación.

> Método: [Wiktionary · memorável](${wiki}), [memorabilis](${wikiLat}). No es psicología clínica. «memeopravel» → **memorável** (no *meme*).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **memorável** |
| Clase | Adjetivo |
| Étimo | Lat. *memorabilis* ← *memor* / *memoria* |
| Vínculos memoria | [Divertida Mente](${divertida}) · [emoción](${emocao}) · [libro](${livro}) |
| Oficio | [gesto](${gesto}) · [verdad](${verdade}) · [creatividad](${criatividade}) · [¡Valeu !!!](${mantra}) |
| Escala (≠) | [legal](${legal}) · [genial](${genial}) · [incrível](${incrivel}) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) |
| Fecha | ${inspected} |

## Memoria × escala de elogio

| Palabra | Eje |
|---------|-----|
| **memorável** | Retención — ¿queda? |
| [genial](${genial}) · [legal](${legal}) | Aprobación / ingenio |
| [maravilhoso](${maravilhoso}) · [incrível](${incrivel}) · [fantástico](${fantastico}) · [fabuloso](${fabuloso}) | Intensidad alta |

## BudGanja

Memorable = **rastro** (ficha publicada, verso al aire, día en el diario). [Vida](${vida}) · [Diario](${diario}) · [libro](${livro}).

## Estado

**Aprobada** — eje de retención distinto de la escala de intensidad; hype vacío = salvedad.

[▶ Palabras](${hub}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMemoravelPost() {
  const { body, contentEn, contentEs, wiki } = buildMemoravelBodies();
  return makePalavra({
    title:
      'Inspeção: Memorável — o que fica na memória e o elogio com rasto',
    titleEn:
      'Inspection: Memorável — what sticks in memory and praise with a trace',
    titleEs:
      'Inspección: Memorável — lo que queda en la memoria y el elogio con rastro',
    excerpt:
      'Palavras: «memorável» (lat. memorabilis) — digno de memória; elogio BR; eixo retenção ≠ escala legal/genial/maravilhoso/fantástico; Valeu !!!',
    excerptEn:
      'Words: “memorável” (Lat. memorabilis) — worth remembering; BR praise; retention axis ≠ legal/genial/maravilhoso intensity; Valeu !!!',
    excerptEs:
      'Palabras: «memorável» (lat. memorabilis) — digno de memoria; elogio BR; eje retención ≠ intensidad legal/genial/maravilhoso; ¡Valeu !!!',
    slug: 'inspecao-palavra-memoravel',
    date: '2026-08-03T22:10:00.000Z',
    seriesOrder: 36,
    seriesLabel: 'Memorável · palavra',
    coverImage: '/imagens/inspecoes/memoravel-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMemoravelPost,
  buildMemoravelBodies
};
