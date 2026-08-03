'use strict';

/**
 * Inspeção Palavras · maravilhoso
 * Eixos: maravilha · assombro · elogio BR · escala vs genial/aff · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildMaravilhosoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/maravilhoso';
  const wikiMaravilha = 'https://pt.wiktionary.org/wiki/maravilha';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Maravilha';

  const body = `## Escopo

Inspeção editorial da palavra **maravilhoso** — adjetivo (e sopro de elogio no português do Brasil) nascido de **maravilha**: o que causa **assombro**, admiração, o «não acredito que ficou assim». Esta ficha cobre o **objeto**, os **sentidos** (assombro × elogio quotidiano), uma **escala de intensidade** com [legal](${legal}), [genial](${genial}) e [aff](${aff}), e o fecho [Faça o melhor!](${mantra}). Tom: **calor**, não sermão.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · maravilhoso](${wiki}), [maravilha](${wikiMaravilha}), [Maravilha](${wikiEl}), uso oral BR. **Ficha ≠ culto do milagre nem guia de autoajuda.** Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **maravilhoso** |
| Classe | Adjetivo (também interjeição informal: «maravilhoso!») |
| Étimo (trabalho) | Lat. *mirabilia* / *mirabilis* («admirável; aquilo que causa espanto») → PT *maravilha* → *maravilhoso* — confiança: alta |
| Família | *maravilha* · *maravilhar* · *maravilhado* · *as sete maravilhas* · *mundo maravilhoso* |
| Cognatos | esp. *maravilloso* · fr. *merveilleux* · it. *meraviglioso* · ing. *marvelous* / *marvellous* |
| Tipo BudGanja | Palavra — assombro × elogio BR × ofício |
| Elo afecto | [alegria](${alegria}) · [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) |
| Elo elogio | [legal](${legal}) (gíria «bacana») · [genial](${genial}) (engenho) · **maravilhoso** (espanto / calor) |
| Elo contraste | [aff](${aff}) — enfado (polo oposto do peito) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · maravilhoso](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **admirável** — o que abre o peito em espanto ou em elogio quente. No BR do dia a dia: «que maravilhoso!» = aprovação afectiva forte, muitas vezes sem teologia. No BudGanja: celebra o feito **com** o método à vista.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *mirabilia* / *mirabilis* | O que se admira; «maravilhas» | Alta |
| Subst. *maravilha* | Espanto, prodígio, coisa admirável | Alta |
| Adj. **maravilhoso** | Cheio de maravilha; admirável | Alta |
| Elogio BR | «Que maravilhoso!» — calor, aprovação, às vezes hipérbole gentil | Alta (uso vivo) |
| Assombro | Par de tom com [meudeusdoceu](${meudeusdoceu}) (espanto alto) | Média–alta (mapa lab) |
| Afecto | Cruza [alegria](${alegria}) — expansão do peito | Alta (uso) |
| Ofício lab | Elogio depois do [gesto](${gesto}) rastreável | Média–alta (mapa BudGanja) |

**H1:** *maravilhoso* herda a **maravilha** — o admirável, não o «só ok».  
**H2:** no BR, o elogio quotidiano aquece sem exigir milagre nem doutrina.  
**H3:** no lab, «maravilhoso» **bom** = celebra o feito com [verdade](${verdade}); **mau** = flattery que fecha a ficha sem relatório.

## 3. Escala de intensidade (oralidade BR)

Mapa aproximado do peito — não ranking moral:

| Intensidade | Palavra / sopro | O que marca | Elo |
|-------------|-----------------|-------------|-----|
| Baixa / peso | [aff](${aff}) | Enfado, decepção, «já chega» | Contraste |
| Média / aprovação | [legal](${legal}) (gíria) | «Bacana / ok / massa» — elogio leve | Escada BR |
| Média+ / engenho | [genial](${genial}) | Ideia ou feito que **acertou o engenho** | Irmão de elogio |
| Alta / assombro | **maravilhoso** | Espanto + calor — «abriu o peito» | Esta ficha |
| Alta / exclamação | [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) | Assombro / afeto em sopro colado | Expressões |

**Leitura da escala:** [aff](${aff}) fecha; [legal](${legal}) (gíria) aprova com leveza; [genial](${genial}) aponta o **engenho**; **maravilhoso** aponta o **assombro caloroso**. Podem coexistir («genial e maravilhoso») — não são rivais. (O eixo jurídico de *legal* fica na ficha [legal](${legal}); aqui usamos só o polo «bacana».)

**Veredicto escala:** escolher a palavra com [verdade](${verdade}) — hipérbole gentil ok; elogio vazio que dispensa inspeção = ressalva.

## 4. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Assombro** | «Ficou maravilhoso» | Bom: nomear o peito · Mau: exagero sem objecto |
| **Elogio afectivo** | «Que maravilhoso te ver!» | Bom: calor · Mau: bajulação sem [gesto](${gesto}) |
| **Obra / feito** | Ficha, verso, cultivo que «abriu» | Bom: [criatividade](${criatividade}) · Mau: culto sem método |
| **Hipérbole quotidiana** | «Café maravilhoso» | Bom: humor afectivo · Mau: esvaziar a palavra |
| **Par com alegria** | Expansão do peito | Bom: [alegria](${alegria}) · Mau: negar o [aff](${aff}) quando ele chega |
| **Ardor** | Calor da admiração | Bom: [fogo](${fogo}) com medida · Mau: labareda sem [caminho](${caminho}) |

## 5. Para que serve · Faça o melhor!

| Finalidade | Leitura |
|------------|---------|
| **Nomear o assombro** | Sem vergonha de admirar |
| **Aquecer o ofício** | Elogio que aponta o feito, não a vaidade |
| **Separar calor de flattery** | Maravilhoso **com** relatório ≠ atalho |
| **Voltar ao acto** | Depois do «uau», o próximo [gesto](${gesto}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, mesmo quando o peito está maravilhado |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Já é maravilhoso, não preciso inspecionar» = falso |
| Termómetros | [aff](${aff}) · [legal](${legal}) · [genial](${genial}) · [alegria](${alegria}) · [meudeusdoceu](${meudeusdoceu}) |

**Veredicto:** Faça o melhor **com o maravilhoso** — deixar o peito abrir, creditando o feito; depois continuar o ofício. Maravilhoso sem [caminho](${caminho}) = pose; maravilhoso com método = lareira de admiração.

## Hipóteses (síntese)

**H1:** objeto = *maravilha* ← *mirabilia* → **maravilhoso** (admirável).  
**H2:** usos = assombro · elogio BR · hipérbole afectiva · ofício.  
**H3:** escala = [aff](${aff}) ← → [legal](${legal}) ← → [genial](${genial}) ← → **maravilhoso** (+ [meudeusdoceu](${meudeusdoceu})).  
**H4:** fecho = [Faça o melhor!](${mantra}) depois do «uau».

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Genial](${genial}) · [Aff](${aff}) | Escala de elogio × enfado |
| [Alegria](${alegria}) · [meudeusdoceu](${meudeusdoceu}) · [jesusamando](${jesusamando}) | Peito que abre |
| [Fogo](${fogo}) | Ardor da admiração com medida |
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Criatividade](${criatividade}) | Ofício sob o elogio |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo BR |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Depois do assombro |

## Limites

- Não exige milagre nem fé para usar a palavra.  
- Não romantiza hipérbole vazia («tudo é maravilhoso») como método.  
- Escala oral = mapa de laboratório, não dicionário normativo fechado.

## Status

**Aprovado** — **maravilhoso** fichado: maravilha → assombro → elogio BR; escala com [legal](${legal}) / [genial](${genial}) / [aff](${aff}); elo [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ Alegria](${alegria}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **maravilhoso** — adjective and warm BR praise from **maravilha** (marvel/wonder). Covers **object**, **senses**, an **intensity scale** with [legal](${legal}), [genial](${genial}) and [aff](${aff}), and [Do your best!](${mantra}). Warm tone, not preachy.

> Method note: [Wiktionary · maravilhoso](${wiki}), [maravilha](${wikiMaravilha}). Not miracle cult or self-help.

## Object

| Field | Value |
|-------|-------|
| Word | **maravilhoso** |
| Etymon | Lat. *mirabilia* / *mirabilis* → PT *maravilha* → *maravilhoso* |
| Links | [legal](${legal}) · [genial](${genial}) · [aff](${aff}) · [alegria](${alegria}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Senses

Wonder / marvel · everyday BR praise (“how wonderful!”) · affective hyperbole · lab praise after a traceable [gesture](${gesto}).

## Intensity scale

[aff](${aff}) (exasperation) ← → [legal](${legal}) slang (“cool”) ← → [genial](${genial}) (craft brilliance) ← → **maravilhoso** (warm awe). Choose with [truth](${verdade}).

## Do your best!

After the “wow,” keep the craft — [Do your best!](${mantra}). Wonder without [path](${caminho}) = pose; wonder with method = lasting admiration.

## Status

**Approved** — marvel → awe → BR praise; scale with [legal](${legal}) / [genial](${genial}) / [aff](${aff}); [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ Alegria](${alegria}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **maravilhoso** — adjetivo y elogio cálido BR desde **maravilha** (asombro). Cubre **objeto**, **sentidos**, una **escala** con [legal](${legal}), [genial](${genial}) y [aff](${aff}), y [¡Haz lo mejor!](${mantra}). Calor, no sermón.

> Nota: [Wikcionario · maravilhoso](${wiki}), [maravilha](${wikiMaravilha}). No es culto del milagro.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **maravilhoso** |
| Étimo | Lat. *mirabilia* / *mirabilis* → PT *maravilha* → *maravilhoso* |
| Vínculos | [legal](${legal}) · [genial](${genial}) · [aff](${aff}) · [alegria](${alegria}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Sentidos

Asombro · elogio cotidiano BR («¡qué maravilloso!») · hipérbole afectiva · elogio de lab tras un [gesto](${gesto}) rastreable.

## Escala

[aff](${aff}) (hastío) ← → [legal](${legal}) jerga («bacán») ← → [genial](${genial}) (ingenio) ← → **maravilloso** (asombro cálido).

## ¡Haz lo mejor!

Después del «guau», seguir el oficio — [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — maravilla → asombro → elogio BR; escala con [legal](${legal}) / [genial](${genial}) / [aff](${aff}); [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Legal](${legal}) · [▶ Genial](${genial}) · [▶ Aff](${aff}) · [▶ Alegria](${alegria}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMaravilhosoPost() {
  const { body, contentEn, contentEs, wiki } = buildMaravilhosoBodies();
  return makePalavra({
    title:
      'Inspeção: Maravilhoso — maravilha, assombro, elogio BR e Faça o melhor!',
    titleEn:
      'Inspection: Maravilhoso — marvel, wonder, BR praise and Do your best!',
    titleEs:
      'Inspección: Maravilhoso — maravilla, asombro, elogio BR y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «maravilhoso» (de maravilha / lat. *mirabilia*) — assombro e elogio BR; escala com legal, genial e aff; Faça o melhor! depois do «uau».',
    excerptEn:
      'Words: “maravilhoso” (from maravilha / Lat. *mirabilia*) — wonder and BR praise; scale with legal, genial and aff; Do your best! after the wow.',
    excerptEs:
      'Palabras: «maravilhoso» (de maravilha / lat. *mirabilia*) — asombro y elogio BR; escala con legal, genial y aff; ¡Haz lo mejor! después del guau.',
    slug: 'inspecao-palavra-maravilhoso',
    date: '2026-08-03T19:30:00.000Z',
    seriesOrder: 67,
    seriesLabel: 'Maravilhoso · palavra',
    coverImage: '/imagens/inspecoes/maravilhoso-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMaravilhosoPost,
  buildMaravilhosoBodies
};
