'use strict';

/**
 * Inspeção Palavras · total
 * Eixos: lat. tōtus (inteiro / completo) · soma / totalidade ·
 * gíria BR «total!» (acordo / louvor) · escala vs legal / fantástico · Valeu !!!
 * Nota tipográfica: «toal» → **total**
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildTotalBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/total';
  const wikiLa = 'https://en.wiktionary.org/wiki/totus#Latin';
  const wikiEn = 'https://en.wiktionary.org/wiki/total';

  const body = `## Escopo

Inspeção editorial da palavra **total** — correcção tipográfica de **«toal»** → **total**. Do lat. *tōtus* («inteiro / todo») ao português de **soma**, **completude** e, no Brasil vivo, o sopro **«total!»** (= acordo forte / louvor: «é isso», «fechou», «demais»). Esta ficha cobre o **objeto**, os **eixos** (completo × gíria), uma **escala** com [legal](${legal}) e [fantástico](${fantastico}) (e irmãos de elogio), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · total](${wiki}), lat. [*tōtus*](${wikiLa}), [total (EN)](${wikiEn}), uso oral BR. **Ficha ≠ tratado de matemática nem de estatística** — mapa lexical e de ofício. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **total** (forma pedida: *toal* → correcção) |
| Classe | Adjectivo · substantivo · interjeição / gíria de acordo (uso oral BR) |
| Étimo (trabalho) | Lat. *tōtus* («todo / inteiro») → fr./esp. *total* → pt. *total* — confiança: alta |
| Família | *todo* · *totalidade* · *totalizar* · *totalmente* · *subtotal* · *totality* (ing.) |
| Cognatos | esp. *total* · fr. *total* · it. *totale* · ing. *total* · al. *total* |
| Tipo BudGanja | Palavra — completude × soma × acordo BR × ofício |
| Elo completude | Inteiro / sem resto · «resultado total» |
| Elo elogio / acordo | [legal](${legal}) (gíria «bacana») · [fantástico](${fantastico}) («uau» + imaginação) · **total** («fechou / é isso») |
| Elo contraste | [aff](${aff}) — enfado (polo oposto) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [especial](${especial}) · [Valeu !!!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · total](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **inteiro** (nada falta; a soma; o conjunto) e, no BR oral, o **selo de acordo/louvor** — «total!» = «concordo de cabo a rabo / ficou completo / massa». No BudGanja: **total bom** = fechar a conta com [verdade](${verdade}); **total mau** = absolutizar sem ficha («é total, ponto» sem inspecionar).

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *tōtus* | Todo, inteiro, completo | Alta |
| Adj. **total** | Completo; absoluto no domínio declarado | Alta |
| Subst. **total** | Soma; montante; resultado agregador | Alta |
| Adv. *totalmente* | De modo completo | Alta |
| Gíria BR | «Total!» — acordo forte / louvor («é isso», «fechou») | Alta (uso vivo) |
| Ingl. *totally* | Parente de acordo enfático («totally!»); não apaga o eixo de soma | Alta (paralelo) |
| Ofício lab | Completar a inspeção ≠ fingir que «já está tudo» | Média–alta (mapa BudGanja) |

**H1:** *total* herda *tōtus* — **inteiro**, não só «elogio vazio».  
**H2:** no BR, o sopro «total!» aquece como **acordo/louvor** sem exigir planilha.  
**H3:** no lab, «total» **bom** = fecho com objecto e [gesto](${gesto}); **mau** = absolutizar / encerrar debate sem [verdade](${verdade}).

## 3. Escala de intensidade (oralidade BR)

Mapa aproximado do peito — não ranking moral:

| Intensidade | Palavra / sopro | O que marca | Elo |
|-------------|-----------------|-------------|-----|
| Baixa / peso | [aff](${aff}) | Enfado, decepção | Contraste |
| Média / aprovação | [legal](${legal}) (gíria) | «Bacana / ok / massa» | Escada BR |
| Média+ / engenho | [genial](${genial}) | Feito que acertou o **engenho** | Irmão de elogio |
| Alta / assombro | [maravilhoso](${maravilhoso}) | Espanto + calor | Irmão de elogio |
| Alta / imaginação + «uau» | [fantástico](${fantastico}) | Fantasia **ou** elogio forte | Irmão de elogio |
| Alta / fecho / acordo | **total** | Completude **ou** «fechou!» / «é isso» | Esta ficha |

**Leitura da escala:** [aff](${aff}) fecha negativo; [legal](${legal}) (gíria) aprova com leveza; [genial](${genial}) aponta engenho; [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) apontam assombro ou «uau»; **total** aponta **inteiro** *ou* **acordo que sela** — inspecionar qual ferramenta está na mesa. (O eixo jurídico de *legal* fica na ficha [legal](${legal}); aqui usamos o polo «bacana».)

**Veredicto escala:** escolher a palavra com [verdade](${verdade}) — «total!» gentil ok; «é total, acabou» sem objecto = esvazia a palavra e corta a inspeção.

## 4. Usos — completo × soma × «total!»

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Completude** | «Inspeção total do lote» | Bom: declarar o domínio · Mau: fingir omnisciência |
| **Soma / montante** | «Total da conta» | Bom: números rastreáveis · Mau: total inventado |
| **Acordo BR** | «Total!» / «total, irmão» | Bom: selar entendimento · Mau: pressionar consenso falso |
| **Louvor** | «Ficou total» | Bom: apontar o feito · Mau: hype sem relatório |
| **Absoluto** | «Fracasso total» | Bom: hiperbolizar com consciência · Mau: apagar nuances |
| **Perda total** | Sinistro / baixa do bem | Locução irmã: [perda total](/posts/post-inspecao-expressao-perda-total.html) — **≠** «total!» de acordo · **≠** pessoa |
| **Par com alegria / fogo** | Peito fecha com calor | Bom: [alegria](${alegria}) · [fogo](${fogo}) com medida · Mau: labareda sem [caminho](${caminho}) |

## 5. Para que serve · Valeu !!!

| Finalidade | Leitura |
|------------|---------|
| **Nomear o inteiro** | Completo **no domínio** declarado |
| **Fechar a conta** | Soma com [verdade](${verdade}) |
| **Acordar com objecto** | «Total!» + o quê se fechou |
| **Separar selo de dogma** | Acordo vivo ≠ fim da inspeção |
| **Voltar ao acto** | Depois do fecho, o próximo [gesto](${gesto}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor possível **hoje**, mesmo quando o peito diz «total!» |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Já é total, não preciso inspecionar» = falso |
| Termómetros | [aff](${aff}) · [legal](${legal}) · [fantástico](${fantastico}) · [genial](${genial}) · [maravilhoso](${maravilhoso}) · [meudeusdoceu](${meudeusdoceu}) |

**Veredicto:** Valeu !!! **com o total** — completar o que cabe ao ofício; selar acordo quando houver objecto; depois continuar. Total sem [caminho](${caminho}) = pose de absolutes; total com método = fecho honesto e louvor que não mente.

## Hipóteses (síntese)

**H1:** objeto = *tōtus* → **total** (e correcção *toal*).  
**H2:** eixos = completude/soma · gíria BR de acordo/louvor.  
**H3:** escala = [legal](${legal}) · [fantástico](${fantastico}) (e genial/maravilhoso) · **total**.  
**H4:** fecho = [Valeu !!!](${mantra}) depois do «fechou!».

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Legal](${legal}) · [Fantástico](${fantastico}) · [Genial](${genial}) · [Maravilhoso](${maravilhoso}) | Escala de elogio / acordo BR |
| [Especial](${especial}) | Particular ≠ «tudo absoluto» |
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Aff](${aff}) | Prova / contraste |
| [Fogo](${fogo}) · [Alegria](${alegria}) · [meudeusdoceu](${meudeusdoceu}) | Calor do peito |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é manual de contabilidade nem de estatística inferencial.  
- Ingl. *totally* ≈ paralelo de acordo; não apaga o eixo de soma/completude.  
- «Total!» ≠ dispensar o próximo [gesto](${gesto}).

## Status

**Aprovado** — **total** fichado (correcção de *toal*): completude × gíria BR «total!»; escala com [legal](${legal}) / [fantástico](${fantastico}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Fantástico](${fantastico}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **total** (typo fix: *toal* → **total**) — from Lat. *tōtus* (“whole / entire”) to **sum / completeness** and everyday BR slang **“total!”** (= strong agreement / praise). Covers **object**, **axes**, a **scale** with [legal](${legal}) and [fantástico](${fantastico}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · total](${wiki}), Lat. [*tōtus*](${wikiLa}). Not a math treatise.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **total** |
| Etymon | Lat. *tōtus* → Romance *total* |
| Lab type | Completeness × sum × BR agreement/praise × craft |
| Links | [legal](${legal}) · [fantástico](${fantastico}) · [genial](${genial}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses and scale

Whole / sum · BR “total!” as agreement seal · scale: [aff](${aff}) ← [legal](${legal}) (slang) ← [genial](${genial}) ← [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) ← **total** (closure / “that’s it”).

**H:** *tōtus*-root; BR slang is stable; good use seals with an object and [truth](${verdade}); absolute dogma without inspection = caveat.

## 4–5. Purpose · Valeu !!!

Name the whole in a declared domain · close the sum honestly · agree with an object · after “fechou!”, the next [gesture](${gesto}). Best possible **today** — even when the chest says “total!”.

## Status

**Approved** — completeness × BR “total!” · scale with legal / fantástico · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Legal](${legal}) · [▶ Fantástico](${fantastico}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **total** (corrección: *toal* → **total**) — del lat. *tōtus* («entero») a la **suma / completud** y la jerga BR **«¡total!»** (acuerdo / elogio). Cubre **objeto**, **ejes**, una **escala** con [legal](${legal}) y [fantástico](${fantastico}), y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · total](${wiki}), lat. [*tōtus*](${wikiLa}). No es tratado de matemáticas.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **total** |
| Étimo | Lat. *tōtus* → romance *total* |
| Tipo lab | Completud × suma × acuerdo/elogio BR × oficio |
| Vínculos | [legal](${legal}) · [fantástico](${fantastico}) · [genial](${genial}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y escala

Entero / suma · «¡total!» como sello de acuerdo · escala: [aff](${aff}) ← [legal](${legal}) (jerga) ← [genial](${genial}) ← [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) ← **total**.

## 4–5. Para qué sirve · ¡Valeu !!!

Nombrar el entero · cerrar la cuenta con [verdad](${verdade}) · acordar con objeto · después del cierre, el siguiente [gesto](${gesto}).

## Estado

**Aprobada** — completud × «¡total!» BR · escala con legal / fantástico · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Legal](${legal}) · [▶ Fantástico](${fantastico}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildTotalPost() {
  const { body, contentEn, contentEs, wiki } = buildTotalBodies();
  // Cap livre em tempo de build (lote passado/skill/total + agentes concorrentes).
  let seriesOrder = 74;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-total');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 160) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 74 */
  }

  return makePalavra({
    title:
      'Inspeção: Total — tōtus, completude e gíria BR «total!»',
    titleEn:
      'Inspection: Total — tōtus, completeness and BR slang “total!”',
    titleEs:
      'Inspección: Total — tōtus, completud y jerga BR «¡total!»',
    excerpt:
      'Palavras: «total» (lat. *tōtus*) — correcção de toal; completo/soma e gíria BR «total!»; escala com legal e fantástico.',
    excerptEn:
      'Words: “total” (Lat. *tōtus*) — typo fix from toal; whole/sum and BR slang “total!”; scale with legal and fantástico.',
    excerptEs:
      'Palabras: «total» (lat. *tōtus*) — corrección de toal; entero/suma y jerga BR «¡total!»; escala con legal y fantástico.',
    slug: 'inspecao-palavra-total',
    date: '2026-08-03T23:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Total · palavra',
    coverImage: '/imagens/inspecoes/total-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTotalPost,
  buildTotalBodies
};
