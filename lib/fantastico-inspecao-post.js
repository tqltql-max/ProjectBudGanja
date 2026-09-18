'use strict';

/**
 * Inspeção Palavras · fantástico
 * Eixos: fantasia / fantástico · elogio BR («fantástico!») · escala vs legal/genial/maravilhoso · Faça o melhor!
 * Nota tipográfica: «fantisico» → **fantástico**
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildFantasticoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/fant%C3%A1stico';
  const wikiFantasia = 'https://pt.wiktionary.org/wiki/fantasia';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Fantasia_(g%C3%A9nero)';

  const body = `## Escopo

Inspeção editorial da palavra **fantástico** — correcção tipográfica de **«fantisico»** → **fantástico**. Adjectivo (e interjeição de elogio no português do Brasil) na família de **fantasia**: o que é **da imaginação / do fantástico**, e, no dia a dia BR, o sopro **«fantástico!»** (= «muito bom!»). Esta ficha cobre o **objeto**, os **dois eixos** (fantasia × elogio quotidiano), uma **escala** com [legal](${legal}), [genial](${genial}) e [maravilhoso](${maravilhoso}), e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fantástico](${wiki}), [fantasia](${wikiFantasia}), [Fantasia (género)](${wikiEl}), uso oral BR. **Ficha ≠ tratado de literatura fantástica** — mapa lexical e de ofício. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fantástico** (forma pedida: *fantisico* → correcção) |
| Classe | Adjectivo · interjeição de elogio (uso oral BR) |
| Étimo (trabalho) | Lat. *phantasticus* ← gr. *phantastikós* («da imaginação / da aparência») ← *phantasía* — confiança: alta |
| Família | *fantasia* · *fantasiar* · *fantasma* · *fantástico* · *ciência fantástica* |
| Cognatos | esp. *fantástico* · fr. *fantastique* · it. *fantastico* · ing. *fantastic* |
| Tipo BudGanja | Palavra — fantasia × elogio BR × ofício |
| Elo fantasia | [fantasia / Alice](${alice}) · [criatividade](${criatividade}) |
| Elo elogio | [legal](${legal}) (gíria «bacana») · [genial](${genial}) (engenho) · [maravilhoso](${maravilhoso}) (assombro) · **fantástico** (imaginação + «uau» forte) |
| Elo contraste | [aff](${aff}) — enfado (polo oposto) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [especial](${especial}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · fantástico](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **fora do real quotidiano** (mundo da [fantasia](${wikiFantasia}), género, aparência imaginada) e, no BR vivo, o **elogio alto** — «fantástico!» = aprovação intensa, muitas vezes sem falar de literatura. No BudGanja: celebra o feito **com** método; desconfia do hype sem ficha.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Gr. *phantasía* | Aparência, imaginação, representação | Alta |
| Lat. *phantasticus* | Relativo à imaginação / ao fantástico | Alta |
| Adj. **fantástico** | Da fantasia; irreal / prodigioso; admirável | Alta |
| Género / cultura | Literatura e arte «fantásticas» | Alta |
| Elogio BR | «Fantástico!» — «muito bom / demais» | Alta (uso vivo) |
| Assombro | Par de tom com [maravilhoso](${maravilhoso}) e [meudeusdoceu](${meudeusdoceu}) | Média–alta (mapa lab) |
| Ofício lab | Elogio depois do [gesto](${gesto}) rastreável | Média–alta (mapa BudGanja) |

**H1:** *fantástico* herda a **fantasia** — imaginação e aparência, não só «elogio vazio».  
**H2:** no BR, o sopro quotidiano aquece sem exigir tratado de género literário.  
**H3:** no lab, «fantástico» **bom** = celebra o feito com [verdade](${verdade}); **mau** = flattery / hype que fecha a inspeção.

## 3. Escala de intensidade (oralidade BR)

Mapa aproximado do peito — não ranking moral:

| Intensidade | Palavra / sopro | O que marca | Elo |
|-------------|-----------------|-------------|-----|
| Baixa / peso | [aff](${aff}) | Enfado, decepção | Contraste |
| Média / aprovação | [legal](${legal}) (gíria) | «Bacana / ok / massa» | Escada BR |
| Média+ / engenho | [genial](${genial}) | Feito que acertou o **engenho** | Irmão de elogio |
| Alta / assombro | [maravilhoso](${maravilhoso}) | Espanto + calor | Irmão de elogio |
| Alta / imaginação + «uau» | **fantástico** | Fantasia **ou** elogio forte («demais!») | Esta ficha |

**Leitura da escala:** [aff](${aff}) fecha; [legal](${legal}) (gíria) aprova com leveza; [genial](${genial}) aponta engenho; [maravilhoso](${maravilhoso}) aponta assombro caloroso; **fantástico** pode ser **mundo imaginado** *ou* **elogio alto** — inspecionar qual ferramenta está na mesa. (O eixo jurídico de *legal* fica na ficha [legal](${legal}); aqui usamos o polo «bacana».)

**Veredicto escala:** escolher a palavra com [verdade](${verdade}) — hipérbole gentil ok; «tudo é fantástico» sem objecto = esvazia a palavra.

## 4. Usos — fantasia × elogio

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Fantasia / género** | Mundo fantástico, [Alice](${alice}) | Bom: nomear o imaginário · Mau: confundir ficção com [verdade](${verdade}) factual |
| **Elogio BR** | «Fantástico!» / «ficou fantástico» | Bom: apontar o feito · Mau: hype sem relatório |
| **Prodígio / fora do comum** | Resultado «fantástico» | Bom: [especial](${especial}) com critério · Mau: milagre sem método |
| **Criação** | Ideia fantástica → ficha | Bom: [criatividade](${criatividade}) · Mau: culto da ideia sem [gesto](${gesto}) |
| **Par com alegria** | Expansão do peito | Bom: [alegria](${alegria}) · Mau: negar o [aff](${aff}) quando chega |
| **Ardor** | Calor do «uau» | Bom: [fogo](${fogo}) com medida · Mau: labareda sem [caminho](${caminho}) |

## 5. Para que serve · Faça o melhor!

| Finalidade | Leitura |
|------------|---------|
| **Nomear a fantasia** | Imaginação com rótulo honesto |
| **Elogiar com objecto** | «Fantástico» + o quê acertou |
| **Separar hype de ofício** | Elogio **com** ficha ≠ atalho |
| **Voltar ao acto** | Depois do «uau», o próximo [gesto](${gesto}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, mesmo quando o peito está fantástico |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Já é fantástico, não preciso inspecionar» = falso |
| Termómetros | [aff](${aff}) · [legal](${legal}) · [genial](${genial}) · [maravilhoso](${maravilhoso}) · [meudeusdoceu](${meudeusdoceu}) |

**Veredicto:** Faça o melhor **com o fantástico** — deixar a imaginação e o elogio vivos, creditando o feito; depois continuar o ofício. Fantástico sem [caminho](${caminho}) = pose; fantástico com método = lareira de admiração e invenção.

## Hipóteses (síntese)

**H1:** objeto = *phantasticus* / fantasia → **fantástico** (e correcção *fantisico*).  
**H2:** eixos = género/imaginação · elogio BR alto.  
**H3:** escala = [legal](${legal}) · [genial](${genial}) · [maravilhoso](${maravilhoso}) · **fantástico**.  
**H4:** fecho = [Faça o melhor!](${mantra}) depois do «uau».

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Genial](${genial}) · [Maravilhoso](${maravilhoso}) | Escala de elogio BR |
| [Especial](${especial}) · [Criatividade](${criatividade}) | Particular × inventar com método |
| [Alice · País das Maravilhas](${alice}) | Elo cultural da fantasia |
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Aff](${aff}) | Prova / contraste |
| [Fogo](${fogo}) · [Alegria](${alegria}) · [meudeusdoceu](${meudeusdoceu}) | Calor do peito |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é história completa do género fantástico.  
- Ingl. *fantastic* ≈ paralelo de elogio; não apaga o eixo «da fantasia».  
- Elogiar ≠ dispensar o próximo [gesto](${gesto}).

## Status

**Aprovado** — **fantástico** fichado (correcção de *fantisico*): fantasia × elogio BR; escala com [legal](${legal}) / [genial](${genial}) / [maravilhoso](${maravilhoso}); [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Legal](${legal}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **fantástico** (typo fix: *fantisico* → **fantástico**) — from **fantasy / the fantastical** to everyday BR praise (“fantástico!” = “awesome!”). Covers **object**, **two axes**, a **scale** with [legal](${legal}), [genial](${genial}) and [maravilhoso](${maravilhoso}), and [Do your best!](${mantra}).

> Method note: [Wiktionary · fantástico](${wiki}), [fantasia](${wikiFantasia}). Not a full fantasy-literature treatise.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **fantástico** |
| Etymon | Lat. *phantasticus* ← Gk *phantastikós* ← *phantasía* |
| Lab type | Fantasy × BR praise × craft |
| Links | [legal](${legal}) · [genial](${genial}) · [maravilhoso](${maravilhoso}) · [Alice](${alice}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses and scale

Imagination / fantastical genre · strong everyday praise · scale: [aff](${aff}) ← [legal](${legal}) (slang) ← [genial](${genial}) ← [maravilhoso](${maravilhoso}) ← **fantástico**.

**H:** fantasy-root; BR praise is stable; good use points to a deed with [truth](${verdade}); empty hype = caveat.

## 4–5. Purpose · Do your best!

Name fantasy honestly · praise with an object · separate hype from craft · after the wow, the next [gesture](${gesto}). Best possible **today** — even when the chest feels fantastic.

## Status

**Approved** — fantasy × BR praise · scale with legal / genial / maravilhoso · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Legal](${legal}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fantástico** (corrección: *fantisico* → **fantástico**) — de la **fantasía / lo fantástico** al elogio cotidiano BR («¡fantástico!»). Cubre **objeto**, **dos ejes**, una **escala** con [legal](${legal}), [genial](${genial}) y [maravilhoso](${maravilhoso}), y [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · fantástico](${wiki}), [fantasia](${wikiFantasia}). No es tratado completo del género fantástico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **fantástico** |
| Étimo | Lat. *phantasticus* ← gr. *phantastikós* ← *phantasía* |
| Tipo lab | Fantasía × elogio BR × oficio |
| Vínculos | [legal](${legal}) · [genial](${genial}) · [maravilhoso](${maravilhoso}) · [Alice](${alice}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y escala

Imaginación / género · elogio fuerte · escala: [aff](${aff}) ← [legal](${legal}) (jerga) ← [genial](${genial}) ← [maravilhoso](${maravilhoso}) ← **fantástico**.

## 4–5. Para qué sirve · ¡Haz lo mejor!

Nombrar la fantasía · elogiar con objeto · separar hype de oficio · después del guau, el siguiente [gesto](${gesto}).

## Estado

**Aprobada** — fantasía × elogio BR · escala con legal / genial / maravilhoso · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Genial](${genial}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Legal](${legal}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFantasticoPost() {
  const { body, contentEn, contentEs, wiki } = buildFantasticoBodies();
  return makePalavra({
    title:
      'Inspeção: Fantástico — fantasia, elogio BR «fantástico!» e Faça o melhor!',
    titleEn:
      'Inspection: Fantástico — fantasy, BR praise “fantástico!” and Do your best!',
    titleEs:
      'Inspección: Fantástico — fantasía, elogio BR «¡fantástico!» y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «fantástico» (lat. *phantasticus* / fantasia) — correcção de fantisico; eixos fantasia e elogio BR; escala com legal, genial e maravilhoso.',
    excerptEn:
      'Words: “fantástico” (Lat. *phantasticus* / fantasy) — typo fix from fantisico; fantasy and BR praise axes; scale with legal, genial and maravilhoso.',
    excerptEs:
      'Palabras: «fantástico» (lat. *phantasticus* / fantasía) — corrección de fantisico; ejes fantasía y elogio BR; escala con legal, genial y maravilhoso.',
    slug: 'inspecao-palavra-fantastico',
    date: '2026-08-03T22:00:00.000Z',
    seriesOrder: 82,
    seriesLabel: 'Fantástico · palavra',
    coverImage: '/imagens/inspecoes/fantastico-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFantasticoPost,
  buildFantasticoBodies
};
