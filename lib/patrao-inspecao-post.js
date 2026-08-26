'use strict';

/**
 * Inspeção Palavras · Patrão
 * Eixos: latim patronus · chefe / dono · respeito × poder ·
 * elo Pattern / padrão · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPatraoBodies() {
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
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/patr%C3%A3o';
  const wikiLa = 'https://en.wiktionary.org/wiki/patronus';

  const body = `## Escopo

Inspeção editorial da palavra **patrão** — quem **manda**, **emprega** ou é tratado como **chefe** / **dono**. Do latim *patronus* (protetor, patrocinador): a mesma raiz que alimenta o inglês [pattern](${pattern}) e o PT *padrão*. Esta ficha cobre o **objeto**, o eixo **patrão × respeito × poder**, o ofício de **trabalhar com hierarquia sem perder ofício**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · patrão](${wiki}), [patronus](${wikiLa}), série [Palavras](${hub}). **Ficha ≠ manual de RH nem de luta de classes.** Tom: Inspetor BudGanja — *patrão* nomeia relação; [respeito](${respeito}) não é obediência cega.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **patrão** |
| Classe | Substantivo masculino (fem. *patroa*) |
| Étimo (trabalho) | latim *patronus* («protetor / patrocinador») → PT *patrão* — confiança: **alta** |
| Família | *patrão* · *patroa* · *patronato* · *patrocínio* · *padrão* · [pattern](${pattern}) |
| Paralelos | *chefe* · *empregador* · *dono* · *boss* (loan) |
| Tipo BudGanja | Palavra — hierarquia × ofício |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [risco](${risco}) · [respeito](${respeito}) |
| Elo léxico | [língua portuguesa](${lingua}) · [pattern](${pattern}) · [ídolo](${idolo}) · [Guia](${guia}) |
| Fonte | [Wiktionary · patrão](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a **figura de autoridade no trabalho** (e, por extensão, quem “manda” na casa, na obra, no bar). No lab: relação nomeada — não destino.

## 2. Patrão × patroa × padrão × pattern

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **patrão / patroa** | Chefe / empregador | Relação laboral viva |
| **padrão** | Modelo / norma | Mesma raiz; sentido deslocou para molde |
| **[pattern](${pattern})** | Molde EN | Prima etimológica — não é “chefe” |
| **chefe** | Função / cargo | Mais neutro em alguns registros |
| **boss** | Loan EN informal | Tom de rua / empresa |

**H1:** *patrão* = quem emprega ou manda no ofício (alta confiança).  
**H2:** mesma raiz *patronus* liga patrão, padrão e [pattern](${pattern}) — caminhos semânticos divergiram.  
**H3:** [respeito](${respeito}) ao ofício ≠ culto ao patrão ([ídolo](${idolo})).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Empregador** | Quem paga / contrata | Alta |
| **Chefe** | Quem manda no dia a dia | Alta |
| **Dono** | Proprietário do negócio | Alta (uso vivo) |
| **Vocativo** | «Ô patrão!» (tratamento) | Alta (BR oral) |
| **Ironia / afeto** | Pode ser respeito ou gozo | Alta (contexto) |
| **Ofício lab** | Hierarquia inspecionável — não sagrada | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *patrão* |
|-------|----------------------|
| [Respeito](${respeito}) | Respeito mútuo ≠ medo |
| [Pattern](${pattern}) · *padrão* | Prima etimológica (*patronus*) |
| [Gesto](${gesto}) · [caminho](${caminho}) | Como se responde à ordem |
| [Risco](${risco}) | Poder sem [verdade](${verdade}) |
| [Ídolo](${idolo}) | Armadilha: virar culto |
| [Língua portuguesa](${lingua}) · [vida](${vidaPalavra}) | Uso oral e ofício |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Meu patrão»** | Empregador / chefe | Relação — inspecionar [gesto](${gesto}) |
| **«Ô patrão!»** | Tratamento (às vezes afetuoso) | Tom depende do contexto |
| **Patroa** | Feminino / dona da casa (uso vivo) | Mesma raiz, papéis sociais distintos |
| **«Sem patrão»** | Autonomia / informalidade | Ofício próprio também tem [risco](${risco}) |
| **Ofício** | Ordem no lab / na obra | [Valeu !!!](${mantra}) sob qualquer hierarquia |

**Finalidade-mãe:** nomear o **patrão** para **ver a relação de poder com [verdade](${verdade})** — trabalhar bem sem perder o ofício nem a dignidade.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com ou sem patrão a olhar**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Patrão = inimigo» e «patrão = deus» = extremos · relação inspecionável = ofício |
| Par vivo | [respeito](${respeito}) · [gesto](${gesto}) · [pattern](${pattern}) |

**Veredicto:** Valeu !!! **também sob hierarquia**. Patrão que inspira [respeito](${respeito}) ≠ patrão que exige culto ([ídolo](${idolo})).

## Hipóteses (síntese)

**H1:** objeto = *patrão* ← latim *patronus* (chefe / empregador).  
**H2:** ofício = relacionar-se com poder sem perder [caminho](${caminho}).  
**H3:** elos = [respeito](${respeito}) · [pattern](${pattern}) · [gesto](${gesto}).  
**H4:** fecho = [Valeu !!!](${mantra}).

## Limites

- Não é tratado de direito do trabalho.  
- Vocativo «patrão» ≠ sempre relação formal de emprego.  
- Prima etimológica com [pattern](${pattern}) ≠ identidade de sentido.

## Status

**Aprovado** — **patrão** fichado: chefe/empregador, raiz *patronus*, rede com respeito/pattern e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Respeito](${respeito}) · [▶ Pattern](${pattern}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **patrão** — Portuguese for **boss** / **employer** / **owner**, from Latin *patronus*. Same root as [pattern](${pattern}) and *padrão*. Links [respeito](${respeito}), [gesto](${gesto}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · patrão](${wiki}). Not an HR or labor-law manual.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **patrão** |
| Sense | Boss / employer |
| Lab type | Hierarchy × craft |
| Links | [respeito](${respeito}) · [pattern](${pattern}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Valeu !!!

Best possible **with or without a boss watching**, today.

## Status

**Approved** — boss · *patronus* · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Respeito](${respeito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **patrão** — jefe / empleador / dueño, del latín *patronus*. Misma raíz que [pattern](${pattern}) y *padrão*. Vínculos [respeito](${respeito}), [gesto](${gesto}), [¡Valeu !!!](${mantra}).

> Nota: [Wiktionary · patrão](${wiki}). No es manual de RR.HH. ni de derecho laboral.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **patrão** |
| Sentido | Jefe / empleador |
| Tipo lab | Jerarquía × oficio |
| Vínculos | [respeito](${respeito}) · [pattern](${pattern}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Valeu !!!

Lo mejor posible **con o sin patrón mirando**, hoy.

## Estado

**Aprobado** — jefe · *patronus* · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Respeito](${respeito}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPatraoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPatraoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 103;
  return makePalavra({
    title: 'Inspeção: Patrão — chefe, poder e respeito',
    titleEn: 'Inspection: Patrão — boss, power and respect',
    titleEs: 'Inspección: Patrão — jefe, poder y respeto',
    excerpt:
      'Palavras: «patrão» — chefe/empregador (lat. patronus); elos respeito, pattern, gesto; Valeu !!!',
    excerptEn:
      'Words: “patrão” — boss/employer (Lat. patronus); links respeito, pattern, gesto; Valeu !!!',
    excerptEs:
      'Palabras: «patrão» — jefe/empleador (lat. patronus); vínculos respeito, pattern, gesto; ¡Valeu !!!',
    slug: 'inspecao-palavra-patrao',
    date: '2026-08-03T20:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Patrão · palavra',
    coverImage: '/imagens/inspecoes/patrao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPatraoPost,
  buildPatraoBodies
};
